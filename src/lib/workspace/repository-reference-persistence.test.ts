import assert from "node:assert/strict";
import test from "node:test";

import {
  createEngineeringWorkRepositoryReferenceWithHistory,
  maintainEngineeringWorkRepositoryReferenceWithHistory,
  type CreateEngineeringWorkRepositoryReferenceWithHistoryInput,
  type EngineeringWorkSqlExecutor,
} from "./engineering-work-history-persistence";
import { authenticatedHumanEngineeringWorkActor, engineeringWorkDecisionProvenance } from "./engineering-work-provenance";
import {
  isReviewReferenceStatus,
  normalizeRepositoryReference,
} from "./repository-reference";

const human = authenticatedHumanEngineeringWorkActor({
  user: { id: "user-engineering-authority", name: "Engineering Authority" },
});

const humanProvenance = engineeringWorkDecisionProvenance({
  actionActor: human,
  decisionActor: human,
  decisionRole: "execution",
  decision: "Record the repository evidence.",
  rationale: "The validated artifact supports the Engineering Work.",
  decisionBasis: { summary: "Authenticated engineering judgment." },
  authority: { type: "human_owner" },
});

function captureSql(rows: Array<Record<string, unknown>>) {
  const calls: Array<{ query: string; params?: unknown[] }> = [];
  const sql: EngineeringWorkSqlExecutor = {
    async query(query, params) {
      calls.push({ query, params });
      return rows;
    },
  };
  return { sql, calls };
}

const createInput: CreateEngineeringWorkRepositoryReferenceWithHistoryInput = {
  engineeringWorkId: "work-1",
  projectSlug: "aredirlabs-com",
  expectedVersion: 3,
  repositoryReferenceId: "ref-1",
  historyEventId: "history-ref-1",
  repositoryRevisionId: "revision-ref-1",
  repository: "aredirlabs-com/engineering",
  sourceLocation: "docs/engineering/evidence/finding-1.md",
  artifactClass: "finding",
  artifactIdentifier: "finding-1",
  branch: "main",
  commitHash: "abc123",
  note: "Validated finding.",
  provenance: humanProvenance,
};

test("create links repository evidence in one atomic CTE statement", async () => {
  const { sql, calls } = captureSql([
    {
      engineering_work_id: "work-1",
      version: 4,
      history_event_id: "history-ref-1",
      repository_reference_id: "ref-1",
      repository_revision_id: "revision-ref-1",
      duplicate: 0,
      reference_count: 1,
    },
  ]);

  const result = await createEngineeringWorkRepositoryReferenceWithHistory(sql, createInput);

  assert.equal(calls.length, 1);
  assert.match(calls[0].query, /^WITH current_work/);
  assert.match(calls[0].query, /INSERT INTO workspace_engineering_work_repository_references/);
  assert.match(calls[0].query, /ON CONFLICT \(engineering_work_id, repository, source_location\) DO NOTHING/);
  assert.match(calls[0].query, /'repository_authoritative'/);
  assert.match(calls[0].query, /'expected'/);
  assert.match(calls[0].query, /INSERT INTO workspace_engineering_work_history/);
  assert.match(calls[0].query, /repository_reference_added/);
  assert.match(calls[0].query, /INSERT INTO workspace_engineering_work_repo_revisions/);
  assert.match(calls[0].query, /'\{\}'::jsonb/);
  assert.equal(calls[0].params?.[3], "ref-1");
  assert.equal(calls[0].params?.[4], "aredirlabs-com/engineering");
  assert.equal(calls[0].params?.[6], "finding");
  assert.equal(calls[0].params?.[11], "history-ref-1");
  assert.deepEqual(result, {
    ok: true,
    engineeringWorkId: "work-1",
    version: 4,
    historyEventId: "history-ref-1",
    repositoryReferenceId: "ref-1",
    repositoryRevisionId: "revision-ref-1",
  });
});

test("create rejects a duplicate identity without history or version bump", async () => {
  const { sql, calls } = captureSql([
    {
      engineering_work_id: "work-1",
      version: 3,
      history_event_id: null,
      repository_reference_id: null,
      repository_revision_id: null,
      duplicate: 1,
      reference_count: 1,
    },
  ]);

  const result = await createEngineeringWorkRepositoryReferenceWithHistory(sql, createInput);

  assert.equal(calls.length, 1);
  assert.deepEqual(result, { ok: false, reason: "duplicate" });
});

test("create on a stale or missing projection reports not_found_or_stale", async () => {
  const { sql, calls } = captureSql([]);
  const result = await createEngineeringWorkRepositoryReferenceWithHistory(sql, createInput);
  assert.equal(calls.length, 1);
  assert.deepEqual(result, { ok: false, reason: "not_found_or_stale" });
});

test("create with a locked-out parent state reports not_found_or_stale via reference_count", async () => {
  const { sql } = captureSql([
    {
      engineering_work_id: "work-1",
      version: 3,
      history_event_id: null,
      repository_reference_id: null,
      repository_revision_id: null,
      duplicate: 0,
      reference_count: 0,
    },
  ]);
  const result = await createEngineeringWorkRepositoryReferenceWithHistory(sql, createInput);
  assert.deepEqual(result, { ok: false, reason: "not_found_or_stale" });
});

