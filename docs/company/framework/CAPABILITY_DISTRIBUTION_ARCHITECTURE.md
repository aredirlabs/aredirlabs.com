# Capability Distribution Architecture

| Field | Value |
| --- | --- |
| **Name** | Capability Distribution Architecture |
| **Status** | Company Standard (Framework Architecture) |
| **Owner** | Aredir Labs |
| **Work item** | AREDIR-ARCHITECTURE-007 |
| **Version** | 1.0 |
| **Category** | Framework Architecture |
| **Classification authority** | [AREDIR-CLASSIFICATION-007](../../discovery/AREDIR-CLASSIFICATION-007_CAPABILITY_DISTRIBUTION_AUTHORITY_CLASSIFICATION.md) |
| **Discovery authority** | [AREDIR-DISCOVERY-006](../../discovery/AREDIR-DISCOVERY-006_CAPABILITY_DISTRIBUTION_ARCHITECTURE.md) |
| **Supporting discoveries** | [AREDIR-DISCOVERY-001](../../discovery/AREDIR-DISCOVERY-001_AEF_ARCHITECTURE_RECONSTRUCTION.md) through [AREDIR-DISCOVERY-005](../../discovery/AREDIR-DISCOVERY-005_CLIENT_ASSESSMENT_CAPABILITY_DISTRIBUTION_BOUNDARY.md) |
| **Last reviewed** | 2026-08-02 |
| **Next review due** | 2026-11-02 |

## Normative status

This document is the **canonical architectural authority for Capability Distribution** at Aredir Labs.

It is a **company architectural standard**: an AEF cross-capability architecture with company-wide force. It governs relationships between capabilities and repositories. Peer framework documents should **reference** this architecture for cross-repository representation and ownership boundaries rather than restating it.

It is **not**:

- a framework capability
- a capability contract
- a Bootstrap specification
- an implementation guide
- a synchronization specification

It **supersedes no existing architecture**. Capability contracts ([AEF-001](./AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md)), Bootstrap extraction boundaries ([AEF-002](./AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md)), EOS, Mission, Promotion Process, and Quality Systems authorities remain authoritative for their own domains.

| Conflict rule | Resolution |
| --- | --- |
| Capability ownership detail | [AEF-001](./AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md) remains canonical for who owns what |
| Bootstrap packaging detail | [AEF-002](./AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md) remains canonical for extraction classification |
| Knowledge return path | [Promotion Process](../PROMOTION_PROCESS.md) remains canonical for promotion procedure |
| Quality method substance | `aredir-quality-systems` remains canonical for AQSF/AVF |
| Inheritance consumption posture | [Project Inheritance Model](../PROJECT_INHERITANCE_MODEL.md) remains canonical for Adopt / Extend / Deviate |

---

## 1. Purpose

### Why Capability Distribution exists

Aredir-owned capabilities must appear in multiple repositories — Labs, Bootstrap, products, client engagements, and Quality Systems integrations — without collapsing ownership into “wherever the files sit.”

Capability Distribution exists to make that separation explicit and durable.

### Architectural problem

Without a shared distribution architecture, repository practice tends to conflate:

- location with ownership
- sync copies with forks of authority
- packaging with methodology authorship
- projection with system of record
- execution with ownership transfer
- engagement evidence with company intellectual property

### Governing statement

> **Capabilities may move representations across repository boundaries without transferring authority.**

Capability Distribution is the architectural model that separates **authority**, **representation**, **execution**, and **promotion** so Aredir-owned capabilities can cross repository boundaries while preserving ownership, provenance, versioning, upgradeability, and client/product independence.

---

## 2. Architectural Principles

These principles are established by discovery evidence. They do not invent a new operating system.

| Principle | Meaning |
| --- | --- |
| **Authority precedes representation** | Derived views, sync copies, installs, and publications never become the source of truth for the methodology they express |
| **Repository location does not determine ownership** | Presence of an asset in a repository does not by itself establish ownership |
| **Representation does not imply authority** | A local copy, reference, projection, or runtime form is not an authoritative redefinition |
| **Distribution preserves provenance** | Distributed representations retain identifiable relationship to their authoritative origin and applicable version or package pin |
| **Client evidence remains client-owned** | Engagement-specific evidence and accepted client deliverables remain in the client record unless explicitly and separately governed |
| **Framework evolution occurs only through governed promotion** | Reusable improvements return to authoritative sources through review and promotion — not by automatic import |
| **Capabilities remain authoritative at their origin** | Each capability’s owning authority retains definition and change rights for that capability’s substance |

These principles align with EOS constraints already in force — especially **canonical-first** and **products own implementation** — without rewriting EOS.

---

## 3. Core Concepts

### 3.1 Authority

**Authority** is who owns methodology (or a sibling method domain) and may change its governing definition.

| Authority | Owns |
| --- | --- |
| **Aredir Labs** | Company engineering methodology (AEF, EOS, governance, Knowledge Base, Architecture Audit, company promotion acceptance) |
| **Quality Systems** | AQSF/AVF quality evaluation, verification, evidence, and findings methods |
| **Product repository** | Product domain architecture, features, local decisions, and product-owned artifacts |
| **Client engagement record** | Client-scoped evidence and accepted permanent client deliverables |
| **Bootstrap** | Bootstrap-owned scaffolds and packaging machinery only — **not** methodology substance |

Authority is assigned by ownership contracts and repository roles. It is not acquired by copying files.

### 3.2 Representation

**Representation** is how methodology appears outside its authoritative home.

Examples of representation forms:

- **reference** — cite without local canonical copy
- **installed** — activated for local use without ownership transfer
- **generated** — produced from authoritative inputs for a local purpose
- **synchronized** — faithful distributed copy with provenance
- **projected** — audience- or workspace-derived view that does not own its sources

Representations are **not** new authorities. They are how authoritative methodology is made usable elsewhere.

### 3.3 Execution

**Execution** is where methodology is actually used — for example in a product repository, client engagement repository, or Labs delivery context.

Execution does **not** imply ownership. Aredir-owned methods may execute in a client or product repository while remaining Aredir-owned.

### 3.4 Promotion

**Promotion** is how generalized improvements return to an authoritative source.

Promotion:

- extracts durable, reusable intellectual property
- requires governance and review
- must **not** transfer client evidence, confidential facts, or product-only detail as if they were company methodology

Promotion is the upward counterpart of outward distribution. It is selective, not automatic.

---

## 4. Repository Model

```text
aredirlabs-com           ← methodology authority + promotion acceptance
aredir-quality-systems   ← quality method authority (sibling)
aredir-project-bootstrap ← packaging / distribution only
product repositories     ← domain authority + Adopt / Extend / Deviate
client engagement repos  ← execution + client record (when used)
```

### 4.1 Labs (`aredirlabs-com`)

| Dimension | Role |
| --- | --- |
| **Authority** | Canonical company methodology; company Knowledge Base; Architecture Audit; promotion acceptance for company standards |
| **Representation** | Authoritative representation of Labs-owned methodology |
| **Execution** | Labs delivery, framework evolution, and reference-platform work |
| **Promotion relationship** | Receives generalized promotion candidates; publishes promoted company assets for later adoption |

### 4.2 Bootstrap (`aredir-project-bootstrap`)

| Dimension | Role |
| --- | --- |
| **Authority** | Owns packaging scaffolds and bootstrap-owned templates only |
| **Representation** | Bootstrap representation of approved Labs methodology (sync/packaged forms) plus owned operational scaffolds |
| **Execution** | Packaging and adoption enablement — not methodology authorship |
| **Promotion relationship** | Does not own promotion acceptance; may receive packaging-improvement findings from adoption validation |

Bootstrap packages approved representations. Bootstrap does **not** become the owner of distributed methodology.

### 4.3 Product repositories

| Dimension | Role |
| --- | --- |
| **Authority** | Product domain, local decisions, implementation records, and product-homed artifacts (including product Missions when applicable) |
| **Representation** | Adopted / synced / referenced company methodology; local operational docs |
| **Execution** | Primary site of product engineering execution |
| **Promotion relationship** | Produces promotion candidates from reusable discoveries; consumes promoted assets via Adopt / Extend / Deviate |

