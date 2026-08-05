const SHEET_ID_PATTERN = /^[a-zA-Z0-9-_]+$/;
const DIFFICULTIES = ["Easy", "Medium", "Hard"];
const STATUSES = ["not-started", "in-progress", "completed"];
const CATEGORIES = ["general", "dsa", "aptitude", "system-design"];

function clampNonNegativeInt(value, fallback = 0) {
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  return Math.max(0, Math.round(num));
}

function asString(value, maxLength = 500) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, maxLength);
}

function normalizeSubtopic(subtopic) {
  if (!subtopic || typeof subtopic !== "object" || Array.isArray(subtopic)) {
    return null;
  }
  const title = asString(subtopic.title, 200);
  if (!title) return null;

  let difficulty = asString(subtopic.difficulty, 20) || "Medium";
  if (!DIFFICULTIES.includes(difficulty)) difficulty = "Medium";

  let status = asString(subtopic.status, 20) || "not-started";
  if (!STATUSES.includes(status)) status = "not-started";

  const links = subtopic.links && typeof subtopic.links === "object"
    ? {
        gfg: asString(subtopic.links.gfg, 1000),
        leetcode: asString(subtopic.links.leetcode, 1000),
        youtube: asString(subtopic.links.youtube, 1000),
      }
    : {};

  return { title, difficulty, status, links };
}

function normalizeTopic(topic) {
  if (!topic || typeof topic !== "object" || Array.isArray(topic)) {
    return null;
  }
  const title = asString(topic.title, 200);
  if (!title) return null;

  const subtopics = Array.isArray(topic.subtopics)
    ? topic.subtopics.map(normalizeSubtopic).filter(Boolean)
    : [];

  return {
    title,
    completed: clampNonNegativeInt(topic.completed),
    total: clampNonNegativeInt(topic.total),
    subtopics,
  };
}

function normalizeSection(section) {
  if (!section || typeof section !== "object" || Array.isArray(section)) {
    return null;
  }
  const title = asString(section.title, 200);
  if (!title) return null;

  const topics = Array.isArray(section.topics)
    ? section.topics.map(normalizeTopic).filter(Boolean)
    : [];

  return {
    title,
    completed: clampNonNegativeInt(section.completed),
    total: clampNonNegativeInt(section.total),
    topics,
  };
}

function normalizeSheet(raw) {
  const errors = [];
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return { ok: false, errors: ["sheet payload must be an object"] };
  }

  const id = asString(raw.id, 100);
  if (!id) errors.push("id is required");
  else if (!SHEET_ID_PATTERN.test(id)) {
    errors.push("id may only contain letters, digits, dashes and underscores");
  }

  const title = asString(raw.title, 300);
  if (!title) errors.push("title is required");

  let category = asString(raw.category, 50);
  if (category && !CATEGORIES.includes(category)) {
    errors.push(`category must be one of: ${CATEGORIES.join(", ")}`);
    category = "";
  }

  const sections = Array.isArray(raw.sections)
    ? raw.sections.map(normalizeSection).filter(Boolean)
    : [];

  return {
    ok: errors.length === 0,
    errors,
    value: {
      id,
      title,
      description: asString(raw.description, 2000),
      followers: clampNonNegativeInt(raw.followers),
      questions: clampNonNegativeInt(raw.questions),
      category: category || "general",
      sections,
    },
  };
}

function computeSheetStats(sheet) {
  let questions = 0;
  let subtopicCount = 0;
  const byDifficulty = { Easy: 0, Medium: 0, Hard: 0 };
  const byStatus = { "not-started": 0, "in-progress": 0, completed: 0 };

  for (const section of sheet.sections || []) {
    for (const topic of section.topics || []) {
      for (const subtopic of topic.subtopics || []) {
        subtopicCount += 1;
        if (DIFFICULTIES.includes(subtopic.difficulty)) {
          byDifficulty[subtopic.difficulty] += 1;
        }
        if (STATUSES.includes(subtopic.status)) {
          byStatus[subtopic.status] += 1;
        }
      }
    }
  }

  questions = subtopicCount;
  return {
    questions,
    sections: (sheet.sections || []).length,
    byDifficulty,
    byStatus,
  };
}

module.exports = {
  CATEGORIES,
  DIFFICULTIES,
  STATUSES,
  SHEET_ID_PATTERN,
  computeSheetStats,
  normalizeSection,
  normalizeSheet,
  normalizeSubtopic,
  normalizeTopic,
};
