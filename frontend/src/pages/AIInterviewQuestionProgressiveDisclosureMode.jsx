import React, { useState } from "react";
import {
  Brain,
  Lock,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

const levels = [
  {
    title: "Basic Clarification",
    content:
      "The input can contain repeated values. Consider what the expected output should be when duplicates exist.",
  },
  {
    title: "Concept Hint",
    content:
      "Think about a data structure that allows you to quickly check whether a value has already been encountered.",
  },
  {
    title: "Constraint Hint",
    content:
      "If the input size is very large, consider whether an O(n²) approach will scale well.",
  },
  {
    title: "Approach Hint",
    content:
      "Traverse the input once while maintaining a collection of previously seen values.",
  },
  {
    title: "Solution Guidance",
    content:
      "Use a hash-based set to track encountered values and detect duplicates efficiently.",
  },
];

export default function AIInterviewQuestionProgressiveDisclosureMode() {
  const [level, setLevel] = useState(0);
  const [requested, setRequested] = useState(false);

  const requestNextHint = () => {
    setRequested(true);
    setTimeout(() => setRequested(false), 300);
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
            Progressive Disclosure Mode
          </h1>

          <p className="text-gray-500">
            Unlock interview hints gradually and preserve independent
            problem-solving.
          </p>
        </div>

      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Interview Problem
        </p>

        <h2 className="text-xl font-bold mt-2">
          Determine whether an array contains duplicate values.
        </h2>

        <p className="text-gray-600 mt-3">
          Try to solve the problem independently. Request assistance only
          when you need it.
        </p>

      </div>

      {/* Progress */}
      <div className="bg-indigo-50 rounded-2xl p-5">

        <div className="flex justify-between items-center">

          <div>
            <p className="text-sm text-gray-500">
              Assistance Progress
            </p>

            <p className="font-bold text-lg">
              Level {level + 1} of {levels.length}
            </p>
          </div>

          <span className="px-3 py-1 rounded-full bg-white text-indigo-700 font-semibold">
            {level === 0
              ? "Independent"
              : `${level} hint${level > 1 ? "s" : ""} used`}
          </span>

        </div>

        <div className="h-2 bg-white rounded-full mt-4">
          <div
            className="h-full bg-indigo-600 rounded-full transition-all"
            style={{
              width: `${((level + 1) / levels.length) * 100}%`,
            }}
          />
        </div>

      </div>

      {/* Current Hint */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex items-center gap-3">

          <Lock className="text-indigo-600" />

          <div>
            <p className="text-sm text-gray-500">
              Next Assistance Level
            </p>

            <h2 className="font-bold text-lg">
              {levels[level].title}
            </h2>
          </div>

        </div>

        {!requested ? (
          <button
            onClick={requestNextHint}
            className="mt-5 flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            Reveal This Level
            <ChevronRight size={18} />
          </button>
        ) : (
          <div className="mt-5 bg-indigo-50 rounded-xl p-4">

            <p className="text-gray-700">
              {levels[level].content}
            </p>

            {level < levels.length - 1 && (
              <button
                onClick={() => {
                  setLevel(level + 1);
                  setRequested(false);
                }}
                className="mt-4 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold"
              >
                Unlock Next Level
              </button>
            )}

          </div>
        )}

      </div>

      {/* Hint History */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Assistance History
        </h2>

        <div className="space-y-3 mt-4">

          {levels.map((item, index) => (
            <div
              key={item.title}
              className={`flex items-center gap-3 p-3 rounded-xl ${
                index < level
                  ? "bg-green-50"
                  : index === level && requested
                  ? "bg-indigo-50"
                  : "bg-gray-50"
              }`}
            >

              {index < level ? (
                <CheckCircle2
                  className="text-green-600"
                  size={20}
                />
              ) : (
                <Lock
                  className="text-gray-400"
                  size={20}
                />
              )}

              <span className="font-medium">
                {item.title}
              </span>

            </div>
          ))}

        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <CheckCircle2 className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              AI Learning Insight
            </h2>

            <p className="text-gray-600 mt-2">
              The fewer assistance levels you require, the stronger your
              independent problem-solving signal. Your hint usage can be
              tracked across questions to measure improvement over time.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}