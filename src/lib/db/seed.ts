import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import {
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
    status: "Active Build" as const,
    category: "Fitness",
    description:
      "AI-powered fitness, nutrition, recovery, and coaching platform. Currently in active development and user acceptance testing.",
    repoUrl: "https://github.com/aredirlabs/alignfit",
  },
  {
    id: "proj_02",
    name: "ClassForge",
    slug: "classforge",
    status: "In Development" as const,
    category: "Education",
    description:
      "AI-assisted education platform for lesson planning and educator productivity.",
    repoUrl: "https://github.com/aredirlabs/classforge",
  },
  {
    id: "proj_03",
    name: "LeagueOS",
    slug: "leagueos",
    status: "Concept" as const,
    category: "Sports",
    description:
      "Fantasy sports franchise management platform, currently in early-stage design and development.",
    repoUrl: "https://github.com/aredirlabs/leagueos",
  },
  {
    id: "proj_04",
    name: "AredirLabs.com",
    slug: "aredirlabs-com",
    status: "Active Build" as const,
    category: "Web",
    description:
      "The Aredir Labs public website and internal workspace.",
    repoUrl: "https://github.com/aredirlabs/aredirlabs-com",
    publicUrl: "https://aredirlabs.com",
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
  let skipped = 0;

  for (const project of projects) {
    const result = await db
      .insert(workspaceProjects)
      .values(project)
      .onConflictDoNothing({ target: workspaceProjects.slug })
      .returning({ id: workspaceProjects.id });

    if (result.length > 0) {
      console.log(`  ✓ ${project.name}`);
      inserted++;
    } else {
      console.log(`  − ${project.name} (already exists)`);
      skipped++;
    }
  }

  console.log(`Done. ${inserted} projects inserted, ${skipped} skipped.`);

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
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
