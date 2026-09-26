const AdaptiveInterviewSession = require("../models/AdaptiveInterviewSession");
const { generateWithFallback } = require("../utils/geminiHelper");

const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const MAX_QUESTIONS_LIMIT = 20;
const MAX_TOPIC_LENGTH = 100;

function cleanGeminiJson(rawText) {
  if (typeof rawText !== "string" || !rawText.trim()) {
    throw new Error("AI returned an empty response");
  }

  let cleaned = rawText.trim();

  // Remove markdown code fences if Gemini adds them.
  cleaned = cleaned
    .replace(/^```json\s*/i, "")
    .replace(/^```\s*/i, "")
    .replace(/\s*```$/i, "")
    .trim();

  // Extract the first JSON object if extra text is present.
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.slice(firstBrace, lastBrace + 1);
  }

  return JSON.parse(cleaned);
}

function clampScore(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.max(0, Math.min(100, Math.round(number)));
}

function calculateOverallScore({
  correctnessScore,
  explanationScore,
  approachScore,
}) {
  // Consistent rubric:
  // Correctness = 50%
  // Explanation = 25%
  // Approach = 25%
  return Math.round(
    correctnessScore * 0.5 +
      explanationScore * 0.25 +
      approachScore * 0.25
  );
}

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

function normalizeQuestion(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function selectNextTopic(topics, questions) {
  if (!Array.isArray(topics) || topics.length === 0) {
    throw new Error("At least one topic is required");
  }

  const counts = new Map(topics.map((topic) => [topic, 0]));

  for (const question of questions) {
    const topic = String(question.topic || "").trim();

    if (counts.has(topic)) {
      counts.set(topic, counts.get(topic) + 1);
    }
  }

  const minimumCount = Math.min(...counts.values());

  const candidates = topics.filter(
    (topic) => counts.get(topic) === minimumCount
  );

  // Rotate through equally-used topics rather than always selecting
  // the first topic when several have the same count.
  const index = questions.length % candidates.length;

  return candidates[index];
}

async function generateQuestion({
  role,
  interviewType,
  experienceLevel,
  topic,
  currentDifficulty,
  previousQuestions = [],
}) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  const previousQuestionTexts = previousQuestions
    .map((question) => question.questionText)
    .filter(Boolean)
    .join("\n- ");

  const promptText = `
You are an expert technical interviewer.

Role: ${role}
Interview type: ${interviewType}
Candidate experience level: ${experienceLevel}
Target difficulty: ${currentDifficulty}
Required topic: ${topic}

Generate exactly ONE interview question.

Requirements:
- The question must match the role and interview type.
- The question must be appropriate for the experience level.
- The question must match the target difficulty.
- The question must clearly belong to the required topic.
- Do not repeat or closely paraphrase any previous question.

Previously asked questions:
- ${previousQuestionTexts || "None"}

Return ONLY valid JSON:
{
  "questionText": "string",
  "topic": "${topic}"
}
`;

  const { result } = await generateWithFallback(
    apiKey,
    [{ text: promptText }],
    {
      systemInstruction:
        "You generate structured interview questions and return valid JSON only.",
    }
  );

  const rawText = await result.response.text();
  const data = cleanGeminiJson(rawText);

  if (!data.questionText || typeof data.questionText !== "string") {
    throw new Error("AI returned an invalid question");
  }

  return {
    questionText: data.questionText.trim(),
    topic,
  };
}

async function generateUniqueQuestion({
  role,
  interviewType,
  experienceLevel,
  topic,
  currentDifficulty,
  previousQuestions,
}) {
  const previousNormalized = new Set(
    previousQuestions.map((question) =>
      normalizeQuestion(question.questionText)
    )
  );

  // Try twice in case Gemini generates a duplicate.
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const generated = await generateQuestion({
      role,
      interviewType,
      experienceLevel,
      topic,
      currentDifficulty,
      previousQuestions,
    });

    const normalized = normalizeQuestion(generated.questionText);

    if (!previousNormalized.has(normalized)) {
      return generated;
    }
  }

  throw new Error("AI generated a duplicate interview question");
}

async function evaluateAnswer(
  questionText,
  topic,
  difficulty,
  interviewType,
  userAnswer
) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing");
  }

  const promptText = `
You are an expert ${interviewType} interviewer evaluating a candidate's answer.

Question:
${questionText}

Topic:
${topic}

Difficulty:
${difficulty}

Candidate answer:
${userAnswer}

Evaluate using this rubric:

1. Correctness: technical correctness and completeness.
2. Explanation: clarity and quality of explanation.
3. Approach: quality of reasoning, problem-solving method, and structure.

Give each category a score from 0 to 100.

Return ONLY valid JSON:
{
  "correctnessScore": 0,
  "explanationScore": 0,
  "approachScore": 0,
  "approachFeedback": "string",
  "generalFeedback": "string"
}
`;

  const { result } = await generateWithFallback(
    apiKey,
    [{ text: promptText }],
    {
      systemInstruction:
        "You are an AI interviewer evaluating answers. Return valid JSON only.",
    }
  );

  const rawText = await result.response.text();
  const data = cleanGeminiJson(rawText);

  if (
    data.correctnessScore === undefined ||
    data.explanationScore === undefined ||
    data.approachScore === undefined
  ) {
    throw new Error("AI returned incomplete evaluation data");
  }

  const correctnessScore = clampScore(data.correctnessScore);
  const explanationScore = clampScore(data.explanationScore);
  const approachScore = clampScore(data.approachScore);

  return {
    correctnessScore,
    explanationScore,
    approachScore,
    overallScore: calculateOverallScore({
      correctnessScore,
      explanationScore,
      approachScore,
    }),
    approachFeedback:
      typeof data.approachFeedback === "string"
        ? data.approachFeedback.trim()
        : "No approach feedback was provided.",
    generalFeedback:
      typeof data.generalFeedback === "string"
        ? data.generalFeedback.trim()
        : "No general feedback was provided.",
  };
}

function buildFinalReport(questions) {
  const answeredQuestions = questions.filter(
    (question) => question.isAnswered
  );

  if (answeredQuestions.length === 0) {
    return {
      totalScore: 0,
      topicPerformance: {},
      improvementAreas: ["Complete at least one answered question."],
    };
  }

  const totalScore = Math.round(
    answeredQuestions.reduce(
      (sum, question) => sum + (question.overallScore || 0),
      0
    ) / answeredQuestions.length
  );

  const topicScores = {};
  const topicCounts = {};

  for (const question of answeredQuestions) {
    const topic = question.topic || "General";

    topicScores[topic] =
      (topicScores[topic] || 0) + (question.overallScore || 0);

    topicCounts[topic] = (topicCounts[topic] || 0) + 1;
  }

  for (const topic of Object.keys(topicScores)) {
    topicScores[topic] = Math.round(
      topicScores[topic] / topicCounts[topic]
    );
  }

  const improvementAreas = Object.entries(topicScores)
    .filter(([, score]) => score < 70)
    .sort((a, b) => a[1] - b[1])
    .map(
      ([topic, score]) =>
        `${topic}: strengthen this area (average score ${score}%).`
    );

  if (improvementAreas.length === 0) {
    improvementAreas.push(
      "Continue practicing mixed-difficulty questions to maintain consistency."
    );
  }

  return {
    totalScore,
    topicPerformance: topicScores,
    improvementAreas,
  };
}

// POST /api/adaptive-interview/start
exports.startSession = async (req, res) => {
  try {
    const {
      role,
      interviewType = "Technical",
      experienceLevel,
      topics,
      maxQuestions = 5,
    } = req.body;

    if (!role || !experienceLevel) {
      return res.status(400).json({
        error: "role and experienceLevel are required",
      });
    }

    if (!Array.isArray(topics) || topics.length === 0) {
      return res.status(400).json({
        error: "topics must be a non-empty array",
      });
    }

    const cleanedTopics = [
      ...new Set(
        topics
          .map((topic) => String(topic).trim())
          .filter(Boolean)
          .slice(0, 10)
      ),
    ];

    if (cleanedTopics.length === 0) {
      return res.status(400).json({
        error: "At least one valid topic is required",
      });
    }

    if (
      cleanedTopics.some((topic) => topic.length > MAX_TOPIC_LENGTH)
    ) {
      return res.status(400).json({
        error: "Each topic must be 100 characters or fewer",
      });
    }

    const parsedMaxQuestions = Number(maxQuestions);

    if (
      !Number.isInteger(parsedMaxQuestions) ||
      parsedMaxQuestions < 1 ||
      parsedMaxQuestions > MAX_QUESTIONS_LIMIT
    ) {
      return res.status(400).json({
        error: `maxQuestions must be an integer between 1 and ${MAX_QUESTIONS_LIMIT}`,
      });
    }

    const session = new AdaptiveInterviewSession({
      user: req.user._id,
      role: String(role).trim(),
      interviewType: String(interviewType).trim() || "Technical",
      experienceLevel: String(experienceLevel).trim(),
      topics: cleanedTopics,
      currentDifficulty: "Medium",
      maxQuestions: parsedMaxQuestions,
    });

    const topic = selectNextTopic(cleanedTopics, []);

    const question = await generateUniqueQuestion({
      role: session.role,
      interviewType: session.interviewType,
      experienceLevel: session.experienceLevel,
      topic,
      currentDifficulty: session.currentDifficulty,
      previousQuestions: [],
    });

    session.questions.push({
      questionText: question.questionText,
      topic: question.topic,
      difficulty: session.currentDifficulty,
    });

    await session.save();

    return res.status(201).json({
      success: true,
      session,
    });
  } catch (error) {
    console.error("[Adaptive] Start Session Error:", error);

    const message = String(error.message || "").toLowerCase();

    if (
      message.includes("ai returned") ||
      message.includes("gemini") ||
      message.includes("duplicate")
    ) {
      return res.status(502).json({
        error:
          "The AI service could not generate a valid interview question. Please try again.",
      });
    }

    return res.status(500).json({
      error: "Failed to start adaptive interview session",
    });
  }
};

// POST /api/adaptive-interview/:sessionId/answer
exports.submitAnswer = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { answer } = req.body;

    if (!answer || !String(answer).trim()) {
      return res.status(400).json({
        error: "Answer is required",
      });
    }

    const session = await AdaptiveInterviewSession.findOne({
      _id: sessionId,
      user: req.user._id,
    });

    if (!session) {
      return res.status(404).json({
        error: "Session not found",
      });
    }

    if (session.status === "completed") {
      return res.status(400).json({
        error: "Session already completed",
      });
    }

    const currentQIndex = session.questions.length - 1;
    const currentQuestion = session.questions[currentQIndex];

    if (!currentQuestion || currentQuestion.isAnswered) {
      return res.status(400).json({
        error: "There is no unanswered question in this session",
      });
    }

    const evaluation = await evaluateAnswer(
      currentQuestion.questionText,
      currentQuestion.topic,
      currentQuestion.difficulty,
      session.interviewType,
      String(answer).trim()
    );

    currentQuestion.userAnswer = String(answer).trim();
    currentQuestion.isAnswered = true;
    currentQuestion.feedback = {
      correctnessScore: evaluation.correctnessScore,
      explanationScore: evaluation.explanationScore,
      approachScore: evaluation.approachScore,
      approachFeedback: evaluation.approachFeedback,
      generalFeedback: evaluation.generalFeedback,
    };
    currentQuestion.overallScore = evaluation.overallScore;

    session.currentDifficulty = getNextDifficulty(
      currentQuestion.difficulty,
      evaluation.overallScore
    );

    const isCompleted =
      session.questions.length >= session.maxQuestions;

    if (isCompleted) {
      session.status = "completed";
      session.finalReport = buildFinalReport(session.questions);
    } else {
      const nextTopic = selectNextTopic(
        session.topics,
        session.questions
      );

      const nextQuestion = await generateUniqueQuestion({
        role: session.role,
        interviewType: session.interviewType,
        experienceLevel: session.experienceLevel,
        topic: nextTopic,
        currentDifficulty: session.currentDifficulty,
        previousQuestions: session.questions,
      });

      session.questions.push({
        questionText: nextQuestion.questionText,
        topic: nextQuestion.topic,
        difficulty: session.currentDifficulty,
      });
    }

    await session.save();

    return res.json({
      success: true,
      evaluation,
      session,
      isCompleted,
    });
  } catch (error) {
    console.error("[Adaptive] Submit Answer Error:", error);

    const message = String(error.message || "").toLowerCase();

    if (
      message.includes("ai returned") ||
      message.includes("gemini") ||
      message.includes("duplicate")
    ) {
      return res.status(502).json({
        error:
          "The AI service could not process this answer correctly. Please try again.",
      });
    }

    return res.status(500).json({
      error: "Failed to evaluate answer",
    });
  }
};

// GET /api/adaptive-interview/:sessionId
exports.getSessionReport = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await AdaptiveInterviewSession.findOne({
      _id: sessionId,
      user: req.user._id,
    });

    if (!session) {
      return res.status(404).json({
        error: "Session not found",
      });
    }

    return res.json({
      success: true,
      session,
    });
  } catch (error) {
    console.error("[Adaptive] Get Report Error:", error);

    return res.status(500).json({
      error: "Failed to fetch session",
    });
  }
};
