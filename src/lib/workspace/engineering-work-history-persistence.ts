import type {
  EngineeringWorkState,
  EngineeringWorkType,
  EngineeringWorkWorkflow,
} from "./engineering-work";
import type {
  EngineeringWorkActor,
  EngineeringWorkDecisionProvenance,
} from "./engineering-work-provenance";

export type EngineeringWorkSqlExecutor = {
  query(queryWithPlaceholders: string, params?: unknown[]): Promise<Array<Record<string, unknown>>>;
};

export type EngineeringWorkDefectContextInput = {
  observedBehavior: string;
  expectedBehavior: string;
  reproductionSteps: string;
  environment: string;
  evidence: string;
  nextInvestigation: string;
  validationTarget: string;
};

export type EngineeringWorkPersistenceResult =
  | { ok: true; engineeringWorkId: string; version: number; historyEventId: string; defectRevisionId: string | null }
  | { ok: false; reason: "not_found_or_stale" };

export type CreateEngineeringWorkWithHistoryInput = {
  engineeringWorkId: string;
  historyEventId: string;
  defectRevisionId?: string | null;
  projectSlug: string;
  title: string;
  type: EngineeringWorkType;
  workflow: EngineeringWorkWorkflow;
  objective: string;
  currentNextAction: string;
  actionActor: EngineeringWorkActor;
  defectContext?: EngineeringWorkDefectContextInput | null;
};

export type ProposedCorrectionWithHistoryInput = {
  engineeringWorkId: string;
  projectSlug: string;
  expectedVersion: number;
  title: string;
  type: EngineeringWorkType;
  objective: string;
  currentNextAction: string;
  defectContext?: EngineeringWorkDefectContextInput | null;
  historyEventId: string;
  defectRevisionId?: string | null;
  provenance: EngineeringWorkDecisionProvenance;
};

export type OperationalUpdateWithHistoryInput = {
  engineeringWorkId: string;
  projectSlug: string;
  expectedVersion: number;
  expectedState: "active" | "in_review";
  currentNextAction: string;
  currentOutcome: string | null;
  condition: string | null;
  conditionRationale: string | null;
  defectContext?: EngineeringWorkDefectContextInput | null;
  historyEventId: string;
  defectRevisionId?: string | null;
  provenance: EngineeringWorkDecisionProvenance;
};

export type EngineeringWorkTransitionWithHistoryInput = {
  engineeringWorkId: string;
  projectSlug: string;
  expectedVersion: number;
  priorState: "proposed" | "active" | "in_review";
  resultingState: "active" | "in_review";
  historyEventId: string;
  provenance: EngineeringWorkDecisionProvenance;
};

export type EngineeringWorkCompletionWithHistoryInput = {
  engineeringWorkId: string;
  projectSlug: string;
  expectedVersion: number;
  expectedState: "active" | "in_review";
  verifiedOutcome: string;
  finalDisposition: string;
  historyEventId: string;
  provenance: EngineeringWorkDecisionProvenance;
};

export type EngineeringWorkDecisionEventInput = {
  engineeringWorkId: string;
  projectSlug: string;
  expectedVersion: number;
  expectedState: EngineeringWorkState;
  eventId: string;
  actionType: string;
  provenance: EngineeringWorkDecisionProvenance;
};

type ConversationMutationInput = {
  mode: "proposed_correction" | "operate" | "transition";
  engineeringWorkId: string;
  projectSlug: string;
  expectedVersion: number;
  expectedState: EngineeringWorkState;
  resultingState: EngineeringWorkState;
  title: string | null;
  type: EngineeringWorkType | null;
  objective: string | null;
  currentNextAction: string | null;
  currentOutcome: string | null;
  condition: string | null;
  conditionRationale: string | null;
  defectContext: EngineeringWorkDefectContextInput | null;
  historyEventId: string;
  defectRevisionId: string | null;
  provenance: EngineeringWorkDecisionProvenance;
};

const PHASE_B_TRANSITIONS = new Set(["proposed:active", "active:in_review", "in_review:active"]);

function nonblank(value: string, label: string) {
  const normalized = value.trim();
  if (!normalized) throw new Error(`${label} is required.`);
  return normalized;
}

function normalizedOptional(value: string | null | undefined) {
  if (value == null) return null;
  return value.trim() || null;
}

function normalizedDefectContext(context: EngineeringWorkDefectContextInput | null | undefined) {
  if (!context) return null;
  return {
    observedBehavior: nonblank(context.observedBehavior, "Observed behavior"),
    expectedBehavior: nonblank(context.expectedBehavior, "Expected behavior"),
    reproductionSteps: nonblank(context.reproductionSteps, "Reproduction steps"),
    environment: nonblank(context.environment, "Environment"),
    evidence: nonblank(context.evidence, "Defect evidence"),
    nextInvestigation: nonblank(context.nextInvestigation, "Next investigation"),
    validationTarget: nonblank(context.validationTarget, "Validation target"),
  };
}

function validExpectedVersion(version: number) {
  if (!Number.isInteger(version) || version < 1) {
    throw new Error("Expected Engineering Work version must be a positive integer.");
  }
  return version;
}

function persistenceResult(rows: Array<Record<string, unknown>>): EngineeringWorkPersistenceResult {
  const row = rows[0];
  if (!row) return { ok: false, reason: "not_found_or_stale" };
  return {
    ok: true,
    engineeringWorkId: String(row.engineering_work_id),
    version: Number(row.version),
    historyEventId: String(row.history_event_id),
    defectRevisionId: row.defect_revision_id ? String(row.defect_revision_id) : null,
  };
}

/** Creates a Proposed parent, creation event, and optional Defect baseline atomically. */
export async function createEngineeringWorkWithHistory(
  sql: EngineeringWorkSqlExecutor,
  input: CreateEngineeringWorkWithHistoryInput,
): Promise<EngineeringWorkPersistenceResult> {
  const defect = normalizedDefectContext(input.defectContext);
  if (input.workflow === "defect" && !defect) throw new Error("Defect creation requires complete Defect Context.");
  if (input.workflow !== "defect" && defect) throw new Error("Defect Context is valid only for the Defect workflow.");

  const rows = await sql.query(
    `WITH project AS (
       SELECT id FROM workspace_projects WHERE slug = $1
     ), inserted_work AS (
       INSERT INTO workspace_engineering_work (
         id, project_id, title, summary, type, workflow, state, current_next_action, version
       )
       SELECT $2, project.id, $3, $4, $5::engineering_work_type,
              $6::engineering_work_workflow, 'proposed', $7, 1
       FROM project RETURNING *
     ), inserted_defect AS (
       INSERT INTO workspace_engineering_work_defects (
         engineering_work_id, observed_behavior, expected_behavior, reproduction_steps,
         environment, evidence, next_investigation, validation_target
       )
       SELECT work.id, $13, $14, $15, $16, $17, $18, $19
       FROM inserted_work AS work WHERE $12::boolean RETURNING *
     ), inserted_history AS (
       INSERT INTO workspace_engineering_work_history (
         id, engineering_work_id, kind, action_type, resulting_state,
         resulting_title, resulting_type, resulting_objective, resulting_next_action,
         action_actor_type, action_actor_identifier, action_actor_display_name, occurred_at
       )
       SELECT $8, work.id, 'created', 'create', work.state, work.title, work.type,
              work.summary, work.current_next_action,
              $9::engineering_work_actor_type, $10, $11, statement_timestamp()
       FROM inserted_work AS work
       WHERE NOT $12::boolean OR EXISTS (SELECT 1 FROM inserted_defect)
       RETURNING id, engineering_work_id
     ), inserted_revision AS (
       INSERT INTO workspace_engineering_work_defect_revisions (
         id, history_event_id, engineering_work_id,
         previous_context, resulting_context, context_schema_version
       )
       SELECT $20, history.id, defect.engineering_work_id, '{}'::jsonb,
              jsonb_build_object(
                'observedBehavior', defect.observed_behavior,
                'expectedBehavior', defect.expected_behavior,
                'reproductionSteps', defect.reproduction_steps,
                'environment', defect.environment,
                'evidence', defect.evidence,
                'nextInvestigation', defect.next_investigation,
                'validationTarget', defect.validation_target
              ), 1
       FROM inserted_defect AS defect
       JOIN inserted_history AS history ON history.engineering_work_id = defect.engineering_work_id
       RETURNING id
     )
     SELECT work.id AS engineering_work_id, work.version,
            history.id AS history_event_id,
            (SELECT id FROM inserted_revision) AS defect_revision_id
     FROM inserted_work AS work
     JOIN inserted_history AS history ON history.engineering_work_id = work.id`,
    [
      nonblank(input.projectSlug, "Project slug"),
      nonblank(input.engineeringWorkId, "Engineering Work ID"),
      nonblank(input.title, "Title"),
      nonblank(input.objective, "Objective"),
      input.type,
      input.workflow,
      nonblank(input.currentNextAction, "Current Next Action"),
      nonblank(input.historyEventId, "History event ID"),
      input.actionActor.type,
      nonblank(input.actionActor.identifier, "Action actor identifier"),
      normalizedOptional(input.actionActor.displayName),
      Boolean(defect),
      defect?.observedBehavior ?? null,
      defect?.expectedBehavior ?? null,
      defect?.reproductionSteps ?? null,
      defect?.environment ?? null,
      defect?.evidence ?? null,
      defect?.nextInvestigation ?? null,
      defect?.validationTarget ?? null,
      defect ? nonblank(input.defectRevisionId ?? "", "Defect revision ID") : null,
    ],
  );
  return persistenceResult(rows);
}

