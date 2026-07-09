# Documentation Governance

**Status:** Company Standard  
**Owner:** Aredir Labs  
**Domain:** Documentation  
**Last reviewed:** 2026-06-25  
**Next review due:** 2026-09-12

## Purpose

Define company-wide expectations for documentation: ownership, naming, status tracking, cross-linking, update procedures, archive strategy, and living documentation philosophy.

**Canonical maintenance procedures:** [Documentation Maintenance Standard](../documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md). This document provides the governance-layer overview.

---

## Documentation ownership

| Tier | Location | Owner | Update trigger |
|------|----------|-------|----------------|
| **Canonical** | `docs/company/` | Asset owner | Promotion, quarterly review, supersession |
| **Governance** | `docs/company/governance/` | Aredir Labs engineering lead | Standard changes, formal reviews |
| **Operational** | `docs/agent/`, `docs/qa/`, `docs/engineering/`, `docs/architecture/` | Change implementer | Any code or process change affecting the doc |
| **Implementation** | `docs/product/`, `plan/docs/`, `docs/prompts/` | Work-item author | Feature delivery, verification completion |
| **Reviews** | `docs/company/reviews/` | Review author | Formal audit or governance review completion |

Documentation is an **engineering deliverable**. The implementer updates docs in the same PR as code unless the work item is documentation-only.

---

## Naming conventions

| Doc type | Convention | Example |
|----------|------------|---------|
| Promoted Knowledge Base asset | `SCREAMING_SNAKE_CASE.md` in category folder | `CONTEXT_BUILDER_PATTERN.md` |
| Governance domain doc | `SCREAMING_SNAKE_CASE.md` in `governance/` | `AI_GOVERNANCE.md` |
| Operational doc | `kebab-case.md` in area folder | `manual-qa-checklist.md` |
| Review record | `{TOPIC}_{DATE_OR_ID}.md` in `reviews/` | `KB_REVIEW_2026_Q2.md` |
| Work item / verification | `{PREFIX}-{NUMBER}-{SHORT-TITLE}.md` in `plan/docs/` | `AREDIR-WORKSPACE-008-*.md` |
| Implementation prompt | `prompt-{ID}-{slug}.md` | `prompt-001A-foundation.md` |

File names should be stable. Rename only with cross-link update in the same PR.

---

## Status tracking

Documents use explicit status to communicate authority:

| Status | Meaning |
|--------|---------|
| **Company Standard** | Mandated across products |
| **Promoted Standard** | Approved KB asset available for adoption |
| **Foundation** | Index or structural doc (e.g., Knowledge Base Index) |
| **Complete** | Implementation verification record — work is done |
| **Planned** | Future work documented but not yet implemented |
| **Deprecated** | No longer recommended; retained for reference |
| **Superseded** | Replaced by newer asset; link provided |

Work-item status lives in [implementation index](../../prompts/implementation-index.md). Do not mark Complete without verification evidence.

---

## Cross-linking

| Rule | Detail |
|------|--------|
| **Link upward** | Operational docs link to canonical assets they implement |
| **Link laterally** | Related assets cross-reference in Related sections |
| **Use relative paths** | Repo-relative links for portability across clones |
| **Avoid orphan docs** | Every doc reachable from README, an index, or a parent doc |
| **Update on rename** | Cross-link pass required when moving or renaming files |

Primary indexes that must stay current:

- [README.md](../../../README.md)
- [Governance Index](../GOVERNANCE_INDEX.md)
- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Implementation index](../../prompts/implementation-index.md)

---

## Update procedures

Documentation updates follow the same delivery discipline as code:

### During feature delivery

1. Identify affected docs during scope definition.
2. Update operational and implementation docs during execution.
3. Verify cross-links before PR merge.
4. Consider promotion candidates during knowledge capture.

### During promotion

Follow [Promotion Process — Promotion checklist](../PROMOTION_PROCESS.md#promotion-checklist):

- Metadata block complete
- Knowledge Base Index updated
- Registry seed updated (when applicable)
- Implementation index updated for tracked work items

### During quarterly review

Per [Promotion Process — Review cadence](../PROMOTION_PROCESS.md#review-cadence):

- Confirm accuracy and relevance
- Update `last_reviewed` and `next_review_due`
- Validate `linked_projects`
- Fix broken cross-links and stale recommendations
- Flag assets for deprecation or supersession

---

## Archive strategy

| Situation | Action |
|-----------|--------|
| **Superseded asset** | Keep file; set status; add `superseded_by` link |
| **Deprecated asset** | Keep file; mark Deprecated; remove from active indexes |
| **Completed work item** | Retain verification doc; mark Complete in index |
| **Obsolete implementation prompt** | Retain for history; note supersession in index |
| **Deletion** | Requires engineering lead approval and archive policy; prefer retain-with-status |

Do not delete promoted assets or review records without explicit approval.

---

## Implementation notes

Implementation-tier docs serve specific purposes:

| Doc type | Purpose | Lifecycle |
|----------|---------|-----------|
| **Engineering Work Packages** | Required implementation specification for findings | Permanent after Complete |
| **Verification specs** | Record what was built and tested | Permanent after Complete |
| **Implementation Briefs / Prompts** | Optional agent handoff when work package alone is insufficient | Permanent; may be superseded |
| **Audit records** | Evidence-based system evaluation | Permanent; feeds promotions |
| **Project notes** | Lightweight decision memory | Active during project; summarize into ADRs or promotions |

Implementation notes are not company standards. Extract reusable content through promotion — do not elevate raw implementation prompts to `docs/company/` without review. An Engineering Work Package is the required implementation artifact; a separate implementation prompt is not mandatory for every package.

---

## Living documentation philosophy

Documentation at Aredir Labs is **living** — it evolves with the systems it describes.

| Principle | Meaning |
|-----------|---------|
| **Truth over aspiration** | Docs describe what exists and what is required — not wishful architecture |
| **Synchronized with code** | Stale docs are defects; fix in the same PR or file a hygiene work item |
| **Agent-readable structure** | Headings, tables, and explicit rules — not prose-only tribal knowledge |
| **Evidence-based audits** | Architecture docs grounded in code and config inspection |
| **Honest status** | Do not mark Complete or Adopted without verification |
| **Reusable extraction** | Project docs feed promotion; company docs feed product onboarding |

The goal is trustworthy documentation that any engineer, agent, or new product can consume without oral tradition.

---

## Related

- [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md)
- [Knowledge Artifact Taxonomy](../knowledge/KNOWLEDGE_ARTIFACT_TAXONOMY.md)
- [Governance Index](../GOVERNANCE_INDEX.md)
- [Documentation Maintenance Standard](../documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md)
- [Knowledge Governance](./KNOWLEDGE_GOVERNANCE.md)
- [Project Governance](./PROJECT_GOVERNANCE.md)
- [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md)
