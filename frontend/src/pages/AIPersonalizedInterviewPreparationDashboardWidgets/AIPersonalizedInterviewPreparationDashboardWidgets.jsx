import React, { useState } from "react";
import {
  Brain,
  LayoutDashboard,
  CalendarDays,
  Flame,
  Target,
  Plus,
  Move,
} from "lucide-react";

const AIPersonalizedInterviewPreparationDashboardWidgets = () => {

  const [stats] = useState({
    activeWidgets: 9,
    savedLayouts: 3,
    readiness: 88,
    studyStreak: 24,
  });

  const [widgets] = useState([
    "Daily Goals",
    "Interview Countdown",
    "Study Streak",
    "Readiness Score",
    "Weak Topics",
    "Flashcard Queue",
    "Recent Mock Interviews",
    "Upcoming Tasks",
    "Achievement Summary",
  ]);

  const [dailyGoals] = useState([
    "Solve 5 DSA Problems",
    "Revise Dynamic Programming",
    "Complete 1 Mock Interview",
    "Review Flashcards",
  ]);

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <LayoutDashboard
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              AI Personalized Interview Preparation Dashboard Widgets

            </h1>

            <p className="text-gray-500 mt-2">

              Customize your interview preparation dashboard with
              AI-powered widgets tailored to your learning priorities.

            </p>

          </div>

        </div>

        {/* Dashboard Stats */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <LayoutDashboard
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Widgets

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.activeWidgets}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Layouts

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.savedLayouts}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
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

            <Flame
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Streak

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.studyStreak}

            </p>

          </div>

        </div>

        {/* Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            Personalized Dashboard Overview

          </h2>

          <p className="leading-8 text-white/90">

            Build your own interview preparation dashboard by
            selecting widgets that matter most to you. Rearrange,
            resize, and save layouts for a personalized learning
            experience.

          </p>

        </div>

        {/* Widget Management */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Move className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Widget Management

            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {widgets.map((widget, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5 flex justify-between items-center"
              >

                <span>{widget}</span>

                <Plus className="text-violet-600" />

              </div>

            ))}

          </div>

        </div>

        {/* Daily Goals */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-green-600" />

            <h2 className="text-2xl font-bold">

              Daily Goals Widget

            </h2>

          </div>

          <div className="space-y-5">

            {dailyGoals.map((goal, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                ✅ {goal}

              </div>

            ))}

          </div>

        </div>

        {/* Countdown & Study Streak */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-6">

              <CalendarDays className="text-blue-600" />

              <h2 className="text-2xl font-bold">

                Interview Countdown

              </h2>

            </div>

            <div className="text-center">

              <p className="text-6xl font-black text-blue-600">

                18

              </p>

              <p className="mt-4 text-gray-500">

                Days Remaining

              </p>

            </div>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-6">

              <Flame className="text-orange-500" />

              <h2 className="text-2xl font-bold">

                Study Streak

              </h2>

            </div>

            <div className="text-center">

              <p className="text-6xl font-black text-orange-500">

                {stats.studyStreak}

              </p>

              <p className="mt-4 text-gray-500">

                Consecutive Days

              </p>

            </div>

          </div>

        </div>
                {/* Readiness Score */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Brain className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Readiness Score Widget

            </h2>

          </div>

          <div className="text-center">

            <p className="text-7xl font-black text-violet-600">

              {stats.readiness}%

            </p>

            <p className="mt-4 text-gray-500">

              Interview Readiness

            </p>

          </div>

        </div>

        {/* Weak Topics & Flashcards */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">

              Weak Topics Widget

            </h2>

            <div className="space-y-5">

              {[
                "Dynamic Programming",
                "Graphs",
                "Operating Systems",
                "System Design",
              ].map((topic, index) => (

                <div
                  key={index}
                  className="rounded-xl border border-red-200 dark:border-red-900/20 p-5"
                >

                  ⚠️ {topic}

                </div>

              ))}

            </div>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">

              Flashcard Review Queue

            </h2>

            <div className="space-y-5">

              {[
                "Arrays",
                "Binary Trees",
                "Operating Systems",
                "Behavioral Questions",
              ].map((card, index) => (

                <div
                  key={index}
                  className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
                >

                  🃏 {card}

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Recent Mock Interviews */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Recent Mock Interviews

          </h2>

          <div className="space-y-5">

            {[
              "Google Technical Interview",
              "Amazon OA Simulation",
              "Microsoft HR Round",
              "Meta System Design Mock",
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                🎤 {item}

              </div>

            ))}

          </div>

        </div>

        {/* Upcoming Tasks */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Upcoming Tasks

          </h2>

          <div className="space-y-5">

            {[
              "Complete 2 Mock Interviews",
              "Revise Dynamic Programming",
              "Finish Resume Review",
              "Practice Behavioral Questions",
            ].map((task, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                📅 {task}

              </div>

            ))}

          </div>

        </div>

        {/* Achievement Summary */}

        <div className="mt-10 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-8">

            Achievement Summary

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              "🏆 100 Questions Solved",
              "🔥 24-Day Streak",
              "🎖️ 12 Badges Earned",
              "📈 88% Readiness",
            ].map((item, index) => (

              <div
                key={index}
                className="bg-white/10 rounded-2xl p-6 text-center font-bold"
              >

                {item}

              </div>

            ))}

          </div>

        </div>

        {/* Dashboard Templates */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Preset Dashboard Templates

          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              "🎓 Beginner",
              "💼 Placement Preparation",
              "🏢 Company-Specific",
            ].map((template, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-6 text-center font-semibold"
              >

                {template}

              </div>

            ))}

          </div>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Build Your Perfect Dashboard 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Personalize your PrepPilot experience with widgets that
                match your goals. Keep the most important information
                front and center, stay organized, and prepare more
                efficiently every day.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🧩

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Active Widgets

              </h3>

              <p className="text-5xl font-black">

                {stats.activeWidgets}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AIPersonalizedInterviewPreparationDashboardWidgets;