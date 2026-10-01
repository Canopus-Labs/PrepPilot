import React, { useState } from "react";
import {
  Brain,
  Lightbulb,
  CheckCircle2,
  Target,
} from "lucide-react";

export default function AIInterviewAnswerTechnicalAnalogyCoach() {
  const [analogy, setAnalogy] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Analogy Coach
          </h1>

          <p className="text-gray-500">
            Learn to explain complex technical concepts with simple analogies.
          </p>
        </div>

      </div>

      {/* Concept */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Technical Concept
        </p>

        <h2 className="text-2xl font-bold mt-2">
          Explain Caching
        </h2>

        <p className="text-gray-600 mt-2">
          Try explaining this concept using a simple real-world analogy.
        </p>

      </div>

      {/* AI Example */}
      <div className="bg-indigo-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <Lightbulb className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-indigo-700">
              AI Example Analogy
            </h2>

            <p className="text-gray-600 mt-2">
              Caching is like keeping frequently used books on your desk
              instead of repeatedly walking to the library to get them.
            </p>
          </div>
        </div>

      </div>

      {/* User Analogy */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Create Your Own Analogy
        </h2>

        <textarea
          value={analogy}
          onChange={(e) => setAnalogy(e.target.value)}
          rows={5}
          placeholder="Write your analogy here..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!analogy.trim()}
          onClick={() => setChecked(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Analogy
        </button>

      </div>

      {/* Feedback */}
      {checked && (
        <div className="bg-green-50 rounded-2xl p-5">

          <div className="flex gap-3">
            <CheckCircle2 className="text-green-600" />

            <div>
              <h2 className="font-bold text-green-700">
                AI Analogy Feedback
              </h2>

              <p className="text-gray-600 mt-2">
                Your analogy communicates the main caching concept clearly.
                Consider explaining that cached information can become stale,
                which is an important limitation.
              </p>

              <div className="flex items-center gap-2 mt-3">
                <Target className="text-green-600" size={18} />
                <span className="font-bold text-green-700">
                  Explanation Effectiveness: 86%
                </span>
              </div>

            </div>
          </div>

        </div>
      )}

    </div>
  );
}