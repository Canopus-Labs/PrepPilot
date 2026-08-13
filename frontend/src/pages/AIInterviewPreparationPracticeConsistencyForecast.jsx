import React from "react";
import {
  Brain,
  CalendarDays,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function AIInterviewPreparationPracticeConsistencyForecast() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Practice Consistency Forecast
          </h1>

          <p className="text-gray-500">
            Understand whether your current practice routine is sustainable.
          </p>
        </div>

      </div>

      {/* Forecast */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <TrendingUp
          className="mx-auto text-indigo-600"
          size={32}
        />

        <p className="text-gray-500 mt-3">
          Consistency Forecast
        </p>

        <p className="text-6xl font-black text-indigo-600">
          76%
        </p>

        <p className="text-gray-600 mt-2">
          Your current practice pattern is moderately sustainable.
        </p>

      </div>

      {/* Activity Metrics */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Practice Pattern
        </h2>

        <div className="grid sm:grid-cols-3 gap-4 mt-5">

          <div className="border rounded-xl p-4">

            <CalendarDays className="text-indigo-600" />

            <p className="text-sm text-gray-500 mt-3">
              Sessions / Week
            </p>

            <p className="text-2xl font-black">
              5
            </p>

          </div>

          <div className="border rounded-xl p-4">

            <TrendingUp className="text-indigo-600" />

            <p className="text-sm text-gray-500 mt-3">
              Recent Activity
            </p>

            <p className="text-2xl font-black">
              Stable
            </p>

          </div>

          <div className="border rounded-xl p-4">

            <CalendarDays className="text-indigo-600" />

            <p className="text-sm text-gray-500 mt-3">
              Revision Gap
            </p>

            <p className="text-2xl font-black">
              3 Days
            </p>

          </div>

        </div>

      </div>

      {/* Pattern Analysis */}
      <div className="grid sm:grid-cols-2 gap-4">

        <div className="bg-green-50 rounded-2xl p-5">

          <div className="flex gap-3">
            <CheckCircle2 className="text-green-600" />

            <div>
              <h2 className="font-bold text-green-700">
                Positive Pattern
              </h2>

              <p className="text-gray-600 mt-2">
                You are revising important topics regularly instead of
                relying only on last-minute practice.
              </p>
            </div>
          </div>

        </div>

        <div className="bg-orange-50 rounded-2xl p-5">

          <div className="flex gap-3">
            <AlertTriangle className="text-orange-600" />

            <div>
              <h2 className="font-bold text-orange-700">
                Risk Detected
              </h2>

              <p className="text-gray-600 mt-2">
                Your longest sessions occur after inactive periods. This
                burst-and-gap pattern may be difficult to maintain.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* Recommendation */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          AI Recommended Pattern
        </h2>

        <p className="text-gray-600 mt-2">
          Aim for 45–60 minutes of practice on 5 days each week, with short
          revision sessions between larger practice sessions.
        </p>

        <button className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold">
          Apply Recommended Pattern
        </button>

      </div>

    </div>
  );
}