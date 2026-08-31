const z = require("zod");

const categories = [
  "DSA",
  "System Design",
  "Behavioral",
  "Aptitude",
  "Coding Practice",
  "Mock Interview",
  "Resume Review",
  "Other",
];

const colors = ["blue", "green", "purple", "orange", "red", "teal", "pink"];

// Validate body for creating a study goal
const validateCreateGoal = (req, res, next) => {
  const schema = z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(120, "Title must be 120 characters or fewer"),
    category: z.enum(categories).default("DSA"),
    weeklyTargetMinutes: z
      .number()
      .min(15, "Minimum target is 15 minutes")
      .max(300, "Maximum target is 300 minutes"),
    color: z.enum(colors).default("blue"),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.errors.map((e) => e.message).join(", ");
    return res.status(400).json({ success: false, message });
  }
  req.validatedBody = result.data;
  next();
};

// Validate body for updating a study goal
const validateUpdateGoal = (req, res, next) => {
  const schema = z.object({
    title: z
      .string()
      .min(1, "Title is required")
      .max(120, "Title must be 120 characters or fewer")
      .optional(),
    category: z.enum(categories).optional(),
    weeklyTargetMinutes: z
      .number()
      .min(15, "Minimum target is 15 minutes")
      .max(300, "Maximum target is 300 minutes")
      .optional(),
    color: z.enum(colors).optional(),
    isActive: z.boolean().optional(),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.errors.map((e) => e.message).join(", ");
    return res.status(400).json({ success: false, message });
  }
  req.validatedBody = result.data;
  next();
};

// Validate body for logging a study session
const validateLogSession = (req, res, next) => {
  const schema = z.object({
    minutes: z
      .number()
      .min(1, "Minimum 1 minute")
      .max(480, "Maximum 480 minutes per session"),
    notes: z.string().max(300, "Notes must be 300 characters or fewer").optional(),
    date: z.string().datetime().optional(),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.errors.map((e) => e.message).join(", ");
    return res.status(400).json({ success: false, message });
  }
  req.validatedBody = result.data;
  next();
};

module.exports = {
  validateCreateGoal,
  validateUpdateGoal,
  validateLogSession,
};
