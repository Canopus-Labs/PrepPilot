const { z } = require("zod");
const mongoose = require("mongoose");
const { handleValidationError } = require('./ValidateQuestions')

const objectId = (label) =>
  z
    .string()
    .min(1, `${label} is required`)
    .refine((v) => mongoose.isValidObjectId(v), "Invalid ObjectId format");

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
  resumeId: z
    .string()
    .optional()
    .refine((v) => !v || mongoose.isValidObjectId(v), "Invalid ObjectId format"),
});

// Schema for deleteResume request (params)
const deleteResumeSchema = z.object({
  id: objectId("Resume ID"),
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