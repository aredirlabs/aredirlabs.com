import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Eyebrow } from "@/components/eyebrow";
import {
  CorrectProposedEngineeringWorkForm,
  EngineeringWorkTransitionForm,
  OperateEngineeringWorkForm,
} from "@/components/workspace/engineering-work-lifecycle-forms";
import { getProjectDefectContext } from "@/lib/workspace/defect-context";
import { getProjectEngineeringWorkById } from "@/lib/workspace/queries";

export const dynamic = "force-dynamic";

type EditEngineeringWorkPageProps = {
  params: Promise<{ slug: string; workId: string }>;
};

export default async function EditEngineeringWorkPage({
  params,
}: EditEngineeringWorkPageProps) {
  const { slug, workId } = await params;
  if (!slug?.trim() || !workId?.trim()) notFound();

  const work = await getProjectEngineeringWorkById(slug, workId);
  if (!work) notFound();

  const detailPath = `/workspace/projects/${work.projectSlug}/engineering-work/${work.id}`;
  if (!["proposed", "active", "in_review"].includes(work.state)) redirect(detailPath);

  const defectContext = work.workflow === "defect"
    ? await getProjectDefectContext(work.projectSlug, work.id)
    : null;
  if (work.workflow === "defect" && !defectContext) notFound();

  const proposed = work.state === "proposed";

  return (
    <div className="p-8">
      <Link href={detailPath} className="mb-8 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"><ArrowLeft className="size-3.5" />Back to Engineering Work</Link>
      <div className="max-w-3xl rounded-lg border border-border bg-card p-6">
        <Eyebrow>Engineering Work</Eyebrow>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">{proposed ? "Correct Proposed Engineering Work" : "Operate Engineering Work"}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{proposed ? "Correct the proposal before activation." : "Record operational facts while preserving stable identity and intent."} Every accepted change appends immutable history.</p>
        {proposed
          ? <CorrectProposedEngineeringWorkForm projectSlug={work.projectSlug} work={work} defectContext={defectContext} />
          : <OperateEngineeringWorkForm projectSlug={work.projectSlug} work={work} defectContext={defectContext} />}
        <EngineeringWorkTransitionForm projectSlug={work.projectSlug} work={work} />
      </div>
    </div>
  );
}
