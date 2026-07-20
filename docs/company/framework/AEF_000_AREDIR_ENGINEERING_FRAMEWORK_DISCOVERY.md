# AEF-000 — Aredir Engineering Framework Discovery

**Status:** Discovery Complete  
**Owner:** Aredir Labs  
**Work item:** AEF-000  
**Identifier verification:** Confirmed unused before assignment (no prior `AEF-*` artifacts in repository)  
**Last reviewed:** 2026-07-19  
**Next review due:** 2026-10-19

## Document placement

Requested path: `docs/framework/AEF_000_AREDIR_ENGINEERING_FRAMEWORK_DISCOVERY.md`.

**Adjusted path:** `docs/company/framework/` — [Documentation Governance](../governance/DOCUMENTATION_GOVERNANCE.md) places company methodology under canonical `docs/company/`. No `docs/framework/` tier exists in [Project Governance](../governance/PROJECT_GOVERNANCE.md) or the [Engineering Blueprint Specification](../ENGINEERING_BLUEPRINT_SPECIFICATION.md). Future AEF series documents should remain under `docs/company/framework/` until a governed structure change is approved.

---

## Authority and scope of this discovery

| Treat as implementation-authoritative | Treat as informational only |
|---------------------------------------|-----------------------------|
| Engineering Operating System and EOS reviews | Historical notes, exploratory brand copy |
| Documentation / Architecture / Knowledge / AI / Engineering / Design / Company / Project Governance | Unpromoted experiments |
| Architecture Audit Standard, Documentation Maintenance Standard | Draft candidates without promotion evidence |
| UI Quality Audit Standard (draft — cataloged, not promoted) | Speculative naming not backed by artifacts |
| Coding Agent Operating Standard, QA / RCA frameworks | Wish-list capabilities |
| Knowledge Promotion Process, Knowledge Artifact Taxonomy | — |
| Project Inheritance, Blueprint, Reference Repository specs | — |
| Promoted patterns, Feature Delivery Standard, ADR guidance in Project Governance | — |

**Constraints observed:** This document does not redesign EOS, rewrite governance, reorganize repositories, extract bootstrap assets, invent unsupported capabilities, or convert discovery into implementation.

---

## 1. Executive Summary

The **Aredir Engineering Framework (AEF)** is the name for the engineering methodology that has already emerged across Aredir Labs artifacts — principally the Engineering Operating System (EOS), eight-domain Governance Framework, Knowledge Base, promoted standards/patterns/playbooks, and the repository inheritance/bootstrap stack (EOS-003 / EOS-004 / IMPLEMENTATION-001).

AEF is **not** a replacement for EOS. EOS remains the company operating model. AEF is the **framework identity** that:

1. Bounds what “Aredir engineering methodology” includes as a whole
2. Clarifies ownership between operating system, governance, knowledge, delivery, and bootstrap concerns
3. Provides the architectural foundation for a future `aredir-project-bootstrap` repository

**Major discoveries from evidence:**

| Discovery | Evidence |
|-----------|----------|
| AEF already exists as a coherent hybrid system | EOS structure + Capability Model + Governance Index + Feature Delivery lifecycle |
| “Framework capabilities” ≠ EOS-002 organizational capabilities | EOS-002 defines *what the org must do*; AEF inventories *methodological subsystems* that implement those abilities |
| Bootstrap readiness is specified but not extracted | Inheritance Model + Blueprint + Reference Repository Spec; no `aredir-project-bootstrap` repo yet |
| Several named patterns are real; several suggested names are not | Evidence Lifecycle, Work Package, Architecture Audit, Workspace patterns exist; Projection Introduction / Authority Classification as named patterns do not |
| Primary gaps are formalization and sequencing — not missing core methodology | ADR standard, Release playbook, Security standard, Knowledge Capture Standard already identified in prior reviews |

---

## 2. Engineering Definition

### Aredir Engineering Framework (AEF)

**AEF** is the company-owned engineering methodology framework that defines how Aredir Labs designs systems, collaborates with AI, verifies quality, governs documentation and knowledge, delivers software, and onboard new repositories — independent of any single product domain.

