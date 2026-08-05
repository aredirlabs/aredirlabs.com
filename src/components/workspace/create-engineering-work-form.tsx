"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  createEngineeringWork,
  type CreateEngineeringWorkState,
} from "@/app/workspace/projects/[slug]/actions";
import { Button } from "@/components/ui/button";
import {
  ENGINEERING_WORK_STATES,
  ENGINEERING_WORK_STATE_LABELS,
  ENGINEERING_WORK_TYPES,
  ENGINEERING_WORK_TYPE_LABELS,
  ENGINEERING_WORK_WORKFLOWS,
  ENGINEERING_WORK_WORKFLOW_LABELS,
} from "@/lib/workspace/engineering-work";

const initialState: CreateEngineeringWorkState = {};

const inputClassName =
  "mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

type CreateEngineeringWorkFormProps = {
  projectSlug: string;
};

export function CreateEngineeringWorkForm({
  projectSlug,
}: CreateEngineeringWorkFormProps) {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(
    createEngineeringWork.bind(null, projectSlug),
    initialState,
  );

  useEffect(() => {
    if (state.workId) {
      router.replace(
        `/workspace/projects/${projectSlug}/engineering-work/${state.workId}`,
      );
    }
  }, [projectSlug, router, state.workId]);

  return (
    <form action={formAction} className="mt-6 space-y-5">
      <div>
        <label htmlFor="engineering-work-title" className="block text-sm font-medium text-foreground">
          Title
        </label>
        <input id="engineering-work-title" name="title" type="text" required maxLength={200} autoFocus placeholder="Engineering Work title" className={inputClassName} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="engineering-work-type" className="block text-sm font-medium text-foreground">Familiar type</label>
          <select id="engineering-work-type" name="type" required defaultValue="task" className={inputClassName}>
            {ENGINEERING_WORK_TYPES.map((type) => <option key={type} value={type}>{ENGINEERING_WORK_TYPE_LABELS[type]}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="engineering-work-workflow" className="block text-sm font-medium text-foreground">Workflow</label>
          <select id="engineering-work-workflow" name="workflow" required defaultValue="delivery" className={inputClassName}>
            {ENGINEERING_WORK_WORKFLOWS.map((workflow) => <option key={workflow} value={workflow}>{ENGINEERING_WORK_WORKFLOW_LABELS[workflow]}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="engineering-work-state" className="block text-sm font-medium text-foreground">Lifecycle state</label>
          <select id="engineering-work-state" name="state" required defaultValue="proposed" className={inputClassName}>
            {ENGINEERING_WORK_STATES.map((state) => <option key={state} value={state}>{ENGINEERING_WORK_STATE_LABELS[state]}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="engineering-work-summary" className="block text-sm font-medium text-foreground">Objective</label>
        <textarea id="engineering-work-summary" name="summary" required maxLength={4000} rows={5} placeholder="What should this work accomplish?" className={inputClassName} />
      </div>

      <div>
        <label htmlFor="engineering-work-next-action" className="block text-sm font-medium text-foreground">Recommended next action</label>
        <textarea id="engineering-work-next-action" name="current_next_action" required maxLength={2000} rows={3} placeholder="What should happen next?" className={inputClassName} />
      </div>

      {state.error ? <div role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</div> : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Creating..." : "Create Engineering Work"}
      </Button>
    </form>
  );
}
