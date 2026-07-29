# AREDIR-DISCOVERY-004 — Engineering Mission Artifact Definition

| Field | Value |
| --- | --- |
| **Work package** | AREDIR-DISCOVERY-004 |
| **Status** | Complete (artifact discovery and contract definition) |
| **Date** | 2026-07-28 |
| **Package type** | Artifact Discovery and Contract Definition — no application implementation |
| **Writable repository** | `aredirlabs-com` only |
| **Prior authority** | [AREDIR-DISCOVERY-003](./AREDIR-DISCOVERY-003_ENGINEERING_OPERATIONS_ARCHITECTURE.md) |
| **Subject** | Canonical meaning, boundaries, lifecycle, authority, and relationships of the Engineering Mission artifact |
| **Follow-on decision** | **3 — Mission artifact validated and ready for contract implementation** |

## Evidence classification used in this report

| Class | Meaning |
| --- | --- |
| **Confirmed** | Directly supported by Labs, Quality Systems, Bootstrap, or product artifacts consulted |
| **Inferred** | Reasonable synthesis from multiple evidence points; not a single authoritative rule |
| **Proposed** | Recommended by this package as the Mission contract; awaiting template/registry validation |
| **Unresolved** | Material gap left open deliberately |

Do not treat design preference as **Confirmed**. This package does not authorize application code, UI, templates, live Mission seeds, AEF edits, Bootstrap/QS/product modifications, or C11 assignment.

---

## 1. Executive Summary

### Verdict

**Engineering Mission is validated** as a distinct governed artifact and is **ready for contract implementation** (`AREDIR-MISSION-001`: contract, template, registry — documentation only).

### Refined hypothesis

| Hypothesis (package brief) | Result |
| --- | --- |
| Mission is a bounded, outcome-oriented **operational commitment** that organizes currently pursued engineering work | **Accepted with refinement** |
| It may coordinate multiple governed artifacts | **Accepted** |
| It does not replace their authority | **Accepted — non-negotiable** |

**Refinement:** Mission is both a **commitment** (once Authorized) and an **operational focus** (once Active). It is **not** a delivery container, ticket, milestone, roadmap row, or package substitute. Before authorization it may exist as **Proposed** orientation without implying pursuit commitment.

### Canonical one-liner

> An **Engineering Mission** is a bounded, outcome-oriented record of engineering intent that **orients currently pursued work** by coordinating references to Opportunities, Packages, Findings, Decisions, and Verification — without absorbing their authority.

### Single primary responsibility

> **Orient active engineering work around a defined outcome and its supporting context (by reference).**

### What Mission does not own

| Concern | Owner |
| --- | --- |
| Potential work evaluation | Opportunity |
| Implementation specification & progress | Package |
| Observed quality condition | Finding (AQSF methods) |
| Proof methods & confidence assessment | Verification / QS methods + package evidence |
| Company reusable IP transfer | Promotion Process |
| Roadmap planning horizon | Opportunity / planning projection |
| Project identity | Project / repository governance |

### Follow-on decision

**Outcome 3 — validated and ready for contract implementation.**

Next package: **AREDIR-MISSION-001 — Engineering Mission Contract, Template, and Registry** (documentation hybrid; still no application).

---

## 2. Background

AREDIR-DISCOVERY-003 concluded that Engineering Operations is one integrated operational workspace with narrative:

```text
Mission → Context → Portfolio → Current Delivery → Verification → Knowledge
```

It named **Engineering Mission** as the primary orienting artifact and left open:

- persistence home (Q1)
- multi-project Missions in v1 (Q2 — default no)
- exact schema, lifecycle, and cardinality with Opportunity/Package/Finding

This package freezes those artifact rules so future Ops architecture, projections, and templates can proceed without collapsing Aredir’s existing chain:

```text
Finding → evidence requiring interpretation
Opportunity → potentially valuable work requiring evaluation
Decision → governed conclusion
Engineering Mission → currently pursued engineering objective
Package → authoritative implementation specification
Verification → evidence supporting confidence
Promotion → deliberate transfer of reusable knowledge
```

Preserved inequality (**Confirmed** ClassForge + this package):

```text
Capture ≠ Approve ≠ Package ≠ Activate
```

---

## 3. Evidence Base

| Source | Use in this package |
| --- | --- |
| AREDIR-DISCOVERY-003 | Mission as primary Ops artifact; projection over duplication; repo authority |
| CLASSFORGE-DISCOVERY-002 | Opportunity lifecycle ends at Packaged; roadmap as projection; Finding ≠ Opportunity ≠ Package |
| CLASSFORGE-OPPORTUNITY-001 / portfolio schema | Field governance, progressive completeness, readiness gates |
| Feature Delivery Standard / EOS | Work Package owns objective, constraints, acceptance, verification |
| AEF-001 | Capability ownership boundaries; Work Packages primarily C9 |
| AREDIR-UX-001 | Mission as “why am I here?”; primary action; supporting context |
| AQSF Mission / Capability / Publishing architectures | Authority precedes projection; shared operational workspace |
| Promotion Process | Deliberate knowledge transfer |
| ClassForge / Labs package histories | Granularity examples (discovery, platform, auth, opportunity seed) |
| AlignFit operational workspaces | Pattern evidence via promoted UX standards (**Confirmed** pattern; AlignFit repo not re-audited here) |

---

## 4. Canonical Mission Definition

### 4.1 Definition

**Engineering Mission** *(noun, governed artifact)*:

A durable, repository-authored record that states a **bounded engineering outcome** currently intended for pursuit (or proposed for pursuit), identifies the **context and proof expectations** for that outcome, and **coordinates by reference** the Opportunities, Packages, Findings, Decisions, and Verification artifacts that support it.

### 4.2 Ontological classification

| Framing | Fit | Notes |
| --- | --- | --- |
| Objective | Partial | Outcome is required, but objective alone lacks commitment and orientation duties |
| Commitment | Strong (when Authorized+) | Authorization is the commitment gate |
| Operational focus | Strong (when Active) | Activation is the focus gate |
| Delivery container | **Rejected** | Packages contain delivery work |
| Temporary coordination artifact | Partial | Durable record; may be short-lived in calendar time without being ephemeral scrap |
| **Combination** | **Accepted** | Outcome + (Authorized) commitment + (Active) operational focus + coordination-by-reference |

### 4.3 Distinctions

| Concept | Difference from Mission |
| --- | --- |
| **Task / ticket** | Atomic work unit; no outcome contract; tracker semantics |
| **Project** | Long-lived product/authority identity; Mission is time-bounded pursuit inside or for a project |
| **Milestone** | Date/event marker; Mission is outcome + orientation, not a calendar pin |
| **Roadmap item / horizon** | Planning projection of intent timing; Mission is execution commitment when Active |
| **Opportunity** | Potential work without pursuit commitment; Mission is pursued (or proposed-to-pursue) outcome |
| **Package** | Authoritative specification to execute a change; Mission orients and coordinates, does not specify implementation |
| **AQSF Mission Architecture** | Framework purpose of Quality Systems; different noun domain — always say **Engineering Mission** in Ops contexts |

### 4.4 Vocabulary rule

In Engineering Operations documents, **Mission** means Engineering Mission unless explicitly scoped as AQSF Mission Architecture or UX-001 experiential mission language. Prefer the full term in contracts and schemas.

---

## 5. Mission Responsibility

### Primary responsibility (canonical)

**Orient active engineering work around a defined outcome and its supporting context.**

### Sufficiency test

| Must do | How |
| --- | --- |
| Make outcome legible | Outcome statement + success conditions |
| Bound work | Scope boundary + non-goals |
| Point to proof | Evidence expectations (references, not duplicate verification bodies) |
| Point to support | Links to Opportunities, Packages, Findings, Decisions |
| State pursuit posture | Lifecycle state + activation designation |

| Must not do | Why |
| --- | --- |
| Store package progress details | Duplicates package authority |
| Re-host finding bodies | Duplicates AQSF/engagement evidence |
| Act as backlog | That’s Portfolio / Opportunity |
| Hold sprint assignment / estimates | Ticket-system creep |
| Become permanent project charter | Granularity failure |

**Conclusion:** The candidate responsibility is **sufficient** if supporting context is **by reference** and progress/verification remain projected from authoritative artifacts.

---

## 6. Mission Boundary Model

```text
                    ┌─────────────────────────────┐
                    │     Engineering Mission     │
                    │  outcome · bounds · links   │
                    │  state · activation · owner │
                    └──────────────┬──────────────┘
           references only ↓       │       ↓ references only
    Opportunity / Decision    Packages / ADRs    Findings / Verification
```

| Inside Mission authority | Outside Mission authority |
| --- | --- |
| Outcome, success conditions, scope bounds | Package acceptance criteria detail |
| Mission lifecycle & activation | Opportunity lifecycle |
| Mission identity & ownership fields | Finding severity / evidence bodies |
| Authorizing decision *reference* | Decision/ADR record bodies |
| Declared evidence expectations | Verification strategy/procedures (QS/package) |
| Closure rationale | Promotion Process execution |
| Link arrays to related artifacts | Implementation progress percentages |

**Anti-absorption rule:** If a field’s source of truth already exists on Opportunity, Package, Finding, ADR, or Verification artifacts, Mission stores a **reference or summary pointer**, never a competing copy of status that operators must update twice.

---

## 7. Creation and Authorization

### 7.1 Creation conditions

A Mission **may** be created when there is a bounded outcome worth orienting work around. Origins include (**Proposed**):

| Origin | Allowed? | Notes |
| --- | --- | --- |
| Approved Opportunity ready for pursuit | Yes | Common path |
| Opportunity still Investigating (Mission = investigation) | Yes | Mission kind `discovery` / investigation; does not imply Opportunity Approved |
| Operational incident | Yes | May create Mission and/or Opportunity; do not skip evidence |
| Mandatory maintenance / platform pressure | Yes | |
| Architecture / discovery package need | Yes | Discovery itself can be the Mission |
| Verification or remediation objective | Yes | |
| Knowledge promotion campaign | Yes | Rare; deliberate |
| Casual idea / chat consensus alone | **No** as Authorized; may be Proposed only with explicit Unknown evidence |

