import React, { useState } from "react";
import {
  Brain,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Target,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Clock,
  Scissors,
} from "lucide-react";

const details = [
  {
    id: 1,
    text: "I used a hash map to store previously seen values.",
    relevance: 96,
    priority: "Essential",
    reason: "Directly explains the core algorithmic approach.",
  },
  {
    id: 2,
    text: "The hash map provides average O(1) lookup.",
    relevance: 94,
    priority: "Essential",
    reason: "Supports the performance justification.",
  },
  {
    id: 3,
    text: "I initialized the map before entering the main loop.",
    relevance: 48,
    priority: "Optional",
    reason: "Implementation detail that does not materially improve the explanation.",
  },
  {
    id: 4,
    text: "The variable was named seenValues because it describes its purpose.",
    relevance: 25,
    priority: "Remove",
    reason: "Low-value implementation detail for this interview context.",
  },
  {
    id: 5,
    text: "The algorithm requires O(n) additional space.",
    relevance: 91,
    priority: "Essential",
    reason: "Important for complete complexity analysis.",
  },
];

const removedDetails = [
  {
    text: "I initialized the map before entering the main loop.",
    reason:
      "This is an implementation-level detail that can be omitted when explaining the overall algorithm.",
  },
  {
    text: "The variable was named seenValues because it describes its purpose.",
    reason:
      "Naming details do not contribute meaningfully to the technical answer in this context.",
  },
];

const coachingQuestions = [
  "Does this detail help answer the interviewer's main question?",
  "Does this detail justify a technical decision?",
  "Does removing it weaken your reasoning?",
  "Is this implementation detail necessary to understand the algorithm?",
  "Can the same idea be communicated in fewer words?",
  "Would this detail be more appropriate if the interviewer asked a follow-up?",
];

const recommendations = [
  {
    title: "Keep Decision-Relevant Details",
    reason:
      "Details explaining algorithm selection and complexity directly support the answer.",
    action:
      "Prioritize information that explains why your solution works and how it performs.",
  },
  {
    title: "Move Implementation Details to Follow-Ups",
    reason:
      "Low-level details can consume time without improving the core explanation.",
    action:
      "Mention them only when the interviewer asks for implementation specifics.",
  },
  {
    title: "Use a Core-First Answer Structure",
    reason:
      "Interview time is limited and important reasoning should appear early.",
    action:
      "Explain approach → justification → complexity → optional implementation details.",
  },
];

const workflow = [
  {
    title: "Analyze",
    description: "Break the answer into technical details.",
  },
  {
    title: "Score",
    description: "Measure relevance of each detail.",
  },
  {
    title: "Classify",
    description: "Mark essential, optional, or removable details.",
  },
  {
    title: "Compress",
    description: "Create a concise answer.",
  },
  {
    title: "Explain",
    description: "Show what changed and why.",
  },
];

