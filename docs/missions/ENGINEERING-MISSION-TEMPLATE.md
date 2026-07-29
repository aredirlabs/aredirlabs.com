# Engineering Mission Template

Copy into `records/{QUALIFIER}-MISSION-###_short-slug.md`.

Remove instructional HTML comments before saving a real record. Mark non-material sections `N/A — not material`. Do **not** add prohibited duplication fields (package %, Opportunity state, finding severity copies, verification matrices, points, assignees, board columns, roadmap horizon, commit/CI/release % fields).

**Authority:** [ENGINEERING-MISSION-CONTRACT.md](./ENGINEERING-MISSION-CONTRACT.md)

---

## Identity

| Field | Value | Class |
| --- | --- | --- |
| **id** | `{QUALIFIER}-MISSION-###` | authoritative (immutable) |
| **title** | | authoritative |
| **mission_kind** | `discovery` \| `architecture` \| `delivery` \| `verification` \| `remediation` \| `operational` \| `methodology` \| `knowledge-promotion` | authoritative |
| **state** | `Proposed` | authoritative |
| **created** | YYYY-MM-DD | authoritative |
| **updated** | YYYY-MM-DD | authoritative |

<!-- state vocabulary: Proposed | Authorized | Active | Paused | Completed | Closed | Cancelled | Superseded -->

## Outcome

### Outcome statement

<!-- What will be true when this Mission succeeds? State the outcome, not the implementation method. -->

### Scope in

<!-- What is inside the bounded pursuit? -->

### Scope out

<!-- What is explicitly excluded? -->

### Success conditions

| # | Condition | Status |
| --- | --- | --- |
| 1 | | unmet \| met \| waived |

### Evidence expectations

| Expectation | Where evidence will live |
| --- | --- |
| | path / package / checklist / report |

## Ownership

| Field | Value | Class |
| --- | --- | --- |
| **owning_project / authority_domain** | | authoritative |
| **owning_capability** | | authoritative (required by Authorize; provisional allowed at Proposed) |
| **impacted_capabilities** | | authoritative (optional) |
| **origin** | | authoritative |
| **decision_authority** | | authoritative (required by Authorize) |

<!-- origin examples: approved_opportunity | discovery_need | architecture_need | quality_finding | runtime_incident | operational_hygiene | methodology_gap | knowledge_promotion | conversation -->

## Authorization

| Field | Value | Class |
| --- | --- | --- |
| **authorizing_decision** | | authoritative (required by Authorize) |
| **ready** | `no` \| `yes` \| `waived` | authoritative checklist summary (not a lifecycle state) |

### Readiness checklist

- [ ] Bounded outcome
- [ ] Success conditions
- [ ] Scope in / out
- [ ] Owning authority
- [ ] Owning capability or governed provisional ownership
- [ ] Authorization recorded
- [ ] Evidence expectations
- [ ] Dependencies known or Unknown-accepted
- [ ] Architectural blockers resolved, in scope, or accepted

Waivers (if any):

| Criterion | Rationale | Owner | Date |
| --- | --- | --- | --- |
| | | | |

## Relationships

| Field | Value | Class |
| --- | --- | --- |
| **related_opportunity_ids** | | authoritative (conditional) |
| **related_package_ids** | | authoritative (conditional) |
| **primary_package_id** | | authoritative (conditional; when >1 package) |
| **related_finding_ids** | | authoritative (conditional) |
| **related_adr_ids** | | authoritative (conditional) |
| **related_repository_refs** | | authoritative (optional; non-owning) |
| **release_refs** | | authoritative (optional) |
| **supersedes** | | authoritative (conditional) |
| **superseded_by** | | authoritative (conditional) |

## Dependencies

| ID / description | Relationship | Notes | Class |
| --- | --- | --- | --- |
| | blocks \| blocked_by \| related | | authoritative |

## Risks

| Risk | Disposition | Trigger / owner | Class |
| --- | --- | --- | --- |
| | | | authoritative |

## Timeline

| Field | Value | Class |
| --- | --- | --- |
| **started_at** | | authoritative (on Activate) |
| **completed_at** | | authoritative (on Complete) |
| **closed_at** | | authoritative (on Close) |
| **closure_rationale** | | authoritative (Close / Cancel / Supersede) |
| **knowledge_candidate** | `no` \| `pending` \| `yes` | authoritative (evaluate at Close) |

## Decision log

Append a new block for each material transition. Do not silently overwrite history.

### Decision

| Field | Value |
| --- | --- |
| **transition** | authorize \| activate \| pause \| resume \| complete \| close \| cancel \| supersede \| note |
| **date** | YYYY-MM-DD |
| **owner** | |
| **from_state** | |
| **to_state** | |
| **rationale** | |
| **evidence_refs** | |

## Notes

<!-- Residual context only. Do not store projected package/verification status here as if authoritative. -->

---

## Field classification legend

| Class | Meaning |
| --- | --- |
| authoritative | Mission record is source of truth |
| conditional | Required only for some states/kinds |
| derived | Computed from linked artifacts — registry/Ops views only |
| projected | Shown from other SoTs — not maintained on this record |
| prohibited duplication | Forbidden on Mission records (see contract §12) |

### Derived / projected (do not duplicate as Mission fields)

Package progress · Opportunity state · finding severity · verification matrices · git/CI activity · release-readiness % · Blocked / At Risk / Waiting as fake lifecycle states · Primary Active (registry designation only)
