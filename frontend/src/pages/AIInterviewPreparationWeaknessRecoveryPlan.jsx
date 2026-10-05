import React from "react";
import {
  Brain,
  Target,
  BookOpen,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    title: "Identify Concept Gap",
    text: "Review the fundamentals of Dynamic Programming.",
    icon: Brain,
  },
  {
    title: "Learn Prerequisites",
    text: "Revise recursion, memoization, and state transitions.",
    icon: BookOpen,
  },
  {
    title: "Reduce Difficulty",
    text: "Practice Easy-level problems before returning to Hard questions.",
    icon: Target,
  },
  {
    title: "Focused Practice",
    text: "Complete targeted Dynamic Programming exercises.",
    icon: RotateCcw,
  },
  {
    title: "Reassess",
    text: "Retake a skill assessment to measure improvement.",
    icon: CheckCircle2,
  },
];

export default function AIInterviewPreparationWeaknessRecoveryPlan() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Weakness Recovery Plan
          </h1>

          <p className="text-gray-500">
            Get a structured plan for recovering from persistent topic
            weaknesses.
          </p>
        </div>

      </div>

      {/* Detected Weakness */}
      <div className="bg-red-50 rounded-2xl p-6">

        <p className="text-gray-500">
          Persistent Weakness Detected
        </p>

        <h2 className="text-3xl font-black text-red-600 mt-1">
          Dynamic Programming
        </h2>

        <p className="text-gray-600 mt-2">
          Recent accuracy: <b>42%</b> across 12 attempts.
        </p>

      </div>

      {/* Recovery Progress */}
      <div className="bg-indigo-50 rounded-2xl p-5">

        <div className="flex justify-between">
          <span className="font-semibold">
            Recovery Progress
          </span>

          <span className="font-bold text-indigo-600">
            40%
          </span>
        </div>

        <div className="h-3 bg-gray-200 rounded-full mt-3">
          <div
            className="h-full bg-indigo-600 rounded-full"
            style={{ width: "40%" }}
          />
        </div>

      </div>

      {/* Recovery Steps */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="text-lg font-bold mb-5">
          AI Recovery Plan
        </h2>

        <div className="space-y-4">

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="flex gap-4 border rounded-xl p-4"
              >

                <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600 h-fit">
                  <Icon size={22} />
                </div>

                <div>
                  <p className="font-bold">
                    {index + 1}. {step.title}
                  </p>

                  <p className="text-gray-500 mt-1">
                    {step.text}
                  </p>
                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* Recommendation */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <CheckCircle2 className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Temporarily reduce question difficulty and focus on the
              underlying concepts. Reassess your Dynamic Programming skills
              after completing the recovery plan.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}