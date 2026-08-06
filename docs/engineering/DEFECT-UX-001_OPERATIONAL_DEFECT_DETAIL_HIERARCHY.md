# DEFECT-UX-001 — Operational Defect Detail Hierarchy

## Current-state composition review

Review completed before implementation against the structured Defect detail route in `src/app/workspace/projects/[slug]/engineering-work/[workId]/page.tsx`.

### Existing order and treatment

| Order | Content | Existing treatment |
| --- | --- | --- |
| 1 | Project navigation | Text link above the record, separated by a large bottom margin. |
| 2 | Engineering Work identity and title | Eyebrow and title; Edit Engineering Work is aligned as a bordered peer action. |
| 3 | Summary and lifecycle posture | One large bordered card. Summary occupies the main column and Type, Workflow, and Lifecycle State occupy a nested bordered panel. |
| 4 | Current operational next action | A second nested bordered panel inside the same card, distinguished only by a light primary tint. |
| 5 | Structured Defect fields | One bordered card containing seven identically styled `DetailField` entries in a two-column grid. |
| 6 | Current outcome | A standalone full-width bordered card when present. |
| 7 | Condition | A standalone full-width bordered card when present. |
| 8 | Related knowledge | A standalone full-width bordered card; each result is another bordered card with a three-column metadata grid. |
| 9 | Repository evidence | A standalone full-width bordered card; each reference is another bordered card with a two-column metadata grid. |
| 10 | Record metadata | A standalone full-width muted card containing priority and timestamps. The record ID is not displayed. |

### Hierarchy findings

- **Equal visual emphasis:** Investigation fields, outcome, condition, Related Knowledge, Repository Evidence, and metadata all rely on similarly sized bordered surfaces. Within Investigation, all seven facts have identical label, size, spacing, and grid priority.
- **Nested information shown as peers:** Observed and expected behavior, reproduction context, supporting evidence, validation target, and Next Investigation are emitted from storage as one flat grid even though they answer different engineering questions. Related-knowledge metadata also competes with each knowledge item’s title and description.
- **Excessive reading width:** The route applies padding but no content-width bound. Long synopsis, evidence, reproduction, and outcome prose can extend across the available workspace viewport.
- **Unclear section boundaries:** Cards distinguish stored record groups, but the Investigation card has no internal Behavior, Reproduction Context, or Evidence and Validation landmarks. The reader must infer those relationships from database-field labels.
- **Supporting context competes with Primary Action:** The next action has a light nested treatment, while every later supporting region receives its own full-width card and repeated heading treatment. Edit is spatially detached from the continuation it enables.
- **Container-driven page length:** Repeated `p-6` outer cards, nested `p-4` cards, grid gaps, and separate outcome/condition cards create substantial vertical length even when content is concise. The length reflects component repetition more than narrative transitions.

## AREDIR-UX-001 mapping

| Canonical element | Defect detail application |
| --- | --- |
| Mission | Defect identity, title, and concise synopsis explain what is being resolved and why the record exists. |
| Environment | Project ownership, Defect workflow, familiar type, lifecycle state, and reproduction environment establish operating context without promoting every metadata value. |
| Primary Action | The existing current operational next action is the strongest operational element after identity and synopsis, with the existing Edit route adjacent. |
| Supporting Context | Investigation is narrated as Behavior, Reproduction Context, and Evidence and Validation. Outcome and condition remain available as current assessment. |
| Navigation | Named return to the owning Project, Edit Engineering Work, Related Knowledge links, and repository source links remain intact. |
| Identity | Project, Engineering Work record, Defect workflow, familiar type, lifecycle state, and record ID remain identifiable at an appropriate level. |

## Hierarchy and grouping decisions

Implementation decisions will preserve the existing domain and use this reading order:

1. Identity and current posture.
2. Concise defect synopsis.
3. Current operational next action.
4. Investigation: Behavior, Reproduction Context, then Evidence and Validation.
5. Current assessment, when outcome or condition exists.
6. Related Knowledge.
7. Repository Evidence.
8. Reference metadata.

The current operational next action and Defect-specific Next Investigation remain separate. The former governs record continuation; the latter remains evidence-and-validation context.

## Primary Action treatment

The current operational next action is now a dedicated primary-tinted action band immediately after identity and synopsis. A strong left rule, larger action text, and restrained background distinguish it from information regions without introducing a new visual language. The existing Edit Engineering Work link is placed inside the band so the supported continuation is adjacent to the direction it changes.

Completed, closed, cancelled, and superseded records retain the same canonical action label with a `historical` qualifier and explanatory text. This prevents a completed record from implying active remediation while preserving its verification direction. No executable action was fabricated.

## Supporting-context treatment

The seven Defect Context values remain distinct structured fields within one Investigation surface:

- **Behavior:** Observed Behavior and Expected Behavior.
- **Reproduction context:** Reproduction Steps and Environment, with more width allocated to the procedural field.
- **Evidence and validation:** Evidence, Validation Target, and Next Investigation. Next Investigation receives a restrained inset treatment but remains subordinate to the parent operational next action.

Current Outcome and Condition remain available together as a quiet Current Assessment region. Related Knowledge and Repository Evidence remain separate, authority-preserving regions after Investigation. Each uses a native disclosure with a visible item/reference count, reducing initial page competition and length while remaining keyboard operable and discoverable. Reference metadata uses the same quiet disclosure treatment and now includes the record ID alongside timestamps and the unchanged existing priority value.

## Responsive behavior

The Defect composition is bounded to `max-w-5xl`; primary prose is further bounded to `max-w-3xl`. Route padding scales from mobile through desktop. Behavior, reproduction, evidence, assessment, knowledge metadata, and repository metadata grids collapse to a logical single column on narrow viewports. The action and Edit control stack on mobile, with the control expanding to the available width.

Authenticated validation at 1728×1000, 1366×768, 768×1024, and 390×844 found no horizontal overflow. At laptop width, identity, synopsis, the full Primary Action, and the Investigation entry are visible at normal zoom. Mobile requires vertical reading for the long canonical investigation content, but no browser zoom reduction or horizontal movement.

## Accessibility posture

The page has one descriptive `h1`, followed by `h2` regions and ordered `h3` Investigation groups. Sections are associated to headings with `aria-labelledby`. Definition lists retain label/value association. Links retain descriptive purpose and existing focus-visible rings. Native `details`/`summary` controls provide keyboard-operable progressive disclosure; authenticated Chromium validation confirmed summary focus. Existing badge contrast and readable body-text contrast are preserved rather than reducing supporting text below the shared accessible color tokens.

## Files changed

- `src/app/workspace/projects/[slug]/engineering-work/[workId]/page.tsx`
- `docs/engineering/DEFECT-UX-001_OPERATIONAL_DEFECT_DETAIL_HIERARCHY.md`
- `docs/engineering/DEFECT-UX-001_VALIDATION.md`

## Explicit non-goals preserved

No comments, timeline, activity history, engineering events, attachments, uploads, severity, assignment, ownership, lifecycle/workflow changes, schema changes, migrations, Defect Context changes, new canonical UX principles, navigation redesign, animation, or broad visual-identity work are part of this package. Existing priority data is not changed. AREDIR-UX-001 is applied without modification.
