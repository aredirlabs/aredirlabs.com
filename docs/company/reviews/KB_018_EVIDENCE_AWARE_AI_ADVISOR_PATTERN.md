# AREDIR-KB-018 — Evidence-Aware AI Advisor Pattern Promotion

**Status:** Complete  
**Owner:** Aredir Labs  
**Work item:** AREDIR-KB-018  
**Date:** 2026-07-06  
**Source:** AlignFit intelligence interpretation evolution (COACH-INTEL-001, COACH-INTEL-002, COACH-INTEL-003)

## Executive summary

AREDIR-KB-018 promotes the **Evidence-Aware AI Advisor Pattern** — a technology-agnostic and product-agnostic standard governing how AI systems interpret, communicate, and evolve knowledge without becoming the authority themselves.

Repeated work on evidence-aware advisor systems demonstrated that trustworthy AI guidance requires explicit separation between reality, model state, interpretation, and human decision. It also requires independent evaluation of evidence quality, relevance, and currency; preserved historical reasoning; and professional boundaries that prevent advisors from substituting for domain experts.

The promoted asset completes a gap in the AI methodology stack: existing patterns define intelligence computation, output contracts, evaluation, workspace surfaces, and multi-advisor collaboration — but not the **communication and evolution principles** an evidence-aware advisor must follow when presenting knowledge to humans.

---

## Promotion Candidate Review

### Candidate

| Field | Value |
|-------|-------|
| **Asset** | Evidence-Aware AI Advisor Pattern |
| **Category** | AI Pattern |
| **Origin** | AlignFit (COACH-INTEL-001, COACH-INTEL-002, COACH-INTEL-003) |
| **Proposed ID** | AREDIR-KB-018 |

### Rationale for promotion

| Criterion | Assessment |
|-----------|------------|
| **Production validation** | AlignFit intelligence evolution repeatedly surfaced failures when advisors presented conclusions without evidence, hid uncertainty, or silently changed recommendations |
| **Cross-domain reuse** | Principles apply to operational intelligence, education, financial decision support, research platforms, risk assessment, and any evidence-aware advisor — without domain-specific schemas |
| **Distinct from existing assets** | Complements Response Contract (single-response boundary), Human + AI Advisor Workspace (multi-participant record), and Intelligence Architecture (computation pipeline) without duplicating them |
| **Governance gap** | No prior promoted asset defined evidence dimensions, knowledge evolution transparency, historical integrity, and professional boundaries as a unified advisor communication standard |
| **Technology-agnostic** | No framework, model, or implementation references in the pattern body |
| **Prevents anti-pattern** | Teams default to oracle-style AI that sounds authoritative; this documents the proven alternative |

### Source architectural discoveries

| Discovery | Pattern response |
|-----------|------------------|
| Users distrust advisors that overstate certainty | Section 3 (evidence dimensions), Section 6 (trust architecture) |
| Recommendations changed without user-visible rationale | Section 4 (knowledge evolution), Section 8 (historical integrity) |
| Narrative collapsed observation and interpretation | Section 2 (canonical architecture), Core Principle |
| Advisors substituted for professional judgment | Section 7 (professional boundaries) |
| Users could not audit why guidance existed | Section 5 (transparency), Section 9 (explainability) |

### Promotion decision

**Promoted** as AI Pattern — evidence communication and evolution standard for AI advisors.

### Relationships to existing promoted assets

| Asset | Relationship |
|-------|--------------|
| AI Intelligence Architecture Pattern | Upstream computation pipeline (Facts → Assessments → Insights → Recommendations); this pattern governs downstream human-facing interpretation |
| Context Builder Pattern | Defines bounded inputs; this pattern defines how evidence derived from those inputs is communicated |
| Response Contract Pattern | Closed-world single-response boundary; this pattern extends to temporal evolution, confidence, and evidence traceability |
| AI Evaluation Framework | Validates output quality; this pattern defines what "quality" means for evidence-aware communication |
| Workspace-First AI Experience Pattern | Surface topology; this pattern defines how evidence and uncertainty appear on those surfaces |
| Human + AI Advisor Workspace Pattern | Multi-advisor collaboration; this pattern ensures each contributor's output remains evidence-aware |

---

## Documents created

| Document | Purpose |
|----------|---------|
| [Evidence-Aware AI Advisor Pattern](../ai-patterns/EVIDENCE_AWARE_AI_ADVISOR_PATTERN.md) | Promoted AI pattern standard |
| This review | Promotion and implementation record |

---

## Documents updated

| Document | Changes |
|----------|---------|
| [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md) | AI Patterns examples; promoted assets tree; reviews section; related links |
| [Knowledge Base Roadmap](../KNOWLEDGE_BASE_ROADMAP.md) | 14 promoted assets; AREDIR-KB-018 completion |
| [Implementation index](../../prompts/implementation-index.md) | AREDIR-KB-018 work item |
| [Knowledge Asset Registry](../../workspace/WORKSPACE_008_KNOWLEDGE_ASSET_REGISTRY.md) | Asset count and seeded catalog |
| [Knowledge Governance](../governance/KNOWLEDGE_GOVERNANCE.md) | Promoted asset count |
| [AI Governance](../governance/AI_GOVERNANCE.md) | Related promoted assets table |
| [Promotion Process](../PROMOTION_PROCESS.md) | Related promoted assets |
| [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md) | Promoted asset count |
| [Governance Maturity Model](../governance/GOVERNANCE_MATURITY_MODEL.md) | Promoted asset count |
| `src/lib/knowledge-assets/registry.ts` | Registry seed entry |

---

## Recommended follow-up promotions

| Priority | Candidate | Rationale |
|----------|-----------|-----------|
| High | AREDIR-KB-016 Knowledge Capture Standard | Closes documentation lifecycle gap; complements this pattern's knowledge evolution requirements |
| Medium | Confidence calibration standard | Operationalize Section 3 evidence dimensions in evaluation scenarios |
| Medium | Advisor audit trail pattern | Extend Section 8 historical integrity with implementation guidance |

---

## Related

- [Evidence-Aware AI Advisor Pattern](../ai-patterns/EVIDENCE_AWARE_AI_ADVISOR_PATTERN.md)
- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Knowledge Base Roadmap](../KNOWLEDGE_BASE_ROADMAP.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [Response Contract Pattern](../ai-patterns/RESPONSE_CONTRACT_PATTERN.md)
- [Human + AI Advisor Workspace Pattern](../ai-patterns/HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md)
- [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md)
