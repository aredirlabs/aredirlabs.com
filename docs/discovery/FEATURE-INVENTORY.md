# Feature Inventory

Classifications describe observed current state. “Prototype” means a useful but deliberately limited implementation; it does not mean unused or disposable.

| Capability | Purpose | Current maturity | Reusable / prototype / deprecated candidate | Future extension opportunity (observational) |
| --- | --- | --- | --- | --- |
| Public marketing site | Present Aredir Labs, engineering posture, projects, about/contact content. | Implemented | Reusable public shell and content components. | Separate from internal operational data by current route boundary. |
| Public project catalog | Show public project index and details from `engineering-content` data. | Implemented | Reusable read-only catalog pattern. | Public/project data remains static rather than Workspace-derived. |
| Theme and brand system | Provide light/dark theming, brand marks, typography, visual motifs. | Implemented | Reusable foundation. | None asserted beyond current component reuse. |
| Email/password authentication | Create approved accounts, sign in/out, maintain Better Auth sessions. | Implemented | Reusable authentication foundation. | Authorization maturity is separate from credential/session capability. |
| Invite-only registration | Limit new account creation to environment allow-list emails. | Implemented | Reusable configuration gate. | No invitation administration or lifecycle. |
| Protected Workspace shell | Provide authenticated navigation and responsive internal application frame. | Implemented | Reusable operational shell. | No role-aware or context-aware navigation. |
| Project registry | Persist/list project identity, stage, status, focus, next step, URLs, descriptions. | Implemented | Reusable shared portfolio foundation. | No create/edit/archive UI or ownership relation. |
| Operating snapshot | Summarize project status counts, next milestone, and blocked milestones. | Implemented | Reusable derived-view pattern. | Limited to present project/milestone vocabulary. |
| Project overview | Display project metadata and operational summary. | Implemented | Reusable section pattern. | Read-only project metadata. |
| Milestones | List ordered milestones and create new project-scoped milestones. | Implemented | Reusable project artifact pattern. | No edit/delete, assignee, dependency, or ownership. |
| Notes/decisions/risks/QA/releases | Capture and list typed project notes. | Implemented | Reusable typed journal/prototype artifact. | No editing, links, author, or formal decision lifecycle. |
| Project documents | Create/read category-tagged textual documents; detail pages and global search. | Implemented | Reusable document view/form pattern. | Database copies have no repository-source or revision linkage. |
| Prompt library | Create/read prompt records with result, changed files, verification, follow-ups, and status; filter globally. | Implemented | Reusable operational-record prototype. | Not a generalized execution/workflow system. |
| Knowledge Asset Registry | Browse/filter static promoted assets, relationships, adoption matrix, and review dashboard. | Implemented, read-only | Reusable presentation/taxonomy prototype. | Not persistent or synced to repository files. |
| Workspace settings | Expose Profile and Workspace settings route. | Placeholder | Prototype; explicit future placeholder. | No functional settings. |
| Error/loading/not-found states | Handle Workspace loading, errors, missing projects/documents/prompts/assets. | Implemented | Reusable route resilience pattern. | No centralized telemetry/recovery workflow seen. |
| Database seed and environment scripts | Bootstrap example Workspace data and support database/environment operations. | Implemented operational tooling | Reusable for local/bootstrap use. | Not an artifact synchronization capability. |

## Implementation maturity summary

- **Preserve/reuse:** public and Workspace shells, Better Auth/Drizzle plumbing, status/category primitives, project-scoped data relations, derived snapshot, list/search/filter views, responsive behavior, and static knowledge registry presentation.
- **Prototype but valuable:** shared Workspace model, prompt library as an operational record, document hub, knowledge registry, and settings route.
- **Deprecated candidates:** none are evidenced by source comments or repository documentation. The current Knowledge Asset Registry intentionally limits scope; it is not marked deprecated.
- **Missing product capabilities:** user/project authorization, mutation completeness, auditability, repository artifact linking/sync, generalized Engineering Work records, and durable knowledge registry management.

## Engineering workflow assessment

### What exists only as documentation

The following engineering-work concepts are represented in repository Markdown rather than Workspace data/UI:

| Artifact family | Current authoritative/examples | Current Workspace representation |
| --- | --- | --- |
| Implementation packages and briefs | `docs/prompts/implementation-index.md`, prompt files, `FEATURE_DELIVERY_STANDARD.md`, `plan/docs/` records. | Prompt records can hold a summary but do not model repository packages or source paths. |
| Discovery and architecture investigations | `docs/discovery/`, `docs/spikes/`, AEF/framework records. | No persisted discovery/investigation entity. |
| Engineering Missions | `docs/missions/` contract, template, registry, record, completion report. | No Mission entity or Workspace instrument. |
| Governance, operating system, capability/blueprint standards | `docs/company/` canonical corpus. | Knowledge Registry exposes selected assets only. |
| Reviews, findings, quality/evidence | `docs/company/reviews/`, `docs/engineering/ENGINEERING_FINDINGS_LIFECYCLE.md`, QA standards. | Prompt verification is free text; no finding/evidence model. |
| Promotion candidates and promoted knowledge | Promotion process, Knowledge Base index/roadmap, review records, discovery records. | Static registry projects selected promoted assets; no candidate/queue/status persistence. |
| Planning and operational verification | `plan/docs/`, deployment/environment verification, release and QA checklists. | Project milestones and notes can record related information, but no source authority/sync link. |
| Hypothesis/innovation/future capability records | `docs/incubator/`, discovery documents, future architecture sections. | No dedicated model. |

### Candidate Engineering Work artifacts, based on existing vocabulary

Existing documentation establishes the candidate vocabulary: Mission, opportunity, package (implementation/discovery/scope/architecture), finding, verification, decision/ADR, release, promotion candidate, project, roadmap item, review, and knowledge asset. This is an inventory of documented concepts, not a new data model or design.
