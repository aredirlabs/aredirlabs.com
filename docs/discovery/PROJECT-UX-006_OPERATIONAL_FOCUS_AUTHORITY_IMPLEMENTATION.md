# PROJECT-UX-006 — Operational Focus Authority Implementation

| Field | Value |
| --- | --- |
| **Package** | PROJECT-UX-006 (Package 2) |
| **Type** | Implementation record |
| **Status** | **COMPLETE** |
| **Date opened** | 2026-08-23 |
| **Date closed** | 2026-08-23 |
| **Governing architecture** | AREDIR-DISCOVERY-012, PROJECT-UX-004, PROJECT-UX-005 |

---

## Final disposition

**PROJECT-UX-006 Package 2 — Operational Focus Authority is COMPLETE.**

All defined Package 2 acceptance criteria are satisfied across static/automated verification, migration application, Phase C lifecycle validation, PostgreSQL acceptance, dev residue cleanup with harness remediation, and authenticated operator/browser acceptance on legitimate Engineering Work.

Package 2 scope is closed. **Package 3 may now be considered/authorized as separate bounded Engineering Work.** Package 3 was not started in this closure update.

---

## Acceptance evidence by layer

| Layer | Scope | Disposition |
| --- | --- | --- |
| **Operator / browser** | Authenticated UI on legitimate dev data | **Verified** — Add, Remove, singleton Project projection, Workspace independence |
| **PostgreSQL / database** | `test:db:operational-focus` + cleanup + harness | **Verified** — command matrix, constraints, invalidation, concurrency (with documented transport limits) |
| **Automated / static** | Unit tests, migration structure, build, projection contracts | **Verified** — 134/134 tests, build success, migration 0007 applied |
| **Browser not reproduced** | Plural focus, Replace, stale command, provenance UI, completion invalidation UI, >20-event pagination | **Supported at lower layers** — not required for Package 2 closure |

---

## Current legitimate dev state (post-cleanup)

Operational-focus validation residue was physically removed from the authorized dev database (`ep-green-sunset-a6w06qwf` / `br-wandering-snow-a60tz3pl`).

Post-cleanup:

- Only legitimate Projects remain (`proj_01`–`proj_04`: AlignFit, AredirLabs.com, ClassForge, LeagueOS).
- Synthetic validation Projects, Engineering Work, focus selections, focus events, and history were removed.
- Append-only protections were temporarily disabled only for dev cleanup, then restored and reverified.
- The remediated DB harness prevents ordinary dev contamination (`focus_val_%` preflight, rollback-only ordinary scenarios, strict `no_residue_on_normal_dev`).
- Committed concurrency scenarios require a distinct `VALIDATION_DATABASE_URL` or are **SKIP**ped on normal dev.
- Normal dev browser behavior resumed against legitimate data.

No synthetic Engineering Work was created for browser acceptance.

---

## Operator / browser acceptance

**Legitimate Engineering Work:** EDITOR-001 — Unified Engineering Content Editor (existing Proposed work, legitimately activated through normal authenticated authorization).

**Activation rationale:** “Begin EDITOR-001 as active Engineering Work to address the growing need for consistent, constrained authoring and rendering across operational content surfaces.”

**Decision basis:** “Current Engineering Work, Defects, Documents, and other operational surfaces demonstrate recurring content-formatting and editing needs. Recent authenticated Workspace evaluation further confirms that a reusable constrained content model and editing experience is now appropriate to investigate.”

**Post-activation:** lifecycle **ACTIVE**; Engineering Objective unchanged; Recommended Next Action unchanged; Operational Focus control available; no activation error.

EDITOR-001 remains **Active** and **focused** as legitimate current operating state (re-added after deselection acceptance).

### Engineering Work detail — Add to operational focus

| Check | Result |
| --- | --- |
| Initial state | SHARED PROJECT OPERATIONAL FOCUS — NOT FOCUSED |
| Operator action | Add to operational focus |
| Focus state | FOCUSED |
| Control | Remove from operational focus |
| Lifecycle | ACTIVE (unchanged) |
| Recommended Next Action | Unchanged |
| Errors | None |
| Semantics | Focus explicitly distinct from lifecycle, continuation, attention, row navigation |

