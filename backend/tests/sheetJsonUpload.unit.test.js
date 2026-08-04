import { describe, it, expect, beforeAll } from "vitest";

// ---------------------------------------------------------------------------
// Sheet upload scoping (issue #926):
// - sheets are upserted with { id, owner } so users can't overwrite each other
// - reads require authentication and are scoped to the owner
// - the model has a compound unique index on { id, owner } (not id alone)
// ---------------------------------------------------------------------------

let router;
let Sheet;

beforeAll(async () => {
  const mod = await import("../routes/sheetJsonUpload.js");
  router = mod.default ?? mod;
  const sheetMod = await import("../models/Sheet.js");
  Sheet = sheetMod.default ?? sheetMod;
});

describe("Sheet model ownership", () => {
  it("has an owner field", () => {
    expect(Sheet.schema.paths.owner).toBeTruthy();
  });

  it("uses a compound unique index on { id, owner }", () => {
    const indexes = Sheet.schema.indexes().map(([keys, options]) => ({
      keys: JSON.stringify(keys),
      unique: !!options.unique,
    }));
    expect(indexes).toContainEqual({
      keys: JSON.stringify({ id: 1, owner: 1 }),
      unique: true,
    });
  });
});

describe("sheet routes require authentication", () => {
  const chainLength = (path, method) => {
    const layer = router.stack.find(
      (l) => l.route && l.route.path === path && l.route.methods[method]
    );
    expect(layer, `no route ${method.toUpperCase()} ${path}`).toBeTruthy();
    return layer.route.stack.length;
  };

  it("POST /upload has protect plus handler", () => {
    expect(chainLength("/upload", "post")).toBeGreaterThanOrEqual(2);
  });

  it("GET / has protect plus handler", () => {
    expect(chainLength("/", "get")).toBeGreaterThanOrEqual(2);
  });

  it("GET /:id has protect plus handler", () => {
    expect(chainLength("/:id", "get")).toBeGreaterThanOrEqual(2);
  });
});
