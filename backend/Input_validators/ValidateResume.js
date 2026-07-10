const { z } = require("zod");
const { handleValidationError } = require('./ValidateQuestions')

// Schema for compileResume request
const compileResumeSchema = z.object({
  code: z.string().min(1, "LaTeX code is required"),
});

// Schema for analyzeResume request
const analyzeResumeSchema = z.object({
  targetRole: z.string().min(1, "Target role is required").optional(),
});

// Schema for saveResume request
const saveResumeSchema = z.object({
  title: z.string().min(1, "Title is required"),
  latexCode: z.string().min(1, "LaTeX code is required"),
  resumeId: z.string().optional(),
});


// Middleware for compileResume
const validateCompileResume = (req, res, next) => {
  try {
    compileResumeSchema.parse(req.body);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

// Middleware for analyzeResume
const validateAnalyzeResume = (req, res, next) => {
  try {
    analyzeResumeSchema.parse(req.body);
    // also ensure file is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No resume file uploaded" });
    }
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

// Middleware for saveResume
const validateSaveResume = (req, res, next) => {
  try {
    saveResumeSchema.parse(req.body);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

module.exports = {
  validateCompileResume,
  validateAnalyzeResume,
  validateSaveResume,
};