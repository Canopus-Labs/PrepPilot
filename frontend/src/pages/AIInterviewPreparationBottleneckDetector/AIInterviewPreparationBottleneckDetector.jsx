import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Lock,
  TrendingDown,
  RefreshCw,
  ArrowRight,
  GitBranch,
  ListChecks,
  Zap,
} from "lucide-react";

const bottlenecks = [
  {
    title: "Advanced DSA",
    category: "Technical",
    impact: "Very High",
    score: 94,
    reason:
      "Repeated failures in advanced algorithm topics are blocking coding practice and mock interview readiness.",
    icon: Target,
  },
  {
    title: "Coding Practice",
    category: "Practice",
    impact: "High",
    score: 81,
    reason:
      "Practice cannot progress effectively until the advanced DSA prerequisite is completed.",
    icon: GitBranch,
  },
  {
    title: "System Design",
    category: "System Design",
    impact: "Medium",
    score: 58,
    reason:
      "Some concepts remain incomplete, but they are not currently blocking the main preparation path.",
    icon: ListChecks,
  },
];

const AIInterviewPreparationBottleneckDetector = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedTask, setSelectedTask] = useState("Advanced DSA");

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("overview");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center shrink-0">
              <AlertTriangle size={34} className="text-red-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Preparation Bottleneck Detector
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Identify the preparation activity that is blocking the most
                progress and focus on the highest-impact action.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition disabled:opacity-60"
          >
            {analyzing ? (
              <>
                <RefreshCw size={19} className="animate-spin" />
                Detecting Bottleneck...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Analyze Preparation
              </>
            )}
          </button>

        </div>

        {/* Hero */}

        <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Find the One Thing Holding You Back
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI analyzes incomplete prerequisites, repeated failures, delayed
            tasks, low-performing modules, and dependency relationships to
            identify the bottleneck with the greatest impact on your
            preparation.
          </p>

        </div>

        {/* Summary */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <AlertTriangle className="text-red-600" size={30} />

            <p className="text-gray-500 mt-4">
              Main Bottleneck
            </p>

            <p className="text-2xl font-black text-red-600 mt-2">
              Advanced DSA
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Zap className="text-orange-600" size={30} />

            <p className="text-gray-500 mt-4">
              Bottleneck Impact
            </p>

            <p className="text-4xl font-black text-orange-600 mt-2">
              94%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Lock className="text-purple-600" size={30} />

            <p className="text-gray-500 mt-4">
              Blocked Activities
            </p>

            <p className="text-4xl font-black text-purple-600 mt-2">
              2
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <TrendingDown className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Priority
            </p>

            <p className="text-4xl font-black text-blue-600 mt-2">
              High
            </p>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["overview", "Bottleneck Overview"],
            ["dependencies", "Dependency Impact"],
            ["performance", "Performance Signals"],
            ["action", "Recommended Action"],
          ].map(([id, label]) => (

            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === id
                  ? "bg-red-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Overview */}

        {activeTab === "overview" && (
          <div className="mt-6 space-y-7">

            {/* Main Bottleneck */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

                <div>

                  <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">

                      <AlertTriangle
                        size={27}
                        className="text-red-600"
                      />

                    </div>

                    <div>

                      <p className="text-sm text-red-600 font-bold uppercase tracking-wide">
                        Main Preparation Bottleneck
                      </p>

                      <h2 className="text-3xl font-black mt-1">
                        Advanced DSA
                      </h2>

                    </div>

                  </div>

                  <p className="text-gray-500 mt-6 max-w-3xl leading-7">
                    AI detected repeated failures in advanced algorithm
                    questions. This is preventing the user from progressing
                    confidently into coding practice and full mock interviews.
                  </p>

                </div>

                <div className="text-center shrink-0">

                  <p className="text-7xl font-black text-red-600">
                    94
                  </p>

                  <p className="text-gray-500 mt-2">
                    Bottleneck Impact Score
                  </p>

                </div>

              </div>

            </div>

            {/* Why It's a Bottleneck */}

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-red-50 dark:bg-red-900/10 rounded-3xl p-7">

                <div className="flex items-center gap-3">

                  <TrendingDown
                    className="text-red-600"
                    size={28}
                  />

                  <h2 className="text-xl font-bold text-red-700 dark:text-red-400">
                    Performance Signal
                  </h2>

                </div>

                <p className="text-gray-600 dark:text-gray-300 mt-5 leading-7">
                  Advanced DSA accuracy has dropped from 76% to 58% over recent
                  practice sessions, with several repeated failed attempts.
                </p>

                <div className="mt-6">

                  <div className="flex justify-between text-sm mb-2">

                    <span>Current accuracy</span>

                    <strong className="text-red-600">
                      58%
                    </strong>

                  </div>

                  <div className="h-3 rounded-full bg-red-200 dark:bg-red-900/30">

                    <div
                      className="h-full rounded-full bg-red-600"
                      style={{ width: "58%" }}
                    />

                  </div>

                </div>

              </div>

              <div className="bg-orange-50 dark:bg-orange-900/10 rounded-3xl p-7">

                <div className="flex items-center gap-3">

                  <Lock
                    className="text-orange-600"
                    size={28}
                  />

                  <h2 className="text-xl font-bold text-orange-700 dark:text-orange-400">
                    Dependency Signal
                  </h2>

                </div>

                <p className="text-gray-600 dark:text-gray-300 mt-5 leading-7">
                  Coding Practice and Mock Interview readiness depend on
                  stronger Advanced DSA performance.
                </p>

                <div className="flex flex-wrap gap-3 mt-6">

                  <span className="px-3 py-2 rounded-xl bg-white dark:bg-gray-800 text-sm font-semibold">
                    Coding Practice
                  </span>

                  <span className="px-3 py-2 rounded-xl bg-white dark:bg-gray-800 text-sm font-semibold">
                    Mock Interview
                  </span>

                </div>

              </div>

            </div>

            {/* Bottleneck Ranking */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChartIcon />

                <h2 className="text-2xl font-bold">
                  AI Bottleneck Ranking
                </h2>

              </div>

              <div className="space-y-5">

                {bottlenecks.map((item, index) => {

                  const Icon = item.icon;

                  return (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() => setSelectedTask(item.title)}
                      className={`w-full text-left rounded-2xl border-2 p-6 transition ${
                        selectedTask === item.title
                          ? "border-red-500 bg-red-50 dark:bg-red-900/10"
                          : "border-gray-200 dark:border-white/10"
                      }`}
                    >

                      <div className="flex flex-col lg:flex-row gap-5">

                        <div className="flex items-center gap-4">

                          <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-black">
                            {index + 1}
                          </div>

                          <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">

                            <Icon
                              size={24}
                              className="text-red-600"
                            />

                          </div>

                        </div>

                        <div className="flex-1">

                          <div className="flex flex-wrap items-center gap-3">

                            <h3 className="text-xl font-bold">
                              {item.title}
                            </h3>

                            <span className="px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-bold">
                              {item.category}
                            </span>

                            <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400 text-xs font-bold">
                              {item.impact} Impact
                            </span>

                          </div>

                          <p className="text-gray-500 mt-3 leading-6">
                            {item.reason}
                          </p>

                        </div>

                        <div className="lg:w-32 shrink-0">

                          <p className="text-sm text-gray-500 mb-2">
                            Impact
                          </p>

                          <p className="text-3xl font-black text-red-600">
                            {item.score}
                          </p>

                          <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-2">

                            <div
                              className="h-full rounded-full bg-red-600"
                              style={{
                                width: `${item.score}%`,
                              }}
                            />

                          </div>

                        </div>

                      </div>

                    </button>
                  );
                })}

              </div>

            </div>

          </div>
        )}

        {/* Dependencies */}

        {activeTab === "dependencies" && (
          <div className="mt-6 space-y-7">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <GitBranch className="text-red-600" />

                <h2 className="text-2xl font-bold">
                  Dependency Impact Map
                </h2>

              </div>

              <div className="grid lg:grid-cols-3 gap-5">

                <div className="rounded-2xl border-2 border-green-300 bg-green-50 dark:border-green-900/30 dark:bg-green-900/10 p-6">

                  <div className="flex items-center gap-3">

                    <CheckCircle2 className="text-green-600" />

                    <h3 className="font-bold">
                      Completed
                    </h3>

                  </div>

                  <p className="text-lg font-bold mt-5">
                    DSA Basics
                  </p>

                  <p className="text-gray-500 mt-2 text-sm">
                    Foundation completed successfully.
                  </p>

                </div>

                <div className="rounded-2xl border-2 border-red-300 bg-red-50 dark:border-red-900/30 dark:bg-red-900/10 p-6">

                  <div className="flex items-center gap-3">

                    <AlertTriangle className="text-red-600" />

                    <h3 className="font-bold">
                      Current Bottleneck
                    </h3>

                  </div>

                  <p className="text-lg font-bold mt-5">
                    Advanced DSA
                  </p>

                  <p className="text-gray-500 mt-2 text-sm">
                    Current dependency blocking further progress.
                  </p>

                </div>

                <div className="rounded-2xl border-2 border-orange-300 bg-orange-50 dark:border-orange-900/30 dark:bg-orange-900/10 p-6">

                  <div className="flex items-center gap-3">

                    <Lock className="text-orange-600" />

                    <h3 className="font-bold">
                      Blocked
                    </h3>

                  </div>

                  <p className="text-lg font-bold mt-5">
                    Coding Practice
                  </p>

                  <p className="text-gray-500 mt-2 text-sm">
                    Waiting for stronger advanced DSA preparation.
                  </p>

                </div>

              </div>

              <div className="flex justify-center py-6">

                <ArrowRight
                  size={30}
                  className="text-gray-400 rotate-90"
                />

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-7 text-center">

                <p className="text-sm text-gray-500">
                  Final downstream activity
                </p>

                <h3 className="text-2xl font-black mt-2">
                  Mock Interview
                </h3>

                <p className="text-gray-500 mt-2">
                  Depends on coding practice, system design, behavioral
                  preparation, and project readiness.
                </p>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <h2 className="text-2xl font-bold">
                Blocked Progress
              </h2>

              <p className="text-gray-500 mt-3 leading-7">
                Resolving Advanced DSA has the highest downstream impact
                because it unlocks the next major practice stage.
              </p>

              <div className="grid md:grid-cols-3 gap-5 mt-7">

                {[
                  ["Advanced DSA", "Current bottleneck", 94],
                  ["Coding Practice", "Blocked by DSA", 81],
                  ["Mock Interview", "Indirectly affected", 73],
                ].map(([title, description, score]) => (

                  <div
                    key={title}
                    className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6"
                  >

                    <h3 className="font-bold">
                      {title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {description}
                    </p>

                    <p className="text-4xl font-black text-red-600 mt-5">
                      {score}%
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      downstream impact
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* Performance */}

        {activeTab === "performance" && (
          <div className="mt-6 space-y-7">

            <div className="grid md:grid-cols-2 gap-6">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3">

                  <TrendingDown
                    className="text-red-600"
                    size={28}
                  />

                  <h2 className="text-2xl font-bold">
                    Accuracy Trend
                  </h2>

                </div>

                <p className="text-5xl font-black text-red-600 mt-7">
                  58%
                </p>

                <p className="text-gray-500 mt-2">
                  Current Advanced DSA accuracy
                </p>

                <div className="mt-7 h-5 rounded-full bg-gray-200 dark:bg-gray-700">

                  <div
                    className="h-full rounded-full bg-red-600"
                    style={{ width: "58%" }}
                  />

                </div>

                <div className="flex justify-between text-sm mt-3">

                  <span>
                    Previous: 76%
                  </span>

                  <span className="text-red-600 font-bold">
                    -18%
                  </span>

                </div>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3">

                  <Clock
                    className="text-orange-600"
                    size={28}
                  />

                  <h2 className="text-2xl font-bold">
                    Solving Time
                  </h2>

                </div>

                <p className="text-5xl font-black text-orange-600 mt-7">
                  +31%
                </p>

                <p className="text-gray-500 mt-2">
                  Increase in average solving time
                </p>

                <div className="mt-7 grid grid-cols-2 gap-4">

                  <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">

                    <p className="text-sm text-gray-500">
                      Previous
                    </p>

                    <p className="font-black text-xl mt-1">
                      18 min
                    </p>

                  </div>

                  <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4">

                    <p className="text-sm text-gray-500">
                      Current
                    </p>

                    <p className="font-black text-xl mt-1">
                      24 min
                    </p>

                  </div>

                </div>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <ListChecks className="text-red-600" />

                <h2 className="text-2xl font-bold">
                  Detected Warning Signals
                </h2>

              </div>

              <div className="space-y-4">

                {[
                  [
                    "Repeated failed attempts",
                    "Dynamic Programming and Graph problems have multiple recent failed attempts.",
                  ],
                  [
                    "Accuracy decline",
                    "Advanced DSA accuracy has fallen by 18 percentage points.",
                  ],
                  [
                    "Delayed task",
                    "Advanced DSA has exceeded its planned completion date.",
                  ],
                  [
                    "Downstream blockage",
                    "Coding Practice cannot progress efficiently until this weakness improves.",
                  ],
                ].map(([title, description]) => (

                  <div
                    key={title}
                    className="flex gap-4 rounded-2xl bg-red-50 dark:bg-red-900/10 p-5"
                  >

                    <AlertTriangle
                      size={22}
                      className="text-red-600 shrink-0 mt-1"
                    />

                    <div>

                      <h3 className="font-bold">
                        {title}
                      </h3>

                      <p className="text-gray-500 mt-1 leading-6">
                        {description}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* Recommended Action */}

        {activeTab === "action" && (
          <div className="mt-6 space-y-7">

            <div className="bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-3xl p-8 sm:p-10 text-white">

              <div className="flex items-center gap-3 mb-5">

                <Zap size={32} />

                <h2 className="text-3xl font-bold">
                  Highest-Impact Action
                </h2>

              </div>

              <p className="text-xl font-semibold leading-8">
                Pause broad practice temporarily and focus on Advanced DSA
                weaknesses before increasing the coding practice workload.
              </p>

              <p className="text-white/90 mt-4 leading-7">
                Resolving this bottleneck should unlock the largest amount of
                downstream preparation progress.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Target className="text-red-600" />

                <h2 className="text-2xl font-bold">
                  Recommended Action Plan
                </h2>

              </div>

              <div className="space-y-5">

                {[
                  [
                    "Review weak Advanced DSA concepts",
                    "Focus on the topics responsible for repeated failed attempts.",
                  ],
                  [
                    "Solve targeted problems",
                    "Practice a small set of problems specifically covering those weak patterns.",
                  ],
                  [
                    "Reassess performance",
                    "Measure accuracy and solving time after the targeted revision.",
                  ],
                  [
                    "Resume Coding Practice",
                    "Increase broader coding practice after Advanced DSA performance stabilizes.",
                  ],
                ].map(([title, description], index) => (

                  <div
                    key={title}
                    className="flex gap-5 rounded-2xl bg-gray-50 dark:bg-gray-800 p-6"
                  >

                    <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-black shrink-0">
                      {index + 1}
                    </div>

                    <div className="flex-1">

                      <h3 className="text-lg font-bold">
                        {title}
                      </h3>

                      <p className="text-gray-500 mt-2 leading-6">
                        {description}
                      </p>

                    </div>

                    <ArrowRight
                      className="text-gray-400 hidden sm:block"
                      size={22}
                    />

                  </div>

                ))}

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-5">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <p className="text-sm text-gray-500">
                  Recommended Focus
                </p>

                <p className="text-2xl font-black mt-2">
                  Advanced DSA
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <p className="text-sm text-gray-500">
                  Target Accuracy
                </p>

                <p className="text-2xl font-black text-green-600 mt-2">
                  75%+
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <p className="text-sm text-gray-500">
                  Next Milestone
                </p>

                <p className="text-2xl font-black text-purple-600 mt-2">
                  Unlock Coding Practice
                </p>

              </div>

            </div>

          </div>
        )}

        {/* How It Works */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-red-600" />

            <h2 className="text-2xl font-bold">
              How AI Bottleneck Detection Works
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              [
                "1",
                "Collect Signals",
                "Analyze incomplete tasks, failures, delays, performance, and dependencies.",
              ],
              [
                "2",
                "Measure Impact",
                "Determine which weakness has the greatest effect on overall progress.",
              ],
              [
                "3",
                "Find Bottleneck",
                "Identify the single activity currently blocking the most progress.",
              ],
              [
                "4",
                "Recommend Action",
                "Provide the highest-impact next action to resolve the bottleneck.",
              ],
            ].map(([number, title, description]) => (

              <div
                key={number}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-black">
                  {number}
                </div>

                <h3 className="font-bold text-lg mt-5">
                  {title}
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Benefits */}

        <div className="mt-10 bg-gradient-to-r from-red-600 via-orange-600 to-amber-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-8">

            <CheckCircle2 size={30} />

            <h2 className="text-3xl font-bold">
              Benefits
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              [
                "🎯",
                "Focus on the Blocker",
                "Directs preparation toward the activity preventing the most progress.",
              ],
              [
                "⚡",
                "Higher Impact",
                "Prioritizes actions that can unlock multiple downstream activities.",
              ],
              [
                "📉",
                "Detect Problems Early",
                "Identifies declining performance and repeated failures before they grow.",
              ],
              [
                "🧠",
                "Actionable Guidance",
                "Converts preparation analytics into a clear next step.",
              ],
            ].map(([icon, title, description]) => (

              <div
                key={title}
                className="rounded-2xl bg-white/10 p-6"
              >

                <div className="text-4xl">
                  {icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {title}
                </h3>

                <p className="text-white/80 mt-3 leading-6">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Final Recommendation */}

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
                Advanced DSA is currently the highest-impact preparation
                bottleneck. Focus on its weak concepts and repeated failure
                patterns first. Once performance improves, Coding Practice can
                progress more effectively and move you closer to mock interview
                readiness.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🚀
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Bottleneck Impact
              </h3>

              <p className="text-5xl font-black">
                94%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

const BarChartIcon = () => (
  <div className="w-11 h-11 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
    <TrendingDown size={23} className="text-red-600" />
  </div>
);

export default AIInterviewPreparationBottleneckDetector;