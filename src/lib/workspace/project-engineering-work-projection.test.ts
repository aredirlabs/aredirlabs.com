import assert from "node:assert/strict";
import test from "node:test";

import {
  PROJECT_ENGINEERING_WORK_PROJECTION_LIMIT,
  groupEngineeringWorkByLifecycle,
  projectBoundedEngineeringWork,
  sortEngineeringWorkForPresentation,
} from "./project-engineering-work-projection";

type WorkRecord = {
  id: string;
  title: string;
  state: string;
  priority: string | null;
  updatedAt: Date;
  createdAt: Date;
  condition: string | null;
  currentNextAction: string | null;
  focused: boolean;
  continuationEligible: boolean;
};

function work(
  id: string,
  overrides: Partial<Omit<WorkRecord, "id">> = {},
): WorkRecord {
  return {
    id,
    title: `Title ${id}`,
    state: "active",
    priority: "high",
    updatedAt: new Date("2026-08-20T00:00:00.000Z"),
    createdAt: new Date("2026-08-01T00:00:00.000Z"),
    condition: null,
    currentNextAction: "Do the next thing",
    focused: false,
    continuationEligible: true,
    ...overrides,
  };
}

test("bounded projection membership is the first N identifier-sorted records", () => {
  const items = [
    work("eng_work_c"),
    work("eng_work_a"),
    work("eng_work_e"),
    work("eng_work_b"),
    work("eng_work_d"),
    work("eng_work_f"),
    work("eng_work_g"),
  ];

  const projection = projectBoundedEngineeringWork(items, 5);

  assert.equal(projection.bound, 5);
  assert.equal(projection.total, 7);
  assert.equal(projection.omitted, 2);
  assert.deepEqual(
    projection.items.map((item) => item.id),
    ["eng_work_a", "eng_work_b", "eng_work_c", "eng_work_d", "eng_work_e"],
  );
});

test("default bound is the documented Package 3 constant", () => {
  const items = Array.from({ length: 8 }, (_, index) =>
    work(`eng_work_${index}`),
  );
  const projection = projectBoundedEngineeringWork(items);

  assert.equal(projection.bound, PROJECT_ENGINEERING_WORK_PROJECTION_LIMIT);
  assert.equal(projection.items.length, PROJECT_ENGINEERING_WORK_PROJECTION_LIMIT);
  assert.equal(projection.total, 8);
});

test("when total is at or below the bound, every record is shown", () => {
  const items = [work("z"), work("a"), work("m")];
  const projection = projectBoundedEngineeringWork(items, 5);

  assert.equal(projection.total, 3);
  assert.equal(projection.omitted, 0);
  assert.deepEqual(
    projection.items.map((item) => item.id),
    ["a", "m", "z"],
  );
});

test("empty collection is a truthful zero projection", () => {
  const projection = projectBoundedEngineeringWork([]);

  assert.equal(projection.total, 0);
  assert.equal(projection.items.length, 0);
  assert.equal(projection.omitted, 0);
  assert.equal(projection.bound, PROJECT_ENGINEERING_WORK_PROJECTION_LIMIT);
});

test("input array order does not affect membership or order", () => {
  const items = [work("b"), work("c"), work("a"), work("d")];
  const reversed = [...items].reverse();

  assert.deepEqual(
    projectBoundedEngineeringWork(items, 3).items.map((item) => item.id),
    projectBoundedEngineeringWork(reversed, 3).items.map((item) => item.id),
  );
});

