import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  ShieldCheck,
  Eye,
} from "lucide-react";

const confidenceLevels = [
  { value: 40, label: "Low Confidence" },
  { value: 60, label: "Moderate Confidence" },
  { value: 80, label: "High Confidence" },
  { value: 95, label: "Very High Confidence" },
];

const assessment = [
  {
    question: "Q1",
    difficulty: "Medium",
    result: "Correct",
    score: 100,
  },
  {
    question: "Q2",
    difficulty: "Medium",
    result: "Incorrect",
    score: 0,
  },
  {
    question: "Q3",
    difficulty: "Hard",
    result: "Incorrect",
    score: 0,
  },
  {
    question: "Q4",
    difficulty: "Medium",
    result: "Correct",
    score: 100,
  },
  {
    question: "Q5",
    difficulty: "Hard",
    result: "Incorrect",
    score: 0,
  },
];

const recommendations = [
  {
    title: "Retest With Unseen Questions",
    priority: "High",
    description:
      "Use new problems rather than repeating the examples used during revision.",
  },
  {
    title: "Review Weak Concepts",
    priority: "High",
    description:
      "Revisit the concepts behind the incorrect medium and hard questions.",
  },
  {
    title: "Delay Mastery Completion",
    priority: "Critical",
    description:
      "Do not mark this topic mastered until confidence is supported by repeated performance.",
  },
];

const workflow = [
  {
    title: "Rate",
    description: "Record the user's confidence after revision.",
  },
  {
    title: "Assess",
    description: "Present unseen questions.",
  },
  {
    title: "Compare",
    description: "Compare confidence with actual performance.",
  },
  {
    title: "Detect",
    description: "Identify confidence-performance gaps.",
  },
  {
    title: "Validate",
    description: "Recommend the next preparation action.",
  },
];

export default function AIInterviewPreparationRevisionConfidenceValidator() {
  const [confidence, setConfidence] = useState(80);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const actualPerformance = 40;
  const confidenceGap = confidence - actualPerformance;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Revision Confidence Validator
          </h1>

          <p className="text-gray-500">
            Verify whether confidence after revision is supported by actual
            performance.
          </p>

        </div>

      </div>

      {/* Main Result */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">

            <AlertTriangle
              className="text-orange-600"
              size={32}
            />

          </div>

          <div>

            <p className="text-xs font-bold text-orange-600">
              CONFIDENCE VALIDATION
            </p>

            <h2 className="text-2xl font-black text-orange-800 mt-1">
              Overconfidence Detected
            </h2>

            <p className="text-gray-600 mt-2">
              Your reported confidence is significantly higher than your
              performance on unseen questions.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <ShieldCheck
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Confidence
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {confidence}%
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <Target
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Actual Performance
            </p>

            <p className="text-3xl font-black text-green-600">
              {actualPerformance}%
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <TrendingUp
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Confidence Gap
            </p>

            <p className="text-3xl font-black text-red-600">
              +{confidenceGap}%
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Eye
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Unseen Questions
            </p>

            <p className="text-3xl font-black text-purple-600">
              5
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Validation
            </p>

            <p className="text-xl font-black text-orange-600">
              Not Passed
            </p>

          </div>

        </div>

      </div>

      {/* Confidence Rating */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <ShieldCheck className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Your Confidence Rating
            </h2>

            <p className="text-sm text-gray-500">
              Rate how confident you feel immediately after revision.
            </p>

          </div>

        </div>

        <div className="mt-6">

          <div className="flex justify-between">

            <span className="text-sm text-gray-500">
              Confidence
            </span>

            <span className="font-black text-indigo-600">
              {confidence}%
            </span>

          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={confidence}
            onChange={(e) =>
              setConfidence(Number(e.target.value))
            }
            className="w-full mt-4"
          />

          <div className="flex justify-between text-xs text-gray-400 mt-2">
            <span>Not Confident</span>
            <span>Moderate</span>
            <span>Very Confident</span>
          </div>

        </div>

        <div className="bg-indigo-50 rounded-xl p-5 mt-6">

          <p className="text-xs font-bold text-indigo-600">
            SELF-REPORTED CONFIDENCE
          </p>

          <p className="text-xl font-black text-indigo-800 mt-1">
            {confidenceLevels
              .slice()
              .reverse()
              .find((item) => confidence >= item.value)?.label ||
              "Low Confidence"}
          </p>

        </div>

      </div>

      {/* Unseen Assessment */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Unseen Assessment
              </h2>

              <p className="text-sm text-gray-500">
                Test actual understanding using questions not included in the
                revision session.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowAssessment(!showAssessment)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showAssessment
              ? "Hide Assessment"
              : "Show Assessment"}
          </button>

        </div>

        {showAssessment && (
          <div className="space-y-4 mt-6">

            {assessment.map((item) => (

              <div
                key={item.question}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <p className="font-bold">
                      {item.question}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Difficulty: {item.difficulty}
                    </p>

                  </div>

                  <div className="text-right">

                    {item.result === "Correct" ? (
                      <CheckCircle2
                        className="text-green-600"
                        size={24}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-red-600"
                        size={24}
                      />
                    )}

                    <p
                      className={`text-xs font-bold mt-1 ${
                        item.result === "Correct"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {item.result}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Confidence vs Performance */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <TrendingDown
            className="text-indigo-600 shrink-0"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              CONFIDENCE VS PERFORMANCE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Your confidence is ahead of your demonstrated mastery.
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  Self-Reported Confidence
                </p>

                <p className="text-4xl font-black text-indigo-600 mt-2">
                  {confidence}%
                </p>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full rounded-full bg-indigo-500"
                    style={{
                      width: `${confidence}%`,
                    }}
                  />

                </div>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  Demonstrated Performance
                </p>

                <p className="text-4xl font-black text-red-600 mt-2">
                  {actualPerformance}%
                </p>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full rounded-full bg-red-500"
                    style={{
                      width: `${actualPerformance}%`,
                    }}
                  />

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Validation Result */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-red-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-red-600">
              AI VALIDATION RESULT
            </p>

            <h2 className="text-xl font-bold text-red-800 mt-1">
              Topic mastery cannot be confirmed yet.
            </h2>

            <p className="text-gray-600 mt-2">
              High confidence alone is not enough evidence of mastery. Your
              performance on unseen questions indicates that additional
              practice and delayed validation are needed.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                RECOMMENDED CONFIDENCE RANGE
              </p>

              <p className="font-semibold text-red-700 mt-2">
                Your demonstrated performance currently supports approximately
                moderate confidence rather than very high confidence.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Evidence-based next steps for validating mastery.
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

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <h3 className="font-bold">
                        {item.title}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.priority === "Critical"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.priority}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {item.description}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Mastery Rule */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI MASTERY PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Confidence should be supported by evidence.
            </h2>

            <p className="text-gray-600 mt-2">
              A topic should be considered mastered only when strong confidence
              is consistently supported by performance on unseen and delayed
              assessments.
            </p>

          </div>

        </div>

      </div>

      {/* Revalidate */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Revalidate Confidence
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Run another unseen assessment after additional revision.
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
                New confidence validation assessment generated.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Confidence Validation Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI validates confidence against actual performance.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowWorkflow(!showWorkflow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWorkflow
              ? "Hide Workflow"
              : "Show Workflow"}
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
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI PREPARATION PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Feeling prepared is different from being prepared.
            </h2>

            <p className="text-gray-600 mt-2">
              The goal is not to reduce confidence. It is to make confidence
              more accurate by validating it against objective performance on
              unfamiliar problems.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}