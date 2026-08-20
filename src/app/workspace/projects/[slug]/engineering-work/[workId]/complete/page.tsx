import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Eyebrow } from "@/components/eyebrow";
import { CompleteEngineeringWorkForm } from "@/components/workspace/engineering-work-lifecycle-forms";
import { getProjectEngineeringWorkById } from "@/lib/workspace/queries";

export const dynamic = "force-dynamic";

type CompleteEngineeringWorkPageProps = {
  params: Promise<{ slug: string; workId: string }>;
};

export default async function CompleteEngineeringWorkPage({
  params,
}: CompleteEngineeringWorkPageProps) {
  const { slug, workId } = await params;
  if (!slug?.trim() || !workId?.trim()) notFound();

  const work = await getProjectEngineeringWorkById(slug, workId);
  if (!work) notFound();

  const detailPath = `/workspace/projects/${work.projectSlug}/engineering-work/${work.id}`;
  if (!["active", "in_review"].includes(work.state)) redirect(detailPath);

  return (
    <div className="p-8">
      <Link href={detailPath} className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><ArrowLeft className="size-3.5" />Back to Engineering Work</Link>
      <div className="max-w-3xl rounded-lg border border-border bg-card p-6">
        <Eyebrow>Engineering Work Completion</Eyebrow>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Complete Engineering Work</h1>
        <p className="mt-2 text-sm text-muted-foreground">Record the verified result and authorization decision for {work.title}. Completion atomically updates the projection and appends the lifecycle event.</p>
        <CompleteEngineeringWorkForm projectSlug={work.projectSlug} work={work} />
      </div>
    </div>
  );
}
