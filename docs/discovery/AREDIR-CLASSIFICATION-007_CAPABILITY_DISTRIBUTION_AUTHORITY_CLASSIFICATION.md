# AREDIR-CLASSIFICATION-007 — Capability Distribution Authority Classification

| Field | Value |
| --- | --- |
| **Work package** | AREDIR-CLASSIFICATION-007 |
| **Status** | Complete (classification only) |
| **Date** | 2026-08-02 |
| **Package type** | Authority Classification — no implementation, no promotion, no redesign |
| **Writable repository** | `aredirlabs-com` only |
| **Subject** | Architectural ownership and authoritative location of the Capability Distribution model established by AREDIR-DISCOVERY-006 |
| **Prior authority** | [AREDIR-DISCOVERY-006](./AREDIR-DISCOVERY-006_CAPABILITY_DISTRIBUTION_ARCHITECTURE.md) |
| **Follow-on decision** | Completed by [Capability Distribution Architecture](../company/framework/CAPABILITY_DISTRIBUTION_ARCHITECTURE.md) (AREDIR-ARCHITECTURE-007) |

## Evidence classification used in this report

| Class | Meaning |
| --- | --- |
| **Confirmed** | Directly supported by Labs, Quality Systems, Bootstrap, or product artifacts consulted |
| **Inferred** | Reasonable synthesis from multiple evidence points; not a single authoritative rule |
| **Unknown** | Insufficient evidence to determine |
| **Contradictory** | Sources conflict |

Cross-repository evidence may be referenced by explicit repository and artifact identity. Absence from `aredirlabs-com` is **not** treated as proof of non-existence (**Confirmed** stance — Discovery-005 external evidence note; this package brief).

This package does **not** create C11, change AEF contracts, change EOS, modify Bootstrap or Quality Systems, promote Capability Distribution, create the canonical architecture, define tooling, prescribe sync technology, or alter Mission architecture.

---

## 1. Classification Question

### Precise question

> **Which architectural authority should own Capability Distribution, and what type of architectural asset is it?**

### Separated concerns

| Concern | Question for this classification | Not the same as |
| --- | --- | --- |
| **Ownership** | Who may authoritatively define and change the Capability Distribution model? | Who packages files; who runs engagements |
| **Governance** | Which governance surface constrains the model (AEF contracts, EOS principles, Promotion, QS capability governance)? | Day-to-day packaging operations |
| **Implementation** | Who materializes packaging, sync procedures, adoption checklists, or future tools? | Who owns the architectural rules those implements |
| **Packaging** | Who ships approved representations (Bootstrap `include-as-sync` / `include-owned`)? | Methodology authorship |
| **Execution** | Where capabilities are applied (product, client engagement, Labs delivery)? | Ownership of methods being executed |
| **Consumption** | Who Adopt / Extend / Deviate / consults by reference? | Right to redefine authority |

Discovery-006 already separated ownership, execution, installation, authority, and delivery for *capabilities being distributed*. This package asks the meta-question: who owns **that separation model itself**.

---

## 2. Candidate Classifications

### A. New AEF Capability

| Test | Result | Evidence |
| --- | --- | --- |
| Independent methodological responsibility? | **Partial / insufficient** | Responsibility is synthesis of rules already assigned across C1 principles, C7 promotion, C8 inheritance/bootstrap, Documentation Governance tiers, and QS sovereignty (LABS-PROMOTION-001). Discovery-006: “not a new AEF capability.” |
| Distinct inputs and outputs? | **Partial** | Inputs = capability assets + repo roles; outputs = modes/representations/ownership matrix. These overlap C8 outputs (inheritance procedures) and C7 outputs (promotion). |
| Bounded lifecycle? | **No exclusive lifecycle** | Discovery-006 §5: multiple overlapping lifecycles; eight-stage spine is synthesis, not a new normative lifecycle. |
| Own governance needs? | **Yes, but not capability-grade** | Needs a home document and conflict rules; does not require a new C* inventory row. |
| Authority not already owned by C1–C10? | **No** | Pieces are already owned: sync/reference (C8/AEF-002), promotion (C7), canonical-first / products-own-implementation (C1/EOS), doc tiers (C4). |
| Introduce C11? | **Forbidden** | Package constraint; Discovery-003/004/Mission Contract also forbid inventing C11. |

**Verdict: Rejected.** Capability Distribution does not meet the bar for a new AEF capability and must not become C11.

---

### B. Existing AEF Capability Responsibility

#### C1 — Engineering Operating System

| Aspect | Assessment |
| --- | --- |
| Fit | Strong for **invariants** (canonical-first; products own implementation; inherit Adopt/Extend/Deviate) (**Confirmed** — EOS Principles) |
| Distortion if sole owner | C1 orchestrates and must not absorb procedural/architectural detail owned elsewhere (AEF-001 C1 non-responsibilities). Full mode/representation architecture would bloat EOS. |
| Verdict | **Collaborator / principle home — not sole owner** |

#### C2 — Governance Framework

| Aspect | Assessment |
| --- | --- |
| Fit | Conflict rules and domain orchestration relate to authority disputes (**Confirmed** — AEF-001 C2) |
| Distortion | Governance orchestrates; does not own inheritance packaging, promotion checklists, or QS method distribution |
| Verdict | **Collaborator — not primary** |

#### C4 — Documentation Framework

| Aspect | Assessment |
| --- | --- |
| Fit | Ownership tiers and living-doc sync are part of representation discipline (**Confirmed** — Documentation Governance) |
| Distortion | Doc governance does not govern assessment install, QS reference-only packaging, or client engagement runtime |
| Verdict | **Collaborator — not primary** |

#### C7 — Knowledge Framework

| Aspect | Assessment |
| --- | --- |
| Fit | C7 purpose includes “distribute reusable engineering knowledge”; owns Promotion Process (**Confirmed** — AEF-001 C7) |
| Distortion | Promotion is the **upward** path. Assigning all Capability Distribution to C7 would incorrectly make Bootstrap packaging, inheritance sync, and assessment install “knowledge promotion” problems. |
| Verdict | **Primary for feedback/promotion boundary — not sole owner of the whole model** |

#### C8 — Bootstrap & Inheritance Framework

| Aspect | Assessment |
| --- | --- |
| Fit | Strongest single-capability overlap: Inheritance Model, Blueprint, Reference Repo, sync/reference without forking authority, bootstrap extraction (**Confirmed** — AEF-001 C8, AEF-002) |
| Explicit non-responsibility | “Owning promoted standard substance (other capabilities)”; `docs/company/` substance not owned by C8 (**Confirmed**) |
| Distortion if sole owner | C8 would appear to own QS distribution rules, client confidentiality boundaries, and promotion acceptance — conflicting with LABS-PROMOTION-001 and Bootstrap’s non-authoritative packaging role |
| Verdict | **Primary AEF collaborator for packaging/inheritance modes — insufficient as sole owner** |

#### Other existing capabilities (C3, C5, C6, C9, C10)

| Capability | Role |
| --- | --- |
| C3 | Produces audit methods that may be distributed; does not own distribution architecture |
| C5 | QA assets may be sync-packaged; does not own cross-repo authority model |
| C6 | Prompts/agent standards may be distributed; execution ≠ ownership |
| C9 | Delivery templates/packages execute in products; Mission often owned under C9 at Labs — not distribution architecture |
| C10 | Experience patterns may sync later; not distribution architecture |

**Verdict for §B:** No single existing AEF capability can own Capability Distribution without authority distortion. **C8 + C7 + C1** are the necessary AEF collaborators, with C8 closest for outward packaging/inheritance.

---

### C. AEF Cross-Capability Architecture

| Test | Result | Evidence |
| --- | --- | --- |
| Coordinates multiple AEF capabilities without becoming one? | **Yes** | Discovery-006 F12: behaviors distributed across AEF-001/002, Inheritance, Promotion, Bootstrap SYNC, Discovery-003…005, QS architectures |
| Precedent? | **Yes** | AEF-001 is cross-capability ownership map; AEF-002 is extraction/distribution boundary across C1–C10 readiness; LABS-PROMOTION-001 is cross-repo integration without new capability |
| Remains inside AEF series identity? | **Yes for authorship** | Framework architecture docs live under `docs/company/framework/` and bound methodology without inventing C* (**Confirmed** — AEF-000 placement, AEF-002 normative status) |

**Verdict: Accepted as preferred structural classification** — Capability Distribution is an **AEF cross-capability architecture** (framework-level), not a capability.

---

### D. EOS Operating Principle

| Test | Result | Evidence |
| --- | --- | --- |
| Foundational rule across AEF? | **Partially** | EOS principles already encode canonical-first and products-own-implementation (**Confirmed**) |
| Standalone subsystem? | **No — and should not be reduced to principle-only** | Discovery-006 defines repository roles, eight distribution modes, ownership matrix, projection model — beyond a principle table row |
| Relationship | **Invariants may be stated as principles; the model is architecture** | **Inferred** from EOS §Principles vs Discovery-006 structure |

