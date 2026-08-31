import { describe, it, expect } from 'vitest';
const { applyStreakForActivity, getUTCDayDifference, resetStreakIfMissed } = require('../utils/streakTracker');

describe('streakTracker', () => {
  describe('applyStreakForActivity', () => {
    it('unlocks 3-Day Streak when streak reaches 3', () => {
      const user = { currentStreak: 3, unlockedAchievements: [], lastPracticeDate: new Date() };
      const newlyUnlocked = applyStreakForActivity(user);
      expect(user.unlockedAchievements).toContain('3-Day Streak');
      expect(newlyUnlocked).toContain('3-Day Streak');
    });

    it('unlocks 7-Day Streak when streak reaches 7', () => {
      const user = { currentStreak: 7, unlockedAchievements: ['3-Day Streak'], lastPracticeDate: new Date() };
      const newlyUnlocked = applyStreakForActivity(user);
      expect(user.unlockedAchievements).toContain('7-Day Streak');
      expect(newlyUnlocked).toContain('7-Day Streak');
    });

    it('unlocks 14-Day Streak when streak reaches 14', () => {
      const user = { currentStreak: 14, unlockedAchievements: ['3-Day Streak', '7-Day Streak'], lastPracticeDate: new Date() };
      const newlyUnlocked = applyStreakForActivity(user);
      expect(user.unlockedAchievements).toContain('14-Day Streak');
      expect(newlyUnlocked).toContain('14-Day Streak');
    });

    it('unlocks 30-Day Streak when streak reaches 30', () => {
      const user = { currentStreak: 30, unlockedAchievements: ['3-Day Streak', '7-Day Streak', '14-Day Streak'], lastPracticeDate: new Date() };
      const newlyUnlocked = applyStreakForActivity(user);
      expect(user.unlockedAchievements).toContain('30-Day Streak');
      expect(newlyUnlocked).toContain('30-Day Streak');
    });

    it('does not duplicate already unlocked achievements', () => {
      const user = { currentStreak: 14, unlockedAchievements: ['3-Day Streak', '7-Day Streak', '14-Day Streak'], lastPracticeDate: new Date() };
      const newlyUnlocked = applyStreakForActivity(user);
      expect(newlyUnlocked).toEqual([]);
      expect(user.unlockedAchievements.filter((a) => a === '14-Day Streak').length).toBe(1);
    });
  });

  describe('getUTCDayDifference', () => {
    it('calculates exact day differences in UTC', () => {
      const d1 = new Date('2026-08-01T10:00:00Z');
      const d2 = new Date('2026-08-02T10:00:00Z');
      expect(getUTCDayDifference(d1, d2)).toBe(1);
    });
  });

  describe('resetStreakIfMissed', () => {
    it('resets streak if practice was missed for more than 1 day', () => {
      const pastDate = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
      const user = { lastPracticeDate: pastDate, currentStreak: 10 };
      const reset = resetStreakIfMissed(user);
      expect(reset).toBe(true);
      expect(user.currentStreak).toBe(0);
    });
  });
});
