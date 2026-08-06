import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { EditEngineeringWorkForm } from "@/components/workspace/edit-engineering-work-form";
import { Eyebrow } from "@/components/eyebrow";
import { getProjectEngineeringWorkById } from "@/lib/workspace/queries";
import { getProjectDefectContext } from "@/lib/workspace/defect-context";

export const dynamic = "force-dynamic";

type EditEngineeringWorkPageProps = { params: Promise<{ slug: string; workId: string }> };

export default async function EditEngineeringWorkPage({ params }: EditEngineeringWorkPageProps) {
  const { slug, workId } = await params;
  if (!slug?.trim() || !workId?.trim()) notFound();
  const work = await getProjectEngineeringWorkById(slug, workId);
  if (!work) notFound();
  const detailPath = `/workspace/projects/${work.projectSlug}/engineering-work/${work.id}`;
  const defectContext = work.workflow === "defect"
    ? await getProjectDefectContext(work.projectSlug, work.id)
    : null;

  if (work.workflow === "defect" && !defectContext) notFound();

  return <div className="p-8"><Link href={detailPath} className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><ArrowLeft className="size-3.5" />Back to Engineering Work</Link><div className="max-w-3xl rounded-lg border border-border bg-card p-6"><Eyebrow>Engineering Work</Eyebrow><h1 className="mt-2 text-2xl font-semibold tracking-tight">Edit Engineering Work</h1><p className="mt-2 text-sm text-muted-foreground">Update {work.title} in {work.projectName}. Project scope comes from this route.</p><EditEngineeringWorkForm projectSlug={work.projectSlug} work={work} defectContext={defectContext} /></div></div>;
}
