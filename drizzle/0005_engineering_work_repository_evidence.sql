CREATE UNIQUE INDEX "workspace_engineering_work_repository_references_identity_idx"
  ON "workspace_engineering_work_repository_references"
  ("engineering_work_id", "repository", "source_location");
--> statement-breakpoint
CREATE TABLE "workspace_engineering_work_repo_revisions" (
  "id" text PRIMARY KEY NOT NULL,
  "history_event_id" text NOT NULL,
  "engineering_work_id" text NOT NULL,
  "repository_reference_id" text NOT NULL,
  "previous_reference" jsonb NOT NULL,
  "resulting_reference" jsonb NOT NULL,
  "reference_schema_version" integer DEFAULT 1 NOT NULL,
  CONSTRAINT "workspace_engineering_work_repo_revisions_history_event_uniq"
    UNIQUE("history_event_id"),
  CONSTRAINT "workspace_engineering_work_repo_revisions_previous_reference"
    CHECK (jsonb_typeof("previous_reference") = 'object'),
  CONSTRAINT "workspace_engineering_work_repo_revisions_resulting_reference"
    CHECK (jsonb_typeof("resulting_reference") = 'object'),
  CONSTRAINT "workspace_engineering_work_repo_revisions_schema_version"
    CHECK ("reference_schema_version" > 0)
);
--> statement-breakpoint
ALTER TABLE "workspace_engineering_work_repo_revisions"
  ADD CONSTRAINT "workspace_engineering_work_repo_revisions_history_event_id_fk"
  FOREIGN KEY ("history_event_id")
  REFERENCES "public"."workspace_engineering_work_history"("id")
  ON DELETE RESTRICT ON UPDATE NO ACTION;
--> statement-breakpoint
ALTER TABLE "workspace_engineering_work_repo_revisions"
  ADD CONSTRAINT "workspace_engineering_work_repo_revisions_engineering_work_fk"
  FOREIGN KEY ("engineering_work_id")
  REFERENCES "public"."workspace_engineering_work"("id")
  ON DELETE RESTRICT ON UPDATE NO ACTION;
--> statement-breakpoint
ALTER TABLE "workspace_engineering_work_repo_revisions"
  ADD CONSTRAINT "workspace_engineering_work_repo_revisions_reference_id_fk"
  FOREIGN KEY ("repository_reference_id")
  REFERENCES "public"."workspace_engineering_work_repository_references"("id")
  ON DELETE RESTRICT ON UPDATE NO ACTION;
--> statement-breakpoint
CREATE INDEX "workspace_engineering_work_repo_revisions_work_idx"
  ON "workspace_engineering_work_repo_revisions" ("engineering_work_id");
--> statement-breakpoint
ALTER TABLE "workspace_engineering_work_repo_revisions"
  ADD CONSTRAINT "workspace_engineering_work_repo_revisions_same_work_event_fk"
  FOREIGN KEY ("engineering_work_id", "history_event_id")
  REFERENCES "public"."workspace_engineering_work_history"("engineering_work_id", "id")
  ON DELETE RESTRICT ON UPDATE NO ACTION;
--> statement-breakpoint
CREATE FUNCTION "prevent_engineering_work_repository_reference_deletion"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION 'Engineering Work repository references are durable and cannot be deleted';
END;
$$;
--> statement-breakpoint
CREATE TRIGGER "workspace_engineering_work_repository_references_no_delete_rows"
  BEFORE DELETE ON "workspace_engineering_work_repository_references"
  FOR EACH ROW EXECUTE FUNCTION "prevent_engineering_work_repository_reference_deletion"();
--> statement-breakpoint
CREATE TRIGGER "workspace_engineering_work_repository_references_no_delete_truncate"
  BEFORE TRUNCATE ON "workspace_engineering_work_repository_references"
  FOR EACH STATEMENT EXECUTE FUNCTION "prevent_engineering_work_repository_reference_deletion"();
--> statement-breakpoint
CREATE TRIGGER "workspace_engineering_work_repo_revisions_append_only_rows"
  BEFORE UPDATE OR DELETE ON "workspace_engineering_work_repo_revisions"
  FOR EACH ROW EXECUTE FUNCTION "prevent_engineering_work_history_mutation"();
--> statement-breakpoint
CREATE TRIGGER "workspace_engineering_work_repo_revisions_append_only_truncate"
  BEFORE TRUNCATE ON "workspace_engineering_work_repo_revisions"
  FOR EACH STATEMENT EXECUTE FUNCTION "prevent_engineering_work_history_mutation"();