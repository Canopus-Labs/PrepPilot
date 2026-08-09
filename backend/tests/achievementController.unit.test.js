import { describe, it, expect, vi, beforeEach } from 'vitest';

const User = require('../models/User');
const { getAchievements, saveAchievements } = require('../controllers/achievementController');

const VALID_USER_ID = '507f1f77bcf86cd799439011';

beforeEach(() => {
  vi.restoreAllMocks();
  User.findById = vi.fn();
  User.findByIdAndUpdate = vi.fn();
});

function makeReq(body = {}) {
  return {
    user: { _id: VALID_USER_ID },
    body,
  };
}

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe('achievementController', () => {
  describe('getAchievements', () => {
    it('returns 404 if user is not found', async () => {
      User.findById.mockReturnValue({
        select: vi.fn().mockResolvedValue(null),
      });

      const req = makeReq();
      const res = makeRes();

      await getAchievements(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ success: false, error: 'User not found' });
    });

    it('returns user achievements and resets streak if diffDays > 1', async () => {
      const mockUser = {
        _id: VALID_USER_ID,
        unlockedAchievements: ['First Interview'],
        lastPracticeDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
        currentStreak: 5,
        save: vi.fn().mockResolvedValue(true),
      };

      User.findById.mockReturnValue({
        select: vi.fn().mockResolvedValue(mockUser),
      });

      const req = makeReq();
      const res = makeRes();

      await getAchievements(req, res);

      expect(mockUser.currentStreak).toBe(0);
      expect(mockUser.save).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        unlockedAchievements: ['First Interview'],
      });
    });

    it('does not reset streak if last practice was within 1 day', async () => {
      const mockUser = {
        _id: VALID_USER_ID,
        unlockedAchievements: ['Interview Pro'],
        lastPracticeDate: new Date(), // today
        currentStreak: 5,
        save: vi.fn().mockResolvedValue(true),
      };

      User.findById.mockReturnValue({
        select: vi.fn().mockResolvedValue(mockUser),
      });

      const req = makeReq();
      const res = makeRes();

      await getAchievements(req, res);

      expect(mockUser.currentStreak).toBe(5);
      expect(mockUser.save).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({
        success: true,
        unlockedAchievements: ['Interview Pro'],
      });
    });

    it('returns 500 when database error occurs', async () => {
      User.findById.mockReturnValue({
        select: vi.fn().mockRejectedValue(new Error('DB Error')),
      });

      const req = makeReq();
      const res = makeRes();

      await getAchievements(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, error: 'A server error occurred' });
    });
  });

  describe('saveAchievements', () => {
    it('returns 400 if unlockedAchievements is missing or not an array', async () => {
      const req = makeReq({ unlockedAchievements: 'First Interview' });
      const res = makeRes();

      await saveAchievements(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'unlockedAchievements must be a valid array',
      });
    });

    it('returns 400 if unlockedAchievements contains invalid IDs', async () => {
      const req = makeReq({ unlockedAchievements: ['Invalid Achievement'] });
      const res = makeRes();

      await saveAchievements(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        success: false,
        error: 'Unknown achievement ID(s): Invalid Achievement',
      });
    });

    it('successfully saves achievements for a valid request', async () => {
      User.findByIdAndUpdate.mockResolvedValue({});

      const req = makeReq({ unlockedAchievements: ['First Interview', 'Interview Pro'] });
      const res = makeRes();

      await saveAchievements(req, res);

      expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
        VALID_USER_ID,
        { $addToSet: { unlockedAchievements: { $each: ['First Interview', 'Interview Pro'] } } }
      );
      expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('returns 500 when database error occurs during save', async () => {
      User.findByIdAndUpdate.mockRejectedValue(new Error('DB Error'));

      const req = makeReq({ unlockedAchievements: ['First Interview'] });
      const res = makeRes();

      await saveAchievements(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ success: false, error: 'A server error occurred' });
    });
  });
});
