import React, { useState } from "react";
import {
  Brain,
  Bug,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  GitCompare,
  TestTube2,
  RefreshCw,
  Lightbulb,
  ArrowRight,
  Target,
} from "lucide-react";

const testCases = [
  {
    id: "TC-01",
    input: "[1, 2, 3, 4]",
    expected: "10",
    oldResult: "10",
    newResult: "10",
    status: "Passed",
    type: "Existing",
  },
  {
    id: "TC-02",
    input: "[-5, 10, -2]",
    expected: "3",
    oldResult: "3",
    newResult: "3",
    status: "Passed",
    type: "Existing",
  },
  {
    id: "TC-03",
    input: "[]",
    expected: "0",
    oldResult: "0",
    newResult: "undefined",
    status: "Failed",
    type: "Regression",
  },
  {
    id: "TC-04",
    input: "[100]",
    expected: "100",
    oldResult: "100",
    newResult: "100",
    status: "Passed",
    type: "Generated",
  },
  {
    id: "TC-05",
    input: "[0, 0, 0]",
    expected: "0",
    oldResult: "0",
    newResult: "0",
    status: "Passed",
    type: "Generated",
  },
];

const regressionFlow = [
  {
    title: "Preserve Tests",
    description: "Keep previously successful scenarios.",
  },
  {
    title: "Generate Cases",
    description: "Create additional regression scenarios.",
  },
  {
    title: "Run Both Versions",
    description: "Compare old and modified behavior.",
  },
  {
    title: "Detect Regression",
    description: "Find newly failing cases.",
  },
  {
    title: "Explain Cause",
    description: "Identify likely reasons for the regression.",
  },
];

const recommendations = [
  {
    title: "Handle Empty Input",
    reason:
      "The modified implementation returns undefined for an empty array.",
    action:
      "Restore an explicit empty-input condition before accessing array values.",
  },
  {
    title: "Retain Existing Tests",
    reason:
      "Previously passing cases should remain part of every modification cycle.",
    action:
      "Run the preserved regression suite after every optimization or refactor.",
  },
  {
    title: "Add Boundary Cases",
    reason:
      "Small inputs and boundary conditions can expose regressions introduced by optimization.",
    action:
      "Include empty, single-element, zero, negative, and maximum-size cases.",
  },
];

export default function AIInterviewQuestionSolutionRegressionTester() {
  const [selectedTest, setSelectedTest] = useState(testCases[2]);
  const [oldSolution, setOldSolution] = useState("");
  const [newSolution, setNewSolution] = useState("");
  const [tested, setTested] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showFlow, setShowFlow] = useState(false);

  const passed = testCases.filter(
    (test) => test.status === "Passed"
  ).length;

  const failed = testCases.filter(
    (test) => test.status === "Failed"
  ).length;

  const existing = testCases.filter(
    (test) => test.type === "Existing"
  ).length;

  const regressionRate = Math.round(
    ((testCases.length - failed) / testCases.length) * 100
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Solution Regression Tester
          </h1>

          <p className="text-gray-500">
            Check whether a modified or optimized solution accidentally breaks
            functionality that previously worked.
          </p>

        </div>

      </div>

      {/* Regression Alert */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-5 items-center">

          <div className="w-20 h-20 rounded-full bg-white border-8 border-red-500 flex items-center justify-center">

            <Bug
              className="text-red-600"
              size={34}
            />

          </div>

          <div>

            <p className="text-xs font-bold text-red-600">
              REGRESSION DETECTED
            </p>

            <h2 className="text-2xl font-black text-red-800 mt-1">
              A previously supported scenario is now failing.
            </h2>

            <p className="text-gray-600 mt-2">
              The modified solution handles normal inputs correctly but fails
              when the input array is empty.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <TestTube2
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Total Tests
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {testCases.length}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Passed
            </p>

            <p className="text-3xl font-black text-green-600">
              {passed}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <XCircle
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              New Failures
            </p>

            <p className="text-3xl font-black text-red-600">
              {failed}
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <GitCompare
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Regression Safety
            </p>

            <p className="text-3xl font-black text-purple-600">
              {regressionRate}%
            </p>

          </div>

        </div>

      </div>

      {/* Preserved Tests */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <RefreshCw className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Regression Test Suite
            </h2>

            <p className="text-sm text-gray-500">
              Existing tests are preserved while new cases are added to
              validate the modified solution.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {testCases.map((test) => (

            <button
              type="button"
              key={test.id}
              onClick={() => setSelectedTest(test)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedTest.id === test.id
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                {test.status === "Passed" ? (
                  <CheckCircle2
                    className="text-green-600"
                    size={25}
                  />
                ) : (
                  <XCircle
                    className="text-red-600"
                    size={25}
                  />
                )}

                <div className="flex-1">

                  <div className="flex justify-between gap-4">

                    <div>

                      <h3 className="font-bold">
                        {test.id}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Input: {test.input}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                        test.type === "Existing"
                          ? "bg-blue-100 text-blue-700"
                          : test.type === "Regression"
                          ? "bg-red-100 text-red-700"
                          : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {test.type}
                    </span>

                  </div>

                  <div className="grid md:grid-cols-3 gap-3 mt-4">

                    <div className="bg-white rounded-lg p-3">

                      <p className="text-xs text-gray-500">
                        Expected
                      </p>

                      <p className="font-bold">
                        {test.expected}
                      </p>

                    </div>

                    <div className="bg-white rounded-lg p-3">

                      <p className="text-xs text-gray-500">
                        Old
                      </p>

                      <p className="font-bold">
                        {test.oldResult}
                      </p>

                    </div>

                    <div className="bg-white rounded-lg p-3">

                      <p className="text-xs text-gray-500">
                        Modified
                      </p>

                      <p
                        className={`font-bold ${
                          test.status === "Failed"
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {test.newResult}
                      </p>

                    </div>

                  </div>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    test.status === "Passed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {test.status}
                </span>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Test */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          {selectedTest.status === "Passed" ? (
            <CheckCircle2
              className="text-green-600"
              size={30}
            />
          ) : (
            <AlertTriangle
              className="text-red-600"
              size={30}
            />
          )}

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              TEST CASE COMPARISON
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedTest.id}
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-gray-500">
                  EXPECTED
                </p>

                <p className="text-xl font-black mt-2">
                  {selectedTest.expected}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-gray-500">
                  ORIGINAL
                </p>

                <p className="text-xl font-black text-green-600 mt-2">
                  {selectedTest.oldResult}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-gray-500">
                  MODIFIED
                </p>

                <p
                  className={`text-xl font-black mt-2 ${
                    selectedTest.status === "Failed"
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {selectedTest.newResult}
                </p>

              </div>

            </div>

            {selectedTest.status === "Failed" && (
              <div className="bg-white rounded-xl p-5 mt-4">

                <p className="text-xs font-bold text-red-600">
                  LIKELY REGRESSION CAUSE
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  The modified implementation appears to access the first
                  element before checking whether the array contains any
                  elements. The optimization changed behavior for the empty
                  input case.
                </p>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Regression Warning */}
      {selectedTest.status === "Failed" && (
        <div className="bg-red-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <AlertTriangle
              className="text-red-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-red-600">
                NEWLY FAILING SCENARIO
              </p>

              <h2 className="text-xl font-bold text-red-800 mt-1">
                The modification introduced a regression.
              </h2>

              <p className="text-gray-600 mt-2">
                The original solution passed this test, while the modified
                solution now fails. The candidate should fix the modification
                while preserving all previously passing behavior.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Regression Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Suggestions for fixing the regression without replacing the
                entire solution.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowRecommendations(!showRecommendations)
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

            {recommendations.map((recommendation, index) => (

              <div
                key={recommendation.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {recommendation.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {recommendation.reason}
                    </p>

                    <p className="text-sm font-semibold text-indigo-700 mt-2">
                      Action: {recommendation.action}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Compare Solutions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <GitCompare className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Compare Original and Modified Solutions
            </h2>

            <p className="text-sm text-gray-500">
              Provide both implementations so the AI can identify behavior
              changes.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <div>

            <p className="text-sm font-bold mb-2">
              Original Solution
            </p>

            <textarea
              value={oldSolution}
              onChange={(e) => setOldSolution(e.target.value)}
              placeholder="Paste the previously working solution..."
              className="w-full min-h-[180px] border rounded-xl p-4 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>

          <div>

            <p className="text-sm font-bold mb-2">
              Modified Solution
            </p>

            <textarea
              value={newSolution}
              onChange={(e) => setNewSolution(e.target.value)}
              placeholder="Paste the modified or optimized solution..."
              className="w-full min-h-[180px] border rounded-xl p-4 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />

          </div>

        </div>

        <button
          type="button"
          onClick={() => setTested(true)}
          className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Run Regression Analysis
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Regression Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Regression Testing Flow
              </h2>

              <p className="text-sm text-gray-500">
                Verify that changes preserve previously working behavior.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFlow(!showFlow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFlow ? "Hide Flow" : "Show Flow"}
          </button>

        </div>

        {showFlow && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            {regressionFlow.map((step, index) => (

              <React.Fragment key={step.title}>

                <div className="border rounded-xl p-4 min-w-[160px]">

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

                {index < regressionFlow.length - 1 && (
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

      {/* Analysis Complete */}
      {tested && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                REGRESSION ANALYSIS COMPLETE
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Original and modified solutions are ready for comparison.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can execute preserved tests,
                generate additional regression cases, compare outputs, and
                return newly failing scenarios with explanations.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Final Guidance */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI ENGINEERING PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Every modification should preserve existing behavior.
            </h2>

            <p className="text-gray-600 mt-2">
              Optimization and refactoring are safer when previously passing
              scenarios remain part of the test suite. Regression testing helps
              candidates develop the habit of validating changes instead of
              testing only the new functionality.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}