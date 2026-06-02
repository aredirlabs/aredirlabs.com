import { cn } from "@/lib/utils";

/** Original abstract glyphs — invented forms, not any real script. */
const GLYPHS = [
  "M2 14 L8 2 L14 14 M5 9 L11 9",
  "M8 2 L8 14 M2 5 L14 5",
  "M2 2 L8 8 L2 14 M8 8 L14 8",
  "M3 2 L3 14 M13 2 L13 14 M3 8 L13 8",
  "M2 8 A6 6 0 1 1 14 8 M8 8 L8 14",
];

type RuneDividerProps = {
  className?: string;
};

/**
 * Decorative divider: thin rules flanking a row of original mythic glyphs.
 * Adds quiet "techno-mythic" texture between sections.
 */
export function RuneDivider({ className }: RuneDividerProps) {
  return (
    <div
      aria-hidden
      className={cn("flex items-center justify-center gap-4 text-muted-foreground/70", className)}
    >
      <span className="h-px w-full max-w-[6rem] bg-gradient-to-r from-transparent to-border sm:max-w-[12rem]" />
      <div className="flex items-center gap-3">
        {GLYPHS.map((d, i) => (
          <svg key={i} viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
            <path
              d={d}
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ))}
      </div>
      <span className="h-px w-full max-w-[6rem] bg-gradient-to-l from-transparent to-border sm:max-w-[12rem]" />
    </div>
  );
}
