# AREDIR — ENGINEERING-WORK-LIFECYCLE-UPDATE-001

## Outcome-Aware Operational Updates, Completion History, and Decision Provenance

| Field | Decision |
| --- | --- |
| Status | Active; Phases A, B, and C implemented and validated on Neon Dev |
| Project | AredirLabs.com |
| Engineering Work classification | Feature / Delivery / Active |
| AlignFit mutation | None |
| Repository Evidence Authoring | Deferred |
| Production lifecycle mutation | Deferred until this capability is migrated, deployed, verified, and used by an authenticated human |

## 1. Completion decision

Planning is complete, implementation is authorized, and Phases A, B, and C are complete. The capability remains divided into four internal phases under one Engineering Work outcome:

1. Durable lifecycle and decision history.
2. Operational mutation, stable-field enforcement, Defect preservation, and concurrency.
3. Outcome-aware completion and history presentation.
4. Human/AI/system/integration representability tests and production acceptance.

The package must not be marked complete until the production acceptance operation succeeds through the authenticated application.

## 2. Canonical Engineering Work tracking record

The canonical record must be created through the authenticated application, not by direct SQL or a seed.

| ID | Project | Type | Workflow | State |
| --- | --- | --- | --- | --- |
| `eng_work_823fe908-d387-41b6-8c98-c43f313240f7` | AredirLabs.com | Feature | Delivery | Active |

Title: **Outcome-Aware Engineering Work Lifecycle and Decision History**

Objective: Preserve Engineering Work operational updates, lifecycle transitions, outcomes, and decision provenance without destroying prior engineering truth.

Recommended Next Action: Review and authorize the bounded lifecycle-history implementation, including actor/decision provenance, completion semantics, stable-field enforcement, and concurrency protection.

`Feature / Delivery` is canonical because the intended result is a shipped operational capability. `Architecture` is reserved for bounded architectural exploration or decision preparation; architecture work is involved here, but it is not the outcome.

The authenticated human product authority reviewed this record and transitioned it from Proposed to Active through the canonical application on 2026-08-20. Because that transition predates the history migration, no history row is fabricated for it.

## 3. Final bounded scope

Included:

- current projection plus append-only Engineering Work history;
- Proposed correction, Operate, and Complete as separate conversations;
- lifecycle transition validation;
- original-objective, Project, Workflow, and post-activation Type stability;
- current Outcome, Condition, and Condition Rationale authoring;
- action actor, decision actor, decision role, authority, rationale, and decision-basis provenance;
- separate recommendation and authorization records;
- extensible AI/runtime provenance metadata without AI execution;
- integer-version optimistic concurrency;
- transactional projection/history writes;
- bounded Defect Context revision preservation;
- existing-data compatibility and the production Schema Alignment acceptance case.

Excluded:

- autonomous AI decisions or execution;
- authority/policy enforcement engine;
- assignments, comments, priority ranking, relationships, or a generic activity feed;
- cancel, supersede, close, and reopen UI conversations beyond enforcing the already documented transition graph;
- Repository Evidence Authoring, Workspace error-boundary repair, create-error logging, and AlignFit remediation;
- fabricated history for existing records.

## 4. Stable and mutable field contract

| Field | Contract |
| --- | --- |
| ID | Immutable and never reused. |
| Project | Immutable from creation. Cross-project continuation requires successor Work. |
| Workflow | Immutable from creation under the existing domain contract. |
| Objective (`summary`) | Correctable only while Proposed; stable after activation. Creation and Proposed correction remain visible in history. |
| Type | Correctable only while Proposed; stable after activation. This resolves the current documentation gap conservatively. |
| Title | Correctable only while Proposed; stable after activation so recognition history is not silently rewritten. |
| Current Next Action | Mutable through Operate; required for Active and In Review; nullable for terminal work. |
| Current Outcome | Mutable through Operate and Complete; prior/resulting values are historical. |
| Condition | Mutable through Operate; it does not change lifecycle state by itself. |
| Condition Rationale | Mutable with Condition; never reused as transition rationale. |
| Final Disposition | Set by Complete; distinct from Current Next Action. |
| State | Changed only by lifecycle actions, never by generic edit. |
| Defect Context | Workflow-specific; updates create a dedicated Defect revision associated with the generic lifecycle event. |

Proposed correction may change Title, Type, Objective, and initial Next Action. It may not move Project or Workflow. Activation and all later mutation reject changes to stable fields server-side even if a crafted request supplies them.

