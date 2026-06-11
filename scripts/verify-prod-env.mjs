import { readFileSync, existsSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

function loadDatabaseUrl(envFile) {
  if (!existsSync(envFile)) return null;
  const content = readFileSync(envFile, "utf8");
  const match = content.match(/^DATABASE_URL=(.+)$/m);
  return match?.[1]?.trim().replace(/^["']|["']$/g, "") ?? null;
}

function fingerprint(url) {
  if (!url) return null;
  return `${url.length}:${url.slice(-12)}`;
}

async function main() {
  if (!existsSync(".env.production.local")) {
    console.error("ERROR: .env.production.local not found.");
    process.exit(1);
  }

  const prodUrl = loadDatabaseUrl(".env.production.local");
  const devUrl = loadDatabaseUrl(".env.local");

  if (!prodUrl) {
    console.error("ERROR: DATABASE_URL missing in .env.production.local.");
    process.exit(1);
  }

  console.log("CONFIRMED: .env.production.local exists with DATABASE_URL set.");

  const content = readFileSync(".env.production.local", "utf8");
  if (content.includes("aredirlabs-prod")) {
    console.log("CONFIRMED: env file references aredirlabs-prod by name.");
  } else {
    console.log(
      "NOTE: Neon connection strings may not include project name; verifying prod is distinct from dev.",
    );
  }

  if (devUrl && prodUrl === devUrl) {
    console.error(
      "ERROR: Production DATABASE_URL matches development — aborting.",
    );
    process.exit(1);
  }

  if (devUrl) {
    console.log(
      `CONFIRMED: prod DATABASE_URL differs from dev (fingerprints: prod=${fingerprint(prodUrl)}, dev=${fingerprint(devUrl)}).`,
    );
  }

  const sql = neon(prodUrl);
  await sql`SELECT 1`;
  console.log("CONFIRMED: production database connection succeeds.");
}

main().catch((err) => {
  console.error("Production env verification failed:", err.message);
  process.exit(1);
});
