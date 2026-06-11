import Image from "next/image";

import { brandAssets } from "@/lib/brand";
import { cn } from "@/lib/utils";

type BrandMarkProps = {
  className?: string;
  size?: "xs" | "sm" | "md" | "lg";
  priority?: boolean;
};

const sizeClasses = {
  xs: "size-6",
  sm: "size-7",
  md: "size-8",
  lg: "size-10",
} as const;

/** Theme-aware mark for header, footer, workspace, and auth lockups. */
export function BrandMark({
  className,
  size = "md",
  priority = false,
}: BrandMarkProps) {
  const sizeClass = cn("shrink-0 object-contain", sizeClasses[size], className);

  return (
    <span className="relative inline-flex shrink-0 items-center">
      <Image
        src={brandAssets.markLight}
        alt=""
        width={1024}
        height={1024}
        priority={priority}
        unoptimized
        aria-hidden
        className={cn(sizeClass, "dark:hidden")}
      />
      <Image
        src={brandAssets.markDark}
        alt=""
        width={1024}
        height={1024}
        priority={priority}
        unoptimized
        aria-hidden
        className={cn(sizeClass, "hidden dark:block")}
      />
    </span>
  );
}
