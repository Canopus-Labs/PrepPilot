const sanitize = (value) =>
  value
    .replace(/<[^>]*>?/gm, "")      // remove HTML tags
    .replace(/[^\x20-\x7E\n]/g, "") // remove hidden control chars
    .trim();

const sanitizeAiPrompt = (req, res, next) => {
  if (req.body && typeof req.body.prompt === "string") {
    req.body.prompt = sanitize(req.body.prompt);
  }

  if (req.body && typeof req.body.role === "string") {
    req.body.role = sanitize(req.body.role);
  }

  if (req.body && typeof req.body.topic === "string") {
    req.body.topic = sanitize(req.body.topic);
  }

  next();
};

module.exports = { sanitizeAiPrompt };