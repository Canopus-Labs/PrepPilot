
const sanitizeAiPrompt = (req, res, next) => {
  const sanitize = (value) =>
    value
      .replace(/<[^>]*>?/gm, "")        // remove HTML tags
      .replace(/[^\x20-\x7E\n]/g, "")   // remove hidden control chars
      .trim();

  for (const source of [req.body, req.query]) {
    if (!source) continue;
    for (const key of ["prompt", "role", "topic"]) {
      if (typeof source[key] === "string") {
        source[key] = sanitize(source[key]);
      }
    }
  }

  next();
};

module.exports = {sanitizeAiPrompt};
