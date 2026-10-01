import React, { useState } from "react";
import {
  Brain,
  Shuffle,
  Target,
  CheckCircle2,
} from "lucide-react";

export default function AIInterviewQuestionUnseenVariationGenerator() {
  const [variation, setVariation] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Unseen Variation Generator
          </h1>

          <p className="text-gray-500">
            Practice new variations of concepts you already know.
          </p>
        </div>
      </div>

      {/* Previous Question */}
      <div className="bg-white rounded-2xl shadow p-5">
        <p className="text-sm text-gray-500">
          Previously Practiced
        </p>

        <h2 className="text-xl font-bold mt-2">
          Find the two numbers in an array that add up to a target.
        </h2>

        <div className="mt-4 inline-block px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold">
          Concept: Hashing
        </div>
      </div>

      {/* Generate */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <Shuffle
          className="mx-auto text-indigo-600"
          size={32}
        />

        <h2 className="text-xl font-bold mt-3">
          Generate an Unseen Variation
        </h2>

        <p className="text-gray-600 mt-2">
          The AI will change the problem structure while testing the same
          underlying concept.
        </p>

        <button
          onClick={() => setVariation(true)}
          className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          Generate Variation
        </button>

      </div>

      {variation && (
        <>
          {/* New Question */}
          <div className="bg-white rounded-2xl shadow p-5">

            <div className="flex items-center gap-2">
              <Target className="text-indigo-600" />

              <h2 className="font-bold text-lg">
                Unseen Variation
              </h2>
            </div>

            <p className="text-gray-700 mt-4 leading-7">
              You are given a stream of transactions and a target transaction
              value. Determine whether two transactions processed so far can
              combine to reach the target value while using as little memory
              as possible.
            </p>

            <div className="flex flex-wrap gap-2 mt-4">

              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                Same Concept: Hashing
              </span>

              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                New Context
              </span>

              <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">
                Changed Constraints
              </span>

            </div>

            <textarea
              rows={6}
              placeholder="Solve the new variation..."
              className="w-full border rounded-xl p-4 mt-5 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold">
              Submit Solution
            </button>

          </div>

          {/* Transfer Evaluation */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  Concept Transfer Evaluation
                </h2>

                <p className="text-gray-600 mt-2">
                  After submission, AI will evaluate whether you successfully
                  recognized and transferred the hashing concept to this new
                  problem structure.
                </p>
              </div>
            </div>

          </div>

          {/* AI Insight */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <h2 className="font-bold text-indigo-700">
              AI Learning Insight
            </h2>

            <p className="text-gray-600 mt-2">
              The problem uses the same core concept but removes the familiar
              wording of the original question. This helps distinguish actual
              understanding from memorized solution patterns.
            </p>

          </div>
        </>
      )}

    </div>
  );
}