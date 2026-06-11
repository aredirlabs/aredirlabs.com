import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const REQUIRED_PROJECT_COLUMNS = [
  "status",
  "stage",
  "current_focus",
  "next_step",
  "target_date",
];

const REQUIRED_TABLES = [
  "user",
  "session",
  "account",
  "verification",
  "workspace_projects",
  "workspace_settings",
  "workspace_project_notes",
  "workspace_project_milestones",
];

async function main() {
  const tables = await sql`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_name = ANY(${REQUIRED_TABLES})
    ORDER BY table_name
  `;

  const foundTables = tables.map((row) => row.table_name);
  const missingTables = REQUIRED_TABLES.filter(
    (name) => !foundTables.includes(name),
  );

  if (missingTables.length > 0) {
    console.error(`ERROR: Missing tables: ${missingTables.join(", ")}`);
    process.exit(1);
  }

  console.log(`CONFIRMED: ${foundTables.length} required tables present.`);

  const columns = await sql`
    SELECT column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'workspace_projects'
      AND column_name = ANY(${REQUIRED_PROJECT_COLUMNS})
    ORDER BY column_name
  `;

  const foundColumns = columns.map((row) => row.column_name);
  const missingColumns = REQUIRED_PROJECT_COLUMNS.filter(
    (name) => !foundColumns.includes(name),
  );

  if (missingColumns.length > 0) {
    console.error(
      `ERROR: Missing workspace_projects columns: ${missingColumns.join(", ")}`,
    );
    process.exit(1);
  }

  console.log(
    `CONFIRMED: workspace_projects has 006 columns (${foundColumns.join(", ")}).`,
  );

  const [settingsCount] = await sql`
    SELECT COUNT(*)::int AS count FROM workspace_settings
  `;
  const [projectsCount] = await sql`
    SELECT COUNT(*)::int AS count FROM workspace_projects
  `;
  const [notesCount] = await sql`
    SELECT COUNT(*)::int AS count FROM workspace_project_notes
  `;
  const [milestonesCount] = await sql`
    SELECT COUNT(*)::int AS count FROM workspace_project_milestones
  `;

  console.log(`workspace_settings rows: ${settingsCount.count}`);
  console.log(`workspace_projects rows: ${projectsCount.count}`);
  console.log(`workspace_project_notes rows: ${notesCount.count}`);
  console.log(`workspace_project_milestones rows: ${milestonesCount.count}`);

  if (settingsCount.count !== 1) {
    console.error("ERROR: Expected exactly 1 workspace_settings row.");
    process.exit(1);
  }

  if (projectsCount.count !== 4) {
    console.error("ERROR: Expected exactly 4 workspace_projects rows.");
    process.exit(1);
  }

  if (notesCount.count < 4) {
    console.error("ERROR: Expected at least 4 workspace_project_notes rows.");
    process.exit(1);
  }

  if (milestonesCount.count < 9) {
    console.error("ERROR: Expected at least 9 workspace_project_milestones rows.");
    process.exit(1);
  }

  const statusSample = await sql`
    SELECT status::text AS status, stage::text AS stage
    FROM workspace_projects
    ORDER BY slug
    LIMIT 4
  `;

  console.log("Project status/stage sample:");
  for (const row of statusSample) {
    console.log(`  - ${row.status} / ${row.stage}`);
  }

  console.log("Production 006 verification passed.");
}

main().catch((err) => {
  console.error("Production verification failed:", err.message);
  process.exit(1);
});
