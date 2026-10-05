import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  TrendingDown,
  Target,
  BookOpen,
  BarChart3,
  AlertCircle,
  TrendingUp,
  Minus,
} from "lucide-react";
import { UserContext } from "../../context/userContext";
import useWeaknessData from "./useWeaknessData";
import TopicBarChart from "./TopicBarChart";
import TrendLineChart from "./TrendLineChart";
import RevisionQueueList from "./RevisionQueueList";

/* ── Skeleton pulse block ─────────────────────────────────────────────── */
const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded-xl ${className}`} />
);

/* ── Stat card ────────────────────────────────────────────────────────── */
const StatCard = ({ icon: Icon, iconClass, label, value, loading }) => (
  <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">
    {loading ? (
      <>
        <Skeleton className="w-8 h-8 rounded-full mx-auto mb-3" />
        <Skeleton className="h-4 w-24 mx-auto mb-3" />
        <Skeleton className="h-12 w-20 mx-auto" />
      </>
    ) : (
      <>
        <Icon size={30} className={`mx-auto mb-3 ${iconClass}`} aria-hidden="true" />
        <h3 className="text-gray-500 text-sm">{label}</h3>
        <p className="text-5xl font-black mt-3">{value}</p>
      </>
    )}
  </div>
);

/* ── Confidence badge ─────────────────────────────────────────────────── */
const confidenceBadge = (level) => {
  if (level === "Low") return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
  if (level === "Medium") return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
  return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
};

/* ── Trend icon ───────────────────────────────────────────────────────── */
const TrendIcon = ({ trend }) => {
  if (trend === "improving") return <TrendingUp size={15} className="text-green-500" aria-label="Improving" />;
  if (trend === "declining") return <TrendingDown size={15} className="text-red-500" aria-label="Declining" />;
  return <Minus size={15} className="text-gray-400" aria-label="Stable" />;
};

/* ── Progress bar colour ──────────────────────────────────────────────── */
const barGradient = (score) => {
  if (score < 50) return "from-red-500 via-red-400 to-orange-400";
  if (score < 70) return "from-amber-500 via-amber-400 to-yellow-400";
  return "from-green-500 via-green-400 to-emerald-400";
};

/* ── Score delta between last two trend points ────────────────────────── */
function scoreDelta(trendData) {
  if (!trendData || trendData.length < 2) return null;
  return trendData[trendData.length - 1].score - trendData[trendData.length - 2].score;
}

/* ── Total DSA subtopics solved from sheetProgress in UserContext ─────── */
function totalDsaSolved(sheetProgress) {
  if (!Array.isArray(sheetProgress)) return 0;
  return sheetProgress.reduce((sum, p) => {
    return sum + Object.values(p.completedTopics || {}).filter(Boolean).length;
  }, 0);
}

/* ════════════════════════════════════════════════════════════════════════
   Main component
   ════════════════════════════════════════════════════════════════════════ */
const WeakTopicsDashboard = () => {
  const { user, sheetProgress } = useContext(UserContext);
  const navigate = useNavigate();
  const [queuePage, setQueuePage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const {
    analysis,
    revisionQueue,
    aiRecs,
    loadingAnalysis,
    loadingAi,
    error,
    loadMoreQueue,
  } = useWeaknessData();

  /* ── Derived values ─────────────────────────────────────────────────── */
  const weakTopics = analysis
    ? analysis.topics.filter((t) => t.isWeak).sort((a, b) => (a.avgScore ?? 0) - (b.avgScore ?? 0))
    : [];

  const top3Weak = weakTopics.slice(0, 3);
  const delta = scoreDelta(analysis?.trendData);
  const dsaSolved = totalDsaSolved(sheetProgress);

  const handleLoadMore = async (nextPage) => {
    setLoadingMore(true);
    await loadMoreQueue(nextPage);
    setQueuePage(nextPage);
    setLoadingMore(false);
  };

  /* ── Error state ────────────────────────────────────────────────────── */
  if (error) {
    return (
      <div className="min-h-screen bg-[var(--color-background)] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Could not load your analysis</h2>
          <p className="text-gray-500 mb-6">There was a problem fetching your performance data. Please try refreshing the page.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2.5 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  /* ── Empty state (loaded but no data) ──────────────────────────────── */
  const isEmpty = !loadingAnalysis && analysis && analysis.topics.length === 0;

  /* ════════════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
              <Brain size={34} className="text-violet-600" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Personalized Weak Topics Dashboard</h1>
              <p className="text-gray-500 mt-1">
                AI identifies your weakest interview topics and recommends where to focus next.
              </p>
            </div>
          </div>
        </div>

        {/* ── Empty state ────────────────────────────────────────────── */}
        {isEmpty && (
          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-16 text-center">
            <Brain size={56} className="text-violet-300 mx-auto mb-5" aria-hidden="true" />
            <h2 className="text-2xl font-bold mb-3">No performance data yet</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Complete your first adaptive interview session to unlock your personalised weakness analysis and revision plan.
            </p>
            <button
              onClick={() => navigate("/adaptive-interview")}
              className="px-8 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition-colors"
            >
              Start Adaptive Interview
            </button>
          </div>
        )}

        {/* ── Main content (hidden until data or loading) ─────────────── */}
        {!isEmpty && (
          <>
            {/* ── Overview stat cards ──────────────────────────────── */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatCard
                icon={Target}
                iconClass="text-violet-600"
                label="Readiness Score"
                value={`${analysis?.readinessScore ?? 0}%`}
                loading={loadingAnalysis}
              />
              <StatCard
                icon={TrendingDown}
                iconClass="text-red-500"
                label="Weak Topics"
                value={analysis?.weakTopicsCount ?? 0}
                loading={loadingAnalysis}
              />
              <StatCard
                icon={BookOpen}
                iconClass="text-green-600"
                label="Practice Sessions"
                value={analysis?.totalSessionsCompleted ?? 0}
                loading={loadingAnalysis}
              />
              <StatCard
                icon={BarChart3}
                iconClass="text-orange-500"
                label="Study Streak"
                value={`🔥 ${user?.currentStreak ?? 0}`}
                loading={false}
              />
            </div>

            {/* ── Topic Performance Chart ───────────────────────────── */}
            <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 size={24} className="text-violet-600" aria-hidden="true" />
                <h2 className="text-2xl font-bold">Topic Performance Overview</h2>
              </div>
              {loadingAnalysis ? (
                <Skeleton className="h-[280px] w-full" />
              ) : (
                <TopicBarChart topics={analysis?.topics ?? []} />
              )}
            </div>

            {/* ── Weak Topics Analysis ──────────────────────────────── */}
            <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">
              <div className="flex items-center gap-3 mb-8">
                <TrendingDown size={26} className="text-red-500" aria-hidden="true" />
                <h2 className="text-2xl font-bold">Weak Topics Analysis</h2>
              </div>

              {loadingAnalysis ? (
                <div className="space-y-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i}>
                      <Skeleton className="h-5 w-48 mb-3" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))}
                </div>
              ) : weakTopics.length === 0 ? (
                <p className="text-gray-400 text-sm py-4">
                  No weak topics identified yet — keep practising!
                </p>
              ) : (
                <div className="space-y-8">
                  {weakTopics.map((item) => (
                    <div key={item.topic}>
                      <div className="flex justify-between items-center mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-lg font-bold">{item.topic}</h3>
                            <TrendIcon trend={item.trend} />
                          </div>
                          <p className="text-gray-500 text-sm">
                            Score: {item.avgScore ?? "N/A"}%
                            {item.dsaCompletionRate !== null && (
                              <span className="ml-3">DSA completion: {item.dsaCompletionRate}%</span>
                            )}
                          </p>
                        </div>
                        <span className={`px-4 py-1.5 rounded-full font-semibold text-sm ${confidenceBadge(item.confidenceLevel)}`}>
                          {item.confidenceLevel}
                        </span>
                      </div>
                      <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-gradient-to-r ${barGradient(item.avgScore ?? 0)} transition-all duration-500`}
                          style={{ width: `${item.avgScore ?? 0}%` }}
                          role="progressbar"
                          aria-valuenow={item.avgScore ?? 0}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${item.topic} score`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ── Top 3 Weakest Topic ranking cards ────────────────── */}
            {!loadingAnalysis && top3Weak.length > 0 && (
              <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {top3Weak.map((item, index) => (
                  <div
                    key={item.topic}
                    className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 text-center"
                  >
                    <div className="text-5xl font-black text-violet-600">#{index + 1}</div>
                    <h3 className="text-2xl font-bold mt-5">{item.topic}</h3>
                    <p className="mt-4 text-gray-500 text-sm">Current Score</p>
                    <p className="text-4xl font-black text-red-500 mt-2">{item.avgScore ?? "N/A"}%</p>
                  </div>
                ))}
              </div>
            )}

            {/* ── Readiness Trend Chart ─────────────────────────────── */}
            <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp size={24} className="text-violet-600" aria-hidden="true" />
                <h2 className="text-2xl font-bold">Readiness Score Trend</h2>
              </div>
              {loadingAnalysis ? (
                <Skeleton className="h-[220px] w-full" />
              ) : (
                <TrendLineChart trendData={analysis?.trendData ?? []} />
              )}
            </div>

            {/* ── Weekly improvement stat row ───────────────────────── */}
            <div className="mt-10 grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">
                <h3 className="text-gray-500 text-sm">Session-on-Session</h3>
                {loadingAnalysis ? (
                  <Skeleton className="h-12 w-20 mx-auto mt-4" />
                ) : delta !== null ? (
                  <p className={`text-5xl font-black mt-4 ${delta >= 0 ? "text-green-600" : "text-red-500"}`}>
                    {delta >= 0 ? "+" : ""}{delta}
                  </p>
                ) : (
                  <p className="text-gray-400 text-sm mt-4">Not enough sessions</p>
                )}
              </div>
              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">
                <h3 className="text-gray-500 text-sm">DSA Subtopics Solved</h3>
                <p className="text-5xl font-black text-violet-600 mt-4">{dsaSolved}</p>
              </div>
              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">
                <h3 className="text-gray-500 text-sm">Readiness Score</h3>
                {loadingAnalysis ? (
                  <Skeleton className="h-12 w-20 mx-auto mt-4" />
                ) : (
                  <p className="text-5xl font-black text-blue-600 mt-4">{analysis?.readinessScore ?? 0}%</p>
                )}
              </div>
            </div>

            {/* ── AI Improvement Suggestions ────────────────────────── */}
            <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">
              <div className="flex items-center gap-3 mb-8">
                <Brain size={26} className="text-violet-600" aria-hidden="true" />
                <h2 className="text-2xl font-bold">AI Improvement Suggestions</h2>
                {aiRecs?.usedFallback && (
                  <span className="ml-auto text-xs text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-800">
                    AI unavailable — showing rule-based suggestions
                  </span>
                )}
              </div>

              {loadingAi ? (
                <div className="flex items-center justify-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-600" aria-label="Loading AI suggestions" />
                </div>
              ) : aiRecs?.suggestions ? (
                <div className="space-y-4">
                  {aiRecs.suggestions.map((tip, index) => (
                    <div key={index} className="flex items-start gap-4 rounded-2xl border border-gray-200 dark:border-white/10 p-5">
                      <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                        {index + 1}
                      </div>
                      <p className="leading-7 text-sm">{tip}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm py-4">
                  AI suggestions could not be loaded. Please try refreshing the page.
                </p>
              )}
            </div>

            {/* ── Revision Queue ────────────────────────────────────── */}
            <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">
              <div className="flex items-center gap-3 mb-8">
                <BookOpen size={26} className="text-violet-600" aria-hidden="true" />
                <h2 className="text-2xl font-bold">Personalised Revision Queue</h2>
                {revisionQueue.totalItems > 0 && (
                  <span className="ml-auto text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full">
                    {revisionQueue.totalItems} items
                  </span>
                )}
              </div>
              <RevisionQueueList
                items={revisionQueue.items}
                totalItems={revisionQueue.totalItems}
                onLoadMore={handleLoadMore}
                currentPage={queuePage}
                loading={loadingMore}
              />
            </div>

            {/* ── Recommended Practice Plan ─────────────────────────── */}
            {aiRecs?.weeklyPlan && (
              <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">
                <h2 className="text-2xl font-bold mb-8">Recommended Practice Plan</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {aiRecs.weeklyPlan.map((plan, index) => (
                    <div key={index} className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">
                      <h3 className="text-lg font-bold">{plan.day}</h3>
                      <p className="text-gray-500 mt-3 text-sm">{plan.task}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Personalised Action Plan ──────────────────────────── */}
            <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-6">Personalised Action Plan</h2>
              <p className="leading-8 text-white/90">
                {loadingAi
                  ? "Loading your personalised plan…"
                  : aiRecs?.actionPlanSummary || "Complete more sessions to generate a personalised action plan."}
              </p>
            </div>

            {/* ── AI Summary ───────────────────────────────────────── */}
            <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">
              <h2 className="text-2xl font-bold mb-6">AI Weak Topics Summary</h2>
              <p className="leading-8 text-gray-600 dark:text-gray-300 text-sm">
                {loadingAi
                  ? "Generating your summary…"
                  : aiRecs?.aiSummary || "No summary available yet. Complete an adaptive interview to get started."}
              </p>
            </div>

            {/* ── Motivation ───────────────────────────────────────── */}
            <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Turn Weakness Into Strength 🚀</h2>
                  <p className="leading-8 text-white/90">
                    Every expert once struggled with difficult topics. Practice consistently, review
                    your mistakes, and trust the learning process. Small improvements every day lead
                    to outstanding interview performance.
                  </p>
                </div>
                <div className="text-center shrink-0">
                  <div className="text-6xl">📈</div>
                  <h3 className="mt-4 text-2xl font-bold">Keep Going!</h3>
                  <p className="text-5xl font-black">{user?.currentStreak ?? 0} 🔥</p>
                </div>
              </div>
            </div>

          </>
        )}
      </div>
    </div>
  );
};

export default WeakTopicsDashboard;
