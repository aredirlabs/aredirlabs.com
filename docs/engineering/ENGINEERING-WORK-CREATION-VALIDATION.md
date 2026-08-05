# Engineering Work Creation Validation

## Static validation

| Check | Result |
| --- | --- |
| Project context | Derived from `[slug]`; no form field can select a project |
| Authentication | Checked by the workspace proxy and again inside the Server Function |
| Project scope | Server action looks up the route slug and inserts only that project ID |
| Enum validation | Type, workflow, and lifecycle state use server-side allowlists |
| Safe default | Form and action default lifecycle state to `proposed` |
| Persistence fields | Title, type, workflow, summary, state, and next action are inserted unchanged after trimming |
| Detail route | Success replaces the route with the existing read-only detail page |
| Duplicate on refresh | The success route is a GET detail page; refresh does not replay the creation action |
| Repository/relationship creation | No fields or mutation logic exist |
| Continuation | Active and In Review retain precedence; a Proposed record is considered only after them |
| Lint | Passed (`npm run lint`) |
| Build | Passed (`npm run build`) |
| Diff check | Passed (`git diff --check`) |

## Required local authenticated journey

Run only against the local development environment:

1. Sign in locally and open `/workspace/projects/aredirlabs-com`.
2. Select **New Engineering Work**.
3. Create **Engineering Work Execution Experience** with the minimum fields.
4. Confirm the detail view retains every submitted value.
5. Refresh the detail URL and confirm there is still exactly one new record.
6. Confirm it appears under AredirLabs.com and not AlignFit or other projects.
7. Submit an invalid enum through a request tool and confirm the action returns its validation error; submit while signed out and confirm the authentication error.

No authenticated browser session was available during implementation, so this final UI mutation was intentionally not performed. No production environment was used.
