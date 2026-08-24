import assert from "node:assert/strict";
import test from "node:test";

import {
  focusedWorkIdSet,
  isFocusSelectionEligible,
  isOperationalFocusProjected,
  projectOperationalFocusProjection,
  sortFocusSelectionsForDisplay,
  type FocusSelectionSource,
} from "./operational-focus";
import {
  isContinuationCandidate,
  projectContinuation,
  type ContinuationSource,
} from "./workspace-operational";
import {
  persistOperationalFocusClear,
  persistOperationalFocusInvalidationForWork,
  persistOperationalFocusReplace,
  persistOperationalFocusSelectionAdd,
  persistOperationalFocusSelectionRemove,
} from "./operational-focus-persistence";
import {
  normalizeOperationalFocusTargetWorkIds,
  planOperationalFocusReplace,
} from "./operational-focus-replace-plan";
import {
  authenticatedHumanEngineeringWorkActor,
} from "./engineering-work-provenance";
import type { EngineeringWorkSqlExecutor } from "./engineering-work-history-persistence";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

function selection(
  overrides: Partial<FocusSelectionSource> & Pick<FocusSelectionSource, "engineeringWorkId">,
): FocusSelectionSource {
  return {
    title: `Work ${overrides.engineeringWorkId}`,
    state: "active",
    currentNextAction: "Continue implementation",
    condition: null,
    selectedAt: new Date("2026-08-01T00:00:00.000Z"),
    ...overrides,
  };
}

const human = authenticatedHumanEngineeringWorkActor({
  user: { id: "user-1", name: "Operator" },
});

const humanCommandBase = {
  projectSlug: "aredirlabs-com",
  expectedFocusVersion: 0,
  batchId: "batch-1",
  actionActor: human,
  decisionActor: human,
  authority: {
    type: "human_owner" as const,
    context: "Shared Workspace focus selection",
  },
};

test("zero focused records yields none mode and null singleton next step", () => {
  const projection = projectOperationalFocusProjection({
    projectStatus: "active",
    selections: [],
  });
  assert.equal(projection.mode, "none");
  assert.equal(projection.operationalFocus.length, 0);
  assert.equal(projection.singletonNextStep, null);
  assert.equal(projection.pluralNextActions.length, 0);
});

test("one focused record yields single mode and safe singleton next-step projection", () => {
  const projection = projectOperationalFocusProjection({
    projectStatus: "active",
    selections: [selection({ engineeringWorkId: "work-a", currentNextAction: "Ship focus MVP" })],
  });
  assert.equal(projection.mode, "single");
  assert.equal(projection.singletonNextStep, "Ship focus MVP");
  assert.equal(projection.pluralNextActions.length, 0);
});

test("multiple focused records yield plural mode and suppress singleton next step", () => {
  const projection = projectOperationalFocusProjection({
    projectStatus: "active",
    selections: [
      selection({ engineeringWorkId: "work-b", title: "Beta", currentNextAction: "Second action" }),
      selection({ engineeringWorkId: "work-a", title: "Alpha", currentNextAction: "First action" }),
    ],
  });
  assert.equal(projection.mode, "plural");
  assert.equal(projection.singletonNextStep, null);
  assert.equal(projection.pluralNextActions.length, 2);
  assert.deepEqual(
    projection.pluralNextActions.map((item) => item.engineeringWorkId),
    ["work-a", "work-b"],
  );
});

test("display sort is deterministic and does not imply ranking authority", () => {
  const sorted = sortFocusSelectionsForDisplay([
    selection({ engineeringWorkId: "work-z", title: "Zulu" }),
    selection({ engineeringWorkId: "work-a", title: "Alpha" }),
  ]);
  assert.deepEqual(sorted.map((item) => item.title), ["Alpha", "Zulu"]);
});

test("focus selection eligibility excludes proposed and non-operating Projects", () => {
  assert.equal(isFocusSelectionEligible("active", "active"), true);
  assert.equal(isFocusSelectionEligible("testing", "in_review"), true);
  assert.equal(isFocusSelectionEligible("active", "proposed"), false);
  assert.equal(isFocusSelectionEligible("paused", "active"), false);
  assert.equal(isFocusSelectionEligible("planning", "active"), false);
});

test("paused Project retains selections but suppresses operational projection", () => {
  const projection = projectOperationalFocusProjection({
    projectStatus: "paused",
    selections: [selection({ engineeringWorkId: "work-a" })],
  });
  assert.equal(projection.currentSelections.length, 1);
  assert.equal(projection.operationalFocus.length, 0);
  assert.equal(projection.projectionSuppressed, true);
  assert.equal(projection.mode, "none");
});

