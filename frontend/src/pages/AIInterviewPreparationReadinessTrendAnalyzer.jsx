import React, { useState } from "react";
import {
  Brain,
  TrendingUp,
  TrendingDown,
  Target,
  MessageSquare,
  Code2,
  BookOpen,
  Mic2,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const trendData = [
  {
    period: "Week 1",
    readiness: 54,
    technical: 58,
    coverage: 46,
    mock: 50,
    communication: 55,
  },
  {
    period: "Week 2",
    readiness: 61,
    technical: 64,
    coverage: 55,
    mock: 57,
    communication: 59,
  },
  {
    period: "Week 3",
    readiness: 68,
    technical: 70,
    coverage: 63,
    mock: 65,
    communication: 66,
  },
  {
    period: "Week 4",
    readiness: 76,
    technical: 79,
    coverage: 71,
    mock: 73,
    communication: 75,
  },
  {
    period: "Week 5",
    readiness: 82,
    technical: 84,
    coverage: 78,
    mock: 80,
    communication: 81,
  },
];

const dimensions = [
  {
    title: "Technical Performance",
    value: 84,
    icon: Code2,
  },
  {
    title: "Topic Coverage",
    value: 78,
    icon: BookOpen,
  },
  {
    title: "Mock Interview",
    value: 80,
    icon: Mic2,
  },
  {
    title: "Communication",
    value: 81,
    icon: MessageSquare,
  },
];

export default function AIInterviewPreparationReadinessTrendAnalyzer() {
  const [selected, setSelected] = useState(
    trendData[trendData.length - 1]
  );

  const firstScore = trendData[0].readiness;
  const currentScore = trendData[trendData.length - 1].readiness;
  const improvement = currentScore - firstScore;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Readiness Trend Analyzer
          </h1>

          <p className="text-gray-500">
            Understand how your overall interview readiness is changing over
            time.
          </p>
        </div>

      </div>

      {/* Current Readiness */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex justify-between items-center">

          <div>

            <p className="text-sm text-gray-500">
              Current Interview Readiness
            </p>

            <p className="text-6xl font-black text-indigo-600 mt-2">
              {currentScore}%
            </p>

            <div className="flex items-center gap-2 mt-3 text-green-600 font-semibold">
              <TrendingUp size={19} />
              +{improvement}% since Week 1
            </div>

          </div>

          <div className="p-4 rounded-2xl bg-white">
            <Target className="text-indigo-600" size={40} />
          </div>

        </div>

      </div>

      {/* Dimension Cards */}
      <div className="grid md:grid-cols-4 gap-4">

        {dimensions.map((dimension) => {
          const Icon = dimension.icon;

          return (
            <div
              key={dimension.title}
              className="bg-white rounded-2xl shadow p-5"
            >

              <Icon className="text-indigo-600" size={24} />

              <p className="text-sm text-gray-500 mt-4">
                {dimension.title}
              </p>

              <p className="text-3xl font-black text-gray-800 mt-1">
                {dimension.value}%
              </p>

              <div className="h-2 bg-gray-200 rounded-full mt-3">

                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${dimension.value}%`,
                  }}
                />

              </div>

            </div>
          );
        })}

      </div>

      {/* Trend Chart */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex justify-between items-center">

          <div>

            <h2 className="font-bold text-lg">
              Readiness Trend
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Select a period to inspect the reasons behind the score.
            </p>

          </div>

          <TrendingUp className="text-indigo-600" />

        </div>

        {/* Simple visual chart */}
        <div className="flex items-end gap-4 h-64 mt-8">

          {trendData.map((item) => (
            <button
              type="button"
              key={item.period}
              onClick={() => setSelected(item)}
              className="flex-1 h-full flex flex-col justify-end items-center gap-2"
            >

              <span className="text-sm font-bold text-indigo-600">
                {item.readiness}%
              </span>

              <div
                className={`w-full rounded-t-xl transition ${
                  selected.period === item.period
                    ? "bg-indigo-700"
                    : "bg-indigo-400"
                }`}
                style={{
                  height: `${item.readiness}%`,
                }}
              />

              <span className="text-xs text-gray-500">
                {item.period}
              </span>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Period */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          {selected.period} Readiness Breakdown
        </h2>

        <div className="grid md:grid-cols-4 gap-4 mt-5">

          {[
            ["Technical", selected.technical],
            ["Coverage", selected.coverage],
            ["Mock Interview", selected.mock],
            ["Communication", selected.communication],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-gray-50 rounded-xl p-4"
            >

              <p className="text-sm text-gray-500">
                {label}
              </p>

              <p className="text-2xl font-black text-indigo-600 mt-1">
                {value}%
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* Positive Trend */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <CheckCircle2 className="text-green-600" />

          <div>

            <h2 className="font-bold text-green-700">
              Positive Trend Detected
            </h2>

            <p className="text-gray-600 mt-2">
              Your readiness has improved consistently across the last five
              weeks. Technical performance and mock interview results are the
              strongest contributors to the increase.
            </p>

          </div>

        </div>

      </div>

      {/* Regression */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <AlertTriangle className="text-orange-600" />

          <div>

            <h2 className="font-bold text-orange-700">
              Watch for Potential Regression
            </h2>

            <p className="text-gray-600 mt-2">
              Topic coverage is improving more slowly than technical
              performance. Continue revising weaker topics so your overall
              readiness remains balanced.
            </p>

          </div>

        </div>

      </div>

      {/* AI Explanation */}
      <div className="bg-indigo-50 rounded-2xl p-5">

        <h2 className="font-bold text-indigo-700">
          AI Explanation for the Trend
        </h2>

        <p className="text-gray-600 mt-2">
          The readiness increase is mainly associated with stronger technical
          performance, improved mock interview results, and broader topic
          coverage. Your communication score is also rising steadily, making
          the overall improvement more consistent rather than dependent on a
          single skill.
        </p>

      </div>

      {/* Recommendation */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Recommended Preparation Strategy
        </h2>

        <div className="space-y-3 mt-4">

          {[
            "Continue technical practice at the current difficulty.",
            "Increase revision of topics with lower recent performance.",
            "Complete at least one mock interview during the next preparation cycle.",
            "Practice concise explanations to maintain communication progress.",
          ].map((recommendation) => (
            <div
              key={recommendation}
              className="flex gap-3 p-3 rounded-xl bg-gray-50"
            >

              <CheckCircle2
                className="text-indigo-600"
                size={20}
              />

              <p className="text-gray-700">
                {recommendation}
              </p>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}