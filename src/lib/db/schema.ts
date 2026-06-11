import {
  pgTable,
  text,
  timestamp,
  boolean,
  pgEnum,
  integer,
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
