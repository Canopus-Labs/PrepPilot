const AdaptiveInterviewSession = require("../models/AdaptiveInterviewSession");
const { generateWithFallback } = require("../utils/geminiHelper");

const MAX_QUESTIONS_LIMIT = 20;
const MIN_QUESTIONS_LIMIT = 1;

/**
 * Strips markdown code fences and returns parsed JSON.
 * Handles responses wrapped in ```json ... ``` or ``` ... ```.
 * @param {string} raw - Raw text from the Gemini response.
 * @returns {object} Parsed JSON object.
 * @throws {SyntaxError} If the cleaned text is not valid JSON.
 */
function parseGeminiJson(raw) {
  const cleaned = raw
    .replace(/^[\s`]*json\s*/i, "")
    .replace(/^[\s`]+/, "")
    .replace(/[\s`]+$/, "")
    .trim();
  return JSON.parse(cleaned);
}

/**
 * Generates a single interview question via Gemini.
 * @param {string} role
 * @param {string} experienceLevel
 * @param {string[]} topics
 * @param {string} currentDifficulty - "Easy" | "Medium" | "Hard"
 * @param {Array<{questionText:string}>} previousQuestions - Already asked questions.
 * @returns {Promise<{questionText:string, topic:string}>}
 */
async function generateQuestion(role, experienceLevel, topics, currentDifficulty, previousQuestions = []) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing");

  const prevQTexts = previousQuestions.map((q) => q.questionText).join(" | ");

  const promptText = `
You are an expert technical interviewer for the role of ${role} (${experienceLevel} experience).
Generate a single interview question.
Target difficulty: ${currentDifficulty}.
Allowed topics: ${topics.join(", ")}.
Previously asked questions (DO NOT repeat or ask highly similar ones): [${prevQTexts}].

Output your response strictly as a JSON object matching this structure:
{
  "questionText": "The interview question",
  "topic": "The specific topic of the question (must be one of the allowed topics or closely related)"
}
Do not include markdown blocks, just the raw JSON.`;

  const { result } = await generateWithFallback(apiKey, [{ text: promptText }], {
    systemInstruction: "You are an AI interviewer generating structured JSON questions.",
  });

  const raw = await result.response.text();
  const parsed = parseGeminiJson(raw);

  if (!parsed.questionText || !parsed.topic) {
    throw new Error("Malformed question response from AI");
  }
  return { questionText: String(parsed.questionText), topic: String(parsed.topic) };
}

/**
 * Evaluates a candidate answer via Gemini using a structured rubric.
 * @param {string} questionText
 * @param {string} topic
 * @param {string} difficulty
 * @param {string} userAnswer
 * @returns {Promise<{correctnessScore:number, explanationScore:number, overallScore:number, approachFeedback:string, generalFeedback:string}>}
 */
async function evaluateAnswer(questionText, topic, difficulty, userAnswer) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing");

  const promptText = `
You are an expert technical interviewer evaluating a candidate answer.
Question (${difficulty} level, Topic: ${topic}): "${questionText}"
Candidate Answer: "${userAnswer}"

Evaluate based on correctness, explanation quality, and overall approach.
Output strictly as a JSON object matching this structure:
{
  "correctnessScore": <number 0-100>,
  "explanationScore": <number 0-100>,
  "overallScore": <number 0-100>,
  "approachFeedback": "Brief feedback on their problem-solving approach.",
  "generalFeedback": "Constructive feedback on what was good and what to improve."
}
Do not include markdown blocks, just the raw JSON.`;

  const { result } = await generateWithFallback(apiKey, [{ text: promptText }], {
    systemInstruction: "You are an AI interviewer evaluating answers and returning structured JSON.",
  });

  const raw = await result.response.text();
  const parsed = parseGeminiJson(raw);

  const clamp = (val) => Math.min(100, Math.max(0, Number(val) || 0));

  return {
    correctnessScore: clamp(parsed.correctnessScore),
    explanationScore: clamp(parsed.explanationScore),
    overallScore: clamp(parsed.overallScore),
    approachFeedback: String(parsed.approachFeedback || ""),
    generalFeedback: String(parsed.generalFeedback || ""),
  };
}

/**
 * Determines the next difficulty level based on the current difficulty and score.
 * - Score >= 80: increase (Easy -> Medium -> Hard)
 * - Score <= 40: decrease (Hard -> Medium -> Easy)
 * - Otherwise: keep the same
 * @param {string} currentDifficulty
 * @param {number} score
 * @returns {string} Next difficulty.
 */
function getNextDifficulty(currentDifficulty, score) {
  if (score >= 80) {
    if (currentDifficulty === "Easy") return "Medium";
    if (currentDifficulty === "Medium") return "Hard";
    return "Hard";
  }
  if (score <= 40) {
    if (currentDifficulty === "Hard") return "Medium";
    if (currentDifficulty === "Medium") return "Easy";
    return "Easy";
  }
  return currentDifficulty;
}

/**
 * Builds a final performance report from completed session questions.
 * Exported for unit testing.
 * @param {Array} questions
 * @returns {{ totalScore: number, topicPerformance: object, improvementAreas: string[] }}
 */
function buildFinalReport(questions) {
  let total = 0;
  const topicScores = {};
  const topicCounts = {};

  questions.forEach((q) => {
    const score = q.overallScore || 0;
    total += score;
    const t = q.topic || "General";
    if (!topicScores[t]) {
      topicScores[t] = 0;
      topicCounts[t] = 0;
    }
    topicScores[t] += score;
    topicCounts[t] += 1;
  });

  const avgTopicScores = {};
  Object.keys(topicScores).forEach((t) => {
    avgTopicScores[t] = Math.round(topicScores[t] / topicCounts[t]);
  });

  const weakTopics = Object.keys(avgTopicScores).filter((t) => avgTopicScores[t] < 70);
  const improvementAreas =
    weakTopics.length > 0
      ? weakTopics.map((t) => `Focus on improving your understanding of ${t}.`)
      : ["Great performance! Keep practising to maintain your edge."];

  return {
    totalScore: questions.length > 0 ? Math.round(total / questions.length) : 0,
    topicPerformance: avgTopicScores,
    improvementAreas,
  };
}

// Export pure helpers for unit testing
exports._parseGeminiJson = parseGeminiJson;
exports._getNextDifficulty = getNextDifficulty;
exports._buildFinalReport = buildFinalReport;

// ---- Controllers ------------------------------------------------------------

/**
 * POST /api/adaptive-interview/start
 * Start a new adaptive interview session and return the first question.
 */
exports.startSession = async (req, res) => {
  try {
    const { role, experienceLevel, topics, maxQuestions = 5 } = req.body;

    if (!role || typeof role !== "string" || !role.trim()) {
      return res.status(400).json({ error: "role is required and must be a non-empty string" });
    }
    if (!experienceLevel || typeof experienceLevel !== "string" || !experienceLevel.trim()) {
      return res.status(400).json({ error: "experienceLevel is required and must be a non-empty string" });
    }
    if (!Array.isArray(topics) || topics.length === 0) {
      return res.status(400).json({ error: "topics must be a non-empty array" });
    }

    const parsedMax = parseInt(maxQuestions, 10);
    if (isNaN(parsedMax) || parsedMax < MIN_QUESTIONS_LIMIT || parsedMax > MAX_QUESTIONS_LIMIT) {
      return res.status(400).json({
        error: `maxQuestions must be a number between ${MIN_QUESTIONS_LIMIT} and ${MAX_QUESTIONS_LIMIT}`,
      });
    }

    const session = new AdaptiveInterviewSession({
      user: req.user._id,
      role: role.trim(),
      experienceLevel: experienceLevel.trim(),
      topics: topics.map((t) => String(t).trim()).filter(Boolean),
      currentDifficulty: "Medium",
      maxQuestions: parsedMax,
    });

    let qData;
    try {
      qData = await generateQuestion(session.role, session.experienceLevel, session.topics, session.currentDifficulty, []);
    } catch (aiError) {
      console.error("[Adaptive] AI question generation failed on start:", aiError);
      return res.status(502).json({ error: "AI service failed to generate a question. Please try again." });
    }

    session.questions.push({
      questionText: qData.questionText,
      topic: qData.topic,
      difficulty: session.currentDifficulty,
    });

    await session.save();
    res.status(201).json({ success: true, session });
  } catch (error) {
    console.error("[Adaptive] Start Session Error:", error);
    res.status(500).json({ error: "Failed to start session" });
  }
};

/**
 * POST /api/adaptive-interview/:sessionId/answer
 * Submit an answer to the current question, receive AI evaluation, and
 * get the next question or a completed session with final report.
 */
exports.submitAnswer = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { answer } = req.body;

    if (!answer || typeof answer !== "string" || !answer.trim()) {
      return res.status(400).json({ error: "answer is required and must be a non-empty string" });
    }

    const session = await AdaptiveInterviewSession.findOne({ _id: sessionId, user: req.user._id });
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }
    if (session.status === "completed") {
      return res.status(400).json({ error: "Session already completed" });
    }

    const currentQIndex = session.questions.length - 1;
    const currentQ = session.questions[currentQIndex];

    if (currentQ.isAnswered) {
      return res.status(400).json({ error: "Current question is already answered. Fetch session for next question." });
    }

    // Evaluate via AI with graceful fallback on failure
    let evaluation;
    try {
      evaluation = await evaluateAnswer(currentQ.questionText, currentQ.topic, currentQ.difficulty, answer.trim());
    } catch (aiError) {
      console.error("[Adaptive] AI evaluation failed:", aiError);
      evaluation = {
        correctnessScore: 50,
        explanationScore: 50,
        overallScore: 50,
        approachFeedback: "AI evaluation is temporarily unavailable. A neutral score has been applied.",
        generalFeedback: "Please try again later for detailed feedback.",
      };
    }

    session.questions[currentQIndex].userAnswer = answer.trim();
    session.questions[currentQIndex].isAnswered = true;
    session.questions[currentQIndex].feedback = {
      correctnessScore: evaluation.correctnessScore,
      explanationScore: evaluation.explanationScore,
      approachFeedback: evaluation.approachFeedback,
      generalFeedback: evaluation.generalFeedback,
    };
    session.questions[currentQIndex].overallScore = evaluation.overallScore;

    const nextDiff = getNextDifficulty(currentQ.difficulty, evaluation.overallScore);
    session.currentDifficulty = nextDiff;

    const isCompleted = session.questions.length >= session.maxQuestions;

    if (!isCompleted) {
      let nextQData;
      try {
        nextQData = await generateQuestion(
          session.role,
          session.experienceLevel,
          session.topics,
          session.currentDifficulty,
          session.questions
        );
      } catch (aiError) {
        console.error("[Adaptive] AI next question generation failed:", aiError);
        await session.save();
        return res.status(502).json({
          error: "AI service failed to generate the next question. Your answer was saved — please retry.",
          evaluation,
          session,
          isCompleted: false,
        });
      }
      session.questions.push({
        questionText: nextQData.questionText,
        topic: nextQData.topic,
        difficulty: session.currentDifficulty,
      });
    } else {
      session.status = "completed";
      session.finalReport = buildFinalReport(session.questions);
    }

    await session.save();
    res.json({ success: true, evaluation, session, isCompleted });
  } catch (error) {
    console.error("[Adaptive] Submit Answer Error:", error);
    res.status(500).json({ error: "Failed to evaluate answer" });
  }
};

/**
 * GET /api/adaptive-interview/history
 * Fetch paginated list of the authenticated user past adaptive interview sessions.
 */
exports.getSessionHistory = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page, 10) || 1);
    const limit = Math.min(20, Math.max(1, parseInt(req.query.limit, 10) || 10));
    const skip = (page - 1) * limit;

    const [sessions, total] = await Promise.all([
      AdaptiveInterviewSession.find({ user: req.user._id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("role experienceLevel topics status currentDifficulty maxQuestions finalReport createdAt updatedAt")
        .lean(),
      AdaptiveInterviewSession.countDocuments({ user: req.user._id }),
    ]);

    res.json({
      success: true,
      sessions,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    console.error("[Adaptive] Get History Error:", error);
    res.status(500).json({ error: "Failed to fetch session history" });
  }
};

/**
 * GET /api/adaptive-interview/:sessionId
 * Fetch full session details or final report.
 */
exports.getSessionReport = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const session = await AdaptiveInterviewSession.findOne({ _id: sessionId, user: req.user._id });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    res.json({ success: true, session });
  } catch (error) {
    console.error("[Adaptive] Get Report Error:", error);
    res.status(500).json({ error: "Failed to fetch session" });
  }
};
