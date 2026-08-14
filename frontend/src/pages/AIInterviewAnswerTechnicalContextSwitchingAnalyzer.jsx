import React, { useState } from "react";
import {
  Brain,
  ArrowRight,
  GitBranch,
  MessageSquare,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  BarChart3,
  RefreshCw,
  Target,
} from "lucide-react";

const transitions = [
  {
    from: "Problem Requirements",
    to: "Architecture",
    score: 91,
    status: "Strong",
    explanation:
      "The architecture is introduced directly after explaining the requirements.",
    suggestion:
      "Given these requirements, I would structure the system around...",
  },
  {
    from: "Architecture",
    to: "Database",
    score: 84,
    status: "Strong",
    explanation:
      "The database discussion logically follows the architecture decision.",
    suggestion:
      "With the architecture established, the next consideration is data storage...",
  },
  {
    from: "Database",
    to: "Caching",
    score: 63,
    status: "Needs Improvement",
    explanation:
      "The answer moves to caching without clearly explaining why caching is required.",
    suggestion:
      "Because database reads may become a bottleneck at higher traffic, I would introduce caching...",
  },
  {
    from: "Caching",
    to: "Security",
    score: 48,
    status: "Abrupt",
    explanation:
      "The answer switches from performance to security without a connecting statement.",
    suggestion:
      "After addressing performance, we also need to consider how the system protects...",
  },
];

const contextFactors = [
  {
    name: "Topic Transition Logic",
    score: 78,
    description:
      "Most transitions follow a reasonable technical dependency.",
  },
  {
    name: "Transition Clarity",
    score: 69,
    description:
      "Several topic changes would benefit from explicit connecting statements.",
  },
  {
    name: "Technical Continuity",
    score: 84,
    description:
      "The major concepts remain related to the original problem.",
  },
  {
    name: "Abrupt Switch Detection",
    score: 61,
    description:
      "Some transitions occur without explaining why the next concept matters.",
  },
  {
    name: "Overall Context Flow",
    score: 74,
    description:
      "The explanation is understandable but can become smoother between sections.",
  },
];

const transitionQuestions = [
  "Why are you moving from this technical concept to the next one?",
  "How does the next concept depend on the previous decision?",
  "Have you explained why this new component is necessary?",
  "Can the interviewer understand the connection without guessing?",
  "Would one transition sentence make the explanation easier to follow?",
];

const recommendations = [
  {
    title: "Explain Why the Topic Changes",
    reason:
      "A transition is easier to follow when the candidate explains the reason for changing context.",
    action:
      "Add one sentence connecting the current concept to the next technical decision.",
  },
  {
    title: "Connect Performance to Architecture",
    reason:
      "Performance concerns should clearly motivate caching, scaling, or optimization decisions.",
    action:
      "Use cause-and-effect transitions such as 'Because X becomes a bottleneck, we introduce Y.'",
  },
  {
    title: "Use Explicit Context Markers",
    reason:
      "Markers help the interviewer understand the structure of a complex explanation.",
    action:
      "Use phrases such as 'Next, let's consider...', 'This leads to...', or 'From a reliability perspective...'.",
  },
];

const flow = [
  {
    title: "Detect Topics",
    description: "Identify technical concepts in the answer.",
  },
  {
    title: "Find Transitions",
    description: "Locate changes between concepts.",
  },
  {
    title: "Evaluate Links",
    description: "Check whether transitions are logically connected.",
  },
  {
    title: "Detect Gaps",
    description: "Find abrupt or unexplained switches.",
  },
  {
    title: "Coach",
    description: "Suggest clearer transition statements.",
  },
];

