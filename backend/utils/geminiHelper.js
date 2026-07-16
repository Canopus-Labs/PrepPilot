const { GoogleGenerativeAI } = require("@google/generative-ai");

/**
 * Ordered list of fallback Gemini models tried when the primary model
 * (process.env.GEMINI_MODEL) is unavailable or returns an error.
 * The env var is prepended at runtime so it is always attempted first.
 */
const DEFAULT_CANDIDATE_MODELS = [
  "models/gemini-2.5-flash",
  "models/gemini-flash-latest",
  "models/gemini-2.0-flash",
];

/**
 * Determines whether an error is transient and worth retrying (e.g. rate
 * limits, temporary service unavailability, or network timeouts).
 *
 * @param {Error} error
 * @returns {boolean}
 */
function isRetryableError(error) {
  const status = error?.status || error?.code;
  return (
    status === 429 ||
    status === 503 ||
    error?.message?.toLowerCase().includes("timeout") ||
    error?.message?.toLowerCase().includes("network")
  );
}

/**
 * Calls model.generateContent(parts) with exponential-backoff retries for
 * transient errors.
 *
 * @param {object} model          - A Gemini GenerativeModel instance.
 * @param {Array}  parts          - Content parts array passed to generateContent.
 * @param {number} [maxRetries=1] - Total attempts before giving up (default: 1 = no retry).
 * @param {number} [initialDelay=1000] - Base delay in ms for the first retry.
 * @returns {Promise<object>} The raw Gemini result object.
 * @throws {Error} Re-throws the last error when all retries are exhausted.
 */
async function generateWithRetry(model, parts, maxRetries = 1, initialDelay = 1000) {
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await model.generateContent(parts);
    } catch (error) {
      lastError = error;

      // Do not retry non-transient errors (e.g. bad request, auth failures)
      if (!isRetryableError(error) || attempt === maxRetries - 1) {
        throw error;
      }

      const delay = initialDelay * Math.pow(2, attempt);
      console.warn(
        `[Gemini Retry] Attempt ${attempt + 1}/${maxRetries} failed. Retrying in ${delay}ms…`
      );
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }

  throw lastError;
}

/**
 * Tries each candidate Gemini model in order and returns the result from the
 * first one that succeeds.  The model specified by process.env.GEMINI_MODEL
 * is always attempted first (if set).
 *
 * @param {string} apiKey              - Gemini API key.
 * @param {Array}  parts               - Content parts array to pass to generateContent.
 * @param {object} [options={}]        - Optional extra config forwarded to getGenerativeModel
 *                                       (e.g. { generationConfig, systemInstruction }).
 * @param {number} [retries=1]         - Attempts per model (1 = no retry, >1 = exponential backoff).
 * @param {number} [initialDelay=1000] - Base delay in ms used for retry back-off.
 * @returns {Promise<{ result: object, usedModel: string }>}
 * @throws {Error} If every candidate model fails.
 *
 * @example
 * const { result, usedModel } = await generateWithFallback(
 *   process.env.GEMINI_API_KEY,
 *   [prompt]
 * );
 * const text = await result.response.text();
 */
async function generateWithFallback(apiKey, parts, options = {}, retries = 1, initialDelay = 1000) {
  const genAI = new GoogleGenerativeAI(apiKey);

  const candidates = [
    process.env.GEMINI_MODEL,
    ...DEFAULT_CANDIDATE_MODELS,
  ].filter(Boolean);

  let lastErr = null;

  for (const m of candidates) {
    try {
      const model = genAI.getGenerativeModel({ model: m, ...options });
      const result = await generateWithRetry(model, parts, retries, initialDelay);
      return { result, usedModel: m };
    } catch (e) {
      lastErr = e;
    }
  }

  throw lastErr || new Error("All Gemini models failed");
}

/**
 * Variant of generateWithFallback for chat sessions.  Initialises a chat
 * with optional history, sends a single message, and returns the raw result.
 *
 * @param {string} apiKey               - Gemini API key.
 * @param {string} prompt               - The user message to send.
 * @param {Array}  [formattedHistory=[]] - Pre-formatted chat history expected
 *                                        by the Gemini chat API.
 * @param {object} [options={}]         - Extra config forwarded to getGenerativeModel.
 * @returns {Promise<{ result: object, usedModel: string }>}
 * @throws {Error} If every candidate model fails.
 */
async function generateChatWithFallback(apiKey, prompt, formattedHistory = [], options = {}) {
  const genAI = new GoogleGenerativeAI(apiKey);

  const candidates = [
    process.env.GEMINI_MODEL,
    ...DEFAULT_CANDIDATE_MODELS,
  ].filter(Boolean);

  let lastErr = null;

  for (const m of candidates) {
    try {
      const model = genAI.getGenerativeModel({ model: m, ...options });
      const chat = model.startChat({ history: formattedHistory });
      const result = await chat.sendMessage(prompt);
      return { result, usedModel: m };
    } catch (e) {
      lastErr = e;
    }
  }

  throw lastErr || new Error("All Gemini models failed");
}

module.exports = {
  generateWithFallback,
  generateChatWithFallback,
  DEFAULT_CANDIDATE_MODELS,
};
