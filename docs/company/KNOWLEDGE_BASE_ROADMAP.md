# Aredir Labs Knowledge Base Roadmap

| Field | Value |
|-------|-------|
| **Document** | Knowledge Base Roadmap |
| **Owner** | Aredir Labs |
| **Last updated** | 2026-06-12 |
| **Source review** | [KB Review 2026 Q2](./reviews/KB_REVIEW_2026_Q2.md) (AREDIR-KB-008) |
| **Next review** | 2026-09-12 |

## Current State

### Promoted assets (9)

| Category | Asset | Version |
|----------|-------|---------|
| Architecture Pattern | AI Intelligence Architecture Pattern | 1.0 |
| Engineering Standard | Coding Agent Operating Standard | 1.0 |
| QA Standard | QA Engineering Framework | 1.0 |
| QA Standard | Root Cause Analysis Framework | 1.0 |
| AI Pattern | Context Builder Pattern | 1.0 |
| AI Pattern | Response Contract Pattern | 1.0 |
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

AI features add: Context Builder → Intelligence layers → Response Contract.

### Health snapshot (2026 Q2)

See [KB Review 2026 Q2](./reviews/KB_REVIEW_2026_Q2.md) for full audit. Summary:

- **Strong:** coverage, governance, AI methodology integration
- **Needs work:** canonical adoption in README/product docs, linked_projects accuracy, registry tooling

---

## Near-Term Priorities (2026 Q3)

Ordered — complete before major new promotions or WORKSPACE-008.

| Priority | Action | Owner | Target | Status |
|----------|--------|-------|--------|--------|
| 1 | **Documentation hygiene** — add `docs/company/` to README and `future-product-standards.md` | Engineering | Q3 2026 | Complete (AREDIR-KB-008A) |
| 2 | **Stale footer cleanup** — update recommended-next sections in promoted assets | Engineering | Q3 2026 | Complete (AREDIR-KB-008A) |
| 3 | **Cross-link pass** — AI Architecture Related section; QA → Feature Delivery links | Engineering | Q3 2026 | Complete (AREDIR-KB-008A) |
| 4 | **AlignFit adoption confirmation** — verify AI pattern adoption; update `linked_projects` | Product + Engineering | Q3 2026 | Pending |
| 5 | **Q3 quarterly review** — repeat KB_REVIEW process | Aredir Labs | 2026-09-12 | Scheduled |

**Next promotion:** AREDIR-KB-011 — AI Evaluation Framework (KB-010 complete).

| ID (proposed) | Asset | Category | Status |
|---------------|-------|----------|--------|
| AREDIR-KB-010 | Root Cause Analysis Framework | QA Standard | Complete |
| AREDIR-KB-011 | AI Evaluation Framework | AI Pattern | Planned |

---

## Candidate Future Assets

From [KB Review 2026 Q2 — Gap Analysis](./reviews/KB_REVIEW_2026_Q2.md#gap-analysis).

### High priority

| ID (proposed) | Asset | Category | Status |
|---------------|-------|----------|--------|
| AREDIR-KB-009 | Documentation Maintenance Standard | Documentation Standard | Complete |
| AREDIR-KB-010 | Root Cause Analysis Framework | QA Standard | Complete |
| AREDIR-KB-011 | AI Evaluation Framework | AI Pattern | Planned |
| AREDIR-KB-012 | Knowledge Capture Standard | Documentation Standard | Planned |

### Medium priority

| Asset | Category |
|-------|----------|
| Decision Record Standard | Documentation Standard |
| Root Cause Analysis Framework | QA Standard / Playbook |
| Release Management Playbook | Playbook |

### Low priority

| Asset | Category |
|-------|----------|
| Prompt Composition Pattern | AI Pattern |
| Provider Resolution Pattern | AI Pattern |
| Assessment Layer Pattern | AI Pattern |

---

## Registry Readiness

### Status: **Not Ready** for AREDIR-WORKSPACE-008

Criteria to reach **Ready**:

- [ ] Documentation hygiene complete (README + future-product-standards)
- [ ] ≥10 promoted assets **or** explicit decision to pilot registry at 7
- [ ] `linked_projects` validated for AlignFit at minimum
- [ ] Quarterly review process repeated once (Q3 2026)

### Minimum registry schema (approved for future build)

When WORKSPACE-008 proceeds, use fields defined in [KB Review — Registry Readiness](./reviews/KB_REVIEW_2026_Q2.md#knowledge-asset-registry-readiness-aredir-workspace-008):

`id`, `title`, `category`, `status`, `version`, `owner`, `linked_projects`, `origin_project`, `origin_artifacts`, `last_reviewed`, `next_review_due`, `path`, `reusability`

### Future governance tooling (documentation only)

- Knowledge Asset Registry (WORKSPACE-008)
- Asset Review Dashboard
- Promotion Workflow automation
- Asset Dependency Mapping

---

## Long-Term Vision

### Phase 1 — Foundation (complete)

Knowledge Base structure, seven promoted assets, governance, Feature Delivery playbook, first quarterly review.

### Phase 2 — Adoption & hygiene (2026 Q3–Q4)

Wire canonical docs into all product templates; honest adoption tracking; Documentation Maintenance Standard; optional 2–3 targeted promotions (AI Evaluation, Knowledge Capture).

### Phase 3 — Registry & workspace (2027)

AREDIR-WORKSPACE-008 Knowledge Asset Registry; review due-date visibility; linked_projects sync from workspace project registry; promotion workflow in workspace UI.

### Phase 4 — Scale (25+ assets)

Dependency mapping; automated metadata validation; Company Standard elevation based on adoption metrics; category owners and specialist review tracks.

### End state

Every Aredir Labs product **Adopts**, **Extends**, or **Deviate**-documents against shared company IP. Project work routinely feeds Knowledge Capture. Audits and delivery follow promoted playbooks. The registry makes company intellectual property as visible and maintained as the project portfolio.

---

## Related

- [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md)
- [Promotion Process](./PROMOTION_PROCESS.md)
- [Feature Delivery Standard](./playbooks/FEATURE_DELIVERY_STANDARD.md)
- [Implementation index](../prompts/implementation-index.md)
