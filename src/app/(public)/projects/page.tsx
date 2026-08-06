import type { Metadata } from "next";

import { BentoGrid } from "@/components/bento-grid";
import { ProjectCard } from "@/components/project-card";
import { PublicPageHero } from "@/components/public-page-hero";
import { SectionShell } from "@/components/section-shell";
import { pageMetadata } from "@/lib/metadata";
import { projects } from "@/lib/site-config";

export const metadata: Metadata = pageMetadata({
  title: "Projects",
  description:
    "Current Aredir Labs software projects: AlignFit, ClassForge, and LeagueOS.",
});

export default function ProjectsPage() {
  return (
    <>
      <PublicPageHero
        eyebrow="Portfolio"
        title="Projects"
        description={
          <p>
            Current software products across fitness, education, and operational
            systems. This is where we apply and validate our engineering practice
            today.
          </p>
        }
      />

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