export default function AIInterviewAnswerTechnicalDetailRelevanceFilter() {
  const [selectedDetail, setSelectedDetail] = useState(details[0]);

  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showRemoved, setShowRemoved] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [filtered, setFiltered] = useState(false);

  const relevanceScore = 87;

  const priorityStyles = {
    Essential: "bg-green-100 text-green-700",
    Optional: "bg-orange-100 text-orange-700",
    Remove: "bg-red-100 text-red-700",
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
            AI Technical Detail Relevance Filter
          </h1>

          <p className="text-gray-500">
            Identify which technical details strengthen an interview answer
            and which can be safely removed.
          </p>

        </div>

      </div>

      {/* Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {relevanceScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              TECHNICAL DETAIL RELEVANCE SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Focused Technical Answer
            </h2>

            <p className="text-gray-600 mt-2">
              Most of the answer contributes directly to the core technical
              explanation, with a few implementation details that can be
              deferred or removed.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Essential
            </p>

            <p className="text-3xl font-black text-green-600">
              3
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Optional
            </p>

            <p className="text-3xl font-black text-orange-600">
              1
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <Scissors
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Removable
            </p>

            <p className="text-3xl font-black text-red-600">
              1
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-5">

            <Clock
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Time Saved
            </p>

            <p className="text-3xl font-black text-indigo-600">
              22%
            </p>

          </div>

        </div>

      </div>

      {/* Original Answer */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Candidate Answer
            </h2>

            <p className="text-sm text-gray-500">
              AI analyzes each technical detail independently.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-6">

          <p className="text-xs font-bold text-gray-500">
            CANDIDATE
          </p>

          <p className="text-gray-700 leading-7 mt-3">
            "I used a hash map to store previously seen values. The hash map
            provides average O(1) lookup. I initialized the map before entering
            the main loop. The variable was named seenValues because it
            describes its purpose. The algorithm requires O(n) additional
            space."
          </p>

        </div>

        <div className="flex justify-end mt-5">

          <button
            type="button"
            onClick={() => setFiltered(true)}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
          >
            Filter Technical Details
            <Filter size={18} />
          </button>

        </div>

      </div>

      {/* Detail Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Filter className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Detail Relevance Analysis
              </h2>

              <p className="text-sm text-gray-500">
                Select a detail to understand its relevance to the core answer.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowAnalysis(!showAnalysis)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showAnalysis ? "Hide Analysis" : "Show Analysis"}
          </button>

        </div>

        {showAnalysis && (
          <div className="space-y-4 mt-6">

            {details.map((detail) => (

              <button
                type="button"
                key={detail.id}
                onClick={() => setSelectedDetail(detail)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedDetail.id === detail.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex gap-4">

                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {detail.id}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <p className="font-semibold text-gray-800">
                        "{detail.text}"
                      </p>

                      <span
                        className={`px-3 py-1 h-fit rounded-full text-xs font-semibold whitespace-nowrap ${
                          priorityStyles[detail.priority]
                        }`}
                      >
                        {detail.priority}
                      </span>

                    </div>

                    <div className="flex items-center gap-4 mt-4">

                      <div className="flex-1 h-3 bg-gray-200 rounded-full">

                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{
                            width: `${detail.relevance}%`,
                          }}
                        />

                      </div>

                      <span className="font-black text-indigo-700">
                        {detail.relevance}%
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                      {detail.reason}
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Detail */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              SELECTED DETAIL
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedDetail.priority} Information
            </h2>

            <p className="text-gray-700 mt-3">
              "{selectedDetail.text}"
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  RELEVANCE
                </p>

                <p className="text-3xl font-black text-indigo-600">
                  {selectedDetail.relevance}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  PRIORITY
                </p>

                <p
                  className={`font-black mt-1 ${
                    selectedDetail.priority === "Essential"
                      ? "text-green-600"
                      : selectedDetail.priority === "Optional"
                      ? "text-orange-600"
                      : "text-red-600"
                  }`}
                >
                  {selectedDetail.priority}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  RECOMMENDATION
                </p>

                <p className="font-black text-indigo-600 mt-1">
                  {selectedDetail.priority === "Remove"
                    ? "Remove"
                    : selectedDetail.priority === "Optional"
                    ? "Defer"
                    : "Keep"}
                </p>

              </div>

            </div>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                AI REASONING
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                {selectedDetail.reason}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Concise Version */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-green-600">
              AI-CONCISED ANSWER
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Core Technical Explanation
            </h2>

            <div className="bg-white rounded-xl p-5 mt-4">

              <p className="text-gray-700 leading-7">
                "I use a hash map to store previously seen values, giving
                average O(1) lookup. This allows the algorithm to solve the
                problem efficiently while requiring O(n) additional space."
              </p>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  ORIGINAL DETAILS
                </p>

                <p className="text-3xl font-black text-gray-700">
                  5
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  CORE DETAILS
                </p>

                <p className="text-3xl font-black text-green-600">
                  3
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  DETAILS REMOVED
                </p>

                <p className="text-3xl font-black text-red-600">
                  2
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Removed Details */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Scissors className="text-red-600" />

            <div>

              <h2 className="font-bold text-lg">
                Removed Details
              </h2>

              <p className="text-sm text-gray-500">
                Information that can be omitted without weakening the core
                answer.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowRemoved(!showRemoved)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showRemoved ? "Hide Details" : "Show Details"}
          </button>

        </div>

        {showRemoved && (
          <div className="space-y-4 mt-6">

            {removedDetails.map((item) => (

              <div
                key={item.text}
                className="border border-red-200 bg-red-50 rounded-xl p-5"
              >

                <p className="font-semibold text-red-800">
                  "{item.text}"
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  {item.reason}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Coaching */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Detail Relevance Coaching
              </h2>

              <p className="text-sm text-gray-500">
                Learn how to decide what belongs in the core answer.
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
                AI Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve concise technical communication.
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
                Detail Filtering Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI converts a detailed answer into a focused response.
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

      {/* Filter */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setFiltered(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Apply Relevance Filter
          <Filter size={18} />
        </button>

      </div>

      {/* Result */}
      {filtered && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                FILTER COMPLETE
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Answer reduced to its highest-value technical information.
              </h2>

              <p className="text-gray-600 mt-2">
                Two low-value implementation details were removed while the
                algorithm, complexity reasoning, and key technical decisions
                were preserved.
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
              AI INTERVIEW PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Keep the reasoning, remove the noise.
            </h2>

            <p className="text-gray-600 mt-2">
              A concise technical answer should preserve the decisions,
              reasoning, correctness, and performance information that matter
              while leaving secondary implementation details for follow-up
              questions.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}