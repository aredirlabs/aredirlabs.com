import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";

type EosExploreCardProps = {
  title: string;
  description: string;
  href: string;
  className?: string;
};

export function EosExploreCard({
  title,
  description,
  href,
  className,
}: EosExploreCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative flex h-full flex-col rounded-xl border border-border bg-card/80 p-5 transition-colors hover:border-[#F97316]/35 hover:bg-card",
        className,
      )}
    >
      <span
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#F97316]/35 to-transparent opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden
      />
      <h3 className="font-heading text-base font-semibold tracking-tight text-foreground">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
      <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.12em] text-[#F97316]">
        Explore
        <ArrowRight
          className="size-3.5 transition-transform group-hover:translate-x-0.5"
          aria-hidden
        />
      </span>
    </Link>
  );
}
