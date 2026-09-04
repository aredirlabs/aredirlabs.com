# PRODUCT-ARCHITECTURE-001 — Product Operational Architecture Direction Synthesis

| Field | Value |
| --- | --- |
| **Identifier** | PRODUCT-ARCHITECTURE-001 |
| **Type** | Architectural-direction synthesis (reference hub) |
| **Status** | Complete — synthesis only; no implementation authorized |
| **Review date** | 2026-09-03 |
| **Repository baseline** | `main` at `0aac952f26bd10d69cc7df173dc5e7c637c48c82` |
| **Authority** | Synthesizes committed canonical records listed below; does not supersede them |
| **Purpose** | Provide a durable reconciliation hub so discovery, UX, AI, governance, and Engineering Work packages can build on established architecture without re-deriving or contradicting it |
| **Related records** | [AREDIR-DISCOVERY-014](./AREDIR-DISCOVERY-014_OPERATIONAL_CONTROL_ENVIRONMENT_AND_WORK_VISUALIZATION_PRINCIPLES.md) (visual/expression); [AREDIR-DISCOVERY-015](./AREDIR-DISCOVERY-015_HUMAN_GOVERNANCE_WITHOUT_HUMAN_BOOKKEEPING.md) (governance/capture boundary) |

---

## 0. How to use this record

This document is the **primary architectural synthesis / reference hub** for Aredir product operational architecture. It **synthesizes** existing authority. It introduces **no new normative decisions**.

| Label | Meaning |
| --- | --- |
| **Established** | Decided in a cited canonical record on `main` |
| **Supported direction** | Consistent with established records; not yet fully expressed at runtime |
| **Runtime gap** | Architecture exists; product does not yet communicate it clearly |
| **Unresolved** | Explicitly deferred or blocking in prior discovery |
| **Hypothesis** | Not authoritative; requires validation |
| **Deferred** | Intentionally excluded pending evidence |

When this synthesis conflicts with a cited source, **the cited source wins**.

### 0.1 Documentation set (this hub and related discoveries)

```text
PRODUCT-ARCHITECTURE-001  ← primary synthesis / reference hub (this record)
    │
    ├── AREDIR-DISCOVERY-014
    │     Operational/visual expression of established architecture
    │
    └── AREDIR-DISCOVERY-015
          Human authority versus automated capture responsibility boundary
```

Use **this record** for architecture maps and projection/authority invariants. Use **DISCOVERY-014** for visualization and interaction consequences. Use **DISCOVERY-015** for governance, evidence, capture, and authorization boundaries. Do not treat the three as competing sources of truth.

---

## 1. Architectural direction in one paragraph

**Established:** Aredir is a **governed operational environment for engineering** — not a project-management dashboard or chat-first AI product. The authenticated product organizes around **engagement and operational state** (Workspace entry → Project orientation → Engineering Work as governed activity), with **Engineering Work** as the primary operational artifact authority, **Project** as orientation and Project-owned lifecycle posture, **Operational Focus** as deliberate shared Project emphasis over selected Work, and **continuation / attention / selection** as distinct projections and interaction semantics that must not become alternate authorities. Change is governed through **append-only history**, **recommendation versus authorization separation**, and **evidence-backed decision provenance**. AI and agents may assess, recommend, and execute scoped work but **do not acquire operational authority** without human or governed authorization. The authenticated visual architecture (**PROJECT-UX-004**) projects these concepts through operating surfaces, inspectors, and bounded inventories — it does not create parallel truth.

**Scope boundary:** Repository authority establishes **engineering operations within Projects**, not company-wide operational control of all business functions.

---

## 2. Canonical authority map

| Layer | Primary records | Role |
| --- | --- | --- |
| **Product identity** | [AREDIR-VISION-001](../company/AREDIR-VISION-001_PRODUCT_OPERATING_ENVIRONMENT_PHILOSOPHY.md) | Enduring philosophy: operational environment for engineering |
| **Company methodology** | [ENGINEERING_OPERATING_SYSTEM](../company/ENGINEERING_OPERATING_SYSTEM.md), [FOUNDATION-RELEASE-001](../releases/FOUNDATION-RELEASE-001.md) | EOS / Foundation baseline — methodology, not product runtime |
| **Experience architecture** | [AREDIR-UX-001](../company/architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md), [OPERATIONAL-EXPERIENCE-001](./OPERATIONAL-EXPERIENCE-001_OPERATIONAL_ENGINEERING_ENVIRONMENT_ARCHITECTURE.md) | Mission/Environment/Primary Action; engagement responsibility model |
| **Information architecture** | [AREDIR-DISCOVERY-009](./AREDIR-DISCOVERY-009_CURRENT_STATE_INFORMATION_ARCHITECTURE_INVENTORY.md) | Two authority systems: Postgres + repository docs |
| **Project / EW authority** | [AREDIR-DISCOVERY-010](./AREDIR-DISCOVERY-010_PROJECT_OPERATIONAL_STATE_AUTHORITY_AND_PROJECTION_ARCHITECTURE.md) | What Project owns vs derives |
| **Selection semantics** | [AREDIR-DISCOVERY-011](./AREDIR-DISCOVERY-011_ENGINEERING_WORK_PRIORITIZATION_AND_OPERATIONAL_SELECTION_SEMANTICS.md) | Focus, continuation, attention, priority distinctions |
| **Operational Focus** | [AREDIR-DISCOVERY-012](./AREDIR-DISCOVERY-012_OPERATIONAL_FOCUS_PERSISTENCE_AND_LIFECYCLE_ARCHITECTURE.md) | Shared Project focus persistence and lifecycle |
| **Visual operating environment** | [PROJECT-UX-004](./PROJECT-UX-004_AUTHENTICATED_VISUAL_SYSTEM_AND_OPERATING_ENVIRONMENT_ARCHITECTURE.md) | Eight-region topology, color/authority visualization |
| **Visual evaluation / gaps** | [PROJECT-UX-003](./PROJECT-UX-003_AUTHENTICATED_OPERATIONAL_VISUAL_SYSTEM_EVALUATION.md) | Runtime vs architecture gap analysis |
| **EW lifecycle / provenance** | [ENGINEERING-WORK-LIFECYCLE-UPDATE-001](../engineering/ENGINEERING-WORK-LIFECYCLE-UPDATE-001.md) | History, recommendation/authorization, completion |
| **Continuation contract** | [WORKSPACE-OPERATIONAL-002](./WORKSPACE-OPERATIONAL-002_WORKSPACE_CONTINUATION_CONTRACT.md) | Not a ranking algorithm |
| **Evidence lifecycle** | [EVIDENCE_LIFECYCLE_PATTERN](../company/knowledge-patterns/EVIDENCE_LIFECYCLE_PATTERN.md) | Observation → evidence → interpretation → knowledge → decision |
| **AI boundaries** | [AI_GOVERNANCE](../company/governance/AI_GOVERNANCE.md), [WORKSPACE_FIRST_AI](../company/architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md), [AREDIR-DISCOVERY-013](./AREDIR-DISCOVERY-013_AI_LABORATORY_CAPABILITY_AND_LOCAL_INFERENCE_ARCHITECTURE.md) | Embedded AI; experimentation as Work |

Implementation packages: `PROJECT-UX-005` through `PROJECT-UX-008` (foundation, focus, Project context, shell) — see [discovery README](./README.md).

---

## 3. Architectural reconciliation matrix

