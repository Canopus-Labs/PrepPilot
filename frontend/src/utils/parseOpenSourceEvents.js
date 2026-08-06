const MONTH_ORDER = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const MONTH_NAME_PATTERN = MONTH_ORDER.join("|");

const capitalizeMonth = (month) => {
  const normalized = month.toLowerCase();
  return MONTH_ORDER.find((m) => m.toLowerCase() === normalized) || "";
};

const extractMonthFromLine = (line) => {
  const markdownMatch = line.match(
    new RegExp(`^##\\s+(${MONTH_NAME_PATTERN})\\b`, "i"),
  );
  if (markdownMatch) {
    return capitalizeMonth(markdownMatch[1]);
  }

  const htmlMatch = line.match(
    new RegExp(`<h2[^>]*>\\s*(?:[^A-Za-z]*)?(${MONTH_NAME_PATTERN})\\b`, "i"),
  );
  if (htmlMatch) {
    return capitalizeMonth(htmlMatch[1]);
  }

  return "";
};

const isSectionBoundary = (line) =>
  /^[-*]\s+\[/.test(line) ||
  /^##\s+/.test(line) ||
  /<h2[\s>]/i.test(line) ||
  /^<\/?details>/i.test(line);

export const parseEventsFromMarkdown = (markdown) => {
  const lines = markdown.split(/\r?\n/);
  const events = [];
  let currentMonth = "";

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i].trim();

    const monthCandidate = extractMonthFromLine(line);
    if (monthCandidate) {
      currentMonth = monthCandidate;
      continue;
    }

    const eventMatch = line.match(/^[-*]\s+\[([^\]]+)\]\(([^)]+)\)/);
    if (!eventMatch) continue;

    let dateLine = "";
    for (let j = i + 1; j < Math.min(i + 6, lines.length); j += 1) {
      const peek = lines[j].trim();
      if (isSectionBoundary(peek)) break;
      const cleaned = peek.replace(/^>\s*/, "");
      if (/^Date:/i.test(cleaned)) {
        dateLine = cleaned;
        break;
      }
    }

    let date = "";
    let mode = "";
    let location = "";
    if (dateLine) {
      const parts = dateLine
        .replace(/^Date:\s*/i, "")
        .split("||")
        .map((part) => part.trim())
        .filter(Boolean);

      if (parts[0]) date = parts[0];
      if (parts[1]) mode = parts[1].replace(/^Mode:\s*/i, "").trim();
      if (parts[2]) {
        location = parts[2].replace(/^Location[s]?:\s*/i, "").trim();
      }
    }

    events.push({
      id: `${eventMatch[1]}-${events.length}`,
      name: eventMatch[1],
      url: eventMatch[2],
      month: currentMonth || "TBA",
      date,
      mode,
      location,
    });
  }

  return events;
};

export { MONTH_ORDER };
