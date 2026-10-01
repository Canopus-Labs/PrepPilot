import React, { useState } from "react";
import {
  Brain,
  LayoutList,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  MessageSquareText,
  TrendingUp,
  Clock3,
} from "lucide-react";

const AIInterviewAnswerStructureAnalyzer = () => {
  const [stats] = useState({
    structureScore: 86,
    sectionsCovered: 6,
    sectionsExpected: 7,
    organizationScore: 89,
  });

  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const questions = [
    {
      title: "Explain how a Hash Map works.",
      category: "Data Structures",
      score: 86,
    },
    {
      title: "Explain the difference between TCP and UDP.",
      category: "Computer Networks",
      score: 79,
    },
    {
      title: "Explain the SOLID principles.",
      category: "Software Engineering",
      score: 91,
    },
  ];

  const structureSections = [
    {
      title: "Introduction",
      score: 90,
      status: "Strong",
      description:
        "Clearly introduces the concept and establishes what the answer will explain.",
    },
    {
      title: "Problem Understanding",
      score: 92,
      status: "Strong",
      description:
        "Demonstrates a clear understanding of the question and its main requirements.",
    },
    {
      title: "Approach",
      score: 88,
      status: "Strong",
      description:
        "Presents the main approach in a logical sequence.",
    },
    {
      title: "Explanation",
      score: 84,
      status: "Good",
      description:
        "Explains the core concept clearly but could include a little more detail.",
    },
    {
      title: "Example",
      score: 72,
      status: "Needs Improvement",
      description:
        "The answer would benefit from a short practical example.",
    },
    {
      title: "Complexity",
      score: 91,
      status: "Strong",
      description:
        "Clearly communicates the expected time and space complexity.",
    },
    {
      title: "Conclusion",
      score: 76,
      status: "Good",
      description:
        "The answer ends correctly but could summarize the key point more explicitly.",
    },
  ];

  const getStatusClasses = (status) => {
    if (status === "Strong") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    if (status === "Good") {
      return "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400";
    }

    return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
            <LayoutList
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Answer Structure Analyzer
            </h1>

            <p className="text-gray-500 mt-2">
              Analyze how logically your interview response is organized
              and learn how to make your explanations clearer and easier
              to follow.
            </p>

          </div>

        </div>

        {/* Dashboard Metrics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Structure Score
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.structureScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Sections Covered
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.sectionsCovered}/{stats.sectionsExpected}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Organization
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.organizationScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Sections to Improve
            </h3>

            <p className="text-5xl font-black mt-3">
              2
            </p>

          </div>

        </div>

        {/* AI Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-3xl font-bold">
              AI Answer Structure Analysis
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            The AI evaluates your response from introduction through
            conclusion. It checks whether your ideas appear in a logical
            order and identifies sections that could be added or improved
            to make your answer easier for an interviewer to follow.
          </p>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquareText className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Select Interview Question
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {questions.map((question, index) => (

              <button
                key={index}
                onClick={() => setSelectedQuestion(index)}
                className={`text-left rounded-2xl border p-6 transition ${
                  selectedQuestion === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <h3 className="font-bold text-lg">
                  {question.title}
                </h3>

                <p className="text-gray-500 mt-3">
                  {question.category}
                </p>

                <div className="flex justify-between items-center mt-5">

                  <span className="text-gray-500">
                    Structure Score
                  </span>

                  <span className="font-bold text-violet-600">
                    {question.score}%
                  </span>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Interview Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <p className="text-sm text-gray-500">
            Interview Question
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {questions[selectedQuestion].title}
          </h2>

          <span className="inline-block mt-5 px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
            {questions[selectedQuestion].category}
          </span>

        </div>

        {/* User Answer */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-6">

            <MessageSquareText className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Your Interview Answer
            </h2>

          </div>

          <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

            <p className="leading-8">
              A Hash Map is a data structure that stores information in
              key-value pairs. It uses a hash function to determine where
              a key should be placed. When we want to find a value, the
              hash function helps us locate the corresponding entry
              efficiently. The average time complexity for lookup,
              insertion, and deletion is O(1), although collisions can
              affect performance.
            </p>

          </div>

          <div className="grid md:grid-cols-4 gap-6 mt-8">

            <div className="rounded-xl border border-gray-200 dark:border-white/10 p-5">

              <p className="text-gray-500">
                Answer Length
              </p>

              <p className="font-bold text-lg mt-2">
                67 words
              </p>

            </div>

            <div className="rounded-xl border border-gray-200 dark:border-white/10 p-5">

              <p className="text-gray-500">
                Sections Detected
              </p>

              <p className="font-bold text-lg mt-2">
                6 / 7
              </p>

            </div>

            <div className="rounded-xl border border-gray-200 dark:border-white/10 p-5">

              <p className="text-gray-500">
                Structure Score
              </p>

              <p className="font-bold text-lg mt-2">
                {stats.structureScore}%
              </p>

            </div>

            <div className="rounded-xl border border-gray-200 dark:border-white/10 p-5">

              <p className="text-gray-500">
                Estimated Duration
              </p>

              <p className="font-bold text-lg mt-2">
                42 sec
              </p>

            </div>

          </div>

        </div>

        {/* Expected Answer Structure */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Recommended Answer Structure
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              ["1", "Introduction", "Introduce the main concept."],
              ["2", "Problem Understanding", "Show that you understand the question."],
              ["3", "Approach", "Explain your proposed solution."],
              ["4", "Explanation", "Describe how the solution works."],
              ["5", "Example", "Give a small practical example."],
              ["6", "Complexity", "Explain time and space complexity."],
              ["7", "Conclusion", "Summarize the key takeaway."],
            ].map(([number, title, description], index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <div className="w-9 h-9 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-600 flex items-center justify-center font-bold">
                  {number}
                </div>

                <h3 className="font-bold mt-4">
                  {title}
                </h3>

                <p className="text-gray-500 text-sm mt-2 leading-6">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Structure Breakdown */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <LayoutList className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Section-by-Section Analysis
            </h2>

          </div>

          <div className="space-y-5">

            {structureSections.map((section, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>

                    <h3 className="font-bold text-lg">
                      {section.title}
                    </h3>

                    <p className="text-gray-500 mt-2 leading-6">
                      {section.description}
                    </p>

                  </div>

                  <div className="flex items-center gap-4">

                    <span
                      className={`px-4 py-2 rounded-full ${getStatusClasses(
                        section.status
                      )}`}
                    >
                      {section.status}
                    </span>

                    <span className="text-xl font-black">
                      {section.score}%
                    </span>

                  </div>

                </div>

                <div className="mt-5 w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{
                      width: `${section.score}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Timing Analysis */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Clock3 className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Answer Flow Analysis
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-gray-500">
                Introduction
              </p>

              <p className="text-3xl font-black mt-3">
                5 sec
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Good opening duration
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-gray-500">
                Main Explanation
              </p>

              <p className="text-3xl font-black mt-3">
                29 sec
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Appropriate detail level
              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <p className="text-gray-500">
                Conclusion
              </p>

              <p className="text-3xl font-black mt-3">
                8 sec
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Could be slightly stronger
              </p>

            </div>

          </div>

        </div>
                {/* Missing Structure Elements */}

        <div className="mt-10 bg-orange-50 dark:bg-orange-900/10 rounded-3xl border border-orange-200 dark:border-orange-900/30 p-8">

          <div className="flex items-center gap-3 mb-6">

            <AlertTriangle className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Missing or Weak Structure Elements
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="rounded-2xl bg-white dark:bg-[#111827] p-6">

              <h3 className="font-bold text-lg">
                Example
              </h3>

              <p className="text-gray-500 mt-3 leading-7">
                Your answer explains the concept correctly but does not
                include a concrete example. Adding a small input and
                explaining what happens would make the answer easier to
                understand.
              </p>

              <span className="inline-block mt-4 px-4 py-2 rounded-full bg-orange-100 text-orange-700">
                Needs Improvement
              </span>

            </div>

            <div className="rounded-2xl bg-white dark:bg-[#111827] p-6">

              <h3 className="font-bold text-lg">
                Conclusion
              </h3>

              <p className="text-gray-500 mt-3 leading-7">
                Your response ends after the complexity discussion.
                Add a short final statement summarizing why the selected
                approach is appropriate.
              </p>

              <span className="inline-block mt-4 px-4 py-2 rounded-full bg-blue-100 text-blue-700">
                Could Improve
              </span>

            </div>

          </div>

        </div>

        {/* AI Organization Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Lightbulb size={30} />

            <h2 className="text-3xl font-bold">
              AI Organization Recommendations
            </h2>

          </div>

          <div className="space-y-5">

            {[
              "Start with a one-sentence definition before explaining implementation details.",
              "Explicitly state what the problem requires before presenting your solution.",
              "Explain the approach in a step-by-step sequence instead of mixing concepts.",
              "Add a small example to demonstrate how the solution works.",
              "Mention time and space complexity after explaining the main approach.",
              "Finish with a concise conclusion that reinforces the key idea.",
            ].map((recommendation, index) => (

              <div
                key={index}
                className="rounded-xl bg-white/10 p-5"
              >

                <span className="font-semibold">
                  💡 {recommendation}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Structure Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Answer Structure Analytics
          </h2>

          {[
            ["Logical Flow", 91],
            ["Section Completeness", 86],
            ["Explanation Order", 89],
            ["Transition Quality", 82],
            ["Example Integration", 72],
            ["Complexity Placement", 94],
            ["Conclusion Quality", 76],
          ].map(([label, value], index) => (

            <div key={index} className="mb-7">

              <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{
                    width: `${value}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Before vs Recommended Structure */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Current vs Recommended Structure
            </h2>

          </div>

          <div className="grid lg:grid-cols-2 gap-8">

            <div className="rounded-2xl border border-orange-200 dark:border-orange-900/30 p-7">

              <h3 className="text-xl font-bold">
                Current Answer
              </h3>

              <div className="space-y-4 mt-6">

                {[
                  "Introduction",
                  "Problem Understanding",
                  "Approach",
                  "Explanation",
                  "Complexity",
                  "Conclusion",
                ].map((item, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >

                    <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                      {index + 1}
                    </span>

                    <span>
                      {item}
                    </span>

                  </div>

                ))}

              </div>

              <div className="mt-6 px-4 py-3 rounded-xl bg-orange-50 dark:bg-orange-900/10 text-orange-700">
                Missing practical example
              </div>

            </div>

            <div className="rounded-2xl border border-green-200 dark:border-green-900/30 p-7">

              <h3 className="text-xl font-bold">
                Recommended Answer
              </h3>

              <div className="space-y-4 mt-6">

                {[
                  "Introduction",
                  "Problem Understanding",
                  "Approach",
                  "Explanation",
                  "Example",
                  "Complexity",
                  "Conclusion",
                ].map((item, index) => (

                  <div
                    key={index}
                    className="flex items-center gap-3"
                  >

                    <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                      {index + 1}
                    </span>

                    <span>
                      {item}
                    </span>

                  </div>

                ))}

              </div>

              <div className="mt-6 px-4 py-3 rounded-xl bg-green-50 dark:bg-green-900/10 text-green-700">
                Complete interview-ready structure
              </div>

            </div>

          </div>

        </div>

        {/* Communication Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Interview Communication Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7">
                Your answer has a strong logical flow and communicates
                the technical concept effectively. Adding an example and
                strengthening the conclusion would make the response
                more polished and easier to follow.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                88%
              </p>

              <p className="text-gray-500 mt-2">
                Strong Communication
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
              style={{
                width: "88%",
              }}
            />

          </div>

        </div>

        {/* Interview Answer Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Interview Answer Structure Checklist
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              [
                "👋",
                "Introduce",
                "Start with a clear definition or overview.",
              ],
              [
                "🎯",
                "Understand",
                "Clarify what the problem is asking.",
              ],
              [
                "🧠",
                "Approach",
                "Explain your solution step by step.",
              ],
              [
                "💬",
                "Explain",
                "Describe why your approach works.",
              ],
              [
                "🧪",
                "Example",
                "Demonstrate the idea with a simple example.",
              ],
              [
                "📊",
                "Complexity",
                "State time and space complexity.",
              ],
              [
                "✅",
                "Conclude",
                "Summarize the key takeaway.",
              ],
              [
                "⏱️",
                "Manage Time",
                "Keep the explanation focused and concise.",
              ],
            ].map(([icon, title, description], index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="text-4xl">
                  {icon}
                </div>

                <h3 className="font-bold text-lg mt-4">
                  {title}
                </h3>

                <p className="text-gray-500 mt-2 leading-6">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Practice Template */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Recommended Practice Template
          </h2>

          <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-7">

            <div className="space-y-6">

              <div>

                <p className="text-sm text-gray-500">
                  1. Introduction
                </p>

                <p className="font-semibold mt-1">
                  "A Hash Map is a data structure that stores key-value
                  pairs and provides efficient average-case lookup."
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  2. Problem Understanding
                </p>

                <p className="font-semibold mt-1">
                  "The key requirement is to store and retrieve values
                  efficiently using their associated keys."
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  3. Approach
                </p>

                <p className="font-semibold mt-1">
                  "A hash function maps each key to a bucket where the
                  corresponding value can be stored."
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  4. Example
                </p>

                <p className="font-semibold mt-1">
                  "For example, storing the key 'id' with value 101 allows
                  the value to be retrieved using the same key."
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  5. Complexity
                </p>

                <p className="font-semibold mt-1">
                  "Average lookup, insertion, and deletion are O(1)."
                </p>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  6. Conclusion
                </p>

                <p className="font-semibold mt-1">
                  "Therefore, Hash Maps are useful when fast key-based
                  access is required."
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* Final Readiness */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-10 text-white">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">
                Technical Interview Readiness
              </h2>

              <p className="leading-8 text-white/90">
                Your answer structure is strong. Focus on adding a
                practical example and a concise conclusion to make your
                response more complete and interviewer-friendly.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black">
                88%
              </p>

              <p className="text-white/70 mt-2">
                Ready

              </p>

            </div>

          </div>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">
                Structure Your Thinking 🚀
              </h2>

              <p className="leading-8 text-white/90">
                A great interview answer is not only about knowing the
                correct information. Organizing your thoughts into a
                clear sequence helps the interviewer understand your
                reasoning and demonstrates professional communication.
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                🧠
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Structure Score
              </h3>

              <p className="text-5xl font-black">
                {stats.structureScore}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewAnswerStructureAnalyzer;