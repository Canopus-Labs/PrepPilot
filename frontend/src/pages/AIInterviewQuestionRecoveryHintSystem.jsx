import React, { useState } from "react";
import {
  Brain,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const hints = [
  "Think about the key concept that can reduce repeated work.",
  "Consider maintaining a moving window while processing the input.",
  "A Sliding Window with a Hash Set can solve this efficiently.",
  "Use two pointers and update the set when a duplicate is found.",
];

export default function AIInterviewQuestionRecoveryHintSystem() {
  const [level, setLevel] = useState(0);

  const showHint = () => {
    if (level < hints.length) {
      setLevel(level + 1);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Recovery Hint System
          </h1>

          <p className="text-gray-500">
            Get progressive help without immediately revealing the solution.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Find the longest substring without repeating characters.
        </h2>

      </div>

      {/* Hint Progress */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <h2 className="font-bold text-lg">
          Progressive Hint Levels
        </h2>

        <div className="grid sm:grid-cols-4 gap-3 mt-5">

          {[
            "Concept",
            "Approach",
            "Algorithm",
            "Implementation",
          ].map((item, index) => (
            <div
              key={item}
              className={`p-3 rounded-xl text-center ${
                level > index
                  ? "bg-green-100 text-green-700"
                  : "bg-white text-gray-500"
              }`}
            >
              {index + 1}. {item}
            </div>
          ))}

        </div>

      </div>

      {/* Current Hint */}
      {level > 0 && (
        <div className="bg-yellow-50 rounded-2xl p-5">

          <div className="flex gap-3">
            <Lightbulb className="text-yellow-600" />

            <div>
              <h2 className="font-bold text-yellow-700">
                Hint Level {level}
              </h2>

              <p className="text-gray-700 mt-2">
                {hints[level - 1]}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Button */}
      <button
        onClick={showHint}
        disabled={level >= hints.length}
        className="w-full flex justify-center items-center gap-2 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
      >
        {level < hints.length ? (
          <>
            Get Next Hint
            <ArrowRight size={18} />
          </>
        ) : (
          <>
            All Hints Used
            <CheckCircle2 size={18} />
          </>
        )}
      </button>

      {/* Analytics */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Hint Usage
        </h2>

        <p className="text-gray-600 mt-3">
          Hint level required:{" "}
          <span className="font-bold text-indigo-600">
            {level === 0 ? "None yet" : level}
          </span>
        </p>

        <p className="text-gray-500 text-sm mt-2">
          AI can use this history to identify concepts where additional
          practice may be useful.
        </p>

      </div>

    </div>
  );
}