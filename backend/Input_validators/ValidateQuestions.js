const { z } = require("zod");

// Schema for adding questions to a session
const addQuestionToSessionSchema = z.object({
  sessionId: z.string().min(1, "Session ID is required"),
  questions: z.array(
    z.object({
      question: z.string().min(1, "Question text is required"),
      answer: z.string().min(1, "Answer text is required"),
    })
  ).min(1, "At least one question is required"),
});

// Schema for toggling pin (params only)
const togglePinQuestionSchema = z.object({
  id: z.string().min(1, "Question ID is required"),
});

// Schema for updating note
const updateQuestionNoteSchema = z.object({
  note: z.string(),
});

// Schema for query params of getMyQuestions. page/limit are coerced and must
// be positive integers (limit capped at 100) so NaN never reaches the
// controller's .skip()/.limit().
const getMyQuestionsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).optional(),
  limit: z.coerce.number().int().min(1).max(100).optional(),
  sessionId: z.string().optional(),
  pinned: z.enum(["true", "false"]).optional(),
});


// Helper for consistent error responses
const handleValidationError = (res, error) => {
  return res.status(400).json({
    success: false,
    message: "Validation failed",
    errors: error.issues.map(e => ({
      field: e.path.join("."),
      message: e.message,
    })),
  });
};

// Middleware for addQuestionToSession
const validateAddQuestionToSession = (req, res, next) => {
  try {
    addQuestionToSessionSchema.parse(req.body);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

// Middleware for togglePinQuestion (params)
const validateTogglePinQuestion = (req, res, next) => {
  try {
    togglePinQuestionSchema.parse(req.params);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

// Middleware for updateQuestionNote
const validateUpdateQuestionNote = (req, res, next) => {
  try {
    updateQuestionNoteSchema.parse(req.body);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

// Middleware for getMyQuestions query params
const validateGetMyQuestions = (req, res, next) => {
  try {
    getMyQuestionsQuerySchema.parse(req.query);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

module.exports = {
  validateAddQuestionToSession,
  validateTogglePinQuestion,
  validateUpdateQuestionNote,
  validateGetMyQuestions,
  handleValidationError
};
