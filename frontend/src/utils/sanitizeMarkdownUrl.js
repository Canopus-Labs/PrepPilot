/**
 * Allow only http(s) URLs from model-rendered markdown.
 * Blocks javascript:, data:, and other unsafe schemes.
 * @param {string | undefined | null} url
 * @returns {string | undefined}
 */
export function sanitizeMarkdownUrl(url) {
  if (!url || typeof url !== "string") return undefined;

  const trimmed = url.trim();
  if (!trimmed) return undefined;

  // Protocol-relative and scheme-relative unsafe forms
  const lower = trimmed.toLowerCase();
  if (
    lower.startsWith("javascript:") ||
    lower.startsWith("data:") ||
    lower.startsWith("vbscript:") ||
    lower.startsWith("file:")
  ) {
    return undefined;
  }

  try {
    const base =
      typeof window !== "undefined" && window.location?.origin
        ? window.location.origin
        : "https://example.com";
    const parsed = new URL(trimmed, base);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.href;
    }
  } catch {
    return undefined;
  }

  return undefined;
}
