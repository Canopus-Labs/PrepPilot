import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    // Run tests in a forked child process that uses Node's native CJS
    // module resolution instead of Vite's ESM pipeline. This prevents
    // Vite's vite:import-analysis plugin from trying to parse require()
    // calls in CJS source files as ESM, which throws SyntaxErrors.
    pool: "forks",
  },
});
