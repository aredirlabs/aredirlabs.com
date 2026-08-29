"use client";

/**
 * EXPERIMENTAL PROTOTYPE — the Activation Authorization instrument.
 *
 * The Field operating the Proposed → Active authorization decision.
 *
 * This is NOT the canonical Review & Activate page restyled. The canonical
 * form is an implementation reference for required semantics; those
 * responsibilities are decomposed into the Field's existing spatial grammar:
 *
 *  · persistent Work identity  → the room head
 *  · the lifecycle mechanism    → the horizontal axis (receding pole → edge → reaching pole)
 *  · the proposal context       → the receding (current) pole, standing where the record stands
 *  · the authority boundary     → the verification gate sitting on the traveling edge
 *  · the active working plane   → the recorded decision (rationale + basis), unlocked by the gate
 *  · the provenance plane       → the register at the foot of the room
 *
 * The traversal itself — [Proposed] → [Active] — is the decision being made.
 * Each canonical input, validation rule, authority rule, server action, and
 * persisted result is preserved underneath: the same `activateProposedEngineeringWork`
 * server action, explicit human authorization (`activation_authorized="authorized"`),
 * rationale, decision basis, and persisted authorization provenance.
 *
 * The room inherits SCOPE from the record it is bound to, never AUTHORITY:
 * opening it changes nothing until an authorized human verifies at the gate,
 * composes the decision on the working plane, and commits the traversal.
 *
 * RFC-1-GOVERNANCE: mutation success and Field projection reconciliation are
 * separate facts. On success this room only signals the parent ("registered");
 * the parent requests an authoritative reconstruction and closes the room only
 * once the Field itself reads the record as Active.
 */

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import { Label, stamp, titleCase } from "@/components/prototype/field-instruments";
import {
  activateProposedEngineeringWork,
  type EngineeringWorkMutationState,
} from "@/app/workspace/projects/[slug]/engineering-work-actions";
import {
  stateLabel,
  workDesignator,
  workTitleBody,
  type FieldWork,
} from "@/lib/prototype/operating-field";

const initialState: EngineeringWorkMutationState = {};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, [tabindex]:not([tabindex="-1"])';

