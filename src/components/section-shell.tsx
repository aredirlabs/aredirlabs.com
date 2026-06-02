import { cn } from "@/lib/utils";

type SectionShellProps = React.ComponentPropsWithoutRef<"section"> & {
  children: React.ReactNode;
  containerClassName?: string;
  as?: "section" | "div";
};

export function SectionShell({
  id,
  children,
  className,
  containerClassName,
  as: Component = "section",
  ...props
}: SectionShellProps) {
  return (
    <Component
      id={id}
      className={cn("py-16 sm:py-20", className)}
      {...props}
    >
      <div
        className={cn(
          "mx-auto max-w-5xl px-6",
          containerClassName,
        )}
      >
        {children}
      </div>
    </Component>
  );
}
