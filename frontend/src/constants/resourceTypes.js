/**
 * Shared resource type constants for the Bookmark system.
 * Used by BookmarkButton, useBookmarks hook, and SavedItems page.
 */
export const RESOURCE_TYPES = {
  AI_QUESTION: "AI_QUESTION",
  DSA: "DSA",
  APTITUDE: "APTITUDE",
  BOOK: "BOOK",
  PROJECT: "PROJECT",
  INTERVIEW_EXPERIENCE: "INTERVIEW_EXPERIENCE",
};

export const RESOURCE_TYPE_VALUES = Object.values(RESOURCE_TYPES);

/** Human-readable labels for filter tabs and badges */
export const RESOURCE_TYPE_LABELS = {
  AI_QUESTION: "AI Questions",
  DSA: "DSA Questions",
  APTITUDE: "Aptitude Questions",
  BOOK: "Books",
  PROJECT: "Project Ideas",
  INTERVIEW_EXPERIENCE: "Interview Experiences",
};