**Approved Opportunity is not mandatory** for Mission creation (**Proposed**, refining DISCOVERY-003).

### 7.2 Authorization

| Act | Meaning |
| --- | --- |
| **Create** | Record exists (typically `Proposed`) |
| **Authorize** | Named authority accepts the Mission as intended pursuit (`Authorized`) |
| **Activate** | Mission is designated as currently pursued (`Active`) |

Creation ≠ Authorization ≠ Activation.

| Who authorizes (default) | Domain |
| --- | --- |
| Product / engineering lead for product repo | Product Missions |
| Engineering lead | Labs methodology / Ops / platform Missions |
| Explicit sponsor recorded on Mission | Cross-cutting cases |

Authorization requires: outcome, scope bound, owner (project/domain + capability or provisional with plan), evidence expectations, and an authorizing decision note (who/when/why).

### 7.3 Preserve inequalities

| Step | Artifact |
| --- | --- |
| Capture | Opportunity (or Finding capture) |
| Approve | Opportunity decision |
| Package | Opportunity → Package link; package exists |
| Activate | **Mission** activation |

Opportunity Approval does **not** auto-activate a Mission. Packaging does **not** auto-activate a Mission. Mission Authorization does **not** auto-create packages.

---

## 8. Mission Lifecycle

### 8.1 Canonical states (**Proposed**)

| State | Meaning |
| --- | --- |
| **Proposed** | Recorded outcome candidate; not yet a pursuit commitment |
| **Authorized** | Commitment accepted; not necessarily currently focused |
| **Active** | Currently pursued; operational focus |
| **Paused** | Intentionally suspended; commitment retained |
| **Completed** | Outcome achieved per success conditions; governance/docs may still finalize |
| **Closed** | Governance finalized; evidence and closure rationale recorded; terminal success path |
| **Cancelled** | Will not be pursued further; terminal with rationale |
| **Superseded** | Replaced by another Mission; terminal with link |

### 8.2 Rejected or demoted candidates

| Candidate | Disposition |
| --- | --- |
| **Blocked** | **Not a lifecycle state** — projected condition from dependencies/findings/CI |
| **Abandoned** | Use **Cancelled** with rationale (avoid synonym sprawl) |
| **Invalidated** | Use **Cancelled** or **Superseded** when premises fail; note “invalidated by …” in rationale |
| **In Progress** | Forbidden — ticket language; use **Active** + package projection |

### 8.3 Transitions

```text
Proposed
   ├─(authorize)──► Authorized
   ├─(cancel)─────► Cancelled
   └─(supersede)──► Superseded

Authorized
   ├─(activate)───► Active
   ├─(cancel)─────► Cancelled
   └─(supersede)──► Superseded

Active
   ├─(pause)──────► Paused
   ├─(complete)───► Completed
   ├─(cancel)─────► Cancelled
   └─(supersede)──► Superseded

Paused
   ├─(resume)─────► Active
   ├─(cancel)─────► Cancelled
   └─(supersede)──► Superseded

Completed
   └─(close)──────► Closed
```

| Transition | Authority | Minimum evidence |
| --- | --- | --- |
| authorize | Mission authorizer | Outcome + bounds + owners + evidence expectations + decision note |
| activate | Same or delegated operator | Readiness gate (§10) met or waived |
| pause / resume | Authorizer or Active operator | Reason note |
| complete | Authorizer | Success conditions assessed; package/verification projections cited |
| close | Authorizer | Closure checklist (§21); knowledge evaluation noted |
| cancel / supersede | Authorizer | Rationale; supersede requires replacement Mission ID |

**Paused** is a **lifecycle state** (intentional), not a UI toggle synonym for Blocked.

**Completed vs Closed:** **Distinct.** Completed = outcome achieved. Closed = governance and evidence finalized. A Mission should not linger indefinitely in Completed without closure rhythm (**Proposed** operating rule for MISSION-001).

---

## 9. Activation and Readiness

### 9.1 What makes a Mission Active

| Question | Answer |
| --- | --- |
| Is authorization sufficient? | **No** |
| Must a package be ready? | **No** — discovery/architecture/verification Missions may be Active before implementation packaging |
| Can discovery be the active work? | **Yes** |
| Multiple Active Missions? | **Yes** (see Concurrency) |
| Primary Mission? | **Yes, recommended designation** — `primary_for_operator` or registry “Primary Active” is a **projection/selection**, not a separate artifact type |
| “Today’s mission”? | **Projection** of the Primary Active Mission for a person/session — not a required schema field |

### 9.2 Readiness levels

| Level | Meaning |
| --- | --- |
| **Proposed** | Exists; incomplete commitment |
| **Authorized** | Commitment exists; may wait |
| **Ready** | Activation criteria met (attribute or checklist) — **not** a separate lifecycle state |
| **Active** | Currently pursued |

`ready` is a **boolean/checklist condition** on Authorized Missions, analogous to Opportunity `readiness` (**Confirmed** pattern).

### 9.3 Activation readiness criteria (**Proposed**)

**Mandatory before Activate (or explicit waiver):**

1. Bounded outcome statement
2. Success conditions
3. Scope boundary (in/out)
4. Owning project or authority domain
5. Owning capability **or** provisional ownership with resolution plan
6. Authorization recorded
7. Evidence expectations defined
8. Critical dependencies known or explicitly Unknown-accepted
9. No unresolved **architectural blocker** that the Mission itself does not include as its work (or blocker accepted with mitigation)

**Conditional:**

| Criterion | When required |
| --- | --- |
| Related Opportunity Approved | If Mission claims to deliver that Opportunity’s product/platform outcome (not pure investigation) |
| Package strategy identified | If Mission kind implies delivery (`delivery`, `remediation`) — may be “discovery package first” |
| Authorizing decision / ADR refs | When architecture impact is material |

---

## 10. Mission Outcome Contract

Every Mission requires (**Proposed**):

| Element | Required? | Notes |
| --- | --- | --- |
| **Outcome statement** | Yes | What will be true when done — not how |
| **Success conditions** | Yes | Testable or reviewable conditions |
| **Scope boundary** | Yes | In / out |
| **Evidence expectations** | Yes | What classes/artifacts will justify completion |
| **Owning project / authority domain** | Yes | Exactly one for v1 |
| **Owning capability** | Yes by Authorize (provisional allowed at Proposed) | |
| **Decision authority** | Yes | Who may authorize/activate/complete/close |
| **Completion criteria** | Yes | May equal success conditions + closure checklist items |

**Separate outcome from method.** Method lives in Packages (and optional Implementation Briefs). Mission must not narrate implementation steps as its core content.

---

## 11. Opportunity Relationship

| Question | Answer |
| --- | --- |
| One Opportunity → multiple Missions? | **Yes** (phased pursuit) |
| One Mission → multiple Opportunities? | **Yes** (convergence) |
| Mission without Opportunity? | **Yes** |
| Activation require Opportunity approval? | **Only when** Mission delivers an Approved Opportunity’s committed outcome; investigation Missions may Activate against non-Approved Opportunities |
| Does Mission close the Opportunity? | **No** |
| When does Opportunity become Packaged? | When real packages are linked and readiness gate met — **independent** of Mission state (**Confirmed** ClassForge) |
| Mission = roadmap commitment? | **No** — roadmap horizon remains Opportunity/planning projection |
| Mission = delivery/execution commitment? | **Yes, when Authorized/Active** |

```text
Opportunity (potential / decided)
        ↓ optional
Engineering Mission (pursued orientation)
        ↓ coordinates
Package(s) (specification)
```

Opportunity `Packaged` means packages exist. Mission `Active` means pursuit focus exists. Either can occur without the other in edge cases; normal delivery path has Approved Opportunity → Authorized/Active Mission → Packages (order of Mission vs first package may vary).

---

## 12. Package Relationship

| Question | Answer |
| --- | --- |
| Mission may contain multiple packages? | **Coordinate**, not contain — **Yes** multiple linked packages |
| Package may support multiple Missions? | **Default no**; allow rare secondary references with one **primary_mission_id** on the package (**Proposed**) |
| One package normally primary? | **Yes** when multiple exist — declare `primary_package_id` on Mission |
| Discovery/scope/architecture/impl/verification/remediation packages coexist? | **Yes** |
| Mission before implementation packaging? | **Yes** |
| Package status projected into Mission? | **Yes** — derived views only |
| Mission owns implementation progress? | **No** |

**Boundary (expected and confirmed):** Packages remain authoritative for the work they specify. Mission coordinates them.

Package types that may link:

- Discovery, Scope, Architecture, Implementation, Verification-focused, Remediation, Documentation/Methodology packages

Mission state must **not** be auto-derived solely from package status (e.g., package Complete ≠ Mission Closed without human closure decision).

---

## 13. Project and Capability Relationships

### 13.1 Project / repository

| Model | v1 decision |
| --- | --- |
| Exactly one owning project/authority domain | **Required** |
| Multi-project single Mission artifact | **Deferred** (DISCOVERY-003 Q2 default no — **Confirmed** here) |
| Labs-internal Mission | **Allowed** — owning domain = Aredir Labs / `aredirlabs-com` |
| Cross-project initiative | Represent as **Labs Mission** with `related_project_refs[]`, or separate per-repo Missions linked by relation — do not dual-own one record |
| Capability instead of project | Capability is ownership dimension; **not** a substitute for repository authority home |

### 13.2 Capability

| Question | Answer |
| --- | --- |
| One owning capability? | **Preferred**; required by Authorize unless provisional plan |
| Affect multiple capabilities? | **Yes** via `impacted_capabilities` |
| Capability ownership ≠ project ownership? | **Yes** — distinct fields |
| Establish a new capability? | **Allowed** as methodology/architecture Mission outcome; rare |
| Operate at AEF / platform / product / quality / delivery level? | **Yes** — express via `mission_kind` + owning domain + capability refs; **do not** assign AEF C11 here |

---

## 14. Findings and Verification Relationships

| Question | Answer |
| --- | --- |
| Findings initiate a Mission? | **Yes** (often via Opportunity; direct link allowed) |
| Multiple Findings → one Mission? | **Yes** |
| Completion require Findings closed? | **No** — require **governed disposition** (fixed, deferred with trigger, accepted risk, out of scope) |
| Verification role | **Independent authority** attached by reference; may also be Mission kind `verification` |
| Complete with unresolved Findings? | **Yes**, if dispositions recorded and success conditions still met |
| Evidence before completion | Cite verification artifacts / classes; do not embed full AVF bodies |

