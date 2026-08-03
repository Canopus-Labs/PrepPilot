const express = require("express");
const router = express.Router();

const GITHUB_OWNER = "KaranUnique";
const GITHUB_REPO = "Free-programming-books";
const BRANCH = "main";
const ALLOWED_DOWNLOAD_HOSTS = new Set(["raw.githubusercontent.com"]);
let GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
if (GITHUB_TOKEN && (GITHUB_TOKEN.includes("your_token_here") || GITHUB_TOKEN === "github_pat_your_token_here")) {
  GITHUB_TOKEN = "";
}


// In-memory cache configurations
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours
const prefixFilesCache = new Map();
let cachedCategoryDirs = null;
let categoryDirsFetchedAt = 0;
let cachedGitTree = null;
let gitTreeFetchedAt = 0;

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

async function getGitTree() {
  if (cachedGitTree && (Date.now() - gitTreeFetchedAt < CACHE_TTL_MS)) {
    return cachedGitTree;
  }

  const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/git/trees/${BRANCH}?recursive=1`;
  const response = await fetchJson(url);

  if (response && Array.isArray(response.tree)) {
    cachedGitTree = response.tree;
    gitTreeFetchedAt = Date.now();
    return cachedGitTree;
  }

  throw new Error("Invalid Git Trees response");
}

async function listFilesRecursive(prefix, page, limit) {
  const requestedPage = Number.isFinite(page) && page >= 1 ? page : 1;
  const itemsPerPage = Number.isFinite(limit) && limit >= 1 ? limit : 20;
  const startIndex = (requestedPage - 1) * itemsPerPage;
  const endIndex = requestedPage * itemsPerPage;

  let allFiles = [];
  let tree = cachedGitTree;

  if (!tree) {
    try {
      tree = await getGitTree();
    } catch (err) {
      // Ignore tree fetch failure; it will fall back to legacy queue
    }
  }

  if (tree && Array.isArray(tree)) {
    const categoryFiles = tree.filter(
      (e) => e.type === "blob" && (e.path === prefix || e.path.startsWith(`${prefix}/`))
    );

    allFiles = categoryFiles.map((e) => ({
      path: e.path,
      name: e.path.split("/").pop(),
      size: e.size,
      url: buildRawUrl(e.path),
    }));
  } else {
    const cached = prefixFilesCache.get(prefix);
    if (cached && (Date.now() - cached.fetchedAt < CACHE_TTL_MS)) {
      allFiles = cached.files;
    } else {
      const queue = [prefix];
      while (queue.length) {
        const current = queue.shift();
        const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodeURI(current)}?ref=${BRANCH}`;
        const entries = await fetchJson(url);
        if (!Array.isArray(entries)) {
          break;
        }
        for (const entry of entries) {
          if (entry.type === "dir") {
            queue.push(`${current}/${entry.name}`);
          } else if (entry.type === "file") {
            allFiles.push({
              path: `${current}/${entry.name}`,
              name: entry.name,
              size: entry.size,
              url: entry.download_url || buildRawUrl(`${current}/${entry.name}`),
            });
          }
        }
      }
      prefixFilesCache.set(prefix, {
        files: allFiles,
        fetchedAt: Date.now(),
      });
    }
  }

  const paginatedItems = allFiles.slice(startIndex, endIndex);
  const totalItems = allFiles.length;

  return {
    totalItems,
    items: paginatedItems,
    currentPage: requestedPage,
    pageSize: itemsPerPage,
    totalPages: Math.max(1, Math.ceil(totalItems / itemsPerPage)),
    hasNextPage: requestedPage * itemsPerPage < totalItems,
    hasPreviousPage: requestedPage > 1,
  };
}

/**
 * Score a book file against lower-cased query tokens.
 * Higher is a better match; 0 means no match.
 * @param {string} name file name including extension
 * @param {string} category first path segment (category directory)
 * @param {string[]} tokens lower-cased query tokens
 * @returns {number}
 */
function scoreBookMatch(name, category, tokens) {
  const fullQuery = tokens.join(" ");
  const normalizedName = name.toLowerCase();

  if (normalizedName === fullQuery) return 100;
  if (normalizedName.startsWith(fullQuery)) return 80;
  if (normalizedName.includes(fullQuery)) return 60;

  let score = 0;
  for (const token of tokens) {
    if (normalizedName.includes(token)) score += 10;
  }
  if (category && category.toLowerCase().includes(fullQuery)) score += 5;
  return score;
}

