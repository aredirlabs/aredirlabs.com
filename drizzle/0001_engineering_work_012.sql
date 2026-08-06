CREATE TABLE "workspace_engineering_work_defects" (
  "engineering_work_id" text PRIMARY KEY NOT NULL,
  "observed_behavior" text NOT NULL,
  "expected_behavior" text NOT NULL,
  "reproduction_steps" text NOT NULL,
  "environment" text NOT NULL,
  "evidence" text NOT NULL,
  "next_investigation" text NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  CONSTRAINT "workspace_engineering_work_defects_engineering_work_id_workspace_engineering_work_id_fk"
    FOREIGN KEY ("engineering_work_id") REFERENCES "public"."workspace_engineering_work"("id")
    ON DELETE cascade ON UPDATE no action
);
