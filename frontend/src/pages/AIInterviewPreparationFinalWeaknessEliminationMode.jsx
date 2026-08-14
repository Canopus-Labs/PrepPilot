import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  RefreshCw,
  ArrowRight,
  Lightbulb,
  Clock3,
  ShieldCheck,
} from "lucide-react";

const weaknesses = [
  {
    name: "Dynamic Programming",
    impact: "Critical",
    score: 54,
    target: 80,
    improvement: "+14%",
    evidence: 3,
    remaining: "State definition and recurrence reasoning",
  },
  {
    name: "System Design Scalability",
    impact: "High",
    score: 67,
    target: 82,
    improvement: "+9%",
    evidence: 5,
    remaining: "Identifying bottlenecks and scaling decisions",
  },
  {
    name: "Behavioral STAR Responses",
    impact: "Medium",
    score: 74,
    target: 85,
    improvement: "+7%",
    evidence: 6,
    remaining: "Adding measurable results",
  },
];

const practiceQuestions = [
  "Design a solution for a constrained optimization problem.",
  "Explain how you would define the DP state and transition.",
  "Modify the solution when the input constraints increase.",
  "Explain the time and space complexity of your approach.",
];

const masteryCriteria = [
  "Correctly solve multiple new questions.",
  "Explain the reasoning without relying on hints.",
  "Handle changed constraints.",
  "Explain complexity accurately.",
  "Maintain performance across repeated attempts.",
];

const workflow = [
  {
    title: "Identify",
    description: "Find the highest-impact remaining weakness.",
  },
  {
    title: "Practice",
    description: "Generate focused questions for that weakness.",
  },
  {
    title: "Retest",
    description: "Use new questions to prevent memorization.",
  },
  {
    title: "Measure",
    description: "Compare performance against previous attempts.",
  },
  {
    title: "Eliminate",
    description: "Remove the weakness after mastery evidence.",
  },
];

export default function AIInterviewPreparationFinalWeaknessEliminationMode() {
  const [selectedWeakness, setSelectedWeakness] = useState(0);
  const [started, setStarted] = useState(false);
  const [showWeaknesses, setShowWeaknesses] = useState(false);
  const [showCriteria, setShowCriteria] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [completed, setCompleted] = useState([]);
  const [refreshed, setRefreshed] = useState(false);

  const current = weaknesses[selectedWeakness];

  const markMastered = () => {
    if (!completed.includes(current.name)) {
      setCompleted([...completed, current.name]);
    }
  };

  const nextWeakness = () => {
    setSelectedWeakness(
      (selectedWeakness + 1) % weaknesses.length
    );
    setStarted(false);
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
            AI Final Weakness Elimination Mode
          </h1>

          <p className="text-gray-500">
            Focus your remaining preparation time on the highest-impact
            weaknesses before your interview.
          </p>

        </div>

      </div>

      {/* Main Banner */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <Target
              className="text-red-600"
              size={32}
            />
          </div>

          <div>

            <p className="text-xs font-bold text-red-600">
              FINAL PREPARATION MODE
            </p>

            <h2 className="text-2xl font-black text-red-800 mt-1">
              3 High-Impact Weaknesses Remain
            </h2>

            <p className="text-gray-600 mt-2">
              The AI is prioritizing the gaps most likely to affect interview
              performance instead of continuing broad preparation.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-red-50 rounded-xl p-5">

            <AlertTriangle
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Remaining Weaknesses
            </p>

            <p className="text-3xl font-black text-red-600">
              {weaknesses.length - completed.length}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <Target
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Critical
            </p>

            <p className="text-3xl font-black text-orange-600">
              1
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-5">

            <TrendingUp
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Average Improvement
            </p>

            <p className="text-3xl font-black text-indigo-600">
              +10%
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Clock3
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Mode
            </p>

            <p className="text-xl font-black text-purple-600">
              Focused
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Eliminated
            </p>

            <p className="text-3xl font-black text-green-600">
              {completed.length}
            </p>

          </div>

        </div>

      </div>

      {/* Weakness Priority */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Highest-Impact Weakness
              </h2>

              <p className="text-sm text-gray-500">
                The AI selects the gap that currently has the greatest impact
                on interview readiness.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowWeaknesses(!showWeaknesses)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWeaknesses
              ? "Hide Weaknesses"
              : "Show Weaknesses"}
          </button>

        </div>

        {showWeaknesses && (
          <div className="space-y-4 mt-6">

            {weaknesses.map((weakness, index) => {

              const mastered = completed.includes(
                weakness.name
              );

              return (
                <button
                  type="button"
                  key={weakness.name}
                  onClick={() => {
                    setSelectedWeakness(index);
                    setStarted(false);
                  }}
                  className={`w-full text-left border rounded-2xl p-5 ${
                    selectedWeakness === index
                      ? "border-indigo-500 bg-indigo-50"
                      : ""
                  }`}
                >

                  <div className="flex justify-between gap-4">

                    <div>

                      <div className="flex items-center gap-3">

                        <h3 className="font-bold">
                          {weakness.name}
                        </h3>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            weakness.impact === "Critical"
                              ? "bg-red-100 text-red-700"
                              : weakness.impact === "High"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {weakness.impact}
                        </span>

                        {mastered && (
                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold">
                            Mastered
                          </span>
                        )}

                      </div>

                      <p className="text-sm text-gray-500 mt-2">
                        Remaining gap: {weakness.remaining}
                      </p>

                    </div>

                    <div className="text-right">

                      <p className="text-xs text-gray-500">
                        Current Score
                      </p>

                      <p className="text-2xl font-black text-indigo-600">
                        {weakness.score}%
                      </p>

                    </div>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full mt-4">

                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{
                        width: `${weakness.score}%`,
                      }}
                    />

                  </div>

                  <div className="flex justify-between text-xs text-gray-500 mt-2">

                    <span>
                      Target: {weakness.target}%
                    </span>

                    <span>
                      Improvement: {weakness.improvement}
                    </span>

                  </div>

                </button>
              );
            })}

          </div>
        )}

      </div>

      {/* Active Weakness */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-red-600 shrink-0"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-red-600">
              CURRENT PRIORITY
            </p>

            <h2 className="text-2xl font-black text-red-800 mt-1">
              {current.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {current.remaining}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  Current Level
                </p>

                <p className="text-2xl font-black text-red-600 mt-1">
                  {current.score}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  Target
                </p>

                <p className="text-2xl font-black text-green-600 mt-1">
                  {current.target}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  Evidence
                </p>

                <p className="text-2xl font-black text-indigo-600 mt-1">
                  {current.evidence} attempts
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Targeted Practice */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Targeted Practice
            </h2>

            <p className="text-sm text-gray-500">
              Practice questions are generated specifically for the active
              weakness.
            </p>

          </div>

        </div>

        <div className="space-y-3 mt-6">

          {practiceQuestions.map((question, index) => (

            <div
              key={question}
              className="border rounded-xl p-4 flex gap-4"
            >

              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                {index + 1}
              </div>

              <p className="text-sm text-gray-700 flex-1">
                {question}
              </p>

              <ArrowRight
                className="text-gray-400"
                size={18}
              />

            </div>
          ))}

        </div>

        <button
          type="button"
          onClick={() => setStarted(true)}
          className="mt-6 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          {started ? "Practice Active" : "Start Targeted Practice"}
          <ArrowRight size={18} />
        </button>

        {started && (
          <div className="bg-indigo-50 rounded-xl p-5 mt-5">

            <p className="text-xs font-bold text-indigo-600">
              AI PRACTICE MODE ACTIVE
            </p>

            <p className="font-semibold text-indigo-800 mt-2">
              New questions will test the same weakness without repeating the
              exact examples you previously solved.
            </p>

          </div>
        )}

      </div>

      {/* Mastery Evidence */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <ShieldCheck className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Mastery Evidence
              </h2>

              <p className="text-sm text-gray-500">
                A weakness is removed only after sufficient evidence of
                improvement.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowCriteria(!showCriteria)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showCriteria
              ? "Hide Criteria"
              : "Show Criteria"}
          </button>

        </div>

        {showCriteria && (
          <div className="space-y-3 mt-6">

            {masteryCriteria.map((criterion, index) => (

              <div
                key={criterion}
                className="border rounded-xl p-4 flex items-center gap-4"
              >

                <CheckCircle2
                  className="text-green-600"
                  size={20}
                />

                <p className="text-sm text-gray-700">
                  {index + 1}. {criterion}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Elimination Decision */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600 shrink-0"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-green-600">
              WEAKNESS ELIMINATION
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Has {current.name} reached sufficient mastery?
            </h2>

            <p className="text-gray-600 mt-2">
              Mark the weakness as eliminated only when repeated evidence shows
              that the candidate can handle new variations independently.
            </p>

            <button
              type="button"
              onClick={markMastered}
              className="mt-5 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2"
            >
              Mark as Mastered
              <CheckCircle2 size={18} />
            </button>

            {completed.includes(current.name) && (
              <div className="bg-white rounded-xl p-4 mt-4 text-green-700 font-semibold">
                ✓ {current.name} has been removed from the active weakness
                priority list.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Next Priority */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="font-bold text-lg">
              Continue Final Weakness Elimination
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Move to the next highest-impact gap after sufficient mastery
              evidence is collected.
            </p>

          </div>

          <button
            type="button"
            onClick={nextWeakness}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
          >
            Next Weakness
            <ArrowRight size={18} />
          </button>

        </div>

      </div>

      {/* AI Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI FINAL PREPARATION RECOMMENDATION
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Stop broad preparation and eliminate the biggest remaining gap.
            </h2>

            <p className="text-gray-600 mt-2">
              With limited time remaining, repeated targeted practice on
              high-impact weaknesses can provide more value than continuing
              to distribute preparation time evenly across already strong
              areas.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                NEXT BEST ACTION
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                Complete two new Dynamic Programming problems, explain the
                state transition aloud, and then retest using a changed
                constraint.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Recalculate */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Recalculate Weakness Priorities
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Refresh the priority list after new practice and assessment
              results.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Update Priorities
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Weakness priorities updated successfully.
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
                Weakness Elimination Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI turns remaining weaknesses into targeted final
                preparation.
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
              Finish by eliminating weaknesses, not collecting more topics.
            </h2>

            <p className="text-gray-600 mt-2">
              Final preparation should become increasingly focused. Once a
              weakness has sufficient evidence of mastery, remove it from the
              priority list and move the remaining time toward the next
              highest-impact gap.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}