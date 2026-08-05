import { Module } from "node:module";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// ---------------------------------------------------------------------------
// JobCache bounding fix (issue #1137): client-controlled role/country values
// must be trimmed, normalized, and whitelisted before they form the cache key,
// so the collection cannot grow unboundedly from arbitrary query strings.
//
// jobController.js is CommonJS, so we shim Node's module loader (same pattern
// as registerEnumeration.unit.test.js) to avoid touching real Mongo models.
// ---------------------------------------------------------------------------

const sessionMock = vi.hoisted(() => ({ findOne: vi.fn() }));
const jobCacheMock = vi.hoisted(() => ({
  findOne: vi.fn(),
  findOneAndUpdate: vi.fn(),
}));
const axiosMock = vi.hoisted(() => ({ get: vi.fn() }));

const testDoubles = new Map();
const originalLoad = Module._load;
Module._load = function (request, parent, isMain) {
  if (testDoubles.has(request)) {
    return testDoubles.get(request);
  }
  return originalLoad.call(this, request, parent, isMain);
};

const clearRequireCache = () => {
  Object.keys(require.cache).forEach((key) => {
    if (key.includes("controllers\\jobController") || key.includes("controllers/jobController")) {
      delete require.cache[key];
    }
  });
};

let getJobs;

beforeEach(() => {
  clearRequireCache();
  vi.stubEnv("ADZUNA_APP_ID", "test_app_id");
  vi.stubEnv("ADZUNA_API_KEY", "test_api_key");
  vi.stubEnv("ADZUNA_COUNTRY", "in");
  sessionMock.findOne.mockReset();
  jobCacheMock.findOne.mockReset();
  jobCacheMock.findOneAndUpdate.mockReset();
  axiosMock.get.mockReset();

  testDoubles.set("../models/Session", {
    findOne: sessionMock.findOne,
  });
  testDoubles.set("../models/JobCache", {
    findOne: jobCacheMock.findOne,
    findOneAndUpdate: jobCacheMock.findOneAndUpdate,
  });
  testDoubles.set("axios", { get: axiosMock.get });
});

afterEach(() => {
  vi.unstubAllEnvs();
});

const mockRes = () => {
  const res = { statusCode: null, body: null };
  res.status = (code) => {
    res.statusCode = code;
    return res;
  };
  res.json = (body) => {
    res.body = body;
    return res;
  };
  return res;
};

const run = async (query) => {
  const mod = await import("../controllers/jobController.js");
  getJobs = mod.getJobs;
  const sessionChain = {
    sort: vi.fn(() => sessionChain),
    select: vi.fn(async () => null),
  };
  sessionMock.findOne.mockReturnValue(sessionChain);
  jobCacheMock.findOne.mockResolvedValue(null);
  axiosMock.get.mockResolvedValue({ data: { results: [] } });
  jobCacheMock.findOneAndUpdate.mockResolvedValue(null);

  const req = { user: { _id: "user-1" }, query };
  const res = mockRes();
  await getJobs(req, res);
  return jobCacheMock.findOneAndUpdate.mock.calls[0][0].cacheKey;
};

describe("getJobs — bounded cache keys", () => {
  it("trims and lowercases role and country", async () => {
    const cacheKey = await run({ role: "  Software Engineer ", country: "US" });
    expect(cacheKey).toBe("software engineer|us");
  });

  it("rejects invalid country and falls back to the configured country", async () => {
    const cacheKey = await run({ role: "backend", country: "USA!!" });
    expect(cacheKey).toBe("backend|in");
  });

  it("rejects over-long or non-whitelisted roles and falls back to the default", async () => {
    const cacheKey = await run({ role: `${"x".repeat(200)}|;;DROP TABLE` });
    expect(cacheKey).toBe("software engineer|in");
  });

  it("never creates keys from raw injected separators", async () => {
    const cacheKey = await run({ role: "admin|*", country: "in'||1=1--" });
    expect(cacheKey).toBe("software engineer|in");
  });
});
