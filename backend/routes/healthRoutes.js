const express = require("express");
const mongoose = require("mongoose");
const {
  attachDbHealthMonitor,
  buildHealthPayload,
  getUptimeSeconds,
  monitor,
} = require("../utils/healthCheck");

attachDbHealthMonitor(mongoose.connection);

const router = express.Router();

router.get("/", (req, res) => {
  const payload = buildHealthPayload(mongoose.connection, {
    version: process.env.npm_package_version,
  });
  res.status(200).json(payload);
});

router.get("/live", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptimeSeconds: getUptimeSeconds(),
    timestamp: new Date().toISOString(),
  });
});

router.get("/ready", (req, res) => {
  const db = mongoose.connection;
  const connected = db.readyState === 1;
  res.status(connected ? 200 : 503).json({
    status: connected ? "ok" : "unavailable",
    uptimeSeconds: getUptimeSeconds(),
    database: {
      state: db.readyState,
      connected,
      lastErrorAt: monitor.lastErrorAt,
    },
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
