import React, { useState } from "react";
import {
  Brain,
  BookOpen,
  Clock3,
  BarChart3,
  Star,
  TrendingUp,
  FolderOpen,
} from "lucide-react";

const AIInterviewPreparationResourceUsageAnalytics = () => {

  const [stats] = useState({
    totalResources: 42,
    hoursSpent: 138,
    completionRate: 84,
    efficiency: 91,
  });

  const [resources] = useState([
    {
      name: "DSA Sheets",
      hours: 34,
      completion: 92,
    },
    {
      name: "Mock Interviews",
      hours: 26,
      completion: 78,
    },
    {
      name: "Core Subject Notes",
      hours: 22,
      completion: 86,
    },
    {
      name: "Flashcards",
      hours: 18,
      completion: 94,
    },
    {
      name: "Interview Experiences",
      hours: 14,
      completion: 81,
    },
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

              AI Interview Preparation Resource Usage Analytics

            </h1>

            <p className="text-gray-500 mt-2">

              Analyze how you use interview preparation resources,
              identify learning patterns, and receive AI-powered
              recommendations for smarter study planning.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <FolderOpen
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Resources

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.totalResources}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Clock3
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Hours Spent

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.hoursSpent}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BarChart3
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Completion

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.completionRate}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Efficiency

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.efficiency}%

            </p>

          </div>

        </div>

        {/* Resource Usage Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            Resource Usage Overview

          </h2>

          <p className="leading-8 text-white/90">

            AI analyzes how frequently you use learning resources,
            tracks completion progress, identifies learning habits,
            and recommends resources that can improve your interview
            preparation efficiency.

          </p>

        </div>

        {/* Time Spent Per Resource */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Clock3 className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Time Spent Per Resource

            </h2>

          </div>

          {resources.map((resource, index) => (

            <div key={index} className="mb-8">

              <div className="flex justify-between mb-2">

                <span className="font-semibold">

                  {resource.name}

                </span>

                <span>

                  {resource.hours} hrs

                </span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{
                    width: `${resource.hours * 2}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Completion Rates */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <BookOpen className="text-green-600" />

            <h2 className="text-2xl font-bold">

              Resource Completion Rates

            </h2>

          </div>

          {resources.map((resource, index) => (

            <div key={index} className="mb-8">

              <div className="flex justify-between mb-2">

                <span>{resource.name}</span>

                <span>{resource.completion}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{
                    width: `${resource.completion}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Most Visited Resources */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Star className="text-yellow-500" />

            <h2 className="text-2xl font-bold">

              Most Visited Resources

            </h2>

          </div>

          <div className="space-y-5">

            {[
              "DSA Sheets",
              "Mock Interview Portal",
              "Flashcards",
              "Interview Experiences",
              "Core Subject Notes",
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                ⭐ {item}

              </div>

            ))}

          </div>

        </div>
                {/* Weekly Usage Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Weekly Usage Summary

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              ["Study Hours", "18 hrs"],
              ["Resources Visited", "14"],
              ["Completed Resources", "6"],
              ["Average Session", "1h 25m"],
            ].map(([title, value], index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center"
              >

                <h3 className="text-gray-500">

                  {title}

                </h3>

                <p className="text-3xl font-black mt-3">

                  {value}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Favorite Resources */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Star className="text-yellow-500" />

            <h2 className="text-2xl font-bold">

              Favorite Resources

            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "DSA Sheets",
              "Flashcards",
              "Mock Interviews",
              "Interview Experiences",
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                ⭐ {item}

              </div>

            ))}

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Resource Recommendations

          </h2>

          <ul className="space-y-4">

            <li>• Spend more time reviewing Core Subject Notes.</li>

            <li>• Increase mock interview practice twice per week.</li>

            <li>• Continue using Flashcards for daily revision.</li>

            <li>• Explore additional company interview experiences.</li>

            <li>• Balance study time across all learning resources.</li>

          </ul>

        </div>

        {/* Resource Efficiency Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Resource Efficiency Analytics

          </h2>

          {[
            ["Learning Efficiency", 91],
            ["Resource Utilization", 87],
            ["Completion Consistency", 84],
            ["Interview Readiness", 89],
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

                Learn Smarter, Not Harder 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Understanding how you use your learning resources helps
                you focus on what delivers the greatest impact. Let AI
                guide your study habits and maximize every hour of
                interview preparation.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📚

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Efficiency

              </h3>

              <p className="text-5xl font-black">

                {stats.efficiency}%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AIInterviewPreparationResourceUsageAnalytics;