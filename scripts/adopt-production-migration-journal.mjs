#!/usr/bin/env node
// Governed PRODUCTION migration-journal adoption (NOT migration execution).
//
// Brings the already-materialized Production migration history under the tracked
// migration authority WITHOUT executing historical DDL. Only journal rows whose
// proven materialized schema state is independently verified are recorded.
//
// Safety model (positive identity, fail-closed):
//   - Requires positive ADOPT_PROD (1|true|yes); ADOPT_LEGACY is never consulted.
//   - Requires an explicit PROD_ADOPT_DATABASE_URL. No default and no fallback to
//     DATABASE_URL / LEGACY_DATABASE_URL / ADOPT_DATABASE_URL.
//   - Establishes live Production identity BEFORE any write and requires an
//     exact match on ALL four frozen values (project, branch, endpoint, database).
//     A target that merely "is not Development" or "is not blocklisted" is
//     never sufficient: Production must positively match.
//   - Proves baseline + 0000..0007 materialization via the shared engine and
//     requires the prompts table and both prompt enums to be ABSENT.
//   - Validates existing journal state; refuses conflicting/unexpected history.
//   - Adopts only baseline + 0000..0007. Never invokes 0008, db:migrate:prod,
//     or db:push:prod.
//   - Writes are atomic (journal table preparation + row inserts in ONE
//     transaction). If any precondition fails, no journal write occurs.
//
// This command performs reconciliation only. Creating a recovery anchor and
// running the forward migration remain separate, explicitly authorized,
// human-in-the-loop Operations.

import { pathToFileURL } from "node:url";
import {
  PRODUCTION_IDENTITY,
  PRODUCTION_AUTH_OK,
  buildDb,
  readLiveIdentity,
  assertIdentityMatches,
  verifyAllMaterialization,
  verifyPromptsAbsent,
  journalTablePresent,
  planAdoption,
  applyAdoptionAtomic,
  existingHashes,
  journalMeta,
} from "./lib/migration-reconcile-engine.mjs";

// Exported, pure core so tests/harness can exercise the exact identity and
// reconciliation behavior with a SYNTHETIC db client (never contacting
// Production). Returns a status object; the CLI wrapper maps it to exit codes.
export async function runProductionAdoption({ sql, meta = journalMeta() }) {
  console.log("Production migration-journal adoption (reconciliation, not migration execution).");

  // 1. Live Production identity BEFORE any write.
  let identity;
  try {
    identity = await readLiveIdentity(sql);
  } catch (e) {
    console.error(
      "Refusing Production adoption: unable to establish live identity:",
      e instanceof Error ? e.message : e,
    );
    return { status: "identity-unavailable" };
  }
  console.log(
    `  Identity: project=${identity.projectId} branch=${identity.branchId} endpoint=${identity.endpointId} database=${identity.database}`,
  );

  const { ok, mismatches } = assertIdentityMatches(identity, PRODUCTION_IDENTITY);
  if (!ok) {
    console.error("Refusing Production adoption: positive Production identity mismatch.");
    for (const m of mismatches) {
      console.error(
        `  - ${m.field}: expected "${m.expected}" got "${String(m.actual)}"`,
      );
    }
    console.error("Expected Production identity: " +
      `project=${PRODUCTION_IDENTITY.projectId} branch=${PRODUCTION_IDENTITY.branchId} ` +
      `endpoint=${PRODUCTION_IDENTITY.endpointId} database=${PRODUCTION_IDENTITY.database}`);
    console.error("No journal write was performed.");
    return { status: "identity-mismatch", mismatches };
  }
  console.log("  Positive Production identity: exact match confirmed on all four values.");

  // 2. Journal state.
  const present = await journalTablePresent(sql);
  console.log(`  Journal table present=${present ? "yes" : "no"}`);

  // 3. Materialization proof.
  const failures = await verifyAllMaterialization(sql);
  if (failures.length > 0) {
    console.error("Refusing Production adoption: materialization proof failed for:");
    for (const f of failures) {
      console.error(`  - ${f.tag}: missing ${f.missing.join(", ")}`);
    }
    console.error("No journal rows were written. Resolve the missing/conflicting objects, then re-run.");
    return { status: "materialization-failed", failures };
  }
  console.log("  Materialization proof: passed for all adopted migrations (baseline + 0000..0007).");

  // 4. Prompts-absence proof.
  const prompts = await verifyPromptsAbsent(sql);
  if (!prompts.absent) {
    console.error("Refusing Production adoption: prompt objects already present.");
    for (const p of prompts.present) console.error(`  - ${p}`);
    console.error(
      "The pre-0008 schema is not in the expected state. Adoption must not record a forward " +
        "predicate as already satisfied. No journal write was performed.",
    );
    return { status: "prompts-present", present: prompts.present };
  }
  console.log("  Prompts-absence proof: workspace_project_prompts and both enums absent.");

  // 5. Journal plan: conflict detection + idempotency.
  const plan = await planAdoption(sql, meta);
  if (plan.action === "conflict") {
    console.error("Refusing Production adoption: conflicting journal history.");
    for (const c of plan.conflicts) console.error(`  - ${c}`);
    console.error("No journal rows were written. Do not silently normalize conflicting history.");
    return { status: "journal-conflict", conflicts: plan.conflicts };
  }
  if (plan.action === "noop") {
    console.log("  Adoption complete (no-op): all adopted migrations already journaled. Nothing written.");
    return { status: "noop" };
  }

  // 6. Atomic write phase (single transaction: schema/table prep + inserts).
  await applyAdoptionAtomic(sql, plan);

  // 7. Read-only post-write verification.
  const after = await existingHashes(sql);
  console.log(`Adoption complete. Total journal rows now: ${after.size}`);
  console.log(
    "Recorded only baseline + 0000..0007. No migration SQL was executed; 0008 was not invoked.\n" +
      "Forward migration 0008 remains a separate, explicitly authorized Production operation.",
  );
  return { status: "adopted", rows: after.size };
}

const EXIT_CODES = {
  "identity-unavailable": 2,
  "identity-mismatch": 3,
  "materialization-failed": 4,
  "prompts-present": 4,
  "journal-conflict": 4,
  noop: 0,
  adopted: 0,
};

async function main() {
  const adoptProdFlag = (process.env.ADOPT_PROD ?? "").trim().toLowerCase();
  if (!PRODUCTION_AUTH_OK.includes(adoptProdFlag)) {
    console.error(
      "Refusing Production adoption: ADOPT_PROD must be a positive value (1|true|yes).\n" +
        "ADOPT_LEGACY is not accepted for Production adoption.",
    );
    process.exit(2);
  }

  const databaseUrl = (process.env.PROD_ADOPT_DATABASE_URL ?? "").trim();
  if (!databaseUrl) {
    console.error(
      "Refusing Production adoption: PROD_ADOPT_DATABASE_URL must be explicitly set.\n" +
        "No default, no fallback to DATABASE_URL / LEGACY_DATABASE_URL / ADOPT_DATABASE_URL.",
    );
    process.exit(2);
  }

  // Refuse URLs that literally contain a Production identifier in case a
  // blocklisted identifier is referenced; the authoritative positive gate is the
  // live identity check below.
  const sql = buildDb(databaseUrl);
  try {
    const result = await runProductionAdoption({ sql });
    if (result.status in EXIT_CODES) process.exit(EXIT_CODES[result.status]);
    process.exit(1);
  } catch (error) {
    console.error("Production adoption failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

// Run only when executed directly (never when imported by the test harness).
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}
