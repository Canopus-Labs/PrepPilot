const Joi = require("joi");

const blockedPatterns = [
  /ignore previous instructions/i,
  /system prompt/i,
  /act as root/i,
  /jailbreak/i,
  /bypass restrictions/i,
  /pretend to be/i,
  /you are now/i,
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

const aiPromptSchema = Joi.object({
  prompt: Joi.string()
    .min(1)
    .max(5000)
    .required()
    .custom(safePrompt, "Prompt Injection Protection"),
  systemInstruction: Joi.string().optional(),
  history: Joi.array().items(
    Joi.object({
      role: Joi.string().valid("user", "model").required(),
      text: Joi.string().allow("").required()
    })
  ).optional()
});

module.exports = aiPromptSchema;