const { Worker } = require("bullmq");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const Joi = require("joi");
const { redisConnection } = require("../config/queue");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
  interviewTipsPrompt,
} = require("../utils/prompts");

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const candidateModels = [
  process.env.GEMINI_MODEL,
  "models/gemini-2.5-flash",
  "models/gemini-flash-latest",
  "models/gemini-2.0-flash",
].filter(Boolean);

const processQuestions = async (data) => {
  const { role, experience, topicsToFocus, numberOfQuestions, seenQuestions } = data;
  const prompt = questionAnswerPrompt({
    role,
    experience,
    topicsToFocus,
    numberOfQuestions,
    seenQuestions,
  });

  let lastErr = null;
  let result = null;
  let usedModel = null;

  for (const m of candidateModels) {
    try {
      const model = ai.getGenerativeModel({ model: m });
      result = await model.generateContent([prompt]);
      usedModel = m;
      break;
    } catch (e) {
      lastErr = e;
      continue;
    }
  }

  if (!result) throw lastErr || new Error("All Gemini models failed");

  const rawText = await result.response.text();
  let cleanedText = rawText
    .replace(/^(\s*```json\s*|\s*```\s*)+/i, "")
    .replace(/(\s*```\s*)+$/i, "")
    .trim();

  const parsedData = JSON.parse(cleanedText);

  const questionsSchema = Joi.array().items(
    Joi.object({
      question: Joi.string().required(),
      answer: Joi.string().required(),
    })
  );
  const { error: validationError } = questionsSchema.validate(
    Array.isArray(parsedData) ? parsedData : parsedData.question
  );
  if (validationError) {
    throw new Error("Invalid AI response format: " + validationError.message);
  }

  return { model: usedModel, question: Array.isArray(parsedData) ? parsedData : parsedData.question, raw: Array.isArray(parsedData) ? undefined : parsedData };
};

const processExplanation = async (data) => {
  const { question } = data;
  const prompt = conceptExplainPrompt(question);

  let lastErr = null;
  let result = null;
  let usedModel = null;
  for (const m of candidateModels) {
    try {
      const model = ai.getGenerativeModel({ model: m });
      result = await model.generateContent([prompt]);
      usedModel = m;
      break;
    } catch (e) {
      lastErr = e;
      continue;
    }
  }

  if (!result) throw lastErr || new Error("All Gemini models failed");

  const rawText = await result.response.text();
  let cleanedText = rawText
    .replace(/^\s*```json\s*/i, "")
    .replace(/^\s*```\s*/i, "")
    .replace(/(\s*```\s*)+$/i, "")
    .trim();

  const parsedData = JSON.parse(cleanedText);

  const explanationSchema = Joi.object({
    title: Joi.string().required(),
    explanation: Joi.string().required(),
  });
  const { error: validationError } = explanationSchema.validate(parsedData);
  if (validationError) {
    throw new Error("Invalid AI response format: " + validationError.message);
  }

  return { model: usedModel, ...parsedData };
};

