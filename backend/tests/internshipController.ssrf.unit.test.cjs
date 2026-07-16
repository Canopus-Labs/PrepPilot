const test = require("node:test");
const assert = require("node:assert/strict");

test("fetchFromAdzuna uses a fixed Adzuna URL and keeps user input in params", async () => {
  const axios = require("axios");
  const originalGet = axios.get;
  let capturedUrl;
  let capturedConfig;

  axios.get = async (url, config) => {
    capturedUrl = url;
    capturedConfig = config;
    return { data: { results: [], count: 0, page: 1 } };
  };

  try {
    delete require.cache[require.resolve("../controllers/internshipController.js")];
    const controller = require("../controllers/internshipController.js");
    await controller.fetchFromAdzuna("developer", "../evil", "999999", 42);

    assert.equal(capturedUrl, "https://api.adzuna.com/v1/api/jobs/in/search/1");
    assert.equal(capturedConfig.params.what, "developer");
    assert.equal(capturedConfig.params.results_per_page, 42);
  } finally {
    axios.get = originalGet;
  }
});
