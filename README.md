# Aredir Labs — aredirlabs.com

Company marketing site and **standard template repository** for Aredir Labs Next.js projects. This repo defines development workflow, documentation structure, coding standards, bug and QA processes, architecture standards, and GitHub guardrails used across AlignFit, ClassForge, LeagueOS, and future products.

## Overview

- **Purpose:** Public company presence and shared engineering standards
- **Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui
- **Hosting:** Vercel (preview deployments on PRs, production on `main`)

### Site (v1)

| Route | Description |
|-------|-------------|
| `/` | Home — hero, projects preview, about preview, contact CTA |
| `/about` | Company mission and approach |
| `/projects` | Product portfolio |
| `/projects/[slug]` | AlignFit, ClassForge, LeagueOS detail pages |
| `/contact` | Email contact at info@aredirlabs.com |

Brand tokens and copy live in `src/app/globals.css` and `src/lib/site-config.ts`.

## Local development

### Prerequisites

- Node.js LTS
- npm
- A [Neon](https://neon.tech) PostgreSQL database (free tier works)

### Database setup (Neon)

1. Create a free Neon project at [neon.tech](https://neon.tech)
2. Copy your connection string from the Neon dashboard
3. Configure your environment (see [Environment variables](#environment-variables) below)
4. Push the schema and seed the database:

```bash
npm run db:push
npm run db:seed
```

> `npm run db:seed` is idempotent — running it multiple times will not duplicate seeded workspace settings or projects.

### Environment variables

Copy `.env.example` to `.env.local` and fill in your values. Next.js loads `.env.local` for local development (it overrides `.env` if present).

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Neon PostgreSQL connection string (`aredirlabs-dev` locally) |
| `BETTER_AUTH_SECRET` | Random string ≥32 characters for auth tokens |
| `BETTER_AUTH_URL` | Base URL for auth callbacks (`http://localhost:3000` in dev) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (`http://localhost:3000` in dev) |
| `WORKSPACE_ALLOWED_EMAILS` | Comma-separated list of emails allowed to create workspace accounts |

Production deployment on Vercel uses the `aredirlabs-prod` Neon instance. Set these in the Vercel project **Production** environment:

| Variable | Production value |
|----------|------------------|
| `DATABASE_URL` | `aredirlabs-prod` Neon connection string |
| `BETTER_AUTH_SECRET` | Random string ≥32 characters (distinct from dev) |
| `BETTER_AUTH_URL` | `https://aredirlabs.com` |
| `NEXT_PUBLIC_SITE_URL` | `https://aredirlabs.com` |
| `WORKSPACE_ALLOWED_EMAILS` | Approved internal workspace emails, comma-separated |

Never commit real secrets. These files are gitignored: `.env`, `.env.local`, `.env.production.local`. Only `.env.example` (placeholders) is tracked.

#### One-time production database setup (local)

For applying schema/seed to `aredirlabs-prod` from your machine:

1. Copy `.env.example` to `.env.production.local`
2. Set `DATABASE_URL` to the **aredirlabs-prod** connection string
3. Set production auth URLs (`https://aredirlabs.com`)
4. Run with explicit confirmation:

```bash
CONFIRM_PROD_DB=true npm run db:push:prod
CONFIRM_PROD_DB=true npm run db:seed:prod
```

Without `CONFIRM_PROD_DB=true`, production DB scripts fail immediately. See [Vercel production deployment checklist](plan/docs/VERCEL-PRODUCTION-DEPLOYMENT.md).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint |
| `npm run db:push` | Push Drizzle schema to the database |
| `npm run db:migrate` | Run Drizzle migrations |
| `npm run db:generate` | Generate Drizzle migrations |
| `npm run db:seed` | Seed workspace settings, projects, and notes (dev) |
| `npm run db:push:prod` | Push schema to production DB (requires `CONFIRM_PROD_DB=true`, loads `.env.production.local`) |
| `npm run db:seed:prod` | Seed production DB (requires `CONFIRM_PROD_DB=true`, loads `.env.production.local`) |

### Authentication

This project uses [Better Auth](https://www.better-auth.com/) with email/password authentication.

| Route | Description |
|-------|-------------|
| `/sign-in` | Sign in to the workspace |
| `/sign-up` | Invite-only registration notice |
| `/workspace/*` | Protected — requires authentication (redirects to `/sign-in`) |

- Workspace registration is invite-only. Public visitors cannot create accounts.
- New workspace accounts can only be created when the submitted email is listed in the server-only `WORKSPACE_ALLOWED_EMAILS` env var.
- To approve a user, add their email to `WORKSPACE_ALLOWED_EMAILS` in the relevant environment, redeploy/restart, then have them complete sign-up through an approved registration path.
- Existing users can sign in normally with email and password.
- Use the **Sign Out** button in the workspace sidebar to end the session

## Workflow

```
Local → Feature Branch → PR → Preview Deployment → Manual QA → Merge → Production
```

1. Branch from `main` (`feature/*`, `fix/*`, `docs/*`).
2. Follow [coding agent operating standard](docs/agent/coding-agent-operating-standard.md) for all implementation work.
3. Run `npm run lint` and `npm run build` before opening a PR.
4. Complete [manual QA](docs/qa/manual-qa-checklist.md) on the Vercel preview URL.
5. Merge after review; validate production per [release checklist](docs/qa/release-checklist.md).

## Agent-driven development

All implementation prompts must start with the required prefix defined in:

**[docs/agent/coding-agent-operating-standard.md](docs/agent/coding-agent-operating-standard.md)**

Use [docs/agent/guarded-prompt-template.md](docs/agent/guarded-prompt-template.md) for new prompts. Implementation order: [docs/prompts/implementation-index.md](docs/prompts/implementation-index.md).

## Documentation map

| Area | Path |
|------|------|
| Agent standards | [docs/agent/](docs/agent/) |
| Architecture | [docs/architecture/](docs/architecture/) |
| Brand | [docs/brand/](docs/brand/) |
| Engineering | [docs/engineering/](docs/engineering/) |
| Product | [docs/product/](docs/product/) |
| Bugs | [docs/bugs/](docs/bugs/) |
| QA | [docs/qa/](docs/qa/) |
| Prompts | [docs/prompts/](docs/prompts/) |
| **Knowledge Base (canonical)** | [docs/company/](docs/company/) |
| **Engineering Operating System** | [docs/company/ENGINEERING_OPERATING_SYSTEM.md](docs/company/ENGINEERING_OPERATING_SYSTEM.md) |
| **Engineering Capability Model** | [docs/company/ENGINEERING_CAPABILITY_MODEL.md](docs/company/ENGINEERING_CAPABILITY_MODEL.md) |
| **Project Inheritance Model** | [docs/company/PROJECT_INHERITANCE_MODEL.md](docs/company/PROJECT_INHERITANCE_MODEL.md) |
| **Engineering governance** | [docs/company/GOVERNANCE_INDEX.md](docs/company/GOVERNANCE_INDEX.md) |

## Engineering Operating System

The [Engineering Operating System](docs/company/ENGINEERING_OPERATING_SYSTEM.md) (EOS) is the company methodology for durable, reusable, AI-assisted software delivery. Capabilities define what the organization must do; governance orchestrates how.

- [Engineering Operating System](docs/company/ENGINEERING_OPERATING_SYSTEM.md) — **company operating model entry point** (EOS-001)
- [Engineering Capability Model](docs/company/ENGINEERING_CAPABILITY_MODEL.md) — organizational competencies (EOS-002)
- [Project Inheritance Model](docs/company/PROJECT_INHERITANCE_MODEL.md) — repository onboarding (EOS-003)
- [Governance Index](docs/company/GOVERNANCE_INDEX.md) — eight-domain governance framework (GOVERNANCE-001)
- [Governance Maturity Model](docs/company/governance/GOVERNANCE_MATURITY_MODEL.md) — project maturity assessment
- [Knowledge Artifact Taxonomy](docs/company/knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md) — artifact classification

## Knowledge Base

Canonical company standards and playbooks live under **`docs/company/`**. Operational docs in `docs/agent/`, `docs/qa/`, and elsewhere implement these standards.

- [Knowledge Base Index](docs/company/KNOWLEDGE_BASE_INDEX.md) — promoted assets by category
- [Promotion Process](docs/company/PROMOTION_PROCESS.md) — governance and asset lifecycle
- [Knowledge Base Roadmap](docs/company/KNOWLEDGE_BASE_ROADMAP.md) — priorities and registry readiness

### Key documents

- [Coding agent operating standard](docs/agent/coding-agent-operating-standard.md)
- [Repository standards](docs/engineering/repository-standards.md) — UTF-8, LF, final newline, trim trailing whitespace
- [Deployment workflow](docs/engineering/deployment-workflow.md)
- [Bug triage process](docs/bugs/bug-triage-process.md)
- [Documentation Maintenance Standard](docs/company/documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md)
- [Manual QA checklist](docs/qa/manual-qa-checklist.md)

## Repository standards

Text files use **UTF-8**, **LF** line endings, a **final newline**, and **trimmed trailing whitespace** (enforced via `.editorconfig` and `.gitattributes`). Details: [docs/engineering/repository-standards.md](docs/engineering/repository-standards.md).

## GitHub

- [Bug report](.github/ISSUE_TEMPLATE/bug_report.md)
- [Feature request](.github/ISSUE_TEMPLATE/feature_request.md)
- [Pull request template](.github/PULL_REQUEST_TEMPLATE.md)

Update [.github/CODEOWNERS](.github/CODEOWNERS) with real GitHub handles before relying on review routing.

## Product portfolio

See [docs/product/project-catalog.md](docs/product/project-catalog.md) for AlignFit, ClassForge, LeagueOS, and this site.

## License

Private repository — Aredir Labs. All rights reserved unless otherwise specified.