## 5. Lifecycle transition contract

The existing canonical documentation defines this graph:

```text
Proposed -> Active
Proposed -> Cancelled | Superseded
Active -> In Review | Completed | Cancelled | Superseded
In Review -> Active | Completed | Cancelled | Superseded
Completed -> Closed | Superseded
Closed | Cancelled | Superseded -> no transition
```

Additional canonical rules:

- Active may move directly to Completed only when review is inapplicable; rationale is required.
- In Review may return to Active only with rationale.
- cancellation and supersession require rationale; supersession also requires a successor relation, so their full conversations remain out of scope.
- Completed to Superseded is permitted only for material replacement before closure and remains out of scope here.
- Closed cannot be reached directly from Proposed, Active, or In Review.
- no reopening transition is documented; none will be implemented.
- this package requires a decision rationale for every completion, which satisfies and strengthens the documented minimum while providing the requested decision truth.

The first implementation slice exposes only Proposed correction, Proposed to Active, Active operational updates, Active to In Review, In Review to Active, and Active/In Review to Completed. Other documented transitions must be rejected until their distinct conversations exist; the enum alone is not authorization.

## 6. Append-only history model

The parent row remains the current projection. Add `version integer NOT NULL DEFAULT 1`, make `current_next_action` nullable, and add `final_disposition text`.

Proposed schema (names may be normalized by Drizzle generation without changing the contract):

```sql
CREATE TYPE engineering_work_history_kind AS ENUM (
  'created',
  'proposed_correction',
  'operational_update',
  'lifecycle_transition',
  'decision_recorded',
  'workflow_context_update'
);

CREATE TYPE engineering_work_actor_type AS ENUM (
  'human', 'ai_agent', 'system', 'integration'
);

CREATE TYPE engineering_work_decision_role AS ENUM (
  'observation', 'recommendation', 'investigation',
  'adjudication', 'authorization', 'execution'
);

CREATE TYPE engineering_work_authority_type AS ENUM (
  'human_owner', 'delegated_policy', 'verification_policy',
  'approval_gate', 'system_rule'
);

CREATE TABLE workspace_engineering_work_history (
  id text PRIMARY KEY,
  engineering_work_id text NOT NULL
    REFERENCES workspace_engineering_work(id) ON DELETE RESTRICT,
  kind engineering_work_history_kind NOT NULL,
  action_type text NOT NULL,

  prior_state engineering_work_state,
  resulting_state engineering_work_state,
  recommended_state engineering_work_state,

  previous_title text,
  resulting_title text,
  previous_type engineering_work_type,
  resulting_type engineering_work_type,
  previous_objective text,
  resulting_objective text,
  previous_next_action text,
  resulting_next_action text,
  previous_outcome text,
  resulting_outcome text,
  previous_condition text,
  resulting_condition text,
  previous_condition_rationale text,
  resulting_condition_rationale text,
  previous_final_disposition text,
  resulting_final_disposition text,

  decision text,
  rationale text,
  decision_basis jsonb NOT NULL DEFAULT '{}'::jsonb,

  action_actor_type engineering_work_actor_type NOT NULL,
  action_actor_identifier text NOT NULL,
  action_actor_display_name text,
  decision_actor_type engineering_work_actor_type,
  decision_actor_identifier text,
  decision_actor_display_name text,
  decision_role engineering_work_decision_role,
  authority_type engineering_work_authority_type,
  authority_reference text,
  authority_context text,

  based_on_event_id text
    REFERENCES workspace_engineering_work_history(id) ON DELETE RESTRICT,
  provenance_metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  occurred_at timestamptz NOT NULL DEFAULT statement_timestamp()
);

CREATE INDEX workspace_engineering_work_history_work_time_idx
  ON workspace_engineering_work_history(engineering_work_id, occurred_at, id);
CREATE INDEX workspace_engineering_work_history_basis_idx
  ON workspace_engineering_work_history(based_on_event_id)
  WHERE based_on_event_id IS NOT NULL;
```

Critical lifecycle fields use explicit columns so history can be queried without interpreting arbitrary payloads. JSON is limited to structured decision/evidence basis and optional provenance extensions; history is not a generic event bus.

New work created after migration receives a `created` event atomically with the parent insert. Existing work receives no synthetic creation event and begins history at its first post-migration operation.

History UPDATE and DELETE must be denied by database triggers. Parent deletion is already outside the domain; `ON DELETE RESTRICT` prevents a parent with history from erasing that truth.

