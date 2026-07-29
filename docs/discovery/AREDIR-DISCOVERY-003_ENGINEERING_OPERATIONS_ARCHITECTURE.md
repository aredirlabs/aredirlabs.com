# AREDIR-DISCOVERY-003 — Engineering Operations Architecture

| Field | Value |
| --- | --- |
| **Work package** | AREDIR-DISCOVERY-003 |
| **Status** | Complete (architectural discovery) |
| **Date** | 2026-07-28 |
| **Package type** | Architectural Discovery — no implementation |
| **Writable repository** | `aredirlabs-com` only |
| **Subject** | Canonical operational architecture for Engineering Operations within Aredir Labs |
| **Working name** | Engineering Operations |

## Evidence classification used in this report

| Class | Meaning |
| --- | --- |
| **Confirmed** | Directly supported by Labs, Quality Systems, Bootstrap, or product artifacts consulted in this workspace |
| **Inferred** | Reasonable synthesis from multiple evidence points; not a single authoritative rule |
| **Unknown** | Material gap; state not established |
| **Externally Stated** | Stated in this package brief or stakeholder instruction; not independently proven as current practice |
| **Contradictory** | Sources conflict |

Do not treat design preference as **Confirmed**. This package does not authorize application, UI, schema, sync, automation, Bootstrap, AEF modification, AQSF/AVF modification, or product-repository change.

### Document placement

Requested path: `docs/discovery/AREDIR-DISCOVERY-003_ENGINEERING_OPERATIONS_ARCHITECTURE.md`.

**Placement accepted.** Discovery records that are not yet promoted methodology may live under `docs/discovery/` in the Labs reference repository. Canonical company standards remain under `docs/company/` ([Documentation Governance](../company/governance/DOCUMENTATION_GOVERNANCE.md)). Promotion of any conclusion from this discovery requires a later governed package — this document is discovery authority only.

---

## 1. Executive Summary

### Verdict

**Engineering Operations is a canonical Aredir architectural capability** deserving future implementation. It is **not** a project-management product. It is the **operational environment in which disciplined software engineering is performed** — the place where mission, artifacts, instruments, evidence, interpretation, and decisions surround the engineer.

Primary hypothesis:

> Engineering work should be represented as an operational workspace rather than a project-management system. Projects participate through governed contracts. Repositories remain authoritative. Engineering Operations provides operational visibility.

**Hypothesis evaluation: Accepted with refinement.**

| Claim | Result |
| --- | --- |
| Operational workspace, not PM system | **Accepted** — Confirmed by AREDIR-UX-001, AlignFit workspace lineage, ClassForge lesson-centric ops model, AQSF shared operational workspace + Publishing projection rules, and ClassForge Opportunity discovery rejecting ticket-tracker semantics |
| Projects participate via governed contracts | **Accepted** — Confirmed by Project Inheritance, Bootstrap sync direction, ClassForge Adopt/Extend/Deviate posture |
| Repositories remain authoritative | **Accepted** — Confirmed across EOS, AEF-001, AQSF “authority precedes projection,” ClassForge Opportunity ownership |
| Engineering Operations provides operational visibility | **Accepted** — as **projection and orientation**, not as a second system of record |

### Core answers (completion criteria)

| Question | Answer |
| --- | --- |
| What is Engineering Operations? | The company operational environment for performing AEF practice: mission-centered, artifact-governed, evidence-bearing, projection-based visibility across participating projects |
| What is its operational narrative? | Mission → Context → Portfolio → Current Delivery → Verification → Knowledge (with History always available) |
| What is the primary artifact? | **Engineering Mission** — the durable orientation object for current engineering intent |
| What instruments surround engineering work? | Mission focus, Opportunity Portfolio, Package Queue, Verification Queue, Architecture Health, Capability Map, Quality Findings, Knowledge Candidates, Promotion Queue, Release Readiness, Risk/Debt registers, Repository Health (as projections) |
| What belongs in repositories? | Authoritative project artifacts: Opportunities, packages, ADRs, verification evidence, local promotion ledgers, product architecture/scope |
| What belongs in Aredir? | Methodology (AEF/EOS), cross-project indexes/projections, promotion authority for company assets, Engineering Operations architecture and future platform |
| What is projected? | Cross-project and in-session operational views derived from authoritative repo artifacts |
| What remains authoritative? | Source repositories and authority repos (Labs, Quality Systems, Bootstrap packaging contracts) |
| Relation to Operational Workspace Architecture? | Engineering Operations **is** the intended reference implementation of that architecture applied to engineering itself |
| Relation to AEF? | Operational expression / integration layer over AEF — provisional future capability **C11** only after contract discovery; do not invent C11 in this package |
| Become an Aredir capability? | **Yes** |
| Follow-on packages? | See §20 |

### Proceed?

**Yes — to further architectural discovery and definition packages only.** Do **not** proceed to application UI, schemas, sync engines, or Bootstrap extraction on the strength of this document alone.

---

## 2. Background

Recent AEF work completed major methodological subsystems:

