# WORKSPACE-OPERATIONAL-003 — Operational Workspace Entry Experience

## Status

Implementation complete. Static, contract, type, lint, and production-build verification passed. Authenticated runtime observation is blocked by the documented Neon connectivity failure.

## Objective and authority

This package implements the smallest authenticated Workspace experience needed to answer “What should we accomplish now?” truthfully. It operationalizes [WORKSPACE-OPERATIONAL-002](../discovery/WORKSPACE-OPERATIONAL-002_WORKSPACE_CONTINUATION_CONTRACT.md) within the responsibility architecture established by [OPERATIONAL-EXPERIENCE-001](../discovery/OPERATIONAL-EXPERIENCE-001_OPERATIONAL_ENGINEERING_ENVIRONMENT_ARCHITECTURE.md).

Workspace remains a server-derived projection. This package introduces no schema, migration, continuation record, assignment, actor ownership, score, activity record, or interaction history.

## 1. Before-state

The existing Workspace already provided a useful broad sequence: orientation, one continuation area, one attention area, active Project context, and direct routes. It used the authenticated shell, established tokens, responsive padding, semantic sections, and visible focus treatments. Those behaviors were preserved.

The previous read contract conflicted with the validated continuation contract in these ways:

- it selected one row, even when several equally valid records existed;
- it included `proposed` Work in the continuation query;
- it ranked Active before In Review without authority for that preference;
- it used `updatedAt` to select a visible winner and described another timestamp projection as “Recently active”;
- it considered blocked milestones only, and selected them with Project-local `sortOrder` across Projects;
- it promoted the first active Project into the Continue surface when no Work qualified; and
- it did not include workflow/lifecycle position, a factual qualification reason, or Defect investigation context.

The removed `WorkspaceOperatingSnapshot` component was not rendered by this page and was left unchanged. No unrelated Workspace or Project component was redesigned.

## 2. Implemented continuation projection

`getDailyOperatingExperience()` now returns a bounded server-side projection with three modes:

1. `single` — one eligible record is presented as the dominant continuation;
2. `ambiguous` — several eligible records are presented as an explicitly non-prioritized set; and
3. `none` — the page states that no clearly justified continuation exists.

Each candidate includes Project identity and operating status, Engineering Work identity, workflow and lifecycle position, purpose, parent next action, factual qualification reason, existing detail destination, and supporting Defect context when applicable.

## 3. Eligibility behavior

The runtime SQL filters before projection. A candidate must have:

- an `active` or `testing` Project;
- `active` or `in_review` Engineering Work state;
- nonblank title, summary, current next action, and Project slug;
- no nonblank condition; and
- for Defect workflow, a present child row with all seven required fields nonblank.

Proposed, terminal, conditioned, incomplete Defect, inactive-Project, and incomplete legacy records cannot become continuation. Unsupported workflows may qualify through the canonical parent contract and existing generic detail route.

## 4. Ambiguity behavior

The display bound is three candidates. When the SQL window count is greater than one, the page renders all returned candidates at equal visual weight, explains that current engineering state cannot choose on the engineer’s behalf, and reports the number of additional valid candidates when the bound is exceeded.

The database orders already-eligible peers by `workspace_engineering_work.updated_at DESC`, then ID ascending. This ordering stabilizes the bounded presentation only; the first result is not labeled or styled as a winner.

## 5. Attention behavior

Attention is generated independently from continuation and bounded to three displayed items. Supported sources are:

- Active/In Review Engineering Work with a nonblank recorded condition;
- Active/In Review Defect Work with missing or incomplete required Defect Context; and
- blocked milestones in operating Projects.

Work Attention links directly to Engineering Work. Milestone Attention links to its Project because no milestone detail route exists. Recorded conditions and rationale are presented without interpreting urgency. The projection reports additional supported conditions when its total exceeds the display bound.

## 6. Absence behavior

With zero eligible candidates, Workspace says: “There is no clearly justified continuation right now.” Proposed and terminal Work are not promoted. The page offers only bounded orientation through the Projects collection and, when present, the first alphabetically ordered operating Project.

## 7. Query and data-flow architecture

```text
PostgreSQL authoritative Project / Engineering Work / Defect / milestone rows
  → SQL eligibility and exclusion predicates
  → window count + bounded continuation LIMIT 3
  → separately bounded supported-attention queries
  → bounded operating-Project orientation LIMIT 3
  → server view model
  → async Workspace Server Component
  → rendered links and text; no client ranking or inventory payload
```

