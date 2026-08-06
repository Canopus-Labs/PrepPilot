import { describe, it, expect, beforeAll } from "vitest";

// ---------------------------------------------------------------------------
// Issue #1450: malformed ObjectId ids in params/body must return 400 instead
// of reaching Mongoose and surfacing as a 500 CastError.
//
// Covered:
//   - GET    /api/sessions/:id     (validateGetSessionById)
//   - DELETE /api/sessions/:id     (validateDeleteSession)
//   - DELETE /api/resume/:id       (validateDeleteResume — was missing entirely)
//   - POST   /api/resume/save      (validateSaveResume — resumeId in body)
// ---------------------------------------------------------------------------

const VALID_ID = "6426c5a5e6a6f6a6f6a6f6a6";
const BAD_IDS = ["abc", "000", "aaaaaaaa", "not-an-objectid", "zzzz"];

let sessionValidators;
let resumeValidators;
let resumeRouter;

beforeAll(async () => {
  const sessionMod = await import("../Input_validators/ValidateSession.js");
  sessionValidators = sessionMod;

  const resumeMod = await import("../Input_validators/ValidateResume.js");
  resumeValidators = resumeMod;

  const resumeRouterMod = await import("../routes/resumeRoutes.js");
  resumeRouter = resumeRouterMod.default ?? resumeRouterMod;
});

function run(mw, req) {
  let passed = false;
  let statusCode = null;
  const res = {
    status: (code) => {
      statusCode = code;
      return res;
    },
    json: () => res,
  };
  mw(req, res, () => {
    passed = true;
  });
  return { passed, statusCode };
}

describe("ValidateSession — ObjectId params (#1450)", () => {
  it.each(BAD_IDS)("rejects malformed id '%s' with 400 (getSessionById)", (id) => {
    const { passed, statusCode } = run(sessionValidators.validateGetSessionById, {
      params: { id },
    });
    expect(passed).toBe(false);
    expect(statusCode).toBe(400);
  });

  it.each(BAD_IDS)("rejects malformed id '%s' with 400 (deleteSession)", (id) => {
    const { passed, statusCode } = run(sessionValidators.validateDeleteSession, {
      params: { id },
    });
    expect(passed).toBe(false);
    expect(statusCode).toBe(400);
  });

  it("accepts a valid ObjectId", () => {
    const { passed } = run(sessionValidators.validateGetSessionById, {
      params: { id: VALID_ID },
    });
    expect(passed).toBe(true);
  });
});

describe("ValidateResume — ObjectId id/resumeId (#1450)", () => {
  it.each(BAD_IDS)("rejects malformed id '%s' with 400 (deleteResume)", (id) => {
    const { passed, statusCode } = run(resumeValidators.validateDeleteResume, {
      params: { id },
    });
    expect(passed).toBe(false);
    expect(statusCode).toBe(400);
  });

  it.each(BAD_IDS)("rejects malformed resumeId '%s' with 400 (saveResume)", (id) => {
    const { passed, statusCode } = run(resumeValidators.validateSaveResume, {
      body: { title: "t", latexCode: "l", resumeId: id },
    });
    expect(passed).toBe(false);
    expect(statusCode).toBe(400);
  });

  it("accepts a valid resumeId", () => {
    const { passed } = run(resumeValidators.validateSaveResume, {
      body: { title: "t", latexCode: "l", resumeId: VALID_ID },
    });
    expect(passed).toBe(true);
  });

  it("accepts saveResume without a resumeId (create path)", () => {
    const { passed } = run(resumeValidators.validateSaveResume, {
      body: { title: "t", latexCode: "l" },
    });
    expect(passed).toBe(true);
  });
});

describe("DELETE /api/resume/:id middleware chain (#1450)", () => {
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

  it("registers the route", () => {
    const stack = getLayerStack(resumeRouter, "DELETE", "/:id");
    expect(stack).not.toBeNull();
  });

  it("includes validateDeleteResume before the deleteResume controller", () => {
    const stack = getLayerStack(resumeRouter, "DELETE", "/:id");
    const validatorIdx = stack.findIndex(
      (fn) => fn && fn.name === "validateDeleteResume"
    );
    const controllerIdx = stack.findIndex(
      (fn) => fn && fn.name === "deleteResume"
    );
    expect(validatorIdx).toBeGreaterThanOrEqual(0);
    expect(controllerIdx).toBeGreaterThan(validatorIdx);
  });
});
