import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const envFile = resolve(".env.production.local");
const command = process.argv[2];

function fail(message) {
  console.error(`\nERROR: ${message}\n`);
  process.exit(1);
}

if (process.env.CONFIRM_PROD_DB !== "true") {
  fail(
    "Production database commands require explicit confirmation.\n" +
      "Set CONFIRM_PROD_DB=true to continue.\n\n" +
      "Example:\n" +
      "  CONFIRM_PROD_DB=true npm run db:push:prod\n" +
      "  CONFIRM_PROD_DB=true npm run db:seed:prod",
  );
}

if (!existsSync(envFile)) {
  fail(
    ".env.production.local was not found.\n" +
      "Create it locally with the aredirlabs-prod DATABASE_URL and production auth URLs.\n" +
      "This file is gitignored and must never be committed.",
  );
}

const commands = {
  push: {
    bin: "node_modules/drizzle-kit/bin.cjs",
    args: ["push"],
  },
  seed: {
    bin: "node_modules/tsx/dist/cli.mjs",
    args: ["src/lib/db/seed.ts"],
  },
};

const target = commands[command];

if (!target) {
  fail(`Unknown production database command "${command ?? ""}".`);
}

const result = spawnSync(
  process.execPath,
  ["--env-file=.env.production.local", target.bin, ...target.args],
  { stdio: "inherit", shell: false },
);

process.exit(result.status ?? 1);