| Dimension | Definition |
|-----------|------------|
| **Purpose** | Make durable, reusable, AI-assisted engineering practice explicit, adoptable, and extractable across products and future bootstrap tooling |
| **Scope** | Company methodology: operating model, governance, capabilities, standards, patterns, playbooks, audits, verification, knowledge promotion, repository structural contracts, and inheritance/bootstrap rules |
| **Out of scope** | Product domain architecture (nutrition, coach, leagues, etc.), feature UI specs, product roadmaps, marketing brand campaigns, and one-off implementation prompts |
| **Intended audience** | Aredir Labs engineers and engineering leads; coding agents operating under company standards; product teams adopting EOS; future authors of `aredir-project-bootstrap` |
| **Relationship to products** | Products **Adopt / Extend / Deviate** from AEF assets; they own domain implementation. AlignFit is the primary proving ground and reference implementation, not the owner of company methodology |
| **Relationship to engineering** | AEF *is* the engineering practice model — how work is scoped, audited, implemented, verified, released, and learned from |
| **Relationship to consulting** | No separate consulting practice framework exists in the artifact set. Public engineering messaging positions methodology as company identity ([Public Site Experience](../brand/PUBLIC_SITE_EXPERIENCE.md)), but consulting delivery processes are not documented as AEF capabilities. Treat consulting use as a future packaging opportunity, not a current framework layer |
| **Relationship to reusable knowledge** | The Knowledge Base and Promotion Process are the durable IP store inside AEF. Promotion is how project learnings become company assets |

### AEF vs EOS vs Knowledge Base vs Reference Repository

```
Aredir Engineering Framework (AEF)     ← framework identity / boundary of methodology
│
├── Engineering Operating System       ← operating model (EOS-001…004)
│   ├── Engineering Capability Model   ← organizational competencies (EOS-002)
│   ├── Governance Framework           ← eight domains (GOVERNANCE-001)
│   ├── Knowledge Base                 ← promoted IP + indexes
│   └── Delivery & verification assets ← standards, patterns, playbooks
│
├── Reference Repository (this repo)   ← executable platform (IMPLEMENTATION-001)
│
└── Future: aredir-project-bootstrap   ← extraction target (not started)
```

| Concept | Role | Owns |
|---------|------|------|
| **AEF** | Framework boundary and discovery/evolution spine | Naming, capability ownership map, bootstrap readiness classification, future AEF series |
| **EOS** | Operating model and lifecycle | Vision, principles, lifecycle stages, relationship of layers |
| **Governance Framework** | Domain orchestration | Eight governance domains + maturity model |
| **Knowledge Base** | Promoted reusable IP | Patterns, standards, playbooks (canonical markdown) |
| **Reference Repository** | Executable inheritance source | Layout, operational docs, GitHub templates as Platform v1.0 |
| **Product repos** | Domain implementation | Product architecture, features, local ADRs/notes |

---

## 3. Capability Inventory

Capabilities below are **AEF methodological subsystems** supported by existing artifacts. They are intentionally distinct from the ten EOS-002 organizational capabilities (Product Strategy, Architecture, Knowledge Management, AI Engineering, Quality Engineering, Documentation, Design, Delivery, Operations, Security), which remain authoritative for *organizational competency*.

| # | AEF capability | Evidence of existence | Status |
|---|----------------|----------------------|--------|
| C1 | **Engineering Operating System** | [ENGINEERING_OPERATING_SYSTEM.md](../ENGINEERING_OPERATING_SYSTEM.md), EOS-001…004 reviews | Established |
| C2 | **Governance Framework** | [GOVERNANCE_INDEX.md](../GOVERNANCE_INDEX.md), eight domain docs, maturity model | Established |
| C3 | **Architecture Framework** | Architecture Governance, Architecture Audit Standard, architecture patterns, intelligence pipeline | Established |
| C4 | **Documentation Framework** | Documentation Governance, Documentation Maintenance Standard, taxonomy, three-tier hierarchy | Established |
| C5 | **Quality & Verification Framework** | QA Engineering Framework, RCA Framework, QA checklists, AI Evaluation Framework; UI Quality Audit Standard (draft) | Established (UI audit draft) |
| C6 | **AI Collaboration Framework** | AI Governance, Coding Agent Operating Standard, AI patterns, guarded prompts | Established |
| C7 | **Knowledge Framework** | Knowledge Governance, Promotion Process, KB Index, registry, Evidence Lifecycle Pattern | Established |
| C8 | **Bootstrap & Inheritance Framework** | Project Inheritance Model, Blueprint Spec, Reference Repository Spec, Future Product Standards | Established (not extracted) |
| C9 | **Delivery & Release Framework** | Feature Delivery Standard, Company Governance SDLC/release, deployment workflow, release checklist | Established (release playbook incomplete as promoted asset) |
| C10 | **Design & Experience Framework** | Design Governance, Workspace Experience Architecture, Workspace-First pattern, operational UI docs | Established (partial promotion) |

### Inventory decisions (evidence-based)

| Decision | Rationale |
|----------|-----------|
| **Do not invent** a separate “Security Framework” | Security exists as EOS-002 capability + Engineering Governance section; no promoted Security Standard yet (explicitly deferred) |
| **Do not invent** “Platform Engineering” / “DevEx” / “Data Engineering” | Listed as deferred capabilities in EOS-002 |
| **Do not invent** “AQSF” as an active AEF capability | Referenced as future generalization path in Engineering Standards Index and UI Quality Audit Standard — aspirational, not established |
| **Merge** “Verification” into Quality & Verification | QA Engineering Framework + AI Evaluation + checklists already form one verification surface |
| **Keep** Bootstrap separate from EOS | Inheritance/blueprint/reference specs form a distinct extractable subsystem for `aredir-project-bootstrap` |
| **Keep** Governance separate from EOS identity | EOS states governance supports capabilities; GOVERNANCE-001 is its own established framework |

### Mapping AEF capabilities → EOS-002 capabilities

| AEF capability | Primary EOS-002 capabilities supported |
|----------------|----------------------------------------|
| C1 Engineering Operating System | All (orchestration) |
| C2 Governance Framework | Distributed across all ten |
| C3 Architecture Framework | Architecture, AI Engineering |
| C4 Documentation Framework | Documentation, Knowledge Management |
| C5 Quality & Verification | Quality Engineering, Operations, Delivery |
| C6 AI Collaboration | AI Engineering, Delivery |
| C7 Knowledge Framework | Knowledge Management |
| C8 Bootstrap & Inheritance | Delivery, Documentation, Product Strategy (onboarding) |
| C9 Delivery & Release | Delivery, Quality Engineering, Operations |
| C10 Design & Experience | Design, AI Engineering |

---

## 4. Capability Ownership Matrix

Ownership clarity rules used below:

- **Authority** = who may change the capability’s governing docs
- **Does not own** = explicit exclusions to prevent overlap

### C1 — Engineering Operating System

| Field | Value |
|-------|-------|
| **Responsibilities** | Company methodology vision, principles, lifecycle model, layer relationships |
| **Authority** | Aredir Labs engineering lead |
| **Inputs** | Governance reviews, promotion outcomes, maturity assessments |
| **Outputs** | EOS document, links to capability/governance/inheritance/blueprint specs |
| **Consumers** | All products, agents, bootstrap authors |
| **Dependencies** | Capability Model, Governance Framework, Feature Delivery Standard |
| **Boundaries** | Orchestrates; does not replace promoted standards’ detail |
| **Does not own** | Product domain architecture; individual promoted pattern content |

### C2 — Governance Framework

| Field | Value |
|-------|-------|
| **Responsibilities** | Domain orchestration, conflict rules, maturity evaluation entry |
| **Authority** | Engineering lead (domain docs); domain owners for updates |
| **Inputs** | Promoted asset changes; formal reviews |
| **Outputs** | Eight domain governance docs + Governance Index + Maturity Model |
| **Consumers** | Delivery teams, auditors, product leads assessing maturity |
| **Dependencies** | Promoted KB assets (canonical detail) |
| **Boundaries** | Orchestrates and links; does not duplicate canonical procedures |
| **Does not own** | Promotion checklists (Promotion Process); audit step detail (Architecture Audit Standard) |

### C3 — Architecture Framework

| Field | Value |
|-------|-------|
| **Responsibilities** | Ownership/source-of-truth analysis, audit methodology, reusable architecture patterns, intelligence pipeline rules |
| **Authority** | Engineering lead + architecture pattern asset owners |
| **Inputs** | Code/config evidence; audit charters |
| **Outputs** | Audits, findings, architecture patterns, pipeline constraints |
| **Consumers** | Implementers, agents, Knowledge Framework (promotion candidates) |
| **Dependencies** | Documentation Framework (records); Quality Framework (risk → tests) |
| **Boundaries** | Product-agnostic architecture methodology and patterns |
| **Does not own** | Product domain models; UI visual tokens |

### C4 — Documentation Framework

| Field | Value |
|-------|-------|
| **Responsibilities** | Ownership tiers, naming, status, cross-linking, maintenance, archives, living-doc philosophy |
| **Authority** | Engineering lead; asset owners for canonical docs |
| **Inputs** | Delivery changes; promotions; quarterly reviews |
| **Outputs** | Trustworthy indexes and synchronized docs |
| **Consumers** | All engineers and agents |
| **Dependencies** | Knowledge Artifact Taxonomy; Project Governance layout |
| **Boundaries** | How docs are governed and maintained |
| **Does not own** | What gets promoted (Knowledge Framework); product feature specs |

