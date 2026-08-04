# AREDIR-ENGINEERING-WORK-002 — Read-Only Engineering Work Vertical Slice

## Outcome

This package adds the smallest authenticated, project-scoped Engineering Work experience beneath an existing Project. An authenticated user can open AlignFit, see the seeded **Hydration Operational State Representation** record, and open its read-only detail view. The experience distinguishes familiar type, internal workflow, lifecycle state, next action, optional condition, and read-only repository-reference metadata.

## Implemented boundary

- Dedicated `workspace_engineering_work` persistence, related to `workspace_projects`.
- Dedicated `workspace_engineering_work_repository_references` persistence, related to Engineering Work.
- One idempotently seeded AlignFit record: `eng_work_alignfit_hydration_operational_state`.
- Project-scoped list and detail queries. Detail lookup requires both Project slug and Work identifier.
- Project-detail Engineering Work section and a read-only detail route.
- Empty states for no project Work and no repository references; a specific not-found route for a missing Work item.

No creation, editing, deletion, lifecycle transition, assignment, relationship, global hub, repository ingestion, synchronization, or source-content copying is included.

## Schema and migration approach

The repository’s existing database workflow does not use a checked-in Drizzle migration journal. It runs idempotent prerequisite scripts before `drizzle-kit push` (`migrate-workspace-006.mjs`). This package extends that established, non-destructive pattern:

1. `scripts/migrate-engineering-work-002.mjs` creates the required enum types and tables only when absent.
2. `scripts/migrations/AREDIR-ENGINEERING-WORK-002.sql` is the tracked SQL record of that change for review.
3. `npm run db:push` and `npm run db:push:prod` run the new script before `drizzle-kit push`.

The migration neither alters nor removes existing tables/data. On a fresh database it safely defers to the following Drizzle schema push, which creates the whole schema in dependency order. It has not been applied by this package because no local database environment was supplied.

## Route structure

```text
/workspace/projects/[slug]
  └─ /workspace/projects/[slug]/engineering-work/[workId]
```

The project detail section is the first-slice navigation; no global Engineering Work route was added.

## Repository-reference behavior

Hydration OSR has no seeded reference because no Hydration-specific repository path or artifact identifier was verified locally. The empty state makes that absence explicit. Future references are metadata only; URLs are linked only for valid `http` or `https` source locations, so local paths never become public links.

## Known limitation

The existing `/workspace` proxy still checks for session-cookie presence rather than providing a full role/membership authorization model. This package adds no mutation surface and does not change that known boundary.

## Deferred capabilities

Ownership/attribution, CRUD, lifecycle actions, work relationships, milestones/notes/documents/prompts/knowledge links, verification/decision/release entities, repository administration, synchronization, and a global work overview remain deliberately deferred.
