import { sql } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  integer,
  jsonb,
  index,
  foreignKey,
  check,
  unique,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const projectStatusEnum = pgEnum("project_status", [
  "active",
  "testing",
  "paused",
  "planning",
  "archived",
]);

export const projectStageEnum = pgEnum("project_stage", [
  "concept",
  "prototype",
  "mvp",
  "uat",
  "production",
  "maintenance",
]);

export const milestoneStatusEnum = pgEnum("milestone_status", [
  "planned",
  "active",
  "blocked",
  "completed",
  "deferred",
]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  providerId: text("provider_id").notNull(),
  accountId: text("account_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const workspaceProjects = pgTable("workspace_projects", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  status: projectStatusEnum("status").notNull().default("planning"),
  stage: projectStageEnum("stage").notNull().default("concept"),
  currentFocus: text("current_focus"),
  nextStep: text("next_step"),
  targetDate: timestamp("target_date"),
  category: text("category"),
  description: text("description"),
  repoUrl: text("repo_url"),
  publicUrl: text("public_url"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const workspaceSettings = pgTable("workspace_settings", {
  id: text("id").primaryKey(),
  companyName: text("company_name").notNull(),
  companySlug: text("company_slug").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const workspaceProjectNoteTypeEnum = pgEnum("workspace_project_note_type", [
  "note",
  "decision",
  "risk",
  "qa",
  "release",
]);

export const workspaceProjectDocumentCategoryEnum = pgEnum(
  "workspace_project_document_category",
  [
    "architecture",
    "decision",
    "qa",
    "release",
    "prompt",
    "research",
    "reference",
  ],
);

export const workspaceProjectPromptTypeEnum = pgEnum(
  "workspace_project_prompt_type",
  [
    "implementation",
    "audit",
    "bugfix",
    "ui",
    "qa",
    "documentation",
    "deployment",
    "research",
  ],
);

export const workspaceProjectPromptStatusEnum = pgEnum(
  "workspace_project_prompt_status",
  ["drafted", "run", "verified", "needs_followup", "superseded"],
);

export const engineeringWorkTypeEnum = pgEnum("engineering_work_type", [
  "feature",
  "task",
  "bug",
  "research",
  "architecture",
  "verification",
  "documentation",
  "maintenance",
  "release",
]);

export const engineeringWorkWorkflowEnum = pgEnum(
  "engineering_work_workflow",
  [
    "delivery",
    "defect",
    "discovery",
    "research",
    "architecture",
    "maintenance",
    "verification",
    "documentation",
    "promotion",
    "release",
  ],
);

export const engineeringWorkStateEnum = pgEnum("engineering_work_state", [
  "proposed",
  "active",
  "in_review",
  "completed",
  "closed",
  "cancelled",
  "superseded",
]);

export const engineeringWorkReferenceAuthorityEnum = pgEnum(
  "engineering_work_reference_authority",
  ["repository_authoritative", "external_read_only", "workspace_derived"],
);

export const engineeringWorkReferenceStatusEnum = pgEnum(
  "engineering_work_reference_status",
  ["expected", "verified", "stale", "missing"],
);

export const engineeringWorkHistoryKindEnum = pgEnum(
  "engineering_work_history_kind",
  [
    "created",
    "proposed_correction",
    "operational_update",
    "lifecycle_transition",
    "decision_recorded",
    "workflow_context_update",
  ],
);

export const engineeringWorkActorTypeEnum = pgEnum(
  "engineering_work_actor_type",
  ["human", "ai_agent", "system", "integration"],
);

export const engineeringWorkDecisionRoleEnum = pgEnum(
  "engineering_work_decision_role",
  [
    "observation",
    "recommendation",
    "investigation",
    "adjudication",
    "authorization",
    "execution",
  ],
);

export const engineeringWorkAuthorityTypeEnum = pgEnum(
  "engineering_work_authority_type",
  [
    "human_owner",
    "delegated_policy",
    "verification_policy",
    "approval_gate",
    "system_rule",
  ],
);

export const workspaceProjectNotes = pgTable("workspace_project_notes", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => workspaceProjects.id, { onDelete: "cascade" }),
  type: workspaceProjectNoteTypeEnum("type").notNull().default("note"),
  title: text("title").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const workspaceProjectMilestones = pgTable("workspace_project_milestones", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => workspaceProjects.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description"),
  status: milestoneStatusEnum("status").notNull().default("planned"),
  targetDate: timestamp("target_date"),
  completedAt: timestamp("completed_at"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const workspaceProjectDocuments = pgTable(
  "workspace_project_documents",
  {
    id: text("id").primaryKey(),
    projectId: text("project_id")
      .notNull()
      .references(() => workspaceProjects.id, { onDelete: "cascade" }),
    category: workspaceProjectDocumentCategoryEnum("category").notNull(),
    title: text("title").notNull(),
    slug: text("slug").notNull(),
    content: text("content").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex("workspace_project_documents_project_slug_idx").on(
      table.projectId,
      table.slug,
    ),
  ],
);

export const workspaceProjectPrompts = pgTable("workspace_project_prompts", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => workspaceProjects.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  promptType: workspaceProjectPromptTypeEnum("prompt_type").notNull(),
  promptBody: text("prompt_body").notNull(),
  resultSummary: text("result_summary"),
  filesChanged: text("files_changed"),
  verification: text("verification"),
  followUps: text("follow_ups"),
  status: workspaceProjectPromptStatusEnum("status")
    .notNull()
    .default("drafted"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const workspaceEngineeringWork = pgTable("workspace_engineering_work", {
  id: text("id").primaryKey(),
  projectId: text("project_id")
    .notNull()
    .references(() => workspaceProjects.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  type: engineeringWorkTypeEnum("type").notNull(),
  workflow: engineeringWorkWorkflowEnum("workflow").notNull(),
  state: engineeringWorkStateEnum("state").notNull().default("proposed"),
  currentNextAction: text("current_next_action"),
  currentOutcome: text("current_outcome"),
  priority: text("priority"),
  condition: text("condition"),
  conditionRationale: text("condition_rationale"),
  finalDisposition: text("final_disposition"),
  version: integer("version").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const workspaceEngineeringWorkHistory = pgTable(
  "workspace_engineering_work_history",
  {
    id: text("id").primaryKey(),
    engineeringWorkId: text("engineering_work_id")
      .notNull()
      .references(() => workspaceEngineeringWork.id, { onDelete: "restrict" }),
    kind: engineeringWorkHistoryKindEnum("kind").notNull(),
    actionType: text("action_type").notNull(),
    priorState: engineeringWorkStateEnum("prior_state"),
    resultingState: engineeringWorkStateEnum("resulting_state"),
    recommendedState: engineeringWorkStateEnum("recommended_state"),
    previousTitle: text("previous_title"),
    resultingTitle: text("resulting_title"),
    previousType: engineeringWorkTypeEnum("previous_type"),
    resultingType: engineeringWorkTypeEnum("resulting_type"),
    previousObjective: text("previous_objective"),
    resultingObjective: text("resulting_objective"),
    previousNextAction: text("previous_next_action"),
    resultingNextAction: text("resulting_next_action"),
    previousOutcome: text("previous_outcome"),
    resultingOutcome: text("resulting_outcome"),
    previousCondition: text("previous_condition"),
    resultingCondition: text("resulting_condition"),
    previousConditionRationale: text("previous_condition_rationale"),
    resultingConditionRationale: text("resulting_condition_rationale"),
    previousFinalDisposition: text("previous_final_disposition"),
    resultingFinalDisposition: text("resulting_final_disposition"),
    decision: text("decision"),
    rationale: text("rationale"),
    decisionBasis: jsonb("decision_basis")
      .$type<Record<string, unknown>>()
      .notNull()
      .default({}),
    actionActorType: engineeringWorkActorTypeEnum("action_actor_type").notNull(),
    actionActorIdentifier: text("action_actor_identifier").notNull(),
    actionActorDisplayName: text("action_actor_display_name"),
    decisionActorType: engineeringWorkActorTypeEnum("decision_actor_type"),
    decisionActorIdentifier: text("decision_actor_identifier"),
    decisionActorDisplayName: text("decision_actor_display_name"),
    decisionRole: engineeringWorkDecisionRoleEnum("decision_role"),
    authorityType: engineeringWorkAuthorityTypeEnum("authority_type"),
    authorityReference: text("authority_reference"),
    authorityContext: text("authority_context"),
    basedOnEventId: text("based_on_event_id"),
    provenanceMetadata: jsonb("provenance_metadata")
      .$type<Record<string, unknown>>()
      .notNull()
      .default({}),
    occurredAt: timestamp("occurred_at", { withTimezone: true })
      .default(sql`statement_timestamp()`)
      .notNull(),
  },
  (table) => [
    index("workspace_engineering_work_history_work_time_idx").on(
      table.engineeringWorkId,
      table.occurredAt,
      table.id,
    ),
    index("workspace_engineering_work_history_basis_idx").on(
      table.basedOnEventId,
    ).where(sql`${table.basedOnEventId} is not null`),
    unique("workspace_engineering_work_history_work_id_unique").on(
      table.engineeringWorkId,
      table.id,
    ),
    foreignKey({
      columns: [table.basedOnEventId],
      foreignColumns: [table.id],
      name: "workspace_engineering_work_history_based_on_event_id_fk",
    }).onDelete("restrict"),
    foreignKey({
      columns: [table.engineeringWorkId, table.basedOnEventId],
      foreignColumns: [table.engineeringWorkId, table.id],
      name: "workspace_engineering_work_history_same_work_basis_fk",
    }).onDelete("restrict"),
    check(
      "workspace_engineering_work_history_action_type_nonblank",
      sql`btrim(${table.actionType}) <> ''`,
    ),
    check(
      "workspace_engineering_work_history_action_actor_nonblank",
      sql`btrim(${table.actionActorIdentifier}) <> ''`,
    ),
    check(
      "workspace_engineering_work_history_decision_actor_coherent",
      sql`(
        (${table.decisionActorType} is null and ${table.decisionActorIdentifier} is null)
        or
        (${table.decisionActorType} is not null and btrim(${table.decisionActorIdentifier}) <> '')
      )`,
    ),
    check(
      "workspace_engineering_work_history_decision_basis_object",
      sql`jsonb_typeof(${table.decisionBasis}) = 'object'`,
    ),
    check(
      "workspace_engineering_work_history_provenance_metadata_object",
      sql`jsonb_typeof(${table.provenanceMetadata}) = 'object'`,
    ),
    check(
      "workspace_engineering_work_history_not_self_based",
      sql`${table.basedOnEventId} is null or ${table.basedOnEventId} <> ${table.id}`,
    ),
  ],
);

export const workspaceEngineeringWorkDefectRevisions = pgTable(
  "workspace_engineering_work_defect_revisions",
  {
    id: text("id").primaryKey(),
    historyEventId: text("history_event_id")
      .notNull()
      .unique()
      .references(() => workspaceEngineeringWorkHistory.id, {
        onDelete: "restrict",
      }),
    engineeringWorkId: text("engineering_work_id")
      .notNull()
      .references(() => workspaceEngineeringWork.id, { onDelete: "restrict" }),
    previousContext: jsonb("previous_context")
      .$type<Record<string, unknown>>()
      .notNull(),
    resultingContext: jsonb("resulting_context")
      .$type<Record<string, unknown>>()
      .notNull(),
    contextSchemaVersion: integer("context_schema_version")
      .notNull()
      .default(1),
  },
  (table) => [
    index("workspace_engineering_work_defect_revisions_work_idx").on(
      table.engineeringWorkId,
    ),
    foreignKey({
      columns: [table.engineeringWorkId, table.historyEventId],
      foreignColumns: [
        workspaceEngineeringWorkHistory.engineeringWorkId,
        workspaceEngineeringWorkHistory.id,
      ],
      name: "workspace_engineering_work_defect_revisions_same_work_event_fk",
    }).onDelete("restrict"),
    check(
      "workspace_engineering_work_defect_revisions_previous_context_object",
      sql`jsonb_typeof(${table.previousContext}) = 'object'`,
    ),
    check(
      "workspace_engineering_work_defect_revisions_resulting_context_object",
      sql`jsonb_typeof(${table.resultingContext}) = 'object'`,
    ),
    check(
      "workspace_engineering_work_defect_revisions_schema_version_positive",
      sql`${table.contextSchemaVersion} > 0`,
    ),
  ],
);

export const workspaceEngineeringWorkDefects = pgTable(
  "workspace_engineering_work_defects",
  {
    engineeringWorkId: text("engineering_work_id")
      .primaryKey()
      .references(() => workspaceEngineeringWork.id, { onDelete: "cascade" }),
    observedBehavior: text("observed_behavior").notNull(),
    expectedBehavior: text("expected_behavior").notNull(),
    reproductionSteps: text("reproduction_steps").notNull(),
    environment: text("environment").notNull(),
    evidence: text("evidence").notNull(),
    nextInvestigation: text("next_investigation").notNull(),
    validationTarget: text("validation_target").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
);

export const workspaceEngineeringWorkRepositoryReferences = pgTable(
  "workspace_engineering_work_repository_references",
  {
    id: text("id").primaryKey(),
    engineeringWorkId: text("engineering_work_id")
      .notNull()
      .references(() => workspaceEngineeringWork.id, { onDelete: "cascade" }),
    repository: text("repository").notNull(),
    sourceLocation: text("source_location").notNull(),
    artifactClass: text("artifact_class").notNull(),
    authority: engineeringWorkReferenceAuthorityEnum("authority").notNull(),
    artifactIdentifier: text("artifact_identifier"),
    branch: text("branch"),
    commitHash: text("commit_hash"),
    referenceStatus: engineeringWorkReferenceStatusEnum("reference_status")
      .notNull()
      .default("expected"),
    lastReviewedAt: timestamp("last_reviewed_at"),
    note: text("note"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
);
