import { cn } from "@/lib/utils";

/** Deterministic stars (no randomness — avoids hydration mismatch). */
const STARS: { x: number; y: number; r: number; twinkle?: boolean }[] = [
  { x: 80, y: 60, r: 1.4, twinkle: true },
  { x: 180, y: 120, r: 1 },
  { x: 300, y: 70, r: 1.8, twinkle: true },
  { x: 420, y: 150, r: 1.1 },
  { x: 520, y: 90, r: 1.4 },
  { x: 640, y: 140, r: 1, twinkle: true },
  { x: 720, y: 70, r: 1.6 },
  { x: 140, y: 230, r: 1.2 },
  { x: 360, y: 250, r: 1, twinkle: true },
  { x: 560, y: 220, r: 1.5 },
  { x: 680, y: 280, r: 1.1 },
  { x: 240, y: 330, r: 1.6, twinkle: true },
  { x: 460, y: 350, r: 1.2 },
  { x: 600, y: 330, r: 1 },
  { x: 100, y: 360, r: 1.3 },
];

/** Faint links between a few stars, suggesting an original constellation. */
const LINKS: [number, number][] = [
  [0, 1],
  [1, 2],
  [2, 4],
  [4, 6],
  [7, 8],
  [8, 9],
  [11, 12],
  [12, 13],
];

type ConstellationProps = {
  className?: string;
};

/**
 * Purely decorative mythic starfield used behind hero content. Very low
 * opacity so it never reduces text contrast. Twinkle freezes under
 * prefers-reduced-motion (see globals.css).
 */
export function Constellation({ className }: ConstellationProps) {
  return (
    <svg
      viewBox="0 0 800 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
    >
      <g stroke="currentColor" strokeWidth="0.75" opacity="0.18">
        {LINKS.map(([a, b], i) => (
          <line
            key={`l-${i}`}
            x1={STARS[a].x}
            y1={STARS[a].y}
            x2={STARS[b].x}
            y2={STARS[b].y}
          />
        ))}
      </g>
      <g fill="currentColor">
        {STARS.map((s, i) => (
          <circle
            key={`s-${i}`}
            cx={s.x}
            cy={s.y}
            r={s.r}
            opacity={0.5}
            className={s.twinkle ? "aredir-twinkle" : undefined}
            style={s.twinkle ? { animationDelay: `${(i % 5) * 0.6}s` } : undefined}
          />
        ))}
      </g>
    </svg>
  );
}
