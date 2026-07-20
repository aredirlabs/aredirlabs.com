# Aredir Labs Engineering Governance Index

**Status:** Company Standard  
**Owner:** Aredir Labs  
**Work item:** GOVERNANCE-001  
**Last reviewed:** 2026-06-25  
**Next review due:** 2026-09-12

## Purpose

This index is the **authoritative entry point for governance** within the [Aredir Labs Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md). It defines how all products — AlignFit, ClassForge, LeagueOS, and future repositories — are designed, documented, implemented, reviewed, tested, and evolved.

**Governance is one capability area inside the EOS** — implemented across multiple [Engineering Capabilities](./ENGINEERING_CAPABILITY_MODEL.md), not the entire operating system. For the full lifecycle model, start at [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md).

Governance lives in two layers:

| Layer | Location | Role |
|-------|----------|------|
| **Governance framework** | `docs/company/governance/` | Domain standards that orchestrate company-wide practice |
| **Promoted Knowledge Base assets** | `docs/company/<category>/` | Canonical, versioned intellectual property |
| **Operational documentation** | `docs/agent/`, `docs/qa/`, `docs/engineering/`, etc. | Day-to-day checklists and templates that implement standards |

**Conflict rule:** Promoted Knowledge Base assets win over operational docs. Governance framework docs win over scattered operational guidance when scope overlaps. Project-specific docs implement — they do not redefine — company standards.

---

## EOS hierarchy

```
Engineering Operating System              ← company methodology
         │
         ├── Engineering Capabilities      ← EOS-002
         │
         └── Governance Framework          ← you are here (GOVERNANCE-001)
                   │
                   └── Domain Governance (8 domains)
                             │
                             └── Promoted Knowledge Base Assets (12)
                                       │
                                       └── Operational Standards
                                                 │
                                                 └── Project Implementations
```

Supporting EOS artifacts:

| Artifact | Document |
|----------|----------|
| **Capability model** | [Engineering Capability Model](./ENGINEERING_CAPABILITY_MODEL.md) |
| **Inheritance model** | [Project Inheritance Model](./PROJECT_INHERITANCE_MODEL.md) |
| **Maturity model** | [Governance Maturity Model](./governance/GOVERNANCE_MATURITY_MODEL.md) |
| **Artifact taxonomy** | [Knowledge Artifact Taxonomy](./knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md) |

### Governance → capability mapping

| Governance domain | Primary capability |
|-------------------|-------------------|
| [Knowledge Governance](./governance/KNOWLEDGE_GOVERNANCE.md) | Knowledge Management |
| [Architecture Governance](./governance/ARCHITECTURE_GOVERNANCE.md) | Architecture |
| [AI Governance](./governance/AI_GOVERNANCE.md) | AI Engineering |
| [Engineering Governance](./governance/ENGINEERING_GOVERNANCE.md) | Quality Engineering, Delivery |
| [Documentation Governance](./governance/DOCUMENTATION_GOVERNANCE.md) | Documentation |
| [Design Governance](./governance/DESIGN_GOVERNANCE.md) | Design |
| [Company Governance](./governance/COMPANY_GOVERNANCE.md) | Delivery, Product Strategy |
| [Project Governance](./governance/PROJECT_GOVERNANCE.md) | Delivery, Documentation |

---

## Governance hierarchy

```
Engineering Governance Index          ← you are here
         │
         ├── Company Governance        ← philosophy, SDLC, decisions, PR/release
         ├── Knowledge Governance      ← asset lifecycle, registry, promotion
         ├── AI Governance             ← human+AI collaboration playbook
         ├── Project Governance        ← repo organization, docs hierarchy
         ├── Engineering Governance    ← quality, testing, DoD, production readiness
         ├── Design Governance         ← product-agnostic UX and IA principles
         ├── Documentation Governance  ← ownership, naming, maintenance, archives
         ├── Architecture Governance   ← ownership, pipeline, audits, reconciliation
         └── Governance Maturity Model ← project maturity evaluation
                  │
                  ↓ implements
         Promoted Knowledge Base (12 assets)
                  │
                  ↓ implements
         Operational docs (agent, qa, engineering, architecture)
                  │
                  ↓ supports
         Project-specific docs (product repos)
```

---

## Governance domains

