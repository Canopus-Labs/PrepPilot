import React, { useState } from "react";
import {
  Brain,
  TrendingUp,
  Target,
  CheckCircle2,
  Clock3,
  Lightbulb,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const performanceStages = [
  {
    title: "Before Revision",
    score: 61,
    description: "Performance before reviewing the topic.",
  },
  {
    title: "Revision Activity",
    score: null,
    description: "Focused revision of weak concepts and mistakes.",
  },
  {
    title: "Immediate Test",
    score: 84,
    description: "Performance immediately after revision.",
  },
  {
    title: "Delayed Test",
    score: 79,
    description: "Performance after a retention delay.",
  },
];

const revisionMethods = [
  {
    title: "Concept Review",
    effectiveness: 86,
    description:
      "Reviewing the underlying concept before attempting more questions.",
  },
  {
    title: "Mistake Analysis",
    effectiveness: 92,
    description:
      "Reviewing previous errors and understanding why they occurred.",
  },
  {
    title: "Active Practice",
    effectiveness: 88,
    description:
      "Solving related problems immediately after revision.",
  },
];

const recommendations = [
  {
    title: "Continue Mistake Analysis",
    reason:
      "This revision method produced the strongest improvement in subsequent performance.",
    action:
      "Review incorrect answers and explain the underlying cause before retrying.",
  },
  {
    title: "Add Delayed Practice",
    reason:
      "Immediate improvement does not always indicate long-term retention.",
    action:
      "Revisit the same concept after a delay to verify that the improvement persists.",
  },
  {
    title: "Focus on Weak Concepts",
    reason:
      "Targeted revision produced more improvement than reviewing already-mastered material.",
    action:
      "Prioritize concepts connected to recent mistakes.",
  },
];

const coachingQuestions = [
  "What specific weakness was this revision session intended to address?",
  "Can you explain the concept without looking at your notes?",
  "Did your immediate performance improve after revision?",
  "Can you still solve a related problem after a delay?",
  "Which revision method helped you improve the most?",
];

const workflow = [
  {
    title: "Baseline",
    description: "Measure performance before revision.",
  },
  {
    title: "Revise",
    description: "Record the revision activity.",
  },
  {
    title: "Retest",
    description: "Measure immediate improvement.",
  },
  {
    title: "Delay",
    description: "Measure retained performance.",
  },
  {
    title: "Score",
    description: "Calculate revision effectiveness.",
  },
];

export default function AIInterviewPreparationRevisionEffectivenessScore() {
  const [showStages, setShowStages] = useState(false);
  const [showMethods, setShowMethods] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [rechecked, setRechecked] = useState(false);

  const baseline = 61;
  const immediate = 84;
  const delayed = 79;

  const immediateImprovement = immediate - baseline;
  const retainedImprovement = delayed - baseline;

  const effectiveness = Math.round(
    (retainedImprovement / (100 - baseline)) * 100
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
            AI Revision Effectiveness Score
          </h1>

          <p className="text-gray-500">
            Measure whether revision actually improves subsequent interview
            performance and long-term retention.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-green-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-green-700">
                {effectiveness}%
              </p>

              <p className="text-xs text-gray-500">
                Effectiveness
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-green-600">
              REVISION EFFECTIVENESS SCORE
            </p>

            <h2 className="text-2xl font-black text-green-800 mt-1">
              Highly Effective Revision
            </h2>

            <p className="text-gray-600 mt-2">
              Performance improved significantly after revision and most of the
              improvement remained after a delay.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-orange-50 rounded-xl p-5">

            <Target className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Before Revision
            </p>

            <p className="text-3xl font-black text-orange-600">
              {baseline}%
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <TrendingUp className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Immediate Result
            </p>

            <p className="text-3xl font-black text-green-600">
              {immediate}%
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-5">

            <Clock3 className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Delayed Result
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {delayed}%
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <CheckCircle2 className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Improvement
            </p>

            <p className="text-3xl font-black text-purple-600">
              +{retainedImprovement}%
            </p>

          </div>

        </div>

      </div>

      {/* Performance Comparison */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="font-bold text-lg">
              Revision Performance Timeline
            </h2>

            <p className="text-sm text-gray-500">
              Compare performance before revision, immediately afterward, and
              after a delay.
            </p>

          </div>

          <button
            type="button"
            onClick={() => setShowStages(!showStages)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showStages ? "Hide Timeline" : "Show Timeline"}
          </button>

        </div>

        {showStages && (
          <div className="grid md:grid-cols-4 gap-4 mt-6">

            {performanceStages.map((stage) => (

              <div
                key={stage.title}
                className="border rounded-2xl p-5"
              >

                <p className="text-xs font-bold text-indigo-600">
                  {stage.title.toUpperCase()}
                </p>

                {stage.score !== null ? (
                  <p className="text-3xl font-black text-indigo-700 mt-3">
                    {stage.score}%
                  </p>
                ) : (
                  <p className="text-lg font-bold text-gray-500 mt-4">
                    Active
                  </p>
                )}

                <p className="text-sm text-gray-500 mt-3">
                  {stage.description}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Improvement Visualization */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <TrendingUp
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              PERFORMANCE IMPACT
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Revision produced a +{immediateImprovement}% immediate improvement
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  BASELINE
                </p>

                <p className="text-3xl font-black text-orange-600 mt-1">
                  {baseline}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  IMMEDIATE
                </p>

                <p className="text-3xl font-black text-green-600 mt-1">
                  {immediate}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  DELAYED
                </p>

                <p className="text-3xl font-black text-indigo-600 mt-1">
                  {delayed}%
                </p>

              </div>

            </div>

            <div className="mt-6">

              <div className="flex justify-between text-xs text-gray-500 mb-2">

                <span>
                  Retained improvement
                </span>

                <span>
                  {retainedImprovement}%
                </span>

              </div>

              <div className="h-4 bg-white rounded-full">

                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{
                    width: `${effectiveness}%`,
                  }}
                />

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Revision Methods */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Revision Method Effectiveness
              </h2>

              <p className="text-sm text-gray-500">
                Compare which revision techniques produce the strongest
                improvement.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowMethods(!showMethods)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showMethods ? "Hide Methods" : "Show Methods"}
          </button>

        </div>

        {showMethods && (
          <div className="space-y-4 mt-6">

            {revisionMethods.map((method) => (

              <div
                key={method.title}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <h3 className="font-bold">
                      {method.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {method.description}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-2xl font-black text-indigo-600">
                      {method.effectiveness}%
                    </p>

                    <p className="text-xs text-gray-500">
                      Effectiveness
                    </p>

                  </div>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${method.effectiveness}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* AI Diagnosis */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI REVISION ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Revision produced meaningful retained improvement
            </h2>

            <p className="text-gray-600 mt-2">
              Performance increased from {baseline}% to {immediate}% immediately
              after revision and remained at {delayed}% during delayed testing.
              This indicates that the session improved more than short-term
              familiarity.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                KEY FINDING
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                Mistake analysis was the most effective revision method in this
                session.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Use revision methods that produce measurable improvement.
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

      {/* Coaching */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Revision Coach
              </h2>

              <p className="text-sm text-gray-500">
                Questions that help determine whether revision produced real
                learning.
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

      {/* Recheck */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              DELAYED RECHECK
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Verify whether improvement is retained
            </h2>

            <p className="text-gray-600 mt-2">
              A delayed test helps distinguish genuine learning from short-term
              familiarity immediately after revision.
            </p>

            <button
              type="button"
              onClick={() => setRechecked(true)}
              className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Run Delayed Recheck
              <ArrowRight size={18} />
            </button>

            {rechecked && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Delayed performance recorded at {delayed}%. Most of the
                revision improvement has been retained.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Revision Effectiveness Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI determines whether revision produced meaningful
                learning.
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

      {/* Final Guidance */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI PREPARATION PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Revision is valuable when performance improves afterward.
            </h2>

            <p className="text-gray-600 mt-2">
              Completing a revision session does not automatically mean that
              learning occurred. Comparing performance before revision,
              immediately afterward, and after a delay provides a stronger
              measure of actual learning impact.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}