Preserve: AQSF findings communicate conditions; action timing may be None/Defer (**Confirmed**). Mission must not become a second findings database.

---

## 15. Decision and ADR Relationships

| Question | Answer |
| --- | --- |
| Must reference authorizing decision? | **Yes** at Authorize (decision note minimum; ADR if architecture-grade) |
| ADRs inputs or outputs? | **Either** — link as `related_adr_ids` |
| Proceed with open major decisions? | **Only if** Mission scope includes deciding them, or Unknown-accepted with explicit risk |
| ADR acceptance auto-changes Mission state? | **No** |
| Mission owns decision history? | **No** — append-only Mission decision log for Mission transitions only |

Mission exposes decision **context**; ADR/Decision artifacts remain authoritative.

---

## 16. Roadmap and Release Relationships

### 16.1 Roadmap boundary (non-synonyms)

| Concept | Meaning |
| --- | --- |
| **Roadmap Horizon** | Planning intent timing on Opportunity (now/next/later/…) |
| **Mission Authorization** | Commitment to pursue outcome |
| **Mission Activation** | Current operational focus |
| **Package Readiness** | Ready to author or execute package |
| **Implementation Start** | Work begins against package acceptance |

Mission is **authorized/active work**, not roadmap intent and not merely scheduled work.

### 16.2 Releases

| Question | Answer |
| --- | --- |
| Missions target releases? | **Optional** association |
| Releases contain Missions? | Projection/view only |
| Mission span releases? | **Allowed** |
| Release completion closes Mission? | **No** automatically |
| Non-release work as Mission? | **Yes** (methodology, discovery, remediation, promotion) |
| Release readiness in Mission context? | **Projected** supporting context |

---

## 17. Knowledge Promotion Relationship

| Question | Answer |
| --- | --- |
| Completion creates promotion candidates? | **May nominate**; does not auto-create company assets |
| Promotion inside or downstream? | **Downstream** of Mission (and usually of package verification) |
| Mission exist specifically to promote? | **Yes** (`mission_kind: knowledge_promotion`) |
| Reusable outcomes required to evaluate? | **Yes at Close** — evaluate `knowledge_candidate: yes/no/pending` |
| Promotion status in Mission context? | **Projected** from local ledger / Labs promotion records |

Knowledge promotion remains deliberate (**Confirmed** Promotion Process / ClassForge).

---

## 18. Authority Model

### Primary hypothesis — **Accepted**

> The Mission belongs in the repository or authority domain responsible for the work.

| Mission home | When |
| --- | --- |
| Product repository | Product/platform/quality work for that product |
| `aredirlabs-com` | Labs methodology, Engineering Ops, company-wide coordination Missions |
| Quality Systems repo | **Only** if the work’s authoritative home is QS framework evolution — rare; product verification Missions stay in product repos |
| Bootstrap repo | **Not** for product Missions; Bootstrap remains packaging authority |

### What Labs may project but not own

- Cross-project indexes of Mission IDs/titles/states
- “Primary Active Mission” operator views
- Aggregated blocked/readiness projections
- Links into product Mission paths

Labs **must not** become system of record for product Mission bodies via projection tools.

### Multi-repository Missions (v1)

**Not authorized as a single dual-homed artifact.** Use one authoritative home + `related_repository_refs` / related Missions.

---

## 19. Mission Identity

| Requirement | Rule (**Proposed**) |
| --- | --- |
| Canonical ID | `{QUALIFIER}-MISSION-###` — e.g. `AREDIR-MISSION-001`, `CF-MISSION-001` |
| Title | Human-readable, outcome-oriented, short |
| Repository-qualified identity | Qualifier implies owning repo/domain; path is authoritative location |
| Stable references | ID immutable after create |
| Links | Store foreign IDs (Opportunity, Package, Finding, ADR) |
| Supersession | `supersedes` / `superseded_by` |
| Duplication | Prefer Cancelled/Superseded over silent clones |
| Archival | Closed/Cancelled/Superseded remain readable; not deleted |
| Cross-repo collision | Qualifier prefix prevents ID collision |

No database schema in this package.

---

## 20. Conceptual Schema

Minimum conceptual schema (**Proposed**). Keep small.

### 20.1 Field table

| Field | Class | Required when | Notes |
| --- | --- | --- | --- |
| `id` | authoritative | Create | Immutable |
| `title` | authoritative | Create | Editable for clarity |
| `outcome` | authoritative | Create | |
| `mission_kind` | authoritative | Create | See vocabulary |
| `state` | authoritative | Create | Lifecycle |
| `activation` | authoritative | Create | `inactive` \| `active` — Active state implies `active` |
| `primary_designation` | projected/selection | Optional | Operator/registry primary flag — not core durable necessity |
| `owning_project` / `authority_domain` | authoritative | Create | Exactly one |
| `owning_capability` | authoritative | Authorize | Provisional earlier |
| `impacted_capabilities` | authoritative | Recommended | |
| `origin` | authoritative | Create | |
| `authorizing_decision` | authoritative | Authorize | Note or ADR ref |
| `decision_authority` | authoritative | Authorize | Role/person |
| `related_opportunity_ids` | authoritative | Conditional | |
| `related_package_ids` | authoritative | When packages exist | |
| `primary_package_id` | authoritative | When >1 package | |
| `related_finding_ids` | authoritative | Conditional | |
| `related_adr_ids` | authoritative | Conditional | |
| `success_conditions` | authoritative | Authorize | |
| `scope_in` / `scope_out` | authoritative | Authorize | |
| `evidence_expectations` | authoritative | Authorize | |
| `dependencies` | authoritative | Known-or-Unknown by Activate | |
| `risks` | authoritative | Recommended | |
| `started_at` | authoritative | Activate | |
| `completed_at` | authoritative | Complete | |
| `closed_at` | authoritative | Close | |
| `closure_rationale` | authoritative | Close/Cancel/Supersede | |
| `supersedes` / `superseded_by` | authoritative | Conditional | |
| `knowledge_candidate` | authoritative | Close | `yes` \| `no` \| `pending` |
| `release_refs` | authoritative | Optional | Association only |
| `related_repository_refs` | authoritative | Optional | Non-owning refs |
| Package progress / verification readiness / finding counts / git activity / release readiness | **projected/derived** | — | **Do not duplicate as manually maintained Mission fields** |

### 20.2 Mission kind vocabulary (**Proposed**)

`discovery` | `architecture` | `delivery` | `verification` | `remediation` | `operational` | `methodology` | `knowledge_promotion`

Pick one primary kind.

### 20.3 Prohibited duplications

Do not store on Mission as authoritative:

- Opportunity status
- Package implementation status / % complete
- Finding severity copies
- Verification pass/fail matrices
- Sprint points, assignees, board columns
- Roadmap horizon (belongs on Opportunity/planning)

---

## 21. Authoritative, Derived, and Projected Fields

| Kind | Definition | Examples |
| --- | --- | --- |
| **Authoritative** | Edited on Mission record; Mission is SoT | outcome, state, links, success conditions |
| **Derived** | Computed from linked artifacts | “all linked packages Complete?”, open finding count |
| **Projected** | Presented in Ops workspace from SoT elsewhere | verification queue slice, git activity, release checklist rollup |

**Rule:** Derived/projected values may appear in workspace instruments and optional registry views. They must not be hand-maintained shadow fields on the Mission body.

---

## 22. Completion and Closure

### Completed

Outcome achieved per success conditions. Typical evidence:

- Required packages Complete (or Mission success explicitly does not require them — e.g. pure decision Mission)
- Verification expectations satisfied or waived with rationale
- Material findings governed (not necessarily all fixed)
- Documentation updates identified (may finish during Close)

### Closed

Governance finalized:

- Closure rationale recorded
- Knowledge candidate evaluated
- Links consistent (Opportunity/Package IDs)
- Residual risks/findings have owners/triggers
- Authorizer confirms Close

**Completed ≠ Closed.** Both are necessary in the contract (**Proposed**). Skipping Close is a failure mode.

Mission closure does **not** auto-close Opportunities or auto-promote knowledge.

---

## 23. Granularity

### Too small (not a Mission)

- Individual code change / single test / ordinary ticket / typo fix without bounded outcome narrative
- “Update one button label” unless it stands for a governed remediation outcome

### Too large (not a Mission)

- Entire product lifetime
- Permanent capability ownership
- Indefinite strategic aspiration (“make ClassForge great”)
- “All technical debt”

### Usable signals

| Signal | Prefer Mission-sized |
| --- | --- |
| Outcome achievable in a coherent pursuit window | Weeks-to-a-small-number-of-months, not years |
| Success conditions reviewable without a program office | Yes |
| Package set countable and named | Yes |
| Single primary capability owner possible | Usually |
| Ends with Close | Yes |

### Examples

| Domain | Good Mission-sized example | Bad example |
| --- | --- | --- |
| **ClassForge** | “Establish durable lesson authoring persistence for V1 teacher save/load” (ties CF-OPP-001 / LESSON-001) | “Finish ClassForge MVP” |
| **AlignFit** | “Remediate Body Workspace evidence/ownership gaps for nutrition protocol integrity” (**Inferred** from EOS mentions) | “Improve AlignFit” |
| **Aredir Labs** | “Define Engineering Mission contract, template, and registry” (AREDIR-MISSION-001) | “Build Engineering Operations app” |
| **Quality** | “Close verification gaps for auth session hardening before public exposure” | “Do AQSF” |
| **Architecture discovery** | “Discover Engineering Operations architecture” (DISCOVERY-003) | “All future architecture” |
| **Platform remediation** | “Migrate ClassForge middleware to proxy convention when triggered” | “All Next.js upgrades forever” |

Ordinary package work without a Mission remains valid. **Not every package needs a Mission on day one** — Mission is for operational orientation of *currently pursued* outcomes, especially when coordination or Ops workspace focus matters. Avoid forcing Mission creation for every tiny change (**failure mode guard**).

---

## 24. Concurrency

| Question | Answer |
| --- | --- |
| How many Active Missions? | **No fixed numeric WIP limit** without evidence; practical orientation favors few |
| Primary Mission required? | **Recommended** for Ops workspace orientation — one Primary Active per operator/context |
| Compete for same capability? | Allowed; surface conflict in projections; authorizer resolves |
| Effect on orientation | Multiple Actives without Primary → attention failure (UX-001) |
| WIP constraints | **Governance preference / operating rhythm**, not UI rule and not schema constant |

---

## 25. Hierarchy Evaluation

| Model | Verdict |
| --- | --- |
| No hierarchy | **Accepted for v1** |
| Parent/child Missions | **Rejected for v1** — recreates epic trees |
| Sub-missions | **Rejected for v1** |
| Mission groups | Use registry tags/views later; not artifact hierarchy |
| Initiative → Mission / Program → Mission | **Deferred**; express as related Opportunities + multiple Missions |

**Prefer relationships over hierarchy.** Links: `related_mission_ids`, `supersedes`, shared Opportunity IDs, shared package IDs.

Hierarchy is justified only if future evidence shows relationship graphs cannot express phased work — **Unresolved**, default no.

---

## 26. Operational Workspace Information Contract

Mission, as primary Ops artifact, must make the following **information** available to the workspace (by authoritative fields + projections). **No UI design.**

| Information need | Source |
| --- | --- |
| Why here / outcome | `outcome`, `success_conditions` |
| Context | `owning_project`, capabilities, `scope_*`, `origin` |
| Current state | `state`, `activation`, projected blockers |
| Active packages | `related_package_ids` + package index projection |
| Evidence | `evidence_expectations` + verification projections |
| Blockers | Derived dependency/finding/CI projections |
| Verification posture | Projected from package/QS evidence |
| Relevant decisions | `authorizing_decision`, `related_adr_ids` |
| Likely next actions | Inferred from state + package readiness (advisory projection) |
| Completion confidence | Projected from verification + success-condition checklist |

Mission record = orientation spine. Instruments supply density.

---

## 27. Existing Tool Concept Comparison

| Concept | Similarity | Critical difference |
| --- | --- | --- |
| Jira Epic | Groups related work | Epic often becomes backlog container; Mission must not absorb tickets/packages |
| Jira Issue | Tracked work item | Issue owns workflow/status of tasks; Mission owns orientation/commitment only |
| GitHub Milestone | Date-bounded group | Milestone is schedule artifact; Mission is outcome orientation |
| GitHub Project item | Board card | Board-native; conflicts with repo-first authority |
| Linear Project | Initiative-ish container | Often owns progress UX; Mission must not own package progress |
| Azure DevOps Epic/Feature | Hierarchy layers | Hierarchy risk; Mission rejects tree-as-core |
| Release milestone | Ship gate | Optional association only |
| Product initiative | Strategic theme | Too large / indefinite if used as Mission |

**Worth adapting:** explicit ownership, dependency links, append-only decision notes, terminal rationales.  
**Violates boundaries:** points, sprint ownership, board-as-SoT, epic-as-dumping-ground, auto-status from sub-issues.

---

## 28. Risks and Failure Modes

| Failure mode | Guard |
| --- | --- |
| Mission = ticket rename | Forbid task fields; outcome contract mandatory; no In Progress |
| Mission absorbs Opportunity | Separate lifecycles; Opportunity Packaged ≠ Mission state |
| Mission absorbs Package | Coordinate-by-reference; no acceptance-criteria duplication |
| Mission owns implementation status | Progress is projected only |
| Mission duplicates verification | Evidence expectations + links only |
| Mission = permanent project scope | Granularity rules; must be Closable |
| Mission = unbounded initiative | Require success conditions and scope_out |
| Hierarchy recreates issue trees | No parent/child in v1 |
| Central projection becomes authority | Labs indexes are non-authoritative |
| Derived state manually duplicated | Schema prohibits shadow status fields |
| Closure without evidence | Close checklist requires citations |
| Every small change becomes Mission | Explicit non-requirement; size guards |
| Cross-project Missions obscure ownership | Single authoritative home in v1 |

---

## 29. Open Questions

| # | Question | Status |
| --- | --- | --- |
| Q1 | Exact directory layout (`docs/missions/` vs under Ops) | Unresolved — decide in AREDIR-MISSION-001 |
| Q2 | Whether package headers must require `primary_mission_id` immediately | Unresolved — recommend optional in MISSION-001, mandatory later |
| Q3 | Operator-level Primary Active storage (registry vs personal) | Unresolved — projection concern |
| Q4 | When Mission becomes mandatory for package work | Unresolved — default **optional** until Ops rhythm exists |
| Q5 | AlignFit-specific Mission examples from live repo | Unresolved — pattern-level only here |
| Q6 | Relation to AQSF engagement identity if/when Ops engages QS work | Unresolved — keep nouns distinct |
| Q7 | Numeric WIP guidance after operating evidence | Unresolved |

Q1/Q2 from DISCOVERY-003 on persistence and multi-project: **resolved** in §18 (repo-local authority; no multi-home v1).

---

## 30. Recommended Mission Contract

### Contract summary (normative intent for AREDIR-MISSION-001)

1. **Definition** per §4  
2. **Primary responsibility** per §5  
3. **Non-ownership** per §6  
4. **Lifecycle** per §8  
5. **Activation/readiness** per §9  
6. **Outcome contract** per §10  
7. **Relationship rules** per §11–§17  
8. **Authority** per §18  
9. **Identity** per §19  
10. **Schema classes** per §20–§21  
11. **Completion/closure** per §22  
12. **No hierarchy** per §25  
13. **Ops information contract** per §26  

### Hypothesis final form

> An Engineering Mission is a bounded, outcome-oriented **operational commitment and focus record** that orients currently pursued engineering work by coordinating governed artifacts by reference. It does not replace Opportunity, Package, Finding, Verification, Decision, or Promotion authority.

---

## 31. Implementation Readiness

| Readiness question | Answer |
| --- | --- |
| Ready for schema and template implementation? | **Yes** (documentation contract/template/registry) |
| Ready for application implementation? | **No** |
| Ready to seed live Missions across products? | **No** — wait for AREDIR-MISSION-001; optional Labs self-seed only inside that package if desired |
| Ready to modify AEF / assign C11? | **No** |
| Further discovery required before contract? | **No** for core artifact; open questions are packaging details |

### Follow-on decision (required)

**3. Mission artifact validated and ready for contract implementation.**

---

## 32. Recommended Follow-on Packages

| Order | Package | Purpose |
| --- | --- | --- |
| 1 | **AREDIR-MISSION-001** — Engineering Mission Contract, Template, and Registry | Normative contract text, Markdown template, Labs registry pattern; no app; no product seeding required |
| 2 | Optional **AREDIR-OPS-001** — Markdown operating rhythm | How Missions are reviewed/activated/closed in Labs practice |
| 3 | **AREDIR-DISCOVERY-005** — Projection Contract (from DISCOVERY-003) | How Mission fields are projected in Ops |
| — | Not next | UI, sync, Bootstrap packaging, AEF C11, ClassForge Mission seeding |

**Primary next:** `AREDIR-MISSION-001`.

---

## 33. Authority Confirmation

| Repository | Role | Modified? |
| --- | --- | --- |
| `aredirlabs-com` | Writable | **Yes** — this discovery document only |
| `aredir-quality-systems` | Read-only consult | **No** |
| `aredir-project-bootstrap` | Read-only consult | **No** |
| ClassForge / AlignFit / other products | Evidence only | **No** |

### Constraints honored

No application code, UI, mockups, migrations, API contracts, sync, automation, AEF capability edits, C11 assignment, Bootstrap/QS/product modifications, Mission template file, or live Mission seeds.

---

## 34. Final Git Status

Verified expectation at completion:

```text
aredirlabs-com
  Untracked/added:
    docs/discovery/AREDIR-DISCOVERY-004_ENGINEERING_MISSION_ARTIFACT_DEFINITION.md

aredir-quality-systems     unmodified
aredir-project-bootstrap   unmodified
product repositories       unmodified
```

No commit created unless separately requested.

---

## Appendix A — Completion Criteria Checklist

| Criterion | Section |
| --- | --- |
| Canonical definition | §4 |
| Single primary responsibility | §5 |
| What it does not own | §6 |
| Creation and authorization | §7 |
| Lifecycle and transitions | §8 |
| Readiness and activation | §9 |
| Outcome requirements | §10 |
| Opportunity and Package relationships | §11–§12 |
| Project and capability authority | §13 |
| Verification and decision boundaries | §14–§15 |
| Authoritative vs projected | §20–§21 |
| Completion and closure | §22 |
| Granularity | §23 |
| Concurrency | §24 |
| Hierarchy justified? | §25 — **No for v1** |
| Ops information contract | §26 |
| Ready for schema/template? | §31 — **Yes** |

---

## Appendix B — Failure-Mode Analysis (required)

| # | Failure mode | Evaluation | Contract guard |
| --- | --- | --- | --- |
| F1 | Ticket rename | High risk if lifecycle mimics issues | Ban In Progress; require outcome contract; no estimate/assignee core fields |
| F2 | Absorb Opportunity | High | Separate lifecycles; Packaged independent; Mission does not close Opportunity |
| F3 | Absorb Package | High | Reference-only; packages own acceptance/progress |
| F4 | Own implementation status | High | Progress projected; no % fields |
| F5 | Duplicate verification | High | Expectations + links; QS/package remain SoT |
| F6 | Permanent project scope | Medium | Closability + granularity signals |
| F7 | Unbounded initiative | Medium | success_conditions + scope_out mandatory at Authorize |
| F8 | Hierarchy → epic tree | High | No parent/child v1 |
| F9 | Projection → authority | High | Single repo SoT; Labs index non-authoritative |
| F10 | Manual derived-state duplication | High | Schema classification forbids shadow statuses |
| F11 | Closure without evidence | High | Close checklist |
| F12 | Every small change = Mission | Medium | Optional Mission; size guards; examples |
| F13 | Cross-project ownership fog | Medium | One authoritative home v1 |

---

*End of AREDIR-DISCOVERY-004.*
