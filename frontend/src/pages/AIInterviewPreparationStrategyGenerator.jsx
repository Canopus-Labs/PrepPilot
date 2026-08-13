import React from "react";
import {
  Brain,
  Target,
  BookOpen,
  CalendarCheck,
  TrendingUp,
} from "lucide-react";

const plan = [
  {
    week: "Week 1",
    focus: "DSA Fundamentals",
    practice: "5 questions/day",
    revision: "2 sessions",
  },
  {
    week: "Week 2",
    focus: "Advanced DSA",
    practice: "4 questions/day",
    revision: "2 sessions",
  },
  {
    week: "Week 3",
    focus: "System Design",
    practice: "3 case studies/day",
    revision: "2 sessions",
  },
  {
    week: "Week 4",
    focus: "Mock Interviews",
    practice: "2 mock interviews",
    revision: "Daily review",
  },
];

export default function AIInterviewPreparationStrategyGenerator() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Interview Preparation Strategy
          </h1>

          <p className="text-gray-500">
            Generate a personalized roadmap for your interview preparation.
          </p>
        </div>

      </div>

      {/* Profile */}
      <div className="grid sm:grid-cols-3 gap-4">

        <div className="bg-white rounded-2xl shadow p-5">
          <Target className="text-indigo-600" />
          <p className="text-gray-500 mt-3">Target Role</p>
          <p className="font-bold text-lg">Software Developer</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <TrendingUp className="text-green-600" />
          <p className="text-gray-500 mt-3">Skill Level</p>
          <p className="font-bold text-lg">Intermediate</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <CalendarCheck className="text-orange-600" />
          <p className="text-gray-500 mt-3">Preparation Time</p>
          <p className="font-bold text-lg">4 Weeks</p>
        </div>

      </div>

      {/* Priority Topics */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <h2 className="font-bold text-lg">
          AI Priority Topics
        </h2>

        <div className="flex flex-wrap gap-3 mt-4">

          {["Dynamic Programming", "Graphs", "System Design", "SQL"].map(
            (topic) => (
              <span
                key={topic}
                className="px-4 py-2 bg-white rounded-full text-indigo-600 font-semibold"
              >
                {topic}
              </span>
            )
          )}

        </div>

      </div>

      {/* Weekly Strategy */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="text-lg font-bold mb-5">
          Personalized Weekly Strategy
        </h2>

        <div className="space-y-4">

          {plan.map((item) => (
            <div
              key={item.week}
              className="border rounded-xl p-4"
            >

              <div className="flex justify-between">
                <h3 className="font-bold">
                  {item.week}
                </h3>

                <span className="text-indigo-600 font-semibold">
                  {item.focus}
                </span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 mt-4 text-sm">

                <div className="bg-gray-50 rounded-lg p-3">
                  Practice: {item.practice}
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  Revision: {item.revision}
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Resources */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex items-center gap-2">
          <BookOpen className="text-indigo-600" />
          <h2 className="font-bold text-lg">
            Recommended Resources
          </h2>
        </div>

        <ul className="mt-4 space-y-3 text-gray-600">
          <li>• Dynamic Programming practice sheet</li>
          <li>• Graph algorithms revision guide</li>
          <li>• System Design case studies</li>
          <li>• SQL interview question set</li>
        </ul>

      </div>

      {/* Adaptation */}
      <div className="bg-green-50 rounded-2xl p-5">

        <h2 className="font-bold text-green-700">
          AI Adaptive Planning
        </h2>

        <p className="text-gray-600 mt-2">
          The strategy will automatically rebalance topics, difficulty,
          revision frequency, and mock interviews as your performance changes.
        </p>

      </div>

    </div>
  );
}