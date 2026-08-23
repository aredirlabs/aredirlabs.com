import Link from "next/link";
import { Plus } from "lucide-react";

import { EmptyState } from "@/components/ui/empty-state";
import { FailureState } from "@/components/ui/failure-state";
import { Surface } from "@/components/ui/surface";
import {
  EngineeringWorkMetadata,
} from "@/components/workspace/engineering-work-badges";
import type { workspaceEngineeringWork } from "@/lib/db/schema";

type EngineeringWork = typeof workspaceEngineeringWork.$inferSelect;

type ProjectEngineeringWorkSectionProps = {
  projectSlug: string;
  workItems: EngineeringWork[];
  workItemsError: string | null;
};

export function ProjectEngineeringWorkSection({
  projectSlug,
  workItems,
  workItemsError,
}: ProjectEngineeringWorkSectionProps) {
  const workStateRank = {
    active: 0,
    in_review: 1,
    proposed: 2,
    completed: 3,
    closed: 4,
    cancelled: 5,
    superseded: 6,
  } as const;
  const prioritizedWork = [...workItems].sort(
    (a, b) => workStateRank[a.state] - workStateRank[b.state],
  );
  const primaryWork = prioritizedWork[0];
  const supportingWork = prioritizedWork.slice(1);

  return (
    <Surface>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-heading text-lg font-semibold">Engineering Work</h2>
        <Link href={`/workspace/projects/${projectSlug}/engineering-work/new`} className="inline-flex items-center gap-1.5 rounded-[var(--radius-control)] border border-border px-3 py-1.5 text-sm font-medium hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <Plus className="size-3.5" />
          New Engineering Work
        </Link>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Project-scoped engineering work ordered by lifecycle position.
      </p>

      {workItemsError ? (
        <FailureState
          title="Could not load Engineering Work"
          description="Project details loaded, but Engineering Work could not be retrieved. Try refreshing the page."
          failureClass="unknown"
          className="mt-4"
        />
      ) : !primaryWork ? (
        <EmptyState
          title="No Engineering Work yet."
          description="Engineering Work will appear here when a project-scoped operational record is available."
          className="mt-4"
        />
      ) : (
        <>
          <article className="mt-5 rounded-[var(--radius-inset)] border border-border bg-surface-inset p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <EngineeringWorkMetadata
                type={primaryWork.type}
                workflow={primaryWork.workflow}
                state={primaryWork.state}
              />
            </div>
            <h3 className="mt-3 text-lg font-semibold tracking-tight">
              <Link
                href={`/workspace/projects/${projectSlug}/engineering-work/${primaryWork.id}`}
                className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {primaryWork.title}
              </Link>
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {primaryWork.summary}
            </p>
            <div className="mt-4 rounded-[var(--radius-inset)] border border-border bg-surface-inset p-4">
              <p className="font-mono text-[var(--type-state)] uppercase tracking-[0.1em] text-muted-foreground">
                Current next action
              </p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {primaryWork.currentNextAction}
              </p>
            </div>
            {primaryWork.condition ? (
              <p className="mt-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Condition:</span>{" "}
                {primaryWork.condition}
              </p>
            ) : null}
          </article>

          {supportingWork.length > 0 ? (
            <div className="mt-6">
              <h3 className="font-mono text-[var(--type-state)] uppercase tracking-[0.1em] text-muted-foreground">
                Other engineering work
              </h3>
              <ul className="mt-3 space-y-3">
                {supportingWork.map((work) => (
                  <li key={work.id} className="rounded-[var(--radius-inset)] border border-border bg-surface-inset p-4">
                    <EngineeringWorkMetadata
                      type={work.type}
                      workflow={work.workflow}
                      state={work.state}
                    />
                    <h4 className="mt-2 font-medium">
                <Link
                  href={`/workspace/projects/${projectSlug}/engineering-work/${work.id}`}
                  className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {work.title}
                </Link>
                    </h4>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Next: {work.currentNextAction}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </>
      )}
    </Surface>
  );
}
