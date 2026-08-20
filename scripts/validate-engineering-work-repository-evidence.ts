import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";

import { neon } from "@neondatabase/serverless";

import {
  createEngineeringWorkRepositoryReferenceWithHistory,
  maintainEngineeringWorkRepositoryReferenceWithHistory,
  type EngineeringWorkSqlExecutor,
} from "../src/lib/workspace/engineering-work-history-persistence";
import { authenticatedHumanEngineeringWorkActor, engineeringWorkDecisionProvenance } from "../src/lib/workspace/engineering-work-provenance";

const EXPECTED_DEV_ENDPOINT = "ep-green-sunset-a6w06qwf";
const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) throw new Error("DATABASE_URL is required.");

const hostname = new URL(databaseUrl).hostname;
if (!hostname.startsWith(EXPECTED_DEV_ENDPOINT)) {
  throw new Error(`Refusing repository evidence validation against unapproved host: ${hostname}`);
}

const sql = neon(databaseUrl);

/**
 * The persistence functions each emit a single atomic statement. Capturing the
 * exact production SQL and replaying it inside one HTTP batch transaction lets
 * the real statements execute against Postgres while a final failing statement
 * forces the whole batch to roll back.
 */
function captureStatements() {
  const statements: Array<{ query: string; params?: unknown[] }> = [];
  const executor: EngineeringWorkSqlExecutor = {
    async query(query, params) {
      statements.push({ query, params });
      return [];
    },
  };
  return { executor, statements };
}

