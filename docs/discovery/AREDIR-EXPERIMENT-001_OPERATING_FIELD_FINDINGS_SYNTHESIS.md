# AREDIR-EXPERIMENT-001 — Operating Field Findings Synthesis

| Field | Value |
| --- | --- |
| **Identifier** | AREDIR-EXPERIMENT-001 |
| **Type** | Experimental-discovery findings synthesis (not an architecture package) |
| **Status** | Complete — durable learnings preserved; no promotion |
| **Date** | 2026-08-27 |
| **Sources** | Operating Field prototype implementation, original-designer retrospective, independent audit, human/operator evaluation |
| **Scope** | Preserve durable architectural and interaction learnings only |
| **Outcome** | Findings preserved; no visual promotion; one next experiment recommended; no implementation authorized |

---

## 1. Status and authority

This record preserves the durable learnings of the disposable **Aredir Operating Field**
experiment. It is **not** a promotion of the Operating Field into canonical UX
architecture, **not** an architecture package, and **not** an authorization to
implement. Production code and prototype code are unchanged.

Where these findings reference established concepts, the canonical authority is
[PROJECT-UX-004](./PROJECT-UX-004_AUTHENTICATED_VISUAL_SYSTEM_AND_OPERATING_ENVIRONMENT_ARCHITECTURE.md),
[AREDIR-DISCOVERY-012](./AREDIR-DISCOVERY-012_OPERATIONAL_FOCUS_PERSISTENCE_AND_LIFECYCLE_ARCHITECTURE.md),
[AREDIR-DISCOVERY-011](./AREDIR-DISCOVERY-011_ENGINEERING_WORK_PRIORITIZATION_AND_OPERATIONAL_SELECTION_SEMANTICS.md),
[WORKSPACE-OPERATIONAL-002](./WORKSPACE-OPERATIONAL-002_WORKSPACE_CONTINUATION_CONTRACT.md), and
[ENGINEERING-WORK-LIFECYCLE](../engineering/ENGINEERING-WORK-LIFECYCLE.md). This record restates
nothing that those authorities already define; it records what the experiment added.

---

## 2. Durable findings

Each finding below is supported by the combined experiment, retrospective, audit, and operator
evidence. None of them depends on the prototype's visual styling surviving, and none of them is
a promotion of the prototype itself. They are presented in the experiment's own vocabulary;
mapping any of them into canonical experience (Environment / Surface / Inset, inventory,
inspector, history, command) is a separate, unperformed decision.

### 2.1 Lifecycle as an invariant spatial axis across Engineering Work scopes

Engineering Work lifecycle can act as a single, stable spatial axis that stays **invariant in
order and meaning** as the operator narrows from Project to Engineering Work. At Portfolio
altitude the axis is subdivided by owning Project; at Project altitude the same axis shows only
that Project's records; a record entered from it remains identifiable against that axis. Because
the axis does not change, the operator keeps a stable mental map through each scope change. This
is a spatial idea, not a lifecycle authority: the axis still encodes the canonical
`ENGINEERING_WORK_STATES` order and valid transitions from
[ENGINEERING-WORK-LIFECYCLE](../engineering/ENGINEERING-WORK-LIFECYCLE.md).

### 2.2 Altitude as population narrowing: Portfolio → Project → Engineering Work

Descending altitude was experienced as **narrowing the population** (which records are shown)
rather than restyling the region. Portfolio shows the full set; Project shows one Project's set;
Engineering Work shows one record within a surviving sibling set. Keeping the axis and only
changing the population means the operator is doing *the same kind of reading* at each step. This
contrasts the prototype phrase "Portfolio → Project → Engineering Work" with altitude-as-style,
and it is what made the transition legible without re-reading a heading.

### 2.3 Parent context compresses rather than disappears during descent

The strongest spatial learning: when descending, the parent scope **compressed into a dense
summary band** instead of vanishing. The operator never loses the frame they came from; it
survives as a live, terse instrument. This is an operational expression of the canonical
persistent-context principle (Project context persists across Work routes) and of PROJECT-UX-004
invariant 3 ("descending adds context; it never discards… ancestry"). The prototype demonstrates
one concrete way that compression can be experienced as a band rather than a breadcrumb.

### 2.4 Lifecycle position may encode authoritative state; ordering must remain deterministic and explicitly non-ranking

Within a lifecycle column, **position encodes nothing** — the column header encodes the state, and
records are ordered by identifier, stated explicitly to be **not** priority, recency, or
importance. This honors the constraint that ordering must never manufacture selection, focus, or
ranking. The learning: a *deterministic, declared* presentation order is safe and honest; any
underspecified order (recency, insertion, `priority`) is not. This mirrors and operationalizes
the existing constraints in [AREDIR-DISCOVERY-012](./AREDIR-DISCOVERY-012_OPERATIONAL_FOCUS_PERSISTENCE_AND_LIFECYCLE_ARCHITECTURE.md).

### 2.5 Operational Focus, Continuation, and Attention remain independent channels

The experiment kept Operational Focus, Continuation, and Attention as **separately derived
channels** that can agree, disagree, or all be empty — never merged into one badge set. This is
already canonical ([PROJECT-UX-004 §11](./PROJECT-UX-004_AUTHENTICATED_VISUAL_SYSTEM_AND_OPERATING_ENVIRONMENT_ARCHITECTURE.md));
the experiment confirmed it is not merely a documentation rule but a workable presentation
structure, provided each channel has its own lane and provenance.

### 2.6 Human-authored authority must not be visually quieter than derived projections

A concrete failure the experiment exposed: **Operational Focus — a human-authored, shared Project
authority — was underweighted in the prototype to a small glyph and a chip lane**, while derived
projections (Continuation, Attention) were given prominent plates. Visually downgrading
human-authorized truth below deterministic projections inverts the authority hierarchy that
[AREDIR-DISCOVERY-012](./AREDIR-DISCOVERY-012_OPERATIONAL_FOCUS_PERSISTENCE_AND_LIFECYCLE_ARCHITECTURE.md)
establishes. Durable rule: human-authored authority must never be perceptually quieter than the
projections derived from it.

### 2.7 Authority should have a perceptible spatial boundary

The experiment proposed three authority classes that should be spatially distinguishable:
Aredir-owned truth, referenced/external authority, and human-decision authority. Its thethered
"authority boundary" metaphor made the boundary feel spatial — evidence crossing a hairline
outward toward the owning repository. Durable learning: authority distinction is communicated by
**position and boundary**, not color alone, consistent with
[PROJECT-UX-004 §10](./PROJECT-UX-004_AUTHENTICATED_VISUAL_SYSTEM_AND_OPERATING_ENVIRONMENT_ARCHITECTURE.md).

### 2.8 Current truth stays perceptually forward; historical truth is subordinate

The experiment tested representing the authoritative present as the "front" plane with recorded
history receding in luminance, scale, and blur, and visibly marking a historical plane as "not
current." Durable learning: present truth must read as forward and historical truth as subordinate
in **depth**, not merely by disclosure, supporting the canonical current-truth-outranks-history
invariant.

### 2.9 Capability honesty: implemented, unavailable, absent, and unknown remain distinguishable

The experiment explicitly separated what the running system **can** do (implemented transitions,
lit), what is **documented but not implemented** (dashed, offered nowhere), what is **absent**
(empty states rendered truthfully), and what is **unknown** (a user cancel/supersede path not
implemented). Durable learning: the UI must never imply an authority the system does not have, and
must distinguish "not here" from "failed" from "not implemented" — echoing
[PROJECT-UX-004 §17](./PROJECT-UX-004_AUTHENTICATED_VISUAL_SYSTEM_AND_OPERATING_ENVIRONMENT_ARCHITECTURE.md).

### 2.10 Absence should be sized to operational consequence, not available space

The experiment rendered authoritative absence ("no continuation", "no recorded provenance", an
empty lifecycle column) at a size proportional to its operational meaning rather than hiding it
in a footnote. Durable learning: honest absence is a first-class state that should occupy space in
proportion to what a reasonable operator must know, not in proportion to the space that happens to
be free.

### 2.11 Field → Instrument

The experiment's central conceptual proposal: a **Field** establishes orientation and
authoritative current truth; an **Instrument** performs a single bounded operation. The Field is
where the operator knows *where* they are and *what is true*; the Instrument is a scoped,
invoked action that never becomes resident chrome or a second navigation surface.

### 2.12 Instruments inherit scope, NOT authority

An Instrument invoked from the Field inherits the **scope** (which Project, which Work) of the
position it was invoked from, but it does **not** inherit or grant authority over lifecycle,
focus, continuation, attention, or ranking. Authority remains with the existing domain/lifecycle
command paths. Durable learning: an instrument's context is its parent scope; its power is exactly
the already-authorized domain action it fronts.

### 2.13 Authoritative mutation remains governed by existing domain/lifecycle rules

The experiment never mutated domain state itself; every operational action deep-linked into the
canonical routes/forms that already own those mutations. Durable learning: a Field can present
truth and invoke operations without becoming a competing writer; human-authorized activation,
completion, review, focus changes, and evidence retain their existing authorization and lifecycle
gates.

### 2.14 "Geometry as the receipt": successful operations reflected through geometry itself

The experiment observed that a successful authoritative operation can be reflected by the Field's
geometry itself — e.g. on activation a Proposed record **relocates to the Active column** — so the
geometric change *is* the confirmation, without a separate confirmation noise. Durable learning
(hypothesis, not proven): where lifecycle position is a spatial axis, the receipt for an
authoritative state change can be the geometry moving. This is plausible but unvalidated for
accessibility and comprehension; it must not be assumed without further testing.

### 2.15 Route / deep-link / Back reconstruction is mandatory before any Field model is real

The prototype used client-local altitude/selection state with no route semantics — refresh, deep
link, and Back did not reconstruct context. PROJECT-UX-004 and PROJECT-UX-008 already make
URL + authoritative server state the reconstruction mechanism. Durable learning: **no Field model
may become real product architecture without route semantics, deep-link/refresh reconstruction,
and Browser Back behavior**, per the canonical requirement. The prototype's spatial value does not
waive this.

### 2.16 Scalability of the manifold remains unresolved

The lifecycle manifold was only exercised against small-N data. Its behavior at larger record and
Project counts — column height, horizontal scroll, cross-Project banding, operator scanning time —
is unknown and untested. Durable learning: the manifold's scalability is an open question and must
be tested beyond small-N data before any investment.

---

## 3. Visual findings — experimental, not canonical

The current visual treatment of the Operating Field is **experimental and non-canonical** and is
**not promoted**. Explicitly classified as non-canonical:

- glow / bloom treatment and radial ambient blooms
- the exact color values (the `--f-live` / `--f-attend` oklch set, graphite ramp)
- the blueprint-grid / vignette background
- the current provenance-well residency on the operating surface
- the current three-pane Engineering Work layout
- the micro-glyph set (`◆ ▸ ▲ ▪ ◷`)
- the animations (descent sweep, breathing perimeter, node pulse)
- the sigil mark
- exact typography sizes
- exact spacing and dimensions

### One preserved visual hypothesis

> A restrained technical field/grid may provide spatial extent and environmental presence
> without carrying domain authority.

**Classification: PROMISING VISUAL-ENVIRONMENT HYPOTHESIS — NOT CANONICAL.**

It remains subject to validation on: accessibility (contrast, AA), light/dark theme behavior,
density, distraction, and operator comprehension. It is retained only as a hypothesis worth
testing, never as an adopted treatment.

---

## 4. Known prototype failures / non-promotions

Captured concisely; none of these is a promotion constraint on canonical architecture, but each
is a real learning about what not to carry forward unmodified:

- **No route semantics** — client-local navigation state; refresh/deep-link/Back do not
  reconstruct context. Blocks any real-world use (§2.15).
- **Current accessibility failures** — micro-glyphs, low-contrast dim labels, and
  color-adjacent state carry load; not AA-validated as designed (§3).
- **Operational Focus underweighted** — human-authored focus visually quieter than derived
  projections; inverts the authority hierarchy (§2.6).
- **Resident provenance well overclaims space** — history occupying a full-width structural band
  puts historical truth forward and crowds current truth, weaker than the canonical collapsed /
  inspector-subordinate history.
- **Work altitude weaker than Portfolio** — the single-record instrument (rail | operate |
  boundary + resident well) is denser and less immediately readable than the Portfolio/field
  manifold (§2.2 weakness).
- **Unbounded collection / scalability issues** — the sibling rail re-introduces an embedded
  collection inside a detail surface; the manifold is untested beyond small-N (§2.16).
- **Missing failure-state behavior** — the Field did not fully exercise the canonical
  transient/structural/authorization/absence failure taxonomy.
- **Identity/context duplication** — hover identity, inspect line, sibling rail, and provenance
  can present the same record identity in several places simultaneously.
- **Prototype visuals are not production authority** — all §3 visual elements are non-canonical
  and must not be treated as adopted.

---

## 5. Next experiment (recommended, not authorized)

Recommend exactly one bounded next experiment:

**Activation Authorization as a Field Instrument.**

- **Purpose:** test whether an existing lifecycle-authoritative workflow can be invoked from
  within a Field without making the operator feel they left the Field.
- **Constraint:** preserve the existing activation authorization and persistence exactly; the
  instrument fronts the canonical, already-authorized activation path and changes no domain rule.
- **Expected conceptual sequence:**
  1. Field shows the Proposed record (e.g. Hydration) in the Proposed lifecycle column.
  2. The operator invokes the Activation Authorization Instrument from that record.
  3. The existing human-authorized activation is performed through the canonical lifecycle/
     authorization path.
  4. The operator returns to the same reconstructable Field position.
  5. The record now appears in the **Active** column as the authoritative result — the geometric
     receipt (§2.14) — confirming the operation through the Field's own geometry.
- The Instrument is **not designed or implemented** in this record. This experiment is disposable,
  must not alter canonical domain authority, and must not begin a wholesale migration.
- **Success signal:** the operator perceives the activation as happening *in* the Field (same
  position, no disorientation), and the relocated record reads as the truthful authoritative
  result.
- **Failure signal:** the operator feels displaced from the Field, or the "geometry as receipt"
  does not read as a confirmation, or the canonical activation path requires so much full-page
  context that a Field-invoked instrument is incoherent.

---

## 6. Final status

- Experimental findings preserved (§2–§4).
- No Operating Field visual design promoted (§3).
- Field → Instrument experiment recommended (§5).
- No implementation authorized.

---

# Checkpoint 2 — Field Iteration Reconciliation (2026-08-29)

> **Subsequent checkpoint, extending — not rewriting — this governing record.**
> The findings in §1–§6 above are historical and preserved unchanged. This section
> records the authenticated experiment-checkpoint review of the subsequent Field
> iteration (the implementation of the Activation Instrument recommended in §5 plus
> its instrument-continuity and register-system refinements). `AREDIR-EXPERIMENT-001`
> remains the governing experiment record. **Nothing in this checkpoint promotes an
> experimental finding to canonical Aredir architecture.**

Classification legend used below: **durable experimental finding** / **promising
hypothesis** / **implementation-specific choice** / **rejected mechanism** /
**still-open requirement**.

---

## 7. Authored human review (evidence, not canonical acceptance)

The latest authenticated human review found the current Operating Field
substantially improved and suitable for an experiment checkpoint. This review is
recorded as **experimental review evidence**; it is not canonical acceptance.
A separate reconciliation was conducted against the canonical authority named in
§1 (PROJECT-UX-004, AREDIR-DISCOVERY-012, AREDIR-DISCOVERY-011,
WORKSPACE-OPERATIONAL-002, UX-008, ENGINEERING-WORK-LIFECYCLE). The categories in
this checkpoint are the reconciler's classification unless stated otherwise.

## 8. Reconciliation of the current Field iteration

No successful prototype choice is assumed canonical. Each principle is classed
against implementation + human-review evidence and the canonical authority.

### 8.1 Orthogonal spatial grammar — DURABLE EXPERIMENTAL FINDING; NON-CANONICAL

- Vertical = altitude / containment (Field → Portfolio → Project → Work).
- Horizontal = operation at the current altitude (instruments engage laterally).
- **Classification:** durable experimental finding. Explicitly **not canonical**;
  the canonical depth model remains Environment / Surface / Inset with an
  orientation band (PROJECT-UX-004), and this grammar is a candidate expression of
  canonical invariant 3, not an adoption of it. No promotion.

### 8.2 Persistent environmental frame — DURABLE FINDING; BAND TREATMENT IMPLEMENTATION-SPECIFIC

- The Field environment (ribbon, compressed bands, baseline) remains perceptually
  stable while the operator descends through compressed ancestor planes; only the
  active stratum changes. This is a working confirmation of §2.3 and canonical
  invariant 3.
- **Classification:** durable experimental finding. The specific band-as-instrument
  treatment is an implementation-specific choice and is not generalized. The
  general route/deep-link/Back reconstruction requirement remains **still-open**
  (see §11.1). The disposable presentation-route contract
  (`?project=` / `?work=` / `?instrument=activate`) is implementation-specific and
  is **not** closure of the mandatory route gap.

### 8.3 Containment geometry — PRINCIPLE DURABLE; DIMENSIONS IMPLEMENTATION-SPECIFIC

- Deeper planes inherit the register and boundary of the frame containing them and
  do not project outside it (the instrument mounts strictly between the rail and
  the authority boundary; the manifold registers to the page guide).
- **Classification:** the containment principle is a durable experimental finding.
  The concrete dimensions (24px / 16px register guides) are implementation-specific
  choices and are not generalized or promoted.

### 8.4 Instrument continuity — DURABLE; CURRENTLY THE STRONGEST FINDING

- **Finding:** an Instrument operates the existing Work representation rather than
  replacing the Work being operated. The current iteration preserves Work identity,
  the sibling rail, the authority/evidence boundary, and provenance while the
  Activation Instrument engages laterally inside the operating region.
- This directly supersedes the earlier failure (synthesis-§5 predecessor) where the
  instrument replaced the whole Work surface and read as another page/form.
- **Classification:** durable experimental finding, well evidenced by
  implementation + human review.

### 8.5 Motion as spatial explanation — PRINCIPLE DURABLE; EXACT TIMING UNRESOLVED

- Motion is scoped to explaining the two spatial relationships: vertical altitude
  transitions and the single horizontal instrument transition.
- **Classification:** principle durable; exact timing unresolved. Human review finds
  the current roughly 210–240ms motion slightly fast. **No timing is tuned in this
  pass**; the exact values remain a **promising hypothesis / unresolved presentation
  hypothesis** requiring further review.

### 8.6 Agent continuity — PROMISING HYPOTHESIS ONLY

- The iteration appears to demonstrate that a second agent can inherit and refine
  the Field's grammar without conventionalizing or broadly redesigning it.
- **Classification: promising hypothesis, not an auditable claim.** The prototype is
  currently untracked in git, so inheritance was observed behaviorally, not via a
  diff-auditable chain. Not asserted as established methodology.

## 9. Removed / superseded mechanisms (rejection ledger)

Recorded so the failed mechanisms are not accidentally reintroduced. These are
captured as **rejected mechanisms**.

### 9.1 AMBIENT ATTENTION · MECHANISM DEMO — REJECTED

- **Primary rejection reason (implementation audit):** it toggled local presentation
  state and fabricated the same ambient-attention visual signal used for real
  Attention, while producing no operator-relevant action and no authoritative state
  change. It therefore implied a present condition/authority the system did not
  have, violating the capability-honesty rule (§2.9; canonical UX-004 §17).
- Do **not** reintroduce a mechanism that demonstrably fabricates an attention
  signal without acting on or reflecting real authority.

### 9.2 Inert persistent project-name pseudo-navigation — REJECTED

- A persistent Project name rendered as an inert pseudo-navigation control implied
  navigation/lifecycle authority it did not carry (capability honesty) and duplicated
  identity already carried by the live compressed bands.
- Do **not** reintroduce inert identity-as-navigation; orientation must come from
  genuinely actionable context, not a non-interactive pseudo-link.

### 9.3 Unlabeled ProjectBand lifecycle micro-strip — REJECTED

- **Correction:** the removed `.fld-strip` did **not** remove or omit Project
  identity. The containing ProjectBand still carried the Project name/posture. What
  was rejected was the **derived lifecycle distribution strip**: it was
  `aria-hidden`, unlabeled and unexplained in-band, redundant with lifecycle
  information available elsewhere, and consequently read as **decorative
  instrumentation rather than understandable telemetry**.
- Do **not** reintroduce a derived micro-strip that is silently present but not
  explainable, especially when redundant with elsewhere-visible lifecycle truth.

### 9.4 Split two-register 72px environmental ribbon — REJECTED

- A 72px header split into two stacked registers diluted the single vertical datum
  and read as two surfaces, weakening the "one environment" claim.
- Do **not** reintroduce a split two-register environmental frame in place of the
  single coherent band.

## 10. Classification summary (Checkpoint 2)

| Principle | Classification |
| --- | --- |
| 1 Orthogonal spatial grammar | Durable experimental finding — non-canonical |
| 2 Persistent environmental frame | Durable finding; band treatment implementation-specific |
| 3 Containment | Durable principle; dimensions implementation-specific |
| 4 Instrument continuity | Durable — currently strongest finding |
| 5 Motion as spatial explanation | Durable principle; exact 210–240ms timing unresolved |
| 6 Removed mechanisms | Rejected (see §9) |
| 7 Agent continuity | Promising hypothesis only |
| General route/deep-link/Back semantics | Still-open (see §11.1) |

## 11. Still-open items

1. **General route / deep-link / Back semantics (§2.15).** The disposable
   presentation-route contract covers cold-load and history reconstruction of two
   altitudes plus one instrument only. The mandatory general requirement is
   **still open**; the new route contract is not closure.
2. **Motion timing (§8.5).** Exact ~210–240ms values unresolved; human review finds
   them slightly fast. No tuning in this pass.
3. **Manifold scalability (§2.16).** Behavior at larger record/Project counts remains
   untested.
4. **Accessibility / visual validation (§3, preserved hypothesis).** The restored
   technical-field hypothesis remains unvalidated for contrast, light/dark behavior,
   density, distraction, and comprehension.
5. **Agent continuity auditability (§8.6).** Untracked prototype; the continuity
   claim could not be diff-audited. A committed snapshot is a prerequisite for making
   this auditable.
6. **Earlier documented failures (§4).** The "Work altitude weaker than Portfolio" and
   resident provenance-well concerns are re-assessed as improved by human review but
   are not canonically resolved.

## 12. Protocol note for this checkpoint

- No canonical architecture document was modified.
- No experimental finding was promoted.
- No implementation was modified, and nothing was committed.
- This checkpoint extends the governing record without rewriting its historical
  findings (§1–§6).
