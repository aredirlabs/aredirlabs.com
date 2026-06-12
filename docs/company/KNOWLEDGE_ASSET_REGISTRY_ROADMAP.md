# Knowledge Asset Registry Roadmap

| Field | Value |
|-------|-------|
| **Document** | Knowledge Asset Registry Roadmap |
| **Owner** | Aredir Labs |
| **Last updated** | 2026-06-12 |
| **Source review** | [Knowledge Asset Registry Readiness Review](./reviews/KNOWLEDGE_ASSET_REGISTRY_READINESS_REVIEW.md) (AREDIR-KB-012) |
| **Next review** | 2026-09-12 |

## Why a Registry Exists

The Aredir Labs Knowledge Base has reached **10 promoted assets** across six categories with formal governance (Promotion Process, quarterly review cadence, adoption model). Manual maintenance via markdown indexes and per-asset metadata tables is **no longer sufficient**:

- `KNOWLEDGE_BASE_ROADMAP.md` drifted behind the index (9 vs 10 assets)
- Seven promoted assets retain stale "recommended next" footers referencing completed work
- `linked_projects` conflates Adopted and Planned relationships
- Review due dates are identical across all assets with no visibility mechanism
- Promotion candidates live in roadmap prose, not structured data

A **Knowledge Asset Registry** in the workspace makes company intellectual property as **visible and maintainable** as the project portfolio — without replacing canonical markdown in `docs/company/`.

---

## Readiness Status

**Conditionally Ready** for AREDIR-WORKSPACE-008 (per [Readiness Review](./reviews/KNOWLEDGE_ASSET_REGISTRY_READINESS_REVIEW.md)).

### Prerequisites (AREDIR-KB-013)

Complete before registry implementation:

1. AlignFit adoption confirmation — validate AI pattern adoption; update `linked_projects`
2. Stale footer refresh — update seven assets still recommending AREDIR-KB-011
3. Roadmap sync — align asset counts and promotion status with index

### Implementation work item

**AREDIR-WORKSPACE-008** — Knowledge Asset Registry (Governance Registry scope)

---

## Proposed Scope

### Governance Registry (recommended v1)

| Capability | Included | Notes |
|------------|----------|-------|
| Asset catalog | Yes | All promoted assets + Promotion Process governance doc |
| Category browse | Yes | Filter by Architecture, Engineering, QA, AI, Documentation, Playbook |
| Search by title | Yes | Workspace UI lookup |
| Path links to canonical docs | Yes | Link to `docs/company/...` markdown |
| Review due visibility | Yes | `last_reviewed`, `next_review_due`, overdue flagging |
| Adoption per project | Yes | Seed from readiness review; manual update on quarterly review |
| Promotion candidate tracking | No | Phase 2 |
| Promotion workflow automation | No | Phase 3 |
| Dependency mapping | No | Phase 4 (25+ assets) |
| Automated markdown sync | No | Manual seed + promotion PR checklist update |

### Out of scope (all phases for this roadmap)

- Evaluation benchmarks or AI testing infrastructure
- Automated promotion approval workflows
- Product repo adoption scanning
- Replacing canonical markdown assets

---

## Required Metadata

Registry v1 fields (from readiness review field classification).

### Required

| Field | Source |
|-------|--------|
| `id` | Work item ID or stable slug (e.g. `ai-intelligence-architecture`) |
| `title` | Asset metadata `name` |
| `category` | Promotion category |
| `status` | Lifecycle state |
| `version` | Semver |
| `owner` | Responsible party |
| `path` | Relative path under `docs/company/` |
| `last_reviewed` | ISO date |
| `next_review_due` | ISO date |

### Optional (populate at seed)

| Field | Source |
|-------|--------|
| `linked_projects` | Asset metadata; refine after KB-013 |
| `origin_project` | First proof project |
| `origin_artifacts` | Source artifact references |
| `reusability` | Low / Medium / High |

### Future

| Field | When |
|-------|------|
| `adoption_mode` per project | After KB-013 baseline; registry v1.1 |
| `superseded_by` | When first asset superseded |
| `review_id` | Link to formal review records |
| `work_item_id` | AREDIR-KB-### traceability |
| `dependencies` | At 25+ assets |

---

## Governance Expectations

### Promotion Process integration

When an asset is promoted:

1. Complete existing [promotion checklist](./PROMOTION_PROCESS.md#promotion-checklist)
2. **Add registry record** with required metadata
3. Update [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md)
4. Set `last_reviewed` and `next_review_due` per quarterly cadence

### Quarterly review integration

Per [Promotion Process — Review cadence](./PROMOTION_PROCESS.md#review-cadence):

| Activity | Registry action |
|----------|-----------------|
| Confirm asset accuracy | Review canonical markdown |
| Update review dates | Set `last_reviewed`, advance `next_review_due` |
| Validate adoption | Update per-project adoption_mode |
| Flag overdue | Registry surfaces assets past due |
| Document review | Formal record in `docs/company/reviews/` |

### Documentation Maintenance integration

Per [Documentation Maintenance Standard](./documentation-standards/DOCUMENTATION_MAINTENANCE_STANDARD.md):

- Registry is **operational navigation** for canonical assets — not a second source of truth
- Canonical markdown in `docs/company/` remains authoritative for content
- Stale registry records are documentation drift; fix in same PR as asset changes

---

## Adoption Expectations

### Initial seed (from AREDIR-KB-012 audit)

| Status | Count (40 cells) | Registry treatment |
|--------|------------------|-------------------|
| Adopted | 9 | `adoption_mode: adopted` |
| Referenced | 16 | `adoption_mode: referenced` |
| Planned | 13 | `adoption_mode: planned` |
| Not Referenced | 2 | `adoption_mode: not_referenced` |

### Per-project tracking

| Project | Registry role |
|---------|---------------|
| AlignFit | Primary adoption evidence — confirm in KB-013 |
| Aredir Labs | Template and workspace — strongest adoption |
| ClassForge | Template inheritance; verify independently over time |
| LeagueOS | Template inheritance; verify independently over time |

### Adoption honesty rule

`linked_projects` in asset metadata should reflect **Adopted or Extend/Deviate** only. **Planned** relationships belong in registry adoption_mode, not implied adoption in metadata. KB-013 aligns metadata with this rule.

---

## Implementation Phases

### Phase 0 — Prerequisites (AREDIR-KB-013)

- Adoption audit completion
- Footer and roadmap sync
- Registry field spec finalized (this document)

### Phase 1 — Governance Registry (AREDIR-WORKSPACE-008)

- Workspace UI: catalog, category filter, search
- Asset detail: metadata, review dates, path link
- Adoption matrix per project
- Overdue review indicator
- Manual seed from 10 promoted assets + governance doc

### Phase 2 — Governance enrichment (post-008)

- Promotion candidate records (from roadmap)
- `work_item_id` linkage to implementation index
- Review history per asset

### Phase 3 — Scale preparation (25+ assets)

- Metadata validation script (lint for required fields)
- Promotion checklist automation hints
- Category owner assignments

### Phase 4 — Full knowledge system (50+ assets)

- Asset dependency graph
- Promotion workflow in workspace
- Company Standard elevation from adoption metrics
- Optional product repo adoption sync

---

## Future Expansion Possibilities

Documentation only — not committed work:

| Expansion | Value | Trigger |
|-----------|-------|---------|
| Asset Review Dashboard | Overdue and upcoming review calendar | Phase 1 included partially |
| Promotion Workflow UI | Standardized promotion requests | 25+ assets or promotion rate increases |
| Asset Dependency Mapping | Impact analysis for supersession | 25+ assets with cross-references |
| Automated metadata lint | CI check for markdown metadata tables | Repeated promotion drift |
| KB search across canonical content | Full-text search in workspace | Registry adoption proven |
| AI pattern adoption dashboard | Per-product AI methodology status | AlignFit confirmation complete |

---

## Success Criteria for WORKSPACE-008

| Criterion | Measure |
|-----------|---------|
| All 10 promoted assets visible | Catalog complete |
| Category browse works | Six categories filterable |
| Review dates visible | Every record shows last/next review |
| Overdue flagging works | Past-due assets highlighted |
| Adoption visible | Per-project mode for four portfolio projects |
| Canonical path links work | Each record links to markdown source |
| Promotion checklist updated | Registry step documented |
| No duplicate source of truth | Content changes still in `docs/company/` markdown |

---

## Related

- [Knowledge Asset Registry Readiness Review](./reviews/KNOWLEDGE_ASSET_REGISTRY_READINESS_REVIEW.md)
- [Knowledge Base Index](./KNOWLEDGE_BASE_INDEX.md)
- [Knowledge Base Roadmap](./KNOWLEDGE_BASE_ROADMAP.md)
- [Promotion Process](./PROMOTION_PROCESS.md)
- [KB Review 2026 Q2](./reviews/KB_REVIEW_2026_Q2.md)
- [Implementation index](../prompts/implementation-index.md)
