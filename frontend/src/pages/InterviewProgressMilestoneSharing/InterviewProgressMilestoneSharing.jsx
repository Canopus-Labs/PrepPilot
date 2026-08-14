import React, { useState } from "react";
import {
  Trophy,
  Award,
  Flame,
  Brain,
  CheckCircle2,
  Palette,
  Share2,
} from "lucide-react";

const InterviewProgressMilestoneSharing = () => {

  const [theme, setTheme] = useState("Purple");

  const [stats] = useState({
    questionsSolved: 528,
    mockInterviews: 31,
    streak: 42,
    readiness: 94,
  });

  const [badges] = useState([
    "100 Questions Solved",
    "7-Day Study Streak",
    "Mock Interview Expert",
    "DSA Master",
    "Resume Ready",
    "Interview Ready",
  ]);

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

              Interview Progress Milestone Sharing

            </h1>

            <p className="text-gray-500 mt-2">

              Celebrate your interview preparation achievements
              by creating beautiful milestone cards that can be
              shared across social platforms.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Questions Solved

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.questionsSolved}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Mock Interviews

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.mockInterviews}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Flame
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Study Streak

            </h3>

            <p className="text-5xl font-black mt-3">

              🔥 {stats.streak}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Award
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

        </div>

        {/* Achievement Badges */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Achievement Milestones

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {badges.map((badge, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center"
              >

                <Award
                  size={36}
                  className="mx-auto text-yellow-500 mb-4"
                />

                <h3 className="font-bold">

                  {badge}

                </h3>

              </div>

            ))}

          </div>

        </div>

        {/* Achievement Card */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-2xl font-bold mb-8">

            Achievement Card Preview

          </h2>

          <div className="bg-white/10 rounded-3xl p-8">

            <h1 className="text-4xl font-black">

              🎉 Milestone Unlocked!

            </h1>

            <p className="mt-5 text-xl">

              Completed

              <strong> {stats.questionsSolved} </strong>

              interview questions

            </p>

            <p className="mt-3">

              Readiness Score:
              <strong> {stats.readiness}%</strong>

            </p>

            <p className="mt-3">

              Study Streak:
              <strong> {stats.streak} Days</strong>

            </p>

          </div>

        </div>

        {/* Theme Selector */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Palette className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Card Theme

            </h2>

          </div>

          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full p-4 rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937]"
          >

            <option>Purple</option>
            <option>Blue</option>
            <option>Green</option>
            <option>Dark</option>
            <option>Gold</option>

          </select>

        </div>
                {/* Share Achievement */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Share2 className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Share Achievement

            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <button className="rounded-2xl bg-[#0A66C2] hover:bg-[#004182] text-white p-5 font-semibold">

              Share on LinkedIn

            </button>

            <button className="rounded-2xl bg-black hover:bg-gray-800 text-white p-5 font-semibold">

              Share on X (Twitter)

            </button>

            <button className="rounded-2xl bg-green-600 hover:bg-green-700 text-white p-5 font-semibold">

              Download Achievement Card

            </button>

          </div>

        </div>

        {/* AI Caption Suggestions */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Caption Suggestions

          </h2>

          <div className="space-y-5">

            <div className="bg-white/10 rounded-xl p-5">

              🚀 Just completed <strong>{stats.questionsSolved}</strong> interview questions and reached a <strong>{stats.readiness}%</strong> interview readiness score! Excited for the next challenge.

            </div>

            <div className="bg-white/10 rounded-xl p-5">

              🔥 Maintaining a <strong>{stats.streak}-day</strong> study streak while preparing for technical interviews. Every day counts!

            </div>

            <div className="bg-white/10 rounded-xl p-5">

              🎯 Finished <strong>{stats.mockInterviews}</strong> mock interviews and earned new preparation milestones. Ready to keep improving!

            </div>

          </div>

        </div>

        {/* Progress Statistics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Progress Statistics

          </h2>

          {[
            ["Questions Solved", 88],
            ["Mock Interviews", 79],
            ["Skill Assessments", 83],
            ["Interview Readiness", 94],
          ].map(([label, value], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{ width: `${value}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Achievement Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            You've made consistent progress throughout your interview
            preparation journey. Sharing your milestones helps celebrate
            achievements, motivates continued learning, and encourages
            others in the community. Continue practicing consistently to
            unlock more badges and reach even higher readiness scores.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Celebrate Every Milestone 🎉

              </h2>

              <p className="leading-8 text-white/90">

                Every solved problem, completed mock interview,
                and earned badge is proof of your growth.
                Share your achievements, inspire others,
                and stay motivated on your interview journey.

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

export default InterviewProgressMilestoneSharing;