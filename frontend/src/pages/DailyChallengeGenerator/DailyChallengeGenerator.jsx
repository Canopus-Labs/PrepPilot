import React, { useState } from "react";
import {
  Sparkles,
  Code2,
  Brain,
  Trophy,
  Flame,
} from "lucide-react";

const DailyChallengeGenerator = () => {

  const [stats] = useState({
    completedToday: 3,
    streak: 14,
    xp: 2580,
    completion: 60,
  });

  const [role] = useState("Software Engineer");

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <Sparkles
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                AI Personalized Daily Challenge

              </h1>

              <p className="text-gray-500 mt-2">

                Complete personalized interview preparation
                tasks generated using your strengths,
                weaknesses and learning history.

              </p>

            </div>

          </div>

        </div>

        {/* Today's Goal */}

        <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

            <div>

              <h2 className="text-2xl font-bold">

                Today's AI Goal

              </h2>

              <p className="text-gray-500 mt-3">

                Focus on Dynamic Programming, Aptitude,
                Resume Improvements and Behavioral
                Interview Practice.

              </p>

            </div>

            <span className="px-5 py-3 rounded-full bg-violet-100 text-violet-700 font-semibold">

              {role}

            </span>

          </div>

        </div>

        {/* Dashboard */}

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Code2
              size={30}
              className="mx-auto text-violet-600 mb-3"
            />

            <h3 className="text-gray-500">

              Completed

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.completedToday}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Flame
              size={30}
              className="mx-auto text-orange-500 mb-3"
            />

            <h3 className="text-gray-500">

              Streak

            </h3>

            <p className="text-5xl font-black mt-4">

              🔥 {stats.streak}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Trophy
              size={30}
              className="mx-auto text-yellow-500 mb-3"
            />

            <h3 className="text-gray-500">

              XP Earned

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.xp}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Brain
              size={30}
              className="mx-auto text-green-600 mb-3"
            />

            <h3 className="text-gray-500">

              Progress

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.completion}%

            </p>

          </div>

        </div>
                {/* Daily Challenge Cards */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-8">

            Today's Personalized Challenges

          </h2>

          <div className="space-y-6">

            {[
              {
                title: "Coding Challenge",
                icon: "💻",
                task: "Solve the Longest Increasing Subsequence problem using Dynamic Programming.",
                difficulty: "Medium",
                reward: "+100 XP",
              },
              {
                title: "Aptitude Challenge",
                icon: "🧮",
                task: "Solve 10 Time & Work aptitude questions with at least 80% accuracy.",
                difficulty: "Easy",
                reward: "+60 XP",
              },
              {
                title: "Interview Question",
                icon: "🎤",
                task: "Explain the difference between Process and Thread with practical examples.",
                difficulty: "Medium",
                reward: "+80 XP",
              },
              {
                title: "Flashcard Revision",
                icon: "🗂️",
                task: "Review 25 flashcards from Operating Systems and DBMS.",
                difficulty: "Easy",
                reward: "+40 XP",
              },
            ].map((challenge, index) => (

              <div
                key={index}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8 hover:shadow-lg transition"
              >

                <div className="flex flex-col lg:flex-row justify-between gap-6">

                  <div className="flex gap-5">

                    <div className="text-5xl">

                      {challenge.icon}

                    </div>

                    <div>

                      <h3 className="text-2xl font-bold">

                        {challenge.title}

                      </h3>

                      <p className="mt-3 text-gray-600 dark:text-gray-300 leading-8">

                        {challenge.task}

                      </p>

                    </div>

                  </div>

                  <div className="flex flex-col items-end justify-between">

                    <span
                      className={`px-4 py-2 rounded-full font-semibold ${
                        challenge.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >

                      {challenge.difficulty}

                    </span>

                    <span className="mt-4 text-violet-600 font-bold">

                      {challenge.reward}

                    </span>

                    <button className="mt-6 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold transition">

                      Mark Complete

                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Today's Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Today's Completion Progress

          </h2>

          <div className="space-y-6">

            {[
              {
                task: "Coding Challenge",
                progress: 60,
              },
              {
                task: "Aptitude",
                progress: 100,
              },
              {
                task: "Interview Question",
                progress: 40,
              },
              {
                task: "Flashcards",
                progress: 100,
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">

                    {item.task}

                  </span>

                  <span className="font-bold">

                    {item.progress}%

                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-500 to-purple-600"
                    style={{
                      width: `${item.progress}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>
                {/* Resume Improvement Suggestion */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Resume Improvement Suggestion

          </h2>

          <div className="rounded-2xl border border-gray-200 dark:border-white/10 p-6">

            <h3 className="text-xl font-bold">

              AI Recommendation

            </h3>

            <p className="mt-4 text-gray-600 dark:text-gray-300 leading-8">

              Add measurable achievements to your recent
              projects. Quantify your impact using metrics
              like response time improvements, user growth,
              accuracy gains, or deployment statistics to
              make your resume stronger.

            </p>

            <button className="mt-6 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold">

              Update Resume

            </button>

          </div>

        </div>

        {/* Bonus Challenge */}

        <div className="mt-10 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            ⭐ Bonus Challenge

          </h2>

          <p className="leading-8 text-white/90">

            AI detected that Dynamic Programming is one of
            your weaker topics.

            Solve two Hard Dynamic Programming problems and
            explain the time and space complexity for both
            solutions.

          </p>

          <div className="mt-8 flex flex-wrap gap-4">

            <span className="px-5 py-3 rounded-full bg-white/20">

              +200 XP

            </span>

            <span className="px-5 py-3 rounded-full bg-white/20">

              Bonus Badge

            </span>

          </div>

        </div>

        {/* Rewards */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Daily Rewards

          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                title: "Today's XP",
                value: "280",
              },
              {
                title: "Coins",
                value: "150",
              },
              {
                title: "Achievements",
                value: "3",
              },
              {
                title: "Current Rank",
                value: "#21",
              },
            ].map((reward, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6 text-center"
              >

                <h3 className="text-gray-500">

                  {reward.title}

                </h3>

                <p className="text-5xl font-black text-violet-600 mt-4">

                  {reward.value}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* Weekly Progress */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Weekly Challenge Progress

          </h2>

          <div className="space-y-6">

            {[
              {
                day: "Monday",
                completed: 100,
              },
              {
                day: "Tuesday",
                completed: 80,
              },
              {
                day: "Wednesday",
                completed: 100,
              },
              {
                day: "Thursday",
                completed: 60,
              },
              {
                day: "Friday",
                completed: 40,
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">

                    {item.day}

                  </span>

                  <span className="font-bold">

                    {item.completed}%

                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                    style={{
                      width: `${item.completed}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            AI Personalized Recommendations

          </h2>

          <p className="leading-8 text-white/90">

            Based on your recent interview performance,
            AI recommends increasing focus on Dynamic
            Programming, practicing more behavioral
            interview questions, reviewing operating
            system concepts, and maintaining your
            flashcard revision streak to maximize
            interview readiness.

          </p>

        </div>
                {/* AI Daily Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Daily Challenge Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Today's personalized challenge was generated using
            your recent interview performance, learning history,
            weak topics, and study consistency.

            You completed multiple preparation tasks and earned
            valuable XP while improving coding, aptitude,
            communication, and interview readiness.

            Continue maintaining your streak and complete the
            bonus challenge to unlock additional rewards and
            improve your weakest topics faster.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Every Day is a Step Closer 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Small daily improvements lead to remarkable
                interview success. Complete your personalized
                challenges, stay consistent, and let AI guide
                your preparation journey one day at a time.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🏆

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Today's Readiness

              </h3>

              <p className="text-5xl font-black">

                95%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default DailyChallengeGenerator;