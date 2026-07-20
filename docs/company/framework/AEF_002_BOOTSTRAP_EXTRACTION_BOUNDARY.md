# AEF-002 — Bootstrap Extraction Boundary

**Status:** Company Standard (Framework Implementation Specification)  
**Owner:** Aredir Labs  
**Work item:** AEF-002  
**Identifier verification:** Confirmed unused as a document before assignment (proposed in AEF-000/AEF-001; no prior `AEF_002_*` artifact)  
**Authority basis:** [AEF-000](./AEF_000_AREDIR_ENGINEERING_FRAMEWORK_DISCOVERY.md), [AEF-001](./AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md), [Project Inheritance Model](../PROJECT_INHERITANCE_MODEL.md), [Engineering Blueprint Specification](../ENGINEERING_BLUEPRINT_SPECIFICATION.md), [Reference Repository Specification](../REFERENCE_REPOSITORY_SPECIFICATION.md)  
**Last reviewed:** 2026-07-19  
**Next review due:** 2026-10-19

## Normative status

This document is the **authoritative extraction specification** for the future `aredir-project-bootstrap` repository.

It defines boundaries only. It does **not** perform extraction, reorganize repositories, implement generators, modify governance substance, or redesign AEF capabilities.

| Conflict rule | Resolution |
|---------------|------------|
| Ownership ambiguity | Resolve via [AEF-001](./AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md); document residual ambiguity — do not invent |
| Canonical home vs bootstrap package | Canonical ownership stays in `aredirlabs-com` unless marked bootstrap-owned template |
| Sync vs fork | Products **sync or reference** `docs/company/` — never fork ownership ([Inheritance Model](../PROJECT_INHERITANCE_MODEL.md)) |

---

## 1. Executive Summary

`aredir-project-bootstrap` is a **packaging and inheritance distribution** repository. It is not the new owner of Aredir engineering methodology.

| Repository | Role |
|------------|------|
| **aredirlabs-com** | Canonical methodology authority (AEF, EOS, governance, Knowledge Base) |
| **aredir-project-bootstrap** | Blueprint-compliant skeleton, operational templates, and sync/reference machinery for company methodology |
| **Product repositories** | Domain implementation; Adopt / Extend / Deviate company assets |
| **Future consulting repositories** | Optional packaging of methodology for external delivery — out of scope until a consulting practice exists |

**AEF-001 readiness (normative input):**

| Capability | AEF-001 class | AEF-002 bootstrap posture |
|------------|---------------|---------------------------|
| C1 EOS | Internal only | Distributed by **sync/reference**; ownership remains Labs |
| C2 Governance | Internal only | Distributed by **sync/reference**; ownership remains Labs |
| C3 Architecture | Requires maturity | **Future Extraction** (patterns need product-example scrub) |
| C4 Documentation | Ready | **Ready for Bootstrap** (rules + scaffolds) |
| C5 Quality | Ready | **Ready for Bootstrap** (checklists + QA refs); UI audit **Future** |
| C6 AI Collaboration | Ready | **Ready for Bootstrap** |
| C7 Knowledge | Requires maturity | Sync consume-guidance only; registry **Internal** |
| C8 Bootstrap & Inheritance | Ready | **Ready for Bootstrap** (primary payload) |
| C9 Delivery & Release | Requires maturity | PR templates **Ready**; Feature Delivery sync; Release playbook **Future** |
| C10 Design & Experience | Requires maturity | Experience standards **Future**/sync after scrub; brand **Product Specific** |

**Inventory summary (this document):**

| Classification | Approx. count |
|----------------|---------------|
| Ready for Bootstrap | 28 |
| Ready After Normalization | 14 |
| Internal to Aredir Labs | 22 |
| Product Specific | 12 |
| Future Extraction | 11 |
| **Total inventoried framework assets** | **87** |

---

## 2. Classification Rules

Every inventoried artifact receives **exactly one** extraction classification:

| Classification | Meaning |
|----------------|---------|
| **Ready for Bootstrap** | May enter the bootstrap package without architectural change |
| **Ready After Normalization** | Minor naming/path/cross-link cleanup only; architecture unchanged |
| **Internal to Aredir Labs** | Canonical home stays in methodology repo; not bootstrap-owned; may still be **synced** into products when Inheritance requires |
| **Product Specific** | Must stay in product (or Labs-as-product) repositories |
| **Future Extraction** | Not mature; needs additional framework work before packaging |

### Two-axis model (required for company methodology)

| Axis | Question | Values |
|------|----------|--------|
| **Canonical home** | Who owns the truth? | `aredirlabs` · `bootstrap` · `product` |
| **Package inclusion** | Does bootstrap distribute it? | include-owned · include-as-sync · exclude |

**Rule:** Assets with classification **Internal to Aredir Labs** that Inheritance requires in product repos use package inclusion **include-as-sync** (not ownership transfer). This satisfies AEF-001 “internal only” and Inheritance “sync `docs/company/`.”

---

## 3. Repository Inventory

Product-domain assets are excluded. Framework-owned and template-adjacent assets only.

### 3.1 Operating model & AEF (C1 / AEF)

