import React, { useState } from "react";
import {
  Brain,
  ListOrdered,
  TestTube2,
  Target,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  BarChart3,
  RefreshCw,
  Bug,
} from "lucide-react";

const testCases = [
  {
    name: "Empty Input",
    category: "Boundary",
    priority: "Critical",
    score: 96,
    reason:
      "Quickly exposes whether the solution handles missing or empty data safely.",
  },
  {
    name: "Maximum Constraints",
    category: "Performance",
    priority: "Critical",
    score: 94,
    reason:
      "Tests whether the solution remains within the required time and memory limits.",
  },
  {
    name: "Duplicate Values",
    category: "Edge Case",
    priority: "High",
    score: 86,
    reason:
      "Can expose incorrect assumptions about uniqueness.",
  },
  {
    name: "Typical Input",
    category: "Normal",
    priority: "High",
    score: 82,
    reason:
      "Confirms that the core algorithm works for the expected use case.",
  },
  {
    name: "Boundary Value",
    category: "Boundary",
    priority: "High",
    score: 89,
    reason:
      "Tests behavior at the smallest or largest valid boundary.",
  },
  {
    name: "Failure Scenario",
    category: "Failure",
    priority: "Medium",
    score: 72,
    reason:
      "Checks how the solution behaves when an expected operation cannot complete.",
  },
];

const testCategories = [
  {
    name: "Boundary Conditions",
    score: 91,
    description:
      "Tests minimum, maximum, and threshold values.",
  },
  {
    name: "Typical Inputs",
    score: 84,
    description:
      "Validates expected behavior on representative inputs.",
  },
  {
    name: "Empty Inputs",
    score: 88,
    description:
      "Checks handling of empty arrays, strings, collections, or optional values.",
  },
  {
    name: "Maximum Constraints",
    score: 95,
    description:
      "Evaluates performance under the largest permitted workload.",
  },
  {
    name: "Duplicate Values",
    score: 79,
    description:
      "Tests assumptions involving uniqueness or repeated data.",
  },
  {
    name: "Failure Scenarios",
    score: 73,
    description:
      "Evaluates behavior when dependencies or operations fail.",
  },
];

const prioritizationQuestions = [
  "Which test is most likely to expose an incorrect assumption?",
  "Which test should you run before spending time on less risky cases?",
  "What happens at the minimum valid input?",
  "What happens at the maximum constraint?",
  "Does your algorithm behave correctly when values are duplicated?",
  "Which failure scenario could invalidate your approach?",
  "Why did you rank this test above the others?",
];

const recommendations = [
  {
    title: "Test High-Risk Cases First",
    reason:
      "Some inputs have a much higher probability of exposing fundamental weaknesses.",
    action:
      "Start with empty, boundary, duplicate, and maximum-constraint cases.",
  },
  {
    title: "Separate Correctness From Coverage",
    reason:
      "Passing typical inputs does not prove that the solution handles unusual conditions.",
    action:
      "Use a prioritized test sequence covering different failure modes.",
  },
  {
    title: "Explain Your Test Choices",
    reason:
      "Interviewers evaluate testing reasoning, not only whether tests pass.",
    action:
      "State what weakness each test is designed to expose.",
  },
];

const workflow = [
  {
    title: "Generate",
    description: "Identify relevant test categories.",
  },
  {
    title: "Assess",
    description: "Estimate each test's bug-detection value.",
  },
  {
    title: "Prioritize",
    description: "Rank the most important tests.",
  },
  {
    title: "Explain",
    description: "Justify the selected order.",
  },
  {
    title: "Verify",
    description: "Run tests and update priorities.",
  },
];

