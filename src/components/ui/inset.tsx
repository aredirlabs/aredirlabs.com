import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type InsetProps = {
  children: ReactNode;
  className?: string;
  /** Removes default padding. */
  noPadding?: boolean;
};

/**
 * Inset represents subordinate content within a Surface.
 *
 * Per PROJECT-UX-004 §7:
 * "Lower contrast/depth than its parent; quiet boundary or tonal recess."
 * "No card-like nesting inside an inset; use rows, dividers, or disclosure groups."
 *
 * The expected hierarchy is: Environment → Surface → Inset
 * Not: Surface → Surface → Surface
 */
export function Inset({ children, className, noPadding = false }: InsetProps) {
  return (
    <div
      data-slot="inset"
      className={cn(
        "rounded-[var(--radius-inset)] border border-border bg-surface-inset",
        !noPadding && "px-[var(--space-inset-x)] py-[var(--space-inset-y)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
