import { useState, useEffect, useCallback } from "react";
import axiosInstance from "../utils/axiosInstance";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Plus,
  TrendingUp,
  Clock,
  Trophy,
  Calendar,
  Flame,
  BarChart3,
  Trash2,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from "lucide-react";
import toast from "react-hot-toast";

const CATEGORY_OPTIONS = [
  "DSA",
  "System Design",
  "Behavioral",
  "Aptitude",
  "Coding Practice",
  "Mock Interview",
  "Resume Review",
  "Other",
];

const COLOR_MAP = {
  blue: "bg-blue-500",
  green: "bg-green-500",
  purple: "bg-purple-500",
  orange: "bg-orange-500",
  red: "bg-red-500",
  teal: "bg-teal-500",
  pink: "bg-pink-500",
};

const COLOR_BORDER = {
  blue: "border-blue-500",
  green: "border-green-500",
  purple: "border-purple-500",
  orange: "border-orange-500",
  red: "border-red-500",
  teal: "border-teal-500",
  pink: "border-pink-500",
};

const CATEGORY_ICONS = {
  DSA: "💻",
  "System Design": "🏗️",
  Behavioral: "🗣️",
  Aptitude: "🧮",
  "Coding Practice": "⌨️",
  "Mock Interview": "🎯",
  "Resume Review": "📄",
  Other: "📚",
};

// ─── Create Goal Form ───────────────────────────────────────────────────────

