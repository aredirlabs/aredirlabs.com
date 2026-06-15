# Aredir Labs Knowledge Base Roadmap

| Field | Value |
|-------|-------|
| **Document** | Knowledge Base Roadmap |
| **Owner** | Aredir Labs |
| **Last updated** | 2026-06-12 |
| **Source review** | [KB 013 Registry Prerequisite Cleanup](./reviews/KB_013_REGISTRY_PREREQUISITE_CLEANUP.md) (AREDIR-KB-013) |
| **Next review** | 2026-09-12 |

## Current State

### Promoted assets (10)

| Category | Asset | Version |
|----------|-------|---------|
| Architecture Pattern | AI Intelligence Architecture Pattern | 1.0 |
| Engineering Standard | Coding Agent Operating Standard | 1.0 |
| QA Standard | QA Engineering Framework | 1.0 |
| QA Standard | Root Cause Analysis Framework | 1.0 |
| AI Pattern | Context Builder Pattern | 1.0 |
| AI Pattern | Response Contract Pattern | 1.0 |
| AI Pattern | AI Evaluation Framework | 1.0 |
| Documentation Standard | Architecture Audit Standard | 1.0 |
| Documentation Standard | Documentation Maintenance Standard | 1.0 |
| Playbook | Feature Delivery Standard | 1.0 |

### Governance

- [Promotion Process](./PROMOTION_PROCESS.md) — Company Standard; includes Knowledge Asset Governance
- Asset lifecycle, metadata, quarterly review cadence, adoption model (Adopt / Extend / Deviate)
- Documentation hierarchy: `docs/company/` canonical; operational docs implement

### Operating model maturity

The Knowledge Base provides a **complete v1 operating model**:

```
Architecture Audit → Feature Delivery → Coding Agent + QA → Knowledge Capture → Promotion
```

AI features add: Context Builder → Intelligence layers → Response Contract → AI Evaluation.

### Health snapshot (2026 Q2–Q3)

See [KB Review 2026 Q2](./reviews/KB_REVIEW_2026_Q2.md) and [Registry Prerequisite Cleanup](./reviews/KB_013_REGISTRY_PREREQUISITE_CLEANUP.md). Summary:

- **Strong:** 10 promoted assets, complete AI methodology, governance, documentation hygiene
- **Resolved (KB-013):** stale footers, roadmap sync, honest `linked_projects`
- **Next:** Knowledge Asset Registry (WORKSPACE-008); Q3 quarterly review (2026-09-12)

---

## Near-Term Priorities (2026 Q3)

Ordered — registry prerequisites complete; proceed to WORKSPACE-008.

| Priority | Action | Owner | Target | Status |
|----------|--------|-------|--------|--------|
| 1 | **Documentation hygiene** — add `docs/company/` to README and `future-product-standards.md` | Engineering | Q3 2026 | Complete (AREDIR-KB-008A) |
| 2 | **Stale footer cleanup** — update recommended-next sections in promoted assets | Engineering | Q3 2026 | Complete (AREDIR-KB-013) |
| 3 | **Cross-link pass** — AI Architecture Related section; QA → Feature Delivery links | Engineering | Q3 2026 | Complete (AREDIR-KB-008A) |
| 4 | **AlignFit adoption confirmation** — verify AI pattern adoption; update `linked_projects` | Product + Engineering | Q3 2026 | Complete (AREDIR-KB-013) |
| 5 | **Registry readiness review** — assess WORKSPACE-008 justification | Engineering | Q3 2026 | Complete (AREDIR-KB-012) |
| 6 | **Registry prerequisite cleanup** — adoption validation, metadata sync | Engineering | Q3 2026 | Complete (AREDIR-KB-013) |
| 7 | **Knowledge Asset Registry** — Governance Registry scope | Engineering | Q3 2026 | **Next (AREDIR-WORKSPACE-008)** |
| 8 | **Q3 quarterly review** — repeat KB_REVIEW process | Aredir Labs | 2026-09-12 | Scheduled |

### Completed KB work items

