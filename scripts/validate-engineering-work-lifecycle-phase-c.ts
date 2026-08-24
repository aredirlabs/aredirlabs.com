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

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required.");
const sql = neon(databaseUrl);
const token = randomUUID().replaceAll("-", "");
const projectId = `phase_c_project_${token}`;
const projectSlug = `phase-c-${token}`;
const activeWorkId = `phase_c_active_${token}`;
const reviewWorkId = `phase_c_review_${token}`;

const actionActor = {
  type: "system" as const,
  identifier: "phase-c-executor",
  displayName: "Phase C executor",
};
const decisionActor = {
  type: "human" as const,
  identifier: "phase-c-human-authority",
  displayName: "Phase C human authority",
};
const transitionProvenance = engineeringWorkDecisionProvenance({
  actionActor,
  decisionActor,
  decisionRole: "authorization",
  authority: { type: "human_owner", context: "Rollback-only validation." },
  decision: "Authorize lifecycle transition.",
  rationale: "Prepare the completion validation posture.",
  decisionBasis: { summary: "Phase C validation fixture." },
});
const completionProvenance = engineeringWorkDecisionProvenance({
  actionActor,
  decisionActor,
  decisionRole: "authorization",
  authority: { type: "human_owner", context: "Verified completion gate." },
  decision: "Authorize completion of Engineering Work.",
  rationale: "The verified outcome satisfies the objective.",
  decisionBasis: { summary: "Rollback-only verified completion evidence." },
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
  const activeIds = {
    create: `phase_c_active_create_${token}`,
    activate: `phase_c_active_activate_${token}`,
    complete: `phase_c_active_complete_${token}`,
    stale: `phase_c_active_stale_${token}`,
  };
  const reviewIds = {
    create: `phase_c_review_create_${token}`,
    activate: `phase_c_review_activate_${token}`,
    review: `phase_c_review_transition_${token}`,
    complete: `phase_c_review_complete_${token}`,
  };

  const createWork = (workId: string, historyEventId: string) =>
    capture((executor) => createEngineeringWorkWithHistory(executor, {
      engineeringWorkId: workId,
      historyEventId,
      projectSlug,
      title: "Phase C stable title",
      type: "verification",
      workflow: "verification",
      objective: "Validate completion persistence.",
      currentNextAction: "Preserve this prior operational action.",
      actionActor,
    }));
  const transition = (
    workId: string,
    expectedVersion: number,
    priorState: "proposed" | "active",
    resultingState: "active" | "in_review",
    historyEventId: string,
  ) => capture((executor) => persistEngineeringWorkTransitionAndHistory(executor, {
    engineeringWorkId: workId,
    projectSlug,
    expectedVersion,
    priorState,
    resultingState,
    historyEventId,
    provenance: transitionProvenance,
  }));
  const complete = (
    workId: string,
    expectedVersion: number,
    expectedState: "active" | "in_review",
    historyEventId: string,
  ) => capture((executor) => persistEngineeringWorkCompletionAndHistory(executor, {
    engineeringWorkId: workId,
    projectSlug,
    expectedVersion,
    expectedState,
    verifiedOutcome: `Verified ${expectedState} completion outcome.`,
    finalDisposition: "No further work is required.",
    historyEventId,
    focusInvalidationEventId: `focus_event_${historyEventId}`,
    focusInvalidationBatchId: `focus_batch_${historyEventId}`,
    provenance: completionProvenance,
  }));

  const activeCreate = await createWork(activeWorkId, activeIds.create);
  const activeActivate = await transition(activeWorkId, 1, "proposed", "active", activeIds.activate);
  const activeComplete = await complete(activeWorkId, 2, "active", activeIds.complete);
  const activeStale = await complete(activeWorkId, 2, "active", activeIds.stale);
  const reviewCreate = await createWork(reviewWorkId, reviewIds.create);
  const reviewActivate = await transition(reviewWorkId, 1, "proposed", "active", reviewIds.activate);
  const reviewTransition = await transition(reviewWorkId, 2, "active", "in_review", reviewIds.review);
  const reviewComplete = await complete(reviewWorkId, 3, "in_review", reviewIds.complete);

  await assert.rejects(sql.transaction([
    sql.query(
      "INSERT INTO workspace_projects (id, name, slug) VALUES ($1, 'Phase C rollback validation', $2)",
      [projectId, projectSlug],
    ),
    sql.query(activeCreate.query, activeCreate.params),
    sql.query(activeActivate.query, activeActivate.params),
    sql.query(activeComplete.query, activeComplete.params),
    sql.query(activeStale.query, activeStale.params),
    sql.query(reviewCreate.query, reviewCreate.params),
    sql.query(reviewActivate.query, reviewActivate.params),
    sql.query(reviewTransition.query, reviewTransition.params),
    sql.query(reviewComplete.query, reviewComplete.params),
    sql.query(`
      DO $phase_c$
      BEGIN
        IF NOT EXISTS (
          SELECT 1 FROM workspace_engineering_work
          WHERE id = '${activeWorkId}' AND version = 3 AND state = 'completed'
            AND title = 'Phase C stable title'
            AND summary = 'Validate completion persistence.'
            AND current_next_action IS NULL
            AND current_outcome = 'Verified active completion outcome.'
            AND condition IS NULL AND condition_rationale IS NULL
            AND final_disposition = 'No further work is required.'
        ) THEN RAISE EXCEPTION 'phase_c_active_projection_assertion_failed'; END IF;
        IF NOT EXISTS (
          SELECT 1 FROM workspace_engineering_work_history
          WHERE id = '${activeIds.complete}'
            AND prior_state = 'active' AND resulting_state = 'completed'
            AND previous_next_action = 'Preserve this prior operational action.'
            AND resulting_next_action IS NULL
            AND resulting_outcome = 'Verified active completion outcome.'
            AND rationale = 'The verified outcome satisfies the objective.'
            AND action_actor_identifier = 'phase-c-executor'
            AND decision_actor_identifier = 'phase-c-human-authority'
            AND decision_role = 'authorization'
        ) THEN RAISE EXCEPTION 'phase_c_active_history_assertion_failed'; END IF;
        IF EXISTS (SELECT 1 FROM workspace_engineering_work_history WHERE id = '${activeIds.stale}')
        THEN RAISE EXCEPTION 'phase_c_stale_assertion_failed'; END IF;
        IF NOT EXISTS (
          SELECT 1 FROM workspace_engineering_work
          WHERE id = '${reviewWorkId}' AND version = 4 AND state = 'completed'
            AND current_outcome = 'Verified in_review completion outcome.'
        ) OR NOT EXISTS (
          SELECT 1 FROM workspace_engineering_work_history
          WHERE id = '${reviewIds.complete}'
            AND prior_state = 'in_review' AND resulting_state = 'completed'
        ) THEN RAISE EXCEPTION 'phase_c_review_completion_assertion_failed'; END IF;
        RAISE EXCEPTION 'phase_c_validation_rollback';
      END
      $phase_c$;
    `),
  ]), /phase_c_validation_rollback/);

  const [residue] = await sql.query(
    `SELECT
       (SELECT count(*)::int FROM workspace_projects WHERE id = $1) AS projects,
       (SELECT count(*)::int FROM workspace_engineering_work WHERE id = ANY($2::text[])) AS work_items,
       (SELECT count(*)::int FROM workspace_engineering_work_history WHERE engineering_work_id = ANY($2::text[])) AS history_events`,
    [projectId, [activeWorkId, reviewWorkId]],
  );
  assert.deepEqual(residue, { projects: 0, work_items: 0, history_events: 0 });
  console.log("Phase C completion validation passed with forced rollback and no residue.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
