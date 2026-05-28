
const sanitizeAiPrompt = (req, res, next) => {
  if (req.body && typeof req.body.prompt === "string") {
    req.body.prompt = req.body.prompt
      .replace(/<[^>]*>?/gm, "")        // remove HTML tags
      .replace(/[^\x20-\x7E\n]/g, "")   // remove hidden control chars
      .trim();
      req.body.role = req.body.role
      .replace(/<[^>]*>?/gm, "")        // remove HTML tags
      .replace(/[^\x20-\x7E\n]/g, "")   // remove hidden control chars
      .trim();
      req.body.topic = req.body.topic
      .replace(/<[^>]*>?/gm, "")        // remove HTML tags
      .replace(/[^\x20-\x7E\n]/g, "")   // remove hidden control chars
      .trim();
  }

  next();
};

module.exports = {sanitizeAiPrompt};