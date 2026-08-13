import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  RefreshCw,
  MessageSquare,
  BookOpen,
  TrendingUp,
  Search,
  ArrowRight,
  BarChart3,
  Award,
} from "lucide-react";

const terminologyData = [
  {
    phrase: "make it faster",
    issue: "Vague terminology",
    suggestion: "Improve performance / reduce latency",
    explanation:
      "Use performance-specific terminology when discussing application speed.",
    category: "Performance",
  },
  {
    phrase: "store the data",
    issue: "Generic terminology",
    suggestion: "Persist the data",
    explanation:
      "Persist is more precise when referring to storing data beyond the current process.",
    category: "Databases",
  },
  {
    phrase: "the server handles it",
    issue: "Insufficiently specific",
    suggestion: "The application server processes the request",
    explanation:
      "Identify the component and action instead of using a generic reference.",
    category: "Backend",
  },
];

const AIInterviewAnswerTechnicalTerminologyCoach = () => {
  const [answer, setAnswer] = useState(
    "I would make the application faster by storing the data in a cache. The server handles the request and then sends the result back to the user."
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

            <div className="w-16 h-16 rounded-2xl bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center shrink-0">
              <BookOpen size={34} className="text-cyan-600" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                AI Interview Answer Technical Terminology Coach
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Improve technical vocabulary and communicate concepts with
                greater precision during interviews.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing || !answer.trim()}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition disabled:opacity-60"
          >
            {analyzing ? (
              <>
                <RefreshCw size={19} className="animate-spin" />
                Analyzing Terminology...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Analyze Terminology
              </>
            )}
          </button>

        </div>

        {/* Hero */}

        <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Say It Precisely
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI identifies vague, generic, or incorrect technical terminology
            and recommends more accurate vocabulary that matches the concept
            you are trying to explain.
          </p>

        </div>

        {/* Answer Input */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-6">

            <MessageSquare className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Your Interview Answer
            </h2>

          </div>

          <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5 mb-5">

            <p className="text-sm text-gray-500 font-semibold">
              Interview Question
            </p>

            <p className="mt-2 font-semibold leading-7">
              "How would you improve the performance of a web application?"
            </p>

          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={8}
            placeholder="Paste your technical interview answer here..."
            className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 p-5 outline-none focus:ring-2 focus:ring-cyan-500 resize-none leading-7"
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-5">

            <p className="text-sm text-gray-500">
              AI analyzes terminology, precision, and technical vocabulary.
            </p>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={analyzing || !answer.trim()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-600 text-white font-semibold hover:bg-cyan-700 transition disabled:opacity-50"
            >
              <Sparkles size={18} />
              Improve Terminology
            </button>

          </div>

        </div>

        {/* Score Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <Target className="text-cyan-600" size={30} />

            <p className="text-gray-500 mt-4">
              Terminology Score
            </p>

            <p className="text-5xl font-black text-cyan-600 mt-2">
              74%
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <MessageSquare className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Technical Precision
            </p>

            <p className="text-5xl font-black text-blue-600 mt-2">
              69%
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <AlertTriangle className="text-orange-600" size={30} />

            <p className="text-gray-500 mt-4">
              Terms to Improve
            </p>

            <p className="text-5xl font-black text-orange-600 mt-2">
              3
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">
            <TrendingUp className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Vocabulary Growth
            </p>

            <p className="text-5xl font-black text-green-600 mt-2">
              +18%
            </p>
          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["analysis", "Terminology Analysis"],
            ["comparison", "Before vs After"],
            ["dictionary", "Technical Vocabulary"],
            ["progress", "Vocabulary Progress"],
          ].map(([id, label]) => (

            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === id
                  ? "bg-cyan-600 text-white"
                  : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
              }`}
            >
              {label}
            </button>

          ))}

        </div>

        {/* Analysis */}

        {activeTab === "analysis" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

                <div>

                  <div className="flex items-center gap-3">

                    <Brain className="text-cyan-600" size={30} />

                    <h2 className="text-2xl font-bold">
                      AI Terminology Analysis
                    </h2>

                  </div>

                  <p className="text-gray-500 mt-5 max-w-3xl leading-7">
                    Your answer communicates the general idea correctly, but
                    several phrases are too generic. Replacing them with
                    precise technical terminology would make your explanation
                    stronger and more professional.
                  </p>

                </div>

                <div className="text-center shrink-0">

                  <p className="text-7xl font-black text-cyan-600">
                    74%
                  </p>

                  <p className="text-gray-500 mt-2">
                    Terminology Quality
                  </p>

                </div>

              </div>

            </div>

            {/* Detected Terms */}

            <div className="space-y-5">

              {terminologyData.map((item, index) => (

                <div
                  key={item.phrase}
                  className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                >

                  <div className="flex flex-col lg:flex-row gap-6">

                    <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0">

                      <span className="font-black text-orange-600">
                        {index + 1}
                      </span>

                    </div>

                    <div className="flex-1">

                      <div className="flex flex-wrap items-center gap-3">

                        <h3 className="text-xl font-bold">
                          "{item.phrase}"
                        </h3>

                        <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 text-xs font-bold">
                          {item.issue}
                        </span>

                      </div>

                      <div className="grid md:grid-cols-2 gap-5 mt-6">

                        <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 p-5">

                          <p className="text-sm font-bold text-red-600">
                            Current Term
                          </p>

                          <p className="mt-2 font-semibold">
                            {item.phrase}
                          </p>

                        </div>

                        <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 p-5">

                          <p className="text-sm font-bold text-green-600">
                            Recommended Term
                          </p>

                          <p className="mt-2 font-semibold">
                            {item.suggestion}
                          </p>

                        </div>

                      </div>

                      <p className="text-gray-500 mt-5 leading-7">
                        {item.explanation}
                      </p>

                      <span className="inline-block mt-4 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm">
                        {item.category}
                      </span>

                    </div>

                  </div>

                </div>

              ))}

            </div>

            {/* Score Breakdown */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-cyan-600" />

                <h2 className="text-2xl font-bold">
                  Terminology Quality Breakdown
                </h2>

              </div>

              <div className="space-y-6">

                {[
                  ["Technical Accuracy", 82],
                  ["Terminology Precision", 69],
                  ["Vocabulary Variety", 76],
                  ["Concept-Specific Language", 71],
                  ["Professional Usage", 78],
                ].map(([label, score]) => (

                  <div key={label}>

                    <div className="flex justify-between mb-2">

                      <span className="font-semibold">
                        {label}
                      </span>

                      <span className="font-bold text-cyan-600">
                        {score}%
                      </span>

                    </div>

                    <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700">

                      <div
                        className="h-full rounded-full bg-cyan-600"
                        style={{ width: `${score}%` }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* Recommended Answer */}

            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white">

              <div className="flex items-center gap-3 mb-6">

                <CheckCircle2 size={30} />

                <h2 className="text-3xl font-bold">
                  AI Improved Version
                </h2>

              </div>

              <p className="text-lg leading-8 text-white/95">
                "I would improve application performance by introducing a
                caching layer to reduce repeated database queries and lower
                request latency. The application server would process incoming
                requests, retrieve frequently accessed data from the cache,
                and fall back to the database on a cache miss."
              </p>

              <div className="flex flex-wrap gap-3 mt-7">

                {[
                  "Precise",
                  "Technical",
                  "Professional",
                  "Clear",
                ].map((item) => (

                  <span
                    key={item}
                    className="px-4 py-2 rounded-full bg-white/15 font-semibold"
                  >
                    {item}
                  </span>

                ))}

              </div>

            </div>

          </div>
        )}

        {/* Comparison */}

        {activeTab === "comparison" && (
          <div className="mt-6 space-y-8">

            <div className="grid lg:grid-cols-2 gap-8">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center justify-between mb-7">

                  <h2 className="text-2xl font-bold">
                    Original
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 text-sm font-bold">
                    74%
                  </span>

                </div>

                <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 p-6">

                  <p className="leading-8 text-gray-700 dark:text-gray-300">
                    "I would make the application faster by storing the data
                    in a cache. The server handles the request and then sends
                    the result back to the user."
                  </p>

                </div>

                <div className="mt-6 space-y-3">

                  {[
                    "Uses generic terminology",
                    "Does not specify the performance metric",
                    "Uses vague component references",
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-3 text-red-600"
                    >
                      <AlertTriangle size={18} />
                      <span>{item}</span>
                    </div>

                  ))}

                </div>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center justify-between mb-7">

                  <h2 className="text-2xl font-bold">
                    Improved
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-sm font-bold">
                    94%
                  </span>

                </div>

                <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 p-6">

                  <p className="leading-8 text-gray-700 dark:text-gray-300">
                    "I would improve application performance by introducing a
                    caching layer to reduce repeated database queries and lower
                    request latency."
                  </p>

                </div>

                <div className="mt-6 space-y-3">

                  {[
                    "Uses precise technical terms",
                    "Explains the performance improvement",
                    "Clearly identifies the architecture component",
                  ].map((item) => (

                    <div
                      key={item}
                      className="flex items-center gap-3 text-green-600"
                    >
                      <CheckCircle2 size={18} />
                      <span>{item}</span>
                    </div>

                  ))}

                </div>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3">

                <TrendingUp className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Terminology Improvement
                </h2>

              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8 mt-7">

                <div className="text-center">

                  <p className="text-gray-500">
                    Original
                  </p>

                  <p className="text-5xl font-black text-orange-600 mt-2">
                    74%
                  </p>

                </div>

                <ArrowRight
                  size={35}
                  className="text-gray-400"
                />

                <div className="text-center">

                  <p className="text-gray-500">
                    Improved
                  </p>

                  <p className="text-5xl font-black text-green-600 mt-2">
                    94%
                  </p>

                </div>

                <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 px-6 py-4">

                  <p className="text-green-700 dark:text-green-400 font-bold">
                    +20% Technical Precision
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Dictionary */}

        {activeTab === "dictionary" && (
          <div className="mt-6 space-y-6">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

              <div className="relative">

                <Search
                  size={20}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="Search technical vocabulary..."
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 outline-none focus:ring-2 focus:ring-cyan-500"
                />

              </div>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {[
                {
                  term: "Latency",
                  meaning:
                    "The time taken for a request or operation to produce a response.",
                  example:
                    "We reduced API latency from 500ms to 180ms.",
                },
                {
                  term: "Throughput",
                  meaning:
                    "The amount of work or data processed by a system within a given time.",
                  example:
                    "The service can process 10,000 requests per second.",
                },
                {
                  term: "Persistence",
                  meaning:
                    "The ability to retain data beyond the lifetime of the current process.",
                  example:
                    "We use PostgreSQL for persistent storage.",
                },
                {
                  term: "Cache Invalidation",
                  meaning:
                    "The process of removing or updating stale data stored in a cache.",
                  example:
                    "Cache invalidation occurs when the underlying record changes.",
                },
                {
                  term: "Load Balancing",
                  meaning:
                    "Distributing traffic across multiple servers or resources.",
                  example:
                    "A load balancer distributes requests across application instances.",
                },
                {
                  term: "Horizontal Scaling",
                  meaning:
                    "Increasing capacity by adding more instances or machines.",
                  example:
                    "The service supports horizontal scaling during traffic spikes.",
                },
              ].map((item) => (

                <div
                  key={item.term}
                  className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                >

                  <div className="w-12 h-12 rounded-xl bg-cyan-100 dark:bg-cyan-900/20 flex items-center justify-center">

                    <BookOpen
                      size={24}
                      className="text-cyan-600"
                    />

                  </div>

                  <h3 className="text-xl font-bold mt-5">
                    {item.term}
                  </h3>

                  <p className="text-gray-500 mt-3 leading-7">
                    {item.meaning}
                  </p>

                  <div className="mt-5 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                    <p className="text-sm font-bold text-cyan-600">
                      Usage Example
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 mt-2 leading-7">
                      "{item.example}"
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

        {/* Progress */}

        {activeTab === "progress" && (
          <div className="mt-6 space-y-8">

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <TrendingUp className="text-green-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Overall Growth
                </p>

                <p className="text-5xl font-black text-green-600 mt-2">
                  +18%
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <Award className="text-yellow-500" size={30} />

                <p className="text-gray-500 mt-4">
                  Terms Mastered
                </p>

                <p className="text-5xl font-black text-yellow-500 mt-2">
                  42
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <Target className="text-cyan-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Current Score
                </p>

                <p className="text-5xl font-black text-cyan-600 mt-2">
                  74%
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

                <CheckCircle2 className="text-blue-600" size={30} />

                <p className="text-gray-500 mt-4">
                  Sessions Analyzed
                </p>

                <p className="text-5xl font-black text-blue-600 mt-2">
                  16
                </p>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-cyan-600" />

                <h2 className="text-2xl font-bold">
                  Terminology Score History
                </h2>

              </div>

              <div className="space-y-6">

                {[
                  ["Session 1", 51],
                  ["Session 4", 58],
                  ["Session 8", 64],
                  ["Session 12", 69],
                  ["Session 16", 74],
                ].map(([session, score]) => (

                  <div key={session}>

                    <div className="flex justify-between mb-2">

                      <span className="font-semibold">
                        {session}
                      </span>

                      <span className="font-bold text-cyan-600">
                        {score}%
                      </span>

                    </div>

                    <div className="h-4 rounded-full bg-gray-200 dark:bg-gray-700">

                      <div
                        className="h-full rounded-full bg-cyan-600"
                        style={{
                          width: `${score}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

            <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-3xl p-8 text-white">

              <div className="flex items-center gap-3 mb-5">

                <Brain size={30} />

                <h2 className="text-2xl font-bold">
                  AI Progress Insight
                </h2>

              </div>

              <p className="leading-8 text-white/90">
                Your technical terminology score has improved consistently
                across recent sessions. You are using more precise performance,
                backend, and database terminology than when you started.
                Continue practicing role-specific technical explanations to
                strengthen vocabulary further.
              </p>

            </div>

          </div>
        )}

        {/* How It Works */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Sparkles className="text-cyan-600" />

            <h2 className="text-2xl font-bold">
              How AI Terminology Coaching Works
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              [
                "1",
                "Analyze",
                "AI analyzes the technical language used in your response.",
              ],
              [
                "2",
                "Detect",
                "Identifies vague, generic, or potentially incorrect terminology.",
              ],
              [
                "3",
                "Explain",
                "Provides the appropriate technical term and explains its meaning.",
              ],
              [
                "4",
                "Track",
                "Monitors terminology improvement across future interview sessions.",
              ],
            ].map(([number, title, description]) => (

              <div
                key={number}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-full bg-cyan-600 text-white flex items-center justify-center font-black">
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

        <div className="mt-10 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 rounded-3xl p-8 sm:p-10 text-white">

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
                "Precise Communication",
                "Express technical concepts with accurate terminology.",
              ],
              [
                "💼",
                "Professional Vocabulary",
                "Build vocabulary that matches real technical interviews.",
              ],
              [
                "🧠",
                "Better Understanding",
                "Learn unfamiliar technical terms through contextual examples.",
              ],
              [
                "📈",
                "Continuous Improvement",
                "Track terminology usage and improvement across sessions.",
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
                Replace broad phrases such as "make it faster" or "store the
                data" with precise terms such as "reduce latency" and "persist
                the data." Specific technical vocabulary will make your answer
                clearer, more credible, and easier for an interviewer to
                evaluate.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                📚
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Terminology Score
              </h3>

              <p className="text-5xl font-black">
                74%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewAnswerTechnicalTerminologyCoach;