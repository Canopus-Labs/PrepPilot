import React, { useState } from "react";
import {
  Brain,
  Target,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export default function AIInterviewPreparationConfidenceCalibration() {
  const [confidence, setConfidence] = useState(70);
  const [completed, setCompleted] = useState(false);

  const accuracy = 84;
  const completeness = 80;
  const correctness = 88;
  const solvingTime = 76;

  const actualScore = Math.round(
    (accuracy + completeness + correctness + solvingTime) / 4
  );

  const difference = actualScore - confidence;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Confidence Calibration
          </h1>

          <p className="text-gray-500">
            Compare your expected confidence with your actual performance.
          </p>
        </div>
      </div>

      {/* Confidence Selection */}
      {!completed && (
        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="font-bold text-lg">
            How confident are you?
          </h2>

          <input
            type="range"
            min="0"
            max="100"
            value={confidence}
            onChange={(e) => setConfidence(Number(e.target.value))}
            className="w-full mt-6"
          />

          <div className="text-center mt-4">
            <span className="text-5xl font-black text-indigo-600">
              {confidence}%
            </span>

            <p className="text-gray-500 mt-2">
              Predicted confidence
            </p>
          </div>

          <button
            onClick={() => setCompleted(true)}
            className="w-full mt-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700"
          >
            Complete Question
          </button>

        </div>
      )}

      {/* Report */}
      {completed && (
        <>
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <Target className="mx-auto text-indigo-600" size={30} />

            <p className="text-gray-500 mt-3">
              Confidence Calibration
            </p>

            <div className="flex justify-center gap-10 mt-4">

              <div>
                <p className="text-sm text-gray-500">
                  Predicted
                </p>
                <p className="text-4xl font-black text-indigo-600">
                  {confidence}%
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Actual
                </p>
                <p className="text-4xl font-black text-green-600">
                  {actualScore}%
                </p>
              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg mb-4">
              Performance Analysis
            </h2>

            {[
              ["Accuracy", accuracy],
              ["Answer Completeness", completeness],
              ["Technical Correctness", correctness],
              ["Solving Time", solvingTime],
            ].map(([name, score]) => (
              <div key={name} className="border rounded-xl p-4 mb-3">

                <div className="flex justify-between">
                  <span className="font-semibold">{name}</span>
                  <span className="font-bold text-indigo-600">
                    {score}%
                  </span>
                </div>

              </div>
            ))}

          </div>

          {/* Insight */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <TrendingUp className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  AI Calibration Insight
                </h2>

                <p className="text-gray-600 mt-2">
                  {difference > 0
                    ? `Your actual performance was ${difference}% higher than your predicted confidence. You may be underestimating your ability in this area.`
                    : `Your predicted confidence was ${Math.abs(
                        difference
                      )}% higher than your actual performance. Consider reviewing this topic before assuming mastery.`}
                </p>
              </div>
            </div>

          </div>

          <div className="bg-indigo-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-indigo-600" />

              <div>
                <h2 className="font-bold text-indigo-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Track this comparison across multiple questions to build a
                  more accurate picture of your confidence calibration over
                  time.
                </p>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}