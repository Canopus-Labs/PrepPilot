const { z } = require("zod");
const { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } = require("../utils/problemSolverParser");

const problemSolverSchema = z.object({
  problem: z
    .string()
    .trim()
    .min(1, "Problem is required")
    .max(5000, "Problem must be under 5000 characters")
    .refine((v) => v.length >= 3, "Problem must be at least 3 characters")
    .default(""),
  language: z
    .string()
    .trim()
    .default(DEFAULT_LANGUAGE)
    .refine(
      (v) => SUPPORTED_LANGUAGES.includes(v),
      `language must be one of: ${SUPPORTED_LANGUAGES.join(", ")}`
    ),
  constraints: z
    .string()
    .trim()
    .max(2000, "Constraints must be under 2000 characters")
    .default(""),
}).refine((d) => typeof d.problem === "string" && d.problem.trim().length > 0, {
  message: "Problem is required",
  path: ["problem"],
});

module.exports = problemSolverSchema;
