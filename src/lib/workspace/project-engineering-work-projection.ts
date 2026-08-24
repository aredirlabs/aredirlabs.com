import {
  ENGINEERING_WORK_STATE_LABELS,
  ENGINEERING_WORK_STATES,
  type EngineeringWorkState,
} from "@/lib/workspace/engineering-work";

/**
 * PROJECT-UX-007 Package 3 — bounded Engineering Work projection.
 *
 * Presentation-only. Membership and order are not Operational Focus,
 * continuation, attention, priority, recommendation, recency, or inferred
 * importance. Omission from the bounded set conveys no operational meaning.
 */
export const PROJECT_ENGINEERING_WORK_PROJECTION_LIMIT = 5;

export type EngineeringWorkIdentity = {
  id: string;
};

export type EngineeringWorkLifecycleSource = EngineeringWorkIdentity & {
  state: string;
};

export type BoundedEngineeringWorkProjection<T extends EngineeringWorkIdentity> = {
  total: number;
  bound: number;
  items: T[];
  omitted: number;
};

export type EngineeringWorkLifecycleGroup<T extends EngineeringWorkLifecycleSource> = {
  state: string;
  label: string;
  items: T[];
};

export function projectEngineeringWorkInventoryHref(projectSlug: string) {
  return `/workspace/projects/${projectSlug}/engineering-work`;
}

export function projectEngineeringWorkDetailHref(
  projectSlug: string,
  workId: string,
) {
  return `/workspace/projects/${projectSlug}/engineering-work/${workId}`;
}

/**
 * Deterministic presentation compare: Engineering Work identifier,
 * lexicographic ascending. Identifier order is identity-stable and does not
 * encode lifecycle, focus, continuation, attention, priority, recency, or
 * importance. Work IDs are random UUIDs (or stable seed keys), not time-ordered.
 */
export function compareEngineeringWorkIdentity(
  a: EngineeringWorkIdentity,
  b: EngineeringWorkIdentity,
) {
  return a.id.localeCompare(b.id);
}

export function sortEngineeringWorkForPresentation<T extends EngineeringWorkIdentity>(
  items: readonly T[],
): T[] {
  return [...items].sort(compareEngineeringWorkIdentity);
}

/**
 * Bounded projection membership: the first `bound` records of the
 * identifier-sorted complete Project-owned set. The bound and complete
 * total are returned so the surface can disclose both.
 */
export function projectBoundedEngineeringWork<T extends EngineeringWorkIdentity>(
  items: readonly T[],
  bound: number = PROJECT_ENGINEERING_WORK_PROJECTION_LIMIT,
): BoundedEngineeringWorkProjection<T> {
  const ordered = sortEngineeringWorkForPresentation(items);
  const itemsInBound = ordered.slice(0, bound);

  return {
    total: ordered.length,
    bound,
    items: itemsInBound,
    omitted: Math.max(0, ordered.length - itemsInBound.length),
  };
}

/**
 * Complete-inventory grouping by the Work record's own lifecycle state.
 * Group sequence follows the canonical ENGINEERING_WORK_STATES enum
 * (taxonomy of existing Work authority, not a ranking of importance).
 * Within each group, identifier presentation order is preserved.
 * Empty groups are omitted. Unknown states, if present, follow known groups.
 */
export function groupEngineeringWorkByLifecycle<
  T extends EngineeringWorkLifecycleSource,
>(items: readonly T[]): EngineeringWorkLifecycleGroup<T>[] {
  const ordered = sortEngineeringWorkForPresentation(items);
  const byState = new Map<string, T[]>();

  for (const item of ordered) {
    const existing = byState.get(item.state);
    if (existing) {
      existing.push(item);
    } else {
      byState.set(item.state, [item]);
    }
  }

  const groups: EngineeringWorkLifecycleGroup<T>[] = [];

  for (const state of ENGINEERING_WORK_STATES) {
    const groupItems = byState.get(state);
    if (!groupItems?.length) continue;
    groups.push({
      state,
      label: ENGINEERING_WORK_STATE_LABELS[state],
      items: groupItems,
    });
    byState.delete(state);
  }

  for (const [state, groupItems] of byState) {
    groups.push({
      state,
      label: isEngineeringWorkStateLabel(state)
        ? ENGINEERING_WORK_STATE_LABELS[state]
        : state,
      items: groupItems,
    });
  }

  return groups;
}

function isEngineeringWorkStateLabel(
  state: string,
): state is EngineeringWorkState {
  return ENGINEERING_WORK_STATES.includes(state as EngineeringWorkState);
}
