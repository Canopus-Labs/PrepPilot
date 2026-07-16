const { z } = require("zod");
const { handleValidationError } = require("./ValidateQuestions");

// Schema for saving/updating sheet progress
const saveProgressSchema = z.object({
  sheetId: z.string().min(1, "Sheet ID is required"),
  followed: z.boolean().optional(),
  completedTopics: z.array(z.string()).optional(),
  percentage: z.number().int().min(0, "Percentage must be at least 0").max(100, "Percentage cannot exceed 100"),
});

// Schema for getting progress by sheetId (params)
const getProgressSchema = z.object({
  sheetId: z.string().min(1, "Sheet ID is required"),
});



// Middleware for saveProgress
const validateSaveProgress = (req, res, next) => {
  try {
    saveProgressSchema.parse(req.body);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

// Middleware for getProgress (params)
const validateGetProgress = (req, res, next) => {
  try {
    getProgressSchema.parse(req.params);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

module.exports = {
    validateSaveProgress,
    validateGetProgress
}