import React, { useState } from "react";
import {
  Brain,
  Layers3,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  ArrowDown,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const transitions = [
  {
    from: "High-Level Architecture",
    to: "API Design",
    status: "Good",
    score: 88,
    issue: "The transition clearly explains why the API layer is required.",
    suggestion:
      "Continue connecting architectural components to their responsibilities.",
  },
  {
    from: "API Design",
    to: "Database Implementation",
    status: "Needs Improvement",
    score: 61,
    issue:
      "The explanation jumps directly into schema details without explaining the data flow.",
    suggestion:
      "Explain how API requests reach the database and why the chosen storage model supports the workload.",
  },
  {
    from: "Database",
    to: "Code-Level Implementation",
    status: "Abrupt",
    score: 48,
    issue:
      "The candidate moves into code without connecting the database decision to implementation.",
    suggestion:
      "Introduce the repository or data-access layer before showing implementation details.",
  },
];

const abstractionLevels = [
  {
    level: "1",
    title: "Architecture",
    description:
      "Services, components, data flow, scalability, and major system decisions.",
  },
  {
    level: "2",
    title: "Component Design",
    description:
      "APIs, modules, databases, queues, interfaces, and responsibilities.",
  },
  {
    level: "3",
    title: "Implementation",
    description:
      "Classes, functions, algorithms, data structures, and code-level details.",
  },
];

const transitionStatements = [
  {
    from: "Architecture → API",
    statement:
      "Now that the major services are defined, I would expose the required functionality through an API layer.",
  },
  {
    from: "API → Database",
    statement:
      "The API needs persistent storage for these entities, so the next decision is how the data should be modeled and accessed.",
  },
  {
    from: "Database → Code",
    statement:
      "At the implementation level, I would isolate database access behind a repository layer so the business logic remains independent.",
  },
];

const recommendations = [
  {
    title: "Explain the Why Before the How",
    reason:
      "Moving directly into implementation can make a technically correct explanation difficult to follow.",
    action:
      "State why the lower-level component is needed before describing its implementation.",
  },
  {
    title: "Connect Data Flow",
    reason:
      "The database transition currently lacks a clear request-to-storage explanation.",
    action:
      "Describe how information moves from the API through the application layer into storage.",
  },
  {
    title: "Introduce Intermediate Layers",
    reason:
      "Jumping directly from architecture to code creates an abstraction gap.",
    action:
      "Mention component or interface responsibilities before showing implementation details.",
  },
];

const workflow = [
  {
    title: "Detect",
    description: "Identify changes in explanation scope.",
  },
  {
    title: "Map",
    description: "Map each section to an abstraction level.",
  },
  {
    title: "Connect",
    description: "Check logical relationships between levels.",
  },
  {
    title: "Coach",
    description: "Suggest smoother transitions.",
  },
  {
    title: "Score",
    description: "Evaluate explanation continuity.",
  },
];

export default function AIInterviewAnswerTechnicalScopeTransitionCoach() {
  const [showTransitions, setShowTransitions] = useState(false);
  const [showLevels, setShowLevels] = useState(false);
  const [showStatements, setShowStatements] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const overallScore = 66;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Technical Scope Transition Coach
          </h1>

          <p className="text-gray-500">
            Learn how to move smoothly between architecture, component design,
            and implementation details during technical interviews.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {overallScore}%
              </p>

              <p className="text-xs text-gray-500">
                Flow Score
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              TECHNICAL SCOPE ANALYSIS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Good Structure With Transition Gaps
            </h2>

            <p className="text-gray-600 mt-2">
              Your high-level explanation is clear, but some transitions into
              lower-level implementation details need stronger connections.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Layers3 className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Flow Score
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {overallScore}%
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Smooth Transitions
            </p>

            <p className="text-3xl font-black text-green-600">
              1
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Transition Gaps
            </p>

            <p className="text-3xl font-black text-orange-600">
              2
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Layers3 className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Scope Levels
            </p>

            <p className="text-3xl font-black text-purple-600">
              3
            </p>

          </div>

        </div>

      </div>

      {/* Candidate Explanation */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Candidate Explanation Flow
            </h2>

            <p className="text-sm text-gray-500">
              AI maps the explanation from architecture to implementation.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-6">

          <div className="flex flex-wrap items-center gap-3">

            <span className="px-4 py-3 rounded-xl bg-indigo-100 text-indigo-700 font-bold">
              Architecture
            </span>

            <ArrowRight className="text-gray-400" />

            <span className="px-4 py-3 rounded-xl bg-blue-100 text-blue-700 font-bold">
              API
            </span>

            <ArrowRight className="text-gray-400" />

            <span className="px-4 py-3 rounded-xl bg-orange-100 text-orange-700 font-bold">
              Database
            </span>

            <ArrowRight className="text-red-500" />

            <span className="px-4 py-3 rounded-xl bg-red-100 text-red-700 font-bold">
              Code
            </span>

          </div>

        </div>

        <div className="bg-orange-50 rounded-xl p-4 mt-4">

          <p className="text-sm font-semibold text-orange-800">
            AI observation:
          </p>

          <p className="text-sm text-gray-600 mt-1">
            The transition from database design to implementation is too
            abrupt. Explain the data-access layer before moving into code.
          </p>

        </div>

      </div>

      {/* Abstraction Levels */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Layers3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Abstraction Levels
              </h2>

              <p className="text-sm text-gray-500">
                Understand the expected scope at each stage of the explanation.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowLevels(!showLevels)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showLevels
              ? "Hide Levels"
              : "Show Levels"}
          </button>

        </div>

        {showLevels && (
          <div className="grid md:grid-cols-3 gap-4 mt-6">

            {abstractionLevels.map((level) => (

              <div
                key={level.level}
                className="border rounded-2xl p-5"
              >

                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black">
                  {level.level}
                </div>

                <h3 className="font-bold mt-4">
                  {level.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {level.description}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Transition Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="font-bold text-lg">
              Transition Analysis
            </h2>

            <p className="text-sm text-gray-500">
              Identify where the explanation becomes difficult to follow.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowTransitions(!showTransitions)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showTransitions
              ? "Hide Analysis"
              : "Show Analysis"}
          </button>

        </div>

        {showTransitions && (
          <div className="space-y-4 mt-6">

            {transitions.map((transition, index) => (

              <div
                key={`${transition.from}-${transition.to}`}
                className="border rounded-2xl p-5"
              >

                <div className="flex items-center gap-3 flex-wrap">

                  <span className="px-3 py-2 rounded-xl bg-indigo-100 text-indigo-700 text-sm font-bold">
                    {transition.from}
                  </span>

                  <ArrowRight className="text-gray-400" />

                  <span className="px-3 py-2 rounded-xl bg-purple-100 text-purple-700 text-sm font-bold">
                    {transition.to}
                  </span>

                  <span
                    className={`ml-auto px-3 py-1 rounded-full text-xs font-bold ${
                      transition.status === "Good"
                        ? "bg-green-100 text-green-700"
                        : transition.status === "Abrupt"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {transition.status}
                  </span>

                </div>

                <div className="flex justify-between mt-5">

                  <p className="text-sm text-gray-600">
                    {transition.issue}
                  </p>

                  <span className="font-black text-indigo-600 ml-4">
                    {transition.score}%
                  </span>

                </div>

                <div className="bg-gray-50 rounded-xl p-4 mt-4">

                  <p className="text-xs font-bold text-gray-500">
                    AI SUGGESTION
                  </p>

                  <p className="text-sm text-gray-700 mt-1">
                    {transition.suggestion}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Transition Statements */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg text-indigo-800">
                Suggested Transition Statements
              </h2>

              <p className="text-sm text-gray-600">
                Use these as examples for connecting different explanation
                levels naturally.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowStatements(!showStatements)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showStatements
              ? "Hide Statements"
              : "Show Statements"}
          </button>

        </div>

        {showStatements && (
          <div className="space-y-4 mt-6">

            {transitionStatements.map((item) => (

              <div
                key={item.from}
                className="bg-white rounded-xl p-5"
              >

                <p className="text-xs font-bold text-indigo-600">
                  {item.from}
                </p>

                <p className="text-gray-700 mt-3">
                  "{item.statement}"
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Scope Continuity */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Explanation Scope Continuity
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          The AI evaluates whether each level is properly connected to the
          previous one.
        </p>

        <div className="space-y-6 mt-6">

          {[
            {
              title: "Architecture → Components",
              value: 88,
              text: "Strong connection",
            },
            {
              title: "Components → Implementation",
              value: 61,
              text: "Needs stronger context",
            },
            {
              title: "Implementation → Technical Detail",
              value: 72,
              text: "Mostly clear",
            },
          ].map((item) => (

            <div key={item.title}>

              <div className="flex justify-between gap-4">

                <div>

                  <p className="font-semibold">
                    {item.title}
                  </p>

                  <p className="text-xs text-gray-500">
                    {item.text}
                  </p>

                </div>

                <span className="font-black text-indigo-600">
                  {item.value}%
                </span>

              </div>

              <div className="h-3 bg-gray-200 rounded-full mt-3">

                <div
                  className={`h-full rounded-full ${
                    item.value < 65
                      ? "bg-orange-500"
                      : "bg-indigo-500"
                  }`}
                  style={{
                    width: `${item.value}%`,
                  }}
                />

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Coaching Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve the weakest transitions before your next interview.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowRecommendations(
                !showRecommendations
              )
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

      {/* Practice Coach */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              AI PRACTICE COACH
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Explain the reason before the implementation
            </h2>

            <p className="text-gray-600 mt-2">
              Before moving to a lower abstraction level, briefly explain why
              the next level is relevant to the decision you just described.
            </p>

            <div className="bg-gray-50 rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                PRACTICE FORMULA
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                Decision → Reason → Component → Implementation
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Refresh */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Reanalyze Explanation
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Recalculate scope transitions after improving your explanation.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Reanalyze Scope Flow
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Explanation flow reanalyzed successfully. Transition feedback
                has been refreshed.
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
                Scope Transition Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI evaluates continuity between explanation levels.
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
              Connect every level before moving deeper.
            </h2>

            <p className="text-gray-600 mt-2">
              A strong technical explanation should make it clear how a
              high-level decision leads to component design and eventually to
              implementation. Smooth transitions make complex system-design
              answers easier to understand and defend.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}