### 4.4 Client engagement repositories

| Dimension | Role |
| --- | --- |
| **Authority** | Client engagement record and accepted permanent client deliverables |
| **Representation** | Installed or activated Aredir methodology for engagement use; generated engagement outputs |
| **Execution** | Engagement evaluation, evidence generation, remediation, and closure activities |
| **Promotion relationship** | May yield sanitized, generalized promotion candidates only; client evidence remains client-owned |

### 4.5 Quality Systems (`aredir-quality-systems`)

| Dimension | Role |
| --- | --- |
| **Authority** | AQSF/AVF methods and Quality Systems capability governance |
| **Representation** | Authoritative for quality methods; referenced (not absorbed) by Labs and Bootstrap |
| **Execution** | Quality engagements and validations under QS methods |
| **Promotion relationship** | Owns promotion/maturity of QS capabilities; Labs Promotion Process remains acceptance authority for company engineering standards |

Quality Systems is a **sibling authority**. Capability Distribution integrates with it by reference and boundary rules. It does not absorb AQSF into AEF, and Bootstrap does not package AQSF procedure bodies.

---

## 5. Distribution Modes

Approved modes describe **architectural relationships**, not tooling.

### 5.1 Reference

| Field | Definition |
| --- | --- |
| **Purpose** | Consume methodology by citation without establishing a local canonical copy |
| **Ownership** | Remains at the authoritative origin |
| **Authority** | Unchanged |
| **Appropriate usage** | External or evolution-spine assets; Quality Systems consultation; cases where local discoverability does not require a synced tree |

### 5.2 Install

| Field | Definition |
| --- | --- |
| **Purpose** | Activate methodology or runtime assets in a consuming repository for execution |
| **Ownership** | Methodology ownership retained by origin; generated local outputs follow execution/record rules |
| **Authority** | Unchanged by installation |
| **Appropriate usage** | Temporary or engagement-scoped activation (for example assessment runtime) where execution must be local |

### 5.3 Synchronize

| Field | Definition |
| --- | --- |
| **Purpose** | Distribute a faithful representation of approved methodology with provenance |
| **Ownership** | Remains with Labs (or other origin); local copy is not a fork of authority |
| **Authority** | Unchanged; consumers must not redefine synced company standards without governed Deviate |
| **Appropriate usage** | Inheritance of `docs/company/` methodology into Bootstrap packs and product repositories |

### 5.4 Compose

| Field | Definition |
| --- | --- |
| **Purpose** | Coordinate multiple owned capabilities or artifacts without absorbing their authority |
| **Ownership** | Each participant retains ownership of its substance |
| **Authority** | Composition coordinates; it does not create a new owner of the composed parts |
| **Appropriate usage** | Assessment chains (Architecture Audit + AQSF/AVF); Mission coordination by reference; cross-capability workflows |

### 5.5 Generate

| Field | Definition |
| --- | --- |
| **Purpose** | Produce local artifacts from authoritative inputs or scaffolds |
| **Ownership** | Generated domain/engagement outputs are owned by the generating record; generated methodology text sourced from company assets remains origin-owned in substance |
| **Authority** | Generation does not mint methodology authority |
| **Appropriate usage** | Findings, reports, scaffolds, and other derived work products |

### 5.6 Promote

| Field | Definition |
| --- | --- |
| **Purpose** | Return generalized reusable learning to an authoritative source under governance |
| **Ownership** | Only sanitized, reusable IP may become company (or QS) assets; client/product facts stay local |
| **Authority** | Promotion acceptance remains with the owning authority’s promotion process |
| **Appropriate usage** | Knowledge Base candidates; QS capability maturity; packaging improvements routed to the correct owner |

### Related consumption posture

**Inherit** (Adopt / Extend / Deviate) is the governed consumption posture defined by the [Project Inheritance Model](../PROJECT_INHERITANCE_MODEL.md). It is how products relate to distributed representations. It is not a separate ownership-transfer mode.

---

## 6. Representation Types

All non-authoritative forms below are **projections or distributed appearances of authoritative methodology** (or of local execution records). They do not replace authoritative homes.

