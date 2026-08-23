# AREDIR-DISCOVERY-009 — Current-State Information Architecture Inventory

| Field | Value |
|-------|-------|
| **Work item** | AREDIR-DISCOVERY-009 |
| **Scope** | Evidence-backed inventory of how Aredir currently represents project knowledge, documentation, operational state, history, and engineering activity |
| **Review date** | 2026-08-22 |
| **Trigger** | Architectural discovery package 1: establish evidence-backed description before any implementation |
| **Outcome** | Complete inventory; no runtime or schema changes |

---

## 1. Executive Summary

This discovery inventories how the Aredir repository currently represents project knowledge, documentation, operational state, and engineering activity. It establishes an evidence-backed baseline for architectural evaluation.

**Core finding:** Aredir operates two distinct authority systems that overlap on project-state concepts:

1. **Structured persistence** (Postgres via Drizzle) — Project metadata, Engineering Work, milestones, notes, documents, prompts, repository references, and lifecycle history.
2. **Repository documentation** (Markdown under `docs/`) — Engineering domain contracts, discovery records, architecture patterns, QA standards, knowledge base assets, and operational experience records.

Engineering Work is the most architecturally mature structured artifact: it has lifecycle states, append-only history with provenance, repository reference citations, and a continuation/attention projection system. However, several project-state concepts remain **manually maintained in seed data** (`src/lib/db/seed.ts`) without a structured mutation path, creating the primary duplicate-authority risk.

The **Project** entity carries `currentFocus` and `nextStep` fields that are semantically similar to Engineering Work's `currentNextAction` but are independently maintained and manually synchronized — this is the highest-risk overlap.

---

## 2. Scope and Method

### Scope
All repository artifacts that materially represent project knowledge, documentation, operational state, or engineering activity:
- Database schema (`src/lib/db/schema.ts`)
- Workspace queries and services (`src/lib/workspace/`)
- Project and Engineering Work pages and actions (`src/app/workspace/`)
- Seed/bootstrap data (`src/lib/db/seed.ts`)
- Documentation directories (`docs/`)
- Knowledge Asset Registry (`src/lib/knowledge-assets/`)
- Related components (`src/components/workspace/`)

### Method
1. Schema-first inspection of all database tables and enums
2. Trace of query/service layer for Project, Engineering Work, and related entities
3. Trace of page rendering and server action mutation paths
4. Inventory of documentation directories and their content roles
5. Authority analysis per information domain
6. Evidence citation for every material finding

---

## 3. Current Information Domains

| # | Domain | Description |
|---|--------|-------------|
| 1 | **Project identity and metadata** | Name, slug, description, category, URLs, timestamps |
| 2 | **Project operational state** | Status (active/testing/paused/planning/archived), stage (concept/prototype/mvp/uat/production/maintenance) |
| 3 | **Project current focus** | `currentFocus`, `nextStep` — manually maintained narrative fields |
| 4 | **Engineering Work** | Scoped operational records with lifecycle, workflow, type, next action, outcome, condition |
| 5 | **Engineering Work lifecycle state** | proposed, active, in_review, completed, closed, cancelled, superseded |
| 6 | **Engineering Work history** | Append-only event log with provenance, actors, decisions, authority |
| 7 | **Repository evidence/references** | Read-only citations from Engineering Work to repository artifacts |
| 8 | **Defect context** | Structured investigation fields for defect-workflow Engineering Work |
| 9 | **Milestones** | Project-scoped target outcomes with status and dates |
| 10 | **Notes** | Project-scoped narrative memory (note, decision, risk, qa, release types) |
| 11 | **Documents** | Database-backed project documents (architecture, decision, qa, release, prompt, research, reference categories) |
| 12 | **Prompts** | Execution history records with type, body, result, verification, follow-ups |
| 13 | **Knowledge Assets** | Governed promoted standards tracked in a static registry |
| 14 | **Workspace continuation** | Derived projection of eligible Engineering Work for workspace entry |
| 15 | **Workspace attention** | Derived projection of conditions/blocked items requiring awareness |
| 16 | **Operating snapshot** | Derived aggregate of project counts and milestone status |
| 17 | **Repository documentation** | Markdown files under `docs/` performing multiple roles |
| 18 | **Related knowledge** | Hard-coded mapping of Engineering Work to supporting documents/assets |

---

## 4. Authority Matrix

| Information Domain | Current Representation | Persistence / Location | Current Authority | Lifecycle | Derived Consumers | Duplication / Conflict Risk | Evidence | Architectural Disposition |
|---|---|---|---|---|---|---|---|---|
| **Project identity** | `workspaceProjects` table | Postgres | Structured authoritative | Manual CRUD via seed upsert | Project pages, workspace page | No issue | `schema.ts:92-107`, `seed.ts:27-84` | Likely legitimate authority |
| **Project status** | `workspaceProjects.status` enum | Postgres | Structured authoritative | Manual via seed upsert | Project pages, continuation, snapshot | Medium — drift from work state | `schema.ts:96`, `seed.ts:33,47,58,73` | Requires deeper discovery |
| **Project stage** | `workspaceProjects.stage` enum | Postgres | Structured authoritative | Manual via seed upsert | Project detail display | Low | `schema.ts:97` | Likely legitimate authority |
| **Project currentFocus** | `workspaceProjects.currentFocus` text | Postgres | Manually maintained | Seed upsert only | Workspace page, project detail | **HIGH** — overlaps Engineering Work | `schema.ts:98`, `seed.ts:35,49,60,75` | **Duplicate-authority concern** |
| **Project nextStep** | `workspaceProjects.nextStep` text | Postgres | Manually maintained | Seed upsert only | Workspace page, project detail | **HIGH** — overlaps EW nextAction | `schema.ts:99`, `seed.ts:36,50,61,76` | **Duplicate-authority concern** |
| **Project targetDate** | `workspaceProjects.targetDate` | Postgres | Structured authoritative | Manual via seed | Project detail | Low | `schema.ts:100` | Likely legitimate authority |
| **Project description** | `workspaceProjects.description` | Postgres | Structured authoritative | Manual via seed upsert | Project detail | Low | `schema.ts:102` | Likely legitimate authority |
| **Project URLs** | `workspaceProjects.repoUrl/publicUrl` | Postgres | Structured authoritative | Manual via seed | Project detail links | Low | `schema.ts:103-104` | Likely legitimate authority |
| **Engineering Work** | `workspaceEngineeringWork` table | Postgres | Structured authoritative | Lifecycle mutations with history | Continuation, attention, detail | No issue | `schema.ts:313-332` | Likely legitimate authority |
| **EW state** | `workspaceEngineeringWork.state` | Postgres | Structured authoritative | Lifecycle transitions with provenance | Continuation, attention, rendering | No issue | `schema.ts:322` | Likely legitimate authority |
| **EW nextAction** | `workspaceEngineeringWork.currentNextAction` | Postgres | Structured authoritative | Operational updates with history | Continuation, workspace page | **HIGH** — overlaps Project fields | `schema.ts:323`, `workspace-operational.ts:65-69` | **Duplicate-authority concern** |
| **EW history** | `workspaceEngineeringWorkHistory` | Postgres | Structured authoritative | Append-only, provenance-tracked | History display, traceability | No issue | `schema.ts:334-439` | Likely legitimate authority |
| **Repository refs** | `workspaceEngineeringWorkRepositoryReferences` | Postgres | Structured authoritative | CRUD with history events | Evidence display | No issue | `schema.ts:509-540` | Likely legitimate authority |
| **Defect context** | `workspaceEngineeringWorkDefects` | Postgres | Structured authoritative | Atomic with EW mutations | Defect rendering, continuation | No issue | `schema.ts:491-507` | Likely legitimate authority |
| **Milestones** | `workspaceProjectMilestones` | Postgres | Structured authoritative | Manual CRUD via seed + actions | Snapshot, attention, detail | Medium — no EW relationship | `schema.ts:257-270` | Likely legitimate authority |
| **Notes** | `workspaceProjectNotes` | Postgres | Structured authoritative | Manual CRUD via seed + actions | Project detail | Low | `schema.ts:245-255` | Likely legitimate authority |
| **Documents** | `workspaceProjectDocuments` | Postgres | Structured authoritative | Manual CRUD via seed + actions | Detail, hub, search | Low | `schema.ts:272-292` | Likely legitimate authority |
| **Prompts** | `workspaceProjectPrompts` | Postgres | Structured authoritative | Manual CRUD via seed + actions | Library, project detail | Low | `schema.ts:294-311` | Likely legitimate authority |
| **Knowledge Assets** | Static TS registry | `registry.ts` | Manually maintained (code) | Manual code updates | Pages, related knowledge | Medium — vs. docs/company/ markdown | `registry.ts:16-347` | **Duplicate-authority concern** |
| **Continuation** | Derived query projection | `workspace-operational.ts` | Derived | Computed at request time | Workspace page | No issue | `workspace-operational.ts:61-162` | Derived-state candidate |
| **Attention** | Derived query projection | `workspace-operational.ts` | Derived | Computed at request time | Workspace page | No issue | `workspace-operational.ts:42-57` | Derived-state candidate |
| **Operating snapshot** | Derived query | `queries.ts:244-297` | Derived | Computed at request time | Snapshot component | No issue | `queries.ts:244-297` | Derived-state candidate |
| **Related knowledge** | Hard-coded mapping | `related-knowledge.ts:32-50` | Manually maintained | Manual code updates | EW detail section | Medium — only 1 EW mapped | `related-knowledge.ts:32-50` | **Duplicate-authority concern** |
| **Repository docs** | Markdown under `docs/` | Git repo | Repository authoritative | Manual authoring, promotion | Discovery, contracts, KB | Medium — overlaps workspace docs | `docs/` directory | Historical/documentary concern |
| **Seed data** | `src/lib/db/seed.ts` | TypeScript code | Manually maintained | Re-seed via npm script | All surfaces on re-seed | **HIGH** — only mutation path for Project metadata | `seed.ts` | **Duplicate-authority concern** |

---

## 5. Project State Reconstruction

> If Aredir had to reconstruct the truthful current state of a Project today, what sources would it have to consult?

### Facts obtainable directly from Project

| Fact | Source | Evidence |
|------|--------|----------|
| Project name, slug, description, category | `workspaceProjects` table | `schema.ts:93-104` |
| Project status | `workspaceProjects.status` | `schema.ts:96` |
| Project stage | `workspaceProjects.stage` | `schema.ts:97` |
| Project target date | `workspaceProjects.targetDate` | `schema.ts:100` |
| Project repo URL, public URL | `workspaceProjects.repoUrl/publicUrl` | `schema.ts:103-104` |
| Project created/updated timestamps | `workspaceProjects.createdAt/updatedAt` | `schema.ts:105-106` |

### Facts requiring Engineering Work

| Fact | Source | Evidence |
|------|--------|----------|
| What active work exists | `workspaceEngineeringWork` filtered by projectId + state | `queries.ts:337-345` |
| What the next action is for active work | `workspaceEngineeringWork.currentNextAction` | `schema.ts:323` |
| What work is blocked (has condition) | `workspaceEngineeringWork.condition` | `schema.ts:326` |
| What work has been completed | `workspaceEngineeringWork.state = 'completed'` | `schema.ts:322` |
| Complete lifecycle history of work | `workspaceEngineeringWorkHistory` | `schema.ts:334-439` |
| Repository evidence linked to work | `workspaceEngineeringWorkRepositoryReferences` | `schema.ts:509-540` |

### Facts requiring Workspace/continuation logic

| Fact | Source | Evidence |
|------|--------|----------|
| What can currently be continued | `workspace-operational.ts` projection | `workspace-operational.ts:61-162` |
| What requires attention | `workspace-operational.ts` attention items | `workspace-operational.ts:83-98` |
| Operating snapshot counts | `queries.ts:244-297` | `queries.ts:244-297` |

### Facts requiring documentation

| Fact | Source | Evidence |
|------|--------|----------|
| Engineering Work domain contract | `docs/engineering/ENGINEERING-WORK-DOMAIN-CONTRACT.md` | Repository file |
| Lifecycle semantics | `docs/engineering/ENGINEERING-WORK-LIFECYCLE.md` | Repository file |
| Relationship model | `docs/engineering/ENGINEERING-WORK-RELATIONSHIP-MODEL.md` | Repository file |
| Repository reference contract | `docs/engineering/ENGINEERING-WORK-REPOSITORY-REFERENCE-CONTRACT.md` | Repository file |
| Knowledge asset governance rules | `docs/company/KNOWLEDGE_BASE_INDEX.md`, `PROMOTION_PROCESS.md` | Repository files |

### Facts requiring manually maintained narrative

| Fact | Source | Evidence |
|------|--------|----------|
| Project current focus | `workspaceProjects.currentFocus` (seed-maintained) | `seed.ts:35,49,60,75` |
| Project next step | `workspaceProjects.nextStep` (seed-maintained) | `seed.ts:36,50,61,76` |
| Related knowledge for specific EW | Hard-coded map in `related-knowledge.ts` | `related-knowledge.ts:32-50` |
| Knowledge Asset adoption status | Static registry in `registry.ts` | `registry.ts:16-347` |

### Facts that cannot currently be reconstructed reliably

| Fact | Gap | Evidence |
|------|-----|----------|
| Whether Project currentFocus matches actual EW state | No synchronization mechanism | `seed.ts` vs. `engineering-work-history-persistence.ts` |
| Whether milestones are linked to relevant EW | No modeled relationship | `ENGINEERING-WORK-RELATIONSHIP-MODEL.md:26` |
| Whether Project status accurately reflects active work state | No derivation mechanism | `schema.ts:96` |
| Cross-project work relationships | Work is single-project | `ENGINEERING-WORK-RELATIONSHIP-MODEL.md:35` |

### Where two sources could disagree

