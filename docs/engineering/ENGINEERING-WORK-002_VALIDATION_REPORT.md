# Engineering Work 002 Validation Report

## Executive Classification

**Partially validated**

Runtime posture update (2026-08-04): a confirmed Dev target, singular seeded record, zero references, allow-listed account, successful production build, built local public-route checks, and unauthenticated Workspace/Work redirects have now been observed. The authenticated journey remains deferred solely because no approved credential was available. See `AREDIR-RUNTIME-001.md`.

Static implementation and dependency validation pass. Operational acceptance cannot be established because the required database and authenticated runtime checks were blocked before execution by the absence of a classifiable non-production `DATABASE_URL`.

## Environment

| Item | Result |
| --- | --- |
| Operating system | Windows 10.0.26200, x64 |
| Node / npm | v22.19.0 / 11.7.0 |
| Database classification | Confirmed Neon Dev posture; read-only runtime prerequisite checks passed |
| Application environment | Production build and isolated `next start` runtime passed; `next dev` retains known local `spawn EPERM` limitation |
| Browser | No browser runtime review performed |
| Google Fonts network status | Unavailable; build cannot reach `fonts.googleapis.com` |

No secrets or private configuration values were inspected or exposed.

## Dependency baseline

The repaired v3 lockfile from INFRA-002 was used (SHA-256 `00ecdefce071fa2db095a27b70f5a8e87828588494cae6097ebc465ed8ec9729`). INFRA-002 previously confirmed a clean scripts-disabled installation, unchanged lockfile hash, and idempotent lockfile graph. This validation re-ran TypeScript, lint, script syntax, and whitespace checks successfully.

The lockfile continues to contain `keyv@4.5.4` only; it contains no Keyv/Cacheable incident-listed version.

## Database, migration, and seed

**Not executed.** The target could not be shown to be local, development, preview, or otherwise non-production. The package safety gate prohibits migration or seed in that condition.

Static evidence only:

- `scripts/migrate-engineering-work-002.mjs` uses duplicate-object protection for enum creation and `CREATE TABLE IF NOT EXISTS` for both new tables.
- `workspace_engineering_work.project_id` is non-null and cascades on Project deletion.
- `workspace_engineering_work_repository_references.engineering_work_id` is non-null and cascades on Work deletion.
- Required fields, nullable outcome/priority/condition fields, timestamps, and default state are represented in both schema and migration.
- No additional index or uniqueness constraint beyond primary keys and the existing Project relationship is implemented or documented for these tables.
- The seed declares exactly one Hydration OSR record with stable ID `eng_work_alignfit_hydration_operational_state`, `proj_01`, Architecture type/workflow, Proposed state, expected summary and next action, and null outcome/priority/condition fields. Its upsert target is the stable Work ID.

Actual table inventory, data preservation, seeded count, field values, repeat behavior, and repository-reference count remain unverified.

## Queries

Static query review supports scope isolation:

- `getProjectEngineeringWork(projectId)` selects only by project ID.
- `getProjectEngineeringWorkById(projectSlug, engineeringWorkId)` joins Project and Work and requires both slug and ID; it returns `null` for mismatched, unknown, or identifier-only access attempts.
- References are requested only after that project-scoped Work query returns a result.
- No repository body retrieval, filesystem scan, or Git operation appears in these paths.

Database-backed results, cross-project behavior, and empty collections are not runtime-verified.

## Runtime

**Not executed.** The authenticated sign-in → Workspace → AlignFit → Engineering Work path, unauthenticated redirects, list/detail routes, not-found cases, empty states, console, and server logs require the unavailable safe database/application environment.

Static route evidence: `src/proxy.ts` redirects `/workspace` requests with no recognized Better Auth session-cookie name to `/sign-in`; every Engineering Work route is under that prefix. This is a cookie-presence check. The Workspace layout has no server-side session verification for read routes, which is a known authorization limitation rather than evidence of per-user or per-project authorization.

## Responsive and accessibility

Static review finds responsive primitives (`flex-wrap`, responsive two-column grids, `min-w-0`) and keyboard-focus styling on the new Work links. Empty-state content is textual and understandable; links use the Work title or project name.

Resolved by AREDIR-ENGINEERING-WORK-004: the list and detail now use visible `Type`, `Workflow`, and `Lifecycle state` definition terms with their existing badge values. Browser viewport, keyboard traversal, focus visibility, contrast, and screen-reader behavior remain unverified.

## Regression

No browser or database regression testing was run because a mutation-safe target was unavailable. Static inspection confirms the implementation does not add global Engineering Work navigation or write controls and leaves Workspace data models independent. Existing Workspace and public-site runtime behavior remains unverified.

## Static validation

| Check | Result |
| --- | --- |
| Full TypeScript check | Passed |
| Full lint | Passed |
| Migration/script syntax | Passed for all `scripts/**/*.mjs` |
| `git diff --check` | Passed |
| Production build | Environment-limited: only Google Fonts fetches failed |

The build output named only Geist, Inter, and JetBrains Mono requests from `src/app/layout.tsx`; no separate application build error was emitted.

## Contract conformance

Conforms by static inspection: dedicated Work entity; one required Project relation; separate user-facing type, workflow, state, and condition fields; allowed lifecycle enum values; metadata-only repository references; no ownership/creator fields; no generic artifact base; independent milestones, notes, documents, prompts, and Knowledge Assets; no repository synchronization.

Deviation requiring remediation: the UI does not make Type and Workflow visibly or programmatically distinct when their labels match. This weakens, but does not change, the underlying domain model.

## Remaining limitations

- **Environment limitation:** no classifiable non-production database or runnable authenticated app.
- **Environment limitation:** Google Fonts are unreachable during production build.
- **Authorization limitation:** read-route protection is proxy cookie presence; no observed server-side session verification in the Workspace layout and no roles/memberships/per-project authorization.
- **Product limitation:** all planned Engineering Work write, lifecycle, relationship, and repository-administration capabilities remain intentionally deferred.
- **Validation limitation:** dynamic review of the remediated metadata presentation remains unexecuted.

## Decision

**Remediation before capability expansion.** Establish a safe runtime target and resolve the badge-label ambiguity before authorizing the next Engineering Work capability.
