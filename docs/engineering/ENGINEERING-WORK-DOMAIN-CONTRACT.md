# Engineering Work Domain Contract

## Canonical definition

**Engineering Work** is a bounded, project-scoped operational record for an intended engineering outcome that is being proposed, undertaken, reviewed, completed, cancelled, or superseded. It is the active thing being managed, not the artifact body created as part of the work.

It can represent feature delivery, defect correction, maintenance, research, discovery, architecture exploration, verification, documentation, release coordination, innovation, or promotion work when each has one intelligible outcome and current operational context.

## Responsibility and authority

| Concern | Engineering Work responsibility | Authoritative home |
| --- | --- | --- |
| Operational state | Record current lifecycle state, workflow, project context, and next action. | Workspace projection. |
| Scope/outcome | State a concise operational summary. | Work record for operational context; formal scope remains in linked work package when one exists. |
| Durable work package | Reference it. | Owning repository. |
| Findings, evidence, verification, decisions, ADRs, releases | Reference and relate them. | Owning repository or future dedicated capability. |
| Project memory | Relate where useful; do not absorb it. | Existing Notes/Documents/Prompts/Project records. |
| Knowledge | Reference governed assets/candidates. | Knowledge Base and current Knowledge Asset Registry. |

## Boundaries

Engineering Work is **not** a repository document, a generic container for all artifacts, a project, a milestone, a prompt, a knowledge asset, a user/permission record, or a workflow engine. It must not silently copy, publish, edit, synchronize, or replace repository-authoritative artifact bodies.

## Field classification

| Field | Purpose | Baseline status | Notes |
| --- | --- | --- | --- |
| Immutable identifier | Stable operational reference. | Required | System-generated; never reused. |
| Title | Human-readable recognition. | Required | Concise outcome-oriented label. |
| Summary | Establish why/outcome/bounded context. | Required | Not a substitute for an authoritative work package. |
| Project reference | Places work in an existing operational container. | Required | One `workspace_projects` relationship. |
| User-facing type | Uses familiar engineering vocabulary. | Required | See type map below. |
| Internal workflow | Selects operational/lifecycle interpretation. | Required | Stable after creation in baseline. |
| Lifecycle state | Represents canonical progress. | Required | See lifecycle contract. |
| Created date | Establishes history. | Required | System-recorded. |
| Updated date | Establishes recency. | Required | System-recorded. |
| Current next action | Keeps active work operationally understandable. | Workflow-specific | Required for Active/In Review unless an explicit reason makes it inapplicable. |
| Current outcome | Records a concise interim or completion outcome. | Optional | Completion evidence remains referenced. |
| Priority | Supports ordering when a project needs it. | Optional | No fixed scale in baseline. |
| Parent work | Represents decomposition/grouping. | Optional | One parent at most; no baseline Epic entity. |
| Related work | Captures non-hierarchical association. | Optional | Typed relation where a later implementation supports it. |
| Dependency relations | Makes prerequisite/blocking work explicit. | Optional | Relationship, not a lifecycle state. |
| Repository references | Cite durable governed artifacts. | Optional | A Work may begin before an artifact exists; each reference follows its contract. |
| External references | Point to non-repository systems/evidence. | Optional | Read-only URLs/identifiers only. |
| Tags/classifications | Ad hoc cross-cutting grouping. | Rejected | Type, workflow, project, and explicit relations are sufficient for baseline. |
| Owner | Identifies responsible operational person. | Future | Important domain need; no current person/membership relation supports it. |
| Created by | Identifies initiating person. | Future | Defer with artifact attribution/audit model. |
| Move/project history | Explains a change of project scope. | Rejected | Work is immutable to one Project in baseline; use related successor work. |
| Estimate, sprint, board column, SLA | Conventional tracker planning data. | Rejected | No observed need for first slice. |

## User-facing types and internal workflows

| Familiar user-facing item | Baseline classification | Internal workflow | Notes |
| --- | --- | --- | --- |
| Epic | Grouping construct | None required | Use parent/child Work relations; do not create a separate Epic entity in baseline. |
| Feature | Primary type | Delivery | A bounded user/product capability outcome. |
| Task | Primary type | Delivery, Documentation, Maintenance, Verification, or Promotion | Type remains familiar; workflow supplies specialization. |
| Bug | Primary type | Defect | Distinct familiar defect language. |
| Research | Primary type | Research or Discovery | Research answers a question; Discovery is used when current-state investigation is primary. |
| Architecture | Primary type | Architecture | For bounded architectural exploration/decision preparation, not an ADR itself. |
| Verification | Primary type | Verification | For standalone validation work, not evidence itself. |
| Documentation | Primary type | Documentation | For documentation maintenance/creation, not the resulting document. |
| Maintenance | Primary type | Maintenance | For upkeep/change that is neither a defect nor new feature. |
| Release | Primary type | Release | Coordinates a bounded release outcome; a future Release record remains separate. |
| Promotion | Workflow specialization | Promotion | Normally use Task or Documentation type; promotion candidate/asset remains separate. |

**Workflow stability invariant:** workflow is selected at creation and remains stable in the baseline. If understanding materially changes from one workflow to another, record the original conclusion and create or relate successor Work rather than silently rewriting history.

## Ownership assumptions and invariants

- Every Engineering Work record belongs to exactly one existing Project.
- Every record has exactly one type, one workflow, and one lifecycle state.
- No Work is an authority for a referenced repository artifact body.
- A Work may exist with no repository reference while proposed/discovery is underway.
- Terminal Work is retained for traceability; it is never silently deleted or reused.
- Ownership and creator attribution must be introduced with a future authorization model, not implied from shared authenticated access.
- Cross-project outcomes are decomposed into single-project Work records with explicit related/dependency references.

## Exclusions

The contract does not create a Mission model, work-package model, finding model, verification model, decision/ADR model, release model, promotion-candidate model, repository ingestion service, or generic artifact base. It preserves those authorities and future capabilities as distinct concepts.
