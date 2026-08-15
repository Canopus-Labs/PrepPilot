import React, { useMemo, useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  MessageSquare,
  BarChart3,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  Award,
  Search,
  ShieldCheck,
  TrendingUp,
  FileText,
} from "lucide-react";

const AIInterviewAnswerExampleRelevanceChecker = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [activeTab, setActiveTab] = useState("analysis");
  const [analyzing, setAnalyzing] = useState(false);

  const answers = [
    {
      question:
        "Tell me about a time when you improved the performance of a project.",
      type: "Behavioral",
      answer:
        "I worked on a student management application where the dashboard was loading slowly. I optimized the database queries and added indexes to frequently searched columns. The page load time improved significantly, and the dashboard became much more responsive.",
      relevanceScore: 92,
      exampleCount: 1,
      supportedExamples: 1,
      genericExamples: 0,
      unsupportedExamples: 0,
      examples: [
        {
          text: "Student management application dashboard",
          relevance: 96,
          status: "Strong",
          reason:
            "The example directly demonstrates a real project where performance was improved.",
          suggestion:
            "Add a measurable result such as reduced loading time or query execution time.",
        },
      ],
      strengths: [
        "The example directly supports the performance-improvement claim.",
        "The technical action is clearly connected to the outcome.",
        "The example provides realistic project context.",
      ],
      recommendations: [
        "Add before-and-after performance metrics.",
        "Mention the specific database optimization technique used.",
        "Explain how you measured the improvement.",
      ],
    },
    {
      question:
        "Describe a situation where you solved a difficult technical problem.",
      type: "Behavioral + Technical",
      answer:
        "I faced a difficult issue while working on a web project. Problems are common in software development, and debugging is an important skill. I usually check the code carefully and try different solutions until I find the problem. This taught me that persistence is important.",
      relevanceScore: 64,
      exampleCount: 1,
      supportedExamples: 0,
      genericExamples: 1,
      unsupportedExamples: 0,
      examples: [
        {
          text: "A difficult issue while working on a web project",
          relevance: 58,
          status: "Generic",
          reason:
            "The example does not explain what the technical problem actually was or how it was solved.",
          suggestion:
            "Describe the specific bug, root cause, debugging process, and final solution.",
        },
      ],
      strengths: [
        "Recognizes debugging as an important technical skill.",
        "Shows persistence when solving problems.",
        "Attempts to connect the experience with a learning outcome.",
      ],
      recommendations: [
        "Replace the generic project reference with a specific incident.",
        "Explain the technical root cause.",
        "Include the exact solution and measurable result.",
      ],
    },
    {
      question:
        "How did you use technology to solve a real-world problem?",
      type: "Technical + Project",
      answer:
        "I developed a smart irrigation system using IoT sensors. The system monitored soil moisture and automatically controlled a water pump. I also integrated weather information so the system could avoid unnecessary watering when rain was expected. This helped demonstrate how IoT can improve water management.",
      relevanceScore: 95,
      exampleCount: 1,
      supportedExamples: 1,
      genericExamples: 0,
      unsupportedExamples: 0,
      examples: [
        {
          text: "Smart irrigation system using IoT sensors",
          relevance: 98,
          status: "Strong",
          reason:
            "The project is directly connected to the question and demonstrates a practical technology-based solution.",
          suggestion:
            "Add the amount of water saved or another measurable project outcome.",
        },
      ],
      strengths: [
        "Provides a concrete real-world project.",
        "Clearly explains how technology addressed the problem.",
        "Connects IoT components with a practical outcome.",
      ],
      recommendations: [
        "Add measurable project results.",
        "Mention one technical challenge you solved.",
        "Explain why the chosen technology was appropriate.",
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

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("analysis");
    }, 700);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-orange-500";
    return "text-red-600";
  };

  const getScoreLabel = (score) => {
    if (score >= 85) return "Highly Relevant";
    if (score >= 70) return "Mostly Relevant";
    return "Needs Improvement";
  };

  const getStatusClass = (status) => {
    if (status === "Strong") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    if (status === "Generic") {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-10">

          <div className="flex items-start gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
              <Search
                size={34}
                className="text-violet-600"
              />
            </div>

            <div>

              <h1 className="text-3xl font-bold">
                AI Interview Answer Example Relevance Checker
              </h1>

              <p className="text-gray-500 mt-2 leading-6">
                Analyze whether your examples actually support your
                interview answers and learn how to make them more concrete.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={analyzing}
            className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition disabled:opacity-60"
          >
            {analyzing ? (
              <>
                <RefreshCw
                  size={19}
                  className="animate-spin"
                />
                Checking Examples...
              </>
            ) : (
              <>
                <Sparkles size={19} />
                Analyze Examples
              </>
            )}
          </button>

        </div>

        {/* Overview */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <MessageSquare
              className="text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Answers Analyzed
            </p>

            <p className="text-5xl font-black mt-3">
              28
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <Target
              className="text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Examples Found
            </p>

            <p className="text-5xl font-black mt-3">
              36
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Relevant Examples
            </p>

            <p className="text-5xl font-black mt-3">
              27
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6">

            <BarChart3
              className="text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Relevance Score
            </p>

            <p className="text-5xl font-black mt-3">
              {overallScore}%
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Example Relevance Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            AI checks whether examples in your interview answers directly
            support the point you are making. It identifies strong,
            generic, and weakly supported examples and suggests how to make
            your explanations more credible.
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

          <div className="grid md:grid-cols-3 gap-6">

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
                    className={`font-bold ${getScoreColor(
                      answer.relevanceScore
                    )}`}
                  >
                    {answer.relevanceScore}%
                  </span>

                  <span className="text-sm text-gray-500">
                    example relevance
                  </span>

                </div>

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

          <span className="inline-block mt-5 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
            {selected.type}
          </span>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => setActiveTab("analysis")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "analysis"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Relevance Analysis
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("answer")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "answer"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Answer
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("examples")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "examples"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            Example Analysis
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("recommendations")}
            className={`px-5 py-3 rounded-xl font-semibold ${
              activeTab === "recommendations"
                ? "bg-violet-600 text-white"
                : "bg-white dark:bg-[#111827] shadow text-gray-600 dark:text-gray-300"
            }`}
          >
            AI Recommendations
          </button>

        </div>

        {/* Analysis */}

        {activeTab === "analysis" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-8">

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <BarChart3 className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Example Relevance Score
                </h2>

              </div>

              <div className="flex items-center justify-center py-6">

                <div className="relative w-48 h-48 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                  <div className="text-center">

                    <p
                      className={`text-5xl font-black ${getScoreColor(
                        selected.relevanceScore
                      )}`}
                    >
                      {selected.relevanceScore}%
                    </p>

                    <p className="text-gray-500 mt-2">
                      {getScoreLabel(
                        selected.relevanceScore
                      )}
                    </p>

                  </div>

                </div>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-violet-600"
                  style={{
                    width: `${selected.relevanceScore}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 mt-5 leading-6">
                The score measures how strongly your examples support the
                question and the claims made in your answer.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <Target className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Example Quality Summary
                </h2>

              </div>

              <div className="grid grid-cols-3 gap-4">

                <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 p-5 text-center">

                  <CheckCircle2
                    className="mx-auto text-green-600"
                    size={26}
                  />

                  <p className="text-3xl font-black text-green-600 mt-3">
                    {selected.supportedExamples}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Strong
                  </p>

                </div>

                <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-5 text-center">

                  <AlertTriangle
                    className="mx-auto text-orange-500"
                    size={26}
                  />

                  <p className="text-3xl font-black text-orange-500 mt-3">
                    {selected.genericExamples}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Generic
                  </p>

                </div>

                <div className="rounded-2xl bg-red-50 dark:bg-red-900/10 p-5 text-center">

                  <AlertTriangle
                    className="mx-auto text-red-600"
                    size={26}
                  />

                  <p className="text-3xl font-black text-red-600 mt-3">
                    {selected.unsupportedExamples}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Unsupported
                  </p>

                </div>

              </div>

              <div className="mt-7 rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  AI Assessment
                </p>

                <p className="font-bold text-lg mt-2">
                  {selected.relevanceScore >= 85
                    ? "Your example strongly supports the main answer."
                    : selected.relevanceScore >= 70
                    ? "Your example is relevant but could use more concrete detail."
                    : "Your example needs more specific evidence to support the answer."}
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Answer */}

        {activeTab === "answer" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-6">

              <FileText className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Candidate Answer
              </h2>

            </div>

            <div className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-7">

              <p className="text-lg leading-8">
                {selected.answer}
              </p>

            </div>

            <div className="mt-7 grid sm:grid-cols-3 gap-5">

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Relevance
                </p>

                <p
                  className={`text-3xl font-black mt-2 ${getScoreColor(
                    selected.relevanceScore
                  )}`}
                >
                  {selected.relevanceScore}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Examples Detected
                </p>

                <p className="text-3xl font-black mt-2">
                  {selected.exampleCount}
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Status
                </p>

                <p
                  className={`text-xl font-black mt-3 ${getScoreColor(
                    selected.relevanceScore
                  )}`}
                >
                  {getScoreLabel(selected.relevanceScore)}
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Examples */}

        {activeTab === "examples" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <Search className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Detected Example Analysis
              </h2>

            </div>

            <div className="space-y-6">

              {selected.examples.map((example, index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">

                    <div>

                      <p className="text-sm text-gray-500 mb-2">
                        Example {index + 1}
                      </p>

                      <h3 className="text-xl font-bold">
                        "{example.text}"
                      </h3>

                    </div>

                    <div className="flex items-center gap-4">

                      <span
                        className={`px-4 py-2 rounded-full font-semibold ${getStatusClass(
                          example.status
                        )}`}
                      >
                        {example.status}
                      </span>

                      <span
                        className={`text-2xl font-black ${getScoreColor(
                          example.relevance
                        )}`}
                      >
                        {example.relevance}%
                      </span>

                    </div>

                  </div>

                  <div className="mt-6 rounded-xl bg-gray-50 dark:bg-gray-800 p-5">

                    <p className="text-sm text-gray-500">
                      Why this matters
                    </p>

                    <p className="mt-2 leading-7">
                      {example.reason}
                    </p>

                  </div>

                  <div className="mt-5 rounded-xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-5">

                    <div className="flex items-start gap-3">

                      <Lightbulb
                        className="text-green-600 shrink-0"
                        size={22}
                      />

                      <div>

                        <p className="font-semibold text-green-700 dark:text-green-400">
                          AI Improvement Suggestion
                        </p>

                        <p className="text-gray-500 mt-2 leading-6">
                          {example.suggestion}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>
        )}

        {/* Recommendations */}

        {activeTab === "recommendations" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <Lightbulb className="text-yellow-500" />

              <h2 className="text-2xl font-bold">
                AI Example Improvement Recommendations
              </h2>

            </div>

            <div className="space-y-5">

              {selected.recommendations.map((recommendation, index) => (

                <div
                  key={index}
                  className="flex items-start gap-4 rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="w-10 h-10 rounded-xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">

                    <span className="font-black text-violet-600">
                      {index + 1}
                    </span>

                  </div>

                  <div>

                    <h3 className="font-bold text-lg">
                      {recommendation}
                    </h3>

                    <p className="text-gray-500 mt-2 leading-6">
                      Adding this detail will make your example more
                      concrete and easier for an interviewer to evaluate.
                    </p>

                  </div>

                </div>
              ))}

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

            {selected.strengths.map((strength, index) => (

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

            ))}

          </div>

        </div>

        {/* Example Quality Categories */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Example Quality Categories
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                title: "Relevance",
                score: selected.relevanceScore,
                example: "Supports the main question",
                icon: "🎯",
              },
              {
                title: "Specificity",
                score: 84,
                example: "Contains concrete details",
                icon: "🔍",
              },
              {
                title: "Evidence",
                score: 79,
                example: "Supports claims with results",
                icon: "📊",
              },
              {
                title: "Context",
                score: 91,
                example: "Provides useful background",
                icon: "💡",
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

                <p
                  className={`text-3xl font-black mt-3 ${getScoreColor(
                    item.score
                  )}`}
                >
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

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Example Relevance Improvement
            </h2>

          </div>

          <div className="space-y-8">

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Current example quality
                </span>

                <span className="font-black text-violet-600">
                  {selected.relevanceScore}%
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-indigo-600"
                  style={{
                    width: `${selected.relevanceScore}%`,
                  }}
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Potential after improvements
                </span>

                <span className="font-black text-green-600">
                  {Math.min(selected.relevanceScore + 7, 100)}%
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                  style={{
                    width: `${Math.min(
                      selected.relevanceScore + 7,
                      100
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
                Potential improvement: +
                {Math.min(
                  selected.relevanceScore + 7,
                  100
                ) - selected.relevanceScore}
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
              AI Example Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Stay Relevant
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Choose examples that directly demonstrate the skill or
                experience being discussed.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                📊
              </p>

              <h3 className="text-xl font-bold mt-4">
                Add Evidence
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Support achievements with measurable results, technical
                details, or clear outcomes.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                💡
              </p>

              <h3 className="text-xl font-bold mt-4">
                Be Specific
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Replace vague examples with a specific situation, action,
                and result.
              </p>

            </div>

          </div>

        </div>

        {/* Common Example Improvements */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              Stronger Example Patterns
            </h2>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-gray-200 dark:border-white/10">

                  <th className="p-4">
                    Weak Example
                  </th>

                  <th className="p-4">
                    Stronger Example
                  </th>

                  <th className="p-4">
                    Why It Works
                  </th>

                </tr>

              </thead>

              <tbody>

                {[
                  [
                    "I worked on a project.",
                    "I developed a student management dashboard using React and optimized its database queries.",
                    "Provides project and technical context.",
                  ],
                  [
                    "The application became faster.",
                    "Page load time dropped from 4.2 seconds to 1.8 seconds.",
                    "Adds measurable evidence.",
                  ],
                  [
                    "I solved a difficult bug.",
                    "I traced a production API timeout to an inefficient database query and added the required index.",
                    "Explains the actual problem and solution.",
                  ],
                  [
                    "I improved performance.",
                    "I reduced repeated API calls by caching frequently requested data.",
                    "Clearly connects action with the claim.",
                  ],
                  [
                    "This helped the team.",
                    "The change reduced response time and allowed the team to process more requests.",
                    "Shows a concrete outcome.",
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

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <div className="flex items-center gap-3">

                <ShieldCheck className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Overall Example Relevance Score
                </h2>

              </div>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your examples are generally relevant to your interview
                answers. Continue adding specific technical details,
                measurable results, and clear connections to the question.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {overallScore}%
              </p>

              <p className="text-gray-500 mt-2">
                Example Relevance
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
                Strong interview examples should directly support the point
                you are making. Avoid generic statements and connect each
                example to a specific action, technical decision, or measurable
                result. A relevant example makes your answer more credible
                and easier for an interviewer to evaluate.
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
                {selected.relevanceScore}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewAnswerExampleRelevanceChecker;