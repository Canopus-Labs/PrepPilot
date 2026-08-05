import React, { useState } from "react";
import {
  Brain,
  TrendingUp,
  Target,
  Award,
  AlertTriangle,
  BookOpen,
  Activity,
} from "lucide-react";

const AIPreparationProgressInsights = () => {

  const [stats] = useState({
    readiness: 88,
    completed: 24,
    strongTopics: 6,
    weakTopics: 3,
  });

  const [strongTopics] = useState([
    "Arrays",
    "Strings",
    "Linked Lists",
    "SQL",
    "Operating Systems",
    "Object-Oriented Programming",
  ]);

  const [weakTopics] = useState([
    "Dynamic Programming",
    "System Design",
    "Graphs",
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

              AI Preparation Progress Insights

            </h1>

            <p className="text-gray-500 mt-2">

              View AI-generated insights summarizing your interview
              preparation progress, strengths, weaknesses, and
              personalized recommendations.

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

            <BookOpen
              size={30}
              className="mx-auto text-green-600"
            />

            <h3 className="mt-4 text-gray-500">

              Topics Completed

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.completed}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Award
              size={30}
              className="mx-auto text-yellow-500"
            />

            <h3 className="mt-4 text-gray-500">

              Strong Topics

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.strongTopics}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              size={30}
              className="mx-auto text-red-500"
            />

            <h3 className="mt-4 text-gray-500">

              Need Attention

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.weakTopics}

            </p>

          </div>

        </div>

        {/* Weekly Summary */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <div className="flex items-center gap-3 mb-6">

            <Activity />

            <h2 className="text-2xl font-bold">

              Weekly Preparation Summary

            </h2>

          </div>

          <ul className="space-y-4 text-white/90">

            <li>✅ Solved 38 coding problems</li>

            <li>✅ Completed 2 mock interviews</li>

            <li>✅ Revised 5 core CS subjects</li>

            <li>✅ Improved interview readiness by 6%</li>

            <li>✅ Maintained a 14-day study streak</li>

          </ul>

        </div>

        {/* Strongest Topics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Award className="text-green-600" />

            <h2 className="text-2xl font-bold">

              Strongest Topics

            </h2>

          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {strongTopics.map((topic, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5 text-center"
              >

                <h3 className="font-semibold">

                  {topic}

                </h3>

              </div>

            ))}

          </div>

        </div>

        {/* Topics Requiring Attention */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <AlertTriangle className="text-orange-500" />

            <h2 className="text-2xl font-bold">

              Topics Requiring Attention

            </h2>

          </div>

          <div className="space-y-5">

            {weakTopics.map((topic, index) => (

              <div
                key={index}
                className="rounded-2xl border border-red-200 dark:border-red-900/30 p-5 flex justify-between items-center"
              >

                <span className="font-semibold">

                  {topic}

                </span>

                <span className="text-red-500 font-bold">

                  Needs Revision

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Readiness Overview */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Interview Readiness

          </h2>

          <h1 className="text-6xl font-black">

            {stats.readiness}%

          </h1>

          <p className="mt-5 leading-8">

            Based on your recent preparation, assessments,
            and learning activity, you are progressing well.
            Strengthening weak topics can significantly
            improve your interview performance.

          </p>

        </div>
                {/* Suggested Next Activities */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Suggested Next Activities

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Revise Dynamic Programming",
              "Complete one Mock Interview",
              "Practice Graph Algorithms",
              "Review HR Interview Questions",
              "Solve 10 Aptitude Problems",
              "Update Resume Projects",
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5 flex items-center gap-3"
              >

                <Target className="text-violet-600" />

                <span>{item}</span>

              </div>

            ))}

          </div>

        </div>

        {/* Weekly Improvement */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp className="text-green-600" />

            <h2 className="text-2xl font-bold">

              Weekly Improvement Trends

            </h2>

          </div>

          {[
            ["Week 1", 61],
            ["Week 2", 72],
            ["Week 3", 80],
            ["Week 4", 88],
          ].map(([week, value], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{week}</span>

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

        {/* AI Recommendations */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Personalized Recommendations

          </h2>

          <ul className="space-y-4 text-white/90">

            <li>• Focus on Dynamic Programming before your next mock interview.</li>

            <li>• Spend 30 minutes daily reviewing Graph algorithms.</li>

            <li>• Continue revising Operating Systems to maintain your strength.</li>

            <li>• Schedule another mock interview this weekend.</li>

            <li>• Complete your resume review before applying for placements.</li>

          </ul>

        </div>

        {/* Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Progress Analytics

          </h2>

          {[
            ["Preparation Progress", 88],
            ["Concept Retention", 84],
            ["Revision Consistency", 91],
            ["Interview Confidence", 86],
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

        {/* Performance Summary */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-6">

            AI Performance Summary

          </h2>

          <p className="leading-8 text-gray-600 dark:text-gray-300">

            Your preparation has shown consistent improvement over the
            past few weeks. You have built strong foundations in core
            interview topics while a few advanced concepts still need
            additional revision. Following the AI recommendations will
            help increase your interview readiness and confidence.

          </p>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">

                Keep Improving Every Week 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Small improvements every day lead to outstanding
                interview performance. Trust the insights, focus on
                your weak areas, and continue building confidence.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📈

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Readiness Score

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

export default AIPreparationProgressInsights;