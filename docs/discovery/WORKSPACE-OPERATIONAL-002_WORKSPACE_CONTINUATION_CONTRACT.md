# WORKSPACE-OPERATIONAL-002 — Workspace Continuation Contract

| Field | Value |
| --- | --- |
| **Status** | Complete — architecture, query contract, and runtime assessment |
| **Date** | 2026-08-07 |
| **Package type** | Workspace continuation architecture; no UI or persistence implementation |
| **Architectural basis** | [OPERATIONAL-EXPERIENCE-001](./OPERATIONAL-EXPERIENCE-001_OPERATIONAL_ENGINEERING_ENVIRONMENT_ARCHITECTURE.md) |
| **Runtime authority** | Project, Engineering Work, Defect Context, and milestone data |
| **Implementation changes** | None |

## 1. Executive summary

Aredir can truthfully project **shared, project-scoped continuation**, but it cannot yet project a personal continuation or choose among several valid engagements on behalf of the authenticated engineer.

The minimum viable contract is:

> A Workspace continuation is non-terminal Engineering Work in an operating Project, with enough authoritative context to understand its purpose and a non-empty current operational next action, and with no recorded condition that makes actionability uncertain.

The first implementation should generate candidates from canonical Project and Engineering Work state, preserve the parent `currentNextAction` as the primary action, use Defect Context only as supporting investigation context, and link to the existing project-scoped Engineering Work detail route. It should not infer ownership, urgency, meaningful activity, validation result, or priority.

The outcome is one of three deterministic modes:

1. **One candidate:** present it as the shared Workspace continuation and explain the source facts that qualified it.
2. **Several candidates:** present a bounded, explicitly unordered engagement set. Do not label one “current focus” or imply that the system knows the engineer’s intent.
3. **No candidates:** state that no clearly justified continuation exists and offer bounded Project orientation paths.

Attention is a separate projection. Today Aredir can reliably expose a recorded Engineering Work condition without interpreting it, a missing required Defect Context record, and a blocked milestone. It cannot reliably detect failed validation, required review by the current user, staleness, unresolved dependencies, conflicting evidence, or urgency.

No new persistence is required. The next package should be **WORKSPACE-OPERATIONAL-003 — Operational Workspace Entry Experience**, implementing this server-side projection and its three honest outcome modes.

## 2. Current Workspace assessment

`/workspace` is already structured as an operating entry point rather than a metrics dashboard:

- `Continue` is the primary surface;
- `What needs care` follows;
- active and recently modified Projects provide context and return paths; and
- the continuation links directly to Engineering Work.

The current `getDailyOperatingExperience()` query does not yet satisfy the operational contract:

| Current behavior | Assessment |
| --- | --- |
| Includes `active`, `in_review`, and `proposed` Engineering Work | `proposed` means captured but not undertaken, so it is not continuation. |
| Orders `active` before `in_review`, then by `updatedAt` | Lifecycle rank does not establish engineer-specific importance; modification recency is not meaningful activity. |
| Returns exactly one global row | The data has no actor, ownership, assignment, focus, or interaction evidence that justifies choosing among peers. |
| Does not filter by Project status | Work in paused, planning, or archived Projects can currently win. |
| Does not inspect `condition` | Work whose actionability is uncertain can currently win. |
| Does not join Defect Context | Workspace cannot explain Defect investigation posture or detect an incomplete Defect record. |
| Uses the first blocked milestone as attention | This is authoritative but globally ordered by `sortOrder`, which has meaning only inside a Project. |
| Falls back to the first recently modified active Project | This is orientation, not continuation, and should be labelled accordingly. |

The current wording says “Your work,” but the projection is shared across every authenticated user. Until an authorization and responsibility model exists, the truthful meaning is **work visible in the shared Aredir Workspace**, not work owned by the signed-in user.

The tracked seed reinforces the limitation. It defines four Projects but only one Engineering Work record: a Proposed Architecture item under the testing AlignFit Project. It seeds no Defect Context and no blocked milestone. Under this contract that Work is orientation, not continuation, so a database containing only the tracked seed produces honest absence. The seed’s upsert also writes a new `updatedAt` value to existing Project, Work, milestone, and prompt rows; a seed run can therefore make maintenance look recent without any meaningful engineering activity.

## 3. Source-authority inventory

| Displayed projection | Authoritative source | Availability and limit |
| --- | --- | --- |
| Authenticated identity | Better Auth `user` and `session` | Identity exists; it has no domain relationship to Projects or Engineering Work. |
| Project identity | `workspace_projects.id`, `name`, `slug` | Available and stable; `slug` supplies the route boundary. |
| Project operating posture | `workspace_projects.status` | Available enum. Current application treats `active` and `testing` as operating Projects. |
| Project focus/orientation | `workspace_projects.current_focus`, `next_step` | Available free text; not related to a specific Work record and therefore not ranking evidence. |
| Purpose | `workspace_engineering_work.title`, `summary` | Required canonical parent fields; sufficient first-generation purpose. |
| Current position | `workspace_engineering_work.state`, `workflow` | Required canonical lifecycle and workflow. |
| Operational next action | `workspace_engineering_work.current_next_action` | Required persisted parent field; primary action authority. |
| Current condition | `workspace_engineering_work.condition`, `condition_rationale` | Nullable free text with no controlled vocabulary or current form writer; preserve verbatim and do not infer a category. |
| Defect investigation step | `workspace_engineering_work_defects.next_investigation` | Required when Defect Context exists; subordinate to the parent operational next action. |
| Defect validation target | `workspace_engineering_work_defects.validation_target` | Required descriptive target; it is not a validation result or failure state. |
| Milestone attention | `workspace_project_milestones.status = blocked`, title, description | Available Project-level condition; no milestone detail route exists. |
| Freshness | source row `updated_at` | Database modification time only; not an engineering event or evidence of progress. |
| Destination | existing `/workspace/projects/[slug]/engineering-work/[workId]` and Project routes | Available. Defect detail is composed on the same Engineering Work route. |
| Mission focus | repository Markdown Mission record and registry | Documentation-only architecture; no application entity or Project/Work relation. Must not enter the runtime query. |
| Ownership, assignment, membership, creator, editor | No source | Unavailable. Authentication must not be used as a substitute. |
| Meaningful activity, validation result, review assignment, dependency relation | No source | Unavailable; do not infer from timestamps, prose, or lifecycle alone. |

The repository’s older Data Model Inventory predates the tracked Engineering Work and Defect migrations. The current Drizzle schema and migration files govern those runtime entities.

## 4. Continuation definition

Continuation is the resumption or next meaningful step of an already intelligible engineering engagement, where the engineer can understand why it matters, its current position, the action available, the relevant Project, and the destination for continuing.

The minimum supported composition is:

```text
Purpose
  Engineering Work title + summary

Current position
  lifecycle state + workflow

Available action
  Engineering Work.currentNextAction

Relevant context
  Project identity; Defect next investigation and validation target when present

Destination
  existing project-scoped Engineering Work detail

Reason for presentation
  operating Project + eligible lifecycle + explicit next action + no recorded condition
```

This is a projection of source state. It is not a recommendation that one valid item is more deserving than another.

## 5. Continuation semantics assessment

| Semantic | Classification | Authority | Reliability / ambiguity | First implementation |
| --- | --- | --- | --- | --- |
| Actor identity | **Available** | Better Auth session/user | Reliable identity only. | Use for authentication, not selection. |
| Actor-to-work relevance | **Unavailable** | None | No membership, owner, assignee, creator, editor, responsibility, or interaction relation. | Exclude. |
| Project context | **Available** | Project identity and status | Reliable as shared scope. `active` and `testing` are the implemented operating set. | Include and filter. |
| Project current focus | **Partially Available** | Project `currentFocus` / `nextStep` | Free text and not linked to a Work record. | Orientation only; never ranking evidence. |
| Purpose | **Available** | Work title and summary | Required and canonical for operational context. | Include. |
| Current position | **Available** | Work state and workflow | Canonical. Workflow support depth varies. | Include. |
| Condition / blockage | **Partially Available** | Work condition and rationale | Free text; no taxonomy or current mutation path. Meaning cannot be safely parsed. | Any nonblank condition creates generic attention and removes the item from confident continuation. |
| Operational action | **Available** | Work `currentNextAction` | Required in schema and create/update flows; meaningful for Active/In Review by contract. | Include as primary action. |
| Defect next investigation | **Available** | Defect Context | Reliable immediate investigation step when the child exists. It is not the parent operational action. | Include as supporting context; do not override `currentNextAction`. |
| Validation target | **Available** | Defect Context | Reliable target description, not posture or result. | Supporting context only. |
| Activity label | **Derivable** | Work workflow and label map | Workflow indicates context, not necessarily the exact next verb. | Workflow may be shown; a separate activity verb is unnecessary. |
| Destination | **Available** | Existing routes and Project/Work identity | Direct Work detail exists for every workflow; Defect uses the same route with specialized content. | Include. |
| Relevance evidence | **Partially Available** | Project status, Work state/action/condition, Defect completeness | Enough to establish eligibility, not preference among candidates. | Include an explicit factual reason. |
| Freshness | **Partially Available** | `updatedAt` | Reliable modification timestamp; unreliable engineering-activity signal. | Display optionally; use only as a bounded-set presentation tiebreaker. |
| Priority | **Partially Available** | nullable free-text Work `priority` | No scale, governance, or active editor; cannot compare values. | Exclude. |
| Mission outcome/focus | **Deferred** | Markdown contract/registry only | No runtime representation or Work relationship. | Exclude. |
| Review obligation | **Partially Available** | `state = in_review` | Review posture exists; reviewer, request, due state, and current-user obligation do not. | Eligible continuation; never automatically outranks Active work. |
| Failed validation | **Unavailable** | None | A validation target is not a result. | Exclude. |
| Meaningful recent activity | **Unavailable** | None | No engineering-event or engagement history. | Exclude. |

## 6. Actor and personalization boundary

Workspace currently operates over one shared domain dataset. Better Auth answers **who may enter**; it does not answer **whose work this is**.

Today Workspace may truthfully say:

> These are valid continuations visible in the shared Aredir Workspace.

It may not truthfully say:

> This is your assigned work, the work you last touched, or the work you should choose.

Personalization today is limited to authenticated shell identity and access. Personal continuation would require a separately governed source such as Project membership, Work ownership/assignment, an explicit user-selected focus, or interaction/engagement history. None is implied by login.

## 7. Candidate eligibility contract

An Engineering Work record is a continuation candidate only when all rules pass:

1. Its owning Project has status `active` or `testing`.
2. Its canonical lifecycle state is `active` or `in_review`.
3. Its trimmed `currentNextAction` is non-empty.
4. Its trimmed `title` and `summary` are non-empty, as required by the schema.
5. `condition` is null or blank. A nonblank condition makes actionability uncertain and is handled as Attention.
6. If workflow is `defect`, a complete Defect Context child exists. Current creation enforces all seven fields; a missing child represents an incomplete legacy or inconsistent record.
7. The existing Project and Engineering Work detail route can be constructed from joined identifiers.

Answers to the required eligibility questions:

| Question | Contract answer |
| --- | --- |
| Can Proposed work be continuation? | **No.** Proposed is captured but not yet undertaken. Choosing it would be prioritization/recommendation. |
| Can In Review work be continuation? | **Yes.** It is a non-terminal engineering engagement and `currentNextAction` is required. It is not proof that this user owes the review. |
| Can Blocked work be continuation? | **No, when a condition is recorded.** It remains visible as Attention. Free-text conditions are not parsed into stronger claims. |
| Can Completed work ever be continuation? | **No in this generation.** Its intended outcome is achieved; any follow-up requires new/returned Work authority, not Workspace inference. |
| Should records without `currentNextAction` qualify? | **No.** The schema requires the field, but the query must defensively reject blank legacy/inconsistent values. |
| Should unsupported workflows qualify? | **Yes, if the common contract passes.** Workflow-specific intake is implemented only for Delivery and Defect, but the canonical parent action and generic detail destination still support an intelligible engagement. Do not imply a specialized activity workspace. |
| Should work from inactive Projects qualify? | **No.** `paused`, `planning`, and `archived` Projects are orientation/history, not current engagement. |
| How does Defect `nextInvestigation` affect eligibility? | A complete Defect Context is required for a Defect candidate. `nextInvestigation` supplies supporting investigation context but does not replace the parent action. |

## 8. Exclusion contract

Exclude from continuation:

- Work in `proposed`, `completed`, `closed`, `cancelled`, or `superseded`;
- Work owned by a `paused`, `planning`, or `archived` Project;
- blank or whitespace-only action, purpose, or route identity;
- any Work with a nonblank condition;
- Defect Work missing its required complete Defect Context;
- milestones, Projects, Missions, prompts, documents, notes, and knowledge assets as direct continuation artifacts in this generation; and
- any candidate whose relevance would depend on inferred ownership, prose interpretation, priority comparison, timestamp meaning, or a route that does not exist.

An exclusion from continuation does not imply deletion or unimportance. A supported condition may produce Attention; otherwise the item remains available through Project orientation and collections.

## 9. Deterministic selection contract

The first-generation algorithm is intentionally not a ranking algorithm:

```text
Generate eligible candidates from operating Projects
  → count = 0: honest absence
  → count = 1: singular continuation
  → count > 1: ambiguous continuation set

Generate supported attention independently
  → conditioned Work
  → incomplete active/in-review Defect Context
  → blocked milestones in operating Projects
```

The server query should return both the total eligible count and a bounded candidate window. It must not load all Work into the client.

The factual reason for an eligible candidate should be composed from enums and field presence, for example:

> Active Engineering Work in an active Project with an explicit current next action.

or:

> Engineering Work is in review in a testing Project and records a next action.

The explanation must not claim “most important,” “recommended for you,” “recently worked on,” or “assigned to you.”

## 10. Tie-breaking behavior

There is no semantic winner when more than one candidate passes. Tie-breaking exists only to make the bounded set stable:

1. order by `workspace_engineering_work.updated_at DESC`;
2. then `workspace_engineering_work.id ASC` for deterministic equality;
3. fetch one more than the display bound so the projection can say additional candidates exist.

`updatedAt` here means only **most recently modified among already eligible candidates**. It must not be described as last meaningful activity, and it must not turn the first row into a chosen continuation. A future engineering-event or explicit-focus model should replace this temporary presentation tiebreaker.

Project or Work `priority`, lifecycle rank, Project focus prose, milestone order, and Mission registry position do not break ties.

## 11. Competing-continuation behavior

With several valid candidates, Workspace should show a small **Available continuations** set rather than one primary card plus demoted alternatives. The set is global and explicitly non-prioritized.

Recommended first-generation bound: three visible candidates, plus a factual count such as “2 additional continuations exist” and bounded links to active Projects / Projects. The query may fetch four rows to detect overflow plus a count; it should not hydrate the complete inventory.

Two Active Projects, an Active Defect plus Delivery work, or Active work plus In Review work are all ambiguity cases. Current state cannot determine the engineer’s present intent. Explicit user selection may navigate to a candidate, but selecting it must not be persisted or presented as a learned preference in this package.

## 12. Continuation versus Attention model

| Evidence | Continuation | Attention | Reason |
| --- | --- | --- | --- |
| Eligible Active or In Review Work | Yes | No by default | A meaningful parent action exists. |
| Work with a nonblank condition | No | Yes, verbatim/general | Actionability is uncertain; condition semantics are not parsed. |
| Blocked milestone in an operating Project | No | Yes | Authoritative milestone state requires awareness but is not itself an Engineering Work destination. |
| Active/In Review Defect missing required context | No | Yes, data-integrity explanation | The supported Defect conversation is incomplete. |
| In Review without assignment/reviewer data | Yes | No automatic review alert | Lifecycle posture exists; personal obligation does not. |
| Validation target without result | Supporting context only | No | A target is not a failure. |
| Completed/terminal Work | No | No | Historical/traceability posture. |
| Proposed Work | No | No | Candidate work, not an established engagement. |
| Paused/planning/archived Project content | No | No | Orientation/history only. |

Current data cannot establish that Attention is urgent enough to replace another continuation. Therefore the first implementation never promotes Attention over a separate valid continuation. When the only active Work is conditioned, Workspace shows no continuation and shows the condition as Attention.

Milestone Attention must link to the Project because no milestone detail route exists. Work Attention links to Engineering Work detail.

## 13. Honest absence contract

When no candidate passes, Workspace should state:

> There is no clearly justified continuation right now.

The surface may then provide:

- up to three operating Projects, with `currentFocus` or `nextStep` as Project-authored orientation;
- supported Attention, if any; and
- a link to the Projects collection.

It must not silently promote Proposed Work, terminal Work, an inactive Project, a recent metadata edit, or the first record in a collection. Project fallback content must be labelled as orientation, not continuation.

## 14. Workspace projection contract

The appropriate repository representation is a server-side query/view-model projection, not a database model.

```ts
type WorkspaceContinuationProjection = {
  mode: "none" | "single" | "ambiguous";
  totalCandidates: number;
  candidates: Array<{
    project: { id: string; name: string; slug: string; status: string };
    artifact: { id: string; title: string; workflow: string; state: string };
    purpose: string;
    nextAction: string;
    defectContext: null | {
      nextInvestigation: string;
      validationTarget: string;
    };
    destination: string;
    reason: string;
    modifiedAt: Date;
  }>;
};

type WorkspaceAttentionProjection = {
  total: number;
  items: Array<{
    project: { id: string; name: string; slug: string };
    artifact: { kind: "engineering_work" | "milestone"; id: string; title: string };
    condition: string;
    explanation: string | null;
    destination: string;
  }>;
};
```

This is an implementation shape, not a mandated exported TypeScript name. `reason` is derived from Project status, Work lifecycle, and field presence. `destination` is derived from route identity. `modifiedAt` is a labelled database timestamp, not activity history. Defect fields remain authoritative in Defect Context.

## 15. Workspace → Project handoff

Workspace must answer only enough to justify entry:

- Project name and operating status;
- Work title and concise summary;
- lifecycle/workflow position;
- current parent action;
- Defect investigation context when relevant;
- factual reason for inclusion; and
- direct destination.

After entry, Project answers what is happening across the effort and Engineering Work detail answers the current artifact conversation. Workspace should not duplicate Project milestones, notes, documents, prompts, repository evidence, all Work, or full Defect investigation content.

## 16. Scenario validation

### Scenario A — One Active Delivery item

It qualifies when its Project is `active` or `testing`, its action is nonblank, and it has no condition. Workspace shows Project, title, summary, Active/Delivery position, current next action, and the factual eligibility reason. It links to Engineering Work detail.

### Scenario B — Active Defect investigation

It qualifies only with complete Defect Context. `currentNextAction` remains primary because it is the canonical operational action; `nextInvestigation` is supporting immediate investigation context and `validationTarget` states what eventual validation should establish. The workflow label “Defect” supplies enough activity orientation; a separate “Investigate” badge is optional and unnecessary in the first implementation. Destination is the existing Defect-composed Engineering Work detail route.

### Scenario C — Blocked primary work

The conditioned Work is excluded from continuation and appears as Attention using its exact condition and rationale. The other eligible Active item becomes the singular continuation. The blocked item remains visible with a direct Work destination, without claiming that its recorded next action can proceed.

### Scenario D — Work awaiting review

In Review qualifies because the lifecycle contract treats review as non-terminal and requires a next action. It does not outrank Active implementation: there is no assigned reviewer, required-response flag, or due state. If both qualify, Workspace shows an ambiguous set.

### Scenario E — Two Active Projects

Candidates from both Projects enter the ambiguous set. Authentication provides no evidence for selecting one Project. Workspace requires user choice at navigation time and does not persist or infer that choice.

### Scenario F — No actionable work

Completed/terminal Work and inactive Projects produce no continuation. Workspace states honest absence, shows supported Attention if present, and offers a small operating-Project orientation set or the Projects route. It does not display a historical record as current work.

### Scenario G — Recency conflict

Active Work A with a meaningful action qualifies. Proposed Work B does not qualify even if its metadata changed today. Work A is the result. `updatedAt` never overrides eligibility and is used only to order peers inside an ambiguous set.

### Scenario H — Scale

With 20 Projects, 500 Work records, and 300 Defects, the server filters before projection, counts eligible candidates, and fetches only the bounded window. Defect Context is left-joined only for filtered candidate/attention evaluation. Attention uses separately bounded queries. The client receives no full inventory and performs no ranking.

## 17. Scale and query analysis

The implementation package should use bounded server-side queries:

1. **Continuation count:** join Work to Projects; filter operating Project status, eligible Work state, blank condition, and nonblank action; enforce Defect child completeness.
2. **Continuation window:** apply the same predicate, select only projection columns, order by modification timestamp plus ID, and `LIMIT 4` for a three-item display bound.
3. **Condition attention:** operating Projects + non-terminal Work + nonblank condition; bounded order by `updatedAt`, labelled as modification recency.
4. **Incomplete Defect attention:** operating Projects + Active/In Review Defect Work + absent/incomplete child; bounded.
5. **Milestone attention:** operating Projects + `status = blocked`; order with Project identity before Project-local `sortOrder`; bounded.
6. **Orientation fallback:** operating Projects only, bounded to three; it is not part of candidate selection.

At expected scale, add indexes only from measured query plans in the implementation package. Likely predicates include `(project_id, state, updated_at)` for Work and `(project_id, status, sort_order)` for milestones, but this architecture record does not authorize speculative indexes or migrations.

## 18. Runtime observations

Static runtime composition confirms:

- continuation is the first large interactive region;
- Project context precedes Work title and summary;
- the next action has its own emphasized block;
- Attention and active Projects follow continuation;
- the page is bounded to `max-w-5xl`, uses responsive padding, and moves the lower regions from one column to a two-column desktop grid; and
- the current absence path incorrectly promotes the first active Project into the Continue region.

A fresh authenticated browser observation was not completed for this package. Local configuration and the repository-provided test credential exist. The built local application started successfully, but Better Auth returned HTTP 500 before session creation because its user lookup could not reach the configured Neon database (`fetch failed`). A direct read-only database request failed for the same reason both inside and outside the sandbox. No authentication bypass, credential change, database mutation, or seed operation was attempted.

Prior repository validation establishes that the unauthenticated Workspace redirects to sign-in, while authenticated Defect detail has passed desktop, tablet, and mobile hierarchy checks. Those records support route and Defect composition evidence; they are not represented here as a new authenticated Workspace usability pass.

## 19. Persistence assessment

**Workspace continuation does not require new persistence now.**

The first contract is fully representable as a server-side projection over existing canonical fields and relationships. Persisting a continuation would duplicate state and falsely imply stronger authority than the source artifacts provide.

Potential future persistence—assignment, Project membership, user-selected focus, pinned continuation, meaningful engineering events, or engagement history—requires its own responsibility, governance, authorization, and lifecycle contract. It is not a hidden prerequisite for an honest shared projection.

## 20. Architectural risks

| Risk | Consequence | Contract control |
| --- | --- | --- |
| Global projection described as personal | False ownership and trust loss | Use shared-language copy; actor never ranks. |
| One row treated as a winner | Opaque recommendation | Three-mode result; several candidates remain ambiguous. |
| `updatedAt` treated as activity | Metadata edits masquerade as progress | Eligibility first; timestamp only orders an already-valid bounded set. |
| Free-text condition interpreted | Fabricated blocked/urgent semantics | Preserve verbatim; classify only as generic Attention. |
| Review treated as user obligation | Invented assignment | In Review is eligible but never automatically dominant or alerting. |
| Validation target treated as result | False failure/success posture | Target is supporting context only. |
| Defect actions collapsed | Loss of parent versus investigation intent | Parent action primary; next investigation subordinate. |
| Mission docs treated as runtime | Documentation becomes accidental application authority | Defer until an explicit runtime representation/relation exists. |
| Client-side full-inventory ranking | Scale and consistency failure | Filter, count, order, and bound on the server. |
| Workspace duplicates Project | Entry point becomes dashboard/record wall | Minimal handoff fields only. |

## 21. Open questions

These questions do not block the first implementation:

1. Should the free-text Work condition become a controlled vocabulary, and how should “blocked,” “waiting,” and “at risk” affect actionability differently?
2. What artifact will own review requests and reviewer responsibility if review becomes personal?
3. What constitutes a meaningful engineering event, and which events may safely influence freshness?
4. Should an engineer be able to explicitly select or pin a current engagement, and what clears that selection?
5. When a validation result model exists, which failures should replace continuation rather than appear beside it?
6. Should Project `currentFocus` eventually relate explicitly to Engineering Work rather than remain free text?
7. Does operational use justify a dedicated cross-project Engineering Work collection for ambiguity overflow?

