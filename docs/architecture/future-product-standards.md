# Future Product Standards

Guidelines when spinning up new Aredir Labs products from this template.

## Starting a new product

1. Clone or generate from the Aredir Labs template repository.
2. Run **prompt-001A** (foundation) if not already present.
3. Customize `docs/product/site-brief.md` and `docs/brand/`.
4. Configure environments per `docs/engineering/environment-strategy.md`.

## Must carry forward

- `docs/agent/coding-agent-operating-standard.md` and guarded prompt prefix — operational entry point; canonical standard: [Coding Agent Operating Standard](../company/engineering-standards/CODING_AGENT_OPERATING_STANDARD.md)
- `.editorconfig` and `.gitattributes`
- GitHub issue and PR templates
- Bug severity levels and QA workflow
- Naming and component conventions

## Company Knowledge Base

**Canonical company standards** live under [`docs/company/`](../company/). Clone or sync this tree when spinning up products from the template.

- [Engineering Operating System](../company/ENGINEERING_OPERATING_SYSTEM.md) — company operating model; products inherit the full EOS
- [Governance Index](../company/GOVERNANCE_INDEX.md) — engineering governance entry point (GOVERNANCE-001)
- [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md) — architecture patterns, engineering/QA standards, AI patterns, playbooks
- [Promotion Process](../company/PROMOTION_PROCESS.md) — governance, adoption model (Adopt / Extend / Deviate), review cadence
- [Governance Maturity Model](../company/governance/GOVERNANCE_MATURITY_MODEL.md) — assess and progress project maturity
- [Knowledge Artifact Taxonomy](../company/knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md) — classify docs and promotion candidates

Operational docs (`docs/agent/`, `docs/qa/`, `docs/architecture/`) implement Knowledge Base standards. If guidance conflicts, **canonical `docs/company/` wins** unless a documented Deviate decision exists.

## Product-specific overrides

Document overrides in the product repo under `docs/product/`:

- Information architecture
- CMS schema (if different from template)
- Auth and data boundaries
- Third-party integrations

## Shared ecosystem

| Product | Focus |
|---------|--------|
| AlignFit | Fitness / alignment product |
| ClassForge | Class and training management |
| LeagueOS | League and competition operations |
| aredirlabs.com | Company marketing site (this repo) |

## Technical baseline

- Next.js App Router + TypeScript + Tailwind
- Vercel deployment with preview URLs on PRs
- Optional Sanity for structured content

## Before first production deploy

- [ ] Environment variables set in Vercel
- [ ] `docs/qa/release-checklist.md` completed
- [ ] Domain and DNS documented
- [ ] Error monitoring configured (when adopted)

## Related

- [Engineering Operating System](../company/ENGINEERING_OPERATING_SYSTEM.md)
- [Governance Index](../company/GOVERNANCE_INDEX.md)
- [Project conventions](./project-conventions.md)
- [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md)
- [Deployment workflow](../engineering/deployment-workflow.md)
