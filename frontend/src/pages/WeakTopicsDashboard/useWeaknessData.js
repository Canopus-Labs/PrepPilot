import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";

/**
 * useWeaknessData
 *
 * Fetches and manages all data for the Weak Topics Dashboard.
 * - Analysis + revision queue fire in parallel on mount.
 * - AI recommendations fire only after analysis resolves.
 * - AI failure is silent (aiRecs stays null, usedFallback shown via flag on response).
 */
const useWeaknessData = () => {
  const [analysis, setAnalysis] = useState(null);
  const [revisionQueue, setRevisionQueue] = useState({ items: [], totalItems: 0, page: 1 });
  const [aiRecs, setAiRecs] = useState(null);

  const [loadingAnalysis, setLoadingAnalysis] = useState(true);
  const [loadingQueue, setLoadingQueue] = useState(true);
  const [loadingAi, setLoadingAi] = useState(true);
  const [error, setError] = useState(null);

  // Step 1: fetch analysis + first page of queue in parallel
  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const [analysisRes, queueRes] = await Promise.all([
          axiosInstance.get(API_PATHS.WEAKNESS.ANALYSIS),
          axiosInstance.get(API_PATHS.WEAKNESS.REVISION_QUEUE(1)),
        ]);

        if (cancelled) return;
        setAnalysis(analysisRes.data);
        setRevisionQueue({ ...queueRes.data, page: 1 });
      } catch (err) {
        if (!cancelled) setError(err);
      } finally {
        if (!cancelled) {
          setLoadingAnalysis(false);
          setLoadingQueue(false);
        }
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  // Step 2: fire AI recommendations only after analysis is ready
  useEffect(() => {
    if (!analysis) return;

    let cancelled = false;

    const loadAi = async () => {
      try {
        const res = await axiosInstance.post(API_PATHS.WEAKNESS.AI_RECOMMENDATIONS);
        if (!cancelled) setAiRecs(res.data);
      } catch {
        // Silent failure — dashboard will show the empty state for AI section
        if (!cancelled) setAiRecs(null);
      } finally {
        if (!cancelled) setLoadingAi(false);
      }
    };

    loadAi();
    return () => { cancelled = true; };
  }, [analysis]);

  // Load additional pages of the revision queue (appends to existing items)
  const loadMoreQueue = useCallback(async (nextPage) => {
    try {
      const res = await axiosInstance.get(API_PATHS.WEAKNESS.REVISION_QUEUE(nextPage));
      setRevisionQueue((prev) => ({
        ...res.data,
        page: nextPage,
        items: [...prev.items, ...res.data.items],
      }));
    } catch (err) {
      console.error("[WeaknessData] loadMoreQueue error:", err);
    }
  }, []);

  return {
    analysis,
    revisionQueue,
    aiRecs,
    loadingAnalysis,
    loadingQueue,
    loadingAi,
    error,
    loadMoreQueue,
  };
};

export default useWeaknessData;
