const { sanitizeAiPrompt } = require("../middlewares/sanitizeAiPrompt");

describe("Sanitize AI Prompt Middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    res = {};
    next = jest.fn();
  });

  test("Sanitizes prompt correctly", () => {
    req = { body: { prompt: "   hello <script>alert(1)</script> \n  " } };
    sanitizeAiPrompt(req, res, next);
    expect(req.body.prompt).toBe("hello alert(1)");
    expect(next).toHaveBeenCalled();
  });

  test("Handles prompt-only request without crashing", () => {
    req = { body: { prompt: "hello" } };
    // role and topic are undefined
    expect(() => sanitizeAiPrompt(req, res, next)).not.toThrow();
    expect(req.body.prompt).toBe("hello");
    expect(req.body.role).toBeUndefined();
    expect(req.body.topic).toBeUndefined();
    expect(next).toHaveBeenCalled();
  });

  test("Sanitizes role and topic if they exist", () => {
    req = { 
      body: { 
        prompt: "hello", 
        role: "  <b>admin</b> ", 
        topic: "<p>tech</p>" 
      } 
    };
    sanitizeAiPrompt(req, res, next);
    expect(req.body.role).toBe("admin");
    expect(req.body.topic).toBe("tech");
    expect(next).toHaveBeenCalled();
  });

  test("Does not crash if req.body is missing", () => {
    req = {};
    expect(() => sanitizeAiPrompt(req, res, next)).not.toThrow();
    expect(next).toHaveBeenCalled();
  });
});
