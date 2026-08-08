import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("axios");

const axios = require("axios");
const {
  searchGitHub,
  searchCache,
  buildCacheKey,
  parseRateLimit,
  isRecoverableStatus,
} = require("../controllers/githubSearchController.js");

function makeReq(query = {}) {
  return { query };
}

function makeRes() {
  const res = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  return res;
}

describe("githubSearch helpers", () => {
  it("detects recoverable upstream statuses", () => {
    expect(isRecoverableStatus(403)).toBe(true);
    expect(isRecoverableStatus(429)).toBe(true);
    expect(isRecoverableStatus(503)).toBe(true);
    expect(isRecoverableStatus(400)).toBe(false);
  });

  it("parses rate-limit headers including retry-after", () => {
    const info = parseRateLimit({
      "x-ratelimit-remaining": "0",
      "x-ratelimit-limit": "10",
      "x-ratelimit-reset": "1700000000",
      "retry-after": "60",
    });

    expect(info.remaining).toBe(0);
    expect(info.limit).toBe(10);
    expect(info.retryAfterSeconds).toBe(60);
    expect(info.resetAt).toBe(new Date(1700000000 * 1000).toISOString());
  });
});

describe("searchGitHub controller", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    searchCache.flushAll();
  });

  it("caches successful repository searches", async () => {
    axios.get = vi.fn().mockResolvedValue({
      status: 200,
      headers: { "x-ratelimit-remaining": "9", "x-ratelimit-limit": "10" },
      data: { items: [{ id: 1, name: "repo" }], total_count: 1 },
    });

    const req = makeReq({
      type: "repositories",
      q: "good-first-issue",
      sort: "stars",
      order: "desc",
      per_page: 30,
    });
    const res = makeRes();

    await searchGitHub(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        success: true,
        stale: false,
        fromCache: false,
        items: [{ id: 1, name: "repo" }],
      }),
    );

    const key = buildCacheKey({
      type: "repositories",
      q: "good-first-issue",
      sort: "stars",
      order: "desc",
      per_page: 30,
    });
    expect(searchCache.get(key)).toBeTruthy();
  });

  it("serves stale cache on 403/429 instead of wiping results", async () => {
    const key = buildCacheKey({
      type: "repositories",
      q: "react",
      sort: "stars",
      order: "desc",
      per_page: 30,
    });
    searchCache.set(key, {
      items: [{ id: 7, name: "cached-repo" }],
      total_count: 1,
      rateLimit: { remaining: 1 },
      fetchedAt: new Date(Date.now() - 120000).toISOString(),
    });

    axios.get = vi.fn().mockResolvedValue({
      status: 403,
      headers: {
        "x-ratelimit-remaining": "0",
        "retry-after": "45",
      },
      data: { message: "API rate limit exceeded" },
    });

    const req = makeReq({
      type: "repositories",
      q: "react",
      sort: "stars",
      order: "desc",
      per_page: 30,
    });
    const res = makeRes();

    await searchGitHub(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    const body = res.json.mock.calls[0][0];
    expect(body.stale).toBe(true);
    expect(body.items[0].name).toBe("cached-repo");
    expect(body.rateLimit.retryAfterSeconds).toBe(45);
    expect(body.warning).toMatch(/rate limit/i);
  });

  it("returns 429 with retry timing when no cache exists", async () => {
    axios.get = vi.fn().mockResolvedValue({
      status: 429,
      headers: { "retry-after": "30" },
      data: {},
    });

    const req = makeReq({ q: "django", type: "repositories" });
    const res = makeRes();

    await searchGitHub(req, res);

    expect(res.status).toHaveBeenCalledWith(429);
    expect(res.json.mock.calls[0][0]).toEqual(
      expect.objectContaining({
        success: false,
        retryAfterSeconds: 30,
      }),
    );
  });

  it("returns fresh cache hit without calling GitHub again", async () => {
    const key = buildCacheKey({
      type: "repositories",
      q: "vite",
      sort: "stars",
      order: "desc",
      per_page: 30,
    });
    searchCache.set(key, {
      items: [{ id: 3, name: "vite" }],
      total_count: 1,
      rateLimit: { remaining: 8 },
      fetchedAt: new Date().toISOString(),
    });

    axios.get = vi.fn();

    const req = makeReq({
      q: "vite",
      type: "repositories",
      sort: "stars",
      order: "desc",
      per_page: 30,
    });
    const res = makeRes();

    await searchGitHub(req, res);

    expect(axios.get).not.toHaveBeenCalled();
    expect(res.json.mock.calls[0][0].fromCache).toBe(true);
    expect(res.json.mock.calls[0][0].stale).toBe(false);
  });
});
