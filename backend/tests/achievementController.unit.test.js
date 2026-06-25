import { describe, it, expect, vi, beforeEach } from 'vitest';

// ---------------------------------------------------------------------------
// Inline mocks — no live DB needed.
// ---------------------------------------------------------------------------

const mockFindById = vi.fn();
const mockFindByIdAndUpdate = vi.fn();

vi.mock('../models/User.js', () => ({
    default: {
        findById: (...args) => mockFindById(...args),
        findByIdAndUpdate: (...args) => mockFindByIdAndUpdate(...args),
    },
}));

// Re-import after mocks are in place
const { getAchievements, saveAchievements } = await import('../controllers/achievementController.js');

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

// ---------------------------------------------------------------------------
// getAchievements
// ---------------------------------------------------------------------------

describe('getAchievements', () => {
    beforeEach(() => vi.clearAllMocks());

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
    beforeEach(() => vi.clearAllMocks());

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

    it('returns 400 when every achievement ID in the system is force-submitted', async () => {
        // Simulates the exact exploit described in the issue
        const allIds = [
            'First Interview', 'Interview Pro', 'Interview Master',
            'Resume Builder', 'Resume Expert', 'DSA Beginner', 'DSA Master',
            'INJECTED_SUPER_BADGE',
        ];
        const res = makeRes();
        await saveAchievements(makeReq({ unlockedAchievements: allIds }), res);
        expect(res.status).toHaveBeenCalledWith(400);
    });
});

// ---------------------------------------------------------------------------
// saveAchievements — additive-only semantics
// ---------------------------------------------------------------------------

describe('saveAchievements — additive-only semantics', () => {
    beforeEach(() => vi.clearAllMocks());

    it('uses $addToSet so existing achievements are never removed', async () => {
        mockFindByIdAndUpdate.mockResolvedValue({});
        const res = makeRes();
        await saveAchievements(
            makeReq({ unlockedAchievements: ['First Interview'] }),
            res,
        );
        const [, update] = mockFindByIdAndUpdate.mock.calls[0];
        expect(update).toHaveProperty('$addToSet');
        expect(update).not.toHaveProperty('unlockedAchievements'); // no wholesale replace
        expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('succeeds with an empty array without touching the DB', async () => {
        const res = makeRes();
        await saveAchievements(makeReq({ unlockedAchievements: [] }), res);
        // No unknown IDs, but nothing to add — still resolves successfully
        expect(res.json).toHaveBeenCalledWith({ success: true });
    });

    it('returns 500 on a database error', async () => {
        mockFindByIdAndUpdate.mockRejectedValue(new Error('DB error'));
        const res = makeRes();
        await saveAchievements(
            makeReq({ unlockedAchievements: ['First Interview'] }),
            res,
        );
        expect(res.status).toHaveBeenCalledWith(500);
    });
});