function CreateGoalForm({ onClose, onCreated }) {
  const [form, setForm] = useState({
    title: "",
    category: "DSA",
    weeklyTargetMinutes: 60,
    color: "blue",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return toast.error("Title is required");
    setLoading(true);
    try {
      await axiosInstance.post("/api/study-goals", form);
      toast.success("Goal created!");
      onCreated();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create goal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 mb-6"
    >
      <h3 className="text-lg font-semibold mb-4 dark:text-white">
        Create Study Goal
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Goal Title
          </label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="e.g. Master Dynamic Programming"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            maxLength={120}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat} value={cat}>
                  {CATEGORY_ICONS[cat]} {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Weekly Target (min)
            </label>
            <input
              type="number"
              value={form.weeklyTargetMinutes}
              onChange={(e) =>
                setForm({
                  ...form,
                  weeklyTargetMinutes: Number(e.target.value),
                })
              }
              min={15}
              max={300}
              step={15}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Color
          </label>
          <div className="flex gap-2">
            {Object.keys(COLOR_MAP).map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setForm({ ...form, color })}
                className={`w-8 h-8 rounded-full ${COLOR_MAP[color]} ${
                  form.color === color
                    ? "ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-500"
                    : ""
                } transition-all`}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-50 transition-colors"
          >
            {loading ? "Creating..." : "Create Goal"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}

// ─── Log Session Modal ──────────────────────────────────────────────────────

function LogSessionModal({ goal, onClose, onLogged }) {
  const [minutes, setMinutes] = useState(30);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (minutes < 1) return toast.error("Minimum 1 minute");
    setLoading(true);
    try {
      await axiosInstance.post(`/api/study-goals/${goal._id}/log`, {
        minutes,
        notes,
      });
      toast.success(`Logged ${minutes} minutes!`);
      onLogged();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to log session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-2xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold mb-1 dark:text-white">
          Log Study Session
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          {goal.title} &middot; {goal.category}
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Minutes Studied
            </label>
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(Number(e.target.value))}
              min={1}
              max={480}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Notes (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="What did you study?"
              rows={3}
              maxLength={300}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium disabled:opacity-50 transition-colors"
            >
              {loading ? "Logging..." : "Log Session"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

// ─── Weekly Goal Card ───────────────────────────────────────────────────────

function GoalCard({ goal, onLog, onDelete }) {
  const [expanded, setExpanded] = useState(false);
  const pct = Math.min(
    100,
    Math.round((goal.currentWeekMinutes / goal.weeklyTargetMinutes) * 100)
  );
  const barColor = pct >= 100 ? "bg-green-500" : COLOR_MAP[goal.color] || "bg-blue-500";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md border-l-4 ${
        COLOR_BORDER[goal.color] || "border-blue-500"
      } border border-gray-200 dark:border-gray-700`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">{CATEGORY_ICONS[goal.category] || "📚"}</span>
          <div>
            <h4 className="font-semibold text-gray-900 dark:text-white text-sm leading-tight">
              {goal.title}
            </h4>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {goal.category} &middot; {goal.weeklyTargetMinutes} min/week
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onLog(goal)}
            className="p-1.5 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
            title="Log Session"
          >
            <Clock size={16} className="text-green-600 dark:text-green-400" />
          </button>
          <button
            onClick={() => onDelete(goal._id)}
            className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
            title="Delete Goal"
          >
            <Trash2 size={16} className="text-red-500" />
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-2">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-600 dark:text-gray-400">
            {goal.currentWeekMinutes} / {goal.weeklyTargetMinutes} min
          </span>
          <span
            className={`font-semibold ${
              pct >= 100
                ? "text-green-600 dark:text-green-400"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {pct}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <motion.div
            className={`${barColor} h-2.5 rounded-full`}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
        </div>
      </div>

      {pct >= 100 && (
        <div className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400 font-medium mb-2">
          <Trophy size={14} /> Goal completed this week!
        </div>
      )}

      {/* Daily log details */}
      {goal.dailyLog && goal.dailyLog.length > 0 && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 hover:underline mt-1"
        >
          {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          {expanded ? "Hide" : "Show"} daily log
        </button>
      )}

      <AnimatePresence>
        {expanded && goal.dailyLog && goal.dailyLog.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mt-2"
          >
            <div className="space-y-1">
              {goal.dailyLog.map((log, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-xs bg-gray-50 dark:bg-gray-700/50 rounded px-2 py-1"
                >
                  <span className="text-gray-600 dark:text-gray-400">
                    {new Date(log.date).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="font-medium text-gray-800 dark:text-gray-200">
                    {log.minutes} min
                    {log.notes ? ` — ${log.notes}` : ""}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Analytics Panel ─────────────────────────────────────────────────────────

function AnalyticsPanel({ analytics, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 animate-pulse h-24"
          />
        ))}
      </div>
    );
  }
  if (!analytics) return null;

  const cards = [
    {
      icon: <Target size={20} className="text-blue-500" />,
      label: "Active Goals",
      value: analytics.activeGoals,
      sub: `${analytics.totalGoals} total`,
    },
    {
      icon: <Clock size={20} className="text-green-500" />,
      label: "This Week",
      value: `${analytics.currentWeek.totalMinutes}m`,
      sub: `${analytics.currentWeek.completionPercentage}% of target`,
    },
    {
      icon: <Flame size={20} className="text-orange-500" />,
      label: "Completed Weeks",
      value: analytics.completedWeeksAllTime,
      sub: `${analytics.overallCompletionRate}% success rate`,
    },
    {
      icon: <TrendingUp size={20} className="text-purple-500" />,
      label: "Total Study Time",
      value: `${Math.round(analytics.totalMinutesAllTime / 60)}h`,
      sub: `across ${analytics.totalWeeksTracked} weeks`,
    },
  ];

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
        <BarChart3 size={16} /> Analytics Overview
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <div
            key={card.label}
            className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700"
          >
            <div className="flex items-center gap-2 mb-2">
              {card.icon}
              <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                {card.label}
              </span>
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-white">
              {card.value}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {card.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      {Object.keys(analytics.categoryBreakdown).length > 0 && (
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Time by Category
          </h4>
          <div className="space-y-2">
            {Object.entries(analytics.categoryBreakdown)
              .sort(([, a], [, b]) => b.totalMinutes - a.totalMinutes)
              .map(([cat, data]) => {
                const maxMin = Math.max(
                  ...Object.values(analytics.categoryBreakdown).map(
                    (d) => d.totalMinutes
                  ),
                  1
                );
                const barWidth = Math.round(
                  (data.totalMinutes / maxMin) * 100
                );
                return (
                  <div key={cat} className="flex items-center gap-3">
                    <span className="text-xs text-gray-600 dark:text-gray-400 w-28 truncate">
                      {CATEGORY_ICONS[cat] || "📚"} {cat}
                    </span>
                    <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${barWidth}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-gray-600 dark:text-gray-400 w-16 text-right">
                      {Math.round(data.totalMinutes / 60)}h
                    </span>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main StudyGoalTracker ──────────────────────────────────────────────────

export default function StudyGoalTracker() {
  const [goals, setGoals] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [logModal, setLogModal] = useState(null);
  const [filterCategory, setFilterCategory] = useState("all");

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [goalsRes, analyticsRes] = await Promise.all([
        axiosInstance.get("/api/study-goals"),
        axiosInstance.get("/api/study-goals/analytics"),
      ]);
      setGoals(goalsRes.data.goals || []);
      setAnalytics(analyticsRes.data.analytics || null);
    } catch (err) {
      console.error("Failed to load study goals:", err);
      toast.error("Failed to load study goals");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this goal? This cannot be undone.")) return;
    try {
      await axiosInstance.delete(`/api/study-goals/${id}`);
      toast.success("Goal deleted");
      fetchData();
    } catch (err) {
      toast.error("Failed to delete goal");
    }
  };

  const filteredGoals =
    filterCategory === "all"
      ? goals
      : goals.filter((g) => g.category === filterCategory);

  const activeGoals = filteredGoals.filter((g) => g.isActive);
  const inactiveGoals = filteredGoals.filter((g) => !g.isActive);

  const uniqueCategories = [...new Set(goals.map((g) => g.category))];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
            <BookOpen size={24} className="text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Study Goals
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Track weekly study targets and monitor your progress
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
        >
          <Plus size={18} />
          New Goal
        </button>
      </div>

      {/* Create form */}
      <AnimatePresence>
        {showCreate && (
          <CreateGoalForm
            onClose={() => setShowCreate(false)}
            onCreated={fetchData}
          />
        )}
      </AnimatePresence>

      {/* Log session modal */}
      <AnimatePresence>
        {logModal && (
          <LogSessionModal
            goal={logModal}
            onClose={() => setLogModal(null)}
            onLogged={fetchData}
          />
        )}
      </AnimatePresence>

      {/* Analytics */}
      <AnalyticsPanel analytics={analytics} loading={loading && !analytics} />

      {/* Category filter */}
      {uniqueCategories.length > 0 && (
        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
            Filter:
          </span>
          <button
            onClick={() => setFilterCategory("all")}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
              filterCategory === "all"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            All
          </button>
          {uniqueCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                filterCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {CATEGORY_ICONS[cat]} {cat}
            </button>
          ))}
        </div>
      )}

      {/* Goals list */}
      {loading && goals.length === 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 h-32 animate-pulse"
            />
          ))}
        </div>
      ) : goals.length === 0 ? (
        <div className="text-center py-16">
          <Target
            size={48}
            className="text-gray-300 dark:text-gray-600 mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">
            No study goals yet
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Create your first weekly study goal to start tracking your progress.
          </p>
          <button
            onClick={() => setShowCreate(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
          >
            <Plus size={16} className="inline mr-1" />
            Create Goal
          </button>
        </div>
      ) : (
        <>
          {activeGoals.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Flame size={16} /> Active Goals
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {activeGoals.map((goal) => (
                  <GoalCard
                    key={goal._id}
                    goal={goal}
                    onLog={setLogModal}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}

          {inactiveGoals.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Calendar size={16} /> Paused Goals
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {inactiveGoals.map((goal) => (
                  <GoalCard
                    key={goal._id}
                    goal={goal}
                    onLog={setLogModal}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
