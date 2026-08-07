import assert from "node:assert/strict";
import test from "node:test";

import {
  CONTINUATION_DISPLAY_LIMIT,
  isContinuationCandidate,
  projectContinuation,
  toConditionAttention,
  type ContinuationSource,
} from "./workspace-operational";

function source(overrides: Partial<ContinuationSource> = {}): ContinuationSource {
  return {
    id: "work-1",
    title: "Ship the operational Workspace",
    summary: "Make Workspace continuation truthful and useful.",
    workflow: "delivery",
    state: "active",
    currentNextAction: "Validate the bounded projection",
    condition: null,
    updatedAt: new Date("2026-08-01T00:00:00.000Z"),
    projectId: "project-1",
    projectName: "AredirLabs.com",
    projectSlug: "aredirlabs-com",
    projectStatus: "active",
    defectNextInvestigation: null,
    defectValidationTarget: null,
    defectContextComplete: false,
    ...overrides,
  };
}

test("Active and In Review work in operating Projects qualify", () => {
  assert.equal(isContinuationCandidate(source()), true);
  assert.equal(isContinuationCandidate(source({ state: "in_review" })), true);
  assert.equal(isContinuationCandidate(source({ projectStatus: "testing" })), true);
});

test("Proposed, terminal, inactive, blank, and conditioned work are excluded", () => {
  for (const state of ["proposed", "completed", "closed", "cancelled", "superseded"]) {
    assert.equal(isContinuationCandidate(source({ state })), false);
  }
  for (const projectStatus of ["planning", "paused", "archived"]) {
    assert.equal(isContinuationCandidate(source({ projectStatus })), false);
  }
  assert.equal(isContinuationCandidate(source({ currentNextAction: "   " })), false);
  assert.equal(isContinuationCandidate(source({ summary: "" })), false);
  assert.equal(isContinuationCandidate(source({ condition: "Blocked by database access" })), false);
});

test("one eligible record becomes the singular continuation with Project context", () => {
  const projection = projectContinuation([source()]);

  assert.equal(projection.mode, "single");
  assert.equal(projection.totalCandidates, 1);
  assert.equal(projection.candidates[0].project.name, "AredirLabs.com");
  assert.equal(
    projection.candidates[0].destination,
    "/workspace/projects/aredirlabs-com/engineering-work/work-1",
  );
});

test("several eligible records remain ambiguous and bounded", () => {
  const records = Array.from({ length: 6 }, (_, index) =>
    source({
      id: `work-${index}`,
      updatedAt: new Date(`2026-08-0${index + 1}T00:00:00.000Z`),
    }),
  );
  const projection = projectContinuation(records);

  assert.equal(projection.mode, "ambiguous");
  assert.equal(projection.totalCandidates, 6);
  assert.equal(projection.candidates.length, CONTINUATION_DISPLAY_LIMIT);
});

test("conditioned work becomes Attention while other actionable work continues", () => {
  const blocked = source({
    id: "blocked-work",
    condition: "Waiting for approved test access",
  });
  const actionable = source({ id: "actionable-work" });
  const projection = projectContinuation([blocked, actionable]);
  const attention = toConditionAttention(blocked, "Access is required before validation can proceed.");

  assert.equal(projection.mode, "single");
  assert.equal(projection.candidates[0].artifact.id, "actionable-work");
  assert.equal(attention.condition, "Waiting for approved test access");
  assert.equal(attention.artifact.kind, "engineering_work");
});

test("Defect parent action remains primary and investigation remains supporting context", () => {
  const defect = source({
    workflow: "defect",
    currentNextAction: "Reproduce the failure with production-like headers",
    defectContextComplete: true,
    defectNextInvestigation: "Compare the proxy header size before and after sign-in",
    defectValidationTarget: "Authenticated navigation completes without HTTP 431",
  });
  const candidate = projectContinuation([defect]).candidates[0];

  assert.equal(candidate.nextAction, "Reproduce the failure with production-like headers");
  assert.equal(
    candidate.defectContext?.nextInvestigation,
    "Compare the proxy header size before and after sign-in",
  );
  assert.equal(isContinuationCandidate({ ...defect, defectContextComplete: false }), false);
});

test("Proposed-only and terminal-only inputs produce honest absence", () => {
  assert.equal(projectContinuation([source({ state: "proposed" })]).mode, "none");
  assert.equal(projectContinuation([source({ state: "completed" })]).mode, "none");
});

test("updatedAt orders eligible peers but cannot promote newer Proposed work", () => {
  const olderActive = source({ id: "older-active", updatedAt: new Date("2026-01-01") });
  const newerProposed = source({
    id: "newer-proposed",
    state: "proposed",
    updatedAt: new Date("2026-08-07"),
  });
  const projection = projectContinuation([newerProposed, olderActive]);

  assert.equal(projection.mode, "single");
  assert.equal(projection.candidates[0].artifact.id, "older-active");
});

test("hundreds-scale fixtures still return only the bounded projection", () => {
  const records = Array.from({ length: 500 }, (_, index) =>
    source({ id: `scale-${index}`, updatedAt: new Date(1_700_000_000_000 + index) }),
  );
  const projection = projectContinuation(records);

  assert.equal(projection.totalCandidates, 500);
  assert.equal(projection.candidates.length, 3);
});
