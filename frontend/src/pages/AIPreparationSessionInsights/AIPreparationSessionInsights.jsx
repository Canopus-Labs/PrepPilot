import React, { useState } from "react";
import {
  Brain,
  BookOpen,
  CheckCircle2,
  Clock3,
  Target,
  BarChart3,
  TrendingUp,
} from "lucide-react";

const AIPreparationSessionInsights = () => {

  const [stats] = useState({
    topicsCovered: 6,
    questionsCompleted: 42,
    timeSpent: "2h 15m",
    accuracy: 88,
  });

  const [topics] = useState([
    {
      name: "Arrays",
      questions: 12,
      accuracy: 95,
    },
    {
      name: "Graphs",
      questions: 8,
      accuracy: 82,
    },
    {
      name: "Dynamic Programming",
      questions: 7,
      accuracy: 76,
    },
    {
      name: "Behavioral",
      questions: 15,
      accuracy: 91,
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

              AI Preparation Session Insights

            </h1>

            <p className="text-gray-500 mt-2">

              Review a complete summary of your interview preparation
              session with AI-generated insights, productivity metrics,
              and recommendations for your next study session.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BookOpen
              size={30}
              className="mx-auto text-violet-600"
            />

            <h3 className="mt-4 text-gray-500">

              Topics Covered

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.topicsCovered}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              size={30}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-4 text-gray-500">

              Questions Solved

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.questionsCompleted}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Clock3
              size={30}
              className="mx-auto text-orange-500"
            />

            <h3 className="mt-4 text-gray-500">

              Time Spent

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.timeSpent}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              size={30}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 text-gray-500">

              Accuracy

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.accuracy}%

            </p>

          </div>

        </div>

        {/* Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            Session Overview

          </h2>

          <p className="leading-8 text-white/90">

            AI analyzes your completed preparation session by measuring
            solved questions, covered topics, time investment,
            learning efficiency, and overall productivity to generate
            personalized insights for continuous improvement.

          </p>

        </div>

        {/* Topics Covered */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <BookOpen className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Topics Covered

            </h2>

          </div>

          <div className="space-y-6">

            {topics.map((topic, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex justify-between">

                  <h3 className="font-bold">

                    {topic.name}

                  </h3>

                  <span>

                    {topic.questions} Questions

                  </span>

                </div>

                <div className="mt-4">

                  <div className="flex justify-between mb-2">

                    <span>Accuracy</span>

                    <span>{topic.accuracy}%</span>

                  </div>

                  <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                    <div
                      className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                      style={{
                        width: `${topic.accuracy}%`,
                      }}
                    />

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Questions Completed */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <CheckCircle2 className="text-green-600" />

            <h2 className="text-2xl font-bold">

              Questions Completed

            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              ["Easy", 15],
              ["Medium", 19],
              ["Hard", 8],
              ["Total", stats.questionsCompleted],
            ].map(([level, count], index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-6 text-center"
              >

                <h3 className="text-gray-500">

                  {level}

                </h3>

                <p className="text-4xl font-black mt-3">

                  {count}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Time & Accuracy */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-8">

              <Clock3 className="text-orange-500" />

              <h2 className="text-2xl font-bold">

                Time Distribution

              </h2>

            </div>

            {[
              ["Learning", 45],
              ["Practice", 40],
              ["Revision", 15],
            ].map(([label, value], index) => (

              <div key={index} className="mb-6">

                <div className="flex justify-between mb-2">

                  <span>{label}</span>

                  <span>{value}%</span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
                    style={{ width: `${value}%` }}
                  />

                </div>

              </div>

            ))}

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-8">

              <TrendingUp className="text-blue-600" />

              <h2 className="text-2xl font-bold">

                Session Accuracy

              </h2>

            </div>

            <div className="text-center mt-8">

              <p className="text-7xl font-black text-blue-600">

                {stats.accuracy}%

              </p>

              <p className="mt-4 text-gray-500">

                Overall Session Accuracy

              </p>

            </div>

          </div>

        </div>
                {/* Strongest & Weakest Topics */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">

              Strongest Topic

            </h2>

            <div className="rounded-xl border border-green-200 dark:border-green-900/20 p-6">

              <h3 className="text-xl font-bold">

                Arrays

              </h3>

              <p className="mt-3 text-gray-500">

                95% Accuracy • 12 Questions Solved

              </p>

            </div>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">

              Weakest Topic

            </h2>

            <div className="rounded-xl border border-red-200 dark:border-red-900/20 p-6">

              <h3 className="text-xl font-bold">

                Dynamic Programming

              </h3>

              <p className="mt-3 text-gray-500">

                76% Accuracy • Needs More Revision

              </p>

            </div>

          </div>

        </div>

        {/* Next Session Goals */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Suggested Next Session Goals

          </h2>

          <div className="space-y-5">

            {[
              "Solve 10 Dynamic Programming problems.",
              "Revise Graph algorithms for 30 minutes.",
              "Complete one mock interview session.",
              "Review Behavioral interview flashcards.",
              "Practice one hard-level coding challenge.",
            ].map((goal, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                🎯 {goal}

              </div>

            ))}

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Improvement Recommendations

          </h2>

          <ul className="space-y-4">

            <li>• Spend more time practicing Dynamic Programming.</li>

            <li>• Continue solving Array questions to maintain mastery.</li>

            <li>• Attempt one additional hard-level coding problem.</li>

            <li>• Review interview mistakes before your next session.</li>

            <li>• Schedule another mock interview this week.</li>

          </ul>

        </div>

        {/* Productivity Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Session Productivity Analytics

          </h2>

          {[
            ["Productivity Score", 91],
            ["Learning Efficiency", 88],
            ["Accuracy", stats.accuracy],
            ["Preparation Progress", 90],
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

                Every Session Makes You Better 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Reflect on today's progress, learn from your mistakes,
                and use AI insights to plan an even stronger preparation
                session tomorrow. Consistent improvement leads to
                interview success.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📊

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Productivity

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

export default AIPreparationSessionInsights;