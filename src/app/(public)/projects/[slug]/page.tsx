import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Eyebrow } from "@/components/eyebrow";
import { PublicPageHero } from "@/components/public-page-hero";
import { SectionShell } from "@/components/section-shell";
import { StatusChip } from "@/components/status-chip";
import { Button } from "@/components/ui/button";
import { pageMetadata } from "@/lib/metadata";
import { getProject, projects } from "@/lib/site-config";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return pageMetadata({ title: "Project", description: "Project not found." });
  }

  return pageMetadata({
    title: project.name,
    description: project.description,
  });
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <PublicPageHero
        eyebrow="Project"
        eyebrowAdornment={<StatusChip status={project.status} />}
        title={project.name}
        description={<p>{project.description}</p>}
      />

      <SectionShell>
        <div className="max-w-2xl border-y border-border py-10 sm:py-12">
          <Eyebrow>Overview</Eyebrow>
          <div className="mt-4 space-y-6 text-muted-foreground leading-relaxed">
            {project.summary ? <p>{project.summary}</p> : null}
            <p>
              This page is a portfolio overview. Public product sites and sign-up
              flows will be linked here when available.
            </p>
          </div>
        </div>
        <Button
          asChild
          variant="outline"
          className="mt-10 font-mono text-xs uppercase tracking-[0.1em]"
        >
          <Link href="/projects">← All projects</Link>
        </Button>
      </SectionShell>
    </>
  );
}
