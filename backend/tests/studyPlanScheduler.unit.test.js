import { describe, it, expect } from "vitest";
import {
  problemWeight,
  buildStudyPlan,
  DIFFICULTY_WEIGHTS,
} from "../utils/studyPlanScheduler.js";

describe("problemWeight", () => {
  it("maps difficulties to weights", () => {
    expect(problemWeight("easy")).toBe(1);
    expect(problemWeight("medium")).toBe(2);
    expect(problemWeight("hard")).toBe(3);
  });

  it("is case-insensitive and trims", () => {
    expect(problemWeight("  HARD ")).toBe(3);
  });

  it("defaults unknown/missing difficulty to medium", () => {
    expect(problemWeight("insane")).toBe(2);
    expect(problemWeight(undefined)).toBe(2);
  });
});

describe("buildStudyPlan", () => {
  it("returns one bucket per day with day/problems/load fields", () => {
    const { plan } = buildStudyPlan([{ difficulty: "easy" }], 3);
    expect(plan).toHaveLength(3);
    plan.forEach((entry, i) => {
      expect(entry.day).toBe(i + 1);
      expect(Array.isArray(entry.problems)).toBe(true);
      expect(typeof entry.load).toBe("number");
    });
  });

  it("balances load across days (LPT)", () => {
    const problems = [
      { difficulty: "hard" },
      { difficulty: "hard" },
      { difficulty: "easy" },
      { difficulty: "easy" },
    ];
    const { plan, totalLoad } = buildStudyPlan(problems, 2);
    expect(plan[0].load).toBe(4);
    expect(plan[1].load).toBe(4);
    expect(totalLoad).toBe(8);
  });

  it("places every problem exactly once", () => {
    const problems = [
      { title: "A", difficulty: "easy" },
      { title: "B", difficulty: "medium" },
      { title: "C", difficulty: "hard" },
    ];
    const { plan } = buildStudyPlan(problems, 2);
    const placed = plan.flatMap((d) => d.problems);
    expect(placed).toHaveLength(3);
    expect(placed.filter((p) => p.title === "B")).toHaveLength(1);
  });

  it("counts missing difficulty as medium", () => {
    expect(buildStudyPlan([{ title: "x" }], 1).totalLoad).toBe(2);
  });

  it("allows more days than problems (empty days)", () => {
    const { plan } = buildStudyPlan([{ difficulty: "easy" }], 3);
    expect(plan).toHaveLength(3);
    expect(plan.filter((d) => d.load === 0)).toHaveLength(2);
  });

  it("is deterministic", () => {
    const problems = [
      { difficulty: "hard" },
      { difficulty: "easy" },
      { difficulty: "medium" },
    ];
    expect(buildStudyPlan(problems, 2)).toEqual(buildStudyPlan(problems, 2));
  });

  it("guards invalid input", () => {
    const empty = { plan: [], totalLoad: 0, days: 0 };
    expect(buildStudyPlan([], 5)).toEqual(empty);
    expect(buildStudyPlan("nope", 5)).toEqual(empty);
    expect(buildStudyPlan([{}], 0)).toEqual(empty);
    expect(buildStudyPlan([{}], -1)).toEqual(empty);
    expect(buildStudyPlan([{}], 2.5)).toEqual(empty);
  });

  it("exposes the difficulty weight table", () => {
    expect(DIFFICULTY_WEIGHTS).toEqual({ easy: 1, medium: 2, hard: 3 });
  });
});
