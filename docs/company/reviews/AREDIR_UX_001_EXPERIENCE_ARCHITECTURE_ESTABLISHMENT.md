# AREDIR-UX-001 — Workspace Experience Architecture Establishment

**Status:** Complete  
**Owner:** Aredir Labs  
**Work item:** IMPLEMENTATION-XXX / AREDIR-UX-001  
**Promotion work item:** AREDIR-KB-017  
**Date:** 2026-06-25  
**Source:** AlignFit workspace evolution (COACH-UX-001, COACH_EXPERIENCE_ARCHITECTURE)

## Executive summary

IMPLEMENTATION-XXX establishes the first **User Experience Architecture** standard for Aredir Labs. Prior company standards successfully governed engineering architecture — ownership, persistence, routing, workflows, AI reasoning, and data contracts. A recurring question during AlignFit development remained unanswered at the company level: **how should an Aredir Labs product feel to use?**

This implementation formalizes that philosophy as a promoted Knowledge Base asset: [Workspace Experience Architecture](../architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md) (AREDIR-UX-001).

Engineering organizes software. Experience organizes human attention. This standard defines the workspace experience model — Mission, Environment, Primary Action, Supporting Context, Navigation, and Identity — as a reusable philosophy for all future Aredir Labs products.

---

## Promotion Candidate Review

### Candidate

| Field | Value |
|-------|-------|
| **Asset** | Workspace Experience Architecture (AREDIR-UX-001) |
| **Category** | Architecture Pattern |
| **Origin** | AlignFit (COACH-UX-001, COACH_EXPERIENCE_ARCHITECTURE) |
| **Proposed ID** | AREDIR-KB-017 |

### Rationale for promotion

| Criterion | Assessment |
|-----------|------------|
| **Production validation** | AlignFit Coach evolution demonstrated that engineering architecture alone does not define product feel; workspace experience principles emerged from repeated real usage |
| **Cross-product reuse** | Philosophy applies to AlignFit, ClassForge, LeagueOS, Aredir Labs, and future products without embedding domain schemas or routes |
| **Distinct from existing assets** | Complements Workspace-First AI (surface topology), Design Governance (operational principles), and AI Intelligence Architecture (computation) without duplicating them |
| **Governance gap** | No prior promoted asset defined experience architecture as a company layer; this closes a structural gap in the EOS |
| **Technology-agnostic** | No framework or implementation references; valid across stacks and product lifetimes |
| **Prevents anti-pattern** | Teams default to page collections and component-driven layouts; this documents the proven alternative |

### Promotion decision

**Promoted** as Architecture Pattern — first User Experience Architecture standard for Aredir Labs.

### Distinct from related promoted assets

| Asset | Relationship |
|-------|--------------|
| Workspace-First AI Experience Pattern | Downstream surface topology for AI products; AREDIR-UX-001 governs experiential principles for all workspaces |
| Human + AI Advisor Workspace Pattern | Multi-advisor collaboration surfaces; AREDIR-UX-001 governs how those surfaces orient users |
| AI Intelligence Architecture Pattern | Computation and ownership; AREDIR-UX-001 governs encounter and orientation |
| Design Governance | Operational design rules; AREDIR-UX-001 is the canonical experience architecture standard |

---

## Documents created

| Document | Purpose |
|----------|---------|
| [Workspace Experience Architecture](../architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md) | Promoted UX architecture standard (AREDIR-UX-001) |
| This review | Establishment and promotion record |

---

## Documents updated

| Document | Changes |
|----------|---------|
| [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md) | Architecture Patterns examples; promoted assets tree; reviews section; related links |
| [Knowledge Base Roadmap](../KNOWLEDGE_BASE_ROADMAP.md) | 13 promoted assets; AREDIR-KB-017 completion |
| [Implementation index](../../prompts/implementation-index.md) | AREDIR-KB-017 work item |
| [Knowledge Asset Registry](../workspace/WORKSPACE_008_KNOWLEDGE_ASSET_REGISTRY.md) | Asset count |
| [Knowledge Governance](../governance/KNOWLEDGE_GOVERNANCE.md) | Promoted asset count |
| [Design Governance](../governance/DESIGN_GOVERNANCE.md) | Link to AREDIR-UX-001 |
| `docs/company/architecture-patterns/images/workspace-experience-architecture-reference.png` | Canonical reference diagram (Figure 1) |
| [Workspace-First AI Experience Pattern](../architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md) | Cross-reference to AREDIR-UX-001 |
| `src/lib/knowledge-assets/registry.ts` | Registry seed entry |

---

## Guiding principle

The purpose of this standard is not to define how interfaces look. The purpose is to define how Aredir Labs products should make users feel while accomplishing meaningful work.

Future products should be recognizable not because they share layouts, colors, or imagery, but because they consistently create purposeful, intentional workspaces designed around the user's mindset.

---

## Related

- [Workspace Experience Architecture](../architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md)
- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Knowledge Base Roadmap](../KNOWLEDGE_BASE_ROADMAP.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [Workspace-First AI Experience Pattern](../architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md)
