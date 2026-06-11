import Image from "next/image";

import { brandAssets } from "@/lib/brand";
import { cn } from "@/lib/utils";

type HeroBrandMarkProps = {
  className?: string;
};

/**
 * Hero brand symbol — dark-mode source mark (hero is always night-sky).
 */
export function HeroBrandMark({ className }: HeroBrandMarkProps) {
  return (
    <div
      className={cn("flex items-center justify-center py-4 sm:py-0", className)}
      aria-hidden
    >
      <Image
        src={brandAssets.markDark}
        alt=""
        width={1024}
        height={1024}
        priority
        unoptimized
        aria-hidden
        className="size-48 object-contain sm:size-64 lg:size-80"
      />
    </div>
  );
}
