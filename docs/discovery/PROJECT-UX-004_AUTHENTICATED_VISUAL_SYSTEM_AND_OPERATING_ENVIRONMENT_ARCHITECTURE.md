# PROJECT-UX-004 — Authenticated Visual System and Operating Environment Architecture

| Field | Value |
| --- | --- |
| **Package** | PROJECT-UX-004 |
| **Type** | Authenticated experience architecture / visual-system definition |
| **Status** | Complete — architecture only |
| **Review date** | 2026-08-22 |
| **Decision** | **READY WITH EXPLICIT DEFERRALS** |
| **Direction** | Evolve current direction into a state-centric engineering operating environment with IDE-grade context preservation |
| **Scope** | Authenticated Workspace, Project, Engineering Work, and subordinate operational information |
| **Depends on** | AREDIR-UX-001, DESIGN_GOVERNANCE, AREDIR_UI_QUALITY_AUDIT_STANDARD, OPERATIONAL-EXPERIENCE-001, PROJECT-UX-002, PROJECT-UX-003, DEFECT-UX-001, AREDIR-DISCOVERY-009/010/011/012 |
| **Outcome** | Canonical visual-system and spatial architecture; no implementation authorization is exercised here |

---

## 0. Decision and authority

**Completion decision: READY WITH EXPLICIT DEFERRALS.** The missing layer identified by PROJECT-UX-003 is now defined: it sits below AREDIR-UX-001's experience architecture and above CSS and application components. It does not rename the canonical six-part experience model of Mission, Environment, Primary Action, Supporting Context, Navigation, and Identity.

The authenticated product shall evolve into a **state-centric engineering operating environment with IDE-grade context preservation**. Its closest spatial metaphor is a mature investigation or control console: one durable operating context, fast traversal, subordinate inspection, and visible authority. It is not a code editor, document-centric IDE, generic dashboard, terminal simulation, game HUD, or observability product with invented telemetry.

This record continues the `PROJECT-UX-*` lineage and deliberately does not consume an `AREDIR-DISCOVERY-*` identifier. It reconciles the actual repository values and the authority decisions already made by AREDIR-DISCOVERY-009 through -012; it does not alter them.

### Normative language

“Must” and “shall” are implementation-review requirements. “May” identifies an allowed composition. Examples illustrate the rule without prescribing a component API or pixel token.

---

## 1. Canonical operating-environment topology

The desktop environment has eight named regions. A surface uses only the regions its altitude and task require.

| Region | Responsibility | Scope | Presence |
| --- | --- | --- | --- |
| **Activity rail** | Global movement among Workspace, Projects, Engineering Work, Knowledge, and settings that genuinely exist | Global | Persistent on wide desktop; invoked navigation on narrow surfaces |
| **Orientation band** | Altitude, ancestry, current identity, global attention entry, and command invocation | Global frame with contextual content | Persistent; content changes with altitude |
| **Context inventory** | The collection or sibling set through which the operator is traversing | Altitude-specific | Present for collection work; optional on focused detail |
| **Operating surface** | Mission, current truth, primary action, and the artifact being operated | Altitude-specific | Required and dominant |
| **Project context rail** | Persistent Project identity, status, neutral stage, target, and bounded Project navigation | Project-scoped | Present at Project and Engineering Work altitude on wide desktop |
| **Inspector** | Selected subordinate information such as evidence, relationships, provenance, metadata, and history summary | Contextual | Optional/invoked; never a second primary surface |
| **History region** | Full temporal evidence and lifecycle transitions | Contextual secondary | Collapsed or routed by default; may temporarily replace inspector content |
| **Command surface** | Navigation and action discovery across global and current context | Global with contextual ranking | Invoked overlay or equivalent; never resident chrome |

The orientation band and activity rail provide the stable environment. The Project context rail provides durable descent context. Context inventory, inspector, and history are task-dependent; their absence must give space back to the operating surface rather than leave empty columns.

### Desktop spatial grammar

```text
┌──────────┬──────────────────────────────────────────────────────────────┐
│ Activity │ Orientation band: altitude / ancestry / identity / command │
│ rail     ├──────────────┬─────────────────────────────┬─────────────────┤
│          │ Context or   │ Primary operating surface   │ Inspector       │
│          │ Project rail │                             │ (when invoked)  │
│          │              │                             │                 │
│          │              │                             │                 │
└──────────┴──────────────┴─────────────────────────────┴─────────────────┘
```

This is a responsibility model, not a fixed three-column template. No user-arranged panels, arbitrary tabs, file tree, or editor chrome are introduced.

---

## 2. Altitude architecture

Altitude must be recognizable from spatial composition, density, and persistent context before the title is read. Moving deeper adds context; it does not replace the frame from which the operator descended.

