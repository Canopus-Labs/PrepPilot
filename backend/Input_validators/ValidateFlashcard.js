const { z } = require("zod");
const { handleValidationError } = require("./ValidateQuestions");

const createFlashcardSchema = z.object({
  question: z.string().min(1, "Question text is required"),
  answer: z.string().min(1, "Answer text is required"),
  category: z.string().optional().default("General"),
  sourceId: z.string().optional().nullable(),
});

const reviewFlashcardSchema = z.object({
  rating: z.enum(["again", "hard", "medium", "good", "easy", "1", "2", "3", "4"], {
    errorMap: () => ({
      message: "Rating must be one of: again, hard, medium (or good), easy, or numbers 1-4",
    }),
  }),
});

const validateCreateFlashcard = (req, res, next) => {
  try {
    req.body = createFlashcardSchema.parse(req.body);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

const validateReviewFlashcard = (req, res, next) => {
  try {
    req.body = reviewFlashcardSchema.parse(req.body);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

module.exports = {
  validateCreateFlashcard,
  validateReviewFlashcard,
};
