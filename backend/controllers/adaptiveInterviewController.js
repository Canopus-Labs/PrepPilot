const AdaptiveInterviewSession = require("../models/AdaptiveInterviewSession");
const { generateWithFallback } = require("../utils/geminiHelper");

// Helper to generate a question using Gemini
async function generateQuestion(role, experienceLevel, topics, currentDifficulty, previousQuestions = []) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing");

  const prevQTexts = previousQuestions.map(q => q.questionText).join(" | ");

  const promptText = `
You are an expert technical interviewer for the role of ${role} (${experienceLevel} experience).
You need to generate a single interview question.
Target difficulty: ${currentDifficulty}.
Allowed topics: ${topics.join(", ")}.
Previously asked questions (DO NOT repeat these or ask highly similar ones): [${prevQTexts}].

Output your response strictly as a JSON object matching this structure:
{
  "questionText": "The interview question",
  "topic": "The specific topic of the question (must be one of the allowed topics or closely related)"
}
Do not include markdown blocks, just the raw JSON.`;

  const { result } = await generateWithFallback(apiKey, [{ text: promptText }], {
    systemInstruction: "You are an AI interviewer generating structured JSON questions."
  });

  const rawText = await result.response.text();
  const cleanedText = rawText.replace(/^[\s`]*json\s*/i, "").replace(/^\s*```/i, "").replace(/```$/i, "").trim();
  
  return JSON.parse(cleanedText);
}

// Helper to evaluate an answer using Gemini
async function evaluateAnswer(questionText, topic, difficulty, userAnswer) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is missing");

  const promptText = `
You are an expert technical interviewer evaluating a candidate's answer.
Question (${difficulty} level, Topic: ${topic}): "${questionText}"
Candidate's Answer: "${userAnswer}"

Evaluate the answer based on correctness, explanation quality, and overall approach.
Output strictly as a JSON object matching this structure:
{
  "correctnessScore": 0-100,
  "explanationScore": 0-100,
  "overallScore": 0-100,
  "approachFeedback": "Brief feedback on their problem-solving approach or thought process.",
  "generalFeedback": "Constructive feedback on what was good and what could be improved."
}
Do not include markdown blocks, just the raw JSON.`;

  const { result } = await generateWithFallback(apiKey, [{ text: promptText }], {
    systemInstruction: "You are an AI interviewer evaluating answers and returning structured JSON."
  });

  const rawText = await result.response.text();
  const cleanedText = rawText.replace(/^[\s`]*json\s*/i, "").replace(/^\s*```/i, "").replace(/```$/i, "").trim();
  
  return JSON.parse(cleanedText);
}

// Helper to determine next difficulty
function getNextDifficulty(currentDifficulty, score) {
  if (score >= 80) {
    if (currentDifficulty === "Easy") return "Medium";
    if (currentDifficulty === "Medium") return "Hard";
    return "Hard";
  } else if (score <= 40) {
    if (currentDifficulty === "Hard") return "Medium";
    if (currentDifficulty === "Medium") return "Easy";
    return "Easy";
  }
  return currentDifficulty; // Remains the same if score is between 41 and 79
}

// 1. Start a new adaptive session
exports.startSession = async (req, res) => {
  try {
    const { role, experienceLevel, topics, maxQuestions = 5 } = req.body;
    
    if (!role || !experienceLevel || !topics || topics.length === 0) {
      return res.status(400).json({ error: "Missing required fields: role, experienceLevel, topics" });
    }

    const session = new AdaptiveInterviewSession({
      user: req.user._id,
      role,
      experienceLevel,
      topics,
      currentDifficulty: "Medium",
      maxQuestions
    });

    // Generate first question
    const qData = await generateQuestion(role, experienceLevel, topics, session.currentDifficulty, []);
    
    session.questions.push({
      questionText: qData.questionText,
      topic: qData.topic,
      difficulty: session.currentDifficulty
    });

    await session.save();

    res.status(201).json({ success: true, session });
  } catch (error) {
    console.error("[Adaptive] Start Session Error:", error);
    res.status(500).json({ error: "Failed to start session" });
  }
};

// 2. Submit an answer and get next question (or complete)
exports.submitAnswer = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const { answer } = req.body;

    if (!answer) {
      return res.status(400).json({ error: "Answer is required" });
    }

    const session = await AdaptiveInterviewSession.findOne({ _id: sessionId, user: req.user._id });
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    if (session.status === "completed") {
      return res.status(400).json({ error: "Session already completed" });
    }

    // Get current question (last one)
    const currentQIndex = session.questions.length - 1;
    const currentQ = session.questions[currentQIndex];

    if (currentQ.isAnswered) {
      return res.status(400).json({ error: "Current question is already answered. Fetch session for next question." });
    }

    // Evaluate
    const evaluation = await evaluateAnswer(currentQ.questionText, currentQ.topic, currentQ.difficulty, answer);
    
    session.questions[currentQIndex].userAnswer = answer;
    session.questions[currentQIndex].isAnswered = true;
    session.questions[currentQIndex].feedback = {
      correctnessScore: evaluation.correctnessScore,
      explanationScore: evaluation.explanationScore,
      approachFeedback: evaluation.approachFeedback,
      generalFeedback: evaluation.generalFeedback
    };
    session.questions[currentQIndex].overallScore = evaluation.overallScore;

    // Determine next difficulty
    const nextDiff = getNextDifficulty(currentQ.difficulty, evaluation.overallScore);
    session.currentDifficulty = nextDiff;

    let isCompleted = session.questions.length >= session.maxQuestions;

    if (!isCompleted) {
      // Generate next question
      const nextQData = await generateQuestion(
        session.role, 
        session.experienceLevel, 
        session.topics, 
        session.currentDifficulty, 
        session.questions
      );
      
      session.questions.push({
        questionText: nextQData.questionText,
        topic: nextQData.topic,
        difficulty: session.currentDifficulty
      });
    } else {
      // Complete session and generate metrics
      session.status = "completed";
      
      let total = 0;
      let topicScores = {};
      let topicCounts = {};
      
      session.questions.forEach(q => {
        total += q.overallScore || 0;
        if (!topicScores[q.topic]) {
          topicScores[q.topic] = 0;
          topicCounts[q.topic] = 0;
        }
        topicScores[q.topic] += q.overallScore || 0;
        topicCounts[q.topic] += 1;
      });

      Object.keys(topicScores).forEach(t => {
        topicScores[t] = Math.round(topicScores[t] / topicCounts[t]);
      });

      // Simple AI call for improvement areas based on weak topics
      const weakTopics = Object.keys(topicScores).filter(t => topicScores[t] < 70);
      let improvementAreas = ["Keep practicing your problem-solving skills!"];
      if (weakTopics.length > 0) {
        improvementAreas = weakTopics.map(t => `Focus on improving your understanding of ${t}.`);
      }

      session.finalReport = {
        totalScore: Math.round(total / session.questions.length),
        topicPerformance: topicScores,
        improvementAreas
      };
    }

    await session.save();

    res.json({
      success: true,
      evaluation,
      session,
      isCompleted
    });
  } catch (error) {
    console.error("[Adaptive] Submit Answer Error:", error);
    res.status(500).json({ error: "Failed to evaluate answer" });
  }
};

// 3. Get session details (for final report)
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
