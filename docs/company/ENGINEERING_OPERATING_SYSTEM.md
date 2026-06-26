# Aredir Labs Engineering Operating System

**Status:** Company Standard  
**Owner:** Aredir Labs  
**Work item:** EOS-001  
**Last reviewed:** 2026-06-25  
**Next review due:** 2026-09-12

## Purpose

The Aredir Labs Engineering Operating System (EOS) is the **company methodology** for turning ideas into durable, reusable, AI-assisted software across all products. It defines how Aredir Labs evaluates ideas, designs architecture, collaborates with AI agents, validates software, governs documentation, promotes reusable patterns, and evolves products over time.

This is not a product feature. It is the **operating model** that AlignFit, ClassForge, LeagueOS, and future repositories inherit.

**Entry points:**

- **Operating system (this document)** — full lifecycle model and artifact layers
- **[Governance Index](./GOVERNANCE_INDEX.md)** — eight-domain governance framework (GOVERNANCE-001)
- **[Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md)** — promoted reusable intellectual property

---

## What the EOS is

The EOS connects vision, principles, frameworks, standards, patterns, playbooks, and the Knowledge Base into one coherent delivery methodology. Products do not invent their own engineering culture — they **Adopt**, **Extend**, or **Deviate** from company practice with documented rationale.

| EOS layer | Role | Location |
|-----------|------|----------|
| **Vision** | Why Aredir Labs builds this way | This document — Vision |
| **Principles** | Non-negotiable engineering values | Principles; [Company Governance](./governance/COMPANY_GOVERNANCE.md) |
| **Frameworks** | How systems and methodologies work | Governance framework, AI pipeline, maturity model |
| **Standards** | Required practices | Promoted KB assets + operational docs |
| **Patterns** | Reusable solutions to recurring problems | `docs/company/architecture-patterns/`, `ai-patterns/` |
| **Playbooks** | Operational procedures for delivery | `docs/company/playbooks/` + operational checklists |
| **Knowledge Base** | Canonical promoted company IP | `docs/company/` (excluding governance orchestration) |
| **Reference Architectures** | Reusable architecture models | Architecture patterns + [Architecture Governance](./governance/ARCHITECTURE_GOVERNANCE.md) |
| **Product Implementations** | Domain-specific code and docs | Product repositories |

**Governance is a capability within the EOS** — not the entire system. GOVERNANCE-001 established the governance layer; EOS-001 places it inside the broader operating model.

---

## EOS structure

```
Aredir Labs Engineering Operating System
│
├── Vision                          ← durable, reusable, AI-assisted delivery
├── Principles                      ← evidence-based, incremental, canonical-first
├── Frameworks
│   ├── Engineering Operating System (this document)
│   ├── Governance Framework        ← GOVERNANCE-001
│   ├── Governance Maturity Model
│   └── Knowledge Artifact Taxonomy
├── Standards                       ← promoted KB + operational implementation
├── Patterns                        ← architecture and AI patterns
├── Playbooks                       ← feature delivery, release, deployment
├── Knowledge Base                  ← 12 promoted assets + registry
├── Reference Architectures         ← intelligence pipeline, workspace-first AI
└── Product Implementations         ← AlignFit, ClassForge, LeagueOS, …
```

---

## Vision

Aredir Labs builds software where:

- **Ideas become validated products** through a repeatable lifecycle — not ad hoc sprints
- **Reusable knowledge compounds** — patterns proven in one product accelerate the next
- **AI agents operate within guardrails** — speed with verification, not uncontrolled diffs
- **Documentation stays trustworthy** — living docs synchronized with code and standards
- **Quality is embedded** — verification throughout delivery, not a final checkbox
- **Products inherit standards** — onboarding means Adopt, not reinvent

AlignFit served as the **proving ground** for this model. Coach intelligence evolution, UAT cycles, workspace patterns, and promotion candidate reviews (ALIGNFIT-GOV-002) produced the assets now owned by Aredir Labs. AlignFit retains product-specific domain architecture; the EOS owns the reusable methodology.

---

## Principles

| Principle | Meaning | Governance home |
|-----------|---------|-----------------|
| **Understand before modifying** | Audit current state before change | [Architecture Governance](./governance/ARCHITECTURE_GOVERNANCE.md) |
| **Evidence over assumption** | Claims require verification output | [Engineering Governance](./governance/ENGINEERING_GOVERNANCE.md) |
| **Canonical-first** | Company standards win unless Deviate documented | [Documentation Governance](./governance/DOCUMENTATION_GOVERNANCE.md) |
| **Reusable over bespoke** | Proven patterns become company assets | [Knowledge Governance](./governance/KNOWLEDGE_GOVERNANCE.md) |
| **AI within boundaries** | Application owns decisions; LLM owns narrative | [AI Governance](./governance/AI_GOVERNANCE.md) |
| **Incremental delivery** | Small verifiable steps over speculative rewrites | [Company Governance](./governance/COMPANY_GOVERNANCE.md) |
| **Products own implementation** | EOS owns methodology; repos own domain code | [Project Governance](./governance/PROJECT_GOVERNANCE.md) |

---

## Full lifecycle model

The EOS lifecycle spans idea through compounding knowledge:

```
Evaluate Idea
      ↓
Architecture Review (when required)
      ↓
Scope & Plan
      ↓
Write Implementation Prompts
      ↓
AI-Assisted Execution (within standards)
      ↓
Verification & QA
      ↓
Documentation & Cross-Links
      ↓
Release & Production Validation
      ↓
Knowledge Capture
      ↓
Promotion (when reusable)
      ↓
Adoption across products
```

**Canonical playbook:** [Feature Delivery Standard](./playbooks/FEATURE_DELIVERY_STANDARD.md)

### Lifecycle stages in detail

| Stage | EOS concern | Primary reference |
|-------|-------------|-------------------|
| **Evaluate idea** | Problem statement, sponsor, rough sizing | [Company Governance — SDLC](./governance/COMPANY_GOVERNANCE.md#software-development-lifecycle) |
| **Architecture review** | Ownership, source of truth, drift | [Architecture Audit Standard](./documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md) |
| **Scope & plan** | Acceptance criteria, verification plan | [Feature Delivery Standard](./playbooks/FEATURE_DELIVERY_STANDARD.md) |
| **Implementation prompts** | Guarded prefix, scoped work items | [AI Governance](./governance/AI_GOVERNANCE.md) |
| **AI-assisted execution** | Agent workflow, minimal diff | [Coding Agent Operating Standard](./engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) |
| **Verification & QA** | Lint, build, manual QA, AI evaluation | [QA Engineering Framework](./qa-standards/QA_ENGINEERING_FRAMEWORK.md) |
| **Documentation** | Three-tier sync, index updates | [Documentation Maintenance Standard](./documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md) |
| **Release** | Preview → merge → production validation | [Company Governance — Release](./governance/COMPANY_GOVERNANCE.md#release-process) |
| **Knowledge capture** | Identify promotion candidates | [Knowledge Governance](./governance/KNOWLEDGE_GOVERNANCE.md) |
| **Promotion** | Generalize, review, index, registry | [Promotion Process](./PROMOTION_PROCESS.md) |
| **Adoption** | Adopt / Extend / Deviate across products | [Governance Maturity Model](./governance/GOVERNANCE_MATURITY_MODEL.md) |

### AI-assisted delivery loop

When features include AI intelligence:

```
Context Builder → Facts → Assessments → Insights → Recommendations
      → Response Contract → Narrative → AI Evaluation → Workspace Surfaces
```

See [AI Governance](./governance/AI_GOVERNANCE.md) and [Architecture Governance](./governance/ARCHITECTURE_GOVERNANCE.md).

---

## Relationship to governance

```
Engineering Operating System          ← company methodology (this document)
         │
         └── Governance Framework     ← GOVERNANCE-001
                   │
                   └── Domain Governance (8 domains)
                             │
                             └── Promoted Knowledge Base Assets (12)
                                       │
                                       └── Operational Standards
                                                 │
                                                 └── Project Implementations
```

The [Governance Index](./GOVERNANCE_INDEX.md) is the entry point for governance domains. This document is the entry point for the full operating model.

Evaluate project maturity: [Governance Maturity Model](./governance/GOVERNANCE_MATURITY_MODEL.md).

Classify artifacts: [Knowledge Artifact Taxonomy](./knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md).

---

## Relationship to the Knowledge Base

The Knowledge Base is the **canonical store of promoted company intellectual property** within the EOS. It is not the entire operating system — it is the durable output of the promotion lifecycle.

| EOS concept | Knowledge Base expression |
|-------------|---------------------------|
| Patterns | `architecture-patterns/`, `ai-patterns/` |
| Standards | `engineering-standards/`, `qa-standards/`, `documentation-standards/` |
| Playbooks | `playbooks/` |
| Governance orchestration | `governance/`, `GOVERNANCE_INDEX.md` — not promoted KB assets |
| Operating system | `ENGINEERING_OPERATING_SYSTEM.md` — not a promoted KB asset |
| Taxonomy & maturity | `knowledge/`, `governance/GOVERNANCE_MATURITY_MODEL.md` |

**Registry:** `/workspace/knowledge-assets` — governance view of promoted assets; markdown remains canonical.

---

## How products inherit the EOS

New and existing products consume the EOS by:

1. **Cloning or syncing** the Aredir Labs template repository
2. **Carrying forward** `docs/company/`, operational docs, and GitHub templates — see [Future product standards](../architecture/future-product-standards.md)
3. **Adopting by default** Engineering and QA standards unless a Deviate decision is documented
4. **Syncing `docs/company/`** when company standards update — not maintaining parallel copies
5. **Keeping product-specific docs** in `docs/product/` and domain architecture in the product repo
6. **Feeding promotion candidates** back to Aredir Labs when patterns prove reusable

AlignFit, ClassForge, and LeagueOS are **product implementations** under this model. AlignFit is the primary origin project for AI methodology; it is not the owner of company governance.

---

## AlignFit as proving ground

AlignFit development produced:

- AI Intelligence Architecture and intelligence pipeline patterns
- Workspace-first and multi-advisor collaboration patterns
- QA and UAT practices promoted to company standards
- ALIGNFIT-GOV-002 promotion candidate review (deferred/merged domain-specific candidates)
- Evidence that AI-assisted delivery requires guardrails, not just speed

What stays in AlignFit: nutrition, coach, training, and calendar domain architecture; feature specs; product UI specs; implementation prompts for specific features.

What Aredir Labs owns: everything in `docs/company/` that is product-agnostic and promoted.

---

## Maturity and progression

Projects progress through five maturity levels defined in [Governance Maturity Model](./governance/GOVERNANCE_MATURITY_MODEL.md):

| Level | Name | Summary |
|-------|------|---------|
| 1 | Project Conventions | Informal, repo-specific practices |
| 2 | Documented Standards | Repeatable documented engineering |
| 3 | Knowledge Governance | Capture, promote, version, deprecate |
| 4 | AI-Assisted Engineering | Agents within standards and verification |
| 5 | Engineering Operating System | Full EOS adoption across delivery |

**Current mapping (2026 Q2–Q3):**

- **Aredir Labs (this repo):** Level 5 — EOS established; registry live; 12 promoted assets
- **AlignFit:** Level 4–5 — primary adopter of AI and QA standards; product domain docs remain local
- **ClassForge / LeagueOS:** Level 2–3 — template inheritance; adoption in progress

---

## Maintenance

| Activity | Owner | Cadence |
|----------|-------|---------|
| EOS review | Aredir Labs engineering lead | Quarterly (with KB review) |
| Governance framework review | Engineering lead | Quarterly |
| Maturity assessment | Product leads + engineering | Quarterly or at major milestones |
| Taxonomy updates | Engineering lead | When new artifact types emerge |
| Promotion and registry sync | Asset owner | On promotion PR |

Formal records: [GOVERNANCE-001 Review](./reviews/GOVERNANCE_001_FRAMEWORK_ESTABLISHMENT.md), [EOS-001 Review](./reviews/EOS_001_OPERATING_SYSTEM_ESTABLISHMENT.md).

---

## Related

- [Governance Index](./GOVERNANCE_INDEX.md)
- [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md)
- [Governance Maturity Model](./governance/GOVERNANCE_MATURITY_MODEL.md)
- [Knowledge Artifact Taxonomy](./knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md)
- [Promotion Process](./PROMOTION_PROCESS.md)
- [Feature Delivery Standard](./playbooks/FEATURE_DELIVERY_STANDARD.md)
- [Future product standards](../architecture/future-product-standards.md)
