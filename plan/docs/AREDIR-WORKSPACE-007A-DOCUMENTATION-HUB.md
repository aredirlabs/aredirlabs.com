# AREDIR-WORKSPACE-007A Documentation Hub

## Purpose

The documentation hub turns each workspace project into a durable knowledge repository. It captures architecture notes, decisions, QA findings, release notes, prompts, research, and references without becoming a task tracker, ticket system, comment thread, file store, or rich text workspace.

## Schema

Table: `workspace_project_documents`

Fields:

- `id`: primary key
- `project_id`: required foreign key to `workspace_projects.id`
- `category`: required enum value
- `title`: required document title
- `slug`: required route slug generated from the title
- `content`: required text body
- `created_at`: creation timestamp
- `updated_at`: update timestamp

Relationships:

- Each document belongs to one project.
- Deleting a project cascades to its documents.
- `project_id` plus `slug` is unique so one project cannot have duplicate document URLs.

## Categories

Allowed document categories:

- `architecture`
- `decision`
- `qa`
- `release`
- `prompt`
- `research`
- `reference`

Category constants, labels, validation, and badge helpers live in `src/lib/workspace/document-categories.ts`.

## Routes

- `/workspace/docs`: database-backed documentation search across project documents.
- `/workspace/projects/[slug]`: project detail page with a Documents section.
- `/workspace/projects/[slug]/documents/[documentSlug]`: document detail page with title, category, updated date, and safely rendered content.

## Search Behavior

Search is intentionally lightweight.

- Searches match document titles with simple database filtering.
- Searches match category keys and labels.
- Empty search returns all documents ordered by project, category, and title.

This phase does not implement full-text search, vector search, embeddings, cross-document linking, or ranking.

## Future Roadmap

Ideas for 007B, documented but not implemented:

- Prompt library
- Release center
- Cross-project search
- Document linking
- Attachments
