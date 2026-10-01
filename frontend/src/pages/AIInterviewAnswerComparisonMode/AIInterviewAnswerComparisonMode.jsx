import React, { useState } from "react";
import {
  Brain,
  GitCompare,
  Sparkles,
  MessageSquareText,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target,
  FileText,
  Code2,
  ListChecks,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const AIInterviewAnswerComparisonMode = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [activeView, setActiveView] = useState("comparison");

  const questions = [
    {
      question: "What is the difference between an array and a linked list?",
      type: "Technical",
      category: "Data Structures",
    },
    {
      question: "Tell me about a challenging project you worked on.",
      type: "Behavioral",
      category: "Project Experience",
    },
    {
      question: "How would you optimize a slow database query?",
      type: "Technical",
      category: "Databases",
    },
  ];

  const comparisonData = [
    {
      title: "Your Answer",
      icon: MessageSquareText,
      color: "blue",
      score: 78,
      content:
        "An array stores elements in contiguous memory while a linked list stores nodes connected through pointers. Arrays provide faster random access because we can access elements using an index. Linked lists are better when we frequently insert or delete elements because nodes can be changed without moving the entire collection.",
      strengths: [
        "Correctly identifies the basic structural difference.",
        "Explains random access in arrays.",
        "Mentions insertion and deletion advantages.",
      ],
      missing: [
        "Does not clearly discuss memory locality.",
        "Could explain the time complexities more precisely.",
        "Does not mention the memory overhead of linked-list pointers.",
      ],
    },
    {
      title: "Concise Approach",
      icon: FileText,
      color: "green",
      score: 92,
      content:
        "An array stores elements in contiguous memory and provides O(1) indexed access, while a linked list stores elements in separate nodes connected by pointers. Arrays generally provide better cache locality, whereas linked lists can make insertion and deletion easier when the node position is already known.",
      strengths: [
        "Directly answers the core difference.",
        "Includes important complexity information.",
        "Uses concise technical terminology.",
      ],
      missing: [
        "Provides less detail about practical trade-offs.",
      ],
    },
    {
      title: "Detailed Approach",
      icon: ListChecks,
      color: "violet",
      score: 96,
      content:
        "An array stores elements in contiguous memory locations, which enables O(1) random access and generally provides good cache locality. However, inserting or deleting elements in the middle can require shifting elements, making those operations O(n). A linked list stores data in separate nodes connected through pointers. Accessing an arbitrary position requires traversal and is O(n), but insertion or deletion can be O(1) when the relevant node or predecessor is already known. Linked lists also require additional memory for pointers.",
      strengths: [
        "Explains memory organization.",
        "Covers access, insertion, and deletion complexity.",
        "Explains cache locality.",
        "Mentions pointer memory overhead.",
      ],
      missing: [
        "Longer than necessary for a quick interview response.",
      ],
    },
    {
      title: "Alternative Technical Approach",
      icon: Code2,
      color: "orange",
      score: 94,
      content:
        "Instead of comparing only operations, compare the data structures based on workload. If an application requires frequent indexed reads and predictable memory access, an array is usually preferable. If the workload involves frequent structural changes and sequential traversal, a linked list may be more appropriate. The final choice should depend on access patterns, memory constraints, and operation frequency.",
      strengths: [
        "Uses a practical decision-making approach.",
        "Connects the concept to real-world workloads.",
        "Shows understanding beyond memorized definitions.",
      ],
      missing: [
        "Could include concrete examples of suitable workloads.",
      ],
    },
  ];

  const selected = questions[selectedQuestion];

  const getColorClasses = (color) => {
    const classes = {
      blue: {
        bg: "bg-blue-100 dark:bg-blue-900/20",
        text: "text-blue-600",
        border: "border-blue-200 dark:border-blue-900/30",
      },
      green: {
        bg: "bg-green-100 dark:bg-green-900/20",
        text: "text-green-600",
        border: "border-green-200 dark:border-green-900/30",
      },
      violet: {
        bg: "bg-violet-100 dark:bg-violet-900/20",
        text: "text-violet-600",
        border: "border-violet-200 dark:border-violet-900/30",
      },
      orange: {
        bg: "bg-orange-100 dark:bg-orange-900/20",
        text: "text-orange-600",
        border: "border-orange-200 dark:border-orange-900/30",
      },
    };

    return classes[color] || classes.blue;
  };

  const getScoreColor = (score) => {
    if (score >= 90) {
      return "text-green-600";
    }

    if (score >= 75) {
      return "text-yellow-600";
    }

    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-4 sm:px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center shrink-0">
            <GitCompare
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold">
              AI Interview Answer Comparison Mode
            </h1>

            <p className="text-gray-500 mt-2 leading-6">
              Compare your interview response with multiple high-quality
              answer strategies and understand how different approaches
              can improve your response.
            </p>
          </div>

        </div>

        {/* Overview Metrics */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
            <GitCompare
              className="mx-auto text-violet-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Answers Compared
            </p>

            <p className="text-5xl font-black mt-3">
              4
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
            <Target
              className="mx-auto text-blue-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Your Answer Score
            </p>

            <p className="text-5xl font-black mt-3">
              78%
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
            <Sparkles
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Best Reference
            </p>

            <p className="text-5xl font-black mt-3">
              96%
            </p>
          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">
            <TrendingUp
              className="mx-auto text-orange-500"
              size={30}
            />

            <p className="text-gray-500 mt-4">
              Improvement Potential
            </p>

            <p className="text-5xl font-black mt-3">
              +18%
            </p>
          </div>

        </div>

        {/* AI Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-2xl sm:text-3xl font-bold">
              AI Multi-Answer Comparison
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            There is rarely only one correct way to answer an interview
            question. AI compares your response with concise, detailed,
            and alternative technical approaches so you can understand
            different ways to communicate the same knowledge effectively.
          </p>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquareText className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Question
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {questions.map((item, index) => (

              <button
                key={index}
                type="button"
                onClick={() => setSelectedQuestion(index)}
                className={`text-left rounded-2xl border p-6 transition hover:-translate-y-1 ${
                  selectedQuestion === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <div className="flex items-center justify-between gap-3">

                  <span className="px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm">
                    {item.type}
                  </span>

                  <span className="text-xs text-gray-500">
                    {item.category}
                  </span>

                </div>

                <h3 className="font-bold text-lg mt-5 leading-7">
                  {item.question}
                </h3>

              </button>

            ))}

          </div>

        </div>

        {/* Selected Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <p className="text-sm text-gray-500">
            Selected Question
          </p>

          <h2 className="text-2xl sm:text-3xl font-bold mt-3">
            {selected.question}
          </h2>

          <div className="flex flex-wrap gap-3 mt-6">

            <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
              {selected.type}
            </span>

            <span className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
              {selected.category}
            </span>

          </div>

        </div>

        {/* View Switcher */}

        <div className="mt-10 flex flex-wrap gap-3">

          {[
            {
              id: "comparison",
              label: "Full Comparison",
            },
            {
              id: "missing",
              label: "Missing Points",
            },
            {
              id: "differences",
              label: "Key Differences",
            },
          ].map((view) => (

            <button
              key={view.id}
              type="button"
              onClick={() => setActiveView(view.id)}
              className={`px-5 py-3 rounded-xl font-semibold transition ${
                activeView === view.id
                  ? "bg-violet-600 text-white"
                  : "bg-white dark:bg-[#111827] text-gray-600 dark:text-gray-300 shadow"
              }`}
            >
              {view.label}
            </button>

          ))}

        </div>

        {/* Comparison Cards */}

        {activeView === "comparison" && (
          <div className="mt-6 grid lg:grid-cols-2 gap-6">

            {comparisonData.map((answer, index) => {

              const colors = getColorClasses(answer.color);
              const Icon = answer.icon;

              return (
                <div
                  key={index}
                  className={`bg-white dark:bg-[#111827] rounded-3xl shadow p-7 border ${colors.border}`}
                >

                  <div className="flex items-start justify-between gap-4">

                    <div className="flex items-center gap-4">

                      <div
                        className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}
                      >
                        <Icon
                          size={24}
                          className={colors.text}
                        />
                      </div>

                      <div>

                        <h3 className="text-xl font-bold">
                          {answer.title}
                        </h3>

                        <p className="text-gray-500 mt-1">
                          Answer approach
                        </p>

                      </div>

                    </div>

                    <div className="text-right">

                      <p
                        className={`text-3xl font-black ${getScoreColor(
                          answer.score
                        )}`}
                      >
                        {answer.score}%
                      </p>

                      <p className="text-xs text-gray-500">
                        quality
                      </p>

                    </div>

                  </div>

                  <div className="mt-6 rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

                    <p className="leading-7">
                      {answer.content}
                    </p>

                  </div>

                  <div className="mt-6">

                    <div className="flex items-center gap-2">

                      <CheckCircle2
                        size={20}
                        className="text-green-600"
                      />

                      <h4 className="font-bold">
                        Strengths
                      </h4>

                    </div>

                    <ul className="mt-4 space-y-3">

                      {answer.strengths.map((strength, strengthIndex) => (

                        <li
                          key={strengthIndex}
                          className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                        >
                          <CheckCircle2
                            size={17}
                            className="text-green-600 mt-1 shrink-0"
                          />

                          <span>
                            {strength}
                          </span>
                        </li>

                      ))}

                    </ul>

                  </div>

                </div>
              );
            })}

          </div>
        )}

        {/* Missing Points */}

        {activeView === "missing" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-8">

              <AlertTriangle className="text-orange-500" />

              <h2 className="text-2xl font-bold">
                Points Missing From Your Answer
              </h2>

            </div>

            <div className="grid md:grid-cols-2 gap-6">

              {comparisonData
                .filter((answer) => answer.title !== "Your Answer")
                .flatMap((answer) => answer.missing)
                .filter(
                  (value, index, array) =>
                    array.indexOf(value) === index
                )
                .map((missing, index) => (

                  <div
                    key={index}
                    className="rounded-2xl border border-orange-200 dark:border-orange-900/30 bg-orange-50 dark:bg-orange-900/10 p-6"
                  >

                    <div className="flex items-start gap-4">

                      <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0">

                        <AlertTriangle
                          size={20}
                          className="text-orange-500"
                        />

                      </div>

                      <div>

                        <h3 className="font-bold">
                          Missing Point #{index + 1}
                        </h3>

                        <p className="text-gray-600 dark:text-gray-300 mt-2 leading-6">
                          {missing}
                        </p>

                      </div>

                    </div>

                  </div>

                ))}

            </div>

          </div>
        )}

        {/* Key Differences */}

        {activeView === "differences" && (
          <div className="mt-6 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

            <div className="flex items-center gap-3 mb-8">

              <GitCompare className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Key Differences Between Approaches
              </h2>

            </div>

            <div className="overflow-x-auto">

              <table className="w-full min-w-[700px]">

                <thead>

                  <tr className="border-b border-gray-200 dark:border-white/10">

                    <th className="text-left p-4">
                      Aspect
                    </th>

                    <th className="text-left p-4">
                      Your Answer
                    </th>

                    <th className="text-left p-4">
                      Concise
                    </th>

                    <th className="text-left p-4">
                      Detailed
                    </th>

                    <th className="text-left p-4">
                      Alternative
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {[
                    [
                      "Detail Level",
                      "Medium",
                      "Low",
                      "High",
                      "Medium",
                    ],
                    [
                      "Complexity",
                      "Partial",
                      "Included",
                      "Detailed",
                      "Context-based",
                    ],
                    [
                      "Practical Focus",
                      "Medium",
                      "Low",
                      "Medium",
                      "High",
                    ],
                    [
                      "Interview Length",
                      "Medium",
                      "Short",
                      "Long",
                      "Medium",
                    ],
                    [
                      "Technical Depth",
                      "Good",
                      "Good",
                      "Excellent",
                      "Excellent",
                    ],
                  ].map((row, index) => (

                    <tr
                      key={index}
                      className="border-b border-gray-100 dark:border-white/5"
                    >

                      {row.map((cell, cellIndex) => (

                        <td
                          key={cellIndex}
                          className={`p-4 ${
                            cellIndex === 0
                              ? "font-semibold"
                              : "text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          {cell}
                        </td>

                      ))}

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>
        )}

        {/* Score Comparison */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <BarChart3
              className="text-violet-600"
            />

            <h2 className="text-2xl font-bold">
              Answer Quality Comparison
            </h2>

          </div>

          <div className="space-y-7">

            {comparisonData.map((answer, index) => (

              <div key={index}>

                <div className="flex justify-between items-center mb-2">

                  <span className="font-semibold">
                    {answer.title}
                  </span>

                  <span
                    className={`font-black ${getScoreColor(
                      answer.score
                    )}`}
                  >
                    {answer.score}%
                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-600 transition-all"
                    style={{
                      width: `${answer.score}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* What You Did Well */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-6">

              <CheckCircle2 className="text-green-600" />

              <h2 className="text-2xl font-bold">
                What You Did Well
              </h2>

            </div>

            <div className="space-y-4">

              {[
                "You correctly identified the main conceptual difference.",
                "You explained why arrays provide fast indexed access.",
                "You mentioned insertion and deletion trade-offs.",
                "Your response was technically relevant.",
                "Your answer was concise enough for an initial response.",
              ].map((item, index) => (

                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl bg-green-50 dark:bg-green-900/10 p-4"
                >

                  <CheckCircle2
                    size={20}
                    className="text-green-600 shrink-0 mt-0.5"
                  />

                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* What to Improve */}

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-6">

              <AlertTriangle className="text-orange-500" />

              <h2 className="text-2xl font-bold">
                What You Can Improve
              </h2>

            </div>

            <div className="space-y-4">

              {[
                "Add precise time complexities for common operations.",
                "Mention memory locality and cache performance.",
                "Explain the additional memory required by linked-list pointers.",
                "Adapt answer length based on the interviewer's follow-up questions.",
                "Use a practical example when appropriate.",
              ].map((item, index) => (

                <div
                  key={index}
                  className="flex items-start gap-3 rounded-xl bg-orange-50 dark:bg-orange-900/10 p-4"
                >

                  <AlertTriangle
                    size={20}
                    className="text-orange-500 shrink-0 mt-0.5"
                  />

                  <span className="text-gray-700 dark:text-gray-300">
                    {item}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Answer Strategy Guide */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-8 sm:p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Lightbulb size={30} />

            <h2 className="text-3xl font-bold">
              AI Answer Strategy Guide
            </h2>

          </div>

          <p className="text-white/90 leading-8">
            The best approach depends on the interview context. Start
            with a concise explanation, then expand into complexity,
            trade-offs, or practical examples when the interviewer asks
            for more detail.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Step 1
              </p>

              <h3 className="text-xl font-bold mt-2">
                Answer Directly
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Start with the core concept and avoid unnecessary
                explanations.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Step 2
              </p>

              <h3 className="text-xl font-bold mt-2">
                Add Evidence
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Include complexity, trade-offs, examples, or technical
                details when useful.
              </p>

            </div>

            <div className="rounded-2xl bg-white/10 p-6">

              <p className="text-white/70 text-sm">
                Step 3
              </p>

              <h3 className="text-xl font-bold mt-2">
                Adapt
              </h3>

              <p className="text-white/80 mt-3 leading-6">
                Expand or shorten your response based on interviewer
                follow-up questions.
              </p>

            </div>

          </div>

        </div>

        {/* Multiple Valid Strategies */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Multiple Valid Answer Strategies
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                title: "Concise",
                description:
                  "Use when the interviewer needs a quick conceptual answer.",
                icon: "⚡",
              },
              {
                title: "Detailed",
                description:
                  "Use when the interviewer wants deeper technical reasoning.",
                icon: "📚",
              },
              {
                title: "Technical",
                description:
                  "Use when complexity and implementation trade-offs matter.",
                icon: "💻",
              },
              {
                title: "Practical",
                description:
                  "Use real-world scenarios to demonstrate applied understanding.",
                icon: "🚀",
              },
            ].map((strategy, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="text-4xl">
                  {strategy.icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {strategy.title}
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  {strategy.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Missing Points Summary */}

        <div className="mt-10 bg-orange-50 dark:bg-orange-900/10 border border-orange-200 dark:border-orange-900/30 rounded-3xl p-8">

          <div className="flex items-start gap-4">

            <div className="w-12 h-12 rounded-xl bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center shrink-0">

              <AlertTriangle className="text-orange-500" />

            </div>

            <div>

              <h2 className="text-2xl font-bold">
                Key Points to Add
              </h2>

              <p className="text-gray-600 dark:text-gray-300 mt-3 leading-7">
                Your response is fundamentally correct. The biggest
                opportunity is to add precise complexity analysis,
                memory trade-offs, and a practical explanation when the
                interviewer asks for more depth.
              </p>

              <div className="flex flex-wrap gap-3 mt-5">

                {[
                  "Time Complexity",
                  "Space Complexity",
                  "Memory Locality",
                  "Pointer Overhead",
                  "Practical Example",
                ].map((point) => (

                  <span
                    key={point}
                    className="px-4 py-2 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400 font-semibold"
                  >
                    {point}
                  </span>

                ))}

              </div>

            </div>

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
                Core Understanding
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                You understand the main concepts and can communicate
                the fundamental differences clearly.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Biggest Opportunity
              </p>

              <h3 className="text-xl font-bold mt-2">
                Technical Depth
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Add complexity, memory trade-offs, and implementation
                details when appropriate.
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-sm text-gray-500">
                Next Practice Goal
              </p>

              <h3 className="text-xl font-bold mt-2">
                Flexible Answers
              </h3>

              <p className="text-gray-500 mt-3 leading-6">
                Practice answering the same question in concise,
                detailed, and practical formats.
              </p>

            </div>

          </div>

        </div>

        {/* Comparison Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <h2 className="text-2xl font-bold mb-8">
            Answer Comparison Checklist
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                icon: "🎯",
                title: "Direct Answer",
                description:
                  "Did you directly answer what the interviewer asked?",
              },
              {
                icon: "🧠",
                title: "Reasoning",
                description:
                  "Did you explain why your approach works?",
              },
              {
                icon: "📊",
                title: "Trade-offs",
                description:
                  "Did you discuss important advantages and limitations?",
              },
              {
                icon: "🔄",
                title: "Adaptability",
                description:
                  "Can you provide more or less detail when asked?",
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

        {/* Overall Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-6 sm:p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Answer Comparison Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7 max-w-2xl">
                Your answer demonstrates good foundational understanding.
                Comparing it with multiple approaches shows clear
                opportunities to improve technical depth while keeping
                the response concise and adaptable.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                78%
              </p>

              <p className="text-gray-500 mt-2">
                Good Foundation
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
              style={{
                width: "78%",
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
                Strong interview candidates do not memorize one perfect
                answer. They understand the concept well enough to explain
                it at different levels of depth. Practice switching
                between concise, detailed, technical, and practical
                approaches so you can adapt naturally to the interviewer.
              </p>

            </div>

            <div className="text-center shrink-0">

              <div className="text-6xl">
                🔄
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Flexible Thinking
              </h3>

              <p className="text-5xl font-black">
                +18%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewAnswerComparisonMode;