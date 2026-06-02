import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionShell } from "@/components/section-shell";
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
      <SectionShell className="border-b border-border/60 pt-12">
        <div className="max-w-2xl">
          <p className="text-sm font-medium text-brand-accent">{project.status}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {project.name}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>
      </SectionShell>

      <SectionShell>
        <div className="max-w-2xl space-y-6 text-muted-foreground leading-relaxed">
          {project.summary ? <p>{project.summary}</p> : null}
          <p>
            This product page is a portfolio overview. Public product sites and
            sign-up flows will be linked here when available.
          </p>
        </div>
        <Button asChild variant="outline" className="mt-10">
          <Link href="/projects">← All projects</Link>
        </Button>
      </SectionShell>
    </>
  );
}
