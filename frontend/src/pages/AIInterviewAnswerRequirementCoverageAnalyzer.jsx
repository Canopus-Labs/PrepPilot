import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Target,
} from "lucide-react";

const requirements = [
  { name: "Explain the approach", covered: true },
  { name: "Handle large inputs", covered: true },
  { name: "Discuss time complexity", covered: false },
  { name: "Discuss space complexity", covered: false },
];

export default function AIInterviewAnswerRequirementCoverageAnalyzer() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const coverage = Math.round(
    (requirements.filter((r) => r.covered).length / requirements.length) * 100
  );

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Requirement Coverage Analyzer
          </h1>

          <p className="text-gray-500">
            Check whether your answer covers every requirement in the question.
          </p>
        </div>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold">
          Candidate Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={6}
          placeholder="Enter your interview answer..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          Analyze Coverage
        </button>

      </div>

      {analyzed && (
        <>
          {/* Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <Target className="mx-auto text-indigo-600" size={30} />

            <p className="text-gray-500 mt-3">
              Requirement Coverage
            </p>

            <p className="text-6xl font-black text-indigo-600">
              {coverage}%
            </p>

            <p className="text-gray-600 mt-2">
              {requirements.filter((r) => r.covered).length} of{" "}
              {requirements.length} requirements addressed.
            </p>

          </div>

          {/* Requirements */}
          <div className="bg-white rounded-2xl shadow p-5 space-y-4">

            <h2 className="font-bold text-lg">
              Requirement Analysis
            </h2>

            {requirements.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-3 border rounded-xl p-4"
              >

                {item.covered ? (
                  <CheckCircle2 className="text-green-600" />
                ) : (
                  <AlertTriangle className="text-orange-600" />
                )}

                <div>
                  <p className="font-semibold">
                    {item.name}
                  </p>

                  <p
                    className={`text-sm ${
                      item.covered
                        ? "text-green-600"
                        : "text-orange-600"
                    }`}
                  >
                    {item.covered ? "Covered" : "Missing"}
                  </p>
                </div>

              </div>
            ))}

          </div>

          {/* Recommendation */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <h2 className="font-bold text-orange-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Add time and space complexity analysis to your response.
              These requirements are currently missing and could affect the
              technical evaluation of your answer.
            </p>

          </div>
        </>
      )}

    </div>
  );
}