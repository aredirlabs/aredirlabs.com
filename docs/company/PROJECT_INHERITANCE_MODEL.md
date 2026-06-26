# Aredir Labs Project Inheritance Model

**Status:** Company Standard  
**Owner:** Aredir Labs  
**Work item:** EOS-003  
**Last reviewed:** 2026-06-25  
**Next review due:** 2026-09-12

## Purpose

Define how every Aredir Labs repository **inherits** the [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md) — the repeatable onboarding methodology for current and future projects.

This document answers:

> **What does a brand-new repository need in order to become an Aredir Labs project?**

Projects **consume** the EOS. They do not recreate it. Product-specific work lives in the repository; company methodology lives in Aredir Labs.

Part of the [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md). Completed by [EOS-003 Review](./reviews/EOS_003_PROJECT_INHERITANCE.md).

Structural requirements for what a repository must contain: [Engineering Blueprint Specification](./ENGINEERING_BLUEPRINT_SPECIFICATION.md) (EOS-004). Executable platform specification: [Reference Repository Specification](./REFERENCE_REPOSITORY_SPECIFICATION.md) (IMPLEMENTATION-001). Inheritance defines **how** to consume the EOS; the blueprint defines **what** must exist; the reference repository defines **exactly what is shipped**.

---

## What inheritance means

| Inherit | Own |
|---------|-----|
| Reference or sync company EOS artifacts | Domain architecture and feature specs |
| Adopt standards by default | Implementation records and ADRs |
| Extend with documented additions | Product docs, roadmaps, release notes |
| Deviate only with governed decision logs | Operational history and domain models |
| Feed promotion candidates back to company | — |

**Conflict rule:** Canonical `docs/company/` wins unless a governed **Deviate** decision exists per [Promotion Process](./PROMOTION_PROCESS.md).

---

## Repository lifecycle

The complete lifecycle is **cyclical** — knowledge flows back into the EOS:

```
Idea
  ↓
Project Proposal
  ↓
Repository Creation
  ↓
Repository Bootstrap
  ↓
EOS Inheritance
  ↓
Architecture
  ↓
Implementation
  ↓
Verification
  ↓
Release
  ↓
Operations
  ↓
Knowledge Capture
  ↓
Promotion Review
  ↓
Engineering Operating System  ──→  Future Projects
         ↑                                    │
         └──────────── feedback loop ─────────┘
```

| Stage | Responsibility | Primary reference |
|-------|----------------|-------------------|
| **Idea** | Product lead / sponsor | [Feature Delivery Standard](./playbooks/FEATURE_DELIVERY_STANDARD.md) — Idea |
| **Project Proposal** | Scope, sponsor, rough sizing | [Company Governance](./governance/COMPANY_GOVERNANCE.md) — SDLC |
| **Repository Creation** | Clone or generate from template | This document — Bootstrap |
| **Repository Bootstrap** | Docs, indexes, CI baseline | [Engineering Blueprint Specification](./ENGINEERING_BLUEPRINT_SPECIFICATION.md); this document — Bootstrap checklist |
| **EOS Inheritance** | Sync `docs/company/`; Adopt defaults | [Future product standards](../architecture/future-product-standards.md) |
| **Architecture** | Domain design; audit when required | [Architecture Governance](./governance/ARCHITECTURE_GOVERNANCE.md) |
| **Implementation** | Agent-driven delivery within standards | [Coding Agent Operating Standard](./engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) |
| **Verification** | Lint, build, QA evidence | [QA Engineering Framework](./qa-standards/QA_ENGINEERING_FRAMEWORK.md) |
| **Release** | Preview → merge → production validation | [Company Governance](./governance/COMPANY_GOVERNANCE.md) — Release |
| **Operations** | Post-deploy validation, known issues | [Engineering Capability Model](./ENGINEERING_CAPABILITY_MODEL.md) — Operations |
| **Knowledge Capture** | Identify reusable discoveries | [Knowledge Governance](./governance/KNOWLEDGE_GOVERNANCE.md) |
| **Promotion Review** | Generalize and submit candidates | [Promotion Process](./PROMOTION_PROCESS.md) |
| **EOS update** | Company indexes, registry, roadmap | [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md) |

