import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";

import { neon } from "@neondatabase/serverless";

import {
  createEngineeringWorkWithHistory,
  persistEngineeringWorkTransitionAndHistory,
  persistOperationalUpdateAndHistory,
  persistProposedCorrectionAndHistory,
  type EngineeringWorkSqlExecutor,
} from "../src/lib/workspace/engineering-work-history-persistence";
import { engineeringWorkDecisionProvenance } from "../src/lib/workspace/engineering-work-provenance";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required.");
const sql = neon(databaseUrl);

const token = randomUUID().replaceAll("-", "");
const projectId = `phase_b_project_${token}`;
const projectSlug = `phase-b-${token}`;
const workId = `phase_b_work_${token}`;
const defectWorkId = `phase_b_defect_${token}`;
const ids = {
  create: `phase_b_history_create_${token}`,
  correction: `phase_b_history_correction_${token}`,
  transition: `phase_b_history_transition_${token}`,
  operate: `phase_b_history_operate_${token}`,
  stale: `phase_b_history_stale_${token}`,
  defectCreate: `phase_b_history_defect_create_${token}`,
  defectTransition: `phase_b_history_defect_transition_${token}`,
  defectOperate: `phase_b_history_defect_operate_${token}`,
  defectBaseline: `phase_b_revision_defect_create_${token}`,
  defectRevision: `phase_b_revision_defect_operate_${token}`,
};

const actor = {
  type: "system" as const,
  identifier: "phase-b-validator",
  displayName: "Phase B validator",
};
const provenance = engineeringWorkDecisionProvenance({
  actionActor: actor,
  decisionActor: actor,
  decisionRole: "execution",
  decision: "Validate the Phase B atomic mutation contract.",
  rationale: "Exercise the real persistence query inside a forced rollback.",
});
const authorization = engineeringWorkDecisionProvenance({
  actionActor: actor,
  decisionActor: actor,
  decisionRole: "authorization",
  authority: { type: "system_rule", reference: "phase-b-validation" },
  decision: "Validate activation.",
  rationale: "Exercise the allowed Proposed to Active transition.",
  decisionBasis: { summary: "Rollback-only validation fixture." },
});

type CapturedQuery = { query: string; params?: unknown[] };
async function capture(
  operation: (executor: EngineeringWorkSqlExecutor) => Promise<unknown>,
): Promise<CapturedQuery> {
  let captured: CapturedQuery | null = null;
  await operation({
    async query(query, params) {
      captured = { query, params };
      return [{
        engineering_work_id: "captured",
        version: 1,
        history_event_id: "captured",
        defect_revision_id: null,
      }];
    },
  });
  assert.ok(captured);
  return captured;
}

