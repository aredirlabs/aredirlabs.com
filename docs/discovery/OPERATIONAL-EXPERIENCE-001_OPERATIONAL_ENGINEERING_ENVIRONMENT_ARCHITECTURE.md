# OPERATIONAL-EXPERIENCE-001 — Operational Engineering Environment Architecture

| Field | Value |
| --- | --- |
| **Status** | Complete — architecture and discovery |
| **Date** | 2026-08-06 |
| **Package type** | Runtime experience architecture; no UI or persistence implementation |
| **Subject** | Authenticated operational experience for Aredir as an Operational Engineering Environment |
| **Canonical experience authority** | [AREDIR-UX-001 Workspace Experience Architecture](../company/architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md) |
| **Foundational product authority** | [AREDIR-VISION-001 Engineering Operating Environment Philosophy](../company/AREDIR-VISION-001_PRODUCT_OPERATING_ENVIRONMENT_PHILOSOPHY.md) |
| **Implementation changes** | None |

## Authority and evidence boundary

This record defines an application architecture from repository and validated runtime evidence. It does not promote a new company standard, replace AREDIR-UX-001, alter the Engineering Operating System (EOS), or authorize UI, schema, migration, recommendation, synchronization, or editor implementation.

Evidence classifications used below:

| Class | Meaning |
| --- | --- |
| **Canonical** | Established by a promoted or foundational Aredir authority. |
| **Validated** | Implemented and supported by the repository's recorded runtime validation. |
| **Observed** | Directly present in the current implementation or data contract. |
| **Proposed** | Architectural conclusion of this discovery, awaiting implementation evidence. |
| **Deferred** | Deliberately excluded until later evidence or authority exists. |

The most relevant evidence is:

- AREDIR-UX-001's Mission, Environment, Primary Action, Supporting Context, Navigation, and Identity model;
- the company requirement to make purpose, current position, and the next correct action clear;
- the implemented Workspace continuation hierarchy, Project operational hierarchy, Engineering Work lifecycle and workflow contracts, and authenticated Defect hierarchy validation;
- the Engineering Mission contract, which makes Mission an optional, bounded orientation artifact rather than a project, package, or universal work container;
- the EOS and AEF capability contracts, which keep methodology, capability ownership, work packages, evidence, and knowledge authority distinct; and
- the authority-preserving projection model established by prior Engineering Operations discovery.

## 1. Executive summary

Aredir should organize the authenticated experience around **engineering engagement**, not around the tables or capabilities that store its parts.

The recommended runtime architecture is:

```text
Workspace — “What should I accomplish now?”
    ↓ chosen engagement / meaningful continuation
Project — “What is happening in this engineering effort?”
    ↓ purposeful activity in project context
Operational Workspace — “Perform this meaningful engineering activity.”
    ↕
Artifacts, evidence, decisions, history, and outcomes

Collections — locate and compare relevant artifacts when direct continuation is not enough
```

This is not a mandatory route tree. It is a responsibility model.

The principal conclusions are:

1. **Workspace is an operating entry point, not a dashboard.** It should identify one most meaningful continuation when justified, work requiring attention, recent context, and project transitions. Metrics and inventories do not belong in its primary composition.
2. **Project is an operational orientation surface, not a page-length concatenation of capabilities.** It should explain current focus, active outcomes, unresolved conditions, validation posture, important decisions, what changed, and likely next actions. Artifact inventories remain available through collections.
3. **Collections are retrieval surfaces.** They locate, filter, compare, and navigate artifacts at scale. They do not become the place where investigation, design, implementation, validation, or learning is performed.
4. **An Operational Workspace is a purposeful working environment.** It combines artifact identity, present context, a primary activity surface, evidence, decisions, relationships, history, validation, editing, and next actions in a composition governed by AREDIR-UX-001.
5. **Detail and Edit remain useful but narrower.** Detail supports understanding and reference. Edit supports bounded structured metadata changes. Neither should be forced to carry the entire engineering activity.
6. **Activities are runtime and conceptual context, not a new lifecycle or persisted entity.** The candidate vocabulary is useful as an extensible set of verbs. It may be explicit in an interaction or inferred from work context, but it must not compete with Engineering Work lifecycle, workflow, Mission, or Work Package authority.
7. **Continuation is a contextual projection, not a recommendation algorithm or lifecycle state.** It connects an engineer, a current engagement, an actionable next step, relevant evidence, and a plausible destination. The current `currentNextAction` field is a sound seed, while `updatedAt` alone is not sufficient long term.
8. **Defect investigation should be the first reference Operational Workspace.** It is the richest validated case: it already separates operational continuation from next investigation, preserves evidence and validation targets, has workflow-specific editing, and has authenticated responsive validation. Engineering Work remains the canonical parent and collection identity.

No new tables or persisted concepts are required to accept this architecture.

## 2. Current-state runtime assessment

### Authenticated shell and navigation

The current authenticated shell provides persistent navigation for Workspace, Projects, Documents, Prompts, Knowledge Assets, and Settings. This is capability- and registry-oriented. It provides stable access, responsive behavior, and identity, but its taxonomy does not yet express an engineer's active engagement. There is no project-local operational navigation; movement is primarily shell → Project → record and back.

