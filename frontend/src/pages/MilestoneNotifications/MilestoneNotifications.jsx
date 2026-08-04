import React, { useState } from "react";
import {
  Bell,
  Trophy,
  Flame,
  FileCheck,
  ClipboardCheck,
} from "lucide-react";

const MilestoneNotifications = () => {

  const [stats] = useState({
    milestones: 28,
    unread: 5,
    achievements: 16,
    streak: 21,
  });

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <Bell
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                Interview Preparation Milestone Notifications

              </h1>

              <p className="text-gray-500 mt-2">

                Celebrate your achievements and stay motivated
                throughout your interview preparation journey.

              </p>

            </div>

          </div>

        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Bell
              size={30}
              className="mx-auto text-violet-600 mb-3"
            />

            <h3 className="text-gray-500">

              Notifications

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.milestones}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Trophy
              size={30}
              className="mx-auto text-yellow-500 mb-3"
            />

            <h3 className="text-gray-500">

              Achievements

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.achievements}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Flame
              size={30}
              className="mx-auto text-orange-500 mb-3"
            />

            <h3 className="text-gray-500">

              Study Streak

            </h3>

            <p className="text-5xl font-black mt-3">

              🔥 {stats.streak}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <ClipboardCheck
              size={30}
              className="mx-auto text-green-600 mb-3"
            />

            <h3 className="text-gray-500">

              Unread

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.unread}

            </p>

          </div>

        </div>
                {/* Achievement Notifications */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-8">

            Recent Milestones

          </h2>

          <div className="space-y-6">

            {[
              {
                title: "100 DSA Questions Completed",
                description: "Amazing! You've solved your first 100 DSA questions.",
                icon: "🏆",
                time: "2 hours ago",
                color: "bg-yellow-100 text-yellow-700",
              },
              {
                title: "5 Mock Interviews Completed",
                description: "You're gaining valuable interview experience.",
                icon: "🎤",
                time: "Yesterday",
                color: "bg-blue-100 text-blue-700",
              },
              {
                title: "Resume Completed",
                description: "Your resume is ready for job applications.",
                icon: "📄",
                time: "2 days ago",
                color: "bg-green-100 text-green-700",
              },
              {
                title: "21-Day Study Streak",
                description: "Consistency is the key to success. Keep it up!",
                icon: "🔥",
                time: "Today",
                color: "bg-orange-100 text-orange-700",
              },
              {
                title: "Assessment Completed",
                description: "Congratulations on finishing your latest skill assessment.",
                icon: "✅",
                time: "3 days ago",
                color: "bg-violet-100 text-violet-700",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 hover:shadow-lg transition"
              >

                <div className="flex flex-col lg:flex-row justify-between gap-6">

                  <div className="flex gap-5">

                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl ${item.color}`}>

                      {item.icon}

                    </div>

                    <div>

                      <h3 className="text-xl font-bold">

                        {item.title}

                      </h3>

                      <p className="text-gray-500 mt-2 leading-7">

                        {item.description}

                      </p>

                    </div>

                  </div>

                  <div className="flex flex-col items-end justify-between">

                    <span className="text-sm text-gray-400">

                      {item.time}

                    </span>

                    <button className="mt-4 px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition">

                      View Details

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Achievement Summary */}

        <div className="mt-10 grid md:grid-cols-4 gap-6">

          {[
            {
              title: "Questions Solved",
              value: "350",
            },
            {
              title: "Mock Interviews",
              value: "18",
            },
            {
              title: "Assessments",
              value: "12",
            },
            {
              title: "Certificates",
              value: "9",
            },
          ].map((item, index) => (

            <div
              key={index}
              className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center"
            >

              <h3 className="text-gray-500">

                {item.title}

              </h3>

              <p className="text-5xl font-black text-violet-600 mt-4">

                {item.value}

              </p>

            </div>

          ))}

        </div>
                {/* Notification History */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Notification History

          </h2>

          <div className="space-y-5">

            {[
              {
                title: "Completed 50 Aptitude Questions",
                date: "Today",
              },
              {
                title: "Finished Resume Review",
                date: "Yesterday",
              },
              {
                title: "Completed DSA Weekly Challenge",
                date: "3 Days Ago",
              },
              {
                title: "Reached 20-Day Study Streak",
                date: "Last Week",
              },
              {
                title: "Completed SQL Assessment",
                date: "Last Week",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="flex justify-between items-center rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <div>

                  <h3 className="font-bold">

                    {item.title}

                  </h3>

                  <p className="text-gray-500 mt-2">

                    {item.date}

                  </p>

                </div>

                <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">

                  Completed

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Achievement Badges */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Achievement Badges

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              {
                badge: "🏆",
                title: "DSA Master",
              },
              {
                badge: "🔥",
                title: "21-Day Streak",
              },
              {
                badge: "📄",
                title: "Resume Ready",
              },
              {
                badge: "🎯",
                title: "Assessment Expert",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center hover:bg-violet-50 dark:hover:bg-violet-900/10 transition"
              >

                <div className="text-5xl mb-4">

                  {item.badge}

                </div>

                <h3 className="text-lg font-bold">

                  {item.title}

                </h3>

              </div>

            ))}

          </div>

        </div>

        {/* AI Motivation */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            AI Motivation

          </h2>

          <p className="leading-8 text-white/90">

            You're making excellent progress!

            Every solved question, completed assessment,
            and mock interview brings you closer to your
            dream job.

            Continue maintaining your study streak and
            celebrate every milestone along the way.

          </p>

        </div>

        {/* Upcoming Milestones */}

        <div className="mt-10 grid md:grid-cols-3 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              Next Goal

            </h3>

            <p className="text-3xl font-black text-violet-600 mt-4">

              500 DSA

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              Next Badge

            </h3>

            <p className="text-3xl font-black text-orange-500 mt-4">

              30-Day 🔥

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <h3 className="text-gray-500">

              Progress

            </h3>

            <p className="text-3xl font-black text-green-600 mt-4">

              84%

            </p>

          </div>

        </div>
                {/* AI Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Milestone Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your preparation journey is progressing steadily.
            You've maintained a strong study streak, completed
            multiple assessments, and consistently solved
            interview questions.

            Continue following your learning roadmap and
            celebrating each milestone to stay motivated
            throughout your interview preparation.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Celebrate Every Milestone 🎉

              </h2>

              <p className="leading-8 text-white/90">

                Success isn't achieved in one day—it's built
                through small, consistent wins.

                Every completed question, mock interview,
                assessment, and study streak brings you one
                step closer to your dream job.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🏆

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Achievement Score

              </h3>

              <p className="text-5xl font-black">

                94%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MilestoneNotifications;