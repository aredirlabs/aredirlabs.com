import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type FlowStep = {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
};

type EosFlowDiagramProps = {
  steps: readonly FlowStep[];
  className?: string;
};

export function EosFlowDiagram({ steps, className }: EosFlowDiagramProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="hidden items-center justify-between gap-1 lg:flex">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isOutcome = step.id === "outcome";

          return (
            <div key={step.id} className="flex min-w-0 flex-1 items-center">
              <div className="flex min-w-0 flex-1 flex-col items-center text-center">
                <div
                  className={cn(
                    "flex size-12 shrink-0 items-center justify-center rounded-full border bg-card",
                    isOutcome
                      ? "border-[#F97316]/50 text-[#F97316]"
                      : "border-border text-foreground",
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                </div>
                <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted-foreground">
                  {step.title}
                </p>
              </div>
              {index < steps.length - 1 ? (
                <ArrowRight
                  className="mx-1 size-4 shrink-0 text-muted-foreground/50"
                  aria-hidden
                />
              ) : null}
            </div>
          );
        })}
      </div>

      <ol className="grid gap-3 sm:grid-cols-2 lg:hidden">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isOutcome = step.id === "outcome";

          return (
            <li
              key={step.id}
              className="flex items-center gap-3 rounded-lg border border-border bg-card/60 px-4 py-3"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-full border",
                  isOutcome
                    ? "border-[#F97316]/50 text-[#F97316]"
                    : "border-border text-foreground",
                )}
              >
                <Icon className="size-4" aria-hidden />
              </div>
              <span className="text-sm font-medium text-foreground">{step.title}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
