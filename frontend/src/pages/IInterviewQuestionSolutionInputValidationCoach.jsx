import React, { useState } from "react";
import {
  Brain,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Target,
  ListChecks,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Bug,
} from "lucide-react";

const validationCases = [
  {
    name: "Empty Input",
    type: "Missing Data",
    priority: "Critical",
    score: 96,
    rule: "Reject or explicitly handle empty input.",
    risk: "May cause null errors or invalid processing.",
  },
  {
    name: "Invalid Data Type",
    type: "Type Validation",
    priority: "Critical",
    score: 94,
    rule: "Verify that each field has the expected data type.",
    risk: "Unexpected types can break calculations or operations.",
  },
  {
    name: "Out-of-Range Value",
    type: "Range Validation",
    priority: "High",
    score: 88,
    rule: "Ensure numeric values remain within allowed limits.",
    risk: "Extreme values can produce incorrect or unsafe behavior.",
  },
  {
    name: "Malformed Format",
    type: "Format Validation",
    priority: "High",
    score: 84,
    rule: "Validate structured values such as emails, dates, IDs, or URLs.",
    risk: "Malformed data may reach downstream components.",
  },
  {
    name: "Duplicate Input",
    type: "Business Rule",
    priority: "Medium",
    score: 72,
    rule: "Check whether repeated values are permitted.",
    risk: "Duplicates can violate uniqueness assumptions.",
  },
  {
    name: "Unexpected Characters",
    type: "Sanitization",
    priority: "Medium",
    score: 76,
    rule: "Handle unsupported or unsafe characters where required.",
    risk: "Unexpected characters may cause parsing or security problems.",
  },
];

const validationFactors = [
  {
    name: "Input Coverage",
    score: 91,
    description:
      "Measures how many expected input conditions are explicitly considered.",
  },
  {
    name: "Invalid-Input Handling",
    score: 86,
    description:
      "Evaluates whether malformed and invalid inputs have defined behavior.",
  },
  {
    name: "Boundary Validation",
    score: 82,
    description:
      "Checks minimum, maximum, and threshold values.",
  },
  {
    name: "Type Safety",
    score: 89,
    description:
      "Checks whether unexpected data types are detected.",
  },
  {
    name: "Error Handling",
    score: 78,
    description:
      "Evaluates whether validation failures produce clear and safe responses.",
  },
];

const coachingQuestions = [
  "What inputs are considered valid?",
  "What should happen when the input is empty?",
  "What happens if the data type is incorrect?",
  "What are the minimum and maximum allowed values?",
  "Can the input contain malformed data?",
  "Are duplicate values allowed?",
  "What should the system return when validation fails?",
];

const recommendations = [
  {
    title: "Define Validation Rules First",
    reason:
      "Validation is easier to implement when expected input conditions are explicit.",
    action:
      "Write the accepted type, range, format, and required-field rules before coding.",
  },
  {
    title: "Test Invalid Inputs Explicitly",
    reason:
      "Valid inputs alone cannot reveal whether the solution is robust.",
    action:
      "Create test cases for empty, malformed, out-of-range, and unexpected inputs.",
  },
  {
    title: "Separate Validation From Core Logic",
    reason:
      "Mixing validation with business logic can make solutions harder to reason about.",
    action:
      "Validate inputs early and keep the main algorithm focused on valid data.",
  },
];

const workflow = [
  {
    title: "Identify",
    description: "Extract expected input conditions.",
  },
  {
    title: "Define",
    description: "Create validation rules.",
  },
  {
    title: "Challenge",
    description: "Generate invalid scenarios.",
  },
  {
    title: "Evaluate",
    description: "Check validation coverage.",
  },
  {
    title: "Improve",
    description: "Fix missing validation cases.",
  },
];

export default function AIInterviewQuestionSolutionInputValidationCoach() {
  const [selectedCase, setSelectedCase] = useState(
    validationCases[0]
  );

  const [showCases, setShowCases] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const validationScore = 87;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Input Validation Coach
          </h1>

          <p className="text-gray-500">
            Identify the validation rules and invalid inputs your technical
            solution needs to handle.
          </p>
        </div>

      </div>

      {/* Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {validationScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              INPUT VALIDATION SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Strong Defensive Thinking
            </h2>

            <p className="text-gray-600 mt-2">
              Your validation strategy covers most common invalid-input
              scenarios, with additional opportunities around malformed data
              and duplicate values.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <ListChecks className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Validation Cases
            </p>

            <p className="text-3xl font-black text-indigo-600">
              6
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <Bug className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Critical Cases
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
              2
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <ShieldCheck
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Coverage
            </p>

            <p className="text-3xl font-black text-green-600">
              87%
            </p>
          </div>

        </div>

      </div>

      {/* Validation Cases */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <ListChecks className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI-Generated Validation Cases
              </h2>

              <p className="text-sm text-gray-500">
                Potential invalid and unexpected inputs ranked by importance.
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

            {validationCases.map((item, index) => (

              <button
                type="button"
                key={item.name}
                onClick={() => setSelectedCase(item)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedCase.name === item.name
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
                          {item.name}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          {item.type}
                        </p>

                      </div>

                      <span
                        className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                          item.priority === "Critical"
                            ? "bg-red-100 text-red-700"
                            : item.priority === "High"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-indigo-100 text-indigo-700"
                        }`}
                      >
                        {item.priority}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                      {item.rule}
                    </p>

                    <div className="h-3 bg-gray-200 rounded-full mt-4">

                      <div
                        className={`h-full rounded-full ${
                          item.score >= 90
                            ? "bg-red-500"
                            : item.score >= 80
                            ? "bg-indigo-500"
                            : "bg-orange-500"
                        }`}
                        style={{
                          width: `${item.score}%`,
                        }}
                      />

                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      Risk detection value: {item.score}/100
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Case */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              SELECTED VALIDATION CASE
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedCase.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedCase.rule}
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                POTENTIAL RISK
              </p>

              <p className="font-semibold text-red-700 mt-2">
                {selectedCase.risk}
              </p>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-4">

              <div className="bg-white rounded-xl p-5">
                <p className="text-xs text-gray-500">
                  TYPE
                </p>

                <p className="font-bold text-indigo-600 mt-1">
                  {selectedCase.type}
                </p>
              </div>

              <div className="bg-white rounded-xl p-5">
                <p className="text-xs text-gray-500">
                  PRIORITY
                </p>

                <p className="font-bold mt-1">
                  {selectedCase.priority}
                </p>
              </div>

              <div className="bg-white rounded-xl p-5">
                <p className="text-xs text-gray-500">
                  SCORE
                </p>

                <p className="text-3xl font-black text-orange-600">
                  {selectedCase.score}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Validation Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Validation Strategy Analysis
              </h2>

              <p className="text-sm text-gray-500">
                Evaluate different dimensions of defensive input handling.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFactors(!showFactors)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFactors ? "Hide Analysis" : "Show Analysis"}
          </button>

        </div>

        {showFactors && (
          <div className="space-y-4 mt-6">

            {validationFactors.map((factor) => (

              <div
                key={factor.name}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <h3 className="font-bold">
                    {factor.name}
                  </h3>

                  <span className="font-black text-indigo-600">
                    {factor.score}/100
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-3">

                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${factor.score}%`,
                    }}
                  />

                </div>

                <p className="text-sm text-gray-500 mt-3">
                  {factor.description}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Coaching Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Validation Coaching Questions
              </h2>

              <p className="text-sm text-gray-500">
                Think through the validation requirements before implementing
                the solution.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowQuestions(!showQuestions)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showQuestions ? "Hide Questions" : "Show Questions"}
          </button>

        </div>

        {showQuestions && (
          <div className="space-y-3 mt-6">

            {coachingQuestions.map((question, index) => (

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
                AI Validation Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve robustness by handling invalid inputs explicitly.
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
                Input Validation Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI turns expected inputs into validation checks.
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
          Analyze Validation Strategy
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
                Input validation strategy analyzed successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                Your validation coverage is{" "}
                <strong>{validationScore}/100</strong>. Focus on explicit
                handling of malformed data, duplicate values, and validation
                failures before processing the core solution.
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
              AI ROBUSTNESS PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Do not assume every input is valid.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong technical solutions define their expected inputs,
              explicitly handle invalid conditions, and fail safely when
              unexpected data reaches the system.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}