async function main() {
const create = await capture((executor) => createEngineeringWorkWithHistory(executor, {
  engineeringWorkId: workId,
  historyEventId: ids.create,
  projectSlug,
  title: "Initial proposal title",
  type: "task",
  workflow: "delivery",
  objective: "Initial objective",
  currentNextAction: "Correct the proposal",
  actionActor: actor,
}));
const correction = await capture((executor) => persistProposedCorrectionAndHistory(executor, {
  engineeringWorkId: workId,
  projectSlug,
  expectedVersion: 1,
  title: "Corrected stable title",
  type: "feature",
  objective: "Corrected stable objective",
  currentNextAction: "Activate the proposal",
  historyEventId: ids.correction,
  provenance,
}));
const transition = await capture((executor) => persistEngineeringWorkTransitionAndHistory(executor, {
  engineeringWorkId: workId,
  projectSlug,
  expectedVersion: 2,
  priorState: "proposed",
  resultingState: "active",
  historyEventId: ids.transition,
  provenance: authorization,
}));
const operate = await capture((executor) => persistOperationalUpdateAndHistory(executor, {
  engineeringWorkId: workId,
  projectSlug,
  expectedVersion: 3,
  expectedState: "active",
  currentNextAction: "Verify acceptance",
  currentOutcome: "Atomic operational update persisted",
  condition: "Ready for review",
  conditionRationale: "All Phase B paths were exercised.",
  historyEventId: ids.operate,
  provenance,
}));
const stale = await capture((executor) => persistOperationalUpdateAndHistory(executor, {
  engineeringWorkId: workId,
  projectSlug,
  expectedVersion: 3,
  expectedState: "active",
  currentNextAction: "This stale write must not land",
  currentOutcome: null,
  condition: null,
  conditionRationale: null,
  historyEventId: ids.stale,
  provenance,
}));

const defectInitial = {
  observedBehavior: "Initial observed behavior",
  expectedBehavior: "Expected behavior",
  reproductionSteps: "Initial reproduction steps",
  environment: "Dev validation",
  evidence: "Initial evidence",
  nextInvestigation: "Initial investigation",
  validationTarget: "Initial target",
};
const defectResult = {
  ...defectInitial,
  observedBehavior: "Revised observed behavior",
  evidence: "Revised evidence",
  nextInvestigation: "Revised investigation",
};
const defectCreate = await capture((executor) => createEngineeringWorkWithHistory(executor, {
  engineeringWorkId: defectWorkId,
  historyEventId: ids.defectCreate,
  defectRevisionId: ids.defectBaseline,
  projectSlug,
  title: "Defect revision fixture",
  type: "bug",
  workflow: "defect",
  objective: "Validate atomic Defect revision integration.",
  currentNextAction: "Revise Defect context.",
  actionActor: actor,
  defectContext: defectInitial,
}));
const defectOperate = await capture((executor) => persistOperationalUpdateAndHistory(executor, {
  engineeringWorkId: defectWorkId,
  projectSlug,
  expectedVersion: 2,
  expectedState: "active",
  currentNextAction: "Validate the revised context.",
  currentOutcome: "Defect context revised.",
  condition: null,
  conditionRationale: null,
  defectContext: defectResult,
  historyEventId: ids.defectOperate,
  defectRevisionId: ids.defectRevision,
  provenance,
}));
const defectTransition = await capture((executor) => persistEngineeringWorkTransitionAndHistory(executor, {
  engineeringWorkId: defectWorkId,
  projectSlug,
  expectedVersion: 1,
  priorState: "proposed",
  resultingState: "active",
  historyEventId: ids.defectTransition,
  provenance: authorization,
}));

const statements = [
  sql.query(
    "INSERT INTO workspace_projects (id, name, slug) VALUES ($1, 'Phase B rollback validation', $2)",
    [projectId, projectSlug],
  ),
  sql.query(create.query, create.params),
  sql.query(correction.query, correction.params),
  sql.query(transition.query, transition.params),
  sql.query(operate.query, operate.params),
  sql.query(stale.query, stale.params),
  sql.query(defectCreate.query, defectCreate.params),
  sql.query(defectTransition.query, defectTransition.params),
  sql.query(defectOperate.query, defectOperate.params),
  sql.query(`
    DO $phase_b$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM workspace_engineering_work
        WHERE id = '${workId}' AND version = 4 AND state = 'active'
          AND title = 'Corrected stable title'
          AND summary = 'Corrected stable objective'
          AND current_next_action = 'Verify acceptance'
          AND current_outcome = 'Atomic operational update persisted'
      ) THEN RAISE EXCEPTION 'phase_b_projection_assertion_failed'; END IF;
      IF (SELECT count(*) FROM workspace_engineering_work_history WHERE engineering_work_id = '${workId}') <> 4
        OR EXISTS (SELECT 1 FROM workspace_engineering_work_history WHERE id = '${ids.stale}')
      THEN RAISE EXCEPTION 'phase_b_history_or_stale_assertion_failed'; END IF;
      IF NOT EXISTS (
        SELECT 1 FROM workspace_engineering_work_defects
        WHERE engineering_work_id = '${defectWorkId}'
          AND observed_behavior = 'Revised observed behavior'
          AND evidence = 'Revised evidence'
      ) THEN RAISE EXCEPTION 'phase_b_defect_projection_assertion_failed'; END IF;
      IF (SELECT count(*) FROM workspace_engineering_work_history WHERE engineering_work_id = '${defectWorkId}') <> 3
        OR (SELECT count(*) FROM workspace_engineering_work_defect_revisions WHERE engineering_work_id = '${defectWorkId}') <> 2
        OR NOT EXISTS (
          SELECT 1 FROM workspace_engineering_work_defect_revisions
          WHERE id = '${ids.defectRevision}'
            AND previous_context ->> 'observedBehavior' = 'Initial observed behavior'
            AND resulting_context ->> 'observedBehavior' = 'Revised observed behavior'
        )
      THEN RAISE EXCEPTION 'phase_b_defect_revision_assertion_failed'; END IF;
      RAISE EXCEPTION 'phase_b_validation_rollback';
    END
    $phase_b$;
  `),
];

await assert.rejects(sql.transaction(statements), /phase_b_validation_rollback/);

const [residue] = await sql.query(
  `SELECT
     (SELECT count(*)::int FROM workspace_projects WHERE id = $1) AS projects,
     (SELECT count(*)::int FROM workspace_engineering_work WHERE id = ANY($2::text[])) AS work_items,
     (SELECT count(*)::int FROM workspace_engineering_work_history WHERE engineering_work_id = ANY($2::text[])) AS history_events,
     (SELECT count(*)::int FROM workspace_engineering_work_defect_revisions WHERE engineering_work_id = ANY($2::text[])) AS defect_revisions`,
  [projectId, [workId, defectWorkId]],
);
assert.deepEqual(residue, {
  projects: 0,
  work_items: 0,
  history_events: 0,
  defect_revisions: 0,
});

console.log("Phase B lifecycle persistence validation passed with forced rollback and no residue.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
