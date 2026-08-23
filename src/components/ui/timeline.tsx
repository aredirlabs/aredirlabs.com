import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type TimelineEntryProps = {
  /** The action or transition label. */
  action: ReactNode;
  /** When the event occurred. */
  timestamp?: ReactNode;
  /** Prior → resulting state transition. */
  transition?: ReactNode;
  /** Decision text. */
  decision?: ReactNode;
  /** Decision basis / rationale summary. */
  decisionBasis?: ReactNode;
  /** Rationale. */
  rationale?: ReactNode;
  /** Previous → resulting next action. */
  nextActionTransition?: ReactNode;
  /** Previous → resulting outcome. */
  outcomeTransition?: ReactNode;
  /** Resulting final disposition. */
  finalDisposition?: ReactNode;
  /** Actor information. */
  actor?: ReactNode;
  /** Decision actor (distinct from action actor). */
  decisionActor?: ReactNode;
  /** Additional metadata fields. */
  metadata?: ReactNode;
  /** Whether this entry represents the current truth (not historical). */
  isCurrent?: boolean;
  className?: string;
};

/**
 * TimelineEntry represents a single lifecycle transition or decision.
 *
 * Per PROJECT-UX-004 §16:
 * "Timelines render ordered transitions with prior → resulting state
 * and decision basis where present."
 * "Action actor and decision actor remain structurally distinct."
 */
export function TimelineEntry({
  action,
  timestamp,
  transition,
  decision,
  decisionBasis,
  rationale,
  nextActionTransition,
  outcomeTransition,
  finalDisposition,
  actor,
  decisionActor,
  metadata,
  isCurrent = false,
  className,
}: TimelineEntryProps) {
  return (
    <li
      className={cn(
        "rounded-[var(--radius-inset)] border p-[var(--space-inset-y)] px-[var(--space-inset-x)]",
        isCurrent
          ? "border-role-actionable-border bg-role-actionable-bg"
          : "border-border bg-surface-inset",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p
          className={cn(
            "font-medium text-[var(--type-narrative)]",
            isCurrent ? "text-role-actionable" : "text-foreground",
          )}
        >
          {action}
        </p>
        {timestamp ? (
          <time className="font-mono text-[var(--type-identifier)] text-muted-foreground">
            {timestamp}
          </time>
        ) : null}
      </div>
      {transition ? (
        <p className="mt-2 text-[var(--type-narrative)] text-muted-foreground">
          {transition}
        </p>
      ) : null}
      {decision ? (
        <p className="mt-2 text-[var(--type-narrative)]">{decision}</p>
      ) : null}
      {decisionBasis ? (
        <p className="mt-2 text-[var(--type-narrative)] text-muted-foreground">
          <span className="font-medium text-foreground">Basis:</span>{" "}
          {decisionBasis}
        </p>
      ) : null}
      {rationale ? (
        <p className="mt-2 text-[var(--type-narrative)] text-muted-foreground">
          {rationale}
        </p>
      ) : null}
      {nextActionTransition ? (
        <p className="mt-2 text-[var(--type-narrative)] text-muted-foreground">
          <span className="font-medium text-foreground">Next Action:</span>{" "}
          {nextActionTransition}
        </p>
      ) : null}
      {outcomeTransition ? (
        <p className="mt-2 text-[var(--type-narrative)] text-muted-foreground">
          <span className="font-medium text-foreground">Outcome:</span>{" "}
          {outcomeTransition}
        </p>
      ) : null}
      {finalDisposition ? (
        <p className="mt-2 text-[var(--type-narrative)] text-muted-foreground">
          <span className="font-medium text-foreground">
            Final disposition:
          </span>{" "}
          {finalDisposition}
        </p>
      ) : null}
      {(actor || decisionActor || metadata) && (
        <dl className="mt-4 grid gap-3 border-t border-border pt-3 text-[var(--type-narrative)] sm:grid-cols-2">
          {actor && (
            <div>
              <dt className="font-mono text-[var(--type-metadata)] uppercase tracking-[0.1em] text-muted-foreground">
                Action actor
              </dt>
              <dd className="mt-1">{actor}</dd>
            </div>
          )}
          {decisionActor && (
            <div>
              <dt className="font-mono text-[var(--type-metadata)] uppercase tracking-[0.1em] text-muted-foreground">
                Decision actor
              </dt>
              <dd className="mt-1">{decisionActor}</dd>
            </div>
          )}
          {metadata}
        </dl>
      )}
    </li>
  );
}

type TimelineProps = {
  children: ReactNode;
  className?: string;
  /** Label for the timeline region. */
  label?: string;
  /** Description text shown below the label. */
  description?: ReactNode;
  /** Whether the history list is expanded by default. Default: false (collapsed). */
  defaultOpen?: boolean;
};

/**
 * Timeline is a reusable history primitive.
 *
 * Per PROJECT-UX-004 §16:
 * "Current truth always outranks historical evidence.
 * History is reachable in one gesture, summarized in the inspector,
 * and collapsed by default on the operating surface."
 *
 * Uses native <details> for collapsed-by-default behavior with
 * accessible keyboard support and one-gesture expand.
 */
export function Timeline({
  children,
  className,
  label = "Lifecycle history",
  description,
  defaultOpen = false,
}: TimelineProps) {
  return (
    <section className={className}>
      <details open={defaultOpen || undefined} className="group">
        <summary
          className={cn(
            "flex cursor-pointer list-none items-start justify-between gap-4 rounded-[var(--radius-inset)] py-2",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "[&::-webkit-details-marker]:hidden",
            "marker:hidden",
          )}
        >
          <span className="min-w-0 flex-1">
            <span className="block text-[var(--type-section)] font-semibold text-foreground">
              {label}
            </span>
            {description ? (
              <span className="mt-1 block text-[var(--type-narrative)] leading-relaxed text-muted-foreground">
                {description}
              </span>
            ) : null}
          </span>
          <span
            className="mt-1 font-mono text-[var(--type-identifier)] text-muted-foreground
                       transition-transform duration-200 group-open:rotate-90
                       motion-reduce:transition-none"
            aria-hidden="true"
          >
            ▸
          </span>
        </summary>
        <div className="mt-2">
          <ol className="space-y-3" role="list">
            {children}
          </ol>
        </div>
      </details>
    </section>
  );
}
