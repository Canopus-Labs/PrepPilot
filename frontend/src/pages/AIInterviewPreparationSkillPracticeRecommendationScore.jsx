import React, { useState } from "react";
import {
  Brain,
  Target,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Clock3,
} from "lucide-react";

const recommendations = [
  {
    title: "Practice System Design",
    skill: "System Design",
    score: 94,
    priority: "Critical",
    relevance: 96,
    weakness: 92,
    roleImportance: 98,
    improvement: 90,
    urgency: 95,
    reason:
      "System design is a high-priority target-role skill with a significant current weakness.",
    action:
      "Complete one system-design problem and explain the architecture aloud.",
  },
  {
    title: "Timed Graph Problems",
    skill: "Algorithms",
    score: 89,
    priority: "High",
    relevance: 93,
    weakness: 86,
    roleImportance: 91,
    improvement: 88,
    urgency: 87,
    reason:
      "Graph problem accuracy is reasonable, but solving speed remains below the target level.",
    action:
      "Complete 2–3 graph problems under a realistic interview time limit.",
  },
  {
    title: "Behavioral STAR Practice",
    skill: "Behavioral",
    score: 81,
    priority: "High",
    relevance: 82,
    weakness: 76,
    roleImportance: 84,
    improvement: 85,
    urgency: 78,
    reason:
      "Behavioral preparation is important but currently has a smaller gap than technical skills.",
    action:
      "Practice two behavioral questions using the STAR structure.",
  },
  {
    title: "SQL Query Practice",
    skill: "SQL",
    score: 74,
    priority: "Medium",
    relevance: 76,
    weakness: 69,
    roleImportance: 73,
    improvement: 79,
    urgency: 68,
    reason:
      "SQL is relevant to the target role but currently represents a lower-priority gap.",
    action:
      "Practice joins, aggregation, and window-function questions.",
  },
];

const scoringFactors = [
  {
    name: "Skill Relevance",
    score: 90,
    description:
      "How directly the activity addresses the skill being prepared.",
  },
  {
    name: "Current Weakness",
    score: 84,
    description:
      "How strongly the activity targets a demonstrated performance gap.",
  },
  {
    name: "Target-Role Importance",
    score: 89,
    description:
      "How important the skill is for the user's selected role.",
  },
  {
    name: "Expected Improvement",
    score: 86,
    description:
      "Estimated improvement that completing the activity could provide.",
  },
  {
    name: "Preparation Urgency",
    score: 82,
    description:
      "How quickly the activity should be completed based on the preparation timeline.",
  },
];

const coachingQuestions = [
  "Which recommendation addresses your biggest current weakness?",
  "Which activity has the highest target-role relevance?",
  "Which practice could produce the largest improvement in the available time?",
  "Which recommendation is most urgent before the interview?",
  "Are you choosing an activity because it is high-impact or simply because it is easy?",
  "Would completing the top recommendation address more than one weakness?",
];

const recommendationsAdvice = [
  {
    title: "Start With the Highest Score",
    reason:
      "The highest-ranked recommendation combines relevance, weakness, role importance, improvement potential, and urgency.",
    action:
      "Complete the top-ranked activity before moving to lower-impact recommendations.",
  },
  {
    title: "Review the Score Components",
    reason:
      "Two activities can have similar scores for completely different reasons.",
    action:
      "Check which factors are driving each recommendation's ranking.",
  },
  {
    title: "Recalculate After Practice",
    reason:
      "Recommendation priorities should change as your performance improves.",
    action:
      "Update recommendation scores after completing meaningful practice.",
  },
];

const workflow = [
  {
    title: "Analyze",
    description: "Review current preparation data.",
  },
  {
    title: "Score",
    description: "Evaluate each activity.",
  },
  {
    title: "Rank",
    description: "Order activities by expected impact.",
  },
  {
    title: "Explain",
    description: "Show why each activity matters.",
  },
  {
    title: "Adapt",
    description: "Recalculate after new performance.",
  },
];

export default function AIInterviewPreparationSkillPracticeRecommendationScore() {
  const [selectedRecommendation, setSelectedRecommendation] =
    useState(recommendations[0]);

  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showAdvice, setShowAdvice] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const overallScore = 91;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Practice Recommendation Score
          </h1>

          <p className="text-gray-500">
            Understand which preparation activity has the highest impact for
            your current interview needs.
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
              RECOMMENDATION QUALITY
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Highly Personalized Recommendations
            </h2>

            <p className="text-gray-600 mt-2">
              Recommendations are ranked using current weaknesses, target-role
              importance, expected improvement, relevance, and urgency.
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
              Activities Ranked
            </p>

            <p className="text-3xl font-black text-indigo-600">
              4
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <AlertTriangle className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Critical
            </p>

            <p className="text-3xl font-black text-red-600">
              1
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <TrendingUp className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Top Score
            </p>

            <p className="text-3xl font-black text-green-600">
              94
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <Clock3 className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Urgency
            </p>

            <p className="text-3xl font-black text-orange-600">
              High
            </p>
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
                Ranked Practice Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Higher scores indicate stronger alignment with current needs.
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

              <button
                type="button"
                key={item.title}
                onClick={() =>
                  setSelectedRecommendation(item)
                }
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedRecommendation.title === item.title
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
                          {item.title}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          {item.skill}
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

                    <div className="flex items-center gap-4 mt-4">

                      <div className="flex-1 h-3 bg-gray-200 rounded-full">

                        <div
                          className={`h-full rounded-full ${
                            item.score >= 90
                              ? "bg-green-500"
                              : item.score >= 80
                              ? "bg-indigo-500"
                              : "bg-orange-500"
                          }`}
                          style={{
                            width: `${item.score}%`,
                          }}
                        />

                      </div>

                      <span className="font-black text-indigo-700">
                        {item.score}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                      {item.reason}
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              TOP RECOMMENDATION
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedRecommendation.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedRecommendation.reason}
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                RECOMMENDED ACTION
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                {selectedRecommendation.action}
              </p>

            </div>

            <div className="grid md:grid-cols-5 gap-3 mt-5">

              {[
                ["Relevance", selectedRecommendation.relevance],
                ["Weakness", selectedRecommendation.weakness],
                ["Role", selectedRecommendation.roleImportance],
                ["Improvement", selectedRecommendation.improvement],
                ["Urgency", selectedRecommendation.urgency],
              ].map(([name, score]) => (

                <div
                  key={name}
                  className="bg-white rounded-xl p-4"
                >

                  <p className="text-xs text-gray-500">
                    {name}
                  </p>

                  <p className="text-2xl font-black text-indigo-600 mt-1">
                    {score}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

      {/* Scoring Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Recommendation Scoring Factors
              </h2>

              <p className="text-sm text-gray-500">
                Understand what influences each recommendation score.
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

            {scoringFactors.map((factor) => (

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
                AI Recommendation Reflection
              </h2>

              <p className="text-sm text-gray-500">
                Questions that help users understand why an activity is
                prioritized.
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

      {/* Advice */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                AI Recommendation Guidance
              </h2>

              <p className="text-sm text-gray-500">
                Use recommendation scores to make preparation decisions.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowAdvice(!showAdvice)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showAdvice ? "Hide Guidance" : "Show Guidance"}
          </button>

        </div>

        {showAdvice && (
          <div className="space-y-4 mt-6">

            {recommendationsAdvice.map((item, index) => (

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
                Recommendation Scoring Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI converts preparation data into ranked activities.
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

      {/* Analyze */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Calculate Recommendation Scores
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
                Practice recommendations ranked successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                The highest-impact activity is{" "}
                <strong>{recommendations[0].title}</strong> with a score of{" "}
                <strong>{recommendations[0].score}/100</strong>. Complete
                high-scoring activities first, then recalculate after new
                performance data becomes available.
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
              AI PREPARATION PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              The best recommendation is the one with the highest current impact.
            </h2>

            <p className="text-gray-600 mt-2">
              Recommendation scores should combine relevance, weakness,
              target-role importance, expected improvement, and urgency so
              candidates can focus their limited preparation time on the most
              valuable activity.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}