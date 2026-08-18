# AREDIR-DISCOVERY-008 — Current Engineering Work Retrospective Intake Revalidation

| Field | Value |
| --- | --- |
| **Work package** | AREDIR-DISCOVERY-008 |
| **Status** | Complete (architectural discovery / revalidation) |
| **Date** | 2026-08-18 |
| **Package type** | Documentation / governance — no implementation |
| **Writable repository** | `aredirlabs-com` only |
| **Evaluated revision** | `ce7337a` `feat(workspace): implement operational continuation experience` |
| **Subject** | Whether current Engineering Work can truthfully represent completed product-repository work and then track subsequent live work |
| **Case study (read-only)** | AlignFit Nutrition sequence in `align-fit` (`docs/nutrition/`) |
| **Prior authority** | [ENGINEERING-WORK-DOMAIN-CONTRACT](../engineering/ENGINEERING-WORK-DOMAIN-CONTRACT.md), [ENGINEERING-WORK-LIFECYCLE](../engineering/ENGINEERING-WORK-LIFECYCLE.md), [ENGINEERING-WORK-RELATIONSHIP-MODEL](../engineering/ENGINEERING-WORK-RELATIONSHIP-MODEL.md), [ENGINEERING-WORK-REPOSITORY-REFERENCE-CONTRACT](../engineering/ENGINEERING-WORK-REPOSITORY-REFERENCE-CONTRACT.md), [WORKSPACE-OPERATIONAL-002](./WORKSPACE-OPERATIONAL-002_WORKSPACE_CONTINUATION_CONTRACT.md), [WORKSPACE-OPERATIONAL-003](../engineering/WORKSPACE-OPERATIONAL-003_OPERATIONAL_WORKSPACE_ENTRY_EXPERIENCE.md), [OPERATIONAL-EXPERIENCE-001](./OPERATIONAL-EXPERIENCE-001_OPERATIONAL_ENGINEERING_ENVIRONMENT_ARCHITECTURE.md), [AREDIR-DISCOVERY-003](./AREDIR-DISCOVERY-003_ENGINEERING_OPERATIONS_ARCHITECTURE.md), [Engineering Mission Contract](../missions/ENGINEERING-MISSION-CONTRACT.md) |
| **Follow-on** | Live AlignFit Nutrition manual UAT through current Engineering Work — **not** implementation of bounded gaps |

This package does **not** authorize application code, schema, repository-reference mutations, Engineering Work insertion, Mission creation, AlignFit Nutrition population, Engineering Work Projection (EWP), Quality Systems changes, or Bootstrap changes.

### Document placement

Path: `docs/discovery/AREDIR-DISCOVERY-008_CURRENT_ENGINEERING_WORK_RETROSPECTIVE_INTAKE_REVALIDATION.md`.

**Placement accepted.** Discovery records that are not yet promoted methodology may live under `docs/discovery/` ([Documentation Governance](../company/governance/DOCUMENTATION_GOVERNANCE.md)).

---

## 1. Verdict

**RETROSPECTIVE INTAKE SUPPORTED WITH BOUNDED EXTENSION**

Current Aredir can represent completed external product-repository work as **project-scoped Engineering Work that cites authoritative artifacts**. It must not copy those artifacts, replay an Aredir-managed package lifecycle, or substitute Workspace prompts for Engineering Work.

A separate **Engineering Work Projection (EWP)** abstraction is **not required**.

Bounded extensions identified below are **findings**, not implementation authorization.

---

## 2. Why this revalidation exists

An earlier retrospective-intake discovery was performed against a **stale** `aredirlabs-com` checkout. That baseline incorrectly concluded that Engineering Work existed only as methodology, that no Engineering Work schema/UI existed, and that retrospective intake required a new EWP abstraction.

That stale record was preserved separately and **was not merged** into current `main`. It is **not** architecture. This package does **not** copy it into current `main`.

After synchronizing to `ce7337a`, the same AlignFit Nutrition case was revalidated against **current** product contracts and implementation.

**Process lesson:** architecture discovery must establish repository freshness before making capability claims. A stale checkout produced a materially incorrect assessment. The process caught the divergence before merge. Authority principles (product repos own artifact bodies; Aredir must not gain ownership by seeing work) survived; the proposed EWP abstraction did not.

---

## 3. Current Engineering Work (implemented vs deferred)

Engineering Work is a real product domain: table `workspace_engineering_work`, project-scoped routes, create/edit, and Workspace continuation.

| Capability | Classification |
| --- | --- |
| Project-scoped Engineering Work entity | **Implemented** |
| User-facing types and internal workflows (enums) | **Implemented** |
| Lifecycle state | **Implemented** (any state may be set on create/edit; no transition log) |
| List on Project; detail; create; edit | **Implemented** |
| Delivery intake conversation | **Implemented** |
| Defect intake + `workspace_engineering_work_defects` | **Implemented** |
| Other workflow-specific intake / context | **Deferred** |
| Repository-reference **read** model and detail presentation | **Implemented** |
| Repository-reference **create/edit** through normal application mutations | **Not implemented** |
| Work-to-work parent / related / depends_on | **Documented**; **not in schema** |
| `currentOutcome` / `condition` form writers | Schema present; forms omit them |
| Engineering Mission as an application entity | **Not implemented** (Markdown only) |
| Operational continuation on `/workspace` | **Implemented** ([WORKSPACE-OPERATIONAL-003](../engineering/WORKSPACE-OPERATIONAL-003_OPERATIONAL_WORKSPACE_ENTRY_EXPERIENCE.md)) |

Canonical definition ([domain contract](../engineering/ENGINEERING-WORK-DOMAIN-CONTRACT.md)):

> Engineering Work is a bounded, project-scoped **operational record** for an intended engineering outcome. It is the active thing being managed, **not** the artifact body created as part of the work.

Seeded AlignFit Engineering Work (`eng_work_alignfit_hydration_operational_state`, Proposed, architecture) is **not** the Nutrition 003 sequence. The seeded prompt “Nutrition QA stabilization” is **not** Engineering Work.

---

## 4. Authority model

```text
Visibility ≠ authority
Citation ≠ ownership
Aredir operational Completed ≠ AlignFit package Complete
```

| Party | Owns |
| --- | --- |
| **Aredir (`aredirlabs-com`)** | Operational Engineering Work record: lifecycle state of *that record*, next action, project-scoped continuation, workflow context |
| **AlignFit (`align-fit`)** | `NUTRITION-*` specifications, implementation package bodies, tests, screenshots, verification evidence, predecessor/successor recorded in those artifacts |
| **Quality Systems** | AQSF / AVF methods — unchanged |
| **Bootstrap** | Packaging / distribution — unchanged |

A [repository reference](../engineering/ENGINEERING-WORK-REPOSITORY-REFERENCE-CONTRACT.md) cites a durable artifact. It does not ingest, edit, or re-home that artifact. Baseline repository references use `repository_authoritative`.

This matches DISCOVERY-003’s surviving invariant that repositories remain authoritative for artifact bodies, without requiring a second projection type.

---

## 5. Retrospective representation rule

Historical AlignFit work **may** be represented through current Engineering Work without replaying a lifecycle Aredir never managed.

**Example:** `NUTRITION-UX-003D-R2` was already completed in AlignFit before Aredir observed it.

Aredir **may** create an operational record whose current state is `completed` or `closed`, whose `createdAt` is when Aredir recorded it, and whose repository references cite the AlignFit artifact (path, identifier, authority).

**Do not fabricate** Proposed → Active → In Review → Completed events. There is currently **no transition log**, so opening a record already in a terminal state does not manufacture historical transitions.

**Do not** create one Engineering Work row per historical Nutrition package merely to clone AlignFit history. Those documents remain authoritative in AlignFit:

- NUTRITION-COHERENCE-001
- NUTRITION-RECIPE-FUEL-001
- NUTRITION-UX-003
- NUTRITION-UX-003A through 003F (including 003C-R1, 003D-R1, 003D-R2)

If historical visibility is later desired, prefer **one operational outcome** under the AlignFit Project with **multiple citations**, not twelve package clones. This package **does not authorize** that population.

**Product-clarity finding:** Engineering Work `state` is currently the only visible progress field and may be misread as the lifecycle of the referenced product package. That remains bounded debt. It is not a license to invent a second lifecycle field in this package.

---

## 6. EWP decision

An earlier stale discovery proposed a derived **Engineering Work Projection (EWP)** (source repo, source work ID, source status, source path, observation metadata).

**Not required by current evidence.**

Current Engineering Work already is the operational record. Repository references already are the seam to product artifacts.

Implementing EWP now would risk duplicating Engineering Work, splitting continuation from observation, and creating another representation of the same outcome.

**Do not implement EWP.**

---

## 7. Repository-reference finding

Contracted metadata includes `artifactIdentifier`, `sourceLocation`, `authority`, `referenceStatus`, optional `commitHash`, and `lastReviewedAt`. Detail UI presents references as read-only and states that source repositories remain authoritative.

Create/update Engineering Work mutations **do not** write repository-reference rows ([ENGINEERING-WORK-005](../engineering/AREDIR-ENGINEERING-WORK-005.md)).

This is the **key bounded extension** for authority-preserving retrospective *and* live citation. **This package does not implement it** and does **not** authorize implementing it before the live UAT experiment (§13–§14).

---

## 8. Relationship finding

AlignFit already records:

```text
003A → 003B
003C → 003C-R1
003D → 003D-R1 → 003D-R2
003E → 003F
```

Aredir cannot currently store that graph. Those relationships remain authoritative in AlignFit. Do **not** create a second relationship graph for historical reconstruction. Work-to-work support remains a bounded product gap ([relationship model](../engineering/ENGINEERING-WORK-RELATIONSHIP-MODEL.md): documented, not implemented).

---

## 9. Project container

The existing long-lived Workspace **Project** is sufficient. AlignFit’s existing Aredir Project remains the container.

**Not introduced:** Engagement, Initiative, Epic, parent Mission, portfolio-as-container.

---

## 10. Mission decision

Engineering Missions remain repository documentation / orientation artifacts. They are **not** part of the operational continuation query ([WORKSPACE-OPERATIONAL-002](./WORKSPACE-OPERATIONAL-002_WORKSPACE_CONTINUATION_CONTRACT.md)).

Do **not** create a retrospective Closed Mission for the Nutrition sequence. That would be historically false.

A future live Mission **may** be useful for intentionally pursued work. It is **not** required to represent this historical sequence. This package does not create Missions.

---

## 11. Workspace-memory boundary

| Layer | Role |
| --- | --- |
| **Project** | Durable operational container |
| **Engineering Work** | Operational outcome, state, next action |
| **Workflow context** | Workflow-specific structured operational information (Defect Context today) |
| **Notes / documents / prompts / milestones** | Project memory |
| **Mission** | Repository-level orientation / governance |
| **Product work package** | Authoritative implementation/engineering artifact in the owning repository |

The existing “Nutrition QA stabilization” prompt **remains project memory**. It must not be reinterpreted as NUTRITION-UX-003 history.

---

## 12. Operational continuation

Continuation ([WORKSPACE-OPERATIONAL-003](../engineering/WORKSPACE-OPERATIONAL-003_OPERATIONAL_WORKSPACE_ENTRY_EXPERIENCE.md)) operates on **non-terminal** Engineering Work (`active` or `in_review`) in an eligible Project (`active` or `testing`), with a non-empty next action and no recorded condition.

Completed historical Engineering Work **does not** appear as work to continue. That is **desirable**: history is context; live Engineering Work drives current action.

Proposed work is captured, not continuation. Create ≠ Authorize ≠ Activate remains a governance distinction to test in live use (§14), not to bypass in this document.

---

## 13. Live AlignFit Nutrition manual UAT experiment

The next planned real-world validation is an upcoming AlignFit Nutrition **manual UAT**. It has **not** occurred.

Aredir can now be present from the beginning:

```text
Create Engineering Work in the existing AlignFit Project (Proposed)
        ↓
evaluate whether authorize / activate is meaningful in current product
        ↓
perform manual Nutrition UAT
        ↓
capture observations / findings
        ↓
author authoritative AlignFit artifact/package when warranted
        ↓
reference that artifact from Engineering Work
        ↓
implementation (AlignFit)
        ↓
verification (AlignFit evidence; Aredir cites)
        ↓
Completed / Closed
```

Aredir owns the operational record. AlignFit owns the resulting product artifact.

**Do not prejudge the live test.** Do not implement Verification-workflow intake, repository-reference writes, or other bounded gaps first merely because they are known to be missing. Discover naturally where current Aredir helps and where it resists.

---

## 14. Create ≠ Authorize ≠ Activate

For the upcoming UAT, do **not** automatically create the Engineering Work as Active.

Begin as **Proposed** and evaluate whether current product makes authorization/activation meaningful and usable. If the distinction feels artificial in actual use, record that as **Aredir product evidence** rather than bypassing it preemptively.

The Engineering Work lifecycle contract still distinguishes Proposed (captured, not undertaken) from Active (underway). Continuation correctly excludes Proposed.

---

## 15. Cross-repository boundaries

This decision **does not** transfer responsibilities:

| Repository | Remains authoritative for |
| --- | --- |
| `aredirlabs-com` | Aredir product behavior and cross-project operational environment |
| `align-fit` | AlignFit product engineering artifacts and evidence |
| `aredir-quality-systems` | AQSF / AVF and reusable quality methods |
| `aredir-project-bootstrap` | Bootstrap / packaging |

Those repositories are **unmodified** by this package. Defect Context `evidence` is investigation text, not an AVF absorption.

---

## 16. Bounded product gaps (findings, not authorization)

1. Repository-reference write path (create/edit through normal application mutations).
2. Work-to-work relationship support.
3. Clearer distinction between Aredir operational `state` and referenced artifact lifecycle.
4. Terminal Engineering Work currently still requiring a next-action representation on create/edit.
5. Deferred workflow-specific intake experiences (including Verification).

---

## 17. Explicit non-authorizations

This package does **not** authorize:

- repository-reference mutations
- work-to-work relationship schema or UI
- retrospective Nutrition Engineering Work population
- EWP implementation
- Mission creation (retrospective or live)
- Verification-workflow intake implementation
- schema or application changes
- changes to AlignFit, Quality Systems, or Bootstrap
- copying the stale unmerged discovery into `main`

---

## 18. Recommended next validation

**LIVE ALIGNFIT NUTRITION MANUAL UAT THROUGH CURRENT ENGINEERING WORK**

Do not recommend retrospective Nutrition population as the immediate next action. Do not recommend EWP. Do not implement the bounded gaps first.

---

## 19. Authority confirmation

| Repository | Role this package | Modified? |
| --- | --- | --- |
| `aredirlabs-com` | Discovery record + index cross-links | **Yes** — documentation only |
| `align-fit` | Case-study SoR (read-only) | **No** |
| `aredir-quality-systems` | Sibling method authority | **No** |
| `aredir-project-bootstrap` | Packaging authority | **No** |

---

## Related

- [Engineering Work Domain Contract](../engineering/ENGINEERING-WORK-DOMAIN-CONTRACT.md)
- [Engineering Work Repository Reference Contract](../engineering/ENGINEERING-WORK-REPOSITORY-REFERENCE-CONTRACT.md)
- [Engineering Work Lifecycle](../engineering/ENGINEERING-WORK-LIFECYCLE.md)
- [WORKSPACE-OPERATIONAL-003](../engineering/WORKSPACE-OPERATIONAL-003_OPERATIONAL_WORKSPACE_ENTRY_EXPERIENCE.md)
- [AREDIR-DISCOVERY-003](./AREDIR-DISCOVERY-003_ENGINEERING_OPERATIONS_ARCHITECTURE.md)
- [Engineering Mission Contract](../missions/ENGINEERING-MISSION-CONTRACT.md)
