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

module.exports = { VALID_ACHIEVEMENTS };