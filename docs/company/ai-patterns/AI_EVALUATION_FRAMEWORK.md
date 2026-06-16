# AI Evaluation Framework

| Field | Value |
|-------|-------|
| **Name** | AI Evaluation Framework |
| **Status** | Promoted Standard |
| **Category** | AI Pattern |
| **Version** | 1.0 |
| **Owner** | Aredir Labs |
| **Origin Projects** | AlignFit, Aredir Labs |
| **Origin Artifacts** | COACH-ARCH-001, COACH-INTEL-001, COACH-INTEL-002, COACH-INTEL-003 |
| **Linked Projects** | AlignFit, Aredir Labs |
| **Reusability** | High |
| **Last Reviewed** | 2026-06-12 |
| **Next Review Due** | 2026-09-12 |

## Purpose

AI systems require explicit evaluation methodology — not ad hoc prompt review or anecdotal user feedback.

The [Context Builder Pattern](./CONTEXT_BUILDER_PATTERN.md) defines **what enters the system**. The [Response Contract Pattern](./RESPONSE_CONTRACT_PATTERN.md) defines **what the model may say**. The AI Evaluation Framework defines **how quality is measured, validated, and sustained** across releases.

**Goal:** Create repeatable confidence in AI behavior — determining whether systems produce reliable, consistent, contract-compliant outputs before and after deployment.

### Why AI systems require evaluation frameworks

Without structured evaluation, AI features appear to work until they fail in production — often silently.

| Failure mode | Why evaluation is required |
|--------------|---------------------------|
| **Output drift** | Model or prompt changes alter conclusions without visible errors |
| **Recommendation inconsistency** | Same user state produces different actions run-to-run |
| **Contract violations** | Narrative invents facts, recommendations, or assessments |
| **Hallucinations** | Model fills gaps when context or contract is incomplete |
| **Silent regressions** | Quality degrades between releases without failing tests |
| **Prompt degradation** | Incremental prompt edits accumulate conflicting instructions |
| **Context quality issues** | Bad inputs produce plausible but wrong outputs downstream |

These failure modes surfaced during AlignFit Coach evolution: narrative quality improved after separating intelligence layers, but confidence required systematic validation of context, contracts, and narrative adherence — not subjective spot checks alone.

**Purpose of this framework:** Establish reusable methodology for evaluating, validating, regression-testing, and improving AI systems over time.

---

## AI Evaluation Lifecycle

Operational lifecycle for sustaining AI quality:

```
Objective
    ↓
Expected Behavior
    ↓
Evaluation Criteria
    ↓
Reference Scenarios
    ↓
Validation
    ↓
Regression Detection
    ↓
Improvement Loop
```

### Objective

| | |
|---|---|
| **Purpose** | Define what the AI feature must accomplish for users and the business |
| **Outputs** | Documented goals: user outcomes, decision support scope, success boundaries |
| **Quality requirements** | Objectives are testable — not vague aspirations; aligned to product requirements |

### Expected Behavior

| | |
|---|---|
| **Purpose** | Describe correct system behavior under defined conditions before measuring quality |
| **Outputs** | Behavior specifications per interaction type: what layers produce, what narrative explains |
| **Quality requirements** | Distinguishes application-owned decisions from narrative expression; references ownership model |

### Evaluation Criteria

| | |
|---|---|
| **Purpose** | Translate objectives and expected behavior into assessable dimensions |
| **Outputs** | Criteria matrix: dimensions, pass/fail thresholds, qualitative vs. deterministic checks |
| **Quality requirements** | Criteria are reusable across products; not embedded product-specific metrics |

### Reference Scenarios

| | |
|---|---|
| **Purpose** | Provide stable baselines for repeatable evaluation |
| **Outputs** | Scenario catalog: inputs, expected layer outputs, narrative expectations |
| **Quality requirements** | Scenarios versioned; cover happy paths, edges, gaps, conflicts, and regressions |

### Validation

| | |
|---|---|
| **Purpose** | Execute evaluation against criteria and scenarios before release |
| **Outputs** | Validation report: pass/fail per dimension, scenario results, blocking issues |
| **Quality requirements** | Layer-appropriate validation — unit tests on deterministic layers, review on narrative |

### Regression Detection

