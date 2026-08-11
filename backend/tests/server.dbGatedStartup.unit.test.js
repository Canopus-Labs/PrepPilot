import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";

// ---------------------------------------------------------------------------
// DB-gated startup fix (issue #1303): the server must NOT start when MongoDB
// is unreachable. Previously connectDB() was fire-and-forget and app.listen()
// ran immediately, so the process ran in a degraded state returning cryptic
// errors. Now startServer() awaits connectDB() and process.exit(1)s on failure.
// ---------------------------------------------------------------------------

// Provide env vars required by validateEnv so server.js can be required under
// the test runner without exiting.
process.env.MONGO_URI = process.env.MONGO_URI || "mongodb://localhost/stub";
process.env.JWT_SECRET = process.env.JWT_SECRET || "stub";
process.env.GEMINI_API_KEY = process.env.GEMINI_API_KEY || "stub";

// Stub connectDB (CJS `module.exports = connectDB`) by injecting a fake into
// the require cache BEFORE server.js is loaded, so `require("./config/db")`
// inside server.js resolves to our stub. vitest's vi.mock does not reliably
// intercept CommonJS `require` of an extension-less specifier, so we patch the
// cache directly.
const Module = require("module");
const path = require("path");
const dbModulePath = require.resolve("../config/db.js");
let connectDBImpl = async () => true;

function installDbStub() {
  const stub = function (...args) {
    return connectDBImpl(...args);
  };
  // Minimal CJS module object.
  const fake = {
    exports: stub,
    id: dbModulePath,
    filename: dbModulePath,
    loaded: true,
    paths: [],
  };
  require.cache[dbModulePath] = fake;
  return fake;
}
installDbStub();

// Requiring server.js must NOT auto-boot (require.main !== server.js under the
// test runner), and must export the configured Express app for scripts/tests.
const serverModule = require("../server.js");

describe("server startup is gated on MongoDB availability (#1303)", () => {
  let exitSpy;
  let errorSpy;
  let savedUncaught;
  let savedUnhandled;

  beforeEach(() => {
    connectDBImpl = async () => true;
    // server.js registers global handlers that call process.exit(1); they
    // intercept the mock-thrown exit and prevent the startServer promise from
    // rejecting. Detach them for the duration of these tests.
    savedUncaught = process.listeners("uncaughtException");
    savedUnhandled = process.listeners("unhandledRejection");
    process.removeAllListeners("uncaughtException");
    process.removeAllListeners("unhandledRejection");
    exitSpy = vi.spyOn(process, "exit").mockImplementation((code) => {
      throw new Error(`EXIT_${code}`);
    });
    errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    exitSpy.mockRestore();
    errorSpy.mockRestore();
    process.removeAllListeners("uncaughtException");
    process.removeAllListeners("unhandledRejection");
    savedUncaught.forEach((l) => process.on("uncaughtException", l));
    savedUnhandled.forEach((l) => process.on("unhandledRejection", l));
  });

  it("exports the Express app when required as a module (no auto-boot)", () => {
    expect(serverModule).toBeTruthy();
    expect(typeof serverModule.listen).toBe("function");
    expect(typeof serverModule.startServer).toBe("function");
  });

  it("exits with code 1 when connectDB resolves to false (DB down)", async () => {
    connectDBImpl = async () => false;
    await expect(serverModule.startServer()).rejects.toThrow("EXIT_1");
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("FATAL"),
    );
  });

  it("exits with code 1 when connectDB rejects (DB error thrown)", async () => {
    connectDBImpl = async () => {
      throw new Error("connect ECONNREFUSED 127.0.0.1:27017");
    };
    await expect(serverModule.startServer()).rejects.toThrow("EXIT_1");
    expect(exitSpy).toHaveBeenCalledWith(1);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("FATAL"),
      expect.stringContaining("ECONNREFUSED"),
    );
  });

  it("does not exit when MongoDB connects successfully (sanity, no port bind)", async () => {
    // connectDB resolves true; to avoid actually binding a port we stub
    // app.listen to a no-op for this assertion only.
    const app = serverModule.app;
    const listenSpy = vi.spyOn(app, "listen").mockImplementation(() => ({
      on: () => {},
    }));
    connectDBImpl = async () => true;
    await serverModule.startServer();
    expect(exitSpy).not.toHaveBeenCalled();
    expect(listenSpy).toHaveBeenCalled();
    listenSpy.mockRestore();
  });
});
