# PROJECT-UX-002 — Operational Application Assessment

| Field | Value |
|---|---|
| Status | Complete — architectural assessment only |
| Scope | Current Aredir Workspace, Project, Engineering Work, and Defect implementation |
| Governing input | [Phase 0 Discovery Inventory](../discovery/PROJECT-UX-002_EXISTING_AREDIR_EXPERIENCE_DISCOVERY.md) |
| Canonical experience authority | [AREDIR-UX-001 Workspace Experience Architecture](../company/architecture-patterns/AREDIR_UX_001_WORKSPACE_EXPERIENCE_ARCHITECTURE.md) |
| Implementation changes | None |
| Runtime qualification | Static implementation review; authenticated Defect validation remains deferred |

## Assessment basis

This assessment applies the existing AREDIR-UX-001 terms—Mission, Environment, Primary Action, Supporting Context, Navigation, and Identity—to the current implementation. It does not define a second operational model or restate the Phase 0 inventory.

The assessment also uses the existing company expectation that a surface makes purpose, current position, and next correct action understandable, and the existing Evidence Lifecycle distinction between observation, evidence, interpretation, knowledge, decision, and outcome. Repository artifact bodies remain authoritative; this Workspace presents a bounded representation and links to their source where references exist.

Evidence was limited to repository-held implementation and validation records. The Defect package is structurally and statically validated, but [its R1 validation record](./DEFECT-INTAKE-001-R1_VALIDATION.md) says authenticated creation, update, and the historical comparison remain unperformed. Findings about visual comprehension are therefore implementation observations, not claims of observed user behavior.

## Canonical mapping

Status meanings: **clearly represented** is directly expressed by the current surface; **partially represented** is present but dependent on data, generic framing, or supporting placement; **under-emphasized** is present but subordinate to competing material; **missing** is not expressed by the current implementation.

| Surface | Mission | Environment | Primary Action | Supporting Context | Navigation | Identity |
|---|---|---|---|---|---|---|
| Workspace | **Clearly represented.** “Continue the work that is already underway” frames the surface. | **Partially represented.** The composition is calm and ordered, but no distinct operational environmental cue is expressed beyond the shared shell. | **Clearly represented when continuation exists.** The large continuation card names its next action and opens that work. **Partially represented** in the active-project fallback. | **Clearly represented.** Attention, active projects, and recently active projects follow continuation. | **Clearly represented.** Continuation, project links, and the shared Workspace navigation provide return and onward paths. | **Clearly represented.** Workspace label, entry copy, and shell distinguish it as the operating entry point. |
| Project | **Partially represented.** Project name and status orient ownership; the current purpose is mostly carried by the Engineering Work section rather than the page header. | **Partially represented.** Current focus is visually elevated, but the page otherwise uses the common record composition. | **Clearly represented when Engineering Work exists.** State-ranked work and its next action lead. The adjacent “New Engineering Work” action is legitimate but competes with continuation at the same section level. | **Clearly represented.** Current focus, overview, registry record, milestones, documents, prompts, and notes follow the featured work. | **Clearly represented.** Registry return and direct Project ↔ Engineering Work links preserve orientation. | **Clearly represented.** Project Detail, title, status, stage, and category establish the object and scope. |
| Engineering Work | **Clearly represented for Delivery.** “Engineering objective” exposes purpose. **Partially represented for Defect,** where the same summary is a concise synopsis rather than an objective. | **Partially represented.** The operational block is distinct but uses the shared record environment. | **Clearly represented.** Recommended next action is the most emphasized continuation within the operational block. | **Clearly represented.** Current position, Defect investigation when applicable, outcome, condition, related knowledge, repository artifacts, and record details are sequenced below. | **Clearly represented.** The named return to Project, detail-to-edit path, and related-record links form bounded paths. | **Clearly represented.** Engineering Work label, title, workflow/state metadata, and project return establish the place. |
| Defect — intake | **Clearly represented.** The selected Defect conversation declares that it records and investigates an observed software defect. | **Partially represented.** The conversation container separates the investigation form from shared record fields, but it uses the standard Engineering Work form environment. | **Partially represented.** The form submits a clear creation action, but “Create Engineering Work” is broader than the selected Defect conversation. | **Clearly represented.** Synopsis, operational next action, and the seven structured investigation fields are visibly separated from the shared fields. | **Clearly represented.** Route-scoped Project return and post-create detail routing preserve the immediate path. | **Clearly represented.** Workflow selection and the Defect conversation heading identify the activity. |
| Defect — detail | **Partially represented.** Title and Defect investigation identify the record, but the top summary retains the generic “Engineering objective” label. | **Partially represented.** The primary operational block and subsequent investigation panel are distinct, without a Defect-specific environmental treatment. | **Clearly represented.** The parent’s recommended next action is visually primary; the separate Next Investigation is available below as supporting continuation. | **Clearly represented, with a hierarchy limit.** Observation, expectation, reproduction, environment, evidence, investigation, and validation target are independently readable, but all receive equal grid weight. | **Clearly represented.** Back to project, edit, related knowledge, and repository-reference paths are present. | **Clearly represented.** Workflow metadata and Defect investigation heading identify the record as an investigation. |
| Defect — edit | **Partially represented.** Route context identifies the record, but the page title is generic “Edit Engineering Work”; Defect identity arrives in the form. | **Partially represented.** A bounded card contains the edit task but does not further distinguish the investigation activity. | **Clearly represented.** Save changes is the completion action; cancel returns to the detail record. | **Clearly represented.** The Defect investigation section keeps all structured fields independently editable. | **Clearly represented.** Detail return, save return, and cancel preserve context. | **Partially represented.** The record title and locked Defect workflow communicate identity; the page framing remains generic. |

