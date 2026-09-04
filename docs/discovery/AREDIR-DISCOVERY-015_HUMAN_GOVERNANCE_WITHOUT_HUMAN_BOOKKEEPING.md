# AREDIR-DISCOVERY-015 — Human Governance Without Human Bookkeeping

| Field | Value |
| --- | --- |
| **Identifier** | AREDIR-DISCOVERY-015 |
| **Type** | Research / Discovery — responsibility-boundary synthesis |
| **Status** | Complete — architecture synthesis; no implementation authorized |
| **Review date** | 2026-09-03 |
| **Repository baseline** | `main` at `0aac952f26bd10d69cc7df173dc5e7c637c48c82` |
| **Trigger** | Architectural problem: preserving meaningful human authority over governed engineering decisions without requiring humans to manually construct every auditable record surrounding those decisions |
| **Outcome** | Existing architecture substantially supports the direction; responsibility boundaries are synthesized here; integration and capture ingress gaps remain explicitly deferred |
| **Depends on** | ENGINEERING-WORK-LIFECYCLE-UPDATE-001, EVIDENCE_LIFECYCLE_PATTERN, AREDIR-DISCOVERY-012, AI_GOVERNANCE, ENGINEERING-WORK-REPOSITORY-REFERENCE-CONTRACT |
| **Synthesis hub** | [PRODUCT-ARCHITECTURE-001](./PRODUCT-ARCHITECTURE-001_PRODUCT_OPERATIONAL_ARCHITECTURE_DIRECTION_SYNTHESIS.md) — use for full architecture map; this record owns **governance/capture responsibility boundary only** |
| **Related** | [AREDIR-DISCOVERY-014](./AREDIR-DISCOVERY-014_OPERATIONAL_CONTROL_ENVIRONMENT_AND_WORK_VISUALIZATION_PRINCIPLES.md) — presentation of authority chain and progressive disclosure |

---

## 0. Scope and documentation-set role

This discovery establishes the **responsibility boundary** between human judgment/authorization and system or agent capture, persistence, and provenance.

It does **not** re-establish product operational architecture — see **[PRODUCT-ARCHITECTURE-001](./PRODUCT-ARCHITECTURE-001_PRODUCT_OPERATIONAL_ARCHITECTURE_DIRECTION_SYNTHESIS.md)**.

It does **not** design visualization — see **[AREDIR-DISCOVERY-014](./AREDIR-DISCOVERY-014_OPERATIONAL_CONTROL_ENVIRONMENT_AND_WORK_VISUALIZATION_PRINCIPLES.md)** for how authority legibility and "review and decide" presentation follow from this boundary.

**Scope:** Governed **engineering operations within Projects** — not company-wide governance of all organizational decisions.

## 1. Status and authority boundary

This record **synthesizes committed repository authority**. It does not:

- create a parallel governance or audit subsystem;
- authorize schema, UI, or agent-autonomy changes;
- supersede ENGINEERING-WORK-LIFECYCLE-UPDATE-001, DISCOVERY-012, or promoted governance patterns;
- promote hypotheses to requirements.

Labels:

| Label | Meaning |
| --- | --- |
| **Established** | Supported by committed canonical records and/or implemented semantics |
| **Supported extension** | Consistent with established architecture; not yet fully operationalized |
| **Integration gap** | Architecture exists; external or cross-boundary capture incomplete |
| **Hypothesis** | Requires validation before adoption |
| **Deferred** | Explicitly excluded pending separate authorization |

---

## 2. Executive conclusion

**Aredir already has sufficient core architecture** to support **human governance without human bookkeeping**, provided implementation respects existing models rather than inventing parallel ones.

The repository establishes:

1. **Separate decision roles** — observation, recommendation, investigation, adjudication, authorization, execution — with enforced invariants (recommendation cannot claim authority).
2. **Append-only Engineering Work history** as the primary governed decision and lifecycle record.
3. **Action actor ≠ decision actor** with recorded authority types.
4. **Decision basis references** linking history events, repository references, rules, and external refs.
5. **Operational Focus precedent** — human authorization event → atomic persistence of current selection + append-only history → derived projection.
6. **AI/agents as non-authoritative preparers** unless explicitly authorized through governed events.

