const { z } = require("zod");
const aiPromptSchema = require("../validation/aiPromptSchema");

const validateAiPrompt = (req, res, next) => {
  try {
    aiPromptSchema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      const first = err.issues[0];
      // Surface a friendly message for the most common cases
      let friendlyMessage = first?.message || "Invalid prompt.";
      return res.status(400).json({ error: friendlyMessage });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { validateAiPrompt };
