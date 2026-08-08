const rateLimit = require('express-rate-limit');
const { RateLimiterRedis, RateLimiterMemory } = require('rate-limiter-flexible');
const redisClient = require('../config/redis');

// Login endpoint: strict brute-force protection (5 attempts per 15 minutes)
const maxConsecutiveFailsByUsernameAndIP = 5;
let strictLoginLimiterInstance;

if (redisClient) {
    strictLoginLimiterInstance = new RateLimiterRedis({
        storeClient: redisClient,
        keyPrefix: 'login_fail_ip',
        points: maxConsecutiveFailsByUsernameAndIP,
        duration: 60 * 15, // 15 minutes
        blockDuration: 60 * 15, // Block for 15 minutes
    });
} else {
    strictLoginLimiterInstance = new RateLimiterMemory({
        keyPrefix: 'login_fail_ip',
        points: maxConsecutiveFailsByUsernameAndIP,
        duration: 60 * 15,
        blockDuration: 60 * 15,
    });
}

const strictLoginLimiter = async (req, res, next) => {
    const ipAddr = req.ip;
    try {
        const resLimiter = await strictLoginLimiterInstance.get(ipAddr);
        if (resLimiter !== null && resLimiter.consumedPoints >= maxConsecutiveFailsByUsernameAndIP) {
            const retrySecs = Math.round(resLimiter.msBeforeNext / 1000) || 1;
            res.set('Retry-After', String(retrySecs));
            return res.status(429).json({ error: 'Too many login attempts. Your account is temporarily locked. Please try again after 15 minutes.' });
        }
        next();
    } catch (err) {
        next();
    }
};
// Rate-limit key derived from the trusted client IP. req.ip honors
// X-Forwarded-For only from the configured trusted proxy CIDR(s); without one
// it is the direct socket address, so a spoofed header cannot rotate the limit
// bucket. The library's ipKeyGenerator helper masks IPv6 addresses to a subnet
// so IPv6 callers cannot dodge limits by rotating addresses.
const ipKeyGenerator = (req) =>
  rateLimit.ipKeyGenerator(req.ip || req.socket?.remoteAddress || "unknown");

// Login endpoint: strict brute-force protection (10 attempts per 15 minutes)
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 login attempts per window
    keyGenerator: ipKeyGenerator,
    message: { error: 'Too many login attempts. Your account is temporarily locked. Please try again after 15 minutes.' },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skip: (req) => req.method !== 'POST' || req.path !== '/login', // Only apply to POST /login
});

// Authentication endpoints: 50 register/refresh/logout attempts per 15 minutes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 requests per `window`
    keyGenerator: ipKeyGenerator,
    message: { error: 'Too many registration or authentication attempts, please try again after 15 minutes.' },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    skip: (req) => req.method === 'POST' && req.path === '/login', // Skip login, use loginLimiter instead
});

// AI generation endpoints: 20 requests per hour (to control costs)
const aiLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 20, // Limit each IP to 20 requests per `window` (here, per hour)
    keyGenerator: ipKeyGenerator,
    message: { error: 'AI generation limit reached (20 requests per hour) to prevent API abuse. Please try again later.' },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// General API endpoints: 100 requests per 15 minutes
const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    keyGenerator: ipKeyGenerator,
    message: { error: 'Too many requests, please try again after 15 minutes.' },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Sensitive account actions: 10 requests per 15 minutes
const sensitiveAuthLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // Limit each IP to 10 sensitive account requests per window
    keyGenerator: ipKeyGenerator,
    message: { error: 'Too many sensitive account action attempts, please try again after 15 minutes.' },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

module.exports = {
    strictLoginLimiter,
    strictLoginLimiterInstance,
    authLimiter,
    aiLimiter,
    generalLimiter,
    sensitiveAuthLimiter
};
