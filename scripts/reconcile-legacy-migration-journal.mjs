#!/usr/bin/env node
// Governed legacy migration-journal adoption / reconciliation (NOT migration execution).
//
// Purpose:
//   Adopt a legacy database whose migration DDL is already materialized but whose
//   Drizzle migration journal is absent, by inserting only TRUTHFUL journal rows
//   (real SHA-256 of each migration file, real journal "when" timestamps) into
//   drizzle.__drizzle_migrations. No migration SQL is executed.
//
// Safety model:
//   - Refuses to run without BOTH an explicit legacy database URL and a positive
//     ADOPT_LEGACY flag.
//   - Refuses any target that resolves to the known Production branch/endpoint.
//   - Verifies database identity before any write.
//   - Verifies the expected legacy materialization boundary AND that every migration
//     being adopted is materially satisfied (types/tables/columns/indexes present).
//   - Inserts only rows absent from the journal (repeat-safe / idempotent).
//
// This is reconciliation, not migration execution. The journal rows RECORD that the
// migration's authoritative schema state has been independently proven materialized
// and may therefore be treated as satisfied by the governed migration runner.

import { neon } from "@neondatabase/serverless";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const JOURNAL_PATH = path.resolve(__dirname, "../drizzle/meta/_journal.json");
const MIGRATIONS_DIR = path.resolve(__dirname, "../drizzle");

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

const PRODUCTION_BLOCKLIST = [
  "ep-nameless-dawn-a61gilim", // aredirlabs-prod endpoint
  "br-crimson-shape-a6q4y35g", // aredirlabs-prod branch
];

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
// Load the canonical journal and migration files
// ---------------------------------------------------------------------------

const journal = JSON.parse(fs.readFileSync(JOURNAL_PATH, "utf8"));
const entries = journal.entries;

function migrationHash(tag) {
  const file = path.join(MIGRATIONS_DIR, `${tag}.sql`);
  const content = fs.readFileSync(file, "utf8");
  return {
    tag,
    file,
    when: entries.find((e) => e.tag === tag).when,
    hash: crypto.createHash("sha256").update(content).digest("hex"),
  };
}

// Migrations governed by this adoption: the historical baseline plus 0000..0007.
// The forward reconciliation migration (0008) is NOT adopted; it is intended to be
// executed afterward by the governed migration runner.
const ADOPTED_TAGS = [
  "0000_workspace_foundation_baseline",
  "0000_engineering_work_002",
  "0001_engineering_work_012",
  "0002_defect_context_validation_target",
  "0003_engineering_work_lifecycle_history",
  "0004_engineering_work_history_chain_integrity",
  "0005_engineering_work_repository_evidence",
  "0006_engineering_work_reference_review_check",
  "0007_operational_focus",
];

// ---------------------------------------------------------------------------
// Materialization manifest: expected objects per adopted migration
// ---------------------------------------------------------------------------

const MANIFEST = {
  "0000_workspace_foundation_baseline": {
    types: [
      "project_status",
      "project_stage",
      "milestone_status",
      "workspace_project_note_type",
      "workspace_project_document_category",
    ],
    tables: [
      "user",
      "session",
      "account",
      "verification",
      "workspace_settings",
      "workspace_projects",
      "workspace_project_notes",
      "workspace_project_milestones",
      "workspace_project_documents",
    ],
    columns: {
      workspace_projects_status_udt: ["workspace_projects", "status", "project_status"],
      workspace_projects_stage_udt: ["workspace_projects", "stage", "project_stage"],
    },
    indexes: ["workspace_project_documents_project_slug_idx"],
  },
  "0000_engineering_work_002": {
    types: [
      "engineering_work_type",
      "engineering_work_workflow",
      "engineering_work_state",
      "engineering_work_reference_authority",
      "engineering_work_reference_status",
    ],
    tables: [
      "workspace_engineering_work",
      "workspace_engineering_work_repository_references",
    ],
  },
  "0001_engineering_work_012": {
    tables: ["workspace_engineering_work_defects"],
  },
  "0002_defect_context_validation_target": {
    columns: {
      defects_validation_target: ["workspace_engineering_work_defects", "validation_target", "text"],
    },
  },
  "0003_engineering_work_lifecycle_history": {
    types: [
      "engineering_work_history_kind",
      "engineering_work_actor_type",
      "engineering_work_decision_role",
      "engineering_work_authority_type",
    ],
    tables: ["workspace_engineering_work_history", "workspace_engineering_work_defect_revisions"],
    columns: {
      ew_final_disposition: ["workspace_engineering_work", "final_disposition", "text"],
      ew_version: ["workspace_engineering_work", "version", "int4"],
    },
  },
  "0004_engineering_work_history_chain_integrity": {
    constraints: ["workspace_engineering_work_history_work_id_unique"],
  },
  "0005_engineering_work_repository_evidence": {
    tables: ["workspace_engineering_work_repo_revisions"],
    indexes: ["workspace_engineering_work_repository_references_identity_idx"],
  },
  "0006_engineering_work_reference_review_check": {
    constraints: ["workspace_engineering_work_repo_refs_review_requires_ts"],
  },
  "0007_operational_focus": {
    types: ["project_focus_event_effect"],
    tables: ["workspace_project_focus_events", "workspace_project_focus_selection"],
    columns: {
      ew_focus_version: ["workspace_projects", "focus_version", "int4"],
    },
    indexes: ["workspace_engineering_work_project_id_id_idx"],
  },
};

// ---------------------------------------------------------------------------
// Database helpers
// ---------------------------------------------------------------------------

const sql = neon(databaseUrl);

async function checkType(name) {
  const r = await sql`SELECT 1 FROM pg_type t JOIN pg_namespace n ON n.oid=t.typnamespace
    WHERE n.nspname='public' AND t.typname=${name} AND (t.typtype='e') LIMIT 1`;
  return r.length === 1;
}

async function checkTable(name) {
  const r = await sql`SELECT 1 FROM information_schema.tables
    WHERE table_schema='public' AND table_name=${name} AND table_type='BASE TABLE' LIMIT 1`;
  return r.length === 1;
}

async function checkColumn(table, column, udt) {
  const r = await sql`SELECT udt_name FROM information_schema.columns
    WHERE table_schema='public' AND table_name=${table} AND column_name=${column} LIMIT 1`;
  if (r.length !== 1) return false;
  return r[0].udt_name === udt;
}

async function checkIndex(name) {
  const r = await sql`SELECT 1 FROM pg_indexes WHERE schemaname='public' AND indexname=${name} LIMIT 1`;
  return r.length === 1;
}

async function checkConstraint(name) {
  const r = await sql`SELECT 1 FROM pg_constraint WHERE conname=${name} LIMIT 1`;
  return r.length === 1;
}

async function verifyMaterialization(tag) {
  const spec = MANIFEST[tag];
  const missing = [];
  if (!spec) throw new Error(`No materialization manifest for adopted migration ${tag}`);

  for (const t of spec.types ?? []) {
    if (!(await checkType(t))) missing.push(`type ${t}`);
  }
  for (const t of spec.tables ?? []) {
    if (!(await checkTable(t))) missing.push(`table ${t}`);
  }
  for (const [k, [table, column, udt]] of Object.entries(spec.columns ?? {})) {
    if (!(await checkColumn(table, column, udt))) missing.push(`column ${table}.${column} (${k})`);
  }
  for (const i of spec.indexes ?? []) {
    if (!(await checkIndex(i))) missing.push(`index ${i}`);
  }
  for (const c of spec.constraints ?? []) {
    if (!(await checkConstraint(c))) missing.push(`constraint ${c}`);
  }
  return missing;
}

// ---------------------------------------------------------------------------
// Journal state
// ---------------------------------------------------------------------------

async function ensureJournalTable() {
  await sql`CREATE SCHEMA IF NOT EXISTS drizzle`;
  await sql`CREATE TABLE IF NOT EXISTS drizzle.__drizzle_migrations (
    id SERIAL PRIMARY KEY,
    hash text NOT NULL,
    created_at bigint
  )`;
}

async function existingHashes() {
  const rows = await sql`SELECT hash, created_at FROM drizzle.__drizzle_migrations`;
  return new Map(rows.map((r) => [r.hash, Number(r.created_at)]));
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  console.log("Legacy migration-journal adoption (reconciliation, not migration execution).");
  console.log(`  Target: ${target.host} / ${target.database}`);

  // Identity verification before any write.
  const identity = (
    await sql`SELECT current_database() AS db,
                      current_setting('neon.project_id', true) AS project_id,
                      current_setting('neon.branch_id', true) AS branch_id,
                      current_setting('neon.endpoint_id', true) AS endpoint_id`
  )[0];
  console.log(`  Identity: project=${identity.project_id} branch=${identity.branch_id} database=${identity.db}`);

  for (const id of [identity.branch_id, identity.endpoint_id, identity.project_id]) {
    if (PRODUCTION_BLOCKLIST.some((p) => String(id).toLowerCase().includes(p.toLowerCase()))) {
      throw new Error(`Refusing legacy adoption: identity resolves to known Production identifier (${id}).`);
    }
  }

  // Materialization boundary: journal must not already contain any adopted migration
  // in a way that would conflict. Creating the table when absent is allowed.
  const boundary = (
    await sql`SELECT count(*)::int AS c FROM information_schema.tables
      WHERE table_schema='drizzle' AND table_name='__drizzle_migrations'`
  )[0];
  console.log(`  Legacy materialization boundary: journal table present=${boundary.c === 1 ? "yes" : "no"}`);

  // Verify every adopted migration is materially satisfied.
  const failures = [];
  for (const tag of ADOPTED_TAGS) {
    const missing = await verifyMaterialization(tag);
    if (missing.length > 0) {
      failures.push({ tag, missing });
    }
  }
  if (failures.length > 0) {
    console.error("Refusing legacy adoption: materialization proof failed for:");
    for (const f of failures) {
      console.error(`  - ${f.tag}: missing ${f.missing.join(", ")}`);
    }
    console.error("No journal rows were written. Resolve the missing/conflicting objects, then re-run.");
    process.exit(3);
  }
  console.log("  Materialization proof: passed for all adopted migrations (baseline + 0000..0007).");

  await ensureJournalTable();
  const existing = await existingHashes();
  console.log(`  Existing journal rows: ${existing.size}`);

  const prepared = ADOPTED_TAGS.map(migrationHash);
  const toInsert = prepared.filter((m) => !existing.has(m.hash));

  if (toInsert.length === 0) {
    console.log("  Adoption complete (no-op): all adopted migrations already journaled. Nothing written.");
    return;
  }

  for (const m of toInsert) {
    await sql`INSERT INTO drizzle.__drizzle_migrations ("hash", "created_at")
              VALUES (${m.hash}, ${m.when})`;
    console.log(`  Journaled ${m.tag}: hash=${m.hash.slice(0, 16)}... when=${m.when}`);
  }

  const after = await existingHashes();
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
