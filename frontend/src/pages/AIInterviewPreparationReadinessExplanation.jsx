import React from "react";
import { Brain, CheckCircle2, AlertTriangle } from "lucide-react";

const factors = [
  {
    name: "Technical Performance",
    score: 86,
    action: "Continue practicing medium and hard questions.",
  },
  {
    name: "Topic Coverage",
    score: 74,
    action: "Revise the topics with low practice coverage.",
  },
  {
    name: "Mock Interviews",
    score: 81,
    action: "Complete more realistic mock interviews.",
  },
  {
    name: "Revision Consistency",
    score: 68,
    action: "Schedule regular revision sessions.",
  },
  {
    name: "Communication",
    score: 79,
    action: "Practice concise technical explanations.",
  },
  {
    name: "Weak-Area Improvement",
    score: 72,
    action: "Focus on repeatedly failed concepts.",
  },
];

export default function AIInterviewPreparationReadinessExplanation() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Interview Readiness Explanation
          </h1>

          <p className="text-gray-500">
            Understand what is driving your interview readiness score.
          </p>
        </div>
      </div>

      {/* Overall Score */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <p className="text-gray-500">
          Overall Readiness
        </p>

        <p className="text-6xl font-black text-indigo-600 mt-2">
          81%
        </p>

        <p className="text-gray-600 mt-2">
          You are making strong progress toward interview readiness.
        </p>

      </div>

      {/* Factors */}
      <div className="bg-white rounded-2xl shadow p-5 space-y-4">

        <h2 className="text-lg font-bold">
          Readiness Breakdown
        </h2>

        {factors.map((factor) => (
          <div
            key={factor.name}
            className="border rounded-xl p-4"
          >

            <div className="flex justify-between items-center">

              <span className="font-semibold">
                {factor.name}
              </span>

              <span className="font-bold">
                {factor.score}%
              </span>

            </div>

            <div className="h-2 bg-gray-200 rounded-full mt-3">

              <div
                className="h-full bg-indigo-600 rounded-full"
                style={{ width: `${factor.score}%` }}
              />

            </div>

            <p className="text-sm text-gray-500 mt-3">
              {factor.action}
            </p>

          </div>
        ))}

      </div>

      {/* AI Explanation */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <CheckCircle2 className="text-green-600" />

          <div>

            <h2 className="font-bold text-green-700">
              Why Your Score Is 81%
            </h2>

            <p className="text-gray-600 mt-2">
              Your technical performance and mock interview results are strong.
              Your readiness is mainly limited by revision consistency and
              incomplete topic coverage.
            </p>

          </div>

        </div>

      </div>

      {/* Priority */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <AlertTriangle className="text-orange-600" />

          <div>

            <h2 className="font-bold text-orange-700">
              Highest-Priority Action
            </h2>

            <p className="text-gray-600 mt-2">
              Improve revision consistency and revisit weak topics before
              increasing the overall practice volume.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}