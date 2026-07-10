const { z } = require("zod");
const { handleValidationError } = require("./ValidateQuestions");

// Schema for creating a session
const createSessionSchema = z.object({
  role: z.string().min(1, "Role is required"),
  experience: z.string().min(1, "Experience is required"),
  topicsToFocus: z.array(z.string()).min(1, "At least one topic is required"),
  description: z.string().optional(),
  question: z.array(
    z.object({
      question: z.string().min(1, "Question text is required"),
      answer: z.string().min(1, "Answer text is required"),
    })
  ).optional(),
});

// Schema for getting a session by ID (params)
const getSessionByIdSchema = z.object({
  id: z.string().min(1, "Session ID is required"),
});

// Schema for deleting a session (params)
const deleteSessionSchema = z.object({
  id: z.string().min(1, "Session ID is required"),
});


// Middleware for createSession
const validateCreateSession = (req, res, next) => {
  try {
    createSessionSchema.parse(req.body);
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
