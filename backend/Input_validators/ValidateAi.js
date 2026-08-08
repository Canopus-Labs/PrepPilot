const { z } = require("zod");
const { handleValidationError } = require("./ValidateQuestions");

// Schema for interview questions request
const generateInterviewQuestionsSchema = z.object({
  role: z.string().min(1, "Role is required").max(100, "Role cannot exceed 100 characters"),
  experience: z.string().min(1, "Experience is required").max(50, "Experience cannot exceed 50 characters"),
  topicsToFocus: z.array(z.string().min(1, "Topic cannot be empty").max(200, "Topic cannot exceed 200 characters")).min(1, "At least one topic is required").max(20, "Cannot specify more than 20 topics"),
  numberOfQuestions: z.number().int().positive("Number of questions must be positive").max(50, "Number of questions cannot exceed 50"),
});

// Schema for concept explanation request
const generateConceptExplanationSchema = z.object({
  question: z.string().min(1, "Question is required").max(1000, "Question cannot exceed 1000 characters"),
});

// Schema for interview tips request
const generateInterviewTipsSchema = z.object({
  role: z.string().min(1, "Role is required").max(100, "Role cannot exceed 100 characters"),
  experience: z.string().min(1, "Experience is required").max(50, "Experience cannot exceed 50 characters"),
});

// Schema for difficulty estimation request
const estimateDifficultySchema = z.object({
  question: z.string().min(1, "Question is required").max(2000, "Question is too long"),
});


const validateGenerateInterviewQuestions = (req,res,next)=>{

    try {
        generateInterviewQuestionsSchema.parse(req.body);
        next();
    } catch (error) {
        return handleValidationError(res, error);
    }
}

const validateGenerateConceptExplanation = (req,res,next)=>{

    try {
        generateConceptExplanationSchema.parse(req.body);
        next();
    } catch (error) {
        return handleValidationError(res, error);
}}

const validateGenerateInterviewTips = (req, res, next) => {
  try {
    generateInterviewTipsSchema.parse(req.body);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

const validateEstimateDifficulty = (req, res, next) => {
  try {
    estimateDifficultySchema.parse(req.body);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

module.exports = {
  validateGenerateInterviewQuestions,
  validateGenerateConceptExplanation,
  validateGenerateInterviewTips,
  validateEstimateDifficulty,
};