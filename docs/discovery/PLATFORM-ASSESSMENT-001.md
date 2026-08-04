# PLATFORM-ASSESSMENT-001 — Existing Platform Assessment

**Assessment date:** 2026-08-04
**Scope:** read-only inventory of the existing Aredir Labs authenticated application and its repository authority boundary.
**Method:** source, schema, route, seed, package, and documentation inspection. No application code, schema, or existing documentation was altered.

## Executive baseline

The application is a Next.js 16 internal Workspace layered onto a public Aredir Labs site. It uses Better Auth with email/password authentication, Neon Postgres through Drizzle, and a responsive Tailwind/shadcn foundation.

The Workspace is already an operational project-memory product, not an empty shell. It provides a project registry, operating snapshot, project-scoped milestones, notes, documents, prompt records, searchable cross-project document and prompt views, and a read-only Knowledge Asset Registry. Project artifact creation is implemented. Editing, deletion, project creation, user/profile management, roles, and repository synchronization are not implemented.

The repository is also the current authority for a substantial Engineering Operating System, framework, governance, architecture, mission, review, discovery, and promotion corpus. The source material explicitly establishes repository-first authority and describes a future Engineering Operations capability as an index/projection layer rather than a replacement for repository artifacts.

## Direct answers

| Question | Current-state answer |
| --- | --- |
| What already exists? | An authenticated Workspace with persisted project-memory records; a static knowledge registry; public marketing/content pages; and 119 Markdown documents across `docs/` and `plan/docs/`. |
| What should be preserved? | Better Auth + Drizzle/Neon integration, the Workspace shell and responsive navigation, project-scoped artifact relations, search/filter query patterns, shared UI primitives, repository-first documentation authority, and the promoted Knowledge Base. |
| What is reusable? | Authentication client/server helpers, proxy guard, Workspace navigation, status/category badges, project-detail sections/forms, query helpers, schema relationships, and knowledge registry view components. |
| What is prototype? | Workspace settings, global workspace access control, document/prompt/project operational views, and the static Knowledge Asset Registry. Their scope is useful but intentionally lightweight. |
| What is missing? | Verified server-side page authorization, role/tenant/project membership, user attribution/ownership for artifacts, editable lifecycle operations, durable knowledge registry storage, migrations in version control, and any repository synchronization/indexing mechanism. |
| Where does Engineering Work naturally fit? | Alongside the existing Workspace’s project-memory surfaces, but with repository artifacts remaining authoritative and the Workspace limited to projections/indexes/references. |
| Smallest viable first vertical slice? | A read-only, repository-referenced projection of one already-governed engineering artifact class (for example an existing Mission or implementation/discovery package) in the authenticated Workspace. This conclusion records fit only; it is not an implementation plan. |

## Current architecture

```text
Browser
  ├─ public site: Next.js routes and shared SiteHeader
  └─ /workspace: proxy checks Better Auth session cookie
       ├─ Better Auth route handler and email/password session API
       ├─ server-rendered Workspace routes and authenticated server actions
       ├─ Drizzle ORM
       └─ Neon Postgres: auth tables + project-memory tables

Repository Markdown / TypeScript knowledge registry
  └─ read-only Knowledge Asset Registry presentation (not database-backed)
```

## Findings and constraints

- The Workspace is authenticated at its route boundary, but only server actions independently validate a session. Most Workspace read routes query all workspace data without calling `auth.api.getSession`; the edge proxy only establishes that a recognized cookie has a value, not that the token is valid or belongs to a permitted role.
- Access is allow-listed only at sign-up through `WORKSPACE_ALLOWED_EMAILS`; existing accounts are not rechecked against that list during sign-in or subsequent access.
- All authenticated users have the same effective access. No roles, permissions, organization, membership, project ownership, or user attribution columns exist for Workspace domain data.
- The database schema is centralized in `src/lib/db/schema.ts`; Drizzle commands exist, but no checked-in migration directory or SQL migration file was found. Environment/database state therefore cannot be reconstructed from repository migration history alone.
- The seed script is an idempotent development/bootstrap data source. It carries illustrative records for Aredir Labs, AlignFit, ClassForge, and LeagueOS; it is not a synchronization system.
- The documentation corpus already contains the concepts that an Engineering Operating Environment would surface. It is not currently ingested, indexed, or linked to Workspace projects except for static knowledge registry metadata and manually seeded project documents/prompts.

## Delivered companion inventories

- [Authentication inventory](AUTHENTICATION-INVENTORY.md)
- [UI foundation inventory](UI-FOUNDATION-INVENTORY.md)
- [Data model inventory](DATA-MODEL-INVENTORY.md)
- [Feature inventory](FEATURE-INVENTORY.md)
- [Repository boundary assessment](REPOSITORY-BOUNDARY-ASSESSMENT.md)

## Non-goals honored

This assessment does not redesign Engineering Work, modify the UI or schema, move documentation, rename terminology, refactor the application, or prescribe an implementation sequence.