**Verdict: Rejected as sole classification; accepted as contributing constraint layer.**

---

### E. Company-Wide Architectural Standard

| Test | Result | Evidence |
| --- | --- | --- |
| Scope exceeds AEF inventory? | **Yes** | Applies to AQSF (outside AEF), Bootstrap packaging repo, client engagements, product repos, future consulting packaging (**Confirmed** — AEF-000 AQSF exclusion; Discovery-005/006; SYNC.md QS reference-only) |
| Still Labs-authored? | **Yes** | Like LABS-PROMOTION-001 and AEF-002, Labs may define integration/distribution architecture without absorbing sibling method ownership |
| Carries architectural authority? | **Yes — if materialized as company standard / framework architecture** | Distinct from Knowledge Pattern (weaker authority) |

**Verdict: Accepted as scope/authority classification complementary to §C.** The model is **broader than AEF in application**, **Labs-owned in definition**, and should materialize as a **company-wide architectural standard** (framework architecture), not as an AEF C* .

---

### F. Knowledge Pattern

| Test | Result | Evidence |
| --- | --- | --- |
| Reusable knowledge under C7? | **Could be stored that way** | Promotion categories include Architecture Pattern; Knowledge Pattern exists in practice (Evidence Lifecycle) (**Confirmed** — Discovery-002 F9 gap on formal category list) |
| Carries company-wide architectural authority? | **No if only a pattern** | Patterns are adopted assets; Capability Distribution constrains Bootstrap, QS integration, and engagement boundaries — governance-grade (**Inferred** from Discovery-006 invariants vs Knowledge Governance pattern adoption) |

**Verdict: Rejected as primary classification** — too weak for the authority required. May later *reference* or *summarize* the architecture as educational knowledge, but must not be the authoritative home.

---

### G. Bootstrap Architecture

| Test | Result | Evidence |
| --- | --- | --- |
| Could C8 or Bootstrap repo own it? | **Packaging portion only** | Bootstrap is packaging/distribution; SYNC.md: does not author methodology (**Confirmed**) |
| Improper ownership risk? | **High if sole owner** | Would let distributor define rules for Labs and QS capabilities being distributed — inverts AEF-002 one-canonical-home rule |

**Verdict: Rejected as owner.** Bootstrap/C8 **implements** approved packaging representations; they do **not** own Capability Distribution architecture.

---

### H. Other

No additional classification is required beyond the hybrid of **§C + §E**.

| Candidate | Support |
| --- | --- |
| “Mission architecture” | **Rejected** — Mission is artifact orientation, not distribution (**Confirmed** — Mission Contract, Discovery-006 F8) |
| “Assessment architecture” | **Rejected** — assessment is one instance (**Confirmed** — Discovery-006) |
| “Ops platform capability” | **Rejected** — FUTURE-CAPABILITY-002 incubation; Discovery-003 deferred C11; Ops consumes distribution rules |

---

## 3. Scope Analysis

Does Capability Distribution govern only engineering methodology or all Aredir-owned capabilities?

**Answer:** It governs the **cross-repository movement of representations of Aredir-owned capabilities and related sibling-authority methods**, not the internal substance of every capability. Application scope is **broader than AEF inventory**; definition authority remains **Labs framework architecture**. **(Confirmed** synthesis of Discovery-006 + LABS-PROMOTION-001 + QS external boundary**)**

| Domain | Relationship to Capability Distribution |
| --- | --- |
| **AEF** | **Governed by** (modes/invariants apply to C1–C10 assets) and **producer** of authoritative methodology representations |
| **EOS** | **Governed by** (inheritance/adoption) and **producer** of operating-model representations; principles constrain the model |
| **AQSF** | **Consumer** of distribution *invariants* (authority precedes projection; no ownership-by-location); **producer** of its own method representations; **outside** Labs ownership of method substance; Labs must not package AQSF bodies (**Confirmed** — SYNC.md, QUALITY_SYSTEMS_INTEGRATION.md) |
| **Missions** | **Consumer** (one-home authority; Labs projection must not become SoR); **producer** of Mission records as local authoritative artifacts; Mission is **not** a distribution mechanism (**Confirmed**) |
| **Bootstrap** | **Producer** of packaged representations; **consumer** of Labs classification of what may be packaged; **outside** methodology ownership |
| **Product adoption** | **Consumer** (Adopt/Extend/Deviate); **producer** of local execution records and promotion candidates |
| **Client assessment execution** | **Consumer** of installed/activated methodology representations; **producer** of engagement evidence/deliverables; client evidence **outside** automatic return path (**Confirmed** — Discovery-005/006) |
| **Customer-facing projections** | **Governed by** projection invariants (Publishing / Ops); projections are **produced** representations, not new authority (**Confirmed** — PUBLISHING-001, Discovery-003) |
| **Future implementation services** | **Unknown / future consumer** — AEF-000 notes consulting packaging as future; FUTURE-CAPABILITY-002 incubation (**Externally thin**) |
| **Future operations-platform integrations** | **Unknown / future consumer** — must obey authority-precedes-projection if realized (**Inferred** from Discovery-003) |

---

## 4. Authority Analysis

### Who may authoritatively define

| Concern | Authoritative definer | Implementation / packaging responsibility | Evidence |
| --- | --- | --- | --- |
| **Distribution modes** | Aredir Labs (Capability Distribution architecture / AEF framework spine), with C8 primary for inherit/sync/copy packaging modes | Bootstrap documents and performs packaging; products perform adoption copies | AEF-002; Inheritance; SYNC.md |
| **Representation types** | Labs for company methodology representations; QS for AQSF publication/operational representations | Bootstrap labels sync vs owned; Publishing owns publication projections only | AEF-002 two-axis model; PUBLISHING-001 |
| **Ownership preservation** | Labs + QS each for their owned methods; Discovery-005 layer rules for engagements | All repos must not treat location as ownership | AEF-001; LABS-PROMOTION-001; Discovery-005 |
| **Projection boundaries** | QS for Publishing; Labs for future Ops indexes and company docs tiers | Projection implementers | PUBLISHING-001; Discovery-003; Documentation Governance |
| **Adoption rules** | Labs (Promotion Process Adopt/Extend/Deviate; Inheritance) | Products record Adopt/Extend/Deviate; Bootstrap ADOPTION_GUIDE | Promotion Process; Inheritance; ADOPTION_GUIDE |
| **Modification rights** | Asset owners per AEF-001 / QS Capability Governance; consumers may Extend/Deviate only under rules | PRs in owning repos for substance; product PRs must not redefine synced company standards | AEF-002 sync rules; AEF-001 |
| **Synchronization expectations** | Labs (AEF-002 recommended architecture; Inheritance sync requirement) | Bootstrap maintainers re-sync; products record version pins | AEF-002 §10; SYNC.md; ClassForge FOUNDATION-001 / FRAMEWORK-SYNC-001 |
| **Feedback and promotion boundaries** | Labs Promotion Process for company KB; QS Capability Governance for AQSF capability promotion; engagement confidentiality per Discovery-005 | Candidate authors in products/engagements; reviewers in owning authorities | Promotion Process; CAPABILITY-GOVERNANCE-001; Discovery-005 §11 |

### Verified multi-repo model

| Role | Claim | Verified? |
| --- | --- | --- |
| Aredir Labs owns methodology authority | Yes | **Confirmed** — AEF-000/002, LABS-PROMOTION-001, Bootstrap authority model |
| Bootstrap packages approved representations | Yes | **Confirmed** — AEF-002, SYNC.md, ADOPTION_GUIDE |
| Product repository adopts, extends, or deviates | Yes | **Confirmed** — Inheritance, Promotion Process, ClassForge adoption |
| Client engagement repository executes methodology and preserves engagement records | Yes for assessment-shaped engagements | **Confirmed** — Discovery-005; general consulting repo column **Externally Stated / future** in AEF-002 |
| Quality Systems owns its methods and authorizes their distributable forms | Yes | **Confirmed** — LABS-PROMOTION-001; QUALITY_SYSTEMS_INTEGRATION.md; QS CAPABILITY-GOVERNANCE / Publishing |

No correction required to this model; it is evidence-supported.

---

## 5. Conflict Analysis

