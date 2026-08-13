import React, { useState } from "react";
import {
  Brain,
  Layers,
  CheckCircle2,
  Target,
  Sparkles,
} from "lucide-react";

const concepts = [
  ["Data Structures", true],
  ["Algorithms", true],
  ["System Design", false],
];

export default function AIInterviewQuestionCrossTopicChallenge() {
  const [started, setStarted] = useState(false);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Cross-Topic Challenge
          </h1>

          <p className="text-gray-500">
            Solve interview problems that combine multiple concepts.
          </p>
        </div>

      </div>

      {/* Challenge Overview */}
      {!started && (
        <div className="bg-indigo-50 rounded-2xl p-6">

          <div className="flex items-center gap-3">
            <Sparkles className="text-indigo-600" />

            <h2 className="text-xl font-bold">
              Integrated Problem Challenge
            </h2>
          </div>

          <p className="text-gray-600 mt-3">
            This challenge combines multiple interview concepts instead of
            testing a single topic in isolation.
          </p>

          <div className="flex flex-wrap gap-2 mt-4">

            <span className="px-3 py-2 rounded-xl bg-white text-indigo-700 font-semibold">
              Data Structures
            </span>

            <span className="px-3 py-2 rounded-xl bg-white text-indigo-700 font-semibold">
              Algorithms
            </span>

            <span className="px-3 py-2 rounded-xl bg-white text-indigo-700 font-semibold">
              System Design
            </span>

          </div>

          <button
            onClick={() => setStarted(true)}
            className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            Start Challenge
          </button>

        </div>
      )}

      {/* Question */}
      {started && (
        <>
          <div className="bg-white rounded-2xl shadow p-5">

            <div className="flex items-center gap-2">
              <Layers className="text-indigo-600" />

              <span className="font-semibold text-indigo-700">
                Cross-Topic Problem
              </span>
            </div>

            <h2 className="text-xl font-bold mt-4">
              Design a service that processes millions of events, detects
              duplicate events efficiently, and maintains reliable processing
              under high traffic.
            </h2>

            <p className="text-gray-600 mt-3">
              Explain your data structure, algorithm, scalability strategy,
              and complexity considerations.
            </p>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={8}
              placeholder="Explain your complete approach..."
              className="w-full border rounded-xl p-4 mt-5 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              disabled={!answer.trim()}
              onClick={() => setSubmitted(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
            >
              Submit Solution
            </button>

          </div>

          {/* Concept Evaluation */}
          {submitted && (
            <>
              <div className="bg-white rounded-2xl shadow p-5">

                <div className="flex items-center gap-2">
                  <Target className="text-indigo-600" />

                  <h2 className="font-bold text-lg">
                    Concept Application
                  </h2>
                </div>

                <div className="space-y-3 mt-5">

                  {concepts.map(([concept, success]) => (
                    <div
                      key={concept}
                      className="flex justify-between items-center border rounded-xl p-4"
                    >

                      <span className="font-semibold">
                        {concept}
                      </span>

                      {success ? (
                        <span className="flex items-center gap-2 text-green-600 font-semibold">
                          <CheckCircle2 size={18} />
                          Applied
                        </span>
                      ) : (
                        <span className="text-orange-600 font-semibold">
                          Needs Improvement
                        </span>
                      )}

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
                      AI Challenge Insight
                    </h2>

                    <p className="text-gray-600 mt-2">
                      You successfully connected data structures with the
                      algorithmic solution. Your system-design explanation
                      needs more detail around scalability and reliability.
                    </p>
                  </div>
                </div>

              </div>
            </>
          )}
        </>
      )}

    </div>
  );
}