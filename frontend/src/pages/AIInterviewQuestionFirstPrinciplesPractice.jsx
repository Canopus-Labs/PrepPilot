import React, { useState } from "react";
import {
  Brain,
  Lightbulb,
  Target,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

const steps = [
  {
    title: "Understand the Goal",
    prompt:
      "What exactly needs to be found or achieved? Describe the objective in your own words.",
  },
  {
    title: "Start With a Simple Approach",
    prompt:
      "If efficiency did not matter, how would you solve this problem using the most straightforward method?",
  },
  {
    title: "Identify the Bottleneck",
    prompt:
      "Which part of your simple approach would become slow when the input becomes large?",
  },
  {
    title: "Derive an Improvement",
    prompt:
      "What information could you reuse or avoid recalculating to improve the approach?",
  },
  {
    title: "Explain Why It Works",
    prompt:
      "Explain why your improved approach produces the correct result.",
  },
];

export default function AIInterviewQuestionFirstPrinciplesPractice() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answer, setAnswer] = useState("");
  const [completed, setCompleted] = useState(false);

  const currentStep = steps[step];

  const nextStep = () => {
    if (!answer.trim()) return;

    if (step === steps.length - 1) {
      setCompleted(true);
      return;
    }

    setStep(step + 1);
    setAnswer("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI First-Principles Practice
          </h1>

          <p className="text-gray-500">
            Derive solutions from fundamental reasoning instead of relying on
            memorized patterns.
          </p>
        </div>

      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Technical Problem
        </p>

        <h2 className="text-xl font-bold mt-2">
          Given an array of integers, find two numbers whose sum equals a
          target value.
        </h2>

        <p className="text-gray-600 mt-3">
          Do not use a known pattern or algorithm name yet. Derive the
          approach from the problem itself.
        </p>

      </div>

      {!started ? (
        /* Start */
        <div className="bg-indigo-50 rounded-2xl p-6 text-center">

          <Lightbulb
            className="mx-auto text-indigo-600"
            size={36}
          />

          <h2 className="text-xl font-bold mt-3">
            Think From First Principles
          </h2>

          <p className="text-gray-600 mt-2">
            The AI will guide your reasoning without immediately revealing
            patterns such as hashing or two pointers.
          </p>

          <button
            type="button"
            onClick={() => setStarted(true)}
            className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            Start Practice
          </button>

        </div>
      ) : !completed ? (
        <>
          {/* Progress */}
          <div className="bg-white rounded-2xl shadow p-5">

            <div className="flex justify-between text-sm">

              <span className="font-semibold">
                Reasoning Progress
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

          {/* Current Prompt */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                <Target size={22} />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Reasoning Step {step + 1}
                </p>

                <h2 className="text-xl font-bold">
                  {currentStep.title}
                </h2>

              </div>

            </div>

            <div className="bg-indigo-50 rounded-xl p-4 mt-5">

              <p className="font-semibold text-indigo-700">
                AI Prompt
              </p>

              <p className="text-gray-700 mt-2">
                {currentStep.prompt}
              </p>

            </div>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={6}
              placeholder="Explain your reasoning..."
              className="w-full border rounded-xl p-4 mt-5 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              disabled={!answer.trim()}
              onClick={nextStep}
              className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
            >
              {step === steps.length - 1
                ? "Finish Analysis"
                : "Continue Reasoning"}
              <ArrowRight size={18} />
            </button>

          </div>

          {/* Guidance */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Lightbulb className="text-orange-600" />

              <div>

                <h2 className="font-bold text-orange-700">
                  First-Principles Rule
                </h2>

                <p className="text-gray-600 mt-2">
                  Avoid naming a known algorithm unless you can explain why
                  its underlying idea follows naturally from the problem.
                </p>

              </div>

            </div>

          </div>

        </>
      ) : (
        /* Results */
        <>
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2 className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  First-Principles Analysis Complete
                </h2>

                <p className="text-gray-600 mt-2">
                  You derived an approach by starting with the problem
                  requirements and improving the initial solution rather than
                  receiving a pattern hint immediately.
                </p>

              </div>

            </div>

          </div>

          {/* Comparison */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Reasoning vs Standard Approach
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="bg-indigo-50 rounded-xl p-5">

                <h3 className="font-bold text-indigo-700">
                  Your Derived Reasoning
                </h3>

                <p className="text-gray-600 mt-3">
                  Start with checking pairs, identify repeated work, then
                  store previously observed values so future checks become
                  faster.
                </p>

              </div>

              <div className="bg-green-50 rounded-xl p-5">

                <h3 className="font-bold text-green-700">
                  Standard Solution Concept
                </h3>

                <p className="text-gray-600 mt-3">
                  A hash-based lookup can eliminate repeated searches and
                  reduce the expected time complexity to O(n).
                </p>

              </div>

            </div>

          </div>

          {/* Improvement */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Target className="text-orange-600" />

              <div>

                <h2 className="font-bold text-orange-700">
                  AI Reasoning Feedback
                </h2>

                <p className="text-gray-600 mt-2">
                  Your reasoning successfully identified the repeated-work
                  bottleneck. To improve further, explicitly connect the
                  stored information to the value needed to complete the
                  target sum.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}