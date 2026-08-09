import React, { useState } from "react";
import {
  Brain,
  Bug,
  CheckCircle2,
  AlertTriangle,
  Code2,
  FlaskConical,
  Target,
  Zap,
  RefreshCw,
} from "lucide-react";

const AIInterviewQuestionEdgeCaseGenerator = () => {
  const [stats] = useState({
    coverageScore: 89,
    generatedCases: 14,
    passedCases: 11,
    riskCases: 3,
  });

  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const questions = [
    {
      title: "Two Sum",
      difficulty: "Easy",
      coverage: 94,
    },
    {
      title: "Merge Intervals",
      difficulty: "Medium",
      coverage: 87,
    },
    {
      title: "LRU Cache",
      difficulty: "Hard",
      coverage: 82,
    },
  ];

  const edgeCases = [
    {
      category: "Empty Input",
      input: "[]",
      description: "Tests how the solution handles an empty array.",
      status: "Passed",
    },
    {
      category: "Single Element",
      input: "[5]",
      description: "Tests input containing only one element.",
      status: "Passed",
    },
    {
      category: "Duplicate Values",
      input: "[2, 2, 3, 4]",
      description: "Checks whether duplicate values are handled correctly.",
      status: "Passed",
    },
    {
      category: "Negative Values",
      input: "[-5, -2, 0, 4]",
      description: "Tests behavior with negative and zero values.",
      status: "Review",
    },
    {
      category: "Large Input",
      input: "[1...100000]",
      description: "Evaluates performance on a very large input.",
      status: "Passed",
    },
    {
      category: "Boundary Values",
      input: "[−2³¹, 2³¹−1]",
      description: "Tests values near integer boundaries.",
      status: "Review",
    },
  ];

  const getStatusClasses = (status) => {
    if (status === "Passed") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
            <FlaskConical
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Question Edge Case Generator
            </h1>

            <p className="text-gray-500 mt-2">
              Generate intelligent edge cases and test your interview
              solutions against difficult and unexpected inputs.
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
              Edge Case Coverage
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.coverageScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Zap
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Generated Cases
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.generatedCases}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Passed Cases
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.passedCases}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Bug
              className="mx-auto text-red-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Risk Cases
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.riskCases}
            </p>

          </div>

        </div>

        {/* Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">
            AI Edge Case Analysis
          </h2>

          <p className="leading-8 text-white/90">
            The AI analyzes your interview problem and generates unusual,
            boundary, and high-risk inputs that may expose hidden bugs.
            Test your solution against these cases before submitting it.
          </p>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Code2 className="text-violet-600" />

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

                <div className="flex justify-between items-center mt-5">

                  <span className="text-gray-500">
                    {question.difficulty}
                  </span>

                  <span className="font-bold text-violet-600">
                    {question.coverage}%
                  </span>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Selected Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <p className="text-sm text-gray-500">
            Selected Question
          </p>

          <h2 className="text-2xl font-bold mt-2">
            {questions[selectedQuestion].title}
          </h2>

          <div className="flex flex-wrap gap-4 mt-6">

            <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
              {questions[selectedQuestion].difficulty}
            </span>

            <span className="px-4 py-2 rounded-full bg-green-100 text-green-700">
              Coverage: {questions[selectedQuestion].coverage}%
            </span>

          </div>

        </div>

        {/* Edge Case Categories */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Generated Edge Case Categories
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[
              ["Empty Input", "[]", "Zero-element input"],
              ["Single Element", "[5]", "One-element input"],
              ["Duplicates", "[2,2,3]", "Repeated values"],
              ["Large Input", "[1...100000]", "Performance stress"],
              ["Boundary Values", "MIN / MAX", "Extreme values"],
              ["Negative Values", "[-5,-2,0]", "Negative numbers"],
              ["Sorted Input", "[1,2,3,4]", "Already sorted"],
              ["Reversed Input", "[4,3,2,1]", "Reverse ordering"],
            ].map(([title, example, description], index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <h3 className="font-bold">
                  {title}
                </h3>

                <code className="block mt-3 text-violet-600">
                  {example}
                </code>

                <p className="text-gray-500 mt-3 text-sm">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Generated Edge Cases */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

            <div className="flex items-center gap-3">

              <FlaskConical className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                AI Generated Edge Cases
              </h2>

            </div>

            <button className="flex items-center gap-2 px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold">

              <RefreshCw size={18} />

              Generate More

            </button>

          </div>

          <div className="space-y-5">

            {edgeCases.map((edgeCase, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>

                    <h3 className="font-bold text-lg">
                      {edgeCase.category}
                    </h3>

                    <code className="inline-block mt-2 px-3 py-1 rounded-lg bg-gray-100 dark:bg-gray-800 text-violet-600">
                      {edgeCase.input}
                    </code>

                    <p className="text-gray-500 mt-3">
                      {edgeCase.description}
                    </p>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full w-fit ${getStatusClasses(
                      edgeCase.status
                    )}`}
                  >
                    {edgeCase.status}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>
                {/* Edge Case Details */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Bug className="text-red-500" />

            <h2 className="text-2xl font-bold">
              Edge Case Risk Analysis
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              {
                title: "Negative Values",
                risk: "Medium",
                description:
                  "Your current solution may need additional validation when negative values are present.",
              },
              {
                title: "Boundary Values",
                risk: "High",
                description:
                  "Extreme integer values may expose overflow or comparison issues.",
              },
              {
                title: "Duplicate Values",
                risk: "Low",
                description:
                  "The current implementation appears to handle repeated values correctly.",
              },
              {
                title: "Large Input",
                risk: "Low",
                description:
                  "The current approach has acceptable complexity for large inputs.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex justify-between items-center gap-4">

                  <h3 className="font-bold text-lg">
                    {item.title}
                  </h3>

                  <span
                    className={`px-4 py-2 rounded-full text-sm ${
                      item.risk === "High"
                        ? "bg-red-100 text-red-700"
                        : item.risk === "Medium"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {item.risk} Risk
                  </span>

                </div>

                <p className="text-gray-500 mt-4 leading-7">
                  {item.description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Test Runner */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

            <div className="flex items-center gap-3">

              <Zap className="text-green-600" />

              <h2 className="text-2xl font-bold">
                Edge Case Test Runner
              </h2>

            </div>

            <button
              onClick={() => {}}
              className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold"
            >
              Run All Tests
            </button>

          </div>

          <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>

                <p className="text-gray-500">
                  Test Suite
                </p>

                <h3 className="text-xl font-bold mt-2">
                  AI Generated Edge Cases
                </h3>

              </div>

              <div className="text-center">

                <p className="text-4xl font-black text-green-600">
                  11 / 14
                </p>

                <p className="text-gray-500 mt-1">
                  Cases Passed
                </p>

              </div>

            </div>

          </div>

          <div className="mt-6 space-y-4">

            {[
              ["Empty Input", "Passed"],
              ["Single Element", "Passed"],
              ["Duplicate Values", "Passed"],
              ["Negative Values", "Needs Review"],
              ["Large Input", "Passed"],
              ["Boundary Values", "Needs Review"],
            ].map(([test, status], index) => (

              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                <div className="flex items-center gap-3">

                  {status === "Passed" ? (
                    <CheckCircle2
                      size={22}
                      className="text-green-600"
                    />
                  ) : (
                    <AlertTriangle
                      size={22}
                      className="text-orange-500"
                    />
                  )}

                  <span className="font-semibold">
                    {test}
                  </span>

                </div>

                <span
                  className={`px-4 py-2 rounded-full w-fit ${getStatusClasses(
                    status
                  )}`}
                >
                  {status}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Potential Bugs */}

        <div className="mt-10 bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-200 dark:border-red-900/30 p-8">

          <div className="flex items-center gap-3 mb-6">

            <Bug className="text-red-500" />

            <h2 className="text-2xl font-bold">
              Potential Bugs Detected
            </h2>

          </div>

          <div className="space-y-5">

            {[
              "Boundary integer values may require explicit validation.",
              "Negative input handling should be tested before submission.",
              "Confirm behavior when no valid result exists.",
            ].map((bug, index) => (

              <div
                key={index}
                className="rounded-xl bg-white dark:bg-[#111827] p-5"
              >

                <span className="font-semibold">
                  ⚠️ {bug}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* AI Debugging Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">
            AI Debugging Recommendations
          </h2>

          <div className="space-y-5">

            {[
              "Test the solution with the smallest valid input.",
              "Test values at both lower and upper boundaries.",
              "Include duplicate values even when the normal example does not contain them.",
              "Test negative values when the problem allows signed integers.",
              "Run a large input to verify that the algorithm remains efficient.",
              "Check what your solution returns when no valid answer exists.",
            ].map((recommendation, index) => (

              <div
                key={index}
                className="rounded-xl bg-white/10 p-5"
              >

                💡 {recommendation}

              </div>

            ))}

          </div>

        </div>

        {/* Edge Case Coverage Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Edge Case Coverage Analytics
          </h2>

          {[
            ["Empty Input", 100],
            ["Single Element", 100],
            ["Duplicate Values", 95],
            ["Negative Values", 72],
            ["Large Input", 91],
            ["Boundary Values", 64],
            ["Sorted / Reversed Input", 88],
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

        {/* Robustness Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Solution Robustness Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7">
                Your solution handles most generated cases successfully.
                Strengthen boundary-value and negative-value testing
                before submitting the final answer.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {stats.coverageScore}%
              </p>

              <p className="text-gray-500 mt-2">
                Robustness
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
              style={{
                width: `${stats.coverageScore}%`,
              }}
            />

          </div>

        </div>

        {/* Practice Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Edge Case Testing Checklist
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              ["🕳️", "Empty Input", "Check zero-element input."],
              ["1️⃣", "Single Element", "Check the smallest input."],
              ["🔁", "Duplicates", "Test repeated values."],
              ["📈", "Large Input", "Stress test performance."],
              ["🚧", "Boundaries", "Test minimum and maximum values."],
              ["➖", "Negative Values", "Test signed inputs."],
              ["↕️", "Sorted Input", "Test already sorted data."],
              ["🔃", "Reversed Input", "Test reverse ordering."],
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

                <p className="text-gray-500 mt-2">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">
                Think Beyond the Happy Path 🚀
              </h2>

              <p className="leading-8 text-white/90">
                Strong coding solutions are designed for more than the
                example input. Testing unusual, boundary, and unexpected
                cases helps you discover hidden bugs and build solutions
                that are ready for real technical interviews.
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                🧪
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Coverage
              </h3>

              <p className="text-5xl font-black">
                {stats.coverageScore}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionEdgeCaseGenerator;