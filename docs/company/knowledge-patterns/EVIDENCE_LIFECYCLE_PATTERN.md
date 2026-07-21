# Evidence Lifecycle Pattern

| Field | Value |
|-------|-------|
| **Name** | Evidence Lifecycle Pattern |
| **Status** | Promoted Standard |
| **Category** | Knowledge Pattern |
| **Version** | 1.0 |
| **Owner** | Aredir Labs |
| **Origin Projects** | Aredir Labs |
| **Origin Artifacts** | Architecture Governance, AREDIR-KB-018 Evidence-Aware AI Advisor Pattern, evidence lifecycle synthesis, PROMOTION_CANDIDATE_REVIEW_2026_Q2 |
| **Linked Projects** | Aredir Labs, AlignFit, ClassForge, LeagueOS |
| **Reusability** | High |
| **Last Reviewed** | 2026-07-20 |
| **Next Review Due** | 2026-10-20 |

## Purpose

Define the canonical lifecycle by which observations become evidence, evidence becomes knowledge, knowledge informs decisions, and decisions generate new observations.

The pattern explains how understanding continuously evolves without rewriting history.

---

## Core Principle

Knowledge is not created directly.

Knowledge emerges through the continual interpretation of evidence.

```
Observation

↓

Evidence

↓

Interpretation

↓

Knowledge

↓

Decision

↓

Outcome

↓

Observation
```

This is an intentionally **cyclical** model.

Every decision eventually generates new observations. Mature systems design for the full loop — not for a one-time path from data to conclusion.

---

## Section 1 — Problem Statement

Many systems fail because they collapse distinct stages of reasoning into a single undifferentiated output.

### Common confusions

| Confusion | Failure |
|-----------|---------|
| **Observations treated as knowledge** | Raw inputs appear as settled understanding |
| **Assumptions treated as facts** | Unvalidated beliefs enter decision records without label |
| **Interpretation treated as reality** | Reasoning is mistaken for observation |
| **Conclusions treated as permanent** | Provisional understanding is stored as immutable truth |
| **Decisions detached from evidence** | Actions lack traceable rationale |
| **History replaced instead of extended** | Prior reasoning is overwritten when understanding changes |

### Why trust and learning erode

When stages collapse, organizations cannot answer basic audit questions: *What did we observe? What did we believe? Why did we decide? What happened next?*

Teams lose the ability to learn from outcomes because the chain from observation to decision is broken or invisible. Repeated mistakes look like bad luck rather than missing feedback loops. Stakeholders stop trusting conclusions they cannot reconstruct.

Separating the lifecycle stages is not bureaucratic overhead. It is the minimum structure required for accountable decision-making and organizational learning.

---

## Section 2 — Canonical Lifecycle

Each stage has a distinct role. None should be skipped or merged silently into another.

### Observation

Raw facts without interpretation.

| Includes | Excludes |
|----------|----------|
| Events | Conclusions |
| Measurements | Rankings |
| Records | Recommendations |
| Experiences | Policy judgments |

Observations describe **what occurred** or **what was measured**. They do not explain significance.

### Evidence

Validated observations organized for reasoning.

Evidence is **selected and contextualized observation** — observations deemed relevant, recorded with provenance, and prepared for interpretation.

Not every observation becomes evidence. Selection implies judgment about relevance, quality, and scope. That judgment should be explicit, not implicit.

### Interpretation

Reasoning applied to evidence.

Interpretation connects evidence to meaning: patterns, comparisons, hypotheses, and provisional conclusions. **Multiple interpretations may exist simultaneously.** Disagreement at this stage is normal and healthy.

Interpretation is **not knowledge**. It is reasoning in progress.

### Knowledge

The organization's **current understanding** — the best-supported synthesis available given existing evidence and interpretation.

Knowledge is:

- **Provisional** — subject to revision when evidence or interpretation changes
- **Collective** — owned by the organization, not by a single narrative voice
- **Traceable** — linked to the evidence and reasoning that support it

Knowledge is the working model of reality the organization uses to act — not reality itself.

### Decision

Choices made using knowledge.

Humans — or governing systems explicitly delegated decision authority — make decisions. Knowledge **informs** decisions. Knowledge **does not make** decisions.

Decision records should state what was decided, what knowledge supported the decision, and what uncertainty remained at decision time.

### Outcome

Consequences produced by decisions.

Outcomes may match expectations or contradict them. Either way, outcomes are new inputs to the lifecycle — not epilogue.

### Outcome → Observation

Consequences generate new observations: metrics, incidents, feedback, measurements, and experiences. The cycle repeats.

Systems that treat decisions as terminal fail to learn. Systems that close the loop treat every outcome as future evidence.

---

## Section 3 — Historical Integrity

Knowledge should never evolve by **rewriting history**.

When understanding changes, the system should:

