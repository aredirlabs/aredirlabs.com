import assert from "node:assert/strict";
import test from "node:test";

import {
  bandedManifoldColumns,
  buildFieldRouteUrl,
  evidenceCompleteness,
  fieldChannels,
  FIELD_DOCUMENTED_TRANSITIONS,
  FIELD_IMPLEMENTED_TRANSITIONS,
  fieldRouteInitFromParams,
  historicalPosture,
  instrumentizable,
  isImplementedTransition,
  lifecycleDistribution,
  manifoldColumns,
  parseFieldRoute,
  provenanceCompleteness,
  provenancePlanes,
  reachableStates,
  reconciliationStatus,
  siblingGroups,
  stateRole,
  workDesignator,
  workTitleBody,
  type FieldAttention,
  type FieldContinuation,
  type FieldHistoryEvent,
  type FieldProject,
  type FieldWork,
} from "@/lib/prototype/operating-field";
import { ENGINEERING_WORK_STATES } from "@/lib/workspace/engineering-work";

function work(overrides: Partial<FieldWork> = {}): FieldWork {
  return {
    id: "eng_work_a",
    projectId: "proj_01",
    projectSlug: "alignfit",
    projectName: "AlignFit",
    title: "Some Engineering Work",
    summary: "Objective text.",
    type: "architecture",
    workflow: "architecture",
    state: "proposed",
    currentNextAction: "Do the next thing.",
    currentOutcome: null,
    condition: null,
    conditionRationale: null,
    finalDisposition: null,
    priority: null,
    version: 1,
    createdAt: "2026-08-01T00:00:00.000Z",
    updatedAt: "2026-08-02T00:00:00.000Z",
    isFocused: false,
    continuationEligible: false,
    evidence: [],
    history: [],
    knowledge: [],
    defectContextComplete: null,
    ...overrides,
  };
}

function historyEvent(overrides: Partial<FieldHistoryEvent> = {}): FieldHistoryEvent {
  return {
    id: "evt_1",
    kind: "lifecycle_transition",
    actionType: "transition",
    priorState: "proposed",
    resultingState: "active",
    previousNextAction: "Old action.",
    resultingNextAction: "New action.",
    previousOutcome: null,
    resultingOutcome: null,
    previousCondition: null,
    resultingCondition: null,
    decision: "Activate",
    rationale: "Authorized.",
    actionActorType: "human",
    actionActorIdentifier: "operator@example.com",
    decisionActorType: "human",
    decisionActorIdentifier: "operator@example.com",
    decisionRole: "authorization",
    authorityType: "human_owner",
    occurredAt: "2026-08-10T00:00:00.000Z",
    ...overrides,
  };
}

const project: FieldProject = {
  id: "proj_01",
  slug: "alignfit",
  name: "AlignFit",
  status: "testing",
  stage: "uat",
  category: null,
  description: null,
  targetDate: null,
  focusVersion: 3,
  focusedWorkIds: [],
  focusProjectionSuppressed: false,
  milestones: [],
};

/* ---------------------------------------------------------------- */
/* Lifecycle mechanism honesty                                      */
/* ---------------------------------------------------------------- */

test("implemented transitions match the transitions the system can actually perform", () => {
  const edges = FIELD_IMPLEMENTED_TRANSITIONS.map(([from, to]) => `${from}:${to}`);

  // proposed -> active is activation; active <-> in_review is the Phase B set;
  // completion runs from either operating state.
  assert.deepEqual(edges.sort(), [
    "active:completed",
    "active:in_review",
    "in_review:active",
    "in_review:completed",
    "proposed:active",
  ]);
});

test("documented-only transitions are never reported as implemented", () => {
  for (const [from, to] of FIELD_DOCUMENTED_TRANSITIONS) {
    assert.equal(
      isImplementedTransition(from, to),
      false,
      `${from} -> ${to} must not be presented as implemented`,
    );
  }
});

test("terminal dispositions have no implemented outbound transition", () => {
  for (const state of ["completed", "closed", "cancelled", "superseded"] as const) {
    assert.deepEqual(reachableStates(state), []);
  }
});

test("reachable states from an operating state are the implemented targets only", () => {
  assert.deepEqual(reachableStates("proposed"), ["active"]);
  assert.deepEqual(reachableStates("active").sort(), ["completed", "in_review"]);
  assert.deepEqual(reachableStates("in_review").sort(), ["active", "completed"]);
});

/* ---------------------------------------------------------------- */
/* Role mapping stays delegated to the canonical mapping            */
/* ---------------------------------------------------------------- */

test("state roles delegate to the canonical operational role mapping", () => {
  assert.equal(stateRole("active"), "actionable");
  assert.equal(stateRole("in_review"), "actionable");
  assert.equal(stateRole("completed"), "settled");
  assert.equal(stateRole("closed"), "settled");
  assert.equal(stateRole("cancelled"), "settled");
  assert.equal(stateRole("proposed"), "inert");
  assert.equal(stateRole("superseded"), "inert");
});

/* ---------------------------------------------------------------- */
/* Manifold: position encodes lifecycle, order is declared          */
/* ---------------------------------------------------------------- */

test("manifold columns follow canonical lifecycle order and retain empty states", () => {
  const columns = manifoldColumns([work({ id: "b", state: "active" })]);

  assert.deepEqual(
    columns.map((column) => column.state),
    [...ENGINEERING_WORK_STATES],
  );
  assert.equal(columns.length, ENGINEERING_WORK_STATES.length);
  assert.equal(columns.find((column) => column.state === "closed")?.items.length, 0);
});

test("manifold orders within a column by identifier, never by recency", () => {
  const columns = manifoldColumns([
    work({ id: "eng_work_c", state: "proposed", updatedAt: "2026-09-01T00:00:00.000Z" }),
    work({ id: "eng_work_a", state: "proposed", updatedAt: "2026-01-01T00:00:00.000Z" }),
    work({ id: "eng_work_b", state: "proposed", updatedAt: "2026-05-01T00:00:00.000Z" }),
  ]);

  const proposed = columns.find((column) => column.state === "proposed");
  assert.deepEqual(
    proposed?.items.map((item) => item.id),
    ["eng_work_a", "eng_work_b", "eng_work_c"],
  );
});

test("the banded manifold keeps the lifecycle axis identical to the project reading", () => {
  const second: FieldProject = { ...project, id: "proj_02", slug: "leagueos", name: "LeagueOS" };
  const records = [
    work({ id: "a", projectId: "proj_01", state: "proposed" }),
    work({ id: "b", projectId: "proj_02", state: "proposed" }),
    work({ id: "c", projectId: "proj_01", state: "active" }),
  ];

  const banded = bandedManifoldColumns(records, [project, second]);

  assert.deepEqual(
    banded.map((column) => column.state),
    [...ENGINEERING_WORK_STATES],
    "the portfolio axis must match the canonical lifecycle order exactly",
  );
  assert.deepEqual(
    banded.map((column) => column.items.length),
    manifoldColumns(records).map((column) => column.items.length),
    "banding must not change which column a record occupies",
  );
});

test("bands follow project order and omit projects with no record in that state", () => {
  const second: FieldProject = { ...project, id: "proj_02", slug: "leagueos", name: "LeagueOS" };
  const records = [
    work({ id: "b", projectId: "proj_02", state: "proposed" }),
    work({ id: "a", projectId: "proj_01", state: "proposed" }),
    work({ id: "c", projectId: "proj_02", state: "active" }),
  ];

  const banded = bandedManifoldColumns(records, [project, second]);
  const proposed = banded.find((column) => column.state === "proposed");
  const active = banded.find((column) => column.state === "active");

  assert.deepEqual(
    proposed?.bands.map((band) => band.projectId),
    ["proj_01", "proj_02"],
    "band order follows the supplied project order, not record order",
  );
  assert.deepEqual(
    active?.bands.map((band) => band.projectId),
    ["proj_02"],
    "a project with no record in a state produces no band",
  );
  assert.equal(
    banded.find((column) => column.state === "closed")?.bands.length,
    0,
    "an empty column is retained but carries no bands",
  );
});

test("sibling groups drop empty states so lateral movement lists only real records", () => {
  const records = [
    work({ id: "a", state: "proposed" }),
    work({ id: "b", state: "completed" }),
  ];

  const groups = siblingGroups(records);

  assert.deepEqual(
    groups.map((group) => group.state),
    ["proposed", "completed"],
    "groups keep canonical lifecycle order while omitting states with no records",
  );
  assert.ok(
    groups.every((group) => group.items.length > 0),
    "no empty group may appear in the rail",
  );
});

test("lifecycle distribution reports categorical counts for every state", () => {
  const distribution = lifecycleDistribution([
    work({ id: "1", state: "proposed" }),
    work({ id: "2", state: "proposed" }),
    work({ id: "3", state: "active" }),
  ]);

  assert.equal(distribution.length, ENGINEERING_WORK_STATES.length);
  assert.equal(distribution.find((entry) => entry.state === "proposed")?.count, 2);
  assert.equal(distribution.find((entry) => entry.state === "active")?.count, 1);
  assert.equal(distribution.find((entry) => entry.state === "completed")?.count, 0);
});

/* ---------------------------------------------------------------- */
/* Channels stay independent                                        */
/* ---------------------------------------------------------------- */

test("focus, continuation, and attention remain separately derived channels", () => {
  const focused = work({ id: "eng_focus", state: "active" });
  const continuing = work({ id: "eng_cont", state: "in_review" });
  const conditioned = work({ id: "eng_attend", state: "active", condition: "Blocked." });

  const continuation: FieldContinuation = {
    mode: "single",
    totalCandidates: 1,
    candidates: [
      {
        workId: "eng_cont",
        projectSlug: "alignfit",
        projectName: "AlignFit",
        title: "Continuing work",
        nextAction: "Continue.",
        purpose: "Purpose.",
        reason: "Reason.",
      },
    ],
  };

  const attention: FieldAttention = {
    total: 1,
    items: [
      {
        workId: "eng_attend",
        projectSlug: "alignfit",
        projectName: "AlignFit",
        subject: "Conditioned work",
        condition: "Blocked.",
        explanation: null,
      },
    ],
  };

  const channels = fieldChannels({
    project: { ...project, focusedWorkIds: ["eng_focus"] },
    work: [focused, continuing, conditioned],
    continuation,
    attention,
  });

  assert.deepEqual(channels.focus.workIds, ["eng_focus"]);
  assert.deepEqual(channels.continuation.workIds, ["eng_cont"]);
  assert.deepEqual(channels.attention.workIds, ["eng_attend"]);
});

test("channels exclude references to work outside the project", () => {
  const channels = fieldChannels({
    project: { ...project, focusedWorkIds: ["eng_elsewhere"] },
    work: [work({ id: "eng_here" })],
    continuation: {
      mode: "single",
      totalCandidates: 1,
      candidates: [
        {
          workId: "eng_elsewhere",
          projectSlug: "other",
          projectName: "Other",
          title: "Elsewhere",
          nextAction: "Elsewhere.",
          purpose: "Purpose.",
          reason: "Reason.",
        },
      ],
    },
    attention: { total: 0, items: [] },
  });

  assert.deepEqual(channels.focus.workIds, []);
  assert.deepEqual(channels.continuation.workIds, []);
});

test("a suppressed focus projection is reported rather than hidden", () => {
  const channels = fieldChannels({
    project: {
      ...project,
      status: "paused",
      focusedWorkIds: ["eng_here"],
      focusProjectionSuppressed: true,
    },
    work: [work({ id: "eng_here" })],
    continuation: { mode: "none", totalCandidates: 0, candidates: [] },
    attention: { total: 0, items: [] },
  });

  assert.equal(channels.focus.suppressed, true);
  assert.deepEqual(channels.focus.workIds, ["eng_here"]);
});

