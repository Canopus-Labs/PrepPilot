const rateLimit = require('express-rate-limit');

// Attempt to load Redis store for distributed deployments.
// When REDIS_URL is set and rate-limit-redis is installed, rate-limit counters
// are shared across all instances. Falls back to the default in-memory store
// when Redis is not configured (single-instance development behavior unchanged).
let rateLimitStore;
try {
    const { RedisStore } = require('rate-limit-redis');
    if (process.env.REDIS_URL) {
        const { createClient } = require('redis');
        const redisClient = createClient({ url: process.env.REDIS_URL });
        redisClient.on('error', (err) => console.error('[rateLimiter] Redis client error:', err.message));
        // Connect asynchronously so server startup is not blocked
        redisClient.connect().catch((err) => console.error('[rateLimiter] Redis connect error:', err.message));
        rateLimitStore = new RedisStore({ sendUpstreamResponseHeaders: false, prefix: 'rl:' });
        rateLimitStore.initializeClient({ sendUpstreamResponseHeaders: false });
        console.log('[rateLimiter] Redis store enabled via REDIS_URL');
    }
} catch (err) {
    // rate-limit-redis not installed or Redis unavailable — use default in-memory store
    rateLimitStore = undefined;
}

const storeOption = rateLimitStore ? { store: rateLimitStore } : {};

// Authentication endpoints: 50 login/register attempts per 15 minutes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 requests per `window`
    message: { error: 'Too many login/registration attempts, please try again after 15 minutes.' },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    ...storeOption,
});

// AI generation endpoints: 20 requests per hour (to control costs)
const aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // Limit each IP to 20 requests per `window` (here, per hour)
    message: { error: 'AI generation limit reached (20 requests per hour) to prevent API abuse. Please try again later.' },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    ...storeOption,
});

// General API endpoints: 100 requests per 15 minutes
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: { error: 'Too many requests, please try again after 15 minutes.' },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    ...storeOption,
});

// Sensitive account actions: 10 requests per 15 minutes
const sensitiveAuthLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 sensitive account requests per window
    message: { error: 'Too many sensitive account action attempts, please try again after 15 minutes.' },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    ...storeOption,
});

module.exports = {
    authLimiter,
    aiLimiter,
    generalLimiter,
    sensitiveAuthLimiter
};
