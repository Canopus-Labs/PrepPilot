import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

const details = [
  ["System architecture", "Essential", 95],
  ["Scalability decision", "Essential", 90],
  ["Database choice", "Important", 82],
  ["Variable naming", "Optional", 35],
];

export default function AIInterviewAnswerTechnicalDetailPrioritizer() {
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
            AI Technical Detail Prioritizer
          </h1>

          <p className="text-gray-500">
            Identify the technical details that matter most in your answer.
          </p>
        </div>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Interview Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={8}
          placeholder="Paste your technical interview answer..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Prioritize Details
        </button>

      </div>

      {analyzed && (
        <>
          {/* Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <Target
              className="mx-auto text-indigo-600"
              size={30}
            />

            <p className="text-gray-500 mt-3">
              Technical Detail Priority Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              84%
            </p>

          </div>

          {/* Detail Analysis */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Detail Priority Analysis
            </h2>

            <div className="space-y-4 mt-5">

              {details.map(([name, priority, score]) => (
                <div
                  key={name}
                  className="border rounded-xl p-4"
                >

                  <div className="flex justify-between items-center">

                    <span className="font-semibold">
                      {name}
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        priority === "Essential"
                          ? "bg-red-100 text-red-600"
                          : priority === "Important"
                          ? "bg-orange-100 text-orange-600"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {priority}
                    </span>

                  </div>

                  <div className="flex justify-between text-sm mt-3">
                    <span className="text-gray-500">
                      Interview relevance
                    </span>
                    <b>{score}%</b>
                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-2">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${score}%` }}
                    />
                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Missing Detail */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <AlertTriangle className="text-orange-600" />

              <div>
                <h2 className="font-bold text-orange-700">
                  Missing High-Impact Detail
                </h2>

                <p className="text-gray-600 mt-2">
                  Your answer should explain why the chosen architecture can
                  handle increased traffic. This is more important than
                  implementation-level details.
                </p>
              </div>
            </div>

          </div>

          {/* Recommended Order */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  Recommended Explanation Order
                </h2>

                <ol className="text-gray-600 mt-3 space-y-2">
                  <li>1. Explain the overall architecture.</li>
                  <li>2. Explain the key technical decision.</li>
                  <li>3. Discuss scalability and trade-offs.</li>
                  <li>4. Add implementation details only if needed.</li>
                </ol>
              </div>
            </div>

          </div>

        </>
      )}

    </div>
  );
}