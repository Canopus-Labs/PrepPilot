const aiPromptSchema = require("../validation/aiPromptSchema");

const validateAiPrompt = (req, res, next) => {
  const { error } = aiPromptSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Invalid or unsafe AI prompt",
      details: error.details.map(d => d.message),
    });
  }

  next();
};

module.exports = {validateAiPrompt};