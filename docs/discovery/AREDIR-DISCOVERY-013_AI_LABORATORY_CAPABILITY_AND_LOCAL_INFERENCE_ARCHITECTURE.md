# AREDIR-DISCOVERY-013 — AI Laboratory Capability and Local Inference Architecture

| Field | Value |
| --- | --- |
| **Identifier** | AREDIR-DISCOVERY-013 |
| **Type** | Research / Discovery architecture record |
| **Status** | Complete — bounded recommendation; no implementation or purchase authorized |
| **Review date** | 2026-08-30 |
| **Production Engineering Work** | AI Laboratory Capability and Local Inference Architecture |
| **Repository baseline** | `aredirlabs-com` `main` at `80080aa4a7ddb96900f38416fb54e6e8116ef80a` |
| **Scope** | Determine whether and how Aredir Labs should establish durable AI experimentation capability, including a first local-inference experiment |
| **Outcome** | Keep experimentation governed by existing Project, Engineering Work, evidence, decision, and promotion concepts; authorize requirements closure next, not a product domain, production dependency, node platform, or hardware purchase |

---

## 1. Status, authority, and classification

This is a repository-grounded discovery record. It is repository-authoritative for the findings made by this discovery, but it is not a company standard, an ADR, an implementation package, a procurement authorization, or an authorization to connect experimental infrastructure to production.

The following labels are used deliberately:

- **Verified repository fact** — directly supported by the inspected repository baseline.
- **Known physical evidence** — supplied inventory information that was not independently inspected in this repository session.
- **Observation** — a bounded synthesis of verified facts or supplied evidence.
- **Hypothesis** — a proposition that requires an experiment or additional evidence.
- **Recommendation** — a proposed next action or boundary; it does not become authority merely by appearing here.

No application code, schema, migration, runtime configuration, infrastructure, production data, or external system was changed or inspected.

---

## 2. Repository baseline inspected

### 2.1 Baseline

**Verified repository fact:** Discovery was performed against `main` at commit `80080aa4a7ddb96900f38416fb54e6e8116ef80a` (`refactor(engineering-work): unify canonical operating surface`, committed 2026-08-29T12:47:24-07:00).

**Verified repository fact:** The worktree already contained unrelated untracked `.tmp-shots/`, `scripts/probe-prototype-data.mts`, and `scripts/shoot-prototype.mjs` artifacts. They were not read as authority, changed, removed, or included in this discovery.

**Verified repository fact:** `docs/discovery/README.md` is the registry for architectural and artifact discovery records and states that those records are not promoted company standards until governed promotion occurs. Its numbered sequence reached `AREDIR-DISCOVERY-012`; this record therefore follows the existing sequence as `AREDIR-DISCOVERY-013`.

### 2.2 Authoritative documents and code examined

| Concern | Sources examined | Authority used in this report |
| --- | --- | --- |
| Product purpose and evolution | `docs/company/AREDIR-VISION-001_PRODUCT_OPERATING_ENVIRONMENT_PHILOSOPHY.md` | Aredir is an engineering operating environment; AI may support it but does not define it; new capability must earn its shape through observed use and a small slice. |
| Company operating/capability model | `docs/company/ENGINEERING_OPERATING_SYSTEM.md`; `docs/company/ENGINEERING_CAPABILITY_MODEL.md` | Current methodology and capability posture; Research & Innovation is explicitly deferred. |
| Capability/repository boundaries | `docs/company/framework/CAPABILITY_DISTRIBUTION_ARCHITECTURE.md`; `docs/discovery/REPOSITORY-BOUNDARY-ASSESSMENT.md` | Authority, representation, execution, projection, and promotion remain distinct; repository bodies retain authority. |
| Project and Engineering Work | `docs/company/governance/PROJECT_GOVERNANCE.md`; `docs/engineering/ENGINEERING-WORK-DOMAIN-CONTRACT.md`; `docs/engineering/ENGINEERING-WORK-RELATIONSHIP-MODEL.md`; `src/lib/db/schema.ts` | Project is the operational container; Engineering Work can represent Research/Discovery and manages the intended outcome rather than artifact bodies. |
| Lifecycle and decision history | `docs/engineering/ENGINEERING-WORK-LIFECYCLE.md`; `docs/engineering/ENGINEERING-WORK-LIFECYCLE-UPDATE-001.md`; `src/lib/workspace/engineering-work-provenance.ts`; `src/lib/db/schema.ts` | Current state plus append-only history, distinct action/decision actors, decision basis, authority, and provider-neutral agent provenance. |
| Repository evidence | `docs/engineering/ENGINEERING-WORK-REPOSITORY-REFERENCE-CONTRACT.md`; `src/lib/workspace/repository-reference.ts`; repository-reference schema and migration | Engineering Work cites repository-authoritative evidence without ingesting or owning its body. |
| Operational Focus | `docs/discovery/AREDIR-DISCOVERY-011_ENGINEERING_WORK_PRIORITIZATION_AND_OPERATIONAL_SELECTION_SEMANTICS.md`; `docs/discovery/AREDIR-DISCOVERY-012_OPERATIONAL_FOCUS_PERSISTENCE_AND_LIFECYCLE_ARCHITECTURE.md`; `src/lib/workspace/operational-focus.ts`; focus schema | Focus is explicit, human-authorized, project-scoped selection; it is independent of priority, continuation, and attention. |
| Current-state architecture | `docs/discovery/AREDIR-DISCOVERY-009_CURRENT_STATE_INFORMATION_ARCHITECTURE_INVENTORY.md`; `docs/discovery/AREDIR-DISCOVERY-010_PROJECT_OPERATIONAL_STATE_AUTHORITY_AND_PROJECTION_ARCHITECTURE.md` | Structured Workspace and repository documentation are separate authority systems; projections must not invent truth. |
| Experiment precedent | `docs/discovery/AREDIR-EXPERIMENT-001_OPERATING_FIELD_FINDINGS_SYNTHESIS.md` | Disposable experiments may yield durable findings without promoting the prototype or authorizing implementation. |
| Evidence and learning | `docs/company/knowledge-patterns/EVIDENCE_LIFECYCLE_PATTERN.md`; `docs/company/PROMOTION_PROCESS.md`; `docs/engineering/ENGINEERING_FINDINGS_LIFECYCLE.md` | Observation, evidence, interpretation, knowledge, decision, outcome, and new observation remain distinct; promotion is intentional and evidence-gated. |
| AI behavior and evaluation | `docs/company/governance/AI_GOVERNANCE.md`; `docs/company/architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md`; `docs/company/ai-patterns/AI_EVALUATION_FRAMEWORK.md`; `docs/company/architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md` | AI work requires explicit layer ownership, bounded context/contracts, evaluation scenarios, regression evidence, and human/application authority. |
| Authentication and authorization | `docs/discovery/AUTHENTICATION-INVENTORY.md`; `docs/engineering/AUTHENTICATION-USER-JOURNEY.md`; `docs/engineering/AREDIR-AUTH-EXPERIENCE-001.md`; `src/lib/auth.ts`; `src/lib/auth-config.ts`; `src/lib/workspace-access.ts`; `src/proxy.ts` | Better Auth identity exists; authorization roles, membership, ownership, and full server-side read enforcement do not. |
| Runtime, environments, secrets | `README.md`; `.env.example`; `docs/engineering/environment-strategy.md`; `docs/engineering/ENVIRONMENT-MAPPING.md`; `docs/engineering/AREDIR-RUNTIME-001.md`; `docs/engineering/repository-standards.md`; `package.json` | Production is Vercel + Neon; environment secrets stay outside Git; preview database mapping remains unresolved in existing evidence. |
| Existing implementation surface | `package.json`; `src/`; `drizzle/`; targeted repository search for providers, inference runtimes, model code, GPUs, and lab concepts | No current production inference provider, local-model runtime, model catalog, experiment entity, or lab-node integration exists. |

---

## 3. Current architecture findings

### 3.1 Existing concepts already govern the work

1. **Verified repository fact:** A Research type with a Discovery or Research workflow is already a valid Engineering Work shape. The domain contract explicitly includes research, discovery, architecture exploration, verification, innovation, and promotion work.
2. **Verified repository fact:** Every Engineering Work record belongs to exactly one Project. Project remains the operational container; Engineering Work remains the bounded intended outcome.
3. **Verified repository fact:** Engineering Work may reference implementation/discovery/architecture packages, findings, verification evidence, decisions/ADRs, reviews, promotion candidates, and knowledge sources without becoming authority for their bodies.
4. **Verified repository fact:** Project notes can represent decisions, risks, and QA memory; Project documents can represent architecture, decision, QA, research, and reference material; prompts record execution history. These are distinct records, not subtypes of Engineering Work.
5. **Verified repository fact:** Engineering Work history can distinguish human, AI agent, system, and integration actors; observation, recommendation, investigation, adjudication, authorization, and execution roles; and human, delegated-policy, verification-policy, approval-gate, and system-rule authority.
6. **Verified repository fact:** Agent provenance can record provider, model, model version, runtime ID, policy, instruction reference, and evidence references. The code explicitly says this structure does not grant authority, invoke AI, evaluate policy, or perform a transition.
7. **Verified repository fact:** Operational Focus is a human-authorized shared Project selection over active or in-review Work. It must not be inferred from priority, recency, identifiers, or machine recommendation.

**Observation:** These concepts are sufficient to govern an initial AI experiment. A first-class AI Laboratory product domain is not required to establish accountable scope, evidence, history, selection, decisions, or promotion.

### 3.2 Existing concepts do not yet form an experimentation platform

1. **Verified repository fact:** `ENGINEERING_CAPABILITY_MODEL.md` lists Research & Innovation as deferred: exploratory work is tracked in project notes and no company R&D process exists.
2. **Verified repository fact:** The production dependency set contains no AI inference SDK or runtime client. Repository search found no production provider, inference endpoint, model catalog, experiment model, node model, or AI-lab integration.
3. **Verified repository fact:** The schema has no first-class entities for experiments, evaluations, models, runtimes, providers, datasets, compute nodes, or deployments.
4. **Verified repository fact:** The promoted AI standards govern production AI feature behavior and evaluation. They do not define hardware fleet operations, model-serving infrastructure, experiment scheduling, or node administration.
5. **Verified repository fact:** Quality Systems is a sibling authority for AQSF/AVF quality evaluation, evidence, confidence, and findings methods. Aredir Labs must reference that authority rather than absorb it.

**Observation:** The repository supports running and governing experiments as work, but it does not support operating a durable laboratory service. Creating that platform now would be speculative architecture.

### 3.3 Production architecture and trust boundary

1. **Verified repository fact:** Production Aredir is a Next.js 16.2.7 application hosted on Vercel with Neon PostgreSQL and Better Auth.
2. **Verified repository fact:** Production secrets are expected in Vercel settings or an approved secret manager, never Git. Local, preview, and production credentials are intended to be distinct.
3. **Verified repository fact:** Workspace registration is allow-list gated, but the repository has no roles, project membership, ownership, field-level permissions, or user-specific filtering. The route proxy checks cookie presence; mutations perform actual session validation.
4. **Verified repository fact:** The current auth model is shared Workspace access, not an infrastructure administration control plane.

**Observation:** Production Aredir authentication cannot be reused as sufficient authorization for a remotely administered AI node. Doing so would overstate the current security model and couple two trust domains.

---

## 4. Observations, evidence, and hypotheses

| ID | Classification | Statement | Evidence / falsification path |
| --- | --- | --- | --- |
| O1 | Observation | The immediate need is learning about local inference feasibility, not operating a lab product. | Active Work is Research/Discovery; no implemented lab/inference domain exists; only one candidate machine is known. |
| O2 | Observation | “AI Laboratory” is currently a working capability label, not an earned domain boundary. | Product vision requires observed use before expansion; Research & Innovation remains deferred. |
| O3 | Observation | The most durable reusable capability may eventually be general experimentation/evaluation, not AI-specific lab management. | The Evidence Lifecycle and experiment precedent are domain-neutral; AI Evaluation adds AI-specific criteria only where needed. |
| O4 | Observation | Physical compute identity is operational infrastructure inventory, not product truth. | Existing Project/Engineering Work contracts have no node entity and prohibit premature generic artifact/entity creation. |
| H1 | Hypothesis | A low-cost local node can provide useful privacy, offline, latency, or cost learning for bounded inference workloads. | Requires selected workload, executable model, measurements, and comparison against a hosted baseline. |
| H2 | Hypothesis | The candidate GTX 1660 6 GB system may run some quantized or otherwise memory-bounded models for experimentation. | Requires complete hardware inventory, compatibility check, runtime selection, and measured execution. VRAM alone is insufficient evidence. |
| H3 | Hypothesis | Repeated experiments may justify a durable experiment registry or general Laboratory capability. | Require at least two materially different, successfully governed experiments and demonstrated coordination/query pain that existing records cannot handle. |
| H4 | Hypothesis | Local execution could reduce exposure of selected sensitive inputs. | Requires a data classification and flow review; local execution does not itself prove secure storage, administration, or egress. |
| H5 | Hypothesis | A hosted model may remain the better control or execution path for some workloads. | Compare quality, latency, cost, privacy constraints, availability, operational effort, and reproducibility on the same versioned scenarios. |

---

## 5. Architectural options considered

| Option | Description | Benefits | Risks / conflicts | Disposition |
| --- | --- | --- | --- | --- |
| A. First-class AI Laboratory product domain | Add product concepts, UI, schema, and managed nodes now. | Strong visibility if a mature recurring domain already existed. | No repeated-use evidence; conflicts with small-slice philosophy and deferred Research & Innovation posture; creates new authorities prematurely. | **Reject now.** |
| B. Durable AI-specific lab service outside production | Operate a separate model-serving and experiment service with its own security boundary. | Could support repeated local/hosted evaluation later. | Still assumes recurring demand, administration, uptime, and catalog requirements not established by evidence. | **Defer pending repeated experiments.** |
| C. General experimentation/laboratory capability | Establish domain-neutral experiment definitions, executions, evidence, and decisions. | Better abstraction if multiple domains need it. | One AI use case is insufficient to earn a generalized model; risks an abstract platform before real work. | **Retain as hypothesis; do not implement.** |
| D. Specialized Engineering Work plus repository evidence | Use the active Project-scoped Research/Discovery Work, a repository discovery/experiment record, existing evidence references, lifecycle history, and promotion path. | Fits current authorities; minimal; reversible; preserves learning without product/schema changes. | Manual artifact discipline; limited aggregate experiment querying. | **Recommend now.** |
| E. Ad hoc machine setup without governed Work/evidence | Install a runtime and try models without durable scope or results. | Fastest first execution. | Results become anecdotal, provenance is weak, security scope is unclear, and purchase decisions cannot be reconstructed. | **Reject.** |

---

## 6. Recommended capability boundary

### 6.1 Recommendation

**Recommendation:** Treat AI experimentation as specialized, Project-scoped Engineering Work for the next bounded cycle. Use existing repository evidence and decision-history semantics. Do not create an AI Laboratory product domain, durable service, node entity, experiment schema, model catalog, or general Research & Innovation capability yet.

The working term **AI Lab Node 01** may identify a physical/virtual execution target in inventory and evidence, but must not imply that a Lab product domain or managed fleet exists.

### 6.2 Concept mapping

| Experimental concern | Existing Aredir concept | Boundary |
| --- | --- | --- |
| Why the experiment exists and what outcome it seeks | Engineering Work summary/objective and current next action | Operational authority in Workspace; detailed protocol remains repository-authoritative. |
| Experiment protocol | Repository discovery/experiment document | Versioned artifact; cite from Engineering Work. |
| Physical or virtual node | External/infrastructure inventory entry referenced by protocol/evidence | No first-class Aredir entity unless repeated operational need proves it. |
| Model artifact | Versioned external/repository reference containing model name/version/revision, source, license, digest, format, quantization, and retrieval date | The model binary should not be committed to this repository. |
| Runtime | Versioned execution dependency recorded in an environment manifest/results record | Runtime is execution infrastructure, not decision authority. |
| Provider | Execution-source metadata (local runtime or hosted provider) | Provider-neutral comparison dimension; not a Project or Work type. |
| Experiment | One bounded protocol and one or more executions under the active Engineering Work | Do not create a persistent Experiment entity for the first case. |
| Evaluation scenario | Versioned fixtures/criteria governed by the AI Evaluation Framework and, where applicable, Quality Systems references | Inputs must be synthetic or approved; criteria defined before execution. |
| Raw measurements | Observation | Preserve command/runtime/version context and timestamps. |
| Curated result set | Evidence | Record relevance, provenance, quality, limitations, and artifact digest. |
| Explanation of results | Interpretation | Keep separate from measurements. Multiple interpretations may coexist. |
| Current supported conclusion | Knowledge / discovery outcome | Provisional and traceable to evidence. |
| Continue, stop, purchase, or promote | Human decision recorded through Work history and/or a decision/ADR artifact | A model result or agent recommendation cannot authorize the decision. |
| Reusable method | Promotion candidate | Must pass the existing governed Promotion Process; no automatic promotion. |

### 6.3 Threshold for reconsidering a durable capability

Reconsider a dedicated or general laboratory capability only when evidence establishes all of the following:

1. at least two materially different experiments recur beyond one Work record;
2. existing Work, repository references, and documents cause demonstrated coordination or traceability failure;
3. stable concepts and lifecycles have emerged from usage rather than speculation;
4. an owner and operating responsibility exist for security, patching, inventory, evaluation integrity, and retirement;
5. the capability provides measurable value beyond a documented runbook and versioned evidence; and
6. an EOS review intentionally matures the currently deferred Research & Innovation capability.

Even then, evaluate the general experimentation boundary before choosing an AI-specific domain.

---

## 7. Security and infrastructure boundary

### 7.1 Authority boundary

**Recommendation:** Experimental infrastructure is a separate trust and availability domain. Production Aredir may cite its evidence after human review; it must not depend on the node for page rendering, authentication, database operations, Engineering Work lifecycle commands, Operational Focus, repository evidence access, or any required production path.

```text
Production Aredir (Vercel + Neon + Better Auth)
        |
        | no required runtime dependency; no inbound trust inheritance
        v
Human-reviewed, repository-authoritative result/evidence references
        ^
        |
Isolated experimental execution boundary (AI Lab Node 01 or hosted provider)
```

Results move into Aredir through deliberate evidence review and repository citation, not through an always-on production API dependency.

### 7.2 Required controls before a local execution

| Concern | Minimum discovery/experiment control | Deferred mature control |
| --- | --- | --- |
| Authentication | Named local administrator account; no shared default credential; disable unused accounts. | Central identity/SSO integration. |
| Authorization | Least-privilege admin versus execution roles if the chosen runtime exposes roles; Aredir Workspace auth does not grant node access. | Organization/project RBAC and delegated automation policy. |
| Secrets | No production Aredir, Neon, Vercel, Better Auth, or personal provider secrets on the node. Store any experiment-only token outside Git and logs; rotate on exposure. | Central secret manager integration and automated rotation. |
| Network isolation | Private LAN or host-only access; deny unsolicited inbound traffic; no public inference endpoint; explicit firewall rules. | Segmented lab VLAN, gateway, service mesh, or zero-trust overlay if earned. |
| Ingress | Admin and inference access only from explicitly approved devices/addresses; encrypted transport where traffic leaves the host. | Managed gateway, certificates, rate limiting, and audited access broker. |
| Egress | Default to only required OS/package/model sources; record model downloads; prohibit arbitrary data exfiltration paths. | Egress proxy, allow-list enforcement, and network monitoring. |
| Remote administration | Prefer local console for the first experiment. If remote access is required, use a private network/VPN, key-based access, host firewall, and logged administration; never expose a management port directly to the internet. | Central device management and audited bastion. |
| Patch posture | Supported OS, current security updates, supported driver/runtime versions, and an inventory snapshot before execution. | Fleet patch/health management. |
| Model provenance | Record source, publisher, exact revision, license/use restrictions, file digest, format/quantization, retrieval date, and scan/review result. | Signed internal catalog, automated policy evaluation, provenance attestations. |
| Supply chain | Use authoritative package/model sources; pin versions/digests; do not execute unreviewed model repository code or installation scripts. | Reproducible images, SBOM, signature verification, malware scanning pipeline. |
| Data handling | Synthetic/public fixtures by default. Define allowed classification, minimization, retention, deletion, and output review before any non-public data. | Formal data-loss prevention, dataset registry, and retention enforcement. |
| Logging | Record operational metadata and measurements without prompts, tokens, secrets, or sensitive source data unless explicitly approved. | Central tamper-evident audit/observability. |
| Availability | Failure or shutdown affects only the experiment. No production fallback is needed because no production dependency is allowed. | Availability targets only after a separate production-serving decision. |
| Decommissioning | Document how models, caches, fixtures, tokens, accounts, and storage are removed or retained after the experiment. | Asset lifecycle and certified erasure policy. |

### 7.3 Data classes prohibited from the first experiment

**Recommendation:** Until a separate data classification and approval exists, do not use production database extracts, authentication/session data, secrets, private customer/client material, regulated data, proprietary cross-project content, or personal data. Use synthetic or intentionally public fixtures that can be retained with the result record.

---

## 8. Local versus hosted execution

### 8.1 Recommendation

Local and hosted execution are experiment dimensions, not identity choices for Aredir. The first protocol should define the workload and evaluation criteria before selecting a runtime. If comparison is useful, execute the same versioned scenarios against one local candidate and one hosted baseline without placing either in a production request path.

