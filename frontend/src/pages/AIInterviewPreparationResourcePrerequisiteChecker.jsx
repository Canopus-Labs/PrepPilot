import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  ListChecks,
} from "lucide-react";

export default function AIInterviewAnswerKeyPointExtractor() {
  const [answer, setAnswer] = useState("");
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
            AI Key Point Extractor
          </h1>

          <p className="text-gray-500">
            Extract the most important points from your interview answer.
          </p>
        </div>

      </div>

      {/* Answer Input */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Completed Interview Response
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={8}
          placeholder="Paste your completed interview response..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Extract Key Points
        </button>

      </div>

      {analyzed && (
        <>
          {/* Summary */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <ListChecks className="text-indigo-600" />

              <div>
                <h2 className="font-bold text-indigo-700">
                  Key Points
                </h2>

                <ul className="text-gray-700 mt-3 space-y-2">
                  <li>• Used caching to reduce repeated database queries.</li>
                  <li>• Improved API response performance.</li>
                  <li>• Added monitoring for system performance.</li>
                  <li>• Considered scalability requirements.</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Examples */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Important Examples
            </h2>

            <div className="border rounded-xl p-4 mt-4">
              <p className="font-semibold">
                Performance Optimization
              </p>

              <p className="text-gray-600 mt-2">
                The response explains how caching reduced unnecessary database
                requests and improved response time.
              </p>
            </div>

          </div>

          {/* Conclusion */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  Conclusion Detected
                </h2>

                <p className="text-gray-600 mt-2">
                  The answer concludes that caching improved application
                  performance while maintaining scalability.
                </p>
              </div>
            </div>

          </div>

          {/* Missing */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <AlertTriangle className="text-orange-600" />

              <div>
                <h2 className="font-bold text-orange-700">
                  Missing Key Point
                </h2>

                <p className="text-gray-600 mt-2">
                  Consider mentioning cache invalidation and how stale data
                  would be handled.
                </p>
              </div>
            </div>

          </div>

          {/* Concise Version */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              AI Concise Summary
            </h2>

            <p className="text-gray-600 mt-3 leading-7">
              "I improved API performance by introducing caching to reduce
              repeated database queries. I also added monitoring to track
              performance and considered scalability and cache invalidation."
            </p>

          </div>
        </>
      )}

    </div>
  );
}