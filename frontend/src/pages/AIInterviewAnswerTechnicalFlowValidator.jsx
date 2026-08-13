import React, { useState } from "react";
import {
  Brain,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  GitBranch,
} from "lucide-react";

const reasoningSteps = [
  {
    step: 1,
    title: "Identify the Requirement",
    status: "Clear",
    score: 94,
    feedback: "The answer correctly identifies the main technical requirement.",
  },
  {
    step: 2,
    title: "Choose the Approach",
    status: "Clear",
    score: 88,
    feedback: "The selected approach is introduced logically.",
  },
  {
    step: 3,
    title: "Explain the Trade-off",
    status: "Missing Transition",
    score: 61,
    feedback:
      "The answer jumps to implementation without clearly connecting the approach to its trade-offs.",
  },
  {
    step: 4,
    title: "Explain Implementation",
    status: "Disconnected",
    score: 58,
    feedback:
      "The implementation details appear before the reasoning behind the design choice is fully established.",
  },
  {
    step: 5,
    title: "Explain Expected Result",
    status: "Clear",
    score: 83,
    feedback:
      "The final outcome is explained clearly and connects back to the solution.",
  },
];

export default function AIInterviewAnswerTechnicalFlowValidator() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Flow Validator
          </h1>

          <p className="text-gray-500">
            Check whether your technical reasoning follows a clear and logical
            sequence.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          How would you design a scalable API for a high-traffic application?
        </h2>

        <p className="text-gray-600 mt-3">
          Explain your reasoning from requirements through architecture,
          implementation, trade-offs, and expected results.
        </p>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Technical Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={8}
          placeholder="Explain your technical approach step by step..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Validate Technical Flow
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <GitBranch
              className="mx-auto text-indigo-600"
              size={40}
            />

            <p className="text-sm text-gray-500 mt-3">
              Technical Flow Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              76%
            </p>

            <span className="inline-block mt-3 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
              Needs Better Sequencing
            </span>

            <p className="text-gray-600 mt-3">
              Your main technical ideas are correct, but some reasoning steps
              need stronger transitions.
            </p>

          </div>

          {/* Flow Visualization */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Reasoning Flow
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI reconstructed the logical sequence of your explanation.
            </p>

            <div className="flex flex-col items-center mt-6">

              {reasoningSteps.map((item, index) => (
                <React.Fragment key={item.step}>

                  <button
                    type="button"
                    onClick={() =>
                      setSelected(
                        selected?.step === item.step
                          ? null
                          : item
                      )
                    }
                    className={`w-full max-w-xl text-left border rounded-2xl p-5 transition ${
                      item.status === "Clear"
                        ? "border-green-200 bg-green-50"
                        : "border-orange-200 bg-orange-50"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          item.status === "Clear"
                            ? "bg-green-100 text-green-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.step}
                      </div>

                      <div className="flex-1">

                        <h3 className="font-semibold">
                          {item.title}
                        </h3>

                        <span
                          className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                            item.status === "Clear"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {item.status}
                        </span>

                      </div>

                      <span className="font-bold text-indigo-600">
                        {item.score}%
                      </span>

                    </div>

                    {selected?.step === item.step && (
                      <div className="mt-4 bg-white rounded-xl p-4">

                        <p className="text-sm text-gray-600">
                          {item.feedback}
                        </p>

                      </div>
                    )}

                  </button>

                  {index < reasoningSteps.length - 1 && (
                    <ArrowDown
                      className="text-gray-400 my-2"
                      size={22}
                    />
                  )}

                </React.Fragment>
              ))}

            </div>

          </div>

          {/* Flow Problems */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={25}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  Logical Flow Issues
                </h2>

                <div className="space-y-3 mt-3">

                  <p className="text-gray-600">
                    <strong>1. Missing transition:</strong> The answer moves
                    from selecting the architecture directly into
                    implementation details.
                  </p>

                  <p className="text-gray-600">
                    <strong>2. Trade-off explanation:</strong> Explain why the
                    selected approach is preferable before describing how it
                    is implemented.
                  </p>

                  <p className="text-gray-600">
                    <strong>3. Reasoning order:</strong> Establish the
                    requirement → compare options → choose the design →
                    explain implementation.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Recommended Sequence */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={25}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  Recommended Reasoning Sequence
                </h2>

                <div className="flex flex-wrap items-center gap-2 mt-4">

                  {[
                    "Requirement",
                    "Constraints",
                    "Options",
                    "Decision",
                    "Trade-offs",
                    "Implementation",
                    "Result",
                  ].map((item, index) => (
                    <React.Fragment key={item}>

                      <span className="px-3 py-2 rounded-lg bg-white font-semibold text-sm">
                        {item}
                      </span>

                      {index < 6 && (
                        <span className="text-indigo-400">
                          →
                        </span>
                      )}

                    </React.Fragment>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* Improvements */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={25}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Improvement Suggestions
                </h2>

                <ul className="space-y-2 mt-3 text-gray-600">

                  <li>
                    • State the requirements and constraints before choosing
                    the architecture.
                  </li>

                  <li>
                    • Briefly compare alternative approaches.
                  </li>

                  <li>
                    • Explain why your chosen approach fits the requirements.
                  </li>

                  <li>
                    • Introduce implementation details only after establishing
                    the design reasoning.
                  </li>

                </ul>

              </div>

            </div>

          </div>

          {/* Practice */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Technical Flow Practice
            </h2>

            <p className="text-gray-600 mt-2">
              Re-answer the question using the recommended sequence. Focus on
              connecting each step instead of listing technical concepts
              independently.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Practice Structured Explanation
            </button>

          </div>

        </>
      )}

    </div>
  );
}