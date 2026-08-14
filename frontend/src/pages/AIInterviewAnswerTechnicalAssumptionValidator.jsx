import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const assumptions = [
  {
    text: "Input will always be sorted.",
    status: "Unsupported",
    confidence: 92,
    reason: "The problem statement does not guarantee sorted input.",
    alternative: "Ask whether the input is guaranteed to be sorted.",
  },
  {
    text: "The number of users will remain below 10,000.",
    status: "Needs Clarification",
    confidence: 78,
    reason: "No explicit upper limit is provided.",
    alternative: "Design for scalable input unless a limit is confirmed.",
  },
  {
    text: "Duplicate values are allowed.",
    status: "Supported",
    confidence: 88,
    reason: "The requirements do not prohibit duplicate values.",
    alternative: "Explicitly mention duplicate handling in the answer.",
  },
];

export default function AIInterviewAnswerTechnicalAssumptionValidator() {
  const [selected, setSelected] = useState(0);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [validated, setValidated] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const assumption = assumptions[selected];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Assumption Validator
          </h1>

          <p className="text-gray-500">
            Validate whether assumptions in technical interview answers are
            justified by the problem requirements.
          </p>
        </div>
      </div>

      {/* Main Result */}
      <div className="bg-orange-50 rounded-2xl p-6">
        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
            <AlertTriangle className="text-orange-600" size={32} />
          </div>

          <div>
            <p className="text-xs font-bold text-orange-600">
              AI VALIDATION RESULT
            </p>

            <h2 className="text-2xl font-black text-orange-800 mt-1">
              Unsupported Assumption Detected
            </h2>

            <p className="text-gray-600 mt-2">
              The assumption that the input is always sorted is not explicitly
              supported by the stated requirements.
            </p>
          </div>

        </div>
      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <Brain className="text-indigo-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Assumptions
            </p>
            <p className="text-3xl font-black text-indigo-600">
              3
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <AlertTriangle className="text-red-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Unsupported
            </p>
            <p className="text-3xl font-black text-red-600">
              1
            </p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-5">
            <HelpCircle className="text-yellow-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Clarification Needed
            </p>
            <p className="text-3xl font-black text-yellow-600">
              1
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Supported
            </p>
            <p className="text-3xl font-black text-green-600">
              1
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <ShieldCheck className="text-purple-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Validation Score
            </p>
            <p className="text-3xl font-black text-purple-600">
              82%
            </p>
          </div>

        </div>
      </div>

      {/* Assumption List */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="font-bold text-lg">
              Detected Assumptions
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Select an assumption to inspect its validation result.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showAnalysis ? "Hide Analysis" : "Show Analysis"}
          </button>

        </div>

        <div className="space-y-4 mt-6">

          {assumptions.map((item, index) => (

            <button
              type="button"
              key={item.text}
              onClick={() => setSelected(index)}
              className={`w-full text-left border rounded-2xl p-5 ${
                selected === index
                  ? "border-indigo-500 bg-indigo-50"
                  : ""
              }`}
            >

              <div className="flex items-center gap-4">

                {item.status === "Unsupported" && (
                  <AlertTriangle className="text-red-600" />
                )}

                {item.status === "Needs Clarification" && (
                  <HelpCircle className="text-yellow-600" />
                )}

                {item.status === "Supported" && (
                  <CheckCircle2 className="text-green-600" />
                )}

                <div className="flex-1">

                  <p className="font-bold">
                    {item.text}
                  </p>

                  <p className="text-sm text-gray-500 mt-1">
                    Validation confidence: {item.confidence}%
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.status === "Unsupported"
                      ? "bg-red-100 text-red-700"
                      : item.status === "Needs Clarification"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.status}
                </span>

              </div>

            </button>
          ))}

        </div>
      </div>

      {/* Selected Analysis */}
      {showAnalysis && (
        <div className="bg-white rounded-2xl shadow p-6">

          <div className="flex items-center gap-3">

            <ShieldCheck className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Assumption Analysis
              </h2>

              <p className="text-sm text-gray-500">
                AI reasoning behind the validation result.
              </p>
            </div>

          </div>

          <div className="bg-indigo-50 rounded-2xl p-6 mt-6">

            <p className="text-xs font-bold text-indigo-600">
              SELECTED ASSUMPTION
            </p>

            <h2 className="text-xl font-black text-indigo-800 mt-2">
              {assumption.text}
            </h2>

            <p className="text-gray-600 mt-4">
              {assumption.reason}
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-5 mt-5">

            <div className="bg-orange-50 rounded-xl p-5">
              <p className="text-xs text-gray-500">
                STATUS
              </p>

              <p className="text-xl font-black text-orange-600 mt-2">
                {assumption.status}
              </p>
            </div>

            <div className="bg-indigo-50 rounded-xl p-5">
              <p className="text-xs text-gray-500">
                CONFIDENCE
              </p>

              <p className="text-3xl font-black text-indigo-600 mt-2">
                {assumption.confidence}%
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-5">
              <p className="text-xs text-gray-500">
                SAFER APPROACH
              </p>

              <p className="font-bold text-green-700 mt-2">
                Clarify requirements
              </p>
            </div>

          </div>

        </div>
      )}

      {/* Clarification Coach */}
      <div className="bg-yellow-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <HelpCircle
            className="text-yellow-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-yellow-600">
              CLARIFICATION COACH
            </p>

            <h2 className="text-xl font-bold text-yellow-800 mt-1">
              Ask before building your solution around this assumption.
            </h2>

            <p className="text-gray-600 mt-2">
              A strong interview response should verify important conditions
              instead of silently assuming them.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                SUGGESTED QUESTION
              </p>

              <p className="font-semibold text-yellow-700 mt-2">
                "Can I assume that the input is already sorted, or should the
                solution handle unsorted input as well?"
              </p>

            </div>

          </div>

        </div>
      </div>

      {/* Safer Alternative */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <ShieldCheck
            className="text-green-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              SAFER ALTERNATIVE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              {assumption.alternative}
            </h2>

            <p className="text-gray-600 mt-2">
              Explicitly state important assumptions in your answer and explain
              how the approach would change if the assumption is not valid.
            </p>

          </div>

        </div>
      </div>

      {/* Validation Process */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Validation Process
        </h2>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          {[
            "Extract Assumptions",
            "Compare Requirements",
            "Detect Conflicts",
            "Suggest Clarification",
          ].map((step, index) => (

            <div
              key={step}
              className="border rounded-xl p-5"
            >

              <p className="text-xs font-bold text-indigo-600">
                STEP {index + 1}
              </p>

              <p className="font-bold mt-2">
                {step}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* Validate */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Validate Technical Assumptions
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Check whether assumptions in the current answer are justified by
              the interview requirements.
            </p>

            <button
              type="button"
              onClick={() => setValidated(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Run Validation
              <ArrowRight size={18} />
            </button>

            {validated && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Technical assumption validation completed successfully.
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
              Refresh Validation
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Re-evaluate assumptions after changing the problem requirements.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Update Validation
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Assumption validation updated successfully.
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Final Guidance */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI INTERVIEW PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Make important assumptions explicit.
            </h2>

            <p className="text-gray-600 mt-2">
              A technically valid solution can still be weak if it depends on
              assumptions that were never established. Clarifying requirements
              first makes your reasoning more reliable and demonstrates stronger
              engineering judgment.
            </p>

          </div>

        </div>
      </div>

    </div>
  );
}