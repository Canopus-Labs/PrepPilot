import React, { useState } from "react";
import {
  Brain,
  TrendingDown,
  TrendingUp,
  RotateCcw,
  Target,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

const recoverySteps = [
  {
    stage: "Performance Drop",
    difficulty: "Hard",
    score: 42,
    status: "Detected",
  },
  {
    stage: "Recovery",
    difficulty: "Easy",
    score: 68,
    status: "Improving",
  },
  {
    stage: "Reinforcement",
    difficulty: "Medium",
    score: 76,
    status: "Stable",
  },
  {
    stage: "Rebuild",
    difficulty: "Medium+",
    score: 84,
    status: "Ready",
  },
];

const questions = [
  {
    title: "Array Frequency Counter",
    difficulty: "Easy",
    reason: "Reinforces hashing fundamentals.",
  },
  {
    title: "Two Pointer Pair Search",
    difficulty: "Easy",
    reason: "Rebuilds confidence with familiar patterns.",
  },
  {
    title: "Sliding Window Optimization",
    difficulty: "Medium",
    reason: "Tests whether the underlying concept has recovered.",
  },
];

export default function AIInterviewQuestionProgressiveDifficultyRecovery() {
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState(null);
  const [recovered, setRecovered] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Progressive Difficulty Recovery
          </h1>

          <p className="text-gray-500">
            Automatically recover from performance drops and rebuild
            difficulty at the right pace.
          </p>
        </div>

      </div>

      {/* Recovery Alert */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div>

            <h2 className="font-bold text-orange-700">
              Performance Drop Detected
            </h2>

            <p className="text-gray-600 mt-2">
              Your recent accuracy dropped from <strong>81%</strong> to{" "}
              <strong>42%</strong> after several difficult questions.
              Difficulty has been temporarily reduced to support recovery.
            </p>

            {!started && (
              <button
                type="button"
                onClick={() => setStarted(true)}
                className="mt-4 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold"
              >
                Start Recovery Mode
              </button>
            )}

          </div>

        </div>

      </div>

      {started && (
        <>
          {/* Recovery Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <RotateCcw
              className="mx-auto text-indigo-600"
              size={40}
            />

            <p className="text-sm text-gray-500 mt-3">
              Recovery Progress
            </p>

            <p className="text-6xl font-black text-indigo-600">
              72%
            </p>

            <p className="text-gray-600 mt-2">
              Your performance is recovering. Continue with reinforcement
              questions before returning to advanced difficulty.
            </p>

          </div>

          {/* Recovery Timeline */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Difficulty Recovery Progression
            </h2>

            <div className="space-y-5 mt-6">

              {recoverySteps.map((step, index) => (
                <div
                  key={step.stage}
                  className="flex gap-4"
                >

                  <div className="flex flex-col items-center">

                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index === recoverySteps.length - 1
                          ? "bg-green-100 text-green-600"
                          : "bg-indigo-100 text-indigo-600"
                      }`}
                    >
                      {index === recoverySteps.length - 1 ? (
                        <CheckCircle2 size={20} />
                      ) : (
                        index + 1
                      )}
                    </div>

                    {index < recoverySteps.length - 1 && (
                      <div className="w-0.5 h-10 bg-gray-200 mt-1" />
                    )}

                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between">

                      <div>

                        <h3 className="font-semibold">
                          {step.stage}
                        </h3>

                        <p className="text-sm text-gray-500">
                          Difficulty: {step.difficulty}
                        </p>

                      </div>

                      <span className="font-bold text-indigo-600">
                        {step.score}%
                      </span>

                    </div>

                    <span className="inline-block mt-2 px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold">
                      {step.status}
                    </span>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Reinforcement Questions */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Recommended Recovery Questions
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              These questions reinforce the underlying concepts before
              difficulty increases again.
            </p>

            <div className="space-y-4 mt-5">

              {questions.map((question) => (
                <button
                  type="button"
                  key={question.title}
                  onClick={() =>
                    setSelected(
                      selected?.title === question.title
                        ? null
                        : question
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex justify-between">

                    <div>

                      <h3 className="font-semibold">
                        {question.title}
                      </h3>

                      <span className="inline-block mt-2 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                        {question.difficulty}
                      </span>

                    </div>

                    <Target className="text-indigo-600" />

                  </div>

                  {selected?.title === question.title && (
                    <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                      <p className="text-sm text-gray-600">
                        {question.reason}
                      </p>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRecovered(true);
                        }}
                        className="mt-3 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold"
                      >
                        Start Question
                      </button>

                    </div>
                  )}

                </button>
              ))}

            </div>

          </div>

          {/* Concept Reassessment */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <h2 className="font-bold text-indigo-700">
              Underlying Concept Reassessment
            </h2>

            <p className="text-gray-600 mt-2">
              AI identified <strong>Sliding Window</strong> and{" "}
              <strong>Hashing</strong> as the concepts most affected by the
              performance drop.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-4">

              <div className="bg-white rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Sliding Window
                </p>

                <p className="text-2xl font-bold text-orange-600">
                  61%
                </p>

                <p className="text-sm text-gray-500">
                  Needs reinforcement
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-sm text-gray-500">
                  Hashing
                </p>

                <p className="text-2xl font-bold text-green-600">
                  84%
                </p>

                <p className="text-sm text-gray-500">
                  Recovering well
                </p>

              </div>

            </div>

          </div>

          {/* Recovery Complete */}
          {recovered && (
            <div className="bg-green-50 rounded-2xl p-6">

              <div className="flex gap-3">

                <TrendingUp
                  className="text-green-600"
                  size={28}
                />

                <div>

                  <h2 className="font-bold text-green-700">
                    Recovery Progress Recorded
                  </h2>

                  <p className="text-gray-600 mt-2">
                    Your recovery activity has been recorded. If your next
                    results remain stable, AI will gradually increase the
                    difficulty toward the previous level.
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* AI Recommendation */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              AI Recovery Strategy
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="border rounded-xl p-4">

                <TrendingDown className="text-orange-600" />

                <h3 className="font-semibold mt-3">
                  Reduce
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Temporarily lower difficulty after a meaningful performance
                  decline.
                </p>

              </div>

              <div className="border rounded-xl p-4">

                <RotateCcw className="text-indigo-600" />

                <h3 className="font-semibold mt-3">
                  Reinforce
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Use targeted questions to rebuild the affected concepts.
                </p>

              </div>

              <div className="border rounded-xl p-4">

                <TrendingUp className="text-green-600" />

                <h3 className="font-semibold mt-3">
                  Rebuild
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Gradually increase difficulty after stable improvement.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}