| Requirement | Meaning |
|-------------|---------|
| **Preserve observations** | Raw inputs remain accessible |
| **Preserve previous interpretations** | Prior reasoning remains inspectable |
| **Preserve previous knowledge states** | What the organization believed then is not erased |
| **Explain what changed** | Name the delta in understanding |
| **Explain why understanding evolved** | Cite new evidence, reinterpretation, or corrected errors |

Historical reasoning should remain understandable.

A user reviewing guidance from six months ago should see what the organization believed then, what it believes now, and the bridge between those states. Learning depends on visible change — not silent replacement.

---

## Section 4 — Evidence Evolution

Evidence changes. That is expected. Concealed change is not.

Evidence may change because:

| Driver | Example |
|--------|---------|
| **New observations appear** | Additional measurements or events |
| **Existing evidence is reinterpreted** | New context reframes prior data |
| **Evidence quality changes** | Source reliability is upgraded or downgraded |
| **Evidence relevance changes** | Scope or conditions shift what applies |
| **Evidence currency changes** | Age or supersession affects applicability |

Changing **knowledge** is a normal consequence of evidence evolution.

Changing **history** — altering what was recorded as observed, interpreted, or known at a prior point in time — is not acceptable without explicit correction audit (for example, documented error correction with preserved prior record).

---

## Section 5 — Uncertainty

Uncertainty exists at every stage of the lifecycle. Mature systems make uncertainty **more understandable** — not invisible.

| Stage | Uncertainty question |
|-------|---------------------|
| **Observation** | Was the measurement accurate? Is the record complete? |
| **Evidence** | Is this observation representative? Is provenance reliable? |
| **Interpretation** | How many plausible readings exist? What assumptions are embedded? |
| **Knowledge** | How strong is support? What would falsify current understanding? |
| **Decision** | What risk remains despite available knowledge? |

Uncertainty should be labeled by stage — not smoothed into false confidence. A decision made under acknowledged uncertainty is more trustworthy than one that pretends certainty the evidence does not support.

---

## Section 6 — Organizational Learning

Organizations improve through **repeated evidence cycles**, not through accumulating static conclusions.

Every completed cycle should strengthen:

| Outcome | Mechanism |
|---------|-----------|
| **Knowledge** | Updated understanding grounded in new evidence |
| **Confidence calibration** | Better sense of when to trust and when to probe |
| **Decision quality** | Decisions linked to clearer rationale and outcome review |
| **Future observations** | Instrumentation and feedback designed from prior outcomes |

The lifecycle should produce **learning** — measurable improvement in how the organization observes, interprets, decides, and adapts — rather than merely producing conclusions that are filed and forgotten.

Closing the loop from outcome back to observation is the difference between a knowledge repository and a learning system.

---

## Section 7 — Relationship to AI

AI participates in the lifecycle. AI does not own it.

### AI may

| Role | Lifecycle stage |
|------|-----------------|
| **Organize evidence** | Evidence — structure, summarize, and index observations for reasoning |
| **Interpret evidence** | Interpretation — propose readings, comparisons, and hypotheses |
| **Communicate knowledge** | Knowledge — translate current understanding for human consumption |
| **Identify uncertainty** | All stages — surface gaps, conflicts, and confidence limits |

### AI should not replace

| Responsibility | Owner |
|----------------|-------|
| **Evidence** | Authoritative systems and validated observation processes |
| **Knowledge ownership** | The organization — provisional collective understanding |
| **Human decisions** | People or explicitly delegated governing systems |

AI accelerates stages of the lifecycle. It does not collapse them into an opaque oracle.

For how AI advisors should **communicate** knowledge with transparency, historical integrity, and professional boundaries, see the complementary [Evidence-Aware AI Advisor Pattern](../ai-patterns/EVIDENCE_AWARE_AI_ADVISOR_PATTERN.md).

---

## Section 8 — Explainability

Every knowledge state should support inspection.

Stakeholders should be able to answer:

1. **What observations exist?**
2. **What evidence exists?**
3. **How was it interpreted?**
4. **Why is this the current understanding?**
5. **What assumptions remain?**
6. **What could change this understanding?**

If these questions cannot be answered, the organization does not have knowledge — it has assertions.

Explainability is not optional documentation. It is the operational test of whether the lifecycle is functioning.

---

## Section 9 — General Applications

This pattern applies wherever decisions depend on evidence:

| Domain | Lifecycle emphasis |
|--------|-------------------|
| **Software Quality Engineering** | Defect observations → test evidence → root cause interpretation → release knowledge → ship/hold decisions → production outcomes |
| **Scientific Research** | Experiment observations → curated evidence → hypothesis interpretation → provisional knowledge → research decisions → new experiments |
| **Operational Intelligence** | Event observations → incident evidence → causal interpretation → situational knowledge → response decisions → operational outcomes |
| **Education** | Learner observations → assessment evidence → progress interpretation → mastery knowledge → instructional decisions → learning outcomes |
| **Business Intelligence** | Metric observations → analytical evidence → trend interpretation → strategic knowledge → resource decisions → business outcomes |
| **Financial Decision Support** | Market observations → validated evidence → risk interpretation → portfolio knowledge → investment decisions → performance outcomes |
| **Risk Assessment** | Threat observations → control evidence → exposure interpretation → risk knowledge → mitigation decisions → residual outcomes |
| **AI Systems** | Input observations → structured evidence → model interpretation → deployed knowledge → automation decisions → monitored outcomes |
| **Knowledge Management** | Artifact observations → curated evidence → synthesis interpretation → organizational knowledge → governance decisions → usage outcomes |
| **Enterprise Architecture** | System observations → architecture evidence → design interpretation → target knowledge → migration decisions → operational outcomes |
| **Architecture / Quality Assessment** | Repository and runtime observations → assessment evidence → interpreted findings → organizational knowledge → promotion or remediation decisions → new observations |

The pattern is domain-agnostic. Implementation varies; the lifecycle stages do not.

### Assessment artifact recognition

Architecture audits and Quality Systems assessments commonly produce named artifacts. Map them to lifecycle stages without redefining AQSF/AVF:

| Artifact | Typical lifecycle stage | Notes |
|----------|-------------------------|-------|
| **Observation / evidence register entries** | Observation → Evidence | Provenance required; Fact vs Inference labeled |
| **Quality Finding** | Interpretation → provisional Knowledge | Structured per Quality Systems AQSF-002; not automatically a company standard |
| **Assessment Report** | Knowledge (scoped) | Durable understanding for a system/question; may include Architecture Audit sections |
| **Promotion Candidate** | Decision input | Proposal to change an owning repository; acceptance follows [Promotion Process](../PROMOTION_PROCESS.md) |
| **Promoted Standard** | Organizational Knowledge | Only after Labs (or designated owner) promotion acceptance |

Quality Systems (`aredir-quality-systems`) defines **how** findings and evidence strength are recorded (AVF). This pattern defines **how understanding evolves** across any domain. Do not duplicate AVF procedures here.

---

## Section 10 — Relationship to Existing Aredir Patterns

This pattern governs **how understanding is created**. Complementary patterns govern computation, surfaces, collaboration, and communication.

| Pattern | Relationship |
|---------|--------------|
| [Workspace-First AI Experience Pattern](../architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md) | Surfaces where lifecycle outputs (evidence, knowledge, decisions) are encountered in product workspaces |
| [Human + AI Advisor Workspace Pattern](../ai-patterns/HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md) | Shared records where multiple contributors advance the lifecycle over time |
| Facts → Meaning → Recommendations | Application-owned intelligence pipeline ([AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md)) — structured progression from facts through assessments and insights to recommendations |
| [Evidence-Aware AI Advisor Pattern](../ai-patterns/EVIDENCE_AWARE_AI_ADVISOR_PATTERN.md) | How understanding is **communicated** to humans — uncertainty, evidence dimensions, and historical integrity at the advisor layer |
| [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md) | What architectural questions to evaluate; delegates verification mechanics to Quality Systems |
| Quality Systems AVF (`aredir-quality-systems`) | External — evidence collection, confidence, finding structure, comparative assessment |
| [Promotion Process](../PROMOTION_PROCESS.md) | How reusable assessment outputs become company assets |

### Distinction from Evidence-Aware AI Advisor Pattern

| Concern | Evidence Lifecycle Pattern | Evidence-Aware AI Advisor Pattern |
|---------|---------------------------|-----------------------------------|
| **Scope** | Universal evidence-driven decision processes | AI advisor communication and evolution |
| **Primary question** | How does understanding form and evolve? | How should advisors present understanding responsibly? |
| **Audience** | Any system, team, or organization | AI interpretation and communication layers |

These patterns are designed to work together. The lifecycle defines the stages; the advisor pattern defines transparent communication within and across those stages when AI is involved.

---

## Closing Statement

> Evidence does not become knowledge because it exists.
>
> It becomes knowledge through transparent interpretation, continuous learning, and responsible revision.
>
> Mature systems preserve both what they know and how they came to know it.

---

## Related

- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [Architecture Governance](../governance/ARCHITECTURE_GOVERNANCE.md)
- [Knowledge Governance](../governance/KNOWLEDGE_GOVERNANCE.md)
- [Evidence-Aware AI Advisor Pattern](../ai-patterns/EVIDENCE_AWARE_AI_ADVISOR_PATTERN.md)
- [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md)
- [Root Cause Analysis Framework](../qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md)
- [Architecture Audit Standard](../documentation-standards/ARCHITECTURE_AUDIT_STANDARD.md)
- Quality Systems (`aredir-quality-systems`) — AQSF / AVF (external; evidence and findings)

**Recommended next work item:** AREDIR-KB-016 — Knowledge Capture Standard (Documentation Standard; per [Knowledge Base Roadmap](../KNOWLEDGE_BASE_ROADMAP.md)).
