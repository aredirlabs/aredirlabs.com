import type { EngineeringWorkState } from "./engineering-work";

export const ENGINEERING_WORK_ACTOR_TYPES = [
  "human",
  "ai_agent",
  "system",
  "integration",
] as const;

export type EngineeringWorkActorType =
  (typeof ENGINEERING_WORK_ACTOR_TYPES)[number];

export const ENGINEERING_WORK_DECISION_ROLES = [
  "observation",
  "recommendation",
  "investigation",
  "adjudication",
  "authorization",
  "execution",
] as const;

export type EngineeringWorkDecisionRole =
  (typeof ENGINEERING_WORK_DECISION_ROLES)[number];

export const ENGINEERING_WORK_AUTHORITY_TYPES = [
  "human_owner",
  "delegated_policy",
  "verification_policy",
  "approval_gate",
  "system_rule",
] as const;

export type EngineeringWorkAuthorityType =
  (typeof ENGINEERING_WORK_AUTHORITY_TYPES)[number];

export type EngineeringWorkActor = {
  type: EngineeringWorkActorType;
  identifier: string;
  displayName?: string | null;
};

export type EngineeringWorkAuthority = {
  type: EngineeringWorkAuthorityType;
  reference?: string | null;
  context?: string | null;
};

export type EngineeringWorkDecisionReference = {
  kind: "history_event" | "repository_reference" | "external_reference" | "rule";
  reference: string;
  summary?: string | null;
};

export type EngineeringWorkDecisionBasis = {
  summary?: string;
  references?: EngineeringWorkDecisionReference[];
};

export type EngineeringWorkAgentProvenance = {
  agentId: string;
  provider?: string | null;
  model?: string | null;
  modelVersion?: string | null;
  runtimeId?: string | null;
  policyId?: string | null;
  instructionRef?: string | null;
  evidenceRefs?: string[];
};

export type EngineeringWorkProvenanceMetadata = {
  schemaVersion: 1;
  agent?: EngineeringWorkAgentProvenance;
};

export type EngineeringWorkDecisionProvenance = {
  actionActor: EngineeringWorkActor;
  decisionActor: EngineeringWorkActor;
  decisionRole: EngineeringWorkDecisionRole;
  authority?: EngineeringWorkAuthority | null;
  decision: string;
  rationale: string;
  decisionBasis?: EngineeringWorkDecisionBasis;
  recommendedState?: EngineeringWorkState | null;
  basedOnEventId?: string | null;
  metadata: EngineeringWorkProvenanceMetadata;
};

type DecisionProvenanceInput = Omit<
  EngineeringWorkDecisionProvenance,
  "actionActor" | "decisionActor" | "authority" | "decision" | "rationale" | "decisionBasis" | "basedOnEventId" | "metadata"
> & {
  actionActor: EngineeringWorkActor;
  decisionActor: EngineeringWorkActor;
  authority?: EngineeringWorkAuthority | null;
  decision: string;
  rationale: string;
  decisionBasis?: EngineeringWorkDecisionBasis;
  basedOnEventId?: string | null;
  metadata?: EngineeringWorkProvenanceMetadata;
};

const MAX_IDENTIFIER_LENGTH = 500;
const MAX_NARRATIVE_LENGTH = 4_000;
const MAX_REFERENCE_LENGTH = 2_000;

function requiredText(value: string, label: string, maxLength: number) {
  const normalized = value.trim();
  if (!normalized) throw new Error(`${label} is required.`);
  if (normalized.length > maxLength) {
    throw new Error(`${label} must be ${maxLength.toLocaleString()} characters or fewer.`);
  }
  return normalized;
}

function optionalText(value: string | null | undefined, maxLength: number) {
  if (value == null) return null;
  const normalized = value.trim();
  if (!normalized) return null;
  if (normalized.length > maxLength) {
    throw new Error(`Optional provenance text must be ${maxLength.toLocaleString()} characters or fewer.`);
  }
  return normalized;
}

export function engineeringWorkActor(
  actor: EngineeringWorkActor,
): EngineeringWorkActor {
  return {
    type: actor.type,
    identifier: requiredText(
      actor.identifier,
      "Actor identifier",
      MAX_IDENTIFIER_LENGTH,
    ),
    displayName: optionalText(actor.displayName, MAX_IDENTIFIER_LENGTH),
  };
}

export function authenticatedHumanEngineeringWorkActor(session: {
  user: { id: string; name?: string | null };
}): EngineeringWorkActor {
  return engineeringWorkActor({
    type: "human",
    identifier: session.user.id,
    displayName: session.user.name,
  });
}

