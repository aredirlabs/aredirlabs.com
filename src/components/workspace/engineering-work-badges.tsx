import { StateLabel } from "@/components/ui/state-label";
import { cn } from "@/lib/utils";
import {
  ENGINEERING_WORK_STATE_LABELS,
  ENGINEERING_WORK_TYPE_LABELS,
  ENGINEERING_WORK_WORKFLOW_LABELS,
  type EngineeringWorkState,
  type EngineeringWorkType,
  type EngineeringWorkWorkflow,
} from "@/lib/workspace/engineering-work";
import { getEngineeringWorkStateRole } from "@/lib/workspace/operational-role-mapping";

const baseClassName =
  "inline-flex items-center rounded-[var(--radius-badge)] border px-2 py-0.5 font-mono text-[var(--type-state)] uppercase tracking-[0.1em]";

export function EngineeringWorkTypeBadge({ type }: { type: EngineeringWorkType }) {
  return <span className={cn(baseClassName, "border-taxonomy-border bg-taxonomy-bg text-taxonomy-text")}>{ENGINEERING_WORK_TYPE_LABELS[type]}</span>;
}

export function EngineeringWorkWorkflowBadge({
  workflow,
}: {
  workflow: EngineeringWorkWorkflow;
}) {
  return <span className={cn(baseClassName, "border-role-actionable-border bg-role-actionable-bg text-role-actionable")}>{ENGINEERING_WORK_WORKFLOW_LABELS[workflow]}</span>;
}

export function EngineeringWorkStateBadge({ state }: { state: EngineeringWorkState }) {
  const role = getEngineeringWorkStateRole(state);
  return <StateLabel role={role}>{ENGINEERING_WORK_STATE_LABELS[state]}</StateLabel>;
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
        <dt className="font-mono text-[var(--type-state)] font-medium uppercase tracking-[0.1em] text-foreground">
          Type
        </dt>
        <dd>
          <EngineeringWorkTypeBadge type={type} />
        </dd>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <dt className="font-mono text-[var(--type-state)] uppercase tracking-[0.1em] text-muted-foreground">
          Workflow
        </dt>
        <dd>
          <EngineeringWorkWorkflowBadge workflow={workflow} />
        </dd>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <dt className="font-mono text-[var(--type-state)] uppercase tracking-[0.1em] text-muted-foreground">
          Lifecycle state
        </dt>
        <dd>
          <EngineeringWorkStateBadge state={state} />
        </dd>
      </div>
    </dl>
  );
}