The shell should remain a dependable escape and retrieval layer. Its current labels do not need immediate replacement. As engagement-oriented paths mature, primary progression should be carried by Workspace, Project, and Operational Workspace compositions rather than by adding every activity or artifact class to the shell.

### Surface assessment

| Surface | Current evidence | Architectural strength | Current limit |
| --- | --- | --- | --- |
| Workspace | `Continue`, `What needs care`, active projects, recent projects; continuation chosen from active/in-review/proposed Engineering Work | Already leads with continuation rather than counts | Selection is global, uses lifecycle rank plus `updatedAt`, has no person or engagement context, and attention only considers blocked milestones |
| Project | State-ranked Engineering Work first, then current focus, overview, registry record, milestones, documents, prompts, and notes | Current work and next action precede supporting records | All Engineering Work is rendered inline; capability sections accumulate vertically; “what changed,” validation posture, decisions, and outcomes are not synthesized |
| Engineering Work collection | Implemented as the Project's Engineering Work section, ordered by lifecycle rank | Highlights one most important item and retains direct Project ↔ Work paths | No dedicated collection route, pagination, search, filter, grouping, or bounded preview; every remaining record becomes “Other engineering work” |
| Engineering Work detail | Objective, current position, next action, knowledge, repository references, outcome, condition, metadata | Strong operational brief for Delivery | Primarily read-only; work itself occurs through a separate general edit form; generic composition cannot represent every workflow conversation |
| Engineering Work intake | Shared identity fields plus workflow-aware conversation definitions; Delivery and Defect implemented | Preserves one parent model while using familiar workflow language | Unsupported workflows are correctly incomplete; creation still resembles a long form rather than an activity workspace |
| Defect intake | Concise parent synopsis and next action plus observed/expected behavior, reproduction, environment, evidence, next investigation, and validation target | Captures an engineering investigation conversation without flattening it | One-pass form; no evolving investigation history, comments, or evidence objects |
| Defect detail | Validated identity → synopsis → action → investigation → assessment → supporting knowledge/evidence → metadata hierarchy | Closest current surface to an Operational Workspace; responsive and authenticated validation exists | Still a read-only detail with a separate full-record edit; no event timeline or direct evidence capture |
| Defect edit | Atomically updates the canonical parent and Defect Context; workflow is locked | Preserves context and project/workflow integrity | Treats investigation as replacement of current field values, not an evolving engineering history |
| Project/Documents/Prompts/Knowledge registries | Tables or filtered lists with source-authority notices where applicable | Demonstrate legitimate collection behavior and authority-preserving projection | Their presence in global navigation reinforces capability-oriented entry more than engagement-oriented progression |

### Current-state conclusion

The runtime has already moved beyond a purely record-oriented experience. Workspace continuation, Project work prioritization, workflow-aware intake, and Defect hierarchy are credible engagement-oriented slices. The remaining problem is architectural composition: these slices sit inside a shell and Project page still largely organized by capabilities and stored collections.

The new architecture should therefore **extend the validated slices** rather than replace their persistence or invent a parallel operating model.

## 3. Architectural problem statement

The application knows enough to display records but not yet enough to consistently compose an engineering engagement.

At Project scale, the engineer must still reconstruct:

- which outcome currently matters;
- what changed since the last visit;
- whether active work is progressing, blocked, awaiting a decision, or awaiting validation;
- which artifact contains the next meaningful activity;
- how evidence relates to a claim or outcome; and
- what should happen after the present action.

Adding more capability sections, cards, or navigation categories would expose more information without reducing this reconstruction work. The architectural requirement is a contextual projection that selects and relates existing state while preserving the authority of its source artifacts.

## 4. Operational Engineering Environment definition

An **Operational Engineering Environment** is the authenticated runtime in which an engineer can orient to purpose, understand current engineering state, perform a meaningful activity, consult and create evidence, make or review decisions, preserve outcomes, and continue toward validation without manually reconstructing the relationships among tools and artifacts.

It is not itself:

- the EOS methodology;
- a project-management system;
- a universal artifact store;
- a generic dashboard;
- a workflow engine;
- a replacement for source repositories; or
- a single all-purpose page.

The initial model is refined as follows:

```text
Engineering Operating System
        governs method, lifecycle, authority, and quality
                        ↓
Operational Engineering Environment
        composes human attention and engineering engagement
                        ↓
Engineering Activities
        describe what the engineer is doing now
                        ↓ enabled by
Engineering Capabilities
        supply specialized rules, tools, and services
                        ↓ operate on / produce
Engineering Artifacts, Evidence, Decisions, and Outcomes
        preserve durable state and authority
```

The arrows are relationships, not containment or database inheritance. Activities can use several capabilities and affect several artifacts. A capability can support several activities. An artifact can participate in several activities over time.

## 5. Activity / Capability / Artifact model

