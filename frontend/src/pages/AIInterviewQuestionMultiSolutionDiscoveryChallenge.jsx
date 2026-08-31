import React, { useState } from "react";
import {
  Brain,
  GitBranch,
  CheckCircle2,
  Lightbulb,
  Target,
  Clock,
  Database,
  ArrowRight,
  RefreshCw,
  Trophy,
  Scale,
  Sparkles,
} from "lucide-react";

const solutions = [
  {
    name: "Approach 1 — Brute Force",
    type: "Initial Solution",
    time: "O(n²)",
    space: "O(1)",
    score: 72,
    bestFor: "Small inputs and simple implementation",
    description:
      "Compare every pair directly. Easy to understand but becomes expensive as the input grows.",
  },
  {
    name: "Approach 2 — Hash Map",
    type: "Alternative Solution",
    time: "O(n)",
    space: "O(n)",
    score: 94,
    bestFor: "Large inputs where execution speed matters",
    description:
      "Store previously seen values in a hash map to reduce repeated searches.",
  },
];

const comparison = [
  {
    criterion: "Time Complexity",
    first: "O(n²)",
    second: "O(n)",
    winner: "Alternative",
  },
  {
    criterion: "Space Complexity",
    first: "O(1)",
    second: "O(n)",
    winner: "Initial",
  },
  {
    criterion: "Implementation Simplicity",
    first: "Very Simple",
    second: "Moderate",
    winner: "Initial",
  },
  {
    criterion: "Large Input Performance",
    first: "Weak",
    second: "Strong",
    winner: "Alternative",
  },
];

const workflow = [
  {
    title: "Solve",
    description: "Submit the first valid approach.",
  },
  {
    title: "Explore",
    description: "Search for another valid strategy.",
  },
  {
    title: "Compare",
    description: "Evaluate both solutions.",
  },
  {
    title: "Reason",
    description: "Explain their trade-offs.",
  },
  {
    title: "Choose",
    description: "Decide when each approach is preferable.",
  },
];

export default function AIInterviewQuestionMultiSolutionDiscoveryChallenge() {
  const [showSolutions, setShowSolutions] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [alternativeFound, setAlternativeFound] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState(1);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Multi-Solution Discovery Challenge
          </h1>

          <p className="text-gray-500">
            Practice finding multiple valid approaches and reasoning about
            their trade-offs.
          </p>

        </div>

      </div>

      {/* Challenge Banner */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <GitBranch
              className="text-indigo-600"
              size={32}
            />
          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              MULTI-SOLUTION CHALLENGE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Can you solve the problem another way?
            </h2>

            <p className="text-gray-600 mt-2">
              Finding one correct solution is only the first step. Explore an
              alternative and determine when each approach should be used.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <GitBranch
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Solutions Found
            </p>

            <p className="text-3xl font-black text-indigo-600">
              2
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Valid Approaches
            </p>

            <p className="text-3xl font-black text-green-600">
              2
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Clock
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Best Time
            </p>

            <p className="text-3xl font-black text-purple-600">
              O(n)
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <Database
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Space Trade-off
            </p>

            <p className="text-3xl font-black text-orange-600">
              O(n)
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <Trophy
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Discovery Score
            </p>

            <p className="text-3xl font-black text-green-600">
              91%
            </p>

          </div>

        </div>

      </div>

      {/* Interview Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Problem
            </h2>

            <p className="text-sm text-gray-500">
              First solve the problem normally, then search for another valid
              approach.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-5">

          <p className="text-gray-700 leading-7">
            Given an array of integers and a target value, find two numbers
            whose sum equals the target. Return their indices.
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-5">

          <div className="bg-indigo-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              Input
            </p>

            <p className="font-bold mt-1">
              Integer Array
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              Goal
            </p>

            <p className="font-bold mt-1">
              Find Target Pair
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              Requirement
            </p>

            <p className="font-bold mt-1">
              Explore Multiple Solutions
            </p>

          </div>

        </div>

      </div>

      {/* Initial Solution */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <CheckCircle2 className="text-green-600" />

          <div>

            <h2 className="font-bold text-lg">
              Initial Solution
            </h2>

            <p className="text-sm text-gray-500">
              Your first correct approach.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-5">

          <pre className="text-sm text-gray-700 whitespace-pre-wrap">
{`for (let i = 0; i < nums.length; i++) {
  for (let j = i + 1; j < nums.length; j++) {
    if (nums[i] + nums[j] === target) {
      return [i, j];
    }
  }
}`}
          </pre>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-5">

          <div className="bg-green-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              Correctness
            </p>

            <p className="text-xl font-black text-green-600">
              Valid
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              Time
            </p>

            <p className="text-xl font-black text-orange-600">
              O(n²)
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              Space
            </p>

            <p className="text-xl font-black text-indigo-600">
              O(1)
            </p>

          </div>

        </div>

      </div>

      {/* Discovery Challenge */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Sparkles
            className="text-orange-600 shrink-0"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              AI FOLLOW-UP
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Can you find a different valid solution?
            </h2>

            <p className="text-gray-600 mt-2">
              Your first approach works. Now try to reduce the time complexity
              without changing the required result.
            </p>

            <button
              type="button"
              onClick={() => setAlternativeFound(true)}
              className="mt-5 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold flex items-center gap-2"
            >
              Submit Alternative
              <ArrowRight size={18} />
            </button>

            {alternativeFound && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Alternative approach discovered successfully.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Solutions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <GitBranch className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Solution Comparison
              </h2>

              <p className="text-sm text-gray-500">
                Compare the approaches discovered for the same problem.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowSolutions(!showSolutions)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showSolutions
              ? "Hide Solutions"
              : "Show Solutions"}
          </button>

        </div>

        {showSolutions && (
          <div className="grid md:grid-cols-2 gap-5 mt-6">

            {solutions.map((solution, index) => (

              <button
                type="button"
                key={solution.name}
                onClick={() => setSelectedSolution(index)}
                className={`text-left border rounded-2xl p-5 ${
                  selectedSolution === index
                    ? "border-indigo-500 bg-indigo-50"
                    : ""
                }`}
              >

                <div className="flex justify-between gap-3">

                  <div>

                    <h3 className="font-bold">
                      {solution.name}
                    </h3>

                    <span className="text-xs text-indigo-600 font-semibold">
                      {solution.type}
                    </span>

                  </div>

                  <p className="text-2xl font-black text-indigo-600">
                    {solution.score}%
                  </p>

                </div>

                <p className="text-sm text-gray-500 mt-4">
                  {solution.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-5">

                  <div className="bg-white rounded-xl p-3">

                    <p className="text-xs text-gray-500">
                      Time
                    </p>

                    <p className="font-black">
                      {solution.time}
                    </p>

                  </div>

                  <div className="bg-white rounded-xl p-3">

                    <p className="text-xs text-gray-500">
                      Space
                    </p>

                    <p className="font-black">
                      {solution.space}
                    </p>

                  </div>

                </div>

                <div className="bg-white rounded-xl p-3 mt-3">

                  <p className="text-xs text-gray-500">
                    Best For
                  </p>

                  <p className="text-sm font-semibold mt-1">
                    {solution.bestFor}
                  </p>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Comparison */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Scale className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Trade-Off Analysis
              </h2>

              <p className="text-sm text-gray-500">
                Understand why one approach may be preferable in a specific
                situation.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowComparison(!showComparison)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showComparison
              ? "Hide Comparison"
              : "Show Comparison"}
          </button>

        </div>

        {showComparison && (
          <div className="overflow-x-auto mt-6">

            <table className="w-full text-left border-collapse">

              <thead>

                <tr className="border-b">

                  <th className="p-4">
                    Criterion
                  </th>

                  <th className="p-4">
                    Initial Solution
                  </th>

                  <th className="p-4">
                    Alternative
                  </th>

                  <th className="p-4">
                    Advantage
                  </th>

                </tr>

              </thead>

              <tbody>

                {comparison.map((item) => (

                  <tr
                    key={item.criterion}
                    className="border-b"
                  >

                    <td className="p-4 font-semibold">
                      {item.criterion}
                    </td>

                    <td className="p-4">
                      {item.first}
                    </td>

                    <td className="p-4">
                      {item.second}
                    </td>

                    <td className="p-4">

                      <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                        {item.winner}
                      </span>

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* Decision Coach */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-indigo-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI DECISION COACH
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Which solution would you choose?
            </h2>

            <p className="text-gray-600 mt-2">
              The hash-map approach is preferable for large inputs because it
              reduces time complexity from O(n²) to O(n), but it uses additional
              memory.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                INTERVIEW FOLLOW-UP
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                "When would you intentionally choose the slower O(n²) solution
                instead?"
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Discovery Score */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Correctness
            </p>

            <p className="text-3xl font-black text-green-600">
              100%
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-5">

            <GitBranch
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Alternative Discovery
            </p>

            <p className="text-3xl font-black text-indigo-600">
              94%
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Scale
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Trade-Off Reasoning
            </p>

            <p className="text-3xl font-black text-purple-600">
              89%
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <Trophy
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Overall
            </p>

            <p className="text-3xl font-black text-orange-600">
              91%
            </p>

          </div>

        </div>

      </div>

      {/* Recalculate */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Recalculate Discovery Score
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Update the evaluation after adding another approach or improving
              your trade-off explanation.
            </p>

            <button
              type="button"
              onClick={() => setAnalyzed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Update Score
              <ArrowRight size={18} />
            </button>

            {analyzed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Multi-solution analysis updated successfully.
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
                Multi-Solution Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI turns one correct solution into deeper problem
                solving practice.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowWorkflow(!showWorkflow)}
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
              The first correct solution is not always the best solution.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong candidates can generate alternatives, compare their
              trade-offs, and explain why one approach is preferable under
              specific constraints.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}