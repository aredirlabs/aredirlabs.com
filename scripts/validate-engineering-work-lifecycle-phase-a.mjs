import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";

import { neon } from "@neondatabase/serverless";

const EXPECTED_DEV_ENDPOINT = "ep-green-sunset-a6w06qwf";
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required.");

const hostname = new URL(databaseUrl).hostname;
if (!hostname.startsWith(EXPECTED_DEV_ENDPOINT)) {
  throw new Error(`Refusing Phase A validation against unapproved host: ${hostname}`);
}

const sql = neon(databaseUrl);

const [identity] = await sql.query(`
  SELECT current_database() AS database_name,
         current_setting('neon.project_id', true) AS project_id,
         current_setting('neon.branch_id', true) AS branch_id
`);
assert.equal(identity.database_name, "neondb");
assert.equal(identity.project_id, "plain-band-91202732");
assert.equal(identity.branch_id, "br-wandering-snow-a60tz3pl");

const [baseline] = await sql.query(`
  SELECT
    (SELECT count(*)::int FROM workspace_projects) AS projects,
    (SELECT count(*)::int FROM workspace_engineering_work) AS work_items,
    (SELECT count(*)::int FROM workspace_engineering_work_defects) AS defects,
    (SELECT count(*)::int FROM workspace_engineering_work_history) AS history_events,
    (SELECT count(*)::int FROM workspace_engineering_work_defect_revisions) AS defect_revisions,
    (SELECT count(*)::int FROM workspace_engineering_work WHERE version <> 1) AS nonbaseline_versions,
    (SELECT count(*)::int FROM drizzle.__drizzle_migrations) AS migrations
`);
assert.equal(baseline.nonbaseline_versions, 0);
assert.ok(baseline.migrations >= 5);

const columns = await sql.query(`
  SELECT column_name, is_nullable, column_default
    FROM information_schema.columns
   WHERE table_schema = 'public'
     AND table_name = 'workspace_engineering_work'
     AND column_name = ANY(ARRAY['current_next_action', 'final_disposition', 'version'])
   ORDER BY column_name
`);
assert.deepEqual(
  columns.map((column) => column.column_name),
  ["current_next_action", "final_disposition", "version"],
);
assert.equal(
  columns.find((column) => column.column_name === "current_next_action")?.is_nullable,
  "YES",
);
assert.match(
  String(columns.find((column) => column.column_name === "version")?.column_default),
  /1/,
);

const triggers = await sql.query(`
  SELECT relation.relname AS event_object_table, trigger.tgname AS trigger_name
    FROM pg_trigger AS trigger
    JOIN pg_class AS relation ON relation.oid = trigger.tgrelid
    JOIN pg_namespace AS namespace ON namespace.oid = relation.relnamespace
   WHERE namespace.nspname = 'public'
     AND NOT trigger.tgisinternal
     AND trigger.tgname LIKE 'workspace_engineering_work%append_only%'
   ORDER BY relation.relname, trigger.tgname
`);
assert.equal(new Set(triggers.map((trigger) => trigger.trigger_name)).size, 4);

const constraints = await sql.query(`
  SELECT conname
    FROM pg_constraint
   WHERE conname = ANY(ARRAY[
     'workspace_engineering_work_history_same_work_basis_fk',
     'workspace_engineering_work_defect_revisions_same_work_event_fk'
   ])
   ORDER BY conname
`);
assert.equal(constraints.length, 2);

async function assertNoValidationResidue(ids) {
  const [residue] = await sql.query(
    `SELECT
       (SELECT count(*)::int FROM workspace_projects WHERE id = ANY($1::text[])) AS projects,
       (SELECT count(*)::int FROM workspace_engineering_work WHERE id = ANY($1::text[])) AS work_items,
       (SELECT count(*)::int FROM workspace_engineering_work_history WHERE id = ANY($1::text[])) AS history_events`,
    [ids],
  );
  assert.deepEqual(residue, { projects: 0, work_items: 0, history_events: 0 });
}