| Disagreement | Source A | Source B | Risk |
|---|---|---|---|
| Project currentFocus vs. active EW next action | `workspaceProjects.currentFocus` | `workspaceEngineeringWork.currentNextAction` | **HIGH** |
| Project nextStep vs. active EW next action | `workspaceProjects.nextStep` | `workspaceEngineeringWork.currentNextAction` | **HIGH** |
| Project status vs. active work state | `workspaceProjects.status` | `workspaceEngineeringWork.state` distribution | **MEDIUM** |
| Milestone status vs. related work completion | `workspaceProjectMilestones.status` | `workspaceEngineeringWork.state` | **MEDIUM** |
| Knowledge Asset adoption vs. actual usage | `registry.ts` adoption field | No runtime tracking | **MEDIUM** |
| Seed data vs. actual operational state | `seed.ts` | Mutated EW state | **LOW** |

---

## 6. Project Information Ownership

### What Project owns independently

The `workspaceProjects` table is the authoritative source for:
- Identity: `id`, `name`, `slug`
- Classification: `category`, `status`, `stage`
- URLs: `repoUrl`, `publicUrl`
- Temporal: `targetDate`, `createdAt`, `updatedAt`
- Descriptive: `description`

### What Project carries but does not uniquely own

- `currentFocus` — **manually maintained text**, semantically overlaps with Engineering Work operational context. Currently authored through seed data only (`seed.ts:35,49,60,75`). No server action mutates this field. The only mutation path is re-seeding.
- `nextStep` — **manually maintained text**, semantically overlaps with Engineering Work `currentNextAction`. Same authoring constraint as `currentFocus`.

### What Project does not own

- Engineering Work operational state (owned by `workspaceEngineeringWork`)
- Milestone tracking (separate table, no relationship to work)
- Decisions (notes with `type: "decision"`, not linked to Engineering Work)
- Repository evidence (owned by Engineering Work references)
- Knowledge governance (owned by static registry + `docs/company/` markdown)

---

## 7. Engineering Work Information Ownership

### What Engineering Work owns

Per `ENGINEERING-WORK-DOMAIN-CONTRACT.md` and schema evidence:

| Owned concept | Field/table | Authority |
|---|---|---|
| Operational state | `state` enum | Structured, lifecycle-governed |
| Current next action | `currentNextAction` | Structured, mutation-tracked |
| Current outcome | `currentOutcome` | Structured, mutation-tracked |
| Condition/rationale | `condition`, `conditionRationale` | Structured, mutation-tracked |
| Final disposition | `finalDisposition` | Structured, completion-gated |
| Type/workflow | `type`, `workflow` | Structured, stable after creation |
| Priority | `priority` | Structured, optional |
| Version | `version` | Structured, optimistic concurrency |
| Lifecycle history | `workspaceEngineeringWorkHistory` | Append-only, provenance-tracked |
| Repository references | `workspaceEngineeringWorkRepositoryReferences` | Structured, read-only citations |
| Defect context | `workspaceEngineeringWorkDefects` | Structured, atomic with work |
| Defect revisions | `workspaceEngineerWorkDefectRevisions` | Append-only, linked to history |
| Repository reference revisions | `workspaceEngineerWorkRepoRevisions` | Append-only, linked to history |

### What Engineering Work cannot currently express

| Missing concept | Status | Evidence |
|---|---|---|
| Parent/child work decomposition | Contract says Optional; **not in schema** | `ENGINEERING-WORK-DOMAIN-CONTRACT.md:40`; `schema.ts:313-332` |
| Related work (non-hierarchical) | Contract mentions; **not implemented** | `ENGINEERING-WORK-RELATIONSHIP-MODEL.md:24` |
| Dependency/blocking relations | Contract mentions; **not implemented** | `ENGINEERING-WORK-RELATIONSHIP-MODEL.md:27` |
| Owner/assignee | Explicitly deferred | `ENGINEERING-WORK-DOMAIN-CONTRACT.md:46` |
| Created-by attribution | Explicitly deferred | `ENGINEERING-WORK-DOMAIN-CONTRACT.md:47` |
| Milestone linkage | Explicitly deferred | `ENGINEERING-WORK-RELATIONSHIP-MODEL.md:26` |
| Knowledge asset linkage | Deferred (related knowledge is hard-coded) | `ENGINEERING-WORK-RELATIONSHIP-MODEL.md:30` |

### Lifecycle implementation status

The schema enum at `schema.ts:185-193` includes: `proposed`, `active`, `in_review`, `completed`, `closed`, `cancelled`, `superseded`.

Implemented transitions (from `engineering-work-history-persistence.ts:127`):
- `proposed -> active` (activation gate)
- `active -> in_review`
- `in_review -> active` (rework)
- `active/in_review -> completed` (completion with authorization)

**Not implemented in persistence layer:**
- `completed -> closed` (closure)
- Any state -> `cancelled`
- Any state -> `superseded`
- `completed -> superseded`

---

## 8. Documentation Roles

