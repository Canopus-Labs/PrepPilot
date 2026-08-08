import React, { useState } from "react";
import {
  Building2,
  Briefcase,
  BookOpen,
  CheckCircle2,
  CalendarDays,
  BarChart3,
  Brain,
} from "lucide-react";

const CompanyInterviewTracker = () => {

  const [company, setCompany] = useState({
    name: "Google",
    deadline: "2026-08-25",
    progress: 78,
  });

  const [stats] = useState({
    companies: 4,
    completedTopics: 27,
    readiness: 84,
    streak: 18,
  });

  const [topics] = useState([
    {
      title: "Data Structures",
      progress: 92,
    },
    {
      title: "Algorithms",
      progress: 88,
    },
    {
      title: "System Design",
      progress: 63,
    },
    {
      title: "Operating Systems",
      progress: 81,
    },
    {
      title: "DBMS",
      progress: 76,
    },
    {
      title: "Computer Networks",
      progress: 71,
    },
  ]);

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <Building2
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              Company Interview Preparation Tracker

            </h1>

            <p className="text-gray-500 mt-2">

              Track your interview preparation separately for
              every company you are targeting.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Briefcase
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Companies

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.companies}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Topics Done

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.completedTopics}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BarChart3
              className="mx-auto text-orange-500"
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

            <Brain
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Streak

            </h3>

            <p className="text-5xl font-black mt-3">

              🔥 {stats.streak}

            </p>

          </div>

        </div>

        {/* Company Plan */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Company Preparation Plan

          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div>

              <label className="font-semibold block mb-2">

                Company

              </label>

              <select
                value={company.name}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    name: e.target.value,
                  })
                }
                className="w-full rounded-xl border dark:border-white/10 p-4 bg-white dark:bg-[#1f2937]"
              >

                <option>Google</option>
                <option>Amazon</option>
                <option>Microsoft</option>
                <option>Meta</option>
                <option>Apple</option>

              </select>

            </div>

            <div>

              <label className="font-semibold block mb-2">

                Interview Deadline

              </label>

              <input
                type="date"
                value={company.deadline}
                onChange={(e) =>
                  setCompany({
                    ...company,
                    deadline: e.target.value,
                  })
                }
                className="w-full rounded-xl border dark:border-white/10 p-4 bg-white dark:bg-[#1f2937]"
              />

            </div>

          </div>

        </div>

        {/* Topic Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <BookOpen className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Company-wise Topic Progress

            </h2>

          </div>

          {topics.map((item, index) => (

            <div key={index} className="mb-8">

              <div className="flex justify-between mb-2">

                <span className="font-semibold">

                  {item.title}

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

            </div>

          ))}

        </div>

        {/* Deadline */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <CalendarDays />

            <h2 className="text-2xl font-bold">

              Upcoming Interview

            </h2>

          </div>

          <p className="text-lg">

            Company:
            <strong> {company.name}</strong>

          </p>

          <p className="mt-3 text-lg">

            Interview Date:
            <strong> {company.deadline}</strong>

          </p>

          <p className="mt-3 text-lg">

            Preparation Progress:
            <strong> {company.progress}%</strong>

          </p>

        </div>
                {/* Mock Interview Scores */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Mock Interview Scores

          </h2>

          {[
            ["Technical Round", 91],
            ["DSA Round", 88],
            ["System Design", 76],
            ["HR Round", 94],
          ].map(([title, score], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{title}</span>

                <span>{score}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${score}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Saved Questions */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Saved Interview Questions

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Binary Search",
              "LRU Cache Design",
              "REST API Design",
              "Database Indexing",
              "Operating System Scheduling",
              "Graph Traversal",
            ].map((question, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                {question}

              </div>

            ))}

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Company Recommendations

          </h2>

          <ul className="space-y-4 text-white/90">

            <li>• Complete System Design preparation before your Google interview.</li>

            <li>• Solve 10 additional Graph problems this week.</li>

            <li>• Practice one mock interview every two days.</li>

            <li>• Review Google's leadership principles and recent products.</li>

            <li>• Revise Operating Systems before the technical round.</li>

          </ul>

        </div>

        {/* Company Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            Company Preparation Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your preparation for <strong>{company.name}</strong> is progressing
            well with strong performance in Data Structures and Algorithms.
            Focus on System Design and company-specific interview questions
            before your interview date to maximize your readiness score.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                One Company at a Time 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Every company has different interview expectations.
                Organize your preparation separately, monitor your
                progress consistently, and focus on the skills that
                matter most for your target company.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🏢

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Company Score

              </h3>

              <p className="text-5xl font-black">

                84%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default CompanyInterviewTracker;