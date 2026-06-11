import type { Metadata } from "next";
import Link from "next/link";

import { Eyebrow } from "@/components/eyebrow";
import { RuneDivider } from "@/components/rune-divider";
import { SectionShell } from "@/components/section-shell";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Aredir Labs is a founder-led software lab building AI-powered SaaS products through disciplined iteration.",
});

const SECTIONS = [
  {
    label: "Mission",
    heading: "Why we build",
    body: "Aredir Labs creates software that empowers people to improve outcomes, make better decisions, and achieve meaningful progress through technology. We focus on AI-powered SaaS applications, quality engineering, and modern product development.",
  },
  {
    label: "Approach",
    heading: "Founder-led, production-minded",
    body: "Products are shaped directly by founders and builders who stay close to users. Decisions favor shipping, learning, and iteration over bureaucracy—calm, capable, and accountable to outcomes.",
  },
  {
    label: "Philosophy",
    heading: "Focused products, done well",
    body: "We build focused products, not platforms for their own sake. Each tool should do a clear job well, integrate sensibly with real workflows, and earn trust through consistent execution.",
  },
  {
    label: "Validation",
    heading: "Iterative and honest",
    body: "Ideas are tested early with real users and production-minded workflows. We validate assumptions, refine scope, and ship incrementally—reducing risk while improving fit over time.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-grid-line">
        <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <SectionShell className="relative pt-16">
          <div className="max-w-2xl">
            <Eyebrow>About the Lab</Eyebrow>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              About Aredir Labs
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              An independent software lab building AI-powered SaaS products for
              real-world workflows. Named for an old word for a noble
              craftsman—a workshop where careful engineering meets a little myth.
            </p>
          </div>
        </SectionShell>
      </section>

      <SectionShell>
        <div className="grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {SECTIONS.map((section) => (
            <div key={section.label} className="max-w-md">
              <Eyebrow>{section.label}</Eyebrow>
              <h2 className="mt-3 text-xl font-semibold text-foreground">
                {section.heading}
              </h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                {section.body}
              </p>
            </div>
          ))}
        </div>
        <RuneDivider className="mt-16" />
      </SectionShell>

      <SectionShell className="border-t border-grid-line bg-card/40">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">
            See what we are building across the portfolio.
          </p>
          <Button
            asChild
            variant="outline"
            className="font-mono text-xs uppercase tracking-[0.1em]"
          >
            <Link href="/projects">View projects</Link>
          </Button>
        </div>
      </SectionShell>
    </>
  );
}
