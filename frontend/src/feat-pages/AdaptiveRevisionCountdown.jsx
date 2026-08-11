import React, { useState } from "react";
import {
  Brain,
  CalendarDays,
  Clock3,
  Target,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const AIAdaptiveRevisionCountdown = () => {

  const [stats] = useState({
    daysLeft: 12,
    readiness: 86,
    completedTasks: 18,
    priorityTopics: 5,
  });

  const [revisionTopics] = useState([
    {
      topic: "Dynamic Programming",
      priority: "High",
      progress: 42,
    },
    {
      topic: "Graphs",
      priority: "High",
      progress: 56,
    },
    {
      topic: "Operating Systems",
      priority: "Medium",
      progress: 74,
    },
    {
      topic: "Computer Networks",
      priority: "Low",
      progress: 88,
    },
  ]);

  const [dailyTasks] = useState([
    "Revise Dynamic Programming",
    "Solve 5 Graph problems",
    "Review Operating Systems notes",
    "Complete one mock interview",
    "Practice HR interview questions",
  ]);

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

              AI Adaptive Revision Countdown

            </h1>

            <p className="text-gray-500 mt-2">

              Stay interview-ready with AI-powered revision planning
              based on the number of days remaining before your interview.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Clock3
              className="mx-auto text-red-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Days Left

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.daysLeft}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-green-600"
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

            <CheckCircle2
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Tasks Completed

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.completedTasks}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Priority Topics

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.priorityTopics}

            </p>

          </div>

        </div>

        {/* Countdown Card */}

        <div className="mt-10 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            Interview Countdown

          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div>

              <p className="text-white/80">

                Interview Date

              </p>

              <h3 className="text-3xl font-bold mt-2">

                18 August 2026

              </h3>

            </div>

            <div>

              <p className="text-white/80">

                Remaining Days

              </p>

              <h3 className="text-5xl font-black mt-2">

                {stats.daysLeft}

              </h3>

            </div>

            <div>

              <button className="w-full py-4 rounded-xl bg-white text-red-600 font-bold hover:bg-gray-100">

                View Revision Plan

              </button>

            </div>

          </div>

        </div>

        {/* Priority Topics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <BookOpen className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              AI Prioritized Revision Topics

            </h2>

          </div>

          {revisionTopics.map((item, index) => (

            <div key={index} className="mb-8">

              <div className="flex justify-between mb-2">

                <span className="font-semibold">

                  {item.topic}

                </span>

                <span
                  className={`font-bold ${
                    item.priority === "High"
                      ? "text-red-500"
                      : item.priority === "Medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >

                  {item.priority}

                </span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{ width: `${item.progress}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Daily Tasks */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <CalendarDays className="text-green-600" />

            <h2 className="text-2xl font-bold">

              Today's Revision Tasks

            </h2>

          </div>

          <div className="space-y-5">

            {dailyTasks.map((task, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                ✅ {task}

              </div>

            ))}

          </div>

        </div>
                {/* Weak Topic Priority */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Weak Topic Priority

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Dynamic Programming → Revise Daily",
              "Graphs → Practice Alternate Days",
              "System Design → Review Every Weekend",
              "Operating Systems → Quick Revision",
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-red-200 dark:border-red-900/20 p-5"
              >

                ⚠️ {item}

              </div>

            ))}

          </div>

        </div>

        {/* Countdown Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Countdown Progress

          </h2>

          <div className="mb-6">

            <div className="flex justify-between mb-2">

              <span>Interview Preparation</span>

              <span>{stats.readiness}%</span>

            </div>

            <div className="w-full h-5 rounded-full bg-gray-200 overflow-hidden">

              <div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                style={{ width: `${stats.readiness}%` }}
              />

            </div>

          </div>

          <p className="text-gray-500">

            You have completed most of your preparation. Focus on
            high-priority topics during the remaining days.

          </p>

        </div>

        {/* AI Revision Suggestions */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Revision Suggestions

          </h2>

          <ul className="space-y-4">

            <li>• Revise Dynamic Programming every day until the interview.</li>

            <li>• Solve at least 5 Graph questions daily.</li>

            <li>• Schedule one final mock interview 3 days before the interview.</li>

            <li>• Review resume and projects 2 days before the interview.</li>

            <li>• Practice HR and behavioral questions on the final day.</li>

          </ul>

        </div>

        {/* Revision Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Revision Analytics

          </h2>

          {[
            ["Revision Coverage", 84],
            ["Weak Topic Completion", 63],
            ["Daily Consistency", 89],
            ["Interview Readiness", stats.readiness],
          ].map(([label, value], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{ width: `${value}%` }}
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

                Every Day Counts 🚀

              </h2>

              <p className="leading-8 text-white/90">

                As your interview approaches, focus on high-impact
                revision. Complete your daily tasks, strengthen weak
                areas, and trust your preparation. Consistency today
                leads to confidence on interview day.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                ⏳

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Days Left

              </h3>

              <p className="text-5xl font-black">

                {stats.daysLeft}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AIAdaptiveRevisionCountdown;