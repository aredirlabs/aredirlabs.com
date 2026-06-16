# WORKSPACE-008 — Knowledge Asset Registry

| Field | Value |
|-------|-------|
| **Work item** | AREDIR-WORKSPACE-008 |
| **Scope** | Governance Registry (v1) |
| **Status** | Complete |
| **Owner** | Aredir Labs |
| **Prerequisites** | AREDIR-KB-012, AREDIR-KB-013 |

## Purpose

The Knowledge Asset Registry provides **visibility into promoted Knowledge Base assets** inside the Aredir Labs workspace.

It is a governance and discovery layer — not a second source of truth.

**Knowledge Base markdown documents remain canonical. The registry is a governance view.**

Users can:

- Browse promoted assets by category, status, and project
- View metadata, relationships, and governance dates
- See per-project adoption status
- Navigate to canonical source documents in `docs/company/`

The registry does **not** replace the Knowledge Base, edit documents, or automate promotion or review workflows.

---

## Architecture

### Read-only static seed

Registry v1 uses a **TypeScript seed file** (`src/lib/knowledge-assets/registry.ts`) rather than a database table.

| Decision | Rationale |
|----------|-----------|
| Static seed | Source of truth is markdown in `docs/company/`; updates flow through promotion PRs |
| No database | Avoids a second mutable store; registry is intentionally derived |
| Server components | Matches existing workspace patterns (projects, prompts, docs) |
| GET-based filters | Lightweight filtering without client state, consistent with prompt library |

### Routes

| Route | Purpose |
|-------|---------|
| `/workspace/knowledge-assets` | Registry list, filters, review dashboard, adoption matrix |
| `/workspace/knowledge-assets/[id]` | Asset detail — metadata, relationships, governance, source link |

### Navigation

Workspace sidebar order:

```text
Dashboard
Projects
Documents
Prompts
Knowledge Assets
Settings
```

### Source linking

Detail pages link to canonical markdown on GitHub:

```text
https://github.com/aredirlabs/aredirlabs-com/blob/main/docs/company/{path}
```

Local path is displayed as `docs/company/{path}` for repository context.

---

## Data Model

Fields match KB-012 readiness review classification. No additional fields were invented.

| Field | Type | Required | Source |
|-------|------|----------|--------|
| `id` | string | Yes | Stable slug (e.g. `ai-intelligence-architecture-pattern`) |
| `title` | string | Yes | Asset metadata `name` |
| `category` | enum | Yes | Promotion category |
| `status` | enum | Yes | Lifecycle state |
| `version` | string | Yes | Semver from asset metadata |
| `owner` | string | Yes | Review and maintenance responsibility |
| `linkedProjects` | string[] | Yes | Projects with Adopt / Extend / Deviate relationships |
| `originProject` | string | Yes | Origin project(s) from asset metadata |
| `originArtifacts` | string | Yes | Traceability to source work items |
| `lastReviewed` | ISO date | Yes | Last formal review date |
| `nextReviewDue` | ISO date | Yes | Next scheduled review |
| `path` | string | Yes | Relative path under `docs/company/` |
| `reusability` | enum | Yes | Low / Medium / High |
| `adoption` | per-project map | Yes | Adopted / Referenced / Planned / Not Referenced (KB-013 validated) |

### Category values

- Architecture Pattern
- Engineering Standard
- QA Standard
- AI Pattern
- Documentation Standard
- Playbook

### Status values

- Promoted Standard
- Company Standard
- Deprecated
- Superseded

### Adoption modes (per project)

| Symbol | Mode |
|--------|------|
| ✓ | Adopted |
| R | Referenced |
| P | Planned |
| – | Not Referenced |

Projects: AlignFit (AF), ClassForge (CF), LeagueOS (LO), Aredir Labs (AL).

Adoption data seeded from [KB-012 adoption matrix](../company/reviews/KNOWLEDGE_ASSET_REGISTRY_READINESS_REVIEW.md), with AlignFit AI Evaluation correction from [KB-013](../company/reviews/KB_013_REGISTRY_PREREQUISITE_CLEANUP.md).

---

## Registry Scope (v1)

### Included

| Capability | Implementation |
|------------|----------------|
| Asset catalog | 12 promoted assets |
| Category / status / project filters | GET form on list page |
| Registry table | Asset, Category, Status, Version, Owner, Review Due, Projects |
| Asset detail page | Metadata, relationships, governance, source link |
| Adoption matrix | Full matrix on list page; compact row on detail page |
| Review dashboard | Overdue / Due Soon / Upcoming based on `nextReviewDue` |
| Source of truth notice | Displayed on list and detail pages |

### Seeded assets (12)

| Category | Asset |
|----------|-------|
| Architecture Pattern | AI Intelligence Architecture Pattern, Workspace-First AI Experience Pattern |
| Engineering Standard | Coding Agent Operating Standard |
| QA Standard | QA Engineering Framework, Root Cause Analysis Framework |
| AI Pattern | Context Builder Pattern, Response Contract Pattern, AI Evaluation Framework, Human + AI Advisor Workspace Pattern |
| Documentation Standard | Architecture Audit Standard, Documentation Maintenance Standard |
| Playbook | Feature Delivery Standard |

---

## Non-Goals

The following are **explicitly out of scope** for WORKSPACE-008 v1:

- Asset editing or creation in the workspace UI
- Promotion workflow or approval workflow
- Review workflow automation or notifications
- AI search, semantic search, or document management
- Automated markdown metadata extraction
- Database-backed registry storage
- Replacing `KNOWLEDGE_BASE_INDEX.md` or canonical markdown

These belong to future phases per [Knowledge Asset Registry Roadmap](../company/KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md).

---

## Why the Registry Is Intentionally Limited

1. **Canonical ownership stays in markdown** — The Knowledge Base promotion process, quarterly reviews, and document edits remain in `docs/company/`. The registry surfaces what already exists; it does not author content.

2. **Manual seed is sufficient at current scale** — KB-012 concluded that automated sync is premature. Promotion PRs already update asset metadata; adding a registry seed sync step is lower risk than building a parser or CMS. Sync registry seed on each KB promotion (see AREDIR-KB-014/015).

3. **Governance visibility is the primary value** — Review due dates and adoption honesty were the highest-pain gaps (stale footers, inflated `linked_projects`, invisible Q3 cadence). A full knowledge system would add complexity without solving those problems first.

4. **Workflow automation is premature** — Promotion Process checklist works at current scale. Automating elevation to Company Standard requires mature adoption data across product repos.

5. **No second mutable store** — A database table would invite drift between registry records and markdown metadata. Static seed keeps the registry clearly derived, not authoritative.

---

## Future Phases

| Phase | Capability | Trigger |
|-------|------------|---------|
| Phase 2 | Promotion candidate tracking, metadata validation script | ~25 assets |
| Phase 3 | Promotion workflow UI, per-project adoption_mode in DB | Adoption maturity + scale |
| Phase 4 | Dependency mapping, automated review alerts | ~50 assets |
| Maintenance | Product repo adoption confirmation (AlignFit GitHub) | Ongoing registry hygiene |

### Registry maintenance

When promoting or reviewing assets:

1. Update canonical markdown metadata in `docs/company/`
2. Update `KNOWLEDGE_BASE_INDEX.md`
3. Sync `src/lib/knowledge-assets/registry.ts` seed record
4. Document changes in quarterly review record

---

## Related

- [Knowledge Asset Registry Roadmap](../company/KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md)
- [KB-012 Readiness Review](../company/reviews/KNOWLEDGE_ASSET_REGISTRY_READINESS_REVIEW.md)
- [KB-013 Prerequisite Cleanup](../company/reviews/KB_013_REGISTRY_PREREQUISITE_CLEANUP.md)
- [Promotion Process](../company/PROMOTION_PROCESS.md)
- [Knowledge Base Index](../company/KNOWLEDGE_BASE_INDEX.md)
