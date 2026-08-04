# AREDIR-ENGINEERING-WORK-001 — Operational Engineering Work Capability Baseline

**Status:** domain baseline; no implementation authorization
**Scope:** conceptual contract only. No application code, database schema, migration, UI, synchronization, or repository artifact has been changed.

## Executive summary

Engineering Work is the smallest missing operational concept in the authenticated Workspace. It represents a bounded, active engineering outcome within one existing Workspace Project: something to investigate, plan, implement, correct, validate, document, release, maintain, or promote. It is not the durable work package, repository document, finding, verification evidence, decision, or knowledge asset produced along the way.

The baseline recommends a dedicated, project-scoped Engineering Work entity with a familiar user-facing type, a stable internal workflow classification, a compact lifecycle, and optional read-only references to repository-authoritative artifacts. The Workspace manages operational context and state; repositories remain authoritative for artifact bodies and history.

## Problem statement

The current Workspace provides shared project memory—projects, milestones, notes, database-backed documents, prompt records, and static knowledge projections—but no canonical item for the work currently being done. The repository already contains the governing artifacts that explain work, including Missions, discovery records, work packages, findings, verification, decisions, reviews, release evidence, and promotion records. Without an operational work record, the Workspace cannot consistently show the active thing, its current state, next action, or its links to durable evidence without duplicating repository authority.

## Architectural context

- `workspace_projects` is the established operational container and must remain the required parent scope.
- Existing project artifacts remain independent: milestones express posture/outcomes, notes retain project memory, documents are database-backed copies, prompts are execution records, and Knowledge Assets are governed read-only projections.
- The Feature Delivery Standard identifies work packages as authoritative implementation scope; prompts are optional and must not override them.
- The repository-boundary assessment establishes that Engineering Operations may own operational projections/indexes, while repositories retain governed artifact bodies.
- Authentication exists, but roles, memberships, ownership, artifact attribution, and project permissions are not modeled. Ownership is therefore a domain requirement deferred from implementation.

## Scope

This package defines the canonical concept, types, internal workflows, fields, lifecycle, relationships, repository reference contract, and conceptual Hydration Operational State Representation example. It does not define a generic issue tracker, a generalized workflow engine, or a replacement for any existing Workspace entity.

## Key decisions

| Decision | Baseline |
| --- | --- |
| Canonical model | Dedicated `Engineering Work` operational entity, scoped to one Project. |
| User vocabulary | Familiar types: Feature, Task, Bug, Research, Architecture, Verification, Documentation, Maintenance, and Release. Epic is a grouping construct, not a distinct baseline entity. |
| Internal workflows | Delivery, Defect, Discovery, Research, Architecture, Maintenance, Verification, Documentation, Promotion, and Release. Workflow is stable after creation in the baseline. |
| Lifecycle | Proposed → Active → In Review → Completed → Closed, with Cancelled and Superseded terminal. Ready, blocked, waiting, at risk, and similar indicators are conditions rather than states. |
| Project relationship | Required, single-project, and not movable in the baseline. Cross-project work is represented by separate related work, not multi-project ownership. |
| Repository boundary | References are read-only metadata/citations; no content copying, ingestion, mutation, or sync. |
| Existing entities | Preserve their current independent responsibility; allow only optional future links where stated in the relationship model. |
| Ownership | Owner and creator attribution are required future domain concepts, deferred because the current domain lacks identity/membership references. |

## Rejected alternatives

| Alternative | Rejection rationale |
| --- | --- |
| Make repository documents the Engineering Work record | Confuses active operational state with durable repository authority and duplicates the existing source of truth. |
| Generalized Engineering Artifact base | Prematurely merges work, documents, verification, decisions, and knowledge despite different authority and lifecycle needs. |
| Replace Projects with work hierarchy | The Project model is already the operational container and provides stable context. |
| Treat prompt records as work | Prompts record an execution interaction and its result; they do not represent the full work outcome or lifecycle. |
| Treat milestones as work | Milestones express target/posture and may group work; they do not replace individual work. |
| Jira/Azure DevOps-style full issue model | Requires unobserved fields, permissions, workflow automation, and planning systems beyond the first slice. |
| Mutable workflow classification | Makes lifecycle/reporting history ambiguous. A materially different workflow is new or linked work, not a silent reclassification. |

## Open questions

- Which canonical user/identity reference will support owner and creator attribution when authorization is introduced?
- What repository identifier convention should be used when multiple repositories are referenced?
- Which user-facing types need distinct presentation before evidence shows that the baseline type/workflow map is insufficient?
- When a future release entity exists, should Release work point to it or should release coordination remain a Work type only?
- What review authority, if any, can transition Work from In Review to Completed?

## Implementation constraints

- The Drizzle schema is centralized, but no tracked SQL migration history exists in the repository; a later implementation package must establish its migration approach deliberately.
- Workspace read pages currently rely on a cookie-presence proxy guard, while mutations validate Better Auth sessions; no roles/memberships/project authorization exist.
- Existing Workspace documents do not hold repository path, revision, or authority metadata; they cannot be treated as repository artifacts.
- The Knowledge Asset Registry is static TypeScript data, not a persistent synchronized service.
- The first implementation must remain incremental and read-only, with no repository integration implied.

## Recommended next package

**AREDIR-ENGINEERING-WORK-002 — Read-Only Engineering Work Vertical Slice.** It should introduce only a view of one repository-referenced item under AlignFit, using the contract in this package. It should not add broad CRUD, synchronization, workflow automation, permissions, or generalized artifact infrastructure.

## Completion criteria

- [x] Engineering Work is defined separately from workflow, artifacts, evidence, documentation, knowledge, and project memory.
- [x] Familiar work types and stable internal workflow classifications are mapped.
- [x] Required, optional, deferred, and rejected fields are classified.
- [x] A compact lifecycle and non-state conditions are specified.
- [x] Project, existing entity, relationship, and repository boundaries are recorded.
- [x] Hydration OSR is represented with explicit assumptions and unknowns only.
- [x] Deferred capability and authorization/migration constraints are explicit.
