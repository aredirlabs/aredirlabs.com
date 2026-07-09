# Aredir Labs Engineering Reference Repository Specification

**Status:** Company Standard  
**Owner:** Aredir Labs  
**Work item:** IMPLEMENTATION-001  
**Platform version:** 1.0  
**Last reviewed:** 2026-06-25  
**Next review due:** 2026-09-12

## Purpose

Define the **canonical Engineering Reference Repository** — the definitive specification describing the repository that every future Aredir Labs project should inherit from.

This is **not** a product repository. It is **not** a GitHub template implementation. It is the specification for the repository that **operationalizes** the [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md) — transforming EOS methodology into a reusable engineering platform.

The Reference Repository answers:

> **If an engineer clones an Aredir Labs template repository tomorrow, exactly what exists?**

The answer requires no additional interpretation.

**Relationship to EOS:**

| Work item | Role |
|-----------|------|
| GOVERNANCE-001 | Governance framework — referenced, not duplicated |
| EOS-001 | Operating system methodology |
| EOS-002 | Engineering capabilities |
| EOS-003 | Inheritance methodology — how projects consume the reference |
| EOS-004 | Blueprint contract — structural requirements the reference satisfies |
| **IMPLEMENTATION-001 (this document)** | **Executable engineering platform specification** |

**Physical reference:** [aredirlabs-com](https://github.com/aredirlabs/aredirlabs-com) implements Platform v1.0. Product repositories inherit from it per [Project Inheritance Model](./PROJECT_INHERITANCE_MODEL.md).

Part of the [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md). Completed by [IMPLEMENTATION-001 Review](./reviews/IMPLEMENTATION_001_REFERENCE_REPOSITORY.md).

---

## What the Reference Repository is

| It is | It is not |
|-------|-----------|
| The engineering platform all products inherit | A product feature repository |
| The source of `docs/company/` and operational standards | Domain architecture for AlignFit, ClassForge, or LeagueOS |
| The template for workflow, docs, QA, AI, and GitHub guardrails | A GitHub template button (future implementation) |
| The first executable asset built from EOS standards | A replacement for governance or capability definitions |

Products **clone, sync, or generate from** the Reference Repository. They customize product metadata, domain docs, and source code — not company methodology.

---

## Repository layout

The Reference Repository organizes assets into a **canonical directory tree**. Paths are normative for Platform v1.0. Stack-specific source layout (`src/app/` vs `src/`) may vary by framework; all other paths are fixed.

```
reference-repository/
├── .github/
│   ├── ISSUE_TEMPLATE/
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── workflows/                    ← recommended; CI definitions
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── CODEOWNERS
│
├── docs/
│   ├── company/                      ← EOS, governance, Knowledge Base (authoritative)
│   │   ├── governance/
│   │   ├── knowledge/
│   │   ├── architecture-patterns/
│   │   ├── engineering-standards/
│   │   ├── qa-standards/
│   │   ├── ai-patterns/
│   │   ├── playbooks/
│   │   ├── documentation-standards/
│   │   └── reviews/                  ← formal EOS and KB review records
│   ├── architecture/                 ← cross-project conventions (operational)
│   ├── agent/                        ← AI workspace instructions
│   ├── engineering/                  ← deployment, environment, repository standards
│   ├── product/                      ← product overview scaffold (customized per repo)
│   ├── brand/                        ← brand scaffold (customized per repo)
│   ├── qa/                           ← QA checklists and procedures
│   ├── bugs/                         ← bug triage and known issues
│   ├── prompts/                      ← implementation index; optional work-item prompts / briefs
│   └── workspace/                    ← internal workspace docs (Reference Repository only)
│
├── plan/
│   └── docs/                         ← verification and milestone records
│
├── scripts/                          ← bootstrap, verification, and utility scripts
│
├── src/                              ← application source (framework-specific layout)
│
├── public/                           ← static assets served by the application
│
├── tests/                            ← automated test suites (recommended)
│
├── README.md                         ← repository identity, workflow, platform versions
├── AGENTS.md                         ← root AI agent rules
├── CLAUDE.md                         ← agent rules alias (optional)
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .env.example
├── package.json                      ← or stack-equivalent manifest
└── CONTRIBUTING.md                   ← recommended
```

### Layout mapping to blueprint zones

| Blueprint zone ([EOS-004](./ENGINEERING_BLUEPRINT_SPECIFICATION.md)) | Reference Repository path |
|------------------------------------------------------------------------|---------------------------|
| Source | `src/` |
| Documentation | `docs/` |
| Governance | `docs/company/`, README, AGENTS.md |
| Implementation records | `docs/prompts/`, `plan/docs/` |
| Architecture | `docs/architecture/`, `docs/product/` |
| Knowledge | `docs/company/`, project notes in workspace |
| Automation | `.github/`, `scripts/` |
| Testing | `tests/`, `docs/qa/` |
| Assets | `public/`, `docs/brand/` |
| Root metadata | README, AGENTS.md, editor/git config, version markers |

### Reference Repository vs product repository

| Asset | Reference Repository | Product repository |
|-------|:--------------------:|:------------------:|
| `docs/company/` | Authoritative source | Synced copy |
| `docs/workspace/` | Present | Optional |
| `docs/product/`, `docs/brand/` | Scaffold only | Fully customized |
| `src/` | Template application | Domain implementation |
| `plan/docs/` | Example verification records | Project-specific records |
| Platform version markers | Current version | Inherited + last sync date |

---

## Repository assets

Every reusable engineering asset in the Reference Repository is listed below. Governance content lives in `docs/company/` — **referenced here, not redefined**.

### Documentation assets

| Asset | Path | Required | Notes |
|-------|------|:--------:|-------|
| README | `README.md` | Yes | Identity, workflow, EOS links, platform versions |
| Site brief / product overview | `docs/product/site-brief.md` | Yes | Scaffold; customized per product |
| Implementation index | `docs/prompts/implementation-index.md` | Yes | Work packages, optional briefs, KB items |
| Guarded prompt template | `docs/agent/guarded-prompt-template.md` | Yes | Optional Implementation Brief scaffold |
| Technical overview | `docs/engineering/technical-overview.md` | Recommended | Stack and system summary |
| Repository standards | `docs/engineering/repository-standards.md` | Recommended | Text file hygiene, branch protection |
| Environment strategy | `docs/engineering/environment-strategy.md` | Recommended | Dev/staging/prod |
| Deployment workflow | `docs/engineering/deployment-workflow.md` | Recommended | Preview → production |
| Project conventions | `docs/architecture/project-conventions.md` | Recommended | Naming, structure |
| Future product standards | `docs/architecture/future-product-standards.md` | Recommended | Quick-start inheritance guide |
| Contribution guide | `CONTRIBUTING.md` | Recommended | External contributor path |
| Roadmap | `docs/company/KNOWLEDGE_BASE_ROADMAP.md` | Reference only | Company-owned |
| Release notes | GitHub Releases or `docs/product/` | Optional | Product-owned |
| Decision records | `plan/docs/` or project notes | Optional | Project-owned |

### Governance and knowledge references

| Asset | Path | Required | Notes |
|-------|------|:--------:|-------|
| Engineering Operating System | `docs/company/ENGINEERING_OPERATING_SYSTEM.md` | Yes | EOS entry point |
| Engineering Capability Model | `docs/company/ENGINEERING_CAPABILITY_MODEL.md` | Yes | Capabilities |
| Project Inheritance Model | `docs/company/PROJECT_INHERITANCE_MODEL.md` | Yes | Inheritance methodology |
| Engineering Blueprint Specification | `docs/company/ENGINEERING_BLUEPRINT_SPECIFICATION.md` | Yes | Blueprint contract |
| Reference Repository Specification | `docs/company/REFERENCE_REPOSITORY_SPECIFICATION.md` | Yes | This document |
| Governance Index | `docs/company/GOVERNANCE_INDEX.md` | Yes | Eight-domain framework |
| Knowledge Base Index | `docs/company/KNOWLEDGE_BASE_INDEX.md` | Yes | Promoted assets |
| Promotion Process | `docs/company/PROMOTION_PROCESS.md` | Yes | Asset lifecycle |
| Governance domains | `docs/company/governance/*.md` | Yes | Eight domain documents |
| Promoted standards and patterns | `docs/company/*/` | Yes | Full KB tree |

### AI assets

| Asset | Path | Required | Notes |
|-------|------|:--------:|-------|
| AGENTS.md | `AGENTS.md` | Yes | Root agent rules |
| Coding agent operating standard | `docs/agent/coding-agent-operating-standard.md` | Yes | Operational entry point |
| Guarded prompt template | `docs/agent/guarded-prompt-template.md` | Yes | Optional Implementation Brief scaffold |
| PR review template | `docs/agent/pr-review-template.md` | Recommended | Agent and human review |
| Foundation prompt | `docs/prompts/prompt-001A-foundation.md` | Recommended | Bootstrap work item |
| Canonical agent standard | `docs/company/engineering-standards/CODING_AGENT_OPERATING_STANDARD.md` | Yes | Promoted KB asset |

AI domain rules remain in [AI Governance](./governance/AI_GOVERNANCE.md) — not duplicated here.

### QA assets

| Asset | Path | Required | Notes |
|-------|------|:--------:|-------|
| QA Engineering Framework | `docs/company/qa-standards/QA_ENGINEERING_FRAMEWORK.md` | Yes | Canonical QA methodology |
| Release checklist | `docs/qa/release-checklist.md` | Yes | Pre-production gate |
| Manual QA checklist | `docs/qa/manual-qa-checklist.md` | Recommended | User-facing changes |
| UAT checklist | `docs/qa/uat-checklist.md` | Optional | When UAT applies |
| Bug triage process | `docs/bugs/bug-triage-process.md` | Yes | Severity and response |
| Bug report template | `docs/bugs/bug-report-template.md` | Yes | Issue workflow |
| Known issues register | `docs/bugs/known-issues.md` | Recommended | Operational tracking |
| Root Cause Analysis Framework | `docs/company/qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md` | Reference | Promoted KB asset |

### GitHub assets

| Asset | Path | Required | Notes |
|-------|------|:--------:|-------|
| Bug report issue template | `.github/ISSUE_TEMPLATE/bug_report.md` | Yes | |
| Feature request issue template | `.github/ISSUE_TEMPLATE/feature_request.md` | Yes | |
| Pull request template | `.github/PULL_REQUEST_TEMPLATE.md` | Yes | Verification attestation |
| CODEOWNERS | `.github/CODEOWNERS` | Recommended | Default reviewers |
| CI workflows | `.github/workflows/` | Recommended | Lint, build on PR |
| Issue labels | GitHub repository settings | Recommended | severity, type, area |
| Milestones | GitHub repository settings | Optional | Release planning |
| Discussions | GitHub repository settings | Future | Community or internal Q&A |

### Automation assets

| Asset | Path | Required | Notes |
|-------|------|:--------:|-------|
| Editor config | `.editorconfig` | Yes | UTF-8, LF, indentation |
| Git attributes | `.gitattributes` | Yes | Line ending normalization |
| Environment example | `.env.example` | Recommended | Secret-free template |
| Verification scripts | `scripts/` | Recommended | DB, env, deploy checks |
| Bootstrap script | `scripts/bootstrap/` | Future | Post-clone initialization |
| Compliance audit | `scripts/compliance/` | Future | Blueprint checklist runner |
| Documentation validation | `scripts/docs/` | Future | Link and index checks |
| Architecture validation | `scripts/architecture/` | Future | Convention enforcement |
| Repository sync tool | `scripts/sync/` | Future | Pull `docs/company/` updates |

Documentation describes automation in `docs/engineering/` and `docs/company/playbooks/`. Executable assets live in `.github/` and `scripts/`.

---

## Repository initialization

When a new Aredir Labs project is created, the following sequence applies. Future tools (template button, CLI generator, AI bootstrap) must implement this flow.

```
Repository Created
        ↓
Apply Reference Repository          ← clone, generate, or sync from aredirlabs-com
        ↓
Configure Project Metadata          ← name, purpose, README, site brief
        ↓
Configure Language / Stack          ← TypeScript baseline; framework per product
        ↓
Initialize Documentation            ← reset implementation index; customize product/brand
        ↓
Initialize AI Workspace             ← AGENTS.md, docs/agent/, prompt prefix
        ↓
Initialize QA                       ← confirm docs/qa/, docs/bugs/ present
        ↓
Initialize CI                       ← lint, build; preview deploy when applicable
        ↓
Record Platform Versions            ← platform, blueprint, EOS, last sync date
        ↓
Verify Baseline                     ← lint, build pass; indexes exist
        ↓
Development Ready
```

### Initialization checklist

| Step | Action | Reference |
|------|--------|-----------|
| 1 | Create repository from Reference Repository | This document — [Repository layout](#repository-layout) |
| 2 | Update README with product identity and platform versions | [Versioning](#versioning) |
| 3 | Customize `docs/product/site-brief.md` and `docs/brand/` | [Project Governance](./governance/PROJECT_GOVERNANCE.md) |
| 4 | Reset `docs/prompts/implementation-index.md` | [Implementation index](../prompts/implementation-index.md) |
| 5 | Confirm `docs/company/` matches Reference Repository | [Project Inheritance Model](./PROJECT_INHERITANCE_MODEL.md) |
| 6 | Configure environments | [Environment strategy](../engineering/environment-strategy.md) |
| 7 | Verify AI assets present | [AI Governance](./governance/AI_GOVERNANCE.md) |
| 8 | Confirm GitHub templates and CODEOWNERS | `.github/` |
| 9 | Run verification baseline | README — verification commands |
| 10 | Run foundation prompt (001A) if applicable | [Implementation index](../prompts/implementation-index.md) |

**Development Ready** aligns with [Engineering Blueprint Specification — Compliance](./ENGINEERING_BLUEPRINT_SPECIFICATION.md#compliance-blueprint) Bootstrap level.

---

## Engineering asset classification

Every Reference Repository asset belongs to a category. Required assets must exist at initialization. Versioned assets track changes in platform releases.

### Classification table

| Asset | Category | Required | Versioned | Owner |
|-------|----------|:--------:|:---------:|-------|
| README | Documentation | Yes | Yes | Repository |
| Site brief | Documentation | Yes | Yes | Repository |
| Implementation index | Documentation | Yes | Yes | Repository |
| Technical overview | Documentation | Recommended | Yes | Repository |
| Repository standards | Documentation | Recommended | Yes | Reference → sync |
| Environment strategy | Documentation | Recommended | Yes | Reference → sync |
| Deployment workflow | Documentation | Recommended | Yes | Reference → sync |
| Project conventions | Documentation | Recommended | Yes | Reference → sync |
| Future product standards | Documentation | Recommended | Yes | Reference → sync |
| CONTRIBUTING.md | Documentation | Recommended | Yes | Reference → sync |
| EOS documents | Governance | Yes | Yes | Aredir Labs |
| Governance framework | Governance | Yes | Yes | Aredir Labs |
| Knowledge Base | Governance | Yes | Yes | Aredir Labs |
| Reference Repository Specification | Governance | Yes | Yes | Aredir Labs |
| AGENTS.md | AI | Yes | Yes | Reference → sync |
| Agent operating standard | AI | Yes | Yes | Reference → sync |
| Guarded prompt template | AI | Yes | Yes | Reference → sync |
| PR review template | AI | Recommended | Yes | Reference → sync |
| Foundation prompt | AI | Recommended | Yes | Reference → sync |
| QA Engineering Framework | QA | Yes | Yes | Aredir Labs |
| Release checklist | QA | Yes | Yes | Reference → sync |
| Manual QA checklist | QA | Recommended | Yes | Reference → sync |
| Bug triage process | QA | Yes | Yes | Reference → sync |
| Bug report template | QA | Yes | Yes | Reference → sync |
| Known issues | QA | Recommended | Yes | Repository |
| Issue templates | GitHub | Yes | Yes | Reference → sync |
| PR template | GitHub | Yes | Yes | Reference → sync |
| CODEOWNERS | GitHub | Recommended | Yes | Repository |
| CI workflows | GitHub | Recommended | Yes | Repository |
| Issue labels | GitHub | Recommended | No | Repository |
| Editor config | Automation | Yes | Yes | Reference → sync |
| Git attributes | Automation | Yes | Yes | Reference → sync |
| Verification scripts | Automation | Recommended | Yes | Reference → sync |
| Bootstrap script | Automation | Future | Yes | Aredir Labs |
| Compliance audit | Automation | Future | Yes | Aredir Labs |
| Documentation validation | Automation | Future | Yes | Aredir Labs |
| Architecture validation | Automation | Future | Yes | Aredir Labs |
| Repository sync tool | Automation | Future | Yes | Aredir Labs |
| Application source | Source | Yes | Yes | Repository |
| Test suites | Testing | Recommended | Yes | Repository |
| Static assets | Assets | Yes | Yes | Repository |

**Owner key:** *Aredir Labs* — authoritative in Reference Repository; *Reference → sync* — copied from reference, customized locally; *Repository* — product-owned after initialization.

### Category summary

| Category | Count (required) | Purpose |
|----------|:----------------:|---------|
| Documentation | 3+ | Identity, workflow, indexes |
| Governance | Full `docs/company/` | EOS methodology and KB |
| AI | 3+ | Agent collaboration guardrails |
| QA | 4+ | Verification and defect workflow |
| GitHub | 3+ | Issue and PR guardrails |
| Automation | 2+ | Editor config, scripts, CI |
| Source | 1 | Runnable application |
| Testing | 0 (recommended) | Automated verification |
| Assets | 1 | Static media |

---

## Versioning

Every Reference Repository and every product repository inheriting from it exposes **four version markers**. Future repositories use these to determine conformance with current engineering standards.

### Version markers

| Marker | Meaning | Current value | Location |
|--------|---------|---------------|----------|
| **Engineering Platform Version** | Reference Repository asset release | `1.0` | README, this document |
| **Engineering Blueprint Version** | EOS-004 structural contract | `1.0` | README |
| **EOS Version** | Operating system methodology release | `1.0` | README |
| **Last Sync Date** | When `docs/company/` was last synced from reference | ISO date | README (product repos) |

### EOS version scope

EOS v1.0 includes:

- GOVERNANCE-001 — Governance framework
- EOS-001 — Engineering Operating System
- EOS-002 — Engineering Capability Model
- EOS-003 — Project Inheritance Model
- EOS-004 — Engineering Blueprint Specification
- IMPLEMENTATION-001 — Reference Repository Specification

EOS version increments when a new EOS or IMPLEMENTATION work item changes inherited methodology.

### Platform version scope

Platform v1.0 includes the full asset inventory defined in this specification as implemented in [aredirlabs-com](https://github.com/aredirlabs/aredirlabs-com).

### Conformance determination

A product repository conforms to current standards when:

1. **Blueprint version** matches or exceeds required major version
2. **Platform version** matches or documents migration plan
3. **Last sync date** is within one quarterly review cycle, or Deviate documented
4. **Verification baseline** passes

Future compliance tooling will automate this check. See [Future compatibility](#future-compatibility).

### README version block (normative)

Every repository README includes an **Engineering Platform** section:

```markdown
## Engineering Platform

| Marker | Value |
|--------|-------|
| Platform | v1.0 |
| Blueprint | v1.0 |
| EOS | v1.0 |
| Last sync | 2026-06-25 |
```

Product repositories update **Last sync** on each `docs/company/` pull from the Reference Repository.

---

## Future compatibility

The Reference Repository specification reserves hooks for future implementations. **None of these are implemented in Platform v1.0.** They are documented so tooling can conform without revising the contract.

| Implementation | Purpose | Status |
|----------------|---------|--------|
| GitHub Template Repository | One-click repo creation from reference | Planned |
| CLI Project Generator | `aredir init` scaffold with metadata prompts | Planned |
| VS Code Extension | Workspace templates, prompt library, compliance hints | Planned |
| AI Repository Bootstrap | Agent-driven initialization from this spec | Planned |
| Repository Synchronization Tool | Pull `docs/company/` and operational doc updates | Planned |
| Compliance Engine | Automated blueprint and platform conformance audit | Planned |

### Implementation contract

Future tools must:

1. Produce repositories matching [Repository layout](#repository-layout)
2. Include all **Required** assets from [Engineering asset classification](#engineering-asset-classification)
3. Execute [Repository initialization](#repository-initialization) sequence
4. Write [Version markers](#version-markers) to README
5. Reference governance documents — never duplicate them

When an implementation conflicts with this specification, **this specification wins**.

---

## Relationship to existing EOS

| Document | Relationship |
|----------|--------------|
| [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md) | Reference Repository operationalizes the EOS lifecycle |
| [Engineering Capability Model](./ENGINEERING_CAPABILITY_MODEL.md) | Assets map to capabilities; not redefined |
| [Engineering Blueprint Specification](./ENGINEERING_BLUEPRINT_SPECIFICATION.md) | Blueprint defines zones; this spec defines concrete paths and files |
| [Project Inheritance Model](./PROJECT_INHERITANCE_MODEL.md) | Inheritance flow applies Reference Repository as source |
| [Governance Index](./GOVERNANCE_INDEX.md) | Governance content in `docs/company/governance/` |
| [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md) | Promoted assets shipped in `docs/company/` |

The Reference Repository is the **first executable engineering asset** built from EOS standards. EOS documents define *what and why*; this document defines *exactly what exists* in the platform.

---

## Maintenance

| Activity | Owner | Cadence |
|----------|-------|---------|
| Reference Repository specification review | Aredir Labs engineering lead | Quarterly (with EOS review) |
| Platform version increment | Engineering lead | When asset inventory changes |
| Product sync verification | Product leads | On platform release or quarterly |
| Asset classification update | Engineering lead | When new assets added |

---

## Related

- [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md)
- [Engineering Blueprint Specification](./ENGINEERING_BLUEPRINT_SPECIFICATION.md)
- [Project Inheritance Model](./PROJECT_INHERITANCE_MODEL.md)
- [Future product standards](../architecture/future-product-standards.md)
- [IMPLEMENTATION-001 Review](./reviews/IMPLEMENTATION_001_REFERENCE_REPOSITORY.md)
