require('dotenv').config();
const { Worker } = require('bullmq');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const mongoose = require('mongoose');
const AiJob = require('../models/AiJob');
const { connection } = require('../queues/aiQueue');

mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/preppilot', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const aiWorker = new Worker('aiGenerationQueue', async job => {
  const { jobId, prompt, isJson, history, systemInstruction } = job.data;
  
  await AiJob.findByIdAndUpdate(jobId, { status: 'processing' });
  
  try {
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
      try {
        const modelOpts = { model: m };
        if (systemInstruction) {
          modelOpts.systemInstruction = systemInstruction;
        }
        
        const model = genAI.getGenerativeModel(modelOpts);

        if (history && history.length > 0) {
          const formattedHistory = history.map(msg => ({
            role: msg.role === "model" ? "model" : "user",
            parts: [{ text: msg.text }]
          }));

          if (formattedHistory.length > 0 && formattedHistory[0].role !== "user") {
            formattedHistory.unshift({ role: "user", parts: [{ text: "Hi" }] });
          }

          const chat = model.startChat({ history: formattedHistory });
          result = await chat.sendMessage(prompt);
        } else {
          result = await model.generateContent([prompt]);
        }
        
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
      
    let finalResult = cleanedText;
    if (isJson) {
      try {
        finalResult = JSON.parse(cleanedText);
      } catch(e) {
        // Fallback to text if parsing fails
        finalResult = { text: cleanedText, parsingError: true };
      }
    }

    await AiJob.findByIdAndUpdate(jobId, { 
      status: 'completed', 
      result: { data: finalResult, model: usedModel, raw: isJson ? undefined : rawText } 
    });

  } catch (error) {
    console.error("AI Worker Error:", error.message);
    await AiJob.findByIdAndUpdate(jobId, { 
      status: 'failed', 
      error: error.message 
    });
    throw error; // Let BullMQ handle retry if configured
  }
}, { 
  connection,
  concurrency: 5 // Process 5 jobs concurrently
});

aiWorker.on('completed', job => {
  console.log(`Job ${job.id} has completed!`);
});

aiWorker.on('failed', (job, err) => {
  console.log(`Job ${job.id} has failed with ${err.message}`);
});

console.log("AI Worker started...");
