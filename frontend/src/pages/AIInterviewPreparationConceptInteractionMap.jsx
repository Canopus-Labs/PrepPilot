import React, { useState } from "react";
import {
  Brain,
  Network,
  CheckCircle2,
  AlertTriangle,
  Target,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

const conceptGroups = [
  {
    concept: "Arrays",
    related: "Hashing",
    strength: 92,
    status: "Strong",
    questions: [
      "Two Sum",
      "Longest Consecutive Sequence",
    ],
  },
  {
    concept: "Trees",
    related: "Recursion",
    strength: 87,
    status: "Strong",
    questions: [
      "Tree Traversal",
      "Maximum Tree Depth",
    ],
  },
  {
    concept: "Graphs",
    related: "BFS / DFS",
    strength: 74,
    status: "Developing",
    questions: [
      "Number of Islands",
      "Shortest Path",
    ],
  },
  {
    concept: "Dynamic Programming",
    related: "Recursion",
    strength: 58,
    status: "Needs Practice",
    questions: [
      "Climbing Stairs",
      "Coin Change",
    ],
  },
];

export default function AIInterviewPreparationConceptInteractionMap() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Concept Interaction Map
          </h1>

          <p className="text-gray-500">
            Explore how interview concepts connect and which combinations need
            more practice.
          </p>
        </div>

      </div>

      {/* Introduction */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Network className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-indigo-700">
              Connected Learning
            </h2>

            <p className="text-gray-600 mt-2">
              Interview problems often combine multiple concepts. This map
              identifies common relationships so you can practice concepts
              together instead of studying them only in isolation.
            </p>

          </div>

        </div>

      </div>

      {/* Interaction Map */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Concept Relationship Map
        </h2>

        <div className="relative mt-8 min-h-[330px] bg-gray-50 rounded-2xl p-6">

          <div className="absolute left-[12%] top-[18%] px-5 py-3 rounded-xl bg-indigo-100 text-indigo-700 font-bold">
            Arrays
          </div>

          <div className="absolute left-[42%] top-[18%] px-5 py-3 rounded-xl bg-green-100 text-green-700 font-bold">
            Hashing
          </div>

          <div className="absolute left-[73%] top-[18%] px-5 py-3 rounded-xl bg-orange-100 text-orange-700 font-bold">
            Searching
          </div>

          <div className="absolute left-[24%] top-[65%] px-5 py-3 rounded-xl bg-purple-100 text-purple-700 font-bold">
            Trees
          </div>

          <div className="absolute left-[55%] top-[65%] px-5 py-3 rounded-xl bg-pink-100 text-pink-700 font-bold">
            Recursion
          </div>

          <div className="absolute left-[78%] top-[65%] px-5 py-3 rounded-xl bg-yellow-100 text-yellow-700 font-bold">
            Dynamic Programming
          </div>

          {/* Relationship Lines */}
          <div className="absolute left-[28%] top-[25%] w-[16%] border-t-2 border-indigo-300" />
          <div className="absolute left-[59%] top-[25%] w-[14%] border-t-2 border-indigo-300" />

          <div className="absolute left-[34%] top-[62%] w-[22%] border-t-2 border-indigo-300" />
          <div className="absolute left-[66%] top-[62%] w-[13%] border-t-2 border-orange-300" />

          <div className="absolute left-[51%] top-[31%] h-[33%] border-l-2 border-indigo-200" />

        </div>

        <p className="text-sm text-gray-500 mt-4">
          Stronger connections indicate concepts that frequently appear
          together in your practiced questions.
        </p>

      </div>

      {/* Relationship Cards */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Frequent Concept Combinations
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mt-5">

          {conceptGroups.map((group) => (
            <button
              type="button"
              key={`${group.concept}-${group.related}`}
              onClick={() =>
                setSelected(
                  selected === group ? null : group
                )
              }
              className={`text-left border rounded-2xl p-5 transition ${
                selected === group
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200"
              }`}
            >

              <div className="flex justify-between items-center">

                <div className="flex items-center gap-2">

                  <span className="px-3 py-2 rounded-lg bg-gray-100 font-semibold">
                    {group.concept}
                  </span>

                  <ArrowRight
                    size={18}
                    className="text-indigo-500"
                  />

                  <span className="px-3 py-2 rounded-lg bg-gray-100 font-semibold">
                    {group.related}
                  </span>

                </div>

                {group.status === "Strong" ? (
                  <CheckCircle2
                    className="text-green-600"
                    size={21}
                  />
                ) : (
                  <AlertTriangle
                    className="text-orange-600"
                    size={21}
                  />
                )}

              </div>

              <div className="flex justify-between mt-5">

                <span className="text-sm text-gray-500">
                  Interaction Strength
                </span>

                <span className="font-bold text-indigo-600">
                  {group.strength}%
                </span>

              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-2">

                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${group.strength}%`,
                  }}
                />

              </div>

              <span
                className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  group.status === "Strong"
                    ? "bg-green-100 text-green-700"
                    : group.status === "Developing"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-orange-100 text-orange-700"
                }`}
              >
                {group.status}
              </span>

              {selected === group && (
                <div className="mt-4 bg-white rounded-xl p-4">

                  <p className="text-sm text-gray-500">
                    Example Questions
                  </p>

                  <div className="space-y-2 mt-2">

                    {group.questions.map((question) => (
                      <div
                        key={question}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle2
                          size={17}
                          className="text-indigo-600"
                        />
                        <span className="text-sm">
                          {question}
                        </span>
                      </div>
                    ))}

                  </div>

                </div>
              )}

            </button>
          ))}

        </div>

      </div>

      {/* Weak Combination */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <AlertTriangle className="text-orange-600" />

          <div>

            <h2 className="font-bold text-orange-700">
              Weak Concept Combination
            </h2>

            <p className="text-gray-600 mt-2">
              <strong>Dynamic Programming + Recursion</strong> is currently
              your weakest combination. You understand both concepts
              individually but have less experience applying them together.
            </p>

          </div>

        </div>

      </div>

      {/* Recommended Practice */}
      <div className="bg-indigo-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-indigo-700">
              Recommended Combination Practice
            </h2>

            <p className="text-gray-600 mt-2">
              Practice problems that require recursion first and then optimize
              repeated subproblems using memoization or dynamic programming.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Practice Concept Combination
            </button>

          </div>

        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <Lightbulb className="text-green-600" />

          <div>

            <h2 className="font-bold text-green-700">
              AI Learning Insight
            </h2>

            <p className="text-gray-600 mt-2">
              Your preparation is strongest when concepts are practiced
              together. Focus on weak combinations rather than repeatedly
              solving isolated questions from concepts you already understand.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}