export type FocusSelectionSource = {
  engineeringWorkId: string;
  title: string;
  state: string;
  currentNextAction: string | null;
  condition: string | null;
  selectedAt: Date;
};

export type ProjectOperationalFocusProjection = {
  /** Valid current selections regardless of Project operating posture. */
  currentSelections: FocusSelectionSource[];
  /** Query-time operational focus derived from selections and eligibility rules. */
  operationalFocus: FocusSelectionSource[];
  mode: "none" | "single" | "plural";
  /** Safe singleton Project next-step projection; null for zero or multiple focused items. */
  singletonNextStep: string | null;
  /** Plural focused-Work next actions when mode is plural. */
  pluralNextActions: Array<{
    engineeringWorkId: string;
    title: string;
    nextAction: string;
  }>;
  /** Selections exist but projection is suppressed (e.g. paused Project). */
  projectionSuppressed: boolean;
};

const hasText = (value: string | null | undefined) => Boolean(value?.trim());

export function isFocusSelectionEligible(
  projectStatus: string,
  workState: string,
) {
  return (
    ["active", "testing"].includes(projectStatus) &&
    ["active", "in_review"].includes(workState)
  );
}

export function isOperationalFocusProjected(
  projectStatus: string,
  workState: string,
) {
  return isFocusSelectionEligible(projectStatus, workState);
}

function compareForDisplay(a: FocusSelectionSource, b: FocusSelectionSource) {
  const titleOrder = a.title.localeCompare(b.title);
  return titleOrder || a.engineeringWorkId.localeCompare(b.engineeringWorkId);
}

/**
 * Deterministic display order only. Focus remains an unordered set; sort order
 * must never imply ranking, priority, or primary focus.
 */
export function sortFocusSelectionsForDisplay(
  selections: FocusSelectionSource[],
) {
  return [...selections].sort(compareForDisplay);
}

export function projectOperationalFocusProjection(input: {
  projectStatus: string;
  selections: FocusSelectionSource[];
}): ProjectOperationalFocusProjection {
  const currentSelections = sortFocusSelectionsForDisplay(input.selections);
  const operatingProject = ["active", "testing"].includes(input.projectStatus);
  const operationalFocus = operatingProject
    ? currentSelections.filter((item) =>
        isOperationalFocusProjected(input.projectStatus, item.state),
      )
    : [];

  const pluralNextActions =
    operationalFocus.length > 1
      ? operationalFocus
          .filter((item) => hasText(item.currentNextAction))
          .map((item) => ({
            engineeringWorkId: item.engineeringWorkId,
            title: item.title.trim(),
            nextAction: item.currentNextAction!.trim(),
          }))
      : [];

  let singletonNextStep: string | null = null;
  if (operationalFocus.length === 1) {
    const nextAction = operationalFocus[0].currentNextAction?.trim();
    singletonNextStep = nextAction || null;
  }

  return {
    currentSelections,
    operationalFocus,
    mode:
      operationalFocus.length === 0
        ? "none"
        : operationalFocus.length === 1
          ? "single"
          : "plural",
    singletonNextStep,
    pluralNextActions,
    projectionSuppressed:
      currentSelections.length > 0 && operationalFocus.length === 0,
  };
}

export function focusedWorkIdSet(
  projection: Pick<ProjectOperationalFocusProjection, "currentSelections">,
) {
  return new Set(
    projection.currentSelections.map((item) => item.engineeringWorkId),
  );
}