| ID | Asset / Work | Category | Status |
|----|--------------|----------|--------|
| AREDIR-KB-009 | Documentation Maintenance Standard | Documentation Standard | Complete |
| AREDIR-KB-010 | Root Cause Analysis Framework | QA Standard | Complete |
| AREDIR-KB-011 | AI Evaluation Framework | AI Pattern | Complete |
| AREDIR-KB-012 | Knowledge Asset Registry Readiness Review | Review | Complete |
| AREDIR-KB-013 | Registry Prerequisite Cleanup | Review | Complete |

**Next work item:** AREDIR-WORKSPACE-008 — Knowledge Asset Registry.

---

## Candidate Future Assets

From [KB Review 2026 Q2 — Gap Analysis](./reviews/KB_REVIEW_2026_Q2.md#gap-analysis). Updated after KB-011 completion.

### High priority

| ID (proposed) | Asset | Category | Status |
|---------------|-------|----------|--------|
| AREDIR-KB-014 | Knowledge Capture Standard | Documentation Standard | Planned |

### Medium priority

| Asset | Category |
|-------|----------|
| Decision Record Standard | Documentation Standard |
| Release Management Playbook | Playbook |

### Low priority

| Asset | Category |
|-------|----------|
| Prompt Composition Pattern | AI Pattern |
| Provider Resolution Pattern | AI Pattern |
| Assessment Layer Pattern | AI Pattern |
| Recommendation Ownership Pattern | AI Pattern |
| AI Regression Testing Playbook | Playbook |

---

## Registry Readiness

### Status: **Ready** for AREDIR-WORKSPACE-008

Per [Registry Prerequisite Cleanup](./reviews/KB_013_REGISTRY_PREREQUISITE_CLEANUP.md) (AREDIR-KB-013).

| Criterion | Status |
|-----------|--------|
| Documentation hygiene complete | Met (KB-008A) |
| ≥10 promoted assets | Met (10 assets) |
| `linked_projects` validated for AlignFit | Met (KB-013) |
| Stale recommendations resolved | Met (KB-013) |
| Roadmap synchronized | Met (KB-013) |
| Registry value confirmed | Met (KB-012) |
| Quarterly review repeated | Scheduled (2026-09-12) — not blocking |

### Approved registry scope

**Governance Registry** — catalog, category browse, review due dates, adoption per project, canonical path links. See [Knowledge Asset Registry Roadmap](./KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md).

### Minimum registry schema

`id`, `title`, `category`, `status`, `version`, `owner`, `linked_projects`, `origin_project`, `origin_artifacts`, `last_reviewed`, `next_review_due`, `path`, `reusability`

### Future governance tooling (documentation only)

- Knowledge Asset Registry (WORKSPACE-008) — **approved, next**
- Asset Review Dashboard
- Promotion Workflow automation
- Asset Dependency Mapping

---

## Long-Term Vision

### Phase 1 — Foundation (complete)

Knowledge Base structure, governance, Feature Delivery playbook, first quarterly review.

### Phase 2 — Adoption & hygiene (complete)

Ten promoted assets, complete AI methodology, documentation hygiene, honest adoption metadata, registry readiness confirmed.

### Phase 3 — Registry & workspace (2026 Q3–Q4)

AREDIR-WORKSPACE-008 Knowledge Asset Registry; review due-date visibility; adoption matrix in workspace UI.

### Phase 4 — Scale (25+ assets)

Dependency mapping; automated metadata validation; Company Standard elevation based on adoption metrics; category owners and specialist review tracks.

### End state

Every Aredir Labs product **Adopts**, **Extends**, or **Deviate**-documents against shared company IP. Project work routinely feeds Knowledge Capture. Audits and delivery follow promoted playbooks. The registry makes company intellectual property as visible and maintained as the project portfolio.

---

## Related

- [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md)
- [Knowledge Asset Registry Roadmap](./KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md)
- [Knowledge Asset Registry Readiness Review](./reviews/KNOWLEDGE_ASSET_REGISTRY_READINESS_REVIEW.md)
- [KB 013 Registry Prerequisite Cleanup](./reviews/KB_013_REGISTRY_PREREQUISITE_CLEANUP.md)
- [Promotion Process](./PROMOTION_PROCESS.md)
- [Feature Delivery Standard](./playbooks/FEATURE_DELIVERY_STANDARD.md)
- [Implementation index](../prompts/implementation-index.md)
