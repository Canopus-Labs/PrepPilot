import React, { useState } from "react";
import {
  BookOpen,
  BarChart3,
  Clock3,
  PlayCircle,
  CheckCircle2,
  CalendarDays,
  Brain,
} from "lucide-react";

const ResourceCompletionTracker = () => {

  const [stats] = useState({
    completion: 82,
    resources: 34,
    completed: 18,
    streak: 21,
  });

  const [resources] = useState([
    {
      name: "DSA Sheet",
      progress: 92,
      lastAccessed: "Today",
      remaining: "1 hr",
    },
    {
      name: "Operating Systems Notes",
      progress: 74,
      lastAccessed: "Yesterday",
      remaining: "2 hrs",
    },
    {
      name: "System Design Book",
      progress: 58,
      lastAccessed: "2 days ago",
      remaining: "4 hrs",
    },
    {
      name: "Interview Experiences",
      progress: 81,
      lastAccessed: "Today",
      remaining: "45 mins",
    },
  ]);

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <BookOpen
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              Interview Preparation Resource Completion Tracker

            </h1>

            <p className="text-gray-500 mt-2">

              Monitor your learning progress across books,
              DSA sheets, notes, projects, interview experiences,
              and other preparation resources.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BarChart3
              size={30}
              className="mx-auto text-violet-600"
            />

            <h3 className="mt-4 text-gray-500">

              Completion

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.completion}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BookOpen
              size={30}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-4 text-gray-500">

              Resources

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.resources}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              size={30}
              className="mx-auto text-orange-500"
            />

            <h3 className="mt-4 text-gray-500">

              Completed

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.completed}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              size={30}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 text-gray-500">

              Study Streak

            </h3>

            <p className="text-5xl font-black mt-3">

              🔥 {stats.streak}

            </p>

          </div>

        </div>

        {/* Overall Score */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            Overall Preparation Completion

          </h2>

          <div className="flex flex-col lg:flex-row justify-between items-center">

            <div>

              <p className="text-white/90">

                Your current preparation progress

              </p>

              <h1 className="text-7xl font-black mt-4">

                {stats.completion}%

              </h1>

            </div>

            <div className="text-center">

              <div className="text-7xl">

                📚

              </div>

              <p className="mt-4 text-xl font-bold">

                Great Progress

              </p>

            </div>

          </div>

        </div>

        {/* Resource List */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Resource Completion

          </h2>

          {resources.map((item, index) => (

            <div
              key={index}
              className="mb-8 border-b border-gray-200 dark:border-white/10 pb-6"
            >

              <div className="flex justify-between mb-3">

                <span className="font-semibold">

                  {item.name}

                </span>

                <span>

                  {item.progress}%

                </span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{
                    width: `${item.progress}%`,
                  }}
                />

              </div>

              <div className="mt-4 flex flex-wrap gap-6 text-sm text-gray-500">

                <span>

                  <CalendarDays className="inline w-4 h-4 mr-1" />

                  {item.lastAccessed}

                </span>

                <span>

                  <Clock3 className="inline w-4 h-4 mr-1" />

                  Remaining: {item.remaining}

                </span>

              </div>

            </div>

          ))}

        </div>

        {/* Continue Learning */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <PlayCircle className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Continue Learning

            </h2>

          </div>

          <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 flex flex-col lg:flex-row justify-between items-center gap-6">

            <div>

              <h3 className="text-xl font-bold">

                Continue: System Design Book

              </h3>

              <p className="text-gray-500 mt-2">

                Progress: 58% • Remaining: 4 Hours

              </p>

            </div>

            <button className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold">

              Continue Learning

            </button>

          </div>

        </div>
                {/* Recently Completed */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Recently Completed Resources

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Arrays DSA Sheet",
              "SQL Interview Notes",
              "Operating Systems MCQs",
              "Resume Building Guide",
            ].map((resource, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5 flex items-center gap-4"
              >

                <CheckCircle2 className="text-green-600" />

                <span className="font-medium">

                  {resource}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Learning Recommendations

          </h2>

          <ul className="space-y-4 text-white/90">

            <li>• Complete the remaining chapters of the System Design Book.</li>

            <li>• Continue practicing DSA problems to maintain consistency.</li>

            <li>• Review your interview experiences before upcoming mock interviews.</li>

            <li>• Spend 30 minutes daily revising Operating Systems notes.</li>

            <li>• Finish incomplete resources before starting new ones.</li>

          </ul>

        </div>

        {/* Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Resource Analytics

          </h2>

          {[
            ["Books", 74],
            ["DSA Sheets", 92],
            ["Interview Experiences", 81],
            ["Projects", 68],
            ["Notes", 88],
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

        {/* Achievement Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            Achievement Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            You've completed <strong>{stats.completed}</strong> out of{" "}
            <strong>{stats.resources}</strong> learning resources with an
            overall preparation completion score of{" "}
            <strong>{stats.completion}%</strong>. Continue completing your
            remaining study materials to strengthen your interview readiness
            and maintain your learning streak.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Finish What You Start 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Completing your learning resources is just as important as
                starting them. Stay consistent, monitor your progress, and
                build strong interview readiness one resource at a time.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📚

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Completion Score

              </h3>

              <p className="text-5xl font-black">

                {stats.completion}%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default ResourceCompletionTracker;