| Representation type | Meaning |
| --- | --- |
| **Authoritative Representation** | The canonical definition in its owning repository or authority domain |
| **Execution Representation** | Working or runtime form used where methodology is applied |
| **Bootstrap Representation** | Packaged sync snapshot or bootstrap-owned scaffold used for inheritance distribution |
| **Client Representation** | Engagement-facing or client-record form of methods, outputs, or deliverables |
| **Assessment Representation** | Composed assessment views, reports, or installed assessment assets used in evaluation |
| **Documentation Representation** | Documentation-tier appearances (canonical, operational, implementation) under Documentation Governance |

**Rule:** Representations are projections of authoritative methodology or of local execution records. A documentation, bootstrap, client, or assessment representation does not become authoritative merely by existing.

---

## 7. Capability Relationships

Capability Distribution relates to existing architecture **without redefining** those responsibilities.

| Concern | Relationship |
| --- | --- |
| **AEF** | Supplies capability inventory and ownership contracts that Distribution must respect. Distribution is cross-capability architecture over AEF — not an AEF capability. |
| **EOS** | Provides operating model and principles (canonical-first; products own implementation). Distribution elaborates cross-repo representation rules; it does not replace EOS. |
| **Bootstrap** | Primary packaging channel for approved Labs representations. Implements distribution; does not own methodology. |
| **Mission** | Orientation artifact that may coordinate work by reference. Mission is not a distribution mechanism and not a capability. |
| **Knowledge** | Durable IP store (C7 / Knowledge Base) that Distribution adopts outward and Promotion feeds inward. |
| **Promotion** | Authoritative upward path for reusable company knowledge. Distribution depends on Promotion for feedback; it does not replace Promotion Process procedure. |
| **Documentation** | Ownership tiers and maintenance rules shape documentation representations. Documentation Governance remains authoritative for doc practice. |
| **QA** | Labs QA standards may be distributed as company methodology representations; AQSF/AVF remain Quality Systems-owned and are integrated by reference. |
| **Products** | Domain-authoritative consumers that Adopt / Extend / Deviate and execute locally. |
| **Client engagements** | Execution and record boundaries where Aredir methods may run without ownership transfer. |

Collaborating AEF surfaces for this architecture (per classification): **C8** (packaging / inheritance), **C7** (promotion / feedback), and **C1** (operating principles). Collaboration does not transfer sole ownership of those capabilities’ substance to this document.

---

## 8. Feedback Architecture

```text
Products / Client engagements / Validation contexts
        │
        ▼
Local experience and evidence
        │
        ▼
Classification of what may leave the local boundary
        │
        ├─ Client evidence ──────────────► remains local
        ├─ Engineering discoveries ──────► local record; may seed candidates
        ├─ Generalized methodology ──────► promotion candidate (sanitized)
        ├─ Knowledge promotion ──────────► governed review → owning authority
        └─ Framework evolution ──────────► Labs / QS owning repos only
                │
                ▼
        Redistribution of updated authoritative representations
```

| Path | Meaning |
| --- | --- |
| **Client evidence** | Engagement-specific findings, confidential facts, client deliverables, and source materials stay in the client record |
| **Engineering discoveries** | Local learnings and implementation evidence remain authoritative in their home repository until deliberately candidated |
| **Generalized methodology** | De-identified reusable methods, patterns, or schemas eligible for promotion review |
| **Knowledge promotion** | Governed acceptance into the Knowledge Base or other owning store |
| **Framework evolution** | Changes to AEF/EOS/QS boundaries and contracts originate in owning authorities — not in Bootstrap forks or silent product divergence |

---

## 9. Architectural Invariants

These rules must always remain true.

1. **Authority cannot be transferred by copying.**
2. **Repositories cannot become authoritative for foreign methodology merely by containing representations.**
3. **Bootstrap cannot own distributed methodology.**
4. **Client repositories own their generated evidence and accepted permanent deliverables.**
5. **Promotion requires governance.**
6. **Representations must preserve provenance** to their authoritative origin and applicable version or package identity.
7. **Execution does not transfer ownership.**
8. **Projection never becomes system of record** for the projected sources.
9. **Quality Systems method substance is not absorbed into AEF or Bootstrap packaging.**
10. **Product domain authority remains with product repositories** under Adopt / Extend / Deviate.

