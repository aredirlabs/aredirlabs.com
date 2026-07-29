# AREDIR-MISSION-001 — Establish Engineering Mission contract, template, and Labs registry

| Field | Value | Class |
| --- | --- | --- |
| **id** | AREDIR-MISSION-001 | authoritative (immutable) |
| **title** | Establish Engineering Mission contract, template, and Labs registry | authoritative |
| **mission_kind** | methodology | authoritative |
| **state** | Closed | authoritative |
| **created** | 2026-07-28 | authoritative |
| **updated** | 2026-07-28 | authoritative |

## Outcome

### Outcome statement

Aredir Labs can create, authorize, activate, complete, and close Engineering Missions consistently using a normative contract, reusable template, and Labs registry — without absorbing Opportunity, Package, Finding, Verification, Decision, ADR, Release, Promotion, Project, or Roadmap authority.

### Scope in

- Normative Mission contract under `docs/missions/`
- Reusable Mission template
- Labs Mission registry (index only) with Primary Active designation rules
- Controlled vocabulary, lifecycle, readiness, and closure rules
- Documentation navigation updates in Labs
- Self-hosting validation via this Mission record

### Scope out

- Engineering Operations application, UI, mockups
- Database, APIs, sync, GitHub integration
- AEF C11 assignment or AEF capability inventory edits
- Bootstrap packaging of Mission assets
- Quality Systems modifications
- ClassForge / AlignFit / other product Mission seeding
- Making Mission mandatory for every Package
- Mission hierarchy

### Success conditions

| # | Condition | Status |
| --- | --- | --- |
| 1 | Normative contract exists and matches DISCOVERY-003 / DISCOVERY-004 boundaries | met |
| 2 | Reusable template exists with required fields and prohibited-duplication guards | met |
| 3 | Labs registry exists as non-authoritative index with Primary Active rules | met |
| 4 | This Mission is representable without duplicating package acceptance criteria or progress | met |
| 5 | Registry can designate this Mission Primary Active while Active, then clear on Close | met |
| 6 | Mission can Complete and Close without storing package status fields on the Mission | met |

### Evidence expectations

| Expectation | Where evidence will live |
| --- | --- |
| Contract, template, registry, records present | `docs/missions/` |
| Navigation discoverability | Root `README.md` documentation map; `docs/discovery/README.md`; implementation index |
| Self-hosting validation notes | This record decision log + package completion report |
| Link and vocabulary consistency | Documentation verification for AREDIR-MISSION-001 |

## Ownership

| Field | Value | Class |
| --- | --- | --- |
| **owning_project / authority_domain** | Aredir Labs / `aredirlabs-com` | authoritative |
| **owning_capability** | AEF C9 — Delivery & Release Framework | authoritative |
| **impacted_capabilities** | C4 Documentation Framework; C10 Design & Experience Framework (Ops workspace pattern adjacency); C1 EOS (lifecycle narrative) | authoritative |
| **origin** | methodology_gap | authoritative |
| **decision_authority** | Aredir Labs engineering lead | authoritative |

## Authorization

| Field | Value | Class |
| --- | --- | --- |
| **authorizing_decision** | DISCOVERY-004 follow-on decision 3 (Mission validated; proceed to AREDIR-MISSION-001 contract implementation), 2026-07-28 | authoritative |
| **ready** | yes | authoritative checklist summary |

### Readiness checklist

- [x] Bounded outcome
- [x] Success conditions
- [x] Scope in / out
- [x] Owning authority
- [x] Owning capability or governed provisional ownership
- [x] Authorization recorded
- [x] Evidence expectations
- [x] Dependencies known or Unknown-accepted
- [x] Architectural blockers resolved, in scope, or accepted

Waivers: none.

## Relationships

| Field | Value | Class |
| --- | --- | --- |
| **related_opportunity_ids** | N/A — not material | authoritative (conditional) |
| **related_package_ids** | AREDIR-DISCOVERY-003; AREDIR-DISCOVERY-004; AREDIR-MISSION-001 | authoritative |
| **primary_package_id** | AREDIR-MISSION-001 | authoritative |
| **related_finding_ids** | N/A — not material | authoritative (conditional) |
| **related_adr_ids** | N/A — not material | authoritative (conditional) |
| **related_repository_refs** | N/A — not material | authoritative (optional) |
| **release_refs** | N/A — not material | authoritative (optional) |
| **supersedes** | N/A — not material | authoritative (conditional) |
| **superseded_by** | N/A — not material | authoritative (conditional) |

## Dependencies

| ID / description | Relationship | Notes | Class |
| --- | --- | --- | --- |
| AREDIR-DISCOVERY-003 | blocked_by (historical) | Ops architecture prerequisite — complete | authoritative |
| AREDIR-DISCOVERY-004 | blocked_by (historical) | Mission artifact definition prerequisite — complete | authoritative |

## Risks

| Risk | Disposition | Trigger / owner | Class |
| --- | --- | --- | --- |
| Mission ID equals package ID (self-hosting) | Accepted for bootstrap Mission only; prefer distinct IDs thereafter | Future Missions / engineering lead | authoritative |
| Registry treated as SoT | Guarded by contract + registry authority rule | Reviewers | authoritative |

## Timeline

| Field | Value | Class |
| --- | --- | --- |
| **started_at** | 2026-07-28 | authoritative |
| **completed_at** | 2026-07-28 | authoritative |
| **closed_at** | 2026-07-28 | authoritative |
| **closure_rationale** | Contract, template, registry, navigation, and self-hosting validation delivered. Outcome and success conditions met. Residual risk limited to future operators mistaking registry for SoT or reusing Mission=Package ID pattern — both documented. | authoritative |
| **knowledge_candidate** | yes | authoritative |

Promotion remains downstream and deliberate (C7 / Promotion Process). Candidate topic: Engineering Mission contract as company operational methodology asset after sustained use.

## Decision log

### Decision

| Field | Value |
| --- | --- |
| **transition** | authorize |
| **date** | 2026-07-28 |
| **owner** | Aredir Labs engineering lead |
| **from_state** | Proposed |
| **to_state** | Authorized |
| **rationale** | DISCOVERY-004 validated Mission artifact and authorized contract implementation package AREDIR-MISSION-001. |
| **evidence_refs** | docs/discovery/AREDIR-DISCOVERY-004_ENGINEERING_MISSION_ARTIFACT_DEFINITION.md |

### Decision

| Field | Value |
| --- | --- |
| **transition** | activate |
| **date** | 2026-07-28 |
| **owner** | Aredir Labs engineering lead |
| **from_state** | Authorized |
| **to_state** | Active |
| **rationale** | Readiness checklist met; Labs operating focus set to deliver Mission contract/template/registry. Designated Primary Active in registry while Active. |
| **evidence_refs** | docs/missions/ENGINEERING-MISSION-CONTRACT.md (in progress at activation); readiness checklist above |

### Decision

| Field | Value |
| --- | --- |
| **transition** | complete |
| **date** | 2026-07-28 |
| **owner** | Aredir Labs engineering lead |
| **from_state** | Active |
| **to_state** | Completed |
| **rationale** | All success conditions met. Package AREDIR-MISSION-001 deliverables exist under docs/missions/. Package progress was not copied onto this Mission; completion cites package paths only. |
| **evidence_refs** | docs/missions/README.md; ENGINEERING-MISSION-CONTRACT.md; ENGINEERING-MISSION-TEMPLATE.md; ENGINEERING-MISSION-REGISTRY.md; this record |

### Decision

| Field | Value |
| --- | --- |
| **transition** | close |
| **date** | 2026-07-28 |
| **owner** | Aredir Labs engineering lead |
| **from_state** | Completed |
| **to_state** | Closed |
| **rationale** | Closure checklist satisfied. Knowledge candidate = yes. Primary Active cleared in registry. No Opportunity state updates required (none linked). |
| **evidence_refs** | docs/missions/ENGINEERING-MISSION-REGISTRY.md; this record |

## Notes

Self-hosting validation (AREDIR-MISSION-001):

1. Mission represented without duplicating package acceptance criteria — outcome is orientation-level; package owns file-level deliverables.
2. Evidence expectations reference package verification (docs presence + navigation + consistency checks), not embedded lint logs.
3. Registry showed Primary Active while Active; cleared on Close.
4. Completed → Closed without Mission fields for package %.
5. Knowledge-candidate evaluated at Close (`yes`); promotion not performed by Mission.

Contract change discovered during self-hosting: none required. Retained explicit note that Mission ID may equal package ID only for this bootstrap case.
