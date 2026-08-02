# AREDIR-DISCOVERY-006 — Capability Distribution Architecture

| Field | Value |
| --- | --- |
| **Work package** | AREDIR-DISCOVERY-006 |
| **Status** | Complete (architectural discovery) |
| **Date** | 2026-08-02 |
| **Package type** | Architectural Discovery — no implementation |
| **Writable repository** | `aredirlabs-com` only |
| **Subject** | Architectural model governing how Aredir-owned capabilities are distributed, executed, referenced, inherited, promoted, and evolved across repositories |
| **Prior authority** | [AREDIR-DISCOVERY-001](./AREDIR-DISCOVERY-001_AEF_ARCHITECTURE_RECONSTRUCTION.md) through [AREDIR-DISCOVERY-005](./AREDIR-DISCOVERY-005_CLIENT_ASSESSMENT_CAPABILITY_DISTRIBUTION_BOUNDARY.md); AEF-000…002; Bootstrap; Mission Contract; Promotion Process |
| **Relationship to Discovery-005** | Generalizes Discovery-005: assessment is one instance of capability distribution, not the foundational case |
| **Follow-on decision** | Classified by [AREDIR-CLASSIFICATION-007](./AREDIR-CLASSIFICATION-007_CAPABILITY_DISTRIBUTION_AUTHORITY_CLASSIFICATION.md); materialized as [Capability Distribution Architecture](../company/framework/CAPABILITY_DISTRIBUTION_ARCHITECTURE.md) (AREDIR-ARCHITECTURE-007) |

## Why this, instead of continuing Discovery-005?

Discovery-005 asked how an **assessment** capability crosses into a client repository. That question is valuable and its layered boundary remains valid. Evidence from ClassForge adoption, Bootstrap packaging, Quality Systems architecture, Mission artifact definition, AEF reconstruction, and assessment integration now supports a more general question:

> How does **any** Aredir-owned capability cross repository boundaries?

Assessment becomes one example—not the foundation. Findings here apply equally to Bootstrap packaging, QA standards, documentation standards, architecture standards, Mission templates, assessment runtime, AI prompts, and future reusable capabilities.

## Evidence classification used in this report

| Class | Meaning |
| --- | --- |
| **Confirmed** | Directly supported by Labs, Quality Systems, Bootstrap, or product artifacts consulted in this workspace |
| **Inferred** | Reasonable synthesis from multiple evidence points; not a single authoritative rule |
| **Externally Stated** | Named in briefs or sibling artifacts but not fully re-auditable as a complete corpus in this workspace |
| **Unresolved** | Material gap left open deliberately |

Do not treat design preference as **Confirmed**. This package does not authorize tooling, AEF redesign, Bootstrap modification, Mission redesign, C11 assignment, synchronization technology, automation, or Git workflow prescription.

### Document placement

Path: `docs/discovery/AREDIR-DISCOVERY-006_CAPABILITY_DISTRIBUTION_ARCHITECTURE.md`.

**Placement accepted.** Discovery records that are not yet promoted methodology may live under `docs/discovery/` ([Documentation Governance](../company/governance/DOCUMENTATION_GOVERNANCE.md)). Promotion of any conclusion requires a later governed package.

---

## 1. Problem Statement

### What architectural problem is Capability Distribution solving?

Aredir already owns methodological capabilities (AEF C1–C10), quality capabilities (AQSF/AVF), packaging/distribution contracts (Bootstrap / C8), operational orientation artifacts (Engineering Mission), and assessment methods that may execute inside product or client repositories. Those capabilities must appear in multiple repositories without collapsing distinct concerns into “wherever the files sit.”

The architectural problem is:

> How can Aredir-owned capabilities cross repository boundaries while preserving ownership, authority, provenance, versioning, upgradeability, and client/product independence?

Without an explicit distribution architecture, evidence shows recurring conflations:

| Conflation | Evidence |
| --- | --- |
| Location = ownership | Discovery-005: repository location alone does not determine ownership (**Confirmed**) |
| Sync copy = fork of authority | Inheritance + AEF-002: products sync/reference; never fork ownership (**Confirmed**) |
| Packaging = methodology ownership | Bootstrap is packaging/distribution only (**Confirmed** — AEF-002, SYNC.md, ClassForge FRAMEWORK-SYNC-001) |
| Projection = system of record | AQSF Publishing + Discovery-003: authority precedes projection (**Confirmed**) |
| Execution = ownership transfer | Discovery-005: execution in client repo is operational use, not ownership transfer (**Confirmed**) |
| Engagement evidence = company IP | Promotion Process + Discovery-005: only generalized, reviewed learning returns (**Confirmed**) |

### Separated concerns

| Concern | Meaning in evidence | Distinct from |
| --- | --- | --- |
| **Ownership** | Who may change the governing definition; canonical home (**Confirmed** — AEF-001 “Owns,” Documentation Governance tiers, AQSF information ownership) | Mere presence in a repo; consumption; projection |
| **Execution** | Where a capability is applied or run (product repo, engagement, Ops workspace) (**Confirmed** — Discovery-005 Layer 3; ClassForge assessment in product repo) | Ownership; authority of methodology |
| **Installation** | How assets are placed into a consuming repository for use (copy, sync, adopt, temporary activate) (**Confirmed** — Bootstrap ADOPTION_GUIDE; Discovery-005 install/activate; ClassForge FOUNDATION-001 copy of B01–B03) | Ownership transfer; promotion |
| **Authority** | Which repository/domain is the source of truth for a class of decisions (**Confirmed** — LABS-PROMOTION-001 ownership table; ClassForge assessment Authority Map; Mission Contract “one authoritative home”) | Local working copies; indexes; publications |
| **Delivery** | How outcomes reach consumers (client deliverables, product docs, published projections, adopted standards) (**Confirmed** — Discovery-005 deliverable boundary; AQSF Publishing; Promotion → Adoption) | Installation of methodology; ownership of methods |

### Canonical one-liner

> **Capability Distribution** is the architectural model that separates ownership, authority, installation, execution, delivery, and feedback so Aredir-owned capabilities can cross repository boundaries without transferring authority by location alone.

---

## 2. Repository Roles

Evidence supports a multi-repository authority model rather than a single template that owns everything.

### 2.1 Company Framework Repository

| Field | Value |
| --- | --- |
| **Exemplar** | `aredirlabs-com` |
| **Purpose** | Canonical methodology authority: AEF, EOS, governance, Knowledge Base, Architecture Audit, promotion acceptance (**Confirmed** — AEF-000, AEF-002, LABS-PROMOTION-001, Reference Repository Specification) |
| **Authority** | Sole methodology authority for company engineering practice; also Platform v1.0 reference implementation (**Confirmed**) |
| **Expected contents** | `docs/company/` (authoritative); AEF series; reviews; promoted standards/patterns/playbooks; operational templates that later extract to Bootstrap; Labs product surfaces (**Confirmed** — Reference Repository Spec, AEF-002 inventory) |
| **Lifecycle** | Evolves via AEF series, EOS reviews, Promotion Process, quarterly KB review; distributes outward via sync/bootstrap; consumes promotion candidates inward (**Confirmed** — Inheritance knowledge feedback loop) |

### 2.2 Bootstrap Repository

| Field | Value |
| --- | --- |
| **Exemplar** | `aredir-project-bootstrap` |
| **Purpose** | Packaging and inheritance distribution — not new owner of methodology (**Confirmed** — AEF-002 §1, SYNC.md) |
| **Authority** | Owns bootstrap-owned scaffolds/templates (`include-owned`); distributes Labs assets as `include-as-sync` without ownership transfer; references Quality Systems without packaging AQSF bodies (**Confirmed** — SYNC.md, ADOPTION_GUIDE) |
| **Expected contents** | Version pins; SYNC/DISTRIBUTION manifests; `foundation/company/` synced subset; adoption guides; operational scaffolds (**Confirmed** — BOOTSTRAP-004 SYNC.md, ADOPTION_GUIDE) |
| **Lifecycle** | Manual re-sync from Labs after AEF-002-classified validation; package version bumps; product adoption validation (e.g. ClassForge FOUNDATION-001) (**Confirmed**) |

### 2.3 Product Repository

| Field | Value |
| --- | --- |
| **Exemplar** | `classforge` (and other product repos) |
| **Purpose** | Domain implementation; Adopt / Extend / Deviate company assets (**Confirmed** — Inheritance Model, AEF-000, ADOPTION_GUIDE) |
| **Authority** | Authoritative for product architecture, features, local decisions, implementation records, and product Mission/Opportunity artifacts when those live there (**Confirmed** — Inheritance ownership model; Mission Contract; Discovery-003) |
| **Expected contents** | Synced or adopted `docs/company/` subset; product docs; architecture/scope; implementation indexes; local scaffolds; optional assessment/engagement records when executed locally (**Confirmed** — ClassForge FOUNDATION-001, ASSESSMENT-001) |
| **Lifecycle** | Bootstrap → Developing → Operational → Knowledge Producing → Reference Project (**Confirmed** — Inheritance maturity stages); feeds promotion candidates back (**Confirmed**) |

### 2.4 Client Engagement Repository

| Field | Value |
| --- | --- |
| **Exemplar** | Not present as a dedicated repo in this workspace; modeled in Discovery-005 and FUTURE-CAPABILITY-002 / Phoenix validation context |
| **Purpose** | Host client-scoped execution, evidence, and permanent client deliverables while Aredir methodology remains Aredir-owned (**Confirmed** for assessment layering — Discovery-005; **Externally Stated** for general consulting packaging — AEF-000 “future consulting repos,” AEF-002 future consulting column) |
| **Authority** | Client-authoritative for engagement record and accepted deliverables; Aredir-authoritative for methodology and reusable distribution package (**Confirmed** — Discovery-005) |
| **Expected contents** | Temporary or activated execution assets; generated findings/deliverables; client permanent documentation; engagement metadata (**Confirmed** — Discovery-005 Layers 3–4) |
| **Lifecycle** | Prepare → install/activate → evaluate → evidence → deliverables → remediate → validate → close/remove runtime → retain client record → evaluate promotion candidates (**Confirmed** — Discovery-005 §10) |

### 2.5 Validation / Quality Authority Repository

| Field | Value |
| --- | --- |
| **Exemplar** | `aredir-quality-systems` |
| **Purpose** | Own AQSF/AVF quality evaluation, verification, evidence, and findings methods — sibling authority, not absorbed into AEF (**Confirmed** — AEF-000, LABS-PROMOTION-001, ClassForge FRAMEWORK-SYNC-001) |
| **Authority** | Canonical for quality/assessment methods; does not own Labs Architecture Audit, company promotion acceptance, or Bootstrap distribution (**Confirmed** — LABS-PROMOTION-001) |
| **Expected contents** | Capability architecture, publishing/projection architecture, governance, AVF operational capabilities, capability registry (**Confirmed** — CAPABILITY-ARCHITECTURE-001, PUBLISHING-001, CAPABILITY-GOVERNANCE-001) |
| **Lifecycle** | Capability Governance: propose → mature → review → validate (e.g. Phoenix engagement named as validation context) → promote/deprecate (**Confirmed** — CAPABILITY-GOVERNANCE-001; Phoenix named **Externally Stated** as engagement, corpus not re-audited here) |

### 2.6 Reference Repository (role overlap)

| Field | Value |
| --- | --- |
| **Exemplar** | `aredirlabs-com` as Platform v1.0 physical reference |
| **Purpose** | Executable specification of what inheriting repositories should contain (**Confirmed** — REFERENCE_REPOSITORY_SPECIFICATION) |
| **Authority** | Spec authority for layout and platform markers; methodology authority remains Labs `docs/company/` (**Confirmed**) |
| **Note** | Reference Repository is a **role of the company framework repository**, not a fifth independent authority. Bootstrap is the extractable packaging form of that role (**Confirmed** — AEF-002). |

### Role summary

```text
aredirlabs-com          ← methodology + promotion acceptance + reference platform
aredir-quality-systems  ← quality / assessment method authority (sibling)
aredir-project-bootstrap← packaging / distribution only
product repositories    ← domain authority + Adopt/Extend/Deviate consumers
client engagement repos ← execution + client record (when engagements use them)
```

**(Confirmed** as multi-repo non-overlapping ownership — LABS-PROMOTION-001, ClassForge Authority Map, Bootstrap authority model**)**

---

## 3. Capability Taxonomy

### Candidate types (evaluated)