| Role | Examples | Evidence |
|---|---|---|
| Architecture specification | `docs/company/architecture-patterns/` (12+ files) | Knowledge Asset Registry links |
| Operating-system specification | `docs/company/ENGINEERING_OPERATING_SYSTEM.md`, `ENGINEERING_BLUEPRINT_SPECIFICATION.md` | Company docs directory |
| Discovery record | `docs/discovery/AREDIR-DISCOVERY-001` through `-009` | Discovery README index |
| Implementation specification | `docs/engineering/AREDIR-ENGINEERING-WORK-001.md` through `-005.md` | Engineering README |
| Verification evidence | `docs/engineering/ENGINEERING-WORK-*_VALIDATION.md`, `*_VERIFICATION.md` | Engineering README |
| Decision record | `workspaceProjectDocuments` with `category: "decision"` (DB) + `docs/company/` ADR-like patterns | Schema + docs |
| Historical narrative | `docs/engineering/AREDIR-ENGINEERING-WORK-002_COMPLETION_REPORT.md` | Engineering README |
| Project status | Seed data in `seed.ts` with `currentFocus`/`nextStep` fields | `seed.ts` |
| Backlog/work tracking | Engineering Work records in DB | Schema |
| Prompt storage | `workspaceProjectPrompts` table + `docs/prompts/` directory | Schema + docs |
| Durable knowledge | `docs/company/` (architecture patterns, AI patterns, engineering standards, QA standards, knowledge patterns, playbooks) | Knowledge Asset Registry |
| Operational instructions | `docs/workspace/`, `docs/engineering/deployment-workflow.md` | Workspace docs |
| Repository contract | `docs/engineering/ENGINEERING-WORK-DOMAIN-CONTRACT.md`, `ENGINEERING-WORK-REPOSITORY-REFERENCE-CONTRACT.md`, `ENGINEERING-WORK-RELATIONSHIP-MODEL.md` | Engineering docs |
| Knowledge governance | `docs/company/GOVERNANCE_INDEX.md`, `PROMOTION_PROCESS.md`, `KNOWLEDGE_BASE_INDEX.md` | Company docs |

### Documentation/structured overlap areas

- **Project status**: Seed data in `seed.ts` duplicates what `workspaceProjects` table stores. Documentation audit records (e.g., `WORKSPACE_008A`) describe metadata corrections that are applied to seed data.
- **Engineering Work semantics**: Both `docs/engineering/ENGINEERING-WORK-DOMAIN-CONTRACT.md` and the schema define the same concepts. The documentation is the specification; the schema is the implementation. This is **semantic overlap, not duplicate authority** — the documentation legitimately specifies intent.
- **Knowledge Assets**: The static TypeScript registry in `registry.ts` and the markdown files under `docs/company/` both describe the same promoted standards. The registry says `docs/company/` markdown is canonical. This is an explicit authority relationship, not duplication.

---

## 9. Repository Evidence Semantics

### How repository evidence is represented

Repository evidence exists as **read-only citations** from Engineering Work to external artifacts:

- `workspaceEngineeringWorkRepositoryReferences` stores: repository name, source location (URL/path), artifact class, authority classification, identifier, branch, commit hash, reference status, last reviewed date, note.
- `workspaceEngineeringWorkRepositoryReferenceRevisions` stores append-only diffs when references are created or maintained.

### Authority model

Per `ENGINEERING-WORK-REPOSITORY-REFERENCE-CONTRACT.md`:
- The Workspace is never the authority for a referenced artifact body.
- References record metadata only; they do not fetch, cache, index, or reproduce content.
- Repository-authoritative is the baseline authority classification.

### Artifact classes supported

From `repository-reference.ts:3-14`: `implementation_package`, `finding`, `verification_evidence`, `decision_adr`, `mission`, `repository_document`, `review`, `release_record`, `promotion_candidate`, `knowledge_asset_source`.

### Status lifecycle

From `schema.ts:200-203`: `expected`, `verified`, `stale`, `missing`.

Review status transitions (`verified`, `stale`, `missing`) require a decision basis summary and set a server-controlled review timestamp (`engineering-work-history-persistence.ts:840-862`).

---

## 10. Historical / Revision / Supersession Semantics

### What exists

- **Engineering Work history**: Append-only event log (`workspaceEngineeringWorkHistory`) recording every mutation with full before/after state, provenance, actors, and decisions.
- **Defect revisions**: Append-only diffs of defect context changes (`workspaceEngineerWorkDefectRevisions`).
- **Repository reference revisions**: Append-only diffs of reference metadata changes (`workspaceEngineerWorkRepoRevisions`).
- **Lifecycle state transitions**: Tracked as history events with prior/resulting state.
- **Superseded state**: Defined in the enum (`schema.ts:192`) and lifecycle document, but **not implemented** in the persistence layer.

### What is missing

