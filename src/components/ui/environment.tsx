import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type EnvironmentProps = {
  children: ReactNode;
  className?: string;
  /** When true, uses the full viewport height for the operating canvas. */
  fullHeight?: boolean;
};

/**
 * Environment establishes the authenticated altitude field.
 * It owns environment-level background/tone and canonical foreground behavior.
 *
 * Per PROJECT-UX-004 §7, Environment is the deepest level:
 * "Deepest graphite/dark-neutral field; no decorative shadow."
 */
export function Environment({
  children,
  className,
  fullHeight = false,
}: EnvironmentProps) {
  return (
    <div
      data-slot="environment"
      className={cn(
        "bg-surface-environment text-foreground",
        fullHeight && "min-h-screen",
        className,
      )}
    >
      {children}
    </div>
  );
}
