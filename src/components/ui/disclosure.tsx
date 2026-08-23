"use client";

import { type ReactNode } from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type DisclosureProps = {
  summary: ReactNode;
  children: ReactNode;
  /** Secondary description shown below the summary. */
  description?: ReactNode;
  /** Whether the disclosure starts expanded. */
  defaultOpen?: boolean;
  className?: string;
  /** Content shown as count or badge in the summary area. */
  count?: ReactNode;
};

/**
 * Disclosure is an accessible subordinate-content reveal primitive.
 *
 * Per PROJECT-UX-004 §21:
 * "Accessible keyboard behavior; clear expanded/collapsed state;
 * subordinate visual weight; usable on narrow screens."
 *
 * Uses native <details>/<summary> for built-in keyboard and
 * assistive-technology support.
 */
export function Disclosure({
  summary,
  children,
  description,
  defaultOpen = false,
  className,
  count,
}: DisclosureProps) {
  return (
    <details
      className={cn("group", className)}
      open={defaultOpen || undefined}
    >
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
            {summary}
          </span>
          {description ? (
            <span className="mt-1 block text-[var(--type-narrative)] leading-relaxed text-muted-foreground">
              {description}
            </span>
          ) : null}
        </span>
        <span className="flex shrink-0 items-center gap-2">
          {count}
          <ChevronRight
            className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none group-open:rotate-90"
            aria-hidden="true"
          />
        </span>
      </summary>
      <div className="mt-2">{children}</div>
    </details>
  );
}
