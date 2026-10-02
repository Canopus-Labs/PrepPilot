const { z } = require("zod");

// Schema for adding questions to a session
const addQuestionToSessionSchema = z.object({
  sessionId: z.string().min(1, "Session ID is required"),
  questions: z.array(
    z.object({
      question: z.string().min(1, "Question text is required").max(5000, "Question must be at most 5000 characters"),
      answer: z.string().min(1, "Answer text is required").max(10000, "Answer must be at most 10000 characters"),
    })
  ).min(1, "At least one question is required").max(50, "Maximum 50 questions allowed"),
});

// Schema for toggling pin (params only)
const togglePinQuestionSchema = z.object({
  id: z.string().min(1, "Question ID is required"),
});

// Schema for updating note
const updateQuestionNoteSchema = z.object({
  note: z.string().max(2000, "Note cannot exceed 2000 characters"),
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

// Schema for a single problem in a study-plan request. Requires a usable,
// bounded title so a null/string/empty-object entry can never silently ride
// along into a generated plan (issue #2319). `difficulty` is optional and
// bounded — buildStudyPlan's documented fallback (unknown/missing -> medium)
// is intentionally preserved, this only guards against oversized values.
// `.passthrough()` keeps other legitimate problem fields (links, status,
// topic, etc.) intact since the scheduler returns the original object as-is.
const studyPlanProblemSchema = z.object({
  title: z.string().trim().min(1, "title is required").max(300, "title must be at most 300 characters"),
  difficulty: z.string().trim().max(20, "difficulty must be at most 20 characters").optional(),
}).passthrough();

// Schema for POST /api/question/study-plan.
const buildStudyPlanSchema = z.object({
  problems: z.array(studyPlanProblemSchema)
    .min(1, "problems must be a non-empty array")
    .max(1000, "Too many problems (max 1000)"),
  days: z.coerce.number().int().min(1, "days must be at least 1").max(365, "days must be at most 365"),
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

// Middleware for POST /api/question/study-plan. Rejects null/string/empty
// entries and problems without a usable title with 400 before they ever
// reach buildStudyPlan; zod's per-item error path (e.g. "problems.2.title")
// tells the client exactly which index was invalid. The parsed result is
// assigned back to req.body so the handler receives the trimmed title/
// difficulty and coerced numeric days — not the raw input — otherwise a
// title with leading/trailing whitespace could pass the trimmed length
// check yet still exceed 300 chars once it reaches the generated plan.
const validateBuildStudyPlan = (req, res, next) => {
  try {
    req.body = buildStudyPlanSchema.parse(req.body);
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
  validateBuildStudyPlan,
  handleValidationError
};