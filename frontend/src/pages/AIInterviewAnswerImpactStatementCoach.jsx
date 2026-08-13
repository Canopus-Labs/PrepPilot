import React, { useState } from "react";
import {
  Brain,
  TrendingUp,
  Target,
  CheckCircle2,
} from "lucide-react";

export default function AIInterviewAnswerImpactStatementCoach() {
  const [statement, setStatement] = useState("");
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
            AI Impact Statement Coach
          </h1>

          <p className="text-gray-500">
            Turn your responsibilities into measurable interview achievements.
          </p>
        </div>

      </div>

      {/* Statement */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Project / Interview Statement
        </h2>

        <textarea
          value={statement}
          onChange={(e) => setStatement(e.target.value)}
          rows={5}
          placeholder="Example: I optimized the application's database queries."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!statement.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Impact
        </button>

      </div>

      {analyzed && (
        <>
          {/* Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <Target className="mx-auto text-indigo-600" size={30} />

            <p className="text-gray-500 mt-3">
              Impact Quality Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              64%
            </p>

            <p className="text-gray-600 mt-2">
              Your action is clear, but the measurable outcome is missing.
            </p>

          </div>

          {/* Analysis */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              AI Analysis
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">

              <div className="border rounded-xl p-4">
                <p className="text-gray-500">
                  Action
                </p>

                <p className="font-bold text-green-600">
                  Detected
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-500">
                  Achievement
                </p>

                <p className="font-bold text-orange-600">
                  Needs Evidence
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-500">
                  Measurable Result
                </p>

                <p className="font-bold text-orange-600">
                  Missing
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="text-gray-500">
                  Business Impact
                </p>

                <p className="font-bold text-orange-600">
                  Unclear
                </p>
              </div>

            </div>

          </div>

          {/* Improved Statement */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <TrendingUp className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  AI Suggested Improvement
                </h2>

                <p className="text-gray-600 mt-2">
                  Instead of only describing the action, explain what changed
                  because of your work.
                </p>

                <div className="bg-white rounded-xl p-4 mt-3">
                  <p className="text-gray-700">
                    "I optimized the application's database queries, reducing
                    average response time by 35% and improving overall user
                    experience."
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Recommendation */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-indigo-600" />

              <div>
                <h2 className="font-bold text-indigo-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  When possible, include measurable results such as percentage
                  improvements, time saved, users affected, performance gains,
                  or other concrete outcomes.
                </p>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}