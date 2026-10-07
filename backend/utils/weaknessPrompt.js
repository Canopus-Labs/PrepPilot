/**
 * weaknessPrompt.js
 *
 * Builds the Gemini prompt for weakness-based recommendations,
 * validates the AI response with Zod, and provides a rule-based
 * fallback when Gemini is unavailable.
 */

const { z } = require("zod");

/**
 * Zod schema for validating the AI response.
 */
const aiRecsSchema = z.object({
  suggestions: z.array(z.string()).length(5),
  weeklyPlan: z
    .array(z.object({ day: z.string(), task: z.string() }))
    .length(6),
  actionPlanSummary: z.string(),
  aiSummary: z.string(),
});

/**
 * Build the Gemini prompt string.
 *
 * @param {{ readinessScore: number, sessionCount: number, weakTopics: object[] }} params
 * @returns {string}
 */
function buildWeaknessPrompt({ readinessScore, sessionCount, weakTopics }) {
  const topicLines = weakTopics
    .slice(0, 5)
    .map(
      (t) =>
        `  • ${t.topic}: score ${t.avgScore ?? "N/A"}/100, confidence ${t.confidenceLevel}`
    )
    .join("\n");

  return `You are an expert interview coach analyzing a learner's performance data.

Learner profile:
- Readiness Score: ${readinessScore}/100
- Completed adaptive sessions: ${sessionCount}
- Top weak topics (lowest scoring first):
${topicLines || "  • No weak topics identified yet"}

Generate a personalized revision plan. Return ONLY a raw JSON object (no markdown, no backticks) with this exact structure:
{
  "suggestions": ["tip1", "tip2", "tip3", "tip4", "tip5"],
  "weeklyPlan": [
    {"day":"Monday","task":"..."},
    {"day":"Tuesday","task":"..."},
    {"day":"Wednesday","task":"..."},
    {"day":"Thursday","task":"..."},
    {"day":"Friday","task":"..."},
    {"day":"Weekend","task":"..."}
  ],
  "actionPlanSummary": "1-2 sentences personalizing the plan based on the learner's specific weak topics",
  "aiSummary": "2-3 sentences describing the learner's current performance state and what they should prioritise"
}`;
}

/**
 * Rule-based fallback when Gemini is unavailable.
 * Produces the same schema as the AI response using string templates.
 *
 * @param {object[]} topicResults  aggregateTopicProfile().topicMap
 * @param {number}   readinessScore
 * @returns {{ suggestions: string[], weeklyPlan: object[], actionPlanSummary: string, aiSummary: string }}
 */
function buildFallbackRecommendations(topicResults, readinessScore) {
  const weakTopics = topicResults
    .filter((t) => t.isWeak)
    .sort((a, b) => (a.avgScore ?? 0) - (b.avgScore ?? 0))
    .slice(0, 5);

  const topicNames = weakTopics.map((t) => t.topic);

  // Build 5 suggestions from weak topics; pad with generic ones if needed
  const genericSuggestions = [
    "Complete at least one adaptive interview session per week to track your progress.",
    "Review your flashcards daily to strengthen long-term memory retention.",
    "Focus on understanding the underlying concepts, not just memorising answers.",
    "Practice explaining your solutions out loud as if in a real interview.",
    "Track your improvement weekly by revisiting topics you previously struggled with.",
  ];

  const suggestions = topicNames
    .map(
      (topic, i) =>
        i === 0
          ? `Spend 30 minutes daily practising ${topic} — your current score is ${weakTopics[i].avgScore ?? "low"}/100.`
          : `Dedicate focused sessions to ${topic} — revise core concepts and attempt practice problems.`
    )
    .concat(genericSuggestions)
    .slice(0, 5);

  // Build weekly plan
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Weekend"];
  const weeklyPlan = days.map((day, i) => {
    if (i < topicNames.length) {
      return { day, task: `${topicNames[i]} — focused practice and revision` };
    }
    if (i === 5) return { day, task: "Mock adaptive interview session to consolidate all topics" };
    return { day, task: "Review flashcards and solve DSA practice problems" };
  });

  const topTwoNames =
    topicNames.length > 0
      ? topicNames.slice(0, 2).join(" and ")
      : "your identified weak areas";

  const actionPlanSummary =
    `Your strongest opportunity for improvement is ${topTwoNames}. ` +
    `Following the recommended weekly practice plan consistently can significantly improve your interview readiness from ${readinessScore}%.`;

  const aiSummary =
    topicNames.length > 0
      ? `Based on your recent performance, your weakest areas are ${topicNames.slice(0, 3).join(", ")}. ` +
        `Your current readiness score of ${readinessScore}% shows room for targeted improvement. ` +
        `Consistent daily practice on these topics will lead to measurable gains within weeks.`
      : `Your current readiness score is ${readinessScore}%. ` +
        `Complete more adaptive interview sessions to unlock a detailed personalised analysis. ` +
        `Regular practice across all topics will help you build confidence for real interviews.`;

  return { suggestions, weeklyPlan, actionPlanSummary, aiSummary };
}

module.exports = {
  buildWeaknessPrompt,
  buildFallbackRecommendations,
  aiRecsSchema,
};
