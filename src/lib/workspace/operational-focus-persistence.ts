import type { EngineeringWorkSqlExecutor } from "./engineering-work-history-persistence";
import type {
  EngineeringWorkActor,
  EngineeringWorkAuthority,
} from "./engineering-work-provenance";
import { normalizeOperationalFocusTargetWorkIds } from "./operational-focus-replace-plan";

export type OperationalFocusPersistenceResult =
  | {
      ok: true;
      focusEventId: string;
      focusVersion: number;
      noChange?: boolean;
    }
  | { ok: false; reason: "not_found_or_stale" | "ineligible" | "not_selected" };

export type OperationalFocusHumanCommandInput = {
  projectSlug: string;
  engineeringWorkId: string;
  expectedFocusVersion: number;
  focusEventId: string;
  selectionId: string;
  batchId: string;
  actionActor: EngineeringWorkActor;
  decisionActor: EngineeringWorkActor;
  authority: EngineeringWorkAuthority;
  rationale?: string | null;
};

export type OperationalFocusClearInput = {
  projectSlug: string;
  expectedFocusVersion: number;
  batchId: string;
  actionActor: EngineeringWorkActor;
  decisionActor: EngineeringWorkActor;
  authority: EngineeringWorkAuthority;
  rationale?: string | null;
};

export type OperationalFocusReplaceAddItem = {
  engineeringWorkId: string;
  focusEventId: string;
  selectionId: string;
};

export type OperationalFocusReplaceInput = {
  projectSlug: string;
  expectedFocusVersion: number;
  batchId: string;
  /** Desired final unordered membership set. Duplicates are rejected before persistence. */
  targetWorkIds: string[];
  /** Pre-generated event/selection identifiers keyed by Work ID for target additions. */
  addItems: OperationalFocusReplaceAddItem[];
  actionActor: EngineeringWorkActor;
  decisionActor: EngineeringWorkActor;
  authority: EngineeringWorkAuthority;
  rationale?: string | null;
};

export type OperationalFocusInvalidationInput = {
  projectId: string;
  engineeringWorkId: string;
  focusEventId: string;
  batchId: string;
  lifecycleEventId: string;
  invalidationRuleReference: string;
  rationale: string;
};

/** Exported for contract tests: version must be guarded before any mutation CTE. */
export const FOCUS_LOCKED_PROJECT_CTE = "locked_project AS (";

/**
 * Unified Operational Focus lock protocol (N-01):
 * 1. Engineering Work row(s) — FOR UPDATE OF work, ORDER BY work.id when multiple
 * 2. Project row — FOR UPDATE OF project (focus_version guard when mutating focus)
 * 3. Selection / focus-event mutations
 *
 * All focus commands and lifecycle completion invalidation follow this order
 * to prevent completion↔Remove/Clear deadlocks.
 */
export const FOCUS_UNIFIED_LOCK_ORDER = ["work", "project", "selection"] as const;

/** @deprecated Use FOCUS_UNIFIED_LOCK_ORDER; retained for existing contract tests. */
export const FOCUS_LOCKS_WORK_BEFORE_PROJECT = "locked_work AS (";

function nonblank(value: string, label: string) {
  const normalized = value.trim();
  if (!normalized) throw new Error(`${label} is required.`);
  return normalized;
}

function optionalText(value: string | null | undefined) {
  if (value == null) return null;
  const normalized = value.trim();
  return normalized || null;
}

function validFocusVersion(version: number) {
  if (!Number.isInteger(version) || version < 0) {
    throw new Error("Focus version must be a non-negative integer.");
  }
  return version;
}

function humanProvenanceParams(
  input: Pick<
    OperationalFocusHumanCommandInput,
    "actionActor" | "decisionActor" | "authority" | "rationale"
  >,
) {
  return [
    optionalText(input.rationale),
    input.actionActor.type,
    input.actionActor.identifier,
    input.actionActor.displayName ?? null,
    input.decisionActor.type,
    input.decisionActor.identifier,
    input.decisionActor.displayName ?? null,
    input.authority.type,
    input.authority.reference ?? null,
    input.authority.context ?? null,
  ];
}

