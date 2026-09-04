# AREDIR-DISCOVERY-014 — Operational Control Environment and Work Visualization Principles

| Field | Value |
| --- | --- |
| **Identifier** | AREDIR-DISCOVERY-014 |
| **Type** | Research / Discovery synthesis record |
| **Status** | Complete — synthesis and gap identification; no implementation authorized |
| **Review date** | 2026-09-03 |
| **Repository baseline** | `aredirlabs-com` `main` at evaluation time |
| **Trigger** | External product-management visual observations (Phoenix QA Delivery Control evaluation) prompted reconciliation: should Aredir formally understand itself as a governed **operational control environment** rather than a system for presenting records of work? |
| **Outcome** | Evaluates UX/visualization implications of established architecture; marks redundancy; records hypotheses; defers implementation. Does **not** supersede [PRODUCT-ARCHITECTURE-001](./PRODUCT-ARCHITECTURE-001_PRODUCT_OPERATIONAL_ARCHITECTURE_DIRECTION_SYNTHESIS.md), PROJECT-UX-004, OPERATIONAL-EXPERIENCE-001, AREDIR-VISION-001, or DISCOVERY-009 through -013. |
| **Synthesis hub** | [PRODUCT-ARCHITECTURE-001](./PRODUCT-ARCHITECTURE-001_PRODUCT_OPERATIONAL_ARCHITECTURE_DIRECTION_SYNTHESIS.md) — use for full architecture map; this record owns **visual/interaction consequences only** |
| **Related** | [AREDIR-DISCOVERY-015](./AREDIR-DISCOVERY-015_HUMAN_GOVERNANCE_WITHOUT_HUMAN_BOOKKEEPING.md) — governance/capture boundary where it affects visible authority |

---

## 0. Scope and documentation-set role

This discovery evaluates **operational control environment and work visualization principles** — what legitimately follows from established architecture for presentation and interaction.

It does **not** re-establish Aredir's product operational architecture. For authority, projections, governance overview, and compact model, use **[PRODUCT-ARCHITECTURE-001](./PRODUCT-ARCHITECTURE-001_PRODUCT_OPERATIONAL_ARCHITECTURE_DIRECTION_SYNTHESIS.md)**.

For human authorization versus automated capture, use **[AREDIR-DISCOVERY-015](./AREDIR-DISCOVERY-015_HUMAN_GOVERNANCE_WITHOUT_HUMAN_BOOKKEEPING.md)**. This record references that boundary only where visibility, progressive disclosure, or manipulation affect how authority is understood in the UI.

**Scope:** Governed **engineering operations within Projects** — not company-wide operational control of all business functions unless future evidence expands scope.

## 1. Status, authority, and classification

This is a repository-grounded discovery record. It is authoritative for the **synthesis and gap findings made here**, but it is not a company standard, implementation package, or promotion candidate until governed promotion occurs.

Labels used in this record:

| Label | Meaning |
| --- | --- |
| **Verified repository fact** | Directly supported by inspected repository documents or code at baseline |
| **Established architecture** | Already decided in prior complete discovery/UX records cited below |
| **Supported extension** | Consistent with established architecture; not yet fully expressed in runtime |
| **New hypothesis** | Requires validation before adoption |
| **Explicit deferral** | Intentionally excluded pending evidence |

No application code, schema, migration, UI, or Engineering Work mutation was performed to produce this record.

---

## 2. Repository baseline

**Verified repository fact:** Evaluation was performed against `main` at commit `0aac952f26bd10d69cc7df173dc5e7c637c48c82`.

**Verified repository fact:** Unrelated untracked artifacts (`.tmp-shots/`, `scripts/probe-prototype-data.mts`, `scripts/shoot-prototype.mjs`) were not treated as authority.

**Verified repository fact:** `docs/discovery/README.md` is the discovery registry. The numbered `AREDIR-DISCOVERY-*` sequence reached **013** (`AREDIR-DISCOVERY-013`). This record follows as **014**.

**Verified repository fact:** The `PROJECT-UX-*` lineage deliberately does **not** consume `AREDIR-DISCOVERY-*` identifiers (see PROJECT-UX-004 §0). UX architecture records are separate but reconciled with DISCOVERY-009 through -012.

---

## 3. Canonical records reviewed

