import React from "react";
import {
  Brain,
  BookOpen,
  Code2,
  RotateCcw,
  Target,
  Mic,
} from "lucide-react";

const activities = [
  { name: "Learn", icon: BookOpen },
  { name: "Practice", icon: Code2 },
  { name: "Revise", icon: RotateCcw },
  { name: "Assess", icon: Target },
  { name: "Mock Interview", icon: Mic },
];

export default function AIInterviewPreparationActivitySequenceOptimizer() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Activity Sequence Optimizer
          </h1>

          <p className="text-gray-500">
            Find the most effective order for your preparation activities.
          </p>
        </div>
      </div>

      {/* Sequence */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg mb-5">
          Recommended Sequence
        </h2>

        <div className="space-y-3">

          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <div
                key={activity.name}
                className="flex items-center gap-4 border rounded-xl p-4"
              >
                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <Icon className="text-indigo-600" />

                <span className="font-semibold">
                  {activity.name}
                </span>
              </div>
            );
          })}

        </div>

      </div>

      {/* AI Reason */}
      <div className="bg-indigo-50 rounded-2xl p-5">

        <h2 className="font-bold text-indigo-700">
          Why This Sequence?
        </h2>

        <p className="text-gray-600 mt-2">
          Your recent performance shows that learning and practice should come
          before assessment. Revision is placed before the assessment to
          strengthen weak areas, followed by a mock interview.
        </p>

      </div>

      {/* Optimization Factors */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Optimization Factors
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 mt-4">

          <div className="border rounded-xl p-4">
            <p className="text-gray-500">Performance</p>
            <p className="font-bold text-indigo-600">High Impact</p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-gray-500">Topic Difficulty</p>
            <p className="font-bold text-indigo-600">Medium</p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-gray-500">Previous Results</p>
            <p className="font-bold text-indigo-600">Analyzed</p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-gray-500">Interview Timeline</p>
            <p className="font-bold text-indigo-600">2 Weeks</p>
          </div>

        </div>

      </div>

    </div>
  );
}