export async function persistOperationalFocusSelectionAdd(
  sql: EngineeringWorkSqlExecutor,
  input: OperationalFocusHumanCommandInput,
): Promise<OperationalFocusPersistenceResult> {
  const expectedVersion = validFocusVersion(input.expectedFocusVersion);
  const rows = await sql.query(
    `WITH locked_work AS (
       SELECT work.id AS engineering_work_id, work.project_id, work.state
       FROM workspace_engineering_work AS work
       JOIN workspace_projects AS project ON project.id = work.project_id
       WHERE project.slug = $1
         AND work.id = $3
       FOR UPDATE OF work
     ), locked_project AS (
       SELECT project.id AS project_id, project.focus_version
       FROM workspace_projects AS project
       JOIN locked_work ON locked_work.project_id = project.id
       WHERE project.slug = $1
         AND project.focus_version = $2
         AND project.status IN ('active', 'testing')
         AND locked_work.state IN ('active', 'in_review')
       FOR UPDATE OF project
     ), existing AS (
       SELECT selection.id
       FROM workspace_project_focus_selection AS selection
       JOIN locked_project ON locked_project.project_id = selection.project_id
       WHERE selection.engineering_work_id = $3
     ), noop AS (
       SELECT locked_project.project_id, locked_project.focus_version
       FROM locked_project
       WHERE EXISTS (SELECT 1 FROM existing)
     ), inserted_event AS (
       INSERT INTO workspace_project_focus_events (
         id, project_id, engineering_work_id, effect, command_context, batch_id,
         rationale,
         action_actor_type, action_actor_identifier, action_actor_display_name,
         decision_actor_type, decision_actor_identifier, decision_actor_display_name,
         authority_type, authority_reference, authority_context,
         occurred_at
       )
       SELECT
         $4, locked_project.project_id, $3, 'selected', 'add', $5,
         $6,
         $7::engineering_work_actor_type, $8, $9,
         $10::engineering_work_actor_type, $11, $12,
         $13::engineering_work_authority_type, $14, $15,
         statement_timestamp()
       FROM locked_project
       WHERE NOT EXISTS (SELECT 1 FROM existing)
       RETURNING id, project_id
     ), inserted_selection AS (
       INSERT INTO workspace_project_focus_selection (
         id, project_id, engineering_work_id, selected_at, selected_by_event_id
       )
       SELECT
         $16, event.project_id, $3, statement_timestamp(), event.id
       FROM inserted_event AS event
       RETURNING project_id
     ), updated_project AS (
       UPDATE workspace_projects AS project
       SET focus_version = project.focus_version + 1,
           updated_at = statement_timestamp()
       FROM inserted_selection AS selection
       WHERE project.id = selection.project_id
       RETURNING project.focus_version, $4::text AS focus_event_id
     )
     SELECT focus_version, focus_event_id, false AS no_change
     FROM updated_project
     UNION ALL
     SELECT focus_version, NULL::text AS focus_event_id, true AS no_change
     FROM noop`,
    [
      nonblank(input.projectSlug, "Project slug"),
      expectedVersion,
      nonblank(input.engineeringWorkId, "Engineering Work ID"),
      nonblank(input.focusEventId, "Focus event ID"),
      nonblank(input.batchId, "Batch ID"),
      ...humanProvenanceParams(input),
      nonblank(input.selectionId, "Selection ID"),
    ],
  );

  const row = rows[0];
  if (!row) {
    return { ok: false, reason: "not_found_or_stale" };
  }
  if (row.no_change === true) {
    return {
      ok: true,
      focusEventId: input.focusEventId,
      focusVersion: Number(row.focus_version),
      noChange: true,
    };
  }
  return {
    ok: true,
    focusEventId: String(row.focus_event_id),
    focusVersion: Number(row.focus_version),
  };
}

export async function persistOperationalFocusSelectionRemove(
  sql: EngineeringWorkSqlExecutor,
  input: OperationalFocusHumanCommandInput,
): Promise<OperationalFocusPersistenceResult> {
  const expectedVersion = validFocusVersion(input.expectedFocusVersion);
  const rows = await sql.query(
    `WITH locked_work AS (
       SELECT work.id AS engineering_work_id, work.project_id
       FROM workspace_engineering_work AS work
       JOIN workspace_projects AS project ON project.id = work.project_id
       WHERE project.slug = $1
         AND work.id = $3
       FOR UPDATE OF work
     ), locked_project AS (
       SELECT project.id AS project_id, project.focus_version
       FROM workspace_projects AS project
       JOIN locked_work ON locked_work.project_id = project.id
       WHERE project.slug = $1
         AND project.focus_version = $2
       FOR UPDATE OF project
     ), removed AS (
       DELETE FROM workspace_project_focus_selection AS selection
       USING locked_project
       WHERE selection.project_id = locked_project.project_id
         AND selection.engineering_work_id = $3
       RETURNING selection.project_id, selection.engineering_work_id
     ), inserted_event AS (
       INSERT INTO workspace_project_focus_events (
         id, project_id, engineering_work_id, effect, command_context, batch_id,
         rationale,
         action_actor_type, action_actor_identifier, action_actor_display_name,
         decision_actor_type, decision_actor_identifier, decision_actor_display_name,
         authority_type, authority_reference, authority_context,
         occurred_at
       )
       SELECT
         $4, removed.project_id, removed.engineering_work_id, 'deselected', 'remove', $5,
         $6,
         $7::engineering_work_actor_type, $8, $9,
         $10::engineering_work_actor_type, $11, $12,
         $13::engineering_work_authority_type, $14, $15,
         statement_timestamp()
       FROM removed
       RETURNING id, project_id
     ), updated_project AS (
       UPDATE workspace_projects AS project
       SET focus_version = project.focus_version + 1,
           updated_at = statement_timestamp()
       FROM inserted_event AS event
       WHERE project.id = event.project_id
       RETURNING project.focus_version, event.id AS focus_event_id
     ), not_selected AS (
       SELECT locked_project.focus_version, NULL::text AS focus_event_id
       FROM locked_project
       WHERE NOT EXISTS (SELECT 1 FROM removed)
     )
     SELECT focus_version, focus_event_id, 'applied'::text AS outcome
     FROM updated_project
     UNION ALL
     SELECT focus_version, focus_event_id, 'not_selected'::text AS outcome
     FROM not_selected`,
    [
      nonblank(input.projectSlug, "Project slug"),
      expectedVersion,
      nonblank(input.engineeringWorkId, "Engineering Work ID"),
      nonblank(input.focusEventId, "Focus event ID"),
      nonblank(input.batchId, "Batch ID"),
      ...humanProvenanceParams(input),
    ],
  );

  const row = rows[0];
  if (!row) {
    return { ok: false, reason: "not_found_or_stale" };
  }
  if (row.outcome === "not_selected") {
    return { ok: false, reason: "not_selected" };
  }
  return {
    ok: true,
    focusEventId: String(row.focus_event_id),
    focusVersion: Number(row.focus_version),
  };
}

export async function persistOperationalFocusClear(
  sql: EngineeringWorkSqlExecutor,
  input: OperationalFocusClearInput,
): Promise<OperationalFocusPersistenceResult> {
  const expectedVersion = validFocusVersion(input.expectedFocusVersion);
  const rows = await sql.query(
    `WITH current_selection_work AS (
       SELECT selection.engineering_work_id
       FROM workspace_project_focus_selection AS selection
       JOIN workspace_projects AS project ON project.id = selection.project_id
       WHERE project.slug = $1
     ), locked_works AS (
       SELECT work.id AS engineering_work_id, work.project_id
       FROM workspace_engineering_work AS work
       JOIN workspace_projects AS project ON project.id = work.project_id
       JOIN current_selection_work ON current_selection_work.engineering_work_id = work.id
       WHERE project.slug = $1
       ORDER BY work.id
       FOR UPDATE OF work
     ), work_lock_barrier AS (
       SELECT COUNT(*)::int AS locked_work_count
       FROM locked_works
     ), locked_project AS (
       SELECT project.id AS project_id, project.focus_version, barrier.locked_work_count
       FROM workspace_projects AS project
       CROSS JOIN work_lock_barrier AS barrier
       WHERE project.slug = $1
         AND project.focus_version = $2
       FOR UPDATE OF project
     ), removed AS (
       DELETE FROM workspace_project_focus_selection AS selection
       USING locked_project AS lp
       WHERE selection.project_id = lp.project_id
         AND (
           lp.locked_work_count = 0
           OR selection.engineering_work_id IN (
             SELECT engineering_work_id FROM locked_works
           )
         )
       RETURNING selection.project_id, selection.engineering_work_id
     ), inserted_events AS (
       INSERT INTO workspace_project_focus_events (
         id, project_id, engineering_work_id, effect, command_context, batch_id,
         rationale,
         action_actor_type, action_actor_identifier, action_actor_display_name,
         decision_actor_type, decision_actor_identifier, decision_actor_display_name,
         authority_type, authority_reference, authority_context,
         occurred_at
       )
       SELECT
         $3 || '-' || removed.engineering_work_id,
         removed.project_id,
         removed.engineering_work_id,
         'deselected',
         'clear',
         $4,
         $5,
         $6::engineering_work_actor_type,
         $7,
         $8,
         $9::engineering_work_actor_type,
         $10,
         $11,
         $12::engineering_work_authority_type,
         $13,
         $14,
         statement_timestamp()
       FROM removed
       RETURNING id, project_id
     ), updated_project AS (
       UPDATE workspace_projects AS project
       SET focus_version = project.focus_version + 1,
           updated_at = statement_timestamp()
       FROM inserted_events AS event
       WHERE project.id = event.project_id
       RETURNING project.focus_version,
         (SELECT id FROM inserted_events ORDER BY id LIMIT 1) AS focus_event_id
     ), noop_empty AS (
       SELECT locked_project.focus_version, NULL::text AS focus_event_id
       FROM locked_project
       WHERE NOT EXISTS (SELECT 1 FROM removed)
     )
     SELECT focus_version, focus_event_id, true AS no_change
     FROM noop_empty
     UNION ALL
     SELECT focus_version, focus_event_id, false AS no_change
     FROM updated_project`,
    [
      nonblank(input.projectSlug, "Project slug"),
      expectedVersion,
      nonblank(input.batchId, "Batch ID prefix"),
      nonblank(input.batchId, "Batch ID"),
      ...humanProvenanceParams(input),
    ],
  );

  const row = rows[0];
  if (!row) {
    return { ok: false, reason: "not_found_or_stale" };
  }
  if (row.no_change === true) {
    return {
      ok: true,
      focusEventId: input.batchId,
      focusVersion: Number(row.focus_version),
      noChange: true,
    };
  }
  return {
    ok: true,
    focusEventId: String(row.focus_event_id),
    focusVersion: Number(row.focus_version),
  };
}

export async function persistOperationalFocusReplace(
  sql: EngineeringWorkSqlExecutor,
  input: OperationalFocusReplaceInput,
): Promise<OperationalFocusPersistenceResult> {
  const expectedVersion = validFocusVersion(input.expectedFocusVersion);
  const targetWorkIds = normalizeOperationalFocusTargetWorkIds(input.targetWorkIds);

  const addItemsByWorkId = new Map(
    input.addItems.map((item) => [
      nonblank(item.engineeringWorkId, "Add Work ID"),
      {
        focusEventId: nonblank(item.focusEventId, "Focus event ID"),
        selectionId: nonblank(item.selectionId, "Selection ID"),
      },
    ]),
  );

  for (const workId of targetWorkIds) {
    if (!addItemsByWorkId.has(workId)) {
      throw new Error(`Replace add metadata is required for target Work ID ${workId}.`);
    }
  }

  const addEventIds = targetWorkIds.map((id) => addItemsByWorkId.get(id)!.focusEventId);
  const addSelectionIds = targetWorkIds.map((id) => addItemsByWorkId.get(id)!.selectionId);

  const rows = await sql.query(
    `WITH normalized_target AS (
       SELECT DISTINCT target_id AS engineering_work_id
       FROM unnest($3::text[]) AS target_id
     ), current_members AS (
       SELECT selection.engineering_work_id
       FROM workspace_project_focus_selection AS selection
       JOIN workspace_projects AS project ON project.id = selection.project_id
       WHERE project.slug = $1
     ), affected_work_ids AS (
       SELECT engineering_work_id FROM normalized_target
       UNION
       SELECT engineering_work_id FROM current_members
     ), locked_works AS (
       SELECT work.id AS engineering_work_id, work.project_id, work.state
       FROM workspace_engineering_work AS work
       JOIN workspace_projects AS project ON project.id = work.project_id
       JOIN affected_work_ids ON affected_work_ids.engineering_work_id = work.id
       WHERE project.slug = $1
       ORDER BY work.id
       FOR UPDATE OF work
     ), locked_project AS (
       SELECT project.id AS project_id, project.focus_version
       FROM workspace_projects AS project
       WHERE project.slug = $1
         AND project.focus_version = $2
         AND project.status IN ('active', 'testing')
         AND (
           SELECT count(*) FROM normalized_target
         ) = (
           SELECT count(*)
           FROM normalized_target AS target
           JOIN locked_works AS work
             ON work.engineering_work_id = target.engineering_work_id
           WHERE work.state IN ('active', 'in_review')
         )
       FOR UPDATE OF project
     ), removed AS (
       DELETE FROM workspace_project_focus_selection AS selection
       USING locked_project
       WHERE selection.project_id = locked_project.project_id
         AND NOT EXISTS (
           SELECT 1
           FROM normalized_target AS target
           WHERE target.engineering_work_id = selection.engineering_work_id
         )
       RETURNING selection.project_id, selection.engineering_work_id
     ), removed_events AS (
       INSERT INTO workspace_project_focus_events (
         id, project_id, engineering_work_id, effect, command_context, batch_id,
         rationale,
         action_actor_type, action_actor_identifier, action_actor_display_name,
         decision_actor_type, decision_actor_identifier, decision_actor_display_name,
         authority_type, authority_reference, authority_context,
         occurred_at
       )
       SELECT
         $4 || '-remove-' || removed.engineering_work_id,
         removed.project_id,
         removed.engineering_work_id,
         'deselected',
         'replace',
         $5,
         $6,
         $7::engineering_work_actor_type, $8, $9,
         $10::engineering_work_actor_type, $11, $12,
         $13::engineering_work_authority_type, $14, $15,
         statement_timestamp()
       FROM removed
       RETURNING id
     ), add_rows AS (
       SELECT
         locked_project.project_id,
         target.engineering_work_id,
         add_meta.event_id,
         add_meta.selection_id
       FROM locked_project
       JOIN normalized_target AS target
         ON TRUE
       JOIN locked_works AS work
         ON work.engineering_work_id = target.engineering_work_id
       JOIN unnest($3::text[], $16::text[], $17::text[])
         WITH ORDINALITY AS add_meta(work_id, event_id, selection_id, ord)
         ON add_meta.work_id = target.engineering_work_id
       WHERE work.state IN ('active', 'in_review')
         AND NOT EXISTS (
           SELECT 1
           FROM workspace_project_focus_selection AS selection
           WHERE selection.project_id = locked_project.project_id
             AND selection.engineering_work_id = target.engineering_work_id
         )
     ), inserted_add_events AS (
       INSERT INTO workspace_project_focus_events (
         id, project_id, engineering_work_id, effect, command_context, batch_id,
         rationale,
         action_actor_type, action_actor_identifier, action_actor_display_name,
         decision_actor_type, decision_actor_identifier, decision_actor_display_name,
         authority_type, authority_reference, authority_context,
         occurred_at
       )
       SELECT
         add_rows.event_id,
         add_rows.project_id,
         add_rows.engineering_work_id,
         'selected',
         'replace',
         $5,
         $6,
         $7::engineering_work_actor_type, $8, $9,
         $10::engineering_work_actor_type, $11, $12,
         $13::engineering_work_authority_type, $14, $15,
         statement_timestamp()
       FROM add_rows
       RETURNING id, project_id, engineering_work_id
     ), inserted_add_selections AS (
       INSERT INTO workspace_project_focus_selection (
         id, project_id, engineering_work_id, selected_at, selected_by_event_id
       )
       SELECT
         add_rows.selection_id,
         inserted_add_events.project_id,
         inserted_add_events.engineering_work_id,
         statement_timestamp(),
         inserted_add_events.id
       FROM inserted_add_events
       JOIN add_rows
         ON add_rows.engineering_work_id = inserted_add_events.engineering_work_id
       RETURNING project_id
     ), updated_project AS (
       UPDATE workspace_projects AS project
       SET focus_version = project.focus_version + 1,
           updated_at = statement_timestamp()
       FROM locked_project
       WHERE project.id = locked_project.project_id
         AND (
           EXISTS (SELECT 1 FROM removed_events)
           OR EXISTS (SELECT 1 FROM inserted_add_selections)
         )
       RETURNING project.focus_version,
         COALESCE(
           (SELECT id FROM inserted_add_events ORDER BY id LIMIT 1),
           (SELECT id FROM removed_events ORDER BY id LIMIT 1)
         ) AS focus_event_id
     )
     SELECT focus_version, focus_event_id, false AS no_change
     FROM updated_project
     UNION ALL
     SELECT locked_project.focus_version, NULL::text AS focus_event_id, true AS no_change
     FROM locked_project
     WHERE NOT EXISTS (SELECT 1 FROM removed)
       AND NOT EXISTS (SELECT 1 FROM add_rows)`,
    [
      nonblank(input.projectSlug, "Project slug"),
      expectedVersion,
      targetWorkIds,
      nonblank(input.batchId, "Batch ID prefix"),
      nonblank(input.batchId, "Batch ID"),
      ...humanProvenanceParams(input),
      addEventIds,
      addSelectionIds,
    ],
  );

  const row = rows[0];
  if (!row) {
    return { ok: false, reason: "not_found_or_stale" };
  }
  if (row.no_change === true) {
    return {
      ok: true,
      focusEventId: input.batchId,
      focusVersion: Number(row.focus_version),
      noChange: true,
    };
  }
  return {
    ok: true,
    focusEventId: String(row.focus_event_id),
    focusVersion: Number(row.focus_version),
  };
}

