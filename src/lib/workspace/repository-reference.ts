import type { EngineeringWorkReferenceStatus } from "./engineering-work";

export const ENGINEERING_WORK_REPOSITORY_ARTIFACT_CLASSES = [
  "implementation_package",
  "finding",
  "verification_evidence",
  "decision_adr",
  "mission",
  "repository_document",
  "review",
  "release_record",
  "promotion_candidate",
  "knowledge_asset_source",
] as const;

export type EngineeringWorkRepositoryArtifactClass =
  (typeof ENGINEERING_WORK_REPOSITORY_ARTIFACT_CLASSES)[number];

export const ENGINEERING_WORK_REPOSITORY_ARTIFACT_CLASS_LABELS: Record<
  EngineeringWorkRepositoryArtifactClass,
  string
> = {
  implementation_package: "Implementation / Discovery / Architecture / Scope package",
  finding: "Finding",
  verification_evidence: "Verification evidence",
  decision_adr: "Decision / ADR",
  mission: "Mission",
  repository_document: "Repository document",
  review: "Review",
  release_record: "Release record",
  promotion_candidate: "Promotion candidate",
  knowledge_asset_source: "Knowledge asset source",
};

export function isEngineeringWorkRepositoryArtifactClass(
  value: string,
): value is EngineeringWorkRepositoryArtifactClass {
  return ENGINEERING_WORK_REPOSITORY_ARTIFACT_CLASSES.includes(
    value as EngineeringWorkRepositoryArtifactClass,
  );
}

/** Baseline repository references are citations to repository-authoritative artifacts. */
export const ENGINEERING_WORK_REPOSITORY_AUTHORITY = "repository_authoritative" as const;

const MAX_REPOSITORY_LENGTH = 500;
const MAX_SOURCE_LOCATION_LENGTH = 2_000;
const MAX_ARTIFACT_IDENTIFIER_LENGTH = 500;
const MAX_BRANCH_LENGTH = 200;
const MAX_COMMIT_LENGTH = 200;
const MAX_NOTE_LENGTH = 4_000;

export type RepositoryReferenceInput = {
  repository: string;
  sourceLocation: string;
  artifactClass: string;
  artifactIdentifier?: string | null;
  branch?: string | null;
  commitHash?: string | null;
  note?: string | null;
};

export type NormalizedRepositoryReferenceInput = {
  repository: string;
  sourceLocation: string;
  artifactClass: EngineeringWorkRepositoryArtifactClass;
  artifactIdentifier: string | null;
  branch: string | null;
  commitHash: string | null;
  note: string | null;
};

function requiredText(value: string, label: string, maxLength: number) {
  const normalized = value.trim();
  if (!normalized) throw new Error(`${label} is required.`);
  if (normalized.length > maxLength) {
    throw new Error(`${label} must be ${maxLength.toLocaleString()} characters or fewer.`);
  }
  return normalized;
}

function optionalText(value: string | null | undefined, maxLength: number) {
  if (value == null) return null;
  const normalized = value.trim();
  if (!normalized) return null;
  if (normalized.length > maxLength) {
    throw new Error(`Optional reference text must be ${maxLength.toLocaleString()} characters or fewer.`);
  }
  return normalized;
}

/**
 * Normalizes an incoming repository reference citation. Identity fields
 * (repository and source location) are required and stable; everything else is
 * read-only metadata recorded beside the authoritative artifact.
 */
export function normalizeRepositoryReference(
  input: RepositoryReferenceInput,
): NormalizedRepositoryReferenceInput {
  if (!isEngineeringWorkRepositoryArtifactClass(input.artifactClass)) {
    throw new Error("Select a supported repository artifact class.");
  }
  return {
    repository: requiredText(
      input.repository,
      "Repository",
      MAX_REPOSITORY_LENGTH,
    ),
    sourceLocation: requiredText(
      input.sourceLocation,
      "Source location",
      MAX_SOURCE_LOCATION_LENGTH,
    ),
    artifactClass: input.artifactClass,
    artifactIdentifier: optionalText(
      input.artifactIdentifier,
      MAX_ARTIFACT_IDENTIFIER_LENGTH,
    ),
    branch: optionalText(input.branch, MAX_BRANCH_LENGTH),
    commitHash: optionalText(input.commitHash, MAX_COMMIT_LENGTH),
    note: optionalText(input.note, MAX_NOTE_LENGTH),
  };
}

/** Normalizes maintainable reference metadata for an existing reference. */
export function normalizeRepositoryReferenceUpdate(input: {
  artifactClass: string;
  artifactIdentifier?: string | null;
  branch?: string | null;
  commitHash?: string | null;
  note?: string | null;
}) {
  if (!isEngineeringWorkRepositoryArtifactClass(input.artifactClass)) {
    throw new Error("Select a supported repository artifact class.");
  }
  return {
    artifactClass: input.artifactClass,
    artifactIdentifier: optionalText(
      input.artifactIdentifier,
      MAX_ARTIFACT_IDENTIFIER_LENGTH,
    ),
    branch: optionalText(input.branch, MAX_BRANCH_LENGTH),
    commitHash: optionalText(input.commitHash, MAX_COMMIT_LENGTH),
    note: optionalText(input.note, MAX_NOTE_LENGTH),
  };
}

export function isReviewReferenceStatus(status: EngineeringWorkReferenceStatus) {
  return status === "verified" || status === "stale" || status === "missing";
}