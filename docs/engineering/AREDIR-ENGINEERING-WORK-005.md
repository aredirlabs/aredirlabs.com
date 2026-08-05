# ENGINEERING-WORK-005 — Project-Scoped Work Creation

## Outcome

Adds the smallest authenticated creation path for project-scoped Engineering Work:

`Projects → project detail → Engineering Work → New Engineering Work → existing detail page`

The project comes only from the route segment. There is no project picker.

## Implementation

- `src/app/workspace/projects/[slug]/engineering-work/new/page.tsx` resolves the route project before rendering the form.
- `src/components/workspace/create-engineering-work-form.tsx` collects only title, type, workflow, objective, lifecycle state, and recommended next action.
- `createEngineeringWork` authenticates every request, re-resolves the project from the route slug, validates every required field server-side, limits text lengths, and accepts only known enum values.
- On success the action returns only the created ID. The form replaces its route with the existing read-only Engineering Work detail page.
- The Engineering Work project section now exposes the `New Engineering Work` entry point.

## Guardrails

No creator or owner field is added. The mutation creates no repository references, related knowledge, relationships, rich text, update path, or delete path. The insert always uses the project ID obtained by server-side lookup rather than a client-supplied project value.

## Continuation handling

Workspace continuation prioritizes Active, then In Review, then Proposed work by recency. A new safely defaulted Proposed record is therefore eligible for continuation only when it does not displace more operationally active work.

## Verification

- `npm run lint` passed.
- `npm run build` and `git diff --check` are recorded in the companion validation report.
- No production action was taken.
