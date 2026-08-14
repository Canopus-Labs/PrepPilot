import React, { useState } from "react";
import {
  Brain,
  BarChart3,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  CheckCircle2,
  Target,
  Search,
  Lightbulb,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const patterns = [
  {
    name: "Missing Edge Cases",
    category: "Problem Solving",
    frequency: 12,
    recent: 4,
    trend: "up",
    severity: "High",
    description:
      "Boundary conditions and unusual inputs are frequently missed.",
    action:
      "Practice edge-case discovery before submitting each solution.",
  },
  {
    name: "Complexity Mistakes",
    category: "Algorithms",
    frequency: 9,
    recent: 2,
    trend: "down",
    severity: "Medium",
    description:
      "Time or space complexity is sometimes calculated incorrectly.",
    action:
      "Break the solution into operations before stating Big-O.",
  },
  {
    name: "Requirement Misreading",
    category: "Analysis",
    frequency: 7,
    recent: 3,
    trend: "up",
    severity: "High",
    description:
      "Important constraints or requirements are occasionally overlooked.",
    action:
      "Restate the problem and constraints before selecting an approach.",
  },
  {
    name: "Data-Structure Selection",
    category: "Algorithms",
    frequency: 6,
    recent: 1,
    trend: "down",
    severity: "Medium",
    description:
      "The chosen data structure does not always match the required operations.",
    action:
      "Compare required operations before selecting a data structure.",
  },
  {
    name: "Weak Explanations",
    category: "Communication",
    frequency: 8,
    recent: 5,
    trend: "up",
    severity: "High",
    description:
      "Solutions are sometimes correct but lack clear reasoning.",
    action:
      "Practice explaining approach, reasoning, complexity, and trade-offs.",
  },
  {
    name: "Implementation Errors",
    category: "Coding",
    frequency: 5,
    recent: 1,
    trend: "down",
    severity: "Low",
    description:
      "Minor syntax, indexing, or implementation mistakes occur during coding.",
    action:
      "Use a short validation checklist before submitting code.",
  },
];

const mistakeHistory = [
  {
    date: "Today",
    topic: "Binary Search",
    pattern: "Missing Edge Cases",
  },
  {
    date: "Yesterday",
    topic: "System Design",
    pattern: "Weak Explanations",
  },
  {
    date: "Aug 12",
    topic: "Graph Traversal",
    pattern: "Complexity Mistakes",
  },
  {
    date: "Aug 11",
    topic: "Arrays",
    pattern: "Missing Edge Cases",
  },
  {
    date: "Aug 10",
    topic: "Hash Maps",
    pattern: "Requirement Misreading",
  },
];

export default function AIInterviewPreparationMistakePatternDashboard() {
  const [selectedPattern, setSelectedPattern] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const totalMistakes = patterns.reduce(
    (sum, pattern) => sum + pattern.frequency,
    0
  );

  const highRisk = patterns.filter(
    (pattern) => pattern.severity === "High"
  ).length;

  const improving = patterns.filter(
    (pattern) => pattern.trend === "down"
  ).length;

  const worsening = patterns.filter(
    (pattern) => pattern.trend === "up"
  ).length;

  const highestPattern = [...patterns].sort(
    (a, b) => b.frequency - a.frequency
  )[0];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <BarChart3 size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Mistake Pattern Dashboard
          </h1>

          <p className="text-gray-500">
            Discover recurring interview mistake patterns instead of reviewing
            isolated incorrect answers.
          </p>
        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI ROOT-CAUSE ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Your most frequent pattern is {highestPattern.name}.
            </h2>

            <p className="text-gray-600 mt-2">
              You have made this type of mistake {highestPattern.frequency}{" "}
              times. AI recommends addressing the pattern directly instead of
              repeatedly practicing individual questions.
            </p>

          </div>

        </div>

      </div>

      {/* Overview */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Total Mistakes
            </p>

            <p className="text-3xl font-black text-indigo-600 mt-1">
              {totalMistakes}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              High-Risk Patterns
            </p>

            <p className="text-3xl font-black text-red-600 mt-1">
              {highRisk}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Improving Patterns
            </p>

            <p className="text-3xl font-black text-green-600 mt-1">
              {improving}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Worsening Patterns
            </p>

            <p className="text-3xl font-black text-orange-600 mt-1">
              {worsening}
            </p>

          </div>

        </div>

      </div>

      {/* Pattern List */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Search className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Recurring Mistake Patterns
            </h2>

            <p className="text-sm text-gray-500">
              Select a pattern to inspect its frequency, trend, and corrective
              action.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {patterns.map((pattern) => (

            <button
              type="button"
              key={pattern.name}
              onClick={() => setSelectedPattern(pattern)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedPattern?.name === pattern.name
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                <div
                  className={`p-3 rounded-xl ${
                    pattern.severity === "High"
                      ? "bg-red-100 text-red-600"
                      : pattern.severity === "Medium"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-green-100 text-green-600"
                  }`}
                >
                  <AlertTriangle size={22} />
                </div>

                <div className="flex-1">

                  <div className="flex items-center gap-3">

                    <h3 className="font-bold">
                      {pattern.name}
                    </h3>

                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                      {pattern.category}
                    </span>

                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    {pattern.description}
                  </p>

                </div>

                <div className="text-right">

                  <p className="text-2xl font-black">
                    {pattern.frequency}
                  </p>

                  <p className="text-xs text-gray-500">
                    occurrences
                  </p>

                </div>

                <div>

                  {pattern.trend === "up" ? (
                    <TrendingUp
                      className="text-red-600"
                      size={24}
                    />
                  ) : (
                    <TrendingDown
                      className="text-green-600"
                      size={24}
                    />
                  )}

                </div>

              </div>

              <div className="grid md:grid-cols-3 gap-3 mt-5">

                <div className="bg-gray-50 rounded-xl p-3">

                  <p className="text-xs text-gray-500">
                    RECENT
                  </p>

                  <p className="font-bold mt-1">
                    {pattern.recent}
                  </p>

                </div>

                <div className="bg-gray-50 rounded-xl p-3">

                  <p className="text-xs text-gray-500">
                    SEVERITY
                  </p>

                  <p
                    className={`font-bold mt-1 ${
                      pattern.severity === "High"
                        ? "text-red-600"
                        : pattern.severity === "Medium"
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {pattern.severity}
                  </p>

                </div>

                <div className="bg-gray-50 rounded-xl p-3">

                  <p className="text-xs text-gray-500">
                    TREND
                  </p>

                  <p className="font-bold mt-1">
                    {pattern.trend === "up"
                      ? "Increasing"
                      : "Improving"}
                  </p>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Pattern */}
      {selectedPattern && (
        <div className="bg-orange-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <AlertTriangle
              className="text-orange-600"
              size={30}
            />

            <div className="flex-1">

              <p className="text-xs font-bold text-orange-600">
                PATTERN ANALYSIS
              </p>

              <h2 className="text-2xl font-black text-orange-800 mt-1">
                {selectedPattern.name}
              </h2>

              <p className="text-gray-600 mt-2">
                {selectedPattern.description}
              </p>

              <div className="grid md:grid-cols-3 gap-4 mt-5">

                <div className="bg-white rounded-xl p-4">

                  <p className="text-xs text-gray-500">
                    TOTAL OCCURRENCES
                  </p>

                  <p className="text-2xl font-black mt-1">
                    {selectedPattern.frequency}
                  </p>

                </div>

                <div className="bg-white rounded-xl p-4">

                  <p className="text-xs text-gray-500">
                    RECENT OCCURRENCES
                  </p>

                  <p className="text-2xl font-black mt-1">
                    {selectedPattern.recent}
                  </p>

                </div>

                <div className="bg-white rounded-xl p-4">

                  <p className="text-xs text-gray-500">
                    CURRENT TREND
                  </p>

                  <p className="text-2xl font-black mt-1">
                    {selectedPattern.trend === "up"
                      ? "↑ Increasing"
                      : "↓ Improving"}
                  </p>

                </div>

              </div>

              <div className="mt-5 bg-white rounded-xl p-5">

                <div className="flex gap-3">

                  <Lightbulb
                    className="text-indigo-600"
                    size={22}
                  />

                  <div>

                    <p className="text-xs font-bold text-indigo-600">
                      RECOMMENDED CORRECTIVE ACTION
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      {selectedPattern.action}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Trend Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <TrendingUp className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Pattern Trend Analysis
            </h2>

            <p className="text-sm text-gray-500">
              Recent activity helps distinguish persistent weaknesses from
              improving ones.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {patterns.map((pattern) => (

            <div
              key={pattern.name}
              className="border rounded-xl p-5"
            >

              <div className="flex items-center gap-4">

                <div className="flex-1">

                  <p className="font-bold">
                    {pattern.name}
                  </p>

                  <div className="h-3 bg-gray-200 rounded-full mt-3">

                    <div
                      className={`h-full rounded-full ${
                        pattern.trend === "up"
                          ? "bg-red-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${Math.min(
                          pattern.frequency * 7,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>

                <div className="text-right">

                  {pattern.trend === "up" ? (
                    <p className="text-red-600 font-bold">
                      Increasing
                    </p>
                  ) : (
                    <p className="text-green-600 font-bold">
                      Improving
                    </p>
                  )}

                  <p className="text-xs text-gray-500 mt-1">
                    {pattern.recent} recent
                  </p>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Recent Mistakes */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Search className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Recent Mistake Evidence
              </h2>

              <p className="text-sm text-gray-500">
                Individual mistakes that contributed to recurring patterns.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showHistory
              ? "Hide History"
              : "Show History"}
          </button>

        </div>

        {showHistory && (
          <div className="space-y-3 mt-6">

            {mistakeHistory.map((item, index) => (

              <div
                key={`${item.date}-${item.topic}`}
                className="flex items-center gap-4 border rounded-xl p-4"
              >

                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <div className="flex-1">

                  <p className="font-bold">
                    {item.topic}
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    {item.date}
                  </p>

                </div>

                <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                  {item.pattern}
                </span>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Root Cause Categories */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Root-Cause Categories
            </h2>

            <p className="text-sm text-gray-500">
              AI groups mistakes into broader skill areas for targeted
              preparation.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          {[
            {
              title: "Problem Solving",
              count: 19,
              description:
                "Requirements, edge cases, and approach selection.",
            },
            {
              title: "Algorithmic Reasoning",
              count: 15,
              description:
                "Complexity analysis and data-structure decisions.",
            },
            {
              title: "Communication",
              count: 8,
              description:
                "Explanation clarity, structure, and technical precision.",
            },
          ].map((item) => (

            <div
              key={item.title}
              className="border rounded-xl p-5"
            >

              <BarChart3 className="text-indigo-600" />

              <h3 className="font-bold mt-3">
                {item.title}
              </h3>

              <p className="text-3xl font-black text-indigo-600 mt-2">
                {item.count}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {item.description}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* AI Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Brain
            className="text-indigo-600"
            size={28}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI RECOMMENDATION
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Focus on patterns, not just individual mistakes.
            </h2>

            <p className="text-gray-600 mt-2">
              Repeated mistakes often indicate a broader skill gap. Addressing
              the pattern can improve performance across many different
              questions instead of correcting the same mistake repeatedly.
            </p>

          </div>

        </div>

      </div>

      {/* Corrective Action */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Lightbulb className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Recommended Corrective Plan
            </h2>

            <p className="text-sm text-gray-500">
              Convert recurring mistake patterns into targeted preparation
              activities.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {patterns
            .filter((pattern) => pattern.severity === "High")
            .map((pattern, index) => (

              <div
                key={pattern.name}
                className="flex items-center gap-4 border rounded-xl p-5"
              >

                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <div className="flex-1">

                  <p className="font-bold">
                    {pattern.name}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    {pattern.action}
                  </p>

                </div>

                <button
                  type="button"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold flex items-center gap-2"
                >
                  Practice
                  <ArrowRight size={16} />
                </button>

              </div>
            ))}

        </div>

      </div>

      {/* Refresh */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setRefreshed(true)}
          className="px-5 py-3 rounded-xl border font-semibold flex items-center gap-2"
        >
          <RefreshCw size={18} />
          Refresh Analysis
        </button>

      </div>

      {refreshed && (
        <div className="bg-green-50 rounded-xl p-4">

          <div className="flex gap-3">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-green-700">
              Mistake pattern analysis refreshed using your latest practice
              activity.
            </p>

          </div>

        </div>
      )}

      {/* Framework */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Mistake Pattern Analysis Workflow
            </h2>

            <p className="text-sm text-gray-500">
              How AI converts individual mistakes into actionable insights.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {[
            "Collect Mistakes",
            "Group Patterns",
            "Measure Frequency",
            "Analyze Trends",
            "Find Root Cause",
            "Recommend Practice",
          ].map((step, index, array) => (

            <React.Fragment key={step}>

              <span className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm">
                {step}
              </span>

              {index < array.length - 1 && (
                <ArrowRight
                  className="text-gray-400"
                  size={18}
                />
              )}

            </React.Fragment>
          ))}

        </div>

      </div>

    </div>
  );
}