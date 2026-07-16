const axios = require("axios");
const JobCache = require("../models/JobCache");

const ADZUNA_APP_ID  = process.env.ADZUNA_APP_ID;
const ADZUNA_API_KEY = process.env.ADZUNA_API_KEY;
const DEFAULT_ADZUNA_COUNTRY = "in";
const ADZUNA_API_BASE_URL = "https://api.adzuna.com/v1/api/jobs";
const ADZUNA_COUNTRY_PATHS = Object.freeze({
  au: "/au/search",
  at: "/at/search",
  be: "/be/search",
  br: "/br/search",
  ca: "/ca/search",
  ch: "/ch/search",
  de: "/de/search",
  es: "/es/search",
  fr: "/fr/search",
  gb: "/gb/search",
  in: "/in/search",
  it: "/it/search",
  nl: "/nl/search",
  nz: "/nz/search",
  pl: "/pl/search",
  ru: "/ru/search",
  sg: "/sg/search",
  us: "/us/search",
  za: "/za/search",
});
const ALLOWED_ADZUNA_COUNTRIES = new Set(Object.keys(ADZUNA_COUNTRY_PATHS));
const ALLOWED_PAGE_VALUES = new Set(Array.from({ length: 1000 }, (_, index) => index + 1));
const CACHE_TTL_MS   = 24 * 60 * 60 * 1000;

const isAdzunaConfigured = () => Boolean(ADZUNA_APP_ID && ADZUNA_API_KEY);

const normalizeCountry = (country) => {
  const normalizedCountry = String(country || DEFAULT_ADZUNA_COUNTRY).trim().toLowerCase();
  return ALLOWED_ADZUNA_COUNTRIES.has(normalizedCountry)
    ? normalizedCountry
    : DEFAULT_ADZUNA_COUNTRY;
};

const normalizePage = (page) => {
  const normalizedPage = Number.parseInt(page, 10);
  return ALLOWED_PAGE_VALUES.has(normalizedPage) ? normalizedPage : 1;
};

const ADZUNA_COUNTRY = normalizeCountry(process.env.ADZUNA_COUNTRY || DEFAULT_ADZUNA_COUNTRY);

async function fetchFromAdzuna(role, country = ADZUNA_COUNTRY, page = 1, resultsPerPage = 10) {
  const safeCountry = normalizeCountry(country);
  const safePage = normalizePage(page);
  const countryPath = ADZUNA_COUNTRY_PATHS[safeCountry] || ADZUNA_COUNTRY_PATHS[DEFAULT_ADZUNA_COUNTRY];
  const url = `${ADZUNA_API_BASE_URL}${countryPath}/${safePage}`;
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
    page: data.page || safePage,
  };
}

exports.fetchFromAdzuna = fetchFromAdzuna;

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
    const country = normalizeCountry(req.query.country || ADZUNA_COUNTRY);
    const page = normalizePage(req.query.page || 1);
    const perPage = Number(req.query.per_page || 10);

    const cacheKey = `intern|${String(role).toLowerCase()}|${country}|${page}|${perPage}`;

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
