const { GoogleGenerativeAI } = require("@google/generative-ai");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
} = require("../utils/prompts");

// Initialize Gemini with API key from .env
const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const GEMINI_TIMEOUT = parseInt(process.env.GEMINI_TIMEOUT, 10) || 30000;

// @desc    Generate interview questions and answers using Gemini
// @route   POST /api/ai/generate-questions
// @access  Private
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Build prompt
    const prompt = questionAnswerPrompt({
      role,
      experience,
      topicsToFocus,
      numberOfQuestions,
    });

    // Use stable Gemini model
    const candidateModels = [
      process.env.GEMINI_MODEL,
      "models/gemini-2.5-flash",
      "models/gemini-flash-latest",
      "models/gemini-2.0-flash",
    ].filter(Boolean);
    let lastErr = null;
    let result = null;
    let usedModel = null;
    for (const m of candidateModels) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), GEMINI_TIMEOUT);
      try {
        console.log(`Trying model: ${m}`);
        const model = ai.getGenerativeModel({ model: m }, { signal: controller.signal });
        result = await model.generateContent([prompt]);
        usedModel = m;
        console.log(`Successfully used model: ${m}`);
        break;
      } catch (e) {
        if (e.name === "AbortError" || (e.message && e.message.includes("abort"))) {
          const timeoutErr = new Error(`Gemini API call timed out after ${GEMINI_TIMEOUT}ms for model ${m}`);
          timeoutErr.name = "TimeoutError";
          console.error(`[Timeout] Model ${m} timed out:`, timeoutErr.message);
          lastErr = timeoutErr;
          break;
        }
        console.error(`Model ${m} failed:`, e.message);
        lastErr = e;
        continue;
      } finally {
        clearTimeout(timeoutId);
      }
    }
    if (!result) throw lastErr || new Error("All Gemini models failed");

    const rawText = await result.response.text();
    // Robustly clean: remove all leading/trailing code block markers (```json, ```), even if repeated, and trim
    let cleanedText = rawText
      .replace(/^(\s*```json\s*|\s*```\s*)+/i, "") // remove all leading ```json or ```
      .replace(/(\s*```\s*)+$/i, "") // remove all trailing ```
      .trim();

    try {
      const data = JSON.parse(cleanedText);
      // Handle array response (questions) vs object response
      if (Array.isArray(data)) {
        res.status(200).json({ model: usedModel, question: data });
      } else {
        res.status(200).json({ model: usedModel, ...data });
      }
    } catch (err) {
      console.error("Gemini returned invalid JSON:", cleanedText); // Log the cleaned text
      res.status(500).json({
        message: "Gemini returned invalid JSON",
        raw: rawText,
      });
    }
  } catch (error) {
    console.error("Gemini API Error:", error); // Log the error
    if (error.name === "TimeoutError") {
      return res.status(504).json({
        message: "Request timed out",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};

// @desc    Generate explanation for a concept/question
// @route   POST /api/ai/generate-explanation
// @access  Private
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Missing question" });
    }

    const prompt = conceptExplainPrompt(question);

    const candidateModels = [
      process.env.GEMINI_MODEL,
      "models/gemini-2.5-flash",
      "models/gemini-flash-latest",
      "models/gemini-2.0-flash",
    ].filter(Boolean);
    let lastErr = null;
    let result = null;
    let usedModel = null;
    for (const m of candidateModels) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), GEMINI_TIMEOUT);
      try {
        console.log(`Trying model: ${m}`);
        const model = ai.getGenerativeModel({ model: m }, { signal: controller.signal });
        result = await model.generateContent([prompt]);
        usedModel = m;
        console.log(`Successfully used model: ${m}`);
        break;
      } catch (e) {
        if (e.name === "AbortError" || (e.message && e.message.includes("abort"))) {
          const timeoutErr = new Error(`Gemini API call timed out after ${GEMINI_TIMEOUT}ms for model ${m}`);
          timeoutErr.name = "TimeoutError";
          console.error(`[Timeout] Model ${m} timed out:`, timeoutErr.message);
          lastErr = timeoutErr;
          break;
        }
        console.error(`Model ${m} failed:`, e.message);
        lastErr = e;
        continue;
      } finally {
        clearTimeout(timeoutId);
      }
    }
    if (!result) throw lastErr || new Error("All Gemini models failed");

    const rawText = await result.response.text();
    // Clean: remove all leading/trailing code block markers (```json, ```), even if repeated, and trim
    let cleanedText = rawText
      .replace(/^\s*```json\s*/i, "")
      .replace(/^\s*```\s*/i, "")
      .replace(/(\s*```\s*)+$/i, "")
      .trim();

    try {
      const data = JSON.parse(cleanedText);
      res.status(200).json({ model: usedModel, ...data });
    } catch (err) {
      res.status(500).json({
        message: "Gemini returned invalid JSON",
        raw: rawText,
      });
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    if (error.name === "TimeoutError") {
      return res.status(504).json({
        message: "Request timed out",
        error: error.message,
      });
    }
    res.status(500).json({
      message: "Failed to generate explanation",
      error: error.message,
    });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation };
