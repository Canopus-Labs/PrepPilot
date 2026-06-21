const Joi = require("joi");

// Patterns used in prompt injection / jailbreak attempts.
// This is a defense-in-depth layer, not the primary fix — the primary fix is
// keeping user data out of the instruction segment entirely (see the
// systemInstruction added to generateHandler in the routes file).
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
];

const noInjectionPatterns = (value, helpers) => {
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
    .min(3)
    .max(1000)
    .required()
    .custom(safePrompt, "Prompt Injection Protection"),

  role: Joi.string()
    .min(2)
    .max(50)
    .optional()
    .custom(safeLabel, "Role Injection Protection"),

  topic: Joi.string()
    .min(2)
    .max(100)
    .optional()
    .custom(safeLabel, "Topic Injection Protection"),
});

module.exports = aiPromptSchema;