    import React, { useState } from "react";
import {
  Brain,
  TrendingUp,
  MessageSquare,
  Code2,
  Filter,
  CalendarDays,
  BarChart3,
} from "lucide-react";

const AIInterviewConfidenceTrendGraph = () => {

  const [stats] = useState({
    confidence: 87,
    communication: 84,
    technicalAccuracy: 89,
    completionRate: 96,
  });

  const [period, setPeriod] = useState("Last 4 Weeks");

  const confidenceTrend = [
    { label: "Week 1", value: 62 },
    { label: "Week 2", value: 71 },
    { label: "Week 3", value: 79 },
    { label: "Week 4", value: 87 },
  ];

  const communicationTrend = [
    { label: "Week 1", value: 60 },
    { label: "Week 2", value: 69 },
    { label: "Week 3", value: 77 },
    { label: "Week 4", value: 84 },
  ];

  const technicalTrend = [
    { label: "Week 1", value: 68 },
    { label: "Week 2", value: 75 },
    { label: "Week 3", value: 82 },
    { label: "Week 4", value: 89 },
  ];

  return (

    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <TrendingUp
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">

              AI Interview Confidence Trend Graph

            </h1>

            <p className="text-gray-500 mt-2">

              Visualize how your interview confidence, communication,
              and technical performance improve across multiple mock
              interview sessions.

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

              Confidence

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.confidence}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <MessageSquare
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Communication

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.communication}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <Code2
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Technical Accuracy

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.technicalAccuracy}%

            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <BarChart3
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">

              Completion Rate

            </h3>

            <p className="text-5xl font-black mt-3">

              {stats.completionRate}%

            </p>

          </div>

        </div>

        {/* Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            Confidence Trend Overview

          </h2>

          <p className="leading-8 text-white/90">

            AI continuously evaluates your mock interviews to estimate
            confidence, communication quality, technical accuracy,
            response clarity, and completion consistency. Compare your
            growth over time to identify long-term improvement.

          </p>

        </div>

        {/* Filter */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-6">

            <Filter className="text-violet-600" />

            <h2 className="text-2xl font-bold">

              Time Range

            </h2>

          </div>

          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            className="rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] p-4 w-full md:w-72"
          >

            <option>Last 4 Weeks</option>
            <option>Last 3 Months</option>
            <option>Last 6 Months</option>
            <option>All Time</option>

          </select>

        </div>

        {/* Confidence Trend */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            AI Confidence Trend

          </h2>

          {confidenceTrend.map((item, index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{item.label}</span>

                <span>{item.value}%</span>

              </div>

              <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-violet-500 to-purple-600"
                  style={{ width: `${item.value}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Communication */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquare className="text-green-600" />

            <h2 className="text-2xl font-bold">

              Communication Quality

            </h2>

          </div>

          {communicationTrend.map((item, index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{item.label}</span>

                <span>{item.value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${item.value}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Technical Accuracy */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <Code2 className="text-blue-600" />

            <h2 className="text-2xl font-bold">

              Technical Accuracy Trend

            </h2>

          </div>

          {technicalTrend.map((item, index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{item.label}</span>

                <span>{item.value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                  style={{ width: `${item.value}%` }}
                />

              </div>

            </div>

          ))}

        </div>
                {/* Response Clarity Trend */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Response Clarity Trend

          </h2>

          {[
            ["Week 1", 64],
            ["Week 2", 73],
            ["Week 3", 81],
            ["Week 4", 88],
          ].map(([week, score], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{week}</span>

                <span>{score}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
                  style={{ width: `${score}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Interview Completion Rate */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <CalendarDays className="text-orange-500" />

            <h2 className="text-2xl font-bold">

              Interview Completion Rate

            </h2>

          </div>

          {[
            ["Week 1", 82],
            ["Week 2", 88],
            ["Week 3", 93],
            ["Week 4", 96],
          ].map(([week, score], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{week}</span>

                <span>{score}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-yellow-500"
                  style={{ width: `${score}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* AI Insights */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">

            AI Confidence Insights

          </h2>

          <ul className="space-y-4">

            <li>• Confidence has improved consistently over recent mock interviews.</li>

            <li>• Communication quality is improving but can benefit from more HR practice.</li>

            <li>• Technical accuracy is your strongest performance metric.</li>

            <li>• Focus on improving response clarity during system design discussions.</li>

            <li>• Continue weekly mock interviews to maintain growth.</li>

          </ul>

        </div>

        {/* Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">

            Performance Analytics

          </h2>

          {[
            ["Confidence Growth", stats.confidence],
            ["Communication", stats.communication],
            ["Technical Accuracy", stats.technicalAccuracy],
            ["Interview Completion", stats.completionRate],
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

                Watch Your Confidence Grow 🚀

              </h2>

              <p className="leading-8 text-white/90">

                Every mock interview builds experience and confidence.
                Use these trends to understand your strengths, improve
                weaker areas, and prepare with measurable progress
                before your next interview.

              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">

                📈

              </div>

              <h3 className="mt-4 text-2xl font-bold">

                Confidence

              </h3>

              <p className="text-5xl font-black">

                {stats.confidence}%

              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AIInterviewConfidenceTrendGraph;