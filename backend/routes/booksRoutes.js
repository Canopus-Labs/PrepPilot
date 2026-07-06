const express = require("express");
const router = express.Router();

const GITHUB_OWNER = "KaranUnique";
const GITHUB_REPO = "Free-programming-books";
const BRANCH = "main";
const ALLOWED_DOWNLOAD_HOSTS = new Set(["raw.githubusercontent.com"]);
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

async function fetchJson(url) {
  const resp = await fetch(url, {
    headers: {
      Accept: "application/vnd.github.v3+json",
      ...(GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {}),
    },
  });
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`GitHub API ${resp.status} ${resp.statusText}: ${text}`);
  }
  return resp.json();
}

function buildRawUrl(path) {
  return `https://raw.githubusercontent.com/${GITHUB_OWNER}/${GITHUB_REPO}/${BRANCH}/${encodeURI(path)}`;
}

async function listFilesRecursive(prefix, page, limit) {
  const files = [];
  const queue = [prefix];
  const requestedPage = Number.isFinite(page) && page >= 1 ? page : 1;
  const itemsPerPage = Number.isFinite(limit) && limit >= 1 ? limit : 20;
  const startIndex = (requestedPage - 1) * itemsPerPage;
  const endIndex = requestedPage * itemsPerPage;
  let totalItems = 0;

  while (queue.length) {
    const current = queue.shift();
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodeURI(current)}?ref=${BRANCH}`;
    const entries = await fetchJson(url);
    for (const entry of entries) {
      if (entry.type === "dir") {
        queue.push(`${current}/${entry.name}`);
      } else if (entry.type === "file") {
        if (totalItems >= startIndex && totalItems < endIndex) {
          files.push({
            path: `${current}/${entry.name}`,
            name: entry.name,
            size: entry.size,
            url: entry.download_url || buildRawUrl(`${current}/${entry.name}`),
          });
        }
        totalItems += 1;
      }
    }
  }

  return {
    totalItems,
    items: files,
    currentPage: requestedPage,
    pageSize: itemsPerPage,
    totalPages: Math.max(1, Math.ceil(totalItems / itemsPerPage)),
    hasNextPage: requestedPage * itemsPerPage < totalItems,
    hasPreviousPage: requestedPage > 1,
  };
}

/**
 * List programming book categories and files sourced from the GitHub repository.
 * @route GET /api/books/
 * @query page optional page number, default 1
 * @query limit optional page size, default 20
 * @param {import('express').Request} _req
 * @param {import('express').Response} res
 * @returns {Promise<void>}
 * @throws {Error} When the GitHub API cannot be reached.
 * @example
 * GET /api/books/?page=2&limit=20
 * @example
 * 200 {"categories": [{"id":"...","title":"...","pagination":{"totalItems":100,...},"items":[...]}], "warnings": []}
 */
router.get("/", async (_req, res) => {
  try {
    const rootUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents?ref=${BRANCH}`;
    const rootEntries = await fetchJson(rootUrl);

    const categoryDirs = rootEntries.filter(
      (e) => e.type === "dir" && e.name !== "src" && e.name !== "public",
    );
    const warnings = [];

    const page = Number.parseInt(_req.query.page, 10);
    const limit = Number.parseInt(_req.query.limit, 10);

    const categories = await Promise.all(
      categoryDirs.map(async (dir) => {
        try {
          const result = await listFilesRecursive(dir.name, page, limit);
          return {
            id: dir.name.toLowerCase().replace(/\s+/g, "-"),
            title: dir.name,
            count: result.totalItems,
            pagination: {
              totalItems: result.totalItems,
              totalPages: result.totalPages,
              currentPage: result.currentPage,
              hasNextPage: result.hasNextPage,
              hasPreviousPage: result.hasPreviousPage,
              limit: result.pageSize,
            },
            items: result.items.map((f) => ({
              id: `${dir.name}-${f.path}`,
              name: f.path.slice(dir.name.length + 1),
              size: f.size,
              url: f.url,
            })),
          };
        } catch (err) {
          console.error(`[books] Failed to read dir ${dir.name}:`, err.message);
          warnings.push(`Skipped ${dir.name}: ${err.message}`);
          return null;
        }
      }),
    );

    const filtered = categories.filter(Boolean);
    if (!filtered.length) {
      return res
        .status(502)
        .json({ message: "Failed to load books from GitHub.", warnings });
    }

    res.json({ categories: filtered, warnings });
  } catch (err) {
    console.error("[books] Failed to load books from GitHub", err);
    res.status(500).json({ message: "Failed to load books from GitHub." });
  }
});

/**
 * Redirect to a GitHub raw file URL for direct download.
 * @route GET /api/books/download
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @returns {void}
 * @throws {Error} When the url query parameter is missing.
 * @example
 * GET /api/books/download?url=https://raw.githubusercontent.com/.../file.pdf
 * @example
 * 302 redirect to raw file URL
 */
router.get("/download", (req, res) => {
  const { url } = req.query;
  if (typeof url !== "string" || !url.trim()) {
    return res.status(400).json({ message: "url query is required" });
  }

  let parsedUrl;
  try {
    parsedUrl = new URL(url);
  } catch {
    return res.status(400).json({ message: "url query must be a valid URL" });
  }

  if (parsedUrl.protocol !== "https:") {
    return res.status(403).json({ message: "download URL must use https" });
  }

  if (!ALLOWED_DOWNLOAD_HOSTS.has(parsedUrl.hostname)) {
    return res.status(403).json({ message: "download URL host is not allowed" });
  }

  return res.redirect(parsedUrl.toString());
});

module.exports = router;
module.exports.listFilesRecursive = listFilesRecursive;