export async function persistOperationalFocusInvalidationForWork(
  sql: EngineeringWorkSqlExecutor,
  input: OperationalFocusInvalidationInput,
): Promise<{ invalidated: boolean; focusEventId: string | null }> {
  const rows = await sql.query(
    `WITH deleted AS (
       DELETE FROM workspace_project_focus_selection AS selection
       WHERE selection.project_id = $1
         AND selection.engineering_work_id = $2
       RETURNING selection.project_id, selection.engineering_work_id
     ), inserted_event AS (
       INSERT INTO workspace_project_focus_events (
         id, project_id, engineering_work_id, effect, command_context, batch_id,
         rationale,
         action_actor_type, action_actor_identifier,
         authority_type, authority_reference, authority_context,
         based_on_event_id,
         occurred_at
       )
       SELECT
         $3, deleted.project_id, deleted.engineering_work_id, 'invalidated',
         'lifecycle_invalidation', $4, $5,
         'system'::engineering_work_actor_type, 'operational-focus-system',
         'system_rule'::engineering_work_authority_type, $6,
         'Operational focus invalidated by Engineering Work lifecycle rule.',
         $7,
         statement_timestamp()
       FROM deleted
       RETURNING id, project_id
     ), updated_project AS (
       UPDATE workspace_projects AS project
       SET focus_version = project.focus_version + 1,
           updated_at = statement_timestamp()
       FROM inserted_event AS event
       WHERE project.id = event.project_id
       RETURNING event.id AS focus_event_id
     )
     SELECT focus_event_id FROM updated_project`,
    [
      nonblank(input.projectId, "Project ID"),
      nonblank(input.engineeringWorkId, "Engineering Work ID"),
      nonblank(input.focusEventId, "Focus event ID"),
      nonblank(input.batchId, "Batch ID"),
      nonblank(input.rationale, "Invalidation rationale"),
      nonblank(input.invalidationRuleReference, "Invalidation rule reference"),
      nonblank(input.lifecycleEventId, "Lifecycle event ID"),
    ],
  );

  const row = rows[0];
  if (!row) {
    return { invalidated: false, focusEventId: null };
  }
  return { invalidated: true, focusEventId: String(row.focus_event_id) };
}
