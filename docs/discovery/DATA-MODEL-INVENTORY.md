# Data Model Inventory

## Persistence stack and migration state

- PostgreSQL is accessed through Neon’s HTTP driver and Drizzle ORM in `src/lib/db/index.ts`.
- `DATABASE_URL` is required at first database access. The `db` export lazily creates a schema-aware Drizzle client.
- Drizzle configuration and `db:generate`, `db:migrate`, `db:push`, and seed scripts exist in the repository.
- No tracked Drizzle migration directory or `.sql` migration file was found. The schema source is therefore the repository’s visible definition; applied database history is external to the tracked tree.
- `src/lib/db/seed.ts` uses stable ids and upserts/on-conflict behavior to bootstrap settings, four example projects, milestones, notes, documents, and prompts.

## Entity relationship inventory

```text
user ──< session
user ──< account
verification (standalone Better Auth records)

workspace_projects ──< workspace_project_notes
workspace_projects ──< workspace_project_milestones
workspace_projects ──< workspace_project_documents
workspace_projects ──< workspace_project_prompts

workspace_settings (standalone singleton-like company record; no FK)
```

## Tables and purpose

| Table | Purpose | Key constraints / relationships |
| --- | --- | --- |
| `user` | Better Auth user identity. | Primary-key text id; unique email. |
| `session` | Better Auth sessions. | Unique token; required user FK; cascade delete. |
| `account` | Better Auth credential/provider account. | Required user FK; cascade delete. |
| `verification` | Better Auth verification payloads. | Standalone identifier/value/expiry records. |
| `workspace_projects` | Shared project registry. | Unique slug; status/stage defaults; optional focus, next step, dates, URLs, category, description. |
| `workspace_settings` | Company/workspace metadata. | Unique company slug; no relationship to project or user. |
| `workspace_project_notes` | Project notes, decisions, risks, QA, and releases. | Required project FK; cascade delete. |
| `workspace_project_milestones` | Ordered project milestones. | Required project FK; status, target/completion dates, sort order; cascade delete. |
| `workspace_project_documents` | Project-scoped Markdown-like text documents. | Required project FK; category; unique `(project_id, slug)`; cascade delete. |
| `workspace_project_prompts` | Prompt/work record with outcome metadata. | Required project FK; type, status, prompt body, optional result/files/verification/follow-ups; cascade delete. |

## Controlled vocabularies

| Domain | Values |
| --- | --- |
| Project status | `active`, `testing`, `paused`, `planning`, `archived` |
| Project stage | `concept`, `prototype`, `mvp`, `uat`, `production`, `maintenance` |
| Milestone status | `planned`, `active`, `blocked`, `completed`, `deferred` |
| Note type | `note`, `decision`, `risk`, `qa`, `release` |
| Document category | `architecture`, `decision`, `qa`, `release`, `prompt`, `research`, `reference` |
| Prompt type | `implementation`, `audit`, `bugfix`, `ui`, `qa`, `documentation`, `deployment`, `research` |
| Prompt status | `drafted`, `run`, `verified`, `needs_followup`, `superseded` |

## Ownership and access model

Workspace domain tables are project-scoped but not user-, organization-, team-, or repository-scoped. They contain no created-by/updated-by/owner fields. An authenticated action resolves a project by its public slug and creates a record under that project; it does not verify membership or role. Seeded data places all users in a single conceptual shared workspace.

This makes the model suitable for the currently shared, lightweight internal Workspace but means ownership, auditability, and tenancy are absent as modeled concepts.

## Existing query and derived-model behavior

- The dashboard derives project counts and milestone posture from project/milestone tables.
- Documents are grouped and searched by category/title across all projects.
- Prompts are filtered by project, type, status, and title across all projects.
- Detail retrieval joins documents/prompts to projects and constrains by project slug plus artifact id/slug.
- The Knowledge Asset Registry does **not** use a Drizzle table. Its registry entries, classifications, references, and adoption relationships are static data in `src/lib/knowledge-assets/registry.ts`.

## Extensibility observations

| Foundation | Current extensibility | Constraint observed |
| --- | --- | --- |
| Project container | One-to-many artifact relations and stable slug lookups. | No repository identity, owner, or membership relation. |
| Artifact records | Separate typed tables support direct current views/forms. | No shared artifact identity/lifecycle or cross-artifact relationships. |
| Prompt records | Already carry outcome, files changed, verification, follow-ups, and status. | Free-text fields; no links to repository commits, files, evidence, or documents. |
| Document records | Categories and unique project slugs support navigation/search. | Content is copied into database; no source path, commit, authority, or sync metadata. |
| Knowledge registry | Rich typed metadata and adoption display data exist in code. | Read-only, deployment-coupled, and disconnected from DB/project foreign keys. |

## Data-model gaps recorded for baseline purposes

- No tracked migration history in the repository.
- No data-level access isolation or artifact attribution.
- No explicit repository, source-document, synchronization, external-id, or revision model.
- No persisted Mission, package, finding, verification, decision/ADR, opportunity, or promotion-candidate entities.
- No durable lifecycle/audit history beyond created/updated timestamps.
