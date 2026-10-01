import React, { useState } from "react";
import {
  Brain,
  Target,
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Clock,
  TrendingUp,
  Award,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

const objectives = [
  {
    name: "Understand Binary Search Invariants",
    category: "Algorithms",
    practice: 8,
    assessment: 86,
    mastery: 82,
    status: "Mastered",
    evidence: "Strong performance across recent assessments.",
  },
  {
    name: "Analyze Time Complexity",
    category: "Problem Solving",
    practice: 6,
    assessment: 68,
    mastery: 61,
    status: "In Progress",
    evidence: "Correctly identifies basic complexity but misses nested operations.",
  },
  {
    name: "Explain Technical Trade-offs",
    category: "Communication",
    practice: 5,
    assessment: 54,
    mastery: 48,
    status: "Needs Practice",
    evidence: "Trade-offs are mentioned but supporting reasoning is incomplete.",
  },
  {
    name: "Handle Algorithm Edge Cases",
    category: "Algorithms",
    practice: 9,
    assessment: 91,
    mastery: 89,
    status: "Mastered",
    evidence: "Consistently identifies boundary and invalid-input cases.",
  },
];

const learningFlow = [
  {
    title: "Objective",
    description: "Define what the candidate should learn.",
  },
  {
    title: "Practice",
    description: "Complete activities designed to develop the objective.",
  },
  {
    title: "Assessment",
    description: "Test whether the concept was actually understood.",
  },
  {
    title: "Evidence",
    description: "Check later performance for lasting mastery.",
  },
];

const recommendations = [
  {
    title: "Revisit Time Complexity",
    reason:
      "Assessment performance is below the mastery threshold despite completed practice.",
    action:
      "Complete targeted nested-loop complexity questions and reattempt the assessment.",
  },
  {
    title: "Practice Technical Trade-offs",
    reason:
      "The objective has low mastery evidence and repeated communication gaps.",
    action:
      "Practice comparing two approaches and explicitly justify the trade-off.",
  },
  {
    title: "Maintain Edge-Case Practice",
    reason:
      "This objective is mastered but should be periodically reviewed to retain the skill.",
    action:
      "Complete a short mixed edge-case challenge during future revision.",
  },
];

export default function AIInterviewPreparationLearningObjectiveTracker() {
  const [selectedObjective, setSelectedObjective] = useState(
    objectives[0]
  );
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [tracked, setTracked] = useState(false);

  const mastered = objectives.filter(
    (item) => item.status === "Mastered"
  ).length;

  const needsWork = objectives.filter(
    (item) =>
      item.status === "Needs Practice" ||
      item.status === "In Progress"
  ).length;

  const averageMastery = Math.round(
    objectives.reduce(
      (sum, item) => sum + item.mastery,
      0
    ) / objectives.length
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
            AI Learning Objective Tracker
          </h1>

          <p className="text-gray-500">
            Track whether preparation activities actually lead to measurable
            learning and mastery.
          </p>

        </div>

      </div>

      {/* Main Status */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {averageMastery}%
              </p>

              <p className="text-xs text-gray-500">
                Mastery
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              LEARNING OBJECTIVE PROGRESS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {mastered} of {objectives.length} objectives mastered
            </h2>

            <p className="text-gray-600 mt-2">
              Activity completion is separated from actual learning evidence.
              The AI checks assessments and later performance before marking an
              objective as mastered.
            </p>

          </div>

        </div>

      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Target
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Objectives
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {objectives.length}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Mastered
            </p>

            <p className="text-3xl font-black text-green-600">
              {mastered}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Needs Work
            </p>

            <p className="text-3xl font-black text-orange-600">
              {needsWork}
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Award
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Avg. Mastery
            </p>

            <p className="text-3xl font-black text-purple-600">
              {averageMastery}%
            </p>

          </div>

        </div>

      </div>

      {/* Objective List */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Learning Objectives
            </h2>

            <p className="text-sm text-gray-500">
              Select an objective to inspect its practice, assessment, and
              mastery evidence.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {objectives.map((objective) => (

            <button
              type="button"
              key={objective.name}
              onClick={() => setSelectedObjective(objective)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedObjective.name === objective.name
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                {objective.status === "Mastered" ? (
                  <CheckCircle2
                    className="text-green-600"
                    size={25}
                  />
                ) : (
                  <AlertTriangle
                    className="text-orange-600"
                    size={25}
                  />
                )}

                <div className="flex-1">

                  <div className="flex justify-between gap-4">

                    <div>

                      <h3 className="font-bold">
                        {objective.name}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {objective.category}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                        objective.status === "Mastered"
                          ? "bg-green-100 text-green-700"
                          : objective.status === "In Progress"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {objective.status}
                    </span>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full mt-4">

                    <div
                      className={`h-full rounded-full ${
                        objective.status === "Mastered"
                          ? "bg-green-500"
                          : "bg-orange-500"
                      }`}
                      style={{
                        width: `${objective.mastery}%`,
                      }}
                    />

                  </div>

                  <div className="flex justify-between text-xs text-gray-500 mt-2">

                    <span>
                      Practice: {objective.practice} sessions
                    </span>

                    <span>
                      Mastery: {objective.mastery}%
                    </span>

                  </div>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Objective */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              OBJECTIVE ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedObjective.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedObjective.evidence}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <BookOpen
                  className="text-indigo-600"
                  size={22}
                />

                <p className="text-xs text-gray-500 mt-3">
                  PRACTICE
                </p>

                <p className="text-2xl font-black">
                  {selectedObjective.practice}
                </p>

                <p className="text-xs text-gray-500">
                  sessions completed
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <TrendingUp
                  className="text-blue-600"
                  size={22}
                />

                <p className="text-xs text-gray-500 mt-3">
                  ASSESSMENT
                </p>

                <p className="text-2xl font-black">
                  {selectedObjective.assessment}%
                </p>

                <p className="text-xs text-gray-500">
                  latest performance
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <Award
                  className="text-green-600"
                  size={22}
                />

                <p className="text-xs text-gray-500 mt-3">
                  MASTERY
                </p>

                <p className="text-2xl font-black text-green-600">
                  {selectedObjective.mastery}%
                </p>

                <p className="text-xs text-gray-500">
                  current evidence
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Objective Evidence */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <TrendingUp className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Objective Evidence
            </h2>

            <p className="text-sm text-gray-500">
              Completion alone does not mark an objective as mastered.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          {[
            {
              title: "Objective",
              value: "Defined",
              icon: Target,
              color: "text-indigo-600",
            },
            {
              title: "Practice",
              value: `${selectedObjective.practice} sessions`,
              icon: BookOpen,
              color: "text-blue-600",
            },
            {
              title: "Assessment",
              value: `${selectedObjective.assessment}%`,
              icon: TrendingUp,
              color: "text-orange-600",
            },
            {
              title: "Mastery Evidence",
              value: `${selectedObjective.mastery}%`,
              icon: Award,
              color: "text-green-600",
            },
          ].map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="border rounded-xl p-5"
              >

                <Icon
                  className={item.color}
                  size={23}
                />

                <p className="text-xs text-gray-500 mt-3">
                  {item.title}
                </p>

                <p className="font-bold mt-1">
                  {item.value}
                </p>

              </div>
            );
          })}

        </div>

      </div>

      {/* Learning Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Learning Evidence Flow
              </h2>

              <p className="text-sm text-gray-500">
                Track the complete path from activity completion to mastery.
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

            {learningFlow.map((step, index) => (

              <React.Fragment key={step.title}>

                <div className="border rounded-xl p-4 min-w-[170px]">

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

                {index < learningFlow.length - 1 && (
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

      {/* Incomplete Objectives */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              INCOMPLETE LEARNING OBJECTIVES
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Practice completion is not mastery.
            </h2>

            <div className="space-y-3 mt-4">

              {objectives
                .filter((item) => item.status !== "Mastered")
                .map((objective) => (

                  <div
                    key={objective.name}
                    className="bg-white rounded-xl p-4"
                  >

                    <div className="flex items-center gap-4">

                      <Clock
                        className="text-orange-600"
                        size={22}
                      />

                      <div className="flex-1">

                        <p className="font-semibold">
                          {objective.name}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          Assessment: {objective.assessment}% · Mastery:
                          {" "}
                          {objective.mastery}%
                        </p>

                      </div>

                      <span className="text-orange-600 font-bold">
                        {objective.status}
                      </span>

                    </div>

                  </div>
                ))}

            </div>

          </div>

        </div>

      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Learning Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Recommended actions based on incomplete learning evidence.
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

            {recommendations.map((recommendation, index) => (

              <div
                key={recommendation.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {recommendation.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {recommendation.reason}
                    </p>

                    <p className="text-sm font-semibold text-indigo-700 mt-2">
                      Action: {recommendation.action}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Tracking Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              AI Objective Tracking Flow
            </h2>

            <p className="text-sm text-gray-500">
              Convert preparation activities into measurable learning
              evidence.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {[
            "Define Objective",
            "Complete Practice",
            "Measure Assessment",
            "Collect Evidence",
            "Evaluate Mastery",
            "Recommend Next Action",
          ].map((step, index, array) => (

            <React.Fragment key={step}>

              <span
                className={`px-4 py-2 rounded-xl font-semibold text-sm ${
                  index === array.length - 1
                    ? "bg-green-100 text-green-700"
                    : "bg-indigo-50 text-indigo-700"
                }`}
              >
                {step}
              </span>

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

      {/* Analyze Button */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setTracked(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Evaluate Learning Objectives
          <ArrowRight size={18} />
        </button>

      </div>

      {tracked && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                TRACKING COMPLETE
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Learning objective evaluation completed.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can connect activity history,
                assessment results, and later performance to determine whether
                each learning objective has actually been achieved.
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
              AI LEARNING PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Completing practice is not the same as learning.
            </h2>

            <p className="text-gray-600 mt-2">
              The system should measure whether the intended objective is
              demonstrated through assessments and subsequent performance,
              allowing preparation progress to reflect actual skill development
              rather than activity volume alone.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}