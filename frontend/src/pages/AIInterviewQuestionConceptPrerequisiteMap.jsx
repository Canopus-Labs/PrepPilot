import React from "react";
import {
  Brain,
  CheckCircle2,
  Lock,
  ArrowDown,
  BookOpen,
} from "lucide-react";

const concepts = [
  { name: "Programming Fundamentals", status: "completed" },
  { name: "Recursion", status: "completed" },
  { name: "Arrays & Strings", status: "completed" },
  { name: "Trees", status: "missing" },
  { name: "Graphs", status: "missing" },
  { name: "Dynamic Programming", status: "locked" },
];

export default function AIInterviewQuestionConceptPrerequisiteMap() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Concept Prerequisite Map
          </h1>

          <p className="text-gray-500">
            Discover the foundational concepts required for advanced topics.
          </p>
        </div>

      </div>

      {/* Map */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-lg font-bold mb-6">
          Learning Dependency Map
        </h2>

        <div className="flex flex-col items-center">

          {concepts.map((concept, index) => (
            <React.Fragment key={concept.name}>

              <div
                className={`w-full max-w-md rounded-xl border p-4 ${
                  concept.status === "completed"
                    ? "bg-green-50 border-green-200"
                    : concept.status === "missing"
                    ? "bg-orange-50 border-orange-200"
                    : "bg-gray-100 border-gray-200"
                }`}
              >

                <div className="flex items-center gap-3">

                  {concept.status === "completed" ? (
                    <CheckCircle2 className="text-green-600" />
                  ) : concept.status === "missing" ? (
                    <BookOpen className="text-orange-600" />
                  ) : (
                    <Lock className="text-gray-500" />
                  )}

                  <div>
                    <p className="font-bold">
                      {concept.name}
                    </p>

                    <p className="text-sm text-gray-500">
                      {concept.status === "completed"
                        ? "Prerequisite completed"
                        : concept.status === "missing"
                        ? "Foundation needs improvement"
                        : "Complete prerequisites first"}
                    </p>
                  </div>

                </div>

              </div>

              {index < concepts.length - 1 && (
                <ArrowDown className="my-2 text-gray-400" />
              )}

            </React.Fragment>
          ))}

        </div>

      </div>

      {/* Missing Foundations */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <h2 className="font-bold text-orange-700">
          Missing Foundations
        </h2>

        <p className="text-gray-600 mt-2">
          Trees and Graphs should be strengthened before starting advanced
          Dynamic Programming practice.
        </p>

      </div>

      {/* Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <BookOpen className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-indigo-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Complete Tree and Graph fundamentals first. Then progress toward
              Dynamic Programming using the recommended prerequisite resources.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}