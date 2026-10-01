import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  ShieldAlert,
  Lightbulb,
} from "lucide-react";

const boundaries = [
  {
    condition: "Input contains only positive integers",
    status: "Identified",
    feedback: "The solution depends on positive values for its current logic.",
  },
  {
    condition: "Input size remains within expected memory limits",
    status: "Identified",
    feedback: "Additional memory usage should be considered for large inputs.",
  },
  {
    condition: "Negative values are introduced",
    status: "Risk",
    feedback: "The current approach may require modification when negative values are allowed.",
  },
  {
    condition: "Extremely large input size",
    status: "Risk",
    feedback: "Time or space complexity may become impractical.",
  },
];

export default function AIInterviewAnswerTechnicalBoundaryAnalyzer() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [caseAnswer, setCaseAnswer] = useState("");

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Boundary Analyzer
          </h1>

          <p className="text-gray-500">
            Identify where your technical solution works, fails, and what
            assumptions it depends on.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Explain your solution and the conditions under which it is valid.
        </h2>

        <p className="text-gray-600 mt-3">
          Think beyond the normal input. Consider assumptions, constraints,
          edge cases, and situations where your approach may stop working.
        </p>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Technical Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={8}
          placeholder="Explain your solution and its limitations..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Boundaries
        </button>

      </div>

      {analyzed && (
        <>
          {/* Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <ShieldAlert
              className="mx-auto text-indigo-600"
              size={36}
            />

            <p className="text-gray-500 mt-3">
              Boundary Awareness Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              71%
            </p>

            <p className="text-gray-600 mt-2">
              Your solution is reasonable, but several operating boundaries
              should be explained more explicitly.
            </p>

          </div>

          {/* Boundary Analysis */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Detected Solution Boundaries
            </h2>

            <div className="space-y-4 mt-5">

              {boundaries.map((boundary) => (
                <div
                  key={boundary.condition}
                  className="border rounded-xl p-4"
                >

                  <div className="flex gap-3">

                    {boundary.status === "Identified" ? (
                      <CheckCircle2
                        className="text-green-600 mt-1"
                        size={21}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-orange-600 mt-1"
                        size={21}
                      />
                    )}

                    <div className="flex-1">

                      <div className="flex justify-between gap-3">

                        <p className="font-semibold">
                          {boundary.condition}
                        </p>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold h-fit ${
                            boundary.status === "Identified"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {boundary.status}
                        </span>

                      </div>

                      <p className="text-sm text-gray-600 mt-2">
                        {boundary.feedback}
                      </p>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Failure Scenario */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <AlertTriangle className="text-orange-600" />

              <div className="flex-1">

                <h2 className="font-bold text-orange-700">
                  AI Failure Scenario Challenge
                </h2>

                <p className="text-gray-700 mt-2">
                  Suppose the interviewer changes one important condition:
                  <strong> negative values are now allowed in the input.</strong>
                </p>

                <p className="text-gray-600 mt-2">
                  What part of your solution would need to change, and why?
                </p>

                <textarea
                  value={caseAnswer}
                  onChange={(e) => setCaseAnswer(e.target.value)}
                  rows={4}
                  placeholder="Explain how your solution behaves in this scenario..."
                  className="w-full border rounded-xl p-3 mt-4 bg-white outline-none focus:ring-2 focus:ring-orange-500"
                />

                <button
                  type="button"
                  className="mt-3 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold"
                >
                  Submit Scenario Analysis
                </button>

              </div>

            </div>

          </div>

          {/* Assumptions */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Assumptions to State Explicitly
            </h2>

            <div className="grid md:grid-cols-2 gap-3 mt-5">

              {[
                "Expected input constraints",
                "Allowed input values",
                "Memory limitations",
                "Required performance",
                "Expected output conditions",
                "Failure behavior",
              ].map((item) => (
                <div
                  key={item}
                  className="p-4 rounded-xl bg-gray-50 border"
                >
                  <p className="font-semibold">
                    {item}
                  </p>
                </div>
              ))}

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Lightbulb className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  When presenting a technical solution, state the important
                  assumptions first, explain the expected operating range, and
                  mention at least one meaningful failure or edge scenario.
                  This shows the interviewer that you understand the
                  limitations of your approach.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}