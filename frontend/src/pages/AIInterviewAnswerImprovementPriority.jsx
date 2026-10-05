import React from "react";
import {
  Brain,
  AlertCircle,
  ArrowUp,
  CheckCircle2,
} from "lucide-react";

const feedback = [
  {
    title: "Technical Correctness",
    level: "Critical",
    text: "Correct the incorrect explanation of time complexity.",
  },
  {
    title: "Answer Relevance",
    level: "High Impact",
    text: "Remove information that does not directly answer the question.",
  },
  {
    title: "Clarity",
    level: "Recommended",
    text: "Use shorter sentences when explaining the approach.",
  },
  {
    title: "Communication Style",
    level: "Optional",
    text: "Add a stronger concluding statement.",
  },
];

const colors = {
  Critical: "bg-red-100 text-red-600",
  "High Impact": "bg-orange-100 text-orange-600",
  Recommended: "bg-yellow-100 text-yellow-700",
  Optional: "bg-green-100 text-green-600",
};

export default function AIInterviewAnswerImprovementPriority() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Answer Improvement Priority
          </h1>

          <p className="text-gray-500">
            Focus on the improvements that have the greatest interview impact.
          </p>
        </div>
      </div>

      <div className="bg-indigo-50 rounded-2xl p-6">
        <p className="text-gray-500">
          Overall Improvement Priority
        </p>

        <p className="text-5xl font-black text-indigo-600">
          High
        </p>

        <p className="text-gray-600 mt-2">
          Fix the critical technical issue before improving communication style.
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow p-5 space-y-4">

        <h2 className="text-lg font-bold">
          Prioritized Feedback
        </h2>

        {feedback.map((item) => (
          <div
            key={item.title}
            className="border rounded-xl p-4"
          >
            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">
                {item.level === "Critical" ? (
                  <AlertCircle className="text-red-600" />
                ) : (
                  <ArrowUp className="text-indigo-600" />
                )}

                <h3 className="font-bold">
                  {item.title}
                </h3>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[item.level]}`}
              >
                {item.level}
              </span>

            </div>

            <p className="text-gray-600 mt-3">
              {item.text}
            </p>
          </div>
        ))}

      </div>

      <div className="bg-green-50 rounded-2xl p-5">
        <div className="flex gap-3">
          <CheckCircle2 className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-1">
              Start with technical correctness, then improve relevance and
              clarity. Optional communication refinements can be handled last.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}