**PASS**

### Project singleton Operational Focus projection

Authenticated AredirLabs.com Project page showed:

- **Operational focus** — Current Selection Authority (1)
- Focused item: EDITOR-001 — Unified Engineering Content Editor
- Authoritative next action displayed for focused Work
- **Project Next-Step Projection** displayed the same next action with explicit derivation: “Derived from the single operationally focused Work's authoritative next action.”
- Focus selection history reported the expected selection event

**PASS** — singleton projection; no duplicate Project authority.

### Operator deselection — Remove from operational focus

| Check | Result |
| --- | --- |
| Operator action | Remove from operational focus |
| Focus removed | Yes |
| Lifecycle | ACTIVE (unchanged) |
| Next action | Intact |
| Automatic successor | None |
| Lifecycle side effect | None |

**PASS** — EDITOR-001 subsequently re-added to focus (legitimate operating state).

### Workspace independence

With EDITOR-001 Active and focused, authenticated Workspace showed:

- **Meaningful Continuation:** Continue — EDITOR-001 — Unified Engineering Content Editor
- Explanation: “Active Engineering Work in an active Project with an explicit current next action.”
- **Attention:** empty — “No supported engineering conditions currently require awareness.”

**Semantic result:** Workspace continuation did **not** claim EDITOR-001 because it was operationally focused.

**PASS** — lifecycle, continuation, Operational Focus, and attention remain independently derived; Package 2 did not turn focus into ranking, continuation, recommendation, assignment, or attention.

### Browser scenarios intentionally not reproduced

The following were **not** exercised in browser acceptance and are **not** required for Package 2 closure (lower-layer evidence suffices):

| Scenario | Supporting layer |
| --- | --- |
| Plural focus | PostgreSQL rollback matrix; projection unit tests |
| Replace | PostgreSQL rollback matrix; replace-plan unit tests |
| Stale command | PostgreSQL stale `focus_version` acceptance |
| Provenance rejection (UI) | PostgreSQL CHECK rejection |
| Concurrent transaction behavior | PostgreSQL concurrency suite (see database section) |
| Completion invalidation (UI) | PostgreSQL completion invalidation acceptance |
| >20-event history pagination | Static/UI pagination implementation; DB append-only history |

---

## PostgreSQL / database acceptance

**Migration:** `0007_operational_focus.sql` applied to authorized dev database.

**Phase C lifecycle validation:** passed (pre-existing record).

**Suite:** `npm run test:db:operational-focus` (`scripts/validate-operational-focus-package-2.ts`)

### Executed scenarios (normal dev, rollback-only where applicable)

| Scenario | Result |
| --- | --- |
| Schema baseline (0007 objects, triggers) | PASS |
| Membership zero / one / multiple | PASS (rollback batch) |
| Add | PASS |
| Remove | PASS |
| Replace | PASS |
| Identical Replace no-change | PASS |
| Duplicate target rejection | PASS |
| Clear | PASS |
| Stale `focus_version` zero mutation | PASS |
| Cross-Project Work rejection | PASS |
| Invalid provenance / NULL human branch rejection | PASS |
| Focus-event UPDATE rejection | PASS |
| Focus-event DELETE rejection | PASS |
| Selection UPDATE rejection | PASS |
| Selection DELETE via legitimate Remove | PASS |
| Completion-driven focus invalidation | PASS |
| No automatic successor | PASS |
| Concurrent Add vs completion | PASS (prior run; see transport note) |
| Concurrent Replace vs completion | PASS (prior run) |
| Concurrent Remove vs completion | PASS (prior run) |
| Concurrent Clear vs completion | PASS (prior run) |
| No residue on normal dev | PASS (remediated harness) |

### Concurrency transport (accurate characterization)

Prior concurrency acceptance used:

- Separate `@neondatabase/serverless` `neon()` HTTP clients (parallel pooler connections).
- Each mutating path in its own transaction ending with forced rollback via exception.
- **Opportunistic** lock contention timing — not deterministically interleaved, because interactive WebSocket lock-hold barriers were unavailable without WebSocket `Pool` + `ws`.

The **remediated harness** skips committed concurrency scenarios on normal dev unless `VALIDATION_DATABASE_URL` points at a disposable branch distinct from `DATABASE_URL`. Those skips are **not** a regression of previously obtained evidence; they prevent re-contamination of the operational dev dataset.

### Dev residue cleanup

**Script:** `npm run test:db:cleanup:operational-focus-residue`

Physical removal of 16 validation Projects and associated graph (32 EW, 50 focus events, 74 history, 5 selections) via dev-only temporary disable of append-only DELETE triggers on focus events and EW history only, FK-safe delete order, immediate trigger restoration, append-only reverification.

**Harness remediation:** preflight guard, rollback-only ordinary scenarios, strict `no_residue_on_normal_dev`, concurrency isolation to `VALIDATION_DATABASE_URL`.

---

## Automated / static acceptance

| Check | Result |
| --- | --- |
| `npm test` | **134/134 pass** (includes operational-focus, migration-structure, projection, persistence contract tests) |
| `npm run build` | **Success** |
| Migration 0007 apply | **Applied** (dev) |
| Unified lock-order contracts (N-01) | Static CTE dependency tests pass |
| Replace target-set semantics (F-05) | Unit tests pass |
| History pagination (F-06) | Static/UI implementation verified |
| Projection purity (F-11) | Unit tests pass — focus does not alter continuation eligibility |

---

## Nonblocking UX observation (not a Package 2 defect)

The Project Operational Focus projection functions correctly, but current Project-detail composition places it **below a large Engineering Work inventory**. As legitimate Engineering Work accumulates, this materially reduces Operational Focus's usefulness as an immediate Project operating signal and contributes to excessive vertical scrolling.

This runtime observation reinforces already-proposed collection/detail architecture work (operational context prioritization, continuation, status, filtering, search, bounded inventory presentation). **Not remediated in PROJECT-UX-006.** Preserved as downstream UX evidence. Do not expand into Package 3+ from this record.

---

## Remaining explicit limitations

| Limitation | Impact on Package 2 closure |
| --- | --- |
| Concurrency timing non-deterministic on HTTP Neon clients | Documented; prior PASS retained; harness isolates future runs |
| Committed concurrency requires disposable branch on re-run | SKIP on normal dev without `VALIDATION_DATABASE_URL` — by design |
| Browser not exercised for plural/replace/stale/completion/pagination | Lower-layer evidence sufficient per acceptance boundary |
| Project-detail vertical placement of Operational Focus | Nonblocking UX observation; downstream work |

No open Package 2 implementation defect identified from operator evidence.

---

## Package 3 authorization

**Package 2 is complete.**

**Package 3 may now be considered/authorized** as separate bounded Engineering Work under PROJECT-UX-006's governing discovery. Package 3 was **not** started in this closure update.

---

## Historical remediation record (audit trail)

| Review | Decision | Outcome |
| --- | --- | --- |
| First SOL | REMEDIATE | F-01–F-09 (first pass) |
| Second SOL | REMEDIATE | N-01 partial, F-04/F-05/F-06, N-02 |
| Third SOL (pre-migration) | DO NOT APPLY | N-01 lock inversion, F-04 NULL/append-only gaps — **subsequently remediated and runtime-verified** |

Third remediation (2026-08-23) applied unified Work→Project→selection lock protocol (N-01), NULL-safe provenance CHECKs, append-only focus events and selection no-UPDATE triggers, Replace target-set semantics, and history pagination. Runtime PostgreSQL acceptance and operator acceptance subsequently closed all remaining gaps.

---

## Recommended commit message (if committing this closure)

```
docs(PROJECT-UX-006): close Package 2 Operational Focus Authority as COMPLETE

Record authenticated operator acceptance, PostgreSQL acceptance, cleanup/harness
remediation, and final disposition. Package 3 authorized separately; not started.
```
