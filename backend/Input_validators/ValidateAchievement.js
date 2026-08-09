const { z } = require('zod');
const { handleValidationError } = require('./ValidateQuestions');

const savedAchievementsSchema = z.object({
  unlockedAchievements: z.array(z.string(), {
    required_error: "unlockedAchievements must be an array",
    invalid_type_error: "unlockedAchievements must be an array of strings",
  }).max(50, "Cannot save more than 50 achievements at once"),
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
