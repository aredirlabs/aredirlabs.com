import Link from "next/link";
import { ExternalLink, Pencil } from "lucide-react";

import { MetadataField, MetadataGroup } from "@/components/ui/metadata-field";
import { StateLabel } from "@/components/ui/state-label";
import {
  ENGINEERING_WORK_REFERENCE_AUTHORITY_LABELS,
  ENGINEERING_WORK_REFERENCE_STATUS_LABELS,
} from "@/lib/workspace/engineering-work";
import { getReferenceStatusRole } from "@/lib/workspace/operational-role-mapping";
import { formatTimestamp } from "@/lib/workspace/format-date";

export type WorkRecord = {
  id: string;
  projectId: string;
  title: string;
  summary: string;
  type: string;
  workflow: string;
  state: string;
  currentNextAction: string | null;
  currentOutcome: string | null;
  priority: string | null;
  condition: string | null;
  conditionRationale: string | null;
  finalDisposition: string | null;
  version: number;
  createdAt: Date;
  updatedAt: Date;
  projectName: string;
  projectSlug: string;
};

export type Reference = {
  id: string;
  engineeringWorkId: string;
  repository: string;
  sourceLocation: string;
  artifactClass: string;
  authority: string;
  artifactIdentifier: string | null;
  branch: string | null;
  commitHash: string | null;
  referenceStatus: "expected" | "verified" | "stale" | "missing";
  lastReviewedAt: Date | null;
  note: string | null;
};

export type HistoryEvent = {
  id: string;
  kind: string;
  actionType: string;
  priorState: string | null;
  resultingState: string | null;
  previousNextAction: string | null;
  resultingNextAction: string | null;
  previousOutcome: string | null;
  resultingOutcome: string | null;
  previousCondition: string | null;
  resultingCondition: string | null;
  previousFinalDisposition: string | null;
  resultingFinalDisposition: string | null;
  decision: string | null;
  rationale: string | null;
  decisionBasis: { summary?: unknown };
  actionActorType: string | null;
  actionActorIdentifier: string | null;
  actionActorDisplayName: string | null;
  decisionActorType: string | null;
  decisionActorIdentifier: string | null;
  decisionActorDisplayName: string | null;
  decisionRole: string | null;
  authorityType: string | null;
  occurredAt: Date;
};

function navigableUrl(value: string) {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.href
      : null;
  } catch {
    return null;
  }
}

function CompactAbsence({ children }: { children: React.ReactNode }) {
  return (
    <div
      role="status"
      className="flex items-center rounded-[var(--radius-inset)] border border-dashed border-border px-3 py-2 font-mono text-[var(--type-metadata)] uppercase tracking-[0.1em] text-muted-foreground"
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   EVIDENCE SURFACE (Inspector disclosure body)
   Repository references and evidence management.
   ------------------------------------------------------------------ */

export function EvidenceSurface({
  work,
  references,
}: {
  work: WorkRecord;
  references: Reference[];
}) {
  return (
    <div className="space-y-3">
      {references.length === 0 ? (
        <CompactAbsence>
          No repository evidence is linked yet.
        </CompactAbsence>
      ) : (
        <ul className="space-y-3">
          {references.map((reference) => {
            const sourceUrl = navigableUrl(reference.sourceLocation);
            const statusRole = getReferenceStatusRole(
              reference.referenceStatus,
            );
            return (
              <li
                key={reference.id}
                className="rounded-[var(--radius-inset)] border border-border bg-surface-inset p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-medium">{reference.artifactClass}</p>
                  <StateLabel role={statusRole}>
                    {
                      ENGINEERING_WORK_REFERENCE_STATUS_LABELS[
                        reference.referenceStatus
                      ]
                    }
                  </StateLabel>
                </div>
                <MetadataGroup className="mt-3">
                  <MetadataField label="Repository" value={reference.repository} />
                  <MetadataField
                    label="Authority"
                    value={
                      ENGINEERING_WORK_REFERENCE_AUTHORITY_LABELS[
                        reference.authority as keyof typeof ENGINEERING_WORK_REFERENCE_AUTHORITY_LABELS
                      ] ?? reference.authority
                    }
                  />
                  <MetadataField
                    label="Identifier"
                    value={reference.artifactIdentifier ?? "\u2014"}
                    variant="identifier"
                  />
                  <MetadataField
                    label="Branch"
                    value={reference.branch ?? "\u2014"}
                  />
                  <MetadataField
                    label="Commit"
                    value={reference.commitHash ?? "\u2014"}
                    variant="identifier"
                  />
                  <MetadataField
                    label="Last reviewed"
                    value={
                      reference.lastReviewedAt
                        ? formatTimestamp(reference.lastReviewedAt)
                        : "\u2014"
                    }
                  />
                </MetadataGroup>
                <div className="mt-3">
                  <p className="font-mono text-[var(--type-identifier)] uppercase tracking-[0.1em] text-muted-foreground">
                    Source location
                  </p>
                  {sourceUrl ? (
                    <Link
                      href={sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex break-all text-sm text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span>{reference.sourceLocation}</span>
                      <ExternalLink className="ml-1 mt-0.5 size-3.5 shrink-0" />
                    </Link>
                  ) : (
                    <p className="mt-1 break-all text-sm text-muted-foreground">
                      {reference.sourceLocation}
                    </p>
                  )}
                </div>
                {reference.note ? (
                  <p className="mt-3 text-sm text-muted-foreground">
                    {reference.note}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}

      <div className="text-right">
        <Link
          href={`/workspace/projects/${work.projectSlug}/engineering-work/${work.id}/evidence`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Pencil className="size-3.5" />
          Manage repository evidence
        </Link>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
   HISTORY SURFACE (Inspector history-region body)
   Lifecycle timeline with full provenance.
   ------------------------------------------------------------------ */

export function HistorySurface({
  history,
}: {
  history: HistoryEvent[];
}) {
  if (history.length === 0) {
    return <CompactAbsence>No post-migration lifecycle history has been recorded.</CompactAbsence>;
  }

  return (
    <div className="space-y-3">
      <ol className="space-y-3" role="list">
        {history.map((event) => {
          const basis =
            typeof event.decisionBasis.summary === "string"
              ? event.decisionBasis.summary
              : null;
          const nextActionChanged =
            event.previousNextAction !== event.resultingNextAction;
          const outcomeChanged =
            event.previousOutcome !== event.resultingOutcome;

          return (
            <li
              key={event.id}
              className="rounded-[var(--radius-inset)] border border-border bg-surface-inset p-[var(--space-inset-y)] px-[var(--space-inset-x)]"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-[var(--type-narrative)] font-medium text-foreground">
                  {event.actionType.replaceAll("_", " ")}
                </p>
                <time className="font-mono text-[var(--type-identifier)] text-muted-foreground">
                  {formatTimestamp(event.occurredAt)}
                </time>
              </div>
              {event.priorState || event.resultingState ? (
                <p className="mt-2 text-[var(--type-narrative)] text-muted-foreground">
                  {event.priorState ?? "\u2014"} &rarr;{" "}
                  {event.resultingState ?? "\u2014"}
                </p>
              ) : null}
              {event.decision ? (
                <p className="mt-2 text-[var(--type-narrative)]">
                  {event.decision}
                </p>
              ) : null}
              {basis ? (
                <p className="mt-2 text-[var(--type-narrative)] text-muted-foreground">
                  <span className="font-medium text-foreground">Basis:</span>{" "}
                  {basis}
                </p>
              ) : null}
              {event.rationale ? (
                <p className="mt-2 text-[var(--type-narrative)] text-muted-foreground">
                  {event.rationale}
                </p>
              ) : null}
              {nextActionChanged ? (
                <p className="mt-2 text-[var(--type-narrative)] text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Next Action:
                  </span>{" "}
                  {event.previousNextAction ?? "\u2014"} &rarr;{" "}
                  {event.resultingNextAction ?? "\u2014"}
                </p>
              ) : null}
              {outcomeChanged ? (
                <p className="mt-2 text-[var(--type-narrative)] text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Outcome:
                  </span>{" "}
                  {event.previousOutcome ?? "\u2014"} &rarr;{" "}
                  {event.resultingOutcome ?? "\u2014"}
                </p>
              ) : null}
              {event.resultingFinalDisposition ? (
                <p className="mt-2 text-[var(--type-narrative)] text-muted-foreground">
                  <span className="font-medium text-foreground">
                    Final disposition:
                  </span>{" "}
                  {event.resultingFinalDisposition}
                </p>
              ) : null}
              <dl className="mt-4 grid gap-3 border-t border-border pt-3 text-[var(--type-narrative)] sm:grid-cols-2">
                <div>
                  <dt className="font-mono text-[var(--type-metadata)] uppercase tracking-[0.1em] text-muted-foreground">
                    Action actor
                  </dt>
                  <dd className="mt-1">
                    {event.actionActorDisplayName ??
                      event.actionActorIdentifier ??
                      "\u2014"}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[var(--type-metadata)] uppercase tracking-[0.1em] text-muted-foreground">
                    Decision actor
                  </dt>
                  <dd className="mt-1">
                    {event.decisionActorDisplayName ??
                      event.decisionActorIdentifier ??
                      "No decision actor"}
                  </dd>
                </div>
                <div>
                  <dt className="font-mono text-[var(--type-metadata)] uppercase tracking-[0.1em] text-muted-foreground">
                    Decision role
                  </dt>
                  <dd className="mt-1">{event.decisionRole ?? "\u2014"}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[var(--type-metadata)] uppercase tracking-[0.1em] text-muted-foreground">
                    Authority
                  </dt>
                  <dd className="mt-1">{event.authorityType ?? "\u2014"}</dd>
                </div>
              </dl>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
