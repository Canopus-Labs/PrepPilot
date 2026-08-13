import React, { useState } from "react";
import {
  Brain,
  ArrowDown,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target,
  RefreshCw,
} from "lucide-react";

const originalSequence = [
  "Implementation",
  "Edge Cases",
  "Problem",
  "Complexity",
  "Approach",
  "Conclusion",
  "Reasoning",
];

const recommendedSequence = [
  {
    title: "Problem",
    description: "Clarify what needs to be solved and the important requirements.",
  },
  {
    title: "Approach",
    description: "State the high-level solution before discussing implementation.",
  },
  {
    title: "Reasoning",
    description: "Explain why the selected approach is appropriate.",
  },
  {
    title: "Implementation",
    description: "Describe the important implementation details.",
  },
  {
    title: "Complexity",
    description: "Explain time and space complexity.",
  },
  {
    title: "Edge Cases",
    description: "Mention important boundary and failure scenarios.",
  },
  {
    title: "Conclusion",
    description: "Summarize the solution and its key trade-offs.",
  },
];

const questionTypes = [
  {
    type: "Coding Problem",
    sequence:
      "Problem → Approach → Reasoning → Implementation → Complexity → Edge Cases → Conclusion",
  },
  {
    type: "System Design",
    sequence:
      "Requirements → Architecture → Components → Data Flow → Scalability → Trade-offs → Conclusion",
  },
  {
    type: "Technical Concept",
    sequence:
      "Definition → Core Idea → Example → Use Case → Limitations → Conclusion",
  },
  {
    type: "Project Discussion",
    sequence:
      "Problem → Role → Solution → Technical Decisions → Challenges → Results → Learnings",
  },
];

export default function AIInterviewAnswerTechnicalSequenceImprovement() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedType, setSelectedType] = useState("Coding Problem");

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Sequence Improvement
          </h1>

          <p className="text-gray-500">
            Improve the order of your technical explanation so interviewers
            can follow your reasoning more easily.
          </p>
        </div>

      </div>

      {/* Question Type */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Question Type
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          The recommended explanation sequence changes depending on the type
          of interview question.
        </p>

        <div className="grid md:grid-cols-4 gap-3 mt-5">

          {questionTypes.map((item) => (
            <button
              type="button"
              key={item.type}
              onClick={() => setSelectedType(item.type)}
              className={`text-left border rounded-xl p-4 transition ${
                selectedType === item.type
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >
              <p className="font-semibold">
                {item.type}
              </p>
            </button>
          ))}

        </div>

      </div>

      {/* Answer Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Your Technical Answer
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Paste your response and AI will analyze its current sequence.
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={9}
          placeholder="Explain your solution..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          disabled={!answer.trim()}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Explanation Sequence
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <Target
                  className="text-indigo-600"
                  size={40}
                />
              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Sequence Quality
                </p>

                <div className="flex items-end gap-3">

                  <p className="text-6xl font-black text-indigo-600">
                    71%
                  </p>

                  <span className="mb-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold">
                    Needs Improvement
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  Your answer contains the necessary technical information,
                  but the explanation would be easier to follow if the
                  reasoning and approach were introduced before implementation
                  details.
                </p>

                <div className="h-3 bg-white rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: "71%" }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <Target className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Current Order
              </p>

              <p className="text-3xl font-black text-indigo-600">
                7 Steps
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <CheckCircle2 className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Useful Sections
              </p>

              <p className="text-3xl font-black text-green-600">
                7
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <AlertTriangle className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Ordering Issues
              </p>

              <p className="text-3xl font-black text-orange-600">
                3
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <RefreshCw className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Recommended Type
              </p>

              <p className="text-2xl font-black text-indigo-600">
                {selectedType}
              </p>

            </div>

          </div>

          {/* Current Sequence */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Detected Answer Sequence
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI identified the following order in your response.
            </p>

            <div className="grid md:grid-cols-7 gap-2 mt-6">

              {originalSequence.map((item, index) => (
                <React.Fragment key={item}>

                  <div
                    className={`rounded-xl p-4 text-center ${
                      [0, 1, 3].includes(index)
                        ? "bg-orange-50 border border-orange-200"
                        : "bg-gray-50"
                    }`}
                  >

                    <span className="text-xs text-gray-400">
                      {index + 1}
                    </span>

                    <p className="font-semibold text-sm mt-2">
                      {item}
                    </p>

                    {[0, 1, 3].includes(index) && (
                      <AlertTriangle
                        size={16}
                        className="mx-auto mt-2 text-orange-500"
                      />
                    )}

                  </div>

                </React.Fragment>
              ))}

            </div>

          </div>

          {/* Recommended Sequence */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Recommended Explanation Sequence
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI reorganizes the response into a logical sequence suited to
              the selected question type.
            </p>

            <div className="space-y-3 mt-6">

              {recommendedSequence.map((step, index) => (
                <div key={step.title}>

                  <div className="flex gap-4 items-center">

                    <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black">
                      {index + 1}
                    </div>

                    <div className="flex-1 border rounded-xl p-4">

                      <h3 className="font-bold">
                        {step.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {step.description}
                      </p>

                    </div>

                  </div>

                  {index < recommendedSequence.length - 1 && (
                    <ArrowDown
                      className="ml-4 my-2 text-indigo-400"
                      size={20}
                    />
                  )}

                </div>
              ))}

            </div>

          </div>

          {/* Improvements */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-orange-700">
                  Sequence Issues Detected
                </h2>

                <div className="space-y-3 mt-4">

                  {[
                    "Implementation details appeared before the high-level approach.",
                    "Edge cases were discussed before explaining the main reasoning.",
                    "The conclusion appeared before all important technical justification was established.",
                  ].map((issue, index) => (
                    <div
                      key={issue}
                      className="bg-white rounded-xl p-4 flex gap-3"
                    >

                      <span className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                        {index + 1}
                      </span>

                      <p className="text-sm text-gray-600">
                        {issue}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* Question Type Framework */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Adaptive Answer Framework
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              The framework changes according to the question type rather than
              forcing every answer into the same structure.
            </p>

            <div className="space-y-4 mt-6">

              {questionTypes.map((item) => (
                <div
                  key={item.type}
                  className={`border rounded-xl p-4 ${
                    selectedType === item.type
                      ? "border-indigo-500 bg-indigo-50"
                      : ""
                  }`}
                >

                  <div className="flex justify-between gap-4">

                    <p className="font-bold">
                      {item.type}
                    </p>

                    {selectedType === item.type && (
                      <span className="text-xs px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 font-semibold">
                        Selected
                      </span>
                    )}

                  </div>

                  <p className="text-sm text-gray-600 mt-2">
                    {item.sequence}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Before vs After */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Before vs Recommended Structure
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-5">

              <div className="border border-orange-200 rounded-xl p-5 bg-orange-50">

                <h3 className="font-bold text-orange-700">
                  Current Structure
                </h3>

                <p className="text-sm text-gray-600 mt-3">
                  Implementation → Edge Cases → Problem → Complexity →
                  Approach → Conclusion → Reasoning
                </p>

                <p className="text-xs text-orange-700 mt-4">
                  Information is present, but the reasoning flow is difficult
                  to follow.
                </p>

              </div>

              <div className="border border-green-200 rounded-xl p-5 bg-green-50">

                <h3 className="font-bold text-green-700">
                  Recommended Structure
                </h3>

                <p className="text-sm text-gray-600 mt-3">
                  Problem → Approach → Reasoning → Implementation → Complexity
                  → Edge Cases → Conclusion
                </p>

                <p className="text-xs text-green-700 mt-4">
                  The interviewer receives the context and reasoning before
                  the implementation details.
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
                  AI Coaching Tip
                </h2>

                <p className="text-gray-600 mt-2">
                  Before explaining implementation details, give the
                  interviewer a mental map of your solution. Start with what
                  the problem requires, state your approach, and explain why it
                  works. Then move into implementation, complexity, and edge
                  cases. This makes your reasoning easier to evaluate.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}