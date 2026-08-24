import { Target } from "lucide-react";

import { cn } from "@/lib/utils";

type OperationalFocusMarkerProps = {
  className?: string;
};

/**
 * Focus marker uses structural accent treatment — not lifecycle actionable role color.
 * Per PROJECT-UX-004 §9: focus is explicit label/icon with interaction accent on control edge.
 */
export function OperationalFocusMarker({ className }: OperationalFocusMarkerProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-[var(--radius-badge)] border border-primary/40 bg-surface-inset px-2 py-0.5 font-mono text-[var(--type-state)] uppercase tracking-[0.1em] text-foreground",
        className,
      )}
      aria-label="Focused — shared Project operational emphasis"
    >
      <Target className="size-3 text-primary" aria-hidden="true" />
      <span>Focused</span>
    </span>
  );
}
