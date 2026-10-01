import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  Languages,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  FileText,
  Target,
  Wand2,
  MessageSquareText,
  BarChart3,
  RefreshCw,
} from "lucide-react";

const AIInterviewResponseLanguageSimplifier = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [activeTab, setActiveTab] = useState("simplified");
  const [simplifying, setSimplifying] = useState(false);

  const answers = [
    {
      question: "Explain how a binary search algorithm works.",
      type: "Technical",
      original:
        "The fundamental operational mechanism underlying binary search involves the systematic subdivision of a monotonically ordered dataset into progressively smaller partitions, thereby facilitating the efficient identification of a target element through comparative evaluation against the midpoint value.",
      simplified:
        "Binary search works by repeatedly dividing a sorted dataset in half. It compares the target value with the middle element. If the target is smaller, it searches the left half; if it is larger, it searches the right half. This continues until the target is found or no elements remain.",
      technicalTerms: [
        "Binary search",
        "Sorted dataset",
        "Midpoint",
        "O(log n)",
      ],
      changes: [
        "Replaced overly formal wording with direct language.",
        "Split one long sentence into multiple shorter sentences.",
        "Preserved important technical concepts.",
        "Made the algorithm steps easier to follow.",
      ],
      scoreBefore: 62,
      scoreAfter: 91,
    },
    {
      question: "What is object-oriented programming?",
      type: "Technical",
      original:
        "Object-oriented programming constitutes a paradigmatic methodology wherein computational entities are conceptually represented as encapsulated objects possessing both state-based characteristics and behavioral capabilities, thereby facilitating modular software architectural composition.",
      simplified:
        "Object-oriented programming is a way of designing software using objects. Objects contain data and the methods that operate on that data. This approach makes software easier to organize, reuse, and maintain.",
      technicalTerms: [
        "Object-oriented programming",
        "Objects",
        "Data",
        "Methods",
        "Encapsulation",
      ],
      changes: [
        "Removed unnecessary formal expressions.",
        "Replaced abstract phrases with familiar words.",
        "Kept the core programming concepts.",
        "Improved readability for a spoken interview response.",
      ],
      scoreBefore: 58,
      scoreAfter: 94,
    },
    {
      question: "How would you optimize a slow database query?",
      type: "Technical",
      original:
        "The optimization procedure would necessitate an exhaustive examination of the query execution characteristics in conjunction with the underlying relational schema in order to ascertain potential computational inefficiencies attributable to inadequate indexing mechanisms or suboptimal query construction methodologies.",
      simplified:
        "I would first analyze the query execution plan to find the bottleneck. Then I would check whether the required columns are properly indexed and whether the query can be rewritten more efficiently. I would also review joins and unnecessary data retrieval.",
      technicalTerms: [
        "Query execution plan",
        "Indexing",
        "Joins",
        "Query optimization",
      ],
      changes: [
        "Replaced complex noun phrases with direct verbs.",
        "Separated the optimization steps clearly.",
        "Preserved database-specific terminology.",
        "Made the answer easier to deliver verbally.",
      ],
      scoreBefore: 65,
      scoreAfter: 93,
    },
  ];

  const selected = answers[selectedAnswer];

  const handleSimplify = () => {
    setSimplifying(true);

    setTimeout(() => {
      setSimplifying(false);
      setActiveTab("simplified");
    }, 700);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
            <Languages
              size={34}
              className="text-blue-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Response Language Simplifier
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Make complicated interview answers clearer and easier to
              understand while preserving technical accuracy.
            </p>
          </div>

        </div>

        {/* Overview Metrics */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Languages
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Answers Analyzed
            </p>

            <p className="text-5xl font-black mt-3">
              24
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Clarity Score
            </p>

            <p className="text-5xl font-black mt-3">
              91%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Sparkles
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Phrases Simplified
            </p>

            <p className="text-5xl font-black mt-3">
              67
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Average Improvement
            </p>

            <p className="text-5xl font-black mt-3">
              +27%
            </p>

          </div>

        </div>

        {/* AI Introduction */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Clarity Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI identifies unnecessarily complicated wording, simplifies
            confusing phrases, and preserves technical terminology that
            is important for demonstrating your knowledge during an
            interview.
          </p>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquareText className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Response
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {answers.map((answer, index) => (

              <button
                key={index}
                type="button"
                onClick={() => setSelectedAnswer(index)}
                className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                  selectedAnswer === index
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm">
                  {answer.type}
                </span>

                <h3 className="font-bold text-lg mt-5 leading-7">
                  {answer.question}
                </h3>

              </button>

            ))}

          </div>

        </div>

        {/* Selected Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <p className="text-sm text-gray-500">
            Interview Question
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold mt-3">
            {selected.question}
          </h2>

          <span className="inline-block mt-5 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
            {selected.type}
          </span>

        </div>

        {/* Action */}

        <div className="mt-8 flex justify-center">

          <button
            type="button"
            onClick={handleSimplify}
            disabled={simplifying}
            className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 transition disabled:opacity-60"
          >

            {simplifying ? (
              <>
                <RefreshCw
                  size={22}
                  className="animate-spin"
                />
                Simplifying Response...
              </>
            ) : (
              <>
                <Wand2 size={22} />
                Simplify My Answer
              </>
            )}

          </button>

        </div>

        {/* Original / Simplified Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => setActiveTab("original")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "original"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Original Response
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("simplified")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "simplified"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Simplified Response
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("changes")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "changes"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            What Changed
          </button>

        </div>

        {/* Original Response */}

        {activeTab === "original" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-6">

              <FileText className="text-orange-500" />

              <h2 className="text-2xl font-bold">
                Original Response
              </h2>

            </div>

            <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-7">

              <p className="text-lg leading-8">
                {selected.original}
              </p>

            </div>

            <div className="mt-6 flex items-center justify-between">

              <span className="text-gray-500">
                Original clarity score
              </span>

              <span
                className={`text-3xl font-black ${getScoreColor(
                  selected.scoreBefore
                )}`}
              >
                {selected.scoreBefore}%
              </span>

            </div>

          </div>
        )}

        {/* Simplified Response */}

        {activeTab === "simplified" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center justify-between gap-5 mb-6">

              <div className="flex items-center gap-3">

                <Wand2 className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  AI Simplified Response
                </h2>

              </div>

              <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 font-semibold">
                Improved
              </span>

            </div>

            <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-900/30 p-7">

              <p className="text-lg leading-8">
                {selected.simplified}
              </p>

            </div>

            <div className="mt-6 flex items-center justify-between">

              <span className="text-gray-500">
                Simplified clarity score
              </span>

              <span
                className={`text-3xl font-black ${getScoreColor(
                  selected.scoreAfter
                )}`}
              >
                {selected.scoreAfter}%
              </span>

            </div>

          </div>
        )}

        {/* What Changed */}

        {activeTab === "changes" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <RefreshCw className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                What AI Changed
              </h2>

            </div>

            <div className="space-y-5">

              {selected.changes.map((change, index) => (

                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5"
                >

                  <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">

                    <CheckCircle2
                      size={20}
                      className="text-violet-600"
                    />

                  </div>

                  <div>

                    <p className="font-semibold">
                      Improvement #{index + 1}
                    </p>

                    <p className="text-gray-500 mt-1 leading-6">
                      {change}
                    </p>

                  </div>

                </div>

              ))}

            </div>

          </div>
        )}

        {/* Side-by-Side Comparison */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Before vs After
            </h2>

          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            <div>

              <div className="flex justify-between items-center mb-3">

                <h3 className="font-bold">
                  Original Response
                </h3>

                <span
                  className={`font-black ${getScoreColor(
                    selected.scoreBefore
                  )}`}
                >
                  {selected.scoreBefore}%
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-red-500"
                  style={{
                    width: `${selected.scoreBefore}%`,
                  }}
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between items-center mb-3">

                <h3 className="font-bold">
                  Simplified Response
                </h3>

                <span
                  className={`font-black ${getScoreColor(
                    selected.scoreAfter
                  )}`}
                >
                  {selected.scoreAfter}%
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-violet-600"
                  style={{
                    width: `${selected.scoreAfter}%`,
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
                Clarity improvement: +
                {selected.scoreAfter - selected.scoreBefore}%
              </p>

            </div>

          </div>

        </div>

        {/* Preserved Technical Terms */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Code2 className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Preserved Technical Terminology
            </h2>

          </div>

          <p className="text-gray-500 leading-7 mb-6">
            AI simplifies general language without removing important
            technical terms that demonstrate your understanding.
          </p>

          <div className="flex flex-wrap gap-3">

            {selected.technicalTerms.map((term) => (

              <span
                key={term}
                className="px-4 py-2 rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/20 dark:text-violet-400 font-semibold"
              >
                {term}
              </span>

            ))}

          </div>

        </div>

        {/* Complexity Detection */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-7">

              <AlertTriangle className="text-orange-500" />

              <h2 className="text-2xl font-bold">
                Complexity Detected
              </h2>

            </div>

            <div className="space-y-4">

              {[
                "Long sentence structures",
                "Excessive formal wording",
                "Unnecessary noun phrases",
                "Abstract expressions",
                "Difficult-to-follow explanations",
              ].map((item, index) => (

                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl bg-orange-50 dark:bg-orange-900/10 p-4"
                >

                  <AlertTriangle
                    size={19}
                    className="text-orange-500 shrink-0"
                  />

                  <span>
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* Improvements */}

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-7">

              <CheckCircle2 className="text-green-600" />

              <h2 className="text-2xl font-bold">
                Improvements Applied
              </h2>

            </div>

            <div className="space-y-4">

              {[
                "Shorter sentences",
                "Clearer verbs",
                "Simpler vocabulary",
                "Better sentence flow",
                "Technical terms preserved",
              ].map((item, index) => (

                <div
                  key={index}
                  className="flex items-center gap-3 rounded-xl bg-green-50 dark:bg-green-900/10 p-4"
                >

                  <CheckCircle2
                    size={19}
                    className="text-green-600 shrink-0"
                  />

                  <span>
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* AI Explanation */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Lightbulb size={30} />

            <h2 className="text-3xl font-bold">
              Why This Version Is Better
            </h2>

          </div>

          <p className="text-white/90 leading-8 max-w-4xl">
            Interviewers need to understand your reasoning quickly.
            Complex vocabulary does not automatically make an answer more
            technical or impressive. A strong response uses simple
            language for general explanations while keeping technical
            terms where they add meaning.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Clear
              </p>

              <h3 className="text-xl font-bold mt-2">
                Easier to Follow
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Shorter sentences make your reasoning easier to understand.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Accurate
              </p>

              <h3 className="text-xl font-bold mt-2">
                Technical Meaning
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Important technical concepts remain unchanged.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Natural
              </p>

              <h3 className="text-xl font-bold mt-2">
                Interview Ready
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                The response sounds more natural when spoken aloud.
              </p>

            </div>

          </div>

        </div>

        {/* Language Simplification Rules */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Wand2 className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              AI Simplification Rules
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                icon: "✂️",
                title: "Remove Redundancy",
                description:
                  "Remove words and phrases that do not add meaning.",
              },
              {
                icon: "🗣️",
                title: "Use Natural Language",
                description:
                  "Prefer language that sounds natural when spoken.",
              },
              {
                icon: "💻",
                title: "Preserve Technical Terms",
                description:
                  "Keep terminology that demonstrates technical knowledge.",
              },
              {
                icon: "🎯",
                title: "Keep the Meaning",
                description:
                  "Simplification must not change the original technical meaning.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="text-4xl">
                  {item.icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {item.title}
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Before / After Example */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <ArrowRight className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Example Transformation
            </h2>

          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            <div>

              <p className="font-bold text-orange-600 mb-3">
                Before
              </p>

              <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-6">

                <p className="leading-7">
                  "The fundamental operational mechanism underlying
                  binary search involves the systematic subdivision of a
                  monotonically ordered dataset..."
                </p>

              </div>

            </div>

            <div>

              <p className="font-bold text-green-600 mb-3">
                After
              </p>

              <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 p-6">

                <p className="leading-7">
                  "Binary search repeatedly divides a sorted dataset in
                  half and compares the target with the middle element."
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Communication Tips */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquareText className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Interview Communication Tips
            </h2>

          </div>

          <div className="space-y-5">

            {[
              "Prefer simple words when explaining general concepts.",
              "Use technical terminology when it communicates an important concept.",
              "Avoid extremely long sentences during spoken responses.",
              "Explain one idea at a time.",
              "Use examples when a concept is difficult to communicate directly.",
              "Do not use complicated vocabulary just to sound more technical.",
            ].map((tip, index) => (

              <div
                key={index}
                className="flex items-start gap-4 rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center shrink-0">

                  <span className="font-black text-indigo-600">
                    {index + 1}
                  </span>

                </div>

                <p className="text-gray-600 dark:text-gray-300 leading-6">
                  {tip}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* AI Personalized Recommendation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Sparkles className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Personalized Recommendation
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Current Strength
              </p>

              <h3 className="text-xl font-bold mt-2">
                Technical Accuracy
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Your answers contain the correct technical concepts and
                terminology.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Opportunity
              </p>

              <h3 className="text-xl font-bold mt-2">
                Simpler Wording
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Replace formal and unnecessarily complicated phrases with
                direct explanations.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Practice Goal
              </p>

              <h3 className="text-xl font-bold mt-2">
                Speak Naturally
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Practice explaining technical concepts as if you were
                teaching them to another developer.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Communication Clarity
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your technical understanding is strong. Simplifying
                unnecessary complexity can make your answers significantly
                easier for an interviewer to understand.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-blue-600">
                {selected.scoreAfter}%
              </p>

              <p className="text-gray-500 mt-2">
                Excellent Clarity
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-blue-500 to-violet-600 transition-all"
              style={{
                width: `${selected.scoreAfter}%`,
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
                The goal is not to make every answer shorter. The goal is
                to make every sentence useful. Use simple language for
                explanations, preserve technical terminology that matters,
                and expand your answer only when additional detail helps
                demonstrate your understanding.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🗣️
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Clear Communication
              </h3>

              <p className="text-5xl font-black">
                {selected.scoreAfter}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewResponseLanguageSimplifier;