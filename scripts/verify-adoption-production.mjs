#!/usr/bin/env node
// Production adoption verification harness (NO database contact).
//
// Exercises the exact identity policy and reconciliation boundary of
// scripts/adopt-production-migration-journal.mjs against a SYNTHETIC db client
// that mimics the Neon HTTP query surface (tagged templates, `.unsafe`,
// `.transaction`). All scenarios run entirely in-memory: no Production,
// Development, or disposable database is contacted.

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runProductionAdoption } from "./adopt-production-migration-journal.mjs";
import {
  ADOPTED_TAGS,
  FORWARD_TAG,
  MANIFEST,
  PRODUCTION_IDENTITY,
  PROMPTS_TABLE,
  PROMPTS_ENUMS,
  migrationHash,
} from "./lib/migration-reconcile-engine.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROD_SCRIPT = path.join(__dirname, "adopt-production-migration-journal.mjs");

// Canonical prepared rows (hash + when) from the authoritative journal.
const prepared = ADOPTED_TAGS.map((tag) => migrationHash(tag));
const forward = migrationHash(FORWARD_TAG);

// Manifest object names for present/absent control.
const columnUdt = {};
for (const t of ADOPTED_TAGS) {
  for (const [, [table, column, udt]] of Object.entries(MANIFEST[t].columns ?? {})) {
    columnUdt[`${table}.${column}`] = udt;
  }
}

// ---------------------------------------------------------------------------
// Synthetic Neon-like db client.
//
// - Callable as a tagged template: db`SELECT ... ${value}`.
// - db.unsafe(name) interpolates verbatim (identifier marker).
// - db.transaction([...queries]) batch-applies to a SHADOW store; commits only
//   when the scenario says the transaction succeeds.
// ---------------------------------------------------------------------------
function makeFakeDb(scenario) {
  const state = {
    store: new Map((scenario.journalRows || []).map((r) => [r.hash, Number(r.created_at)])),
    tablePresent: Boolean(scenario.journalTablePresent),
  };
  const missing = new Set(scenario.missing || []);
  const udtOverrides = scenario.udtOverrides || {};

  async function respond(sqlText) {
    const s = sqlText;

    // 1. Live identity read (parameter-less; unresolved values are absent).
    if (s.includes("current_setting('neon.project_id'")) {
      if (scenario.identityThrows) throw new Error("synthetic identity read failure");
      const id = scenario.identity || {};
      return [
        {
          project_id: id.projectId,
          branch_id: id.branchId,
          endpoint_id: id.endpointId,
          db: id.database,
        },
      ];
    }

    // 2. Journal-table existence check (drizzle schema).
    if (s.includes("information_schema.tables") && s.includes("'drizzle'")) {
      return state.tablePresent ? [{ 1: 1 }] : [];
    }

    // 3. Existing journal rows.
    if (s.includes("SELECT hash, created_at FROM")) {
      return [...state.store.entries()].map(([hash, created_at]) => ({ hash, created_at }));
    }

    // 4. DDL must only ever run inside transaction().
    if (s.includes("CREATE SCHEMA IF NOT EXISTS") || s.includes("CREATE TABLE IF NOT EXISTS")) {
      throw new Error("fake: DDL escaped the transaction boundary");
    }

    // 5. Prompt objects: present ONLY when the scenario says so.
    if (s.includes(PROMPTS_TABLE) && s.includes("information_schema.tables")) {
      return scenario.prompts?.includes("table") ? [{ 1: 1 }] : [];
    }
    const promptEnum = PROMPTS_ENUMS.find((e) => s.includes(`typname=${e}`));
    if (promptEnum) {
      return scenario.prompts?.includes(promptEnum) ? [{ 1: 1 }] : [];
    }

    // 6. Enum types (manifest).
    const typeName = s.match(/typname=([A-Za-z0-9_]+)/)?.[1];
    if (typeName) return missing.has(typeName) ? [] : [{ 1: 1 }];

    // 7. Base tables (public).
    if (s.includes("information_schema.tables") && s.includes("table_type='BASE TABLE'")) {
      const tableName = s.match(/table_name=([A-Za-z0-9_]+)/)?.[1];
      return tableName && missing.has(tableName) ? [] : [{ 1: 1 }];
    }

    // 8. Columns (udt check).
    if (s.includes("information_schema.columns")) {
      const tableName = s.match(/table_name=([A-Za-z0-9_]+)/)?.[1];
      const columnName = s.match(/column_name=([A-Za-z0-9_]+)/)?.[1];
      if (tableName && columnName) {
        const key = `${tableName}.${columnName}`;
        return [{ udt_name: udtOverrides[key] ?? columnUdt[key] ?? null }];
      }
      return [{ 1: 1 }];
    }

    // 9. Indexes.
    const indexName = s.match(/indexname=([A-Za-z0-9_]+)/)?.[1];
    if (indexName) return missing.has(indexName) ? [] : [{ 1: 1 }];

    // 10. Constraints.
    const conName = s.match(/conname=([A-Za-z0-9_]+)/)?.[1];
    if (conName) return missing.has(conName) ? [] : [{ 1: 1 }];

    return [];
  }

  const db = (strings, ...values) => {
    let sqlText = strings[0];
    for (let i = 0; i < values.length; i++) {
      sqlText += String(values[i] ?? "") + strings[i + 1];
    }
    // Lazy promise-like: the query only executes (and can only reject) when it
    // is awaited. Queries inside db.transaction([...]) are consumed by the fake
    // transaction via their sqlText and never run outside it.
    let executed = null;
    const query = {
      sqlText,
      then(onFulfilled, onRejected) {
        executed ??= Promise.resolve().then(() => respond(sqlText));
        return executed.then(onFulfilled, onRejected);
      },
    };
    return query;
  };

  db.unsafe = (value) => ({ toString: () => value });

  db.transaction = async (queries) => {
    if (scenario.transactionThrows) throw new Error("synthetic transaction failure");
    const shadow = new Map(state.store);
    let shadowTable = state.tablePresent;
    for (const q of queries) {
      const s = q.sqlText;
      if (s.includes("CREATE TABLE IF NOT EXISTS")) shadowTable = true;
      else if (s.includes("INSERT INTO")) {
        const m = s.match(/VALUES \('([0-9a-f]+)',\s*(\d+)\)/);
        if (m) shadow.set(m[1], Number(m[2]));
      }
    }
    state.store = shadow;
    state.tablePresent = shadowTable;
    return queries.map(() => []);
  };

  db.fakeState = state;
  return db;
}

// ---------------------------------------------------------------------------
// Runner
// ---------------------------------------------------------------------------
const results = [];
function record(name, expected, actual, ok) {
  results.push({ name, expected, actual, ok });
  console.log(
    `  [${ok ? "PASS" : "FAIL"}] ${name} (expected=${JSON.stringify(expected)} actual=${JSON.stringify(actual)})`,
  );
}

async function runScenario(name, scenario, expectedStatus) {
  const db = makeFakeDb(scenario);
  const out = [];
  const origLog = console.log;
  const origErr = console.error;
  console.log = (...a) => out.push(a.join(" "));
  console.error = (...a) => out.push(a.join(" "));
  let status = "threw";
  try {
    const result = await runProductionAdoption({ sql: db });
    status = result.status;
  } catch (e) {
    status = `threw:${e instanceof Error ? e.message : e}`;
  } finally {
    console.log = origLog;
    console.error = origErr;
  }
  const ok = status === expectedStatus;
  record(name, expectedStatus, status, ok);
  return ok;
}

function runCliGuard(name, env, expectedStatus) {
  const res = spawnSync(process.execPath, [PROD_SCRIPT], {
    env: { ...process.env, ...env },
    encoding: "utf8",
  });
  const ok = res.status === expectedStatus;
  record(name, expectedStatus, res.status, ok);
  return ok;
}

// ---------------------------------------------------------------------------
// Scenarios
// ---------------------------------------------------------------------------
const goodIdentity = { ...PRODUCTION_IDENTITY };
const devIdentity = {
  projectId: "plain-band-91202732",
  branchId: "br-wandering-snow-a60tz3pl",
  endpointId: "ep-green-sunset-a6w06qwf",
  database: "neondb",
};

function baseScenario(over = {}) {
  return {
    identity: goodIdentity,
    journalTablePresent: false,
    journalRows: [],
    prompts: [],
    missing: [],
    udtOverrides: {},
    transactionThrows: false,
    identityThrows: false,
    ...over,
  };
}

let failed = false;