| Missing semantic | Evidence |
|---|---|
| `completed -> closed` transition | Defined in lifecycle doc (`ENGINEERING-WORK-LIFECYCLE.md:24`) but no persistence function exists |
| `cancelled` from any state | Defined in lifecycle doc but no persistence function exists |
| `superseded` from any state | Defined in lifecycle doc but no persistence function exists |
| Work-to-work supersession relationship | Lifecycle doc says Superseded "requires a successor relation" (`ENGINEERING-WORK-LIFECYCLE.md:43`) but schema has no successor field |
| Historical documentation supersession | No mechanism; docs remain in place without staleness markers |
| Stale Project state detection | No mechanism; Project metadata can become stale without detection |
| Historical repository evidence | References are retained after work completion but commit hash is optional |

---

## 11. Relationship Semantics

### Relationships that currently exist

| Relationship | Type | Evidence |
|---|---|---|
| Project -> Engineering Work | One-to-many (FK) | `schema.ts:315-317` |
| Engineering Work -> Repository references | One-to-many (FK) | `schema.ts:513-515` |
| Engineering Work -> History events | One-to-many (FK) | `schema.ts:338-340` |
| Engineering Work -> Defect context | One-to-one (FK) | `schema.ts:493-496` |
| Engineering Work -> Defect revisions | One-to-many (FK) | `schema.ts:445-448` |
| History event -> Defect revision | One-to-one (FK) | `schema.ts:445-448` |
| History event -> Repo reference revision | One-to-one (FK) | `schema.ts:548-551` |
| History event -> based_on_event (self-ref) | Optional FK | `schema.ts:378`, `schema.ts:400-409` |
| Project -> Milestones | One-to-many (FK) | `schema.ts:259-261` |
| Project -> Notes | One-to-many (FK) | `schema.ts:247-249` |
| Project -> Documents | One-to-many (FK) | `schema.ts:276-278` |
| Project -> Prompts | One-to-many (FK) | `schema.ts:296-298` |
| Related knowledge (hard-coded) | Code-level map | `related-knowledge.ts:32-50` |

### Relationships that exist only through prose/conventions

| Relationship | Nature | Evidence |
|---|---|---|
| Milestone -> Engineering Work | No FK; conceptual grouping | `ENGINEERING-WORK-RELATIONSHIP-MODEL.md:26` says "Future" |
| Note -> Engineering Work | No FK; conceptual attachment | `ENGINEERING-WORK-RELATIONSHIP-MODEL.md:28` says "Future" |
| Document -> Engineering Work | No FK; referenced context | `ENGINEERING-WORK-RELATIONSHIP-MODEL.md:29` says "Future" |
| Prompt -> Engineering Work | No FK; execution history | `ENGINEERING-WORK-RELATIONSHIP-MODEL.md:29` says "Future" |
| Knowledge Asset -> Engineering Work | Hard-coded map | `related-knowledge.ts:32-50` |
| Engineering Work -> Engineering Work (parent/child) | Defined in contract, not in schema | `ENGINEERING-WORK-DOMAIN-CONTRACT.md:40` |
| Engineering Work -> Engineering Work (related) | Defined in contract, not in schema | `ENGINEERING-WORK-RELATIONSHIP-MODEL.md:24` |
| Engineering Work -> Engineering Work (dependency) | Defined in contract, not in schema | `ENGINEERING-WORK-RELATIONSHIP-MODEL.md:27` |

---

## 12. Derived-State Inventory

| Derived state | Source inputs | Logic location | Consumers |
|---|---|---|---|
| Workspace continuation projection | Engineering Work (active/in_review, no condition, complete defect context) + Project (active/testing) | `workspace-operational.ts:61-162`, `queries.ts:97-242` | Workspace page |
| Workspace attention items | Engineering Work with conditions, incomplete defect context, blocked milestones | `queries.ts:135-232` | Workspace page |
| Operating snapshot counts | All Projects (active/testing/paused/planning counts), milestones (next, blocked) | `queries.ts:244-297` | Workspace operating snapshot |
| Related knowledge items | Hard-coded map + Project documents + Knowledge Asset registry | `related-knowledge.ts:70-134` | Engineering Work detail page |
| Continuation eligibility predicate | Operating project filter + eligible work state + no condition + required text + complete defect context | `queries.ts:69-99` | Queries |

---

## 13. Duplicate or Ambiguous Authority Findings

### HIGH risk

1. **Project `currentFocus` / `nextStep` vs. Engineering Work `currentNextAction`**
   - Project carries `currentFocus` and `nextStep` as manually maintained text fields.
   - Engineering Work carries `currentNextAction` as a structured, lifecycle-tracked field.
   - These represent overlapping concepts: "what is happening now" and "what comes next."
   - No synchronization mechanism exists. Both can be independently updated and can disagree.
   - Evidence: `schema.ts:98-99` vs. `schema.ts:323`; `seed.ts:35-36,49-50,60-61,75-76`

2. **Seed data as the only mutation path for Project metadata**
   - `currentFocus`, `nextStep`, `status`, `stage`, `description`, and all other Project fields can only be changed by modifying `src/lib/db/seed.ts` and re-running `npm run db:seed`.
   - No server action or API endpoint mutates Project fields.
   - Evidence: `src/app/workspace/projects/[slug]/actions.ts` — only creates milestones, notes, documents, prompts. No update project action exists.

### MEDIUM risk

3. **Knowledge Asset Registry vs. `docs/company/` markdown**
   - The static TypeScript registry (`registry.ts`) and the markdown files under `docs/company/` describe the same promoted standards.
   - The registry explicitly states `docs/company/` markdown is canonical (`registry.ts:12`).
   - This is an explicit authority relationship, but the registry adoption data and review dates must be manually synchronized with actual usage.
   - Evidence: `registry.ts:12`, `registry.ts:16-347`

4. **Milestones have no relationship to Engineering Work**
   - Milestones track project-level targets; Engineering Work tracks operational activity.
   - A milestone being "completed" does not update when linked Engineering Work completes, and vice versa.
   - The relationship model explicitly defers this (`ENGINEERING-WORK-RELATIONSHIP-MODEL.md:26`).
   - Evidence: `schema.ts:257-270` (milestones), `schema.ts:313-332` (EW), no FK between them

5. **Related knowledge mapping is hard-coded**
   - Only one Engineering Work item (`eng_work_alignfit_hydration_operational_state`) has mapped related knowledge.
   - The mapping is in code (`related-knowledge.ts:32-50`), not in the database.
   - Evidence: `related-knowledge.ts:32-50`

### LOW risk

6. **Repository documentation vs. workspace documents**
   - Markdown files under `docs/` and `workspaceProjectDocuments` both store project-relevant information.
   - They serve different purposes (repository-authoritative vs. workspace-scoped) but the boundary is not always clear.
   - Evidence: `docs/engineering/` vs. `schema.ts:272-292`

---

## 14. Lifecycle Gaps

| Gap | Evidence | Impact |
|---|---|---|
| `completed -> closed` transition not implemented | `ENGINEERING-WORK-LIFECYCLE.md:24` defines it; no persistence function | Completion is the effective terminal state in practice |
| `cancelled` transition not implemented | Lifecycle doc defines it; no persistence function | Cannot formally cancel work through the system |
| `superseded` transition not implemented | Lifecycle doc defines it; no persistence function | Cannot formally supersede work |
| Work-to-work successor relationship | Lifecycle doc says Superseded "requires a successor relation"; no schema field | Cannot trace supersession chain |
| Project status not derived from work state | Status is manually set; no computation from EW state distribution | Status can become stale |
| Milestone completion not linked to EW completion | No FK or trigger | Milestones and work can disagree on completion |
| Owner/assignee not tracked | Explicitly deferred in domain contract | Cannot determine who is responsible |
| Parent/child work decomposition | Contract says Optional; not in schema | Cannot decompose large work items |

---

## 15. Architectural Pressure Points

1. **Project metadata stagnation**: `currentFocus`, `nextStep`, and `status` are only updatable through seed re-execution. As Engineering Work accumulates, these fields will increasingly diverge from actual operational state unless a mutation path or derivation mechanism is introduced.

2. **Continuation system depends on EW completeness**: The workspace continuation projection (`workspace-operational.ts`) requires Engineering Work to have non-empty `title`, `summary`, `currentNextAction`, and a non-null `projectSlug`. If any of these are missing, the work cannot be presented as a continuation candidate, even if it is the only active work.

3. **Defect workflow is the only workflow with structured context**: Defect-workflow Engineering Work has dedicated investigation fields. Other workflows (delivery, discovery, research, architecture, etc.) have intake definitions (`engineering-work-intake.ts:25-129`) but most are marked `implemented: false`. Only delivery and defect have structured intake.

4. **Related knowledge is fragile**: The hard-coded mapping in `related-knowledge.ts` will not scale. As Engineering Work accumulates, manually maintaining this mapping in code becomes impractical.

5. **Knowledge Asset adoption is self-reported**: The adoption field in `registry.ts` is manually maintained and not verified against actual usage in the codebase or workspace.

6. **No cross-project view**: Engineering Work is single-project. There is no mechanism to see all work across projects or to reason about cross-project priorities.

---

## 16. Unknowns Requiring Further Discovery

1. **How often does seed data diverge from operational reality?** We know seed is the only mutation path for Project metadata, but we do not know how frequently re-seeding occurs or how stale the data becomes between seeds.

