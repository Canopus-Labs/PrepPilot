import React, { useState } from "react";
import {
  Brain,
  BookOpen,
  TrendingUp,
  Target,
  CheckCircle2,
  BarChart3,
  Award,
} from "lucide-react";

const AITopicMasteryProgressBar = () => {

  const [stats] = useState({
    mastered: 12,
    averageMastery: 82,
    confidence: 86,
    accuracy: 88,
  });

  const [topics] = useState([
    {
      name: "Arrays",
      mastery: 96,
      confidence: 95,
      attempted: 120,
      accuracy: 94,
    },
    {
      name: "Linked Lists",
      mastery: 88,
      confidence: 86,
      attempted: 78,
      accuracy: 90,
    },
    {
      name: "Dynamic Programming",
      mastery: 61,
      confidence: 58,
      attempted: 54,
      accuracy: 67,
    },
    {
      name: "Graphs",
      mastery: 72,
      confidence: 69,
      attempted: 48,
      accuracy: 74,
    },
  ]);

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

              AI Topic Mastery Progress Bar

            </h1>

            <p className="text-gray-500 mt-2">

              Track how well you've mastered each interview topic
              using AI-powered mastery scores, confidence analysis,
              and personalized progress insights.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Award
              size={30}
              className="mx-auto text-violet-600"
            />

            <h3 className="mt-4 text-gray-500">

              Mastered Topics

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.mastered}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
              size={30}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-4 text-gray-500">

              Avg. Mastery

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.averageMastery}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              size={30}
              className="mx-auto text-orange-500"
            />

            <h3 className="mt-4 text-gray-500">

              Confidence

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.confidence}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <CheckCircle2
              size={30}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 text-gray-500">

              Accuracy

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.accuracy}%

            </p>

          </div>

        </div>

        {/* Topic Mastery */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Topic Mastery Progress

          </h2>

          {topics.map((topic, index) => (

            <div
              key={index}
              className="mb-10 border-b border-gray-200 dark:border-white/10 pb-8"
            >

              <div className="flex justify-between items-center mb-3">

                <h3 className="text-xl font-bold">

                  {topic.name}

                </h3>

                <span className="font-bold text-violet-600">

                  {topic.mastery}%

                </span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{
                    width: `${topic.mastery}%`,
                  }}
                />

              </div>

              <div className="grid md:grid-cols-3 gap-6 mt-6">

                <div className="rounded-xl border border-gray-200 dark:border-white/10 p-5">

                  <BookOpen className="text-violet-600 mb-3" />

                  <h4 className="font-semibold">

                    Questions Attempted

                  </h4>

                  <p className="text-3xl font-bold mt-2">

                    {topic.attempted}

                  </p>

                </div>

                <div className="rounded-xl border border-gray-200 dark:border-white/10 p-5">

                  <Target className="text-green-600 mb-3" />

                  <h4 className="font-semibold">

                    Confidence Score

                  </h4>

                  <p className="text-3xl font-bold mt-2">

                    {topic.confidence}%

                  </p>

                </div>

                <div className="rounded-xl border border-gray-200 dark:border-white/10 p-5">

                  <BarChart3 className="text-blue-600 mb-3" />

                  <h4 className="font-semibold">

                    Accuracy Rate

                  </h4>

                  <p className="text-3xl font-bold mt-2">

                    {topic.accuracy}%

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>
                {/* Revision Status */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Revision Status

          </h2>

          {[
            ["Arrays", "Completed"],
            ["Linked Lists", "Completed"],
            ["Dynamic Programming", "Needs Revision"],
            ["Graphs", "In Progress"],
          ].map(([topic, status], index) => (

            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 dark:border-white/10 py-5"
            >

              <span className="font-semibold">

                {topic}

              </span>

              <span
                className={`font-bold ${
                  status === "Completed"
                    ? "text-green-600"
                    : status === "Needs Revision"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >

                {status}

              </span>

            </div>

          ))}

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Practice Recommendations

          </h2>

          <ul className="space-y-4 text-white/90">

            <li>• Practice more Dynamic Programming problems.</li>

            <li>• Revise Graph algorithms before your next mock interview.</li>

            <li>• Continue strengthening Arrays and Linked Lists.</li>

            <li>• Attempt advanced coding questions this week.</li>

            <li>• Schedule one revision session for every weak topic.</li>

          </ul>

        </div>

        {/* Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Mastery Analytics

          </h2>

          {[
            ["Topic Mastery", 82],
            ["Confidence", 86],
            ["Accuracy", 88],
            ["Revision Progress", 79],
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

        {/* Achievement Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            Achievement Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            You have mastered <strong>{stats.mastered}</strong> interview
            topics with an average mastery score of{" "}
            <strong>{stats.averageMastery}%</strong>. Continue focusing on
            weaker areas to increase your confidence and overall interview
            readiness.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Master Every Topic 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Every revision session strengthens your understanding.
                Keep practicing consistently, improve your weak areas,
                and let AI guide you toward complete interview mastery.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🏆

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Mastery Score

              </h3>

              <p className="text-5xl font-black">

                {stats.averageMastery}%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AITopicMasteryProgressBar;