# Future Product Standards

Guidelines when spinning up new Aredir Labs products from this template.

**Canonical onboarding methodology:** [Project Inheritance Model](../company/PROJECT_INHERITANCE_MODEL.md) (EOS-003). **Structural contract:** [Engineering Blueprint Specification](../company/ENGINEERING_BLUEPRINT_SPECIFICATION.md) (EOS-004). **Engineering platform:** [Reference Repository Specification](../company/REFERENCE_REPOSITORY_SPECIFICATION.md) (IMPLEMENTATION-001).

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

- [Aredir Engineering Framework Discovery](../company/framework/AEF_000_AREDIR_ENGINEERING_FRAMEWORK_DISCOVERY.md) — framework boundary, ownership map, bootstrap readiness (AEF-000)
- [Framework Capability Contracts](../company/framework/AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md) — normative capability ownership (AEF-001)
- [Bootstrap Extraction Boundary](../company/framework/AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md) — what future bootstrap may distribute (AEF-002)
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

- [AEF-000 Aredir Engineering Framework Discovery](../company/framework/AEF_000_AREDIR_ENGINEERING_FRAMEWORK_DISCOVERY.md)
- [AEF-001 Framework Capability Contracts](../company/framework/AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md)
- [AEF-002 Bootstrap Extraction Boundary](../company/framework/AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md)
- [Project Inheritance Model](../company/PROJECT_INHERITANCE_MODEL.md)
- [Engineering Blueprint Specification](../company/ENGINEERING_BLUEPRINT_SPECIFICATION.md)
- [Reference Repository Specification](../company/REFERENCE_REPOSITORY_SPECIFICATION.md)
- [Engineering Operating System](../company/ENGINEERING_OPERATING_SYSTEM.md)
- [Governance Index](../company/GOVERNANCE_INDEX.md)
- [Project conventions](./project-conventions.md)
- [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md)
- [Deployment workflow](../engineering/deployment-workflow.md)
