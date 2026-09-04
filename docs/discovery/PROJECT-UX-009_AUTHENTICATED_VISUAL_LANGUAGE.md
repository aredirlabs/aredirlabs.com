# PROJECT-UX-009 — Authenticated Visual Language

| Field | Value |
| --- | --- |
| **Package** | PROJECT-UX-009 |
| **Type** | Authenticated visual-language / design-direction discovery |
| **Status** | Complete — design direction only; no implementation authorized |
| **Review date** | 2026-09-03 |
| **Repository baseline** | `main` at `ad692b67699d224d94f6445ffd8fb429e37046a5` |
| **Engineering Work** | Aredir Operational Experience and Visual Identity (Active; persisted record not queried in this session) |
| **Governing architecture** | [PROJECT-UX-004](./PROJECT-UX-004_AUTHENTICATED_VISUAL_SYSTEM_AND_OPERATING_ENVIRONMENT_ARCHITECTURE.md) (spatial system and roles — **not superseded**) |
| **Synthesis hub** | [PRODUCT-ARCHITECTURE-001](./PRODUCT-ARCHITECTURE-001_PRODUCT_OPERATIONAL_ARCHITECTURE_DIRECTION_SYNTHESIS.md) |
| **Related** | [PROJECT-UX-003](./PROJECT-UX-003_AUTHENTICATED_OPERATIONAL_VISUAL_SYSTEM_EVALUATION.md), [PROJECT-UX-005](./PROJECT-UX-005_AUTHENTICATED_VISUAL_SYSTEM_FOUNDATION_IMPLEMENTATION.md), [AREDIR-DISCOVERY-014](./AREDIR-DISCOVERY-014_OPERATIONAL_CONTROL_ENVIRONMENT_AND_WORK_VISUALIZATION_PRINCIPLES.md), [AREDIR-EXPERIMENT-001](./AREDIR-EXPERIMENT-001_OPERATING_FIELD_FINDINGS_SYNTHESIS.md), [CREATIVE_DIRECTION](../company/brand/CREATIVE_DIRECTION.md) (public boundary) |

---

## 0. Scope and authority

This record owns **Layer 2 — authenticated operating-environment visual language**: the distinctive character, principles, and identity invariants that future authenticated surfaces should express **on top of** the established PROJECT-UX-004 visual system.

It does **not**:

- redefine Workspace / Project / Engineering Work / Collections architecture;
- change Operational Focus, lifecycle, continuation, attention, prioritization, relationship, or evidence authority;
- replace PROJECT-UX-004 spatial regions, primitives, role mapping, or package sequence;
- specify component APIs, pixel tokens, or implementation sequencing;
- promote Operating Field prototype styling;
- authorize UI implementation.

When this record conflicts with PROJECT-UX-004 on **structure or semantics**, PROJECT-UX-004 wins. When PROJECT-UX-004 is silent on **character and identity application**, this record applies.

Labels:

| Label | Meaning |
| --- | --- |
| **Established** | Already decided in cited canonical records |
| **Identity principle** | New design-direction statement supported by repository evidence |
| **Application guidance** | How Layer 3 surfaces should apply the language |
| **Deferred** | Explicitly out of scope here; owned by other work |

---

## 1. Three layers

| Layer | Owner | This record |
| --- | --- | --- |
| **1 — Brand identity** | [CREATIVE_DIRECTION](../company/brand/CREATIVE_DIRECTION.md), future company `VISUAL_IDENTITY` | References shared signals only |
| **2 — Authenticated operating-environment visual language** | **This record (PROJECT-UX-009)** | Primary owner |
| **3 — Surface implementation** | PROJECT-UX-004 packages 5–8+, individual routes | Application guidance only |

---

## 2. Existing identity signals (classification)

| Signal | Classification | Notes |
| --- | --- | --- |
| Graphite / charcoal environment (`--surface-environment`, dark default) | **CORE IDENTITY SIGNAL** | Established UX-004 §8; UX-005 implemented |
| Arcane blue-violet interaction accent (hue 262) | **CORE IDENTITY SIGNAL** | Identity + interaction; never structural tint |
| Four operational roles (actionable / attention / settled / inert) | **SUPPORTING SYSTEM RULE** | UX-004 §9; not decorative rainbow |
| Environment / Surface / Inset depth (tonal, not shadow stacks) | **CORE IDENTITY SIGNAL** | UX-004 §7; rejects card nesting |
| Typography roles (`--type-altitude` … `--type-evidence`) | **SUPPORTING SYSTEM RULE** | UX-004 §12; Geist / Inter / JetBrains Mono |
| Restrained hairline borders, small radii | **SUPPORTING SYSTEM RULE** | Precision over pill/card decoration |
| Structured inventory rows vs card grids | **SUPPORTING SYSTEM RULE** | UX-004 §13 |
| Command-console spatial metaphor (not HUD/editor/dashboard) | **CORE IDENTITY SIGNAL** | UX-004 §0 explicit boundary |
| Techno-mythic token comment (arcane, emerald, ember) | **CORE IDENTITY SIGNAL** (palette family) | Authenticated use is restrained; emerald not a second state axis |
| Blueprint grid utility (`.bg-grid`) | **SUPPORTING SYSTEM RULE** | Empty/header regions only; not domain authority |
| Legacy `rounded-xl border bg-card shadow-sm` on some routes | **IMPLEMENTATION ACCIDENT** | Workspace continuation, older collections — migrate to primitives |
| Public editorial measure / hero pacing | **PUBLIC-SITE-SPECIFIC** | CREATIVE_DIRECTION; not copied wholesale |
| Operating Field glow, bloom, sigil, micro-glyphs, breathing animations | **EXPERIMENTAL / REJECTED** | EXPERIMENT-001 §3 — not promoted |
| Mythic ship / narrative symbol | **PUBLIC-SITE-SPECIFIC** | CREATIVE_DIRECTION; not authenticated chrome |
| Empty `VISUAL_IDENTITY.md` | **NOT SUFFICIENTLY ESTABLISHED** | Scope boundary added; not a duplicate of this record |

---

## 3. Target authenticated character

What someone should perceive:

**Within seconds:** a calm, graphite operating field; immediate orientation (where am I, which Project); current truth reads before decoration; interaction accent is sparse and intentional.

**After minutes of work:** dense information remains scannable; authority classes stay distinguishable; provenance is reachable without leaving the task; nothing feels like a ticket backlog or marketing page.

**After novelty fades:** discipline — whitespace and grouping do real work; color means something operational; absence and failure are honest; the environment feels **instrumented**, not **styled**.

### 3.1 Character attributes

#### 1. Governed clarity

- **Meaning:** Operational truth and authorized state outrank projection, metadata, and history visually.
- **Visual consequence:** Strongest type and placement on current next action, lifecycle posture, and focus projection; projections labeled; history inset and collapsed by default.
- **Interaction consequence:** Primary actions adjacent to the truth they change; authorization paths feel deliberate, not ambient.
- **Anti-pattern:** Equal-weight card stacks; history competing with current action; decorative KPIs.

#### 2. Instrumented calm

- **Meaning:** The environment feels measurement-capable because real projections exist, not because widgets fill space.
- **Visual consequence:** Tabular numerals, compact counts, monospace labels; quiet at nominal; deviation legible.
- **Interaction consequence:** Instrumentation links to inspectable sources; empty nominal state stays quiet.
- **Anti-pattern:** Dashboard tiles, animated counters, invented health scores, urgency manufactured from `updatedAt`.

#### 3. Persistent orientation

- **Meaning:** Descent adds context; ancestry and Project identity never disappear at Work altitude.
- **Visual consequence:** Activity rail + orientation band + Project context rail (wide); compressed but present on narrow.
- **Interaction consequence:** Back/deep-link reconstruct context; lateral movement uses inventory context.
- **Anti-pattern:** Full-bleed pages with no frame; browser-back as only orientation.

#### 4. Technical precision

- **Meaning:** Engineering work is exact — identifiers, states, and references are first-class.
- **Visual consequence:** Monospace for IDs/paths/commits; compact state labels; structured rows; sharp geometry.
- **Interaction consequence:** Copy-friendly identifiers; filters/search name real facets.
- **Anti-pattern:** Prose-only admin pages; vague chips; rainbow taxonomy badges.

#### 5. Provenance-adjacent depth

- **Meaning:** Evidence and history are inspectable subordinate layers, not the headline.
- **Visual consequence:** Inset surfaces, past-tense typography, disclosure/timeline; authority labels on references.
- **Interaction consequence:** One gesture to history/evidence; inspector optional, not default clutter.
- **Anti-pattern:** Comment streams; evidence detached from claims; provenance as decorative footer.

#### 6. Restrained arcane accent

