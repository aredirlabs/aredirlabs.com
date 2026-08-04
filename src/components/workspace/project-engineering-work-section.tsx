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
  return (
    <section className="rounded-lg border border-border bg-card p-6">
      <h2 className="font-heading text-base font-semibold">Engineering Work</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Active engineering outcomes and their repository-aware operational context.
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
      ) : workItems.length === 0 ? (
        <div className="mt-4 rounded-md border border-dashed border-border bg-muted/20 p-6 text-center">
          <ClipboardList className="mx-auto size-5 text-muted-foreground" />
          <p className="mt-3 text-sm font-medium">No Engineering Work yet.</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Engineering Work will appear here when a project-scoped operational record is available.
          </p>
        </div>
      ) : (
        <ul className="mt-4 space-y-3">
          {workItems.map((work) => (
            <li key={work.id} className="rounded-md border border-border bg-background/60 p-4">
              <EngineeringWorkMetadata
                type={work.type}
                workflow={work.workflow}
                state={work.state}
              />
              <h3 className="mt-2 font-medium">
                <Link
                  href={`/workspace/projects/${projectSlug}/engineering-work/${work.id}`}
                  className="underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {work.title}
                </Link>
              </h3>
              <div className="mt-3 rounded-md border border-border bg-muted/20 p-3">
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
                  Next action
                </p>
                <p className="mt-1 text-sm text-foreground/90">{work.currentNextAction}</p>
              </div>
              {work.condition ? (
                <p className="mt-3 text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Condition:</span>{" "}
                  {work.condition}
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
