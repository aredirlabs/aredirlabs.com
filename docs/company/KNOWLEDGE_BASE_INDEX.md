# Aredir Labs Knowledge Base Index

**Status:** Foundation  
**Owner:** Aredir Labs  
**Last reviewed:** 2026-06-15  
**Next review due:** 2026-09-12

## Purpose

The Aredir Labs Knowledge Base is the company source of truth for **reusable intellectual property**: architecture patterns, engineering standards, QA frameworks, AI patterns, product playbooks, and governed prompt assets.

Projects (AlignFit, ClassForge, LeagueOS, and future products) remain the source of truth for **implementations**. The Knowledge Base captures what has been proven, validated, and is worth reusing across products.

**Company operating model:** [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md) — capabilities, governance, and promoted assets are layers within the EOS.

## What belongs here

| Include | Exclude |
|---------|---------|
| Reusable architecture and design patterns | One-off implementation prompts |
| Cross-project engineering and QA standards | Bug-fix prompts |
| Validated AI and product playbooks | Feature-specific work items |
| Governed prompt assets with clear reuse criteria | Temporary project artifacts |
| Documentation and deployment standards | Unreviewed experiments |

## Structure

```
Knowledge Base
├─ Architecture Patterns
├─ Engineering Standards
├─ QA Standards
├─ AI Patterns
├─ Product Playbooks
├─ Documentation Standards
├─ Deployment Standards
└─ Prompt Library
```

Repository layout (this repo):

```
docs/company/
├── ENGINEERING_OPERATING_SYSTEM.md  ← EOS entry point (EOS-001)
├── ENGINEERING_CAPABILITY_MODEL.md  ← capability model (EOS-002)
├── PROJECT_INHERITANCE_MODEL.md     ← project inheritance (EOS-003)
├── GOVERNANCE_INDEX.md              ← governance entry point (GOVERNANCE-001)
├── governance/                      ← domain governance + maturity model
├── knowledge/                       ← artifact taxonomy
├── KNOWLEDGE_BASE_INDEX.md          ← this file
├── PROMOTION_PROCESS.md             ← how assets are promoted
├── architecture-patterns/       ← promoted architecture assets
├── engineering-standards/         ← promoted engineering assets
├── qa-standards/                  ← promoted QA assets
├── ai-patterns/                   ← promoted AI assets
├── playbooks/                     ← promoted delivery playbooks
├── reviews/                       ← formal KB review records
├── KNOWLEDGE_BASE_ROADMAP.md      ← KB roadmap and priorities
├── documentation-standards/       ← promoted documentation assets
├── deployment-standards/          ← future
└── prompt-library/                ← future governed prompts
```

---

## Architecture Patterns

### Purpose

Capture proven system designs that solve recurring product and engineering problems across Aredir Labs products.

### Scope

- Application architecture (layers, boundaries, data flow)
- AI system design (when architectural, not prompt-specific)
- Integration and service boundaries
- Cross-cutting concerns (auth, caching, observability) when expressed as reusable patterns

### Examples

- [AI Intelligence Architecture Pattern](./architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) — layered AI with application-owned intelligence pipeline and LLM-owned narrative
- [Workspace-First AI Experience Pattern](./architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md) — organize intelligence around workspace surfaces; chat as interaction mechanism
- [Context Builder Pattern](./ai-patterns/CONTEXT_BUILDER_PATTERN.md) — bounded, deterministic context before AI layers _(see AI Patterns)_
- [Response Contract Pattern](./ai-patterns/RESPONSE_CONTRACT_PATTERN.md) — output boundary before narrative _(see AI Patterns)_
- [AI Evaluation Framework](./ai-patterns/AI_EVALUATION_FRAMEWORK.md) — evaluation, validation, and regression methodology for AI features _(see AI Patterns)_

### Promotion criteria

An architecture pattern should be promoted when it:

- Has been implemented successfully in at least one production-bound project
- Separates concerns clearly enough to apply in another product domain
- Includes documented ownership boundaries (what the app owns vs. what the model owns)
- Has been validated through real usage, not only design review
- Does not embed project-specific schemas, routes, or UI details

---

## Engineering Standards

### Purpose

Define how Aredir Labs builds software consistently: conventions, quality gates, agent workflows, and repository hygiene.

### Scope

- Coding and review standards
- Repository and branching conventions
- Agent-driven implementation rules
- Technical baseline for new products

### Examples

- [Coding Agent Operating Standard](./engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) — agent guardrails, workflow, and verification gates
- Feature Delivery Standard _(candidate)_
- Repository standards (`docs/engineering/repository-standards.md`)
- Operational entry point: [`docs/agent/coding-agent-operating-standard.md`](../agent/coding-agent-operating-standard.md)

### Promotion criteria

An engineering standard should be promoted when it:

- Applies to two or more repositories or product lines
- Is enforceable through docs, templates, or CI (not tribal knowledge)
- Has been followed through at least one full delivery cycle
- Reduces rework, defects, or onboarding friction measurably

---

## QA Standards

### Purpose

Ensure consistent quality assurance, release readiness, and defect handling across products.

### Scope

- Manual and automated QA checklists
- UAT and release gates
- Bug triage and severity models
- Test strategy patterns (not single-feature test plans)

### Examples

- [QA Engineering Framework](./qa-standards/QA_ENGINEERING_FRAMEWORK.md) — verification lifecycle, release readiness, production validation
- [Root Cause Analysis Framework](./qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md) — evidence-based investigation and permanent resolution
- Manual QA checklist (`docs/qa/manual-qa-checklist.md`)
- Release checklist (`docs/qa/release-checklist.md`)
- Bug triage process (`docs/bugs/bug-triage-process.md`)

### Promotion criteria

A QA standard should be promoted when it:

- Has been used across multiple releases or projects
- Defines clear entry/exit criteria for quality gates
- Is reusable without rewriting for each feature
- Improves predictability of release readiness

---

## AI Patterns

### Purpose

Document reusable approaches to AI features: prompt structure, evaluation, safety, cost control, and human-in-the-loop design—distinct from full architecture patterns when the focus is AI behavior rather than system topology.

### Scope

- Prompt composition and guardrails
- Evaluation and regression strategies for AI outputs
- Token and cost optimization patterns
- Human review and escalation patterns

### Examples

- [Context Builder Pattern](./ai-patterns/CONTEXT_BUILDER_PATTERN.md) — bounded, deterministic context assembly before assessments and narrative
- [Response Contract Pattern](./ai-patterns/RESPONSE_CONTRACT_PATTERN.md) — closed-world handoff before narrative generation
- [AI Evaluation Framework](./ai-patterns/AI_EVALUATION_FRAMEWORK.md) — how AI quality is evaluated, validated, and sustained across releases
- [Human + AI Advisor Workspace Pattern](./ai-patterns/HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md) — shared advisor workspace as system of record for multi-advisor collaboration
- Guarded prompt template (`docs/agent/guarded-prompt-template.md`)

### Promotion criteria

An AI pattern should be promoted when it:

- Reduces hallucination risk, cost, or inconsistency in measured use
- Is domain-agnostic or clearly documents how to adapt domains
- Includes validation approach (not only example prompts)
- Is not tied to a single feature ticket or bug fix

---

## Product Playbooks

### Purpose

Capture repeatable product development workflows: discovery, scoping, delivery, and launch—without replacing project-specific product docs.

### Scope

- Discovery and validation playbooks
- MVP scoping frameworks
- Launch and UAT coordination
- Cross-functional handoff patterns

### Examples

- [Feature Delivery Standard](./playbooks/FEATURE_DELIVERY_STANDARD.md) — end-to-end delivery from idea through production validation and knowledge capture
- Project catalog and portfolio conventions (`docs/product/project-catalog.md`)

### Promotion criteria

A playbook should be promoted when it:

- Has guided successful delivery in more than one context
- Is actionable as a checklist or sequence, not only principles
- Complements (does not duplicate) project `docs/product/` content

---

## Documentation Standards

### Purpose

Keep documentation consistent, discoverable, and maintainable across Aredir Labs repositories.

### Scope

- Doc types (architecture, engineering, product, QA)
- Required sections for promoted assets
- Index and cross-linking conventions
- Agent-readable structure

### Examples

- [Architecture Audit Standard](./documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md) — repeatable methodology for system evaluation before change
- [Documentation Maintenance Standard](./documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md) — keeping canonical, operational, and project docs synchronized
- This index and [Promotion Process](./PROMOTION_PROCESS.md)
- Implementation index (`docs/prompts/implementation-index.md`)

### Promotion criteria

A documentation standard should be promoted when it:

- Is adopted in at least two repos or doc trees
- Defines required metadata and review cadence
- Improves findability or reduces doc drift

---

## Deployment Standards

### Purpose

Standardize environment strategy, release workflow, and production safety across Vercel-hosted and related infrastructure.

### Scope

- Environment separation (dev, preview, production)
- Deployment and rollback checklists
- Database migration and seed discipline
- Secrets and configuration management

### Examples

- Deployment workflow (`docs/engineering/deployment-workflow.md`)
- Environment strategy (`docs/engineering/environment-strategy.md`)
- Vercel production deployment verification (`plan/docs/VERCEL-PRODUCTION-DEPLOYMENT.md`)

### Promotion criteria

A deployment standard should be promoted when it:

- Has been exercised in production or production-equivalent environments
- Prevents classes of incidents (config drift, bad migrations, etc.)
- Is portable to new products with minimal edits

---

## Prompt Library

### Purpose

Host **governed, reusable prompt assets**—not ephemeral task prompts. Each entry is reviewed, versioned, and categorized for intentional reuse.

### Scope

- Implementation prompt templates with operating-standard prefix
- Audit and review prompt templates
- Research and architecture review prompts
- Explicitly **not** one-off bug fixes or feature tickets

### Examples

- Guarded prompt template (`docs/agent/guarded-prompt-template.md`)
- PR review template (`docs/agent/pr-review-template.md`)
- Workspace prompt library conventions (`plan/docs/AREDIR-WORKSPACE-007B-PROMPT-LIBRARY.md`) — project history vs. company assets

### Promotion criteria

A prompt asset should be promoted when it:

- Is reusable across projects or work types
- Includes success criteria and verification expectations
- Has an owner and review date
- Has been run successfully multiple times with acceptable outcomes

---

## Reviews

Formal audit and readiness records for the Knowledge Base.

```
Reviews
├─ KB Review 2026 Q2
├─ Knowledge Asset Registry Readiness Review
├─ KB 013 Registry Prerequisite Cleanup
├─ GOVERNANCE-001 Framework Establishment
├─ EOS-001 Operating System Establishment
├─ EOS-002 Capability Model Establishment
└─ EOS-003 Project Inheritance Establishment
```

### Examples

- [KB Review 2026 Q2](./reviews/KB_REVIEW_2026_Q2.md) — first quarterly adoption and governance audit (AREDIR-KB-008)
- [Knowledge Asset Registry Readiness Review](./reviews/KNOWLEDGE_ASSET_REGISTRY_READINESS_REVIEW.md) — registry readiness assessment (AREDIR-KB-012)
- [KB 013 Registry Prerequisite Cleanup](./reviews/KB_013_REGISTRY_PREREQUISITE_CLEANUP.md) — adoption validation and metadata cleanup (AREDIR-KB-013)
- [GOVERNANCE-001 Framework Establishment](./reviews/GOVERNANCE_001_FRAMEWORK_ESTABLISHMENT.md) — engineering governance framework (GOVERNANCE-001)
- [EOS-001 Operating System Establishment](./reviews/EOS_001_OPERATING_SYSTEM_ESTABLISHMENT.md) — engineering operating system (EOS-001)
- [EOS-002 Capability Model Establishment](./reviews/EOS_002_CAPABILITY_MODEL.md) — engineering capability model (EOS-002)
- [EOS-003 Project Inheritance Establishment](./reviews/EOS_003_PROJECT_INHERITANCE.md) — project inheritance model (EOS-003)
- [Knowledge Asset Registry Roadmap](./KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md) — proposed registry scope and phases (AREDIR-KB-012)

---

## Engineering Operating System

The EOS is the company methodology above the Knowledge Base. Start at [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md).

| EOS artifact | Document |
|--------------|----------|
| Operating system | [ENGINEERING_OPERATING_SYSTEM.md](./ENGINEERING_OPERATING_SYSTEM.md) |
| Capability model | [ENGINEERING_CAPABILITY_MODEL.md](./ENGINEERING_CAPABILITY_MODEL.md) |
| Inheritance model | [PROJECT_INHERITANCE_MODEL.md](./PROJECT_INHERITANCE_MODEL.md) |
| Governance framework | [Governance Index](./GOVERNANCE_INDEX.md) |
| Maturity model | [Governance Maturity Model](./governance/GOVERNANCE_MATURITY_MODEL.md) |
| Artifact taxonomy | [Knowledge Artifact Taxonomy](./knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md) |

Ten engineering capabilities sit between EOS principles and implementing artifacts. New repositories onboard via [Project Inheritance Model](./PROJECT_INHERITANCE_MODEL.md).

---

## Governance

Engineering governance is one layer within the EOS. Start at the [Governance Index](./GOVERNANCE_INDEX.md).

```
Governance Framework (GOVERNANCE-001)
├─ Governance Index             ← entry point
├─ Company Governance           ← philosophy, SDLC, PR/release
├─ Knowledge Governance         ← registry, promotion, lifecycle
├─ AI Governance                ← AI engineering playbook
├─ Project Governance           ← repo organization, docs hierarchy
├─ Engineering Governance       ← quality, testing, DoD
├─ Design Governance            ← product-agnostic UX principles
├─ Documentation Governance     ← ownership, naming, archives
└─ Architecture Governance      ← pipeline, ownership, audits
```

Asset lifecycle, metadata, and promotion detail remain in [Promotion Process](./PROMOTION_PROCESS.md) under **Knowledge Asset Governance**.

