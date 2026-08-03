export const countWords = (text = "") => {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
};

export const countCharacters = (text = "") => text.length;

export const getFieldTotals = (fields) =>
  Object.keys(fields).reduce(
    (acc, key) => {
      acc.words += countWords(fields[key]);
      acc.characters += countCharacters(fields[key]);
      return acc;
    },
    { words: 0, characters: 0 }
  );

export const buildStarMarkdown = ({ question, situation, task, action, result }) => {
  const heading = `# ${question}`;
  const sections = [
    { label: "Situation", value: situation },
    { label: "Task", value: task },
    { label: "Action", value: action },
    { label: "Result", value: result },
  ]
    .filter((section) => section.value && section.value.trim())
    .map((section) => `## ${section.label}\n\n${section.value.trim()}`);

  return [heading, ...sections].join("\n\n");
};

export const makeAnswer = (payload) => {
  const { id, question, fields, createdAt, updatedAt } = payload;
  const totals = getFieldTotals(fields);
  return {
    id: id || `star-${Date.now()}`,
    question,
    fields: {
      situation: fields.situation || "",
      task: fields.task || "",
      action: fields.action || "",
      result: fields.result || "",
    },
    wordCount: totals.words,
    createdAt: createdAt || new Date().toISOString(),
    updatedAt: updatedAt || new Date().toISOString(),
  };
};

export const sortAnswersByUpdated = (answers) =>
  [...answers].sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

export const estimateReadTimeMinutes = (wordCount) =>
  Math.max(1, Math.ceil(wordCount / 150));

export const starCompleteness = (fields) => {
  const filled = ["situation", "task", "action", "result"].filter(
    (key) => (fields[key] || "").trim().length > 0
  ).length;
  return { filled, total: 4, percent: Math.round((filled / 4) * 100) };
};
