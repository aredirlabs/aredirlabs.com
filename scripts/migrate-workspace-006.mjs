import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

const OLD_STATUSES = ["Active Build", "In Development", "Concept"];
const NEW_STATUSES = ["active", "testing", "paused", "planning", "archived"];

async function migrateStatusValues() {
  await sql`
    UPDATE workspace_projects
    SET status = CASE slug
      WHEN 'alignfit' THEN 'testing'
      WHEN 'classforge' THEN 'paused'
      WHEN 'leagueos' THEN 'planning'
      WHEN 'aredirlabs-com' THEN 'active'
      ELSE CASE status
        WHEN 'Active Build' THEN 'active'
        WHEN 'In Development' THEN 'active'
        WHEN 'Concept' THEN 'planning'
        ELSE status
      END
    END
    WHERE status IN ('Active Build', 'In Development', 'Concept')
  `;
}

async function migrate() {
  const tables = await sql`
    SELECT 1
    FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'workspace_projects'
    LIMIT 1
  `;

  if (tables.length === 0) {
    console.log("workspace_projects not found — skipping 006 migration.");
    return;
  }

  const columns = await sql`
    SELECT udt_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'workspace_projects'
      AND column_name = 'status'
    LIMIT 1
  `;

  const udtName = columns[0]?.udt_name;

  const rows = await sql`
    SELECT slug, status::text AS status
    FROM workspace_projects
  `;

  const hasOldValues = rows.some((row) => OLD_STATUSES.includes(row.status));

  if (udtName === "project_status") {
    console.log("Migrating workspace_projects.status enum to text...");
    await sql`ALTER TABLE workspace_projects ALTER COLUMN status DROP DEFAULT`;
    await sql`ALTER TABLE workspace_projects ALTER COLUMN status TYPE text USING status::text`;
    await migrateStatusValues();
    await sql`DROP TYPE IF EXISTS project_status`;
    console.log("006 enum migration complete.");
    return;
  }

  if (hasOldValues) {
    console.log("Updating legacy project status values...");
    await migrateStatusValues();
    console.log("006 status value migration complete.");
    return;
  }

  const hasNewValues = rows.some((row) => NEW_STATUSES.includes(row.status));
  if (hasNewValues) {
    console.log("project status already on 006 values — skipping.");
    return;
  }

  console.log("No legacy status values found — skipping.");
}

migrate().catch((err) => {
  console.error("006 migration failed:", err);
  process.exit(1);
});
