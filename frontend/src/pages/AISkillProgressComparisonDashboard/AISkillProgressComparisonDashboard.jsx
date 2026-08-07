import React, { useState } from "react";
import {
  Brain,
  Code2,
  Calculator,
  MessageSquare,
  FileText,
  Layers3,
  Filter,
} from "lucide-react";

const AISkillProgressComparisonDashboard = () => {

  const [stats] = useState({
    readiness: 88,
    comparedSkills: 6,
    weeklyGrowth: 12,
    strongestSkill: "DSA",
  });

  const [skills] = useState([
    {
      title: "DSA Progress",
      progress: 89,
    },
    {
      title: "Aptitude Accuracy",
      progress: 78,
    },
    {
      title: "Mock Interview",
      progress: 82,
    },
    {
      title: "Resume Completion",
      progress: 94,
    },
    {
      title: "Flashcard Mastery",
      progress: 86,
    },
  ]);

  const [filters, setFilters] = useState({
    period: "This Month",
    role: "Software Engineer",
  });

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

              AI Skill Progress Comparison Dashboard

            </h1>

            <p className="text-gray-500 mt-2">

              Compare your interview preparation performance across
              multiple skills and discover where to focus next.

            </p>

          </div>

        </div>

        {/* Dashboard Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain className="mx-auto text-violet-600" size={30} />

            <h3 className="mt-4 text-gray-500">

              Readiness

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.readiness}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Layers3 className="mx-auto text-blue-600" size={30} />

            <h3 className="mt-4 text-gray-500">

              Skills Compared

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.comparedSkills}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Code2 className="mx-auto text-green-600" size={30} />

            <h3 className="mt-4 text-gray-500">

              Weekly Growth

            </h3>

            <p className="text-5xl font-black mt-3">

              +{stats.weeklyGrowth}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <MessageSquare className="mx-auto text-orange-500" size={30} />

            <h3 className="mt-4 text-gray-500">

              Best Skill

            </h3>

            <p className="text-2xl font-bold mt-4">

              {stats.strongestSkill}

            </p>

          </div>

        </div>

        {/* Filters */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Filter className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Comparison Filters

            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <select
              value={filters.period}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  period: e.target.value,
                })
              }
              className="rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4"
            >
              <option>This Week</option>
              <option>This Month</option>
              <option>Last 3 Months</option>
              <option>All Time</option>
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

        {/* Skill Comparison */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Skill Comparison

          </h2>

          {skills.map((skill, index) => (

            <div key={index} className="mb-8">

              <div className="flex justify-between mb-3">

                <span className="font-semibold">

                  {skill.title}

                </span>

                <span className="font-bold">

                  {skill.progress}%

                </span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{ width: `${skill.progress}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* DSA & Aptitude */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-6">

              <Code2 className="text-violet-600" />

              <h2 className="text-2xl font-bold">

                DSA Progress

              </h2>

            </div>

            <p className="text-5xl font-black text-violet-600">

              89%

            </p>

            <p className="mt-4 text-gray-500">

              Excellent performance in problem solving.

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-6">

              <Calculator className="text-green-600" />

              <h2 className="text-2xl font-bold">

                Aptitude Accuracy

              </h2>

            </div>

            <p className="text-5xl font-black text-green-600">

              78%

            </p>

            <p className="mt-4 text-gray-500">

              Continue practicing quantitative reasoning.

            </p>

          </div>

        </div>
                {/* Mock Interview Comparison */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquare className="text-blue-600" />

            <h2 className="text-2xl font-bold">

              Mock Interview Performance

            </h2>

          </div>

          {[
            ["Technical Interviews", 82],
            ["HR Interviews", 88],
            ["Communication", 84],
            ["Problem Solving", 90],
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

        {/* Resume & Flashcards */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-6">

              <FileText className="text-orange-500" />

              <h2 className="text-2xl font-bold">

                Resume Completion

              </h2>

            </div>

            <p className="text-5xl font-black text-orange-500">

              94%

            </p>

            <p className="mt-4 text-gray-500">

              Resume is almost ready for applications.

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-6">

              <Layers3 className="text-violet-600" />

              <h2 className="text-2xl font-bold">

                Flashcard Mastery

              </h2>

            </div>

            <p className="text-5xl font-black text-violet-600">

              86%

            </p>

            <p className="mt-4 text-gray-500">

              Continue reviewing advanced flashcards.

            </p>

          </div>

        </div>

        {/* Weekly Improvement */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            Weekly Improvement Trends

          </h2>

          <ul className="space-y-4">

            <li>📈 DSA improved by 6%</li>
            <li>📈 Aptitude accuracy increased by 4%</li>
            <li>📈 Mock interview confidence improved by 7%</li>
            <li>📈 Flashcard mastery increased by 5%</li>
            <li>📈 Resume quality improved by 3%</li>

          </ul>

        </div>

        {/* AI Insights */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Performance Insights

          </h2>

          <div className="space-y-5">

            {[
              "Continue focusing on DSA to maintain your strongest skill.",
              "Increase aptitude practice to improve accuracy.",
              "Complete one additional mock interview this week.",
              "Revise flashcards before your next assessment.",
              "Keep your resume updated with recent projects.",
            ].map((tip, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                💡 {tip}

              </div>

            ))}

          </div>

        </div>

        {/* Overall Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Overall Skill Analytics

          </h2>

          {[
            ["Overall Readiness", 88],
            ["Technical Skills", 90],
            ["Interview Skills", 84],
            ["Learning Consistency", 87],
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

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Compare, Improve, Succeed 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Comparing your skills helps you identify strengths and
                areas for improvement. Follow the AI insights to build
                a balanced interview preparation strategy.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📊

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

export default AISkillProgressComparisonDashboard;