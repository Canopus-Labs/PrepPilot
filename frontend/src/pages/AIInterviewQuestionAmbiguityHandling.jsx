import React, { useState } from "react";
import {
  Brain,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Target,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  BarChart3,
} from "lucide-react";

const ambiguityAreas = [
  {
    title: "Input Constraints",
    status: "Unclear",
    importance: "Critical",
    score: 94,
    description:
      "The question does not specify the expected input size or data limits.",
  },
  {
    title: "Duplicate Values",
    status: "Unclear",
    importance: "High",
    score: 86,
    description:
      "It is unclear whether duplicate values should be allowed.",
  },
  {
    title: "Ordering Requirement",
    status: "Unclear",
    importance: "High",
    score: 82,
    description:
      "The expected ordering of the returned result is not specified.",
  },
  {
    title: "Invalid Input",
    status: "Unclear",
    importance: "Medium",
    score: 67,
    description:
      "The interviewer has not stated how invalid input should be handled.",
  },
];

const clarificationQuestions = [
  {
    question:
      "What is the maximum possible size of the input?",
    relevance: 96,
    quality: "Excellent",
    impact: "Determines algorithmic complexity requirements.",
  },
  {
    question:
      "Can the input contain duplicate values?",
    relevance: 91,
    quality: "Excellent",
    impact: "May change the algorithm and result handling.",
  },
  {
    question:
      "Does the output need to preserve the original ordering?",
    relevance: 86,
    quality: "Good",
    impact: "Affects data structures and implementation choices.",
  },
  {
    question:
      "What color should the UI button be?",
    relevance: 8,
    quality: "Poor",
    impact: "Not relevant to the technical problem.",
  },
];

const coachingQuestions = [
  "What information is missing from the problem statement?",
  "Which clarification question would most affect your solution?",
  "What input constraints do you need before selecting an algorithm?",
  "Are duplicate values allowed?",
  "What should happen for invalid or empty input?",
  "What should the output format and ordering be?",
  "Which assumptions should you avoid making without confirmation?",
];

const recommendations = [
  {
    title: "Ask About Constraints First",
    reason:
      "Input size strongly influences algorithm and data-structure selection.",
    action:
      "Clarify maximum input size and time or memory expectations before choosing an approach.",
  },
  {
    title: "Clarify Output Behavior",
    reason:
      "The required output ordering and duplicate handling are currently ambiguous.",
    action:
      "Ask how results should be ordered and whether duplicates should be preserved.",
  },
  {
    title: "Avoid Low-Impact Questions",
    reason:
      "Not every missing detail affects the technical solution.",
    action:
      "Prioritize questions that can change your algorithm, architecture, or correctness.",
  },
];

const workflow = [
  {
    title: "Present",
    description: "Show an intentionally ambiguous question.",
  },
  {
    title: "Clarify",
    description: "Candidate asks questions.",
  },
  {
    title: "Respond",
    description: "AI provides relevant information.",
  },
  {
    title: "Evaluate",
    description: "Score clarification quality.",
  },
  {
    title: "Solve",
    description: "Begin the refined problem.",
  },
];

export default function AIInterviewQuestionAmbiguityHandlingPractice() {
  const [selectedArea, setSelectedArea] =
    useState(ambiguityAreas[0]);

  const [showAmbiguity, setShowAmbiguity] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showCoaching, setShowCoaching] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [started, setStarted] = useState(false);
  const [evaluated, setEvaluated] = useState(false);

  const clarificationScore = 88;

  const importanceStyles = {
    Critical: "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-700",
    Medium: "bg-yellow-100 text-yellow-700",
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
            AI Interview Question Ambiguity Handling Practice
          </h1>

          <p className="text-gray-500">
            Practice identifying unclear requirements and asking effective
            clarification questions before solving an interview problem.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {clarificationScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              REQUIREMENT CLARIFICATION SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Strong Clarification Ability
            </h2>

            <p className="text-gray-600 mt-2">
              Your questions focus on constraints and requirements that can
              meaningfully affect the technical solution.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-red-50 rounded-xl p-5">

            <AlertTriangle
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Critical Ambiguities
            </p>

            <p className="text-3xl font-black text-red-600">
              1
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <HelpCircle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Questions Asked
            </p>

            <p className="text-3xl font-black text-orange-600">
              4
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-5">

            <Target
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Relevant Questions
            </p>

            <p className="text-3xl font-black text-indigo-600">
              3
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Relevance
            </p>

            <p className="text-3xl font-black text-green-600">
              88%
            </p>

          </div>

        </div>

      </div>

      {/* Ambiguous Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <MessageSquare className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Ambiguous Interview Question
              </h2>

              <p className="text-sm text-gray-500">
                Identify what you need to know before attempting the solution.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setStarted(true)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {started ? "Practice Active" : "Start Practice"}
          </button>

        </div>

        <div className="bg-indigo-50 rounded-2xl p-6 mt-6">

          <p className="text-xs font-bold text-indigo-600">
            INTERVIEWER
          </p>

          <h2 className="text-xl font-bold text-indigo-800 mt-2">
            "Design a function that finds the most common values in a list."
          </h2>

          <p className="text-gray-600 mt-3">
            The interviewer intentionally has not provided all the
            requirements. Do not immediately start coding. First determine
            what needs clarification.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-5">

          <div className="bg-white border rounded-xl p-5">

            <p className="text-xs font-bold text-gray-500">
              CANDIDATE INSTRUCTION
            </p>

            <p className="text-sm text-gray-700 mt-2">
              Ask clarification questions before proposing an algorithm.
              Prioritize questions that could change your solution.
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-xs font-bold text-orange-600">
              AI RULE
            </p>

            <p className="text-sm text-gray-700 mt-2">
              The AI reveals additional requirements based on the relevance of
              your clarification questions.
            </p>

          </div>

        </div>

      </div>

      {/* Ambiguity Detection */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <AlertTriangle className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Detected Ambiguities
              </h2>

              <p className="text-sm text-gray-500">
                Areas that should be clarified before solving the problem.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowAmbiguity(!showAmbiguity)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showAmbiguity ? "Hide Ambiguities" : "Show Ambiguities"}
          </button>

        </div>

        {showAmbiguity && (
          <div className="space-y-4 mt-6">

            {ambiguityAreas.map((area, index) => (

              <button
                type="button"
                key={area.title}
                onClick={() => setSelectedArea(area)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedArea.title === area.title
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
                          {area.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {area.description}
                        </p>

                      </div>

                      <span
                        className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                          importanceStyles[area.importance]
                        }`}
                      >
                        {area.importance}
                      </span>

                    </div>

                    <div className="flex items-center gap-4 mt-4">

                      <div className="flex-1 h-3 bg-gray-200 rounded-full">

                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{
                            width: `${area.score}%`,
                          }}
                        />

                      </div>

                      <span className="font-black text-indigo-700">
                        {area.score}
                      </span>

                    </div>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Ambiguity */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              HIGH-IMPACT AMBIGUITY
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedArea.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedArea.description}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  IMPORTANCE
                </p>

                <p className="font-black text-red-600 mt-1">
                  {selectedArea.importance}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  IMPACT SCORE
                </p>

                <p className="text-3xl font-black text-indigo-600">
                  {selectedArea.score}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  STATUS
                </p>

                <p className="font-black text-orange-600 mt-1">
                  {selectedArea.status}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Example Clarification Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <MessageSquare className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Example Clarification Questions
              </h2>

              <p className="text-sm text-gray-500">
                The AI evaluates questions based on their relevance to the
                solution.
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
          <div className="space-y-4 mt-6">

            {clarificationQuestions.map((item) => (

              <div
                key={item.question}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <p className="font-semibold">
                    "{item.question}"
                  </p>

                  <span
                    className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                      item.quality === "Excellent"
                        ? "bg-green-100 text-green-700"
                        : item.quality === "Good"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.quality}
                  </span>

                </div>

                <div className="flex items-center gap-4 mt-4">

                  <div className="flex-1 h-3 bg-gray-200 rounded-full">

                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{
                        width: `${item.relevance}%`,
                      }}
                    />

                  </div>

                  <span className="font-bold text-indigo-700">
                    {item.relevance}%
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-3">
                  Impact: {item.impact}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* AI Coaching Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Clarification Coaching
              </h2>

              <p className="text-sm text-gray-500">
                Practice identifying the information needed before solving.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowCoaching(!showCoaching)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showCoaching ? "Hide Questions" : "Show Questions"}
          </button>

        </div>

        {showCoaching && (
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
                Improve requirement clarification before starting a solution.
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
                Ambiguity Practice Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI turns unclear requirements into a structured
                clarification exercise.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowWorkflow(!showWorkflow)
            }
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

      {/* Evaluate */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setEvaluated(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Evaluate Clarification Ability
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Result */}
      {evaluated && (
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
                Clarification ability scored {clarificationScore}/100.
              </h2>

              <p className="text-gray-600 mt-2">
                Your strongest questions focus on constraints, duplicate
                handling, and output behavior. Continue prioritizing questions
                that can materially change the solution.
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
              Clarify before you assume.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong interview candidates do not rush into implementation.
              They identify ambiguity, ask high-impact questions, and make sure
              the solution matches the actual requirements.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}