What remains **insufficiently explicit or operational**:

- **Ingress** for externally produced evidence (scripts, runbooks, agents) without operator re-entry.
- **Cross-work evidence lineage** (`based_on_event_id` same-work FK).
- **When manual rationale is truly required** versus when structured evidence + explicit authorization suffice.
- **Decision-review experience architecture** ("review and decide" vs "document everything").
- **Observation → governed evidence promotion** without treating every observation as persisted product state.

**Central proposition evaluation:**

> *Capture may be automated; authority may not be inferred from capture.*

**Verdict:** **Supported extension**, partially **established in implementation invariants** (e.g. recommendation cannot claim authority; system persists before/after state on authorization; system actors labeled distinctly). Canonical detailed treatment in **this record**; concise cross-reference in PRODUCT-ARCHITECTURE-001 §4.4.

### 2.1 Canonical principles (this discovery)

These formulations are **supported by committed evidence** as architectural direction. They are **not** company standards until governed promotion.

| Principle | Meaning |
| --- | --- |
| **Human governance does not require human data entry** | Humans remain responsible for meaningful judgment and **authorization**. The system may capture mechanically knowable provenance — actors, timestamps, before/after state, history append, evidence links — without the human re-entering those facts. |
| **Capture may be automated; authority may not be inferred from capture** | Recording evidence, recommendations, or execution context does **not** constitute acceptance of operational state. Authorization requires explicit governed events with distinguishable provenance. |

---

## 3. Canonical records reviewed (committed)

| Domain | Records |
| --- | --- |
| Engineering Work lifecycle | ENGINEERING-WORK-LIFECYCLE-UPDATE-001, `engineering-work-provenance.ts`, `engineering-work-history-persistence.ts` |
| Evidence | EVIDENCE_LIFECYCLE_PATTERN, ENGINEERING-WORK-REPOSITORY-REFERENCE-CONTRACT |
| Governance | AI_GOVERNANCE, ARCHITECTURE_GOVERNANCE, ENGINEERING_GOVERNANCE (referenced) |
| AI / agents | WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN, HUMAN_AI_ADVISOR_WORKSPACE_PATTERN, AREDIR-DISCOVERY-013 |
| Operational Focus | AREDIR-DISCOVERY-012, PROJECT-UX-006, `operational-focus-persistence.ts` |
| Project / EW authority | AREDIR-DISCOVERY-009 through -011 |
| Operational experience | OPERATIONAL-EXPERIENCE-001 |
| Architecture synthesis | [PRODUCT-ARCHITECTURE-001](./PRODUCT-ARCHITECTURE-001_PRODUCT_OPERATIONAL_ARCHITECTURE_DIRECTION_SYNTHESIS.md) |

---

## 4. Existing governance model (committed)

### 4.1 Engineering Work as governed record

| Concern | Authority | History |
| --- | --- | --- |
| Lifecycle state | Work projection | Append-only transition events |
| Next action, outcome, condition | Work projection | `operational_update` with prior/resulting columns |
| Final disposition | Set at Complete | Preserved in history |
| Decision provenance | History row | `decision_role`, actors, authority, basis, rationale |
| Recommendations | History only (`recommended_state`; no transition) | Linked by `based_on_event_id` to authorization |

### 4.2 Evidence in Aredir

| Kind | Nature | Authority |
| --- | --- | --- |
| Repository reference | Read-only citation metadata | Repository-authoritative source; Aredir records citation + review status |
| Decision basis reference | Pointer in history | Supports decision; not decision itself |
| Observation (pattern) | Raw fact | Not automatically knowledge or authority |
| Evidence (pattern) | Selected observation with provenance | Informs interpretation; not authorization |

