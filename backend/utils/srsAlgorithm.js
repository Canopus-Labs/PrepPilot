/**
 * Helper to get UTC time for midnight in a specific timezone
 */
function getMidnightInTimezone(date, addDays, timeZone) {
  const tz = timeZone || "UTC";

  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  });

  const parts = formatter.formatToParts(date);
  const getPart = (type) => parseInt(parts.find((p) => p.type === type).value, 10);

  const year = getPart("year");
  const month = getPart("month") - 1; // 0-indexed
  const day = getPart("day");

  // Local target date (midnight of target day)
  const targetDate = new Date(year, month, day + addDays, 0, 0, 0);

  // Find the exact UTC time that matches this local date in the target timezone
  let guess = new Date(Date.UTC(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate(), 0, 0, 0));

  for (let i = 0; i < 3; i++) {
    const guessStr = guess.toLocaleString("en-US", { timeZone: tz, hour12: false });
    const guessLocal = new Date(guessStr);
    const diff = targetDate.getTime() - guessLocal.getTime();
    if (diff === 0) break;
    guess = new Date(guess.getTime() + diff);
  }

  return guess;
}

/**
 * SuperMemo SM-2 Algorithm helper
 * Returns updated { interval, repetition, efactor, dueDate }
 */
const calculateSM2 = ({ interval = 0, repetition = 0, efactor = 2.5 }, rating, timezone = "UTC") => {
  let score = 3;
  if (rating === "again" || rating === "1") score = 1;
  else if (rating === "hard" || rating === "2") score = 2;
  else if (rating === "medium" || rating === "good" || rating === "3") score = 4;
  else if (rating === "easy" || rating === "4") score = 5;

  let newRepetition = repetition;
  let newInterval = interval;
  let newEFactor = efactor;

  if (score < 3) {
    // Failed recall (Again / Hard)
    if (score === 1) {
      newRepetition = 0;
      newInterval = 1;
    } else {
      // Hard: keep or slight progression
      newRepetition = repetition > 0 ? repetition : 1;
      newInterval = repetition <= 1 ? 1 : Math.max(1, Math.round(interval * 1.2));
    }
  } else {
    // Successful recall (Medium / Easy)
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

  // Update Ease Factor (EF' = EF + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02)))
  const q = score;
  newEFactor = newEFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02));
  if (newEFactor < 1.3) newEFactor = 1.3;
  newEFactor = Math.round(newEFactor * 100 + Number.EPSILON) / 100;

  const now = new Date();
  
  let nextDueDate;
  try {
    nextDueDate = getMidnightInTimezone(now, newInterval, timezone);
  } catch (error) {
    // Fallback if timezone is invalid
    nextDueDate = new Date(now.getTime() + newInterval * 24 * 60 * 60 * 1000);
  }

  return {
    interval: newInterval,
    repetition: newRepetition,
    efactor: newEFactor,
    dueDate: nextDueDate,
  };
};

module.exports = { calculateSM2, getMidnightInTimezone };
