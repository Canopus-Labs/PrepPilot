import React, { useState } from "react";
import {
  BarChart3,
  Trophy,
  TrendingUp,
  Clock,
  Brain,
} from "lucide-react";

const SessionComparison = () => {

  const [stats] = useState({
    sessions: 8,
    averageScore: 89,
    improvement: 17,
    aiRating: 93,
  });

  const [selectedSessions] = useState([
    "Mock Interview #6",
    "Mock Interview #7",
    "Mock Interview #8",
  ]);

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <BarChart3
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                Interview Session Comparison Dashboard

              </h1>

              <p className="text-gray-500 mt-2">

                Compare multiple interview sessions,
                monitor your progress, and identify
                areas for continuous improvement.

              </p>

            </div>

          </div>

        </div>

        {/* Selected Sessions */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-xl font-bold mb-5">

            Comparing Sessions

          </h2>

          <div className="flex flex-wrap gap-4">

            {selectedSessions.map((session, index) => (

              <span
                key={index}
                className="px-5 py-3 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 font-semibold"
              >

                {session}

              </span>

            ))}

          </div>

        </div>

        {/* Dashboard Cards */}

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <BarChart3
              size={30}
              className="mx-auto text-violet-600 mb-3"
            />

            <h3 className="text-gray-500">

              Sessions

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.sessions}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Trophy
              size={30}
              className="mx-auto text-yellow-500 mb-3"
            />

            <h3 className="text-gray-500">

              Avg Score

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.averageScore}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <TrendingUp
              size={30}
              className="mx-auto text-green-600 mb-3"
            />

            <h3 className="text-gray-500">

              Improvement

            </h3>

            <p className="text-5xl font-black mt-4">

              +{stats.improvement}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Brain
              size={30}
              className="mx-auto text-blue-600 mb-3"
            />

            <h3 className="text-gray-500">

              AI Rating

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.aiRating}%

            </p>

          </div>

        </div>
                {/* Session Score Comparison */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-8">

            Session Score Comparison

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                session: "Mock Interview #6",
                score: 82,
                color: "text-orange-500",
              },
              {
                session: "Mock Interview #7",
                score: 88,
                color: "text-violet-600",
              },
              {
                session: "Mock Interview #8",
                score: 93,
                color: "text-green-600",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8"
              >

                <h3 className="text-xl font-bold">

                  {item.session}

                </h3>

                <p className={`text-6xl font-black mt-6 ${item.color}`}>

                  {item.score}%

                </p>

                <div className="mt-6 h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Answer Quality Comparison */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Answer Quality Comparison

          </h2>

          <div className="space-y-6">

            {[
              {
                topic: "Technical Accuracy",
                value: 92,
              },
              {
                topic: "Communication",
                value: 88,
              },
              {
                topic: "Confidence",
                value: 91,
              },
              {
                topic: "Problem Solving",
                value: 95,
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">

                    {item.topic}

                  </span>

                  <span className="font-bold">

                    {item.value}%

                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                    style={{
                      width: `${item.value}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Time Per Question */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">

            <Clock className="text-violet-600" />

            Average Time Per Question

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                session: "#6",
                time: "3m 42s",
              },
              {
                session: "#7",
                time: "3m 10s",
              },
              {
                session: "#8",
                time: "2m 38s",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center"
              >

                <h3 className="font-bold text-xl">

                  Session {item.session}

                </h3>

                <p className="text-4xl font-black text-violet-600 mt-4">

                  {item.time}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Topic-wise Improvement */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Topic-wise Improvement

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              {
                topic: "Arrays",
                improvement: "+18%",
              },
              {
                topic: "Dynamic Programming",
                improvement: "+12%",
              },
              {
                topic: "System Design",
                improvement: "+20%",
              },
              {
                topic: "Behavioral",
                improvement: "+9%",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 flex justify-between items-center"
              >

                <h3 className="font-bold">

                  {item.topic}

                </h3>

                <span className="text-green-600 font-bold text-xl">

                  {item.improvement}

                </span>

              </div>

            ))}

          </div>

        </div>
                {/* AI Feedback Comparison */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Feedback Comparison

          </h2>

          <div className="space-y-6">

            {[
              {
                session: "Mock Interview #6",
                feedback:
                  "Improve explanation clarity and reduce unnecessary details.",
                rating: "Good",
              },
              {
                session: "Mock Interview #7",
                feedback:
                  "Better technical depth. Continue improving confidence while answering.",
                rating: "Very Good",
              },
              {
                session: "Mock Interview #8",
                feedback:
                  "Excellent logical flow and strong problem-solving approach.",
                rating: "Excellent",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex justify-between items-center">

                  <h3 className="text-xl font-bold">

                    {item.session}

                  </h3>

                  <span className="px-4 py-2 rounded-full bg-violet-100 text-violet-700 font-semibold">

                    {item.rating}

                  </span>

                </div>

                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-7">

                  {item.feedback}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Performance Trend */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Performance Trend

          </h2>

          <div className="space-y-6">

            {[
              {
                label: "Overall Score",
                value: 93,
              },
              {
                label: "Technical Accuracy",
                value: 91,
              },
              {
                label: "Communication",
                value: 88,
              },
              {
                label: "Confidence",
                value: 90,
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">

                    {item.label}

                  </span>

                  <span className="font-bold">

                    {item.value}%

                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{
                      width: `${item.value}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Strengths & Weaknesses */}

        <div className="mt-10 grid md:grid-cols-2 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

            <h2 className="text-2xl font-bold mb-6">

              Strengths

            </h2>

            <ul className="space-y-4 list-disc ml-5 text-gray-600 dark:text-gray-300">

              <li>Improved problem-solving approach</li>
              <li>Clear communication during explanations</li>
              <li>High technical accuracy</li>
              <li>Better confidence compared to previous sessions</li>

            </ul>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

            <h2 className="text-2xl font-bold mb-6">

              Areas to Improve

            </h2>

            <ul className="space-y-4 list-disc ml-5 text-gray-600 dark:text-gray-300">

              <li>Reduce response time for coding questions</li>
              <li>Explain optimization decisions more clearly</li>
              <li>Improve System Design depth</li>
              <li>Provide more real-world examples</li>

            </ul>

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            AI Recommendations

          </h2>

          <p className="leading-8 text-white/90">

            Your latest interview sessions show consistent
            improvement across technical accuracy and
            communication skills.

            Continue practicing System Design,
            optimization techniques, and timed coding
            interviews to further increase your interview
            readiness.

          </p>

        </div>
                {/* AI Comparison Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Comparison Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Across your recent mock interview sessions, your
            overall performance has improved steadily. Technical
            accuracy, communication, and confidence have shown
            consistent growth, while response time has decreased.

            Continue focusing on System Design discussions,
            optimization strategies, and explaining trade-offs to
            further strengthen your interview performance.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Compare. Learn. Improve. 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Every interview session is an opportunity to
                grow. Review your previous performances,
                identify recurring patterns, and use AI-driven
                insights to continuously improve your interview
                skills.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📈

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Overall Progress

              </h3>

              <p className="text-5xl font-black">

                94%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default SessionComparison;