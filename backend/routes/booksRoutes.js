const express = require("express");
const router = express.Router();

const GITHUB_OWNER = "KaranUnique";
const GITHUB_REPO = "Free-programming-books";
const BRANCH = "main";
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

async function listFilesRecursive(prefix) {
  const files = [];
  const queue = [prefix];

  while (queue.length) {
    const current = queue.shift();
    const url = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${encodeURI(current)}?ref=${BRANCH}`;
    const entries = await fetchJson(url);
    for (const entry of entries) {
      if (entry.type === "dir") {
        queue.push(`${current}/${entry.name}`);
      } else if (entry.type === "file") {
        files.push({
          path: `${current}/${entry.name}`,
          name: entry.name,
          size: entry.size,
          url: entry.download_url || buildRawUrl(`${current}/${entry.name}`),
        });
      }
    }
  }

  return files;
}

// List books directly from GitHub repo structure (recursive per top-level dir)
router.get("/", async (_req, res) => {
  try {
    const rootUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents?ref=${BRANCH}`;
    const rootEntries = await fetchJson(rootUrl);

    const categoryDirs = rootEntries.filter((e) => e.type === "dir");
    const warnings = [];

    const categories = await Promise.all(
      categoryDirs.map(async (dir) => {
        try {
          const files = await listFilesRecursive(dir.name);
          return {
            id: dir.name.toLowerCase().replace(/\s+/g, "-"),
            title: dir.name,
            count: files.length,
            items: files.map((f) => ({
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

// Optional redirector for direct downloads when given a full GitHub file URL
router.get("/download", (req, res) => {
  const { url } = req.query;
  if (!url) return res.status(400).json({ message: "url query is required" });
  return res.redirect(url);
});

module.exports = router;