---

## Repository bootstrap

Immediately after creating a repository, bootstrap in this order. Each step references existing standards — do not rewrite them.

```
Repository
    ↓
README                         ← workflow summary, EOS links
    ↓
Documentation Structure        ← docs/ tree per template
    ↓
Implementation Index           ← docs/prompts/implementation-index.md
    ↓
Governance                     ← sync docs/company/ from template
    ↓
Knowledge Registry             ← reference /workspace/knowledge-assets (Aredir Labs)
    ↓
AI Instructions                ← docs/agent/, AGENTS.md, guarded prompt prefix
    ↓
QA Standards                   ← docs/qa/, docs/bugs/
    ↓
Branch Strategy                ← feature/*, fix/*, docs/* from main
    ↓
CI/CD                          ← lint, build, preview deploy (Vercel)
    ↓
Development Ready
```

### Bootstrap checklist

| Step | Action | Reference |
|------|--------|-----------|
| 1 | Clone [Aredir Labs Reference Repository](https://github.com/aredirlabs/aredirlabs-com) or generate from it | [Reference Repository Specification](./REFERENCE_REPOSITORY_SPECIFICATION.md) |
| 2 | Update README with product name, purpose, and workflow | [Project Governance](./governance/PROJECT_GOVERNANCE.md) |
| 3 | Confirm `docs/` tree matches template layout | [Project conventions](../architecture/project-conventions.md) |
| 4 | Create or reset implementation index | [Implementation index](../prompts/implementation-index.md) (template example) |
| 5 | Sync `docs/company/` — do not fork | [Knowledge Governance](./governance/KNOWLEDGE_GOVERNANCE.md) |
| 6 | Carry forward operational docs (`docs/agent/`, `docs/qa/`, `docs/engineering/`) | [Future product standards](../architecture/future-product-standards.md) |
| 7 | Configure AI instructions: prompt prefix, guarded template | [AI Governance](./governance/AI_GOVERNANCE.md) |
| 8 | Confirm GitHub templates and CODEOWNERS | `.github/` |
| 9 | Configure environments | [Environment strategy](../engineering/environment-strategy.md) |
| 10 | Verify `npm run lint` and `npm run build` pass | [Engineering Governance](./governance/ENGINEERING_GOVERNANCE.md) |
| 11 | Customize `docs/product/site-brief.md` and `docs/brand/` | Product-owned |
| 12 | Run foundation prompt (001A) if not already present | [Implementation index](../prompts/implementation-index.md) |

**Development Ready** means: EOS inherited, indexes exist, verification baseline passes, first work item can begin.

---

## Ownership model

### Company-owned

These remain authoritative in Aredir Labs (`aredirlabs-com`). Projects **reference or sync** — never redefine.

| Asset | Location |
|-------|----------|
| Engineering Operating System | `docs/company/ENGINEERING_OPERATING_SYSTEM.md` |
| Project Inheritance Model | `docs/company/PROJECT_INHERITANCE_MODEL.md` |
| Engineering Capability Model | `docs/company/ENGINEERING_CAPABILITY_MODEL.md` |
| Governance Framework | `docs/company/governance/`, `GOVERNANCE_INDEX.md` |
| Knowledge Base | `docs/company/` promoted assets |
| Frameworks | EOS, governance, maturity model, taxonomy |
| Standards | Promoted KB + template operational docs |
| Patterns | `docs/company/architecture-patterns/`, `ai-patterns/` |
| Playbooks | `docs/company/playbooks/` |
| Reference Architectures | Promoted architecture and AI patterns |
| Template repository | `aredirlabs-com` — [Reference Repository Specification](./REFERENCE_REPOSITORY_SPECIFICATION.md) |
| Engineering methodology | EOS lifecycle and capabilities |

Update path: pull or sync from Aredir Labs template — not parallel maintenance in product repos.

### Repository-owned

These stay in the product repository. They implement the EOS for a specific domain.

| Asset | Typical location |
|-------|------------------|
| Domain architecture | `docs/product/`, `docs/architecture/` (product-specific) |
| Feature specifications | Issues, milestones, `docs/product/` |
| Implementation records | `docs/prompts/`, `plan/docs/` |
| ADRs and decision logs | Project notes, `docs/product/` |
| Product documentation | `docs/product/`, `docs/brand/` |
| Product roadmaps | `docs/product/`, workspace milestones |
| Release notes | Repo releases, project docs |
| Domain models | Product architecture docs, code |
| Operational history | Known issues, UAT records, audit reports |

### Promotion candidates

Reusable discoveries from repository work enter the [Knowledge Governance](./governance/KNOWLEDGE_GOVERNANCE.md) lifecycle:

- Engineering improvements proven in production
- Architecture approaches validated across features
- AI workflows with measurable results
- Documentation improvements adopted repeatedly
- Testing methodology that reduces defects

Classify candidates per [Knowledge Artifact Taxonomy](./knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md). Submit via [Promotion Process](./PROMOTION_PROCESS.md) — do not elevate product docs to company standards without review.

---

## Inheritance matrix

| Asset | Source | Project copies? | Project extends? | Project deviates? |
|-------|--------|:-----------------:|:----------------:|:-----------------:|
| EOS | Company | Reference | No | No |
| Project Inheritance Model | Company | Reference | No | No |
| Capability Model | Company | Reference | No | No |
| Governance Framework | Company | Reference | Limited¹ | Rare² |
| Knowledge Base | Company | Sync | No | No |
| Standards | Company | Yes (sync) | Rarely³ | Documented⁴ |
| Patterns | Company | Reference | Sometimes⁵ | Documented⁴ |
| Playbooks | Company | Reference | No | Documented⁴ |
| Reference Architectures | Company | Reference | Domain adapters⁶ | Documented⁴ |
| Operational docs | Template | Yes | Yes³ | Documented⁴ |
| Architecture | Project | Yes | Yes | N/A |
| Feature Specs | Project | Yes | Yes | N/A |
| ADRs | Project | Yes | Yes | N/A |
| Implementation records | Project | Yes | Yes | N/A |
| Promotion candidates | Project → Company | Submit | N/A | N/A |

¹ **Limited extend:** product-specific additions in `docs/product/` that do not contradict canonical guidance.  
² **Rare deviate:** intentional departure; requires decision log per [Promotion Process — Deviate](./PROMOTION_PROCESS.md#project-adoption-model).  
³ **Extend:** document in `docs/product/` or `docs/architecture/`; link to canonical asset.  
⁴ **Deviate:** required decision log with rationale, scope, and review date.  
⁵ **Extend patterns:** domain-specific context builders, contracts, or workspace layouts that implement company patterns.  
⁶ **Domain adapters:** product implements reference architecture with domain-specific schemas — not a fork of the pattern.

---

## Project maturity

Inheritance connects to the [Governance Maturity Model](./governance/GOVERNANCE_MATURITY_MODEL.md). Repository progression:

```
Bootstrap → Developing → Operational → Knowledge Producing → Reference Project
```

| Stage | Description | Maps to maturity |
|-------|-------------|------------------|
| **Bootstrap** | Template cloned; EOS inherited; verification baseline passes | Level 2 |
| **Developing** | Active feature delivery; standards followed; indexes maintained | Level 2–3 |
| **Operational** | Production releases; QA and release checklists used consistently | Level 3 |
| **Knowledge Producing** | Routine promotion candidates; honest adoption metadata | Level 3–4 |
| **Knowledge Producing + AI** | Agent standard enforced; AI patterns adopted when applicable | Level 4 |
| **Reference Project** | Full EOS loop; exemplar for future repositories | Level 5 |

### Current reference project

**AlignFit** is the current **reference implementation** — the primary origin project for AI methodology, QA practices, and promoted Knowledge Base assets. AlignFit proved the EOS in production; it does not own company governance.

| Project | Inheritance stage | Notes |
|---------|-------------------|-------|
| **AlignFit** | Reference Project (approaching) | Primary KB origin; Level 4–5; confirm `docs/company/` sync |
| **Aredir Labs** (this repo) | Reference Project | EOS source; template repository; Level 5 |
| **ClassForge** | Developing | Template inheritance; adoption in progress |
| **LeagueOS** | Developing | Template inheritance; adoption in progress |

Future repositories should use AlignFit and Aredir Labs as examples — not as templates to copy domain architecture from.

---

## Knowledge feedback loop

The learning loop is a defining characteristic of the EOS:

```
Projects
    ↓
Experience (delivery, UAT, production, incidents)
    ↓
Reviews (audits, quarterly KB review, promotion candidate review)
    ↓
Knowledge Capture (identify reusable discoveries)
    ↓
Promotion (generalize, review, index, registry)
    ↓
Engineering Operating System (updated standards and patterns)
    ↓
Future Projects (inherit improved methodology)
```

| Loop stage | Capability | Reference |
|------------|------------|-----------|
| Experience | Delivery, Operations | [Feature Delivery Standard](./playbooks/FEATURE_DELIVERY_STANDARD.md) |
| Reviews | Architecture, Knowledge Management | [Architecture Audit Standard](./documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md) |
| Knowledge Capture | Knowledge Management | [Knowledge Governance](./governance/KNOWLEDGE_GOVERNANCE.md) |
| Promotion | Knowledge Management | [Promotion Process](./PROMOTION_PROCESS.md) |
| EOS update | Knowledge Management | [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md), registry |

**One-way inheritance without feedback is incomplete adoption.** Projects that consume the EOS without feeding promotion candidates accumulate product-specific debt that never compounds as company IP.

---

## How repositories evolve

Repositories evolve through three governed modes — not ad hoc drift:

| Mode | When | Action |
|------|------|--------|
| **Adopt** | Company standard applies unchanged | Sync `docs/company/` on update; note in README |
| **Extend** | Product needs additions that do not contradict canonical guidance | Document in `docs/product/`; link upward |
| **Deviate** | Intentional departure required | Decision log with rationale and review date |

When Aredir Labs updates the EOS:

1. Product repos **sync** `docs/company/` (pull from template or merge)
2. Review operational docs for conflicts
3. Update adoption metadata if capabilities or patterns change
4. Re-assess project maturity stage

Products do not maintain parallel copies of company standards.

---

## Relationship to existing documents

| Document | Role in inheritance |
|----------|----------------------|
| [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md) | What projects inherit |
| [Engineering Capability Model](./ENGINEERING_CAPABILITY_MODEL.md) | Capabilities projects must support |
| [Governance Index](./GOVERNANCE_INDEX.md) | How governance orchestrates inheritance |
| [Knowledge Governance](./governance/KNOWLEDGE_GOVERNANCE.md) | Promotion and registry lifecycle |
| [Knowledge Artifact Taxonomy](./knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md) | Classify repo vs company assets |
| [Governance Maturity Model](./governance/GOVERNANCE_MATURITY_MODEL.md) | Assess inheritance completeness |
| [Engineering Blueprint Specification](./ENGINEERING_BLUEPRINT_SPECIFICATION.md) | Structural contract for compliant repositories |
| [Reference Repository Specification](./REFERENCE_REPOSITORY_SPECIFICATION.md) | Executable platform all projects inherit from |
| [Future product standards](../architecture/future-product-standards.md) | Quick-start bootstrap guide |
| [Project Governance](./governance/PROJECT_GOVERNANCE.md) | Repo organization detail |

---

## Maintenance

| Activity | Owner | Cadence |
|----------|-------|---------|
| Inheritance model review | Aredir Labs engineering lead | Quarterly (with EOS review) |
| Template sync verification | Product leads | On EOS update or quarterly |
| Reference project assessment | Engineering lead | Quarterly |
| Bootstrap checklist update | Engineering lead | When template structure changes |

---

## Related

- [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md)
- [Engineering Capability Model](./ENGINEERING_CAPABILITY_MODEL.md)
- [Governance Index](./GOVERNANCE_INDEX.md)
- [Engineering Blueprint Specification](./ENGINEERING_BLUEPRINT_SPECIFICATION.md)
- [Reference Repository Specification](./REFERENCE_REPOSITORY_SPECIFICATION.md)
- [Future product standards](../architecture/future-product-standards.md)
- [EOS-003 Project Inheritance Review](./reviews/EOS_003_PROJECT_INHERITANCE.md)
- [EOS-004 Engineering Blueprint Review](./reviews/EOS_004_ENGINEERING_BLUEPRINT.md)
