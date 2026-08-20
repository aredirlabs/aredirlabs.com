import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

import { neon } from "@neondatabase/serverless";

const TARGET_ID = "eng_work_23e97a29-0b92-47f1-9b93-04c6f07d6df9";
const EXPECTED_ENDPOINT = "ep-nameless-dawn-a61gilim";
const EXPECTED_PROJECT = "plain-band-91202732";
const EXPECTED_BRANCH = "br-crimson-shape-a6q4y35g";
const EXPECTED_OBJECTIVE =
  "Align the configured production/runtime database with the repository-defined Engineering Work schema by applying the existing tracked migrations without altering existing project data.";
const EXPECTED_PRIOR_ACTION =
  "Validate production target identity, authorize guarded migration execution, apply tracked Engineering Work migrations, and verify Workspace/Project/Create recovery.";
const EXPECTED_OUTCOME =
  "Production/runtime Engineering Work schema aligned successfully using tracked migrations 0000–0002. Schema, migration ledger, existing-data integrity, Workspace, Project Engineering Work, and canonical Engineering Work creation were verified operational.";
const EXPECTED_DISPOSITION =
  "No further schema-alignment work is required. Engineering Work Repository Evidence Authoring remains separate follow-on work.";
const EXPECTED_RATIONALE =
  "Outcome and runtime verification satisfy the intended schema-alignment objective.";
const EXPECTED_BASIS =
  "Authenticated production verification confirmed the tracked migration ledger, lifecycle schema, existing-data preservation, Workspace and Project Engineering Work routes, and this record's unchanged Objective and prior Active Next Action.";

function productionUrl() {
  const file = ".env.production.local";
  assert.ok(existsSync(file), `${file} is required.`);
  const match = readFileSync(file, "utf8").match(/^DATABASE_URL=(.+)$/m);
  assert.ok(match?.[1], "Production DATABASE_URL is required.");
  return match[1].trim().replace(/^["']|["']$/g, "");
}

async function main() {
  const url = productionUrl();
  const endpoint = new URL(url).hostname.split(".")[0].replace(/-pooler$/, "");
  assert.equal(endpoint, EXPECTED_ENDPOINT);
  const sql = neon(url);
  const [identity] = await sql.query(`
    SELECT current_database() AS database_name,
           current_setting('neon.project_id', true) AS project_id,
           current_setting('neon.branch_id', true) AS branch_id
  `);
  assert.equal(identity.database_name, "neondb");
  assert.equal(identity.project_id, EXPECTED_PROJECT);
  assert.equal(identity.branch_id, EXPECTED_BRANCH);

  const [ledger] = await sql.query(
    "SELECT count(*)::int AS count FROM drizzle.__drizzle_migrations",
  );
  assert.equal(ledger.count, 5);
  const [projection] = await sql.query(`
    SELECT title, summary, type::text AS type, workflow::text AS workflow,
           state::text AS state, current_next_action, current_outcome,
           condition, condition_rationale, final_disposition, version
      FROM workspace_engineering_work
     WHERE id = $1
  `, [TARGET_ID]);
  assert.ok(projection);
  assert.equal(projection.title, "Production Engineering Work Schema Alignment");
  assert.equal(projection.summary, EXPECTED_OBJECTIVE);
  assert.equal(projection.type, "maintenance");
  assert.equal(projection.workflow, "maintenance");
  assert.equal(projection.state, "completed");
  assert.equal(projection.current_next_action, null);
  assert.equal(projection.current_outcome, EXPECTED_OUTCOME);
  assert.equal(projection.condition, null);
  assert.equal(projection.condition_rationale, null);
  assert.equal(projection.final_disposition, EXPECTED_DISPOSITION);
  assert.equal(projection.version, 2);

  const history = await sql.query(`
    SELECT kind::text AS kind, action_type, prior_state::text AS prior_state,
           resulting_state::text AS resulting_state,
           previous_objective, resulting_objective,
           previous_next_action, resulting_next_action,
           previous_outcome, resulting_outcome,
           previous_condition, resulting_condition,
           resulting_final_disposition, decision, rationale, decision_basis,
           action_actor_type::text AS action_actor_type,
           action_actor_identifier, decision_actor_type::text AS decision_actor_type,
           decision_actor_identifier, decision_role::text AS decision_role,
           authority_type::text AS authority_type
      FROM workspace_engineering_work_history
     WHERE engineering_work_id = $1
     ORDER BY occurred_at, id
  `, [TARGET_ID]);
  assert.equal(history.length, 1);
  const [event] = history;
  assert.equal(event.kind, "lifecycle_transition");
  assert.equal(event.action_type, "complete");
  assert.equal(event.prior_state, "active");
  assert.equal(event.resulting_state, "completed");
  assert.equal(event.previous_objective, EXPECTED_OBJECTIVE);
  assert.equal(event.resulting_objective, EXPECTED_OBJECTIVE);
  assert.equal(event.previous_next_action, EXPECTED_PRIOR_ACTION);
  assert.equal(event.resulting_next_action, null);
  assert.equal(event.previous_outcome, null);
  assert.equal(event.resulting_outcome, EXPECTED_OUTCOME);
  assert.equal(event.previous_condition, null);
  assert.equal(event.resulting_condition, null);
  assert.equal(event.resulting_final_disposition, EXPECTED_DISPOSITION);
  assert.equal(event.decision, "Authorize completion with the stated verified Outcome.");
  assert.equal(event.rationale, EXPECTED_RATIONALE);
  assert.equal(event.decision_basis.summary, EXPECTED_BASIS);
  assert.equal(event.action_actor_type, "human");
  assert.equal(event.decision_actor_type, "human");
  assert.equal(event.action_actor_identifier, event.decision_actor_identifier);
  assert.equal(event.decision_role, "authorization");
  assert.equal(event.authority_type, "human_owner");

  const [allHistory] = await sql.query(
    "SELECT count(*)::int AS count FROM workspace_engineering_work_history",
  );
  assert.equal(allHistory.count, 1, "Acceptance must be the first truthful lifecycle history event.");
  console.log("Production lifecycle acceptance verification passed.");
}

main().catch((error) => {
  console.error(`Production acceptance verification failed: ${error.message}`);
  process.exitCode = 1;
});
