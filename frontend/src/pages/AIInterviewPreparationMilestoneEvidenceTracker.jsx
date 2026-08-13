import React, { useState } from "react";
import {
  Brain,
  Trophy,
  CheckCircle2,
  CalendarDays,
  Target,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";

const activities = [
  {
    name: "Completed 25 Algorithm Questions",
    type: "Practice",
    result: "22 correct",
    impact: "+12% Problem Solving",
  },
  {
    name: "Algorithm Concept Assessment",
    type: "Assessment",
    result: "88%",
    impact: "+8% Algorithm Knowledge",
  },
  {
    name: "Mock Technical Interview",
    type: "Mock Interview",
    result: "81%",
    impact: "+10% Technical Communication",
  },
  {
    name: "Completed Active Recall Sessions",
    type: "Revision",
    result: "6 sessions",
    impact: "+9% Concept Recall",
  },
];

const questions = [
  "Two Sum Variation",
  "Longest Subarray",
  "Binary Search Optimization",
  "Graph Traversal Challenge",
];

export default function AIInterviewPreparationMilestoneEvidenceTracker() {
  const [selectedActivity, setSelectedActivity] = useState(null);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Milestone Evidence Tracker
          </h1>

          <p className="text-gray-500">
            See exactly what preparation activities contributed to each
            milestone.
          </p>
        </div>

      </div>

      {/* Milestone */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex justify-between items-start gap-4">

          <div className="flex gap-3">

            <div className="p-3 rounded-xl bg-yellow-100 text-yellow-600">
              <Trophy size={28} />
            </div>

            <div>

              <p className="text-sm text-gray-500">
                Preparation Milestone
              </p>

              <h2 className="text-2xl font-bold">
                Algorithm Foundations Completed
              </h2>

              <p className="text-gray-600 mt-2">
                You demonstrated sufficient knowledge and practice performance
                to complete the foundation stage.
              </p>

            </div>

          </div>

          <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
            Achieved
          </span>

        </div>

        <div className="flex items-center gap-3 mt-6">

          <CalendarDays className="text-indigo-600" />

          <div>

            <p className="text-sm text-gray-500">
              Date Achieved
            </p>

            <p className="font-semibold">
              August 13, 2026
            </p>

          </div>

        </div>

      </div>

      {/* Evidence Summary */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white rounded-2xl shadow p-5">

          <p className="text-sm text-gray-500">
            Activities
          </p>

          <p className="text-3xl font-black text-indigo-600 mt-2">
            18
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <p className="text-sm text-gray-500">
            Questions
          </p>

          <p className="text-3xl font-black text-indigo-600 mt-2">
            25
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <p className="text-sm text-gray-500">
            Assessment
          </p>

          <p className="text-3xl font-black text-green-600 mt-2">
            88%
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <p className="text-sm text-gray-500">
            Skill Improvement
          </p>

          <p className="text-3xl font-black text-green-600 mt-2">
            +14%
          </p>

        </div>

      </div>

      {/* Activities */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex items-center gap-2">

          <BarChart3 className="text-indigo-600" />

          <h2 className="font-bold text-lg">
            Contributing Activities
          </h2>

        </div>

        <p className="text-sm text-gray-500 mt-1">
          Select an activity to view its contribution.
        </p>

        <div className="space-y-3 mt-5">

          {activities.map((activity) => (
            <button
              type="button"
              key={activity.name}
              onClick={() =>
                setSelectedActivity(
                  selectedActivity?.name === activity.name
                    ? null
                    : activity
                )
              }
              className="w-full text-left border rounded-xl p-4 hover:border-indigo-400 transition"
            >

              <div className="flex justify-between gap-4">

                <div className="flex gap-3">

                  <CheckCircle2
                    className="text-green-600 mt-1"
                    size={21}
                  />

                  <div>

                    <h3 className="font-semibold">
                      {activity.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {activity.type}
                    </p>

                  </div>

                </div>

                <span className="font-bold text-indigo-600">
                  {activity.result}
                </span>

              </div>

              {selectedActivity?.name === activity.name && (
                <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                  <p className="text-sm text-gray-500">
                    Skill Impact
                  </p>

                  <p className="font-bold text-indigo-700 mt-1">
                    {activity.impact}
                  </p>

                </div>
              )}

            </button>
          ))}

        </div>

      </div>

      {/* Questions */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex items-center gap-2">

          <Target className="text-indigo-600" />

          <h2 className="font-bold text-lg">
            Relevant Questions
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-3 mt-5">

          {questions.map((question, index) => (
            <div
              key={question}
              className="flex items-center gap-3 p-4 rounded-xl bg-gray-50 border"
            >

              <span className="w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100 text-indigo-600 font-bold">
                {index + 1}
              </span>

              <span className="font-semibold">
                {question}
              </span>

            </div>
          ))}

        </div>

      </div>

      {/* Skill Improvements */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <ArrowUpRight className="text-green-600" />

          <div>

            <h2 className="font-bold text-green-700">
              Skills Improved Before Milestone
            </h2>

            <div className="grid md:grid-cols-3 gap-3 mt-4">

              {[
                ["Problem Solving", "+14%"],
                ["Algorithm Knowledge", "+11%"],
                ["Technical Communication", "+9%"],
              ].map(([skill, improvement]) => (
                <div
                  key={skill}
                  className="bg-white rounded-xl p-4"
                >

                  <p className="text-sm text-gray-500">
                    {skill}
                  </p>

                  <p className="text-2xl font-black text-green-600 mt-1">
                    {improvement}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-indigo-50 rounded-2xl p-5">

        <h2 className="font-bold text-indigo-700">
          AI Milestone Insight
        </h2>

        <p className="text-gray-600 mt-2">
          Your milestone was primarily supported by consistent question
          practice and active recall. The mock interview provided additional
          evidence that your technical knowledge could be communicated in an
          interview setting.
        </p>

      </div>

      {/* Learning History */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Preparation History
        </h2>

        <div className="mt-5 space-y-4">

          {[
            ["Week 1", "Concept learning and flashcards"],
            ["Week 2", "Algorithm practice"],
            ["Week 3", "Recall and assessments"],
            ["Week 4", "Mock interview and milestone achieved"],
          ].map(([week, description]) => (
            <div
              key={week}
              className="flex gap-4"
            >

              <div className="w-20 font-semibold text-indigo-600">
                {week}
              </div>

              <div className="flex-1 border-l-2 border-indigo-100 pl-4">
                <p className="text-gray-700">
                  {description}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}