| | |
|---|---|
| **Purpose** | Identify quality loss when context, contracts, prompts, or models change |
| **Outputs** | Regression diff: what changed, severity, affected scenarios |
| **Quality requirements** | Compared against prior baselines; changes classified as acceptable or blocking |

### Improvement Loop

| | |
|---|---|
| **Purpose** | Convert findings into durable fixes and knowledge capture |
| **Outputs** | Improvement actions, re-validation results, KB or architecture updates |
| **Quality requirements** | Findings trace to root cause; fixes validated before closure |

---

## Evaluation Dimensions

Reusable dimensions for assessing AI system quality. Products apply these without inventing parallel metric frameworks.

### Accuracy

Does the output align with known facts?

- Application layers: facts and assessments match authoritative data and policy
- Narrative layer: stated metrics and events trace to contract content
- Evaluation focus: factual alignment, not stylistic preference

### Consistency

Do similar inputs produce similar conclusions?

- Application layers: deterministic outputs for identical inputs and builder versions
- Narrative layer: decisions stable; phrasing may vary within contract bounds
- Evaluation focus: recommendation membership, assessment codes, fact sets

### Contract Compliance

Does the response remain within the response contract?

- Narrative does not invent facts, recommendations, assessments, or priorities
- Unknowns acknowledged when present; gaps not silently filled
- Evaluation focus: closed-world adherence per [Response Contract Pattern](./RESPONSE_CONTRACT_PATTERN.md)

### Completeness

Does the output address required concerns?

- Context includes decision-critical fields for the interaction type
- Contract includes required sections before narrative invocation
- Narrative addresses prescribed recommendations and material unknowns
- Evaluation focus: required coverage, not exhaustive verbosity

### Explainability

Can the reasoning be understood?

- Application decisions traceable through facts → assessments → recommendations
- Narrative explains prescribed actions without obscuring ownership
- Evaluation focus: auditability for support, compliance, and engineering review

### Safety

Does the system remain within intended boundaries?

- No prohibited content, policy violations, or scope expansion beyond interaction type
- Fail-closed behavior when context or contract validation fails
- Evaluation focus: boundary respect, not subjective tone judgment alone

---

## Reference Scenario Framework

Reference scenarios provide **stable evaluation baselines**. They are not product benchmarks or automated test suites — they are governed scenario definitions that teams implement in their QA processes.

### Scenario categories

| Category | Purpose | Example intent |
|----------|---------|----------------|
| **Expected behavior cases** | Confirm standard flows produce correct layer outputs and narrative | User with complete data receives ranked recommendations explained in contract |
| **Edge cases** | Validate boundary behavior | New user with empty history; maxed token context; timezone boundaries |
| **Missing-information cases** | Confirm graceful degradation | Sleep sync unavailable; partial profile; explicit `unknowns` in contract |
| **Conflicting-information cases** | Validate policy resolution | Competing goals; contradictory signals; rule precedence already resolved in application layers |
| **Regression scenarios** | Detect unintended change | Golden fixtures from prior release; known prompt-sensitive interactions |

### Scenario structure (recommended)

Each reference scenario should document:

| Field | Description |
|-------|-------------|
| `scenarioId` | Stable identifier for tracking across releases |
| `interactionType` | Which surface and builder/contract versions apply |
| `inputs` | Authoritative raw data or fixture reference |
| `expectedContext` | Bounded context expectations (or validation rules) |
| `expectedContract` | Application layer outputs before narrative |
| `narrativeCriteria` | Qualitative checks: compliance, completeness, tone bounds |
| `regressionBaseline` | Optional: prior release snapshot for comparison |

### Quality requirements for scenarios

- Scenarios are **versioned** when builder schemas, contract shapes, or policies change
- At least one scenario per interaction type before production release of AI features
- Regression scenarios updated only when behavior change is intentional and documented
- Scenarios stored alongside QA fixtures — not only in prompt comments or tribal knowledge

**Purpose:** Provide stable evaluation baselines that survive team turnover and model provider changes.

---

## Contract Compliance Evaluation

Response contracts define the closed world for narrative generation. Evaluation must verify the model stays within application-owned boundaries.

Reference: [Response Contract Pattern](./RESPONSE_CONTRACT_PATTERN.md)

### Ownership boundaries

