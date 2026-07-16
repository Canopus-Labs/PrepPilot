const { describe, it, expect } = require("vitest");

const { fetchFromAdzuna } = require("../controllers/internshipController.js");

describe("fetchFromAdzuna SSRF hardening", () => {
  it("builds a fixed Adzuna URL and keeps user input in params", async () => {
    const axios = require("axios");
    const originalGet = axios.get;
    axios.get = async (url, config) => {
      expect(url).toBe("https://api.adzuna.com/v1/api/jobs/in/search/1");
      expect(config.params.what).toBe("developer");
      expect(config.params.results_per_page).toBe(42);
      return { data: { results: [], count: 0, page: 1 } };
    };

    try {
      await fetchFromAdzuna("developer", "../evil", "999999", 42);
    } finally {
      axios.get = originalGet;
    }
  });
});
