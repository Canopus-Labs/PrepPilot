import React, { useState } from "react";
import {
  Brain,
  Layers,
  Target,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const combinations = [
  {
    concepts: ["Arrays", "Hashing"],
    reason: "Strong array performance but inconsistent hash-based reasoning.",
    difficulty: "Medium",
    priority: "High",
  },
  {
    concepts: ["Trees", "Recursion"],
    reason: "Tree traversal skills can be strengthened through recursive problems.",
    difficulty: "Medium",
    priority: "High",
  },
  {
    concepts: ["Graphs", "BFS / DFS"],
    reason: "Graph fundamentals are developing and need integrated practice.",
    difficulty: "Hard",
    priority: "Medium",
  },
  {
    concepts: ["SQL", "Data Analysis"],
    reason: "Combining querying and analysis can improve practical data reasoning.",
    difficulty: "Medium",
    priority: "Medium",
  },
];

export default function AIInterviewQuestionConceptCombinationRecommender() {
  const [selected, setSelected] = useState(combinations[0]);
  const [generated, setGenerated] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Concept Combination Recommender
          </h1>

          <p className="text-gray-500">
            Practice combinations of concepts instead of learning every
            technique in isolation.
          </p>
        </div>

      </div>

      {/* Overview */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Layers className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-indigo-700">
              Integrated Practice Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              AI analyzes your preparation history, skill gaps, and recent
              performance to identify concepts that would benefit from
              combined practice.
            </p>
          </div>

        </div>

      </div>

      {/* Combination Cards */}
      <div className="grid md:grid-cols-2 gap-4">

        {combinations.map((combination) => (
          <button
            type="button"
            key={combination.concepts.join("-")}
            onClick={() => {
              setSelected(combination);
              setGenerated(false);
            }}
            className={`text-left bg-white rounded-2xl shadow p-5 border-2 transition ${
              selected === combination
                ? "border-indigo-500"
                : "border-transparent"
            }`}
          >

            <div className="flex justify-between items-start">

              <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                {combination.priority} Priority
              </span>

              <span className="text-sm text-gray-500">
                {combination.difficulty}
              </span>

            </div>

            <div className="flex items-center gap-2 mt-5 flex-wrap">

              <span className="px-3 py-2 rounded-lg bg-gray-100 font-semibold">
                {combination.concepts[0]}
              </span>

              <span className="text-indigo-600 font-bold">
                +
              </span>

              <span className="px-3 py-2 rounded-lg bg-gray-100 font-semibold">
                {combination.concepts[1]}
              </span>

            </div>

            <p className="text-gray-600 text-sm mt-4">
              {combination.reason}
            </p>

          </button>
        ))}

      </div>

      {/* Selected Combination */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <p className="text-sm text-gray-500">
              Recommended Combination
            </p>

            <h2 className="text-2xl font-bold">
              {selected.concepts[0]} + {selected.concepts[1]}
            </h2>

          </div>

        </div>

        <div className="mt-5 bg-gray-50 rounded-xl p-4">

          <p className="text-sm text-gray-500">
            Why AI recommends this
          </p>

          <p className="text-gray-700 mt-1">
            {selected.reason}
          </p>

        </div>

        <button
          type="button"
          onClick={() => setGenerated(true)}
          className="mt-5 flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          <Sparkles size={18} />
          Generate Combined Question
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Generated Question */}
      {generated && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-3">

            <CheckCircle2 className="text-green-600" />

            <div className="flex-1">

              <h2 className="font-bold text-green-700">
                AI-Generated Combined Practice
              </h2>

              <p className="text-gray-700 mt-3">
                Given an array of integers, find the first pair of values that
                add up to a target number. Return the indices of the pair and
                explain how your approach handles duplicate values.
              </p>

              <div className="flex flex-wrap gap-2 mt-4">

                {selected.concepts.map((concept) => (
                  <span
                    key={concept}
                    className="px-3 py-1 rounded-full bg-white text-green-700 text-sm font-semibold"
                  >
                    {concept}
                  </span>
                ))}

              </div>

              <button
                type="button"
                className="mt-5 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold"
              >
                Start Practice
              </button>

            </div>

          </div>

        </div>
      )}

      {/* AI Insight */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <Target className="text-orange-600" />

          <div>

            <h2 className="font-bold text-orange-700">
              AI Learning Insight
            </h2>

            <p className="text-gray-600 mt-2">
              Combined-topic practice helps you recognize which techniques
              work together in unfamiliar problems. Focus on understanding why
              each concept is useful rather than memorizing a fixed solution
              pattern.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}