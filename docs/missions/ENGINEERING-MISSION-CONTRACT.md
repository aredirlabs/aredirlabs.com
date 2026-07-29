# Engineering Mission Contract

| Field | Value |
| --- | --- |
| **Status** | Operational Contract (repository documentation) |
| **Owner** | Aredir Labs |
| **Work item** | AREDIR-MISSION-001 |
| **Version** | 1.0 |
| **Date** | 2026-07-28 |
| **Prior authority** | [DISCOVERY-003](../discovery/AREDIR-DISCOVERY-003_ENGINEERING_OPERATIONS_ARCHITECTURE.md), [DISCOVERY-004](../discovery/AREDIR-DISCOVERY-004_ENGINEERING_MISSION_ARTIFACT_DEFINITION.md) |
| **Template** | [ENGINEERING-MISSION-TEMPLATE.md](./ENGINEERING-MISSION-TEMPLATE.md) |
| **Registry** | [ENGINEERING-MISSION-REGISTRY.md](./ENGINEERING-MISSION-REGISTRY.md) |

**Normative status:** This document is the authoritative contract for Engineering Mission artifacts in `aredirlabs-com`. Where this contract and a package brief disagree, [DISCOVERY-004](../discovery/AREDIR-DISCOVERY-004_ENGINEERING_MISSION_ARTIFACT_DEFINITION.md) and [DISCOVERY-003](../discovery/AREDIR-DISCOVERY-003_ENGINEERING_OPERATIONS_ARCHITECTURE.md) govern; update this contract to match.

This contract does **not** authorize application implementation, AEF C11, Bootstrap packaging, or product-repository Mission seeding.

---

## 1. Definition

### Canonical one-line definition

> An **Engineering Mission** is a bounded, outcome-oriented operational commitment and focus record that orients currently pursued engineering work by coordinating governed artifacts by reference.

### Primary responsibility

> Orient active engineering work around a defined outcome and its supporting context (by reference).

### What Mission does not replace

Mission does **not** replace:

| Artifact | Remains authoritative for |
| --- | --- |
| **Opportunity** | Potential work evaluation and pre-package governance |
| **Package** | Implementation specification, acceptance, and progress |
| **Finding** | Observed quality / evidence conditions |
| **Verification** | Proof methods, evidence bodies, confidence assessment |
| **Decision** | Governed conclusions (beyond Mission transition notes) |
| **ADR** | Architecture decision records |
| **Release** | Ship / release records and readiness checklists |
| **Promotion** | Deliberate transfer of reusable company knowledge |
| **Project** | Long-lived product / repository identity |
| **Roadmap** | Planning horizons and sequence intent |

### Distinctions

| Concept | Difference from Mission |
| --- | --- |
| Ticket / task | Atomic work unit; tracker semantics; no outcome-orientation contract |
| Project | Long-lived identity; Mission is time-bounded pursuit |
| Milestone | Schedule / event marker |
| Initiative / program | Often unbounded or hierarchical; Mission must be closable |
| Opportunity | Potential work without pursuit commitment |
| Package | Authoritative specification to execute change |

**Vocabulary:** Prefer **Engineering Mission** when ambiguous with AQSF Mission Architecture or UX experiential “mission.” In this directory, **Mission** means Engineering Mission.

---

## 2. Ownership

| Rule | Requirement |
| --- | --- |
| Authoritative home | Exactly **one** repository or authority domain |
| Owning project / domain | Exactly **one** (`owning_project` / `authority_domain`) |
| Owning capability | **One** by Authorization (`owning_capability`); provisional allowed while Proposed |
| Impacted capabilities | Optional list |
| Multi-home Missions | **Forbidden in v1** |
| Cross-project work | One authoritative home + optional `related_repository_refs`; or separate per-repo Missions linked by relation |

**Labs may project** Mission indexes and Primary Active designations. Labs must **not** become system of record for Missions whose authoritative home is another repository.

**Owning capability for Labs delivery/methodology Missions:** AEF **C9 — Delivery & Release Framework** (or another existing AEF capability when more accurate). Do **not** invent C11.

---

## 3. Identity

| Rule | Requirement |
| --- | --- |
| Format | `{QUALIFIER}-MISSION-###` |
| Examples | `AREDIR-MISSION-001`, `CF-MISSION-001`, `ALIGNFIT-MISSION-001` |
| Immutability | `id` never changes after create |
| Qualifier | Represents the authoritative domain |
| Title | Human-readable, outcome-oriented |
| Retention | Closed, Cancelled, and Superseded remain readable; do not delete for inactivity |
| Supersession | Use reciprocal `supersedes` / `superseded_by` where possible |

Record path convention (Labs):

`docs/missions/records/{ID}_{short-slug}.md`

---

## 4. Mission kind vocabulary

