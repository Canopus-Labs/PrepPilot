import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",

    // Use forked processes for better Node.js compatibility.
    // This supports CommonJS modules and avoids ESM import-analysis
    // issues when testing backend files that use require().

    pool: "forks",

    // Run tests sequentially within each fork.
    fileParallelism: false,

    // Display clear test results.
    reporters: ["default"],

    // Restore mocks between tests.
    restoreMocks: true,
    clearMocks: true,

    // Reset test state between test files.
    isolate: true,

    // Enable coverage configuration.
    coverage: {
      enabled: false,
      reporter: ["text", "html"],
      exclude: [
        "node_modules/**",
        "coverage/**",
        "**/*.config.js",
        "**/*.config.ts",
        "**/test/**",
        "**/*.test.js",
        "**/*.spec.js",
      ],
    },
  },
});
