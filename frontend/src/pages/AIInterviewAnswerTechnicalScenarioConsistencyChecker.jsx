import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Target,
  RefreshCw,
  Lightbulb,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

const scenarios = [
  {
    title: "Original Scenario",
    condition: "10,000 requests per minute",
    status: "Valid",
    score: 92,
  },
  {
    title: "Increased Traffic",
    condition: "100,000 requests per minute",
    status: "Needs Adaptation",
    score: 68,
  },
  {
    title: "Higher Latency Requirement",
    condition: "p95 latency below 50ms",
    status: "Needs Adaptation",
    score: 61,
  },
  {
    title: "Dependency Failure",
    condition: "Primary database becomes temporarily unavailable",
    status: "At Risk",
    score: 54,
  },
  {
    title: "Limited Resources",
    condition: "Infrastructure budget reduced by 50%",
    status: "Needs Adaptation",
    score: 64,
  },
];

const assumptions = [
  {
    assumption: "Traffic remains relatively stable",
    impact: "High",
    broken: true,
  },
  {
    assumption: "Database remains available",
    impact: "High",
    broken: true,
  },
  {
    assumption: "Sufficient infrastructure budget",
    impact: "Medium",
    broken: true,
  },
  {
    assumption: "Latency requirement remains moderate",
    impact: "Medium",
    broken: true,
  },
];

