import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  ArrowRight,
  Lightbulb,
  GitCompare,
  ShieldCheck,
} from "lucide-react";

const decisionData = {
  decision: "Use an in-memory cache for frequently accessed data",
  originalRequirement:
    "The system needs low-latency reads for a moderate amount of frequently accessed data.",
  changedRequirement:
    "The dataset has grown significantly and must now support multiple application instances.",
  originalChoice: "Single-instance in-memory cache",
  revisedChoice: "Distributed cache",
  originalScore: 88,
  revisedScore: 94,
};

const evaluationFactors = [
  {
    name: "Constraint Awareness",
    score: 92,
    description:
      "Recognizes how the new requirement affects the original decision.",
  },
  {
    name: "Trade-Off Reasoning",
    score: 87,
    description:
      "Explains the advantages and disadvantages of changing the decision.",
  },
  {
    name: "Decision Adaptability",
    score: 90,
    description:
      "Determines whether the original choice should remain valid.",
  },
  {
    name: "Technical Justification",
    score: 84,
    description:
      "Provides technical evidence for the revised decision.",
  },
  {
    name: "Communication",
    score: 89,
    description:
      "Clearly explains why the decision changed or remained unchanged.",
  },
];

const coachingQuestions = [
  "Does the new constraint invalidate your original decision?",
  "Which part of your original reasoning is still valid?",
  "What new technical requirement changes the trade-off?",
  "Would another architecture now be preferable?",
  "What new disadvantages does the revised approach introduce?",
  "Can you explain the decision change in two or three sentences?",
  "What evidence supports your revised decision?",
];

const recommendations = [
  {
    title: "Separate Stable and Changed Reasoning",
    reason:
      "Not every part of the original solution becomes invalid when one requirement changes.",
    action:
      "Identify which assumptions remain valid and which must be reconsidered.",
  },
  {
    title: "Explain the New Trade-Off",
    reason:
      "A decision reversal should be justified by the changed constraint.",
    action:
      "Connect the new requirement directly to the reason for selecting the alternative.",
  },
  {
    title: "Practice Conditional Decisions",
    reason:
      "Strong engineers understand when an approach is appropriate rather than treating it as universally correct.",
    action:
      "Practice explaining: 'I would choose A under these conditions, but B if this constraint changes.'",
  },
];

const workflow = [
  {
    title: "Identify",
    description: "Select a major technical decision.",
  },
  {
    title: "Change",
    description: "Introduce a new constraint.",
  },
  {
    title: "Reconsider",
    description: "Evaluate the original choice.",
  },
  {
    title: "Justify",
    description: "Explain the revised decision.",
  },
  {
    title: "Compare",
    description: "Analyze both decisions.",
  },
];

