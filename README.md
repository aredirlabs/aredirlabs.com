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
| `/contact` | Email contact (placeholder inbox) |

Brand tokens and copy live in `src/app/globals.css` and `src/lib/site-config.ts`.

## Local development

### Prerequisites

- Node.js LTS
- npm

### Setup

```bash
git clone <repository-url>
cd aredirlabs-com
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Serve production build locally |
| `npm run lint` | Run ESLint |

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

### Key documents

- [Coding agent operating standard](docs/agent/coding-agent-operating-standard.md)
- [Repository standards](docs/engineering/repository-standards.md) — UTF-8, LF, final newline, trim trailing whitespace
- [Deployment workflow](docs/engineering/deployment-workflow.md)
- [Bug triage process](docs/bugs/bug-triage-process.md)
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
