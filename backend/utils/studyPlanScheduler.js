// Deterministic DSA study-plan scheduler.
//
// Turns a flat list of practice problems (each with an easy/medium/hard
// difficulty) plus a target number of days into a balanced day-by-day plan.
// Uses difficulty-weighted LPT (longest-processing-time) scheduling so no
// single day is overloaded. Pure and deterministic — no I/O.

const DIFFICULTY_WEIGHTS = { easy: 1, medium: 2, hard: 3 };
const DEFAULT_WEIGHT = DIFFICULTY_WEIGHTS.medium; // unknown/missing difficulty

/**
 * Weight of a single problem by its difficulty (case-insensitive).
 * @param {string} difficulty
 * @returns {number}
 */
function problemWeight(difficulty) {
  if (typeof difficulty !== "string") return DEFAULT_WEIGHT;
  const key = difficulty.trim().toLowerCase();
  return DIFFICULTY_WEIGHTS[key] ?? DEFAULT_WEIGHT;
}

/**
 * Distribute problems across `days` balanced buckets.
 * @param {Array<{difficulty?: string}>} problems
 * @param {number} days
 * @returns {{ plan: Array<{day: number, problems: any[], load: number}>, totalLoad: number, days: number }}
 */
function buildStudyPlan(problems, days) {
  if (!Array.isArray(problems) || problems.length === 0) {
    return { plan: [], totalLoad: 0, days: 0 };
  }
  if (!Number.isInteger(days) || days < 1) {
    return { plan: [], totalLoad: 0, days: 0 };
  }

  const buckets = Array.from({ length: days }, (_, i) => ({
    day: i + 1,
    problems: [],
    load: 0,
  }));

  // Sort a copy by weight descending, breaking ties by original index so the
  // result is stable and deterministic.
  const ordered = problems
    .map((problem, index) => ({ problem, index, weight: problemWeight(problem?.difficulty) }))
    .sort((a, b) => b.weight - a.weight || a.index - b.index);

  let totalLoad = 0;
  for (const { problem, weight } of ordered) {
    // Assign to the currently least-loaded bucket (ties → lowest day).
    let target = buckets[0];
    for (const bucket of buckets) {
      if (bucket.load < target.load) target = bucket;
    }
    target.problems.push(problem);
    target.load += weight;
    totalLoad += weight;
  }

  // ponytail: LPT is a ~4/3-approx heuristic, not an optimal partition — fine
  // for study plans; swap for full DP only if exact balance ever matters.
  return { plan: buckets, totalLoad, days };
}

module.exports = { DIFFICULTY_WEIGHTS, problemWeight, buildStudyPlan };
