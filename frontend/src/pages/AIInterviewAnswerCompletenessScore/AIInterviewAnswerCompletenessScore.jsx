import React, { useMemo, useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  MessageSquare,
  TrendingUp,
  BarChart3,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  Award,
  BookOpen,
  CircleAlert,
  Layers,
  ListChecks,
  ShieldCheck,
  Search,
} from "lucide-react";

const AIInterviewAnswerCompletenessScore = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(0);
  const [activeTab, setActiveTab] = useState("analysis");
  const [analyzing, setAnalyzing] = useState(false);

  const answers = [
    {
      question: "How would you optimize a slow database query?",
      type: "Technical",
      completeness: 72,
      technicalScore: 88,
      structureScore: 68,
      exampleScore: 55,
      tradeoffScore: 62,
      edgeCaseScore: 48,
      original:
        "I would start by checking the query execution plan to identify the bottleneck. Then I would check whether the required columns are indexed and review the joins for unnecessary operations.",
      improved:
        "I would start by checking the query execution plan to identify the bottleneck. Then I would verify indexes on frequently filtered and joined columns and review joins for unnecessary operations. I would also check whether the query is scanning more rows than necessary and whether pagination or query restructuring could help. Finally, I would benchmark the change before and after applying it and consider the trade-off between additional indexes and write performance.",
      expectedPoints: [
        {
          title: "Check query execution plan",
          covered: true,
          explanation:
            "The response correctly identifies the execution plan as the first diagnostic step.",
        },
        {
          title: "Review database indexes",
          covered: true,
          explanation:
            "The answer mentions checking whether required columns are indexed.",
        },
        {
          title: "Analyze joins",
          covered: true,
          explanation:
            "The response identifies unnecessary joins as a possible bottleneck.",
        },
        {
          title: "Check scanned rows",
          covered: false,
          explanation:
            "A stronger answer should discuss whether the query scans more rows than necessary.",
        },
        {
          title: "Benchmark improvements",
          covered: false,
          explanation:
            "The response should explain how the optimization would be measured.",
        },
        {
          title: "Discuss index trade-offs",
          covered: false,
          explanation:
            "Additional indexes can improve reads but may increase storage and write overhead.",
        },
      ],
      missingTopics: [
        "Query scanning and filtering efficiency",
        "Benchmarking before and after optimization",
        "Index storage and write-performance trade-offs",
      ],
      strengths: [
        "Starts with a practical diagnostic approach.",
        "Recognizes indexing as a performance factor.",
        "Considers joins as a potential bottleneck.",
      ],
    },
    {
      question: "Explain the difference between an array and a linked list.",
      type: "Technical",
      completeness: 81,
      technicalScore: 91,
      structureScore: 82,
      exampleScore: 67,
      tradeoffScore: 76,
      edgeCaseScore: 64,
      original:
        "An array stores elements in contiguous memory, which allows O(1) indexed access. A linked list stores elements in separate nodes connected by pointers, so accessing an element generally takes O(n) time.",
      improved:
        "An array stores elements in contiguous memory, allowing O(1) indexed access. A linked list stores elements in separate nodes connected by pointers, so accessing an element generally takes O(n) time. Arrays usually provide better cache locality, while linked lists can make insertion and deletion efficient when the node position is already known. However, linked lists require extra memory for pointers and generally have worse cache performance. The best choice depends on the access and update patterns of the application.",
      expectedPoints: [
        {
          title: "Memory layout",
          covered: true,
          explanation:
            "The answer correctly explains contiguous versus node-based storage.",
        },
        {
          title: "Access complexity",
          covered: true,
          explanation:
            "The response includes O(1) array access and O(n) linked-list access.",
        },
        {
          title: "Insertion and deletion",
          covered: true,
          explanation:
            "The improved answer explains an important operational difference.",
        },
        {
          title: "Memory overhead",
          covered: false,
          explanation:
            "Linked-list nodes require additional memory for pointers.",
        },
        {
          title: "Cache locality",
          covered: false,
          explanation:
            "Array memory locality is an important practical performance consideration.",
        },
        {
          title: "Use-case trade-off",
          covered: true,
          explanation:
            "The answer connects the data structure choice to application requirements.",
        },
      ],
      missingTopics: [
        "Pointer memory overhead",
        "CPU cache locality",
      ],
      strengths: [
        "Correctly explains the memory-layout difference.",
        "Includes important time complexities.",
        "Clearly distinguishes the two data structures.",
      ],
    },
    {
      question: "What is the purpose of an API?",
      type: "General Technical",
      completeness: 64,
      technicalScore: 86,
      structureScore: 70,
      exampleScore: 45,
      tradeoffScore: 38,
      edgeCaseScore: 30,
      original:
        "An API provides a defined interface that allows different software components or applications to communicate and access functionality or data.",
      improved:
        "An API provides a defined interface that allows software components or applications to communicate and access functionality or data. For example, a weather application can call a weather API to retrieve current temperature data without knowing how the provider stores or processes that information internally. APIs can also define authentication, request formats, response formats, and error behavior. The abstraction allows systems to interact without exposing their internal implementation details.",
      expectedPoints: [
        {
          title: "Definition of an API",
          covered: true,
          explanation:
            "The response provides a technically correct definition.",
        },
        {
          title: "Communication between systems",
          covered: true,
          explanation:
            "The answer explains that APIs enable software components to communicate.",
        },
        {
          title: "Access to functionality or data",
          covered: true,
          explanation:
            "The response correctly mentions accessing functionality and data.",
        },
        {
          title: "Real-world example",
          covered: false,
          explanation:
            "A concrete example would make the explanation easier to understand.",
        },
        {
          title: "Request and response structure",
          covered: false,
          explanation:
            "A stronger answer can mention how APIs define requests and responses.",
        },
        {
          title: "Abstraction",
          covered: false,
          explanation:
            "The answer should explain that APIs hide internal implementation details.",
        },
      ],
      missingTopics: [
        "Concrete API example",
        "Request and response structure",
        "Abstraction and implementation details",
      ],
      strengths: [
        "Provides a correct core definition.",
        "Understands software communication.",
        "Recognizes that APIs expose functionality or data.",
      ],
    },
  ];

  const selected = answers[selectedAnswer];

  const overallScore = useMemo(() => {
    return Math.round(
      answers.reduce(
        (sum, answer) => sum + answer.completeness,
        0
      ) / answers.length
    );
  }, []);

  const coveredPoints = selected.expectedPoints.filter(
    (point) => point.covered
  ).length;

  const missingPoints = selected.expectedPoints.filter(
    (point) => !point.covered
  ).length;

  const handleAnalyze = () => {
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setActiveTab("analysis");
    }, 800);
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-orange-500";
    return "text-red-600";
  };

  const getScoreLabel = (score) => {
    if (score >= 85) return "Highly Complete";
    if (score >= 70) return "Mostly Complete";
    return "Needs More Detail";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <Target
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Answer Completeness Score
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Evaluate whether your interview answers cover the important
              concepts, examples, trade-offs, and edge cases expected by
              interviewers.
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
              32
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CircleAlert
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Missing Points
            </p>

            <p className="text-5xl font-black mt-3">
              19
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <ShieldCheck
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Completeness Score
            </p>

            <p className="text-5xl font-black mt-3">
              {overallScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Improvement
            </p>

            <p className="text-5xl font-black mt-3">
              +18%
            </p>

          </div>

        </div>

        {/* AI Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-indigo-600 to-blue-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Answer Completeness Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90 max-w-5xl">
            AI compares your response with the important concepts expected
            for the question. It identifies covered points, missing
            explanations, examples, trade-offs, and edge cases, then
            recommends what you can add to make the answer more complete.
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
                      answer.completeness
                    )}`}
                  >
                    {answer.completeness}%
                  </span>

                  <span className="text-sm text-gray-500">
                    complete
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

        {/* Analyze Button */}

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

                Analyzing Answer...
              </>
            ) : (
              <>
                <Sparkles size={22} />

                Analyze Answer Completeness
              </>
            )}

          </button>

        </div>

        {/* Tabs */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            ["analysis", "Completeness Analysis"],
            ["original", "Original Answer"],
            ["missing", "Missing Points"],
            ["structure", "Improved Structure"],
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
                  Answer Completeness Score
                </h2>

              </div>

              <div className="flex items-center justify-center py-6">

                <div className="relative w-48 h-48 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">

                  <div className="text-center">

                    <p
                      className={`text-5xl font-black ${getScoreColor(
                        selected.completeness
                      )}`}
                    >
                      {selected.completeness}%
                    </p>

                    <p className="text-gray-500 mt-2">
                      {getScoreLabel(
                        selected.completeness
                      )}
                    </p>

                  </div>

                </div>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-violet-600"
                  style={{
                    width: `${selected.completeness}%`,
                  }}
                />

              </div>

              <p className="text-gray-500 mt-5 leading-6">
                The completeness score measures how many important aspects
                of the question your answer addresses. A technically
                correct answer can still receive a lower score if important
                supporting details are missing.
              </p>

            </div>

            <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

              <div className="flex items-center gap-3 mb-7">

                <ListChecks className="text-green-600" />

                <h2 className="text-2xl font-bold">
                  Coverage Summary
                </h2>

              </div>

              <div className="grid grid-cols-2 gap-5">

                <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 p-6 text-center">

                  <CheckCircle2
                    className="mx-auto text-green-600"
                    size={28}
                  />

                  <p className="text-4xl font-black text-green-600 mt-3">
                    {coveredPoints}
                  </p>

                  <p className="text-gray-500 mt-1">
                    Covered Points
                  </p>

                </div>

                <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-6 text-center">

                  <AlertTriangle
                    className="mx-auto text-orange-500"
                    size={28}
                  />

                  <p className="text-4xl font-black text-orange-500 mt-3">
                    {missingPoints}
                  </p>

                  <p className="text-gray-500 mt-1">
                    Missing Points
                  </p>

                </div>

              </div>

              <div className="mt-6 space-y-3">

                {selected.expectedPoints.map(
                  (point) => (

                    <div
                      key={point.title}
                      className="flex items-center gap-3 rounded-xl bg-gray-50 dark:bg-gray-800 p-4"
                    >

                      {point.covered ? (
                        <CheckCircle2
                          size={20}
                          className="text-green-600 shrink-0"
                        />
                      ) : (
                        <CircleAlert
                          size={20}
                          className="text-orange-500 shrink-0"
                        />
                      )}

                      <span className="font-semibold">
                        {point.title}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>
        )}

        {/* Score Breakdown */}

        {activeTab === "analysis" && (

          <div className="mt-8 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-8">

              <Target className="text-indigo-600" />

              <h2 className="text-2xl font-bold">
                Completeness Dimension Breakdown
              </h2>

            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">

              {[
                {
                  label: "Technical Coverage",
                  score: selected.technicalScore,
                  icon: "💻",
                },
                {
                  label: "Answer Structure",
                  score: selected.structureScore,
                  icon: "🧩",
                },
                {
                  label: "Examples",
                  score: selected.exampleScore,
                  icon: "💡",
                },
                {
                  label: "Trade-offs",
                  score: selected.tradeoffScore,
                  icon: "⚖️",
                },
                {
                  label: "Edge Cases",
                  score: selected.edgeCaseScore,
                  icon: "🔍",
                },
              ].map((item) => (

                <div
                  key={item.label}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="text-3xl">
                    {item.icon}
                  </div>

                  <h3 className="font-bold mt-4">
                    {item.label}
                  </h3>

                  <p
                    className={`text-3xl font-black mt-3 ${getScoreColor(
                      item.score
                    )}`}
                  >
                    {item.score}%
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
                  Completeness
                </p>

                <p className="text-3xl font-black text-orange-500 mt-2">
                  {selected.completeness}%
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Covered Points
                </p>

                <p className="text-3xl font-black text-green-600 mt-2">
                  {coveredPoints}
                </p>

              </div>

              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5">

                <p className="text-sm text-gray-500">
                  Missing Points
                </p>

                <p className="text-3xl font-black text-red-600 mt-2">
                  {missingPoints}
                </p>

              </div>

            </div>

          </div>
        )}

        {/* Missing Points */}

        {activeTab === "missing" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center gap-3 mb-8">

              <AlertTriangle className="text-orange-500" />

              <h2 className="text-2xl font-bold">
                Missing Answer Points
              </h2>

            </div>

            <div className="space-y-5">

              {selected.expectedPoints
                .filter((point) => !point.covered)
                .map((point, index) => (

                  <div
                    key={point.title}
                    className="rounded-2xl border border-orange-200 dark:border-orange-900/30 bg-orange-50 dark:bg-orange-900/10 p-6"
                  >

                    <div className="flex gap-4">

                      <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0">

                        <span className="font-black text-orange-600">
                          {index + 1}
                        </span>

                      </div>

                      <div>

                        <h3 className="text-lg font-bold">
                          {point.title}
                        </h3>

                        <p className="text-gray-500 mt-2 leading-6">
                          {point.explanation}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

            </div>

            <div className="mt-8">

              <div className="flex items-center gap-3 mb-5">

                <BookOpen className="text-violet-600" />

                <h3 className="text-xl font-bold">
                  Topics to Add
                </h3>

              </div>

              <div className="grid md:grid-cols-3 gap-5">

                {selected.missingTopics.map(
                  (topic) => (

                    <div
                      key={topic}
                      className="rounded-2xl bg-violet-50 dark:bg-violet-900/10 border border-violet-200 dark:border-violet-900/30 p-5"
                    >

                      <p className="font-semibold">
                        {topic}
                      </p>

                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-violet-600 font-semibold mt-4"
                      >
                        Practice Topic
                        <ArrowRight size={16} />
                      </button>

                    </div>

                  )
                )}

              </div>

            </div>

          </div>
        )}

        {/* Improved Structure */}

        {activeTab === "structure" && (

          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-7">

            <div className="flex items-center justify-between gap-5 mb-8">

              <div className="flex items-center gap-3">

                <Sparkles className="text-violet-600" />

                <h2 className="text-2xl font-bold">
                  Improved Answer Structure
                </h2>

              </div>

              <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400 font-semibold">
                AI Suggested
              </span>

            </div>

            <div className="rounded-2xl bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 p-7">

              <p className="text-lg leading-8">
                {selected.improved}
              </p>

            </div>

            <div className="mt-8">

              <div className="flex items-center gap-3 mb-6">

                <Layers className="text-blue-600" />

                <h3 className="text-xl font-bold">
                  Recommended Answer Structure
                </h3>

              </div>

              <div className="grid md:grid-cols-2 gap-5">

                {[
                  {
                    number: "1",
                    title: "Start With the Core Concept",
                    text:
                      "Directly answer the main question and establish the key technical idea.",
                  },
                  {
                    number: "2",
                    title: "Explain Your Reasoning",
                    text:
                      "Describe how you would approach the problem and why you selected that approach.",
                  },
                  {
                    number: "3",
                    title: "Add a Practical Example",
                    text:
                      "Use a concrete example to demonstrate that you can apply the concept.",
                  },
                  {
                    number: "4",
                    title: "Mention Trade-offs",
                    text:
                      "Explain important advantages, disadvantages, or design considerations.",
                  },
                  {
                    number: "5",
                    title: "Cover Edge Cases",
                    text:
                      "Mention unusual conditions or limitations that could affect your solution.",
                  },
                  {
                    number: "6",
                    title: "Finish With a Clear Conclusion",
                    text:
                      "Summarize the recommended approach and connect it back to the question.",
                  },
                ].map((item) => (

                  <div
                    key={item.number}
                    className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                  >

                    <div className="flex gap-4">

                      <div className="w-10 h-10 rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">

                        <span className="font-black text-violet-600">
                          {item.number}
                        </span>

                      </div>

                      <div>

                        <h3 className="font-bold text-lg">
                          {item.title}
                        </h3>

                        <p className="text-gray-500 mt-2 leading-6">
                          {item.text}
                        </p>

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>

          </div>
        )}

        {/* Strengths */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Award className="text-green-600" />

            <h2 className="text-2xl font-bold">
              What Your Answer Already Covers
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

        {/* Completeness Categories */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Layers className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Answer Coverage Categories
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                title: "Core Concept",
                score: selected.technicalScore,
                example: "Correct technical explanation",
                icon: "🎯",
              },
              {
                title: "Examples",
                score: selected.exampleScore,
                example: "Practical real-world examples",
                icon: "💡",
              },
              {
                title: "Trade-offs",
                score: selected.tradeoffScore,
                example: "Advantages and limitations",
                icon: "⚖️",
              },
              {
                title: "Edge Cases",
                score: selected.edgeCaseScore,
                example: "Special cases and limitations",
                icon: "🔍",
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

            <TrendingUp className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Completeness Improvement
            </h2>

          </div>

          <div className="space-y-8">

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Original Answer
                </span>

                <span className="font-black text-orange-500">
                  {selected.completeness}%
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-400 to-red-500"
                  style={{
                    width: `${selected.completeness}%`,
                  }}
                />

              </div>

            </div>

            <div>

              <div className="flex justify-between mb-3">

                <span className="font-semibold">
                  Improved Answer
                </span>

                <span className="font-black text-green-600">
                  {Math.min(
                    98,
                    selected.completeness + 21
                  )}
                  %
                </span>

              </div>

              <div className="w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-600"
                  style={{
                    width: `${Math.min(
                      98,
                      selected.completeness + 21
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
                  98,
                  selected.completeness + 21
                ) - selected.completeness}
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
              AI Completeness Principles
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🎯
              </p>

              <h3 className="text-xl font-bold mt-4">
                Cover the Core
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Start by directly answering the main concept or problem
                asked by the interviewer.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                💡
              </p>

              <h3 className="text-xl font-bold mt-4">
                Support With Evidence
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Add examples, reasoning, implementation details, or
                practical scenarios when they strengthen the explanation.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-4xl">
                🔍
              </p>

              <h3 className="text-xl font-bold mt-4">
                Mention Limitations
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Strong answers acknowledge important trade-offs,
                limitations, and edge cases without becoming unnecessarily
                long.
              </p>

            </div>

          </div>

        </div>

        {/* Recommended Answer Framework */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BookOpen className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Recommended Answer Framework
            </h2>

          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-6 gap-5">

            {[
              ["1", "Concept"],
              ["2", "Approach"],
              ["3", "Example"],
              ["4", "Trade-offs"],
              ["5", "Edge Cases"],
              ["6", "Conclusion"],
            ].map(([number, label]) => (

              <div
                key={number}
                className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-5 text-center"
              >

                <div className="w-12 h-12 mx-auto rounded-full bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

                  <span className="font-black text-violet-600">
                    {number}
                  </span>

                </div>

                <p className="font-bold mt-4">
                  {label}
                </p>

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
                Core Technical Knowledge
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Your answers generally contain the correct core concept.
                The biggest opportunity is adding supporting details.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Opportunity
              </p>

              <h3 className="text-xl font-bold mt-2">
                Add Examples and Trade-offs
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Include practical examples and explain important
                advantages, disadvantages, or limitations.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Practice Goal
              </p>

              <h3 className="text-xl font-bold mt-2">
                Complete the Explanation
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Practice answering questions using the concept → approach
                → example → trade-off → edge-case structure.
              </p>

            </div>

          </div>

        </div>

        {/* Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Answer Completeness Progress
            </h2>

          </div>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                label: "Week 1",
                score: 61,
              },
              {
                label: "Week 2",
                score: 68,
              },
              {
                label: "Week 3",
                score: 75,
              },
              {
                label: "Current",
                score: overallScore,
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

        {/* Final Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Answer Completeness
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your answers contain the main technical concepts, but
                adding examples, trade-offs, and edge cases can make your
                responses more complete and interview-ready.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {overallScore}%
              </p>

              <p className="text-gray-500 mt-2">
                {getScoreLabel(overallScore)}
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
                A complete interview answer is more than a technically
                correct statement. Start with the core concept, explain
                your reasoning, provide a useful example, mention important
                trade-offs, and address relevant edge cases. The goal is
                not to make every answer unnecessarily long, but to make
                sure the important parts of the question are covered.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🎯
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Completeness
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

export default AIInterviewAnswerCompletenessScore;