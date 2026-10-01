import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lock,
  ArrowRight,
  TrendingUp,
} from "lucide-react";

const checkpointData = [
  {
    name: "Concept Understanding",
    score: 86,
    feedback: "Core concepts are understood correctly.",
  },
  {
    name: "Recall Ability",
    score: 78,
    feedback: "Most concepts can be recalled without notes.",
  },
  {
    name: "Practice Performance",
    score: 84,
    feedback: "Recent practice accuracy is consistently strong.",
  },
  {
    name: "Difficulty Handling",
    score: 72,
    feedback: "Medium problems are handled well, but advanced problems need more practice.",
  },
  {
    name: "Common Mistakes",
    score: 69,
    feedback: "A few recurring edge-case mistakes remain.",
  },
];

export default function AIInterviewPreparationLearningPathCheckpoint() {
  const [evaluated, setEvaluated] = useState(false);
  const [progressed, setProgressed] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Learning Path Checkpoint
          </h1>

          <p className="text-gray-500">
            Verify your readiness before progressing to the next preparation
            stage.
          </p>
        </div>

      </div>

      {/* Current Stage */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm text-gray-500">
              Current Learning Stage
            </p>

            <h2 className="text-2xl font-bold mt-1">
              Data Structures Foundations
            </h2>

          </div>

          <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
            <Target size={28} />
          </div>

        </div>

        <div className="flex items-center gap-3 mt-6">

          <div className="flex-1 h-3 bg-gray-200 rounded-full">

            <div className="h-full w-[100%] bg-indigo-600 rounded-full" />

          </div>

          <span className="font-bold">
            100%
          </span>

        </div>

        <p className="text-sm text-gray-500 mt-3">
          Activities completed. Mastery checkpoint is required before moving
          forward.
        </p>

      </div>

      {/* Evaluate */}
      {!evaluated && (
        <div className="bg-indigo-50 rounded-2xl p-6 text-center">

          <Target
            className="mx-auto text-indigo-600"
            size={38}
          />

          <h2 className="text-xl font-bold mt-3">
            Ready for Your Checkpoint?
          </h2>

          <p className="text-gray-600 mt-2">
            AI will evaluate your understanding, recall, practice accuracy,
            difficulty handling, and recurring mistakes.
          </p>

          <button
            type="button"
            onClick={() => setEvaluated(true)}
            className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            Run AI Checkpoint
          </button>

        </div>
      )}

      {evaluated && (
        <>
          {/* Result */}
          <div className="bg-green-50 rounded-2xl p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={40}
            />

            <p className="text-gray-500 mt-3">
              Checkpoint Result
            </p>

            <p className="text-4xl font-black text-green-600">
              Ready to Progress
            </p>

            <p className="text-gray-600 mt-2">
              Your foundation is strong enough to begin the next stage.
            </p>

          </div>

          {/* Overall Score */}
          <div className="bg-white rounded-2xl shadow p-6 text-center">

            <p className="text-sm text-gray-500">
              Overall Readiness Score
            </p>

            <p className="text-6xl font-black text-indigo-600 mt-2">
              78%
            </p>

            <p className="text-gray-600 mt-2">
              Minimum progression threshold: 70%
            </p>

          </div>

          {/* Evaluation Breakdown */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Checkpoint Evaluation
            </h2>

            <div className="space-y-5 mt-5">

              {checkpointData.map((item) => (
                <div key={item.name}>

                  <div className="flex justify-between">

                    <span className="font-semibold">
                      {item.name}
                    </span>

                    <span className="font-bold text-indigo-600">
                      {item.score}%
                    </span>

                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-2">

                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{
                        width: `${item.score}%`,
                      }}
                    />

                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    {item.feedback}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Remaining Weakness */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <AlertTriangle className="text-orange-600" />

              <div>

                <h2 className="font-bold text-orange-700">
                  Before the Next Stage
                </h2>

                <p className="text-gray-600 mt-2">
                  Your main remaining weakness is handling advanced difficulty
                  and avoiding edge-case mistakes. These do not currently
                  block progression, but targeted revision is recommended.
                </p>

              </div>

            </div>

          </div>

          {/* Next Stage */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              {progressed ? (
                <CheckCircle2 className="text-green-600" size={28} />
              ) : (
                <Lock className="text-indigo-600" size={28} />
              )}

              <div>

                <p className="text-sm text-gray-500">
                  Next Learning Stage
                </p>

                <h2 className="text-xl font-bold">
                  Advanced Algorithm Practice
                </h2>

              </div>

            </div>

            <button
              type="button"
              onClick={() => setProgressed(true)}
              disabled={progressed}
              className="mt-5 flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
            >
              {progressed ? "Progressed Successfully" : "Continue to Next Stage"}
              <ArrowRight size={18} />
            </button>

          </div>

          {/* AI Insight */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <TrendingUp className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Learning Insight
                </h2>

                <p className="text-gray-600 mt-2">
                  Completion alone does not indicate mastery. Your checkpoint
                  combines multiple signals to determine whether you are ready
                  for more difficult practice while keeping your weaker areas
                  visible.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}