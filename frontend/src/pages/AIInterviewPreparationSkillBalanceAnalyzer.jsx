import React, { useState } from "react";
import {
  Brain,
  Target,
  Code2,
  MessageSquare,
  Users,
  FolderKanban,
  Mic2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";

const skillCategories = [
  {
    name: "Technical Knowledge",
    score: 82,
    target: 85,
    activity: 24,
    icon: Brain,
    status: "Strong",
  },
  {
    name: "Coding & Problem Solving",
    score: 91,
    target: 85,
    activity: 38,
    icon: Code2,
    status: "Overemphasized",
  },
  {
    name: "Communication",
    score: 58,
    target: 80,
    activity: 10,
    icon: MessageSquare,
    status: "Needs Attention",
  },
  {
    name: "Behavioral Preparation",
    score: 52,
    target: 75,
    activity: 6,
    icon: Users,
    status: "Needs Attention",
  },
  {
    name: "Project Discussion",
    score: 69,
    target: 80,
    activity: 9,
    icon: FolderKanban,
    status: "Moderate",
  },
  {
    name: "Mock Interviews",
    score: 64,
    target: 80,
    activity: 5,
    icon: Mic2,
    status: "Needs Attention",
  },
];

const recommendations = [
  {
    title: "Increase communication practice",
    reason:
      "Communication is significantly below the target readiness level.",
    action: "Add 3 technical explanation sessions this week.",
    priority: "High",
  },
  {
    title: "Add behavioral preparation",
    reason:
      "Behavioral preparation has received considerably less activity than coding.",
    action: "Practice 5 STAR-format behavioral questions.",
    priority: "High",
  },
  {
    title: "Reduce coding-only sessions",
    reason:
      "Coding activity is already above the desired preparation level.",
    action: "Replace two coding sessions with mock interviews.",
    priority: "Medium",
  },
];

export default function AIInterviewPreparationSkillBalanceAnalyzer() {
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const overallBalance = 68;

  const analyzeBalance = () => {
    setAnalyzed(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Interview Preparation Skill Balance Analyzer
          </h1>

          <p className="text-gray-500">
            Check whether your preparation covers all the skills required for
            a successful interview.
          </p>

        </div>

      </div>

      {/* Preparation Overview */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Preparation Overview
            </h2>

            <p className="text-sm text-gray-500">
              AI evaluates preparation across multiple interview skill areas.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-indigo-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Total Activities
            </p>

            <p className="text-3xl font-black text-indigo-600 mt-1">
              92
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Categories Covered
            </p>

            <p className="text-3xl font-black text-green-600 mt-1">
              6/6
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Balance Status
            </p>

            <p className="text-xl font-black text-orange-600 mt-2">
              Needs Improvement
            </p>

          </div>

        </div>

        <button
          type="button"
          onClick={analyzeBalance}
          className="mt-6 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          Analyze Preparation Balance
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 bg-white rounded-2xl">

                <Target
                  className="text-indigo-600"
                  size={42}
                />

              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Overall Skill Balance Score
                </p>

                <div className="flex items-end gap-3">

                  <p className="text-6xl font-black text-indigo-600">
                    {overallBalance}%
                  </p>

                  <span className="mb-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold">
                    Needs Improvement
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  Your preparation is strong in coding and technical knowledge,
                  but communication, behavioral preparation, and mock
                  interviews are receiving less attention.
                </p>

                <div className="h-4 bg-white rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{
                      width: `${overallBalance}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Skill Balance Breakdown
                </h2>

                <p className="text-sm text-gray-500">
                  Compare current readiness with the recommended preparation
                  level.
                </p>

              </div>

            </div>

            <div className="space-y-5 mt-6">

              {skillCategories.map((category) => {

                const Icon = category.icon;
                const selected =
                  selectedCategory === category.name;

                return (
                  <button
                    type="button"
                    key={category.name}
                    onClick={() =>
                      setSelectedCategory(
                        selected ? null : category.name
                      )
                    }
                    className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                  >

                    <div className="flex items-center gap-4">

                      <div className="p-3 bg-indigo-50 rounded-xl">

                        <Icon
                          className="text-indigo-600"
                          size={23}
                        />

                      </div>

                      <div className="flex-1">

                        <div className="flex flex-wrap justify-between gap-3">

                          <h3 className="font-bold">
                            {category.name}
                          </h3>

                          <div className="flex gap-3">

                            <span className="font-black">
                              {category.score}%
                            </span>

                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                category.status === "Strong"
                                  ? "bg-green-100 text-green-700"
                                  : category.status ===
                                    "Overemphasized"
                                  ? "bg-purple-100 text-purple-700"
                                  : category.status ===
                                    "Needs Attention"
                                  ? "bg-red-100 text-red-700"
                                  : "bg-orange-100 text-orange-700"
                              }`}
                            >
                              {category.status}
                            </span>

                          </div>

                        </div>

                        <div className="h-4 bg-gray-200 rounded-full mt-4">

                          <div
                            className={`h-full rounded-full ${
                              category.score >= 80
                                ? "bg-green-500"
                                : category.score >= 65
                                ? "bg-indigo-500"
                                : "bg-orange-500"
                            }`}
                            style={{
                              width: `${category.score}%`,
                            }}
                          />

                        </div>

                        <div className="flex justify-between mt-2">

                          <span className="text-xs text-gray-500">
                            Target: {category.target}%
                          </span>

                          <span className="text-xs text-gray-500">
                            {category.activity} activities
                          </span>

                        </div>

                      </div>

                    </div>

                    {selected && (
                      <div className="grid md:grid-cols-3 gap-4 mt-5">

                        <div className="bg-gray-50 rounded-xl p-4">

                          <p className="text-xs text-gray-500">
                            Current Score
                          </p>

                          <p className="text-2xl font-black mt-1">
                            {category.score}%
                          </p>

                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">

                          <p className="text-xs text-gray-500">
                            Target
                          </p>

                          <p className="text-2xl font-black text-indigo-600 mt-1">
                            {category.target}%
                          </p>

                        </div>

                        <div className="bg-gray-50 rounded-xl p-4">

                          <p className="text-xs text-gray-500">
                            Gap
                          </p>

                          <p className="text-2xl font-black text-orange-600 mt-1">
                            {Math.max(
                              category.target -
                                category.score,
                              0
                            )}
                            %
                          </p>

                        </div>

                      </div>
                    )}

                  </button>
                );
              })}

            </div>

          </div>

          {/* Preparation Distribution */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Code2 className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Preparation Activity Distribution
                </h2>

                <p className="text-sm text-gray-500">
                  See how your preparation effort is currently distributed.
                </p>

              </div>

            </div>

            <div className="mt-6">

              <div className="h-10 flex rounded-xl overflow-hidden">

                <div
                  className="bg-indigo-600 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: "41%" }}
                >
                  Coding 41%
                </div>

                <div
                  className="bg-purple-600 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: "26%" }}
                >
                  Technical 26%
                </div>

                <div
                  className="bg-green-600 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: "11%" }}
                >
                  Communication
                </div>

                <div
                  className="bg-orange-500 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: "7%" }}
                >
                  Behavioral
                </div>

                <div
                  className="bg-pink-500 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: "10%" }}
                >
                  Projects
                </div>

                <div
                  className="bg-cyan-600 flex items-center justify-center text-white text-xs font-bold"
                  style={{ width: "5%" }}
                >
                  Mock
                </div>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              <div className="bg-red-50 rounded-xl p-4">

                <p className="text-xs text-red-600 font-bold">
                  Overemphasized
                </p>

                <p className="font-bold mt-1">
                  Coding / Problem Solving
                </p>

              </div>

              <div className="bg-orange-50 rounded-xl p-4">

                <p className="text-xs text-orange-600 font-bold">
                  Underprepared
                </p>

                <p className="font-bold mt-1">
                  Behavioral + Communication
                </p>

              </div>

              <div className="bg-green-50 rounded-xl p-4">

                <p className="text-xs text-green-600 font-bold">
                  Balanced
                </p>

                <p className="font-bold mt-1">
                  Technical Knowledge
                </p>

              </div>

            </div>

          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Lightbulb className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  AI Balance Recommendations
                </h2>

                <p className="text-sm text-gray-500">
                  Actions that can make your preparation more well-rounded.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {recommendations.map((item) => (

                <div
                  key={item.title}
                  className="border rounded-xl p-5"
                >

                  <div className="flex items-start gap-4">

                    <div className="p-3 bg-indigo-50 rounded-xl">

                      <Lightbulb
                        className="text-indigo-600"
                        size={21}
                      />

                    </div>

                    <div className="flex-1">

                      <div className="flex flex-wrap justify-between gap-3">

                        <h3 className="font-bold">
                          {item.title}
                        </h3>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.priority === "High"
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {item.priority} Priority
                        </span>

                      </div>

                      <p className="text-sm text-gray-500 mt-2">
                        {item.reason}
                      </p>

                      <div className="bg-gray-50 rounded-lg p-3 mt-3">

                        <p className="text-sm font-semibold">
                          Recommended action:
                        </p>

                        <p className="text-sm text-gray-600 mt-1">
                          {item.action}
                        </p>

                      </div>

                    </div>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Real Interview Coverage */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  Why Balance Matters
                </h2>

                <p className="text-gray-600 mt-2">
                  Strong coding performance alone does not guarantee interview
                  readiness. Real interviews can evaluate technical knowledge,
                  problem solving, communication, behavioral responses, project
                  ownership, and the ability to perform under realistic
                  interview conditions.
                </p>

              </div>

            </div>

          </div>

          {/* Balanced Plan */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <CalendarDaysIcon />

              <div>

                <h2 className="font-bold text-lg">
                  Suggested Balanced Weekly Plan
                </h2>

                <p className="text-sm text-gray-500">
                  Example distribution for a balanced preparation schedule.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              <div className="border rounded-xl p-5">

                <Code2 className="text-indigo-600" />

                <h3 className="font-bold mt-3">
                  Coding
                </h3>

                <p className="text-3xl font-black mt-1">
                  35%
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Algorithms, data structures, and problem solving.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Brain className="text-purple-600" />

                <h3 className="font-bold mt-3">
                  Technical
                </h3>

                <p className="text-3xl font-black mt-1">
                  25%
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  CS fundamentals and role-specific technical concepts.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <MessageSquare className="text-green-600" />

                <h3 className="font-bold mt-3">
                  Communication
                </h3>

                <p className="text-3xl font-black mt-1">
                  15%
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Technical explanations and structured responses.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Users className="text-orange-600" />

                <h3 className="font-bold mt-3">
                  Behavioral
                </h3>

                <p className="text-3xl font-black mt-1">
                  10%
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  STAR responses and common behavioral questions.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <FolderKanban className="text-pink-600" />

                <h3 className="font-bold mt-3">
                  Projects
                </h3>

                <p className="text-3xl font-black mt-1">
                  5%
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Project ownership, architecture, decisions, and results.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Mic2 className="text-cyan-600" />

                <h3 className="font-bold mt-3">
                  Mock Interviews
                </h3>

                <p className="text-3xl font-black mt-1">
                  10%
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Realistic practice combining all interview skills.
                </p>

              </div>

            </div>

          </div>

          {/* Final Verdict */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Balance Verdict
                </h2>

                <p className="text-gray-600 mt-2">
                  Your technical and coding preparation is strong, but your
                  current preparation is not fully balanced. Shift some coding
                  time toward communication, behavioral preparation, and mock
                  interviews to improve overall interview readiness.
                </p>

              </div>

            </div>

          </div>

          {/* Action */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Target
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  Recommended Next Step
                </h2>

                <p className="text-gray-600 mt-2">
                  Create a balanced preparation schedule that reduces
                  coding-only sessions and adds communication, behavioral, and
                  mock interview practice.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  Apply Balanced Plan
                  <ArrowUpRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}

function CalendarDaysIcon() {
  return (
    <div className="p-2 bg-indigo-50 rounded-xl">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        className="text-indigo-600"
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    </div>
  );
}