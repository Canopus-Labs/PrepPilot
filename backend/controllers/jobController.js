const axios = require("axios");
const Session = require("../models/Session");
const JobCache = require("../models/JobCache");

const ADZUNA_APP_ID  = process.env.ADZUNA_APP_ID;
const ADZUNA_API_KEY = process.env.ADZUNA_API_KEY;
const ADZUNA_COUNTRY = (process.env.ADZUNA_COUNTRY || "in").toLowerCase().trim();
const CACHE_TTL_MS   = 24 * 60 * 60 * 1000;

// Supported Adzuna ISO country codes
const ALLOWED_ADZUNA_COUNTRIES = [
  "at", "au", "be", "br", "ca", "ch", "de", "es", "fr", "gb",
  "in", "it", "mx", "nl", "nz", "pl", "ru", "sg", "us", "za",
];

// The Jobs feature is optional: without Adzuna credentials it stays dormant
// instead of crashing the server or spamming failed API calls.
const isAdzunaConfigured = () => Boolean(ADZUNA_APP_ID && ADZUNA_API_KEY);

// Bound the set of cache keys: role/country are client-controlled, so we trim,
// normalize, and whitelist them before they touch the JobCache collection.
const normalizeRole = (role) => {
  if (typeof role !== "string") return "";
  const trimmed = role.trim().toLowerCase();
  if (trimmed.length === 0 || trimmed.length > 64) return "";
  if (!/^[a-z0-9\s+#.,&()/'\-]*$/.test(trimmed)) return "";
  return trimmed;
};

const normalizeCountry = (country) => {
  if (typeof country !== "string") return ADZUNA_COUNTRY;
  const trimmed = country.trim().toLowerCase();
  if (!/^[a-z]{2}$/.test(trimmed)) return ADZUNA_COUNTRY;
  return trimmed;
};

async function fetchFromAdzuna(role, country = ADZUNA_COUNTRY) {
  const normalizedCountry = country.toLowerCase().trim();
  const url = `https://api.adzuna.com/v1/api/jobs/${normalizedCountry}/search/1`;
  const { data } = await axios.get(url, {
    params: {
      app_id:           ADZUNA_APP_ID,
      app_key:          ADZUNA_API_KEY,
      what:             role,
      results_per_page: 10,
    },
  });
  return (data.results || []).map((j) => ({
    id:           j.id,
    title:        j.title,
    company:      j.company?.display_name || "Unknown",
    location:     j.location?.display_name || "Remote",
    salary_min:   j.salary_min || null,
    salary_max:   j.salary_max ?? null,
    description:  j.description ?? "",
    redirect_url: j.redirect_url,
    created:      j.created,
  }));
}

exports.getJobs = async (req, res) => {
  try {
    if (!isAdzunaConfigured()) {
      return res.json({
        jobs: [],
        role: "",
        source: "disabled",
        message:
          "Job listings are not configured on this server. Set ADZUNA_APP_ID and ADZUNA_API_KEY to enable them.",
      });
    }

    const userId = req.user._id;

    const latestSession = await Session.findOne({ user: userId })
      .sort({ createdAt: -1 })
      .select("role");

    const role = req.query.role || latestSession?.role || "software engineer";
    const country = (req.query.country || ADZUNA_COUNTRY).toLowerCase().trim();

    // Validate country against supported Adzuna codes
    if (!ALLOWED_ADZUNA_COUNTRIES.includes(country)) {
      return res.status(400).json({
        message: `Invalid or unsupported country parameter '${country}'. Supported country codes are: ${ALLOWED_ADZUNA_COUNTRIES.join(", ")}`,
      });
    }

    const cacheKey = `${role.toLowerCase()}|${country}`;

    const cached = await JobCache.findOne({ cacheKey });
    if (cached && Date.now() - cached.fetchedAt.getTime() < CACHE_TTL_MS) {
      return res.json({ jobs: cached.jobs, role, source: "cache" });
    }

    const jobs = await fetchFromAdzuna(role, country);

    await JobCache.findOneAndUpdate(
      { cacheKey },
      { jobs, fetchedAt: new Date() },
      { upsert: true, new: true }
    );

    return res.json({ jobs, role, source: "api" });
  } catch (err) {
    console.error("[Jobs] getJobs error:", err.message);
    res.status(500).json({ message: "Failed to fetch jobs" });
  }
};

exports.refreshJobCache = async () => {
  if (!isAdzunaConfigured()) return;
  try {
    const roles = await Session.distinct("role", {
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    });

    for (const role of roles) {
      const normalizedRole = normalizeRole(role);
      if (!normalizedRole) continue;
      const cacheKey = `${normalizedRole}|${ADZUNA_COUNTRY}`;
      const jobs = await fetchFromAdzuna(normalizedRole);
      await JobCache.findOneAndUpdate(
        { cacheKey },
        { jobs, fetchedAt: new Date() },
        { upsert: true, new: true }
      );

    }
  } catch (err) {
    console.error("[JobCron] Refresh failed:", err.message);
  }
};