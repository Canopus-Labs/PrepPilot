import { describe, it, expect } from "vitest";
const {
  applyStreakForActivity,
  getUTCDayDifference,
} = require("../utils/streakTracker");

describe("streakTracker — applyStreakForActivity", () => {
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);

  it("unlocks 3-Day Streak at day 3", () => {
    const user = {
      currentStreak: 2,
      longestStreak: 2,
      lastPracticeDate: yesterday,
      unlockedAchievements: [],
    };

    const newlyUnlocked = applyStreakForActivity(user);

    expect(user.currentStreak).toBe(3);
    expect(newlyUnlocked).toContain("3-Day Streak");
    expect(user.unlockedAchievements).toContain("3-Day Streak");
  });

  it("unlocks 7-Day Streak at day 7", () => {
    const user = {
      currentStreak: 6,
      longestStreak: 6,
      lastPracticeDate: yesterday,
      unlockedAchievements: ["3-Day Streak"],
    };

    const newlyUnlocked = applyStreakForActivity(user);

    expect(user.currentStreak).toBe(7);
    expect(newlyUnlocked).toEqual(["7-Day Streak"]);
    expect(user.unlockedAchievements).toContain("7-Day Streak");
  });

  it("does not prematurely unlock 14-Day Streak at day 13", () => {
    const user = {
      currentStreak: 12,
      longestStreak: 12,
      lastPracticeDate: yesterday,
      unlockedAchievements: ["3-Day Streak", "7-Day Streak"],
    };

    const newlyUnlocked = applyStreakForActivity(user);

    expect(user.currentStreak).toBe(13);
    expect(newlyUnlocked).not.toContain("14-Day Streak");
    expect(user.unlockedAchievements).not.toContain("14-Day Streak");
  });

  it("unlocks 14-Day Streak at day 14 (#2290)", () => {
    const user = {
      currentStreak: 13,
      longestStreak: 13,
      lastPracticeDate: yesterday,
      unlockedAchievements: ["3-Day Streak", "7-Day Streak"],
    };

    const newlyUnlocked = applyStreakForActivity(user);

    expect(user.currentStreak).toBe(14);
    expect(newlyUnlocked).toEqual(["14-Day Streak"]);
    expect(user.unlockedAchievements).toContain("14-Day Streak");
  });

  it("unlocks 30-Day Streak at day 30", () => {
    const user = {
      currentStreak: 29,
      longestStreak: 29,
      lastPracticeDate: yesterday,
      unlockedAchievements: ["3-Day Streak", "7-Day Streak", "14-Day Streak"],
    };

    const newlyUnlocked = applyStreakForActivity(user);

    expect(user.currentStreak).toBe(30);
    expect(newlyUnlocked).toEqual(["30-Day Streak"]);
    expect(user.unlockedAchievements).toContain("30-Day Streak");
  });

  it("does not return duplicate achievements if already unlocked", () => {
    const user = {
      currentStreak: 13,
      longestStreak: 13,
      lastPracticeDate: yesterday,
      unlockedAchievements: [
        "3-Day Streak",
        "7-Day Streak",
        "14-Day Streak",
      ],
    };

    const newlyUnlocked = applyStreakForActivity(user);

    expect(user.currentStreak).toBe(14);
    expect(newlyUnlocked).toEqual([]);
  });
});

describe("streakTracker — getUTCDayDifference", () => {
  it("calculates exact UTC day difference between dates", () => {
    const d1 = new Date("2026-08-01T10:00:00Z");
    const d2 = new Date("2026-08-02T15:00:00Z");
    expect(getUTCDayDifference(d1, d2)).toBe(1);
  });
});
