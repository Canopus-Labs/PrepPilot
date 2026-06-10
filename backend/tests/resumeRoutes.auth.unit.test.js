import { describe, it, expect, beforeAll } from "vitest";

// ---------------------------------------------------------------------------
// Pull the actual router and the real middleware references so the test
// breaks if anyone removes or reorders the guards in resumeRoutes.js.
// ---------------------------------------------------------------------------
let router;
let protect;
let aiLimiter;
let compileResume;
let analyzeResume;

beforeAll(async () => {
  // Dynamic import keeps this file runnable without a live DB/env.
  // The router module only wires Express — it doesn't connect Mongoose.
  const routerMod = await import("../routes/resumeRoutes.js");
  router = routerMod.default ?? routerMod;

  const authMod = await import("../middlewares/authMiddleware.js");
  protect = authMod.protect;

  const limiterMod = await import("../middlewares/rateLimiter.js");
  aiLimiter = limiterMod.aiLimiter;

  const ctrlMod = await import("../controllers/resumeController.js");
  compileResume = ctrlMod.compileResume;
  analyzeResume = ctrlMod.analyzeResume;
});

// ---------------------------------------------------------------------------
// Helper: extract the middleware stack for a given method + path from the
// Express router's internal layer list.
// ---------------------------------------------------------------------------
function getLayerStack(router, method, path) {
  const layer = router.stack.find(
    (l) =>
      l.route &&
      l.route.path === path &&
      l.route.methods[method.toLowerCase()]
  );
  if (!layer) return null;
  return layer.route.stack.map((s) => s.handle);
}

// ---------------------------------------------------------------------------
// Tests for POST /compile
// ---------------------------------------------------------------------------
describe("POST /compile middleware chain", () => {
  it("registers the route", () => {
    const stack = getLayerStack(router, "POST", "/compile");
    expect(stack).not.toBeNull();
  });

  it("includes protect middleware", () => {
    const stack = getLayerStack(router, "POST", "/compile");
    expect(stack).toContain(protect);
  });

  it("includes aiLimiter middleware", () => {
    const stack = getLayerStack(router, "POST", "/compile");
    expect(stack).toContain(aiLimiter);
  });

  it("places protect before aiLimiter", () => {
    const stack = getLayerStack(router, "POST", "/compile");
    expect(stack.indexOf(protect)).toBeLessThan(stack.indexOf(aiLimiter));
  });

  it("places aiLimiter before compileResume controller", () => {
    const stack = getLayerStack(router, "POST", "/compile");
    expect(stack.indexOf(aiLimiter)).toBeLessThan(stack.indexOf(compileResume));
  });

  it("places protect before compileResume controller", () => {
    const stack = getLayerStack(router, "POST", "/compile");
    expect(stack.indexOf(protect)).toBeLessThan(stack.indexOf(compileResume));
  });
});

// ---------------------------------------------------------------------------
// Tests for POST /analyze
// ---------------------------------------------------------------------------
describe("POST /analyze middleware chain", () => {
  it("registers the route", () => {
    const stack = getLayerStack(router, "POST", "/analyze");
    expect(stack).not.toBeNull();
  });

  it("includes protect middleware", () => {
    const stack = getLayerStack(router, "POST", "/analyze");
    expect(stack).toContain(protect);
  });

  it("includes aiLimiter middleware", () => {
    const stack = getLayerStack(router, "POST", "/analyze");
    expect(stack).toContain(aiLimiter);
  });

  it("places protect before aiLimiter", () => {
    const stack = getLayerStack(router, "POST", "/analyze");
    expect(stack.indexOf(protect)).toBeLessThan(stack.indexOf(aiLimiter));
  });

  it("places protect before multer (upload must run after auth, not before)", () => {
    const stack = getLayerStack(router, "POST", "/analyze");
    const protectIdx = stack.indexOf(protect);
    // multer handler is not imported directly — find it by position:
    // it is the function that is neither protect, aiLimiter, nor analyzeResume
    const multerIdx = stack.findIndex(
      (fn) => fn !== protect && fn !== aiLimiter && fn !== analyzeResume
    );
    expect(protectIdx).toBeLessThan(multerIdx);
  });

  it("places aiLimiter before multer", () => {
    const stack = getLayerStack(router, "POST", "/analyze");
    const aiLimiterIdx = stack.indexOf(aiLimiter);
    const multerIdx = stack.findIndex(
      (fn) => fn !== protect && fn !== aiLimiter && fn !== analyzeResume
    );
    expect(aiLimiterIdx).toBeLessThan(multerIdx);
  });

  it("places aiLimiter before analyzeResume controller", () => {
    const stack = getLayerStack(router, "POST", "/analyze");
    expect(stack.indexOf(aiLimiter)).toBeLessThan(stack.indexOf(analyzeResume));
  });
});

// ---------------------------------------------------------------------------
// Regression: existing protected routes still have protect
// ---------------------------------------------------------------------------
describe("POST /save and GET /my-resumes — regression", () => {
  it("POST /save still includes protect", () => {
    const stack = getLayerStack(router, "POST", "/save");
    expect(stack).toContain(protect);
  });

  it("GET /my-resumes still includes protect", () => {
    const stack = getLayerStack(router, "GET", "/my-resumes");
    expect(stack).toContain(protect);
  });
});

// ---------------------------------------------------------------------------
// Invariant: no route on this router is callable without protect
// ---------------------------------------------------------------------------
describe("global invariant — every route requires protect", () => {
  it("every registered route stack contains protect", () => {
    const routes = router.stack.filter((l) => l.route);
    for (const layer of routes) {
      const handles = layer.route.stack.map((s) => s.handle);
      expect(
        handles,
        `Route ${Object.keys(layer.route.methods)[0].toUpperCase()} ${layer.route.path} is missing protect`
      ).toContain(protect);
    }
  });
});