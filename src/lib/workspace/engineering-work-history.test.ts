import assert from "node:assert/strict";
import test from "node:test";

import {
  appendEngineeringWorkDecisionEvent,
  persistEngineeringWorkCompletionAndHistory,
  persistEngineeringWorkTransitionAndHistory,
  persistOperationalUpdateAndHistory,
  persistProposedCorrectionAndHistory,
  type EngineeringWorkSqlExecutor,
} from "./engineering-work-history-persistence";
import {
  authenticatedHumanEngineeringWorkActor,
  engineeringWorkDecisionProvenance,
  type EngineeringWorkActor,
} from "./engineering-work-provenance";

const human = authenticatedHumanEngineeringWorkActor({
  user: { id: "user-product-authority", name: "Product Authority" },
});

const aiAgent: EngineeringWorkActor = {
  type: "ai_agent",
  identifier: "agent-verification-1",
  displayName: "Verification agent",
};

test("authenticated humans retain the available auth identity", () => {
  assert.deepEqual(human, {
    type: "human",
    identifier: "user-product-authority",
    displayName: "Product Authority",
  });
});

test("AI recommendation and human authorization remain distinct and linked", () => {
  const recommendation = engineeringWorkDecisionProvenance({
    actionActor: aiAgent,
    decisionActor: aiAgent,
    decisionRole: "recommendation",
    decision: "Recommend In Review to Completed.",
    rationale: "The verification targets passed.",
    decisionBasis: {
      summary: "Automated and manual verification evidence is green.",
      references: [
        { kind: "external_reference", reference: "verification-run-42" },
      ],
    },
    recommendedState: "completed",
    metadata: {
      schemaVersion: 1,
      agent: {
        agentId: "agent-verification-1",
        provider: "provider-neutral",
        model: "verification-model",
        runtimeId: "runtime-42",
      },
    },
  });
  const authorization = engineeringWorkDecisionProvenance({
    actionActor: human,
    decisionActor: human,
    decisionRole: "authorization",
    authority: { type: "human_owner", context: "Product completion gate" },
    decision: "Authorize completion.",
    rationale: "Independent review confirms the stated outcome.",
    decisionBasis: {
      summary: "Human review accepted the recommendation and evidence.",
      references: [
        { kind: "history_event", reference: "history-ai-recommendation" },
      ],
    },
    basedOnEventId: "history-ai-recommendation",
  });

  assert.equal(recommendation.authority, null);
  assert.equal(recommendation.recommendedState, "completed");
  assert.equal(recommendation.metadata.agent?.runtimeId, "runtime-42");
  assert.equal(authorization.decisionActor.type, "human");
  assert.equal(authorization.authority?.type, "human_owner");
  assert.equal(authorization.basedOnEventId, "history-ai-recommendation");
});

test("recommendation cannot silently claim authority", () => {
  assert.throws(
    () =>
      engineeringWorkDecisionProvenance({
        actionActor: aiAgent,
        decisionActor: aiAgent,
        decisionRole: "recommendation",
        authority: {
          type: "delegated_policy",
          reference: "policy-verification-1",
        },
        decision: "Recommend completion.",
        rationale: "Checks passed.",
        decisionBasis: { summary: "Verification run passed." },
        recommendedState: "completed",
      }),
    /cannot claim decision authority/,
  );
});

test("future delegated AI transition provenance is representable without execution", () => {
  const delegatedDecision = engineeringWorkDecisionProvenance({
    actionActor: aiAgent,
    decisionActor: aiAgent,
    decisionRole: "authorization",
    authority: {
      type: "verification_policy",
      reference: "verification-policy-v1",
      context: "Completion is delegated only after required verification gates.",
    },
    decision: "Transition Verification work to Completed.",
    rationale: "All delegated verification gates passed.",
    decisionBasis: {
      summary: "Policy-required test and runtime evidence passed.",
      references: [{ kind: "rule", reference: "verification-policy-v1" }],
    },
    metadata: {
      schemaVersion: 1,
      agent: {
        agentId: "agent-verification-1",
        provider: "provider-neutral",
        model: "verification-model",
        modelVersion: "2026-08",
        runtimeId: "runtime-delegated-1",
        policyId: "verification-policy-v1",
        instructionRef: "verification-work-instruction-v3",
        evidenceRefs: ["test-run-7", "uat-8"],
      },
    },
  });

  assert.equal(delegatedDecision.actionActor.type, "ai_agent");
  assert.equal(delegatedDecision.authority?.type, "verification_policy");
  assert.equal(delegatedDecision.metadata.agent?.policyId, "verification-policy-v1");
});

function successfulSqlCapture() {
  const calls: Array<{ query: string; params?: unknown[] }> = [];
  const sql: EngineeringWorkSqlExecutor = {
    async query(query, params) {
      calls.push({ query, params });
      return [
        {
          engineering_work_id: "work-1",
          version: 4,
          history_event_id: "history-1",
        },
      ];
    },
  };
  return { sql, calls };
}

const humanExecution = engineeringWorkDecisionProvenance({
  actionActor: human,
  decisionActor: human,
  decisionRole: "execution",
  authority: { type: "human_owner" },
  decision: "Record the operational update.",
  rationale: "The next verified action changed.",
  decisionBasis: { summary: "Authenticated human operational judgment." },
});

test("operational mutation and history append use one atomic CTE statement", async () => {
  const { sql, calls } = successfulSqlCapture();
  const result = await persistOperationalUpdateAndHistory(sql, {
    engineeringWorkId: "work-1",
    projectSlug: "aredirlabs-com",
    expectedVersion: 3,
    expectedState: "active",
    currentNextAction: "Verify the history row.",
    currentOutcome: "Atomic foundation implemented.",
    condition: null,
    conditionRationale: null,
    historyEventId: "history-1",
    provenance: humanExecution,
  });

  assert.equal(calls.length, 1);
  assert.match(calls[0].query, /^WITH current_work AS/);
  assert.match(calls[0].query, /UPDATE workspace_engineering_work/);
  assert.match(calls[0].query, /INSERT INTO workspace_engineering_work_history/);
  assert.deepEqual(result, {
    ok: true,
    engineeringWorkId: "work-1",
    version: 4,
    historyEventId: "history-1",
    defectRevisionId: null,
  });
});

test("zero CTE rows report a stale or missing projection without history", async () => {
  const sql: EngineeringWorkSqlExecutor = { async query() { return []; } };
  const result = await persistOperationalUpdateAndHistory(sql, {
    engineeringWorkId: "work-1",
    projectSlug: "aredirlabs-com",
    expectedVersion: 8,
    expectedState: "active",
    currentNextAction: "Continue.",
    currentOutcome: null,
    condition: null,
    conditionRationale: null,
    historyEventId: "history-stale",
    provenance: humanExecution,
  });
  assert.deepEqual(result, { ok: false, reason: "not_found_or_stale" });
});

test("history insertion failure propagates from the single atomic statement", async () => {
  const failure = new Error("forced history constraint failure");
  const sql: EngineeringWorkSqlExecutor = {
    async query() {
      throw failure;
    },
  };
  await assert.rejects(
    persistOperationalUpdateAndHistory(sql, {
      engineeringWorkId: "work-1",
      projectSlug: "aredirlabs-com",
      expectedVersion: 1,
      expectedState: "active",
      currentNextAction: "Continue.",
      currentOutcome: null,
      condition: null,
      conditionRationale: null,
      historyEventId: "history-failure",
      provenance: humanExecution,
    }),
    failure,
  );
});

test("operating SQL preserves stable fields and integrates Defect revision history", async () => {
  const { sql, calls } = successfulSqlCapture();
  await persistOperationalUpdateAndHistory(sql, {
    engineeringWorkId: "work-1",
    projectSlug: "aredirlabs-com",
    expectedVersion: 3,
    expectedState: "active",
    currentNextAction: "Reproduce on the validation environment.",
    currentOutcome: "The symptom is isolated.",
    condition: "Waiting on a reproducible fixture",
    conditionRationale: "The fixture is required for deterministic validation.",
    defectContext: {
      observedBehavior: "Observed",
      expectedBehavior: "Expected",
      reproductionSteps: "Steps",
      environment: "Environment",
      evidence: "Evidence",
      nextInvestigation: "Investigation",
      validationTarget: "Target",
    },
    historyEventId: "history-defect",
    defectRevisionId: "revision-defect",
    provenance: humanExecution,
  });

  assert.match(calls[0].query, /title = CASE WHEN \$5 = 'proposed_correction'/);
  assert.match(calls[0].query, /summary = CASE WHEN \$5 = 'proposed_correction'/);
  assert.match(calls[0].query, /INSERT INTO workspace_engineering_work_defect_revisions/);
  assert.match(calls[0].query, /workspace_engineering_work_history/);
  assert.equal(calls[0].params?.[4], "operate");
});

