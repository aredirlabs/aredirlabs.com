import { and, eq } from "drizzle-orm";

import {
  formatKnowledgeAssetDate,
  getKnowledgeAssetById,
  getKnowledgeAssetCanonicalPath,
} from "@/lib/knowledge-assets/registry";
import { getDb } from "@/lib/db";
import { workspaceProjectDocuments } from "@/lib/db/schema";
import {
  getWorkspaceProjectDocumentCategoryLabel,
  type WorkspaceProjectDocumentCategory,
} from "@/lib/workspace/document-categories";
import { formatTimestamp } from "@/lib/workspace/format-date";

type RelatedKnowledgeSource =
  | {
      source: "project_document";
      documentId: string;
      description: string;
    }
  | {
      source: "knowledge_asset";
      assetId: string;
      description: string;
    };

/**
 * A deliberately narrow validation mapping for KNOWLEDGE-001. It uses stable
 * record identifiers and is not a relationship inference mechanism.
 */
const RELATED_KNOWLEDGE_BY_ENGINEERING_WORK: Record<
  string,
  RelatedKnowledgeSource[]
> = {
  eng_work_alignfit_hydration_operational_state: [
    {
      source: "project_document",
      documentId: "doc_alignfit_architecture_platform_overview",
      description:
        "Sets the documented AlignFit platform boundary and the architecture patterns this work must remain compatible with.",
    },
    {
      source: "knowledge_asset",
      assetId: "evidence-lifecycle-pattern",
      description:
        "Guides the requested confirmation of governing evidence before a bounded architecture outcome is defined.",
    },
  ],
};

export type RelatedKnowledgeItem = {
  id: string;
  title: string;
  knowledgeClass: string;
  description: string;
  projectContext: string;
  authorityLocation: string;
  lastReviewed: string;
  href: string;
};

type EngineeringWorkKnowledgeContext = {
  id: string;
  projectId: string;
  projectName: string;
  projectSlug: string;
};

export async function getRelatedKnowledgeForEngineeringWork({
  id: engineeringWorkId,
  projectId,
  projectName,
  projectSlug,
}: EngineeringWorkKnowledgeContext): Promise<RelatedKnowledgeItem[]> {
  const sources = RELATED_KNOWLEDGE_BY_ENGINEERING_WORK[engineeringWorkId] ?? [];
  const relatedKnowledge: RelatedKnowledgeItem[] = [];

  for (const source of sources) {
    if (source.source === "project_document") {
      const db = getDb();
      const documents = await db
        .select({
          id: workspaceProjectDocuments.id,
          title: workspaceProjectDocuments.title,
          category: workspaceProjectDocuments.category,
          slug: workspaceProjectDocuments.slug,
          updatedAt: workspaceProjectDocuments.updatedAt,
        })
        .from(workspaceProjectDocuments)
        .where(
          and(
            eq(workspaceProjectDocuments.id, source.documentId),
            eq(workspaceProjectDocuments.projectId, projectId),
          ),
        )
        .limit(1);
      const document = documents[0];

      if (document) {
        relatedKnowledge.push({
          id: `project-document:${document.id}`,
          title: document.title,
          knowledgeClass: getWorkspaceProjectDocumentCategoryLabel(
            document.category as WorkspaceProjectDocumentCategory,
          ),
          description: source.description,
          projectContext: projectName,
          authorityLocation: "Workspace document",
          lastReviewed: formatTimestamp(document.updatedAt),
          href: `/workspace/projects/${projectSlug}/documents/${document.slug}`,
        });
      }

      continue;
    }

    const asset = getKnowledgeAssetById(source.assetId);
    if (asset && asset.linkedProjects.includes(projectName)) {
      relatedKnowledge.push({
        id: `knowledge-asset:${asset.id}`,
        title: asset.title,
        knowledgeClass: "Knowledge asset",
        description: source.description,
        projectContext: projectName,
        authorityLocation: `Knowledge Base markdown · ${getKnowledgeAssetCanonicalPath(asset.path)}`,
        lastReviewed: formatKnowledgeAssetDate(asset.lastReviewed),
        href: `/workspace/knowledge-assets/${asset.id}`,
      });
    }
  }

  return relatedKnowledge;
}
