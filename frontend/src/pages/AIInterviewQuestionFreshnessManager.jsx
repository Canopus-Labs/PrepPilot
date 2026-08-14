import React from "react";
import {
  Brain,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Clock,
} from "lucide-react";

const questions = [
  { name: "Binary Search", status: "New", count: 4 },
  { name: "Two Pointers", status: "Recently Practiced", count: 3 },
  { name: "Dynamic Programming", status: "Due for Revision", count: 5 },
  { name: "Arrays", status: "Mastered", count: 2 },
];

const colors = {
  New: "bg-blue-100 text-blue-600",
  "Recently Practiced": "bg-purple-100 text-purple-600",
  "Due for Revision": "bg-orange-100 text-orange-600",
  Mastered: "bg-green-100 text-green-600",
};

export default function AIInterviewQuestionFreshnessManager() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Question Freshness Manager
          </h1>

          <p className="text-gray-500">
            Balance new questions with revision and familiar concepts.
          </p>
        </div>
      </div>

      {/* Session Mix */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-3">
          <Sparkles className="text-indigo-600" />

          <h2 className="font-bold text-lg">
            AI Recommended Session
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">

          <div className="bg-white rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-blue-600">40%</p>
            <p className="text-sm">New</p>
          </div>

          <div className="bg-white rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-purple-600">20%</p>
            <p className="text-sm">Recent</p>
          </div>

          <div className="bg-white rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-orange-600">30%</p>
            <p className="text-sm">Revision</p>
          </div>

          <div className="bg-white rounded-xl p-4 text-center">
            <p className="text-2xl font-black text-green-600">10%</p>
            <p className="text-sm">Mastered</p>
          </div>

        </div>
      </div>

      {/* Question Categories */}

      <div className="bg-white rounded-2xl shadow p-5 space-y-4">

        <h2 className="font-bold text-lg">
          Question Freshness
        </h2>

        {questions.map((question) => (
          <div
            key={question.name}
            className="flex items-center justify-between border rounded-xl p-4"
          >

            <div>
              <p className="font-semibold">
                {question.name}
              </p>

              <p className="text-sm text-gray-500">
                {question.count} questions available
              </p>
            </div>

            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${colors[question.status]}`}
            >
              {question.status}
            </span>

          </div>
        ))}

      </div>

      {/* Recommendation */}

      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <CheckCircle2 className="text-green-600" />

          <div>

            <h2 className="font-bold text-green-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-1">
              Prioritize new questions while revisiting Dynamic Programming
              concepts that are due for revision.
            </p>

          </div>

        </div>

      </div>

      <button
        className="w-full flex justify-center items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
      >
        <RefreshCw size={18} />
        Generate Fresh Practice Session
      </button>

    </div>
  );
}