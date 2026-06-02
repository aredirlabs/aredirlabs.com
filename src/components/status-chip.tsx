import type { ProjectStatus } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const statusStyles: Record<ProjectStatus, string> = {
  "Active Build": "border-success/30 bg-success/10 text-success",
  "In Development": "border-primary/30 bg-primary/10 text-primary",
  Concept: "border-ember/30 bg-ember/10 text-ember",
};

type StatusChipProps = {
  status: ProjectStatus;
  className?: string;
};

/** Monospace status pill. Tone communicates lifecycle stage, honestly. */
export function StatusChip({ status, className }: StatusChipProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-sm border px-2 py-0.5 font-mono text-[0.65rem] font-medium uppercase tracking-[0.1em]",
        statusStyles[status],
        className,
      )}
    >
      {status}
    </span>
  );
}
