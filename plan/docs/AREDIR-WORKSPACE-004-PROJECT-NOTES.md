# AREDIR-WORKSPACE-004 — Project Notes and Decision Log

Lightweight internal notes and decision tracking for workspace projects. This is project memory, not task/ticket tracking.

## Table purpose

`workspace_project_notes` stores short-form internal entries attached to a row in `workspace_projects`.

| Column | Description |
|--------|-------------|
| `id` | Primary key |
| `project_id` | FK to `workspace_projects.id` |
| `type` | Note category (see below) |
| `title` | Short summary |
| `body` | Plain-text detail |
| `created_at` | Created timestamp |
| `updated_at` | Updated timestamp |

### Relationships

- Each note belongs to exactly one workspace project.
- Deleting a project **cascades** and deletes its notes (`onDelete: "cascade"`).

## Note types

| Type | Typical use |
|------|-------------|
| `note` | General context or status |
| `decision` | Recorded decisions and rationale |
| `risk` | Risks, blockers, or concerns |
| `qa` | QA findings and test-cycle notes |
| `release` | Release notes and deployment status |

Constants live in `src/lib/workspace/note-types.ts`.

## Route behavior

| Route | Behavior |
|-------|----------|
| `/workspace/projects/[slug]` | Loads project registry data and notes (newest first) |
| POST via server action | Authenticated users can add a note from the detail page form |

### UI

The **Recent Notes** section on project detail pages shows:

- type badge
- title
- short body preview
- created date

An **Add note** form accepts type, title, and body. Submissions use the `createProjectNote` server action in `src/app/workspace/projects/[slug]/actions.ts`.

### Empty and error states

| State | Behavior |
|-------|----------|
| No notes | Empty state with prompt to add the first note |
| Notes failed to load | Inline error in the notes section; registry data still renders |
| Note creation failed | Inline form error from server action |
| Database unavailable (project) | Full-page unavailable state (unchanged from 003) |

## Seed data

`npm run db:seed` inserts idempotent sample notes (by fixed `id`):

| Project | Sample theme |
|---------|--------------|
| AlignFit | UAT / testing cycle (`qa`) |
| ClassForge | Paused prototype (`note`) |
| LeagueOS | Football-first planning (`decision`) |
| AredirLabs.com | Workspace foundation (`release`) |

## Future expansion ideas

- Edit and archive notes
- Filter by note type
- Full note detail view
- Author attribution (user_id on notes)
- Pin important decisions to the top
- Link notes to releases, QA runs, or metrics
- Search across project memory
- Optional markdown formatting (still lightweight)

## Verification

```bash
npm run db:push
npm run db:seed
npm run lint
npm run build
```

Manual checks:

1. Sign in
2. Open each project detail page and confirm seeded notes display
3. Add a new note and refresh — confirm it persists
4. Run `npm run db:seed` again — confirm no duplicate seeded notes

## Related

- Schema: `src/lib/db/schema.ts`
- Seed: `src/lib/db/seed.ts`
- Project details: [AREDIR-WORKSPACE-003-PROJECT-DETAILS.md](./AREDIR-WORKSPACE-003-PROJECT-DETAILS.md)
