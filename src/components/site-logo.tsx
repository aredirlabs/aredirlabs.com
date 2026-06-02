import Link from "next/link";

import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
};

export function SiteLogo({ className }: SiteLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-md text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      aria-label="Aredir Labs home"
    >
      <span
        className="flex size-8 shrink-0 items-center justify-center rounded-md bg-brand-navy text-sm font-semibold text-white"
        aria-hidden
      >
        A
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-sm font-semibold tracking-tight">Aredir Labs</span>
        <span className="hidden text-xs text-muted-foreground sm:block">
          Software lab
        </span>
      </span>
    </Link>
  );
}
