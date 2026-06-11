import { cn } from "@/lib/utils";

type LogoLuminousProps = {
  className?: string;
  title?: string;
};

const LEFT_BLADE =
  "M744,478 C 760,356 802,250 852,156 C 836,256 824,360 806,478 C 792,470 768,470 744,478 Z";
const RIGHT_BLADE =
  "M898,478 C 858,356 838,256 852,156 C 902,250 936,356 968,470 C 974,484 986,490 998,486 C 984,488 968,486 952,480 C 934,476 916,476 898,478 Z";
const CROSSBAR =
  "M790,372 C 834,355 875,355 914,363 C 875,381 834,381 790,389 Z";
const TRAIL = "M852,156 C 880,120 930,110 1004,232";

/**
 * Luminous elvish comet-"A" for the hero. The apex flows up into a
 * shooting-star trail. Uses gradient + blur defs (render once per page).
 * Original artwork — an elvish *style*, not any real script.
 */
export function LogoLuminous({ className, title }: LogoLuminousProps) {
  const decorative = !title;
  return (
    <svg
      viewBox="720 95 340 405"
      fill="none"
      className={cn("h-64 w-64", className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative ? true : undefined}
      aria-label={title}
    >
      {title ? <title>{title}</title> : null}
      <defs>
        <linearGradient id="lm-blade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#dbe8ff" />
          <stop offset="45%" stopColor="#7aa6ff" />
          <stop offset="100%" stopColor="#3f7bff" />
        </linearGradient>
        <linearGradient id="lm-comet" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#4b8eff" stopOpacity="0" />
          <stop offset="60%" stopColor="#7fb0ff" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#eaf3ff" stopOpacity="0.95" />
        </linearGradient>
        <radialGradient id="lm-starglow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="35%" stopColor="#bcd6ff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#bcd6ff" stopOpacity="0" />
        </radialGradient>
        <filter id="lm-soft" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="lm-softlg" x="-90%" y="-90%" width="280%" height="280%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      {/* glow under the letterform */}
      <g fill="#3f7bff" opacity="0.45" filter="url(#lm-softlg)">
        <path d={LEFT_BLADE} />
        <path d={RIGHT_BLADE} />
        <path d={CROSSBAR} />
      </g>
      {/* main fills */}
      <g fill="url(#lm-blade)">
        <path d={LEFT_BLADE} />
        <path d={RIGHT_BLADE} />
        <path d={CROSSBAR} />
      </g>
      {/* spine highlights */}
      <path
        d="M788,470 C 806,360 826,256 850,168"
        fill="none"
        stroke="#f2f7ff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.5"
      />
      <path
        d="M912,470 C 892,360 872,256 854,170"
        fill="none"
        stroke="#f2f7ff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.3"
      />
      {/* comet trail from apex */}
      <path
        d={TRAIL}
        stroke="url(#lm-comet)"
        strokeWidth="16"
        fill="none"
        strokeLinecap="round"
        filter="url(#lm-softlg)"
        opacity="0.7"
      />
      <path
        d={TRAIL}
        stroke="url(#lm-comet)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {/* star */}
      <circle cx="1004" cy="232" r="34" fill="url(#lm-starglow)" />
      <path
        d="M1004 209 L1010 226 L1027 232 L1010 238 L1004 255 L998 238 L981 232 L998 226 Z"
        fill="#ffffff"
        filter="url(#lm-soft)"
      />
      <path
        d="M1004 205 L1011 225 L1031 232 L1011 239 L1004 259 L997 239 L977 232 L997 225 Z"
        fill="#eaf3ff"
      />
    </svg>
  );
}
