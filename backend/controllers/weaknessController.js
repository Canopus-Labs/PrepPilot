/**
 * weaknessController.js
 *
 * Three endpoints for the AI Weakness Detection & Smart Revision feature:
 *   GET  /api/weakness/analysis
 *   GET  /api/weakness/revision-queue
 *   POST /api/weakness/ai-recommendations
 */

const AdaptiveInterviewSession = require("../models/AdaptiveInterviewSession");
const UserSheetProgress = require("../models/UserSheetProgress");
const Sheet = require("../models/Sheet");
const Flashcard = require("../models/Flashcard");
const { generateWithFallback } = require("../utils/geminiHelper");
const { aggregateTopicProfile, buildRevisionQueue } = require("../utils/weaknessAggregator");
const {
  buildWeaknessPrompt,
  buildFallbackRecommendations,
  aiRecsSchema,
} = require("../utils/weaknessPrompt");

/**
 * Shared helper: fetch all raw data for a user and run aggregation.
 * Avoids duplicating the four DB queries across endpoints.
 */
async function fetchAndAggregate(userId) {
  const [sessions, progressList, flashcards] = await Promise.all([
    AdaptiveInterviewSession.find(
      { user: userId, status: "completed" },
      "finalReport topics updatedAt createdAt"
    ).lean(),
    UserSheetProgress.find({ userId }).lean(),
    Flashcard.find({ userId }, "category efactor interval dueDate").lean(),
  ]);

  // Fetch the Sheet documents for the sheets the user has progress on
  const sheetIds = [...new Set(progressList.map((p) => p.sheetId))];
  const sheets =
    sheetIds.length > 0
      ? await Sheet.find({ id: { $in: sheetIds } }).lean()
      : [];

  const aggregated = aggregateTopicProfile(sessions, progressList, sheets, flashcards);

  return { sessions, progressList, sheets, flashcards, aggregated };
}

/**
 * GET /api/weakness/analysis
 *
 * Returns per-topic weakness analysis, readiness score, and trend data.
 */
exports.getAnalysis = async (req, res) => {
  try {
    const { aggregated } = await fetchAndAggregate(req.user._id);

    const weakTopicsCount = aggregated.topicMap.filter((t) => t.isWeak).length;

    return res.status(200).json({
      success: true,
      readinessScore: aggregated.readinessScore,
      weakTopicsCount,
      totalSessionsCompleted: aggregated.totalSessionsCompleted,
      topics: aggregated.topicMap,
      trendData: aggregated.trendData,
    });
  } catch (err) {
    console.error("[Weakness] getAnalysis error:", err);
    return res.status(500).json({ success: false, error: "Failed to fetch weakness analysis." });
  }
};

/**
 * GET /api/weakness/revision-queue?page=1&limit=10
 *
 * Returns a paginated, prioritised list of revision tasks.
 */
exports.getRevisionQueue = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, parseInt(req.query.limit, 10) || 10));

    const { aggregated, progressList, sheets, flashcards } = await fetchAndAggregate(
      req.user._id
    );

    const { items, totalItems } = buildRevisionQueue(
      aggregated.topicMap,
      progressList,
      sheets,
      flashcards,
      page,
      limit
    );

    return res.status(200).json({
      success: true,
      page,
      totalItems,
      items,
    });
  } catch (err) {
    console.error("[Weakness] getRevisionQueue error:", err);
    return res.status(500).json({ success: false, error: "Failed to build revision queue." });
  }
};

/**
 * POST /api/weakness/ai-recommendations
 *
 * Calls Gemini to generate personalised suggestions and a weekly plan.
 * Falls back to rule-based recommendations when Gemini is unavailable.
 */
exports.getAiRecommendations = async (req, res) => {
  try {
    const { aggregated } = await fetchAndAggregate(req.user._id);

    const weakTopics = aggregated.topicMap
      .filter((t) => t.isWeak)
      .sort((a, b) => (a.avgScore ?? 0) - (b.avgScore ?? 0))
      .slice(0, 5);

    const apiKey = process.env.GEMINI_API_KEY;

    // ── Try Gemini ────────────────────────────────────────────────────────
    if (apiKey) {
      try {
        const promptText = buildWeaknessPrompt({
          readinessScore: aggregated.readinessScore,
          sessionCount: aggregated.totalSessionsCompleted,
          weakTopics,
        });

        const { result } = await generateWithFallback(apiKey, [{ text: promptText }], {
          systemInstruction:
            "You are an expert interview coach. Return only a raw JSON object, no markdown or code fences.",
        });

        const rawText = await result.response.text();
        const cleanedText = rawText
          .replace(/^[\s`]*json\s*/i, "")
          .replace(/^\s*```/i, "")
          .replace(/```$/i, "")
          .trim();

        const parsed = aiRecsSchema.safeParse(JSON.parse(cleanedText));

        if (parsed.success) {
          return res.status(200).json({
            success: true,
            usedFallback: false,
            ...parsed.data,
          });
        }
        // Zod validation failed — fall through to fallback
        console.warn("[Weakness] AI response failed Zod validation:", parsed.error.issues);
      } catch (aiErr) {
        // Log but don't propagate — fall through to rule-based fallback
        console.warn("[Weakness] Gemini call failed, using fallback:", aiErr.message);
      }
    }

    // ── Rule-based fallback ───────────────────────────────────────────────
    const fallback = buildFallbackRecommendations(
      aggregated.topicMap,
      aggregated.readinessScore
    );

    return res.status(200).json({
      success: true,
      usedFallback: true,
      ...fallback,
    });
  } catch (err) {
    console.error("[Weakness] getAiRecommendations error:", err);
    return res.status(500).json({ success: false, error: "Failed to generate recommendations." });
  }
};
