"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { updateEngineeringWork, type UpdateEngineeringWorkState } from "@/app/workspace/projects/[slug]/actions";
import { Button } from "@/components/ui/button";
import {
  ENGINEERING_WORK_STATES, ENGINEERING_WORK_STATE_LABELS,
  ENGINEERING_WORK_TYPES, ENGINEERING_WORK_TYPE_LABELS,
  ENGINEERING_WORK_WORKFLOWS, ENGINEERING_WORK_WORKFLOW_LABELS,
  type EngineeringWorkState, type EngineeringWorkType, type EngineeringWorkWorkflow,
} from "@/lib/workspace/engineering-work";

const initialState: UpdateEngineeringWorkState = {};
const inputClassName = "mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

type EditEngineeringWorkFormProps = {
  projectSlug: string;
  work: { id: string; title: string; type: EngineeringWorkType; workflow: EngineeringWorkWorkflow; state: EngineeringWorkState; summary: string; currentNextAction: string };
};

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-sm text-destructive">{message}</p> : null;
}

export function EditEngineeringWorkForm({ projectSlug, work }: EditEngineeringWorkFormProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(updateEngineeringWork.bind(null, projectSlug, work.id), initialState);
  const detailPath = `/workspace/projects/${projectSlug}/engineering-work/${work.id}`;

  useEffect(() => {
    if (state.success) router.replace(detailPath);
  }, [detailPath, router, state.success]);

  return (
    <form action={formAction} className="mt-6 space-y-5">
      <div><label htmlFor="engineering-work-title" className="block text-sm font-medium text-foreground">Title</label><input id="engineering-work-title" name="title" type="text" required maxLength={200} autoFocus defaultValue={work.title} className={inputClassName} /><FieldError message={state.fieldErrors?.title} /></div>
      <div className="grid gap-4 sm:grid-cols-3">
        <div><label htmlFor="engineering-work-type" className="block text-sm font-medium text-foreground">Familiar type</label><select id="engineering-work-type" name="type" required defaultValue={work.type} className={inputClassName}>{ENGINEERING_WORK_TYPES.map((type) => <option key={type} value={type}>{ENGINEERING_WORK_TYPE_LABELS[type]}</option>)}</select><FieldError message={state.fieldErrors?.type} /></div>
        <div><label htmlFor="engineering-work-workflow" className="block text-sm font-medium text-foreground">Workflow</label><select id="engineering-work-workflow" name="workflow" required defaultValue={work.workflow} className={inputClassName}>{ENGINEERING_WORK_WORKFLOWS.map((workflow) => <option key={workflow} value={workflow}>{ENGINEERING_WORK_WORKFLOW_LABELS[workflow]}</option>)}</select><FieldError message={state.fieldErrors?.workflow} /></div>
        <div><label htmlFor="engineering-work-state" className="block text-sm font-medium text-foreground">Lifecycle state</label><select id="engineering-work-state" name="state" required defaultValue={work.state} className={inputClassName}>{ENGINEERING_WORK_STATES.map((state) => <option key={state} value={state}>{ENGINEERING_WORK_STATE_LABELS[state]}</option>)}</select><FieldError message={state.fieldErrors?.state} /></div>
      </div>
      <div><label htmlFor="engineering-work-summary" className="block text-sm font-medium text-foreground">Objective</label><textarea id="engineering-work-summary" name="summary" required maxLength={4000} rows={5} defaultValue={work.summary} className={inputClassName} /><FieldError message={state.fieldErrors?.summary} /></div>
      <div><label htmlFor="engineering-work-next-action" className="block text-sm font-medium text-foreground">Recommended next action</label><textarea id="engineering-work-next-action" name="current_next_action" required maxLength={2000} rows={3} defaultValue={work.currentNextAction} className={inputClassName} /><FieldError message={state.fieldErrors?.currentNextAction} /></div>
      {state.error ? <div role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</div> : null}
      <div className="flex items-center gap-3"><Button type="submit" disabled={pending}>{pending ? "Saving..." : "Save changes"}</Button><Button asChild type="button" variant="outline"><Link href={detailPath}>Cancel</Link></Button></div>
    </form>
  );
}
