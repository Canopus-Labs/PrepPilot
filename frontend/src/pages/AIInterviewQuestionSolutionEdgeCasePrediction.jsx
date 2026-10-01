import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  Bug,
  ShieldCheck,
  Lightbulb,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const edgeCases = [
  {
    title: "Empty Input",
    input: "[]",
    risk: 92,
    priority: "Critical",
    reason: "The solution assumes at least one element exists.",
  },
  {
    title: "Duplicate Values",
    input: "[2, 2, 3, 3]",
    risk: 81,
    priority: "High",
    reason: "Repeated values may cause incorrect lookup or counting behavior.",
  },
  {
    title: "Maximum Constraint",
    input: "n = 100000",
    risk: 74,
    priority: "High",
    reason: "Large input can expose performance bottlenecks.",
  },
  {
    title: "Single Element",
    input: "[7]",
    risk: 63,
    priority: "Medium",
    reason: "Boundary size may break assumptions about pairs or neighbors.",
  },
];

const analysisFactors = [
  {
    name: "Boundary Coverage",
    score: 82,
  },
  {
    name: "Input Assumptions",
    score: 64,
  },
  {
    name: "Duplicate Handling",
    score: 71,
  },
  {
    name: "Constraint Handling",
    score: 76,
  },
];

const workflow = [
  "Analyze Solution",
  "Generate Edge Cases",
  "Estimate Risk",
  "Rank Cases",
  "Test & Explain",
];

