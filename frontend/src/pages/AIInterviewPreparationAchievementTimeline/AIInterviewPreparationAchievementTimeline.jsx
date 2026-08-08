import React, { useState } from "react";
import {
  Brain,
  Trophy,
  Search,
  Filter,
  CalendarDays,
  ClipboardCheck,
  Award,
} from "lucide-react";

const AIInterviewPreparationAchievementTimeline = () => {

  const [stats] = useState({
    totalAchievements: 42,
    completedAssessments: 18,
    earnedBadges: 12,
    currentStreak: 27,
  });

  const [searchTerm, setSearchTerm] = useState("");

  const [filter, setFilter] = useState("All");

  const timeline = [
    {
      date: "02 Aug 2026",
      title: "Completed DSA Assessment",
      category: "Assessment",
      icon: "📝",
    },
    {
      date: "30 Jul 2026",
      title: "Completed Technical Mock Interview",
      category: "Mock Interview",
      icon: "🎤",
    },
    {
      date: "27 Jul 2026",
      title: "Updated Resume",
      category: "Resume",
      icon: "📄",
    },
    {
      date: "24 Jul 2026",
      title: "Reached 20-Day Study Streak",
      category: "Study",
      icon: "🔥",
    },
  ];

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <Trophy
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              AI Interview Preparation Achievement Timeline

            </h1>

            <p className="text-gray-500 mt-2">

              View every milestone achieved throughout your interview
              preparation journey in one interactive timeline.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Trophy
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Achievements

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.totalAchievements}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <ClipboardCheck
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Assessments

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.completedAssessments}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Award
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Badges

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.earnedBadges}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Study Streak

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.currentStreak}

            </p>

          </div>

        </div>

        {/* Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            Achievement Timeline Overview

          </h2>

          <p className="leading-8 text-white/90">

            Your AI-powered timeline automatically records important
            milestones including completed assessments, mock interviews,
            resume updates, flashcard achievements, study streaks,
            earned badges, and certificates.

          </p>

        </div>

        {/* Search & Filter */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="grid md:grid-cols-2 gap-6">

            <div className="relative">

              <Search className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search achievements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] pl-12 pr-4 py-4"
              />

            </div>

            <div className="relative">

              <Filter className="absolute left-4 top-4 text-gray-400" />

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] pl-12 pr-4 py-4"
              >

                <option>All</option>
                <option>Assessment</option>
                <option>Mock Interview</option>
                <option>Resume</option>
                <option>Study</option>
                <option>Flashcards</option>
                <option>Badges</option>

              </select>

            </div>

          </div>

        </div>

        {/* Timeline */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <CalendarDays className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Achievement Timeline

            </h2>

          </div>

          <div className="space-y-6">

            {timeline.map((item, index) => (

              <div
                key={index}
                className="border-l-4 border-violet-500 pl-6 py-2"
              >

                <p className="text-sm text-gray-500">

                  {item.date}

                </p>

                <h3 className="text-lg font-bold mt-2">

                  {item.icon} {item.title}

                </h3>

                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300 text-sm">

                  {item.category}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Assessment Milestones */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Assessment Milestones

          </h2>

          <div className="space-y-5">

            {[
              "Completed DSA Assessment",
              "Completed Aptitude Assessment",
              "Completed Core Subjects Quiz",
              "Achieved 90% in Mock Test",
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                📝 {item}

              </div>

            ))}

          </div>

        </div>
                {/* Mock Interview Milestones */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Mock Interview Milestones

          </h2>

          <div className="space-y-5">

            {[
              "Completed First Mock Interview",
              "Scored 85% in Technical Mock",
              "Completed HR Mock Interview",
              "Finished 10 Mock Interviews",
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

        {/* Resume & Study Streak */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">

              Resume Updates

            </h2>

            <div className="space-y-5">

              {[
                "Created Resume",
                "Added New Project",
                "Updated Skills",
                "Improved Project Descriptions",
              ].map((item, index) => (

                <div
                  key={index}
                  className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
                >

                  📄 {item}

                </div>

              ))}

            </div>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6">

              Study Streak Achievements

            </h2>

            <div className="space-y-5">

              {[
                "7-Day Streak",
                "15-Day Streak",
                "20-Day Streak",
                "Current: 27-Day Streak",
              ].map((item, index) => (

                <div
                  key={index}
                  className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
                >

                  🔥 {item}

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* Flashcards */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Flashcard Milestones

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "100 Flashcards Reviewed",
              "Completed DSA Flashcards",
              "Completed Core Subject Flashcards",
              "Maintained Daily Flashcard Revision",
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                🃏 {item}

              </div>

            ))}

          </div>

        </div>

        {/* Badges */}

        <div className="mt-10 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            Badges & Certificates

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

            {[
              "🏅 DSA Master",
              "🎖️ Mock Interview Expert",
              "📚 Consistent Learner",
              "🔥 Study Streak Champion",
            ].map((badge, index) => (

              <div
                key={index}
                className="bg-white/10 rounded-2xl p-6 text-center font-bold"
              >

                {badge}

              </div>

            ))}

          </div>

        </div>

        {/* AI Insights */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Progress Insights

          </h2>

          <div className="space-y-5">

            {[
              "Your interview readiness has improved steadily over the last month.",
              "Mock interview performance has increased by 12%.",
              "Maintain your study streak to unlock additional achievements.",
              "Complete more System Design practice to reach the next milestone.",
            ].map((tip, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                💡 {tip}

              </div>

            ))}

          </div>

        </div>

        {/* Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Achievement Analytics

          </h2>

          {[
            ["Achievements Earned", 84],
            ["Assessment Completion", 91],
            ["Study Consistency", 89],
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

                Celebrate Every Achievement 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Every solved problem, completed assessment, and mock interview
                brings you one step closer to your dream job. Keep learning,
                stay consistent, and celebrate your progress along the way.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🏆

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Achievements

              </h3>

              <p className="text-5xl font-black">

                {stats.totalAchievements}

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AIInterviewPreparationAchievementTimeline;