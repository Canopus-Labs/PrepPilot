import { describe, it, expect, vi, beforeEach } from 'vitest';
import Module from 'module';

// ---------------------------------------------------------------------------
// CJS controller mocks via Module._load shim (vi.mock cannot intercept the
// require() calls inside the CJS controller).
// ---------------------------------------------------------------------------

const modelMocks = {};

const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (request in modelMocks) return modelMocks[request];
  return originalLoad.apply(this, arguments);
};

const mockStartSession = vi.fn();
const mockSessionCount = vi.fn();
const mockSessionCreate = vi.fn();
const mockQuestionInsertMany = vi.fn();
const mockSessionCountFindOneAndUpdate = vi.fn();
const mockSessionFindOne = vi.fn();
const mockQuestionDeleteMany = vi.fn();
const mockSessionDeleteOne = vi.fn();
const mockSessionCountUpdateOne = vi.fn();
const mockUserFindById = vi.fn();

function makeFakeMongoSession() {
  return {
    withTransaction: async (fn) => fn(),
    endSession: vi.fn().mockResolvedValue(),
  };
}

modelMocks['mongoose'] = {
  startSession: (...args) => mockStartSession(...args),
};

modelMocks['../models/Session'] = {
  countDocuments: (...args) => mockSessionCount(...args),
  create: (...args) => mockSessionCreate(...args),
  findOne: (...args) => mockSessionFindOne(...args),
  deleteOne: (...args) => mockSessionDeleteOne(...args),
};

modelMocks['../models/Question'] = {
  insertMany: (...args) => mockQuestionInsertMany(...args),
  deleteMany: (...args) => mockQuestionDeleteMany(...args),
};

modelMocks['../models/SessionCount'] = {
  findOneAndUpdate: (...args) => mockSessionCountFindOneAndUpdate(...args),
  updateOne: (...args) => mockSessionCountUpdateOne(...args),
};

modelMocks['../models/User'] = {
  findById: (...args) => mockUserFindById(...args),
};

const { createSession, deleteSession } = require('../controllers/sessionController');

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

const VALID_BODY = {
  role: 'Backend Engineer',
  experience: '3',
  topicsToFocus: ['Node.js', 'Databases'],
  description: 'Prep',
  question: [{ question: 'Q', answer: 'A' }],
};

function countReturning(value) {
  return { session: vi.fn().mockResolvedValue(value) };
}

function makeCreatedSession() {
  const session = { _id: 'session-1', questions: [] };
  session.save = vi.fn().mockResolvedValue(session);
  return session;
}

function makeFakeUser() {
  return {
    currentStreak: 1,
    longestStreak: 0,
    unlockedAchievements: [],
    save: vi.fn().mockResolvedValue(),
  };
}

// The controller also updates the streak via User.findById(...).session().
function mockUserQuery() {
  mockUserFindById.mockReturnValue({
    session: vi.fn().mockResolvedValue(makeFakeUser()),
  });
}

beforeEach(() => {
  mockStartSession.mockReset();
  mockSessionCount.mockReset();
  mockSessionCreate.mockReset();
  mockQuestionInsertMany.mockReset();
  mockSessionCountFindOneAndUpdate.mockReset();
  mockSessionFindOne.mockReset();
  mockQuestionDeleteMany.mockReset();
  mockSessionDeleteOne.mockReset();
  mockSessionCountUpdateOne.mockReset();
  mockUserFindById.mockReset();

  mockStartSession.mockResolvedValue(makeFakeMongoSession());
});

describe('createSession — atomic session-limit guard (issue #1633)', () => {
  it('creates a session when the counter is below the limit', async () => {
    mockSessionCountFindOneAndUpdate.mockResolvedValue({ count: 50 }); // 49 -> 50
    const created = makeCreatedSession();
    mockSessionCreate.mockResolvedValue([created]);
    mockQuestionInsertMany.mockResolvedValue([{ _id: 'q1' }, { _id: 'q2' }]);
    mockUserQuery();

    const res = makeRes();
    await createSession(makeReq(VALID_BODY), res);

    expect(mockSessionCountFindOneAndUpdate).toHaveBeenCalledWith(
      { _id: 'user-123', count: { $lt: 50 } },
      { $inc: { count: 1 } },
      expect.objectContaining({ new: true }),
    );
    expect(mockSessionCreate).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('rejects with the limit message when the counter is already at the limit', async () => {
    mockSessionCountFindOneAndUpdate.mockResolvedValue(null); // counter at 50
    mockSessionCount.mockReturnValue(countReturning(50)); // real count at limit

    const res = makeRes();
    await createSession(makeReq(VALID_BODY), res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Maximum of 50 sessions reached.',
    });
    expect(mockSessionCreate).not.toHaveBeenCalled();
  });

  it('seeds the counter from the real count for legacy accounts below the limit', async () => {
    mockSessionCountFindOneAndUpdate
      .mockResolvedValueOnce(null) // no counter yet
      .mockResolvedValueOnce({ count: 4 }); // seeded 3 -> 4
    mockSessionCount.mockReturnValue(countReturning(3));

    const created = makeCreatedSession();
    mockSessionCreate.mockResolvedValue([created]);
    mockQuestionInsertMany.mockResolvedValue([]);
    mockUserQuery();

    const res = makeRes();
    await createSession(makeReq(VALID_BODY), res);

    expect(mockSessionCount).toHaveBeenCalledWith({ user: 'user-123' });
    expect(res.status).toHaveBeenCalledWith(201);
  });

  it('rejects a legacy account that is already at the limit', async () => {
    mockSessionCountFindOneAndUpdate.mockResolvedValue(null);
    mockSessionCount.mockReturnValue(countReturning(50));

    const res = makeRes();
    await createSession(makeReq(VALID_BODY), res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(mockSessionCreate).not.toHaveBeenCalled();
  });

  it('enforces the cap under concurrent creates (loser fails with the limit message)', async () => {
    // First caller wins the increment (49 -> 50); the concurrent loser then
    // sees the counter at the limit (findOneAndUpdate -> null) and the real
    // count at 50, so it aborts instead of inserting an over-limit session.
    mockSessionCountFindOneAndUpdate
      .mockResolvedValueOnce({ count: 50 })
      .mockResolvedValueOnce(null);
    mockSessionCount.mockReturnValue(countReturning(50));

    const created = makeCreatedSession();
    mockSessionCreate.mockResolvedValue([created]);
    mockQuestionInsertMany.mockResolvedValue([]);
    mockUserQuery();

    const res1 = makeRes();
    const res2 = makeRes();
    await Promise.all([
      createSession(makeReq(VALID_BODY), res1),
      createSession(makeReq(VALID_BODY), res2),
    ]);

    const statuses = [res1.status.mock.calls[0][0], res2.status.mock.calls[0][0]].sort();
    expect(statuses).toEqual([201, 400]);
    // Only the winning request inserts a session.
    expect(mockSessionCreate).toHaveBeenCalledTimes(1);
  });
});

describe('deleteSession — counter decrement', () => {
  it('decrements the user counter inside the transaction', async () => {
    mockSessionFindOne.mockReturnValue({
      session: vi.fn().mockResolvedValue({ _id: 'session-1' }),
    });
    mockQuestionDeleteMany.mockResolvedValue({ deletedCount: 2 });
    mockSessionDeleteOne.mockResolvedValue({ deletedCount: 1 });
    mockSessionCountUpdateOne.mockResolvedValue({ modifiedCount: 1 });

    const res = makeRes();
    await deleteSession(
      { params: { id: 'session-1' }, user: { _id: 'user-123' } },
      res,
    );

    expect(mockSessionCountUpdateOne).toHaveBeenCalledWith(
      { _id: 'user-123' },
      { $inc: { count: -1 } },
      expect.objectContaining({ session: expect.anything() }),
    );
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Session deleted successfully.',
    });
  });
});
