import React, { useMemo, useState } from "react";
import {
  Brain,
  Target,
  BarChart3,
  TrendingUp,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Settings2,
  RefreshCw,
  Play,
  Clock3,
  BookOpen,
  Zap,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";

const AIInterviewPreparationSessionDifficultyPlanner = () => {
  const [activeTab, setActiveTab] = useState("planner");
  const [difficultyMode, setDifficultyMode] = useState("adaptive");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);

  const [difficulty, setDifficulty] = useState({
    easy: 30,
    medium: 50,
    hard: 20,
  });

  const performance = {
    overallScore: 78,
    accuracy: 82,
    recentAccuracy: 85,
    solvedQuestions: 124,
    averageTime: "8m 24s",
    streak: 12,
  };

  const presets = {
    balanced: {
      easy: 30,
      medium: 50,
      hard: 20,
    },
    foundation: {
      easy: 50,
      medium: 40,
      hard: 10,
    },
    challenge: {
      easy: 20,
      medium: 45,
      hard: 35,
    },
    advanced: {
      easy: 10,
      medium: 40,
      hard: 50,
    },
  };

  const totalQuestions = 20;

  const calculatedQuestions = useMemo(() => {
    return {
      easy: Math.round((difficulty.easy / 100) * totalQuestions),
      medium: Math.round((difficulty.medium / 100) * totalQuestions),
      hard: Math.round((difficulty.hard / 100) * totalQuestions),
    };
  }, [difficulty]);

  const applyPreset = (preset) => {
    setDifficulty(presets[preset]);
    setDifficultyMode("adaptive");
  };

  const updateDifficulty = (type, value) => {
    const newValue = Math.max(0, Math.min(100, Number(value)));

    const otherTypes = Object.keys(difficulty).filter(
      (item) => item !== type
    );

    const remaining = 100 - newValue;

    const firstValue = Math.round(
      (difficulty[otherTypes[0]] /
        (difficulty[otherTypes[0]] + difficulty[otherTypes[1]] || 1)) *
        remaining
    );

    const secondValue = remaining - firstValue;

    setDifficulty({
      ...difficulty,
      [type]: newValue,
      [otherTypes[0]]: firstValue,
      [otherTypes[1]]: secondValue,
    });
  };

  const handleRefresh = () => {
    setIsRefreshing(true);

    setTimeout(() => {
      setDifficulty({
        easy: 30,
        medium: 50,
        hard: 20,
      });

      setIsRefreshing(false);
    }, 700);
  };

  const startSession = () => {
    setSessionStarted(true);

    setTimeout(() => {
      setSessionStarted(false);
    }, 1500);
  };

  const getDifficultyColor = (type) => {
    if (type === "easy") return "text-green-600";
    if (type === "medium") return "text-orange-500";
    return "text-red-600";
  };

  const getDifficultyBg = (type) => {
    if (type === "easy")
      return "bg-green-100 dark:bg-green-900/20";
    if (type === "medium")
      return "bg-orange-100 dark:bg-orange-900/20";
    return "bg-red-100 dark:bg-red-900/20";
  };

  const difficultyData = [
    {
      key: "easy",
      label: "Easy",
      description: "Confidence-building questions and fundamentals.",
      icon: BookOpen,
      color: "green",
    },
    {
      key: "medium",
      label: "Medium",
      description: "Core interview questions requiring reasoning.",
      icon: Target,
      color: "orange",
    },
    {
      key: "hard",
      label: "Hard",
      description: "Advanced questions requiring deeper reasoning.",
      icon: Zap,
      color: "red",
    },
  ];

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <Settings2
                size={34}
                className="text-violet-600"
              />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Preparation Session Difficulty Planner
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Build an adaptive difficulty mix that changes according to
                your interview preparation performance.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-white dark:bg-[#111827] shadow font-semibold hover:-translate-y-0.5 transition disabled:opacity-60"
          >
            <RefreshCw
              size={19}
              className={isRefreshing ? "animate-spin" : ""}
            />
            Recalculate Plan
          </button>

        </div>

        {/* Performance Overview */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <div className="w-12 h-12 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
              <Target
                className="text-violet-600"
                size={25}
              />
            </div>

            <p className="text-gray-500 mt-5">
              Overall Performance
            </p>

            <p className="text-5xl font-black mt-2">
              {performance.overallScore}%
            </p>

            <p className="text-green-600 font-semibold mt-3">
              +7% recently
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
              <CheckCircle2
                className="text-green-600"
                size={25}
              />
            </div>

            <p className="text-gray-500 mt-5">
              Recent Accuracy
            </p>

            <p className="text-5xl font-black mt-2">
              {performance.recentAccuracy}%
            </p>

            <p className="text-gray-500 mt-3">
              Last practice sessions
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
              <BarChart3
                className="text-blue-600"
                size={25}
              />
            </div>

            <p className="text-gray-500 mt-5">
              Questions Solved
            </p>

            <p className="text-5xl font-black mt-2">
              {performance.solvedQuestions}
            </p>

            <p className="text-gray-500 mt-3">
              Total practice history
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">
              <Clock3
                className="text-orange-500"
                size={25}
              />
            </div>

            <p className="text-gray-500 mt-5">
              Average Solve Time
            </p>

            <p className="text-4xl font-black mt-3">
              {performance.averageTime}
            </p>

            <p className="text-gray-500 mt-3">
              Per question
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
                  AI Difficulty Planning Engine
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-4xl">
                Your recent accuracy, performance trend, solving speed, and
                practice history are used to create a balanced difficulty
                distribution for your next preparation session.
              </p>

            </div>

            <div className="text-center shrink-0">

              <p className="text-5xl font-black">
                {performance.streak}
              </p>

              <p className="text-white/80 mt-2">
                Day preparation streak
              </p>

            </div>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => setActiveTab("planner")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "planner"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Difficulty Planner
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("analysis")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "analysis"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            AI Analysis
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("history")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "history"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Difficulty History
          </button>

        </div>

        {/* Planner */}

        {activeTab === "planner" && (
          <div className="mt-6 space-y-8">

            {/* Recommended Distribution */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">

                <div className="flex items-center gap-3">

                  <Sparkles className="text-violet-600" />

                  <div>

                    <h2 className="text-2xl font-bold">
                      Recommended Session Mix
                    </h2>

                    <p className="text-gray-500 mt-1">
                      AI-generated distribution for your next session
                    </p>

                  </div>

                </div>

                <span className="px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 font-semibold">
                  Adaptive Plan
                </span>

              </div>

              <div className="grid md:grid-cols-3 gap-6">

                {difficultyData.map((item) => {

                  const Icon = item.icon;

                  return (
                    <div
                      key={item.key}
                      className={`rounded-2xl border p-6 ${
                        item.key === "easy"
                          ? "border-green-200 dark:border-green-900/30"
                          : item.key === "medium"
                          ? "border-orange-200 dark:border-orange-900/30"
                          : "border-red-200 dark:border-red-900/30"
                      }`}
                    >

                      <div className="flex items-center justify-between">

                        <div
                          className={`w-12 h-12 rounded-xl flex items-center justify-center ${getDifficultyBg(
                            item.key
                          )}`}
                        >

                          <Icon
                            className={getDifficultyColor(item.key)}
                            size={25}
                          />

                        </div>

                        <p
                          className={`text-4xl font-black ${getDifficultyColor(
                            item.key
                          )}`}
                        >
                          {difficulty[item.key]}%
                        </p>

                      </div>

                      <h3 className="text-xl font-bold mt-6">
                        {item.label}
                      </h3>

                      <p className="text-gray-500 mt-2 leading-6">
                        {item.description}
                      </p>

                      <div className="mt-5">

                        <p className="text-sm text-gray-500">
                          Questions in session
                        </p>

                        <p
                          className={`text-3xl font-black mt-1 ${getDifficultyColor(
                            item.key
                          )}`}
                        >
                          {calculatedQuestions[item.key]}
                        </p>

                      </div>

                    </div>
                  );
                })}

              </div>

              {/* Distribution Bar */}

              <div className="mt-8">

                <div className="flex justify-between mb-3">

                  <span className="font-semibold">
                    Difficulty Distribution
                  </span>

                  <span className="text-gray-500">
                    {totalQuestions} questions
                  </span>

                </div>

                <div className="w-full h-7 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden flex">

                  <div
                    className="h-full bg-green-500"
                    style={{
                      width: `${difficulty.easy}%`,
                    }}
                  />

                  <div
                    className="h-full bg-orange-500"
                    style={{
                      width: `${difficulty.medium}%`,
                    }}
                  />

                  <div
                    className="h-full bg-red-500"
                    style={{
                      width: `${difficulty.hard}%`,
                    }}
                  />

                </div>

                <div className="flex flex-wrap gap-6 mt-4 text-sm">

                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-green-500" />
                    Easy {difficulty.easy}%
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-orange-500" />
                    Medium {difficulty.medium}%
                  </span>

                  <span className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    Hard {difficulty.hard}%
                  </span>

                </div>

              </div>

            </div>

            {/* Presets */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Target className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Practice Presets
                </h2>

              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

                {[
                  {
                    key: "balanced",
                    title: "Balanced",
                    description: "Best for regular preparation.",
                  },
                  {
                    key: "foundation",
                    title: "Foundation",
                    description: "More easy questions for fundamentals.",
                  },
                  {
                    key: "challenge",
                    title: "Challenge",
                    description: "More advanced questions.",
                  },
                  {
                    key: "advanced",
                    title: "Advanced",
                    description: "High-intensity interview practice.",
                  },
                ].map((preset) => (

                  <button
                    key={preset.key}
                    type="button"
                    onClick={() => applyPreset(preset.key)}
                    className="text-left rounded-2xl border border-gray-200 dark:border-white/10 p-5 hover:border-violet-500 hover:-translate-y-1 transition"
                  >

                    <h3 className="font-bold text-lg">
                      {preset.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2 leading-5">
                      {preset.description}
                    </p>

                    <p className="text-sm font-semibold text-violet-600 mt-4">
                      {presets[preset.key].easy}% Easy ·{" "}
                      {presets[preset.key].medium}% Medium ·{" "}
                      {presets[preset.key].hard}% Hard
                    </p>

                  </button>
                ))}

              </div>

            </div>

            {/* Manual Controls */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mb-8">

                <div className="flex items-center gap-3">

                  <Settings2 className="text-violet-600" />

                  <div>

                    <h2 className="text-2xl font-bold">
                      Difficulty Controls
                    </h2>

                    <p className="text-gray-500 mt-1">
                      Fine-tune your preparation session.
                    </p>

                  </div>

                </div>

                <select
                  value={difficultyMode}
                  onChange={(e) => setDifficultyMode(e.target.value)}
                  className="rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-800 px-4 py-3 font-semibold"
                >
                  <option value="adaptive">
                    AI Adaptive
                  </option>
                  <option value="manual">
                    Manual
                  </option>
                </select>

              </div>

              <div className="space-y-8">

                {difficultyData.map((item) => (

                  <div key={item.key}>

                    <div className="flex justify-between items-center mb-3">

                      <span className="font-bold">
                        {item.label}
                      </span>

                      <span
                        className={`font-black ${getDifficultyColor(
                          item.key
                        )}`}
                      >
                        {difficulty[item.key]}%
                      </span>

                    </div>

                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={difficulty[item.key]}
                      onChange={(e) =>
                        updateDifficulty(
                          item.key,
                          e.target.value
                        )
                      }
                      disabled={difficultyMode !== "manual"}
                      className="w-full accent-violet-600 disabled:opacity-50"
                    />

                  </div>
                ))}

              </div>

              <div className="mt-8 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <div className="flex items-center gap-3">

                  <ShieldCheck
                    className="text-green-600"
                    size={22}
                  />

                  <p className="font-semibold">
                    Total distribution:{" "}
                    {difficulty.easy +
                      difficulty.medium +
                      difficulty.hard}
                    %
                  </p>

                </div>

              </div>

            </div>

            {/* Start Session */}

            <div className="flex justify-center">

              <button
                type="button"
                onClick={startSession}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-violet-600 text-white font-bold text-lg hover:bg-violet-700 transition shadow-lg"
              >

                {sessionStarted ? (
                  <>
                    <RefreshCw
                      size={23}
                      className="animate-spin"
                    />
                    Preparing Session...
                  </>
                ) : (
                  <>
                    <Play size={23} />
                    Start Adaptive Practice
                  </>
                )}

              </button>

            </div>

          </div>
        )}

        {/* AI Analysis */}

        {activeTab === "analysis" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Brain className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Why AI Recommended This Mix
                </h2>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6">

                  <div className="flex items-center gap-3">

                    <TrendingUp className="text-green-600" />

                    <h3 className="font-bold text-lg">
                      Strong Recent Performance
                    </h3>

                  </div>

                  <p className="text-gray-500 mt-4 leading-7">
                    Your recent accuracy is {performance.recentAccuracy}%,
                    which indicates that you are ready to gradually increase
                    question difficulty.
                  </p>

                </div>

                <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-6">

                  <div className="flex items-center gap-3">

                    <AlertTriangle className="text-orange-500" />

                    <h3 className="font-bold text-lg">
                      Maintain Medium Practice
                    </h3>

                  </div>

                  <p className="text-gray-500 mt-4 leading-7">
                    Medium questions remain the largest portion because they
                    provide the best balance between learning and challenge.
                  </p>

                </div>

                <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-6">

                  <div className="flex items-center gap-3">

                    <Zap className="text-red-600" />

                    <h3 className="font-bold text-lg">
                      Gradually Increase Hard Questions
                    </h3>

                  </div>

                  <p className="text-gray-500 mt-4 leading-7">
                    Hard questions are included to stretch your problem-solving
                    ability without overwhelming the full session.
                  </p>

                </div>

                <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-6">

                  <div className="flex items-center gap-3">

                    <Clock3 className="text-blue-600" />

                    <h3 className="font-bold text-lg">
                      Consider Your Solving Speed
                    </h3>

                  </div>

                  <p className="text-gray-500 mt-4 leading-7">
                    Your average solving time is {performance.averageTime}.
                    Timed medium and hard questions can improve interview
                    readiness.
                  </p>

                </div>

              </div>

            </div>

            {/* Adaptive Rules */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-indigo-600" />

                <h2 className="text-2xl font-bold">
                  Adaptive Difficulty Rules
                </h2>

              </div>

              <div className="space-y-4">

                {[
                  {
                    condition: "Accuracy above 85%",
                    action: "Increase Hard questions",
                    icon: TrendingUp,
                    color: "green",
                  },
                  {
                    condition: "Accuracy between 70% and 85%",
                    action: "Keep a balanced Medium-heavy mix",
                    icon: Target,
                    color: "violet",
                  },
                  {
                    condition: "Accuracy below 70%",
                    action: "Increase Easy questions",
                    icon: TrendingDown,
                    color: "orange",
                  },
                  {
                    condition: "Repeated Hard-question failures",
                    action: "Temporarily reduce Hard difficulty",
                    icon: AlertTriangle,
                    color: "red",
                  },
                ].map((rule) => {

                  const Icon = rule.icon;

                  return (
                    <div
                      key={rule.condition}
                      className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-gray-200 dark:border-white/10 p-5"
                    >

                      <div className="flex items-center gap-4">

                        <Icon
                          className={`${
                            rule.color === "green"
                              ? "text-green-600"
                              : rule.color === "violet"
                              ? "text-violet-600"
                              : rule.color === "orange"
                              ? "text-orange-500"
                              : "text-red-600"
                          }`}
                          size={24}
                        />

                        <div>

                          <p className="text-sm text-gray-500">
                            Condition
                          </p>

                          <p className="font-bold mt-1">
                            {rule.condition}
                          </p>

                        </div>

                      </div>

                      <div className="text-left sm:text-right">

                        <p className="text-sm text-gray-500">
                          AI Action
                        </p>

                        <p className="font-bold mt-1">
                          {rule.action}
                        </p>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

          </div>
        )}

        {/* History */}

        {activeTab === "history" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Previous Session Difficulty
                </h2>

              </div>

              <div className="space-y-6">

                {[
                  {
                    session: "Session #24",
                    date: "Today",
                    easy: 30,
                    medium: 50,
                    hard: 20,
                    accuracy: 82,
                  },
                  {
                    session: "Session #23",
                    date: "Yesterday",
                    easy: 35,
                    medium: 50,
                    hard: 15,
                    accuracy: 85,
                  },
                  {
                    session: "Session #22",
                    date: "2 days ago",
                    easy: 40,
                    medium: 45,
                    hard: 15,
                    accuracy: 79,
                  },
                  {
                    session: "Session #21",
                    date: "4 days ago",
                    easy: 45,
                    medium: 45,
                    hard: 10,
                    accuracy: 74,
                  },
                ].map((session) => (

                  <div
                    key={session.session}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                  >

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

                      <div>

                        <h3 className="font-bold text-lg">
                          {session.session}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {session.date}
                        </p>

                      </div>

                      <div className="text-left sm:text-right">

                        <p className="text-sm text-gray-500">
                          Session Accuracy
                        </p>

                        <p className="text-3xl font-black text-violet-600 mt-1">
                          {session.accuracy}%
                        </p>

                      </div>

                    </div>

                    <div className="mt-6">

                      <div className="w-full h-5 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex">

                        <div
                          className="bg-green-500"
                          style={{
                            width: `${session.easy}%`,
                          }}
                        />

                        <div
                          className="bg-orange-500"
                          style={{
                            width: `${session.medium}%`,
                          }}
                        />

                        <div
                          className="bg-red-500"
                          style={{
                            width: `${session.hard}%`,
                          }}
                        />

                      </div>

                      <div className="flex flex-wrap gap-5 mt-4 text-sm">

                        <span>
                          🟢 Easy {session.easy}%
                        </span>

                        <span>
                          🟠 Medium {session.medium}%
                        </span>

                        <span>
                          🔴 Hard {session.hard}%
                        </span>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>
        )}

        {/* AI Recommendation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

          <div className="flex items-center gap-3 mb-8">

            <Sparkles className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              AI Personalized Recommendation
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <TrendingUp
                className="text-green-600"
                size={27}
              />

              <p className="text-sm text-gray-500 mt-5">
                Current Strength
              </p>

              <h3 className="text-xl font-bold mt-2">
                Medium Questions
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                You are performing consistently on medium-level questions,
                making them ideal for the core of your sessions.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <Zap
                className="text-red-600"
                size={27}
              />

              <p className="text-sm text-gray-500 mt-5">
                Growth Opportunity
              </p>

              <h3 className="text-xl font-bold mt-2">
                Advanced Problems
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Increase exposure to hard questions gradually instead of
                switching directly to an advanced-only session.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <Clock3
                className="text-blue-600"
                size={27}
              />

              <p className="text-sm text-gray-500 mt-5">
                Next Goal
              </p>

              <h3 className="text-xl font-bold mt-2">
                Improve Timed Practice
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Use a balanced mix with time limits to simulate real
                interview pressure.
              </p>

            </div>

          </div>

        </div>

        {/* Final Plan */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3">

                <ShieldCheck className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Recommended Next Session
                </h2>

              </div>

              <p className="text-gray-500 mt-4 leading-7 max-w-2xl">
                Based on your recent performance, a medium-heavy session
                with a controlled number of hard questions will provide the
                best progression without making the session overwhelming.
              </p>

            </div>

            <div className="text-center shrink-0">

              <p className="text-6xl font-black text-violet-600">
                {totalQuestions}
              </p>

              <p className="text-gray-500 mt-2">
                Questions
              </p>

            </div>

          </div>

          <div className="grid sm:grid-cols-3 gap-5 mt-8">

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 p-6 text-center">

              <p className="text-sm text-gray-500">
                Easy
              </p>

              <p className="text-4xl font-black text-green-600 mt-2">
                {calculatedQuestions.easy}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Questions
              </p>

            </div>

            <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-6 text-center">

              <p className="text-sm text-gray-500">
                Medium
              </p>

              <p className="text-4xl font-black text-orange-500 mt-2">
                {calculatedQuestions.medium}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Questions
              </p>

            </div>

            <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 p-6 text-center">

              <p className="text-sm text-gray-500">
                Hard
              </p>

              <p className="text-4xl font-black text-red-600 mt-2">
                {calculatedQuestions.hard}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Questions
              </p>

            </div>

          </div>

        </div>

        {/* Final AI Insight */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-5">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Your recent performance shows that you are ready for a
                gradual increase in challenge. Keep medium questions as the
                foundation of your practice while introducing hard questions
                in controlled amounts. If your accuracy drops significantly,
                the planner can automatically shift the session toward easier
                questions.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Adaptive Mix
              </h3>

              <p className="text-5xl font-black">
                {difficulty.easy}/{difficulty.medium}/{difficulty.hard}
              </p>

              <p className="text-white/80 mt-2">
                Easy / Medium / Hard
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewPreparationSessionDifficultyPlanner;