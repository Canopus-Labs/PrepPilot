const Question = require("../models/Question");
const Session = require("../models/Session");
const { computeSimilarity } = require("../utils/similarity");

/**
 * Detect interview questions semantically similar to the provided question text.
 * Uses TF-IDF vectorization and cosine similarity on the question corpus.
 *
 * @route POST /api/ai/detect-similarity
 * @access Private (requires auth)
 */
const detectSimilarQuestions = async (req, res) => {
  try {
    const { questionText, sessionId, limit = 5 } = req.body;

    if (!questionText || typeof questionText !== "string" || !questionText.trim()) {
      return res.status(400).json({
        success: false,
        message: "questionText is required and must be a non-empty string.",
      });
    }

    const parsedLimit = parseInt(limit, 10);
    if (isNaN(parsedLimit) || parsedLimit < 1 || parsedLimit > 50) {
      return res.status(400).json({
        success: false,
        message: "limit must be an integer between 1 and 50.",
      });
    }

    // Build the question corpus: either from a specific session or all accessible sessions
    let query = {};
    if (sessionId) {
      query.session = sessionId;
    } else {
      // Fetch all sessions for the current user
      const sessions = await Session.find({ user: req.user._id }).select("_id");
      const sessionIds = sessions.map((s) => s._id);
      query.session = { $in: sessionIds };
    }

    const questions = await Question.find(query)
      .select("question answer session")
      .lean();

    if (questions.length === 0) {
      return res.json({
        success: true,
        results: [],
        message: "No questions found in the corpus to compare against.",
      });
    }

    // Build corpus in the format expected by computeSimilarity
    const corpus = questions.map((q) => ({
      id: q._id.toString(),
      text: q.question + " " + (q.answer || ""),
    }));

    // Compute similarity scores using the pure utility
    const scored = computeSimilarity(questionText, corpus, { limit: parsedLimit });

    // Map back to response format
    const results = scored.map((r) => {
      const orig = questions.find((q) => q._id.toString() === r.id);
      return {
        questionId: r.id,
        sessionId: orig ? orig.session.toString() : undefined,
        question: orig ? orig.question : r.text.split(" ")[0],
        answer: orig ? orig.answer : undefined,
        similarityScore: r.similarityScore,
      };
    });

    return res.json({
      success: true,
      results,
      totalCompared: questions.length,
    });
  } catch (err) {
    console.error("detectSimilarQuestions error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error while detecting similar questions.",
    });
  }
};

module.exports = { detectSimilarQuestions };
