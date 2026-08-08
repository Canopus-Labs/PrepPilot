import React, { useState } from "react";
import {
  Brain,
  Bell,
  Clock3,
  AlertTriangle,
  CalendarDays,
  BookOpen,
  Target,
} from "lucide-react";

const AISmartRevisionReminderGenerator = () => {

  const [stats] = useState({
    remindersToday: 8,
    weakTopics: 5,
    missedSessions: 3,
    consistency: 89,
  });

  const [reminders] = useState([
    {
      topic: "Dynamic Programming",
      time: "09:00 AM",
      duration: "45 min",
      priority: "High",
    },
    {
      topic: "Graphs",
      time: "02:00 PM",
      duration: "30 min",
      priority: "High",
    },
    {
      topic: "Operating Systems",
      time: "06:00 PM",
      duration: "25 min",
      priority: "Medium",
    },
    {
      topic: "Behavioral Interview",
      time: "08:30 PM",
      duration: "20 min",
      priority: "Low",
    },
  ]);

  const [missedPractice] = useState([
    "Binary Trees Revision",
    "Graph Algorithms Practice",
    "System Design Notes",
    "Mock Interview Review",
  ]);

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <Bell
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              AI Smart Revision Reminder Generator

            </h1>

            <p className="text-gray-500 mt-2">

              Receive personalized revision reminders generated
              according to your preparation progress, weak topics,
              interview schedule, and learning history.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Bell
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Today's Reminders

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.remindersToday}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-red-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Weak Topics

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.weakTopics}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BookOpen
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Missed Sessions

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.missedSessions}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Consistency

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.consistency}%

            </p>

          </div>

        </div>

        {/* Smart Reminder Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Reminder Overview

          </h2>

          <p className="leading-8 text-white/90">

            AI analyzes your learning history, interview timeline,
            missed revision sessions, and weak topics to automatically
            generate personalized reminders with optimal timing and
            recommended study duration.

          </p>

        </div>

        {/* Reminder Schedule */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <CalendarDays className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Today's Reminder Schedule

            </h2>

          </div>

          <div className="space-y-6">

            {reminders.map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="font-bold text-lg">

                      {item.topic}

                    </h3>

                    <p className="text-gray-500 mt-2">

                      {item.time} • {item.duration}

                    </p>

                  </div>

                  <span
                    className={`px-4 py-2 rounded-full text-sm font-semibold ${
                      item.priority === "High"
                        ? "bg-red-100 text-red-600"
                        : item.priority === "Medium"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >

                    {item.priority}

                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Weak Topic Reminders */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <AlertTriangle className="text-red-500" />

            <h2 className="text-2xl font-bold">

              Weak Topic Reminders

            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Dynamic Programming",
              "Graphs",
              "System Design",
              "Computer Networks",
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

        {/* Missed Practice */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Clock3 className="text-orange-500" />

            <h2 className="text-2xl font-bold">

              Missed Practice Sessions

            </h2>

          </div>

          <div className="space-y-5">

            {missedPractice.map((item, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                ⏰ {item}

              </div>

            ))}

          </div>

        </div>
                {/* Adaptive Reminder Frequency */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Adaptive Reminder Frequency

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Dynamic Programming → Daily",
              "Graphs → Every Alternate Day",
              "Operating Systems → Twice Weekly",
              "Behavioral Questions → Weekly",
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                🔄 {item}

              </div>

            ))}

          </div>

        </div>

        {/* Recommended Revision Duration */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Recommended Revision Duration

          </h2>

          {[
            ["Dynamic Programming", "45 min"],
            ["Graphs", "30 min"],
            ["System Design", "40 min"],
            ["Behavioral Interview", "20 min"],
          ].map(([topic, duration], index) => (

            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 py-5"
            >

              <span className="font-medium">

                {topic}

              </span>

              <span className="font-bold text-violet-600">

                {duration}

              </span>

            </div>

          ))}

        </div>

        {/* AI Suggestions */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Reminder Suggestions

          </h2>

          <ul className="space-y-4">

            <li>• Schedule Dynamic Programming revision every morning.</li>

            <li>• Recover missed practice sessions before new topics.</li>

            <li>• Complete one mock interview every weekend.</li>

            <li>• Review flashcards during short study breaks.</li>

            <li>• Increase reminder frequency as your interview approaches.</li>

          </ul>

        </div>

        {/* Reminder Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Reminder Performance Analytics

          </h2>

          {[
            ["Reminder Completion", 91],
            ["Revision Consistency", 89],
            ["Weak Topic Coverage", 82],
            ["Interview Readiness", 87],
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

                Never Miss an Important Revision 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Smart reminders adapt to your preparation journey,
                ensuring that the right topics are revised at the
                right time. Stay consistent, strengthen weak areas,
                and walk into every interview with confidence.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🔔

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Consistency

              </h3>

              <p className="text-5xl font-black">

                {stats.consistency}%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AISmartRevisionReminderGenerator;