| Boundary | Evaluation question |
|----------|---------------------|
| **Fact ownership** | Does every stated metric, event, or state appear under `facts`? |
| **Assessment ownership** | Does narrative align with `assessments` without re-scoring or contradicting? |
| **Recommendation ownership** | Does every prescribed action map to a contract recommendation ID? |
| **Narrative-only responsibilities** | Does prose explain, educate, and communicate — without creating decisions? |

### Evaluation checks

| Check | Expectation |
|-------|-------------|
| **No invented facts** | Narrative cites only contract facts; no orphan metrics or events |
| **No invented recommendations** | No new actions, priorities, or IDs absent from `recommendations` |
| **No assessment override** | Labels, scores, and statuses match application evaluations |
| **Unknown handling** | When `unknowns` populated, narrative acknowledges limits explicitly |
| **Priority respect** | Emphasis follows contract priority fields, not model judgment |
| **Closed-world rule** | If not in contract, it does not exist for narrative purposes |

### When contract compliance evaluation is required

- Before any narrative prompt or model version change affecting user-facing AI
- After changes to facts, assessments, insights, or recommendation layers
- During UAT for new interaction types
- When user reports allege incorrect advice — verify contract first, then narrative

**Purpose:** Ensure models remain within defined responsibilities; decisions stay auditable in application layers.

---

## Context Quality Evaluation

AI output quality cannot be evaluated in isolation from inputs. Bad context produces plausible wrong answers.

Reference: [Context Builder Pattern](./CONTEXT_BUILDER_PATTERN.md)

### Evaluation criteria

| Criterion | Evaluation question |
|-----------|---------------------|
| **Relevance** | Does context include only data relevant to this interaction type? |
| **Completeness** | Are decision-critical fields present or explicitly absent per policy? |
| **Bounded scope** | Do caps, time windows, and field sets respect documented limits? |
| **Determinism** | Do identical authoritative inputs produce identical context objects? |
| **Token efficiency** | Does serialized context stay within documented budget without losing signal? |

### Evaluation checks

| Check | Expectation |
|-------|-------------|
| **Fixture replay** | Fixed inputs produce golden context snapshots |
| **Required field coverage** | Interaction matrix defines mandatory fields per surface |
| **Missing data handling** | Optional absence explicit; critical absence triggers degraded mode |
| **PII and privacy** | Redaction rules verified; prohibited fields absent |
| **Overflow behavior** | Caps exceeded → summarize, truncate, or reject with audit trail |
| **Provenance** | Summaries trace to selection and prioritization rules |

### When context quality evaluation is required

- Before enabling new interaction types or expanding context scope
- When recommendation or assessment logic changes upstream inputs
- When investigating narrative or contract failures — validate context first
- During regression review of builder version bumps

**Purpose:** Evaluate the inputs that drive AI behavior; prevent downstream layers and narrative from compensating for bad context.

---

## Regression Detection

AI regressions differ from traditional software bugs: outputs may change without exceptions, failing silently until users notice.

### Regression signals

| Signal | What changed | Typical cause |
|--------|--------------|---------------|
| **Recommendation changes** | Different actions for same fixture inputs | Assessment rules, ranking logic, or model reinterpretation |
| **Contract violations** | Narrative invents or contradicts contract content | Prompt edits, model version, weakened closed-world instructions |
| **Narrative degradation** | Compliant but unclear, incomplete, or off-tone prose | Prompt composition, model swap, context truncation |
| **Inconsistent outputs** | Non-deterministic application layers or unbounded context | Builder changes, missing fixtures, selection drift |
| **Performance degradation** | Latency, cost, or timeout increase | Context bloat, model routing, prompt length growth |

### Regression detection process

```
Change identified (code, prompt, model, config)
    ↓
Classify affected layers (context → contract → narrative)
    ↓
Run regression scenarios against prior baseline
    ↓
Classify diffs (intentional / acceptable / blocking)
    ↓
Block release if blocking regressions unresolved
```

### Quality requirements

- Baselines captured at last known-good release or explicit approval point
- Regression review required for prompt changes — not only code changes
- Model provider or version changes treated as high-risk regression events
- Intentional behavior changes update baselines with documented rationale

**Purpose:** Detect quality loss before release; prevent prompt tweaks from fixing one scenario while breaking others.

---

## Human Review

Automated and fixture-based evaluation cannot capture all dimensions of AI quality. Human review provides judgment on explainability, tone, and edge-case appropriateness.

### Human review types

| Type | Purpose | Typical reviewer |
|------|---------|------------------|
| **Expert review** | Domain correctness of application layers and scenario coverage | Product owner, domain expert |
| **Acceptance review** | Release readiness against evaluation criteria | QA lead, engineering lead |
| **Spot checks** | Sample narrative quality on representative contracts | QA, product |
| **Qualitative assessment** | Tone, empathy, clarity, reading level | Product, UX, domain expert |

### When human review is required

| Trigger | Minimum review |
|---------|----------------|
| New AI feature or interaction type | Expert review of scenarios + acceptance review before production |
| Narrative prompt or model change | Spot checks on regression scenarios; acceptance review if user-facing |
| Contract schema change | Expert review of ownership boundaries and scenario updates |
| User-reported AI quality issue | Expert review after contract and context validation |
| Major model provider migration | Full acceptance review on regression scenario set |

### Human review boundaries

Human review evaluates **whether outputs meet criteria** — it does not replace deterministic tests on context and contracts.

- Reviewers assess narrative against closed-world rules, not personal preference for different recommendations
- Disagreement with application-owned recommendations is a **product/policy issue**, not a narrative fix
- Findings feed the improvement loop with categorized root causes

**Purpose:** Apply expert judgment where automation is insufficient; keep human review focused and gated.

---

## Improvement Loop

Evaluation findings must produce durable improvement — not one-off prompt patches.

```
Evaluate
    ↓
Identify Gaps
    ↓
Improve
    ↓
Re-evaluate
```

### Identify Gaps

| Gap type | Typical finding | Where it lives |
|----------|-----------------|----------------|
| Architecture | Wrong layer owns a decision | [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) |
| Context | Missing fields, unbounded scope, non-determinism | [Context Builder Pattern](./CONTEXT_BUILDER_PATTERN.md) |
| Contract | Ownership leakage, schema gaps | [Response Contract Pattern](./RESPONSE_CONTRACT_PATTERN.md) |
| Narrative | Compliance failure, clarity issues | Prompt composition (future pattern) |
| Scenarios | Missing edge or regression coverage | QA fixtures and scenario catalog |
| Process | Skipped validation gate | [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md) |

### Improve

Improvements should target the **lowest correct layer**:

- Context defects → fix builder, not narrative instructions
- Contract defects → fix application layers, not ask model to compensate
- Narrative defects → fix prompts and guidance within contract bounds
- Process defects → add gates, scenarios, or review requirements

### Re-evaluate

After improvement:

1. Run affected reference scenarios
2. Compare against regression baselines
3. Update baselines if behavior change is intentional
4. Document resolution in release notes or decision log

### Knowledge capture

Findings should feed:

| Destination | When |
|-------------|------|
| **Architecture updates** | Layer ownership or topology changes |
| **Context improvements** | Builder schema, caps, or selection rule changes |
| **Response contract improvements** | Schema, section, or validation rule changes |
| **Future KB assets** | Recurring patterns worth promoting (see Future AI Candidates) |
| **Root cause analysis** | Production incidents or systemic failures — [Root Cause Analysis Framework](../qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md) |

**Purpose:** Close the loop between evaluation and engineering; prevent repeated failure modes.

---

## Common AI Evaluation Failure Modes

Anti-patterns that undermine AI quality assurance.

| Anti-pattern | Why it fails |
|--------------|--------------|
| **Evaluating only happy paths** | Edge cases, missing data, and conflicts cause most production failures |
| **Changing prompts without regression review** | Prompt edits alter decisions and compliance silently |
| **Measuring outputs without evaluating context** | Narrative fixes mask upstream input defects |
| **Ignoring contract compliance** | Subjective "sounds good" review misses invented recommendations |
| **Relying only on anecdotal feedback** | Vocal users skew priority; silent regressions go undetected |
| **Optimizing for one metric only** | Token cost cuts may break completeness; tone focus may hide accuracy issues |
| **Treating narrative variance as regression** | Phrasing may vary; decision drift is the signal |
| **Skipping human review entirely** | Automation misses tone, clarity, and domain appropriateness |
| **No versioned scenarios** | Teams cannot compare releases or onboard evaluators consistently |

