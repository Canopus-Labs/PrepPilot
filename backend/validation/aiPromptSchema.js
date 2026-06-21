const Joi = require("joi");

const blockedPatterns = [
  /ignore (the )?(above|previous) instructions/i,
  /disregard (the )?(above|previous) instructions/i,
  /system prompt/i,
  /act as root/i,
  /jailbreak/i,
  /bypass restrictions/i,
  /pretend to be/i,
  /you are now/i,
  /new instructions?:/i,
  /<script.*?>.*?<\/script>/i,
  /\bdan\b/i,
  /developer mode/i,
  /disregard all/i,
  /ignore all instructions/i,
  /forget previous/i,
  /override instructions/i,
  /you have no restrictions/i,
  /act as if/i,
  /simulate being/i,
  /do anything now/i,
];


// custom validator
const safePrompt = (value, helpers) => {
  for (const pattern of blockedPatterns) {
    if (pattern.test(value)) {
      return helpers.error("any.invalid");
    }
  }
  return value;
};

// Structural allow-list for role/topic (short, label-like fields): letters,
// numbers, spaces, and common punctuation only. Rejects newline-based and
// most punctuation-based injection attempts by shape, not by guessing phrasing.
const SAFE_LABEL_PATTERN = /^[\p{L}\p{N}\s\-+./,()&:;'"!]+$/u;

const safeLabel = (value, helpers) => {
  if (!SAFE_LABEL_PATTERN.test(value)) {
    return helpers.error("string.pattern.base");
  }
  return noInjectionPatterns(value, helpers);
};

// `prompt` is free-form (a real user question to ask Gemini), so it can't be
// locked to the same tight character class as role/topic — it still gets the
// regex blacklist as a coarse net.
const safePrompt = (value, helpers) => noInjectionPatterns(value, helpers);

const aiPromptSchema = Joi.object({
  prompt: Joi.string()
    .min(1)
    .max(500)
    .required()
    .custom(safePrompt, "Prompt Injection Protection"),
  history: Joi.array().items(
    Joi.object({
      role: Joi.string().valid("user", "model").required(),
      text: Joi.string().allow("").required()
    })
  ).optional()
});

module.exports = aiPromptSchema;