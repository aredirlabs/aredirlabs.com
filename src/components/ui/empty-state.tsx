import { type ReactNode } from "react";
import { Inbox } from "lucide-react";

import { cn } from "@/lib/utils";

type EmptyStateProps = {
  /** What is absent. */
  title: string;
  /** Whether that absence is valid or indicates action needed. */
  description?: ReactNode;
  /** One useful next action when appropriate. */
  action?: ReactNode;
  className?: string;
  /** Icon override. */
  icon?: ReactNode;
};

/**
 * EmptyState distinguishes truthful absence from failure.
 *
 * Per PROJECT-UX-004 §17:
 * "Absence/empty: Nothing currently exists or matches, distinguished from failure."
 * "Offer creation/clear-filter action only when authorized and useful."
 */
export function EmptyState({
  title,
  description,
  action,
  className,
  icon,
}: EmptyStateProps) {
  return (
    <div
      role="status"
      className={cn(
        "rounded-[var(--radius-surface)] border border-dashed border-border bg-surface-inset p-8 text-center",
        className,
      )}
    >
      {icon ?? (
        <Inbox
          className="mx-auto size-6 text-muted-foreground"
          aria-hidden="true"
        />
      )}
      <p className="mt-3 text-[var(--type-narrative)] font-medium text-foreground">
        {title}
      </p>
      {description ? (
        <p className="mt-2 text-[var(--type-narrative)] leading-relaxed text-muted-foreground max-w-lg mx-auto">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-4">{action}</div> : null}
    </div>
  );
}
