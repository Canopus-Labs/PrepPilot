import React, { useMemo, useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Clock3,
  TrendingUp,
  BarChart3,
  RefreshCw,
  ArrowRight,
  Award,
  BookOpen,
  CalendarDays,
  CircleAlert,
  Flag,
  Layers,
  Zap,
  ListChecks,
  ShieldCheck,
} from "lucide-react";

const AIInterviewPreparationPriorityMatrix = () => {
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [activeTab, setActiveTab] = useState("matrix");
  const [analyzing, setAnalyzing] = useState(false);
  const [completedTasks, setCompletedTasks] = useState([]);

  const tasks = [
    {
      id: 1,
      title: "Practice System Design Fundamentals",
      category: "System Design",
      priority: "Critical",
      relevance: 96,
      weakness: 91,
      timeRemaining: 82,
      difficulty: 88,
      performance: 42,
      dueIn: "2 days",
      estimatedTime: "3 hours",
      reason:
        "System Design is a major interview area and your previous performance indicates a significant knowledge gap.",
      action:
        "Review scalability, load balancing, caching, databases, and API design before attempting another mock interview.",
    },
    {
      id: 2,
      title: "Revise Binary Search and Variations",
      category: "Algorithms",
      priority: "Critical",
      relevance: 94,
      weakness: 84,
      timeRemaining: 78,
      difficulty: 75,
      performance: 48,
      dueIn: "3 days",
      estimatedTime: "2 hours",
      reason:
        "Binary search is highly relevant and your recent practice shows difficulty with variations and edge cases.",
      action:
        "Practice standard binary search, lower bound, upper bound, and rotated-array variations.",
    },
    {
      id: 3,
      title: "Practice SQL JOIN Queries",
      category: "Database",
      priority: "High Priority",
      relevance: 88,
      weakness: 72,
      timeRemaining: 68,
      difficulty: 62,
      performance: 61,
      dueIn: "4 days",
      estimatedTime: "90 minutes",
      reason:
        "Database questions are relevant to your target interviews and JOIN problems remain an improvement area.",
      action:
        "Practice INNER JOIN, LEFT JOIN, GROUP BY, HAVING, and multi-table queries.",
    },
    {
      id: 4,
      title: "Review JavaScript Promises",
      category: "JavaScript",
      priority: "High Priority",
      relevance: 86,
      weakness: 69,
      timeRemaining: 64,
      difficulty: 66,
      performance: 64,
      dueIn: "5 days",
      estimatedTime: "75 minutes",
      reason:
        "Asynchronous JavaScript is frequently tested and your previous answers showed uncertainty around Promise behavior.",
      action:
        "Review Promise states, chaining, async/await, rejection handling, and Promise.all().",
    },
    {
      id: 5,
      title: "Practice Behavioral STAR Answers",
      category: "Behavioral",
      priority: "Recommended",
      relevance: 81,
      weakness: 55,
      timeRemaining: 52,
      difficulty: 48,
      performance: 73,
      dueIn: "6 days",
      estimatedTime: "60 minutes",
      reason:
        "Your behavioral preparation is progressing well, but structured answers can still improve interview consistency.",
      action:
        "Prepare STAR responses for leadership, conflict, failure, teamwork, and problem-solving questions.",
    },
    {
      id: 6,
      title: "Review REST API Concepts",
      category: "Web Development",
      priority: "Recommended",
      relevance: 77,
      weakness: 49,
      timeRemaining: 45,
      difficulty: 54,
      performance: 78,
      dueIn: "7 days",
      estimatedTime: "45 minutes",
      reason:
        "Your API fundamentals are relatively strong, so a short revision session should be sufficient.",
      action:
        "Review HTTP methods, status codes, authentication, idempotency, and REST principles.",
    },
    {
      id: 7,
      title: "Revise Git Commands",
      category: "Tools",
      priority: "Optional",
      relevance: 54,
      weakness: 31,
      timeRemaining: 28,
      difficulty: 32,
      performance: 86,
      dueIn: "10 days",
      estimatedTime: "30 minutes",
      reason:
        "Your Git knowledge is already strong and this topic has lower interview impact compared with current gaps.",
      action:
        "Quickly review branching, merge, rebase, cherry-pick, stash, and conflict resolution.",
    },
    {
      id: 8,
      title: "Review Basic HTML Semantics",
      category: "Frontend",
      priority: "Optional",
      relevance: 42,
      weakness: 22,
      timeRemaining: 20,
      difficulty: 25,
      performance: 92,
      dueIn: "12 days",
      estimatedTime: "20 minutes",
      reason:
        "This is a low-risk area because your previous performance has been consistently strong.",
      action:
        "Perform a quick review only after completing higher-impact preparation tasks.",
    },
  ];

  const priorityOrder = {
    Critical: 1,
    "High Priority": 2,
    Recommended: 3,
    Optional: 4,
  };

  const priorityConfig = {
    Critical: {
      icon: "🔴",
      color: "text-red-600",
      bg: "bg-red-50 dark:bg-red-900/10",
      border: "border-red-200 dark:border-red-900/30",
    },
    "High Priority": {
      icon: "🟠",
      color: "text-orange-500",
      bg: "bg-orange-50 dark:bg-orange-900/10",
      border: "border-orange-200 dark:border-orange-900/30",
    },
    Recommended: {
      icon: "🟡",
      color: "text-yellow-600",
      bg: "bg-yellow-50 dark:bg-yellow-900/10",
      border: "border-yellow-200 dark:border-yellow-900/30",
    },
    Optional: {
      icon: "🟢",
      color: "text-green-600",
      bg: "bg-green-50 dark:bg-green-900/10",
      border: "border-green-200 dark:border-green-900/30",
    },
  };

  const sortedTasks = useMemo(() => {
    return [...tasks]
      .filter((task) => {
        if (selectedPriority === "All") return true;
        return task.priority === selectedPriority;
      })
      .sort(
        (a, b) =>
          priorityOrder[a.priority] -
          priorityOrder[b.priority]
      );
  }, [selectedPriority]);

  const stats = useMemo(() => {
    const critical = tasks.filter(
      (task) => task.priority === "Critical"
    ).length;

    const high = tasks.filter(
      (task) => task.priority === "High Priority"
    ).length;

    const recommended = tasks.filter(
      (task) => task.priority === "Recommended"
    ).length;

    const optional = tasks.filter(
      (task) => task.priority === "Optional"
    ).length;

    const averageImpact = Math.round(
      tasks.reduce(
        (sum, task) =>
          sum +
          (task.relevance +
            task.weakness +
            task.timeRemaining +
            task.difficulty +
            (100 - task.performance)) /
            5,
        0
      ) / tasks.length
    );

    return {
      critical,
      high,
      recommended,
      optional,
      averageImpact,
    };
  }, []);

  const completedCount = completedTasks.length;

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("matrix");
    }, 800);
  };

  const toggleTask = (taskId) => {
    setCompletedTasks((current) =>
      current.includes(taskId)
        ? current.filter((id) => id !== taskId)
        : [...current, taskId]
    );
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Target
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Preparation Priority Matrix
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Rank your preparation tasks by interview relevance,
              weakness, urgency, difficulty, and previous performance.
            </p>

          </div>

        </div>

        {/* Overview Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <ListChecks
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Pending Tasks
            </p>

            <p className="text-5xl font-black mt-3">
              {tasks.length - completedCount}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CircleAlert
              className="mx-auto text-red-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Critical Tasks
            </p>

            <p className="text-5xl font-black mt-3">
              {stats.critical}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              High Priority
            </p>

            <p className="text-5xl font-black mt-3">
              {stats.high}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <ShieldCheck
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Preparation Impact
            </p>

            <p className="text-5xl font-black mt-3">
              {stats.averageImpact}%
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Preparation Priority Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90 max-w-5xl">
            AI ranks your preparation tasks using interview relevance,
            current weaknesses, time remaining, topic difficulty, and
            previous performance. The goal is to help you spend your
            limited preparation time on the activities with the highest
            expected impact.
          </p>

        </div>

        {/* Priority Legend */}

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

          {Object.entries(priorityConfig).map(
            ([priority, config]) => (

              <button
                key={priority}
                type="button"
                onClick={() =>
                  setSelectedPriority(
                    selectedPriority === priority
                      ? "All"
                      : priority
                  )
                }
                className={`rounded-2xl border p-5 text-left transition hover:-translate-y-1 ${
                  config.bg
                } ${config.border} ${
                  selectedPriority === priority
                    ? "ring-2 ring-violet-500"
                    : ""
                }`}
              >

                <div className="flex items-center justify-between">

                  <span className="text-3xl">
                    {config.icon}
                  </span>

                  <span
                    className={`font-black ${config.color}`}
                  >
                    {priority === "Critical"
                      ? stats.critical
                      : priority === "High Priority"
                      ? stats.high
                      : priority === "Recommended"
                      ? stats.recommended
                      : stats.optional}
                  </span>

                </div>

                <h3 className="font-bold text-lg mt-4">
                  {priority}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {priority === "Critical"
                    ? "Complete immediately."
                    : priority === "High Priority"
                    ? "Complete after critical tasks."
                    : priority === "Recommended"
                    ? "Useful for stronger preparation."
                    : "Complete if time allows."}
                </p>

              </button>
            )
          )}

        </div>

        {/* Analyze */}

        <div className="mt-8 flex justify-center">

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-violet-600 text-white font-bold text-lg hover:bg-violet-700 transition disabled:opacity-60"
          >

            {analyzing ? (
              <>
                <RefreshCw
                  size={22}
                  className="animate-spin"
                />

                Recalculating Priorities...
              </>
            ) : (
              <>
                <Sparkles size={22} />

                Analyze Preparation Priorities
              </>
            )}

          </button>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["matrix", "Priority Matrix"],
            ["breakdown", "Priority Breakdown"],
            ["timeline", "Preparation Timeline"],
            ["recommendations", "AI Recommendations"],
          ].map(([value, label]) => (

            <button
              key={value}
              type="button"
              onClick={() => setActiveTab(value)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === value
                  ? "bg-violet-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Matrix */}

        {activeTab === "matrix" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">

              <div className="flex items-center gap-3">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  AI Preparation Priority Matrix
                </h2>

              </div>

              <span className="text-sm text-gray-500">
                Showing {sortedTasks.length} tasks
              </span>

            </div>

            <div className="space-y-6">

              {sortedTasks.map((task) => {

                const config =
                  priorityConfig[task.priority];

                const completed = completedTasks.includes(
                  task.id
                );

                const impactScore = Math.round(
                  (task.relevance +
                    task.weakness +
                    task.timeRemaining +
                    task.difficulty +
                    (100 - task.performance)) /
                    5
                );

                return (
                  <div
                    key={task.id}
                    className={`rounded-2xl border p-6 transition ${
                      completed
                        ? "opacity-60 border-green-300 dark:border-green-900/30"
                        : `${config.border}`
                    } ${config.bg}`}
                  >

                    <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">

                      <div className="flex gap-4">

                        <button
                          type="button"
                          onClick={() =>
                            toggleTask(task.id)
                          }
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${
                            completed
                              ? "bg-green-100 text-green-600 dark:bg-green-900/20"
                              : "bg-white dark:bg-gray-800"
                          }`}
                        >

                          {completed ? (
                            <CheckCircle2 size={24} />
                          ) : (
                            <Flag
                              size={22}
                              className={config.color}
                            />
                          )}

                        </button>

                        <div>

                          <div className="flex flex-wrap items-center gap-3">

                            <span
                              className={`px-3 py-1 rounded-full text-sm font-bold ${config.color}`}
                            >
                              {config.icon}{" "}
                              {task.priority}
                            </span>

                            <span className="text-sm text-gray-500">
                              {task.category}
                            </span>

                          </div>

                          <h3
                            className={`text-xl font-bold mt-3 ${
                              completed
                                ? "line-through"
                                : ""
                            }`}
                          >
                            {task.title}
                          </h3>

                          <p className="text-gray-500 mt-2 leading-6 max-w-3xl">
                            {task.reason}
                          </p>

                        </div>

                      </div>

                      <div className="flex flex-wrap gap-3">

                        <div className="rounded-xl bg-white/70 dark:bg-gray-800 p-4 min-w-[110px] text-center">

                          <p className="text-xs text-gray-500">
                            Impact
                          </p>

                          <p
                            className={`text-2xl font-black mt-1 ${config.color}`}
                          >
                            {impactScore}%
                          </p>

                        </div>

                        <div className="rounded-xl bg-white/70 dark:bg-gray-800 p-4 min-w-[110px] text-center">

                          <p className="text-xs text-gray-500">
                            Due
                          </p>

                          <p className="text-lg font-black mt-2">
                            {task.dueIn}
                          </p>

                        </div>

                        <div className="rounded-xl bg-white/70 dark:bg-gray-800 p-4 min-w-[110px] text-center">

                          <p className="text-xs text-gray-500">
                            Effort
                          </p>

                          <p className="text-lg font-black mt-2">
                            {task.estimatedTime}
                          </p>

                        </div>

                      </div>

                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5 mt-7">

                      {[
                        ["Relevance", task.relevance],
                        ["Weakness", task.weakness],
                        ["Urgency", task.timeRemaining],
                        ["Difficulty", task.difficulty],
                        ["Gap", 100 - task.performance],
                      ].map(([label, score]) => (

                        <div key={label}>

                          <div className="flex justify-between mb-2">

                            <span className="text-sm text-gray-500">
                              {label}
                            </span>

                            <span className="text-sm font-bold">
                              {score}%
                            </span>

                          </div>

                          <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                            <div
                              className="h-full bg-violet-600 rounded-full"
                              style={{
                                width: `${score}%`,
                              }}
                            />

                          </div>

                        </div>

                      ))}

                    </div>

                    <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                      <div className="flex items-start gap-3">

                        <Lightbulb
                          size={20}
                          className="text-yellow-500 shrink-0 mt-1"
                        />

                        <p className="text-sm text-gray-500 leading-6">
                          <span className="font-bold text-gray-700 dark:text-gray-300">
                            Recommended action:
                          </span>{" "}
                          {task.action}
                        </p>

                      </div>

                      {!completed && (
                        <button
                          type="button"
                          onClick={() =>
                            toggleTask(task.id)
                          }
                          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition"
                        >
                          Mark Complete
                          <CheckCircle2 size={18} />
                        </button>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>

          </div>
        )}

        {/* Breakdown */}

        {activeTab === "breakdown" && (

          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Priority Distribution
                </h2>

              </div>

              <div className="space-y-7">

                {[
                  {
                    label: "Critical",
                    count: stats.critical,
                    color: "bg-red-500",
                  },
                  {
                    label: "High Priority",
                    count: stats.high,
                    color: "bg-orange-500",
                  },
                  {
                    label: "Recommended",
                    count: stats.recommended,
                    color: "bg-yellow-500",
                  },
                  {
                    label: "Optional",
                    count: stats.optional,
                    color: "bg-green-500",
                  },
                ].map((item) => (

                  <div key={item.label}>

                    <div className="flex justify-between mb-3">

                      <span className="font-semibold">
                        {item.label}
                      </span>

                      <span className="font-black">
                        {item.count} tasks
                      </span>

                    </div>

                    <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                      <div
                        className={`h-full ${item.color}`}
                        style={{
                          width: `${
                            (item.count /
                              tasks.length) *
                            100
                          }%`,
                        }}
                      />

                    </div>

                  </div>
                ))}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Target className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Priority Factors
                </h2>

              </div>

              <div className="space-y-6">

                {[
                  {
                    label: "Interview Relevance",
                    score: 91,
                  },
                  {
                    label: "User Weakness",
                    score: 78,
                  },
                  {
                    label: "Time Remaining",
                    score: 72,
                  },
                  {
                    label: "Topic Difficulty",
                    score: 69,
                  },
                  {
                    label: "Previous Performance Gap",
                    score: 74,
                  },
                ].map((item) => (

                  <div key={item.label}>

                    <div className="flex justify-between mb-2">

                      <span className="font-semibold">
                        {item.label}
                      </span>

                      <span className="font-black text-violet-600">
                        {item.score}%
                      </span>

                    </div>

                    <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700">

                      <div
                        className="h-full bg-violet-600 rounded-full"
                        style={{
                          width: `${item.score}%`,
                        }}
                      />

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>
        )}

        {/* Topic Priority Table */}

        {activeTab === "breakdown" && (

          <div className="mt-8 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-8">

              <Layers className="text-indigo-600" />

              <h2 className="text-2xl font-bold">
                Topic Preparation Priority
              </h2>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full text-left">

                <thead>

                  <tr className="border-b border-gray-200 dark:border-white/10">

                    <th className="p-4">
                      Topic
                    </th>

                    <th className="p-4">
                      Tasks
                    </th>

                    <th className="p-4">
                      Avg. Relevance
                    </th>

                    <th className="p-4">
                      Weakness
                    </th>

                    <th className="p-4">
                      Priority
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {[
                    ["System Design", 1, 96, 91, "Critical"],
                    ["Algorithms", 1, 94, 84, "Critical"],
                    ["Database", 1, 88, 72, "High Priority"],
                    ["JavaScript", 1, 86, 69, "High Priority"],
                    ["Behavioral", 1, 81, 55, "Recommended"],
                    ["Web Development", 1, 77, 49, "Recommended"],
                    ["Tools", 1, 54, 31, "Optional"],
                    ["Frontend", 1, 42, 22, "Optional"],
                  ].map((row, index) => {

                    const config =
                      priorityConfig[row[4]];

                    return (
                      <tr
                        key={index}
                        className="border-b border-gray-100 dark:border-white/5"
                      >

                        <td className="p-4 font-semibold">
                          {row[0]}
                        </td>

                        <td className="p-4">
                          {row[1]}
                        </td>

                        <td className="p-4 font-bold">
                          {row[2]}%
                        </td>

                        <td className="p-4 text-orange-500 font-bold">
                          {row[3]}%
                        </td>

                        <td
                          className={`p-4 font-bold ${config.color}`}
                        >
                          {config.icon} {row[4]}
                        </td>

                      </tr>
                    );
                  })}

                </tbody>

              </table>

            </div>

          </div>
        )}

        {/* Timeline */}

        {activeTab === "timeline" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-8">

              <CalendarDays className="text-blue-600" />

              <h2 className="text-2xl font-bold">
                AI Preparation Timeline
              </h2>

            </div>

            <div className="space-y-8">

              {[
                {
                  day: "Today",
                  title: "Critical Foundations",
                  tasks: [
                    "Practice System Design Fundamentals",
                    "Revise Binary Search and Variations",
                  ],
                  color: "border-red-500",
                },
                {
                  day: "Next 2–4 Days",
                  title: "High-Impact Practice",
                  tasks: [
                    "Practice SQL JOIN Queries",
                    "Review JavaScript Promises",
                  ],
                  color: "border-orange-500",
                },
                {
                  day: "Next 5–7 Days",
                  title: "Recommended Preparation",
                  tasks: [
                    "Practice Behavioral STAR Answers",
                    "Review REST API Concepts",
                  ],
                  color: "border-yellow-500",
                },
                {
                  day: "After Core Preparation",
                  title: "Optional Review",
                  tasks: [
                    "Revise Git Commands",
                    "Review Basic HTML Semantics",
                  ],
                  color: "border-green-500",
                },
              ].map((item) => (

                <div
                  key={item.day}
                  className={`border-l-4 ${item.color} pl-6`}
                >

                  <p className="text-sm font-bold text-violet-600">
                    {item.day}
                  </p>

                  <h3 className="text-xl font-bold mt-2">
                    {item.title}
                  </h3>

                  <div className="mt-4 space-y-3">

                    {item.tasks.map((task) => (

                      <div
                        key={task}
                        className="flex items-center gap-3 rounded-xl bg-gray-50 dark:bg-gray-800 p-4"
                      >

                        <ArrowRight
                          size={18}
                          className="text-violet-600"
                        />

                        <span className="font-semibold">
                          {task}
                        </span>

                      </div>
                    ))}

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* Time Allocation */}

        {activeTab === "timeline" && (

          <div className="mt-8 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Clock3 className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Recommended Time Allocation
                </h2>

              </div>

              {[
                ["Critical Tasks", 5, "bg-red-500"],
                ["High Priority", 3, "bg-orange-500"],
                ["Recommended", 2, "bg-yellow-500"],
                ["Optional", 1, "bg-green-500"],
              ].map(([label, hours, color]) => (

                <div key={label} className="mb-6">

                  <div className="flex justify-between mb-2">

                    <span className="font-semibold">
                      {label}
                    </span>

                    <span className="font-black">
                      {hours} hrs
                    </span>

                  </div>

                  <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700">

                    <div
                      className={`h-full ${color} rounded-full`}
                      style={{
                        width: `${hours * 10}%`,
                      }}
                    />

                  </div>

                </div>
              ))}

              <div className="mt-8 rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

                <div className="flex items-center gap-3">

                  <Zap className="text-violet-600" />

                  <p className="font-bold">
                    Recommended total preparation:
                    approximately 11 hours.
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BookOpen className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Preparation Strategy
                </h2>

              </div>

              <div className="space-y-6">

                {[
                  {
                    number: "1",
                    title: "Complete Critical Tasks First",
                    text:
                      "Focus on the topics with the highest combination of interview relevance and personal weakness.",
                  },
                  {
                    number: "2",
                    title: "Strengthen High-Impact Gaps",
                    text:
                      "Use your next study sessions to address important areas where previous performance was weak.",
                  },
                  {
                    number: "3",
                    title: "Use Short Review Sessions",
                    text:
                      "Recommended topics should receive focused revision instead of taking time away from critical gaps.",
                  },
                  {
                    number: "4",
                    title: "Skip Low-Impact Work When Necessary",
                    text:
                      "Optional tasks should only be completed after the important preparation is under control.",
                  },
                ].map((item) => (

                  <div
                    key={item.number}
                    className="flex gap-4"
                  >

                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center shrink-0">

                      <span className="font-black text-blue-600">
                        {item.number}
                      </span>

                    </div>

                    <div>

                      <h3 className="font-bold">
                        {item.title}
                      </h3>

                      <p className="text-gray-500 mt-1 leading-6">
                        {item.text}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>
        )}

        {/* AI Recommendations */}

        {activeTab === "recommendations" && (

          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Brain className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  AI Personalized Recommendations
                </h2>

              </div>

              <div className="space-y-5">

                {[
                  {
                    icon: "🔴",
                    title: "Prioritize System Design",
                    text:
                      "Your System Design weakness is currently the largest high-impact preparation gap.",
                  },
                  {
                    icon: "🧠",
                    title: "Strengthen Algorithm Patterns",
                    text:
                      "Focus on binary search and common algorithmic patterns before learning new advanced topics.",
                  },
                  {
                    icon: "📊",
                    title: "Practice With Evidence",
                    text:
                      "When preparing project answers, remember concrete metrics, architecture decisions, and implementation details.",
                  },
                  {
                    icon: "⏱️",
                    title: "Protect Your Remaining Time",
                    text:
                      "Do not spend significant time polishing topics where your previous performance is already strong.",
                  },
                ].map((item) => (

                  <div
                    key={item.title}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                  >

                    <div className="flex gap-4">

                      <div className="text-3xl">
                        {item.icon}
                      </div>

                      <div>

                        <h3 className="font-bold text-lg">
                          {item.title}
                        </h3>

                        <p className="text-gray-500 mt-2 leading-6">
                          {item.text}
                        </p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Award className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Expected Preparation Impact
                </h2>

              </div>

              <div className="space-y-6">

                {[
                  {
                    label: "Technical Confidence",
                    score: 82,
                  },
                  {
                    label: "Interview Coverage",
                    score: 79,
                  },
                  {
                    label: "Weakness Reduction",
                    score: 86,
                  },
                  {
                    label: "Deadline Readiness",
                    score: 74,
                  },
                ].map((item) => (

                  <div key={item.label}>

                    <div className="flex justify-between mb-2">

                      <span className="font-semibold">
                        {item.label}
                      </span>

                      <span className="font-black text-green-600">
                        {item.score}%
                      </span>

                    </div>

                    <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700">

                      <div
                        className="h-full bg-green-500 rounded-full"
                        style={{
                          width: `${item.score}%`,
                        }}
                      />

                    </div>

                  </div>
                ))}

              </div>

              <div className="mt-8 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

                <div className="flex items-center gap-3">

                  <TrendingUp className="text-green-600" />

                  <p className="font-bold">
                    Completing critical tasks first can provide the
                    highest preparation impact.
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Current Focus */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Flag className="text-red-600" />

            <h2 className="text-2xl font-bold">
              Your Current Focus
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-6">

              <p className="text-sm text-gray-500">
                Do First
              </p>

              <h3 className="text-xl font-bold mt-2">
                System Design
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Highest combination of interview relevance, weakness,
                difficulty, and urgency.
              </p>

            </div>

            <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-6">

              <p className="text-sm text-gray-500">
                Do Next
              </p>

              <h3 className="text-xl font-bold mt-2">
                Algorithms + Database
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                These topics have meaningful interview impact and clear
                opportunities for improvement.
              </p>

            </div>

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

              <p className="text-sm text-gray-500">
                Leave for Later
              </p>

              <h3 className="text-xl font-bold mt-2">
                Git + Basic HTML
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Your existing performance is strong, so these topics have
                lower immediate preparation impact.
              </p>

            </div>

          </div>

        </div>

        {/* Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Preparation Completion Progress
            </h2>

          </div>

          <div className="flex justify-between mb-3">

            <span className="font-semibold">
              Completed Tasks
            </span>

            <span className="font-black text-violet-600">
              {completedCount} / {tasks.length}
            </span>

          </div>

          <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
              style={{
                width: `${
                  (completedCount / tasks.length) * 100
                }%`,
              }}
            />

          </div>

          <div className="grid sm:grid-cols-4 gap-5 mt-8">

            {[
              {
                label: "Critical",
                value: stats.critical,
                color: "text-red-600",
              },
              {
                label: "High Priority",
                value: stats.high,
                color: "text-orange-500",
              },
              {
                label: "Recommended",
                value: stats.recommended,
                color: "text-yellow-600",
              },
              {
                label: "Optional",
                value: stats.optional,
                color: "text-green-600",
              },
            ].map((item) => (

              <div
                key={item.label}
                className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5 text-center"
              >

                <p className="text-sm text-gray-500">
                  {item.label}
                </p>

                <p
                  className={`text-3xl font-black mt-2 ${item.color}`}
                >
                  {item.value}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* Final AI Insight */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Do not treat every preparation task equally. Your highest
                return comes from addressing important topics where your
                current performance is weak and the interview deadline is
                approaching. Complete critical tasks first, then move to
                high-priority and recommended activities. Leave optional
                reviews until the core preparation is under control.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Focus Score
              </h3>

              <p className="text-5xl font-black">
                {stats.averageImpact}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewPreparationPriorityMatrix;