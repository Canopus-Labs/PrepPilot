import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { requireModerator } from "../middlewares/authMiddleware.js";

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("requireModerator", () => {
  const previous = process.env.MODERATOR_EMAILS;

  beforeEach(() => {
    process.env.MODERATOR_EMAILS = "mods@preppilot.dev, other@example.com";
  });

  afterEach(() => {
    if (previous === undefined) {
      delete process.env.MODERATOR_EMAILS;
    } else {
      process.env.MODERATOR_EMAILS = previous;
    }
  });

  it("allows listed moderator emails", () => {
    const req = { user: { email: "Mods@PrepPilot.dev" } };
    const res = makeRes();
    const next = vi.fn();

    requireModerator(req, res, next);

    expect(next).toHaveBeenCalledOnce();
    expect(res.status).not.toHaveBeenCalled();
  });

  it("rejects authenticated non-moderators with 403", () => {
    const req = { user: { email: "user@example.com" } };
    const res = makeRes();
    const next = vi.fn();

    requireModerator(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
  });

  it("rejects when MODERATOR_EMAILS is unset", () => {
    delete process.env.MODERATOR_EMAILS;
    const req = { user: { email: "mods@preppilot.dev" } };
    const res = makeRes();
    const next = vi.fn();

    requireModerator(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(403);
  });
});
