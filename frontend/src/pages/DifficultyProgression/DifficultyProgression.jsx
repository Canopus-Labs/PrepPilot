import React, { useState } from "react";
import {
  Brain,
  TrendingUp,
  Target,
  BarChart3,
  Award,
} from "lucide-react";

const DifficultyProgression = () => {

  const [stats] = useState({
    currentDifficulty: "Medium",
    readinessScore: 84,
    accuracy: 89,
    interviews: 24,
  });

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

          <div className="flex items-center gap-5">

            <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

              <Brain
                size={34}
                className="text-violet-600"
              />

            </div>

            <div>

              <h1 className="text-3xl font-bold">

                AI Interview Difficulty Progression

              </h1>

              <p className="text-gray-500 mt-2">

                AI automatically adjusts interview difficulty
                according to your performance and learning
                progress.

              </p>

            </div>

          </div>

        </div>

        {/* Dashboard Cards */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Target
              size={30}
              className="mx-auto text-violet-600 mb-3"
            />

            <h3 className="text-gray-500">

              Difficulty

            </h3>

            <p className="text-4xl font-black mt-4">

              {stats.currentDifficulty}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <Award
              size={30}
              className="mx-auto text-yellow-500 mb-3"
            />

            <h3 className="text-gray-500">

              Readiness

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.readinessScore}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <TrendingUp
              size={30}
              className="mx-auto text-green-600 mb-3"
            />

            <h3 className="text-gray-500">

              Accuracy

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.accuracy}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center">

            <BarChart3
              size={30}
              className="mx-auto text-blue-600 mb-3"
            />

            <h3 className="text-gray-500">

              Interviews

            </h3>

            <p className="text-5xl font-black mt-4">

              {stats.interviews}

            </p>

          </div>

        </div>
                {/* Performance Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Performance Analytics

          </h2>

          <div className="space-y-8">

            {[
              {
                label: "Overall Accuracy",
                value: 89,
                color: "from-green-500 to-emerald-500",
              },
              {
                label: "Response Quality",
                value: 85,
                color: "from-violet-500 to-purple-600",
              },
              {
                label: "Problem Solving Speed",
                value: 78,
                color: "from-blue-500 to-cyan-500",
              },
              {
                label: "Communication Score",
                value: 92,
                color: "from-orange-500 to-yellow-500",
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">

                    {item.label}

                  </span>

                  <span className="font-bold">

                    {item.value}%

                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                    style={{
                      width: `${item.value}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Difficulty Progression */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-8">

            Difficulty Progression

          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              {
                level: "Easy",
                score: "100%",
                status: "Completed",
              },
              {
                level: "Medium",
                score: "89%",
                status: "Current",
              },
              {
                level: "Hard",
                score: "Locked",
                status: "Next",
              },
              {
                level: "Expert",
                score: "Locked",
                status: "Future",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-6 text-center hover:shadow-lg transition"
              >

                <h3 className="text-xl font-bold">

                  {item.level}

                </h3>

                <p className="text-3xl font-black text-violet-600 mt-4">

                  {item.score}

                </p>

                <span className="inline-block mt-5 px-4 py-2 rounded-full bg-violet-100 text-violet-700 font-semibold">

                  {item.status}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Previous Interview Scores */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Previous Interview Scores

          </h2>

          <div className="space-y-5">

            {[
              {
                interview: "Mock Interview #20",
                score: 92,
              },
              {
                interview: "Mock Interview #21",
                score: 88,
              },
              {
                interview: "Mock Interview #22",
                score: 90,
              },
              {
                interview: "Mock Interview #23",
                score: 86,
              },
              {
                interview: "Mock Interview #24",
                score: 89,
              },
            ].map((item, index) => (

              <div
                key={index}
                className="flex justify-between items-center rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                <h3 className="font-semibold">

                  {item.interview}

                </h3>

                <span className="text-2xl font-black text-violet-600">

                  {item.score}%

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Recommended Next Difficulty */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            AI Recommendation

          </h2>

          <p className="leading-8 text-white/90">

            Your recent performance indicates that you're
            consistently performing well at the Medium level.

            AI recommends gradually introducing Hard-level
            interview questions to improve problem-solving,
            confidence, and readiness for real technical
            interviews.

          </p>

        </div>
                {/* Weak Topic Analysis */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Weak Topic Analysis

          </h2>

          <div className="space-y-6">

            {[
              {
                topic: "Dynamic Programming",
                score: 62,
              },
              {
                topic: "Graphs",
                score: 71,
              },
              {
                topic: "System Design",
                score: 54,
              },
              {
                topic: "Behavioral Questions",
                score: 87,
              },
            ].map((item, index) => (

              <div key={index}>

                <div className="flex justify-between mb-2">

                  <span className="font-semibold">

                    {item.topic}

                  </span>

                  <span className="font-bold">

                    {item.score}%

                  </span>

                </div>

                <div className="w-full h-4 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Learning Timeline */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Learning Progress Timeline

          </h2>

          <div className="space-y-6">

            {[
              {
                title: "Completed Easy Level",
                date: "March 2026",
              },
              {
                title: "Unlocked Medium Questions",
                date: "April 2026",
              },
              {
                title: "Reached 85% Accuracy",
                date: "June 2026",
              },
              {
                title: "Preparing for Hard Level",
                date: "Current",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="flex gap-5 items-start"
              >

                <div className="w-5 h-5 rounded-full bg-violet-600 mt-2"></div>

                <div>

                  <h3 className="font-bold">

                    {item.title}

                  </h3>

                  <p className="text-gray-500 mt-2">

                    {item.date}

                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Personalized Improvement Plan */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-8">

            Personalized Improvement Plan

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              {
                week: "Week 1",
                task: "Practice Dynamic Programming",
              },
              {
                week: "Week 2",
                task: "Solve Advanced Graph Problems",
              },
              {
                week: "Week 3",
                task: "Study System Design Basics",
              },
              {
                week: "Week 4",
                task: "Take Hard-Level Mock Interviews",
              },
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-6"
              >

                <h3 className="text-xl font-bold">

                  {item.week}

                </h3>

                <p className="mt-3 text-gray-500">

                  {item.task}

                </p>

              </div>

            ))}

          </div>

        </div>

        {/* AI Insights */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <h2 className="text-3xl font-bold mb-6">

            AI Progress Insights

          </h2>

          <p className="leading-8 text-white/90">

            Your interview performance has improved steadily.
            AI predicts that after strengthening Dynamic Programming,
            Graph algorithms, and System Design, you will be
            ready to consistently solve Hard-level interview
            questions and perform confidently in technical
            interviews.

          </p>

        </div>
                {/* AI Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow border border-gray-200 dark:border-white/10 p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Difficulty Progression Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Based on your interview history, accuracy, and
            response quality, your performance has consistently
            improved over time. AI recommends transitioning
            from Medium to Hard-level interview questions while
            continuing to strengthen System Design, Dynamic
            Programming, and Graph algorithms.

            Maintaining your current learning pace will improve
            your readiness for real technical interviews.

          </p>

        </div>

        {/* Motivation Banner */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Keep Challenging Yourself 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Growth comes from solving problems just beyond
                your current comfort zone.

                Continue practicing consistently, review your
                mistakes, and embrace harder interview
                questions to become interview-ready for
                top product companies.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🎯

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Next Target

              </h3>

              <p className="text-5xl font-black">

                Hard

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default DifficultyProgression;