| Capability | Evidence |
| --- | --- |
| Engineering Operating System | [ENGINEERING_OPERATING_SYSTEM.md](../company/ENGINEERING_OPERATING_SYSTEM.md) |
| Capability Contracts | [AEF-001](../company/framework/AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md) |
| Documentation Governance | [DOCUMENTATION_GOVERNANCE.md](../company/governance/DOCUMENTATION_GOVERNANCE.md) |
| Bootstrap inheritance | [AEF-002](../company/framework/AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md), Bootstrap `SYNC.md` |
| AQSF / AVF | External authority `aredir-quality-systems` |
| Promotion workflow | [PROMOTION_PROCESS.md](../company/PROMOTION_PROCESS.md) |
| Implementation Packages | Feature Delivery Standard + product package practice |
| Opportunity Portfolio governance | ClassForge DISCOVERY-002 + OPPORTUNITY-001 seed register (**Confirmed** validation path) |

Separately, AlignFit demonstrated **Operational Workspaces** as product architecture: Fuel Lab, Body Workspace, Training Workspace, Operational Day — organizing around mission, primary artifact, instruments, evidence, interpretation, and decisions rather than CRUD navigation (**Externally Stated** in package brief; **Confirmed** pattern promotion via [AREDIR-UX-001](../company/architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md) and Workspace-First AI pattern; AlignFit product repo not present in this workspace for direct re-audit).

ClassForge formalized the same pattern for teaching prep: **Lesson Plan** as undisputed primary operational artifact (CLASSFORGE-ARCHITECTURE-001, consulted in workspace). Opportunity Portfolio then showed that **engineering work upstream of packages** also needs an operational model — portfolio views as projections, not boards (**Confirmed**).

AQSF independently describes capabilities operating over a **shared operational workspace**, with Publishing as **projection that never becomes ownership** (`aredir-quality-systems`: CAPABILITY-ARCHITECTURE-001, PUBLISHING-001, MISSION-ARCHITECTURE-001 — consulted read-only).

This discovery determines whether those observations constitute a reusable **Engineering Operations** architecture for Aredir Labs itself.

---

## 3. Current Engineering Lifecycle

Authoritative delivery spine (**Confirmed** — EOS + Feature Delivery Standard + AEF-001):

```text
Evaluate Idea
      ↓
Architecture Review / Audit (when required)
      ↓
Engineering Finding
      ↓
Engineering Work Package
      ↓
Implementation (optional Implementation Brief / Prompt)
      ↓
Verification & QA
      ↓
Documentation & Cross-Links
      ↓
Release & Production Validation
      ↓
Knowledge Capture
      ↓
Promotion (when reusable)
      ↓
Adoption across products
```

### What works today

| Strength | Evidence |
| --- | --- |
| Package-bound delivery is strong | Feature Delivery Standard; ClassForge/Labs package reports |
| Authority boundaries are clear | AEF-001; Bootstrap sync direction; QS outside AEF inventory |
| Evidence discipline exists | Evidence Lifecycle Pattern; AVF; AQSF findings |
| Experience architecture exists for products | AREDIR-UX-001 |
| Pre-package governance now exists in at least one product | ClassForge Opportunity Portfolio |

### What is thin or fragmented

| Gap | Evidence |
| --- | --- |
| “Idea” stage is thin in Feature Delivery | ClassForge DISCOVERY-002 **Confirmed** |
| No company-level operational environment for *performing* AEF | **Inferred** — methodology docs exist; surrounding instruments are scattered across repos, chat, and indexes |
| Cross-project visibility is manual | Project catalog / indexes; no governed projection model for engineering work |
| Operational Workspace Architecture is promoted for products, not yet applied to engineering practice itself | AREDIR-UX-001 origin = AlignFit products; AEF-000 lists “Operational Workspace / Project Memory” as partially product-specific |

Engineering Operations addresses the **environment gap**, not a missing ticket workflow.

---

## 4. Engineering Operations Problem Statement

### Wrong question

> How do we manage engineering work?

That question imports project-management ontology: tickets, boards, sprints, capacity, status theater.

### Right question

> What information, evidence, and instruments surround an engineer while performing engineering work?

### Problem

Aredir already has:

- methodology (AEF / EOS)
- quality methods (AQSF / AVF)
- inheritance packaging (Bootstrap)
- product operational workspaces (AlignFit lineage, ClassForge)
- project Opportunity portfolios (ClassForge validation)

What it lacks is a **canonical operational architecture** that places the engineer inside a coherent environment where:

1. current **Mission** is clear
2. **authoritative artifacts** remain in repositories
3. **instruments** project portfolio, delivery, verification, and knowledge without becoming systems of record
4. **decisions** attach to evidence
5. **projects participate** without ceding ownership to a central tracker

Without that architecture, future “engineering tools” risk recreating Jira with Aredir vocabulary — the opposite of Operational Workspace Architecture.

### Non-goals of this discovery

- Application, UI, mockups, React, APIs, schemas
- Synchronization or automation design
- Authentication / permissions implementation
- Bootstrap or AEF normative edits
- AQSF / AVF / ClassForge / AlignFit modifications

---

## 5. Operational Workspace Analysis

