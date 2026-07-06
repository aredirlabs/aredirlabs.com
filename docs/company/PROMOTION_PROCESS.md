# Asset Promotion Process

**Status:** Company Standard  
**Owner:** Aredir Labs  
**Last reviewed:** 2026-06-12  
**Next review due:** 2026-09-12

## Purpose

Define how project artifacts become **Aredir Labs company assets** in the Knowledge Base. Projects generate implementations; promotion extracts durable, reusable intellectual property.

## Principles

1. **Projects stay authoritative for code** — promoted assets reference origin artifacts but do not fork implementation.
2. **Promotion is intentional** — not every good doc or prompt becomes a company asset.
3. **Reuse is the bar** — if it only applies to one feature, it stays in the project.
4. **Metadata is mandatory** — promoted assets must be searchable, owned, and reviewable.

---

## Asset Lifecycle

```
Project Artifact
       ↓
Candidate Asset
       ↓
Review
       ↓
Promoted Asset
       ↓
Company Standard
```

### Project Artifact

Any durable output from project work: architecture notes, decision logs, QA frameworks, prompt templates, deployment runbooks, or pattern docs. Lives in the project repository or workspace memory.

### Candidate Asset

A project artifact identified as potentially reusable. Someone (owner or tech lead) opens a promotion request with:

- Proposed name and category
- Origin project and artifact references
- Evidence of successful use
- Draft doc in `docs/company/<category>/` or PR against aredirlabs.com

### Review

Reviewers confirm:

- Meets [promotion requirements](#promotion-requirements) below
- Required metadata is complete
- Content is generalized (no project-only leakage)
- Index and cross-links updated

Review outcome: **Promote**, **Revise**, or **Defer** (stay in project).

### Promoted Asset

Published in the Knowledge Base with status **Promoted Standard** (or category-appropriate status). Listed in [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md).

### Company Standard

A promoted asset that has been:

- Adopted by default in two or more products or repos, **or**
- Referenced as required in agent operating standards, onboarding, or release gates

Status updates to **Company Standard**. Older versions may be marked **Superseded** with a link to the replacement.

Asset **status** values, review cadence, adoption rules, and documentation hierarchy are defined in [Knowledge Asset Governance](#knowledge-asset-governance).

---

## Knowledge Asset Governance

How Aredir Labs manages promoted Knowledge Base assets over time: ownership, versioning, review, adoption, deprecation, and supersession.

Prevents asset drift, outdated standards, inconsistent adoption, duplicate patterns, and unclear ownership as the library grows.

### Asset lifecycle states

Metadata **status** values. These align with the [promotion lifecycle](#asset-lifecycle) above.

#### Candidate

| | |
|---|---|
| **Purpose** | Potential reusable asset identified from project work; not yet authoritative |
| **Entry criteria** | Documented project artifact; reuse hypothesis; named sponsor |
| **Exit criteria** | Promotion request opened → **Reviewing**; or rejected → remains in project only |

#### Reviewing

| | |
|---|---|
| **Purpose** | Asset under active promotion evaluation |
| **Entry criteria** | Draft in `docs/company/<category>/` or promotion PR open; promotion checklist started |
| **Exit criteria** | Approved → **Promoted Standard**; needs revision → **Candidate**; deferred → stays in project |

#### Promoted Standard

| | |
|---|---|
| **Purpose** | Approved company asset available for adoption across products |
| **Entry criteria** | Passes [promotion requirements](#promotion-requirements); complete metadata; indexed in [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md) |
| **Exit criteria** | Adopted broadly or mandated → **Company Standard**; obsolete → **Deprecated**; replaced → **Superseded** |

#### Company Standard

| | |
|---|---|
| **Purpose** | Default standard across multiple products or required in operating workflows |
| **Entry criteria** | Adopted in two or more product repos **or** referenced as required in agent standards, onboarding, or release gates |
| **Exit criteria** | Replaced → **Superseded**; retired → **Deprecated** |

#### Deprecated

| | |
|---|---|
| **Purpose** | No longer recommended for new work; retained for reference |
| **Entry criteria** | Engineering lead decision; superseding asset not yet available, or pattern obsolete |
| **Exit criteria** | Successor published → **Superseded**; archived per policy |

#### Superseded

| | |
|---|---|
| **Purpose** | Replaced by a newer asset; historical reference only |
| **Entry criteria** | Newer asset published; `superseded_by` link added |
| **Exit criteria** | Remains archived; no further transitions |

---

### Required metadata

Every promoted asset must include this metadata block at the top of the document (markdown table or equivalent):

```yaml
name:
category:
version:
status:
owner:
origin_project:
origin_artifacts:
linked_projects:
reusability:
last_reviewed:
next_review_due:
```

| Field | Purpose |
|-------|---------|
| **name** | Canonical asset name; matches index and cross-links |
| **category** | Promotion category (Architecture Pattern, Engineering Standard, QA Standard, AI Pattern, etc.) |
| **version** | Semver for substantive content changes (e.g. `1.0`, `1.1`); bump on breaking or material updates |
| **status** | Lifecycle state: Candidate, Reviewing, Promoted Standard, Company Standard, Deprecated, Superseded |
| **owner** | Responsible party for maintenance and review (e.g. `Aredir Labs`) |
| **origin_project** | Project where the asset was first proven |
| **origin_artifacts** | Source artifact IDs or paths (e.g. `COACH-ARCH-001`, `prompt-001A-foundation`) |
| **linked_projects** | Products that adopt, extend, or deviate from the asset — see [Linked projects](#linked-projects) |
| **reusability** | `Low`, `Medium`, or `High` — expected cross-product applicability |
| **last_reviewed** | ISO date of last substantive governance or content review |
| **next_review_due** | ISO date when review is due per [review cadence](#review-cadence) |

Optional when applicable: **superseded_by** (link to replacement asset).

### Example metadata block

```markdown
| Field | Value |
|-------|-------|
| **Name** | AI Intelligence Architecture Pattern |
| **Status** | Promoted Standard |
| **Category** | Architecture Pattern |
| **Version** | 1.0 |
| **Owner** | Aredir Labs |
| **Origin Projects** | AlignFit |
| **Origin Artifacts** | COACH-ARCH-001, COACH-INTEL-001, COACH-INTEL-002, COACH-INTEL-003 |
| **Linked Projects** | AlignFit, ClassForge, LeagueOS, Aredir Labs |
| **Reusability** | High |
| **Last Reviewed** | 2026-06-12 |
| **Next Review Due** | 2026-09-12 |
```

---

### Review cadence

**Quarterly review cycle** for all assets with status **Promoted Standard** or **Company Standard**.

| Quarter | Focus |
|---------|--------|
| Q1 (Jan–Mar) | Architecture Patterns + AI Patterns |
| Q2 (Apr–Jun) | Engineering Standards + Documentation Standards |
| Q3 (Jul–Sep) | QA Standards + Deployment Standards |
| Q4 (Oct–Dec) | Full index audit; promotion backlog; supersession candidates |

**Minimum each review:**

- Confirm asset is still accurate and relevant
- Update `last_reviewed` and `next_review_due` (next quarter end or +90 days)
- Validate `linked_projects` reflects current adoption
- Identify assets to deprecate or supersede
- Fix broken cross-links and stale operational references

| Responsibility | Owner |
|----------------|--------|
| Schedule and facilitate reviews | Aredir Labs (engineering lead) |
| Category review execution | Asset owner |
| Index and metadata updates | Author of review PR |
| Adoption confirmation | Product leads per linked project |

Assets past **next_review_due** without review should be flagged in the [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md) governance section until updated.

---

### Project adoption model

Projects interact with promoted assets in one of three modes:

| Mode | Definition | Documentation requirement |
|------|------------|---------------------------|
| **Adopt** | Uses the standard unchanged; operational docs reference canonical asset | Note adoption in project `docs/` or README; add project to asset `linked_projects` |
| **Extend** | Uses the standard plus project-specific additions that do not contradict the canonical standard | Document extensions in `docs/product/` or `docs/architecture/`; link to canonical asset |
| **Deviate** | Intentionally differs from the standard | **Required:** decision log entry with rationale, scope, and review date; add project to `linked_projects` with deviation noted in promotion index or project docs |

Deviations must not silently drift. Undocumented deviation is treated as technical debt.

New products cloned from the Aredir Labs template **Adopt** Engineering and QA standards by default unless a documented **Deviate** decision exists.

---

### Linked projects

```yaml
linked_projects:
  - AlignFit
  - ClassForge
  - LeagueOS
  - Aredir Labs
```

**Purpose:** Identify which products use, extend, or deviate from an asset.

Supports:

- **Dependency tracking** — know which repos need updates when an asset is superseded
- **Adoption metrics** — progress toward **Company Standard** status
- **Review scope** — product leads for linked projects participate in quarterly review
- **Impact analysis** — deprecation and breaking version bumps trigger linked-project notification

Update `linked_projects` when a product adopts, extends, or deviates. Remove only when a product retires the feature domain entirely (document why).

---

### Documentation hierarchy

| Tier | Location | Role |
|------|----------|------|
| **Canonical** | `docs/company/` | Source of truth for promoted company intellectual property |
| **Operational** | `docs/agent/`, `docs/qa/`, `docs/bugs/`, `docs/engineering/`, `docs/architecture/`, project `docs/product/` | Day-to-day checklists, templates, and product-specific implementation |

**Rules:**

- Operational documentation **implements** a canonical standard; it does not redefine it.
- Operational docs should link upward to the canonical asset when one exists.
- If operational and canonical guidance **conflict**, **canonical wins**. Fix operational docs or file a governed **Deviate** decision.
- Project-specific schemas, routes, and test cases stay in project repos — not in `docs/company/`.

Example: [`docs/agent/coding-agent-operating-standard.md`](../agent/coding-agent-operating-standard.md) is operational; [Coding Agent Operating Standard](./engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) is canonical.

---

### Future governance candidates

Documentation-only possibilities — **not built in this work item**:

| Candidate | Purpose |
|-----------|---------|
| **Knowledge Asset Registry** | Machine-readable index of all promoted assets and metadata |
| **Asset Review Dashboard** | Visibility into review due dates and overdue assets |
| **Promotion Workflow** | Standardized PR template and checklist automation for promotions |
| **Asset Dependency Mapping** | Graph of linked projects and operational doc dependencies per asset |

---

## Asset status states (quick reference)

See [Asset lifecycle states](#asset-lifecycle-states) for full entry/exit criteria.

| Status | Summary |
|--------|---------|
| **Candidate** | Potential reusable asset |
| **Reviewing** | Under evaluation |
| **Promoted Standard** | Approved and available for adoption |
| **Company Standard** | Widely adopted or mandated |
| **Deprecated** | No longer recommended |
| **Superseded** | Replaced by a newer asset |

---

## Promotion Requirements

An asset should **generally** meet all of the following before promotion:

| Requirement | Description |
|-------------|-------------|
| **Documented** | Clear purpose, scope, and usage; not only code comments or chat logs |
| **Successfully implemented** | Proven in a real system, not theoretical only |
| **Validated through real usage** | Exercised in UAT, production, or repeated agent runs with acceptable results |
| **Reusable across multiple projects** | Adaptable to AlignFit, ClassForge, LeagueOS, or future products without rewrite |
| **Clear ownership** | Named owner (team or role) for maintenance and review |
| **Measurable value** | Reduces defects, tokens, time, inconsistency, or onboarding cost |

Exceptions require explicit review notes (e.g., strategic standards adopted before second project).

---

## Required Metadata

Every promoted asset must include the metadata block defined in [Knowledge Asset Governance — Required metadata](#required-metadata). At minimum:

| Field | Description |
|-------|-------------|
| **name** | Canonical asset name |
| **category** | Promotion category |
| **version** | Semver (e.g. `1.0`) |
| **status** | Lifecycle state |
| **owner** | Responsible party |
| **origin_project** | Project where first proven |
| **origin_artifacts** | Source artifact IDs or paths |
| **linked_projects** | Products using the asset |
| **reusability** | Low, Medium, or High |
| **last_reviewed** | ISO date |
| **next_review_due** | ISO date per quarterly cadence |

See [example metadata block](#example-metadata-block) in Knowledge Asset Governance.

---

## Promotion Categories

| Category | Knowledge Base location | Typical content |
|----------|-------------------------|-----------------|
| **Architecture Pattern** | `docs/company/architecture-patterns/` | System topology, layers, ownership boundaries |
| **Engineering Standard** | `docs/company/engineering-standards/` | Coding, repo, agent, and delivery conventions |
| **QA Standard** | `docs/company/qa-standards/` | Checklists, triage, release gates |
| **AI Pattern** | `docs/company/ai-patterns/` | Prompt, eval, and model-use patterns |
| **Playbook** | `docs/company/playbooks/` | Discovery, delivery, launch workflows |
| **Prompt Asset** | `docs/company/prompt-library/` | Governed reusable prompts |
| **Documentation Standard** | `docs/company/documentation-standards/` | Doc structure, indexes, audit criteria |

---

## Promotion checklist

Use this when submitting a candidate for review:

- [ ] Asset meets promotion requirements (or exception documented)
- [ ] All [required metadata](#required-metadata) fields present (including `linked_projects`, `next_review_due`)
- [ ] Content generalized; project-specific paths and schemas removed or abstracted
- [ ] Added under correct `docs/company/<category>/` path
- [ ] [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md) updated (category examples / links)
- [ ] [Implementation index](../prompts/implementation-index.md) updated if promotion was driven by a tracked work item
- [ ] Related project artifacts cross-reference the promoted asset ID
- [ ] `npm run lint` and `npm run build` pass (documentation-only changes should not break the repo)

---

## Deprecation and supersession

When an asset is replaced:

1. Set **status** to `Superseded`
2. Add **superseded_by** link to the new asset
3. Update index and any standards that mandate the old asset
4. Keep the old file for history; do not delete without archive policy approval

---

## Related

- [Engineering Operating System](./ENGINEERING_OPERATING_SYSTEM.md)
- [Governance Index](./GOVERNANCE_INDEX.md)
- [Knowledge Artifact Taxonomy](./knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md)
- [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md)
- [AI Intelligence Architecture Pattern](./architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) — first promoted architecture asset
- [Workspace-First AI Experience Pattern](./architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md) — workspace surfaces over chat-first AI
- [Coding Agent Operating Standard](./engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) — first promoted Engineering Standard
- [QA Engineering Framework](./qa-standards/QA_ENGINEERING_FRAMEWORK.md) — first promoted QA Standard
- [Root Cause Analysis Framework](./qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md) — investigation and permanent resolution
- [Context Builder Pattern](./ai-patterns/CONTEXT_BUILDER_PATTERN.md) — first promoted AI Pattern
- [Response Contract Pattern](./ai-patterns/RESPONSE_CONTRACT_PATTERN.md) — AI output boundary standard
- [Human + AI Advisor Workspace Pattern](./ai-patterns/HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md) — shared advisor workspace collaboration
- [Evidence-Aware AI Advisor Pattern](./ai-patterns/EVIDENCE_AWARE_AI_ADVISOR_PATTERN.md) — evidence communication, uncertainty, and knowledge evolution
- [Evidence Lifecycle Pattern](./knowledge-patterns/EVIDENCE_LIFECYCLE_PATTERN.md) — observation-to-knowledge lifecycle and organizational learning
- [Architecture Audit Standard](./documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md) — first promoted Documentation Standard
- [Documentation Maintenance Standard](./documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md) — doc sync and drift prevention
- [Feature Delivery Standard](./playbooks/FEATURE_DELIVERY_STANDARD.md) — end-to-end delivery playbook
- [Knowledge Base Roadmap](./KNOWLEDGE_BASE_ROADMAP.md)
- [KB Review 2026 Q2](./reviews/KB_REVIEW_2026_Q2.md)
- [Coding agent operating standard](../agent/coding-agent-operating-standard.md) — operational entry point in product repos