## 7. Actor model

The actor that persisted the action is stored independently of the decision actor:

| Actor class | Identifier contract |
| --- | --- |
| Human | Better Auth `session.user.id`; display name captured as an informational snapshot when available. |
| AI agent | Stable application-owned agent identity; optional model/runtime detail belongs in provenance metadata. |
| System / automation | Stable rule/job/service identifier; never a fabricated user. |
| Integration / service | Stable integration installation or service identity. |

Actor identifiers are durable snapshots rather than cascading foreign keys, so later account removal does not erase provenance.

## 8. Decision provenance model

- **Action actor:** who or what performed the persisted write.
- **Decision actor:** who or what made the represented decision; may equal the action actor.
- **Decision role:** observation, recommendation, investigation, adjudication, authorization, or execution.
- **Authority:** human ownership, delegated policy, verification policy, approval gate, or system rule. Null authority means no authority claim, as in an unapproved recommendation.
- **Decision basis:** bounded structured summary plus evidence/rule/event references.
- **Rationale:** why this update or transition was chosen.
- **Decision:** the recommendation, adjudication, authorization, or execution statement itself.

Authority is recorded, not evaluated, by this package. AI authority is never inferred from AI action.

## 9. Recommendation versus authorization

A recommendation is a `decision_recorded` event with `decision_role = recommendation`, `recommended_state`, no resulting transition, and normally no authority claim. Human authorization is a separate event or lifecycle transition with the human decision actor, `decision_role = authorization`, authority context, and `based_on_event_id` pointing to the recommendation.

A later executor can also be distinct: a system action actor may apply a human-authorized transition while the decision actor and basis continue to identify the human authorization. These records must never be collapsed.

## 10. AI extensibility

`provenance_metadata` uses a versioned application contract and may contain:

```json
{
  "schemaVersion": 1,
  "agent": {
    "agentId": "agent-id",
    "provider": "provider",
    "model": "model",
    "modelVersion": "version",
    "runtimeId": "execution-id",
    "policyId": "delegation-or-governing-policy-id",
    "instructionRef": "work-instruction-reference",
    "evidenceRefs": ["reference"]
  }
}
```

The object is optional for normal human operations and provider-neutral. This package implements no agent, autonomous decision, delegation evaluation, or policy engine.

## 11. Operate conversation

Operate is available only for Active or In Review work. It shows the immutable Objective and current state, and authors:

- resulting Current Next Action;
- optional interim Outcome;
- optional Condition and its separate Condition Rationale;
- update rationale;
- optional decision basis.

The form carries the parent `version`. The server re-authenticates, re-resolves Project and Work, verifies state and version, validates stable fields, updates the projection, increments version, and inserts history atomically. Blank Condition normalizes Condition Rationale to null. A nonblank Condition requires a rationale.

## 12. Complete conversation

Complete is available only from Active or In Review and is not a generic edit. It displays:

- immutable Objective;
- prior state;
- prior Current Next Action;
- current interim Outcome and Condition, if any.

It requires:

- nonblank verified completion Outcome;
- nonblank final/follow-up disposition;
- nonblank decision rationale;
- a decision-basis summary or reference;
- expected version.

On success it sets state to Completed, sets Current Outcome, clears stale Condition fields, records Final Disposition, sets Current Next Action to null unless a truthful continuing administrative action is explicitly supplied, increments version, and appends the transition. The prior action/outcome/condition and resulting values remain in history.

## 13. Outcome and Condition authoring

Outcome, Condition, and Condition Rationale do not appear in Create. They belong to Operate and Complete. Outcome is the current concise operational result, not a substitute for evidence. Condition Rationale explains the condition; transition rationale explains the lifecycle decision. Neither field may be reused for the other purpose.

## 14. Concurrency model

Use a dedicated integer `version`, not timestamp equality. Current PostgreSQL timestamps may contain precision that browser serialization does not preserve.

Every projection mutation includes `WHERE id = ? AND project_id = ? AND version = ?` and increments version. Zero updated rows return a specific stale-record error and perform no history insert. Recommendation-only events also require an expected version so they state which projection they assessed.

The installed `drizzle-orm/neon-http` driver explicitly rejects callback transactions. Each dependent mutation must therefore be one PostgreSQL statement using CTEs (`current_work ... FOR UPDATE`, projection update, history insert, and optional Defect revision insert), or another proven atomic Neon transaction primitive. Tests must force history failure and prove projection rollback.

