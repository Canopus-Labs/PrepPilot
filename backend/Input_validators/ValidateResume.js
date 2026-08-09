const { z } = require("zod");
const { handleValidationError } = require("./ValidateQuestions");

// ==========================================
// Schemas
// ==========================================

const mongoose = require("mongoose");
const { handleValidationError } = require('./ValidateQuestions')

const objectId = (label) =>
  z
    .string()
    .min(1, `${label} is required`)
    .refine((v) => mongoose.isValidObjectId(v), "Invalid ObjectId format");

// Schema for compileResume request
const compileResumeSchema = z.object({
  code: z
    .string({
      required_error: "LaTeX code is required",
      invalid_type_error: "LaTeX code must be a string",
    })
    .min(1, "LaTeX code is required"),
});

const analyzeResumeSchema = z.object({
  targetRole: z
    .string({
      invalid_type_error: "Target role must be a string",
    })
    .min(1, "Target role cannot be empty")
    .string()
    .min(1, "Target role is required")
    .max(50, "Target role must be at most 50 characters")
    .regex(/^[a-zA-Z0-9 \-]+$/, "Target role must contain only alphanumeric characters, spaces, and hyphens")
    .optional(),
});

const saveResumeSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(1, "Title is required"),
  latexCode: z
    .string({
      required_error: "LaTeX code is required",
      invalid_type_error: "LaTeX code must be a string",
    })
    .min(1, "LaTeX code is required"),
  resumeId: z.string().optional(),
  title: z.string().min(1, "Title is required"),
  latexCode: z.string().min(1, "LaTeX code is required"),
  resumeId: z
    .string()
    .optional()
    .refine((v) => !v || mongoose.isValidObjectId(v), "Invalid ObjectId format"),
});

// Schema for deleteResume request (params)
const deleteResumeSchema = z.object({
  id: objectId("Resume ID"),
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

// Middleware for analyzeResume (validates schema + checks file upload)
const validateAnalyzeResume = (req, res, next) => {
  const result = analyzeResumeSchema.safeParse(req.body || {});
  if (!result.success) {
    return handleValidationError(res, result.error);
// Middleware for analyzeResume
const validateAnalyzeResume = async (req, res, next) => {
  try {
    analyzeResumeSchema.parse(req.body);
    // also ensure file is uploaded
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No resume file uploaded" });
    }
    next();
  } catch (error) {
    if (req.file && req.file.path) {
      const safePath = require('path').join(require('os').tmpdir(), require('path').basename(req.file.path));
      await require('fs').promises.unlink(safePath).catch((err) => {
        if (err.code !== 'ENOENT') console.error('Cleanup error:', err);
      });
    }
    return handleValidationError(res, error);
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

// Middleware for deleteResume (params)
const validateDeleteResume = (req, res, next) => {
  try {
    deleteResumeSchema.parse(req.params);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

module.exports = {
  validateCompileResume,
  validateAnalyzeResume,
  validateSaveResume,
  validateDeleteResume,
};