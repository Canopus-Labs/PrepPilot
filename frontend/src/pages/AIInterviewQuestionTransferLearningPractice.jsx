import React, { useState } from "react";
import {
  Brain,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const concepts = [
  "Two Pointers",
  "Sliding Window",
  "Binary Search",
  "Dynamic Programming",
];

export default function AIInterviewQuestionTransferLearningPractice() {
  const [concept, setConcept] = useState("Two Pointers");
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const submit = () => {
    if (answer.trim()) setSubmitted(true);
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
            AI Transfer Learning Practice
          </h1>

          <p className="text-gray-500">
            Apply learned concepts to completely new interview problems.
          </p>
        </div>

      </div>

      {/* Concept */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-3">
          <Sparkles className="text-indigo-600" />

          <h2 className="font-bold">
            Recently Learned Concept
          </h2>
        </div>

        <select
          value={concept}
          onChange={(e) => {
            setConcept(e.target.value);
            setSubmitted(false);
            setAnswer("");
          }}
          className="mt-4 w-full rounded-xl border p-3 bg-white"
        >
          {concepts.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>

      </div>

      {/* New Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <span className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-sm font-semibold">
          New Problem
        </span>

        <h2 className="text-xl font-bold mt-4">
          Maximum Length Subarray With a Target Constraint
        </h2>

        <p className="text-gray-600 mt-3 leading-7">
          Given an array of positive integers, find the longest contiguous
          subarray whose sum does not exceed a given target value.
          Explain your approach and its complexity.
        </p>

        <div className="mt-5 rounded-xl bg-gray-50 p-4">
          <p className="font-semibold">
            AI Hint
          </p>

          <p className="text-gray-500 mt-1">
            Think about how the recently learned <b>{concept}</b> concept
            could be adapted to this unfamiliar problem.
          </p>
        </div>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Your Solution
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={6}
          placeholder="Explain how you would solve this new problem..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={submit}
          disabled={!answer.trim()}
          className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          Evaluate Transfer
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Result */}
      {submitted && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-3">
            <CheckCircle2 className="text-green-600" />

            <div>
              <h2 className="font-bold text-green-700">
                Transfer Learning Score: 86%
              </h2>

              <p className="text-gray-600 mt-2">
                You successfully recognized the underlying pattern and adapted
                the learned concept to a new problem instead of repeating a
                memorized solution.
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}