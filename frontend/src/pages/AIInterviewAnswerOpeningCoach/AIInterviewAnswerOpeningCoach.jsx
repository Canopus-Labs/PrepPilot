import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  MessageSquare,
  BarChart3,
  Zap,
} from "lucide-react";

const AIInterviewAnswerOpeningCoach = () => {
  const [answer, setAnswer] = useState(
    "Well, I think there are many ways to solve this problem. So first, before explaining the solution, I would like to talk about some background..."
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

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <MessageSquare size={34} className="text-violet-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Answer Opening Coach
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Improve the first few seconds of your interview answers with
                AI-powered opening analysis and suggestions.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing || !answer.trim()}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition disabled:opacity-60"
          >
            {analyzing ? (
              <>
                <RefreshCw size={19} className="animate-spin" />
                Analyzing Opening...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Analyze Opening
              </>
            )}
          </button>

        </div>

        {/* Hero */}

        <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Make Your First Words Count
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI evaluates how you begin your interview response, identifies
            hesitation and unnecessary context, and suggests a clearer,
            stronger opening that gets directly to the point.
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

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={8}
            placeholder="Paste your interview answer here..."
            className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 p-5 outline-none focus:ring-2 focus:ring-violet-500 resize-none leading-7"
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-5">

            <p className="text-sm text-gray-500">
              AI focuses specifically on the opening portion of your answer.
            </p>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={analyzing || !answer.trim()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition disabled:opacity-50"
            >
              <Sparkles size={18} />
              Improve Opening
            </button>

          </div>

        </div>

        {/* Score Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Target className="text-violet-600" size={30} />

            <p className="text-gray-500 mt-4">
              Opening Score
            </p>

            <p className="text-5xl font-black text-violet-600 mt-2">
              62%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Zap className="text-orange-600" size={30} />

            <p className="text-gray-500 mt-4">
              Directness
            </p>

            <p className="text-5xl font-black text-orange-600 mt-2">
              58%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <MessageSquare className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Clarity
            </p>

            <p className="text-5xl font-black text-blue-600 mt-2">
              71%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <CheckCircle2 className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Confidence
            </p>

            <p className="text-5xl font-black text-green-600 mt-2">
              67%
            </p>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["analysis", "Opening Analysis"],
            ["comparison", "Before vs After"],
            ["structures", "Opening Structures"],
            ["tips", "AI Coaching Tips"],
          ].map(([id, label]) => (

            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`px-5 py-3 rounded-xl font-semibold ${
                activeTab === id
                  ? "bg-violet-600 text-white"
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

                    <Brain className="text-violet-600" size={30} />

                    <h2 className="text-2xl font-bold">
                      AI Opening Analysis
                    </h2>

                  </div>

                  <p className="text-gray-500 mt-5 max-w-3xl leading-7">
                    Your opening takes too long to reach the main point. The
                    response starts with uncertainty and background context
                    instead of directly stating the approach.
                  </p>

                </div>

                <div className="text-center shrink-0">

                  <p className="text-7xl font-black text-orange-600">
                    62%
                  </p>

                  <p className="text-gray-500 mt-2">
                    Opening Quality
                  </p>

                </div>

              </div>

            </div>

            {/* Issues */}

            <div className="grid lg:grid-cols-3 gap-6">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="w-14 h-14 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">

                  <AlertTriangle
                    size={28}
                    className="text-red-600"
                  />

                </div>

                <h3 className="text-xl font-bold mt-6">
                  Unnecessary Introduction
                </h3>

                <p className="text-gray-500 mt-3 leading-7">
                  The answer spends time introducing background information
                  before addressing the actual question.
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="w-14 h-14 rounded-2xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center">

                  <Zap
                    size={28}
                    className="text-orange-600"
                  />

                </div>

                <h3 className="text-xl font-bold mt-6">
                  Hesitant Start
                </h3>

                <p className="text-gray-500 mt-3 leading-7">
                  Phrases such as "I think" and "there are many ways" make the
                  opening sound less confident.
                </p>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="w-14 h-14 rounded-2xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">

                  <Target
                    size={28}
                    className="text-blue-600"
                  />

                </div>

                <h3 className="text-xl font-bold mt-6">
                  Missing Main Point
                </h3>

                <p className="text-gray-500 mt-3 leading-7">
                  The response should state the recommended approach earlier
                  so the interviewer immediately understands your direction.
                </p>

              </div>

            </div>

            {/* Opening Breakdown */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Opening Quality Breakdown
                </h2>

              </div>

              <div className="space-y-6">

                {[
                  ["Directness", 58, "text-orange-600"],
                  ["Clarity", 71, "text-blue-600"],
                  ["Confidence", 67, "text-green-600"],
                  ["Structure", 64, "text-violet-600"],
                  ["Relevance", 74, "text-indigo-600"],
                ].map(([label, score, textColor]) => (

                  <div key={label}>

                    <div className="flex justify-between mb-2">

                      <span className="font-semibold">
                        {label}
                      </span>

                      <span className={`font-bold ${textColor}`}>
                        {score}%
                      </span>

                    </div>

                    <div className="h-3 rounded-full bg-gray-200 dark:bg-gray-700">

                      <div
                        className={`h-full rounded-full ${
                          score >= 70
                            ? "bg-blue-600"
                            : "bg-orange-500"
                        }`}
                        style={{ width: `${score}%` }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* Recommended Opening */}

            <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-8 sm:p-10 text-white">

              <div className="flex items-center gap-3 mb-6">

                <CheckCircle2 size={30} />

                <h2 className="text-3xl font-bold">
                  AI Recommended Opening
                </h2>

              </div>

              <p className="text-lg leading-8 text-white/95">
                "I would solve this problem using a hash map because it allows
                us to efficiently track the required values while iterating
                through the input once."
              </p>

              <div className="flex flex-wrap gap-3 mt-7">

                <span className="px-4 py-2 rounded-full bg-white/15 font-semibold">
                  Direct
                </span>

                <span className="px-4 py-2 rounded-full bg-white/15 font-semibold">
                  Confident
                </span>

                <span className="px-4 py-2 rounded-full bg-white/15 font-semibold">
                  Technical
                </span>

                <span className="px-4 py-2 rounded-full bg-white/15 font-semibold">
                  Relevant
                </span>

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
                    Original Opening
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 text-sm font-bold">
                    62%
                  </span>

                </div>

                <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 p-6">

                  <p className="text-gray-700 dark:text-gray-300 leading-8">
                    "Well, I think there are many ways to solve this problem.
                    So first, before explaining the solution, I would like to
                    talk about some background..."
                  </p>

                </div>

                <div className="mt-6 space-y-3">

                  {[
                    "Starts with hesitation",
                    "Delays the main point",
                    "Includes unnecessary context",
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
                    Improved Opening
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 text-sm font-bold">
                    94%
                  </span>

                </div>

                <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 p-6">

                  <p className="text-gray-700 dark:text-gray-300 leading-8">
                    "I would solve this problem using a hash map because it
                    provides efficient lookups while allowing us to process
                    the input in a single pass."
                  </p>

                </div>

                <div className="mt-6 space-y-3">

                  {[
                    "Gets directly to the approach",
                    "Provides a clear reason",
                    "Uses confident technical language",
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

                <TrendingUpIcon />

                <h2 className="text-2xl font-bold">
                  Improvement
                </h2>

              </div>

              <div className="flex flex-col sm:flex-row items-center gap-8 mt-7">

                <div className="text-center">

                  <p className="text-gray-500">
                    Original
                  </p>

                  <p className="text-5xl font-black text-orange-600 mt-2">
                    62%
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
                    +32% Opening Quality
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Structures */}

        {activeTab === "structures" && (
          <div className="mt-6">

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {[
                {
                  title: "Direct Answer",
                  description:
                    "Start with your answer or recommended approach immediately.",
                  example:
                    "I would use a hash map because we need constant-time lookups.",
                },
                {
                  title: "Problem → Approach",
                  description:
                    "Briefly acknowledge the problem and immediately introduce your approach.",
                  example:
                    "The main challenge is reducing repeated lookups. I would use a hash map to solve that.",
                },
                {
                  title: "Claim → Reason",
                  description:
                    "State your decision first, followed by the most important reason.",
                  example:
                    "I would choose PostgreSQL because the data requires strong relational consistency.",
                },
                {
                  title: "STAR Opening",
                  description:
                    "For behavioral questions, establish the situation and your role quickly.",
                  example:
                    "In my internship project, we faced a data-quality issue that affected our model results.",
                },
                {
                  title: "Architecture First",
                  description:
                    "For system design questions, begin with the high-level architecture.",
                  example:
                    "I would start with an API layer, load balancer, application servers, and a distributed cache.",
                },
                {
                  title: "Hypothesis First",
                  description:
                    "For debugging questions, state your initial hypothesis before investigating.",
                  example:
                    "My first hypothesis would be a database bottleneck because the latency increased with traffic.",
                },
              ].map((structure) => (

                <div
                  key={structure.title}
                  className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
                >

                  <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                    <Lightbulb
                      size={28}
                      className="text-violet-600"
                    />

                  </div>

                  <h3 className="text-xl font-bold mt-6">
                    {structure.title}
                  </h3>

                  <p className="text-gray-500 mt-3 leading-7">
                    {structure.description}
                  </p>

                  <div className="mt-5 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                    <p className="text-sm font-bold text-violet-600">
                      Example
                    </p>

                    <p className="text-gray-600 dark:text-gray-300 mt-2 leading-7">
                      "{structure.example}"
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

        {/* Tips */}

        {activeTab === "tips" && (
          <div className="mt-6 space-y-6">

            {[
              {
                title: "Lead With Your Answer",
                description:
                  "Avoid spending several sentences preparing the interviewer for your answer. State your conclusion or approach first.",
                priority: "High",
              },
              {
                title: "Remove Hesitation",
                description:
                  "Replace phrases such as 'I think', 'maybe', and 'there are many ways' with direct, confident language when you are confident in your approach.",
                priority: "High",
              },
              {
                title: "Use One Sentence of Context",
                description:
                  "Context can be useful, but keep it short. Give only the information necessary to frame your answer.",
                priority: "Medium",
              },
              {
                title: "State Your Reason",
                description:
                  "After your opening claim, provide the key reason that supports your approach.",
                priority: "Medium",
              },
            ].map((tip, index) => (

              <div
                key={tip.title}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7"
              >

                <div className="flex flex-col sm:flex-row gap-5">

                  <div className="w-12 h-12 rounded-xl bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center shrink-0">

                    <span className="font-black text-yellow-600">
                      {index + 1}
                    </span>

                  </div>

                  <div className="flex-1">

                    <div className="flex flex-wrap items-center gap-3">

                      <h3 className="text-xl font-bold">
                        {tip.title}
                      </h3>

                      <span className="px-3 py-1 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-300 text-xs font-bold">
                        {tip.priority}
                      </span>

                    </div>

                    <p className="text-gray-500 mt-3 leading-7">
                      {tip.description}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

        {/* How It Works */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Sparkles className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              How AI Opening Coaching Works
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              [
                "1",
                "Analyze",
                "AI examines the first sentences of your response.",
              ],
              [
                "2",
                "Detect",
                "Identifies hesitation, unnecessary context, and unclear openings.",
              ],
              [
                "3",
                "Improve",
                "Generates a stronger opening while preserving your original idea.",
              ],
              [
                "4",
                "Compare",
                "Shows the difference between your original and improved opening.",
              ],
            ].map(([number, title, description]) => (

              <div
                key={number}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="w-10 h-10 rounded-full bg-violet-600 text-white flex items-center justify-center font-black">
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

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

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
                "Clearer Starts",
                "Begin answers with a direct and understandable point.",
              ],
              [
                "💪",
                "More Confidence",
                "Replace hesitant openings with stronger language.",
              ],
              [
                "⚡",
                "Less Wasted Time",
                "Reduce unnecessary introductions and background.",
              ],
              [
                "✨",
                "Better First Impression",
                "Create a strong and professional opening in the first few seconds.",
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
                Start your answers with the main point instead of background
                context. Replace hesitant phrases with confident statements
                and immediately explain the reason behind your approach.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎤
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Opening Quality
              </h3>

              <p className="text-5xl font-black">
                62%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

const TrendingUpIcon = () => (
  <TrendingUp className="text-green-600" />
);

export default AIInterviewAnswerOpeningCoach;