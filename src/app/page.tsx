import Link from "next/link";

import { ProjectCard } from "@/components/project-card";
import { SectionShell } from "@/components/section-shell";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/site-config";

export default function HomePage() {
  return (
    <>
      <SectionShell className="border-b border-border/60 bg-gradient-to-b from-muted/40 to-background pt-20 sm:pt-24">
        <div className="mx-auto max-w-3xl text-center sm:text-left">
          <p className="mb-4 text-sm font-medium tracking-wide text-brand-accent uppercase">
            Independent software lab
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl sm:leading-[1.1]">
            Building focused software for real-world workflows.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Aredir Labs is an independent software lab creating practical SaaS
            tools across fitness, education, workflow automation, and operational
            systems.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-start">
            <Button asChild size="lg">
              <Link href="/projects">View Projects</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </SectionShell>

      <SectionShell id="projects" aria-labelledby="projects-heading">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2
              id="projects-heading"
              className="text-2xl font-semibold tracking-tight"
            >
              Projects
            </h2>
            <p className="mt-2 max-w-xl text-muted-foreground">
              Focused products in active development across fitness, education,
              and operations.
            </p>
          </div>
          <Link
            href="/projects"
            className="text-sm font-medium text-brand-accent underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          >
            View all projects
          </Link>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell
        id="about"
        className="border-y border-border/60 bg-muted/20"
        aria-labelledby="about-heading"
      >
        <div className="max-w-2xl">
          <h2
            id="about-heading"
            className="text-2xl font-semibold tracking-tight"
          >
            Founder-led, production-minded
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            We build software through disciplined iteration—validating ideas with
            real users, shipping incrementally, and keeping workflows practical
            from day one.
          </p>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              "Founder-led product development",
              "Practical software for real workflows",
              "Disciplined iteration and validation",
              "Production-minded engineering",
            ].map((item) => (
              <li key={item} className="flex gap-3 text-sm text-foreground">
                <span
                  className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-accent"
                  aria-hidden
                />
                {item}
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" className="mt-8">
            <Link href="/about">About Aredir Labs</Link>
          </Button>
        </div>
      </SectionShell>

      <SectionShell aria-labelledby="cta-heading">
        <div className="rounded-xl border border-border bg-card px-8 py-10 text-center sm:px-12 sm:text-left">
          <h2 id="cta-heading" className="text-2xl font-semibold tracking-tight">
            Interested in working together?
          </h2>
          <p className="mt-3 max-w-lg text-muted-foreground">
            Reach out for partnerships, product feedback, or general inquiries.
          </p>
          <Button asChild className="mt-6 bg-brand-accent text-white hover:bg-brand-accent/90">
            <Link href="/contact">Get in touch</Link>
          </Button>
        </div>
      </SectionShell>
    </>
  );
}
