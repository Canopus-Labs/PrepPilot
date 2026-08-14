import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Lightbulb,
  ArrowRight,
  Clock,
  Zap,
} from "lucide-react";

const scenarios = [
  {
    id: 1,
    title: "URL Shortener",
    original:
      "Design a URL shortening service that can generate and redirect short URLs.",
    originalRequirement: "Support 100,000 requests per day.",
    changedRequirement:
      "The system must now support 10 million requests per day.",
    impact:
      "The architecture must handle significantly higher traffic and avoid single points of failure.",
  },
  {
    id: 2,
    title: "Task Management API",
    original:
      "Design an API that allows users to create, update, and retrieve tasks.",
    originalRequirement: "The API serves a small team of users.",
    changedRequirement:
      "The API must now support millions of users across multiple regions.",
    impact:
      "The design must consider horizontal scaling, regional distribution, and data consistency.",
  },
  {
    id: 3,
    title: "File Upload Service",
    original:
      "Design a service that allows users to upload and download files.",
    originalRequirement: "Files are generally smaller than 50 MB.",
    changedRequirement:
      "Users can now upload files up to 10 GB.",
    impact:
      "The solution needs streaming, chunked uploads, storage optimization, and failure recovery.",
  },
];

const evaluationAreas = [
  "Requirement identified",
  "Impact explained",
  "Solution adapted",
  "Trade-offs discussed",
  "Technical reasoning",
];

