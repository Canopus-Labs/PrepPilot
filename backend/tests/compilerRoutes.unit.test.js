import { createRequire } from "node:module";
import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

const require = createRequire(import.meta.url);

let compilerRouter;
let runCode;
let aiLimiter;

beforeEach(async () => {
  const routerMod = await import("../routes/compilerRoutes.js");
  compilerRouter = routerMod.default ?? routerMod;

  const controllerMod = await import("../controllers/compilerController.js");
  runCode = controllerMod.runCode;

  aiLimiter = require("../middlewares/rateLimiter.js").aiLimiter;
});

afterEach(() => {
  vi.unstubAllEnvs();
});

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

describe("/api/compiler routes", () => {
  it("mounts authenticated, rate-limited code execution", () => {
    const stack = getLayerStack(compilerRouter, "POST", "/run");

    expect(stack).not.toBeNull();
    expect(stack).toContain(aiLimiter);
    expect(stack.some((fn) => fn && fn.name === "protect")).toBe(true);
    expect(stack.some((fn) => fn && fn.name === "validateCompileCode")).toBe(true);
    expect(stack.some((fn) => fn && fn.name === "runCode")).toBe(true);
  });
});

describe("runCode", () => {
  it("fails closed when the Judge0 API key is not configured", async () => {
    vi.stubEnv("JUDGE0_RAPIDAPI_KEY", "");
    vi.stubEnv("RAPIDAPI_KEY", "");

    let statusCode = null;
    let payload = null;
    const res = {
      status: (code) => {
        statusCode = code;
        return res;
      },
      json: (body) => {
        payload = body;
        return res;
      },
    };

    await runCode({ body: {} }, res);

    expect(statusCode).toBe(500);
    expect(payload).toEqual({ message: "Judge0 API key is not configured" });
  });
});
