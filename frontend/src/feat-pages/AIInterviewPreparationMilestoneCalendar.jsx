import React, { useState } from "react";
import {
  CalendarDays,
  Trophy,
  Star,
  Flame,
  Brain,
  Filter,
  CheckCircle2,
} from "lucide-react";

const AIInterviewPreparationMilestoneCalendar = () => {

  const [stats] = useState({
    milestones: 24,
    streak: 32,
    readiness: 90,
    achievements: 15,
  });

  const [filters, setFilters] = useState({
    month: "August",
    category: "All",
    type: "All",
  });

  const [milestones] = useState([
    {
      date: "Aug 02",
      title: "First Mock Interview Completed",
      category: "Mock Interview",
    },
    {
      date: "Aug 04",
      title: "Solved 100 Coding Questions",
      category: "DSA",
    },
    {
      date: "Aug 06",
      title: "Resume Updated",
      category: "Resume",
    },
    {
      date: "Aug 08",
      title: "30-Day Study Streak",
      category: "Habit",
    },
  ]);

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <CalendarDays
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              AI Interview Preparation Milestone Calendar

            </h1>

            <p className="text-gray-500 mt-2">

              View every important milestone from your interview
              preparation journey in one interactive calendar.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Trophy
              className="mx-auto text-yellow-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Milestones

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.milestones}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Flame
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Best Streak

            </h3>

            <p className="text-5xl font-black mt-3">

              🔥 {stats.streak}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              className="mx-auto text-blue-600"
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

            <Star
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Achievements

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.achievements}

            </p>

          </div>

        </div>

        {/* Filters */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Filter className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Calendar Filters

            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <select
              value={filters.month}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  month: e.target.value,
                })
              }
              className="rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4"
            >
              <option>August</option>
              <option>July</option>
              <option>June</option>
              <option>All Months</option>
            </select>

            <select
              value={filters.category}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  category: e.target.value,
                })
              }
              className="rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4"
            >
              <option>All</option>
              <option>DSA</option>
              <option>Resume</option>
              <option>Mock Interview</option>
              <option>Habit</option>
            </select>

            <select
              value={filters.type}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  type: e.target.value,
                })
              }
              className="rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4"
            >
              <option>All</option>
              <option>Achievement</option>
              <option>Milestone</option>
              <option>Record</option>
            </select>

          </div>

        </div>

        {/* Milestone Timeline */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Milestone Timeline

          </h2>

          <div className="space-y-8">

            {milestones.map((item, index) => (

              <div
                key={index}
                className="flex gap-6 border-l-4 border-violet-600 pl-6"
              >

                <div>

                  <p className="text-violet-600 font-semibold">

                    {item.date}

                  </p>

                  <h3 className="text-lg font-bold mt-2">

                    {item.title}

                  </h3>

                  <span className="text-gray-500">

                    {item.category}

                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Achievement Calendar */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <CheckCircle2 />

            <h2 className="text-2xl font-bold">

              Achievement Highlights

            </h2>

          </div>

          <ul className="space-y-4">

            <li>🏆 First Mock Interview Completed</li>
            <li>💯 Solved 100 Coding Questions</li>
            <li>📄 Resume Successfully Updated</li>
            <li>🔥 Achieved 30-Day Study Streak</li>
            <li>⭐ Completed Core Subject Revision</li>

          </ul>

        </div>
                {/* AI Milestone Insights */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Milestone Insights

          </h2>

          <div className="space-y-5">

            {[
              "Your study consistency has improved significantly over the past month.",
              "Mock interview performance has increased after regular DSA revision.",
              "Resume updates positively impacted your interview readiness.",
              "Maintaining your study streak is improving long-term retention.",
              "You're close to reaching your next preparation milestone.",
            ].map((insight, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                💡 {insight}

              </div>

            ))}

          </div>

        </div>

        {/* Progress Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Milestone Analytics

          </h2>

          {[
            ["Milestones Completed", 90],
            ["Preparation Consistency", 88],
            ["Skill Improvement", 86],
            ["Interview Readiness", 90],
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

            You have achieved <strong>{stats.milestones}</strong> interview
            preparation milestones, maintained a best study streak of{" "}
            <strong>{stats.streak} days</strong>, and reached an interview
            readiness score of <strong>{stats.readiness}%</strong>.
            Continue completing new milestones to strengthen your
            preparation journey.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Celebrate Every Achievement 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Every solved question, completed mock interview,
                updated resume, and study streak is a milestone
                toward your dream job. Keep progressing one step
                at a time.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🏆

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

export default AIInterviewPreparationMilestoneCalendar;