async function main() {
  const [identity] = await sql.query(`
    SELECT current_database() AS database_name,
           current_setting('neon.project_id', true) AS project_id,
           current_setting('neon.branch_id', true) AS branch_id
  `);
  assert.equal(identity.database_name, "neondb");
  assert.equal(identity.project_id, "plain-band-91202732");
  assert.equal(identity.branch_id, "br-wandering-snow-a60tz3pl");

  const [baseline] = await sql.query(`
    SELECT
      (SELECT count(*)::int FROM workspace_engineering_work_repository_references) AS references,
      (SELECT count(*)::int FROM workspace_engineering_work_repo_revisions) AS revisions,
      (SELECT count(*)::int FROM workspace_engineering_work_history) AS history_events,
      (SELECT count(*)::int FROM drizzle.__drizzle_migrations) AS migrations,
      (SELECT count(*)::int FROM workspace_engineering_work_repository_references
        WHERE reference_status IN ('verified', 'stale', 'missing')
          AND last_reviewed_at IS NULL) AS review_statuses_without_timestamp,
      (SELECT count(*)::int FROM workspace_engineering_work_repository_references
        WHERE authority <> 'repository_authoritative') AS non_authoritative
  `);
  assert.equal(baseline.review_statuses_without_timestamp, 0);
  assert.equal(baseline.non_authoritative, 0);
  assert.ok(baseline.migrations >= 7);

  const [schemaObjects] = await sql.query(`
    SELECT
      (SELECT count(*)::int FROM information_schema.tables
        WHERE table_schema = 'public'
          AND table_name = 'workspace_engineering_work_repo_revisions') AS revisions_table,
      (SELECT count(*)::int FROM pg_indexes
        WHERE schemaname = 'public'
          AND indexname = 'workspace_engineering_work_repository_references_identity_idx') AS identity_index,
      (SELECT count(*)::int FROM pg_constraint
        WHERE conname = 'workspace_engineering_work_repo_refs_review_requires_ts') AS review_check,
      (SELECT count(*)::int FROM pg_trigger
        JOIN pg_class ON pg_class.oid = pg_trigger.tgrelid
        JOIN pg_namespace ON pg_namespace.oid = pg_class.relnamespace
        WHERE pg_namespace.nspname = 'public'
          AND NOT pg_trigger.tgisinternal
          AND pg_trigger.tgname = 'workspace_engineering_work_repository_references_no_delete_rows') AS delete_trigger
  `);
  assert.deepEqual(schemaObjects, {
    revisions_table: 1,
    identity_index: 1,
    review_check: 1,
    delete_trigger: 1,
  });

  const token = randomUUID().replaceAll("-", "");
  const projectId = `evidence_validation_project_${token}`;
  const workId = `evidence_validation_work_${token}`;
  const referenceId = `evidence_validation_reference_${token}`;
  const createHistoryId = `evidence_validation_create_event_${token}`;
  const createRevisionId = `evidence_validation_create_revision_${token}`;
  const maintainHistoryId = `evidence_validation_maintain_event_${token}`;
  const maintainRevisionId = `evidence_validation_maintain_revision_${token}`;

  const actor = authenticatedHumanEngineeringWorkActor({
    user: { id: "user-evidence-validator", name: "Evidence Validator" },
  });

  const { executor, statements } = captureStatements();
  await createEngineeringWorkRepositoryReferenceWithHistory(executor, {
    engineeringWorkId: workId,
    projectSlug: projectId,
    expectedVersion: 1,
    repositoryReferenceId: referenceId,
    historyEventId: createHistoryId,
    repositoryRevisionId: createRevisionId,
    repository: "aredirlabs-com/evidence-validation",
    sourceLocation: `docs/engineering/evidence/${token}.md`,
    artifactClass: "verification_evidence",
    artifactIdentifier: `validation-${token}`,
    branch: "main",
    commitHash: "deadbeef",
    note: "Transient evidence created for rollback validation.",
    provenance: engineeringWorkDecisionProvenance({
      actionActor: actor,
      decisionActor: actor,
      decisionRole: "execution",
      decision: "Record transient repository evidence.",
      rationale: "Validate the atomic create statement against the dev database.",
      decisionBasis: { summary: "Forced-rollback validation." },
      authority: { type: "human_owner" },
    }),
  });

  const { executor: maintainExecutor, statements: maintainStatements } = captureStatements();
  await maintainEngineeringWorkRepositoryReferenceWithHistory(maintainExecutor, {
    engineeringWorkId: workId,
    projectSlug: projectId,
    expectedVersion: 2,
    repositoryReferenceId: referenceId,
    historyEventId: maintainHistoryId,
    repositoryRevisionId: maintainRevisionId,
    artifactClass: "verification_evidence",
    artifactIdentifier: `validation-${token}`,
    branch: "main",
    commitHash: "deadbeef",
    referenceStatus: "verified",
    note: "Transient evidence reviewed under forced rollback.",
    decisionBasisSummary: "Independent validation accepted the transient artifact.",
    provenance: engineeringWorkDecisionProvenance({
      actionActor: actor,
      decisionActor: actor,
      decisionRole: "execution",
      decision: "Record the transient review.",
      rationale: "Validate the atomic maintain statement against the dev database.",
      decisionBasis: { summary: "Forced-rollback validation." },
      authority: { type: "human_owner" },
    }),
  });

  assert.equal(statements.length, 1);
  assert.equal(maintainStatements.length, 1);
  const [createStatement] = statements;
  const [maintainStatement] = maintainStatements;

  const setupQuery = `
    WITH inserted_project AS (
      INSERT INTO workspace_projects (id, name, slug)
      VALUES ($1, 'Repository evidence rollback validation', $1)
      RETURNING id
    )
    INSERT INTO workspace_engineering_work (
      id, project_id, title, summary, type, workflow, state, current_next_action
    )
    SELECT $2, id, 'Evidence rollback work', 'Validate atomic evidence.',
           'verification', 'verification', 'active', 'Execute transient evidence statements.'
      FROM inserted_project
    RETURNING id`;

  await assert.rejects(
    sql.transaction([
      sql.query(setupQuery, [projectId, workId]),
      sql.query(createStatement.query, createStatement.params),
      sql.query(maintainStatement.query, maintainStatement.params),
      sql.query(
        `DELETE FROM workspace_engineering_work_repository_references WHERE id = $1`,
        [referenceId],
      ),
    ]),
    /cannot be deleted/,
  );

  const [residue] = await sql.query(
    `SELECT
       (SELECT count(*)::int FROM workspace_projects WHERE id = $1) AS projects,
       (SELECT count(*)::int FROM workspace_engineering_work WHERE id = $2) AS work_items,
       (SELECT count(*)::int FROM workspace_engineering_work_repository_references WHERE id = $3) AS references,
       (SELECT count(*)::int FROM workspace_engineering_work_repo_revisions WHERE id = ANY(ARRAY[$4, $5])) AS revisions,
       (SELECT count(*)::int FROM workspace_engineering_work_history WHERE id = ANY(ARRAY[$6, $7])) AS history_events`,
    [projectId, workId, referenceId, createRevisionId, maintainRevisionId, createHistoryId, maintainHistoryId],
  );
  assert.deepEqual(residue, {
    projects: 0,
    work_items: 0,
    references: 0,
    revisions: 0,
    history_events: 0,
  });

  await assert.rejects(
    sql.transaction([
      sql.query(
        `INSERT INTO workspace_engineering_work_repository_references (
           id, engineering_work_id, repository, source_location, artifact_class, authority, reference_status
         )
         VALUES ($1, $2, 'forced', 'forced/path', 'finding', 'repository_authoritative', 'verified')`,
        [`evidence_validation_forced_${token}`, workId],
      ),
    ]),
    /review_requires_ts/,
  );

  const [finalCounts] = await sql.query(`
    SELECT
      (SELECT count(*)::int FROM workspace_engineering_work_repository_references) AS references,
      (SELECT count(*)::int FROM workspace_engineering_work_repo_revisions) AS revisions,
      (SELECT count(*)::int FROM workspace_engineering_work_history) AS history_events
  `);
  assert.deepEqual(finalCounts, {
    references: baseline.references,
    revisions: baseline.revisions,
    history_events: baseline.history_events,
  });

  console.log(
    JSON.stringify(
      {
        result: "Repository evidence dev validation passed",
        target: {
          hostname,
          database: identity.database_name,
          project: identity.project_id,
          branch: identity.branch_id,
        },
        preservedCounts: finalCounts,
        migrations: baseline.migrations,
        exercisedStatements: {
          create: "atomic create executed and rolled back",
          maintain: "atomic maintain executed and rolled back",
          deletionPrevention: "verified via forced-rollback trigger",
          reviewTimestampCheck: "verified via forced-rollback constraint",
        },
      },
      null,
      2,
    ),
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});