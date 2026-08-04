CREATE TYPE "public"."engineering_work_type" AS ENUM('feature', 'task', 'bug', 'research', 'architecture', 'verification', 'documentation', 'maintenance', 'release');
--> statement-breakpoint
CREATE TYPE "public"."engineering_work_workflow" AS ENUM('delivery', 'defect', 'discovery', 'research', 'architecture', 'maintenance', 'verification', 'documentation', 'promotion', 'release');
--> statement-breakpoint
CREATE TYPE "public"."engineering_work_state" AS ENUM('proposed', 'active', 'in_review', 'completed', 'closed', 'cancelled', 'superseded');
--> statement-breakpoint
CREATE TYPE "public"."engineering_work_reference_authority" AS ENUM('repository_authoritative', 'external_read_only', 'workspace_derived');
--> statement-breakpoint
CREATE TYPE "public"."engineering_work_reference_status" AS ENUM('expected', 'verified', 'stale', 'missing');
--> statement-breakpoint
CREATE TABLE "workspace_engineering_work" (
	"id" text PRIMARY KEY NOT NULL,
	"project_id" text NOT NULL,
	"title" text NOT NULL,
	"summary" text NOT NULL,
	"type" "engineering_work_type" NOT NULL,
	"workflow" "engineering_work_workflow" NOT NULL,
	"state" "engineering_work_state" DEFAULT 'proposed' NOT NULL,
	"current_next_action" text NOT NULL,
	"current_outcome" text,
	"priority" text,
	"condition" text,
	"condition_rationale" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "workspace_engineering_work_project_id_workspace_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."workspace_projects"("id") ON DELETE cascade ON UPDATE no action
);
--> statement-breakpoint
CREATE TABLE "workspace_engineering_work_repository_references" (
	"id" text PRIMARY KEY NOT NULL,
	"engineering_work_id" text NOT NULL,
	"repository" text NOT NULL,
	"source_location" text NOT NULL,
	"artifact_class" text NOT NULL,
	"authority" "engineering_work_reference_authority" NOT NULL,
	"artifact_identifier" text,
	"branch" text,
	"commit_hash" text,
	"reference_status" "engineering_work_reference_status" DEFAULT 'expected' NOT NULL,
	"last_reviewed_at" timestamp,
	"note" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "workspace_engineering_work_repository_references_engineering_work_id_workspace_engineering_work_id_fk" FOREIGN KEY ("engineering_work_id") REFERENCES "public"."workspace_engineering_work"("id") ON DELETE cascade ON UPDATE no action
);