| Dimension | Local execution | Hosted execution | Required evidence |
| --- | --- | --- | --- |
| Data boundary | Inputs may remain on controlled local storage, subject to node security. | Inputs leave the local boundary under provider terms/configuration. | Data-flow diagram and approved fixture classification. |
| Availability | Dependent on node condition and local administration. | Dependent on provider/service/network. | Failure behavior; neither may affect production. |
| Cost | Hardware, power, time, maintenance, and opportunity cost. | Usage, storage, egress, and account administration. | Measured workload-normalized cost, not list-price intuition. |
| Capability | Constrained by local memory/compute/runtime compatibility. | Broader model/runtime choices may be available. | Scenario quality and performance results. |
| Reproducibility | Can be strong with pinned artifacts and an environment manifest. | Requires provider/model version and parameter capture; provider changes may be opaque. | Exact revisions, parameters, timestamps, and repeat runs. |
| Security effort | Node hardening and physical/network controls are Aredir responsibilities. | Vendor, account, contract, and API-key controls are shared responsibilities. | Threat/data review for the selected path. |

**Recommendation:** Hosted service availability must not become a fallback requirement for a local experiment, and local-node availability must not become a fallback requirement for production Aredir. A later production AI feature must make its own provider, degradation, and availability decision under a separate architecture package.

---

## 9. Implications for production Aredir

### 9.1 Preserve

- Production topology, schema, application code, and deployment remain unchanged.
- Project and Engineering Work remain the operational authorities.
- Repository documents remain authoritative for protocol, results, and decisions; Workspace stores citations and operational metadata.
- Human selection remains the only baseline authority for Operational Focus.
- AI/agent outputs remain observations, interpretations, or recommendations unless an explicit governed authority says otherwise.

### 9.2 Prohibit in the initial experiment

- No synchronous or asynchronous production call from Aredir to the node.
- No webhook, inbound tunnel, public endpoint, database connection, or shared secret between production and the node.
- No production UI or schema for models, providers, nodes, experiments, or evaluations.
- No ingestion or synchronization service for experiment artifacts.
- No production data export to the node.
- No representation of node health as Project or Engineering Work lifecycle truth.

### 9.3 Later promotion path

If an experiment yields an implementation candidate:

1. close the evidence loop in the Research/Discovery Work with a concise outcome and unresolved uncertainty;
2. attach verified repository evidence and any human decision/ADR;
3. create a new, related implementation-oriented Engineering Work record rather than changing the original workflow;
4. define production architecture, provider/data/security/availability boundaries, acceptance criteria, and rollback in that successor package; and
5. separately candidate only genuinely reusable methods through the Promotion Process.

The baseline relationship implementation may not yet support a structured Work-to-Work link. Until it does, record the predecessor/successor identifiers in both Work summaries/next actions and repository artifacts without pretending a structured relation exists.

---

## 10. Implications for AI Lab Node 01

### 10.1 Known physical evidence

| Component | Classification | Current conclusion |
| --- | --- | --- |
| Zotac GTX 1660, 6 GB VRAM | Known physical evidence | Candidate reusable accelerator; constrains feasible model/runtime combinations but does not determine them. |
| 32 GB Corsair Vengeance Pro DDR4-3200 | Known physical evidence | Candidate reusable memory; motherboard/CPU compatibility remains unknown. |
| Existing case | Known physical evidence | Candidate reusable enclosure; form factor, airflow, and fit are not inventoried. |
| Power supply believed functional | Known physical evidence with uncertainty | Model, wattage, connectors, age, and condition must be inventoried and safely verified. |
| Storage not inventoried | Known physical evidence gap | Capacity, health, interface, and secure-erasure posture are unknown. |
| CPU not identified | Known physical evidence gap | Platform compatibility and runtime sufficiency are unknown. |
| Motherboard physically damaged and unusable | Known physical evidence | The machine is not currently an executable node. |

### 10.2 Assessment

**Observation:** Node 01 is an incomplete candidate assembly, not an available capability. The unusable motherboard and missing CPU/storage/PSU facts prevent compatibility, safety, capacity, cost, and purchase decisions.

**Hypothesis:** The GPU and memory may be sufficient for a narrow local-inference experiment with a compatible, memory-bounded model/runtime. This cannot be promoted to a requirement or purchase recommendation without a workload and full inventory.

**Recommendation:** Do not purchase a motherboard, CPU, storage, power supply, adapters, networking equipment, or replacement GPU under this discovery. First inventory all parts and define the workload/evaluation envelope. Any later purchase request must compare the total cost and expected evidence value of refurbishment against hosted execution and other already-available equipment.

### 10.3 Representation