/**
 * Search every book in the GitHub mirror repo (from the cached git tree)
 * and return ranked, paginated matches.
 * @param {object} options
 * @param {string} options.q search query
 * @param {string} [options.category] optional category prefix filter
 * @param {number} [options.page] 1-based page number
 * @param {number} [options.limit] page size, capped at 50
 * @returns {Promise<object>} paginated ranked results
 */
async function searchBooks({ q = "", category = "", page, limit }) {
  const tokens = q.toLowerCase().split(/\s+/).filter(Boolean);
  const requestedPage = Number.isFinite(page) && page >= 1 ? page : 1;
  const itemsPerPage =
    Number.isFinite(limit) && limit >= 1 ? Math.min(limit, 50) : 20;
  const categoryFilter = category.trim().toLowerCase();

  let tree = cachedGitTree;
  if (!tree) {
    tree = await getGitTree();
  }

  if (!tree || !Array.isArray(tree)) {
    throw new Error("Git tree unavailable for search");
  }

  const scored = [];
  for (const entry of tree) {
    if (entry.type !== "blob") continue;
    const path = entry.path || "";
    const segments = path.split("/");
    const cat = segments.length > 1 ? segments[0] : "";
    const name = segments.pop() || "";

    if (categoryFilter && cat.toLowerCase() !== categoryFilter) continue;

    const score = scoreBookMatch(name, cat, tokens);
    if (score <= 0) continue;

    scored.push({
      path,
      name,
      category: cat,
      size: entry.size,
      url: buildRawUrl(path),
      score,
    });
  }

  scored.sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));

  const totalItems = scored.length;
  const startIndex = (requestedPage - 1) * itemsPerPage;
  const endIndex = requestedPage * itemsPerPage;

  return {
    query: q.trim(),
    totalItems,
    items: scored.slice(startIndex, endIndex),
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
    let categoryDirs;
    let treeData = null;

    try {
      treeData = await getGitTree();
    } catch (err) {
      console.warn("[books] Failed to fetch git tree, trying contents fallback");
    }

    if (treeData && Array.isArray(treeData)) {
      categoryDirs = treeData
        .filter(
          (e) => e.type === "tree" && !e.path.includes("/") && e.path !== "src" && e.path !== "public"
        )
        .map((e) => ({
          name: e.path,
          type: "dir",
        }));
    } else {
      if (cachedCategoryDirs && (Date.now() - categoryDirsFetchedAt < CACHE_TTL_MS)) {
        categoryDirs = cachedCategoryDirs;
      } else {
        const rootUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents?ref=${BRANCH}`;
        const rootEntries = await fetchJson(rootUrl);

        categoryDirs = rootEntries.filter(
          (e) => e.type === "dir" && e.name !== "src" && e.name !== "public",
        );
        cachedCategoryDirs = categoryDirs;
        categoryDirsFetchedAt = Date.now();
      }
    }

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
          console.error(`[books] Failed to read dir ${dir.name}`);
          warnings.push(`Skipped ${dir.name}`);
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
 * Search books by title across every category.
 * @route GET /api/books/search
 * @query q required, at least 2 characters
 * @query category optional category prefix filter
 * @query page optional page number, default 1
 * @query limit optional page size (max 50), default 20
 * @example
 * GET /api/books/search?q=algorithms&limit=10
 */
router.get("/search", async (req, res) => {
  const q = typeof req.query.q === "string" ? req.query.q.trim() : "";
  if (q.length < 2) {
    return res
      .status(400)
      .json({ message: "Search query 'q' must be at least 2 characters" });
  }

  const page = Number.parseInt(req.query.page, 10);
  const limit = Number.parseInt(req.query.limit, 10);
  const category = typeof req.query.category === "string" ? req.query.category : "";

  try {
    const result = await searchBooks({ q, category, page, limit });
    res.json(result);
  } catch (err) {
    console.error("[books] Search failed:", err.message);
    res
      .status(503)
      .json({ message: "Book search is temporarily unavailable." });
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
module.exports.scoreBookMatch = scoreBookMatch;
module.exports.searchBooks = searchBooks;
