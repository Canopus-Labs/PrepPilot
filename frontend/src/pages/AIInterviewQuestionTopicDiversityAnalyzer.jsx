import React from "react";
import {
  Brain,
  PieChart,
  AlertTriangle,
  Target,
} from "lucide-react";

const topics = [
  { name: "DSA", count: 32, level: "High" },
  { name: "SQL", count: 18, level: "Medium" },
  { name: "System Design", count: 6, level: "Low" },
  { name: "OOP", count: 4, level: "Low" },
];

export default function AIInterviewQuestionTopicDiversityAnalyzer() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Topic Diversity Analyzer
          </h1>

          <p className="text-gray-500">
            Understand how balanced your interview practice has been.
          </p>
        </div>

      </div>

      {/* Diversity Score */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <PieChart
          className="mx-auto text-indigo-600"
          size={30}
        />

        <p className="text-gray-500 mt-3">
          Practice Diversity Score
        </p>

        <p className="text-6xl font-black text-indigo-600">
          68%
        </p>

        <p className="text-gray-600 mt-2">
          Your practice is moderately diverse.
        </p>

      </div>

      {/* Topic Distribution */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Topic Distribution
        </h2>

        <div className="space-y-4 mt-4">

          {topics.map((topic) => (
            <div key={topic.name}>

              <div className="flex justify-between">
                <span className="font-semibold">
                  {topic.name}
                </span>

                <span className="text-gray-500">
                  {topic.count} questions
                </span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-2">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${Math.min(topic.count * 2.5, 100)}%`,
                  }}
                />
              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Analysis */}
      <div className="grid sm:grid-cols-2 gap-4">

        <div className="bg-orange-50 rounded-2xl p-5">

          <div className="flex gap-3">
            <AlertTriangle className="text-orange-600" />

            <div>
              <h2 className="font-bold text-orange-700">
                Over-Practiced
              </h2>

              <p className="text-gray-600 mt-2">
                DSA represents a large portion of your recent practice.
                Consider reducing repetition temporarily.
              </p>
            </div>
          </div>

        </div>

        <div className="bg-green-50 rounded-2xl p-5">

          <div className="flex gap-3">
            <Target className="text-green-600" />

            <div>
              <h2 className="font-bold text-green-700">
                Neglected Topics
              </h2>

              <p className="text-gray-600 mt-2">
                System Design and OOP need additional practice to improve
                overall topic coverage.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Recommendation */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          AI Recommendation
        </h2>

        <p className="text-gray-600 mt-3">
          For your next session, practice 2 System Design questions, 2 OOP
          questions, and 1 SQL question before returning to DSA.
        </p>

      </div>

    </div>
  );
}