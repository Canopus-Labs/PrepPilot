import React, { useState } from "react";
import {
  Brain,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Target,
} from "lucide-react";

export default function AIInterviewQuestionSolutionRecoveryAnalyzer() {
  const [mistake, setMistake] = useState("");
  const [correction, setCorrection] = useState("");
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
            AI Solution Recovery Analyzer
          </h1>

          <p className="text-gray-500">
            Analyze how effectively you recover from mistakes.
          </p>
        </div>

      </div>

      {/* Mistake */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex items-center gap-2">
          <AlertTriangle className="text-orange-600" />
          <h2 className="font-bold text-lg">
            Initial Mistake
          </h2>
        </div>

        <textarea
          value={mistake}
          onChange={(e) => setMistake(e.target.value)}
          rows={4}
          placeholder="Describe the mistake you made..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

      </div>

      {/* Correction */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex items-center gap-2">
          <RotateCcw className="text-indigo-600" />
          <h2 className="font-bold text-lg">
            Correction Approach
          </h2>
        </div>

        <textarea
          value={correction}
          onChange={(e) => setCorrection(e.target.value)}
          rows={4}
          placeholder="Explain how you identified and corrected the mistake..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!mistake.trim() || !correction.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Recovery
        </button>

      </div>

      {analyzed && (
        <>
          {/* Score */}
          <div className="bg-green-50 rounded-2xl p-6 text-center">

            <Target
              className="mx-auto text-green-600"
              size={32}
            />

            <p className="text-gray-500 mt-3">
              Recovery Effectiveness
            </p>

            <p className="text-6xl font-black text-green-600">
              88%
            </p>

            <p className="text-gray-600 mt-2">
              Strong recovery with effective error recognition.
            </p>

          </div>

          {/* Metrics */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Recovery Analysis
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">

              <div className="border rounded-xl p-4">
                <p className="text-gray-500">
                  Error Recognition
                </p>

                <p className="text-2xl font-black text-green-600 mt-2">
                  Fast
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-500">
                  Attempts Required
                </p>

                <p className="text-2xl font-black text-indigo-600 mt-2">
                  2
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-500">
                  Correction Strategy
                </p>

                <p className="text-2xl font-black text-green-600 mt-2">
                  Effective
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-500">
                  Final Result
                </p>

                <p className="text-2xl font-black text-green-600 mt-2">
                  Correct
                </p>
              </div>

            </div>

          </div>

          {/* AI Feedback */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-indigo-600" />

              <div>
                <h2 className="font-bold text-indigo-700">
                  AI Recovery Feedback
                </h2>

                <p className="text-gray-600 mt-2">
                  You recognized the incorrect assumption quickly and changed
                  your approach instead of repeatedly applying the same logic.
                  This demonstrates good debugging and interview resilience.
                </p>

              </div>
            </div>

          </div>

          {/* Improvement */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <h2 className="font-bold text-orange-700">
              Improvement Opportunity
            </h2>

            <p className="text-gray-600 mt-2">
              Try verbalizing your validation step earlier. Explaining why
              your initial assumption is valid can help detect mistakes before
              implementation.
            </p>

          </div>

        </>
      )}

    </div>
  );
}