import { notFound } from "next/navigation";

import { FailureState } from "@/components/ui/failure-state";
import { EngineeringWorkOperatingModule } from "@/components/workspace/engineering-work-operating-module";
import {
  getEngineeringWorkFocusContext,
  getProjectEngineeringWorkById,
  getProjectEngineeringWorkHistory,
  getProjectEngineeringWorkRepositoryReferences,
} from "@/lib/workspace/queries";
import { getRelatedKnowledgeForEngineeringWork } from "@/lib/workspace/related-knowledge";
import { getProjectDefectContext } from "@/lib/workspace/defect-context";

export const dynamic = "force-dynamic";

type EngineeringWorkDetailPageProps = {
  params: Promise<{ slug: string; workId: string }>;
};

export default async function EngineeringWorkDetailPage({
  params,
}: EngineeringWorkDetailPageProps) {
  const { slug, workId } = await params;

  if (!slug?.trim() || !workId?.trim()) {
    notFound();
  }

  let work: Awaited<ReturnType<typeof getProjectEngineeringWorkById>> | null = null;
  let references: Awaited<ReturnType<typeof getProjectEngineeringWorkRepositoryReferences>> = [];
  let relatedKnowledge: Awaited<ReturnType<typeof getRelatedKnowledgeForEngineeringWork>> = [];
  let defectContext: Awaited<ReturnType<typeof getProjectDefectContext>> = null;
  let history: Awaited<ReturnType<typeof getProjectEngineeringWorkHistory>> = [];
  let focusContext: Awaited<ReturnType<typeof getEngineeringWorkFocusContext>> = null;
  let error: string | null = null;

  try {
    work = await getProjectEngineeringWorkById(slug, workId);
    if (work) {
      [references, relatedKnowledge, defectContext, history, focusContext] = await Promise.all([
        getProjectEngineeringWorkRepositoryReferences(work.projectSlug, work.id),
        getRelatedKnowledgeForEngineeringWork(work),
        work.workflow === "defect"
          ? getProjectDefectContext(work.projectSlug, work.id)
          : Promise.resolve(null),
        getProjectEngineeringWorkHistory(work.projectSlug, work.id),
        getEngineeringWorkFocusContext(work.projectSlug, work.id),
      ]);
    }
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to load Engineering Work";
  }

  if (error) {
    return (
      <div className="p-8">
        <FailureState
          title="Could not load Engineering Work"
          description="An unexpected error occurred while loading this Engineering Work. Please try again or contact support if the issue persists."
          failureClass="unknown"
        />
      </div>
    );
  }

  if (!work) {
    notFound();
  }

  return (
    <EngineeringWorkOperatingModule
      work={work}
      references={references}
      relatedKnowledge={relatedKnowledge}
      defectContext={defectContext}
      history={history}
      focusContext={focusContext}
    />
  );
}
