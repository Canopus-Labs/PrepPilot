import React, { useState } from "react";
import {
  Brain,
  Clock3,
  HardDrive,
  GitCompare,
  CheckCircle2,
  Lightbulb,
  Target,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const solutions = [
  {
    name: "Brute Force",
    time: "O(n²)",
    space: "O(1)",
    timeScore: 45,
    spaceScore: 95,
    practical: "Simple but slow for large inputs.",
    appropriate: "Small inputs and quick prototypes.",
  },
  {
    name: "Hash Map",
    time: "O(n)",
    space: "O(n)",
    timeScore: 90,
    spaceScore: 55,
    practical: "Fast lookup with additional memory.",
    appropriate: "When speed is more important than memory.",
  },
  {
    name: "Sorting + Two Pointer",
    time: "O(n log n)",
    space: "O(1)",
    timeScore: 72,
    spaceScore: 88,
    practical: "Good balance when input modification is allowed.",
    appropriate: "Memory-constrained environments.",
  },
];

const comparisonFactors = [
  {
    label: "Time Complexity",
    icon: Clock3,
  },
  {
    label: "Space Complexity",
    icon: HardDrive,
  },
  {
    label: "Practical Performance",
    icon: Target,
  },
  {
    label: "Use Case",
    icon: Lightbulb,
  },
];

const workflow = [
  "Identify Approaches",
  "Analyze Complexity",
  "Compare Performance",
  "Evaluate Trade-Offs",
  "Choose Approach",
];

export default function AIInterviewQuestionSolutionAlternativeComplexityExplorer() {
  const [selected, setSelected] = useState(1);
  const [showComparison, setShowComparison] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const current = solutions[selected];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Alternative Complexity Explorer
          </h1>

          <p className="text-gray-500">
            Compare alternative interview solutions by time, space, and
            practical performance.
          </p>
        </div>

      </div>

      {/* Main Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <GitCompare className="text-indigo-600" size={32} />
          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI ANALYSIS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Hash Map is the fastest general-purpose approach
            </h2>

            <p className="text-gray-600 mt-2">
              It improves average lookup performance to O(n) overall, but uses
              additional O(n) memory compared with the brute-force approach.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <GitCompare className="text-indigo-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Alternatives
            </p>
            <p className="text-3xl font-black text-indigo-600">
              3
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <Clock3 className="text-green-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Best Time
            </p>
            <p className="text-3xl font-black text-green-600">
              O(n)
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <HardDrive className="text-purple-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Best Space
            </p>
            <p className="text-3xl font-black text-purple-600">
              O(1)
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <Target className="text-orange-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Recommended
            </p>
            <p className="text-xl font-black text-orange-600">
              Hash Map
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Confidence
            </p>
            <p className="text-3xl font-black text-green-600">
              92%
            </p>
          </div>

        </div>

      </div>

      {/* Solution Selector */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <GitCompare className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Alternative Solutions
            </h2>

            <p className="text-sm text-gray-500">
              Select an approach to inspect its complexity and use case.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          {solutions.map((solution, index) => (

            <button
              type="button"
              key={solution.name}
              onClick={() => setSelected(index)}
              className={`text-left border rounded-2xl p-5 ${
                selected === index
                  ? "border-indigo-500 bg-indigo-50"
                  : ""
              }`}
            >

              <div className="flex justify-between">

                <h3 className="font-bold">
                  {solution.name}
                </h3>

                {selected === index && (
                  <CheckCircle2
                    className="text-indigo-600"
                    size={20}
                  />
                )}

              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">

                <div className="bg-white rounded-xl p-3">

                  <p className="text-xs text-gray-500">
                    TIME
                  </p>

                  <p className="font-black text-indigo-600">
                    {solution.time}
                  </p>

                </div>

                <div className="bg-white rounded-xl p-3">

                  <p className="text-xs text-gray-500">
                    SPACE
                  </p>

                  <p className="font-black text-purple-600">
                    {solution.space}
                  </p>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Solution */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Selected Approach: {current.name}
            </h2>

            <p className="text-sm text-gray-500">
              Detailed complexity analysis.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex items-center gap-3">
              <Clock3 className="text-indigo-600" />
              <h3 className="font-bold">
                Time Complexity
              </h3>
            </div>

            <p className="text-4xl font-black text-indigo-600 mt-4">
              {current.time}
            </p>

            <p className="text-gray-600 mt-2">
              Indicates how execution time grows as input size increases.
            </p>

          </div>

          <div className="bg-purple-50 rounded-2xl p-6">

            <div className="flex items-center gap-3">
              <HardDrive className="text-purple-600" />
              <h3 className="font-bold">
                Space Complexity
              </h3>
            </div>

            <p className="text-4xl font-black text-purple-600 mt-4">
              {current.space}
            </p>

            <p className="text-gray-600 mt-2">
              Indicates additional memory required by the approach.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-xl p-5 mt-5">

          <p className="text-xs font-bold text-gray-500">
            PRACTICAL PERFORMANCE
          </p>

          <p className="text-gray-700 mt-2">
            {current.practical}
          </p>

        </div>

        <div className="bg-green-50 rounded-xl p-5 mt-4">

          <p className="text-xs font-bold text-green-600">
            APPROPRIATE WHEN
          </p>

          <p className="text-gray-700 mt-2">
            {current.appropriate}
          </p>

        </div>

      </div>

      {/* Comparison */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <GitCompare className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Complexity Comparison
              </h2>

              <p className="text-sm text-gray-500">
                Compare all available approaches side by side.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowComparison(!showComparison)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showComparison ? "Hide Comparison" : "Show Comparison"}
          </button>

        </div>

        {showComparison && (
          <div className="overflow-x-auto mt-6">

            <table className="w-full text-left">

              <thead>
                <tr className="border-b">
                  <th className="p-3">
                    Approach
                  </th>
                  <th className="p-3">
                    Time
                  </th>
                  <th className="p-3">
                    Space
                  </th>
                  <th className="p-3">
                    Practical Performance
                  </th>
                </tr>
              </thead>

              <tbody>

                {solutions.map((solution) => (

                  <tr
                    key={solution.name}
                    className="border-b"
                  >

                    <td className="p-3 font-bold">
                      {solution.name}
                    </td>

                    <td className="p-3 text-indigo-600 font-bold">
                      {solution.time}
                    </td>

                    <td className="p-3 text-purple-600 font-bold">
                      {solution.space}
                    </td>

                    <td className="p-3 text-gray-600">
                      {solution.practical}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* Visual Scores */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Performance Profile
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Relative comparison of time and memory efficiency.
        </p>

        <div className="space-y-6 mt-6">

          {solutions.map((solution) => (

            <div key={solution.name}>

              <div className="flex justify-between">
                <span className="font-semibold">
                  {solution.name}
                </span>

                <span className="text-sm text-gray-500">
                  Time {solution.time} · Space {solution.space}
                </span>
              </div>

              <div className="mt-3">

                <div className="flex justify-between text-xs text-gray-500">
                  <span>Time Efficiency</span>
                  <span>{solution.timeScore}%</span>
                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{
                      width: `${solution.timeScore}%`,
                    }}
                  />
                </div>

              </div>

              <div className="mt-3">

                <div className="flex justify-between text-xs text-gray-500">
                  <span>Space Efficiency</span>
                  <span>{solution.spaceScore}%</span>
                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-1">
                  <div
                    className="h-full rounded-full bg-purple-500"
                    style={{
                      width: `${solution.spaceScore}%`,
                    }}
                  />
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-orange-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              AI INSIGHT
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              The fastest solution is not always the best solution.
            </h2>

            <p className="text-gray-600 mt-2">
              The Hash Map approach provides the best general-purpose time
              performance, but it requires additional memory. The two-pointer
              approach can be preferable when memory is constrained and
              modifying or sorting the input is acceptable.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  SPEED
                </p>
                <p className="font-bold text-green-700 mt-1">
                  Hash Map
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  MEMORY
                </p>
                <p className="font-bold text-purple-700 mt-1">
                  Brute Force / Two Pointer
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  BALANCE
                </p>
                <p className="font-bold text-indigo-700 mt-1">
                  Depends on Constraints
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Practice Challenge */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              INTERVIEW PRACTICE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Explain why you would choose {current.name}.
            </h2>

            <p className="text-gray-600 mt-2">
              Justify your choice using both time and space complexity, then
              explain the practical situation where another approach would be
              preferable.
            </p>

          </div>

        </div>

      </div>

      {/* Analyze */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Analyze Alternative Solutions
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Let the AI compare the approaches and identify the most suitable
              option for the problem constraints.
            </p>

            <button
              type="button"
              onClick={() => setAnalyzed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Run Complexity Analysis
              <ArrowRight size={18} />
            </button>

            {analyzed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Alternative solution complexity analysis completed.
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
              Refresh Analysis
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Recalculate the comparison after changing the problem
              constraints.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Update Comparison
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Complexity comparison updated successfully.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Complexity Exploration Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI compares alternative approaches.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowWorkflow(!showWorkflow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWorkflow ? "Hide Workflow" : "Show Workflow"}
          </button>

        </div>

        {showWorkflow && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            {workflow.map((item, index) => (

              <React.Fragment key={item}>

                <div className="border rounded-xl p-4 min-w-[150px]">

                  <p className="text-xs font-bold text-indigo-600">
                    STEP {index + 1}
                  </p>

                  <p className="font-bold mt-1">
                    {item}
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
              Choose the solution based on constraints, not complexity alone.
            </h2>

            <p className="text-gray-600 mt-2">
              A strong interview answer explains multiple valid approaches,
              compares their time and space requirements, and clearly states
              why one approach is preferable for the given constraints.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}