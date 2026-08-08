/**
 * SuperMemo SM-2 (Space Repetition) Algorithm Utility
 *
 * Reference: https://www.supermemo.com/en/archives1990-2015/english/ol/sm2
 *
 * The SM-2 algorithm calculates the optimal interval at which to review
 * a flashcard based on the user's self-rated quality of recall.
 *
 * Rating scale:
 *   1 - Complete blackout, wrong answer (again)
 *   2 - Incorrect, but upon seeing correct answer it felt familiar (hard)
 *   3 - Correct with serious difficulty (good)
 *   4 - Correct with some hesitation (easy)
 *   5 - Perfect response (easy)
 *
 * Accepts both numeric (1-5) and named ('again', 'hard', 'good', 'easy')
 * rating values.
 *
 * @param {object} params
 * @param {number} [params.interval=0]     - Previous review interval in days.
 * @param {number} [params.repetition=0]  - Number of consecutive successful reviews.
 * @param {number} [params.efactor=2.5]   - Easiness Factor (EF), minimum 1.3.
 * @param {string|number} rating           - User rating: 'again','hard','good','easy' or 1-5.
 * @returns {{ interval: number, repetition: number, efactor: number, dueDate: Date }}
 */
function calculateSM2({ interval = 0, repetition = 0, efactor = 2.5 }, rating) {
  let score = 3;
  if (rating === "again" || rating === "1") score = 1;
  else if (rating === "hard" || rating === "2") score = 2;
  else if (rating === "medium" || rating === "good" || rating === "3") score = 4;
  else if (rating === "easy" || rating === "4") score = 5;

  let newRepetition = repetition;
  let newInterval = interval;
  let newEFactor = efactor;

  if (score < 3) {
    // Failed recall (Again / Hard): reset progress
    if (score === 1) {
      newRepetition = 0;
      newInterval = 1;
    } else {
      // Hard: retain some progress but reduce interval
      newRepetition = repetition > 0 ? repetition : 1;
      newInterval = repetition <= 1 ? 1 : Math.max(1, Math.round(interval * 1.2));
    }
  } else {
    // Successful recall (Medium / Easy): advance schedule
    if (repetition === 0) {
      newInterval = score === 5 ? 2 : 1;
    } else if (repetition === 1) {
      newInterval = score === 5 ? 7 : 6;
    } else {
      const multiplier = score === 5 ? newEFactor * 1.3 : newEFactor;
      newInterval = Math.max(1, Math.round(interval * multiplier));
    }
    newRepetition += 1;
  }

  // Update Easiness Factor: EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
  const q = score;
  newEFactor = newEFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (newEFactor < 1.3) newEFactor = 1.3;
  newEFactor = Math.round(newEFactor * 100 + Number.EPSILON) / 100;

  const now = new Date();
  const nextDueDate = new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000);

  return {
    interval: newInterval,
    repetition: newRepetition,
    efactor: newEFactor,
    dueDate: nextDueDate,
  };
}

module.exports = { calculateSM2 };