| Domain | Document | Scope |
|--------|----------|-------|
| **Company** | [Company Governance](./governance/COMPANY_GOVERNANCE.md) | Engineering philosophy, SDLC, decision-making, repository and PR standards, release process, documentation ownership, architectural review |
| **Knowledge** | [Knowledge Governance](./governance/KNOWLEDGE_GOVERNANCE.md) | Knowledge Asset Registry, promotion candidates, lifecycle, versioning, deprecation, cross-project applicability |
| **AI** | [AI Governance](./governance/AI_GOVERNANCE.md) | Human + AI collaboration, workspace-first development, prompt standards, verification, evidence-based implementation, AI workflow |
| **Project** | [Project Governance](./governance/PROJECT_GOVERNANCE.md) | Architecture docs, planning docs, implementation indexes, ADRs, audits, repository organization, branch and release workflow |
| **Engineering** | [Engineering Governance](./governance/ENGINEERING_GOVERNANCE.md) | Code quality, testing, QA, accessibility, performance, security, reliability, technical debt, Definition of Done, production readiness |
| **Design** | [Design Governance](./governance/DESIGN_GOVERNANCE.md) | Workspace-first UX, visual hierarchy, dashboard philosophy, interaction consistency, information architecture, component reuse |
| **Documentation** | [Documentation Governance](./governance/DOCUMENTATION_GOVERNANCE.md) | Documentation ownership, naming, status tracking, cross-linking, update procedures, archive strategy, living documentation |
| **Architecture** | [Architecture Governance](./governance/ARCHITECTURE_GOVERNANCE.md) | Facts → Assessments → Insights → Narrative pipeline, ownership separation, source-of-truth, workspace and domain ownership, audit methodology |
| **Maturity** | [Governance Maturity Model](./governance/GOVERNANCE_MATURITY_MODEL.md) | Five-level project maturity assessment and progression |

---

## Operating model

The complete delivery loop connects governance domains to promoted assets:

```
Architecture Audit → Feature Delivery → Coding Agent + QA → Knowledge Capture → Promotion
```

AI features add:

```
Context Builder → Intelligence layers → Response Contract → AI Evaluation → Workspace surfaces → Advisor collaboration
```

See [Feature Delivery Standard](./playbooks/FEATURE_DELIVERY_STANDARD.md) and [AI Governance](./governance/AI_GOVERNANCE.md) for detail.

---

## Key canonical assets

Quick reference to promoted standards that implement this framework:

| Category | Assets |
|----------|--------|
| Architecture Patterns | [AI Intelligence Architecture](./architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md), [Workspace Experience Architecture](./architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md), [Workspace-First AI Experience](./architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md) |
| Engineering Standards | [Coding Agent Operating Standard](./engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) |
| QA Standards | [QA Engineering Framework](./qa-standards/QA_ENGINEERING_FRAMEWORK.md), [Root Cause Analysis](./qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md) |
| AI Patterns | [Context Builder](./ai-patterns/CONTEXT_BUILDER_PATTERN.md), [Response Contract](./ai-patterns/RESPONSE_CONTRACT_PATTERN.md), [AI Evaluation](./ai-patterns/AI_EVALUATION_FRAMEWORK.md), [Human + AI Advisor Workspace](./ai-patterns/HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md) |
| Documentation Standards | [Architecture Audit](./documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md), [Documentation Maintenance](./documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md) |
| Playbooks | [Feature Delivery Standard](./playbooks/FEATURE_DELIVERY_STANDARD.md) |

Full inventory: [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md). Workspace view: `/workspace/knowledge-assets`.

Classify artifacts: [Knowledge Artifact Taxonomy](./knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md).

---

## Governance maintenance

| Activity | Owner | Cadence |
|----------|-------|---------|
| EOS and governance review | Aredir Labs engineering lead | Quarterly (aligned with KB review) |
| Maturity assessment | Product leads + engineering | Quarterly or at major milestones |
| Domain governance doc updates | Domain owner | When standards change or after formal reviews |
| Knowledge Base asset review | Asset owner | Quarterly per [Promotion Process](./PROMOTION_PROCESS.md) |
| Registry seed sync | Author of promotion PR | On each asset promotion or metadata change |
| Adoption confirmation | Product leads | Quarterly for linked projects |

Formal review records: [GOVERNANCE-001](./reviews/GOVERNANCE_001_FRAMEWORK_ESTABLISHMENT.md), [EOS-001](./reviews/EOS_001_OPERATING_SYSTEM_ESTABLISHMENT.md), [EOS-002](./reviews/EOS_002_CAPABILITY_MODEL.md), [EOS-003](./reviews/EOS_003_PROJECT_INHERITANCE.md).

---

## Related

- [AEF-000 Aredir Engineering Framework Discovery](./framework/AEF_000_AREDIR_ENGINEERING_FRAMEWORK_DISCOVERY.md)
- [AEF-001 Framework Capability Contracts](./framework/AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md)
- [AEF-002 Bootstrap Extraction Boundary](./framework/AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md)
- [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md)
- [Project Inheritance Model](./PROJECT_INHERITANCE_MODEL.md)
- [Engineering Capability Model](./ENGINEERING_CAPABILITY_MODEL.md)
- [Governance Maturity Model](./governance/GOVERNANCE_MATURITY_MODEL.md)
- [Knowledge Artifact Taxonomy](./knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md)
- [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md)
- [Promotion Process](./PROMOTION_PROCESS.md)
- [Knowledge Base Roadmap](./KNOWLEDGE_BASE_ROADMAP.md)
- [Implementation index](../prompts/implementation-index.md)
- [Future product standards](../architecture/future-product-standards.md)
