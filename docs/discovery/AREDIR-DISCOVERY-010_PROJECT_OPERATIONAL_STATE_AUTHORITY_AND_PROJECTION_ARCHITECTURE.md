# AREDIR-DISCOVERY-010 — Project Operational State Authority and Projection Architecture

| Field | Value |
|-------|-------|
| **Work item** | AREDIR-DISCOVERY-010 |
| **Scope** | Authority model for Project operational state and projection architecture |
| **Review date** | 2026-08-22 |
| **Depends on** | AREDIR-DISCOVERY-009 (Current-State Information Architecture Inventory) |
| **Trigger** | Package 2: define authority rules and projection model before implementation |
| **Outcome** | Authority decisions, invariants, and decision matrix; no runtime or schema changes |

---

## 1. Executive Summary

This package defines the authority model for Project operational state. It determines what Project legitimately owns, what Engineering Work owns, what should be derived, and what must remain independently authored.

**Core decisions:**

1. **Project status** (`active`/`testing`/`paused`/`planning`/`archived`) describes the Project's **business and operational lifecycle posture**, not the aggregate state of Engineering Work. It remains **Project-authoritative**. Legitimate divergences exist: a paused project may have active work; an active project may have no active work; a testing project may have active delivery work alongside testing.

2. **Project stage** (`concept`/`prototype`/`mvp`/`uat`/`production`/`maintenance`) describes the Project's **maturity classification**. It remains **Project-authoritative**. It is not derivable from Engineering Work state.

3. **Project `currentFocus`** — Independent authority as an operational truth is **rejected**. Engineering Work is the stronger authority for operational activity. However, a singular derived Project focus is **not yet safely computable** because multiple active Engineering Work records may coexist, and Aredir has not yet defined sufficient prioritization, selection, or coordination semantics to determine which work deserves Project-level emphasis. The final disposition of `currentFocus` is **deferred pending selection semantics**. (See section 8.)

4. **Project `nextStep`** — Same status as `currentFocus`. Independent authority is rejected; Engineering Work owns each work item's `currentNextAction`. A singular Project-level next step requires a selection mechanism to determine which work item's action deserves Project-level designation. **Deferred pending selection semantics**. (See section 9.)

5. **Focus vs. Next Action** — These are distinct concepts. Focus concerns **which work or operational concern currently deserves primary emphasis**. Next Action concerns **what should happen next within a specific Engineering Work record**. A future architecture may connect Project focus to a selected/prioritized work item, and that work item's next action may then become the Project-level next step. This relationship is not yet established.

6. **Continuation** and **active work** are distinct concepts that must not be collapsed. Continuation is a strict projection requiring eligibility criteria; active work is a broader state.

7. **Attention** is a derived operational projection from Engineering Work conditions, incomplete defect context, and blocked milestones. It is not Project state.

8. **Milestones** remain independently authored Project-level authority. They represent planning checkpoints and target outcomes, not Engineering Work state.

9. **Recent outcomes** are derived from completed Engineering Work within the Project.

10. **`activeWork`** is a redundant/denormalized persisted representation whose future disposition is deferred pending implementation and demonstrated performance need. The workspace already computes projections from live Engineering Work queries.

**Strongest invariant:** A Project summary may project underlying authoritative data without becoming another authority for that data. No current Project focus is a valid operational state and must not be replaced by historical content solely to avoid an empty presentation.

---

## 2. Package 1 Baseline

Package 1 (AREDIR-DISCOVERY-009) established:

- Engineering Work is the most mature operational artifact with lifecycle-governed state, append-only history, provenance, repository references, and continuation/attention projection.
- Project independently stores `currentFocus` and `nextStep` that overlap semantically with Engineering Work operational state.
- No synchronization exists between Project operational narrative and Engineering Work.
- Seed data is the primary authoring mechanism for Project metadata.
- The workspace already demonstrates successful derived projections: continuation, attention, and operating snapshot.

This package evaluates and refines the hypothesis: *A Project should be a projection of authoritative operational information wherever stronger underlying authority already exists, while remaining authoritative for genuinely Project-owned identity, configuration, and lifecycle concepts.*

---

## 3. Scope and Method

### Scope
All Project-state concepts that materially contribute to understanding current operational state:
- `workspaceProjects` schema fields
- Project detail and workspace page rendering
- Continuation and attention projection logic
- Milestone behavior
- Engineering Work lifecycle and how it relates to Project state
- Seed Project metadata

### Method
1. Re-inspect schema, queries, and continuation logic against Package 1 findings
2. Evaluate each Project field for intrinsic ownership vs. derivation feasibility
3. Test authority assignments against multi-work and edge-case scenarios
4. Produce explicit invariants and decision matrix

---

## 4. Project vs. Engineering Work Authority Model

### What is intrinsically about the Project itself

These concepts describe the Project as a business/operational entity, independent of any specific Engineering Work:

- **Identity**: name, slug, description, category
- **Business lifecycle posture**: status (active/testing/paused/planning/archived)
- **Maturity classification**: stage (concept/prototype/mvp/uat/production/maintenance)
- **Temporal targets**: targetDate
- **External references**: repoUrl, publicUrl
- **Configuration**: workspaceSettings (company-level)

### What is actually about work occurring within the Project

These concepts describe operational activity that happens to be scoped to a Project:

- Current next action (which work item needs attention now)
- Current outcome (what has been achieved recently)
- Active/in-review work distribution
- Continuation eligibility
- Attention conditions
- Repository evidence
- Lifecycle history

### The boundary principle

Project owns **identity, posture, and configuration**. Engineering Work owns **operational activity and lifecycle**. The boundary is not "Project owns everything about the project" but rather "Project owns what is intrinsically about the Project as a planning and classification entity."

---

## 5. Field-by-Field Authority Analysis

### `name`

| Concept | Current Owner | Intended Authority | Why | Derivation Inputs | Mutation Semantics | Historical Semantics | Presentation Role |
|---------|---------------|-------------------|-----|-------------------|-------------------|---------------------|-------------------|
| Project name | `workspaceProjects.name` | Project authoritative | Identity field; independent of any work | None | Manual (seed upsert) | Retained unchanged | Display on all project surfaces |

### `slug`

| Concept | Current Owner | Intended Authority | Why | Derivation Inputs | Mutation Semantics | Historical Semantics | Presentation Role |
|---------|---------------|-------------------|-----|-------------------|-------------------|---------------------|-------------------|
| Project slug | `workspaceProjects.slug` | Project authoritative | Identity/routing field | None | Manual (seed upsert) | Retained unchanged | URL routing, display |

### `description`

