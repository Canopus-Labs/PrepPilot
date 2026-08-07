const { z } = require("zod");
const { handleValidationError } = require("./ValidateQuestions");

// Schema for interview questions request
const generateInterviewQuestionsSchema = z.object({
  role: z.string().min(1, "Role is required").max(100, "Role must be under 100 characters"),
  experience: z.string().min(1, "Experience is required").max(50, "Experience must be under 50 characters"),
  topicsToFocus: z
    .array(z.string().min(1, "Topic must not be empty").max(200, "Each topic must be under 200 characters"))
    .min(1, "At least one topic is required")
    .max(20, "At most 20 topics are allowed"),
  numberOfQuestions: z.number().int().positive("Number of questions must be positive"),
});

// Schema for concept explanation request
const generateConceptExplanationSchema = z.object({
  question: z.string().min(1, "Question is required"),
});

// Schema for interview tips request
const generateInterviewTipsSchema = z.object({
  role: z.string().min(1, "Role is required").max(100, "Role must be under 100 characters"),
  experience: z.string().min(1, "Experience is required").max(50, "Experience must be under 50 characters"),
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

module.exports = {
  validateGenerateInterviewQuestions,
  validateGenerateConceptExplanation,
  validateGenerateInterviewTips,
};