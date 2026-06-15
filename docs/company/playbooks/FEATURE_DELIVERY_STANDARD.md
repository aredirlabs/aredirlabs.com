# Feature Delivery Standard

| Field | Value |
|-------|-------|
| **Name** | Feature Delivery Standard |
| **Status** | Promoted Standard |
| **Category** | Playbook |
| **Version** | 1.0 |
| **Owner** | Aredir Labs |
| **Origin Projects** | AlignFit, Aredir Labs |
| **Origin Artifacts** | prompt-001A through prompt-001C, AREDIR-WORKSPACE-001 through AREDIR-WORKSPACE-006, AlignFit UAT delivery cycles, `docs/engineering/deployment-workflow.md`, `docs/prompts/implementation-index.md`, AREDIR-KB-001 through AREDIR-KB-008 |
| **Linked Projects** | Aredir Labs, AlignFit |
| **Reusability** | High |
| **Last Reviewed** | 2026-06-12 |
| **Next Review Due** | 2026-09-12 |

## Purpose

Feature delivery at Aredir Labs should produce **predictable, repeatable outcomes** — not ad hoc sprints where scope, architecture, verification, and documentation diverge from one project to the next.

This playbook is the **operating model** that connects promoted Knowledge Base assets into a single end-to-end workflow from idea through production validation.

**Goal:** Deliver features with understood scope, controlled architecture, verified quality, updated documentation, and captured reusable learnings.

### Common failure modes without a delivery standard

| Failure mode | Impact |
|--------------|--------|
| **Unclear scope** | Work expands mid-implementation; acceptance criteria disputed at merge |
| **Implementation before understanding** | Code changes without audit or current-state map |
| **Architecture drift** | Features bypass promoted patterns and ownership boundaries |
| **Incomplete verification** | Merge with green lint but broken user flows |
| **Missing documentation** | Indexes and architecture docs stale after ship |
| **Release risk** | Production deploy without rollback plan or post-deploy validation |
| **Lessons not captured** | Reusable patterns stay trapped in project repos |

---

## Feature Delivery Lifecycle

```
Idea
    ↓
Architecture Audit
    ↓
Scope Definition
    ↓
Implementation Planning
    ↓
Execution
    ↓
Verification
    ↓
Documentation
    ↓
Release Readiness
    ↓
Production Validation
    ↓
Knowledge Capture
```

### Idea

| | |
|---|---|
| **Purpose** | Capture the problem, opportunity, or request |
| **Expected outputs** | Issue, milestone, or prompt stub with problem statement and success hypothesis |
| **Quality requirements** | Named sponsor; rough size (patch / feature / initiative); linked product |

### Architecture Audit

| | |
|---|---|
| **Purpose** | Understand current state before committing to change — when required |
| **Expected outputs** | Audit deliverables per [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md) (scaled to feature size) |
| **Quality requirements** | Skip only for trivial, isolated changes with no architecture touch; document skip rationale |

### Scope Definition

| | |
|---|---|
| **Purpose** | Bound in-scope / out-of-scope work with acceptance criteria |
| **Expected outputs** | Scope statement, acceptance criteria, affected surfaces, AI/QA implications |
| **Quality requirements** | Explicit exclusions; no ambiguous "improve" without measurable criteria |

### Implementation Planning

| | |
|---|---|
| **Purpose** | Structure work before execution |
| **Expected outputs** | Milestones, work items, implementation prompts, verification plan |
| **Quality requirements** | Incremental steps; each step verifiable independently |

### Execution

| | |
|---|---|
| **Purpose** | Implement scoped change per engineering standards |
| **Expected outputs** | Code/docs diff, branch/PR, preview deployment |
| **Quality requirements** | [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) — minimal diff, no unrequested architecture shifts |

### Verification

| | |
|---|---|
| **Purpose** | Prove the change meets acceptance criteria |
| **Expected outputs** | Automated check results, manual QA evidence, issue updates |
| **Quality requirements** | [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md) gates applied by change type |

### Documentation

| | |
|---|---|
| **Purpose** | Keep project and company knowledge current with the delivery |
| **Expected outputs** | Updated indexes, architecture notes, operational checklists as applicable |
| **Quality requirements** | No merge for structural changes without doc updates listed in plan |

### Release Readiness

| | |
|---|---|
| **Purpose** | Confirm merge/deploy is safe |
| **Expected outputs** | Completed release checklist items; open Blocker/High resolved or deferred with record |
| **Quality requirements** | UAT sign-off when milestone-bound |

### Production Validation

| | |
|---|---|
| **Purpose** | Confirm production health after deploy |
| **Expected outputs** | Post-deploy smoke, critical workflow validation, sign-off |
| **Quality requirements** | Rollback owner identified before deploy |

### Knowledge Capture

