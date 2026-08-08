// ─────────────────────────────────────────────────────────
// ID generation
// ─────────────────────────────────────────────────────────
export const genId = (prefix = "id") => {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `${prefix}_${crypto.randomUUID()}`;
  }
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
};

// ─────────────────────────────────────────────────────────
// JSON extraction (mirrors the tolerant parser used by ProjectIdeas)
// ─────────────────────────────────────────────────────────
export const tryParseJSON = (text) => {
  if (!text) return null;
  try {
    const cleaned = text.replace(/```json|```/gi, "").trim();
    const objMatch = cleaned.match(/\{[\s\S]*\}/);
    if (objMatch) return JSON.parse(objMatch[0]);
    return JSON.parse(cleaned);
  } catch {
    return null;
  }
};

// ─────────────────────────────────────────────────────────
// Questionnaire definition (single source of truth for the wizard)
// ─────────────────────────────────────────────────────────
export const QUESTIONS = [
  {
    key: "targetAudience",
    prompt: "Who is your target audience?",
    placeholder: "e.g. College students preparing for placements",
    type: "text",
  },
  {
    key: "problemSolved",
    prompt: "What problem does your project solve?",
    placeholder: "e.g. Helps students track DSA practice across scattered sheets",
    type: "textarea",
  },
  {
    key: "appType",
    prompt: "Is this a web, mobile, desktop, or AI application?",
    type: "choice",
    options: ["Web", "Mobile", "Desktop", "AI Application", "Full Stack"],
  },
  {
    key: "mvpFeatures",
    prompt: "What features are essential for the MVP?",
    placeholder: "e.g. User auth, dashboard, progress tracker, notifications",
    type: "textarea",
  },
  {
    key: "techPreferences",
    prompt: "Which technologies would you like to use?",
    placeholder: "e.g. React, Node.js, MongoDB — or leave blank to let AI suggest",
    type: "textarea",
    optional: true,
  },
  {
    key: "designStyle",
    prompt: "What design style or color palette do you prefer?",
    placeholder: "e.g. Minimal dark theme with violet accents",
    type: "textarea",
    optional: true,
  },
  {
    key: "accessibilityBranding",
    prompt: "Are there any accessibility or branding requirements?",
    placeholder: "e.g. WCAG AA contrast, existing logo/brand colors",
    type: "textarea",
    optional: true,
  },
  {
    key: "timeline",
    prompt: "What is your expected timeline?",
    type: "choice",
    options: ["1-2 weeks", "3-4 weeks", "1-2 months", "3-6 months", "6+ months"],
  },
];

// ─────────────────────────────────────────────────────────
// Prompt builders
// ─────────────────────────────────────────────────────────
export function buildRoadmapPrompt(idea, answers) {
  return `You are an expert software architect and technical project manager. A developer wants to build the following project:

PROJECT IDEA: "${idea}"

They answered these clarifying questions:
- Target audience: ${answers.targetAudience || "Not specified"}
- Problem it solves: ${answers.problemSolved || "Not specified"}
- Application type: ${answers.appType || "Not specified"}
- Essential MVP features: ${answers.mvpFeatures || "Not specified"}
- Technology preferences: ${answers.techPreferences || "No strong preference — recommend the best fit"}
- Design style / color palette: ${answers.designStyle || "No strong preference — recommend something fitting"}
- Accessibility / branding requirements: ${answers.accessibilityBranding || "None specified"}
- Expected timeline: ${answers.timeline || "Not specified"}

Generate a complete, actionable project development roadmap. Return ONLY a valid JSON object (no markdown fences, no prose) with EXACTLY this shape:

{
  "overview": "2-4 sentence project overview summarizing the vision and value proposition",
  "techStack": {
    "frontend": ["technology1", "technology2"],
    "backend": ["technology1", "technology2"],
    "database": ["technology1"],
    "other": ["e.g. hosting, auth provider, CI/CD"]
  },
  "uiUxRecommendations": ["short recommendation 1", "short recommendation 2", "..."],
  "milestones": [
    {
      "title": "Milestone name e.g. Project Setup & Foundations",
      "description": "1-2 sentence description of this milestone's goal",
      "subtasks": ["specific task 1", "specific task 2", "specific task 3"]
    }
  ],
  "featurePrioritization": {
    "mvp": ["must-have feature 1", "must-have feature 2"],
    "future": ["future enhancement 1", "future enhancement 2"]
  },
  "databaseApiSuggestions": ["suggestion about schema/data modeling or API design"],
  "deploymentRecommendations": ["deployment/hosting recommendation 1", "recommendation 2"],
  "testingChecklist": ["testing item 1", "testing item 2", "testing item 3"]
}

Requirements:
- Produce 4 to 7 milestones ordered from project setup through launch, matching the ${answers.timeline || "given"} timeline.
- Each milestone should have 3 to 6 concrete subtasks.
- Keep every string concise (under 25 words) and specific to THIS project, not generic advice.
- Base technology suggestions on the stated preferences when given; otherwise pick a modern, well-supported stack suited to the application type.
Return ONLY the JSON object.`;
}

