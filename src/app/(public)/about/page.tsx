import type { Metadata } from "next";
import Link from "next/link";

import { Eyebrow } from "@/components/eyebrow";
import { PublicPageHero } from "@/components/public-page-hero";
import { RuneDivider } from "@/components/rune-divider";
import { SectionShell } from "@/components/section-shell";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Aredir Labs is building the operational environment in which engineering occurs.",
});

const SECTIONS = [
  {
    label: "Mission",
    heading: "Why Aredir exists",
    body: "Aredir exists to provide the operational environment in which engineering occurs. The tools we create support that purpose; they are not the purpose themselves.",
  },
  {
    label: "Engineering",
    heading: "A discipline, not a domain",
    body: "Engineering is the disciplined process of transforming ideas, problems, and opportunities into validated outcomes through evidence, design, implementation, and continuous improvement.",
  },
  {
    label: "Process",
    heading: "From uncertainty to outcomes",
    body: "Engineering means discovering opportunities, understanding problems, designing solutions, evaluating tradeoffs, implementing change, validating outcomes, and learning continuously. Software engineering is one expression of this broader process.",
  },
  {
    label: "Direction",
    heading: "One process, many outcomes",
    body: "Different domains engineer different outcomes, but the underlying discipline is shared. Aredir is being built around that universal process, beginning with the engineering work we know and can validate today.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PublicPageHero
        eyebrow="About the Lab"
        title="About Aredir Labs"
        description={
          <p>
            An independent lab building a coherent environment for meaningful
            engineering work. Named for an old word for a noble craftsman—a
            workshop where disciplined practice meets a little myth.
          </p>
        }
      />

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

      <SectionShell className="border-t border-grid-line bg-muted/25 dark:bg-muted/15">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">
            See what we are building across the portfolio.
          </p>
          <Button
            asChild
            className="bg-[#F97316] font-mono text-xs uppercase tracking-[0.1em] text-white hover:bg-[#F97316]/90"
          >
            <Link href="/projects">View projects</Link>
          </Button>
        </div>
      </SectionShell>
    </>
  );
}
