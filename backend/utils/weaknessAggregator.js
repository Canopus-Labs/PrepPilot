/**
 * weaknessAggregator.js
 *
 * Pure aggregation logic for the Weakness Detection & Smart Revision feature.
 * All functions are pure (no DB calls, no Express) so they are easily testable.
 */

/**
 * Determine confidence label from a numeric score.
 * @param {number|null} score
 * @returns {"Low"|"Medium"|"Good"|"insufficient-data"}
 */
function getConfidenceLevel(score) {
  if (score === null || score === undefined) return "insufficient-data";
  if (score < 50) return "Low";
  if (score < 70) return "Medium";
  return "Good";
}

/**
 * Compute trend by comparing the two most-recent per-topic session scores.
 * @param {number[]} chronologicalScores  Scores sorted oldest→newest.
 * @returns {"improving"|"stable"|"declining"|"new"}
 */
function computeTrend(chronologicalScores) {
  if (chronologicalScores.length < 2) return "new";
  const last = chronologicalScores[chronologicalScores.length - 1];
  const prev = chronologicalScores[chronologicalScores.length - 2];
  const delta = last - prev;
  if (delta > 5) return "improving";
  if (delta < -5) return "declining";
  return "stable";
}

/**
 * Cross-reference UserSheetProgress with Sheet metadata to produce
 * per-topic-title DSA completion rates.
 *
 * @param {object[]} sheetProgressList  Array of UserSheetProgress documents.
 * @param {object[]} sheets             Array of Sheet documents keyed by sheet.id.
 * @returns {Object.<string, {completed:number, total:number}>}
 */
function buildDsaTopicMap(sheetProgressList, sheets) {
  const sheetById = {};
  sheets.forEach((s) => {
    sheetById[s.id] = s;
  });

  const dsaMap = {}; // topic title → { completed, total }

  sheetProgressList.forEach((progress) => {
    const sheet = sheetById[progress.sheetId];
    if (!sheet) return;

    const completed = progress.completedTopics || {};

    (sheet.sections || []).forEach((section, sIdx) => {
      (section.topics || []).forEach((topic, tIdx) => {
        const topicTitle = topic.title;
        if (!dsaMap[topicTitle]) {
          dsaMap[topicTitle] = { completed: 0, total: 0 };
        }

        (topic.subtopics || []).forEach((_, subIdx) => {
          const key = `${sIdx}-${tIdx}-${subIdx}`;
          dsaMap[topicTitle].total++;
          if (completed[key]) dsaMap[topicTitle].completed++;
        });
      });
    });
  });

  return dsaMap;
}

/**
 * Build a flashcard weakness map: category → { weakCount, criticalCount }
 * weak = efactor < 2.0, critical = efactor < 1.5
 *
 * @param {object[]} flashcards
 * @returns {Object.<string, {weakCount:number, criticalCount:number}>}
 */
function buildFlashcardWeakMap(flashcards) {
  const map = {};
  flashcards.forEach((card) => {
    const cat = card.category || "General";
    if (!map[cat]) map[cat] = { weakCount: 0, criticalCount: 0 };
    if (card.efactor < 2.0) map[cat].weakCount++;
    if (card.efactor < 1.5) map[cat].criticalCount++;
  });
  return map;
}

/**
 * Main aggregation function.
 *
 * @param {object[]} sessions            Completed AdaptiveInterviewSession docs.
 * @param {object[]} sheetProgressList   UserSheetProgress docs for the user.
 * @param {object[]} sheets              Sheet docs matching those progress entries.
 * @param {object[]} flashcards          Flashcard docs for the user.
 * @returns {{
 *   topicMap: Object,
 *   readinessScore: number,
 *   trendData: object[],
 *   totalSessionsCompleted: number,
 * }}
 */
function aggregateTopicProfile(sessions, sheetProgressList, sheets, flashcards) {
  // ── Step 1: Adaptive interview signal ────────────────────────────────────
  // topicMap[topic] = { scores: [], sessionCount, lastSeenAt, perSessionScores: [{score, date}] }
  const topicMap = {};

  // Sort sessions chronologically for trend calculation
  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
  );

  sortedSessions.forEach((session) => {
    const perf = session.finalReport?.topicPerformance;
    if (!perf || typeof perf !== "object") return;

    Object.entries(perf).forEach(([topic, score]) => {
      if (typeof score !== "number") return;
      if (!topicMap[topic]) {
        topicMap[topic] = {
          scores: [],
          sessionCount: 0,
          lastSeenAt: null,
          dsaCompletionRate: null,
          flashcardWeakCount: 0,
          flashcardCriticalCount: 0,
        };
      }
      topicMap[topic].scores.push(score);
      topicMap[topic].sessionCount++;
      const sessionDate = session.updatedAt || session.createdAt;
      if (
        !topicMap[topic].lastSeenAt ||
        new Date(sessionDate) > new Date(topicMap[topic].lastSeenAt)
      ) {
        topicMap[topic].lastSeenAt = sessionDate;
      }
    });
  });

  // ── Step 2: DSA sheet signal ──────────────────────────────────────────────
  const dsaTopicMap = buildDsaTopicMap(sheetProgressList, sheets);

  Object.entries(dsaTopicMap).forEach(([topicTitle, { completed, total }]) => {
    if (total === 0) return;
    const rate = Math.round((completed / total) * 100);

    if (!topicMap[topicTitle]) {
      topicMap[topicTitle] = {
        scores: [],
        sessionCount: 0,
        lastSeenAt: null,
        dsaCompletionRate: null,
        flashcardWeakCount: 0,
        flashcardCriticalCount: 0,
      };
    }
    topicMap[topicTitle].dsaCompletionRate = rate;
  });

  // ── Step 3: Flashcard signal ──────────────────────────────────────────────
  const flashcardWeakMap = buildFlashcardWeakMap(flashcards);

  Object.entries(flashcardWeakMap).forEach(([cat, { weakCount, criticalCount }]) => {
    if (!topicMap[cat]) {
      topicMap[cat] = {
        scores: [],
        sessionCount: 0,
        lastSeenAt: null,
        dsaCompletionRate: null,
        flashcardWeakCount: 0,
        flashcardCriticalCount: 0,
      };
    }
    topicMap[cat].flashcardWeakCount = weakCount;
    topicMap[cat].flashcardCriticalCount = criticalCount;
  });

  // ── Step 4: Compute avgScore per topic ────────────────────────────────────
  const topicResults = [];

  Object.entries(topicMap).forEach(([topic, data]) => {
    let avgScore = null;
    const hasInterviewData = data.scores.length > 0;
    const hasDsaData = data.dsaCompletionRate !== null;

    if (hasInterviewData) {
      const interviewAvg =
        data.scores.reduce((a, b) => a + b, 0) / data.scores.length;
      if (hasDsaData) {
        avgScore = Math.round(interviewAvg * 0.7 + data.dsaCompletionRate * 0.3);
      } else {
        avgScore = Math.round(interviewAvg);
      }
    } else if (hasDsaData) {
      avgScore = data.dsaCompletionRate;
    }
    // null = insufficient data

    const confidenceLevel = getConfidenceLevel(avgScore);
    const trend = computeTrend(data.scores);

    // Weak classification
    const isWeak =
      (avgScore !== null && avgScore < 70) ||
      (data.dsaCompletionRate !== null && data.dsaCompletionRate < 40) ||
      data.flashcardWeakCount >= 3;

    // Exclude topics with zero signal from the weak ranking (not started ≠ weak)
    const hasAnySignal =
      data.sessionCount > 0 ||
      data.flashcardWeakCount > 0 ||
      (data.dsaCompletionRate !== null && data.dsaCompletionRate > 0);

    topicResults.push({
      topic,
      avgScore,
      sessionCount: data.sessionCount,
      dsaCompletionRate: data.dsaCompletionRate,
      flashcardWeakCount: data.flashcardWeakCount,
      confidenceLevel,
      trend,
      isWeak: isWeak && hasAnySignal,
      hasAnySignal,
    });
  });

  // ── Step 5: Readiness score ───────────────────────────────────────────────
  let readinessScore = 0;
  const topicsWithSessions = topicResults.filter((t) => t.sessionCount > 0);

  if (topicsWithSessions.length > 0) {
    const totalWeight = topicsWithSessions.reduce((s, t) => s + t.sessionCount, 0);
    const weightedSum = topicsWithSessions.reduce(
      (s, t) => s + (t.avgScore || 0) * t.sessionCount,
      0
    );
    readinessScore = Math.round(weightedSum / totalWeight);
  } else {
    const dsaTopics = topicResults.filter((t) => t.dsaCompletionRate !== null);
    if (dsaTopics.length > 0) {
      readinessScore = Math.round(
        dsaTopics.reduce((s, t) => s + t.dsaCompletionRate, 0) / dsaTopics.length
      );
    }
  }

  // ── Step 6: Trend data (last 10 sessions) ─────────────────────────────────
  const trendData = sortedSessions.slice(-10).map((session, idx) => ({
    sessionIndex: idx + 1,
    score: session.finalReport?.totalScore ?? 0,
    date: session.updatedAt || session.createdAt,
  }));

  return {
    topicMap: topicResults,
    readinessScore,
    trendData,
    totalSessionsCompleted: sessions.length,
  };
}

/**
 * Build a paginated, prioritized revision queue from the topic map.
 *
 * @param {object[]} topicResults    Output of aggregateTopicProfile().topicMap.
 * @param {object[]} sheetProgressList
 * @param {object[]} sheets
 * @param {object[]} flashcards
 * @param {number}   page            1-indexed page number.
 * @param {number}   limit           Items per page.
 * @returns {{ items: object[], totalItems: number }}
 */
function buildRevisionQueue(topicResults, sheetProgressList, sheets, flashcards, page = 1, limit = 10) {
  const items = [];

  // Build a quick lookup for sheet progress
  const sheetById = {};
  sheets.forEach((s) => { sheetById[s.id] = s; });

  const completedKeysSet = new Set();
  sheetProgressList.forEach((progress) => {
    Object.keys(progress.completedTopics || {}).forEach((key) => {
      completedKeysSet.add(`${progress.sheetId}::${key}`);
    });
  });

  // Sort weak topics by avgScore ascending (lowest first = highest priority)
  const weakTopics = topicResults
    .filter((t) => t.isWeak)
    .sort((a, b) => (a.avgScore ?? 0) - (b.avgScore ?? 0));

  // Helper: determine priority from topic data
  const getPriority = (topic) => {
    if (topic.avgScore !== null && topic.avgScore < 50) return "high";
    if (topic.avgScore !== null && topic.avgScore < 70) return "medium";
    if (topic.flashcardCriticalCount > 0) return "high";
    if (topic.flashcardWeakCount > 0) return "medium";
    return "low";
  };

  weakTopics.forEach((topicData) => {
    const priority = getPriority(topicData);

    // 1. DSA subtopics for this topic (uncompleted, Hard first)
    sheetProgressList.forEach((progress) => {
      const sheet = sheetById[progress.sheetId];
      if (!sheet) return;

      (sheet.sections || []).forEach((section, sIdx) => {
        (section.topics || []).forEach((topic, tIdx) => {
          if (topic.title.toLowerCase() !== topicData.topic.toLowerCase()) return;

          // Collect uncompleted subtopics, sort Hard→Medium→Easy
          const uncompleted = [];
          (topic.subtopics || []).forEach((sub, subIdx) => {
            const key = `${sIdx}-${tIdx}-${subIdx}`;
            const globalKey = `${progress.sheetId}::${key}`;
            if (!completedKeysSet.has(globalKey)) {
              uncompleted.push({ sub, key: globalKey });
            }
          });

          const diffOrder = { Hard: 0, Medium: 1, Easy: 2 };
          uncompleted
            .sort(
              (a, b) =>
                (diffOrder[a.sub.difficulty] ?? 1) -
                (diffOrder[b.sub.difficulty] ?? 1)
            )
            .slice(0, 3) // max 3 subtopics per topic to keep queue concise
            .forEach(({ sub }) => {
              items.push({
                type: "dsa-subtopic",
                title: sub.title,
                topic: topicData.topic,
                priority,
                links: sub.links
                  ? {
                      gfg: sub.links.gfg || null,
                      leetcode: sub.links.leetcode || null,
                      youtube: sub.links.youtube || null,
                    }
                  : null,
              });
            });
        });
      });
    });

    // 2. Adaptive topic retry suggestion
    if (topicData.sessionCount > 0) {
      items.push({
        type: "adaptive-topic",
        title: `Practice ${topicData.topic} in an adaptive session`,
        topic: topicData.topic,
        priority,
        links: null,
      });
    }

    // 3. Due flashcards for this topic
    const now = new Date();
    const dueCards = flashcards.filter(
      (c) =>
        (c.category || "General").toLowerCase() === topicData.topic.toLowerCase() &&
        c.efactor < 2.0 &&
        new Date(c.dueDate) <= now
    );
    if (dueCards.length > 0) {
      items.push({
        type: "flashcard-review",
        title: `Review ${dueCards.length} due flashcard${dueCards.length > 1 ? "s" : ""} for ${topicData.topic}`,
        topic: topicData.topic,
        priority: dueCards.some((c) => c.efactor < 1.5) ? "high" : "medium",
        links: null,
      });
    }
  });

  const totalItems = items.length;
  const start = (page - 1) * limit;
  const paginatedItems = items.slice(start, start + limit);

  return { items: paginatedItems, totalItems };
}

module.exports = {
  aggregateTopicProfile,
  buildRevisionQueue,
  getConfidenceLevel,
  computeTrend,
};