| ID | Artifact | Path |
|----|----------|------|
| A01 | Engineering Operating System | `docs/company/ENGINEERING_OPERATING_SYSTEM.md` |
| A02 | Engineering Capability Model | `docs/company/ENGINEERING_CAPABILITY_MODEL.md` |
| A03 | AEF-000 Discovery | `docs/company/framework/AEF_000_*.md` |
| A04 | AEF-001 Contracts | `docs/company/framework/AEF_001_*.md` |
| A05 | AEF-002 Boundary (this doc) | `docs/company/framework/AEF_002_*.md` |

### 3.2 Bootstrap & inheritance (C8)

| ID | Artifact | Path |
|----|----------|------|
| B01 | Project Inheritance Model | `docs/company/PROJECT_INHERITANCE_MODEL.md` |
| B02 | Engineering Blueprint Specification | `docs/company/ENGINEERING_BLUEPRINT_SPECIFICATION.md` |
| B03 | Reference Repository Specification | `docs/company/REFERENCE_REPOSITORY_SPECIFICATION.md` |
| B04 | Future Product Standards | `docs/architecture/future-product-standards.md` |
| B05 | Repository Standards | `docs/engineering/repository-standards.md` |
| B06 | Project conventions | `docs/architecture/project-conventions.md` |
| B07 | Root editor/git hygiene | `.editorconfig`, `.gitattributes`, `.gitignore` |
| B08 | Root agent rules | `AGENTS.md`, `CLAUDE.md` |
| B09 | Env example scaffold | `.env.example` |

### 3.3 Governance (C2)

| ID | Artifact | Path |
|----|----------|------|
| G01 | Governance Index | `docs/company/GOVERNANCE_INDEX.md` |
| G02–G09 | Eight domain governance docs | `docs/company/governance/*.md` (excl. maturity listed below) |
| G10 | Governance Maturity Model | `docs/company/governance/GOVERNANCE_MATURITY_MODEL.md` |
| G11 | GOVERNANCE-001 review | `docs/company/reviews/GOVERNANCE_001_*.md` |

### 3.4 Architecture (C3)

| ID | Artifact | Path |
|----|----------|------|
| R01 | Architecture Governance | `docs/company/governance/ARCHITECTURE_GOVERNANCE.md` |
| R02 | Architecture Audit Standard | `docs/company/documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md` |
| R03 | AI Intelligence Architecture Pattern | `docs/company/architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md` |
| R04 | Workspace-First AI Experience Pattern | `docs/company/architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md` |
| R05 | Workspace Experience Architecture | `docs/company/architecture-patterns/AREDIR_UX_001_*.md` |
| R06 | Naming conventions | `docs/architecture/naming-conventions.md` |

### 3.5 Documentation (C4)

| ID | Artifact | Path |
|----|----------|------|
| D01 | Documentation Governance | `docs/company/governance/DOCUMENTATION_GOVERNANCE.md` |
| D02 | Documentation Maintenance Standard | `docs/company/documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md` |
| D03 | Knowledge Artifact Taxonomy | `docs/company/knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md` |
| D04 | Decision Record Standard | _(missing — gap)_ |

### 3.6 Quality & verification (C5)

| ID | Artifact | Path |
|----|----------|------|
| Q01 | QA Engineering Framework | `docs/company/qa-standards/QA_ENGINEERING_FRAMEWORK.md` |
| Q02 | Root Cause Analysis Framework | `docs/company/qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md` |
| Q03 | AI Evaluation Framework | `docs/company/ai-patterns/AI_EVALUATION_FRAMEWORK.md` |
| Q04 | Manual QA checklist | `docs/qa/manual-qa-checklist.md` |
| Q05 | Release checklist | `docs/qa/release-checklist.md` |
| Q06 | UAT checklist | `docs/qa/uat-checklist.md` |
| Q07 | Bug triage process | `docs/bugs/bug-triage-process.md` |
| Q08 | Bug report template | `docs/bugs/bug-report-template.md` |
| Q09 | Known issues (scaffold) | `docs/bugs/known-issues.md` |
| Q10 | UI Quality Audit Standard | `docs/standards/AREDIR_UI_QUALITY_AUDIT_STANDARD.md` |

### 3.7 AI collaboration (C6)

| ID | Artifact | Path |
|----|----------|------|
| I01 | AI Governance | `docs/company/governance/AI_GOVERNANCE.md` |
| I02 | Coding Agent Operating Standard (canonical) | `docs/company/engineering-standards/CODING_AGENT_OPERATING_STANDARD.md` |
| I03 | Coding agent operating standard (operational) | `docs/agent/coding-agent-operating-standard.md` |
| I04 | Guarded prompt template | `docs/agent/guarded-prompt-template.md` |
| I05 | PR review template (agent) | `docs/agent/pr-review-template.md` |
| I06 | Context Builder Pattern | `docs/company/ai-patterns/CONTEXT_BUILDER_PATTERN.md` |
| I07 | Response Contract Pattern | `docs/company/ai-patterns/RESPONSE_CONTRACT_PATTERN.md` |
| I08 | Human + AI Advisor Workspace Pattern | `docs/company/ai-patterns/HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md` |
| I09 | Evidence-Aware AI Advisor Pattern | `docs/company/ai-patterns/EVIDENCE_AWARE_AI_ADVISOR_PATTERN.md` |