export default function AIInterviewQuestionSolutionEdgeCasePrediction() {
  const [showCases, setShowCases] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [selectedCase, setSelectedCase] = useState(0);
  const [analyzed, setAnalyzed] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const selected = edgeCases[selectedCase];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Edge-Case Prediction
          </h1>

          <p className="text-gray-500">
            Predict which edge cases are most likely to expose weaknesses in
            an interview solution.
          </p>
        </div>

      </div>

      {/* Main Result */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <Bug className="text-indigo-600" size={32} />
          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              EDGE-CASE RISK ANALYSIS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              4 Potential Edge Cases Detected
            </h2>

            <p className="text-gray-600 mt-2">
              Empty input and duplicate values are currently the highest-risk
              scenarios for the proposed solution.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <Bug className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Cases Detected
            </p>

            <p className="text-3xl font-black text-indigo-600">
              4
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <AlertTriangle className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Critical
            </p>

            <p className="text-3xl font-black text-red-600">
              1
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <AlertTriangle className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              High Risk
            </p>

            <p className="text-3xl font-black text-orange-600">
              2
            </p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-5">
            <Target className="text-yellow-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Medium Risk
            </p>

            <p className="text-3xl font-black text-yellow-600">
              1
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <ShieldCheck className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Robustness
            </p>

            <p className="text-3xl font-black text-purple-600">
              72%
            </p>
          </div>

        </div>

      </div>

      {/* Candidate Solution */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Proposed Solution
            </h2>

            <p className="text-sm text-gray-500">
              The AI analyzes the solution before generating edge cases.
            </p>
          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-5">

          <p className="text-gray-700 leading-7">
            "I will iterate through the array and use a hash set to track
            previously seen values. If the current value is already present,
            I will return true. Otherwise, I will add it to the set."
          </p>

        </div>

      </div>

      {/* Edge Cases */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Bug className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Predicted Edge Cases
              </h2>

              <p className="text-sm text-gray-500">
                Cases ranked according to their estimated failure risk.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowCases(!showCases)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showCases ? "Hide Cases" : "Show Cases"}
          </button>

        </div>

        {showCases && (
          <div className="space-y-4 mt-6">

            {edgeCases.map((item, index) => (

              <button
                type="button"
                key={item.title}
                onClick={() => setSelectedCase(index)}
                className={`w-full text-left border rounded-2xl p-5 ${
                  selectedCase === index
                    ? "border-indigo-500 bg-indigo-50"
                    : ""
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <span className="font-black text-indigo-600">
                      {index + 1}
                    </span>
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <h3 className="font-bold">
                        {item.title}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.priority === "Critical"
                            ? "bg-red-100 text-red-700"
                            : item.priority === "High"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.priority}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      Input: {item.input}
                    </p>

                    <div className="flex items-center gap-3 mt-3">

                      <div className="flex-1 h-2 bg-gray-200 rounded-full">

                        <div
                          className="h-full rounded-full bg-indigo-500"
                          style={{
                            width: `${item.risk}%`,
                          }}
                        />

                      </div>

                      <span className="text-sm font-bold text-indigo-600">
                        {item.risk}% risk
                      </span>

                    </div>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Case */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Selected Case: {selected.title}
            </h2>

            <p className="text-sm text-gray-500">
              Detailed edge-case risk analysis.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-indigo-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              TEST INPUT
            </p>

            <p className="text-xl font-black text-indigo-600 mt-1">
              {selected.input}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              FAILURE RISK
            </p>

            <p className="text-3xl font-black text-red-600 mt-1">
              {selected.risk}%
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              PRIORITY
            </p>

            <p className="text-xl font-black text-orange-600 mt-1">
              {selected.priority}
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-xl p-5 mt-5">

          <p className="text-xs font-bold text-gray-500">
            WHY THIS CASE MATTERS
          </p>

          <p className="text-gray-700 mt-2">
            {selected.reason}
          </p>

        </div>

      </div>

      {/* Critical Alert */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-red-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-red-600">
              HIGHEST-RISK CASE
            </p>

            <h2 className="text-xl font-bold text-red-800 mt-1">
              Test the empty input before considering the solution complete.
            </h2>

            <p className="text-gray-600 mt-2">
              Empty input can expose assumptions about array length and may
              cause incorrect initialization or access logic.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                CANDIDATE CHALLENGE
              </p>

              <p className="font-semibold text-red-700 mt-2">
                What should your solution return for [] and why?
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Analysis Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <ShieldCheck className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Edge-Case Analysis Factors
              </h2>

              <p className="text-sm text-gray-500">
                Dimensions used to predict hidden failure scenarios.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFactors(!showFactors)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFactors ? "Hide Factors" : "Show Factors"}
          </button>

        </div>

        {showFactors && (
          <div className="grid md:grid-cols-2 gap-5 mt-6">

            {analysisFactors.map((factor) => (

              <div
                key={factor.name}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between">

                  <h3 className="font-bold">
                    {factor.name}
                  </h3>

                  <span className="font-black text-indigo-600">
                    {factor.score}%
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{
                      width: `${factor.score}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* AI Coaching */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-indigo-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI EDGE-CASE COACH
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Predict failures before running the code.
            </h2>

            <p className="text-gray-600 mt-2">
              Instead of checking edge cases randomly, inspect the assumptions
              made by your algorithm and construct inputs that deliberately
              challenge those assumptions.
            </p>

            <div className="grid md:grid-cols-4 gap-3 mt-5">

              {[
                "What can be empty?",
                "What can repeat?",
                "What can be extreme?",
                "What can break?",
              ].map((question) => (

                <div
                  key={question}
                  className="bg-white rounded-xl p-4 text-center"
                >
                  <p className="font-bold text-indigo-700">
                    {question}
                  </p>
                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

      {/* Candidate Test */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Run Edge-Case Analysis
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Generate and rank potential failure scenarios for the current
              solution.
            </p>

            <button
              type="button"
              onClick={() => setAnalyzed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Analyze Solution
              <ArrowRight size={18} />
            </button>

            {analyzed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Edge-case prediction analysis completed successfully.
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
              Refresh Edge-Case Predictions
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Recalculate risk after modifying the solution.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Update Predictions
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Edge-case predictions updated successfully.
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
                Edge-Case Prediction Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI discovers likely failure scenarios.
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
              Robust solutions anticipate how they can fail.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong candidates do more than verify normal inputs. They
              deliberately search for cases that challenge assumptions,
              constraints, boundaries, and unusual data patterns.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}