export function ActivationInstrument({
  projectSlug,
  work,
  reconciling,
  reconcileFailed,
  engaged = true,
  onRegistered,
  onRetry,
  onClose,
}: {
  projectSlug: string;
  work: FieldWork;
  reconciling: boolean;
  reconcileFailed: boolean;
  engaged?: boolean;
  onRegistered: () => void;
  onRetry: () => void;
  onClose: () => void;
}) {
  const [state, formAction, pending] = useActionState(
    activateProposedEngineeringWork.bind(null, projectSlug, work.id),
    initialState,
  );

  const roomRef = useRef<HTMLDivElement>(null);
  const authRef = useRef<HTMLInputElement>(null);
  const registered = useRef(false);

  const [latched, setLatched] = useState(false);
  const [armed, setArmed] = useState(false);

  // `engaged` is the parent's spatial claim: the instrument only claims focus
  // while it is actually engaged laterally inside Work, never while it sits
  // docked behind the authority seam.
  useEffect(() => {
    if (engaged) authRef.current?.focus();
  }, [engaged]);

  useEffect(() => {
    if (state.success && !registered.current) {
      registered.current = true;
      onRegistered();
    }
  }, [state.success, onRegistered]);

  const instrumentBusy = pending || reconciling;

  /**
   * Progressive disclosure along the decision: the gate must be verified
   * (latched) before the recorded decision unlocks; the traversal arms only
   * once the gate is verified AND rationale + decision basis are composed.
   * This recomputes presentational state from the form on every input event;
   * the canonical `required` constraints remain the authoritative validator.
   */
  const syncDecision = (event: FormEvent<HTMLFormElement>) => {
    const elements = event.currentTarget.elements;
    const gate = elements.namedItem("activation_authorized") as HTMLInputElement | null;
    const rationale = elements.namedItem("rationale") as HTMLTextAreaElement | null;
    const basis = elements.namedItem("decision_basis") as HTMLTextAreaElement | null;
    const nextLatched = Boolean(gate?.checked);
    const nextArmed =
      nextLatched &&
      Boolean(rationale?.value.trim()) &&
      Boolean(basis?.value.trim());
    setLatched(nextLatched);
    setArmed(nextArmed);
  };

  const onKeyDownCapture = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      onClose();
      return;
    }
    if (event.key !== "Tab") return;
    const room = roomRef.current;
    if (!room) return;
    const items = room.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (items.length === 0) return;
    const first = items[0];
    const last = items[items.length - 1];
    const active = document.activeElement;
    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const designator = workDesignator(work);
  const titleBody = workTitleBody(work);
  const canonicalHref = `/workspace/projects/${work.projectSlug}/engineering-work/${work.id}/activate`;
  const proposalObjective = work.summary?.trim();
  const proposalNext = work.currentNextAction?.trim();

  return (
    <div
      ref={roomRef}
      className="fld-room"
      data-engaged={engaged ? "true" : "false"}
      onKeyDownCapture={onKeyDownCapture}
      aria-label="Activation Authorization — the Field operating the Proposed to Active decision"
    >
      <header className="fld-room-head">
        <div className="fld-room-head-main">
          <Label>Activation authorization · the Field operating Proposed → Active</Label>
          <h2 className="fld-room-identity-title">
            {designator ? `${designator} — ` : ""}
            {titleBody}
          </h2>
          <div className="fld-taxonomy">
            <span
              className="fld-tax"
              style={{ color: "var(--f-live)", borderColor: "var(--f-live-line)" }}
            >
              {stateLabel(work.state)}
            </span>
            <span className="fld-tax">{titleCase(work.type)}</span>
            <span className="fld-tax">{titleCase(work.workflow)} workflow</span>
            <span className="fld-tax">v{work.version}</span>
            <span className="fld-id">{work.id}</span>
          </div>
        </div>
        <button type="button" className="fld-ctl" onClick={onClose}>
          Close
        </button>
      </header>

      <div className="fld-room-body">
        <form action={formAction} onInput={syncDecision} className="fld-room-form">
          <input type="hidden" name="version" value={work.version} />
          <input type="hidden" name="expected_state" value="proposed" />

          {/* The lifecycle axis: the decision being traveled. */}
          <div className="fld-room-axis" data-armed={armed}>
            <section className="fld-room-pole" data-kind="current">
              <div
                className="fld-node"
                data-current="true"
                aria-hidden="true"
              >
                <span className="fld-node-dot" />
                {stateLabel(work.state)}
              </div>
              <div className="fld-room-pole-body">
                <Label dim>Receding node · where the record stands</Label>
                <p className="fld-room-pole-copy">
                  This record currently reads as{" "}
                  <b>{stateLabel(work.state)}</b> at{" "}
                  <b>v{work.version}</b>
                  {proposalNext ? `, with next action “${proposalNext}”.` : "."}
                </p>
                {proposalObjective ? (
                  <dl className="fld-room-facts">
                    <div className="fld-room-fact">
                      <dt>Objective</dt>
                      <dd>{proposalObjective}</dd>
                    </div>
                  </dl>
                ) : null}
              </div>
            </section>

            {/* The corridor: the authorization decision lives on the edge. */}
            <section className="fld-room-corridor" aria-label="Authorization decision">
              <div className="fld-room-decision">
                <Label>Authorization decision · traveling edge</Label>
                <div className="fld-room-edge-run" aria-hidden="true">
                  <span className="fld-room-edge-seg" data-live={latched} />
                  <span className="fld-room-edge-center">
                    {latched ? (armed ? "Armed" : "Verified") : "Authorization"}
                  </span>
                  <span className="fld-room-edge-seg" data-live={latched} />
                </div>
                <p className="fld-narrative">
                  This room inherits <b>scope</b>, not authority, from the record
                  you are reading. It performs the existing canonical activation
                  gate — the same server action, explicit human-authorization
                  requirement, and persisted decision provenance as Review &amp;
                  Activate. Opening or closing this room changes nothing until an
                  authorized human commits the traversal at the edge.{" "}
                  {latched
                    ? armed
                      ? "Authorization verified and decision composed — the traversal is armed."
                      : "Authorization verified at the gate — compose the recorded decision."
                    : "This record reads as Proposed — verify human authorization at the gate to compose the decision."}
                </p>
                <label
                  className="fld-room-gate"
                  data-verified={latched}
                >
                  <input
                    ref={authRef}
                    type="checkbox"
                    name="activation_authorized"
                    value="authorized"
                    required
                    disabled={instrumentBusy}
                  />
                  <span>
                    <span className="fld-room-gate-title">
                      Verify human authorization
                    </span>
                    <span className="fld-room-gate-copy">
                      I have reviewed this proposal and authorize its transition
                      from Proposed to Active without changing its stable fields.
                    </span>
                  </span>
                </label>
              </div>

              <div className="fld-room-commit-rail" aria-live="polite">
                {pending && !reconcileFailed ? (
                  <p className="fld-room-msg fld-room-msg-pending">
                    Recording the authorization decision…
                  </p>
                ) : null}
                {reconciling ? (
                  <p className="fld-room-msg fld-room-msg-pending">
                    Authorization recorded. Reconciling with the authoritative
                    Field reconstruction…
                  </p>
                ) : null}
                {state.error && !reconciling ? (
                  <p className="fld-room-msg fld-room-msg-error" role="alert">
                    {state.error}
                  </p>
                ) : null}
                <div className="fld-room-traverse">
                  <button
                    type="submit"
                    className="fld-room-commit"
                    disabled={!armed || instrumentBusy || reconcileFailed}
                  >
                    <span aria-hidden="true">{armed ? "▸" : "·"}</span>
                    {pending
                      ? "Recording the traversal…"
                      : reconciling
                        ? "Reconciling with the Field…"
                        : armed
                          ? "Commit traversal · Proposed → Active"
                          : "Verify and compose to arm"}
                  </button>
                  {reconcileFailed ? (
                    <>
                      <button
                        type="button"
                        className="fld-ctl"
                        onClick={onRetry}
                      >
                        Retry authoritative reconstruction
                      </button>
                      <a className="fld-link" href={canonicalHref}>
                        Open in workspace
                        <span aria-hidden="true">→</span>
                      </a>
                    </>
                  ) : null}
                </div>
                {reconcileFailed ? (
                  <p
                    className="fld-room-msg fld-room-msg-error"
                    role="alert"
                    style={{ marginTop: 10 }}
                  >
                    The authorization was recorded by the canonical path, but this
                    Field has not confirmed the record as Active. Mutation success
                    and Field projection reconciliation are separate facts — do
                    not treat an unconfirmed record as transitioned. This usually
                    means the Field read is stale; retry the reconstruction.
                  </p>
                ) : null}
              </div>
            </section>

            <section className="fld-room-pole" data-kind="destination">
              <div
                className="fld-node"
                data-reachable="true"
                aria-hidden="true"
              >
                <span className="fld-node-dot" />
                Active
              </div>
              <div className="fld-room-pole-body">
                <Label dim>Reaching node · where the record lands</Label>
                <p className="fld-room-pole-copy">
                  On a confirmed traversal this record re-reads as{" "}
                  <b>Active</b> at <b>v{work.version + 1}</b> in this project,
                  under the same stable fields.
                </p>
              </div>
            </section>
          </div>

          {/* The active working plane: the recorded decision. */}
          <section className="fld-room-plane">
            <Label dim>Working plane · the recorded decision</Label>
            <div className="fld-room-row" data-locked={!latched}>
              <span className="fld-room-tag">Authorization rationale</span>
              <div className="fld-room-control">
                <textarea
                  name="rationale"
                  required
                  maxLength={4000}
                  rows={4}
                  disabled={instrumentBusy || !latched}
                />
                <span className="fld-room-locknote">
                  {latched
                    ? "Records why the authorized human approves this activation."
                    : "Unlocks once human authorization is verified at the gate."}
                </span>
              </div>
            </div>
            <div className="fld-room-row" data-locked={!latched}>
              <span className="fld-room-tag">Decision basis</span>
              <div className="fld-room-control">
                <textarea
                  name="decision_basis"
                  required
                  maxLength={4000}
                  rows={4}
                  disabled={instrumentBusy || !latched}
                />
                <span className="fld-room-locknote">
                  {latched
                    ? "Records the basis on which the transition is authorized."
                    : "Unlocks once human authorization is verified at the gate."}
                </span>
              </div>
            </div>
          </section>

          {/* The provenance plane: what a committed traversal records. */}
          <section className="fld-room-register">
            <Label dim>Provenance plane · persisted decision provenance</Label>
            <p className="fld-fine">
              On commit, the authenticated human records a lifecycle event with
              role <span className="fld-mono">authorization</span> and authority{" "}
              <span className="fld-mono">human_owner</span> (Engineering Work
              activation gate). Action actor and decision actor are the same
              authenticated human, persisted in separate fields. Record changed{" "}
              {stamp(work.updatedAt, false)}.
            </p>
          </section>
        </form>
      </div>
    </div>
  );
}