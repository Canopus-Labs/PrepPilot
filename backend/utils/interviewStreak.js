const MILESTONE_BADGES = ['3 days', '7 days', '30 days'];

const parseDateOnly = (value) => {
  if (!value || typeof value !== 'string') return null;

  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;

  return new Date(Date.UTC(year, month - 1, day));
};

const getInterviewStreakUpdate = (userData = {}, practiceDate) => {
  if (!practiceDate || typeof practiceDate !== 'string') {
    return {
      streak: Number(userData.interviewStreak || 0),
      longestStreak: Number(userData.longestInterviewStreak || 0),
      badges: Array.isArray(userData.interviewStreakBadges) ? userData.interviewStreakBadges : [],
      changed: false,
    };
  }

  const currentStreak = Number(userData.interviewStreak || 0);
  const longestStreak = Number(userData.longestInterviewStreak || 0);
  const badges = Array.isArray(userData.interviewStreakBadges) ? [...userData.interviewStreakBadges] : [];
  const lastPracticeDate = userData.interviewStreakLastPracticeDate;

  const today = parseDateOnly(practiceDate);
  const lastPractice = parseDateOnly(lastPracticeDate);
  const sameDay = Boolean(today && lastPractice && today.getTime() === lastPractice.getTime());

  let nextStreak = currentStreak;
  let changed = false;

  if (!sameDay) {
    if (lastPractice && today) {
      const diffDays = Math.round((today.getTime() - lastPractice.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) {
        nextStreak = currentStreak + 1;
      } else {
        nextStreak = 1;
      }
    } else {
      nextStreak = 1;
    }

    changed = true;
  }

  const nextLongest = Math.max(longestStreak, nextStreak);
  const nextBadges = [...badges];

  for (const milestone of MILESTONE_BADGES) {
    const threshold = Number(milestone.split(' ')[0]);
    if (nextLongest >= threshold && !nextBadges.includes(milestone)) {
      nextBadges.push(milestone);
    }
  }

  return {
    streak: nextStreak,
    longestStreak: nextLongest,
    badges: nextBadges,
    changed,
  };
};

module.exports = { getInterviewStreakUpdate, MILESTONE_BADGES };
