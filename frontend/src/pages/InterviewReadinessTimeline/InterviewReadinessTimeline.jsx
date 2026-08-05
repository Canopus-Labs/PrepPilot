import React, { useState } from "react";
import {
  CalendarDays,
  TrendingUp,
  Trophy,
  Brain,
  Filter,
  Target,
  Clock3,
} from "lucide-react";

const InterviewReadinessTimeline = () => {

  const [filters, setFilters] = useState({
    date: "Last 30 Days",
    topic: "All Topics",
    role: "Software Engineer",
  });

  const [stats] = useState({
    readiness: 89,
    milestones: 18,
    mockInterviews: 12,
    streak: 27,
  });

  const [timeline] = useState([
    {
      date: "Aug 1",
      title: "Completed Arrays Module",
      type: "Learning",
    },
    {
      date: "Aug 2",
      title: "Mock Interview #10",
      type: "Interview",
    },
    {
      date: "Aug 3",
      title: "Resume Updated",
      type: "Resume",
    },
    {
      date: "Aug 4",
      title: "Skill Assessment Improved",
      type: "Assessment",
    },
    {
      date: "Aug 5",
      title: "Reached 27-Day Study Streak",
      type: "Milestone",
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

              AI Interview Readiness Timeline

            </h1>

            <p className="text-gray-500 mt-2">

              Visualize your complete interview preparation
              journey from day one to interview readiness.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
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

            <Brain
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Mock Interviews

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.mockInterviews}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Clock3
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Study Streak

            </h3>

            <p className="text-5xl font-black mt-3">

              🔥 {stats.streak}

            </p>

          </div>

        </div>

        {/* Filters */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Filter className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Timeline Filters

            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <select
              value={filters.date}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  date: e.target.value,
                })
              }
              className="rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4"
            >
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Last 90 Days</option>
              <option>All Time</option>
            </select>

            <select
              value={filters.topic}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  topic: e.target.value,
                })
              }
              className="rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4"
            >
              <option>All Topics</option>
              <option>DSA</option>
              <option>System Design</option>
              <option>Operating Systems</option>
              <option>DBMS</option>
            </select>

            <select
              value={filters.role}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  role: e.target.value,
                })
              }
              className="rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4"
            >
              <option>Software Engineer</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Data Scientist</option>
            </select>

          </div>

        </div>

        {/* Timeline */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Preparation Timeline

          </h2>

          <div className="space-y-8">

            {timeline.map((item, index) => (

              <div
                key={index}
                className="flex gap-6 border-l-4 border-violet-600 pl-6"
              >

                <div>

                  <p className="text-sm text-violet-600 font-semibold">

                    {item.date}

                  </p>

                  <h3 className="text-lg font-bold mt-2">

                    {item.title}

                  </h3>

                  <span className="text-gray-500">

                    {item.type}

                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Weekly Readiness */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            Weekly Readiness Progress

          </h2>

          {[
            ["Week 1", 58],
            ["Week 2", 68],
            ["Week 3", 77],
            ["Week 4", 89],
          ].map(([week, score], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{week}</span>

                <span>{score}%</span>

              </div>

              <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">

                <div
                  className="h-full bg-white rounded-full"
                  style={{ width: `${score}%` }}
                />

              </div>

            </div>

          ))}

        </div>
                {/* Mock Interview History */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Mock Interview History

          </h2>

          {[
            ["Mock Interview #9", "82%", "Jul 28"],
            ["Mock Interview #10", "86%", "Aug 02"],
            ["Mock Interview #11", "88%", "Aug 03"],
            ["Mock Interview #12", "91%", "Aug 05"],
          ].map(([title, score, date], index) => (

            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 py-5"
            >

              <div>

                <h3 className="font-semibold">

                  {title}

                </h3>

                <p className="text-gray-500">

                  {date}

                </p>

              </div>

              <span className="text-green-600 font-bold text-lg">

                {score}

              </span>

            </div>

          ))}

        </div>

        {/* AI Timeline Insights */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Timeline Insights

          </h2>

          <ul className="space-y-4 text-white/90">

            <li>• Your interview readiness has increased consistently every week.</li>

            <li>• Resume improvements were followed by better mock interview scores.</li>

            <li>• Your longest study streak significantly improved assessment results.</li>

            <li>• Continue focusing on weak topics to reach 95% readiness.</li>

            <li>• Schedule another mock interview after completing System Design.</li>

          </ul>

        </div>

        {/* Preparation Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            Preparation Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your preparation timeline demonstrates consistent progress,
            including completed learning milestones, improved mock
            interview performance, updated resume versions, and higher
            readiness scores. Continue maintaining your study streak
            and completing remaining learning modules to further
            strengthen your interview preparation.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Every Step Counts 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Great interview preparation is built through
                consistent daily progress. Keep learning, track your
                milestones, and celebrate every improvement along
                your journey toward interview success.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📅

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Readiness Score

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

export default InterviewReadinessTimeline;