### 3.8 Knowledge (C7)

| ID | Artifact | Path |
|----|----------|------|
| K01 | Knowledge Governance | `docs/company/governance/KNOWLEDGE_GOVERNANCE.md` |
| K02 | Promotion Process | `docs/company/PROMOTION_PROCESS.md` |
| K03 | Knowledge Base Index | `docs/company/KNOWLEDGE_BASE_INDEX.md` |
| K04 | Knowledge Base Roadmap | `docs/company/KNOWLEDGE_BASE_ROADMAP.md` |
| K05 | Knowledge Asset Registry Roadmap | `docs/company/KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md` |
| K06 | Evidence Lifecycle Pattern | `docs/company/knowledge-patterns/EVIDENCE_LIFECYCLE_PATTERN.md` |
| K07 | KB / registry reviews | `docs/company/reviews/KB_*.md`, registry readiness reviews |
| K08 | Knowledge Capture Standard | _(missing — AREDIR-KB-016)_ |
| K09 | Workspace Knowledge Asset Registry product | `docs/workspace/WORKSPACE_008_*.md` + app surfaces |

### 3.9 Delivery & release (C9)

| ID | Artifact | Path |
|----|----------|------|
| V01 | Feature Delivery Standard | `docs/company/playbooks/FEATURE_DELIVERY_STANDARD.md` |
| V02 | Company Governance (SDLC/release sections) | `docs/company/governance/COMPANY_GOVERNANCE.md` |
| V03 | Project Governance | `docs/company/governance/PROJECT_GOVERNANCE.md` |
| V04 | Engineering Governance | `docs/company/governance/ENGINEERING_GOVERNANCE.md` |
| V05 | Deployment workflow | `docs/engineering/deployment-workflow.md` |
| V06 | Environment strategy | `docs/engineering/environment-strategy.md` |
| V07 | Technical overview scaffold | `docs/engineering/technical-overview.md` |
| V08 | Engineering Standards Index | `docs/engineering/ENGINEERING_STANDARDS_INDEX.md` |
| V09 | Implementation index (template role) | `docs/prompts/implementation-index.md` |
| V10 | Foundation prompt 001A | `docs/prompts/prompt-001A-foundation.md` |
| V11 | Site prompts 001B/001C | `docs/prompts/prompt-001B-*.md`, `prompt-001C-*.md` |
| V12 | GitHub PR template | `.github/PULL_REQUEST_TEMPLATE.md` |
| V13 | GitHub issue templates | `.github/ISSUE_TEMPLATE/*` |
| V14 | CODEOWNERS | `.github/CODEOWNERS` |
| V15 | Release Management Playbook | _(missing — planned)_ |

### 3.10 Design & experience (C10)

| ID | Artifact | Path |
|----|----------|------|
| X01 | Design Governance | `docs/company/governance/DESIGN_GOVERNANCE.md` |
| X02 | UI patterns | `docs/architecture/ui-patterns.md` |
| X03 | Component guidelines | `docs/architecture/component-guidelines.md` |
| X04 | Company brand docs | `docs/company/brand/*` |
| X05 | Product brand scaffold | `docs/brand/*` |
| X06 | Public engineering experience | `docs/architecture/public-engineering-experience.md` |

### 3.11 Reviews & EOS establishment records

| ID | Artifact | Path |
|----|----------|------|
| E01 | EOS-001…004 reviews | `docs/company/reviews/EOS_*.md` |
| E02 | IMPLEMENTATION-001 review | `docs/company/reviews/IMPLEMENTATION_001_*.md` |
| E03 | AREDIR-UX-001 review | `docs/company/reviews/AREDIR_UX_001_*.md` |

### 3.12 Reference-repository / Labs product surfaces

| ID | Artifact | Path |
|----|----------|------|
| P01 | Workspace feature docs | `docs/workspace/*` |
| P02 | Workspace verification plans | `plan/docs/AREDIR-WORKSPACE-*`, related |
| P03 | Product catalog / site brief | `docs/product/*` |
| P04 | Application source / public site | `src/`, `public/` |

---

## 4. Ownership Verification (AEF-001)

