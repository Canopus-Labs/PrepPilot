import React, { useState } from "react";
import { Brain, BookOpen, Code2, Target, Network } from "lucide-react";

const nodes = [
  {
    name: "Arrays",
    type: "Concept",
    icon: Code2,
    related: ["Two Pointers", "Sliding Window", "Coding Practice"],
  },
  {
    name: "Two Pointers",
    type: "Skill",
    icon: Target,
    related: ["Arrays", "Sorting", "Interview Questions"],
  },
  {
    name: "DSA Resources",
    type: "Resource",
    icon: BookOpen,
    related: ["Arrays", "Algorithms", "Practice Sheets"],
  },
];

export default function AIInterviewPreparationKnowledgeGraph() {
  const [selected, setSelected] = useState(nodes[0]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Interview Preparation Knowledge Graph
          </h1>

          <p className="text-gray-500">
            Explore connections between concepts, skills, questions, and
            resources.
          </p>
        </div>
      </div>

      {/* Graph */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3 mb-6">
          <Network className="text-indigo-600" />
          <h2 className="text-lg font-bold">
            Preparation Knowledge Map
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-4">

          {nodes.map((node) => {
            const Icon = node.icon;

            return (
              <button
                key={node.name}
                onClick={() => setSelected(node)}
                className={`text-left border rounded-xl p-5 transition ${
                  selected.name === node.name
                    ? "border-indigo-600 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >
                <Icon className="text-indigo-600" />

                <p className="font-bold mt-3">
                  {node.name}
                </p>

                <p className="text-sm text-gray-500">
                  {node.type}
                </p>
              </button>
            );
          })}

        </div>
      </div>

      {/* Selected Node */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <h2 className="text-xl font-bold">
          {selected.name}
        </h2>

        <p className="text-gray-500 mt-1">
          Related preparation content
        </p>

        <div className="flex flex-wrap gap-3 mt-5">

          {selected.related.map((item) => (
            <span
              key={item}
              className="px-4 py-2 bg-white rounded-xl text-sm font-semibold shadow-sm"
            >
              {item}
            </span>
          ))}

        </div>
      </div>

      {/* AI Insight */}
      <div className="bg-green-50 rounded-2xl p-5">

        <h2 className="font-bold text-green-700">
          AI Learning Insight
        </h2>

        <p className="text-gray-600 mt-2">
          Mastering Arrays can help you understand Two Pointers and Sliding
          Window patterns. Practice related questions after reviewing the
          prerequisite concepts.
        </p>

      </div>

    </div>
  );
}