import React, { useState } from "react";
import {
  Brain,
  RefreshCw,
  History,
  Sparkles,
  Shuffle,
  BarChart3,
  Target,
} from "lucide-react";

const AIDynamicInterviewQuestionRotation = () => {

  const [stats] = useState({
    attempted: 528,
    unseen: 146,
    revisionQueue: 74,
    coverage: 91,
  });

  const [attemptedQuestions] = useState([
    {
      title: "Two Sum",
      company: "Amazon",
      difficulty: "Easy",
    },
    {
      title: "LRU Cache",
      company: "Google",
      difficulty: "Hard",
    },
    {
      title: "Merge Intervals",
      company: "Microsoft",
      difficulty: "Medium",
    },
    {
      title: "Word Ladder",
      company: "Meta",
      difficulty: "Hard",
    },
  ]);

  const [unseenQuestions] = useState([
    "Median of Two Sorted Arrays",
    "Serialize Binary Tree",
    "Alien Dictionary",
    "Design File System",
  ]);

  const [topics] = useState([
    {
      topic: "Arrays",
      rotation: 92,
    },
    {
      topic: "Graphs",
      rotation: 81,
    },
    {
      topic: "Dynamic Programming",
      rotation: 74,
    },
    {
      topic: "System Design",
      rotation: 63,
    },
  ]);

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <RefreshCw
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              AI Dynamic Interview Question Rotation

            </h1>

            <p className="text-gray-500 mt-2">

              Practice smarter with AI-powered question rotation that
              reduces repetition, prioritizes unseen problems, and
              schedules intelligent revisions.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <History
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Attempted

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.attempted}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Sparkles
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Unseen

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.unseen}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Shuffle
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Revision Queue

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.revisionQueue}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BarChart3
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Coverage

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.coverage}%

            </p>

          </div>

        </div>

        {/* Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Rotation Engine

          </h2>

          <p className="leading-8 text-white/90">

            The AI rotation engine analyzes your solved questions,
            interview history, weak topics, and revision schedule to
            deliver fresh, balanced, and personalized interview
            practice every session.

          </p>

        </div>

        {/* Previously Attempted Questions */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <History className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Previously Attempted Questions

            </h2>

          </div>

          <div className="space-y-5">

            {attemptedQuestions.map((item, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5 flex justify-between items-center"
              >

                <div>

                  <h3 className="font-bold">

                    {item.title}

                  </h3>

                  <p className="text-gray-500 mt-1">

                    {item.company}

                  </p>

                </div>

                <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">

                  {item.difficulty}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Unseen Queue */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Sparkles className="text-green-600" />

            <h2 className="text-2xl font-bold">

              Prioritized Unseen Questions

            </h2>

          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {unseenQuestions.map((question, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                ✨ {question}

              </div>

            ))}

          </div>

        </div>

        {/* Topic Rotation */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Target className="text-blue-600" />

            <h2 className="text-2xl font-bold">

              Topic Rotation Progress

            </h2>

          </div>

          {topics.map((item, index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{item.topic}</span>

                <span>{item.rotation}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{ width: `${item.rotation}%` }}
                />

              </div>

            </div>

          ))}
                  {/* Difficulty Balancing */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Difficulty Balancing

          </h2>

          {[
            ["Easy Questions", 32],
            ["Medium Questions", 46],
            ["Hard Questions", 22],
          ].map(([label, value], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
                  style={{ width: `${value}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Revision Queue */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <RefreshCw className="text-green-600" />

            <h2 className="text-2xl font-bold">

              Smart Revision Queue

            </h2>

          </div>

          <div className="space-y-5">

            {[
              "Binary Search",
              "Graph Traversal",
              "LRU Cache",
              "Merge Intervals",
              "System Design Basics",
            ].map((question, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                🔁 {question}

              </div>

            ))}

          </div>

        </div>

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Practice Recommendations

          </h2>

          <ul className="space-y-4">

            <li>• Solve more unseen Graph problems this week.</li>

            <li>• Revisit Dynamic Programming questions after 3 days.</li>

            <li>• Mix Easy and Hard questions to improve adaptability.</li>

            <li>• Complete one System Design question daily.</li>

            <li>• Reduce repeated Array practice to increase topic coverage.</li>

          </ul>

        </div>

        {/* Rotation Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Rotation Analytics

          </h2>

          {[
            ["Topic Coverage", stats.coverage],
            ["Unseen Questions Completed", 84],
            ["Revision Accuracy", 89],
            ["Rotation Efficiency", 93],
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

                Practice Smarter Every Day 🚀

              </h2>

              <p className="leading-8 text-white/90">

                AI continuously rotates interview questions based on
                your preparation history, ensuring fresh challenges,
                balanced difficulty, and timely revision for long-term
                mastery.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🔄

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Coverage

              </h3>

              <p className="text-5xl font-black">

                {stats.coverage}%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AIDynamicInterviewQuestionRotation;