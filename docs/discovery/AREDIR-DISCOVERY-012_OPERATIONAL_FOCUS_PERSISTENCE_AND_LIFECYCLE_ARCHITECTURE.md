# AREDIR-DISCOVERY-012 — Operational Focus Persistence and Lifecycle Architecture

| Field | Value |
|-------|-------|
| **Work item** | AREDIR-DISCOVERY-012 |
| **Scope** | Minimum persistence, authority, lifecycle, history, and projection architecture for Project operational focus |
| **Review date** | 2026-08-22 |
| **Depends on** | AREDIR-DISCOVERY-009, AREDIR-DISCOVERY-010, AREDIR-DISCOVERY-011 |
| **Trigger** | Package 4: resolve focus persistence and lifecycle questions deferred by DISCOVERY-011 |
| **Outcome** | Implementation-ready architecture with explicit deferrals; no runtime, schema, migration, query, UI, action, test, seed, or lifecycle behavior changes |

---

## 1. Executive Summary

Operational focus should be **shared Project authority**: the unordered set of Engineering Work that authorized operators have deliberately selected as the Project's current operational emphasis. It is not a record of which person or agent is presently performing each item. A future personal working-context concept may answer “What am I working on?”, but assignment, personal dashboards, and per-operator focus are not required for the initial architecture.

The minimum safe persistence model is **state plus event**:

- a current Project-to-Engineering-Work selection relationship answers what is selected now;
- an append-only focus event stream explains every selection-state change;
- one domain command updates both atomically, so neither is an independently writable authority;
- the current relationship is authoritative for present selection, while events are authoritative for historical reconstruction.

Baseline selection authority belongs to an **authenticated human authorized to act in the shared Workspace**. The repository has authentication and shared Workspace access but no Project membership or role model, so this package does not invent owner/collaborator permissions. Agents may recommend. Agents do not establish focus authority in the initial implementation. The provenance model must nevertheless distinguish a human decision, an agent recommendation, a future agent action under delegated authority, and a system-rule consequence.

Only `active` and `in_review` Work in an `active` or `testing` Project is initially selectable. `proposed` Work remains captured intent, not current operational emphasis; a future planned-focus concept is deferred rather than invented. A selected conditioned Work remains selected and operationally projected, clearly marked as conditioned, because deliberate emphasis may be on resolving the condition. It is attention-bearing and continuation-ineligible.

Completion, closure, cancellation, supersession, and Project archival make a current selection invalid. The system removes the current relationship and appends a **system invalidation** event linked to the lifecycle or Project-status cause. This does not claim the operator deselected anything. Supersession never transfers focus to the successor; the successor may be recommended, but requires explicit selection. Project pause suppresses projection while preserving current selection. Resume recomputes projection from the still-current selection and current Work state; it does not create a new selection or “restore” deleted authority. Archive invalidates current selections, so unarchiving cannot resurrect them.

Operational focus is a live derived projection of valid current selections through Project and Work eligibility rules. It may contain zero, one, or many items and has no semantic order, primary item, or architectural cardinality limit. It does not alter continuation, attention, lifecycle, or priority. A singular Project next-step projection is safe only when exactly one operationally focused item exists and has a usable `currentNextAction`; otherwise the singular projection is null and the experience may present plural work-level next actions.

The architecture is **READY WITH EXPLICIT DEFERRALS**. The next package may implement only shared human-authoritative focus selection, atomic current-state/history persistence, lifecycle/status invalidation, and query-time projection. Personal working context, assignments, recommendations, agent delegation, projection-history reporting, ranking, priority, discussion, and notifications remain outside that boundary.

---

## 2. Package 3 Baseline

AREDIR-DISCOVERY-011 established the following constraints:

- Engineering Work `priority` is optional, advisory, non-operational metadata with undefined semantics.
- Focus means deliberate operational emphasis within a Project.
- Focus is distinct from priority, lifecycle, continuation, attention, readiness, recommendation, and `currentNextAction`.
- Explicit operator selection is required; state, recency, IDs, insertion order, priority, and continuation cannot manufacture it.
- Selection history and operational projection are different questions.
- Zero, one, and multiple focus items are all valid.
- Recommendation is optional and non-authoritative.
- Shared versus per-operator authority, persistence, provenance, lifecycle eligibility, and field disposition remained unresolved.

This record accepts those conclusions. Repository evidence found no contradiction.

---

## 3. Scope and Method

This package defines semantics and an implementation boundary. It does not prescribe physical table names, API routes, controls, layouts, or migration mechanics.

Method:

1. Reconcile DISCOVERY-009 through DISCOVERY-011 with the current schema and operating projections.
2. Inspect Engineering Work lifecycle, history, actor, authority, and concurrency conventions.
3. Test candidate focus models against multi-user, agent, lifecycle, Project-status, continuation, attention, history, and handoff scenarios.
4. Prefer the smallest model that preserves present truth and reconstructable authority without introducing assignment or ticket-management concepts.

No runtime observation or database access was necessary because the questions concern canonical repository contracts and architecture, not deployed data values.

---

## 4. Existing Persistence and Authority Inventory

| Concern | Repository evidence | Architectural consequence |
|---------|---------------------|---------------------------|
| Project scope | Every Engineering Work has exactly one required `projectId`; cross-Project ownership is rejected | Focus is Project-scoped and may select only Work owned by that Project |
| Project status | `active`, `testing`, `paused`, `planning`, `archived`; status is Project-authoritative | Status gates operational projection but is not derived from selected Work |
| Work lifecycle | `proposed`, `active`, `in_review`, `completed`, `closed`, `cancelled`, `superseded` | Eligibility rules use canonical states rather than inventing a focus lifecycle |
| Conditions | Conditions do not change lifecycle state; continuation excludes conditioned Work | Focus must not equate condition absence with focus eligibility |
| Current Project prose | `currentFocus` and `nextStep` are nullable text, seeded, and have no mutation path | They cannot be authoritative selection or synchronized copies |
| Work next action | `currentNextAction` is Work-authoritative and history-tracked | Project next-step presentation must project it, never copy it as separate truth |
| Work priority | Nullable text; no scale, editor, query behavior, or history | It remains outside focus semantics |
| Work history | Current projection plus append-only history, atomic writes, actor/decision/authority provenance | Focus should reuse the pattern, not the Work-history table or Work relation abstraction |
| Actor model | `human`, `ai_agent`, `system`, `integration`; action actor and decision actor are distinct | Focus provenance must preserve who decided and who executed |
| Authority model | Human owner, delegated policy, verification policy, approval gate, system rule are representable; authority is recorded, not inferred | Baseline uses human authorization and system-rule invalidation; delegation remains future |
| Authentication | Sessions establish identity; current product has shared Workspace access and no Project roles/memberships | Do not invent Project-owner or collaborator permission classes |
| Continuation | Query-time eligibility for operating Projects and active/in-review unconditioned Work | Focus neither changes nor is derived from continuation |
| Attention | Query-time condition-based projection | Focus may change prominence, not attention truth |
| Project history | No canonical Project status history exists | Historical operational-projection reconstruction is not baseline-safe |

The repository already demonstrates the useful **current projection plus append-only history** pattern. It also demonstrates that action actor, decision actor, recommendation, authorization, and system rule are separate provenance concepts. Focus can align with those semantics without sharing Engineering Work lifecycle storage.

---

## 5. Shared vs. Per-Operator Focus

### Model evaluation

| Criterion | Shared Project focus | Per-operator focus | Hybrid |
|-----------|----------------------|--------------------|--------|
| Meaning in the EOS | Coordinates what the Project deliberately emphasizes | Describes an individual's working context | Preserves both meanings if named separately |
| Current Project authority | Fits Project-scoped status, stage, milestones, and Work ownership | Requires a user-to-Project operational relation not present | Shared half fits; personal half adds a new domain |
| Engineering Work ownership | Fits the required one-Project ownership boundary | Adds operator ownership/assignment semantics the Work contract defers | Keeps Project ownership clean but still requires a new personal relation |
| Multi-user collaboration | Gives a common handoff and coordination truth | Different views may hide team intent | Best eventual expressiveness, greatest initial complexity |
| Agent operation | Lets an agent understand Project intent without claiming assignment | Conflates agent execution context with Project intent | Future-friendly if authorities stay distinct |
| Workspace orientation | Supports one shared Project story | Requires current-user identity throughout projections | Could support both later |
| Project detail experience | Presents one authoritative Project focus set | Changes focus depending on viewer | Can show shared focus first and personal context separately |
| Continuation | Composes with the existing shared eligibility projection | Risks implying continuation ownership by the viewer | Can preserve shared eligibility while adding personal context later |
| Historical reconstruction | One Project timeline | Separate timeline per operator | Two histories with different meanings |
| Collaboration and handoff | A successor operator sees the same deliberate emphasis | Requires synthesis before handoff | Shared history supports handoff; personal history may add detail later |
| Team coordination | Plural set represents intentionally parallel Project emphasis | Personal choices do not state collective intent | Strongest eventual model if the concepts never merge |
| Cognitive complexity | One focus concept and one current set | One set per operator and viewer-dependent language | Two named concepts, two authorities, and interaction rules |
| Minimum architecture | One scoped set and event stream | Requires operator scope and semantics | Requires both plus interaction rules |

### Decision

Authoritative operational focus is **shared Project focus**.

Focus answers: **“What Engineering Work is this Project deliberately emphasizing now?”** That is a coordination statement about the Project, not an ownership statement about a person. Shared focus supports operator handoff, team coordination, Project detail, Workspace orientation, and agent context with the least new machinery.

Multiple future users do not, by themselves, make focus personal. If two operators intentionally advance different items, the shared focus set can contain both. If only one item is Project focus while another operator happens to work elsewhere, that personal activity does not silently change Project authority.

---

## 6. Personal Working Context

“Project focus” and “my current work” are useful distinct concepts:

- **Project focus:** shared deliberate emphasis for the Project.
- **My current work:** person- or agent-relative execution context, possibly involving assignment, ownership, session state, or delegation.

The distinction is compatible with the architecture but **personal working context is deferred**. The repository has no Project membership, assignment, owner, or agent-task authority model. Adding per-operator focus now would introduce those questions without being necessary to answer the MVP question.

Future personal context must reference, but must not overwrite or masquerade as, shared Project focus. An operator may work on an unfocused item; an agent may verify one focused item while a human works on another.

---

## 7. Selection Authority

Baseline authority belongs to an **authenticated human operator authorized by the application's existing shared Workspace access boundary**. This is a semantic minimum, not a new permission model.

- “Project owner” and “authorized collaborator” roles are not distinguished because the repository does not implement them.
- System automation cannot select, deselect, replace, clear, or transfer focus on an operator's behalf.
- An agent may create a recommendation with no selection authority.
- An operator accepting a recommendation creates a distinct human-authorized selection event linked to that recommendation.
- A future agent may execute a bounded action under explicit delegated authority, but the event must preserve the human/policy authority and distinct action actor. Delegation evaluation is not part of the initial implementation.
- The system may invalidate selection under an explicit lifecycle/status rule. That is system-rule authority over selection validity, not authority to express operator intent.

---

## 8. Selection Semantics

An authoritative selection is best understood as **state plus event**:

> A current Project-to-Engineering-Work relationship states that the Work is presently selected, and an append-only event states how that relationship became, changed, or stopped being current.

The relationship answers a present-tense query efficiently and unambiguously. The event preserves authority, provenance, concurrency order, and historical meaning. Neither alone is sufficient:

- state alone cannot answer who selected the Work or why it stopped;
- events alone can reconstruct state, but make every current Workspace query replay history and complicate consistency/concurrency;
- a bare Work-to-Work relationship is the wrong domain because focus relates a Project's coordination authority to its Work, not one Work item to another.

Selection is valid only when Project ownership matches, the Project and Work are initially selection-eligible, and the command is authorized. Current selection is not identical to operational projection: pause can retain selection while suppressing projection; a condition can retain both selection and projection while removing continuation.

---

## 9. Persistence Architecture

### Recommended conceptual model

Use a **hybrid current-state plus append-only event model** governed by one atomic command path.

1. **Current selection relationship:** one current row/relationship per selected Project–Work pair; no order or primary flag.
2. **Focus event:** append-only evidence for `selected`, `deselected`, and `invalidated` effects, with a batch/correlation identity when one command affects several relationships.
3. **Atomic mutation:** every authorized command changes the current set and appends its event evidence together. Direct independent writes to either representation are prohibited.
4. **Authority split by temporal question:** the current relationship is authoritative for “selected now”; the event stream is authoritative for “what changed, when, by whom, and why.” They are not competing authorities.
5. **Derived operational projection:** query current selections through Project status, Work state, and condition-aware presentation rules. Do not persist operational focus as a second state.

System invalidation removes a current relationship and appends an `invalidated` event. It does not mutate or reinterpret the original `selected` event.

### Consistency requirement

The implementation must follow the repository's established pattern: optimistic concurrency or an equivalently explicit stale-state guard, atomic current-state/history writes, append-only history, and no event when the state mutation fails. Physical mechanism is deferred to the implementation package.

---

## 10. Selection Provenance

| Provenance element | Classification | Rationale |
|--------------------|----------------|-----------|
| Project identity | **Required** | Establishes authority scope and supports clear-all events |
| Engineering Work identity | **Required for item effects** | Identifies the selected, deselected, or invalidated member; a clear batch records all affected identities |
| Action actor identity and type | **Required** | Distinguishes who performed the write: human, future agent, system, integration |
| Decision actor identity and type | **Required** | Preserves human authorization when executor differs; may equal action actor |
| Authority type/context | **Required** | Human authorization for baseline selection; system rule and cause for invalidation |
| Timestamp | **Required** | Establishes temporal reconstruction |
| Action/effect | **Required** | `selected`, `deselected`, or `invalidated`; command context may be add/remove/replace/clear |
| Stable event identity | **Required** | Supports append-only history and causal references |
| Batch/correlation identity | **Required when one command has multiple effects** | Keeps replace and clear atomic and reconstructable |
| Cause/based-on event | **Required for system invalidation; optional otherwise** | Links terminal lifecycle/status cause or accepted recommendation |
| Human reason/rationale | **Optional for select/deselect; required for policy invalidation** | Concise provenance is useful, but mandatory prose would burden routine focus changes |
| Originating recommendation | **Optional** | Required only when the operator accepted a recorded recommendation |
| Previous selection set | **Derived** | Reconstruct from prior current state/events; do not duplicate it in every event |
| Replacement context | **Derived from correlated effects; optional command label** | Replace is a transactional intent, not a new authority kind |
| Discussion/thread | **Deferred and separate** | Focus rationale must not become a substitute for collaboration history |

Actor identifiers must be durable snapshots rather than provenance that disappears with account removal. Agent-specific provider/model/runtime metadata is optional and required only when an agent is an action or decision actor.

---

## 11. Selection Actions

The minimal semantic effects are:

- **Select / add to focus:** add one or more eligible Work items to the current set. “Select” and “add” have the same set effect.
- **Deselect / remove from focus:** remove one or more current members through human authority.
- **Clear focus:** deliberately remove every current member. Zero focus is valid, so this is a legitimate human action.
- **Invalidate:** system-rule removal because current selection validity ended. It is never labeled deselection.

**Replace focus** is a useful command but not a distinct authority primitive. It atomically combines removal effects and selection effects under one human decision and batch identity. This preserves the operator's “replace” intent without inventing ranking or treating one item as the successor of another.

**Restore prior focus** is not resurrection of old state. It is a new explicit selection command, with new timestamp and provenance, using a historical set only as input.

---

## 12. Plural Focus

Authoritative focus is an **unordered set**:

- zero items is valid;
- one item is valid;
- multiple items are equally selected;
- there is no primary focus, rank, sequence, or implied execution order;
- no architectural cardinality limit is justified.

Presentation may use bounded summaries for usability, but must disclose the complete count and provide access to all selected items. A UI warning or governance convention may discourage an unhelpfully large set; it must not create a hidden semantic limit.

Plural focus does not change Project `nextStep`, continuation, or attention. It makes a singular next-step projection unsafe; each focused Work retains its own next action.

---

## 13. Proposed Work Eligibility

Three models were evaluated:

| Model | Strength | Deficiency | Decision |
|-------|----------|------------|----------|
| Operational-only (`active`/`in_review`) | Aligns focus with work being undertaken or assessed; smallest model | Cannot express intended next Work as current focus | **Adopt for baseline** |
| Intent-inclusive (`proposed` selectable) | Expresses intention to begin | Blurs captured intent with current operational emphasis and continuation | Reject for current focus |
| Separate planned/candidate focus | Preserves semantic distinction | Adds persistence and workflow without demonstrated need | Defer; do not implement now |

`proposed` means captured but not yet undertaken. Selecting it as current operational focus would weaken the lifecycle distinction established by the Engineering Work contract. The operator should activate the Work through canonical lifecycle authority before selecting it. A future intended-next-work or planned-focus concept may be investigated only if operating use demonstrates the need.

---

## 14. Conditioned Work

A condition does not invalidate selection and does not suppress operational focus.

- The Work remains authoritatively selected.
- It remains operationally projected while its Project operates and its state is `active` or `in_review`.
- Presentation must distinguish **focused and actionable** from **focused and conditioned**.
- The condition creates attention under existing rules.
- The condition removes continuation eligibility under existing rules.
- An operator may deliberately focus on resolving the condition.

Suppressing conditioned Work would conflate focus with continuation and could hide the very issue receiving deliberate emphasis. Clearing the condition changes continuation and presentation details, not selection authority; no focus event is required.

---

## 15. Active Work

`active` Work owned by an `active` or `testing` Project is selection-valid and operationally projectable. If unconditioned and otherwise complete, it may also be continuation-eligible. If conditioned, it remains focused and attention-bearing but is continuation-ineligible. Focus selection never activates Work and activation never selects it.

---

## 16. In-Review Work

`in_review` Work is selection-valid and operationally projectable. Review is active engineering activity even if implementation has stopped, another person or agent is reviewing, or the operator is awaiting evidence. Conditioned review Work follows the same focus/attention/continuation distinctions as conditioned active Work. Transition back to `active` does not change selection.

---

## 17. Completed / Closed Work

When selected Work becomes `completed`:

1. the original selection history remains true;
2. current selection is invalidated under a system rule;
3. the current relationship is removed atomically with a focus invalidation event causally linked to the lifecycle transition;
4. operational projection becomes empty for that item;
5. no operator deselection is claimed.

Completion means the intended operational outcome has been achieved and assessed. Leaving a completed item in the current selection set would preserve stale present authority indefinitely. Merely suppressing projection would also make “selected now” misleading. Explicit system invalidation truthfully separates the operator's earlier intent from a lifecycle consequence.

`closed` is a terminal administrative/traceability disposition after completion. Normally completion has already invalidated focus. If inconsistent legacy/current data contains a selected Work that closes, closure defensively produces the same invalidation consequence. Closure does not differ from completion for projection eligibility, but it remains a distinct Work lifecycle event.

---

## 18. Cancelled / Superseded Work

Cancellation invalidates current selection through a system-rule focus event linked to the cancellation event. Cancellation rationale remains owned by Work lifecycle history; the focus event records the cause reference rather than copying it.

Supersession likewise invalidates the selected predecessor. The successor relationship is context, not focus authority:

- Work A loses current selection and operational projection.
- A's selection and invalidation history remain.
- Work B is not silently selected.
- Work B may become a non-authoritative recommendation candidate.
- An authorized human must explicitly select B.

The repository defines supersession semantics but does not currently implement the full successor relationship/mutation path. Focus implementation must not invent or complete that lifecycle capability; it must handle the state/cause once canonical supersession exists.

---

## 19. Project Status Interaction

Project statuses are `active`, `testing`, `paused`, `planning`, and `archived`.

- **`active` / `testing`:** operating statuses. Valid current selections project according to Work rules.
- **`paused`:** temporary non-operating posture. Current selections remain authoritative, but operational projection and continuation are suppressed. Attention follows its existing operating-Project filter. No deselection or invalidation is created.
- **Resume to `active` / `testing`:** recompute projection from the still-current selection. If the Work remains `active`/`in_review`, it reappears; if a terminal lifecycle change invalidated it during the pause, it does not. This is not a new selection and does not claim automatic operator restoration. The selection never stopped being current. Its timestamp should remain visible enough to expose possible staleness; revalidation prompts are presentation governance, not baseline authority.
- **`archived`:** durable historical posture. Archive invalidates all current selections through system-rule focus events and suppresses projection/continuation. A later return from archive requires new explicit selection; no old focus is resurrected.
- **`planning`:** non-operating status. Initial focus selection is not allowed. Transitioning an operating Project to planning suppresses projection; detailed transition policy is outside the requested minimum because current Project mutations/history are themselves unresolved. It must never manufacture selection.

Pause is intentionally different from archive: pause preserves deliberate context for resumption; archive closes current operational coordination.

---

## 20. Selection Validity vs. Projection Eligibility

These are semantic categories, not required database enums:

- **Valid current selection:** a present authoritative Project–Work relationship whose selection has not been human-deselected or system-invalidated.
- **Projection-eligible selection:** a valid selection whose Project is `active`/`testing` and Work is `active`/`in_review`. Conditions modify the presentation/actionability facet but do not remove eligibility.
- **Historical selection:** a past selection event whose current relationship ended through human deselection or system invalidation.

A paused Project demonstrates valid-but-not-projected. A completed item demonstrates historical selection after invalidation. A conditioned active item demonstrates valid-and-projected but continuation-ineligible.

---

## 21. System Invalidation

System invalidation is **required** when a deterministic domain rule ends current selection without an operator decision.

- It is an authoritative selection-state consequence under `system_rule` authority.
- Its action actor is the system; its cause identifies the authoritative lifecycle or Project-status event.
- It removes the current relationship and appends immutable history.
- It preserves the human selection event unchanged.
- It never claims the operator deselected, replaced, or transferred focus.

Persisted invalidation is preferable to deriving stale relationships away forever: it keeps the current set truthful, explains why selection stopped, and makes point-in-time selection history reconstructable without reinterpreting all future lifecycle rules. It is not required for conditions or pause because neither ends selection validity.

---

## 22. Selection History

Baseline history must answer:

- when each Work became selected;
- which human decision authorized it and which actor executed it;
- when it stopped being current;
- whether a human deselection or system invalidation ended it;
- why a system invalidation occurred and which lifecycle/status event caused it;
- which items were concurrently selected;
- which changes belonged to one replace or clear command;
- whether a selection accepted a recorded recommendation.

Therefore **“What was this Project deliberately emphasizing on August 15, and why?”** should be answerable from focus events, subject to the honest distinction that paused selection may not have been operationally projected. Routine human rationale may be absent because it is optional; the system can still answer who selected what and what event ended it.

No history may be fabricated for pre-implementation `currentFocus` prose. Legacy text is not evidence of Work selection.

---

## 23. Operational Projection History

Reconstructing **“What would Workspace have displayed as operational focus on August 15?”** is useful but **deferred**.

Selection events alone are insufficient. Accurate reconstruction also requires temporally complete Project-status history, Work lifecycle/condition history, the projection-rule version in force, and possibly historical query semantics. Engineering Work history provides substantial evidence, but Project status history is not currently canonical.

The MVP computes only current operational focus. It must preserve focus events and causal links so future reporting remains possible, but it must not persist presentation snapshots or claim historical projection fidelity now.

---

## 24. Continuation Interaction

Focus does not alter continuation eligibility, and continuation does not alter selection.

| Combination | Meaning |
|-------------|---------|
| Focused + continuation-eligible | Deliberately emphasized and currently actionable |
| Focused + continuation-ineligible | Deliberately emphasized but conditioned or otherwise not actionable |
| Unfocused + continuation-eligible | Available to continue but not shared Project emphasis |
| No focus + multiple candidates | Honest ambiguity; the system must not select one |

Workspace may eventually distinguish focused continuation, other available continuation, and focused conditioned Work. Those are presentation treatments of independent authorities, not new states.

---

## 25. Attention Interaction

Focus neither creates nor removes attention. Attention remains condition-based and filtered by existing Project operating rules. A focused attention item may receive stronger visual prominence because the combination matters operationally, but that prominence does not change attention authority or selection authority.

---

## 26. Next-Action Projection

| Operational focus cardinality | Project-level next-step consequence |
|-------------------------------|-------------------------------------|
| Zero | Singular Project next-step projection is `null` |
| One | May derive the focused Work's `currentNextAction` when usable; the Work remains authoritative |
| Multiple | Singular Project next-step projection is `null`; present plural focused-Work next actions instead |

A condition does not automatically erase a focused Work's next action, though presentation must show the condition. If one focused item has no usable next action for an explicit lifecycle-valid reason, the Project singular projection remains null rather than inventing text.

The old singular Project `nextStep` concept should become a safe derived projection only in the singleton case. It is not an independently authored planning field.

---

## 27. Existing Field Disposition

### Project `currentFocus`

Deprecate it as independent free-text authority and eventually replace it with structured focus selection. Human-readable focus summaries should be derived at presentation time from selected Work titles/context, not persisted into `currentFocus`. Removal and data migration belong to the implementation package; no current prose is converted into selection history without explicit human confirmation.

### Project `nextStep`

Deprecate it as independent free-text authority. Project presentation may derive a singular value only for one operationally focused Work or present plural Work-level next actions. The persisted field's removal/migration is downstream; it must not be synchronized as a second writable copy.

### Engineering Work `priority`

No new evidence changes DISCOVERY-011. Leave it unchanged in the focus implementation and outside all focus, continuation, attention, lifecycle, ordering, and recommendation rules. Eventual deprecation or removal remains a separate evidence-based decision.

---

## 28. Relationship Architecture

Focus must not reuse the Engineering Work relationship model. Work relationships describe parent/child, related, dependency, validation, or supersession semantics **between Work records**. Focus expresses a Project's present coordination authority **toward its owned Work** and carries selection provenance/lifecycle.

Conceptual reuse of general persistence conventions is appropriate; semantic reuse of `depends_on`, `relates_to`, or successor relations is not. A successor relation may inform a recommendation after invalidation, but never transfers focus.

---

## 29. AI / Agent Compatibility

The architecture supports four distinct cases:

1. **Agent recommendation:** advisory evidence with agent identity and optional runtime/model metadata; no current selection change.
2. **Human acceptance:** a separate human-authorized selection event linked to the recommendation.
3. **Future delegated agent action:** conceptually representable with agent action actor, explicit decision actor/policy, stable delegated authority reference, and causal basis. Not enabled by the baseline.
4. **System projection/invalidation:** a deterministic system action under a named rule, never represented as agent or human intent.

The initial implementation must permit agent provenance shapes but need not implement recommendations, agent execution, delegation checks, or an agent permission system. An AI agent cannot establish focus authority now.

---

## 30. Concurrency

Shared focus makes concurrent edits observable Project coordination changes.

- Adding different items may compose as a plural set only when both commands are explicitly additive and the persistence contract can preserve both without lost updates.
- Removing, replacing, or clearing against stale state must fail or require reconciliation; it must not silently erase a concurrent selection.
- A replace/clear command is atomic across all affected relationships and events.
- Repeated selection of an already-selected item is idempotent or rejected as no change; it must not fabricate duplicate current relationships.
- Every committed current-state change has exactly one correlated historical explanation.
- Event ordering and a Project focus-set version or equivalent stale-state evidence must make near-simultaneous outcomes reconstructable.

This is an architectural consistency requirement, not a prescribed lock or transaction API.

---

## 31. Minimum Viable Focus Architecture

The MVP consists only of:

1. shared Project-scoped focus;
2. selection of owned `active`/`in_review` Work in `active`/`testing` Projects;
3. zero/one/many unordered current selections;
4. authenticated-human select/add, remove, replace, and clear commands;
5. an authoritative current relationship plus append-only provenance history written atomically;
6. system invalidation for completed, closed, cancelled, superseded, and archived cases;
7. query-time operational projection with condition/actionability facets;
8. safe singleton next-action projection and plural next-action presentation semantics;
9. concurrency protection and historical read capability proportionate to the event model.

It excludes assignment, ownership, scheduling, ranking, priority management, recommendation generation, personal dashboards, notifications, discussion, agent permissions, and changes to existing continuation/attention/lifecycle rules.

---

## 32. Authority Model

| Concept | Authority | Owner/Scope | Persistence Requirement | History Requirement | Derived Projection | May Be Plural |
|---------|-----------|-------------|-------------------------|---------------------|--------------------|---------------|
| Focus selection | Authorized human decision; system rule may invalidate validity | Shared Project, relating owned Work | Current relationships + atomic events | Append-only changes and provenance required | No; this is persisted authority | Yes |
| Operational focus | System rule applied to authoritative selection and current state | Project Workspace presentation | Do not persist separately | Current-only baseline; historical projection deferred | Yes, query-time | Yes |
| Selection history | Historical authority evidence | Project | Append-only events | Required | Reconstructed timeline | Yes, concurrent sets |
| Continuation | System eligibility rules | Workspace / Project | None | Existing source histories only | Yes, query-time | Yes |
| Attention | System condition rules | Workspace / Project | None as focus state | Existing source histories only | Yes, query-time | Yes |
| Engineering Work next action | Engineering Work lifecycle authority | One Work | Persisted on Work | Existing Work history required | May be presented through focus | No per Work; plural across Work |
| Project next-step projection | System projection | Project presentation | None independently | Projection history deferred | Singleton focus only; otherwise null/plural presentation | Singular field no; presentation may be plural |
| Recommendation | Agent/system advisory, never selection authority | Project or operator context | Not required for baseline; optional event later | Required only if accepted selection links to it | Advisory | Yes |
| Priority | Human advisory metadata with undefined semantics | Engineering Work | Existing optional field only | Not required | None | Not applicable |

---

## 33. Lifecycle Matrix

| Project State | EW State / Condition | Selection Remains Authoritative? | Operationally Projected? | System Event Required? | Operator Action Required? | Notes |
|---------------|----------------------|----------------------------------|--------------------------|------------------------|---------------------------|-------|
| `active` | `active`, no condition | Yes | Yes | No | Selection initially required | Continuation may be eligible |
| `active` | `active`, conditioned | Yes | Yes, marked conditioned | No focus event | No | Attention yes; continuation no |
| `active` | `in_review`, no condition | Yes | Yes | No | Selection initially required | Review remains operational Work |
| `active` | `completed` | No; becomes historical | No | **Yes: invalidated** | No deselection required | Link to lifecycle event |
| `active` | `closed` | No; becomes historical | No | Yes if a current selection anomalously remains | No | Completion normally invalidated earlier |
| `active` | `cancelled` | No; becomes historical | No | **Yes: invalidated** | No | Preserve cancellation authority separately |
| `active` | `superseded` | No; becomes historical | No | **Yes: invalidated** | Explicit selection required for successor | Never transfer automatically |
| `active` | `proposed` | No valid baseline selection | No | No | Activate, then select | Planned focus deferred |
| `testing` | `active` or `in_review` | Yes | Yes | No | Selection initially required | `testing` is operating |
| `paused` | selected `active`/`in_review` | Yes | No | No | No | Selection is suspended from projection, not deleted |
| `archived` | selected `active`/`in_review` | No; becomes historical | No | **Yes: invalidate all** | No deselection required | Reopening requires new selection |
| resumed to `active`/`testing` | previously selected, still `active`/`in_review` | Yes | Yes | No | No | Recompute existing selection; do not create restoration event |
| resumed to `active`/`testing` | selection invalidated while paused | No | No | Prior invalidation already required | New selection required | No resurrection |

---

## 34. Event Matrix

| Event | Actor | Changes Selection Authority? | Changes Operational Projection? | Historical Evidence Required? |
|-------|-------|------------------------------|---------------------------------|-------------------------------|
| Select | Authorized human | Yes, adds current member | Yes if projection-eligible | Yes |
| Add focus | Authorized human | Yes, adds member(s) | Yes if eligible | Yes |
| Remove focus | Authorized human | Yes, removes member(s) | Yes | Yes |
| Clear focus | Authorized human | Yes, removes all | Yes | Yes, correlated batch |
| Work becomes conditioned | Human-authorized Work mutation | No | Changes actionability presentation, not membership | Work history; no focus event |
| Condition clears | Human-authorized Work mutation | No | Changes actionability/continuation presentation | Work history; no focus event |
| Work completes | Work lifecycle authority + system rule | Yes, invalidates member | Yes, removes it | Work event + linked focus invalidation |
| Work closes | Work lifecycle authority + system rule | Only if current selection remains | Removes it if present | Work event + defensive invalidation if needed |
| Work cancels | Work lifecycle authority + system rule | Yes, invalidates member | Yes | Work event + linked focus invalidation |
| Work is superseded | Work lifecycle authority + system rule | Yes, invalidates predecessor only | Yes | Work event + linked focus invalidation |
| Project pauses | Project authority | No | Yes, suppresses all | Project status history needed only for future projection history; no focus event |
| Project resumes | Project authority | No | Yes, recomputes valid selections | No focus event; Project status evidence future |
| Project archives | Project authority + system rule | Yes, invalidates all | Yes | Linked focus invalidation batch required |
| Recommendation generated | Agent/system advisory | No | No | Not baseline-required unless retained/accepted |
| Recommendation accepted | Authorized human, linked to recommendation | Yes | Yes if eligible | Human selection event and causal link required |

---

## 35. Persistence Comparison

| Model | Strengths | Weaknesses | Authority Clarity | Historical Fidelity | Query Complexity | Fit for Aredir |
|-------|-----------|------------|-------------------|---------------------|------------------|----------------|
| Current-state only | Simple current query; direct multiplicity | Cannot explain who/when/why; weak handoff and invalidation truth | Clear only for now | Poor | Low | Insufficient |
| Event-only | One append-only authority; complete event trace | Replay for every current query; harder concurrency and projection joins; snapshots eventually tempting | Strong if event rules are stable | Strong for selection | High | More machinery than current need |
| Hybrid | Fast current truth plus append-only provenance; aligns with existing Work pattern | Requires atomic consistency and one governed command path | Strong when temporal responsibilities are explicit | Strong for selection | Moderate | **Recommended** |

The hybrid is not two independent writable authorities. A single focus command owns both effects. Current relationships answer present selection; events answer historical change. Operational focus remains derived and unpersisted.

---

## 36. Scenario Analysis

### Scenario A — Normal single focus

Active Project; active Work A is human-selected. Selection: `{A}`. Projection: `{A}`. Continuation: A if unconditioned and complete. Attention: only if an independent condition exists. Event: human `selected(A)`. Provenance: Project, A, actors, human authority, timestamp. Ambiguity: none.

### Scenario B — Parallel focus

Active Project; active A and in-review B are selected. Selection and projection: unordered `{A, B}`. Continuation evaluates each independently. Attention evaluates each independently. Events: one or more human selection effects, correlated if one command. Provenance identifies both. Ambiguity: no primary item and no singular Project next step.

### Scenario C — Condition appears

A remains selected and projected as conditioned focus. Continuation excludes A. Attention includes A under existing condition rules. Required event: Work operational-update history, no focus event. Provenance belongs to the condition mutation. Ambiguity: resolving the condition versus executing other Work remains operator judgment.

### Scenario D — Completion

A's earlier selection remains historical; current relationship is invalidated and projection removes A. Continuation/attention no longer treat completed A as operating Work. Required events: canonical completion plus linked system-rule focus invalidation. Provenance distinguishes the lifecycle decision from system execution. Ambiguity: none; next focus requires human selection.

### Scenario E — Supersession

A is invalidated and unprojected. B is neither selected nor focused. B may be recommended, while continuation depends on B's own state/condition. Required events: canonical supersession and linked invalidation; later human selection for B if chosen. Provenance preserves successor cause without transfer. Ambiguity: whether B should be focused remains deliberately unresolved until the operator decides.

