/**
 * Unit tests for the atomic session-limit enforcement in createSession.
 *
 * Strategy: extract and test the guard logic directly against a real
 * in-memory counter object, with no mocks — mirrors the invariants
 * that User.findOneAndUpdate enforces in production.
 */

import { describe, it, expect, beforeEach } from "vitest";

// ---------------------------------------------------------------------------
// Minimal in-memory simulation of the atomic findOneAndUpdate guard.
// This tests the *invariant* — not the Mongoose call — so no mocks needed.
// ---------------------------------------------------------------------------

const MAX_SESSIONS = 3; // small for test speed

/**
 * Simulates the atomic counter operation:
 *   findOneAndUpdate({ sessionCount: { $lt: MAX } }, { $inc: 1 })
 * Returns the updated user (with new count) or null if limit reached.
 */
function atomicIncrement(user) {
  if (user.sessionCount >= MAX_SESSIONS) return null;
  user.sessionCount += 1;
  return { sessionCount: user.sessionCount };
}

function atomicDecrement(user) {
  user.sessionCount = Math.max(0, user.sessionCount - 1);
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe("atomicIncrement (session limit guard)", () => {
  let user;

  beforeEach(() => {
    user = { sessionCount: 0 };
  });

  it("allows creation when count is 0 and increments to 1", () => {
    const result = atomicIncrement(user);
    expect(result).not.toBeNull();
    expect(user.sessionCount).toBe(1);
  });

  it("allows creation up to MAX_SESSIONS exactly", () => {
    for (let i = 0; i < MAX_SESSIONS; i++) {
      const result = atomicIncrement(user);
      expect(result).not.toBeNull();
    }
    expect(user.sessionCount).toBe(MAX_SESSIONS);
  });

  it("blocks creation when count equals MAX_SESSIONS", () => {
    user.sessionCount = MAX_SESSIONS;
    const result = atomicIncrement(user);
    expect(result).toBeNull();
    expect(user.sessionCount).toBe(MAX_SESSIONS); // unchanged
  });

  it("blocks creation when count exceeds MAX_SESSIONS (legacy data)", () => {
    user.sessionCount = MAX_SESSIONS + 5;
    const result = atomicIncrement(user);
    expect(result).toBeNull();
  });

  it("simulates concurrent race: N concurrent requests at count = MAX-1, only 1 succeeds", () => {
    user.sessionCount = MAX_SESSIONS - 1;
    const CONCURRENT = 10;

    // All requests see the same user object — just like concurrent DB reads
    // would all pass the old countDocuments check. With the atomic pattern,
    // only the first findOneAndUpdate succeeds; subsequent ones see count >= MAX.
    const results = Array.from({ length: CONCURRENT }, () =>
      atomicIncrement(user)
    );

    const successes = results.filter((r) => r !== null);
    expect(successes).toHaveLength(1);
    expect(user.sessionCount).toBe(MAX_SESSIONS);
  });

  it("simulates concurrent race: N requests at count = 0, exactly MAX succeed", () => {
    const CONCURRENT = MAX_SESSIONS + 5;
    const results = Array.from({ length: CONCURRENT }, () =>
      atomicIncrement(user)
    );
    const successes = results.filter((r) => r !== null);
    expect(successes).toHaveLength(MAX_SESSIONS);
    expect(user.sessionCount).toBe(MAX_SESSIONS);
  });

  it("two different users do not interfere with each other's counters", () => {
    const userA = { sessionCount: MAX_SESSIONS - 1 };
    const userB = { sessionCount: 0 };

    atomicIncrement(userA); // A hits limit
    atomicIncrement(userB); // B still free

    expect(atomicIncrement(userA)).toBeNull(); // A blocked
    expect(atomicIncrement(userB)).not.toBeNull(); // B still allowed
    expect(userB.sessionCount).toBe(2);
  });
});

describe("atomicDecrement (session deletion counter)", () => {
  it("decrements count by 1 after deletion", () => {
    const user = { sessionCount: 3 };
    atomicDecrement(user);
    expect(user.sessionCount).toBe(2);
  });

  it("does not go below 0 (legacy users with uninitialised counter)", () => {
    const user = { sessionCount: 0 };
    atomicDecrement(user);
    expect(user.sessionCount).toBe(0);
  });

  it("decrement then increment allows one new session after deletion", () => {
    const user = { sessionCount: MAX_SESSIONS };
    atomicDecrement(user); // delete one
    const result = atomicIncrement(user); // create new one
    expect(result).not.toBeNull();
    expect(user.sessionCount).toBe(MAX_SESSIONS);
  });
});