export default function AIInterviewAnswerTechnicalDecisionReversalTest() {
  const [decision, setDecision] = useState(decisionData);

  const [showChallenge, setShowChallenge] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [tested, setTested] = useState(false);

  const overallScore = 90;

  const runNewChallenge = () => {
    setDecision({
      decision: "Use synchronous database writes for strong consistency",
      originalRequirement:
        "The application requires immediate consistency for a moderate request volume.",
      changedRequirement:
        "The system must now handle very high traffic while tolerating temporary delays in non-critical updates.",
      originalChoice: "Synchronous writes",
      revisedChoice: "Asynchronous processing with a message queue",
      originalScore: 85,
      revisedScore: 93,
    });

    setTested(false);
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
            AI Technical Decision Reversal Test
          </h1>

          <p className="text-gray-500">
            Reconsider technical decisions when interview constraints change.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {overallScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              DECISION ADAPTABILITY SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Strong Adaptive Reasoning
            </h2>

            <p className="text-gray-600 mt-2">
              The candidate can reconsider an initial decision when the
              underlying constraints change.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <Target className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Decisions Tested
            </p>

            <p className="text-3xl font-black text-indigo-600">
              1
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Constraint Changed
            </p>

            <p className="text-3xl font-black text-orange-600">
              Yes
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Revised Decision
            </p>

            <p className="text-3xl font-black text-green-600">
              Valid
            </p>
          </div>

          <div className="bg-indigo-50 rounded-xl p-5">
            <GitCompare
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Decision Improvement
            </p>

            <p className="text-3xl font-black text-indigo-600">
              +6
            </p>
          </div>

        </div>

      </div>

      {/* Challenge */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Technical Decision Challenge
              </h2>

              <p className="text-sm text-gray-500">
                Reconsider the selected decision after the requirement changes.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowChallenge(!showChallenge)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showChallenge ? "Hide Challenge" : "Show Challenge"}
          </button>

        </div>

        {showChallenge && (
          <div className="space-y-5 mt-6">

            {/* Original */}
            <div className="border rounded-2xl p-5">

              <p className="text-xs font-bold text-indigo-600">
                ORIGINAL DECISION
              </p>

              <h3 className="font-bold text-lg mt-2">
                {decision.decision}
              </h3>

              <p className="text-sm text-gray-500 mt-3">
                {decision.originalRequirement}
              </p>

            </div>

            {/* Changed Requirement */}
            <div className="bg-orange-50 rounded-2xl p-5">

              <div className="flex gap-3">

                <AlertTriangle
                  className="text-orange-600"
                  size={24}
                />

                <div>

                  <p className="text-xs font-bold text-orange-600">
                    NEW INTERVIEW CONSTRAINT
                  </p>

                  <p className="font-semibold text-orange-800 mt-2">
                    {decision.changedRequirement}
                  </p>

                </div>

              </div>

            </div>

            {/* Decision Comparison */}
            <div className="grid md:grid-cols-2 gap-5">

              <div className="border rounded-2xl p-5">

                <p className="text-xs font-bold text-gray-500">
                  ORIGINAL APPROACH
                </p>

                <h3 className="font-bold mt-2">
                  {decision.originalChoice}
                </h3>

                <p className="text-3xl font-black text-gray-700 mt-4">
                  {decision.originalScore}
                </p>

                <p className="text-xs text-gray-500">
                  suitability score
                </p>

              </div>

              <div className="border-2 border-green-400 bg-green-50 rounded-2xl p-5">

                <p className="text-xs font-bold text-green-600">
                  REVISED APPROACH
                </p>

                <h3 className="font-bold mt-2">
                  {decision.revisedChoice}
                </h3>

                <p className="text-3xl font-black text-green-600 mt-4">
                  {decision.revisedScore}
                </p>

                <p className="text-xs text-gray-500">
                  suitability score
                </p>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* Candidate Task */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <p className="text-xs font-bold text-indigo-600">
          YOUR INTERVIEW TASK
        </p>

        <h2 className="text-xl font-bold text-indigo-800 mt-1">
          Should your original decision remain unchanged?
        </h2>

        <p className="text-gray-600 mt-2">
          Explain whether the new constraint changes your technical decision.
          If it does, justify the revised approach and identify which parts of
          your original reasoning remain valid.
        </p>

        <div className="bg-white rounded-xl p-5 mt-5">

          <p className="text-sm text-gray-500">
            Suggested response structure
          </p>

          <div className="flex flex-wrap gap-2 mt-3">

            {[
              "Original assumption",
              "Changed constraint",
              "Impact",
              "Revised decision",
              "Trade-off",
            ].map((item) => (

              <span
                key={item}
                className="px-3 py-2 rounded-lg bg-indigo-100 text-indigo-700 text-sm font-semibold"
              >
                {item}
              </span>

            ))}

          </div>

        </div>

      </div>

      {/* Evaluation Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Decision Reversal Evaluation
              </h2>

              <p className="text-sm text-gray-500">
                Evaluate how well the candidate adapts to changed requirements.
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

            {evaluationFactors.map((factor) => (

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
                AI Decision Reversal Questions
              </h2>

              <p className="text-sm text-gray-500">
                Practice thinking through changing technical requirements.
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
                AI Adaptability Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve technical judgment when requirements change.
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
                Decision Reversal Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI tests whether a technical decision survives changed
                requirements.
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

      {/* Actions */}
      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={runNewChallenge}
          className="px-5 py-3 rounded-xl border border-indigo-200 text-indigo-700 font-semibold flex items-center gap-2"
        >
          <RefreshCw size={18} />
          New Challenge
        </button>

        <button
          type="button"
          onClick={() => setTested(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Evaluate Decision
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Result */}
      {tested && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                TEST COMPLETE
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Decision adaptation evaluated successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                The revised decision scores{" "}
                <strong>{decision.revisedScore}/100</strong> under the changed
                requirement. The key improvement is connecting the new
                constraint directly to the revised technical choice.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Final Guidance */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <ShieldCheck
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI ENGINEERING PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              A good technical decision is conditional, not absolute.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong candidates understand why a decision works, which
              assumptions support it, and when a changed requirement makes
              another approach preferable.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}