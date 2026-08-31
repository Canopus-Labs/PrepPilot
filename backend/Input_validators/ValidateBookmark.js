const z = require("zod");

const BOOKMARK_CATEGORIES = [
  "DSA", "System Design", "Behavioral", "Aptitude", "Coding",
  "OS", "DBMS", "Networking", "Other",
];

const validateCreateBookmark = (req, res, next) => {
  const schema = z.object({
    question: z.string().min(1, "Question is required").max(500),
    answer: z.string().max(2000).optional(),
    category: z.enum(BOOKMARK_CATEGORIES).default("DSA"),
    difficulty: z.enum(["Easy", "Medium", "Hard"]).default("Medium"),
    tags: z.array(z.string().max(30).toLowerCase()).max(5).optional(),
    notes: z.string().max(500).optional(),
    source: z.enum(["manual", "session", "sheet", "imported"]).optional(),
    sourceRef: z.string().optional(),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.errors.map((e) => e.message).join(", "),
    });
  }
  req.validatedBody = result.data;
  next();
};

const validateUpdateBookmark = (req, res, next) => {
  const schema = z.object({
    question: z.string().min(1).max(500).optional(),
    answer: z.string().max(2000).optional(),
    category: z.enum(BOOKMARK_CATEGORIES).optional(),
    difficulty: z.enum(["Easy", "Medium", "Hard"]).optional(),
    tags: z.array(z.string().max(30).toLowerCase()).max(5).optional(),
    notes: z.string().max(500).optional(),
    starred: z.boolean().optional(),
  });

  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: result.error.errors.map((e) => e.message).join(", "),
    });
  }
  req.validatedBody = result.data;
  next();
};

module.exports = { validateCreateBookmark, validateUpdateBookmark };
