const { z } = require("zod");
const { handleValidationError } = require("./ValidateQuestions");

const createInterviewExperienceSchema = z.object({
  company: z.string().trim().min(1, "Company is required").max(120),
  role: z.string().trim().min(1, "Role is required").max(120),
  experience: z.string().trim().max(60).optional().default("N/A"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]).optional().default("Medium"),
  offerReceived: z.boolean().optional().default(false),
  date: z.string().trim().max(40).optional().default(""),
  rounds: z
    .array(
      z.object({
        name: z.string().trim().max(120).optional().default("Round"),
        type: z.string().trim().max(60).optional().default("Coding"),
        description: z.string().trim().max(2000).optional().default(""),
      }),
    )
    .max(20)
    .optional()
    .default([]),
  summary: z.string().trim().min(1, "Summary is required").max(5000),
  tips: z.array(z.string().trim().max(500)).max(20).optional().default([]),
  tags: z.array(z.string().trim().max(40)).max(10).optional().default([]),
  color: z.string().trim().max(40).optional(),
  clientKey: z.string().trim().min(8).max(64).optional().nullable(),
});

const updateStatusSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"]),
});

const validateCreateInterviewExperience = (req, res, next) => {
  try {
    req.body = createInterviewExperienceSchema.parse(req.body);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

const validateUpdateInterviewExperienceStatus = (req, res, next) => {
  try {
    req.body = updateStatusSchema.parse(req.body);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

module.exports = {
  validateCreateInterviewExperience,
  validateUpdateInterviewExperienceStatus,
};
