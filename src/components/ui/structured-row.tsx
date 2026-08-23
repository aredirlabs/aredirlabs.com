import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type OperationalRowProps = {
  /** Primary identity content. */
  primary: ReactNode;
  /** Secondary context or description. */
  secondary?: ReactNode;
  /** Metadata displayed alongside the row. */
  metadata?: ReactNode;
  /** State label or badge. */
  state?: ReactNode;
  /** Action affordance (link, button). MUST NOT be provided when href is set. */
  action?: ReactNode;
  /** The URL to link to, making the entire row navigable. Cannot be combined with action. */
  href?: string;
  className?: string;
};

/**
 * StructuredRow is a reusable row primitive for dense inventories.
 *
 * Per PROJECT-UX-004 §13:
 * "Use structured rows when identity, one primary state,
 * next-action summary, focus, and attention can be scanned consistently."
 *
 * "Use card-per-record composition" is explicitly avoided.
 * Rows support: primary identity, secondary context, metadata, state treatment,
 * optional action affordance, and responsive transformation.
 *
 * When href is provided, the entire row is wrapped in an anchor.
 * The action slot MUST NOT contain interactive elements when href is set
 * to avoid nested interactive content (invalid HTML).
 */
export function OperationalRow({
  primary,
  secondary,
  metadata,
  state,
  action,
  href,
  className,
}: OperationalRowProps) {
  const rowContent = (
    <div
      className={cn(
        "flex items-start gap-4 px-[var(--space-row-x)] py-[var(--space-row-y)]",
        "border-b border-border last:border-b-0",
        "transition-colors duration-150 hover:bg-accent/50",
        "motion-reduce:transition-none",
        href && "cursor-pointer",
        className,
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[var(--type-truth)] font-medium text-foreground">
            {primary}
          </span>
          {state}
        </div>
        {secondary ? (
          <p className="mt-1 text-[var(--type-narrative)] leading-relaxed text-muted-foreground line-clamp-2">
            {secondary}
          </p>
        ) : null}
        {metadata ? (
          <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
            {metadata}
          </div>
        ) : null}
      </div>
      {action && !href && <div className="shrink-0">{action}</div>}
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(
          "block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset",
          "rounded-[var(--radius-inset)]",
        )}
      >
        {rowContent}
      </a>
    );
  }

  return rowContent;
}