| Record | Role in this evaluation |
| --- | --- |
| [AREDIR-VISION-001](../company/AREDIR-VISION-001_PRODUCT_OPERATING_ENVIRONMENT_PHILOSOPHY.md) | Foundational product identity: operational environment for engineering |
| [OPERATIONAL-EXPERIENCE-001](./OPERATIONAL-EXPERIENCE-001_OPERATIONAL_ENGINEERING_ENVIRONMENT_ARCHITECTURE.md) | Runtime experience architecture; engagement over capability inventory |
| [PROJECT-UX-003](./PROJECT-UX-003_AUTHENTICATED_OPERATIONAL_VISUAL_SYSTEM_EVALUATION.md) | Evaluated gap: semantics exist, visual expression does not |
| [PROJECT-UX-004](./PROJECT-UX-004_AUTHENTICATED_VISUAL_SYSTEM_AND_OPERATING_ENVIRONMENT_ARCHITECTURE.md) | **Primary UX architecture** — state-centric operating environment, surfaces, color, authority visualization, deferrals |
| [PROJECT-UX-005 through -008](./README.md) | Implementation packages for visual foundation, focus, Project context, shell |
| [AREDIR-DISCOVERY-009](./AREDIR-DISCOVERY-009_CURRENT_STATE_INFORMATION_ARCHITECTURE_INVENTORY.md) | Information ownership inventory |
| [AREDIR-DISCOVERY-010](./AREDIR-DISCOVERY-010_PROJECT_OPERATIONAL_STATE_AUTHORITY_AND_PROJECTION_ARCHITECTURE.md) | Project vs EW authority; projection invariants |
| [AREDIR-DISCOVERY-011](./AREDIR-DISCOVERY-011_ENGINEERING_WORK_PRIORITIZATION_AND_OPERATIONAL_SELECTION_SEMANTICS.md) | Continuation, attention, focus semantics |
| [AREDIR-DISCOVERY-012](./AREDIR-DISCOVERY-012_OPERATIONAL_FOCUS_PERSISTENCE_AND_LIFECYCLE_ARCHITECTURE.md) | Operational Focus authority |
| [AREDIR-DISCOVERY-013](./AREDIR-DISCOVERY-013_AI_LABORATORY_CAPABILITY_AND_LOCAL_INFERENCE_ARCHITECTURE.md) | AI experimentation boundary; embedded vs product domain |
| [AREDIR-UX-001](../company/architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md) | Mission, Environment, Primary Action, Supporting Context, Navigation, Identity |
| [WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN](../company/architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md) | AI embedded in workspace surfaces, not chat-as-product |
| [AI_GOVERNANCE](../company/governance/AI_GOVERNANCE.md) | Human/application authority; workspace-first development |
| [EVIDENCE_LIFECYCLE_PATTERN](../company/knowledge-patterns/EVIDENCE_LIFECYCLE_PATTERN.md) | Observation → evidence → interpretation → knowledge → decision |
| [ENGINEERING-WORK-LIFECYCLE-UPDATE-001](../engineering/ENGINEERING-WORK-LIFECYCLE-UPDATE-001.md) | Recommendation vs authorization; decision provenance |
| [AREDIR-EXPERIMENT-001](./AREDIR-EXPERIMENT-001_OPERATING_FIELD_FINDINGS_SYNTHESIS.md) | Disposable experiment findings; Operating Field prototype |
| [PRODUCT-ARCHITECTURE-001](./PRODUCT-ARCHITECTURE-001_PRODUCT_OPERATIONAL_ARCHITECTURE_DIRECTION_SYNTHESIS.md) | Primary architecture synthesis hub |
| [AREDIR-DISCOVERY-015](./AREDIR-DISCOVERY-015_HUMAN_GOVERNANCE_WITHOUT_HUMAN_BOOKKEEPING.md) | Human authority vs automated capture (cross-reference for visible authority chain) |

---

## 4. Executive synthesis

> **Architecture baseline:** Product operational architecture is established and synthesized in [PRODUCT-ARCHITECTURE-001](./PRODUCT-ARCHITECTURE-001_PRODUCT_OPERATIONAL_ARCHITECTURE_DIRECTION_SYNTHESIS.md). This section addresses **visualization and interaction** only.

### 4.1 Does Aredir already understand itself as an operational environment?

**Yes — at the architecture and vision layer.**

AREDIR-VISION-001 defines Aredir as *the operational environment in which engineering occurs*, not a tool collection. OPERATIONAL-EXPERIENCE-001 defines an **Operational Engineering Environment** organized around engagement, not capability tables. PROJECT-UX-004 completes the authenticated experience architecture as a **state-centric engineering operating environment with IDE-grade context preservation**.

**Verified repository fact (PROJECT-UX-003):** Runtime implementation has **not yet fully expressed** that architecture. The product is described as a "reading environment" — honest prose pages with mature semantics flattened visually — not yet a control console.

### 4.2 Is the candidate summary principle new?

Candidate:

> "Aredir is a governed operational environment for understanding and acting on organizational state—not simply a system for tracking records of work."

**Classification:** **Supported extension of established vision**, not a new identity.

Reasoning:

- "Operational environment" — **Established** (AREDIR-VISION-001, OPERATIONAL-EXPERIENCE-001).
- "Understanding and acting" — **Established** (UX-001 Primary Action; continuation, focus, attention).
- "Governed" — **Established** (lifecycle history, authority, Operational Focus, evidence contracts).
- "Organizational state" — **Supported extension** — repository emphasizes **engineering** state within Projects; full org-wide control tower is **not** established.
- "Not simply tracking records" — **Established** explicitly (OPERATIONAL-EXPERIENCE-001 §1: Workspace is not a dashboard; collections are retrieval, not primary composition).

Formal promotion of the exact sentence awaits governed promotion. This discovery **does not** elevate it to company standard.

### 4.3 Stronger functional meaning test

Candidate functional definition:

> An operating environment allows people to observe, understand, navigate, manipulate, and govern the state of an organizational system.

| Verb | Repository support |
| --- | --- |
| **Observe** | Partial — projections (continuation, attention, focus); instrumentation deferred |
| **Understand** | Strong semantics; weak visual hierarchy (PROJECT-UX-003) |
| **Navigate** | PROJECT-UX-004 altitude/shell; partially implemented (PACKAGE-008) |
| **Manipulate** | Lifecycle authoring exists; spatial relationship manipulation **deferred** |
| **Govern** | Strong — authority events, focus commands, evidence contracts |

**Conclusion:** The functional definition is **Supported extension** when scoped to **governed engineering operations within Projects**, not enterprise-wide organizational control.

---

## 5. Candidate principle reconciliation

| # | Principle (summary) | Classification | Governing evidence | Notes |
| --- | --- | --- | --- | --- |
| 1 | **Operational control over record presentation** | **ALREADY ESTABLISHED** | OPERATIONAL-EXPERIENCE-001; PROJECT-UX-004; WORKSPACE-OPERATIONAL-003 (continuation-first) | Do not restate as new principle |
| 2 | **Attention before inventory** | **ALREADY ESTABLISHED** | OPERATIONAL-EXPERIENCE-001 §1; PROJECT-UX-004 §11–12; DISCOVERY-011 | Continuation-first; attention region; bounded projections |
| 3 | **Progressive disclosure** | **ALREADY ESTABLISHED** | PROJECT-UX-004 §7 inspector hierarchy; PROJECT-UX-003 §6.1; DEFECT-UX-001 | Exact hierarchy in prompt is **illustrative**, not approved verbatim |
| 4 | **Whitespace before containers** | **ALREADY ESTABLISHED** | PROJECT-UX-004 §7 (Environment/Surface/Inset); §13 inventory rows | "No card nesting" is established; do not duplicate |
| 5 | **Meaningful operational color** | **ALREADY ESTABLISHED** | PROJECT-UX-004 §9–10 | Four operational roles + authority visualization matrix |
| 6 | **Multiple projections, one authority** | **ALREADY ESTABLISHED** | DISCOVERY-010 projection invariants; DISCOVERY-011 (continuation/attention/focus); PROJECT-UX-004 §10–11 | **CONTROL/WORK/MAP/HISTORY/TIMELINE labels — NEW HYPOTHESIS** (see §6) |
| 7 | **Authoritative relationship visualization / spatial authority edit** | **NEW HYPOTHESIS** | PROJECT-UX-004 §25 explicitly **defers** relationship/lineage graph | Conflicts if implemented as decorative PM board |
| 8 | **Embedded AI, not AI-as-destination** | **ALREADY ESTABLISHED** | WORKSPACE_FIRST_AI; AI_GOVERNANCE; DISCOVERY-013 §6 | Chat is mechanism; workspace owns record |
| 9 | **Visible authority chain** | **SUPPORTED EXTENSION** (visual) | EW-LIFECYCLE-UPDATE-001; PROJECT-UX-004 §10; DISCOVERY-015 §4–7 | Runtime visualization incomplete; **governance semantics** in DISCOVERY-015 |
| 10 | **Human meaning before technical provenance** | **SUPPORTED EXTENSION** (visual) | PROJECT-UX-004 operating surface vs inspector | Operating surface = meaning; inspector/history = provenance |