| Concept | Current Owner | Intended Authority | Why | Derivation Inputs | Mutation Semantics | Historical Semantics | Presentation Role |
|---------|---------------|-------------------|-----|-------------------|-------------------|---------------------|-------------------|
| Project description | `workspaceProjects.description` | Project authoritative | Describes the Project's purpose and scope | None | Manual (seed upsert) | Retained unchanged | Project detail display |

### `category`

| Concept | Current Owner | Intended Authority | Why | Derivation Inputs | Mutation Semantics | Historical Semantics | Presentation Role |
|---------|---------------|-------------------|-----|-------------------|-------------------|---------------------|-------------------|
| Project category | `workspaceProjects.category` | Project authoritative | Classification of the Project's domain | None | Manual (seed upsert) | Retained unchanged | Filter, display |

### `status`

| Concept | Current Owner | Intended Authority | Why | Derivation Inputs | Mutation Semantics | Historical Semantics | Presentation Role |
|---------|---------------|-------------------|-----|-------------------|-------------------|---------------------|-------------------|
| Project status | `workspaceProjects.status` | **Project authoritative** | Describes business/operational lifecycle posture | None | Manual (seed upsert); future: project mutation action | Retained unchanged | Filters operating projects, continuation eligibility, workspace display |

**Detailed analysis:** Status values (`active`/`testing`/`paused`/`planning`/`archived`) describe the Project's relationship to active development from a business perspective, not the aggregate state of Engineering Work. Evidence:

- `paused` project may have active work (paused by business decision, work not yet resolved)
- `active` project may have no active work (between cycles, or work is all proposed/completed)
- `testing` project may have active delivery work (fixing UAT regressions)
- `archived` project retains historical completed work

Status determines whether the Project participates in the workspace continuation system (`queries.ts:69`: `operatingProject = inArray(workspaceProjects.status, ["active", "testing"])`). This is a deliberate business decision about which Projects are "live," not a derivation from work state.

### `stage`

| Concept | Current Owner | Intended Authority | Why | Derivation Inputs | Mutation Semantics | Historical Semantics | Presentation Role |
|---------|---------------|-------------------|-----|-------------------|-------------------|---------------------|-------------------|
| Project stage | `workspaceProjects.stage` | **Project authoritative** | Describes maturity classification | None | Manual (seed upsert) | Retained unchanged | Project detail display |

**Detailed analysis:** Stage values (`concept`/`prototype`/`mvp`/`uat`/`production`/`maintenance`) describe where the Project is in its maturity journey. This is a human classification that does not change based on Engineering Work lifecycle events. A Project in `uat` stage does not become `production` when a specific work item completes. Stage transitions are deliberate human decisions about the Project's evolution.

Stage is currently display-only in the UI (`project-overview-section.tsx:42`) and is not used in any query logic. It has no effect on continuation, attention, or operating snapshot.

### `currentFocus`

| Concept | Current Owner | Intended Authority | Why | Derivation Inputs | Mutation Semantics | Historical Semantics | Presentation Role |
|---------|---------------|-------------------|-----|-------------------|-------------------|---------------------|-------------------|
| Project currentFocus | `workspaceProjects.currentFocus` | **Independent authority rejected; final disposition deferred pending selection semantics** | Describes which work matters most right now; Engineering Work has stronger authority for operational activity, but singular focus is not yet computable from multiple work records | Engineering Work state within Project (insufficient without selection semantics) | Manual (seed upsert); no update action exists | Not necessarily reconstructable without selection events | Workspace page, project detail, project overview |

**Detailed analysis:** `currentFocus` answers "which work or operational concern currently deserves primary emphasis for this Project?" This is a Project-level coordination concept — not the same as a work-level next action.

Engineering Work is the stronger authority for operational activity. Independent manual maintenance of `currentFocus` creates duplicate/ambiguous authority today. However, a singular derived Project focus **cannot yet be safely computed** when multiple Engineering Work records coexist, because:

- A recently edited EW record is not necessarily more important to the Project.
- `active` is not inherently more important than `in_review`. An in-review architectural decision may legitimately be the Project's primary focus while unrelated active delivery work also exists.
- Recency, record order, state ordering, and incidental query ordering are not sufficient architectural semantics for Project focus.
- The current workspace implementation may order records by recency or state for presentation, but **implementation ordering must not be elevated into authoritative selection semantics**.

If one and only one relevant Engineering Work record exists, Project presentation may safely project it. If multiple plausible records exist, the projection must preserve ambiguity rather than invent precedence.

**Disposition:** `currentFocus` loses its status as unquestioned independent operational truth. Its final replacement is deferred pending explicit operational-selection or prioritization semantics. Schema removal is not yet recommended — that is an implementation decision downstream of the unresolved semantics.

### `nextStep`

| Concept | Current Owner | Intended Authority | Why | Derivation Inputs | Mutation Semantics | Historical Semantics | Presentation Role |
|---------|---------------|-------------------|-----|-------------------|-------------------|---------------------|-------------------|
| Project nextStep | `workspaceProjects.nextStep` | **Independent authority rejected; singular projection deferred pending selection semantics** | Describes the next Project-level action; Engineering Work owns each work item's next action, but which work item's action deserves Project-level designation is unresolved | Engineering Work `currentNextAction` (insufficient without selection semantics) | Manual (seed upsert); no update action exists | Not necessarily reconstructable without selection events | Workspace page, project detail, project overview |

**Detailed analysis:** `nextStep` answers "what happens next for this Project?" Engineering Work already owns truthful next actions at the individual work-record level (`currentNextAction`). The unresolved question is: **which work item's next action, if any, deserves Project-level designation?**

The Project-level `nextStep` is either: (a) the same information duplicated from one EW item, (b) a higher-level strategic step not corresponding to any specific work, or (c) a stale value. Without selection semantics, multiple next actions remain multiple truthful operational facts — they should not be collapsed into a single value through recency or state ordering.

**Disposition:** Same as `currentFocus`. Independent authority is rejected. Singular projection is deferred pending selection semantics. Schema removal is not yet recommended.

### `targetDate`

| Concept | Current Owner | Intended Authority | Why | Derivation Inputs | Mutation Semantics | Historical Semantics | Presentation Role |
|---------|---------------|-------------------|-----|-------------------|-------------------|---------------------|-------------------|
| Project targetDate | `workspaceProjects.targetDate` | Project authoritative | Business deadline; independent of work state | None | Manual (seed upsert) | Retained unchanged | Project detail display |

### `repoUrl` / `publicUrl`

| Concept | Current Owner | Intended Authority | Why | Derivation Inputs | Mutation Semantics | Historical Semantics | Presentation Role |
|---------|---------------|-------------------|-----|-------------------|-------------------|---------------------|-------------------|
| Project URLs | `workspaceProjects.repoUrl/publicUrl` | Project authoritative | External references to the Project | None | Manual (seed upsert) | Retained unchanged | Project detail links |

### Milestones

| Concept | Current Owner | Intended Authority | Why | Derivation Inputs | Mutation Semantics | Historical Semantics | Presentation Role |
|---------|---------------|-------------------|-----|-------------------|-------------------|---------------------|-------------------|
| Milestones | `workspaceProjectMilestones` | **Project authoritative** | Planning checkpoints; represent target outcomes and deadlines | None | Manual CRUD (seed + server actions) | Retained unchanged | Operating snapshot (next/blocked), project detail |

**Detailed analysis:** Milestones represent planning outcomes: "we will achieve X by date Y." They are not Engineering Work state. A milestone being `active` does not mean Engineering Work is active. A milestone being `completed` does not mean linked Engineering Work is completed. The Relationship Model (`ENGINEERING-WORK-RELATIONSHIP-MODEL.md:26`) explicitly defers milestone-to-work linkage.

Milestones contribute to attention (blocked milestones appear in workspace attention at `queries.ts:192`). This is a legitimate projection: blocked milestones require awareness.

### Active Engineering Work

| Concept | Current Owner | Intended Authority | Why | Derivation Inputs | Mutation Semantics | Historical Semantics | Presentation Role |
|---------|---------------|-------------------|-----|-------------------|-------------------|---------------------|-------------------|
| Active work summary | Engineering Work state | **Derived aggregate** | Aggregate of Engineering Work state within Project | `workspaceEngineeringWork.state` filtered by projectId | Computed at query time | Recoverable from EW history | Project detail (work list), operating snapshot |

### `activeWork` (persisted field on Project)

| Concept | Current Owner | Intended Authority | Why | Derivation Inputs | Mutation Semantics | Historical Semantics | Presentation Role |
|---------|---------------|-------------------|-----|-------------------|-------------------|---------------------|-------------------|
| Project `activeWork` | `workspaceProjects.activeWork` | **Redundant/denormalized representation; disposition deferred** | Persisted snapshot of EW data; workspace already computes from live EW queries | Engineering Work state | Unknown (no update action observed) | May become stale | Project detail (potential, not confirmed as operationally required) |

**Detailed analysis:** The workspace dashboard and continuation system derive their data from live EW queries, not from the `activeWork` field on Project. No performance evidence supports retaining this field as a required cache. Its disposition is deferred pending implementation and demonstrated performance need. It should not be prescribed as kept or removed until evidence warrants a decision.

### Continuation Candidates

| Concept | Current Owner | Intended Authority | Why | Derivation Inputs | Mutation Semantics | Historical Semantics | Presentation Role |
|---------|---------------|-------------------|-----|-------------------|-------------------|---------------------|-------------------|
| Continuation | Workspace projection | **Derived projection** | Multi-factor eligibility projection | EW state + Project status + condition + defect context + required text | Computed at query time | Not persisted | Workspace page |

### Attention Conditions

| Concept | Current Owner | Intended Authority | Why | Derivation Inputs | Mutation Semantics | Historical Semantics | Presentation Role |
|---------|---------------|-------------------|-----|-------------------|-------------------|---------------------|-------------------|
| Attention | Workspace projection | **Derived projection** | Composite of conditions requiring awareness | EW conditions + incomplete defect context + blocked milestones | Computed at query time | Not persisted | Workspace page |

### Recent Completed Outcomes

| Concept | Current Owner | Intended Authority | Why | Derivation Inputs | Mutation Semantics | Historical Semantics | Presentation Role |
|---------|---------------|-------------------|-----|-------------------|-------------------|---------------------|-------------------|
| Recent outcomes | Engineering Work | **Derived from Engineering Work** | Completed work outcomes within Project | EW `currentOutcome` where state = 'completed' and projectId matches | Computed at query time | Recoverable from EW history | Project detail (future projection) |

---

## 6. Project Status Semantics

### Status values and their meanings

| Value | Semantic | Evidence |
|-------|----------|----------|
| `planning` | Project is being defined; no active development expected | `schema.ts:22`; seed: LeagueOS |
| `active` | Project is in active development; work is being undertaken | `schema.ts:18`; seed: AredirLabs.com |
| `testing` | Project is in a validation/testing phase; development may continue alongside testing | `schema.ts:19`; seed: AlignFit |
| `paused` | Project development is intentionally suspended by business decision | `schema.ts:20`; seed: ClassForge |
| `archived` | Project is no longer active; retained for historical reference | `schema.ts:21` |

### Status is not derivable from Engineering Work

Status describes **business posture**, not work state. Legitimate divergences:

| Scenario | Status | Engineering Work state | Legitimate? | Why |
|----------|--------|----------------------|-------------|-----|
| Paused project with active work | `paused` | Active/in-review EW exists | Yes | Business paused the project; work was not resolved |
| Active project with no active work | `active` | All work proposed or completed | Yes | Between cycles; project is still active |
| Testing project with active delivery work | `testing` | Active delivery EW + active testing EW | Yes | Fixing UAT regressions alongside testing |
| Archived project with completed work | `archived` | Completed EW retained | Yes | Historical work is not deleted on archive |
| Planning project with proposed work | `planning` | Proposed EW exists | Yes | Planning phase; work is captured but not started |

### Status governs workspace participation

`operatingProject` at `queries.ts:69` filters on `["active", "testing"]`. This is a deliberate business decision: these are the Projects whose work can appear in continuation and attention. Paused, planning, and archived Projects are excluded from the workspace operating experience.

This is **not** a derivation from Engineering Work state. It is a business rule about which Projects are considered "live."

### Status should remain Project-authoritative

Status transitions are deliberate human decisions about the Project's business lifecycle. They should not be automatically triggered by Engineering Work lifecycle events.

---

## 7. Project Stage Semantics

### Stage values and their meanings

| Value | Semantic | Evidence |
|-------|----------|----------|
| `ideation` | Conceptual; Project exists as an idea with minimal structure | `schema.ts:29`; seed: LeagueOS |
| `design` | Requirements or architecture are being shaped | `schema.ts:27`; seed: ClassForge |
| `implementation` | Active development is underway | `schema.ts:30`; seed: AredirLabs.com |
| `validation` | Testing or verification is in progress | `schema.ts:31`; seed: AlignFit |
| `maintenance` | Post-launch support; may receive defect fixes or enhancements | `schema.ts:28` |

### Stage is not derivable from Engineering Work

Stage describes **project lifecycle position**, not the state of individual work items. Legitimate divergences:

| Scenario | Stage | Engineering Work state | Legitimate? | Why |
|----------|-------|----------------------|-------------|-----|
| Implementation stage with no active work | `implementation` | All work proposed or completed | Yes | Between cycles; stage is still implementation |
| Validation stage with active fix work | `validation` | Active delivery EW exists | Yes | Fixing defects discovered during validation |
| Design stage with proposed EW | `design` | Proposed EW exists | Yes | Capturing future work during design |
| Maintenance stage with no active work | `maintenance` | All work completed or cancelled | Yes | Stable product; no active maintenance needed |

### Stage should remain Project-authoritative

Stage transitions are deliberate human decisions about the Project's lifecycle position. Like status, they should not be automatically triggered by Engineering Work lifecycle events.

---

## 8. Current Focus Semantics

### Definition

`currentFocus` is a free-text field (`schema.ts:104`) that captures what the Project operator is currently focused on for this Project.

### Intended semantic (distinct from next action)

`currentFocus` is a **Project-level coordination concept**: which work or operational concern currently deserves primary emphasis, if such singular emphasis exists. This is **not** the same as a work-level next action.

The distinction is architectural:

| Concept | Scope | Question answered |
|---------|-------|-------------------|
| **Focus** | Project-level | Which work or operational concern deserves primary emphasis? |
| **Next Action** | Work-level | What should happen next for a specific Engineering Work record? |

A future architecture might support: `Project operational focus → selected/prioritized Engineering Work`, and then: `Focused Engineering Work → currentNextAction`. This relationship is not yet established.

### Overlap with Engineering Work

`workspaceProjects` line 104: `currentFocus` is a plain text field on Project. It is manually set via seed data (`seed.ts:46`, `seed.ts:68`, `seed.ts:82`) and has **no server action to update it** (`projects/[slug]/actions.ts` only creates milestones, notes, documents, prompts — no `updateProject` action exists).

Engineering Work owns operational truth for each work item: `currentNextAction` (`schema.ts:323`) captures the next concrete action for a specific work item. Engineering Work is the stronger authority for operational activity.

### Why independent authority is rejected

Independent manual maintenance of `currentFocus` creates duplicate/ambiguous authority: the operator's manually set focus can diverge from what the Engineering Work system surfaces as operationally relevant. Engineering Work should supply the underlying operational truth.

### Why singular derivation is not yet possible

A singular derived Project focus **cannot yet be safely computed** when multiple Engineering Work records coexist:

- **Recency is not priority.** A recently edited Engineering Work record is not necessarily more important to the Project. `updatedAt` does not indicate importance.
- **State ordering is not importance.** `active` is not inherently more important than `in_review`. An in-review architectural decision may legitimately be the Project's primary focus while unrelated active delivery work also exists.
- **Implementation ordering is not selection semantics.** The current workspace may order records by recency or state for presentation, but this is implementation convenience, not authoritative operational selection.
- **Multiple truthful records must be preserved.** A Project may have multiple simultaneously active, in-review, continuation-eligible, or blocked Engineering Work records. These are multiple valid operational facts.

If one and only one relevant Engineering Work record exists, Project presentation may safely project it. If multiple plausible records exist, the projection must preserve ambiguity rather than invent precedence.

### Historical reconstruction caveat

Engineering Work history can reconstruct historical work states, work-level next actions, outcomes, and transitions. It **cannot** necessarily reconstruct which work item was considered the Project's primary focus at a given historical moment — unless that selection itself was explicitly persisted or can be proven from deterministic semantics that existed at that time. No such selection events or semantics currently exist in the repository.

### Disposition

`currentFocus` loses its status as unquestioned independent operational truth. Its final replacement is **deferred pending explicit operational-selection or prioritization semantics**. Schema removal is not yet recommended — that is an implementation decision downstream of the unresolved semantics.

**Classification:** Derived intent — architecturally blocked/deferred by operational selection semantics.

---

## 9. Next Step Semantics

### Definition

`nextStep` is a free-text field (`schema.ts:105`) that captures what the operator intends to do next for this Project.

### Intended semantic (distinct from focus)

`nextStep` is a **work-level concept projected to Project level**: what should happen next. At the Engineering Work level, `currentNextAction` (`schema.ts:323`) truthfully captures the next action for each individual work item. At the Project level, `nextStep` attempts to designate a single next action across the entire Project.

The distinction between focus and next action is architectural:

| Concept | Scope | Question answered |
|---------|-------|-------------------|
| **Focus** | Project-level | Which work or operational concern deserves primary emphasis? |
| **Next Action** | Work-level | What should happen next for a specific Engineering Work record? |

A future architecture might connect these: `Project focus → selected work → that work's next action`. This chain is not yet established.

### Overlap with Engineering Work

`workspaceProjects` line 105: `nextStep` is a plain text field on Project. Like `currentFocus`, it is set via seed data (`seed.ts:47`, `seed.ts:69`, `seed.ts:83`) and has no server action to update it.

Engineering Work is authoritative for each work item's `currentNextAction`. The unresolved question is: **which work item's next action, if any, deserves Project-level designation?**

### Why independent authority is rejected

Independent manual maintenance of `nextStep` creates the same duplicate/authority risk as `currentFocus`. Engineering Work already holds truthful next actions at the work-record level. The Project-level `nextStep` is either: (a) the same information duplicated from one work item, (b) a higher-level strategic step not corresponding to any specific work, or (c) a stale value.

### Why singular projection is not yet possible

Without selection semantics, multiple next actions remain multiple truthful operational facts. They should not be collapsed into a single Project-level value through recency, state ordering, or any other mechanism that lacks explicit architectural justification.

If one and only one relevant Engineering Work record exists, its `currentNextAction` may safely serve as the Project-level next step. If multiple records exist, the projection must preserve the multiplicity of truthful next actions.

### Historical reconstruction caveat

Same as `currentFocus` (section 8). Engineering Work history can reconstruct work-level next actions but cannot necessarily reconstruct which action was designated as the Project-level next step unless an explicit selection event exists.

### Disposition

`nextStep` loses its status as unquestioned independent operational truth. Its final projection is **deferred pending explicit operational-selection or prioritization semantics**. Schema removal is not yet recommended.

**Classification:** Independent authority rejected; singular projection deferred pending selection semantics.

---

## 10. Active Work vs. Continuation

### Definition

`activeWork` is a JSONB array field (`schema.ts:106`) on `workspaceProjects` that holds structured data about the currently active Engineering Work item for this Project.

