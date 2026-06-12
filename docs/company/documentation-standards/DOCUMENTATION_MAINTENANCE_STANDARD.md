# Documentation Maintenance Standard

| Field | Value |
|-------|-------|
| **Name** | Documentation Maintenance Standard |
| **Status** | Promoted Standard |
| **Category** | Documentation Standard |
| **Version** | 1.0 |
| **Owner** | Aredir Labs |
| **Origin Projects** | AlignFit, Aredir Labs |
| **Origin Artifacts** | AREDIR-KB-008 (KB Review 2026 Q2), AREDIR-KB-008A (hygiene cleanup), README / `future-product-standards.md` discoverability gaps, stale recommendation findings, [Promotion Process](../PROMOTION_PROCESS.md) documentation hierarchy |
| **Linked Projects** | AlignFit, ClassForge, LeagueOS, Aredir Labs |
| **Reusability** | High |
| **Last Reviewed** | 2026-06-12 |
| **Next Review Due** | 2026-09-12 |

## Purpose

Documentation maintenance is an **engineering responsibility**, not a post-merge afterthought or documentation-team-only activity. Code, behavior, and standards change; documentation must change with them or it becomes untrustworthy.

AREDIR-KB-008 identified documentation synchronization as the largest remaining operational gap. AREDIR-KB-008A resolved immediate discoverability and stale-reference issues. This standard **formalizes the process** so those problems do not recur.

**Goal:** Trustworthy documentation that evolves with implementation — synchronized across code, project docs, operational docs, and canonical Knowledge Base assets.

### Common failure modes without maintenance discipline

| Failure mode | Impact |
|--------------|--------|
| **Stale documentation** | Readers follow outdated steps; agents implement against wrong assumptions |
| **Undocumented behavior changes** | Only code reflects truth; onboarding and QA miss new behavior |
| **Conflicting documentation** | Operational and canonical docs disagree; teams pick whichever they find first |
| **Orphaned standards** | Promoted assets exist but entry points (README, indexes) never link them |
| **Broken discoverability** | Contributors cannot find `docs/company/` or related assets |
| **Outdated recommendations** | “Recommended next” sections reference completed work items |
| **Inaccurate onboarding information** | New products clone template without KB carry-forward |

---

## Documentation Hierarchy

Formal three-tier model. Defined in [Promotion Process — Documentation hierarchy](../PROMOTION_PROCESS.md#documentation-hierarchy); expanded here for maintenance obligations.

```
Canonical Documentation
         ↓
Operational Documentation
         ↓
Implementation Documentation
```

### Canonical

| | |
|---|---|
| **Location** | `docs/company/` |
| **Role** | Defines company standards, patterns, playbooks, and governance |
| **Examples** | Knowledge Base Index, Promotion Process, promoted assets |
| **Maintenance owner** | Asset owner (Aredir Labs); updated via promotion PRs and quarterly review |

### Operational

| | |
|---|---|
| **Location** | `docs/agent/`, `docs/qa/`, `docs/bugs/`, `docs/engineering/`, `docs/architecture/` (non-company) |
| **Role** | Implements canonical standards in day-to-day checklists, templates, and workflows |
| **Examples** | Coding agent operating standard (operational copy), manual QA checklist, deployment workflow |
| **Maintenance owner** | Implementer of change; must link upward to canonical asset when one exists |

### Implementation

| | |
|---|---|
| **Location** | Feature docs, project `docs/product/`, audit records, `plan/docs/`, workspace notes |
| **Role** | Documents project-specific work, decisions, and artifacts |
| **Examples** | KB review records, verification docs, project decision logs |
| **Maintenance owner** | Feature or work-item author |

### Conflict resolution

**Canonical documentation is authoritative.**

If operational or implementation docs conflict with `docs/company/`:

1. Update operational/implementation docs to align, **or**
2. Document a governed **Deviate** decision per [Promotion Process — Project adoption model](../PROMOTION_PROCESS.md#project-adoption-model)

Silent conflict is documentation drift and must be remediated.

---

## Documentation Lifecycle

```
Create
    ↓
Maintain
    ↓
Review
    ↓
Update
    ↓
Archive
```

### Create

| | |
|---|---|
| **Purpose** | Introduce new documentation with correct tier and links |
| **Expected outputs** | New doc in appropriate path; index entry if applicable; cross-links to related standards |
| **Quality requirements** | Correct hierarchy tier; no duplicate standard definitions in operational docs when canonical exists |

### Maintain

| | |
|---|---|
| **Purpose** | Keep docs accurate as code and behavior change |
| **Expected outputs** | Updated sections reflecting current truth; changelog or PR description noting doc updates |
| **Quality requirements** | Same PR as code change when possible; [Change impact assessment](#change-impact-assessment) applied |

### Review

| | |
|---|---|
| **Purpose** | Validate accuracy, links, and metadata on a schedule or trigger |
| **Expected outputs** | Review notes; updated `last_reviewed` / `next_review_due` for KB assets |
| **Quality requirements** | [Review requirements](#review-requirements) triggers honored |

### Update

| | |
|---|---|
| **Purpose** | Apply corrections from review or drift detection |
| **Expected outputs** | PR with doc fixes; stale “recommended next” sections refreshed |
| **Quality requirements** | Cross-link pass when asset relationships change |

### Archive

| | |
|---|---|
| **Purpose** | Retire superseded docs without losing history |
| **Expected outputs** | Status `Superseded` or `Deprecated`; `superseded_by` link; index updated |
| **Quality requirements** | No broken inbound links from index or related assets |

---

## Change Impact Assessment

When making changes, assess documentation impact **before** claiming completion.

### Architecture changes

| Update | When |
|--------|------|
| `docs/architecture/` project docs | Routes, boundaries, integrations, or stack change |
| Standards references | New pattern adoption or deviation |
| Implementation / audit notes | Major refactor or ownership shift |
| Related KB assets | Canonical pattern or topology change |

### Feature changes

| Update | When |
|--------|------|
| Feature / product docs | User-facing behavior or scope change |
| [Implementation index](../../prompts/implementation-index.md) | New prompts or KB work items |
| Operational workflows | QA, agent, or deployment steps affected |
| README (if contributor-facing) | New doc areas or primary workflows change |

### Standard changes (KB assets)

| Update | When |
|--------|------|
| Related promoted assets | Cross-links and “Relationship to Existing Assets” sections |
| Operational implementing docs | Shortened entry points must not contradict canonical |
| `linked_projects` metadata | Adoption or Deviate in a product |
| Knowledge Base Index | New promotion, supersession, or category change |

### Responsibilities

| Role | Responsibility |
|------|----------------|
| **Implementer / agent** | Apply change impact assessment; update docs in same PR or file follow-up issue |
| **Reviewer** | Reject PRs that change behavior without listed doc updates |
| **Asset owner** | Quarterly KB metadata and cross-link review |

---

## Cross-Link Requirements

Documentation must be **internally connected** to reduce duplication and improve discoverability.

### When to link

| Link type | Requirement |
|-----------|-------------|
| **Related standards** | Every promoted KB asset Related section lists peer assets it depends on or extends |
| **Related patterns** | AI assets link architecture + sibling AI patterns |
| **Related playbooks** | Standards link Feature Delivery when they define a lifecycle stage |
| **Implementation references** | KB assets link operational paths (`docs/agent/`, `docs/qa/`) where applicable |
| **Entry points** | README, `future-product-standards.md`, implementation-index link to [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md) |

### Cross-link quality

- Use relative paths within repo
- Link to canonical asset when both operational and canonical exist
- Update reciprocal links when adding a new promoted asset
- Remove or refresh links to superseded assets

### Anti-duplication rule

If content exists in canonical form, **reference** it — do not copy full standard text into operational docs. Operational docs may summarize with a link.

---

## Review Requirements

Documentation review is required on these triggers:

| Trigger | Review scope |
|---------|--------------|
| **Feature completion** | Feature docs, implementation index, operational checklists affected; completion report lists doc updates |
| **KB promotion** | Full [promotion checklist](../PROMOTION_PROCESS.md#promotion-checklist); cross-link pass across related assets |
| **Quarterly KB review** | All Promoted Standard assets: metadata, `linked_projects`, stale recommendations, cross-links ([review cadence](../PROMOTION_PROCESS.md#review-cadence)) |
| **Major architecture change** | Architecture docs, KB AI/architecture assets, audit record if applicable |
| **Hygiene finding** | Targeted pass like AREDIR-KB-008A: entry points, stale footers, broken relationships |

Feature completion aligns with [Feature Delivery Standard — Documentation](../playbooks/FEATURE_DELIVERY_STANDARD.md#documentation-requirements) stage.

---

## Documentation Drift Framework

Drift is when documentation no longer matches reality or canonical authority.

### Drift signals

| Signal | Example |
|--------|---------|
| **Implementation differs from documentation** | Code implements pattern X; docs describe pattern Y |
| **References to completed future work** | “Recommended next: AREDIR-KB-009” after KB-009 is complete |
| **Operational vs canonical conflict** | Agent standard contradicts KB Engineering Standard |
| **Missing adoption references** | README omits `docs/company/` |
| **Broken internal links** | Moved file; index not updated |
| **Metadata stale** | `next_review_due` passed without review |

### Remediation process

```
Identify drift (review, audit, or report)
    ↓
Classify tier (canonical / operational / implementation)
    ↓
Fix or Deviate (documented)
    ↓
Cross-link pass if relationships changed
    ↓
Record in PR, KB review, or hygiene work item (e.g. KB-008A)
```

Drift in **canonical** assets: PR against aredirlabs.com with metadata bump. Drift in **operational** docs: align to canonical or file Deviate. Drift from KB-008 class: execute hygiene cleanup pattern (AREDIR-KB-008A).

---

## Documentation Deliverables

Minimum expectations by change size.

### Small changes

- Implementation index update if prompt/KB work item added
- PR description notes “no doc impact” if truly none

### Medium changes

- Feature or product documentation update
- Operational checklist update if user-facing or QA paths change
- Related cross-links if new surface area

### Large changes

- Architecture documentation update
- Optional architecture audit per [Architecture Audit Standard](./ARCHITECTURE_AUDIT_STANDARD.md)
- KB asset update if reusable pattern emerges

### KB promotion

- New or updated asset under `docs/company/<category>/`
- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md) updated
- [Implementation index](../../prompts/implementation-index.md) row for work item
- Cross-link review across related promoted assets
- `last_reviewed` / `next_review_due` on new asset

---

## Relationship to Existing Assets

Documentation maintenance **supports** every other standard — it is how they stay trustworthy over time.

| Asset | Relationship |
|-------|--------------|
| [Architecture Audit Standard](./ARCHITECTURE_AUDIT_STANDARD.md) | Audits produce implementation docs; maintenance keeps audit recommendations and architecture docs current |
| [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md) | Documentation is a lifecycle stage; this standard defines *how* to maintain |
| [Coding Agent Operating Standard](../engineering-standards/CODING_AGENT_OPERATING_STANDARD.md) | Agents must update docs alongside code; completion reports list doc changes |
| [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md) | Verification includes doc accuracy for release; drift undermines QA sign-off |
| [Promotion Process](../PROMOTION_PROCESS.md) | Governance, hierarchy, metadata, and quarterly review — operationalized by this standard |

```
Feature Delivery → Execution → Documentation (this standard) → Release / Knowledge Capture
Architecture Audit → Implementation docs → Maintenance → Canonical promotion (optional)
```

---

## Future Documentation Candidates

Likely future promotions — **not created in this work item**:

| Candidate | Notes |
|-----------|-------|
| **Decision Record Standard** | Lightweight ADR format for Deviate and architecture decisions |
| **Knowledge Capture Standard** | Project artifact → candidate asset workflow |
| **Release Documentation Standard** | Required docs per release type |
| **Documentation Review Playbook** | Facilitated review sessions for large doc changes |

**Recommended next promotion:** AREDIR-KB-011 — **AI Evaluation Framework** (per [Knowledge Base Roadmap](../KNOWLEDGE_BASE_ROADMAP.md)).

---

## Related

- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [Architecture Audit Standard](./ARCHITECTURE_AUDIT_STANDARD.md)
- [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md)
- [Root Cause Analysis Framework](../qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md)
- [KB Review 2026 Q2](../reviews/KB_REVIEW_2026_Q2.md)
- [Knowledge Base Roadmap](../KNOWLEDGE_BASE_ROADMAP.md)
