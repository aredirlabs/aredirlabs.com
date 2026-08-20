"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  completeEngineeringWork,
  correctProposedEngineeringWork,
  operateEngineeringWork,
  transitionEngineeringWork,
  type EngineeringWorkMutationState,
} from "@/app/workspace/projects/[slug]/engineering-work-actions";
import { Button } from "@/components/ui/button";
import {
  ENGINEERING_WORK_STATE_LABELS,
  ENGINEERING_WORK_TYPES,
  ENGINEERING_WORK_TYPE_LABELS,
  ENGINEERING_WORK_WORKFLOW_LABELS,
  type EngineeringWorkState,
  type EngineeringWorkType,
  type EngineeringWorkWorkflow,
} from "@/lib/workspace/engineering-work";

const initialState: EngineeringWorkMutationState = {};
const inputClassName = "mt-1 block w-full rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring";

type Work = {
  id: string;
  title: string;
  type: EngineeringWorkType;
  workflow: EngineeringWorkWorkflow;
  state: EngineeringWorkState;
  summary: string;
  currentNextAction: string | null;
  currentOutcome: string | null;
  condition: string | null;
  conditionRationale: string | null;
  version: number;
};

type DefectContext = {
  observedBehavior: string;
  expectedBehavior: string;
  reproductionSteps: string;
  environment: string;
  evidence: string;
  nextInvestigation: string;
  validationTarget: string;
};

function FieldError({ message }: { message?: string }) {
  return message ? <p className="mt-1 text-sm text-destructive">{message}</p> : null;
}

function MutationError({ state }: { state: EngineeringWorkMutationState }) {
  return state.error ? <div role="alert" className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{state.error}</div> : null;
}

function DefectContextFields({ context, prefix }: { context: DefectContext; prefix: string }) {
  const fields = [
    ["observed_behavior", "Observed Behavior", context.observedBehavior, 4],
    ["expected_behavior", "Expected Behavior", context.expectedBehavior, 4],
    ["reproduction_steps", "Reproduction Steps", context.reproductionSteps, 4],
    ["environment", "Environment", context.environment, 3],
    ["evidence", "Evidence", context.evidence, 3],
    ["next_investigation", "Next Investigation", context.nextInvestigation, 3],
    ["validation_target", "Validation Target", context.validationTarget, 3],
  ] as const;

  return (
    <section className="space-y-5 rounded-lg border border-border bg-muted/20 p-4 sm:p-5">
      <div>
        <h2 className="text-base font-medium text-foreground">Defect investigation</h2>
        <p className="mt-1 text-sm text-muted-foreground">A changed Defect context is captured as a dedicated immutable revision in the same operation.</p>
      </div>
      {fields.map(([name, label, value, rows]) => {
        const id = `${prefix}-${name}`;
        return <div key={name}><label htmlFor={id} className="block text-sm font-medium text-foreground">{label}</label><textarea id={id} name={name} required maxLength={4000} rows={rows} defaultValue={value} className={inputClassName} /></div>;
      })}
    </section>
  );
}

function useReturnOnSuccess(projectSlug: string, workId: string, success?: boolean) {
  const router = useRouter();
  const detailPath = `/workspace/projects/${projectSlug}/engineering-work/${workId}`;
  useEffect(() => {
    if (success) router.replace(detailPath);
  }, [detailPath, router, success]);
  return detailPath;
}

export function CorrectProposedEngineeringWorkForm({ projectSlug, work, defectContext }: { projectSlug: string; work: Work; defectContext: DefectContext | null }) {
  const [state, formAction, pending] = useActionState(correctProposedEngineeringWork.bind(null, projectSlug, work.id), initialState);
  const detailPath = useReturnOnSuccess(projectSlug, work.id, state.success);

  return (
    <form action={formAction} className="mt-6 space-y-5">
      <input type="hidden" name="version" value={work.version} />
      <div><label htmlFor="correction-title" className="block text-sm font-medium text-foreground">Title</label><input id="correction-title" name="title" required maxLength={200} autoFocus defaultValue={work.title} className={inputClassName} /><FieldError message={state.fieldErrors?.title} /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="correction-type" className="block text-sm font-medium text-foreground">Familiar type</label><select id="correction-type" name="type" required defaultValue={work.type} className={inputClassName}>{ENGINEERING_WORK_TYPES.map((type) => <option key={type} value={type}>{ENGINEERING_WORK_TYPE_LABELS[type]}</option>)}</select><FieldError message={state.fieldErrors?.type} /></div>
        <div><p className="block text-sm font-medium text-foreground">Stable workflow</p><p className="mt-1 rounded-md border border-border bg-muted/20 px-3 py-2 text-sm">{ENGINEERING_WORK_WORKFLOW_LABELS[work.workflow]}</p></div>
      </div>
      <div><label htmlFor="correction-summary" className="block text-sm font-medium text-foreground">{work.workflow === "defect" ? "Concise defect synopsis" : "Objective"}</label><textarea id="correction-summary" name="summary" required maxLength={4000} rows={4} defaultValue={work.summary} className={inputClassName} /><FieldError message={state.fieldErrors?.summary} /></div>
      <div><label htmlFor="correction-next-action" className="block text-sm font-medium text-foreground">Recommended next action</label><textarea id="correction-next-action" name="current_next_action" required maxLength={2000} rows={3} defaultValue={work.currentNextAction ?? ""} className={inputClassName} /><FieldError message={state.fieldErrors?.currentNextAction} /></div>
      {defectContext ? <DefectContextFields context={defectContext} prefix="correction-defect" /> : null}
      <div><label htmlFor="correction-rationale" className="block text-sm font-medium text-foreground">Correction rationale</label><textarea id="correction-rationale" name="rationale" required maxLength={4000} rows={3} className={inputClassName} /><FieldError message={state.fieldErrors?.rationale} /></div>
      <div><label htmlFor="correction-basis" className="block text-sm font-medium text-foreground">Decision basis <span className="font-normal text-muted-foreground">(optional)</span></label><textarea id="correction-basis" name="decision_basis" maxLength={4000} rows={3} className={inputClassName} /><FieldError message={state.fieldErrors?.decisionBasis} /></div>
      <FieldError message={state.fieldErrors?.defectContext} />
      <MutationError state={state} />
      <div className="flex items-center gap-3"><Button type="submit" disabled={pending}>{pending ? "Recording..." : "Record proposed correction"}</Button><Button asChild type="button" variant="outline"><Link href={detailPath}>Cancel</Link></Button></div>
    </form>
  );
}

export function OperateEngineeringWorkForm({ projectSlug, work, defectContext }: { projectSlug: string; work: Work; defectContext: DefectContext | null }) {
  const [state, formAction, pending] = useActionState(operateEngineeringWork.bind(null, projectSlug, work.id), initialState);
  const detailPath = useReturnOnSuccess(projectSlug, work.id, state.success);

  return (
    <form action={formAction} className="mt-6 space-y-5">
      <input type="hidden" name="version" value={work.version} />
      <input type="hidden" name="expected_state" value={work.state} />
      <section className="rounded-md border border-border bg-muted/20 p-4">
        <p className="text-sm font-medium text-foreground">Stable identity and intent</p>
        <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-3"><div><dt className="text-muted-foreground">Title</dt><dd className="mt-1">{work.title}</dd></div><div><dt className="text-muted-foreground">Type</dt><dd className="mt-1">{ENGINEERING_WORK_TYPE_LABELS[work.type]}</dd></div><div><dt className="text-muted-foreground">Workflow</dt><dd className="mt-1">{ENGINEERING_WORK_WORKFLOW_LABELS[work.workflow]}</dd></div></dl>
        <p className="mt-3 text-sm text-muted-foreground">{work.summary}</p>
      </section>
      <div><label htmlFor="operate-next-action" className="block text-sm font-medium text-foreground">Current Next Action</label><textarea id="operate-next-action" name="current_next_action" required maxLength={2000} rows={3} defaultValue={work.currentNextAction ?? ""} className={inputClassName} /><FieldError message={state.fieldErrors?.currentNextAction} /></div>
      <div><label htmlFor="operate-outcome" className="block text-sm font-medium text-foreground">Outcome <span className="font-normal text-muted-foreground">(optional)</span></label><textarea id="operate-outcome" name="current_outcome" maxLength={4000} rows={4} defaultValue={work.currentOutcome ?? ""} className={inputClassName} /><FieldError message={state.fieldErrors?.currentOutcome} /></div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div><label htmlFor="operate-condition" className="block text-sm font-medium text-foreground">Condition <span className="font-normal text-muted-foreground">(optional)</span></label><input id="operate-condition" name="condition" maxLength={500} defaultValue={work.condition ?? ""} className={inputClassName} /><FieldError message={state.fieldErrors?.condition} /></div>
        <div><label htmlFor="operate-condition-rationale" className="block text-sm font-medium text-foreground">Condition Rationale</label><textarea id="operate-condition-rationale" name="condition_rationale" maxLength={4000} rows={3} defaultValue={work.conditionRationale ?? ""} className={inputClassName} /><FieldError message={state.fieldErrors?.conditionRationale} /></div>
      </div>
      {defectContext ? <DefectContextFields context={defectContext} prefix="operate-defect" /> : null}
      <div><label htmlFor="operate-rationale" className="block text-sm font-medium text-foreground">Update rationale</label><textarea id="operate-rationale" name="rationale" required maxLength={4000} rows={3} className={inputClassName} /><FieldError message={state.fieldErrors?.rationale} /></div>
      <div><label htmlFor="operate-basis" className="block text-sm font-medium text-foreground">Decision basis <span className="font-normal text-muted-foreground">(optional)</span></label><textarea id="operate-basis" name="decision_basis" maxLength={4000} rows={3} className={inputClassName} /><FieldError message={state.fieldErrors?.decisionBasis} /></div>
      <FieldError message={state.fieldErrors?.defectContext} />
      <MutationError state={state} />
      <div className="flex items-center gap-3"><Button type="submit" disabled={pending}>{pending ? "Recording..." : "Record operational update"}</Button><Button asChild type="button" variant="outline"><Link href={detailPath}>Cancel</Link></Button></div>
    </form>
  );
}