export function buildRegeneratePrompt(idea, answers, sectionKey, sectionLabel, currentValue) {
  return `You are an expert software architect. A developer is building this project:

PROJECT IDEA: "${idea}"
Target audience: ${answers.targetAudience || "Not specified"}
Problem solved: ${answers.problemSolved || "Not specified"}
Application type: ${answers.appType || "Not specified"}
MVP features: ${answers.mvpFeatures || "Not specified"}
Tech preferences: ${answers.techPreferences || "No strong preference"}
Timeline: ${answers.timeline || "Not specified"}

They want ONLY the "${sectionLabel}" section of their roadmap regenerated with a fresh take (different angle/ideas than before, still relevant and specific to this project).

Current version for reference (avoid just repeating this): ${JSON.stringify(currentValue)}

Return ONLY a valid JSON object with a single key "${sectionKey}" holding the regenerated content in EXACTLY the same shape/type as the current version shown above. No markdown fences, no prose, no extra keys.`;
}

// ─────────────────────────────────────────────────────────
// Normalize freshly-generated AI JSON into the shape the backend/schema expects
// (adds client-side ids to milestones/subtasks/testing items)
// ─────────────────────────────────────────────────────────
export function normalizeGeneratedRoadmap(raw) {
  const milestones = Array.isArray(raw.milestones)
    ? raw.milestones.map((m, i) => ({
        id: genId("ms"),
        title: m.title || `Milestone ${i + 1}`,
        description: m.description || "",
        order: i,
        completed: false,
        status: "todo",
        notes: "",
        subtasks: Array.isArray(m.subtasks)
          ? m.subtasks.map((s) => ({
              id: genId("task"),
              title: typeof s === "string" ? s : s.title || "",
              completed: false,
              notes: "",
            }))
          : [],
      }))
    : [];

  const testingChecklist = Array.isArray(raw.testingChecklist)
    ? raw.testingChecklist.map((t) => ({
        id: genId("test"),
        title: typeof t === "string" ? t : t.title || "",
        completed: false,
        notes: "",
      }))
    : [];

  return {
    overview: raw.overview || "",
    techStack: {
      frontend: raw.techStack?.frontend || [],
      backend: raw.techStack?.backend || [],
      database: raw.techStack?.database || [],
      other: raw.techStack?.other || [],
    },
    uiUxRecommendations: raw.uiUxRecommendations || [],
    milestones,
    featurePrioritization: {
      mvp: raw.featurePrioritization?.mvp || [],
      future: raw.featurePrioritization?.future || [],
    },
    databaseApiSuggestions: raw.databaseApiSuggestions || [],
    deploymentRecommendations: raw.deploymentRecommendations || [],
    testingChecklist,
  };
}

export const ROADMAP_SYSTEM_INSTRUCTION =
  "You are an API that ONLY returns valid JSON objects. Do not include any conversational text, greetings, markdown fences, or formatting outside the JSON object.";