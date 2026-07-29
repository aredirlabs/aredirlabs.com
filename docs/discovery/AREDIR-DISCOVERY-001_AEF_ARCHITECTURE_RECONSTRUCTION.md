# AREDIR-DISCOVERY-001 — AEF Architecture Reconstruction

**Status:** Discovery Complete  
**Owner:** Aredir Labs  
**Work item:** AREDIR-DISCOVERY-001  
**Authority basis:** AEF-000, AEF-001, AEF-002, EOS, Engineering Capability Model, Governance Index, all eight domain governance docs, Promotion Process, Knowledge Base Index, Knowledge Artifact Taxonomy, Project Inheritance Model, Engineering Blueprint Specification, Reference Repository Specification, Feature Delivery Standard  
**Last reviewed:** 2026-07-29

---

## Evidence Classification Rules

| Classification | Meaning |
|----------------|---------|
| **Confirmed** | Directly supported by artifact evidence |
| **Inferred** | Supported by multiple evidence sources; not explicitly stated |
| **Unknown** | Insufficient evidence to determine |

This document does not redesign, recommend improvements, introduce new capabilities, rename concepts, rewrite documentation, or perform promotion work.

---

## 1. Executive Summary

### What AEF is

The Aredir Engineering Framework (AEF) is the **framework identity and boundary** for Aredir Labs' company-owned engineering methodology. It is not a replacement for the Engineering Operating System (EOS). It is the naming and ownership spine that bounds what "Aredir engineering methodology" includes. **(Confirmed — AEF-000 §1)**

### What problem it solves

AEF addresses the absence of a formalized boundary and ownership map for the methodology that had already emerged organically across EOS, governance, knowledge, standards, patterns, and playbooks. Prior to AEF-000, there was no single document that inventories all methodological subsystems, assigns ownership, or distinguishes framework capabilities from organizational competencies. **(Confirmed — AEF-000 §1, AEF-001 §1)**

### Current architectural philosophy

AEF employs a **hybrid model** combining hierarchy, lifecycle, and dependency graph relationships. Evidence does not support a single pure structural model. The framework uses:
- **Hierarchy** (partial): EOS layer stack — Vision → Principles → Capabilities → Frameworks → Standards → Patterns → Playbooks → Products
- **Lifecycle** (partial): Feature Delivery lifecycle, repository bootstrap lifecycle, evidence lifecycle
- **Dependency graph** (partial): Capability interaction maps, cross-referenced ownership matrix
- **Feedback loops**: Knowledge promotion feeds back into EOS; bootstrap consumes all layers

**(Confirmed — AEF-000 §5, EOS §Lifecycle)**

---

## 2. Framework Capability Inventory

### C1 — Engineering Operating System

| Field | Value |
|-------|-------|
| **Purpose** | Provide the company operating model connecting vision, principles, organizational capabilities, frameworks, standards, patterns, playbooks, and product inheritance into one coherent methodology |
| **Owner** | Aredir Labs engineering lead |
| **Authoritative documents** | `ENGINEERING_OPERATING_SYSTEM.md` (EOS-001), `ENGINEERING_CAPABILITY_MODEL.md` (EOS-002), `PROJECT_INHERITANCE_MODEL.md` (EOS-003), `ENGINEERING_BLUEPRINT_SPECIFICATION.md` (EOS-004), `REFERENCE_REPOSITORY_SPECIFICATION.md` (IMPLEMENTATION-001) |
| **Relationship to other capabilities** | Orchestrates all other capabilities (C2–C10); root operating model; consumed by products, agents, bootstrap authors |

**(Confirmed — AEF-001 §3 C1)**

### C2 — Governance Framework

| Field | Value |
|-------|-------|
| **Purpose** | Orchestrate eight governance domains so company practice is consistent, conflict rules are clear, and maturity can be assessed — without replacing canonical promoted assets |
| **Owner** | Engineering lead (domain docs); domain owners for updates |
| **Authoritative documents** | `GOVERNANCE_INDEX.md`, eight domain governance docs under `governance/`, `GOVERNANCE_MATURITY_MODEL.md`, GOVERNANCE-001 review |
| **Relationship to other capabilities** | Orchestrates C3–C10; does not own promotion checklists (C7), audit methodology (C3), agent procedures (C6), or feature delivery detail (C9) |

**(Confirmed — AEF-001 §3 C2)**

### C3 — Architecture Framework

| Field | Value |
|-------|-------|
| **Purpose** | Ensure systems are understood before change through ownership analysis, source-of-truth clarity, reusable architecture patterns, and the application-owned intelligence pipeline |
| **Owner** | Engineering lead + architecture pattern asset owners |
| **Authoritative documents** | Architecture Governance, `ARCHITECTURE_AUDIT_STANDARD.md`, `architecture-patterns/*` |
| **Relationship to other capabilities** | Produces findings → C9 (work packages); provides pipeline constraints → C6; feeds promotion candidates → C7 |

**(Confirmed — AEF-001 §3 C3)**

### C4 — Documentation Framework

| Field | Value |
|-------|-------|
| **Purpose** | Keep engineering knowledge durable, discoverable, and synchronized with code and standards through ownership tiers, naming, status, cross-linking, and maintenance discipline |
| **Owner** | Engineering lead; asset owners for canonical docs |
| **Authoritative documents** | Documentation Governance, `DOCUMENTATION_MAINTENANCE_STANDARD.md`, `KNOWLEDGE_ARTIFACT_TAXONOMY.md` |
| **Relationship to other capabilities** | Rules apply to all capabilities; taxonomy supports C7 but does not own promotion; C8 depends on doc structure |

**(Confirmed — AEF-001 §3 C4)**

### C5 — Quality & Verification Framework

| Field | Value |
|-------|-------|
| **Purpose** | Embed verification throughout delivery so "done" requires evidence — including QA lifecycle, RCA, release readiness, AI evaluation, and UI quality audit (draft) |
| **Owner** | Engineering lead; implementers for operational checklists |
| **Authoritative documents** | `QA_ENGINEERING_FRAMEWORK.md`, `ROOT_CAUSE_ANALYSIS_FRAMEWORK.md`, `AI_EVALUATION_FRAMEWORK.md` (methodology), operational checklists (`docs/qa/*`), UI Quality Audit Standard (draft in `docs/standards/`) |
| **Relationship to other capabilities** | Consumes C9 work products; collaborates with C6 on AI evaluation; feeds quality learnings to C7; collaborates with C10 on UI audit |

**(Confirmed — AEF-001 §3 C5)**

### C6 — AI Collaboration Framework

| Field | Value |
|-------|-------|
| **Purpose** | Enable safe, verifiable collaboration with AI agents and LLMs within governed boundaries — for both coding agents and product AI intelligence features |
| **Owner** | Engineering lead; AI pattern asset owners |
| **Authoritative documents** | AI Governance, `CODING_AGENT_OPERATING_STANDARD.md`, `ai-patterns/*`, guarded prompt template, agent operational docs |
| **Relationship to other capabilities** | Depends on C3 pipeline constraints; collaborates with C5 verification gates; produces AI-assisted implementation for C9; collaborates with C10 on workspace surfaces |

**(Confirmed — AEF-001 §3 C6)**

### C7 — Knowledge Framework

| Field | Value |
|-------|-------|
| **Purpose** | Capture, promote, version, deprecate, and distribute reusable engineering knowledge so proven practice compounds across products |
| **Owner** | Aredir Labs (index/process); asset owners (content reviews) |
| **Authoritative documents** | Knowledge Governance, `PROMOTION_PROCESS.md`, `KNOWLEDGE_BASE_INDEX.md`, `KNOWLEDGE_BASE_ROADMAP.md`, `knowledge-patterns/*`, registry reviews |
| **Relationship to other capabilities** | Consumes promotion candidates from C3/C5/C6/C9/C10; serves all products and capabilities via Adopt/Extend/Deviate; depends on C4 taxonomy and indexes |

**(Confirmed — AEF-001 §3 C7)**

### C8 — Bootstrap & Inheritance Framework

| Field | Value |
|-------|-------|
| **Purpose** | Define how repositories inherit the EOS, what a compliant repository contains, and what the Reference Repository ships — enabling future `aredir-project-bootstrap` without forking company authority |
| **Owner** | Engineering lead |
| **Authoritative documents** | `PROJECT_INHERITANCE_MODEL.md`, `ENGINEERING_BLUEPRINT_SPECIFICATION.md`, `REFERENCE_REPOSITORY_SPECIFICATION.md`, `future-product-standards.md`, `repository-standards.md` |
| **Relationship to other capabilities** | Depends on all C1–C7, C9–C10 assets (must carry forward or reference); extraction boundary defined in AEF-002 |

**(Confirmed — AEF-001 §3 C8)**

### C9 — Delivery & Release Framework

| Field | Value |
|-------|-------|
| **Purpose** | Reliably ship software from idea through production validation using Work Packages, PR discipline, feature delivery stages, and release workflow |
| **Owner** | Engineering lead; all implementers for PR discipline |
| **Authoritative documents** | `FEATURE_DELIVERY_STANDARD.md`, Company/Project/Engineering Governance (SDLC/release sections), deployment workflow, environment strategy, implementation index, PR templates |
| **Relationship to other capabilities** | Consumes C3 findings; delivers to C5 for verification; uses C6 for AI-assisted implementation; feeds C7 learnings; provides delivery templates for C8 |

**(Confirmed — AEF-001 §3 C9)**

### C10 — Design & Experience Framework

| Field | Value |
|-------|-------|
| **Purpose** | Deliver consistent, accessible, workspace-appropriate user experiences across products through product-agnostic UX principles and experience architecture |
| **Owner** | Engineering lead / design governance; UX pattern asset owners |
| **Authoritative documents** | Design Governance, Workspace Experience Architecture (AREDIR-UX-001), workspace patterns, UI patterns, component guidelines |
| **Relationship to other capabilities** | Collaborates with C3 on workspace pattern ownership; collaborates with C5 on UI audit; collaborates with C6 on advisor workspace patterns; feeds experience candidates to C7 |

**(Confirmed — AEF-001 §3 C10)**

### Ten capabilities identified. No more, no fewer. (Confirmed — AEF-000 §3, AEF-001 §1)

---

## 3. Governance Model

### Governance responsibilities

Governance is **distributed across eight domains** that support the ten EOS-002 organizational capabilities. Governance **orchestrates** — it does not duplicate canonical promoted assets. **(Confirmed — GOVERNANCE_INDEX.md, EOS §Relationship to governance)**

| Domain | Primary capability supported |
|--------|-----------------------------|
| Knowledge Governance | Knowledge Management |
| Architecture Governance | Architecture |
| AI Governance | AI Engineering |
| Engineering Governance | Quality Engineering, Delivery |
| Documentation Governance | Documentation |
| Design Governance | Design |
| Company Governance | Delivery, Product Strategy |
| Project Governance | Delivery, Documentation |

**(Confirmed — GOVERNANCE_INDEX.md)**

### Authority boundaries

| Boundary Rule | Source |
|---------------|--------|
| Governance orchestrates domain practice; promoted standards own procedural detail | **(Confirmed — GOVERNANCE_INDEX.md, AEF-001 §7.1)** |
| Canonical `docs/company/` wins unless governed Deviate decision exists | **(Confirmed — PROMOTION_PROCESS.md, PROJECT_INHERITANCE_MODEL.md)** |
| Promoted Knowledge Base assets win over operational docs | **(Confirmed — GOVERNANCE_INDEX.md)** |
| Governance framework docs win over scattered operational guidance when scope overlaps | **(Confirmed — GOVERNANCE_INDEX.md)** |
| AEF capabilities (C1–C10) are methodological subsystems distinct from EOS-002 organizational competencies | **(Confirmed — AEF-000 §3, AEF-001 §1)** |

### Ownership model

| Ownership Tier | Scope | Authority |
|----------------|-------|-----------|
| **Aredir Labs (company-owned)** | EOS, governance, Knowledge Base, blueprint, template, framework | Engineering lead; cannot be overridden by product repos |
| **Repository-owned** | Domain architecture, feature specs, implementation records, product docs, ADRs | Product leads |
| **Bootstrap-owned (future)** | Operational templates, agent docs, QA checklists (copied, not authoritative) | Bootstrap maintainers (copies; canonical remains in Labs) |
| **Quality Systems (external)** | AQSF/AVF evaluation and verification methodology | `aredir-quality-systems` repository |
| **Product-dependent** | Brand, marketing, domain schemas | Product owners |

**(Confirmed — PROJECT_INHERITANCE_MODEL.md, AEF-001 §5, CAPABILITY_MODEL.md)**

### Documentation authority

| Tier | Location | Owner | Wins when |
|------|----------|-------|-----------|
| Canonical | `docs/company/` | Asset owner | Always (unless Deviate documented) |
| Governance | `docs/company/governance/` | Engineering lead | Over operational / implementation |
| Operational | `docs/agent/`, `docs/qa/`, `docs/engineering/`, `docs/architecture/` | Change implementer | Implements canonical upward |
| Implementation | `docs/product/`, `plan/docs/`, `docs/prompts/` | Work-item author | Product-specific only |

**(Confirmed — DOCUMENTATION_GOVERNANCE.md, COMPANY_GOVERNANCE.md)**

### Review responsibilities

| Review Type | Owner | Cadence |
|-------------|-------|---------|
| EOS review | Engineering lead | Quarterly |
| Governance framework review | Engineering lead | Quarterly |
| KB promoted asset review | Asset owner | Quarterly (per category rotation) |
| Maturity assessment | Product leads + engineering | Quarterly |
| Blueprint compliance check | Engineering lead | At bootstrap and quarterly |

**(Confirmed — EOS §Maintenance, GOVERNANCE_INDEX.md, PROMOTION_PROCESS.md)**

---

## 4. Knowledge Architecture

### Knowledge Base

The Knowledge Base is the **canonical store of promoted company intellectual property** within the EOS. It is not the entire operating system — it is the durable output of the promotion lifecycle. **(Confirmed — EOS §Relationship to Knowledge Base)**

**15 promoted assets** across 7 categories as of the most recent inventory:

| Category | Assets | Count |
|----------|--------|-------|
| Architecture Patterns | AI Intelligence Architecture, Workspace Experience Architecture, Workspace-First AI Experience | 3 |
| Knowledge Patterns | Evidence Lifecycle Pattern | 1 |
| Engineering Standards | Coding Agent Operating Standard | 1 |
| QA Standards | QA Engineering Framework, Root Cause Analysis Framework | 2 |
| AI Patterns | Context Builder, Response Contract, AI Evaluation Framework, Human + AI Advisor Workspace, Evidence-Aware AI Advisor | 5 |
| Documentation Standards | Architecture Audit Standard, Documentation Maintenance Standard | 2 |
| Playbooks | Feature Delivery Standard | 1 |

**(Confirmed — KNOWLEDGE_BASE_INDEX.md)**

Additional categories exist as placeholders: Deployment Standards (future), Prompt Library (future). **(Confirmed — KNOWLEDGE_BASE_INDEX.md)**

### Promoted assets

Promoted assets follow a lifecycle: **Candidate → Reviewing → Promoted Standard → Company Standard → Deprecated / Superseded**. **(Confirmed — PROMOTION_PROCESS.md)**

Assets at Company Standard status (widely adopted or mandated) include none explicitly listed; the highest status assigned in documentation is Promoted Standard. Feature Delivery Standard is listed as "candidate" in one KB Index section while promoted elsewhere — an index inconsistency. **(Confirmed — KNOWLEDGE_BASE_INDEX.md, AEF-000 §7.2)**

### Patterns

Established promoted patterns:

| Pattern | Category | AEF Home |
|---------|----------|----------|
| Application-Owned Intelligence Pipeline | Architecture Pattern | C3, C6 |
| Context Builder Pattern | AI Pattern | C6 |
| Response Contract Pattern | AI Pattern | C6 |
| Workspace-First AI Experience | Architecture Pattern | C6, C10 |
| Human + AI Advisor Workspace | AI Pattern | C6, C10 |
| Evidence-Aware AI Advisor | AI Pattern | C6, C7 |
| Evidence Lifecycle Pattern | Knowledge Pattern | C7 |
| Workspace Experience Architecture | Architecture Pattern | C10 |
| Architecture Audit Pattern | Documentation Standard | C3 |
| Work Package Pattern | Playbook | C9 |
| Adopt / Extend / Deviate Pattern | Promotion Process | C7, C8 |
| Three-Tier Documentation Pattern | Documentation Standard | C4 |
| Knowledge Promotion Pattern | Promotion Process | C7 |
| Guarded Agent Execution Pattern | Engineering Standard | C6 |

**(Confirmed — AEF-000 §8.1)**

### Standards

Promoted standards exist in four categories: Engineering Standards (1), QA Standards (2), Documentation Standards (2), Playbooks (1). Deployment Standards category exists but has no promoted content. **(Confirmed — KNOWLEDGE_BASE_INDEX.md)**

### Operational documentation

Operational docs exist under `docs/agent/`, `docs/qa/`, `docs/bugs/`, `docs/engineering/`, `docs/architecture/`, `docs/prompts/`. These implement canonical standards but do not redefine them. **(Confirmed — DOCUMENTATION_GOVERNANCE.md)**

### Relationship between knowledge and framework

Knowledge is one methodological subsystem (C7) inside the AEF boundary. The Knowledge Base is the durable IP store. Promotion is how project learnings become company assets. The Knowledge Governance domain orchestrates knowledge practice. **(Confirmed — AEF-000 §1, EOS §Relationship to Knowledge Base)**

The KB Index states: "The AEF (AEF-000+) is listed as a separate entry below the KB categories. AEF is the framework boundary, not a KB category." **(Confirmed — KNOWLEDGE_BASE_INDEX.md)**

---

## 5. Promotion Architecture

### Promotion lifecycle

The authoritative promotion lifecycle from `PROMOTION_PROCESS.md`:

```
Project Artifact → Candidate Asset → Review → Promoted Asset → Company Standard
                                                                     ↓
                                                             Deprecated / Superseded
```

**(Confirmed — PROMOTION_PROCESS.md)**

### Categories

| Category | KB Location | Example |
|----------|-------------|---------|
| Architecture Pattern | `docs/company/architecture-patterns/` | AI Intelligence Architecture Pattern |
| Engineering Standard | `docs/company/engineering-standards/` | Coding Agent Operating Standard |
| QA Standard | `docs/company/qa-standards/` | QA Engineering Framework |
| AI Pattern | `docs/company/ai-patterns/` | Context Builder Pattern |
| Playbook | `docs/company/playbooks/` | Feature Delivery Standard |
| Prompt Asset | `docs/company/prompt-library/` | (future — no promoted assets) |
| Documentation Standard | `docs/company/documentation-standards/` | Architecture Audit Standard |
| Deployment Standards | `docs/company/deployment-standards/` | (future — no promoted assets) |

**(Confirmed — PROMOTION_PROCESS.md, KNOWLEDGE_BASE_INDEX.md)**

### Promotion ownership

| Role | Responsibility |
|------|----------------|
| **Aredir Labs** | Index/process ownership, promotion acceptance authority |
| **Asset owner** | Content reviews, quarterly maintenance |
| **Origin project** | Identification of candidates |
| **Product leads** | Adoption confirmation for linked projects |
| **Quality Systems (external)** | Finding → promotion-candidate recording (AQSF-002 conventions) |

**(Confirmed — PROMOTION_PROCESS.md, KNOWLEDGE_GOVERNANCE.md)**

### Validation expectations

| Requirement | Description |
|-------------|-------------|
| Documented | Clear purpose, scope, usage |
| Successfully implemented | Proven in a real system |
| Validated through real usage | Exercised in UAT, production, or repeated agent runs |
| Reusable across multiple projects | Adaptable without rewrite |
| Clear ownership | Named owner for maintenance |
| Measurable value | Reduces defects, tokens, time, inconsistency, or onboarding cost |

**(Confirmed — PROMOTION_PROCESS.md)**

### Repository boundaries

| Repository | Promotion Role |
|------------|----------------|
| **aredirlabs-com** | Canonical methodology authority; owns promotion authority and KB index |
| **Product repos** | Produce candidates; cannot self-promote to company standard |
| **aredir-quality-systems** | Records finding → candidate linkage; does not authorize company-standard publication |
| **aredir-project-bootstrap** (future) | No promotion authority; no second registry; sync-only consumer |

**(Confirmed — PROMOTION_PROCESS.md §Assessment outputs and Quality Systems, AEF-002 §8)**

---

## 6. Documentation Architecture

### Current organization

Documentation is organized under a top-level `docs/` tree with subdirectories:

| Path | Role |
|------|------|
| `docs/company/` | Canonical company methodology and promoted KB assets |
| `docs/company/framework/` | AEF series (AEF-000, AEF-001, AEF-002) |
| `docs/company/governance/` | Eight domain governance docs + maturity model |
| `docs/company/architecture-patterns/` | Promoted architecture patterns |
| `docs/company/ai-patterns/` | Promoted AI patterns |
| `docs/company/engineering-standards/` | Promoted engineering standards |
| `docs/company/qa-standards/` | Promoted QA standards |
| `docs/company/documentation-standards/` | Promoted documentation standards |
| `docs/company/knowledge-patterns/` | Promoted knowledge patterns |
| `docs/company/playbooks/` | Promoted playbooks |
| `docs/company/knowledge/` | Knowledge Artifact Taxonomy |
| `docs/company/reviews/` | Formal review records |
| `docs/company/brand/` | Company brand docs |
| `docs/agent/` | Operational agent docs |
| `docs/qa/` | Operational QA checklists |
| `docs/bugs/` | Bug triage, templates, known issues |
| `docs/engineering/` | Operational engineering docs |
| `docs/architecture/` | Conventions, patterns, UI guidelines (operational) |
| `docs/prompts/` | Implementation records and prompt index |
| `docs/product/` | Product-specific docs |
| `docs/brand/` | Product brand docs |
| `docs/workspace/` | Reference Repository workspace product docs |
| `docs/standards/` | Draft standards (UI Quality Audit — not yet promoted) |
| `docs/discovery/` | Discovery records |
| `docs/missions/` | Engineering mission records |
| `docs/spikes/` | Engineering spike records |
| `docs/incubator/` | Future capability concepts |

**(Confirmed — Repository listing, KNOWLEDGE_BASE_INDEX.md, AEF-000 §7)**

### Canonical documentation

Canonical docs live under `docs/company/`. They include EOS, Governance Index, domain governance, capability model, inheritance model, blueprint, reference repository spec, promotion process, KB index, knowledge artifact taxonomy, and all promoted KB assets by category. **(Confirmed — DOCUMENTATION_GOVERNANCE.md)**

### Operational documentation

Operational docs live under `docs/agent/`, `docs/qa/`, `docs/bugs/`, `docs/engineering/`, `docs/architecture/`. They implement canonical standards. They must link upward to canonical assets. Conflict rule: canonical wins. **(Confirmed — DOCUMENTATION_GOVERNANCE.md, PROMOTION_PROCESS.md)**

### Implementation documentation

Implementation docs live under `docs/prompts/`, `docs/product/`, `plan/docs/`. These include engineering work packages, implementation briefs, verification specs, and project notes. They are not promoted by default. **(Confirmed — DOCUMENTATION_GOVERNANCE.md, KNOWLEDGE_ARTIFACT_TAXONOMY.md)**

### Reviews

Review records live under `docs/company/reviews/` when company-scoped. Also: `plan/docs/` for product-scoped audits and verification records. **(Confirmed — KNOWLEDGE_ARTIFACT_TAXONOMY.md)**

### Standards

Standards exist at two levels:
- **Promoted standards**: Under `docs/company/<category>/` (engineering-standards, qa-standards, documentation-standards)
- **Operational standards**: Under `docs/agent/`, `docs/engineering/`, `docs/architecture/` implementing canonical

**(Confirmed — KNOWLEDGE_BASE_INDEX.md, DOCUMENTATION_GOVERNANCE.md)**

### Governance documentation

Governance docs are under `docs/company/governance/`. They are the orchestration layer — they do not duplicate promoted standards' detail. **(Confirmed — GOVERNANCE_INDEX.md)**

---

## 7. Framework Relationships

### Architectural model

```
                    ┌─────────────────────────────┐
                    │  AEF (framework boundary)    │
                    │  AEF-000, AEF-001, AEF-002   │
                    └──────────────┬──────────────┘
                                   │
              ┌────────────────────┼────────────────────┐
              ▼                    ▼                    ▼
     C1 EOS (operating)    C2 Governance        C8 Bootstrap
     (EOS-001…004)         (8 domains)          (EOS-003, EOS-004,
              │                    │              IMPLEMENTATION-001)
              └─────────┬──────────┘                    │
                        ▼                               │
           ┌────────────────────────┐                   │
           │   C3–C10 subsystems    │                   │
           │  ┌─────────────────┐   │                   │
           │  │ C3 Architecture │   │                   │
           │  │ C6 AI           │   │                   │
           │  │ C10 Design      │   │                   │
           │  │ C4 Docs         │◄──┼───────────────────┘
           │  └────────┬────────┘   │
           │           ▼            │
           │  C9 Delivery & Release │
           │           ▼            │
           │  C5 Quality & Verif   │
           │           ▼            │
           │  C7 Knowledge         │
           └────────────────────────┘
                        │
                        └──► updates EOS / KB / bootstrap inputs
```

**(Confirmed — AEF-000 §5 hybrid relationship diagram)**

### Interaction matrix summary

| Relationship type | Examples |
|-------------------|----------|
| **Governs** | C1 → all; C2 → C3–C10 |
| **Produces → consumes** | C3 → C9 (findings); C9 → C5 (work); C5 → C7 (learnings); C7 → all (assets) |
| **Collaborates** | C3 ↔ C10 (workspace patterns); C5 ↔ C6 (AI evaluation); C4 ↔ C7 (taxonomy/promotion) |
| **Depends on** | C8 depends on all C1–C7, C9–C10; C6 depends on C3 pipeline constraints |
| **Depends on (conditional)** | C9 depends on C3 only when audit required |

**(Confirmed — AEF-001 §4 Framework Interaction Matrix)**

### External relationships

| External entity | Relationship to AEF |
|-----------------|---------------------|
| `aredir-quality-systems` (AQSF/AVF) | External; consumed by C3 audits; feeds promotion candidates to C7; not an AEF capability |
| `aredir-project-bootstrap` (future) | Distribution and adoption packaging; not an authority; consumes AEF by sync/reference |
| Product repos (AlignFit, ClassForge, LeagueOS) | Domain implementation; Adopt/Extend/Deviate company assets; feed promotion candidates back |

**(Confirmed — AEF-000 §2, CAPABILITY_MODEL.md, AEF-002)**

### Known relationship gaps

| Gap | Type |
|-----|------|
| Relationship between AQSF/AVF and AEF not fully formalized beyond "external, consumed by reference" | **(Confirmed — AEF-000 §10.1, AEF-001 §7.3)** |
| Consulting practice framework does not exist; AEF relationship to future consulting is undefined | **(Confirmed — AEF-000 §2)** |
| Relationship between `docs/company/deployment-standards/` (exists as empty category) and operational deployment docs not specified | **(Confirmed — KNOWLEDGE_BASE_INDEX.md)** |

