const sanitizeField = (value) => {
  if (typeof value !== "string") return value;

  return value
    .replace(/<[^>]*>?/gm, "")
    .replace(/[^\x20-\x7E\n]/g, "")
    .trim();
};

// Exported so history messages and other assembled AI content can be
// sanitized with the same rules as the prompt field.
const sanitizePromptText = sanitizeField;

const sanitizeAiPrompt = (req, res, next) => {
  if (req.body) {
    req.body.prompt = sanitizeField(req.body.prompt);
    req.body.role = sanitizeField(req.body.role);
    req.body.topic = sanitizeField(req.body.topic);
  }

  next();
};

module.exports = sanitizeAiPrompt;
module.exports.sanitizePromptText = sanitizePromptText;