- **Meaning:** The arcane blue family marks **interaction and selection**, not importance or structure.
- **Visual consequence:** Accent on controls, focus rings, row selection edge; neutral taxonomy; one strong operational color axis per region.
- **Interaction consequence:** Focus, continuation, and row selection remain visually separable (UX-004 §11).
- **Anti-pattern:** Blue-tinted panels; accent on every heading; cyan/neon secondary palette.

#### 7. Honest absence

- **Meaning:** Null focus, empty history, ambiguous continuation, and failure are truthful states with appropriate weight.
- **Visual consequence:** Explicit copy for absence; failure class distinct from empty; size proportional to operational consequence (EXPERIMENT-001 §2.10).
- **Interaction consequence:** Disabled controls when action cannot succeed; no fabricated filler.
- **Anti-pattern:** Blank cards; silent errors; placeholder metrics.

---

## 4. Visual-language principles

### 4.1 Density

**Principle:** Information-rich through **hierarchy and grouping**, not through shrinking text or adding widgets.

| Context | Density posture |
| --- | --- |
| Workspace | Broad, comparison-oriented; full width for distributions and Project rows |
| Project | Mixed — stable context rail + bounded operational brief |
| Engineering Work | Highest semantic density; bounded narrative measure (~60–75ch) for prose; full width for rows/tables |
| Collections | Structured rows; not card grids at scale |
| Narrow viewports | Priority order: orientation → attention → continuation → focus → inspection; regions transform, not stack desktop wholesale |

Whitespace separates **regions and authority classes**, not every field. Progressive disclosure carries secondary metadata; it must not hide primary state.

### 4.2 Hierarchy

Authority order (visual weight, not semantic ownership):

```text
Authoritative operational truth
  → Project framing / shared focus
    → Derived projection (labeled)
      → Recommendation (advisory inset)
        → Evidence / metadata
          → Historical record (recessive)
```

Position, surface level, type size/weight, and disclosure — not hue — carry most hierarchy. Color accents **one operational axis** per region (UX-004 §9).

### 4.3 Color

**Established roles preserved.** Identity and operational color coexist:

| Job | Treatment |
| --- | --- |
| Orient | Neutral environment tonals; altitude framing |
| Interaction | Arcane blue / ring |
| Operational state | Four roles; lifecycle owns strong state in Work regions |
| Attention | Ember/amber family only; always with text/icon |
| Recede | Settled, inert, taxonomy, history |

Do not add identity gradients, glow, or a second semantic rainbow. Emerald and arcane violet in `globals.css` remain **reserved accents**, not lifecycle axes.

### 4.4 Typography

Use PROJECT-UX-004 roles; character within roles:

| Role | Character |
| --- | --- |
| Altitude heading | Geist, tight tracking, unmistakable identity |
| Section heading | Clear region naming; materially below altitude |
| Operational truth | High legibility, medium weight, slightly larger than narrative |
| Narrative | Inter, comfortable leading, bounded measure |
| Metadata / state | Compact but AA-compliant; never micro-text |
| Identifier / instrumentation | JetBrains Mono, tabular figures where numeric |
| Evidence / history | Quieter size/weight; past-tense copy |

Narrative prose does not use monospace. Instrumentation does not use display headline sizing.

### 4.5 Depth

Depth is **tonal layering first**: Environment → Surface → Inset. Hairline borders where region boundaries require them. Shadows **only** on invoked overlays (UX-004 §7). No floating-card stacks. No glassmorphism on operational truth.

Parent context may **compress** (summary band) rather than vanish (EXPERIMENT-001 §2.3 — validated learning, not prototype styling).

### 4.6 Instrumentation

Feels like instrumentation when:

- sourced from a defined projection over authoritative data;
- labeled with purpose and denominator where applicable;
- typographic-first (counts, distributions, compact tables);
- links to an inspection path;
- quiet when nominal.

Not instrumentation: decorative charts, velocity, health scores, activity inferred from timestamps.

### 4.7 Motion

A distinctive **spectacle** motion language is **not justified**. Authenticated motion is **functional and minimal**:

| Permitted | Prohibited |
| --- | --- |
| Disclosure expand/collapse | Load-time chart animation |
| Short opacity/color on hover/focus | Pulsing attention badges |
| Optional subtle row/selection feedback | Breathing borders, glow, parallax |
| Overlay enter/exit (command surface, sheets) | Motion as sole state indicator |