## 15. Defect compatibility

Defect Context remains in `workspace_engineering_work_defects`. It is not copied into generic history columns.

Meaningful Defect edits create a `workflow_context_update` event plus one row in a dedicated table:

```sql
CREATE TABLE workspace_engineering_work_defect_revisions (
  id text PRIMARY KEY,
  history_event_id text NOT NULL UNIQUE
    REFERENCES workspace_engineering_work_history(id) ON DELETE RESTRICT,
  engineering_work_id text NOT NULL
    REFERENCES workspace_engineering_work(id) ON DELETE RESTRICT,
  previous_context jsonb NOT NULL,
  resulting_context jsonb NOT NULL,
  context_schema_version integer NOT NULL DEFAULT 1
);
```

The JSON objects have the fixed, versioned Defect Context shape already owned by that workflow. The first post-migration change records the actual before/after values observed in that operation; it does not claim earlier history. This is the minimum change required to stop further investigation-fact destruction without generalizing workflow data.

## 16. Migration requirements

Phase A uses two additive tracked migrations after the current `0000`–`0002` journal sequence:

- `0003_engineering_work_lifecycle_history` creates the core lifecycle-history schema.
- `0004_engineering_work_history_chain_integrity` ensures a basis event and a Defect revision event belong to the same Engineering Work record.

Together they:

- add the actor/history/decision enums;
- add `version` and `final_disposition` to the parent;
- drop `current_next_action` NOT NULL without changing existing values;
- create history and Defect revision tables and indexes;
- create append-only UPDATE/DELETE rejection triggers;
- contain no history DML and no production-specific identifier;
- leave every existing parent and Defect row valid.

Apply and rerun as a journal-controlled no-op in confirmed Dev before Production. Verify rollback and existing-data counts before production migration.

## 17. Files expected

Planning artifacts changed by this package definition:

- `docs/engineering/ENGINEERING-WORK-LIFECYCLE-UPDATE-001.md`
- `docs/prompts/implementation-index.md`

Expected implementation areas:

- `src/lib/db/schema.ts`
- `drizzle/0003_*.sql`, `drizzle/0004_*.sql`, and `drizzle/meta/_journal.json`
- `src/lib/workspace/engineering-work.ts`
- a focused lifecycle mutation/provenance module and tests under `src/lib/workspace/`
- `src/app/workspace/projects/[slug]/actions.ts` (or smaller dedicated action modules)
- Proposed correction, Operate, and Complete routes/forms under the existing project-scoped Engineering Work route
- Engineering Work detail/history query and presentation
- Defect Context mutation integration
- `package.json` only if needed to run the expanded test set.

No AlignFit repository file is in scope.

## 18. Automated validation

Required tests:

- Proposed creation plus creation event;
- bounded Proposed correction;
- Proposed to Active;
- Active update with prior/resulting Next Action;
- interim Outcome and Condition/Rationale;
- invalid transition rejection;
- Project/Workflow immutability and post-activation Objective/Type/Title stability;
- Active and In Review completion paths;
- required completion Outcome, disposition, rationale, and basis;
- projection/history consistency and history append-only enforcement;
- forced history failure rolls back projection;
- stale version rejection;
- authenticated human attribution;
- AI recommendation then human authorization linkage;
- delegated AI representability;
- existing records with no history;
- Defect update and revision preservation.

Run targeted lifecycle tests, the full test suite, lint, TypeScript/build, migration review, Dev migration twice, authenticated Dev UAT, and only then guarded Production migration/UAT.

## 19. Production acceptance

Read-only production inspection on 2026-08-20 identified:

| ID | Project | Type | Workflow | State |
| --- | --- | --- | --- | --- |
| `eng_work_23e97a29-0b92-47f1-9b93-04c6f07d6df9` | AredirLabs.com | Maintenance | Maintenance | Active |

Title: **Production Engineering Work Schema Alignment**

The Objective and Active Next Action match the acceptance input; Outcome, Condition, and Condition Rationale are null. They must not be changed before this capability exists.

After migration, deployment, and authorization, an authenticated human uses Complete with:

- Outcome: `Production/runtime Engineering Work schema aligned successfully using tracked migrations 0000–0002. Schema, migration ledger, existing-data integrity, Workspace, Project Engineering Work, and canonical Engineering Work creation were verified operational.`
- Final disposition: `No further schema-alignment work is required. Engineering Work Repository Evidence Authoring remains separate follow-on work.`
- Transition: Active to Completed.
- Decision rationale: `Outcome and runtime verification satisfy the intended schema-alignment objective.`
- Decision actor/authority: authenticated human / human owner decision.