### Scenario F — Project pause/resume

On pause, selection `{A}` remains; projection and continuation disappear under non-operating status. Existing attention projection also excludes the Project. No focus event. On resume, if A remains active/in-review and current, projection recomputes `{A}` without a new selection. Provenance for status change belongs to future Project history. Ambiguity: staleness may merit a review prompt, but does not erase authority.

### Scenario G — Proposed work

Project has only proposed A. Authoritative selection and operational projection are empty. Continuation excludes A; attention follows existing independent rules. No focus event. The operator must activate then select A. Ambiguity: a future need for planned focus remains deferred.

### Scenario H — Recommendation

Work A remains selected. Agent recommends B. Selection/projection stay `{A}`; continuation and attention remain independently derived. Recommendation may be transient. If accepted, a distinct human selection event adds or replaces according to the operator's explicit command and links to the recommendation. Ambiguity: recommendation persistence is optional unless accepted provenance needs the link.

### Scenario I — Multiple operators

Operator 1 selects A, so shared Project selection/projection is `{A}`. Operator 2 working on B does not make B Project focus. Continuation and attention evaluate both independently. Event: Operator 1's human selection. Provenance identifies the decision. Ambiguity: personal working context and assignment remain unrepresented; Operator 2 may explicitly add B to shared focus if authorized.

### Scenario J — No focus

An operating Project intentionally clears focus. Selection/projection are empty even if continuation has one or many candidates. Attention remains independent. Required event: human clear with correlated deselections. Provenance identifies the clearing decision. Ambiguity: none; null focus is deliberate and truthful.

---

## 37. Authority Invariants

1. Authoritative operational focus is shared Project authority, not an implicit personal assignment.
2. Personal working context, if introduced, is a separate authority and never overwrites Project focus.
3. Only an authorized human establishes, expands, removes, replaces, or clears baseline focus.
4. A recommendation does not change selection; acceptance is a distinct human-authorized event.
5. Current selection state and append-only history change through one atomic command path.
6. Current relationships are authoritative for present selection; events are authoritative for selection history.
7. Operational focus is a query-time projection, not a separately persisted authority.
8. Focus is an unordered set with valid zero, one, and many cardinalities; no primary member is inferred.
9. No architectural focus-set limit exists; presentation bounds must not conceal omitted members.
10. Baseline selection is limited to owned `active`/`in_review` Work in `active`/`testing` Projects.
11. `proposed` Work is not current operational focus; planned intent remains a separate deferred concept.
12. A condition neither deselects nor suppresses focus; it changes attention and continuation independently.
13. `in_review` Work remains eligible because review is operational engineering activity.
14. Completion, closure if necessary, cancellation, supersession, and archive invalidate current selection without fabricating operator deselection.
15. System invalidation preserves the original selection event and records a stable rule/cause reference.
16. Supersession never transfers focus to a successor; successor selection requires a new human decision.
17. Pause suppresses operational projection without ending selection; resume only recomputes still-current, still-valid selection.
18. Archive ends current selection; later reactivation cannot resurrect archived focus.
19. Focus never changes continuation eligibility or attention authority, and neither projection silently changes focus.
20. A singular Project next step exists only for one operationally focused Work with a usable authoritative `currentNextAction`.
21. `currentFocus`, `nextStep`, recency, IDs, insertion order, lifecycle order, and priority never substitute for selection evidence.
22. Agent action, agent recommendation, human decision, delegated authority, and system-rule consequence remain provenance-distinct.

---

## 38. Final Decision Matrix

| Question | Decision | Evidence / Reasoning | Implementation Consequence | Deferred Dependency |
|----------|----------|----------------------|----------------------------|---------------------|
| 1. Shared or per-operator? | **Shared Project focus** | EOS coordination, shared Workspace, Project-scoped Work, handoff | Scope current set/events to Project | Personal context |
| 2. Personal focus now? | **No** | No assignment/membership model; not needed for MVP | Do not add user-scoped focus | Ownership/assignment architecture |
| 3. What constitutes selection? | **State + event** | Present query and provenance/history both required | Current relationship plus append-only effect | Physical schema |
| 4. Persistence model? | **Hybrid** | Fits existing projection/history pattern | Atomic state/history mutation | Implementation mechanics |
| 5. What is authoritative? | Current relationship for now; events for history | Different temporal questions, one writer | Prohibit independent writes | None |
| 6. Provenance? | Actors, types, authority, scope, time, effect, IDs; cause when applicable | Existing provenance model and reconstruction need | Reuse semantic shapes | Exact storage |
| 7. Plural ordering? | **Unordered** | No ranking evidence | No sort/primary authority fields | Presentation ordering only |
| 8. Cardinality limit? | **None architecturally** | No evidence for a bound | Preserve all selected members | Presentation governance |
| 9. Proposed selectable? | **No** | Proposed is not undertaken | Require activation first | Planned-intent concept |
| 10. Conditioned remains selected? | **Yes** | Condition is not lifecycle/deselection | Keep relationship | None |
| 11. Conditioned remains focused? | **Yes, marked conditioned** | Operator may focus on resolution; focus ≠ continuation | Project with actionability facet | Presentation design |
| 12. In review remains focused? | **Yes** | Review is operational Work | Eligible state | None |
| 13. Completion? | **System invalidation** | Outcome achieved; avoid stale current state or fake deselection | Remove current relation + linked event | Lifecycle integration |
| 14. Closure? | **Not eligible; defensive invalidation** | Terminal administrative state | Ensure no current relation remains | Close implementation |
| 15. Cancellation? | **System invalidation** | Work will not continue | Linked invalidation | Cancel implementation |
| 16. Supersession? | **Invalidate predecessor; no transfer** | Relationship is context, not selection authority | Optional recommendation; explicit successor selection | Successor relationship implementation |
| 17. Project pause? | Preserve selection; suppress projection | Temporary non-operating posture | No focus event | Project mutation/history |
| 18. Project resume? | Recompute still-current selection | No deleted authority to restore | No new selection event | Staleness presentation |
| 19. Project archive? | Invalidate all current selection | Durable historical posture | System invalidation batch | Project mutation/history |
| 20. System invalidation? | **Required** | Truthful current state and stop reason | Distinct system-rule event | Exact rule identifiers |
| 21. Selection history? | **Required** | Authority, handoff, audit, point-in-time set | Append-only event read model | None |
| 22. Projection history? | **Deferred** | Missing complete Project status/rule history | Current-only projection | Project history + rule versioning |
| 23. Focus alters continuation? | **No** | Eligibility and emphasis are distinct | Compose in presentation only | None |
| 24. Focus alters attention? | **No** | Condition authority is distinct | Prominence may differ | UI design |
| 25. `currentFocus`? | Deprecate/replace | Free text duplicates structured authority | No legacy inference; downstream removal/migration | Implementation plan |
| 26. `nextStep`? | Deprecate independent field; safe derived singleton only | Work owns next action | Null for zero/many; plural presentation | Implementation plan |
| 27. `priority`? | Leave unchanged and non-operational | No new evidence | Exclude from package | Future evidence |
| 28. Agents recommend? | **Yes, optionally** | Advisory layer preserves agency | No baseline generator required | Recommendation architecture |
| 29. Agents establish authority now? | **No** | No delegation enforcement model | Human selection only | Delegated-agent authority |
| 30. MVP boundary? | Shared human selection + state/history + projection/invalidation | Smallest truthful useful model | Bounded implementation package authorized | Listed deferrals |

---

## 39. Implementation Readiness Assessment

### READY WITH EXPLICIT DEFERRALS

The architecture sufficiently resolves who owns focus, what selection is, what must persist, which layer answers current versus historical questions, how lifecycle and Project status affect validity/projection, and how focus composes with continuation, attention, next actions, priority, and agent provenance.

Implementation may proceed only within the MVP boundary in section 31. It must not make unresolved product decisions about personal work, Project roles, delegation, recommendation generation, historical projection reporting, presentation ordering, or discussion.

---

## 40. Deferred Questions

1. What Project membership/role model eventually distinguishes owners and collaborators?
2. Does operating use require personal “my current work,” assignment, or agent working-context authority?
3. Should a planned/intended-next-work concept exist for `proposed` Work?
4. What exact Project-status mutation and append-only history architecture will support pause/archive provenance and historical projections?
5. Is historical operational-projection reporting valuable enough to version projection rules and reconstruct condition/status state?
6. Should focus recommendations be persisted, and under what retention policy?
7. What delegated-policy model could authorize bounded agent focus actions?
8. What presentation governance helps operators keep plural focus cognitively useful without a semantic limit or rank?
9. How should future discussion threads link to focus events without moving rationale authority into focus history?
10. Does real use justify deprecating/removing Engineering Work `priority`?

These do not block the bounded MVP.

---

## 41. Evidence Index

| Evidence | Location | Finding used |
|----------|----------|--------------|
| Current-state inventory | `docs/discovery/AREDIR-DISCOVERY-009_CURRENT_STATE_INFORMATION_ARCHITECTURE_INVENTORY.md` | Existing authorities, duplicate fields, missing Project history/ownership |
| Project authority architecture | `docs/discovery/AREDIR-DISCOVERY-010_PROJECT_OPERATIONAL_STATE_AUTHORITY_AND_PROJECTION_ARCHITECTURE.md` | Project status authority, projection rules, null/multi-work truth |
| Focus semantic baseline | `docs/discovery/AREDIR-DISCOVERY-011_ENGINEERING_WORK_PRIORITIZATION_AND_OPERATIONAL_SELECTION_SEMANTICS.md` | Explicit selection, plurality, recommendation, deferred lifecycle/persistence |
| Workspace continuation contract | `docs/discovery/WORKSPACE-OPERATIONAL-002_WORKSPACE_CONTINUATION_CONTRACT.md` | Operating statuses, eligibility, no ranking, ambiguity preservation |
| Domain contract | `docs/engineering/ENGINEERING-WORK-DOMAIN-CONTRACT.md` | Project scope, ownership gaps, priority baseline |
| Lifecycle contract | `docs/engineering/ENGINEERING-WORK-LIFECYCLE.md` | Canonical states, conditions, completion/closure/cancellation/supersession |
| Relationship model | `docs/engineering/ENGINEERING-WORK-RELATIONSHIP-MODEL.md` | Work-to-Work relationship boundary and successor semantics |
| Lifecycle/history architecture | `docs/engineering/ENGINEERING-WORK-LIFECYCLE-UPDATE-001.md` | Current projection + append-only history, atomicity, actor/decision provenance |
| Authentication journey | `docs/engineering/AUTHENTICATION-USER-JOURNEY.md` | Identity versus authorization; shared Workspace and absent membership model |
| Schema | `src/lib/db/schema.ts` | Actual Project/Work enums, fields, history, actor and authority types |
| Provenance contract | `src/lib/workspace/engineering-work-provenance.ts` | Separate action/decision actors, recommendation rules, delegated/system representability |
| Operational projection | `src/lib/workspace/workspace-operational.ts` | Continuation and attention eligibility behavior |

---

## 42. Recommended Next Package Boundary

The next package should be an **Operational Focus Persistence and Projection Implementation Package** limited to:

- exact schema/migration design for current selection and append-only focus events;
- atomic, concurrency-safe authenticated-human focus commands;
- selection and invalidation provenance using existing actor/authority conventions;
- projection rules for active/testing Projects, active/in-review Work, conditions, pause, resume, and archive;
- terminal lifecycle integration only where canonical lifecycle actions exist;
- replacement/deprecation migration treatment for `currentFocus` and `nextStep` without inferring legacy selection;
- read/query/UI behavior and tests necessary to expose shared zero/one/many focus truth.

It must explicitly exclude personal focus, assignments, ranking, priority changes, recommendations, agent delegation, notifications, collaboration threads, and historical operational-projection reporting. It must not opportunistically implement missing cancellation, supersession, closure, or Project-status mutation capabilities; those remain separate dependencies where absent.