Use **one primary** `mission_kind`. Kind is classification, **not hierarchy**.

| Kind | Meaning | Typical backing |
| --- | --- | --- |
| `discovery` | Establish understanding, boundaries, or architectural clarity before (or without) delivery packaging | Discovery packages |
| `architecture` | Produce or refine architecture / ADR outcomes | Architecture packages, ADRs |
| `delivery` | Deliver a bounded product or platform change | Implementation packages |
| `verification` | Establish justified confidence for a defined claim set | Verification plans / evidence packages |
| `remediation` | Correct a known defect, finding cluster, or regression | Remediation / fix packages |
| `operational` | Improve engineering hygiene, tooling, or operating conditions | Ops / platform hygiene packages |
| `methodology` | Advance company methodology, contracts, or EOS/AEF practice | Labs documentation packages |
| `knowledge-promotion` | Deliberately prepare or execute promotion of reusable knowledge | Promotion candidates / ledgers |

Do not encode parent/child structure through kind values.

---

## 5. Lifecycle

### Canonical states

| State | Entry meaning |
| --- | --- |
| **Proposed** | Recorded outcome candidate; not yet a pursuit commitment |
| **Authorized** | Commitment accepted; not necessarily currently focused |
| **Active** | Currently pursued; operational focus |
| **Paused** | Intentionally suspended; commitment retained |
| **Completed** | Outcome achieved per success conditions; governance may still finalize |
| **Closed** | Governance finalized; terminal success path |
| **Cancelled** | Will not be pursued further; terminal |
| **Superseded** | Replaced by another Mission; terminal |

### Transition map

```text
Proposed
   ├─(authorize)──► Authorized
   ├─(cancel)─────► Cancelled
   └─(supersede)──► Superseded

Authorized
   ├─(activate)───► Active
   ├─(cancel)─────► Cancelled
   └─(supersede)──► Superseded

Active
   ├─(pause)──────► Paused
   ├─(complete)───► Completed
   ├─(cancel)─────► Cancelled
   └─(supersede)──► Superseded

Paused
   ├─(resume)─────► Active
   ├─(cancel)─────► Cancelled
   └─(supersede)──► Superseded

Completed
   └─(close)──────► Closed
```

### Transition rules

| Transition | Authority | Minimum evidence / exit conditions |
| --- | --- | --- |
| authorize | `decision_authority` (or named authorizer) | Outcome, success conditions, scope in/out, owning domain, owning capability (or provisional plan), evidence expectations, authorizing decision note |
| activate | Authorizer or delegated operator | Readiness checklist met or explicit waivers (§6) |
| pause / resume | Authorizer or Active operator | Reason note |
| complete | Authorizer | Completion assessment (§7) |
| close | Authorizer | Closure checklist (§8) |
| cancel | Authorizer | Closure rationale; no further pursuit |
| supersede | Authorizer | Rationale + replacement Mission ID; reciprocal links |

### Terminal behavior

| Terminal | Behavior |
| --- | --- |
| Closed | Success path complete; retain record |
| Cancelled | Failure/abandon path; retain record |
| Superseded | Replacement Mission is successor; retain record |

**Completed ≠ Closed.** Completed means outcome achieved. Closed means governance and evidence are finalized.

### Governance distinctions (mandatory)

```text
Create ≠ Authorize ≠ Activate
Capture ≠ Approve ≠ Package ≠ Activate
Completed ≠ Closed
```

Opportunity Capture / Approve / Packaged remain on Opportunity artifacts. Mission Activate is independent.

---

## 6. Readiness (not a lifecycle state)

**Ready** is a checklist / derived condition on an **Authorized** Mission. It is **not** a lifecycle state.

### Activation readiness checklist (mandatory unless waived)

- [ ] Bounded outcome statement
- [ ] Success conditions
- [ ] Scope in and scope out
- [ ] Owning project or authority domain
- [ ] Owning capability **or** governed provisional ownership with resolution plan
- [ ] Authorization recorded (`authorizing_decision`)
- [ ] Evidence expectations defined
- [ ] Dependencies known **or** explicitly Unknown-accepted
- [ ] Architectural blockers resolved, included in Mission scope, or explicitly accepted

### Conditional criteria

| Criterion | When required |
| --- | --- |
| Related Opportunity Approved | Mission delivers that Opportunity’s committed outcome (not pure investigation) |
| Package strategy identified | `delivery` / `remediation` kinds — may be “discovery package first” |
| ADR references | Architecture impact is material |

Waivers must name the criterion, rationale, owner, and date.

---

## 7. Completion

Before **Completed**, assess:

| Concern | Requirement |
| --- | --- |
| Outcome | Achieved as stated |
| Success conditions | Each condition satisfied or explicitly waived |
| Required package results | Linked packages that the Mission depends on are Complete **or** Mission success explicitly does not require them |
| Verification expectations | Satisfied or waived with rationale; cite evidence paths — do not paste matrices |
| Finding dispositions | Material findings governed (fixed, deferred with trigger, accepted risk, or out of scope) — not necessarily all closed |
| Residual risks | Identified with owners/triggers |

Package completion does **not** automatically complete or close a Mission.

---

## 8. Closure

Before **Closed**, require:

- [ ] Completion evidence cited
- [ ] Closure rationale recorded
- [ ] Residual-risk disposition recorded
- [ ] Relationship consistency (Opportunity / Package / Finding / ADR IDs)
- [ ] Knowledge-candidate evaluation (`yes` / `no` / `pending`)
- [ ] Authorizer confirmation (decision log entry)

Promotion remains **downstream and deliberate**. Close does not perform promotion.

---

## 9. Non-state conditions (derived / projected)

These are **not** lifecycle states. Surface them in registry views or future Ops projections only:

| Condition | Typical source |
| --- | --- |
| Blocked | Dependencies, findings, external waits |
| At Risk | Risk notes + verification posture |
| Waiting | Explicit dependency on external event |
| Verification Pending | Package / verification artifacts |
| Package Incomplete | Package index status |
| Dependency Unhealthy | Dependency links |

Do **not** store these as manually maintained Mission `state` values.

---

## 10. Primary Active Mission

**Primary Active** is a **registry / operational designation**.

It is **not**:

- a Mission state
- a Mission kind
- a separate artifact
- a permanent property of the Mission record

### Rules

1. A Labs operating context should normally have **at most one** Primary Active Mission.
2. Other Active Missions may coexist.
3. Lack of a Primary Active Mission is allowed when no active operating focus exists.
4. Changing Primary Active does **not** change Mission authority or lifecycle.
5. “Today’s Mission” is a future personal/workspace **projection** of Primary Active — not a required Mission field.

---

## 11. Relationship rules

### Opportunity

- Relationship is **optional**
- One Opportunity → many Missions allowed
- One Mission → many Opportunities allowed
- Mission does **not** close Opportunity
- Mission state does **not** auto-update Opportunity state
- Opportunity `Packaged` remains package-based

### Package

- Mission **coordinates** Packages by reference
- Package remains authoritative for implementation
- Multiple Packages may support one Mission
- Designate `primary_package_id` when useful
- Package completion does **not** auto-close Mission
- Mission does **not** own package progress

### Findings and Verification

- Findings remain authoritative evidence records
- Mission references Finding IDs/paths
- Unresolved Findings require **governed disposition**, not necessarily closure
- Verification evidence remains authoritative outside the Mission
- Mission holds **evidence expectations and references only**

### Decisions and ADRs

- Authorization requires a decision note or formal decision reference
- Architecture-grade decisions should reference ADRs
- ADR acceptance does **not** automatically activate or complete a Mission

### Knowledge promotion

- Close requires knowledge-candidate evaluation
- Promotion remains downstream and deliberate
- Mission does not promote automatically

### Releases and roadmap

- Release association is optional
- Roadmap horizon lives on Opportunity / planning projections — **prohibited** as a Mission field
- Release completion does not auto-close Mission

---

## 12. Field classification

| Class | Meaning |
| --- | --- |
| **Authoritative** | Edited on the Mission record; Mission is source of truth |
| **Conditional** | Required only in some states or kinds |
| **Derived** | Computed from linked artifacts (views only) |
| **Projected** | Presented from other SoTs (registry/Ops) |
| **Prohibited duplication** | Must not appear as manually maintained Mission fields |

### Prohibited Mission fields

Do **not** maintain on Mission records:

- Package completion percentage
- Opportunity state copies
- Finding severity copies
- Verification pass/fail matrices
- Sprint / story points
- Ticket assignees
- Board columns
- Roadmap horizon
- Commit counts
- CI status
- Release-readiness percentages

---

## 13. Concurrency and hierarchy

- Multiple Active Missions allowed; prefer few for orientation
- Primary Active recommended when focus exists
- **No Mission hierarchy in v1** (no parent/child, sub-missions, or program trees)
- Prefer relationships: related Mission IDs, shared Opportunity/Package links, supersession

---

## 14. Optionality

Mission creation is **not** mandatory for every Package. Use Missions when operational orientation, multi-package coordination, or Engineering Operations focus requires them.

---

## 15. Conflict and evolution

| Conflict | Resolution |
| --- | --- |
| This contract vs DISCOVERY-003 / 004 | Discoveries govern; amend this contract |
| This contract vs template | Contract wins; fix template |
| Registry vs record | Record wins |
| Future application projections vs record | Record wins |

Material contract changes require a Labs package and Mission decision-log note on affected Active Missions when practical.
