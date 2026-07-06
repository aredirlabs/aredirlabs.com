# AREDIR-KB-019 — Evidence Lifecycle Pattern Promotion

**Status:** Complete  
**Owner:** Aredir Labs  
**Work item:** AREDIR-KB-019  
**Date:** 2026-07-06  
**Source:** Cross-domain evidence lifecycle synthesis; Architecture Governance; AREDIR-KB-018 complementary standard

## Executive summary

AREDIR-KB-019 promotes the **Evidence Lifecycle Pattern** — the first **Knowledge Pattern** in the Aredir Labs Knowledge Base. The pattern defines the canonical cyclical lifecycle by which observations become evidence, evidence becomes knowledge through interpretation, knowledge informs human decisions, and outcomes generate new observations.

Unlike AI-specific patterns, this standard applies to any evidence-driven decision process: software engineering, scientific research, quality assurance, business intelligence, operational intelligence, financial analysis, education, risk assessment, and knowledge management.

The promoted asset establishes a new KB category (`knowledge-patterns/`) and complements the Evidence-Aware AI Advisor Pattern: the lifecycle governs **how understanding is created**; the advisor pattern governs **how understanding is communicated** when AI participates.

---

## Promotion Candidate Review

### Candidate

| Field | Value |
|-------|-------|
| **Asset** | Evidence Lifecycle Pattern |
| **Category** | Knowledge Pattern |
| **Origin** | Aredir Labs (Architecture Governance, AREDIR-KB-018 synthesis) |
| **Proposed ID** | AREDIR-KB-019 |

### Rationale for promotion

| Criterion | Assessment |
|-----------|------------|
| **Architectural origin** | Repeated project work surfaced confusion between observations, evidence, interpretation, knowledge, and decisions — collapsing stages reduced trust and blocked organizational learning |
| **Cross-domain applicability** | Lifecycle stages are technology-agnostic and product-agnostic; valid for QA, research, BI, operations, finance, education, and AI systems alike |
| **Distinct from existing assets** | Not AI-specific (unlike AI Patterns); not computation topology (unlike Intelligence Architecture); not communication layer (unlike Evidence-Aware AI Advisor) |
| **Governance gap** | No prior promoted asset defined the universal evidence-to-knowledge lifecycle with historical integrity and cyclical learning requirements |
| **Complements KB-018** | Advisor pattern addresses communication; lifecycle pattern addresses creation and evolution of understanding |
| **New category justified** | Pattern is foundational knowledge architecture — distinct from architecture patterns (system design), AI patterns (AI behavior), and documentation standards (doc methodology) |

### Architectural origin

| Discovery | Pattern response |
|-----------|------------------|
| Systems treated conclusions as observations | Section 2 — stage definitions and boundaries |
| Understanding changed without preserved history | Section 3 — historical integrity |
| Evidence updates silently rewrote prior records | Section 4 — evidence evolution vs history change |
| Uncertainty hidden until decisions failed | Section 5 — stage-specific uncertainty |
| No feedback from outcomes to future evidence | Section 2 — Outcome → Observation cycle; Section 6 — organizational learning |
| AI outputs mistaken for organizational knowledge | Section 7 — AI participation boundaries |

### Promotion decision

**Promoted** as Knowledge Pattern — first asset in new `knowledge-patterns/` category.

### Relationships to existing promoted assets

| Asset | Relationship |
|-------|--------------|
| Evidence-Aware AI Advisor Pattern | Downstream communication standard; lifecycle is upstream creation model |
| AI Intelligence Architecture Pattern | Implements Facts → Assessments → Insights → Recommendations within application layers; lifecycle is the universal model those stages serve |
| Architecture Governance | Operationalizes facts-to-narrative pipeline; lifecycle generalizes the evidence reasoning chain |
| Root Cause Analysis Framework | QA application of observation → evidence → interpretation → knowledge |
| Architecture Audit Standard | Audit methodology produces evidence for architectural knowledge states |
| Workspace-First AI Experience Pattern | Surfaces where lifecycle outputs are encountered |
| Human + AI Advisor Workspace Pattern | Shared records where lifecycle stages accumulate over time |

---

## Documents created

| Document | Purpose |
|----------|---------|
| [Evidence Lifecycle Pattern](../knowledge-patterns/EVIDENCE_LIFECYCLE_PATTERN.md) | Promoted Knowledge Pattern standard |
| This review | Promotion and implementation record |

---

## Documents updated

| Document | Changes |
|----------|---------|
| `src/lib/knowledge-assets/types.ts` | New `knowledge_pattern` category |
| `src/lib/knowledge-assets/labels.ts` | Category label |
| `src/lib/knowledge-assets/registry.ts` | Registry seed entry |
| [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md) | Structure, Knowledge Patterns section, promoted tree, reviews, related |
| [Knowledge Base Roadmap](../KNOWLEDGE_BASE_ROADMAP.md) | 15 promoted assets; 7 categories; AREDIR-KB-019 |
| [Implementation index](../../prompts/implementation-index.md) | AREDIR-KB-019 work item |
| [Knowledge Asset Registry](../../workspace/WORKSPACE_008_KNOWLEDGE_ASSET_REGISTRY.md) | Asset count and seeded catalog |
| [Knowledge Governance](../governance/KNOWLEDGE_GOVERNANCE.md) | Asset and category counts |
| [Promotion Process](../PROMOTION_PROCESS.md) | Related promoted assets |
| [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md) | Promoted asset count |
| [Governance Maturity Model](../governance/GOVERNANCE_MATURITY_MODEL.md) | Promoted asset count |
| [Evidence-Aware AI Advisor Pattern](../ai-patterns/EVIDENCE_AWARE_AI_ADVISOR_PATTERN.md) | Cross-reference to lifecycle pattern |

---

## Recommended future promotions

| Priority | Candidate | Rationale |
|----------|-----------|-----------|
| High | AREDIR-KB-016 Knowledge Capture Standard | Operationalizes lifecycle closure from decisions to documented knowledge |
| Medium | Decision record standard | Formalize Section 2 Decision stage with audit templates |
| Medium | Evidence provenance standard | Operationalize Section 2 Evidence selection and Section 4 quality tracking |

---

## Related

- [Evidence Lifecycle Pattern](../knowledge-patterns/EVIDENCE_LIFECYCLE_PATTERN.md)
- [Evidence-Aware AI Advisor Pattern](../ai-patterns/EVIDENCE_AWARE_AI_ADVISOR_PATTERN.md)
- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Knowledge Base Roadmap](../KNOWLEDGE_BASE_ROADMAP.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
