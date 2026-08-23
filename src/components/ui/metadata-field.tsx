import { type ReactNode } from "react";

import { cn } from "@/lib/utils";

type MetadataFieldProps = {
  label: string;
  value: ReactNode;
  /** Monospace identifier treatment for slugs, IDs, paths. */
  variant?: "default" | "identifier";
  className?: string;
};

/**
 * MetadataField distinguishes label, authoritative value, advisory value,
 * identifier, and subordinate context.
 *
 * Per PROJECT-UX-004 §12:
 * "Monospace for labels/identifiers where appropriate;
 * normal readable typography for narrative prose."
 */
export function MetadataField({
  label,
  value,
  variant = "default",
  className,
}: MetadataFieldProps) {
  return (
    <div className={cn("min-w-0", className)}>
      <dt
        className={cn(
          "font-mono text-[var(--type-metadata)] uppercase tracking-[0.1em] text-muted-foreground",
          variant === "identifier" && "break-all",
        )}
      >
        {label}
      </dt>
      <dd
        className={cn(
          "mt-1 text-[var(--type-narrative)] leading-relaxed",
          variant === "identifier" && "break-all font-mono text-[var(--type-identifier)]",
        )}
      >
        {value}
      </dd>
    </div>
  );
}

type MetadataGroupProps = {
  children: ReactNode;
  className?: string;
  /** Number of columns at the sm breakpoint. */
  columns?: 2 | 3 | 4;
};

/**
 * MetadataGroup composes multiple MetadataFields in a responsive grid.
 */
export function MetadataGroup({
  children,
  className,
  columns = 2,
}: MetadataGroupProps) {
  const colClass =
    columns === 4
      ? "sm:grid-cols-2 lg:grid-cols-4"
      : columns === 3
        ? "sm:grid-cols-3"
        : "sm:grid-cols-2";

  return (
    <dl
      className={cn(
        "grid gap-4 text-[var(--type-narrative)]",
        colClass,
        className,
      )}
    >
      {children}
    </dl>
  );
}
