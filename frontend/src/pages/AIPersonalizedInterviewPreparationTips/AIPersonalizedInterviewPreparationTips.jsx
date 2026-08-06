import React, { useState } from "react";
import {
  Brain,
  Lightbulb,
  TrendingUp,
  Target,
  Code2,
  BookOpen,
  Activity,
} from "lucide-react";

const AIPersonalizedInterviewPreparationTips = () => {

  const [stats] = useState({
    readiness: 87,
    aiTips: 12,
    weakTopics: 3,
    completedActivities: 26,
  });

  const [tips] = useState([
    "Focus on Dynamic Programming this week.",
    "Revise Behavioral Interview Questions.",
    "Improve Resume Project Descriptions.",
    "Complete one additional Mock Interview.",
    "Practice Medium-level Coding Problems.",
  ]);

  const [activities] = useState([
    "Solved 15 DSA questions",
    "Completed 1 Mock Interview",
    "Updated Resume",
    "Revised Operating Systems",
    "Reviewed Flashcards",
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

              AI Personalized Interview Preparation Tips

            </h1>

            <p className="text-gray-500 mt-2">

              Receive AI-generated interview preparation advice
              based on your recent activity, strengths, and areas
              that need improvement.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <TrendingUp
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

            <Lightbulb
              size={30}
              className="mx-auto text-yellow-500"
            />

            <h3 className="mt-4 text-gray-500">

              AI Tips

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.aiTips}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Target
              size={30}
              className="mx-auto text-red-500"
            />

            <h3 className="mt-4 text-gray-500">

              Weak Topics

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.weakTopics}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Activity
              size={30}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-4 text-gray-500">

              Activities

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.completedActivities}

            </p>

          </div>

        </div>

        {/* AI Tips */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Lightbulb className="text-yellow-500" />

            <h2 className="text-2xl font-bold">

              AI Personalized Tips

            </h2>

          </div>

          <div className="space-y-5">

            {tips.map((tip, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                💡 {tip}

              </div>

            ))}

          </div>

        </div>

        {/* Recent Activity */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Activity className="text-green-600" />

            <h2 className="text-2xl font-bold">

              Recent Activity Summary

            </h2>

          </div>

          <div className="space-y-4">

            {activities.map((activity, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                ✅ {activity}

              </div>

            ))}

          </div>

        </div>

        {/* Weak Topics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <BookOpen className="text-red-500" />

            <h2 className="text-2xl font-bold">

              Topics Requiring Attention

            </h2>

          </div>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              "Dynamic Programming",
              "System Design",
              "Graphs",
            ].map((topic, index) => (

              <div
                key={index}
                className="rounded-2xl border border-red-200 dark:border-red-900/30 p-5 text-center"
              >

                {topic}

              </div>

            ))}

          </div>

        </div>

        {/* Coding Suggestions */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Code2 />

            <h2 className="text-2xl font-bold">

              Coding Practice Suggestions

            </h2>

          </div>

          <ul className="space-y-4">

            <li>• Solve 5 medium-level array problems.</li>
            <li>• Practice two Dynamic Programming questions.</li>
            <li>• Attempt one graph traversal challenge.</li>
            <li>• Revise Binary Search concepts.</li>
            <li>• Complete one timed coding assessment.</li>

          </ul>

        </div>
                {/* Resume Improvement Tips */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Resume Improvement Tips

          </h2>

          <div className="space-y-5">

            {[
              "Add measurable achievements to project descriptions.",
              "Use stronger action verbs in experience sections.",
              "Highlight recent technical projects.",
              "Keep your resume to one page for campus placements.",
            ].map((tip, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                📄 {tip}

              </div>

            ))}

          </div>

        </div>

        {/* Behavioral Interview Guidance */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Behavioral Interview Guidance

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Prepare STAR method answers.",
              "Practice introducing yourself confidently.",
              "Review teamwork experiences.",
              "Prepare examples of problem solving.",
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                💬 {item}

              </div>

            ))}

          </div>

        </div>

        {/* Mock Interview Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            Mock Interview Recommendations

          </h2>

          <ul className="space-y-4">

            <li>• Schedule one technical mock interview this week.</li>
            <li>• Practice explaining your projects in detail.</li>
            <li>• Improve communication speed and clarity.</li>
            <li>• Review feedback before attempting another mock.</li>
            <li>• Focus on confidence during behavioral rounds.</li>

          </ul>

        </div>

        {/* Weekly Insights */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Weekly Improvement Insights

          </h2>

          {[
            ["Coding Progress", 84],
            ["Core Subjects", 79],
            ["Interview Confidence", 81],
            ["Resume Quality", 90],
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

        {/* Readiness Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Readiness Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Based on your recent preparation activity, you have an
            interview readiness score of <strong>{stats.readiness}%</strong>.
            Continue practicing medium-level coding problems, improve
            your behavioral interview responses, and strengthen weak
            technical topics to maximize your preparation.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Keep Learning, Keep Improving 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Personalized AI guidance helps you focus on the
                right topics at the right time. Stay consistent,
                complete your recommendations, and move one step
                closer to interview success.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                💡

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

export default AIPersonalizedInterviewPreparationTips;
