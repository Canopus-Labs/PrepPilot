import React from "react";
import { Brain, CheckCircle2, AlertTriangle, Target } from "lucide-react";

const sections = [
  { name: "Direct Answer", completed: true },
  { name: "Explanation", completed: true },
  { name: "Example", completed: false },
  { name: "Conclusion", completed: false },
];

export default function AIInterviewAnswerStructureTemplateCoach() {
  const completed = sections.filter((s) => s.completed).length;
  const score = Math.round((completed / sections.length) * 100);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Answer Structure Template Coach
          </h1>

          <p className="text-gray-500">
            Get the right answer structure for every interview question.
          </p>
        </div>
      </div>

      {/* Question Type */}
      <div className="bg-indigo-50 rounded-2xl p-6">
        <p className="text-gray-500">Detected Question Type</p>

        <p className="text-2xl font-black text-indigo-600 mt-1">
          Technical Explanation
        </p>

        <p className="text-gray-600 mt-2">
          Recommended structure: Answer → Explanation → Example → Conclusion
        </p>
      </div>

      {/* Structure */}
      <div className="bg-white rounded-2xl shadow p-5 space-y-4">

        <h2 className="text-lg font-bold">
          Recommended Answer Structure
        </h2>

        {sections.map((section, index) => (
          <div
            key={section.name}
            className="flex items-center gap-4 border rounded-xl p-4"
          >
            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
              {index + 1}
            </div>

            {section.completed ? (
              <CheckCircle2 className="text-green-600" />
            ) : (
              <AlertTriangle className="text-orange-600" />
            )}

            <div>
              <p className="font-semibold">
                {section.name}
              </p>

              <p className="text-sm text-gray-500">
                {section.completed ? "Covered" : "Missing"}
              </p>
            </div>
          </div>
        ))}

      </div>

      {/* Score */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">
        <Target className="mx-auto text-indigo-600" />

        <p className="text-gray-500 mt-3">
          Structure Alignment Score
        </p>

        <p className="text-5xl font-black text-indigo-600">
          {score}%
        </p>
      </div>

      {/* Recommendation */}
      <div className="bg-orange-50 rounded-2xl p-5">
        <div className="flex gap-3">
          <AlertTriangle className="text-orange-600" />

          <div>
            <h2 className="font-bold text-orange-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Add a concrete example and finish with a short conclusion to
              make your technical answer easier to follow.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}