| ID | AEF-001 primary | Ambiguity | Resolution |
|----|-----------------|-----------|------------|
| A01–A02 | C1 | None | Internal ownership; sync distribution |
| A03–A05 | AEF / eng lead + C4 hygiene | None | Internal — framework evolution spine |
| B01–B03 | C8 (+ C1 identity) | Shared C8/C1 | C8 primary for bootstrap use; both approve substance changes |
| B04–B09 | C8 | B04 under `docs/architecture/` | Ownership C8; path normalization candidate |
| G01–G10 | C2 | G02 includes Architecture/AI/Docs domains also used by C3/C4/C6 | C2 owns governance docs; substance standards remain with C3/C4/C5/C6/C7/C9/C10 |
| G11, E01–E03, K07 | Reviews | Split by subject | Historical **Internal**; not bootstrap-owned |
| R01–R05 | C3 (R05 shared C10) | R05 dual | C3 registry + C10 experience semantics — sync both after scrub |
| R06 | C3 / operational | Light | Ready After Normalization |
| D01–D03 | C4 | D03 collab C7 | C4 primary |
| D04 | Gap | C9/C4 interim | **Future Extraction** |
| Q01–Q09 | C5 | Q05 collab C9 | C5 primary content |
| Q10 | C5 (+ C10) | Draft path outside `docs/company/` | **Future Extraction** until promoted/relocated |
| I01–I09 | C6 | Q03/I eval overlap | AI Evaluation **C5** primary (Q03); listed under C5 |
| K01–K06 | C7 | K03 index hygiene C4 | C7 primary |
| K08 | Gap | C7 | **Future Extraction** |
| K09 | Product/platform | — | **Product Specific** |
| V01 | C9 | KB Index wording drift | C9 sole primary |
| V02–V04 | C2 orchestration + C9 execution | Domain docs C2 | Sync as governance; execution owned C9 |
| V05–V08 | C9 / C8 hygiene | V08 catalogs many owners | Index **Ready After Normalization** |
| V09 | C9 | Contains Labs work history | Template skeleton Ready; history **Internal/Product** |
| V10 | C9/C8 | Foundation reusable | Ready After Normalization (strip Labs-specific) |
| V11 | Product | Site-specific | **Product Specific** |
| V12–V14 | C9 | CODEOWNERS has placeholders | Ready After Normalization |
| V15 | Gap | C9 | **Future Extraction** |
| X01–X03 | C10 | — | Future / Ready After Normalization |
| X04–X06 | Product | Company brand vs engineering | **Product Specific** |
| P01–P04 | Product / Labs site | — | **Product Specific** |

**Ambiguities documented (not invented):**

1. **R05 / R04** — C3 vs C10 shared ownership (AEF-001 §7.1).  
2. **Implementation index** — template vs Labs history in one file.  
3. **Governance domain files** — orchestration (C2) vs referenced standard owners.  
4. **Missing D04 / K08 / V15 / Security Standard** — gaps with interim owners only.

---

## 5. Extraction Classification Matrix

| ID | Classification | Canonical home | Package inclusion | Notes |
|----|----------------|----------------|-------------------|-------|
| A01 | Internal to Aredir Labs | aredirlabs | include-as-sync | EOS |
| A02 | Internal to Aredir Labs | aredirlabs | include-as-sync | Capability Model |
| A03–A05 | Internal to Aredir Labs | aredirlabs | exclude | AEF evolution; consumers link outward if needed |
| B01–B03 | Ready for Bootstrap | aredirlabs | include-as-sync | Primary C8 payload |
| B04 | Ready After Normalization | aredirlabs | include-as-sync | Path/naming hygiene |
| B05–B06 | Ready for Bootstrap | bootstrap *(template copy)* / aredirlabs *(standards intent)* | include-owned (operational) | Operational conventions |
| B07–B09 | Ready for Bootstrap | bootstrap | include-owned | Skeleton |
| G01–G10 | Internal to Aredir Labs | aredirlabs | include-as-sync | Per AEF-001 internal + Inheritance sync |
| G11 | Internal to Aredir Labs | aredirlabs | exclude | Review record |
| R01–R02 | Ready After Normalization | aredirlabs | include-as-sync | Scrub AlignFit-heavy examples where needed |
| R03–R05 | Future Extraction | aredirlabs | exclude → later sync | Product-example scrub required (AEF-001) |
| R06 | Ready After Normalization | bootstrap | include-owned | Operational |
| D01–D03 | Ready for Bootstrap | aredirlabs | include-as-sync | C4 ready |
| D04 | Future Extraction | — | exclude | Missing standard |
| Q01–Q02 | Ready for Bootstrap | aredirlabs | include-as-sync | |
| Q03 | Ready After Normalization | aredirlabs | include-as-sync | Ensure C5 ownership clear in indexes |
| Q04–Q08 | Ready for Bootstrap | bootstrap | include-owned | Operational checklists/templates |
| Q09 | Ready After Normalization | bootstrap | include-owned | Empty scaffold; strip Labs issues |
| Q10 | Future Extraction | aredirlabs | exclude | Draft; wrong path |
| I01–I02 | Ready for Bootstrap | aredirlabs | include-as-sync | |
| I03–I05 | Ready for Bootstrap | bootstrap | include-owned | Operational agent docs |
| I06–I09 | Future Extraction | aredirlabs | exclude → later sync | AI product patterns; scrub/validate for generic bootstrap |
| K01–K03 | Internal to Aredir Labs | aredirlabs | include-as-sync | Consume/sync guidance; no second registry |
| K04–K05 | Internal to Aredir Labs | aredirlabs | exclude | Roadmaps |
| K06 | Future Extraction | aredirlabs | exclude → later sync | Knowledge pattern; mature but not Phase-1 essential |
| K07 | Internal to Aredir Labs | aredirlabs | exclude | Reviews |
| K08 | Future Extraction | — | exclude | Missing |
| K09 | Product Specific | aredirlabs (product) | exclude | Workspace registry app |
| V01 | Ready After Normalization | aredirlabs | include-as-sync | Playbook; index wording cleanup |
| V02–V04 | Internal to Aredir Labs | aredirlabs | include-as-sync | Governance domains |
| V05–V06 | Ready After Normalization | bootstrap | include-owned | Strip Labs hostnames/secrets examples |
| V07 | Ready After Normalization | bootstrap | include-owned | Generic scaffold |
| V08 | Ready After Normalization | aredirlabs | include-as-sync or exclude | Prefer Labs-canonical index; bootstrap may thin-link |
| V09 | Ready After Normalization | bootstrap | include-owned | **Empty template index only** |
| V10 | Ready After Normalization | bootstrap | include-owned | Generalize foundation prompt |
| V11 | Product Specific | aredirlabs | exclude | Site prompts |
| V12–V13 | Ready for Bootstrap | bootstrap | include-owned | |
| V14 | Ready After Normalization | bootstrap | include-owned | Placeholder handles |
| V15 | Future Extraction | — | exclude | Missing playbook |
| X01 | Ready After Normalization | aredirlabs | include-as-sync | |
| X02–X03 | Ready After Normalization | bootstrap | include-owned | Generic UI conventions |
| X04–X06 | Product Specific | product / Labs site | exclude | |
| E01–E03 | Internal to Aredir Labs | aredirlabs | exclude | Establishment reviews |
| P01–P04 | Product Specific | product / Labs | exclude | |