export function CompleteEngineeringWorkForm({ projectSlug, work }: { projectSlug: string; work: Work }) {
  const [state, formAction, pending] = useActionState(completeEngineeringWork.bind(null, projectSlug, work.id), initialState);
  const detailPath = useReturnOnSuccess(projectSlug, work.id, state.success);

  return (
    <form action={formAction} className="mt-6 space-y-5">
      <input type="hidden" name="version" value={work.version} />
      <input type="hidden" name="expected_state" value={work.state} />

      <section className="rounded-md border border-border bg-muted/20 p-4">
        <p className="text-sm font-medium text-foreground">Completion context</p>
        <dl className="mt-3 grid gap-4 text-sm sm:grid-cols-2">
          <div><dt className="text-muted-foreground">Objective</dt><dd className="mt-1">{work.summary}</dd></div>
          <div><dt className="text-muted-foreground">Prior lifecycle state</dt><dd className="mt-1">{ENGINEERING_WORK_STATE_LABELS[work.state]}</dd></div>
          <div><dt className="text-muted-foreground">Prior Current Next Action</dt><dd className="mt-1">{work.currentNextAction ?? "None recorded"}</dd></div>
          <div><dt className="text-muted-foreground">Current interim Outcome</dt><dd className="mt-1">{work.currentOutcome ?? "None recorded"}</dd></div>
          <div><dt className="text-muted-foreground">Current Condition</dt><dd className="mt-1">{work.condition ?? "None recorded"}</dd></div>
          <div><dt className="text-muted-foreground">Condition Rationale</dt><dd className="mt-1">{work.conditionRationale ?? "None recorded"}</dd></div>
        </dl>
        <p className="mt-4 text-sm text-muted-foreground">On completion, the prior Next Action and Condition remain in append-only history while the current projection clears them.</p>
      </section>

      <div><label htmlFor="complete-outcome" className="block text-sm font-medium text-foreground">Verified Outcome</label><textarea id="complete-outcome" name="verified_outcome" required maxLength={4000} rows={5} defaultValue={work.currentOutcome ?? ""} className={inputClassName} /><FieldError message={state.fieldErrors?.verifiedOutcome} /></div>
      <label className="flex items-start gap-3 rounded-md border border-border bg-background px-3 py-3 text-sm"><input type="checkbox" name="outcome_verified" value="verified" required className="mt-0.5 size-4" /><span><span className="font-medium text-foreground">Outcome verified</span><span className="mt-1 block text-muted-foreground">I confirm that the stated Outcome was verified against the completion objective.</span></span></label>
      <FieldError message={state.fieldErrors?.outcomeVerification} />
      <div><label htmlFor="complete-disposition" className="block text-sm font-medium text-foreground">Final disposition</label><textarea id="complete-disposition" name="final_disposition" required maxLength={4000} rows={4} className={inputClassName} /><FieldError message={state.fieldErrors?.finalDisposition} /></div>
      <div><label htmlFor="complete-rationale" className="block text-sm font-medium text-foreground">Completion rationale</label><textarea id="complete-rationale" name="rationale" required maxLength={4000} rows={4} className={inputClassName} /><FieldError message={state.fieldErrors?.rationale} /></div>
      <div><label htmlFor="complete-basis" className="block text-sm font-medium text-foreground">Decision basis</label><textarea id="complete-basis" name="decision_basis" required maxLength={4000} rows={4} className={inputClassName} /><FieldError message={state.fieldErrors?.decisionBasis} /></div>

      <section className="rounded-md border border-primary/20 bg-primary/5 p-4 text-sm">
        <h2 className="font-medium text-foreground">Persisted decision provenance</h2>
        <dl className="mt-3 grid gap-3 sm:grid-cols-2">
          <div><dt className="text-muted-foreground">Action actor</dt><dd className="mt-1">The authenticated human submitting this form</dd></div>
          <div><dt className="text-muted-foreground">Decision actor</dt><dd className="mt-1">The authenticated human authorizing completion</dd></div>
        </dl>
        <p className="mt-3 text-muted-foreground">The current UI uses the same human for both roles, but the event persists their identities in separate action-actor and decision-actor fields.</p>
      </section>

      <MutationError state={state} />
      <div className="flex items-center gap-3"><Button type="submit" disabled={pending}>{pending ? "Completing..." : "Complete Engineering Work"}</Button><Button asChild type="button" variant="outline"><Link href={detailPath}>Cancel</Link></Button></div>
    </form>
  );
}

export function EngineeringWorkTransitionForm({ projectSlug, work }: { projectSlug: string; work: Work }) {
  const target = work.state === "proposed" ? "active" : work.state === "active" ? "in_review" : work.state === "in_review" ? "active" : null;
  const [state, formAction, pending] = useActionState(transitionEngineeringWork.bind(null, projectSlug, work.id), initialState);
  useReturnOnSuccess(projectSlug, work.id, state.success);
  if (!target) return null;

  return (
    <form action={formAction} className="mt-8 space-y-4 border-t border-border pt-6">
      <input type="hidden" name="version" value={work.version} />
      <input type="hidden" name="prior_state" value={work.state} />
      <input type="hidden" name="resulting_state" value={target} />
      <div><h2 className="text-base font-semibold text-foreground">Lifecycle transition</h2><p className="mt-1 text-sm text-muted-foreground">{ENGINEERING_WORK_STATE_LABELS[work.state]} → {ENGINEERING_WORK_STATE_LABELS[target]}</p></div>
      <div><label htmlFor="transition-rationale" className="block text-sm font-medium text-foreground">Authorization rationale</label><textarea id="transition-rationale" name="rationale" required maxLength={4000} rows={3} className={inputClassName} /></div>
      <div><label htmlFor="transition-basis" className="block text-sm font-medium text-foreground">Decision basis</label><textarea id="transition-basis" name="decision_basis" required maxLength={4000} rows={3} className={inputClassName} /></div>
      <MutationError state={state} />
      <Button type="submit" variant="outline" disabled={pending}>{pending ? "Recording transition..." : `Move to ${ENGINEERING_WORK_STATE_LABELS[target]}`}</Button>
    </form>
  );
}
