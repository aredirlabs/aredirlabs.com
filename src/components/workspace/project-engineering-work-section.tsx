import Link from "next/link";
import { AlertTriangle, ClipboardList } from "lucide-react";

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
    <section className="rounded-lg border border-primary/25 bg-card p-6 shadow-sm">
      <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-primary">
        Current operational focus
      </p>
      <h2 className="mt-2 font-heading text-lg font-semibold">
        Engineering Work
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        The work currently carrying this project forward.
      </p>

      {workItemsError ? (
        <div className="mt-4 rounded-md border border-destructive/30 bg-destructive/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
            <div>
              <p className="text-sm font-medium text-destructive">
                Could not load Engineering Work
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Project details loaded, but Engineering Work could not be retrieved.
                Try refreshing the page.
              </p>
            </div>
          </div>
        </div>
      ) : !primaryWork ? (
        <div className="mt-4 rounded-md border border-dashed border-border bg-muted/20 p-6 text-center">
          <ClipboardList className="mx-auto size-5 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium">No Engineering Work yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Engineering Work will appear here when a project-scoped operational record is available.
          </p>
        </div>
      ) : (
        <>
          <article className="mt-5 rounded-md border border-primary/20 bg-primary/5 p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.12em] text-primary">
                Most important work
              </p>
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
            <div className="mt-4 rounded-md border border-primary/15 bg-background/70 p-4">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
                What should happen next
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
              <h3 className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
                Other engineering work
              </h3>
              <ul className="mt-3 space-y-3">
                {supportingWork.map((work) => (
                  <li key={work.id} className="rounded-md border border-border bg-background/60 p-4">
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
    </section>
  );
}
