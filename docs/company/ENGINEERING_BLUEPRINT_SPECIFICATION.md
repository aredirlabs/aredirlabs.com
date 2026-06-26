# Aredir Labs Engineering Blueprint Specification

**Status:** Company Standard  
**Owner:** Aredir Labs  
**Work item:** EOS-004  
**Blueprint version:** 1.0  
**Last reviewed:** 2026-06-25  
**Next review due:** 2026-09-12

## Purpose

Define the **canonical blueprint** for every Aredir Labs engineering repository.

This specification is **implementation-independent**. It does not build a template repository. It defines every structural, operational, documentation, governance, AI, QA, and automation component that an Aredir Labs repository must contain.

Future implementations — GitHub template repositories, bootstrap scripts, scaffolding tools, generators, IDE project templates — will **conform to this specification**. This document is the contract for repository creation.

**Relationship to existing EOS:**

| Work item | Defines |
|-----------|---------|
| [EOS-001](./ENGINEERING_OPERATING_SYSTEM.md) | The Engineering Operating System — company methodology |
| [EOS-002](./ENGINEERING_CAPABILITY_MODEL.md) | Organizational capabilities |
| [EOS-003](./PROJECT_INHERITANCE_MODEL.md) | How repositories inherit the EOS |
| **EOS-004 (this document)** | **What a fully compliant repository looks like** |

Part of the [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md). Completed by [EOS-004 Review](./reviews/EOS_004_ENGINEERING_BLUEPRINT.md).

---

## Blueprint philosophy

The blueprint answers:

> **If I clone or create a new repository, what should already exist before writing the first feature?**

Focus is **engineering readiness**, not implementation technology. Language-specific source layouts are intentionally omitted unless a cross-cutting concern requires them.

