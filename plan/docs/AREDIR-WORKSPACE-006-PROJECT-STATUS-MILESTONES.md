# AREDIR-WORKSPACE-006 — Project Status and Milestones

## Purpose

Add lightweight operational visibility to the protected Aredir Labs workspace without building task tracking, tickets, or workflow automation.

This milestone delivers:

- Clearer project status and stage fields on `workspace_projects`
- Per-project milestones with status, dates, and ordering
- A compact company operating snapshot on `/workspace`
- Registry and detail views that surface current focus and next steps

## Schema

### `workspace_projects` (extended)

| Column | Type | Notes |
|--------|------|-------|
| `status` | `project_status` enum | Operational status |
| `stage` | `project_stage` enum | Delivery lifecycle stage |
| `current_focus` | `text` nullable | Active priority summary |
| `next_step` | `text` nullable | Next checkpoint |
| `target_date` | `timestamp` nullable | Project-level target |
| `updated_at` | `timestamp` | Already present; updated on seed upsert |

Existing registry fields (`name`, `slug`, `category`, `description`, `repo_url`, `public_url`, `created_at`) are unchanged.

### `workspace_project_milestones` (new)

| Column | Type | Notes |
|--------|------|-------|
| `id` | `text` PK | e.g. `ms_alignfit_01` |
| `project_id` | `text` FK | References `workspace_projects.id`, `ON DELETE CASCADE` |
| `title` | `text` NOT NULL | |
| `description` | `text` nullable | |
| `status` | `milestone_status` enum | Default `planned` |
| `target_date` | `timestamp` nullable | |
| `completed_at` | `timestamp` nullable | |
| `sort_order` | `integer` | Default `0`; lower sorts first within groups |
| `created_at` / `updated_at` | `timestamp` | |

Deleting a workspace project cascades to its milestones.

## Status and stage values

### Project status (`project_status`)

| Value | Label | Typical use |
|-------|-------|-------------|
| `active` | Active | In active development |
| `testing` | Testing | UAT, QA, or pre-release validation |
| `paused` | Paused | Intentionally on hold |
| `planning` | Planning | Early design / scoping |
| `archived` | Archived | Retired or shelved |

### Project stage (`project_stage`)

| Value | Label |
|-------|-------|
| `concept` | Concept |
| `prototype` | Prototype |
| `mvp` | MVP |
| `uat` | UAT |
| `production` | Production |
| `maintenance` | Maintenance |

### Milestone status (`milestone_status`)

| Value | Label | Display group |
|-------|-------|---------------|
| `planned` | Planned | Planned |
| `active` | Active | Active |
| `blocked` | Blocked | Blocked |
| `completed` | Completed | Completed / Deferred |
| `deferred` | Deferred | Completed / Deferred |

Constants live in:

- `src/lib/workspace/project-status.ts`
- `src/lib/workspace/project-stage.ts`
- `src/lib/workspace/milestone-status.ts`

## Route behavior

### `/workspace`

- Renders **Operating snapshot** with:
  - Count of `active` projects
  - Count of `testing` projects
  - Count of `paused` + `planning` projects
  - Next upcoming milestone (earliest `target_date` among `planned`/`active`, nulls last)
  - List of `blocked` milestones across all projects
- Project cards show status badge, stage badge, and `current_focus` (fallback: description)
- Snapshot errors are isolated; project cards still render when possible

### `/workspace/projects`

- Registry table columns: Name, Status, Stage, Current focus, Next step, Target, Repo
- Horizontal scroll on narrow viewports to keep the table readable

### `/workspace/projects/[slug]`

- **Overview** — status, stage, current focus, next step, target date, category, description
- **Registry record** — slug, URLs, timestamps
- **Current Focus** — dedicated section from `current_focus` with next-step callout
- **Milestones** — grouped Active → Planned → Blocked → Completed/Deferred
- **Notes** — existing decision log (unchanged)
- Invalid or unknown slug → `notFound()`
- Milestone and note load failures are isolated per section

### Create milestone (server action)

- Form on project detail pages
- Fields: title, description, status, target_date, sort_order (optional)
- Auth required (Better Auth session)
- `revalidatePath` on success
- No edit/delete in this milestone

## Seed data

`src/lib/db/seed.ts`:

- Projects upsert on `slug` conflict (updates status/stage/focus fields on re-run)
- Milestones insert with fixed IDs; `onConflictDoNothing` on `id`
- Seeded project posture:
  - **AlignFit** — `testing` / `uat`
  - **ClassForge** — `paused` / `prototype`
  - **LeagueOS** — `planning` / `concept`
  - **AredirLabs.com** — `active` / `mvp`

Run twice to verify idempotency:

```bash
npm run db:seed
npm run db:seed
```

`npm run db:push` runs `scripts/migrate-workspace-006.mjs` first to map legacy `project_status` values (`Active Build`, `In Development`, `Concept`) to the new enum vocabulary on existing databases.

## Verification

```bash
npm run db:push
npm run db:seed
npm run lint
npm run build
```

Manual checks:

1. Sign in
2. Open `/workspace` — operating snapshot and project cards
3. Open `/workspace/projects` — status, stage, focus columns
4. Open each project detail — overview, focus, milestones, notes
5. Create a milestone — refresh and confirm persistence
6. Visit invalid slug — confirm not-found behavior

## Future expansion ideas

- Edit/delete milestones and inline status updates
- Project status edit form (admin-only)
- Milestone completion workflow (`completed_at` auto-set)
- QA / release checklist section (still not task tracking)
- Cross-project timeline view
- Notifications when milestones become blocked
- Public site remains separate; workspace is source of truth for internal ops

## Related

- [AREDIR-WORKSPACE-003](./AREDIR-WORKSPACE-003-PROJECT-DETAILS.md) — project detail pages
- [AREDIR-WORKSPACE-004](./AREDIR-WORKSPACE-004-PROJECT-NOTES.md) — notes and decision log
- [Implementation index](../../docs/prompts/implementation-index.md)
