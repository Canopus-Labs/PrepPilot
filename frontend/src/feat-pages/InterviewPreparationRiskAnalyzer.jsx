import React, { useState } from "react";
import {
  ShieldAlert,
  AlertTriangle,
  Brain,
  BookOpen,
  ClipboardCheck,
  RefreshCcw,
  TrendingDown,
} from "lucide-react";

const AIInterviewPreparationRiskAnalyzer = () => {

  const [stats] = useState({
    riskScore: 38,
    readiness: 82,
    weakTopics: 4,
    missedRevisions: 7,
  });

  const [risks] = useState([
    {
      topic: "Dynamic Programming",
      risk: "High",
      score: 58,
    },
    {
      topic: "Graphs",
      risk: "Medium",
      score: 71,
    },
    {
      topic: "System Design",
      risk: "High",
      score: 54,
    },
    {
      topic: "Operating Systems",
      risk: "Low",
      score: 88,
    },
  ]);

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center">

            <ShieldAlert
              size={34}
              className="text-red-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              AI Interview Preparation Risk Analyzer

            </h1>

            <p className="text-gray-500 mt-2">

              Detect potential preparation risks early using AI.
              Identify weak topics, missed revisions, assessment
              gaps, and study inconsistencies before your interview.

            </p>

          </div>

        </div>

        {/* Dashboard */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              size={30}
              className="mx-auto text-red-600"
            />

            <h3 className="mt-4 text-gray-500">

              Risk Score

            </h3>

            <p className="text-5xl font-black mt-3 text-red-600">

              {stats.riskScore}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Brain
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
              className="mx-auto text-orange-500"
            />

            <h3 className="mt-4 text-gray-500">

              Weak Topics

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.weakTopics}

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <RefreshCcw
              size={30}
              className="mx-auto text-blue-600"
            />

            <h3 className="mt-4 text-gray-500">

              Missed Revisions

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.missedRevisions}

            </p>

          </div>

        </div>

        {/* Overall Risk */}

        <div className="mt-10 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-8">

            Overall Risk Assessment

          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div>

              <h3 className="font-semibold mb-2">

                Overall Risk

              </h3>

              <p className="text-5xl font-black">

                Moderate

              </p>

            </div>

            <div>

              <h3 className="font-semibold mb-2">

                Risk Score

              </h3>

              <p className="text-5xl font-black">

                {stats.riskScore}%

              </p>

            </div>

            <div>

              <h3 className="font-semibold mb-2">

                Readiness

              </h3>

              <p className="text-5xl font-black">

                {stats.readiness}%

              </p>

            </div>

          </div>

        </div>

        {/* Weak Topic Analysis */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Weak Topic Risk Analysis

          </h2>

          {risks.map((item, index) => (

            <div
              key={index}
              className="border-b border-gray-200 dark:border-white/10 py-6"
            >

              <div className="flex justify-between mb-3">

                <h3 className="font-bold">

                  {item.topic}

                </h3>

                <span
                  className={`font-bold ${
                    item.risk === "High"
                      ? "text-red-500"
                      : item.risk === "Medium"
                      ? "text-yellow-500"
                      : "text-green-500"
                  }`}
                >

                  {item.risk} Risk

                </span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-red-500 to-orange-500"
                  style={{ width: `${item.score}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Assessment Scores */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <ClipboardCheck className="text-green-600" />

            <h2 className="text-2xl font-bold">

              Assessment Score Analysis

            </h2>

          </div>

          {[
            ["DSA Assessment", 76],
            ["Core Subjects", 81],
            ["Mock Interview", 72],
            ["Behavioral Round", 85],
          ].map(([title, score], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{title}</span>

                <span>{score}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{ width: `${score}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Missed Revision Tracker */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <TrendingDown className="text-red-500" />

            <h2 className="text-2xl font-bold">

              Missed Revision Tracker

            </h2>

          </div>

          <div className="space-y-5">

            {[
              "Dynamic Programming",
              "Graphs",
              "Operating Systems",
              "Computer Networks",
            ].map((topic, index) => (

              <div
                key={index}
                className="rounded-xl border border-red-200 dark:border-red-900/30 p-5"
              >

                ⚠️ {topic}

              </div>

            ))}

          </div>

        </div>
                {/* Mock Interview Performance */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Mock Interview Performance

          </h2>

          {[
            ["Technical Interview", 72],
            ["HR Interview", 84],
            ["System Design", 63],
            ["Communication", 79],
          ].map(([label, value], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{ width: `${value}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Study Habit Consistency */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Study Habit Consistency

          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Studied 5 of last 7 days",
              "Average 2.5 study hours/day",
              "Missed 3 revision sessions",
              "Current streak: 6 days",
            ].map((item, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                📅 {item}

              </div>

            ))}

          </div>

        </div>

        {/* Priority Actions */}

        <div className="mt-10 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            Priority Action Plan

          </h2>

          <ul className="space-y-4">

            <li>• Revise Dynamic Programming immediately.</li>

            <li>• Complete one System Design mock interview.</li>

            <li>• Finish all missed revision sessions this week.</li>

            <li>• Practice two medium-level Graph questions daily.</li>

            <li>• Increase study consistency before your interview.</li>

          </ul>

        </div>

        {/* AI Suggestions */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Improvement Suggestions

          </h2>

          <div className="space-y-5">

            {[
              "Allocate extra study time to high-risk topics.",
              "Review mock interview feedback after every session.",
              "Maintain a daily revision schedule.",
              "Solve additional coding problems in weaker topics.",
              "Take one full mock interview before your actual interview.",
            ].map((tip, index) => (

              <div
                key={index}
                className="rounded-2xl border border-gray-200 dark:border-white/10 p-5"
              >

                💡 {tip}

              </div>

            ))}

          </div>

        </div>

        {/* Risk Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Risk Analytics

          </h2>

          {[
            ["Preparation Risk", 38],
            ["Interview Readiness", 82],
            ["Revision Coverage", 74],
            ["Study Consistency", 79],
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

                Reduce Risks, Increase Confidence 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Identifying preparation risks early gives you time to
                improve before interview day. Follow the AI action plan,
                strengthen weak areas, and stay consistent to maximize
                your interview success.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                🛡️

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Risk Score

              </h3>

              <p className="text-5xl font-black">

                {stats.riskScore}%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AIInterviewPreparationRiskAnalyzer;