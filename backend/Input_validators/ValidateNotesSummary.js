const { z } = require("zod");
const { handleValidationError } = require("./ValidateQuestions");

const topicsSchema = z.object({
  chapters: z.array(z.string().min(1).max(120)).max(10).default([]),
  subtopics: z.array(z.string().min(1).max(120)).max(10).default([]),
  keywords: z.array(z.string().min(1).max(60)).max(15).default([]),
});

const difficultySchema = z.object({
  level: z.enum(["Beginner", "Intermediate", "Advanced"]),
  explanation: z.string().min(1).max(600),
});

const readingTimeSchema = z.object({
  minutes: z.number().int().positive(),
  label: z.string().min(1).max(50),
  pages: z.number().int().nonnegative(),
});


const summarizeRequestSchema = z.object({
  url: z.string().url("Provide a valid PDF URL").max(2048).optional(),
  fileName: z.string().max(200).optional(),
});

const validateSummarizeNotes = async (req, res, next) => {
  try {
    req.body = summarizeRequestSchema.parse(req.body || {});
    if (!req.file && !req.body.url) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF or choose one from Notes & Books.",
      });
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


const aiOutputSchema = z.object({
  summary: z.string().min(1).max(3000),
  topics: topicsSchema,
  prerequisites: z.array(z.string().min(1).max(200)).max(10).default([]),
  difficulty: difficultySchema,
  learningOutcomes: z.array(z.string().min(1).max(300)).max(10).default([]),
});


const saveNotesSummarySchema = z.object({
  fileName: z.string().min(1).max(200),
  sourceType: z.enum(["upload", "platform"]),
  sourceUrl: z.string().url().max(2048).optional().nullable(),
  pageCount: z.number().int().nonnegative().optional().default(0),
  wordCount: z.number().int().nonnegative().optional().default(0),
  contentHash: z.string().max(128).optional().nullable(),
  summary: z.string().min(1).max(3000),
  topics: topicsSchema,
  prerequisites: z.array(z.string().min(1).max(200)).max(10).default([]),
  difficulty: difficultySchema,
  readingTime: readingTimeSchema,
  learningOutcomes: z.array(z.string().min(1).max(300)).max(10).default([]),
});

const validateSaveNotesSummary = (req, res, next) => {
  try {
    req.body = saveNotesSummarySchema.parse(req.body);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

module.exports = {
  validateSummarizeNotes,
  validateSaveNotesSummary,
  aiOutputSchema,
  saveNotesSummarySchema,
};
