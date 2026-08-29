/**
 * EXPERIMENTAL PROTOTYPE — Aredir Operating Field.
 *
 * Pure derivations for the disposable `/workspace/field` experience experiment.
 * Nothing here persists state, defines lifecycle authority, or competes with
 * canonical domain modules. Every projection is either a restatement of an
 * authoritative field or one of the instrumentation projections explicitly
 * permitted by PROJECT-UX-004 §15 (lifecycle distribution, attention
 * concentration, evidence completeness, continuation mode).
 *
 * Prohibited by that same section and therefore absent here: activity inferred
 * from `updatedAt`, velocity, health or risk scores, percentage-complete for
 * categorical lifecycle, and any ranking of Engineering Work.
 *
 * This module is safe to delete with the rest of the prototype.
 */

import {
  ENGINEERING_WORK_STATE_LABELS,
  ENGINEERING_WORK_STATES,
  type EngineeringWorkReferenceStatus,
  type EngineeringWorkState,
} from "@/lib/workspace/engineering-work";
import { getEngineeringWorkStateRole } from "@/lib/workspace/operational-role-mapping";

export type FieldRole = "actionable" | "attention" | "settled" | "inert" | "neutral";

export type FieldEvidence = {
  id: string;
  repository: string;
  sourceLocation: string;
  artifactClass: string;
  authority: string;
  referenceStatus: EngineeringWorkReferenceStatus;
  artifactIdentifier: string | null;
  note: string | null;
  lastReviewedAt: string | null;
};

export type FieldHistoryEvent = {
  id: string;
  kind: string;
  actionType: string;
  priorState: string | null;
  resultingState: string | null;
  previousNextAction: string | null;
  resultingNextAction: string | null;
  previousOutcome: string | null;
  resultingOutcome: string | null;
  previousCondition: string | null;
  resultingCondition: string | null;
  decision: string | null;
  rationale: string | null;
  actionActorType: string;
  actionActorIdentifier: string;
  decisionActorType: string | null;
  decisionActorIdentifier: string | null;
  decisionRole: string | null;
  authorityType: string | null;
  occurredAt: string;
};

export type FieldKnowledge = {
  id: string;
  title: string;
  knowledgeClass: string;
  authorityLocation: string;
  href: string;
};

export type FieldWork = {
  id: string;
  projectId: string;
  projectSlug: string;
  projectName: string;
  title: string;
  summary: string;
  type: string;
  workflow: string;
  state: EngineeringWorkState;
  currentNextAction: string | null;
  currentOutcome: string | null;
  condition: string | null;
  conditionRationale: string | null;
  finalDisposition: string | null;
  priority: string | null;
  version: number;
  createdAt: string;
  updatedAt: string;
  /** Authoritative: a current Operational Focus selection exists for this Work. */
  isFocused: boolean;
  /** Derived projection: passes the canonical continuation eligibility predicate. */
  continuationEligible: boolean;
  evidence: FieldEvidence[];
  history: FieldHistoryEvent[];
  knowledge: FieldKnowledge[];
  defectContextComplete: boolean | null;
};

export type FieldProject = {
  id: string;
  slug: string;
  name: string;
  status: string;
  stage: string;
  category: string | null;
  description: string | null;
  targetDate: string | null;
  focusVersion: number;
  /** Authoritative focus selections, unordered. */
  focusedWorkIds: string[];
  /** Suppressed when the Project is not in an operating posture. */
  focusProjectionSuppressed: boolean;
  milestones: Array<{ id: string; title: string; status: string; targetDate: string | null }>;
};

export type FieldContinuation = {
  mode: "none" | "single" | "ambiguous";
  totalCandidates: number;
  candidates: Array<{
    workId: string;
    projectSlug: string;
    projectName: string;
    title: string;
    nextAction: string;
    purpose: string;
    reason: string;
  }>;
};

export type FieldAttention = {
  total: number;
  items: Array<{
    workId: string | null;
    projectSlug: string;
    projectName: string;
    subject: string;
    condition: string;
    explanation: string | null;
  }>;
};

export type FieldSnapshot = {
  /** ISO timestamp of the read, so the operator knows how current the field is. */
  observedAt: string;
  operator: string | null;
  projects: FieldProject[];
  work: FieldWork[];
  continuation: FieldContinuation;
  attention: FieldAttention;
};

/* ------------------------------------------------------------------ */
/* Lifecycle mechanism                                                 */
/* ------------------------------------------------------------------ */

/**
 * Transitions the running system can actually perform today.
 *
 * `proposed -> active` is activation, `active <-> in_review` is the Phase B
 * transition set in engineering-work-history-persistence.ts, and completion
 * runs from either operating state. Every other edge in
 * ENGINEERING-WORK-LIFECYCLE.md is documented but not implemented, and the
 * prototype draws those as unlit so the interface never implies an authority
 * the system does not have.
 */
export const FIELD_IMPLEMENTED_TRANSITIONS: ReadonlyArray<
  readonly [EngineeringWorkState, EngineeringWorkState]
> = [
  ["proposed", "active"],
  ["active", "in_review"],
  ["in_review", "active"],
  ["active", "completed"],
  ["in_review", "completed"],
];

export const FIELD_DOCUMENTED_TRANSITIONS: ReadonlyArray<
  readonly [EngineeringWorkState, EngineeringWorkState]
> = [
  ["proposed", "cancelled"],
  ["proposed", "superseded"],
  ["active", "cancelled"],
  ["active", "superseded"],
  ["in_review", "cancelled"],
  ["in_review", "superseded"],
  ["completed", "closed"],
  ["completed", "superseded"],
];

export function isImplementedTransition(
  from: EngineeringWorkState,
  to: EngineeringWorkState,
) {
  return FIELD_IMPLEMENTED_TRANSITIONS.some(
    ([edgeFrom, edgeTo]) => edgeFrom === from && edgeTo === to,
  );
}

/** States this record can currently reach through implemented behaviour. */
export function reachableStates(from: EngineeringWorkState) {
  return FIELD_IMPLEMENTED_TRANSITIONS.filter(([edgeFrom]) => edgeFrom === from).map(
    ([, edgeTo]) => edgeTo,
  );
}

export function stateRole(state: EngineeringWorkState): FieldRole {
  return getEngineeringWorkStateRole(state);
}

export function stateLabel(state: EngineeringWorkState) {
  return ENGINEERING_WORK_STATE_LABELS[state];
}

/* ------------------------------------------------------------------ */
/* Identity                                                            */
/* ------------------------------------------------------------------ */

const DESIGNATOR = /^([A-Z][A-Z0-9]*(?:-[A-Z0-9]+)*-\d{3})\b/;

/**
 * Many Aredir records carry a human designator at the head of the title
 * ("EDITOR-001 — ..."). Surfacing it is presentation only; the authoritative
 * identity remains the record id, which the instrument also shows.
 */
export function workDesignator(work: Pick<FieldWork, "title">) {
  const match = DESIGNATOR.exec(work.title.trim());
  return match ? match[1] : null;
}

/** Title with a leading designator and separator removed, for paired display. */
export function workTitleBody(work: Pick<FieldWork, "title">) {
  const title = work.title.trim();
  const designator = workDesignator(work);
  if (!designator) return title;
  return title.slice(designator.length).replace(/^[\s—–:-]+/, "").trim() || title;
}

/* ------------------------------------------------------------------ */
/* Permitted instrumentation projections                               */
/* ------------------------------------------------------------------ */

export type LifecycleDistribution = Array<{
  state: EngineeringWorkState;
  label: string;
  role: FieldRole;
  count: number;
}>;

/** Lifecycle position counts. Categorical, never a completion percentage. */
export function lifecycleDistribution(work: FieldWork[]): LifecycleDistribution {
  return ENGINEERING_WORK_STATES.map((state) => ({
    state,
    label: stateLabel(state),
    role: stateRole(state),
    count: work.filter((item) => item.state === state).length,
  }));
}

/**
 * Evidence completeness across a set of records.
 *
 * Counts records carrying at least one repository reference, plus the
 * distribution of reference status. The Workspace is never the authority for a
 * referenced artifact body, so this measures references, never content.
 */
export function evidenceCompleteness(work: FieldWork[]) {
  const byStatus: Record<EngineeringWorkReferenceStatus, number> = {
    expected: 0,
    verified: 0,
    stale: 0,
    missing: 0,
  };

  for (const item of work) {
    for (const reference of item.evidence) {
      byStatus[reference.referenceStatus] += 1;
    }
  }

  return {
    records: work.length,
    recordsWithEvidence: work.filter((item) => item.evidence.length > 0).length,
    references: work.reduce((total, item) => total + item.evidence.length, 0),
    byStatus,
  };
}

/**
 * Provenance depth: how many records carry recorded lifecycle history.
 *
 * This is a completeness measure of the append-only history stream, not
 * activity. A record with no history has no recorded provenance, which the
 * instrument states plainly rather than hiding behind an empty timeline.
 */
export function provenanceCompleteness(work: FieldWork[]) {
  return {
    records: work.length,
    recordsWithHistory: work.filter((item) => item.history.length > 0).length,
    events: work.reduce((total, item) => total + item.history.length, 0),
  };
}

/* ------------------------------------------------------------------ */
/* The lifecycle manifold                                              */
/* ------------------------------------------------------------------ */

export type ManifoldColumn = {
  state: EngineeringWorkState;
  label: string;
  role: FieldRole;
  items: FieldWork[];
};

/**
 * Arranges Engineering Work by lifecycle state.
 *
 * Column position encodes the authoritative lifecycle state and nothing else.
 * Within a column, order is `id` ascending — a declared deterministic
 * presentation order, never priority, recency, or importance. Empty columns are
 * retained so absence stays visible.
 */
export function manifoldColumns(work: FieldWork[]): ManifoldColumn[] {
  return ENGINEERING_WORK_STATES.map((state) => ({
    state,
    label: stateLabel(state),
    role: stateRole(state),
    items: work
      .filter((item) => item.state === state)
      .sort((a, b) => a.id.localeCompare(b.id)),
  }));
}

export type ManifoldBand = {
  projectId: string;
  projectSlug: string;
  projectName: string;
  items: FieldWork[];
};

export type BandedManifoldColumn = ManifoldColumn & { bands: ManifoldBand[] };

/**
 * The same lifecycle columns, subdivided by owning Project.
 *
 * This is the portfolio reading of the manifold. The horizontal axis stays
 * identical to the Project altitude so descending narrows scope without moving
 * the axis; only the set of records changes. Band order follows the given
 * Project order, and within a band the same `id` ordering applies. Projects
 * with no records in a state produce no band rather than an empty placeholder,
 * but the column itself is always retained.
 */
export function bandedManifoldColumns(
  work: FieldWork[],
  projects: FieldProject[],
): BandedManifoldColumn[] {
  return manifoldColumns(work).map((column) => ({
    ...column,
    bands: projects
      .map((project) => ({
        projectId: project.id,
        projectSlug: project.slug,
        projectName: project.name,
        items: column.items.filter((item) => item.projectId === project.id),
      }))
      .filter((band) => band.items.length > 0),
  }));
}

/**
 * Sibling records grouped by lifecycle state, for lateral movement at the
 * Engineering Work altitude. Descending into one record does not discard the
 * Project population it came from.
 */
export function siblingGroups(work: FieldWork[]) {
  return manifoldColumns(work).filter((column) => column.items.length > 0);
}

/* ------------------------------------------------------------------ */
/* Channel independence                                               */
/* ------------------------------------------------------------------ */

export type FieldChannels = {
  focus: { workIds: string[]; suppressed: boolean };
  continuation: { workIds: string[]; mode: FieldContinuation["mode"] };
  attention: { workIds: string[]; total: number };
};

/**
 * Focus, continuation, and attention are three independently derived channels.
 * They are returned separately, never merged into one badge set, because they
 * answer three different questions and can legitimately disagree.
 */
export function fieldChannels(input: {
  project: FieldProject;
  work: FieldWork[];
  continuation: FieldContinuation;
  attention: FieldAttention;
}): FieldChannels {
  const projectWorkIds = new Set(input.work.map((item) => item.id));

  return {
    focus: {
      workIds: input.project.focusedWorkIds.filter((id) => projectWorkIds.has(id)),
      suppressed: input.project.focusProjectionSuppressed,
    },
    continuation: {
      workIds: input.continuation.candidates
        .map((candidate) => candidate.workId)
        .filter((id) => projectWorkIds.has(id)),
      mode: input.continuation.mode,
    },
    attention: {
      workIds: input.attention.items
        .map((item) => item.workId)
        .filter((id): id is string => Boolean(id) && projectWorkIds.has(id!)),
      total: input.attention.total,
    },
  };
}

/* ------------------------------------------------------------------ */
/* Provenance well                                                    */
/* ------------------------------------------------------------------ */

export type ProvenancePlane = {
  /** `0` is the authoritative present. Positive depth recedes into the past. */
  depth: number;
  authoritative: boolean;
  occurredAt: string | null;
  event: FieldHistoryEvent | null;
};

/**
 * Builds the depth series for one record: the authoritative present at depth 0,
 * then one plane per recorded history event receding backwards in time.
 *
 * The well is shallow when provenance is shallow. That is the honest reading,
 * and it is the point: the instrument shows how much of this record's past was
 * actually captured.
 */
export function provenancePlanes(work: Pick<FieldWork, "history">): ProvenancePlane[] {
  const ordered = [...work.history].sort(
    (a, b) => Date.parse(b.occurredAt) - Date.parse(a.occurredAt),
  );

  return [
    { depth: 0, authoritative: true, occurredAt: null, event: null },
    ...ordered.map((event, index) => ({
      depth: index + 1,
      authoritative: false,
      occurredAt: event.occurredAt,
      event,
    })),
  ];
}

/**
 * What was true at a historical plane, for the fields the history stream
 * actually records. Anything the event did not capture is reported as unknown
 * rather than back-filled from present state.
 */
export function historicalPosture(event: FieldHistoryEvent) {
  return {
    state: event.resultingState,
    nextAction: event.resultingNextAction,
    outcome: event.resultingOutcome,
    condition: event.resultingCondition,
    changedState:
      Boolean(event.priorState) && event.priorState !== event.resultingState,
    changedNextAction: event.previousNextAction !== event.resultingNextAction,
  };
}

/* ------------------------------------------------------------------ */
/* Field selection helpers                                            */
/* ------------------------------------------------------------------ */

export function workForProject(snapshot: FieldSnapshot, projectId: string) {
  return snapshot.work.filter((item) => item.projectId === projectId);
}

export function findProject(snapshot: FieldSnapshot, slug: string | null) {
  if (!slug) return null;
  return snapshot.projects.find((project) => project.slug === slug) ?? null;
}

export function findWork(snapshot: FieldSnapshot, workId: string | null) {
  if (!workId) return null;
  return snapshot.work.find((item) => item.id === workId) ?? null;
}

export const FIELD_STATE_ORDER = ENGINEERING_WORK_STATES;

/* ------------------------------------------------------------------ */
/* Presentation-route contract (disposable instrument)                 */
/* ------------------------------------------------------------------ */

/**
 * The smallest reconstructable route contract for a disposable Field
 * Instrument: an optional Project, an optional Work, and one opened
 * Instrument. The query string is the only state that survives a cold load
 * or a full refresh, so the parser and builder below are the single shared
 * implementation used by both the server page and the client history sink.
 *
 * This is deliberately NOT a generalized routing system: it names exactly
 * the two altitudes the prototype already has and one instrument. Adding
 * instruments or altitudes would require a wider contract and a stop point.
 */

export const FIELD_INSTRUMENT_QUERY = "instrument";
export const FIELD_INSTRUMENT_ACTIVATE = "activate";

export type FieldRouteInit = {
  projectSlug: string | null;
  workId: string | null;
  instrumentOpen: boolean;
};

/** Whether a record may invoke the Activation Authorization instrument. */
export function instrumentizable(work: FieldWork | null | undefined) {
  return Boolean(work && work.state === "proposed");
}

type FieldRouteRecord = Record<string, string | undefined>;

function firstValue(...values: (string | undefined)[]) {
  return values.find((value) => Boolean(value)) ?? null;
}

export function fieldRouteInitFromParams(params: FieldRouteRecord): FieldRouteInit {
  const projectSlug = firstValue(params.project);
  const workId = firstValue(params.work);
  return {
    projectSlug,
    workId,
    instrumentOpen:
      firstValue(params[FIELD_INSTRUMENT_QUERY]) === FIELD_INSTRUMENT_ACTIVATE &&
      Boolean(projectSlug) &&
      Boolean(workId),
  };
}

/** Client-side parse of `window.location.search` (fresh load or popstate). */
export function parseFieldRoute(search: string | URLSearchParams): FieldRouteInit {
  const query =
    typeof search === "string" ? (search.split("?", 2)[1] ?? search) : search;
  const params = typeof query === "string" ? new URLSearchParams(query) : query;
  const record: FieldRouteRecord = {};
  for (const [key, value] of params) record[key] = value;
  return fieldRouteInitFromParams(record);
}

/** Builds `/workspace/field?…` for `history.pushState` / `replaceState`. */
export function buildFieldRouteUrl(
  position: { projectSlug: string | null; workId: string | null },
  instrumentOpen: boolean,
) {
  const params = new URLSearchParams();
  if (position.projectSlug) params.set("project", position.projectSlug);
  if (position.workId) params.set("work", position.workId);
  if (instrumentOpen && position.workId) {
    params.set(FIELD_INSTRUMENT_QUERY, FIELD_INSTRUMENT_ACTIVATE);
  }
  const search = params.toString();
  return search ? `/workspace/field?${search}` : "/workspace/field";
}

export type ReconciliationStatus = "active" | "not_active" | "missing";

/**
 * The authoritative reconstruction result for the record the instrument
 * acted on. `active` means the Field now reads the record as Active, which
 * is the only condition under which the instrument may exit as successful.
 */
export function reconciliationStatus(
  snapshot: FieldSnapshot,
  workId: string | null,
): ReconciliationStatus {
  const work = findWork(snapshot, workId);
  if (!work) return "missing";
  return work.state === "active" ? "active" : "not_active";
}
