import { describe, it, expect, beforeEach, vi } from "vitest";

// ---------------------------------------------------------------------------
// Profile-image upload hardening (issue #920):
// - content is validated by magic bytes, never the client-supplied mimetype
// - the stored extension is server-decided from the detected type
// - /uploads static serving forces nosniff + attachment for non-images
// ---------------------------------------------------------------------------

let resolveImageFileName;
let validateImageUpload;
let uploadsStaticHeaders;

beforeEach(async () => {
  const mod = await import("../middlewares/uploadMiddleware.js");
  resolveImageFileName = mod.resolveImageFileName;
  validateImageUpload = mod.validateImageUpload;
  uploadsStaticHeaders = mod.uploadsStaticHeaders;
});

const makeFile = (buffer, originalname) => ({
  buffer,
  originalname,
});

const makeRes = () => {
  const res = { status: vi.fn(), json: vi.fn(), setHeader: vi.fn() };
  res.status.mockReturnValue(res);
  return res;
};

describe("resolveImageFileName — content-based detection", () => {
  it("returns a .png filename for real PNG magic bytes", async () => {
    const png = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a, 0x00, 0x00, 0x00, 0x0d, 0x49, 0x48, 0x44, 0x52]);
    const name = await resolveImageFileName(makeFile(png, "evil.html"));
    expect(name).toBeTruthy();
    expect(name.endsWith(".png")).toBe(true);
    // attacker extension is not preserved
    expect(name).not.toContain(".html");
  });

  it("returns a .jpg filename for real JPEG magic bytes", async () => {
    const jpg = Buffer.from([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46]);
    const name = await resolveImageFileName(makeFile(jpg, "photo.svg"));
    expect(name.endsWith(".jpg")).toBe(true);
  });

  it("returns null for HTML content masquerading as an image", async () => {
    const html = Buffer.from("<!DOCTYPE html><html><script>alert(1)</script></html>");
    const name = await resolveImageFileName(makeFile(html, "x.png"));
    expect(name).toBeNull();
  });

  it("returns null for an SVG (script-capable) payload", async () => {
    const svg = Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><script>alert(1)</script></svg>');
    const name = await resolveImageFileName(makeFile(svg, "image.svg"));
    expect(name).toBeNull();
  });
});

describe("validateImageUpload middleware", () => {
  it("returns 400 for non-image content and does not call next", async () => {
    const req = {
      file: makeFile(Buffer.from("<html>not an image</html>"), "profile.png"),
    };
    const res = makeRes();
    const next = vi.fn();

    await validateImageUpload(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ success: false }));
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 400 when no file was uploaded", async () => {
    const req = {};
    const res = makeRes();
    const next = vi.fn();

    await validateImageUpload(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });
});

describe("uploadsStaticHeaders — static serving hardening", () => {
  it("sets nosniff on every response", () => {
    const res = { setHeader: vi.fn() };
    uploadsStaticHeaders(res, "C:\\uploads\\avatar.png");
    expect(res.setHeader).toHaveBeenCalledWith("X-Content-Type-Options", "nosniff");
  });

  it("serves images inline without Content-Disposition", () => {
    const res = { setHeader: vi.fn() };
    uploadsStaticHeaders(res, "C:\\uploads\\avatar.jpg");
    expect(res.setHeader).not.toHaveBeenCalledWith("Content-Disposition", "attachment");
  });

  it("forces attachment download for non-image files like HTML", () => {
    const res = { setHeader: vi.fn() };
    uploadsStaticHeaders(res, "C:\\uploads\\1740000000000-evil.html");
    expect(res.setHeader).toHaveBeenCalledWith("Content-Disposition", "attachment");
    expect(res.setHeader).toHaveBeenCalledWith("Content-Type", "application/octet-stream");
  });
});
