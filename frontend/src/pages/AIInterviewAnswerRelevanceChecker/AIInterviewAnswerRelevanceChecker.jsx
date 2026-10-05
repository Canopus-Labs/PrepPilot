import React, { useMemo, useState } from "react";
import {
  Brain,
  Sparkles,
  Target,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  TrendingUp,
  BarChart3,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  ArrowLeft,
  Award,
  Search,
  ShieldCheck,
  Zap,
} from "lucide-react";

const AIInterviewAnswerRelevanceChecker = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [activeTab, setActiveTab] = useState("analysis");
  const [analyzing, setAnalyzing] = useState(false);

  const answers = [
    {
      question: "What is the purpose of an API?",
      type: "General Technical",
      relevanceScore: 82,
      status: "Mostly Relevant",
      original:
        "An API allows different software components or applications to communicate with each other. I have also worked with Python during my college projects and used several databases. APIs are useful because developers can access functionality without needing to understand the complete internal implementation.",
      improved:
        "An API provides a defined interface that allows different software components or applications to communicate and access functionality or data without needing to know the internal implementation.",
      unrelated: [
        "Mentioning personal Python experience.",
        "Mentioning database usage without connecting it to APIs.",
      ],
      missing: [
        "Clearly define the interface provided by an API.",
        "Explain that APIs can expose functionality or data.",
      ],
      strengths: [
        "Correctly identifies communication between software components.",
        "Explains that APIs provide access to functionality.",
        "Shows understanding of abstraction.",
      ],
      recommendations: [
        "Answer the definition directly in the first sentence.",
        "Remove unrelated personal project details.",
        "Keep the abstraction concept because it supports the explanation.",
      ],
    },
    {
      question:
        "Explain the difference between an array and a linked list.",
      type: "Technical",
      relevanceScore: 94,
      status: "Highly Relevant",
      original:
        "An array stores elements in contiguous memory, while a linked list stores elements in separate nodes connected through pointers. Arrays provide O(1) indexed access, while linked-list access generally takes O(n). Linked lists can be more efficient for certain insertions and deletions.",
      improved:
        "An array stores elements in contiguous memory and provides O(1) indexed access. A linked list stores elements in separate nodes connected by pointers, so accessing an element generally takes O(n). Linked lists can provide more efficient insertions and deletions when the node position is known.",
      unrelated: [
        "No major unrelated information detected.",
      ],
      missing: [
        "Mention the condition that makes linked-list insertion efficient.",
      ],
      strengths: [
        "Directly compares both data structures.",
        "Includes memory-layout differences.",
        "Includes time-complexity information.",
      ],
      recommendations: [
        "Continue using direct comparisons.",
        "Add one practical use case for each structure.",
        "Keep complexity explanations concise.",
      ],
    },
    {
      question:
        "How would you optimize a slow database query?",
      type: "Technical",
      relevanceScore: 67,
      status: "Partially Relevant",
      original:
        "Database performance is very important in modern applications. I have used MySQL and PostgreSQL in different projects. Sometimes databases become slow when there are many users. I would probably check the query execution plan and indexes. I also think caching can be useful, and database servers should have enough memory.",
      improved:
        "I would first inspect the query execution plan to identify the bottleneck. Then I would check whether appropriate indexes exist, review joins and filters, and measure the query before and after each optimization. If the query is still slow, I would investigate caching or database configuration.",
      unrelated: [
        "General statement about database importance.",
        "Personal experience with MySQL and PostgreSQL.",
        "General discussion about server memory.",
      ],
      missing: [
        "Explain how the execution plan identifies the bottleneck.",
        "Mention reviewing joins and filters.",
        "Explain that optimizations should be measured.",
      ],
      strengths: [
        "Identifies query execution plans.",
        "Recognizes indexing as an optimization technique.",
        "Mentions caching as a possible optimization.",
      ],
      recommendations: [
        "Start with a concrete debugging approach.",
        "Remove general statements that do not answer the question.",
        "Explain how each optimization would be validated.",
      ],
    },
    {
      question: "What are the benefits of using version control?",
      type: "General Technical",
      relevanceScore: 73,
      status: "Partially Relevant",
      original:
        "Version control helps developers track changes to code and collaborate with other developers. Git is very popular and I have used GitHub for many projects. GitHub has pull requests, issues, and actions, which are useful. I also think working in teams is important because software development requires communication.",
      improved:
        "Version control tracks changes to a codebase, allows developers to collaborate safely, and makes it possible to review or restore previous versions. It also supports branching and merging, which helps teams work on features independently.",
      unrelated: [
        "General statement about teamwork.",
        "Specific personal experience with GitHub.",
        "Detailed discussion of GitHub Actions.",
      ],
      missing: [
        "Mention the ability to restore previous versions.",
        "Explain branching and merging benefits.",
      ],
      strengths: [
        "Correctly identifies change tracking.",
        "Recognizes collaboration as a key benefit.",
        "Understands that GitHub supports version-control workflows.",
      ],
      recommendations: [
        "Focus on version-control capabilities rather than GitHub features.",
        "Mention rollback and history.",
        "Use branching and merging as supporting examples.",
      ],
    },
  ];

  const selected = answers[selectedAnswer];

  const overallScore = useMemo(() => {
    return Math.round(
      answers.reduce(
        (sum, answer) => sum + answer.relevanceScore,
        0
      ) / answers.length
    );
  }, []);

  const getScoreColor = (score) => {
    if (score >= 90) return "text-green-600";
    if (score >= 75) return "text-orange-500";
    return "text-red-600";
  };

  const getStatusColor = (score) => {
    if (score >= 90) {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    if (score >= 75) {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
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

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Target size={34} className="text-violet-600" />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Answer Relevance Checker
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Analyze whether your interview answer directly addresses the
              question and learn how to make your responses more focused.
            </p>
          </div>

        </div>

        {/* Overview */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <MessageSquare
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Answers Analyzed
            </p>

            <p className="text-5xl font-black mt-3">
              36
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Average Relevance
            </p>

            <p className="text-5xl font-black mt-3">
              {overallScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Off-Topic Instances
            </p>

            <p className="text-5xl font-black mt-3">
              18
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Focus Improvement
            </p>

            <p className="text-5xl font-black mt-3">
              +21%
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Relevance Analysis Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90 max-w-5xl">
            AI compares the interviewer's question with your response to
            determine whether you answered the actual question. It
            identifies unrelated information, missing parts, and areas
            where your response could be more focused.
          </p>

        </div>

        {/* Answer Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquare className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Answer
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {answers.map((answer, index) => (

              <button
                key={index}
                type="button"
                onClick={() => setSelectedAnswer(index)}
                className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                  selectedAnswer === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <span className="inline-block px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm">
                  {answer.type}
                </span>

                <h3 className="font-bold text-lg mt-5 leading-7">
                  {answer.question}
                </h3>

                <div className="flex items-center gap-2 mt-5">

                  <span
                    className={`font-black ${getScoreColor(
                      answer.relevanceScore
                    )}`}
                  >
                    {answer.relevanceScore}%
                  </span>

                  <span className="text-sm text-gray-500">
                    relevance
                  </span>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <p className="text-sm text-gray-500">
            Interview Question
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold mt-3">
            {selected.question}
          </h2>

          <span className="inline-block mt-5 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
            {selected.type}
          </span>

        </div>

        {/* Analyze */}

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
                Checking Relevance...
              </>
            ) : (
              <>
                <Sparkles size={22} />
                Analyze Answer Relevance
              </>
            )}

          </button>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["analysis", "Relevance Analysis"],
            ["original", "Original Answer"],
            ["improved", "Focused Answer"],
            ["issues", "Relevance Issues"],
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

        {/* Analysis */}

        {activeTab === "analysis" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Answer Relevance Score
                </h2>

              </div>

              <div className="flex items-center justify-center py-6">

                <div className="relative w-52 h-52 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                  <div className="text-center">

                    <p
                      className={`text-6xl font-black ${getScoreColor(
                        selected.relevanceScore
                      )}`}
                    >
                      {selected.relevanceScore}%
                    </p>

                    <p className="text-gray-500 mt-2">
                      {selected.status}
                    </p>

                  </div>

                </div>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-red-500 via-orange-500 to-green-500"
                  style={{
                    width: `${selected.relevanceScore}%`,
                  }}
                />

              </div>

              <div className="mt-6 flex justify-center">

                <span
                  className={`px-5 py-2 rounded-full font-bold ${getStatusColor(
                    selected.relevanceScore
                  )}`}
                >
                  {selected.status}
                </span>

              </div>

              <p className="text-gray-500 mt-5 leading-6">
                The relevance score measures how directly your response
                addresses the interviewer's question. It does not judge
                whether every technical statement is correct.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Target className="text-blue-600" />

                <h2 className="text-2xl font-bold">
                  Question Coverage
                </h2>

              </div>

              <div className="space-y-5">

                <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 p-5">

                  <div className="flex items-center gap-3">

                    <CheckCircle2
                      className="text-green-600"
                      size={23}
                    />

                    <div>

                      <p className="font-bold">
                        Relevant Content
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Information that directly supports the answer.
                      </p>

                    </div>

                  </div>

                </div>

                <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-5">

                  <div className="flex items-center gap-3">

                    <AlertTriangle
                      className="text-orange-500"
                      size={23}
                    />

                    <div>

                      <p className="font-bold">
                        Unrelated Information
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Details that do not directly help answer the
                        question.
                      </p>

                    </div>

                  </div>

                </div>

                <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 p-5">

                  <div className="flex items-center gap-3">

                    <XCircle
                      className="text-red-600"
                      size={23}
                    />

                    <div>

                      <p className="font-bold">
                        Missing Information
                      </p>

                      <p className="text-sm text-gray-500 mt-1">
                        Important parts of the question that were not
                        addressed.
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
        )}

        {/* Original */}

        {activeTab === "original" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-6">

              <MessageSquare className="text-orange-500" />

              <h2 className="text-2xl font-bold">
                Original Answer
              </h2>

            </div>

            <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-7">

              <p className="text-lg leading-8">
                {selected.original}
              </p>

            </div>

            <div className="mt-7 grid sm:grid-cols-3 gap-5">

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Relevance
                </p>

                <p className="text-3xl font-black text-orange-500 mt-2">
                  {selected.relevanceScore}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Unrelated Areas
                </p>

                <p className="text-3xl font-black text-orange-500 mt-2">
                  {selected.unrelated.length}
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p className="text-xl font-black text-orange-500 mt-3">
                  {selected.status}
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Improved */}

        {activeTab === "improved" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center justify-between gap-5 mb-6">

              <div className="flex items-center gap-3">

                <ShieldCheck className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  More Focused Answer
                </h2>

              </div>

              <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 font-semibold">
                AI Improved
              </span>

            </div>

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-7">

              <p className="text-lg leading-8">
                {selected.improved}
              </p>

            </div>

            <div className="mt-8 grid sm:grid-cols-3 gap-5">

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Original Relevance
                </p>

                <p className="text-3xl font-black text-orange-500 mt-2">
                  {selected.relevanceScore}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Focused Score
                </p>

                <p className="text-3xl font-black text-green-600 mt-2">
                  {Math.min(
                    selected.relevanceScore + 15,
                    99
                  )}
                  %
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Improvement
                </p>

                <p className="text-3xl font-black text-violet-600 mt-2">
                  +
                  {Math.min(
                    15,
                    99 - selected.relevanceScore
                  )}
                  %
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Issues */}

        {activeTab === "issues" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <AlertTriangle className="text-orange-500" />

                <h2 className="text-2xl font-bold">
                  Unrelated Information
                </h2>

              </div>

              <div className="space-y-4">

                {selected.unrelated.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 p-5"
                    >

                      <div className="flex items-start gap-3">

                        <XCircle
                          className="text-orange-500 shrink-0 mt-1"
                          size={20}
                        />

                        <p className="font-semibold leading-6">
                          {item}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Search className="text-red-600" />

                <h2 className="text-2xl font-bold">
                  Missing Parts
                </h2>

              </div>

              <div className="space-y-4">

                {selected.missing.map(
                  (item, index) => (

                    <div
                      key={index}
                      className="rounded-2xl bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 p-5"
                    >

                      <div className="flex items-start gap-3">

                        <AlertTriangle
                          className="text-red-600 shrink-0 mt-1"
                          size={20}
                        />

                        <p className="font-semibold leading-6">
                          {item}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>
        )}

        {/* Strengths */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Award className="text-green-600" />

            <h2 className="text-2xl font-bold">
              What You Are Doing Well
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-5">

            {selected.strengths.map(
              (strength, index) => (

                <div
                  key={index}
                  className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-6"
                >

                  <CheckCircle2
                    className="text-green-600"
                    size={24}
                  />

                  <p className="font-semibold mt-4 leading-6">
                    {strength}
                  </p>

                </div>

              )
            )}

          </div>

        </div>

        {/* Focus Recommendations */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              AI Focus Recommendations
            </h2>

          </div>

          <div className="space-y-5">

            {selected.recommendations.map(
              (recommendation, index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="flex items-start gap-4">

                    <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">

                      <span className="font-bold text-violet-600">
                        {index + 1}
                      </span>

                    </div>

                    <div>

                      <h3 className="font-bold text-lg">
                        {recommendation}
                      </h3>

                      <p className="text-gray-500 mt-2 leading-6">
                        This recommendation can help you provide a more
                        direct and efficient interview response.
                      </p>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        {/* Relevance Categories */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Relevance Categories
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                title: "Directness",
                score: 88,
                example: "Answers the question directly.",
                icon: "🎯",
              },
              {
                title: "Question Coverage",
                score: 81,
                example: "Addresses the important parts.",
                icon: "📋",
              },
              {
                title: "Focus",
                score: 74,
                example: "Avoids unnecessary details.",
                icon: "🔎",
              },
              {
                title: "Communication",
                score: 86,
                example: "Clear and efficient explanation.",
                icon: "💬",
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

                <p className="text-3xl font-black text-violet-600 mt-3">
                  {item.score}%
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  {item.example}
                </p>

                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-5 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Before vs After */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3 className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Relevance Improvement
            </h2>

          </div>

          <div className="space-y-8">

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Original answer
                </span>

                <span className="font-black text-orange-500">
                  {selected.relevanceScore}%
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-red-500"
                  style={{
                    width: `${selected.relevanceScore}%`,
                  }}
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Focused answer
                </span>

                <span className="font-black text-green-600">
                  {Math.min(
                    selected.relevanceScore + 15,
                    99
                  )}
                  %
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                  style={{
                    width: `${Math.min(
                      selected.relevanceScore + 15,
                      99
                    )}%`,
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
                Potential relevance improvement: +
                {Math.min(
                  15,
                  99 - selected.relevanceScore
                )}
                %
              </p>

            </div>

          </div>

        </div>

        {/* AI Principles */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Sparkles size={30} />

            <h2 className="text-3xl font-bold">
              AI Relevance Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Answer Directly
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Start by addressing exactly what the interviewer asked
                before adding supporting details.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🔎
              </p>

              <h3 className="text-xl font-bold mt-4">
                Stay Focused
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Remove information that does not help the interviewer
                understand your answer.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                💡
              </p>

              <h3 className="text-xl font-bold mt-4">
                Cover the Question
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Make sure every important part of a multi-part question
                is addressed.
              </p>

            </div>

          </div>

        </div>

        {/* Common Focus Improvements */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              Common Focus Improvements
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-gray-200 dark:border-white/10">

                  <th className="p-4">
                    Issue
                  </th>

                  <th className="p-4">
                    Better Approach
                  </th>

                  <th className="p-4">
                    Why It Helps
                  </th>

                </tr>

              </thead>

              <tbody>

                {[
                  [
                    "Long introduction",
                    "Answer the question first",
                    "Makes the response immediately relevant.",
                  ],
                  [
                    "Unrelated examples",
                    "Use question-specific examples",
                    "Keeps the discussion focused.",
                  ],
                  [
                    "Too much background",
                    "Include only useful context",
                    "Reduces unnecessary explanation.",
                  ],
                  [
                    "Missing part of question",
                    "Address each requirement",
                    "Improves question coverage.",
                  ],
                  [
                    "Over-explaining",
                    "Use concise supporting details",
                    "Improves communication efficiency.",
                  ],
                ].map((row, index) => (

                  <tr
                    key={index}
                    className="border-b border-gray-100 dark:border-white/5"
                  >

                    <td className="p-4 font-semibold text-red-600">
                      {row[0]}
                    </td>

                    <td className="p-4 font-semibold text-green-600">
                      {row[1]}
                    </td>

                    <td className="p-4 text-gray-500">
                      {row[2]}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        {/* Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Relevance Progress
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                label: "Week 1",
                score: 62,
              },
              {
                label: "Week 2",
                score: 68,
              },
              {
                label: "Week 3",
                score: 76,
              },
              {
                label: "Current",
                score: 84,
              },
            ].map((item) => (

              <div
                key={item.label}
                className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6 text-center"
              >

                <p className="text-sm text-gray-500">
                  {item.label}
                </p>

                <p className="text-4xl font-black text-violet-600 mt-3">
                  {item.score}%
                </p>

                <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-5">

                  <div
                    className="h-full bg-violet-600 rounded-full"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* AI Recommendation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-violet-600" />

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
                Technical Relevance
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Your responses usually contain technically relevant
                information. Continue using specific concepts that support
                your main answer.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Opportunity
              </p>

              <h3 className="text-xl font-bold mt-2">
                Reduce Rambling
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Remove unrelated background information and answer the
                question directly before expanding with examples.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Practice Goal
              </p>

              <h3 className="text-xl font-bold mt-2">
                Answer in 3 Parts
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Try using a simple structure: direct answer, supporting
                explanation, and relevant example.
              </p>

            </div>

          </div>

        </div>

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Answer Relevance Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your answer relevance is improving. Focus on answering
                the exact question first, then add only the technical
                details and examples that support your response.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {overallScore}%
              </p>

              <p className="text-gray-500 mt-2">
                Mostly Relevant
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
              style={{
                width: `${overallScore}%`,
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
                A technically correct answer is not always a relevant
                answer. Start by directly addressing what the interviewer
                asked, then provide the most useful explanation or example.
                Avoid unrelated details unless the interviewer asks for
                them. This makes your communication clearer, shorter, and
                more effective.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Relevance
              </h3>

              <p className="text-5xl font-black">
                {overallScore}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewAnswerRelevanceChecker;