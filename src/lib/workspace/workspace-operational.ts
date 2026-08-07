export const CONTINUATION_DISPLAY_LIMIT = 3;
export const ATTENTION_DISPLAY_LIMIT = 3;

export type ContinuationSource = {
  id: string;
  title: string;
  summary: string;
  workflow: string;
  state: string;
  currentNextAction: string;
  condition: string | null;
  updatedAt: Date;
  projectId: string;
  projectName: string;
  projectSlug: string;
  projectStatus: string;
  defectNextInvestigation: string | null;
  defectValidationTarget: string | null;
  defectContextComplete: boolean;
};

export type WorkspaceContinuationCandidate = {
  project: { id: string; name: string; slug: string; status: string };
  artifact: { id: string; title: string; workflow: string; state: string };
  purpose: string;
  nextAction: string;
  defectContext: null | {
    nextInvestigation: string;
    validationTarget: string;
  };
  destination: string;
  reason: string;
  modifiedAt: Date;
};

export type WorkspaceContinuationProjection = {
  mode: "none" | "single" | "ambiguous";
  totalCandidates: number;
  candidates: WorkspaceContinuationCandidate[];
};

export type WorkspaceAttentionItem = {
  project: { id: string; name: string; slug: string };
  artifact: {
    kind: "engineering_work" | "milestone";
    id: string;
    title: string;
  };
  condition: string;
  explanation: string | null;
  destination: string;
};

export type WorkspaceAttentionProjection = {
  total: number;
  items: WorkspaceAttentionItem[];
};

const hasText = (value: string | null | undefined) => Boolean(value?.trim());

export function isContinuationCandidate(source: ContinuationSource) {
  return (
    ["active", "testing"].includes(source.projectStatus) &&
    ["active", "in_review"].includes(source.state) &&
    hasText(source.title) &&
    hasText(source.summary) &&
    hasText(source.currentNextAction) &&
    !hasText(source.condition) &&
    hasText(source.projectSlug) &&
    (source.workflow !== "defect" || source.defectContextComplete)
  );
}

export function continuationReason(source: ContinuationSource) {
  const workPosition =
    source.state === "in_review" ? "Engineering Work is in review" : "Active Engineering Work";
  const projectPosition =
    source.projectStatus === "testing" ? "a testing Project" : "an active Project";

  return `${workPosition} in ${projectPosition} with an explicit current next action.`;
}

export function toConditionAttention(
  source: ContinuationSource,
  explanation: string | null = null,
): WorkspaceAttentionItem {
  if (!hasText(source.condition)) {
    throw new Error("Condition attention requires a recorded condition.");
  }

  return {
    project: { id: source.projectId, name: source.projectName, slug: source.projectSlug },
    artifact: { kind: "engineering_work", id: source.id, title: source.title },
    condition: source.condition!.trim(),
    explanation: explanation?.trim() || null,
    destination: `/workspace/projects/${source.projectSlug}/engineering-work/${source.id}`,
  };
}

export function toContinuationCandidate(
  source: ContinuationSource,
): WorkspaceContinuationCandidate {
  if (!isContinuationCandidate(source)) {
    throw new Error("Cannot project ineligible Engineering Work as continuation.");
  }

  return {
    project: {
      id: source.projectId,
      name: source.projectName,
      slug: source.projectSlug,
      status: source.projectStatus,
    },
    artifact: {
      id: source.id,
      title: source.title.trim(),
      workflow: source.workflow,
      state: source.state,
    },
    purpose: source.summary.trim(),
    nextAction: source.currentNextAction.trim(),
    defectContext:
      source.workflow === "defect"
        ? {
            nextInvestigation: source.defectNextInvestigation!.trim(),
            validationTarget: source.defectValidationTarget!.trim(),
          }
        : null,
    destination: `/workspace/projects/${source.projectSlug}/engineering-work/${source.id}`,
    reason: continuationReason(source),
    modifiedAt: source.updatedAt,
  };
}

function compareForStablePresentation(a: ContinuationSource, b: ContinuationSource) {
  const recency = b.updatedAt.getTime() - a.updatedAt.getTime();
  return recency || a.id.localeCompare(b.id);
}

/**
 * Pure contract projection used by tests and fixtures. Runtime queries enforce
 * the same eligibility before applying their bounded LIMIT.
 */
export function projectContinuation(
  sources: ContinuationSource[],
  displayLimit = CONTINUATION_DISPLAY_LIMIT,
): WorkspaceContinuationProjection {
  const eligible = sources.filter(isContinuationCandidate).sort(compareForStablePresentation);
  return projectionFromEligibleSources(eligible.slice(0, displayLimit), eligible.length);
}

export function projectionFromEligibleSources(
  boundedSources: ContinuationSource[],
  totalCandidates: number,
): WorkspaceContinuationProjection {
  const candidates = boundedSources.map(toContinuationCandidate);
  return {
    mode: totalCandidates === 0 ? "none" : totalCandidates === 1 ? "single" : "ambiguous",
    totalCandidates,
    candidates,
  };
}