| Concept | Definition | Runtime role | Persistence posture | Current examples |
| --- | --- | --- | --- | --- |
| Engineering activity | A purposeful verb describing what an engineer is doing | Selects interaction emphasis and supporting context | Do not create an entity; infer or express as temporary context when useful | Investigate a Defect, review evidence, validate work |
| Engineering capability | A supporting system of responsibility, rules, tools, and services | Enables activities and supplies specialized projections/workspaces | Existing capability authorities remain independent | Project, Delivery, Quality, Knowledge, Documentation, Design |
| Engineering artifact | Durable state, specification, record, evidence, decision, or outcome | Supplies identity, authority, history, and handoffs | Persist only according to each artifact's contract | Engineering Work, Defect Context, Engineering Mission, Work Package, ADR, validation record |
| Engagement | The bounded runtime relationship among engineer, purpose, project context, activity, and working artifacts | Provides continuity across surfaces | Contextual projection first; no engagement entity is authorized | Resume defect investigation in a project |
| Outcome | The assessed result of engineering activity | Explains what changed and what follows | Remains on its authoritative artifact or evidence record | Engineering Work outcome, Mission success assessment, validation result |

Important boundaries:

- Engineering Work is already the project-scoped operational record for an intended outcome. It must not be renamed as an Activity, Mission, or Work Package.
- Engineering Mission is optional and useful when a bounded outcome must orient or coordinate multiple governed artifacts. It is not required for every Engineering Work record or activity.
- A Work Package remains the authoritative implementation specification. An Operational Workspace may expose or edit a reference, but it must not silently replace the package body.
- A workflow describes the stable operational interpretation of Engineering Work. An activity describes what is happening now. They may correlate, but they are not the same concept.
- A lifecycle state describes canonical progress. An activity is not a state transition and does not create another lifecycle.

## 6. Workspace responsibility

**Workspace answers: “What should I accomplish now?”**

Its responsibility is to establish the engineer's most useful entry into active engineering reality across projects. It should minimize choice without pretending certainty.

### What belongs

In priority order, subject to available evidence:

1. **Meaningful continuation** — at most one dominant continuation when the environment can justify it, including project, purpose, current position, next action, and destination.
2. **Attention requiring a change of course** — failed validation, blocked dependency, review request, unresolved decision, stale or contradicted evidence, or a project transition. Attention is not automatically the primary continuation.
3. **Recently active context** — small, bounded return paths that help an engineer recover after interruption.
4. **Active engineering engagements** — a short view of other active Missions, Engineering Work, or validation obligations, not a full backlog.
5. **Quiet signals** — only signals that materially change judgment or next action, with source and freshness available.

### What does not belong in the primary composition

- company-wide metric-card grids;
- complete project, work, defect, document, prompt, or knowledge inventories;
- arbitrary “recent activity” feeds;
- lifecycle counts without an operational question;
- every notification or data freshness indicator;
- capability administration;
- detailed editing; or
- a claim that the system knows the correct action when evidence is insufficient.

When there is no justified continuation, Workspace should say so and offer a small number of honest orientation paths, such as active Projects or explicitly assigned/pinned work. Absence is preferable to a fabricated recommendation.

## 7. Project responsibility

**Project answers: “What is happening in this engineering effort?”**

A Project surface should synthesize operational state within the authority boundary of one existing Project. It is the place to regain context, see current focus and transitions, and choose the next activity. It should not require reading every stored record.

### Project operational composition

The Project should make these questions answerable in order:

1. What outcome or Engineering Mission currently orients this effort?
2. What changed recently that affects understanding or direction?
3. What work is active, in review, blocked by a condition, or awaiting validation?
4. What important problem, risk, or decision is unresolved?
5. What outcome was recently reached and with what validation posture?
6. What are the likely next actions and their destinations?
7. Which capability collections are relevant if deeper retrieval is needed?

### Overview, operational state, and inventory

| Concern | Responsibility | Typical content |
| --- | --- | --- |
| Project overview | Stable identity and long-lived orientation | Name, description, category, repository/public references, durable purpose |
| Project operational state | Current synthesized engineering reality | Current focus, active Mission/Work, conditions, recent outcomes, unresolved decisions, validation posture, transitions, next actions |
| Project artifact inventory | Retrieval and governance of stored material | Engineering Work, Defects, milestones, documents, prompts, notes, releases, validation records |

These concerns may share a route, but they must not have equal prominence. Operational state leads; overview supplies orientation; inventories are summarized and link to bounded collections.

The existing Project's state-ranked Engineering Work is a useful seed, but selecting the first record by lifecycle rank is not a complete project-state model. The current page's full inline lists should evolve into bounded previews and collection destinations.

## 8. Operational Collection definition

An **Operational Collection** is a retrieval surface that helps engineers locate, compare, filter, and navigate relevant artifacts while preserving enough operational context to choose the correct one.

### When a collection is appropriate

Use a collection when an engineer needs to:

- find an artifact without a known direct path;
- compare several artifacts;
- inspect a workflow population or historical set;
- filter by project, state, workflow, condition, validation posture, or recency;
- group a large set around an operational question; or
- administer a bounded set of artifact metadata.

A collection is not appropriate as the default destination when a meaningful continuation or active workspace is already known.

### Collection item contract

An item should expose only information needed for recognition and selection:

| Information | Purpose |
| --- | --- |
| Identity and concise purpose | Recognize the artifact and why it exists |
| Project context when cross-project | Preserve scope |
| Artifact type/workflow and lifecycle state | Understand current position |
| Current next action or terminal outcome | Judge continuation relevance |
| Material condition or validation posture | Identify attention without opening every item |
| Last meaningful update | Establish currency; distinguish it from arbitrary write time when possible |
| Activity context, when evidenced | Explain why the item is relevant now, without making activity a stored identity |

