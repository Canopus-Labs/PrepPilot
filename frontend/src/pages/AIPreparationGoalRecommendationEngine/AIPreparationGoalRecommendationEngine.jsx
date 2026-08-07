import React, { useState } from "react";
import {
  Brain,
  Target,
  Code2,
  BookOpen,
  Clock3,
  TrendingUp,
  CalendarDays,
} from "lucide-react";

const AIPreparationGoalRecommendationEngine = () => {

  const [stats] = useState({
    readiness: 89,
    weeklyGoals: 8,
    completedGoals: 5,
    consistency: 92,
  });

  const [recommendations] = useState([
    {
      title: "Solve 30 Coding Questions",
      progress: 60,
    },
    {
      title: "Complete 2 Mock Interviews",
      progress: 50,
    },
    {
      title: "Revise Dynamic Programming",
      progress: 40,
    },
    {
      title: "Review 100 Flashcards",
      progress: 70,
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

              AI Preparation Goal Recommendation Engine

            </h1>

            <p className="text-gray-500 mt-2">

              Receive personalized interview preparation goals
              generated automatically from your learning progress,
              strengths, weaknesses, and interview timeline.

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

              Readiness

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.readiness}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CalendarDays
              size={30}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-4 text-gray-500">

              Weekly Goals

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.weeklyGoals}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              size={30}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 text-gray-500">

              Completed

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.completedGoals}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              size={30}
              className="mx-auto text-orange-500"
            />

            <h3 className="mt-4 text-gray-500">

              Consistency

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.consistency}%

            </p>

          </div>

        </div>

        {/* AI Goal Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-8">

            AI Recommended Goals

          </h2>

          <div className="space-y-6">

            {recommendations.map((goal, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">

                    {goal.title}

                  </span>

                  <span>

                    {goal.progress}%

                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-white/20 overflow-hidden">

                  <div
                    className="h-full bg-white"
                    style={{ width: `${goal.progress}%` }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Weekly Coding Goals */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Code2 className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Weekly Coding Goals

            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Solve 30 coding problems",
              "Complete 5 medium questions",
              "Practice Binary Trees",
              "Review Dynamic Programming",
            ].map((goal, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                💻 {goal}

              </div>

            ))}

          </div>

        </div>

        {/* Topic Revision */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <BookOpen className="text-green-600" />

            <h2 className="text-2xl font-bold">

              Topic Revision Goals

            </h2>

          </div>

          <div className="space-y-5">

            {[
              "Dynamic Programming",
              "System Design",
              "Graphs",
              "Operating Systems",
            ].map((topic, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                📚 {topic}

              </div>

            ))}

          </div>

        </div>

        {/* Daily Study Planner */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Clock3 />

            <h2 className="text-2xl font-bold">

              Daily Study Plan

            </h2>

          </div>

          <ul className="space-y-4">

            <li>🕘 Coding Practice — 1 Hour</li>
            <li>📚 Core Subjects — 45 Minutes</li>
            <li>🃏 Flashcards — 20 Minutes</li>
            <li>🎤 Mock Interview Review — 30 Minutes</li>

          </ul>

        </div>
                {/* Mock Interview Goals */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Mock Interview Goals

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Complete 2 Technical Mock Interviews",
              "Practice 1 HR Mock Interview",
              "Review Previous Mock Feedback",
              "Improve Communication Skills",
            ].map((goal, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                🎤 {goal}

              </div>

            ))}

          </div>

        </div>

        {/* Flashcard Review */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Flashcard Review Goals

          </h2>

          <div className="space-y-5">

            {[
              "Review 100 DSA Flashcards",
              "Revise Core Subject Flashcards",
              "Practice Interview Terminology",
              "Complete AI Revision Cards",
            ].map((goal, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                🃏 {goal}

              </div>

            ))}

          </div>

        </div>

        {/* Skill Improvement */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            Skill Improvement Recommendations

          </h2>

          <ul className="space-y-4">

            <li>• Strengthen Dynamic Programming concepts.</li>

            <li>• Improve System Design understanding.</li>

            <li>• Practice explaining projects confidently.</li>

            <li>• Increase coding speed using timed challenges.</li>

            <li>• Continue maintaining your study consistency.</li>

          </ul>

        </div>

        {/* Goal Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Goal Progress Analytics

          </h2>

          {[
            ["Weekly Goal Completion", 68],
            ["Study Consistency", 92],
            ["Revision Progress", 81],
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

        {/* Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Goal Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Based on your preparation history, AI recommends focusing
            on coding practice, mock interviews, revision sessions,
            and consistent study habits. Completing these personalized
            goals will steadily improve your interview readiness and
            overall performance.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Achieve Your Goals Every Week 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Small, personalized goals lead to consistent progress.
                Follow your AI recommendations, stay disciplined, and
                you'll be better prepared for every interview.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🎯

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

export default AIPreparationGoalRecommendationEngine;