# Knowledge Governance

**Status:** Company Standard  
**Owner:** Aredir Labs  
**Domain:** Knowledge  
**Last reviewed:** 2026-06-25  
**Next review due:** 2026-09-12

## Purpose

Knowledge is a **first-class company asset** at Aredir Labs. This document defines how reusable intellectual property is identified, promoted, versioned, maintained, and consumed across all products.

**Canonical lifecycle detail:** [Promotion Process](../PROMOTION_PROCESS.md) (Knowledge Asset Governance section). This document provides the governance-layer overview without duplicating lifecycle tables.

**Artifact classification:** [Knowledge Artifact Taxonomy](../knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md). **Operating system context:** [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md).

---

## Knowledge as company asset

| Asset type | Belongs in Knowledge Base | Stays in product repo |
|------------|---------------------------|------------------------|
| Architecture patterns | ✓ | |
| Engineering and QA standards | ✓ | |
| AI patterns and evaluation methods | ✓ | |
| Delivery playbooks | ✓ | |
| Documentation standards | ✓ | |
| Governed prompt templates | ✓ (when promoted) | |
| Domain-specific feature specs | | ✓ |
| Product UI specifications | | ✓ |
| Implementation prompts for one feature | | ✓ |
| Nutrition, coach, training architecture (AlignFit) | | ✓ |

Projects remain authoritative for **implementations**. The Knowledge Base captures what is proven, validated, and worth reusing.

---

## Knowledge Asset Registry

The registry provides visibility into promoted assets without becoming a second source of truth.

> **Knowledge Base markdown documents remain canonical. The registry is a governance view.**

| Surface | Purpose |
|---------|---------|
| [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md) | Human-readable category index |
| `/workspace/knowledge-assets` | Workspace UI — filters, adoption matrix, review dashboard |
| `src/lib/knowledge-assets/registry.ts` | Machine-readable seed; updated via promotion PRs |

**Roadmap:** [Knowledge Asset Registry Roadmap](../KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md)  
**Implementation:** [WORKSPACE-008 Knowledge Asset Registry](../../workspace/WORKSPACE_008_KNOWLEDGE_ASSET_REGISTRY.md) — Complete

### Registry maintenance

| Event | Action |
|-------|--------|
| Asset promoted | Add to `registry.ts`, update Knowledge Base Index, verify adoption matrix |
| Metadata changed | Update asset doc, registry seed, and index in same PR |
| Asset superseded | Set status, add `superseded_by`, update registry and dependent references |
| Quarterly review | Confirm `last_reviewed`, `next_review_due`, `linked_projects`; flag overdue assets |
| Product adoption change | Product lead confirms; update adoption matrix and `linked_projects` |

---

## Promotion candidate process

### Identifying candidates

Promotion candidates emerge from:

- Architecture audits that surface reusable patterns
- Feature delivery knowledge capture stages
- Repeated agent or engineering work across projects
- Formal reviews (e.g., ALIGNFIT-GOV-002 promotion candidate reviews)

### Candidate workflow

```
Project Artifact → Candidate → Reviewing → Promoted Standard → Company Standard
                                                      ↓
                                              Deprecated / Superseded
```

1. **Sponsor** identifies reuse hypothesis and names origin artifacts.
2. **Draft** generalized content in `docs/company/<category>/`.
3. **Review** against [promotion requirements](../PROMOTION_PROCESS.md#promotion-requirements).
4. **Promote** with complete metadata, index updates, and registry sync.
5. **Track** adoption across linked projects.

Use the [promotion checklist](../PROMOTION_PROCESS.md#promotion-checklist) for every submission.

---

## Promotion criteria

An asset should generally meet **all** criteria before promotion:

| Criterion | Description |
|-----------|-------------|
| Documented | Clear purpose, scope, and usage |
| Successfully implemented | Proven in a real system |
| Validated through real usage | UAT, production, or repeated agent runs |
| Reusable across multiple projects | Adaptable without rewrite |
| Clear ownership | Named owner for maintenance and review |
| Measurable value | Reduces defects, tokens, time, inconsistency, or onboarding cost |

Category-specific criteria: [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md) (per-category promotion criteria sections).

---

## Versioning policy

| Rule | Detail |
|------|--------|
| **Format** | Semver for substantive content changes (`1.0`, `1.1`, `2.0`) |
| **Patch-level** | Typo fixes, link updates — update `last_reviewed` only |
| **Minor** | Material additions, new sections, clarified guidance — bump minor version |
| **Major** | Breaking changes to required behavior or adoption expectations — bump major; notify linked projects |
| **Record** | Version in asset metadata block; note changes in review records when significant |

Breaking changes to promoted assets require linked-project impact analysis before merge.

---

## Deprecation policy

| Step | Action |
|------|--------|
| 1 | Engineering lead decision with documented rationale |
| 2 | Set status to **Deprecated** or **Superseded** |
| 3 | Add **superseded_by** link when replacement exists |
| 4 | Update Knowledge Base Index, registry, and operational docs that mandate the old asset |
| 5 | Retain file for history — do not delete without archive policy approval |
| 6 | Notify product leads for all `linked_projects` |

Deprecated assets remain readable for historical reference. New work must not reference deprecated assets without explicit exception.

---

## Cross-project applicability

### Adoption model

| Mode | Cross-project effect |
|------|---------------------|
| **Adopt** | Product uses standard unchanged |
| **Extend** | Product adds domain-specific layers documented locally |
| **Deviate** | Product documents intentional difference with review date |

### Reusability ratings

Metadata **reusability** field (`Low`, `Medium`, `High`) indicates expected cross-product applicability. High-reusability assets are default candidates for new product onboarding.

### Origin vs. linked projects

- **origin_project** — where the asset was first proven
- **linked_projects** — products that adopt, extend, or deviate

Origin project references (e.g., AlignFit coach evolution) are historical context. Promoted assets must be **product-agnostic** in their requirements and guidance.

---

## Knowledge lifecycle

```
Create (project work)
    ↓
Identify (candidate recognition)
    ↓
Generalize (remove product-specific assumptions)
    ↓
Review (promotion evaluation)
    ↓
Promote (canonical asset)
    ↓
Adopt (across products)
    ↓
Maintain (quarterly review)
    ↓
Evolve (version bump) or Retire (deprecate/supersede)
```

Knowledge capture is the final stage of [Feature Delivery](../playbooks/FEATURE_DELIVERY_STANDARD.md). Every significant delivery should ask: *What is reusable here?*

---

## Current inventory

**12 promoted assets** across 6 categories. See [Knowledge Base Index — Promoted assets](../KNOWLEDGE_BASE_INDEX.md#promoted-assets-quick-reference).

**Candidate future assets:** [Knowledge Base Roadmap — Candidate Future Assets](../KNOWLEDGE_BASE_ROADMAP.md#candidate-future-assets).

---

## Related

- [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md)
- [Governance Maturity Model](./GOVERNANCE_MATURITY_MODEL.md)
- [Knowledge Artifact Taxonomy](../knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md)
- [Governance Index](../GOVERNANCE_INDEX.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Knowledge Base Roadmap](../KNOWLEDGE_BASE_ROADMAP.md)
- [Documentation Governance](./DOCUMENTATION_GOVERNANCE.md)
