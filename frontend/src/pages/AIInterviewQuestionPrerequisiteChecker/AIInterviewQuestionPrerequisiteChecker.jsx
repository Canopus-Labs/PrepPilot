import React, { useState } from "react";
import {
  Brain,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Code2,
  Calculator,
  Monitor,
  Target,
  Clock3,
  ArrowRight,
} from "lucide-react";

const AIInterviewQuestionPrerequisiteChecker = () => {
  const [stats] = useState({
    readiness: 78,
    prerequisites: 12,
    completed: 9,
    missing: 3,
  });

  const [selectedQuestion, setSelectedQuestion] = useState(0);

  const questions = [
    {
      title: "Design an LRU Cache",
      difficulty: "Hard",
      readiness: 78,
    },
    {
      title: "Number of Islands",
      difficulty: "Medium",
      readiness: 92,
    },
    {
      title: "Longest Increasing Subsequence",
      difficulty: "Hard",
      readiness: 71,
    },
  ];

  const dsaConcepts = [
    {
      name: "Hash Maps",
      status: "Completed",
      score: 94,
    },
    {
      name: "Doubly Linked Lists",
      status: "Completed",
      score: 88,
    },
    {
      name: "Data Structure Design",
      status: "Needs Review",
      score: 68,
    },
    {
      name: "Time Complexity",
      status: "Completed",
      score: 91,
    },
  ];

  const programmingFundamentals = [
    {
      name: "Classes and Objects",
      status: "Completed",
      score: 90,
    },
    {
      name: "Pointers and References",
      status: "Needs Review",
      score: 72,
    },
    {
      name: "Memory Management",
      status: "Missing",
      score: 48,
    },
  ];

  const mathematicalConcepts = [
    {
      name: "Complexity Analysis",
      status: "Completed",
      score: 92,
    },
    {
      name: "Logarithmic Growth",
      status: "Completed",
      score: 86,
    },
    {
      name: "Basic Probability",
      status: "Not Required",
      score: 100,
    },
  ];

  const getStatusClasses = (status) => {
    if (status === "Completed") {
      return "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400";
    }

    if (status === "Missing") {
      return "bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400";
    }

    if (status === "Needs Review") {
      return "bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400";
    }

    return "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300";
  };

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">
            <Brain
              size={34}
              className="text-violet-600"
            />
          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Question Prerequisite Checker
            </h1>

            <p className="text-gray-500 mt-2">
              Discover the concepts you should understand before
              attempting difficult interview questions.
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
              Readiness
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.readiness}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BookOpen
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Prerequisites
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.prerequisites}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Completed
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.completed}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-red-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Missing
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.missing}
            </p>

          </div>

        </div>

        {/* Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">
            AI Prerequisite Analysis
          </h2>

          <p className="leading-8 text-white/90">
            Before you begin a difficult interview question, PrepPilot
            analyzes the problem and identifies the knowledge required
            to solve it effectively. Missing concepts are converted
            into a short personalized learning path.
          </p>

        </div>

        {/* Question Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

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
                    {question.readiness}%
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
              Readiness: {questions[selectedQuestion].readiness}%
            </span>

          </div>

        </div>

        {/* DSA Prerequisites */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Code2 className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Required DSA Concepts
            </h2>

          </div>

          <div className="space-y-5">

            {dsaConcepts.map((concept, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                  <div>

                    <h3 className="font-bold text-lg">
                      {concept.name}
                    </h3>

                    <p className="text-gray-500 mt-1">
                      Knowledge level: {concept.score}%
                    </p>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full w-fit ${getStatusClasses(
                      concept.status
                    )}`}
                  >
                    {concept.status}
                  </span>

                </div>

                <div className="mt-5 w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    style={{
                      width: `${concept.score}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Programming Fundamentals */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Programming Fundamentals
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {programmingFundamentals.map((concept, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <h3 className="font-bold">
                  {concept.name}
                </h3>

                <p className="text-gray-500 mt-3">
                  Knowledge: {concept.score}%
                </p>

                <div className="mt-5 w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                    style={{
                      width: `${concept.score}%`,
                    }}
                  />

                </div>

                <span
                  className={`inline-block mt-5 px-3 py-1 rounded-full text-sm ${getStatusClasses(
                    concept.status
                  )}`}
                >
                  {concept.status}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Mathematical Concepts */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Calculator className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Mathematical Concepts
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {mathematicalConcepts.map((concept, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <h3 className="font-bold">
                  {concept.name}
                </h3>

                <p className="text-gray-500 mt-3">
                  Knowledge: {concept.score}%
                </p>

                <div className="mt-5 w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
                    style={{
                      width: `${concept.score}%`,
                    }}
                  />

                </div>

                <span
                  className={`inline-block mt-5 px-3 py-1 rounded-full text-sm ${getStatusClasses(
                    concept.status
                  )}`}
                >
                  {concept.status}
                </span>

              </div>

            ))}

          </div>

        </div>
                {/* Core CS Concepts */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Monitor className="text-indigo-600" />

            <h2 className="text-2xl font-bold">
              Core CS Concepts
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              ["Data Structures", 91, "Completed"],
              ["Algorithms", 87, "Completed"],
              ["Operating Systems", 64, "Needs Review"],
              ["Computer Networks", 42, "Missing"],
            ].map(([name, score, status], index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <h3 className="font-bold">
                  {name}
                </h3>

                <p className="text-gray-500 mt-3">
                  Knowledge: {score}%
                </p>

                <div className="mt-5 w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-blue-500"
                    style={{
                      width: `${score}%`,
                    }}
                  />

                </div>

                <span
                  className={`inline-block mt-5 px-3 py-1 rounded-full text-sm ${getStatusClasses(
                    status
                  )}`}
                >
                  {status}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Missing Prerequisites */}

        <div className="mt-10 bg-red-50 dark:bg-red-900/10 rounded-3xl border border-red-200 dark:border-red-900/30 p-8">

          <div className="flex items-center gap-3 mb-6">

            <AlertTriangle className="text-red-500" />

            <h2 className="text-2xl font-bold">
              Missing Prerequisites
            </h2>

          </div>

          <p className="text-gray-600 dark:text-gray-300 leading-7">
            AI detected a few concepts that may make the selected
            question difficult to solve effectively.
          </p>

          <div className="grid md:grid-cols-3 gap-5 mt-6">

            {[
              "Memory Management",
              "Computer Networks",
              "Advanced Data Structure Design",
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-xl bg-white dark:bg-[#111827] p-5 border border-red-200 dark:border-red-900/30"
              >

                <span className="font-semibold">
                  ⚠️ {item}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Related Prerequisite Questions */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <BookOpen className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Related Prerequisite Questions
            </h2>

          </div>

          <div className="space-y-5">

            {[
              {
                question: "Implement a Hash Map from Scratch",
                difficulty: "Medium",
              },
              {
                question: "Implement a Doubly Linked List",
                difficulty: "Easy",
              },
              {
                question: "Explain Hash Map Collision Handling",
                difficulty: "Medium",
              },
              {
                question: "Analyze the Complexity of an LRU Cache",
                difficulty: "Medium",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
              >

                <div className="flex items-center gap-3">

                  <span className="w-9 h-9 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-600 flex items-center justify-center font-bold">
                    {index + 1}
                  </span>

                  <span className="font-semibold">
                    {item.question}
                  </span>

                </div>

                <span className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 w-fit">
                  {item.difficulty}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Personalized Learning Path */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">
            AI Personalized Learning Path
          </h2>

          <p className="text-white/90 leading-7">
            Complete the following concepts before attempting the
            selected question. AI has prioritized them according to
            your current knowledge level.
          </p>

          <div className="mt-8 space-y-5">

            {[
              ["1", "Review Data Structure Design", "15 min"],
              ["2", "Practice Memory Management", "20 min"],
              ["3", "Implement a Doubly Linked List", "25 min"],
              ["4", "Study LRU Cache Architecture", "20 min"],
            ].map(([number, title, duration], index) => (

              <div
                key={index}
                className="rounded-2xl bg-white/10 p-5 flex items-center gap-5"
              >

                <div className="w-10 h-10 rounded-full bg-white text-violet-600 flex items-center justify-center font-bold shrink-0">
                  {number}
                </div>

                <div className="flex-1">

                  <h3 className="font-bold">
                    {title}
                  </h3>

                  <p className="text-white/70 mt-1">
                    Estimated time: {duration}
                  </p>

                </div>

                <ArrowRight className="shrink-0" />

              </div>

            ))}

          </div>

        </div>

        {/* Readiness Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Prerequisite Readiness Score
              </h2>

              <p className="text-gray-500 mt-3 leading-7">
                Your current prerequisite knowledge is strong enough
                for partial understanding, but completing the missing
                concepts will improve your chances of solving the
                selected problem independently.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {stats.readiness}%
              </p>

              <p className="text-gray-500 mt-2">
                Ready to Attempt

              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
              style={{
                width: `${stats.readiness}%`,
              }}
            />

          </div>

        </div>

        {/* Estimated Learning Time */}

        <div className="mt-10 grid md:grid-cols-3 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7 text-center">

            <Clock3
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Estimated Learning
            </h3>

            <p className="text-4xl font-black mt-3">
              80 min
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7 text-center">

            <BookOpen
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Recommended Questions
            </h3>

            <p className="text-4xl font-black mt-3">
              4
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-7 text-center">

            <Target
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Target Readiness
            </h3>

            <p className="text-4xl font-black mt-3">
              90%
            </p>

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            AI Recommendations
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Review doubly linked list operations before attempting the LRU Cache question.",
              "Practice at least two Hash Map implementation problems.",
              "Revise memory management concepts before attempting advanced data structure design.",
              "Complete the prerequisite questions in the recommended order.",
              "After completing the learning path, retry the original question.",
              "If your readiness score reaches 90%, proceed to the full interview problem.",
            ].map((recommendation, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                💡 {recommendation}

              </div>

            ))}

          </div>

        </div>

        {/* Progress Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Prerequisite Progress
          </h2>

          {[
            ["DSA Concepts", 88],
            ["Programming Fundamentals", 70],
            ["Mathematical Concepts", 93],
            ["Core CS Concepts", 68],
            ["Overall Readiness", stats.readiness],
          ].map(([label, value], index) => (

            <div key={index} className="mb-7">

              <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

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

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">
                Build Your Knowledge Step by Step 🚀
              </h2>

              <p className="leading-8 text-white/90">
                Difficult interview questions become easier when you
                understand the concepts behind them. Follow the
                personalized learning path, strengthen your weak
                prerequisites, and then return to the original problem
                with greater confidence.
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                🧠
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Readiness
              </h3>

              <p className="text-5xl font-black">
                {stats.readiness}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionPrerequisiteChecker;