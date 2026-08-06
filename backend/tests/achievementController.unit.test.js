import { describe, it, expect, vi, beforeEach } from 'vitest';
import Module from 'module';

// ---------------------------------------------------------------------------
// CJS controllers load their deps via require(), which vi.mock cannot
// intercept. We stub the models at the require level with a Module._load
// shim instead, so no live DB is needed.
// ---------------------------------------------------------------------------

const modelMocks = {};

const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request in modelMocks) return modelMocks[request];
  return originalLoad.apply(this, arguments);
};

const mockFindById = vi.fn();
const mockFindByIdAndUpdate = vi.fn();
const mockSessionCount = vi.fn();
const mockResumeCount = vi.fn();
const mockSheetCount = vi.fn();

modelMocks['../models/User'] = {
  findById: (...args) => mockFindById(...args),
  findByIdAndUpdate: (...args) => mockFindByIdAndUpdate(...args),
};
modelMocks['../models/Session'] = {
  countDocuments: (...args) => mockSessionCount(...args),
};
modelMocks['../models/Resume'] = {
  countDocuments: (...args) => mockResumeCount(...args),
};
modelMocks['../models/UserSheetProgress'] = {
  countDocuments: (...args) => mockSheetCount(...args),
};

const { getAchievements, saveAchievements } = require('../controllers/achievementController');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeReq(body = {}, userId = 'user-123') {
  return { body, user: { _id: userId } };
}

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

const ALL_IDS = [
  'First Interview',
  'Interview Pro',
  'Interview Master',
  'Resume Builder',
  'Resume Expert',
  'DSA Beginner',
  'DSA Master',
];

beforeEach(() => {
  mockFindById.mockReset();
  mockFindByIdAndUpdate.mockReset();
  mockSessionCount.mockReset();
  mockResumeCount.mockReset();
  mockSheetCount.mockReset();
});

// ---------------------------------------------------------------------------
// getAchievements
// ---------------------------------------------------------------------------

describe('getAchievements', () => {
  it('returns the user unlockedAchievements on success', async () => {
    mockFindById.mockReturnValue({
      select: vi.fn().mockResolvedValue({ unlockedAchievements: ['First Interview'] }),
    });
    const res = makeRes();
    await getAchievements(makeReq(), res);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      unlockedAchievements: ['First Interview'],
    });
  });

  it('returns 404 when user is not found', async () => {
    mockFindById.mockReturnValue({ select: vi.fn().mockResolvedValue(null) });
    const res = makeRes();
    await getAchievements(makeReq(), res);
    expect(res.status).toHaveBeenCalledWith(404);
  });

  it('returns 500 on a database error', async () => {
    mockFindById.mockReturnValue({ select: vi.fn().mockRejectedValue(new Error('DB down')) });
    const res = makeRes();
    await getAchievements(makeReq(), res);
    expect(res.status).toHaveBeenCalledWith(500);
  });
});

// ---------------------------------------------------------------------------
// saveAchievements — input validation
// ---------------------------------------------------------------------------

describe('saveAchievements — input validation', () => {
  it('returns 400 when unlockedAchievements is missing', async () => {
    const res = makeRes();
    await saveAchievements(makeReq({}), res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false }),
    );
  });

  it('returns 400 when unlockedAchievements is not an array', async () => {
    const res = makeRes();
    await saveAchievements(makeReq({ unlockedAchievements: 'First Interview' }), res);
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('returns 400 when an unknown achievement ID is submitted', async () => {
    const res = makeRes();
    await saveAchievements(
      makeReq({ unlockedAchievements: ['First Interview', 'FAKE_ACHIEVEMENT'] }),
      res,
    );
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ success: false, error: expect.stringContaining('FAKE_ACHIEVEMENT') }),
    );
  });

  it('returns 400 when every achievement ID plus an injected badge is force-submitted', async () => {
    const res = makeRes();
    await saveAchievements(makeReq({ unlockedAchievements: [...ALL_IDS, 'INJECTED_SUPER_BADGE'] }), res);
    expect(res.status).toHaveBeenCalledWith(400);
  });
});

// ---------------------------------------------------------------------------
// saveAchievements — server-side earn-condition verification
// ---------------------------------------------------------------------------

describe('saveAchievements — server-side verification', () => {
  it('grants only achievements whose earn condition is met by real data', async () => {
    // 1 interview session, no resumes, no followed sheets
    mockSessionCount.mockResolvedValue(1);
    mockResumeCount.mockResolvedValue(0);
    mockSheetCount.mockResolvedValue(0);

    const res = makeRes();
    await saveAchievements(makeReq({ unlockedAchievements: ALL_IDS }), res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      granted: ['First Interview'],
      rejected: ALL_IDS.filter((id) => id !== 'First Interview'),
    });
    expect(mockFindByIdAndUpdate).toHaveBeenCalledWith(
      'user-123',
      { $addToSet: { unlockedAchievements: { $each: ['First Interview'] } } },
    );
  });

  it('persists nothing when no claimed achievement is earned', async () => {
    mockSessionCount.mockResolvedValue(0);
    mockResumeCount.mockResolvedValue(0);
    mockSheetCount.mockResolvedValue(0);

    const res = makeRes();
    await saveAchievements(makeReq({ unlockedAchievements: ['DSA Master'] }), res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      granted: [],
      rejected: ['DSA Master'],
    });
    expect(mockFindByIdAndUpdate).not.toHaveBeenCalled();
  });

  it('grants the full set at the threshold boundary', async () => {
    mockSessionCount.mockResolvedValue(25);
    mockResumeCount.mockResolvedValue(5);
    mockSheetCount.mockResolvedValue(5);

    const res = makeRes();
    await saveAchievements(makeReq({ unlockedAchievements: ALL_IDS }), res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      granted: ALL_IDS,
      rejected: [],
    });
  });

  it('uses $addToSet so existing achievements are never removed', async () => {
    mockSessionCount.mockResolvedValue(1);
    mockResumeCount.mockResolvedValue(0);
    mockSheetCount.mockResolvedValue(0);

    const res = makeRes();
    await saveAchievements(makeReq({ unlockedAchievements: ['First Interview'] }), res);

    const [, update] = mockFindByIdAndUpdate.mock.calls[0];
    expect(update).toHaveProperty('$addToSet');
    expect(update).not.toHaveProperty('unlockedAchievements');
  });

  it('succeeds with an empty array without touching the DB', async () => {
    mockSessionCount.mockResolvedValue(0);
    mockResumeCount.mockResolvedValue(0);
    mockSheetCount.mockResolvedValue(0);

    const res = makeRes();
    await saveAchievements(makeReq({ unlockedAchievements: [] }), res);

    expect(mockFindByIdAndUpdate).not.toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({ success: true, granted: [], rejected: [] });
  });

  it('returns 500 on a database error', async () => {
    mockSessionCount.mockRejectedValue(new Error('DB error'));

    const res = makeRes();
    await saveAchievements(makeReq({ unlockedAchievements: ['First Interview'] }), res);

    expect(res.status).toHaveBeenCalledWith(500);
  });
});
