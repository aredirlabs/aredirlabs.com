# Company Governance

**Status:** Company Standard  
**Owner:** Aredir Labs  
**Domain:** Company  
**Last reviewed:** 2026-06-25  
**Next review due:** 2026-09-12

## Purpose

Define how Aredir Labs operates as an engineering organization: philosophy, lifecycle, decisions, and cross-cutting process expectations that apply to every product repository.

---

## Engineering philosophy

Aredir Labs engineering is **evidence-based, incremental, and canonical-first**.

| Principle | Meaning |
|-----------|---------|
| **Understand before modifying** | Audit current state before code changes. No implementation from assumptions or training-data defaults. |
| **Extension over replacement** | Prefer extending proven patterns over introducing parallel implementations. |
| **Verification required** | Claims require command output and QA evidence — not presumed success. |
| **Documentation as engineering** | Docs evolve with code. Stale documentation is a defect. |
| **Reusable over bespoke** | Patterns proven in one product become company assets through governed promotion. |
| **Product repos own implementation** | Company standards define *how*; product repos define *what* for domain-specific features. |

These principles are operationalized in the [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md).

---

## Software development lifecycle

The standard delivery lifecycle spans idea through knowledge capture:

```
Idea → Architecture Audit → Scope → Planning → Execution → Verification → Documentation → Release → Production Validation → Knowledge Capture
```

**Canonical playbook:** [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md)

### When to scale the lifecycle

| Change size | Minimum lifecycle |
|-------------|-------------------|
| Trivial fix (typo, copy, isolated CSS) | Execution → Verification |
| Standard feature | Full lifecycle; audit scaled to scope |
| Platform migration or new product | Full lifecycle including formal architecture audit |
| AI feature with intelligence layers | Full lifecycle + [AI Governance](./AI_GOVERNANCE.md) workflow |

---

## Decision-making process

### Standard decisions

1. **Identify** the decision and affected surfaces.
2. **Consult** canonical standards in `docs/company/` and operational docs.
3. **Choose** Adopt, Extend, or Deviate (see below).
4. **Document** the decision in the appropriate location (project notes, ADR, or decision log).
5. **Review** at PR time; escalate cross-product impact to engineering lead.

### Adopt / Extend / Deviate

Projects interact with company standards in one of three modes (defined in [Promotion Process — Project adoption model](../PROMOTION_PROCESS.md#project-adoption-model)):

| Mode | When to use | Documentation |
|------|-------------|---------------|
| **Adopt** | Standard applies unchanged | Note adoption in project docs; update asset `linked_projects` |
| **Extend** | Standard applies plus project-specific additions that do not contradict canonical guidance | Document extensions in `docs/product/` or `docs/architecture/` |
| **Deviate** | Intentional departure from standard | **Required:** decision log with rationale, scope, and review date |

Undocumented deviation is technical debt. New products cloned from the Aredir Labs template **Adopt** Engineering and QA standards by default.

### Escalation triggers

Escalate to engineering lead when a decision:

- Affects two or more product repositories
- Contradicts a promoted Knowledge Base asset
- Introduces a new dependency, architecture pattern, or AI provider
- Changes security, auth, or data boundaries

---

## Repository standards

Every Aredir Labs product repository follows the template baseline:

| Standard | Location |
|----------|----------|
| Text encoding and line endings | `.editorconfig`, `.gitattributes` |
| Repository hygiene | [Repository standards](../../engineering/repository-standards.md) |
| Project layout and TypeScript conventions | [Project conventions](../../architecture/project-conventions.md) |
| GitHub templates and CODEOWNERS | `.github/` |
| Agent operating rules | [Coding agent operating standard](../../agent/coding-agent-operating-standard.md) |

New products: [Future product standards](../../architecture/future-product-standards.md).

---

## Pull request expectations

### Branch strategy

```
main (production)
  └── feature/* | fix/* | docs/*
```

1. Branch from `main`.
2. One logical change per PR when possible.
3. Open PR against `main`; Vercel preview deploys automatically.

### PR checklist

Every PR must satisfy:

- [ ] Scope matches the work item — no unrelated refactors
- [ ] `npm run lint` and `npm run build` pass (or documented skip with rationale)
- [ ] Manual QA completed on preview URL for user-facing changes
- [ ] Documentation and indexes updated when behavior or structure changes
- [ ] Completion report includes files changed, verification results, and limitations

Templates: [.github/PULL_REQUEST_TEMPLATE.md](../../../.github/PULL_REQUEST_TEMPLATE.md), [PR review template](../../agent/pr-review-template.md).

Agent-driven work follows [Coding Agent Operating Standard — Completion Report](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md#required-completion-report).

---

## Release process

```
Local → Feature Branch → PR → Preview Deployment → Manual QA → Merge → Production Validation
```

| Stage | Reference |
|-------|-----------|
| Deployment workflow | [Deployment workflow](../../engineering/deployment-workflow.md) |
| Environment strategy | [Environment strategy](../../engineering/environment-strategy.md) |
| Release checklist | [Release checklist](../../qa/release-checklist.md) |
| Production deployment | [Vercel production deployment](../../plan/docs/VERCEL-PRODUCTION-DEPLOYMENT.md) |
| UAT (when applicable) | [UAT checklist](../../qa/uat-checklist.md) |

Production changes require post-deploy validation. Rollback plan documented for high-risk releases.

---

## Documentation ownership

Documentation follows a three-tier hierarchy:

| Tier | Location | Owner |
|------|----------|-------|
| **Canonical** | `docs/company/` | Asset owner; updated via promotion PRs and quarterly review |
| **Operational** | `docs/agent/`, `docs/qa/`, `docs/engineering/`, `docs/architecture/` | Implementer of change |
| **Implementation** | `docs/product/`, `plan/docs/`, project decision logs | Feature or work-item author |

**Canonical wins on conflict.** See [Documentation Governance](./DOCUMENTATION_GOVERNANCE.md) and [Documentation Maintenance Standard](../documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md).

---

## Architectural review process

Architecture review is required before significant change — not optional polish.

### When review is required

- Major feature work or platform migrations
- After milestones when drift is suspected
- Before promoting project artifacts to Knowledge Base
- When onboarding a new product or inherited codebase
- When incidents reveal ownership or data-flow ambiguity

### Review methodology

**Canonical standard:** [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md)

**Governance context:** [Architecture Governance](./ARCHITECTURE_GOVERNANCE.md)

Audit outputs feed implementation planning and promotion candidates. Audits do not authorize unscoped rewrites.

---

## Related

- [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md)
- [Governance Index](../GOVERNANCE_INDEX.md)
- [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [Project Governance](./PROJECT_GOVERNANCE.md)
- [Engineering Governance](./ENGINEERING_GOVERNANCE.md)
