const { z } = require("zod");
const mongoose = require("mongoose");
const { handleValidationError } = require("./ValidateQuestions");

const objectId = (label) =>
  z
    .string()
    .min(1, `${label} is required`)
    .refine((v) => mongoose.isValidObjectId(v), "Invalid ObjectId format");

// Schema for creating a session
const createSessionSchema = z.object({
  role: z.string().min(1, "Role is required").max(120, "Role cannot exceed 120 characters"),
  company: z.string().min(1, "Company is required").max(120, "Company cannot exceed 120 characters"),
  experience: z.string().min(1, "Experience is required").max(100, "Experience cannot exceed 100 characters"),
  topicsToFocus: z.array(z.string().max(100, "Topic cannot exceed 100 characters")).min(1, "At least one topic is required"),
  description: z.string().max(2000, "Description cannot exceed 2000 characters").optional(),
  question: z.array(
    z.object({
      question: z.string().min(1, "Question text is required"),
      answer: z.string().min(1, "Answer text is required"),
    })
  ).max(50, "Maximum 50 questions allowed").optional(),
});

// Schema for getting a session by ID (params)
const getSessionByIdSchema = z.object({
  id: objectId("Session ID"),
});

// Schema for deleting a session (params)
const deleteSessionSchema = z.object({
  id: objectId("Session ID"),
});


// Middleware for createSession
const validateCreateSession = (req, res, next) => {
  try {
    req.body = createSessionSchema.parse(req.body);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

// Middleware for getSessionById
const validateGetSessionById = (req, res, next) => {
  try {
    getSessionByIdSchema.parse(req.params);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

// Middleware for deleteSession
const validateDeleteSession = (req, res, next) => {
  try {
    deleteSessionSchema.parse(req.params);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

module.exports = {
  validateCreateSession,
  validateGetSessionById,
  validateDeleteSession,
};