### C5 — Quality & Verification Framework

| Field | Value |
|-------|-------|
| **Responsibilities** | Verification lifecycle, DoD evidence, RCA, release readiness, AI evaluation, UI quality audit (draft) |
| **Authority** | Engineering lead; implementers for operational checklists |
| **Inputs** | Work packages; change diffs; production signals |
| **Outputs** | Verification evidence, release checklist outcomes, RCA records |
| **Consumers** | Delivery & Release; Operations; AI Collaboration |
| **Dependencies** | Engineering Governance; Coding Agent Operating Standard gates |
| **Boundaries** | Proving software is ready and learning from defects |
| **Does not own** | Feature scope; deployment platform configuration |

### C6 — AI Collaboration Framework

| Field | Value |
|-------|-------|
| **Responsibilities** | Agent operating rules, prompt guardrails, application-owned intelligence vs LLM narrative, advisor/workspace collaboration patterns |
| **Authority** | Engineering lead; AI pattern asset owners |
| **Inputs** | Work packages / optional briefs; context builders; evaluation scenarios |
| **Outputs** | Scoped agent diffs; evaluated AI feature behavior |
| **Consumers** | Delivery; Architecture; Design & Experience |
| **Dependencies** | Architecture pipeline patterns; Quality verification gates |
| **Boundaries** | Safe, verifiable human–AI engineering collaboration |
| **Does not own** | Product-specific coach/domain intelligence schemas |

### C7 — Knowledge Framework

| Field | Value |
|-------|-------|
| **Responsibilities** | Capture → promote → version → deprecate → adopt; registry sync; evidence lifecycle for organizational learning |
| **Authority** | Aredir Labs (index/process); asset owners (content reviews) |
| **Inputs** | Audit findings; delivery learnings; candidate reviews |
| **Outputs** | Promoted assets, KB Index updates, registry entries |
| **Consumers** | All products via Adopt/Extend/Deviate |
| **Dependencies** | Documentation Framework; Feature Delivery knowledge-capture stage |
| **Boundaries** | Company IP lifecycle |
| **Does not own** | Implementation-tier prompts; product roadmaps |

### C8 — Bootstrap & Inheritance Framework

| Field | Value |
|-------|-------|
| **Responsibilities** | How repos inherit EOS; what a compliant repo contains; what the reference platform ships; bootstrap checklist |
| **Authority** | Engineering lead |
| **Inputs** | EOS/governance updates; blueprint version |
| **Outputs** | Inheritance model, blueprint contract, reference repository specification, future-product onboarding guide |
| **Consumers** | New product repos; future `aredir-project-bootstrap` |
| **Dependencies** | C1–C7 assets that must be carried forward |
| **Boundaries** | Repository onboarding and structural compliance |
| **Does not own** | Product customization content; runtime product features |

### C9 — Delivery & Release Framework

| Field | Value |
|-------|-------|
| **Responsibilities** | Idea → work package → implementation → verification → docs → release → production validation |
| **Authority** | Engineering lead; all implementers for PR discipline |
| **Inputs** | Strategy priorities; architecture findings |
| **Outputs** | Merged changes with evidence; release records |
| **Consumers** | Operations; Knowledge Framework |
| **Dependencies** | Feature Delivery Standard; Company/Project/Engineering Governance |
| **Boundaries** | Shipping change safely and repeatedly |
| **Does not own** | Portfolio prioritization (Product Strategy competency); incident playbooks (immature) |

### C10 — Design & Experience Framework

| Field | Value |
|-------|-------|
| **Responsibilities** | Product-agnostic UX principles, workspace experience architecture, accessibility baseline, operational UI conventions |
| **Authority** | Engineering lead / design governance; UX pattern asset owners |
| **Inputs** | Product UI work; audit findings |
| **Outputs** | Experience architecture standards; UI pattern guidance |
| **Consumers** | Product UI implementers; AI Collaboration (workspace surfaces) |
| **Dependencies** | Design Governance; Quality (a11y); UI Quality Audit (draft) |
| **Boundaries** | Cross-product experience methodology |
| **Does not own** | Product brand campaigns; feature-specific UI specs |

---

## 5. Capability Relationship Model

### Recommendation: **hybrid model** (hierarchy + lifecycle + dependency)

Evidence does not support a single pure structure:

