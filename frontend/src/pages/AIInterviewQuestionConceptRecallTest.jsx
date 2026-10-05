import React, { useState } from "react";
import {
  Brain,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Target,
} from "lucide-react";

const keyConcepts = [
  "Definition",
  "Main purpose",
  "Working principle",
  "Practical example",
];

export default function AIInterviewQuestionConceptRecallTest() {
  const [answer, setAnswer] = useState("");
  const [tested, setTested] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Concept Recall Test
          </h1>

          <p className="text-gray-500">
            Test your ability to recall and explain learned concepts.
          </p>
        </div>

      </div>

      {/* Concept */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-2">
          <RotateCcw className="text-indigo-600" />

          <h2 className="font-bold text-lg">
            Recall Challenge
          </h2>
        </div>

        <p className="text-gray-600 mt-4">
          Without checking your notes, explain:
        </p>

        <h2 className="text-2xl font-black mt-2">
          What is Binary Search and how does it work?
        </h2>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Explanation
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={8}
          placeholder="Explain the concept from memory..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!answer.trim()}
          onClick={() => setTested(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Check Recall
        </button>

      </div>

      {tested && (
        <>
          {/* Score */}
          <div className="bg-green-50 rounded-2xl p-6 text-center">

            <Target
              className="mx-auto text-green-600"
              size={32}
            />

            <p className="text-gray-500 mt-3">
              Concept Recall Score
            </p>

            <p className="text-6xl font-black text-green-600">
              84%
            </p>

            <p className="text-gray-600 mt-2">
              Strong recall with a few missing details.
            </p>

          </div>

          {/* Key Concepts */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Key Concept Coverage
            </h2>

            <div className="space-y-3 mt-4">

              {keyConcepts.map((concept, index) => (
                <div
                  key={concept}
                  className="flex items-center justify-between border rounded-xl p-4"
                >

                  <span className="font-semibold">
                    {concept}
                  </span>

                  {index === 3 ? (
                    <span className="flex items-center gap-2 text-orange-600 font-semibold">
                      <AlertTriangle size={18} />
                      Missing
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-green-600 font-semibold">
                      <CheckCircle2 size={18} />
                      Recalled
                    </span>
                  )}

                </div>
              ))}

            </div>

          </div>

          {/* Missing Information */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <AlertTriangle className="text-orange-600" />

              <div>
                <h2 className="font-bold text-orange-700">
                  Missing Information
                </h2>

                <p className="text-gray-600 mt-2">
                  Your explanation did not include a clear practical example.
                  Try explaining how binary search could be used in a real
                  application.
                </p>
              </div>
            </div>

          </div>

          {/* AI Feedback */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <h2 className="font-bold text-indigo-700">
              AI Recall Feedback
            </h2>

            <p className="text-gray-600 mt-2">
              You successfully recalled the definition, purpose, and working
              principle. Focus your next revision on practical applications
              and examples.
            </p>

          </div>

        </>
      )}

    </div>
  );
}