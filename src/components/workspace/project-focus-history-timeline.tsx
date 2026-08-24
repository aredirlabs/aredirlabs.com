"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Timeline, TimelineEntry } from "@/components/ui/timeline";
import { loadProjectFocusHistoryPage } from "@/app/workspace/projects/[slug]/operational-focus-actions";
import type { ProjectFocusEventRecord } from "@/lib/workspace/queries";
import { formatTimestamp } from "@/lib/workspace/format-date";

export const PROJECT_FOCUS_HISTORY_PAGE_LIMIT = 20;

type ProjectFocusHistoryTimelineProps = {
  projectSlug: string;
  initialEvents: ProjectFocusEventRecord[];
  total: number;
  error?: string | null;
};

function focusEffectLabel(effect: ProjectFocusEventRecord["effect"]) {
  switch (effect) {
    case "selected":
      return "Selected for operational focus";
    case "deselected":
      return "Removed from operational focus";
    case "invalidated":
      return "Focus invalidated by system rule";
  }
}

export function ProjectFocusHistoryTimeline({
  projectSlug,
  initialEvents,
  total,
  error,
}: ProjectFocusHistoryTimelineProps) {
  const [events, setEvents] = useState(initialEvents);
  const [loadError, setLoadError] = useState<string | null>(error ?? null);
  const [isPending, startTransition] = useTransition();

  const displayedCount = events.length;
  const hasMore = displayedCount < total;

  function loadMore() {
    startTransition(async () => {
      const result = await loadProjectFocusHistoryPage(projectSlug, displayedCount);
      if (result.error) {
        setLoadError(result.error);
        return;
      }
      setLoadError(null);
      setEvents((current) => {
        const seen = new Set(current.map((event) => event.id));
        const appended = result.events.filter((event) => !seen.has(event.id));
        return [...current, ...appended];
      });
    });
  }

  const description =
    total > displayedCount
      ? `Showing ${displayedCount} of ${total} recorded focus events (most recent first). Load earlier events below.`
      : total > PROJECT_FOCUS_HISTORY_PAGE_LIMIT
        ? `Showing all ${total} recorded focus events (most recent first).`
        : "Append-only provenance for shared Project operational focus. System invalidation is distinct from operator deselection.";

  return (
    <div className="mt-6">
      <Timeline label="Focus selection history" description={description}>
        {loadError ? (
          <li className="rounded-[var(--radius-inset)] border border-border bg-surface-inset p-[var(--space-inset-y)] px-[var(--space-inset-x)] text-[var(--type-narrative)] text-muted-foreground">
            {loadError}
          </li>
        ) : events.length === 0 ? (
          <li className="rounded-[var(--radius-inset)] border border-border bg-surface-inset p-[var(--space-inset-y)] px-[var(--space-inset-x)] text-[var(--type-narrative)] text-muted-foreground">
            No operational focus selection events recorded yet.
          </li>
        ) : (
          events.map((event) => (
            <TimelineEntry
              key={event.id}
              action={focusEffectLabel(event.effect)}
              timestamp={formatTimestamp(event.occurredAt)}
              decision={`${event.workTitle ?? "Engineering Work"} (${event.engineeringWorkId})`}
              rationale={event.rationale ?? undefined}
              actor={`${event.actionActorDisplayName ?? event.actionActorIdentifier} (${event.actionActorType})`}
              decisionActor={
                event.decisionActorIdentifier
                  ? `${event.decisionActorIdentifier} (${event.decisionActorType})`
                  : undefined
              }
              metadata={
                event.authorityType
                  ? `Authority: ${event.authorityType}${event.authorityReference ? ` (${event.authorityReference})` : ""}${event.basedOnEventId ? ` · Cause: ${event.basedOnEventId}` : ""}`
                  : undefined
              }
            />
          ))
        )}
      </Timeline>

      {hasMore ? (
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Button type="button" variant="outline" disabled={isPending} onClick={loadMore}>
            {isPending ? "Loading earlier events…" : "Load earlier focus events"}
          </Button>
          <p className="text-sm text-muted-foreground" role="status">
            {displayedCount} of {total} events displayed
          </p>
        </div>
      ) : total > 0 ? (
        <p className="mt-4 text-sm text-muted-foreground" role="status">
          Complete focus history displayed ({total} events).
        </p>
      ) : null}
    </div>
  );
}