---

## Relationship to Existing Assets

### Where evaluation fits in the AI lifecycle

```
[ Complete AI methodology ]

Context Builder Pattern        →  what enters the system
        ↓
AI Intelligence Architecture   →  how intelligence layers connect
  (Facts → Assessments →
   Insights → Recommendations)
        ↓
Response Contract Pattern      →  output boundary before narrative
        ↓
Narrative (LLM)
        ↓
AI Evaluation Framework        →  how quality is measured (this pattern)
```

| Asset | Role in evaluation |
|-------|-------------------|
| [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md) | Defines layer topology; evaluation validates each layer's ownership and outputs |
| [Context Builder Pattern](./CONTEXT_BUILDER_PATTERN.md) | Input quality evaluation: relevance, completeness, determinism, bounds |
| [Response Contract Pattern](./RESPONSE_CONTRACT_PATTERN.md) | Output boundary evaluation: compliance, ownership, closed-world adherence |
| [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md) | Verification lifecycle, test layers, release gates — evaluation executes within this discipline |
| [Root Cause Analysis Framework](../qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md) | Evidence-based investigation when evaluation surfaces production failures |
| [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md) | Delivery gates include validation before release; evaluation findings feed knowledge capture |

Together, **Context Builder**, **AI Intelligence Architecture**, **Response Contract**, and **AI Evaluation Framework** define:

- How context is assembled
- How intelligence is generated
- How narrative is constrained
- How quality is evaluated

across all Aredir Labs AI products.

### Evaluation in the delivery lifecycle

Per [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md), AI features should not reach production without:

1. Defined reference scenarios for the interaction type
2. Deterministic validation of context and contract layers
3. Regression comparison when prompts, models, or intelligence layers change
4. Human review where required by triggers above
5. Knowledge capture when evaluation reveals reusable patterns or gaps

Per [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md), AI evaluation maps to the testing pyramid:

| Layer | AI evaluation focus |
|-------|----------------------|
| **Unit** | Context builder fixtures, contract schema validation, layer logic |
| **Integration** | Pipeline produces correct contract from context through recommendations |
| **Manual / UAT** | Narrative compliance, qualitative assessment, acceptance review |

---

## Future AI Candidates

Likely future promotions — **not created in this work item**:

| Candidate | Notes |
|-----------|-------|
| **Assessment Layer Pattern** | Reusable policy evaluation and scoring conventions |
| **Recommendation Ownership Pattern** | Structured ranking, IDs, and rationale for actionable outputs |
| **Provider Resolution Pattern** | Model provider selection, fallback, and cost routing |
| **Prompt Composition Pattern** | Governed templates for narrative-layer prompts |
| **AI Regression Testing Playbook** | Operational playbook for scenario management and release comparison |

**Recommended next work item:** AREDIR-WORKSPACE-008 — **Knowledge Asset Registry** (Governance Registry scope; per [Knowledge Asset Registry Roadmap](../KNOWLEDGE_ASSET_REGISTRY_ROADMAP.md)).

---

## Related

- [Knowledge Base Index](../KNOWLEDGE_BASE_INDEX.md)
- [Promotion Process](../PROMOTION_PROCESS.md)
- [AI Intelligence Architecture Pattern](../architecture-patterns/AI_INTELLIGENCE_ARCHITECTURE_PATTERN.md)
- [Workspace-First AI Experience Pattern](../architecture-patterns/WORKSPACE_FIRST_AI_EXPERIENCE_PATTERN.md)
- [Human + AI Advisor Workspace Pattern](./HUMAN_AI_ADVISOR_WORKSPACE_PATTERN.md)
- [Context Builder Pattern](./CONTEXT_BUILDER_PATTERN.md)
- [Response Contract Pattern](./RESPONSE_CONTRACT_PATTERN.md)
- [QA Engineering Framework](../qa-standards/QA_ENGINEERING_FRAMEWORK.md)
- [Root Cause Analysis Framework](../qa-standards/ROOT_CAUSE_ANALYSIS_FRAMEWORK.md)
- [Feature Delivery Standard](../playbooks/FEATURE_DELIVERY_STANDARD.md)
