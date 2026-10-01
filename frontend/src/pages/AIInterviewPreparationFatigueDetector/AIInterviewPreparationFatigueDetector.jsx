import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  BatteryWarning,
  Clock,
  TrendingDown,
  Target,
  Coffee,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Activity,
  CalendarClock,
  Lightbulb,
  ArrowRight,
} from "lucide-react";

const AIInterviewPreparationFatigueDetector = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const activityData = {
    fatigueScore: 68,
    sessionDuration: "2h 18m",
    weeklySessions: 17,
    accuracyChange: "-11%",
    skipRate: "+18%",
    failedAttempts: 7,
    breakInterval: "8 min",
  };

  const signals = [
    {
      title: "Long Session Duration",
      value: "2h 18m",
      description:
        "Your recent sessions are longer than your usual preparation sessions.",
      level: "High",
      icon: Clock,
    },
    {
      title: "Accuracy Decline",
      value: "-11%",
      description:
        "Recent question accuracy has decreased compared with your earlier sessions.",
      level: "Medium",
      icon: TrendingDown,
    },
    {
      title: "Skip Rate Increase",
      value: "+18%",
      description:
        "You are skipping more questions toward the end of recent sessions.",
      level: "High",
      icon: Activity,
    },
    {
      title: "Repeated Failed Attempts",
      value: "7",
      description:
        "Several questions required repeated attempts during recent practice.",
      level: "Medium",
      icon: Target,
    },
  ];

  const recommendations = [
    {
      title: "Take a Short Break",
      description:
        "Pause for 15–20 minutes before starting another intensive practice session.",
      icon: Coffee,
    },
    {
      title: "Switch to Revision Mode",
      description:
        "Use lighter revision activities instead of attempting more difficult problems.",
      icon: Brain,
    },
    {
      title: "Reduce Session Length",
      description:
        "Consider shorter practice blocks with breaks between sessions.",
      icon: Clock,
    },
  ];

  const weeklyData = [
    { day: "Mon", duration: 72, accuracy: 86 },
    { day: "Tue", duration: 85, accuracy: 84 },
    { day: "Wed", duration: 96, accuracy: 81 },
    { day: "Thu", duration: 112, accuracy: 78 },
    { day: "Fri", duration: 128, accuracy: 75 },
    { day: "Sat", duration: 138, accuracy: 72 },
    { day: "Sun", duration: 98, accuracy: 77 },
  ];

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      setActiveTab("overview");
    }, 700);
  };

  const getLevelClass = (level) => {
    if (level === "High") {
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    }

    if (level === "Medium") {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
              <BatteryWarning size={34} className="text-orange-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Preparation Fatigue Detector
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Analyze preparation activity patterns and identify when your
                practice workload may be becoming excessive.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition disabled:opacity-60"
          >
            {analyzing ? (
              <>
                <RefreshCw size={19} className="animate-spin" />
                Analyzing Activity...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Analyze Preparation
              </>
            )}
          </button>

        </div>

        {/* AI Notice */}

        <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 rounded-3xl p-6 sm:p-7">

          <div className="flex items-start gap-4">

            <Brain className="text-blue-600 shrink-0" size={27} />

            <div>

              <h2 className="font-bold text-lg">
                Activity-Based Analysis
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mt-2 leading-7">
                This feature uses only non-sensitive platform activity such
                as session duration, practice frequency, accuracy changes,
                skip rates, failed attempts, and break intervals. It provides
                study-planning suggestions rather than medical or health
                diagnoses.
              </p>

            </div>

          </div>

        </div>

        {/* Summary Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <BatteryWarning className="text-orange-600" size={30} />

            <p className="text-gray-500 mt-4">
              Fatigue Indicator
            </p>

            <p className="text-5xl font-black text-orange-600 mt-2">
              {activityData.fatigueScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Clock className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Current Session
            </p>

            <p className="text-4xl font-black mt-2">
              {activityData.sessionDuration}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Activity className="text-violet-600" size={30} />

            <p className="text-gray-500 mt-4">
              Weekly Sessions
            </p>

            <p className="text-5xl font-black mt-2">
              {activityData.weeklySessions}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <TrendingDown className="text-red-600" size={30} />

            <p className="text-gray-500 mt-4">
              Accuracy Change
            </p>

            <p className="text-5xl font-black text-red-600 mt-2">
              {activityData.accuracyChange}
            </p>

          </div>

        </div>

        {/* Main Fatigue Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-7 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3">

                <BarChart3 className="text-orange-600" />

                <h2 className="text-2xl font-bold">
                  Preparation Fatigue Indicator
                </h2>

              </div>

              <p className="text-gray-500 mt-4 max-w-2xl leading-7">
                Your recent activity shows several workload-related
                performance changes. Consider reducing the intensity of your
                next session and using a lighter preparation activity.
              </p>

            </div>

            <div className="text-center shrink-0">

              <p className="text-7xl font-black text-orange-600">
                {activityData.fatigueScore}%
              </p>

              <p className="text-gray-500 mt-2">
                Activity Fatigue Indicator
              </p>

            </div>

          </div>

          <div className="mt-8">

            <div className="flex justify-between mb-3">

              <span className="text-sm text-gray-500">
                Current activity signal
              </span>

              <span className="font-bold">
                Elevated
              </span>

            </div>

            <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-green-500 via-orange-500 to-red-600 rounded-full"
                style={{
                  width: `${activityData.fatigueScore}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "overview"
                ? "bg-orange-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Fatigue Overview
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("signals")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "signals"
                ? "bg-orange-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Activity Signals
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("recommendations")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "recommendations"
                ? "bg-orange-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Recommendations
          </button>

        </div>

        {/* Overview */}

        {activeTab === "overview" && (
          <div className="mt-6 space-y-8">

            <div className="grid lg:grid-cols-3 gap-6">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <Clock className="text-blue-600" size={30} />

                <p className="text-gray-500 mt-5">
                  Session Duration
                </p>

                <p className="text-4xl font-black mt-2">
                  2h 18m
                </p>

                <p className="text-gray-500 mt-3 leading-6">
                  Longer than your recent average preparation session.
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <TrendingDown className="text-red-600" size={30} />

                <p className="text-gray-500 mt-5">
                  Accuracy Trend
                </p>

                <p className="text-4xl font-black text-red-600 mt-2">
                  -11%
                </p>

                <p className="text-gray-500 mt-3 leading-6">
                  Recent accuracy is lower than your earlier preparation
                  sessions.
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <Coffee className="text-green-600" size={30} />

                <p className="text-gray-500 mt-5">
                  Break Interval
                </p>

                <p className="text-4xl font-black mt-2">
                  8 min
                </p>

                <p className="text-gray-500 mt-3 leading-6">
                  Your recent break intervals are relatively short.
                </p>

              </div>

            </div>

            {/* Activity Chart */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Weekly Preparation Pattern
                </h2>

              </div>

              <div className="space-y-6">

                {weeklyData.map((item) => (

                  <div key={item.day}>

                    <div className="flex items-center justify-between mb-2">

                      <span className="font-semibold w-12">
                        {item.day}
                      </span>

                      <span className="text-sm text-gray-500">
                        {item.duration} min • {item.accuracy}% accuracy
                      </span>

                    </div>

                    <div className="w-full h-3 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                      <div
                        className="h-full bg-orange-500 rounded-full"
                        style={{
                          width: `${Math.min(
                            (item.duration / 150) * 100,
                            100
                          )}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* Signals */}

        {activeTab === "signals" && (
          <div className="mt-6 space-y-6">

            {signals.map((signal) => {

              const Icon = signal.icon;

              return (
                <div
                  key={signal.title}
                  className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                >

                  <div className="flex flex-col md:flex-row items-start md:items-center gap-6">

                    <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0">

                      <Icon
                        size={28}
                        className="text-orange-600"
                      />

                    </div>

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3">

                        <h2 className="text-xl font-bold">
                          {signal.title}
                        </h2>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${getLevelClass(
                            signal.level
                          )}`}
                        >
                          {signal.level} Signal
                        </span>

                      </div>

                      <p className="text-gray-500 mt-2 leading-7">
                        {signal.description}
                      </p>

                    </div>

                    <div className="text-center shrink-0">

                      <p className="text-3xl font-black">
                        {signal.value}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* Recommendations */}

        {activeTab === "recommendations" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Lightbulb className="text-yellow-500" />

                <h2 className="text-2xl font-bold">
                  AI Preparation Recommendations
                </h2>

              </div>

              <div className="grid lg:grid-cols-3 gap-6">

                {recommendations.map((recommendation) => {

                  const Icon = recommendation.icon;

                  return (
                    <div
                      key={recommendation.title}
                      className="rounded-3xl border border-gray-200 dark:border-white/10 p-7"
                    >

                      <div className="w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">

                        <Icon
                          size={28}
                          className="text-green-600"
                        />

                      </div>

                      <h3 className="text-xl font-bold mt-6">
                        {recommendation.title}
                      </h3>

                      <p className="text-gray-500 mt-3 leading-7">
                        {recommendation.description}
                      </p>

                      <button
                        type="button"
                        className="mt-6 inline-flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all"
                      >
                        Apply Recommendation
                        <ArrowRight size={17} />
                      </button>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* Suggested Session */}

            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white">

              <div className="flex items-center gap-3 mb-6">

                <CalendarClock size={30} />

                <h2 className="text-3xl font-bold">
                  Suggested Next Session
                </h2>

              </div>

              <div className="grid md:grid-cols-3 gap-5">

                <div className="rounded-2xl bg-white/10 p-6">

                  <p className="text-white/70">
                    Activity
                  </p>

                  <p className="text-2xl font-bold mt-2">
                    Revision Mode
                  </p>

                </div>

                <div className="rounded-2xl bg-white/10 p-6">

                  <p className="text-white/70">
                    Suggested Duration
                  </p>

                  <p className="text-2xl font-bold mt-2">
                    35–45 min
                  </p>

                </div>

                <div className="rounded-2xl bg-white/10 p-6">

                  <p className="text-white/70">
                    Difficulty
                  </p>

                  <p className="text-2xl font-bold mt-2">
                    Light
                  </p>

                </div>

              </div>

              <p className="text-white/85 mt-7 leading-7 max-w-3xl">
                Based on your recent activity pattern, a lighter revision
                session may be more appropriate than another long,
                high-intensity problem-solving session.
              </p>

            </div>

          </div>
        )}

        {/* Activity Metrics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Activity className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Activity Metrics Used
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">

            {[
              ["Session Duration", activityData.sessionDuration],
              ["Practice Frequency", `${activityData.weeklySessions} sessions`],
              ["Accuracy Change", activityData.accuracyChange],
              ["Skip Rate", activityData.skipRate],
              ["Failed Attempts", activityData.failedAttempts],
              ["Break Interval", activityData.breakInterval],
            ].map(([label, value]) => (

              <div
                key={label}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <p className="text-sm text-gray-500">
                  {label}
                </p>

                <p className="text-2xl font-black mt-2">
                  {value}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* Detection Process */}

        <div className="mt-10 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-7">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              How AI Detects Preparation Fatigue
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              [
                "1",
                "Collect",
                "Review non-sensitive preparation activity.",
              ],
              [
                "2",
                "Compare",
                "Compare recent performance with previous patterns.",
              ],
              [
                "3",
                "Detect",
                "Identify workload and performance changes.",
              ],
              [
                "4",
                "Recommend",
                "Suggest breaks or lighter preparation activities.",
              ],
            ].map(([number, title, description]) => (

              <div
                key={number}
                className="rounded-2xl bg-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-full bg-white text-orange-600 flex items-center justify-center font-black">
                  {number}
                </div>

                <h3 className="text-xl font-bold mt-5">
                  {title}
                </h3>

                <p className="text-white/80 mt-3 leading-6">
                  {description}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* Healthy Preparation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <CheckCircle2 className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Sustainable Preparation Tips
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              {
                icon: "⏱️",
                title: "Use Short Blocks",
                description:
                  "Break long preparation periods into manageable sessions.",
              },
              {
                icon: "☕",
                title: "Take Breaks",
                description:
                  "Use regular breaks between intensive practice blocks.",
              },
              {
                icon: "📚",
                title: "Mix Activities",
                description:
                  "Alternate coding practice with revision and review.",
              },
              {
                icon: "📊",
                title: "Watch Trends",
                description:
                  "Use performance changes to adjust your preparation plan.",
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

                <p className="text-gray-500 mt-3 leading-6">
                  {item.description}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingDown className="text-orange-600" />

            <h2 className="text-2xl font-bold">
              Workload vs Performance
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              ["Week 1", "58%", "84%"],
              ["Week 2", "62%", "82%"],
              ["Week 3", "65%", "79%"],
              ["Current", "68%", "73%"],
            ].map(([week, fatigue, accuracy]) => (

              <div
                key={week}
                className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6"
              >

                <p className="font-bold">
                  {week}
                </p>

                <div className="mt-5">

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">
                      Fatigue signal
                    </span>

                    <span className="font-bold text-orange-600">
                      {fatigue}
                    </span>

                  </div>

                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-2">

                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{
                        width: fatigue,
                      }}
                    />

                  </div>

                </div>

                <div className="mt-5">

                  <div className="flex justify-between text-sm">

                    <span className="text-gray-500">
                      Accuracy
                    </span>

                    <span className="font-bold text-blue-600">
                      {accuracy}
                    </span>

                  </div>

                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-2">

                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{
                        width: accuracy,
                      }}
                    />

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

        {/* Final Recommendation */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3 mb-4">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  AI Final Recommendation
                </h2>

              </div>

              <p className="leading-8 text-white/90 max-w-3xl">
                Your recent preparation activity shows an elevated workload
                signal combined with declining accuracy and increased skips.
                Consider taking a short break and switching to a lighter
                revision session before returning to intensive practice.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                ☕
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Recommended
              </h3>

              <p className="text-4xl font-black">
                Short Break
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewPreparationFatigueDetector;