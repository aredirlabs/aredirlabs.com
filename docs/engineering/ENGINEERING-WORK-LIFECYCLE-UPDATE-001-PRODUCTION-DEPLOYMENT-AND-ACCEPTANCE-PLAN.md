# ENGINEERING-WORK-LIFECYCLE-UPDATE-001 — Production Deployment and Acceptance Plan

## Status

**Prepared; not authorized for Production execution.**

This document defines the bounded production migration, application deployment, and authenticated acceptance sequence. Preparing and reviewing this plan does not authorize any Production write, Vercel deployment, database migration, seed, or Engineering Work mutation.

## Fixed boundaries

Included:

- tracked migrations 0003 and 0004;
- the Phase A–C application diff;
- read-only Production preflight and post-operation verification;
- one authenticated Complete operation against the named acceptance record.

Excluded:

- database push or Production seed;
- Close, Cancel, Supersede, or reopening;
- Repository Evidence Authoring;
- AlignFit remediation intake;
- autonomous AI behavior;
- Workspace resilience or create-error handling;
- direct SQL mutation of the acceptance record;
- fabricated history for any existing record.

## Read-only identity and baseline — 2026-08-20

| Environment | Endpoint | Neon project | Branch | Database | Applied migrations |
| --- | --- | --- | --- | --- | --- |
| Development | ep-green-sunset-a6w06qwf | plain-band-91202732 | br-wandering-snow-a60tz3pl | neondb | 5 |
| Production | ep-nameless-dawn-a61gilim | plain-band-91202732 | br-crimson-shape-a6q4y35g | neondb | 3 |

Development and Production are separate Neon branches and endpoints in the same Neon project. Branch identity—not project ID alone—is therefore mandatory at every Production gate.

Production currently has:

- 2 Engineering Work records;
- 0 Defect Context records;
- 0 null Current Next Actions;
- no lifecycle-history or Defect-revision tables;
- no lifecycle history;
- tracked migrations 0000–0002 applied;
- exactly 0003 and 0004 pending by local migration hash.

## Environment mapping limits

The local Development URL positively maps to the Development endpoint and branch above. The ignored local Production URL positively maps to the Production endpoint and branch above.

No local .vercel project metadata, Vercel CLI, Vercel token, organization ID, or project ID is available. The public site responds from Vercel, but its X-Vercel-Id is a request identifier rather than a rollback deployment ID. Vercel's encrypted DATABASE_URL values are write-only in the available control surface and must not be replaced merely to disclose them.

- **Production mapping:** DATABASE_URL is not directly inspected. Runtime identity may instead be proven by correlated read-only evidence: a fresh SELECT-only audit of the intended Neon branch must match the authenticated Production runtime's exact UUID-scoped acceptance record, record timestamps, project metadata/timestamps, and pre-acceptance empty-history state. The audit also records row counts, migration state, relations, Neon identity, server timestamp/LSN, and a SHA-256 fingerprint of the non-secret correlation tuple. This is **runtime identity proven by correlated read-only evidence**, not **DATABASE_URL secret directly inspected**.
- **Preview mapping:** unverified — mutation prohibited. Preview is excluded from migration, deployment verification, and authenticated acceptance. Its unknown mapping is not a Production-write blocker while no Preview runtime or mutation is used in the approved sequence.
- no existing runtime endpoint exposes a Neon endpoint/branch fingerprint. The authenticated record and project views are the available runtime-accessible database fingerprint; X-Vercel-Id identifies a request, not the database;
- the manually verified current healthy Vercel Production rollback anchor is deployment `FCEqBKdp7`, URL `aredirlabs-7s6o6rv52-andrews-projects-150264eb.vercel.app`, Git SHA `f4778fb`, source branch `main`, environment `Production`, status `Ready / Current`, and primary domain `www.aredirlabs.com`.

Before the first Production write, an authenticated human must record the correlated Production evidence. The Vercel rollback-deployment gate is satisfied by the anchor above. A mismatch or insufficiently exact runtime tuple remains a hard blocker. Direct secret inspection is neither required nor permitted by this plan. Preview remains unverified and mutation-prohibited, but does not block Production while it stays outside the sequence.

## Neon recovery mechanism

For this deployment, the recovery gate is satisfied by the following immutable, manually verified Neon Production snapshot:

| Field | Recovery anchor |
| --- | --- |
| Neon project | plain-band-91202732 |
| Production branch | aredirlabs-prod / br-crimson-shape-a6q4y35g |
| Snapshot | aredirlabs-prod at 2026-08-20 18:20:14 UTC (manual) |
| Snapshot creation time | 2026-08-20 18:20:14 UTC |
| Snapshot expiration | never |
| Timing | Created before Production migration |
| Restore status | No restore performed |

This snapshot supersedes the previously planned protected recovery-child-branch requirement for this deployment. No Neon API credential or recovery branch is required.

The snapshot is a recovery anchor, not authority to restore Production. If recovery becomes necessary, stop and obtain separate incident authorization before any restore. Prefer inspection through a separate branch restored from the snapshot when Neon makes that option available. Never restore or replace the Production branch merely because migration or deployment validation fails. See the official [snapshot](https://api-docs.neon.tech/reference/createsnapshot) and [restore](https://api-docs.neon.tech/reference/restoreprojectbranch) contracts.

## Frozen acceptance target

| Field | Required pre-acceptance value |
| --- | --- |
| ID | eng_work_23e97a29-0b92-47f1-9b93-04c6f07d6df9 |
| Project | AredirLabs.com / aredirlabs-com |
| Title | Production Engineering Work Schema Alignment |
| Type / Workflow / State | Maintenance / Maintenance / Active |
| Objective | Align the configured production/runtime database with the repository-defined Engineering Work schema by applying the existing tracked migrations without altering existing project data. |
| Current Next Action | Validate production target identity, authorize guarded migration execution, apply tracked Engineering Work migrations, and verify Workspace/Project/Create recovery. |
| Outcome / Condition / Condition Rationale | null / null / null |
| History | none |

After migration and before acceptance, the same record must additionally have version 1 and null Final Disposition. Any difference is a stop condition.

## Deployable diff

The bounded candidate consists of:

- schema and tracked migrations: drizzle/0003, drizzle/0004, the Drizzle journal, and src/lib/db/schema.ts;
- atomic lifecycle persistence, provenance construction, and tests under src/lib/workspace;
- the dedicated Engineering Work actions module;
- Proposed correction, Operate, transition, and Complete forms/routes;
- lifecycle-history read presentation and project-scoped history query;
- removal of the generic Engineering Work update action/form and standalone Defect mutation helpers;
- seed preservation through the atomic creation/history writer;
- rollback-only Dev validators and read-only Production audit/acceptance verifiers;
- package scripts and package documentation.

There are no dependency-version changes and no AlignFit repository changes.

The frozen Phase A–C application baseline is commit 1bf4e58434f8c3293d656c5f2e46742dca848aec. This non-secret mapping-gate revision must be committed directly on top of that baseline; the resulting full commit SHA is the final Production candidate. Production execution must reference that exact reviewed commit containing both the application diff and the final production-readiness controls. Never deploy the working tree directly.

## Compatibility

Migrations 0003 and 0004 are additive except for dropping the NOT NULL constraint from Current Next Action:

- version is added with default 1, preserving both existing rows;
- Final Disposition is nullable;
- Current Next Action retains both existing nonnull values while becoming terminal-compatible;
- history and Defect-revision tables are new and empty;
- no migration INSERT, UPDATE, DELETE, TRUNCATE, or synthetic-history operation exists;
- append-only triggers affect only the new history tables;
- 0004 adds same-work integrity constraints to empty new tables.

The existing Production application remains compatible after these migrations. The new application is not compatible before them because it selects version/history fields. Therefore the required order is database migration first, application deployment second.

## Authorization gate

Before the first Production write, the authenticated human authority must explicitly authorize:

1. the exact reviewed commit SHA;
2. migrations 0003 and 0004 against the exact Production endpoint and branch above;
3. deployment of that same SHA to Vercel Production;
4. the later authenticated Complete operation using the exact acceptance values below.

Authorization must not be inferred from Phase A, B, or C acceptance or from this plan.

## Pre-authorization preparation

1. Confirm the exact immutable candidate commit SHA and review its complete diff.
2. Record the candidate SHA in the authorization manifest and Vercel deployment operation.
3. Run:

   - npm.cmd test
   - npm.cmd run lint
   - npm.cmd run build
   - npm.cmd run test:db:lifecycle
   - npm.cmd run test:db:lifecycle:phase-b
   - npm.cmd run test:db:lifecycle:phase-c

4. Do not use Vercel Preview for database QA, migration, deployment verification, or acceptance. Record Preview as `unverified — mutation prohibited` unless independent read-only evidence later establishes its branch.
5. Without inspecting or replacing DATABASE_URL, establish the current Vercel Production runtime mapping by correlation:

   - run the SELECT-only readiness audit against endpoint ep-nameless-dawn-a61gilim / branch br-crimson-shape-a6q4y35g;
   - in the authenticated current Production deployment, open project `aredirlabs-com` and Engineering Work `eng_work_23e97a29-0b92-47f1-9b93-04c6f07d6df9`;
   - compare the exact ID, title, Objective, type/workflow/state, Current Next Action, null Outcome/Condition, record created/updated timestamps, and project status/stage/focus/next-step/target-date/created/updated timestamps;
   - confirm from the SELECT-only audit that the target and total lifecycle-history counts are zero; after the new application is deployed, also confirm the authenticated runtime renders the empty history state;
   - record the audit's project/work/Defect/history row counts, applied migration state, server time/LSN, and runtime-correlation fingerprint beside the authenticated observation;
   - classify the result as `runtime identity proven by correlated read-only evidence; DATABASE_URL secret not directly inspected`.

   Any mismatch, missing target, unexpected history, or inability to compare the exact timestamps is a stop condition.
6. Record the previous healthy Vercel Production deployment ID.
7. Confirm the immutable manual Neon snapshot recorded in this plan remains available; do not restore it during preparation.
8. Freeze all Production Engineering Work mutations from the final audit until acceptance verification completes.
9. Run the SELECT-only readiness audit:

   node scripts/audit-engineering-work-lifecycle-production-readiness.mjs

Every assertion must pass immediately before authorization.

## Production sequence

### 1. Apply tracked migrations

After explicit authorization, from the exact reviewed commit:

```powershell
$env:CONFIRM_PROD_DB = "true"
npm.cmd run db:migrate:prod
Remove-Item Env:CONFIRM_PROD_DB
```

Do not run db:push:prod. Do not run db:seed:prod.

### 2. Verify schema before deployment

Run the readiness audit again. It must report:

- the exact Production identity above;
- 5 applied migration hashes and no pending migration;
- lifecycle history and Defect-revision tables present together;
- nullable Current Next Action, nullable Final Disposition, and version default 1;
- 2 existing Engineering Work rows preserved;
- target still Active at version 1 with unchanged Objective and Next Action;
- zero target history and zero total history.

### 3. Deploy the application

Merge or promote only the reviewed commit SHA to Vercel Production. Confirm:

- Vercel reports that exact SHA;
- build succeeds;
- public routes and authentication smoke checks pass;
- Workspace, Project, Engineering Work detail, history empty state, and Complete route load;
- runtime logs show no new schema, query, or authentication errors.

No Engineering Work form may be submitted during this smoke stage.

### 4. Final acceptance preflight

Run the readiness audit a third time. Stop unless the target is still Active, version 1, and has no history. Sign in as the authenticated human product authority and open the target’s dedicated Complete conversation. Do not use Operate, generic editing, direct SQL, seed, or an API client.

### 5. Authenticated Complete operation

Submit exactly once with:

- Verified Outcome: Production/runtime Engineering Work schema aligned successfully using tracked migrations 0000–0002. Schema, migration ledger, existing-data integrity, Workspace, Project Engineering Work, and canonical Engineering Work creation were verified operational.
- Outcome verified: checked only after the listed production verification is complete.
- Final disposition: No further schema-alignment work is required. Engineering Work Repository Evidence Authoring remains separate follow-on work.
- Completion rationale: Outcome and runtime verification satisfy the intended schema-alignment objective.
- Decision basis: Authenticated production verification confirmed the tracked migration ledger, lifecycle schema, existing-data preservation, Workspace and Project Engineering Work routes, and this record's unchanged Objective and prior Active Next Action.

The application must persist the authenticated human separately as action actor and decision actor, even though both identifiers are equal in this UI.

### 6. Verify acceptance

Do not resubmit. Run:

   node scripts/verify-engineering-work-lifecycle-production-acceptance.mjs

It must prove:

- the target is Completed at version 2;
- Objective, Title, Type, Workflow, and Project are unchanged;
- Current Next Action and Condition fields are null;
- Outcome and Final Disposition exactly match the approved values;
- exactly one target event and exactly one total lifecycle event exist;
- the event is Active → Completed with action type complete;
- the prior Active Next Action is preserved;
- no earlier history was fabricated;
- rationale and decision basis match;
- action actor and decision actor are both human, stored separately, and have the same authenticated identifier;
- decision role is authorization and authority is human_owner.

## Stop conditions

Stop before the first Production write if any of these is true:

- explicit authorization does not name the exact commit, endpoint, branch, and migrations;
- the candidate working tree is dirty, the PR is unapproved, or Vercel would deploy a different SHA;
- any test, build, Dev validator, or readiness assertion fails;
- Production runtime identity cannot be established by the required correlated read-only evidence, or the evidence points to a different database;
- Preview is used anywhere in the operation sequence while its mapping remains unverified;
- the Production endpoint, project, branch, database, or migration hashes differ;
- pending migrations are not exactly 0003 and 0004 in order;
- the target is missing, changed, not Active, or has any history;
- any Production Engineering Work changed during the freeze;
- a recovery point or previous Vercel deployment ID is not recorded;
- the authenticated human authority is unavailable.

Stop after migration and do not deploy if:

- migration execution reports any error or ambiguity;
- the ledger is not exactly five recognized hashes;
- only one lifecycle migration appears applied;
- row counts or target values change;
- history is nonempty;
- required tables, columns, constraints, or append-only triggers are absent.

Stop after deployment and do not accept if:

- the deployed SHA or Production database mapping differs;
- authentication, Workspace, Project, detail, history, or Complete routes fail;
- logs show new errors;
- the target changes or gains history;
- the Complete form does not show the expected prior state/action or explicit actor-role explanation.

Stop during acceptance if:

- the browser reports stale state;
- submission times out or returns an ambiguous result;
- any displayed target value differs;
- verification of the Outcome is incomplete.

For an ambiguous submission, never resubmit first. Query the projection and history read-only. If the event exists, treat the operation as committed. If no event exists and the record remains Active/version 1, require a fresh human decision before a retry.

## Rollback and recovery

- Before migration: take no action; no rollback is needed.
- Migration failure: stop, keep the old application, and inspect the ledger/schema read-only. Do not deploy, seed, push, manually edit the ledger, or blindly rerun. The additive schema may safely remain while remediation is authorized.
- Migration succeeds but pre-deploy verification fails: keep the old application and additive schema; do not deploy. Prefer diagnosis and forward repair. Use the recorded Neon recovery point only under separate destructive-recovery authority.
- Application failure before acceptance: use Vercel instant rollback to the recorded deployment. Retain migrations 0003 and 0004; do not down-migrate.
- Ambiguous or failed acceptance: do not edit the projection or history directly. Inspect first and preserve any committed event.
- Application failure after successful acceptance: Vercel may roll back, but freeze all Engineering Work mutations because the old UI contains the retired generic bypass. Retain the completed projection and append-only event, then forward-fix and redeploy.
- Never restore or down-migrate after a truthful acceptance event merely to undo the business decision. Database restoration after acceptance requires separate incident authority because it would erase accepted history.

## Preview isolation decision

Unknown Preview database mapping is not a Production-write blocker because Preview is excluded entirely from the authorized operation path. No Preview deployment promotion, authenticated workspace visit, database QA, mutation, migration, or acceptance action may occur. If that boundary changes, Preview mapping becomes a new authorization gate and must first be established independently.

## Decision

Production execution is not authorized. The recovery gate and Vercel rollback-deployment gate are satisfied. The remaining gates are an exact immutable candidate SHA containing the final controls, correlated read-only Production runtime identity evidence, exact-SHA migration/deployment authorization, and the final SELECT-only audit. Preview evidence is not required while Preview remains excluded and mutation-prohibited.
