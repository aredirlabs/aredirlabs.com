# AREDIR-DISCOVERY-011 — Engineering Work Prioritization and Operational Selection Semantics

| Field | Value |
|-------|-------|
| **Work item** | AREDIR-DISCOVERY-011 |
| **Scope** | Semantic model for priority, operational focus, selection, continuation, attention, and execution readiness |
| **Review date** | 2026-08-22 |
| **Depends on** | AREDIR-DISCOVERY-010 (Project Operational State Authority and Projection Architecture) |
| **Trigger** | Package 3: resolve the missing selection semantics identified in DISCOVERY-010 |
| **Outcome** | Semantic definitions, invariants, decision matrix, and DISCOVERY-010 reconciliation; no runtime or schema changes |

---

## 1. Executive Summary

This package investigates how Aredir should express what matters now when multiple truthful Engineering Work records coexist, without turning Engineering Work into a conventional ticket backlog.

**Core findings:**

1. **Engineering Work `priority` exists** as a nullable free-text field (`schema.ts:325`). It has **no enum, no fixed scale, no active editor, no query usage, no sorting behavior, no mutation tracking in history, and no seed data** (all null). The domain contract classifies it as "Optional — no fixed scale in baseline." The field is **optional, non-operational advisory metadata with undefined semantics**. No operational priority model is justified by current evidence. Whether Aredir eventually needs a structured importance concept remains deferred until demonstrated by operating use.

2. **The continuation system is explicitly not a ranking algorithm.** The Workspace Continuation Contract (`WORKSPACE-OPERATIONAL-002`) states: "The first-generation algorithm is intentionally not a ranking algorithm." It excludes priority from continuation decisions, states that `updatedAt` is only a "temporary presentation tiebreaker," and says "Project or Work `priority`, lifecycle rank, Project focus prose, milestone order, and Mission registry position do not break ties."

3. **The system already handles ambiguity correctly.** When multiple valid continuation candidates exist, the workspace renders an "ambiguous" mode with explicit text: *"Several valid things can continue. Current engineering state does not justify choosing one on your behalf."* This is the architecturally honest response.

4. **Operational focus is a distinct authority concept.** Focus means: "For this Project, this Engineering Work currently receives deliberate operational emphasis." It requires an explicit operator selection event. It is not derivable from priority, state, recency, or continuation eligibility. Focus is semantically distinct from continuation, attention, priority, and `currentNextAction`.

5. **Focus may be singular or plural.** There is no architectural requirement that a Project have exactly one focus. The assumption of singular focus was an artifact of the current singular `currentFocus` text field, not an engineering requirement.

6. **Focus selection and current operational focus are related but distinct.** An explicit selection record and its current operational projection are not necessarily identical over time. Lifecycle changes may alter operational eligibility without inventing deselection events. Selection history must remain truthful.

7. **Shared-vs-per-operator focus is a blocking architectural question.** Whether Project focus is shared Project state or per-operator state produces fundamentally different authority models. This must be resolved before persistence design.

8. **Recommendation is permitted, not required.** Aredir may eventually recommend focus without making the recommendation authoritative. But a recommendation system is not required for the baseline focus mechanism. Valid operation remains: evidence → explicit selection → authoritative selection state.

9. **DISCOVERY-010's `currentFocus` and `nextStep` are partially resolvable.** `currentFocus` should become operator-selected focus (possibly plural). `nextStep` may become derived from a single currently operational focus's `currentNextAction`, but exact projection eligibility depends on Package 4 focus lifecycle semantics. Both remain partially deferred.

**Strongest invariant:** Aredir preserves the distinction between Engineering Work as durable operational artifacts and Project as an orientation and coordination surface. Priority, focus, and selection serve the Engineering Operating System — they must not redefine it as a ticket tracker.

---

## 2. Package 2 Baseline

Package 2 (AREDIR-DISCOVERY-010) established:

- Project `status` and `stage` remain Project-authoritative.
- Project `currentFocus` — independent authority rejected; final disposition deferred pending selection semantics.
- Project `nextStep` — independent authority rejected; singular projection deferred pending selection semantics.
- A singular Project focus cannot be truthfully derived from multiple eligible Engineering Work records until Aredir defines sufficient prioritization, selection, or coordination semantics.
- Multiple active or continuation-eligible Engineering Work records remain multiple valid operational facts.
- Recency, state ordering, and incidental query ordering are not sufficient architectural semantics for Project focus.
- Focus differs from next action: focus concerns selection/emphasis among work; next action concerns the next step within a work item.
- Null is a truthful operational state.
- Performance optimization requires evidence.

This package investigates the missing architecture that Package 2 identified as the primary unresolved dependency.

---

## 3. Scope and Method

### Scope

All concepts that determine what deserves operational emphasis when multiple Engineering Work records coexist:
- Priority (existing field and its semantic meaning)
- Operational focus (what receives deliberate emphasis)
- Selection (how focus is established)
- Continuation (what can resume execution)
- Attention (what requires awareness)
- Execution readiness (what can be acted upon now)
- The relationship between these concepts
- How they interact with lifecycle, dependencies, milestones, and Project status
- Operator agency and recommendation vs. authority
- Historical semantics for focus and priority changes

### Method

1. Inspect schema, queries, seed data, continuation logic, attention logic, and lifecycle documentation for existing priority/selection semantics
2. Examine the Workspace Continuation Contract for explicit architectural decisions about ranking and priority
3. Evaluate EOS principles and documentation philosophy for alignment
4. Test each concept against scenarios that expose semantic requirements
5. Produce explicit definitions, invariants, and decision matrix

---

## 4. Existing Priority/Selection Inventory

### Engineering Work `priority` field

| Attribute | Finding | Evidence |
|-----------|---------|----------|
| Schema type | `text("priority")` — nullable free-text | `schema.ts:325` |
| Enum/values | **None.** No enum, no fixed scale | Schema inspection |
| Default | `null` (implicit) | Schema inspection |
| Seed data | `priority: null` for all seed Engineering Work records | `seed.ts:99` |
| Query usage | Fetched in `getProjectEngineeringWorkById` but never filtered, sorted, or used in logic | `queries.ts:363` |
| Sorting behavior | **None.** `getProjectEngineeringWork` sorts by `updatedAt desc`, not priority | `queries.ts:344` |
| UI usage | Not rendered in workspace page, continuation, or attention | `page.tsx` inspection |
| Mutation path | No server action updates priority | `actions.ts` inspection |
| History tracking | Priority changes are **not tracked** in `workspaceEngineeringWorkHistory` | Schema inspection — history tracks state, title, type, objective, nextAction, outcome, condition, conditionRationale, finalDisposition, but not priority |
| Continuation interaction | **Excluded.** Continuation contract explicitly excludes priority from tie-breaking | `WORKSPACE-OPERATIONAL-002:224` |
| Attention interaction | **None.** Attention is based on conditions, not priority | `workspace-operational.ts:83-98` |
| Lifecycle interaction | **None.** Priority does not affect state transitions | `engineering-work.ts` inspection |
| Domain contract classification | "Optional — no fixed scale in baseline" | `ENGINEERING-WORK-DOMAIN-CONTRACT.md:39` |
| Real records using it | **None found.** All seed data sets null | Seed inspection |

**Conclusion:** The `priority` field is **optional, non-operational advisory metadata with undefined semantics**. It exists in schema but has no operational semantics, no governance, no mutation path, no query usage, and no real data. It is not used for sorting, filtering, selection, continuation, attention, or lifecycle decisions. No operational priority model is justified by current evidence. Whether Aredir eventually needs a structured importance concept remains deferred until demonstrated by operating use.

### Project `currentFocus` / `nextStep`

| Attribute | Finding | Evidence |
|-----------|---------|----------|
| Schema type | `text("current_focus")`, `text("next_step")` — nullable free-text | `schema.ts:98-99` |
| Seed data | Set per-project in seed | `seed.ts:35,48,61,75` |
| Mutation path | **None.** No server action updates these fields | `actions.ts` inspection |
| Query usage | Read in workspace page as fallback | `page.tsx:275` |
| Continuation interaction | **Excluded.** Continuation contract says "Orientation only; never ranking evidence" | `WORKSPACE-OPERATIONAL-002:116` |
| Authority status (DISCOVERY-010) | Independent authority rejected; deferred pending selection semantics | `DISCOVERY-010` |

**Conclusion:** These fields are **independently maintained operational duplicates** without update mechanisms. DISCOVERY-010 correctly rejected their independent authority.

### Continuation selection

| Attribute | Finding | Evidence |
|-----------|---------|----------|
| Selection algorithm | **Not a ranking algorithm.** Generates eligible candidates from operating Projects | `WORKSPACE-OPERATIONAL-002:188` |
| Tie-breaking | `updatedAt desc` then `id asc` — "temporary presentation tiebreaker" only | `workspace-operational.ts:135-138` |
| Priority in tie-breaking | **Explicitly excluded.** "Project or Work `priority`, lifecycle rank, Project focus prose, milestone order, and Mission registry position do not break ties." | `WORKSPACE-OPERATIONAL-002:224` |
| Projection modes | `none`, `single`, `ambiguous` | `workspace-operational.ts:158` |
| Ambiguous behavior | Shows bounded set with "Several valid things can continue. Current engineering state does not justify choosing one on your behalf." | `page.tsx:82-83` |
| Display limit | 3 candidates | `workspace-operational.ts:1` |

**Conclusion:** The continuation system is **eligibility-based, not importance-based**. It correctly preserves ambiguity when multiple candidates exist.

### Attention

| Attribute | Finding | Evidence |
|-----------|---------|----------|
| Sources | Conditioned Work, incomplete Defect Context, blocked Milestones | `queries.ts:228` |
| Priority interaction | **None.** Attention is based on conditions, not priority | `workspace-operational.ts:83-98` |
| Relationship to focus | Orthogonal. Attention does not determine focus | Architecture analysis |

**Conclusion:** Attention is a **condition-based awareness signal**, not an importance ranking.

---

## 5. Priority Semantics

### What priority could mean

Priority is commonly understood as "relative importance of one item compared with others." But this meaning conflates several distinct concepts:

| Concept | Meaning | Example |
|---------|---------|---------|
| **Business importance** | Value to the organization or users | Revenue impact, user satisfaction |
| **Engineering importance** | Technical significance or foundational nature | Architecture decision, core infrastructure |
| **Urgency** | Time sensitivity | Deadline approaching, production incident |
| **Sequence** | Order of execution | Must complete A before B |
| **Operator preference** | What the human wants to work on now | Personal interest, energy level |
| **Risk** | Consequence of not doing | Security vulnerability, data loss |
| **Impact** | Scope of effect if completed | Affects many users, enables many features |

A single priority field silently means several different things. This is the fundamental problem with priority as typically implemented.

### What priority should mean in Aredir

Aredir's Engineering Operating System treats Engineering Work as **durable engineering activity** — not interchangeable tickets. The EOS lifecycle (Evaluate → Architecture → Finding → Work Package → Implementation → Verification → Documentation → Release → Knowledge Capture → Promotion) does not have a "prioritize backlog" stage.

The Workspace Continuation Contract explicitly excludes priority from operational decisions:

> "Project or Work `priority`, lifecycle rank, Project focus prose, milestone order, and Mission registry position do not break ties."

This is an architectural statement: **priority is not an operational concept in Aredir's current model.**

### Recommended classification

The `priority` field on Engineering Work should be reclassified as:

**Optional, non-operational advisory metadata with undefined semantics.**

This classification means:
- It is optional (nullable, no default requirement)
- It is non-operational (not used for sorting, filtering, selection, continuation, attention, or lifecycle)
- It is advisory (human-authored free-text note about perceived importance)
- It is semantically undefined beyond human-provided context (no enum, no fixed scale)
- It is not tracked in history
- It may be useful for human reference but must not drive system behavior
- It should not be expanded into an enum or fixed scale without demonstrated operational need
- Its eventual disposition remains deferred

### Does current evidence justify an operational priority model?

**No.** The current `priority` field has no operational semantics. The evidence:

1. The continuation system is explicitly not a ranking algorithm
2. Focus is an operator selection, not a derivation from priority
3. Attention is condition-based, not importance-based
4. The EOS lifecycle does not include a prioritization stage
5. No real Engineering Work records use the field
6. The domain contract already classifies it as "Optional"
7. The field has no mutation path, no history tracking, no query usage

Whether Aredir eventually needs a structured importance/priority concept remains **deferred until demonstrated by operating use**. The scenarios in this document (e.g., strategically important work, urgent defects, risk-bearing items) demonstrate that importance concepts may matter to future operator decisions — but that does not prove the current field should become operational or that any future importance model would use this field.

---

## 6. Focus Semantics

### What focus means

Focus is a **Project-level coordination concept**: the deliberate choice that a specific Engineering Work item (or items) currently receives operational emphasis within a Project.

Focus answers: **"Which work matters most right now for this Project?"**

This is distinct from:
- **Priority** — which work is most important in some absolute sense
- **Next action** — what should happen next within a specific work item
- **Continuation** — which work is eligible to resume execution
- **Attention** — which work requires awareness due to conditions

### Focus is operator-selected, not system-derived

Focus represents a human judgment: "I am choosing to emphasize this work right now." This judgment may be influenced by priority, deadlines, dependencies, mood, energy, or other contextual factors — but the selection itself is a human act.

The system may **recommend** focus based on continuation eligibility, conditions, or other signals. But the recommendation does not become authoritative until the operator confirms it. Recommendations are permitted but not required for the baseline focus mechanism.

### Focus is Project-relative

Focus exists within a Project context. The same Engineering Work may be focused in one Project and unfocused in another (though cross-Project Work is rejected in baseline). Focus is not a global concept.

### Focus may be singular or plural

There is no architectural requirement that a Project have exactly one focused item. The assumption of singular focus was an artifact of the current singular `currentFocus` text field, not an engineering requirement.

A Project may have:
- **Zero focused items** — no deliberate emphasis; valid operational state
- **One focused item** — clear single emphasis
- **Multiple focused items** — parallel intentional emphasis (e.g., active delivery + urgent defect fix)

The system should support all three without inventing precedence.

### Focus is temporary and contextual

Focus changes as circumstances change. An item may be focused today and unfocused tomorrow. Focus does not imply permanence.

### Focus does not require a priority field

Focus is established by operator selection, not by priority ranking. An operator may focus a low-priority item because of timing, dependency, validation, or incident response. Priority may inform focus selection but does not determine it.

---

## 7. Selection Semantics

### What selection means

Selection is the act of designating one or more Engineering Work items as the current operational focus for a Project.

Selection answers: **"For this Project, which Engineering Work currently receives deliberate operational emphasis?"**

### Selection requires an explicit event

Selection is not derivable from Engineering Work state, priority, recency, or continuation eligibility. It requires an explicit operator action — a deliberate choice.

If authoritative focus selection exists, Aredir must persist sufficient evidence to identify the current authoritative selection and reconstruct meaningful selection history. The exact persistence mechanism (current-state, event-sourced, or hybrid) is deferred to Package 4.

### Selection is not continuation

Continuation is eligibility-based: "This work can resume execution." Selection is emphasis-based: "This work deserves my attention right now." An item can be continuation-eligible but not focused, and focused but not continuation-eligible (e.g., if it develops a condition).

### Selection may be influenced by system recommendations

The system may compute: "Based on current state, this appears to be the best work to continue." This is a recommendation, not a selection. The operator confirms or rejects the recommendation.

The recommendation layer is optional and must not become authoritative without operator confirmation. Valid operation without a recommendation layer remains: evidence → explicit selection → authoritative selection state.

### Selection history vs. operational projection

An explicit focus selection and its current operational projection are related but distinct concepts:

- **Selection history** records what operators explicitly selected or deselected. It must remain truthful: the system must not fabricate deselection events merely because underlying work changes lifecycle state.
- **Operational projection** determines which selections should currently appear as active operational focus given Project and Engineering Work state. A completed work item may become ineligible for operational projection while the original selection record remains intact.

For example: An operator selects Work A on Monday. Work A completes on Tuesday. The operator does not select Work B until Wednesday. The selection history shows A remained the last explicit selection until Wednesday. The operational projection may show no current focus between completion and the new selection.

---

## 8. Continuation Semantics

### What continuation means

Continuation answers: **"Which Engineering Work is eligible to resume execution right now?"**

Continuation is a strict eligibility projection based on:
- Project status (`active` or `testing`)
- Work state (`active` or `in_review`)
- Field presence (title, summary, currentNextAction)
- Condition absence (no recorded condition)
- Workflow completeness (defect context complete for defects)

### Continuation is not focus

| Aspect | Continuation | Focus |
|--------|-------------|-------|
| Question | What can I work on? | What should I work on? |
| Basis | Eligibility criteria | Operator selection |
| Multiplicity | Multiple candidates possible | Singular or plural |
| Persistence | Computed at query time | Persisted as selection |
| Ranking | Explicitly not ranked | May be ordered by operator |
| System role | Determines what is possible | Supports what is chosen |

### Continuation is not priority

Continuation eligibility does not indicate importance. A low-priority item can be continuation-eligible. A high-priority item can be continuation-ineligible (e.g., if it has a condition).

### Continuation preserves ambiguity

When multiple candidates exist, the system shows an "ambiguous" set. It does not choose one. This is the architecturally honest response.

### Continuation may inform focus recommendations

The system may recommend: "These items are continuation-eligible; consider focusing on one." But the recommendation does not determine focus.

---

## 9. Attention Semantics

### What attention means

Attention answers: **"Which Engineering Work or Milestones require awareness or intervention?"**

Attention is a condition-based signal, not an importance ranking.

### Attention sources

| Source | Condition | Signal |
|--------|-----------|--------|
| Engineering Work with nonblank condition | Blocked or constrained | Actionability uncertain |
| Active/In Review Defect missing context | Incomplete defect data | Data integrity concern |
| Blocked Milestone in operating Project | Milestone state is blocked | Planning checkpoint requires awareness |

### Attention is orthogonal to priority and focus

| Scenario | Priority | Focus | Attention |
|----------|----------|-------|-----------|
| Low-priority defect becomes blocked | Low | Not focused | Yes — condition requires awareness |
| High-priority architecture work with no conditions | High | May be focused | No — no attention condition |
| Focused work develops a condition | Any | Focused | Yes — focused work can attract attention |
| Unfocused work develops urgent condition | Any | Not focused | Yes — condition requires attention |

Attention does not mean "highest priority." Attention means "requires awareness."

### Attention does not determine focus

A blocked item attracts attention but does not automatically become focused. The operator decides whether the blocked item deserves focus based on context.

---

## 10. Execution Readiness

### What execution readiness means

Execution readiness answers: **"Which Engineering Work can actually be acted upon now?"**

### Is execution readiness already represented?

Yes. The continuation system already determines execution readiness through its eligibility criteria:

- Project is `active` or `testing`
- Work is `active` or `in_review`
- Required fields are present
- No recorded condition
- Workflow completeness (defect context)

This is execution readiness. It is already operational.

### Does Aredir need a separate execution readiness concept?

**No.** The continuation eligibility criteria already capture execution readiness. A separate concept would be redundant.

The distinction between continuation and execution readiness is:
- **Continuation** = what can resume execution (eligibility)
- **Execution readiness** = what can be acted upon now (same criteria)

They are the same concept with different names. The continuation system is sufficient.

---

## 11. Priority vs. Focus

This distinction is critical. Priority and focus answer different questions.

### Scenario A

> Work A = strategically most important. Work B = lower priority but currently being validated.

**Can Work B be Project focus while Work A remains higher priority?**

Yes. Focus is operator selection, not priority ranking. The operator may legitimately focus on validation (Work B) while acknowledging that architecture (Work A) is more important. Validation may be time-sensitive, blocking, or simply the operator's current energy match.

Priority and focus diverge when context overrides importance.

### Scenario B

> Work A = highest priority but blocked. Work B = second priority and executable.

**What should Project focus show?**

The system should not automatically determine this. Both are valid choices:
- Focus on Work B (executable, makes progress)
- Focus on Work A (highest priority, even if blocked — keeps it visible)
- Focus on neither (operator is doing something else)

The operator decides. The system may recommend Work B as continuation-eligible, but that recommendation does not determine focus.

### Scenario C

> Work A = high priority architecture discovery. Work B = urgent production defect.

**How should priority, focus, and attention interact?**

- Work B likely has an attention condition (production defect) and may be continuation-eligible
- Work A may be continuation-eligible but not have attention conditions
- Priority may say Work A is more important
- Attention says Work B needs awareness
- Focus is the operator's choice: fix the defect, continue architecture, or both

The system surfaces eligibility and attention. The operator selects focus.

### Scenario D

> Two Engineering Work items are equally important and intentionally progressing in parallel.

**Must Project have one focus?**

No. Multiple focused items is a valid state. The operator is intentionally working on both. The system should support this without inventing precedence.

### Scenario E

> Project is paused. Engineering Work retains priority values.

**Should any item remain operationally focused?**

No. A paused Project has no operational emphasis. Focus is meaningless when the Project is paused. Priority values may exist on the records but have no operational projection.

### Scenario F

> Project has only proposed work.

**Can proposed work be selected as focus, or does focus imply active execution?**

This is **deferred**. The semantic question is whether focus means operational emphasis on work currently underway or deliberate emphasis including intent to begin work. Those are different models. Package 4 should determine whether proposed work can be authoritatively selected as focus, whether it can be selected as intended/next focus but not current operational focus, or whether focus is restricted to operational lifecycle states. The current singular `currentFocus` text field does not resolve this question.

---

## 12. Singular vs. Multiple Focus

### Is singular Project focus an actual engineering requirement?

**No.** The assumption that a Project has one focus was an artifact of the current singular `currentFocus` text field, not an engineering requirement.

### Evidence against mandatory singular focus

1. The workspace continuation system already handles multiple candidates ("ambiguous" mode)
2. The EOS lifecycle supports parallel engineering activity
3. A Project may legitimately have active delivery work and an urgent defect simultaneously
4. The Workspace Continuation Contract says "Two Active Projects, an Active Defect plus Delivery work, or Active work plus In Review work are all ambiguity cases"
5. Forcing singular focus would require arbitrary prioritization, which the system explicitly refuses

### Recommended model

Focus is an **unordered set** of Engineering Work items receiving deliberate operational emphasis:
- **Empty set** — no focus; valid operational state
- **Singleton set** — one focused item
- **Non-singleton set** — multiple focused items; all are equally emphasized

The system should not order or rank focused items. If the operator wants to emphasize ordering, that is a separate explicit action.

### Shared vs. per-operator focus is a blocking dependency

Whether Project focus is shared Project state (this Project collectively emphasizes these items) or per-operator state (this operator currently emphasizes these items within the Project) produces fundamentally different authority models. A hybrid model distinguishing shared Project operational focus from personal working focus is also possible.

This question must be resolved before persistence design. Implementation must not begin until the authority scope of focus is established.

---

## 13. Priority Scope and Cardinality

### Does priority belong globally or project-relative?

An Engineering Work item may be extremely important within AlignFit while meaningless compared to work in Aredir itself. Cross-Project priority comparison has limited valid meaning.

However, since no operational priority model is justified by current evidence, this question is moot. The existing `priority` field is project-scoped (it is on `workspaceEngineeringWork`, which has a `projectId`). If a future importance model were to become operational, project-relative scope would be appropriate.

### What cardinality would priority need?

If a structured importance concept were eventually justified (it is not currently), the semantic form would need to fit Aredir's EOS:

- **Simple ordinal levels** (e.g., high/medium/low) — too coarse, conflates multiple meanings
- **Numeric ranking** — implies false precision, requires maintenance burden
- **Categorical importance** — more honest but still conflates meanings
- **No persistent priority** — the current state, justified by current evidence

The EOS does not currently need a priority enum. Whether this changes remains deferred.

---

## 14. Lifecycle Interaction

### How priority/focus interact with lifecycle states

| Lifecycle State | Can have priority? | Can be focused? | Can be continuation-eligible? |
|----------------|-------------------|-----------------|------------------------------|
| `proposed` | Yes (advisory) | Deferred — see §11 Scenario F | No |
| `active` | Yes (advisory) | Yes | Yes |
| `in_review` | Yes (advisory) | Yes | Yes |
| `completed` | Yes (advisory) | Deferred — see below | No |
| `closed` | Yes (advisory) | No | No |
| `cancelled` | Yes (advisory) | No | No |
| `superseded` | Yes (advisory) | No | No |

### Focus and lifecycle transitions

The relationship between lifecycle changes and focus involves three distinct concepts:

**Selection validity:** Whether an explicit selection record remains true. The system must not fabricate operator deselection events merely because underlying work changes lifecycle state.

**Operational projection eligibility:** Whether a selection should currently appear as active operational focus given Project and Engineering Work state. Completed, cancelled, or superseded work may become ineligible for operational projection while the original selection record remains intact.

**Operator action:** Whether the operator explicitly changes or clears the selection.

The exact persistence and lifecycle behavior must remain deferred to Package 4. What is established:
- Lifecycle changes may alter operational eligibility without inventing deselection, replacement, or transfer events
- A supersession relationship may provide context for an operator or future recommendation, but it must not silently transfer authoritative focus unless later architecture explicitly permits that behavior
- Paused or archived Projects may suppress operational focus projection without altering selection history

---

## 15. Relationship and Dependency Interaction

### How dependencies affect priority and focus

The Engineering Work relationship model defines `depends_on` / `blocks` relationships. These affect **execution order**, not **importance**.

| Relationship | Effect on execution | Effect on importance |
|-------------|--------------------|--------------------|
| A depends on B | A cannot execute until B completes | A is not more important than B |
| A blocks B | B cannot execute until A completes | A is not more important than B |
| B supersedes A | B replaces A | A's importance is irrelevant; B is the successor |
| A validates B | A verifies B's outcome | A is not more important than B |

Dependencies do not change importance. They change readiness.

### Dependencies and focus

Dependencies may influence focus selection: an operator may focus on a blocking dependency to unblock downstream work. But the dependency itself does not determine focus.

---

## 16. Milestone Interaction

### Should milestone association influence priority or focus?

Milestones remain Project-authoritative (DISCOVERY-010). They represent planning checkpoints.

Milestone association should:
- **Provide context** — "this work contributes to milestone X"
- **Inform focus selection** — an operator may focus on milestone-adjacent work
- **Not automatically determine priority** — work near a deadline is not automatically highest priority
- **Not automatically determine focus** — milestone proximity does not mandate focus

The operator decides how milestone context influences focus.

---

## 17. Operator Agency

### Where operator judgment belongs

| Layer | Operator role | System role |
|-------|--------------|-------------|
| **Priority** | Authoritative (if recorded) | Advisory annotation only |
| **Focus selection** | Authoritative | May recommend; cannot determine |
| **Continuation** | N/A (system-determined) | Authoritative (eligibility) |
| **Attention** | N/A (system-determined) | Authoritative (conditions) |
| **Readiness** | N/A (system-determined) | Authoritative (eligibility) |

### The operator decides focus

Aredir is an operating system used by humans with AI assistance. Focus is a human decision. The system may compute signals (continuation eligibility, conditions, milestones), but the operator selects focus.

### The system may recommend focus

Aredir may compute: "Based on current state, this appears to be the best work to continue." This is a recommendation layer. The recommendation must not become authoritative without operator confirmation.

This distinction is especially important for future agent operation: an AI agent may recommend focus, but the operator confirms.

---

## 18. Recommendation vs. Authority

### The distinction must be explicit

| Layer | Meaning | Persistence | Authority |
|-------|---------|-------------|-----------|
| **Evidence** | Current state facts (eligible work, conditions, milestones) | Derived at query time | System |
| **Recommendation** (optional) | "Based on evidence, this seems best" | Not persisted (or advisory log) | System |
| **Selection event** | Operator chooses focus | Persisted with provenance | Operator |
| **Authoritative focus** | The current operational focus | Persisted | Operator (via selection) |

The recommendation layer is **optional**. If no recommendation layer exists, valid operation remains: evidence → explicit selection → authoritative selection state. This distinction prevents future AI assistance from being confused with required baseline product behavior.

### Why this matters

Without this distinction, system recommendations silently become authoritative state. This is the ticket-tracker drift that Aredir must avoid.

The workspace continuation system already maintains this distinction: it shows eligible candidates but says "Current engineering state does not justify choosing one on your behalf." The system presents evidence; the operator chooses.

---

## 19. Avoiding Ticket-Tracker Drift

### Warning signs

| Warning sign | How Aredir avoids it |
|-------------|---------------------|
| Mandatory priority on every record | Priority is optional and non-operational |
| Arbitrary rank ordering | Continuation is explicitly not a ranking algorithm |
| Backlog grooming semantics | Engineering Work is durable activity, not a backlog |
| Treating all work as interchangeable tickets | Work has type, workflow, lifecycle — not just priority |
| Using urgency as dominant lifecycle signal | Urgency is a condition, not a state |
| Hiding discovery/architecture meaning behind priority numbers | Priority does not override work type or workflow |

### Guardrails

1. **Priority must not become operational authority** without demonstrated need and explicit architecture
2. **Focus must be operator-selected**, not system-derived
3. **Continuation must remain eligibility-based**, not importance-based
4. **Attention must remain condition-based**, not importance-based
5. **Multiple truthful work items must remain representable** without arbitrary collapse
6. **The EOS lifecycle must not be reinterpreted** as a priority queue

---

## 20. Historical Semantics

### What historical information should remain reconstructable

**Engineering Work history** tracks:
- State transitions
- Title/type/objective changes
- Next action and outcome changes
- Condition changes
- Final disposition
- Actor and decision provenance

**Priority history** is not tracked (and should not be, given priority's non-operational classification).

**Project operational-selection history** (if focus is persisted) should track:
- Selection events (who, when, what)
- Deselection events
- Replacement events (focus changed from A to B)

This is a new history concept, distinct from Engineering Work history.

### Selection history vs. operational projection history

These are not necessarily identical:

- **Selection history** records what operators explicitly selected or deselected. It must remain truthful: the system must not fabricate deselection events merely because underlying work changes lifecycle state.
- **Operational projection history** would represent what would have been displayed as operationally focused given Project and Engineering Work state at a point in time. This requires additional state history (Project status, work lifecycle) beyond selection events alone.

Do not claim one history can automatically reconstruct the other unless the required state history exists.

### Can historical focus be reconstructed?

Without selection events, historical focus is not reconstructable. Package 2 established this. Selection events would make selection history reconstructable, but operational projection history may require additional Project and Engineering Work state evidence.

If selection events are implemented, the history should be append-only and linked to the Engineering Work and Project.

---

## 21. Semantic Matrix

| Concept | Meaning | Authority | Scope | Persistent? | Historical? | Derived? | Can Be Multiple? | Relationship to Project Focus |
|---------|---------|-----------|-------|-------------|-------------|----------|-----------------|-------------------------------|
| Priority | Advisory annotation of perceived importance | Human (non-operational) | Engineering Work | Yes (free-text, nullable) | No (not tracked) | No | Yes (per-record) | May inform focus selection but does not determine it |
| Focus | Deliberate operational emphasis | Operator | Project | Should be (if implemented) | Should be (selection events) | No (operator-selected) | Yes (unordered set) | IS the focus |
| Selection | Act of designating focus | Operator | Project | Should be (if implemented) | Should be | No | Yes (per-item) | Establishes focus |
| Continuation | Eligibility to resume execution | System | Global (computed) | No (computed at query time) | No | Yes | Yes (bounded set) | Continuation-eligible items may be focused |
| Attention | Condition requiring awareness | System | Global (computed) | No (computed at query time) | No | Yes | Yes (bounded set) | Attention items may be focused |
| Execution readiness | Can be acted upon now | System | Global (computed) | No (same as continuation) | No | Yes | Yes | Same as continuation eligibility |
| Next action | What should happen next for a work item | Engineering Work | Engineering Work | Yes | Yes (tracked in history) | No | Yes (per-record) | A single currently operational focus may provide a Project-level next-action projection |
| Lifecycle state | Canonical progress state | Engineering Work | Engineering Work | Yes | Yes (tracked in history) | No | No (one at a time) | State affects continuation eligibility and operational projection |
| Milestone status | Planning checkpoint status | Project | Project | Yes | Partially | No | Yes | Provides context for focus selection |

---

## 22. Scenario Matrix

| Scenario | Priority | Focus | Continuation | Attention | Readiness | Required Operator Decision | Architectural Conclusion |
|----------|----------|-------|-------------|-----------|-----------|--------------------------|------------------------|
| **A: Important vs. validated** | A > B | Operator chooses | Both eligible (if conditions pass) | Neither (if no conditions) | Both ready | Which to focus on | Focus diverges from priority; operator decides |
| **B: Blocked high-priority** | A > B | Operator chooses | B eligible; A ineligible (if condition) | A if conditioned | B ready | Whether to focus on B (executable) or A (important but blocked) | Blocked items attract attention, not automatic focus |
| **C: Architecture vs. defect** | Depends on judgment | Operator chooses | Both eligible (if conditions pass) | B if it has attention condition | Both ready | Which to focus on; whether to fix defect first | Attention and focus are orthogonal; operator decides |
| **D: Parallel work** | Equal | Both (plural focus) | Both eligible | Neither (if no conditions) | Both ready | How to split time | Plural focus is valid; system supports ambiguity |
| **E: Paused project** | Any | None (project paused) | None (project not operating) | None | None | None (project paused) | Focus is meaningless when project is paused |
| **F: Proposed work only** | Any | Deferred | None (proposed not eligible) | None (if no conditions) | None (proposed not ready) | Whether focus is restricted to operational states | Focus semantics for proposed work unresolved; Package 4 dependency |

---

## 23. Authority Invariants

### Invariant 1: Current priority is non-operational

The existing `priority` field on Engineering Work must not affect operational behavior absent explicit future architecture redesignating it with demonstrated need.

### Invariant 2: Future priority remains open

Current lack of operational priority semantics does not prove that Aredir will never require a structured importance concept. Whether Aredir eventually needs a structured importance/priority model remains deferred until demonstrated by operating use.

### Invariant 3: Focus is explicit authority

Authoritative focus cannot be inferred solely from recency, priority, lifecycle state, continuation, attention, or recommendation. It requires explicit operator selection.

### Invariant 4: Selection and projection differ

An explicit focus selection and its current operational projection are related but distinct concepts. Selection history records what operators explicitly chose. Operational projection determines which selections should currently appear as active focus given Project and Engineering Work state.

### Invariant 5: System state must not fabricate operator actions

Lifecycle changes may alter operational eligibility without inventing deselection, replacement, or transfer events. The system must not fabricate operator selection or deselection events.

### Invariant 6: Recommendation is optional and non-authoritative

Recommendations may assist selection but are neither required nor authoritative. Valid operation remains: evidence → explicit selection → authoritative selection state.

### Invariant 7: Focus scope must be explicit

Shared Project focus and per-operator focus are different authority models and must not be conflated. The authority scope of focus must be established before persistence design.

### Invariant 8: Null operational focus remains truthful

A Project may have historical or persisted selection context while currently projecting no operational focus. The system must not manufacture focus from historical content, continuation eligibility, or any other signal to avoid an empty presentation.

### Invariant 9: Historical focus requires evidence

Selection history requires explicit selection evidence. Operational projection history may require additional Project and Engineering Work state evidence. Do not claim one history can automatically reconstruct the other.

### Invariant 10: Focus differs from next action

Selection/emphasis and work-level action remain separate concepts. When a single currently operational focus exists, its next action may become the Project-level next step; this projection depends on Package 4 focus lifecycle semantics.

### Invariant 11: Multiple truthful work items remain representable

Plurality must not be collapsed through arbitrary ranking. When multiple Engineering Work records are eligible, focused, or attention-worthy, the architecture must preserve all of them.

### Invariant 12: Dependency is not importance

Engineering Work dependencies (`depends_on` / `blocks`) affect execution order, not importance. A blocking item is not inherently more important than the item it blocks.

### Invariant 13: Project status governs operational participation

Project status determines which Projects participate in the workspace operating experience. Status does not rewrite Engineering Work priority, focus, or history.

### Invariant 14: The EOS lifecycle must not be reinterpreted

The Engineering Work lifecycle (Proposed → Active → In Review → Completed → Closed) must not be reinterpreted as a priority queue or backlog ranking. Each state represents engineering activity, not relative importance.

---

## 24. Final Decision Matrix

| # | Question | Decision | Evidence / Reasoning | Deferred Dependency |
|---|----------|----------|---------------------|---------------------|
| 1 | Does current Aredir have an operational EW priority model? | **No.** | Priority field exists but has no operational semantics: no enum, no query usage, no sorting, no history tracking, no real data. Domain contract: "Optional — no fixed scale." Continuation contract excludes it. | None |
| 2 | Does evidence prove Aredir never needs priority/importance? | **No — deferred.** | Current evidence does not justify an operational priority model. Whether Aredir eventually needs a structured importance concept remains deferred until demonstrated by operating use. | Demonstrated operating use |
| 3 | Existing `priority` classification | **Optional, non-operational advisory metadata with undefined semantics.** | Consistent with domain contract ("Optional"), continuation contract (excluded), and EOS lifecycle (no prioritization stage). | None |
| 4 | Should existing priority drive sorting/selection? | **No.** | Continuation contract excludes priority. No query uses it for sorting. | None |
| 5 | Does Aredir need an explicit focus concept? | **Yes, semantically.** | Focus is architecturally distinct from continuation, attention, priority, and next action. DISCOVERY-010 identified focus as deferred. | Focus implementation requires selection mechanism |
| 6 | Who establishes authoritative focus? | **Explicit operator action; authority scope still unresolved.** | Focus is operator-selected. Whether focus is shared Project authority or per-operator authority is unresolved. | Shared-vs-per-operator scope |
| 7 | Is focus necessarily singular? | **No.** | No architectural requirement for singularity. Multiple parallel work items are valid. | None |
| 8 | Is plural focus semantically allowed? | **Yes.** | Multiple focused items are a valid operational state. | None |
| 9 | Is zero operational focus valid? | **Yes.** | Null focus is a truthful operational state. | None |
| 10 | Is focus shared or per-operator? | **Deferred — blocking persistence design.** | Fundamentally different authority models. Must be resolved before persistence design. | Package 4 |
| 11 | Can proposed work be focused? | **Deferred.** | Whether focus means operational emphasis on work currently underway or deliberate emphasis including intent to begin work is unresolved. | Package 4 |
| 12 | Can completed/cancelled/superseded work remain operationally focused? | **No or likely no as projection; exact selection-state behavior deferred.** | Completed work may become ineligible for operational projection while original selection record remains intact. | Package 4 focus lifecycle semantics |
| 13 | Does lifecycle change equal operator deselection? | **No.** | The system must not fabricate operator deselection events. | None |
| 14 | Should focus automatically transfer? | **No established rule.** | Supersession may provide context but must not silently transfer authoritative focus. | Package 4 |
| 15 | Is recommendation authoritative? | **No.** | Recommendations are not authoritative without operator confirmation. | None |
| 16 | Is recommendation required? | **No.** | Valid operation: evidence → explicit selection → authoritative selection state. | None |
| 17 | Must selection have sufficient provenance/history? | **Yes.** | If authoritative focus selection exists, Aredir must persist sufficient evidence. | Package 4 persistence design |
| 18 | Exact persistence mechanism | **Deferred.** | Whether persistence represents current selection relationships, append-only events, or hybrid is deferred. | Package 4 |
| 19 | Project `currentFocus` | **Partially resolved semantically; implementation/lifecycle/scope deferred.** | Focus is semantically operator-selected, possibly plural. Implementation, lifecycle, and scope are deferred. | Package 4 |
| 20 | Project `nextStep` | **Partially resolved; projection depends on a single currently operational focus and Package 4 semantics.** | A single currently operational focus may provide a Project-level next-action projection, but exact eligibility depends on focus lifecycle semantics. | Package 4 |

---

## 25. DISCOVERY-010 Reconciliation

### Project `currentFocus`

**Classification: Partially resolvable semantically; implementation/lifecycle/scope deferred.**

Package 3 has established:
- Focus is operator-selected, not system-derived
- Focus may be plural (unordered set)
- Focus requires sufficient persistence evidence (if implemented)
- Focus should not be derived from priority, state, or recency
- Selection history and operational projection are distinct concepts

**Semantic resolution:** `currentFocus` should be replaced by an operator-selected focus mechanism. The semantic model is: operator-selected focus, possibly plural, with selection provenance.

**Still deferred:**
- Implementation design (exact persistence mechanism)
- Focus lifecycle semantics (how selection and projection interact over time)
- Shared-vs-per-operator scope (blocking persistence design)
- Proposed-work focus eligibility
- `currentFocus` field disposition

### Project `nextStep`

**Classification: Partially resolved; projection depends on a single currently operational focus and Package 4 semantics.**

Package 3 has established:
- Next action belongs to Engineering Work, not Project
- A single currently operational focus may provide a Project-level next-action projection

**What is NOT yet established:**
- Whether an authoritatively selected but operationally ineligible item should have its next action projected as Project next step
- Exact projection eligibility rules (depends on Package 4 focus lifecycle semantics)
- Behavior when focus is plural or absent

**Semantic resolution:** `nextStep` may be derived from a single currently operational focus's `currentNextAction`, but exact projection eligibility depends on Package 4 focus lifecycle semantics. When zero or multiple items are authoritatively focused, `nextStep` should not manufacture a singular value.

### Summary

| Field | DISCOVERY-010 Status | Package 3 Resolution | Remaining Deferral |
|-------|---------------------|---------------------|-------------------|
| `currentFocus` | Deferred pending selection semantics | Semantic model: operator-selected focus, possibly plural, with selection provenance | Implementation design, lifecycle, scope, proposed-work eligibility |
| `nextStep` | Deferred pending selection semantics | May derive from single currently operational focus's `currentNextAction` | Exact projection eligibility, focus lifecycle semantics |

---

## 26. Deferred Questions

### DQ-1: Is focus shared Project authority, per-operator authority, or are both concepts required?

This is a **blocking dependency for persistence design**. Implementation must not begin until the authority scope of focus is established.

### DQ-2: What exactly constitutes a focus selection?

The semantic model is established (operator-selected, possibly plural, with provenance). The exact entity that constitutes a selection is deferred.

### DQ-3: What constitutes current operational focus?

Selection history and operational projection are distinct. The exact rules for determining which selections project as current operational focus are deferred.

### DQ-4: How are selection state and operational projection distinguished?

The distinction is established architecturally. The exact persistence and lifecycle behavior is deferred.

### DQ-5: Can proposed work be selected/focused?

Whether focus means operational emphasis on work currently underway or deliberate emphasis including intent to begin work is unresolved.

### DQ-6: What happens when selected work becomes active, in review, completed, closed, cancelled, superseded, or conditioned/blocked?

The exact persistence and lifecycle behavior is deferred to Package 4.

### DQ-7: What happens when the Project becomes active, testing, paused, or archived?

Paused or archived Projects may suppress operational focus projection without altering selection history. Exact behavior deferred.

### DQ-8: Does a lifecycle change invalidate operational projection without changing selection history?

Yes architecturally, but the exact mechanism is deferred.

### DQ-9: What explicit actions create selection, deselection, replacement, or plural selection?

Deferred to Package 4.

### DQ-10: What provenance is required?

Selection events should have provenance (who, when, what, why). Exact requirements deferred.

### DQ-11: What history must be reconstructable?

Selection history and operational projection history are distinct. Exact requirements deferred.

### DQ-12: Does authoritative focus require current-state persistence, event persistence, or both conceptually?

Deferred to Package 4.

### DQ-13: How should plural focus behave?

Plurality is semantically allowed. Exact behavior (display, interaction, ordering) deferred.

### DQ-14: Does focus need ordering?

No by default. If the operator wants to emphasize ordering, that is a separate explicit action. Deferred.

### DQ-15: How should focus interact with future Engineering Work relationships?

Deferred.

### DQ-16: How should focus interact with supersession without silently transferring authority?

Supersession may provide context but must not silently transfer authoritative focus. Exact behavior deferred.

### DQ-17: What exactly becomes of Project `currentFocus`?

Semantic model established. Implementation disposition deferred.

### DQ-18: What exactly becomes of Project `nextStep`?

Partially resolved. Exact projection eligibility depends on focus lifecycle semantics.

### DQ-19: What becomes of the current `priority` field, if anything?

Classification established (optional, non-operational). Disposition deferred.

### DQ-20: What minimum architecture is required before implementation can safely begin?

Package 4 must determine this.

---

## 27. Evidence Index

| Evidence ID | Type | Location | Finding |
|-------------|------|----------|---------|
| E1 | Schema | `schema.ts:325` | `priority: text("priority")` — nullable free-text field on Engineering Work |
| E2 | Schema | `schema.ts:98-99` | `currentFocus`, `nextStep` — nullable free-text fields on Project |
| E3 | Seed | `seed.ts:99` | `priority: null` for all seed Engineering Work records |
| E4 | Seed | `seed.ts:35,48,61,75` | `currentFocus` and `nextStep` set in seed Project data |
| E5 | Query | `queries.ts:344` | `getProjectEngineeringWork` sorts by `updatedAt desc`, not priority |
| E6 | Query | `queries.ts:363` | `priority` fetched but never used in logic |
| E7 | Query | `queries.ts:228-238` | Attention composed from conditions, incomplete defects, blocked milestones |
| E8 | Contract | `ENGINEERING-WORK-DOMAIN-CONTRACT.md:39` | Priority: "Optional — no fixed scale in baseline" |
| E9 | Contract | `WORKSPACE-OPERATIONAL-002:127` | Priority: "Partially Available — No scale, governance, or active editor; cannot compare values. Exclude." |
| E10 | Contract | `WORKSPACE-OPERATIONAL-002:182` | Exclusion: "any candidate whose relevance would depend on ... priority comparison" |
| E11 | Contract | `WORKSPACE-OPERATIONAL-002:188` | "The first-generation algorithm is intentionally not a ranking algorithm" |
| E12 | Contract | `WORKSPACE-OPERATIONAL-002:222` | "updatedAt here means only most recently modified among already eligible candidates" |
| E13 | Contract | `WORKSPACE-OPERATIONAL-002:224` | "Project or Work `priority`, lifecycle rank, Project focus prose, milestone order, and Mission registry position do not break ties." |
| E14 | Contract | `WORKSPACE-OPERATIONAL-002:228` | "With several valid candidates, Workspace should show a small Available continuations set" |
| E15 | Code | `workspace-operational.ts:61-72` | `isContinuationCandidate` — no priority check |
| E16 | Code | `workspace-operational.ts:135-138` | `compareForStablePresentation` — sorts by `updatedAt` then `id` |
| E17 | Code | `workspace-operational.ts:158` | Projection mode: `none`, `single`, `ambiguous` |
| E18 | UI | `page.tsx:82-83` | "Several valid things can continue. Current engineering state does not justify choosing one on your behalf." |
| E19 | UI | `page.tsx:275` | `currentFocus ?? nextStep ?? "Open the Project for current context."` |
| E20 | Lifecycle | `ENGINEERING-WORK-LIFECYCLE.md:15` | "Ready is a derived readiness condition, not a state." |
| E21 | Lifecycle | `ENGINEERING-WORK-LIFECYCLE.md:15` | "Paused, blocked, waiting, at risk, needs clarification, needs verification, and ready for promotion are conditions" |
| E22 | Lifecycle | `ENGINEERING-WORK-LIFECYCLE.md:52` | "Dependency blockage may keep Work Active; it does not create a separate blocked state." |
| E23 | Relationship | `ENGINEERING-WORK-RELATIONSHIP-MODEL.md:25` | "Blockage is a condition, not a state." |
| E24 | EOS | `ENGINEERING_OPERATING_SYSTEM.md` | EOS lifecycle: no prioritization stage |
| E25 | EOS | `ENGINEERING_OPERATING_SYSTEM.md:110` | Principles: "Evidence over assumption" |
| E26 | Pattern | `HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md:73` | "Advisors contribute, not own" |
| E27 | History | `schema.ts:334-439` | History table tracks state, title, type, objective, nextAction, outcome, condition — NOT priority |
| E28 | Actions | `projects/[slug]/actions.ts` | No server action updates priority, currentFocus, or nextStep |

---

## 28. Recommended Package 4 Boundary

Package 4 must be a **discovery/architecture** package, not an implementation package. It must resolve the remaining architecture required before implementation can safely begin.

### Package 4 title

**Operational Focus Persistence and Lifecycle Architecture**

### Why Package 4 must remain discovery

Package 3 has established the semantic model for focus. But multiple blocking architectural questions remain unresolved: shared-vs-per-operator scope, selection vs. projection distinction, lifecycle interaction, proposed-work eligibility, persistence mechanism, and minimum architecture before implementation. Implementing focus without resolving these questions would embed arbitrary assumptions.

### Minimum scope for Package 4

At minimum, Package 4 must determine:

1. Is focus shared Project authority, per-operator authority, or are both concepts required?
2. What exactly constitutes a focus selection?
3. What constitutes current operational focus?
4. How are selection state and operational projection distinguished?
5. Can proposed work be selected/focused?
6. What happens when selected work becomes active, in review, completed, closed, cancelled, superseded, or conditioned/blocked?
7. What happens when the Project becomes active, testing, paused, or archived?
8. Does a lifecycle change invalidate operational projection without changing selection history?
9. What explicit actions create selection, deselection, replacement, or plural selection?
10. What provenance is required?
11. What history must be reconstructable?
12. Does authoritative focus require current-state persistence, event persistence, or both conceptually?
13. How should plural focus behave?
14. Does focus need ordering?
15. How should focus interact with future Engineering Work relationships?
16. How should focus interact with supersession without silently transferring authority?
17. What exactly becomes of Project `currentFocus`?
18. What exactly becomes of Project `nextStep`?
19. What becomes of the current `priority` field, if anything?
20. What minimum architecture is required before implementation can safely begin?

### What Package 4 should NOT do

Package 4 should not:
- implement focus;
- implement selection;
- implement priority;
- implement recommendation logic;
- create focus tables;
- create selection-event tables;
- modify schema;
- modify queries;
- modify UI;
- modify tests;
- modify seed data;
- change continuation;
- change attention;
- change Engineering Work lifecycle behavior;
- remove Project fields;
- remove priority.

### Dependency chain

```
Package 2 (DISCOVERY-010)
  → establishes: selection semantics are a dependency
    → Package 3 (DISCOVERY-011)
      → establishes: semantic model for focus, priority, selection
        → Package 4 (architecture/discovery)
          → resolves: persistence, lifecycle, scope, minimum architecture
            → future implementation package
              → implements: schema, queries, UI, actions based on resolved semantics
```

---

*End of Discovery Record AREDIR-DISCOVERY-011*
