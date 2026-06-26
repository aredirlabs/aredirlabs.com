# EOS-003 — Project Inheritance Model Establishment

**Status:** Complete  
**Owner:** Aredir Labs  
**Work item:** EOS-003  
**Date:** 2026-06-25  
**Prerequisite:** [EOS-002 Capability Model](./EOS_002_CAPABILITY_MODEL.md)

## Executive summary

EOS-003 establishes the **Project Inheritance Model** — the repeatable onboarding methodology for how every Aredir Labs repository consumes the Engineering Operating System without redefining it.

The model documents repository lifecycle, bootstrap checklist, ownership boundaries, inheritance matrix, project maturity progression, and the cyclical knowledge feedback loop. AlignFit is identified as the current reference implementation.

---

## Repository lifecycle

```
Idea → Project Proposal → Repository Creation → Bootstrap → EOS Inheritance
  → Architecture → Implementation → Verification → Release → Operations
  → Knowledge Capture → Promotion Review → EOS → Future Projects
```

Knowledge flows back into the EOS — inheritance is cyclical, not one-way.

Full detail: [Project Inheritance Model](../PROJECT_INHERITANCE_MODEL.md).

---

## Ownership model

| Owner | Assets |
|-------|--------|
| **Company** | EOS, governance, Knowledge Base, frameworks, standards, patterns, playbooks, reference architectures, template, methodology |
| **Repository** | Domain architecture, feature specs, implementation records, ADRs, product docs, roadmaps, release notes, domain models |
| **Promotion path** | Reusable discoveries → Knowledge Governance lifecycle |

---

## Inheritance matrix

Summary — full matrix in [Project Inheritance Model](../PROJECT_INHERITANCE_MODEL.md):

| Asset | Project copies? | Project extends? |
|-------|:---------------:|:--------------:|
| EOS | Reference | No |
| Governance | Reference | Limited |
| Standards | Sync | Rarely |
| Patterns | Reference | Sometimes |
| Playbooks | Reference | No |
| Architecture | Yes | Yes |
| Feature Specs / ADRs | Yes | Yes |

---

## Knowledge feedback loop

```
Projects → Experience → Reviews → Knowledge Capture → Promotion → EOS → Future Projects
```

---

## Documents created

| Document | Purpose |
|----------|---------|
| [Project Inheritance Model](../PROJECT_INHERITANCE_MODEL.md) | Onboarding methodology for all repositories |
| This review | EOS-003 establishment record |

---

## Documents updated

| Document | Changes |
|----------|---------|
| [ENGINEERING_OPERATING_SYSTEM.md](../ENGINEERING_OPERATING_SYSTEM.md) | Inheritance model entry point; fixed metadata typo |
| [ENGINEERING_CAPABILITY_MODEL.md](../ENGINEERING_CAPABILITY_MODEL.md) | Inheritance cross-link |
| [GOVERNANCE_INDEX.md](../GOVERNANCE_INDEX.md) | Inheritance model in EOS navigation |
| [KNOWLEDGE_BASE_INDEX.md](../KNOWLEDGE_BASE_INDEX.md) | EOS inheritance section |
| [KNOWLEDGE_BASE_ROADMAP.md](../KNOWLEDGE_BASE_ROADMAP.md) | EOS-003 completion |
| [implementation-index.md](../../prompts/implementation-index.md) | EOS-003 work item |
| [README.md](../../../README.md) | Project Inheritance Model link |
| [future-product-standards.md](../../architecture/future-product-standards.md) | Canonical inheritance reference |

Registry seed unchanged.

---

## Verification

| Check | Result |
|-------|--------|
| Terminology consistent | Capabilities, governance, inheritance distinct |
| No governance duplication | References only |
| Ownership clear | Company vs repository vs promotion tables |
| Lifecycle aligns with EOS | Matches Feature Delivery + knowledge capture |
| Internal links | All paths verified |
| Indexes updated | README, KB Index, Roadmap, Implementation index |
| `npm run lint` | Pass |
| `npm run build` | Pass |

---

## Follow-up recommendations

| Priority | Work item |
|----------|-----------|
| High | Direct AlignFit repo audit — confirm `docs/company/` sync and reference project status |
| Medium | Template sync script or documented pull procedure for product repos |
| Medium | AREDIR-KB-016 Knowledge Capture Standard |
| Scheduled | Q3 inheritance assessment at quarterly review — 2026-09-12 |

---

## Related

- [Project Inheritance Model](../PROJECT_INHERITANCE_MODEL.md)
- [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md)
- [EOS-002 Review](./EOS_002_CAPABILITY_MODEL.md)
