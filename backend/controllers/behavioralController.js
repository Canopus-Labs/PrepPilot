const { generateWithFallback } = require("../utils/geminiHelper");

const analyzeBehavioralAnswer = async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        message: "Question and answer are required.",
      });
    }

    const prompt = `
You are an experienced HR interviewer.

Evaluate the candidate's behavioral interview answer using the STAR framework.

Interview Question:
${question}

Candidate Answer:
${answer}

Return ONLY valid JSON in this exact format:

{
  "score": 90,
  "star": {
    "Situation": "Good",
    "Task": "Average",
    "Action": "Excellent",
    "Result": "Needs Improvement"
  },
  "communication": "Clear, confident and professional communication.",
  "strengths": [
    "Strong problem solving",
    "Good leadership example"
  ],
  "weaknesses": [
    "Result lacks measurable impact"
  ],
  "suggestions": [
    "Add measurable achievements.",
    "Explain your role more clearly."
  ],
  "followUpQuestion": "What would you do differently today?"
}

Return ONLY JSON.
`;

    const { result } = await generateWithFallback(
      process.env.GEMINI_API_KEY.trim(),
      [prompt]
    );

    let response = await result.response.text();

    response = response
      .replace(/^```json/i, "")
      .replace(/^```/, "")
      .replace(/```$/, "")
      .trim();

    const json = JSON.parse(response);

    return res.status(200).json(json);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Failed to analyze behavioral answer.",
    });
  }
};

module.exports = {
  analyzeBehavioralAnswer,
};