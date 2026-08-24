import Link from "next/link";

import { Inset } from "@/components/ui/inset";
import { Surface } from "@/components/ui/surface";
import { FailureState } from "@/components/ui/failure-state";
import { OperationalFocusClearForm } from "@/components/workspace/operational-focus-forms";
import {
  PROJECT_FOCUS_HISTORY_PAGE_LIMIT,
  ProjectFocusHistoryTimeline,
} from "@/components/workspace/project-focus-history-timeline";
import { OperationalFocusMarker } from "@/components/workspace/operational-focus-marker";
import type { ProjectFocusEventRecord } from "@/lib/workspace/queries";
import type { ProjectOperationalFocusProjection } from "@/lib/workspace/operational-focus";

export { PROJECT_FOCUS_HISTORY_PAGE_LIMIT };

type ProjectOperationalFocusSectionProps = {
  projectSlug: string;
  focusVersion: number;
  projection: ProjectOperationalFocusProjection;
  focusEvents: ProjectFocusEventRecord[];
  focusEventsTotal: number;
  focusProjectionError?: string | null;
  focusEventsError?: string | null;
};

export function ProjectOperationalFocusSection({
  projectSlug,
  focusVersion,
  projection,
  focusEvents,
  focusEventsTotal,
  focusProjectionError,
  focusEventsError,
}: ProjectOperationalFocusSectionProps) {
  const {
    operationalFocus,
    currentSelections,
    mode,
    singletonNextStep,
    pluralNextActions,
    projectionSuppressed,
  } = projection;

  if (focusProjectionError) {
    return (
      <Surface>
        <h2 className="font-heading text-lg font-semibold">Operational focus</h2>
        <FailureState
          title="Could not load operational focus"
          description={focusProjectionError}
          failureClass="unknown"
          className="mt-4"
        />
      </Surface>
    );
  }

  return (
    <Surface>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[var(--type-state)] uppercase tracking-[0.1em] text-muted-foreground">
            Projection
          </p>
          <h2 className="font-heading text-lg font-semibold">Operational focus</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Shared Project emphasis selected by authorized operators. Focus is not
            continuation, attention, priority, or navigation selection.
          </p>
        </div>
        {currentSelections.length > 0 ? (
          <OperationalFocusClearForm projectSlug={projectSlug} focusVersion={focusVersion} />
        ) : null}
      </div>

      {projectionSuppressed ? (
        <Inset className="mt-4">
          <p className="text-sm text-muted-foreground">
            Operational projection is suppressed while this Project is not in an
            operating status. Current selections below remain authoritative shared
            Project emphasis.
          </p>
        </Inset>
      ) : null}

      {currentSelections.length === 0 ? (
        <p className="mt-4 text-sm text-muted-foreground" role="status">
          No current focus selected.
        </p>
      ) : (
        <>
          <p className="mt-4 font-mono text-[var(--type-state)] uppercase tracking-[0.1em] text-muted-foreground">
            Current selection authority ({currentSelections.length})
          </p>
          <ul className="mt-3 space-y-3" aria-label="Current operational focus selections">
            {currentSelections.map((item) => {
              const isProjected = operationalFocus.some(
                (focused) => focused.engineeringWorkId === item.engineeringWorkId,
              );
              return (
                <li
                  key={item.engineeringWorkId}
                  className="rounded-[var(--radius-inset)] border border-border bg-surface-inset p-4"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <OperationalFocusMarker />
                    {!isProjected ? (
                      <span className="font-mono text-[var(--type-state)] uppercase tracking-[0.1em] text-muted-foreground">
                        Selection retained · projection suppressed
                      </span>
                    ) : null}
                    {item.condition ? (
                      <span className="font-mono text-[var(--type-state)] uppercase tracking-[0.1em] text-role-attention">
                        Conditioned focus
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-2 font-medium">
                    <Link
                      href={`/workspace/projects/${projectSlug}/engineering-work/${item.engineeringWorkId}`}
                      className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {item.title}
                    </Link>
                  </h3>
                  {isProjected && item.currentNextAction ? (
                    <p className="mt-2 text-sm">
                      <span className="font-mono text-[var(--type-state)] uppercase tracking-[0.1em] text-muted-foreground">
                        Work next action
                      </span>
                      <span className="mt-1 block font-medium">{item.currentNextAction}</span>
                    </p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </>
      )}

      {mode === "single" && singletonNextStep ? (
        <Inset className="mt-4">
          <p className="font-mono text-[var(--type-state)] uppercase tracking-[0.1em] text-muted-foreground">
            Project next-step projection
          </p>
          <p className="mt-1 text-sm font-medium">{singletonNextStep}</p>
          <p className="mt-2 text-xs text-muted-foreground">
            Derived from the single operationally focused Work&apos;s authoritative next
            action.
          </p>
        </Inset>
      ) : null}

      {mode === "plural" && pluralNextActions.length > 0 ? (
        <Inset className="mt-4">
          <p className="font-mono text-[var(--type-state)] uppercase tracking-[0.1em] text-muted-foreground">
            Project next-step projection
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Unavailable as a singular field while multiple Work items are in operational
            focus.
          </p>
          <ul className="mt-3 space-y-2">
            {pluralNextActions.map((item) => (
              <li key={item.engineeringWorkId} className="text-sm">
                <span className="font-medium">{item.title}:</span> {item.nextAction}
              </li>
            ))}
          </ul>
        </Inset>
      ) : null}

      <ProjectFocusHistoryTimeline
        projectSlug={projectSlug}
        initialEvents={focusEvents}
        total={focusEventsTotal}
        error={focusEventsError}
      />
    </Surface>
  );
}
