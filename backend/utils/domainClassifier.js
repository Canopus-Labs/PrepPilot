// List of domains and keywords acceptable for the AI mentor
const domainKeywords = [
  // General Interview & Career
  "interview", "interviews", "prep", "mentor", "career", "resume", "cv", "job", "jobs", "role", "roles", 
  "application", "offer", "salary", "negotiat", "hiring", "recruiter", 
  "mock", "portfolio", "cover letter", "behavioral", "technical", "questions", "answers",
  
  // Computer Science & Coding Basics
  "computer science", "software", "engineer", "developer", "code", "coding", 
  "program", "algorithm", "data structure", "dsa", "complexity", "big o",
  
  // Specific Data Structures & Algorithms
  "array", "string", "linked list", "stack", "queue", "tree", "graph", 
  "hash", "sort", "search", "binary", "dynamic programming", "recursion",
  "two pointer", "sliding window", "backtracking", "greedy", "bfs", "dfs",
  
  // System Design & Architecture
  "system design", "architecture", "scal", "microservice", "database", 
  "sql", "nosql", "cache", "load balanc", "api", "rest", "graphql", "cap theorem",
  
  // Web & Tech Stack
  "frontend", "backend", "fullstack", "web", "app", "devops", "cloud", 
  "javascript", "js", "python", "java", "c++", "cpp", "c#", "go", "rust", 
  "typescript", "react", "node", "express", "angular", "vue", "spring",
  "html", "css", "git", "github", "linux", "docker", "kubernetes", "aws",
  
  // Aptitude
  "aptitude", "math", "puzzle", "logic", "quant", "reasoning", "probab",
  
  // PrepPilot Specific
  "preppilot", "platform", "hello", "hi", "hey", "help", "guide"
];

const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

const escapedKeywords = domainKeywords.map(escapeRegExp);
// Anchor keywords as prefixes: keep the leading word boundary but drop the
// trailing one. A trailing \b made prefix keywords (scal, load balanc,
// negotiat, probab, math, quant) and keywords ending in non-word characters
// (c++, c#) never match — "probability", "load balancing", "C++?" etc. were
// misclassified as off-topic. Prefix matching over-routes a few extra words
// (e.g. "google" matching "go"), which is acceptable for an AI mentor router.
const keywordRegex = new RegExp(`\\b(${escapedKeywords.join('|')})`, 'i');

const conversationalRegex = /^(hi|hello|hey|yo|ok|thanks|thank you|who are you|what should i call you|good morning|good evening|\?)$/i;

const contextualAcknowledgements = [
  "yes", "yeah", "yep", "sure", "ok", "okay", "fine", "continue", "go on", "sounds good", "let's do it", "lets do it", "proceed", "no"
];
const contextualRegex = new RegExp(`^(${contextualAcknowledgements.join('|')})$`, 'i');

/**
 * Checks if the user's prompt is a short contextual reply to the assistant's previous question.
 * @param {string} prompt 
 * @param {Array} history 
 * @returns {boolean} true if contextual
 */
const isContextualResponse = (prompt, history) => {
  if (!prompt || typeof prompt !== 'string') return false;
  const trimmed = prompt.trim();
  
  if (contextualRegex.test(trimmed)) {
    // Only contextual if there's a previous assistant message
    if (history && history.length > 1) {
      const lastMessage = history[history.length - 2];
      if (lastMessage && lastMessage.role === "model") {
        return true;
      }
    }
  }
  return false;
};

/**
 * Checks if the user's prompt is broadly related to the PrepPilot domain.
 * @param {string} prompt 
 * @returns {boolean} true if related, false otherwise
 */
const isPrepPilotDomain = (prompt) => {
  if (!prompt || typeof prompt !== 'string') return false;
  const trimmed = prompt.trim();
  if (conversationalRegex.test(trimmed)) return true;
  return keywordRegex.test(prompt);
};

module.exports = { isPrepPilotDomain, isContextualResponse, domainKeywords };
