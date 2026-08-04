import { cn } from "@/lib/utils";
import {
  ENGINEERING_WORK_STATE_LABELS,
  ENGINEERING_WORK_TYPE_LABELS,
  ENGINEERING_WORK_WORKFLOW_LABELS,
  type EngineeringWorkState,
  type EngineeringWorkType,
  type EngineeringWorkWorkflow,
} from "@/lib/workspace/engineering-work";

const baseClassName =
  "inline-flex items-center rounded-md border px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.1em]";

const stateClassNames: Record<EngineeringWorkState, string> = {
  proposed: "border-amber-500/20 bg-amber-500/10 text-amber-700 dark:text-amber-300",
  active: "border-sky-500/20 bg-sky-500/10 text-sky-700 dark:text-sky-300",
  in_review: "border-violet-500/20 bg-violet-500/10 text-violet-700 dark:text-violet-300",
  completed: "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  closed: "border-stone-500/20 bg-stone-500/10 text-stone-700 dark:text-stone-300",
  cancelled: "border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-300",
  superseded: "border-stone-500/20 bg-stone-500/10 text-stone-700 dark:text-stone-300",
};

export function EngineeringWorkTypeBadge({ type }: { type: EngineeringWorkType }) {
  return <span className={cn(baseClassName, "border-border bg-muted/50 text-muted-foreground")}>{ENGINEERING_WORK_TYPE_LABELS[type]}</span>;
}

export function EngineeringWorkWorkflowBadge({
  workflow,
}: {
  workflow: EngineeringWorkWorkflow;
}) {
  return <span className={cn(baseClassName, "border-primary/20 bg-primary/10 text-primary")}>{ENGINEERING_WORK_WORKFLOW_LABELS[workflow]}</span>;
}

export function EngineeringWorkStateBadge({ state }: { state: EngineeringWorkState }) {
  return <span className={cn(baseClassName, stateClassNames[state])}>{ENGINEERING_WORK_STATE_LABELS[state]}</span>;
}

export function EngineeringWorkMetadata({
  type,
  workflow,
  state,
}: {
  type: EngineeringWorkType;
  workflow: EngineeringWorkWorkflow;
  state: EngineeringWorkState;
}) {
  return (
    <dl className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <div className="flex flex-wrap items-center gap-2">
        <dt className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.1em] text-foreground">
          Type
        </dt>
        <dd>
          <EngineeringWorkTypeBadge type={type} />
        </dd>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <dt className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
          Workflow
        </dt>
        <dd>
          <EngineeringWorkWorkflowBadge workflow={workflow} />
        </dd>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <dt className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
          Lifecycle state
        </dt>
        <dd>
          <EngineeringWorkStateBadge state={state} />
        </dd>
      </div>
    </dl>
  );
}
