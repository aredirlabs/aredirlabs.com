# PROJECT-UX-003 — Authenticated Operational Visual System Evaluation

| Field | Value |
| --- | --- |
| **Package** | PROJECT-UX-003 |
| **Title** | Authenticated Operational Visual System Evaluation |
| **Type** | UX / experience evaluation and design direction (discovery) |
| **Status** | Complete — evaluation only |
| **Review date** | 2026-08-22 |
| **Scope** | Authenticated `/workspace/**` surfaces: visual identity, information architecture, interaction architecture, product semantics |
| **Outcome** | Recommendation with sequencing. No runtime, code, style, component, schema, migration, query, action, test, or seed changes |
| **Depends on** | AREDIR-UX-001, OPERATIONAL-EXPERIENCE-001, PROJECT-UX-002, DEFECT-UX-001, AREDIR-DISCOVERY-009/010/011/012 |
| **Deliberately not claimed** | Does not consume an `AREDIR-DISCOVERY-*` identifier; does not modify concurrent architecture work |

---

## 0. Why this identifier and location

This artifact deliberately avoids the `AREDIR-DISCOVERY-*` series because that series is in active concurrent use through
`AREDIR-DISCOVERY-012` (untracked at the time of this evaluation).

`PROJECT-UX-002` established the repository's existing convention for experience discovery and evaluation: a phased bundle
whose discovery record lives in `docs/discovery/` and whose assessment and validation records live in `docs/engineering/`.
This package continues that lineage as `PROJECT-UX-003`. The identifier was verified unused.

No dedicated "UX evaluation" filename convention previously existed in this repository. This record follows the closest
established one rather than inventing a competing architecture series.

---

## 1. Evidence standard and provenance

Findings in this document are labelled by evidence class. This matters because most prior UX records in this repository
were explicitly unable to observe the authenticated runtime, and this evaluation must not silently inherit that gap.

| Class | Meaning |
| --- | --- |
| **Observed (runtime)** | Seen rendering in the authenticated production application |
| **Observed (source)** | Verified in repository source or computed from it |
| **Interpretation** | What the observed experience communicates |
| **Recommendation** | What should change |
| **Future compatibility** | What the design must be able to absorb later |

### 1.1 Runtime surfaces actually inspected

Observed in the authenticated production application at `https://www.aredirlabs.com`, supplied as operator screenshots.
A local development server was also started (`next dev`, port 3001) and confirmed serving, but the agent shell was
unauthenticated: `/workspace` returned `307 → /sign-in`, `/sign-in` and `/` returned `200`. The agent had no browser
automation and no session; all authenticated observation came from operator-supplied captures.

| Surface | Route | Observed |
| --- | --- | --- |
| Workspace root | `/workspace` | Yes — desktop, single continuation mode, empty attention, 2 active projects |
| Project registry | `/workspace/projects` | Yes — desktop, 4 projects |
| Project detail | `/workspace/projects/aredirlabs-com` | Yes — desktop, zoomed out; page still exceeded viewport |
| Documents | `/workspace/docs` | Yes — desktop, 6 documents |
| Prompts | `/workspace/prompts` | Yes — desktop, **in a genuine production failure state** (see 3.7) |

### 1.2 Runtime surfaces NOT inspected

Stated explicitly. No runtime findings are asserted for these.

- Engineering Work detail — **both** layout branches (defect and non-defect). This is the most significant gap; the
  non-defect branch is the surface this evaluation criticises most heavily, and that criticism rests on source and on
  the `DEFECT-UX-001` before-state record, not on runtime observation.
- Engineering Work authoring, edit, activate, complete, evidence surfaces.
- Knowledge Assets index and detail, Settings, document and prompt detail. The Prompts index was observed only in its
  failure state, never with data.
- Narrow/mobile viewports on any surface. All mobile findings in this document are source-derived.
- Loading states, and empty states other than the empty attention region on Workspace root. One genuine production
  **error** state was observed unplanned on Prompts and is evaluated in 3.7.
- Keyboard traversal, focus order, screen-reader behaviour.

### 1.3 Repository surfaces inspected

- All 17 routes under `src/app/workspace/**` plus three `not-found` boundaries, `layout.tsx`, `loading.tsx`, `error.tsx`.
- `src/app/layout.tsx`, `src/app/globals.css` (full token set, both themes).
- `src/components/workspace/**` (23 files), `src/components/ui/**`, `src/components/eyebrow.tsx`,
  `src/components/theme-toggle.tsx`, `src/components/site-header.tsx`, `components.json`.
- State vocabularies in `src/lib/workspace/*` and `pgEnum` definitions in `src/lib/db/schema.ts`.
- Governance and prior experience canon: `AREDIR-UX-001`, `DESIGN_GOVERNANCE`, `AREDIR_UI_QUALITY_AUDIT_STANDARD`,
  `OPERATIONAL-EXPERIENCE-001`, `PROJECT-UX-002` bundle, `UX-001`, `UX-002`, `DEFECT-UX-001`,
  `WORKSPACE-OPERATIONAL-003`, `UI-FOUNDATION-INVENTORY`, `docs/brand/*`, `AREDIR-DISCOVERY-009/010/011/012`.

### 1.4 Two premises in the commissioning brief that the repository does not support

Recorded because the brief asked for evaluation against product reality, and reality diverges.

**A Proposed Engineering Work item for "Engineering Work Discussion and Threaded Collaboration Architecture" does not
exist in this repository.** An exhaustive search found the concept only as an explicit *deferral* inside
`AREDIR-DISCOVERY-012`, which states discussion is "Deferred and separate" and asks how future threads would link to
focus events without moving rationale authority into focus history. No Engineering Work record, seed row, or docs record
carries that title. The scalability question the brief asks is still worth answering, and Section 17 answers it — but as
forward compatibility for a deferred concept, not as accommodation of committed work.

**"Cyan" is not the Aredir interaction colour.** The brief proposes a "disciplined cyan/blue interaction language". The
implemented and brand-documented primary is *arcane blue* at hue 262 (`oklch(0.55 0.18 262)` light,
`oklch(0.70 0.16 262)` dark) — a blue-violet, not a cyan. Section 12 recommends against introducing cyan.

---

## 2. Core question, answered directly

> Does the current authenticated Aredir experience visually and interactionally communicate an Engineering Operating System?

**No.** It communicates two different things at two different altitudes, and neither is an operating system.

At overview altitude — Workspace root, Project registry, Documents — it reads as a **calm internal documentation portal**.
Centred editorial measure, generous leading, prose-first presentation, roughly half the viewport empty, and no
instrumentation, orientation chrome, or operational signal.

At detail altitude — Project detail, and by source inspection non-defect Engineering Work detail — it reads as a
**full-bleed administrative record page**: an undifferentiated stack of visually identical panels, edge-to-edge prose,
permanently-expanded authoring forms, and an unbounded inventory embedded inside a detail surface.

The gap is not primarily aesthetic. The token layer already encodes the intended identity. The failure is that the
*structure* does not express operational meaning, and the visual system that would express it was never built as a
system — only as repeated inline strings.

---

## 3. Current character by surface

### 3.1 Workspace root — `/workspace`

**Observed (runtime).** Sidebar 224px. Content in a centred `max-w-5xl` column. Three stacked regions: Continue
(one bordered card), Attention (empty, one sentence of muted text), Active projects (two divided rows). Approximately a
third of the vertical space empty, the bottom eighth entirely blank. Operational state rendered as tiny low-contrast
uppercase mono text at the card's top-right (`ACTIVE · DELIVERY WORKFLOW`). No breadcrumb, no search, no command
surface, no counts.

**Observed (source).** `src/app/workspace/page.tsx:144` — `mx-auto w-full max-w-5xl px-5 py-9 sm:px-10 sm:py-14`. State
is rendered by the local `Position` component (`:18`) as `font-mono text-[0.65rem] ... text-muted-foreground`, not as a
badge. Single-continuation mode is the only mode that produces a card (`:28`); ambiguous and empty modes use
`divide-y ... border-y` lists.

**Interpretation.** This surface is honest and well-reasoned. Its restraint is deliberate and canonical:
`WORKSPACE-OPERATIONAL-003` explicitly rejected KPI cards, decorative statistics, and equal-weight section grids, and
`OPERATIONAL-EXPERIENCE-001` principle 1 puts operational state before inventory. The single-continuation composition is
the strongest expression of product thinking anywhere in the application.

But the restraint was applied to *content selection* and then also, by omission, to *environment* and *instrumentation*.
The result answers "what should we accomplish now?" and nothing else. It does not tell an operator what is happening
across the portfolio, what changed since last session, or where the system is under strain. It is a correct answer
delivered in a room with no instruments.

**What works — preserve.** Continuation-first composition. The three honest continuation modes. Refusing to choose when
state does not justify choosing. Attention as an independent region rather than a badge on a card. The
`Eyebrow` → `h1` → description orientation pattern.

**What limits it.**

| Limit | Primary type |
| --- | --- |
| No environmental signal that this is the operating surface rather than a library | Visual Identity |
| Empty attention consumes a full region to say nothing | Information Architecture |
| Operational state rendered as low-contrast micro-text, inconsistent with badges elsewhere | Mixed (Visual Identity + Product Semantics) |
| No portfolio-level instrumentation despite real data existing | Product Semantics |
| Centred `max-w-5xl` wastes desktop width with no second region | Information Architecture |
| No orientation chrome: no breadcrumb, search, or command surface | Interaction Architecture |

**Density: too sparse.**

### 3.2 Project registry — `/workspace/projects`

**Observed (runtime).** A genuine table: Name, Status, Stage, Current focus, Next step, Target, Repo. Four rows.
Mono uppercase header. Status and Stage render as pale coloured pills. Four rows occupy the top third; the remainder is
empty. No filter, sort, group, or search control.

**Observed (source).** `src/app/workspace/projects/page.tsx:62-63` — `overflow-x-auto rounded-lg border border-border`
wrapping `w-full min-w-[960px] text-left text-sm`. `currentFocus` and `nextStep` cells are
`max-w-[220px]` with `line-clamp-2` (`:100-109`), so both truncate.

**Interpretation.** Structurally the strongest surface in the application, and the only one that treats a collection as
a collection. It is also the clearest demonstration of the state-language defect, because Status and Stage sit adjacent
drawing from one palette.

Critically, this is a **pure Project-authority surface with no window into Engineering Work**. There is no work count, no
state distribution, no attention signal. An operator cannot tell which of four projects needs them without entering each
in turn. `AREDIR-DISCOVERY-010` establishes exactly the material that would make this surface operational — attention and
recent outcomes as derived projections — and none of it is projected here.

**What works — preserve.** The table itself. Mono uppercase column headers. `currentFocus` and `nextStep` as columns.
Repo as an outbound link.

**What limits it.**

| Limit | Primary type |
| --- | --- |
| Status and Stage share one colour scale across two independent axes | Visual Identity |
| No Engineering Work projection: no counts, states, or attention | Product Semantics |
| No filter, sort, or grouping — will not survive scale | Information Architecture |
| Truncation at 220px discards the two most operational columns | Information Architecture |
| No row selection or inspector; every inspection is a full navigation | Interaction Architecture |

**Density: too sparse at four rows; unscalable rather than overloaded.**

### 3.3 Project detail — `/workspace/projects/[slug]`

The most damaged surface, and the clearest case of structure rather than styling being at fault.

**Observed (runtime).** Zoomed far out, the page still exceeded the viewport. Content is **full-bleed**: Engineering Work
rows and summary prose span the entire monitor width. Roughly sixteen Engineering Work items stack as near-identical
rows inside the Engineering Work panel, each carrying badges, title, and a `Next:` line. Below that, a sequence of
visually identical panels: Current focus, Overview, Registry record, Milestones, Documents, Prompts, Notes. Several
sections terminate in a **permanently-expanded inline create form** with visible inputs, selects, and submit buttons.

**Observed (source).** `src/app/workspace/projects/[slug]/page.tsx:172` — container is `p-8` with **no `max-w-*`
anywhere on the page**; verified by direct search. Eight top-level `<section>` panels, seven of which are the identical
string `rounded-lg border border-border bg-card p-6`, one of which is the primary variant
`rounded-lg border border-primary/25 bg-card p-6 shadow-sm`. The Engineering Work list is sorted by a local
`workStateRank` map (`project-engineering-work-section.tsx:22-33`) into one featured item plus an unbounded
`Other engineering work` list (`:116-144`).

**Interpretation.** Three compounding failures.

*Unbounded inventory inside a detail surface.* `OPERATIONAL-EXPERIENCE-001` predicted this precisely — it recorded that
the Engineering Work collection has "No dedicated route" and that `Other engineering work` "grows indefinitely". That
prediction is now visibly realised at sixteen items. This is an **Information Architecture** failure. The fix is a
first-class Engineering Work inventory surface with grouping and filtering, plus a bounded, summarised projection on
Project detail. It is emphatically *not* smaller cards, tighter padding, or a scroll region.

*No measure constraint.* Full-bleed `p-8` on a wide display produces prose lines far beyond readable measure. Both
`DESIGN_GOVERNANCE` ("Max-width containers for readability") and `DEFECT-UX-001` (which introduced `max-w-5xl` and
`max-w-3xl` for exactly this reason) already require a bound. Project detail never received it. This one is genuinely
**Visual Identity / styling**, and correspondingly cheap to fix.

*Authoring chrome permanently resident.* Four inline create forms occupy vertical space unconditionally. Reading and
authoring are different intents; the surface serves both simultaneously and pays for both continuously.
**Interaction Architecture.**

The compound effect is that Project detail is the "vertical capability catalog" that `OPERATIONAL-EXPERIENCE-001`
explicitly named as an architectural risk. It is organised by *what the system can store* — milestones, documents,
prompts, notes — rather than by *what is happening*.

**What works — preserve.** Engineering Work positioned first, above Project metadata (the `UX-001` decision, and the
right call). The featured-work-plus-supporting split. Naming `What should happen next` explicitly. Per-section error
isolation, so one failing query does not blank the page.

**What limits it.**

| Limit | Primary type |
| --- | --- |
| Unbounded Engineering Work inventory embedded in a detail surface | Information Architecture |
| Eight top-level panels at identical visual weight | Visual Identity + Information Architecture |
| No `max-w-*`; prose at full monitor width | Visual Identity |
| Four permanently-expanded inline create forms | Interaction Architecture |
| Registry record duplicates Overview fields in a separate identical panel | Information Architecture |
| Project `currentFocus` presented with the same authority as Engineering Work `currentNextAction` | Product Semantics |
| Status and Stage badges adjacent in the header, sharing one palette, with no column labels to disambiguate | Visual Identity |
| No use of desktop width; single column at any viewport | Information Architecture |

**Density: cognitively overloaded.**

### 3.4 Engineering Work detail — two divergent layouts

**Not observed at runtime.** Source-derived, corroborated by the `DEFECT-UX-001` record.

**Observed (source).** `engineering-work/[workId]/page.tsx` branches at line 143 on
`work.workflow === "defect" && defectContext`. The branches are materially different products.

*Defect branch (`:151-406`).* Bounded `mx-auto max-w-5xl`, `max-w-4xl` title, `max-w-3xl` synopsis. A distinguished
primary action band (`border border-primary/30 bg-primary/5` with a `border-l-4 border-primary` rule). Investigation
grouped into named subsections — Behavior, Reproduction context, Evidence and validation — inside one panel with
internal `border-t` separators rather than separate cards. Progressive disclosure via `<details>` for Related knowledge,
Repository evidence, and Reference metadata. A timeline `<ol>` for lifecycle history. Explicit historical-posture
handling that relabels the action band `Current operational next action · historical` and withdraws the action.

*Non-defect branch (`:409-592`).* `p-8`, no measure bound. `space-y-4` stack of up to nine panels, six of which are the
identical `rounded-lg border border-border bg-card p-6`. No progressive disclosure — Related knowledge, Repository
artifacts, and Record details are all fully expanded. Full lifecycle history inline.

**Interpretation — the most important finding in this evaluation.** The `DEFECT-UX-001` before-state list, written about
the defect route before remediation, describes the *current* non-defect route almost item for item: equal visual
emphasis across investigation, outcome, condition, knowledge, evidence and metadata; nested information presented as
peers; excessive reading width; unclear section boundaries; supporting context competing with the primary action; and
page length driven by container repetition rather than narrative. Its own words: "The length reflects component
repetition more than narrative transitions."

Aredir therefore already contains its own proof of the target pattern. The remediation was applied to one workflow and
never generalised. The defect branch is also the **only** authenticated workspace surface with documented runtime visual
validation, at four viewports.

This is decisive for the recommendation. The target is not speculative and does not need inventing — it needs
generalising, then given the visual-system layer it never had.

**What works — preserve, and generalise.** Everything in the defect branch: measure bounds, the distinguished action
band, named grouping inside a single panel, progressive disclosure for evidence and metadata, timeline history,
historical-posture handling.

**What limits it.**

| Limit | Primary type |
| --- | --- |
| Two divergent detail architectures for one domain concept | Information Architecture |
| Non-defect branch has no measure bound, no disclosure, no grouping | Mixed |
| Structured context exists only for the defect workflow | Product Semantics |
| History rendered at the same weight as current operational truth | Visual Identity + Product Semantics |
| No spatial region reserved for future reasoning or discussion | Information Architecture |

**Density: defect branch dense but manageable; non-defect branch cognitively overloaded.**

### 3.5 Documents — `/workspace/docs`

**Observed (runtime).** Search field, then a two-column grid of six cards, each with a coloured category badge, an
updated timestamp, title, project name, and a clamped excerpt. Roughly half the viewport empty. Three different labels
for one concept in one viewport: nav says `DOCUMENTS`, eyebrow says `INTERNAL DOCUMENTATION`, heading says `Docs`.

**Interpretation.** Appropriate as a library. Two problems. First, document categories (`ARCHITECTURE` cyan, `DECISION`
amber, `QA` rose, `RESEARCH` sky) draw from the same palette as Engineering Work lifecycle states (`proposed` amber,
`active` sky, `cancelled` rose) — a taxonomy axis colliding with a state axis. Second, this library is visually
indistinguishable from the operating surfaces, so the shell never signals which kind of place the operator is in.

**Density: too sparse.**

### 3.6 Remaining surfaces

Source-derived. Knowledge Assets uses tables plus a review dashboard and adoption matrix — **dense but manageable**, and
the only surface with anything resembling instrumentation. Prompts mirrors Documents. Settings is two placeholder panels
— **too sparse**, and a `Trust and Credibility` concern under the UI Quality Audit Standard, which flags visible
placeholder content as confidence-reducing. Evidence and the lifecycle form surfaces are single bounded `max-w-3xl`
form panels and are among the better-composed surfaces in the application.

---

### 3.7 Failure states — observed on `/workspace/prompts`

**Observed (runtime).** The Prompts index was encountered in a genuine production failure state. Header and description
render normally. The full four-control filter row — search field, project select, type select, status select, and a
`Filter` submit button — renders and appears fully operable. In place of results sits a destructive-tinted alert:
"Could not load prompts / Check that the database is reachable and the prompt table has been pushed." Navigation is
intact; the surrounding shell is unaffected. Roughly three quarters of the viewport is empty.

**Observed (source).** `workspace_project_prompts` is declared at `src/lib/db/schema.ts:294` but appears in **none** of
the tracked migrations `drizzle/0000_*`–`0006_*`. Comparing the schema against the tracked corpus: `workspace_projects`
and `workspace_engineering_work` (plus its six satellite migrations) are migration-managed, while
`workspace_project_notes`, `workspace_project_milestones`, `workspace_project_documents`, and
`workspace_project_prompts` are not present in any migration and are therefore `db:push`-managed.

**Interpretation — the root cause is a split in schema authority, not a UI defect.** Documents, notes, and milestones
render in production because an earlier `db:push` reached those tables; Prompts is where that drift surfaced. The error
copy names the mechanism it depends on ("has been pushed"), which is an accurate description of a real architectural
condition. Remediation belongs to a database or defect package, not to this evaluation, and is recorded separately as
[BUG-001](../bugs/BUG-001_WORKSPACE_PROMPTS_UNAVAILABLE_IN_PRODUCTION.md) — but the *experience* of the
failure is squarely in scope, and it exposes four findings that generalise to every failure state in the product.

*Interactive controls remain enabled against an unavailable data source.* All four filter controls and the submit button
appear operable while no query can succeed. Under the UI Quality Audit Standard this is a Level 4 Interaction Readiness
failure: controls that look inert or ambiguous are called out, and controls that look *functional but cannot succeed* are
a stronger version of the same defect. Filtering nothing produces the same screen, so the operator may reasonably
conclude their filter was wrong rather than that the surface is broken.

