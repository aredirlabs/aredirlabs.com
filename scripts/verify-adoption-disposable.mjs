#!/usr/bin/env node
// Disposable verification driver for the tracked migration authority package.
//
// Requires operator-provided disposable Neon targets:
//   ADOPT_TEST_URL_FRESH   - empty disposable target (fresh reconstruction path)
//   ADOPT_TEST_URL_LEGACY  - disposable target used to build/verify the legacy path
//
// Scenarios:
//   FRESH    - empty DB -> canonical migrate (baseline -> 0000..0007 -> 0008)
//   LEGACY   - production-shaped DB (materialized, no journal) -> adoption -> migrate
//   EQUIV    - final schema equivalence between fresh and legacy
//   NEGATIVE - adoption guards; repeat adoption; migrate-without-adoption
//
// The canonical migration path is driven by invoking drizzle-kit migrate directly
// with DATABASE_URL pointed at the disposable target.

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { sql } from "drizzle-orm";
import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const JOURNAL_PATH = path.join(ROOT, "drizzle/meta/_journal.json");
const MIGRATIONS_DIR = path.join(ROOT, "drizzle");
const DRIZZLE_KIT = path.join(ROOT, "node_modules/drizzle-kit/bin.cjs");

const PRODUCTION_BLOCKLIST = ["ep-nameless-dawn-a61gilim", "br-crimson-shape-a6q4y35g"];

// Load operator-provided disposable targets: prefer explicit env, else .env.disposable.local
function loadDisposableEnv() {
  const env = { ...process.env };
  const file = path.join(ROOT, ".env.disposable.local");
  if (fs.existsSync(file)) {
    for (const line of fs.readFileSync(file, "utf8").split(/\r?\n/)) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (m && !(m[1] in env)) env[m[1]] = m[2];
    }
  }
  return env;
}
const disposable = loadDisposableEnv();
const freshUrl = (disposable.ADOPT_TEST_URL_FRESH ?? disposable.DATABASE_URL_FRESH ?? "").trim();
const legacyUrl = (disposable.ADOPT_TEST_URL_LEGACY ?? disposable.DATABASE_URL_LEGACY ?? "").trim();
if (!freshUrl || !legacyUrl) {
  console.error("Disposable FRESH and LEGACY target URLs are required (ADOPT_TEST_URL_FRESH / ADOPT_TEST_URL_LEGACY or DATABASE_URL_FRESH / DATABASE_URL_LEGACY).");
  process.exit(2);
}
const freshHost = new URL(freshUrl).hostname;
const legacyHost = new URL(legacyUrl).hostname;
for (const id of PRODUCTION_BLOCKLIST) {
  if (freshHost.includes(id) || legacyHost.includes(id)) {
    console.error(`Refusing: a target matches known Production identifier ${id}.`);
    process.exit(2);
  }
}

const freshSql = neon(freshUrl);
const legacySql = neon(legacyUrl);
const dbF = drizzle(freshSql);
const dbL = drizzle(legacySql);

const journal = JSON.parse(fs.readFileSync(JOURNAL_PATH, "utf8"));
const entries = journal.entries;
const hashOf = (tag) => {
  const content = fs.readFileSync(path.join(MIGRATIONS_DIR, `${tag}.sql`), "utf8");
  return {
    tag,
    when: entries.find((e) => e.tag === tag).when,
    hash: crypto.createHash("sha256").update(content).digest("hex"),
  };
};

const BASELINE = "0000_workspace_foundation_baseline";
const ADOPTED_TAGS = [
  BASELINE,
  "0000_engineering_work_002",
  "0001_engineering_work_012",
  "0002_defect_context_validation_target",
  "0003_engineering_work_lifecycle_history",
  "0004_engineering_work_history_chain_integrity",
  "0005_engineering_work_repository_evidence",
  "0006_engineering_work_reference_review_check",
  "0007_operational_focus",
];
const FORWARD_TAG = "0008_workspace_project_prompt_reconciliation";

const results = [];
function record(scenario, ok, evidence) {
  const status = ok ? "PASS" : "FAIL";
  results.push({ scenario, status, evidence });
  console.log(`  [${status}] ${scenario}`);
}

// ---------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------
async function runMigrate(targetUrl) {
  const res = spawnSync(
    process.execPath,
    [DRIZZLE_KIT, "migrate"],
    { cwd: ROOT, env: { ...process.env, DATABASE_URL: targetUrl }, encoding: "utf8" },
  );
  return { status: res.status, stdout: res.stdout, stderr: res.stderr };
}

async function runAdoption(databaseUrl, extraEnv = {}) {
  const res = spawnSync(
    process.execPath,
    [path.join(ROOT, "scripts/reconcile-legacy-migration-journal.mjs")],
    { cwd: ROOT, env: { ...process.env, ...extraEnv, ADOPT_DATABASE_URL: databaseUrl }, encoding: "utf8" },
  );
  return { status: res.status, stdout: res.stdout, stderr: res.stderr };
}

function splitSql(file) {
  return fs.readFileSync(file, "utf8").split("--> statement-breakpoint").map((s) => s.trim()).filter(Boolean);
}

async function wipeTarget(db, conn) {
  await conn`DROP SCHEMA IF EXISTS drizzle CASCADE`;
  const tables = await conn`SELECT tablename FROM pg_tables WHERE schemaname='public'`;
  for (const t of tables) {
    await db.execute(sql.raw(`DROP TABLE IF EXISTS ${ident(t.tablename)} CASCADE`));
  }
  const types = await conn`SELECT typname FROM pg_type t
    JOIN pg_namespace n ON n.oid=t.typnamespace
    WHERE n.nspname='public' AND t.typtype='e'`;
  for (const ty of types) {
    await db.execute(sql.raw(`DROP TYPE IF EXISTS ${ident(ty.typname)} CASCADE`));
  }
  const funcs = await conn`SELECT proname FROM pg_proc p
    JOIN pg_namespace n ON n.oid=p.pronamespace WHERE n.nspname='public'`;
  for (const f of funcs) {
    await db.execute(sql.raw(`DROP FUNCTION IF EXISTS ${ident(f.proname)}() CASCADE`));
  }
}

function ident(name) {
  return `"${String(name).replace(/"/g, '""')}"`;
}

async function materializeNoJournal(db) {
  for (const tag of ADOPTED_TAGS) {
    const stmts = splitSql(path.join(MIGRATIONS_DIR, `${tag}.sql`));
    for (const s of stmts) {
      await db.execute(sql.raw(s));
    }
  }
}

async function tableExists(sql, name) {
  const r = await sql`SELECT 1 FROM information_schema.tables WHERE table_schema='public' AND table_name=${name} LIMIT 1`;
  return r.length === 1;
}
async function typeExists(sql, name) {
  const r = await sql`SELECT 1 FROM pg_type t JOIN pg_namespace n ON n.oid=t.typnamespace
    WHERE n.nspname='public' AND t.typname=${name} AND t.typtype='e' LIMIT 1`;
  return r.length === 1;
}
async function columnUdt(sql, table, column) {
  const r = await sql`SELECT udt_name FROM information_schema.columns
    WHERE table_schema='public' AND table_name=${table} AND column_name=${column} LIMIT 1`;
  return r.length ? r[0].udt_name : null;
}
async function journalRows(sql) {
  return await sql`SELECT hash, created_at FROM drizzle.__drizzle_migrations ORDER BY id`;
}
async function journalCount(sql) {
  const r = await sql`SELECT count(*)::int c FROM drizzle.__drizzle_migrations`;
  return Number(r[0].c);
}

// Normalized schema fingerprint (sorted) for fresh-vs-legacy equivalence.
async function schemaFingerprint(sql) {
  const cols = await sql`SELECT table_name, column_name, data_type, udt_name, is_nullable,
      COALESCE(column_default,'') AS dflt
    FROM information_schema.columns WHERE table_schema='public' ORDER BY table_name, ordinal_position`;
  const types = await sql`SELECT typname, enumlabel FROM pg_type t
    JOIN pg_namespace n ON n.oid=t.typnamespace
    JOIN pg_enum e ON e.enumtypid=t.oid
    WHERE n.nspname='public' AND t.typtype='e' ORDER BY typname, e.enumsortorder`;
  const tables = await sql`SELECT table_name FROM information_schema.tables
    WHERE table_schema='public' AND table_type='BASE TABLE' ORDER BY table_name`;
  return {
    tables: tables.map((r) => r.table_name),
    columns: cols.map((r) => `${r.table_name}.${r.column_name}:${r.udt_name}:${r.is_nullable}:${r.dflt}`),
    enums: types.map((r) => `${r.typname}:${r.enumlabel}`),
  };
}

// ---------------------------------------------------------------------------
// FRESH path
// ---------------------------------------------------------------------------
async function scenarioFresh() {
  console.log("\n=== SCENARIO: FRESH (empty DB -> canonical migrate) ===");
  await wipeTarget(dbF, freshSql);
  const expectEmpty = (await tableExists(freshSql, "user")) === false;
  const mRes = await runMigrate(freshUrl);
  record("fresh_migrate_exit_zero", mRes.status === 0, { status: mRes.status });
  if (mRes.status !== 0) {
    record("fresh_result_schema", "FAIL", { stderr: mRes.stderr });
    return;
  }
  const baselineOk =
    (await tableExists(freshSql, "user")) && (await tableExists(freshSql, "session")) &&
    (await tableExists(freshSql, "account")) && (await tableExists(freshSql, "verification")) &&
    (await tableExists(freshSql, "workspace_settings")) && (await tableExists(freshSql, "workspace_projects")) &&
    (await tableExists(freshSql, "workspace_project_notes")) && (await tableExists(freshSql, "workspace_project_milestones")) &&
    (await tableExists(freshSql, "workspace_project_documents")) &&
    (await typeExists(freshSql, "project_status")) && (await typeExists(freshSql, "project_stage")) &&
    (await typeExists(freshSql, "milestone_status")) &&
    (await typeExists(freshSql, "workspace_project_note_type")) &&
    (await typeExists(freshSql, "workspace_project_document_category"));
  record("fresh_baseline_first", baselineOk && expectEmpty, { baselineOk, expectEmpty });

  const engineeringOk =
    (await tableExists(freshSql, "workspace_engineering_work")) &&
    (await tableExists(freshSql, "workspace_engineering_work_history")) &&
    (await tableExists(freshSql, "workspace_engineering_work_defects")) &&
    (await tableExists(freshSql, "workspace_project_focus_events")) &&
    (await tableExists(freshSql, "workspace_project_focus_selection"));
  record("fresh_0000_to_0007", engineeringOk, { engineeringOk });

  const promptsOk =
    (await tableExists(freshSql, "workspace_project_prompts")) &&
    (await typeExists(freshSql, "workspace_project_prompt_type")) &&
    (await typeExists(freshSql, "workspace_project_prompt_status"));
  record("fresh_prompts_reconciliation", promptsOk, { promptsOk });

  const focusVersionBy0007 = (await columnUdt(freshSql, "workspace_projects", "focus_version")) === "int4";
  record("fresh_focus_version_introduced_by_0007", focusVersionBy0007, { focusVersionBy0007 });

  const rows = await journalRows(freshSql);
  const expected10 = ADOPTED_TAGS.map(hashOf).concat([hashOf(FORWARD_TAG)]);
  const hashesInOrder = expected10.map((e) => e.hash).join("|") === rows.map((r) => r.hash).join("|");
  const timestampsInOrder = expected10.map((e) => e.when).join("|") === rows.map((r) => Number(r.created_at)).join("|");
  record("fresh_journal_truthful", rows.length === 10 && hashesInOrder && timestampsInOrder, {
    rows: rows.length,
    hashesMatch: hashesInOrder,
    timestampsMatch: timestampsInOrder,
  });

  const before = await journalCount(freshSql);
  const mRes2 = await runMigrate(freshUrl);
  const after = await journalCount(freshSql);
  record("fresh_second_migrate_noop", mRes2.status === 0 && before === after, { status: mRes2.status, before, after });

  return await schemaFingerprint(freshSql);
}

// ---------------------------------------------------------------------------
// LEGACY path
// ---------------------------------------------------------------------------
async function scenarioLegacy() {
  console.log("\n=== SCENARIO: LEGACY (production-shaped, no journal -> adoption -> migrate) ===");
  await wipeTarget(dbL, legacySql);
  await materializeNoJournal(dbL);
  const startHasPrompts = await tableExists(legacySql, "workspace_project_prompts");
  const startJournalTable = await sqlCountJournalTable(legacySql);
  record("legacy_start_state", startHasPrompts === false && startJournalTable === 0, {
    startHasPrompts,
    journalTable: startJournalTable,
  });

  const adoptRes = await runAdoption(legacyUrl, { ADOPT_LEGACY: "true" });
  record("legacy_adoption_exit_zero", adoptRes.status === 0, { status: adoptRes.status, stderr: adoptRes.stderr });

  const rows = await journalRows(legacySql);
  const expected9 = ADOPTED_TAGS.map(hashOf);
  const hashesInOrder = expected9.map((e) => e.hash).join("|") === rows.map((r) => r.hash).join("|");
  const timestampsInOrder = expected9.map((e) => e.when).join("|") === rows.map((r) => Number(r.created_at)).join("|");
  record("legacy_adoption_journal_9_rows_truthful", rows.length === 9 && hashesInOrder && timestampsInOrder, {
    rows: rows.length,
    hashesMatch: hashesInOrder,
    timestampsMatch: timestampsInOrder,
  });
  const promptsStillAbsent = (await tableExists(legacySql, "workspace_project_prompts")) === false;
  record("legacy_adoption_no_ddl_replayed", promptsStillAbsent, { promptsStillAbsent });

  const mRes = await runMigrate(legacyUrl);
  record("legacy_migrate_exit_zero", mRes.status === 0, { status: mRes.status, stderr: mRes.stderr });
  const onlyForwardApplied = (await journalCount(legacySql)) === 10 && (await tableExists(legacySql, "workspace_project_prompts"));
  record("legacy_only_prompts_reconciliation_applied", onlyForwardApplied, { journalNow: await journalCount(legacySql) });
  const focusVersionBy0007 = (await columnUdt(legacySql, "workspace_projects", "focus_version")) === "int4";
  record("legacy_focus_version_present_after_migrate", focusVersionBy0007, { focusVersionBy0007 });

  const before = await journalCount(legacySql);
  const mRes2 = await runMigrate(legacyUrl);
  const after = await journalCount(legacySql);
  record("legacy_second_migrate_noop", mRes2.status === 0 && before === after, { status: mRes2.status, before, after });

  return await schemaFingerprint(legacySql);
}

async function sqlCountJournalTable(sql) {
  const r = await sql`SELECT count(*)::int c FROM information_schema.tables
    WHERE table_schema='drizzle' AND table_name='__drizzle_migrations'`;
  return Number(r[0].c);
}

// ---------------------------------------------------------------------------
// NEGATIVE path (on the legacy disposable target, rebuilt per scenario)
// ---------------------------------------------------------------------------
async function scenarioNegative() {
  console.log("\n=== SCENARIO: NEGATIVE guards ===");

  await wipeTarget(dbL, legacySql);
  await materializeNoJournal(dbL);
  const noFlag = await runAdoption(legacyUrl, {});
  record("negative_adoption_without_flag_refused", noFlag.status !== 0, {
    status: noFlag.status,
    out: (noFlag.stdout || "").trim().slice(0, 120),
  });

  await wipeTarget(dbL, legacySql);
  const missingObj = await runAdoption(legacyUrl, { ADOPT_LEGACY: "true" });
  record("negative_adoption_missing_objects_refused", missingObj.status !== 0, {
    status: missingObj.status,
    out: (missingObj.stdout || "").trim().split("\n").slice(-3).join(" / "),
  });

  await wipeTarget(dbL, legacySql);
  const conflictSql = [
    "CREATE TYPE project_status AS ENUM('active','testing','paused','planning','archived')",
    "CREATE TYPE project_stage AS ENUM('concept','prototype','mvp','uat','production','maintenance')",
    "CREATE TABLE \"user\" (id text PRIMARY KEY, name text NOT NULL, email text NOT NULL, email_verified boolean DEFAULT false NOT NULL, image text, created_at timestamp DEFAULT now() NOT NULL, updated_at timestamp DEFAULT now() NOT NULL)",
    "CREATE TABLE workspace_projects (id text PRIMARY KEY, name text NOT NULL, slug text NOT NULL, status text, stage project_stage DEFAULT 'concept' NOT NULL, current_focus text, next_step text, target_date timestamp, category text, description text, repo_url text, public_url text, created_at timestamp DEFAULT now() NOT NULL, updated_at timestamp DEFAULT now() NOT NULL)",
  ];
  for (const s of conflictSql) {
    await dbL.execute(sql.raw(s));
  }
  const conflict = await runAdoption(legacyUrl, { ADOPT_LEGACY: "true" });
  record("negative_adoption_column_conflict_refused", conflict.status !== 0, {
    status: conflict.status,
    out: (conflict.stdout || "").trim().split("\n").slice(-3).join(" / "),
  });

  await wipeTarget(dbL, legacySql);
  await materializeNoJournal(dbL);
  const first = await runAdoption(legacyUrl, { ADOPT_LEGACY: "true" });
  const countAfterFirst = await journalCount(legacySql);
  const second = await runAdoption(legacyUrl, { ADOPT_LEGACY: "true" });
  const countAfterSecond = await journalCount(legacySql);
  record(
    "negative_repeat_adoption_no_duplicates",
    first.status === 0 && second.status === 0 && countAfterFirst === 9 && countAfterSecond === 9,
    { countAfterFirst, countAfterSecond },
  );

  await wipeTarget(dbL, legacySql);
  await materializeNoJournal(dbL);
  const mRes = await runMigrate(legacyUrl);
  record("legacy_migrate_without_adoption_guarded", mRes.status !== 0, {
    status: mRes.status,
    stderr: (mRes.stderr || "").slice(0, 160),
  });
}

// ---------------------------------------------------------------------------
// main
// ---------------------------------------------------------------------------
async function assertNotProduction(sql, label) {
  const id = (await sql`SELECT current_setting('neon.branch_id', true) bid, current_setting('neon.endpoint_id', true) eid`)[0];
  for (const p of PRODUCTION_BLOCKLIST) {
    if (String(id.bid).includes(p) || String(id.eid).includes(p)) {
      throw new Error(`Refusing: ${label} resolves to Production (${p}).`);
    }
  }
  return id;
}

async function main() {
  const fi = await assertNotProduction(freshSql, "FRESH target");
  const li = await assertNotProduction(legacySql, "LEGACY target");
  console.log(
    `FRESH  target: ${freshHost} branch=${fi.bid}\n` +
    `LEGACY target: ${legacyHost} branch=${li.bid}`,
  );

  const freshFp = await scenarioFresh();
  const legacyFp = await scenarioLegacy();

  // Equivalence: fresh final schema === legacy final schema
  const eq = JSON.stringify(freshFp) === JSON.stringify(legacyFp);
  record("fresh_vs_legacy_final_schema_equivalent", eq, {
    freshTables: freshFp.tables.length,
    legacyTables: legacyFp.tables.length,
    freshColumns: freshFp.columns.length,
    legacyColumns: legacyFp.columns.length,
    freshEnums: freshFp.enums.length,
    legacyEnums: legacyFp.enums.length,
  });

  await scenarioNegative();

  const passed = results.filter((r) => r.status === "PASS").length;
  const failed = results.filter((r) => r.status === "FAIL").length;
  console.log(`\n=== SUMMARY: ${passed} passed, ${failed} failed of ${results.length} ===`);
  if (failed > 0) {
    for (const r of results.filter((x) => x.status === "FAIL")) {
      console.log("FAILED:", r.scenario, JSON.stringify(r.evidence));
    }
    process.exit(1);
  }
}

main().catch((error) => {
  console.error("Harness failed:", error instanceof Error ? error.stack : error);
  process.exit(1);
});
