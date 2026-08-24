CREATE TYPE "public"."project_focus_event_effect" AS ENUM(
  'selected',
  'deselected',
  'invalidated'
);
--> statement-breakpoint
ALTER TABLE "workspace_projects"
  ADD COLUMN "focus_version" integer DEFAULT 0 NOT NULL;
--> statement-breakpoint
CREATE UNIQUE INDEX "workspace_engineering_work_project_id_id_idx"
  ON "workspace_engineering_work" USING btree ("project_id", "id");
--> statement-breakpoint
CREATE TABLE "workspace_project_focus_events" (
  "id" text PRIMARY KEY NOT NULL,
  "project_id" text NOT NULL,
  "engineering_work_id" text NOT NULL,
  "effect" "project_focus_event_effect" NOT NULL,
  "command_context" text,
  "batch_id" text NOT NULL,
  "rationale" text,
  "action_actor_type" "engineering_work_actor_type" NOT NULL,
  "action_actor_identifier" text NOT NULL,
  "action_actor_display_name" text,
  "decision_actor_type" "engineering_work_actor_type",
  "decision_actor_identifier" text,
  "decision_actor_display_name" text,
  "authority_type" "engineering_work_authority_type",
  "authority_reference" text,
  "authority_context" text,
  "based_on_event_id" text,
  "occurred_at" timestamp with time zone DEFAULT statement_timestamp() NOT NULL,
  CONSTRAINT "workspace_project_focus_events_project_id_workspace_projects_id_fk"
    FOREIGN KEY ("project_id") REFERENCES "public"."workspace_projects"("id") ON DELETE cascade ON UPDATE no action,
  CONSTRAINT "workspace_project_focus_events_engineering_work_id_workspace_engineering_work_id_fk"
    FOREIGN KEY ("engineering_work_id") REFERENCES "public"."workspace_engineering_work"("id") ON DELETE restrict ON UPDATE no action,
  CONSTRAINT "workspace_project_focus_events_owned_work_fk"
    FOREIGN KEY ("project_id", "engineering_work_id")
    REFERENCES "public"."workspace_engineering_work" ("project_id", "id")
    ON DELETE restrict ON UPDATE no action,
  CONSTRAINT "workspace_project_focus_events_same_work_lifecycle_cause_fk"
    FOREIGN KEY ("engineering_work_id", "based_on_event_id")
    REFERENCES "public"."workspace_engineering_work_history" ("engineering_work_id", "id")
    ON DELETE restrict ON UPDATE no action,
  CONSTRAINT "workspace_project_focus_events_action_actor_nonblank"
    CHECK (
      "action_actor_identifier" IS NOT NULL
      AND btrim("action_actor_identifier") <> ''
    ),
  CONSTRAINT "workspace_project_focus_events_batch_nonblank"
    CHECK (
      "batch_id" IS NOT NULL
      AND btrim("batch_id") <> ''
    ),
  CONSTRAINT "workspace_project_focus_events_decision_actor_coherent"
    CHECK (
      (
        "decision_actor_type" IS NULL
        AND "decision_actor_identifier" IS NULL
        AND "decision_actor_display_name" IS NULL
      )
      OR (
        "decision_actor_type" IS NOT NULL
        AND "decision_actor_identifier" IS NOT NULL
        AND btrim("decision_actor_identifier") <> ''
      )
    ),
  CONSTRAINT "workspace_project_focus_events_human_provenance"
    CHECK (
      "effect" NOT IN ('selected', 'deselected')
      OR (
        "action_actor_type" IS NOT NULL
        AND "action_actor_type" = 'human'
        AND "action_actor_identifier" IS NOT NULL
        AND btrim("action_actor_identifier") <> ''
        AND "decision_actor_type" IS NOT NULL
        AND "decision_actor_type" = 'human'
        AND "decision_actor_identifier" IS NOT NULL
        AND btrim("decision_actor_identifier") <> ''
        AND "authority_type" IS NOT NULL
        AND "authority_type" = 'human_owner'
      )
    ),
  CONSTRAINT "workspace_project_focus_events_invalidation_provenance"
    CHECK (
      "effect" <> 'invalidated'
      OR (
        "authority_type" IS NOT NULL
        AND "authority_type" = 'system_rule'
        AND "action_actor_type" IS NOT NULL
        AND "action_actor_type" = 'system'
        AND "action_actor_identifier" IS NOT NULL
        AND btrim("action_actor_identifier") <> ''
        AND "authority_reference" IS NOT NULL
        AND btrim("authority_reference") <> ''
        AND "based_on_event_id" IS NOT NULL
        AND btrim("based_on_event_id") <> ''
        AND "rationale" IS NOT NULL
        AND btrim("rationale") <> ''
        AND "decision_actor_type" IS NULL
        AND "decision_actor_identifier" IS NULL
        AND "decision_actor_display_name" IS NULL
      )
    ),
  CONSTRAINT "workspace_project_focus_events_non_invalidation_no_lifecycle_cause"
    CHECK (
      "effect" = 'invalidated'
      OR "based_on_event_id" IS NULL
    )
);
--> statement-breakpoint
CREATE UNIQUE INDEX "workspace_project_focus_events_scope_idx"
  ON "workspace_project_focus_events" USING btree ("id", "project_id", "engineering_work_id");