/** Private mutation primitive. Only proposed_correction mode can change stable fields. */
async function persistConversationMutation(
  sql: EngineeringWorkSqlExecutor,
  input: ConversationMutationInput,
): Promise<EngineeringWorkPersistenceResult> {
  const provenance = input.provenance;
  const defect = normalizedDefectContext(input.defectContext);
  const hasDefectUpdate = Boolean(defect);
  const rows = await sql.query(
    `WITH current_work AS (
       SELECT work.* FROM workspace_engineering_work AS work
       JOIN workspace_projects AS project ON project.id = work.project_id
       WHERE work.id = $1 AND project.slug = $2 AND work.version = $3
         AND work.state = $4::engineering_work_state
         AND (($5 = 'proposed_correction' AND work.state = 'proposed')
           OR ($5 = 'operate' AND work.state IN ('active', 'in_review'))
           OR $5 = 'transition')
       FOR UPDATE OF work
     ), current_defect AS (
       SELECT defect.*,
         ROW(defect.observed_behavior, defect.expected_behavior, defect.reproduction_steps,
             defect.environment, defect.evidence, defect.next_investigation, defect.validation_target)
         IS DISTINCT FROM ROW($15, $16, $17, $18, $19, $20, $21) AS changed
       FROM workspace_engineering_work_defects AS defect
       JOIN current_work AS work ON work.id = defect.engineering_work_id
       WHERE $14::boolean AND work.workflow = 'defect'
       FOR UPDATE OF defect
     ), updated_work AS (
       UPDATE workspace_engineering_work AS work SET
         title = CASE WHEN $5 = 'proposed_correction' THEN $7 ELSE work.title END,
         type = CASE WHEN $5 = 'proposed_correction' THEN $8::engineering_work_type ELSE work.type END,
         summary = CASE WHEN $5 = 'proposed_correction' THEN $9 ELSE work.summary END,
         state = CASE WHEN $5 = 'transition' THEN $6::engineering_work_state ELSE work.state END,
         current_next_action = CASE WHEN $5 IN ('proposed_correction', 'operate') THEN $10 ELSE work.current_next_action END,
         current_outcome = CASE WHEN $5 = 'operate' THEN $11 ELSE work.current_outcome END,
         condition = CASE WHEN $5 = 'operate' THEN $12 ELSE work.condition END,
         condition_rationale = CASE WHEN $5 = 'operate' THEN $13 ELSE work.condition_rationale END,
         version = work.version + 1, updated_at = statement_timestamp()
       FROM current_work AS previous
       WHERE work.id = previous.id AND work.version = previous.version
         AND (NOT $14::boolean OR EXISTS (SELECT 1 FROM current_defect))
       RETURNING work.*
     ), updated_defect AS (
       UPDATE workspace_engineering_work_defects AS defect SET
         observed_behavior = $15, expected_behavior = $16, reproduction_steps = $17,
         environment = $18, evidence = $19, next_investigation = $20,
         validation_target = $21,
         updated_at = CASE WHEN previous.changed THEN statement_timestamp() ELSE defect.updated_at END
       FROM current_defect AS previous, updated_work AS work
       WHERE defect.engineering_work_id = previous.engineering_work_id
         AND work.id = defect.engineering_work_id
       RETURNING defect.*, previous.changed
     ), inserted_history AS (
       INSERT INTO workspace_engineering_work_history (
         id, engineering_work_id, kind, action_type,
         prior_state, resulting_state, recommended_state,
         previous_title, resulting_title, previous_type, resulting_type,
         previous_objective, resulting_objective,
         previous_next_action, resulting_next_action,
         previous_outcome, resulting_outcome,
         previous_condition, resulting_condition,
         previous_condition_rationale, resulting_condition_rationale,
         previous_final_disposition, resulting_final_disposition,
         decision, rationale, decision_basis,
         action_actor_type, action_actor_identifier, action_actor_display_name,
         decision_actor_type, decision_actor_identifier, decision_actor_display_name,
         decision_role, authority_type, authority_reference, authority_context,
         based_on_event_id, provenance_metadata, occurred_at
       )
       SELECT $22, updated.id,
         CASE WHEN $5 = 'transition' THEN 'lifecycle_transition'::engineering_work_history_kind
              WHEN EXISTS (SELECT 1 FROM updated_defect WHERE changed) THEN 'workflow_context_update'::engineering_work_history_kind
              WHEN $5 = 'proposed_correction' THEN 'proposed_correction'::engineering_work_history_kind
              ELSE 'operational_update'::engineering_work_history_kind END,
         $23, previous.state, updated.state, $24::engineering_work_state,
         previous.title, updated.title, previous.type, updated.type,
         previous.summary, updated.summary,
         previous.current_next_action, updated.current_next_action,
         previous.current_outcome, updated.current_outcome,
         previous.condition, updated.condition,
         previous.condition_rationale, updated.condition_rationale,
         previous.final_disposition, updated.final_disposition,
         $25, $26, $27::jsonb,
         $28::engineering_work_actor_type, $29, $30,
         $31::engineering_work_actor_type, $32, $33,
         $34::engineering_work_decision_role, $35::engineering_work_authority_type,
         $36, $37, $38, $39::jsonb, statement_timestamp()
       FROM current_work AS previous
       JOIN updated_work AS updated ON updated.id = previous.id
       WHERE NOT $14::boolean OR EXISTS (SELECT 1 FROM updated_defect)
       RETURNING id, engineering_work_id
     ), inserted_revision AS (
       INSERT INTO workspace_engineering_work_defect_revisions (
         id, history_event_id, engineering_work_id,
         previous_context, resulting_context, context_schema_version
       )
       SELECT $40, history.id, previous.engineering_work_id,
         jsonb_build_object(
           'observedBehavior', previous.observed_behavior, 'expectedBehavior', previous.expected_behavior,
           'reproductionSteps', previous.reproduction_steps, 'environment', previous.environment,
           'evidence', previous.evidence, 'nextInvestigation', previous.next_investigation,
           'validationTarget', previous.validation_target),
         jsonb_build_object(
           'observedBehavior', updated.observed_behavior, 'expectedBehavior', updated.expected_behavior,
           'reproductionSteps', updated.reproduction_steps, 'environment', updated.environment,
           'evidence', updated.evidence, 'nextInvestigation', updated.next_investigation,
           'validationTarget', updated.validation_target), 1
       FROM current_defect AS previous
       JOIN updated_defect AS updated ON updated.engineering_work_id = previous.engineering_work_id
       JOIN inserted_history AS history ON history.engineering_work_id = previous.engineering_work_id
       WHERE previous.changed RETURNING id
     )
     SELECT updated.id AS engineering_work_id, updated.version,
       history.id AS history_event_id,
       (SELECT id FROM inserted_revision) AS defect_revision_id
     FROM updated_work AS updated
     JOIN inserted_history AS history ON history.engineering_work_id = updated.id`,
    [
      nonblank(input.engineeringWorkId, "Engineering Work ID"),
      nonblank(input.projectSlug, "Project slug"),
      validExpectedVersion(input.expectedVersion),
      input.expectedState,
      input.mode,
      input.resultingState,
      input.title,
      input.type,
      input.objective,
      input.currentNextAction,
      input.currentOutcome,
      input.condition,
      input.conditionRationale,
      hasDefectUpdate,
      defect?.observedBehavior ?? null,
      defect?.expectedBehavior ?? null,
      defect?.reproductionSteps ?? null,
      defect?.environment ?? null,
      defect?.evidence ?? null,
      defect?.nextInvestigation ?? null,
      defect?.validationTarget ?? null,
      nonblank(input.historyEventId, "History event ID"),
      input.mode === "operate" ? "operate" : input.mode,
      provenance.recommendedState,
      provenance.decision,
      provenance.rationale,
      JSON.stringify(provenance.decisionBasis ?? {}),
      provenance.actionActor.type,
      provenance.actionActor.identifier,
      provenance.actionActor.displayName,
      provenance.decisionActor.type,
      provenance.decisionActor.identifier,
      provenance.decisionActor.displayName,
      provenance.decisionRole,
      provenance.authority?.type ?? null,
      provenance.authority?.reference ?? null,
      provenance.authority?.context ?? null,
      provenance.basedOnEventId,
      JSON.stringify(provenance.metadata),
      hasDefectUpdate ? nonblank(input.defectRevisionId ?? "", "Defect revision ID") : null,
    ],
  );
  return persistenceResult(rows);
}

export function persistProposedCorrectionAndHistory(sql: EngineeringWorkSqlExecutor, input: ProposedCorrectionWithHistoryInput) {
  return persistConversationMutation(sql, {
    mode: "proposed_correction", engineeringWorkId: input.engineeringWorkId,
    projectSlug: input.projectSlug, expectedVersion: input.expectedVersion,
    expectedState: "proposed", resultingState: "proposed",
    title: nonblank(input.title, "Title"), type: input.type,
    objective: nonblank(input.objective, "Objective"),
    currentNextAction: nonblank(input.currentNextAction, "Current Next Action"),
    currentOutcome: null, condition: null, conditionRationale: null,
    defectContext: input.defectContext ?? null, historyEventId: input.historyEventId,
    defectRevisionId: input.defectRevisionId ?? null, provenance: input.provenance,
  });
}

export function persistOperationalUpdateAndHistory(sql: EngineeringWorkSqlExecutor, input: OperationalUpdateWithHistoryInput) {
  return persistConversationMutation(sql, {
    mode: "operate", engineeringWorkId: input.engineeringWorkId,
    projectSlug: input.projectSlug, expectedVersion: input.expectedVersion,
    expectedState: input.expectedState, resultingState: input.expectedState,
    title: null, type: null, objective: null,
    currentNextAction: nonblank(input.currentNextAction, "Current Next Action"),
    currentOutcome: normalizedOptional(input.currentOutcome),
    condition: normalizedOptional(input.condition),
    conditionRationale: normalizedOptional(input.conditionRationale),
    defectContext: input.defectContext ?? null, historyEventId: input.historyEventId,
    defectRevisionId: input.defectRevisionId ?? null, provenance: input.provenance,
  });
}

export function persistEngineeringWorkTransitionAndHistory(sql: EngineeringWorkSqlExecutor, input: EngineeringWorkTransitionWithHistoryInput) {
  if (!PHASE_B_TRANSITIONS.has(`${input.priorState}:${input.resultingState}`)) {
    throw new Error(`Unsupported Phase B lifecycle transition: ${input.priorState} -> ${input.resultingState}.`);
  }
  return persistConversationMutation(sql, {
    mode: "transition", engineeringWorkId: input.engineeringWorkId,
    projectSlug: input.projectSlug, expectedVersion: input.expectedVersion,
    expectedState: input.priorState, resultingState: input.resultingState,
    title: null, type: null, objective: null, currentNextAction: null,
    currentOutcome: null, condition: null, conditionRationale: null,
    defectContext: null, historyEventId: input.historyEventId,
    defectRevisionId: null, provenance: input.provenance,
  });
}

/**
 * Completes Active or In Review work in one statement. The former operational
 * Next Action and all prior projection fields flow directly into history.
 */
export async function persistEngineeringWorkCompletionAndHistory(
  sql: EngineeringWorkSqlExecutor,
  input: EngineeringWorkCompletionWithHistoryInput,
): Promise<EngineeringWorkPersistenceResult> {
  const provenance = input.provenance;
  if (provenance.decisionRole !== "authorization") {
    throw new Error("Completion requires authorization decision provenance.");
  }
  nonblank(provenance.decisionBasis?.summary ?? "", "Completion decision basis");
  const rows = await sql.query(
    `WITH current_work AS (
       SELECT work.* FROM workspace_engineering_work AS work
       JOIN workspace_projects AS project ON project.id = work.project_id
       WHERE work.id = $1 AND project.slug = $2 AND work.version = $3
         AND work.state = $4::engineering_work_state
         AND work.state IN ('active', 'in_review')
       FOR UPDATE OF work
     ), updated_work AS (
       UPDATE workspace_engineering_work AS work SET
         state = 'completed',
         current_next_action = NULL,
         current_outcome = $5,
         condition = NULL,
         condition_rationale = NULL,
         final_disposition = $6,
         version = work.version + 1,
         updated_at = statement_timestamp()
       FROM current_work AS previous
       WHERE work.id = previous.id AND work.version = previous.version
       RETURNING work.*
     ), inserted_history AS (
       INSERT INTO workspace_engineering_work_history (
         id, engineering_work_id, kind, action_type,
         prior_state, resulting_state,
         previous_title, resulting_title, previous_type, resulting_type,
         previous_objective, resulting_objective,
         previous_next_action, resulting_next_action,
         previous_outcome, resulting_outcome,
         previous_condition, resulting_condition,
         previous_condition_rationale, resulting_condition_rationale,
         previous_final_disposition, resulting_final_disposition,
         decision, rationale, decision_basis,
         action_actor_type, action_actor_identifier, action_actor_display_name,
         decision_actor_type, decision_actor_identifier, decision_actor_display_name,
         decision_role, authority_type, authority_reference, authority_context,
         based_on_event_id, provenance_metadata, occurred_at
       )
       SELECT $7, updated.id, 'lifecycle_transition', 'complete',
         previous.state, updated.state,
         previous.title, updated.title, previous.type, updated.type,
         previous.summary, updated.summary,
         previous.current_next_action, updated.current_next_action,
         previous.current_outcome, updated.current_outcome,
         previous.condition, updated.condition,
         previous.condition_rationale, updated.condition_rationale,
         previous.final_disposition, updated.final_disposition,
         $8, $9, $10::jsonb,
         $11::engineering_work_actor_type, $12, $13,
         $14::engineering_work_actor_type, $15, $16,
         $17::engineering_work_decision_role, $18::engineering_work_authority_type,
         $19, $20, $21, $22::jsonb, statement_timestamp()
       FROM current_work AS previous
       JOIN updated_work AS updated ON updated.id = previous.id
       RETURNING id, engineering_work_id
     )
     SELECT updated.id AS engineering_work_id, updated.version,
       history.id AS history_event_id, NULL::text AS defect_revision_id
     FROM updated_work AS updated
     JOIN inserted_history AS history ON history.engineering_work_id = updated.id`,
    [
      nonblank(input.engineeringWorkId, "Engineering Work ID"),
      nonblank(input.projectSlug, "Project slug"),
      validExpectedVersion(input.expectedVersion),
      input.expectedState,
      nonblank(input.verifiedOutcome, "Verified Outcome"),
      nonblank(input.finalDisposition, "Final disposition"),
      nonblank(input.historyEventId, "History event ID"),
      provenance.decision,
      provenance.rationale,
      JSON.stringify(provenance.decisionBasis ?? {}),
      provenance.actionActor.type,
      provenance.actionActor.identifier,
      provenance.actionActor.displayName,
      provenance.decisionActor.type,
      provenance.decisionActor.identifier,
      provenance.decisionActor.displayName,
      provenance.decisionRole,
      provenance.authority?.type ?? null,
      provenance.authority?.reference ?? null,
      provenance.authority?.context ?? null,
      provenance.basedOnEventId,
      JSON.stringify(provenance.metadata),
    ],
  );
  return persistenceResult(rows);
}

