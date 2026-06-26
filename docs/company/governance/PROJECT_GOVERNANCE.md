# Project Governance

**Status:** Company Standard  
**Owner:** Aredir Labs  
**Domain:** Project  
**Last reviewed:** 2026-06-25  
**Next review due:** 2026-09-12

## Purpose

Define how every Aredir Labs project repository should be organized so products **inherit standards instead of inventing them**. This document covers documentation structure, planning artifacts, and repository workflow — not product-specific domain architecture.

---

## Repository organization

Every Aredir Labs product follows the template layout:

```
├── .github/              # PR template, issue templates, CODEOWNERS
├── docs/
│   ├── agent/            # Agent operating standards (operational)
│   ├── architecture/     # UI patterns, conventions (operational)
│   ├── brand/            # Brand guide (product-specific customization)
│   ├── bugs/             # Triage, templates, known issues
│   ├── company/          # Canonical Knowledge Base (sync from template)
│   ├── engineering/      # Deployment, env, repo standards
│   ├── product/          # Site brief, IA, catalog, overrides
│   ├── prompts/          # Implementation index and work-item prompts
│   ├── qa/               # Manual QA, release, UAT checklists
│   └── workspace/        # Internal workspace feature docs (when applicable)
├── plan/docs/            # Verification specs and implementation plans
├── public/               # Static assets
├── src/
│   ├── app/              # Routes and layouts
│   ├── components/       # React components
│   └── lib/              # Shared utilities
├── AGENTS.md             # Agent tooling rules
└── README.md             # Project index and workflow summary
```

New products: [Future product standards](../../architecture/future-product-standards.md).

---

## Documentation hierarchy

Projects implement the three-tier model defined in [Documentation Maintenance Standard](../documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md):

| Tier | Location | Project responsibility |
|------|----------|------------------------|
| **Canonical** | `docs/company/` | Sync or clone from Aredir Labs template; do not fork without promotion PR |
| **Operational** | `docs/agent/`, `docs/qa/`, etc. | Customize only via Adopt / Extend / Deviate |
| **Implementation** | `docs/product/`, `plan/docs/`, feature docs | Product-owned; feeds promotion candidates |

**Conflict rule:** Canonical `docs/company/` wins unless a governed Deviate decision exists.

---

## Architecture docs

| Doc type | Location | Scope |
|----------|----------|-------|
| **Company architecture patterns** | `docs/company/architecture-patterns/` | Cross-product patterns (canonical) |
| **Operational conventions** | `docs/architecture/` | UI patterns, naming, components, project conventions |
| **Product architecture** | `docs/product/` or product-specific paths | Domain-specific system design (e.g., coach intelligence, nutrition model) |

Product architecture docs must link upward to applicable canonical patterns. They must not redefine company standards.

**When to create product architecture docs:**

- New domain subsystem with distinct ownership boundaries
- AI features with intelligence layers
- Integration with external services affecting data flow
- Any system complex enough to require audit before change

---

## Planning docs

| Doc type | Location | Purpose |
|----------|----------|---------|
| **Verification specs** | `plan/docs/` | Implementation verification records (AREDIR-WORKSPACE-*, feature verifications) |
| **Work-item prompts** | `docs/prompts/` | Ordered implementation prompts with dependencies |
| **Implementation index** | `docs/prompts/implementation-index.md` | Master tracker for prompts and KB work items |

Planning docs are **implementation tier**. They document what was built and verified — not company standards.

Rules:

1. Update the implementation index when adding prompts or work items.
2. Every implementation prompt includes the [coding agent operating standard](../../agent/coding-agent-operating-standard.md) prefix.
3. Verification specs record pass/fail evidence, not assumptions.

---

## Implementation indexes

Every project maintains an **implementation index** tracking:

- Ordered foundation and feature prompts
- Knowledge Base promotion work items
- Workspace or internal tooling work items (when applicable)
- Status, dependencies, and deliverable links

**Reference:** [Implementation index](../../prompts/implementation-index.md)

Indexes are living documents — update them in the same PR as the work they track.

---

## Feature specifications

Feature specifications are **product-owned** and live in the product repository:

| Include | Location |
|---------|----------|
| Feature scope and acceptance criteria | Issue, milestone, or `docs/product/` |
| UI specifications for product screens | Product docs (not `docs/company/`) |
| Domain data models and business rules | Product architecture docs |
| Implementation prompts for one feature | `docs/prompts/` (implementation tier) |

Feature specs feed the delivery lifecycle in [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md). Reusable patterns discovered during delivery become promotion candidates — not permanent feature spec content.

---

## Architecture Decision Records (ADRs)

Use lightweight decision records for significant choices:

| Record | When |
|--------|------|
| **Decision log entry** | Deviate decisions, technology choices, scope changes |
| **Project notes** | Ongoing decisions during delivery (workspace projects) |
| **Formal ADR** | Cross-cutting decisions affecting multiple subsystems |

Minimum ADR content:

- Context and problem
- Decision
- Rationale
- Alternatives considered
- Consequences and review date

Decision records belong in **implementation tier** unless the decision produces a reusable pattern worthy of promotion.

---

## Audit documents

Architecture audits follow [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md).

| Audit type | Typical location |
|------------|------------------|
| Feature-scoped audit | `plan/docs/` or feature doc folder |
| Product architecture audit | `docs/product/` or dedicated audit folder |
| Governance review | `docs/company/reviews/` |
| Promotion candidate review | Origin project or `docs/company/reviews/` |

Audit outputs must be evidence-based. They feed implementation planning and promotion candidates — they do not authorize unscoped rewrites.

---

## Branch strategy

```
main          ← production; protected
feature/*     ← new features
fix/*         ← bug fixes
docs/*        ← documentation-only changes
```

Rules:

- Branch from `main`
- One logical change per PR
- Preview deployment on PR (Vercel)
- Merge after review and applicable QA

---

## Release workflow

Projects inherit the company release workflow:

```
Local → Feature Branch → PR → Preview → Manual QA → Merge → Production Validation
```

| Reference | Purpose |
|-----------|---------|
| [Deployment workflow](../../engineering/deployment-workflow.md) | Branch and deploy process |
| [Release checklist](../../qa/release-checklist.md) | Pre-merge and post-deploy gates |
| [Environment strategy](../../engineering/environment-strategy.md) | Dev / preview / production separation |

Product-specific release notes or deployment overrides document in `docs/product/` via Extend mode.

---

## Onboarding a new project

1. Clone or generate from Aredir Labs template repository.
2. Carry forward required baseline per [Future product standards](../../architecture/future-product-standards.md).
3. Customize `docs/product/site-brief.md` and `docs/brand/`.
4. Configure environments per [Environment strategy](../../engineering/environment-strategy.md).
5. Adopt company standards by default; document any Deviate decisions.
6. Create project implementation index before first feature prompt.

---

## Related

- [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md)
- [Governance Maturity Model](./GOVERNANCE_MATURITY_MODEL.md)
- [Governance Index](../GOVERNANCE_INDEX.md)
- [Company Governance](./COMPANY_GOVERNANCE.md)
- [Documentation Governance](./DOCUMENTATION_GOVERNANCE.md)
- [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md)
- [Project conventions](../../architecture/project-conventions.md)
