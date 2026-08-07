import React, { useState } from "react";
import {
  Brain,
  CalendarCheck,
  Flame,
  TrendingUp,
  Bell,
  CheckCircle2,
  Activity,
} from "lucide-react";

const AIInterviewPreparationHabitTracker = () => {

  const [stats] = useState({
    streak: 18,
    monthlyStreak: 52,
    completion: 84,
    readiness: 89,
  });

  const [habits, setHabits] = useState([
    {
      title: "Solve 5 DSA Problems",
      completed: true,
    },
    {
      title: "Revise Core Subjects",
      completed: false,
    },
    {
      title: "Practice HR Questions",
      completed: true,
    },
    {
      title: "Attend Mock Interview",
      completed: false,
    },
    {
      title: "Review Flashcards",
      completed: true,
    },
  ]);

  const toggleHabit = (index) => {
    const updated = [...habits];
    updated[index].completed = !updated[index].completed;
    setHabits(updated);
  };

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

              AI Interview Preparation Habit Tracker

            </h1>

            <p className="text-gray-500 mt-2">

              Build consistent interview preparation habits with
              AI-powered tracking, streak monitoring, and
              personalized study recommendations.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Flame
              size={30}
              className="mx-auto text-orange-500"
            />

            <h3 className="mt-4 text-gray-500">

              Daily Streak

            </h3>

            <p className="text-5xl font-black mt-3">

              🔥 {stats.streak}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CalendarCheck
              size={30}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-4 text-gray-500">

              Monthly Streak

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.monthlyStreak}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              size={30}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 text-gray-500">

              Completion

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.completion}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
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

        </div>

        {/* Habit Checklist */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Today's Preparation Habits

          </h2>

          <div className="space-y-5">

            {habits.map((habit, index) => (

              <div
                key={index}
                className="flex justify-between items-center rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <span className="font-semibold">

                  {habit.title}

                </span>

                <input
                  type="checkbox"
                  checked={habit.completed}
                  onChange={() => toggleHabit(index)}
                  className="w-5 h-5"
                />

              </div>

            ))}

          </div>

        </div>

        {/* Weekly & Monthly Streak */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">

              Weekly Habit Streak

            </h2>

            <h1 className="text-6xl font-black text-violet-600">

              6 / 7

            </h1>

            <p className="mt-4 text-gray-500">

              Keep your momentum going!

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">

              Monthly Habit Score

            </h2>

            <h1 className="text-6xl font-black text-green-600">

              84%

            </h1>

            <p className="mt-4 text-gray-500">

              Excellent consistency this month.

            </p>

          </div>

        </div>

        {/* Activity History */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Activity />

            <h2 className="text-2xl font-bold">

              Recent Activity

            </h2>

          </div>

          <ul className="space-y-4">

            <li>✅ Solved 8 DSA problems today</li>
            <li>✅ Revised Operating Systems notes</li>
            <li>✅ Completed flashcard review session</li>
            <li>🎤 Finished one mock interview</li>
            <li>📄 Updated resume achievements</li>

          </ul>

        </div>
                {/* AI Suggestions */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Study Routine Suggestions

          </h2>

          <div className="space-y-5">

            {[
              "Spend 30 minutes revising Dynamic Programming.",
              "Complete one mock interview before the weekend.",
              "Practice aptitude questions after DSA revision.",
              "Review flashcards before ending today's study session.",
              "Maintain your study streak by completing at least one task daily.",
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

        {/* Reminder */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Bell />

            <h2 className="text-2xl font-bold">

              Missed Habit Reminder

            </h2>

          </div>

          <p className="text-lg">

            You haven't completed <strong>Core Subject Revision</strong> today.

          </p>

          <p className="mt-3">

            Completing it will help maintain your daily habit streak.

          </p>

        </div>

        {/* Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Habit Analytics

          </h2>

          {[
            ["Daily Consistency", 84],
            ["Weekly Goal Completion", 91],
            ["Study Routine", 88],
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

        {/* Achievement Badges */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Habit Achievement Badges

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              "🔥 7-Day Streak",
              "📚 Study Master",
              "🎯 Consistency Hero",
              "🏆 Interview Ready",
            ].map((badge, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center"
              >

                {badge}

              </div>

            ))}

          </div>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Consistency Builds Success 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Great interview preparation comes from small,
                consistent daily habits. Keep your streak alive,
                follow AI suggestions, and stay committed to
                achieving your career goals.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🔥

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Habit Score

              </h3>

              <p className="text-5xl font-black">

                {stats.completion}%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AIInterviewPreparationHabitTracker;