test("maintain records an update with immutable previous and resulting snapshots", async () => {
  const { sql, calls } = captureSql([
    {
      engineering_work_id: "work-1",
      version: 5,
      history_event_id: "history-ref-update",
      repository_reference_id: "ref-1",
      repository_revision_id: "revision-ref-update",
      review_denied: 0,
      reference_count: 1,
    },
  ]);

  const result = await maintainEngineeringWorkRepositoryReferenceWithHistory(sql, {
    engineeringWorkId: "work-1",
    projectSlug: "aredirlabs-com",
    expectedVersion: 4,
    repositoryReferenceId: "ref-1",
    historyEventId: "history-ref-update",
    repositoryRevisionId: "revision-ref-update",
    artifactClass: "finding",
    artifactIdentifier: "finding-1",
    branch: "main",
    commitHash: "def456",
    referenceStatus: "verified",
    note: "Updated after validation.",
    decisionBasisSummary: "Independent review accepted the artifact.",
    provenance: humanProvenance,
  });

  assert.equal(calls.length, 1);
  assert.match(calls[0].query, /repository_reference_updated/);
  assert.match(calls[0].query, /AND btrim\(coalesce\(\$28, ''\)\) = ''/);
  assert.match(calls[0].query, /last_reviewed_at = CASE/);
  assert.match(calls[0].query, /INSERT INTO workspace_engineering_work_repo_revisions/);
  assert.match(calls[0].query, /jsonb_build_object\([\s\S]*'repository', previous\.repository/);
  assert.equal(calls[0].params?.[8], "verified");
  assert.equal(calls[0].params?.[26], "revision-ref-update");
  assert.equal(calls[0].params?.[27], "Independent review accepted the artifact.");
  assert.deepEqual(result, {
    ok: true,
    engineeringWorkId: "work-1",
    version: 5,
    historyEventId: "history-ref-update",
    repositoryReferenceId: "ref-1",
    repositoryRevisionId: "revision-ref-update",
  });
});

test("maintain enforces a decision basis for status changes into review statuses", async () => {
  const { sql, calls } = captureSql([
    {
      engineering_work_id: "work-1",
      version: 4,
      history_event_id: null,
      repository_reference_id: null,
      repository_revision_id: null,
      review_denied: 1,
      reference_count: 1,
    },
  ]);

  const result = await maintainEngineeringWorkRepositoryReferenceWithHistory(sql, {
    engineeringWorkId: "work-1",
    projectSlug: "aredirlabs-com",
    expectedVersion: 4,
    repositoryReferenceId: "ref-1",
    historyEventId: "history-ref-gate",
    repositoryRevisionId: "revision-ref-gate",
    artifactClass: "finding",
    referenceStatus: "stale",
    decisionBasisSummary: null,
    provenance: humanProvenance,
  });

  assert.equal(calls.length, 1);
  assert.match(calls[0].query, /review_gate/);
  assert.deepEqual(result, { ok: false, reason: "review_required" });
});

test("maintain rejects a semantic no-op without history or version bump", async () => {
  const { sql, calls } = captureSql([
    {
      engineering_work_id: "work-1",
      version: 4,
      history_event_id: null,
      repository_reference_id: null,
      repository_revision_id: null,
      review_denied: 0,
      reference_count: 1,
    },
  ]);

  const result = await maintainEngineeringWorkRepositoryReferenceWithHistory(sql, {
    engineeringWorkId: "work-1",
    projectSlug: "aredirlabs-com",
    expectedVersion: 4,
    repositoryReferenceId: "ref-1",
    historyEventId: "history-ref-noop",
    repositoryRevisionId: "revision-ref-noop",
    artifactClass: "finding",
    artifactIdentifier: "finding-1",
    referenceStatus: "expected",
    provenance: humanProvenance,
  });

  assert.equal(calls.length, 1);
  assert.match(calls[0].query, /reference\.reference_status IS DISTINCT FROM \$9/);
  assert.deepEqual(result, { ok: false, reason: "noop" });
});

test("maintain on a stale or missing projection reports not_found_or_stale", async () => {
  const { sql } = captureSql([]);
  const result = await maintainEngineeringWorkRepositoryReferenceWithHistory(sql, {
    engineeringWorkId: "work-1",
    projectSlug: "aredirlabs-com",
    expectedVersion: 99,
    repositoryReferenceId: "ref-missing",
    historyEventId: "history-ref-stale",
    repositoryRevisionId: "revision-ref-stale",
    artifactClass: "finding",
    referenceStatus: "expected",
    provenance: humanProvenance,
  });
  assert.deepEqual(result, { ok: false, reason: "not_found_or_stale" });
});

test("repository reference normalization trims and requires identity fields", () => {
  const normalized = normalizeRepositoryReference({
    repository: "  aredirlabs-com/engineering  ",
    sourceLocation: "  docs/engineering/evidence/finding-1.md  ",
    artifactClass: "verification_evidence",
    artifactIdentifier: "  verification-run-42  ",
    branch: "  ",
    commitHash: "",
    note: "  ",
  });
  assert.deepEqual(normalized, {
    repository: "aredirlabs-com/engineering",
    sourceLocation: "docs/engineering/evidence/finding-1.md",
    artifactClass: "verification_evidence",
    artifactIdentifier: "verification-run-42",
    branch: null,
    commitHash: null,
    note: null,
  });
});

test("repository reference normalization rejects unsupported artifact classes", () => {
  assert.throws(
    () =>
      normalizeRepositoryReference({
        repository: "acme/repo",
        sourceLocation: "path/to/artifact",
        artifactClass: "unsupported",
      }),
    /supported repository artifact class/,
  );
});

test("review reference status detection is explicit", () => {
  assert.equal(isReviewReferenceStatus("verified"), true);
  assert.equal(isReviewReferenceStatus("stale"), true);
  assert.equal(isReviewReferenceStatus("missing"), true);
  assert.equal(isReviewReferenceStatus("expected"), false);
});