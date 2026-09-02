#!/usr/bin/env node
// Shared reconciliation engine for governed migration-journal adoption.
//
// Truthfulness invariant (SHARED across legacy and Production adoption):
//   Journal adoption RECORDS authoritative schema state that has been
//   independently proven materially present. It does NOT execute historical
//   migration DDL and never implies Drizzle ran that DDL. Adoption only writes
//   journal rows whose canonical hash and `when` come from the authoritative
//   committed `drizzle/meta/_journal.json`.
//
// This module is intentionally shared by the legacy (disposable) adoption entry
// point and the Production (positive-identity) adoption entry point so that the
// materialization manifests, journal hashes, canonical `when` values, migration
// corpus, conflict rules, and journal-write semantics have exactly ONE
// authoritative implementation.

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { neon } from "@neondatabase/serverless";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MIGRATIONS_DIR = path.resolve(__dirname, "../../drizzle");
const JOURNAL_PATH = path.resolve(__dirname, "../../drizzle/meta/_journal.json");
const JOURNAl_SCHEMA = "drizzle";
const JOURNAL_TABLE = "__drizzle_migrations";

// The historical baseline plus the existing tracked migrations 0000..0007.
// The forward reconciliation migration (0008) is NEVER an adopted tag: it is
// intended to be executed afterward by the governed migration runner as a
// separate explicit Production operation.
export const ADOPTED_TAGS = [
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

export const FORWARD_TAG = "0008_workspace_project_prompt_reconciliation";

// Known aredirlabs Production branch/endpoint identifiers. The legacy entry
// point uses these as a NEGATIVE guard (refuse if matched). The Production entry
// point uses the exact frozen PRODUCTION_IDENTITY values as a POSITIVE guard.
export const PRODUCTION_BLOCKLIST = [
  "ep-nameless-dawn-a61gilim", // aredirlabs-prod endpoint
  "br-crimson-shape-a6q4y35g", // aredirlabs-prod branch
];

// FROZEN Production identity contract. Repository-owned configuration (no
// credentials). Production adoption requires an exact match on ALL four values.
export const PRODUCTION_IDENTITY = {
  projectId: "plain-band-91202732",
  branchId: "br-crimson-shape-a6q4y35g",
  endpointId: "ep-nameless-dawn-a61gilim",
  database: "neondb",
};

export const PRODUCTION_AUTH_OK = ["1", "true", "yes"];

// Materialization manifest per adopted migration. An adopted migration is only
// journaled when every object it declares is proven materially present.
export const MANIFEST = {
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

// Objects that must be ABSENT before adoption (the forward-reconciliation
// objects). Presence of any of these is a hard stop: adoption must not record a
// forward predicate as already satisfied, and the schema is not in the expected
// pre-0008 state.
export const PROMPTS_TABLE = "workspace_project_prompts";
export const PROMPTS_ENUMS = [
  "workspace_project_prompt_type",
  "workspace_project_prompt_status",
];

export function journalMeta() {
  const journal = JSON.parse(fs.readFileSync(JOURNAL_PATH, "utf8"));
  return { entries: journal.entries, journalPath: JOURNAL_PATH, migrationsDir: MIGRATIONS_DIR };
}

export function migrationHash(tag, meta = journalMeta()) {
  const file = path.join(meta.migrationsDir, `${tag}.sql`);
  const content = fs.readFileSync(file, "utf8");
  const entry = (meta.entries || []).find((e) => e.tag === tag);
  if (!entry) throw new Error(`Journal has no entry for adopted migration ${tag}`);
  return {
    tag,
    file,
    when: entry.when,
    hash: crypto.createHash("sha256").update(content).digest("hex"),
  };
}

export function buildDb(databaseUrl) {
  return neon(databaseUrl);
}

// Read the live Neon identity from the connected database (read-only).
export async function readLiveIdentity(db) {
  const rows = await db`
    SELECT
      current_setting('neon.project_id', true) AS project_id,
      current_setting('neon.branch_id', true) AS branch_id,
      current_setting('neon.endpoint_id', true) AS endpoint_id,
      current_database() AS db
  `;
  const r = (rows && rows[0]) || {};
  return {
    projectId: r.project_id ?? null,
    branchId: r.branch_id ?? null,
    endpointId: r.endpoint_id ?? null,
    database: r.db ?? null,
  };
}

// Pure positive-identity check: returns ok + list of mismatched fields. If any
// live field is null/missing it is treated as a mismatch (fail-closed).
export function assertIdentityMatches(identity, expected = PRODUCTION_IDENTITY) {
  const mismatches = [];
  const fields = [
    ["projectId", expected.projectId],
    ["branchId", expected.branchId],
    ["endpointId", expected.endpointId],
    ["database", expected.database],
  ];
  for (const [key, exp] of fields) {
    const got = identity ? identity[key] : null;
    if (got === null || got === undefined || String(got) !== String(exp)) {
      mismatches.push({ field: key, expected: exp, actual: got ?? null });
    }
  }
  return { ok: mismatches.length === 0, mismatches };
}

export async function checkType(db, name) {
  const r = await db`SELECT 1 FROM pg_type t JOIN pg_namespace n ON n.oid=t.typnamespace
    WHERE n.nspname='public' AND t.typname=${name} AND (t.typtype='e') LIMIT 1`;
  return (r || []).length === 1;
}

export async function checkTable(db, name) {
  const r = await db`SELECT 1 FROM information_schema.tables
    WHERE table_schema='public' AND table_name=${name} AND table_type='BASE TABLE' LIMIT 1`;
  return (r || []).length === 1;
}

export async function checkColumn(db, table, column, udt) {
  const r = await db`SELECT udt_name FROM information_schema.columns
    WHERE table_schema='public' AND table_name=${table} AND column_name=${column} LIMIT 1`;
  if ((r || []).length !== 1) return false;
  return r[0].udt_name === udt;
}

export async function checkIndex(db, name) {
  const r = await db`SELECT 1 FROM pg_indexes WHERE schemaname='public' AND indexname=${name} LIMIT 1`;
  return (r || []).length === 1;
}

export async function checkConstraint(db, name) {
  const r = await db`SELECT 1 FROM pg_constraint WHERE conname=${name} LIMIT 1`;
  return (r || []).length === 1;
}

export async function verifyMaterialization(db, tag) {
  const spec = MANIFEST[tag];
  const missing = [];
  if (!spec) throw new Error(`No materialization manifest for adopted migration ${tag}`);
  for (const t of spec.types ?? []) {
    if (!(await checkType(db, t))) missing.push(`type ${t}`);
  }
  for (const t of spec.tables ?? []) {
    if (!(await checkTable(db, t))) missing.push(`table ${t}`);
  }
  for (const [k, [table, column, udt]] of Object.entries(spec.columns ?? {})) {
    if (!(await checkColumn(db, table, column, udt))) missing.push(`column ${table}.${column} (${k})`);
  }
  for (const i of spec.indexes ?? []) {
    if (!(await checkIndex(db, i))) missing.push(`index ${i}`);
  }
  for (const c of spec.constraints ?? []) {
    if (!(await checkConstraint(db, c))) missing.push(`constraint ${c}`);
  }
  return missing;
}

export async function verifyAllMaterialization(db) {
  const failures = [];
  for (const tag of ADOPTED_TAGS) {
    const missing = await verifyMaterialization(db, tag);
    if (missing.length > 0) failures.push({ tag, missing });
  }
  return failures;
}

// Prompts-absence proof: all three must be absent. Returns present objects.
export async function verifyPromptsAbsent(db) {
  const present = [];
  if (await checkTable(db, PROMPTS_TABLE)) present.push(`table ${PROMPTS_TABLE}`);
  for (const e of PROMPTS_ENUMS) {
    if (await checkType(db, e)) present.push(`type ${e}`);
  }
  return { absent: present.length === 0, present };
}

export async function journalTablePresent(db) {
  const r = await db`SELECT 1 FROM information_schema.tables
    WHERE table_schema='drizzle' AND table_name=${JOURNAL_TABLE} LIMIT 1`;
  return (r || []).length === 1;
}

export async function existingHashes(db) {
  const rows = await db`SELECT hash, created_at FROM ${db.unsafe(JOURNAl_SCHEMA)}.${db.unsafe(JOURNAL_TABLE)}`;
  return new Map((rows || []).map((r) => [r.hash, Number(r.created_at)]));
}

// Determine the exact journal plan for adoption per shared fail-closed rules.
// Returns { action: 'adopt'|'noop'|'conflict', toInsert, conflicts }.
export async function planAdoption(db, meta = journalMeta()) {
  const prepared = ADOPTED_TAGS.map((tag) => migrationHash(tag, meta));
  const forward = migrationHash(FORWARD_TAG, meta);
  const knownAdoptedHashes = new Set(prepared.map((m) => m.hash));

  const conflicts = [];
  const existing = (await journalTablePresent(db)) ? await existingHashes(db) : new Map();
  const existingByWhen = new Map(
    [...existing.entries()].map(([hash, when]) => [String(when), hash]),
  );

  // 1. 0008 must not already be journaled.
  if (existing.has(forward.hash)) {
    conflicts.push(`0008 forward migration already journaled (${FORWARD_TAG})`);
  } else {
    for (const hash of existing.keys()) {
      if (!knownAdoptedHashes.has(hash) && hash !== forward.hash) {
        conflicts.push(`unexpected journal row: hash=${hash.slice(0, 16)}...`);
      }
    }
  }

  // 2. Any adopted row whose stored hash/when conflicts (adopted present with
  //    divergent value) is a hard conflict.
  for (const m of prepared) {
    if (existing.has(m.hash)) {
      const storedWhen = existing.get(m.hash);
      if (Number(storedWhen) !== Number(m.when)) {
        conflicts.push(`adopted migration ${m.tag} has conflicting canonical when (stored=${storedWhen} expected=${m.when})`);
      }
    }
  }

  // 3. A row present with a different hash but the same canonical when.
  for (const m of prepared) {
    const other = existingByWhen.get(String(m.when));
    if (other && other !== m.hash && knownAdoptedHashes.has(other)) {
      conflicts.push(`adopted migration ${m.tag} journaled with conflicting hash (${other.slice(0, 16)}...)`);
    }
  }

  if (conflicts.length > 0) {
    return { action: "conflict", toInsert: [], conflicts };
  }

  const toInsert = prepared.filter((m) => !existing.has(m.hash));

  if (toInsert.length === 0) {
    return { action: "noop", toInsert: [], conflicts };
  }

  return { action: "adopt", toInsert, conflicts };
}

// Atomic write phase: prepare the journal table and insert required rows in a
// single PostgreSQL transaction. Returns nothing; throws on failure (no write).
export async function applyAdoptionAtomic(db, plan) {
  const queries = [
    db`CREATE SCHEMA IF NOT EXISTS ${db.unsafe(JOURNAl_SCHEMA)}`,
    db`CREATE TABLE IF NOT EXISTS ${db.unsafe(JOURNAl_SCHEMA)}.${db.unsafe(JOURNAL_TABLE)} (
      id SERIAL PRIMARY KEY,
      hash text NOT NULL,
      created_at bigint
    )`,
  ];
  for (const m of plan.toInsert) {
    queries.push(
      db`INSERT INTO ${db.unsafe(JOURNAl_SCHEMA)}.${db.unsafe(JOURNAL_TABLE)} ("hash", "created_at")
         VALUES (${m.hash}, ${m.when})`,
    );
  }
  await db.transaction(queries);
}

export { MIGRATIONS_DIR, JOURNAL_PATH, JOURNAl_SCHEMA, JOURNAL_TABLE };