### Relationship to Engineering Work

`activeWork` is a **denormalized snapshot** of data that originates from `workspaceEngineeringWork`. The query layer at `workspace-operational.ts:135` (`projectionFromEligibleSources`) constructs projections from live EW data, not from the `activeWork` field on Project.

The workspace dashboard (line 135-225) does **not** read `activeWork` from Project — it computes the projection from eligible sources. This means `activeWork` on Project may become stale relative to the actual Engineering Work state.

### Continuation is EW-derived, not Project-derived

The `isContinuationCandidate` function at `workspace-operational.ts:61` operates on Engineering Work state:
- Must have `projectId` set
- Must be in `active` or `in-review` state
- Must pass additional eligibility checks

The continuation display at `page.tsx:275` reads EW data via the query layer, not from Project `activeWork`.

### `activeWork` disposition

Since the workspace dashboard and continuation system derive their data from live EW queries (not from the `activeWork` field on Project), the `activeWork` field on Project is **redundant** with the query-time derivation. No performance evidence supports retaining it as a required cache. Its disposition is **deferred pending implementation and demonstrated performance need**. It should not be prescribed as kept or removed until evidence warrants a decision.

---

## 11. Attention Semantics

### Definition

`attention` at `workspace-operational.ts:214` is a composite projection that surfaces two things:
1. **Active work** requiring the operator's attention (continuation-eligible EW items)
2. **Conditions** requiring resolution (from `workspaceEngineeringWorkDefects`)

### Attention is derived from Engineering Work

Attention is computed from live EW data via `toConditionAttention` (line 189) and `projectionFromEligibleSources` (line 135). It is not persisted on Project.

### Project `status` governs attention eligibility

Only `active` and `testing` Projects appear in the workspace operating experience (`queries.ts:69`). This is a business rule about which Projects are "live." A paused Project's Engineering Work would not appear in attention, even if the work is active.

This is **not** a derivation from EW state. It is a business filter.

### Attention and Project `currentFocus`/`nextStep`

Attention (EW-derived) and Project `currentFocus`/`nextStep` (Project-persisted) can diverge. The operator's stated focus may not match what the EW system surfaces as requiring attention. This is another symptom of the duplicate authority problem — independent manual focus/next-step fields can diverge from operational reality.

---

## 12. Milestone Semantics

### Definition

`workspaceMilestones` (`schema.ts:109-128`) represents significant checkpoints or deliverables for a Project.

### Milestone status vs. Engineering Work status

| Milestone Status | Semantic | Engineering Work State |
|------------------|----------|----------------------|
| `pending` | Not yet started | Not equivalent to EW `proposed` |
| `in_progress` | Actively being worked toward | May overlap with active EW |
| `completed` | Achieved | May overlap with completed EW |
| `cancelled` | No longer planned | May overlap with cancelled EW |

Milestone status and EW status are **independent**. A milestone can be `in_progress` while multiple EW items (some active, some proposed) are contributing toward it. A milestone can be `completed` while some associated EW items are still `completed` (the work is done) or `cancelled` (the work was not needed).

### Milestone-EW relationship is deferred

The EW relationship model (`ENGINEERING-WORK-RELATIONSHIP-MODEL.md:175`) defers milestone linkage to "Future":
> "Milestone linkage is not implemented in the workspace project system. This is deferred to the future relationship model."

Currently, there is **no structured link** between `workspaceMilestones` and `workspaceEngineeringWork`. The relationship exists only implicitly through shared `projectId`.

### Milestones are Project-authoritative

Milestones represent Project-level deliverables. Their status is a business judgment about whether the deliverable was achieved, not a derivation from EW state. However, milestone status should be **informed by** EW state — if all contributing EW items are completed, the milestone status should likely be updated.

---

## 13. Recent Outcome Semantics

### Definition

`recentOutcomes` at `workspace-operational.ts:220` is a projection that surfaces recently completed Engineering Work items for a Project.

### Recent outcomes are derived from Engineering Work

`recentOutcomes` is computed from EW data: items in `completed` state with `completedAt` within a recent time window. It is not persisted on Project.

### Relationship to Project `status`/`stage`

Recent outcomes do not influence Project `status` or `stage`. A Project can have many completed EW items and still be `active` with `implementation` stage. The completion of work items is a normal part of the Project lifecycle, not a trigger for status change.

### Recent outcomes and Project `currentFocus`/`nextStep`

Recent outcomes may inform what the operator sets as `currentFocus` or `nextStep`, but there is no automatic derivation. The operator decides what to focus on next based on what was completed.

---

## 14. Multi-Work Semantics

### Problem statement

A Project can have **multiple** active Engineering Work items simultaneously. The current schema uses singular fields for Project focus and next step, which cannot truthfully represent multiple concurrent operational truths.

### Evidence of the problem

1. **Project `currentFocus`/`nextStep` are singular**: Fields `currentFocus` (line 104) and `nextStep` (line 105) are plain text — one value per Project. If there are two active EW items, only one can be reflected in these fields.

2. **`activeWork` is singular**: The `activeWork` JSONB field (line 106) appears designed for one active work item, not a list. The workspace page at `page.tsx:275` renders a single continuation item, not multiple.

3. **`attention` filters EW by `projectId`**: At `workspace-operational.ts:189`, `toConditionAttention` filters EW items by `projectId`. If there are multiple active EW items for a Project, they all contribute to attention — but the rendering may not display all of them.

4. **Continuation is singular**: The workspace page renders a single "Continue" button for the first eligible EW item. If there are multiple eligible items, only the first is surfaced.

### Multi-work truth must be preserved

A Project may have multiple simultaneously truthful:
- active Engineering Work records;
- in-review records;
- continuation candidates;
- blocked items;
- attention conditions;
- next actions.

These are multiple valid operational facts. The architecture must preserve those truths.

**A singular Project focus cannot be truthfully derived from multiple eligible Engineering Work records until Aredir defines sufficient prioritization, selection, or coordination semantics.**

### Why invented precedence is rejected

The following mechanisms are **not** accepted as semantic Project-focus rules:

- **Recency (`updatedAt`)**: A recently edited Engineering Work record is not necessarily more important to the Project. `updatedAt` does not indicate importance.
- **State ordering**: `active` is not inherently more important than `in_review`. An in-review architectural decision may legitimately be the Project's primary focus while unrelated active delivery work also exists.
- **Incidental query ordering**: Database ID order, insertion order, or other incidental ordering mechanisms are not selection semantics.
- **Highest-priority continuation**: Continuation eligibility indicates execution readiness, not Project-level importance.

If repository code currently orders records by recency, state, or ID for presentation, that is **implementation ordering** — not authoritative operational selection semantics. Implementation ordering must not be elevated into architecture without evidence.

### What selection semantics would require

Defining Project-level focus from multiple Engineering Work records would require Aredir to establish explicit prioritization, selection, or coordination semantics. This is out of scope for Package 2 and is the primary dependency for resolving `currentFocus`/`nextStep` disposition. (See section 21.)

### Single-work safe projection

If one and only one relevant Engineering Work record exists for a Project, Project presentation may safely project that record's operational data as the Project-level focus and next step. This is the only safe derivation without selection semantics.

---

## 15. Project Operational Projection Model

### Projection from EW to Project

The architecture distinguishes Project-authoritative fields from derived projections. A Project summary may project underlying authoritative data without becoming another authority for that data.

### Fields that remain Project-authoritative

| Project Field | Authority | Rationale |
|---------------|-----------|-----------|
| `status` | Project | Business posture; deliberate human decision |
| `stage` | Project | Lifecycle position; deliberate human decision |
| `currentFocus` | Deferred | Independent authority rejected; final disposition pending selection semantics |
| `nextStep` | Deferred | Independent authority rejected; final disposition pending selection semantics |
| `targetDate` | Project | Business deadline; independent of work state |
| Milestones | Project | Planning checkpoints; business judgment about deliverables |

### Fields that are derived projections

| Project Field | Derivation Source | Derivation Notes |
|---------------|-------------------|------------------|
| `recentOutcomes` | EW `currentOutcome` | Recently completed EW items for this Project |
| `attention` | EW conditions + Project filter | Active/in-review EW items + defects + blocked milestones, filtered by Project status |
| Active work summary | EW state | Aggregate of EW state within Project |
| Continuation | EW eligibility | Multi-factor eligibility projection |

### `currentFocus` and `nextStep` — deferred derivation

Engineering Work is the stronger authority for operational activity. However, a singular derived Project focus or next step **cannot yet be safely computed** because:

1. Multiple Engineering Work records may coexist for a Project.
2. Aredir has not yet defined sufficient prioritization, selection, or coordination semantics to determine which work deserves Project-level emphasis.
3. Without selection semantics, multiple next actions remain multiple truthful operational facts.

If one and only one relevant Engineering Work record exists, Project presentation may safely project it. If multiple plausible records exist, the projection must preserve ambiguity.

The final disposition of `currentFocus` and `nextStep` is deferred pending selection semantics. Schema removal is not yet recommended — that is an implementation decision downstream.

### `activeWork` — deferred disposition

`activeWork` is a redundant/denormalized persisted representation. The workspace already computes projections from live EW queries. Its disposition is deferred pending demonstrated performance need.

### Derivation timing

Derived fields that are computed at query time (`recentOutcomes`, `attention`, active work summary, continuation) avoid stale data and ensure consistency with live EW state. The current architecture already supports this: `getDailyOperatingExperience` at `workspace-operational.ts:225` computes projections from live data.

### Null is truthful

No current Project focus is a valid operational state. When no active or in-review Engineering Work exists for a Project, the Project may truthfully have:
- no current focus;
- no Project-level next step;
- proposed backlog only;
- completed work only;
- paused status;
- a milestone waiting for future work;
- or another legitimate non-active condition.

The architecture must allow null / no current operational focus. Recent outcomes may still be shown separately as historical context, but they must not be used to manufacture current intent from historical completion.

### Archive scenario

When a Project is archived, its `status` becomes `archived`. The workspace operating experience filters out archived Projects (`queries.ts:69`). Historical EW data is retained for reference but does not appear in the active workspace.

---

## 16. Historical Projection Considerations

### Null focus is a valid state

When no active/in-review EW exists for a Project, the Project has no operationally justified current focus or next step. This is a truthful state, not a deficiency to be filled.

A Project with no active operational focus may truthfully have:
- no current focus;
- no Project-level next step;
- proposed backlog only;
- completed work only;
- paused status;
- a milestone waiting for future work;
- or another legitimate non-active condition.

**The architecture must allow null / no current operational focus.** Recent outcomes may be shown separately as historical/current-context information, but they must not be used to manufacture current intent from historical completion. A historical outcome is not current operational focus.

### Historical reconstruction limitations

Engineering Work history can reconstruct:
- historical work states;
- historical work-level next actions;
- outcomes;
- transitions.

It **cannot** necessarily reconstruct:
- which work item was considered the Project's primary focus at a given historical moment;
- which work item was designated as the Project-level next step at a given historical moment.

Unless a selection event was explicitly persisted or can be proven from deterministic semantics that existed at that time, Project-focus history is not reconstructable. No such selection events or semantics currently exist in the repository.

### Archive scenario

When a Project is archived, its `status` becomes `archived`. The workspace operating experience filters out archived Projects (`queries.ts:69`). Historical EW data is retained for reference but does not appear in the active workspace.

---

## 17. Authority Invariants

These invariants must hold for the system to maintain consistency between Project metadata and Engineering Work state.

### Invariant 1: Project authority for identity, posture, and maturity

Project remains authoritative for intrinsic Project identity (name, slug, description, category), posture (status), maturity (stage), configuration (targetDate, URLs), and other genuinely Project-level concepts. These are not derivable from Engineering Work.

### Invariant 2: Engineering Work authority for operational lifecycle

Engineering Work remains authoritative for individual operational lifecycle (state), next action (`currentNextAction`), outcome (`currentOutcome`), condition (defects), and evidence (repository references). Project must not independently maintain copies of these facts.

### Invariant 3: No duplicate operational authority

Project must not independently maintain copies of Engineering Work operational facts merely for presentation convenience. When Engineering Work holds stronger authority for an operational fact, the Project-level representation must either be derived from that authority or explicitly deferred.

### Invariant 4: Projection is not authority

A Project summary may project underlying authoritative data without becoming another authority for that data. A derived projection does not create a new source of truth.

### Invariant 5: Multi-work truth

Multiple active or continuation-eligible Engineering Work records remain multiple valid operational facts unless explicit selection semantics designate one. The architecture must not collapse multiple truthful records into one Project focus through recency, state ordering, or incidental mechanisms.

### Invariant 6: No arbitrary focus selection

Recency, incidental query ordering, database IDs, or lifecycle state ordering must not silently determine Project focus unless architecture explicitly defines them as selection semantics. Currently, no such selection semantics exist.

### Invariant 7: Focus differs from next action

Project focus concerns selection/emphasis among work — which work or operational concern deserves primary emphasis. Engineering Work `currentNextAction` concerns the next action within an individual work item. These are distinct concepts that must not be conflated.

### Invariant 8: Null is truthful

No current Project focus is a valid operational state and must not be replaced by historical content solely to avoid an empty presentation. Recent outcomes may be displayed as historical context, but they do not constitute current operational focus.

### Invariant 9: Historical selection requires evidence

Past Project focus can only be reconstructed when selection semantics or selection events make that conclusion supportable. Absent such evidence, historical focus is not reconstructable.

### Invariant 10: Attention is EW-derived, Project-filtered

Attention is computed from EW data (active/in-review items, defects) but filtered by Project status. Only Projects with `status IN ['active', 'testing']` contribute to the workspace attention display. Attention must not become independently persisted Project truth.

### Invariant 11: Milestones are never derived from EW

Milestone status is always set by the operator. EW state changes never automatically change milestone status. However, milestone status should be **informed by** EW state.

### Invariant 12: Derived fields are computed at query time

Derived fields (`recentOutcomes`, `attention`, active work summary, continuation) are computed from live EW data at query time, not at write time. This prevents stale data.

### Invariant 13: Performance optimization requires evidence

Persisted projections or caches should not be retained or introduced solely by assumption when query-time derivation is already operationally adequate. The `activeWork` persisted field falls into this category — its retention requires demonstrated performance need.

### Invariant 14: No silent authority transfers

When a field changes authority, the transition must be explicit and documented. Silent authority transfers create confusion and bugs.

### Invariant 15: Project metadata mutations are explicit

All changes to Project-authoritative fields (`status`, `stage`) must go through explicit server actions. No implicit mutations from EW lifecycle events.

---

## 18. Final Decision Matrix

This section consolidates all authority decisions for the Project operational state.

### Decision 1: Project identity

| Decision | Project identity (name, slug, description, category) remains **Project-authoritative** |
|----------|----------------------------------------------------------------------------------------|
| Rationale | Identity fields are intrinsic to the Project entity. Not derivable from Engineering Work. |
| Recommendation | No change to current authority. |

### Decision 2: Project status

| Decision | Project `status` remains **Project-authoritative** |
|----------|---------------------------------------------------|
| Rationale | Status describes business posture, not work state. Deliberate human decisions about Project lifecycle. |
| Recommendation | No change to current authority. Status transitions require explicit operator action. |

### Decision 3: Project stage

| Decision | Project `stage` remains **Project-authoritative** |
|----------|---------------------------------------------------|
| Rationale | Stage describes lifecycle position, not work state. Deliberate human decisions about Project lifecycle. |
| Recommendation | No change to current authority. Stage transitions require explicit operator action. |

### Decision 4: Project targetDate

| Decision | Project `targetDate` remains **Project-authoritative** |
|----------|-------------------------------------------------------|
| Rationale | Business deadline; independent of work state. |
| Recommendation | No change to current authority. |

### Decision 5: Project milestones

| Decision | Milestones remain **Project-authoritative** |
|----------|---------------------------------------------|
| Rationale | Milestones represent Project-level deliverables. Status is a business judgment about whether the deliverable was achieved. |
| Recommendation | No change to current authority. However, milestone status should be **informed by** EW state. |

### Decision 6: Engineering Work state

| Decision | Engineering Work `state` remains **EW-authoritative** |
|----------|------------------------------------------------------|
| Rationale | Individual operational lifecycle belongs to Engineering Work. |
| Recommendation | No change. |

### Decision 7: Engineering Work currentNextAction

| Decision | Engineering Work `currentNextAction` remains **EW-authoritative** |
|----------|------------------------------------------------------------------|
| Rationale | Each work item's next action belongs to that work item. |
| Recommendation | No change. |

### Decision 8: Active-work summary

| Decision | Active work summary is a **derived aggregate** |
|----------|-----------------------------------------------|
| Rationale | Aggregate of Engineering Work state within Project. Computed at query time. |
| Recommendation | No change to current derivation architecture. |

### Decision 9: Continuation

| Decision | Continuation is a **derived projection** |
|----------|------------------------------------------|
| Rationale | Multi-factor eligibility projection from EW state + Project status. |
| Recommendation | No change to current derivation architecture. |

### Decision 10: Attention

| Decision | Attention is a **derived projection** |
|----------|---------------------------------------|
| Rationale | Composite of EW conditions + incomplete defect context + blocked milestones, filtered by Project status. Must not become independently persisted Project truth. |
| Recommendation | No change to current derivation architecture. |

### Decision 11: Recent outcomes

| Decision | `recentOutcomes` is **derived from completed Engineering Work** |
|----------|----------------------------------------------------------------|
| Rationale | Computed from EW data at query time. Not persisted on Project. |
| Recommendation | No change to current derivation architecture. |

### Decision 12: Project currentFocus

| Decision | Independent authority **rejected**; final disposition **deferred pending selection semantics** |
|----------|----------------------------------------------------------------------------------------------|
| Rationale | Engineering Work is the stronger authority for operational activity. However, a singular derived Project focus is not yet safely computable when multiple Engineering Work records coexist, because Aredir has not yet defined sufficient prioritization, selection, or coordination semantics. |
| Recommendation | Do not remove from schema yet. Reclassify as: Derived intent — architecturally blocked/deferred by operational-selection semantics. Await Package 3 discovery on selection semantics before determining final disposition. |

### Decision 13: Project nextStep

| Decision | Independent authority **rejected**; singular projection **deferred pending selection semantics** |
|----------|-----------------------------------------------------------------------------------------------|
| Rationale | Engineering Work owns each work item's `currentNextAction`. The unresolved question is which work item's action deserves Project-level designation. Without selection semantics, multiple next actions remain multiple truthful facts. |
| Recommendation | Do not remove from schema yet. Await Package 3 discovery on selection semantics before determining final disposition. |

### Decision 14: Project activeWork (persisted field)

| Decision | **Redundant/denormalized representation; disposition deferred** |
|----------|-----------------------------------------------------------------|
| Rationale | Workspace already computes projections from live EW queries. No performance evidence supports retaining this field as a required cache. |
| Recommendation | Do not prescribe keeping or removing. Defer pending demonstrated performance need. |

### Decision 15: No duplicate operational authority

| Decision | Project must not independently maintain copies of Engineering Work operational facts |
|----------|-------------------------------------------------------------------------------------|
| Rationale | Independent copies create divergence risk and ambiguous authority. |
| Recommendation | Apply to any future Project fields that overlap with EW operational state.

---

## 19. Deferred Questions

These questions require further investigation or decision-making beyond the scope of Package 2.

### DQ-1: What explicit prioritization and/or operational-selection semantics are required before Aredir can truthfully derive a singular Project focus or Project-level next step from multiple Engineering Work records?

This is the primary unresolved architectural dependency. Until selection semantics are defined, `currentFocus` and `nextStep` cannot be safely derived from Engineering Work. Questions to investigate include:

- Is priority an intrinsic Engineering Work property?
- What does existing `priority` mean today, if present?
- Is priority enough to determine Project focus?
- Is explicit operator selection needed?
- Is "focus" different from priority?
- Can more than one item be focused?
- What happens when priority is absent?
- What happens when priorities are equal?
- Does in-review work compete with active work for focus?
- How do blocked items interact with focus?
- Does continuation eligibility influence selection or merely execution readiness?
- Should Project focus be persisted as a relationship/selection event rather than text?
- Should selection have history/provenance?
- How would selection interact with future Engineering Work relationships and lineage?
- How should Aredir avoid becoming a conventional ticket backlog while still supporting meaningful operational prioritization?

### DQ-2: How should milestones link to Engineering Work?

The EW relationship model defers milestone linkage to "Future." This needs to be resolved for the system to have clean traceability from milestones to contributing work.

### DQ-3: Should `currentFocus` and `nextStep` eventually be removed from the schema?

If selection semantics are defined and derivation becomes possible, the implementation decision (remove fields vs. keep fields and sync) requires further analysis. Schema removal is downstream of the unresolved semantics.

### DQ-4: Should Project status transition automatically on EW lifecycle events?

The current position is no, but there may be edge cases where automatic status transition is desirable (e.g., all EW completed → status becomes `maintenance`).

### DQ-5: Should there be an `updateProject` server action?

Currently, there is no server action to update Project metadata (`status`, `stage`). This means these fields can only be changed via seed data or direct database access. An `updateProject` action may be needed.

### DQ-6: How should historical projection work for archived Projects?

When a Project is archived, its historical EW data is retained. How should this data be surfaced in reports or historical views?

### DQ-7: Does `activeWork` demonstrate performance need?

The `activeWork` persisted field is redundant with query-time derivation. Does any operational path actually depend on it? If not, removal simplifies the schema. If so, what performance evidence justifies retention?

---

## 20. Evidence Index

| Evidence ID | Type | Location | Finding |
|-------------|------|----------|---------|
| E1 | Schema | `schema.ts:17-35` | Enums: `projectStatusEnum`, `projectStageEnum`, `milestoneStatusEnum` |
| E2 | Schema | `schema.ts:92-107` | `workspaceProjects` table: status, stage, currentFocus, nextStep, activeWork |
| E3 | Schema | `schema.ts:109-128` | `workspaceMilestones` table: status enum with 4 values |
| E4 | Schema | `schema.ts:313-332` | `workspaceEngineeringWork` table: state, currentNextAction, currentOutcome |
| E5 | Seed | `seed.ts:27-84` | Project definitions: AredirLabs.com (active, implementation), AlignFit (testing, validation), ClassForge (paused, design), LeagueOS (planning, ideation) |
| E6 | Seed | `seed.ts:105-235` | Milestone definitions: 3 milestones per Project, various statuses |
| E7 | Query | `workspace-operational.ts:135-225` | Projection from eligible sources; attention; recentOutcomes |
| E8 | Query | `workspace-operational.ts:61-99` | Continuation candidacy: requires projectId, state in ['active', 'in-review'] |
| E9 | Query | `queries.ts:69` | `operatingProject` filter: status IN ['active', 'testing'] |
| E10 | UI | `page.tsx:275` | Workspace renders `currentFocus ?? nextStep` for continuation |
| E11 | Actions | `projects/[slug]/actions.ts` | Only create actions (milestones, notes, documents, prompts) — no update project |
| E12 | Contract | `ENGINEERING-WORK-RELATIONSHIP-MODEL.md:175` | Milestone linkage deferred to Future |
| E13 | Type | `workspace-operational.ts:57` | `DailyOperatingExperience` type: includes attention, recentOutcomes |
| E14 | Schema | `schema.ts:491-507` | `workspaceEngineeringWorkDefects` table: condition type |
| E15 | Schema | `schema.ts:509-540` | `workspaceEngineeringWorkRepositoryReferences` table: reference type |
| E16 | Query | `workspace-operational.ts:189` | `toConditionAttention`: EW defects contribute to attention |
| E17 | Type | `workspace-operational.ts:38` | `OperatingSnapshot` type: includes projects array |
| E18 | Query | `workspace-operational.ts:135` | `projectionFromEligibleSources`: constructs EW projections |
| E19 | UI | `project-overview-section.tsx` | Renders currentFocus/nextStep display |
| E20 | Test | `workspace-operational.test.ts` | Tests for continuation/attention |

---

## 21. Recommended Package 3 Boundary

Package 3 should be a **discovery** package, not an implementation package. It should investigate the missing architectural dependency identified in this record.

### Package 3 title

**Engineering Work Prioritization and Operational Selection Semantics**

### Why Package 3 must remain discovery

Package 2 has established that the primary unresolved architectural dependency is the absence of selection semantics for determining which Engineering Work deserves Project-level emphasis. This is a conceptual and architectural question, not an implementation question. Implementing schema removal, query changes, UI projection, or server actions before resolving selection semantics would embed arbitrary assumptions into the system.

### Minimum scope for Package 3

At minimum, Package 3 should eventually answer:

- Is priority an intrinsic Engineering Work property?
- What does existing `priority` mean today, if present?
- Is priority enough to determine Project focus?
- Is explicit operator selection needed?
- Is "focus" different from priority?
- Can more than one item be focused?
- What happens when priority is absent?
- What happens when priorities are equal?
- Does in-review work compete with active work for focus?
- How do blocked items interact with focus?
- Does continuation eligibility influence selection or merely execution readiness?
- Should Project focus be persisted as a relationship/selection event rather than text?
- Should selection have history/provenance?
- How would selection interact with future Engineering Work relationships and lineage?
- How should Aredir avoid becoming a conventional ticket backlog while still supporting meaningful operational prioritization?

### What Package 3 should NOT do

Package 3 should not:
- remove schema fields;
- create migrations;
- alter queries;
- alter UI;
- implement prioritization algorithms;
- implement selection mechanisms;
- implement relationships;
- backfill records.

### Dependency chain

```
Package 2 (this record)
  → establishes: selection semantics are a dependency
    → Package 3 (discovery)
      → answers: what selection semantics does Aredir need?
        → future implementation package
          → implements: schema, queries, UI, actions based on resolved semantics
```

---

*End of Discovery Record AREDIR-DISCOVERY-010*