Respect `prefers-reduced-motion`: remove nonessential transitions; state never depends on animation. Duration character: **short, ease-out, barely noticed** — aligned with public CREATIVE_DIRECTION spirit, adapted for tools.

### 4.8 Interaction feel

Actions should feel **deliberate and inspectable**: explicit labels, confirmation for destructive paths, separate authorization conversations for lifecycle changes, stale-version errors rather than silent overwrite. Reversible where the domain supports it (navigation, disclosure). Calm under density — no nag loops, no shake animations on validation.

---

## 5. Advanced-system / command-center influence

### Adopt

- Spatial clarity and persistent orientation
- Real instrumentation from projections
- High information density with strict hierarchy
- State visibility through role language, not hue spam
- Layered context (environment + surface + inset)
- Precise interaction and monospace identifiers
- Restrained environmental depth
- Field/instrument **concept** (scope without authority — EXPERIMENT-001 §2.11–2.13) for future invoked actions

### Reject

- Fake telemetry and invented metrics
- HUD overlays, corner ornaments, decorative reticles
- Gratuitous blueprint/grid on content regions
- Terminal cosplay, scan lines, CRT effects
- Neon/glow as default emphasis
- Illegible microtext or sub-AA contrast
- Meaningless animation and loading theater
- Game-interface ornament and cockpit clutter
- Decorative charts and portfolio widgets

**Advanced** means information behavior and interaction quality, not fictional interface imitation.

---

## 6. Originality constraints (failure-mode tests)

| Failure mode | Prevented by |
| --- | --- |
| A. Generic SaaS admin dashboard | No KPI tiles; real projections only; authority hierarchy; not card-grid-first |
| B. Generic dark developer tool | Operational roles + Work-centric semantics; not file-tree/editor chrome |
| C. VS Code imitation | Explicit UX-004 exclusion; no panel docking, tabs, or editor metaphor |
| D. Cyberpunk/HUD | No glow/bloom; accent budget; no HUD decoration |
| E. Gaming UI | Arcane violet reserved; no sigil/glyph language from experiment |
| F. Corporate dashboard | No vanity metrics; honest ambiguity; not portfolio ranking |
| G. Public marketing transplanted | Separate theme keys; no hero/editorial measure on Work surfaces |
| H. Component-library demo | Domain compositions (focus, continuation, lifecycle) required; primitives alone insufficient |

---

## 7. Authenticated vs public

### Shared identity signals

- Calm confidence; clarity over hype
- Restraint; intentional whitespace as structure
- Strong hierarchy; few words where possible
- Dark-friendly craft (authenticated default; public may differ in pacing)
- Exploration/navigation metaphor (disciplined, not playful)

### Authenticated-specific

- Graphite operating field, structured rows, operational roles
- Persistent shell and altitude
- Monospace identifiers and provenance
- Dense inspectability; invoked authoring
- Honest operational absence and failure

### Public-specific (do not copy)

- Editorial hero pacing, ship narrative, section-by-section curiosity journey
- Marketing measure and display typography scale
- Blueprint/grid as atmosphere on marketing sections
- “Never fully bright” as **visitor** emotional device — authenticated light mode must remain first-class (UX-004 §8)

---

## 8. Dark and light invariants

Identity must not depend on black background, glow, or dark-only tricks.

| Invariant across themes |
| --- |
| Three surface levels remain distinguishable by tonal step |
| Operational roles remain distinct with AA text on role backgrounds |
| Interaction accent remains hue 262 family |
| Attention remains ember/amber family with text/icon |
| Taxonomy stays neutral |
| Hierarchy order unchanged |
| Monospace identifiers and structured rows unchanged |
| No glow-only emphasis |

Light mode uses the same semantic structure; environment may read as soft graphite-on-paper rather than void.

---

## 9. Representative surface application (conceptual)

### Workspace

Feels like **entry and resumption**, not a dashboard: continuation-first band, attention region when non-empty, bounded Project signal, real categorical counts only. Replace legacy card continuation with Surface + operational truth typography + row patterns.

### Project

Feels like **operating context**, not PM software: operating brief dominates; focus projection explicit; Work inventory bounded with link to complete collection; milestones and metadata subordinate via disclosure. Context rail carries identity; not a vertical feature catalog.

### Engineering Work

Feels like **governed activity**, not a ticket: operating module + activity surface for truth; inspector for evidence/history; lifecycle forms invoked. Unified detail architecture (UX-004 Package 6 direction); defect pattern generalized, not divergent page shapes.

### Inspector / History / Evidence

**Inspectable annex**: inset typography, authority labels on references, timeline collapsed by default, actors visible in history. Never competes vertically with next action.

### Knowledge / Collections

Same environment grammar: structured rows, taxonomy neutral, Surface/Inset — not isolated card libraries. Retrieval surfaces declare altitude; do not mimic marketing grids.

---

## 10. AREDIR-EXPERIMENT-001 disposition

| Category | Items |
| --- | --- |
| **Validated learning** | Lifecycle as stable axis; altitude as population narrowing; parent context compression; deterministic non-ranking order; focus/continuation/attention separation; authority via position/boundary; current truth forward / history subordinate; honest absence sizing; field/instrument scope vs authority; route reconstruction mandatory |
| **Interesting but unvalidated** | Geometry-as-receipt after mutation; manifold at scale |
| **Visual experiment only** | Glow, bloom, prototype palette, sigil, glyphs, animations, exact layout |
| **Rejected / not promoted** | All §3 visual treatment; ambient attention fabrication |

A restrained technical field/grid for **empty/header** regions remains a **hypothesis** (EXPERIMENT-001 §3); not required for identity, not authority-bearing.

---

## 11. Authenticated identity invariants

1. Aredir authenticated surfaces shall express **authority class** before content type.
2. Aredir shall use **Environment / Surface / Inset** — not nested cards — for operational hierarchy.
3. Aredir shall reserve **arcane blue** for interaction and selection, not structural importance.
4. Aredir shall use **at most one strong operational color axis** per region.
5. Aredir shall label **derived projections** and never style them as persisted decisions.
6. Aredir shall keep **history and evidence subordinate** to current operational truth by default.
7. Aredir shall render **absence, null, and failure** explicitly — never as blank decorative space.
8. Aredir shall use **structured rows** for scalable inventories, not card grids.
9. Aredir shall keep **monospace** for identifiers and instrumentation, not narrative prose.
10. Aredir shall instrument only **defined projections** over authoritative state.
11. Aredir shall not use **motion** as the sole carrier of state or urgency.
12. Aredir shall maintain **AA contrast** in both authenticated themes at rendered sizes.
13. Aredir shall not imitate **HUD, terminal, IDE, dashboard, or game** interface tropes.
14. Aredir shall preserve **Project context** across Work-altitude routes.
15. Aredir shall treat **public marketing composition** as non-authoritative for authenticated layout.

---

## 12. Handoff to future PROJECT-UX work

Future packages should receive:

- §3 character attributes (review checklist)
- §4 principles (density, hierarchy, color, type, depth, instrumentation, motion, interaction)
- §5 adopt/reject list for command-center references
- §6 originality tests
- §9 surface application notes
- §11 invariants

Do **not** receive from this record: new tokens, component APIs, lifecycle enums, graph behavior, or revised package sequencing (remain UX-004 §24).

**Suggested visual review checklist** (for PRs touching authenticated UI):

1. Does authority class determine weight?
2. Are primitives used instead of ad-hoc cards?
3. Is accent usage sparse and interaction-scoped?
4. Are projections labeled?
5. Is history/evidence subordinate and inspectable?
6. Does empty/failure read honestly?
7. Would this pass the §6 failure-mode tests?
8. Both themes AA-compliant?

---

## 13. Documentation ownership

| Record | Role |
| --- | --- |
| **PROJECT-UX-009 (this record)** | Canonical **authenticated visual language** (Layer 2) |
| PROJECT-UX-004 | Spatial architecture, regions, roles, primitives boundary — unchanged |
| PROJECT-UX-003 | Evaluation that motivated UX-004/005 — historical |
| AREDIR-DISCOVERY-014 | Expression synthesis; hypotheses deferred — complementary |
| CREATIVE_DIRECTION | Public brand journey — boundary only |
| docs/company/brand/VISUAL_IDENTITY.md | Company-wide visual identity placeholder; points here for authenticated product |

---

## 14. Discovery outcome

**Decision: A — DISCOVERY COMPLETE.**

Visual-language direction is sufficiently established to persist and guide later implementation. No additional bounded visual experiment is required before documentation; EXPERIMENT-001 already bounded spatial hypotheses separately.

Implementation remains authorized only through existing PROJECT-UX-004 package sequence and separate Engineering Work packages — not through this discovery record.

---

*End of PROJECT-UX-009*
