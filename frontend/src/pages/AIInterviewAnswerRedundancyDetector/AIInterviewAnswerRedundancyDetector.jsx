import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Repeat2,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  MessageSquare,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  Scissors,
} from "lucide-react";

const AIInterviewAnswerRedundancyDetector = () => {
  const [answer, setAnswer] = useState(
    "I improved the application's performance by optimizing API calls. I made the API calls more efficient, which improved the overall application performance. I also reduced unnecessary requests so the application could respond faster. This performance optimization made the application faster and improved its response time."
  );

  const [activeTab, setActiveTab] = useState("analysis");
  const [analyzing, setAnalyzing] = useState(false);

  const redundantSentences = [
    {
      text: "I made the API calls more efficient, which improved the overall application performance.",
      reason: "Repeats the performance improvement already stated in the previous sentence.",
    },
    {
      text: "This performance optimization made the application faster and improved its response time.",
      reason: "Repeats the same performance improvement using different wording.",
    },
  ];

  const keyPoints = [
    "Optimized API calls",
    "Reduced unnecessary requests",
    "Improved application response time",
  ];

  const metrics = {
    redundancyScore: 31,
    originalWords: 69,
    suggestedWords: 39,
    reduction: 43,
  };

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

            <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0">
              <Repeat2 size={34} className="text-orange-600" />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Answer Redundancy Detector
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Detect repeated ideas and make interview answers shorter,
                clearer, and more professional.
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
                Detecting Redundancy...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Analyze Answer
              </>
            )}
          </button>

        </div>

        {/* AI Banner */}

        <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Sparkles size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              Say More With Less
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI identifies repeated ideas rather than simply counting words.
            It preserves important technical information while helping you
            remove sentences that repeat the same point.
          </p>

        </div>

        {/* Answer Input */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-6">

            <MessageSquare className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Interview Answer
            </h2>

          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={8}
            className="w-full rounded-2xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-gray-800 p-5 outline-none focus:ring-2 focus:ring-orange-500 resize-none leading-7"
            placeholder="Paste your interview answer here..."
          />

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-5">

            <p className="text-sm text-gray-500">
              AI checks repeated ideas, sentences, and technical details.
            </p>

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={analyzing || !answer.trim()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition disabled:opacity-50"
            >
              <Sparkles size={18} />
              Detect Redundancy
            </button>

          </div>

        </div>

        {/* Metrics */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Repeat2 className="text-orange-600" size={30} />

            <p className="text-gray-500 mt-4">
              Redundancy Score
            </p>

            <p className="text-5xl font-black text-orange-600 mt-2">
              {metrics.redundancyScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <MessageSquare className="text-blue-600" size={30} />

            <p className="text-gray-500 mt-4">
              Original Words
            </p>

            <p className="text-5xl font-black mt-2">
              {metrics.originalWords}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Scissors className="text-green-600" size={30} />

            <p className="text-gray-500 mt-4">
              Suggested Words
            </p>

            <p className="text-5xl font-black text-green-600 mt-2">
              {metrics.suggestedWords}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <BarChart3 className="text-violet-600" size={30} />

            <p className="text-gray-500 mt-4">
              Reduction
            </p>

            <p className="text-5xl font-black text-violet-600 mt-2">
              {metrics.reduction}%
            </p>

          </div>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => setActiveTab("analysis")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "analysis"
                ? "bg-orange-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Redundancy Analysis
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("comparison")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "comparison"
                ? "bg-orange-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Before & After
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
            AI Recommendations
          </button>

        </div>

        {/* Analysis */}

        {activeTab === "analysis" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

                <div>

                  <div className="flex items-center gap-3">

                    <Brain className="text-orange-600" size={30} />

                    <h2 className="text-3xl font-bold">
                      Redundancy Analysis
                    </h2>

                  </div>

                  <p className="text-gray-500 mt-5 max-w-3xl leading-7">
                    Your answer contains repeated ideas around application
                    performance and API optimization. The technical details
                    can be preserved while removing repeated explanations.
                  </p>

                </div>

                <div className="text-center shrink-0">

                  <p className="text-7xl font-black text-orange-600">
                    {metrics.redundancyScore}%
                  </p>

                  <p className="text-gray-500 mt-2">
                    Redundancy
                  </p>

                </div>

              </div>

              <div className="mt-8">

                <div className="flex justify-between mb-3">

                  <span className="text-sm text-gray-500">
                    Redundant content detected
                  </span>

                  <span className="font-bold">
                    Moderate
                  </span>

                </div>

                <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{
                      width: `${metrics.redundancyScore}%`,
                    }}
                  />

                </div>

              </div>

            </div>

            {/* Repeated Sentences */}

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <AlertTriangle className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Repeated Information Detected
                </h2>

              </div>

              <div className="space-y-5">

                {redundantSentences.map((item, index) => (

                  <div
                    key={index}
                    className="rounded-2xl border border-orange-200 dark:border-orange-900/30 bg-orange-50 dark:bg-orange-900/10 p-6"
                  >

                    <div className="flex items-start gap-4">

                      <span className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold shrink-0">
                        {index + 1}
                      </span>

                      <div>

                        <p className="font-semibold leading-7">
                          "{item.text}"
                        </p>

                        <p className="text-gray-500 mt-3 leading-6">
                          <strong>Why it is redundant:</strong>{" "}
                          {item.reason}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* Key Information */}

            <div className="grid lg:grid-cols-2 gap-8">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <CheckCircle2 className="text-green-600" />

                  <h2 className="text-2xl font-bold">
                    Important Details Preserved
                  </h2>

                </div>

                <div className="space-y-4">

                  {keyPoints.map((point, index) => (

                    <div
                      key={index}
                      className="flex items-center gap-4 rounded-2xl bg-green-50 dark:bg-green-900/10 p-5"
                    >

                      <CheckCircle2
                        size={21}
                        className="text-green-600 shrink-0"
                      />

                      <p className="font-semibold">
                        {point}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-7">

                  <Lightbulb className="text-yellow-500" />

                  <h2 className="text-2xl font-bold">
                    AI Summary
                  </h2>

                </div>

                <p className="text-gray-500 leading-8">
                  Your answer has a clear technical point, but the same
                  performance improvement is mentioned several times.
                  Combining those statements will make the response more
                  direct without removing the important implementation detail.
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Before and After */}

        {activeTab === "comparison" && (
          <div className="mt-6 space-y-8">

            <div className="grid lg:grid-cols-2 gap-8">

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-6">

                  <MessageSquare className="text-red-600" />

                  <h2 className="text-2xl font-bold">
                    Original Answer
                  </h2>

                </div>

                <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 p-6">

                  <p className="leading-8">
                    {answer}
                  </p>

                </div>

                <div className="mt-5 flex justify-between text-sm">

                  <span className="text-gray-500">
                    Word count
                  </span>

                  <strong>
                    {metrics.originalWords} words
                  </strong>

                </div>

              </div>

              <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

                <div className="flex items-center gap-3 mb-6">

                  <Scissors className="text-green-600" />

                  <h2 className="text-2xl font-bold">
                    AI Suggested Version
                  </h2>

                </div>

                <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 p-6">

                  <p className="leading-8">
                    I improved the application's performance by optimizing
                    API calls and reducing unnecessary requests. This reduced
                    processing overhead and improved response time, making the
                    application faster and more efficient.
                  </p>

                </div>

                <div className="mt-5 flex justify-between text-sm">

                  <span className="text-gray-500">
                    Word count
                  </span>

                  <strong className="text-green-600">
                    {metrics.suggestedWords} words
                  </strong>

                </div>

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Improvement Summary
                </h2>

              </div>

              <div className="grid md:grid-cols-3 gap-6">

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 text-center">

                  <p className="text-gray-500">
                    Words Removed
                  </p>

                  <p className="text-4xl font-black text-green-600 mt-3">
                    {metrics.originalWords - metrics.suggestedWords}
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 text-center">

                  <p className="text-gray-500">
                    Reduction
                  </p>

                  <p className="text-4xl font-black text-violet-600 mt-3">
                    {metrics.reduction}%
                  </p>

                </div>

                <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 text-center">

                  <p className="text-gray-500">
                    Technical Points
                  </p>

                  <p className="text-4xl font-black text-blue-600 mt-3">
                    Preserved
                  </p>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Recommendations */}

        {activeTab === "recommendations" && (
          <div className="mt-6 space-y-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-8">

                <Lightbulb className="text-yellow-500" />

                <h2 className="text-2xl font-bold">
                  AI Recommendations
                </h2>

              </div>

              <div className="grid lg:grid-cols-3 gap-6">

                {[
                  {
                    title: "Combine Repeated Points",
                    description:
                      "Merge sentences that describe the same performance improvement.",
                    icon: Repeat2,
                  },
                  {
                    title: "Lead With the Result",
                    description:
                      "State the main technical improvement once and then support it with evidence.",
                    icon: Target,
                  },
                  {
                    title: "Keep Technical Details",
                    description:
                      "Remove repetition without deleting implementation details or measurable results.",
                    icon: Brain,
                  },
                ].map((item) => {

                  const Icon = item.icon;

                  return (
                    <div
                      key={item.title}
                      className="rounded-3xl border border-gray-200 dark:border-white/10 p-7"
                    >

                      <div className="w-14 h-14 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                        <Icon
                          size={28}
                          className="text-violet-600"
                        />

                      </div>

                      <h3 className="text-xl font-bold mt-6">
                        {item.title}
                      </h3>

                      <p className="text-gray-500 mt-3 leading-7">
                        {item.description}
                      </p>

                      <button
                        type="button"
                        className="mt-6 inline-flex items-center gap-2 text-violet-600 font-semibold hover:gap-3 transition-all"
                      >
                        Apply Suggestion
                        <ArrowRight size={17} />
                      </button>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* Concise Answer Formula */}

            <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

              <div className="flex items-center gap-3 mb-7">

                <Brain size={30} />

                <h2 className="text-3xl font-bold">
                  Concise Answer Structure
                </h2>

              </div>

              <div className="grid md:grid-cols-4 gap-5">

                {[
                  [
                    "1",
                    "Point",
                    "State the main answer clearly.",
                  ],
                  [
                    "2",
                    "Action",
                    "Explain what you actually did.",
                  ],
                  [
                    "3",
                    "Evidence",
                    "Give one concrete technical result.",
                  ],
                  [
                    "4",
                    "Conclusion",
                    "Finish without repeating the same point.",
                  ],
                ].map(([number, title, description]) => (

                  <div
                    key={number}
                    className="rounded-2xl bg-white/10 p-6"
                  >

                    <div className="w-10 h-10 rounded-full bg-white text-violet-600 flex items-center justify-center font-black">
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

          </div>
        )}

        {/* Detection Metrics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-orange-600" />

            <h2 className="text-2xl font-bold">
              Redundancy Analysis Metrics
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              [
                "Repeated Ideas",
                "Identifies concepts expressed multiple times.",
              ],
              [
                "Sentence Similarity",
                "Detects sentences with overlapping meaning.",
              ],
              [
                "Technical Preservation",
                "Ensures important technical details remain.",
              ],
              [
                "Compression",
                "Measures how much unnecessary content can be removed.",
              ],
            ].map(([title, description]) => (

              <div
                key={title}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <h3 className="font-bold text-lg">
                  {title}
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  {description}
                </p>

              </div>
            ))}

          </div>

        </div>

        {/* How It Works */}

        <div className="mt-10 bg-gradient-to-r from-orange-600 via-amber-600 to-yellow-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-7">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              How AI Detects Redundancy
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-5">

            {[
              [
                "1",
                "Understand",
                "Analyze the meaning of each sentence.",
              ],
              [
                "2",
                "Compare",
                "Find sentences that communicate the same idea.",
              ],
              [
                "3",
                "Preserve",
                "Protect important technical details and evidence.",
              ],
              [
                "4",
                "Improve",
                "Generate a concise version without losing meaning.",
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

        {/* Benefits */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <CheckCircle2 className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Benefits
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              {
                icon: "🎯",
                title: "More Concise",
                description:
                  "Remove unnecessary repetition while keeping the core answer.",
              },
              {
                icon: "💬",
                title: "Clearer Communication",
                description:
                  "Make technical explanations easier for interviewers to follow.",
              },
              {
                icon: "⚡",
                title: "Better Efficiency",
                description:
                  "Deliver important information without wasting interview time.",
              },
              {
                icon: "💼",
                title: "Professional Answers",
                description:
                  "Build concise and confident interview responses.",
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
                Your answer contains useful technical information, but some
                performance points are repeated. Combine the repeated
                statements into one clear explanation and preserve the API
                optimization and response-time details.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                ✂️
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Suggested Reduction
              </h3>

              <p className="text-5xl font-black">
                43%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewAnswerRedundancyDetector;