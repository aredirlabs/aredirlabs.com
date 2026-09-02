import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  buildDb,
  readLiveIdentity,
  assertIdentityMatches,
  PRODUCTION_IDENTITY,
} from "./lib/migration-reconcile-engine.mjs";

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
      "  CONFIRM_PROD_DB=true npm run db:migrate:prod\n" +
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

function envValue(name) {
  const raw = readFileSync(envFile, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z0-9_]+)=(.*)$/);
    if (m && m[1] === name) return m[2].trim();
  }
  return "";
}

// Positive live Production identity gate. Required before ANY Production
// mutation command (migrate). Fail-closed on any mismatch.
async function verifyProdIdentityGate() {
  const databaseUrl = envValue("DATABASE_URL");
  if (!databaseUrl) {
    fail("DATABASE_URL was not found in .env.production.local.");
  }
  const sql = buildDb(databaseUrl);
  let identity;
  try {
    identity = await readLiveIdentity(sql);
  } catch (e) {
    fail(`Unable to establish live Production identity: ${e?.message ?? e}`);
  }
  console.log(
    `Identity: project=${identity.projectId} branch=${identity.branchId} endpoint=${identity.endpointId} database=${identity.database}`,
  );
  const { ok, mismatches } = assertIdentityMatches(identity, PRODUCTION_IDENTITY);
  if (!ok) {
    console.error(
      "ERROR: Positive Production identity mismatch; refusing to continue.",
    );
    for (const m of mismatches) {
      console.error(
        `  - ${m.field}: expected "${m.expected}" got "${String(m.actual)}"`,
      );
    }
    fail("Production identity did not exactly match the frozen Production contract.");
  }
  console.log("Positive Production identity: exact match confirmed.");
}

function parseEnvArg(file) {
  return `--env-file=${file}`;
}

const commands = {
  migrate: {
    bin: "node_modules/drizzle-kit/bin.cjs",
    args: ["migrate"],
    identityGate: true,
  },
  push: {
    bin: "scripts/migrate-workspace-006.mjs",
    args: [],
    then: {
      bin: "scripts/migrate-engineering-work-002.mjs",
      args: [],
      then: {
        bin: "node_modules/drizzle-kit/bin.cjs",
        args: ["push"],
      },
    },
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

if (target.identityGate) {
  await verifyProdIdentityGate();
}

function runStep(step) {
  return spawnSync(
    process.execPath,
    [parseEnvArg(envFile), step.bin, ...step.args],
    { stdio: "inherit", shell: false },
  );
}

let result = runStep(target);
let nextStep = target.then;

while ((result.status ?? 1) === 0 && nextStep) {
  result = runStep(nextStep);
  nextStep = nextStep.then;
}

process.exit(result.status ?? 1);
