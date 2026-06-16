import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import {
  workspaceProjectDocuments,
  workspaceProjectMilestones,
  workspaceProjectNotes,
  workspaceProjectPrompts,
  workspaceProjects,
  workspaceSettings,
} from "./schema";

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

const settings = {
  id: "ws_01",
  companyName: "Aredir Labs",
  companySlug: "aredir-labs",
};

const projects = [
  {
    id: "proj_01",
    name: "AlignFit",
    slug: "alignfit",
    status: "testing" as const,
    stage: "uat" as const,
    currentFocus: "UAT stabilization and coach intelligence hardening",
    nextStep: "External tester onboarding and production-readiness planning",
    targetDate: new Date("2026-07-15T00:00:00.000Z"),
    category: "Fitness",
    description:
      "AI-powered fitness, nutrition, recovery, and coaching platform. Stack: Neon Postgres, Drizzle ORM, Better Auth, Cloudflare R2, and Vercel. Currently in user acceptance testing.",
    repoUrl: "https://github.com/aredirlabs/alignfit",
  },
  {
    id: "proj_02",
    name: "ClassForge",
    slug: "classforge",
    status: "paused" as const,
    stage: "prototype" as const,
    currentFocus: "Prototype consolidation",
    nextStep: "Lesson planning MVP",
    category: "Education",
    description:
      "AI-assisted education platform for lesson planning and educator productivity.",
    repoUrl: "https://github.com/aredirlabs/classforge",
  },
  {
    id: "proj_03",
    name: "LeagueOS",
    slug: "leagueos",
    status: "planning" as const,
    stage: "concept" as const,
    currentFocus: "Football-first simulation design",
    nextStep: "League model validation",
    targetDate: new Date("2026-09-01T00:00:00.000Z"),
    category: "Sports",
    description:
      "Fantasy sports franchise management platform, currently in early-stage design and development.",
    repoUrl: "https://github.com/aredirlabs/leagueos",
  },
  {
    id: "proj_04",
    name: "AredirLabs.com",
    slug: "aredirlabs-com",
    status: "active" as const,
    stage: "mvp" as const,
    currentFocus: "Workspace governance and operational accuracy",
    nextStep: "Q3 Knowledge Base quarterly review preparation",
    targetDate: new Date("2026-09-12T00:00:00.000Z"),
    category: "Web",
    description:
      "The Aredir Labs public website and internal workspace. Platform includes project registry, documentation hub, prompt library, and Knowledge Asset Registry on Neon Postgres, Drizzle, and Better Auth.",
    repoUrl: "https://github.com/aredirlabs/aredirlabs-com",
    publicUrl: "https://aredirlabs.com",
  },
];

