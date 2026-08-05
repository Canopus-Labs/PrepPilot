const { z } = require("zod");
const { handleValidationError } = require("./ValidateQuestions");

// ── Base field schemas (NO defaults here) ──────────────────
// Shared by both the create and update schemas below. Defaults are only
// applied when building createRoadmapSchema. If defaults were baked in here,
// `.partial()` on the update schema would NOT stop them from firing: Zod's
// `.default()` fills in a value any time a key is missing/undefined,
// regardless of whether the field is optional/partial. That previously
// caused every field the client didn't send on a PUT (e.g. a single-section
// regenerate request, which only sends the one changed key) to be reset to
// its empty default ([]/{}), and the controller then wrote those empty
// defaults over the rest of the saved roadmap — wiping it out.
const answersFields = z
  .object({
    targetAudience: z.string().max(1000),
    problemSolved: z.string().max(1000),
    appType: z.string().max(200),
    mvpFeatures: z.string().max(2000),
    techPreferences: z.string().max(1000),
    designStyle: z.string().max(1000),
    accessibilityBranding: z.string().max(1000),
    timeline: z.string().max(200),
  })
  .partial();

const checklistItemFields = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(300),
  completed: z.boolean().optional(),
  notes: z.string().max(2000).optional(),
});

const milestoneFields = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  order: z.number().optional(),
  completed: z.boolean().optional(),
  status: z.enum(["todo", "in-progress", "done"]).optional(),
  notes: z.string().max(2000).optional(),
  subtasks: z.array(checklistItemFields).optional(),
});

const techStackFields = z
  .object({
    frontend: z.array(z.string()),
    backend: z.array(z.string()),
    database: z.array(z.string()),
    other: z.array(z.string()),
  })
  .partial();

const featurePrioritizationFields = z
  .object({
    mvp: z.array(z.string()),
    future: z.array(z.string()),
  })
  .partial();

// ── Create schema: every field optional-with-default ──────
const createRoadmapSchema = z.object({
  projectIdea: z.string().min(1, "Project idea is required").max(500),
  answers: answersFields.optional().default({}),
  overview: z.string().max(5000).optional().default(""),
  techStack: techStackFields.optional().default({}),
  uiUxRecommendations: z.array(z.string()).optional().default([]),
  milestones: z.array(milestoneFields).optional().default([]),
  featurePrioritization: featurePrioritizationFields.optional().default({}),
  databaseApiSuggestions: z.array(z.string()).optional().default([]),
  deploymentRecommendations: z.array(z.string()).optional().default([]),
  testingChecklist: z.array(checklistItemFields).optional().default([]),
  lastStep: z.number().optional().default(0),
});

// ── Update schema: any subset of fields, no defaults ────────
// Built from the same base field schemas so validation stays in sync with
// create, but nothing here has `.default()` — so a field the client doesn't
// send is simply absent from the parsed result, and the controller (which
// only assigns `req.body[field]` when it's `!== undefined`) leaves the
// existing saved value untouched instead of overwriting it with an empty one.
const updateRoadmapSchema = z.object({
  projectIdea: z.string().min(1, "Project idea is required").max(500).optional(),
  answers: answersFields.optional(),
  overview: z.string().max(5000).optional(),
  techStack: techStackFields.optional(),
  uiUxRecommendations: z.array(z.string()).optional(),
  milestones: z.array(milestoneFields).optional(),
  featurePrioritization: featurePrioritizationFields.optional(),
  databaseApiSuggestions: z.array(z.string()).optional(),
  deploymentRecommendations: z.array(z.string()).optional(),
  testingChecklist: z.array(checklistItemFields).optional(),
  lastStep: z.number().optional(),
});

const toggleTaskSchema = z.object({
  type: z.enum(["milestone", "subtask", "testing"]),
  milestoneId: z.string().optional(),
  taskId: z.string().optional(),
  completed: z.boolean().optional(),
  status: z.enum(["todo", "in-progress", "done"]).optional(),
  notes: z.string().max(2000).optional(),
});

const validateCreateRoadmap = (req, res, next) => {
  try {
    req.body = createRoadmapSchema.parse(req.body);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

const validateUpdateRoadmap = (req, res, next) => {
  try {
    req.body = updateRoadmapSchema.parse(req.body);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

const validateToggleTask = (req, res, next) => {
  try {
    req.body = toggleTaskSchema.parse(req.body);
    next();
  } catch (error) {
    return handleValidationError(res, error);
  }
};

module.exports = {
  validateCreateRoadmap,
  validateUpdateRoadmap,
  validateToggleTask,
};