Evidence **does not constitute operational authority**. Verification of repository references is a **human review act** recorded through governed maintenance (status change requires decision basis when verifying/stale/missing).

### 4.3 AI / agent boundaries (committed)

From AI_GOVERNANCE and EW-LIFECYCLE-UPDATE-001:

- Application owns facts; AI does not invent authoritative facts at runtime.
- Assessments/recommendations are not decisions.
- Agents may execute scoped implementation work under engineering standards.
- Autonomous lifecycle decisions, delegation evaluation, and policy engines are **excluded**.
- Agents may recommend focus; **humans authorize** focus (DISCOVERY-012).

### 4.4 Operational Focus precedent

DISCOVERY-012 + implementation establish the template:

```text
Human authorization (explicit selection command)
    → atomic write: current selection + focus event
    → derived operational focus projection (query-time eligibility)
    → append-only focus history (including system invalidation on lifecycle)
```

System may invalidate focus on lifecycle rules **without claiming human deselection**. Agents may recommend; they do not establish focus authority in baseline.

---

## 5. Human-versus-system responsibility matrix

| Information / action | Primary responsibility | Notes |
| --- | --- | --- |
| Timestamp (`occurred_at`) | **SYSTEM-CAPTURED** | Server default on history insert |
| Session user identity | **SYSTEM-CAPTURED** | Better Auth session → human actor |
| Prior/resulting field values on mutation | **SYSTEM-CAPTURED** | CTE reads current projection before update |
| Optimistic concurrency version | **SYSTEM-CAPTURED** | Enforced server-side |
| Lifecycle transition validity | **SYSTEM-CAPTURED** | Graph enforcement in persistence layer |
| Repository artifact body/content | **REPOSITORY EVIDENCE** | Not ingested by baseline contract |
| Repository reference metadata | **HUMAN-AUTHORIZED** (link/maintain) | Requires human rationale on add/maintain in current UI |
| Reference status `verified/stale/missing` | **HUMAN-AUTHORIZED** | Requires decision basis summary on status change |
| Agent recommendation record | **AGENT-PREPARED** | `decision_role: recommendation`; no authority |
| Recommended lifecycle state | **AGENT-PREPARED** | Non-authoritative until authorization |
| Authorization / lifecycle acceptance | **HUMAN-AUTHORIZED** | Explicit governed conversation (Activate, Operate, Complete, Transition) |
| Operate update rationale | **HUMAN-PROVIDED** (current UI) | Required nonblank in forms and server validation |
| Complete rationale + basis | **HUMAN-PROVIDED** (current UI) | Both required for completion authorization |
| Condition rationale (when condition set) | **HUMAN-PROVIDED** | Required when condition nonblank |
| Focus selection | **HUMAN-AUTHORIZED** | Explicit command; rationale optional in persistence API |
| Focus invalidation on lifecycle | **SYSTEM-CAPTURED** | System rule with linked lifecycle cause |
| Continuation / attention / focus projection | **DERIVED PROJECTION** | Query-time; not authority |
| External script/runbook output | **UNRESOLVED ingress** | Not yet governed capture into history |
| Cross-work recommendation basis | **UNRESOLVED** | Same-work FK on `based_on_event_id` |
| AI-generated rationale text | **AGENT-PREPARED** | Must remain distinguishable; stored with agent provenance metadata |
| Policy/delegated authority evaluation | **UNRESOLVED** | Authority types exist; enforcement engine deferred |

---

## 6. Core architectural questions — answers

### 6.1 What must the human actually do?

**Minimum meaningful human governance actions (established):**

| Action class | Human requirement |
| --- | --- |
| Lifecycle state change | Explicit authorization conversation with authenticated session |
| Work completion | Authorization with outcome, disposition, rationale, decision basis |
| Operational Focus selection | Explicit selection/clear/replace command |
| Repository reference status review | Explicit maintain action when changing verification status |
| Recommendation acceptance | Separate authorization event (or lifecycle transition) referencing recommendation via `based_on_event_id` |

**Not required for governance (established or system-captured):**

- Manually entering timestamps, prior/resulting values, or actor identifiers when using governed conversations.
- Manually constructing history row structure — server creates append-only events atomically with projection update.

**Currently required but architecturally re-evaluable (integration/bookkeeping tension):**

- Nonblank **update rationale on every Operate** — required by UI and server (`engineering-work-actions.ts`); not inherently required by provenance model for all field changes if decision basis references sufficient evidence.
- Manual **repository reference creation** when evidence already exists externally — citation metadata still needs governed linking, but body transport is correctly excluded.

### 6.2 What bookkeeping can the system perform?

**Established system responsibilities after human initiates governed action:**

- Capture action/decision actors from session or declared agent/system identity.
- Snapshot all mutable fields before/after in history columns.
- Increment version; enforce concurrency.
- Append history atomically with projection update.
- Link authorization to prior recommendation via `based_on_event_id` (same Work).
- Record agent provenance metadata without granting authority.
- Invalidate Operational Focus on lifecycle rules with system invalidation events.
- Set review timestamps on reference status changes server-side.

**Supported extension (not fully operationalized):**

- Pre-populate decision basis references from known evidence captures.
- Auto-attach script/run output as observation/evidence ingress → history reference.
- Prepare decision surfaces with assembled evidence + recommendation before human authorization.

### 6.3 What can AI/agents prepare?

**Established as architecturally permissible:**

- Summaries, assessments, recommendations (`decision_role: recommendation`).
- Proposed rationale text (must not be indistinguishable from human authorization).
- Proposed state in `recommended_state`.
- Evidence synthesis surfaced as workspace objects (WORKSPACE_FIRST_AI; HUMAN_AI_ADVISOR pattern).
- Scoped code/doc execution under engineering standards (not operational authority).

**Must remain distinguishable until authorized:**

- Recommended state vs resulting state.
- Agent decision actor vs human decision actor on authorization.
- Recommendation rows without `authority` claim (enforced in `engineeringWorkDecisionProvenance`).

### 6.4 What constitutes authorization?

**Architectural property:** An **explicit governed write** that claims `decision_role: authorization` (or equivalent lifecycle transition provenance) with human decision actor and authority context (`human_owner` baseline), performed through an authenticated, validated domain command — not inferred from capture, recommendation presence, or automation alone.

Examples in repository (not UI gestures):

- `persistEngineeringWorkCompletionAndHistory` requires authorization provenance.
- Operational Focus human commands require decision actor + authority.
- Lifecycle transitions require authorization rationale in Phase B conversations.

**Not authorization:**

- Recording a recommendation.
- Adding repository reference metadata (governed citation, not lifecycle acceptance).
- System invalidation events (system rule authority, not human decision).
- Execution by system action actor applying human-authorized transition (execution role distinct from decision).

### 6.5 What happens after authorization?

**Established pattern:**

```text
Human authorization (governed command)
    → validate state/version/eligibility
    → update Work projection (or Focus current selection)
    → append history with full provenance
    → recompute derived projections (continuation, attention, focus)
```

System **must not** skip history append on successful projection mutation (atomic CTE pattern).

### 6.6 Capture automatic while authority human?

**Supported extension / partially established.**

Implementation enforces:

- Recommendations cannot claim authority.
- Authorization requires explicit provenance path.
- Capture of actors, timestamps, before/after state is automatic on governed writes.

Missing:

- Explicit canon statement of the principle.
- Ingress paths for external capture without human re-entry.
- UX that separates "review prepared decision" from "author all fields."

### 6.7 Is explicit human rationale always required?

**Established requirements:**

| Event | Rationale | Decision basis |
| --- | --- | --- |
| Recommendation / adjudication / authorization (provenance constructor) | Required | Basis summary required for those roles |
| Complete | Required | Basis summary required |
| Operate | Required (current implementation) | Optional in form |
| Focus selection | Optional in API | Not required in baseline |
| Repository reference add/maintain | Required | Basis required on verification status change |

