const axios = require("axios");
const JobCache = require("../models/JobCache");

const ADZUNA_APP_ID  = process.env.ADZUNA_APP_ID;
const ADZUNA_API_KEY = process.env.ADZUNA_API_KEY;
const ADZUNA_COUNTRY = process.env.ADZUNA_COUNTRY || "in";
const CACHE_TTL_MS   = 24 * 60 * 60 * 1000;

const isAdzunaConfigured = () => Boolean(ADZUNA_APP_ID && ADZUNA_API_KEY);

async function fetchFromAdzuna(role, country = ADZUNA_COUNTRY, page = 1, resultsPerPage = 10) {
  const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}`;
  const { data } = await axios.get(url, {
    params: {
      app_id:   ADZUNA_APP_ID,
      app_key:  ADZUNA_API_KEY,
      what:     role,
      results_per_page: resultsPerPage,
    },
  });
  return {
    jobs: (data.results || []).map((j) => ({
      id:            j.id,
      title:         j.title,
      company:       j.company?.display_name || "Unknown",
      location:      j.location?.display_name || "Remote",
      salary_min:    j.salary_min || null,
      salary_max:    j.salary_max || null,
      description:   j.description || "",
      employment_type: j.contract_type || j.contract_time || null,
      redirect_url:  j.redirect_url,
      created:       j.created,
    })),
    count: data.count || 0,
    page: data.page || page,
  };
}

exports.getInternships = async (req, res) => {
  try {
    if (!isAdzunaConfigured()) {
      return res.json({
        internships: [],
        role: "",
        source: "disabled",
        message:
          "Internship listings are not configured on this server. Set ADZUNA_APP_ID and ADZUNA_API_KEY to enable them.",
      });
    }

    const role = req.query.keyword || req.query.role || "intern";
    const country = req.query.country || ADZUNA_COUNTRY;
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.per_page || 10);

    const cacheKey = `intern|${role.toLowerCase()}|${country}|${page}|${perPage}`;

    const cached = await JobCache.findOne({ cacheKey });
    if (cached && Date.now() - cached.fetchedAt.getTime() < CACHE_TTL_MS) {
      return res.json({ internships: cached.jobs, role, page, source: "cache" });
    }

    const { jobs, count } = await fetchFromAdzuna(role, country, page, perPage);

    await JobCache.findOneAndUpdate(
      { cacheKey },
      { jobs, fetchedAt: new Date() },
      { upsert: true, new: true }
    );

    return res.json({ internships: jobs, role, page, total: count, source: "api" });
  } catch (err) {
    console.error("[Internships] getInternships error:", err?.message || err);
    res.status(500).json({ message: "Failed to fetch internships", error: err.message });
  }
};