| If assigned to… | Conflict? | Detail |
| --- | --- | --- |
| **New AEF capability (C11)** | **Yes** | Contradicts Discovery-006, Mission/Ops C11 deferral, and this package constraint |
| **C8 alone** | **Yes** | Conflicts with C8 non-ownership of promoted substance; risks Bootstrap appearing as methodology authority; under-covers QS and promotion |
| **C7 alone** | **Yes** | Collapses packaging/inheritance into knowledge promotion; conflicts with C8 primary on Inheritance/Blueprint/Reference |
| **C1 alone** | **Yes** | EOS would duplicate AEF-002/Inheritance detail; violates C1 “does not replace promoted standards’ detail” |
| **Bootstrap repository** | **Yes** | Direct conflict with Bootstrap non-authoritative boundary |
| **Quality Systems** | **Yes** | QS sovereignty is for quality methods, not Labs methodology distribution architecture; reverse absorption rejected by LABS-PROMOTION-001 |
| **Product repository** | **Yes** | Products own domain implementation, not company distribution architecture |
| **Knowledge Pattern only** | **Yes (authority gap)** | Insufficient authority vs Promotion Process, Bootstrap boundary, and QS integration needs |
| **AEF cross-capability + company architectural standard (Labs)** | **No material conflict found** | Aligns with AEF-001/002 pattern; preserves Bootstrap packaging limit; preserves QS sovereignty; preserves Adopt/Extend/Deviate; preserves Promotion Process as upward authority; preserves Documentation Governance tiers; preserves client confidentiality via Discovery-005 rules |

**Customer confidentiality:** Preserved only if the classification keeps engagement evidence outside automatic Labs ingestion — which the preferred classification does by retaining Discovery-005/006 feedback separation under Labs-defined rules, not under product or Bootstrap authorship. **(Confirmed)**

---

## 6. Asset-Type Analysis

What kind of canonical artifact should Capability Distribution become **if** materialized later (not created here)?

| Asset type | Fit | Notes |
| --- | --- | --- |
| **Architecture specification** | **Strong** | Matches Discovery-006 content shape (roles, modes, projections, ownership matrix) |
| **Company standard** | **Strong** | Needed for cross-repo normative force once promoted |
| **Framework architecture** | **Strongest composite** | Precedent: AEF-001 contracts; AEF-002 extraction boundary — framework spine documents that are Company Standards |
| **Operating principle** | Weak alone | Principles can cite invariants; cannot hold full model |
| **Governance contract** | Partial | AEF-001 already is the capability ownership contract; Distribution should not rewrite those contracts in v1 materialization |
| **Distribution standard** | Strong synonym | Accurate functional name; may be the document title class under framework architecture |
| **Knowledge pattern** | Weak as sole type | Authority insufficient |
| **Capability contract** | **Rejected** | Would imply a new C* |

**Preferred asset type when materialized:**

> **Framework architecture / company architectural standard** (AEF-series peer to AEF-002): an architecture specification that states distribution modes, representation types, and authority preservation for Aredir-owned capabilities and sibling-authority integration — without becoming a capability contract.

---

## 7. Repository Location Analysis

Repository location must follow authority; it must not determine authority.

| Candidate path | Fit | Rationale |
| --- | --- | --- |
| `docs/company/framework/` | **Preferred** | Home of AEF-000/001/002; framework boundary and extraction/distribution specs already live here (**Confirmed** — AEF-000 placement rule) |
| `docs/company/` (root) | Acceptable secondary | EOS, Inheritance, Promotion live at root; Distribution is more framework-spine than EOS narrative |
| `docs/company/governance/` | Weak | Governance orchestrates domains; Distribution is not a new governance domain doc |
| `docs/company/architecture-patterns/` | Weak | KB Architecture Patterns are product-agnostic system patterns (C3); meta-distribution architecture is different |
| `docs/company/engineering-standards/` | Weak | Operational/agent conventions; wrong authority weight |
| `docs/company/knowledge-patterns/` | Rejected for authoritative home | Pattern authority too weak (see §2F) |
| Dedicated `docs/company/architecture/` company-architecture area | **Not justified now** | Would invent structure; AEF-003 is reserved for documentation structure / Blueprint `framework/` listing — creating a parallel company-architecture tree before AEF-003 risks path conflict (**Confirmed** — AEF-003 placeholder scope) |
| Bootstrap repository | **Rejected** | Packaging only |
| Quality Systems repository | **Rejected** | Sibling method authority |
| `docs/discovery/` | Correct for **this classification** and Discovery-006 until promotion | Discovery/classification records are not yet company standards (**Confirmed** — Documentation Governance; Discovery README) |

**Authoritative location if/when materialized:** `docs/company/framework/` under Labs, with Bootstrap and products consuming via sync/reference per AEF-002 — not owning the definition.

---

## 8. Classification Findings

### F1 — Capability Distribution is not a new AEF capability

| Field | Value |
| --- | --- |
| **Statement** | Capability Distribution must not be added as C11 or any new AEF capability row |
| **Evidence** | Discovery-006 conclusion; AEF-001 normative inventory unchanged constraint; C11 deferrals in Discovery-003/004/Mission |
| **Classification** | **Confirmed** |
| **Architectural implication** | Materialization must be architecture/standard text, not a capability contract |

### F2 — No single existing AEF capability can sole-own the model

| Field | Value |
| --- | --- |
| **Statement** | C8 is closest for packaging/inheritance; C7 for promotion feedback; C1 for principles; none alone covers QS, client engagement, and projection without distortion |
| **Evidence** | AEF-001 C1/C7/C8 responsibilities and non-responsibilities; Discovery-006 ownership matrix |
| **Classification** | **Confirmed** |
| **Architectural implication** | Treat as cross-capability architecture with named collaborators |

### F3 — Preferred structure is AEF cross-capability architecture

| Field | Value |
| --- | --- |
| **Statement** | Capability Distribution coordinates multiple capabilities and repos the way AEF-001/002 and LABS-PROMOTION-001 do — without being a capability |
| **Evidence** | AEF-001 interaction map; AEF-002 multi-capability extraction; Discovery-006 F12 |
| **Classification** | **Confirmed** |
| **Architectural implication** | Authorship belongs on the AEF framework spine |

### F4 — Application scope is broader than AEF inventory

| Field | Value |
| --- | --- |
| **Statement** | The model applies to AQSF integration, Bootstrap packaging, products, and client engagements, not only AEF C1–C10 assets |
| **Evidence** | AEF-000 AQSF exclusion; Discovery-005/006; QUALITY_SYSTEMS_INTEGRATION.md |
| **Classification** | **Confirmed** |
| **Architectural implication** | Asset type must be company-wide architectural standard, not AEF-internal-only note |

### F5 — Definition authority remains Aredir Labs; packaging and method substance stay split

| Field | Value |
| --- | --- |
| **Statement** | Labs owns the Capability Distribution definition; Bootstrap packages approved Labs representations; QS owns AQSF/AVF methods and their authorized distributable forms; products/clients execute and retain local records |
| **Evidence** | LABS-PROMOTION-001; AEF-002; SYNC.md; Discovery-005 |
| **Classification** | **Confirmed** |
| **Architectural implication** | Classification must not relocate methodology or quality authorship |

### F6 — Bootstrap cannot own Capability Distribution

| Field | Value |
| --- | --- |
| **Statement** | Assigning ownership to Bootstrap or treating Distribution as “Bootstrap architecture” conflicts with the non-authoritative packaging boundary |
| **Evidence** | AEF-002 §1; SYNC.md purpose; ClassForge FRAMEWORK-SYNC-001 |
| **Classification** | **Confirmed** |
| **Architectural implication** | Bootstrap remains implementer/distributor of classified payloads |

### F7 — Knowledge Pattern is insufficient as authoritative home

| Field | Value |
| --- | --- |
| **Statement** | A C7 knowledge pattern cannot carry the normative force required for Bootstrap boundaries, QS integration, and engagement confidentiality |
| **Evidence** | Knowledge Governance adoption model vs AEF-002/Discovery-006 invariants; Discovery-002 pattern vs standard authority distinction |
| **Classification** | **Inferred** (strong) |
| **Architectural implication** | Do not park the canonical definition under `knowledge-patterns/` |

### F8 — EOS principles constrain but do not classify the asset

| Field | Value |
| --- | --- |
| **Statement** | Canonical-first and products-own-implementation are necessary invariants; they are not a substitute for the distribution architecture |
| **Evidence** | EOS Principles table; Discovery-006 mode/role/projection detail |
| **Classification** | **Confirmed** |
| **Architectural implication** | Future architecture may cite EOS principles; EOS need not be rewritten for classification |

### F9 — Preferred canonical path is `docs/company/framework/`

| Field | Value |
| --- | --- |
| **Statement** | When materialized, the authoritative document should live with AEF framework architecture, not in Bootstrap, QS, product, or knowledge-pattern trees |
| **Evidence** | AEF-000 document placement; AEF-002 as distribution-boundary precedent; AEF-003 reserved for doc-structure work |
| **Classification** | **Confirmed** for Labs home; **Inferred** that a new company-architecture directory is unnecessary now |
| **Architectural implication** | Location follows Labs framework authority |

### F10 — Phoenix boundary evidence remains thin but non-blocking

