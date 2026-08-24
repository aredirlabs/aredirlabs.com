import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";

const migrationPath = fileURLToPath(
  new URL("../../../drizzle/0007_operational_focus.sql", import.meta.url),
);
const migrationSql = readFileSync(migrationPath, "utf8");

test("migration 0007 defines append-only guards for focus events", () => {
  assert.match(migrationSql, /prevent_workspace_project_focus_events_mutation/);
  assert.match(
    migrationSql,
    /BEFORE UPDATE OR DELETE ON "workspace_project_focus_events"/,
  );
  assert.match(migrationSql, /BEFORE TRUNCATE ON "workspace_project_focus_events"/);
});

test("migration 0007 prevents focus selection UPDATE while allowing DELETE semantics", () => {
  assert.match(migrationSql, /prevent_workspace_project_focus_selection_update/);
  assert.match(migrationSql, /BEFORE UPDATE ON "workspace_project_focus_selection"/);
  assert.doesNotMatch(
    migrationSql,
    /BEFORE DELETE ON "workspace_project_focus_selection"/,
  );
});

test("migration 0007 validates selected-event attribution on selection insert/update", () => {
  assert.match(migrationSql, /workspace_project_focus_selection_selected_event_effect_guard/);
  assert.match(migrationSql, /event\."effect" = 'selected'/);
});

test("migration 0007 uses NULL-safe human provenance CHECK branches", () => {
  assert.match(migrationSql, /"action_actor_type" IS NOT NULL/);
  assert.match(migrationSql, /"decision_actor_identifier" IS NOT NULL/);
  assert.match(migrationSql, /"authority_type" IS NOT NULL/);
  assert.match(migrationSql, /"authority_type" = 'human_owner'/);
});

test("migration 0007 uses NULL-safe invalidation provenance CHECK branches", () => {
  assert.match(migrationSql, /"authority_reference" IS NOT NULL/);
  assert.match(migrationSql, /"rationale" IS NOT NULL/);
  assert.match(migrationSql, /"based_on_event_id" IS NOT NULL/);
  assert.match(migrationSql, /"decision_actor_display_name" IS NULL/);
});

test("migration 0007 creates scope index before selection composite FK", () => {
  const scopeIdx = migrationSql.indexOf(
    'CREATE UNIQUE INDEX "workspace_project_focus_events_scope_idx"',
  );
  const selectionTable = migrationSql.indexOf(
    'CREATE TABLE "workspace_project_focus_selection"',
  );
  assert.ok(scopeIdx >= 0);
  assert.ok(selectionTable > scopeIdx);
});

test("migration 0007 defines partial selected-scope index", () => {
  assert.match(migrationSql, /workspace_project_focus_events_selected_scope_idx/);
  assert.match(migrationSql, /WHERE "effect" = 'selected'/);
});
