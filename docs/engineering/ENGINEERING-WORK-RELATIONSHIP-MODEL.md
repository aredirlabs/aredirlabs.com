# Engineering Work Relationship Model

## Model choice

The baseline adopts **Approach A — Dedicated Engineering Work Entity**:

```text
Project
  └─ Engineering Work
       ├─ optional work-to-work relationships
       ├─ optional repository references
       └─ optional references to independent Workspace records
```

Approach B—a shared Engineering Artifact base for Work, documents, verification, decisions, and knowledge—is rejected for the first slice. Those concepts differ in authority, ownership, lifecycle, storage, and existing implementation. A base would create coupling before evidence requires it.

## Relationship classification

| Related concept | Relationship semantics | Classification | Boundary |
| --- | --- | --- | --- |
| Project | Each Work belongs to exactly one existing Workspace Project. | Baseline required | Project remains operational container. |
| Parent Work | One Work may be a child of one Work for bounded decomposition/grouping. | Baseline optional | No recursive planning engine or separate Epic entity. |
| Child Work | Derived inverse of parent relation. | Baseline optional | Children remain independent Work records. |
| Related Work | Typed non-hierarchical association (for example `relates_to`). | Baseline optional | No implied dependency or authority. |
| Dependency Work | Directed `depends_on` / `blocks` relationship between Work records. | Baseline optional | Blockage is a condition, not a state. |
| Milestone | A milestone may group/target related Work. | Future | Existing milestones remain independent project posture/outcome records. |
| Note | A project note may optionally be referenced or later attached to Work. | Future | Notes remain project memory; existing note types are unchanged. |
| Workspace Document | A database-backed Workspace document may be referenced. | Future | It is not repository-authoritative and must not be represented as one. |
| Prompt | A prompt/execution record may later attach as execution history. | Future | Prompts remain distinct interactions with body/result/verification/follow-ups. |
| Knowledge Asset | Work may reference an existing governed asset or indicate a candidate evaluation. | Future | Registry and promotion lifecycle remain independent. |
| Verification record | Work may link to a future dedicated verification record/evidence summary. | Future | Do not create verification entity in baseline. |
| Decision or ADR | Work may cite a future decision/ADR or repository reference. | Future | Decision authority is not absorbed. |
| Release | Release-related Work may later link to a future Release record. | Future | Existing release notes/records remain independent. |
| Repository artifact | A Work may cite a durable external/repository-authoritative artifact. | Baseline optional | Read-only contract applies. |
| Multiple Projects | One Work owned by several Projects. | Rejected | Use project-local Work records and explicit links/dependencies. |

## Relationship invariants

- A parent relation must not create a cycle.
- A Work cannot depend on itself, directly or indirectly.
- `blocks` and `depends_on` are reciprocal inverse semantics when both are materialized.
- Related Work does not confer ownership, lifecycle propagation, or permission.
- Project archival does not mutate historical Work; active Work must be resolved according to a future archival policy rather than automatically moved.
- A repository reference identifies/cites a source; it never embeds, controls, or updates that source.

## Existing-entity preservation

Milestones continue to describe target posture; notes preserve project memory; documents remain database-backed content; prompts preserve execution history; Knowledge Assets remain governed projections. Engineering Work may provide a future operational context for those records, but none becomes a subtype of Work and none is replaced by it.