test("conditioned focused work remains projected with actionability facet via condition field", () => {
  const projection = projectOperationalFocusProjection({
    projectStatus: "active",
    selections: [
      selection({
        engineeringWorkId: "work-conditioned",
        condition: "Waiting for access",
      }),
    ],
  });
  assert.equal(projection.operationalFocus.length, 1);
  assert.equal(projection.operationalFocus[0].condition, "Waiting for access");
});

test("focus does not alter continuation eligibility", () => {
  const source: ContinuationSource = {
    id: "work-1",
    title: "Focused work",
    summary: "Summary",
    workflow: "delivery",
    state: "active",
    currentNextAction: "Continue",
    condition: null,
    updatedAt: new Date(),
    projectId: "project-1",
    projectName: "Project",
    projectSlug: "project",
    projectStatus: "active",
    defectNextInvestigation: null,
    defectValidationTarget: null,
    defectContextComplete: false,
  };
  const before = isContinuationCandidate(source);
  const projection = projectOperationalFocusProjection({
    projectStatus: "active",
    selections: [selection({ engineeringWorkId: "work-1" })],
  });
  const after = isContinuationCandidate(source);
  assert.equal(before, true);
  assert.equal(after, true);
  assert.equal(projection.operationalFocus.length, 1);
  assert.equal(projectContinuation([source]).mode, "single");
});

test("conditioned focused work remains attention-bearing and continuation-ineligible", () => {
  const blocked = {
    id: "work-blocked",
    title: "Blocked",
    summary: "Summary",
    workflow: "delivery" as const,
    state: "active",
    currentNextAction: "Continue",
    condition: "Blocked",
    updatedAt: new Date(),
    projectId: "project-1",
    projectName: "Project",
    projectSlug: "project",
    projectStatus: "active",
    defectNextInvestigation: null,
    defectValidationTarget: null,
    defectContextComplete: false,
  };
  const projection = projectOperationalFocusProjection({
    projectStatus: "active",
    selections: [
      selection({
        engineeringWorkId: "work-blocked",
        condition: "Blocked",
      }),
    ],
  });
  assert.equal(projection.operationalFocus.length, 1);
  assert.equal(isContinuationCandidate(blocked), false);
});

test("singleton next step is null when focused work has no usable next action", () => {
  const projection = projectOperationalFocusProjection({
    projectStatus: "active",
    selections: [
      selection({ engineeringWorkId: "work-a", currentNextAction: "   " }),
    ],
  });
  assert.equal(projection.mode, "single");
  assert.equal(projection.singletonNextStep, null);
});

function captureSql(resultRows: Array<Record<string, unknown>>) {
  const calls: Array<{ query: string; params?: unknown[] }> = [];
  const sql: EngineeringWorkSqlExecutor = {
    async query(query, params) {
      calls.push({ query, params });
      return resultRows;
    },
  };
  return { sql, calls };
}

function assertVersionGuardPrecedesMutations(query: string) {
  const lockIdx = query.indexOf("locked_project AS");
  assert.ok(lockIdx >= 0, "expected locked_project CTE");
  for (const mutation of [
    "INSERT INTO workspace_project_focus_events",
    "INSERT INTO workspace_project_focus_selection",
    "DELETE FROM workspace_project_focus_selection",
  ]) {
    const mutationIdx = query.indexOf(mutation);
    if (mutationIdx >= 0) {
      assert.ok(
        lockIdx < mutationIdx,
        `expected locked_project before ${mutation}`,
      );
    }
  }
}

function cteBody(query: string, cteName: string): string {
  const marker = `${cteName} AS (`;
  const start = query.indexOf(marker);
  if (start < 0) return "";
  let depth = 0;
  let i = start + marker.length;
  for (; i < query.length; i++) {
    const char = query[i];
    if (char === "(") depth += 1;
    if (char === ")") {
      if (depth === 0) break;
      depth -= 1;
    }
  }
  return query.slice(start, i + 1);
}

function assertCteReferences(
  query: string,
  consumerCte: string,
  producerCte: string,
  message?: string,
) {
  const body = cteBody(query, consumerCte);
  assert.ok(body.length > 0, `expected ${consumerCte} CTE`);
  assert.match(
    body,
    new RegExp(`\\b${producerCte}\\b`),
    message ?? `${consumerCte} must reference ${producerCte}`,
  );
}

function assertClearLockDependencies(query: string) {
  assertCteReferences(query, "work_lock_barrier", "locked_works");
  assertCteReferences(query, "locked_project", "work_lock_barrier");
  assertCteReferences(query, "removed", "locked_project");
  assert.match(cteBody(query, "removed"), /\blocked_works\b/);
}

function assertCompletionLockDependencies(query: string) {
  assertCteReferences(query, "locked_project", "current_work");
  assertCteReferences(query, "updated_work", "locked_project");
  assertCteReferences(query, "deleted_focus", "locked_project");
  assertCteReferences(query, "incremented_focus_version", "locked_project");
}

function assertAddLockDependencies(query: string) {
  assertCteReferences(query, "locked_project", "locked_work");
  assertCteReferences(query, "inserted_event", "locked_project");
}

function assertRemoveLockDependencies(query: string) {
  assertCteReferences(query, "locked_project", "locked_work");
  assertCteReferences(query, "removed", "locked_project");
}

function assertReplaceLockDependencies(query: string) {
  assert.match(cteBody(query, "removed"), /\blocked_project\b/);
  assert.match(cteBody(query, "add_rows"), /\blocked_works\b/);
  assert.match(cteBody(query, "add_rows"), /\blocked_project\b/);
}

type SimFocusState = {
  focusVersion: number;
  selections: Set<string>;
  events: number;
};

function simAdd(state: SimFocusState, expectedVersion: number, workId: string) {
  if (state.focusVersion !== expectedVersion) {
    return { ok: false as const, mutated: false };
  }
  if (state.selections.has(workId)) {
    return { ok: true as const, mutated: false };
  }
  state.selections.add(workId);
  state.events += 1;
  state.focusVersion += 1;
  return { ok: true as const, mutated: true };
}

function simRemove(state: SimFocusState, expectedVersion: number, workId: string) {
  if (state.focusVersion !== expectedVersion) {
    return { ok: false as const, mutated: false, reason: "stale" as const };
  }
  if (!state.selections.has(workId)) {
    return { ok: false as const, mutated: false, reason: "not_selected" as const };
  }
  state.selections.delete(workId);
  state.events += 1;
  state.focusVersion += 1;
  return { ok: true as const, mutated: true, reason: "applied" as const };
}

function simClear(state: SimFocusState, expectedVersion: number) {
  if (state.focusVersion !== expectedVersion) {
    return { ok: false as const, mutated: false };
  }
  if (state.selections.size === 0) {
    return { ok: true as const, mutated: false };
  }
  const count = state.selections.size;
  state.selections.clear();
  state.events += count;
  state.focusVersion += 1;
  return { ok: true as const, mutated: true };
}

function simReplaceTarget(
  state: SimFocusState,
  expectedVersion: number,
  targetWorkIds: string[],
) {
  if (state.focusVersion !== expectedVersion) {
    return { ok: false as const, mutated: false };
  }
  const plan = planOperationalFocusReplace(state.selections, targetWorkIds);
  if (plan.noChange) {
    return { ok: true as const, mutated: false };
  }
  for (const id of plan.toRemove) state.selections.delete(id);
  for (const id of plan.toAdd) state.selections.add(id);
  state.events += plan.toRemove.length + plan.toAdd.length;
  state.focusVersion += 1;
  return { ok: true as const, mutated: true };
}

test("add focus writes atomic selection and event SQL with human provenance", async () => {
  const { sql, calls } = captureSql([
    { focus_version: 1, focus_event_id: "focus-event-1", no_change: false },
  ]);
  const result = await persistOperationalFocusSelectionAdd(sql, {
    ...humanCommandBase,
    engineeringWorkId: "work-1",
    focusEventId: "focus-event-1",
    selectionId: "focus-selection-1",
  });
  assert.equal(calls.length, 1);
  assertAddLockDependencies(calls[0].query);
  assertVersionGuardPrecedesMutations(calls[0].query);
  assert.match(calls[0].query, /INSERT INTO workspace_project_focus_events/);
  assert.match(calls[0].query, /INSERT INTO workspace_project_focus_selection/);
  assert.match(calls[0].query, /'selected'/);
  assert.equal(calls[0].params?.[6], "human");
  assert.deepEqual(result, { ok: true, focusEventId: "focus-event-1", focusVersion: 1 });
});

test("duplicate add is idempotent without fabricating a new event row", async () => {
  const { sql } = captureSql([
    { focus_version: 2, focus_event_id: null, no_change: true },
  ]);
  const result = await persistOperationalFocusSelectionAdd(sql, {
    ...humanCommandBase,
    engineeringWorkId: "work-1",
    expectedFocusVersion: 2,
    focusEventId: "focus-event-dup",
    selectionId: "focus-selection-dup",
  });
  assert.deepEqual(result, {
    ok: true,
    focusEventId: "focus-event-dup",
    focusVersion: 2,
    noChange: true,
  });
});

test("remove focus appends deselected event and requires current membership", async () => {
  const { sql, calls } = captureSql([
    { focus_version: 3, focus_event_id: "focus-event-remove", outcome: "applied" },
  ]);
  const result = await persistOperationalFocusSelectionRemove(sql, {
    ...humanCommandBase,
    engineeringWorkId: "work-1",
    expectedFocusVersion: 2,
    focusEventId: "focus-event-remove",
    selectionId: "unused",
  });
  assertVersionGuardPrecedesMutations(calls[0].query);
  assert.match(calls[0].query, /'deselected'/);
  assertRemoveLockDependencies(calls[0].query);
  assert.deepEqual(result, { ok: true, focusEventId: "focus-event-remove", focusVersion: 3 });
});

test("remove returns not_selected when work is not focused", async () => {
  const { sql } = captureSql([
    { focus_version: 2, focus_event_id: null, outcome: "not_selected" },
  ]);
  const result = await persistOperationalFocusSelectionRemove(sql, {
    ...humanCommandBase,
    engineeringWorkId: "work-1",
    focusEventId: "focus-event-miss",
    selectionId: "unused",
  });
  assert.deepEqual(result, { ok: false, reason: "not_selected" });
});

test("stale remove returns failure without SQL-side mutation path when lock misses", async () => {
  const { sql } = captureSql([]);
  const result = await persistOperationalFocusSelectionRemove(sql, {
    ...humanCommandBase,
    expectedFocusVersion: 99,
    engineeringWorkId: "work-1",
    focusEventId: "focus-event-stale",
    selectionId: "unused",
  });
  assert.deepEqual(result, { ok: false, reason: "not_found_or_stale" });
});

test("clear focus removes all current members with correlated batch deselection events", async () => {
  const { sql, calls } = captureSql([
    { focus_version: 4, focus_event_id: "batch-clear-work-a", no_change: false },
  ]);
  const result = await persistOperationalFocusClear(sql, {
    ...humanCommandBase,
    expectedFocusVersion: 3,
    batchId: "batch-clear",
  });
  assertVersionGuardPrecedesMutations(calls[0].query);
  assert.match(calls[0].query, /'clear'/);
  assert.match(calls[0].query, /DELETE FROM workspace_project_focus_selection/);
  assertClearLockDependencies(calls[0].query);
  assert.equal(result.ok, true);
});

test("empty clear is a no-change result without version increment semantics in SQL", async () => {
  const { sql, calls } = captureSql([
    { focus_version: 5, focus_event_id: null, no_change: true },
  ]);
  const result = await persistOperationalFocusClear(sql, {
    ...humanCommandBase,
    expectedFocusVersion: 5,
    batchId: "batch-empty",
  });
  assert.match(calls[0].query, /noop_empty/);
  assert.deepEqual(result, {
    ok: true,
    focusEventId: "batch-empty",
    focusVersion: 5,
    noChange: true,
  });
});

test("replace focus uses target-set diff with work locks before project lock", async () => {
  const { sql, calls } = captureSql([
    { focus_version: 6, focus_event_id: "focus-event-replace-add", no_change: false },
  ]);
  const result = await persistOperationalFocusReplace(sql, {
    ...humanCommandBase,
    expectedFocusVersion: 5,
    batchId: "batch-replace",
    targetWorkIds: ["work-new"],
    addItems: [
      {
        engineeringWorkId: "work-new",
        focusEventId: "focus-event-replace-add",
        selectionId: "focus-selection-replace-add",
      },
    ],
  });
  assertReplaceLockDependencies(calls[0].query);
  assertVersionGuardPrecedesMutations(calls[0].query);
  assert.match(calls[0].query, /'replace'/);
  assert.match(calls[0].query, /normalized_target/);
  assert.equal(result.ok, true);
});

test("replace plan rejects duplicate target Work IDs", () => {
  assert.throws(
    () => normalizeOperationalFocusTargetWorkIds(["work-a", "work-a"]),
    /Duplicate Work ID/,
  );
});

test("replace plan treats identical target membership as no-change", () => {
  const plan = planOperationalFocusReplace(["work-a", "work-b"], ["work-b", "work-a"]);
  assert.equal(plan.noChange, true);
  assert.deepEqual(plan.toRemove, []);
  assert.deepEqual(plan.toAdd, []);
  assert.deepEqual(plan.unchanged, ["work-a", "work-b"]);
});

test("replace plan removes only departed members and adds only new members", () => {
  const plan = planOperationalFocusReplace(["work-a", "work-b"], ["work-b", "work-c"]);
  assert.deepEqual(plan.toRemove, ["work-a"]);
  assert.deepEqual(plan.toAdd, ["work-c"]);
  assert.deepEqual(plan.unchanged, ["work-b"]);
  assert.equal(plan.noChange, false);
});

test("replace plan supports addition-only target expansion", () => {
  const plan = planOperationalFocusReplace(["work-a"], ["work-a", "work-b"]);
  assert.deepEqual(plan.toRemove, []);
  assert.deepEqual(plan.toAdd, ["work-b"]);
});

test("replace plan supports removal-only target reduction", () => {
  const plan = planOperationalFocusReplace(["work-a", "work-b"], ["work-a"]);
  assert.deepEqual(plan.toRemove, ["work-b"]);
  assert.deepEqual(plan.toAdd, []);
});

test("replace plan supports mixed replacement without touching unchanged members", () => {
  const plan = planOperationalFocusReplace(["work-a", "work-b", "work-c"], ["work-b", "work-d"]);
  assert.deepEqual(plan.unchanged, ["work-b"]);
  assert.deepEqual(plan.toRemove, ["work-a", "work-c"]);
  assert.deepEqual(plan.toAdd, ["work-d"]);
});

test("stale add returns not_found_or_stale with zero-row SQL result", async () => {
  const { sql, calls } = captureSql([]);
  const result = await persistOperationalFocusSelectionAdd(sql, {
    ...humanCommandBase,
    expectedFocusVersion: 99,
    engineeringWorkId: "work-1",
    focusEventId: "focus-event-stale",
    selectionId: "focus-selection-stale",
  });
  assertVersionGuardPrecedesMutations(calls[0].query);
  assert.deepEqual(result, { ok: false, reason: "not_found_or_stale" });
});

test("in-memory simulator: stale commands mutate nothing", () => {
  const state: SimFocusState = { focusVersion: 2, selections: new Set(["work-a"]), events: 1 };
  const snapshot = {
    focusVersion: state.focusVersion,
    selections: new Set(state.selections),
    events: state.events,
  };
  assert.deepEqual(simAdd(state, 1, "work-b"), { ok: false, mutated: false });
  assert.deepEqual(simRemove(state, 1, "work-a"), { ok: false, mutated: false, reason: "stale" });
  assert.deepEqual(simClear(state, 1), { ok: false, mutated: false });
  assert.deepEqual(simReplaceTarget(state, 1, ["work-b"]), { ok: false, mutated: false });
  assert.equal(state.focusVersion, snapshot.focusVersion);
  assert.deepEqual(state.selections, snapshot.selections);
  assert.equal(state.events, snapshot.events);
});

test("in-memory simulator: replace applies one batch target-set decision atomically", () => {
  const state: SimFocusState = { focusVersion: 0, selections: new Set(["work-a"]), events: 1 };
  assert.deepEqual(simReplaceTarget(state, 0, ["work-b"]), { ok: true, mutated: true });
  assert.deepEqual([...state.selections], ["work-b"]);
  assert.equal(state.focusVersion, 1);
  assert.equal(state.events, 3);
});

test("in-memory simulator: identical replace target is no-change", () => {
  const state: SimFocusState = { focusVersion: 2, selections: new Set(["work-a"]), events: 1 };
  assert.deepEqual(simReplaceTarget(state, 2, ["work-a"]), { ok: true, mutated: false });
  assert.equal(state.focusVersion, 2);
  assert.equal(state.events, 1);
});

test("system invalidation records invalidated effect linked to lifecycle cause", async () => {
  const { sql, calls } = captureSql([{ focus_event_id: "focus-invalidation-1" }]);
  const result = await persistOperationalFocusInvalidationForWork(sql, {
    projectId: "project-1",
    engineeringWorkId: "work-1",
    focusEventId: "focus-invalidation-1",
    batchId: "batch-invalidation",
    lifecycleEventId: "history-completion-1",
    invalidationRuleReference: "engineering-work-lifecycle:completed",
    rationale: "Engineering Work completed; focus selection ended by system rule.",
  });
  assert.match(calls[0].query, /'invalidated'/);
  assert.match(calls[0].query, /based_on_event_id/);
  assert.match(calls[0].query, /system_rule/);
  assert.deepEqual(result, { invalidated: true, focusEventId: "focus-invalidation-1" });
});

