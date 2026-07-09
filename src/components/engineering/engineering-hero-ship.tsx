import Image from "next/image";

import { cn } from "@/lib/utils";

type EngineeringHeroShipProps = {
  className?: string;
};

/**
 * Environmental ship layer for the Engineering hero.
 *
 * Soft edge dissolves + rounded corners soften the PNG rectangle into the
 * page night while keeping the vessel and destination readable.
 */
export function EngineeringHeroShip({ className }: EngineeringHeroShipProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-[1] overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "absolute overflow-hidden rounded-[1.75rem] lg:rounded-[2.25rem]",
          // Mobile — vessel sits in lower field; silhouette kept intact
          "bottom-[2%] left-[2%] right-[2%] h-[min(46svh,24rem)]",
          "sm:left-[10%] sm:right-[4%] sm:h-[min(48svh,26rem)]",
          // Desktop — left enough for destination; room for edge dissolves
          "lg:bottom-[-2%] lg:left-auto lg:right-[8%] lg:top-[6%] lg:h-auto lg:w-[min(56%,38rem)]",
          "xl:right-[10%] xl:w-[min(52%,40rem)]",
        )}
      >
        <Image
          src="/images/engineering-ship.png"
          alt="A luminous sailing ship navigating a starfield — a metaphor for disciplined engineering through uncertainty"
          fill
          priority
          sizes="(max-width: 1024px) 90vw, 38rem"
          className={cn(
            // Bias framing toward the destination on the artwork's right
            "object-cover object-[62%_40%] mix-blend-screen",
            "lg:object-[60%_38%]",
          )}
        />

        {/* Narrow edge dissolves on all four sides */}
        <div
          className="absolute inset-y-0 left-0 w-[16%] lg:w-[14%]"
          style={{
            background:
              "linear-gradient(90deg, #0a0c14 0%, rgba(10,12,20,0.8) 28%, rgba(10,12,20,0.25) 70%, transparent 100%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-y-0 right-0 w-[16%] lg:w-[14%]"
          style={{
            background:
              "linear-gradient(270deg, #0a0c14 0%, rgba(10,12,20,0.8) 28%, rgba(10,12,20,0.25) 70%, transparent 100%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-x-0 top-0 h-[14%] lg:h-[12%]"
          style={{
            background:
              "linear-gradient(180deg, #0a0c14 0%, rgba(10,12,20,0.75) 30%, rgba(10,12,20,0.2) 70%, transparent 100%)",
          }}
          aria-hidden
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[14%] lg:h-[12%]"
          style={{
            background:
              "linear-gradient(0deg, #0a0c14 0%, rgba(10,12,20,0.75) 30%, rgba(10,12,20,0.2) 70%, transparent 100%)",
          }}
          aria-hidden
        />
      </div>

      {/* Content-side night — typography stays primary over atmosphere */}
      <div
        className="absolute inset-0"
        style={{
          background: [
            "linear-gradient(90deg, #0a0c14 0%, #0a0c14 36%, rgba(10,12,20,0.75) 50%, rgba(10,12,20,0.25) 62%, transparent 74%)",
            "linear-gradient(180deg, #0a0c14 0%, rgba(10,12,20,0.45) 6%, transparent 16%)",
            "linear-gradient(0deg, #0a0c14 0%, rgba(10,12,20,0.4) 6%, transparent 16%)",
          ].join(", "),
        }}
        aria-hidden
      />

      {/* Mobile: keep headline clear above the emerging vessel */}
      <div
        className="absolute inset-x-0 top-0 h-[46%] bg-gradient-to-b from-[#0a0c14] via-[#0a0c14]/88 to-transparent lg:hidden"
        aria-hidden
      />
    </div>
  );
}
