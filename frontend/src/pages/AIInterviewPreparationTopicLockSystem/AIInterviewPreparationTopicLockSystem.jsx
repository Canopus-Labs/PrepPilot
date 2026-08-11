import React, { useMemo, useState } from "react";
import {
  Brain,
  Lock,
  Unlock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Target,
  TrendingUp,
  BookOpen,
  RefreshCw,
  Settings2,
  ShieldCheck,
  Clock3,
  BarChart3,
  Lightbulb,
  ArrowRight,
  RotateCcw,
} from "lucide-react";

const AIInterviewPreparationTopicLockSystem = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [showLocked, setShowLocked] = useState(true);
  const [topics, setTopics] = useState([
    {
      name: "Arrays",
      category: "Data Structures",
      mastery: 94,
      questions: 42,
      accuracy: 96,
      status: "locked",
      reason: "Consistently high performance",
      lastPracticed: "2 days ago",
      nextReview: "In 7 days",
      color: "green",
    },
    {
      name: "Linked Lists",
      category: "Data Structures",
      mastery: 91,
      questions: 35,
      accuracy: 93,
      status: "locked",
      reason: "Mastery threshold reached",
      lastPracticed: "3 days ago",
      nextReview: "In 6 days",
      color: "green",
    },
    {
      name: "Binary Trees",
      category: "Data Structures",
      mastery: 87,
      questions: 29,
      accuracy: 89,
      status: "active",
      reason: "Needs continued practice",
      lastPracticed: "Today",
      nextReview: "Tomorrow",
      color: "orange",
    },
    {
      name: "Dynamic Programming",
      category: "Algorithms",
      mastery: 64,
      questions: 21,
      accuracy: 67,
      status: "active",
      reason: "Performance needs improvement",
      lastPracticed: "Yesterday",
      nextReview: "Today",
      color: "red",
    },
    {
      name: "Graphs",
      category: "Algorithms",
      mastery: 72,
      questions: 26,
      accuracy: 74,
      status: "active",
      reason: "Approaching mastery",
      lastPracticed: "Today",
      nextReview: "Tomorrow",
      color: "orange",
    },
    {
      name: "SQL",
      category: "Database",
      mastery: 95,
      questions: 38,
      accuracy: 97,
      status: "locked",
      reason: "Consistently high performance",
      lastPracticed: "4 days ago",
      nextReview: "In 8 days",
      color: "green",
    },
    {
      name: "System Design",
      category: "Architecture",
      mastery: 58,
      questions: 14,
      accuracy: 61,
      status: "active",
      reason: "Requires focused preparation",
      lastPracticed: "Yesterday",
      nextReview: "Today",
      color: "red",
    },
    {
      name: "OOP",
      category: "Programming",
      mastery: 92,
      questions: 31,
      accuracy: 94,
      status: "locked",
      reason: "Mastery threshold reached",
      lastPracticed: "5 days ago",
      nextReview: "In 9 days",
      color: "green",
    },
  ]);

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const lockedTopics = useMemo(
    () => topics.filter((topic) => topic.status === "locked"),
    [topics]
  );

  const activeTopics = useMemo(
    () => topics.filter((topic) => topic.status === "active"),
    [topics]
  );

  const averageMastery = useMemo(() => {
    return Math.round(
      topics.reduce((sum, topic) => sum + topic.mastery, 0) /
        topics.length
    );
  }, [topics]);

  const lockedPercentage = useMemo(() => {
    return Math.round((lockedTopics.length / topics.length) * 100);
  }, [lockedTopics, topics]);

  const totalQuestions = useMemo(() => {
    return topics.reduce((sum, topic) => sum + topic.questions, 0);
  }, [topics]);

  const toggleTopic = (topicName) => {
    setTopics((currentTopics) =>
      currentTopics.map((topic) =>
        topic.name === topicName
          ? {
              ...topic,
              status:
                topic.status === "locked" ? "active" : "locked",
              reason:
                topic.status === "locked"
                  ? "Manually unlocked for practice"
                  : "Manually locked by user",
            }
          : topic
      )
    );
  };

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("recommendations");
    }, 800);
  };

  const getMasteryColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-orange-500";
    return "text-red-600";
  };

  const getMasteryBg = (score) => {
    if (score >= 85) {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    if (score >= 70) {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Lock size={34} className="text-violet-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Preparation Topic Lock System
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Lock mastered topics temporarily so your preparation stays
              focused on concepts that still need improvement.
            </p>
          </div>

        </div>

        {/* Overview Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Total Topics
            </p>

            <p className="text-5xl font-black mt-3">
              {topics.length}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Lock
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Locked Topics
            </p>

            <p className="text-5xl font-black mt-3">
              {lockedTopics.length}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BookOpen
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Active Topics
            </p>

            <p className="text-5xl font-black mt-3">
              {activeTopics.length}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Average Mastery
            </p>

            <p className="text-5xl font-black mt-3">
              {averageMastery}%
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-5">

                <Brain size={32} />

                <h2 className="text-2xl sm:text-3xl font-bold">
                  AI Topic Lock Engine
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-4xl">
                AI monitors your performance and identifies topics that
                have reached a strong mastery level. Locked topics receive
                fewer questions while weaker topics receive more practice.
                If performance declines, the system can automatically
                reactivate a topic.
              </p>

            </div>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={analyzing}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white text-violet-700 font-bold hover:bg-gray-100 transition shrink-0 disabled:opacity-60"
            >

              {analyzing ? (
                <>
                  <RefreshCw
                    size={20}
                    className="animate-spin"
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Analyze Topics
                </>
              )}

            </button>

          </div>

        </div>

        {/* Lock Rules */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Settings2 className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Topic Lock Rules
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

              <CheckCircle2
                className="text-green-600"
                size={28}
              />

              <h3 className="text-xl font-bold mt-4">
                Lock Threshold
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Topics reaching 85% or higher mastery can be locked to
                reduce unnecessary repetition.
              </p>

              <p className="text-3xl font-black text-green-600 mt-5">
                85%+
              </p>

            </div>

            <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-6">

              <AlertTriangle
                className="text-orange-500"
                size={28}
              />

              <h3 className="text-xl font-bold mt-4">
                Warning Threshold
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Topics below 70% mastery remain active and receive
                additional practice.
              </p>

              <p className="text-3xl font-black text-orange-500 mt-5">
                &lt; 70%
              </p>

            </div>

            <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-6">

              <RotateCcw
                className="text-blue-600"
                size={28}
              />

              <h3 className="text-xl font-bold mt-4">
                Auto Unlock
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                A locked topic can automatically return to practice when
                recent performance declines.
              </p>

              <p className="text-3xl font-black text-blue-600 mt-5">
                Performance Based
              </p>

            </div>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["overview", "Topic Overview"],
            ["locked", "Locked Topics"],
            ["active", "Active Topics"],
            ["recommendations", "AI Recommendations"],
          ].map(([tab, label]) => (

            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === tab
                  ? "bg-violet-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Topic Overview */}

        {activeTab === "overview" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">

              <div className="flex items-center gap-3">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Preparation Topic Map
                </h2>

              </div>

              <label className="flex items-center gap-3 cursor-pointer">

                <input
                  type="checkbox"
                  checked={showLocked}
                  onChange={(event) =>
                    setShowLocked(event.target.checked)
                  }
                  className="w-5 h-5 accent-violet-600"
                />

                <span className="text-gray-500">
                  Show locked topics
                </span>

              </label>

            </div>

            <div className="space-y-5">

              {topics
                .filter(
                  (topic) =>
                    showLocked || topic.status !== "locked"
                )
                .map((topic) => (

                  <div
                    key={topic.name}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                  >

                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

                      <div className="flex items-start gap-4">

                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                            topic.status === "locked"
                              ? "bg-green-100 text-green-600 dark:bg-green-900/20"
                              : "bg-violet-100 text-violet-600 dark:bg-violet-900/20"
                          }`}
                        >

                          {topic.status === "locked" ? (
                            <Lock size={23} />
                          ) : (
                            <BookOpen size={23} />
                          )}

                        </div>

                        <div>

                          <div className="flex flex-wrap items-center gap-3">

                            <h3 className="text-xl font-bold">
                              {topic.name}
                            </h3>

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-bold ${
                                topic.status === "locked"
                                  ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                  : "bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400"
                              }`}
                            >
                              {topic.status === "locked"
                                ? "LOCKED"
                                : "ACTIVE"}
                            </span>

                          </div>

                          <p className="text-sm text-gray-500 mt-1">
                            {topic.category}
                          </p>

                        </div>

                      </div>

                      <div className="flex items-center gap-6">

                        <div className="text-center">

                          <p className="text-sm text-gray-500">
                            Mastery
                          </p>

                          <p
                            className={`text-2xl font-black mt-1 ${getMasteryColor(
                              topic.mastery
                            )}`}
                          >
                            {topic.mastery}%
                          </p>

                        </div>

                        <div className="text-center">

                          <p className="text-sm text-gray-500">
                            Accuracy
                          </p>

                          <p className="text-2xl font-black mt-1">
                            {topic.accuracy}%
                          </p>

                        </div>

                      </div>

                    </div>

                    <div className="mt-6">

                      <div className="flex justify-between mb-2">

                        <span className="text-sm text-gray-500">
                          Mastery progress
                        </span>

                        <span className="text-sm font-bold">
                          {topic.mastery}%
                        </span>

                      </div>

                      <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                        <div
                          className={`h-full rounded-full ${
                            topic.mastery >= 85
                              ? "bg-green-500"
                              : topic.mastery >= 70
                              ? "bg-orange-500"
                              : "bg-red-500"
                          }`}
                          style={{
                            width: `${topic.mastery}%`,
                          }}
                        />

                      </div>

                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-5">

                      <p className="text-sm text-gray-500">
                        {topic.reason}
                      </p>

                      <button
                        type="button"
                        onClick={() => setSelectedTopic(topic)}
                        className="inline-flex items-center gap-2 text-violet-600 font-semibold hover:underline"
                      >
                        View details
                        <ArrowRight size={17} />
                      </button>

                    </div>

                  </div>

                ))}

            </div>

          </div>
        )}

        {/* Locked Topics */}

        {activeTab === "locked" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-6">

            {lockedTopics.map((topic) => (

              <div
                key={topic.name}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7 border border-green-200 dark:border-green-900/30"
              >

                <div className="flex items-start justify-between gap-5">

                  <div className="flex items-start gap-4">

                    <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">

                      <Lock
                        className="text-green-600"
                        size={24}
                      />

                    </div>

                    <div>

                      <h3 className="text-xl font-bold">
                        {topic.name}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {topic.category}
                      </p>

                    </div>

                  </div>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-xs font-bold">
                    MASTERED
                  </span>

                </div>

                <div className="grid grid-cols-2 gap-5 mt-7">

                  <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                    <p className="text-sm text-gray-500">
                      Mastery
                    </p>

                    <p className="text-3xl font-black text-green-600 mt-2">
                      {topic.mastery}%
                    </p>

                  </div>

                  <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                    <p className="text-sm text-gray-500">
                      Accuracy
                    </p>

                    <p className="text-3xl font-black mt-2">
                      {topic.accuracy}%
                    </p>

                  </div>

                </div>

                <div className="mt-6 rounded-2xl bg-green-50 dark:bg-green-900/10 p-5">

                  <div className="flex items-center gap-3">

                    <Clock3
                      size={20}
                      className="text-green-600"
                    />

                    <p className="font-semibold">
                      Next review: {topic.nextReview}
                    </p>

                  </div>

                  <p className="text-sm text-gray-500 mt-2">
                    Questions are temporarily reduced to keep your
                    preparation focused.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => toggleTopic(topic.name)}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-gray-200 dark:border-white/10 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  <Unlock size={18} />
                  Unlock for Practice
                </button>

              </div>

            ))}

          </div>
        )}

        {/* Active Topics */}

        {activeTab === "active" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-6">

            {activeTopics.map((topic) => (

              <div
                key={topic.name}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
              >

                <div className="flex items-start justify-between gap-5">

                  <div>

                    <span className="inline-block px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm">
                      {topic.category}
                    </span>

                    <h3 className="text-2xl font-bold mt-4">
                      {topic.name}
                    </h3>

                  </div>

                  <BookOpen
                    className="text-violet-600"
                    size={28}
                  />

                </div>

                <div className="mt-7">

                  <div className="flex justify-between mb-2">

                    <span className="text-sm text-gray-500">
                      Mastery
                    </span>

                    <span
                      className={`font-bold ${getMasteryColor(
                        topic.mastery
                      )}`}
                    >
                      {topic.mastery}%
                    </span>

                  </div>

                  <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className={`h-full rounded-full ${
                        topic.mastery >= 85
                          ? "bg-green-500"
                          : topic.mastery >= 70
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${topic.mastery}%`,
                      }}
                    />

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-5 mt-6">

                  <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                    <p className="text-sm text-gray-500">
                      Accuracy
                    </p>

                    <p className="text-2xl font-black mt-2">
                      {topic.accuracy}%
                    </p>

                  </div>

                  <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                    <p className="text-sm text-gray-500">
                      Questions
                    </p>

                    <p className="text-2xl font-black mt-2">
                      {topic.questions}
                    </p>

                  </div>

                </div>

                <div className="mt-6 rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-5">

                  <div className="flex items-center gap-3">

                    {topic.mastery < 70 ? (
                      <AlertTriangle
                        className="text-red-500"
                        size={20}
                      />
                    ) : (
                      <TrendingUp
                        className="text-orange-500"
                        size={20}
                      />
                    )}

                    <p className="font-semibold">
                      {topic.reason}
                    </p>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() => toggleTopic(topic.name)}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition"
                >
                  <Lock size={18} />
                  Lock Topic
                </button>

              </div>

            ))}

          </div>
        )}

        {/* Recommendations */}

        {activeTab === "recommendations" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <Sparkles className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                AI Topic Recommendations
              </h2>

            </div>

            <div className="grid lg:grid-cols-3 gap-6">

              <div className="rounded-2xl border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-900/10 p-6">

                <AlertTriangle
                  className="text-red-600"
                  size={28}
                />

                <h3 className="text-xl font-bold mt-4">
                  Focus Immediately
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  Dynamic Programming and System Design currently have
                  the lowest mastery and should receive more practice.
                </p>

                <div className="flex flex-wrap gap-2 mt-5">

                  {["Dynamic Programming", "System Design"].map(
                    (topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 rounded-full bg-white dark:bg-gray-800 text-sm font-semibold"
                      >
                        {topic}
                      </span>
                    )
                  )}

                </div>

              </div>

              <div className="rounded-2xl border border-orange-200 dark:border-orange-900/30 bg-orange-50 dark:bg-orange-900/10 p-6">

                <TrendingUp
                  className="text-orange-500"
                  size={28}
                />

                <h3 className="text-xl font-bold mt-4">
                  Continue Practicing
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  Binary Trees and Graphs are progressing well but have
                  not reached the lock threshold yet.
                </p>

                <div className="flex flex-wrap gap-2 mt-5">

                  {["Binary Trees", "Graphs"].map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 rounded-full bg-white dark:bg-gray-800 text-sm font-semibold"
                    >
                      {topic}
                    </span>
                  ))}

                </div>

              </div>

              <div className="rounded-2xl border border-green-200 dark:border-green-900/30 bg-green-50 dark:bg-green-900/10 p-6">

                <ShieldCheck
                  className="text-green-600"
                  size={28}
                />

                <h3 className="text-xl font-bold mt-4">
                  Keep Locked
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  Your mastered topics can remain locked temporarily so
                  your practice time is redirected toward weaker areas.
                </p>

                <div className="flex flex-wrap gap-2 mt-5">

                  {["Arrays", "Linked Lists", "SQL"].map(
                    (topic) => (
                      <span
                        key={topic}
                        className="px-3 py-1 rounded-full bg-white dark:bg-gray-800 text-sm font-semibold"
                      >
                        {topic}
                      </span>
                    )
                  )}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Topic Details */}

        {selectedTopic && (
          <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                  {selectedTopic.status === "locked" ? (
                    <Lock
                      className="text-violet-600"
                      size={28}
                    />
                  ) : (
                    <BookOpen
                      className="text-violet-600"
                      size={28}
                    />
                  )}

                </div>

                <div>

                  <h2 className="text-2xl font-bold">
                    {selectedTopic.name}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {selectedTopic.category}
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() => setSelectedTopic(null)}
                className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800 font-semibold"
              >
                Close
              </button>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Mastery
                </p>

                <p className="text-3xl font-black text-green-600 mt-2">
                  {selectedTopic.mastery}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Accuracy
                </p>

                <p className="text-3xl font-black mt-2">
                  {selectedTopic.accuracy}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Questions
                </p>

                <p className="text-3xl font-black mt-2">
                  {selectedTopic.questions}
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Last Practiced
                </p>

                <p className="text-xl font-black mt-3">
                  {selectedTopic.lastPracticed}
                </p>

              </div>

            </div>

            <div className="mt-7 rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

              <div className="flex items-center gap-3">

                <Brain
                  className="text-violet-600"
                  size={22}
                />

                <h3 className="font-bold">
                  AI Status Explanation
                </h3>

              </div>

              <p className="text-gray-500 mt-3 leading-7">
                {selectedTopic.reason}. Based on recent accuracy,
                mastery level, and practice history, the current topic
                status is appropriate for your preparation plan.
              </p>

            </div>

          </div>
        )}

        {/* Practice Distribution */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Practice Distribution
            </h2>

          </div>

          <div className="space-y-7">

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Active Topics
                </span>

                <span className="font-black text-violet-600">
                  {100 - lockedPercentage}%
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-violet-600 rounded-full"
                  style={{
                    width: `${100 - lockedPercentage}%`,
                  }}
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Locked Topics
                </span>

                <span className="font-black text-green-600">
                  {lockedPercentage}%
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{
                    width: `${lockedPercentage}%`,
                  }}
                />

              </div>

            </div>

          </div>

          <div className="mt-8 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-6">

            <div className="flex items-start gap-4">

              <Lightbulb
                className="text-blue-600 shrink-0"
                size={24}
              />

              <div>

                <h3 className="font-bold">
                  AI Practice Optimization
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  {lockedPercentage}% of your topics are currently
                  locked. This allows more of your practice questions to
                  target active topics and potential knowledge gaps.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Auto Unlock Monitoring */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <RefreshCw className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Automatic Topic Reactivation
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">

                <BarChart3
                  className="text-blue-600"
                  size={24}
                />

              </div>

              <h3 className="text-xl font-bold mt-5">
                Monitor Performance
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                AI continuously evaluates recent answers and accuracy
                for locked topics.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">

                <AlertTriangle
                  className="text-orange-500"
                  size={24}
                />

              </div>

              <h3 className="text-xl font-bold mt-5">
                Detect Decline
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                A sudden drop in performance can indicate that a mastered
                topic needs revision.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">

                <Unlock
                  className="text-green-600"
                  size={24}
                />

              </div>

              <h3 className="text-xl font-bold mt-5">
                Reactivate Topic
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Topics showing declining performance can automatically
                return to the active practice pool.
              </p>

            </div>

          </div>

        </div>

        {/* AI Recommendation */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Brain size={30} />

            <h2 className="text-3xl font-bold">
              AI Personalized Recommendation
            </h2>

          </div>

          <p className="leading-8 text-white/90 max-w-4xl">
            Your strongest topics are currently protected from unnecessary
            repetition. Focus most of your preparation time on Dynamic
            Programming, System Design, and Graphs while periodically
            reviewing locked topics to make sure your mastery remains
            stable.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🔒
              </p>

              <h3 className="text-xl font-bold mt-4">
                Keep Mastered Topics Locked
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Continue reducing practice frequency for topics where your
                performance remains consistently strong.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Focus on Weak Areas
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Increase practice for topics with lower mastery and
                accuracy.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🔄
              </p>

              <h3 className="text-xl font-bold mt-4">
                Review Periodically
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Revisit locked topics occasionally so long-term retention
                remains strong.
              </p>

            </div>

          </div>

        </div>

        {/* Final Insight */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <ShieldCheck size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Topic locking helps turn your preparation into a focused
                learning path. Instead of spending equal time on every
                concept, your practice can prioritize areas where you have
                the greatest opportunity to improve while still reviewing
                mastered topics periodically.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🔐
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Topics Locked
              </h3>

              <p className="text-5xl font-black">
                {lockedTopics.length}
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewPreparationTopicLockSystem;