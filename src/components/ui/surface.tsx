import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type SurfaceVariant = "default" | "primary" | "attention" | "danger";

type SurfaceProps = {
  children: ReactNode;
  className?: string;
  /** Semantic variant affecting border and background treatment. */
  variant?: SurfaceVariant;
  /** Removes default padding. */
  noPadding?: boolean;
  /** Renders with semantic HTML article element. */
  as?: "div" | "article" | "section";
};

const variantStyles: Record<SurfaceVariant, string> = {
  default: "border-border bg-surface-surface",
  primary: "border-role-actionable-border bg-role-actionable-bg",
  attention: "border-role-attention-border bg-role-attention-bg",
  danger: "border-destructive/25 bg-destructive/10",
};

/**
 * Surface carries primary operating content or a structurally independent region.
 *
 * Per PROJECT-UX-004 §7:
 * "One tonal step above environment; precise hairline boundary where separation is needed."
 * Surface may contain insets, not another card-like Surface unless it is a truly independent region.
 */
export function Surface({
  children,
  className,
  variant = "default",
  noPadding = false,
  as: Component = "div",
}: SurfaceProps) {
  return (
    <Component
      data-slot="surface"
      className={cn(
        "rounded-[var(--radius-surface)] border",
        variantStyles[variant],
        !noPadding && "p-[var(--space-surface-x)]",
        className,
      )}
    >
      {children}
    </Component>
  );
}
