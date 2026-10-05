import React from "react";
import {
  Brain,
  BookOpen,
  Target,
  CheckCircle2,
} from "lucide-react";

const recommendation = {
  title: "Dynamic Programming Practice Set",
  relevance: 92,
  skill: "Dynamic Programming",
  outcome: "Improve pattern recognition and optimization skills.",
  role: "Relevant for Software Developer interviews.",
};

export default function AIInterviewPreparationResourceRecommendationExplanation() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Resource Recommendation Explanation
          </h1>

          <p className="text-gray-500">
            Understand why each learning resource is recommended.
          </p>
        </div>

      </div>

      {/* Recommendation */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">
          <BookOpen className="text-indigo-600" />

          <div>
            <p className="text-sm text-gray-500">
              Recommended Resource
            </p>

            <h2 className="text-xl font-bold">
              {recommendation.title}
            </h2>
          </div>
        </div>

      </div>

      {/* Relevance */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <Target className="mx-auto text-indigo-600" />

        <p className="text-gray-500 mt-3">
          AI Relevance Score
        </p>

        <p className="text-6xl font-black text-indigo-600">
          {recommendation.relevance}%
        </p>

        <p className="text-gray-600 mt-2">
          Highly relevant to your current preparation needs.
        </p>

      </div>

      {/* Explanation */}
      <div className="bg-white rounded-2xl shadow p-5 space-y-4">

        <h2 className="text-lg font-bold">
          Why This Was Recommended
        </h2>

        <div className="border rounded-xl p-4">
          <p className="font-semibold">
            Related Weak Skill
          </p>

          <p className="text-gray-500 mt-1">
            {recommendation.skill}
          </p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="font-semibold">
            Expected Learning Outcome
          </p>

          <p className="text-gray-500 mt-1">
            {recommendation.outcome}
          </p>
        </div>

        <div className="border rounded-xl p-4">
          <p className="font-semibold">
            Target Role Connection
          </p>

          <p className="text-gray-500 mt-1">
            {recommendation.role}
          </p>
        </div>

      </div>

      {/* AI Summary */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <CheckCircle2 className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              AI Recommendation Summary
            </h2>

            <p className="text-gray-600 mt-2">
              This resource was selected because your recent performance shows
              a weakness in Dynamic Programming and the skill is important for
              your target role. Completing it should improve algorithmic
              problem-solving and optimization skills.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}