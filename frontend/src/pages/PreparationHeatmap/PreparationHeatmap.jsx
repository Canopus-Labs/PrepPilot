import React, { useState } from "react";
import {
  CalendarDays,
  Flame,
  Brain,
  BarChart3,
} from "lucide-react";

const PreparationHeatmap = () => {

  const [stats] = useState({
    totalSessions: 142,
    streak: 24,
    consistency: 91,
    activeDays: 118,
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <CalendarDays
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                Interview Preparation Heatmap

              </h1>

              <p className="text-gray-500 mt-2">

                Visualize your daily interview preparation
                activity and maintain a consistent study habit.

              </p>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <CalendarDays
              size={30}
              className="mx-auto text-violet-600 mb-3"
            />

            <h3 className="text-gray-500">

              Study Sessions

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.totalSessions}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Flame
              size={30}
              className="mx-auto text-orange-500 mb-3"
            />

            <h3 className="text-gray-500">

              Current Streak

            </h3>

            <p className="text-5xl font-black mt-3">

              🔥 {stats.streak}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Brain
              size={30}
              className="mx-auto text-blue-600 mb-3"
            />

            <h3 className="text-gray-500">

              Consistency

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.consistency}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <BarChart3
              size={30}
              className="mx-auto text-green-600 mb-3"
            />

            <h3 className="text-gray-500">

              Active Days

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.activeDays}

            </p>

          </div>

        </div>
                {/* GitHub Style Heatmap */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Daily Preparation Activity

          </h2>

          {/* Month Labels */}

          <div className="flex justify-between text-sm text-gray-500 mb-4 px-2">

            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ].map((month) => (

              <span key={month}>
                {month}
              </span>

            ))}

          </div>

          {/* Heatmap */}

          <div className="grid grid-cols-18 gap-2 overflow-x-auto">

            {Array.from({ length: 180 }).map((_, index) => {

              const level = Math.floor(Math.random() * 5);

              const colors = [
                "bg-gray-200 dark:bg-gray-700",
                "bg-green-200",
                "bg-green-400",
                "bg-green-600",
                "bg-green-800",
              ];

              return (

                <div
                  key={index}
                  title={`${Math.floor(Math.random() * 6)} study activities`}
                  className={`w-5 h-5 rounded ${colors[level]} hover:scale-125 transition cursor-pointer`}
                />

              );

            })}

          </div>

          {/* Legend */}

          <div className="flex items-center justify-end gap-3 mt-8 text-sm">

            <span className="text-gray-500">

              Less

            </span>

            <div className="w-4 h-4 rounded bg-gray-200 dark:bg-gray-700" />

            <div className="w-4 h-4 rounded bg-green-200" />

            <div className="w-4 h-4 rounded bg-green-400" />

            <div className="w-4 h-4 rounded bg-green-600" />

            <div className="w-4 h-4 rounded bg-green-800" />

            <span className="text-gray-500">

              More

            </span>

          </div>

        </div>

        {/* Weekly Consistency */}

        <div className="mt-10 grid md:grid-cols-4 gap-6">

          {[
            {
              week: "Week 1",
              value: "85%",
            },
            {
              week: "Week 2",
              value: "91%",
            },
            {
              week: "Week 3",
              value: "96%",
            },
            {
              week: "Week 4",
              value: "88%",
            },
          ].map((item, index) => (

            <div
              key={index}
              className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center"
            >

              <h3 className="text-gray-500">

                {item.week}

              </h3>

              <p className="text-5xl font-black text-violet-600 mt-4">

                {item.value}

              </p>

            </div>

          ))}

        </div>
                {/* Monthly Insights */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Monthly Preparation Insights

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center">

              <h3 className="text-gray-500">

                Most Active Month

              </h3>

              <p className="text-4xl font-black text-violet-600 mt-4">

                July

              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center">

              <h3 className="text-gray-500">

                Total Study Hours

              </h3>

              <p className="text-4xl font-black text-green-600 mt-4">

                184h

              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center">

              <h3 className="text-gray-500">

                Problems Solved

              </h3>

              <p className="text-4xl font-black text-blue-600 mt-4">

                528

              </p>

            </div>

          </div>

        </div>

        {/* Study Streak Analysis */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Study Streak Analysis

          </h2>

          <div className="space-y-6">

            {[
              {
                title: "Current Streak",
                progress: 80,
              },
              {
                title: "Monthly Consistency",
                progress: 91,
              },
              {
                title: "Goal Completion",
                progress: 87,
              },
              {
                title: "Practice Frequency",
                progress: 94,
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">

                    {item.title}

                  </span>

                  <span className="font-bold">

                    {item.progress}%

                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{
                      width: `${item.progress}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* AI Consistency Analysis */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            AI Consistency Analysis

          </h2>

          <p className="leading-8 text-white/90">

            Your preparation has remained highly consistent
            over the past month. Most of your study sessions
            occurred during weekdays, with only a few missed
            days. Maintaining this schedule can significantly
            improve your interview readiness and long-term
            retention of important concepts.

          </p>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Recommended Improvements

          </h2>

          <div className="space-y-5">

            {[
              "Study for at least 60 minutes every day.",
              "Avoid missing consecutive preparation days.",
              "Schedule one mock interview every week.",
              "Review flashcards before ending each study session.",
              "Maintain your streak for another 30 days.",
            ].map((tip, index) => (

              <div
                key={index}
                className="flex gap-4 items-start rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <div className="w-8 h-8 rounded-full bg-violet-600 text-white flex items-center justify-center font-bold">

                  {index + 1}

                </div>

                <p className="leading-7">

                  {tip}

                </p>

              </div>

            ))}

          </div>

        </div>
                {/* AI Heatmap Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">
            AI Heatmap Summary
          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your preparation consistency is excellent. The heatmap
            shows that you study regularly throughout the week with
            only a few inactive days. Keeping your current routine
            and increasing mock interview practice will further
            strengthen your interview readiness.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Consistency Beats Intensity 🔥

              </h2>

              <p className="leading-8 text-white/90">

                Every study session contributes to your growth.
                Keep your streak alive, stay consistent, and
                gradually improve your interview skills one
                day at a time.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📅

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Consistency Score

              </h3>

              <p className="text-5xl font-black">

                91%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PreparationHeatmap;