2. **What is the actual usage pattern of workspace documents vs. repository documentation?** The boundary between `workspaceProjectDocuments` and `docs/` files is not clear from schema alone.

3. **Are there any Engineering Work items that have been mutated through the UI but whose Project metadata has not been updated?** This would confirm the divergence risk.

4. **How do prompts relate to Engineering Work in practice?** Prompts and EW are both project-scoped, but there is no formal relationship. Do users think of prompts as execution history for specific work items?

5. **What happens when a Project is archived?** The schema supports `archived` status but there is no archival policy for associated Engineering Work, milestones, notes, documents, or prompts.

6. **Is the Knowledge Asset Registry actually consulted during engineering decisions?** The registry exists but its role in actual decision-making is unclear.

---

## 17. Evidence Index

| Evidence | Path | Key lines |
|---|---|---|
| Database schema | `src/lib/db/schema.ts` | All 597 lines |
| Seed/bootstrap data | `src/lib/db/seed.ts` | All 642 lines |
| Workspace queries | `src/lib/workspace/queries.ts` | All 788 lines |
| Continuation logic | `src/lib/workspace/workspace-operational.ts` | All 162 lines |
| EW lifecycle persistence | `src/lib/workspace/engineering-work-history-persistence.ts` | All 943 lines |
| EW provenance | `src/lib/workspace/engineering-work-provenance.ts` | All 272 lines |
| Repository references | `src/lib/workspace/repository-reference.ts` | All 150 lines |
| EW intake definitions | `src/lib/workspace/engineering-work-intake.ts` | All 135 lines |
| Defect context | `src/lib/workspace/defect-context.ts` | All 56 lines |
| Related knowledge | `src/lib/workspace/related-knowledge.ts` | All 134 lines |
| Knowledge Asset registry | `src/lib/knowledge-assets/registry.ts` | All 448 lines |
| Project detail page | `src/app/workspace/projects/[slug]/page.tsx` | All 292 lines |
| Project server actions | `src/app/workspace/projects/[slug]/actions.ts` | All 353 lines |
| EW server actions | `src/app/workspace/projects/[slug]/engineering-work-actions.ts` | All 448 lines |
| EW detail page | `src/app/workspace/projects/[slug]/engineering-work/[workId]/page.tsx` | All 593 lines |
| Workspace page | `src/app/workspace/page.tsx` | All 288 lines |
| EW domain contract | `docs/engineering/ENGINEERING-WORK-DOMAIN-CONTRACT.md` | All 81 lines |
| EW lifecycle | `docs/engineering/ENGINEERING-WORK-LIFECYCLE.md` | All 57 lines |
| EW relationship model | `docs/engineering/ENGINEERING-WORK-RELATIONSHIP-MODEL.md` | All 48 lines |
| EW repository ref contract | `docs/engineering/ENGINEERING-WORK-REPOSITORY-REFERENCE-CONTRACT.md` | All 43 lines |
| Project metadata audit | `docs/workspace/WORKSPACE_008A_PROJECT_METADATA_AUDIT.md` | All 201 lines |
| Overview section component | `src/components/workspace/project-overview-section.tsx` | All 83 lines |

---

## 18. Recommended Boundary for Package 2

Based on evidence, the narrowest useful Package 2 boundary should address:

### Primary: Authority and source-of-truth rules for Project operational state

The highest-risk finding is the ambiguity between Project `currentFocus`/`nextStep` and Engineering Work `currentNextAction`. Package 2 should determine:

1. Whether Project `currentFocus` and `nextStep` should become **derived** from Engineering Work state, or remain **independent manually-maintained** fields with an explicit purpose distinction.
2. Whether Project `status` should be derivable from Engineering Work state distribution, or remain independently authored.
3. Whether a mutation path for Project metadata should exist beyond seed re-execution.

### Secondary: Artifact taxonomy and documentation boundaries

1. The relationship between `workspaceProjectDocuments` (DB-backed) and `docs/` (repo Markdown) needs a clear authority model.
2. The Knowledge Asset Registry's relationship to `docs/company/` markdown needs evaluation — is the registry a projection of governed docs, or a separate authority?
3. The hard-coded `related-knowledge.ts` mapping needs a boundary decision: should this be data-driven, or remain code-level?

### Tertiary: Lifecycle completion semantics

1. The gap between lifecycle documentation (which defines `closed`, `cancelled`, `superseded`) and persistence implementation (which only supports transitions to `active`, `in_review`, and `completed`) should be evaluated.
2. Whether the missing terminal transitions represent intentional deferral or an architectural gap.

### Explicitly out of scope for Package 2

- Implementing parent/child work decomposition
- Implementing dependency/blocking relationships
- Adding owner/assignee tracking
- Implementing cross-project views
- Migrating Markdown content to structured persistence
- Backfilling historical Engineering Work
