CREATE TYPE "public"."engineering_work_history_kind" AS ENUM(
  'created',
  'proposed_correction',
  'operational_update',
  'lifecycle_transition',
  'decision_recorded',
  'workflow_context_update'
);
--> statement-breakpoint
CREATE TYPE "public"."engineering_work_actor_type" AS ENUM(
  'human',
  'ai_agent',
  'system',
  'integration'
);
--> statement-breakpoint
CREATE TYPE "public"."engineering_work_decision_role" AS ENUM(
  'observation',
  'recommendation',
  'investigation',
  'adjudication',
  'authorization',
  'execution'
);
--> statement-breakpoint
CREATE TYPE "public"."engineering_work_authority_type" AS ENUM(
  'human_owner',
  'delegated_policy',
  'verification_policy',
  'approval_gate',
  'system_rule'
);
--> statement-breakpoint
ALTER TABLE "workspace_engineering_work"
  ALTER COLUMN "current_next_action" DROP NOT NULL;
--> statement-breakpoint
ALTER TABLE "workspace_engineering_work"
  ADD COLUMN "final_disposition" text;
--> statement-breakpoint
ALTER TABLE "workspace_engineering_work"
  ADD COLUMN "version" integer DEFAULT 1 NOT NULL;
--> statement-breakpoint
CREATE TABLE "workspace_engineering_work_history" (
  "id" text PRIMARY KEY NOT NULL,
  "engineering_work_id" text NOT NULL,
  "kind" "engineering_work_history_kind" NOT NULL,
  "action_type" text NOT NULL,
  "prior_state" "engineering_work_state",
  "resulting_state" "engineering_work_state",
  "recommended_state" "engineering_work_state",
  "previous_title" text,
  "resulting_title" text,
  "previous_type" "engineering_work_type",
  "resulting_type" "engineering_work_type",
  "previous_objective" text,
  "resulting_objective" text,
  "previous_next_action" text,
  "resulting_next_action" text,
  "previous_outcome" text,
  "resulting_outcome" text,
  "previous_condition" text,
  "resulting_condition" text,
  "previous_condition_rationale" text,
  "resulting_condition_rationale" text,
  "previous_final_disposition" text,
  "resulting_final_disposition" text,
  "decision" text,
  "rationale" text,
  "decision_basis" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "action_actor_type" "engineering_work_actor_type" NOT NULL,
  "action_actor_identifier" text NOT NULL,
  "action_actor_display_name" text,
  "decision_actor_type" "engineering_work_actor_type",
  "decision_actor_identifier" text,
  "decision_actor_display_name" text,
  "decision_role" "engineering_work_decision_role",
  "authority_type" "engineering_work_authority_type",
  "authority_reference" text,
  "authority_context" text,
  "based_on_event_id" text,
  "provenance_metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
  "occurred_at" timestamp with time zone DEFAULT statement_timestamp() NOT NULL,
  CONSTRAINT "workspace_engineering_work_history_action_type_nonblank"
    CHECK (btrim("action_type") <> ''),
  CONSTRAINT "workspace_engineering_work_history_action_actor_nonblank"
    CHECK (btrim("action_actor_identifier") <> ''),
  CONSTRAINT "workspace_engineering_work_history_decision_actor_coherent"
    CHECK (
      ("decision_actor_type" IS NULL AND "decision_actor_identifier" IS NULL)
      OR
      ("decision_actor_type" IS NOT NULL AND btrim("decision_actor_identifier") <> '')
    ),
  CONSTRAINT "workspace_engineering_work_history_decision_basis_object"
    CHECK (jsonb_typeof("decision_basis") = 'object'),
  CONSTRAINT "workspace_engineering_work_history_provenance_metadata_object"
    CHECK (jsonb_typeof("provenance_metadata") = 'object'),
  CONSTRAINT "workspace_engineering_work_history_not_self_based"
    CHECK ("based_on_event_id" IS NULL OR "based_on_event_id" <> "id")
);
--> statement-breakpoint
ALTER TABLE "workspace_engineering_work_history"
  ADD CONSTRAINT "workspace_engineering_work_history_engineering_work_id_fk"
  FOREIGN KEY ("engineering_work_id")
  REFERENCES "public"."workspace_engineering_work"("id")
  ON DELETE RESTRICT ON UPDATE NO ACTION;
--> statement-breakpoint
ALTER TABLE "workspace_engineering_work_history"
  ADD CONSTRAINT "workspace_engineering_work_history_based_on_event_id_fk"
  FOREIGN KEY ("based_on_event_id")
  REFERENCES "public"."workspace_engineering_work_history"("id")
  ON DELETE RESTRICT ON UPDATE NO ACTION;
--> statement-breakpoint
CREATE INDEX "workspace_engineering_work_history_work_time_idx"
  ON "workspace_engineering_work_history" ("engineering_work_id", "occurred_at", "id");
--> statement-breakpoint
CREATE INDEX "workspace_engineering_work_history_basis_idx"
  ON "workspace_engineering_work_history" ("based_on_event_id")
  WHERE "based_on_event_id" IS NOT NULL;
--> statement-breakpoint
CREATE TABLE "workspace_engineering_work_defect_revisions" (
  "id" text PRIMARY KEY NOT NULL,
  "history_event_id" text NOT NULL,
  "engineering_work_id" text NOT NULL,
  "previous_context" jsonb NOT NULL,
  "resulting_context" jsonb NOT NULL,
  "context_schema_version" integer DEFAULT 1 NOT NULL,
  CONSTRAINT "workspace_engineering_work_defect_revisions_history_event_id_unique"
    UNIQUE("history_event_id"),
  CONSTRAINT "workspace_engineering_work_defect_revisions_previous_context_object"
    CHECK (jsonb_typeof("previous_context") = 'object'),
  CONSTRAINT "workspace_engineering_work_defect_revisions_resulting_context_object"
    CHECK (jsonb_typeof("resulting_context") = 'object'),
  CONSTRAINT "workspace_engineering_work_defect_revisions_schema_version_positive"
    CHECK ("context_schema_version" > 0)
);
--> statement-breakpoint
ALTER TABLE "workspace_engineering_work_defect_revisions"
  ADD CONSTRAINT "workspace_engineering_work_defect_revisions_history_event_id_fk"
  FOREIGN KEY ("history_event_id")
  REFERENCES "public"."workspace_engineering_work_history"("id")
  ON DELETE RESTRICT ON UPDATE NO ACTION;
--> statement-breakpoint
ALTER TABLE "workspace_engineering_work_defect_revisions"
  ADD CONSTRAINT "workspace_engineering_work_defect_revisions_engineering_work_id_fk"
  FOREIGN KEY ("engineering_work_id")
  REFERENCES "public"."workspace_engineering_work"("id")
  ON DELETE RESTRICT ON UPDATE NO ACTION;
--> statement-breakpoint
CREATE INDEX "workspace_engineering_work_defect_revisions_work_idx"
  ON "workspace_engineering_work_defect_revisions" ("engineering_work_id");
--> statement-breakpoint
CREATE FUNCTION "prevent_engineering_work_history_mutation"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION 'Engineering Work history is append-only';
END;
$$;
--> statement-breakpoint
CREATE TRIGGER "workspace_engineering_work_history_append_only_rows"
  BEFORE UPDATE OR DELETE ON "workspace_engineering_work_history"
  FOR EACH ROW EXECUTE FUNCTION "prevent_engineering_work_history_mutation"();
--> statement-breakpoint
CREATE TRIGGER "workspace_engineering_work_history_append_only_truncate"
  BEFORE TRUNCATE ON "workspace_engineering_work_history"
  FOR EACH STATEMENT EXECUTE FUNCTION "prevent_engineering_work_history_mutation"();
--> statement-breakpoint
CREATE TRIGGER "workspace_engineering_work_defect_revisions_append_only_rows"
  BEFORE UPDATE OR DELETE ON "workspace_engineering_work_defect_revisions"
  FOR EACH ROW EXECUTE FUNCTION "prevent_engineering_work_history_mutation"();
--> statement-breakpoint
CREATE TRIGGER "workspace_engineering_work_defect_revisions_append_only_truncate"
  BEFORE TRUNCATE ON "workspace_engineering_work_defect_revisions"
  FOR EACH STATEMENT EXECUTE FUNCTION "prevent_engineering_work_history_mutation"();