### Scale behavior

Collections should use server-side pagination or cursoring, query-preserving URLs, search, explicit filters, intentional sorting, optional grouping, and bounded result counts. Defaults should answer a useful question such as “active and in review,” not silently load all history.

Completed and terminal history remains accessible through filters or groups but does not compete with active work by default. A Project may show a small preview of active or recently changed items and link to the collection for the rest.

This resolves the current Engineering Work failure mode: `prioritizedWork.slice(1)` cannot remain an indefinitely growing list. At hundreds of records, the Project must stop rendering the inventory and provide a dedicated collection.

## 9. Operational Workspace definition

An **Operational Workspace** is a purposeful runtime composition where an engineer performs a meaningful engineering activity in sufficient context to progress toward an outcome.

It is defined by responsibility, not by route count or visual template. It applies AREDIR-UX-001 rather than introducing a competing workspace model.

### Required responsibilities

| Responsibility | Requirement |
| --- | --- |
| Mission | Explain the purpose of the present activity and artifact |
| Identity/current position | Keep Project, artifact, workflow/lifecycle posture, and relevant authority visible |
| Primary work surface | Support the activity itself: investigation, design, writing, review, validation, or another bounded act |
| Supporting context | Place evidence, decisions, constraints, relationships, and knowledge beside the claims/actions they support |
| Continuity | Show what preceded the current state and what likely follows |
| Validation | Make target, evidence, result, remaining uncertainty, and disposition legible where applicable |
| Editing | Allow engineering content or structured facts to change through the interaction appropriate to them |
| Navigation | Preserve return to Project and progression to the next meaningful workspace |
| History | Retain traceability without allowing history to dominate the active task |

### Difference from adjacent surface types

| Surface | Primary purpose |
| --- | --- |
| Detail | Understand or reference an artifact's current durable representation |
| CRUD form | Create or replace structured stored values |
| Document | Preserve a durable content body, often with repository authority |
| Dashboard | Summarize several signals, usually without a single activity |
| Collection | Locate and compare artifacts |
| Operational Workspace | Perform a meaningful activity with context, evidence, and progression |

An Operational Workspace may include detail, form, document, dashboard-like signal, or collection fragments. Those fragments remain subordinate to its activity and mission.

## 10. Detail / Edit / Workspace responsibility model

Conventional Detail and Edit routes remain valid when their responsibilities are explicit.

| Need | Preferred responsibility |
| --- | --- |
| Understand artifact identity, state, summary, current outcome, and authority | Detail or read mode within the Operational Workspace |
| Modify title, classification, lifecycle state, concise summary, references, or other structured metadata | Bounded Edit surface or focused metadata panel |
| Investigate a defect and record evolving findings/evidence | Operational Workspace |
| Write design, discovery, or engineering content | Operational Workspace using an Engineering Editor |
| Review evidence against a target | Operational Workspace with evidence and validation context together |
| View chronology and decision trace | Read-only history/timeline region, progressively disclosed from the workspace or detail |
| Perform bulk classification/administration | Collection-level bounded actions, only when evidenced |

CRUD becomes harmful when:

- the engineer must replace the entire current record to add one finding;
- evidence, interpretation, decision, and outcome are collapsed into undifferentiated text;
- the storage schema dictates the reading or working sequence;
- Save becomes the only expression of engineering progress; or
- historical meaning is overwritten instead of preserved.

One route need not perform every responsibility. A route may support stable modes, focused subroutes, or contextual panels as long as identity and return orientation remain intact.

## 11. Engagement model

The proposed relationship is:

```text
Workspace
   ↓ selects or resumes an engagement
Project
   ↓ supplies bounded engineering context
Engineering Activity
   ↓ determines the purpose of interaction
Operational Workspace
   ↓ operates on and relates
Artifact / Evidence / Decision / Outcome
```

Concept classification:

| Concept | Navigation structure | Conceptual structure | Persisted domain structure | Contextual runtime structure |
| --- | --- | --- | --- | --- |
| Workspace | Yes — authenticated entry | Yes | No new record implied | Yes |
| Project | Yes — orientation scope | Yes | Yes — existing Project | Yes |
| Engineering Activity | Not as a default taxonomy | Yes | **No** | Yes, explicit or inferred when useful |
| Operational Workspace | Yes — meaningful destination | Yes | **No** | Yes |
| Engineering Work / Defect / Mission / Work Package / ADR / validation record | Usually destination or reference | Yes | According to existing authority | Yes, as working context |
| Evidence / outcome | Contextual destination where independently durable | Yes | According to owning contract | Yes |

This model explicitly prevents accidental over-modeling. Route structure, activity context, and persisted entities are separate decisions.

## 12. Continuation architecture

**Continuation** is the resumption or next step of an already intelligible engineering engagement, where the engineer can understand why it matters, what state it is in, what action is available, and where to perform it.

Continuation is not:

- the most recently written row;
- the highest-priority item in a generic backlog;
- an activity feed entry;
- a lifecycle state;
- an assignment system; or
- an opaque recommendation.

### Continuation projection contract

A future continuation candidate needs these semantics, whether the values are explicit or derived:

| Semantic | Examples / current source |
| --- | --- |
| Actor eligibility | User/project access; future responsibility/ownership when authorized |
| Purpose | Project focus, Engineering Work summary, or active Engineering Mission outcome |
| Current position | Lifecycle state, workflow, condition, validation posture |
| Action | Engineering Work `currentNextAction`; Defect `nextInvestigation`; review or validation obligation |
| Activity context | Investigate, review, validate, design, implement, release, learn |
| Destination | A specific Operational Workspace or focused mode, not merely a collection |
| Evidence for relevance | Explicit primary focus, prior interaction, active state, review request, failed validation, dependency resolution, recent meaningful change |
| Freshness | Source update and projection freshness; `updatedAt` is only a current proxy |
| Confidence/explanation | Why this is presented, including honest ambiguity |
| Competing attention | Blocker, failed validation, decision needed, or newly changed context that may alter continuation |

### Selection posture

The architecture requires no scoring algorithm. The first implementation may use deterministic, explainable rules and explicit user choices. A sound ordering is:

1. explicit current/primary engagement for the actor, when such authority exists;
2. work awaiting the actor's review or validation;
3. active work the actor recently engaged with and that still has a valid next action;
4. an active Project's explicit next step;
5. no dominant continuation when evidence is insufficient.

The current query—state rank followed by `updatedAt`—is an acceptable first-slice proxy but must be labeled and treated as such. It cannot support personalization, distinguish meaningful from administrative edits, or determine whether another engineer owns the next action.

Attention and continuation should remain distinct. A blocked item may require awareness without being actionable; a failed validation may intentionally replace the prior continuation with a response activity.

## 13. Engineering Activity analysis

### Vocabulary evaluation

The candidate vocabulary is a useful non-exclusive baseline:

| Activity | Operational meaning | Common supporting artifacts/capabilities |
| --- | --- | --- |
| Discover | Establish an opportunity, observation, uncertainty, or problem worth understanding | Opportunity, discovery Engineering Work, evidence, Project context |
| Investigate | Reduce uncertainty about cause, behavior, or feasibility | Defect, research, finding, evidence |
| Design | Shape and evaluate a response or decision | Architecture Work, ADR, design artifact, constraints |
| Plan | Bound authorized execution and verification | Work Package, Mission links, dependencies |
| Implement | Produce a scoped change | Work Package, Engineering Work, repository references |
| Review | Assess work, evidence, or a decision with another perspective | In-review Work, findings, review evidence |
| Validate | Determine whether an outcome meets its target | Validation record, Defect validation target, QA evidence |
| Release | Move a validated outcome to its intended environment or audience | Release Work/record, readiness evidence |
| Learn | Capture outcome, residual uncertainty, and reusable knowledge candidates | Completion record, knowledge candidate, promotion reference |

The vocabulary adequately spans the current software-engineering journey if treated as **activity lenses, not phases**. “Decide” is important but remains a cross-cutting act and durable outcome that can occur during Discovery, Investigation, Design, Review, or Validation; making it a tenth universal phase would imply an ordering not supported by the evidence. Coordination and operation are likewise supporting concerns rather than mandatory lifecycle phases.

### Rules

1. Activities are broadly reusable but extensible by domain when real work demonstrates a missing verb.
2. One artifact may participate in several activities over time. A Defect can be investigated, implemented, reviewed, validated, released, and learned from.
3. Several artifacts may participate in one activity. Validation may consult a Defect, Work Package, repository change, and evidence record.
4. Activity may be explicit when it changes the interaction (“Review evidence”) and inferred when workflow/state/action make it obvious.
5. Activity is temporary context. Persist only durable results, state transitions, or evidence under existing contracts.
6. Engineering Work workflow remains stable and lifecycle state remains canonical. Activities do not modify either automatically.
7. Engineering Mission orients a bounded pursued outcome that may span activities and packages. A Mission is not an activity container required by the runtime.
8. Work Package specifies implementation. Plan and Implement activities may use it, but the activity layer does not absorb its authority.

## 14. Engineering editor implications

A future **Engineering Editor** should be a reusable interaction capability embedded in Operational Workspaces where engineers develop durable engineering content. It should not become a top-level destination, generic capability page, or new document authority.

Required implications:

- editing is organized around thought and engineering meaning, not storage syntax;
- paragraphs, headings, bullets, numbering, checklists, links, and code are directly usable without Markdown literacy;
- Markdown import/export or canonical Markdown storage remains desirable where compatible with the owning artifact;
- structured engineering references, evidence citations, decisions, and validation targets should be insertable without forcing them into prose;
- the editor must distinguish durable content from comments, events, metadata, and evidence attachments/references;
- source authority and save destination must remain visible, especially for repository-authoritative artifacts;
- read and edit compositions may differ while preserving artifact identity and context; and
- different artifact contracts may use shared editing primitives without inheriting a generic document schema.

The correct architectural home is an application-level reusable editing primitive governed by C10 experience semantics, C4 documentation/format concerns, and the owning artifact capability. A shared component does not imply a shared persistence table.