test("lifecycle state, recency, priority, focus, continuation, and condition do not determine membership or order", () => {
  const items = [
    work("eng_work_zeta", {
      state: "active",
      priority: "critical",
      updatedAt: new Date("2026-08-23T00:00:00.000Z"),
      createdAt: new Date("2026-08-23T00:00:00.000Z"),
      focused: true,
      continuationEligible: true,
      condition: null,
      title: "AAA should not win",
    }),
    work("eng_work_alpha", {
      state: "completed",
      priority: null,
      updatedAt: new Date("2020-01-01T00:00:00.000Z"),
      createdAt: new Date("2020-01-01T00:00:00.000Z"),
      focused: false,
      continuationEligible: false,
      condition: "Blocked",
      title: "ZZZ should not lose",
    }),
    work("eng_work_mu", {
      state: "proposed",
      priority: "low",
      updatedAt: new Date("2026-01-01T00:00:00.000Z"),
      focused: true,
      continuationEligible: false,
    }),
  ];

  const projection = projectBoundedEngineeringWork(items, 2);

  assert.deepEqual(
    projection.items.map((item) => item.id),
    ["eng_work_alpha", "eng_work_mu"],
  );
});

test("changing focus, continuation eligibility, priority, or timestamps on the same ids leaves the projection unchanged", () => {
  const baseline = [
    work("id-2", { focused: false, state: "proposed", priority: "low" }),
    work("id-1", { focused: true, state: "active", priority: "high" }),
    work("id-3", { focused: false, state: "completed" }),
  ];
  const mutated = [
    work("id-2", {
      focused: true,
      state: "active",
      priority: "critical",
      continuationEligible: true,
      updatedAt: new Date("2099-01-01T00:00:00.000Z"),
    }),
    work("id-1", {
      focused: false,
      state: "cancelled",
      priority: null,
      continuationEligible: false,
      updatedAt: new Date("2000-01-01T00:00:00.000Z"),
    }),
    work("id-3", {
      focused: true,
      state: "in_review",
      condition: "Needs review",
    }),
  ];

  assert.deepEqual(
    projectBoundedEngineeringWork(baseline, 2).items.map((item) => item.id),
    projectBoundedEngineeringWork(mutated, 2).items.map((item) => item.id),
  );
});

test("presentation sort is identifier lexicographic ascending", () => {
  const sorted = sortEngineeringWorkForPresentation([
    work("eng_work_b"),
    work("eng_work_a"),
    work("eng_work_a1"),
  ]);

  assert.deepEqual(
    sorted.map((item) => item.id),
    ["eng_work_a", "eng_work_a1", "eng_work_b"],
  );
});

test("projection result has no primary/current/next/focused membership field", () => {
  const projection = projectBoundedEngineeringWork([work("a"), work("b")], 5);
  const keys = Object.keys(projection).sort();

  assert.deepEqual(keys, ["bound", "items", "omitted", "total"]);
  assert.equal("primary" in projection, false);
});

test("inventory grouping includes every record exactly once and preserves identifier order within groups", () => {
  const items = [
    work("c", { state: "completed" }),
    work("a", { state: "active" }),
    work("d", { state: "active" }),
    work("b", { state: "proposed" }),
    work("e", { state: "completed" }),
  ];

  const groups = groupEngineeringWorkByLifecycle(items);
  const flattened = groups.flatMap((group) => group.items.map((item) => item.id));

  assert.deepEqual(
    groups.map((group) => group.state),
    ["proposed", "active", "completed"],
  );
  assert.deepEqual(
    groups.find((group) => group.state === "active")?.items.map((item) => item.id),
    ["a", "d"],
  );
  assert.deepEqual(
    groups.find((group) => group.state === "completed")?.items.map((item) => item.id),
    ["c", "e"],
  );
  assert.deepEqual([...flattened].sort(), ["a", "b", "c", "d", "e"]);
  assert.equal(flattened.length, 5);
});

test("empty lifecycle groups are omitted and unknown states follow known groups", () => {
  const groups = groupEngineeringWorkByLifecycle([
    work("b", { state: "mystery" }),
    work("a", { state: "active" }),
  ]);

  assert.deepEqual(
    groups.map((group) => group.state),
    ["active", "mystery"],
  );
  assert.equal(groups.some((group) => group.state === "proposed"), false);
});
