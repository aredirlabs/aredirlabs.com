import Image from "next/image";
import Link from "next/link";

import { BrandMark } from "@/components/brand-mark";
import { brandAssets } from "@/lib/brand";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  /**
   * lockup — mark + rendered wordmark (header, footer, auth)
   * full — horizontal logo asset (brand sections only)
   */
  variant?: "lockup" | "full";
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
};

const markSize = {
  sm: "sm" as const,
  md: "md" as const,
  lg: "lg" as const,
};

const fullSizeClasses = {
  sm: "h-9 w-auto max-w-[11rem]",
  md: "h-11 w-auto max-w-[13rem]",
  lg: "h-14 w-auto max-w-[16rem]",
} as const;

function LogoWordmark({
  showTagline,
  size,
}: {
  showTagline: boolean;
  size: "sm" | "md" | "lg";
}) {
  return (
    <span className="flex min-w-0 flex-col leading-tight">
      <span
        className={cn(
          "font-heading font-semibold tracking-tight text-foreground",
          size === "lg" ? "text-base" : "text-sm",
        )}
      >
        Aredir Labs
      </span>
      {showTagline ? (
        <span className="hidden font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted-foreground sm:block">
          The Forge
        </span>
      ) : null}
    </span>
  );
}

export function SiteLogo({
  className,
  variant = "lockup",
  size = "md",
  showTagline = true,
}: SiteLogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex shrink-0 items-center gap-2 rounded-md text-foreground outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        className,
      )}
      aria-label="Aredir Labs home"
    >
      {variant === "lockup" ? (
        <>
          <BrandMark
            size={markSize[size]}
            priority={size === "md"}
            className="transition-opacity group-hover:opacity-90"
          />
          <LogoWordmark showTagline={showTagline} size={size} />
        </>
      ) : (
        <>
          <Image
            src={brandAssets.logoLight}
            alt="Aredir Labs"
            width={1024}
            height={1024}
            className={cn(
              "object-contain transition-opacity group-hover:opacity-90 dark:hidden",
              fullSizeClasses[size],
            )}
            priority={size === "md" || size === "lg"}
          />
          <Image
            src={brandAssets.logoDark}
            alt="Aredir Labs"
            width={1024}
            height={1024}
            className={cn(
              "hidden object-contain transition-opacity group-hover:opacity-90 dark:block",
              fullSizeClasses[size],
            )}
            priority={size === "md" || size === "lg"}
          />
        </>
      )}
    </Link>
  );
}
