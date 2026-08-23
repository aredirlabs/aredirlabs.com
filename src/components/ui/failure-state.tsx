import { type ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

import { cn } from "@/lib/utils";

type FailureClass = "transient" | "structural" | "authorization" | "unknown";

type FailureStateProps = {
  /** Truthful title describing what failed. */
  title: string;
  /** Known facts about the failure. */
  description?: ReactNode;
  /** The failure classification. */
  failureClass?: FailureClass;
  /** One valid next action where appropriate. */
  action?: ReactNode;
  /** Whether retry is meaningful for this failure. */
  retryAction?: ReactNode;
  className?: string;
};

const failureClassLabels: Record<FailureClass, string> = {
  transient: "Transient failure",
  structural: "Configuration or structural issue",
  authorization: "Access unavailable",
  unknown: "Unexpected error",
};

/**
 * FailureState is aligned with PROJECT-UX-004 §17 and DEFECT-UX-001 lessons.
 *
 * "Every failure state states what is known, avoids unsupported diagnosis,
 * names one useful next action where possible, qualifies controls that
 * cannot succeed, and keeps ancestry/context visible."
 *
 * Supports four failure classes:
 * - transient: retry may succeed
 * - structural: known unavailable capability
 * - authorization: access is unavailable
 * - unknown: unclassified failure
 */
export function FailureState({
  title,
  description,
  failureClass = "unknown",
  action,
  retryAction,
  className,
}: FailureStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "rounded-[var(--radius-surface)] border border-destructive/25 bg-destructive/10 p-6",
        className,
      )}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle
          className="mt-0.5 size-5 shrink-0 text-destructive"
          aria-hidden="true"
        />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-[var(--type-truth)] font-semibold text-destructive">
              {title}
            </h2>
            <span className="rounded-[var(--radius-badge)] border border-destructive/20 bg-destructive/10 px-1.5 py-0.5 font-mono text-[var(--type-state)] uppercase tracking-[0.1em] text-destructive">
              {failureClassLabels[failureClass]}
            </span>
          </div>
          {description ? (
            <p className="mt-2 text-[var(--type-narrative)] leading-relaxed text-muted-foreground">
              {description}
            </p>
          ) : null}
          {(action || retryAction) && (
            <div className="mt-4 flex flex-wrap gap-3">
              {retryAction}
              {action}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export type { FailureClass };
