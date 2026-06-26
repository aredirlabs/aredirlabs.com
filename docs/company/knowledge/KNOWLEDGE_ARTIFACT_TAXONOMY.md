# Knowledge Artifact Taxonomy

**Status:** Company Standard  
**Owner:** Aredir Labs  
**Domain:** Knowledge  
**Work item:** EOS-001  
**Last reviewed:** 2026-06-25  
**Next review due:** 2026-09-12

## Purpose

Classify documentation and intellectual property artifacts across the Aredir Labs Engineering Operating System. Use this taxonomy to decide **where an artifact belongs**, **whether it should be promoted**, and **how it relates to existing Knowledge Base categories**.

Part of the [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md). Referenced by [Knowledge Governance](../governance/KNOWLEDGE_GOVERNANCE.md).

---

## Taxonomy overview

```
Engineering Operating System
├── Frameworks              ← how methodologies work
├── Standards               ← required practices
├── Patterns                ← reusable design solutions
├── Playbooks               ← operational procedures
├── Reference Architectures ← reusable architecture models
├── Reviews / Audits        ← evidence-producing evaluations
├── Implementation Records  ← completed work history
└── Product Docs            ← project-owned, domain-specific
```

**Promotion target:** Frameworks, Standards, Patterns, and Playbooks may become promoted Knowledge Base assets when they meet [promotion criteria](../PROMOTION_PROCESS.md#promotion-requirements).

**Not promotion candidates by default:** Reviews, Implementation Records, Product Docs — unless generalized into a reusable asset.

---

## Frameworks

### Definition

Describe **how systems or methodologies work**. Frameworks orchestrate multiple standards and patterns into a coherent model. They explain structure and relationships — not step-by-step procedures.

### Characteristics

- Cross-cutting scope
- Defines layers, domains, or lifecycle stages
- References standards and patterns — does not duplicate their detail
- May not be promoted if it is pure navigation/orchestration

### Examples

| Artifact | Location | Promoted? |
|----------|----------|-----------|
| Engineering Operating System | `ENGINEERING_OPERATING_SYSTEM.md` | No — EOS orchestration layer |
| Governance Framework | `GOVERNANCE_INDEX.md`, `governance/` | No — governance orchestration |
| Governance Maturity Model | `governance/GOVERNANCE_MATURITY_MODEL.md` | No — evaluation framework |
| Workspace-First AI Experience | `architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md` | Yes — Promoted Standard |
| Human + AI Advisor Workspace | `ai-patterns/HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md` | Yes — Promoted Standard |
| Facts → Assessments → Insights → Narrative | [Architecture Governance](../governance/ARCHITECTURE_GOVERNANCE.md) | Pipeline described in governance; patterns promoted separately |

### KB mapping

Frameworks that are promoted typically land in **Architecture Pattern** or **AI Pattern** categories when they define system topology or AI methodology. Pure orchestration docs stay outside the promoted asset registry.

---

## Standards

### Definition

Define **required practices**. Standards are enforceable — teams Adopt, Extend, or Deviate with documentation.

### Characteristics

- Uses MUST / SHOULD language or equivalent clear requirements
- Applies across projects or clearly defines applicability
- Has an owner and review cadence when promoted
- Operational copies may exist in `docs/agent/`, `docs/qa/`, etc.

### Examples

| Artifact | Location | Category |
|----------|----------|----------|
| Documentation Maintenance Standard | `documentation-standards/` | Documentation Standard |
| Architecture Audit Standard | `documentation-standards/` | Documentation Standard |
| QA Engineering Framework | `qa-standards/` | QA Standard |
| Root Cause Analysis Framework | `qa-standards/` | QA Standard |
| Coding Agent Operating Standard | `engineering-standards/` | Engineering Standard |
| Feature Delivery Standard | `playbooks/` | Playbook (delivery standard) |
| Repository Standards | `docs/engineering/repository-standards.md` | Operational — promotion candidate |

### KB mapping

Aligns with [Promotion Process — Promotion Categories](../PROMOTION_PROCESS.md#promotion-categories): Engineering Standard, QA Standard, Documentation Standard.

---

## Patterns

### Definition

**Reusable solutions to recurring design or architecture problems.** Patterns address a specific problem context with a proven approach — more concrete than frameworks, less procedural than playbooks.

### Characteristics

- Problem → context → solution → consequences structure (explicit or implicit)
- Domain-agnostic or documents adaptation steps
- Proven in at least one production-bound system before promotion
- Does not embed product-specific schemas or routes

### Examples

| Pattern | Location | Category |
|---------|----------|----------|
| AI Intelligence Architecture | `architecture-patterns/` | Architecture Pattern |
| Context Builder | `ai-patterns/` | AI Pattern |
| Response Contract | `ai-patterns/` | AI Pattern |
| AI Evaluation Framework | `ai-patterns/` | AI Pattern |
| Workspace ownership | [Architecture Governance](../governance/ARCHITECTURE_GOVERNANCE.md) | Described in governance |
| Canonical source-of-truth | [Architecture Governance](../governance/ARCHITECTURE_GOVERNANCE.md) | Described in governance |
| Reconciliation | Deferred — domain-specific | Stays in product until cross-product validation |

### KB mapping

**Architecture Pattern** or **AI Pattern** in Promotion Categories.

---

## Playbooks

### Definition

**Operational procedures** — step-by-step workflows for executing recurring activities. Playbooks are actionable checklists or sequences, not abstract principles.

### Characteristics

- Ordered steps with entry/exit criteria
- References standards and checklists — does not redefine them
- Used across releases or projects
- May exist in operational tier before promotion

### Examples

| Playbook | Location | Promoted? |
|----------|----------|-----------|
| Feature Delivery Standard | `playbooks/FEATURE_DELIVERY_STANDARD.md` | Yes |
| Release process | [Company Governance](../governance/COMPANY_GOVERNANCE.md) + `docs/qa/release-checklist.md` | Operational — Release Management Playbook candidate |
| Deployment workflow | `docs/engineering/deployment-workflow.md` | Operational — promotion candidate |
| PR workflow | [Company Governance](../governance/COMPANY_GOVERNANCE.md) + PR template | Operational |
| Branch cleanup | Not yet documented | Future playbook candidate |
| Incident response | Not yet documented | Future playbook candidate |

### KB mapping

**Playbook** category in Promotion Categories.

---

## Reference Architectures

### Definition

**Reusable architecture models** that guide implementation without prescribing product-specific code. Reference architectures show component boundaries, data flows, and ownership — often the promoted form of a validated system design.

### Characteristics

- Topology and boundary diagrams (text or visual)
- Ownership matrix included or referenced
- Adaptable to new product domains with documented extension points
- Distinct from a single project's deployed architecture doc

### Examples

| Reference architecture | Source |
|------------------------|--------|
| Application-owned intelligence pipeline | [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) |
| Workspace-first AI product layout | [Workspace-First AI Experience Pattern](../architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md) |
| Multi-advisor collaboration model | [Human + AI Advisor Workspace Pattern](../ai-patterns/HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md) |

Product-specific deployed architecture (e.g., AlignFit coach subsystem) is **Product Docs** until generalized into a reference architecture and promoted.

---

## Reviews / Audits

### Definition

**Evidence-producing documents** that evaluate readiness, drift, risk, promotion potential, or governance establishment. Reviews produce findings — they are not standards themselves.

### Characteristics

- Dated with work item ID
- Contains evidence and conclusions
- May recommend promotions, deprecations, or follow-up work
- Stored in `docs/company/reviews/` when company-scoped

### Examples

| Review | Location |
|--------|----------|
| KB Review 2026 Q2 | `reviews/KB_REVIEW_2026_Q2.md` |
| GOVERNANCE-001 Establishment | `reviews/GOVERNANCE_001_FRAMEWORK_ESTABLISHMENT.md` |
| EOS-001 Establishment | `reviews/EOS_001_OPERATING_SYSTEM_ESTABLISHMENT.md` |
| Registry Readiness Review | `reviews/KNOWLEDGE_ASSET_REGISTRY_READINESS_REVIEW.md` |
| Architecture audit (feature-scoped) | `plan/docs/` or product audit folder |

### Promotion path

Reviews **feed** promotion candidates. Findings may produce Patterns, Standards, or Playbooks — the review itself is not promoted.

---

## Implementation Records

### Definition

**Historical records of completed work** — verification specs, work-item prompts, and implementation indexes that document what was built and tested.

### Characteristics

- Tied to a work item ID and status (Complete, Planned)
- Contains verification evidence or deliverable links
- Lives in implementation tier
- Becomes stale if indexes are not updated

### Examples

| Record | Location |
|--------|----------|
| Implementation index | `docs/prompts/implementation-index.md` |
| Foundation prompt | `docs/prompts/prompt-001A-foundation.md` |
| WORKSPACE-008 spec | `docs/workspace/WORKSPACE_008_KNOWLEDGE_ASSET_REGISTRY.md` |
| Verification docs | `plan/docs/AREDIR-WORKSPACE-*.md` |

### Promotion path

Implementation records are **not** promoted. Reusable content extracted during knowledge capture becomes a promotion candidate in the appropriate taxonomy category.

---

## Product Docs

### Definition

**Project-owned, product-specific documentation** that implements the EOS for a particular domain. Product docs should not be promoted unless generalized to remove domain assumptions.

### Characteristics

- References canonical standards upward
- Contains domain models, feature specs, UI specs, product IA
- Owned by the product repository
- AlignFit coach, nutrition, training, calendar docs live here

### Examples (AlignFit — remain in AlignFit repo)

- Nutrition architecture
- Coach architecture and intelligence subsystem design
- Training architecture
- Calendar implementation
- Feature specifications and UI specifications
- Product-specific implementation prompts

### Promotion path

When a product doc contains **generalizable** patterns:

1. Extract domain-agnostic content
2. Generalize schemas, routes, and UI details away
3. Submit as promotion candidate with origin artifact reference
4. Keep product doc as implementation reference

Deferred AlignFit candidates (Reconciliation Capability Framework, Calendar Orchestration Contract) remain product docs until cross-product validation — per [Knowledge Base Roadmap](../KNOWLEDGE_BASE_ROADMAP.md).

---

## Taxonomy vs Promotion Categories

The Knowledge Base uses promotion categories that map to taxonomy types:

| Taxonomy type | Promotion category | KB folder |
|---------------|-------------------|-----------|
| Pattern (architecture) | Architecture Pattern | `architecture-patterns/` |
| Pattern (AI) | AI Pattern | `ai-patterns/` |
| Standard (engineering) | Engineering Standard | `engineering-standards/` |
| Standard (QA) | QA Standard | `qa-standards/` |
| Standard (documentation) | Documentation Standard | `documentation-standards/` |
| Playbook | Playbook | `playbooks/` |
| Standard (prompt) | Prompt Asset | `prompt-library/` |
| Framework (orchestration) | Not promoted by default | `governance/`, EOS doc |
| Review / Implementation Record / Product Doc | Not promoted | Respective locations |

No conflict: taxonomy is **classification**; promotion categories are **KB storage layout**. An operational playbook may exist for years before promotion to `playbooks/`.

---

## Decision guide

When creating or receiving a document, ask:

| Question | If yes → |
|----------|----------|
| Does it define required practice for multiple projects? | **Standard** (consider promotion) |
| Does it solve a recurring design problem with a proven approach? | **Pattern** (consider promotion) |
| Is it a step-by-step procedure for recurring work? | **Playbook** (operational or promoted) |
| Does it explain how a methodology or system layer works? | **Framework** |
| Does it model architecture for reuse across products? | **Reference Architecture** |
| Does it evaluate readiness, drift, or promotion potential? | **Review / Audit** |
| Does it record completed work with verification? | **Implementation Record** |
| Is it specific to one product's domain or feature? | **Product Doc** (keep in product repo) |

---

## Related

- [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md)
- [Knowledge Governance](../governance/KNOWLEDGE_GOVERNANCE.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Governance Maturity Model](../governance/GOVERNANCE_MATURITY_MODEL.md)