export default function AIInterviewQuestionSolutionTestCasePrioritizer() {
  const [selectedTest, setSelectedTest] = useState(testCases[0]);
  const [showTests, setShowTests] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const prioritizationScore = 87;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Test Case Prioritizer
          </h1>

          <p className="text-gray-500">
            Learn which test cases should be checked first to expose weaknesses
            in a technical solution.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {prioritizationScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              TEST PRIORITIZATION SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Strong Testing Strategy
            </h2>

            <p className="text-gray-600 mt-2">
              The highest-risk test cases are correctly prioritized, with
              particular attention to boundaries, empty inputs, and maximum
              constraints.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <TestTube2 className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Tests Generated
            </p>

            <p className="text-3xl font-black text-indigo-600">
              6
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <Bug className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Critical Tests
            </p>

            <p className="text-3xl font-black text-red-600">
              2
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              High Priority
            </p>

            <p className="text-3xl font-black text-orange-600">
              3
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Categories Covered
            </p>

            <p className="text-3xl font-black text-green-600">
              6
            </p>
          </div>

        </div>

      </div>

      {/* Test Case Ranking */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <ListOrdered className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Recommended Test Case Ranking
              </h2>

              <p className="text-sm text-gray-500">
                Tests are ranked by their expected ability to expose weaknesses.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowTests(!showTests)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showTests ? "Hide Tests" : "Show Tests"}
          </button>

        </div>

        {showTests && (
          <div className="space-y-4 mt-6">

            {testCases.map((test, index) => (

              <button
                type="button"
                key={test.name}
                onClick={() => setSelectedTest(test)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedTest.name === test.name
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex gap-4">

                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <div>

                        <h3 className="font-bold">
                          {test.name}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          {test.category}
                        </p>

                      </div>

                      <span
                        className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                          test.priority === "Critical"
                            ? "bg-red-100 text-red-700"
                            : test.priority === "High"
                            ? "bg-indigo-100 text-indigo-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {test.priority}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {test.reason}
                    </p>

                    <div className="h-3 bg-gray-200 rounded-full mt-4">

                      <div
                        className={`h-full rounded-full ${
                          test.score >= 90
                            ? "bg-red-500"
                            : test.score >= 80
                            ? "bg-indigo-500"
                            : "bg-orange-500"
                        }`}
                        style={{
                          width: `${test.score}%`,
                        }}
                      />

                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      Bug detection value: {test.score}/100
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Test */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              SELECTED TEST CASE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedTest.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedTest.reason}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  CATEGORY
                </p>

                <p className="text-xl font-black text-indigo-600 mt-1">
                  {selectedTest.category}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  PRIORITY
                </p>

                <p className="text-xl font-black mt-1">
                  {selectedTest.priority}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  DETECTION VALUE
                </p>

                <p className="text-3xl font-black text-purple-600 mt-1">
                  {selectedTest.score}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Test Categories */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Test Category Coverage
              </h2>

              <p className="text-sm text-gray-500">
                Make sure the test strategy covers different failure modes.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowCategories(!showCategories)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showCategories ? "Hide Categories" : "Show Categories"}
          </button>

        </div>

        {showCategories && (
          <div className="grid md:grid-cols-2 gap-4 mt-6">

            {testCategories.map((category) => (

              <div
                key={category.name}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <h3 className="font-bold">
                    {category.name}
                  </h3>

                  <span className="font-black text-indigo-600">
                    {category.score}%
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-3">

                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${category.score}%`,
                    }}
                  />

                </div>

                <p className="text-sm text-gray-500 mt-3">
                  {category.description}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Prioritization Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Test Prioritization Questions
              </h2>

              <p className="text-sm text-gray-500">
                Explain why each test deserves its position in the testing
                order.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowQuestions(!showQuestions)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showQuestions ? "Hide Questions" : "Show Questions"}
          </button>

        </div>

        {showQuestions && (
          <div className="space-y-3 mt-6">

            {prioritizationQuestions.map((question, index) => (

              <div
                key={question}
                className="border rounded-xl p-4 flex gap-3"
              >

                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
                  {index + 1}
                </div>

                <p className="text-sm text-gray-700 pt-1">
                  {question}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Testing Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve testing strategy by prioritizing high-value cases.
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

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Test Prioritization Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI converts a solution into a prioritized testing
                strategy.
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

      {/* Analyze */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Test Priorities
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Result */}
      {analyzed && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                ANALYSIS COMPLETE
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Test cases prioritized successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                Start with high-value cases such as empty inputs, boundary
                conditions, maximum constraints, and duplicate values before
                spending time on lower-risk tests.
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
              AI TESTING PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Test the cases most likely to expose weaknesses first.
            </h2>

            <p className="text-gray-600 mt-2">
              Good testing is not simply about having many test cases. A strong
              candidate understands which inputs challenge the assumptions,
              boundaries, constraints, and failure points of the proposed
              solution.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}