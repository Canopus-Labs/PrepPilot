import React, { useState } from "react";
import {
  Brain,
  KeyRound,
  Target,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  MessageSquareText,
  TrendingUp,
} from "lucide-react";

const AIInterviewAnswerKeywordAnalyzer = () => {
  const [stats] = useState({
    coverage: 84,
    detectedKeywords: 12,
    matchedKeywords: 9,
    missingKeywords: 3,
  });

  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const questions = [
    {
      title: "Explain how a Hash Map works.",
      category: "Data Structures",
      coverage: 84,
    },
    {
      title: "What is the difference between TCP and UDP?",
      category: "Computer Networks",
      coverage: 76,
    },
    {
      title: "Explain the SOLID principles.",
      category: "Software Engineering",
      coverage: 91,
    },
  ];

  const keywords = [
    {
      keyword: "Hash Function",
      importance: "High",
      status: "Matched",
      score: 100,
    },
    {
      keyword: "Key-Value Pair",
      importance: "High",
      status: "Matched",
      score: 100,
    },
    {
      keyword: "Collision",
      importance: "High",
      status: "Matched",
      score: 90,
    },
    {
      keyword: "Buckets",
      importance: "Medium",
      status: "Missing",
      score: 0,
    },
    {
      keyword: "Load Factor",
      importance: "Medium",
      status: "Missing",
      score: 0,
    },
    {
      keyword: "Average O(1) Lookup",
      importance: "High",
      status: "Matched",
      score: 95,
    },
  ];

  const getStatusClasses = (status) => {
    if (status === "Matched") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
            <KeyRound
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Answer Keyword Analyzer
            </h1>

            <p className="text-gray-500 mt-2">
              Analyze important keywords in your interview answers and
              discover concepts or terminology you may be missing.
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
              Keyword Coverage
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.coverage}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <KeyRound
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Detected Keywords
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.detectedKeywords}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Matched Keywords
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.matchedKeywords}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Missing Concepts
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.missingKeywords}
            </p>

          </div>

        </div>

        {/* AI Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">
            AI Keyword Analysis
          </h2>

          <p className="leading-8 text-white/90">
            The AI extracts important concepts from the interview
            question and compares them against your response. It
            identifies matched terminology, missing concepts, and
            keywords that could make your answer more complete.
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
                    Coverage
                  </span>

                  <span className="font-bold text-violet-600">
                    {question.coverage}%
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
              A Hash Map stores data using key-value pairs. It uses a
              hash function to determine where a key should be stored.
              When we need to find a value, the hash function helps us
              locate the corresponding entry quickly. In the average
              case, insertion, deletion, and lookup can be performed
              in constant time.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="rounded-xl border border-gray-200 dark:border-white/10 p-5">

              <p className="text-gray-500">
                Answer Length
              </p>

              <p className="font-bold text-lg mt-2">
                58 words
              </p>

            </div>

            <div className="rounded-xl border border-gray-200 dark:border-white/10 p-5">

              <p className="text-gray-500">
                Keywords Found
              </p>

              <p className="font-bold text-lg mt-2">
                9 / 12
              </p>

            </div>

            <div className="rounded-xl border border-gray-200 dark:border-white/10 p-5">

              <p className="text-gray-500">
                Coverage
              </p>

              <p className="font-bold text-lg mt-2">
                {stats.coverage}%
              </p>

            </div>

          </div>

        </div>

        {/* Extracted Keywords */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <KeyRound className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Important Keywords
            </h2>

          </div>

          <div className="space-y-5">

            {keywords.map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>

                    <h3 className="font-bold text-lg">
                      {item.keyword}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      Importance: {item.importance}
                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <span
                      className={`px-4 py-2 rounded-full ${getStatusClasses(
                        item.status
                      )}`}
                    >
                      {item.status}
                    </span>

                    <span className="font-bold">
                      {item.score}%
                    </span>

                  </div>

                </div>

                <div className="mt-5 w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className={`h-full ${
                      item.status === "Matched"
                        ? "bg-gradient-to-r from-green-500 to-emerald-500"
                        : "bg-gradient-to-r from-orange-500 to-red-500"
                    }`}
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Keyword Match Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Keyword Match Summary
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-green-200 dark:border-green-900/30 p-6">

              <CheckCircle2
                className="text-green-600"
                size={30}
              />

              <p className="text-gray-500 mt-4">
                Strongly Covered
              </p>

              <p className="text-4xl font-black mt-2">
                6
              </p>

            </div>

            <div className="rounded-2xl border border-orange-200 dark:border-orange-900/30 p-6">

              <AlertTriangle
                className="text-orange-500"
                size={30}
              />

              <p className="text-gray-500 mt-4">
                Partially Covered
              </p>

              <p className="text-4xl font-black mt-2">
                3
              </p>

            </div>

            <div className="rounded-2xl border border-red-200 dark:border-red-900/30 p-6">

              <KeyRound
                className="text-red-500"
                size={30}
              />

              <p className="text-gray-500 mt-4">
                Missing
              </p>

              <p className="text-4xl font-black mt-2">
                3
              </p>

            </div>

          </div>

        </div>
                {/* Missing Keywords */}

        <div className="mt-10 bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-200 dark:border-red-900/30 p-8">

          <div className="flex items-center gap-3 mb-6">

            <AlertTriangle className="text-red-500" />

            <h2 className="text-2xl font-bold">
              Missing Important Keywords
            </h2>

          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-7">
            These concepts are relevant to the question but were not
            clearly mentioned in your answer.
          </p>

          <div className="grid md:grid-cols-3 gap-5 mt-6">

            {[
              "Buckets",
              "Load Factor",
              "Collision Resolution",
            ].map((keyword, index) => (

              <div
                key={index}
                className="rounded-xl bg-white dark:bg-[#111827] p-5 border border-red-200 dark:border-red-900/30"
              >

                <div className="flex items-center gap-3">

                  <KeyRound
                    size={20}
                    className="text-red-500"
                  />

                  <span className="font-semibold">
                    {keyword}
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-3">
                  Important for demonstrating deeper understanding of
                  Hash Map implementation.
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Suggested Terminology */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-yellow-500" />

            <h2 className="text-2xl font-bold">
              Suggested Technical Terminology
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              {
                term: "Collision Resolution",
                reason:
                  "Explains how the Hash Map handles multiple keys mapping to the same location.",
              },
              {
                term: "Load Factor",
                reason:
                  "Describes how full the hash table is and when resizing may occur.",
              },
              {
                term: "Buckets",
                reason:
                  "Refers to the storage locations used to organize hashed entries.",
              },
              {
                term: "Hash Function",
                reason:
                  "Explains how keys are converted into positions in the table.",
              },
              {
                term: "Amortized Complexity",
                reason:
                  "Useful when discussing resizing and average performance.",
              },
              {
                term: "Constant-Time Lookup",
                reason:
                  "Clearly communicates the average lookup performance.",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <h3 className="font-bold text-lg">
                  {item.term}
                </h3>

                <p className="text-gray-500 mt-3 leading-6">
                  {item.reason}
                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Why Keywords Matter */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">
            Why These Keywords Matter
          </h2>

          <div className="space-y-5">

            {[
              "Technical keywords demonstrate that you understand the underlying concept rather than memorizing a surface-level answer.",
              "Role-specific terminology helps interviewers quickly identify relevant technical knowledge.",
              "Mentioning complexity terminology shows that you understand the performance characteristics of your solution.",
              "Important implementation terms make your explanation more precise and easier to evaluate.",
              "Using the right terminology can make an otherwise correct answer more complete and interview-ready.",
            ].map((reason, index) => (

              <div
                key={index}
                className="rounded-xl bg-white/10 p-5"
              >

                <span className="font-semibold">
                  💡 {reason}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Keyword Coverage Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Keyword Coverage Analytics
          </h2>

          {[
            ["Core Technical Concepts", 94],
            ["Implementation Terminology", 78],
            ["Complexity Terminology", 92],
            ["Role-Specific Keywords", 81],
            ["Edge-Case Terminology", 65],
            ["Overall Keyword Coverage", stats.coverage],
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

        {/* AI Answer Recommendations */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            AI Answer Improvement Recommendations
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Mention how collisions are handled when multiple keys produce the same hash location.",
              "Use the term load factor when discussing when a hash table may need resizing.",
              "Explain the difference between average-case and worst-case lookup complexity.",
              "Mention buckets when describing the internal organization of the hash table.",
              "Connect technical terminology directly to the behavior of the data structure.",
              "Avoid adding technical terms that are unrelated to the question simply to increase keyword coverage.",
            ].map((recommendation, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                <span className="font-semibold">
                  🧠 {recommendation}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Keyword Quality Breakdown */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Answer Keyword Quality
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              ["Technical Accuracy", 93],
              ["Keyword Relevance", 91],
              ["Terminology Variety", 78],
              ["Concept Completeness", 81],
            ].map(([label, value], index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center"
              >

                <p className="text-gray-500">
                  {label}
                </p>

                <p className="text-4xl font-black mt-3">
                  {value}%
                </p>

                <div className="mt-5 w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    style={{
                      width: `${value}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Interview Communication Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Interview Communication Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7">
                Your answer communicates the main concept correctly.
                Adding a few important implementation terms would make
                the explanation more complete and demonstrate stronger
                technical depth.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                86%
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
                width: "86%",
              }}
            />

          </div>

        </div>

        {/* Improvement Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Keyword Improvement Checklist
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              ["🔑", "Identify", "Understand the key concepts expected by the interviewer."],
              ["🧠", "Explain", "Connect each important term to your reasoning."],
              ["📊", "Quantify", "Mention time and space complexity where relevant."],
              ["🎯", "Refine", "Remove unnecessary terminology and stay focused."],
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

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">
                Make Every Word Count 🚀
              </h2>

              <p className="leading-8 text-white/90">
                Strong interview answers are not about using as many
                technical terms as possible. They are about using the
                right terminology at the right time and connecting it
                clearly to your reasoning.
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                🔑
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Keyword Coverage
              </h3>

              <p className="text-5xl font-black">
                {stats.coverage}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewAnswerKeywordAnalyzer;