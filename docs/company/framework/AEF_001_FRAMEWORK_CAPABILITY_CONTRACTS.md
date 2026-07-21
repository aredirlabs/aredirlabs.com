# AEF-001 — Framework Capability Contracts

**Status:** Company Standard (Framework Governance)  
**Owner:** Aredir Labs  
**Work item:** AEF-001  
**Identifier verification:** Confirmed unused as a document before assignment (proposed in AEF-000; no prior `AEF_001_*` artifact)  
**Authority basis:** [AEF-000 Discovery](./AEF_000_AREDIR_ENGINEERING_FRAMEWORK_DISCOVERY.md)  
**Last reviewed:** 2026-07-19  
**Next review due:** 2026-10-19

## Normative status

This document is the **authoritative governance reference** for AEF framework capability ownership, boundaries, interactions, and artifact authority.

It **formalizes** discoveries from AEF-000. It does **not** redesign the Engineering Operating System, invent capabilities, merge or split the validated inventory, extract bootstrap assets, or reorganize repositories.

| Conflict rule | Resolution |
|---------------|------------|
| Capability detail in promoted standards vs this contract | Promoted standards remain canonical for *how*; this document is canonical for *who owns what* |
| Governance domain docs vs this contract | Domain docs orchestrate practice; this contract assigns framework-capability ownership |
| AEF-000 vs this contract | AEF-000 remains discovery record; **this document supersedes AEF-000 for normative ownership** |

---

## 1. Executive Summary

AEF-000 established ten methodological framework capabilities (C1–C10). AEF-001 converts each into a **capability contract**: purpose, responsibilities, explicit non-responsibilities, inputs, outputs, dependencies, consumers, lifecycle position, documentation authority, success criteria, failure modes, and evolution notes.

**Normative inventory (unchanged from AEF-000):**

| ID | Capability |
|----|------------|
| C1 | Engineering Operating System |
| C2 | Governance Framework |
| C3 | Architecture Framework |
| C4 | Documentation Framework |
| C5 | Quality & Verification Framework |
| C6 | AI Collaboration Framework |
| C7 | Knowledge Framework |
| C8 | Bootstrap & Inheritance Framework |
| C9 | Delivery & Release Framework |
| C10 | Design & Experience Framework |

**Primary clarifications formalized here:**

1. AEF capabilities are methodological subsystems — distinct from EOS-002 organizational competencies.
2. Governance (C2) **orchestrates**; promoted standards and playbooks own procedural detail.
3. Work Packages and Feature Delivery are primarily owned by **C9**; optional Implementation Briefs are owned by **C6** constraints when used.
4. Architecture Audits are owned by **C3**; UI Quality Audits (draft) by **C5** with Design collaboration (**C10**).
5. Knowledge promotion is owned by **C7**; documentation hygiene by **C4**.
6. Bootstrap extraction readiness is classified per capability without authorizing extraction.

---

## 2. Framework Overview

### 2.1 What AEF is

The **Aredir Engineering Framework (AEF)** is the company-owned methodology boundary defined in [AEF-000](./AEF_000_AREDIR_ENGINEERING_FRAMEWORK_DISCOVERY.md). EOS remains the operating model inside that boundary.

```
AEF (framework boundary — AEF series)
├── C1 Engineering Operating System
├── C2 Governance Framework
├── C3–C10 methodological subsystems
├── Knowledge Base (promoted IP — primarily C7)
└── Reference Repository / future bootstrap (primarily C8)
```

### 2.2 Lifecycle reference (not reinvented)

Authoritative delivery lifecycle from AEF-000 / EOS / Feature Delivery Standard:

```
Evaluate Idea
  → Architecture Review / Audit (when required)
  → Engineering Finding
  → Engineering Work Package
  → Implementation (optional: Implementation Brief / Prompt)
  → Verification & QA
  → Documentation & Cross-Links
  → Release & Production Validation
  → Knowledge Capture
  → Promotion (when reusable)
  → Adoption across products
```

Supporting spines (AEF-000): repository bootstrap lifecycle (C8); evidence/learning lifecycle (C7).

### 2.3 Contract conventions

| Term | Meaning |
|------|---------|
| **Owns** | Sole primary authority for definition and change of listed artifact types |
| **Collaborates** | Contributes constraints or review; does not hold primary ownership |
| **Orchestrates** | Links and conflict-rules across owners without duplicating their detail |
| **Internal only** | Remains authoritative in Aredir Labs; bootstrap may sync/reference, not fork ownership |

---

## 3. Capability Contracts

### C1 — Engineering Operating System

#### Purpose

Provide the company operating model that connects vision, principles, organizational capabilities, frameworks, standards, patterns, playbooks, and product inheritance into one coherent methodology.

#### Responsibilities

- EOS vision, principles, and lifecycle model
- Relationship among EOS layers (capabilities, frameworks, standards, patterns, playbooks, KB, products)
- Entry-point navigation to C2–C10 governing artifacts
- EOS series documents: Capability Model, Inheritance Model, Blueprint Spec, Reference Repository Spec (structural contracts co-owned with C8 for inheritance/bootstrap aspects — see Authority)

#### Explicit Non-Responsibilities

- Individual promoted pattern or standard procedural detail
- Product domain architecture and feature specs
- Day-to-day PR/release execution (C9)
- Promotion checklists and registry operations (C7)
- Domain governance prose duplication (C2)

#### Inputs

- Formal governance and EOS reviews
- Promotion outcomes and maturity assessments
- AEF series discoveries affecting methodology boundary

#### Outputs

- Engineering Operating System document and EOS-linked operating-model specs
- Lifecycle and principle statements consumed by all capabilities

#### Dependencies

- None for existence (root operating model)
- Requires C2 and promoted delivery/knowledge assets to be *operationally complete*

#### Consumers

- All capabilities (C2–C10), products, agents, bootstrap authors

#### Lifecycle Position

- Continuous orchestration across the full delivery lifecycle
- Repository lifecycle: inherited at EOS Inheritance stage

#### Authority (documentation types)

| Type | Ownership |
|------|-----------|
| Operating system / methodology orchestration docs | **Primary** |
| EOS reviews | **Primary** |
| Organizational Capability Model (EOS-002) | **Primary** |
| Promoted standards/patterns/playbooks | Not owned (C3–C10 / C7 as applicable) |

#### Success Criteria

- Products can locate the operating model without inventing parallel methodology
- Lifecycle stages used in delivery match EOS / Feature Delivery without conflicting AEF stages
- Principles remain the shared constraint set for all capabilities

#### Failure Modes

- EOS treated as a product feature repository
- Silent rewrite of EOS instead of AEF-numbered evolution
- Duplication of promoted standard detail inside EOS
- Implementation before understanding (violates EOS principle)

#### Future Evolution

- Maturity model calibration as more products adopt
- Clearer packaging notes for bootstrap sync (without moving ownership out of Labs)

---

### C2 — Governance Framework

#### Purpose

Orchestrate eight governance domains so company practice is consistent, conflict rules are clear, and maturity can be assessed — without replacing canonical promoted assets.

#### Responsibilities

- Governance Index and eight domain governance documents
- Governance Maturity Model
- Conflict rules between canonical, operational, and implementation tiers (in concert with C4)
- Domain → EOS-002 capability mapping

#### Explicit Non-Responsibilities

- Promotion process checklists (C7 / Promotion Process)
- Architecture audit step methodology (C3 / Architecture Audit Standard)
- Feature delivery step detail (C9 / Feature Delivery Standard)
- Agent operating procedures (C6 / Coding Agent Operating Standard)

#### Inputs

- Changes to promoted assets
- Formal reviews (GOVERNANCE-*, EOS-*, KB-*)
- Maturity assessment requests

#### Outputs

- Domain governance guidance and index
- Maturity evaluation criteria
- Orchestration links to canonical assets

#### Dependencies

- C1 (operating model placement)
- Promoted KB assets for canonical detail (C7 store)

#### Consumers

- All delivery teams, auditors, product leads
- C4 (documentation conflict rules)
- C8 (inheritance of governance tree)

#### Lifecycle Position

- Continuous (not a gated delivery stage)
- Review cadence: quarterly with KB/EOS reviews

#### Authority

| Type | Ownership |
|------|-----------|
| Domain governance docs (`docs/company/governance/`) | **Primary** |
| Governance Index | **Primary** |
| Governance Maturity Model | **Primary** |
| GOVERNANCE-001 review records | **Primary** |
| Promoted procedural standards | Not owned |

#### Success Criteria

- No competing “second source of truth” for procedures already promoted
- Maturity assessments produce comparable results across products
- Conflict rule (canonical wins unless Deviate) is applied consistently

#### Failure Modes

- Governance drift (domain docs diverge from promoted assets)
- Duplicated standards inside governance docs
- Undocumented authority when domain ownership is unclear
- Overlapping ownership with C7 on promotion lifecycle tables

#### Future Evolution

- Incident/observability governance when Operations maturity increases
- Security domain expansion when a Security Standard is promoted

---

### C3 — Architecture Framework

#### Purpose

Ensure systems are understood before change through ownership analysis, source-of-truth clarity, reusable architecture patterns, and the application-owned intelligence pipeline.

#### Responsibilities

- Architecture Governance
- Architecture Audit Standard and audit methodology
- Promoted architecture patterns (AI Intelligence Architecture, Workspace-First, Workspace Experience Architecture as architecture assets)
- Pipeline constraints: application owns facts/assessments/insights/recommendations; LLM owns narrative

#### Explicit Non-Responsibilities

- Product domain models and feature architecture (product repos)
- UI visual tokens and brand campaigns (C10 / product brand)
- Work package authoring (C9)
- Knowledge promotion decisions (C7)
- Agent coding workflow rules (C6) — except pipeline ownership constraints C6 must respect

#### Inputs

- Code/config evidence
- Audit charters and scope
- Engineering findings feeding delivery

#### Outputs

- Architecture audits and findings
- Architecture patterns
- Ownership / source-of-truth maps
- Pipeline constraints for AI features

#### Dependencies

- C1 (methodology placement)
- C4 (audit records and documentation hygiene)
- Collaborates with C5 on architecture risk → test strategy

#### Consumers

- C9 (findings → work packages)
- C6 (pipeline constraints)
- C7 (promotion candidates from audits)
- C10 (workspace architecture overlap — see Boundary Analysis)

#### Lifecycle Position

- Architecture Review / Audit stage (when required)
- Continuous drift monitoring for major systems

#### Authority

| Type | Ownership |
|------|-----------|
| Architecture Audit Standard | **Primary** |
| Architecture Governance | **Primary** |
| Architecture patterns (`architecture-patterns/`) | **Primary** |
| Project ADRs | Collaborates — primary owner is product/implementation tier under C9 Project Governance guidance |
| UI audits | Not owned (C5 primary; C10 collaborates) |

#### Success Criteria

- Major changes preceded by understood current state
- Ambiguous ownership flagged as findings
- Promoted patterns applied or Deviate documented

#### Failure Modes

- Architecture drift
- Implementation before discovery/audit
- Duplicated ownership across components
- Product-specific schemas embedded in company patterns

#### Future Evolution

- Reconciliation patterns if cross-product validation appears
- Stronger ADR linkage when Decision Record Standard is promoted

---

### C4 — Documentation Framework

#### Purpose

Keep engineering knowledge durable, discoverable, and synchronized with code and standards through ownership tiers, naming, status, cross-linking, and maintenance discipline.

#### Responsibilities

- Documentation Governance
- Documentation Maintenance Standard
- Knowledge Artifact Taxonomy (classification mechanics; promotion decisions remain C7)
- Three-tier documentation model (canonical / operational / implementation)
- Index hygiene expectations for primary indexes

#### Explicit Non-Responsibilities

- What content is promoted to the Knowledge Base (C7)
- Feature specification content (product / C9 implementation tier)
- Audit methodology substance (C3 / C5)
- EOS vision content (C1)

#### Inputs

- Delivery and structural doc changes
- Promotion PRs (index updates)
- Quarterly review findings

#### Outputs

- Maintained indexes and cross-links
- Naming/status/archive rules
- Living documentation expectations

#### Dependencies

- C1 (methodology context)
- C2 (governance conflict rules alignment)
- Taxonomy supports C7 but does not own promotion

#### Consumers

- All capabilities and agents
- C8 (bootstrap documentation structure)
- C7 (index updates on promotion)

#### Lifecycle Position

- Documentation & Cross-Links stage
- Continuous maintenance duty on every change PR

#### Authority

| Type | Ownership |
|------|-----------|
| Documentation Governance | **Primary** |
| Documentation Maintenance Standard | **Primary** |
| Knowledge Artifact Taxonomy | **Primary** (classification) |
| Primary indexes (structure/hygiene) | **Primary** for rules; content owners update their rows |
| AEF series docs under `framework/` | Collaborates with AEF document owners; hygiene rules apply |

#### Success Criteria

- No silent conflict between canonical and operational docs
- Indexes updated in the same change set as structural moves
- Stale documentation treated as a defect

#### Failure Modes

- Orphan documents
- Governance drift between operational copies and canonical assets
- Undocumented authority for which index is authoritative
- Elevating implementation prompts to company tier without promotion

#### Future Evolution

- Blueprint listing for `docs/company/framework/`
- Path normalization for draft standards outside `docs/company/`

---

### C5 — Quality & Verification Framework

#### Purpose

Embed verification throughout delivery so “done” requires evidence — including QA lifecycle, RCA, release readiness, AI evaluation, and UI quality audit (draft).

#### Responsibilities

- QA Engineering Framework
- Root Cause Analysis Framework
- Operational QA checklists (manual, release, UAT)
- AI Evaluation Framework (evaluation/regression methodology)
- UI Quality Audit Standard while in draft/quality category (primary owner of the audit *framework*; Design collaborates on experience criteria)
- Definition of Done evidence expectations (with Engineering Governance)

#### Explicit Non-Responsibilities

- Feature scope and acceptance authorship (C9 work packages)
- Deployment platform configuration (C9 operational deployment docs)
- Architecture audit methodology (C3)
- Agent workflow rules beyond verification gates (C6 owns agent standard; C5 owns gate evidence expectations)

#### Inputs

- Work packages and change diffs
- Production signals and defects
- AI evaluation scenarios when AI surfaces change

#### Outputs

- Verification evidence
- Release checklist outcomes
- RCA records
- UI audit findings (when applied)
- AI evaluation results

#### Dependencies

- C9 (delivers work to verify)
- C6 (agent verification gates collaboration)
- Engineering Governance quality sections (C2 orchestration)

#### Consumers

- C9 (release gates)
- C6 (evaluation feedback)
- C7 (quality learnings as promotion candidates)
- Operations concerns within EOS-002 (post-deploy validation)

#### Lifecycle Position

- Verification & QA
- Release & Production Validation (readiness evidence)
- Continuous defect investigation (RCA)

#### Authority

| Type | Ownership |
|------|-----------|
| QA / RCA standards | **Primary** |
| AI Evaluation Framework | **Primary** (methodology); C6 collaborates on AI feature context |
| UI Quality Audit Standard | **Primary** (draft quality audit framework) |
| Operational QA checklists | **Primary** |
| Release Management Playbook (future promoted) | Collaborates with C9 — playbook ownership assigned to C9 when promoted |

#### Success Criteria

- Verification evidence exists before completion claims
- Medium+ defects receive RCA when required
- Release readiness is checklist-evidenced, not assumed

#### Failure Modes

- Verification as a final checkbox only
- Duplicated QA standards across products
- UI audit and design guidance conflicting without owner
- Architecture risks not informing test strategy

#### Future Evolution

- Promotion/relocation of UI Quality Audit under `docs/company/`
- External Quality Systems (AQSF/AVF in `aredir-quality-systems`) — not an AEF capability; integrate via Architecture Audit and Promotion Process
- Promoted Security Standard interface when created

---

### C6 — AI Collaboration Framework

#### Purpose

Enable safe, verifiable collaboration with AI agents and LLMs within governed boundaries — for both coding agents and product AI intelligence features.

#### Responsibilities

- AI Governance
- Coding Agent Operating Standard
- Guarded prompt template and agent operational entry points
- Promoted AI patterns: Context Builder, Response Contract, Human + AI Advisor Workspace, Evidence-Aware AI Advisor
- Optional Implementation Brief / Prompt constraints (must not expand Work Package scope)

#### Explicit Non-Responsibilities

- Product-specific domain intelligence schemas
- Architecture audit ownership (C3)
- Work Package as authoritative scope artifact (C9)
- Promotion of AI patterns (process owned by C7; content authored under C6 patterns)
- UI brand systems (C10 / product)

#### Inputs

- Engineering Work Packages (authoritative scope)
- Context builders and response contracts in product code
- Evaluation scenarios (with C5)

#### Outputs

- Scoped agent diffs
- Guarded briefs when needed
- AI pattern assets
- Compliance with application-owned pipeline constraints from C3

#### Dependencies

- C3 (pipeline and ownership constraints)
- C5 (verification and AI evaluation gates)
- C9 (work packages and PR workflow)

#### Consumers

- C9 (AI-assisted implementation)
- C10 (workspace surfaces for advisors)
- C3 (pattern feedback)

#### Lifecycle Position

- Implementation (AI-assisted execution)
- Optional brief creation adjacent to Work Package
- AI feature evaluation alongside Verification

#### Authority

| Type | Ownership |
|------|-----------|
| Coding Agent Operating Standard | **Primary** |
| AI Governance | **Primary** |
| AI patterns (`ai-patterns/`) | **Primary** |
| Guarded prompt template / agent operational docs | **Primary** |
| Optional Implementation Briefs | **Primary** for format/guardrails; scope remains C9 Work Package |
| AI Evaluation Framework | Collaborator (C5 primary) |

#### Success Criteria

- Agents produce scoped, verifiable changes
- Narrative never invents facts/assessments/recommendations
- Evaluation runs when context, contracts, or prompts change

#### Failure Modes

- Uncontrolled agent rewrites
- Briefs overriding Work Package scope
- LLM treated as source of application decisions
- Overlapping ownership with C3 on pipeline definition (resolved: C3 owns pipeline architecture; C6 owns agent/AI pattern practice)

#### Future Evolution

- Prompt library governance
- Stronger multi-advisor collaboration standards as products demand

---

### C7 — Knowledge Framework

#### Purpose

Capture, promote, version, deprecate, and distribute reusable engineering knowledge so proven practice compounds across products.

#### Responsibilities

- Knowledge Governance
- Promotion Process and Knowledge Asset Governance
- Knowledge Base Index and category definitions
- Knowledge Asset Registry (governance view; markdown remains canonical)
- Knowledge patterns (Evidence Lifecycle Pattern)
- Adoption model: Adopt / Extend / Deviate
- KB reviews and roadmap for promotion priorities

#### Explicit Non-Responsibilities

- Documentation maintenance mechanics (C4)
- Product roadmaps and feature specs
- Implementation-tier prompts as company standards
- Domain governance orchestration prose (C2)
- Creating product implementations

#### Inputs

- Audit findings and delivery learnings
- Promotion candidates and review evidence
- Quarterly review outcomes

#### Outputs

- Promoted assets with metadata
- KB Index and registry synchronization
- Deprecation/supersession records
- Adoption tracking signals

#### Dependencies

- C4 (indexes, taxonomy classification, three-tier rules)
- C9 (Knowledge Capture stage in delivery)
- C3/C5/C6/C10 as producers of candidate content

#### Consumers

- All products and capabilities via adoption
- C1/C2 (methodology and governance updates)
- C8 (sync of `docs/company/` into new repos)

#### Lifecycle Position

- Knowledge Capture → Promotion → Adoption
- Continuous registry/index maintenance
- Evidence lifecycle spine for organizational learning

#### Authority

| Type | Ownership |
|------|-----------|
| Promotion Process | **Primary** |
| Knowledge Governance | **Primary** |
| Knowledge Base Index | **Primary** |
| Knowledge patterns | **Primary** |
| KB / registry reviews | **Primary** |
| Knowledge Artifact Taxonomy | Collaborator (C4 primary for taxonomy doc) |

#### Success Criteria

- Reusable patterns are not trapped in one product repo
- Metadata and indexes stay synchronized on promotion
- Honest Adopt/Extend/Deviate status

#### Failure Modes

- Parallel “shadow KB” in product repos
- Promotion without evidence
- Registry treated as second source of truth over markdown
- Overlap with C4 on whether something “belongs” vs whether it is “promoted”

#### Future Evolution

- Knowledge Capture Standard (AREDIR-KB-016)
- Automation of promotion workflow (tooling opportunity)

---

### C8 — Bootstrap & Inheritance Framework

#### Purpose

Define how repositories inherit the EOS, what a compliant repository contains, and what the Reference Repository ships — enabling future `aredir-project-bootstrap` without forking company authority.

#### Responsibilities

- Project Inheritance Model
- Engineering Blueprint Specification
- Reference Repository Specification
- Future Product Standards onboarding guide
- Bootstrap checklist and inheritance matrix

#### Explicit Non-Responsibilities

- Product customization content (brand, domain, feature specs)
- Runtime product features of the Reference Repository workspace product
- Owning promoted standard substance (other capabilities)
- Portfolio product strategy decisions

#### Inputs

- EOS / governance / KB updates
- Blueprint and platform version markers
- AEF bootstrap readiness classifications

#### Outputs

- Inheritance and bootstrap procedures
- Structural compliance contracts
- Platform specification for clone/sync/generate

#### Dependencies

- C1–C7 and C9–C10 assets that must be carried forward or referenced
- Especially C4 (docs structure), C5/C6 (operational templates)

#### Consumers

- New product repositories
- Future `aredir-project-bootstrap` authors
- Project leads assessing compliance

#### Lifecycle Position

- Repository lifecycle: Repository Creation → Bootstrap → EOS Inheritance
- Compliance assessment at bootstrap and quarterly

#### Authority

| Type | Ownership |
|------|-----------|
| Project Inheritance Model | **Primary** |
| Engineering Blueprint Specification | **Primary** |
| Reference Repository Specification | **Primary** |
| Future Product Standards (onboarding) | **Primary** |
| Repository Standards (operational hygiene) | **Primary** for bootstrap baseline expectations |
| `docs/company/` content substance | Not owned (respective capability owners) |

#### Success Criteria

- A new repo can reach Development Ready without inventing methodology
- Blueprint zones are discoverable
- Sync/reference model prevents forked company standards

#### Failure Modes

- Forking `docs/company/` into divergent product copies
- Bootstrap that includes product-specific domain content as defaults
- Missing indexes/agent/QA baseline at “ready”
- Unnecessary dependency on Reference Repository product features

#### Future Evolution

- AEF-002 extraction boundary discovery — Complete: [AEF-002](./AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md)
- Generator/tooling conforming to Blueprint (implementation later)

---

### C9 — Delivery & Release Framework

#### Purpose

Reliably ship software from idea through production validation using Work Packages, PR discipline, feature delivery stages, and release workflow.

#### Responsibilities

- Feature Delivery Standard (playbook)
- Engineering Work Packages as authoritative implementation specifications
- Implementation index discipline
- Company/Project/Engineering Governance aspects of SDLC, PR, and release process (execution)
- Deployment workflow and environment strategy (operational)
- Decision logs / ADR *practice* under Project Governance (until Decision Record Standard exists)

#### Explicit Non-Responsibilities

- Portfolio prioritization (EOS-002 Product Strategy competency)
- Architecture audit methodology (C3)
- Promotion process (C7)
- Agent guardrail standard definition (C6)
- Formal incident response playbooks (immature; not owned here as complete)

#### Inputs

- Strategy priorities and scoped initiatives
- Architecture findings
- Verification evidence from C5

#### Outputs

- Completed work packages
- Merged changes with evidence
- Release and deployment records
- Implementation index updates
- Candidates for knowledge capture

#### Dependencies

- C3 (when audit required)
- C5 (verification gates)
- C6 (when AI-assisted)
- C4 (documentation stage)
- C2 (SDLC/release governance orchestration)

#### Consumers

- C5 (items to verify)
- C7 (learnings)
- C8 (delivery templates for new repos)
- Operations validation after release

#### Lifecycle Position

- Primary owner of the delivery spine from Idea through Release & Production Validation
- Hands Knowledge Capture inputs to C7

#### Authority

| Type | Ownership |
|------|-----------|
| Feature Delivery Standard | **Primary** |
| Engineering Work Packages | **Primary** |
| Implementation index | **Primary** |
| Deployment workflow / environment strategy | **Primary** (operational) |
| PR / issue templates (workflow) | **Primary** |
| ADRs / decision logs (project) | **Primary** for practice location; future Decision Record Standard may refine format ownership under C4/C9 collaboration |
| Release checklist | Collaborates with C5 (C5 owns checklist quality content) |

#### Success Criteria

- One logical change per PR with verification evidence
- Work Packages are sufficient for implementation without conversational archaeology
- Preview → merge → production validation followed

#### Failure Modes

- Implementation before audit when architecture touch exists
- Optional briefs expanding scope
- Release without post-deploy validation
- Overlapping “delivery standard” copies in product repos

#### Future Evolution

- Promoted Release Management Playbook (C9 primary)
- Deployment Standards folder promotion

---

### C10 — Design & Experience Framework

#### Purpose

Deliver consistent, accessible, workspace-appropriate user experiences across products through product-agnostic UX principles and experience architecture.

#### Responsibilities

- Design Governance
- Workspace Experience Architecture (AREDIR-UX-001)
- Workspace-First AI Experience pattern (experience dimension; architecture file may sit under architecture-patterns with C3 collaboration)
- Operational UI patterns and component guidelines expectations
- Accessibility baseline expectations in experience delivery (with C5 verification)

#### Explicit Non-Responsibilities

- Product brand campaigns and marketing site creative direction as company engineering standards
- Feature-specific UI specifications
- QA checklist ownership (C5)
- Intelligence pipeline ownership (C3)

#### Inputs

- Product UI work
- Experience architecture reviews
- UI audit findings from C5

#### Outputs

- Experience architecture standards
- Design principles and UI convention guidance
- Workspace composition expectations for AI products

#### Dependencies

- C2 Design Governance orchestration
- C5 for accessibility/UI audit verification
- C6 for advisor workspace collaboration patterns

#### Consumers

- Product UI implementers
- C6 (workspace surfaces)
- C5 (UI audit criteria collaboration)

#### Lifecycle Position

- Design constraints during Architecture and Implementation
- Manual QA / UI audit lenses during Verification
- Not a separate gated stage replacing delivery lifecycle

#### Authority

| Type | Ownership |
|------|-----------|
| Design Governance | **Primary** |
| Workspace Experience Architecture | **Primary** |
| Operational UI patterns / component guidelines | **Primary** (operational) |
| Workspace-First AI Experience Pattern | **Shared** with C3 — C10 owns experience semantics; C3 owns architectural placement/ownership boundaries |
| UI Quality Audit Standard | Collaborator (C5 primary) |
| Product brand guides | Product-owned (not company framework primary) |

#### Success Criteria

- Shared primitives preferred over one-off components
- Accessibility spot-checked on user-facing changes
- AI products organize around workspace surfaces where applicable

#### Failure Modes

- Design guidance forked per product without Deviate
- Experience architecture conflicting with AI pipeline ownership
- Cards/chrome patterns contradicting promoted workspace principles without record

#### Future Evolution

- Cross-product primitive libraries
- Stronger linkage when UI Quality Audit is promoted

---

## 4. Framework Interaction Matrix

Legend: **P** producer · **C** consumer · **D** depends on · **X** collaborates · **R** reviews · **G** governs/orchestrates

Rows = source capability. Columns = target capability.

| From ↓ \ To → | C1 | C2 | C3 | C4 | C5 | C6 | C7 | C8 | C9 | C10 |
|---------------|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:--:|:---:|
| **C1 EOS** | — | G | G | G | G | G | G | G | G | G |
| **C2 Governance** | C | — | G | G/X | G | G | G/X | G | G | G |
| **C3 Architecture** | C | C | — | X | X | P | P | X | P | X |
| **C4 Documentation** | C | X | X | — | X | X | X | P | X | X |
| **C5 Quality** | C | C | C | X | — | X/R | P | X | C/X | X |
| **C6 AI Collaboration** | C | C | D/C | X | D/X | — | P | X | C/X | X |
| **C7 Knowledge** | P | P | C | D/X | C | C | — | P | C | C |
| **C8 Bootstrap** | D | D | D | D | D | D | D | — | D | D |
| **C9 Delivery** | C | C | D/C | P | P | P | P | X | — | X |
| **C10 Design** | C | C | X | X | X | X | P | X | X | — |

### Information flow (normative summary)

| Flow | Producer → Consumer | Interaction type |
|------|---------------------|------------------|
| Operating constraints | C1 → all | Governs |
| Domain conflict rules | C2 → C3–C10 | Governs / collaborates |
| Audit findings | C3 → C9 | Producer → consumer |
| Pipeline constraints | C3 → C6 | Producer / dependency |
| Doc hygiene rules | C4 → all | Collaboration / producer of rules |
| Verification evidence | C5 → C9 | Consumer gate / collaboration |
| Agent execution | C6 → C9 | Collaboration |
| Promotion candidates | C3/C5/C6/C9/C10 → C7 | Producer → consumer |
| Promoted assets | C7 → C8 / products | Producer |
| Inheritance package | C8 → new repos | Producer |
| Work packages | C9 → C5/C6 | Producer |
| Experience constraints | C10 → C6/C9 | Collaboration |

---

## 5. Ownership Matrix (artifacts → primary owner)

Every major artifact has **one primary owner**. Collaborators noted where evidence requires.

| Artifact | Primary owner | Collaborators | Notes |
|----------|---------------|---------------|-------|
| Engineering Operating System | **C1** | — | |
| Engineering Capability Model (EOS-002) | **C1** | — | Organizational competencies, not AEF C-ids |
| Governance Index + domain governance | **C2** | — | Orchestration only |
| Governance Maturity Model | **C2** | C1 | |
| Architecture Governance | **C3** | C2 | |
| Architecture Audit Standard / audits | **C3** | C4 (records) | |
| Architecture patterns | **C3** | C10 for experience patterns | |
| Documentation Governance | **C4** | C2 | |
| Documentation Maintenance Standard | **C4** | — | |
| Knowledge Artifact Taxonomy | **C4** | C7 | Classification vs promotion |
| QA Engineering Framework | **C5** | C9 | |
| Root Cause Analysis Framework | **C5** | — | |
| AI Evaluation Framework | **C5** | C6 | |
| UI Quality Audit Standard | **C5** | C10 | Draft |
| Operational QA checklists | **C5** | C9 | |
| AI Governance | **C6** | C2 | |
| Coding Agent Operating Standard | **C6** | C5 (gates) | |
| AI patterns | **C6** | C3 (pipeline), C10 (workspace UX) | |
| Guarded prompt / agent templates | **C6** | C9 | |
| Optional Implementation Briefs | **C6** | C9 (scope) | Scope authority remains Work Package |
| Knowledge Governance | **C7** | C2 | |
| Promotion Process / KB Index / registry | **C7** | C4 (index hygiene) | |
| Knowledge patterns | **C7** | — | |
| Project Inheritance Model | **C8** | C1 | |
| Engineering Blueprint Specification | **C8** | C1 | |
| Reference Repository Specification | **C8** | C1 | |
| Future Product Standards (onboarding) | **C8** | — | |
| Feature Delivery Standard | **C9** | C1 | |
| Engineering Work Packages | **C9** | — | |
| Implementation index | **C9** | C4 | |
| ADRs / decision logs | **C9** | C3, C4 | Until Decision Record Standard |
| Deployment / environment docs | **C9** | C5 | |
| PR / issue templates | **C9** | — | |
| Design Governance | **C10** | C2 | |
| Workspace Experience Architecture | **C10** | C3 | |
| Operational UI patterns | **C10** | — | |
| AEF series (`docs/company/framework/`) | **AEF document owner** (engineering lead) | C4 | Framework governance spine |
| Product domain architecture | **Product repo** | C3 (patterns) | Not an AEF capability |
| Product brand / marketing experience docs | **Product repo** | C10 (principles only) | |

---

## 6. Documentation Mapping

Authoritative map of major documentation areas → owning capability.

| Documentation area | Path / examples | Owning capability |
|--------------------|-----------------|-------------------|
| AEF framework series | `docs/company/framework/` | AEF governance (engineering lead); contracts in AEF-001 |
| EOS operating model | `ENGINEERING_OPERATING_SYSTEM.md`, Capability Model | **C1** |
| Inheritance / blueprint / reference platform | Inheritance, Blueprint, Reference Repo specs | **C8** (with C1) |
| Governance domains | `docs/company/governance/` | **C2** |
| Architecture patterns | `docs/company/architecture-patterns/` | **C3** |
| Architecture audits | `plan/docs/`, product audit folders | **C3** |
| Documentation standards | `docs/company/documentation-standards/` | **C4** |
| Taxonomy | `docs/company/knowledge/` | **C4** (taxonomy); **C7** (promotion use) |
| QA standards | `docs/company/qa-standards/` | **C5** |
| QA operational checklists | `docs/qa/` | **C5** |
| UI Quality Audit (draft) | `docs/standards/` | **C5** |
| AI patterns | `docs/company/ai-patterns/` | **C6** |
| Agent operational docs | `docs/agent/` | **C6** |
| Engineering agent standard (canonical) | `docs/company/engineering-standards/` | **C6** |
| Knowledge Base index / promotion | `KNOWLEDGE_BASE_INDEX.md`, `PROMOTION_PROCESS.md` | **C7** |
| Knowledge patterns | `docs/company/knowledge-patterns/` | **C7** |
| KB reviews / roadmap | `docs/company/reviews/`, roadmaps | **C7** (KB); EOS reviews under **C1** |
| Playbooks (Feature Delivery) | `docs/company/playbooks/` | **C9** |
| Implementation records | `docs/prompts/`, work packages | **C9** |
| Deployment / environment / repo hygiene | `docs/engineering/` | **C9** / **C8** (hygiene baseline) |
| Design governance + UX architecture | Design Governance; AREDIR-UX-001 | **C10** |
| Operational UI / components | `docs/architecture/ui-patterns.md`, component guidelines | **C10** |
| Product docs | `docs/product/` | Product (not AEF) |
| Brand (product) | `docs/brand/`, `docs/company/brand/` | Product / brand owners — engineering principles only via **C10** |
| Workspace product docs | `docs/workspace/` | Reference Repository product (internal; not universal bootstrap) |

This map is the **authoritative reference for future repository organization discussions**. Physical moves require a governed docs change (recommended as AEF-003) — not performed by AEF-001.

---

## 7. Boundary Analysis

### 7.1 Overlapping ownership (managed)

| Overlap | Clarification (normative) |
|---------|---------------------------|
| C2 governance vs promoted standards | C2 orchestrates; promoted assets own procedures (GOVERNANCE-001 resolution) |
| C3 pipeline vs C6 AI patterns | C3 owns pipeline architecture constraints; C6 owns agent/AI practice patterns that must respect C3 |
| C3 vs C10 on Workspace-First / Experience Architecture | C3 owns architectural pattern registry placement and system ownership boundaries; C10 owns experience semantics and UX principles |
| C4 taxonomy vs C7 promotion | C4 owns classification rules; C7 owns promotion decisions and KB membership |
| C5 AI Evaluation vs C6 AI patterns | C5 owns evaluation methodology; C6 owns patterns under evaluation |
| C5 UI Audit vs C10 Design | C5 owns audit framework; C10 supplies experience criteria collaboration |
| C6 briefs vs C9 Work Packages | C9 owns scope; C6 owns brief guardrails |
| C8 vs C1 on Inheritance/Blueprint/Reference specs | C8 primary for bootstrap/inheritance use; C1 retains operating-model series identity — changes require both perspectives |
| C9 release checklist vs C5 | C5 owns checklist quality content; C9 owns release workflow that consumes it |

### 7.2 Duplicated responsibilities (observations)

| Issue | Clarification |
|-------|---------------|
| Feature Delivery mentioned under Engineering Standards examples in KB Index while promoted as Playbook | **C9** is sole primary; index wording should treat it as playbook (hygiene — not a capability split) |
| Operational agent doc vs canonical Coding Agent Standard | Canonical **C6** company standard wins; operational copy implements |

### 7.3 Missing authority (known gaps — not invented here)