Continuation and each attention category are queried concurrently. Continuation uses a left join to Defect Context only to enforce completeness and select its two supporting fields. Window counts preserve the total without transferring every qualifying row. Project orientation is ordered by stable identity rather than modification recency. No schema or index was added; future indexes require measured query-plan evidence.

## 8. Visual hierarchy

The existing operational hierarchy was refined rather than replaced:

```text
Workspace question
  → single continuation / bounded ambiguity / honest absence
  → Attention
  → active Project orientation
```

The single continuation uses one leading actionable surface. Ambiguity uses a divided list rather than a primary card with demoted alternatives. Attention and Project orientation are quieter bordered lists. KPI cards, decorative statistics, equal-weight section grids, and a “recent activity” claim were not introduced.

## 9. Defect handling

For a complete Defect candidate, canonical `currentNextAction` remains the visually primary Next action. `nextInvestigation` appears under Investigation context, and `validationTarget` appears as supporting context. The destination remains the existing Project-scoped Engineering Work/Defect detail route. Missing or incomplete Defect Context excludes the Work from continuation and produces an explicit data-integrity Attention item.

## 10. `updatedAt` limitation

`updatedAt` is not displayed or described as meaningful activity. It is used only after eligibility as the first deterministic ordering key for peers in the bounded ambiguous set and for the bounded presentation of conditioned/incomplete Work Attention. A newer Proposed write cannot outrank or replace eligible Active/In Review Work.

## 11. Responsive behavior

Static implementation review confirms that priority survives supported widths:

- mobile begins with the continuation mode before Attention or Project orientation;
- the single continuation uses responsive padding and wrapping metadata;
- ambiguous candidates stack their action affordance below content on narrow screens and align it beside content from `sm` upward;
- no multi-column candidate grid turns into a long dashboard; and
- the authenticated shell’s existing mobile/desktop behavior remains unchanged.

Authenticated viewport screenshots could not be produced because the configured database was unreachable.

## 12. Accessibility

The page preserves one `h1`, section `h2` labels, and candidate `h3` headings. All destinations are semantic links with descriptive text and visible `focus-visible` rings. The unavailable state uses `role="alert"`. Decorative icons are hidden from assistive technology. Lifecycle, workflow, conditions, and Attention meaning are expressed in text rather than color alone.

## 13. Automated and static test evidence

Verified on 2026-08-07:

| Check | Result |
| --- | --- |
| `npm test` | Passed: 9 tests covering Active, In Review, exclusions, singular mode, ambiguity/bound, blocked Attention, absence, Defect context, Project context, `updatedAt` conflict, and a 500-record scale fixture |
| `npx tsc --noEmit` | Passed |
| `npm run lint` | Passed |
| `npm run build` | Passed with Next.js 16.2.7; `/workspace` compiled as a dynamic server-rendered route |

The first sandboxed test attempt failed because `tsx` could not spawn its local esbuild helper (`EPERM`). The identical suite passed outside the sandbox. This was an execution-environment restriction, not a test failure.

## 14. Runtime evidence

The production build detected `.env.local` and completed without configuration changes. A read-only Neon query was then attempted with the existing `DATABASE_URL` and the Neon client’s `readOnly` option. It requested only current database identity and presence of the Engineering Work/Defect tables. It failed with `Error connecting to database: TypeError: fetch failed` both inside and outside the filesystem sandbox.

Because the database could not be reached, authenticated Workspace runtime rendering, direct-destination navigation, viewport screenshots, and database-backed query-plan/scale timing were not claimed.

## 15. Environment limitations

The failure matches the prior package’s infrastructure constraint. No credential was printed or changed. No fallback target was selected. No Production or shared data was read or mutated. No migration, push, seed, upsert, or environment remediation was run.

## 16. Deferred work

This package does not implement Project operational-state redesign, a dedicated Engineering Work collection, Defect Investigation Operational Workspace, reusable editor, investigation history, actor-specific continuation, assignment, ownership, pinned focus, meaningful-activity events, scoring, AI recommendations, notifications, shell redesign, or new persistence.

Database query-plan measurement and authenticated visual/E2E observation remain pending until the documented development database is reachable.

## 17. Recommended next package

Proceed with **PROJECT-OPERATIONAL-004 — Project Operational State Experience** once authenticated Workspace runtime observation is available. The implementation did not reveal a need to build scalable Collection architecture first: the Workspace projection remains bounded at the query and rendering boundaries without a collection redesign.

## Completion assessment

All implementation criteria that can be established statically are satisfied. Runtime completion is accurately limited by external database connectivity; it is not represented as passed.
