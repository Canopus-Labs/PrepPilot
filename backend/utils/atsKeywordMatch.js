// Deterministic ATS-style keyword overlap between a resume and a job
// description. Unlike the Gemini-based /analyze flow, this is instant, free,
// and fully unit-testable — a quick "does my resume cover this JD" check.

// Common words that carry no signal for keyword matching. Kept small and
// obvious rather than a full linguistic stopword list.
const STOPWORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'of', 'to', 'in', 'for', 'on', 'with',
  'at', 'by', 'is', 'are', 'be', 'as', 'that', 'this', 'it', 'you', 'your',
  'we', 'our', 'will', 'from', 'have', 'has', 'using', 'use', 'able', 'etc',
]);

// Strip leading/trailing punctuation from a token. '+' and '#' are kept at the
// ends so "c++" and "c#" survive; '.' is allowed only *internally* (so
// "node.js" survives) but trimmed at the ends (so a sentence-final "MongoDB."
// becomes "mongodb"). We never split on these, so multi-char tech tokens stay
// whole.
const trimPunctuation = (token) => token.replace(/^[^a-z0-9+#]+|[^a-z0-9+#]+$/g, '');

/**
 * Extract unique, lowercased keywords from free text, preserving first-seen
 * order. Stopwords and tokens shorter than 2 chars are dropped.
 * @param {string} text
 * @returns {string[]}
 */
function extractKeywords(text) {
  if (typeof text !== 'string' || text.length === 0) return [];

  const seen = new Set();
  const keywords = [];

  for (const raw of text.toLowerCase().split(/\s+/)) {
    const token = trimPunctuation(raw);
    if (token.length < 2 || STOPWORDS.has(token) || seen.has(token)) continue;
    seen.add(token);
    keywords.push(token);
  }

  return keywords;
}

/**
 * Score how well a resume covers a job description's keywords.
 * The JD drives the keyword set; `matched` are JD keywords present in the
 * resume, `missing` are the rest. Score is the matched percentage (0-100).
 * @param {string} resumeText
 * @param {string} jobDescription
 * @returns {{ score: number, matched: string[], missing: string[], totalKeywords: number }}
 */
function matchResumeKeywords(resumeText, jobDescription) {
  const jdKeywords = extractKeywords(jobDescription);
  const totalKeywords = jdKeywords.length;

  if (totalKeywords === 0) {
    return { score: 0, matched: [], missing: [], totalKeywords: 0 };
  }

  const resumeSet = new Set(extractKeywords(resumeText));
  const matched = [];
  const missing = [];

  for (const keyword of jdKeywords) {
    if (resumeSet.has(keyword)) matched.push(keyword);
    else missing.push(keyword);
  }

  return {
    score: Math.round((matched.length / totalKeywords) * 100),
    matched,
    missing,
    totalKeywords,
  };
}

module.exports = { extractKeywords, matchResumeKeywords, STOPWORDS };
