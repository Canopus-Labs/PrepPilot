const z = require("zod");

const STATUSES = ["researching", "preparing", "applied", "interviewing", "offer", "rejected", "withdrawn"];

const validateCreateCompanyPrep = (req, res, next) => {
  const schema = z.object({
    companyName: z.string().min(1, "Company name required").max(100),
    role: z.string().min(1, "Role required").max(100),
    status: z.enum(STATUSES).default("researching"),
    applicationUrl: z.string().max(500).optional(),
    salaryRange: z.string().max(80).optional(),
    location: z.string().max(100).optional(),
    readinessScore: z.number().min(0).max(100).optional(),
    focusTopics: z.array(z.string().max(40)).max(8).optional(),
    processNotes: z.string().max(2000).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    deadline: z.string().datetime().optional(),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ success: false, message: result.error.errors.map((e) => e.message).join(", ") });
  }
  req.validatedBody = result.data;
  next();
};

const validateUpdateCompanyPrep = (req, res, next) => {
  const schema = z.object({
    companyName: z.string().min(1).max(100).optional(),
    role: z.string().min(1).max(100).optional(),
    status: z.enum(STATUSES).optional(),
    applicationUrl: z.string().max(500).optional(),
    salaryRange: z.string().max(80).optional(),
    location: z.string().max(100).optional(),
    readinessScore: z.number().min(0).max(100).optional(),
    focusTopics: z.array(z.string().max(40)).max(8).optional(),
    processNotes: z.string().max(2000).optional(),
    priority: z.enum(["low", "medium", "high"]).optional(),
    deadline: z.string().datetime().nullable().optional(),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ success: false, message: result.error.errors.map((e) => e.message).join(", ") });
  }
  req.validatedBody = result.data;
  next();
};

const validateAddQuestion = (req, res, next) => {
  const schema = z.object({
    question: z.string().min(1, "Question required").max(500),
    difficulty: z.enum(["Easy", "Medium", "Hard"]).default("Medium"),
    notes: z.string().max(300).optional(),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ success: false, message: result.error.errors.map((e) => e.message).join(", ") });
  }
  req.validatedBody = result.data;
  next();
};

const validateAddRound = (req, res, next) => {
  const schema = z.object({
    name: z.string().min(1, "Round name required").max(80),
    description: z.string().max(300).optional(),
    scheduledAt: z.string().datetime().optional(),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ success: false, message: result.error.errors.map((e) => e.message).join(", ") });
  }
  req.validatedBody = result.data;
  next();
};

module.exports = { validateCreateCompanyPrep, validateUpdateCompanyPrep, validateAddQuestion, validateAddRound };