---

## 6. Dependency Analysis

### 6.1 Bootstrap Phase-1 dependency graph (minimized)

```
B07–B09 skeleton
    ↓
B01–B03 inheritance/blueprint/reference (sync)
    ↓
D01–D03 documentation rules (sync) + docs/ tree scaffolds
    ↓
I02–I05 agent standards (sync + owned operational)
    ↓
Q04–Q08 QA/bug operational (owned) + Q01–Q02 (sync)
    ↓
V12–V14 GitHub templates (owned) + V01 Feature Delivery (sync)
    ↓
V09 empty implementation index + V10 foundation prompt (normalized)
```

### 6.2 Dependency classes for bootstrap candidates

| Candidate set | Internal deps | Cross-framework deps | Repo deps | Product deps | Minimize by |
|---------------|---------------|----------------------|-----------|--------------|-------------|
| Skeleton B07–B09 | None | C8 | git/editor | None | Keep stack-agnostic |
| C8 specs B01–B03 | C1 links | C1–C7 references | aredirlabs canonical | None | Sync whole docs; don’t rewrite |
| Agent I03–I05 | I02 canonical | C5 gates, C9 WP | company sync | None | Operational stubs link upward |
| QA Q04–Q08 | Q01–Q02 | C9 release | company sync | None | Checklists without product flows |
| GitHub V12–V14 | V01, C9 | C5 | None | None | Neutral templates |
| Sync payload (A01, G*, D*, Q01…) | Each other | All C* | aredirlabs | Must scrub product examples in later phases | Versioned sync from Labs |

### 6.3 Dependencies that must **not** enter Phase-1 bootstrap

| Dependency | Why exclude |
|------------|-------------|
| Knowledge Asset Registry app (K09) | Product/platform |
| AlignFit origin examples embedded in patterns | Product coupling (scrub in Future phases) |
| Workspace plan docs (P02) | Labs product history |
| Consulting packaging | No authoritative consulting framework |
| Vercel/Neon Labs-specific runbooks beyond generic env strategy | Product/platform specifics in plan/docs |

---

## 7. Extraction Manifest

Implementation-neutral manifest for a future extraction work package.

