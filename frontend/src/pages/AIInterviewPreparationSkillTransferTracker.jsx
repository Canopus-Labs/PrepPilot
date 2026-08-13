import React from "react";
import {
  Brain,
  ArrowRight,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const activities = [
  { name: "Learning Resources", score: 82 },
  { name: "Flashcards", score: 88 },
  { name: "Practice Questions", score: 76 },
  { name: "Assessments", score: 81 },
  { name: "Mock Interviews", score: 74 },
];

export default function AIInterviewPreparationSkillTransferTracker() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Skill Transfer Tracker
          </h1>

          <p className="text-gray-500">
            Measure how learning transfers across preparation activities.
          </p>
        </div>
      </div>

      {/* Transfer Score */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">
        <p className="text-gray-500">
          Overall Skill Transfer
        </p>

        <p className="text-6xl font-black text-indigo-600 mt-2">
          84%
        </p>

        <p className="text-gray-600 mt-2">
          Your recent learning is positively improving practice performance.
        </p>
      </div>

      {/* Activity Flow */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg mb-5">
          Learning → Performance Flow
        </h2>

        <div className="flex flex-wrap items-center justify-center gap-3">

          {activities.map((activity, index) => (
            <React.Fragment key={activity.name}>

              <div className="border rounded-xl p-4 text-center min-w-[130px]">
                <p className="font-semibold text-sm">
                  {activity.name}
                </p>

                <p className="text-2xl font-black text-indigo-600 mt-2">
                  {activity.score}%
                </p>
              </div>

              {index < activities.length - 1 && (
                <ArrowRight className="text-gray-400" />
              )}

            </React.Fragment>
          ))}

        </div>
      </div>

      {/* Insights */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <TrendingUp className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              AI Transfer Insight
            </h2>

            <p className="text-gray-600 mt-2">
              Flashcard performance improved by 12%, followed by an 8%
              improvement in related practice questions. This suggests the
              recent revision activity is transferring effectively.
            </p>
          </div>
        </div>

      </div>

      {/* Recommendation */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex gap-3">
          <CheckCircle2 className="text-indigo-600" />

          <div>
            <h2 className="font-bold">
              AI Recommendation
            </h2>

            <p className="text-gray-500 mt-2">
              Continue using flashcards before practice sessions and measure
              whether the improvement continues in assessments and mock
              interviews.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}