| Candidate type | Evidence of existence | Architectural class? |
| --- | --- | --- |
| **Framework Capability** | AEF C1–C10 methodological subsystems with contracts (**Confirmed** — AEF-000/001) | **Yes** — normative AEF inventory |
| **Engineering Capability (organizational)** | EOS-002 ten organizational competencies (**Confirmed**) | **Yes, but distinct layer** — must not be conflated with AEF C* (**Confirmed** — AEF-000, ClassForge FRAMEWORK-SYNC-001) |
| **Assessment Capability** | Architecture Audit (Labs) + AQSF/AVF (QS) + engagement execution (**Confirmed** — LABS-PROMOTION-001, Discovery-005, ClassForge ASSESSMENT-001) | **Partially** — real as a **composed cross-boundary practice**, not a single AEF C* or EOS-002 row |
| **Operational Capability** | Engineering Operations (Discovery-003); AQSF “Operational” classification; Mission orientation (**Confirmed**) | **Yes within domains** — Ops as company operational environment; AQSF Operational as QS layer; not yet a single shared AEF capability (C11 explicitly deferred) |
| **Knowledge Capability** | AEF C7; AQSF Knowledge as implicit domain; Promotion Process (**Confirmed**) | **Yes for Labs (C7)**; **Unresolved as standalone AQSF capability** (CAPABILITY-ARCHITECTURE-001) |
| **Template Capability** | Mission Template, Bootstrap scaffolds, prompt templates, GitHub templates (**Confirmed**) | **No as separate architectural class** — templates are **distribution/execution forms** of other capabilities (C6/C8/C9/Mission) |
| **Mission Capability** | Engineering Mission Contract/Template/Registry (**Confirmed** — DISCOVERY-004, AREDIR-MISSION-001) | **No** — Mission is a **governed artifact**, not an AEF capability; owns orientation by reference only |

### AQSF internal classifications (sibling taxonomy)

Quality Systems independently classifies: Governance, Operational, Assessment, Knowledge, Projection, Cross-cutting (**Confirmed** — CAPABILITY-ARCHITECTURE-001 §4). These are real architectural classes **inside AQSF**, not replacements for AEF C1–C10.

### Taxonomy conclusion

| Verdict | Statement |
| --- | --- |
| **Confirmed** | AEF framework capabilities (C1–C10) and EOS-002 organizational capabilities are distinct real classes |
| **Confirmed** | AQSF capability classifications are real within Quality Systems |
| **Confirmed** | Assessment crossing repos is a **distribution problem over multiple owners** (Labs audit + QS methods + engagement record), not one monolithic capability type |
| **Inferred** | “Template,” “Mission,” and “Bootstrap package” name **delivery/packaging/artifact forms**, not peer architectural classes to AEF C* |
| **Unresolved** | Whether “Assessment Capability” should ever become a named AEF or EOS capability — evidence currently keeps AQSF outside AEF inventory |

---

## 4. Distribution Modes

How capabilities may cross repository boundaries, with ownership implications.

| Mode | Evidence | Ownership implication |
| --- | --- | --- |
| **Reference** | Inheritance matrix: EOS, Capability Model, patterns often “Reference”; AEF series reference-only from Bootstrap; QS consulted not copied (**Confirmed**) | Ownership stays at authority; consumer links without local canonical copy |
| **Copy** | ClassForge FOUNDATION-001 copied B01–B03 into `docs/company/`; AEF-002 operational templates “Copied”; Bootstrap `include-owned` scaffolds (**Confirmed**) | Copy may be bootstrap-owned (templates) or Labs-owned-with-local-copy; **copy ≠ ownership transfer** for methodology |
| **Install** | Discovery-005 install/activate assessment runtime in client repo; temporary tooling (**Confirmed** for assessment) | Installation enables execution; methodology ownership retained by Aredir |
| **Generate** | Reference Repo: products may “clone, sync, or generate”; AEF-002 stack starter “Generated later” (**Confirmed** as specified mode; generation tooling not required by this discovery) | Generated skeleton/product structure is consumer-owned; generated methodology content still Labs-owned if sourced from company assets |
| **Inherit** | EOS-003 Project Inheritance Model; Adopt/Extend/Deviate (**Confirmed**) | Inheritance is the governed consumption posture; company remains authoritative unless Deviate logged |
| **Synchronize** | AEF-002 include-as-sync; Bootstrap SYNC.md; Inheritance “sync `docs/company/`”; version pins / Labs source commit (**Confirmed**) | Sync distributes a faithful copy with provenance; ownership remains Labs; product PRs must not redefine synced standards |
| **Promote** | Promotion Process; Inheritance feedback loop; Capability Governance promotion; Discovery-005 promotion candidates (**Confirmed**) | Selective upward transfer of **generalized reusable IP**, not automatic import of client/product facts |
| **Compose** | Mission coordinates artifacts by reference; AQSF capabilities collaborate without duplicating authority; LABS-PROMOTION-001 Audit → AQSF → AVF chain (**Confirmed**) | Composition preserves each participant’s ownership; coordination ≠ absorption |

### Modes rejected or constrained by evidence

| Approach | Verdict | Evidence |
| --- | --- | --- |
| Manual copy without provenance | Rejected as strategy | AEF-002 §10 |
| Ad hoc parallel edits in products | Rejected | AEF-002 §10; Inheritance conflict rule |
| Fork ownership of `docs/company/` | Forbidden | Inheritance; AEF-002 |
| Package AQSF bodies into Bootstrap | Forbidden | SYNC.md; ADOPTION_GUIDE |
| Projection becoming ownership | Forbidden | PUBLISHING-001; Discovery-003 |

### Assessment as one mode composition (example, not foundation)

Discovery-005 assessment path is a composition of: **Synchronize/Include** (reusable methods when bootstrap-eligible) + **Install** (runtime) + **Execute** (client/product repo) + **Generate** (findings/deliverables) + **Promote** (sanitized learning). **(Confirmed** as layered model in Discovery-005; **Inferred** as instance of the general mode set**)**

---

## 5. Capability Lifecycle

Proposed spine from the package brief:

```text
Discover → Validate → Promote → Publish → Adopt → Execute → Evolve → Promote Improvements
```

### Evidence mapping

| Stage | Supported? | Evidence |
| --- | --- | --- |
| **Discover** | **Confirmed** (partial) | AEF series discoveries; AREDIR-DISCOVERY-*; AQSF Discovery capability; product Discovery packages (ClassForge) — Labs has no standalone Product Discovery playbook (**Confirmed** gap — FRAMEWORK-SYNC-001) |
| **Validate** | **Confirmed** | Capability Governance validation via engagements (Phoenix named); ClassForge FOUNDATION-001 Bootstrap validation; ClassForge ASSESSMENT-001; AQSF validation ≠ promotion |
| **Promote** | **Confirmed** | Promotion Process (Labs KB); Capability Governance promotion (QS); assessment → promotion candidates (LABS-PROMOTION-001) |
| **Publish** | **Ambiguous term** | **Confirmed** as AQSF Publishing = projection without ownership; **also** “publish” colloquially for KB listing after promotion. These are **not the same stage**. |
| **Adopt** | **Confirmed** | Adopt/Extend/Deviate; Bootstrap ADOPTION_GUIDE; Inheritance maturity; Promotion Process Company Standard requires multi-product adoption or mandated use |
| **Execute** | **Confirmed** | Product delivery lifecycle; assessment execution in client/product repos; Mission Active state orients execution without owning packages |
| **Evolve** | **Confirmed** | AEF Future Evolution notes; Capability Governance refinement; quarterly KB review; version metadata on promoted assets |
| **Promote Improvements** | **Confirmed** | Inheritance knowledge feedback loop; Discovery-005 selective promotion; Promotion Process Candidate ← Project Artifact |

### Lifecycle support verdict

| Verdict | Statement |
| --- | --- |
| **Confirmed** | Multiple overlapping lifecycles exist (delivery, inheritance/bootstrap, promotion, AQSF capability governance, assessment engagement, Mission state machine) |
| **Inferred** | The brief’s eight-stage spine is a **valid synthesis** of those loops into a distribution-oriented view, not a single already-normative company lifecycle document |
| **Confirmed** | “Publish” must be disambiguated: KB publication after promotion ≠ AQSF Publishing projection |
| **Unresolved** | Whether one unified Capability Distribution lifecycle should become a promoted standard (out of scope for this discovery) |

---

## 6. Ownership Matrix

For each evaluated capability type / form:

| Type / form | Who owns it? | Who executes it? | Who consumes it? | Who may modify it? | Who receives deliverables? |
| --- | --- | --- | --- | --- | --- |
| **AEF Framework Capability (C1–C10)** | Aredir Labs (per AEF-001 contracts) | Products, agents, Labs, Bootstrap authors as applicable | Products, agents, bootstrap, auditors | Capability authority in Labs; Deviate only via governed decision in consumers | Company standards → products; products retain domain outputs |
| **EOS-002 Organizational Capability** | Labs (Capability Model) | Organization / teams | Maturity assessors, leads | Labs engineering authority | Organizational practice outcomes (not a distributable package by itself) |
| **Bootstrap / Inheritance (C8 packaging)** | Labs owns methodology specs; Bootstrap owns package scaffolds | Bootstrap maintainers package; products adopt | Product repos | Labs for methodology; Bootstrap for `include-owned` only | Product repositories receive adopted platform |
| **QA / Documentation / Architecture Standards** | Labs (C4/C5/C3 as applicable) via promoted assets | Engineers/agents in product/engagement repos | Product teams, auditors | Labs via promotion/review; local Extend/Deviate rules | Operational compliance evidence stays in executing repo |
| **Assessment methods (AQSF/AVF)** | Quality Systems | Assessors in engagement/product context | Engagement stakeholders; Labs Architecture Audit consumers | QS for methods; Labs for Architecture Audit; not absorbed into AEF | Findings/evidence in engagement/product record; candidates to Labs promotion |
| **Assessment distribution package / runtime** | Aredir (methodology + package); runtime location ≠ ownership (**Confirmed** Discovery-005) | Client/product repository | Engagement participants | Aredir for methodology versions; client for client record | Client permanent deliverables; Aredir promotion candidates only if sanitized |
| **Knowledge (C7 / KB)** | Labs | Promotion reviewers; asset owners | All products | Labs asset owners; consumers Adopt/Extend/Deviate | Adopted standards in products; KB remains Labs-canonical |
| **Mission (artifact)** | Owning repository / authority domain (exactly one) | Operators in that domain | Ops projections may index | Mission authorizer/owner in home repo; Labs must not become SoR for foreign Missions | Orientation outcomes; not delivery containers |
| **Templates (Mission, prompts, GitHub, scaffolds)** | Labs or Bootstrap per AEF-002 copy/sync strategy | Authors filling templates in target repos | Engineers/agents | Template owners for template; filled instances owned by filling repo | Filled artifacts belong to executing/owning repo |
| **Publishing / Ops projections** | Projection owner owns **projection only** (QS Publishing; future Labs Ops indexes) | Projection systems / indexes | Audiences | Projection owners may change projections; must not amend source records | Audiences receive derived views, not ownership of sources |

---

## 7. Projection Model

### Candidate representations

| Representation | Distinct? | Evidence |
| --- | --- | --- |
| **Authoritative representation** | **Yes** | Canonical home in owning repository/domain (AEF-001, Inheritance, AQSF information ownership, Mission one-home rule) |
| **Execution representation** | **Yes** | Runtime/working form in product or client repo (Discovery-005 Layer 3; assessment findings generation; package execution) |
| **Client projection** | **Yes (when engagement applies)** | Client-facing deliverables and AQSF audience publications derived from operational record (Discovery-005 Layer 4; PUBLISHING-001) |
| **Documentation projection** | **Partially distinct** | Documentation tiers (canonical / operational / implementation) are ownership tiers (**Confirmed** — Documentation Governance); “projection” language is stronger in Ops/AQSF than in doc governance |
| **Bootstrap projection** | **Yes as packaging snapshot** | `foundation/company/` synced pack with distribution notice and version pins — distributor representation, not new authority (**Confirmed** — SYNC.md, AEF-002) |
| **Assessment projection** | **Yes as composed view** | Assessment reports/recommendations projected for audiences; Publishing owns publication projections only (**Confirmed** — PUBLISHING-001, Discovery-005 reports as generated deliverables) |

### Invariant

> **Authority precedes projection.** Consumption, sync copies, indexes, publications, and runtime presence do not transfer ownership.

**(Confirmed** — AQSF Publishing / Capability Architecture; Discovery-003; Bootstrap sync analogy; Discovery-005**)**

### Distinctness verdict

These are **distinct concepts** when kept as roles of a capability across boundaries. Collapsing them (e.g. treating Bootstrap sync copy as canonical, or Ops index as Mission SoR) is an evidenced failure mode (**Confirmed** — Discovery-003/004 guardrails; AEF-002 sync rules).

---

## 8. Feedback Architecture

How discoveries return to Aredir without violating independence.

```text
Products / Client engagements / Validation repos
        ↓
Experience & evidence (local authoritative records)
        ↓
Classification of what may leave the local boundary
        ↓
┌───────────────────┬─────────────────────┬──────────────────────┐
│ Client evidence   │ Generalized         │ Promotable knowledge │
│ (stays local)     │ methodology         │ (candidate → review) │
└───────────────────┴─────────────────────┴──────────────────────┘
                              ↓
                    Labs / QS owning repos
                              ↓
                    Framework / capability evolution
                              ↓
                    Redistribution via sync / bootstrap / adopt
```

### Separated return paths

