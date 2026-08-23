import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type OperationalRole = "actionable" | "attention" | "settled" | "inert" | "neutral";

type StateLabelProps = {
  children: ReactNode;
  /** The operational role determines visual treatment. */
  role?: OperationalRole;
  className?: string;
};

const roleStyles: Record<OperationalRole, string> = {
  actionable:
    "border-role-actionable-border bg-role-actionable-bg text-role-actionable",
  attention:
    "border-role-attention-border bg-role-attention-bg text-role-attention",
  settled:
    "border-role-settled-border bg-role-settled-bg text-role-settled",
  inert:
    "border-role-inert-border bg-role-inert-bg text-role-inert",
  neutral:
    "border-taxonomy-border bg-taxonomy-bg text-taxonomy-text",
};

/**
 * StateLabel is a canonical state-label primitive.
 *
 * Per PROJECT-UX-004 §9:
 * "State must not rely on color alone."
 * "Taxonomy must not compete visually with operational state."
 * "Neutral labels remain available for classifications/types/workflows."
 *
 * The four operational roles (actionable, attention, settled, inert) plus
 * a neutral taxonomy role for classification labels.
 */
export function StateLabel({
  children,
  role = "neutral",
  className,
}: StateLabelProps) {
  return (
    <span
      data-slot="state-label"
      data-role={role}
      className={cn(
        "inline-flex shrink-0 items-center rounded-[var(--radius-badge)] border px-2 py-0.5 font-mono text-[var(--type-state)] uppercase tracking-[0.1em]",
        roleStyles[role],
        className,
      )}
      aria-label={typeof children === "string" ? children : undefined}
    >
      {children}
    </span>
  );
}

export type { OperationalRole };
