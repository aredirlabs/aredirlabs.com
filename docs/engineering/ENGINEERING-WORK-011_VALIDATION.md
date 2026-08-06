# ENGINEERING-WORK-011 Validation

## Validation scope

| Check | Expected result |
| --- | --- |
| Delivery creation | Existing Objective and Recommended next action controls remain required and submit through the existing action. |
| Workflow reaction | Changing the Workflow select changes the conversation heading and associated configured section without navigation. |
| Shared fields | Title, Familiar type, Workflow, and Lifecycle state remain present and unchanged. Project remains route-derived; record ID remains server-generated. |
| Persistence | The create action and inserted Engineering Work fields are unchanged. |
| Unsupported workflows | Placeholder content exposes the planned conversation; no workflow-specific fields, persistence, or validation is introduced. |
| Schema | No Drizzle schema or migration files are changed. |
| HTTP 431 baseline | No Engineering Work data is modified, replaced, or duplicated. |

## Automated checks

Completed from the repository root:

```powershell
npm run lint
npm run build
git diff --check
```

All three checks passed. The build completed the `/workspace/projects/[slug]/engineering-work/new` route successfully.

## Manual authenticated check

1. Open a project’s **New Engineering Work** page while signed in.
2. Confirm the initial Delivery conversation retains **Objective** and **Recommended next action** and create a Delivery item using the normal flow.
3. Confirm the resulting detail record retains its title, familiar type, workflow, lifecycle, summary, and next action.
4. Return to the create page and switch among existing workflow values. Confirm the conversation heading and placeholder field list update without affecting the shared fields.
5. Do not open, edit, replace, or duplicate the existing HTTP 431 browser-state record.

Authenticated runtime validation depends on an available local user session and should be recorded when performed.