/** Appends a version-anchored decision without mutating the projection. */
export async function appendEngineeringWorkDecisionEvent(
  sql: EngineeringWorkSqlExecutor,
  input: EngineeringWorkDecisionEventInput,
): Promise<EngineeringWorkPersistenceResult> {
  const provenance = input.provenance;
  const rows = await sql.query(
    `WITH current_work AS (
       SELECT work.* FROM workspace_engineering_work AS work
       JOIN workspace_projects AS project ON project.id = work.project_id
       WHERE work.id = $1 AND project.slug = $2 AND work.version = $3
         AND work.state = $4::engineering_work_state
     ), inserted_history AS (
       INSERT INTO workspace_engineering_work_history (
         id, engineering_work_id, kind, action_type, prior_state, resulting_state,
         recommended_state, decision, rationale, decision_basis,
         action_actor_type, action_actor_identifier, action_actor_display_name,
         decision_actor_type, decision_actor_identifier, decision_actor_display_name,
         decision_role, authority_type, authority_reference, authority_context,
         based_on_event_id, provenance_metadata, occurred_at
       )
       SELECT $5, current.id, 'decision_recorded', $6, current.state, current.state,
         $7::engineering_work_state, $8, $9, $10::jsonb,
         $11::engineering_work_actor_type, $12, $13,
         $14::engineering_work_actor_type, $15, $16,
         $17::engineering_work_decision_role, $18::engineering_work_authority_type,
         $19, $20, $21, $22::jsonb, statement_timestamp()
       FROM current_work AS current RETURNING id, engineering_work_id
     )
     SELECT inserted_history.engineering_work_id, $3::integer AS version,
       inserted_history.id AS history_event_id, NULL::text AS defect_revision_id
     FROM inserted_history`,
    [
      nonblank(input.engineeringWorkId, "Engineering Work ID"),
      nonblank(input.projectSlug, "Project slug"), validExpectedVersion(input.expectedVersion),
      input.expectedState, nonblank(input.eventId, "History event ID"),
      nonblank(input.actionType, "Action type"), provenance.recommendedState,
      provenance.decision, provenance.rationale, JSON.stringify(provenance.decisionBasis ?? {}),
      provenance.actionActor.type, provenance.actionActor.identifier, provenance.actionActor.displayName,
      provenance.decisionActor.type, provenance.decisionActor.identifier, provenance.decisionActor.displayName,
      provenance.decisionRole, provenance.authority?.type ?? null,
      provenance.authority?.reference ?? null, provenance.authority?.context ?? null,
      provenance.basedOnEventId, JSON.stringify(provenance.metadata),
    ],
  );
  return persistenceResult(rows);
}