**Conclusion:** Architecture **does not** require prose rationale for every governed operation universally — but **current Operate UI requires it for all operational updates**, which may impose bookkeeping beyond what governance strictly needs when evidence references are already structured.

**Supported direction:** Rationale requirement should be **proportional to decision significance and evidence availability** — not eliminated, but not duplicated when decision basis references sufficient auditable evidence. Changing this requires governed UX/policy work, not silent relaxation.

### 6.8 How should provenance be captured?

**Use existing models (established):**

- `workspace_engineering_work_history` for decisions, transitions, operational updates.
- `decision_basis.references[]` with kinds: `history_event`, `repository_reference`, `external_reference`, `rule`.
- `provenance_metadata.agent` for AI execution context.
- Operational Focus event stream (parallel pattern, not merged into EW history table).
- Repository references for durable external evidence citations.

**Do not create** a parallel audit log. External observations should **promote** into governed captures referenced by history — **hypothesis** for ingress design; not implemented on `main`.

### 6.9 Agent workflow (future) — architectural fit

```text
Engineering Work context (authorized)
    → agent performs bounded work (execution / recommendation)
    → agent returns evidence + recommendation history event
    → human reviews (authorization conversation)
    → human authorization persists resulting state + links based_on_event_id
```

| Step | Support |
| --- | --- |
| Work-scoped context | **Established** |
| Recommendation history event | **Established** |
| Agent provenance metadata | **Established** |
| Human authorization separate | **Established** |
| Automatic evidence ingress from agent output | **Integration gap** |
| Cross-work lineage | **Unresolved** (same-work FK) |
| Autonomous authorization | **Rejected** |

### 6.10 UX architecture (no UI design)

**Supported direction:** Experience should orient toward **"review and decide"** over **"manually document everything"** — consistent with OPERATIONAL-EXPERIENCE-001, PROJECT-UX-004 progressive disclosure, and WORKSPACE_FIRST_AI. **Presentation consequences** (operating surface vs inspector, visible authority chain) are in [DISCOVERY-014](./AREDIR-DISCOVERY-014_OPERATIONAL_CONTROL_ENVIRONMENT_AND_WORK_VISUALIZATION_PRINCIPLES.md) §5 and §10.

A prepared **decision surface** (architectural concept only) may assemble:

- operational question
- current state
- evidence references
- recommendation (if any)
- proposed change
- consequences
- authority required

Human performs **authorization/rejection/selection** — system persists record.

**Runtime gap:** Current forms require substantial manual narrative (especially Operate), and history is not yet composed as a decision-review surface.

---

## 7. Distinction tests (repository verdict)

| Distinction | Established? | Evidence |
| --- | --- | --- |
| Evidence ≠ decision | **Yes** | EVIDENCE_LIFECYCLE_PATTERN; repository refs read-only |
| Recommendation ≠ authorization | **Yes** | EW-LIFECYCLE-UPDATE-001 §9; provenance enforcement |
| Capture ≠ authority | **Partial** | Code invariants; not explicit canon |
| Execution ≠ authorization | **Yes** | Separate decision roles; system action actor may execute authorized transition |
| Action actor ≠ decision actor | **Yes** | Schema + EW-LIFECYCLE-UPDATE-001 §7–8 |
| System rationale ≠ human rationale | **Partial** | Actor typing exists; UI does not always surface distinction |
| Proposed state ≠ accepted state | **Yes** | `recommended_state` vs `resulting_state` |
| Current projection ≠ history | **Yes** | Parent row + append-only history |
| Technical capability ≠ governance permission | **Yes** | AI_GOVERNANCE; DISCOVERY-013 |
| Automation ≠ autonomy | **Yes** | Explicit exclusions in lifecycle package |
| Human governance ≠ human data entry | **Partial** | Architecture supports separation; Operate UX and external ingress limit realization |

---

## 8. Failure-mode analysis

