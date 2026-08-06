/**
 * TF-IDF cosine similarity utility for the AI Interview Question Similarity Detector.
 * Pure functions — fully unit-testable without any database mocking.
 */

/**
 * Tokenize a string into lowercase word tokens, stripping punctuation.
 * @param {string} text
 * @returns {string[]}
 */
function tokenize(text) {
  if (typeof text !== "string") return [];
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 1);
}

/**
 * Compute term-frequency for a token list.
 * @param {string[]} tokens
 * @returns {Record<string, number>}
 */
function termFreq(tokens) {
  const tf = {};
  for (const t of tokens) {
    tf[t] = (tf[t] || 0) + 1;
  }
  for (const t of Object.keys(tf)) {
    tf[t] = tf[t] / tokens.length;
  }
  return tf;
}

/**
 * Compute IDF values given a list of document term-frequency maps.
 * @param {Array<Record<string, number>>} docs
 * @returns {Record<string, number>}
 */
function idf(docs) {
  const df = {};
  for (const doc of docs) {
    const unique = new Set(Object.keys(doc));
    for (const t of unique) {
      df[t] = (df[t] || 0) + 1;
    }
  }
  const n = docs.length;
  const idfVals = {};
  for (const t of Object.keys(df)) {
    idfVals[t] = Math.log((n + 1) / (df[t] + 1)) + 1;
  }
  return idfVals;
}

/**
 * Compute TF-IDF vector for a single document.
 * @param {Record<string, number>} tf
 * @param {Record<string, number>} idfVals
 * @returns {Record<string, number>}
 */
function tfidf(tf, idfVals) {
  const vec = {};
  for (const t of Object.keys(tf)) {
    vec[t] = tf[t] * (idfVals[t] || 1);
  }
  return vec;
}

/**
 * Cosine similarity between two sparse TF-IDF vectors.
 * @param {Record<string, number>} a
 * @param {Record<string, number>} b
 * @returns {number}
 */
function cosineSim(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (const t of Object.keys(a)) {
    dot += a[t] * (b[t] || 0);
    normA += a[t] * a[t];
  }
  for (const t of Object.keys(b)) {
    normB += b[t] * b[t];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

/**
 * Compute similarity scores between an input text and a corpus of documents.
 * Returns documents sorted by descending similarity.
 *
 * @param {string} inputText - The question text to compare
 * @param {Array<{id: string, text: string}>} corpus - Documents to compare against
 * @param {object} [options]
 * @param {number} [options.limit=5] - Max results to return
 * @param {number} [options.selfMatchThreshold=0.9999] - Scores above this are filtered as self-matches
 * @returns {Array<{id: string, text: string, similarityScore: number}>}
 */
function computeSimilarity(inputText, corpus, options = {}) {
  const { limit = 5, selfMatchThreshold = 0.9999 } = options;

  if (!inputText || typeof inputText !== "string" || !inputText.trim()) {
    throw new Error("inputText is required and must be a non-empty string");
  }

  if (!Array.isArray(corpus)) {
    throw new Error("corpus must be an array");
  }

  if (corpus.length === 0) {
    return [];
  }

  // Build TF-IDF for corpus
  const docs = corpus.map((d) => termFreq(tokenize(d.text)));
  const idfVals = idf(docs);

  // TF-IDF for input
  const inputTokens = tokenize(inputText);
  const inputTf = termFreq(inputTokens);
  const inputVec = tfidf(inputTf, idfVals);

  // Score each document
  const scored = corpus.map((d, i) => {
    const qTf = termFreq(tokenize(d.text));
    const qVec = tfidf(qTf, idfVals);
    const score = cosineSim(inputVec, qVec);
    return {
      id: d.id,
      text: d.text,
      similarityScore: Math.round(score * 1000) / 1000,
    };
  });

  return scored
    .filter((r) => r.similarityScore < selfMatchThreshold)
    .sort((a, b) => b.similarityScore - a.similarityScore)
    .slice(0, limit);
}

module.exports = { tokenize, termFreq, idf, tfidf, cosineSim, computeSimilarity };
