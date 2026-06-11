# AREDIR-WORKSPACE-007B Prompt Library

## Purpose

Add a lightweight project-attached prompt memory layer for preserving implementation prompts, agent results, verification notes, and follow-ups.

This is project work history, not task tracking.

## Schema

Table: `workspace_project_prompts`

- `id`
- `project_id`
- `title`
- `prompt_type`
- `prompt_body`
- `result_summary`
- `files_changed`
- `verification`
- `follow_ups`
- `status`
- `created_at`
- `updated_at`

Each prompt belongs to `workspace_projects.id`. Project deletion cascades to prompts.

## Routes

- `/workspace/prompts`
  - Recent prompts across all projects.
  - Filters by project, type, status, and title text.
- `/workspace/projects/[slug]`
  - Adds a project-local Prompts section and create form.
- `/workspace/projects/[slug]/prompts/[promptId]`
  - Prompt detail page with prompt body, result summary, files changed, verification, and follow-ups.

## Prompt Types

- `implementation`
- `audit`
- `bugfix`
- `ui`
- `qa`
- `documentation`
- `deployment`
- `research`

## Statuses

- `drafted`
- `run`
- `verified`
- `needs_followup`
- `superseded`

## Future Ideas

- Convert prompt to task.
- Link prompt to release.
- Link prompt to milestone.
- Import from markdown.
- AI-generated summaries.