test("proposal correction preserves Proposed state and records exactly one correction event", async () => {
  const { sql, calls } = successfulSqlCapture();
  await persistProposedCorrectionAndHistory(sql, {
    engineeringWorkId: "work-1",
    projectSlug: "aredirlabs-com",
    expectedVersion: 1,
    title: "Corrected proposal",
    type: "feature",
    objective: "Corrected objective.",
    currentNextAction: "Review the corrected proposal.",
    historyEventId: "history-correction",
    provenance: humanExecution,
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].params?.[3], "proposed");
  assert.equal(calls[0].params?.[4], "proposed_correction");
  assert.equal(calls[0].params?.[5], "proposed");
  assert.equal(calls[0].query.match(/INSERT INTO workspace_engineering_work_history/g)?.length, 1);
});

test("authorized proposal activation produces Active and exactly one truthful lifecycle event", async () => {
  const { sql, calls } = successfulSqlCapture();
  const authorization = engineeringWorkDecisionProvenance({
    actionActor: human,
    decisionActor: human,
    decisionRole: "authorization",
    authority: { type: "human_owner", context: "Engineering Work activation gate" },
    decision: "Authorize Proposed to Active lifecycle transition.",
    rationale: "The proposal is approved for implementation.",
    decisionBasis: { summary: "The bounded scope was reviewed by the product authority." },
  });

  await persistEngineeringWorkTransitionAndHistory(sql, {
    engineeringWorkId: "work-1",
    projectSlug: "aredirlabs-com",
    expectedVersion: 1,
    priorState: "proposed",
    resultingState: "active",
    historyEventId: "history-activation",
    provenance: authorization,
  });

  assert.equal(calls.length, 1);
  assert.equal(calls[0].params?.[3], "proposed");
  assert.equal(calls[0].params?.[4], "transition");
  assert.equal(calls[0].params?.[5], "active");
  assert.equal(calls[0].params?.[22], "transition");
  assert.equal(calls[0].params?.[27], "human");
  assert.equal(calls[0].params?.[30], "human");
  assert.equal(calls[0].query.match(/INSERT INTO workspace_engineering_work_history/g)?.length, 1);
  assert.match(calls[0].query, /title = CASE WHEN \$5 = 'proposed_correction' THEN \$7 ELSE work\.title END/);
  assert.match(calls[0].query, /current_next_action = CASE WHEN \$5 IN \('proposed_correction', 'operate'\) THEN \$10 ELSE work\.current_next_action END/);
});

test("stale proposal activation fails without a projection or history result", async () => {
  const calls: string[] = [];
  const sql: EngineeringWorkSqlExecutor = {
    async query(query) {
      calls.push(query);
      return [];
    },
  };
  const result = await persistEngineeringWorkTransitionAndHistory(sql, {
    engineeringWorkId: "work-1",
    projectSlug: "aredirlabs-com",
    expectedVersion: 99,
    priorState: "proposed",
    resultingState: "active",
    historyEventId: "history-stale-activation",
    provenance: humanExecution,
  });

  assert.deepEqual(result, { ok: false, reason: "not_found_or_stale" });
  assert.equal(calls.length, 1);
  assert.match(calls[0], /work\.version = \$3/);
  assert.match(calls[0], /work\.state = \$4::engineering_work_state/);
  assert.match(calls[0], /JOIN updated_work AS updated/);
});

test("Phase B rejects unsupported completion transitions before persistence", () => {
  const { sql, calls } = successfulSqlCapture();
  assert.throws(
    () => persistEngineeringWorkTransitionAndHistory(sql, {
      engineeringWorkId: "work-1",
      projectSlug: "aredirlabs-com",
      expectedVersion: 3,
      priorState: "active",
      resultingState: "completed" as "active",
      historyEventId: "history-complete",
      provenance: humanExecution,
    }),
    /Unsupported Phase B lifecycle transition/,
  );
  assert.equal(calls.length, 0);
});