*The error names two causes and no next action.* "Database unreachable" is transient and warrants a retry;
"table has not been pushed" is structural and warrants a migration. These are entirely different operator situations
with different next steps, and the message merges them. This is notable because naming exactly one
`currentNextAction` is the product's single strongest and most consistent pattern — and the failure surface abandons it.
An operating environment should be at its most directive when something is broken, not least.

*There is no recovery affordance.* No retry, no diagnostic link, no path forward. Recovery requires a manual reload, and
the operator is given no way to distinguish "try again" from "this needs a migration".

*Failure states leak operator-runbook vocabulary.* "Pushed" is `db:push` jargon. Defensible in a single-operator internal
tool, and honesty is genuinely preferable to a generic apology — but it is a Trust and Credibility concern under the UI
Quality Audit Standard, and it will read poorly if the workspace is ever demonstrated in a client or consulting context.

**What works — preserve.** Honest, specific, non-generic error copy that names a real cause. Scoped failure that leaves
navigation and shell intact rather than blanking the page. Consistent destructive-tinted alert treatment across surfaces.
Per-region error isolation on Project detail, where one failing query does not take down the page, is a genuinely good
pattern and the right foundation.

**What limits it.**

| Limit | Primary type |
| --- | --- |
| Controls remain enabled while the data source is unavailable | Interaction Architecture |
| Two merged causes, no single next action | Product Semantics |
| No retry or recovery affordance | Interaction Architecture |
| Runbook vocabulary surfaced to the operating experience | Visual Identity / Trust |
| Failure occupies a thin band in an otherwise empty viewport | Information Architecture |

**Recommendation.** Failure states should be treated as first-class operational states rather than as absence of
content, and should inherit the product's own discipline: state what is true, distinguish transient from structural,
name exactly one next action, and disable controls that cannot succeed. This costs little and is disproportionately
visible, because failure states are where an operating environment either demonstrates or forfeits credibility.

**Density: too sparse**, though appropriately so for an error — the concern is the absent next action, not the empty space.

---

## 4. Required findings matrix

Severity uses the `AREDIR_UI_QUALITY_AUDIT_STANDARD` scale.

| Surface | Current Character | Primary Problem Type | Severity | Retain | Evolve | Replace | Target Direction |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Authenticated shell | Neutral admin frame | Visual Identity | High | Sidebar model, route set | Environment, density, theme, context bar | — | Graphite operating environment with persistent context |
| Global navigation | Capability registry list | Product Semantics | Medium | Icon+mono labels, `aria-current` | Contrast, grouping, add EW route | — | Operate / inspect / library grouping |
| Breadcrumbs | Absent; single back link | Interaction Architecture | Medium | Back link intent | — | Add ancestry + context persistence | Persistent Project context |
| Workspace root | Documentation portal | Mixed | High | Continuation modes, honesty | Environment, instrumentation, width use | — | Operating bridge with real instruments |
| Project registry (table) | Registry report | Product Semantics | Medium | Table, mono headers | Add EW projection, filter, group, inspector | — | Operable inventory with master/detail |
| Project detail | Vertical capability catalog | Information Architecture | **Critical** | EW-first order, featured split | Measure bound, panel hierarchy, disclosure | Embedded unbounded EW inventory | Bounded operational brief + linked inventory |
| EW inventory | Does not exist as a route | Information Architecture | **Critical** | — | — | Create as first-class surface | Grouped, filterable inventory |
| EW detail (defect) | Operational brief | — | Low | Whole composition | Visual-system alignment only | — | Canonical reference pattern |
| EW detail (non-defect) | Administrative record | Information Architecture | **Critical** | Objective-position-next-action order | — | Replace with generalised defect architecture | One detail architecture per domain |
| State badges | Decorative rainbow | Visual Identity | High | Mono uppercase voice | — | Replace colour semantics wholesale | Disciplined 4-role state language |
| Metadata blocks | Consistent `dl` pattern | Visual Identity | Low | Label/value pattern, mono labels | Subordinate weight, tabular numerals | — | Recessed inset metadata regions |
| Action areas | Inconsistent placement | Interaction Architecture | Medium | Defect action band | Generalise band, unify button use | — | One action region per surface |
| History | Full-weight card | Product Semantics | High | Append-only timeline, provenance | Subordinate + collapse by default | — | Visually recessive evidence |
| Evidence / references | Card list, sometimes disclosed | Information Architecture | Medium | Authority labelling, empty-state copy | Consistent disclosure everywhere | — | Inspector-accessible, subordinate |
| Empty states | Honest, well-written | — | Low | Copy quality and honesty | Compress when structurally empty | — | Proportional to significance |
| Failure states | Honest but non-directive | Interaction Architecture | High | Specific copy, scoped failure, region isolation | Disable dead controls, split transient vs structural, one next action, retry | — | Failure as first-class operational state |
| Inline create forms | Always expanded | Interaction Architecture | High | Server-action pattern | — | Replace with invoked authoring | Authoring on demand |
| Mobile navigation | Horizontal scroll strip | Interaction Architecture | Medium | Zero-hidden-affordance honesty | Priority ordering, reachability | — | Operate-first narrow surface |
| Settings | Placeholder | Trust | Medium | — | — | Build or remove from nav | Real configuration or absent |
| Theme | Light only, dark unreachable | Visual Identity | High | Full dark token set exists | Activate + persist in workspace | — | Dark-default operating environment |

---

## 5. Operating System test

> What should "an operating system for engineering work" mean experientially?

It should mean that the environment holds engineering state *for* the operator, so that arriving does not require
reconstruction. Specifically: you arrive already oriented; current state is legible without assembly; context persists
as you move; relationships are traversable rather than remembered; the next real action is available where you are;
conditions and attention surface without being sought; evidence sits within reach of the claim it supports; progression
is visible; and current operational truth is never confusable with historical record.

`OPERATIONAL-EXPERIENCE-001` already defines this well, and principle 10 — "Environment reduces reconstruction work" —
is the correct single test. Assessed against it:

| Characteristic | Status | Evidence |
| --- | --- | --- |
| Immediate operational orientation | **Partially present** | Workspace root answers "what now?" well; no portfolio picture, no "what changed" |
| State awareness | **Partially present** | State exists and is labelled, but through six competing visual languages |
| Context persistence | **Absent** | No breadcrumb, no persistent Project context; back link only. Leaving a work item loses the frame |
| Hierarchy | **Absent** | Workspace, Project, and Work are visually interchangeable; eight equal panels on Project detail |
| Relationships | **Partially present** | Related knowledge and evidence exist and are labelled with authority; lineage and work-to-work relationships are unimplemented |
| Actionable next work | **Present** | The application's genuine strength: `currentNextAction` is named on every relevant surface |
| Conditions and attention visibility | **Partially present** | Attention region exists on Workspace root only; invisible from the registry |
| Evidence proximity | **Partially present** | Present on EW detail, disclosed on the defect branch, fully expanded elsewhere |
| Progression | **Absent** | Append-only history exists but is never rendered as progression; no lifecycle position indicator |
| Session continuity | **Partially present** | Continuation projection is genuinely strong; nothing persists across sessions, and `AREDIR-DISCOVERY-012` correctly defers persisted focus |
| Current vs historical distinction | **Partially present** | Handled well on the defect branch, absent elsewhere; history renders at full card weight |
| Useful instrumentation | **Absent** | Zero. `--chart-1` through `--chart-5` are defined and unused; the only stat component built is dead code |

Six absent or largely absent, six partially present, one present. **Aredir is not yet an operating environment.**

### 5.1 Dashboard versus operating environment

A dashboard reports. An operating environment helps an operator understand state, navigate context, decide, continue,
inspect evidence, and act.

Aredir currently sits **at neither pole, and this is the most interesting structural finding**. It is not a dashboard —
it deliberately refused to become one, and `WORKSPACE-OPERATIONAL-003` records that refusal explicitly. But it did not
become an operating environment either. It became a **reading environment**: a set of well-written, honest,
carefully-reasoned pages that describe engineering state in prose and let the operator navigate between them.

That is a more interesting starting position than a dashboard would be, because the hard part is already done. The
product semantics are unusually mature: lifecycle states with append-only history, distinct action and decision actors,
authority-typed provenance, repository evidence with authority labels, honest three-mode continuation, conditions
separated from states. Very few products at this stage have this much genuine operational meaning modelled.

What is missing is that **almost none of that meaning is expressed visually**. Distinct action and decision actors are
rendered as two adjacent `dl` fields in identical grey mono. Continuation eligibility, attention, and lifecycle state
all resolve to similar small pills or similar small grey text. The semantic depth exists in the database and in the
documents; the interface flattens it back into prose.

Moving toward an operating environment therefore does not require new features. It requires **giving existing semantics
visual and spatial expression**: hierarchy that distinguishes authority from projection, context that persists, a
bounded inventory that can be operated rather than scrolled, and instrumentation built only from state that already
exists.

---

## 6. Surface hierarchy

> Workspace → Project → Engineering Work → Evidence / History / Related context

| Question | Answer | Evidence |
| --- | --- | --- |
| Does Workspace feel different from Project? | **No** | Both are white panels on near-white in the same shell. Workspace is centred and Project is full-bleed, which is an accident of differing container classes, not a hierarchy signal |
| Does Project establish context before showing work? | **Inverted, deliberately** | Work comes first by the `UX-001` decision. Correct for operations, but Project identity is then reduced to a title plus two ambiguous badges, so context is never established at all |
| Does Engineering Work feel like the primary operational artifact? | **Partially** | Yes on the defect branch. No on Project detail, where it is one of eight equal panels, nor in the registry, where it is invisible |
| Does detail presentation make authoritative information visually clear? | **No** | Project `currentFocus`, Engineering Work `currentNextAction`, and history entries all render at comparable weight, despite `AREDIR-DISCOVERY-010` establishing that they occupy different authority classes |
| Is evidence subordinate but accessible? | **Inconsistently** | Yes on the defect branch via `<details>`. No elsewhere, where it is a full-weight panel |
| Is historical information distinguishable from current truth? | **Largely no** | `EngineeringWorkHistory` is `rounded-lg border border-border bg-card p-6` — the same container as Current outcome and Condition |

### 6.1 Recommended hierarchy principles

1. **Altitude should be immediately legible.** Workspace, Project, and Engineering Work should differ in environment —
   background depth, chrome density, measure — not merely in heading text.
2. **Authority class should outrank content type in visual weight.** Authoritative operational truth reads strongest;
   derived projections read supporting; historical evidence reads recessive. This maps directly onto the authoritative /
   derived / historical distinction `AREDIR-DISCOVERY-010` and `-012` already establish.
3. **Detail surfaces bound their measure; inventory surfaces use full width.** Prose gets a measure. Tabular data does
   not need one.
4. **A collection embedded in a detail surface must be a bounded projection with a route to its full form.** Never an
   unbounded list.
5. **Exactly one primary action region per surface.**
6. **History is reachable in one gesture and never competes with current state.**

---

## 7. Project versus Engineering Work authority

`AREDIR-DISCOVERY-010` establishes the boundary: Project owns identity, posture, and configuration; Engineering Work
owns operational activity and lifecycle. It further establishes that continuation, attention, and recent outcomes are
*derived projections*, and Invariant 4 states that projection is not authority.

**Is the visual system capable of expressing this? Not currently — and the failure is concentrated in one place.**

The interface blurs the layers in three specific ways.

*Project `currentFocus` competes with Engineering Work `currentNextAction`.* `AREDIR-DISCOVERY-009` identifies this as
the highest-risk authority overlap in the system, and notes `currentFocus` is seed-authored with no mutation path. In
the interface, Project detail presents `Current focus` in a panel visually identical to every other panel, and the
registry gives it a column of equal weight to `Next step`. Nothing signals that one is Project-level emphasis and the
other is work-level operational truth.

*Status and Stage collide.* Two independent Project axes — business posture and maturity classification — render in one
palette. In the registry, column headers disambiguate. In the Project detail header they sit adjacent with no labels at
all, and the encoding fails outright.

*Derived projections are indistinguishable from authoritative state.* Continuation and attention are derived, but on
Workspace root they render in the same visual language as any other content.

### 7.1 Recommended approach

Express **authority class** as a persistent visual dimension, distinct from and orthogonal to state colour:

- **Authoritative operational truth** — Engineering Work state, `currentNextAction`, conditions, outcomes. Strongest
  surface weight, largest type, the only region carrying the interaction accent as a structural rule.
- **Project posture and configuration** — identity, status, stage, target, milestones. Header and rail material.
  Framing, not content.
- **Derived projection** — continuation, attention, counts, distributions. Visually marked as computed. A consistent
  affordance conveying "this is a live view, not a stored fact" — for example a shared projection label treatment — so
  that Invariant 4 is legible rather than merely documented.
- **Historical evidence** — lifecycle history, prior revisions, past selections. Recessive, inset, collapsed by default.

Then separate the two Project axes: keep exactly one of Status or Stage in the colour system — Status, because it gates
operational participation via `operatingProject` — and render Stage as neutral typographic metadata or a position
indicator. Two axes, one palette, is not survivable.

---

## 8. Operational state language

### 8.1 Observed inventory

Actual state vocabularies in the repository:

| Domain | Values |
| --- | --- |
| Engineering Work state | `proposed`, `active`, `in_review`, `completed`, `closed`, `cancelled`, `superseded` |
| Engineering Work workflow | `delivery`, `defect`, `discovery`, `research`, `architecture`, `maintenance`, `verification`, `documentation`, `promotion`, `release` |
| Engineering Work type | `feature`, `task`, `bug`, `research`, `architecture`, `verification`, `documentation`, `maintenance`, `release` |
| Project status | `active`, `testing`, `paused`, `planning`, `archived` |
| Project stage | `concept`, `prototype`, `mvp`, `uat`, `production`, `maintenance` |
| Milestone status | `planned`, `active`, `blocked`, `completed`, `deferred` |
| Reference status | `expected`, `verified`, `stale`, `missing` |
| Prompt status / type | 5 / 8 values |
| Document category | 7 values |
| Knowledge asset category / status | 7 / 4 values |

That is **more than sixty enumerated values across ten axes**, plus derived conditions, continuation eligibility, and
attention.

### 8.2 How state is currently communicated, and why it does not scale

Through **all** available channels simultaneously and inconsistently:

- **Colour** — eleven distinct Tailwind hues (`amber`, `sky`, `violet`, `emerald`, `stone`, `rose`, `cyan`, `teal`,
  `blue`, `fuchsia`, `indigo`) plus four semantic tokens (`primary`, `success`, `ember`, `destructive`).
- **Two colour systems in parallel** — `project-status-badge.tsx` uses semantic CSS-variable tokens; every other badge
  family hard-codes raw palette classes, bypassing the token layer entirely.
- **Two shapes** — `rounded-full` for Project, knowledge, and document badges; `rounded-md` for Engineering Work and
  prompt badges.
- **Two border opacities** — `/20` in some files, `/30` in others.
- **Text without colour** — Workspace root renders state as grey mono micro-text with no badge at all.
- **No colour** — milestone and note types render neutral grey for every value.
- **Placement and grouping** — the Attention region, and continuation ordering.

Three distinct defects follow.

**Semantic collision.** The same hue means unrelated things across axes: `amber` is Project `paused`, Project stage
`uat`, Engineering Work `proposed`, prompt `needs_followup`, prompt type `audit`, document category `decision`, and
knowledge `qa_standard` — **seven meanings**. `sky` is Engineering Work `active`, prompt `run`, prompt type `qa`,
document `research`, and knowledge `architecture_pattern`. Colour has become decoration that resembles semantics.

**Cross-axis inconsistency for one idea.** "Active" is `success` green for a Project, `sky` blue for Engineering Work,
and neutral grey for a Milestone.

**Contrast failure where it matters most.** Computed against the light background operators actually see:

| Token | Applied to | Light | Dark |
| --- | --- | --- | --- |
| `success` | Project `active`, stage `mvp` / `production` | **4.26 — fails AA** | 8.11 pass |
| `ember` | Project `paused`, stage `uat` | **3.10 — fails AA** | 10.59 pass |
| `warning` | Attention icon, Workspace root | **3.64 — fails AA** | 6.92 pass |
| `primary` | Links, interaction | 4.86 pass | 6.92 pass |
| `muted-foreground` | All metadata labels | 5.83 pass | 7.58 pass |

Three of five semantic accents fail AA for normal text in the theme that ships, and all pass in the theme that never
loads. These are applied to 0.65–0.75rem uppercase letterspaced mono text over a `/10` tint, which pushes real ratios
slightly worse than shown. `globals.css` itself carries the note "Verify AA contrast if these are tuned further."

### 8.3 Principles for a disciplined state language

The brief's own warning is the right instinct: not every semantic distinction earns a colour. With sixty-plus values,
colour cannot carry the load — it must carry only *operational consequence*.

1. **Colour encodes operational consequence, never taxonomy.** Type, workflow, category, and stage are taxonomy. They
   get typography, position, and neutral treatment.
2. **Four state roles, four treatments, no more.** *Actionable* (work can proceed) uses the interaction accent.
   *Attention* (needs human awareness) uses the single attention accent. *Settled* (terminal, resolved) uses neutral
   recessive treatment. *Inert* (not participating: proposed, archived, superseded) uses neutral low-emphasis. Every one
   of the sixty-plus values maps to exactly one role.
3. **One axis owns colour per surface region.** Where two axes must coexist, one becomes typographic.
4. **State is never colour-only.** Every state carries a text label, and role is reinforced by placement and grouping.
5. **Grouping outperforms badging at scale.** Sixteen work items each wearing three badges is a wall. Grouped by role
   with a section header, each item needs one label.
6. **One badge geometry, one token source.** No raw palette classes; all state colour resolves through semantic tokens.
7. **Contrast is a gate, not a preference.** Any state treatment must meet AA at its actual rendered size in the
   shipping theme.

---

## 9. Card usage audit

**There is no `Card` component.** `src/components/ui/` contains exactly one file — `button.tsx` — despite
`components.json` configuring shadcn with the `radix-nova` style. Card containers are inline strings repeated across the
codebase, in roughly twelve to fifteen distinct variants. The canonical
`rounded-lg border border-border bg-card p-6` appears more than thirty-five times. Forms use raw `<input>`, `<select>`,
and `<textarea>` with a repeated inline class string. `DESIGN_GOVERNANCE` states "Extract, don't copy — repeated markup
becomes a shared primitive." That has not happened.

| Usage | Classification | Assessment |
| --- | --- | --- |
| Defect current-action band | **Structurally useful** | Earns its container; the only elevated primary action region |
| Workspace continuation card | **Structurally useful** | Single decisive object; card is correct |
| Project EW section (primary variant) | **Structurally useful** as a region; contents should not be cards | Right emphasis, wrong interior |
| Project detail's eight equal panels | **Overused** | The card wall. Sections, not objects |
| Registry record panel | **Redundant** | Duplicates Overview; should merge or move to an inspector |
| Record details / Reference metadata | **Flattenable** | Should be recessed inset metadata, not a panel |
| Lifecycle history panel | **Should become another form** | Genuinely a timeline; the card fights it |
| Related knowledge / Repository artifacts | **Should become another form** | Inspector or disclosed region |
| EW list items | **Should become another form** | Structured rows in a real inventory |
| Milestones, Notes, Documents, Prompts panels | **Overused** | Rows or grouped lists |
| Docs / Prompts result cards | **Visually useful** | Acceptable for browsing a library |
| Empty states | **Visually useful** | Dashed treatment reads correctly |
| Form panels | **Structurally useful** | Bounded single-purpose surfaces work well |
| Nested item cards inside panels | **Overused** | Card-inside-card is the primary source of vertical bloat |

> Is Aredir relying on cards because they are the right container, or because cards are the default vocabulary of modern
> web dashboards?

**Predominantly the latter, and the repository already says so.** `AREDIR-UX-001` warns that "a card grid, sidebar, or
tab strip is an implementation choice" and that when components lead, "users experience structural accident."
`OPERATIONAL-EXPERIENCE-001` warns that "adding more capability sections, cards, or navigation categories would expose
more information without reducing this reconstruction work." Project detail is the predicted outcome.

The tell is diagnostic: on Project detail, the card boundary and the semantic boundary do not coincide. Overview and
Registry record are two cards describing one thing. Investigation on the defect branch is one card containing three
genuinely distinct things — and that is the surface that works, because there grouping was chosen deliberately.

### 9.1 Better-fitting patterns, with justification

Recommended only where the current container actively misrepresents the content:

- **Structured rows** for Engineering Work inventory — comparable records scanned across shared dimensions.
- **Tables** for registries — already proven on the registry surface.
- **Split view / master-detail** for registry and inventory surfaces — the primary unlock for desktop width.
- **Inspector panel** for evidence, references, related knowledge, and record metadata — subordinate, contextual,
  non-navigational.
- **Timeline** for lifecycle history — the data is already ordered events with actors and transitions.
- **Contextual rail** for Project posture, milestones, and target — persistent framing rather than a scrolled panel.
- **Inset recessed regions** for metadata — visually *below* the surface rather than another object on it.
- **Expandable regions** for anything currently permanently expanded, following the defect branch's `<details>` use.
- **Command surface** for navigation and authoring at scale — the single highest-leverage orientation addition, and the
  one that lets authoring stop being permanently resident.

---

## 10. Density evaluation

| Surface | Classification | Dominant cause |
| --- | --- | --- |
| Workspace root | **Too sparse** | No instrumentation; unused width; full region for an empty state |
| Project registry | **Too sparse** (unscalable) | No projected work data; no grouping |
| Project detail | **Cognitively overloaded** | Unbounded inventory; eight equal panels; resident forms; no measure |
| EW detail (defect) | **Appropriate / dense but manageable** | Grouping and disclosure working as intended |
| EW detail (non-defect) | **Cognitively overloaded** | Container repetition; no disclosure |
| Documents / Prompts | **Too sparse** | Two-column grid at low record counts |
| Knowledge Assets | **Dense but manageable** | Tables carry it |
| Evidence / forms | **Appropriate** | Bounded, single-purpose |
| Settings | **Too sparse** | Placeholder |

**The finding is inversion, not uniform failure.** Overview surfaces are starved of information while detail surfaces
are flooded with it. The target — maximum useful information with minimum cognitive disorder — is missed in opposite
directions at different altitudes.

This matters for remediation. Treating "density" as one problem produces the wrong fix everywhere. The overview surfaces
need *more* real information, delivered through instrumentation and projection. The detail surfaces need the same
information *restructured* through hierarchy, grouping, and disclosure — not removed, and not shrunk.

Contributing factors: vertical travel driven by container repetition rather than content; repeated labels, with
`Repository evidence` appearing twice on one surface; whitespace unearned by hierarchy; unnecessary chrome from
card-in-card nesting; unbounded line length on full-bleed surfaces; grouping present only on the defect branch;
progressive disclosure present only on the defect branch; and no persistent context anywhere.

---

## 11. Instrumentation

Currently **zero** instrumentation exists in the authenticated experience. `--chart-1` through `--chart-5` are defined in
both themes and used nowhere. `tabular-nums` appears exactly once in the codebase — inside
`workspace-operating-snapshot.tsx`, which **nothing imports**. An operating-snapshot component with counts was built and
orphaned; `project-detail-sections.tsx` is likewise dead. This is the `Legacy Surface Governance` concern named in the
UI Quality Audit Standard.

The discipline required is that instrumentation must render state that already exists and is authoritative. Because
`AREDIR-DISCOVERY-010` and `-012` classify derived projections explicitly, there is a clean test: if it is a defined
projection over authoritative data, it can be instrumented; if it requires inventing a metric, it cannot.

### 11.1 Where instrumentation would genuinely improve comprehension

- **Lifecycle position** on Engineering Work detail — a discrete position indicator across the seven states. Real,
  authoritative, and currently requiring the operator to read a badge and infer the rest.
- **Work state distribution per Project** on the registry — counts by role. Directly answers "which project needs me?",
  which the registry currently cannot.
- **Attention concentration** across the portfolio — where conditions cluster. Attention is already a defined
  projection.
- **Evidence completeness** per Engineering Work — `expected` / `verified` / `stale` / `missing` is a real four-value
  axis that maps naturally to a completeness indicator, and it directly supports the evidence-sufficiency gap
  `PROJECT-UX-002` identified.
- **Continuation eligibility** — how many items are eligible versus blocked, making the `ambiguous` mode legible as a
  state of the system rather than a surprise.
- **Relationship structure** — once work-to-work relationships exist. Not before.

### 11.2 Where instrumentation would be decorative noise

- **Any time-series of activity.** `WORKSPACE-OPERATIONAL-003` explicitly established that `updatedAt` must not be
  displayed as meaningful activity, and `AREDIR-DISCOVERY-010` lists it as an architectural risk. A commit-style
  activity graph would be exactly this violation, and is the single most tempting cliché available here.
- **Velocity, throughput, or cycle time.** No estimation or sizing data exists. `priority` is explicitly classified by
  `AREDIR-DISCOVERY-011` as non-operational advisory metadata with undefined semantics; building a chart on it would
  manufacture meaning the architecture has deliberately withheld.
- **Portfolio health scores or composite indices.** Aggregating posture into a single number destroys the authority
  distinctions the architecture spent four discovery packages establishing.
- **Sparklines on individual records.** No per-record history worth trending.
- **Progress percentages on Engineering Work.** Lifecycle state is categorical, not fractional. Rendering it as a
  percentage would be a false claim.
- **Any always-animated indicator.** Nothing here is real-time.

---

## 12. Colour system evaluation

### 12.1 The graphite direction is already canon, and is remediation rather than preference

`globals.css` describes itself as a "techno-mythic palette — Tech 'command-center' base with mythic accents (arcane
blue, emerald, ember)". `docs/brand/brand-guide.md` names the dark charcoal "void" as **"the showcase experience"**.
`UI-FOUNDATION-INVENTORY` records the workspace as inheriting this token system. A complete dark theme exists.

**Yet the authenticated experience is always light, and this is a defect rather than a decision.** `ThemeToggle` is
mounted only in `site-header.tsx`, which the public shell renders; `WorkspaceNav` has no toggle, and `src/app/layout.tsx`
contains no theme-applying script. So an operator who selects dark on the marketing site and navigates to `/workspace`
gets light. The intended showcase environment is unreachable from the product.

Combined with Section 8.2's contrast results — three of five semantic accents failing AA in light and all passing in
dark — the graphite direction is not a stylistic preference. **The palette was tuned for dark, and light is where it
breaks.** Adopting graphite fixes an accessibility defect and delivers brand coherence with the public site
simultaneously. It is the strongest-supported single recommendation in this evaluation.

### 12.2 Is graphite / blue / amber a coherent semantic system? Yes, with two corrections

The three-role structure is sound: a neutral environment, one interaction colour, one attention colour. It is coherent
precisely because it is small — which is what the sixty-value state vocabulary demands.

**Correction 1 — reject cyan.** The brief proposes "cyan/blue". The implemented and brand-documented primary is arcane
blue at hue 262, a blue-violet. Introducing cyan would fork the authenticated palette from the public site, discard the
one distinctive colour decision Aredir has already made, and drift toward the observability-vendor and AI-dashboard
convention that cyan-on-graphite now signals. Keep hue 262 as the single interaction and selection colour.

**Correction 2 — amber is already overloaded before any new use.** `ember` and raw `amber` currently carry seven
distinct meanings (Section 8.2). Promoting amber to "attention" while it also denotes paused projects, UAT stage,
proposed work, audit prompts, decision documents, and QA standards guarantees it will be everywhere and therefore mean
nothing. Amber can become the attention colour **only** if it is simultaneously withdrawn from all taxonomy use. That
withdrawal is the precondition, not a follow-up.

### 12.3 Overuse risk, addressed directly

The interaction accent's failure mode is subtler than amber's. Right now `primary` marks links, active nav, workflow
badges, the continuation card border, the EW section border, the action band, the featured work panel, related-knowledge
pills, and every CTA. On the defect branch a single viewport can contain the accent in five roles. When the accent marks
everything important, it stops marking anything.

Recommended discipline: the interaction accent is reserved for **interaction and current selection only** — actionable
next action, the focused object, links, and focus rings. Structural emphasis comes from surface elevation, border
weight, and typography, not from tinting another region blue. This also leaves the accent available to express focus
selection when `AREDIR-DISCOVERY-012` is implemented, which is a role it cannot fill if already spent on decoration.

### 12.4 Where the current palette should not be followed

`--arcane` (violet, hue 300) is documented as a "reserved accent" and annotated "future gaming dialect". It is unused in
the workspace and should stay unused. A fourth accent would undermine the three-role discipline, and the "gaming
dialect" association is precisely the register a product serving engineering leadership and consulting contexts should
avoid.

---

## 13. Typography

**Currently the most coherent part of the system.** Three deliberate families — Geist for headings, Inter for body,
JetBrains Mono for labels and metadata — with a consistent mono-uppercase-letterspaced treatment for operational
micro-labels. That treatment is genuinely good and is the main reason the product reads as technical at all. Retain it.

Weaknesses are hierarchy, not selection.

Insufficient level separation: section headings across Project detail are uniformly
`font-heading text-base font-semibold`, so eight sections of differing importance read identically. Page titles are
inconsistent — Workspace root uses `font-heading text-3xl ... sm:text-4xl` while the registry and Project detail use
`text-2xl` without `font-heading`.

No distinction between information classes. Narrative summary, operational truth, metadata, identifiers, state, and
evidence largely share `text-sm` in either foreground or muted-foreground. `AREDIR-UX-001`'s "no equal-weight clutter"
principle is violated typographically as well as structurally.

Numeric data is untreated: `tabular-nums` exists once, in dead code. Dates, counts, and commit hashes should align.

### 13.1 Recommendations

Establish distinct typographic roles rather than more sizes: **narrative** (Inter, bounded measure, relaxed leading, for
summaries and rationale); **operational truth** (largest non-heading weight, the only body-level text permitted to
compete with headings, for `currentNextAction` and conditions); **metadata** (mono uppercase letterspaced, already
correct); **identifiers** (mono, non-uppercase, `break-all`, tabular where numeric — IDs, commits, branches);
**state** (mono uppercase, tightly constrained); **evidence and history** (smaller, recessive, mono-labelled).

Widen the heading scale so section importance is legible, and constrain measure on every prose region.

On the brief's warning: monospace is already used heavily and correctly — for labels, not for content. That boundary is
the right one and should be held. Rendering narrative prose in mono would be terminal cosplay.

---

## 14. Geometry, surface treatment, and depth

**Observed.** `--radius: 0.5rem` with a derived scale. Uniform `rounded-lg` for sections, `rounded-md` for nested items,
one `rounded-xl` on the Workspace continuation card. `shadow-sm` appears five times; nothing heavier. A `.bg-grid`
blueprint utility and `--grid-line` token exist; `.bg-grid` is used **zero** times in the workspace and `--grid-line`
only for nav borders.

**Interpretation.** The geometry is generic SaaS default. Nothing about 8px radii on white cards with hairline borders
says "engineering instrument". More significantly, there is **no surface hierarchy**: `bg-card` is pure white on a
near-white background, so panels are distinguished from the page almost entirely by a low-contrast border. Everything
sits at one depth, which is why eight sections read as eight peers.

### 14.1 Recommendations

**Sharper geometry, restrained.** Reduce radii toward 2–4px for structural regions. Precision reads as engineering;
softness reads as consumer SaaS. Keep small radii on interactive controls for affordance.

**Establish real surface layers.** Three levels are sufficient: *environment* (deepest, the page), *surface* (panels and
regions), *inset* (recessed regions for metadata, evidence, and history). Inset is the important addition — it lets
subordinate information read as *below* the surface rather than as another object on it, which is exactly what history
and record metadata need.

**Derive depth from tonal separation and borders, not shadow.** On graphite, luminance steps between environment,
surface, and inset produce hierarchy cleanly. Shadow should be reserved for genuinely floating elements — overlays,
popovers, command surface. This is also why glassmorphism is the wrong answer: translucency reduces the tonal
distinctness that would be doing the hierarchical work, and degrades text contrast over dense content. Not appropriate
here beyond, at most, a command overlay.

**Grid alignment and structured separators.** Align regions to a consistent column grid and prefer internal separators
over nested containers — the defect Investigation panel already demonstrates this and should be the model.

**Use `.bg-grid` sparingly or not at all.** It is legitimate for empty states and headers where it reinforces blueprint
identity. Applied broadly behind dense operational content it becomes visual noise competing with data.

**Avoid decorative framing entirely.** No corner brackets, no HUD ornament, no glowing borders. Every treatment must be
traceable to a hierarchy or identity purpose.

---

## 15. Motion

**Observed.** Almost none, which is a reasonable baseline. `transition-colors` on interactive elements, a
`group-hover:translate-x-0.5` arrow nudge, `aria-hidden` twinkle animation on the public site only with a
`prefers-reduced-motion` guard already in place.

### 15.1 Where restrained motion would carry meaning

- **Disclosure expansion** — the `<details>` regions currently snap. A short height transition explains that content
  belongs to the region rather than appearing from elsewhere.
- **State transition confirmation** — when work moves `active → in_review`, a brief, once-only emphasis on the changed
  region confirms the mutation landed. This is the highest-value motion in the product because lifecycle transitions are
  consequential and currently silent.
- **Context change on navigation** — a subtle directional transition when descending Project → Work reinforces altitude.
- **Loading** — skeletons matching final layout instead of the current centred spinner, which discards layout
  information and causes a shift on arrival.
- **Focus and selection** — immediate, short transitions on selection in a master/detail view.

### 15.2 Where motion would be distracting or wrong

Ambient background animation. Anything continuously animated. Animated counters or chart draw-ins on load — these imply
live telemetry over data that is a query result. Staggered list entrance animations, which delay scanning on inventory
surfaces. Parallax or depth-on-scroll. Any animation on the attention region, which must not become a nag. Motion
exceeding roughly 200ms on frequently-repeated interactions.

All motion must respect `prefers-reduced-motion`, which `DESIGN_GOVERNANCE` already requires and the public site already
honours.

---

## 16. Navigation and orientation

| Operator question | Answerable today? | Evidence |
| --- | --- | --- |
| Where am I? | **Weakly** | Active nav item and page title only; no ancestry |
| What Project am I in? | **Only one level deep** | On Work detail, via the back link's `Back to project · {name}`. Absent on nested surfaces |
| What work am I inspecting? | **Yes** | Title is clear |
| What is happening now? | **Only on Workspace root** | Invisible from every other surface |
| What needs attention? | **Only on Workspace root** | No global indicator |
| Where can I continue? | **Only on Workspace root** | Requires returning to root |
| How do I return to the broader picture? | **By restarting** | No breadcrumb; must navigate to root and re-orient |

**Interpretation.** Navigation is organised as a **capability registry** — Workspace, Projects, Documents, Prompts,
Knowledge Assets, Settings — which mirrors storage rather than engineering activity.
`OPERATIONAL-EXPERIENCE-001` already recorded this: the shell nav is "capability/registry-oriented, not
engagement-oriented". Notably, Engineering Work — the primary operational artifact — has **no nav entry and no route of
its own**, reachable only by descending through a Project.

Context does not persist. Descending from registry to Project to Work discards the frame at each step, leaving a single
back link. This is why "context persistence" scores absent in Section 5, and it is the largest single contributor to the
reconstruction work `OPERATIONAL-EXPERIENCE-001` principle 10 asks the environment to eliminate.

Nav labels sit at `text-muted-foreground` in 0.75rem uppercase letterspaced mono — technically AA-passing at 5.83 but
visually recessive for the primary orientation control. Three labels denote one concept: `DOCUMENTS`,
`INTERNAL DOCUMENTATION`, `Docs`.

`UX-002` deliberately declined to add breadcrumbs, and that was reasonable for a single-surface change. At current
depth — Project → Work → Evidence, with lifecycle sub-routes — it no longer holds.

### 16.1 Recommendations

Add **persistent operational context** rather than merely breadcrumbs: a context region that retains the current Project
(and Work, when descended) with its posture, so operators never lose the frame. Restructure nav around activity —
operate, inspect, library — rather than storage. Give Engineering Work a first-class route. Add a **command surface** for
cross-surface navigation and authoring; at sixty-plus state values and growing record counts, it is the cheapest large
gain in orientation and the mechanism that lets resident forms disappear. Surface a global attention indicator so
conditions are visible from anywhere. Raise nav contrast and unify the three Documents labels.

---

## 17. Desktop and mobile

### 17.1 Desktop information architecture

**Desktop width is essentially unused.** Every surface is single-column. Two opposite failure modes coexist: Workspace
root and Documents centre a narrow column and leave large empty margins; Project detail and non-defect Work detail run
full-bleed with no measure, so prose spans the monitor. Neither uses width *structurally*.

Recommended, in order of value:

**Master/detail for registry and Engineering Work inventory.** Inventory on the left, selected record on the right.
This is the single highest-value desktop change: it removes navigation round-trips, keeps the collection visible while
inspecting a member, and directly serves comparison — which is what an operator scanning sixteen work items is actually
doing.

**Persistent contextual rail on Project surfaces** for posture, stage, target, and milestones. Project identity becomes
framing rather than a scrolled panel, which also resolves the authority-blur in Section 7.

**Inspector panel** for evidence, references, related knowledge, and record metadata — subordinate and contextual rather
than consuming primary vertical space.

**Bounded measure with a secondary region** on detail surfaces: narrative at readable measure, with the freed width
carrying state, lifecycle position, and evidence summary rather than nothing.

Mobile patterns should not be forced upward: the single-column stack is a mobile pattern currently applied at all
widths, and that is the substance of the problem.

### 17.2 Mobile philosophy

**Not observed at runtime.** Source-derived.

The right question is what an engineer needs from Aredir on a narrow surface — and it is not the whole product. Realistically:
orientation ("what needs me?"), attention, quick inspection of a specific record, and lightweight status capture. Away
from a desk, an engineer is checking and triaging, not authoring architecture records.

Mobile should therefore prioritise **attention and continuation first**, then quick inspection, then lightweight
authoring. Current source suggests the opposite: the same eight-panel Project detail, the same permanently-expanded
forms, and a `min-w-[960px]` table forcing horizontal scroll.

Capabilities that may reasonably stay richer on desktop: master/detail and side-by-side comparison; the full inventory
with multi-dimensional filtering; substantial authoring such as evidence linking and lifecycle forms with long prose;
full lifecycle history with provenance detail; and instrumentation beyond a single summary figure.

The existing mobile nav — a horizontal scroll strip of all six items with no hidden affordances — is honest and worth
retaining in spirit, though it needs priority ordering so the most operational destinations are reachable without
scrolling.

### 17.3 Future scalability

Assessed against the recommended architecture, using only vocabulary the discovery packages establish.

| Future capability | Room in the recommended system? | Where it lands |
| --- | --- | --- |
| Operational focus (`AREDIR-DISCOVERY-012`) | **Yes** | Reserving the interaction accent for interaction and current selection leaves it available for focus. The four-role state language distinguishes *focused and actionable* from *focused and conditioned* without new colours. The authority dimension separates persisted *focus selection* from derived *operational focus projection* |
| Plural focus with bounded display | **Yes** | Master/detail plus grouped inventory expresses an unordered set with a disclosed complete count, without implying ranking |
| Continuation modes `none` / `single` / `ambiguous` | **Yes, already proven** | Existing composition scales; the accent-for-selection rule makes ambiguity legible |
| Attention as orthogonal to focus | **Yes** | Attention owns one accent; focus owns selection. Independent channels, no collision |
| Work relationships and lineage | **Yes, with one addition** | Inspector handles related records; lineage needs a graph or tree affordance the current card vocabulary cannot express |
| Discussion and threading (**deferred**, not committed) | **Yes, conditionally** | The inspector region is the right home: threads become a disclosed inspector channel rather than more vertical document. This only holds if Project detail stops being an unbounded stack first — appending threads to today's architecture would produce an endless page |
| Decisions and provenance | **Yes, already modelled** | Distinct action and decision actors, roles, and authority types exist and are currently rendered as flat `dl` fields. The authority dimension and timeline give them expression |
| Structured discovery | **Yes** | Structured context exists for defects only; the generalised detail architecture accommodates other workflows |
| Evidence inspection | **Yes** | Inspector plus completeness instrumentation over the real `expected`/`verified`/`stale`/`missing` axis |
| Richer history | **Yes** | Timeline with recessive treatment and disclosure |
| Agent activity | **Yes** | `engineeringWorkActorTypeEnum` already distinguishes `human`, `ai_agent`, `system`, `integration`. This is actor *identity*, not state — so it belongs to typography and iconography, not the state palette. The four-role discipline holds |
| Recommendations | **Yes, with care** | `AREDIR-DISCOVERY-011` separates recommendation from authoritative selection. Recommendations must read as advisory — never in the selection accent |

**The load-bearing conclusion:** the recommended system has room for these *because* it constrains colour to four
operational roles and moves structural work onto hierarchy, space, and disclosure. Colour-per-distinction — the current
approach — has already exhausted eleven hues on today's concepts and cannot absorb focus, lineage, agent activity, and
recommendations. Discipline is what creates capacity.

---

## 18. Visual direction comparison

| Criterion | A — Refined Current | B — Technical EOS | C — Highly Futuristic |
| --- | --- | --- | --- |
| Brand differentiation | Low. Indistinguishable from internal admin tooling | **High.** Realises the documented techno-mythic identity | High but wrong register; reads as game or concept work |
| Engineering credibility | Moderate. Credible but unremarkable | **High.** Instrument-like reads as competence to engineers | **Low.** Undermines consulting and leadership contexts |
| Usability | Moderate. Leaves structural failures intact | **High**, if hierarchy leads and colour is disciplined | Low. Form competes with comprehension |
| Information density | Poor. Inversion persists | **Good.** Layering and disclosure enable density | Poor. Ornament consumes the space data needs |
| Scalability | Low. Colour-per-distinction is already exhausted | **High.** Four roles plus authority dimension absorb deferred concepts | Low. Bespoke treatments do not generalise |
| Accessibility | **Poor.** Retains the light theme where three of five accents fail AA | **Good.** Dark base measurably improves accent contrast | Poor. Glow and saturation fight contrast |
| Implementation risk | Low | **Moderate.** Primitive extraction plus theme activation, incremental | High. Bespoke, hard to maintain |
| Longevity | Moderate. Ages as generic | **High.** Instrument aesthetics age slowly | **Low.** Sci-fi styling dates fastest |
| Fit with EOS architecture | Poor. Cannot express authority or projection | **Strong.** Layers map onto authority classes | Poor. Spectacle obscures authority |

### 18.1 Recommended direction: B, governance-bounded

**Direction B, explicitly bounded by three constraints.**

Direction A is insufficient because the most severe findings — the unbounded inventory inside Project detail, the two
divergent Work detail architectures, the missing Engineering Work route, absent context persistence, colour-axis
collision, and light-theme contrast failures — are structural or systemic. Polish does not reach them, and A would
preserve a light theme in which three of five semantic accents fail AA.

Direction C is rejected. It contradicts the brief's own credibility requirement, `AREDIR-UX-001`'s environmental
identity for Aredir Labs ("Precision. Engineering. Craftsmanship."), and the consulting and leadership contexts the
product must serve. It would also fail the Trust and Credibility level of the UI Quality Audit Standard.

The bounding constraints on B matter as much as the choice:

1. **B is a visual-system and structural layer beneath existing experience canon, not a new experience model.**
   `AREDIR-UX-001` remains the experience architecture, and `PROJECT-UX-002` Phase 0 explicitly forbids introducing a
   competing operational experience language. This evaluation introduces no new experience vocabulary — it identifies a
   missing *visual system* layer and structural remediation.
2. **Structure precedes styling.** Because the severest findings are Information and Interaction Architecture, applying
   graphite first would produce a darker version of the same problems — and would risk being read as validating the
   aesthetic while the real defects persist.
3. **"Technical" derives from precision, density, and hierarchy — never from ornament.** Every treatment must trace to
   a hierarchy or identity purpose.

---

## 19. Reference-class analysis

Principles to learn, not treatments to copy.

| Reference class | Principle Aredir can learn | What NOT to copy |
| --- | --- | --- |
| Observability platforms | Dense information stays comprehensible when one dimension is primary and the rest are filters. Query and result are distinct regions | Chart-first layouts; time-series where no meaningful series exists |
| Developer tooling and IDEs | Persistent context is the core value: the tree, the open item, and the inspector coexist so orientation is never lost. Command surfaces beat deep menus | Editor chrome; tab overload; syntax-highlight palettes as UI colour |
| Infrastructure consoles | Resource state benefits from one canonical state vocabulary reused everywhere, and from making derived state visibly derived | Deeply nested tab hierarchies; per-service bespoke layouts |
| Aerospace instrumentation | Criticality determines position and size, not decoration. Nominal state is quiet; deviation is loud. Fixed positions build muscle memory | Skeuomorphic gauges; dials for categorical data; alarm styling for routine states |
| Scientific interfaces | Measurement is inseparable from provenance and uncertainty. Unknown is shown as unknown, never as zero | Dense numeric tables without hierarchy |
| Mission control | Roles have distinct stations; the shared picture stays continuously available. Escalation paths are explicit | Wall-of-screens density; theatrical framing |
| Advanced data platforms | Lineage as a first-class navigable relationship, not a metadata field | Graph visualisations where a list suffices |
| Carefully selected science fiction | Restraint reads as advanced: confident typography, precise alignment, generous negative space *around dense regions*, meaningful use of a single accent | Everything else — glow, holograms, animated ornament, unmotivated geometry |

The two most valuable are **developer tooling** (persistent context and command surface — directly addressing the absent
context persistence) and **aerospace instrumentation** (criticality drives position and size, nominal is quiet — directly
addressing equal-weight panels and the amber overload).

### 19.1 Applied case — should the shell become an IDE-inspired workspace model?

Recorded because the developer-tooling reference class is the most valuable one identified above, and therefore the most
likely to be over-applied. This subsection exists to make the "learn the principle, do not copy the treatment"
distinction concrete for the highest-risk case.

**Position: adopt IDE properties; reject the IDE shell topology.** The question conflates two separable things with
opposite risk profiles — a set of *context-preservation properties*, and a *shell topology* of tabs, dockable panels, a
file tree, and an editor pane.

**Properties worth adopting.** Four of the six characteristics scored absent or near-absent in Section 5 are precisely
what integrated development environments solve.

| Property | Finding it addresses |
| --- | --- |
| Persistent context — never lose your place | Context persistence **absent** (Section 5); descent discards the frame at each step (Section 16) |
| Durable inventory alongside the selected record | Unbounded inventory inside Project detail (**Critical**, Section 3.3); unused desktop width (Section 17.1) |
| Subordinate inspector region | Evidence, references, related knowledge, and record metadata competing as full-weight panels (Sections 6, 9) |
| Command surface | No orientation chrome (Section 16); permanently-resident authoring forms (Section 3.3) |

**Topology to reject, and why.**

*Tabs and restored sessions — a governance collision, not a matter of taste.* A tab bar is a persisted per-operator
working set. `AREDIR-DISCOVERY-012` establishes operational focus as **shared Project authority** — an unordered set
with no ranking — and explicitly defers *personal working context* ("what am I working on?") as a separate concept. A
tab model would implement that deferred concept through the interface before the architecture has decided it exists, and
would introduce ordering that both `-011` and `-012` specify does not exist. It also contradicts the product's strongest
instinct: `WORKSPACE-OPERATIONAL-003` refuses to choose among candidates when state does not justify choosing, and an
interface that normalises many simultaneously-open work items argues the opposite.

*A file tree implies containment the domain does not have.* `AREDIR-DISCOVERY-009` records work decomposition —
parent/child and dependencies — as unimplemented. A tree would assert a hierarchy that does not exist, and would remain
the wrong shape once relationships arrive, because those form a graph rather than a containment hierarchy.

*User-arrangeable panels dissolve altitude.* Configurability exists in development environments because practitioner
workflows diverge widely. Aredir has a defined responsibility model, and Principle 6 requires each surface to declare its
altitude before content is read. Operator-rearranged regions would defeat both that and the aerospace lesson that fixed
positions build muscle memory.

*Editor chrome and terminal styling* fall directly into the terminal-cosplay anti-pattern (Section 20). The
labels-not-prose boundary for monospace (Section 13) must hold regardless of shell model.

**Why the topology misfits — the underlying reason.** Integrated development environments are **document-centric**:
open, edit, save, close, many at once. Aredir is **state-centric**: understand posture, decide, act, record what
happened. Copying the shell imports the document-centric assumption, and that assumption is the source of every rejected
element above.

The closer reference class is therefore an **investigation console** — the flow found in mature observability and
infrastructure platforms, where an operator holds one live context, pivots across related records, and keeps evidence
adjacent to the claim it supports. That yields master/detail, inspector, command surface, and persistent context while
keeping operational context deliberate rather than normalising an arbitrary multi-document working set.

**Constraint.** An IDE-derived model has no narrow-surface answer. Whatever is built for desktop must not become the only
model, given the mobile priorities established in Section 17.2.

**Net direction.** Evolving away from page-centric navigation is endorsed and is already sequenced as steps 3 through 5.
The destination is a state-centric operating environment with IDE-grade context preservation — not an IDE. Take the
persistence, the master/detail, the inspector, and the command surface. Leave the tabs, the tree, the dockable panels,
and the editor chrome.

---

## 20. Anti-patterns to avoid

Assessed against present risk, not generically.

| Anti-pattern | Current risk | Note |
| --- | --- | --- |
| Generic SaaS dashboard | **Moderate** | Already partly the case at overview altitude. Avoided by refusing KPI-card grids |
| Card wall | **Realised** | Project detail and non-defect Work detail already are this |
| Cyberpunk | Low | Would contradict brand and credibility |
| Game HUD | Low–moderate | `--arcane` is annotated "future gaming dialect"; keep it out of the workspace |
| Excessive neon | Low | Guard when moving to graphite, where saturated accents read brighter |
| Terminal cosplay | **Moderate** | Mono is already heavy. It must stay on labels; narrative prose must never become mono |
| Fake telemetry | **High** | The most tempting error. `updatedAt` as activity is already documented as prohibited |
| Meaningless graphs | **High** | Five chart tokens defined and unused invite decorative charts. Instrument only defined projections |
| AI-gradient branding | Low–moderate | Would arrive with cyan-on-graphite; a reason to hold hue 262 |
| Glassmorphism overload | Low–moderate | Reduces the tonal separation that should be doing hierarchical work |
| Excessive pills and badges | **Realised** | Sixteen items × three badges. Grouping replaces badging at scale |
| State encoded only by colour | **Realised** | Compounded by three of five accents failing AA in the shipping theme |
| Dense interfaces without hierarchy | **Realised** | Project detail exactly |
| Minimalism hiding operational information | **Realised, inversely** | Overview surfaces omit real information that exists. Restraint in *content selection* was correct; restraint in *instrumentation* was not |

Two additions specific to Aredir:

**Authority flattening** — rendering authoritative state, derived projection, and historical evidence at the same visual
weight. Already the dominant failure, and the one that most directly contradicts `AREDIR-DISCOVERY-010`'s Invariant 4.

**Inventory-in-detail** — embedding an unbounded collection inside a detail surface. Already realised, and the reason
Project detail exceeds the viewport at extreme zoom-out.

---

## 21. Design principles for the future authenticated visual system

Durable and architectural. Each is stated because evidence in this evaluation demanded it.

1. **Operational truth receives stronger hierarchy than derived projection, which receives stronger hierarchy than
   historical evidence.** Authority class, not content type, determines visual weight. *(Currently flattened; contradicts
   Invariant 4.)*
2. **Colour encodes operational consequence; typography and position encode taxonomy.** Type, workflow, category, and
   stage never compete for hue. *(Currently eleven hues across colliding axes.)*
3. **Four operational state roles — actionable, attention, settled, inert.** Every one of the sixty-plus enumerated
   values maps to exactly one. New values inherit a role rather than a colour.
4. **Dense information is organised through hierarchy, grouping, and progressive disclosure — never removed, never
   merely shrunk.** *(The defect branch proves it; the non-defect branch proves the alternative.)*
5. **A collection embedded in a detail surface is a bounded projection with a route to its full form.**
6. **Every surface declares its altitude through environment before content is read.** Workspace, Project, and Work must
   not be visually interchangeable.
7. **Context persists through descent.** Moving deeper adds context; it never replaces it.
8. **Prose is bounded to a readable measure; tabular and comparative data may use full width.** Width is allocated by
   content type, not inherited from a container.
9. **Depth comes from tonal layering — environment, surface, inset — not from shadow or translucency.** Subordinate
   information sits *below* the surface rather than on it.
10. **The interaction accent marks interaction and current selection only.** Structural emphasis comes from elevation,
    border weight, and type. This reserves the accent for focus selection when it arrives.
11. **Instrumentation renders only defined projections over authoritative state.** If a metric must be invented, it must
    not be drawn. `updatedAt` is never activity.
12. **Unknown, absent, null, and failed render as themselves.** Null focus is a truthful operational state, not an empty
    slot to fill with derived context. Failure is likewise a state the environment reports rather than a gap it leaves:
    it distinguishes transient from structural, names one next action, and disables controls that cannot succeed.
    *(Prompts currently offers four operable filters over an unavailable table and two causes with no next action.)*
13. **Authoring is invoked, not resident.** Reading and authoring are different intents; a surface serving both
    continuously serves neither well.
14. **State is never conveyed by colour alone, and every state treatment meets AA at its rendered size in the shipping
    theme.**
15. **One detail architecture per domain concept.** Workflow variation is expressed through content and grouping, never
    through a divergent page architecture.
16. **Repeated markup becomes a primitive before it becomes a pattern.** *(Extends `DESIGN_GOVERNANCE`; more than
    thirty-five copies of one card string is the counterexample.)*

---

## 22. Conceptual visual language model

Conceptual, not implementation tokens. Existing token names appear only where the repository already establishes them.

**Environment.** A graphite operating field — the deepest layer, quiet, unornamented, carrying no content directly.
Distinct per altitude: the operating surface, the project context, and the work surface should feel like different rooms
in one facility. Blueprint grid texture available for empty and header regions only.

**Hierarchy.** Three altitudes, each with a distinguishing environmental signature and measure discipline: Workspace
(portfolio breadth, instrumented, full width), Project (context framing plus bounded operational content), Engineering
Work (bounded narrative plus subordinate evidence).

**Surfaces.** Three levels only. *Environment* — the field. *Surface* — regions carrying primary content, separated from
environment by tonal step and hairline border rather than shadow. *Inset* — recessed regions for metadata, evidence, and
history, reading as beneath the surface. Sharper geometry throughout; radius signals interactivity, not decoration.

**Interaction.** Arcane blue (hue 262), reserved. Links, controls, focus rings, and current selection. Never structural
tinting. Focus rings always visible and never removed.

**Selection.** The strongest single application of the interaction accent, expressed through a structural cue — an edge
rule or surface elevation — rather than a fill, so selection survives on dense rows and remains distinguishable from
"important". This channel is deliberately reserved for future operational focus.

**State.** Four roles, each with one treatment: *actionable* (accent-adjacent, strongest state weight), *attention*
(the single amber-family accent, withdrawn from all taxonomy use), *settled* (neutral, recessive, terminal), *inert*
(lowest emphasis: proposed, archived, superseded). One badge geometry; one token source; always accompanied by text.

**Attention.** Owns exactly one accent and one placement convention. Present as a global indicator and as a region.
Never animated, never a nag, never colour-only. Conditions read as attention regardless of which surface surfaces them.

**Evidence.** Inset, subordinate, disclosed by default, and always adjacent to the claim it supports. Carries authority
labelling — `repository_authoritative`, `external_read_only`, `workspace_derived` — as a first-class visual attribute,
because provenance is the point. Completeness expressed through the real four-value reference-status axis.

**History.** Timeline, recessive, collapsed by default, never competing with current state. Renders transitions as
transitions (prior → resulting) and preserves the existing distinction between action actor and decision actor as a
visible structural difference rather than two adjacent grey fields.

**Relationships.** Traversable rather than enumerated. Inspector-resident for direct relations; reserved room for a
lineage affordance that the card vocabulary cannot express. Related knowledge remains visibly read-only with its
authority location shown.

**Instrumentation.** Precise, small, typographic-first, tabular-aligned. Counts and distributions before charts.
Categorical position indicators rather than progress fractions. Always labelled as projection. Quiet at nominal, legible
at deviation. Never animated on load.

---

## 23. Recommendation

### EVOLVE CURRENT DIRECTION

Material evolution toward an operating-system identity — not refinement, and not a new visual system.

**Why not RETAIN.** The severest findings are structural and systemic: an unbounded inventory inside a detail surface,
two divergent detail architectures for one domain concept, no Engineering Work route, absent context persistence, two
Project axes sharing one palette, and three of five semantic accents failing AA in the only theme that ships. Refinement
cannot reach these.

**Why not ESTABLISH NEW.** Three reasons, in order of weight.

*The target identity already exists in the token layer.* `globals.css` declares a techno-mythic command-center palette
with arcane blue, emerald, and ember; a complete dark theme; a blueprint grid utility; five chart tokens; and three
deliberate typefaces. The brand guide names dark as "the showcase experience". This is not a system needing replacement
— it is a system needing **activation and discipline**. The authenticated experience is light only because no toggle or
theme script was ever mounted in the workspace shell.

*The target pattern already exists in the product, validated.* `DEFECT-UX-001` remediated exactly these problems on one
route — measure bounds, a distinguished action band, named grouping, progressive disclosure, timeline history, explicit
historical-posture handling — and is the only authenticated surface with documented runtime visual validation at four
viewports. Its recorded before-state describes today's non-defect Work detail almost item for item. The work is
generalisation, not invention.

*Governance forbids it.* `AREDIR-UX-001` is a promoted company standard and remains sufficient as experience
architecture; `PROJECT-UX-002` Phase 0 explicitly forbids introducing a competing operational experience language;
`PROJECT-UX-002` Refinement Candidates classified observed hierarchy and density issues as *implementation gaps against
existing principles*, not missing principles. This evaluation agrees. What is genuinely missing is one layer lower than
experience architecture and one layer above CSS: a **visual system** — primitives, surface hierarchy, state language,
authority expression. That layer never existed. `src/components/ui/` contains a single component.

**So the accurate characterisation is:** the experience architecture is sound and canonical; the product semantics are
unusually mature; the token layer already encodes the intended identity; and the failures are the absence of a visual
system plus unremediated structural debt. That is evolution — but substantial evolution, not polish.

---

## 24. Implementation sequencing

Ordered so that structure precedes styling, and adjusted from the brief's suggested order based on findings. **Not
implemented here.**

**0. Visual system foundation.** Extract the primitives that do not exist — surface, inset, badge, row, field, table,
disclosure, timeline — from the thirty-five-plus duplicated card strings. Define the state role model, the authority
dimension, and the three surface levels. *Placed first because every later step otherwise multiplies the duplication.*

**1. Theme activation and contrast remediation.** Mount theme control and persistence in the authenticated shell; make
graphite the operating default. Re-verify every state treatment at rendered size. *Early because it resolves an
accessibility defect and is largely independent of structural work.*

**2. State language consolidation.** Collapse eleven hues into four roles; withdraw amber from taxonomy before promoting
it to attention; resolve the Status/Stage collision; unify badge geometry and token source. *Before inventory work,
because inventory grouping depends on roles existing.*

**3. Shell, navigation, and context persistence.** Activity-oriented navigation; persistent Project and Work context;
global attention indicator; command surface; nav contrast; unify the Documents labels.

**4. Engineering Work inventory as a first-class surface.** New route with grouping, filtering, and master/detail.
*Prioritised above Project detail because it is the precondition for fixing it.*

**5. Project detail restructure.** Bound the measure; replace the embedded unbounded inventory with a bounded projection
linking to step 4; collapse eight equal panels into a context rail plus operational content plus inspector; merge
Registry record into Overview; move authoring to invoked.

**6. Engineering Work detail unification.** Generalise the validated defect architecture to all workflows; retire the
divergent branch; apply authority hierarchy so history and metadata become recessive.

**7. Workspace root instrumentation.** Add projection-based instrumentation — work distribution, attention
concentration, evidence completeness — using only defined projections. Use desktop width. *Deliberately late: it is the
most tempting place to start and the easiest place to manufacture fake telemetry, and it is safest once the state model
and authority language are settled.*

**8. Project registry elevation.** Project Engineering Work state and attention into the registry; add grouping,
filtering, and master/detail.

**9. Supporting surfaces.** Documents, Prompts, Knowledge Assets, Evidence, and lifecycle forms aligned to the visual
system. Resolve Settings — build it or remove it from navigation. Remove the two dead components.

**10. Responsive and narrow-surface refinement.** Re-prioritise narrow surfaces around attention, continuation, and
quick inspection rather than proportional reduction of desktop. Runtime-validate at four viewports, matching the
`DEFECT-UX-001` precedent.

---

## 25. Experience statement

> **What should using Aredir feel like?**

Using Aredir should feel like taking a seat at a working instrument that has been holding your engineering state while
you were gone.

Arriving should feel like resuming rather than searching. The environment should be quiet and dark enough that the
information is the only bright thing in the room, and dense enough that you never suspect it is hiding something from
you. You should be able to tell, before reading a word, whether you are standing in the operating surface, inside a
project, or at a single piece of work.

What is true right now should be unmistakable from what was true before, and from what the system has merely calculated.
Nothing should imply certainty the engineering does not have — when Aredir does not know which work matters most, it
should say so plainly and let you decide, rather than choosing on your behalf and dressing the choice as insight.

Attention should find you rather than requiring a search. Evidence should sit within reach of the claim it supports, so
verifying something never means leaving what you were doing. Moving deeper should add context rather than replace it, so
you never pay to come back.

It should feel precise, instrumented, and unhurried — closer to a well-designed control station than a dashboard, and
closer to an engineering instrument than a document. The interface should read as capable because it is dense with
meaning and disciplined about hierarchy, never because it is decorated to look advanced. Nothing should glow that is not
telling you something. Nothing should move that is not changing.

And it should be legible at hour six as it was at minute one.