---

## 8. Architectural Observations

### Capability exists

- Ten AEF methodological subsystems (C1–C10) are identified and documented with contracts **(Confirmed)**
- Fifteen promoted KB assets exist across seven categories **(Confirmed)**
- Eight governance domains documented **(Confirmed)**
- EOS-001…004, GOVERNANCE-001, IMPLEMENTATION-001, AEF-000…002 all exist as numbered work items **(Confirmed)**

### Capability established but not extracted

- C8 (Bootstrap & Inheritance) is fully specified but `aredir-project-bootstrap` repository does not exist **(Confirmed — AEF-000 §1, AEF-002)**

### Responsibility duplicated

- Feature Delivery Standard listed as "candidate" in one KB Index section while promoted as a Playbook elsewhere **(Confirmed — AEF-000 §7.2, KNOWLEDGE_BASE_INDEX.md)**
- Feature Delivery Standard mentioned under Engineering Standards examples while it is a Playbook **(Confirmed — AEF-001 §7.2)**

### Responsibility absent

- Decision Record Standard not promoted (interim: C9 practice + C4 format collaboration) **(Confirmed — AEF-001 §7.3)**
- Knowledge Capture Standard not promoted (planned AREDIR-KB-016) **(Confirmed — AEF-001 §7.3)**
- Release Management Playbook not promoted **(Confirmed — AEF-001 §7.3)**
- Security Standard not promoted **(Confirmed — AEF-001 §7.3)**
- Formal incident response/observability playbooks immature **(Confirmed — AEF-000 §10.1)**

### Ownership unclear

- C3 vs C10 shared ownership of Workspace-First AI Experience / Workspace Experience Architecture patterns **(Confirmed — AEF-001 §7.1)**
- C8 vs C1 shared ownership of Inheritance/Blueprint/Reference specs (C8 primary for bootstrap; C1 retains operating-model identity) **(Confirmed — AEF-001 §7.1)**

### Relationship implicit

- AEF capabilities (C1–C10) are not explicitly mapped to EOS-002 organizational capabilities in a single authoritative matrix outside AEF-000 **(Confirmed — AEF-000 §3)**
- Quality Systems (AQSF/AVF) relationship to AEF is documented but operates by reference only **(Confirmed — AEF-000 §10.1)**

### Terminology inconsistent

- "Framework" used in multiple overloaded senses: AEF (framework identity), Governance Framework (orchestration layer), QA/RCA/AI Evaluation "Frameworks" (standards), Knowledge Framework (C7 — methodological subsystem) **(Confirmed — cross-document usage)**
- Feature Delivery Standard inconsistently referenced as both "playbook" and "candidate" **(Confirmed — AEF-000 §7.2)**
- "Knowledge Base" used to refer both to the promoted asset index and the entire `docs/company/` directory **(Inferred — KNOWLEDGE_BASE_INDEX.md scope statement)**

### Missing documentation

- `docs/company/framework/` folder not listed in Blueprint directory tree **(Confirmed — AEF-000 §7.2)**
- UI Quality Audit Standard (draft) lives in `docs/standards/` not `docs/company/` **(Confirmed — AEF-000 §7.2)**
- AEF-003 (documentation structure), AEF-004 (pattern catalog), AEF-005 (quality umbrella) identified but not started **(Confirmed — AEF-001 §11)**

---

## 9. Unknowns

| Unknown | Rationale |
|---------|-----------|
| How AEF will evolve after AEF-002 | No discovery work items beyond AEF-005 have been chartered or started. Future evolution path is unspecified beyond listed opportunities. **(Confirmed — AEF-001 §11)** |
| Whether `aredir-project-bootstrap` will actually be created | Specified (AEF-002) and readiness assessed, but no implementation work package exists. The repository does not exist. **(Confirmed — AEF-002)** |
| How AEF relates to consulting practice | No consulting practice framework exists in the artifact set. Public engineering messaging positions methodology as company identity, but consulting delivery processes are not documented as AEF capabilities. **(Confirmed — AEF-000 §2)** |
| When deferred EOS-002 capabilities (Data Engineering, Platform Engineering, DevEx, Research, Customer Experience, Analytics) will mature | These remain intentionally deferred with no timeline. Conditions for re-evaluation stated ("second product validates need" or "promoted standard exists") but no specific triggers documented. **(Confirmed — CAPABILITY_MODEL.md)** |
| Whether AEF should have a version | Neither AEF nor its capability contracts carry a version number. EOS has blueprint v1.0, but AEF series itself is unversioned. **(Confirmed — examination of AEF-000, AEF-001, AEF-002)** |
| Who specifically is the "engineering lead" | Referenced throughout as authority figure but never named. Role described in responsibility matrices but not tied to a named individual. **(Confirmed — cross-document reference to "Aredir Labs engineering lead")** |
| How product repos currently sync `docs/company/` | Inheritance model states "sync `docs/company/`" but no synchronization script, documented procedure, or versioned methodology pack exists in current repository. **(Confirmed — examination of repository contents)** |

