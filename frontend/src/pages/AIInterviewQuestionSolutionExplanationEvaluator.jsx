import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  Code2,
  MessageSquare,
  Target,
} from "lucide-react";

const metrics = [
  ["Problem Understanding", 88],
  ["Approach Explanation", 82],
  ["Algorithm Reasoning", 79],
  ["Correctness Justification", 91],
  ["Complexity Explanation", 74],
  ["Edge Cases", 68],
];

export default function AIInterviewQuestionSolutionExplanationEvaluator() {
  const [explanation, setExplanation] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Solution Explanation Evaluator
          </h1>

          <p className="text-gray-500">
            Evaluate how clearly you explain your technical solution.
          </p>
        </div>

      </div>

      {/* Solution Status */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <Code2 className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              Solution Correctness
            </h2>

            <p className="text-gray-600 mt-1">
              Your submitted solution passed the test cases.
            </p>

            <p className="text-2xl font-black text-green-600 mt-2">
              96%
            </p>
          </div>
        </div>

      </div>

      {/* Explanation */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex items-center gap-2">
          <MessageSquare className="text-indigo-600" />
          <h2 className="font-bold text-lg">
            Explain Your Solution
          </h2>
        </div>

        <textarea
          value={explanation}
          onChange={(e) => setExplanation(e.target.value)}
          rows={8}
          placeholder="Explain why your solution works, its complexity, and how it handles edge cases..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!explanation.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Evaluate Explanation
        </button>

      </div>

      {analyzed && (
        <>
          {/* Explanation Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <Target
              className="mx-auto text-indigo-600"
              size={32}
            />

            <p className="text-gray-500 mt-3">
              Explanation Quality Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              81%
            </p>

            <p className="text-gray-600 mt-2">
              Good explanation with opportunities to improve edge-case
              reasoning.
            </p>

          </div>

          {/* Metrics */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Explanation Breakdown
            </h2>

            <div className="space-y-4 mt-5">

              {metrics.map(([name, score]) => (
                <div key={name}>

                  <div className="flex justify-between">
                    <span className="font-semibold">
                      {name}
                    </span>

                    <span className="font-bold text-indigo-600">
                      {score}%
                    </span>
                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-2">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${score}%` }}
                    />
                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Feedback */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <h2 className="font-bold text-orange-700">
              AI Improvement Feedback
            </h2>

            <p className="text-gray-600 mt-2">
              Your algorithm explanation is clear, but your response does not
              fully justify why the solution handles empty input and duplicate
              values. Mention these edge cases explicitly during an interview.
            </p>

          </div>

          {/* Separate Scores */}
          <div className="grid sm:grid-cols-2 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">
              <p className="text-gray-500">
                Solution Correctness
              </p>

              <p className="text-4xl font-black text-green-600 mt-2">
                96%
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <p className="text-gray-500">
                Explanation Quality
              </p>

              <p className="text-4xl font-black text-indigo-600 mt-2">
                81%
              </p>
            </div>

          </div>

          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-600" />

              <p className="text-gray-600">
                Your coding ability is stronger than your explanation score.
                Focus on explaining complexity and edge cases to improve your
                technical interview performance.
              </p>
            </div>

          </div>
        </>
      )}

    </div>
  );
}