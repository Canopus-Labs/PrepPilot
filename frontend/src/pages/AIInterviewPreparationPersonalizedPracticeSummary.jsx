import React, { useState } from "react";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Target,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const improvements = [
  "Array problem solving",
  "SQL query accuracy",
  "Technical explanation clarity",
];

const weaknesses = [
  "Dynamic Programming",
  "System Design scalability",
];

const mistakes = [
  "Missed an edge case in a coding problem",
  "Underestimated memory complexity",
  "Skipped requirement clarification",
];

const nextActivities = [
  "Practice 3 Dynamic Programming problems",
  "Review system-design scalability patterns",
  "Complete one requirement-clarification challenge",
];

export default function AIInterviewPreparationPersonalizedPracticeSummary() {
  const [showDetails, setShowDetails] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Personalized Practice Summary
          </h1>

          <p className="text-gray-500">
            Understand what improved, what remains weak, and what to practice
            next after every preparation session.
          </p>
        </div>

      </div>

      {/* Overall Trend */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <TrendingUp className="text-indigo-600" size={32} />
          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              OVERALL PREPARATION TREND
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Positive Progress
            </h2>

            <p className="text-gray-600 mt-2">
              Your recent performance improved by 12%. Strong gains were seen
              in problem solving and technical communication, while Dynamic
              Programming remains a priority.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <Target className="text-indigo-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Activities
            </p>
            <p className="text-3xl font-black text-indigo-600">
              18
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Skills Improved
            </p>
            <p className="text-3xl font-black text-green-600">
              3
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <AlertTriangle className="text-orange-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Persistent Weaknesses
            </p>
            <p className="text-3xl font-black text-orange-600">
              2
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <AlertTriangle className="text-red-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Important Mistakes
            </p>
            <p className="text-3xl font-black text-red-600">
              3
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <TrendingUp className="text-purple-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Trend Score
            </p>
            <p className="text-3xl font-black text-purple-600">
              +12%
            </p>
          </div>

        </div>

      </div>

      {/* Recently Improved */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <CheckCircle2 className="text-green-600" />

          <div>
            <h2 className="font-bold text-lg">
              Recently Improved Skills
            </h2>

            <p className="text-sm text-gray-500">
              Skills showing measurable improvement during recent practice.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          {improvements.map((skill, index) => (

            <div
              key={skill}
              className="border rounded-2xl p-5 bg-green-50"
            >

              <div className="flex justify-between">

                <h3 className="font-bold">
                  {skill}
                </h3>

                <span className="text-green-700 font-black">
                  +{8 + index * 2}%
                </span>

              </div>

              <div className="h-3 bg-white rounded-full mt-5">

                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{
                    width: `${78 + index * 5}%`,
                  }}
                />

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Persistent Weaknesses */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <AlertTriangle className="text-orange-600" />

          <div>
            <h2 className="font-bold text-lg">
              Persistent Weaknesses
            </h2>

            <p className="text-sm text-gray-500">
              Areas that continue to affect recent performance.
            </p>
          </div>

        </div>

        <div className="space-y-4 mt-6">

          {weaknesses.map((weakness) => (

            <div
              key={weakness}
              className="border rounded-2xl p-5 bg-orange-50"
            >

              <div className="flex items-center justify-between">

                <div>
                  <h3 className="font-bold">
                    {weakness}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Requires additional targeted practice.
                  </p>
                </div>

                <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold">
                  Needs Revision
                </span>

              </div>

            </div>

          ))}

        </div>

      </div>

      {/* Important Mistakes */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <AlertTriangle className="text-red-600" />

          <div>
            <h2 className="font-bold text-lg">
              Important Mistakes
            </h2>

            <p className="text-sm text-gray-500">
              Mistakes that should influence your next preparation session.
            </p>
          </div>

        </div>

        <div className="space-y-3 mt-6">

          {mistakes.map((mistake, index) => (

            <div
              key={mistake}
              className="flex items-center gap-4 border rounded-xl p-4"
            >

              <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold">
                {index + 1}
              </div>

              <p className="font-semibold">
                {mistake}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Revision Required */}
      <div className="bg-purple-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain
            className="text-purple-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-purple-600">
              REVISION PRIORITY
            </p>

            <h2 className="text-xl font-bold text-purple-800 mt-1">
              Dynamic Programming should be revised next.
            </h2>

            <p className="text-gray-600 mt-2">
              Recent performance remains below your target despite repeated
              practice. Review recursion and problem decomposition before
              attempting more advanced Dynamic Programming questions.
            </p>

          </div>

        </div>

      </div>

      {/* Next Activities */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Recommended Next Activities
            </h2>

            <p className="text-sm text-gray-500">
              AI-generated actions based on your latest performance.
            </p>
          </div>

        </div>

        <div className="space-y-4 mt-6">

          {nextActivities.map((activity, index) => (

            <div
              key={activity}
              className="flex items-center gap-4 border rounded-2xl p-5"
            >

              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black">
                {index + 1}
              </div>

              <div className="flex-1">

                <p className="font-bold">
                  {activity}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Recommended based on recent performance.
                </p>

              </div>

              <ArrowRight className="text-indigo-500" />

            </div>

          ))}

        </div>

      </div>

      {/* Preparation Trend */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <TrendingUp className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Preparation Trend
            </h2>

            <p className="text-sm text-gray-500">
              Recent performance compared with earlier practice.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-5 mt-6">

          <div className="bg-gray-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              PREVIOUS
            </p>
            <p className="text-3xl font-black text-gray-700 mt-1">
              68%
            </p>
          </div>

          <div className="bg-indigo-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              CURRENT
            </p>
            <p className="text-3xl font-black text-indigo-600 mt-1">
              80%
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              IMPROVEMENT
            </p>
            <p className="text-3xl font-black text-green-600 mt-1">
              +12%
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              DIRECTION
            </p>
            <p className="text-xl font-black text-purple-600 mt-2">
              Positive
            </p>
          </div>

        </div>

      </div>

      {/* Summary Generator */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Generate Practice Summary
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Convert your latest practice data into a personalized,
              actionable summary.
            </p>

            <button
              type="button"
              onClick={() => setGenerated(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Generate Summary
              <ArrowRight size={18} />
            </button>

            {generated && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Personalized practice summary generated successfully.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Refresh */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Refresh Summary
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Recalculate the summary after completing additional practice.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Update Summary
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Practice summary updated successfully.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Final Guidance */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI PREPARATION PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Turn every practice session into the next action.
            </h2>

            <p className="text-gray-600 mt-2">
              Raw question counts and accuracy numbers are not enough. A useful
              practice summary should explain what changed, what still needs
              attention, and exactly what the candidate should do next.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}