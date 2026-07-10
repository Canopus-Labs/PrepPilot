const { z } = require("zod");

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

const safeString = z.string().refine(
  (val) => !blockedPatterns.some((p) => p.test(val)),
  { message: "Your prompt contains blocked patterns. Please rephrase." }
);

const aiPromptSchema = z.object({
  prompt: safeString.min(1, "Prompt is required").max(5000, "Prompt must be under 5000 characters"),
  systemInstruction: z.string().optional(),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "model"]),
        text: z.string(),
      })
    )
    .optional(),
  role: safeString.min(2).max(50).optional(),
  topic: safeString.min(2).max(100).optional(),
});

module.exports = aiPromptSchema;
