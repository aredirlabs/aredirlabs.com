# Aredir Labs Engineering Capability Model

**Status:** Company Standard  
**Owner:** Aredir Labs  
**Work item:** EOS-002  
**Last reviewed:** 2026-06-25  
**Next review due:** 2026-09-12

## Purpose

The Engineering Capability Model defines **what Aredir Labs must consistently be able to do** — organizational competencies independent of any single document, tool, or repository layout.

Capabilities sit between the [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md) vision and the artifacts that implement it: frameworks, standards, patterns, playbooks, reference architectures, and product code.

**Capabilities are not documents.** They are abilities the organization maintains. Documents, standards, and playbooks **support** capabilities — they do not replace them.

Part of the [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md). Completed by [EOS-002 Review](./reviews/EOS_002_CAPABILITY_MODEL.md).

---

## Capability stack

```
Vision
      │
Principles
      │
Engineering Capabilities          ← this document
      │
Frameworks
      │
Standards
      │
Patterns
      │
Playbooks
      │
Reference Architectures
      │
Product Implementations
```

Capabilities answer: *What must we be able to do?*  
Artifacts answer: *How do we do it consistently?*

---

## Relationship to governance

Governance is **distributed across capabilities** — not a separate layer above them. The [Governance Framework](./GOVERNANCE_INDEX.md) (GOVERNANCE-001) provides domain orchestration docs that support multiple capabilities:

| Governance domain | Primary capability | Role |
|-------------------|-------------------|------|
| [Knowledge Governance](./governance/KNOWLEDGE_GOVERNANCE.md) | Knowledge Management | Promotion, registry, lifecycle |
| [Architecture Governance](./governance/ARCHITECTURE_GOVERNANCE.md) | Architecture | Pipeline, ownership, audits |
| [AI Governance](./governance/AI_GOVERNANCE.md) | AI Engineering | Agent collaboration, verification |
| [Engineering Governance](./governance/ENGINEERING_GOVERNANCE.md) | Quality Engineering, Delivery | DoD, testing, production readiness |
| [Documentation Governance](./governance/DOCUMENTATION_GOVERNANCE.md) | Documentation | Ownership, naming, archives |
| [Design Governance](./governance/DESIGN_GOVERNANCE.md) | Design | UX principles, consistency |
| [Company Governance](./governance/COMPANY_GOVERNANCE.md) | Delivery, Product Strategy | SDLC, PR/release, decisions |
| [Project Governance](./governance/PROJECT_GOVERNANCE.md) | Delivery, Documentation | Repo organization, indexes |

Governance docs **orchestrate** — they do not duplicate canonical promoted assets. See each capability below for specific references.

---

## Active capabilities

| # | Capability | Summary |
|---|------------|---------|
| 1 | [Product Strategy](#1-product-strategy) | Evaluate, prioritize, and evolve products |
| 2 | [Architecture](#2-architecture) | Design sustainable systems |
| 3 | [Knowledge Management](#3-knowledge-management) | Capture and evolve engineering knowledge |
| 4 | [AI Engineering](#4-ai-engineering) | Safely collaborate with AI |
| 5 | [Quality Engineering](#5-quality-engineering) | Produce reliable software |
| 6 | [Documentation](#6-documentation) | Maintain durable engineering knowledge |
| 7 | [Design](#7-design) | Deliver consistent user experiences |
| 8 | [Delivery](#8-delivery) | Reliably ship software |
| 9 | [Operations](#9-operations) | Operate products after release |
| 10 | [Security](#10-security) | Protect products and engineering assets |

---

## 1. Product Strategy

### Purpose

Ability to evaluate, prioritize, and evolve the Aredir Labs product portfolio with intentional investment decisions.

### Scope

- Roadmap thinking and portfolio visibility
- Product vision and problem framing
- Prioritization across AlignFit, ClassForge, LeagueOS, and future products
- Investment and scope decisions before engineering execution

### Desired outcomes

- Clear product sponsor and success hypothesis for new work
- Portfolio status visible without ad hoc reporting
- Priorities documented; scope disputes resolved before implementation
- Product-specific strategy stays in product repos; company methodology stays in EOS

### Ownership

| Role | Responsibility |
|------|----------------|
| Aredir Labs leadership | Portfolio direction and investment |
| Product leads | Product-specific vision, roadmap, and milestones |
| Engineering lead | Technical feasibility input; promotion candidate identification |

### Supporting artifacts

| Type | Reference |
|------|-----------|
| Framework | [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md) — lifecycle entry |
| Playbook | [Feature Delivery Standard](./playbooks/FEATURE_DELIVERY_STANDARD.md) — Idea stage |
| Operational | [Project catalog](../product/project-catalog.md), [Knowledge Base Roadmap](./KNOWLEDGE_BASE_ROADMAP.md) |
| Workspace | Project milestones and status (WORKSPACE-006) |

### Maturity expectations

| Level | Evidence |
|-------|----------|
| 2 | Product catalog and site brief documented |
| 3 | Roadmap and KB priorities synchronized quarterly |
| 5 | Portfolio decisions feed promotion and adoption tracking |

### Related capabilities

- **Delivery** — strategy becomes scoped work items
- **Knowledge Management** — strategic learnings become promotion candidates
- **Architecture** — major initiatives trigger architecture review

---

## 2. Architecture

### Purpose

Ability to design sustainable systems with clear ownership, domain boundaries, and evidence-based evaluation before change.

### Scope

- Ownership and source-of-truth analysis
- Domain modeling and boundary definition
- Reference architecture application
- Architectural reviews and drift detection
- Intelligence pipeline: Facts → Assessments → Insights → Narrative

### Desired outcomes

- Every major change preceded by understood current state
- Single owner per concern; ambiguous ownership flagged as findings
- Promoted patterns applied; drift documented and remediated
- Product domain architecture in product repos; reusable patterns in Knowledge Base

### Ownership

| Role | Responsibility |
|------|----------------|
| Engineering lead | Architecture standards and audit methodology |
| Product engineering | Domain architecture and implementation |
| Asset owners | Promoted architecture and AI patterns |

### Supporting artifacts

| Type | Reference |
|------|-----------|
| Governance | [Architecture Governance](./governance/ARCHITECTURE_GOVERNANCE.md) |
| Standard | [Architecture Audit Standard](./documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md) |
| Patterns | [AI Intelligence Architecture](./architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md), [Workspace-First AI Experience](./architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md) |
| AI patterns | [Context Builder](./ai-patterns/CONTEXT_BUILDER_PATTERN.md), [Response Contract](./ai-patterns/RESPONSE_CONTRACT_PATTERN.md) |
| Operational | [Project conventions](../architecture/project-conventions.md), [Technical overview](../engineering/technical-overview.md) |

### Maturity expectations

| Level | Evidence |
|-------|----------|
| 3 | Architecture audits before major work |
| 4 | AI features follow intelligence pipeline |
| 5 | Audits routinely produce promotion candidates |

### Related capabilities

- **AI Engineering** — pipeline implementation
- **Knowledge Management** — proven patterns promoted
- **Quality Engineering** — architecture risks inform test strategy
- **Documentation** — audit records and ADRs

---

## 3. Knowledge Management

### Purpose

Ability to capture, promote, version, deprecate, and distribute reusable engineering knowledge across all products.

### Scope

- Promotion candidate identification and review
- Knowledge Asset Registry maintenance
- Asset lifecycle (Candidate → Company Standard → Superseded)
- Cross-project adoption tracking (Adopt / Extend / Deviate)
- Artifact classification

### Desired outcomes

- Reusable patterns compound across products — not trapped in one repo
- 12+ promoted assets maintained with current metadata
- Registry and indexes synchronized on every promotion
- Product-specific content bounded; company IP in `docs/company/`

### Ownership

| Role | Responsibility |
|------|----------------|
| Aredir Labs | Index, promotion process, registry |
| Asset owners | Quarterly review of promoted assets |
| Product leads | Adoption confirmation for linked projects |

### Supporting artifacts

| Type | Reference |
|------|-----------|
| Governance | [Knowledge Governance](./governance/KNOWLEDGE_GOVERNANCE.md) |
| Framework | [Promotion Process](./PROMOTION_PROCESS.md), [Knowledge Artifact Taxonomy](./knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md) |
| Index | [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md) |
| Registry | `/workspace/knowledge-assets`, [WORKSPACE-008 spec](../workspace/WORKSPACE_008_KNOWLEDGE_ASSET_REGISTRY.md) |
| Playbook | [Feature Delivery Standard](./playbooks/FEATURE_DELIVERY_STANDARD.md) — Knowledge Capture stage |

### Maturity expectations

| Level | Evidence |
|-------|----------|
| 3 | Promotion process active; registry maintained |
| 5 | Knowledge capture routine; honest adoption metadata |

See [Governance Maturity Model](./governance/GOVERNANCE_MATURITY_MODEL.md).

### Related capabilities

- **Documentation** — three-tier hierarchy and maintenance
- **Architecture** — audits feed promotion candidates
- **AI Engineering** — AI patterns are primary KB assets
- **Product Strategy** — roadmap informs KB priorities

---

## 4. AI Engineering

### Purpose

Ability to safely and effectively collaborate with AI agents and LLMs within governed boundaries.

### Scope

- Workspace-first development
- Prompt methodology and guarded prefixes
- Application-owned intelligence vs LLM-owned narrative
- Verification and evidence-based implementation
- Human + AI and multi-advisor collaboration

### Desired outcomes

- Agents produce verifiable, scoped diffs — not uncontrolled rewrites
- AI features follow intelligence pipeline with deterministic application layers
- Narrative never invents facts, assessments, or recommendations
- Evaluation scenarios run when context, contract, or prompts change

### Ownership

| Role | Responsibility |
|------|----------------|
| Engineering lead | AI Governance and pattern standards |
| Product engineering | Domain-specific context builders and contracts |
| All implementers | Coding Agent Operating Standard compliance |

### Supporting artifacts

| Type | Reference |
|------|-----------|
| Governance | [AI Governance](./governance/AI_GOVERNANCE.md) |
| Standard | [Coding Agent Operating Standard](./engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) |
| Patterns | [Context Builder](./ai-patterns/CONTEXT_BUILDER_PATTERN.md), [Response Contract](./ai-patterns/RESPONSE_CONTRACT_PATTERN.md), [AI Evaluation](./ai-patterns/AI_EVALUATION_FRAMEWORK.md), [Human + AI Advisor Workspace](./ai-patterns/HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md) |
| Architecture | [AI Intelligence Architecture](./architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md), [Workspace-First AI Experience](./architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md) |
| Operational | [Guarded prompt template](../agent/guarded-prompt-template.md), [Coding agent operating standard](../agent/coding-agent-operating-standard.md) |

### Maturity expectations

| Level | Evidence |
|-------|----------|
| 4 | Agent standard adopted; prompt prefix enforced |
| 5 | Full AI workflow; evaluation regression on prompt changes |

### Related capabilities

- **Architecture** — pipeline and ownership
- **Quality Engineering** — verification gates
- **Delivery** — agent-driven execution within PR workflow
- **Documentation** — prompt and architecture docs current

---

## 5. Quality Engineering

### Purpose

Ability to produce reliable software through embedded verification, investigation, and release discipline.

### Scope

- QA methodology across the delivery lifecycle
- Testing expectations (automated and manual)
- Root cause analysis for defects
- Production readiness and post-deploy validation
- Accessibility and non-functional baseline

### Desired outcomes

- Verification embedded throughout delivery — not a final gate only
- Defects reproduced, isolated, and root-caused before closure
- Release readiness evidenced by checklists — not assumptions
- "Done" requires proof per Definition of Done

### Ownership

| Role | Responsibility |
|------|----------------|
| Engineering lead | QA framework and release gates |
| Implementers | Verification before completion reports |
| Product leads | UAT sign-off when applicable |

### Supporting artifacts

| Type | Reference |
|------|-----------|
| Governance | [Engineering Governance](./governance/ENGINEERING_GOVERNANCE.md) |
| Standards | [QA Engineering Framework](./qa-standards/QA_ENGINEERING_FRAMEWORK.md), [Root Cause Analysis](./qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md) |
| Operational | [Manual QA checklist](../qa/manual-qa-checklist.md), [Release checklist](../qa/release-checklist.md), [UAT checklist](../qa/uat-checklist.md), [Bug triage](../bugs/bug-triage-process.md) |
| Playbook | [Feature Delivery Standard](./playbooks/FEATURE_DELIVERY_STANDARD.md) — Verification stage |

### Maturity expectations

| Level | Evidence |
|-------|----------|
| 2 | QA checklists used on releases |
| 4 | Agent verification gates enforced |
| 5 | Full QA lifecycle; RCA for Medium+ defects |

### Related capabilities

- **Delivery** — QA gates in PR and release workflow
- **AI Engineering** — AI-specific evaluation and testing
- **Operations** — production verification and incident learnings
- **Documentation** — known issues and verification records

---

## 6. Documentation

### Purpose

Ability to maintain durable, trustworthy engineering knowledge synchronized with code and standards.

### Scope

- Documentation ownership across three tiers (canonical, operational, implementation)
- Naming, status tracking, and cross-linking
- Implementation notes, ADRs, and decision records
- Living documentation philosophy — docs evolve with systems

### Desired outcomes

- No silent conflict between canonical and operational docs
- Indexes updated in the same PR as structural changes
- Stale documentation treated as a defect
- Agent-readable structure in all standards

### Ownership

| Role | Responsibility |
|------|----------------|
| Asset owners | Canonical `docs/company/` assets |
| Implementers | Operational and implementation tier updates |
| Engineering lead | Documentation Governance and taxonomy |

### Supporting artifacts

| Type | Reference |
|------|-----------|
| Governance | [Documentation Governance](./governance/DOCUMENTATION_GOVERNANCE.md) |
| Standard | [Documentation Maintenance Standard](./documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md) |
| Framework | [Knowledge Artifact Taxonomy](./knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md) |
| Operational | [Implementation index](../prompts/implementation-index.md), README |

### Maturity expectations

| Level | Evidence |
|-------|----------|
| 2 | Docs exist for workflow and standards |
| 3 | Three-tier hierarchy understood; promotion updates indexes |
| 5 | Zero stale cross-links at quarterly review |

### Related capabilities

- **Knowledge Management** — promoted assets are canonical tier
- **Architecture** — audit and ADR records
- **Delivery** — documentation stage in feature delivery
- **Design** — brand and UI pattern docs

---

## 7. Design

### Purpose

Ability to deliver consistent, accessible user experiences across products and surfaces.

### Scope

- Design system and component reuse
- Accessibility baseline
- Workspace-first UX for AI products
- Visual hierarchy and interaction consistency
- Information architecture principles

### Desired outcomes

- Shared primitives before feature-specific components
- Accessibility spot-checked on every user-facing change
- AI products organize around workspace surfaces — not chat-only
- Product UI specs stay in product repos; principles in EOS

### Ownership

| Role | Responsibility |
|------|----------------|
| Product engineering | Product-specific UI and tokens |
| Aredir Labs template | Shared primitives and patterns |
| All implementers | Accessibility in Definition of Done |

### Supporting artifacts

| Type | Reference |
|------|-----------|
| Governance | [Design Governance](./governance/DESIGN_GOVERNANCE.md) |
| Pattern | [Workspace-First AI Experience](./architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md) |
| Operational | [UI patterns](../architecture/ui-patterns.md), [Component guidelines](../architecture/component-guidelines.md), [Brand guide](../brand/brand-guide.md) |

### Maturity expectations

| Level | Evidence |
|-------|----------|
| 2 | UI patterns and component guidelines followed |
| 4 | Workspace-first UX for AI features |
| 5 | Cross-product primitive reuse; promotion of shared patterns |

### Related capabilities

- **AI Engineering** — workspace surfaces for intelligence
- **Quality Engineering** — accessibility verification
- **Documentation** — brand and pattern docs maintained
- **Delivery** — manual QA for UI changes

---

## 8. Delivery

### Purpose

Ability to reliably ship software from local development through production validation.

### Scope

- Branching and pull request workflow
- Agent-driven implementation within standards
- Release and deployment process
- Preview environments and production validation
- CI gates (lint, build)

### Desired outcomes

- One logical change per PR with verification evidence
- Preview deployment validated before merge
- Production validated after merge — not only preview
- Feature delivery lifecycle followed for non-trivial work

### Ownership

| Role | Responsibility |
|------|----------------|
| All engineers and agents | PR quality and verification |
| Engineering lead | Deployment workflow and release gates |
| Product leads | UAT when milestone-bound |

### Supporting artifacts

| Type | Reference |
|------|-----------|
| Governance | [Company Governance](./governance/COMPANY_GOVERNANCE.md), [Project Governance](./governance/PROJECT_GOVERNANCE.md), [Engineering Governance](./governance/ENGINEERING_GOVERNANCE.md) |
| Playbook | [Feature Delivery Standard](./playbooks/FEATURE_DELIVERY_STANDARD.md) |
| Operational | [Deployment workflow](../engineering/deployment-workflow.md), [Environment strategy](../engineering/environment-strategy.md), [Release checklist](../qa/release-checklist.md), [PR template](../../.github/PULL_REQUEST_TEMPLATE.md) |

### Maturity expectations

| Level | Evidence |
|-------|----------|
| 2 | Documented branch → PR → merge workflow |
| 4 | Agent standard and verification on all agent work |
| 5 | Full feature delivery lifecycle with knowledge capture |

### Related capabilities

- **Quality Engineering** — verification gates
- **AI Engineering** — agent execution
- **Operations** — post-deploy validation
- **Documentation** — index updates on delivery
- **Product Strategy** — scoped work items from priorities

---

## 9. Operations

### Purpose

Ability to operate products sustainably after release — monitor health, respond to incidents, manage debt, and improve continuously.

### Scope

- Post-deploy production validation
- Known issues tracking
- Technical debt visibility and remediation
- Incident response (as process matures)
- Monitoring and observability (as adopted)
- Continuous improvement from production learnings

### Desired outcomes

- Production health verified after deploy — not assumed
- Known issues documented honestly
- Technical debt visible — undocumented Deviate treated as debt
- Production incidents produce RCA and follow-up work items

### Ownership

| Role | Responsibility |
|------|----------------|
| Engineering lead | Operations standards and incident process (when defined) |
| On-call / product engineering | Production validation and incident response |
| All teams | Known issues and debt tracking |

### Supporting artifacts

| Type | Reference |
|------|-----------|
| Governance | [Engineering Governance](./governance/ENGINEERING_GOVERNANCE.md) — reliability, technical debt |
| Standard | [Root Cause Analysis Framework](./qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md) |
| Operational | [Known issues](../bugs/known-issues.md), [Bug triage](../bugs/bug-triage-process.md), [Vercel production deployment](../plan/docs/VERCEL-PRODUCTION-DEPLOYMENT.md) |
| Playbook | Release checklist post-deploy section |

### Maturity expectations

| Level | Evidence |
|-------|----------|
| 2 | Post-deploy validation on releases |
| 3 | Known issues maintained; RCA for Medium+ defects |
| 5 | Incident response playbook; observability documented |

**Note:** Formal incident response and monitoring playbooks are future work. Current capability is supported by QA release validation and bug triage.

### Related capabilities

- **Quality Engineering** — production verification stage
- **Delivery** — release workflow handoff to operations
- **Security** — incident classification when security-related
- **Knowledge Management** — operational learnings as promotion candidates

---

## 10. Security

### Purpose

Ability to protect products, user data, and engineering assets from preventable harm.

### Scope

- Secrets and credential hygiene
- Auth boundary documentation
- Input validation baseline
- Environment separation (dev / preview / production)
- Dependency discipline

### Desired outcomes

- No secrets in repository or logs
- Auth enforced server-side for protected routes
- Production DB changes require explicit confirmation
- New dependencies require explicit approval

### Ownership

| Role | Responsibility |
|------|----------------|
| Engineering lead | Security baseline and future standard expansion |
| All implementers | Secrets hygiene and auth boundary compliance |

### Supporting artifacts

| Type | Reference |
|------|-----------|
| Governance | [Engineering Governance](./governance/ENGINEERING_GOVERNANCE.md) — Security section |
| Operational | [Environment strategy](../engineering/environment-strategy.md), `.env.example`, README env guidance |
| Standard | _(Future: Security Standard — not yet promoted)_ |

### Maturity expectations

| Level | Evidence |
|-------|----------|
| 2 | Secrets gitignored; env documented |
| 3 | Auth boundaries documented per product |
| 5 | Promoted Security Standard; security review in delivery lifecycle |

**Note:** This capability is intentionally lightweight. A promoted Security Standard and incident response integration are reserved for future work — not over-engineered at EOS-002.

### Related capabilities

- **Delivery** — no secrets in PRs; prod deploy safeguards
- **Operations** — security incident response (future)
- **Architecture** — auth and data boundary design

---

## Capability cross-reference matrix

Which artifacts primarily support each capability. "●" = primary support; "○" = secondary support.

| Artifact | Prod Strategy | Architecture | Knowledge | AI Eng | Quality | Docs | Design | Delivery | Ops | Security |
|----------|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **Frameworks** |
| Engineering Operating System | ● | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ |
| Governance Framework | ○ | ● | ● | ● | ● | ● | ● | ● | ○ | ○ |
| Governance Maturity Model | ● | ○ | ● | ● | ● | ○ | ○ | ○ | ○ | ○ |
| Knowledge Artifact Taxonomy | ○ | ○ | ● | ○ | ○ | ● | ○ | ○ | ○ | ○ |
| **Standards** |
| Architecture Audit Standard | ○ | ● | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ○ |
| Documentation Maintenance | ○ | ○ | ● | ○ | ○ | ● | ○ | ○ | ○ | ○ |
| Coding Agent Operating Standard | ○ | ○ | ○ | ● | ● | ○ | ○ | ● | ○ | ○ |
| QA Engineering Framework | ○ | ○ | ○ | ○ | ● | ○ | ○ | ● | ● | ○ |
| Root Cause Analysis | ○ | ○ | ○ | ○ | ● | ○ | ○ | ○ | ● | ○ |
| **Patterns** |
| AI Intelligence Architecture | ○ | ● | ○ | ● | ○ | ○ | ○ | ○ | ○ | ○ |
| Workspace-First AI Experience | ○ | ● | ○ | ● | ○ | ○ | ● | ○ | ○ | ○ |
| Context Builder / Response Contract | ○ | ● | ○ | ● | ○ | ○ | ○ | ○ | ○ | ○ |
| AI Evaluation Framework | ○ | ○ | ○ | ● | ● | ○ | ○ | ○ | ○ | ○ |
| Human + AI Advisor Workspace | ○ | ● | ○ | ● | ○ | ○ | ● | ○ | ○ | ○ |
| **Playbooks** |
| Feature Delivery Standard | ● | ● | ● | ○ | ● | ● | ○ | ● | ○ | ○ |
| Deployment workflow | ○ | ○ | ○ | ○ | ○ | ○ | ○ | ● | ● | ● |
| Release / QA checklists | ○ | ○ | ○ | ○ | ● | ○ | ○ | ● | ● | ○ |

Full asset inventory: [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md).

---

## Capability interaction map

```
                    Product Strategy
                           │
         ┌─────────────────┼─────────────────┐
         ▼                 ▼                 ▼
   Architecture      Knowledge Mgmt       Design
         │                 │                 │
         ├──────── AI Engineering ──────────┤
         │                 │                 │
         ▼                 ▼                 ▼
   Quality Eng ◄───── Delivery ──────► Documentation
         │                 │                 │
         └────────► Operations ◄─────────────┘
                           │
                       Security
                  (cross-cutting baseline)
```

**Typical flow:** Product Strategy → Architecture (audit) → AI Engineering + Design → Delivery → Quality Engineering → Operations → Knowledge Management (capture) → Product Strategy (evolve).

Security spans all capabilities as a cross-cutting baseline.

---

## Deferred capabilities

The following capabilities are **intentionally deferred** — placeholders for future EOS evolution. Do not implement until a second product validates need or a promoted standard exists.

| Capability | Rationale for deferral |
|------------|------------------------|
| **Data Engineering** | No cross-product data platform yet; product-specific data models remain local |
| **Platform Engineering** | Shared infra limited to Vercel + Neon template; no internal platform team |
| **DevEx** | Developer experience patterns emerging from template; not yet formalized |
| **Research & Innovation** | Exploratory work tracked in project notes; no company R&D process |
| **Customer Experience** | Product-specific UX research; no cross-product CX standard |
| **Analytics** | No company-wide analytics or observability standard yet |

When a deferred capability matures, add it to this document via EOS review — not ad hoc in product repos.

---

## Maintenance

| Activity | Owner | Cadence |
|----------|-------|---------|
| Capability model review | Aredir Labs engineering lead | Quarterly (with EOS review) |
| Cross-reference matrix update | Engineering lead | When assets promoted or deprecated |
| Deferred capability evaluation | Engineering lead + product leads | Annually or when second product needs arise |
| Maturity assessment | Product leads | Per [Governance Maturity Model](./governance/GOVERNANCE_MATURITY_MODEL.md) |

---

## Related

- [AEF-000 Aredir Engineering Framework Discovery](./framework/AEF_000_AREDIR_ENGINEERING_FRAMEWORK_DISCOVERY.md)
- [AEF-001 Framework Capability Contracts](./framework/AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md)
- [AEF-002 Bootstrap Extraction Boundary](./framework/AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md)
- [Project Inheritance Model](./PROJECT_INHERITANCE_MODEL.md)
- [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md)
- [Governance Index](./GOVERNANCE_INDEX.md)
- [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md)
- [Governance Maturity Model](./governance/GOVERNANCE_MATURITY_MODEL.md)
- [Knowledge Artifact Taxonomy](./knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md)
- [EOS-002 Capability Model Review](./reviews/EOS_002_CAPABILITY_MODEL.md)
