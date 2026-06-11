import { Constellation } from "@/components/constellation";

/**
 * Night-sky hero backdrop: deep field + soft color blooms + constellation +
 * a left-side scrim for text legibility. All vector/CSS (no raster). Fully
 * decorative; the twinkle freezes under prefers-reduced-motion (see globals).
 * Intended to sit behind hero content only.
 */
export function CelestialBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ backgroundColor: "#0a0c14" }}
    >
      <div
        className="absolute -right-24 top-0 h-[36rem] w-[36rem]"
        style={{
          background:
            "radial-gradient(circle, rgba(63,109,219,0.40) 0%, rgba(63,109,219,0) 70%)",
        }}
      />
      <div
        className="absolute -right-10 -top-24 h-[26rem] w-[26rem]"
        style={{
          background:
            "radial-gradient(circle, rgba(122,92,255,0.22) 0%, rgba(122,92,255,0) 70%)",
        }}
      />
      <div
        className="absolute -left-16 bottom-0 h-[22rem] w-[22rem]"
        style={{
          background:
            "radial-gradient(circle, rgba(52,208,255,0.16) 0%, rgba(52,208,255,0) 70%)",
        }}
      />
      <Constellation className="text-[#cdd8ee] opacity-70" />
      <div
        className="absolute inset-y-0 left-0 w-3/4"
        style={{
          background:
            "linear-gradient(to right, rgba(10,12,20,0.88) 0%, rgba(10,12,20,0) 100%)",
        }}
      />
    </div>
  );
}
