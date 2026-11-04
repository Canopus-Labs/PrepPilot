
"use strict";

// Single source of truth for valid achievement titles.
const VALID_ACHIEVEMENTS = new Set([
  "First Interview",
  "Interview Pro",
  "Interview Master",
  "Resume Builder",
  "Resume Expert",
  "DSA Beginner",
  "DSA Master",
  "3-Day Streak",
  "7-Day Streak",
  "14-Day Streak",
  "30-Day Streak",
]);

/**
 * Check whether an achievement title is valid.
 * @param {string} title
 * @returns {boolean}
 */
const isValidAchievement = (title) => {
  return (
    typeof title === "string" &&
    VALID_ACHIEVEMENTS.has(title.trim())
  );
};

module.exports = {
  VALID_ACHIEVEMENTS,
  isValidAchievement,
};
