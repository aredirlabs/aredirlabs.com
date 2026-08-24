/**
 * Dev-only physical cleanup for Package 2 validation residue (focus_val_% / focus-val-*).
 * Temporarily disables append-only DELETE triggers, removes the validation graph, restores triggers.
 */
import assert from "node:assert/strict";

import { neon } from "@neondatabase/serverless";

import { asSqlExecutor, queryOne } from "./neon-sql-executor";

const EXPECTED_DEV_ENDPOINT = "ep-green-sunset-a6w06qwf";
const LEGITIMATE_PROJECT_IDS = ["proj_01", "proj_02", "proj_03", "proj_04"] as const;
const LEGITIMATE_SLUGS = ["alignfit", "aredirlabs-com", "classforge", "leagueos"] as const;

const FOCUS_EVENT_APPEND_ONLY_TRIGGERS = [
  "workspace_project_focus_events_append_only_rows",
  "workspace_project_focus_events_append_only_truncate",
] as const;

const HISTORY_APPEND_ONLY_TRIGGERS = [
  "workspace_engineering_work_history_append_only_rows",
  "workspace_engineering_work_history_append_only_truncate",
] as const;

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required.");

const hostname = new URL(databaseUrl).hostname;
if (!hostname.startsWith(EXPECTED_DEV_ENDPOINT)) {
  throw new Error(`Refusing validation cleanup against unapproved host: ${hostname}`);
}

const sql = neon(databaseUrl);
const sqlExecutor = asSqlExecutor(sql);

type ValidationCounts = {
  projects: number;
  engineeringWork: number;
  focusSelections: number;
  focusEvents: number;
  history: number;
};

async function countValidationScope() {
  const counts = await queryOne(sqlExecutor, `
    WITH validation_projects AS (
      SELECT id
      FROM workspace_projects
      WHERE id LIKE 'focus_val_%'
         OR slug LIKE 'focus-val-%'
    )
    SELECT
      (SELECT count(*)::int FROM validation_projects) AS projects,
      (SELECT count(*)::int
         FROM workspace_engineering_work w
         JOIN validation_projects vp ON vp.id = w.project_id) AS engineering_work,
      (SELECT count(*)::int
         FROM workspace_project_focus_selection s
         JOIN validation_projects vp ON vp.id = s.project_id) AS focus_selections,
      (SELECT count(*)::int
         FROM workspace_project_focus_events e
         JOIN validation_projects vp ON vp.id = e.project_id) AS focus_events,
      (SELECT count(*)::int
         FROM workspace_engineering_work_history h
         JOIN workspace_engineering_work w ON w.id = h.engineering_work_id
         JOIN validation_projects vp ON vp.id = w.project_id) AS history
  `);
  return {
    projects: Number(counts.projects),
    engineeringWork: Number(counts.engineering_work),
    focusSelections: Number(counts.focus_selections),
    focusEvents: Number(counts.focus_events),
    history: Number(counts.history),
  } satisfies ValidationCounts;
}

async function verifyScopeSafety() {
  const legitimateOverlap = await sqlExecutor.query(
    `SELECT id, slug, name
     FROM workspace_projects
     WHERE (id = ANY($1::text[]) OR slug = ANY($2::text[]))
       AND (id LIKE 'focus_val_%' OR slug LIKE 'focus-val-%')`,
    [LEGITIMATE_PROJECT_IDS, LEGITIMATE_SLUGS],
  );
  assert.equal(
    legitimateOverlap.length,
    0,
    "Legitimate product Projects must not match validation identity predicates.",
  );

  const strayWork = await sqlExecutor.query(`
    WITH validation_projects AS (
      SELECT id FROM workspace_projects
      WHERE id LIKE 'focus_val_%' OR slug LIKE 'focus-val-%'
    )
    SELECT w.id, w.project_id
    FROM workspace_engineering_work w
    WHERE w.id LIKE 'focus_val_%'
      AND NOT EXISTS (SELECT 1 FROM validation_projects vp WHERE vp.id = w.project_id)
  `);
  assert.equal(strayWork.length, 0, "All focus_val_% work must belong to a validation Project.");

  const strayHistory = await sqlExecutor.query(`
    WITH validation_projects AS (
      SELECT id FROM workspace_projects
      WHERE id LIKE 'focus_val_%' OR slug LIKE 'focus-val-%'
    ),
    validation_work AS (
      SELECT w.id FROM workspace_engineering_work w
      JOIN validation_projects vp ON vp.id = w.project_id
    )
    SELECT h.id, h.engineering_work_id
    FROM workspace_engineering_work_history h
    WHERE h.id LIKE 'focus_val_%'
      AND NOT EXISTS (SELECT 1 FROM validation_work vw WHERE vw.id = h.engineering_work_id)
  `);
  assert.equal(strayHistory.length, 0, "All focus_val_% history must belong to validation work.");

  const strayFocus = await sqlExecutor.query(`
    WITH validation_projects AS (
      SELECT id FROM workspace_projects
      WHERE id LIKE 'focus_val_%' OR slug LIKE 'focus-val-%'
    )
    SELECT e.id, e.project_id
    FROM workspace_project_focus_events e
    WHERE e.id LIKE 'focus_val_%'
      AND NOT EXISTS (SELECT 1 FROM validation_projects vp WHERE vp.id = e.project_id)
  `);
  assert.equal(strayFocus.length, 0, "All focus_val_% focus events must belong to validation Projects.");
}

async function readLegitimateProjects() {
  return sqlExecutor.query(
    `SELECT id, name, slug, status, stage, created_at, updated_at
     FROM workspace_projects
     WHERE id = ANY($1::text[])
     ORDER BY id`,
    [LEGITIMATE_PROJECT_IDS],
  );
}

async function verifyAppendOnlyProtection() {
  const probeProjectId = "focus_val_cleanup_probe_project";
  const probeProjectSlug = "focus-val-cleanup-probe";
  const probeWorkId = "focus_val_cleanup_probe_work";
  const probeHistoryId = "focus_val_cleanup_probe_history";
  const probeEventId = "focus_val_cleanup_probe_event";

  await assert.rejects(
    sql.transaction([
      sql.query(
        `INSERT INTO workspace_projects (id, name, slug, status)
         VALUES ($1, 'Append-only probe', $2, 'active')`,
        [probeProjectId, probeProjectSlug],
      ),
      sql.query(
        `INSERT INTO workspace_engineering_work (
           id, project_id, title, summary, type, workflow, state, current_next_action, version
         ) VALUES ($1, $2, 'Probe work', 'Probe summary', 'task', 'delivery', 'active', 'Probe', 1)`,
        [probeWorkId, probeProjectId],
      ),
      sql.query(
        `INSERT INTO workspace_engineering_work_history (
           id, engineering_work_id, kind, action_type, resulting_state,
           action_actor_type, action_actor_identifier, occurred_at
         ) VALUES ($1, $2, 'created', 'create', 'active', 'system', 'cleanup-probe', statement_timestamp())`,
        [probeHistoryId, probeWorkId],
      ),
      sql.query(
        `INSERT INTO workspace_project_focus_events (
           id, project_id, engineering_work_id, effect, command_context, batch_id,
           action_actor_type, action_actor_identifier,
           decision_actor_type, decision_actor_identifier,
           authority_type, occurred_at
         ) VALUES ($1, $2, $3, 'selected', 'add', 'probe-batch',
                   'human', 'probe', 'human', 'probe', 'human_owner', statement_timestamp())`,
        [probeEventId, probeProjectId, probeWorkId],
      ),
      sql.query(
        `UPDATE workspace_project_focus_events SET rationale = 'mutated' WHERE id = $1`,
        [probeEventId],
      ),
    ]),
    /append-only/i,
  );

  await assert.rejects(
    sql.transaction([
      sql.query(
        `INSERT INTO workspace_projects (id, name, slug, status)
         VALUES ($1, 'Append-only probe', $2, 'active')`,
        [probeProjectId, probeProjectSlug],
      ),
      sql.query(
        `INSERT INTO workspace_engineering_work (
           id, project_id, title, summary, type, workflow, state, current_next_action, version
         ) VALUES ($1, $2, 'Probe work', 'Probe summary', 'task', 'delivery', 'active', 'Probe', 1)`,
        [probeWorkId, probeProjectId],
      ),
      sql.query(
        `INSERT INTO workspace_engineering_work_history (
           id, engineering_work_id, kind, action_type, resulting_state,
           action_actor_type, action_actor_identifier, occurred_at
         ) VALUES ($1, $2, 'created', 'create', 'active', 'system', 'cleanup-probe', statement_timestamp())`,
        [probeHistoryId, probeWorkId],
      ),
      sql.query(
        `UPDATE workspace_engineering_work_history
         SET rationale = 'mutated'
         WHERE id = $1`,
        [probeHistoryId],
      ),
    ]),
    /append-only/i,
  );

  const probeResidue = await queryOne(sqlExecutor,
    `SELECT
       (SELECT count(*)::int FROM workspace_projects WHERE id = $1) AS projects,
       (SELECT count(*)::int FROM workspace_engineering_work WHERE id = $2) AS work_items,
       (SELECT count(*)::int FROM workspace_project_focus_events WHERE id = $3) AS focus_events,
       (SELECT count(*)::int FROM workspace_engineering_work_history WHERE id = $4) AS history_events`,
    [probeProjectId, probeWorkId, probeEventId, probeHistoryId],
  );
  assert.deepEqual(probeResidue, {
    projects: 0,
    work_items: 0,
    focus_events: 0,
    history_events: 0,
  });
}

async function activeTriggers(tableName: string, expected: readonly string[]) {
  const rows = await sqlExecutor.query(
    `SELECT tgname, tgenabled
     FROM pg_trigger
     JOIN pg_class ON pg_class.oid = pg_trigger.tgrelid
     JOIN pg_namespace ON pg_namespace.oid = pg_class.relnamespace
     WHERE pg_namespace.nspname = 'public'
       AND pg_class.relname = $1
       AND NOT pg_trigger.tgisinternal
       AND tgname = ANY($2::text[])
     ORDER BY tgname`,
    [tableName, expected],
  );
  assert.equal(rows.length, expected.length);
  for (const row of rows) {
    assert.equal(row.tgenabled, "O", `${row.tgname} must be enabled after restoration.`);
  }
  return rows.map((row) => String(row.tgname));
}

async function main() {
  const identity = await queryOne(sqlExecutor, `
    SELECT current_database() AS database_name,
           current_setting('neon.project_id', true) AS project_id,
           current_setting('neon.branch_id', true) AS branch_id
  `);

  const legitimateBefore = await readLegitimateProjects();
  const before = await countValidationScope();
  await verifyScopeSafety();

  const cleanupStatements = [
    ...FOCUS_EVENT_APPEND_ONLY_TRIGGERS.map(
      (trigger) => sql.query(`ALTER TABLE workspace_project_focus_events DISABLE TRIGGER ${trigger}`),
    ),
    ...HISTORY_APPEND_ONLY_TRIGGERS.map(
      (trigger) => sql.query(`ALTER TABLE workspace_engineering_work_history DISABLE TRIGGER ${trigger}`),
    ),
    sql.query(`
      WITH validation_projects AS (
        SELECT id FROM workspace_projects
        WHERE id LIKE 'focus_val_%' OR slug LIKE 'focus-val-%'
      )
      DELETE FROM workspace_project_focus_selection s
      USING validation_projects vp
      WHERE s.project_id = vp.id
    `),
    sql.query(`
      WITH validation_projects AS (
        SELECT id FROM workspace_projects
        WHERE id LIKE 'focus_val_%' OR slug LIKE 'focus-val-%'
      )
      DELETE FROM workspace_project_focus_events e
      USING validation_projects vp
      WHERE e.project_id = vp.id
    `),
    sql.query(`
      WITH validation_projects AS (
        SELECT id FROM workspace_projects
        WHERE id LIKE 'focus_val_%' OR slug LIKE 'focus-val-%'
      ),
      validation_work AS (
        SELECT w.id FROM workspace_engineering_work w
        JOIN validation_projects vp ON vp.id = w.project_id
      )
      DELETE FROM workspace_engineering_work_defect_revisions r
      USING validation_work vw
      WHERE r.engineering_work_id = vw.id
    `),
    sql.query(`
      WITH validation_projects AS (
        SELECT id FROM workspace_projects
        WHERE id LIKE 'focus_val_%' OR slug LIKE 'focus-val-%'
      ),
      validation_work AS (
        SELECT w.id FROM workspace_engineering_work w
        JOIN validation_projects vp ON vp.id = w.project_id
      )
      DELETE FROM workspace_engineering_work_history h
      USING validation_work vw
      WHERE h.engineering_work_id = vw.id
    `),
    sql.query(`
      WITH validation_projects AS (
        SELECT id FROM workspace_projects
        WHERE id LIKE 'focus_val_%' OR slug LIKE 'focus-val-%'
      )
      DELETE FROM workspace_engineering_work_defects d
      USING validation_projects vp, workspace_engineering_work w
      WHERE w.project_id = vp.id AND d.engineering_work_id = w.id
    `),
    sql.query(`
      WITH validation_projects AS (
        SELECT id FROM workspace_projects
        WHERE id LIKE 'focus_val_%' OR slug LIKE 'focus-val-%'
      )
      DELETE FROM workspace_engineering_work w
      USING validation_projects vp
      WHERE w.project_id = vp.id
    `),
    sql.query(`
      DELETE FROM workspace_projects
      WHERE id LIKE 'focus_val_%' OR slug LIKE 'focus-val-%'
    `),
    ...FOCUS_EVENT_APPEND_ONLY_TRIGGERS.map(
      (trigger) => sql.query(`ALTER TABLE workspace_project_focus_events ENABLE TRIGGER ${trigger}`),
    ),
    ...HISTORY_APPEND_ONLY_TRIGGERS.map(
      (trigger) => sql.query(`ALTER TABLE workspace_engineering_work_history ENABLE TRIGGER ${trigger}`),
    ),
  ];

  await sql.transaction(cleanupStatements);

  const restoredFocusTriggers = await activeTriggers(
    "workspace_project_focus_events",
    FOCUS_EVENT_APPEND_ONLY_TRIGGERS,
  );
  const restoredHistoryTriggers = await activeTriggers(
    "workspace_engineering_work_history",
    HISTORY_APPEND_ONLY_TRIGGERS,
  );

  const after = await countValidationScope();
  assert.deepEqual(after, {
    projects: 0,
    engineeringWork: 0,
    focusSelections: 0,
    focusEvents: 0,
    history: 0,
  });

  const legitimateAfter = await readLegitimateProjects();
  assert.deepEqual(legitimateAfter, legitimateBefore);

  await verifyAppendOnlyProtection();

  console.log(
    JSON.stringify(
      {
        result: "Package 2 validation residue cleanup completed",
        target: {
          hostname,
          database: identity.database_name,
          project: identity.project_id,
          branch: identity.branch_id,
        },
        scope: {
          projectIdPredicate: "focus_val_%",
          slugCorroboration: "focus-val-%",
          legitimateProjectsExcluded: LEGITIMATE_PROJECT_IDS,
        },
        before,
        after,
        cleanupMechanism: {
          approach: "Single transaction with temporary DISABLE TRIGGER on append-only focus-event and EW-history triggers only",
          deleteOrder: [
            "workspace_project_focus_selection",
            "workspace_project_focus_events",
            "workspace_engineering_work_defect_revisions",
            "workspace_engineering_work_history",
            "workspace_engineering_work_defects",
            "workspace_engineering_work",
            "workspace_projects",
          ],
          triggersTemporarilyDisabled: [
            ...FOCUS_EVENT_APPEND_ONLY_TRIGGERS,
            ...HISTORY_APPEND_ONLY_TRIGGERS,
          ],
          triggersRestored: [...restoredFocusTriggers, ...restoredHistoryTriggers],
        },
        legitimateProjectsUnchanged: true,
        appendOnlyProtectionVerified: true,
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
