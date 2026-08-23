# BUG-001 — Prompt Library unavailable in Production (`workspace_project_prompts` outside tracked migration authority)

Filed from observation during `PROJECT-UX-003` (authenticated visual system evaluation). Follows
`docs/bugs/bug-report-template.md`.

> **Scope note.** This record is diagnostic only. No application code, schema, migration, or database operation was
> performed while producing it. Remediation requires a separately authorized database package per
> `docs/engineering/TRACKED-MIGRATION-PATH-REPORT.md`.

---

## Summary

`/workspace/prompts` fails to load in Production because `workspace_project_prompts` does not exist in the Production
database, and no tracked migration is capable of creating it.

## Severity

- [ ] **Blocker** — Production down or data loss; no workaround
- [x] **High** — Major feature broken; workaround painful or risky
- [ ] **Medium** — Feature impaired; reasonable workaround exists
- [ ] **Low** — Minor issue, cosmetic, or edge case

Rationale: an entire authenticated surface is unavailable in Production with no in-product workaround, and the governed
remediation path does not currently exist. It is not a Blocker because no data loss occurs and the core operational
surfaces (Workspace, Projects, Engineering Work) are unaffected.

## Environment

- **URL / route:** `https://www.aredirlabs.com/workspace/prompts` (route source `src/app/workspace/prompts/page.tsx`)
- **Browser / version:** Chromium-based desktop browser (observed via user screenshot)
- **OS / device:** Desktop, wide viewport
- **Environment:** **Production**
- **Build / commit (if known):** Not captured at observation time

Dev is **not** affected. `docs/engineering/DEV-DATABASE-SCHEMA-POSTURE.md` records
`workspace_project_prompts` present in Neon Dev with a seeded baseline of 7 prompts.

## Steps to reproduce

1. Sign in to Production at `https://www.aredirlabs.com`.
2. Navigate to **Prompts** in the workspace sidebar (`/workspace/prompts`).
3. Observe the results region.

## Expected behavior

The Prompt Library renders the prompt inventory, or — if genuinely empty — the existing "No prompts yet" empty state.

## Actual behavior

The page header and the full filter row render normally. In place of results, a destructive-tinted alert appears:

> **Could not load prompts**
> Check that the database is reachable and the prompt table has been pushed.

The four filter controls (search, project, type, status) and the `Filter` submit button all render and appear fully
operable, but no query can succeed. The project dropdown offers only "All projects" because
`getWorkspacePromptProjects()` fails in the same `Promise.all` and leaves `projects` empty.

## Screenshots / recordings

Observed via user-provided screenshot of Production `/workspace/prompts` during `PROJECT-UX-003`.

## Console / network errors

```
Not captured at observation time.
The underlying error is caught and discarded before rendering (see Root cause), so the
specific Postgres error is not visible in the UI. A missing relation would surface as
SQLSTATE 42P01: relation "workspace_project_prompts" does not exist
```

## Root cause

**Schema authority is split between tracked migrations and `db:push`, and the prompts table falls on the ungoverned
side.**

Comparing `src/lib/db/schema.ts` against the tracked migration corpus `drizzle/0000_*`–`0006_*`:

| Table | Declared in `schema.ts` | Present in tracked migrations |
| --- | --- | --- |
| `workspace_projects` | Yes | **Yes** |
| `workspace_engineering_work` (+ 6 satellites) | Yes | **Yes** — 7 files |
| `workspace_project_notes` | Yes | **No** |
| `workspace_project_milestones` | Yes | **No** |
| `workspace_project_documents` | Yes | **No** |
| `workspace_project_prompts` | `schema.ts:294` | **No** |

The four project-memory tables were all introduced in June 2026, before tracked migration authority was established:

| Table | Introducing commit | Date |
| --- | --- | --- |
| `workspace_project_notes` | `58e043b` | 2026-06-10 |
| `workspace_project_milestones` | `003c373` | 2026-06-11 |
| `workspace_project_documents` | `8f2654e` | 2026-06-11 |
| `workspace_project_prompts` | `33bd5d9` | 2026-06-11 |

They exist in live databases only because `drizzle-kit push` created them. Production received one
`db:push:prod` apply in 2026-06 (`plan/docs/VERCEL-PRODUCTION-DEPLOYMENT.md`), which accounts for notes, milestones,
and documents rendering correctly in Production today. Prompts did not survive into that state.

**The durable problem is not which table missed which push.** Production policy has since moved to tracked migrations
only: `docs/engineering/ENGINEERING-WORK-LIFECYCLE-UPDATE-001-PRODUCTION-DEPLOYMENT-AND-ACCEPTANCE-PLAN.md` directs
`db:migrate:prod` and states plainly "Do not run `db:push:prod`", and
`docs/engineering/TRACKED-MIGRATION-PATH-REPORT.md` classifies `db:push` as "Unsafe for governed migrations". Because no
tracked migration contains these four tables, **`db:migrate:prod` can never create them.** The governed path cannot
close this gap, and the only command that could is explicitly prohibited. That is the actual defect; the broken Prompts
page is its first visible symptom.

**Recurrence risk.** The same gap applies to `workspace_project_notes`, `workspace_project_milestones`, and
`workspace_project_documents`. Any newly provisioned environment brought up through the governed migration path will
lack all four tables, breaking Documents and Project detail as well — not just Prompts.

### Uncertainty — stated explicitly

Determined from the repository: the four tables are absent from tracked migrations; all four entered `schema.ts` in
June 2026; Dev has the prompts table; Production behavior shows documents, notes, and milestones working while prompts
fails.

**Not** determined: the Production database was not queried, so "the prompts table is absent in Production" is inferred
from the observed failure plus the error path, not verified directly. Whether prompts missed the 2026-06 push by commit
ordering or was lost some other way cannot be established from the repository alone. Confirming this requires a
read-only `information_schema.tables` inspection of Production under a separately authorized package.

## Secondary defects in the failure surface

These are independent of the schema gap and would improve every failure state in the product.

1. **The diagnostic error is captured and then discarded.** `src/app/workspace/prompts/page.tsx:54` assigns
   `error = e instanceof Error ? e.message : "Failed to load prompts"`, but the render path at lines 140–154 ignores
   `error` and shows fixed copy. The code already holds the information needed to distinguish a missing relation
   (SQLSTATE `42P01`, structural) from a connection failure (transient) and throws it away.
2. **Controls remain enabled against an unavailable data source.** The filter form renders unconditionally, so all four
   controls and the submit button appear operable while no query can succeed. Submitting returns the identical screen,
   which invites the operator to conclude their filter was wrong rather than that the surface is broken.
3. **Two causes, no next action.** "Database unreachable" wants a retry; "table has not been pushed" wants a migration.
   The message names both and directs neither, and there is no retry affordance. This is notable because naming exactly
   one next action is the product's strongest pattern elsewhere.
4. **Runbook vocabulary reaches the operating experience.** "Pushed" is `db:push` jargon, and it now names a command
   that Production policy prohibits — so the message advises an action that must not be taken.

## Regression

- [x] Worked in a previous version / deploy
- **Last known good:** Unconfirmed. The surface presumably worked in Production following the 2026-06 push; no
  Production verification record for `/workspace/prompts` was located.

## Additional context

- Evaluation that surfaced this: `docs/discovery/PROJECT-UX-003_AUTHENTICATED_OPERATIONAL_VISUAL_SYSTEM_EVALUATION.md`
  section 3.7 (failure-state assessment) and the "Failure states" row of the section 4 matrix.
- Migration authority: `docs/engineering/TRACKED-MIGRATION-PATH-REPORT.md`, `docs/engineering/AREDIR-DB-002.md`.
- Dev schema evidence: `docs/engineering/DEV-DATABASE-SCHEMA-POSTURE.md`.
- Production apply history: `plan/docs/VERCEL-PRODUCTION-DEPLOYMENT.md`.
- Production policy: `docs/engineering/ENGINEERING-WORK-LIFECYCLE-UPDATE-001-PRODUCTION-DEPLOYMENT-AND-ACCEPTANCE-PLAN.md`.
- Same error copy also exists on the Project detail prompts section:
  `src/components/workspace/project-prompts-section.tsx:45`.

## Suggested remediation shape

Not authorized by this record; stated so the next package has a starting point.

1. **Confirm** the Production table inventory with a read-only `information_schema.tables` query before any change.
2. **Bring the four project-memory tables under tracked migration authority** with an additive, idempotent
   (`CREATE TABLE IF NOT EXISTS`) migration, so it is a safe no-op where the tables already exist and creates them where
   they do not. This closes the recurrence risk, not only the Prompts symptom.
3. **Verify repeatability** by applying twice and confirming a journal-controlled no-op, matching the validation pattern
   in `docs/engineering/ENGINEERING-WORK-DEV-MIGRATION-VALIDATION-R1.md`.
4. **Separately**, address the failure-surface defects above. These are UI changes with no database dependency and can
   proceed independently.

Sequencing note: item 2 restores the feature; item 4 ensures the next such gap reports itself accurately instead of
advising a prohibited command.

---

## For triage use only

| Field | Value |
|-------|--------|
| Triage date | |
| Owner | |
| Target fix | |
| QA verified | [ ] Yes [ ] No |
| Closed | |
