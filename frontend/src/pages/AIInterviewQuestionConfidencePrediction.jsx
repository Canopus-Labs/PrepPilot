import React, { useState } from "react";
import {
  Brain,
  Target,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export default function AIInterviewQuestionConfidencePrediction() {
  const [attempted, setAttempted] = useState(false);

  const predictedConfidence = 78;
  const actualPerformance = 84;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Question Confidence Prediction
          </h1>

          <p className="text-gray-500">
            Predict your confidence before attempting an interview question.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-sm font-semibold">
          Medium Difficulty
        </span>

        <h2 className="text-xl font-bold mt-4">
          Find the longest substring without repeating characters.
        </h2>

        <p className="text-gray-500 mt-2">
          Topic: Sliding Window
        </p>

      </div>

      {/* Prediction */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <Target className="mx-auto text-indigo-600" size={30} />

        <p className="text-gray-500 mt-3">
          AI Predicted Confidence
        </p>

        <p className="text-6xl font-black text-indigo-600">
          {predictedConfidence}%
        </p>

        <p className="text-gray-600 mt-2">
          Based on your previous Sliding Window performance and revision
          history.
        </p>

      </div>

      {/* Factors */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg mb-4">
          Prediction Factors
        </h2>

        <div className="grid sm:grid-cols-2 gap-4">

          {[
            ["Previous Performance", "84%"],
            ["Topic Mastery", "81%"],
            ["Revision History", "76%"],
            ["Similar Questions", "79%"],
          ].map(([name, value]) => (
            <div
              key={name}
              className="border rounded-xl p-4 flex justify-between"
            >
              <span className="font-semibold">{name}</span>
              <span className="font-bold text-indigo-600">{value}</span>
            </div>
          ))}

        </div>

      </div>

      {/* Attempt */}
      {!attempted ? (
        <button
          onClick={() => setAttempted(true)}
          className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
        >
          Attempt Question
        </button>
      ) : (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-3">
            <CheckCircle2 className="text-green-600" />

            <div>
              <h2 className="font-bold text-green-700">
                Prediction vs Actual
              </h2>

              <p className="text-gray-600 mt-2">
                Predicted confidence:{" "}
                <b>{predictedConfidence}%</b>
              </p>

              <p className="text-gray-600">
                Actual performance:{" "}
                <b>{actualPerformance}%</b>
              </p>

              <p className="text-gray-600 mt-2">
                You performed slightly better than predicted, indicating
                possible underconfidence in this topic.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Insight */}
      <div className="bg-purple-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <TrendingUp className="text-purple-600" />

          <div>
            <h2 className="font-bold text-purple-700">
              AI Confidence Insight
            </h2>

            <p className="text-gray-600 mt-2">
              Continue practicing similar questions. Your actual performance
              suggests that your confidence in Sliding Window may be slightly
              lower than your demonstrated ability.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}