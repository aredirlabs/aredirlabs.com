import { cn } from "@/lib/utils";

type BentoGridProps = {
  children: React.ReactNode;
  className?: string;
};

/** Modular bento grid: 3 columns on desktop, 2 on tablet, 1 on mobile. */
export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3", className)}>
      {children}
    </div>
  );
}
