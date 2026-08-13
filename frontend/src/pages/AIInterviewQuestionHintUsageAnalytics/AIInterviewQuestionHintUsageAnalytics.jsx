import React, { useMemo, useState } from "react";
import {
  Brain,
  Lightbulb,
  TrendingUp,
  BarChart3,
  Target,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  RefreshCw,
  MessageSquare,
  Layers,
  Clock3,
  Award,
  BookOpen,
  ArrowRight,
  ShieldCheck,
  CircleHelp,
  Zap,
} from "lucide-react";

const AIInterviewQuestionHintUsageAnalytics = () => {
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [activeTab, setActiveTab] = useState("overview");
  const [analyzing, setAnalyzing] = useState(false);

  const topicData = [
    {
      name: "Data Structures",
      questions: 24,
      hints: 31,
      solvedWithoutHints: 15,
      dependency: 38,
      averageHints: 1.3,
      progress: 18,
      color: "blue",
    },
    {
      name: "Algorithms",
      questions: 28,
      hints: 46,
      solvedWithoutHints: 13,
      dependency: 46,
      averageHints: 1.6,
      progress: 12,
      color: "violet",
    },
    {
      name: "Database",
      questions: 18,
      hints: 19,
      solvedWithoutHints: 12,
      dependency: 32,
      averageHints: 1.1,
      progress: 24,
      color: "green",
    },
    {
      name: "JavaScript",
      questions: 21,
      hints: 35,
      solvedWithoutHints: 10,
      dependency: 48,
      averageHints: 1.7,
      progress: 8,
      color: "orange",
    },
    {
      name: "System Design",
      questions: 16,
      hints: 34,
      solvedWithoutHints: 6,
      dependency: 57,
      averageHints: 2.1,
      progress: 5,
      color: "red",
    },
  ];

  const hintHistory = [
    {
      question: "Implement binary search on a sorted array.",
      topic: "Algorithms",
      hintsUsed: 1,
      hintLevel: "Concept",
      solved: true,
      independent: false,
      date: "Today",
    },
    {
      question: "Reverse a linked list.",
      topic: "Data Structures",
      hintsUsed: 0,
      hintLevel: "None",
      solved: true,
      independent: true,
      date: "Yesterday",
    },
    {
      question: "Design a URL shortening service.",
      topic: "System Design",
      hintsUsed: 3,
      hintLevel: "Solution",
      solved: true,
      independent: false,
      date: "2 days ago",
    },
    {
      question: "Explain JavaScript Promises.",
      topic: "JavaScript",
      hintsUsed: 2,
      hintLevel: "Approach",
      solved: true,
      independent: false,
      date: "3 days ago",
    },
    {
      question: "Write a SQL query using JOIN.",
      topic: "Database",
      hintsUsed: 0,
      hintLevel: "None",
      solved: true,
      independent: true,
      date: "4 days ago",
    },
    {
      question: "Find the first non-repeating character.",
      topic: "Data Structures",
      hintsUsed: 1,
      hintLevel: "Concept",
      solved: true,
      independent: false,
      date: "5 days ago",
    },
    {
      question: "Explain time complexity of merge sort.",
      topic: "Algorithms",
      hintsUsed: 2,
      hintLevel: "Approach",
      solved: true,
      independent: false,
      date: "6 days ago",
    },
    {
      question: "Design a scalable notification system.",
      topic: "System Design",
      hintsUsed: 3,
      hintLevel: "Solution",
      solved: false,
      independent: false,
      date: "1 week ago",
    },
  ];

  const progressData = [
    {
      label: "Week 1",
      dependency: 61,
      hints: 42,
    },
    {
      label: "Week 2",
      dependency: 55,
      hints: 38,
    },
    {
      label: "Week 3",
      dependency: 47,
      hints: 31,
    },
    {
      label: "Week 4",
      dependency: 39,
      hints: 24,
    },
    {
      label: "Current",
      dependency: 34,
      hints: 19,
    },
  ];

  const filteredHistory = useMemo(() => {
    if (selectedTopic === "All Topics") {
      return hintHistory;
    }

    return hintHistory.filter(
      (item) => item.topic === selectedTopic
    );
  }, [selectedTopic]);

  const overallStats = useMemo(() => {
    const totalQuestions = topicData.reduce(
      (sum, item) => sum + item.questions,
      0
    );

    const totalHints = topicData.reduce(
      (sum, item) => sum + item.hints,
      0
    );

    const totalIndependent = topicData.reduce(
      (sum, item) => sum + item.solvedWithoutHints,
      0
    );

    const dependency = Math.round(
      ((totalQuestions - totalIndependent) / totalQuestions) * 100
    );

    const averageHints = (
      totalHints / totalQuestions
    ).toFixed(1);

    return {
      totalQuestions,
      totalHints,
      totalIndependent,
      dependency,
      averageHints,
    };
  }, []);

  const getDependencyColor = (score) => {
    if (score <= 30) return "text-green-600";
    if (score <= 45) return "text-orange-500";
    return "text-red-600";
  };

  const getDependencyLabel = (score) => {
    if (score <= 30) return "Low Dependency";
    if (score <= 45) return "Developing";
    return "High Dependency";
  };

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("overview");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center shrink-0">
            <Lightbulb
              size={34}
              className="text-yellow-600"
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Question Hint Usage Analytics
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Understand how often you rely on AI hints and identify
              opportunities to improve independent problem-solving.
            </p>

          </div>

        </div>

        {/* Overview Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <MessageSquare
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Questions Practiced
            </p>

            <p className="text-5xl font-black mt-3">
              {overallStats.totalQuestions}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Lightbulb
              className="mx-auto text-yellow-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Hints Requested
            </p>

            <p className="text-5xl font-black mt-3">
              {overallStats.totalHints}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <ShieldCheck
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Solved Independently
            </p>

            <p className="text-5xl font-black mt-3">
              {overallStats.totalIndependent}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Hint Dependency
            </p>

            <p className="text-5xl font-black mt-3">
              {overallStats.dependency}%
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Hint Dependency Intelligence
            </h2>

          </div>

          <p className="leading-8 text-white/90 max-w-5xl">
            AI analyzes how frequently you request hints, which hint
            levels you use, which questions you solve independently,
            and which topics require the most assistance. The goal is
            not to discourage hints, but to help you gradually become
            more independent.
          </p>

        </div>

        {/* Topic Filter */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

            <div className="flex items-center gap-3">

              <Layers className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Topic-wise Hint Analytics
              </h2>

            </div>

            <select
              value={selectedTopic}
              onChange={(event) =>
                setSelectedTopic(event.target.value)
              }
              className="px-5 py-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 font-semibold"
            >

              <option>
                All Topics
              </option>

              {topicData.map((topic) => (
                <option
                  key={topic.name}
                  value={topic.name}
                >
                  {topic.name}
                </option>
              ))}

            </select>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

            {(selectedTopic === "All Topics"
              ? topicData
              : topicData.filter(
                  (topic) => topic.name === selectedTopic
                )
            ).map((topic) => (

              <div
                key={topic.name}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex items-center justify-between gap-4">

                  <h3 className="text-xl font-bold">
                    {topic.name}
                  </h3>

                  <span
                    className={`text-sm font-black ${getDependencyColor(
                      topic.dependency
                    )}`}
                  >
                    {topic.dependency}%
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-1">
                  {getDependencyLabel(topic.dependency)}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-6">

                  <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">

                    <p className="text-sm text-gray-500">
                      Questions
                    </p>

                    <p className="text-2xl font-black mt-2">
                      {topic.questions}
                    </p>

                  </div>

                  <div className="rounded-xl bg-yellow-50 dark:bg-yellow-900/10 p-4">

                    <p className="text-sm text-gray-500">
                      Hints
                    </p>

                    <p className="text-2xl font-black text-yellow-600 mt-2">
                      {topic.hints}
                    </p>

                  </div>

                </div>

                <div className="mt-6">

                  <div className="flex justify-between mb-2">

                    <span className="text-sm text-gray-500">
                      Independent Solving
                    </span>

                    <span className="text-sm font-bold text-green-600">
                      {topic.solvedWithoutHints}
                    </span>

                  </div>

                  <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width: `${
                          (topic.solvedWithoutHints /
                            topic.questions) *
                          100
                        }%`,
                      }}
                    />

                  </div>

                </div>

                <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">

                  <Lightbulb size={16} />

                  Average {topic.averageHints} hints/question

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Analyze Button */}

        <div className="mt-8 flex justify-center">

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-yellow-500 text-white font-bold text-lg hover:bg-yellow-600 transition disabled:opacity-60"
          >

            {analyzing ? (
              <>
                <RefreshCw
                  size={22}
                  className="animate-spin"
                />

                Analyzing Hint Usage...
              </>
            ) : (
              <>
                <Sparkles size={22} />

                Analyze Hint Dependency
              </>
            )}

          </button>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["overview", "Analytics Overview"],
            ["history", "Hint History"],
            ["progress", "Progress Over Time"],
            ["recommendations", "AI Recommendations"],
          ].map(([value, label]) => (

            <button
              key={value}
              type="button"
              onClick={() => setActiveTab(value)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === value
                  ? "bg-yellow-500 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Overview */}

        {activeTab === "overview" && (

          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            {/* Dependency Score */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <BarChart3 className="text-yellow-600" />

                <h2 className="text-2xl font-bold">
                  Hint Dependency Score
                </h2>

              </div>

              <div className="flex items-center justify-center py-6">

                <div className="relative w-48 h-48 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                  <div className="text-center">

                    <p
                      className={`text-5xl font-black ${getDependencyColor(
                        overallStats.dependency
                      )}`}
                    >
                      {overallStats.dependency}%
                    </p>

                    <p className="text-gray-500 mt-2">
                      {getDependencyLabel(
                        overallStats.dependency
                      )}
                    </p>

                  </div>

                </div>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 via-orange-500 to-red-500"
                  style={{
                    width: `${overallStats.dependency}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 mt-5 leading-6">
                Hint dependency represents the percentage of practiced
                questions where you needed at least one hint or assistance.
              </p>

            </div>

            {/* Independent Solving */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Target className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Independent Problem Solving
                </h2>

              </div>

              <div className="text-center py-5">

                <p className="text-6xl font-black text-green-600">
                  {Math.round(
                    (overallStats.totalIndependent /
                      overallStats.totalQuestions) *
                      100
                  )}
                  %
                </p>

                <p className="text-gray-500 mt-2">
                  questions solved without hints
                </p>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${
                      (overallStats.totalIndependent /
                        overallStats.totalQuestions) *
                      100
                    }%`,
                  }}
                />

              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">

                <div className="rounded-xl bg-green-50 dark:bg-green-900/10 p-5 text-center">

                  <p className="text-sm text-gray-500">
                    Independent
                  </p>

                  <p className="text-3xl font-black text-green-600 mt-2">
                    {overallStats.totalIndependent}
                  </p>

                </div>

                <div className="rounded-xl bg-yellow-50 dark:bg-yellow-900/10 p-5 text-center">

                  <p className="text-sm text-gray-500">
                    Needed Hints
                  </p>

                  <p className="text-3xl font-black text-yellow-600 mt-2">
                    {overallStats.totalQuestions -
                      overallStats.totalIndependent}
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Hint Level Breakdown */}

        {activeTab === "overview" && (

          <div className="mt-8 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-8">

              <Layers className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Hint Level Usage
              </h2>

            </div>

            <div className="grid md:grid-cols-3 gap-6">

              {[
                {
                  title: "Concept Hints",
                  count: 24,
                  description:
                    "Small nudges that remind you of the underlying concept.",
                  color: "blue",
                  icon: "💡",
                },
                {
                  title: "Approach Hints",
                  count: 18,
                  description:
                    "Guidance about the strategy or steps to solve the problem.",
                  color: "orange",
                  icon: "🧭",
                },
                {
                  title: "Solution Hints",
                  count: 12,
                  description:
                    "More direct guidance when you are stuck on implementation.",
                  color: "red",
                  icon: "🛠️",
                },
              ].map((item) => (

                <div
                  key={item.title}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="text-4xl">
                    {item.icon}
                  </div>

                  <h3 className="font-bold text-lg mt-4">
                    {item.title}
                  </h3>

                  <p className="text-4xl font-black text-violet-600 mt-3">
                    {item.count}
                  </p>

                  <p className="text-sm text-gray-500 mt-3 leading-6">
                    {item.description}
                  </p>

                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-5">

                    <div
                      className="h-full bg-violet-600 rounded-full"
                      style={{
                        width: `${Math.min(
                          item.count * 3,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* Hint History */}

        {activeTab === "history" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-8">

              <Clock3 className="text-blue-600" />

              <h2 className="text-2xl font-bold">
                Recent Hint Usage
              </h2>

            </div>

            <div className="space-y-4">

              {filteredHistory.map((item, index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
                >

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">

                    <div>

                      <div className="flex flex-wrap items-center gap-3">

                        <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm font-semibold">
                          {item.topic}
                        </span>

                        <span className="text-sm text-gray-500">
                          {item.date}
                        </span>

                      </div>

                      <h3 className="font-bold text-lg mt-3">
                        {item.question}
                      </h3>

                    </div>

                    <div className="flex flex-wrap items-center gap-4">

                      <div className="text-center">

                        <p className="text-sm text-gray-500">
                          Hints
                        </p>

                        <p
                          className={`text-2xl font-black ${
                            item.hintsUsed === 0
                              ? "text-green-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {item.hintsUsed}
                        </p>

                      </div>

                      <div className="text-center">

                        <p className="text-sm text-gray-500">
                          Level
                        </p>

                        <p className="font-bold mt-1">
                          {item.hintLevel}
                        </p>

                      </div>

                      {item.independent ? (
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-semibold">

                          <CheckCircle2 size={17} />

                          Independent

                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400 font-semibold">

                          <Lightbulb size={17} />

                          Hint Used

                        </span>
                      )}

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* Progress */}

        {activeTab === "progress" && (

          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <TrendingUp className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Hint Dependency Progress
                </h2>

              </div>

              <div className="space-y-7">

                {progressData.map((item) => (

                  <div key={item.label}>

                    <div className="flex justify-between mb-3">

                      <span className="font-semibold">
                        {item.label}
                      </span>

                      <span
                        className={`font-black ${getDependencyColor(
                          item.dependency
                        )}`}
                      >
                        {item.dependency}%
                      </span>

                    </div>

                    <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-orange-500"
                        style={{
                          width: `${item.dependency}%`,
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
                    Hint dependency has decreased by 27%
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Hint Requests Over Time
                </h2>

              </div>

              <div className="space-y-7">

                {progressData.map((item) => (

                  <div key={item.label}>

                    <div className="flex justify-between mb-3">

                      <span className="font-semibold">
                        {item.label}
                      </span>

                      <span className="font-black text-violet-600">
                        {item.hints} hints
                      </span>

                    </div>

                    <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                      <div
                        className="h-full bg-violet-600"
                        style={{
                          width: `${(item.hints / 42) * 100}%`,
                        }}
                      />

                    </div>

                  </div>
                ))}

              </div>

              <div className="mt-8 rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

                <div className="flex items-center gap-3">

                  <Zap className="text-violet-600" />

                  <p className="font-bold">
                    You are requesting fewer hints each week.
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Topic Dependency Table */}

        {activeTab === "progress" && (

          <div className="mt-8 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-8">

              <Target className="text-orange-500" />

              <h2 className="text-2xl font-bold">
                Topic Dependency Comparison
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
                      Questions
                    </th>

                    <th className="p-4">
                      Hints
                    </th>

                    <th className="p-4">
                      Avg. Hints
                    </th>

                    <th className="p-4">
                      Dependency
                    </th>

                    <th className="p-4">
                      Trend
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {topicData.map((topic) => (

                    <tr
                      key={topic.name}
                      className="border-b border-gray-100 dark:border-white/5"
                    >

                      <td className="p-4 font-semibold">
                        {topic.name}
                      </td>

                      <td className="p-4">
                        {topic.questions}
                      </td>

                      <td className="p-4 text-yellow-600 font-bold">
                        {topic.hints}
                      </td>

                      <td className="p-4">
                        {topic.averageHints}
                      </td>

                      <td
                        className={`p-4 font-black ${getDependencyColor(
                          topic.dependency
                        )}`}
                      >
                        {topic.dependency}%
                      </td>

                      <td className="p-4 text-green-600 font-bold">
                        -{topic.progress}%
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

        {/* Recommendations */}

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
                    title: "Practice System Design Independently",
                    description:
                      "System Design currently has your highest hint dependency at 57%. Try spending more time outlining the problem before requesting a hint.",
                    icon: "🏗️",
                  },
                  {
                    title: "Delay Your First Hint",
                    description:
                      "Try working independently for 3–5 minutes before requesting a hint on difficult questions.",
                    icon: "⏳",
                  },
                  {
                    title: "Prefer Concept Hints",
                    description:
                      "Use concept-level hints before approach or solution hints to preserve more of the problem-solving process.",
                    icon: "💡",
                  },
                  {
                    title: "Review Repeated Hint Topics",
                    description:
                      "When the same topic repeatedly requires hints, revisit the underlying concept instead of relying on additional hints.",
                    icon: "📚",
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
                          {item.description}
                        </p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BookOpen className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Independent Practice Plan
                </h2>

              </div>

              <div className="space-y-5">

                {[
                  {
                    step: "1",
                    title: "Read the Question Carefully",
                    description:
                      "Identify the requirements before thinking about a solution.",
                  },
                  {
                    step: "2",
                    title: "Think Before Requesting a Hint",
                    description:
                      "Spend a few minutes developing your own approach.",
                  },
                  {
                    step: "3",
                    title: "Use the Smallest Hint",
                    description:
                      "Start with a concept hint instead of jumping directly to the solution.",
                  },
                  {
                    step: "4",
                    title: "Reflect After Solving",
                    description:
                      "Review why the solution worked and whether you could solve a similar problem independently.",
                  },
                ].map((item) => (

                  <div
                    key={item.step}
                    className="flex gap-4"
                  >

                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center shrink-0">

                      <span className="font-black text-blue-600">
                        {item.step}
                      </span>

                    </div>

                    <div>

                      <h3 className="font-bold">
                        {item.title}
                      </h3>

                      <p className="text-gray-500 mt-1 leading-6">
                        {item.description}
                      </p>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>
        )}

        {/* Strengths */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Award className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Independent Problem-Solving Strengths
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-5">

            {[
              {
                title: "Database",
                value: "68%",
                description:
                  "You solve most database questions without assistance.",
              },
              {
                title: "Data Structures",
                value: "62%",
                description:
                  "Your independent solving ability is improving steadily.",
              },
              {
                title: "Algorithms",
                value: "54%",
                description:
                  "You are increasingly solving algorithm questions without hints.",
              },
            ].map((item) => (

              <div
                key={item.title}
                className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6"
              >

                <CheckCircle2
                  className="text-green-600"
                  size={25}
                />

                <h3 className="text-xl font-bold mt-4">
                  {item.title}
                </h3>

                <p className="text-3xl font-black text-green-600 mt-2">
                  {item.value}
                </p>

                <p className="text-gray-500 mt-3 leading-6">
                  {item.description}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* Hint Usage Principles */}

        <div className="mt-10 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              Smart Hint Usage Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🧠
              </p>

              <h3 className="text-xl font-bold mt-4">
                Think First
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Give yourself enough time to develop an approach before
                requesting help.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                💡
              </p>

              <h3 className="text-xl font-bold mt-4">
                Use Small Hints
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Prefer conceptual nudges instead of immediately viewing
                a complete solution.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🚀
              </p>

              <h3 className="text-xl font-bold mt-4">
                Become Independent
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Gradually reduce hint usage as your understanding improves.
              </p>

            </div>

          </div>

        </div>

        {/* Before vs Current */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Hint Dependency Improvement
            </h2>

          </div>

          <div className="space-y-8">

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Previous dependency
                </span>

                <span className="font-black text-red-500">
                  61%
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-red-500"
                  style={{
                    width: "61%",
                  }}
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Current dependency
                </span>

                <span className="font-black text-green-600">
                  {overallStats.dependency}%
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${overallStats.dependency}%`,
                  }}
                />

              </div>

            </div>

          </div>

          <div className="mt-8 rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

            <div className="flex items-center gap-3">

              <TrendingUp
                size={22}
                className="text-green-600"
              />

              <p className="font-bold">
                Your hint dependency has improved by{" "}
                {61 - overallStats.dependency}%.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Independent Problem-Solving Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                You are becoming more independent with your interview
                practice. Continue reducing unnecessary hint usage while
                still using hints when they genuinely help you learn.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-green-600">
                {100 - overallStats.dependency}%
              </p>

              <p className="text-gray-500 mt-2">
                Independent
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
              style={{
                width: `${100 - overallStats.dependency}%`,
              }}
            />

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
                Hints are useful learning tools, but the strongest
                indicator of independent problem-solving is your ability
                to make progress without assistance. Your hint dependency
                is trending downward. Continue practicing difficult topics,
                delay your first hint, and prefer smaller conceptual hints
                before requesting direct solutions.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Independent
              </h3>

              <p className="text-5xl font-black">
                {100 - overallStats.dependency}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionHintUsageAnalytics;