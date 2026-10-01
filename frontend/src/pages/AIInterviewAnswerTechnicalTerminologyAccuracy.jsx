import React from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
} from "lucide-react";

const terms = [
  {
    term: "Recursion",
    status: "Correct",
    score: 95,
    meaning: "A function calling itself to solve smaller instances of a problem.",
  },
  {
    term: "Memoization",
    status: "Needs Review",
    score: 58,
    meaning: "Caching results of expensive function calls to avoid recomputation.",
  },
  {
    term: "Concurrency",
    status: "Incorrect Context",
    score: 42,
    meaning: "Managing multiple tasks that can make progress during overlapping periods.",
  },
];

export default function AIInterviewAnswerTechnicalTerminologyAccuracy() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Terminology Accuracy
          </h1>

          <p className="text-gray-500">
            Check whether technical terms are used accurately in your answers.
          </p>
        </div>

      </div>

      {/* Score */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <BookOpen className="mx-auto text-indigo-600" size={30} />

        <p className="text-gray-500 mt-3">
          Terminology Accuracy
        </p>

        <p className="text-6xl font-black text-indigo-600">
          78%
        </p>

        <p className="text-gray-600 mt-2">
          Most technical terms are used correctly.
        </p>

      </div>

      {/* Terms */}
      <div className="bg-white rounded-2xl shadow p-5 space-y-4">

        <h2 className="text-lg font-bold">
          Terminology Analysis
        </h2>

        {terms.map((item) => (
          <div
            key={item.term}
            className="border rounded-xl p-4"
          >

            <div className="flex justify-between items-center">

              <div className="flex items-center gap-3">

                {item.status === "Correct" ? (
                  <CheckCircle2 className="text-green-600" />
                ) : (
                  <AlertTriangle className="text-orange-600" />
                )}

                <span className="font-bold">
                  {item.term}
                </span>

              </div>

              <span className="font-bold text-indigo-600">
                {item.score}%
              </span>

            </div>

            <p className="text-sm text-gray-500 mt-2">
              {item.status}
            </p>

            <div className="bg-gray-50 rounded-lg p-3 mt-3">
              <p className="text-sm font-semibold">
                Correct Meaning
              </p>

              <p className="text-sm text-gray-600 mt-1">
                {item.meaning}
              </p>
            </div>

          </div>
        ))}

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
              Review the difference between concurrency and parallelism.
              Practice using technical terms in complete explanations rather
              than using them only as keywords.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}