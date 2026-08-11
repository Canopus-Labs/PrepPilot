/**
 * Express middleware to set Cache-Control headers for downstream CDNs/proxies.
 * 
 * @param {number} maxAgeSeconds - The number of seconds the response should be cached.
 */
const setCacheControl = (maxAgeSeconds) => {
    return (req, res, next) => {
        // Only cache GET requests
        if (req.method === 'GET') {
            const originalJson = res.json;
            const originalSend = res.send;

            const setHeaderIfSuccess = () => {
                if (res.statusCode >= 200 && res.statusCode < 300 && !res.headersSent) {
                    res.setHeader('Cache-Control', `public, max-age=${maxAgeSeconds}`);
                }
            };

            res.json = function(body) {
                setHeaderIfSuccess();
                return originalJson.call(this, body);
            };

            res.send = function(body) {
                setHeaderIfSuccess();
                return originalSend.call(this, body);
            };
        }
        next();
    };
};

module.exports = {
    setCacheControl
};
