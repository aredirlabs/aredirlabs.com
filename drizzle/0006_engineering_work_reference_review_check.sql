ALTER TABLE "workspace_engineering_work_repository_references"
  ADD CONSTRAINT "workspace_engineering_work_repo_refs_review_requires_ts"
  CHECK (("reference_status" NOT IN ('verified', 'stale', 'missing')) OR ("last_reviewed_at" IS NOT NULL));