export default function AIInterviewAnswerTechnicalContextSwitchingAnalyzer() {
  const [selectedTransition, setSelectedTransition] = useState(
    transitions[2]
  );
  const [showTransitions, setShowTransitions] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const contextScore = 74;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Technical Context Switching Analyzer
          </h1>

          <p className="text-gray-500">
            Analyze how smoothly technical concepts connect throughout an
            interview answer.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {contextScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              CONTEXT FLOW SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Good With Some Transition Gaps
            </h2>

            <p className="text-gray-600 mt-2">
              The major concepts are relevant and connected, but a few
              transitions occur without explaining why the next concept is
              being introduced.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <GitBranch className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Transitions
            </p>

            <p className="text-3xl font-black text-indigo-600">
              4
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Strong Transitions
            </p>

            <p className="text-3xl font-black text-green-600">
              2
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Needs Improvement
            </p>

            <p className="text-3xl font-black text-orange-600">
              1
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <AlertTriangle className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Abrupt Switches
            </p>

            <p className="text-3xl font-black text-red-600">
              1
            </p>

          </div>

        </div>

      </div>

      {/* Topic Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <GitBranch className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Detected Technical Context Flow
            </h2>

            <p className="text-sm text-gray-500">
              The AI identifies the sequence of concepts discussed in the
              answer.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {[
            "Requirements",
            "Architecture",
            "Database",
            "Caching",
            "Security",
          ].map((topic, index, array) => (

            <React.Fragment key={topic}>

              <div className="px-4 py-3 rounded-xl bg-indigo-50 border border-indigo-100">

                <p className="text-sm font-bold text-indigo-700">
                  {topic}
                </p>

              </div>

              {index < array.length - 1 && (
                <ArrowRight
                  className="text-gray-400"
                  size={18}
                />
              )}

            </React.Fragment>

          ))}

        </div>

      </div>

      {/* Transition Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <MessageSquare className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Transition Analysis
              </h2>

              <p className="text-sm text-gray-500">
                Evaluate whether each technical context switch is properly
                explained.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowTransitions(!showTransitions)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showTransitions
              ? "Hide Transitions"
              : "Show Transitions"}
          </button>

        </div>

        {showTransitions && (
          <div className="space-y-4 mt-6">

            {transitions.map((transition) => (

              <button
                type="button"
                key={`${transition.from}-${transition.to}`}
                onClick={() =>
                  setSelectedTransition(transition)
                }
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedTransition.from === transition.from &&
                  selectedTransition.to === transition.to
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="flex-1">

                    <div className="flex items-center gap-2 flex-wrap">

                      <span className="font-bold">
                        {transition.from}
                      </span>

                      <ArrowRight
                        size={17}
                        className="text-gray-400"
                      />

                      <span className="font-bold">
                        {transition.to}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {transition.explanation}
                    </p>

                  </div>

                  <div className="text-right">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        transition.status === "Strong"
                          ? "bg-green-100 text-green-700"
                          : transition.status ===
                            "Needs Improvement"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {transition.status}
                    </span>

                    <p className="font-black text-indigo-600 mt-2">
                      {transition.score}%
                    </p>

                  </div>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className={`h-full rounded-full ${
                      transition.score >= 80
                        ? "bg-green-500"
                        : transition.score >= 60
                        ? "bg-orange-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${transition.score}%`,
                    }}
                  />

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Transition */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              SELECTED TRANSITION
            </p>

            <div className="flex items-center gap-2 flex-wrap mt-1">

              <h2 className="text-xl font-bold text-orange-800">
                {selectedTransition.from}
              </h2>

              <ArrowRight size={20} />

              <h2 className="text-xl font-bold text-orange-800">
                {selectedTransition.to}
              </h2>

            </div>

            <p className="text-gray-600 mt-2">
              {selectedTransition.explanation}
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                SUGGESTED TRANSITION
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                "{selectedTransition.suggestion}"
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Context Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Context Flow Factors
              </h2>

              <p className="text-sm text-gray-500">
                Signals used to calculate the context-flow score.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFactors(!showFactors)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFactors ? "Hide Factors" : "Show Factors"}
          </button>

        </div>

        {showFactors && (
          <div className="space-y-4 mt-6">

            {contextFactors.map((factor) => (

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
                AI Context-Switching Questions
              </h2>

              <p className="text-sm text-gray-500">
                Questions that help candidates build stronger logical
                transitions.
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

            {transitionQuestions.map((question, index) => (

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
                AI Transition Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve the flow between technical sections.
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

      {/* Analysis Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Context Analysis Flow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI evaluates technical context switching.
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

            {flow.map((step, index) => (

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

                {index < flow.length - 1 && (
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

      {/* Analyze Button */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Context Flow
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
                Technical context flow analyzed successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                Your overall context-flow score is{" "}
                <strong>{contextScore}/100</strong>. The main improvement
                opportunity is explaining why the answer moves from one
                technical concept to the next.
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
              AI COMMUNICATION PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Make every technical transition explainable.
            </h2>

            <p className="text-gray-600 mt-2">
              In complex interviews, do not assume the interviewer will infer
              why you changed topics. Briefly connect each concept to the
              previous decision so the explanation follows a clear chain of
              reasoning.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}