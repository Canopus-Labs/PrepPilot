import express from "express";
import { describe, it, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from "vitest";
import booksRoutes, { scoreBookMatch, searchBooks } from "../routes/booksRoutes.js";

const FAKE_TREE = {
  tree: [
    { type: "blob", path: "Algorithms/algorithm-design.pdf", size: 100 },
    { type: "blob", path: "Algorithms/Dynamic Programming Book.pdf", size: 200 },
    { type: "blob", path: "Web Development/React in Action.pdf", size: 300 },
    { type: "blob", path: "Web Development/CSS Secrets.pdf", size: 400 },
    { type: "tree", path: "Algorithms" },
    { type: "tree", path: "Web Development" },
  ],
};

function stubGitHubTree() {
  const originalFetch = globalThis.fetch;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url, init) => {
      if (typeof url === "string" && url.includes("api.github.com")) {
        return { ok: true, json: async () => FAKE_TREE };
      }
      return originalFetch(url, init);
    })
  );
}

describe("scoreBookMatch", () => {
  it("gives top score for an exact filename match", () => {
    expect(scoreBookMatch("react-in-action.pdf", "Web Development", ["react-in-action.pdf"])).toBe(100);
  });

  it("gives a high score for a prefix match", () => {
    expect(scoreBookMatch("algorithms-design.pdf", "Algorithms", ["algorithms"])).toBe(80);
  });

  it("scores substring matches per token", () => {
    expect(
      scoreBookMatch("Dynamic Programming Book.pdf", "Algorithms", ["dynamic", "book"])
    ).toBe(20);
  });

  it("scores a full-query substring match higher than tokens", () => {
    expect(
      scoreBookMatch("Mastering Dynamic Programming.pdf", "Algorithms", ["dynamic"])
    ).toBe(60);
  });

  it("adds category points when the query matches the directory", () => {
    const nameScore = scoreBookMatch("algorithm-design.pdf", "Algorithms", ["algorithms"]);
    expect(nameScore).toBeGreaterThan(0);
  });

  it("returns 0 when nothing matches", () => {
    expect(scoreBookMatch("css-secrets.pdf", "Web Development", ["cooking"])).toBe(0);
  });
});

describe("searchBooks", () => {
  beforeEach(() => {
    stubGitHubTree();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("finds books whose filename contains the query", async () => {
    const result = await searchBooks({ q: "dynamic" });
    expect(result.totalItems).toBe(1);
    expect(result.items[0].name).toBe("Dynamic Programming Book.pdf");
    expect(result.items[0].category).toBe("Algorithms");
  });

  it("filters by category prefix", async () => {
    const result = await searchBooks({ q: "secrets", category: "Web Development" });
    expect(result.totalItems).toBe(1);
    expect(result.items[0].name).toBe("CSS Secrets.pdf");
  });

  it("returns an empty result set for unknown queries", async () => {
    const result = await searchBooks({ q: "zzzz-not-found" });
    expect(result.totalItems).toBe(0);
    expect(result.items).toEqual([]);
  });

  it("paginates and caps the page size at 50", async () => {
    const result = await searchBooks({ q: ".pdf", limit: 999 });
    expect(result.pageSize).toBe(50);
    expect(result.totalPages).toBeGreaterThanOrEqual(1);
    expect(typeof result.hasNextPage).toBe("boolean");
  });
});

describe("books search route", () => {
  let server;
  let baseUrl;

  beforeAll(async () => {
    stubGitHubTree();
    const app = express();
    app.use("/api/books", booksRoutes);
    server = app.listen(0);
    await new Promise((resolve) => server.once("listening", resolve));
    const { port } = server.address();
    baseUrl = `http://127.0.0.1:${port}`;
  });

  afterAll(async () => {
    vi.unstubAllGlobals();
    if (!server) return;
    await new Promise((resolve) => server.close(resolve));
  });

  it("rejects queries shorter than two characters", async () => {
    const response = await fetch(`${baseUrl}/api/books/search?q=a`);
    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.message).toContain("at least 2 characters");
  });

  it("returns ranked matches with metadata", async () => {
    const response = await fetch(`${baseUrl}/api/books/search?q=react&limit=10`);
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.query).toBe("react");
    expect(Array.isArray(body.items)).toBe(true);
    expect(body).toHaveProperty("totalItems");
    expect(body).toHaveProperty("totalPages");
    const hit = body.items.find((i) => i.name.includes("React"));
    expect(hit).toBeDefined();
    expect(typeof hit.url).toBe("string");
  });

  it("honors the category filter", async () => {
    const response = await fetch(
      `${baseUrl}/api/books/search?q=css&category=Web%20Development`
    );
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.items.every((i) => i.category === "Web Development")).toBe(true);
  });
});