| Field | Value |
| --- | --- |
| **Statement** | Phoenix is named as QS validation context; full Phoenix validation/knowledge corpus was not re-auditable in Labs for this package |
| **Evidence** | CAPABILITY-GOVERNANCE-001 names Phoenix; Discovery-002 F6; Discovery-006 F10; FUTURE-CAPABILITY-002 |
| **Classification** | **Confirmed** (absence in Labs); **Unknown** (full external corpus contents) |
| **Architectural implication** | Classification confidence is not blocked; later Phoenix evidence may refine engagement examples, not the ownership decision |

### F11 — ClassForge confirms consumer/implementer roles, not ownership

| Field | Value |
| --- | --- |
| **Statement** | ClassForge adoption and assessment records show product repos consuming Bootstrap/Labs/QS authorities and producing local evidence — consistent with Distribution as Labs-defined, product-executed |
| **Evidence** | FOUNDATION-001; FRAMEWORK-SYNC-001; ASSESSMENT-001 Authority Map |
| **Classification** | **Confirmed** |
| **Architectural implication** | Products remain consumers/producers of representations, not owners of the model |

### F12 — Dual label is coherent, not contradictory

| Field | Value |
| --- | --- |
| **Statement** | “AEF cross-capability architecture” (structure) and “company-wide architectural standard” (scope/force) describe one asset from two angles |
| **Evidence** | AEF-002 is both framework architecture and Company Standard while governing Bootstrap packaging beyond a single C*; LABS-PROMOTION-001 spans Labs/QS/Bootstrap/products |
| **Classification** | **Inferred** (no contradiction found — not **Contradictory**) |
| **Architectural implication** | Classification decision may state both without inventing a third ontology |

---

## 9. Classification Decision

### Preferred classification

**AEF cross-capability architecture**, materialized (when authorized) as a **company-wide framework architectural standard**.

| Field | Decision |
| --- | --- |
| **What Capability Distribution is** | The Labs-owned architectural model that governs how representations of Aredir-owned capabilities (and sibling-authority methods by integration rules) cross repository boundaries without moving authority |
| **Authoritative owner** | **Aredir Labs** — AEF framework spine / engineering lead, with mandatory collaboration from **C8** (packaging/inheritance), **C7** (promotion/feedback), and **C1** (operating principles). Quality Systems retains sovereignty over AQSF/AVF method definitions and authorized distributable forms. |
| **Asset type** | Framework architecture / company architectural standard (architecture specification). **Not** a capability contract. **Not** a knowledge pattern as sole home. |
| **Architectural scope** | **Broader than AEF inventory in application**; **AEF-framework-authored in definition**. Governs distribution invariants across Labs, Bootstrap, products, client engagements, and QS integration — without absorbing QS or product domain ownership. |
| **Authoritative location (future materialization)** | `docs/company/framework/` in `aredirlabs-com` |
| **Repositories that implement or consume (do not own definition)** | Bootstrap (package); products (adopt/execute); client engagement repos (execute/retain records); QS (own methods; consume invariants; authorize QS distributable forms); future Ops projections (project only) |
| **Confidence** | **High** on rejection of new capability, Bootstrap ownership, and QS ownership of the Labs model; **High** on Labs definition authority; **Medium-High** on the dual “cross-capability + company-wide standard” labeling (F12) |

### Rejected alternatives

| Alternative | Why rejected |
| --- | --- |
| New AEF capability / C11 | No independent capability bar; forbidden; Discovery-006 rejects |
| Sole C8 responsibility | Distorts C8; under-covers promotion, QS, client boundaries |
| Sole C7 responsibility | Collapses distribution into promotion |
| Sole C1 / EOS principle | Principles necessary but insufficient |
| Sole C2 / C4 | Orchestration or doc tiers only |
| Knowledge Pattern as authoritative home | Insufficient normative force |
| Bootstrap architecture ownership | Conflicts with packaging-only boundary |
| QS-owned Capability Distribution | Conflicts with Labs methodology authority and LABS-PROMOTION-001 split |
| Assessment-rooted or Mission-rooted architecture | Instance/artifact confusion (Discovery-006) |

### Single-classification clarity

Evidence **does** support a single preferred classification:

> **Labs-owned AEF cross-capability architecture with company-wide architectural-standard force.**

It does **not** support inventing a new capability, nor assigning ownership to Bootstrap or Quality Systems.

---

## 10. Immediate Next Package

**Recommend one successor only:**

### AREDIR-ARCHITECTURE-007 — Capability Distribution Architecture (Canonical)

