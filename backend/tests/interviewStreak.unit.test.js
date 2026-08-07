import { describe, it, expect } from 'vitest';
import { getInterviewStreakUpdate } from '../utils/interviewStreak';

describe('interview streak tracking', () => {
  it('starts a new streak on the first practice day', () => {
    const result = getInterviewStreakUpdate({
      interviewStreak: 0,
      longestInterviewStreak: 0,
      interviewStreakBadges: [],
      interviewStreakLastPracticeDate: null,
    }, '2026-08-01');

    expect(result.streak).toBe(1);
    expect(result.longestStreak).toBe(1);
    expect(result.badges).toEqual([]);
    expect(result.changed).toBe(true);
  });

  it('increments the streak on consecutive practice days', () => {
    const result = getInterviewStreakUpdate({
      interviewStreak: 1,
      longestInterviewStreak: 1,
      interviewStreakBadges: [],
      interviewStreakLastPracticeDate: '2026-07-31',
    }, '2026-08-01');

    expect(result.streak).toBe(2);
    expect(result.longestStreak).toBe(2);
    expect(result.changed).toBe(true);
  });

  it('resets the streak after missing a day', () => {
    const result = getInterviewStreakUpdate({
      interviewStreak: 2,
      longestInterviewStreak: 2,
      interviewStreakBadges: [],
      interviewStreakLastPracticeDate: '2026-07-29',
    }, '2026-08-01');

    expect(result.streak).toBe(1);
    expect(result.longestStreak).toBe(2);
    expect(result.changed).toBe(true);
  });

  it('unlocks milestone badges at 3, 7 and 30 days', () => {
    const threeDayResult = getInterviewStreakUpdate({
      interviewStreak: 2,
      longestInterviewStreak: 2,
      interviewStreakBadges: [],
      interviewStreakLastPracticeDate: '2026-07-30',
    }, '2026-07-31');

    const sevenDayResult = getInterviewStreakUpdate({
      interviewStreak: 6,
      longestInterviewStreak: 6,
      interviewStreakBadges: ['3 days'],
      interviewStreakLastPracticeDate: '2026-07-30',
    }, '2026-07-31');

    const thirtyDayResult = getInterviewStreakUpdate({
      interviewStreak: 29,
      longestInterviewStreak: 29,
      interviewStreakBadges: ['3 days', '7 days'],
      interviewStreakLastPracticeDate: '2026-07-31',
    }, '2026-08-01');

    expect(threeDayResult.badges).toEqual(['3 days']);
    expect(sevenDayResult.badges).toEqual(['3 days', '7 days']);
    expect(thirtyDayResult.badges).toEqual(['3 days', '7 days', '30 days']);
  });

  it('does not increment twice for duplicate practice on the same day', () => {
    const result = getInterviewStreakUpdate({
      interviewStreak: 3,
      longestInterviewStreak: 3,
      interviewStreakBadges: ['3 days'],
      interviewStreakLastPracticeDate: '2026-08-01',
    }, '2026-08-01');

    expect(result.streak).toBe(3);
    expect(result.longestStreak).toBe(3);
    expect(result.badges).toEqual(['3 days']);
    expect(result.changed).toBe(false);
  });

  it('updates the longest streak when a new peak is reached', () => {
    const result = getInterviewStreakUpdate({
      interviewStreak: 4,
      longestInterviewStreak: 4,
      interviewStreakBadges: ['3 days'],
      interviewStreakLastPracticeDate: '2026-07-30',
    }, '2026-07-31');

    expect(result.streak).toBe(5);
    expect(result.longestStreak).toBe(5);
  });
});
