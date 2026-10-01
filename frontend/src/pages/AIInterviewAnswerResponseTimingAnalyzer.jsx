import React from "react";
import { Brain, Clock, TrendingUp, AlertTriangle } from "lucide-react";

const sections = [
  { name: "Thinking Time", time: "12s", score: 80 },
  { name: "Problem Explanation", time: "35s", score: 72 },
  { name: "Solution Explanation", time: "65s", score: 91 },
  { name: "Example", time: "42s", score: 64 },
  { name: "Conclusion", time: "10s", score: 85 },
];

export default function AIInterviewAnswerResponseTimingAnalyzer() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Response Timing Analyzer
          </h1>

          <p className="text-gray-500">
            Understand how effectively you spend time during your answers.
          </p>
        </div>
      </div>

      {/* Overall */}
      <div className="bg-blue-50 rounded-2xl p-6 text-center">
        <Clock className="mx-auto text-blue-600" size={30} />

        <p className="text-gray-500 mt-3">
          Timing Efficiency
        </p>

        <p className="text-6xl font-black text-blue-600">
          81%
        </p>

        <p className="text-gray-600 mt-2">
          Total response time: 2m 44s
        </p>
      </div>

      {/* Breakdown */}
      <div className="bg-white rounded-2xl shadow p-5 space-y-4">

        <h2 className="text-lg font-bold">
          Response Timing Breakdown
        </h2>

        {sections.map((section) => (
          <div key={section.name} className="border rounded-xl p-4">

            <div className="flex justify-between">
              <span className="font-semibold">
                {section.name}
              </span>

              <span className="font-bold">
                {section.time}
              </span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full mt-3">
              <div
                className="h-full bg-blue-600 rounded-full"
                style={{ width: `${section.score}%` }}
              />
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Timing score: {section.score}%
            </p>

          </div>
        ))}

      </div>

      {/* Insights */}
      <div className="grid md:grid-cols-2 gap-4">

        <div className="bg-green-50 rounded-2xl p-5">
          <TrendingUp className="text-green-600" />

          <h3 className="font-bold mt-3">
            Strong Area
          </h3>

          <p className="text-gray-600 mt-2">
            Your solution explanation receives the most appropriate amount of
            time.
          </p>
        </div>

        <div className="bg-orange-50 rounded-2xl p-5">
          <AlertTriangle className="text-orange-600" />

          <h3 className="font-bold mt-3">
            AI Suggestion
          </h3>

          <p className="text-gray-600 mt-2">
            Your example section is taking longer than necessary. Keep examples
            focused on the key result.
          </p>
        </div>

      </div>

    </div>
  );
}