const { z } = require("zod");
const { handleValidationError } = require("./ValidateQuestions");
const mongoose = require("mongoose");

// ── Schemas ───────────────────────────────────────────────────────────────────

const compileResumeSchema = z.object({
  code: z.string({ required_error: "LaTeX code is required" }).min(1, "LaTeX code is required"),
});

const analyzeResumeSchema = z.object({
  targetRole: z
    .string()
    .min(1, "Target role is required")
    .max(50, "Target role must be at most 50 characters")
    .regex(/^[a-zA-Z0-9 \-]+$/, "Target role must contain only alphanumeric characters, spaces, and hyphens")
    .optional(),
});

const saveResumeSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(1, "Title is required"),
  latexCode: z.string({ required_error: "LaTeX code is required" }).min(1, "LaTeX code is required"),
  resumeId: z
    .string()
    .optional()
    .refine((v) => !v || mongoose.isValidObjectId(v), "Invalid ObjectId format"),
});

const deleteResumeSchema = z.object({
  id: z
    .string()
    .min(1, "Resume ID is required")
    .refine((v) => mongoose.isValidObjectId(v), "Invalid ObjectId format"),
});

// ── Middleware ────────────────────────────────────────────────────────────────

const validateCompileResume = (req, res, next) => {
  const result = compileResumeSchema.safeParse(req.body || {});
  if (!result.success) return handleValidationError(res, result.error);
  next();
};

const validateAnalyzeResume = (req, res, next) => {
  const result = analyzeResumeSchema.safeParse(req.body || {});
  if (!result.success) return handleValidationError(res, result.error);
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No resume file uploaded" });
  }
  next();
};

const validateSaveResume = (req, res, next) => {
  const result = saveResumeSchema.safeParse(req.body || {});
  if (!result.success) return handleValidationError(res, result.error);
  next();
};

const validateDeleteResume = (req, res, next) => {
  const result = deleteResumeSchema.safeParse(req.params || {});
  if (!result.success) return handleValidationError(res, result.error);
  next();
};

module.exports = {
  validateCompileResume,
  validateAnalyzeResume,
  validateSaveResume,
  validateDeleteResume,
};