const rollbackToken = randomUUID();
const rollbackIds = [
  `phase_a_project_${rollbackToken}`,
  `phase_a_work_${rollbackToken}`,
  `phase_a_history_${rollbackToken}`,
];
await assert.rejects(
  sql.transaction([
    sql.query(
      `WITH inserted_project AS (
       INSERT INTO workspace_projects (id, name, slug)
       VALUES ($1, 'Phase A rollback validation', $1)
       RETURNING id
     )
       INSERT INTO workspace_engineering_work (
         id, project_id, title, summary, type, workflow, state, current_next_action
       )
       SELECT $2, id, 'Phase A rollback work', 'Validate atomic rollback.',
              'verification', 'verification', 'active', 'Attempt invalid history insert.'
         FROM inserted_project
       RETURNING id`,
      rollbackIds.slice(0, 2),
    ),
    sql.query(
      `WITH current_work AS (
       SELECT *
         FROM workspace_engineering_work
        WHERE id = $1 AND version = 1
        FOR UPDATE
     ),
     updated_work AS (
       UPDATE workspace_engineering_work AS work
          SET current_next_action = 'This update must roll back.',
              version = work.version + 1
         FROM current_work
        WHERE work.id = current_work.id
       RETURNING work.*
     )
     INSERT INTO workspace_engineering_work_history (
       id, engineering_work_id, kind, action_type,
       prior_state, resulting_state, action_actor_type, action_actor_identifier
     )
     SELECT $2, id, 'operational_update', 'rollback_validation',
            state, state, 'system', ''
       FROM updated_work`,
      rollbackIds.slice(1),
    ),
  ]),
  /workspace_engineering_work_history_action_actor_nonblank/,
);
await assertNoValidationResidue(rollbackIds);

const appendOnlyToken = randomUUID();
const appendOnlyIds = [
  `phase_a_project_${appendOnlyToken}`,
  `phase_a_work_${appendOnlyToken}`,
  `phase_a_history_${appendOnlyToken}`,
  `phase_a_forced_failure_${appendOnlyToken}`,
];
await assert.rejects(
  sql.transaction([
    sql.query(
      `WITH inserted_project AS (
       INSERT INTO workspace_projects (id, name, slug)
       VALUES ($1, 'Phase A append-only validation', $1)
       RETURNING id
     ),
     inserted_work AS (
       INSERT INTO workspace_engineering_work (
         id, project_id, title, summary, type, workflow, state, current_next_action
       )
       SELECT $2, id, 'Phase A append-only work', 'Validate immutable history.',
              'verification', 'verification', 'active', 'Attempt forbidden deletion.'
         FROM inserted_project
       RETURNING id, state
     )
       INSERT INTO workspace_engineering_work_history (
         id, engineering_work_id, kind, action_type,
         prior_state, resulting_state, action_actor_type, action_actor_identifier
       )
       SELECT $3, id, 'decision_recorded', 'append_only_validation',
              state, state, 'system', 'phase-a-validator'
         FROM inserted_work
       RETURNING id`,
      appendOnlyIds.slice(0, 3),
    ),
    sql.query(
      `DELETE FROM workspace_engineering_work_history WHERE id = $1`,
      [appendOnlyIds[2]],
    ),
    sql.query(
      `INSERT INTO workspace_engineering_work_history (
         id, engineering_work_id, kind, action_type,
         action_actor_type, action_actor_identifier
       )
       VALUES ($1, $2, 'decision_recorded', 'forced_rollback', 'system', '')`,
      [appendOnlyIds[3], appendOnlyIds[1]],
    ),
  ]),
  /Engineering Work history is append-only/,
);
await assertNoValidationResidue(appendOnlyIds);

const [finalCounts] = await sql.query(`
  SELECT
    (SELECT count(*)::int FROM workspace_projects) AS projects,
    (SELECT count(*)::int FROM workspace_engineering_work) AS work_items,
    (SELECT count(*)::int FROM workspace_engineering_work_defects) AS defects,
    (SELECT count(*)::int FROM workspace_engineering_work_history) AS history_events,
    (SELECT count(*)::int FROM workspace_engineering_work_defect_revisions) AS defect_revisions
`);
assert.deepEqual(finalCounts, {
  projects: baseline.projects,
  work_items: baseline.work_items,
  defects: baseline.defects,
  history_events: baseline.history_events,
  defect_revisions: baseline.defect_revisions,
});

console.log(
  JSON.stringify(
    {
      result: "Phase A Dev migration validation passed",
      target: {
        hostname,
        database: identity.database_name,
        project: identity.project_id,
        branch: identity.branch_id,
      },
      preservedCounts: finalCounts,
      migrations: baseline.migrations,
      appendOnlyTriggers: 4,
      atomicRollback: "verified",
      fabricatedHistory: baseline.history_events === 0 ? "none" : "not assessed by count alone",
    },
    null,
    2,
  ),
);
