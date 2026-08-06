import Link from "next/link";

import { BentoGrid } from "@/components/bento-grid";
import { CelestialBackdrop } from "@/components/celestial-backdrop";
import { Eyebrow } from "@/components/eyebrow";
import { HeroBrandMark } from "@/components/hero-brand-mark";
import { ProjectCard } from "@/components/project-card";
import { RuneDivider } from "@/components/rune-divider";
import { SectionShell } from "@/components/section-shell";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/site-config";

export default function HomePage() {
  return (
    <>
      {/* Hero — always "night sky" in both light and dark themes */}
      <section className="dark relative isolate min-h-[calc(100svh-4rem)] overflow-hidden border-b border-grid-line bg-[#0a0c14] text-foreground">
        <CelestialBackdrop />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-b from-transparent to-background"
          aria-hidden
        />
        <div className="relative mx-auto grid min-h-[calc(100svh-4rem)] max-w-6xl items-center gap-10 px-6 py-16 pb-28 sm:gap-12 sm:py-20 sm:pb-32 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:pb-20">
          <div className="max-w-2xl">
            <Eyebrow className="text-[#F97316]/90">
              Independent Engineering Lab
            </Eyebrow>
            <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              Aredir exists to provide the operational environment in which
              engineering occurs.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Engineering turns ideas, problems, and opportunities into validated
              outcomes. We are building an environment that supports that work
              from discovery through continuous improvement.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-[#F97316] font-mono text-xs uppercase tracking-[0.1em] text-white hover:bg-[#F97316]/90"
              >
                <Link href="/projects">View Projects</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/20 bg-transparent font-mono text-xs uppercase tracking-[0.1em] hover:bg-white/5"
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <HeroBrandMark className="max-sm:scale-90" />
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <SectionShell
        id="projects"
        aria-labelledby="projects-heading"
        className="bg-background"
      >
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>Portfolio</Eyebrow>
            <h2
              id="projects-heading"
              className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              What we are building
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Focused products in active development across fitness, education,
              and operations.
            </p>
          </div>
          <Link
            href="/projects"
            className="rounded-sm font-mono text-xs uppercase tracking-[0.12em] text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            View all projects →
          </Link>
        </div>
        <BentoGrid>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </BentoGrid>
      </SectionShell>

      {/* Mission / approach */}
      <SectionShell
        aria-labelledby="about-heading"
        className="border-t border-grid-line bg-muted/35 dark:bg-muted/20"
      >
        <RuneDivider className="mb-10 sm:mb-12" />
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <Eyebrow>Mission</Eyebrow>
            <h2
              id="about-heading"
              className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              A place for engineering to happen well
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
              Engineering is more than software development. It is the disciplined
              work of understanding a need, designing a response, implementing
              change, validating the result, and learning what comes next.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-8 font-mono text-xs uppercase tracking-[0.1em]"
            >
              <Link href="/about">About Aredir Labs</Link>
            </Button>
          </div>
          <ol className="border-y border-border">
            {[
              "Opportunities discovered with care",
              "Problems understood before solutions",
              "Tradeoffs made visible",
              "Outcomes validated with evidence",
            ].map((item, index) => (
              <li
                key={item}
                className="grid grid-cols-[2.5rem_1fr] items-baseline gap-3 border-t border-border py-4 first:border-t-0"
              >
                <span className="font-mono text-xs text-[#F97316]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-medium text-foreground">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </SectionShell>

      {/* CTA */}
      <SectionShell
        aria-labelledby="cta-heading"
        className="dark relative overflow-hidden border-t border-grid-line bg-[#0a0c14] text-foreground"
      >
        <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-30" aria-hidden />
        <div className="relative grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <Eyebrow>Get in Touch</Eyebrow>
            <h2
              id="cta-heading"
              className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
            >
              Interested in working together?
            </h2>
            <p className="mt-3 max-w-lg text-muted-foreground">
              Reach out for partnerships, product feedback, or general inquiries.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="w-fit bg-[#F97316] font-mono text-xs uppercase tracking-[0.1em] text-white hover:bg-[#F97316]/90"
          >
            <Link href="/contact">Contact the Lab</Link>
          </Button>
        </div>
      </SectionShell>
    </>
  );
}
