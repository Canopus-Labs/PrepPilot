import { describe, it, expect } from "vitest";
import { sanitizeMarkdownUrl } from "./sanitizeMarkdownUrl";

describe("sanitizeMarkdownUrl", () => {
  it("allows https and http URLs", () => {
    expect(sanitizeMarkdownUrl("https://example.com/path")).toBe(
      "https://example.com/path"
    );
    expect(sanitizeMarkdownUrl("http://example.com")).toBe("http://example.com/");
  });

  it("blocks javascript and data schemes", () => {
    expect(sanitizeMarkdownUrl("javascript:alert(1)")).toBeUndefined();
    expect(sanitizeMarkdownUrl("JavaScript:alert(1)")).toBeUndefined();
    expect(sanitizeMarkdownUrl("data:text/html,<h1>x</h1>")).toBeUndefined();
    expect(sanitizeMarkdownUrl("vbscript:msgbox(1)")).toBeUndefined();
  });

  it("rejects empty and non-string values", () => {
    expect(sanitizeMarkdownUrl("")).toBeUndefined();
    expect(sanitizeMarkdownUrl(null)).toBeUndefined();
    expect(sanitizeMarkdownUrl(undefined)).toBeUndefined();
  });
});
