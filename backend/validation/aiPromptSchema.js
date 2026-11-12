const { z } = require("zod");

const blockedPatterns = [
  /ignore\s+(?:all\s+)?previous\s+instructions/i,
  /system\s+prompt/i,
  /act\s+as\s+root/i,
  /jailbreak/i,
  /bypass\s+restrictions/i,
  /pretend\s+to\s+be/i,
  /you\s+are\s+now/i,
  /<script\b[^>]*>[\s\S]*?<\/script\s*>/i,
  /\bdan\b/i,
  /developer\s+mode/i,
  /disregard\s+all/i,
  /forget\s+previous/i,
  /override\s+instructions/i,
  /you\s+have\s+no\s+restrictions/i,
  /act\s+as\s+if/i,
  /simulate\s+being/i,
  /do\s+anything\s+now/i,
];

const safeString = z
  .string()
  .refine(
    (val) => !blockedPatterns.some((pattern) => pattern.test(val)),
    {
      message:
        "Your prompt contains blocked patterns. Please rephrase.",
    }
  );

const aiPromptSchema = z
  .object({
    prompt: safeString
      .trim()
      .min(1, "Prompt is required")
      .max(5000, "Prompt must be under 5000 characters"),

    responseMode: z
      .enum(["project-ideas", "roadmap", "roadmap-section"])
      .optional(),

    history: z
      .array(
        z.object({
          role: z.enum(["user", "model"]),
          text: z.string().max(5000, "History message is too long"),
        }).strict()
      )
      .max(20, "Conversation history is too large")
      .optional(),

    role: safeString
      .trim()
      .min(2, "Role must contain at least 2 characters")
      .max(50, "Role must be under 50 characters")
      .optional(),

    topic: safeString
      .trim()
      .min(2, "Topic must contain at least 2 characters")
      .max(100, "Topic must be under 100 characters")
      .optional(),
  })
  .strict();

module.exports = aiPromptSchema;
``