/* ---------------------------------------------------------------- */
/* Provenance well                                                  */
/* ---------------------------------------------------------------- */

test("the present is always the front authoritative plane", () => {
  const planes = provenancePlanes({ history: [] });

  assert.equal(planes.length, 1);
  assert.equal(planes[0].depth, 0);
  assert.equal(planes[0].authoritative, true);
  assert.equal(planes[0].event, null);
});

test("history planes recede newest-first and are never authoritative", () => {
  const planes = provenancePlanes({
    history: [
      historyEvent({ id: "older", occurredAt: "2026-08-01T00:00:00.000Z" }),
      historyEvent({ id: "newer", occurredAt: "2026-08-20T00:00:00.000Z" }),
    ],
  });

  assert.deepEqual(
    planes.map((plane) => plane.depth),
    [0, 1, 2],
  );
  assert.equal(planes[1].event?.id, "newer");
  assert.equal(planes[2].event?.id, "older");
  assert.equal(planes[1].authoritative, false);
  assert.equal(planes[2].authoritative, false);
});

test("historical posture reports only what the event recorded", () => {
  const posture = historicalPosture(
    historyEvent({
      priorState: "proposed",
      resultingState: "active",
      previousNextAction: "Old.",
      resultingNextAction: "New.",
      resultingOutcome: null,
    }),
  );

  assert.equal(posture.state, "active");
  assert.equal(posture.nextAction, "New.");
  assert.equal(posture.outcome, null);
  assert.equal(posture.changedState, true);
  assert.equal(posture.changedNextAction, true);
});

test("an event that did not change state does not claim a transition", () => {
  const posture = historicalPosture(
    historyEvent({ priorState: "active", resultingState: "active" }),
  );

  assert.equal(posture.changedState, false);
});

/* ---------------------------------------------------------------- */
/* Completeness projections                                         */
/* ---------------------------------------------------------------- */

test("evidence completeness counts records and reference statuses", () => {
  const completeness = evidenceCompleteness([
    work({
      id: "1",
      evidence: [
        {
          id: "ref_1",
          repository: "AlignFit",
          sourceLocation: "docs/a.md",
          artifactClass: "repository_document",
          authority: "repository_authoritative",
          referenceStatus: "verified",
          artifactIdentifier: null,
          note: null,
          lastReviewedAt: null,
        },
        {
          id: "ref_2",
          repository: "AlignFit",
          sourceLocation: "docs/b.md",
          artifactClass: "repository_document",
          authority: "repository_authoritative",
          referenceStatus: "stale",
          artifactIdentifier: null,
          note: null,
          lastReviewedAt: null,
        },
      ],
    }),
    work({ id: "2" }),
    work({ id: "3" }),
  ]);

  assert.equal(completeness.records, 3);
  assert.equal(completeness.recordsWithEvidence, 1);
  assert.equal(completeness.references, 2);
  assert.equal(completeness.byStatus.verified, 1);
  assert.equal(completeness.byStatus.stale, 1);
  assert.equal(completeness.byStatus.expected, 0);
});

test("provenance completeness distinguishes recorded history from absence", () => {
  const completeness = provenanceCompleteness([
    work({ id: "1", history: [historyEvent()] }),
    work({ id: "2" }),
  ]);

  assert.equal(completeness.records, 2);
  assert.equal(completeness.recordsWithHistory, 1);
  assert.equal(completeness.events, 1);
});

/* ---------------------------------------------------------------- */
/* Identity presentation                                            */
/* ---------------------------------------------------------------- */

test("designators are read from the title without replacing record identity", () => {
  assert.equal(
    workDesignator({ title: "EDITOR-001 — Unified Engineering Content Editor" }),
    "EDITOR-001",
  );
  assert.equal(
    workDesignator({ title: "PROJECT-UX-002 — Operational Detail Layout" }),
    "PROJECT-UX-002",
  );
  assert.equal(workDesignator({ title: "Hydration Operational State" }), null);
});

