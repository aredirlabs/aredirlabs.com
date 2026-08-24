export type OperationalFocusReplacePlan = {
  toRemove: string[];
  toAdd: string[];
  unchanged: string[];
  noChange: boolean;
};

export function normalizeOperationalFocusTargetWorkIds(workIds: string[]): string[] {
  const normalized: string[] = [];
  const seen = new Set<string>();
  for (const raw of workIds) {
    const id = raw.trim();
    if (!id) {
      throw new Error("Target Work ID cannot be blank.");
    }
    if (seen.has(id)) {
      throw new Error("Duplicate Work ID in replace target set.");
    }
    seen.add(id);
    normalized.push(id);
  }
  return normalized;
}

export function planOperationalFocusReplace(
  currentSelection: Iterable<string>,
  targetWorkIds: string[],
): OperationalFocusReplacePlan {
  const current = new Set(currentSelection);
  const target = new Set(normalizeOperationalFocusTargetWorkIds(targetWorkIds));
  const toRemove = [...current].filter((id) => !target.has(id)).sort();
  const toAdd = [...target].filter((id) => !current.has(id)).sort();
  const unchanged = [...target].filter((id) => current.has(id)).sort();
  return {
    toRemove,
    toAdd,
    unchanged,
    noChange: toRemove.length === 0 && toAdd.length === 0,
  };
}
