const DEFAULT_LANGUAGE = "python";
const SUPPORTED_LANGUAGES = [
  "python",
  "javascript",
  "typescript",
  "java",
  "cpp",
  "c",
  "go",
  "rust",
  "ruby",
  "swift",
];

const SECTION_ALIASES = {
  approach: ["approach", "approach / intuition", "intuition", "solution idea"],
  steps: ["steps", "algorithm", "step-by-step", "solution"],
  complexity: ["complexity", "time & space complexity", "time and space complexity", "complexity analysis"],
  code: ["code", "implementation", "solution code"],
};

function buildSolverPrompt({ problem, language = DEFAULT_LANGUAGE, constraints = "" }) {
  const lang = SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE;
  const constraintsBlock = constraints
    ? `\nConstraints:\n${constraints}`
    : "";

  return [
    `You are an expert coding interview tutor. Solve the following problem and return your answer as plain markdown using EXACTLY these four sections in order:`,
    ``,
    `## Approach`,
    `## Steps`,
    `## Complexity`,
    `## Code`,
    ``,
    `Rules:`,
    `- Approach: explain the optimal strategy and why it works, 1 short paragraph plus the key idea.`,
    `- Steps: a numbered list of the algorithm.`,
    `- Complexity: state Time and Space complexity with a brief justification.`,
    `- Code: a complete, runnable solution written in ${lang}. Wrap it in a single fenced code block tagged with the language.`,
    ``,
    `Problem:`,
    `${problem}`,
    constraintsBlock,
  ].join("\n");
}

function extractSection(text, heading) {
  const headingPattern = new RegExp(
    `(?:#{1,3}\\s*\\**|\\**)[ ]*${heading}[ ]*\\**(?:\\s*:)?`,
    "i"
  );

  const lines = text.split("\n");
  let codeFence = null;
  let headingMatch = null;
  let headingStart = 0;

  for (let i = 0, offset = 0; i < lines.length; i++) {
    const line = lines[i];
    const fenceMatch = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);

    if (fenceMatch) {
      const fence = fenceMatch[1];
      const trailing = fenceMatch[2].trim();

      if (codeFence === null) {
        codeFence = fence;
      } else if (
        fence[0] === codeFence[0] &&
        fence.length >= codeFence.length &&
        trailing === ""
      ) {
        codeFence = null;
      }
    } else if (codeFence === null) {
      const match = line.match(headingPattern);

      if (match) {
        headingMatch = match;
        headingStart = offset + match.index;
        break;
      }
    }

    offset += line.length + 1;
  }

  if (!headingMatch) return null;

  const start = headingStart + headingMatch[0].length;
  const remaining = text.slice(start);
  const remainingLines = remaining.split("\n");

  codeFence = null;
  let end = remaining.length;
  let offset = 0;

  for (const line of remainingLines) {
    const fenceMatch = line.match(/^ {0,3}(`{3,}|~{3,})(.*)$/);

    if (fenceMatch) {
      const fence = fenceMatch[1];
      const trailing = fenceMatch[2].trim();

      if (codeFence === null) {
        codeFence = fence;
      } else if (
        fence[0] === codeFence[0] &&
        fence.length >= codeFence.length &&
        trailing === ""
      ) {
        codeFence = null;
      }
    } else if (
      codeFence === null &&
      /^(?:#{1,3}\s*\**)[ ]*[A-Z][^#\n]*\**:?$/.test(line)
    ) {
      end = offset;
      break;
    }

    offset += line.length + 1;
  }

  let section = text.slice(start, start + end).trim();
  section = section.replace(/\n+$/, "");

  return section || null;
}

function parseSolverOutput(text) {
  if (!text || typeof text !== "string") {
    return { ok: false, raw: "", sections: null };
  }

  const clean = text.replace(/\r\n/g, "\n").trim();
  const sections = {};

  for (const [key, aliases] of Object.entries(SECTION_ALIASES)) {
    for (const alias of aliases) {
      const found = extractSection(clean, alias);
      if (found) {
        sections[key] = found;
        break;
      }
    }
  }

  const hasApproach = Boolean(sections.approach);
  const hasCode = Boolean(sections.code);

  return {
    ok: hasApproach && hasCode,
    raw: clean,
    sections,
  };
}

module.exports = {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGES,
  buildSolverPrompt,
  extractSection,
  parseSolverOutput,
};
