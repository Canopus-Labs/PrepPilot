import React, { useState } from "react";
import {
  Brain,
  BookOpen,
  Target,
  Sparkles,
} from "lucide-react";

export default function AIInterviewQuestionExplanationPersonalization() {
  const [level, setLevel] = useState("Intermediate");

  const explanations = {
    Beginner:
      "A stack follows Last-In, First-Out (LIFO). The last item added is the first item removed.",
    Intermediate:
      "A stack uses LIFO ordering and supports operations such as push and pop, typically in O(1) time.",
    Advanced:
      "A stack provides LIFO semantics with push/pop operations typically amortized O(1). It can be implemented using arrays or linked structures depending on memory and access requirements.",
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
            AI Explanation Personalization
          </h1>

          <p className="text-gray-500">
            Get explanations adapted to your current understanding.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Explain how a Stack data structure works.
        </h2>

      </div>

      {/* Level */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-2">
          <Target className="text-indigo-600" />
          <h2 className="font-bold">
            Explanation Level
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">

          {["Beginner", "Intermediate", "Advanced"].map((item) => (
            <button
              key={item}
              onClick={() => setLevel(item)}
              className={`px-4 py-2 rounded-xl font-semibold ${
                level === item
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      {/* Personalized Explanation */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-2">
          <Sparkles className="text-indigo-600" />
          <h2 className="text-lg font-bold">
            Personalized AI Explanation
          </h2>
        </div>

        <div className="bg-gray-50 rounded-xl p-5 mt-4">

          <p className="text-gray-700 leading-7">
            {explanations[level]}
          </p>

        </div>

      </div>

      {/* Personalization Factors */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex items-center gap-2">
          <BookOpen className="text-indigo-600" />
          <h2 className="font-bold text-lg">
            Personalization Factors
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">

          <div className="border rounded-xl p-4">
            <p className="text-gray-500">
              Topic Mastery
            </p>
            <p className="font-bold text-indigo-600">
              72%
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-gray-500">
              Previous Performance
            </p>
            <p className="font-bold text-indigo-600">
              78%
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-gray-500">
              Experience Level
            </p>
            <p className="font-bold text-indigo-600">
              {level}
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-gray-500">
              Explanation History
            </p>
            <p className="font-bold text-green-600">
              Personalized
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}