```
Knowledge Asset Governance
├─ Promotion Process            ← promotion + Knowledge Asset Governance
├─ Asset Lifecycle              ← Candidate → Superseded
├─ Review Cadence               ← quarterly review cycle
├─ Adoption Model               ← Adopt, Extend, Deviate
├─ KB Review 2026 Q2            ← first formal review
├─ Knowledge Asset Registry     ← WORKSPACE-008 (Complete)
└─ Knowledge Base Roadmap       ← priorities and registry readiness
```

| Activity | Owner |
|----------|--------|
| Index and category definitions | Aredir Labs |
| Promotion review | Asset owner + engineering lead |
| Quarterly asset review | Asset owner; product leads for linked projects |
| Deprecation / supersession | Document in asset; update index |
| Metadata normalization | Author of review or promotion PR |

See [Promotion Process](./PROMOTION_PROCESS.md) for lifecycle, [required metadata](./PROMOTION_PROCESS.md#required-metadata), [review cadence](./PROMOTION_PROCESS.md#review-cadence), [adoption model](./PROMOTION_PROCESS.md#project-adoption-model), and [documentation hierarchy](./PROMOTION_PROCESS.md#documentation-hierarchy).

Formal reviews: [KB Review 2026 Q2](./reviews/KB_REVIEW_2026_Q2.md), [Knowledge Asset Registry Readiness Review](./reviews/KNOWLEDGE_ASSET_REGISTRY_READINESS_REVIEW.md), [KB 013 Registry Prerequisite Cleanup](./reviews/KB_013_REGISTRY_PREREQUISITE_CLEANUP.md), [GOVERNANCE-001 Framework Establishment](./reviews/GOVERNANCE_001_FRAMEWORK_ESTABLISHMENT.md), [EOS-001 Operating System Establishment](./reviews/EOS_001_OPERATING_SYSTEM_ESTABLISHMENT.md), [EOS-002 Capability Model Establishment](./reviews/EOS_002_CAPABILITY_MODEL.md), [EOS-003 Project Inheritance Establishment](./reviews/EOS_003_PROJECT_INHERITANCE.md). Roadmap: [Knowledge Base Roadmap](./KNOWLEDGE_BASE_ROADMAP.md), [Knowledge Asset Registry Roadmap](./KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md).

## Promoted assets (quick reference)

```
Knowledge Base
├─ Architecture Patterns
│  ├─ AI Intelligence Architecture Pattern
│  └─ Workspace-First AI Experience Pattern
├─ Engineering Standards
│  └─ Coding Agent Operating Standard
├─ QA Standards
│  ├─ QA Engineering Framework
│  └─ Root Cause Analysis Framework
├─ AI Patterns
│  ├─ Context Builder Pattern
│  ├─ Response Contract Pattern
│  ├─ AI Evaluation Framework
│  └─ Human + AI Advisor Workspace Pattern
├─ Documentation Standards
│  ├─ Architecture Audit Standard
│  └─ Documentation Maintenance Standard
└─ Playbooks
   └─ Feature Delivery Standard
```

## Related

- [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md)
- [Project Inheritance Model](./PROJECT_INHERITANCE_MODEL.md)
- [Engineering Capability Model](./ENGINEERING_CAPABILITY_MODEL.md)
- [Governance Index](./GOVERNANCE_INDEX.md)
- [Promotion Process](./PROMOTION_PROCESS.md)
- [AI Intelligence Architecture Pattern](./architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md)
- [Workspace-First AI Experience Pattern](./architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md)
- [Coding Agent Operating Standard](./engineering-standards/CODING_AGENT_OPERATING_STANDARD.md)
- [QA Engineering Framework](./qa-standards/QA_ENGINEERING_FRAMEWORK.md)
- [Root Cause Analysis Framework](./qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md)
- [Context Builder Pattern](./ai-patterns/CONTEXT_BUILDER_PATTERN.md)
- [Response Contract Pattern](./ai-patterns/RESPONSE_CONTRACT_PATTERN.md)
- [AI Evaluation Framework](./ai-patterns/AI_EVALUATION_FRAMEWORK.md)
- [Human + AI Advisor Workspace Pattern](./ai-patterns/HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md)
- [Architecture Audit Standard](./documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md)
- [Documentation Maintenance Standard](./documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md)
- [Feature Delivery Standard](./playbooks/FEATURE_DELIVERY_STANDARD.md)
- [Knowledge Base Roadmap](./KNOWLEDGE_BASE_ROADMAP.md)
- [KB Review 2026 Q2](./reviews/KB_REVIEW_2026_Q2.md)
- [Knowledge Asset Registry Readiness Review](./reviews/KNOWLEDGE_ASSET_REGISTRY_READINESS_REVIEW.md)
- [KB 013 Registry Prerequisite Cleanup](./reviews/KB_013_REGISTRY_PREREQUISITE_CLEANUP.md)
- [Knowledge Asset Registry Roadmap](./KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md)
- [Implementation index](../prompts/implementation-index.md)
- [Future product standards](../architecture/future-product-standards.md)
