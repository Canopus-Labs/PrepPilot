const Joi = require("joi");
const {
  conceptExplainPrompt,
  questionAnswerPrompt,
  interviewTipsPrompt,
} = require("../utils/prompts");
const Session = require("../models/Session");
const Question = require("../models/Question");
const AiJob = require("../models/AiJob");
const { aiQueue } = require("../queues/aiQueue");

/**
 * Generate interview questions and answers using the Gemini AI service.
 * @route POST /api/ai/generate-questions
 */
const generateInterviewQuestions = async (req, res) => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const pastSessions = await Session.find({
      user: req.user._id,
      role,
      topicsToFocus,
    }).select("questions");

    const pastQuestionIds = pastSessions.flatMap((s) => s.questions);
    const pastQuestions = await Question.find({
      _id: { $in: pastQuestionIds },
    }).select("question");

    const seenQuestions = pastQuestions.map((q) => q.question);

    const prompt = questionAnswerPrompt({
      role,
      experience,
      topicsToFocus,
      numberOfQuestions,
      seenQuestions,
    });

    const jobDoc = await AiJob.create({
      type: 'interview_questions',
      userId: req.user._id
    });

    await aiQueue.add('generate', {
      jobId: jobDoc._id,
      prompt,
      isJson: true
    });

    res.status(202).json({ 
      message: "AI Generation job enqueued", 
      jobId: jobDoc._id 
    });
  } catch (error) {
    console.error("AI Queue Error:", error);
    res.status(500).json({
      message: "Failed to enqueue generation",
      error: error.message,
    });
  }
};

/**
 * Generate an explanation for a technical concept or question.
 * @route POST /api/ai/generate-explanation
 */
const generateConceptExplanation = async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ message: "Missing question" });
    }

    const prompt = conceptExplainPrompt(question);

    const jobDoc = await AiJob.create({
      type: 'concept_explanation',
      userId: req.user._id
    });

    await aiQueue.add('generate', {
      jobId: jobDoc._id,
      prompt,
      isJson: true
    });

    res.status(202).json({ 
      message: "AI Generation job enqueued", 
      jobId: jobDoc._id 
    });
  } catch (error) {
    console.error("AI Queue Error:", error);
    res.status(500).json({
      message: "Failed to enqueue generation",
      error: error.message,
    });
  }
};

const generateInterviewTips = async (req, res) => {
  try {
    const { role, experience } = req.body;

    if (!role || !experience) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const prompt = interviewTipsPrompt({ role, experience });

    const jobDoc = await AiJob.create({
      type: 'interview_tips',
      userId: req.user._id
    });

    await aiQueue.add('generate', {
      jobId: jobDoc._id,
      prompt,
      isJson: true
    });

    res.status(202).json({ 
      message: "AI Generation job enqueued", 
      jobId: jobDoc._id 
    });
  } catch (error) {
    console.error("AI Queue Error:", error);
    res.status(500).json({
      message: "Failed to enqueue generation",
      error: error.message,
    });
  }
};

/**
 * Get AI Job Status and Result
 * @route GET /api/ai/job/:jobId
 */
const getJobStatus = async (req, res) => {
  try {
    const job = await AiJob.findById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }
    
    res.status(200).json({
      jobId: job._id,
      status: job.status,
      result: job.result,
      error: job.error
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching job status", error: error.message });
  }
};

module.exports = { generateInterviewQuestions, generateConceptExplanation, generateInterviewTips, getJobStatus };