function normalizedAuthority(
  authority: EngineeringWorkAuthority | null | undefined,
): EngineeringWorkAuthority | null {
  if (!authority) return null;
  const reference = optionalText(authority.reference, MAX_REFERENCE_LENGTH);
  if (authority.type !== "human_owner" && !reference) {
    throw new Error(`${authority.type} authority requires a stable reference.`);
  }
  return {
    type: authority.type,
    reference,
    context: optionalText(authority.context, MAX_NARRATIVE_LENGTH),
  };
}

function normalizedDecisionBasis(
  basis: EngineeringWorkDecisionBasis | undefined,
): EngineeringWorkDecisionBasis {
  if (!basis) return {};
  return {
    summary: basis.summary
      ? requiredText(
          basis.summary,
          "Decision basis summary",
          MAX_NARRATIVE_LENGTH,
        )
      : undefined,
    references: basis.references?.map((reference) => ({
      kind: reference.kind,
      reference: requiredText(
        reference.reference,
        "Decision basis reference",
        MAX_REFERENCE_LENGTH,
      ),
      summary: optionalText(reference.summary, MAX_NARRATIVE_LENGTH),
    })),
  };
}

function normalizedMetadata(
  metadata: EngineeringWorkProvenanceMetadata | undefined,
  actionActor: EngineeringWorkActor,
  decisionActor: EngineeringWorkActor,
): EngineeringWorkProvenanceMetadata {
  if (!metadata) return { schemaVersion: 1 };
  if (metadata.schemaVersion !== 1) {
    throw new Error("Unsupported Engineering Work provenance metadata version.");
  }
  if (!metadata.agent) return { schemaVersion: 1 };

  const agentId = requiredText(
    metadata.agent.agentId,
    "Agent identifier",
    MAX_IDENTIFIER_LENGTH,
  );
  const matchingAiActor = [actionActor, decisionActor].some(
    (actor) => actor.type === "ai_agent" && actor.identifier === agentId,
  );
  if (!matchingAiActor) {
    throw new Error("Agent provenance must identify an AI action or decision actor.");
  }

  return {
    schemaVersion: 1,
    agent: {
      agentId,
      provider: optionalText(metadata.agent.provider, MAX_IDENTIFIER_LENGTH),
      model: optionalText(metadata.agent.model, MAX_IDENTIFIER_LENGTH),
      modelVersion: optionalText(
        metadata.agent.modelVersion,
        MAX_IDENTIFIER_LENGTH,
      ),
      runtimeId: optionalText(metadata.agent.runtimeId, MAX_IDENTIFIER_LENGTH),
      policyId: optionalText(metadata.agent.policyId, MAX_REFERENCE_LENGTH),
      instructionRef: optionalText(
        metadata.agent.instructionRef,
        MAX_REFERENCE_LENGTH,
      ),
      evidenceRefs: metadata.agent.evidenceRefs?.map((reference) =>
        requiredText(reference, "Agent evidence reference", MAX_REFERENCE_LENGTH),
      ),
    },
  };
}

/**
 * Constructs provenance data only. It does not grant authority, invoke an AI
 * system, evaluate a policy, or perform a lifecycle transition.
 */
export function engineeringWorkDecisionProvenance(
  input: DecisionProvenanceInput,
): EngineeringWorkDecisionProvenance {
  const actionActor = engineeringWorkActor(input.actionActor);
  const decisionActor = engineeringWorkActor(input.decisionActor);
  const authority = normalizedAuthority(input.authority);

  if (input.decisionRole === "recommendation" && authority) {
    throw new Error("A recommendation cannot claim decision authority.");
  }
  if (input.decisionRole === "recommendation" && !input.recommendedState) {
    throw new Error("A lifecycle recommendation requires a recommended state.");
  }
  if (
    ["recommendation", "adjudication", "authorization"].includes(
      input.decisionRole,
    ) &&
    !input.decisionBasis?.summary?.trim()
  ) {
    throw new Error(`${input.decisionRole} requires a decision basis summary.`);
  }

  return {
    actionActor,
    decisionActor,
    decisionRole: input.decisionRole,
    authority,
    decision: requiredText(input.decision, "Decision", MAX_NARRATIVE_LENGTH),
    rationale: requiredText(input.rationale, "Decision rationale", MAX_NARRATIVE_LENGTH),
    decisionBasis: normalizedDecisionBasis(input.decisionBasis),
    recommendedState: input.recommendedState ?? null,
    basedOnEventId: optionalText(input.basedOnEventId, MAX_IDENTIFIER_LENGTH),
    metadata: normalizedMetadata(input.metadata, actionActor, decisionActor),
  };
}
