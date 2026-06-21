const aiPromptSchema = require("../validation/aiPromptSchema");

const validateAiPrompt = (req, res, next) => {
  const { error } = aiPromptSchema.validate(req.body);

  if (error) {
    let friendlyMessage = "Invalid prompt.";
    const detail = error.details[0];
    
    if (detail.type === "any.invalid") {
      friendlyMessage = "Your prompt contains blocked patterns. Please rephrase.";
    } else if (detail.type === "string.min") {
      friendlyMessage = "Your message is too short. Please enter at least 3 characters.";
    } else if (detail.type === "string.max") {
      friendlyMessage = "Your message is too long. Please keep it under 500 characters.";
    } else if (detail.type === "any.required") {
      friendlyMessage = "A prompt message is required.";
    }

    return res.status(400).json({ error: friendlyMessage });
  }

  next();
};

module.exports = {validateAiPrompt};