import { createRequire } from "module";
import { describe, it, expect, vi } from "vitest";

const require = createRequire(import.meta.url);
const { listFilesRecursive } = require("../routes/booksRoutes");

const sampleEntries = [
  { type: "file", name: "a.txt", size: 10, download_url: "http://example.com/a.txt" },
  { type: "file", name: "b.txt", size: 20, download_url: "http://example.com/b.txt" },
  { type: "file", name: "c.txt", size: 30, download_url: "http://example.com/c.txt" },
];

vi.stubGlobal("fetch", vi.fn(async () => ({
  ok: true,
  json: async () => sampleEntries,
  text: async () => "",
})));

describe("listFilesRecursive pagination", () => {
  it("returns first page of items with default limit", async () => {
    const result = await listFilesRecursive("category", 1, 2);

    expect(result.totalItems).toBe(3);
    expect(result.items).toHaveLength(2);
    expect(result.currentPage).toBe(1);
    expect(result.totalPages).toBe(2);
    expect(result.hasNextPage).toBe(true);
    expect(result.hasPreviousPage).toBe(false);
    expect(result.items[0].name).toBe("a.txt");
    expect(result.items[1].name).toBe("b.txt");
  });

  it("returns second page of items", async () => {
    const result = await listFilesRecursive("category", 2, 2);

    expect(result.totalItems).toBe(3);
    expect(result.items).toHaveLength(1);
    expect(result.currentPage).toBe(2);
    expect(result.totalPages).toBe(2);
    expect(result.hasNextPage).toBe(false);
    expect(result.hasPreviousPage).toBe(true);
    expect(result.items[0].name).toBe("c.txt");
  });
});