| Attribute | Workspace | Project | Engineering Work |
| --- | --- | --- | --- |
| **Purpose** | Cross-Project operating picture and truthful resumption | Project operating context and coordination picture | Operate, inspect, and resolve one authoritative work artifact |
| **Primary authority** | Derived cross-Project projections over authoritative sources | Project identity, status, stage, target, milestones; shared focus selection | Work lifecycle state, next action, condition, outcome, workflow context |
| **Density** | Broad, instrumented, comparison-oriented | Mixed: stable context plus bounded projections | Highest semantic density but strongest hierarchy and bounded prose |
| **Width use** | Full available width for counts, distributions, and Project rows | Wide operating surface with persistent Project rail | Bounded narrative core; inspector uses remaining width |
| **Primary region** | Continuation and attention operating picture | Operational brief plus focus and bounded Work projection | Current lifecycle posture and next action |
| **Supporting regions** | Project registry projection, real distributions, recent outcomes | Milestones, attention, recent outcomes, library/inspector access | Structured workflow context, evidence, relationships, provenance, history |
| **Navigation** | Global to Project; lateral across Projects | Persistent Project context; lateral among Project-owned surfaces and Work | Retain Project rail; previous/next sibling traversal comes from inventory context, not arbitrary tabs |
| **Instrumentation** | Highest tolerance, but only real projections | Moderate, Project-scoped counts and categorical distributions | Low; local truth and evidence completeness only |
| **Authoring** | Lightweight creation may be invoked | Creation/editing invoked from relevant context | Lifecycle-specific authoring invoked; never permanently resident |

Environmental depth distinguishes altitude without theatrical decoration: Workspace is the broadest field; Project introduces a stable context rail and framed operating brief; Engineering Work narrows narrative measure and increases subordinate inspection capability.

---

## 3. Persistent context and navigation

The operator must always be able to answer where they are, which Project contains the current work, which Work is selected for inspection, where they descended from, and how to move laterally.

1. The activity rail identifies the global domain, not every route.
2. The orientation band carries a compact ancestry: `Workspace / Project / Engineering Work`. It does not repeat every label already visible in the Project rail.
3. At Project altitude, the Project context rail establishes identity, posture, target, and Project-local destinations.
4. At Engineering Work altitude, that same Project context persists. The selected Work identity is added to the orientation band and operating surface; it does not replace Project identity.
5. Return to the broader operating picture is a stable action to the originating inventory or Project, not a generic “back” that depends only on browser history.
6. Lateral traversal uses the current inventory ordering/filter context when available. A deep link without such context still renders complete orientation and a route to the full inventory.
7. Breadcrumb ancestry expresses hierarchy; the Project rail expresses durable context; the activity rail expresses global movement. No region duplicates all three responsibilities.

Browser Back must reverse navigation and selection changes in the expected route sequence. Refresh and deep links must reconstruct authoritative context from the URL and server state. Ephemeral inspector disclosure may be local state; identity-bearing master selection must have route semantics.

---

## 4. Master/detail architecture

Master/detail is canonical for operating large or traversable collections; it is not required for short, read-only lists.

| Domain | Decision | Master responsibility | Detail responsibility |
| --- | --- | --- | --- |
| **Engineering Work inventory** | Required on wide desktop | Filterable/grouped structured rows; complete collection | Selected Work operational brief or bounded preview; route to full detail |
| **Project registry** | Recommended | Project rows with identity, posture, attention, and bounded Work signal | Project operational brief, not the entire historical record |
| **Knowledge Assets** | Appropriate | Search/filter by neutral taxonomy and governed status | Asset identity, authority, adoption, provenance |
| **Documents / Prompts** | Use when collection size and comparison justify it | Search/filter inventory | Readable body/result; invoked authoring |

Selection of a master row is **UI navigation/context state**, represented by the interaction accent and route. It is never operational focus. Operational focus is shared Project authority created only through the authorized focus command model in AREDIR-DISCOVERY-012.

On wide screens, choosing a row updates the identity-bearing route and the adjacent detail. Deep links select the corresponding row when the collection is available. Browser Back restores the prior selection/filter route. On narrow screens, master and detail become separate views: selection navigates forward; Back returns to the preserved inventory query and scroll context.

No detail surface may embed an unbounded collection. A bounded projection states its limit and offers the complete inventory.

---

## 5. Inspector architecture

The inspector owns information that is relevant to the current artifact but subordinate to deciding or acting on its present truth:

- evidence and repository references;
- related knowledge and direct relationships;
- provenance and actor detail;
- compact metadata;
- history summary and entry to full history;
- future contextual discussion accommodation.

The operating surface owns identity, objective, current lifecycle posture, current next action, conditions, workflow-specific structured context needed to decide, outcome/final disposition, and the primary action.

Inspector hierarchy is fixed:

1. current-context summary and authority label;
2. attention-bearing subordinate facts, if any;
3. evidence adjacent to the claim or state it supports;
4. relationships and related knowledge;
5. provenance and metadata;
6. history summary;
7. future discussion entry.

Only relevant groups appear. Empty groups are omitted rather than shown as vacant panels. Long groups disclose progressively or route to a complete view. Opening the inspector must not change operational focus or the selected master row.

Future discussion may occupy an inspector thread attached to a specific structured fact, or a dedicated bounded secondary view when volume requires it. It must never become an endless comment stream below current truth, and visibility never grants authority. Relationship lineage may later use an optional dedicated view; direct relations remain inspector-resident. Neither model implies file-tree containment.

---

## 6. Command surface

The command surface is an invoked, searchable way to reduce navigation depth and resident authoring chrome. It is globally available and context-sensitive in ranking and scope.

It may expose navigation to Projects and Work, search, creation entry points, available authoring/lifecycle actions, evidence attachment, focus selection actions, and related-Work inspection. It must enforce the same authorization and lifecycle availability as visible controls.

It must not contain arbitrary shell commands, unsupported operational actions, destructive actions without confirmation, invented agent actions, hidden administration, or commands that bypass domain rules. No shortcut scheme is defined here.

Ordinary filtering narrows the currently visible collection and preserves collection context. Command search finds destinations and invocable actions across contexts. Search results must distinguish navigation, authoring, and authoritative state-changing commands before execution.

---

## 7. Visual surface and geometry model

