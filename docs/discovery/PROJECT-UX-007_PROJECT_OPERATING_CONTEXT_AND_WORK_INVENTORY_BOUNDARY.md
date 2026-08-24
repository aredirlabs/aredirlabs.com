# PROJECT-UX-007 — Project Operating Context and Work Inventory Boundary

| Field | Value |
| --- | --- |
| **Package** | PROJECT-UX-007 (Package 3) |
| **Type** | Authenticated operating-environment discovery / bounded implementation authorization |
| **Status** | **AUTHORIZED FOR IMPLEMENTATION** |
| **Review date** | 2026-08-23 |
| **Governing architecture** | PROJECT-UX-004; PROJECT-UX-005; PROJECT-UX-006; AREDIR-DISCOVERY-009 through -012 |
| **Decision** | **AUTHORIZED FOR IMPLEMENTATION** — Package 3: Project Operating Context and Work Inventory Boundary |

## 1. Decision

The next highest-value operating-environment problem is the Project detail's loss of operational orientation when an unbounded Engineering Work collection dominates the page. This is an information-architecture problem, not a local spacing, card, or visual-token defect.

**Package 3 should introduce a Project operating brief with a bounded Engineering Work projection and a complete Project-scoped Engineering Work inventory route.** It is the smallest package that makes Project truth, Operational Focus, and Work traversal usable together without assuming the complete final shell, inventory, inspector, or command environment.

This changes the sequencing proposed in PROJECT-UX-004. Its former shell-first Package 3 remains valid architecture, but runtime evidence shows that shell work alone would not resolve the current dominant failure: Project-level authority is displaced by a large embedded collection. The former Packages 4 and 5 should not be implemented wholesale now; this package takes only their shared prerequisite: separating the complete Work collection from the Project operating surface.

## 2. Current authenticated operating-surface inventory

| Surface | Current responsibility and implementation shape | Relevant finding |
| --- | --- | --- |
| Authenticated shell | `WorkspaceNav` is a desktop sidebar and narrow horizontal route list; the layout supplies a single scrolling main region. | It provides global movement, but not orientation-band ancestry, Project persistence, invoked narrow navigation, or contextual command entry. |
| Workspace | Continuation-first projection, independent attention, and bounded active-Project orientation. | This is the strongest current operating surface. It already preserves no/single/many continuation truth and does not derive continuation from focus. |
| Project registry | A full-width table of Project identity, status, stage, target, and repository. | It is a collection entry point but does not provide a Project operational brief or Work traversal context. |
| Project detail | One vertical stack: full Engineering Work section, Operational Focus (including selection history), overview, registry fields, milestones, documents, prompts, and notes. | Engineering Work appears first and can consume the page before focus and Project authority are visible. The page is a capability catalog rather than a Project operating context. |
| Project Engineering Work section | Sorts every owned Work record by lifecycle rank and renders one expanded item plus every remaining item. | It is an unbounded collection embedded in detail. The locally named “primary” item is presentation order, not focus, priority, continuation, or authority. |
| Operational Focus | Correctly renders shared selection, derived projection, zero/one/many next-step truth, controls, and full selection history. | Its authority model is correct after Package 2, but its vertical placement prevents it acting as an immediate Project signal. |
| Engineering Work detail | A vertical document-like sequence of objective/current position, next action, workflow context, knowledge, evidence, focus control, history, record details, and controls. | Functionally correct; its dense information needs inspector/progressive-disclosure work later, not a local component polish package now. |
| Lifecycle authoring | Activate, operate/edit, evidence, and completion use separate long, focused form routes. | Correctly contextualized domain actions, but they retain document-form composition; rework belongs with unified Work detail and invoked authoring later. |

## 3. Runtime evidence and diagnosis

The observed Project-detail length, hidden focus projection, document-like Work detail, and long operation/completion forms share a cause: the authenticated product still presents major capabilities as serial sections rather than assigning each a spatial responsibility.

The following are **information-architecture symptoms**:

- An unbounded Work list inside Project detail, rather than a complete collection with a Project-local entry point.
- Project operational truth and focus appearing below its inventory rather than in a dominant operating brief.
- Full history rendered as a resident peer of current truth rather than a subordinate disclosure or route.
- Engineering Work detail making evidence, relationships, provenance, history, and metadata peers of its lifecycle posture and current next action.
- Forms consuming a whole document route when no future environment boundary yet distinguishes invoked authoring from focused lifecycle operation.

The following are **local implementation defects or deferred refinements**, not Package 3 scope:

- The old shell's rail width, mobile horizontal navigation, and incomplete visual-system adoption.
- Individual card geometry, typography, or spacing within existing surfaces.
- The absence of a reusable inspector, command palette, filter model, or master/detail component family.

## 4. Alternatives evaluated

| Candidate boundary | Value | Why it is not the recommended next package |
| --- | --- | --- |
| Shell, persistent context, and responsive navigation (former Package 3) | Establishes durable cross-altitude framing. | Does not remove the embedded unbounded Work collection or elevate Project focus; the problematic Project page remains materially unchanged. |
| Full Engineering Work inventory and master/detail (former Package 4) | Enables powerful traversal and later lateral detail navigation. | Filter/search semantics, selection routes, responsive master/detail, and detail previews are a larger independent capability than needed to fix Project orientation. |
| Full Project operating-context restructure (former Package 5) | Reaches the intended final Project altitude. | Combining context rail, attention, recent outcomes, inspector/library access, milestones, and all Project sections would overreach the smallest validated increment. |
| Unified Engineering Work detail (former Package 6) | Addresses document-like Work detail directly. | Does not correct the Project altitude from which most Work is entered and would introduce inspector/history architecture before collection separation. |
| **Project operating context and Work inventory boundary** | Elevates Project authority and focus, preserves access to all Work, and makes the Work collection a first-class destination. | **Recommended.** It fixes the observed structural failure with a limited route and composition boundary. |

## 5. Recommended Package 3

### Objective

Make a Project immediately orienting and operable by giving it one dominant Project operating brief, placing Operational Focus in that brief, and replacing its resident complete Engineering Work list with an explicitly bounded projection plus a complete Project-scoped inventory destination.

### Primary architectural capability

**The separation of Project operating context from complete Engineering Work inventory.**

The Project page becomes the authority-oriented operating surface. The Project-scoped inventory becomes the complete collection authority for Work presentation. This is a route and composition boundary only; it does not establish a master/detail system.

### Included capabilities

1. A Project operating brief at the top of Project detail that presents Project identity, named status, neutral stage, target where present, and a compact Project-local navigation/return context.
2. Operational Focus in that operating brief, ahead of the Work projection; preserve the existing shared-selection, projection-suppression, zero/one/many, and derived-next-action semantics exactly.
3. A bounded Engineering Work projection on Project detail. It must state the total, render a defined limited set using the non-authoritative deterministic presentation rule required in section 6.1, make every shown item navigable, and link to the complete Project-scoped inventory.
4. A complete Project-scoped Engineering Work inventory route that contains every owned Work record and preserves the existing Work detail destinations and lifecycle/focus controls. Initial scope may be structured rows and lifecycle grouping only; it must not claim filtering, ranking, or master/detail behavior it does not implement.
5. Project-detail reordering and progressive disclosure sufficient to make current Project truth precede registry metadata, full focus history, documents, prompts, notes, and other secondary records. Existing destination routes remain available; no authority is removed.
6. Wide and narrow responsive behavior for the new Project brief, bounded projection, and inventory route, including direct-entry and Back paths between Project, inventory, and Work detail.
7. Failure and empty states that distinguish unavailable data from an empty Work collection and preserve the Project context and a viable return path.

### Explicit exclusions and deferrals

- Activity rail replacement, orientation band across all altitudes, global attention entry, narrow invoked navigation, and command-surface entry architecture.
- A persistent Project context rail; Package 3 establishes its content contract in the Project brief but does not install a cross-route rail.
- Search, filters, saved views, route-backed query state, master/detail, row-selection routes, sibling traversal, previews, or an inventory/table primitive family.
- Contextual inspector, unified Engineering Work detail, evidence/knowledge/provenance relocation, or history redesign beyond bounded/progressively disclosed Project presentation.
- Lifecycle/form redesign, invoked authoring, completion-flow changes, repository evidence behavior, schema, migrations, queries that change authority, or seed data.
- Any Package 2 modification; personal focus, assignments, ranking, recommendation, notification, discussion, automatic focus transfer, priority authority, lifecycle semantics, relationship semantics, repository/agent/CI orchestration, dashboard architecture, or decorative redesign.

## 6. Architectural invariants

Implementation must preserve all PROJECT-UX-004 and Package 2 authority boundaries, including:

1. Project identity, status, stage, target, and milestones remain Project authority; Work lifecycle, next action, condition, outcome, and workflow remain Work authority.
2. Operational Focus remains explicit shared Project selection with a query-time derived projection. It is neither inventory selection, continuation, attention, priority, nor personal work.
3. Zero, one, and many focused Work items are equally truthful. A singular Project next step appears only for exactly one projected focus with a usable Work next action; no primary Work is inferred from display order.
4. Continuation and attention remain independently derived; their order or presence does not select or rank Work.
5. A bounded Project projection must disclose its bound and total and provide the complete inventory. No Project detail embeds an unbounded Work collection.
6. Presentation order is non-authoritative and must not use `priority`, recency, focus, or a lifecycle-rank “primary” as a claim of importance.
7. Current Project truth precedes history and metadata. Selection history remains append-only and reachable without losing Project context.
8. The package uses existing authoritative read models and domain actions. It neither adds nor changes persistence or lifecycle behavior.
9. Desktop and narrow routes preserve URL-reconstructible identity and standard Back behavior; inventory navigation does not mutate Operational Focus.

### 6.1 Bounded Engineering Work projection semantics

The bounded Engineering Work projection is a **non-authoritative inventory projection**. It is not Operational Focus, continuation, attention, priority, recommendation, recency authority, or inferred importance. Its presence, membership, and order must not claim that a shown item is primary, current, most important, or next Work.

Before Package 3 implementation acceptance, the implementation record must define one exact deterministic presentation rule for both membership and ordering and the implementation must cover that rule with automated tests. The rule must be documented as presentation-only and must not derive membership or ordering from Operational Focus, continuation, attention, priority, recommendation, recency, or inferred importance. It must not introduce a new authority-bearing semantic merely to make the list determinate.

The projection must separately disclose its configured bound and the complete-inventory total. If more records exist than are rendered, the complete-inventory route is the truthful recovery path; omission from the bounded projection conveys no operational meaning.

### 6.2 Zero-Operational-Focus presentation

Zero Operational Focus remains truthful shared Project authority and must remain explicitly communicated. It does not require a visually dominant empty region, however. When one or more selections exist, Operational Focus must be readily visible in the Project operating brief. When no selection exists, the brief must communicate “no focus selected” compactly in its existing authority context, without allowing an empty focus surface to dominate Project orientation.

This is presentation hierarchy only. It does not change Package 2 selection, projection, provenance, concurrency, invalidation, zero/one/many, continuation, attention, or next-step semantics, and it must never suppress the truthful absence of a focus selection.

## 7. Affected surfaces and likely implementation boundaries

| Boundary | Expected work |
| --- | --- |
| `src/app/workspace/projects/[slug]/page.tsx` | Recompose the Project page around the operating brief, focus, bounded Work projection, and secondary information. |
| Project detail / focus / Work components | Evolve or replace the present full Work section; add focused composition for the operating brief and bounded projection. Preserve the existing focus authority component or extract presentation-only portions without changing focus commands. |
| `src/app/workspace/projects/[slug]/engineering-work/` | Add the complete Project-scoped inventory route while retaining current `new`, Work detail, activate, edit, evidence, and complete routes. |
| Workspace navigation and Work detail | No behavior change required. Only link destinations and ancestry/back labels may be adjusted where necessary for the new route. |
| Queries and tests | Read-only projection shaping and route/component tests may be added as needed; no schema, migration, mutation, or operational semantics work. |

## 8. Operator-visible acceptance criteria

1. Opening a Project shows its identity/posture and Operational Focus before any Work collection.
2. Operators can see the truthful zero/one/many focus state and the safe singular/plural/null next-action projection without scrolling through an inventory.
3. The Project page contains only a clearly bounded Work projection, names the total, and links to a complete Project Work inventory.
4. The complete inventory shows every Work item owned by the Project and every row opens the existing authoritative Work detail.
5. The bounded projection applies the documented, tested deterministic presentation rule; its membership and order do not derive from focus, continuation, attention, priority, recommendation, recency, or inferred importance, and do not label a Work item as primary, current, most important, next, or focused unless that fact is independently and explicitly true.
6. Selecting/opening a Work row never changes focus; focus controls retain Package 2 authorization, concurrency, provenance, and invalidation behavior.
7. Project history and secondary records remain reachable, but current Project truth remains visually prior.
8. Direct links to the Project, Project inventory, and Work detail work after refresh; browser Back returns through the expected Project/inventory route sequence.
9. The composition works at representative authenticated desktop and narrow widths, in both themes, without horizontal clipping or a stacked desktop-only layout.
10. Empty and failed Work retrieval states preserve Project orientation and clearly distinguish “none exists” from “could not load.”

## 9. Risks and regression boundaries

| Risk | Required protection |
| --- | --- |
| A display order reintroduces accidental priority or a surrogate primary Work. | Define and document one deterministic presentation-only membership/order rule before acceptance; test that focus, continuation, attention, priority, recommendation, recency, and inferred importance do not determine it. |
| Moving focus changes Package 2 semantics or hides plural selections/history. | Reuse the existing projection and controls; verify zero/one/many, conditioned/suppressed, clear, and history access. |
| The new route leaves some Work unreachable or breaks authoring/lifecycle deep links. | Test all Project-owned Work destinations and retain all existing nested routes. |
| “Bounded” conceals records. | Display total and a complete-inventory link in normal, empty, and failure-adjacent states. |
| Responsive layout turns the bounded projection into a truncated inventory with no recovery. | Verify narrow navigation to the full inventory and Back context. |
| Secondary-section changes discard source authority or records. | No schema/data mutation; retain documents, prompts, notes, milestones, registry fields, and selection history behind explicit disclosure or existing destinations. |

## 10. Why this advances PROJECT-UX-004 without premature completion

PROJECT-UX-004 requires Project altitude to be an operating context, no detail surface to embed an unbounded collection, and Operational Focus to be visible as distinct shared authority. Package 3 realizes those three rules at the single most burdened altitude. It establishes the content and route boundaries on which a later persistent Project rail and master/detail inventory can build.

It deliberately does not claim the final eight-region topology. The activity rail, orientation band, persistent Project rail, inspector, history region, command surface, route-backed master selection, and cross-surface responsive system remain separate work because their responsibilities are broader than the currently evidenced problem.

## 11. Logical next work after Package 3 (not authorized here)

The logical next package is **Shell and persistent cross-altitude context**: activity rail, orientation band, Project-context persistence across Project and Work routes, responsive invoked navigation, and non-executing command-surface entry. With the Project brief and inventory boundary established, that package can preserve real Project context instead of adding shell chrome around the current vertical catalog.

Later work can then add route-backed Work inventory filtering/master-detail, unified Work detail with inspector/history composition, Workspace instrumentation, and supporting inventories/authoring in the order validated by operator use. This record authorizes none of that later work.

## 12. Verification and completion record

### Documentation changed

- `docs/discovery/PROJECT-UX-007_PROJECT_OPERATING_CONTEXT_AND_WORK_INVENTORY_BOUNDARY.md`
- `docs/discovery/README.md`

### Verification performed

- Reviewed PROJECT-UX-004's topology, altitude, inventory, focus, invariants, and former package sequence.
- Reviewed PROJECT-UX-005 and PROJECT-UX-006 completion boundaries; no Package 2 defect was identified.
- Reviewed AREDIR-DISCOVERY-009 through -012 for current-state, Project authority, selection/focus, lifecycle, and deferral boundaries.
- Inspected the authenticated Workspace, Project registry/detail, Project Work/focus components, Work detail, lifecycle routes/forms, and shared shell/navigation.
- Confirmed no production code, schema, migration, seed, runtime behavior, or test behavior was changed by this discovery package.

### Human-authorization status

**AUTHORIZED FOR IMPLEMENTATION.** PROJECT-UX-007 discovery is accepted and Package 3 — Project Operating Context and Work Inventory Boundary is authorized for implementation. Implementation remains bounded by this record. Later shell, master/detail, inspector, filtering, and authoring packages remain unauthorized.
