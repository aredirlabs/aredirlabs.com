import type { Metadata } from "next";
import Link from "next/link";

import { SectionShell } from "@/components/section-shell";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Aredir Labs is a founder-led software lab building practical SaaS products through disciplined iteration.",
});

export default function AboutPage() {
  return (
    <>
      <SectionShell className="border-b border-border/60 pt-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            About Aredir Labs
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            An independent software lab building focused SaaS products for
            real-world workflows.
          </p>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="max-w-2xl">
          <h2 className="text-xl font-semibold text-foreground">Mission</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Aredir Labs exists to ship practical software—tools that respect how
            people actually work, without unnecessary complexity or hype. We focus
            on fitness, education, workflow automation, and operational systems
            where clarity and reliability matter.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-foreground">
            Founder-led approach
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Products are shaped directly by founders and builders who stay close to
            users. Decisions favor shipping, learning, and iteration over
            bureaucracy—calm, capable, and accountable to outcomes.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-foreground">
            Product philosophy
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            We build focused products, not platforms for their own sake. Each tool
            should do a clear job well, integrate sensibly with real workflows, and
            earn trust through consistent execution.
          </p>

          <h2 className="mt-10 text-xl font-semibold text-foreground">
            Iterative validation
          </h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Ideas are tested early with real users and production-minded workflows.
            We validate assumptions, refine scope, and ship incrementally—reducing
            risk while improving fit over time.
          </p>
        </div>
      </SectionShell>

      <SectionShell className="border-t border-border/60 bg-muted/20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">
            See what we are building across the portfolio.
          </p>
          <Button asChild variant="outline">
            <Link href="/projects">View projects</Link>
          </Button>
        </div>
      </SectionShell>
    </>
  );
}
