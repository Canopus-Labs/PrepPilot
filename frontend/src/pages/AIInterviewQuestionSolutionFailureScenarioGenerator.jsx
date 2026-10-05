import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  Server,
  Database,
  ShieldAlert,
  Zap,
  CheckCircle2,
  Target,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";

const scenarios = [
  {
    title: "Invalid Input",
    icon: ShieldAlert,
    severity: "Medium",
    description:
      "The system receives malformed or unexpected input from a client.",
    question:
      "How would you validate the input and prevent invalid data from affecting the system?",
    expectedAreas: ["Validation", "Error handling", "User feedback"],
  },
  {
    title: "Sudden Traffic Spike",
    icon: Zap,
    severity: "High",
    description:
      "Traffic suddenly increases to 10x the normal request volume.",
    question:
      "How would your solution behave under this load and what would you change to keep it reliable?",
    expectedAreas: ["Scalability", "Caching", "Load balancing"],
  },
  {
    title: "Dependency Failure",
    icon: Server,
    severity: "Critical",
    description:
      "An external API or service used by your solution becomes unavailable.",
    question:
      "What happens to your system and how would you prevent the dependency failure from causing a complete outage?",
    expectedAreas: ["Fallback", "Timeouts", "Retries"],
  },
  {
    title: "Unexpected Data",
    icon: Database,
    severity: "High",
    description:
      "The system receives data that does not match the expected format or assumptions.",
    question:
      "How would you detect, isolate, and safely process unexpected data?",
    expectedAreas: ["Validation", "Data isolation", "Monitoring"],
  },
];

const evaluation = [
  {
    name: "Failure Identification",
    score: 84,
  },
  {
    name: "Mitigation Strategy",
    score: 76,
  },
  {
    name: "Reliability Reasoning",
    score: 71,
  },
  {
    name: "Scalability Thinking",
    score: 68,
  },
];

export default function AIInterviewQuestionSolutionFailureScenarioGenerator() {
  const [solution, setSolution] = useState("");
  const [generated, setGenerated] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [responses, setResponses] = useState({});

  const generateScenarios = () => {
    if (!solution.trim()) return;
    setGenerated(true);
  };

  const updateResponse = (index, value) => {
    setResponses((previous) => ({
      ...previous,
      [index]: value,
    }));
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
            AI Solution Failure Scenario Generator
          </h1>

          <p className="text-gray-500">
            Discover how your technical solution behaves when real-world
            failures occur.
          </p>

        </div>

      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Problem
            </h2>

            <p className="text-sm text-gray-500">
              Design a service that receives user requests, processes the
              information, and stores the resulting data.
            </p>

          </div>

        </div>

      </div>

      {/* Solution Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Server className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Your Proposed Solution
            </h2>

            <p className="text-sm text-gray-500">
              Describe your architecture or approach before testing failure
              scenarios.
            </p>

          </div>

        </div>

        <textarea
          rows={9}
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          placeholder={`Example:

I would use an API server behind a load balancer.
Requests would be validated and processed by the service.
The result would then be stored in a database.
I would use caching for frequently requested data.`}
          className="w-full border rounded-xl p-4 mt-5 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!solution.trim()}
          onClick={generateScenarios}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Generate Failure Scenarios
        </button>

      </div>

      {generated && (
        <>
          {/* AI Summary */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 bg-white rounded-2xl">

                <AlertTriangle
                  className="text-indigo-600"
                  size={42}
                />

              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  AI Failure Analysis
                </p>

                <h2 className="text-3xl font-black text-indigo-700 mt-1">
                  4 Failure Scenarios Generated
                </h2>

                <p className="text-gray-600 mt-2">
                  The scenarios are based on the dependencies, architecture,
                  assumptions, and processing flow identified in your proposed
                  solution.
                </p>

              </div>

            </div>

          </div>

          {/* Scenario Cards */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <AlertTriangle className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Generated Failure Scenarios
                </h2>

                <p className="text-sm text-gray-500">
                  Select a scenario to inspect the challenge and expected
                  reasoning areas.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

              {scenarios.map((scenario, index) => {

                const Icon = scenario.icon;
                const selected = selectedScenario === index;

                return (
                  <button
                    type="button"
                    key={scenario.title}
                    onClick={() =>
                      setSelectedScenario(
                        selected ? null : index
                      )
                    }
                    className="text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                  >

                    <div className="flex gap-4">

                      <div className="p-3 bg-orange-50 rounded-xl">

                        <Icon
                          className="text-orange-600"
                          size={23}
                        />

                      </div>

                      <div className="flex-1">

                        <div className="flex justify-between gap-3">

                          <h3 className="font-bold">
                            {scenario.title}
                          </h3>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              scenario.severity === "Critical"
                                ? "bg-red-100 text-red-700"
                                : scenario.severity === "High"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                          >
                            {scenario.severity}
                          </span>

                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                          {scenario.description}
                        </p>

                        {selected && (
                          <div className="mt-5 space-y-4">

                            <div className="bg-indigo-50 rounded-xl p-4">

                              <p className="text-xs font-bold text-indigo-700">
                                Interviewer Challenge
                              </p>

                              <p className="text-sm text-gray-600 mt-2">
                                {scenario.question}
                              </p>

                            </div>

                            <div>

                              <p className="text-xs font-bold text-gray-500">
                                Expected Reasoning Areas
                              </p>

                              <div className="flex flex-wrap gap-2 mt-2">

                                {scenario.expectedAreas.map((area) => (

                                  <span
                                    key={area}
                                    className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-xs"
                                  >
                                    {area}
                                  </span>

                                ))}

                              </div>

                            </div>

                          </div>
                        )}

                      </div>

                    </div>

                  </button>
                );
              })}

            </div>

          </div>

          {/* Candidate Challenge */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Brain className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Failure Handling Challenge
                </h2>

                <p className="text-sm text-gray-500">
                  Explain how you would handle each failure scenario as if you
                  were answering an interviewer.
                </p>

              </div>

            </div>

            <div className="space-y-6 mt-6">

              {scenarios.map((scenario, index) => (

                <div
                  key={scenario.title}
                  className="border rounded-2xl p-5"
                >

                  <div className="flex justify-between gap-3">

                    <h3 className="font-bold">
                      {index + 1}. {scenario.title}
                    </h3>

                    <span className="text-xs text-gray-500">
                      Scenario {index + 1}/4
                    </span>

                  </div>

                  <p className="text-sm text-gray-600 mt-3">
                    {scenario.question}
                  </p>

                  <textarea
                    rows={5}
                    value={responses[index] || ""}
                    onChange={(e) =>
                      updateResponse(index, e.target.value)
                    }
                    placeholder="Explain your failure-handling strategy..."
                    className="w-full border rounded-xl p-4 mt-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
                  />

                  {responses[index] && (
                    <div className="mt-3 flex items-center gap-2 text-green-600 text-sm font-semibold">

                      <CheckCircle2 size={17} />

                      Response recorded

                    </div>
                  )}

                </div>
              ))}

            </div>

          </div>

          {/* Evaluation */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Failure-Handling Readiness
                </h2>

                <p className="text-sm text-gray-500">
                  AI evaluates how well your responses address realistic
                  production failures.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

              {evaluation.map((item) => (

                <div
                  key={item.name}
                  className="border rounded-xl p-5"
                >

                  <div className="flex justify-between">

                    <h3 className="font-bold">
                      {item.name}
                    </h3>

                    <span className="font-black text-indigo-600">
                      {item.score}%
                    </span>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full mt-3">

                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{
                        width: `${item.score}%`,
                      }}
                    />

                  </div>

                </div>
              ))}

            </div>

            <div className="mt-6 bg-orange-50 rounded-xl p-5">

              <div className="flex gap-3">

                <AlertTriangle
                  className="text-orange-600"
                  size={22}
                />

                <div>

                  <p className="font-bold text-orange-700">
                    Main Improvement Area
                  </p>

                  <p className="text-sm text-gray-600 mt-2">
                    Your solution handles normal operation well, but your
                    failure strategy should include stronger dependency
                    isolation, timeout handling, and fallback behavior.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Failure Categories */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Server className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Failure Coverage
                </h2>

                <p className="text-sm text-gray-500">
                  Categories commonly explored in production-oriented
                  interviews.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              <div className="border rounded-xl p-5">

                <ShieldAlert className="text-orange-600" />

                <h3 className="font-bold mt-3">
                  Input Failures
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Invalid, malformed, missing, or unexpected input.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Zap className="text-red-600" />

                <h3 className="font-bold mt-3">
                  Load Failures
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Traffic spikes, resource exhaustion, and capacity limits.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Server className="text-purple-600" />

                <h3 className="font-bold mt-3">
                  Dependency Failures
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  APIs, databases, queues, or services becoming unavailable.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Database className="text-indigo-600" />

                <h3 className="font-bold mt-3">
                  Data Failures
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Corrupted, inconsistent, duplicated, or unexpected data.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <AlertTriangle className="text-yellow-600" />

                <h3 className="font-bold mt-3">
                  Partial Failures
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  One component fails while the rest of the system continues.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Target className="text-green-600" />

                <h3 className="font-bold mt-3">
                  Recovery
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Retries, fallback, recovery, monitoring, and graceful
                  degradation.
                </p>

              </div>

            </div>

          </div>

          {/* AI Explanation */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Failure-Handling Insight
                </h2>

                <div className="space-y-3 mt-4">

                  <p className="text-gray-600">
                    <strong>1.</strong> A strong solution should not assume that
                    every dependency is always available.
                  </p>

                  <p className="text-gray-600">
                    <strong>2.</strong> High traffic should trigger
                    considerations such as caching, load balancing, and
                    horizontal scaling.
                  </p>

                  <p className="text-gray-600">
                    <strong>3.</strong> Invalid or unexpected data should be
                    rejected or isolated before it reaches critical processing
                    stages.
                  </p>

                  <p className="text-gray-600">
                    <strong>4.</strong> Partial failures should be handled
                    without unnecessarily bringing down unrelated components.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Recommended Improvements */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Lightbulb className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Recommended Improvements
                </h2>

                <p className="text-sm text-gray-500">
                  Strengthen your proposed solution against realistic failures.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              <div className="border rounded-xl p-5">

                <Server className="text-indigo-600" />

                <h3 className="font-bold mt-3">
                  Add Timeouts
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Prevent unavailable dependencies from blocking requests
                  indefinitely.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <ShieldAlert className="text-orange-600" />

                <h3 className="font-bold mt-3">
                  Add Validation
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Validate inputs and isolate unexpected data before processing.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Zap className="text-green-600" />

                <h3 className="font-bold mt-3">
                  Plan for Scale
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Consider caching, load balancing, and horizontal scaling for
                  traffic spikes.
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
                  AI Interview Verdict
                </h2>

                <p className="text-gray-600 mt-2">
                  Your solution handles the normal workflow effectively, but
                  you should improve your reasoning around dependency failures,
                  traffic spikes, and partial failures. Practice explaining
                  what happens when individual components stop working instead
                  of focusing only on the happy path.
                </p>

              </div>

            </div>

          </div>

          {/* Next Challenge */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Target
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  Recommended Next Challenge
                </h2>

                <p className="text-gray-600 mt-2">
                  Try a scenario where the database becomes unavailable while
                  traffic continues normally. Explain how your system should
                  behave, what users should see, and how recovery should occur.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  Start Failure Challenge
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