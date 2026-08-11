import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// ---------------------------------------------------------------------------
// unhandledRejection policy fix (issue #1441): two contradictory global
// listeners existed — the first logs and continues, the second called
// process.exit(1), so any unhandled rejection killed the whole server.
// Exactly one log-and-continue policy must remain.
// ---------------------------------------------------------------------------

const serverSource = readFileSync(resolve(__dirname, "../server.js"), "utf8");

describe("server.js unhandledRejection policy", () => {
  it("registers exactly one unhandledRejection listener", () => {
    const matches = serverSource.match(/process\.on\(\s*["']unhandledRejection["']/g) || [];
    expect(matches.length).toBe(1);
  });

  it("does not exit the process from the unhandledRejection handler", () => {
    const listenerBlock = serverSource.slice(
      serverSource.indexOf('"unhandledRejection"'),
      serverSource.indexOf("unhandledRejection") + 300
    );
    expect(listenerBlock).not.toMatch(/process\.exit/);
  });
});
