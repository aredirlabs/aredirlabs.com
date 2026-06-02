import type { Metadata } from "next";

import { ProjectCard } from "@/components/project-card";
import { SectionShell } from "@/components/section-shell";
import { pageMetadata } from "@/lib/metadata";
import { projects } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "AlignFit, ClassForge, LeagueOS, and future focused SaaS products from Aredir Labs.",
});

export default function ProjectsPage() {
  return (
    <>
      <SectionShell className="border-b border-border/60 pt-12">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Projects
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Focused SaaS products across fitness, education, and operational
            systems—built with disciplined iteration and production-minded
            workflows.
          </p>
        </div>
      </SectionShell>

      <SectionShell>
        <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.slug}>
              <ProjectCard project={project} />
            </li>
          ))}
        </ul>
      </SectionShell>
    </>
  );
}