## Hierarchy assessment

| Dimension | Implementation evidence | Assessment |
|---|---|---|
| Visual emphasis | [Workspace page](../../src/app/workspace/page.tsx) gives continuation the largest bordered card and gives its next action a separate emphasized block. [Project Engineering Work section](../../src/components/workspace/project-engineering-work-section.tsx) gives the state-ranked work a bordered feature card. [Engineering Work detail](../../src/app/workspace/projects/[slug]/engineering-work/[workId]/page.tsx) gives the operational block primary styling. | The current implementation reflects engineering importance well at entry, Project, and Engineering Work levels when a continuation record exists. |
| Grouping | Engineering Work detail separates operational orientation, Defect investigation, outcome/condition, related knowledge, repository artifacts, and record details. Defect create and edit forms separate shared fields from a Defect investigation group. | The record model is legible and avoids flattening Defect facts into summary prose. In the Defect detail grid, however, observation, evidence, investigation, and validation target are visually peers despite different roles in continuation. |
| Progression | Workspace progresses Continue → What needs care → Project context → Recently active. Project progresses Engineering Work → current focus/overview → records. Engineering Work progresses purpose/current position/next action → supporting information. | The implemented sequence generally follows AREDIR-UX-001: the primary task precedes supporting context. Project’s “New Engineering Work” shares the featured-work header, creating a local choice between continuing known work and beginning new work. |
| Scanability | State, workflow, and type are compact metadata; labels expose Defect fields directly; the forms use named controls. | Scanability is strong for named facts. Defect detail is more readable than a free-text record, but a reader must scan the entire equal-weight grid to locate the evidence and immediate investigation continuation. |
| Continuation | Current next action is exposed on Workspace, Project, and Engineering Work. Defect adds Next Investigation and Validation Target without overwriting the parent continuation. | The parent continuation correctly stays distinct from the investigation continuation. This is a sound application of Supporting Context, not a new principle. Its practical comprehension remains untested in an authenticated run. |

### Equal-attention findings

1. On the Project surface, continuation of the featured Engineering Work and creation of new Engineering Work appear in the same header grouping. They have different operational importance, although the featured record retains stronger content emphasis.
2. On Defect detail, the seven investigation facts use the same visual treatment. This preserves readability but does not make the evidence, Next Investigation, or Validation Target easier to find than the descriptive fields.
3. On Defect intake and edit, all investigation fields are presented as a single sequential group. The stored-data distinction is clear, but the sequence does not separately foreground the immediate investigative continuation or the evidence field.

These are implementation gaps against existing hierarchy and Supporting Context guidance. They are not new architecture requirements.

## Cognitive progression

| Question | Workspace | Project | Engineering Work | Defect case |
|---|---|---|---|---|
| Where am I? | Workspace heading and shared navigation answer clearly. | Project name, status, stage, and registry return answer clearly. | Engineering Work label, title, current position, and named project return answer clearly. | Workflow label and Defect investigation answer clearly on intake/detail; edit retains a generic page title. |
| What deserves my attention? | Continuation leads; blocked attention follows. | State-ranked featured work leads. | Recommended next action leads inside the operational block. | The parent continuation leads; the investigation panel does not prioritize evidence or Next Investigation. |
| What should I do next? | Continuation next action is explicit when data exists. | Featured work names what should happen next. | Recommended next action is explicit. | Current operational next action and Next Investigation are distinct and both visible; their intended relationship is documented but has not been observed in use. |
| Why? | The heading explains continuation, while record summary supplies the specific why. | Featured work summary explains why the selected record matters. | Engineering objective explains why for Delivery. | The Defect conversation intent and concise synopsis explain why; the generic objective label is less precise for this workflow. |
| What evidence supports it? | Not generally surfaced at entry; the entry page is a continuation projection. | Not generally surfaced; Project provides context and links. | Related knowledge and repository-artifact sections preserve a path to support without claiming authority. | Evidence is a distinct structured field, and repository references remain separately labeled. The current view displays evidence text but does not establish its provenance or sufficiency by presentation alone. |
| What supporting information is available? | Attention and project context are visible. | Focus, overview, registry, milestones, documents, prompts, and notes are available. | Current position, outcomes, conditions, knowledge, repository references, and metadata are available. | Observation, expected behavior, reproduction, environment, evidence, validation target, and edit capability are available. |

## Defect case study

### Intake

The implementation expresses more than stored data. Selecting the Defect workflow changes the conversation intent and supplies seven named investigation fields, while keeping the parent synopsis and current operational next action intentionally concise. This maps the form to an investigation purpose rather than a generic text payload.

The primary action is clear as submission, and the supporting context is structurally present. Investigation readability is improved by named fields. The current form still presents the investigation as one continuous sequence, so evidence and Next Investigation do not receive stronger visual grouping than descriptive facts. This is an observed composition limitation, not a redesign request.

### Detail

The detail page keeps the normal operational orientation block—summary, current position, recommended next action—then adds a separately named Defect investigation section. The structured labels make observed behavior, expected behavior, reproduction, environment, evidence, Next Investigation, and validation target independently readable. This is a meaningful expression of Mission and Supporting Context, not merely a display of one undifferentiated stored text field.

The Evidence Lifecycle distinction is partially expressed: observed behavior and evidence are separately named, and the page avoids presenting the evidence field as a conclusion. The surface does not itself show provenance, quality, relevance, or currency; therefore it must not be read as validating the evidence. Repository artifacts remain a distinct, authority-preserving supporting section.

### Editing

Edit retains the Defect context and locks the workflow while context-retention semantics are undefined. That accurately preserves the record boundary. The form exposes individually editable investigation facts and a distinct save/cancel continuation.

The edit page itself remains generically framed as Engineering Work, which makes Defect Mission and Identity only partial until the user reaches the form section. The implementation is structurally coherent but lacks authenticated interaction evidence for input, error recovery, persistence confirmation, and a reader’s ability to distinguish the two continuations in practice.

## Conclusion

The current Workspace implementation is a credible application of AREDIR-UX-001: it usually establishes purpose, focuses a primary continuation, subordinates supporting context, preserves return orientation, and keeps repository authority outside its projections. The Defect implementation materially improves investigation readability through structured context and uses the existing canonical terms without creating a competing model.

The identified gaps are current implementation observations. They do not by themselves justify a refinement of AREDIR-UX-001; see [Refinement Candidates](./PROJECT-UX-002_REFINEMENT_CANDIDATES.md).
