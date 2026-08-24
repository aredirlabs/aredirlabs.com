import { Inset } from "@/components/ui/inset";
import { StateLabel } from "@/components/ui/state-label";
import {
  OperationalFocusAddForm,
  OperationalFocusRemoveForm,
} from "@/components/workspace/operational-focus-forms";
import { OperationalFocusMarker } from "@/components/workspace/operational-focus-marker";
import { isFocusSelectionEligible } from "@/lib/workspace/operational-focus";

type EngineeringWorkOperationalFocusControlProps = {
  projectSlug: string;
  workId: string;
  workState: string;
  focusVersion: number;
  projectStatus: string;
  isFocused: boolean;
};

export function EngineeringWorkOperationalFocusControl({
  projectSlug,
  workId,
  workState,
  focusVersion,
  projectStatus,
  isFocused,
}: EngineeringWorkOperationalFocusControlProps) {
  const eligible = isFocusSelectionEligible(projectStatus, workState);

  return (
    <Inset>
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-mono text-[var(--type-state)] uppercase tracking-[0.1em] text-muted-foreground">
          Shared Project operational focus
        </p>
        {isFocused ? (
          <OperationalFocusMarker />
        ) : (
          <StateLabel role="neutral">Not focused</StateLabel>
        )}
      </div>
      <p className="mt-2 text-sm text-muted-foreground">
        Operational focus is deliberate shared Project emphasis. It is distinct from
        lifecycle state, continuation, attention, and row navigation selection.
      </p>

      {isFocused ? (
        <div className="mt-4">
          <OperationalFocusRemoveForm
            projectSlug={projectSlug}
            workId={workId}
            focusVersion={focusVersion}
          />
        </div>
      ) : eligible ? (
        <div className="mt-4">
          <OperationalFocusAddForm
            projectSlug={projectSlug}
            workId={workId}
            focusVersion={focusVersion}
          />
        </div>
      ) : (
        <p className="mt-4 text-sm text-muted-foreground" role="status">
          {["active", "testing"].includes(projectStatus)
            ? "Only active or in-review Engineering Work in operating Projects may be added to operational focus."
            : "Operational focus selection requires an active or testing Project."}
        </p>
      )}
    </Inset>
  );
}
