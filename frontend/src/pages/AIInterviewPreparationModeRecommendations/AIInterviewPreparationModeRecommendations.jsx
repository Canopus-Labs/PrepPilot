import React, { useMemo, useState } from "react";
import {
  Brain,
  Sparkles,
  BookOpen,
  Target,
  RefreshCw,
  Mic,
  CalendarDays,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Clock,
  BarChart3,
  Lightbulb,
  Award,
  Zap,
  ShieldCheck,
  PlayCircle,
} from "lucide-react";

const AIInterviewPreparationModeRecommendations = () => {
  const [selectedMode, setSelectedMode] = useState("recommended");
  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const preparationModes = [
    {
      id: "learn",
      title: "Learn Mode",
      description: "Build foundational knowledge and understand important concepts.",
      icon: BookOpen,
      color: "blue",
      score: 72,
      recommendedWhen: "Knowledge gaps are detected.",
      focus: "Foundational concepts",
      duration: "30–45 min",
      questions: 8,
    },
    {
      id: "practice",
      title: "Practice Mode",
      description: "Solve targeted questions based on your weak areas.",
      icon: Target,
      color: "violet",
      score: 91,
      recommendedWhen: "Weak topics need focused practice.",
      focus: "Problem solving",
      duration: "45–60 min",
      questions: 15,
    },
    {
      id: "revision",
      title: "Revision Mode",
      description: "Review concepts that you have previously studied.",
      icon: RefreshCw,
      color: "orange",
      score: 78,
      recommendedWhen: "Previously learned concepts need reinforcement.",
      focus: "Memory retention",
      duration: "25–35 min",
      questions: 10,
    },
    {
      id: "mock",
      title: "Mock Mode",
      description: "Simulate a realistic technical or behavioral interview.",
      icon: Mic,
      color: "green",
      score: 64,
      recommendedWhen: "Knowledge is strong enough for interview simulation.",
      focus: "Interview simulation",
      duration: "30–45 min",
      questions: 12,
    },
    {
      id: "final",
      title: "Final Review Mode",
      description: "Review the most important topics before your interview.",
      icon: CalendarDays,
      color: "red",
      score: 52,
      recommendedWhen: "The interview deadline is approaching.",
      focus: "Last-minute preparation",
      duration: "20–30 min",
      questions: 8,
    },
  ];

  const performanceData = [
    {
      label: "Recent Performance",
      value: 76,
      description: "Good",
      icon: TrendingUp,
    },
    {
      label: "Topic Coverage",
      value: 68,
      description: "Needs Work",
      icon: Target,
    },
    {
      label: "Revision Consistency",
      value: 74,
      description: "Developing",
      icon: RefreshCw,
    },
    {
      label: "Mock Interview Score",
      value: 81,
      description: "Strong",
      icon: Mic,
    },
  ];

  const weakTopics = [
    {
      name: "Dynamic Programming",
      score: 54,
      priority: "Critical",
    },
    {
      name: "System Design",
      score: 61,
      priority: "High",
    },
    {
      name: "Database Optimization",
      score: 67,
      priority: "High",
    },
    {
      name: "Behavioral Questions",
      score: 78,
      priority: "Medium",
    },
  ];

  const recommendationReasons = [
    "Your recent performance is strong enough for targeted practice.",
    "Dynamic Programming is currently your weakest technical topic.",
    "You have completed foundational learning for most core topics.",
    "Your interview deadline is close enough to prioritize high-impact practice.",
  ];

  const schedule = [
    {
      day: "Today",
      mode: "Practice Mode",
      focus: "Dynamic Programming",
      duration: "50 min",
      priority: "Critical",
    },
    {
      day: "Tomorrow",
      mode: "Revision Mode",
      focus: "System Design",
      duration: "30 min",
      priority: "High",
    },
    {
      day: "Day 3",
      mode: "Practice Mode",
      focus: "Database Optimization",
      duration: "45 min",
      priority: "High",
    },
    {
      day: "Day 4",
      mode: "Mock Mode",
      focus: "Technical Interview",
      duration: "40 min",
      priority: "Medium",
    },
  ];

  const recommendedMode = useMemo(() => {
    return preparationModes.find(
      (mode) => mode.id === "practice"
    );
  }, []);

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setSelectedMode("recommended");
      setActiveTab("overview");
    }, 800);
  };

  const getPriorityClasses = (priority) => {
    if (priority === "Critical") {
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    }

    if (priority === "High") {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400";
  };

  const getModeClasses = (mode) => {
    if (mode === "Learn Mode") {
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
    }

    if (mode === "Practice Mode") {
      return "bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400";
    }

    if (mode === "Revision Mode") {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    if (mode === "Mock Mode") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Brain
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Preparation Mode Recommendations
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Get personalized recommendations for the right preparation
              activity based on your current progress, weaknesses, and
              interview timeline.
            </p>
          </div>

        </div>

        {/* Overview Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Preparation Score
            </p>

            <p className="text-5xl font-black mt-3">
              76%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Topic Coverage
            </p>

            <p className="text-5xl font-black mt-3">
              68%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CalendarDays
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Days Remaining
            </p>

            <p className="text-5xl font-black mt-3">
              12
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Zap
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Recommended Fit
            </p>

            <p className="text-5xl font-black mt-3">
              91%
            </p>

          </div>

        </div>

        {/* AI Recommendation Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-5">

                <Sparkles size={32} />

                <h2 className="text-2xl sm:text-3xl font-bold">
                  AI Recommended Preparation Mode
                </h2>

              </div>

              <h3 className="text-4xl font-black">
                Practice Mode
              </h3>

              <p className="leading-8 text-white/90 max-w-3xl mt-4">
                Based on your recent performance, weak topics, revision
                history, and upcoming interview deadline, targeted practice
                will provide the highest preparation value right now.
              </p>

              <div className="flex flex-wrap gap-3 mt-6">

                <span className="px-4 py-2 rounded-full bg-white/15">
                  91% Recommendation Fit
                </span>

                <span className="px-4 py-2 rounded-full bg-white/15">
                  45–60 min
                </span>

                <span className="px-4 py-2 rounded-full bg-white/15">
                  15 Questions
                </span>

              </div>

            </div>

            <div className="text-center shrink-0">

              <div className="w-36 h-36 rounded-full bg-white/10 flex items-center justify-center">

                <div>

                  <Target
                    size={42}
                    className="mx-auto"
                  />

                  <p className="text-3xl font-black mt-2">
                    91%
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Analyze Button */}

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
                Analyzing Preparation...
              </>
            ) : (
              <>
                <Sparkles size={22} />
                Recalculate Recommendation
              </>
            )}

          </button>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["overview", "AI Analysis"],
            ["modes", "Preparation Modes"],
            ["weaknesses", "Weak Topics"],
            ["schedule", "Recommended Plan"],
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

        {/* Overview */}

        {activeTab === "overview" && (

          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Brain className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Why Practice Mode?
                </h2>

              </div>

              <div className="space-y-4">

                {recommendationReasons.map(
                  (reason, index) => (

                    <div
                      key={index}
                      className="flex items-start gap-4 rounded-2xl bg-violet-50 dark:bg-violet-900/10 p-5"
                    >

                      <CheckCircle2
                        size={22}
                        className="text-green-600 mt-1 shrink-0"
                      />

                      <p className="leading-6">
                        {reason}
                      </p>

                    </div>

                  )
                )}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <BarChart3 className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Preparation State
                </h2>

              </div>

              <div className="space-y-6">

                {performanceData.map((item) => {

                  const Icon = item.icon;

                  return (
                    <div key={item.label}>

                      <div className="flex items-center justify-between mb-2">

                        <div className="flex items-center gap-3">

                          <Icon
                            size={19}
                            className="text-violet-600"
                          />

                          <span className="font-semibold">
                            {item.label}
                          </span>

                        </div>

                        <span className="font-black">
                          {item.value}%
                        </span>

                      </div>

                      <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                        <div
                          className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
                          style={{
                            width: `${item.value}%`,
                          }}
                        />

                      </div>

                      <p className="text-sm text-gray-500 mt-2">
                        {item.description}
                      </p>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>
        )}

        {/* Preparation Modes */}

        {activeTab === "modes" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <PlayCircle className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Choose Preparation Mode
              </h2>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {preparationModes.map((mode) => {

                const Icon = mode.icon;

                const isRecommended =
                  mode.id === "practice";

                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() =>
                      setSelectedMode(mode.id)
                    }
                    className={`relative text-left rounded-3xl border p-6 transition hover:-translate-y-1 ${
                      selectedMode === mode.id
                        ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                        : "border-gray-200 dark:border-white/10"
                    }`}
                  >

                    {isRecommended && (
                      <span className="absolute top-5 right-5 px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-xs font-bold">
                        AI Recommended
                      </span>
                    )}

                    <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                      <Icon
                        size={28}
                        className="text-violet-600"
                      />

                    </div>

                    <h3 className="text-xl font-bold mt-5">
                      {mode.title}
                    </h3>

                    <p className="text-gray-500 mt-3 leading-6">
                      {mode.description}
                    </p>

                    <div className="mt-6">

                      <div className="flex justify-between mb-2">

                        <span className="text-sm text-gray-500">
                          Recommendation Fit
                        </span>

                        <span className="font-black text-violet-600">
                          {mode.score}%
                        </span>

                      </div>

                      <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700">

                        <div
                          className="h-full bg-violet-600 rounded-full"
                          style={{
                            width: `${mode.score}%`,
                          }}
                        />

                      </div>

                    </div>

                    <div className="grid grid-cols-2 gap-3 mt-6">

                      <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3">

                        <p className="text-xs text-gray-500">
                          Focus
                        </p>

                        <p className="font-semibold text-sm mt-1">
                          {mode.focus}
                        </p>

                      </div>

                      <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-3">

                        <p className="text-xs text-gray-500">
                          Duration
                        </p>

                        <p className="font-semibold text-sm mt-1">
                          {mode.duration}
                        </p>

                      </div>

                    </div>

                  </button>
                );
              })}

            </div>

          </div>
        )}

        {/* Weak Topics */}

        {activeTab === "weaknesses" && (

          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <AlertTriangle className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Topics Needing Attention
                </h2>

              </div>

              <div className="space-y-5">

                {weakTopics.map((topic) => (

                  <div
                    key={topic.name}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
                  >

                    <div className="flex items-center justify-between gap-4">

                      <div>

                        <h3 className="font-bold text-lg">
                          {topic.name}
                        </h3>

                        <span
                          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-bold ${getPriorityClasses(
                            topic.priority
                          )}`}
                        >
                          {topic.priority}
                        </span>

                      </div>

                      <p className="text-3xl font-black text-orange-500">
                        {topic.score}%
                      </p>

                    </div>

                    <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 mt-5">

                      <div
                        className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                        style={{
                          width: `${topic.score}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-3xl p-7 text-white">

              <div className="flex items-center gap-3 mb-7">

                <Target size={30} />

                <h2 className="text-2xl font-bold">
                  AI Focus Recommendation
                </h2>

              </div>

              <p className="text-5xl font-black">
                Dynamic Programming
              </p>

              <p className="text-white/90 leading-7 mt-5">
                Your current performance in Dynamic Programming is
                significantly below your overall preparation score.
                Practice questions in this topic before moving to a full
                mock interview.
              </p>

              <div className="mt-8 rounded-2xl bg-white/10 p-5">

                <p className="text-sm text-white/70">
                  Recommended Activity
                </p>

                <p className="text-xl font-bold mt-2">
                  10 Targeted Questions
                </p>

                <p className="text-white/80 mt-2">
                  Estimated time: 40–50 minutes
                </p>

              </div>

              <button
                type="button"
                className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-orange-600 font-bold"
              >
                Start Practice
                <ArrowRight size={18} />
              </button>

            </div>

          </div>
        )}

        {/* Recommended Plan */}

        {activeTab === "schedule" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <CalendarDays className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                AI Recommended Preparation Plan
              </h2>

            </div>

            <div className="space-y-5">

              {schedule.map((item, index) => (

                <div
                  key={index}
                  className="grid md:grid-cols-[120px_1fr_auto] items-center gap-5 rounded-2xl border border-gray-200 dark:border-white/10 p-5"
                >

                  <div>

                    <p className="text-sm text-gray-500">
                      Schedule
                    </p>

                    <p className="font-bold mt-1">
                      {item.day}
                    </p>

                  </div>

                  <div>

                    <div className="flex flex-wrap items-center gap-3">

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${getModeClasses(
                          item.mode
                        )}`}
                      >
                        {item.mode}
                      </span>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-bold ${getPriorityClasses(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>

                    </div>

                    <h3 className="font-bold text-lg mt-3">
                      {item.focus}
                    </h3>

                  </div>

                  <div className="text-right">

                    <div className="flex items-center gap-2 text-gray-500">

                      <Clock size={17} />

                      {item.duration}

                    </div>

                    <button
                      type="button"
                      className="mt-3 inline-flex items-center gap-2 text-violet-600 font-bold"
                    >
                      Start
                      <ArrowRight size={17} />
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

        {/* Interview Timeline */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <CalendarDays className="text-red-500" />

            <h2 className="text-2xl font-bold">
              Interview Preparation Timeline
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-6">

              <p className="text-sm text-blue-600">
                Current Stage
              </p>

              <h3 className="text-2xl font-bold mt-2">
                Skill Building
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Focus on targeted practice and reinforce weak technical
                concepts.
              </p>

            </div>

            <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-6">

              <p className="text-sm text-violet-600">
                Next Stage
              </p>

              <h3 className="text-2xl font-bold mt-2">
                Mock Interviews
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Move to realistic interview simulations after improving
                your weakest topics.
              </p>

            </div>

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

              <p className="text-sm text-green-600">
                Final Stage
              </p>

              <h3 className="text-2xl font-bold mt-2">
                Final Review
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Review important concepts, common mistakes, and interview
                communication before the deadline.
              </p>

            </div>

          </div>

        </div>

        {/* AI Decision Factors */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Decision Factors
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">

            {[
              {
                label: "Performance",
                value: 76,
                icon: TrendingUp,
              },
              {
                label: "Weak Topics",
                value: 54,
                icon: AlertTriangle,
              },
              {
                label: "Revision",
                value: 74,
                icon: RefreshCw,
              },
              {
                label: "Mock Results",
                value: 81,
                icon: Mic,
              },
              {
                label: "Deadline",
                value: 84,
                icon: CalendarDays,
              },
            ].map((item) => {

              const Icon = item.icon;

              return (
                <div
                  key={item.label}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-5 text-center"
                >

                  <Icon
                    className="mx-auto text-violet-600"
                    size={25}
                  />

                  <p className="text-sm text-gray-500 mt-4">
                    {item.label}
                  </p>

                  <p className="text-3xl font-black text-violet-600 mt-2">
                    {item.value}%
                  </p>

                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-4">

                    <div
                      className="h-full bg-violet-600 rounded-full"
                      style={{
                        width: `${item.value}%`,
                      }}
                    />

                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* Mode Recommendation Comparison */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Preparation Mode Recommendation Scores
            </h2>

          </div>

          <div className="space-y-6">

            {preparationModes.map((mode) => (

              <div key={mode.id}>

                <div className="flex items-center justify-between mb-2">

                  <div className="flex items-center gap-3">

                    <span className="font-semibold">
                      {mode.title}
                    </span>

                    {mode.id === "practice" && (
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-xs font-bold">
                        Best Match
                      </span>
                    )}

                  </div>

                  <span className="font-black">
                    {mode.score}%
                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
                    style={{
                      width: `${mode.score}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Personalized Recommendation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              AI Personalized Recommendation
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Current Focus
              </p>

              <h3 className="text-xl font-bold mt-2">
                Targeted Practice
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Focus on questions from Dynamic Programming and System
                Design before increasing mock interview frequency.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Avoid For Now
              </p>

              <h3 className="text-xl font-bold mt-2">
                Excessive Mock Sessions
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Your mock score is already strong. Additional targeted
                practice will currently provide more value.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Transition
              </p>

              <h3 className="text-xl font-bold mt-2">
                Mock Mode
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Once your weakest topics reach approximately 75%,
                transition toward full mock interview simulations.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                AI Preparation Readiness
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your preparation is progressing well. The highest-value
                activity right now is targeted practice focused on your
                weakest concepts.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                76%
              </p>

              <p className="text-gray-500 mt-2">
                Preparation Ready
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
              style={{
                width: "76%",
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
                  AI Final Recommendation
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Practice Mode is currently the best fit for your
                preparation. Focus on your weakest topics with targeted
                questions, then gradually transition into Mock Mode as
                your topic scores improve. As the interview approaches,
                use Final Review Mode to consolidate the most important
                concepts.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Best Mode
              </h3>

              <p className="text-4xl font-black">
                Practice
              </p>

              <p className="text-white/80 mt-2">
                91% fit
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewPreparationModeRecommendations;