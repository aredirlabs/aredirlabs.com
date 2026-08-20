"use client";

import { useActionState, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  createEngineeringWork,
  type CreateEngineeringWorkState,
} from "@/app/workspace/projects/[slug]/engineering-work-actions";
import { Button } from "@/components/ui/button";
import {
  ENGINEERING_WORK_TYPES,
  ENGINEERING_WORK_TYPE_LABELS,
  ENGINEERING_WORK_WORKFLOWS,
  ENGINEERING_WORK_WORKFLOW_LABELS,
  type EngineeringWorkWorkflow,
} from "@/lib/workspace/engineering-work";
import { getEngineeringWorkIntakeDefinition } from "@/lib/workspace/engineering-work-intake";

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
  const [workflow, setWorkflow] = useState<EngineeringWorkWorkflow>("delivery");
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

  const intake = getEngineeringWorkIntakeDefinition(workflow);

  return (
    <form action={formAction} className="mt-6 space-y-5">
      <div>
        <label htmlFor="engineering-work-title" className="block text-sm font-medium text-foreground">
          Title
        </label>
        <input id="engineering-work-title" name="title" type="text" required maxLength={200} autoFocus placeholder="Engineering Work title" className={inputClassName} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="engineering-work-type" className="block text-sm font-medium text-foreground">Familiar type</label>
          <select id="engineering-work-type" name="type" required defaultValue="task" className={inputClassName}>
            {ENGINEERING_WORK_TYPES.map((type) => <option key={type} value={type}>{ENGINEERING_WORK_TYPE_LABELS[type]}</option>)}
          </select>
        </div>
        <div>
          <label htmlFor="engineering-work-workflow" className="block text-sm font-medium text-foreground">Workflow</label>
          <select id="engineering-work-workflow" name="workflow" required value={workflow} onChange={(event) => setWorkflow(event.target.value as EngineeringWorkWorkflow)} className={inputClassName}>
            {ENGINEERING_WORK_WORKFLOWS.map((workflow) => <option key={workflow} value={workflow}>{ENGINEERING_WORK_WORKFLOW_LABELS[workflow]}</option>)}
          </select>
        </div>
      </div>

      <div className="rounded-md border border-border bg-muted/20 px-3 py-3 text-sm text-muted-foreground">
        New Engineering Work is recorded as <span className="font-medium text-foreground">Proposed</span>. Activation is a separate authorized lifecycle transition.
      </div>

      <section aria-labelledby="engineering-work-conversation" className="space-y-5 rounded-lg border border-border bg-muted/20 p-4 sm:p-5">
        <div>
          <h2 id="engineering-work-conversation" className="text-base font-medium text-foreground">{ENGINEERING_WORK_WORKFLOW_LABELS[workflow]} conversation</h2>
          <p className="mt-1 text-sm text-muted-foreground">{intake.intent}</p>
        </div>

        {intake.implemented ? null : (
          <div className="rounded-md border border-border bg-background px-3 py-3 text-sm text-muted-foreground">
            <p>This workflow&apos;s structured fields are planned. Its intended conversation is:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              {intake.fields.map((field) => <li key={field.label}>{field.label}{field.required ? " (required)" : " (optional)"}</li>)}
            </ul>
            <p className="mt-2">The existing shared submission fields remain available until this workflow is implemented.</p>
          </div>
        )}

        <div>
          <label htmlFor="engineering-work-summary" className="block text-sm font-medium text-foreground">{workflow === "defect" ? "Concise defect synopsis" : intake.implemented ? "Objective" : "Current shared summary"}</label>
          <textarea id="engineering-work-summary" name="summary" required maxLength={4000} rows={workflow === "defect" ? 3 : 5} placeholder={workflow === "defect" ? "A concise description of the defect." : "What should this work accomplish?"} className={inputClassName} />
        </div>

        <div>
          <label htmlFor="engineering-work-next-action" className="block text-sm font-medium text-foreground">{workflow === "defect" ? "Current operational next action" : intake.implemented ? "Recommended next action" : "Current shared next action"}</label>
          <textarea id="engineering-work-next-action" name="current_next_action" required maxLength={2000} rows={3} placeholder="What should happen next?" className={inputClassName} />
        </div>

        {workflow === "defect" ? (
          <div className="space-y-5 border-t border-border pt-5">
            <div><label htmlFor="defect-observed-behavior" className="block text-sm font-medium text-foreground">Observed Behavior</label><textarea id="defect-observed-behavior" name="observed_behavior" required maxLength={4000} rows={4} className={inputClassName} /></div>
            <div><label htmlFor="defect-expected-behavior" className="block text-sm font-medium text-foreground">Expected Behavior</label><textarea id="defect-expected-behavior" name="expected_behavior" required maxLength={4000} rows={4} className={inputClassName} /></div>
            <div><label htmlFor="defect-reproduction-steps" className="block text-sm font-medium text-foreground">Reproduction Steps</label><textarea id="defect-reproduction-steps" name="reproduction_steps" required rows={4} placeholder="Concise steps, or explain why the event is intermittent." className={inputClassName} /></div>
            <div><label htmlFor="defect-environment" className="block text-sm font-medium text-foreground">Environment</label><textarea id="defect-environment" name="environment" required rows={3} placeholder="Relevant browser, authentication, database, version, or runtime context." className={inputClassName} /></div>
            <div><label htmlFor="defect-evidence" className="block text-sm font-medium text-foreground">Evidence</label><textarea id="defect-evidence" name="evidence" required rows={3} placeholder="HTTP status, console summary, stack trace excerpt, or screenshot reference." className={inputClassName} /></div>
            <div><label htmlFor="defect-next-investigation" className="block text-sm font-medium text-foreground">Next Investigation</label><textarea id="defect-next-investigation" name="next_investigation" required rows={3} className={inputClassName} /></div>
            <div><label htmlFor="defect-validation-target" className="block text-sm font-medium text-foreground">Validation Target</label><textarea id="defect-validation-target" name="validation_target" required rows={3} placeholder="What confirms the defect has been investigated or resolved?" className={inputClassName} /></div>
          </div>
        ) : null}
      </section>

      {state.error ? <div role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</div> : null}

      <Button type="submit" disabled={pending}>
        {pending ? "Creating..." : "Create Engineering Work"}
      </Button>
    </form>
  );
}