| Field | Value |
| --- | --- |
| **Purpose** | Turn Discovery-006 into a polished canonical architecture document under the classification decided here |
| **Owner** | Aredir Labs (`docs/company/framework/`) |
| **Inputs** | Discovery-006; this classification; AEF-001/002; Inheritance; Promotion Process; Discovery-005; Bootstrap SYNC/ADOPTION (read-only); QS integration boundaries (read-only) |
| **Does** | Define normative language for modes, representations, ownership preservation, projection, adoption, and feedback — aligned to existing contracts |
| **Does not** | Create C11; rewrite AEF capability contracts; modify Bootstrap or QS; implement tooling; promote Phoenix; alter Mission |

**Why this successor (and not the others):**

| Alternative successor | Why not now |
| --- | --- |
| Authority-boundary clarification | **Completed by this package** |
| Existing capability-contract alignment | Follows canonical architecture; contracts should *reference* Distribution after it exists, not before |
| Company-architecture area establishment | Not justified (F9); use `framework/` |
| Additional evidence collection (Phoenix) | Useful later; not required to author the Labs-owned architecture |

---

## Success Criteria Check

| Question | Answer from this classification |
| --- | --- |
| What exactly is Capability Distribution? | Labs-owned AEF cross-capability architecture (company architectural standard) governing cross-repo movement of representations without moving authority |
| Who owns its definition? | Aredir Labs (AEF framework spine), collaborating with C8/C7/C1; QS owns its own methods |
| Which repositories merely implement or consume it? | Bootstrap (package); products & client repos (adopt/execute/retain); QS (methods + consume invariants); Ops/Publishing (project) |
| Is it internal to AEF or broader than AEF? | Authored as AEF framework architecture; **broader than AEF in application** |
| What canonical asset should be created next? | Capability Distribution Architecture (canonical) — AREDIR-ARCHITECTURE-007 |
| Where should that asset live? | `docs/company/framework/` in `aredirlabs-com` |

---

## Evidence Base

| Source | Use |
| --- | --- |
| AREDIR-DISCOVERY-006 | Model under classification |
| AREDIR-DISCOVERY-005 | Engagement/client boundary; ownership ≠ location |
| AEF-000, AEF-001, AEF-002, AEF-003 placeholder | Capability inventory, contracts, extraction boundary, doc-structure reservation |
| ENGINEERING_OPERATING_SYSTEM, ENGINEERING_CAPABILITY_MODEL | Principles; EOS vs AEF layers |
| PROJECT_INHERITANCE_MODEL, ENGINEERING_BLUEPRINT_SPECIFICATION, REFERENCE_REPOSITORY_SPECIFICATION | Inherit/sync/adopt |
| PROMOTION_PROCESS, DOCUMENTATION_GOVERNANCE, KNOWLEDGE_GOVERNANCE | Upward path; tiers; pattern vs standard force |
| ENGINEERING-MISSION-CONTRACT (+ registry/template as identity) | Artifact ≠ distribution authority |
| Bootstrap SYNC.md, ADOPTION_GUIDE, QUALITY_SYSTEMS_INTEGRATION.md (`aredir-project-bootstrap`) | Packaging vs authorship; QS reference-only |
| LABS-PROMOTION-001 | Multi-repo ownership split |
| ClassForge FOUNDATION-001, FRAMEWORK-SYNC-001, ASSESSMENT-001 | Consumer/implementer evidence |
| AQSF CAPABILITY-ARCHITECTURE-001, PUBLISHING-001, CAPABILITY-GOVERNANCE-001 (`aredir-quality-systems`) | Projection; QS sovereignty; Phoenix named validation context |
| FUTURE-CAPABILITY-002 | Thin Phoenix / future ops context |

---

## Related

- [AREDIR-DISCOVERY-006 — Capability Distribution Architecture](./AREDIR-DISCOVERY-006_CAPABILITY_DISTRIBUTION_ARCHITECTURE.md)
- [AREDIR-DISCOVERY-002 — Engineering Knowledge Classification](./AREDIR-DISCOVERY-002_ENGINEERING_KNOWLEDGE_CLASSIFICATION.md) (classification method precedent)
- [AEF-001 — Framework Capability Contracts](../company/framework/AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md)
- [AEF-002 — Bootstrap Extraction Boundary](../company/framework/AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md)
- [LABS-PROMOTION-001 — Architecture Audit and Quality Systems Integration](../company/reviews/LABS_PROMOTION_001_ARCHITECTURE_QUALITY_INTEGRATION.md)
