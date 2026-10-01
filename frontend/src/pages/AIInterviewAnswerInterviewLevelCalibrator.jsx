import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

const levels = ["Entry Level", "Mid Level", "Senior Level"];

export default function AIInterviewAnswerInterviewLevelCalibrator() {
  const [level, setLevel] = useState("Entry Level");
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
            AI Interview-Level Calibrator
          </h1>

          <p className="text-gray-500">
            Check whether your answer matches the expected experience level.
          </p>
        </div>

      </div>

      {/* Level */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-2">
          <Target className="text-indigo-600" />
          <h2 className="font-bold text-lg">
            Target Experience Level
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">

          {levels.map((item) => (
            <button
              key={item}
              onClick={() => {
                setLevel(item);
                setAnalyzed(false);
              }}
              className={`px-4 py-2 rounded-xl font-semibold ${
                level === item
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          How would you design a scalable API service?
        </h2>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={7}
          placeholder={`Write your ${level} interview answer...`}
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Calibrate Answer
        </button>

      </div>

      {/* Results */}
      {analyzed && (
        <>
          <div className="bg-green-50 rounded-2xl p-6 text-center">

            <TrendingUp
              className="mx-auto text-green-600"
              size={30}
            />

            <p className="text-gray-500 mt-3">
              Interview-Level Assessment
            </p>

            <p className="text-4xl font-black text-green-600">
              Appropriate
            </p>

            <p className="text-gray-600 mt-2">
              Your response matches the expected depth for a {level} candidate.
            </p>

          </div>

          {/* Metrics */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Calibration Analysis
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">

              {[
                ["Technical Depth", 84],
                ["Terminology", 82],
                ["Reasoning Complexity", 79],
                ["Question Difficulty Match", 88],
              ].map(([name, score]) => (
                <div
                  key={name}
                  className="border rounded-xl p-4"
                >
                  <div className="flex justify-between">
                    <span className="font-semibold">
                      {name}
                    </span>

                    <span className="font-bold text-indigo-600">
                      {score}%
                    </span>
                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-3">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}

            </div>

          </div>

          {/* Feedback */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-indigo-600" />

              <div>
                <h2 className="font-bold text-indigo-700">
                  AI Feedback
                </h2>

                <p className="text-gray-600 mt-2">
                  Your response demonstrates appropriate technical knowledge.
                  For a stronger answer, explain scalability trade-offs and
                  justify your architectural choices with specific examples.
                </p>
              </div>
            </div>

          </div>

        </>
      )}

    </div>
  );
}