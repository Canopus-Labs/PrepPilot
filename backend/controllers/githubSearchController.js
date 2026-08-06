const axios = require("axios");
const NodeCache = require("node-cache");

const CACHE_TTL_SECONDS = 90;
const STALE_TTL_SECONDS = 60 * 30;
const searchCache = new NodeCache({
  stdTTL: STALE_TTL_SECONDS,
  checkperiod: 60,
  useClones: false,
});

const ALLOWED_TYPES = new Set(["repositories", "issues"]);

const buildCacheKey = ({ type, q, sort, order, per_page }) =>
  `${type}|${q}|${sort}|${order}|${per_page}`;

const parseRateLimit = (headers = {}) => {
  const remaining = headers["x-ratelimit-remaining"];
  const limit = headers["x-ratelimit-limit"];
  const reset = headers["x-ratelimit-reset"];
  const retryAfter = headers["retry-after"];

  return {
    remaining: remaining !== undefined ? Number(remaining) : null,
    limit: limit !== undefined ? Number(limit) : null,
    resetAt: reset ? new Date(Number(reset) * 1000).toISOString() : null,
    retryAfterSeconds: retryAfter !== undefined ? Number(retryAfter) : null,
  };
};

const isRecoverableStatus = (status) =>
  status === 403 || status === 429 || status >= 500;

const fetchGitHubSearch = async ({ type, q, sort, order, per_page }) => {
  const url = `https://api.github.com/search/${type}`;
  const headers = {
    Accept: "application/vnd.github.v3+json",
    "User-Agent": "PrepPilot-RepositoryHive",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  const response = await axios.get(url, {
    params: { q, sort, order, per_page },
    headers,
    validateStatus: () => true,
    timeout: 15000,
  });

  return response;
};

/**
 * @desc Proxied GitHub search with short-lived shared cache and stale fallback
 * @route GET /api/github/search
 * @access Public
 */
const searchGitHub = async (req, res) => {
  try {
    const type = String(req.query.type || "repositories").toLowerCase();
    const q = String(req.query.q || "").trim();
    const sort = String(req.query.sort || "stars");
    const order = String(req.query.order || "desc");
    const per_page = Math.min(
      Math.max(Number(req.query.per_page) || 30, 1),
      30,
    );

    if (!ALLOWED_TYPES.has(type)) {
      return res.status(400).json({
        success: false,
        message: 'type must be "repositories" or "issues"',
      });
    }

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "q is required",
      });
    }

    const cacheKey = buildCacheKey({ type, q, sort, order, per_page });
    const cached = searchCache.get(cacheKey);
    const cacheAgeMs = cached
      ? Date.now() - new Date(cached.fetchedAt).getTime()
      : null;
    const cacheIsFresh =
      cached && cacheAgeMs !== null && cacheAgeMs < CACHE_TTL_SECONDS * 1000;

    if (cacheIsFresh) {
      return res.status(200).json({
        success: true,
        stale: false,
        fromCache: true,
        rateLimit: cached.rateLimit || null,
        items: cached.items,
        total_count: cached.total_count,
        fetchedAt: cached.fetchedAt,
      });
    }

    const response = await fetchGitHubSearch({
      type,
      q,
      sort,
      order,
      per_page,
    });
    const rateLimit = parseRateLimit(response.headers);

    if (response.status >= 200 && response.status < 300) {
      const payload = {
        items: response.data?.items || [],
        total_count: response.data?.total_count || 0,
        rateLimit,
        fetchedAt: new Date().toISOString(),
      };
      searchCache.set(cacheKey, payload);

      return res.status(200).json({
        success: true,
        stale: false,
        fromCache: false,
        rateLimit,
        items: payload.items,
        total_count: payload.total_count,
        fetchedAt: payload.fetchedAt,
      });
    }

    if (cached && isRecoverableStatus(response.status)) {
      return res.status(200).json({
        success: true,
        stale: true,
        fromCache: true,
        rateLimit,
        items: cached.items,
        total_count: cached.total_count,
        fetchedAt: cached.fetchedAt,
        warning:
          response.status === 429 || response.status === 403
            ? "GitHub rate limit hit. Showing last successful results."
            : "GitHub search is temporarily unavailable. Showing last successful results.",
        upstreamStatus: response.status,
      });
    }

    return res.status(response.status === 403 || response.status === 429 ? 429 : 502).json({
      success: false,
      stale: false,
      rateLimit,
      message:
        response.status === 403 || response.status === 429
          ? "GitHub rate limit exceeded. Please retry after the reset window."
          : `GitHub API error: ${response.status}`,
      upstreamStatus: response.status,
      retryAfterSeconds: rateLimit.retryAfterSeconds,
    });
  } catch (error) {
    const cachedKey = buildCacheKey({
      type: String(req.query.type || "repositories").toLowerCase(),
      q: String(req.query.q || "").trim(),
      sort: String(req.query.sort || "stars"),
      order: String(req.query.order || "desc"),
      per_page: Math.min(Math.max(Number(req.query.per_page) || 30, 1), 30),
    });
    const cached = searchCache.get(cachedKey);

    if (cached) {
      return res.status(200).json({
        success: true,
        stale: true,
        fromCache: true,
        rateLimit: cached.rateLimit || null,
        items: cached.items,
        total_count: cached.total_count,
        fetchedAt: cached.fetchedAt,
        warning: "GitHub search failed. Showing last successful results.",
      });
    }

    return res.status(502).json({
      success: false,
      message: "Failed to reach GitHub search",
      error: "A server error occurred",
    });
  }
};

module.exports = {
  searchGitHub,
  buildCacheKey,
  parseRateLimit,
  isRecoverableStatus,
  searchCache,
  CACHE_TTL_SECONDS,
};
