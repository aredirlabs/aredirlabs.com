import type { Metadata } from "next";
import Link from "next/link";

import { EosExploreCard } from "@/components/eos/eos-explore-card";
import { EosFlowDiagram } from "@/components/eos/eos-flow-diagram";
import { EngineeringHeroBackdrop } from "@/components/engineering/engineering-hero-backdrop";
import { EngineeringHeroShip } from "@/components/engineering/engineering-hero-ship";
import { Eyebrow } from "@/components/eyebrow";
import { RuneDivider } from "@/components/rune-divider";
import { SectionShell } from "@/components/section-shell";
import { Button } from "@/components/ui/button";
import {
  ENGINEERING_BUILD_STEPS,
  ENGINEERING_PRINCIPLES,
  ENGINEERING_RESOURCE_LINKS,
} from "@/lib/engineering-content";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Engineering",
  description:
    "Aredir Labs defines engineering as a disciplined process for transforming ideas, problems, and opportunities into validated outcomes.",
});

export default function EngineeringPage() {
  return (
    <>
      {/* Hero — ship is environmental scenery, not a grid image cell */}
      <section className="dark relative isolate min-h-[calc(100svh-4rem)] overflow-hidden border-b border-grid-line bg-[#0a0c14] text-foreground">
        <EngineeringHeroBackdrop />
        <EngineeringHeroShip />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-28 bg-gradient-to-b from-transparent to-background"
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex min-h-[calc(100svh-4rem)] max-w-6xl items-center px-6 py-16 pb-44 sm:py-20 sm:pb-48 lg:pb-20">
          <div className="max-w-xl lg:max-w-[36rem] xl:max-w-[38rem]">
            <Eyebrow className="text-[#F97316]/90">Engineering</Eyebrow>
            <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]">
              We don&apos;t eliminate the unknown.{" "}
              <span className="text-[#F97316]">We navigate it.</span>
            </h1>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Engineering is the disciplined process of transforming ideas,
                problems, and opportunities into validated outcomes through
                evidence, design, implementation, and continuous improvement.
              </p>
              <p>
                Every meaningful engineering effort begins with uncertainty. The
                discipline gives people a way to navigate it without pretending
                it is gone.
              </p>
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="bg-[#F97316] font-mono text-xs uppercase tracking-[0.1em] text-white hover:bg-[#F97316]/90"
              >
                <Link href="#how-we-build">How We Engineer</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/20 bg-transparent font-mono text-xs uppercase tracking-[0.1em] hover:bg-white/5"
              >
                <Link href="#behind-every-project">Behind the Approach</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Engineering Matters */}
      <SectionShell aria-labelledby="why-engineering-heading">
        <div className="mx-auto max-w-3xl">
          <Eyebrow>Why We Engineer</Eyebrow>
          <h2
            id="why-engineering-heading"
            className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Engineering is larger than software
          </h2>
          <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Engineering begins wherever an idea, problem, or opportunity must
              become a reliable outcome. It includes discovering what matters,
              understanding the problem, designing a response, evaluating
              tradeoffs, implementing change, and testing what actually happened.
            </p>
            <p>
              Software engineering is one implementation of that discipline, not
              its definition. Different domains work with different materials,
              constraints, responsibilities, and outcomes, while sharing the same
              need for evidence and sound judgment.
            </p>
            <p>
              Tools can accelerate parts of the work, but they do not replace the
              discipline of knowing what to change, why it should change, and how
              the outcome will be validated.
            </p>
            <p>
              Aredir exists to improve the conditions in which this work happens.
            </p>
          </div>
        </div>
      </SectionShell>

      {/* Our Principles */}
      <SectionShell
        id="principles"
        aria-labelledby="principles-heading"
        className="border-t border-grid-line bg-muted/25 dark:bg-muted/15"
      >
        <div className="mb-10 text-center sm:mb-12">
          <Eyebrow>Our Principles</Eyebrow>
          <h2
            id="principles-heading"
            className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            How we hold ourselves accountable
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Public-facing values that shape every engineering effort.
          </p>
        </div>
        <ol className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {ENGINEERING_PRINCIPLES.map((principle, index) => {
            const Icon = principle.icon;

            return (
              <li key={principle.id} className="border-t border-border pt-6">
                <div className="flex items-center justify-between gap-4">
                  <span className="font-mono text-xs text-[#F97316]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon className="size-5 text-muted-foreground" aria-hidden />
                </div>
                <h3 className="mt-5 font-heading text-base font-semibold tracking-tight text-foreground">
                  {principle.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {principle.description}
                </p>
              </li>
            );
          })}
        </ol>
      </SectionShell>

      {/* Why This Matters */}
      <SectionShell aria-labelledby="why-matters-heading">
        <RuneDivider className="mb-10 sm:mb-12" />
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>Why It Matters</Eyebrow>
          <h2
            id="why-matters-heading"
            className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Discipline that enables innovation
          </h2>
          <div className="mt-6 space-y-4 text-left text-muted-foreground leading-relaxed sm:text-center">
            <p>
              Engineering connects thoughtful intent to evidence of what changed.
              Without that discipline, activity can be mistaken for progress and
              completion for success.
            </p>
            <p>
              Discipline is not ceremony. It creates enough structure to make
              uncertainty visible, decisions accountable, and learning reusable.
            </p>
            <p>
              Aredir is being built around this universal process. We are starting
              from engineering practices validated through real software work,
              without treating software as the boundary of the idea.
            </p>
          </div>
        </div>
      </SectionShell>

      {/* How We Build */}
      <SectionShell
        id="how-we-build"
        aria-labelledby="how-we-build-heading"
        className="border-t border-grid-line bg-muted/25 dark:bg-muted/15"
      >
        <div className="mb-10 text-center sm:mb-12">
          <Eyebrow>How We Build</Eyebrow>
          <h2
            id="how-we-build-heading"
            className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            The engineering journey
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            A simple progression from uncertainty to compounding capability.
          </p>
        </div>
        <EosFlowDiagram steps={ENGINEERING_BUILD_STEPS} />
      </SectionShell>

      {/* Behind Every Project — public-safe summary only */}
      <SectionShell
        id="behind-every-project"
        aria-labelledby="behind-projects-heading"
      >
        <div className="mb-10 sm:mb-12">
          <Eyebrow>Behind Every Project</Eyebrow>
          <h2
            id="behind-projects-heading"
            className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            A common engineering foundation
          </h2>
          <div className="mt-4 max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
            <p>
              Every Aredir Labs project inherits a common engineering
              foundation.
            </p>
            <p>
              One part of that foundation defines the principles, governance,
              lifecycle, authority, and operational rules that guide the work.
            </p>
            <p>
              Aredir provides the working environment where people apply that
              guidance: exploring opportunities, making decisions, carrying out
              change, validating outcomes, and preserving what they learn. The
              shared method defines how engineering should work; the environment
              is where the work occurs.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {ENGINEERING_RESOURCE_LINKS.map((link) => (
            <EosExploreCard
              key={link.href}
              title={link.title}
              description={link.description}
              href={link.href}
            />
          ))}
        </div>
      </SectionShell>

      {/* Our Journey */}
      <SectionShell
        aria-labelledby="journey-heading"
        className="border-t border-grid-line pb-24 sm:pb-28"
      >
        <figure className="mx-auto max-w-3xl border-y border-border py-12 text-center sm:py-14">
          <Eyebrow>Our Journey</Eyebrow>
          <h2
            id="journey-heading"
            className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl"
          >
            Every project is another voyage
          </h2>
          <blockquote className="mt-6">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Every meaningful engineering effort begins at the edge of the
                known.
              </p>
              <p>
                We do not pretend certainty where none exists. We build systems
                that help people navigate uncertainty through evidence,
                transparency, and disciplined engineering.
              </p>
              <p>Our principles are the compass.</p>
              <p>Our knowledge is the chart.</p>
              <p>Our engineering is the vessel.</p>
            </div>
            <footer className="mt-8 font-mono text-sm uppercase tracking-[0.14em] text-[#F97316]">
              That is how we navigate.
            </footer>
          </blockquote>
        </figure>
      </SectionShell>
    </>
  );
}
