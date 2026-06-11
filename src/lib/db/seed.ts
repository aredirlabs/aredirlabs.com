import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import {
  workspaceProjectDocuments,
  workspaceProjectMilestones,
  workspaceProjectNotes,
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
    currentFocus: "Dashboard stabilization and Supabase/Neon QA",
    nextStep: "Initial external tester readiness",
    targetDate: new Date("2026-07-15T00:00:00.000Z"),
    category: "Fitness",
    description:
      "AI-powered fitness, nutrition, recovery, and coaching platform. Currently in active development and user acceptance testing.",
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
    currentFocus: "Internal workspace foundation",
    nextStep: "Project milestones and status dashboard",
    targetDate: new Date("2026-06-30T00:00:00.000Z"),
    category: "Web",
    description:
      "The Aredir Labs public website and internal workspace.",
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
      "Stabilize the AlignFit dashboard flows, fix regressions, and align UI state with backend data.",
    status: "active" as const,
    targetDate: new Date("2026-06-20T00:00:00.000Z"),
    sortOrder: 1,
  },
  {
    id: "ms_alignfit_02",
    projectId: "proj_01",
    title: "Supabase/Neon QA",
    description:
      "Validate database migration paths, auth flows, and environment parity between Supabase and Neon.",
    status: "active" as const,
    targetDate: new Date("2026-06-25T00:00:00.000Z"),
    sortOrder: 2,
  },
  {
    id: "ms_alignfit_03",
    projectId: "proj_01",
    title: "Initial external tester readiness",
    description:
      "Prepare onboarding, feedback capture, and release notes for the first external tester cohort.",
    status: "planned" as const,
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
      "Add operational status fields, milestone tracking, and company operating snapshot.",
    status: "active" as const,
    targetDate: new Date("2026-06-30T00:00:00.000Z"),
    sortOrder: 2,
  },
];

const notes = [
  {
    id: "note_alignfit_01",
    projectId: "proj_01",
    type: "qa" as const,
    title: "UAT testing cycle in progress",
    body:
      "Current focus is the AlignFit user acceptance testing cycle. Track regressions, onboarding feedback, and release blockers here until the next production cut.",
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
      "AredirLabs.com now includes the protected workspace shell, project registry, and detail pages. Use this project for internal platform work and release notes.",
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
      "AlignFit combines fitness planning, nutrition guidance, recovery tracking, and coaching workflows into a single authenticated product surface.\n\nThe platform is organized around durable user state, dashboard summaries, and QA-visible release checkpoints. Database changes should preserve tester data and keep environment parity visible during UAT.",
  },
  {
    id: "doc_alignfit_decision_neon_better_auth",
    projectId: "proj_01",
    category: "decision" as const,
    title: "Neon + Better Auth architecture",
    slug: "neon-better-auth-architecture",
    content:
      "Decision: keep authentication on Better Auth and use Neon Postgres for the persistent application database.\n\nThis gives the product a Postgres-native foundation, repeatable migrations, and a clean authentication boundary while avoiding a larger platform migration during UAT.",
  },
  {
    id: "doc_alignfit_qa_uat_testing_cycle_notes",
    projectId: "proj_01",
    category: "qa" as const,
    title: "UAT testing cycle notes",
    slug: "uat-testing-cycle-notes",
    content:
      "The current UAT cycle should focus on onboarding clarity, dashboard stability, auth/session reliability, and database-backed persistence.\n\nRecord regressions with reproduction steps, expected behavior, actual behavior, and release impact. Separate blocker findings from polish notes so release readiness remains clear.",
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
      "AredirLabs.com includes a protected workspace for project registry, operating status, milestones, notes, and now project documentation.\n\nThe workspace is intentionally lightweight: durable project memory belongs in Postgres, operational views stay searchable and simple, and richer collaboration features should remain outside the current scope.",
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
  let milestonesSkipped = 0;

  for (const milestone of milestones) {
    const result = await db
      .insert(workspaceProjectMilestones)
      .values(milestone)
      .onConflictDoNothing({ target: workspaceProjectMilestones.id })
      .returning({ id: workspaceProjectMilestones.id });

    if (result.length > 0) {
      console.log(`  ✓ ${milestone.title}`);
      milestonesInserted++;
    } else {
      console.log(`  − ${milestone.title} (already exists)`);
      milestonesSkipped++;
    }
  }

  console.log(
    `Done. ${milestonesInserted} milestones inserted, ${milestonesSkipped} skipped.`,
  );

  console.log("Seeding workspace_project_notes...");
  let notesInserted = 0;
  let notesSkipped = 0;

  for (const note of notes) {
    const result = await db
      .insert(workspaceProjectNotes)
      .values(note)
      .onConflictDoNothing({ target: workspaceProjectNotes.id })
      .returning({ id: workspaceProjectNotes.id });

    if (result.length > 0) {
      console.log(`  ✓ ${note.title}`);
      notesInserted++;
    } else {
      console.log(`  − ${note.title} (already exists)`);
      notesSkipped++;
    }
  }

  console.log(
    `Done. ${notesInserted} notes inserted, ${notesSkipped} skipped.`,
  );

  console.log("Seeding workspace_project_documents...");
  let documentsInserted = 0;
  let documentsSkipped = 0;

  for (const document of documents) {
    const result = await db
      .insert(workspaceProjectDocuments)
      .values(document)
      .onConflictDoNothing({ target: workspaceProjectDocuments.id })
      .returning({ id: workspaceProjectDocuments.id });

    if (result.length > 0) {
      console.log(`  + ${document.title}`);
      documentsInserted++;
    } else {
      console.log(`  - ${document.title} (already exists)`);
      documentsSkipped++;
    }
  }

  console.log(
    `Done. ${documentsInserted} documents inserted, ${documentsSkipped} skipped.`,
  );
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
