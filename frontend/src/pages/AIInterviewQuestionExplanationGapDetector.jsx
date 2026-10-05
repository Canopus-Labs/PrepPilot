import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  CheckCircle2,
  Target,
  TrendingUp,
} from "lucide-react";

const topics = [
  {
    name: "Binary Search",
    correctness: 94,
    explanation: 61,
    gap: 33,
    status: "Explanation Gap",
  },
  {
    name: "Hash Tables",
    correctness: 88,
    explanation: 84,
    gap: 4,
    status: "Strong Understanding",
  },
  {
    name: "Dynamic Programming",
    correctness: 76,
    explanation: 48,
    gap: 28,
    status: "Explanation Gap",
  },
];

export default function AIInterviewQuestionExplanationGapDetector() {
  const [selectedTopic, setSelectedTopic] = useState("Binary Search");

  const selected = topics.find(
    (topic) => topic.name === selectedTopic
  );

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Explanation Gap Detector
          </h1>

          <p className="text-gray-500">
            Find concepts you can solve but cannot explain confidently.
          </p>
        </div>

      </div>

      {/* Main Alert */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <AlertTriangle className="text-orange-600" />

          <div>
            <h2 className="font-bold text-orange-700">
              Explanation Gap Detected
            </h2>

            <p className="text-gray-600 mt-2">
              Your Binary Search solutions are highly accurate, but your
              explanation quality is significantly lower. This may indicate
              that the concept is being recalled without fully understanding
              the underlying reasoning.
            </p>
          </div>

        </div>

      </div>

      {/* Topic Selector */}
      <div className="bg-white rounded-2xl shadow p-5">

        <label
          htmlFor="topic"
          className="text-sm text-gray-500"
        >
          Select Topic
        </label>

        <select
          id="topic"
          value={selectedTopic}
          onChange={(e) => setSelectedTopic(e.target.value)}
          className="w-full border rounded-xl p-3 mt-2 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {topics.map((topic) => (
            <option key={topic.name}>
              {topic.name}
            </option>
          ))}
        </select>

      </div>

      {/* Comparison */}
      <div className="grid md:grid-cols-2 gap-5">

        <div className="bg-white rounded-2xl shadow p-6 text-center">

          <CheckCircle2
            className="mx-auto text-green-600"
            size={32}
          />

          <p className="text-gray-500 mt-3">
            Solution Correctness
          </p>

          <p className="text-5xl font-black text-green-600">
            {selected.correctness}%
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-6 text-center">

          <Brain
            className="mx-auto text-indigo-600"
            size={32}
          />

          <p className="text-gray-500 mt-3">
            Explanation Quality
          </p>

          <p className="text-5xl font-black text-indigo-600">
            {selected.explanation}%
          </p>

        </div>

      </div>

      {/* Gap Score */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <Target
          className="mx-auto text-indigo-600"
          size={32}
        />

        <p className="text-gray-500 mt-3">
          Explanation Gap
        </p>

        <p className="text-6xl font-black text-indigo-600">
          {selected.gap}%
        </p>

        <p className="text-gray-600 mt-2">
          A larger gap indicates that solution correctness is significantly
          ahead of explanation ability.
        </p>

      </div>

      {/* Topic Analysis */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Explanation Gap Analysis
        </h2>

        <div className="space-y-5 mt-5">

          {topics.map((topic) => (
            <div key={topic.name}>

              <div className="flex justify-between">

                <span className="font-semibold">
                  {topic.name}
                </span>

                <span
                  className={
                    topic.gap > 20
                      ? "text-orange-600 font-semibold"
                      : "text-green-600 font-semibold"
                  }
                >
                  {topic.status}
                </span>

              </div>

              <div className="grid grid-cols-2 gap-3 mt-2">

                <div>
                  <p className="text-xs text-gray-500">
                    Correctness
                  </p>

                  <div className="h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{
                        width: `${topic.correctness}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500">
                    Explanation
                  </p>

                  <div className="h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{
                        width: `${topic.explanation}%`,
                      }}
                    />
                  </div>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Targeted Question */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <Target className="text-orange-600" />

          <div>
            <h2 className="font-bold text-orange-700">
              Targeted Explanation Question
            </h2>

            <p className="text-gray-600 mt-2">
              Why does Binary Search require the search space to have a
              specific ordering property, and what would happen if that
              property were not satisfied?
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold"
            >
              Practice Explanation
            </button>
          </div>

        </div>

      </div>

      {/* Recommendation */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <TrendingUp className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              AI Revision Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Focus on explaining why your solution works rather than solving
              more questions immediately. Review the underlying concept,
              explain it without notes, and then attempt follow-up questions
              that test the same reasoning.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}