## 15. Engineering history and investigation implications

Defect investigation demonstrates a need to preserve change over time rather than only the latest field values. Potential history includes:

- investigation findings;
- comments or collaboration notes;
- evidence added, superseded, or invalidated;
- lifecycle and condition transitions;
- validation attempts and results;
- decisions and rationale; and
- links to implementation, release, or learning outcomes.

This suggests a reusable **engineering history projection** across capabilities, but not yet a generic framework or event table.

The first history package should validate Defect-specific event semantics and answer:

1. Which events are durable engineering evidence versus audit metadata?
2. Which source owns each event and its body?
3. What is append-only, correctable, or supersedable?
4. How are actor, timestamp, source, and evidence provenance represented?
5. Which events change current state and which merely explain it?
6. How does a timeline summarize without replacing authoritative artifacts?

Only after Defect and at least one other capability demonstrate shared semantics should Aredir consider a cross-capability history contract. The Operational Workspace may project a timeline before the platform owns every event.

## 16. Scenario walkthroughs

### Scenario A — Resume investigation

```text
Workspace
  identifies “Continue investigating HTTP 431 Defect” and explains why
    ↓
Project
  shows the Defect inside current focus, recent change, and validation posture
    ↓
Defect Investigation Workspace
  preserves title/state/project, current next action, behavior, reproduction,
  evidence, next investigation, and validation target
    ↓
Engineer records a finding or evidence event without replacing prior history
    ↓
Validate mode assesses the target and records result/evidence
    ↓
Project and Workspace projections update to review, rework, release, learn,
  or no further continuation according to the authoritative state
```

The current implementation supports orientation, structured investigation context, editing, and a validation target. Event recording, validation records, and post-action continuation are future work.

### Scenario B — New engineering opportunity

```text
Project or contextual capture
  records bounded Engineering Work in a Discovery workflow when justified
    ↓
Discovery/Design Operational Workspace
  develops observation, evidence, hypothesis, constraints, and decision context
    ↓
Engineering Mission may orient pursuit if coordination warrants it
    ↓
Work Package becomes authoritative when implementation is justified
    ↓
Implementation and Review use the package and repository evidence
    ↓
Validation determines the outcome
    ↓
Learning is captured; reusable material enters promotion only through governance
```

No artifact automatically creates the next one. Capture ≠ authorization ≠ packaging ≠ activation ≠ validation ≠ promotion.

### Scenario C — Project orientation after time away

```text
Project
  opens with stable identity and a synthesized “since your last context” view
    ↓
Current focus / Mission and active outcomes establish what matters
    ↓
Recent transitions, unresolved conditions, decisions, and validation posture
  explain what changed and what remains uncertain
    ↓
Likely next actions link to specific Operational Workspaces
    ↓
Collections remain available for retrieval without becoming the orientation task
```

This scenario is the primary test for Project operational state. A successful Project surface does not require the engineer to scan Engineering Work, milestones, documents, prompts, and notes separately.

### Scenario D — Scale

For hundreds of Engineering Work records, hundreds of Defects, many validations, and years of history:

- Workspace queries a small continuation/attention projection; it never loads the inventory.
- Project queries current focus, recent transitions, unresolved conditions, and recent outcomes; each is bounded.
- Project collection previews have fixed limits and link to dedicated collections.
- Collections page, filter, search, group, and sort on the server with query-preserving URLs.
- Default collections exclude or group terminal history; history is never deleted.
- Direct links and recent context bypass collections when the target is already known.
- Operational Workspaces load the current working set and progressively disclose long evidence/history.
- Repository-authoritative bodies remain referenced rather than copied into larger Project payloads.

Usability therefore depends on bounded projections and direct continuation, not on making enormous lists visually denser.

## 17. Scale analysis

The architecture scales by changing the unit of orientation from **record count** to **bounded operational questions**.

| Scale pressure | Record-oriented failure | Required architectural response |
| --- | --- | --- |
| Hundreds of Engineering Work records | Project renders an ever-growing “Other engineering work” list | Bounded active preview plus a paginated, filterable Engineering Work collection |
| Hundreds of Defects | Engineers browse titles to find active investigations | Direct continuation and attention links; Defect collection defaults around active investigation, review, and validation questions |
| Many completed validations | Current and historical evidence compete equally | Current validation posture on Project/Workspace; historical validation available through filters and workspace history |
| Years of changes | Activity feed becomes noise and page payload grows | Meaningful event summaries, time-bounded queries, progressive timeline disclosure, and source-authoritative detail on demand |
| Many capability artifacts | Project becomes a stack of collection sections | Operational-state synthesis leads; capability collections become bounded destinations |
| Cross-project work | Global lists lose purpose and scope | Workspace selects a small actor-relevant projection while every item retains Project identity |

The scale model requires separate read contracts for Workspace projection, Project operational state, collection retrieval, and Operational Workspace context. It does not require copying artifacts into a common table. Indexes, query strategy, caching, and projection freshness belong to later technical packages once the first collection and Project-state queries are specified.

Success at scale means an engineer can enter through a direct continuation or answer a specific retrieval question. It does not mean all historical records are simultaneously visible.

## 18. UX architecture principles

These are application principles for the Operational Engineering Environment. They apply and refine existing authority; they are not a replacement promoted standard.

1. **Operational state before inventory.** Show what is happening before enumerating what exists.
2. **Continuation before collection.** When a justified next step is known, lead to it directly.
3. **Purposeful activity before artifact administration.** Organize the work surface around the engineer's intent while preserving artifact identity and authority.
4. **Evidence beside engineering claims.** Make basis, provenance, freshness, and uncertainty available near the decision or outcome they support.
5. **Context remains visible during work.** Project, purpose, current position, and validation target should not disappear when editing or acting.
6. **Collections support navigation; workspaces support work.** A list is not an investigation, design, review, or validation environment.
7. **History is durable and subordinate.** Preserve traceability without making chronology the primary orientation surface.
8. **Composition follows activity.** Width, density, and layout may vary across investigation, writing, comparison, and validation while the shell remains coherent.
9. **Editing supports thought, not storage format.** Markdown compatibility must not require Markdown literacy.
10. **The environment reduces reconstruction work.** A surface earns complexity only when it removes more context assembly than it creates.
11. **Authority precedes representation.** A projection, summary, or editor never gains authority merely because Aredir presents it.
12. **Uncertainty remains visible.** The environment should explain weak or competing continuation signals rather than simulate certainty.

## 19. Identified architectural risks

| Risk | Consequence | Guardrail |
| --- | --- | --- |
| Activity becomes a persisted universal model | New lifecycle and taxonomy conflict | Treat activity as runtime context; require separate evidence before persistence |
| Workspace becomes a metric dashboard | Counts replace judgment and action | Require every primary signal to support continuation or attention |
| Project remains a vertical capability catalog | Engineers reconstruct state from sections | Lead with synthesized operational state and bounded collection previews |
| Operational Workspace becomes a giant detail/edit page | Storage fields dictate engineering interaction | Separate working content, metadata edit, history, and supporting context responsibilities |
| Continuation becomes opaque recommendation | Wrong work receives false authority | Use deterministic explanations, explicit choices, and honest absence first |
| `updatedAt` is treated as meaningful activity | Administrative writes distort relevance | Introduce meaningful-change semantics only after event evidence exists |
| Central projection replaces repository authority | Competing sources of truth | Preserve references, source location, freshness, and authority labels |
| Defect-specific design becomes a generic framework too early | Other workflows inherit incorrect semantics | Use Defect as a reference implementation, not a universal schema template |
| Rich editor creates format or synchronization drift | Artifact body authority becomes ambiguous | Define adapter and ownership contracts before editor implementation |
| Timeline becomes an undifferentiated activity feed | Noise dominates engineering evidence | Separate engineering events, audit metadata, and source-authoritative artifacts |
| Shell navigation is renamed around activities | Novel taxonomy replaces familiar work | Keep activity paths contextual; evolve navigation only from observed journeys |
| Mission is required everywhere | Orientation artifact becomes another ticket layer | Preserve Mission optionality and its existing outcome/coordination boundary |

## 20. Open questions

1. What actor/responsibility model will allow continuation to be personal rather than shared-global without prematurely adding assignment semantics?
2. What constitutes a meaningful change distinct from `updatedAt`, and which capability should own that event?
3. How should Project operational state represent validation posture before a dedicated validation record exists?
4. Which unresolved decisions are first-class enough to appear in Project and Workspace attention projections under the current note/document model?
5. Should the first Engineering Work collection be Project-scoped only, or support a cross-project view from its first implementation?
6. Which Defect interactions require append-only investigation events versus updating current Defect Context?
7. What is the authoritative format and write path for repository-backed artifacts edited through Aredir?
8. How should explicit user-selected continuation, Engineering Mission Primary Active projection, and automatically inferred continuation interact?
9. What minimum runtime observation demonstrates that an activity label improves orientation rather than adding terminology?
10. Which second Operational Workspace provides sufficient evidence to evaluate reusable history and editor contracts after Defect?

None of these questions blocks the responsibility architecture or the first implementation sequence.

## 21. Recommended implementation sequence

Each step is a separate evidence-gated package. Do not implement the sequence as one redesign.

| Order | Package focus | Smallest useful outcome | Gate before proceeding |
| --- | --- | --- | --- |
| 1 | Workspace operational model | Replace the global recency assumption with an explicit, explainable continuation/attention query contract using existing data where possible | Authenticated observation shows purpose, continuation, attention, and honest empty state are understood |
| 2 | Project operational-state model | Synthesize current focus, active/review work, conditions, recent outcomes/transitions, validation obligations, and next destinations in a bounded composition | A returning engineer can orient without scanning all collections |
| 3 | Engineering Work / Defect collection architecture | Add bounded Project previews and a dedicated scalable collection with search, filters, sort/group, and pagination | Hundreds-scale seeded or synthetic read-only validation passes without Project list expansion |
| 4 | Defect Investigation Operational Workspace | Evolve the validated Defect detail/edit path into a working investigation composition while retaining canonical Engineering Work and Defect Context | Investigation, evidence review, editing, and validation handoff work without losing context or history |
| 5 | Continuation semantics refinement | Use observed activity, validation, review, and history evidence to refine deterministic continuation selection and explanation | Workspace and Project projections agree with authoritative state across scenario transitions |
| 6 | Reusable Engineering Editor | Introduce accessible rich editing through an explicit authority/format adapter in the first evidenced workspace | Markdown compatibility, no required Markdown literacy, and no source-authority ambiguity |
| 7 | Engineering history/timeline | Implement Defect-specific history first; assess cross-capability reuse only after a second case | Engineering events remain distinguishable from audit noise and authoritative artifact bodies |
| 8 | Additional workflow workspaces | Extend to Discovery/Design or Validation based on observed demand, not enum completeness | Each workflow earns its conversation, persistence, editor, evidence, and history needs independently |