**Reference implementation:** [aredirlabs-com](https://github.com/aredirlabs/aredirlabs-com) implements Blueprint v1.0 as the [Engineering Reference Repository](./REFERENCE_REPOSITORY_SPECIFICATION.md) (IMPLEMENTATION-001). Product repositories inherit toward compliance via [Project Inheritance Model](./PROJECT_INHERITANCE_MODEL.md).

---

## Repository structure

Every Aredir Labs repository organizes work into the following **logical zones**. Physical paths may vary by stack; the zones must exist and be discoverable.

```
Repository
├── Source                    ← application code (language-specific layout)
├── Documentation             ← docs/ tree
│   ├── company/              ← synced EOS and Knowledge Base (reference or copy)
│   ├── product/              ← product-specific docs
│   ├── architecture/         ← domain architecture and conventions
│   ├── engineering/          ← operational engineering docs
│   ├── agent/                ← AI workspace guidance
│   ├── qa/                   ← QA checklists and procedures
│   ├── bugs/                 ← bug triage and known issues
│   ├── prompts/              ← implementation records and index
│   └── brand/                ← brand guidance (when applicable)
├── Governance                ← references + inheritance metadata
├── Implementation records    ← prompts, plan docs, verification records
├── Architecture              ← domain design (may overlap docs/architecture/)
├── Knowledge                 ← promotion candidates, decision logs
├── Automation                  ← CI/CD, hooks, GitHub templates
├── Testing                     ← test suites and QA assets
├── Assets                      ← static media, design assets
└── Root metadata               ← README, AGENTS.md, editor config, blueprint version
```

### Zone definitions

| Zone | Purpose | Typical location |
|------|---------|------------------|
| **Source** | Runnable application code | `src/`, `app/`, or stack-equivalent |
| **Documentation** | All project documentation under one tree | `docs/` |
| **Governance** | EOS references, adoption metadata, inheritance pointers | `docs/company/`, README, root `AGENTS.md` |
| **Implementation records** | Ordered work items, prompts, verification docs | `docs/prompts/`, `plan/docs/` |
| **Architecture** | Domain architecture, conventions, ADRs | `docs/architecture/`, `docs/product/` |
| **Knowledge** | Candidates for promotion, local decision logs | Project notes, `docs/product/`, workspace |
| **Automation** | Executable engineering assets | `.github/`, CI config, hooks |
| **Testing** | Automated tests and manual QA assets | Test directories, `docs/qa/` |
| **Assets** | Non-code artifacts | `public/`, `assets/` |
| **Root metadata** | Entry points and repository identity | `README.md`, `AGENTS.md`, `.editorconfig` |

Do not prescribe language-specific source layouts. Prescribe **discoverability** — a new contributor or AI agent can locate governance, docs, and verification expectations without searching the entire tree.

---

## Documentation blueprint

Documentation separates **canonical company IP** (`docs/company/`) from **operational implementation** (other `docs/` folders). When guidance conflicts, canonical company docs win unless a governed **Deviate** decision exists per [Promotion Process](./PROMOTION_PROCESS.md).

### Required

| Document / asset | Purpose | Reference |
|------------------|---------|-----------|
| **README** | Product identity, workflow summary, EOS and blueprint links | [Project Governance](./governance/PROJECT_GOVERNANCE.md) |
| **Implementation index** | Ordered work items and deliverable tracking | [Implementation index](../prompts/implementation-index.md) (example) |
| **EOS reference** | Inherited operating system — sync or reference `docs/company/` | [Project Inheritance Model](./PROJECT_INHERITANCE_MODEL.md) |
| **Governance entry point** | Link to [Governance Index](./GOVERNANCE_INDEX.md) | GOVERNANCE-001 |
| **Agent operating standard** | AI collaboration baseline | [Coding Agent Operating Standard](./engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) |
| **Blueprint version marker** | Which blueprint version the repo implements | This document — [Blueprint versioning](#blueprint-versioning) |
| **Site brief or product overview** | What the product is and who it serves | `docs/product/site-brief.md` or equivalent |

### Recommended

| Document / asset | Purpose |
|------------------|---------|
| Architecture overview | Domain boundaries, key systems, data flow |
| Technical overview | Stack, environments, deployment summary |
| Repository standards | Text file hygiene, branch protection, CODEOWNERS |
| Environment strategy | Dev/staging/prod configuration |
| Deployment workflow | Preview → merge → production path |
| Bug triage process | Severity levels and response expectations |
| Release checklist | Pre-production verification |
| Project conventions | Naming, components, file organization |
| Contribution guide | How external or cross-team contributors participate |

### Optional

| Document / asset | Purpose |
|------------------|---------|
| Decision records (ADRs) | Significant architectural decisions |
| Roadmaps | Product or engineering direction |
| Release notes | Per-release change summaries |
| UAT checklists | User acceptance testing when applicable |
| Brand guide | Voice, tone, visual direction |
| Workspace docs | Internal tooling documentation (Aredir Labs repos) |

Documentation maintenance follows [Documentation Maintenance Standard](./documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md). Index updates are part of the definition of done per [Feature Delivery Standard](./playbooks/FEATURE_DELIVERY_STANDARD.md).

---

## Governance blueprint

Governance is **referenced**, not redefined. Repositories inherit the eight-domain framework from GOVERNANCE-001.

### Required governance references

| Reference | Role |
|-----------|------|
| [Governance Index](./GOVERNANCE_INDEX.md) | Entry point to domain governance |
| [Project Inheritance Model](./PROJECT_INHERITANCE_MODEL.md) | How this repo consumes the EOS |
| [Promotion Process](./PROMOTION_PROCESS.md) | Adopt / Extend / Deviate model |
| [Governance Maturity Model](./governance/GOVERNANCE_MATURITY_MODEL.md) | Assess inheritance completeness |

### Inheritance expectations

Repositories **Adopt** company standards by default, **Extend** with documented additions, or **Deviate** with a governed decision log. See [Project Inheritance Model — Inheritance matrix](./PROJECT_INHERITANCE_MODEL.md#inheritance-matrix).

Company-owned assets (`docs/company/`, frameworks, promoted KB) are **synced or referenced** — not forked with parallel maintenance.

### Promotion workflow

Reusable discoveries follow [Knowledge Governance](./governance/KNOWLEDGE_GOVERNANCE.md) and [Promotion Process](./PROMOTION_PROCESS.md). Classify candidates per [Knowledge Artifact Taxonomy](./knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md).

### Ownership boundaries

| Owner | Scope |
|-------|-------|
| **Aredir Labs** | EOS, governance, Knowledge Base, blueprint, template |
| **Repository** | Domain architecture, feature specs, implementation records, product docs |
| **Promotion path** | Repository discoveries → company review → promoted assets |

Full detail: [Project Inheritance Model — Ownership model](./PROJECT_INHERITANCE_MODEL.md#ownership-model).

### Review cadence

| Activity | Cadence |
|----------|---------|
| Promoted asset review | Quarterly (asset owner) |
| EOS / governance sync | On company update or quarterly |
| Maturity assessment | Quarterly or at major milestones |
| Blueprint compliance check | At bootstrap and quarterly |

---

## AI blueprint

AI collaboration expectations are defined here at the **repository level**. Domain rules, pipeline architecture, and evaluation methodology remain in [AI Governance](./governance/AI_GOVERNANCE.md) and promoted AI patterns — do not duplicate them.

### Required

| Expectation | Implementation |
|-------------|----------------|
| **Workspace guidance** | `docs/agent/` with operating standard and prompt templates |
| **Root agent instructions** | `AGENTS.md` or equivalent at repository root |
| **Guarded prompt prefix** | Every implementation prompt includes the coding agent standard |
| **Verification expectations** | Lint, build, and manual QA when behavior changes |
| **Minimal diff discipline** | Agents change only what the task requires |

### Recommended

| Expectation | Implementation |
|-------------|----------------|
| Prompt organization | `docs/prompts/` with numbered, indexed prompts |
| PR review template | Agent and human review checklist |
| Handoff expectations | Deliverable report with verification output |
| Context preservation | Implementation index updated per work item |

### Audit expectations

- AI-assisted changes require the same verification gates as human changes
- Feature prompts document acceptance criteria and verification plan
- AI features follow the intelligence pipeline per [AI Governance](./governance/AI_GOVERNANCE.md)
- Promotion candidates from AI workflow improvements feed the knowledge loop

---

## Quality blueprint

Quality assets implement the **Quality Engineering** capability. Canonical methodology: [QA Engineering Framework](./qa-standards/QA_ENGINEERING_FRAMEWORK.md). Governance detail: [Engineering Governance](./governance/ENGINEERING_GOVERNANCE.md).

### Required

| Asset | Purpose |
|-------|---------|
| **Verification baseline** | Documented commands that must pass (lint, build at minimum) |
| **QA folder** | `docs/qa/` with at least release verification guidance |
| **Bug workflow** | `docs/bugs/` with triage process or template |
| **Definition of done** | Aligned with [Feature Delivery Standard](./playbooks/FEATURE_DELIVERY_STANDARD.md) |

### Recommended

| Asset | Purpose |
|-------|---------|
| Manual QA checklist | User-facing change verification |
| Release checklist | Pre-production gate |
| Known issues register | Operational defect tracking |
| Root cause analysis | For significant defects — [RCA Framework](./qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md) |
| AI evaluation | When product includes AI features — [AI Evaluation Framework](./ai-patterns/AI_EVALUATION_FRAMEWORK.md) |

### CI validation

Repositories should enforce verification baseline in CI when automation is available:

- Lint on pull request
- Build on pull request
- Preview deployment for web applications (when applicable)

CI absence at bootstrap is acceptable; **documented verification commands** are required from day one.

### Production readiness

Before first production deploy:

- Environment variables documented and configured
- Release checklist completed
- Error monitoring planned or configured
- Post-deploy validation defined

Reference: [Company Governance — Release](./governance/COMPANY_GOVERNANCE.md#release-process).

---

## Automation blueprint

Automation assets are **executable** engineering infrastructure. They implement blueprint requirements; they are not substitutes for documentation.

### Documentation vs executable assets

| Type | Examples | Location |
|------|----------|----------|
| **Documentation** | Workflows described in markdown | `docs/engineering/`, `docs/company/playbooks/` |
| **Executable** | CI workflows, hooks, templates | `.github/`, hook config, scripts |

Both must exist. Documentation without automation is acceptable at bootstrap; automation without documentation is not.

### Required executable assets

| Asset | Purpose |
|-------|---------|
| **GitHub issue templates** | Bug reports and feature requests |
| **Pull request template** | Review checklist and verification attestation |
| **Editor config** | UTF-8, LF, consistent indentation (`.editorconfig`) |
| **Git attributes** | Line ending normalization (`.gitattributes`) |

### Recommended executable assets

| Asset | Purpose |
|-------|---------|
| **CI workflows** | Lint, build, test on PR |
| **CODEOWNERS** | Default review assignments |
| **Branch protection** | Require PR and status checks on `main` |
| **Dependabot or equivalent** | Dependency update automation |

### Future automation assets

These are blueprint placeholders — not required at v1.0:

- Bootstrap scripts (repository generator)
- Documentation generators
- Architecture diagram generators
- Release automation workflows
- Compliance audit scripts
- Blueprint version migration tools

Implementations of these assets must conform to this specification, not replace it.

---

## Knowledge blueprint

Knowledge management implements the **Knowledge Management** capability.

### Required

| Asset | Purpose |
|-------|---------|
| **Knowledge registry reference** | Link to company registry (`/workspace/knowledge-assets` for Aredir Labs repos) or [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md) |
| **Implementation index** | Tracks work items and links to deliverables |
| **Promotion awareness** | README or docs reference [Promotion Process](./PROMOTION_PROCESS.md) |

### Recommended

| Asset | Purpose |
|-------|---------|
| Project notes / decision log | Lightweight project memory |
| Promotion candidate tracking | Issues or docs tagged for company review |
| Quarterly review participation | Product lead input to KB review cycle |

### Artifact taxonomy

Classify all repository artifacts per [Knowledge Artifact Taxonomy](./knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md):

- **Company IP** — synced from `docs/company/`
- **Operational docs** — implement company standards locally
- **Product docs** — domain-specific, repository-owned
- **Promotion candidates** — proven reusable discoveries awaiting review
- **Temporary artifacts** — prompts, plan docs, verification records

### Review process

Promotion candidates enter [Knowledge Governance](./governance/KNOWLEDGE_GOVERNANCE.md) lifecycle. Repositories do not elevate local docs to company standards without review.

---

## Project lifecycle blueprint

The lifecycle connects repository structure to the EOS. Full methodology: [Project Inheritance Model](./PROJECT_INHERITANCE_MODEL.md).

```
Repository Creation
        ↓
Blueprint Bootstrap          ← structural compliance (this document)
        ↓
EOS Inheritance              ← sync docs/company/, adopt defaults
        ↓
Development Ready            ← verification baseline passes
        ↓
Active Development           ← feature delivery within standards
        ↓
Release                      ← preview → merge → production validation
        ↓
Maintenance                  ← known issues, dependency updates, sync
        ↓
Knowledge Capture            ← identify promotion candidates
        ↓
Promotion Review             ← feed company Knowledge Base
        ↓
Retirement (when applicable) ← archive docs, document migration
```

| Phase | Blueprint concern |
|-------|-------------------|
| **Repository creation** | Repo exists with correct access and naming |
| **Bootstrap** | All required blueprint zones and assets present |
| **EOS inheritance** | `docs/company/` synced; governance referenced |
| **Development ready** | README, indexes, verification baseline pass |
| **Active development** | Indexes maintained; prompts follow agent standard |
| **Release** | Release checklist; production validation |
| **Maintenance** | EOS sync on company updates; maturity re-assessment |
| **Knowledge capture** | Candidates classified and submitted |
| **Retirement** | Docs archived; registry updated; no orphaned company references |

---

## Compliance blueprint

Every repository should eventually answer **yes** to each compliance question. This becomes the basis for future engineering compliance tooling.

### Compliance checklist

| # | Question | Required evidence |
|---|----------|-------------------|
| 1 | Does documentation exist? | `docs/` tree with README and product overview |
| 2 | Is governance inherited? | `docs/company/` synced; Governance Index linked |
| 3 | Is AI configured? | `docs/agent/`, `AGENTS.md`, guarded prompt prefix |
| 4 | Are standards referenced? | Links to promoted KB assets in README or docs |
| 5 | Is implementation indexed? | `docs/prompts/implementation-index.md` or equivalent |
| 6 | Are architecture docs present? | `docs/architecture/` or `docs/product/` domain docs |
| 7 | Does QA exist? | `docs/qa/`, verification baseline documented |
| 8 | Does CI exist? | CI workflows or documented manual verification |
| 9 | Does release guidance exist? | Release checklist or deployment workflow |
| 10 | Can knowledge be promoted? | Promotion Process referenced; taxonomy understood |
| 11 | Is blueprint version declared? | Version marker in README or dedicated file |

### Compliance levels

| Level | Meaning |
|-------|---------|
| **Bootstrap** | Required items 1–5, 7, 11 present; verification baseline passes |
| **Operational** | All required items; recommended QA and release assets present |
| **Compliant** | Required + recommended; CI enforced; quarterly sync verified |
| **Reference** | Full compliance; active promotion candidates; exemplar for new repos |

Map compliance levels to [Governance Maturity Model](./governance/GOVERNANCE_MATURITY_MODEL.md) levels 2–5.

---

## Blueprint versioning

### Version declaration

Every repository declares its blueprint version. Acceptable locations:

- `README.md` — Engineering section: `Blueprint: v1.0`
- `docs/engineering/blueprint-version.md` — dedicated marker file
- Root `BLUEPRINT_VERSION` file — single line: `1.0`

### Version format

Semantic versioning for the specification itself:

- **Major** — structural zone changes, new required assets, compliance question additions
- **Minor** — new recommended assets, clarified guidance, additional optional zones
- **Patch** — typo fixes, link updates, non-normative clarifications

Current version: **1.0** (EOS-004 initial release).

### Migration policy

- Repositories are **not required to migrate immediately** on minor or patch releases
- Major releases define a **migration window** (typically one quarterly review cycle)
- Repositories below the current major version should document a migration plan or Deviate rationale
- [aredirlabs-com](https://github.com/aredirlabs/aredirlabs-com) always implements the current blueprint version

### Revision history

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-06-25 | Initial blueprint specification (EOS-004) |

---

## Relationship to future work

This specification is the **contract**. The following are **implementations** — they conform to EOS-004 but are not part of it:

| Implementation | Role |
|----------------|------|
| GitHub template repository | Physical scaffold that satisfies blueprint zones |
| Repository generators | CLI or script that creates blueprint-compliant repos |
| Bootstrap scripts | Post-clone configuration automation |
| IDE project templates | Editor-level scaffolding |
| AI-assisted project creation | Agent-driven bootstrap following this spec |
| Compliance audit tooling | Automated checklist against compliance questions |

When an implementation conflicts with this specification, **the specification wins**. Update the implementation, not the contract, unless a formal EOS revision (new work item) is approved.

EOS-003 defines **how to inherit**. EOS-004 defines **what to inherit into**. [IMPLEMENTATION-001 Reference Repository Specification](./REFERENCE_REPOSITORY_SPECIFICATION.md) defines **exactly what exists** in the executable platform.

---

## Maintenance

| Activity | Owner | Cadence |
|----------|-------|---------|
| Blueprint specification review | Aredir Labs engineering lead | Quarterly (with EOS review) |
| Compliance assessment | Product leads | Quarterly or at bootstrap |
| Version increment | Engineering lead | When structural requirements change |
| Implementation conformance | Template maintainers | On each blueprint version release |

---

## Related

- [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md)
- [Project Inheritance Model](./PROJECT_INHERITANCE_MODEL.md)
- [Engineering Capability Model](./ENGINEERING_CAPABILITY_MODEL.md)
- [Governance Index](./GOVERNANCE_INDEX.md)
- [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md)
- [Reference Repository Specification](./REFERENCE_REPOSITORY_SPECIFICATION.md)
- [Future product standards](../architecture/future-product-standards.md)
- [EOS-004 Engineering Blueprint Review](./reviews/EOS_004_ENGINEERING_BLUEPRINT.md)
