import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

let compilerRouter;
let runCode;

beforeEach(async () => {
  const routerMod = await import("../routes/compilerRoutes.js");
  compilerRouter = routerMod.default ?? routerMod;

  const controllerMod = await import("../controllers/compilerController.js");
  runCode = controllerMod.runCode;
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
    const routerMiddleware = compilerRouter.stack
      .filter((layer) => !layer.route)
      .map((layer) => layer.handle);
    const stack = getLayerStack(compilerRouter, "POST", "/run");

    expect(routerMiddleware.some((fn) => fn && fn.name === "protect")).toBe(true);
    expect(stack).not.toBeNull();
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
