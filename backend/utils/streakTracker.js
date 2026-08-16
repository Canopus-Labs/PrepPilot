const User = require("../models/User");

const STREAK_MILESTONES = [
  { days: 3, badge: "3-Day Streak" },
  { days: 7, badge: "7-Day Streak" },
  { days: 30, badge: "30-Day Streak" },
];

const getUTCDayDifference = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const utc1 = Date.UTC(d1.getUTCFullYear(), d1.getUTCMonth(), d1.getUTCDate());
  const utc2 = Date.UTC(d2.getUTCFullYear(), d2.getUTCMonth(), d2.getUTCDate());
  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
};

// Now returns the list of badges newly unlocked by THIS call, instead of nothing.
const applyStreakForActivity = (user) => {
  const now = new Date();
  const newlyUnlocked = [];

  if (!user.lastPracticeDate) {
    user.currentStreak = 1;
  } else {
    const diff = getUTCDayDifference(user.lastPracticeDate, now);
    if (diff === 1) {
      user.currentStreak += 1;
    } else if (diff > 1) {
      user.currentStreak = 1;
    }
  }

  user.lastPracticeDate = now;

  if (user.currentStreak > (user.longestStreak || 0)) {
    user.longestStreak = user.currentStreak;
  }

  for (const milestone of STREAK_MILESTONES) {
    if (
      user.currentStreak >= milestone.days &&
      !user.unlockedAchievements.includes(milestone.badge)
    ) {
      user.unlockedAchievements.push(milestone.badge);
      newlyUnlocked.push(milestone.badge);
    }
  }

  return newlyUnlocked;
};

const resetStreakIfMissed = (user) => {
  if (user.lastPracticeDate && user.currentStreak > 0) {
    const diff = getUTCDayDifference(user.lastPracticeDate, new Date());
    if (diff > 1) {
      user.currentStreak = 0;
      return true;
    }
  }
  return false;
};

// BREAKING CHANGE: now resolves to { user, newlyUnlockedMilestones } instead of
// just `user`. Every caller of recordActivity() needs a small update — see below.
const recordActivity = async (userId, mongooseSession = null) => {
  const query = User.findById(userId);
  if (mongooseSession) query.session(mongooseSession);
  const user = await query;
  if (!user) return null;

  if (user.lastPracticeDate) {
    const diff = getUTCDayDifference(user.lastPracticeDate, new Date());
    if (diff === 0) return { user, newlyUnlockedMilestones: [] };
  }

  const newlyUnlockedMilestones = applyStreakForActivity(user);
  await user.save(mongooseSession ? { session: mongooseSession } : undefined);
  return { user, newlyUnlockedMilestones };
};

module.exports = {
  getUTCDayDifference,
  applyStreakForActivity,
  resetStreakIfMissed,
  recordActivity,
};