--> statement-breakpoint
CREATE UNIQUE INDEX "workspace_project_focus_events_selected_scope_idx"
  ON "workspace_project_focus_events" USING btree ("id", "project_id", "engineering_work_id")
  WHERE "effect" = 'selected';
--> statement-breakpoint
CREATE TABLE "workspace_project_focus_selection" (
  "id" text PRIMARY KEY NOT NULL,
  "project_id" text NOT NULL,
  "engineering_work_id" text NOT NULL,
  "selected_at" timestamp with time zone NOT NULL,
  "selected_by_event_id" text NOT NULL,
  CONSTRAINT "workspace_project_focus_selection_project_id_workspace_projects_id_fk"
    FOREIGN KEY ("project_id") REFERENCES "public"."workspace_projects"("id") ON DELETE cascade ON UPDATE no action,
  CONSTRAINT "workspace_project_focus_selection_engineering_work_id_workspace_engineering_work_id_fk"
    FOREIGN KEY ("engineering_work_id") REFERENCES "public"."workspace_engineering_work"("id") ON DELETE cascade ON UPDATE no action,
  CONSTRAINT "workspace_project_focus_selection_owned_work_fk"
    FOREIGN KEY ("project_id", "engineering_work_id")
    REFERENCES "public"."workspace_engineering_work" ("project_id", "id")
    ON DELETE cascade ON UPDATE no action,
  CONSTRAINT "workspace_project_focus_selection_selected_by_event_id_workspace_project_focus_events_id_fk"
    FOREIGN KEY ("selected_by_event_id") REFERENCES "public"."workspace_project_focus_events"("id") ON DELETE restrict ON UPDATE no action,
  CONSTRAINT "workspace_project_focus_selection_selected_event_scope_fk"
    FOREIGN KEY ("selected_by_event_id", "project_id", "engineering_work_id")
    REFERENCES "public"."workspace_project_focus_events" ("id", "project_id", "engineering_work_id")
    ON DELETE restrict ON UPDATE no action
);
--> statement-breakpoint
CREATE OR REPLACE FUNCTION "public"."workspace_project_focus_selection_selected_event_effect_guard"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM "public"."workspace_project_focus_events" AS event
    WHERE event."id" = NEW."selected_by_event_id"
      AND event."project_id" = NEW."project_id"
      AND event."engineering_work_id" = NEW."engineering_work_id"
      AND event."effect" = 'selected'
  ) THEN
    RAISE EXCEPTION 'selected_by_event_id must reference a selected focus event for the same Project and Engineering Work';
  END IF;
  RETURN NEW;
END;
$$;
--> statement-breakpoint
CREATE TRIGGER "workspace_project_focus_selection_selected_event_effect_guard_trg"
  BEFORE INSERT OR UPDATE ON "workspace_project_focus_selection"
  FOR EACH ROW
  EXECUTE FUNCTION "public"."workspace_project_focus_selection_selected_event_effect_guard"();
--> statement-breakpoint
CREATE OR REPLACE FUNCTION "public"."prevent_workspace_project_focus_events_mutation"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION 'Project focus events are append-only';
END;
$$;
--> statement-breakpoint
CREATE TRIGGER "workspace_project_focus_events_append_only_rows"
  BEFORE UPDATE OR DELETE ON "workspace_project_focus_events"
  FOR EACH ROW EXECUTE FUNCTION "prevent_workspace_project_focus_events_mutation"();
--> statement-breakpoint
CREATE TRIGGER "workspace_project_focus_events_append_only_truncate"
  BEFORE TRUNCATE ON "workspace_project_focus_events"
  FOR EACH STATEMENT EXECUTE FUNCTION "prevent_workspace_project_focus_events_mutation"();
--> statement-breakpoint
CREATE OR REPLACE FUNCTION "public"."prevent_workspace_project_focus_selection_update"()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  RAISE EXCEPTION 'Project focus selection rows are insert/delete only';
END;
$$;
--> statement-breakpoint
CREATE TRIGGER "workspace_project_focus_selection_no_update_rows"
  BEFORE UPDATE ON "workspace_project_focus_selection"
  FOR EACH ROW EXECUTE FUNCTION "prevent_workspace_project_focus_selection_update"();
--> statement-breakpoint
CREATE UNIQUE INDEX "workspace_project_focus_selection_project_work_idx"
  ON "workspace_project_focus_selection" USING btree ("project_id", "engineering_work_id");
--> statement-breakpoint
CREATE INDEX "workspace_project_focus_selection_project_idx"
  ON "workspace_project_focus_selection" USING btree ("project_id");
--> statement-breakpoint
CREATE INDEX "workspace_project_focus_events_project_time_idx"
  ON "workspace_project_focus_events" USING btree ("project_id", "occurred_at", "id");
--> statement-breakpoint
CREATE INDEX "workspace_project_focus_events_work_idx"
  ON "workspace_project_focus_events" USING btree ("engineering_work_id");
--> statement-breakpoint
CREATE INDEX "workspace_project_focus_events_lifecycle_cause_idx"
  ON "workspace_project_focus_events" USING btree ("based_on_event_id")
  WHERE "based_on_event_id" IS NOT NULL;
