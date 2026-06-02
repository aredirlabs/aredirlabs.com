import type { Metadata } from "next";

import { BentoGrid } from "@/components/bento-grid";
import { Eyebrow } from "@/components/eyebrow";
import { ProjectCard } from "@/components/project-card";
import { SectionShell } from "@/components/section-shell";
import { pageMetadata } from "@/lib/metadata";
import { projects } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "AlignFit, ClassForge, LeagueOS, and future AI-powered SaaS products from Aredir Labs.",
});

export default function ProjectsPage() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-grid-line">
        <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <SectionShell className="relative pt-16">
          <div className="max-w-2xl">
            <Eyebrow>Portfolio</Eyebrow>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Projects
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              AI-powered SaaS products across fitness, education, and
              operational systems—built with disciplined iteration and
              production-minded workflows.
            </p>
          </div>
        </SectionShell>
      </section>

      <SectionShell>
        <BentoGrid>
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </BentoGrid>
      </SectionShell>
    </>
  );
}