| Path | What it is | What it is not | Evidence |
| --- | --- | --- | --- |
| **Client evidence** | Engagement-specific findings, confidential facts, client deliverables, source code | Automatic Labs KB content | Discovery-005 §11; Promotion generalization requirements |
| **Generalized methodology** | De-identified reusable methods, patterns, schemas refined from practice | Raw engagement dump | Discovery-005 promotion rule; Promotion Process “generalized (no project-only leakage)” |
| **Promotable knowledge** | Candidate assets with metadata, origin refs, reuse evidence, review outcome | Silent copy into `docs/company/` | Promotion Process lifecycle; Inheritance promotion candidates |
| **Framework evolution** | AEF/EOS/QS capability contract or boundary changes after governed discovery | Drive-by edits in Bootstrap or product forks | AEF-001 evolution notes; AEF-002 “semantic methodology changes must originate in Labs”; QS Capability Governance |

### Validation repository feedback

ClassForge FOUNDATION-001 produced Bootstrap Validation Findings (BVF-*) owned by `aredir-project-bootstrap` or Labs — **Confirmed** pattern: validation in a product repo yields **improvement candidates for packaging**, not automatic methodology rewrite.

Phoenix is named as a QS validation engagement context (**Externally Stated** — CAPABILITY-GOVERNANCE-001); Phoenix Engineering Knowledge Architecture corpus is **not present** in Labs (**Confirmed** — Discovery-002 Finding F6). This discovery does not invent Phoenix content.

---

## 9. Architectural Findings

Evidence only. No recommendations.

### F1 — Distribution is already multi-mode

Labs methodology crosses boundaries primarily by **reference**, **sync copy**, and **inheritance adoption**; Bootstrap adds **packaging**; assessment adds **install/execute**; knowledge returns by **promotion**; Ops/QS add **projection**. **(Confirmed)**

### F2 — Ownership is layer- and contract-based, not path-based

AEF-001 contracts, Documentation Governance tiers, AQSF information ownership, and Discovery-005 layers all assign authority independently of where a file is currently opened. **(Confirmed)**

### F3 — Bootstrap is a distributor, never the methodology SoR

AEF-002, SYNC.md, ADOPTION_GUIDE, and ClassForge sync records agree. **(Confirmed)**

### F4 — Quality Systems is a sibling distribution participant

AQSF/AVF are consumed by reference/integration guidance, not absorbed into AEF or packaged as Bootstrap methodology bodies. Assessment capability distribution must compose Labs + QS + engagement record. **(Confirmed)**

### F5 — Assessment is a specialized instance of the general problem

Discovery-005’s layered boundary is consistent with the general ownership/execution/installation/authority/delivery split; it does not need to be the root ontology for all capability distribution. **(Confirmed** consistency; **Inferred** generalization**)**

### F6 — Projection is a first-class distribution concern

AQSF Publishing and Engineering Operations both require derived views that never become ownership. Bootstrap sync copies are a packaging analogue of the same invariant. **(Confirmed)**

### F7 — Feedback is selective and governed

Promotion Process + Inheritance loop + Discovery-005 sanitization rules define return paths; automatic bidirectional sync of engagement evidence is unsupported. **(Confirmed)**

### F8 — Mission and templates are artifacts/forms, not capability classes

Mission Contract forbids replacing Package/Finding/Promotion authority; templates are filled instances under local ownership. **(Confirmed)**

### F9 — Automation of sync/versioned packs is specified but not required for the architecture to exist

AEF-002 recommends versioned methodology packs and sync procedures; Discovery-001 notes absence of automation. Architecture of distribution does not depend on implementing those tools. **(Confirmed)**

### F10 — Phoenix evidence remains externally thin in this workspace

Named as validation context and incubator evidence source; detailed Phoenix Engineering Knowledge Architecture / Validation Report files are not available here for re-audit. **(Confirmed** absence in Labs; **Externally Stated** existence as engagement name**)**

### F11 — Product independence is an explicit invariant

Products own domain architecture and may Extend/Deviate; ClassForge preserved pre-bootstrap work; client independence preserved in Discovery-005. Distribution must not overwrite product/client authority. **(Confirmed)**

### F12 — No single normative “Capability Distribution” document existed before this discovery

The behaviors are distributed across AEF-001/002, Inheritance, Promotion, Bootstrap SYNC, Discovery-003…005, QS Capability/Publishing architectures, and product adoption evidence. **(Confirmed)**

---

## 10. Overall Conclusion

### What is Capability Distribution?

**Capability Distribution** is the architectural model—already latent across AEF, Bootstrap, Quality Systems, Mission, Promotion, and engagement practice—that governs how Aredir-owned capabilities **cross repository boundaries** through reference, sync, inheritance, packaging, installation, composition, projection, and selective promotion, while keeping **ownership and authority** distinct from **installation, execution, and delivery**.

It is **not** a new AEF capability, not a Bootstrap redesign, not a sync technology, and not an assessment-only concern.

### How it relates (without changing existing architecture)

| Existing architecture | Relationship |
| --- | --- |
| **AEF** | Supplies framework capability inventory, ownership contracts, and extraction boundary that distribution must respect (C1–C10; AEF-001/002) |
| **Bootstrap** | Primary **packaging/distribution channel** for inheritable company assets; never methodology authority |
| **Mission** | **Orientation artifact** that may coordinate distributed work by reference; not a distribution mechanism and not a capability class |
| **Assessment** | **One composed distribution case**: Labs methods + QS methods + engagement/product execution + client/product deliverables + selective promotion |
| **Promotion** | **Upward** distribution path for reusable knowledge; inverse of inheritance/adoption |
| **Knowledge** | Durable IP store (C7/KB) that distribution adopts outward and promotion feeds inward |
| **Products** | Domain-authoritative consumers that Adopt/Extend/Deviate and execute capabilities locally |
| **Client engagements** | Execution and record boundaries where Aredir methods may run without ownership transfer |
| **Quality Systems** | Sibling authority whose capabilities distribute by reference/integration and projection rules, not by absorption into Labs Bootstrap |
| **Engineering Operations** | Future/operational projection environment that consumes distributed authoritative artifacts without becoming their SoR (Discovery-003) |

### Closing statement

Capability Distribution answers the general question Discovery-005 specialized:

> How does any Aredir-owned capability cross repository boundaries?

The evidence-supported answer is: **by governed modes that move representations without moving authority**, with feedback only through selective, generalized promotion—preserving ownership, provenance, versioning, upgradeability, and client/product independence.

---

## Constraints and Guardrails

This document does not authorize:

- implementation of distribution tooling
- redesign of AEF or Bootstrap
- introduction of C11
- modification of Mission Contract/Template/Registry substance
- definition of synchronization technology
- creation of automation
- prescription of Git workflows
- promotion of Phoenix assets
- copying client evidence into Aredir Labs
- treating assessment as the root of all capability distribution

---

## Evidence Base

| Source | Use |
| --- | --- |
| AEF-000, AEF-001, AEF-002, AEF-003 placeholder | Framework boundary, contracts, extraction/distribution modes |
| AREDIR-DISCOVERY-001…005 | Reconstruction, knowledge classification, Ops, Mission, assessment boundary |
| PROJECT_INHERITANCE_MODEL, REFERENCE_REPOSITORY_SPECIFICATION | Inherit/sync/copy roles; product vs company ownership |
| PROMOTION_PROCESS, DOCUMENTATION_GOVERNANCE | Upward path; documentation ownership tiers |
| ENGINEERING-MISSION-CONTRACT (+ Discovery-004) | Artifact vs capability; one-home authority |
| LABS-PROMOTION-001 | Labs / QS / Bootstrap / product ownership split |
| Bootstrap SYNC.md, ADOPTION_GUIDE (BOOTSTRAP-004) | Packaging modes and adoption |
| ClassForge FOUNDATION-001, FRAMEWORK-SYNC-001, ASSESSMENT-001 | Product adoption, authority sync, assessment-in-product evidence |
| AQSF CAPABILITY-ARCHITECTURE-001, PUBLISHING-001, CAPABILITY-GOVERNANCE-001 | Projection, classification, validation/promotion of capabilities |
| FUTURE-CAPABILITY-002 | Phoenix-named incubator context (external/thin) |

---

## Related

- [AREDIR-DISCOVERY-005 — Client Assessment Capability Distribution Boundary](./AREDIR-DISCOVERY-005_CLIENT_ASSESSMENT_CAPABILITY_DISTRIBUTION_BOUNDARY.md)
- [AREDIR-DISCOVERY-003 — Engineering Operations Architecture](./AREDIR-DISCOVERY-003_ENGINEERING_OPERATIONS_ARCHITECTURE.md)
- [AEF-001 — Framework Capability Contracts](../company/framework/AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md)
- [AEF-002 — Bootstrap Extraction Boundary](../company/framework/AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md)
- [Project Inheritance Model](../company/PROJECT_INHERITANCE_MODEL.md)
- [Promotion Process](../company/PROMOTION_PROCESS.md)
- [Engineering Mission Contract](../missions/ENGINEERING-MISSION-CONTRACT.md)