| Model | Supported? | Evidence |
|-------|------------|----------|
| Hierarchy | Yes (partial) | EOS layer stack: Vision → Principles → Capabilities → Frameworks → Standards → Patterns → Playbooks → Products |
| Lifecycle | Yes (partial) | Feature Delivery / EOS lifecycle; Project Inheritance repository lifecycle; Evidence Lifecycle (cyclical) |
| Dependency graph | Yes (partial) | Capability Model interaction map; governance → capability mapping |
| Layered architecture only | No | Delivery and knowledge feedback loops are cyclical, not strictly layered |
| Pure hierarchy only | No | Knowledge promotion feeds back into EOS; bootstrap consumes all layers |

**Canonical relationship diagram (hybrid):**

```
                    ┌─────────────────────────┐
                    │  AEF (framework boundary)│
                    └────────────┬────────────┘
                                 │
              ┌──────────────────┼──────────────────┐
              ▼                  ▼                  ▼
     C1 EOS (operating)   C2 Governance      C8 Bootstrap
              │                  │                  │
              └────────┬─────────┘                  │
                       ▼                            │
         C3 Arch  C6 AI  C10 Design  C4 Docs ◄──────┤
                       │                            │
                       ▼                            │
              C9 Delivery & Release                 │
                       │                            │
                       ▼                            │
         C5 Quality & Verification                  │
                       │                            │
                       ▼                            │
              C7 Knowledge Framework ───────────────┘
                       │
                       └──► updates EOS / KB / bootstrap inputs
```

**Typical dependency direction for a feature:**

Product priority → Architecture audit (C3) → Work package (C9) → AI-assisted implementation (C6) → Verification (C5) → Documentation (C4) → Release (C9) → Knowledge capture/promotion (C7) → future Bootstrap contents (C8).

---

## 6. Engineering Lifecycle

### Recommendation: use the **existing EOS + Feature Delivery lifecycle** as authoritative

Do not invent a parallel AEF lifecycle. Evidence converges on one delivery spine with a repository-level bootstrap spine and a knowledge feedback loop.

### 6.1 Delivery lifecycle (authoritative)

From [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md) and [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md):

```
Evaluate Idea
      ↓
Architecture Review / Audit (when required)
      ↓
Engineering Finding
      ↓
Engineering Work Package
      ↓
Implementation (optional: Implementation Brief / Prompt)
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

### 6.2 Repository lifecycle (bootstrap spine)

From [Project Inheritance Model](../PROJECT_INHERITANCE_MODEL.md):

```
Idea → Project Proposal → Repository Creation → Repository Bootstrap
  → EOS Inheritance → Architecture → Implementation → Verification
  → Release → Operations → Knowledge Capture → Promotion → EOS update
```

### 6.3 Evidence / learning lifecycle (knowledge spine)

From [Evidence Lifecycle Pattern](../knowledge-patterns/EVIDENCE_LIFECYCLE_PATTERN.md):

```
Observation → Evidence → Interpretation → Knowledge → Decision → Outcome → Observation
```

### 6.4 Evaluation of suggested stage names

| Suggested stage | Supported as formal AEF stage? | Notes |
|-----------------|-------------------------------|-------|
| Discovery | Partially | Exists as idea evaluation / audit / standard lifecycle “Discovery” in Engineering Standards Index — not a standalone company playbook named Discovery |
| Domain Modeling | Within Architecture | Covered by Architecture capability and audits; not a separate gated stage |
| Architecture | Yes | Explicit lifecycle stage |
| Governance | Continuous | Governance is ongoing orchestration, not a one-time stage |
| Implementation | Yes | Explicit |
| Verification | Yes | Explicit |
| Release | Yes | Explicit |
| Knowledge Promotion | Yes | Capture + Promotion stages |

---

## 7. Documentation Mapping

### 7.1 Capability → documentation map

| AEF capability | Owned / primary docs | Standards | ADRs / decisions | Work packages / audits | Playbooks / templates |
|----------------|----------------------|-----------|------------------|------------------------|------------------------|
| C1 EOS | `ENGINEERING_OPERATING_SYSTEM.md`, Capability Model, Inheritance, Blueprint, Reference Repo Spec | — | EOS reviews | EOS-001…004, IMPLEMENTATION-001 | Feature Delivery (referenced) |
| C2 Governance | `GOVERNANCE_INDEX.md`, `governance/*` | Domain governance docs | GOVERNANCE-001 review | — | — |
| C3 Architecture | Architecture Governance; `architecture-patterns/*` | Architecture Audit Standard | Project ADRs (impl tier) | Architecture audits in `plan/docs/` or product docs | — |
| C4 Documentation | Documentation Governance; taxonomy | Documentation Maintenance Standard | — | Doc hygiene work items | — |
| C5 Quality | Engineering Governance (quality); `qa-standards/*` | QA Framework, RCA; UI Quality Audit (draft in `docs/standards/`) | — | Verification specs | Manual/Release/UAT checklists |
| C6 AI Collaboration | AI Governance; `ai-patterns/*`; `engineering-standards/CODING_AGENT_*` | Coding Agent Operating Standard; AI Evaluation | — | Optional briefs | Guarded prompt template |
| C7 Knowledge | Knowledge Governance; `PROMOTION_PROCESS.md`; KB Index; `knowledge-patterns/*` | Promotion metadata rules | KB reviews | AREDIR-KB-* items | — |
| C8 Bootstrap | Inheritance Model; Blueprint; Reference Repo Spec; `future-product-standards.md` | Repository Standards (operational) | — | Bootstrap checklist | Foundation prompt 001A |
| C9 Delivery | Company + Project + Engineering Governance | Feature Delivery Standard | Decision logs / ADRs | Work packages; implementation index | Deployment workflow; PR template |
| C10 Design | Design Governance; `AREDIR_UX_001_*`; Workspace-First pattern | UI Quality Audit (draft) | — | UX establishment review | `docs/architecture/ui-patterns.md`, component guidelines |

### 7.2 Misplaced / duplicate / missing (observations only)

| Finding | Type | Evidence |
|---------|------|----------|
| UI Quality Audit Standard lives in `docs/standards/` while most promoted standards live under `docs/company/` | Misplaced (draft location) | Engineering Standards Index points to `../standards/`; not yet promoted into KB category tree |
| Feature Delivery listed as “candidate” in one KB Index section while promoted elsewhere | Duplicate responsibility signal | KB Index Engineering Standards examples vs Playbooks promoted list — index inconsistency risk |
| ADR format described in Project Governance but no Decision Record Standard | Missing documentation | GOVERNANCE-001 recommended follow-up; KB Roadmap medium priority |
| Release Management Playbook not promoted; operational deployment docs exist | Missing promoted playbook | KB Roadmap; GOVERNANCE-001 follow-up |
| Knowledge Capture Standard planned (AREDIR-KB-016) | Missing standard | KB Roadmap high priority |
| Security Standard not promoted | Missing standard | EOS-002 Security capability note |
| `docs/company/framework/` is new | Structure addition | This discovery; Blueprint tree does not yet list `framework/` |
| Overlap between governance orchestration and promoted detail | Managed overlap | GOVERNANCE-001 explicitly resolved: governance orchestrates, promoted assets remain canonical |

**No documents were moved during this discovery.**

---

## 8. Reusable Engineering Patterns

Only patterns with artifact evidence are listed. Suggested names without repository evidence are excluded from “established.”

### 8.1 Established patterns (promoted or standardized)

| Pattern | Evidence | AEF home |
|---------|----------|----------|
| **Application-Owned Intelligence Pipeline** (Facts → Assessments → Insights → Recommendations → Narrative) | AI Intelligence Architecture Pattern; Architecture Governance | C3, C6 |
| **Context Builder Pattern** | Promoted AI pattern | C6 |
| **Response Contract Pattern** | Promoted AI pattern | C6 |
| **Workspace-First AI Experience** | Promoted architecture pattern | C6, C10 |
| **Human + AI Advisor Workspace** | Promoted AI pattern | C6, C10 |
| **Evidence-Aware AI Advisor** | Promoted AI pattern | C6, C7 |
| **Evidence Lifecycle Pattern** | Promoted knowledge pattern | C7 |
| **Workspace Experience Architecture** | AREDIR-UX-001 promoted | C10 |
| **Architecture Audit Pattern** (audit lifecycle methodology) | Architecture Audit Standard | C3 |
| **Work Package Pattern** | Feature Delivery Standard; Documentation Governance; PROCESS-WP-001 | C9 |
| **Adopt / Extend / Deviate Pattern** | Promotion Process; Inheritance Model | C7, C8 |
| **Three-Tier Documentation Pattern** (canonical / operational / implementation) | Documentation Maintenance + Governance | C4 |
| **Knowledge Promotion Pattern** | Promotion Process | C7 |
| **Guarded Agent Execution Pattern** | Coding Agent Operating Standard; guarded prompt template | C6 |

### 8.2 Emerging / draft (evidence exists, not fully promoted)

| Pattern / practice | Evidence | Classification |
|--------------------|----------|----------------|
| **UI Quality Audit Pattern** | `docs/standards/AREDIR_UI_QUALITY_AUDIT_STANDARD.md` (Draft) | Requires refinement |
| **Repository Bootstrap Checklist Pattern** | Project Inheritance Model bootstrap section | Ready conceptually; extraction pending |
| **Reference Platform Inheritance Pattern** | IMPLEMENTATION-001 + Future Product Standards | Ready conceptually; tooling pending |
| **Operational Workspace / Project Memory** | WORKSPACE-004 notes, documentation hub — Reference Repository internal | Partially product/platform-specific |

### 8.3 Not promoted as named patterns (insufficient evidence)

| Suggested name | Finding |
|----------------|---------|
| Projection Introduction Pattern | No matching promoted/standard artifact in this repository |
| Authority Classification Pattern | Authority rules exist (conflict rules, Adopt/Extend/Deviate, ownership analysis) but not packaged as this named pattern |
| Capability Discovery Pattern | This AEF-000 document is the first formal instance — treat as **candidate** after review, not established |
| Domain Modeling Pattern | Practice implied in Architecture capability; no standalone pattern asset |

---

## 9. Bootstrap Readiness Assessment

Target: future **`aredir-project-bootstrap`** repository. No extraction performed.

| AEF capability | Classification | Rationale |
|----------------|----------------|-----------|
| C1 EOS | **Remain inside Aredir Labs** (content) / **requires refinement** for packaging | Methodology must stay authoritative in Labs; bootstrap should *reference or sync*, not fork ownership |
| C2 Governance | **Remain inside Aredir Labs** | Domain governance is company-owned; bootstrap carries sync instructions |
| C3 Architecture | **Requires refinement** | Patterns are reusable; product architecture examples must be stripped |
| C4 Documentation | **Ready for extraction** (as rules + templates) | Naming, tiers, index expectations are stable |
| C5 Quality & Verification | **Ready for extraction** (checklists + QA framework references) | Operational QA docs already template-oriented; UI audit still draft |
| C6 AI Collaboration | **Ready for extraction** (agent standards + templates) | Coding Agent Standard + guarded prompt are bootstrap essentials |
| C7 Knowledge | **Requires refinement** | Promotion/registry are Labs-central; bootstrap needs “how to consume/sync KB,” not a second registry |
| C8 Bootstrap & Inheritance | **Ready for extraction** (primary payload) | Inheritance checklist, blueprint zones, reference layout are the core of bootstrap |
| C9 Delivery & Release | **Requires refinement** | Feature Delivery + PR templates ready; promoted Release playbook still missing |
| C10 Design & Experience | **Requires refinement** | UX architecture reusable; brand/visual scaffolds are product-customized |

### Product-specific (do not extract as company bootstrap defaults)

| Asset class | Why |
|-------------|-----|
| AlignFit domain architecture / coach intelligence schemas | Product-owned per EOS |
| aredirlabs.com public site brand/experience docs | Product/marketing surface |
| Workspace internal product registry features | Reference Repository platform product, not universal bootstrap requirement |
| Sanity CMS choices unless declared stack baseline | Stack guidance exists; CMS optional per Future Product Standards |

### Suggested bootstrap sequencing (recommendation only)

1. Blueprint-compliant skeleton + README/AGENTS/indexes  
2. Sync strategy for `docs/company/`  
3. Agent + QA operational docs  
4. GitHub templates + editor/repo hygiene  
5. CI verification baseline commands  
6. Optional stack starter (separate from methodology extraction)

---

## 10. Gap Analysis

### 10.1 Observations (factual)

| Area | Observation |
|------|-------------|
| Missing capabilities | Deferred EOS-002 capabilities remain deferred (Data Eng, Platform Eng, DevEx, etc.) |
| Incomplete standards | Decision Record Standard; Knowledge Capture Standard; Security Standard; Release Management Playbook; Deployment Standards folder |
| Architectural gaps | No extracted bootstrap repository; no generator/tooling; AQSF not established |
| Documentation gaps | `framework/` folder not yet in Blueprint tree; UI audit outside `docs/company/`; ADR format not standalone |
| Governance gaps | Formal incident/observability playbooks immature (EOS-002 Operations note); consulting methodology absent |

### 10.2 Recommendations vs future opportunities

| Item | Classification |
|------|----------------|
| Keep AEF as framework identity above EOS without rewriting EOS | **Recommendation** |
| Sequence bootstrap extraction after AEF ownership map is accepted | **Recommendation** |
| Promote or relocate UI Quality Audit under company documentation/quality standards when ready | **Recommendation** |
| Complete AREDIR-KB-016 and Decision Record Standard (already planned) | **Recommendation** (pre-existing roadmap) |
| Build AQSF as umbrella quality brand | **Future opportunity** |
| Package AEF as external consulting offer | **Future opportunity** |
| Automate promotion workflow / asset dependency mapping | **Future opportunity** (KB Roadmap tooling list) |

---

## 11. Recommendations

Evidence-based only; no speculative redesign.

### Repository organization

1. Keep company methodology authoritative in `aredirlabs-com` (`docs/company/`).
2. Do not create `aredir-project-bootstrap` until bootstrap readiness classifications in §9 are accepted.
3. Treat AlignFit as adopter/reference implementation — do not move company ownership into AlignFit.

### Documentation organization

1. Use `docs/company/framework/` for the AEF document series (AEF-000+).
2. Add `framework/` to Blueprint / Project Governance directory listings in a future governed docs update (not done here beyond indexes).
3. Resolve UI Quality Audit placement at promotion time (`docs/company/` category vs remaining draft path).

### Framework evolution

1. Evolve AEF through numbered discoveries/reviews (AEF-001…) rather than silent EOS rewrites.
2. Preserve EOS-002 organizational capabilities as the competency model; use AEF capabilities as the methodological subsystem map.
3. Prefer hybrid relationship model in future diagrams (hierarchy + lifecycle + feedback).

### Bootstrap sequencing

1. Extract **C8 structural + C4/C5/C6 operational templates** first.
2. Keep promotion registry and governance authority in Labs.
3. Defer Design/brand scaffolds and Release playbook promotion until refinement items close.

### Future discovery work

See §12.

---

## 12. Future Discovery Opportunities

| ID (proposed) | Opportunity | Depends on |
|---------------|-------------|------------|
| AEF-001 | AEF capability charter — normative ownership contracts derived from this discovery | Complete — [AEF-001](./AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md) |
| AEF-002 | Bootstrap extraction boundary discovery — exact file set for `aredir-project-bootstrap` | Complete — [AEF-002](./AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md) |
| AEF-003 | Documentation structure discovery — Blueprint update for `framework/`, standards path normalization | Documentation Governance |
| AEF-004 | Pattern catalog discovery — formalize established vs candidate reusable patterns list | KB Index; this §8 |
| AEF-005 | Quality umbrella discovery — relationship of QA Framework, UI Audit, future AQSF | Engineering Standards Index |
| — | Pre-existing: AREDIR-KB-016 Knowledge Capture Standard | KB Roadmap |
| — | Pre-existing: Decision Record Standard | GOVERNANCE-001 follow-up |
| — | Pre-existing: Release Management Playbook | KB Roadmap |

---

## 13. Verification Record

| Check | Result |
|-------|--------|
| AEF-000 identifier unused before assignment | Confirmed |
| Authority sources consulted | EOS, Capability Model, Governance, Documentation/Architecture governance, audit/UI/agent/verification standards, Promotion Process, taxonomy, Inheritance/Blueprint/Reference specs, Feature Delivery, KB Index/Roadmap |
| No EOS/governance rewrite | Observed |
| No AlignFit modifications | Observed |
| No bootstrap extraction | Observed |
| No production code changes intended | Documentation-only deliverable |

---

## Related

- [AEF-001 Framework Capability Contracts](./AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md) — normative ownership reference derived from this discovery
- [AEF-002 Bootstrap Extraction Boundary](./AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md) — extraction specification for `aredir-project-bootstrap`
- [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md)
- [Engineering Capability Model](../ENGINEERING_CAPABILITY_MODEL.md)
- [Governance Index](../GOVERNANCE_INDEX.md)
- [Project Inheritance Model](../PROJECT_INHERITANCE_MODEL.md)
- [Engineering Blueprint Specification](../ENGINEERING_BLUEPRINT_SPECIFICATION.md)
- [Reference Repository Specification](../REFERENCE_REPOSITORY_SPECIFICATION.md)
- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Knowledge Artifact Taxonomy](../knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md)
- [Documentation Governance](../governance/DOCUMENTATION_GOVERNANCE.md)
- [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md)
- [UI Quality Audit Standard](../../standards/AREDIR_UI_QUALITY_AUDIT_STANDARD.md)
- [Engineering Standards Index](../../engineering/ENGINEERING_STANDARDS_INDEX.md)
- [Implementation index](../../prompts/implementation-index.md)