const milestones = [
  {
    id: "ms_alignfit_01",
    projectId: "proj_01",
    title: "Dashboard stabilization",
    description:
      "Stabilize AlignFit dashboard flows, fix regressions, and align UI state with backend data during UAT.",
    status: "completed" as const,
    completedAt: new Date("2026-06-10T00:00:00.000Z"),
    sortOrder: 1,
  },
  {
    id: "ms_alignfit_02",
    projectId: "proj_01",
    title: "Neon + Better Auth platform validation",
    description:
      "Validate Neon Postgres persistence, Better Auth sessions, Drizzle migrations, and environment parity across dev and production.",
    status: "completed" as const,
    completedAt: new Date("2026-06-08T00:00:00.000Z"),
    sortOrder: 2,
  },
  {
    id: "ms_alignfit_03",
    projectId: "proj_01",
    title: "External tester readiness",
    description:
      "Prepare onboarding, feedback capture, coach intelligence validation, and release notes for the first external tester cohort.",
    status: "active" as const,
    targetDate: new Date("2026-07-15T00:00:00.000Z"),
    sortOrder: 3,
  },
  {
    id: "ms_classforge_01",
    projectId: "proj_02",
    title: "Prototype consolidation",
    description:
      "Merge overlapping prototype branches and document the educator workflow assumptions to revisit.",
    status: "deferred" as const,
    sortOrder: 1,
  },
  {
    id: "ms_classforge_02",
    projectId: "proj_02",
    title: "Lesson planning MVP",
    description:
      "Define the minimum lesson-planning flow for a single educator persona.",
    status: "planned" as const,
    targetDate: new Date("2026-10-01T00:00:00.000Z"),
    sortOrder: 2,
  },
  {
    id: "ms_leagueos_01",
    projectId: "proj_03",
    title: "Football-first simulation design",
    description:
      "Draft core franchise management loops and football-specific simulation rules.",
    status: "active" as const,
    targetDate: new Date("2026-08-15T00:00:00.000Z"),
    sortOrder: 1,
  },
  {
    id: "ms_leagueos_02",
    projectId: "proj_03",
    title: "League model validation",
    description:
      "Validate league structure, roster rules, and season progression with paper prototypes.",
    status: "planned" as const,
    targetDate: new Date("2026-09-01T00:00:00.000Z"),
    sortOrder: 2,
  },
  {
    id: "ms_aredir_01",
    projectId: "proj_04",
    title: "Internal workspace foundation",
    description:
      "Protected workspace shell, project registry, detail pages, and notes/decision log.",
    status: "completed" as const,
    completedAt: new Date("2026-06-01T00:00:00.000Z"),
    sortOrder: 1,
  },
  {
    id: "ms_aredir_02",
    projectId: "proj_04",
    title: "Project milestones and status dashboard",
    description:
      "Operational status fields, milestone tracking, and company operating snapshot.",
    status: "completed" as const,
    completedAt: new Date("2026-06-08T00:00:00.000Z"),
    sortOrder: 2,
  },
  {
    id: "ms_aredir_03",
    projectId: "proj_04",
    title: "Documentation hub",
    description:
      "Searchable project documentation hub with categories and project detail links.",
    status: "completed" as const,
    completedAt: new Date("2026-06-10T00:00:00.000Z"),
    sortOrder: 3,
  },
  {
    id: "ms_aredir_04",
    projectId: "proj_04",
    title: "Prompt library",
    description:
      "Cross-project prompt library with filters and project-attached prompt history.",
    status: "completed" as const,
    completedAt: new Date("2026-06-11T00:00:00.000Z"),
    sortOrder: 4,
  },
  {
    id: "ms_aredir_05",
    projectId: "proj_04",
    title: "Knowledge Asset Registry",
    description:
      "Governance registry for promoted Knowledge Base assets with adoption matrix and review visibility.",
    status: "completed" as const,
    completedAt: new Date("2026-06-14T00:00:00.000Z"),
    sortOrder: 5,
  },
  {
    id: "ms_aredir_06",
    projectId: "proj_04",
    title: "Q3 Knowledge Base quarterly review",
    description:
      "First registry-backed quarterly review: validate seeded adoption data, refresh asset metadata, and update review dates.",
    status: "active" as const,
    targetDate: new Date("2026-09-12T00:00:00.000Z"),
    sortOrder: 6,
  },
];

const notes = [
  {
    id: "note_alignfit_01",
    projectId: "proj_01",
    type: "qa" as const,
    title: "UAT testing cycle in progress",
    body:
      "AlignFit is in user acceptance testing on Neon Postgres, Better Auth, Cloudflare R2, and Vercel. Current priorities: UAT regression tracking, coach intelligence hardening, and external tester onboarding. Record blockers with reproduction steps and release impact.",
  },
  {
    id: "note_classforge_01",
    projectId: "proj_02",
    type: "note" as const,
    title: "Prototype paused",
    body:
      "ClassForge development is paused while the core lesson-planning prototype is evaluated. Resume when educator workflow assumptions are validated.",
  },
  {
    id: "note_leagueos_01",
    projectId: "proj_03",
    type: "decision" as const,
    title: "Football-first planning scope",
    body:
      "LeagueOS planning will stay football-first for the initial concept phase. Other sports expand only after core franchise management flows are defined.",
  },
  {
    id: "note_aredirlabs_01",
    projectId: "proj_04",
    type: "release" as const,
    title: "Workspace foundation shipped",
    body:
      "AredirLabs.com workspace now includes project registry, milestones, notes, documentation hub, prompt library, and Knowledge Asset Registry. Use this project for internal platform work, governance tooling, and release notes.",
  },
];

const documents = [
  {
    id: "doc_alignfit_architecture_platform_overview",
    projectId: "proj_01",
    category: "architecture" as const,
    title: "Platform overview",
    slug: "platform-overview",
    content:
      "AlignFit combines fitness planning, nutrition guidance, recovery tracking, and coaching workflows into a single authenticated product surface.\n\nThe platform runs on Neon Postgres, Drizzle ORM, Better Auth, Cloudflare R2, and Vercel. Architecture follows the promoted AI Intelligence, Context Builder, and Response Contract patterns from coach evolution work.",
  },
  {
    id: "doc_alignfit_decision_neon_better_auth",
    projectId: "proj_01",
    category: "decision" as const,
    title: "Neon + Better Auth architecture",
    slug: "neon-better-auth-architecture",
    content:
      "Decision: AlignFit uses Better Auth for authentication and Neon Postgres for the persistent application database.\n\nThis provides a Postgres-native foundation with Drizzle migrations and a clean authentication boundary. Supabase is no longer part of the platform stack.",
  },
  {
    id: "doc_alignfit_qa_uat_testing_cycle_notes",
    projectId: "proj_01",
    category: "qa" as const,
    title: "UAT testing cycle notes",
    slug: "uat-testing-cycle-notes",
    content:
      "The current UAT cycle should focus on onboarding clarity, dashboard stability, auth/session reliability, coach intelligence outputs, and database-backed persistence.\n\nRecord regressions with reproduction steps, expected behavior, actual behavior, and release impact. Separate blocker findings from polish notes so release readiness remains clear.",
  },
  {
    id: "doc_classforge_research_product_direction",
    projectId: "proj_02",
    category: "research" as const,
    title: "Product direction",
    slug: "product-direction",
    content:
      "ClassForge is paused while the educator workflow is narrowed to a practical lesson-planning MVP.\n\nResearch should validate which planning artifacts save teachers the most time, how much editing control educators expect, and which exports or classroom systems matter for the first useful release.",
  },
  {
    id: "doc_leagueos_decision_football_first_launch_strategy",
    projectId: "proj_03",
    category: "decision" as const,
    title: "Football-first launch strategy",
    slug: "football-first-launch-strategy",
    content:
      "Decision: LeagueOS should launch with football as the first modeled sport.\n\nFootball gives the initial product a clear roster structure, season rhythm, and strategy vocabulary. Other sports should wait until franchise management, progression, and simulation loops are validated.",
  },
  {
    id: "doc_aredirlabs_architecture_workspace_foundation",
    projectId: "proj_04",
    category: "architecture" as const,
    title: "Workspace foundation",
    slug: "workspace-foundation",
    content:
      "AredirLabs.com includes a protected workspace for project registry, operating status, milestones, notes, documentation hub, prompt library, and Knowledge Asset Registry.\n\nThe workspace is intentionally lightweight: durable project memory belongs in Postgres, operational views stay searchable and simple, and richer collaboration features remain outside the current scope.",
  },
];

const prompts = [
  {
    id: "prompt_alignfit_migration_verification",
    projectId: "proj_01",
    title: "Neon stack platform validation",
    promptType: "qa" as const,
    promptBody:
      "Validate Neon Postgres persistence, Better Auth sessions, Drizzle migrations, and dashboard data integrity on the current platform stack.",
    resultSummary:
      "Neon + Better Auth stack validated. Supabase migration complete; environment parity confirmed across dev and production.",
    filesChanged: "Database config, auth integration, QA checklist",
    verification: "Migrations, seed data, and dashboard smoke tests passed.",
    followUps: "Monitor auth and persistence during external tester onboarding.",
    status: "verified" as const,
  },
  {
    id: "prompt_alignfit_dashboard_ui_refinement",
    projectId: "proj_01",
    title: "Dashboard UI refinement",
    promptType: "ui" as const,
    promptBody:
      "Tighten dashboard hierarchy, empty states, and status surfaces for UAT testers.",
    resultSummary:
      "Dashboard polish focused on scannability and clearer next actions.",
    filesChanged: "Dashboard cards, status panels, empty states",
    verification: "Manual viewport pass on mobile and desktop.",
    followUps: "Collect tester confusion points after first UAT pass.",
    status: "run" as const,
  },
  {
    id: "prompt_alignfit_nutrition_qa_stabilization",
    projectId: "proj_01",
    title: "Nutrition QA stabilization",
    promptType: "bugfix" as const,
    promptBody:
      "Audit nutrition flows for persistence regressions and confusing validation states.",
    resultSummary:
      "Identified QA focus areas for food logging, generated plans, and saved preferences.",
    filesChanged: "Nutrition QA notes",
    verification: "Repeat nutrition entry and refresh persistence checks.",
    followUps: "Promote any reproduced failures into bug reports.",
    status: "drafted" as const,
  },
  {
    id: "prompt_aredir_workspace_foundation",
    projectId: "proj_04",
    title: "Workspace foundation",
    promptType: "implementation" as const,
    promptBody:
      "Build the protected workspace shell with project registry and detail pages.",
    resultSummary:
      "Workspace foundation shipped with protected navigation and project memory surfaces.",
    filesChanged: "Workspace layout, registry routes, project detail components",
    verification: "Sign-in flow and project registry smoke tested.",
    followUps: "Continue layering lightweight project memory features.",
    status: "verified" as const,
  },
  {
    id: "prompt_aredir_documentation_hub",
    projectId: "proj_04",
    title: "Documentation hub implementation",
    promptType: "documentation" as const,
    promptBody:
      "Add a searchable project documentation hub with categories and project detail links.",
    resultSummary:
      "Documentation hub added for architecture, decisions, QA, prompts, research, and releases.",
    filesChanged: "Docs route, document table, document project section",
    verification: "Seeded docs display in hub and project detail pages.",
    followUps: "Keep docs concise and project-attached.",
    status: "verified" as const,
  },
  {
    id: "prompt_aredir_branding_asset_cleanup",
    projectId: "proj_04",
    title: "Branding asset cleanup",
    promptType: "ui" as const,
    promptBody:
      "Clean up brand marks, favicon exports, and public site asset references.",
    resultSummary:
      "Brand asset system clarified for light/dark logo and mark usage.",
    filesChanged: "Public brand assets, logo components, brand scripts",
    verification: "Check favicon and header mark rendering in both themes.",
    followUps: "Document any future export naming changes.",
    status: "run" as const,
  },
  {
    id: "prompt_aredir_knowledge_asset_registry",
    projectId: "proj_04",
    title: "Knowledge Asset Registry",
    promptType: "implementation" as const,
    promptBody:
      "Build a read-only Knowledge Asset Registry for promoted Knowledge Base assets with adoption matrix and review visibility.",
    resultSummary:
      "Governance registry shipped with 12 seeded assets, filters, adoption matrix, and review dashboard.",
    filesChanged:
      "Knowledge assets routes, registry seed, workspace navigation, WORKSPACE_008 documentation",
    verification: "Lint, build, and manual QA of list and detail pages.",
    followUps: "Sync registry seed on future KB promotions and quarterly reviews.",
    status: "verified" as const,
  },
];

async function seed() {
  console.log("Seeding workspace_settings...");
  const settingsResult = await db
    .insert(workspaceSettings)
    .values(settings)
    .onConflictDoNothing({ target: workspaceSettings.companySlug })
    .returning({ id: workspaceSettings.id });

  if (settingsResult.length > 0) {
    console.log(`  ✓ ${settings.companyName}`);
  } else {
    console.log(`  − ${settings.companyName} (already exists)`);
  }

  console.log("Seeding workspace_projects...");
  let inserted = 0;

  for (const project of projects) {
    const result = await db
      .insert(workspaceProjects)
      .values(project)
      .onConflictDoUpdate({
        target: workspaceProjects.slug,
        set: {
          status: project.status,
          stage: project.stage,
          currentFocus: project.currentFocus,
          nextStep: project.nextStep,
          targetDate: project.targetDate ?? null,
          category: project.category,
          description: project.description,
          repoUrl: project.repoUrl,
          publicUrl: project.publicUrl ?? null,
          updatedAt: new Date(),
        },
      })
      .returning({ id: workspaceProjects.id });

    if (result.length > 0) {
      console.log(`  ✓ ${project.name}`);
      inserted++;
    }
  }

  console.log(`Done. ${inserted} projects upserted.`);

  console.log("Seeding workspace_project_milestones...");
  let milestonesInserted = 0;

  for (const milestone of milestones) {
    const result = await db
      .insert(workspaceProjectMilestones)
      .values(milestone)
      .onConflictDoUpdate({
        target: workspaceProjectMilestones.id,
        set: {
          title: milestone.title,
          description: milestone.description ?? null,
          status: milestone.status,
          targetDate: milestone.targetDate ?? null,
          completedAt: milestone.completedAt ?? null,
          sortOrder: milestone.sortOrder,
          updatedAt: new Date(),
        },
      })
      .returning({ id: workspaceProjectMilestones.id });

    if (result.length > 0) {
      console.log(`  ✓ ${milestone.title}`);
      milestonesInserted++;
    }
  }

  console.log(`Done. ${milestonesInserted} milestones upserted.`);

  console.log("Seeding workspace_project_notes...");
  let notesInserted = 0;

  for (const note of notes) {
    const result = await db
      .insert(workspaceProjectNotes)
      .values(note)
      .onConflictDoUpdate({
        target: workspaceProjectNotes.id,
        set: {
          type: note.type,
          title: note.title,
          body: note.body,
          updatedAt: new Date(),
        },
      })
      .returning({ id: workspaceProjectNotes.id });

    if (result.length > 0) {
      console.log(`  ✓ ${note.title}`);
      notesInserted++;
    }
  }

  console.log(`Done. ${notesInserted} notes upserted.`);

  console.log("Seeding workspace_project_documents...");
  let documentsInserted = 0;

  for (const document of documents) {
    const result = await db
      .insert(workspaceProjectDocuments)
      .values(document)
      .onConflictDoUpdate({
        target: workspaceProjectDocuments.id,
        set: {
          category: document.category,
          title: document.title,
          slug: document.slug,
          content: document.content,
          updatedAt: new Date(),
        },
      })
      .returning({ id: workspaceProjectDocuments.id });

    if (result.length > 0) {
      console.log(`  + ${document.title}`);
      documentsInserted++;
    }
  }

  console.log(`Done. ${documentsInserted} documents upserted.`);

  console.log("Seeding workspace_project_prompts...");
  let promptsInserted = 0;

  for (const prompt of prompts) {
    const result = await db
      .insert(workspaceProjectPrompts)
      .values(prompt)
      .onConflictDoUpdate({
        target: workspaceProjectPrompts.id,
        set: {
          title: prompt.title,
          promptType: prompt.promptType,
          promptBody: prompt.promptBody,
          resultSummary: prompt.resultSummary ?? null,
          filesChanged: prompt.filesChanged ?? null,
          verification: prompt.verification ?? null,
          followUps: prompt.followUps ?? null,
          status: prompt.status,
          updatedAt: new Date(),
        },
      })
      .returning({ id: workspaceProjectPrompts.id });

    if (result.length > 0) {
      console.log(`  + ${prompt.title}`);
      promptsInserted++;
    }
  }

  console.log(`Done. ${promptsInserted} prompts upserted.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
