import React, { useState } from "react";
import {
  Brain,
  Target,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const patterns = [
  {
    name: "Two Pointers",
    category: "Algorithmic",
    practiced: 18,
    coverage: 90,
    status: "Strong",
  },
  {
    name: "Sliding Window",
    category: "Algorithmic",
    practiced: 14,
    coverage: 78,
    status: "Good",
  },
  {
    name: "Dynamic Programming",
    category: "Problem Solving",
    practiced: 8,
    coverage: 52,
    status: "Needs Practice",
  },
  {
    name: "Graph Traversal",
    category: "Algorithmic",
    practiced: 6,
    coverage: 44,
    status: "Needs Practice",
  },
  {
    name: "Caching & Scaling",
    category: "System Design",
    practiced: 5,
    coverage: 40,
    status: "Low",
  },
  {
    name: "Behavioral STAR",
    category: "Behavioral",
    practiced: 11,
    coverage: 72,
    status: "Good",
  },
];

const categories = [
  {
    name: "Problem-Solving Patterns",
    coverage: 76,
    practiced: 42,
    total: 55,
  },
  {
    name: "Question Structures",
    coverage: 68,
    practiced: 31,
    total: 46,
  },
  {
    name: "Algorithmic Techniques",
    coverage: 71,
    practiced: 38,
    total: 54,
  },
  {
    name: "System-Design Scenarios",
    coverage: 48,
    practiced: 12,
    total: 25,
  },
  {
    name: "Behavioral Patterns",
    coverage: 74,
    practiced: 22,
    total: 30,
  },
];

const recommendations = [
  {
    title: "Practice Dynamic Programming",
    reason:
      "Your question count is reasonable, but DP pattern coverage remains below the recommended level.",
    action:
      "Practice problems involving state definition, transitions, and optimization.",
  },
  {
    title: "Increase System-Design Variety",
    reason:
      "Your system-design practice is concentrated around a small number of scenarios.",
    action:
      "Add caching, messaging, distributed systems, and scalability scenarios.",
  },
  {
    title: "Diversify Graph Problems",
    reason:
      "Graph traversal has relatively low pattern exposure.",
    action:
      "Practice BFS, DFS, shortest path, topological sorting, and connectivity problems.",
  },
];

const workflow = [
  {
    title: "Collect",
    description: "Record completed interview activities.",
  },
  {
    title: "Classify",
    description: "Identify underlying patterns.",
  },
  {
    title: "Measure",
    description: "Calculate pattern coverage.",
  },
  {
    title: "Detect",
    description: "Find under-practiced patterns.",
  },
  {
    title: "Recommend",
    description: "Suggest targeted practice.",
  },
];

export default function AIInterviewPreparationInterviewPatternCoverage() {
  const [showPatterns, setShowPatterns] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [filter, setFilter] = useState("All");
  const [refreshed, setRefreshed] = useState(false);

  const filters = [
    "All",
    "Algorithmic",
    "Problem Solving",
    "System Design",
    "Behavioral",
  ];

  const filteredPatterns =
    filter === "All"
      ? patterns
      : patterns.filter((item) => item.category === filter);

  const overallCoverage = Math.round(
    categories.reduce((sum, item) => sum + item.coverage, 0) /
      categories.length
  );

  const strongPatterns = patterns.filter(
    (item) => item.coverage >= 70
  ).length;

  const weakPatterns = patterns.filter(
    (item) => item.coverage < 60
  ).length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Interview Pattern Coverage
          </h1>

          <p className="text-gray-500">
            Measure how broadly you have practiced important interview
            patterns instead of only counting questions.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {overallCoverage}%
              </p>

              <p className="text-xs text-gray-500">
                Coverage
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              OVERALL PATTERN COVERAGE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Good Breadth With Some Gaps
            </h2>

            <p className="text-gray-600 mt-2">
              You have strong exposure to several interview patterns, but
              some important areas still need additional practice.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <BarChart3 className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Overall Coverage
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {overallCoverage}%
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Strong Patterns
            </p>

            <p className="text-3xl font-black text-green-600">
              {strongPatterns}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Coverage Gaps
            </p>

            <p className="text-3xl font-black text-orange-600">
              {weakPatterns}
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Target className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Patterns Tracked
            </p>

            <p className="text-3xl font-black text-purple-600">
              {patterns.length}
            </p>

          </div>

        </div>

      </div>

      {/* Category Coverage */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="font-bold text-lg">
              Interview Category Coverage
            </h2>

            <p className="text-sm text-gray-500">
              See which broad interview areas have sufficient exposure.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowCategories(!showCategories)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showCategories
              ? "Hide Categories"
              : "Show Categories"}
          </button>

        </div>

        {showCategories && (
          <div className="space-y-5 mt-6">

            {categories.map((category) => (

              <div key={category.name}>

                <div className="flex justify-between gap-4 mb-2">

                  <div>

                    <p className="font-semibold">
                      {category.name}
                    </p>

                    <p className="text-xs text-gray-500">
                      {category.practiced} of {category.total} patterns
                      practiced
                    </p>

                  </div>

                  <span className="font-bold text-indigo-600">
                    {category.coverage}%
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full">

                  <div
                    className={`h-full rounded-full ${
                      category.coverage < 60
                        ? "bg-orange-500"
                        : "bg-indigo-500"
                    }`}
                    style={{
                      width: `${category.coverage}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Pattern Explorer */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="font-bold text-lg">
              Pattern Coverage Explorer
            </h2>

            <p className="text-sm text-gray-500">
              Inspect the underlying patterns behind your completed questions.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowPatterns(!showPatterns)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showPatterns
              ? "Hide Patterns"
              : "Show Patterns"}
          </button>

        </div>

        {showPatterns && (
          <>

            {/* Filters */}
            <div className="flex flex-wrap gap-2 mt-6">

              {filters.map((item) => (

                <button
                  type="button"
                  key={item}
                  onClick={() => setFilter(item)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                    filter === item
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {item}
                </button>

              ))}

            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">

              {filteredPatterns.map((pattern) => (

                <div
                  key={pattern.name}
                  className="border rounded-2xl p-5"
                >

                  <div className="flex justify-between gap-4">

                    <div>

                      <h3 className="font-bold">
                        {pattern.name}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {pattern.category}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        pattern.coverage >= 70
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {pattern.status}
                    </span>

                  </div>

                  <div className="flex justify-between mt-5">

                    <span className="text-sm text-gray-500">
                      {pattern.practiced} questions
                    </span>

                    <span className="font-black text-indigo-600">
                      {pattern.coverage}%
                    </span>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full mt-3">

                    <div
                      className={`h-full rounded-full ${
                        pattern.coverage < 60
                          ? "bg-orange-500"
                          : "bg-indigo-500"
                      }`}
                      style={{
                        width: `${pattern.coverage}%`,
                      }}
                    />

                  </div>

                </div>
              ))}

            </div>

          </>
        )}

      </div>

      {/* Hidden Gap Explanation */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              AI COVERAGE INSIGHT
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Question count does not equal pattern coverage
            </h2>

            <p className="text-gray-600 mt-2">
              You may solve many questions using the same underlying technique.
              The AI groups completed questions by their underlying patterns to
              reveal areas where practice breadth is still limited.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                CURRENT GAP
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                System-design scenarios currently have the lowest coverage at
                48%.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Pattern Diversity */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Preparation Breadth
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Compare total question volume with underlying pattern diversity.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="border rounded-2xl p-5">

            <p className="text-xs text-gray-500">
              QUESTIONS COMPLETED
            </p>

            <p className="text-4xl font-black text-indigo-600 mt-2">
              142
            </p>

          </div>

          <div className="border rounded-2xl p-5">

            <p className="text-xs text-gray-500">
              UNIQUE PATTERNS
            </p>

            <p className="text-4xl font-black text-green-600 mt-2">
              67
            </p>

          </div>

          <div className="border rounded-2xl p-5">

            <p className="text-xs text-gray-500">
              PATTERN DIVERSITY
            </p>

            <p className="text-4xl font-black text-purple-600 mt-2">
              47%
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-xl p-5 mt-5">

          <p className="text-sm text-gray-600">
            <strong>AI Insight:</strong> You have completed many questions, but
            several belong to the same underlying patterns. Increasing unique
            pattern exposure will provide broader interview preparation.
          </p>

        </div>

      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Pattern Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Target the patterns that currently have the largest coverage
                gaps.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowRecommendations(
                !showRecommendations
              )
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showRecommendations
              ? "Hide Recommendations"
              : "Show Recommendations"}
          </button>

        </div>

        {showRecommendations && (
          <div className="space-y-4 mt-6">

            {recommendations.map((item, index) => (

              <div
                key={item.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {item.reason}
                    </p>

                    <p className="text-sm font-semibold text-indigo-700 mt-2">
                      Action: {item.action}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Refresh Analysis */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              PATTERN ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Recalculate your preparation coverage
            </h2>

            <p className="text-gray-600 mt-2">
              New questions can introduce new patterns or strengthen existing
              ones. Refresh the analysis after completing additional practice.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Refresh Coverage
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Pattern coverage refreshed. Your dashboard now reflects the
                latest practice distribution.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Pattern Coverage Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI converts question history into preparation-breadth
                insights.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowWorkflow(!showWorkflow)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWorkflow
              ? "Hide Workflow"
              : "Show Workflow"}
          </button>

        </div>

        {showWorkflow && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            {workflow.map((step, index) => (

              <React.Fragment key={step.title}>

                <div className="border rounded-xl p-4 min-w-[155px]">

                  <p className="text-xs font-bold text-indigo-600">
                    STEP {index + 1}
                  </p>

                  <h3 className="font-bold mt-1">
                    {step.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-2">
                    {step.description}
                  </p>

                </div>

                {index < workflow.length - 1 && (
                  <ArrowRight
                    className="text-gray-400"
                    size={18}
                  />
                )}

              </React.Fragment>
            ))}

          </div>
        )}

      </div>

      {/* Final Guidance */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI INTERVIEW PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Practice breadth matters as much as question count.
            </h2>

            <p className="text-gray-600 mt-2">
              Solving more questions is useful, but strong interview
              preparation also requires exposure to different underlying
              patterns. Pattern coverage helps identify whether your practice
              is truly diverse.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}