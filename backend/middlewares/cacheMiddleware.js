/**
 * Express middleware to set Cache-Control headers for downstream CDNs/proxies.
 * 
 * @param {number} maxAgeSeconds - The number of seconds the response should be cached.
 */
const setCacheControl = (maxAgeSeconds) => {
    return (req, res, next) => {
        // Only cache GET requests
        if (req.method === 'GET') {
            res.setHeader('Cache-Control', `public, max-age=${maxAgeSeconds}`);
        }
        next();
    };
};

module.exports = {
    setCacheControl
};
