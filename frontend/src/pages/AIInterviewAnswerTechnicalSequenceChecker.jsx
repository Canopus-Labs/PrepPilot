import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  Lightbulb,
  ListOrdered,
  Target,
} from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Define the problem",
    status: "correct",
    description: "Clearly identify the required input, output, and objective.",
  },
  {
    number: 2,
    title: "Identify the relevant concept",
    status: "correct",
    description: "Connect the problem requirements to the appropriate technique.",
  },
  {
    number: 3,
    title: "Explain the data structure",
    status: "warning",
    description:
      "The data structure is introduced before explaining why it is needed.",
  },
  {
    number: 4,
    title: "Explain the algorithm",
    status: "correct",
    description: "Describe how the chosen technique processes the input.",
  },
  {
    number: 5,
    title: "Analyze complexity",
    status: "missing",
    description: "Time and space complexity should be explained after the approach.",
  },
  {
    number: 6,
    title: "Discuss edge cases",
    status: "correct",
    description: "Explain important boundary conditions and failure cases.",
  },
];

const improvedSequence = [
  "Define the problem and requirements",
  "Identify the relevant concept",
  "Explain why the data structure is needed",
  "Describe the algorithm step by step",
  "Discuss edge cases",
  "Analyze time and space complexity",
  "Conclude with the final approach",
];

export default function AIInterviewAnswerTechnicalSequenceChecker() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedStep, setSelectedStep] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Sequence Checker
          </h1>

          <p className="text-gray-500">
            Check whether your technical explanation follows a clear and
            logical sequence.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Explain how you would optimize a slow database-backed application.
        </h2>

        <div className="flex flex-wrap gap-2 mt-4">

          {[
            "Technical Explanation",
            "Performance",
            "Database",
            "Reasoning Flow",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}

        </div>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Technical Explanation
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Paste your explanation. AI will extract the major reasoning and
          implementation steps and evaluate their sequence.
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={9}
          placeholder="Explain your solution step by step..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          <ListOrdered size={18} />
          Check Technical Sequence
        </button>

      </div>

      {analyzed && (
        <>
          {/* Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <Target
                  className="text-indigo-600"
                  size={42}
                />
              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Sequence Quality
                </p>

                <div className="flex items-end gap-3">

                  <p className="text-6xl font-black text-indigo-600">
                    72%
                  </p>

                  <span className="mb-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                    Needs Improvement
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  Your explanation contains mostly correct steps, but some
                  prerequisites are introduced too late and one important
                  transition is missing.
                </p>

                <div className="h-3 bg-white rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: "72%" }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">
              <CheckCircle2 className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Correct Steps
              </p>

              <p className="text-3xl font-black text-green-600">
                4
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <AlertTriangle className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Sequence Issues
              </p>

              <p className="text-3xl font-black text-orange-600">
                2
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <ArrowDown className="text-red-600" />

              <p className="text-sm text-gray-500 mt-4">
                Missing Prerequisite
              </p>

              <p className="text-3xl font-black text-red-600">
                1
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <ListOrdered className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Recommended Steps
              </p>

              <p className="text-3xl font-black text-indigo-600">
                7
              </p>
            </div>

          </div>

          {/* Extracted Steps */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              AI-Extracted Explanation Steps
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI identified the major reasoning and implementation steps in
              your response.
            </p>

            <div className="relative mt-6">

              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

              <div className="space-y-4">

                {steps.map((step) => (
                  <button
                    type="button"
                    key={step.number}
                    onClick={() =>
                      setSelectedStep(
                        selectedStep === step.number
                          ? null
                          : step.number
                      )
                    }
                    className="relative w-full text-left"
                  >

                    <div className="flex gap-4">

                      <div
                        className={`relative z-10 w-12 h-12 rounded-full border-4 border-white shadow flex items-center justify-center font-bold ${
                          step.status === "correct"
                            ? "bg-green-100 text-green-700"
                            : step.status === "warning"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {step.number}
                      </div>

                      <div className="flex-1 border rounded-2xl p-5 hover:border-indigo-400 transition">

                        <div className="flex justify-between gap-4">

                          <div>

                            <h3 className="font-bold">
                              {step.title}
                            </h3>

                            <p className="text-sm text-gray-600 mt-2">
                              {step.description}
                            </p>

                          </div>

                          {step.status === "correct" && (
                            <CheckCircle2
                              className="text-green-600"
                              size={23}
                            />
                          )}

                          {step.status === "warning" && (
                            <AlertTriangle
                              className="text-orange-600"
                              size={23}
                            />
                          )}

                          {step.status === "missing" && (
                            <AlertTriangle
                              className="text-red-600"
                              size={23}
                            />
                          )}

                        </div>

                        {selectedStep === step.number && (
                          <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                            <p className="text-xs font-semibold text-indigo-700">
                              AI Sequence Feedback
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                              {step.status === "correct"
                                ? "This step is positioned appropriately and provides a useful foundation for the next explanation."
                                : step.status === "warning"
                                ? "Consider moving this step after the prerequisite explanation so the interviewer understands why it is needed."
                                : "This step should be added because it helps connect the implementation to the expected performance characteristics."}
                            </p>

                          </div>
                        )}

                      </div>

                    </div>

                  </button>
                ))}

              </div>

            </div>

          </div>

          {/* Sequence Problems */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-orange-700">
                  Detected Sequence Problems
                </h2>

                <div className="space-y-3 mt-4">

                  <div className="bg-white rounded-xl p-4">

                    <p className="font-semibold">
                      Data Structure Introduced Too Early
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      You mention the database index before explaining which
                      performance problem it is intended to solve.
                    </p>

                    <div className="flex items-center gap-3 mt-3 text-sm">

                      <span className="px-3 py-1 rounded-lg bg-red-100 text-red-700">
                        Current
                      </span>

                      <ArrowRight size={17} />

                      <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700">
                        Explain problem first
                      </span>

                    </div>

                  </div>

                  <div className="bg-white rounded-xl p-4">

                    <p className="font-semibold">
                      Complexity Analysis Missing From Flow
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                      The response jumps from implementation directly to the
                      conclusion without explaining expected performance.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Improved Sequence */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex gap-3">

              <ListOrdered
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-lg">
                  AI Recommended Sequence
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  A clearer order that preserves your original technical idea.
                </p>

                <div className="space-y-3 mt-5">

                  {improvedSequence.map((step, index) => (
                    <div
                      key={step}
                      className="flex items-center gap-4 bg-indigo-50 rounded-xl p-4"
                    >

                      <span className="w-9 h-9 rounded-full bg-white text-indigo-600 flex items-center justify-center font-black">
                        {index + 1}
                      </span>

                      <p className="font-medium">
                        {step}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* Prerequisite Map */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Prerequisite Flow
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Technical explanations are easier to follow when each step
              answers the question created by the previous step.
            </p>

            <div className="flex flex-col items-center mt-6">

              {[
                "Problem",
                "Reasoning",
                "Approach",
                "Implementation",
                "Edge Cases",
                "Complexity",
                "Conclusion",
              ].map((item, index, array) => (
                <React.Fragment key={item}>

                  <div className="px-6 py-3 rounded-xl bg-indigo-100 text-indigo-700 font-semibold">
                    {item}
                  </div>

                  {index < array.length - 1 && (
                    <ArrowDown
                      className="text-indigo-400 my-2"
                      size={20}
                    />
                  )}

                </React.Fragment>
              ))}

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Explain the <strong>problem and reason first</strong>, then
                  introduce the technical component that solves it. After
                  explaining the implementation, cover edge cases and
                  complexity before concluding.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}