For the initial experiment, represent Node 01 only in the repository protocol/results manifest with:

- stable local label (`AI Lab Node 01`);
- inventory date and responsible operator;
- component manufacturer/model/serial where appropriate (keep sensitive identifiers out of public artifacts);
- firmware, OS, driver, runtime, and package versions;
- network zone and allowed access path;
- storage/data classification and retention posture;
- model artifact digests and licenses;
- experiment run identifiers; and
- decommissioning state.

Do not add Node 01 as a Workspace Project, Engineering Work, Knowledge Asset, or first-class compute-node entity. The Project owns the experimental outcome; the node is only an execution resource.

---

## 11. Minimum architecture for an initial local-inference experiment

This is a minimum experiment envelope, not an implementation architecture or product design.

### 11.1 Preconditions

1. Select one bounded workload and define why local inference might matter.
2. Define fixed synthetic/public input fixtures, expected behavior, evaluation dimensions, and stop/pass criteria before runtime selection.
3. Complete the Node 01 inventory and safety/compatibility check.
4. Approve a data classification that excludes prohibited data.
5. Record the hosted or non-AI baseline used for comparison, if any.
6. Make an explicit human go/no-go decision on execution and any spend.

### 11.2 Smallest sufficient execution shape

```text
Versioned protocol + synthetic fixtures
              |
              v
Isolated single node
  - supported OS and patched host
  - pinned GPU driver/runtime
  - one pinned inference runtime
  - one or a very small number of pinned model artifacts
  - local-only CLI or loopback/private endpoint
              |
              v
Versioned run manifest + raw measurements
              |
              v
Human-reviewed results synthesis
              |
              v
Repository evidence citation from Engineering Work
```

Required result fields should include protocol version, run ID/time, operator, node/environment manifest digest, runtime and model revision/digest/license, inference parameters, fixture revision, latency/throughput/memory where relevant, scenario outcomes, failures, uncertainty, and comparison basis.

### 11.3 Explicitly not required for the first experiment

- Kubernetes, container orchestration, a cluster, multi-node scheduling, autoscaling, or high availability;
- a public or production inference API;
- production Aredir integration;
- model fine-tuning, training, retrieval augmentation, vector databases, or agent orchestration unless the selected workload independently requires and justifies one;
- an experiment database, model registry, feature store, queue, telemetry platform, or dedicated lab UI;
- SSO, enterprise device management, centralized secrets, or fleet management if the node remains local, single-user, and isolated under the minimum controls;
- automatic result ingestion or repository write-back; or
- hardware purchase before requirements and full inventory close.

---

## 12. Assumptions and unresolved questions

### 12.1 Assumptions

- The active production Work belongs to the existing AredirLabs.com Project; the exact Work identifier was not available from repository evidence and is not invented here.
- The supplied physical inventory is accurate but incomplete and has not been electrically or operationally validated by this discovery.
- The first experiment can use non-sensitive fixtures and does not require production integration.
- A human with appropriate business and security authority will make procurement and execution decisions.

### 12.2 Questions required before hardware purchase or implementation

#### Outcome and workload

1. What single task is the first experiment intended to prove or disprove?
2. What measurable advantage is being tested: privacy, offline operation, latency, cost, control, learning, or another outcome?
3. What model capability/context length/output quality is minimally acceptable?
4. What evaluation fixtures, criteria, thresholds, repetition count, and baseline make the result decision-grade?
5. Is the workload interactive, batch, embedding, multimodal, agentic, or something else?

#### Data and security

6. What data classification is allowed, and who approves it?
7. Are prompts, outputs, caches, model artifacts, and logs retained; for how long; and how are they deleted?
8. Does any model license, provider term, export restriction, or acceptable-use policy constrain the experiment?
9. Is remote administration required? If so, from where, by whom, and through what approved private path?
10. What ingress and egress are actually required after installation?
11. Who owns patching, vulnerability response, credential rotation, incident handling, and physical access?

#### Node inventory and economics

12. What are the exact CPU, PSU model/wattage/connectors, storage devices/health, case form factor, cooling, network interface, and reusable peripherals?
13. Is the GPU, memory, PSU, and storage healthy under diagnostic load?
14. Which compatible platform combinations exist, and what is their total refurbishment cost including missing parts, power, and operator time?
15. What already-available machine or hosted service can provide the comparison without purchase?
16. What spend ceiling and evidence threshold authorize purchase, and who makes that decision?

#### Architecture and operations

