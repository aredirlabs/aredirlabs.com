import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

import { neon } from "@neondatabase/serverless";
import { readMigrationFiles } from "drizzle-orm/migrator";

const TARGET_ID = "eng_work_23e97a29-0b92-47f1-9b93-04c6f07d6df9";
const EXPECTED_DEV_ENDPOINT = "ep-green-sunset-a6w06qwf";
const EXPECTED_PROD_ENDPOINT = "ep-nameless-dawn-a61gilim";
const EXPECTED_NEON_PROJECT = "plain-band-91202732";
const EXPECTED_PROD_BRANCH = "br-crimson-shape-a6q4y35g";
const EXPECTED_TARGET_OBJECTIVE =
  "Align the configured production/runtime database with the repository-defined Engineering Work schema by applying the existing tracked migrations without altering existing project data.";
const EXPECTED_TARGET_NEXT_ACTION =
  "Validate production target identity, authorize guarded migration execution, apply tracked Engineering Work migrations, and verify Workspace/Project/Create recovery.";

function databaseUrlFrom(file) {
  assert.ok(existsSync(file), `${file} is required.`);
  const match = readFileSync(file, "utf8").match(/^DATABASE_URL=(.+)$/m);
  assert.ok(match?.[1], `DATABASE_URL is required in ${file}.`);
  return match[1].trim().replace(/^["']|["']$/g, "");
}

function endpoint(url) {
  return new URL(url).hostname.split(".")[0].replace(/-pooler$/, "");
}

async function inspect(name, url) {
  const sql = neon(url);
  const [identity] = await sql.query(`
    SELECT current_database() AS database_name,
           current_setting('neon.project_id', true) AS project_id,
           current_setting('neon.branch_id', true) AS branch_id,
           pg_current_wal_lsn()::text AS current_lsn,
           clock_timestamp() AS server_time
  `);
  const [migrationTable] = await sql.query(
    "SELECT to_regclass('drizzle.__drizzle_migrations') IS NOT NULL AS present",
  );
  const migrations = migrationTable.present
    ? await sql.query("SELECT id, hash, created_at FROM drizzle.__drizzle_migrations ORDER BY id")
    : [];
  const relations = await sql.query(`
    SELECT table_name
      FROM information_schema.tables
     WHERE table_schema = 'public'
       AND table_name = ANY(ARRAY[
         'workspace_engineering_work',
         'workspace_engineering_work_defects',
         'workspace_engineering_work_history',
         'workspace_engineering_work_defect_revisions'
       ])
     ORDER BY table_name
  `);
  const columns = await sql.query(`
    SELECT column_name, is_nullable, column_default
      FROM information_schema.columns
     WHERE table_schema = 'public'
       AND table_name = 'workspace_engineering_work'
     ORDER BY ordinal_position
  `);
  const columnNames = new Set(columns.map((row) => row.column_name));
  const optionalProjection = [
    "final_disposition",
    "version",
  ].filter((column) => columnNames.has(column));
  const projectionSelect = optionalProjection.length
    ? `, ${optionalProjection.map((column) => `work."${column}"`).join(", ")}`
    : "";
  const [target] = await sql.query(`
    SELECT work.id, project.id AS project_id, project.name AS project_name,
           project.slug AS project_slug, work.title, work.summary,
           work.type::text AS type, work.workflow::text AS workflow,
           work.state::text AS state, work.current_next_action,
           work.current_outcome, work.condition, work.condition_rationale
           ${projectionSelect}
      FROM workspace_engineering_work AS work
      JOIN workspace_projects AS project ON project.id = work.project_id
     WHERE work.id = $1
  `, [TARGET_ID]);
  const [counts] = await sql.query(`
    SELECT
      (SELECT count(*)::int FROM workspace_engineering_work) AS work_items,
      (SELECT count(*)::int FROM workspace_engineering_work WHERE current_next_action IS NULL) AS null_next_actions,
      (SELECT count(*)::int FROM workspace_engineering_work_defects) AS defects,
      (SELECT count(*)::int
         FROM workspace_engineering_work_defects AS defect
         JOIN workspace_engineering_work AS work ON work.id = defect.engineering_work_id
        WHERE work.workflow <> 'defect') AS incompatible_defects
  `);
  const historyPresent = relations.some((row) => row.table_name === "workspace_engineering_work_history");
  const [targetHistory] = historyPresent
    ? await sql.query(
        "SELECT count(*)::int AS count FROM workspace_engineering_work_history WHERE engineering_work_id = $1",
        [TARGET_ID],
      )
    : [{ count: 0 }];
  const [allHistory] = historyPresent
    ? await sql.query("SELECT count(*)::int AS count FROM workspace_engineering_work_history")
    : [{ count: 0 }];

  return {
    name,
    endpoint: endpoint(url),
    databaseName: identity.database_name,
    projectId: identity.project_id,
    branchId: identity.branch_id,
    currentLsn: identity.current_lsn,
    serverTime: identity.server_time,
    migrations: migrations.map((migration) => ({
      id: migration.id,
      hash: migration.hash,
      createdAt: Number(migration.created_at),
    })),
    relations: relations.map((row) => row.table_name),
    lifecycleColumns: columns
      .filter((column) => ["current_next_action", "final_disposition", "version"].includes(column.column_name))
      .map((column) => ({
        name: column.column_name,
        nullable: column.is_nullable,
        default: column.column_default,
      })),
    counts,
    target: target ?? null,
    targetHistoryCount: targetHistory.count,
    allHistoryCount: allHistory.count,
  };
}

async function main() {
  const devUrl = databaseUrlFrom(".env.local");
  const prodUrl = databaseUrlFrom(".env.production.local");
  assert.notEqual(devUrl, prodUrl, "Production and Development URLs must differ.");
  assert.equal(endpoint(devUrl), EXPECTED_DEV_ENDPOINT, "Development endpoint is not the approved target.");

  const [dev, production] = await Promise.all([
    inspect("development", devUrl),
    inspect("production", prodUrl),
  ]);
  assert.notEqual(production.endpoint, dev.endpoint, "Production endpoint must differ from Development.");
  assert.equal(production.endpoint, EXPECTED_PROD_ENDPOINT, "Production endpoint changed.");
  assert.equal(production.projectId, EXPECTED_NEON_PROJECT, "Production Neon project changed.");
  assert.equal(production.branchId, EXPECTED_PROD_BRANCH, "Production Neon branch changed.");
  assert.ok(production.target, "Production acceptance target is missing.");
  assert.equal(production.target.project_name, "AredirLabs.com");
  assert.equal(production.target.title, "Production Engineering Work Schema Alignment");
  assert.equal(production.target.project_slug, "aredirlabs-com");
  assert.equal(production.target.summary, EXPECTED_TARGET_OBJECTIVE);
  assert.equal(production.target.type, "maintenance");
  assert.equal(production.target.workflow, "maintenance");
  assert.equal(production.target.state, "active");
  assert.equal(production.target.current_outcome, null);
  assert.equal(production.target.condition, null);
  assert.equal(production.target.condition_rationale, null);
  assert.equal(production.target.current_next_action, EXPECTED_TARGET_NEXT_ACTION);
  assert.equal(production.targetHistoryCount, 0, "Acceptance target must have no fabricated history.");
  assert.equal(production.allHistoryCount, 0, "Production must have no fabricated lifecycle history before acceptance.");
  assert.equal(production.counts.incompatible_defects, 0);

  const journal = JSON.parse(readFileSync("drizzle/meta/_journal.json", "utf8"));
  const localMigrations = readMigrationFiles({ migrationsFolder: "drizzle" });
  const local = journal.entries.map((entry, index) => ({
    tag: entry.tag,
    when: entry.when,
    hash: localMigrations[index].hash,
  }));
  const appliedHashes = new Set(production.migrations.map((migration) => migration.hash));
  const localHashes = new Set(local.map((migration) => migration.hash));
  assert.ok(
    production.migrations.every((migration) => localHashes.has(migration.hash)),
    "Production contains a migration hash outside the local tracked sequence.",
  );
  const pending = local.filter((migration) => !appliedHashes.has(migration.hash));
  assert.ok(
    pending.length === 0 ||
      (pending.length === 2 &&
        pending[0].tag === "0003_engineering_work_lifecycle_history" &&
        pending[1].tag === "0004_engineering_work_history_chain_integrity"),
    "Production is not at the approved pre-migration or post-migration ledger state.",
  );

  const readySchema = production.relations.includes("workspace_engineering_work_history");
  assert.equal(
    readySchema,
    production.relations.includes("workspace_engineering_work_defect_revisions"),
    "Lifecycle history and Defect revision tables must appear together.",
  );
  if (readySchema) {
    assert.equal(pending.length, 0, "Ready lifecycle schema cannot have pending migrations.");
    assert.equal(production.target.version, 1, "Frozen acceptance target must remain at version 1.");
    assert.equal(production.target.final_disposition, null);
    assert.equal(
      production.lifecycleColumns.find((column) => column.name === "current_next_action")?.nullable,
      "YES",
    );
  } else {
    assert.deepEqual(
      pending.map((migration) => migration.tag),
      ["0003_engineering_work_lifecycle_history", "0004_engineering_work_history_chain_integrity"],
    );
  }

  console.log(JSON.stringify({
    auditedAt: new Date().toISOString(),
    development: {
      endpoint: dev.endpoint,
      databaseName: dev.databaseName,
      projectId: dev.projectId,
      branchId: dev.branchId,
      migrationCount: dev.migrations.length,
    },
    production: {
      endpoint: production.endpoint,
      databaseName: production.databaseName,
      projectId: production.projectId,
      branchId: production.branchId,
      currentLsn: production.currentLsn,
      serverTime: production.serverTime,
      migrationCount: production.migrations.length,
      relations: production.relations,
      lifecycleColumns: production.lifecycleColumns,
      counts: production.counts,
      target: production.target,
      targetHistoryCount: production.targetHistoryCount,
      allHistoryCount: production.allHistoryCount,
    },
    localMigrations: local.map(({ tag, when }) => ({ tag, when })),
    pendingProductionMigrations: pending.map(({ tag, when }) => ({ tag, when })),
  }, null, 2));
}

main().catch((error) => {
  console.error(`Production readiness audit failed: ${error.message}`);
  process.exitCode = 1;
});