export default function AIInterviewAnswerTechnicalScenarioConsistencyChecker() {
  const [solution, setSolution] = useState("");
  const [checked, setChecked] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [adaptation, setAdaptation] = useState("");

  const flexibilityScore = 72;

  const runCheck = () => {
    if (!solution.trim()) return;
    setChecked(true);
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
            AI Technical Scenario Consistency Checker
          </h1>

          <p className="text-gray-500">
            Test whether your technical solution remains valid when interview
            conditions change.
          </p>
        </div>

      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Scenario
            </h2>

            <p className="text-sm text-gray-500">
              Design a scalable API service that handles user requests with
              low latency and reliable data access.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500">
              Initial Traffic
            </p>
            <p className="font-bold mt-1">
              10,000 req/min
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500">
              Initial Latency
            </p>
            <p className="font-bold mt-1">
              p95 &lt; 200ms
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-500">
              Availability
            </p>
            <p className="font-bold mt-1">
              99.9%
            </p>
          </div>

        </div>

      </div>

      {/* Solution Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Your Proposed Solution
            </h2>

            <p className="text-sm text-gray-500">
              Describe your architecture, algorithm, assumptions, and major
              technical decisions.
            </p>
          </div>

        </div>

        <textarea
          rows={8}
          value={solution}
          onChange={(e) => setSolution(e.target.value)}
          placeholder="Example: I would use a load balancer, multiple API servers, Redis caching, and a primary database..."
          className="w-full border rounded-xl p-4 mt-5 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!solution.trim()}
          onClick={runCheck}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Test Solution Flexibility
        </button>

      </div>

      {checked && (
        <>
          {/* Flexibility Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 bg-white rounded-2xl">
                <TrendingUp
                  className="text-indigo-600"
                  size={42}
                />
              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Solution Flexibility Score
                </p>

                <div className="flex items-end gap-3">

                  <p className="text-6xl font-black text-indigo-600">
                    {flexibilityScore}%
                  </p>

                  <span className="mb-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold">
                    Needs Adaptation
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  Your solution works for the original scenario but depends on
                  several assumptions that become invalid when requirements
                  change.
                </p>

                <div className="h-4 bg-white rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{
                      width: `${flexibilityScore}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Scenario Tests */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <RefreshCw className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Scenario Consistency Tests
                </h2>

                <p className="text-sm text-gray-500">
                  AI changes one condition at a time and evaluates whether your
                  approach remains valid.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {scenarios.map((scenario, index) => {

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
                    className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className={`p-3 rounded-xl ${
                          scenario.status === "Valid"
                            ? "bg-green-100"
                            : scenario.status === "At Risk"
                            ? "bg-red-100"
                            : "bg-orange-100"
                        }`}
                      >
                        {scenario.status === "Valid" ? (
                          <CheckCircle2
                            className="text-green-600"
                            size={22}
                          />
                        ) : (
                          <AlertTriangle
                            className={
                              scenario.status === "At Risk"
                                ? "text-red-600"
                                : "text-orange-600"
                            }
                            size={22}
                          />
                        )}
                      </div>

                      <div className="flex-1">

                        <div className="flex flex-wrap justify-between gap-3">

                          <h3 className="font-bold">
                            {scenario.title}
                          </h3>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              scenario.status === "Valid"
                                ? "bg-green-100 text-green-700"
                                : scenario.status === "At Risk"
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {scenario.status}
                          </span>

                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                          Changed condition: {scenario.condition}
                        </p>

                        <div className="flex items-center gap-3 mt-4">

                          <div className="flex-1 h-3 bg-gray-200 rounded-full">

                            <div
                              className={`h-full rounded-full ${
                                scenario.score >= 80
                                  ? "bg-green-500"
                                  : scenario.score >= 60
                                  ? "bg-orange-500"
                                  : "bg-red-500"
                              }`}
                              style={{
                                width: `${scenario.score}%`,
                              }}
                            />

                          </div>

                          <strong>
                            {scenario.score}%
                          </strong>

                        </div>

                      </div>

                    </div>

                    {selected && (
                      <div className="mt-5 bg-gray-50 rounded-xl p-4">

                        <p className="text-sm text-gray-600">
                          <strong>AI observation:</strong>{" "}
                          The original solution requires modification because
                          the changed condition affects one or more of its core
                          assumptions.
                        </p>

                      </div>
                    )}

                  </button>
                );
              })}

            </div>

          </div>

          {/* Broken Assumptions */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-orange-700">
                  Assumptions That Break
                </h2>

                <p className="text-gray-600 mt-2">
                  These assumptions are safe for the original scenario but
                  become problematic under changed requirements.
                </p>

                <div className="space-y-4 mt-5">

                  {assumptions.map((item) => (

                    <div
                      key={item.assumption}
                      className="bg-white rounded-xl p-5"
                    >

                      <div className="flex justify-between gap-3">

                        <div className="flex gap-3">

                          <AlertTriangle
                            className="text-orange-600"
                            size={20}
                          />

                          <p className="font-semibold">
                            {item.assumption}
                          </p>

                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.impact === "High"
                              ? "bg-red-100 text-red-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {item.impact} Impact
                        </span>

                      </div>

                      <p className="text-sm text-gray-500 mt-2">
                        This assumption becomes invalid when the scenario
                        changes significantly.
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* Adaptation Challenge */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Interviewer Adaptation Challenge
                </h2>

                <p className="text-sm text-gray-500">
                  The interviewer has changed the requirements. Adapt your
                  original solution without starting from scratch.
                </p>

              </div>

            </div>

            <div className="bg-indigo-50 rounded-xl p-5 mt-5">

              <p className="font-bold text-indigo-700">
                New Requirement
              </p>

              <p className="text-gray-700 mt-2">
                "Traffic has suddenly increased from 10,000 to 100,000
                requests per minute. Your latency target is now p95 below
                100ms. How would you modify your solution?"
              </p>

            </div>

            <textarea
              rows={7}
              value={adaptation}
              onChange={(e) => setAdaptation(e.target.value)}
              placeholder="Explain how you would adapt your original solution..."
              className="w-full border rounded-xl p-4 mt-5 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              disabled={!adaptation.trim()}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
            >
              Evaluate Adaptation
            </button>

          </div>

          {/* AI Feedback */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Coaching Feedback
                </h2>

                <p className="text-gray-600 mt-2">
                  Your original architecture is reasonable, but it is too
                  dependent on stable traffic and database availability.
                  When requirements change, prioritize identifying which
                  assumptions are no longer valid before modifying individual
                  components.
                </p>

              </div>

            </div>

          </div>

          {/* Practice Recommendations */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Lightbulb className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Recommended Improvements
                </h2>

                <p className="text-sm text-gray-500">
                  Practice these areas to improve solution flexibility.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              <div className="border rounded-xl p-5">
                <h3 className="font-bold">
                  Identify Assumptions
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  State which conditions your solution depends on before
                  implementation.
                </p>
              </div>

              <div className="border rounded-xl p-5">
                <h3 className="font-bold">
                  Design for Change
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Separate decisions that are likely to change from stable
                  parts of the architecture.
                </p>
              </div>

              <div className="border rounded-xl p-5">
                <h3 className="font-bold">
                  Practice Follow-ups
                </h3>
                <p className="text-sm text-gray-500 mt-2">
                  Regularly solve problems where the interviewer changes a
                  requirement midway.
                </p>
              </div>

            </div>

          </div>

          {/* Next Action */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  Recommended Next Practice
                </h2>

                <p className="text-gray-600 mt-2">
                  Complete another scenario-change challenge focusing on
                  changing scale, failure conditions, and performance
                  requirements.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  Start Scenario Challenge
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