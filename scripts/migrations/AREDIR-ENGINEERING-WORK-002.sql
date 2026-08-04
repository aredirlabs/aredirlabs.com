-- AREDIR-ENGINEERING-WORK-002 tracked migration record.
-- The idempotent executable migration is ../migrate-engineering-work-002.mjs,
-- invoked before drizzle-kit push by the existing database workflow.

CREATE TYPE engineering_work_type AS ENUM ('feature', 'task', 'bug', 'research', 'architecture', 'verification', 'documentation', 'maintenance', 'release');
CREATE TYPE engineering_work_workflow AS ENUM ('delivery', 'defect', 'discovery', 'research', 'architecture', 'maintenance', 'verification', 'documentation', 'promotion', 'release');
CREATE TYPE engineering_work_state AS ENUM ('proposed', 'active', 'in_review', 'completed', 'closed', 'cancelled', 'superseded');
CREATE TYPE engineering_work_reference_authority AS ENUM ('repository_authoritative', 'external_read_only', 'workspace_derived');
CREATE TYPE engineering_work_reference_status AS ENUM ('expected', 'verified', 'stale', 'missing');

CREATE TABLE workspace_engineering_work (
  id text PRIMARY KEY,
  project_id text NOT NULL REFERENCES workspace_projects(id) ON DELETE CASCADE,
  title text NOT NULL,
  summary text NOT NULL,
  type engineering_work_type NOT NULL,
  workflow engineering_work_workflow NOT NULL,
  state engineering_work_state NOT NULL DEFAULT 'proposed',
  current_next_action text NOT NULL,
  current_outcome text,
  priority text,
  condition text,
  condition_rationale text,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);

CREATE TABLE workspace_engineering_work_repository_references (
  id text PRIMARY KEY,
  engineering_work_id text NOT NULL REFERENCES workspace_engineering_work(id) ON DELETE CASCADE,
  repository text NOT NULL,
  source_location text NOT NULL,
  artifact_class text NOT NULL,
  authority engineering_work_reference_authority NOT NULL,
  artifact_identifier text,
  branch text,
  commit_hash text,
  reference_status engineering_work_reference_status NOT NULL DEFAULT 'expected',
  last_reviewed_at timestamp,
  note text,
  created_at timestamp NOT NULL DEFAULT now(),
  updated_at timestamp NOT NULL DEFAULT now()
);
