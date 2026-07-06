# Governance Maturity Model

**Status:** Company Standard  
**Owner:** Aredir Labs  
**Domain:** Governance  
**Work item:** EOS-001  
**Last reviewed:** 2026-06-25  
**Next review due:** 2026-09-12

## Purpose

Provide a practical maturity model for evaluating Aredir Labs projects and repositories. Use this to assess current state, set progression goals, and identify gaps before audits or onboarding.

Part of the [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md).

---

## Maturity levels

| Level | Name | Description |
|-------|------|-------------|
| **1** | Project Conventions | Practices exist but are mostly informal or repo-specific |
| **2** | Documented Standards | Engineering practices are documented and repeatable |
| **3** | Knowledge Governance | Reusable knowledge is captured, reviewed, promoted, versioned, and deprecated |
| **4** | AI-Assisted Engineering | AI agents operate within documented standards, verification rules, and collaboration workflows |
| **5** | Engineering Operating System | Governance, knowledge, architecture, quality, design, and delivery operate as one reusable company methodology |

Levels are **cumulative** — Level 4 requires Level 3 foundations, and so on.

---

## Level 1 — Project Conventions

### Description

The repository has working code and informal team habits, but practices are not consistently documented or enforced across contributors and agents.

### Evaluation criteria

| Criterion | Evidence |
|-----------|----------|
| Codebase builds and deploys | Successful CI or manual build |
| Some conventions exist | README or ad hoc docs mention stack and workflow |
| No canonical company standards | `docs/company/` absent or stale |
| Agent work is ungoverned | No required prompt prefix or operating standard |

### Typical gaps

- Inconsistent PR quality
- Agent sessions produce variable outcomes
- No promotion path for reusable patterns
- Documentation drift

### Progression to Level 2

- Clone or sync Aredir Labs template
- Add operational docs: agent standard, QA checklists, repository standards
- Adopt GitHub templates and `.editorconfig`

---

## Level 2 — Documented Standards

### Description

Engineering practices are written down, repeatable, and followed through at least one delivery cycle.

### Evaluation criteria

| Criterion | Evidence |
|-----------|----------|
| Operational docs present | `docs/agent/`, `docs/qa/`, `docs/engineering/` populated |
| Workflow documented | README describes branch → PR → preview → merge |
| QA checklists used | Release or manual QA completed with checklist reference |
| Repository hygiene enforced | `.editorconfig`, lint, build gates |
| Implementation index exists | Ordered prompts or work items tracked |

### Typical gaps

- Standards exist only in one repo — not promoted to company KB
- No quarterly review or versioning
- Reusable patterns trapped in project docs

### Progression to Level 3

- Sync `docs/company/` from Aredir Labs template
- Begin promotion candidates from proven project work
- Adopt [Promotion Process](../PROMOTION_PROCESS.md)
- Track adoption with Adopt / Extend / Deviate

---

## Level 3 — Knowledge Governance

### Description

Reusable knowledge is a managed company asset with lifecycle, metadata, review cadence, and promotion discipline.

### Evaluation criteria

| Criterion | Evidence |
|-----------|----------|
| Knowledge Base present | `docs/company/` with promoted assets |
| Promotion process followed | Candidates reviewed; metadata complete |
| Registry or index maintained | Knowledge Base Index + registry seed current |
| Quarterly review scheduled | `next_review_due` dates on assets |
| Adoption tracked | `linked_projects` and adoption matrix accurate |
| Taxonomy understood | Artifacts classified per [Knowledge Artifact Taxonomy](../knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md) |

### Typical gaps

- Product repos not syncing `docs/company/` updates
- Adoption claimed without verification
- Operational docs conflict with canonical assets

### Progression to Level 4

- Require [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) for all agent work
- Implement guarded prompt prefix on every implementation prompt
- Add AI evaluation for intelligence features
- Adopt [AI Governance](../governance/AI_GOVERNANCE.md) workflow

---

## Level 4 — AI-Assisted Engineering

### Description

AI agents and human engineers collaborate within documented standards, verification gates, and AI-specific architecture patterns.

### Evaluation criteria

| Criterion | Evidence |
|-----------|----------|
| Agent operating standard adopted | Prompt prefix on all implementation prompts |
| Verification gates enforced | Lint, build, QA evidence in completion reports |
| AI patterns adopted (when applicable) | Context Builder, Response Contract, Evaluation Framework referenced in product AI architecture |
| Workspace-first UX (when applicable) | Intelligence surfaced in workspace, not chat-only |
| No-assumption discipline | Agents audit before modify; no unverified completion claims |
| Architecture audits before major AI work | Audit records or scaled audit in planning docs |

### Typical gaps

- AI Evaluation referenced but not adopted
- Narrative layer changes without regression review
- Product repo `docs/company/` out of sync with Aredir Labs

### Progression to Level 5

- Adopt full [Governance Framework](../GOVERNANCE_INDEX.md) (eight domains)
- Align delivery with [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md)
- Participate in quarterly maturity self-assessment
- Feed promotion candidates routinely from delivery

---

## Level 5 — Engineering Operating System

### Description

Governance, knowledge, architecture, quality, design, and delivery operate as one integrated company methodology — not separate initiatives.

### Evaluation criteria

| Criterion | Evidence |
|-----------|----------|
| EOS entry point linked | README and project docs reference [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md) |
| Governance framework active | Eight domain docs understood and referenced |
| Full delivery loop practiced | Audit → Delivery → QA → Capture → Promotion |
| Maturity model self-assessed | Documented level with evidence |
| Product-specific content bounded | Domain docs in product repo; company IP in `docs/company/` |
| Registry and indexes current | No stale cross-links; implementation index up to date |

### Sustaining Level 5

- Quarterly KB and governance review
- Honest adoption metadata
- New products onboard via template — not custom governance
- ALIGNFIT-GOV-style reviews for promotion candidates — not ad hoc promotion

---

## Current project mapping (2026 Q2–Q3)

Assessment based on repository state, KB adoption matrix, and GOVERNANCE-001 / EOS-001 reviews. Re-assess at Q3 quarterly review (2026-09-12).

| Project | Level | Evidence summary |
|---------|-------|------------------|
| **Aredir Labs** (aredirlabs.com) | **5** | EOS + governance framework; 14 promoted assets; registry live (WORKSPACE-008); maturity model and taxonomy established |
| **AlignFit** | **4** (approaching 5) | Adopted AI, QA, and agent standards; origin of most KB assets; product domain docs local; direct repo sync not verified in GOVERNANCE-001 |
| **ClassForge** | **2–3** | Template inheritance; agent standard adopted; KB adoption planned |
| **LeagueOS** | **2–3** | Template inheritance; agent standard adopted; KB adoption planned |

### AlignFit detail

AlignFit qualifies for Level 4 based on adoption matrix data (AI patterns, QA framework, Coding Agent Standard). Level 5 requires confirmed `docs/company/` sync with Aredir Labs and EOS operational integration — **recommended follow-up: direct AlignFit repo audit**.

AlignFit remains the **proving ground**, not the governance owner. Company standards live in Aredir Labs regardless of where patterns were first proven.

---

## How future projects should progress

```
New product cloned from template
         ↓
Level 2 immediately (template provides operational docs)
         ↓
Level 3 within first major release (sync docs/company/, first promotion candidate review)
         ↓
Level 4 when AI features or agent-driven delivery begins
         ↓
Level 5 when product participates in full EOS loop with honest adoption metadata
```

**Minimum for production:** Level 2 with path to Level 3 documented.

**Minimum for AI features:** Level 4.

---

## Assessment procedure

1. **Self-assess** against criteria for target level — collect evidence links, not assertions
2. **Identify gaps** — lowest unmet criterion determines current level
3. **Document** assessment in project notes or quarterly review record
4. **Plan progression** — specific work items with owners and dates
5. **Re-assess** at quarterly KB review or major milestone

Keep assessments practical — a checklist of evidence, not a theoretical maturity framework.

---

## Related

- [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md)
- [Governance Index](../GOVERNANCE_INDEX.md)
- [Knowledge Governance](./KNOWLEDGE_GOVERNANCE.md)
- [Knowledge Artifact Taxonomy](../knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md)
- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
