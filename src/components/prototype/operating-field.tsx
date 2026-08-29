"use client";

/**
 * EXPERIMENTAL PROTOTYPE — Aredir Operating Field.
 *
 * One continuous environment with three altitudes. Descending compresses the
 * altitude above into a live instrument band rather than replacing it, so the
 * frame an operator descended from is never discarded.
 *
 * Read-only. Primary actions deep-link into the canonical authenticated routes
 * that already own those mutations; this surface never writes domain state.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { useRouter } from "next/navigation";

import {
  AuthorityBoundary,
  BandedManifold,
  EvidenceReadout,
  Label,
  LifecycleMechanism,
  MANIFOLD_ORDER_NOTE,
  Manifold,
  PaneHead,
  ProvenanceReadout,
  ProvenanceWell,
  LifecycleReadout,
  SiblingRail,
  stamp,
  titleCase,
} from "@/components/prototype/field-instruments";
import { ActivationInstrument } from "@/components/prototype/activation-instrument";
import {
  bandedManifoldColumns,
  buildFieldRouteUrl,
  fieldChannels,
  findProject,
  findWork,
  historicalPosture,
  instrumentizable,
  manifoldColumns,
  parseFieldRoute,
  provenancePlanes,
  reconciliationStatus,
  siblingGroups,
  stateLabel,
  stateRole,
  workDesignator,
  workForProject,
  workTitleBody,
  type FieldProject,
  type FieldRouteInit,
  type FieldSnapshot,
  type FieldWork,
} from "@/lib/prototype/operating-field";
import type { EngineeringWorkState } from "@/lib/workspace/engineering-work";

import "./field.css";

type Position = { projectSlug: string | null; workId: string | null };

export function OperatingField({
  snapshot,
  routeInit = null,
}: {
  snapshot: FieldSnapshot;
  routeInit?: FieldRouteInit | null;
}) {
  const [position, setPosition] = useState<Position>(() => ({
    projectSlug: routeInit?.projectSlug ?? null,
    workId: routeInit?.workId ?? null,
  }));
  const [inspected, setInspected] = useState<FieldWork | null>(null);
  const [planeDepth, setPlaneDepth] = useState(0);
  const [sweep, setSweep] = useState(0);
  const [instrumentOpen, setInstrumentOpen] = useState(() => {
    if (!routeInit?.instrumentOpen) return false;
    return instrumentizable(findWork(snapshot, routeInit.workId));
  });
  const [pendingConfirm, setPendingConfirm] = useState(false);
  const [confirmEpoch, setConfirmEpoch] = useState<string | null>(null);

  const invokeRef = useRef<HTMLButtonElement | null>(null);
  const wasOpen = useRef(instrumentOpen);
  const cleanUrlDone = useRef(false);
  const snapshotRef = useRef(snapshot);
  const router = useRouter();

  const project = findProject(snapshot, position.projectSlug);
  const work = findWork(snapshot, position.workId);
  const altitude = work ? "work" : project ? "project" : "portfolio";

  // Authoritative reconciliation is derived, not stored. When the canonical
  // action reports success we record the observedAt of the snapshot we
  // registered against and request a fresh server read; once a genuinely new
  // snapshot arrives we already know whether the record reads as Active. An
  // Active record is no longer instrumentizable, so the room closes
  // declaratively (its render condition stops being true). A new snapshot that
  // still reads as Proposed is a reconciliation/freshness failure and is
  // surfaced without pretending the transition happened. Mutation success and
  // Field projection agreement are two separate facts, and the derived check
  // below never announces a result for the pre-refresh snapshot.
  const newSnapshotArrived =
    pendingConfirm &&
    confirmEpoch !== null &&
    confirmEpoch !== snapshot.observedAt;
  const confirmResult = newSnapshotArrived
    ? reconciliationStatus(snapshot, position.workId)
    : null;
  const confirmFailed = confirmResult !== null && confirmResult !== "active";
  const reconciling = pendingConfirm && !newSnapshotArrived;

  const projectWork = useMemo(
    () => (project ? workForProject(snapshot, project.id) : []),
    [project, snapshot],
  );

  const syncUrl = useCallback(
    (next: Position, open: boolean, history: "push" | "replace") => {
      const url = buildFieldRouteUrl(next, open);
      if (history === "push") window.history.pushState(null, "", url);
      else window.history.replaceState(null, "", url);
    },
    [],
  );

  const descendToProject = useCallback(
    (slug: string) => {
      const next: Position = { projectSlug: slug, workId: null };
      setPosition(next);
      setInspected(null);
      setSweep((value) => value + 1);
      syncUrl(next, false, "push");
    },
    [syncUrl],
  );

  const descendToWork = useCallback(
    (target: FieldWork) => {
      const next: Position = { projectSlug: target.projectSlug, workId: target.id };
      setPosition(next);
      setPlaneDepth(0);
      setSweep((value) => value + 1);
      // Navigation leaves the authorization decision: confirmation state is
      // bound to the record being operated, so moving to another record closes
      // the instrument and never carries pending confirmation across records.
      setInstrumentOpen(false);
      setPendingConfirm(false);
      setConfirmEpoch(null);
      syncUrl(next, false, "push");
    },
    [syncUrl],
  );

  const ascend = useCallback(() => {
    const next = position.workId
      ? { projectSlug: position.projectSlug, workId: null }
      : { projectSlug: null, workId: null };
    setInspected(null);
    setSweep((value) => value + 1);
    setInstrumentOpen(false);
    setPendingConfirm(false);
    setConfirmEpoch(null);
    setPosition(next);
    syncUrl(next, false, "replace");
  }, [position, syncUrl]);

  const openInstrument = useCallback(() => {
    if (!instrumentizable(work)) return;
    cleanUrlDone.current = false;
    setPendingConfirm(false);
    setConfirmEpoch(null);
    setInstrumentOpen(true);
    syncUrl(position, true, "push");
  }, [position, work, syncUrl]);

  const closeInstrument = useCallback(() => {
    setPendingConfirm(false);
    setConfirmEpoch(null);
    setInstrumentOpen(false);
    syncUrl(position, false, "replace");
  }, [position, syncUrl]);

  const handleRegistered = useCallback(() => {
    setConfirmEpoch(snapshotRef.current.observedAt);
    cleanUrlDone.current = false;
    setPendingConfirm(true);
    router.refresh();
  }, [router]);

  useEffect(() => {
    snapshotRef.current = snapshot;
  }, [snapshot]);

  // External-system sync only (no state): once the record can no longer host
  // the instrument, drop the `instrument` query parameter from history once.
  useEffect(() => {
    if (!instrumentOpen) return;
    const target = findWork(snapshot, position.workId);
    if (target && instrumentizable(target)) {
      cleanUrlDone.current = false;
      return;
    }
    if (!cleanUrlDone.current) {
      cleanUrlDone.current = true;
      syncUrl(position, false, "replace");
    }
  }, [snapshot, instrumentOpen, position, syncUrl]);

  // External-system sync only (no state): return focus to the instrument
  // entry point when the room closes through any path.
  useEffect(() => {
    if (wasOpen.current && !instrumentOpen) {
      requestAnimationFrame(() => invokeRef.current?.focus());
    }
    wasOpen.current = instrumentOpen;
  }, [instrumentOpen]);

  useEffect(() => {
    const onPopState = () => {
      const init = parseFieldRoute(window.location.search);
      const effectiveOpen =
        init.instrumentOpen &&
        instrumentizable(findWork(snapshotRef.current, init.workId));
      cleanUrlDone.current = false;
      setPosition({ projectSlug: init.projectSlug, workId: init.workId });
      setInstrumentOpen(effectiveOpen);
      setPendingConfirm(false);
      setConfirmEpoch(null);
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const target = event.target as HTMLElement | null;
        if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;
        if (instrumentOpen) {
          closeInstrument();
          return;
        }
        ascend();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [ascend, closeInstrument, instrumentOpen]);

  const attentionPresent = snapshot.attention.total > 0;

  return (
    <div
      data-aredir-field=""
      data-attention={attentionPresent}
      aria-label="Aredir Operating Field — experimental prototype"
    >
      <div className="fld-ambient" aria-hidden="true" />

      <Ribbon snapshot={snapshot} />

      <div
        className="fld-strata"
        data-altitude={altitude}
        data-entered={sweep > 0 ? "true" : "false"}
      >
        <section className="fld-stratum" aria-label="Portfolio stratum">
          {sweep > 0 && altitude === "portfolio" ? (
            <span key={sweep} className="fld-sweep" aria-hidden="true" />
          ) : null}
          {altitude === "portfolio" ? (
            <PortfolioStratum
              snapshot={snapshot}
              inspected={inspected}
              onInspect={setInspected}
              onDescend={descendToProject}
              onDescendToWork={descendToWork}
            />
          ) : (
            <PortfolioBand snapshot={snapshot} onAscend={ascend} />
          )}
        </section>

        <section className="fld-stratum" aria-label="Project stratum">
          {sweep > 0 && altitude === "project" ? (
            <span key={sweep} className="fld-sweep" aria-hidden="true" />
          ) : null}
          {altitude === "project" && project ? (
            <ProjectStratum
              snapshot={snapshot}
              project={project}
              work={projectWork}
              inspected={inspected}
              onInspect={setInspected}
              onDescend={descendToWork}
            />
          ) : altitude === "work" && project ? (
            <ProjectBand
              project={project}
              work={projectWork}
              activeWorkId={work?.id ?? null}
              onAscend={ascend}
            />
          ) : null}
        </section>

        <section className="fld-stratum" aria-label="Engineering Work stratum">
          {sweep > 0 && altitude === "work" ? (
            <span key={sweep} className="fld-sweep" aria-hidden="true" />
          ) : null}
          {altitude === "work" && work ? (
            <WorkInstrument
              work={work}
              siblings={projectWork}
              planeDepth={planeDepth}
              invokeRef={invokeRef}
              onSelectDepth={setPlaneDepth}
              onSelectSibling={descendToWork}
              onInvokeInstrument={
                instrumentizable(work) ? openInstrument : null
              }
              instrumentEngaged={instrumentOpen && instrumentizable(work)}
              instrument={
                instrumentizable(work) ? (
                  <ActivationInstrument
                    key={work.id}
                    engaged={instrumentOpen}
                    projectSlug={work.projectSlug}
                    work={work}
                    reconciling={reconciling}
                    reconcileFailed={confirmFailed}
                    onRegistered={handleRegistered}
                    onRetry={handleRegistered}
                    onClose={closeInstrument}
                  />
                ) : null
              }
            />
          ) : null}
        </section>
      </div>

      <Baseline altitude={altitude} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ribbon and baseline                                                 */
/* ------------------------------------------------------------------ */

function Ribbon({ snapshot }: { snapshot: FieldSnapshot }) {
  return (
    <header className="fld-ribbon">
      <span className="fld-mark">
        <span className="fld-mark-sigil" aria-hidden="true" />
        Aredir Operating Field
      </span>
      <div className="fld-ribbon-secondary">
        <span className="fld-warn">Experimental · non-canonical</span>
        <span className="fld-label fld-label-dim">
          Observed {stamp(snapshot.observedAt)} · {snapshot.projects.length}{" "}
          projects · {snapshot.work.length} engineering work
          {snapshot.operator ? ` · ${snapshot.operator}` : ""}
        </span>
        <span className="fld-ribbon-spacer" aria-hidden="true" />
        <a className="fld-ctl" href="/workspace">
          Exit field
        </a>
      </div>
    </header>
  );
}

function Baseline({ altitude }: { altitude: string }) {
  return (
    <footer className="fld-baseline">
      <span className="fld-key">
        Altitude <b>{altitude}</b>
      </span>
      <span className="fld-key">
        <b>Click</b> descend
      </span>
      <span className="fld-key">
        <b>Esc</b> ascend
      </span>
      <span className="fld-ribbon-spacer" aria-hidden="true" />
      <span className="fld-key">
        ◆ focus · ▸ continuation eligible · ▲ condition · ▪ evidence · ◷ history
      </span>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Portfolio altitude                                                  */
/* ------------------------------------------------------------------ */

function PortfolioStratum({
  snapshot,
  inspected,
  onInspect,
  onDescend,
  onDescendToWork,
}: {
  snapshot: FieldSnapshot;
  inspected: FieldWork | null;
  onInspect: (work: FieldWork | null) => void;
  onDescend: (slug: string) => void;
  onDescendToWork: (work: FieldWork) => void;
}) {
  const { continuation, attention } = snapshot;
  const columns = useMemo(
    () => bandedManifoldColumns(snapshot.work, snapshot.projects),
    [snapshot.projects, snapshot.work],
  );

  return (
    <div className="fld-portfolio">
      <div className="fld-command">
        <div className="fld-cmd">
          <PaneHead
            label="Continuation"
            trailing={
              <span className="fld-readout-value">
                {continuation.mode} · {continuation.totalCandidates} eligible
              </span>
            }
          />

          {continuation.mode === "none" ? (
            <div className="fld-honest">
              <p className="fld-statement" style={{ fontSize: 15 }}>
                There is no clearly justified continuation right now.
              </p>
              <p className="fld-fine" style={{ marginTop: 9 }}>
                No Engineering Work currently satisfies every eligibility
                condition. Enter a lifecycle column below to orient instead.
              </p>
            </div>
          ) : (
            <>
              {continuation.candidates.map((candidate) => (
                <button
                  key={candidate.workId}
                  type="button"
                  className="fld-continuation"
                  style={{ marginBottom: 12 }}
                  onClick={() => onDescend(candidate.projectSlug)}
                >
                  <Label>{candidate.projectName}</Label>
                  <p className="fld-continuation-action">{candidate.nextAction}</p>
                  <div className="fld-vector">
                    <span>{candidate.title}</span>
                    <span className="fld-vector-line" aria-hidden="true" />
                    <span>Enter</span>
                  </div>
                  <p className="fld-fine" style={{ marginTop: 10 }}>
                    Why this can continue: {candidate.reason}
                  </p>
                </button>
              ))}
              {continuation.mode === "ambiguous" ? (
                <p className="fld-fine">
                  Several valid things can continue. Current engineering state
                  does not justify choosing one on your behalf, so the field
                  presents them unranked.
                </p>
              ) : null}
            </>
          )}
        </div>

        <div className="fld-cmd">
          <PaneHead
            label="Attention"
            trailing={
              <span className="fld-readout-value">{attention.total} recorded</span>
            }
          />
          {attention.total === 0 ? (
            <p className="fld-fine">
              Nothing requires intervention. No Engineering Work carries a
              recorded condition, no operating Defect has incomplete context, and
              no milestone is blocked. Attention is derived independently of
              continuation, so an empty channel here says nothing about what can
              continue.
            </p>
          ) : (
            attention.items.map((item, index) => (
              <div key={`${item.subject}-${index}`} className="fld-condition">
                <Label>{item.projectName}</Label>
                <p className="fld-narrative" style={{ marginTop: 5 }}>
                  <b>{item.subject}</b> — {item.condition}
                </p>
                {item.explanation ? (
                  <p className="fld-fine" style={{ marginTop: 5 }}>
                    {item.explanation}
                  </p>
                ) : null}
              </div>
            ))
          )}
        </div>

        <div className="fld-cmd">
          <PaneHead label="Field instrumentation" />
          <LifecycleReadout work={snapshot.work} label="Lifecycle distribution" />
          <EvidenceReadout work={snapshot.work} terse />
          <ProvenanceReadout work={snapshot.work} terse />
        </div>
      </div>

      <BandedManifold
        columns={columns}
        selectedWorkId={inspected?.id ?? null}
        onEnterWork={onDescendToWork}
        onEnterProject={onDescend}
        onInspect={onInspect}
      />
    </div>
  );
}

function PortfolioBand({
  snapshot,
  onAscend,
}: {
  snapshot: FieldSnapshot;
  onAscend: () => void;
}) {
  return (
    <div className="fld-band" data-role="situation">
      <button type="button" className="fld-band-up" onClick={onAscend}>
        <span className="fld-ascend" aria-hidden="true">
          ▲
        </span>
        <span className="fld-label">Portfolio</span>
      </button>
      <span className="fld-label fld-label-dim">
        {snapshot.work.length} engineering work · continuation{" "}
        {snapshot.continuation.mode} · attention {snapshot.attention.total}
      </span>
      <span className="fld-ribbon-spacer" aria-hidden="true" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Project altitude                                                    */
/* ------------------------------------------------------------------ */

function milestoneSummary(project: FieldProject) {
  if (project.milestones.length === 0) return "none";

  const counts = new Map<string, number>();
  for (const milestone of project.milestones) {
    counts.set(milestone.status, (counts.get(milestone.status) ?? 0) + 1);
  }

  return [...counts.entries()]
    .map(([status, count]) => `${count} ${status}`)
    .join(" · ");
}

function ProjectStratum({
  snapshot,
  project,
  work,
  inspected,
  onInspect,
  onDescend,
}: {
  snapshot: FieldSnapshot;
  project: FieldProject;
  work: FieldWork[];
  inspected: FieldWork | null;
  onInspect: (work: FieldWork | null) => void;
  onDescend: (work: FieldWork) => void;
}) {
  const channels = fieldChannels({
    project,
    work,
    continuation: snapshot.continuation,
    attention: snapshot.attention,
  });
  const columns = useMemo(() => manifoldColumns(work), [work]);
  const byId = useMemo(
    () => new Map(work.map((item) => [item.id, item])),
    [work],
  );

  return (
    <div className="fld-project">
      <div className="fld-context">
        <Label>Project</Label>
        <h2 className="fld-context-name" style={{ marginTop: 6 }}>
          {project.name}
        </h2>
        <dl className="fld-facts">
          <div className="fld-fact">
            <dt>Operating posture</dt>
            <dd className="fld-mono">
              {titleCase(project.status)} · {titleCase(project.stage)}
            </dd>
          </div>
          <div className="fld-fact">
            <dt>Target date</dt>
            <dd className="fld-mono">{stamp(project.targetDate, false)}</dd>
          </div>
          <div className="fld-fact">
            <dt>Focus version</dt>
            <dd className="fld-mono">{project.focusVersion}</dd>
          </div>
          <div className="fld-fact">
            <dt>Milestones</dt>
            <dd className="fld-mono">{milestoneSummary(project)}</dd>
          </div>
        </dl>
        {project.description ? (
          <p className="fld-narrative" style={{ marginTop: 16 }}>
            {project.description}
          </p>
        ) : null}
      </div>

      <div className="fld-manifold-wrap">
        <div className="fld-channels">
          <ChannelLane
            tag="Operational focus"
            channel="focus"
            ids={channels.focus.workIds}
            byId={byId}
            emptyText="No current selection"
          />
          <ChannelLane
            tag="Continuation"
            channel="continuation"
            ids={channels.continuation.workIds}
            byId={byId}
            emptyText={`Mode ${channels.continuation.mode} — none in this project`}
          />
          <ChannelLane
            tag="Attention"
            channel="attention"
            ids={channels.attention.workIds}
            byId={byId}
            emptyText="Nothing requires intervention"
          />
          <p className="fld-channel-note">
            Three independently derived channels. Focus is a human-selected
            unordered set with no primary item. Continuation is derived from
            eligibility. Attention is derived from recorded conditions. They may
            agree, disagree, or all be empty, and none of them ranks the work
            below.
          </p>
        </div>

        <Manifold
          columns={columns}
          selectedWorkId={inspected?.id ?? null}
          onEnter={onDescend}
          onInspect={onInspect}
        />

        <InspectLine work={inspected} />
      </div>
    </div>
  );
}

function ChannelLane({
  tag,
  channel,
  ids,
  byId,
  emptyText,
}: {
  tag: string;
  channel: "focus" | "continuation" | "attention";
  ids: string[];
  byId: Map<string, FieldWork>;
  emptyText: string;
}) {
  return (
    <div className="fld-channel" data-empty={ids.length === 0}>
      <span className="fld-channel-tag">{tag}</span>
      <span className="fld-channel-body">
        {ids.length === 0 ? (
          <span className="fld-absent">{emptyText}</span>
        ) : (
          ids.map((id) => {
            const item = byId.get(id);
            return (
              <span key={id} className="fld-chip" data-channel={channel}>
                {item ? (workDesignator(item) ?? workTitleBody(item)) : id}
              </span>
            );
          })
        )}
      </span>
    </div>
  );
}

function InspectLine({ work }: { work: FieldWork | null }) {
  if (!work) {
    return (
      <div className="fld-inspect" data-empty="true">
        <span className="fld-label fld-label-dim">{MANIFOLD_ORDER_NOTE}</span>
      </div>
    );
  }

  const designator = workDesignator(work);

  return (
    <div className="fld-inspect">
      <div className="fld-inspect-identity">
        {designator ? (
          <span className="fld-designator">{designator}</span>
        ) : null}
        <span className="fld-inspect-title">{workTitleBody(work)}</span>
        <span className="fld-tax" data-kind="state">
          {stateLabel(work.state)}
        </span>
        <span className="fld-tax">{titleCase(work.workflow)}</span>
      </div>
      <p className="fld-inspect-action">
        {work.currentNextAction?.trim()
          ? work.currentNextAction
          : "No current next action is recorded."}
      </p>
    </div>
  );
}

function ProjectBand({
  project,
  work,
  activeWorkId,
  onAscend,
}: {
  project: FieldProject;
  work: FieldWork[];
  activeWorkId: string | null;
  onAscend: () => void;
}) {
  return (
    <div className="fld-band" data-role="orientation">
      <button type="button" className="fld-band-up" onClick={onAscend}>
        <span className="fld-ascend" aria-hidden="true">
          ▲
        </span>
        <span className="fld-band-name">{project.name}</span>
      </button>
      <span className="fld-label fld-label-dim">
        {titleCase(project.status)} · {titleCase(project.stage)}
      </span>
      <span className="fld-ribbon-spacer" aria-hidden="true" />
      <span className="fld-label fld-label-dim">
        {work.length} engineering work · viewing{" "}
        {activeWorkId
          ? (workDesignator({
              title: work.find((item) => item.id === activeWorkId)?.title ?? "",
            }) ?? "1 record")
          : "—"}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Engineering Work altitude                                           */
/* ------------------------------------------------------------------ */

function canonicalRoute(work: FieldWork) {
  const base = `/workspace/projects/${work.projectSlug}/engineering-work/${work.id}`;
  if (work.state === "proposed") {
    return { href: `${base}/activate`, label: "Open activation authorization" };
  }
  if (work.state === "active" || work.state === "in_review") {
    return { href: base, label: "Open canonical operating route" };
  }
  return { href: base, label: "Open canonical record" };
}

function WorkInstrument({
  work,
  siblings,
  planeDepth,
  invokeRef,
  instrumentEngaged = false,
  instrument = null,
  onSelectDepth,
  onSelectSibling,
  onInvokeInstrument,
}: {
  work: FieldWork;
  siblings: FieldWork[];
  planeDepth: number;
  invokeRef: RefObject<HTMLButtonElement | null>;
  instrumentEngaged?: boolean;
  instrument?: ReactNode;
  onSelectDepth: (depth: number) => void;
  onSelectSibling: (work: FieldWork) => void;
  onInvokeInstrument: (() => void) | null;
}) {
  const planes = useMemo(() => provenancePlanes(work), [work]);
  const groups = useMemo(() => siblingGroups(siblings), [siblings]);
  const activePlane = planes.find((plane) => plane.depth === planeDepth) ?? planes[0];
  const historical = Boolean(activePlane?.event);
  const posture = activePlane?.event ? historicalPosture(activePlane.event) : null;
  const designator = workDesignator(work);
  const route = canonicalRoute(work);

  return (
    <div className="fld-work" data-historical={historical}>
      <header className="fld-identity">
        <div className="fld-identity-main">
          <Label>
            {work.projectName} · Engineering Work
            {designator ? ` · ${designator}` : ""}
          </Label>
          <h2 className="fld-identity-title">{workTitleBody(work)}</h2>
          <div className="fld-taxonomy">
            <span
              className="fld-tax"
              style={{
                color:
                  stateRole(work.state) === "actionable"
                    ? "var(--f-live)"
                    : undefined,
                borderColor:
                  stateRole(work.state) === "actionable"
                    ? "var(--f-live-line)"
                    : undefined,
              }}
            >
              {stateLabel(work.state)}
            </span>
            <span className="fld-tax">{titleCase(work.type)}</span>
            <span className="fld-tax">{titleCase(work.workflow)} workflow</span>
            <span className="fld-tax">v{work.version}</span>
            {work.isFocused ? (
              <span className="fld-tax" data-kind="focus">
                ◆ Operational focus
              </span>
            ) : null}
          </div>
        </div>
        <div style={{ textAlign: "right", flex: "0 0 auto" }}>
          <p className="fld-id">{work.id}</p>
          <p className="fld-label fld-label-dim" style={{ marginTop: 6 }}>
            Created {stamp(work.createdAt, false)}
          </p>
          <p className="fld-label fld-label-dim" style={{ marginTop: 3 }}>
            Last modified {stamp(work.updatedAt, false)}
          </p>
        </div>
      </header>

      <div className="fld-work-body">
        <SiblingRail
          groups={groups}
          currentWorkId={work.id}
          onSelect={onSelectSibling}
        />

        <div className="fld-operate">
          <LifecycleMechanism state={work.state} />

          <div className="fld-now">
            {historical && activePlane?.event ? (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span className="fld-warn">
                    Historical plane −{activePlane.depth}
                  </span>
                  <Label dim>
                    Recorded {stamp(activePlane.occurredAt)} · not current
                  </Label>
                </div>
                <p className="fld-now-statement">
                  {posture?.nextAction?.trim() ||
                    "This event recorded no next action."}
                </p>
                <p className="fld-fine" style={{ marginTop: 11 }}>
                  {posture?.changedState && activePlane.event.priorState
                    ? `State moved ${stateLabel(
                        activePlane.event.priorState as EngineeringWorkState,
                      )} → ${stateLabel(
                        activePlane.event.resultingState as EngineeringWorkState,
                      )}. `
                    : ""}
                  {activePlane.event.rationale
                    ? `Rationale: ${activePlane.event.rationale} `
                    : ""}
                  Action actor {activePlane.event.actionActorType} ·{" "}
                  {activePlane.event.actionActorIdentifier}
                  {activePlane.event.decisionActorType
                    ? ` · decision actor ${activePlane.event.decisionActorType}`
                    : ""}
                  {activePlane.event.authorityType
                    ? ` · authority ${titleCase(activePlane.event.authorityType)}`
                    : ""}
                  .
                </p>
                <button
                  type="button"
                  className="fld-ctl"
                  style={{ marginTop: 14 }}
                  onClick={() => onSelectDepth(0)}
                >
                  Return to the authoritative present
                </button>
              </>
            ) : (
              <>
                <Label>Current next action · work authoritative</Label>
                {work.currentNextAction?.trim() ? (
                  <p className="fld-now-statement">{work.currentNextAction}</p>
                ) : (
                  <p className="fld-now-terminal">
                    No current next action is recorded.
                    {work.finalDisposition
                      ? " This record reached a terminal disposition."
                      : ""}
                  </p>
                )}
                {onInvokeInstrument ? (
                  <div className="fld-invoke-row">
                    <button
                      ref={invokeRef}
                      type="button"
                      className="fld-invoke"
                      disabled={instrumentEngaged}
                      onClick={onInvokeInstrument}
                    >
                      Authorization instrument · activate in-field
                    </button>
                    <a
                      className="fld-link"
                      href={route.href}
                      aria-hidden={instrumentEngaged || undefined}
                      tabIndex={instrumentEngaged ? -1 : undefined}
                    >
                      Open in workspace
                      <span aria-hidden="true">→</span>
                    </a>
                  </div>
                ) : (
                  <a className="fld-link" href={route.href}>
                    {route.label}
                    <span aria-hidden="true">→</span>
                  </a>
                )}
              </>
            )}
          </div>

          {work.condition?.trim() ? (
            <div className="fld-condition">
              <Label>Recorded condition</Label>
              <p className="fld-narrative" style={{ marginTop: 6 }}>
                {work.condition}
              </p>
              {work.conditionRationale?.trim() ? (
                <p className="fld-fine" style={{ marginTop: 6 }}>
                  {work.conditionRationale}
                </p>
              ) : null}
            </div>
          ) : null}

          <section className="fld-block">
            <Label dim>Objective · governing context</Label>
            <p className="fld-narrative fld-block-body">{work.summary}</p>
          </section>

          {work.currentOutcome?.trim() ? (
            <section className="fld-block">
              <Label dim>Recorded outcome</Label>
              <p className="fld-narrative fld-block-body">{work.currentOutcome}</p>
            </section>
          ) : null}

          {work.finalDisposition?.trim() ? (
            <section className="fld-block">
              <Label dim>Final disposition</Label>
              <p className="fld-narrative fld-block-body">
                {work.finalDisposition}
              </p>
            </section>
          ) : null}

          {work.workflow === "defect" ? (
            <section className="fld-block">
              <Label dim>Defect context</Label>
              <p className="fld-narrative fld-block-body">
                {work.defectContextComplete
                  ? "Structured Defect Context is complete for this record."
                  : "Structured Defect Context is incomplete, which withholds this record from continuation."}
              </p>
            </section>
          ) : null}
        </div>

        <AuthorityBoundary evidence={work.evidence} knowledge={work.knowledge} />
        {instrument}
      </div>

      <ProvenanceWell
        planes={planes}
        activeDepth={planeDepth}
        onSelectDepth={onSelectDepth}
      />
    </div>
  );
}
