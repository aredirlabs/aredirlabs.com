import { cn } from "@/lib/utils";

type LogoGlyphProps = {
  className?: string;
  title?: string;
};

/**
 * Compact, flat elvish-style blade-"A" with a small star at the apex.
 * Letterforms inherit `currentColor`; the star uses `--primary`. No glow or
 * comet — used in the header, favicon, and light theme. Original artwork.
 */
export function LogoGlyph({ className, title }: LogoGlyphProps) {
  const decorative = !title;
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className={cn("h-8 w-8", className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <g fill="currentColor">
        {/* left blade */}
        <path d="M13 57 C 17 40 24 22 32 9 C 30 25 27 42 24 57 C 21 54 16.5 54 13 57 Z" />
        {/* right blade with subtle swash foot */}
        <path d="M40 57 C 37 41 35 24 32 9 C 38 23 45 41 51 57 C 47.5 54 43.5 54 40 57 Z" />
        {/* crossbar */}
        <path d="M21 39.5 C 27 36.5 36 36.5 43 38.5 C 36 42 27 42 21 44.5 Z" />
      </g>
      {/* apex star */}
      <path
        d="M32 3 L33.4 7.2 L37.6 8.6 L33.4 10 L32 14.2 L30.6 10 L26.4 8.6 L30.6 7.2 Z"
        fill="var(--primary)"
      />
    </svg>
  );
}
