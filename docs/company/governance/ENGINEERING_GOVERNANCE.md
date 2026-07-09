# Engineering Governance

**Status:** Company Standard  
**Owner:** Aredir Labs  
**Domain:** Engineering  
**Last reviewed:** 2026-06-25  
**Next review due:** 2026-09-12

## Purpose

Define company-wide engineering quality expectations: code standards, testing, QA processes, non-functional requirements, technical debt management, Definition of Done, and production readiness.

Operational checklists implement these standards in each repository. Canonical promoted assets provide detailed methodology.

---

## Code quality

### Baseline conventions

| Area | Standard |
|------|----------|
| TypeScript | Strict mode; avoid `any`; prefer `interface` for component props |
| Imports | Path aliases (`@/`); ordered external → internal → relative |
| Components | Small, single-purpose; Server Components by default |
| Commits and PRs | One logical change; follow deployment workflow |
| Repository hygiene | UTF-8, LF, final newline, trimmed whitespace |

**References:** [Project conventions](../../architecture/project-conventions.md), [Component guidelines](../../architecture/component-guidelines.md), [Repository standards](../../engineering/repository-standards.md)

### Agent-driven code quality

All agent implementation follows [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md):

- Understand before modifying
- Respect existing architecture
- Minimal diff — no unrelated refactors
- Verification required before completion

---

## Testing expectations

Testing strategy varies by change type and product maturity. Minimum expectations:

| Change type | Minimum verification |
|-------------|---------------------|
| Code change | `npm run lint`, `npm run build` |
| Database change | `npm run db:push`, `npm run db:seed` (twice when idempotency matters) |
| UI change | Manual QA per [manual QA checklist](../../qa/manual-qa-checklist.md) |
| AI application layers | Unit/integration tests with deterministic assertions |
| AI narrative layer | Evaluation scenarios per [AI Evaluation Framework](../ai-patterns/AI_EVALUATION_FRAMEWORK.md) |
| Production deploy | [Release checklist](../../qa/release-checklist.md) + post-deploy validation |

Automated test suites expand as products mature. The **verification discipline** — evidence before claims — is mandatory regardless of test coverage level.

---

## QA processes

Quality assurance is embedded throughout delivery, not a final gate.

**Canonical framework:** [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md)

### QA lifecycle

```
Discovery → Reproduction → Isolation → Root Cause Analysis → Implementation Verification → Regression Review → Release Validation → Production Verification
```

### Operational checklists

| Checklist | When |
|-----------|------|
| [Manual QA checklist](../../qa/manual-qa-checklist.md) | User-facing changes on preview |
| [UAT checklist](../../qa/uat-checklist.md) | Milestone or release candidate validation |
| [Release checklist](../../qa/release-checklist.md) | Pre-merge and post-deploy |
| [Bug triage process](../../bugs/bug-triage-process.md) | Defect intake and severity assignment |
| [Bug report template](../../bugs/bug-report-template.md) | Defect documentation |

### Root cause analysis

Medium+ severity defects require documented root cause before closure.

**Canonical framework:** [Root Cause Analysis Framework](../qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md)

---

## Accessibility

Accessibility is a release requirement for user-facing work, not an optional enhancement.

| Requirement | Standard |
|-------------|----------|
| Semantic HTML | Headings in order; native elements preferred |
| Keyboard operability | Focus states; no keyboard traps |
| Forms | Labels, `aria-describedby` for validation |
| Images | Meaningful `alt` text |
| Motion | Respect `prefers-reduced-motion` |
| Dark mode | Test contrast in both themes when enabled |

**References:** [UI patterns](../../architecture/ui-patterns.md), [Component guidelines](../../architecture/component-guidelines.md)

Spot-check accessibility during manual QA for every user-facing change.

---

## Performance

Performance expectations scale with product stage. Minimum discipline:

| Practice | Detail |
|----------|--------|
| **Images** | Use `next/image` with dimensions or `fill` + `sizes` |
| **Data fetching** | Server Components and server-side fetching by default |
| **Client boundaries** | `"use client"` only when required; keep boundaries low |
| **Bundle awareness** | Do not add dependencies without explicit request |
| **Caching** | Document caching and revalidation in technical overview |

Formal performance budgets and monitoring are product-specific extensions documented in `docs/engineering/technical-overview.md`.

---

## Security

| Rule | Detail |
|------|--------|
| **Secrets** | Never commit `.env`, credentials, or API keys |
| **Auth boundaries** | Document who can access what; protect routes server-side |
| **User input** | Validate and sanitize external data; use `unknown` and narrow |
| **Error surfaces** | No stack traces in production UI; never log secrets |
| **Dependencies** | No new libraries without explicit approval |
| **Production DB** | Require explicit confirmation flag for prod scripts |

Environment separation: [Environment strategy](../../engineering/environment-strategy.md).

---

## Reliability

| Practice | Detail |
|----------|--------|
| **Idempotent operations** | Seeds and migrations safe to re-run where documented |
| **Graceful degradation** | User-facing errors are clear and accessible |
| **Rollback awareness** | High-risk releases document rollback steps |
| **Post-deploy validation** | Verify production after merge — not only preview |
| **Known issues tracking** | [Known issues](../../bugs/known-issues.md) maintained honestly |

---

## Technical debt management

| Type | Handling |
|------|----------|
| **Undocumented Deviate** | Treat as debt — document or align to standard |
| **Architectural drift** | Address via architecture audit findings |
| **Stale documentation** | Fix in same PR as code change or file hygiene work item |
| **Deferred patterns** | Track in roadmap; do not silently accumulate (see [Knowledge Base Roadmap](../KNOWLEDGE_BASE_ROADMAP.md)) |
| **Incomplete verification** | Do not close work items; report limitations honestly |

Technical debt is visible and tracked — not hidden in closed issues with failing verification.

---

## Definition of Done

A work item is **done** when all applicable criteria are met:

| Criterion | Required when |
|-----------|---------------|
| Scope complete | Always |
| Lint and build pass | Code changes |
| Database gates pass | Schema or seed changes |
| Manual QA complete | User-facing changes |
| Documentation updated | Behavior, structure, or standards affected |
| Indexes updated | New work packages, optional prompts, assets, or significant features |
| Completion report delivered | Agent-driven work |
| Limitations documented | Any skipped verification |
| Knowledge capture considered | Significant or reusable work |

"Done" requires evidence. See [Coding Agent Operating Standard — Verification Standards](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md#verification-standards).

---

## Production readiness

Before first production deploy and for significant releases:

| Gate | Reference |
|------|-----------|
| Environment variables configured | [Environment strategy](../../engineering/environment-strategy.md) |
| Release checklist complete | [Release checklist](../../qa/release-checklist.md) |
| Domain and DNS documented | Project `docs/product/` or engineering docs |
| Error monitoring configured | When adopted — document in technical overview |
| Rollback plan documented | High-risk releases |
| Post-deploy validation performed | [QA Engineering Framework — Production Verification](../qa-standards/QA_ENGINEERING_FRAMEWORK.md) |

---

## Related

- [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md)
- [Governance Index](../GOVERNANCE_INDEX.md)
- [Company Governance](./COMPANY_GOVERNANCE.md)
- [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md)
- [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md)
- [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md)