const processTips = async (data) => {
  const { role, experience } = data;
  const prompt = interviewTipsPrompt({ role, experience });

  let lastErr = null;
  let result = null;
  let usedModel = null;

  for (const m of candidateModels) {
    try {
      const model = ai.getGenerativeModel({ model: m });
      result = await model.generateContent([prompt]);
      usedModel = m;
      break;
    } catch (e) {
      lastErr = e;
      continue;
    }
  }

  if (!result) throw lastErr || new Error("All Gemini models failed");

  const rawText = await result.response.text();
  let cleanedText = rawText
    .replace(/^(\s*```json\s*|\s*```\s*)+/i, "")
    .replace(/(\s*```\s*)+$/i, "")
    .trim();

  const parsedData = JSON.parse(cleanedText);
  return { model: usedModel, ...parsedData };
};

const processChat = async (data) => {
  const { prompt, history, systemInstruction } = data;

  let lastErr = null;
  let result = null;
  let usedModel = null;
  for (const m of candidateModels) {
    try {
      const model = ai.getGenerativeModel({ 
        model: m,
        systemInstruction: systemInstruction || `You are PrepPilot AI Mentor.
1. Allow friendly greetings and casual onboarding conversation.
2. Focus primarily on PrepPilot-related domains: interview preparation, coding interviews, aptitude, resumes, career guidance, mock interviews, and platform usage.
3. Politely redirect unrelated conversations.
4. End your responses with a helpful, contextual follow-up question whenever appropriate (e.g., asking if they want an example, feedback on a resume section, or practice questions).`
      });
      
      let formattedHistory = (history || []).map(msg => ({
        role: msg.role === "model" ? "model" : "user",
        parts: [{ text: msg.text }]
      }));

      if (formattedHistory.length > 0 && formattedHistory[0].role !== "user") {
        formattedHistory.unshift({ role: "user", parts: [{ text: "Hi" }] });
      }

      const chat = model.startChat({
        history: formattedHistory
      });

      result = await chat.sendMessage(prompt);
      usedModel = m;
      break;
    } catch (e) {
      lastErr = e;
      continue;
    }
  }
  if (!result) throw lastErr || new Error("All Gemini models failed");

  const rawText = await result.response.text();
  let cleanedText = rawText
    .replace(/^[\s`]*json\s*/i, "")
    .replace(/^\s*```/i, "")
    .replace(/```$/i, "")
    .trim();

  return { text: cleanedText, model: usedModel };
};

const processResumeAnalysis = async (data) => {
  const { targetRole, fileBuffer } = data;
  
  const prompt = `You are an expert ATS (Applicant Tracking System) and Senior Technical Recruiter.
Analyze the attached PDF resume against the target role: "${targetRole}".

Return the analysis STRICTLY as a JSON object with the following exact keys and structure:
{
  "resumeScore": (number between 0 and 100),
  "roleMatch": (number between 0 and 100),
  "missingSkills": [array of short strings, max 5],
  "missingProjects": [array of short strings, max 3],
  "atsCompatibility": {
    "status": "Good" | "Average" | "Poor",
    "remarks": "short sentence explaining ATS parsing issues visually observed"
  },
  "suggestions": [array of short actionable sentences, max 5]
}

DO NOT wrap the response in markdown blocks like \`\`\`json. Return ONLY the raw JSON object.`;

  let lastErr = null;
  let result = null;
  
  for (const m of candidateModels) {
    try {
      const model = ai.getGenerativeModel({ model: m });
      result = await model.generateContent([
        prompt,
        {
          inlineData: {
            data: fileBuffer,
            mimeType: "application/pdf"
          }
        }
      ]);
      break;
    } catch (e) {
      lastErr = e;
      continue;
    }
  }

  if (!result) throw lastErr || new Error("All Gemini models failed to process PDF");
  
  let aiResponse = result.response.text();
  aiResponse = aiResponse
    .replace(/^(\s*```json\s*|\s*```\s*)+/i, "")
    .replace(/(\s*```\s*)+$/i, "")
    .trim();

  const parsedData = JSON.parse(aiResponse);
  return parsedData;
};

const aiWorker = new Worker(
  "ai-jobs",
  async (job) => {
    console.log(`Processing job ${job.id} of type ${job.name}`);
    try {
      if (job.name === "generate-questions") {
        return await processQuestions(job.data);
      } else if (job.name === "generate-explanation") {
        return await processExplanation(job.data);
      } else if (job.name === "generate-tips") {
        return await processTips(job.data);
      } else if (job.name === "chat") {
        return await processChat(job.data);
      } else if (job.name === "analyze-resume") {
        return await processResumeAnalysis(job.data);
      }
      throw new Error(`Unknown job type: ${job.name}`);
    } catch (error) {
      console.error(`Error processing job ${job.id}:`, error);
      throw error;
    }
  },
  { connection: redisConnection }
);

aiWorker.on("completed", (job) => {
  console.log(`Job ${job.id} has completed!`);
});

aiWorker.on("failed", (job, err) => {
  console.log(`Job ${job.id} has failed with ${err.message}`);
});

module.exports = aiWorker;