test("completion atomically clears the current action and preserves it in history", async () => {
  const { sql, calls } = successfulSqlCapture();
  const completion = engineeringWorkDecisionProvenance({
    actionActor: human,
    decisionActor: human,
    decisionRole: "authorization",
    authority: { type: "human_owner", context: "Completion gate" },
    decision: "Authorize completion.",
    rationale: "The verified outcome satisfies the objective.",
    decisionBasis: { summary: "Human-reviewed completion evidence." },
  });

  const result = await persistEngineeringWorkCompletionAndHistory(sql, {
    engineeringWorkId: "work-1",
    projectSlug: "aredirlabs-com",
    expectedVersion: 3,
    expectedState: "active",
    verifiedOutcome: "The intended outcome was verified.",
    finalDisposition: "No further work is required.",
    historyEventId: "history-completion",
    focusInvalidationEventId: "focus-invalidation-1",
    focusInvalidationBatchId: "focus-batch-1",
    provenance: completion,
  });

  assert.equal(calls.length, 1);
  assert.match(calls[0].query, /state = 'completed'/);
  assert.match(calls[0].query, /current_next_action = NULL/);
  assert.match(calls[0].query, /previous\.current_next_action, updated\.current_next_action/);
  assert.match(calls[0].query, /action_actor_type.+decision_actor_type/s);
  assert.match(calls[0].query, /inserted_focus_invalidation/);
  assert.equal(calls[0].params?.[10], "human");
  assert.equal(calls[0].params?.[13], "human");
  assert.deepEqual(result, {
    ok: true,
    engineeringWorkId: "work-1",
    version: 4,
    historyEventId: "history-1",
    defectRevisionId: null,
  });
});

test("completion supports In Review and rejects stale versions without a history row", async () => {
  const completion = engineeringWorkDecisionProvenance({
    actionActor: human,
    decisionActor: human,
    decisionRole: "authorization",
    authority: { type: "human_owner" },
    decision: "Authorize completion.",
    rationale: "Review accepted the verified outcome.",
    decisionBasis: { summary: "Accepted review evidence." },
  });
  const sql: EngineeringWorkSqlExecutor = { async query() { return []; } };
  const result = await persistEngineeringWorkCompletionAndHistory(sql, {
    engineeringWorkId: "work-1",
    projectSlug: "aredirlabs-com",
    expectedVersion: 7,
    expectedState: "in_review",
    verifiedOutcome: "Verified review outcome.",
    finalDisposition: "Complete.",
    historyEventId: "history-stale-completion",
    focusInvalidationEventId: "focus-invalidation-stale",
    focusInvalidationBatchId: "focus-batch-stale",
    provenance: completion,
  });
  assert.deepEqual(result, { ok: false, reason: "not_found_or_stale" });
});

test("completion requires authorization provenance with a decision basis", async () => {
  await assert.rejects(
    persistEngineeringWorkCompletionAndHistory({ async query() { return []; } }, {
      engineeringWorkId: "work-1",
      projectSlug: "aredirlabs-com",
      expectedVersion: 1,
      expectedState: "active",
      verifiedOutcome: "Verified.",
      finalDisposition: "Done.",
      historyEventId: "history-invalid-completion",
      focusInvalidationEventId: "focus-invalidation-invalid",
      focusInvalidationBatchId: "focus-batch-invalid",
      provenance: humanExecution,
    }),
    /Completion requires authorization/,
  );
});

test("decision-only events anchor to a version without updating the projection", async () => {
  const { sql, calls } = successfulSqlCapture();
  const recommendation = engineeringWorkDecisionProvenance({
    actionActor: aiAgent,
    decisionActor: aiAgent,
    decisionRole: "recommendation",
    decision: "Recommend completion.",
    rationale: "Verification passed.",
    decisionBasis: { summary: "All checks passed." },
    recommendedState: "completed",
  });

  await appendEngineeringWorkDecisionEvent(sql, {
    engineeringWorkId: "work-1",
    projectSlug: "aredirlabs-com",
    expectedVersion: 4,
    expectedState: "in_review",
    eventId: "history-recommendation",
    actionType: "recommend_completion",
    provenance: recommendation,
  });

  assert.equal(calls.length, 1);
  assert.match(calls[0].query, /INSERT INTO workspace_engineering_work_history/);
  assert.doesNotMatch(calls[0].query, /UPDATE workspace_engineering_work/);
});
