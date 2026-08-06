import { EngineeringHeroBackdrop } from "@/components/engineering/engineering-hero-backdrop";
import { Eyebrow } from "@/components/eyebrow";
import { cn } from "@/lib/utils";

type PublicPageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description: React.ReactNode;
  eyebrowAdornment?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

export function PublicPageHero({
  eyebrow,
  title,
  description,
  eyebrowAdornment,
  children,
  className,
  contentClassName,
}: PublicPageHeroProps) {
  return (
    <section
      className={cn(
        "dark relative isolate min-h-[24rem] overflow-hidden border-b border-grid-line bg-[#0a0c14] text-foreground sm:min-h-[28rem]",
        className,
      )}
    >
      <EngineeringHeroBackdrop />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-b from-transparent to-background"
        aria-hidden
      />
      <div className="relative z-10 mx-auto flex min-h-[24rem] max-w-6xl items-center px-6 py-16 sm:min-h-[28rem] sm:py-20">
        <div className={cn("max-w-3xl", contentClassName)}>
          <div className="flex flex-wrap items-center gap-3">
            <Eyebrow className="text-[#F97316]/90">{eyebrow}</Eyebrow>
            {eyebrowAdornment}
          </div>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
            {title}
          </h1>
          <div className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {description}
          </div>
          {children ? <div className="mt-10">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
