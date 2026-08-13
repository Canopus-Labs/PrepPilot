import React, { useState } from "react";
import {
  Brain,
  RefreshCw,
  Clock3,
  CheckCircle2,
  XCircle,
  Target,
  TrendingUp,
  LockKeyhole,
  CalendarClock,
  AlertTriangle,
} from "lucide-react";

const AIInterviewQuestionReattemptMode = () => {
  const [stats] = useState({
    reattemptsDue: 6,
    completedReattempts: 18,
    improvementRate: 76,
    conceptsImproved: 9,
  });

  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [showSolution, setShowSolution] = useState(false);

  const questions = [
    {
      title: "Longest Increasing Subsequence",
      difficulty: "Hard",
      previousScore: 48,
      currentScore: 76,
      nextAttempt: "Today",
      concept: "Dynamic Programming",
    },
    {
      title: "Merge Intervals",
      difficulty: "Medium",
      previousScore: 55,
      currentScore: 82,
      nextAttempt: "Tomorrow",
      concept: "Sorting & Intervals",
    },
    {
      title: "LRU Cache",
      difficulty: "Hard",
      previousScore: 42,
      currentScore: 69,
      nextAttempt: "In 2 days",
      concept: "Hash Map + Linked List",
    },
    {
      title: "Binary Tree Level Order Traversal",
      difficulty: "Medium",
      previousScore: 61,
      currentScore: 88,
      nextAttempt: "Completed",
      concept: "BFS",
    },
  ];

  const selected = questions[selectedQuestion];

  const improvement = selected.currentScore - selected.previousScore;

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <RefreshCw
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Question Reattempt Mode
            </h1>

            <p className="text-gray-500 mt-2">
              Revisit difficult questions at the right time, compare
              your attempts, and strengthen concepts through repeated
              practice.
            </p>

          </div>

        </div>

        {/* Dashboard Metrics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CalendarClock
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Reattempts Due
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.reattemptsDue}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Completed Reattempts
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.completedReattempts}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Improvement Rate
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.improvementRate}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Concepts Improved
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.conceptsImproved}
            </p>

          </div>

        </div>

        {/* AI Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-5">

            <Brain size={32} />

            <h2 className="text-3xl font-bold">
              AI Reattempt Engine
            </h2>

          </div>

          <p className="leading-8 text-white/90">
            PrepPilot identifies questions you struggled with and
            automatically schedules them for future practice. The
            previous solution stays hidden so you can demonstrate
            genuine improvement instead of memorizing the answer.
          </p>

        </div>

        {/* Reattempt Queue */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <RefreshCw className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Reattempt Queue
            </h2>

          </div>

          <div className="space-y-5">

            {questions.map((question, index) => (

              <button
                key={index}
                onClick={() => {
                  setSelectedQuestion(index);
                  setShowSolution(false);
                }}
                className={`w-full text-left rounded-2xl border p-6 transition ${
                  selectedQuestion === index
                    ? "border-violet-500 bg-violet-50 dark:bg-violet-900/10"
                    : "border-gray-200 dark:border-white/10"
                }`}
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

                  <div>

                    <h3 className="font-bold text-lg">
                      {question.title}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      {question.concept}
                    </p>

                  </div>

                  <div className="flex flex-wrap gap-3">

                    <span className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800">
                      {question.difficulty}
                    </span>

                    <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700">
                      {question.nextAttempt}
                    </span>

                  </div>

                </div>

              </button>

            ))}

          </div>

        </div>

        {/* Selected Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <p className="text-sm text-gray-500">
                Current Reattempt
              </p>

              <h2 className="text-2xl font-bold mt-2">
                {selected.title}
              </h2>

              <p className="text-gray-500 mt-2">
                Focus Concept: {selected.concept}
              </p>

            </div>

            <div className="flex gap-3">

              <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
                {selected.difficulty}
              </span>

              <span className="px-4 py-2 rounded-full bg-orange-100 text-orange-700">
                {selected.nextAttempt}
              </span>

            </div>

          </div>

        </div>

        {/* Previous Attempt Summary */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-6">

              <XCircle className="text-red-500" />

              <h2 className="text-2xl font-bold">
                Previous Attempt
              </h2>

            </div>

            <p className="text-gray-500">
              Previous score
            </p>

            <p className="text-6xl font-black text-red-500 mt-3">
              {selected.previousScore}%
            </p>

            <div className="mt-6 rounded-xl bg-red-50 dark:bg-red-900/10 p-5">

              <p className="font-semibold">
                AI identified improvement areas
              </p>

              <p className="text-gray-500 mt-2 leading-6">
                Review your reasoning around the core concept before
                attempting the problem again.
              </p>

            </div>

          </div>

          {/* Current Target */}

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-6">

              <Target className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Current Target
              </h2>

            </div>

            <p className="text-gray-500">
              Previous best score
            </p>

            <p className="text-6xl font-black text-violet-600 mt-3">
              {selected.previousScore}%
            </p>

            <p className="text-gray-500 mt-5">
              Target: reach at least 80% to demonstrate meaningful
              improvement.
            </p>

          </div>

        </div>

        {/* Hidden Previous Solution */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-6">

            <LockKeyhole className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Previous Solution
            </h2>

          </div>

          {!showSolution ? (

            <div className="rounded-2xl bg-orange-50 dark:bg-orange-900/10 p-8 text-center">

              <LockKeyhole
                className="mx-auto text-orange-500"
                size={40}
              />

              <h3 className="text-xl font-bold mt-4">
                Solution Hidden
              </h3>

              <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
                Your previous solution is hidden during this reattempt
                so that you can solve the question independently.
              </p>

              <button
                onClick={() => setShowSolution(true)}
                className="mt-6 px-5 py-3 rounded-xl bg-orange-500 text-white font-semibold"
              >
                Reveal Previous Solution
              </button>

            </div>

          ) : (

            <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 p-6">

              <p className="leading-8">
                The previous attempt used a dynamic programming approach,
                but the state transition was incomplete for several
                sequences. The improved approach should clearly define
                the state, transition, and base cases.
              </p>

            </div>

          )}

        </div>

        {/* Reattempt Workspace */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-6">

            <Brain className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Reattempt Workspace
            </h2>

          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

            <label className="font-semibold">
              Explain your new approach
            </label>

            <textarea
              placeholder="Describe how you would solve this question now..."
              className="w-full min-h-[180px] mt-4 rounded-xl border border-gray-300 dark:border-white/10 bg-transparent p-4 outline-none focus:ring-2 focus:ring-violet-500"
            />

            <div className="flex flex-wrap gap-4 mt-5">

              <button className="px-6 py-3 rounded-xl bg-violet-600 text-white font-semibold">
                Submit Reattempt
              </button>

              <button className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 font-semibold">
                Save Progress
              </button>

            </div>

          </div>

        </div>

        {/* Reattempt Schedule */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <CalendarClock className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              AI Reattempt Schedule
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              ["First Reattempt", "1 day", "Rebuild recall"],
              ["Second Reattempt", "3 days", "Verify retention"],
              ["Third Reattempt", "7 days", "Confirm mastery"],
            ].map(([title, interval, purpose], index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <Clock3 className="text-violet-600" />

                <h3 className="font-bold text-lg mt-4">
                  {title}
                </h3>

                <p className="text-3xl font-black mt-3">
                  {interval}
                </p>

                <p className="text-gray-500 mt-2">
                  {purpose}
                </p>

              </div>

            ))}

          </div>

        </div>
                {/* Improvement Comparison */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">
              Previous vs Current Attempt
            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-red-200 dark:border-red-900/30 p-6 text-center">

              <p className="text-gray-500">
                Previous Score
              </p>

              <p className="text-5xl font-black text-red-500 mt-3">
                {selected.previousScore}%
              </p>

            </div>

            <div className="rounded-2xl border border-green-200 dark:border-green-900/30 p-6 text-center">

              <p className="text-gray-500">
                Current Score
              </p>

              <p className="text-5xl font-black text-green-600 mt-3">
                {selected.currentScore}%
              </p>

            </div>

            <div className="rounded-2xl border border-violet-200 dark:border-violet-900/30 p-6 text-center">

              <p className="text-gray-500">
                Improvement
              </p>

              <p className="text-5xl font-black text-violet-600 mt-3">
                +{improvement}%
              </p>

            </div>

          </div>

          <div className="mt-8">

            <div className="flex justify-between mb-2">

              <span className="font-semibold">
                Improvement Progress
              </span>

              <span className="font-bold">
                {improvement}%
              </span>

            </div>

            <div className="w-full h-5 rounded-full bg-gray-200 overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                style={{
                  width: `${Math.min(improvement * 2, 100)}%`,
                }}
              />

            </div>

          </div>

        </div>

        {/* Improvement Breakdown */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Improvement Breakdown
          </h2>

          {[
            ["Concept Understanding", 88],
            ["Problem Solving", 82],
            ["Edge Case Handling", 74],
            ["Code Quality", 86],
            ["Explanation Quality", 91],
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

        {/* Concept Mastery */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              Concept Mastery
            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              ["Dynamic Programming", 82, "Improving"],
              ["Recurrence Relations", 74, "Needs Practice"],
              ["Memoization", 91, "Mastered"],
              ["State Transitions", 69, "Needs Practice"],
            ].map(([concept, score, status], index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <h3 className="font-bold">
                  {concept}
                </h3>

                <p className="text-4xl font-black mt-4">
                  {score}%
                </p>

                <div className="mt-5 w-full h-3 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                    style={{
                      width: `${score}%`,
                    }}
                  />

                </div>

                <span
                  className={`inline-block mt-4 px-3 py-1 rounded-full text-sm ${
                    status === "Mastered"
                      ? "bg-green-100 text-green-700"
                      : status === "Improving"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {status}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Mastery Milestones */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-8">
            Mastery Milestones
          </h2>

          <div className="space-y-6">

            {[
              ["First Attempt", "Concept introduced", true],
              ["First Reattempt", "Understanding reinforced", true],
              ["Second Reattempt", "Performance improved", true],
              ["Third Reattempt", "Consistent success", false],
              ["Mastery", "Concept retained long-term", false],
            ].map(([title, description, completed], index) => (

              <div
                key={index}
                className="flex items-center gap-5"
              >

                <div
                  className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 ${
                    completed
                      ? "bg-green-500"
                      : "bg-white/20"
                  }`}
                >

                  {completed ? (
                    <CheckCircle2 size={22} />
                  ) : (
                    <span className="font-bold">
                      {index + 1}
                    </span>
                  )}

                </div>

                <div>

                  <h3 className="font-bold">
                    {title}
                  </h3>

                  <p className="text-white/70">
                    {description}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Reattempt History */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Clock3 className="text-blue-600" />

            <h2 className="text-2xl font-bold">
              Reattempt History
            </h2>

          </div>

          <div className="space-y-5">

            {[
              ["May 12", "First Attempt", "48%", "Needs Improvement"],
              ["May 14", "First Reattempt", "63%", "Improving"],
              ["May 18", "Second Reattempt", "76%", "Strong"],
              ["May 25", "Third Reattempt", "88%", "Mastered"],
            ].map(
              ([date, attempt, score, status], index) => (

                <div
                  key={index}
                  className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
                >

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                    <div>

                      <p className="text-sm text-gray-500">
                        {date}
                      </p>

                      <h3 className="font-bold text-lg mt-1">
                        {attempt}
                      </h3>

                    </div>

                    <div className="flex items-center gap-4">

                      <span className="text-2xl font-black">
                        {score}
                      </span>

                      <span
                        className={`px-4 py-2 rounded-full ${
                          status === "Mastered"
                            ? "bg-green-100 text-green-700"
                            : status === "Strong"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {status}
                      </span>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Reattempt Recommendations
            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Attempt this question again after reviewing the underlying dynamic programming concept.",
              "Explain your state definition before writing the recurrence.",
              "Test your solution with at least three edge cases during the next attempt.",
              "Avoid looking at the previous solution until you have completed your own approach.",
              "Compare your new complexity analysis with your previous attempt.",
              "If you achieve 80% or higher consistently, move this concept into maintenance revision.",
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

        {/* Retention Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Long-Term Retention Analytics
          </h2>

          {[
            ["1 Day Retention", 92],
            ["3 Day Retention", 86],
            ["7 Day Retention", 79],
            ["14 Day Retention", 73],
            ["30 Day Retention", 68],
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

        {/* Overall Mastery Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

            <div>

              <h2 className="text-2xl font-bold">
                Overall Reattempt Mastery
              </h2>

              <p className="text-gray-500 mt-3 leading-7">
                Your repeated practice is improving both accuracy and
                concept retention. Continue following the scheduled
                intervals until your performance remains consistent.
              </p>

            </div>

            <div className="text-center">

              <p className="text-7xl font-black text-violet-600">
                {stats.improvementRate}%
              </p>

              <p className="text-gray-500 mt-2">
                Mastery Progress
              </p>

            </div>

          </div>

          <div className="mt-8 w-full h-5 rounded-full bg-gray-200 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
              style={{
                width: `${stats.improvementRate}%`,
              }}
            />

          </div>

        </div>

        {/* Practice Strategy */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Recommended Reattempt Strategy
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              ["🔄", "Reattempt", "Solve the question without viewing the previous solution."],
              ["📊", "Compare", "Review differences between attempts."],
              ["🧠", "Reinforce", "Study the concept behind repeated mistakes."],
              ["🏆", "Master", "Repeat until performance becomes consistent."],
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
                Turn Mistakes Into Mastery 🚀
              </h2>

              <p className="leading-8 text-white/90">
                Getting a question wrong is only the beginning of the
                learning process. Reattempt difficult questions at
                intelligent intervals, solve them without relying on
                previous answers, and track your improvement until the
                concept becomes reliable.
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                🏆
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Improvement
              </h3>

              <p className="text-5xl font-black">
                {stats.improvementRate}%
              </p>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default AIInterviewQuestionReattemptMode;