### 5.1 Shared properties across Aredir operational workspaces

| Property | AlignFit lineage (**Externally Stated** + UX-001) | ClassForge | AQSF operational workspace | Engineering Operations (proposed) |
| --- | --- | --- | --- | --- |
| Mission | Why this place exists | Prep / plan the lesson | Transform uncertainty → justified understanding | Orient current engineering intent |
| Primary artifact | e.g. Fuel Protocol (**Externally Stated**) | Lesson Plan (**Confirmed**) | Engagement knowledge domains (**Confirmed**) | Engineering Mission (**Inferred** recommendation) |
| Instruments | Lab/workspace tools | Planner, materials, library | Discovery, verification, assessment, publishing | Portfolio, package, verification, knowledge instruments |
| Evidence | Protocol adherence / measurements | Saved plans, generation accept | Evidence & confidence records | Package verification, findings, decisions |
| Interpretation | Coach / advisor assessments | Teacher judgment | Assessment / recommendations | Engineering judgment under AEF |
| Decisions | Adjust protocol / plan | Accept draft, organize library | Responsible action from assessment | Approve/defer/package/promote/release |
| Anti-pattern rejected | Chat-as-product; page collections | Ticket boards for teaching | Projection-as-authority | PM boards as engineering home |

### 5.2 Operational Workspace Architecture (company pattern)

**Confirmed** as an Aredir-wide experiential/architectural pattern via AREDIR-UX-001 six elements:

| Element | Question |
| --- | --- |
| Mission | Why am I here? |
| Environment | What mindset should I bring? |
| Primary Action | What should I do? |
| Supporting Context | What reinforces that action? |
| Navigation | Where next? |
| Identity | What kind of place is this? |

**Inferred elevation:** Operational Workspace Architecture is no longer AlignFit-only product UX. It is the reusable way Aredir organizes *work*. Engineering Operations applies it to engineering practice.

### 5.3 Hypothesis stress test

| Alternative | Why rejected as primary model |
| --- | --- |
| Issue tracker / backlog product | Conflicts with evidence-first package authority; ClassForge explicitly avoided |
| Dashboard of metrics | Metrics without mission scatter attention (UX-001) |
| Chat with the codebase | Workspace-First AI rejects chat-as-home |
| Pure documentation portal | Docs are instruments/context, not the operational center |
| Multi-repo admin console | Administration ≠ engineering operations |

**Conclusion:** Engineering Operations must be an **operational workspace**, not a management application.

---

## 6. Canonical Artifact Analysis

### 6.1 Artifact inventory

| Artifact | Ownership (authority) | Lifecycle home | Operational visibility | Projection? |
| --- | --- | --- | --- | --- |
| **Project** | Product repo + Labs project governance | Long-lived product identity | Context / participant | Index yes; not primary work object |
| **Capability** | Product (CAP-*) or AEF (C1–C10) / QS capabilities | Methodology or product architecture | Architecture Health / Capability Map | Yes |
| **Opportunity** | **Product repository** | Pre-package governance | Opportunity Portfolio | Views are projections |
| **Implementation Package** | Product or Labs repo of work | Delivery authority | Package Queue / Current Delivery | Status may be projected |
| **Discovery / Scope / Architecture Packages** | Owning repo | Pre-delivery / boundary packages | Portfolio + Architecture instruments | Yes |
| **ADR** | Owning repo | Decision record | Architecture Decisions instrument | Yes |
| **Quality Finding** | Engagement/repo evidence; **method** owned by QS | Assessment evidence | Quality Findings instrument | Finding body stays authoritative |
| **Verification Report / evidence** | Owning repo (+ QS method) | Verification | Verification Queue / Release Readiness | Summaries projected |
| **Knowledge Candidate** | Local ledger → Labs on promotion | Knowledge spine | Knowledge Candidates | Candidate local; promoted asset Labs |
| **Promotion Record** | Labs process; local ledgers allowed | Knowledge Framework (C7) | Promotion Queue | Yes |
| **Release** | Owning repo / deploy records | Delivery & Release (C9) | Release Readiness | Yes |
| **Engineering Mission** | **Governed orientation artifact** (see §6.3) | Operational focus | Mission instrument (primary) | May be projected across devices/sessions |

### 6.2 Relationship rules (normative intent for future definition)

```text
Quality Finding ──spawns──► Opportunity
Opportunity ──may package into──► Discovery / Scope / Architecture / Implementation Package(s)
Package ──produces──► Verification evidence
Package / Opportunity ──may nominate──► Knowledge Candidate
Knowledge Candidate ──may promote to──► Company Knowledge Base (Labs)
Engineering Mission ──orients──► one or more of the above without replacing them
```

| Rule | Rationale |
| --- | --- |
| Finding ≠ Opportunity | AQSF / ClassForge **Confirmed** |
| Opportunity ≠ Package | ClassForge **Confirmed** |
| Package ≠ Mission | Mission orients; package specifies (**Inferred**) |
| Roadmap ≠ lifecycle state | ClassForge: horizon is projection/attribute (**Confirmed**) |
| Projection ≠ ownership | AQSF Publishing / Mission Architecture (**Confirmed**) |

### 6.3 Primary artifact determination

Candidates evaluated:

| Candidate | Fit as primary | Failure mode |
| --- | --- | --- |
| Project | Too coarse | Recreates portfolio PM; loses “why am I here now?” |
| Capability | Structural, not operational focus | Architecture map ≠ current work |
| Opportunity | Excellent for pre-commitment | ClassForge correctly ended Opportunity at Packaged; cannot center all engineering |
| Implementation Package | Excellent for delivery authority | Excludes discovery/verification/ops missions; too narrow as *workspace* center |
| Mission (UX sense only) | Necessary but ephemeral if only a heading | Without durability, instruments float |
| **Engineering Mission** (artifact) | Best fit | Must not duplicate Opportunity or Package |

#### Definition (discovery conclusion)

**Engineering Mission** is the primary operational artifact of Engineering Operations.

It is a **durable, evidence-linked statement of current engineering intent** that answers: *What am I advancing right now, under what constraints, toward what proof?*

| Property | Value |
| --- | --- |
| Exists independently? | **Yes** — can be opened without creating a package |
| Equals Work Package? | **No** — a package may *serve* a Mission |
| Multiple packages per Mission? | **Yes** — phased delivery / discovery→impl sequences |
| Multiple Missions per package? | **No** as default — package has one delivery objective; Mission may narrow focus within it (**Inferred**) |
| Replaces Opportunity? | **No** — Opportunities feed Missions when approved/packaged or when investigation *is* the Mission |
| Types (non-exhaustive) | Delivery, Discovery, Architecture, Verification, Operational improvement, Knowledge promotion |

Mission candidates from the brief map as **Mission kinds**, not competing primary artifacts:

| Mission kind | Typical authoritative backing |
| --- | --- |
| Implementation package | Implementation Package |
| Architectural objective | Architecture Package / ADR work |
| Release objective | Release readiness + package set |
| Verification objective | Verification plan / AVF engagement artifacts |
| Operational improvement | Opportunity + hygiene/ops package |

**Primary Action** in the UX-001 sense attaches to the Mission (e.g., “complete acceptance criteria,” “validate Opportunity,” “close verification gaps”). Instruments surround Mission; they do not replace it.

---

## 7. Engineering Narrative

### Recommended narrative

```text
Mission
   ↓
Context
   ↓
Portfolio
   ↓
Current Delivery
   ↓
Verification
   ↓
Knowledge
```

**History** is not a stage; it is an always-available environmental layer (AQSF Engagement History analogy — **Inferred** parallel).

### Cognitive progression

| Stage | Purpose | Engineer’s question |
| --- | --- | --- |
| **Mission** | Orient intent | Why am I here, and what counts as progress? |
| **Context** | Load project, capability, constraints, authority boundaries | What world am I operating in? |
| **Portfolio** | See potential and approved work without commitment confusion | What exists, what’s decided, what’s ready? |
| **Current Delivery** | Enter package-bound execution | What am I building or changing now? |
| **Verification** | Establish justified confidence | What evidence supports done? |
| **Knowledge** | Capture reusable learning | What should compound beyond this Mission? |

### Rejected alternate as primary sequence

`Mission → Portfolio → Evaluation → Delivery → Verification → Promotion` is valuable as a **portfolio-heavy** path (ClassForge Opportunity views) but underspecifies **Context** and over-narrows Knowledge to Promotion. Promotion is a **Knowledge instrument outcome**, not the sole end of the narrative.

### Environmental layers (hierarchy)

```text
Identity (Engineering Operations)
  └── Mission (primary artifact)
        ├── Context (project participation, capabilities, constraints)
        ├── Portfolio instruments (Opportunities, horizons)
        ├── Delivery instruments (packages, ADRs in play)
        ├── Verification instruments (queues, findings, readiness)
        ├── Evidence / Interpretation (classes, assessments)
        ├── Knowledge instruments (candidates, promotion)
        └── History (prior missions, decisions, releases)
```

Information density rule (**Inferred** from UX-001 + ClassForge projections): **Mission and primary action dense; surrounding instruments progressive.** Equal-weight dashboards fail.

---

## 8. Operational Instrument Analysis

Instruments are **operational purposes**, not UI designs.

| Instrument | Operational purpose | Authoritative source | Notes |
| --- | --- | --- | --- |
| **Today’s / Active Mission** | Orient attention and success criteria | Mission artifact (+ linked package/Opportunity) | Primary |
| **Opportunity Portfolio** | Govern potential work without false commitment | Project Opportunity records | ClassForge **Confirmed** |
| **Package Queue** | Show delivery-ready and in-flight packages | Package indexes / package docs | |
| **Verification Queue** | Show what must be proven next | Package verification plans + evidence | Methods from QS |
| **Architecture Health** | Surface boundary/ADR/audit posture | Architecture packages, ADRs, audits | |
| **Capability Map** | Anchor ownership and impact | Product CAP maps; AEF/QS capability inventories | |
| **Dependency Graph** | Honest sequencing | Opportunity/package dependency links | |
| **Quality Findings** | Communicate observed conditions | Finding records; QS schema/methods | Do not auto-commit delivery |
| **Knowledge Candidates** | Track learnings awaiting promotion | Local ledgers | |
| **Promotion Queue** | Company IP advancement | Labs Promotion Process + local candidates | |
| **Release Readiness** | Gate production confidence | Release checklists + verification summaries | |
| **Risk Register** | Retain accepted/deferred risk | Risk records / Deferred Opportunities | |
| **Technical Debt** | Make debt visible as Opportunities or linked notes | Prefer Opportunity kind `technical_debt` | Avoid separate shadow backlog |
| **Architecture Decisions** | Keep ADRs in operational reach | ADR set in repo | |
| **Repository Health** | Signal clone/CI/docs/blueprint posture | Repo evidence | Projection only |
| **Git Activity** | Situational awareness of change | Git history | Supporting context — never authority for scope |

### Instrument principles

1. Every instrument must answer a Mission-relevant question or be removed.
2. Instruments **project**; they do not fork authority.
3. Portfolio instruments must preserve Capture ≠ Approve ≠ Package.
4. Verification instruments must preserve evidence classes (Confirmed/Inferred/Unknown/…).
5. Git/activity instruments are **context**, not work definition.

---

## 9. Workspace Model

### Options

| Model | Description |
| --- | --- |
| **A. One integrated Engineering Operations Workspace** | Single place with environmental layers and instruments |
| **B. Multiple sibling workspaces** | Portfolio / Delivery / Architecture / Verification / Knowledge as separate homes |

### Evaluation

| Criterion | A — Integrated | B — Multiple |
| --- | --- | --- |
| Matches UX-001 “place with mission” | Strong if Mission is center | Risk of page-collection fragmentation |
| Matches ClassForge portfolio projections | Strong — views as projections | Temptation to make each view a product |
| Matches AQSF shared operational workspace | Strong parallel | Weaker |
| Cognitive load | Requires progressive disclosure | Requires navigation taxonomy |
| Implementation risk | Can overgrow | Can recreate PM modules |

### Recommendation

**One integrated Engineering Operations Workspace** with **projection views** (Portfolio, Delivery, Verification, Knowledge, Architecture) — not separate workspace products.

Sibling product workspaces (Fuel Lab, Lesson Planner) remain **product** operational workspaces. Engineering Operations is the **company engineering** workspace. They share architecture, not screens.

Optional future: deep-focus “Delivery Chamber” or “Verification Chamber” as **modes** of the same workspace — deferred until Mission model is proven.

---

## 10. Repository Authority Model

### Authority map

| Concern | Authoritative home | Engineering Operations role |
| --- | --- | --- |
| Methodology (AEF/EOS/standards) | `aredirlabs-com` | Consumes; may project indexes |
| Quality methods (AQSF/AVF) | `aredir-quality-systems` | Consumes methods; projects finding/verification summaries from engagements |
| Bootstrap packaging | `aredir-project-bootstrap` | Does not own methodology; sync distribution only |
| Opportunities | **Product repositories** | Project portfolio views |
| Packages (impl/discovery/scope/arch) | **Owning repositories** | Project package queue / mission links |
| Verification evidence | **Owning repositories** | Project verification posture |
| Verification methodology | Quality Systems | Reference, not duplicate |
| Promoted knowledge assets | Labs Knowledge Base | Promotion Queue / Knowledge instruments |
| Local promotion candidates | Product repos | Project candidates |
| Cross-project engineering projections | **Labs (future Engineering Operations)** | Own *projections and indexes*, not artifact bodies |
| Engineering Mission records (future) | **TBD** — see Open Questions | Prefer repo-local Mission files with optional Labs cross-project index |

### Direct answers

| Question | Answer |
| --- | --- |
| Where do Opportunities live? | Product repositories (**Confirmed** ClassForge) |
| Where do Packages live? | Owning repositories (**Confirmed**) |
| Where does verification live? | Evidence in owning repos; methods in Quality Systems (**Confirmed**) |
| Where are projections generated? | Conceptually in Engineering Operations (Labs-owned capability); generation mechanism **Unknown** / deferred |
| How are repositories indexed? | Today: manual catalogs/indexes; future indexing model requires follow-on discovery |
| Can Aredir own projections without owning artifacts? | **Yes** — required invariant (AQSF Publishing principle; Bootstrap sync analogy) |

### Boundary slogan

> Repositories remain authoritative. Engineering Operations remains aware.

---

## 11. Projection Architecture

### Canonical pattern

```text
Project / Authority Repository
        ↓
Governed Artifacts (Mission links, Opportunities, Packages, Findings, Evidence, ADRs, …)
        ↓
Engineering Operations Projection
        ↓
Operational Workspace (Mission-centered instruments + views)
```

### What becomes visible

- Active Mission and linked artifacts
- Portfolio / roadmap horizons
- Package and verification queues
- Cross-project participation summaries
- Knowledge and promotion candidates
- Architecture/capability posture summaries

### What remains authoritative

- Artifact bodies in source repos
- Methodology in Labs
- Quality methods in QS
- Bootstrap pack contracts in Bootstrap

### Synchronization models (conceptual only — no design)

| Model | Description | Fit |
| --- | --- | --- |
| **Repository-first manual** | Humans maintain Markdown; Ops reads/cites paths | MVP validation path (**Confirmed** useful via ClassForge) |
| **Indexed projection** | Read-only index over known paths/IDs | Likely first platform step |
| **Event/git-derived projection** | Derive status from commits/CI | Supporting context only |
| **Bidirectional sync** | Write-back from Ops into repos | High risk; defer; violates authority-first unless explicitly governed |

**Repository-first remains the default.** Projection over duplication is a surviving principle.

### AQSF alignment

AQSF Mission Architecture: **Authority precedes projection.** Publishing owns publication projections only. Engineering Operations should adopt the same invariant for engineering artifacts.

---

## 12. Operational Principles

Principles that survive architectural scrutiny:

| Principle | Status | Source / rationale |
| --- | --- | --- |
| **Evidence before action** | Retain | EOS; AVF/AQSF; Feature Delivery |
| **Mission before management** | Retain | UX-001; this discovery |
| **Artifacts before navigation** | Retain | Operational workspace pattern; ClassForge lesson-centric model |
| **Projection over duplication** | Retain | AQSF Publishing; ClassForge portfolio views |
| **Repositories remain authoritative** | Retain | AEF; Bootstrap; ClassForge boundaries |
| **Operational awareness over administrative workflow** | Retain | Core hypothesis accepted |
| **Knowledge is produced** | Retain | EOS knowledge capture; C7 |
| **Verification drives confidence** | Retain | C5; AVF; AQSF journey |
| **Understanding precedes recommendation** | Retain | AQSF Mission Architecture |
| **Capture ≠ Approve ≠ Package** | Retain | ClassForge Opportunity model |
| **Findings do not auto-create delivery commitment** | Retain | AQSF + ClassForge |
| **Chat is an instrument, not the home** | Retain | Workspace-First AI |

Principles that fail if over-applied:

| Temptation | Failure |
| --- | --- |
| “Everything is a Mission” | Dilutes primary artifact; use Opportunity for potential work |
| “Everything is an Opportunity” | Overextends portfolio into delivery (already rejected) |
| “Centralize all artifacts in Labs” | Breaks product ownership and Bootstrap direction |
| “Boards equal operations” | Returns to PM theater |

---

## 13. Relationship to Existing AEF

```text
AEF (methodology boundary)
├── C1–C10 capabilities (how engineering is defined and governed)
└── Engineering Operations (how engineering is performed environmentally)
        └── consumes AEF + QS + Bootstrap + product artifacts via projection
```

| Relationship | Conclusion |
| --- | --- |
| New capability vs integration layer | **Both, sequenced:** first an **architectural integration / operational expression layer**; later a possible **AEF C11 Engineering Operations** contract if ownership cannot live under C9+C10 without distortion |
| ClassForge Opportunity vs this | Opportunity Portfolio extends **C9** pre-package governance (**Confirmed** ClassForge recommendation). Engineering Operations is broader than Opportunity |
| C10 Design & Experience | Supplies Workspace Experience Architecture that Engineering Operations must obey |
| C1 EOS | Supplies lifecycle Engineering Operations narrates operationally |
| C5 / QS | Supplies verification/finding methods; Ops does not absorb QS |
| C7 Knowledge | Supplies promotion; Ops surfaces candidates |
| C8 Bootstrap | Supplies inheritance; Ops must not become competing distribution authority |

**Do not modify AEF documents in this package.** Record only: Engineering Operations is in scope for a future AEF series discovery/contract if validation warrants C11.

---

## 14. Relationship to Product Workspaces

### Shared architectural properties

| Property | Shared? |
| --- | --- |
| Mission-centered place | Yes |
| Primary durable artifact | Yes (domain-specific) |
| Instruments surround artifact | Yes |
| Evidence → interpretation → decision | Yes |
| Projection views over one model | Yes (ClassForge portfolio; AQSF publishing) |
| Anti-CRUD / anti-ticket default | Yes |

### Shared narrative pattern

Product workspaces and Engineering Operations both follow:

```text
Enter with purpose → Orient in environment → Act on primary artifact →
Consult instruments → Decide with evidence → Move to next meaningful place
```

### Conclusion

**Operational Workspace Architecture is an Aredir-wide architectural pattern.**  
Engineering Operations should become its **reference implementation in the engineering domain** — proving the pattern not only in products (AlignFit, ClassForge) but in how Aredir builds products.

This is recursive on purpose: the company that builds operational workspaces should operate inside one.

---

## 15. Existing Tool Comparison

Conceptual comparison only — not vendor evaluation.

| Concept (industry tools) | Disposition in Engineering Operations |
| --- | --- |
| Issue / ticket | **Disappears as primary object** — replaced by Opportunity + Package + Mission roles |
| Issue types (Bug/Story/Epic) | **Adapt** → Kind/Origin dimensions (ClassForge); Epic/theme deferred |
| Backlog | **Adapt** → Portfolio projection |
| Board / sprint board | **Conflicts** if treated as system of record; optional later view only |
| Workflow engines | **Adapt lightly** — evidence-gated transitions, not heavy custom workflows |
| Priority field | **Conflicts** if singular — split importance/urgency/readiness/horizon |
| Dependencies | **Retain** as first-class links |
| Releases | **Retain** as readiness instrument / records |
| Components / labels | **Adapt** → capabilities and secondary tags |
| Time estimates / points / capacity | **Defer / mostly disappear** from governance core |
| Automation rules | **Defer** — premature before model maturity |
| Audit history | **Adapt** → decision logs and engagement history |
| GitHub Projects / Linear / Jira / Azure DevOps / Shortcut / Trello | Useful as **inspiration for projections**; dangerous as **authority hosts** |

Valuable retained concepts: dependencies, explicit transitions, release association, decision auditability.  
Projected concepts: backlog, roadmap, queues.  
Conflicting concepts: sprint theater, points-as-truth, board-as-home.  
Disappear: ticket as canonical engineering object.

---

## 16. Risks

| Risk | Class | Mitigation |
| --- | --- | --- |
| Engineering Operations becomes Jira with better nouns | Inferred | Keep repository authority + Mission/Opportunity/Package separation sacred |
| Mission duplicates Opportunity or Package | Inferred | Definition package must freeze boundaries with examples |
| Labs centralization of product artifacts | Inferred | Projections only; write-back forbidden by default |
| Over-instrumentation / dashboard clutter | Inferred | UX-001 progressive disclosure; Mission-first density |
| Premature platform build before Markdown validation | Confirmed pattern risk | Follow ClassForge: docs hybrid before software |
| Conflict with thin Feature Delivery “Idea” vocabulary | Confirmed overlap | Opportunity owns durable idea portfolio; Mission owns current orientation |
| QS vs Labs projection ownership confusion | Inferred | QS owns methods; engagement evidence stays with engagement/repo; Ops projects |
| Cross-project indexing privacy/security | Unknown | Permissions discovery required before multi-project projections |
| Naming collision (“Mission” vs AQSF Mission Architecture) | Confirmed vocabulary overlap | Qualify as **Engineering Mission**; AQSF mission remains framework purpose |

---

## 17. Open Questions

| # | Question | Status |
| --- | --- | --- |
| Q1 | Exact persistence home for Engineering Mission (per-repo Markdown vs Labs index vs both)? | Unknown — needs definition package |
| Q2 | Should multi-project Mission ever span repositories in v1? | Unknown — default **no** for MVP |
| Q3 | When does Opportunity Portfolio promote from ClassForge validation into AEF C9 normative text? | Unknown — after sustained use evidence |
| Q4 | Is C11 required, or do C9+C10+integration docs suffice permanently? | Unknown — revisit after Mission definition + first Ops MVP |
| Q5 | Repository indexing approach (manifest files, git scrape, CI metadata)? | Unknown — projection architecture follow-on |
| Q6 | Offline / air-gapped operation expectations? | Unknown — defer |
| Q7 | Agent participation model inside Engineering Operations (advisor vs actor)? | Partially known via AI patterns; Ops-specific contract Unknown |
| Q8 | AlignFit Fuel Lab / Operational Day primary-artifact inventory for formal pattern appendix? | Externally Stated — optional evidence package if AlignFit repo available |
| Q9 | Permissions and audience model for cross-project projections? | Unknown |
| Q10 | Activity model: is git activity an instrument or merely debug context? | Inferred supporting context; confirm in definition |

---

## 18. MVP Recommendation

### Capability MVP (architecture → documentation hybrid)

**Form factor:** repository-first Markdown + indexes + explicit Mission template — **not** an application.

Smallest useful proof:

1. **Engineering Mission** definition + template (Labs discovery/definition docs)
2. Boundary examples: Mission vs Opportunity vs Package vs Finding
3. Instrument inventory frozen as operational purposes (this document §8)
4. Projection rules: authority precedes projection
5. One Labs self-Mission and one ClassForge-linked Mission example (documentation only; no ClassForge file modifications in *this* package)
6. Narrative and workspace model accepted as company discovery conclusions

### Explicitly out of MVP

- UI / boards / React
- APIs / databases / sync engines
- GitHub/Jira integrations
- Automatic package generation
- Multi-project live indexing platform
- Permissions systems
- Bootstrap extraction of Ops assets
- AEF normative C11 insertion

### Success criteria for MVP discovery/definition phase

- Engineers can state Mission without opening a tracker
- Opportunities and packages remain authoritative in repos
- Instruments are explainable without mockups
- No authority boundary regressions vs AEF / QS / Bootstrap

---

## 19. Deferred Architecture

| Deferred topic | Why deferred |
| --- | --- |
| Application architecture | Requires Mission + projection contracts first |
| Synchronization / write-back | Authority risk |
| Permissions / authn/z | Multi-project projection prerequisite |
| Repository indexing engine | Mechanism unknown |
| Git integration productization | Supporting context only until needed |
| Package generation automation | Premature; readiness gates first |
| Knowledge synchronization automation | C7 process exists; tooling later |
| Activity / audit product model | Decision logs sufficient initially |
| Offline model | No evidence of requirement yet |
| Multi-workspace product split | Integrated workspace preferred |
| Numeric prioritization / capacity planning | Conflicts with Aredir evaluation culture |
| External PM tool federation | Projection-only later, if ever |

---

## 20. Future Implementation Strategy

Phased, evidence-gated:

```text
Phase 0  Architectural discovery (this package)                    ← complete
Phase 1  Mission + boundaries definition (docs)
Phase 2  AEF relationship decision (C9 extension vs C11 contract)
Phase 3  Operational Workspace Architecture formalization appendix
         (company pattern claim with multi-product evidence)
Phase 4  Markdown operating rhythm in Labs (+ adopt in products)
Phase 5  Read-only projection spike (index only)
Phase 6  Narrow Ops workspace application (if Phase 4–5 prove need)
Phase 7  Cross-project projections under permissions model
```

No phase authorizes skipping repository authority.

---

## 21. Recommended Follow-on Packages

| Order | Package | Type | Purpose |
| --- | --- | --- | --- |
| 1 | **AREDIR-DISCOVERY-004** — Engineering Mission Artifact Definition | Discovery / Definition | Freeze Mission schema, lifecycle, cardinality with Opportunity/Package/Finding; resolve Q1–Q2 |
| 2 | **AREDIR-DISCOVERY-005** — Engineering Operations Projection Contract | Discovery | What may be projected, freshness expectations, anti-ownership rules; indexing options without implementing |
| 3 | **AREDIR-ARCH-00x** — Operational Workspace Architecture Company Formalization | Architecture | Elevate pattern beyond UX-001 product lens; cite AlignFit + ClassForge + Engineering Operations |
| 4 | **AREDIR-OPS-001** — Engineering Operations Markdown Operating Model | Definition | Templates, indexes, rhythm in Labs; no app |
| 5 | Later **AEF-00x** — Engineering Operations Capability Contract | Framework | Only if C11 (or C9/C10 split) is justified by evidence |
| 6 | Later **AREDIR-OPS-010** — Read-only projection spike | Spike | Index-only technical probe |
| — | Not next | Application UI / sync / Bootstrap packaging of Ops | Explicitly deferred |

**Primary next package:** `AREDIR-DISCOVERY-004` (Engineering Mission Artifact Definition).

Parallel (owned elsewhere, not blocked by this package): continue ClassForge Opportunity validation through real package linkage (`CLASSFORGE-LESSON-001`); promote Opportunity rules to AEF only after evidence.

---

## 22. Authority Confirmation

| Repository | Role this package | Modified? |
| --- | --- | --- |
| `aredirlabs-com` | Writable methodology / discovery authority | **Yes** — this discovery document only |
| `aredir-quality-systems` | Quality authority (read-only consult) | **No** |
| `aredir-project-bootstrap` | Bootstrap authority (read-only consult) | **No** |
| `classforge` | Product reference (read-only consult) | **No** |
| AlignFit / other products | Reference only (AlignFit not in workspace) | **No** |

### Constraints honored

No UI, mockups, React, APIs, schemas, automation, synchronization, Bootstrap assets, AEF modifications, AQSF/AVF modifications, or product-repo changes were produced.

---

## 23. Final Git Status

Verified at package completion:

```text
aredirlabs-com
  Branch: main...origin/main
  Untracked:
    docs/discovery/
      AREDIR-DISCOVERY-003_ENGINEERING_OPERATIONS_ARCHITECTURE.md

aredir-quality-systems     clean (unmodified)
aredir-project-bootstrap   clean (unmodified)
classforge                 clean for this package (unmodified; no discovery edits)
```

No commit was created (not requested).

---

## Appendix A — Completion Criteria Checklist

| Criterion | Satisfied in |
| --- | --- |
| What is Engineering Operations? | §1, §4 |
| Operational narrative? | §7 |
| Primary artifact? | §6.3 |
| Surrounding instruments? | §8 |
| Repo vs Aredir ownership? | §10 |
| Projected vs authoritative? | §10–§11 |
| Relation to Operational Workspace Architecture? | §5, §14 |
| Relation to AEF? | §13 |
| Become an Aredir capability? | §1 — **Yes** |
| Follow-on implementation packages? | §21 |
| Can Ops be reference implementation of Operational Workspace Architecture? | §1, §14 — **Yes** |

---

## Appendix B — Consulted authorities (read-only)

| Authority | Artifacts consulted |
| --- | --- |
| Labs | EOS, AEF-000/001/002, Feature Delivery Standard, AREDIR-UX-001, Workspace-First AI, Documentation Governance, Promotion Process |
| Quality Systems | MISSION-ARCHITECTURE-001, CAPABILITY-ARCHITECTURE-001, PUBLISHING-001 (and framework context) |
| Bootstrap | SYNC.md authority direction |
| ClassForge | DISCOVERY-002, OPPORTUNITY-PORTFOLIO, ARCHITECTURE-001 operational model |

---

*End of AREDIR-DISCOVERY-003.*
