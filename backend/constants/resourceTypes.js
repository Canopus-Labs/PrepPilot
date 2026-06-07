/**
 * Shared resource type constants for the Bookmark system.
 * Used by Bookmark model (enum validation) and bookmark controller (filtering).
 */
const RESOURCE_TYPES = {
  AI_QUESTION: "AI_QUESTION",
  DSA: "DSA",
  APTITUDE: "APTITUDE",
  BOOK: "BOOK",
  PROJECT: "PROJECT",
  INTERVIEW_EXPERIENCE: "INTERVIEW_EXPERIENCE",
};

const RESOURCE_TYPE_VALUES = Object.values(RESOURCE_TYPES);

module.exports = { RESOURCE_TYPES, RESOURCE_TYPE_VALUES };
