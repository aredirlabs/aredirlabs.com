# EOS-002 — Engineering Capability Model Establishment

**Status:** Complete  
**Owner:** Aredir Labs  
**Work item:** EOS-002  
**Date:** 2026-06-25  
**Prerequisite:** [EOS-001 Operating System Establishment](./EOS_001_OPERATING_SYSTEM_ESTABLISHMENT.md)

## Executive summary

EOS-002 completes the Engineering Operating System by introducing an explicit **Engineering Capability Model** — the organizational layer between EOS vision and the artifacts (frameworks, standards, patterns, playbooks) that implement it.

Ten active capabilities were defined with purpose, scope, outcomes, ownership, supporting artifact references, maturity expectations, and inter-capability relationships. Six future capabilities were marked as intentionally deferred. Governance remains distributed across capabilities via existing domain docs — no duplication of governance content.

---

## Capability model overview

Capabilities answer *what Aredir Labs must consistently be able to do*. They are organizational competencies, not documents.

```
Vision → Principles → Capabilities → Frameworks → Standards → Patterns → Playbooks → Reference Architectures → Projects
```

Governance is implemented through capabilities (Knowledge Governance → Knowledge Management, etc.) — not a separate layer above them.

Full model: [Engineering Capability Model](../ENGINEERING_CAPABILITY_MODEL.md).

---

## Capability definitions

| # | Capability | Primary governance support |
|---|------------|---------------------------|
| 1 | Product Strategy | Company Governance |
| 2 | Architecture | Architecture Governance |
| 3 | Knowledge Management | Knowledge Governance |
| 4 | AI Engineering | AI Governance |
| 5 | Quality Engineering | Engineering Governance |
| 6 | Documentation | Documentation Governance |
| 7 | Design | Design Governance |
| 8 | Delivery | Company, Project, Engineering Governance |
| 9 | Operations | Engineering Governance |
| 10 | Security | Engineering Governance (placeholder) |

Deferred: Data Engineering, Platform Engineering, DevEx, Research & Innovation, Customer Experience, Analytics.

---

## Relationship map

Cross-reference matrix and interaction map included in [Engineering Capability Model](../ENGINEERING_CAPABILITY_MODEL.md):

- **Matrix** — which frameworks, standards, patterns, and playbooks support each capability
- **Interaction map** — typical flow from Product Strategy through Delivery to Knowledge Management
- **Security** — cross-cutting baseline spanning all capabilities

---

## Documents created

| Document | Purpose |
|----------|---------|
| [Engineering Capability Model](../ENGINEERING_CAPABILITY_MODEL.md) | Ten active capabilities + six deferred |
| This review | EOS-002 establishment record |

---

## Documents updated

| Document | Changes |
|----------|---------|
| [ENGINEERING_OPERATING_SYSTEM.md](../ENGINEERING_OPERATING_SYSTEM.md) | Capabilities layer in EOS structure and hierarchy |
| [GOVERNANCE_INDEX.md](../GOVERNANCE_INDEX.md) | Capability model in EOS hierarchy; governance-to-capability mapping |
| [KNOWLEDGE_BASE_INDEX.md](../KNOWLEDGE_BASE_INDEX.md) | EOS capabilities section |
| [KNOWLEDGE_BASE_ROADMAP.md](../KNOWLEDGE_BASE_ROADMAP.md) | EOS-002 completion |
| [implementation-index.md](../../prompts/implementation-index.md) | EOS-002 work item |
| [README.md](../../../README.md) | Capability model link |

Registry seed unchanged — capability model is EOS orchestration, not a promoted KB asset.

---

## Verification

| Check | Result |
|-------|--------|
| No conflicting terminology | Capabilities distinct from artifact types (taxonomy) and governance domains |
| Governance hierarchy coherent | Governance distributed across capabilities; GOVERNANCE_INDEX updated |
| No duplicate content | References only; no governance doc rewrites |
| Internal links | All paths verified |
| Indexes updated | README, KB Index, Roadmap, Implementation index |
| `npm run lint` | Pass |
| `npm run build` | Pass |

---

## Follow-up recommendations

| Priority | Work item |
|----------|-----------|
| Medium | Promote Security Standard when cross-product baseline is defined |
| Medium | Incident response playbook (Operations capability) |
| Medium | Release Management Playbook promotion (Delivery capability) |
| Low | Evaluate deferred capabilities at Q3 quarterly review |
| Scheduled | Q3 EOS + capability model review — 2026-09-12 |

---

## Related

- [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md)
- [Engineering Capability Model](../ENGINEERING_CAPABILITY_MODEL.md)
- [Governance Index](../GOVERNANCE_INDEX.md)
- [EOS-001 Review](./EOS_001_OPERATING_SYSTEM_ESTABLISHMENT.md)
