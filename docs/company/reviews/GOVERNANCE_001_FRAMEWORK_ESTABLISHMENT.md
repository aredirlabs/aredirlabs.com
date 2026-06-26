# GOVERNANCE-001 — Engineering Governance Framework Establishment

**Status:** Complete  
**Owner:** Aredir Labs  
**Work item:** GOVERNANCE-001  
**Date:** 2026-06-25  
**Source review:** ALIGNFIT-GOV-002 Promotion Candidate Review (via [Knowledge Base Roadmap](../KNOWLEDGE_BASE_ROADMAP.md))

## Executive summary

GOVERNANCE-001 establishes Aredir Labs as the **authoritative engineering governance repository** for all current and future products. Rather than migrating AlignFit documents wholesale, this work performed an architectural governance review, consolidated overlapping guidance into a coherent eight-domain framework, and updated indexes and cross-references across the repository.

The Aredir Labs Knowledge Base already contained 12 promoted assets and mature promotion lifecycle governance. GOVERNANCE-001 adds the **orchestration layer** — domain governance documents that connect promoted assets, operational docs, and project-specific documentation into a single engineering operating system.

AlignFit retains all product-specific architecture, feature specifications, and domain implementation documentation.

---

## Documents created

| Document | Purpose |
|----------|---------|
| [Governance Index](../GOVERNANCE_INDEX.md) | Master governance hierarchy and entry point |
| [Company Governance](../governance/COMPANY_GOVERNANCE.md) | Philosophy, SDLC, decisions, PR/release, doc ownership, arch review |
| [Knowledge Governance](../governance/KNOWLEDGE_GOVERNANCE.md) | Registry, promotion, lifecycle, versioning, deprecation |
| [AI Governance](../governance/AI_GOVERNANCE.md) | Canonical AI engineering playbook |
| [Project Governance](../governance/PROJECT_GOVERNANCE.md) | Repo organization, docs hierarchy, branch/release workflow |
| [Engineering Governance](../governance/ENGINEERING_GOVERNANCE.md) | Quality, testing, DoD, production readiness |
| [Design Governance](../governance/DESIGN_GOVERNANCE.md) | Product-agnostic UX and design principles |
| [Documentation Governance](../governance/DOCUMENTATION_GOVERNANCE.md) | Ownership, naming, cross-linking, archives |
| [Architecture Governance](../governance/ARCHITECTURE_GOVERNANCE.md) | Intelligence pipeline, ownership, audits, reconciliation |
| This review | GOVERNANCE-001 establishment record |

---

## Documents updated

| Document | Changes |
|----------|---------|
| [README.md](../../../README.md) | Added Engineering Governance section with link to Governance Index |
| [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md) | Added Governance Framework section; updated structure tree |
| [Knowledge Base Roadmap](../KNOWLEDGE_BASE_ROADMAP.md) | Recorded GOVERNANCE-001 completion; updated near-term priorities |
| [Implementation index](../../prompts/implementation-index.md) | Added GOVERNANCE-001 work item; added workspace items 007A, 007B, 008 |
| [Future product standards](../../architecture/future-product-standards.md) | Added Governance Index to must-carry-forward references |

---

## Documents left intentionally in AlignFit

The AlignFit repository (`aredirlabs/alignfit`) was not directly inspected in this work item. Based on migration rules, ALIGNFIT-GOV-002 review outcomes, and Knowledge Base scope definitions, the following categories **remain AlignFit-owned**:

| Category | Examples | Reasoning |
|----------|----------|-----------|
| **Nutrition architecture** | Macro models, meal planning, nutrition advisor logic | Domain-specific; not reusable without rewrite |
| **Coach architecture** | Coach subsystem design, advisor roles, coach UX flows | Product domain; origin artifacts (COACH-ARCH-*, COACH-INTEL-*) stay as provenance references |
| **Training architecture** | Workout programming, periodization, training load | Domain-specific fitness logic |
| **Calendar implementation** | Calendar orchestration, scheduling contracts | Deferred promotion candidate — domain-specific ([KB Roadmap](../KNOWLEDGE_BASE_ROADMAP.md)) |
| **Feature specifications** | Individual feature specs and acceptance criteria | Implementation tier; per-feature |
| **UI specifications** | Screen-level mockups and product-specific layouts | Product-owned design artifacts |
| **Implementation prompts** | Feature-specific agent prompts and bug-fix prompts | Ephemeral task prompts, not governed assets |
| **Product decisions** | AlignFit-specific decision logs and milestone notes | Implementation tier unless promoted |
| **Reconciliation Capability Framework** | Multi-source conflict resolution (AlignFit-specific) | Deferred — insufficient cross-product validation |
| **Application-Owned Intelligence Pipeline** | Standalone candidate doc | Merged into [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) v1.1 |

### What AlignFit should consume from Aredir Labs

AlignFit should **Adopt** (not duplicate) all promoted Knowledge Base assets and governance framework docs by syncing `docs/company/` from the Aredir Labs template. Operational docs implement these standards locally.

AlignFit origin references in promoted assets are **historical provenance** — they document where patterns were first proven, not product-specific requirements.

---

## Governance hierarchy introduced

```
Engineering Governance Index
         │
         ├── Company Governance
         ├── Knowledge Governance      ← implements Promotion Process + Registry
         ├── AI Governance             ← orchestrates 6 AI-related KB assets
         ├── Project Governance
         ├── Engineering Governance    ← orchestrates QA + Coding Agent standards
         ├── Design Governance
         ├── Documentation Governance  ← implements Documentation Maintenance Standard
         └── Architecture Governance   ← implements Architecture Audit Standard + patterns
                  │
                  ↓
         12 Promoted Knowledge Base Assets
                  │
                  ↓
         Operational docs (agent, qa, engineering, architecture)
                  │
                  ↓
         Project-specific docs (product repos)
```

---

## Consolidation decisions

| Overlap | Resolution |
|---------|------------|
| Knowledge lifecycle in Promotion Process vs new Knowledge Governance | Promotion Process remains **canonical** for lifecycle tables and checklists; Knowledge Governance provides governance-layer overview and registry maintenance |
| AI patterns vs AI Governance | Individual patterns remain promoted assets; AI Governance is the **playbook** connecting them |
| Documentation Maintenance vs Documentation Governance | Maintenance Standard remains **canonical** for sync procedures; Documentation Governance adds ownership, naming, and archive policy |
| Architecture Audit Standard vs Architecture Governance | Audit Standard remains **canonical** for methodology; Architecture Governance adds pipeline, ownership, and reconciliation context |
| Feature Delivery vs Company Governance SDLC | Feature Delivery remains **canonical playbook**; Company Governance references it for SDLC summary |
| UI patterns / component guidelines vs Design Governance | Operational docs remain implementation references; Design Governance extracts product-agnostic principles |

No duplicate governance documents were created for content already canonical in promoted assets. Domain governance docs **orchestrate and link** — they do not replace promoted standards.

---

## Recommended follow-up governance work

| Priority | Work item | Category | Notes |
|----------|-----------|----------|-------|
| High | AREDIR-KB-016 Knowledge Capture Standard | Documentation Standard | Planned in KB Roadmap |
| High | AlignFit repo adoption audit | Maintenance | Direct inspection of `aredirlabs/alignfit` to confirm `docs/company/` sync |
| Medium | Decision Record Standard | Documentation Standard | Formalize ADR format referenced in Project Governance |
| Medium | Release Management Playbook | Playbook | Expand deployment-workflow into promoted playbook |
| Medium | Deployment Standards folder | Deployment Standard | Promote environment-strategy and deployment-workflow |
| Low | Prompt library promotion | Prompt Asset | Per WORKSPACE-007B conventions |
| Scheduled | Q3 quarterly KB review | Review | 2026-09-12 — first review including governance framework |

---

## Verification results

| Check | Result |
|-------|--------|
| Internal references | All governance doc cross-links verified against existing paths |
| Indexes updated | README, Knowledge Base Index, Implementation index, KB Roadmap, future-product-standards |
| Governance hierarchy coherent | Eight domains with clear canonical/operational/implementation separation |
| No duplicate governance documents | Domain docs orchestrate; promoted assets remain canonical for detailed methodology |
| Reusable standards product-agnostic | Governance docs use generic language; AlignFit cited only as origin example in Architecture Governance deferred table |
| Product-specific content in AlignFit | Documented in "Documents left intentionally in AlignFit" section |
| Knowledge registry accuracy | No registry changes required — governance framework docs are not promoted KB assets |
| Lint/build | Documentation-only changes; no code impact |

---

## Related

- [Governance Index](../GOVERNANCE_INDEX.md)
- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Knowledge Base Roadmap](../KNOWLEDGE_BASE_ROADMAP.md)
- [KB 013 Registry Prerequisite Cleanup](./KB_013_REGISTRY_PREREQUISITE_CLEANUP.md)
- [Implementation index](../../prompts/implementation-index.md)