| Failure mode | Prevention today | Residual risk |
| --- | --- | --- |
| **Rubber-stamp governance** | Separate recommendation + basis requirement | UI may not surface evidence depth; human can authorize with minimal review |
| **Hidden autonomy** | No autonomous lifecycle; recommendation cannot claim authority | Delegated policy engine not implemented — future risk if added without guards |
| **Manual audit bureaucracy** | Auto before/after, actors, timestamps on governed writes | Operate requires rationale always; external evidence manually re-entered |
| **Authority laundering** | Agent metadata schema; recommendation vs authorization split | Agent-prepared rationale could be copy-pasted into authorization without review discipline |
| **Duplicate truth** | Single EW history model; focus uses parallel but scoped events | Risk if new "audit subsystem" added |
| **Untraceable automation** | History append atomic with mutation; action actor required | External scripts outside Aredir not captured automatically |
| **Narrative inflation** | Decision basis can reference evidence | Operate/completion always require prose rationale in UI |

---

## 9. Architectural gaps and tensions

1. **Ingress gap:** Governed engineering often produces evidence outside Aredir (runbooks, CI, agents); architecture cites repository refs but lacks committed **observation → governed capture → history reference** ingress on `main`.
2. **Same-work lineage constraint:** Cross-work recommendation→authorization chains blocked by FK design.
3. **Rationale proportionality:** Provenance model allows structured basis; UI requires narrative more broadly than architecture strictly demands.
4. **Doc/runtime lag:** ENGINEERING-WORK-LIFECYCLE-UPDATE-001 defers Repository Evidence Authoring; partial authoring exists in codebase — reconcile in separate verification work.
5. **Decision-review surface:** Architecture supports chain; UX still form-centric documentation.
6. **Dogfooding gap:** Procedures like AREDIR-DB-008 require human phase authorization but evidence lives in operator/session context — operator acts as integration layer (observable from runbook structure, not product capture).

---

## 10. Explicit deferrals

Unless separately authorized:

- New governance UI / decision-review UI
- Schema changes, new history/evidence tables, audit subsystem
- Autonomous or delegated agent authorization
- Cross-work lineage schema change
- Prompt-generation / automated agent execution product paths
- Personal approval queues, notifications
- Company-wide governance expansion
- Relaxing rationale requirements without governed policy

---

## 11. Discovery outcome

**Complete — responsibility-boundary synthesis with explicit deferrals.**

Existing components support human governance without human bookkeeping when implementation reuses EW history, decision basis, and Operational Focus patterns — not parallel audit or governance stores.

This discovery answered the architectural question. Downstream ingress, UX, and policy work are **separate governed packages** (see §12 and PRODUCT-ARCHITECTURE-001 §11).

---

## 12. Recommended next actions

1. **Reuse EW history + decision basis** for any Evidence Capture ingress — no parallel system.
2. **Author implementation discovery** for external capture ingress (scripts, agent output) as promotion-to-governed-capture, not capture-everything.
3. **Evaluate Operate rationale policy** in a governed UX/policy package — proportional rationale vs narrative inflation.
4. **Design decision-review surface** architecturally (PROJECT-UX lineage) — assemble evidence + recommendation before authorization.
5. **Reconcile** Repository Evidence Authoring deferral in EW-LIFECYCLE-UPDATE-001 with current codebase state in separate verification EW.

---

## 13. Downstream work preserved (closure matrix)

| Item | Classification |
| --- | --- |
| Evidence/capture ingress | Future implementation candidate |
| Rationale proportionality policy | Future UX/governance candidate |
| Decision-review surface | Future PROJECT-UX candidate (presentation: DISCOVERY-014) |
| Cross-work evidence lineage | Explicitly deferred |
| Repository Evidence Authoring verification | Future verification EW |
| Autonomous/delegated agent authority | Explicitly deferred |
| New audit/governance tables | Rejected — reuse EW history |

Completing this discovery does **not** close downstream implementation; it separates architectural resolution from delivery.

---

*End of AREDIR-DISCOVERY-015*
