# UX-001 — Project Operational Hierarchy

**Status:** implemented

## Implementation summary

The Project page now leads with Engineering Work immediately after the project identity. The section is visually elevated as the current operational focus and selects the most relevant existing Engineering Work record by its validated lifecycle state: active, then in review, then proposed, followed by the remaining existing records. No data is written or altered.

The featured work card makes its title, purpose, current state, and “What should happen next” visible before supporting project collections. Remaining Engineering Work records are retained under “Other engineering work.” Current focus, overview, registry metadata, milestones, documents, prompts, and notes remain present, but now follow the operational focus.

The Engineering Work detail page now begins with an operational brief:

- the work objective (existing summary);
- current position (existing type, workflow, and lifecycle state);
- what should happen next (existing current next action).

Outcome, condition, repository references, and record details remain available as supporting information. The return link now explicitly says “Back to project · [project name].”

## Rationale

| UX change | Rationale |
| --- | --- |
| Engineering Work placed directly below the project title | Gives a first-time user the project context and most important work without scanning unrelated collections. |
| Featured work is state-prioritized | Active work is presented before review, proposed, and closed work using the existing model only. |
| Next action is named in both project and detail views | Answers the immediate operational question without requiring the user to open metadata or inspect every section. |
| Engineering Work detail becomes an operational brief | Makes objective and next action primary; metadata supports orientation instead of reading as a database record. |
| Existing project/detail links retained and clarified | Project → Engineering Work and Engineering Work → Project remain a direct, natural two-way path without adding navigation systems. |

## Validation notes

- Per the requested first-time-user sequence, runtime evaluation began before implementation inspection. The local app was started and the public sign-in entry point was reachable; the protected project route requires an authenticated session.
- No safe local test credential was supplied, and no browser automation runtime was available, so authenticated visual screenshots were not captured. Screenshots are omitted rather than fabricating an authenticated state.
- `npm run lint` passed.
- `npm run build` passed, including TypeScript and the dynamic Project and Engineering Work routes.
- Review of the implemented hierarchy confirms the intended ten-second orientation path: project name in the page header, featured Engineering Work directly below, and an explicitly labeled next action in the featured card.

## Future observations

None discovered during implementation. This work intentionally does not add lifecycle controls, prioritization fields, CRUD, navigation systems, authorization, authentication, or schema changes.
