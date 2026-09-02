CREATE TYPE "public"."workspace_project_prompt_type" AS ENUM('implementation', 'audit', 'bugfix', 'ui', 'qa', 'documentation', 'deployment', 'research');
--> statement-breakpoint
CREATE TYPE "public"."workspace_project_prompt_status" AS ENUM('drafted', 'run', 'verified', 'needs_followup', 'superseded');
--> statement-breakpoint
CREATE TABLE "workspace_project_prompts" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"title" text NOT NULL,
	"prompt_type" "workspace_project_prompt_type" NOT NULL,
	"prompt_body" text NOT NULL,
	"result_summary" text,
	"files_changed" text,
	"verification" text,
	"follow_ups" text,
	"status" "workspace_project_prompt_status" DEFAULT 'drafted' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "workspace_project_prompts_project_id_workspace_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."workspace_projects"("id") ON DELETE cascade ON UPDATE no action
);
