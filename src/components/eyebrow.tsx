import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

/**
 * Monospace, uppercase, letter-spaced label used for section eyebrows and
 * technical metadata — the "schematic" voice of the design system.
 */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <p
      className={cn(
        "font-mono text-[0.72rem] font-medium uppercase tracking-[0.18em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </p>
  );
}
