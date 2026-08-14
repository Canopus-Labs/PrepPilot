import React, { useState } from "react";
import {
  Brain,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function AIInterviewAnswerQuestionRestatementCoach() {
  const [restatement, setRestatement] = useState("");
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
            AI Question Restatement Coach
          </h1>

          <p className="text-gray-500">
            Restate the interview question before building your answer.
          </p>
        </div>

      </div>

      {/* Original Question */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          How would you design a scalable URL shortening service?
        </h2>

      </div>

      {/* Restatement */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-2">
          <MessageSquare className="text-indigo-600" />

          <h2 className="font-bold text-lg">
            Restate the Question
          </h2>
        </div>

        <p className="text-gray-600 mt-3">
          Explain the question briefly in your own words before solving it.
        </p>

        <textarea
          value={restatement}
          onChange={(e) => setRestatement(e.target.value)}
          rows={5}
          placeholder="Example: I need to design a service that converts long URLs into short URLs and can handle high traffic..."
          className="w-full border rounded-xl p-4 mt-4 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!restatement.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Restatement
        </button>

      </div>

      {analyzed && (
        <>
          {/* Score */}
          <div className="bg-green-50 rounded-2xl p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={32}
            />

            <p className="text-gray-500 mt-3">
              Restatement Accuracy
            </p>

            <p className="text-6xl font-black text-green-600">
              86%
            </p>

            <p className="text-gray-600 mt-2">
              Your interpretation closely matches the original question.
            </p>

          </div>

          {/* Requirement Analysis */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Requirement Coverage
            </h2>

            <div className="space-y-3 mt-4">

              <div className="flex justify-between border rounded-xl p-4">
                <span className="font-semibold">
                  URL shortening
                </span>

                <span className="text-green-600 font-semibold">
                  Covered
                </span>
              </div>

              <div className="flex justify-between border rounded-xl p-4">
                <span className="font-semibold">
                  Scalability
                </span>

                <span className="text-green-600 font-semibold">
                  Covered
                </span>
              </div>

              <div className="flex justify-between border rounded-xl p-4">
                <span className="font-semibold">
                  High traffic handling
                </span>

                <span className="text-orange-600 font-semibold">
                  Partially Covered
                </span>
              </div>

            </div>

          </div>

          {/* Feedback */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <AlertTriangle className="text-orange-600" />

              <div>
                <h2 className="font-bold text-orange-700">
                  AI Feedback
                </h2>

                <p className="text-gray-600 mt-2">
                  Your restatement correctly identifies the main goal, but
                  explicitly mention the expected scale or traffic requirements
                  before starting your design.
                </p>
              </div>
            </div>

          </div>

          {/* Better Restatement */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <h2 className="font-bold text-indigo-700">
              Suggested Restatement
            </h2>

            <p className="text-gray-600 mt-2">
              "I need to design a URL shortening service that converts long
              URLs into short links while supporting scalable, high-volume
              traffic."
            </p>

          </div>

        </>
      )}

    </div>
  );
}