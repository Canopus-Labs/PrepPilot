const test = require("node:test");
const assert = require("node:assert/strict");

const router = require("../routes/authRoutes");
const { protect } = require("../middlewares/authMiddleware");
const {
  authLimiter,
  generalLimiter,
  sensitiveAuthLimiter,
} = require("../middlewares/rateLimiter");
const {
  getUserProfile,
  updateUserProfile,
  changePassword,
  deleteUserAccount,
} = require("../controllers/authController");

function getRouteStack(method, path) {
  const layer = router.stack.find(
    (entry) =>
      entry.route &&
      entry.route.path === path &&
      entry.route.methods[method.toLowerCase()]
  );

  return layer ? layer.route.stack.map((entry) => entry.handle) : null;
}

test("POST /register keeps authLimiter only", () => {
  const stack = getRouteStack("POST", "/register");

  assert.ok(stack);
  assert.equal(stack.includes(authLimiter), true);
  assert.equal(stack.includes(generalLimiter), false);
});

test("POST /login keeps authLimiter only", () => {
  const stack = getRouteStack("POST", "/login");

  assert.ok(stack);
  assert.equal(stack.includes(authLimiter), true);
  assert.equal(stack.includes(generalLimiter), false);
});

test("GET /profile includes protect and generalLimiter in order", () => {
  const stack = getRouteStack("GET", "/profile");

  assert.ok(stack);
  assert.equal(stack.includes(protect), true);
  assert.equal(stack.includes(generalLimiter), true);
  assert.ok(stack.indexOf(protect) < stack.indexOf(generalLimiter));
  assert.ok(stack.indexOf(generalLimiter) < stack.indexOf(getUserProfile));
});

test("PUT /profile includes protect and generalLimiter in order", () => {
  const stack = getRouteStack("PUT", "/profile");

  assert.ok(stack);
  assert.equal(stack.includes(protect), true);
  assert.equal(stack.includes(generalLimiter), true);
  assert.ok(stack.indexOf(protect) < stack.indexOf(generalLimiter));
  assert.ok(stack.indexOf(generalLimiter) < stack.indexOf(updateUserProfile));
});

test("PUT /change-password includes protect and sensitiveAuthLimiter in order", () => {
  const stack = getRouteStack("PUT", "/change-password");

  assert.ok(stack);
  assert.equal(stack.includes(protect), true);
  assert.equal(stack.includes(generalLimiter), false);
  assert.equal(stack.includes(sensitiveAuthLimiter), true);
  assert.ok(stack.indexOf(protect) < stack.indexOf(sensitiveAuthLimiter));
  assert.ok(stack.indexOf(sensitiveAuthLimiter) < stack.indexOf(changePassword));
});

test("DELETE /delete-account includes protect and sensitiveAuthLimiter in order", () => {
  const stack = getRouteStack("DELETE", "/delete-account");

  assert.ok(stack);
  assert.equal(stack.includes(protect), true);
  assert.equal(stack.includes(generalLimiter), false);
  assert.equal(stack.includes(sensitiveAuthLimiter), true);
  assert.ok(stack.indexOf(protect) < stack.indexOf(sensitiveAuthLimiter));
  assert.ok(stack.indexOf(sensitiveAuthLimiter) < stack.indexOf(deleteUserAccount));
});

test("POST /upload-image includes protect and generalLimiter before the upload handler", () => {
  const stack = getRouteStack("POST", "/upload-image");

  assert.ok(stack);
  assert.equal(stack.includes(protect), true);
  assert.equal(stack.includes(generalLimiter), true);
  assert.ok(stack.indexOf(protect) < stack.indexOf(generalLimiter));
  assert.ok(stack.indexOf(generalLimiter) < stack.length - 1);
});
