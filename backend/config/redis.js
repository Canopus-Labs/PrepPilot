const Redis = require("ioredis");

let redisClient = null;

try {
    const redisUrl = process.env.REDIS_URL || "redis://localhost:6379";
    redisClient = new Redis(redisUrl, {
        enableOfflineQueue: false,
    });
    
    redisClient.on("error", (err) => {
        console.warn("⚠️ Redis connection error. Strict rate limiting will fallback to memory or be bypassed depending on configuration:", err.message);
    });

    redisClient.on("connect", () => {
        console.log("Redis connected successfully");
    });
} catch (err) {
    console.warn("⚠️ Failed to initialize Redis client:", err.message);
}

module.exports = redisClient;
