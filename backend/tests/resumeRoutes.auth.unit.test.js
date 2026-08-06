import { describe, it, expect, beforeAll } from "vitest";

// ---------------------------------------------------------------------------
// Load the actual router so the test breaks if anyone removes or reorders
// the guards in resumeRoutes.js.
// ---------------------------------------------------------------------------
let router;

beforeAll(async () => {
  const routerMod = await import("../routes/resumeRoutes.js");
  router = routerMod.default ?? routerMod;
});

// ---------------------------------------------------------------------------
// Helper: extract middleware NAME list for a given method + path.
// Uses function.name (falls back to "(anon)" for unnamed middleware like
// some bundled express-rate-limit instances).
// ---------------------------------------------------------------------------
function getNames(router, method, path) {
  const layer = router.stack.find(
    (l) =>
      l.route &&
      l.route.path === path &&
      l.route.methods[method.toLowerCase()]
  );
  if (!layer) return null;
  return layer.route.stack.map((s) => s.handle.name || "(anon)");
}

function idx(names, name) { return names.indexOf(name); }

// ---------------------------------------------------------------------------
// Tests for POST /compile
// ---------------------------------------------------------------------------
describe("POST /compile middleware chain", () => {
  it("registers the route", () => {
    expect(getNames(router, "POST", "/compile")).not.toBeNull();
  });

  it("has protect middleware", () => {
    expect(getNames(router, "POST", "/compile")).toContain("protect");
  });

  it("has a rate-limiter middleware (aiLimiter)", () => {
    const names = getNames(router, "POST", "/compile");
    // aiLimiter is an unnamed function; it appears as "(anon)" between protect and validateCompileResume
    const pIdx = idx(names, "protect");
    const vIdx = idx(names, "validateCompileResume");
    // There should be exactly one middleware between protect and validateCompileResume
    expect(vIdx - pIdx).toBe(2); // protect + aiLimiter + validateCompileResume
    expect(names[pIdx + 1]).toBe("(anon)");
  });

  it("places protect before aiLimiter", () => {
    const names = getNames(router, "POST", "/compile");
    const pIdx = idx(names, "protect");
    const vIdx = idx(names, "validateCompileResume");
    expect(pIdx).toBeLessThan(vIdx - 1); // protect comes before the anonymous limiter
  });

  it("places aiLimiter before compileResume controller", () => {
    const names = getNames(router, "POST", "/compile");
    const vIdx = idx(names, "validateCompileResume");
    const cIdx = idx(names, "compileResume");
    expect(vIdx).toBeLessThan(cIdx);
  });

  it("places protect before compileResume controller", () => {
    const names = getNames(router, "POST", "/compile");
    expect(idx(names, "protect")).toBeLessThan(idx(names, "compileResume"));
  });
});

// ---------------------------------------------------------------------------
// Tests for POST /analyze
// ---------------------------------------------------------------------------
describe("POST /analyze middleware chain", () => {
  it("registers the route", () => {
    expect(getNames(router, "POST", "/analyze")).not.toBeNull();
  });

  it("has protect middleware", () => {
    expect(getNames(router, "POST", "/analyze")).toContain("protect");
  });

  it("has aiLimiter middleware", () => {
    const names = getNames(router, "POST", "/analyze");
    const pIdx = idx(names, "protect");
    const cIdx = idx(names, "analyzeResume");
    // There should be at least 2 middlewares between protect and analyzeResume (aiLimiter + multer validators)
    expect(cIdx - pIdx).toBeGreaterThanOrEqual(3);
    expect(names[pIdx + 1]).toBe("(anon)"); // aiLimiter
  });

  it("places protect before aiLimiter", () => {
    const names = getNames(router, "POST", "/analyze");
    const pIdx = idx(names, "protect");
    const cIdx = idx(names, "analyzeResume");
    expect(pIdx).toBeLessThan(cIdx - 1);
  });

  it("places protect before multerMiddleware (upload must run after auth)", () => {
    const names = getNames(router, "POST", "/analyze");
    expect(idx(names, "protect")).toBeLessThan(idx(names, "multerMiddleware"));
  });

  it("places aiLimiter before multerMiddleware", () => {
    const names = getNames(router, "POST", "/analyze");
    const aiLimiterIdx = idx(names, "protect") + 1; // aiLimiter is the anon after protect
    expect(aiLimiterIdx).toBeLessThan(idx(names, "multerMiddleware"));
  });

  it("places aiLimiter before analyzeResume controller", () => {
    const names = getNames(router, "POST", "/analyze");
    expect(idx(names, "protect") + 1).toBeLessThan(idx(names, "analyzeResume"));
  });
});

// ---------------------------------------------------------------------------
// Regression: existing protected routes still have protect
// ---------------------------------------------------------------------------
describe("POST /save and GET /my-resumes — regression", () => {
  it("POST /save includes protect", () => {
    expect(getNames(router, "POST", "/save")).toContain("protect");
  });

  it("GET /my-resumes includes protect", () => {
    expect(getNames(router, "GET", "/my-resumes")).toContain("protect");
  });
});

// ---------------------------------------------------------------------------
// Invariant: no route on this router is callable without protect
// ---------------------------------------------------------------------------
describe("global invariant — every route requires protect", () => {
  it("every registered route stack contains protect", () => {
    const routes = router.stack.filter((l) => l.route);
    for (const layer of routes) {
      const names = layer.route.stack.map((s) => s.handle.name || "(anon)");
      expect(
        names,
        `Route ${Object.keys(layer.route.methods)[0].toUpperCase()} ${layer.route.path} is missing protect`
      ).toContain("protect");
    }
  });
});
