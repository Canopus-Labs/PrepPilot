import React, { useState } from "react";
import {
  Brain,
  Plus,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

export default function AIInterviewPreparationDecisionLog() {
  const [decision, setDecision] = useState("");
  const [reason, setReason] = useState("");
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Preparation Decision Log
          </h1>

          <p className="text-gray-500">
            Record preparation decisions and learn which strategies work.
          </p>
        </div>

      </div>

      {/* Add Decision */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Record a Decision
        </h2>

        <input
          value={decision}
          onChange={(e) => setDecision(e.target.value)}
          placeholder="What preparation decision did you make?"
          className="w-full border rounded-xl p-3 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={4}
          placeholder="Why did you make this decision?"
          className="w-full border rounded-xl p-3 mt-3 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!decision.trim() || !reason.trim()}
          onClick={() => setSaved(true)}
          className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          <Plus size={18} />
          Save Decision
        </button>

      </div>

      {/* Saved Decision */}
      {saved && (
        <div className="bg-indigo-50 rounded-2xl p-5">

          <div className="flex gap-3">
            <CheckCircle2 className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-indigo-700">
                Decision Recorded
              </h2>

              <p className="font-semibold mt-2">
                {decision}
              </p>

              <p className="text-gray-600 mt-2">
                {reason}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Historical Decision */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Previous Decisions
        </h2>

        <div className="border rounded-xl p-4 mt-4">

          <p className="font-semibold">
            Prioritized Dynamic Programming
          </p>

          <p className="text-sm text-gray-500 mt-1">
            Reason: Repeated mistakes were detected in DP questions.
          </p>

          <div className="flex items-center gap-2 mt-3 text-green-600">
            <TrendingUp size={18} />
            <span className="font-semibold">
              Performance improved by 18%
            </span>
          </div>

        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-green-50 rounded-2xl p-5">

        <h2 className="font-bold text-green-700">
          AI Strategy Insight
        </h2>

        <p className="text-gray-600 mt-2">
          Targeted revision followed by focused practice has produced the
          strongest improvement in your recent preparation history.
        </p>

      </div>

    </div>
  );
}