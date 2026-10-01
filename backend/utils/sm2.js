// SuperMemo-2 Spaced Repetition Algorithm

/**
 * Calculates the next state for a flashcard based on SM-2.
 * 
 * @param {number} quality - User's grade (0-5).
 * @param {number} repetitions - Current repetitions.
 * @param {number} easinessFactor - Current easiness factor.
 * @param {number} interval - Current interval (in days).
 * @returns {Object} New state containing updated repetitions, easinessFactor, interval, and nextReviewDate.
 */
function calculateSM2(quality, repetitions, easinessFactor, interval) {
  let newRepetitions = repetitions;
  let newEasinessFactor = easinessFactor;
  let newInterval = interval;

  if (quality >= 3) {
    if (repetitions === 0) {
      newInterval = 1;
    } else if (repetitions === 1) {
      newInterval = 6;
    } else {
      newInterval = Math.round(interval * easinessFactor);
    }
    newRepetitions += 1;
  } else {
    newRepetitions = 0;
    newInterval = 1;
  }

  // Update easiness factor
  newEasinessFactor = easinessFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (newEasinessFactor < 1.3) newEasinessFactor = 1.3;

  // Calculate next review date
  const nextReviewDate = new Date();
  nextReviewDate.setDate(nextReviewDate.getDate() + newInterval);

  return {
    repetitions: newRepetitions,
    easinessFactor: newEasinessFactor,
    interval: newInterval,
    nextReviewDate,
  };
}

module.exports = { calculateSM2 };