---

## 10. Relationship Diagram

```text
Aredir Labs Authority
        │
        ▼
Capability Distribution
        │
        ├──────────────┐
        ▼              ▼
Bootstrap       Client Repository
        │              │
        ▼              ▼
Representation   Execution
        │              │
        └──────┬───────┘
               ▼
        Client Deliverables
               │
               ▼
   Knowledge Promotion (Governed)
               │
               ▼
       Aredir Methodology
```

Expanded repository context:

```text
              Aredir Labs Authority
                        │
                        ▼
              Capability Distribution
                        │
          ┌─────────────┼─────────────┐
          ▼             ▼             ▼
     Bootstrap    Product Repos   Quality Systems
   Representation   Execution    (sibling methods;
          │             │         by reference /
          └──────┬──────┘         composition)
                 ▼
        Client Engagement Execution
                 │
                 ▼
          Client Deliverables
                 │
                 ▼
     Knowledge Promotion (Governed)
                 │
                 ▼
         Aredir Methodology
```

---

## 11. Architectural Scope

### Capability Distribution governs

- relationships among capabilities and repositories
- ownership preservation across boundaries
- representation types and distribution modes
- promotion boundaries for return of reusable learning

### Capability Distribution does not govern

- implementation of packaging or sync mechanisms
- synchronization tooling
- Git workflows
- automation design
- repository management operations
- day-to-day engineering process detail (owned by EOS, Feature Delivery, and related standards)
- customer operations platforms or external work-management systems

---

## 12. Future Extension Points

The following may be addressed by later packages. This architecture documents them as extension points only — it does **not** define them.

- automated synchronization
- capability packaging formats beyond current Bootstrap contracts
- implementation services packaging
- assessment runtime packaging
- future operations platform integrations
- repository orchestration

Any extension must preserve the invariants in §9 and must not move methodology authority into Bootstrap, products, or projections.

---

## Verification Record

| Check | Result |
| --- | --- |
| Alignment with Discovery-006 | Observed — purpose, modes, roles, representations, feedback, and invariants preserved |
| Alignment with Classification-007 | Observed — Labs-owned AEF cross-capability / company architectural standard; location `docs/company/framework/` |
| No conflicts with AEF capability contracts | Observed — no C11; no contract rewrites; C8/C7/C1 collaboration only |
| No conflicts with Bootstrap boundaries | Observed — Bootstrap packages; does not own methodology |
| No conflicts with Quality Systems authority | Observed — sibling authority; reference/composition; no AQSF absorption |
| No conflicts with Promotion Process | Observed — Promotion remains upward acceptance authority |
| No architectural authority reassigned | Observed — Labs, QS, products, clients, Bootstrap roles unchanged |

---

## Related

- [AREDIR-CLASSIFICATION-007 — Capability Distribution Authority Classification](../../discovery/AREDIR-CLASSIFICATION-007_CAPABILITY_DISTRIBUTION_AUTHORITY_CLASSIFICATION.md)
- [AREDIR-DISCOVERY-006 — Capability Distribution Architecture (Discovery)](../../discovery/AREDIR-DISCOVERY-006_CAPABILITY_DISTRIBUTION_ARCHITECTURE.md)
- [AREDIR-DISCOVERY-005 — Client Assessment Capability Distribution Boundary](../../discovery/AREDIR-DISCOVERY-005_CLIENT_ASSESSMENT_CAPABILITY_DISTRIBUTION_BOUNDARY.md)
- [AEF-001 — Framework Capability Contracts](./AEF_001_FRAMEWORK_CAPABILITY_CONTRACTS.md)
- [AEF-002 — Bootstrap Extraction Boundary](./AEF_002_BOOTSTRAP_EXTRACTION_BOUNDARY.md)
- [Project Inheritance Model](../PROJECT_INHERITANCE_MODEL.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [Engineering Operating System](../ENGINEERING_OPERATING_SYSTEM.md)
- [Documentation Governance](../governance/DOCUMENTATION_GOVERNANCE.md)