export default function AIInterviewQuestionRequirementChangeSimulator() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [solution, setSolution] = useState("");
  const [adaptation, setAdaptation] = useState("");
  const [phase, setPhase] = useState("original");
  const [evaluated, setEvaluated] = useState(false);

  const scenario = scenarios[scenarioIndex];

  const startRequirementChange = () => {
    if (!solution.trim()) return;
    setPhase("changed");
    setEvaluated(false);
  };

  const evaluateAdaptation = () => {
    if (!adaptation.trim()) return;
    setEvaluated(true);
    setPhase("evaluated");
  };

  const nextScenario = () => {
    setScenarioIndex((current) => (current + 1) % scenarios.length);
    setSolution("");
    setAdaptation("");
    setPhase("original");
    setEvaluated(false);
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
            AI Interview Question Requirement Change Simulator
          </h1>

          <p className="text-gray-500">
            Practice adapting your technical solution when an interviewer
            changes a requirement midway through the discussion.
          </p>

        </div>

      </div>

      {/* Scenario Selector */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Scenario
            </h2>

            <p className="text-sm text-gray-500">
              Select a realistic technical interview scenario.
            </p>

          </div>

        </div>

        <select
          value={scenarioIndex}
          onChange={(e) => {
            setScenarioIndex(Number(e.target.value));
            setSolution("");
            setAdaptation("");
            setPhase("original");
            setEvaluated(false);
          }}
          className="w-full mt-5 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {scenarios.map((item, index) => (
            <option key={item.id} value={index}>
              {item.title}
            </option>
          ))}
        </select>

      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex items-center justify-between">

          {[
            ["1", "Original Problem"],
            ["2", "Propose Solution"],
            ["3", "Requirement Changes"],
            ["4", "Adapt Solution"],
            ["5", "AI Evaluation"],
          ].map(([number, label], index) => {

            const active =
              index === 0 ||
              (index === 1 && phase !== "original") ||
              (index === 2 && phase !== "original") ||
              (index === 3 && phase === "changed") ||
              (index === 4 && evaluated);

            return (
              <div
                key={number}
                className="flex items-center gap-2"
              >

                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    active
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {number}
                </div>

                <span className="hidden md:block text-xs font-semibold">
                  {label}
                </span>

                {index < 4 && (
                  <ArrowRight
                    size={15}
                    className="hidden md:block text-gray-400"
                  />
                )}

              </div>
            );
          })}

        </div>

      </div>

      {/* Original Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex justify-between items-start gap-4">

          <div>

            <p className="text-sm text-gray-500">
              Original Interview Problem
            </p>

            <h2 className="text-2xl font-black mt-2">
              {scenario.title}
            </h2>

            <p className="text-gray-600 mt-3">
              {scenario.original}
            </p>

          </div>

          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
            ORIGINAL
          </span>

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              Initial Requirement
            </p>

            <p className="font-semibold mt-2">
              {scenario.originalRequirement}
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              Interviewer Expectation
            </p>

            <p className="font-semibold mt-2">
              Explain your architecture and justify your choices.
            </p>

          </div>

        </div>

      </div>

      {/* Step 1 */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
            1
          </div>

          <div>

            <h2 className="font-bold text-lg">
              Propose Your Initial Solution
            </h2>

            <p className="text-sm text-gray-500">
              Explain your approach before the interviewer changes anything.
            </p>

          </div>

        </div>

        <textarea
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          disabled={phase !== "original"}
          rows={8}
          placeholder="Describe your architecture, components, data flow, assumptions, and trade-offs..."
          className="w-full border rounded-xl p-4 mt-5 outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-100"
        />

        <button
          type="button"
          disabled={!solution.trim() || phase !== "original"}
          onClick={startRequirementChange}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Submit Solution
        </button>

      </div>

      {/* Requirement Change */}
      {phase !== "original" && (
        <div className="bg-red-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <div className="p-3 rounded-xl bg-white h-fit">
              <AlertTriangle
                className="text-red-600"
                size={30}
              />
            </div>

            <div className="flex-1">

              <div className="flex flex-wrap gap-3">

                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                  INTERVIEWER FOLLOW-UP
                </span>

                <span className="px-3 py-1 rounded-full bg-white text-gray-600 text-xs font-semibold">
                  Requirement Changed
                </span>

              </div>

              <h2 className="text-2xl font-black mt-4">
                The Requirement Has Changed
              </h2>

              <p className="text-gray-600 mt-2">
                You have already proposed your solution. The interviewer now
                introduces a new requirement.
              </p>

              <div className="bg-white rounded-xl p-5 mt-5">

                <p className="text-xs font-semibold text-red-600">
                  NEW REQUIREMENT
                </p>

                <p className="text-lg font-bold mt-2">
                  {scenario.changedRequirement}
                </p>

              </div>

              <div className="mt-5">

                <p className="text-sm font-semibold">
                  Why this matters
                </p>

                <p className="text-sm text-gray-600 mt-1">
                  {scenario.impact}
                </p>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Step 2 */}
      {phase !== "original" && (
        <div className="bg-white rounded-2xl shadow p-6">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
              2
            </div>

            <div>

              <h2 className="font-bold text-lg">
                Adapt Your Solution
              </h2>

              <p className="text-sm text-gray-500">
                Explain what you would change and why.
              </p>

            </div>

          </div>

          <div className="bg-gray-50 rounded-xl p-5 mt-5">

            <p className="text-xs text-gray-500">
              Your Original Solution
            </p>

            <p className="text-sm text-gray-700 mt-2 whitespace-pre-line">
              {solution}
            </p>

          </div>

          <textarea
            value={adaptation}
            onChange={(e) => setAdaptation(e.target.value)}
            disabled={evaluated}
            rows={9}
            placeholder="Explain how you would modify your solution to satisfy the new requirement. Discuss architecture changes, complexity, scalability, and trade-offs..."
            className="w-full border rounded-xl p-4 mt-5 outline-none focus:ring-2 focus:ring-orange-500 disabled:bg-gray-100"
          />

          {!evaluated && (
            <button
              type="button"
              disabled={!adaptation.trim()}
              onClick={evaluateAdaptation}
              className="mt-4 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold disabled:opacity-50"
            >
              Submit Adapted Solution
            </button>
          )}

        </div>
      )}

      {/* Evaluation */}
      {evaluated && (
        <>
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 bg-white rounded-2xl">

                <Zap
                  className="text-indigo-600"
                  size={40}
                />

              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Requirement Adaptation Score
                </p>

                <div className="flex items-end gap-3">

                  <p className="text-6xl font-black text-indigo-600">
                    84%
                  </p>

                  <span className="mb-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                    Strong Adaptation
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  You successfully adapted the original approach to address
                  the changed requirement.
                </p>

                <div className="h-3 bg-white rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: "84%" }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Evaluation Areas */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <CheckCircle2 className="text-green-600" />

              <div>

                <h2 className="font-bold text-lg">
                  AI Adaptation Evaluation
                </h2>

                <p className="text-sm text-gray-500">
                  How well your reasoning handled the requirement change.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {evaluationAreas.map((item, index) => (

                <div
                  key={item}
                  className="border rounded-xl p-4 flex items-center gap-4"
                >

                  <CheckCircle2
                    className={
                      index === 4
                        ? "text-orange-500"
                        : "text-green-600"
                    }
                  />

                  <div className="flex-1">

                    <p className="font-semibold">
                      {item}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {index === 0 &&
                        "You recognized the new requirement."}

                      {index === 1 &&
                        "You explained how the requirement affects the system."}

                      {index === 2 &&
                        "Your proposed changes address the new constraint."}

                      {index === 3 &&
                        "Additional discussion of trade-offs would strengthen the answer."}

                      {index === 4 &&
                        "Your reasoning is generally strong but could be more detailed."}
                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      index >= 3
                        ? "bg-orange-100 text-orange-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {index >= 3 ? "Improve" : "Passed"}
                  </span>

                </div>

              ))}

            </div>

          </div>

          {/* Before / After */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Solution Evolution
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

              <div className="border rounded-2xl p-5">

                <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                  ORIGINAL
                </span>

                <p className="text-sm text-gray-600 mt-4">
                  Your initial design was optimized for the original traffic
                  and capacity requirements.
                </p>

              </div>

              <div className="border rounded-2xl p-5">

                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                  ADAPTED
                </span>

                <p className="text-sm text-gray-600 mt-4">
                  Your revised design introduces additional scalability and
                  reliability considerations to handle the changed requirement.
                </p>

              </div>

            </div>

          </div>

          {/* Interviewer Follow-Up */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-orange-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  Simulated Interviewer Follow-Up
                </h2>

                <p className="text-gray-700 mt-3 font-semibold">
                  "What if the traffic increases by another 100x? Would your
                  updated architecture still work?"
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Explain where your current solution reaches its limits and
                  which component you would redesign first.
                </p>

              </div>

            </div>

          </div>

          {/* AI Coaching */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Coaching Insight
                </h2>

                <p className="text-gray-600 mt-2">
                  When an interviewer changes a requirement, avoid immediately
                  replacing the entire solution. First identify exactly what
                  changed, explain which part of your design is affected, and
                  then make the smallest justified architectural change.
                </p>

              </div>

            </div>

          </div>

          {/* Next */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-green-700">
                  Ready for Another Scenario?
                </h2>

                <p className="text-gray-600 mt-2">
                  Practice the same process with a different technical problem
                  and a new mid-interview requirement.
                </p>

                <button
                  type="button"
                  onClick={nextScenario}
                  className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2"
                >
                  Start Next Scenario
                  <RefreshCw size={18} />
                </button>

              </div>

            </div>

          </div>
        </>
      )}

      {/* Session Summary */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Clock className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Challenge Summary
            </h2>

            <p className="text-sm text-gray-500">
              Track your performance during requirement-change simulations.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Scenarios Completed
            </p>

            <p className="text-3xl font-black text-indigo-600 mt-2">
              6
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Average Adaptation
            </p>

            <p className="text-3xl font-black text-green-600 mt-2">
              81%
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Strongest Area
            </p>

            <p className="text-xl font-black text-indigo-600 mt-2">
              Requirement Analysis
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}