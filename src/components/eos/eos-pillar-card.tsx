import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type EosPillarCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  className?: string;
};

export function EosPillarCard({
  title,
  description,
  icon: Icon,
  className,
}: EosPillarCardProps) {
  return (
    <article
      className={cn(
        "group relative flex h-full flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-[#F97316]/35",
        className,
      )}
    >
      <span
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/40 to-transparent opacity-60 transition-opacity group-hover:opacity-100"
        aria-hidden
      />
      <div className="mb-4 flex size-11 items-center justify-center rounded-full border border-border bg-background/80">
        <Icon className="size-5 text-foreground" aria-hidden />
      </div>
      <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </article>
  );
}
