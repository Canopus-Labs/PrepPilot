export const formatRetryMessage = (retryAfterSeconds, resetAt) => {
  if (retryAfterSeconds && Number.isFinite(retryAfterSeconds)) {
    return `Try again in about ${Math.max(1, Math.ceil(retryAfterSeconds))}s.`;
  }
  if (resetAt) {
    const ms = new Date(resetAt).getTime() - Date.now();
    if (ms > 0) {
      return `Try again in about ${Math.max(1, Math.ceil(ms / 1000))}s.`;
    }
  }
  return "Try again shortly.";
};
