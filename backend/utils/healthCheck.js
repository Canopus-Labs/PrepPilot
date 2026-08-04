const os = require("os");
const mongoose = require("mongoose");
const pkg = require("../package.json");

const DB_STATES = {
  0: { code: "disconnected", ok: false },
  1: { code: "connected", ok: true },
  2: { code: "connecting", ok: false },
  3: { code: "disconnecting", ok: false },
  99: { code: "uninitialized", ok: false },
};

const monitor = {
  lastErrorAt: null,
  lastError: null,
  lastStateChangeAt: new Date().toISOString(),
  _attached: false,
};

function getDbState(connection) {
  const readyState =
    connection && typeof connection.readyState === "number"
      ? connection.readyState
      : 99;
  const meta = DB_STATES[readyState] || DB_STATES[99];
  return {
    state: readyState,
    status: meta.code,
    ok: meta.ok,
  };
}

function formatBytes(bytes) {
  if (typeof bytes !== "number" || !Number.isFinite(bytes) || bytes < 0) {
    return "0 B";
  }
  const units = ["B", "KB", "MB", "GB", "TB"];
  let value = bytes;
  let unitIndex = 0;
  while (value >= 1024 && unitIndex < units.length - 1) {
    value /= 1024;
    unitIndex += 1;
  }
  const fixed = Number.isInteger(value) || value >= 10 ? 0 : 1;
  return `${value.toFixed(fixed)} ${units[unitIndex]}`;
}

function formatUptime(totalSeconds) {
  const seconds = Math.max(0, Math.floor(totalSeconds));
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const parts = [];
  if (days) parts.push(`${days}d`);
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  parts.push(`${secs}s`);
  return parts.join(" ");
}

function getUptimeSeconds() {
  return Math.floor(process.uptime());
}

function getMemoryStats() {
  const { rss, heapUsed, heapTotal } = process.memoryUsage();
  return {
    rssBytes: rss,
    heapUsedBytes: heapUsed,
    heapTotalBytes: heapTotal,
    rss: formatBytes(rss),
    heapUsed: formatBytes(heapUsed),
    heapTotal: formatBytes(heapTotal),
    heapUsedPercent:
      heapTotal > 0
        ? Number(((heapUsed / heapTotal) * 100).toFixed(2))
        : 0,
  };
}

function getSystemLoad() {
  return {
    loadAverage: os
      .loadavg()
      .slice(0, 3)
      .map((n) => Number(n.toFixed(2))),
    freeMemoryBytes: os.freemem(),
    totalMemoryBytes: os.totalmem(),
    cpuCount: os.cpus().length,
  };
}

function attachDbHealthMonitor(connection) {
  if (!connection || monitor._attached) {
    return monitor;
  }
  monitor._attached = true;
  connection.on("connected", () => {
    monitor.lastStateChangeAt = new Date().toISOString();
  });
  connection.on("disconnected", () => {
    monitor.lastStateChangeAt = new Date().toISOString();
  });
  connection.on("reconnected", () => {
    monitor.lastStateChangeAt = new Date().toISOString();
  });
  connection.on("error", (err) => {
    monitor.lastErrorAt = new Date().toISOString();
    monitor.lastError = err.message;
  });
  return monitor;
}

function buildHealthPayload(connection, options = {}) {
  const db = getDbState(connection);
  const memory = getMemoryStats();
  const uptime = getUptimeSeconds();
  const ok = db.ok;
  const host =
    connection && typeof connection.host === "string"
      ? connection.host
      : null;

  return {
    status: ok ? "ok" : "degraded",
    ok,
    uptimeSeconds: uptime,
    uptimeHuman: formatUptime(uptime),
    timestamp: new Date().toISOString(),
    version: options.version || pkg.version || "unknown",
    runtime: {
      node: process.version,
      platform: `${os.platform()} (${os.arch()})`,
      pid: process.pid,
      cpus: os.cpus().length,
    },
    memory,
    system: getSystemLoad(),
    database: {
      state: db.state,
      status: db.status,
      ok: db.ok,
      host,
      lastErrorAt: monitor.lastErrorAt,
      lastStateChangeAt: monitor.lastStateChangeAt,
    },
  };
}

module.exports = {
  DB_STATES,
  attachDbHealthMonitor,
  buildHealthPayload,
  formatBytes,
  formatUptime,
  getDbState,
  getMemoryStats,
  getSystemLoad,
  getUptimeSeconds,
  monitor,
};