test("title body drops the designator only when one is present", () => {
  assert.equal(
    workTitleBody({ title: "EDITOR-001 — Unified Engineering Content Editor" }),
    "Unified Engineering Content Editor",
  );
  assert.equal(
    workTitleBody({ title: "Hydration Operational State" }),
    "Hydration Operational State",
  );
});

/* ---------------------------------------------------------------- */
/* Presentation-route contract (disposable instrument)               */
/* ---------------------------------------------------------------- */

test("only proposed records may invoke the Activation Authorization instrument", () => {
  assert.equal(instrumentizable(work()), true);
  assert.equal(instrumentizable(work({ state: "active" })), false);
  assert.equal(instrumentizable(work({ state: "in_review" })), false);
  assert.equal(instrumentizable(work({ state: "completed" })), false);
  assert.equal(instrumentizable(work({ state: "closed" })), false);
  assert.equal(instrumentizable(work({ state: "cancelled" })), false);
  assert.equal(instrumentizable(work({ state: "superseded" })), false);
  assert.equal(instrumentizable(null), false);
  assert.equal(instrumentizable(undefined), false);
});

test("the route contract is empty at portfolio altitude", () => {
  const init = fieldRouteInitFromParams({});
  assert.deepEqual(init, {
    projectSlug: null,
    workId: null,
    instrumentOpen: false,
  });
});

test("an instrument only opens when both project and work are present", () => {
  assert.equal(
    fieldRouteInitFromParams({
      project: "alignfit",
      work: "eng_work_a",
      instrument: "activate",
    }).instrumentOpen,
    true,
  );
  assert.equal(
    fieldRouteInitFromParams({
      project: "alignfit",
      instrument: "activate",
    }).instrumentOpen,
    false,
    "an instrument without a work record must not claim to be open",
  );
  assert.equal(
    fieldRouteInitFromParams({
      work: "eng_work_a",
      instrument: "activate",
    }).instrumentOpen,
    false,
    "an instrument without a project cannot be reconstructed",
  );
  assert.equal(
    fieldRouteInitFromParams({
      project: "alignfit",
      work: "eng_work_a",
    }).instrumentOpen,
    false,
  );
});

test("the query string and the builder produce the same route", () => {
  assert.deepEqual(
    parseFieldRoute("?project=alignfit&work=eng_work_a&instrument=activate"),
    fieldRouteInitFromParams({
      project: "alignfit",
      work: "eng_work_a",
      instrument: "activate",
    }),
  );
});

test("build then parse round-trips the smallest route contract", () => {
  const cases = [
    { position: { projectSlug: null, workId: null }, open: false },
    { position: { projectSlug: "alignfit", workId: null }, open: false },
    {
      position: { projectSlug: "alignfit", workId: "eng_work_a" },
      open: false,
    },
    {
      position: { projectSlug: "alignfit", workId: "eng_work_a" },
      open: true,
    },
  ];

  for (const { position, open } of cases) {
    const url = buildFieldRouteUrl(position, open);
    assert.deepEqual(
      parseFieldRoute(url),
      { ...position, instrumentOpen: open },
      url,
    );
  }
});

test("the builder never emits an instrument without a work record", () => {
  const url = buildFieldRouteUrl(
    { projectSlug: "alignfit", workId: null },
    true,
  );
  assert.equal(url.includes("instrument="), false);
});

test("reconciliation status reads the authoritative field, not the form", () => {
  const snapshot = {
    observedAt: "2026-08-27T00:00:00.000Z",
    operator: null,
    projects: [project],
    work: [
      work({ id: "eng_active", state: "active" }),
      work({ id: "eng_still_proposed", state: "proposed" }),
    ],
    continuation: { mode: "none", totalCandidates: 0, candidates: [] },
    attention: { total: 0, items: [] },
  };

  assert.equal(reconciliationStatus(snapshot, "eng_active"), "active");
  assert.equal(reconciliationStatus(snapshot, "eng_still_proposed"), "not_active");
  assert.equal(reconciliationStatus(snapshot, "eng_missing"), "missing");
  assert.equal(reconciliationStatus(snapshot, null), "missing");
});