Only three surface levels are permitted.

| Level | Semantic purpose | Visual weight and depth | Allowed content | Nesting |
| --- | --- | --- | --- | --- |
| **Environment** | Establish altitude and hold structural regions | Deepest graphite/dark-neutral field; no decorative shadow | Global rails, spatial separation, restrained empty/header texture | Never placed inside another level |
| **Surface** | Carry primary operating content or a structurally independent region | One tonal step above environment; precise hairline boundary where separation is needed | Operating brief, inventory, context rail, inspector | Surface may contain insets, not another card-like Surface unless it is a truly independent region |
| **Inset** | Recess subordinate, supporting, or historical information | Lower contrast/depth than its parent; quiet boundary or tonal recess | Evidence, metadata, disclosed history, secondary notes, failure detail | No card-like nesting inside an inset; use rows, dividers, or disclosure groups |

A border is justified only when it establishes a region boundary, interactive hit area, selection boundary, grouped record, or contrast necessary for accessibility. It is not justified merely because content has a heading.

Geometry is precise and restrained. Structural regions use small or nearly square radii; controls use enough radius to communicate interaction without becoming pills by default; tables and inventories use rows/dividers; inspector boundaries align with the shell; overlays may be slightly softer to signal temporary elevation. Empty and failure states inherit their parent geometry. Disclosures use separators and indentation rather than nested cards. Shadows are reserved for overlays, not ordinary hierarchy.

---

## 8. Authenticated theme architecture

The authenticated environment is **dark-default with supported user preference**, separate from the public-site appearance.

- First authenticated use defaults to the graphite operating theme unless an existing explicit user/system preference is available.
- An explicit user choice persists across authenticated sessions and devices when identity-backed preference exists; local persistence is acceptable as an interim implementation detail.
- Light remains supported, complete, and AA-compliant. It is not a degraded fallback.
- The public site may retain its own appearance strategy. Entering or leaving the authenticated environment must not overwrite that strategy.
- Theme is applied before authenticated content paints to avoid a contradictory flash.
- Every semantic treatment is tested in both themes at its actual text size and interaction state.
- Graphite never excuses muted text, border, placeholder, or disabled-control contrast failures.

This defines behavior architecture only; it does not activate theme behavior.

---

## 9. Semantic color and operational role model

Color has two orthogonal jobs: **interaction** and **operational consequence**. Taxonomy is neutral.

| Semantic | Canonical treatment |
| --- | --- |
| **Interaction** | Existing arcane blue/blue-violet for links, controls, keyboard focus, and invoked affordances |
| **Current UI selection** | Interaction accent on a structural edge/outline plus selected-row shape and text; local and ephemeral |
| **Focus selection authority** | The same accent family may mark the selection control because it is interactive, but the persisted state must add an explicit “Focused” label/icon and stable placement |
| **Operational focus projection** | Focused treatment plus a “Current focus” projection label; no new hue and no implied ranking |
| **Attention** | Amber/ember, withdrawn from taxonomy; paired with text/icon and a stable attention region |
| **Actionable** | Strong neutral/accent-adjacent emphasis, readable state text, and action placement; not necessarily a colored fill |
| **Settled** | Quiet neutral with clear terminal language |
| **Inert** | Lowest neutral emphasis while remaining legible |
| **Destructive/error** | Reserved destructive red family with explicit error/cancel language; cancellation state itself need not look like a current error |
| **Taxonomy** | Neutral typography, labels, columns, or grouping; no semantic rainbow |

The interaction accent may therefore appear on both a selected inventory row and an authoritative focus control, but they cannot be conflated: row selection is expressed at the row boundary and follows navigation; focus is explicitly named, Project-scoped, persisted, and visible independently of which row is open. State never relies on color alone.

### Four operational roles

- **Actionable:** current work or state in which a meaningful next action can occur.
- **Attention:** a known condition requiring awareness or intervention. It is orthogonal to lifecycle and focus.
- **Settled:** a concluded or verified state whose truth should remain accessible but quiet.
- **Inert:** planned, suspended, deprecated, superseded, or otherwise non-operating information.

Exactly one operational axis owns strong state color within a region. On a Work row that axis is Engineering Work lifecycle; Project status, stage, workflow, type, reference status, and focus use position, text, structure, or subordinate indicators. In a milestone-only region, milestone status may own the state role. Attention can add its reserved cue because it is an independent condition, but it must not recolor every taxonomy label.

### Bounded mapping from actual repository values

The mapping changes no domain meaning. A role is a presentation family, not a lifecycle state.

| Repository axis | Actionable | Attention | Settled | Inert | Neutral taxonomy / ambiguity |
| --- | --- | --- | --- | --- | --- |
| Engineering Work `state` | `active`, `in_review` | — | `completed`, `closed`, `cancelled` | `proposed`, `superseded` | Cancellation may have destructive provenance, but its current lifecycle presentation is settled; do not render it as a live error |
| Project `status` | `active`, `testing` | — | — | `planning`, `paused`, `archived` | `paused` is intentional posture, not automatically attention |
| Project `stage` | — | — | — | — | All: `concept`, `prototype`, `mvp`, `uat`, `production`, `maintenance`; stage is neutral maturity taxonomy |
| Milestone `status` | `active` | `blocked` | `completed` | `planned`, `deferred` | A deferred milestone is inert, not failed |
| Reference `status` | `expected` | `stale`, `missing` | `verified` | — | `expected` is actionable only where evidence is required; elsewhere show neutral. This context dependency must be resolved by the evidence requirement, not guessed by the visual primitive |
| Prompt `status` | `run` | `needs_followup` | `verified` | `drafted`, `superseded` | `run` means executed, not necessarily currently actionable; if no follow-up exists, neutral presentation is safer. Flagged ambiguity |
| Knowledge Asset `status` | — | — | `promoted_standard`, `company_standard` | `deprecated`, `superseded` | Governance status, not Work lifecycle; use neutral governed-status treatment unless it owns the region |
| Work `type` / `workflow` | — | — | — | — | All actual type/workflow values are neutral taxonomy |
| Prompt type, document category, Knowledge Asset category | — | — | — | — | All values are neutral taxonomy |
| Work `condition` | — | Any non-empty authoritative condition surfaced by defined attention rules | — | — | Condition coexists with lifecycle; do not replace the lifecycle label |

Where the repository does not define enough meaning—especially `priority`, prompt `run`, and whether `expected` evidence is required—the system uses neutral treatment and explicit text rather than inferring consequence.

---

## 10. Authority visualization model

Authority is communicated primarily by position, surface depth, label, typography, and disclosure—not six bright colors.

| Authority class | Spatial and typographic treatment |
| --- | --- |
| **Authoritative operational truth** | Top of the operating surface; strongest type and boundary; state and current next action adjacent; condition immediately follows when present |
| **Project authority** | Stable context rail and operational brief; identity strongest, status named, stage neutral, milestones in their own Project-owned region |
| **Derived projection** | Explicit “Projection”/purpose label, source-aware supporting surface, timestamp only when semantically valid; never styled as a persisted decision |
| **Recommendation** | Advisory inset with source/actor and accept/dismiss affordance only when supported; visually cannot resemble selected focus or committed action |
| **Historical evidence** | Recessed timeline, past tense, prior → resulting transitions, collapsed by default |
| **Advisory metadata** | Neutral metadata field at low weight; never used for ordering or emphasis without a separate authority decision |

### Required semantic visual matrix

| Information Class | Authority | Visual Weight | Surface Level | Color Role | Typography Role | Default Disclosure |
| --- | --- | --- | --- | --- | --- | --- |
| Project identity | Project | Strong framing | Surface/context rail | Neutral | Altitude heading + identifier | Visible |
| Project status | Project | Medium-strong | Surface/context rail | Operational role when status owns region | State label | Visible |
| Project stage | Project | Supporting | Surface/context rail | Neutral taxonomy | Metadata/position | Visible |
| Operational focus selection | Shared Project authority | Strong, explicit | Surface | Interaction accent + label/icon | State/identifier | Visible, all members represented |
| Operational focus projection | Derived from selection + current state | Strong supporting | Surface | Selection cue; attention remains separate | Projection label + operational text | Visible |
| Continuation | Derived | Strong at Workspace | Surface | Actionable role | Operational truth-sized action + projection label | Visible |
| Attention | Derived from authoritative conditions | Strong when present | Surface/attention region | Amber/ember + text/icon | State + concise explanation | Visible; bounded list then complete view |
| Engineering Work lifecycle | Work authority | Strongest Work state | Surface | Operational role | State label | Visible |
| Next action | Work authority | Dominant action text | Surface | Interaction only on action control | Operational truth | Visible |
| Condition | Work authority | Strong secondary | Surface/inset adjacent to truth | Attention | State + narrative rationale | Visible when present |
| Outcome/final disposition | Work authority | Strong when terminal | Surface | Settled neutral | Operational truth + narrative | Visible for terminal Work |
| Evidence | Authority typed by reference | Supporting | Inset/inspector | Reference role; attention only for stale/missing | Evidence/history + identifier | Summary visible; detail disclosed |
| Recommendation | Advisory | Supporting, clearly lower | Inset/inspector | Neutral/interaction on action only | Narrative + source metadata | Disclosed when relevant |
| History | Historical evidence | Recessive | Inset/history region | Neutral | Evidence/history | Collapsed summary |
| Advisory priority | Undefined/non-operational | Low | Inset/metadata | Neutral | Metadata | Collapsed or omitted unless useful |

---

## 11. Focus, continuation, and attention

These concepts use different visual channels because they answer different questions:

| Concept | Question | Visual channel | Authority |
| --- | --- | --- | --- |
| **Focus** | What has been deliberately emphasized? | Explicit focus marker, persistent Project-scoped placement, set membership | Selection persisted by authorized human; operational focus derived |
| **Continuation** | What can continue? | Primary-action composition, eligibility explanation, route/action | Derived from current authoritative state |
| **Attention** | What requires awareness/intervention? | Dedicated attention region, amber cue, condition text | Derived from authoritative conditions and defined rules |

They do not become three badges. A row may have lifecycle text in its state column, a stable focus marker at its identity edge, an available continuation action in its action column, and an attention icon/text in a condition column. On detail, the same facts occupy distinct vertical regions.

- Focused + actionable: focus marker persists; next action is prominent.
- Focused + conditioned + attention: focus marker persists; condition interrupts the action path; attention region explains why; continuation is absent.
- Unfocused + continuation eligible: continuation action appears without focus styling.
- Attention-bearing but unfocused: attention cue appears without focus styling.
- No focus + ambiguous continuation: explicitly state no focus and show the honest candidate set; do not choose.
- Plural focus: show an unordered set/count with access to every member; never crown a primary item or use display order as ranking.
- Zero focus: render “No current focus selected” as truthful state, not as a blank card or replacement with recency.
- Focus selection history: history timeline records actor, effect, time, and cause; current selection always outranks it.

Focus never changes continuation eligibility or attention, and neither projection silently changes focus.

---

## 12. Typography roles

| Role | Use |
| --- | --- |
| **Altitude/page heading** | Current Workspace, Project, or Work identity; concise and unmistakable |
| **Section heading** | Named operational region; materially below altitude heading |
| **Operational truth** | Next action, current outcome, active condition, key posture; high legibility and weight |
| **Narrative** | Objectives, summaries, rationales, findings; proportional face with comfortable leading |
| **Metadata** | Labels and secondary facts; compact but AA-compliant |
| **Identifier** | Work IDs, slugs, repository paths, commits; monospace |
| **State** | Short canonical state labels; compact, not micro-text |
| **Evidence/history** | Past-tense or provenance-oriented supporting text; quieter, never illegible |
| **Numeric/instrumentation** | Tabular numerals with aligned labels and units; no decorative oversized KPI typography |

Monospace is for labels, identifiers, code-like references, and compact instrumentation—not narrative prose. Narrative measure should generally remain approximately 60–75 characters; structured rows, tables, timelines, and comparisons may use full region width.

---

## 13. Inventory architecture

Large collections are operating surfaces, not card grids.

- Use **structured rows** when identity, one primary state, next-action summary, focus, and attention can be scanned consistently.
- Use a **table** for stable multi-field comparison and sorting; hide or transform low-priority columns responsively.
- Use **grouped inventory** only by a meaningful operational role or explicit user filter, not by decorative taxonomy.
- Use a **bounded projection** inside Workspace, Project, or detail surfaces; state the total and route to the complete inventory.
- Use **master/detail** for repeated traversal and comparison on wide screens.
- Use **filtering** for known facets in the current inventory and **search** for identity/content lookup.
- Use **progressive disclosure** for row metadata, never to conceal primary state.

Engineering Work inventory is the primary reference implementation: full-width structured inventory, filters for actual lifecycle/workflow/type/focus/attention semantics, honest empty/failure states, and optional master/detail. No unbounded Work list remains embedded in Project detail.

---

## 14. Surface architectures

### 14.1 Workspace

Workspace is the cross-Project operating environment. It retains continuation-first composition, honest ambiguity, and attention as an independent projection.

```text
Activity rail | Orientation band + global attention
              | Continuation operating surface
              | Attention region (when non-empty)
              | Real categorical counts/distributions
              | Bounded Project operating rows / recent outcomes
```

Additional instrumentation is allowed only from defined projections: Work state distribution, attention concentration, evidence completeness, lifecycle position counts, and continuation distribution. The surface remains quiet when nominal; it does not manufacture urgency to fill space.

### 14.2 Project

Project is an operating context, not a vertical capability catalog.

```text
Activity | Orientation: Workspace / Project
rail     | Project context rail | Operational brief | Inspector (invoked)
         | identity             | focus             | evidence/library
         | status + stage       | attention          | provenance/history
         | target + navigation  | bounded Work       |
         |                      | milestone context  |
```

- `currentFocus` free text is deprecated and must not be presented as current authority.
- `nextStep` independent authority is deprecated. A singular Project next-action projection exists only when exactly one operationally focused Work item has a usable authoritative `currentNextAction`; zero/many use truthful null/plural presentation.
- Status is named Project posture and may own strong state treatment in the context rail. Stage is neutral maturity metadata.
- Target remains Project authority.
- Recent outcomes, attention, and operational focus are labeled projections.
- Milestones remain Project authority and get a bounded, purpose-specific region.
- Engineering Work is a bounded projection with total and entry to the full inventory route.
- Documents, prompts, knowledge, evidence, and related material are entered through Project navigation or inspector/library access—not eight equal full-weight panels.

### 14.3 Engineering Work inventory

```text
Activity | Orientation: Workspace / Project / Engineering Work
rail     | Project context rail | Filter/search + structured master | Detail preview
         |                      | complete inventory                | or inspector
```

The inventory is the lateral traversal authority for Work presentation, not an authority over Work lifecycle or focus. It preserves route-backed filters and selection. Focus controls, when implemented, are explicit shared-authority actions and remain distinct from opening a row.

### 14.4 Engineering Work detail

The validated DEFECT-UX-001 hierarchy becomes one shared architecture for every workflow:

1. orientation and identity;
2. current lifecycle posture;
3. objective/shared summary;
4. current next action or truthful terminal posture;
5. conditions and rationale;
6. workflow-specific structured context;
7. outcome/final disposition;
8. evidence adjacent to supported claims;
9. related knowledge and relationships;
10. provenance and metadata;
11. history.

Workflow differences belong inside the structured-context region and its grouping. They do not create separate page architecture. The defect sequence—Observation, Expected/Actual Behavior, Reproduction, Evidence, Next Investigation, Validation Target—remains a workflow-specific expression of the common structure, not a universal field model.

```text
Activity | Orientation: Project / Work
rail     | Project context rail | Current Work operating surface | Inspector
         |                      | bounded narrative + action      | evidence / related
         |                      | structured workflow context     | provenance / history
```

---

## 15. Instrumentation standard

Information deserves instrumentation only when it is based on a defined source and projection, helps compare current operational state, has a truthful denominator where needed, and leads to a useful inspection path.

Allowed current candidates:

- Engineering Work counts/distribution by actual lifecycle state or four-role presentation grouping;
- attention count/concentration by defined source and Project;
- reference evidence completeness using `expected`/`verified`/`stale`/`missing` where requirements are known;
- lifecycle position counts;
- continuation distribution and honest single/many/none mode.