| | |
|---|---|
| **Purpose** | Connect delivery work to company intellectual property |
| **Expected outputs** | Knowledge capture decision (see [Knowledge Capture](#knowledge-capture)) |
| **Quality requirements** | Explicit outcome recorded — not assumed "nothing to promote" |

---

## Architecture Phase

Run an architecture audit when the feature touches system topology, data ownership, AI layers, auth, integrations, or shared modules. Scale audit depth to feature risk.

### When an audit is required

| Trigger | Minimum audit |
|---------|----------------|
| New AI user-facing capability | Full ownership + data-flow + AI pattern alignment |
| Schema or API boundary change | Source-of-truth + dependency review |
| Cross-module refactor | Current state + drift assessment |
| Copy/UI-only change in isolated surface | Audit may be skipped — document skip |
| Pre-KB promotion work | Full audit per [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md) |

### Required audit outputs (when audit runs)

Reference [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md):

| Output | Purpose |
|--------|---------|
| **Current state understanding** | Component and workflow baseline |
| **Ownership analysis** | Who owns data, decisions, presentation, persistence |
| **Source-of-truth analysis** | Canonical stores; duplication risks |
| **Risk assessment** | Ranked risks feeding scope and verification plan |

For AI features, additionally validate alignment with:

- [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md)
- [Context Builder Pattern](../ai-patterns/CONTEXT_BUILDER_PATTERN.md)
- [Response Contract Pattern](../ai-patterns/RESPONSE_CONTRACT_PATTERN.md)

Audit recommendations feed **Implementation Planning** — not open-ended rework.

---

## Implementation Planning

Reduce ambiguity before execution.

### Plan components

| Component | Content |
|-----------|---------|
| **Milestones** | Optional grouping for multi-step features (workspace-style IDs or product milestones) |
| **Work items** | Issues, prompts, or tracked KB IDs (e.g. AREDIR-KB-00N) |
| **Implementation prompts** | Guarded prompts with [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) prefix |
| **Acceptance criteria** | Testable conditions for done |
| **Verification requirements** | Which lint/build/DB/QA gates apply per [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md) |

### Planning quality bar

- Each work item has a single verifiable outcome
- Dependencies and order documented
- Out-of-scope items listed explicitly
- AI features: context builder and response contract approach noted before coding
- No execution start until scope and plan reviewed for non-trivial work

---

## Execution Standards

Execution follows the [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md). This playbook does not duplicate that standard — it situates execution in the delivery lifecycle.

### Expectations during execution

| Topic | Requirement |
|-------|-------------|
| **Implementation** | Inspect before changing; extend over replace; match project conventions |
| **Incremental delivery** | Small PRs; one logical change set per merge when possible |
| **Verification ownership** | Executor runs applicable gates before requesting review — not reviewer-only |
| **Completion reporting** | Report what changed, files changed, checks run, pass/fail, manual QA remaining |

### Workflow mapping

The engineering standard's Request → Audit → Design → Implementation → Verification → Documentation → Completion Report maps to this playbook's Architecture Audit through Documentation stages.

Stop and escalate per engineering standard when scope conflicts with architecture or new dependencies seem required.

---

## Verification Standards

Verification follows the [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md). Apply gates by change type before marking execution complete.

### Required verification before completion

| Change type | Minimum gates |
|-------------|----------------|
| **Code quality** | `npm run lint`, `npm run build` (includes typecheck where configured) |
| **Database** | Migration verification; seed validation; idempotent seed when seed logic changed |
| **UI** | Manual QA on preview per `docs/qa/manual-qa-checklist.md`; critical workflows exercised |
| **Production-bound** | Release readiness checklist; deployment verification plan |

### Verification discipline

- Do not claim completion without running and reporting checks
- Regression review for fixes and features touching shared paths
- AI features: unit tests on application layers; contract validation; narrative UAT where applicable

Bug fixes follow the QA framework's bug investigation lifecycle in parallel with this playbook.

---

## Documentation Requirements

Documentation evolves **with** implementation — not after merge unless explicitly deferred with a tracked follow-up.

### Update when applicable

| Doc type | When |
|----------|------|
| **Implementation index** | New prompts or KB work items (`docs/prompts/implementation-index.md`) |
| **Architecture docs** | Routes, boundaries, AI layers, or integrations changed |
| **Feature docs** | User-facing behavior or product scope changed (`docs/product/`) |
| **Operational docs** | Checklists or agent entry points affected (`docs/agent/`, `docs/qa/`, `docs/bugs/`) |
| **KB assets** | Promotion, material update, or linked_projects change (`docs/company/`) |

### Hierarchy rule

Canonical standards live in `docs/company/`. Operational docs implement them. If operational docs conflict with canonical assets, **canonical wins** — update operational docs or document a governed **Deviate** decision per [Promotion Process](../PROMOTION_PROCESS.md).

---

## Release Readiness

Minimum expectations before merge to production-bound branch. Full detail in [QA Engineering Framework — Release Readiness](../qa-standards/QA_ENGINEERING_FRAMEWORK.md#release-readiness-framework).

### Checklist summary

- [ ] Verification complete for change type (code, DB, UI, auth as applicable)
- [ ] Critical workflows validated on preview
- [ ] Documentation updates included or follow-up issue linked
- [ ] Known risks documented (issues, `known-issues.md`, PR notes)
- [ ] Rollback awareness — prior deploy ID and owner identified
- [ ] No open Blocker/High for release scope (unless hotfix path documented)
- [ ] UAT sign-off when milestone release

Use [`docs/qa/release-checklist.md`](../../qa/release-checklist.md) as the operational artifact.

---

## Production Validation

Post-deploy validation per [QA Engineering Framework — Production Verification](../qa-standards/QA_ENGINEERING_FRAMEWORK.md#production-verification-framework):

```
Deploy
    ↓
Smoke Test
    ↓
Critical Workflow Validation
    ↓
Monitoring Review
    ↓
Sign-Off
```

| Stage | Expectation |
|-------|-------------|
| **Deploy** | Production deploy succeeded; commit SHA recorded |
| **Smoke test** | Entry routes return 200; no immediate errors |
| **Critical workflow validation** | Release-scoped journeys exercised on production |
| **Monitoring review** | Logs/analytics spot-check; known issues updated |
| **Sign-off** | Release recorded; team notified |

Reference [`docs/engineering/deployment-workflow.md`](../../engineering/deployment-workflow.md) for pipeline context.

---

## Knowledge Capture

Every non-trivial delivery ends with an explicit knowledge capture decision — connecting project work to the [Knowledge Base](../KNOWLEDGE_BASE_INDEX.md) and [Promotion Process](../PROMOTION_PROCESS.md).

### Questions to ask

- Did we discover a **reusable pattern** worth generalizing?
- Did we **improve** an existing promoted standard (clarification, lesson, edge case)?
- Did we create a **candidate asset** for promotion?
- Should **linked_projects** or operational cross-links update?

### Outcomes

| Outcome | Action |
|---------|--------|
| **No promotion** | Record "no capture" in PR or completion report; no KB change required |
| **Candidate asset** | Draft in project docs or `docs/company/<category>/`; open promotion PR when ready |
| **Existing asset update** | PR updates canonical or operational doc; bump `last_reviewed` / version if material |
| **New promoted asset** | Full [promotion checklist](../PROMOTION_PROCESS.md#promotion-checklist); implementation index entry (e.g. AREDIR-KB-00N) |

AlignFit Coach delivery and AREDIR-KB-001 through KB-008 exemplify the path from repeated project work → audit → promoted company assets.

---

## Relationship to Existing Assets

This playbook **orchestrates** promoted standards — it does not replace them.

```
                    Feature Delivery Standard (this playbook)
                                 │
         ┌───────────────────────┼───────────────────────┐
         ▼                       ▼                       ▼
Architecture Audit      Coding Agent Operating    QA Engineering
Standard                Standard                   Framework
         │                       │                       │
         └───────────┬───────────┴───────────┬───────────┘
                     ▼                       ▼
         AI Intelligence Architecture   Context Builder +
         Pattern                          Response Contract
                     │                       │
                     └───────────┬───────────┘
                                 ▼
                        Promotion Process
                        (Knowledge Capture)
```

| Asset | Role in delivery |
|-------|------------------|
| [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md) | Understand before change; feeds planning |
| [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) | Execution and completion reporting |
| [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md) | Verification, release readiness, production validation |
| [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) | AI feature topology baseline |
| [Context Builder Pattern](../ai-patterns/CONTEXT_BUILDER_PATTERN.md) | Input boundary for AI features |
| [Response Contract Pattern](../ai-patterns/RESPONSE_CONTRACT_PATTERN.md) | Output boundary for AI features |
| [Promotion Process](../PROMOTION_PROCESS.md) | Governance, metadata, adoption, knowledge capture |

Together with governance (lifecycle, review cadence, adoption model), these assets form the **first complete version** of the Aredir Labs operating model.

---

## Future Playbook Candidates

Likely future promotions — **not created in this work item**:

| Candidate | Notes |
|-----------|-------|
| **Release Management Playbook** | Release train, versioning, and communication |
| **Knowledge Asset Promotion Playbook** | Step-by-step promotion workflow for authors |
| **Incident Response Playbook** | Production incident handling and RCA handoff |
| **Product Discovery Playbook** | Upstream of Idea — validation before build |
| **Roadmap Planning Playbook** | Portfolio prioritization across AlignFit, ClassForge, LeagueOS |

**Recommended next work item:** AREDIR-WORKSPACE-008 — **Knowledge Asset Registry** (Governance Registry scope; per [Knowledge Asset Registry Roadmap](../KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md)).

---

## Related

- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [Documentation Maintenance Standard](../documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md)
- [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md)
- [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md)
- [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md)
- [Root Cause Analysis Framework](../qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md)
- [Implementation index](../../prompts/implementation-index.md)