async function main() {
  console.log("\n=== CLI-level guards (no DB) ===");
  if (!runCliGuard("missing_ADOPT_PROD", {}, 2)) failed = true;
  if (!runCliGuard("missing_PROD_ADOPT_DATABASE_URL", { ADOPT_PROD: "true" }, 2)) failed = true;
  if (!runCliGuard("embraces_only_legacy_flag", { ADOPT_LEGACY: "true", PROD_ADOPT_DATABASE_URL: "postgresql://x" }, 2)) failed = true;

  console.log("\n=== Identity policy ===");
  if (!(await runScenario("identity_exact_match", baseScenario(), "adopted"))) failed = true;
  if (!(await runScenario("project_mismatch", baseScenario({ identity: { ...goodIdentity, projectId: "wrong-project" } }), "identity-mismatch"))) failed = true;
  if (!(await runScenario("development_target_rejected", baseScenario({ identity: devIdentity }), "identity-mismatch"))) failed = true;
  if (!(await runScenario("endpoint_mismatch", baseScenario({ identity: { ...goodIdentity, endpointId: "ep-wrong-endpoint" } }), "identity-mismatch"))) failed = true;
  if (!(await runScenario("database_mismatch", baseScenario({ identity: { ...goodIdentity, database: "otherdb" } }), "identity-mismatch"))) failed = true;
  if (!(await runScenario("identity_unavailable", baseScenario({ identityThrows: true }), "identity-unavailable"))) failed = true;

  console.log("\n=== Materialization ===");
  if (!(await runScenario("missing_historical_object", baseScenario({ missing: ["user"] }), "materialization-failed"))) failed = true;
  if (!(await runScenario("conflicting_udt", baseScenario({ udtOverrides: { "workspace_projects.status": "text" } }), "materialization-failed"))) failed = true;

  console.log("\n=== Journal-state rules ===");
  if (!(await runScenario(
    "unknown_hash_journaled",
    baseScenario({ journalTablePresent: true, journalRows: [{ hash: "f".repeat(64), created_at: prepared[3].when }] }),
    "journal-conflict",
  ))) failed = true;
  if (!(await runScenario(
    "known_hash_wrong_when",
    baseScenario({ journalTablePresent: true, journalRows: [{ hash: prepared[0].hash, created_at: 9999 }] }),
    "journal-conflict",
  ))) failed = true;
  if (!(await runScenario(
    "journaled_0008",
    baseScenario({ journalTablePresent: true, journalRows: [{ hash: forward.hash, created_at: forward.when }] }),
    "journal-conflict",
  ))) failed = true;
  if (!(await runScenario(
    "valid_partial_adoption",
    baseScenario({ journalTablePresent: true, journalRows: prepared.slice(0, 3).map((m) => ({ hash: m.hash, created_at: m.when })) }),
    "adopted",
  ))) failed = true;
  if (!(await runScenario(
    "invalid_partial_adoption",
    baseScenario({
      journalTablePresent: true,
      journalRows: [
        { hash: prepared[0].hash, created_at: prepared[0].when },
        { hash: prepared[1].hash, created_at: 9999 },
      ],
    }),
    "journal-conflict",
  ))) failed = true;
  if (!(await runScenario(
    "repeat_adoption_noop",
    baseScenario({ journalTablePresent: true, journalRows: prepared.map((m) => ({ hash: m.hash, created_at: m.when })) }),
    "noop",
  ))) failed = true;

  console.log("\n=== Prompts state ===");
  if (!(await runScenario("prompts_fully_present", baseScenario({ prompts: ["table", ...PROMPTS_ENUMS] }), "prompts-present"))) failed = true;
  if (!(await runScenario("prompts_partial", baseScenario({ prompts: [PROMPTS_ENUMS[0]] }), "prompts-present"))) failed = true;

  console.log("\n=== Transaction atomicity ===");
  const txnScenario = baseScenario({ journalTablePresent: false, transactionThrows: true });
  {
    const db = makeFakeDb(txnScenario);
    let threw = false;
    try {
      await runProductionAdoption({ sql: db });
    } catch {
      threw = true;
    }
    const storeUnchanged = db.fakeState.store.size === 0 && db.fakeState.tablePresent === false;
    const ok = threw && storeUnchanged;
    record("transaction_failure_no_partial_write", true, { threw, storeUnchanged }, ok);
    if (!ok) failed = true;
  }

  // ---------------------------------------------------------------------------
  const failedCount = results.filter((r) => !r.ok).length;
  console.log(
    `\n=== PRODUCTION HARNESS: ${results.length - failedCount} passed, ${failedCount} failed of ${results.length} ===`,
  );
  if (failed || failedCount > 0) {
    for (const r of results.filter((x) => !x.ok)) console.log("FAILED:", r.name, JSON.stringify(r));
    process.exit(1);
  }
}

main().catch((e) => {
  console.error("Production harness failed:", e?.stack || e);
  process.exit(1);
});
