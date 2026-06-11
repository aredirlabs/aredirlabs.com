import Link from "next/link";

import { LogoGlyph } from "@/components/logo-glyph";
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
      <LogoGlyph className="h-8 w-8 transition-colors group-hover:text-primary" />
      <span className="flex flex-col leading-tight">
        <span className="font-heading text-sm font-semibold tracking-tight">
          Aredir Labs
        </span>
        <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground sm:block">
          The Forge
        </span>
      </span>
    </Link>
  );
}