test("invalidation does not run when work was not selected", async () => {
  const { sql } = captureSql([]);
  const result = await persistOperationalFocusInvalidationForWork(sql, {
    projectId: "project-1",
    engineeringWorkId: "work-1",
    focusEventId: "focus-invalidation-none",
    batchId: "batch-none",
    lifecycleEventId: "history-completion-1",
    invalidationRuleReference: "engineering-work-lifecycle:completed",
    rationale: "No selection existed.",
  });
  assert.deepEqual(result, { invalidated: false, focusEventId: null });
});

test("focusedWorkIdSet exposes membership without ordering semantics", () => {
  const ids = focusedWorkIdSet({
    currentSelections: [
      selection({ engineeringWorkId: "b" }),
      selection({ engineeringWorkId: "a" }),
    ],
  });
  assert.equal(ids.has("a"), true);
  assert.equal(ids.has("b"), true);
  assert.equal(ids.size, 2);
});

test("UI semantic contract: focus marker uses structural accent not lifecycle StateLabel", () => {
  const markerPath = fileURLToPath(
    new URL("../../components/workspace/operational-focus-marker.tsx", import.meta.url),
  );
  const source = readFileSync(markerPath, "utf8");
  assert.doesNotMatch(source, /StateLabel/);
  assert.doesNotMatch(source, /role="actionable"/);
  assert.match(source, /Focused/);
  assert.match(source, /aria-label=/);
});

test("clear SQL forces locked_works consumption before project/selection mutation", async () => {
  const { sql, calls } = captureSql([
    { focus_version: 5, focus_event_id: null, no_change: true },
  ]);
  await persistOperationalFocusClear(sql, {
    ...humanCommandBase,
    expectedFocusVersion: 5,
    batchId: "batch-empty",
  });
  assertClearLockDependencies(calls[0].query);
});

test("completion SQL forces locked_project consumption before focus mutation", () => {
  const source = readFileSync(
    fileURLToPath(new URL("./engineering-work-history-persistence.ts", import.meta.url)),
    "utf8",
  );
  const completionMatch = source.match(
    /persistEngineeringWorkCompletionAndHistory[\s\S]*?sql\.query\(\s*`([\s\S]*?)`/,
  );
  assert.ok(completionMatch, "expected completion SQL template");
  assertCompletionLockDependencies(completionMatch[1]);
});

test("add/remove/replace SQL lock CTEs are consumed by downstream mutation CTEs", async () => {
  const addCapture = captureSql([
    { focus_version: 1, focus_event_id: "focus-event-1", no_change: false },
  ]);
  await persistOperationalFocusSelectionAdd(addCapture.sql, {
    ...humanCommandBase,
    engineeringWorkId: "work-1",
    focusEventId: "focus-event-1",
    selectionId: "focus-selection-1",
  });
  assertAddLockDependencies(addCapture.calls[0].query);

  const removeCapture = captureSql([
    { focus_version: 3, focus_event_id: "focus-event-remove", outcome: "applied" },
  ]);
  await persistOperationalFocusSelectionRemove(removeCapture.sql, {
    ...humanCommandBase,
    engineeringWorkId: "work-1",
    expectedFocusVersion: 2,
    focusEventId: "focus-event-remove",
    selectionId: "unused",
  });
  assertRemoveLockDependencies(removeCapture.calls[0].query);

  const replaceCapture = captureSql([
    { focus_version: 6, focus_event_id: "focus-event-replace-add", no_change: false },
  ]);
  await persistOperationalFocusReplace(replaceCapture.sql, {
    ...humanCommandBase,
    expectedFocusVersion: 5,
    batchId: "batch-replace",
    targetWorkIds: ["work-new"],
    addItems: [
      {
        engineeringWorkId: "work-new",
        focusEventId: "focus-event-replace-add",
        selectionId: "focus-selection-replace-add",
      },
    ],
  });
  assertReplaceLockDependencies(replaceCapture.calls[0].query);
});

test("operational projection uses same eligibility helper as selection projection", () => {
  assert.equal(isOperationalFocusProjected("active", "in_review"), true);
  assert.equal(isOperationalFocusProjected("paused", "active"), false);
});