### First reference Operational Workspace decision

**Choose Defect Investigation.**

Defects provide the strongest current evidence because they combine:

- a canonical Engineering Work identity and lifecycle;
- structured workflow-specific context;
- observed versus expected behavior;
- reproduction and environment;
- explicit evidence;
- a distinct next investigation and parent operational next action;
- a validation target;
- atomic create/update behavior; and
- an authenticated, responsive detail hierarchy validation.

Engineering Work should remain the parent and collection model, but it is too broad to be the first workspace template. Generalizing from Delivery and placeholder workflow definitions would risk turning unsupported workflows into a generic CRUD framework.

### Recommended next package

Create **WORKSPACE-OPERATIONAL-002 — Workspace Continuation Contract** with no schema work by default. It should:

- define continuation and attention query contracts using the semantics in §12;
- inventory which semantics are available from current Project, Engineering Work, milestone, and Defect data;
- preserve explainable selection and an honest no-continuation state;
- specify authenticated observation scenarios and seeded scale fixtures; and
- explicitly defer personalization, assignment, scoring, notifications, and recommendation algorithms.

## 22. Explicit deferred work

This package does not authorize:

- implementation of any new UI architecture;
- redesign of the public site or authenticated shell;
- activity, engagement, continuation, timeline, validation, or editor tables;
- new lifecycle states or workflow values;
- Engineering Mission persistence in the application;
- changes to Engineering Work or Defect persistence;
- recommendation algorithms, scoring, AI selection, or notifications;
- assignment, ownership, collaboration, comments, or permissions changes;
- repository indexing, synchronization, write-back, or artifact ingestion;
- a generic artifact, event, editor, workspace, or capability framework;
- migration of existing records;
- broad EOS, AEF, or AREDIR-UX-001 rewrites; or
- implementation of the recommended sequence without separately scoped packages and validation.

## Completion assessment

| Criterion | Result |
| --- | --- |
| Runtime hierarchy explained without collections as the primary model | Satisfied by §§1, 4, 11 |
| Workspace and Project responsibilities distinct | Satisfied by §§6–7 |
| Collection and Operational Workspace boundaries explicit | Satisfied by §§8–10 |
| Activity, Capability, and Artifact differentiated | Satisfied by §§4–5, 13 |
| Meaningful continuation explained | Satisfied by §12 |
| Engineering Work and Defect mapped | Satisfied by §§2, 5, 9–10, 16, 20 |
| Scale scenario survives hundreds of records and years of history | Satisfied by §§8, 16–17 |
| No unnecessary persistence introduced | Satisfied by §§5, 11–15, 22 |
| Concrete implementation sequence and first reference selected | Satisfied by §21 |
| Next package can proceed without rediscovering the architecture | Satisfied by the Workspace Continuation Contract scope in §21 |

## Related

- [AREDIR-VISION-001 — Engineering Operating Environment Philosophy](../company/AREDIR-VISION-001_PRODUCT_OPERATING_ENVIRONMENT_PHILOSOPHY.md)
- [COMPANY-VISION-002 — Engineering Philosophy Refinement](../company/COMPANY-VISION-002_ENGINEERING_PHILOSOPHY_REFINEMENT.md)
- [AREDIR-UX-001 — Workspace Experience Architecture](../company/architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md)
- [Engineering Operating System](../company/ENGINEERING_OPERATING_SYSTEM.md)
- [AEF-001 — Framework Capability Contracts](../company/framework/AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md)
- [AREDIR-DISCOVERY-003 — Engineering Operations Architecture](./AREDIR-DISCOVERY-003_ENGINEERING_OPERATIONS_ARCHITECTURE.md)
- [Engineering Mission Contract](../missions/ENGINEERING-MISSION-CONTRACT.md)
- [Engineering Work Domain Contract](../engineering/ENGINEERING-WORK-DOMAIN-CONTRACT.md)
- [Engineering Work Lifecycle](../engineering/ENGINEERING-WORK-LIFECYCLE.md)
- [WORKSPACE-001 — Daily Operating Experience](../engineering/WORKSPACE-001_DAILY_OPERATING_EXPERIENCE.md)
- [PROJECT-UX-002 — Operational Application Assessment](../engineering/PROJECT-UX-002_OPERATIONAL_APPLICATION_ASSESSMENT.md)
- [DEFECT-UX-001 — Operational Defect Detail Hierarchy](../engineering/DEFECT-UX-001_OPERATIONAL_DEFECT_DETAIL_HIERARCHY.md)
- [DEFECT-UX-001 — Validation](../engineering/DEFECT-UX-001_VALIDATION.md)