Counts and labeled distributions precede charts. Use aligned numbers, segmented categorical bars, compact tables, or small multiples for categorical/count data. A categorical lifecycle is not percentage completion.

Prohibited: activity inferred from `updatedAt`, velocity without a defined measurement contract, arbitrary health/risk scores, categorical percentage-complete, decorative trend lines, fake real-time state, and charts whose input or denominator cannot be inspected.

---

## 16. Evidence, history, and provenance

Current truth always outranks historical evidence. History is reachable in one gesture, summarized in the inspector, and collapsed by default on the operating surface.

- Timelines render ordered transitions with prior → resulting state and decision basis where present.
- Action actor and decision actor remain structurally distinct; actor type (`human`, `ai_agent`, `system`, `integration`) is provenance metadata, not a state color.
- Agent recommendations use the advisory treatment. Agent execution appears in actor/provenance treatment. There is no “AI look.”
- Evidence appears adjacent to the statement, decision, outcome, or workflow field it supports; complete evidence libraries may open in inspector or route.
- Reference authority (`repository_authoritative`, `external_read_only`, `workspace_derived`) is explicit.
- Reference status uses the real four-value lifecycle and is never implied by authority type.
- History and evidence may cross-link, but history never becomes the source of current truth when a current authoritative field exists.

---

## 17. Failure-state architecture

Failure is a first-class operating state that preserves surrounding orientation and navigation.

| Failure class | Required communication | Control behavior |
| --- | --- | --- |
| **Transient** | What failed, that retry may succeed, and preserved context | Offer retry only when meaningful; keep safe navigation |
| **Structural/configuration** | Known unavailable capability and verified boundary; do not speculate beyond evidence | Disable controls that depend on the missing structure; provide an allowed next step |
| **Authorization** | Access is unavailable and whether re-authentication/requesting access is appropriate | Hide or disable prohibited mutations; never expose operational shell commands |
| **Absence/empty** | Nothing currently exists or matches, distinguished from failure | Offer creation/clear-filter action only when authorized and useful |

Every failure state states what is known, avoids unsupported diagnosis, names one useful next action where possible, qualifies controls that cannot succeed, and keeps ancestry/context visible. BUG-001's production Prompts failure is the evidence: database remediation is independent and urgent; visual architecture must not disguise it, diagnose beyond evidence, or leave impossible filters/actions enabled.

---

## 18. Authoring architecture

**Authoring is invoked, not resident.** The entry form depends on complexity and the need to preserve context:

- inline expansion for one or two low-risk fields whose result is immediately visible;
- context panel/drawer for moderate edits that benefit from seeing current truth;
- modal/overlay for short, bounded, interruptive confirmation or creation;
- dedicated route for complex, multi-step, evidence-heavy, or lifecycle-authoritative work;
- inspector authoring only for subordinate information the inspector owns.

Authoring must announce whether it changes authority, preserve the read context on cancel/success, and provide validation/failure locally. Readable Project sections do not permanently display creation forms. Command invocation may open the appropriate authoring form but does not determine which container is correct.

---

## 19. Responsive transformation

Narrow surfaces prioritize: orientation, attention, continuation, current focus, quick inspection, then lightweight authoring. Desktop regions transform by responsibility; they are not simply stacked.

| Desktop region | Narrow transformation |
| --- | --- |
| Activity rail | Invoked global navigation; current domain remains in the orientation band |
| Orientation band | Compact sticky ancestry/current identity; attention and command entry remain reachable |
| Project context rail | Invoked Project-context sheet or concise context header; status and Project identity stay visible |
| Master/detail | Separate route-backed inventory and detail views; preserve filters, scroll, and Back behavior |
| Inspector | Invoked full-height sheet or secondary route with clear return to current truth |
| History region | Secondary route/disclosure; never inserted as a long stream before current action |
| Command surface | Full-width invoked search/action surface with the same semantic grouping |
| Authoring | Lightweight panels may become full-screen; complex authoring remains dedicated |

Desktop may expose more simultaneous context. Mobile must preserve meaning and authority even when it cannot preserve simultaneous regions. Touch targets, zoom, line measure, and safe-area behavior are part of responsive acceptance.

---

## 20. Accessibility requirements

1. All rendered text, icons carrying meaning, borders required to identify controls, and focus indicators meet WCAG AA in both authenticated themes.
2. State, authority, focus, attention, selection, and failure never rely on color alone.
3. Keyboard order follows the spatial/task order; rails, inventory, operating surface, inspector, disclosures, and overlays have predictable entry/exit.
4. Focus visibility uses the interaction accent with adequate contrast and is not confused with selected or focused domain state.
5. Master/detail and command search expose names, roles, states, and results to assistive technology.
6. Reduced-motion preferences remove nonessential transitions; no state depends on motion.
7. Narrative retains readable measure and scalable type; dense rows retain scannable alignment without micro-text.
8. Hidden/collapsed content has accurate accessible state; invoked regions restore focus to their trigger.
9. Narrow surfaces remain operable at zoom and reflow without requiring horizontal reading scroll, except genuinely tabular content with an accessible alternative.

---

## 21. Primitive architecture

The implementation should establish a small set of reusable primitives and leave domain-specific assembly as composition patterns.

