/**
 * check-routes.js
 *
 * Programmatically loads the Express app, extracts every registered
 * route (method + full path), and asserts that each path documented
 * in API_DOCUMENTATION.md exists in the live router stack.
 *
 * Usage:
 *   node backend/scripts/check-routes.js
 *
 * Exit code 0 = all documented routes confirmed.
 * Exit code 1 = one or more documented routes not found in the app.
 *
 * Add to CI:
 *   - run: node backend/scripts/check-routes.js
 */

// Stub external services so the app loads without real env vars
process.env.MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/stub";
process.env.JWT_SECRET = process.env.JWT_SECRET || "stub";
process.env.GEMINI_API_KEY = process.env.GEMINI_API_KEY || "stub";

// Prevent the server from actually binding a port
const http = require("http");
const _createServer = http.createServer.bind(http);
http.createServer = (...args) => {
  const s = _createServer(...args);
  s.listen = () => s; // no-op
  return s;
};

// Prevent Mongoose from actually connecting
const mongoose = require("mongoose");
mongoose.connect = async () => {};

const app = require("../server");

// ---------------------------------------------------------------------------
// Extract all registered routes from the Express app
// ---------------------------------------------------------------------------
function extractRoutes(app) {
  const routes = [];

  function walk(stack, prefix) {
    for (const layer of stack) {
      if (layer.route) {
        const methods = Object.keys(layer.route.methods).map((m) =>
          m.toUpperCase()
        );
        for (const method of methods) {
          routes.push({ method, path: prefix + layer.route.path });
        }
      } else if (layer.name === "router" && layer.handle.stack) {
        const subPrefix =
          prefix +
          (layer.regexp.source
            .replace("^\\", "")
            .replace("\\/?(?=\\/|$)", "")
            .replace(/\\\//g, "/")
            // strip trailing i flags artefact
            .replace(/\(\?:\(\.\*\)\)\?/, "") || "");
        walk(layer.handle.stack, subPrefix.replace(/\/+$/, ""));
      }
    }
  }

  walk(app._router.stack, "");
  return routes;
}

// ---------------------------------------------------------------------------
// Documented paths to assert (method + path pairs from API_DOCUMENTATION.md)
// Update this list whenever the doc is updated.
// ---------------------------------------------------------------------------
const DOCUMENTED_ROUTES = [
  { method: "POST", path: "/api/auth/register" },
  { method: "POST", path: "/api/auth/login" },
  { method: "GET",  path: "/api/auth/profile" },
  { method: "PUT",  path: "/api/auth/profile" },
  { method: "PUT",  path: "/api/auth/change-password" },
  { method: "DELETE", path: "/api/auth/delete-account" },
  { method: "POST", path: "/api/auth/upload-image" },
  { method: "POST", path: "/api/ai/generate" },
  { method: "POST", path: "/api/generate" },
  { method: "GET",  path: "/api/models" },
  { method: "POST", path: "/api/sessions/create" },
  { method: "GET",  path: "/api/sessions/my-sessions" },
  { method: "GET",  path: "/api/sessions/:id" },
  { method: "DELETE", path: "/api/sessions/:id" },
  { method: "POST", path: "/api/question/add" },
  { method: "POST", path: "/api/question/:id/pin" },
  { method: "POST", path: "/api/question/:id/note" },
  { method: "POST", path: "/api/resume/compile" },
  { method: "POST", path: "/api/resume/analyze" },
  { method: "POST", path: "/api/resume/save" },
  { method: "GET",  path: "/api/resume/my-resumes" },
  { method: "GET",  path: "/api/books/" },
  { method: "GET",  path: "/api/books/download" },
  { method: "POST", path: "/api/user/sheet-progress" },
  { method: "GET",  path: "/api/user/sheet-progress/:sheetId" },
  { method: "GET",  path: "/api/user/sheet-progress" },
  { method: "GET",  path: "/api/user/achievements" },
  { method: "POST", path: "/api/user/achievements" },
];

// ---------------------------------------------------------------------------
// Run the check
// ---------------------------------------------------------------------------
setTimeout(() => {
  const registered = extractRoutes(app);

  console.log(`\nRegistered routes (${registered.length} total):`);
  for (const r of registered) {
    console.log(`  ${r.method.padEnd(7)} ${r.path}`);
  }

  const missing = [];
  for (const doc of DOCUMENTED_ROUTES) {
    const found = registered.some(
      (r) => r.method === doc.method && r.path === doc.path
    );
    if (!found) missing.push(doc);
  }

  if (missing.length === 0) {
    console.log(
      "\n✅ All documented routes confirmed in the live Express app.\n"
    );
    process.exit(0);
  } else {
    console.error("\n❌ Documented routes NOT found in the app:");
    for (const m of missing) {
      console.error(`  ${m.method.padEnd(7)} ${m.path}`);
    }
    console.error(
      "\nUpdate API_DOCUMENTATION.md or fix the missing route registrations.\n"
    );
    process.exit(1);
  }
}, 500); // short delay for async requires to settle