| Concept | Authoritative owner | Purpose | Adjacent relations | Persistence class | Must NOT become |
| --- | --- | --- | --- | --- | --- |
| **Workspace** | Application entry surface | Answer "what should I accomplish now?" | Projects, continuation, attention | Interaction + query-time projections | Dashboard, inventory of all records, ranking authority |
| **Project** | `workspaceProjects` | Engineering effort orientation and Project-owned posture | EW scoped to Project; milestones; focus | **Persisted authority** (identity, status, stage, milestones) | Aggregate EW state; alternate EW lifecycle; focus without selection |
| **Engineering Work** | `workspaceEngineeringWork` | Governed operational activity within a Project | History, evidence refs, next action, outcome | **Persisted authority** + append-only history | Ticket backlog item; Project status proxy |
| **Operational Focus** | Project-scoped selection relation (DISCOVERY-012) | Deliberate shared emphasis on selected Work | Distinct from continuation, attention, priority | **Persisted authority** (current selection + event stream) | Assignment; per-operator dashboard; derived ranking |
| **Continuation** | Query-time projection (WORKSPACE-OPERATIONAL-002) | Resumable engagement with eligible Work | Uses EW state/condition; excludes ranking | **Derived projection** | Priority algorithm; lifecycle state; focus |
| **Attention** | Query-time projection | Conditions requiring awareness | Independent of lifecycle/focus | **Derived projection** | Project status; decorative alert count |
| **Selection** | Human authorization event (focus) | Establish deliberate emphasis | Produces focus state | **Authority event** | Automatic ranking from recency/IDs |
| **Next Action** | Engineering Work `currentNextAction` | Next step within a specific Work item | May project to Project when singular focus | **Persisted Work authority** | Independent Project `nextStep` copy |
| **Decision / Disposition** | EW history (`decision_role`, lifecycle) | Record reasoning and authorization | Recommendation separate from authorization | **Append-only history** | Silent overwrite of current projection |
| **Evidence** | Repository refs + evidence lifecycle | Support decisions with provenance | Cited from Work; not all observations persisted | **Repository-authoritative** (+ future governed capture) | Undifferentiated chat output |
| **Repository Reference** | Read-only citation contract | Link Work to repo artifacts | Authority labels on refs | **Citation / evidence pointer** | Mutable operational state |
| **Agent / AI recommendation** | History `decision_role: recommendation` | Non-authoritative assessment | May precede authorization | **History record** | Operational authority, focus, lifecycle transition |
| **Human authorization** | History `decision_role: authorization` | Accept state change | Required for focus, lifecycle, completion | **Authority event** | Optional for governed mutations |
| **Operating surface** | PROJECT-UX-004 region | Mission, current truth, primary action | Dominant at each altitude | **Presentation** | Second source of truth |
| **Inspector** | PROJECT-UX-004 region | Subordinate evidence, provenance, metadata | Progressive disclosure | **Presentation** | Primary surface; card stack |
| **Project summary / projection** | Derived from authoritative sources | Orientation without new truth | Recent outcomes, bounded Work, focus | **Derived projection** | Writable alternate authority |

---

## 4. Boundary tests (repository answers)

### 4.1 Primary operational unit

**Established hierarchy:**

```text
Workspace (entry / engagement)
    → Project (orientation + Project-owned posture)
        → Engineering Work (governed operational activity)
            → Evidence, history, workflow context, repository refs
```

Engineering Work is the **primary operational artifact**. Project coordinates and orients; Workspace engages.

### 4.2 Where operational state lives

| Owner | Persisted operational truth |
| --- | --- |
| **Project** | Identity, status, stage, milestones, targetDate, URLs, settings |
| **Engineering Work** | Lifecycle state, next action, outcome, condition, workflow context, history |
| **Operational Focus** | Current selected Work set (shared Project authority) |
| **Derived (not owned)** | Continuation, attention, recent outcomes, singular next-step projection, operating snapshot |

**Resolved:** Project `currentFocus` / `nextStep` prose fields are **not authoritative** (DISCOVERY-010/011/012). They are deprecated for presentation in favor of focus projection and Work-level next action.

### 4.3 What determines "what matters now"

| Mechanism | Question it answers | Distinct? |
| --- | --- | --- |
| **Continuation** | What can I resume now? | Yes — eligibility projection, not ranking |
| **Attention** | What requires awareness? | Yes — orthogonal to lifecycle and focus |
| **Operational Focus** | What does the Project deliberately emphasize? | Yes — requires explicit human selection |
| **Selection** | How was focus established? | Yes — authority event vs current projection |
| **Next action** | What happens next in this Work? | Yes — Work-scoped, not Project-scoped |
| **Priority field** | — | **Non-operational advisory metadata** (undefined semantics; all null) |

When multiple continuation candidates exist, **ambiguous mode is correct** — the system must not choose on the operator's behalf (DISCOVERY-011, WORKSPACE-OPERATIONAL-002).

### 4.4 How change is governed

**Established pattern (repository terminology):**

```text
Observation (may exist outside product)
    → Evidence (repository reference / future governed capture)
    → Interpretation / Investigation (history: observation, investigation)
    → Recommendation (history: recommendation — non-authoritative)
    → Authorization (history: authorization — human/governed)
    → Execution / Lifecycle transition (resulting state on Work projection)
    → History / Provenance (append-only; prior values preserved)
```

Evidence Lifecycle Pattern provides the knowledge-loop framing. EW-LIFECYCLE-UPDATE-001 implements recommendation/authorization separation in Work history. **Detailed responsibility boundaries** — including capture versus authority — are in [AREDIR-DISCOVERY-015](./AREDIR-DISCOVERY-015_HUMAN_GOVERNANCE_WITHOUT_HUMAN_BOOKKEEPING.md).

**Supported principles (synthesized; detailed treatment in DISCOVERY-015):**

- *Capture may be automated; authority may not be inferred from capture.*
- *Human governance does not require human data entry* — humans exercise judgment and authorization; the system may capture mechanically knowable provenance.

**Runtime gap:** Dogfooding and external procedures may bypass structured capture; that is an integration gap, not absence of architecture.

### 4.5 Role of AI

**Established:**

- AI participates in assessment, recommendation, explanation, and scoped implementation — **not** operational authority (AI_GOVERNANCE, DISCOVERY-013).
- Workspace-first: intelligence surfaces in workspace objects; chat is mechanism (WORKSPACE_FIRST_AI).
- Agents may recommend focus; **humans authorize** focus in baseline (DISCOVERY-012).
- AI Laboratory is **Work-scoped experimentation**, not a product domain (DISCOVERY-013).
- Autonomous AI lifecycle decisions are **explicitly excluded** (EW-LIFECYCLE-UPDATE-001 scope).

### 4.6 Meaning of "operating environment"

**Established functional interpretation (scoped):**

An environment for **observing, understanding, navigating, acting on, and governing engineering operational state within Projects** — consistent with AREDIR-VISION-001, OPERATIONAL-EXPERIENCE-001, and PROJECT-UX-004.

**Not established:** Company-wide operational control tower for all business functions.

**Not sufficient alone:** Dark UI, dashboard layout, VS Code resemblance, or decorative futurism (PROJECT-UX-003/004).

### 4.7 Projection versus authority

**Established invariant (DISCOVERY-010):** Summaries and surfaces may project authoritative data without becoming alternate authorities.

Projections include: continuation, attention, recent outcomes, bounded Work inventories, operating snapshot, singular next-step when focus is singular, inspector content, history region.

**Must not silently become truth:** Lists, boards, maps, timelines, dashboards, or graph canvases.

### 4.8 Architecture present but poorly expressed at runtime

**Established finding (PROJECT-UX-003):** Semantics are mature in data and documents; interface flattens authority classes. This is a **runtime legibility gap**, not missing architecture.

---

## 5. Compact architectural model

```text
ENTER ──► Workspace
            │ continuation (if unambiguous) / attention / recent context
            ▼
          Project operating context
            │ status · stage · milestones · operational focus projection
            │ bounded Work inventory (not unbounded backlog)
            ▼
          Engineering Work operating surface
            │ lifecycle state · next action · outcome · condition
            │ primary governed activity (workflow-specific)
            ├─► Inspector: evidence · relationships · provenance (progressive)
            └─► History region: append-only decision/lifecycle record

GOVERN ──► Human authorization events
            │ focus selection · lifecycle transitions · completion
            ├─► Recommendations (non-authoritative) may precede
            └─► History preserves actors, roles, rationale, basis

AI ──► Embedded in surfaces (assess · recommend · explain · scoped execute)
       Never silent authority over focus, lifecycle, or Project posture

COLLECTIONS ──► Retrieval when continuation insufficient (Documents, Prompts, KA, Evidence)
                Not primary operating composition
```

---

## 6. Candidate themes — repository verdict

| Theme | Verdict |
| --- | --- |
| Project-centered operational orientation | **Established** |
| Engineering Work as governed work authority | **Established** |
| Operational Focus as intentional Project-level state | **Established** (implementation: PROJECT-UX-006) |
| Continuation / attention / selection as distinct semantics | **Established** |
| Evidence-backed decision making | **Established** (integration gaps remain) |
| Preserved provenance and decision history | **Established** |
| Human-governed authority | **Established** |
| AI as participant, not implicit authority | **Established** |
| Authenticated UI as operating environment, not record dashboard | **Established** (runtime gap) |
| Multiple projections over shared authority | **Established** |
| Progressive disclosure of evidence/provenance | **Established** |
| Runtime legibility as implementation concern | **Established** (PROJECT-UX-003) |

---

## 7. Unresolved architectural questions

| Question | Status | Source |
| --- | --- | --- |
| Structured operational priority model | **Deferred** — field exists but undefined | DISCOVERY-011 |
| Engineering Work relationships schema | **Deferred** — model documented, not implemented | DISCOVERY-009, ENGINEERING-WORK-RELATIONSHIP-MODEL |
| Cross-work evidence lineage via `based_on_event_id` | **Constraint** — same-work FK only | Schema; see DISCOVERY-015 §9 |
| Personal working context vs shared focus | **Deferred** — distinct concept reserved | DISCOVERY-012 |
| Project status history | **Deferred** | DISCOVERY-012, PROJECT-UX-004 §25 |
| Agent-delegated focus authority | **Deferred** | DISCOVERY-012 |
| Relationship/lineage graph visualization | **Deferred** | PROJECT-UX-004 §25 |
| AI Laboratory product domain | **Rejected for now** | DISCOVERY-013 |
| Repository Evidence Authoring | **Deferred** | EW-LIFECYCLE-UPDATE-001 |

---

## 8. Explicit deferrals (inherited)

Do not treat as architectural requirements until separately authorized:

- Graph/map / spatial relationship editing
- Named navigation modes (e.g. CONTROL/WORK/MAP) without mapping to PROJECT-UX-004 regions
- Company-wide operational scope expansion
- Ticket-management / portfolio / resource-allocation patterns
- Second operational-state model
- Autonomous agent authority over lifecycle or focus

See PROJECT-UX-004 §25 and DISCOVERY-012 §1 for authoritative deferral lists.

---

## 9. Implementation package sequence (visual / runtime)

**Established sequence** (discovery README):

| Package | Subject | Status on baseline |
| --- | --- | --- |
| PROJECT-UX-005 | Visual-system foundation | Complete |
| PROJECT-UX-006 | Operational Focus authority | Complete |
| PROJECT-UX-007 | Project operating context + Work inventory | Complete |
| PROJECT-UX-008 | Authenticated shell + cross-altitude context | Complete |
| PROJECT-UX-004 Packages 5–8+ | Project restructure, unified EW detail, instrumentation, inventories | Architecture defined; partial runtime |

Future packages must reconcile with this synthesis and cited authorities — not reopen settled authority questions without new discovery.

---

## 10. Related synthesis and discovery records

| Record | Relationship |
| --- | --- |
| OPERATIONAL-EXPERIENCE-001 | Experience responsibility model — cited, not replaced |
| AREDIR-DISCOVERY-009 through -013 | Authority and capability discovery chain on `main` |
| PROJECT-UX-004 | Visual/spatial architecture — cited, not replaced |
| [AREDIR-DISCOVERY-014](./AREDIR-DISCOVERY-014_OPERATIONAL_CONTROL_ENVIRONMENT_AND_WORK_VISUALIZATION_PRINCIPLES.md) | Visual/interaction expression of this architecture; hypotheses for projection aliases and spatial manipulation |
| [AREDIR-DISCOVERY-015](./AREDIR-DISCOVERY-015_HUMAN_GOVERNANCE_WITHOUT_HUMAN_BOOKKEEPING.md) | Human authority vs automated capture; governance chain detail |

---

## 11. Downstream work (preserved for closure)

These items are **not** part of this synthesis record's scope. They are captured so completing this documentation set does not lose follow-up work:

| Candidate | Classification |
| --- | --- |
| Evidence/capture ingress | Future implementation candidate — see DISCOVERY-015 §12 |
| Rationale proportionality (Operate UX) | Future UX/policy candidate |
| Decision-review surface architecture | Future PROJECT-UX candidate; presentation per DISCOVERY-014 |
| Repository Evidence Authoring doc/runtime reconciliation | Future verification EW |
| Cross-work evidence lineage | Explicitly deferred |
| Relationship/graph visualization | Explicitly deferred (DISCOVERY-014, PROJECT-UX-004 §25) |
| PROJECT-UX-004 Packages 5–8+ | Existing authorized implementation sequence |
| Runtime authority legibility | Implementation concern (PROJECT-UX-003); not new architecture |

---

*End of PRODUCT-ARCHITECTURE-001*
