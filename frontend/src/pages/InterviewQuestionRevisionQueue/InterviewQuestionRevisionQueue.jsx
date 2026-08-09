import React, { useState } from "react";
import {
  RotateCcw,
  Bookmark,
  AlertTriangle,
  CalendarDays,
  Brain,
  Target,
  Clock3,
} from "lucide-react";

const InterviewQuestionRevisionQueue = () => {

  const [stats] = useState({
    queued: 42,
    bookmarked: 18,
    revised: 96,
    accuracy: 84,
  });

  const [questions] = useState([
    {
      title: "Explain Binary Search",
      priority: "High",
      attempts: 4,
      status: "Incorrect",
    },
    {
      title: "Difference between Process and Thread",
      priority: "Medium",
      attempts: 2,
      status: "Bookmarked",
    },
    {
      title: "Design an LRU Cache",
      priority: "High",
      attempts: 5,
      status: "Incorrect",
    },
    {
      title: "SQL JOIN Types",
      priority: "Low",
      attempts: 1,
      status: "Review Later",
    },
  ]);

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <RotateCcw
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              AI Interview Question Revision Queue

            </h1>

            <p className="text-gray-500 mt-2">

              Review difficult interview questions using an
              AI-prioritized revision queue based on your
              previous performance.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <RotateCcw
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Revision Queue

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.queued}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Bookmark
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Bookmarked

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.bookmarked}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Revised

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.revised}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Accuracy

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.accuracy}%

            </p>

          </div>

        </div>

        {/* Revision Queue */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Smart Revision Queue

          </h2>

          {questions.map((question, index) => (

            <div
              key={index}
              className="mb-6 rounded-2xl border border-gray-200 dark:border-white/10 p-6"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="font-bold">

                    {question.title}

                  </h3>

                  <p className="text-gray-500 mt-2">

                    Attempts: {question.attempts}

                  </p>

                </div>

                <span className="px-4 py-2 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30">

                  {question.status}

                </span>

              </div>

            </div>

          ))}

        </div>

        {/* Priority Levels */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <AlertTriangle className="text-orange-500" />

            <h2 className="text-2xl font-bold">

              Priority Levels

            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              ["High", "Review immediately"],
              ["Medium", "Review this week"],
              ["Low", "Review later"],
            ].map(([level, desc], index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center"
              >

                <h3 className="text-xl font-bold">

                  {level}

                </h3>

                <p className="text-gray-500 mt-3">

                  {desc}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Bookmarks */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Bookmarked Questions

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Explain REST APIs",
              "OOP Principles",
              "Heap vs Stack",
              "Binary Tree Traversal",
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5 flex items-center gap-3"
              >

                <Bookmark className="text-violet-600" />

                <span>{item}</span>

              </div>

            ))}

          </div>

        </div>

        {/* Revision Schedule */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <CalendarDays />

            <h2 className="text-2xl font-bold">

              Next Revision Session

            </h2>

          </div>

          <p className="text-xl">

            📅 Tomorrow • 7:00 PM

          </p>

          <p className="mt-3">

            Questions Scheduled:
            <strong> 12</strong>

          </p>

          <p className="mt-3">

            Estimated Time:
            <strong> 45 Minutes</strong>

          </p>

        </div>
                {/* Reattempt History */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Reattempt History

          </h2>

          {[
            ["Binary Search", "Incorrect → Correct", "+18%", "Aug 2"],
            ["SQL JOIN Types", "Incorrect → Correct", "+22%", "Aug 3"],
            ["REST API Design", "Incorrect → Correct", "+15%", "Aug 4"],
            ["OOP Principles", "Incorrect → Correct", "+20%", "Aug 5"],
          ].map(([question, result, improvement, date], index) => (

            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 py-5"
            >

              <div>

                <h3 className="font-semibold">

                  {question}

                </h3>

                <p className="text-gray-500">

                  {date}

                </p>

              </div>

              <div className="text-right">

                <p className="font-semibold text-green-600">

                  {result}

                </p>

                <p className="text-sm text-violet-600">

                  {improvement}

                </p>

              </div>

            </div>

          ))}

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Revision Recommendations

          </h2>

          <ul className="space-y-4 text-white/90">

            <li>• Review Binary Search again after 3 days.</li>

            <li>• Prioritize LRU Cache because it has multiple incorrect attempts.</li>

            <li>• Solve more System Design questions this week.</li>

            <li>• Revise bookmarked Operating System questions this weekend.</li>

            <li>• Schedule a full revision session after completing today's queue.</li>

          </ul>

        </div>

        {/* Revision Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Revision Analytics

          </h2>

          {[
            ["Revision Completion", 91],
            ["Question Accuracy", 84],
            ["Retention Score", 87],
            ["Improvement Rate", 89],
          ].map(([label, value], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${value}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Learning Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            Revision Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your AI-powered revision queue has helped improve your
            interview performance by prioritizing frequently missed
            questions and tracking reattempt progress. Continue
            completing scheduled revision sessions to strengthen
            long-term retention and improve interview confidence.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Revise. Retain. Succeed. 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Consistent revision is the key to mastering interview
                concepts. Let AI organize your learning, reinforce
                difficult topics, and help you stay interview-ready.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🔄

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Retention Score

              </h3>

              <p className="text-5xl font-black">

                87%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default InterviewQuestionRevisionQueue;