```yaml
# AEF-002 Extraction Manifest
# Consumer: future aredir-project-bootstrap implementation WP
manifest_version: 1
source_repository: aredirlabs-com
target_repository: aredir-project-bootstrap
authority:
  ownership: AEF-001
  boundary: AEF-002
  inheritance: PROJECT_INHERITANCE_MODEL
  blueprint: ENGINEERING_BLUEPRINT_SPECIFICATION

included_capabilities:
  phase_1_owned_templates: [C4, C5, C6, C8, C9_partial]
  phase_1_sync_from_labs: [C1, C2, C4, C5_standards, C6_canonical, C8_specs, C9_playbook]
  later_phases: [C3_patterns, C7_patterns, C10_experience, C9_release_playbook]

included_documentation:
  owned_by_bootstrap:
    - README.md (product-neutral scaffold)
    - AGENTS.md / CLAUDE.md (stubs linking to company standards)
    - docs/agent/* (operational)
    - docs/qa/* (checklists)
    - docs/bugs/{bug-triage-process,bug-report-template,known-issues scaffold}
    - docs/engineering/{repository-standards,deployment-workflow,environment-strategy,technical-overview scaffolds}
    - docs/architecture/{project-conventions,naming-conventions,ui-patterns,component-guidelines,future-product-standards}
    - docs/prompts/implementation-index.md (empty template)
    - docs/prompts/prompt-001A-foundation.md (normalized)
    - docs/product/site-brief.md (empty scaffold)
    - docs/brand/ (empty scaffold)
    - plan/docs/.gitkeep (or README explaining verification records)
  synced_from_aredirlabs:
    subtree: docs/company/
    include:
      - ENGINEERING_OPERATING_SYSTEM.md
      - ENGINEERING_CAPABILITY_MODEL.md
      - PROJECT_INHERITANCE_MODEL.md
      - ENGINEERING_BLUEPRINT_SPECIFICATION.md
      - REFERENCE_REPOSITORY_SPECIFICATION.md
      - GOVERNANCE_INDEX.md
      - governance/**
      - knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md
      - documentation-standards/**
      - engineering-standards/**
      - qa-standards/**
      - playbooks/**
      - PROMOTION_PROCESS.md
      - KNOWLEDGE_BASE_INDEX.md
      # patterns: phased — see future_content
    exclude_from_default_sync:
      - framework/**              # AEF evolution spine stays Labs-canonical
      - brand/**                  # Labs marketing/brand
      - reviews/**                # historical review records
      - KNOWLEDGE_BASE_ROADMAP.md
      - KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md
      - architecture-patterns/**  # until scrubbed (phase 2+)
      - ai-patterns/**            # until scrubbed (phase 2+) except AI_EVALUATION may phase with C5
      - knowledge-patterns/**     # phase 2+

included_standards:
  - Documentation Governance + Maintenance + Taxonomy (sync)
  - Coding Agent Operating Standard (sync)
  - QA Engineering Framework + RCA (sync)
  - Architecture Audit Standard (sync after light normalization)
  - Feature Delivery Standard (sync after index hygiene)

included_templates:
  - .editorconfig / .gitattributes / .gitignore / .env.example
  - .github/PULL_REQUEST_TEMPLATE.md
  - .github/ISSUE_TEMPLATE/*
  - .github/CODEOWNERS (placeholders)
  - docs/agent/guarded-prompt-template.md
  - docs/bugs/bug-report-template.md
  - empty implementation index
  - empty product/brand scaffolds

included_playbooks:
  - Feature Delivery Standard (sync)
  # Release Management Playbook — future_content

included_schemas:
  - none_promoted_as_standalone_schema_files
  - note: Knowledge Asset Registry schema remains Labs-only (not bootstrap)

included_prompts:
  - prompt-001A-foundation (normalized)
  # 001B/001C excluded (product-specific)

included_examples:
  - none_in_phase_1
  - phase_later: anonymized architecture audit sample (optional)

included_verification:
  - docs/qa/* checklists
  - documented commands: lint, build (stack-neutral wording)
  - plan/docs/ convention for verification records

excluded_content:
  - src/**, public/** (Labs site / apps)
  - docs/workspace/**
  - docs/company/brand/**
  - docs/company/framework/** (AEF series remains Labs)
  - docs/company/reviews/**
  - docs/company/*ROADMAP*
  - plan/docs/AREDIR-WORKSPACE-* and Labs deployment narratives
  - docs/prompts/prompt-001B*, prompt-001C*
  - docs/architecture/public-engineering-experience.md
  - AlignFit / ClassForge / LeagueOS domain assets
  - Knowledge registry application code

reserved_content:
  - Canonical docs/company ownership in aredirlabs-com
  - Promotion Process authority and registry
  - AEF series evolution
  - Security Standard (when created)
  - Consulting packaging (no framework yet)

future_content:
  - Scrubbed architecture-patterns/**
  - Scrubbed ai-patterns/** (product-agnostic)
  - knowledge-patterns/EVIDENCE_LIFECYCLE_PATTERN.md
  - UI Quality Audit (after promote/relocate)
  - Decision Record Standard
  - Knowledge Capture Standard
  - Release Management Playbook
  - Deployment Standards folder
  - Optional stack starter (Next.js etc.) — separate from methodology package
  - Generators / CLI — after structure stable
```

---

## 8. Repository Boundary Model

| Concern | aredirlabs-com | aredir-project-bootstrap | Product repos | Future consulting repos |
|---------|----------------|--------------------------|---------------|-------------------------|
| AEF / EOS / Governance authority | **Canonical** | Sync consumer / distributor | Sync consumer | Optional curated subset (future) |
| Promoted KB assets | **Canonical** | Sync distributor | Sync consumer; Adopt/Extend/Deviate | Future packaging |
| Promotion & registry | **Canonical** | Forbidden second registry | Feed candidates back | N/A |
| Blueprint / Inheritance specs | **Canonical** | Sync + implements checklist | Conforms | May reference |
| Operational agent/QA/GitHub templates | Source of truth today | **Bootstrap-owned copies** after extraction | Customize via Extend | May reuse |
| Implementation index content | Labs history | Empty template | Product history | Engagement history |
| Domain architecture | Labs site only | Scaffolds only | **Canonical for product** | Client domain |
| Brand / marketing | Labs site | Empty scaffold | Product brand | Client brand |
| Generators / CLI | Spec only | Future home | Consumes | Consumes |

**One canonical home rule:** Methodology markdown under `docs/company/` (except product brand under `docs/company/brand/`) remains owned by **aredirlabs-com**. Bootstrap must label synced copies as synced and point to Labs for PRs that change standards.

---

## 9. Copy vs Reference Strategy

| Asset class | Strategy | Rationale |
|-------------|----------|-----------|
| `docs/company/` allowed sync set | **Remain centralized** + **sync copy** into bootstrap consumers | Inheritance conflict rule; AEF-001 C1/C2 internal |
| AEF series `framework/` | **Remain centralized** / reference-only from bootstrap README | Evolution spine; not product runtime need |
| Reviews / roadmaps | **Remain centralized** | Historical/planning; exclude from default sync |
| Operational `docs/agent`, `docs/qa`, `docs/bugs` | **Copied** into bootstrap (owned templates) | Stable, product-agnostic; local Extend allowed |
| GitHub templates, editorconfig | **Copied** | Skeleton essentials |
| Feature Delivery / QA frameworks | **Sync** (centralized) | Promoted standards; avoid divergent forks |
| Architecture/AI patterns | **Sync later** after scrub | Future Extraction |
| Stack starter (`src/` sample) | **Generated** later (optional package) | Not methodology; stack-specific |
| Registry | **Reference-only** to Labs | No second registry (AEF-001) |
| AGENTS.md | **Copied** stub that **references** company Coding Agent Standard | Root discoverability + canonical-first |

---

## 10. Synchronization Strategy

### Recommended architecture (not implemented here)

**Primary:** Versioned sync of the allowed `docs/company/` subset from `aredirlabs-com` → product repos (and into bootstrap as the sync source snapshot or sync script).

| Approach | Verdict | Evidence fit |
|----------|---------|--------------|
| Manual copy without provenance | Reject | Causes knowledge drift / forks |
| Ad hoc parallel edits in products | Reject | Violates canonical-first |
| **Versioned releases of methodology pack** (semver / platform version) | **Recommend** | Aligns with Platform v1.0 / Blueprint versioning (IMPLEMENTATION-001, EOS-004) |
| Sync script or documented pull procedure | **Recommend** (Phase 1–2) | Matches Inheritance “sync `docs/company/`” |
| Git submodule / subtree | Optional later | Heavier; acceptable if version-pinned |
| Template regeneration from bootstrap | **Recommend** for owned templates only | Skeleton refresh ≠ methodology ownership |
| Reference-only (no local company docs) | Insufficient alone | Agents/engineers need local trees per Blueprint discoverability |
| Inheritance Adopt/Extend/Deviate metadata | **Required** | Promotion Process |

### Sync rules

1. Product PRs must not redefine synced company standards; Deviate requires decision record.  
2. Bootstrap pins a **methodology pack version** matching Labs Platform/Blueprint markers.  
3. Operational template updates ship via bootstrap version; methodology updates ship via Labs sync.  
4. Registry and promotion remain Labs-only; products link to Labs registry when applicable.

---

## 11. Bootstrap Package Structure

Recommended high-level layout (boundaries only — no generation):

```text
aredir-project-bootstrap/
├── README.md                      ← what this repo is; sync instructions; version pins
├── AGENTS.md
├── CLAUDE.md                      ← optional alias
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .env.example
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
│
├── foundation/                    ← methodology sync + inheritance contracts
│   ├── VERSION                    ← methodology pack / blueprint / platform pins
│   ├── SYNC.md                    ← how to sync from aredirlabs-com
│   └── company/                   ← synced allowed docs/company subset (or script output)
│
├── templates/                     ← bootstrap-owned operational docs
│   ├── agent/
│   ├── qa/
│   ├── bugs/
│   ├── engineering/
│   ├── architecture/              ← conventions only (not product architecture)
│   ├── product/                   ← empty scaffolds
│   ├── brand/                     ← empty scaffolds
│   └── prompts/                   ← empty index + normalized 001A
│
├── playbooks/                     ← optional mirrors/pointers to synced Feature Delivery
│   └── README.md                  ← points to foundation/company/playbooks
│
├── schemas/                       ← reserved; empty in Phase 1
│   └── README.md
│
├── examples/                      ← reserved; none in Phase 1
│   └── README.md
│
├── prompts/                       ← generator-facing prompt library (future)
│   └── README.md
│
└── verification/
    ├── README.md                  ← required commands; checklist pointers
    └── plan-docs/                 ← convention for verification records
```

**Validation against evidence:**

| Proposed folder | Evidence support |
|-----------------|------------------|
| `foundation/` | Inheritance sync + Blueprint/Reference specs |
| `templates/` | Future Product Standards carry-forward list |
| `playbooks/` | Feature Delivery as C9; pointer avoids duplication |
| `schemas/` | Reserved — no standalone schema pack yet |
| `examples/` | Explicitly none in Phase 1 |
| `prompts/` | Guarded templates exist; library promotion future |
| `verification/` | QA checklists + plan/docs convention |

Physical paths inside generated product repos should still match Blueprint zones (`docs/…`, `.github/…`) — `foundation/templates/` are **bootstrap repo** organization; generation maps them onto product layout.

---

## 12. Capability Readiness Matrix

| Capability | Readiness | Evidence (AEF-001 §8 + this inventory) |
|------------|-----------|----------------------------------------|
| C1 EOS | **internal** (sync) | Ownership Labs; include-as-sync |
| C2 Governance | **internal** (sync) | Ownership Labs; include-as-sync |
| C3 Architecture | **future** | Patterns need scrub; Audit Standard ready-after-normalization |
| C4 Documentation | **ready** | D01–D03 Ready for Bootstrap |
| C5 Quality & Verification | **ready** (+ UI audit **future**) | Q01–Q08 ready; Q10 future |
| C6 AI Collaboration | **ready** (patterns **future**) | I01–I05 ready; I06–I09 future |
| C7 Knowledge | **future** / **internal** | Sync index+promotion process; no registry; patterns later |
| C8 Bootstrap & Inheritance | **ready** | B01–B03, B07–B09 |
| C9 Delivery & Release | **requires normalization** | Templates ready; V01 sync; V15 future |
| C10 Design & Experience | **future** | X01–X03 normalize later; brand product-specific |

---

## 13. Risk Assessment

| Risk | Impact | Mitigation |
|------|--------|------------|
| Duplication of standards | Divergent forks | Sync-only for `docs/company/`; operational Extend documented |
| Governance drift | Conflict rules ignored | Pin methodology pack version; quarterly sync |
| Knowledge drift | Stale synced copies | Version markers + SYNC.md + CI check optional later |
| Versioning confusion | Blueprint vs pack vs product | Single VERSION file with Platform/Blueprint/EOS/pack |
| Template decay | Outdated agent/QA stubs | Bootstrap releases; changelog |
| Ownership ambiguity | Wrong PRs to bootstrap | README: standards PRs → aredirlabs |
| Framework coupling | Bootstrap blocked on C3/C7 maturity | Phased manifest; Phase 1 without patterns |
| Second registry | Split KB truth | Forbidden in manifest |
| Product leakage | AlignFit examples in pack | Exclude patterns until scrub; exclude workspace/brand |
| Over-sync (reviews/roadmaps) | Noise in products | Default sync exclude list |
| Generator premature | Wrong boundaries baked in | No generators until AEF-002 consumed by implementation WP |

---

## 14. Recommended Extraction Sequence

| Phase | Name | Contents | Depends on |
|-------|------|----------|------------|
| **1** | Foundation | Skeleton B07–B09; README/SYNC/VERSION; B01–B03 sync; docs tree mapping | AEF-002 acceptance |
| **2** | Standards (sync) | D01–D03, I02, Q01–Q02, R02, V01, G01–G10, A01–A02 allowed sync set | Phase 1 |
| **3** | Templates (owned) | I03–I05, Q04–Q09, V12–V14, engineering/architecture operational scaffolds | Phase 1 |
| **4** | Playbooks | Feature Delivery pointer/sync confirmation; empty implementation index; normalized 001A | Phase 2–3 |
| **5** | Examples | Optional anonymized samples only after scrub policy | Phase 4; C3/C6 future work |
| **6** | Automation | Sync script, pack release, optional generator/CLI | Phases 1–4 stable |

**Do not** start Phase 6 before Phase 1–4 boundaries are implemented as specified.

**Next implementation package (recommended):**  
`BOOTSTRAP-001` — Create `aredir-project-bootstrap` Phase 1–3 only, consuming this manifest; no pattern pack; no generators.

---

## 15. Future Opportunities

| ID | Opportunity |
|----|-------------|
| AEF-003 | Documentation structure — Blueprint listing for `framework/`; sync path normalization |
| AEF-004 | Pattern scrub catalog — criteria to move R03–R05, I06–I09, K06 to Ready |
| AEF-005 | Quality umbrella — UI Audit + AQSF relationship |
| BOOTSTRAP-001 | Implementation WP for Phases 1–3 |
| BOOTSTRAP-002 | Sync automation + versioned methodology pack releases |
| AREDIR-KB-016 | Knowledge Capture Standard (enables stronger C7 consume guide) |
| — | Decision Record Standard; Release Management Playbook |

---

## 16. Verification Record

| Check | Result |
|-------|--------|
| AEF-002 identifier unused as document | Confirmed |
| Classifications derived from AEF-001 | Observed |
| No extraction performed | Observed |
| No AlignFit modifications | Observed |
| No bootstrap repo created | Observed |
| No production code changes intended | Documentation-only |

---

## Related

- [AEF-000 Aredir Engineering Framework Discovery](./AEF_000_AREDIR_ENGINEERING_FRAMEWORK_DISCOVERY.md)
- [AEF-001 Framework Capability Contracts](./AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md)
- [Project Inheritance Model](../PROJECT_INHERITANCE_MODEL.md)
- [Engineering Blueprint Specification](../ENGINEERING_BLUEPRINT_SPECIFICATION.md)
- [Reference Repository Specification](../REFERENCE_REPOSITORY_SPECIFICATION.md)
- [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md)
- [Documentation Governance](../governance/DOCUMENTATION_GOVERNANCE.md)
- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Future Product Standards](../../architecture/future-product-standards.md)
- [Implementation index](../../prompts/implementation-index.md)
