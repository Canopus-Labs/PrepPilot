import React, { useState } from "react";
import {
  Timer,
  Zap,
  Trophy,
  BarChart3,
  Brain,
  TrendingUp,
  Clock3,
} from "lucide-react";

const CodingSpeedAnalytics = () => {

  const [stats] = useState({
    averageTime: "18 min",
    fastestTime: "6 min",
    speedScore: 89,
    streak: 21,
  });

  const [topics] = useState([
    {
      topic: "Arrays",
      average: "8 min",
      score: 92,
    },
    {
      topic: "Strings",
      average: "10 min",
      score: 88,
    },
    {
      topic: "Dynamic Programming",
      average: "24 min",
      score: 61,
    },
    {
      topic: "Graphs",
      average: "19 min",
      score: 74,
    },
    {
      topic: "Trees",
      average: "15 min",
      score: 82,
    },
    {
      topic: "Greedy",
      average: "12 min",
      score: 86,
    },
  ]);

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <Zap
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              Coding Speed Analytics

            </h1>

            <p className="text-gray-500 mt-2">

              Analyze your coding speed, solving efficiency,
              and interview readiness using AI.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Timer
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Avg Time

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.averageTime}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Trophy
              className="mx-auto text-yellow-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Fastest

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.fastestTime}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Speed Score

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.speedScore}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
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

        {/* Average Solving Time */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Average Solving Time

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center">

              <Clock3 className="mx-auto text-violet-600" />

              <h3 className="mt-4">

                Easy Problems

              </h3>

              <p className="text-4xl font-black mt-3">

                9 min

              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center">

              <Clock3 className="mx-auto text-orange-500" />

              <h3 className="mt-4">

                Medium Problems

              </h3>

              <p className="text-4xl font-black mt-3">

                18 min

              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center">

              <Clock3 className="mx-auto text-red-500" />

              <h3 className="mt-4">

                Hard Problems

              </h3>

              <p className="text-4xl font-black mt-3">

                34 min

              </p>

            </div>

          </div>

        </div>

        {/* Topic Speed */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Topic-wise Coding Speed

          </h2>

          {topics.map((item, index) => (

            <div key={index} className="mb-8">

              <div className="flex justify-between mb-2">

                <span className="font-semibold">

                  {item.topic}

                </span>

                <span>

                  {item.average}

                </span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

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

        {/* Time Trend */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-8 text-white">

          <h2 className="text-2xl font-bold mb-5">

            Time Trend Overview

          </h2>

          <p className="leading-8 text-white/90">

            Your average solving time has improved from
            <strong> 24 minutes </strong>
            to
            <strong> 18 minutes </strong>
            during the last month, indicating consistent
            improvement in coding efficiency.

          </p>

        </div>
                {/* Performance Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Performance Analytics

          </h2>

          {[
            ["Problem Understanding", 91],
            ["Coding Speed", 89],
            ["Debugging Speed", 84],
            ["Optimization Skills", 78],
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

        {/* Weekly Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Weekly Speed Summary

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              {
                day: "Monday",
                time: "21 min",
              },
              {
                day: "Tuesday",
                time: "19 min",
              },
              {
                day: "Wednesday",
                time: "18 min",
              },
              {
                day: "Thursday",
                time: "17 min",
              },
              {
                day: "Friday",
                time: "16 min",
              },
              {
                day: "Saturday",
                time: "15 min",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 flex justify-between items-center"
              >

                <span className="font-semibold">

                  {item.day}

                </span>

                <span className="font-bold text-violet-600">

                  {item.time}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Personal Best */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Personal Best Records

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center">

              <h3 className="text-gray-500">

                Fastest Problem

              </h3>

              <p className="text-4xl font-black text-yellow-500 mt-4">

                6 min

              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center">

              <h3 className="text-gray-500">

                Best Topic

              </h3>

              <p className="text-3xl font-black text-green-600 mt-4">

                Arrays

              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center">

              <h3 className="text-gray-500">

                Accuracy

              </h3>

              <p className="text-4xl font-black text-violet-600 mt-4">

                97%

              </p>

            </div>

          </div>

        </div>

        {/* AI Suggestions */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Improvement Suggestions

          </h2>

          <ul className="space-y-4 text-white/90">

            <li>• Spend more practice time on Dynamic Programming.</li>

            <li>• Solve timed Graph problems to improve decision making.</li>

            <li>• Review failed solutions before attempting new questions.</li>

            <li>• Aim to reduce average solving time by 2 minutes over the next month.</li>

            <li>• Continue maintaining your coding streak.</li>

          </ul>

        </div>

        {/* Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Speed Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your coding speed has improved consistently over recent
            practice sessions. You perform exceptionally well in Arrays,
            Strings, and Trees, while Dynamic Programming remains the
            biggest opportunity for improvement. Continuing focused
            timed practice should further reduce your average solving
            time and improve interview performance.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Speed Comes with Practice ⚡

              </h2>

              <p className="leading-8 text-white/90">

                Consistent problem solving improves both speed and
                accuracy. Track your progress, learn from every
                challenge, and keep pushing your limits to become
                interview-ready.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🚀

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Speed Index

              </h3>

              <p className="text-5xl font-black">

                95%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default CodingSpeedAnalytics;