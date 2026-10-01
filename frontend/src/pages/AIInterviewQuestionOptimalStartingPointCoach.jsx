import React, { useState } from "react";
import {
  Brain,
  Target,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    title: "Identify the Objective",
    hint: "First determine exactly what the problem is asking you to find, return, or optimize.",
  },
  {
    title: "Identify Input & Output",
    hint: "Write down what information you receive and what the expected result should look like.",
  },
  {
    title: "Check Constraints",
    hint: "Look at input size and restrictions. They can eliminate inefficient approaches.",
  },
  {
    title: "Recognize Patterns",
    hint: "Ask whether the problem resembles a known pattern such as hashing, two pointers, sliding window, or binary search.",
  },
  {
    title: "Make an Initial Observation",
    hint: "Look for a small property or relationship that could lead toward a solution.",
  },
];

export default function AIInterviewQuestionOptimalStartingPointCoach() {
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  const [observation, setObservation] = useState("");

  const currentStep = steps[step];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Optimal Starting Point Coach
          </h1>

          <p className="text-gray-500">
            Learn how to find the right starting point for unfamiliar
            interview problems.
          </p>
        </div>

      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Interview Problem
        </p>

        <h2 className="text-xl font-bold mt-2">
          Given an array of integers, find the longest contiguous subarray
          whose sum is equal to a target value.
        </h2>

        <p className="text-gray-600 mt-3">
          Do not search for the complete solution yet. Start by analyzing the
          problem systematically.
        </p>

      </div>

      {!started ? (
        /* Start */
        <div className="bg-indigo-50 rounded-2xl p-6 text-center">

          <Target
            className="mx-auto text-indigo-600"
            size={34}
          />

          <h2 className="text-xl font-bold mt-3">
            Where Should You Begin?
          </h2>

          <p className="text-gray-600 mt-2">
            The coach will guide you through the reasoning process without
            revealing the final algorithm.
          </p>

          <button
            type="button"
            onClick={() => setStarted(true)}
            className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            Start Guided Analysis
          </button>

        </div>
      ) : (
        <>
          {/* Progress */}
          <div className="bg-white rounded-2xl shadow p-5">

            <div className="flex justify-between text-sm">
              <span className="font-semibold">
                Guided Analysis
              </span>

              <span>
                Step {step + 1} of {steps.length}
              </span>
            </div>

            <div className="h-2 bg-gray-200 rounded-full mt-3">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all"
                style={{
                  width: `${((step + 1) / steps.length) * 100}%`,
                }}
              />
            </div>

          </div>

          {/* Current Step */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                <Lightbulb size={22} />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Step {step + 1}
                </p>

                <h2 className="text-xl font-bold">
                  {currentStep.title}
                </h2>
              </div>

            </div>

            <div className="mt-5 bg-indigo-50 rounded-xl p-4">

              <p className="font-semibold text-indigo-700">
                AI Guidance
              </p>

              <p className="text-gray-600 mt-2">
                {currentStep.hint}
              </p>

            </div>

            {/* Observation Input */}
            <div className="mt-5">

              <label className="font-semibold">
                Your Observation
              </label>

              <textarea
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
                rows={5}
                placeholder="Write what you think about this step..."
                className="w-full border rounded-xl p-4 mt-2 outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            <button
              type="button"
              disabled={!observation.trim()}
              onClick={() => {
                if (step < steps.length - 1) {
                  setStep(step + 1);
                  setObservation("");
                }
              }}
              className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
            >
              {step === steps.length - 1
                ? "Complete Analysis"
                : "Continue"}
              <ArrowRight size={18} />
            </button>

          </div>

          {/* Completed Steps */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Reasoning Progress
            </h2>

            <div className="space-y-3 mt-4">

              {steps.map((item, index) => (
                <div
                  key={item.title}
                  className={`flex items-center gap-3 p-3 rounded-xl ${
                    index < step
                      ? "bg-green-50"
                      : index === step
                      ? "bg-indigo-50"
                      : "bg-gray-50"
                  }`}
                >

                  {index < step ? (
                    <CheckCircle2
                      className="text-green-600"
                      size={20}
                    />
                  ) : (
                    <Target
                      className="text-gray-400"
                      size={20}
                    />
                  )}

                  <span className="font-medium">
                    {item.title}
                  </span>

                </div>
              ))}

            </div>

          </div>

          {/* Final Guidance */}
          {step === steps.length - 1 && observation && (
            <div className="bg-green-50 rounded-2xl p-5">

              <div className="flex gap-3">

                <CheckCircle2 className="text-green-600" />

                <div>

                  <h2 className="font-bold text-green-700">
                    Starting-Point Analysis Complete
                  </h2>

                  <p className="text-gray-600 mt-2">
                    You have identified the objective, input/output,
                    constraints, possible patterns, and an initial observation.
                    You are now ready to develop an algorithm instead of
                    jumping directly to a solution.
                  </p>

                </div>

              </div>

            </div>
          )}

        </>
      )}

    </div>
  );
}