import React, { useState } from "react";
import {
  Focus,
  Timer,
  Brain,
  Clock3,
  Save,
  BellOff,
  Play,
} from "lucide-react";

const AIInterviewPreparationFocusMode = () => {

  const [stats] = useState({
    focusSessions: 28,
    totalHours: 42,
    productivity: 91,
    streak: 16,
  });

  const [session] = useState({
    title: "Dynamic Programming Revision",
    remaining: "24:35",
    progress: 62,
    autoSave: "Last saved 2 min ago",
  });

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <Focus
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              AI Interview Preparation Focus Mode

            </h1>

            <p className="text-gray-500 mt-2">

              Stay focused with a distraction-free study environment,
              built-in Pomodoro timer, auto-save, and AI-powered
              productivity tracking.

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

              Focus Sessions

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.focusSessions}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Clock3
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Study Hours

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.totalHours}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Productivity

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.productivity}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Play
              className="mx-auto text-orange-500"
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

        {/* Focus Session */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-8">

            Current Focus Session

          </h2>

          <div className="grid lg:grid-cols-3 gap-8">

            <div>

              <p className="text-white/80">

                Current Topic

              </p>

              <h3 className="text-2xl font-bold mt-2">

                {session.title}

              </h3>

            </div>

            <div>

              <p className="text-white/80">

                Remaining Time

              </p>

              <h3 className="text-5xl font-black mt-2">

                {session.remaining}

              </h3>

            </div>

            <div>

              <button className="w-full py-4 rounded-xl bg-white text-violet-700 font-bold hover:bg-gray-100">

                Enter Full Screen

              </button>

            </div>

          </div>

        </div>

        {/* Pomodoro Timer */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Pomodoro Timer

          </h2>

          <div className="text-center">

            <h1 className="text-7xl font-black text-violet-600">

              24:35

            </h1>

            <div className="flex justify-center gap-5 mt-8">

              <button className="px-8 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white">

                ▶ Start

              </button>

              <button className="px-8 py-3 rounded-xl bg-yellow-500 hover:bg-yellow-600 text-white">

                ⏸ Pause

              </button>

              <button className="px-8 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white">

                ■ Stop

              </button>

            </div>

          </div>

        </div>

        {/* Session Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            Session Progress

          </h2>

          <div className="flex justify-between mb-3">

            <span>Progress</span>

            <span>{session.progress}%</span>

          </div>

          <div className="w-full h-5 rounded-full bg-gray-200 overflow-hidden">

            <div
              className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
              style={{ width: `${session.progress}%` }}
            />

          </div>

        </div>

        {/* Auto Save */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-4">

            <Save />

            <div>

              <h2 className="text-2xl font-bold">

                Auto Save Enabled

              </h2>

              <p className="mt-2">

                {session.autoSave}

              </p>

            </div>

          </div>

          <div className="mt-8 flex items-center gap-4">

            <BellOff />

            <span>

              Non-essential notifications are currently muted.

            </span>

          </div>

        </div>
                {/* Focus Session History */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Focus Session History

          </h2>

          {[
            ["Dynamic Programming", "45 min", "Completed"],
            ["System Design", "30 min", "Completed"],
            ["Mock Interview Review", "60 min", "Completed"],
            ["Resume Revision", "25 min", "Completed"],
          ].map(([title, duration, status], index) => (

            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 py-5"
            >

              <div>

                <h3 className="font-semibold">

                  {title}

                </h3>

                <p className="text-gray-500">

                  {duration}

                </p>

              </div>

              <span className="text-green-600 font-bold">

                {status}

              </span>

            </div>

          ))}

        </div>

        {/* AI Productivity Suggestions */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Productivity Suggestions

          </h2>

          <ul className="space-y-4 text-white/90">

            <li>• Continue using 25-minute Pomodoro sessions.</li>

            <li>• Take a 5-minute break after each completed session.</li>

            <li>• Revise weak topics during your highest-focus hours.</li>

            <li>• Schedule mock interviews after coding practice.</li>

            <li>• Maintain your daily focus streak for better retention.</li>

          </ul>

        </div>

        {/* Focus Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Focus Analytics

          </h2>

          {[
            ["Focus Score", 91],
            ["Session Completion", 94],
            ["Consistency", 88],
            ["Productivity", 90],
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

            Focus Achievements

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              "🔥 7-Day Focus Streak",
              "🍅 Pomodoro Master",
              "🎯 Deep Focus",
              "🏆 Productivity Champion",
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

                Deep Focus Creates Great Results 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Every distraction-free session strengthens your
                interview preparation. Stay focused, trust your
                routine, and let AI help you maximize every study
                session.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🎯

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Productivity

              </h3>

              <p className="text-5xl font-black">

                {stats.productivity}%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AIInterviewPreparationFocusMode;