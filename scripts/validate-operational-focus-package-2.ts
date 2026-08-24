import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";

import { neon } from "@neondatabase/serverless";

import {
  createEngineeringWorkWithHistory,
  persistEngineeringWorkCompletionAndHistory,
  persistEngineeringWorkTransitionAndHistory,
  type EngineeringWorkSqlExecutor,
} from "../src/lib/workspace/engineering-work-history-persistence";
import { engineeringWorkDecisionProvenance } from "../src/lib/workspace/engineering-work-provenance";
import {
  persistOperationalFocusClear,
  persistOperationalFocusReplace,
  persistOperationalFocusSelectionAdd,
  persistOperationalFocusSelectionRemove,
} from "../src/lib/workspace/operational-focus-persistence";
import { normalizeOperationalFocusTargetWorkIds } from "../src/lib/workspace/operational-focus-replace-plan";

const EXPECTED_DEV_ENDPOINT = "ep-green-sunset-a6w06qwf";
const CONCURRENCY_TIMEOUT_MS = 45_000;
const ROLLBACK_MARKER = "focus_pkg2_validation_rollback";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required.");

const validationDatabaseUrl = process.env.VALIDATION_DATABASE_URL?.trim() || null;

const hostname = new URL(databaseUrl).hostname;
if (!hostname.startsWith(EXPECTED_DEV_ENDPOINT)) {
  throw new Error(`Refusing operational focus validation against unapproved host: ${hostname}`);
}

const sql = neon(databaseUrl);

type ValidationResidueCounts = {
  projects: number;
  engineeringWork: number;
  focusSelections: number;
  focusEvents: number;
  history: number;
};

async function countValidationResidue(client: ReturnType<typeof neon>): Promise<ValidationResidueCounts> {
  const [counts] = await client.query(`
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
  };
}

function resolveValidationBranchUrl(): string | null {
  if (!validationDatabaseUrl) return null;
  const validationHostname = new URL(validationDatabaseUrl).hostname;
  if (!validationHostname.startsWith(EXPECTED_DEV_ENDPOINT)) {
    throw new Error(`Refusing operational focus concurrency validation against unapproved host: ${validationHostname}`);
  }
  if (validationDatabaseUrl === databaseUrl) {
    throw new Error(
      "VALIDATION_DATABASE_URL must differ from DATABASE_URL so committed concurrency fixtures use a disposable branch.",
    );
  }
  return validationDatabaseUrl;
}

type ScenarioStatus = "PASS" | "FAIL" | "SKIP";
type ScenarioResult = {
  scenario: string;
  status: ScenarioStatus;
  evidence: Record<string, unknown>;
};

const results: ScenarioResult[] = [];

function record(scenario: string, status: ScenarioStatus, evidence: Record<string, unknown>) {
  results.push({ scenario, status, evidence });
}

function skipScenario(scenario: string, evidence: Record<string, unknown>) {
  record(scenario, "SKIP", evidence);
}

async function runScenario(
  scenario: string,
  fn: () => Promise<Record<string, unknown>>,
) {
  try {
    const evidence = await fn();
    record(scenario, "PASS", evidence);
  } catch (error) {
    record(scenario, "FAIL", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
  }
}

const token = randomUUID().replaceAll("-", "");
const id = (suffix: string) => `focus_val_${suffix}_${token}`;

const systemActor = {
  type: "system" as const,
  identifier: "focus-pkg2-validator",
  displayName: "Operational Focus Package 2 validator",
};
const humanActor = {
  type: "human" as const,
  identifier: "focus-pkg2-human",
  displayName: "Focus acceptance human",
};
const humanAuthority = { type: "human_owner" as const };

const transitionProvenance = engineeringWorkDecisionProvenance({
  actionActor: systemActor,
  decisionActor: humanActor,
  decisionRole: "authorization",
  authority: { type: "human_owner", context: "Focus validation fixture." },
  decision: "Activate Engineering Work for focus acceptance.",
  rationale: "Seed active Work for operational focus commands.",
  decisionBasis: { summary: "Package 2 database acceptance fixture." },
});

const completionProvenance = engineeringWorkDecisionProvenance({
  actionActor: systemActor,
  decisionActor: humanActor,
  decisionRole: "authorization",
  authority: { type: "human_owner", context: "Focus validation completion." },
  decision: "Authorize completion of focused Engineering Work.",
  rationale: "Verified outcome satisfies the objective.",
  decisionBasis: { summary: "Package 2 completion invalidation acceptance." },
});

type CapturedQuery = { query: string; params?: unknown[] };

async function capture(
  operation: (executor: EngineeringWorkSqlExecutor) => Promise<unknown>,
): Promise<CapturedQuery> {
  let captured: CapturedQuery | null = null;
  await operation({
    async query(query, params) {
      captured = { query, params };
      return [{ focus_version: 1, focus_event_id: "captured", no_change: false, outcome: "applied" }];
    },
  });
  assert.ok(captured);
  return captured;
}

function focusCommandBase(projectSlug: string) {
  return {
    projectSlug,
    actionActor: humanActor,
    decisionActor: humanActor,
    authority: humanAuthority,
    rationale: "Package 2 database acceptance command.",
  };
}


async function withTimeout<T>(ms: number, fn: () => Promise<T>): Promise<T> {
  return Promise.race([
    fn(),
    new Promise<T>((_, reject) => {
      setTimeout(() => reject(new Error(`Timed out after ${ms}ms (possible deadlock).`)), ms);
    }),
  ]);
}

async function runForcedRollbackTransaction(
  statements: Array<ReturnType<typeof sql.query>>,
  assertionSql: string,
) {
  await assert.rejects(
    sql.transaction([
      ...statements,
      sql.query(`
        DO $focus_pkg2$
        BEGIN
          ${assertionSql}
          RAISE EXCEPTION '${ROLLBACK_MARKER}';
        END
        $focus_pkg2$;
      `),
    ]),
    new RegExp(ROLLBACK_MARKER),
  );
}

async function residueFor(projectId: string, workIds: string[]) {
  const [residue] = await sql.query(
    `SELECT
       (SELECT count(*)::int FROM workspace_projects WHERE id = $1) AS projects,
       (SELECT count(*)::int FROM workspace_engineering_work WHERE id = ANY($2::text[])) AS work_items,
       (SELECT count(*)::int FROM workspace_project_focus_selection WHERE project_id = $1) AS focus_selections,
       (SELECT count(*)::int FROM workspace_project_focus_events WHERE project_id = $1) AS focus_events,
       (SELECT count(*)::int FROM workspace_engineering_work_history WHERE engineering_work_id = ANY($2::text[])) AS history_events`,
    [projectId, workIds],
  );
  return residue;
}

async function main() {
  const [identity] = await sql.query(`
    SELECT current_database() AS database_name,
           current_setting('neon.project_id', true) AS project_id,
           current_setting('neon.branch_id', true) AS branch_id
  `);
  assert.equal(identity.database_name, "neondb");
  assert.equal(identity.project_id, "plain-band-91202732");
  assert.equal(identity.branch_id, "br-wandering-snow-a60tz3pl");

  const preflightResidue = await countValidationResidue(sql);
  if (preflightResidue.projects > 0) {
    throw new Error(
      `Preflight failed: normal dev DATABASE_URL contains ${preflightResidue.projects} validation Project(s). ` +
        "Run npm run test:db:cleanup:operational-focus-residue before executing this validator.",
    );
  }

  const [baseline] = await sql.query(`
    SELECT
      (SELECT count(*)::int FROM drizzle.__drizzle_migrations) AS migrations,
      (SELECT count(*)::int FROM workspace_project_focus_events) AS focus_events,
      (SELECT count(*)::int FROM workspace_project_focus_selection) AS focus_selections
  `);
  assert.ok(Number(baseline.migrations) >= 7);

  await runScenario("schema_baseline", async () => {
    const [objects] = await sql.query(`
      SELECT
        (SELECT count(*)::int FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = 'workspace_project_focus_events') AS events_table,
        (SELECT count(*)::int FROM information_schema.tables
          WHERE table_schema = 'public' AND table_name = 'workspace_project_focus_selection') AS selection_table,
        (SELECT count(*)::int FROM information_schema.columns
          WHERE table_schema = 'public' AND table_name = 'workspace_projects'
            AND column_name = 'focus_version') AS focus_version_column,
        (SELECT count(*)::int FROM pg_trigger
          JOIN pg_class ON pg_class.oid = pg_trigger.tgrelid
          JOIN pg_namespace ON pg_namespace.oid = pg_class.relnamespace
          WHERE pg_namespace.nspname = 'public'
            AND NOT pg_trigger.tgisinternal
            AND pg_trigger.tgname = 'workspace_project_focus_events_append_only_rows') AS events_append_only,
        (SELECT count(*)::int FROM pg_trigger
          JOIN pg_class ON pg_class.oid = pg_trigger.tgrelid
          JOIN pg_namespace ON pg_namespace.oid = pg_class.relnamespace
          WHERE pg_namespace.nspname = 'public'
            AND NOT pg_trigger.tgisinternal
            AND pg_trigger.tgname = 'workspace_project_focus_selection_no_update_rows') AS selection_no_update
    `);
    assert.deepEqual(objects, {
      events_table: 1,
      selection_table: 1,
      focus_version_column: 1,
      events_append_only: 1,
      selection_no_update: 1,
    });
    return { migrations: baseline.migrations, schemaObjects: objects };
  });

  const matrixProjectId = id("matrix_project");
  const matrixProjectSlug = `focus-val-matrix-${token}`;
  const workA = id("work_a");
  const workB = id("work_b");
  const workC = id("work_c");
  const matrixWorkIds = [workA, workB, workC];

  const createA = await capture((executor) => createEngineeringWorkWithHistory(executor, {
    engineeringWorkId: workA,
    historyEventId: id("work_a_create"),
    projectSlug: matrixProjectSlug,
    title: "Focus work A",
    type: "task",
    workflow: "delivery",
    objective: "Focus work A objective",
    currentNextAction: "Execute focus validation.",
    actionActor: systemActor,
  }));
  const activateA = await capture((executor) => persistEngineeringWorkTransitionAndHistory(executor, {
    engineeringWorkId: workA,
    projectSlug: matrixProjectSlug,
    expectedVersion: 1,
    priorState: "proposed",
    resultingState: "active",
    historyEventId: id("work_a_activate"),
    provenance: transitionProvenance,
  }));
  const createB = await capture((executor) => createEngineeringWorkWithHistory(executor, {
    engineeringWorkId: workB,
    historyEventId: id("work_b_create"),
    projectSlug: matrixProjectSlug,
    title: "Focus work B",
    type: "task",
    workflow: "delivery",
    objective: "Focus work B objective",
    currentNextAction: "Execute focus validation.",
    actionActor: systemActor,
  }));
  const activateB = await capture((executor) => persistEngineeringWorkTransitionAndHistory(executor, {
    engineeringWorkId: workB,
    projectSlug: matrixProjectSlug,
    expectedVersion: 1,
    priorState: "proposed",
    resultingState: "active",
    historyEventId: id("work_b_activate"),
    provenance: transitionProvenance,
  }));
  const createC = await capture((executor) => createEngineeringWorkWithHistory(executor, {
    engineeringWorkId: workC,
    historyEventId: id("work_c_create"),
    projectSlug: matrixProjectSlug,
    title: "Focus work C",
    type: "task",
    workflow: "delivery",
    objective: "Focus work C objective",
    currentNextAction: "Execute focus validation.",
    actionActor: systemActor,
  }));
  const activateC = await capture((executor) => persistEngineeringWorkTransitionAndHistory(executor, {
    engineeringWorkId: workC,
    projectSlug: matrixProjectSlug,
    expectedVersion: 1,
    priorState: "proposed",
    resultingState: "active",
    historyEventId: id("work_c_activate"),
    provenance: transitionProvenance,
  }));

  const addA = await capture((executor) => persistOperationalFocusSelectionAdd(executor, {
    ...focusCommandBase(matrixProjectSlug),
    engineeringWorkId: workA,
    expectedFocusVersion: 0,
    focusEventId: id("add_a_event"),
    selectionId: id("add_a_selection"),
    batchId: id("add_a_batch"),
  }));
  const addB = await capture((executor) => persistOperationalFocusSelectionAdd(executor, {
    ...focusCommandBase(matrixProjectSlug),
    engineeringWorkId: workB,
    expectedFocusVersion: 1,
    focusEventId: id("add_b_event"),
    selectionId: id("add_b_selection"),
    batchId: id("add_b_batch"),
  }));
  const addC = await capture((executor) => persistOperationalFocusSelectionAdd(executor, {
    ...focusCommandBase(matrixProjectSlug),
    engineeringWorkId: workC,
    expectedFocusVersion: 2,
    focusEventId: id("add_c_event"),
    selectionId: id("add_c_selection"),
    batchId: id("add_c_batch"),
  }));
  const removeB = await capture((executor) => persistOperationalFocusSelectionRemove(executor, {
    ...focusCommandBase(matrixProjectSlug),
    engineeringWorkId: workB,
    expectedFocusVersion: 3,
    focusEventId: id("remove_b_event"),
    selectionId: id("remove_b_selection_unused"),
    batchId: id("remove_b_batch"),
  }));
  const replaceToB = await capture((executor) => persistOperationalFocusReplace(executor, {
    ...focusCommandBase(matrixProjectSlug),
    expectedFocusVersion: 4,
    batchId: id("replace_batch"),
    targetWorkIds: [workB],
    addItems: [{
      engineeringWorkId: workB,
      focusEventId: id("replace_add_b_event"),
      selectionId: id("replace_add_b_selection"),
    }],
  }));
  const replaceIdentical = await capture((executor) => persistOperationalFocusReplace(executor, {
    ...focusCommandBase(matrixProjectSlug),
    expectedFocusVersion: 5,
    batchId: id("replace_identical_batch"),
    targetWorkIds: [workB],
    addItems: [{
      engineeringWorkId: workB,
      focusEventId: id("replace_identical_event"),
      selectionId: id("replace_identical_selection"),
    }],
  }));
  const clearAll = await capture((executor) => persistOperationalFocusClear(executor, {
    ...focusCommandBase(matrixProjectSlug),
    expectedFocusVersion: 5,
    batchId: id("clear_batch"),
  }));
  const staleAdd = await capture((executor) => persistOperationalFocusSelectionAdd(executor, {
    ...focusCommandBase(matrixProjectSlug),
    engineeringWorkId: workA,
    expectedFocusVersion: 4,
    focusEventId: id("stale_add_event"),
    selectionId: id("stale_add_selection"),
    batchId: id("stale_add_batch"),
  }));

  await runScenario("membership_and_command_matrix_rollback", async () => {
    const setup = [
      sql.query(
        `INSERT INTO workspace_projects (id, name, slug, status)
         VALUES ($1, 'Operational focus matrix rollback', $2, 'active')`,
        [matrixProjectId, matrixProjectSlug],
      ),
      sql.query(createA.query, createA.params),
      sql.query(activateA.query, activateA.params),
      sql.query(createB.query, createB.params),
      sql.query(activateB.query, activateB.params),
      sql.query(createC.query, createC.params),
      sql.query(activateC.query, activateC.params),
    ];

    await assert.rejects(
      sql.transaction([
        ...setup,
        sql.query(addA.query, addA.params),
        sql.query(`
          DO $m1$ BEGIN
            IF (SELECT count(*) FROM workspace_project_focus_selection WHERE project_id = '${matrixProjectId}') <> 1
              OR NOT EXISTS (SELECT 1 FROM workspace_project_focus_selection WHERE project_id = '${matrixProjectId}' AND engineering_work_id = '${workA}')
              OR (SELECT focus_version FROM workspace_projects WHERE id = '${matrixProjectId}') <> 1
            THEN RAISE EXCEPTION 'membership_one_failed'; END IF;
          END $m1$;
        `),
        sql.query(addB.query, addB.params),
        sql.query(addC.query, addC.params),
        sql.query(`
          DO $m3$ BEGIN
            IF (SELECT count(*) FROM workspace_project_focus_selection WHERE project_id = '${matrixProjectId}') <> 3
              OR (SELECT focus_version FROM workspace_projects WHERE id = '${matrixProjectId}') <> 3
            THEN RAISE EXCEPTION 'membership_multiple_failed'; END IF;
          END $m3$;
        `),
        sql.query(removeB.query, removeB.params),
        sql.query(`
          DO $rem$ BEGIN
            IF (SELECT count(*) FROM workspace_project_focus_selection WHERE project_id = '${matrixProjectId}') <> 2
              OR EXISTS (SELECT 1 FROM workspace_project_focus_selection WHERE engineering_work_id = '${workB}')
              OR (SELECT focus_version FROM workspace_projects WHERE id = '${matrixProjectId}') <> 4
            THEN RAISE EXCEPTION 'command_remove_failed'; END IF;
          END $rem$;
        `),
        sql.query(replaceToB.query, replaceToB.params),
        sql.query(`
          DO $rep$ BEGIN
            IF (SELECT count(*) FROM workspace_project_focus_selection WHERE project_id = '${matrixProjectId}') <> 1
              OR NOT EXISTS (SELECT 1 FROM workspace_project_focus_selection WHERE engineering_work_id = '${workB}')
              OR (SELECT focus_version FROM workspace_projects WHERE id = '${matrixProjectId}') <> 5
            THEN RAISE EXCEPTION 'command_replace_failed'; END IF;
          END $rep$;
        `),
        sql.query(replaceIdentical.query, replaceIdentical.params),
        sql.query(`
          DO $ident$ BEGIN
            IF (SELECT focus_version FROM workspace_projects WHERE id = '${matrixProjectId}') <> 5
              OR (SELECT count(*) FROM workspace_project_focus_events WHERE id = '${id("replace_identical_event")}') <> 0
            THEN RAISE EXCEPTION 'replace_identical_failed'; END IF;
          END $ident$;
        `),
        sql.query(clearAll.query, clearAll.params),
        sql.query(`
          DO $clr$ BEGIN
            IF (SELECT count(*) FROM workspace_project_focus_selection WHERE project_id = '${matrixProjectId}') <> 0
              OR (SELECT focus_version FROM workspace_projects WHERE id = '${matrixProjectId}') <> 6
            THEN RAISE EXCEPTION 'command_clear_failed'; END IF;
          END $clr$;
        `),
        sql.query(staleAdd.query, staleAdd.params),
        sql.query(`
          DO $stale$ BEGIN
            IF (SELECT focus_version FROM workspace_projects WHERE id = '${matrixProjectId}') <> 6
              OR (SELECT count(*) FROM workspace_project_focus_events WHERE id = '${id("stale_add_event")}') <> 0
              OR (SELECT count(*) FROM workspace_project_focus_selection WHERE id = '${id("stale_add_selection")}') <> 0
            THEN RAISE EXCEPTION 'stale_focus_version_failed'; END IF;
            RAISE EXCEPTION '${ROLLBACK_MARKER}';
          END $stale$;
        `),
      ]),
      new RegExp(ROLLBACK_MARKER),
    );

    const residue = await residueFor(matrixProjectId, matrixWorkIds);
    assert.deepEqual(residue, {
      projects: 0,
      work_items: 0,
      focus_selections: 0,
      focus_events: 0,
      history_events: 0,
    });

    return {
      rollback: true,
      exercised: ["membership_zero", "membership_one", "membership_multiple", "command_add", "command_remove", "command_replace", "replace_identical", "command_clear", "stale_focus_version"],
      residue,
    };
  });

  await runScenario("replace_duplicate_targets_rejected", async () => {
    let threw = false;
    try {
      normalizeOperationalFocusTargetWorkIds([workA, workA]);
    } catch (error) {
      threw = true;
      assert.match(String(error), /Duplicate Work ID/);
    }
    assert.equal(threw, true);
    return { rejectedBeforeSql: true };
  });

  await runScenario("cross_project_work_rejection_rollback", async () => {
    const otherProjectId = id("other_project");
    const otherProjectSlug = `focus-val-other-${token}`;
    const otherWorkId = id("other_work");
    const crossAdd = await capture((executor) => persistOperationalFocusSelectionAdd(executor, {
      ...focusCommandBase(matrixProjectSlug),
      engineeringWorkId: otherWorkId,
      expectedFocusVersion: 0,
      focusEventId: id("cross_project_event"),
      selectionId: id("cross_project_selection"),
      batchId: id("cross_project_batch"),
    }));

    await runForcedRollbackTransaction(
      [
        sql.query(
          `INSERT INTO workspace_projects (id, name, slug, status) VALUES ($1, 'Matrix project', $2, 'active')`,
          [matrixProjectId, matrixProjectSlug],
        ),
        sql.query(
          `INSERT INTO workspace_projects (id, name, slug, status) VALUES ($1, 'Other project', $2, 'active')`,
          [otherProjectId, otherProjectSlug],
        ),
        sql.query(
          `INSERT INTO workspace_engineering_work (
             id, project_id, title, summary, type, workflow, state, current_next_action, version
           ) VALUES ($1, $2, 'Other work', 'summary', 'task', 'delivery', 'active', 'next', 1)`,
          [otherWorkId, otherProjectId],
        ),
        sql.query(crossAdd.query, crossAdd.params),
      ],
      `
        IF (SELECT focus_version FROM workspace_projects WHERE id = '${matrixProjectId}') <> 0
          OR (SELECT count(*) FROM workspace_project_focus_events WHERE project_id = '${matrixProjectId}') <> 0
        THEN RAISE EXCEPTION 'cross_project_mutation_detected'; END IF;
      `,
    );

    const residue = await residueFor(matrixProjectId, [otherWorkId]);
    assert.deepEqual(residue.projects, 0);
    return { rejected: "not_found_or_stale", residueProjects: residue.projects };
  });

  await runScenario("invalid_provenance_null_human_branch_rejection", async () => {
    const rollbackProjectId = id("prov_project");
    const rollbackSlug = `focus-val-prov-${token}`;
    const rollbackWorkId = id("prov_work");
    const rollbackEventId = id("prov_bad_event");
    await assert.rejects(
      sql.transaction([
        sql.query(
          `INSERT INTO workspace_projects (id, name, slug, status)
           VALUES ($1, 'Provenance rollback validation', $2, 'active')`,
          [rollbackProjectId, rollbackSlug],
        ),
        sql.query(
          `INSERT INTO workspace_engineering_work (
             id, project_id, title, summary, type, workflow, state, current_next_action, version
           )
           SELECT $1, $2, 'Prov work', 'summary', 'task', 'delivery', 'active', 'next', 1`,
          [rollbackWorkId, rollbackProjectId],
        ),
        sql.query(
          `INSERT INTO workspace_project_focus_events (
             id, project_id, engineering_work_id, effect, command_context, batch_id,
             action_actor_type, action_actor_identifier,
             decision_actor_type, decision_actor_identifier,
             authority_type, occurred_at
           )
           VALUES ($1, $2, $3, 'selected', 'add', 'batch',
                   'human', 'actor',
                   NULL, NULL,
                   NULL, statement_timestamp())`,
          [rollbackEventId, rollbackProjectId, rollbackWorkId],
        ),
      ]),
      /human_provenance|decision_actor_coherent|violates check constraint/i,
    );
    const [residue] = await sql.query(
      `SELECT count(*)::int AS projects FROM workspace_projects WHERE id = $1`,
      [rollbackProjectId],
    );
    assert.equal(residue.projects, 0);
    return { rolledBack: true, residueProjects: residue.projects };
  });

  await runScenario("focus_event_update_rejection", async () => {
    const eventId = id("append_only_event");
    await assert.rejects(
      sql.transaction([
        sql.query(
          `INSERT INTO workspace_projects (id, name, slug, status)
           VALUES ($1, 'Append-only validation', $2, 'active')`,
          [id("append_project"), `focus-val-append-${token}`],
        ),
        sql.query(
          `INSERT INTO workspace_engineering_work (
             id, project_id, title, summary, type, workflow, state, current_next_action, version
           ) VALUES ($1, $2, 'Append work', 'summary', 'task', 'delivery', 'active', 'next', 1)`,
          [id("append_work"), id("append_project")],
        ),
        sql.query(
          `INSERT INTO workspace_project_focus_events (
             id, project_id, engineering_work_id, effect, command_context, batch_id,
             action_actor_type, action_actor_identifier,
             decision_actor_type, decision_actor_identifier,
             authority_type, occurred_at
           ) VALUES ($1, $2, $3, 'selected', 'add', 'batch',
                     'human', 'actor', 'human', 'decider', 'human_owner', statement_timestamp())`,
          [eventId, id("append_project"), id("append_work")],
        ),
        sql.query(`UPDATE workspace_project_focus_events SET rationale = 'mutated' WHERE id = $1`, [eventId]),
      ]),
      /append-only/i,
    );
    const residue = await residueFor(id("append_project"), [id("append_work")]);
    assert.equal(residue.projects, 0);
    return { eventId, updateRejected: true, residue };
  });

  await runScenario("focus_event_delete_rejection", async () => {
    const eventId = id("append_delete_event");
    await assert.rejects(
      sql.transaction([
        sql.query(
          `INSERT INTO workspace_projects (id, name, slug, status)
           VALUES ($1, 'Append-only delete validation', $2, 'active')`,
          [id("append_del_project"), `focus-val-append-del-${token}`],
        ),
        sql.query(
          `INSERT INTO workspace_engineering_work (
             id, project_id, title, summary, type, workflow, state, current_next_action, version
           ) VALUES ($1, $2, 'Append work', 'summary', 'task', 'delivery', 'active', 'next', 1)`,
          [id("append_del_work"), id("append_del_project")],
        ),
        sql.query(
          `INSERT INTO workspace_project_focus_events (
             id, project_id, engineering_work_id, effect, command_context, batch_id,
             action_actor_type, action_actor_identifier,
             decision_actor_type, decision_actor_identifier,
             authority_type, occurred_at
           ) VALUES ($1, $2, $3, 'selected', 'add', 'batch',
                     'human', 'actor', 'human', 'decider', 'human_owner', statement_timestamp())`,
          [eventId, id("append_del_project"), id("append_del_work")],
        ),
        sql.query(`DELETE FROM workspace_project_focus_events WHERE id = $1`, [eventId]),
      ]),
      /append-only/i,
    );
    const residue = await residueFor(id("append_del_project"), [id("append_del_work")]);
    assert.equal(residue.projects, 0);
    return { eventId, deleteRejected: true, residue };
  });

  await runScenario("selection_update_rejection", async () => {
    const selectionId = id("selection_guard_selection");
    const eventId = id("selection_guard_event");
    await assert.rejects(
      sql.transaction([
        sql.query(
          `INSERT INTO workspace_projects (id, name, slug, status)
           VALUES ($1, 'Selection guard validation', $2, 'active')`,
          [id("sel_project"), `focus-val-sel-${token}`],
        ),
        sql.query(
          `INSERT INTO workspace_engineering_work (
             id, project_id, title, summary, type, workflow, state, current_next_action, version
           ) VALUES ($1, $2, 'Sel work', 'summary', 'task', 'delivery', 'active', 'next', 1)`,
          [id("sel_work"), id("sel_project")],
        ),
        sql.query(
          `INSERT INTO workspace_project_focus_events (
             id, project_id, engineering_work_id, effect, command_context, batch_id,
             action_actor_type, action_actor_identifier,
             decision_actor_type, decision_actor_identifier,
             authority_type, occurred_at
           ) VALUES ($1, $2, $3, 'selected', 'add', 'batch',
                     'human', 'actor', 'human', 'decider', 'human_owner', statement_timestamp())`,
          [eventId, id("sel_project"), id("sel_work")],
        ),
        sql.query(
          `INSERT INTO workspace_project_focus_selection (
             id, project_id, engineering_work_id, selected_at, selected_by_event_id
           ) VALUES ($1, $2, $3, statement_timestamp(), $4)`,
          [selectionId, id("sel_project"), id("sel_work"), eventId],
        ),
        sql.query(
          `UPDATE workspace_project_focus_selection
           SET selected_at = statement_timestamp()
           WHERE id = $1`,
          [selectionId],
        ),
      ]),
      /insert\/delete only/i,
    );
    const residue = await residueFor(id("sel_project"), [id("sel_work")]);
    assert.equal(residue.projects, 0);
    return { selectionId, updateRejected: true, residue };
  });

  await runScenario("selection_delete_via_remove_remains_functional", async () => {
    const projectId = id("functional_project");
    const projectSlug = `focus-val-functional-${token}`;
    const workId = id("functional_work");
    const add = await capture((executor) => persistOperationalFocusSelectionAdd(executor, {
      ...focusCommandBase(projectSlug),
      engineeringWorkId: workId,
      expectedFocusVersion: 0,
      focusEventId: id("functional_add_event"),
      selectionId: id("functional_add_selection"),
      batchId: id("functional_add_batch"),
    }));
    const remove = await capture((executor) => persistOperationalFocusSelectionRemove(executor, {
      ...focusCommandBase(projectSlug),
      engineeringWorkId: workId,
      expectedFocusVersion: 1,
      focusEventId: id("functional_delete_event"),
      batchId: id("functional_delete_batch"),
      selectionId: id("functional_delete_selection_unused"),
    }));

    await runForcedRollbackTransaction(
      [
        sql.query(
          `INSERT INTO workspace_projects (id, name, slug, status) VALUES ($1, 'Functional delete', $2, 'active')`,
          [projectId, projectSlug],
        ),
        sql.query(
          `INSERT INTO workspace_engineering_work (
             id, project_id, title, summary, type, workflow, state, current_next_action, version
           ) VALUES ($1, $2, 'Functional work', 'summary', 'task', 'delivery', 'active', 'next', 1)`,
          [workId, projectId],
        ),
        sql.query(add.query, add.params),
        sql.query(remove.query, remove.params),
      ],
      `
        IF EXISTS (SELECT 1 FROM workspace_project_focus_selection WHERE project_id = '${projectId}')
        THEN RAISE EXCEPTION 'selection_delete_failed'; END IF;
      `,
    );

    const residue = await residueFor(projectId, [workId]);
    assert.deepEqual(residue.focus_selections, 0);
    assert.equal(residue.projects, 0);
    return { removedViaRemoveCommand: true, residue };
  });

  const completionProjectId = id("completion_project");
  const completionProjectSlug = `focus-val-completion-${token}`;
  const completionWorkId = id("completion_work");
  const peerWorkId = id("completion_peer");

  const completionCreate = await capture((executor) => createEngineeringWorkWithHistory(executor, {
    engineeringWorkId: completionWorkId,
    historyEventId: id("completion_work_create"),
    projectSlug: completionProjectSlug,
    title: "Completion focus work",
    type: "task",
    workflow: "delivery",
    objective: "Completion objective",
    currentNextAction: "Complete this work.",
    actionActor: systemActor,
  }));
  const completionActivate = await capture((executor) => persistEngineeringWorkTransitionAndHistory(executor, {
    engineeringWorkId: completionWorkId,
    projectSlug: completionProjectSlug,
    expectedVersion: 1,
    priorState: "proposed",
    resultingState: "active",
    historyEventId: id("completion_work_activate"),
    provenance: transitionProvenance,
  }));
  const completionPeerCreate = await capture((executor) => createEngineeringWorkWithHistory(executor, {
    engineeringWorkId: peerWorkId,
    historyEventId: id("completion_peer_create"),
    projectSlug: completionProjectSlug,
    title: "Completion peer work",
    type: "task",
    workflow: "delivery",
    objective: "Peer objective",
    currentNextAction: "Remain unfocused.",
    actionActor: systemActor,
  }));
  const completionPeerActivate = await capture((executor) => persistEngineeringWorkTransitionAndHistory(executor, {
    engineeringWorkId: peerWorkId,
    projectSlug: completionProjectSlug,
    expectedVersion: 1,
    priorState: "proposed",
    resultingState: "active",
    historyEventId: id("completion_peer_activate"),
    provenance: transitionProvenance,
  }));
  const completionFocusAdd = await capture((executor) => persistOperationalFocusSelectionAdd(executor, {
    ...focusCommandBase(completionProjectSlug),
    engineeringWorkId: completionWorkId,
    expectedFocusVersion: 0,
    focusEventId: id("completion_focus_event"),
    selectionId: id("completion_focus_selection"),
    batchId: id("completion_focus_batch"),
  }));
  const historyEventId = id("completion_history");
  const invalidationEventId = id("completion_invalidation");
  const completion = await capture((executor) => persistEngineeringWorkCompletionAndHistory(executor, {
    engineeringWorkId: completionWorkId,
    projectSlug: completionProjectSlug,
    expectedVersion: 2,
    expectedState: "active",
    verifiedOutcome: "Validated completion outcome.",
    finalDisposition: "accepted",
    historyEventId,
    focusInvalidationEventId: invalidationEventId,
    focusInvalidationBatchId: id("completion_invalidation_batch"),
    provenance: completionProvenance,
  }));

  await runScenario("completion_invalidation_and_no_successor", async () => {
    await runForcedRollbackTransaction(
      [
        sql.query(
          `INSERT INTO workspace_projects (id, name, slug, status) VALUES ($1, 'Completion invalidation', $2, 'active')`,
          [completionProjectId, completionProjectSlug],
        ),
        sql.query(completionCreate.query, completionCreate.params),
        sql.query(completionActivate.query, completionActivate.params),
        sql.query(completionPeerCreate.query, completionPeerCreate.params),
        sql.query(completionPeerActivate.query, completionPeerActivate.params),
        sql.query(completionFocusAdd.query, completionFocusAdd.params),
        sql.query(completion.query, completion.params),
      ],
      `
        IF NOT EXISTS (
          SELECT 1 FROM workspace_engineering_work
          WHERE id = '${completionWorkId}' AND state = 'completed'
        ) THEN RAISE EXCEPTION 'completion_state_failed'; END IF;
        IF EXISTS (
          SELECT 1 FROM workspace_project_focus_selection WHERE project_id = '${completionProjectId}'
        ) THEN RAISE EXCEPTION 'selection_not_removed'; END IF;
        IF (SELECT focus_version FROM workspace_projects WHERE id = '${completionProjectId}') <> 2
        THEN RAISE EXCEPTION 'focus_version_not_incremented'; END IF;
        IF NOT EXISTS (
          SELECT 1 FROM workspace_project_focus_events
          WHERE id = '${invalidationEventId}'
            AND effect = 'invalidated'
            AND command_context = 'lifecycle_invalidation'
            AND based_on_event_id = '${historyEventId}'
        ) THEN RAISE EXCEPTION 'invalidation_link_failed'; END IF;
        IF EXISTS (
          SELECT 1 FROM workspace_project_focus_selection
          WHERE project_id = '${completionProjectId}' AND engineering_work_id = '${peerWorkId}'
        ) THEN RAISE EXCEPTION 'automatic_successor_detected'; END IF;
      `,
    );

    const residue = await residueFor(completionProjectId, [completionWorkId, peerWorkId]);
    assert.equal(residue.projects, 0);
    return {
      invalidationEventId,
      basedOnEventId: historyEventId,
      noAutomaticSuccessor: true,
      residue,
    };
  });

  const concurrencyBranchUrl = resolveValidationBranchUrl();
  const concurrencyNote =
    "Parallel @neondatabase/serverless neon() HTTP clients on VALIDATION_DATABASE_URL; " +
    "each mutating path executes in its own transaction ending with forced ROLLBACK via exception.";

  const concProjectId = id("conc_project");
  const concProjectSlug = `focus-val-conc-${token}`;
  const concFocusedWork = id("conc_focused");
  const concPeerWork = id("conc_peer");

  const concFocusedCreate = await capture((executor) => createEngineeringWorkWithHistory(executor, {
    engineeringWorkId: concFocusedWork,
    historyEventId: id("conc_focused_create"),
    projectSlug: concProjectSlug,
    title: "Concurrent focused work",
    type: "task",
    workflow: "delivery",
    objective: "Concurrent objective",
    currentNextAction: "Race focus commands.",
    actionActor: systemActor,
  }));
  const concFocusedActivate = await capture((executor) => persistEngineeringWorkTransitionAndHistory(executor, {
    engineeringWorkId: concFocusedWork,
    projectSlug: concProjectSlug,
    expectedVersion: 1,
    priorState: "proposed",
    resultingState: "active",
    historyEventId: id("conc_focused_activate"),
    provenance: transitionProvenance,
  }));
  const concPeerCreate = await capture((executor) => createEngineeringWorkWithHistory(executor, {
    engineeringWorkId: concPeerWork,
    historyEventId: id("conc_peer_create"),
    projectSlug: concProjectSlug,
    title: "Concurrent peer work",
    type: "task",
    workflow: "delivery",
    objective: "Peer objective",
    currentNextAction: "Peer next action.",
    actionActor: systemActor,
  }));
  const concPeerActivate = await capture((executor) => persistEngineeringWorkTransitionAndHistory(executor, {
    engineeringWorkId: concPeerWork,
    projectSlug: concProjectSlug,
    expectedVersion: 1,
    priorState: "proposed",
    resultingState: "active",
    historyEventId: id("conc_peer_activate"),
    provenance: transitionProvenance,
  }));
  const concAddPeer = await capture((executor) => persistOperationalFocusSelectionAdd(executor, {
    ...focusCommandBase(concProjectSlug),
    engineeringWorkId: concPeerWork,
    expectedFocusVersion: 1,
    focusEventId: id("conc_add_event"),
    selectionId: id("conc_add_selection"),
    batchId: id("conc_add_batch"),
  }));
  const concReplace = await capture((executor) => persistOperationalFocusReplace(executor, {
    ...focusCommandBase(concProjectSlug),
    expectedFocusVersion: 1,
    batchId: id("conc_replace_batch"),
    targetWorkIds: [concPeerWork],
    addItems: [{
      engineeringWorkId: concPeerWork,
      focusEventId: id("conc_replace_add_event"),
      selectionId: id("conc_replace_add_selection"),
    }],
  }));
  const concRemove = await capture((executor) => persistOperationalFocusSelectionRemove(executor, {
    ...focusCommandBase(concProjectSlug),
    engineeringWorkId: concFocusedWork,
    expectedFocusVersion: 1,
    focusEventId: id("conc_remove_event"),
    batchId: id("conc_remove_batch"),
    selectionId: id("conc_remove_selection_unused"),
  }));
  const concClear = await capture((executor) => persistOperationalFocusClear(executor, {
    ...focusCommandBase(concProjectSlug),
    expectedFocusVersion: 1,
    batchId: id("conc_clear_batch"),
  }));
  const concComplete = await capture((executor) => persistEngineeringWorkCompletionAndHistory(executor, {
    engineeringWorkId: concFocusedWork,
    projectSlug: concProjectSlug,
    expectedVersion: 2,
    expectedState: "active",
    verifiedOutcome: "Concurrent completion outcome.",
    finalDisposition: "accepted",
    historyEventId: id("conc_complete_history"),
    focusInvalidationEventId: id("conc_invalidation"),
    focusInvalidationBatchId: id("conc_invalidation_batch"),
    provenance: completionProvenance,
  }));

  async function ensureConcurrencyFixtureCommitted(branchSql: ReturnType<typeof neon>) {
    const [existing] = await branchSql.query(
      `SELECT count(*)::int AS count FROM workspace_projects WHERE id = $1`,
      [concProjectId],
    );
    if (Number(existing.count) === 0) {
      await branchSql.query(
        `INSERT INTO workspace_projects (id, name, slug, status)
         VALUES ($1, 'Concurrency fixture', $2, 'active')`,
        [concProjectId, concProjectSlug],
      );
      await branchSql.query(concFocusedCreate.query, concFocusedCreate.params);
      await branchSql.query(concFocusedActivate.query, concFocusedActivate.params);
      await branchSql.query(concPeerCreate.query, concPeerCreate.params);
      await branchSql.query(concPeerActivate.query, concPeerActivate.params);
    }
    await branchSql.query(
      `DELETE FROM workspace_project_focus_selection WHERE project_id = $1`,
      [concProjectId],
    );
    await branchSql.query(
      `UPDATE workspace_engineering_work
       SET state = 'active', version = 2, current_next_action = 'Race focus commands.',
           current_outcome = NULL, final_disposition = NULL, condition = NULL, condition_rationale = NULL
       WHERE id = ANY($1::text[])`,
      [[concFocusedWork, concPeerWork]],
    );
    await branchSql.query(
      `UPDATE workspace_projects SET focus_version = 0 WHERE id = $1`,
      [concProjectId],
    );
    const seedSuffix = randomUUID().replaceAll("-", "").slice(0, 12);
    const seedAdd = await capture((executor) => persistOperationalFocusSelectionAdd(executor, {
      ...focusCommandBase(concProjectSlug),
      engineeringWorkId: concFocusedWork,
      expectedFocusVersion: 0,
      focusEventId: id(`conc_seed_event_${seedSuffix}`),
      selectionId: id(`conc_seed_selection_${seedSuffix}`),
      batchId: id(`conc_seed_batch_${seedSuffix}`),
    }));
    await branchSql.query(seedAdd.query, seedAdd.params);
  }

  async function runConcurrentRollbackPair(
    branchUrl: string,
    focusQuery: CapturedQuery,
    completionQuery: CapturedQuery,
  ) {
    const sqlA = neon(branchUrl);
    const sqlB = neon(branchUrl);
    const rollbackTail = sqlA.query(`
      DO $rb$ BEGIN RAISE EXCEPTION '${ROLLBACK_MARKER}'; END $rb$;
    `);

    const [focusOutcome, completionOutcome] = await withTimeout(CONCURRENCY_TIMEOUT_MS, () =>
      Promise.allSettled([
        sqlA.transaction([sqlA.query(focusQuery.query, focusQuery.params), rollbackTail]).catch((error) => {
          if (String(error).includes(ROLLBACK_MARKER)) return { rolledBack: true };
          throw error;
        }),
        sqlB.transaction([sqlB.query(completionQuery.query, completionQuery.params), rollbackTail]).catch((error) => {
          if (String(error).includes(ROLLBACK_MARKER)) return { rolledBack: true };
          throw error;
        }),
      ]),
    );

    return { focusOutcome: focusOutcome.status, completionOutcome: completionOutcome.status };
  }

  const concurrencySkipEvidence = {
    reason: "Committed concurrency fixtures require VALIDATION_DATABASE_URL pointing at a disposable Neon branch distinct from DATABASE_URL.",
    normalDevResiduePolicy: "No focus_val_% records may remain on DATABASE_URL after this validator completes.",
  };

  if (!concurrencyBranchUrl) {
    skipScenario("concurrent_add_vs_completion", concurrencySkipEvidence);
    skipScenario("concurrent_replace_vs_completion", concurrencySkipEvidence);
    skipScenario("concurrent_remove_vs_completion", concurrencySkipEvidence);
    skipScenario("concurrent_clear_vs_completion", concurrencySkipEvidence);
  } else {
    const validationSql = neon(concurrencyBranchUrl);
    const [validationIdentity] = await validationSql.query(`
      SELECT current_setting('neon.branch_id', true) AS branch_id
    `);

    await runScenario("concurrent_add_vs_completion", async () => {
      await ensureConcurrencyFixtureCommitted(validationSql);
      await validationSql.query(
        `DELETE FROM workspace_project_focus_selection WHERE project_id = $1`,
        [concProjectId],
      );
      await validationSql.query(
        `UPDATE workspace_projects SET focus_version = 0 WHERE id = $1`,
        [concProjectId],
      );
      const outcomes = await runConcurrentRollbackPair(concurrencyBranchUrl, concAddPeer, concComplete);
      const [work] = await validationSql.query(
        `SELECT state FROM workspace_engineering_work WHERE id = $1`,
        [concFocusedWork],
      );
      assert.equal(work.state, "active", "completion must roll back; focused work stays active");
      const [selections] = await validationSql.query(
        `SELECT count(*)::int AS count FROM workspace_project_focus_selection WHERE project_id = $1`,
        [concProjectId],
      );
      assert.equal(selections.count, 0, "add must roll back when paired with rolled-back completion");
      return {
        ...outcomes,
        concurrencyTransport: concurrencyNote,
        validationBranchId: validationIdentity.branch_id,
        focusedWorkState: work.state,
        selectionCount: selections.count,
      };
    });

    await runScenario("concurrent_replace_vs_completion", async () => {
      await ensureConcurrencyFixtureCommitted(validationSql);
      const outcomes = await runConcurrentRollbackPair(concurrencyBranchUrl, concReplace, concComplete);
      const [work] = await validationSql.query(
        `SELECT state FROM workspace_engineering_work WHERE id = $1`,
        [concFocusedWork],
      );
      assert.equal(work.state, "active");
      const [selections] = await validationSql.query(
        `SELECT count(*)::int AS count FROM workspace_project_focus_selection WHERE project_id = $1`,
        [concProjectId],
      );
      assert.equal(selections.count, 1);
      return {
        ...outcomes,
        concurrencyTransport: concurrencyNote,
        validationBranchId: validationIdentity.branch_id,
        focusedWorkState: work.state,
        selectionCount: selections.count,
      };
    });

    await runScenario("concurrent_remove_vs_completion", async () => {
      await ensureConcurrencyFixtureCommitted(validationSql);
      const outcomes = await runConcurrentRollbackPair(concurrencyBranchUrl, concRemove, concComplete);
      const [work] = await validationSql.query(
        `SELECT state FROM workspace_engineering_work WHERE id = $1`,
        [concFocusedWork],
      );
      assert.equal(work.state, "active");
      const [selections] = await validationSql.query(
        `SELECT count(*)::int AS count FROM workspace_project_focus_selection WHERE project_id = $1`,
        [concProjectId],
      );
      assert.equal(selections.count, 1);
      return {
        ...outcomes,
        concurrencyTransport: concurrencyNote,
        validationBranchId: validationIdentity.branch_id,
        focusedWorkState: work.state,
        selectionCount: selections.count,
      };
    });

    await runScenario("concurrent_clear_vs_completion", async () => {
      await ensureConcurrencyFixtureCommitted(validationSql);
      const outcomes = await runConcurrentRollbackPair(concurrencyBranchUrl, concClear, concComplete);
      const [work] = await validationSql.query(
        `SELECT state FROM workspace_engineering_work WHERE id = $1`,
        [concFocusedWork],
      );
      assert.equal(work.state, "active");
      const [selections] = await validationSql.query(
        `SELECT count(*)::int AS count FROM workspace_project_focus_selection WHERE project_id = $1`,
        [concProjectId],
      );
      assert.equal(selections.count, 1);
      return {
        ...outcomes,
        concurrencyTransport: concurrencyNote,
        validationBranchId: validationIdentity.branch_id,
        focusedWorkState: work.state,
        selectionCount: selections.count,
      };
    });
  }

  await runScenario("no_residue_on_normal_dev", async () => {
    const residue = await countValidationResidue(sql);
    assert.deepEqual(residue, {
      projects: 0,
      engineeringWork: 0,
      focusSelections: 0,
      focusEvents: 0,
      history: 0,
    });

    const [globalCounts] = await sql.query(`
      SELECT
        (SELECT count(*)::int FROM workspace_project_focus_events) AS focus_events,
        (SELECT count(*)::int FROM workspace_project_focus_selection) AS focus_selections,
        (SELECT count(*)::int FROM workspace_projects WHERE id LIKE 'focus_val_%' OR slug LIKE 'focus-val-%') AS validation_projects
    `);
    assert.equal(globalCounts.validation_projects, 0);

    return {
      residue,
      preservedGlobalCounts: globalCounts,
      normalDevClean: true,
    };
  });

  const summary = {
    package: "PROJECT-UX-006 Package 2",
    status: "BLOCKED",
    note: "Database acceptance only; browser/operator acceptance remains separate.",
    target: {
      hostname,
      database: identity.database_name,
      project: identity.project_id,
      branch: identity.branch_id,
    },
    scenarioCount: results.length,
    passed: results.filter((item) => item.status === "PASS").length,
    failed: results.filter((item) => item.status === "FAIL").length,
    skipped: results.filter((item) => item.status === "SKIP").length,
    scenarios: results,
  };

  console.log(JSON.stringify(summary, null, 2));

  if (summary.failed > 0) {
    process.exitCode = 1;
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
