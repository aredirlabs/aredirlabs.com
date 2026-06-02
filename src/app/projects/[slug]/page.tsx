import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Eyebrow } from "@/components/eyebrow";
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
      <section className="relative overflow-hidden border-b border-grid-line">
        <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-50" aria-hidden />
        <SectionShell className="relative pt-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3">
              <Eyebrow>Project</Eyebrow>
              <StatusChip status={project.status} />
            </div>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {project.name}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>
        </SectionShell>
      </section>

      <SectionShell>
        <div className="relative max-w-2xl overflow-hidden rounded-lg border border-border bg-card p-8">
          <span
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            aria-hidden
          />
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
