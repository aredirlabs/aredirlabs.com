import { type EngineeringWorkWorkflow } from "@/lib/workspace/engineering-work";

export type EngineeringWorkIntakeField = {
  label: string;
  required: boolean;
};

export type EngineeringWorkIntakeDefinition = {
  intent: string;
  fields: readonly EngineeringWorkIntakeField[];
  implemented: boolean;
};

export const ENGINEERING_WORK_SHARED_INTAKE_FIELDS = [
  "Title",
  "Workflow",
  "Lifecycle",
  "Familiar type",
  "Project",
  "Record identity",
] as const;

// This configuration defines the engineering conversation. Delivery and Defect
// map their conversations to persisted fields.
export const ENGINEERING_WORK_INTAKE_DEFINITIONS = {
  delivery: {
    intent: "Plan and carry out an implementation-oriented change.",
    fields: [
      { label: "Objective", required: true },
      { label: "Scope", required: false },
      { label: "Recommended next action", required: true },
    ],
    implemented: true,
  },
  defect: {
    intent: "Record and investigate an observed software defect.",
    fields: [
      { label: "Observed behavior", required: true },
      { label: "Expected behavior", required: true },
      { label: "Reproduction", required: true },
      { label: "Environment", required: false },
      { label: "Evidence", required: true },
      { label: "Next investigation", required: true },
      { label: "Validation target", required: true },
    ],
    implemented: true,
  },
  discovery: {
    intent: "Understand an opportunity or uncertainty before committing to delivery.",
    fields: [
      { label: "Observation", required: true },
      { label: "Evidence", required: false },
      { label: "Hypothesis", required: false },
      { label: "Recommended next step", required: true },
    ],
    implemented: false,
  },
  research: {
    intent: "Investigate a question to produce a useful, bounded conclusion.",
    fields: [
      { label: "Research question", required: true },
      { label: "Context", required: false },
      { label: "Evidence", required: false },
      { label: "Conclusion", required: false },
      { label: "Recommended next step", required: true },
    ],
    implemented: false,
  },
  architecture: {
    intent: "Make or record a technical design decision.",
    fields: [
      { label: "Problem", required: true },
      { label: "Constraints", required: false },
      { label: "Decision", required: true },
      { label: "Expected impact", required: false },
    ],
    implemented: false,
  },
  maintenance: {
    intent: "Sustain the health, reliability, or currency of an existing system.",
    fields: [
      { label: "Maintenance need", required: true },
      { label: "Affected area", required: false },
      { label: "Risk if deferred", required: false },
      { label: "Recommended next action", required: true },
    ],
    implemented: false,
  },
  verification: {
    intent: "Validate that an engineering outcome meets its target.",
    fields: [
      { label: "Validation target", required: true },
      { label: "Result", required: true },
      { label: "Evidence", required: false },
      { label: "Remaining risk", required: false },
    ],
    implemented: false,
  },
  documentation: {
    intent: "Create or improve documentation that supports engineering work.",
    fields: [
      { label: "Documentation need", required: true },
      { label: "Audience", required: false },
      { label: "Source material", required: false },
      { label: "Recommended next action", required: true },
    ],
    implemented: false,
  },
  promotion: {
    intent: "Prepare a validated artifact or practice for broader adoption.",
    fields: [
      { label: "Candidate", required: true },
      { label: "Validation evidence", required: false },
      { label: "Target audience", required: false },
      { label: "Recommended next action", required: true },
    ],
    implemented: false,
  },
  release: {
    intent: "Prepare a change for release to its intended environment or audience.",
    fields: [
      { label: "Release target", required: true },
      { label: "Included change", required: false },
      { label: "Validation status", required: false },
      { label: "Recommended next action", required: true },
    ],
    implemented: false,
  },
} as const satisfies Record<EngineeringWorkWorkflow, EngineeringWorkIntakeDefinition>;

export function getEngineeringWorkIntakeDefinition(
  workflow: EngineeringWorkWorkflow,
) {
  return ENGINEERING_WORK_INTAKE_DEFINITIONS[workflow];
}
