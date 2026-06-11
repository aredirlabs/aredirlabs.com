import Link from "next/link";
import type { ReactNode } from "react";
import { AlertTriangle, CalendarClock, PauseCircle, TestTube2 } from "lucide-react";

import { formatDate } from "@/lib/workspace/format-date";
import type { OperatingSnapshot } from "@/lib/workspace/queries";

type WorkspaceOperatingSnapshotProps = {
  snapshot: OperatingSnapshot;
  error?: string | null;
};

function SnapshotStat({
  label,
  value,
  icon,
}: {
  label: string;
  value: number;
  icon: ReactNode;
}) {
  return (
    <div className="rounded-md border border-border bg-background/60 p-4">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.1em]">
          {label}
        </span>
      </div>
      <p className="mt-2 text-2xl font-semibold tabular-nums">{value}</p>
    </div>
  );
}

export function WorkspaceOperatingSnapshot({
  snapshot,
  error,
}: WorkspaceOperatingSnapshotProps) {
  if (error) {
    return (
      <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-4">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <div>
            <p className="text-sm font-medium text-destructive">
              Could not load operating snapshot
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Project cards may still be available below.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="mb-6 rounded-lg border border-border bg-card p-5">
      <h2 className="font-heading text-base font-semibold">
        Operating snapshot
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Lightweight company-wide project visibility.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <SnapshotStat
          label="Active"
          value={snapshot.activeCount}
          icon={<CalendarClock className="size-3.5" />}
        />
        <SnapshotStat
          label="Testing"
          value={snapshot.testingCount}
          icon={<TestTube2 className="size-3.5" />}
        />
        <SnapshotStat
          label="Paused / Planning"
          value={snapshot.pausedPlanningCount}
          icon={<PauseCircle className="size-3.5" />}
        />
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <div className="rounded-md border border-border bg-background/60 p-4">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
            Next upcoming milestone
          </p>
          {snapshot.nextMilestone ? (
            <div className="mt-2">
              <Link
                href={`/workspace/projects/${snapshot.nextMilestone.projectSlug}`}
                className="font-medium hover:text-primary hover:underline"
              >
                {snapshot.nextMilestone.title}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">
                {snapshot.nextMilestone.projectName}
                {snapshot.nextMilestone.targetDate
                  ? ` · Target ${formatDate(snapshot.nextMilestone.targetDate)}`
                  : null}
              </p>
            </div>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              No upcoming milestones with planned or active status.
            </p>
          )}
        </div>

        <div className="rounded-md border border-border bg-background/60 p-4">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted-foreground">
            Blocked milestones
          </p>
          {snapshot.blockedMilestones.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {snapshot.blockedMilestones.map((milestone) => (
                <li key={milestone.id} className="text-sm">
                  <Link
                    href={`/workspace/projects/${milestone.projectSlug}`}
                    className="font-medium hover:text-primary hover:underline"
                  >
                    {milestone.title}
                  </Link>
                  <span className="text-muted-foreground">
                    {" "}
                    · {milestone.projectName}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-muted-foreground">
              No blocked milestones.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
