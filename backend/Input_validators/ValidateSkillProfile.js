const z = require("zod");

const CATEGORIES = [
  "DSA", "System Design", "Languages", "Frameworks",
  "Databases", "DevOps", "Behavioral", "Aptitude", "Other",
];

const skillSchema = z.object({
  name: z.string().min(1, "Skill name required").max(50),
  proficiency: z.number().min(0, "Min 0").max(10, "Max 10"),
  category: z.enum(CATEGORIES).default("Other"),
  targetProficiency: z.number().min(0).max(10).optional(),
  notes: z.string().max(200).optional(),
});

const validateAddSkill = (req, res, next) => {
  const result = skillSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ success: false, message: result.error.errors.map((e) => e.message).join(", ") });
  }
  req.validatedBody = result.data;
  next();
};

const validateUpdateSkill = (req, res, next) => {
  const result = skillSchema.partial().safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ success: false, message: result.error.errors.map((e) => e.message).join(", ") });
  }
  req.validatedBody = result.data;
  next();
};

const validateSetAllSkills = (req, res, next) => {
  const schema = z.object({
    skills: z.array(skillSchema).min(1, "At least one skill required").max(20, "Max 20 skills"),
  });
  const result = schema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ success: false, message: result.error.errors.map((e) => e.message).join(", ") });
  }
  req.validatedBody = result.data;
  next();
};

module.exports = { validateAddSkill, validateUpdateSkill, validateSetAllSkills };
