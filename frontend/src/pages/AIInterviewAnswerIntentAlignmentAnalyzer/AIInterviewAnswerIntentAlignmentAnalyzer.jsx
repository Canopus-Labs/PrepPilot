import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  RefreshCw,
  ArrowRight,
  BarChart3,
  Lightbulb,
  Search,
  Crosshair,
  ListChecks,
  TrendingUp,
} from "lucide-react";

const intentAnalysis = [
  {
    section: "Primary Intent",
    status: "Aligned",
    score: 92,
    description:
      "The question is primarily asking you to explain how you would improve application performance.",
  },
  {
    section: "Technical Approach",
    status: "Aligned",
    score: 88,
    description:
      "Your response discusses caching and reducing repeated database operations.",
  },
  {
    section: "Performance Reasoning",
    status: "Partial",
    score: 67,
    description:
      "You mention making the application faster but do not clearly explain latency, throughput, or measurable performance impact.",
  },
  {
    section: "Implementation Detail",
    status: "Partial",
    score: 61,
    description:
      "The answer identifies caching but does not explain where the cache is placed or how cache misses are handled.",
  },
];

const AIInterviewAnswerIntentAlignmentAnalyzer = () => {
  const [answer, setAnswer] = useState(
    "I would make the application faster by using a cache. The server can store frequently used data and return it quickly instead of accessing the database every time."
  );

  const [analyzing, setAnalyzing] = useState(false);
  const [activeTab, setActiveTab] = useState("analysis");

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("analysis");
    }, 700);
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">
              <Crosshair size={34} className="text-indigo-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Answer Intent Alignment Analyzer
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Check whether your answer directly addresses what the
                interviewer is actually asking.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing || !answer.trim()}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {analyzing ? (
              <>
                <RefreshCw size={19} className="animate-spin" />
                Analyzing Intent...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Analyze Intent
              </>
            )}
          </button>

        </div>

        {/* Hero */}

        <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Answer the Question Behind the Question
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI identifies the primary intent of an interview question,
            compares it with your response, detects partially addressed
            requirements, and recommends how to refocus your answer.
          </p>

        </div>

        {/* Question + Answer */}

        <div className="mt-10 grid lg:grid-cols-2 gap-7">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-6">

              <Search className="text-indigo-600" />

              <h2 className="text-2xl font-bold">
                Interview Question
              </h2>

            </div>

            <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 p-6">

              <p className="text-lg font-semibold leading-8">
                "How would you improve the performance of a web application?"
              </p>

            </div>

            <div className="mt-7">

              <p className="text-sm font-bold text-gray-500 uppercase tracking-wide">
                Primary Intent
              </p>

              <p className="mt-3 text-gray-700 dark:text-gray-300 leading-7">
                Evaluate your ability to identify performance bottlenecks and
                propose practical technical optimizations.
              </p>

            </div>

            <div className="flex flex-wrap gap-3 mt-6">

              {[
                "Performance",
                "Problem Solving",
                "Technical Reasoning",
              ].map((item) => (

                <span
                  key={item}
                  className="px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm font-medium"
                >
                  {item}
                </span>

              ))}

            </div>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-6">

              <MessageSquare className="text-blue-600" />

              <h2 className="text-2xl font-bold">
                Your Response
              </h2>

            </div>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={8}
              placeholder="Enter your interview response..."
              className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 p-5 outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-7"
            />

            <div className="flex items-center justify-between gap-4 mt-5">

              <p className="text-sm text-gray-500">
                AI compares your response with the question's intended goal.
              </p>

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={analyzing || !answer.trim()}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
              >
                <Sparkles size={18} />
                Check Alignment
              </button>

            </div>

          </div>

        </div>

        {/* Score Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Target className="text-indigo-600" size={30} />

            <p className="text-gray-500 mt-4">
              Intent Alignment
            </p>

            <p className="text-5xl font-black text-indigo-600 mt-2">
              81%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <CheckCircle2 className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Requirements Addressed
            </p>

            <p className="text-5xl font-black text-green-600 mt-2">
              3/4
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <AlertTriangle className="text-orange-600" size={30} />

            <p className="text-gray-500 mt-4">
              Partial Areas
            </p>

            <p className="text-5xl font-black text-orange-600 mt-2">
              2
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <TrendingUp className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Focus Potential
            </p>

            <p className="text-5xl font-black text-blue-600 mt-2">
              High
            </p>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["analysis", "Intent Analysis"],
            ["focus", "Refocus Answer"],
            ["comparison", "Question vs Answer"],
            ["history", "Alignment Progress"],
          ].map(([id, label]) => (

            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === id
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Intent Analysis */}

        {activeTab === "analysis" && (
          <div className="mt-6 space-y-7">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

                <div>

                  <div className="flex items-center gap-3">

                    <Brain className="text-indigo-600" size={30} />

                    <h2 className="text-2xl font-bold">
                      AI Intent Analysis
                    </h2>

                  </div>

                  <p className="text-gray-500 mt-5 max-w-3xl leading-7">
                    Your response is mostly aligned with the question. You
                    correctly identified caching as a possible optimization,
                    but the answer could better address how performance
                    bottlenecks are identified and measured.
                  </p>

                </div>

                <div className="text-center shrink-0">

                  <p className="text-7xl font-black text-indigo-600">
                    81%
                  </p>

                  <p className="text-gray-500 mt-2">
                    Intent Alignment
                  </p>

                </div>

              </div>

            </div>

            {/* Intent Breakdown */}

            <div className="space-y-5">

              {intentAnalysis.map((item) => (

                <div
                  key={item.section}
                  className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                >

                  <div className="flex flex-col lg:flex-row gap-6">

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="text-xl font-bold">
                          {item.section}
                        </h3>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            item.status === "Aligned"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                              : "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400"
                          }`}
                        >
                          {item.status}
                        </span>

                      </div>

                      <p className="text-gray-500 mt-4 leading-7">
                        {item.description}
                      </p>

                    </div>

                    <div className="lg:w-40 shrink-0">

                      <div className="flex items-center justify-between mb-2">

                        <span className="text-sm text-gray-500">
                          Alignment
                        </span>

                        <span className="font-bold text-indigo-600">
                          {item.score}%
                        </span>

                      </div>

                      <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700">

                        <div
                          className={`h-full rounded-full ${
                            item.score >= 80
                              ? "bg-green-500"
                              : "bg-orange-500"
                          }`}
                          style={{
                            width: `${item.score}%`,
                          }}
                        />

                      </div>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* Intent Components */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <ListChecks className="text-indigo-600" />

                <h2 className="text-2xl font-bold">
                  Question Intent Components
                </h2>

              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

                {[
                  ["Primary Goal", "Improve performance", 95],
                  ["Expected Reasoning", "Identify bottlenecks", 72],
                  ["Technical Depth", "Optimization techniques", 81],
                  ["Practical Evidence", "Explain measurable impact", 61],
                ].map(([title, value, score]) => (

                  <div
                    key={title}
                    className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6"
                  >

                    <p className="text-sm text-gray-500">
                      {title}
                    </p>

                    <h3 className="font-bold mt-2">
                      {value}
                    </h3>

                    <p className="text-3xl font-black text-indigo-600 mt-5">
                      {score}%
                    </p>

                    <div className="h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-3">

                      <div
                        className="h-full rounded-full bg-indigo-600"
                        style={{
                          width: `${score}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* Refocus */}

        {activeTab === "focus" && (
          <div className="mt-6 space-y-7">

            <div className="bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 rounded-3xl p-7">

              <div className="flex items-start gap-4">

                <Lightbulb
                  size={30}
                  className="text-orange-600 shrink-0"
                />

                <div>

                  <h2 className="text-2xl font-bold text-orange-700 dark:text-orange-400">
                    AI Refocus Recommendation
                  </h2>

                  <p className="text-orange-700/80 dark:text-orange-300/80 mt-3 leading-7">
                    Your answer should spend less time describing that caching
                    makes data faster and more time explaining how you would
                    identify the bottleneck, select the optimization, and
                    measure the improvement.
                  </p>

                </div>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Target className="text-indigo-600" />

                <h2 className="text-2xl font-bold">
                  What Your Answer Should Cover
                </h2>

              </div>

              <div className="space-y-4">

                {[
                  [
                    "Identify the bottleneck",
                    "Explain how you would use profiling, monitoring, or logs to locate the performance issue.",
                  ],
                  [
                    "Select an optimization",
                    "Explain why caching, indexing, query optimization, or another technique is appropriate.",
                  ],
                  [
                    "Explain implementation",
                    "Describe where the optimization fits into the architecture.",
                  ],
                  [
                    "Measure the result",
                    "Mention metrics such as latency, throughput, error rate, or resource utilization.",
                  ],
                ].map(([title, description], index) => (

                  <div
                    key={title}
                    className="flex gap-4 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5"
                  >

                    <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                      {index + 1}
                    </div>

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

            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 text-white">

              <div className="flex items-center gap-3 mb-5">

                <CheckCircle2 size={30} />

                <h2 className="text-2xl font-bold">
                  Suggested Focused Answer
                </h2>

              </div>

              <p className="text-lg leading-8 text-white/95">
                "First, I would identify the bottleneck using application
                metrics and profiling. If repeated database queries are causing
                high latency, I would introduce a caching layer for frequently
                accessed data. I would then measure the impact using metrics
                such as response latency and database load to verify the
                optimization."
              </p>

            </div>

          </div>
        )}

        {/* Comparison */}

        {activeTab === "comparison" && (
          <div className="mt-6 space-y-7">

            <div className="grid lg:grid-cols-2 gap-7">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-6">

                  <Search className="text-indigo-600" />

                  <h2 className="text-2xl font-bold">
                    Question Intent
                  </h2>

                </div>

                <div className="rounded-2xl bg-indigo-50 dark:bg-indigo-900/10 p-6">

                  <p className="font-semibold leading-8">
                    Identify a performance problem, propose a suitable
                    optimization, explain the reasoning, and demonstrate how
                    the improvement would be validated.
                  </p>

                </div>

                <div className="mt-6 space-y-3">

                  {[
                    "Problem identification",
                    "Technical solution",
                    "Reasoning",
                    "Validation",
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-3"
                    >

                      <CheckCircle2
                        size={18}
                        className="text-indigo-600"
                      />

                      <span>{item}</span>

                    </div>

                  ))}

                </div>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-6">

                  <MessageSquare className="text-blue-600" />

                  <h2 className="text-2xl font-bold">
                    Your Answer Coverage
                  </h2>

                </div>

                <div className="space-y-5">

                  {[
                    ["Caching solution", 94, true],
                    ["Performance reasoning", 72, true],
                    ["Implementation detail", 61, false],
                    ["Performance validation", 48, false],
                  ].map(([label, score, aligned]) => (

                    <div key={label}>

                      <div className="flex items-center justify-between mb-2">

                        <span className="font-semibold">
                          {label}
                        </span>

                        <span
                          className={
                            aligned
                              ? "text-green-600 font-bold"
                              : "text-orange-600 font-bold"
                          }
                        >
                          {score}%
                        </span>

                      </div>

                      <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700">

                        <div
                          className={`h-full rounded-full ${
                            aligned
                              ? "bg-green-500"
                              : "bg-orange-500"
                          }`}
                          style={{
                            width: `${score}%`,
                          }}
                        />

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <ArrowRight className="text-indigo-600" />

                <h2 className="text-2xl font-bold">
                  Alignment Gap
                </h2>

              </div>

              <div className="grid md:grid-cols-3 gap-5">

                {[
                  [
                    "Covered Well",
                    "Caching as a performance optimization",
                    "green",
                  ],
                  [
                    "Needs More Detail",
                    "How the bottleneck is identified",
                    "orange",
                  ],
                  [
                    "Missing",
                    "How improvement is measured",
                    "red",
                  ],
                ].map(([title, description, color]) => (

                  <div
                    key={title}
                    className={`rounded-2xl p-6 ${
                      color === "green"
                        ? "bg-green-50 dark:bg-green-900/10"
                        : color === "orange"
                        ? "bg-orange-50 dark:bg-orange-900/10"
                        : "bg-red-50 dark:bg-red-900/10"
                    }`}
                  >

                    <h3
                      className={`font-bold ${
                        color === "green"
                          ? "text-green-700 dark:text-green-400"
                          : color === "orange"
                          ? "text-orange-700 dark:text-orange-400"
                          : "text-red-700 dark:text-red-400"
                      }`}
                    >
                      {title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-300 mt-3 leading-6">
                      {description}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* Progress */}

        {activeTab === "history" && (
          <div className="mt-6 space-y-7">

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <TrendingUp className="text-green-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Current Alignment
                </p>

                <p className="text-5xl font-black text-green-600 mt-2">
                  81%
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <Target className="text-indigo-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Previous Score
                </p>

                <p className="text-5xl font-black text-indigo-600 mt-2">
                  69%
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <BarChart3 className="text-blue-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Improvement
                </p>

                <p className="text-5xl font-black text-blue-600 mt-2">
                  +12%
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <CheckCircle2 className="text-violet-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Answers Analyzed
                </p>

                <p className="text-5xl font-black text-violet-600 mt-2">
                  18
                </p>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-indigo-600" />

                <h2 className="text-2xl font-bold">
                  Intent Alignment History
                </h2>

              </div>

              <div className="space-y-6">

                {[
                  ["Session 1", 57],
                  ["Session 5", 63],
                  ["Session 9", 69],
                  ["Session 13", 76],
                  ["Session 18", 81],
                ].map(([session, score]) => (

                  <div key={session}>

                    <div className="flex justify-between mb-2">

                      <span className="font-semibold">
                        {session}
                      </span>

                      <span className="font-bold text-indigo-600">
                        {score}%
                      </span>

                    </div>

                    <div className="h-4 rounded-full bg-gray-200 dark:bg-gray-700">

                      <div
                        className="h-full rounded-full bg-indigo-600"
                        style={{
                          width: `${score}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 rounded-3xl p-8 text-white">

              <div className="flex items-center gap-3 mb-5">

                <Brain size={30} />

                <h2 className="text-2xl font-bold">
                  AI Progress Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90">
                Your intent alignment has improved consistently. Your strongest
                improvement is in directly identifying the main purpose of
                technical questions. Continue practicing answers that include
                explicit reasoning and measurable outcomes.
              </p>

            </div>

          </div>
        )}

        {/* How It Works */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              How AI Intent Alignment Works
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              [
                "1",
                "Understand",
                "Identify the primary intent and requirements of the interview question.",
              ],
              [
                "2",
                "Compare",
                "Compare each part of your response against the expected intent.",
              ],
              [
                "3",
                "Detect",
                "Find missing, partial, or irrelevant sections in your response.",
              ],
              [
                "4",
                "Refocus",
                "Generate actionable suggestions for producing a more targeted answer.",
              ],
            ].map(([number, title, description]) => (

              <div
                key={number}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-black">
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

        <div className="mt-10 bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white">

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
                "Stay Focused",
                "Keeps responses centered on the actual question being asked.",
              ],
              [
                "🧠",
                "Better Reasoning",
                "Encourages candidates to address the reasoning behind their solution.",
              ],
              [
                "💬",
                "Clear Responses",
                "Helps eliminate unrelated information and unnecessary explanations.",
              ],
              [
                "📈",
                "Actionable Feedback",
                "Shows exactly which parts of an answer need improvement.",
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
                Your answer is directionally correct, but refocus it around
                identifying the performance bottleneck and measuring the
                resulting improvement. Explain not only what optimization you
                would use, but why you selected it and how you would validate
                its effectiveness.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Intent Alignment
              </h3>

              <p className="text-5xl font-black">
                81%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewAnswerIntentAlignmentAnalyzer;