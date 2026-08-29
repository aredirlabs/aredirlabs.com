/**
 * EXPERIMENTAL PROTOTYPE — Aredir Operating Field instruments.
 *
 * Presentational pieces only. Every value rendered here is either an
 * authoritative field read from the Workspace or one of the permitted
 * instrumentation projections. No component in this file infers state,
 * ranks records, or scores anything.
 */

import {
  evidenceCompleteness,
  FIELD_STATE_ORDER,
  historicalPosture,
  isImplementedTransition,
  lifecycleDistribution,
  provenanceCompleteness,
  reachableStates,
  stateLabel,
  stateRole,
  workDesignator,
  workTitleBody,
  type BandedManifoldColumn,
  type FieldEvidence,
  type FieldKnowledge,
  type FieldWork,
  type ManifoldColumn,
  type ProvenancePlane,
} from "@/lib/prototype/operating-field";
import type { EngineeringWorkState } from "@/lib/workspace/engineering-work";

/** Fixed UTC rendering so server and client output cannot diverge. */
export function stamp(iso: string | null, withTime = true) {
  if (!iso) return "—";
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  const day = date.toISOString().slice(0, 10);
  return withTime ? `${day} ${date.toISOString().slice(11, 16)}Z` : day;
}

export function titleCase(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function Label({
  children,
  dim,
}: {
  children: React.ReactNode;
  dim?: boolean;
}) {
  return (
    <span className={dim ? "fld-label fld-label-dim" : "fld-label"}>{children}</span>
  );
}

export function PaneHead({
  label,
  trailing,
}: {
  label: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div className="fld-pane-head">
      <Label>{label}</Label>
      <span className="fld-rule" aria-hidden="true" />
      {trailing}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Permitted readouts                                                  */
/* ------------------------------------------------------------------ */

export function LifecycleReadout({
  work,
  label,
}: {
  work: FieldWork[];
  label: string;
}) {
  const distribution = lifecycleDistribution(work);
  const total = work.length;

  return (
    <section className="fld-readout">
      <div className="fld-readout-head">
        <Label>{label}</Label>
        <span className="fld-readout-value">{total} records</span>
      </div>
      <div
        className="fld-segments"
        role="img"
        aria-label={distribution
          .filter((entry) => entry.count > 0)
          .map((entry) => `${entry.label} ${entry.count}`)
          .join(", ")}
      >
        {distribution
          .filter((entry) => entry.count > 0)
          .map((entry) => (
            <span
              key={entry.state}
              className="fld-segment"
              data-role={entry.role}
              style={{ flexGrow: entry.count }}
            />
          ))}
      </div>
      <div className="fld-legend">
        {distribution.map((entry) => (
          <span
            key={entry.state}
            className="fld-legend-item"
            data-zero={entry.count === 0}
          >
            {entry.label} <b>{entry.count}</b>
          </span>
        ))}
      </div>
    </section>
  );
}

export function EvidenceReadout({
  work,
  terse,
}: {
  work: FieldWork[];
  terse?: boolean;
}) {
  const completeness = evidenceCompleteness(work);

  return (
    <section className="fld-readout">
      <div className="fld-readout-head">
        <Label>Evidence completeness</Label>
        <span className="fld-readout-value">
          {completeness.recordsWithEvidence} / {completeness.records} records
        </span>
      </div>
      <div
        className="fld-ticks"
        role="img"
        aria-label={`${completeness.recordsWithEvidence} of ${completeness.records} Engineering Work records reference repository evidence`}
      >
        {work.map((item) => (
          <span
            key={item.id}
            className="fld-tick"
            data-filled={item.evidence.length > 0 ? "true" : "false"}
          />
        ))}
      </div>
      <p className="fld-fine">
        {completeness.references} repository reference
        {completeness.references === 1 ? "" : "s"} recorded
        {completeness.references > 0
          ? ` · ${Object.entries(completeness.byStatus)
              .filter(([, count]) => count > 0)
              .map(([status, count]) => `${count} ${status}`)
              .join(", ")}`
          : ""}
        {terse
          ? ""
          : ". The Workspace references repository artifacts; it is never the authority for their contents."}
      </p>
    </section>
  );
}

export function ProvenanceReadout({
  work,
  terse,
}: {
  work: FieldWork[];
  terse?: boolean;
}) {
  const completeness = provenanceCompleteness(work);

  return (
    <section className="fld-readout">
      <div className="fld-readout-head">
        <Label>Recorded provenance</Label>
        <span className="fld-readout-value">
          {completeness.recordsWithHistory} / {completeness.records} records
        </span>
      </div>
      <div
        className="fld-ticks"
        role="img"
        aria-label={`${completeness.recordsWithHistory} of ${completeness.records} Engineering Work records carry recorded lifecycle history`}
      >
        {work.map((item) => (
          <span
            key={item.id}
            className="fld-tick"
            data-filled={item.history.length > 0 ? "partial" : "false"}
          />
        ))}
      </div>
      <p className="fld-fine">
        {completeness.events} append-only lifecycle event
        {completeness.events === 1 ? "" : "s"} recorded
        {terse
          ? ""
          : ". Records without history predate lifecycle capture; their past was never recorded, so the field does not invent one."}
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Lifecycle mechanism                                                 */
/* ------------------------------------------------------------------ */

const OPERATING_PATH: EngineeringWorkState[] = [
  "proposed",
  "active",
  "in_review",
  "completed",
  "closed",
];

const TERMINAL_DISPOSITIONS: EngineeringWorkState[] = ["cancelled", "superseded"];

export function LifecycleMechanism({ state }: { state: EngineeringWorkState }) {
  const reachable = reachableStates(state);
  const implementedTargets = new Set<EngineeringWorkState>([
    "active",
    "in_review",
    "completed",
    "proposed",
  ]);

  return (
    <section className="fld-mechanism">
      <Label>Lifecycle mechanism</Label>
      <div className="fld-mech-track">
        {OPERATING_PATH.map((node, index) => {
          const previous = OPERATING_PATH[index - 1];
          const forward = previous ? isImplementedTransition(previous, node) : false;
          const backward = previous ? isImplementedTransition(node, previous) : false;

          return (
            <span key={node} style={{ display: "inline-flex", alignItems: "center" }}>
              {previous ? (
                <span
                  className="fld-edge"
                  data-live={forward || backward}
                  data-dashed={!forward && !backward}
                  aria-hidden="true"
                />
              ) : null}
              <span
                className="fld-node"
                data-current={node === state}
                data-reachable={reachable.includes(node)}
                data-unimplemented={!implementedTargets.has(node)}
              >
                <span className="fld-node-dot" aria-hidden="true" />
                {stateLabel(node)}
              </span>
            </span>
          );
        })}
      </div>
      <div className="fld-mech-track">
        {TERMINAL_DISPOSITIONS.map((node) => (
          <span key={node} style={{ display: "inline-flex", alignItems: "center" }}>
            <span className="fld-edge" data-dashed="true" aria-hidden="true" />
            <span className="fld-node" data-unimplemented="true">
              <span className="fld-node-dot" aria-hidden="true" />
              {stateLabel(node)}
            </span>
          </span>
        ))}
      </div>
      <p className="fld-fine" style={{ marginTop: 8 }}>
        Solid edges are transitions the running system can perform.{" "}
        {reachable.length > 0 ? (
          <>
            From <b>{stateLabel(state)}</b> this record can reach{" "}
            {reachable.map((target) => stateLabel(target)).join(" or ")}.
          </>
        ) : (
          <>
            <b>{stateLabel(state)}</b> has no implemented outbound transition.
          </>
        )}{" "}
        Dashed nodes are documented in the lifecycle contract but not yet
        implemented, so the field does not offer them.
      </p>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Authority boundary                                                  */
/* ------------------------------------------------------------------ */

export function AuthorityBoundary({
  evidence,
  knowledge,
}: {
  evidence: FieldEvidence[];
  knowledge: FieldKnowledge[];
}) {
  return (
    <aside className="fld-boundary" aria-label="Authority boundary">
      <PaneHead label="Beyond workspace authority" />
      <p className="fld-fine" style={{ marginBottom: 14 }}>
        Everything past this line is owned elsewhere. The Workspace records
        where it lives and how it was last reviewed, never its contents.
      </p>

      <Label dim>Repository evidence</Label>
      {evidence.length === 0 ? (
        <p className="fld-absent-note">
          No repository evidence is referenced by this record. Nothing outside
          the Workspace currently supports its claims.
        </p>
      ) : (
        <div style={{ marginTop: 7 }}>
          {evidence.map((reference) => (
            <div
              key={reference.id}
              className="fld-tether"
              data-status={reference.referenceStatus}
            >
              <p className="fld-tether-repo">{reference.repository}</p>
              <p className="fld-tether-path">{reference.sourceLocation}</p>
              <div className="fld-tether-meta">
                <span className="fld-status" data-status={reference.referenceStatus}>
                  {reference.referenceStatus}
                </span>
                <span className="fld-label fld-label-dim">
                  {titleCase(reference.artifactClass)}
                </span>
                <span className="fld-label fld-label-dim">
                  {titleCase(reference.authority)}
                </span>
              </div>
              {reference.lastReviewedAt ? (
                <p className="fld-tether-path" style={{ marginTop: 4 }}>
                  Reviewed {stamp(reference.lastReviewedAt, false)}
                </p>
              ) : null}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 22 }}>
        <Label dim>Governing knowledge</Label>
        {knowledge.length === 0 ? (
          <p className="fld-absent-note">
            No related knowledge is mapped to this record.
          </p>
        ) : (
          <div style={{ marginTop: 7 }}>
            {knowledge.map((item) => (
              <div key={item.id} className="fld-tether" data-status="verified">
                <p className="fld-tether-repo">{item.title}</p>
                <p className="fld-tether-path">{item.authorityLocation}</p>
                <div className="fld-tether-meta">
                  <span className="fld-label fld-label-dim">
                    {item.knowledgeClass}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

/* ------------------------------------------------------------------ */
/* Provenance well                                                     */
/* ------------------------------------------------------------------ */

export function ProvenanceWell({
  planes,
  activeDepth,
  onSelectDepth,
}: {
  planes: ProvenancePlane[];
  activeDepth: number;
  onSelectDepth: (depth: number) => void;
}) {
  const depth = planes.length - 1;

  return (
    <section className="fld-well" aria-label="Provenance well">
      <div className="fld-well-head">
        <Label>Provenance well</Label>
        <span className="fld-readout-value">
          depth {depth} {depth === 1 ? "event" : "events"}
        </span>
        <span className="fld-rule" aria-hidden="true" />
        {activeDepth > 0 ? (
          <span className="fld-warn">Viewing a historical plane</span>
        ) : (
          <span className="fld-label fld-label-dim">
            Front plane is authoritative
          </span>
        )}
      </div>

      {depth === 0 ? (
        <p className="fld-well-empty">
          No provenance recorded. This record carries no append-only lifecycle
          history, so there is no earlier plane to bring forward.
        </p>
      ) : (
        <div className="fld-planes">
          {planes.map((plane) => {
            const posture = plane.event ? historicalPosture(plane.event) : null;
            return (
              <button
                key={plane.depth}
                type="button"
                className="fld-plane"
                data-depth={plane.depth}
                data-deep={plane.depth > 3}
                data-now={plane.depth === 0}
                data-active={plane.depth === activeDepth}
                onClick={() => onSelectDepth(plane.depth)}
                aria-pressed={plane.depth === activeDepth}
              >
                <span className="fld-plane-depth">
                  {plane.depth === 0 ? "Now · authoritative" : `−${plane.depth}`}
                </span>
                <span className="fld-plane-label">
                  {plane.depth === 0
                    ? "Current recorded state"
                    : posture?.changedState && plane.event?.priorState
                      ? `${stateLabel(plane.event.priorState as EngineeringWorkState)} → ${stateLabel(
                          plane.event.resultingState as EngineeringWorkState,
                        )}`
                      : titleCase(plane.event?.actionType ?? "event")}
                </span>
                <span className="fld-plane-time">
                  {plane.depth === 0 ? "—" : stamp(plane.occurredAt)}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Manifold cells                                                      */
/* ------------------------------------------------------------------ */

function cellMarks(work: FieldWork) {
  const marks: Array<{ key: string; glyph: string; className: string; title: string }> =
    [];

  if (work.isFocused) {
    marks.push({
      key: "focus",
      glyph: "◆",
      className: "fld-mark-focus",
      title: "Operational Focus selection",
    });
  }
  if (work.continuationEligible) {
    marks.push({
      key: "continuation",
      glyph: "▸",
      className: "fld-mark-cont",
      title: "Continuation eligible",
    });
  }
  if (work.condition?.trim()) {
    marks.push({
      key: "condition",
      glyph: "▲",
      className: "fld-mark-attend",
      title: "Recorded condition",
    });
  }
  if (work.evidence.length > 0) {
    marks.push({
      key: "evidence",
      glyph: `▪${work.evidence.length}`,
      className: "fld-mark-ev",
      title: `${work.evidence.length} repository reference(s)`,
    });
  }
  if (work.history.length > 0) {
    marks.push({
      key: "history",
      glyph: `◷${work.history.length}`,
      className: "",
      title: `${work.history.length} recorded history event(s)`,
    });
  }

  return marks;
}

function cellDescription(work: FieldWork) {
  const parts = [
    workDesignator(work) ?? work.title,
    stateLabel(work.state),
    work.isFocused ? "operationally focused" : null,
    work.continuationEligible ? "continuation eligible" : null,
    work.condition?.trim() ? "has a recorded condition" : null,
    work.evidence.length > 0 ? `${work.evidence.length} repository references` : null,
    work.history.length > 0 ? `${work.history.length} history events` : "no recorded history",
  ].filter(Boolean);

  return parts.join(", ");
}

export function WorkCell({
  work,
  selected,
  onEnter,
  onInspect,
}: {
  work: FieldWork;
  selected: boolean;
  onEnter: () => void;
  onInspect: (work: FieldWork | null) => void;
}) {
  const designator = workDesignator(work);

  return (
    <button
      type="button"
      className="fld-cell"
      data-role={stateRole(work.state)}
      data-selected={selected}
      onClick={onEnter}
      onMouseEnter={() => onInspect(work)}
      onMouseLeave={() => onInspect(null)}
      onFocus={() => onInspect(work)}
      onBlur={() => onInspect(null)}
      aria-label={cellDescription(work)}
    >
      <span className="fld-cell-name">{designator ?? workTitleBody(work)}</span>
      <span className="fld-marks" aria-hidden="true">
        {cellMarks(work).map((mark) => (
          <span key={mark.key} className={mark.className} title={mark.title}>
            {mark.glyph}
          </span>
        ))}
      </span>
    </button>
  );
}

export function Manifold({
  columns,
  selectedWorkId,
  onEnter,
  onInspect,
}: {
  columns: ManifoldColumn[];
  selectedWorkId: string | null;
  onEnter: (work: FieldWork) => void;
  onInspect: (work: FieldWork | null) => void;
}) {
  return (
    <div className="fld-manifold">
      {columns.map((column) => (
        <div
          key={column.state}
          className="fld-column"
          data-empty={column.items.length === 0}
        >
          <div className="fld-column-head">
            <div className="fld-column-count">{column.items.length}</div>
            <Label dim>{column.label}</Label>
          </div>
          <div className="fld-column-body">
            {column.items.map((item) => (
              <WorkCell
                key={item.id}
                work={item}
                selected={item.id === selectedWorkId}
                onEnter={() => onEnter(item)}
                onInspect={onInspect}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * The portfolio reading of the manifold: identical lifecycle axis, subdivided
 * by owning Project. Descending to a Project narrows the population without
 * moving the axis, so the operator keeps their spatial bearings.
 */
export function BandedManifold({
  columns,
  selectedWorkId,
  onEnterWork,
  onEnterProject,
  onInspect,
}: {
  columns: BandedManifoldColumn[];
  selectedWorkId: string | null;
  onEnterWork: (work: FieldWork) => void;
  onEnterProject: (slug: string) => void;
  onInspect: (work: FieldWork | null) => void;
}) {
  return (
    <div className="fld-manifold">
      {columns.map((column) => (
        <div
          key={column.state}
          className="fld-column"
          data-empty={column.items.length === 0}
        >
          <div className="fld-column-head">
            <div className="fld-column-count">{column.items.length}</div>
            <Label dim>{column.label}</Label>
          </div>
          <div className="fld-column-body">
            {column.bands.map((band) => (
              <div key={band.projectId} className="fld-bandgroup">
                <button
                  type="button"
                  className="fld-bandgroup-head"
                  onClick={() => onEnterProject(band.projectSlug)}
                  aria-label={`${band.projectName}, ${band.items.length} records ${column.label}. Descend to project.`}
                >
                  {band.projectName}
                  <span className="fld-bandgroup-rule" aria-hidden="true" />
                  <span className="fld-bandgroup-count">{band.items.length}</span>
                </button>
                {band.items.map((item) => (
                  <WorkCell
                    key={item.id}
                    work={item}
                    selected={item.id === selectedWorkId}
                    onEnter={() => onEnterWork(item)}
                    onInspect={onInspect}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/** Sibling records at the Work altitude, grouped by lifecycle state. */
export function SiblingRail({
  groups,
  currentWorkId,
  onSelect,
}: {
  groups: ManifoldColumn[];
  currentWorkId: string;
  onSelect: (work: FieldWork) => void;
}) {
  return (
    <nav className="fld-rail" aria-label="Sibling Engineering Work in this Project">
      {groups.map((group) => (
        <div key={group.state} className="fld-rail-group">
          <div className="fld-rail-head">
            <Label dim>{group.label}</Label>
            <span className="fld-rail-head-count">{group.items.length}</span>
          </div>
          {group.items.map((item) => (
            <button
              key={item.id}
              type="button"
              className="fld-rail-item"
              data-current={item.id === currentWorkId}
              onClick={() => onSelect(item)}
              aria-current={item.id === currentWorkId ? "true" : undefined}
              aria-label={cellDescription(item)}
            >
              <span className="fld-rail-name">
                {workDesignator(item) ?? workTitleBody(item)}
              </span>
              <span className="fld-marks" aria-hidden="true">
                {cellMarks(item)
                  .slice(0, 3)
                  .map((mark) => (
                    <span key={mark.key} className={mark.className}>
                      {mark.glyph}
                    </span>
                  ))}
              </span>
            </button>
          ))}
        </div>
      ))}
    </nav>
  );
}

export const MANIFOLD_ORDER_NOTE = `Columns are the ${FIELD_STATE_ORDER.length} canonical lifecycle states in contract order. Within a column, records are ordered by identifier — a fixed presentation order, never priority, recency, or importance.`;