| Category | Decision | Responsibility |
| --- | --- | --- |
| Environment | Primitive | Authenticated altitude field and structural slots |
| Surface / Inset | Primitives | The three-level depth contract and justified boundaries |
| Row | Primitive | Selection, actions, density, keyboard semantics, and responsive transformation |
| StateLabel | Primitive | Four-role state treatment plus text/icon; no domain inference |
| MetadataField | Primitive | Label/value/identifier semantics and compact layout |
| Inventory/Table | Small primitive family | Headers, rows, empty/failure states, responsive semantics |
| Disclosure | Primitive | Accessible subordinate-content reveal |
| Timeline | Primitive | Transition, actor, decision actor, time, and provenance structure |
| EmptyState / FailureState | Primitives | Truthful absence and categorized failure communication |
| Overlay/InvokedPanel | Primitive | Focus management, dismissal, responsive container behavior |
| CommandSurface | Later specialized primitive | Semantic result groups and invoked-action shell |
| ContextRail / Inspector | Composition patterns first | Stable responsibility and slots; avoid universal prop-heavy containers |
| OperationalBrief / FocusProjection / EvidenceGroup | Composition patterns | Domain authority and content grouping remain explicit |

Primitives must not decide lifecycle meaning, focus eligibility, authority, or which action is primary. Those remain domain compositions. Do not create a large generic component framework in anticipation of hypothetical capabilities.

---

## 22. Retain / generalize / evolve / replace / remove matrix

| Current pattern | Decision | Architectural disposition |
| --- | --- | --- |
| Workspace continuation composition | **Retain** | Preserve continuation-first, single/many/none honesty and independent attention |
| Defect detail architecture | **Generalize** | Use as the shared Work-detail hierarchy while keeping defect-specific content grouped |
| Non-defect detail architecture | **Replace** | Retire equal-weight card stack in favor of shared Work detail architecture |
| Project table | **Evolve** | Structured master inventory with meaningful posture/attention/Work projection and responsive behavior |
| Project detail stack | **Replace** | Project context rail + operational brief + bounded Work projection + invoked inspector |
| Card containers | **Remove** as default | Replace repeated card markup with Environment/Surface/Inset, rows, and semantic grouping; retain bordered containers only when justified |
| State badges | **Replace** | One StateLabel grammar, four operational roles, neutral taxonomy, one strong axis per region |
| Inline/resident forms | **Replace** | Invoked authoring chosen by complexity/context |
| Lifecycle timeline | **Generalize** | Shared subordinate history pattern with transition and actor semantics |
| Evidence disclosure | **Generalize** | Inspector/adjoining inset pattern with authority and status explicit |
| Sidebar | **Evolve** | Activity-oriented global rail plus contextual Project region; no taxonomy dump |
| Mobile navigation | **Replace** | Priority-led invoked navigation/context, not a stacked desktop sidebar |
| Theme handling | **Replace** | Authenticated dark-default preference architecture with persistent choice and full light support |
| Workspace attention composition | **Retain** | Independent projection, stronger placement and failure/empty distinction |
| Project Engineering Work section | **Replace** | Bounded projection plus full inventory route |

---

## 23. Design invariants

1. Authoritative current truth outranks Project framing, derived projection, recommendation, metadata, and history.
2. Workspace, Project, and Engineering Work are distinguishable by environment and spatial composition before their headings are read.
3. Descending from Workspace to Project to Work adds context; it never discards Project identity or ancestry.
4. Collections use inventory architecture; detail surfaces never contain unbounded collections.
5. Every detail surface has one dominant current-truth/primary-action region.
6. Environment, Surface, and Inset are the only depth levels; card-inside-card composition is prohibited.
7. Exactly one operational axis owns strong state color in a region; taxonomy remains neutral.
8. Amber/ember is reserved for attention after all taxonomy usage is withdrawn.
9. UI navigation selection is ephemeral route/context state and is never operational focus.
10. Focus is explicit shared Project authority; operational focus is derived, unordered, and valid at zero, one, or many members.
11. Focus never changes continuation eligibility, and continuation never fabricates focus.
12. Attention remains independent of focus and continuation and may coexist with either.
13. State, focus, attention, authority, and selection are never communicated by color alone.
14. Current truth always appears before historical evidence; history is reachable in one gesture and subordinate by default.
15. Evidence is adjacent to the claim or decision it supports and visibly carries authority/provenance.
16. Authoring is invoked according to complexity and context; readable surfaces do not permanently host creation forms.
17. Instrumentation uses only defined, inspectable projections over real authoritative sources; `updatedAt` is never activity.
18. The environment has no arbitrary tabs, file-tree containment, user-dockable panels, editor chrome, terminal cosplay, or invented telemetry.
19. Narrow layouts transform region responsibilities around orientation, attention, continuation, focus, and inspection; they do not stack desktop wholesale.
20. Both authenticated themes meet AA; graphite is not permission for low contrast, micro-text, or invisible boundaries.
21. Failure states distinguish failure class from absence, state only what is known, preserve context, and offer only actions that can succeed.
22. Workflow variation changes structured content and grouping, never the authority hierarchy or shared Work-detail architecture.

---

## 24. Bounded implementation package sequence

This sequence refines PROJECT-UX-003 around the dependencies now established. It is a recommendation, not implementation in this package.

### Package 0 — BUG-001 database remediation (independent)

Repair the tracked migration/schema authority and production database state through the bug's own verified remediation package. This may proceed immediately and must not wait for any visual work. Visual failure-state improvement is separate and must not conceal the structural defect.

### Package 1 — Authenticated visual-system foundation

