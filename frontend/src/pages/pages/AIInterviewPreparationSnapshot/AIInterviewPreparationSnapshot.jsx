import React, { useState } from "react";
import {
  Brain,
  Target,
  Code2,
  Flame,
  Trophy,
  AlertTriangle,
  CalendarDays,
} from "lucide-react";

const AIInterviewPreparationSnapshot = () => {

  const [stats] = useState({
    readiness: 91,
    questionsSolved: 42,
    mockInterviews: 5,
    streak: 18,
  });

  const [snapshot] = useState({
    strongest: "Arrays",
    weakest: "Dynamic Programming",
    upcomingGoal: "Complete System Design Revision",
  });

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

              AI Interview Preparation Snapshot

            </h1>

            <p className="text-gray-500 mt-2">

              Get a quick overview of your interview preparation,
              including readiness, progress, strengths, weak areas,
              and upcoming goals.

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

            <Code2
              size={30}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-4 text-gray-500">

              Questions Solved

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.questionsSolved}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Trophy
              size={30}
              className="mx-auto text-yellow-500"
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
              size={30}
              className="mx-auto text-orange-500"
            />

            <h3 className="mt-4 text-gray-500">

              Study Streak

            </h3>

            <p className="text-5xl font-black mt-3">

              🔥 {stats.streak}

            </p>

          </div>

        </div>

        {/* Snapshot Card */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-8">

            Preparation Snapshot

          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

            <div>

              <h3 className="font-semibold mb-2">

                Overall Readiness

              </h3>

              <p className="text-5xl font-black">

                {stats.readiness}%

              </p>

            </div>

            <div>

              <h3 className="font-semibold mb-2">

                Strongest Topic

              </h3>

              <p className="text-2xl font-bold">

                {snapshot.strongest}

              </p>

            </div>

            <div>

              <h3 className="font-semibold mb-2">

                Weakest Topic

              </h3>

              <p className="text-2xl font-bold">

                {snapshot.weakest}

              </p>

            </div>

          </div>

        </div>

        {/* Weekly Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Weekly Progress

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <h3 className="font-semibold">

                Questions Solved

              </h3>

              <p className="text-4xl font-black mt-4">

                {stats.questionsSolved}

              </p>

            </div>

            <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

              <h3 className="font-semibold">

                Mock Interviews

              </h3>

              <p className="text-4xl font-black mt-4">

                {stats.mockInterviews}

              </p>

            </div>

          </div>

        </div>

        {/* Strongest & Weakest */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6 text-green-600">

              Strongest Topic

            </h2>

            <p className="text-3xl font-bold">

              {snapshot.strongest}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <h2 className="text-2xl font-bold mb-6 text-red-500">

              Weakest Topic

            </h2>

            <p className="text-3xl font-bold">

              {snapshot.weakest}

            </p>

          </div>

        </div>

        {/* Upcoming Goal */}

        <div className="mt-10 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <CalendarDays />

            <h2 className="text-2xl font-bold">

              Upcoming Goal

            </h2>

          </div>

          <h3 className="text-3xl font-bold">

            {snapshot.upcomingGoal}

          </h3>

          <p className="mt-4">

            Complete this goal to improve your interview readiness score.

          </p>

        </div>
                {/* Pending Tasks */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center justify-between mb-8">

            <h2 className="text-2xl font-bold">

              Pending Tasks

            </h2>

            <button className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 text-white">

              View All

            </button>

          </div>

          <div className="space-y-5">

            {[
              "Complete System Design Revision",
              "Solve 10 Dynamic Programming Questions",
              "Attend One Mock Interview",
              "Review Resume Projects",
              "Practice Behavioral Interview Questions",
            ].map((task, index) => (

              <div
                key={index}
                className="flex justify-between items-center rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <span>{task}</span>

                <button className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white">

                  Start

                </button>

              </div>

            ))}

          </div>

        </div>

        {/* AI Insights */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Preparation Insights

          </h2>

          <ul className="space-y-4">

            <li>• Continue practicing Dynamic Programming this week.</li>

            <li>• Your Arrays performance is consistently excellent.</li>

            <li>• One additional mock interview could increase readiness.</li>

            <li>• Resume improvements will strengthen your profile.</li>

            <li>• Maintain your study streak to maximize retention.</li>

          </ul>

        </div>

        {/* Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Preparation Analytics

          </h2>

          {[
            ["Interview Readiness", 91],
            ["Coding Progress", 86],
            ["Revision Progress", 82],
            ["Mock Interview Confidence", 88],
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

            Preparation Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your interview preparation is progressing well with an overall
            readiness score of <strong>{stats.readiness}%</strong>. You have
            completed <strong>{stats.questionsSolved}</strong> coding
            questions this week, participated in{" "}
            <strong>{stats.mockInterviews}</strong> mock interviews, and
            maintained a <strong>{stats.streak}-day</strong> study streak.
            Focus on your weakest topic, complete your upcoming goals,
            and continue practicing consistently.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Stay Focused, Stay Interview Ready 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Every solved problem, completed mock interview,
                and revision session brings you closer to your
                dream opportunity. Keep learning consistently
                and let AI guide your preparation journey.

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

export default AIInterviewPreparationSnapshot;