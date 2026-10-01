import React from "react";
import {
  Brain,
  CheckCircle2,
  Clock,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const suggestions = [
  {
    text: "Add a clear explanation of time complexity.",
    applied: true,
  },
  {
    text: "Include an edge-case example.",
    applied: true,
  },
  {
    text: "Explain why this approach was selected.",
    applied: false,
  },
  {
    text: "Reduce repeated implementation details.",
    applied: false,
  },
];

export default function AIInterviewAnswerRevisionSuggestionTracker() {
  const appliedCount = suggestions.filter(
    (item) => item.applied
  ).length;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Revision Suggestion Tracker
          </h1>

          <p className="text-gray-500">
            Track which AI recommendations you have applied to your answers.
          </p>
        </div>

      </div>

      {/* Score Progress */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <h2 className="font-bold text-lg">
          Answer Improvement
        </h2>

        <div className="flex items-center justify-center gap-6 mt-5">

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Before
            </p>

            <p className="text-4xl font-black text-gray-600">
              68%
            </p>
          </div>

          <ArrowRight className="text-indigo-600" />

          <div className="text-center">
            <p className="text-sm text-gray-500">
              After
            </p>

            <p className="text-4xl font-black text-indigo-600">
              84%
            </p>
          </div>

        </div>

        <div className="text-center mt-3">
          <span className="font-semibold text-green-600">
            +16% improvement
          </span>
        </div>

      </div>

      {/* Feedback */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          AI Improvement Suggestions
        </h2>

        <div className="space-y-3 mt-5">

          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="flex items-center justify-between border rounded-xl p-4"
            >

              <div className="flex gap-3">

                {suggestion.applied ? (
                  <CheckCircle2
                    className="text-green-600 mt-1"
                    size={20}
                  />
                ) : (
                  <Clock
                    className="text-orange-500 mt-1"
                    size={20}
                  />
                )}

                <p className="text-gray-700">
                  {suggestion.text}
                </p>

              </div>

              <span
                className={`text-sm font-semibold ${
                  suggestion.applied
                    ? "text-green-600"
                    : "text-orange-600"
                }`}
              >
                {suggestion.applied
                  ? "Applied"
                  : "Pending"}
              </span>

            </div>
          ))}

        </div>

      </div>

      {/* Progress */}
      <div className="grid sm:grid-cols-3 gap-4">

        <div className="bg-white rounded-2xl shadow p-5">

          <CheckCircle2 className="text-green-600" />

          <p className="text-gray-500 mt-3">
            Applied
          </p>

          <p className="text-3xl font-black">
            {appliedCount}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <Clock className="text-orange-500" />

          <p className="text-gray-500 mt-3">
            Pending
          </p>

          <p className="text-3xl font-black">
            {suggestions.length - appliedCount}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <TrendingUp className="text-indigo-600" />

          <p className="text-gray-500 mt-3">
            Improvement
          </p>

          <p className="text-3xl font-black text-indigo-600">
            +16%
          </p>

        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <TrendingUp className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              AI Progress Insight
            </h2>

            <p className="text-gray-600 mt-2">
              You have applied {appliedCount} of {suggestions.length} suggested
              improvements. Your answer score increased from 68% to 84%.
              Focus next on explaining your technical decisions and removing
              unnecessary details.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}