Acceptance requires the original Objective unchanged, prior Active Next Action in history, nullable terminal Current Next Action, current Outcome and Final Disposition consistent, and one append-only transition event attributed to that human.

## 20. Future AI representability tests

Scenario A constructs an AI recommendation event for In Review to Completed, then a distinct human authorization/transition event based on it. Assertions cover AI identity/model/runtime metadata, no authority inferred for the recommendation, human identity and authority, linkage, and the final state transition.

Scenario B constructs an AI-performed Verification transition under a supplied delegated verification policy. Assertions cover AI action and decision identity, delegated authority reference, decision basis, rationale, transition, and optional model/runtime provenance. The test invokes no model and executes no autonomous behavior.

## 21. Existing data and history

Existing records receive `version = 1` and otherwise retain current values. They receive no creation, migration, or inferred transition history. Their first post-migration correction, operation, recommendation, or transition becomes their first history event and records only truth observed at that time.

## 22. Remaining exclusions

Cancel, Supersede, Close, reopening, successor relationships, generalized evidence authoring, autonomous AI, delegation enforcement, task ownership, comments, priority ranking, activity feeds, repository synchronization, and AlignFit mutation remain separate work.

## 23. Git and database status after Phase A

- Baseline branch was `main` at `f4778fb`, initially clean.
- The canonical tracking record is `eng_work_823fe908-d387-41b6-8c98-c43f313240f7`, Feature / Delivery / Active.
- Migrations `0003` and `0004` were applied to confirmed Neon Dev and rerun as a journal-controlled no-op.
- Final Dev counts remain 4 Projects, 21 Engineering Work records, and 1 Defect. History and Defect revision counts are both zero; no history was fabricated.
- Atomic projection/history rollback and four append-only triggers were verified with self-cleaning integration probes.
- Production was queried read-only; no production migration or DML was run.
- Production Engineering Work Schema Alignment remains Active and unchanged.

## 24. Phase B implementation status

Phase B removes the legacy generic Engineering Work mutation path. Creation, Proposed correction, Operate, and the exposed Phase B transitions now use the single-statement projection/history persistence contract. Post-activation forms do not submit Title, Type, Workflow, Project, or Objective. The server contract changes those stable fields only in Proposed correction mode.

Outcome, Condition, and Condition Rationale authoring is available through Operate. Meaningful Defect Context changes produce a workflow-context event and a dedicated before/after revision in the same statement. Every mutation checks the expected integer version; a stale or state-incompatible request updates no projection and appends no history. Seed behavior creates missing fixture work through the same creation/history contract and preserves existing work instead of overwriting it.

The rollback-only Dev validator exercises creation, Proposed correction, activation, Operate, stable-field preservation, Defect baseline/revision, and stale-version rejection through the real SQL. It forces the transaction to roll back after its assertions and verifies zero residue.

Complete UI and completion persistence remain Phase C. No Production migration or Production Engineering Work mutation occurred in Phase B.

## 25. Phase C implementation status

Phase C adds a dedicated Complete conversation and no other terminal transition. Active and In Review records may transition to Completed only through the completion persistence contract. The server requires an explicitly confirmed verified Outcome, Final Disposition, completion rationale, decision basis, expected version, and expected prior state.

The atomic completion statement locks the scoped projection, sets Completed, records the verified Outcome and Final Disposition, clears Current Next Action and Condition from the current projection, increments the version, and inserts the lifecycle event. The event preserves the prior Next Action, prior Outcome, prior Condition and rationale, transition rationale, decision basis, authority, and separate action-actor and decision-actor columns.

The current UI authenticates one human for both roles but constructs and persists action actor and decision actor independently. Engineering Work detail now presents the append-only lifecycle history, including those separate roles and prior/resulting operational values.

Rollback-only Neon Dev validation passed for Active completion, In Review completion, stale-version rejection, stable-field preservation, prior Next Action history, and distinct action/decision identities, with zero residue.

No Production migration, deployment, or Production Engineering Work mutation occurred in Phase C.

## 26. Recommended next lifecycle action

Review the Phase C evidence, then proceed to the separately authorized production migration/deployment and authenticated acceptance sequence only when explicitly approved. Production Engineering Work Schema Alignment remains the reserved real acceptance target.

Engineering Work history must preserve decision truth, not merely changed field names.
