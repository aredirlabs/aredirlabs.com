# AREDIR-WORKSPACE-003 — Project Detail Pages

Internal project detail views for the Aredir Labs workspace. Each seeded product has a protected page backed by the `workspace_projects` registry in Neon.

## Purpose

Provide one internal source of truth per product without building full task tracking, editing, or permissions yet. Detail pages surface registry metadata today and reserve structured sections for future operational data.

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/workspace` | Authenticated | Dashboard with linked project cards |
| `/workspace/projects` | Authenticated | Project registry table with linked names |
| `/workspace/projects/[slug]` | Authenticated | Project detail page for a single registry record |

Invalid or unknown slugs render a not-found state with a link back to the registry. Database connection failures render an inline unavailable state (consistent with dashboard and registry pages).

## Current data shown

Loaded from `workspace_projects` by `slug`:

| Field | Source column |
|-------|---------------|
| Name | `name` |
| Status | `status` |
| Category | `category` |
| Description | `description` |
| Repo URL | `repo_url` |
| Public URL | `public_url` |
| Created | `created_at` |
| Updated | `updated_at` |

Seeded slugs (dev): `alignfit`, `classforge`, `leagueos`, `aredirlabs-com`.

## Placeholder sections

The detail page includes empty-state sections for future internal operations:

- Overview
- Current Focus
- Recent Notes
- QA / Release Status
- Metrics
- Links

These are static placeholders in `src/components/workspace/project-detail-sections.tsx`.

## Future expansion areas

| Area | Planned use |
|------|-------------|
| Overview | Rich summary, ownership, and project context |
| Current Focus | Active milestones and priorities |
| Recent Notes | Internal notes and decision log |
| QA / Release Status | Checklists, release gates, deployment status |
| Metrics | Usage, health, and delivery metrics |
| Links | Curated runbooks, dashboards, and docs |
| Editing | Update registry fields from the workspace |
| Tasks / tickets | Work tracking per project |
| Roles / permissions | Project-scoped access control |

## Verification

```bash
npm run lint
npm run build
```

Manual checks:

1. Sign in at `/sign-in`
2. Open `/workspace` and click each project card
3. Open `/workspace/projects` and click each project name
4. Confirm detail fields match seeded data
5. Visit `/workspace/projects/invalid-slug` and confirm not-found state

## Related

- Schema: `src/lib/db/schema.ts` (`workspace_projects`)
- Seed: `src/lib/db/seed.ts`
- Neon setup: [NEON-ENVIRONMENT-VERIFICATION.md](./NEON-ENVIRONMENT-VERIFICATION.md)
