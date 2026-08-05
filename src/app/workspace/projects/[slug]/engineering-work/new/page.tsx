import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { eq } from "drizzle-orm";

import { CreateEngineeringWorkForm } from "@/components/workspace/create-engineering-work-form";
import { Eyebrow } from "@/components/eyebrow";
import { getDb } from "@/lib/db";
import { workspaceProjects } from "@/lib/db/schema";

export const dynamic = "force-dynamic";

type NewEngineeringWorkPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function NewEngineeringWorkPage({
  params,
}: NewEngineeringWorkPageProps) {
  const { slug } = await params;

  if (!slug?.trim()) {
    notFound();
  }

  const db = getDb();
  const [project] = await db
    .select({ name: workspaceProjects.name, slug: workspaceProjects.slug })
    .from(workspaceProjects)
    .where(eq(workspaceProjects.slug, slug))
    .limit(1);

  if (!project) {
    notFound();
  }

  return (
    <div className="p-8">
      <Link href={`/workspace/projects/${project.slug}`} className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <ArrowLeft className="size-3.5" />
        Back to project · {project.name}
      </Link>

      <div className="max-w-3xl rounded-lg border border-border bg-card p-6">
        <Eyebrow>Engineering Work</Eyebrow>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">New Engineering Work</h1>
        <p className="mt-2 text-sm text-muted-foreground">Create a read-only operational record for {project.name}. Project scope comes from this route.</p>
        <CreateEngineeringWorkForm projectSlug={project.slug} />
      </div>
    </div>
  );
}
