#!/usr/bin/env node
// Governed legacy migration-journal adoption / reconciliation (NOT migration execution).
//
// Purpose:
//   Adopt a DISPOSABLE / legacy database whose migration DDL is already
//   materialized but whose Drizzle migration journal is absent, by inserting only
//   TRUTHFUL journal rows (real SHA-256 of each migration file, real journal
//   "when" timestamps) into drizzle.__drizzle_migrations. No migration SQL is
//   executed.
//
// Safety model (behaviorally UNCHANGED by the shared-engine refactor):
//   - Refuses to run without BOTH an explicit legacy database URL and a positive
//     ADOPT_LEGACY flag.
//   - Refuses any target that resolves to the known Production branch/endpoint.
//   - Verifies database identity before any write.
//   - Verifies the expected legacy materialization boundary AND that every
//     migration being adopted is materially satisfied.
//   - Inserts only rows absent from the journal (repeat-safe / idempotent),
//     atomically via the shared reconciliation engine.
//
// This is reconciliation, not migration execution. The journal rows RECORD that
// the migration's authoritative schema state has been independently proven
// materialized and may therefore be treated as satisfied by the governed
// migration runner.

import {
  PRODUCTION_BLOCKLIST,
  buildDb,
  readLiveIdentity,
  verifyAllMaterialization,
  planAdoption,
  applyAdoptionAtomic,
  existingHashes,
  journalTablePresent,
  journalMeta,
} from "./lib/migration-reconcile-engine.mjs";

// ---------------------------------------------------------------------------
// Positive legacy-adoption authorization
// ---------------------------------------------------------------------------

const ADOPT_LEGACY_OK = ["1", "true", "yes"];
const adoptFlag = (process.env.ADOPT_LEGACY ?? "").trim().toLowerCase();
if (!ADOPT_LEGACY_OK.includes(adoptFlag)) {
  console.error(
    "Refusing legacy adoption: ADOPT_LEGACY must be a positive value (1|true|yes).",
  );
  process.exit(2);
}

const databaseUrl = (process.env.ADOPT_DATABASE_URL ?? process.env.LEGACY_DATABASE_URL ?? "").trim();
if (!databaseUrl) {
  console.error(
    "Refusing legacy adoption: an explicit legacy database URL is required.\n" +
      "Set ADOPT_DATABASE_URL (or LEGACY_DATABASE_URL) to the legacy database to reconcile.\n" +
      "Production is never a default target for this command.",
  );
  process.exit(2);
}

// ---------------------------------------------------------------------------
// Production exclusion: known aredirlabs Production branch/endpoint identifiers
// ---------------------------------------------------------------------------

function parseHostParts(urlString) {
  let u;
  try {
    u = new URL(urlString);
  } catch {
    return null;
  }
  return { hostname: u.hostname, host: u.host, database: (u.pathname || "").replace(/^\//, "") };
}

const target = parseHostParts(databaseUrl);
if (!target) {
  console.error("Refusing legacy adoption: the supplied DATABASE URL is not a valid URL.");
  process.exit(2);
}

const lowerConnection = (
  [target.hostname, target.host, databaseUrl].join(" ").toLowerCase()
);
const productionHit = PRODUCTION_BLOCKLIST.find((id) =>
  lowerConnection.includes(id.toLowerCase()),
);
if (productionHit) {
  console.error(
    `Refusing legacy adoption: target matches known Production identifier "${productionHit}".`,
  );
  process.exit(2);
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const sql = buildDb(databaseUrl);
  const meta = journalMeta();

  console.log("Legacy migration-journal adoption (reconciliation, not migration execution).");
  console.log(`  Target: ${target.host} / ${target.database}`);

  // Identity verification before any write. Uses the negative Production
  // blocklist (the legacy target must NOT be Production).
  const identity = await readLiveIdentity(sql);
  console.log(`  Identity: branch=${identity.branchId} endpoint=${identity.endpointId} database=${identity.database}`);

  for (const id of [identity.branchId, identity.endpointId, identity.projectId]) {
    if (PRODUCTION_BLOCKLIST.some((p) => String(id).toLowerCase().includes(p.toLowerCase()))) {
      throw new Error(`Refusing legacy adoption: identity resolves to known Production identifier (${id}).`);
    }
  }

  // Journal state.
  const present = await journalTablePresent(sql);
  console.log(`  Legacy materialization boundary: journal table present=${present ? "yes" : "no"}`);

  // Materialization proof for every adopted migration.
  const failures = await verifyAllMaterialization(sql);
  if (failures.length > 0) {
    console.error("Refusing legacy adoption: materialization proof failed for:");
    for (const f of failures) {
      console.error(`  - ${f.tag}: missing ${f.missing.join(", ")}`);
    }
    console.error("No journal rows were written. Resolve the missing/conflicting objects, then re-run.");
    process.exit(3);
  }
  console.log("  Materialization proof: passed for all adopted migrations (baseline + 0000..0007).");

  // Compute the exact journal plan (conflict detection + idempotency).
  const plan = await planAdoption(sql, meta);
  if (plan.action === "conflict") {
    console.error("Refusing legacy adoption: conflicting journal history.");
    for (const c of plan.conflicts) console.error(`  - ${c}`);
    console.error("No journal rows were written. Do not silently normalize conflicting history.");
    process.exit(4);
  }

  // Atomic write phase.
  await applyAdoptionAtomic(sql, plan);

  // Read-only post-write verification.
  const after = await existingHashes(sql);
  console.log(`Adoption complete. Total journal rows now: ${after.size}`);
  console.log(
    "These rows RECORD that the corresponding migration's authoritative schema state was " +
      "independently proven materialized. No migration SQL was executed. Continue with the " +
      "governed migration path to apply only the forward reconciliation migration.",
  );
}

main().catch((error) => {
  console.error("Legacy adoption failed:", error instanceof Error ? error.message : error);
  process.exit(1);
});
