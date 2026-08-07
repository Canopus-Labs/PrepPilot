const MAX_IMPORT_ITEMS = 500;
const MAX_SHEET_ID_LENGTH = 100;

function clampPercentage(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return 0;
  return Math.max(0, Math.min(100, Math.round(num * 100) / 100));
}

function normalizeCompletedTopics(value) {
  if (
    value != null &&
    typeof value === "object" &&
    !Array.isArray(value)
  ) {
    return value;
  }
  return {};
}

function normalizeProgressItem(item, index) {
  if (!item || typeof item !== "object" || Array.isArray(item)) {
    return { ok: false, index, reason: "entry is not an object" };
  }
  const sheetId = typeof item.sheetId === "string" ? item.sheetId.trim() : "";
  if (!sheetId || sheetId.length > MAX_SHEET_ID_LENGTH) {
    return { ok: false, index, reason: "sheetId is missing or too long" };
  }
  return {
    ok: true,
    index,
    value: {
      sheetId,
      followed: item.followed === true,
      completedTopics: normalizeCompletedTopics(item.completedTopics),
      percentage: clampPercentage(item.percentage),
    },
  };
}

function normalizeProgressItems(items) {
  if (!Array.isArray(items)) {
    return { items: [], errors: ["payload.items must be an array"] };
  }
  if (items.length > MAX_IMPORT_ITEMS) {
    return {
      items: [],
      errors: [`payload.items exceeds limit of ${MAX_IMPORT_ITEMS}`],
    };
  }

  const normalized = [];
  const errors = [];
  items.forEach((item, index) => {
    const result = normalizeProgressItem(item, index);
    if (result.ok) {
      normalized.push(result.value);
    } else {
      errors.push(`entry at index ${result.index}: ${result.reason}`);
    }
  });
  return { items: normalized, errors };
}

function buildBulkOps(userId, items) {
  return items.map((item) => ({
    updateOne: {
      filter: { userId, sheetId: item.sheetId },
      update: {
        $set: {
          followed: item.followed,
          completedTopics: item.completedTopics,
          percentage: item.percentage,
        },
      },
      upsert: true,
    },
  }));
}

module.exports = {
  MAX_IMPORT_ITEMS,
  MAX_SHEET_ID_LENGTH,
  buildBulkOps,
  clampPercentage,
  normalizeCompletedTopics,
  normalizeProgressItem,
  normalizeProgressItems,
};
