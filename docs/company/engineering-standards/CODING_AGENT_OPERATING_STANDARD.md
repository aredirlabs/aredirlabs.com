# Coding Agent Operating Standard

| Field | Value |
|-------|-------|
| **Name** | Coding Agent Operating Standard |
| **Status** | Promoted Standard |
| **Category** | Engineering Standard |
| **Version** | 1.0 |
| **Owner** | Aredir Labs |
| **Origin Projects** | Aredir Labs, AlignFit, ClassForge, LeagueOS |
| **Origin Artifacts** | prompt-001A-foundation, `docs/agent/coding-agent-operating-standard.md`, `docs/engineering/repository-standards.md`, AREDIR-WORKSPACE-001 through AREDIR-WORKSPACE-006 |
| **Linked Projects** | Aredir Labs, AlignFit, ClassForge, LeagueOS |
| **Reusability** | High |
| **Last Reviewed** | 2026-06-12 |
| **Next Review Due** | 2026-09-12 |

## Purpose

Coding agents (AI-assisted implementers) can move quickly through codebases, but speed without guardrails produces unreliable outcomes. This standard defines **operational rules** for agent-driven engineering across all Aredir Labs repositories and products.

**Goal:** Create repeatable, verifiable engineering outcomes — not merely fast diffs.

### Why guardrails are required

Agents lack persistent project memory, implicit team conventions, and accountability unless the workflow enforces them. Without a standard, the same request produces inconsistent quality across runs, repos, and products.

### Common failures without a standard

| Failure | Impact |
|---------|--------|
| **Incomplete implementation** | Stated requirements partially met; edge cases ignored |
| **Undocumented assumptions** | Decisions buried in code or chat, lost after the session |
| **Skipped verification** | "Done" reported without running lint, build, or QA |
| **Hidden architectural drift** | New patterns, dependencies, or abstractions introduced silently |
| **Poor documentation updates** | Indexes, READMEs, and standards left stale after code changes |
| **Misleading completion reports** | Success claimed when checks failed or were never run |

This standard addresses those failures with explicit principles, workflow stages, verification gates, and reporting requirements.

### Applicability

Required for all agent-driven implementation work in:

- **Aredir Labs** (aredirlabs.com template and workspace)
- **AlignFit**
- **ClassForge**
- **LeagueOS**
- **Future Aredir Labs products** cloned from or aligned with this template

Operational copy for day-to-day prompts also lives at [`docs/agent/coding-agent-operating-standard.md`](../../agent/coding-agent-operating-standard.md). This document is the **canonical promoted standard** in the [Knowledge Base](../KNOWLEDGE_BASE_INDEX.md).

---

## Core Principles

### Understand Before Modifying

Agents must read relevant files, architecture docs, and the active prompt **before** writing code.

- Inspect files that will be touched and note existing patterns
- Read `docs/architecture/`, `docs/engineering/`, and product-specific docs as applicable
- Confirm scope: only change what the work item requires

**Anti-pattern:** Implementing from general training data instead of the actual repository.

### Respect Existing Architecture

Prefer **extension over replacement**. Avoid unnecessary rewrites.

- Extend existing components rather than creating parallel implementations
- Use existing design tokens, utilities, and UI primitives
- Do not refactor unrelated code "while you're here"
- Do not delete or rename routes, env vars, or public APIs without explicit instruction
- Do not introduce new libraries, architecture patterns, or dependencies unless explicitly requested

**Anti-pattern:** Replacing a stable subsystem because a different approach is familiar.

### Verification Required

Claims must be validated. **Implementation is not complete until verification succeeds** (or limitations are explicitly documented).

- Run applicable automated checks before reporting completion
- Report actual command output — not assumed results
- Do not claim success when checks were skipped or failed

**Anti-pattern:** "Should work" or "lint/build presumably pass."

### Documentation Ownership

Documentation must evolve **alongside** implementation — not as an afterthought.

- Update indexes, cross-links, and related docs when behavior or structure changes
- Document non-obvious decisions in the appropriate `docs/` location
- For documentation-only work items, treat the docs as the deliverable with the same verification discipline

**Anti-pattern:** Code merged with no update to implementation index, README, or standards that reference the change.

### Transparent Reporting

Agents must accurately report:

| Report element | Requirement |
|----------------|-------------|
| **Changes** | What behavior or scope changed |
| **Files changed** | Complete list of paths touched |
| **Verification** | Commands run and pass/fail results |
| **Limitations** | What was not verified or not in scope |
| **Unresolved issues** | Known failures, follow-ups, or manual QA still required |

**Anti-pattern:** Summaries that omit failed checks or overstate completeness.

### Incremental Delivery

Favor **small, verifiable improvements** over large speculative rewrites.

- Minimal diff: solve the stated problem with the smallest correct change
- Match naming, file layout, and patterns documented in project conventions
- Preserve routing, styling, accessibility, content structure, and existing UX unless the work item explicitly changes them

**Anti-pattern:** Broad "cleanup" or architecture migrations bundled with unrelated feature work.

---

## Standard Workflow

Recommended lifecycle for agent-driven work:

```
Request
   ↓
Audit
   ↓
Design
   ↓
Implementation
   ↓
Verification
   ↓
Documentation
   ↓
Completion Report
```

### Request

| | |
|---|---|
| **Purpose** | Establish clear scope, constraints, and success criteria |
| **Expected outputs** | Work item or prompt with explicit in-scope / out-of-scope boundaries |
| **Quality requirements** | References this standard; includes verification expectations; no ambiguous "make it better" without criteria |

### Audit

| | |
|---|---|
| **Purpose** | Understand current state before changing anything |
| **Expected outputs** | List of files and docs reviewed; noted conventions; identified risks or conflicts |
| **Quality requirements** | Existing architecture and standards read; scope confirmed against request; escalation triggered if prompt conflicts with standards |

### Design

| | |
|---|---|
| **Purpose** | Plan the smallest correct approach before coding |
| **Expected outputs** | Brief approach (mental or written): what to extend, what to add, what to avoid |
| **Quality requirements** | No new dependencies or architectural shifts unless requested; approach respects incremental delivery |

### Implementation

| | |
|---|---|
| **Purpose** | Execute the scoped change in code or docs |
| **Expected outputs** | Focused diff aligned with project conventions |
| **Quality requirements** | Components remain small and single-purpose; behavior preserved unless explicitly changed; no unrelated refactors |

### Verification

| | |
|---|---|
| **Purpose** | Prove the change meets quality gates |
| **Expected outputs** | Command results (lint, build, typecheck, DB, QA as applicable) |
| **Quality requirements** | All applicable gates run; failures fixed or explicitly reported as unresolved |

See [Verification Standards](#verification-standards) below.

### Documentation

| | |
|---|---|
| **Purpose** | Keep project knowledge current with the change |
| **Expected outputs** | Updated docs, indexes, or cross-links when the work item requires it |
| **Quality requirements** | No stale references; promoted assets updated per [Promotion Process](../PROMOTION_PROCESS.md) when applicable |

### Completion Report

| | |
|---|---|
| **Purpose** | Give reviewers an honest, complete picture of what was delivered |
| **Expected outputs** | Structured report (see [Required completion report](#required-completion-report)) |
| **Quality requirements** | Success not claimed unless verification succeeded; limitations and manual QA called out |

---

## Required Prompt Prefix

All implementation prompts in Aredir Labs repositories must begin with:

```
You are working inside an existing production-bound Next.js application.

Before coding, read docs/agent/coding-agent-operating-standard.md and follow it strictly.

Do not make broad rewrites.
Do not introduce new libraries, architecture, patterns, or dependencies unless explicitly requested.
Inspect existing files and conventions first.
Preserve routing, styling, accessibility, content structure, and existing behavior unless this prompt explicitly changes them.
```

New products may reference this Knowledge Base asset path once `docs/company/` is present in the repo.

---

## Verification Standards

Minimum expectations by change type. Run what applies; document what was skipped and why.

### Code Changes

**Expected when applicable:**

```bash
npm run lint
npm run build
```

Typecheck runs as part of `npm run build` in Next.js projects using this template.

| Gate | When required |
|------|----------------|
| **lint** | Any code or config change that ESLint covers |
| **build** | Any change that could affect compilation, routes, or types |
| **typecheck** | Covered by build; run standalone only if project defines it |

### Database Changes

**Expected when applicable:**

```bash
npm run db:push
npm run db:seed
```

| Gate | When required |
|------|----------------|
| **Migration verification** | Schema or migration scripts changed |
| **Seed verification** | Seed data or seed logic changed; run seed twice when idempotency matters |

### UI Changes

**Expected when applicable:**

- Manual QA per [`docs/qa/manual-qa-checklist.md`](../../qa/manual-qa-checklist.md)
- Screenshots or recording where appropriate for visual or interaction changes
- Accessibility spot-check for user-facing components

### Production Changes

**Expected when applicable:**

- Deployment checklist per [`docs/engineering/deployment-workflow.md`](../../engineering/deployment-workflow.md)
- Environment variable and secrets review per [`docs/engineering/environment-strategy.md`](../../engineering/environment-strategy.md)
- **Rollback awareness** — know how to revert or disable before deploying
- UAT per [`docs/qa/uat-checklist.md`](../../qa/uat-checklist.md) for release-bound work
- Preview deployment validation before merge when available

### Documentation Changes

**Expected when applicable:**

- Link integrity (no broken relative paths)
- `npm run lint` and `npm run build` for repos where docs live alongside the app (must not break the project)

---

## Required Completion Report

When work is complete, report:

| Section | Content |
|---------|---------|
| **What changed** | Brief summary of behavior and scope |
| **Files changed** | List of paths |
| **Checks run** | Commands executed |
| **Passed checks** | Which succeeded |
| **Failed checks** | Which failed, with relevant output |
| **Manual QA still required** | Items not covered by automated checks |

**Do not claim success unless checks have been run and results are reported honestly.**

---

## Escalation

Stop and ask (or document in the PR) when:

- The prompt conflicts with existing architecture or standards
- A new dependency seems necessary but was not requested
- Fixing the issue requires broad refactors or breaking changes
- Requirements are ambiguous for user-facing or accessibility-critical behavior

---

## Common Agent Failure Modes

Anti-patterns to avoid. Reviewers should reject work that exhibits these without documented exception.

| Failure mode | Description |
|--------------|-------------|
| **Reporting work not completed** | Marking tasks done when requirements are partially implemented |
| **Skipping verification** | No lint/build/QA run, or results not reported |
| **Introducing architecture drift** | New patterns, folders, or dependencies outside scope |
| **Implementing beyond requested scope** | Extra features, refactors, or "improvements" not in the work item |
| **Replacing stable systems unnecessarily** | Rewriting working code instead of extending it |
| **Creating hidden technical debt** | TODOs, commented-out code, or partial migrations left un documented |
| **Misleading completion reports** | Claiming all checks passed when they were not run |
| **Stale documentation** | Indexes and standards not updated after structural changes |
| **Assumption-driven implementation** | Guessing API shapes, env vars, or conventions without reading the repo |

---

## Relationship to Knowledge Base

This asset is the **first promoted Engineering Standard** in the Aredir Labs Knowledge Base.

| Resource | Role |
|----------|------|
| [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md) | Category structure and governance |
| [Promotion Process](../PROMOTION_PROCESS.md) | How project artifacts become company assets |
| [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) | Complementary architecture standard for AI systems |
| [`docs/agent/coding-agent-operating-standard.md`](../../agent/coding-agent-operating-standard.md) | Operational entry point in product repos |
| [Implementation index](../../prompts/implementation-index.md) | Tracked work items including KB promotions |

Together with AREDIR-KB-001, this promotion validates that the Knowledge Base model works across **multiple asset categories** (Architecture Patterns and Engineering Standards).

---

## Related Documentation

- [Guarded prompt template](../../agent/guarded-prompt-template.md)
- [PR review template](../../agent/pr-review-template.md)
- [Repository standards](../../engineering/repository-standards.md)
- [Project conventions](../../architecture/project-conventions.md)
- [Future product standards](../../architecture/future-product-standards.md)
- [Manual QA checklist](../../qa/manual-qa-checklist.md)

---

## Candidate Follow-On Assets

Likely future promotions from existing project documentation. **Not created in this work item** — listed for Knowledge Base roadmap planning.

| Candidate | Category | Notes |
|-----------|----------|-------|
| [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md) | QA Standard | Promoted — unified verification framework |
| [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md) | Documentation Standard | Promoted — system evaluation before change |
| [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md) | Playbook | Promoted — end-to-end delivery operating model |
| [Documentation Maintenance Standard](./documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md) | Documentation Standard | Promoted — doc sync and drift prevention |
| [Root Cause Analysis Framework](./qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md) | QA Standard | Promoted — evidence-based investigation |
| **AI Evaluation Framework** | AI Pattern | Regression and quality measurement for AI features |

**Recommended next work item:** AREDIR-WORKSPACE-008 — **Knowledge Asset Registry** (Governance Registry scope; per [Knowledge Asset Registry Roadmap](../KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md)).
