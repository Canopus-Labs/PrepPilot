const { z } = require("zod");
const { handleValidationError } = require("./ValidateQuestions");

// ==========================================
// Schemas
// ==========================================

const compileResumeSchema = z.object({
  code: z
    .string({
      required_error: "LaTeX code is required",
      invalid_type_error: "LaTeX code must be a string",
    })
    .min(1, "LaTeX code is required"),
});

const analyzeResumeSchema = z.object({
  targetRole: z.string().min(1, "Target role is required").optional(),
});

const saveResumeSchema = z.object({
  title: z.string({
    required_error: "Title is required",
    invalid_type_error: "Title must be a string",
  }).min(1, "Title is required"),
  latexCode: z.string({
    required_error: "LaTeX code is required",
    invalid_type_error: "LaTeX code must be a string",
  }).min(1, "LaTeX code is required"),
  resumeId: z.string().optional(),
});

// ==========================================
// Middleware Functions
// ==========================================

// Generic schema validator runner using Zod's safeParse
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body || {});
  if (!result.success) {
    return handleValidationError(res, result.error);
  }
  next();
};

// Middleware for compileResume
const validateCompileResume = validate(compileResumeSchema);

// Middleware for analyzeResume (includes file check)
const validateAnalyzeResume = (req, res, next) => {
  const result = analyzeResumeSchema.safeParse(req.body || {});
  if (!result.success) {
    return handleValidationError(res, result.error);
  }
  if (!req.file) {
    return res
      .status(400)
      .json({ success: false, message: "No resume file uploaded" });
  }
  next();
};

// Middleware for saveResume
const validateSaveResume = validate(saveResumeSchema);

module.exports = {
  validateCompileResume,
  validateAnalyzeResume,
  validateSaveResume,
};