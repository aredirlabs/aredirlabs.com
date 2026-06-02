import { cn } from "@/lib/utils";

type SigilProps = {
  className?: string;
  /** When provided, the sigil is treated as a meaningful image with this label. */
  title?: string;
  /** Show the runic vertex ticks (hide for very small sizes). */
  withTicks?: boolean;
};

/**
 * Aredir Labs sigil: an original angular "A" rune inside a hex seal with an
 * ember-gold apex star. Monoline; structure inherits `currentColor`, the star
 * uses the `--ember` token. Original mark — not derived from any third-party IP.
 */
export function Sigil({ className, title, withTicks = true }: SigilProps) {
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

      {/* hex seal */}
      <polygon
        points="32,7 53.5,19.5 53.5,44.5 32,57 10.5,44.5 10.5,19.5"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.35"
        strokeWidth="1.4"
      />

      {/* runic vertex ticks */}
      {withTicks ? (
        <g stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round">
          <line x1="32" y1="3.5" x2="32" y2="7" />
          <line x1="56.6" y1="17.7" x2="53.5" y2="19.5" />
          <line x1="56.6" y1="46.3" x2="53.5" y2="44.5" />
          <line x1="32" y1="60.5" x2="32" y2="57" />
          <line x1="7.4" y1="46.3" x2="10.5" y2="44.5" />
          <line x1="7.4" y1="17.7" x2="10.5" y2="19.5" />
        </g>
      ) : null}

      {/* A rune */}
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M21 47 L32 19" />
        <path d="M32 19 L43 47" />
        <path d="M25.5 37.5 L38.5 37.5" />
      </g>

      {/* ember apex star */}
      <path
        d="M32 12.5 L33.4 17.6 L38.5 19 L33.4 20.4 L32 25.5 L30.6 20.4 L25.5 19 L30.6 17.6 Z"
        fill="var(--ember)"
      />
    </svg>
  );
}