| Gap | Interim owner |
|-----|---------------|
| Decision Record Standard | **C9** practice + **C4** format collaboration until promoted |
| Knowledge Capture Standard | **C7** (planned AREDIR-KB-016) |
| Release Management Playbook | **C9** when promoted |
| Security Standard | Not an AEF capability; EOS-002 Security + Engineering Governance until promoted |
| `framework/` in Blueprint tree | **C8**/**C4** documentation structure follow-up (AEF-003) |

### 7.4 Coupling and unnecessary dependencies

| Coupling | Assessment |
|----------|------------|
| C8 depends on C1–C7, C9–C10 | Necessary for inheritance completeness; extraction should sync/reference, not re-own |
| C9 depends on C3 only when audit required | Correct — avoid mandatory audit on trivial changes |
| C7 centralization of registry | Necessary; bootstrap must not create a second registry |

### 7.5 Ambiguous governance — resolved by this contract

| Ambiguity | Resolution |
|-----------|------------|
| Who owns Work Packages vs Briefs | C9 vs C6 as above |
| Who owns UI audits | C5 primary |
| Who owns AEF series | Engineering lead via AEF documents; C4 hygiene |
| Who owns ADRs | C9 primary for project practice |

---

## 8. Bootstrap Readiness

Target: future `aredir-project-bootstrap`. Classifications are normative for sequencing discussions. **No extraction authorized by this document.**

| Capability | Classification | Evidence |
|------------|----------------|----------|
| C1 EOS | **Internal only** | Company methodology must remain authoritative in Labs; bootstrap syncs/references |
| C2 Governance | **Internal only** | Domain governance company-owned; bootstrap carries sync instructions |
| C3 Architecture | **Requires additional maturity** | Patterns reusable; product examples must be stripped before packaging |
| C4 Documentation | **Ready for extraction** | Naming, tiers, index rules stable (AEF-000 §9) |
| C5 Quality & Verification | **Ready for extraction** | Checklists + QA framework references template-ready; UI audit still draft |
| C6 AI Collaboration | **Ready for extraction** | Coding Agent Standard + guarded prompts are bootstrap essentials |
| C7 Knowledge | **Requires additional maturity** | Registry/promotion Labs-central; bootstrap needs consume/sync guidance only |
| C8 Bootstrap & Inheritance | **Ready for extraction** | Primary payload: checklist, blueprint zones, reference layout |
| C9 Delivery & Release | **Requires additional maturity** | Feature Delivery + PR templates ready; Release playbook not yet promoted |
| C10 Design & Experience | **Requires additional maturity** | UX architecture reusable; brand/visual scaffolds product-dependent |

### Product dependent (exclude from default bootstrap)

| Asset class | Classification |
|-------------|----------------|
| AlignFit domain architecture | **Product dependent** |
| Public site brand/experience docs | **Product dependent** |
| Workspace internal registry product features | **Product dependent** / platform-specific |
| Optional CMS choices | **Product dependent** unless declared stack baseline |

---

## 9. Shared Engineering Principles

Drawn only from evidenced EOS principles ([Engineering Operating System — Principles](../ENGINEERING_OPERATING_SYSTEM.md#principles)). These apply across all AEF capabilities:

| Principle | Meaning | Primary homes |
|-----------|---------|---------------|
| **Understand before modifying** | Audit current state before change | C3, C1 |
| **Evidence over assumption** | Claims require verification output | C5, C9 |
| **Canonical-first** | Company standards win unless Deviate documented | C4, C2, C7 |
| **Reusable over bespoke** | Proven patterns become company assets | C7 |
| **AI within boundaries** | Application owns decisions; LLM owns narrative | C3, C6 |
| **Incremental delivery** | Small verifiable steps over speculative rewrites | C9, C1 |
| **Products own implementation** | EOS/AEF own methodology; repos own domain code | C1, C8, products |

No additional aspirational principles are introduced.

---

## 10. Recommendations

1. Treat **AEF-001** as the normative ownership reference for framework evolution and future AEF work packages.
2. Do not merge/split C1–C10 without a new AEF discovery that supersedes AEF-000 inventory evidence.
3. Resolve index wording so Feature Delivery is consistently a **C9 playbook**.
4. Proceed to **AEF-002** for bootstrap file-set boundaries using §8 classifications — Complete: [AEF-002](./AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md).
5. Keep Decision Record, Knowledge Capture, and Release playbook work on existing roadmaps under the owners assigned here — do not create parallel owners.
6. When promoting UI Quality Audit, retain **C5** primary ownership unless a future AEF discovery reassigns with evidence.

---

## 11. Future Discovery Opportunities

| ID | Opportunity | Depends on |
|----|-------------|------------|
| AEF-002 | Bootstrap extraction boundary — exact file set | Complete — [AEF-002](./AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md) |
| AEF-003 | Documentation structure — Blueprint `framework/` listing; standards path normalization | C4, C8 |
| AEF-004 | Pattern catalog — established vs candidate list under owners | C3, C6, C7, C10 |
| AEF-005 | Quality umbrella — QA Framework / UI Audit (C5) vs external AQSF/AVF relationship | C5 |
| AREDIR-KB-016 | Knowledge Capture Standard | C7 |
| — | Decision Record Standard | C9 / C4 |
| — | Release Management Playbook | C9 |

---

## 12. Verification Record

| Check | Result |
|-------|--------|
| AEF-001 identifier unused as document | Confirmed |
| Capability inventory matches AEF-000 | C1–C10 unchanged |
| No new capabilities invented | Observed |
| No EOS redesign | Observed |
| No bootstrap extraction | Observed |
| No AlignFit modifications | Observed |
| Lifecycle not reinvented | References AEF-000 / EOS / Feature Delivery |

---

## Related

- [AEF-000 Aredir Engineering Framework Discovery](./AEF_000_AREDIR_ENGINEERING_FRAMEWORK_DISCOVERY.md)
- [AEF-002 Bootstrap Extraction Boundary](./AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md)
- [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md)
- [Engineering Capability Model](../ENGINEERING_CAPABILITY_MODEL.md)
- [Governance Index](../GOVERNANCE_INDEX.md)
- [Documentation Governance](../governance/DOCUMENTATION_GOVERNANCE.md)
- [Architecture Governance](../governance/ARCHITECTURE_GOVERNANCE.md)
- [Knowledge Governance](../governance/KNOWLEDGE_GOVERNANCE.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md)
- [Project Inheritance Model](../PROJECT_INHERITANCE_MODEL.md)
- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Implementation index](../../prompts/implementation-index.md)