### 5.1 Redundant principles — do not restate

The following are **already established** in PRODUCT-ARCHITECTURE-001, PROJECT-UX-004, or cited sources. This discovery records them only to prevent re-derivation:

- Workspace is not a dashboard (OPERATIONAL-EXPERIENCE-001, WORKSPACE-OPERATIONAL-003).
- Project is orientation, not capability stack (OPERATIONAL-EXPERIENCE-001, PROJECT-UX-007).
- Focus ≠ continuation ≠ attention (DISCOVERY-011, PROJECT-UX-004 §11).
- Project summaries project; they do not become alternate authority (DISCOVERY-010).
- AI does not define the product (AREDIR-VISION-001, DISCOVERY-013).
- Recommendation ≠ authorization (ENGINEERING-WORK-LIFECYCLE-UPDATE-001).

---

## 6. Projection naming hypothesis (CONTROL / WORK / MAP / HISTORY / TIMELINE)

**Classification:** **NEW HYPOTHESIS** — not established in repository.

**Verified repository fact:** No authoritative document defines CONTROL, WORK, MAP, HISTORY, or TIMELINE as named product projections.

**Established equivalent concepts (different vocabulary):**

| Candidate label | Established repository concept |
| --- | --- |
| CONTROL | Workspace attention + continuation + focus projection (DISCOVERY-011) |
| WORK | Engineering Work operating surface + inventory (OPERATIONAL-EXPERIENCE-001) |
| MAP | **Deferred** — relationship/lineage graph (PROJECT-UX-004 §25) |
| HISTORY | Append-only lifecycle history (EW-LIFECYCLE-UPDATE-001); history region (PROJECT-UX-004) |
| TIMELINE | History region / future timeline accommodation (PROJECT-UX-004 §7) |

**Observation:** The five-label frame may help **external communication** but must not become a second navigation or authority model. PROJECT-UX-004 already defines eight **regions** (activity rail, orientation band, context inventory, operating surface, Project context rail, inspector, history region, command surface) as a responsibility model — not as competing truths.

**Recommendation:** Treat CONTROL/WORK/MAP/HISTORY/TIMELINE as **candidate projection aliases** for discovery conversations only until a governed UX record maps them to existing regions without collision.

---

## 7. Spatial relationship visualization hypothesis

**Classification:** **NEW HYPOTHESIS** — explicitly deferred.

**Verified repository fact:** PROJECT-UX-004 §25 defers "Relationship/lineage graph behavior and visualization."

**Verified repository fact:** ENGINEERING-WORK-RELATIONSHIP-MODEL documents `relates_to` / `depends_on` but **schema not implemented** (DISCOVERY-009).

Candidate: spatial drag from A→B to A→C represents **proposed authority change**.

**Architectural constraints if ever validated:**

1. Manipulation must produce **recommendation or authorization workflow**, not silent graph update.
2. Relationship authority remains on **Engineering Work / governed records**, not canvas state.
3. Cross-work lifecycle authority must not leak (DISCOVERY-010, DISCOVERY-013).
4. Must not imitate whiteboard PM tools; must project existing authoritative relationships only.

**Deferral:** Graph/map implementation, drag-to-change relationships, relationship editing UI.

---

## 8. Architectural tensions discovered

| Tension | Evidence | Resolution direction |
| --- | --- | --- |
| **Vision vs runtime** | PROJECT-UX-003: mature semantics, immature visual expression | Implement PROJECT-UX-004 packages; do not reopen identity |
| **Reading environment vs control console** | Same as above | Visual/system foundation before new concepts |
| **Projection vocabulary proliferation** | DISCOVERY-011 vs PROJECT-UX-004 regions vs candidate CONTROL/WORK/MAP | Map aliases to existing model; avoid parallel nav |
| **Evidence capture ingress vs repository refs** | DISCOVERY-015 §9; ENGINEERING-WORK-REPOSITORY-REFERENCE-CONTRACT | Governed capture vs citation — implementation deferred; see DISCOVERY-015 |
| **AI Lab vs embedded AI** | DISCOVERY-013 rejects product domain; WORKSPACE_FIRST requires surfaces | Experiments as Work; intelligence in inspector/command |
| **Org-wide control vs engineering scope** | VISION scopes to engineering; Phoenix QA is delivery control | Keep claims engineering-scoped until evidence expands |

---

## 9. Authoritative conclusions (this discovery)

1. **Aredir already formally understands itself as an engineering operating environment** at vision and architecture layers. The candidate Phoenix-inspired question is a **runtime expression and synthesis** problem, not a greenfield identity question.

2. **Principles 1–6, 8, and much of 9–10 are already established** in PROJECT-UX-004, OPERATIONAL-EXPERIENCE-001, and DISCOVERY-009 through -012. Restating them as new discovery would duplicate authority.

3. **Named projections (CONTROL/WORK/MAP/HISTORY/TIMELINE) and spatial authority editing are hypotheses**, not repository decisions. PROJECT-UX-004 already deferred graph/lineage work.

4. **No second operational-state model is warranted.** All visualization must remain projection over Project authority, Engineering Work authority, Operational Focus, decision history, and repository evidence.

5. **Implementation path remains PROJECT-UX-004 package sequence** (Packages 5–8+ for Project/Work/instrumentation), not a parallel "control environment" program.

---

## 10. Emerging principles (not yet authoritative)

These may inform future governed records but are **not requirements**:

1. **Control-console legibility** — When semantics exist in data, the interface should express authority class, projection, and history without requiring prose reconstruction (from PROJECT-UX-003 finding, restated as implementation pressure).

2. **Projection alias discipline** — Any new navigation or labeling vocabulary must map 1:1 to an existing region or projection type before shipping.

3. **Manipulation is governance** — Direct manipulation of relationships or authority-bearing fields must route through the same authorization model as form-based governance ([DISCOVERY-015](./AREDIR-DISCOVERY-015_HUMAN_GOVERNANCE_WITHOUT_HUMAN_BOOKKEEPING.md) §6.4; not a separate visual shortcut to authority).

4. **Meaning-first, provenance-adjacent** — Operating surfaces lead with operational truth; inspector/history carry evidence and provenance (PROJECT-UX-004 §5, §7).

---

## 11. Explicit implementation deferrals

Unless a prior complete record already authorized implementation, defer:

- Graph/map implementation and spatial relationship editing
- CONTROL / WORK / MAP navigation implementation as named modes
- Timeline as distinct product surface beyond history region
- Broad authenticated UI redesign outside PROJECT-UX package sequence
- AI assistant redesign or AI-as-primary-shell
- New database/schema for visualization
- New operational object types for "control tower"
- Competitor-style boards, portfolios, resource allocation
- Automatic cross-work lifecycle mutation from visualization
- Promotion of candidate summary sentence to company standard without governed promotion

---

## 12. Recommended next actions

1. **Do not open a parallel "Operational Control Environment" implementation program.** Continue PROJECT-UX-004 authorized packages. Governance/capture ingress is separate work under [DISCOVERY-015](./AREDIR-DISCOVERY-015_HUMAN_GOVERNANCE_WITHOUT_HUMAN_BOOKKEEPING.md).

2. **If projection aliases (CONTROL/WORK/MAP) prove useful in design discussions**, produce a short mapping table in a future UX record — do not implement navigation until mapped to PROJECT-UX-004 regions.

3. **Validate spatial relationship hypothesis only after** ENGINEERING-WORK relationship schema exists and PROJECT-UX-004 Package 6 (unified EW detail + inspector) is stable.

4. **Runtime acceptance:** Re-run PROJECT-UX-003 style evaluation after Package 5–6 to measure whether "operating environment" is visually legible without new concepts.

---

## 13. Discovery outcome

**Complete — visualization/expression evaluation with explicit deferrals.**

This discovery answered whether Phoenix-inspired observations require new product identity or architecture (**no** — runtime expression problem). It recorded visualization hypotheses (projection aliases, spatial manipulation) and marked established principles as redundant with PRODUCT-ARCHITECTURE-001 and PROJECT-UX-004.

This discovery **does not** authorize implementation and **does not** supersede PRODUCT-ARCHITECTURE-001 or PROJECT-UX-004.

---

*End of AREDIR-DISCOVERY-014*
