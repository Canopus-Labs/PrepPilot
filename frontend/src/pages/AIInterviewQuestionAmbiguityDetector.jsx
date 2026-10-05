import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
} from "lucide-react";

const ambiguities = [
  {
    text: "The expected input size is not specified.",
    question: "What is the maximum expected input size?",
  },
  {
    text: "The required response time is unclear.",
    question: "Is there a specific latency requirement?",
  },
  {
    text: "Duplicate values are not defined.",
    question: "Should duplicate values be allowed?",
  },
];

export default function AIInterviewQuestionAmbiguityDetector() {
  const [question, setQuestion] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Question Ambiguity Detector
          </h1>

          <p className="text-gray-500">
            Identify unclear requirements before solving an interview problem.
          </p>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Interview Question
        </h2>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={6}
          placeholder="Enter an interview question..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          disabled={!question.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 disabled:opacity-50"
        >
          Detect Ambiguities
        </button>

      </div>

      {analyzed && (
        <>
          {/* Score */}
          <div className="bg-orange-50 rounded-2xl p-6 text-center">

            <AlertTriangle
              className="mx-auto text-orange-600"
              size={30}
            />

            <p className="text-gray-500 mt-3">
              Ambiguity Level
            </p>

            <p className="text-5xl font-black text-orange-600">
              Medium
            </p>

            <p className="text-gray-600 mt-2">
              3 clarification points were identified.
            </p>

          </div>

          {/* Ambiguities */}
          <div className="bg-white rounded-2xl shadow p-5 space-y-4">

            <h2 className="text-lg font-bold">
              Detected Ambiguities
            </h2>

            {ambiguities.map((item, index) => (
              <div
                key={index}
                className="border rounded-xl p-4"
              >

                <div className="flex gap-3">
                  <HelpCircle className="text-orange-600 shrink-0" />

                  <div>
                    <p className="font-semibold">
                      {item.text}
                    </p>

                    <p className="text-sm text-indigo-600 mt-2">
                      Clarification: {item.question}
                    </p>
                  </div>
                </div>

              </div>
            ))}

          </div>

          {/* Impact */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <h2 className="font-bold text-indigo-700">
              Why Clarification Matters
            </h2>

            <p className="text-gray-600 mt-2">
              Different assumptions about input size, latency, or duplicate
              values can lead to completely different algorithms and system
              designs.
            </p>

          </div>

          {/* Recommendation */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Before solving, ask clarification questions about constraints,
                  expected behavior, edge cases, and performance requirements.
                </p>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}