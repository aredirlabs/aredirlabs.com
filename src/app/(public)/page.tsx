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
      <section className="dark relative isolate overflow-hidden bg-[#0a0c14] text-foreground">
        <CelestialBackdrop />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-gradient-to-b from-transparent to-background"
          aria-hidden
        />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 sm:gap-12 sm:py-28 lg:grid-cols-[1.35fr_1fr] lg:gap-16 lg:py-32">
          <div className="max-w-2xl">
            <Eyebrow>Independent Software Lab</Eyebrow>
            <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl lg:leading-[1.05]">
              Building intelligent software that helps people learn, perform, and
              make better decisions.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Aredir Labs is a workshop for AI-powered SaaS products—built with
              quality engineering and modern product development across fitness,
              education, and operational systems.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="font-mono text-xs uppercase tracking-[0.1em]">
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
              Software that creates meaningful progress
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
              Aredir Labs creates software that empowers people to improve
              outcomes, make better decisions, and achieve meaningful progress
              through technology.
            </p>
            <Button
              asChild
              variant="outline"
              className="mt-8 font-mono text-xs uppercase tracking-[0.1em]"
            >
              <Link href="/about">About Aredir Labs</Link>
            </Button>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              "Founder-led product development",
              "AI-powered SaaS applications",
              "Quality engineering and validation",
              "Modern, production-minded delivery",
            ].map((item) => (
              <li
                key={item}
                className="relative overflow-hidden rounded-lg border border-border bg-card p-5"
              >
                <span
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
                  aria-hidden
                />
                <span className="text-sm font-medium text-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </SectionShell>

      {/* CTA */}
      <SectionShell
        aria-labelledby="cta-heading"
        className="border-t border-grid-line bg-background"
      >
        <div className="relative overflow-hidden rounded-xl border border-border bg-card px-8 py-12 sm:px-12">
          <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-50" aria-hidden />
          <div className="relative">
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
            <Button
              asChild
              className="mt-6 bg-ember font-mono text-xs uppercase tracking-[0.1em] text-background hover:bg-ember/90"
            >
              <Link href="/contact">Contact the Lab</Link>
            </Button>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