---

## 10. Overall Reconstruction

The Aredir Engineering Framework (AEF) is the **framework identity boundary** for Aredir Labs' engineering methodology. It does not replace the Engineering Operating System (EOS). It is the naming and ownership spine that bounds what "Aredir engineering methodology" includes as a whole.

### Current state

The AEF as it exists today is a **documented but not fully formalized hybrid architecture** consisting of:

1. **Ten methodological subsystems (C1–C10)**, each with defined purpose, ownership, boundaries, dependencies, and artifacts. These are distinct from the ten EOS-002 organizational competencies.

2. **An eight-domain Governance Framework** that orchestrates practice across all subsystems without duplicating their procedural detail.

3. **A Knowledge Base** of 15 promoted assets across 7 categories, managed by a defined Promotion Process with lifecycle states (Candidate → Promoted Standard → Company Standard → Deprecated/Superseded).

4. **A three-tier documentation model** (canonical / operational / implementation) with clear conflict rules: canonical wins unless Deviate documented.

5. **A defined repository inheritance model** (EOS-003) and blueprint (EOS-004) specifying how products adopt company methodology.

6. **A specified but unextracted bootstrap capability** (C8) targeting a future `aredir-project-bootstrap` repository.

7. **An external Quality Systems boundary** (`aredir-quality-systems`) that provides assessment methodology outside AEF.

### What exists in documentation vs what exists in practice

Documentation: AEF-000, AEF-001, AEF-002, EOS-001…004, GOVERNANCE-001, IMPLEMENTATION-001, 15 promoted assets, 8 domain governance docs, Knowledge Base Index, Promotion Process, and supporting standards/patterns/playbooks.

Not yet implemented: `aredir-project-bootstrap` repository, Decision Record Standard, Knowledge Capture Standard, Release Management Playbook, Security Standard, incident/observability playbooks, sync automation for product repos, versioned methodology pack releases.

### Architectural style

The AEF currently exhibits a **centralized authority model** with Aredir Labs as the canonical source of methodology truth, product repos as domain implementation consumers, and a defined (but not automated) feedback loop through the Promotion Process. External capabilities (Quality Systems) are consumed by reference rather than absorbed.

Documentation is the primary mechanism of governance enforcement — there is no automated compliance tooling, no sync automation, and no versioned methodology distribution mechanism.

### Key gaps (evidence-supported)

- Three promoted standards identified as needed but not yet created (Decision Record, Knowledge Capture, Release Playbook)
- One draft standard outside the canonical path (UI Quality Audit in `docs/standards/`)
- Bootstrap capability fully specified but not extracted to a dedicated repository
- No automated sync/versioning mechanism for methodology distribution to product repos
- AEF series folder (`framework/`) not yet listed in Blueprint directory tree
- Terminology inconsistencies in Knowledge Base Index regarding Feature Delivery Standard classification

---

## Verification Record

| Check | Result |
|-------|--------|
| Authority sources consulted | AEF-000, AEF-001, AEF-002, EOS, Capability Model, Governance Index, all eight governance docs, Promotion Process, KB Index, Taxonomy, Inheritance Model, Blueprint, Reference Repo Spec, Feature Delivery Standard |
| All statements classified | Confirmed / Inferred / Unknown as marked |
| No recommendations made | Observed |
| No redesign proposed | Observed |
| No new capabilities invented | Observed |
| No concepts renamed | Observed |
| No documentation rewritten | Observed |

---

## Related

- [AEF-000 Aredir Engineering Framework Discovery](../company/framework/AEF_000_AREDIR_ENGINEERING_FRAMEWORK_DISCOVERY.md)
- [AEF-001 Framework Capability Contracts](../company/framework/AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md)
- [AEF-002 Bootstrap Extraction Boundary](../company/framework/AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md)
- [Engineering Operating System](../company/ENGINEERING_OPERATING_SYSTEM.md)
- [Engineering Capability Model](../company/ENGINEERING_CAPABILITY_MODEL.md)
- [Governance Index](../company/GOVERNANCE_INDEX.md)
- [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md)
- [Promotion Process](../company/PROMOTION_PROCESS.md)
- [Project Inheritance Model](../company/PROJECT_INHERITANCE_MODEL.md)
- [Knowledge Artifact Taxonomy](../company/knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md)