17. Which supported OS, driver, runtime, and exact model revisions satisfy the workload on candidate hardware?
18. Can the experiment be reproduced from a pinned manifest without executing untrusted remote model code?
19. What failure/stop conditions protect the hardware, data, network, and operator time?
20. What event would justify moving from a single experiment to recurring lab operations?
21. What evidence would show that a general experimentation capability is needed rather than continued Engineering Work records?

---

## 13. Explicit deferrals

This discovery defers all of the following:

- naming or establishing AI Laboratory as a product/domain/capability authority;
- maturing the deferred Research & Innovation capability in EOS;
- hardware purchase or refurbishment authorization;
- final model, runtime, operating system, provider, endpoint, container, or administration-tool selection;
- first-class node, model, provider, runtime, experiment, evaluation, dataset, or deployment entities;
- production Aredir integration or dependency;
- schema, migration, application, authentication, authorization, infrastructure, deployment, or network changes;
- use of production/private/customer data;
- training, fine-tuning, retrieval, agents, multi-node operation, high availability, public access, and production serving;
- automated evidence ingestion, synchronization, or repository write-back;
- Quality Systems methodology changes;
- promotion of this discovery, its terminology, or a future prototype into a company standard; and
- procurement recommendation until the questions in section 12 are answered.

---

## 14. Recommended next step

### 14.1 Exact next action for the active Engineering Work

**Recommendation:** Update the active Work's Current Next Action to:

> Complete a purchase-free experiment-readiness checkpoint: inventory AI Lab Node 01 (CPU, PSU model/wattage/connectors, storage/health, case/form factor/cooling/network), select one bounded local-inference workload using synthetic/public fixtures, define versioned evaluation criteria and a hosted or non-AI comparison baseline, document data/network/administration controls, and return a human go/no-go decision for execution and any spend. Do not purchase hardware or connect production Aredir.

The Work should remain **Active**, Type **Research**, Workflow **Discovery** until that checkpoint provides decision-grade evidence. This report alone does not justify completion because the stated discovery includes questions that must be answered before execution or procurement authorization.

### 14.2 Decision after the checkpoint

- **No-go:** record why the workload/value/security/cost case is insufficient; complete the Research Work with no lab implementation.
- **Go, no purchase:** create a bounded experiment protocol and execute it on approved available infrastructure; attach results as repository evidence.
- **Go, purchase proposed:** require a separate human-approved procurement decision based on complete inventory, compatibility, workload, cost comparison, and security controls before any purchase.
- **Successful experiment with product value:** complete this Work and create a successor implementation-oriented Engineering Work package. Do not change this Work's workflow.
- **Repeated cross-domain experimental need:** open separate architecture/discovery Work to evaluate a general experimentation capability and EOS Research & Innovation maturity.

---

## 15. Candidate repository evidence for the production Engineering Work record

Attach the following through the existing repository-reference authoring path. The Workspace reference remains a read-only citation; this repository file remains authoritative.

| Candidate | Artifact class | Initial status | Why attach |
| --- | --- | --- | --- |
| `docs/discovery/AREDIR-DISCOVERY-013_AI_LABORATORY_CAPABILITY_AND_LOCAL_INFERENCE_ARCHITECTURE.md` | `implementation_package` (label includes Discovery / Architecture / Scope package) | `verified` after human review | Primary bounded discovery outcome, recommendation, security boundary, deferrals, and next action. |

Use repository `aredirlabs-com`, artifact identifier `AREDIR-DISCOVERY-013`, branch `main`, and the reviewed commit hash once this record is committed. Set `lastReviewedAt` when a human verifies the reference. Do not fabricate the active Engineering Work identifier or mutate Production from this documentation session.

Future evidence should be attached only when it exists:

1. Node 01 inventory and compatibility record — `repository_document` or `verification_evidence`.
2. Versioned experiment protocol and fixture manifest — `implementation_package`.
3. Security/data-flow review — `review`.
4. Execution results and comparative evaluation — `verification_evidence`.
5. Human go/no-go or procurement decision — `decision_adr`.
6. Reusable method, if supported by repeated evidence — `promotion_candidate`.

---

## 16. Completion assessment

The requested architecture discovery is complete at the repository level. The evidence supports specialized Engineering Work and an isolated, purchase-free readiness checkpoint. It does not support a new product domain, a durable lab platform, hardware procurement, production integration, or implementation architecture.

The next evidence-producing action is the checkpoint in section 14, not code or infrastructure creation.