## 22. Recommended next implementation package

Create **WORKSPACE-OPERATIONAL-003 — Operational Workspace Entry Experience**.

It should:

- replace `getDailyOperatingExperience()` with the bounded projection contract;
- implement none/single/ambiguous continuation modes;
- separate conditioned Work, incomplete Defects, and blocked milestones as bounded Attention;
- correct personal/global wording;
- display factual inclusion reasons and clearly labelled modification dates where useful;
- preserve direct Work and Project destinations;
- add query-level tests for eligibility, exclusion, ambiguity, and tiebreaks;
- use scale fixtures without adding persistence; and
- perform authenticated desktop/mobile observation when an approved session and reachable development database are available.

It must not create the Defect Investigation Operational Workspace; that remains a separate later package.

## 23. Explicit deferred work

This contract does not authorize:

- UI redesign beyond the later bounded entry implementation;
- dashboard metrics, notifications, AI ranking, scoring, or recommendations;
- assignment, ownership, Project membership, roles, or permissions;
- user-selected/pinned focus or interaction history;
- activity, event, timeline, engagement, continuation, or attention tables;
- validation-result, review-request, dependency, or urgency models;
- a controlled condition migration;
- Engineering Mission application persistence or projection;
- new lifecycle states, workflow values, or speculative routes;
- a Defect Operational Workspace, generic editor, or generic timeline;
- Project, Defect, EOS, AEF, or OPERATIONAL-EXPERIENCE-001 redesign; or
- database indexes without implementation-time query evidence.

## Completion assessment

| Criterion | Result |
| --- | --- |
| Precise operational definition | Satisfied by §§1 and 4. |
| Source authority and semantic availability known | Satisfied by §§3 and 5. |
| Actor/personalization limitation explicit | Satisfied by §6. |
| Eligibility and exclusions deterministic | Satisfied by §§7–8. |
| Selection, ties, and competition explainable | Satisfied by §§9–11. |
| Modification recency distinguished from activity | Satisfied by §§5 and 10. |
| Continuation and Attention separated | Satisfied by §12. |
| Honest absence defined | Satisfied by §13. |
| Projection remains bounded at scale | Satisfied by §§14 and 17. |
| Runtime claims bounded to evidence | Satisfied by §18. |
| No unnecessary persistence | Satisfied by §19. |
| Next implementation package scoped | Satisfied by §22. |

## Related

- [OPERATIONAL-EXPERIENCE-001 — Operational Engineering Environment Architecture](./OPERATIONAL-EXPERIENCE-001_OPERATIONAL_ENGINEERING_ENVIRONMENT_ARCHITECTURE.md)
- [WORKSPACE-001 — Daily Operating Experience](../engineering/WORKSPACE-001_DAILY_OPERATING_EXPERIENCE.md)
- [Engineering Work Domain Contract](../engineering/ENGINEERING-WORK-DOMAIN-CONTRACT.md)
- [Engineering Work Lifecycle](../engineering/ENGINEERING-WORK-LIFECYCLE.md)
- [ENGINEERING-WORK-012 — Workflow Context Architecture](../engineering/ENGINEERING-WORK-012_WORKFLOW_CONTEXT_ARCHITECTURE.md)
- [DEFECT-UX-001 — Operational Defect Detail Hierarchy](../engineering/DEFECT-UX-001_OPERATIONAL_DEFECT_DETAIL_HIERARCHY.md)
- [PROJECT-UX-002 — Operational Application Assessment](../engineering/PROJECT-UX-002_OPERATIONAL_APPLICATION_ASSESSMENT.md)
- [Authentication Inventory](./AUTHENTICATION-INVENTORY.md)
- [Data Model Inventory](./DATA-MODEL-INVENTORY.md)
- [Engineering Mission Contract](../missions/ENGINEERING-MISSION-CONTRACT.md)
- [Engineering Mission Registry](../missions/ENGINEERING-MISSION-REGISTRY.md)
