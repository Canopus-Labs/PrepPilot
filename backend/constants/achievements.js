// Single source of truth for all valid achievement IDs.
// Frontend derives display metadata (description) from the title;
// the backend only needs to know which titles are legitimate.

const VALID_ACHIEVEMENTS = new Set([
  "First Interview",
  "Interview Pro",
  "Interview Master",
  "Resume Builder",
  "Resume Expert",
  "DSA Beginner",
  "DSA Master",
]);

// Server-side earn conditions. An achievement is only persisted when the
// user's real data meets its threshold; the client never decides who earns
// what. `category` maps to a DB count for the current user:
//   sessions -> Interview Session count
//   resumes  -> Resume count
//   sheets   -> followed DSA sheets (UserSheetProgress.followed === true)
const ACHIEVEMENT_THRESHOLDS = {
  "First Interview": { category: "sessions", min: 1 },
  "Interview Pro": { category: "sessions", min: 5 },
  "Interview Master": { category: "sessions", min: 25 },
  "Resume Builder": { category: "resumes", min: 1 },
  "Resume Expert": { category: "resumes", min: 5 },
  "DSA Beginner": { category: "sheets", min: 1 },
  "DSA Master": { category: "sheets", min: 5 },
};

module.exports = { VALID_ACHIEVEMENTS, ACHIEVEMENT_THRESHOLDS };