const { z } = require('zod');
const { handleValidationError } = require('./ValidateQuestions');

const savedAchievementsSchema = z.object({
  unlockedAchievements: z.array(z.string().max(60, "Achievement ID cannot exceed 60 characters"), {
    required_error: "unlockedAchievements must be an array",
    invalid_type_error: "unlockedAchievements must be an array of strings",
  }),
});

const validateSavedAchievements = (req, res, next) => {
  try {
    savedAchievementsSchema.parse(req.body);
    next();
  } catch (e) {
    return handleValidationError(res, e);
  }
};

module.exports = {
  validateSavedAchievements,
};
