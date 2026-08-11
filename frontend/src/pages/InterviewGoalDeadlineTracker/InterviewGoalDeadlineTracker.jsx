import React, { useState } from "react";
import {
  Target,
  CalendarDays,
  Clock3,
  Bell,
  CheckCircle2,
  TrendingUp,
  Brain,
} from "lucide-react";

const InterviewGoalDeadlineTracker = () => {

  const [goal, setGoal] = useState({
    title: "",
    deadline: "2026-08-30",
    progress: 60,
  });

  const [stats] = useState({
    activeGoals: 6,
    completedGoals: 14,
    overdue: 2,
    productivity: 88,
  });

  const [goals] = useState([
    {
      title: "Complete DSA Sheet",
      deadline: "Aug 10",
      progress: 82,
      remaining: "5 Days",
    },
    {
      title: "Finish System Design",
      deadline: "Aug 15",
      progress: 55,
      remaining: "10 Days",
    },
    {
      title: "Complete Mock Interviews",
      deadline: "Aug 20",
      progress: 40,
      remaining: "15 Days",
    },
    {
      title: "Resume Final Review",
      deadline: "Aug 08",
      progress: 95,
      remaining: "3 Days",
    },
  ]);

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <Target
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              Interview Goal Deadline Tracker

            </h1>

            <p className="text-gray-500 mt-2">

              Create interview preparation goals, monitor deadlines,
              and stay on track with smart progress tracking.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              size={30}
              className="mx-auto text-violet-600"
            />

            <h3 className="mt-4 text-gray-500">

              Active Goals

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.activeGoals}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              size={30}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-4 text-gray-500">

              Completed

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.completedGoals}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Clock3
              size={30}
              className="mx-auto text-orange-500"
            />

            <h3 className="mt-4 text-gray-500">

              Overdue

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.overdue}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              size={30}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 text-gray-500">

              Productivity

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.productivity}%

            </p>

          </div>

        </div>

        {/* Create Goal */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Create Preparation Goal

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <input
              type="text"
              placeholder="Goal title"
              value={goal.title}
              onChange={(e) =>
                setGoal({
                  ...goal,
                  title: e.target.value,
                })
              }
              className="rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4"
            />

            <input
              type="date"
              value={goal.deadline}
              onChange={(e) =>
                setGoal({
                  ...goal,
                  deadline: e.target.value,
                })
              }
              className="rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4"
            />

          </div>

          <button className="mt-6 px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold">

            Create Goal

          </button>

        </div>

        {/* Active Goals */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Active Goals

          </h2>

          {goals.map((item, index) => (

            <div
              key={index}
              className="mb-8 border-b border-gray-200 dark:border-white/10 pb-6"
            >

              <div className="flex justify-between">

                <h3 className="font-bold">

                  {item.title}

                </h3>

                <span className="text-violet-600 font-semibold">

                  {item.remaining}

                </span>

              </div>

              <p className="mt-2 text-gray-500">

                Deadline: {item.deadline}

              </p>

              <div className="mt-4 w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{
                    width: `${item.progress}%`,
                  }}
                />

              </div>

              <p className="mt-2 font-semibold">

                {item.progress}% Completed

              </p>

            </div>

          ))}

        </div>

        {/* Countdown */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <CalendarDays />

            <h2 className="text-2xl font-bold">

              Next Deadline

            </h2>

          </div>

          <h1 className="text-5xl font-black">

            3 Days Left

          </h1>

          <p className="mt-4 text-lg">

            Resume Final Review

          </p>

          <div className="mt-6 flex items-center gap-3">

            <Bell />

            <span>

              Reminder scheduled for tomorrow.

            </span>

          </div>

        </div>
                {/* Completed Goals */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Completed Goals

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Completed Arrays Revision",
              "Finished SQL Interview Questions",
              "Completed Resume Draft",
              "Solved 100 DSA Problems",
            ].map((goal, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5 flex items-center gap-4"
              >

                <CheckCircle2 className="text-green-600" />

                <span className="font-medium">

                  {goal}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Overdue Goals */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Overdue Goals

          </h2>

          {[
            ["Complete Graph Algorithms", "2 Days Overdue"],
            ["Finish HR Interview Preparation", "1 Day Overdue"],
          ].map(([goal, status], index) => (

            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 py-5"
            >

              <span className="font-semibold">

                {goal}

              </span>

              <span className="text-red-600 font-bold">

                {status}

              </span>

            </div>

          ))}

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Goal Recommendations

          </h2>

          <ul className="space-y-4 text-white/90">

            <li>• Complete your overdue goals before creating new ones.</li>

            <li>• Allocate more study time to System Design this week.</li>

            <li>• Schedule one mock interview before your next deadline.</li>

            <li>• Break large goals into smaller weekly milestones.</li>

            <li>• Maintain your study streak to improve consistency.</li>

          </ul>

        </div>

        {/* Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Goal Progress Analytics

          </h2>

          {[
            ["Overall Completion", 88],
            ["On-Time Completion", 84],
            ["Productivity", 90],
            ["Goal Consistency", 86],
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

        {/* Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            Goal Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            You currently have <strong>{stats.activeGoals}</strong> active
            preparation goals with a productivity score of{" "}
            <strong>{stats.productivity}%</strong>. Stay focused on your
            highest-priority tasks, complete overdue goals promptly, and
            maintain consistent progress to improve your interview readiness.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Stay Focused on Your Goals 🎯

              </h2>

              <p className="leading-8 text-white/90">

                Small, consistent progress leads to successful interview
                preparation. Meet your deadlines, review your progress
                regularly, and celebrate every completed milestone.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🎯

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Productivity

              </h3>

              <p className="text-5xl font-black">

                {stats.productivity}%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default InterviewGoalDeadlineTracker;