Establish Environment/Surface/Inset, Row, StateLabel, MetadataField, Disclosure, Timeline, EmptyState, FailureState, geometry rules, authority typography, four-role mapping, and authenticated theme/contrast behavior. Apply only to a tightly bounded reference slice sufficient to validate the primitives; do not restructure all routes.

**This is the recommended first bounded visual implementation package.** Every subsequent package depends on shared depth, state, authority, focus/selection distinction, contrast, and responsive primitives.

### Package 2 — Operational Focus authority implementation

Implement the already-authorized AREDIR-DISCOVERY-012 MVP after Package 1 and before Project restructuring: shared Project-scoped current relationships, append-only events, atomic commands, lifecycle/system invalidation, query-time operational projection, and minimal truthful controls/presentation. Exclude all recorded deferrals.

This placement is deliberate. Implementing focus before the visual foundation would force authoritative focus, UI row selection, attention, and continuation through the current ambiguous badge/card language. Deferring it until the Project restructure would make that restructure depend on nonexistent authority and tempt continued use of deprecated `currentFocus`/`nextStep`. The bounded focus package supplies real authority before the operating environment consumes it.

### Package 3 — Shell, persistent context, and responsive navigation

Establish the activity rail, orientation band, Project context rail behavior, global attention entry, deep-link reconstruction, narrow invoked navigation, and the non-executing command-surface entry architecture. Do not implement the full command catalog here.

### Package 4 — Engineering Work inventory and traversal

Create the first-class complete inventory, route-backed filters/search, master/detail behavior, responsive collapse, bounded Project projection contract, and explicit separation of row selection from operational focus.

### Package 5 — Project operating-context restructure

Replace the vertical capability stack with Project context rail, operational brief, actual focus projection, attention, bounded Work projection, milestone context, recent outcomes, and invoked library/inspector access. Deprecate presentation of free-text `currentFocus` and independent `nextStep` according to AREDIR-DISCOVERY-012.

### Package 6 — Unified Engineering Work detail

Generalize DEFECT-UX-001 across workflows, create the contextual inspector, align evidence/provenance/history, and replace divergent non-defect layout. Discussion and lineage remain accommodations only.

### Package 7 — Workspace instrumentation

Add only validated counts/distributions and inspection paths for Work state, attention, evidence, lifecycle, and continuation. Preserve continuation-first composition and honest ambiguity.

### Package 8 — Supporting inventories and invoked authoring

Align Projects, Knowledge Assets, Documents, Prompts, Evidence, lifecycle authoring, and failure/empty states. Add command actions only after their existing domain actions and authorization boundaries are explicit.

### Package 9 — Cross-surface responsive and accessibility validation

Validate the complete environment at representative desktop and narrow viewports, keyboard and assistive-technology traversal, reduced motion, both themes, contrast, zoom/reflow, failure states, deep links, and Back behavior.

---

## 25. Explicit deferrals

- Exact pixel tokens, breakpoints, component APIs, and shortcut bindings.
- Personal working context, arbitrary tabs, restored sessions, assignment, ranking, and primary focus.
- Focus presentation ordering beyond a non-authoritative deterministic display order.
- Discussion/threading feature design, persistence, moderation, or notification behavior.
- Relationship/lineage graph behavior and visualization.
- Recommendation generation, delegated agent authority, or an “AI” visual dialect.
- New instrumentation or measurement contracts beyond currently defined projections.
- Project-status history and historical operational-focus projection beyond AREDIR-DISCOVERY-012's MVP.
- Final command catalog and destructive-command confirmation flows.
- Whether ambiguous prompt `run`, reference `expected`, or advisory `priority` semantics should ever receive stronger operational treatment; current presentation remains neutral/context-bound.

These deferrals do not block the visual-system foundation, the authorized Operational Focus MVP, shell/context work, inventory work, or the Project/Work restructures described above.

---

## 26. Verification and completion record

### Completion criteria answered

The canonical spatial model, altitude distinctions, context persistence, inventory and inspector ownership, command role, authority/projection hierarchy, focus/continuation/attention separation, four-role state language, theme architecture, shared Work detail, Project/Workspace architecture, real instrumentation standard, discussion/relationship accommodation, responsive transformation, primitive boundary, focus sequencing, and readiness decision are defined in this record.

### Files changed by PROJECT-UX-004

- `docs/discovery/PROJECT-UX-004_AUTHENTICATED_VISUAL_SYSTEM_AND_OPERATING_ENVIRONMENT_ARCHITECTURE.md`
- `docs/discovery/README.md`

### Verification performed

- Reconciled the named canonical baseline and the actual Project, Engineering Work, milestone, reference, prompt, and Knowledge Asset vocabularies in the repository.
- Verified `PROJECT-UX-004` appears only in this artifact and the discovery index.
- Verified every local Markdown link target in this artifact and the discovery index exists.
- Verified the artifact has no trailing whitespace and the repository diff passes `git diff --check`.
- Reviewed the worktree scope and confirmed this package changed no file under `src/` or any runtime/schema/migration/test/seed path.

### Runtime boundary

No application code, CSS, component, route, schema, migration, query, server action, test, seed data, runtime behavior, Project behavior, Engineering Work behavior, focus behavior, continuation, attention, lifecycle logic, discussion, relationship, command surface, inspector, master/detail UI, or theme behavior changed.

### Implementation readiness

**READY WITH EXPLICIT DEFERRALS.** The first bounded visual implementation package is **Authenticated visual-system foundation** (Package 1). BUG-001 remediation remains Package 0 on its own independent track and may proceed first in calendar time.
