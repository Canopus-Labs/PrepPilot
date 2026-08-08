const express = require("express");
const router = express.Router();
const { searchGitHub } = require("../controllers/githubSearchController");

router.get("/search", searchGitHub);

module.exports = router;
