# Repository Boundary Assessment

## Governing current-state principle

The existing documentation is explicit: repositories remain authoritative; a future Engineering Operations capability may own projections and indexes, not governed artifact bodies. `docs/company/REFERENCE_REPOSITORY_SPECIFICATION.md` identifies `docs/company/` as authoritative company methodology and `docs/discovery/AREDIR-DISCOVERY-003_ENGINEERING_OPERATIONS_ARCHITECTURE.md` defines repository-first/manual reference as the MVP validation path.

The existing authenticated application already demonstrates two compatible patterns:

1. Database-backed shared operational records for projects, milestones, notes, documents, and prompts.
2. A read-only, code-backed projection of selected repository knowledge assets.

## Repository documentation inventory and classification

The table inventories the 119 Markdown files present under `docs/` and `plan/docs/` at assessment time by their existing location and function, and separately notes the root repository documents that establish the same boundary.

| Location / count | Primary classification | Boundary assessment |
| --- | --- | --- |
| `README.md` (1) | Platform / repository-required | Keep in repository as identity, workflow, and document map. |
| `docs/company/` root (10) | Platform / Architecture / repository-required | Canonical EOS, capability, blueprint, reference-repository, knowledge, promotion, and inheritance authorities. Keep authoritative in repository. |
| `docs/company/framework/` (5) | Architecture / Platform / repository-required | AEF and Capability Distribution authority. Keep in repository. |
| `docs/company/governance/` (9) | Platform / Operational / repository-required | Governance authorities and maturity model. Keep in repository. |
| `docs/company/architecture-patterns/` (3), `ai-patterns/` (5), `knowledge-patterns/` (1), `qa-standards/` (2), `engineering-standards/` (1), `documentation-standards/` (2), `playbooks/` (1), `knowledge/` (1) | Architecture / Platform / repository-required; promotion candidates or promoted assets as identified by their governance | Keep canonical texts in repository. Selected promoted assets are already candidates for read-only registry projection. |
| `docs/company/brand/` (5) | Platform / Architecture | Keep in repository as canonical brand authority. |
| `docs/company/reviews/` (13) | Operational / historical archive / promotion evidence | Keep in repository. Future operational views may reference review status/metadata, not replace records. |
| `docs/architecture/` (6) | Architecture / implementation guidance | Keep in repository; potential indexed references for an operational environment. |
| `docs/engineering/` (6) | Operational / implementation | Keep in repository as executable-team standards and workflow guidance. |
| `docs/agent/` (3) | Operational / temporary-or-template depending on use | Keep in repository; templates may be referenced/project-attached but are not Workspace records today. |
| `docs/product/` (3), `docs/brand/` (3) | Implementation / product-local | Keep in repository for this application. Not company-wide operational source by default. |
| `docs/qa/` (3), `docs/bugs/` (3), `docs/standards/` (1) | Operational / implementation | Keep in repository; possible future views can project checklist/issue posture only. |
| `docs/prompts/` (4) | Implementation packages / temporary operational artifacts | Keep in repository as the documented prompt/brief index and historical inputs. Candidate references for Engineering Work projection. |
| `plan/docs/` (8) | Verification and milestone records / historical operational artifacts | Keep in repository. Candidates for repository-referenced status projection; do not move or overwrite. |
| `docs/discovery/` (10), `docs/spikes/` (1), `AEF-DISCOVERY-003.md` (1) | Architecture investigations / historical evidence / promotion candidates | Keep in repository. Their identifiers, outcome/status, and citations are potential projection metadata. |
| `docs/missions/` (6 including `records/`) | Operational / governed artifact authority | Keep in repository. This is the strongest existing candidate source for a Mission-centered read-only operational projection. |
| `docs/workspace/` (2) | Implementation / repository-required for this Workspace | Keep in repository as implementation records for the current app. |
| `docs/incubator/` (1) | Temporary future-capability / hypothesis/innovation record | Keep as historical/future-design record; could later be projected as an incubator item but is not a current application feature. |
| `docs/releases/` (1) | Operational / historical archive | Keep as repository release evidence. |

## Boundary classification by artifact behavior

| Boundary class | Existing material | Appropriate current boundary |
| --- | --- | --- |
| Should remain inside repository | Canonical EOS/AEF/governance/KB, implementation docs, source code, plans, Mission records, discovery/spikes, QA/bug/release evidence. | Markdown/repository remains source of truth. |
| Could become Engineering Operating Environment capability | Cross-project project portfolio, Mission registry/read posture, package queue, verification/finding summaries, promotion candidates, knowledge asset indexes, architecture/capability posture. | Read-only projection/index over repository references and identifiers. |
| Requires future synchronization | Static Knowledge Asset Registry entries, seeded project documents/prompts that summarize repository work, any cross-repository indexes. | No synchronization exists today; current state is manual/deployment-coupled. |
| Historical archive | Completion reports, reviews, discovery results, spikes, plan verification records, releases. | Preserve immutable/traceable repository history; at most summarize/project. |
| Temporary operational artifact | Prompt briefs, guarded prompts, verification records, work-package materials, incubator explorations. | Keep adjacent to the work in repository; eligible for referencing based on lifecycle/authority. |

## Existing documentation and application mapping

| Repository concept | Existing application analogue | Boundary conclusion |
| --- | --- | --- |
| Project | `workspace_projects` and project registry. | Database-backed operational representation already exists. |
| Milestone / progress posture | `workspace_project_milestones` and dashboard snapshot. | Database-backed projection exists, but not repository-synchronized. |
| Document | `workspace_project_documents` and Documents hub. | Separate internal copy, not repository document authority. |
| Prompt / implementation record | `workspace_project_prompts` and Prompts hub. | Useful working log, not a repository work-package model. |
| Promoted knowledge asset | `src/lib/knowledge-assets/registry.ts` and Workspace views. | Read-only static projection; source documents remain repository authority. |
| Mission / package / finding / verification / promotion candidate | Markdown sources only. | Natural candidates for future read-only operational projections; no implementation exists. |

## Engineering Workflow assessment conclusion

Engineering workflow is currently repository-first and document-governed. The Workspace contains project memory and manually created operational records, but it does not yet function as the authority for Engineering Work artifacts and should not be interpreted as replacing the documented repository contracts.

The smallest evidenced fit for an Engineering Operating Environment is a single read-only, repository-referenced view of an existing governed artifact family. Existing Mission documents are the most mature candidate because they already have a contract, template, registry, record, completion report, and explicit operational-workspace information contract. This statement establishes fit and evidence only; it does not design, prioritize, or authorize a new capability.

## No changes implied

This assessment does not recommend relocating the listed documents, changing their terminology, migrating their contents into the database, or establishing a synchronization mechanism. Those decisions remain outside this assessment’s scope.
