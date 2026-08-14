import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  MessageSquare,
  ArrowRight,
  RefreshCw,
  GitBranch,
} from "lucide-react";

const contradictions = [
  {
    title: "Caching vs Fresh Data",
    statementA:
      "We will cache user data in Redis to reduce database requests.",
    statementB:
      "Every request will always read the latest value directly from PostgreSQL.",
    conflict:
      "These statements conflict because Redis caching can return a previously stored value instead of querying PostgreSQL for every request.",
    assumption:
      "The intended behavior must be clarified: performance through caching or strict real-time reads.",
    correction:
      "Use caching for data where slight staleness is acceptable and invalidate or refresh the cache when important updates occur.",
    severity: "High",
  },
  {
    title: "Stateless Servers vs Local Sessions",
    statementA:
      "The application servers will be completely stateless.",
    statementB:
      "Each server will store user sessions in local memory.",
    conflict:
      "Local session storage introduces server-specific state, which conflicts with the stateless architecture.",
    assumption:
      "Session state should either be externalized or intentionally kept local with session affinity.",
    correction:
      "Store shared session state in a centralized system such as Redis if stateless horizontal scaling is required.",
    severity: "High",
  },
  {
    title: "Strong Consistency vs Eventual Consistency",
    statementA:
      "The system requires immediate consistency for all reads.",
    statementB:
      "Updates will propagate asynchronously through an event queue.",
    conflict:
      "Asynchronous propagation can introduce a period where different components observe different states.",
    assumption:
      "Determine which operations actually require strong consistency.",
    correction:
      "Use strong consistency for critical operations and allow eventual consistency for non-critical read models.",
    severity: "Medium",
  },
];

const reasoningSteps = [
  {
    title: "Detect",
    description: "Find claims that cannot both be true.",
  },
  {
    title: "Explain",
    description: "Show exactly why the claims conflict.",
  },
  {
    title: "Clarify",
    description: "Identify the assumption that needs clarification.",
  },
  {
    title: "Correct",
    description: "Build technically consistent reasoning.",
  },
  {
    title: "Recover",
    description: "Continue the answer without restarting.",
  },
];

const recoveryTips = [
  {
    title: "Acknowledge the Conflict",
    text:
      "Clearly state that the two statements cannot both hold under the same conditions.",
  },
  {
    title: "State the Intended Assumption",
    text:
      "Explain which requirement or assumption you actually intended.",
  },
  {
    title: "Correct the Reasoning",
    text:
      "Replace the conflicting statement with a technically consistent explanation.",
  },
  {
    title: "Continue the Answer",
    text:
      "Connect the correction to the remaining architecture or algorithm.",
  },
];

const followUps = [
  "Which requirement has higher priority in this design?",
  "What happens when the assumption behind your first statement changes?",
  "Can you modify the design without sacrificing the original performance goal?",
];

export default function AIInterviewAnswerTechnicalContradictionResolutionCoach() {
  const [selected, setSelected] = useState(0);
  const [answer, setAnswer] = useState("");
  const [evaluated, setEvaluated] = useState(false);
  const [showContradictions, setShowContradictions] =
    useState(false);
  const [showSteps, setShowSteps] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showFollowUps, setShowFollowUps] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const current = contradictions[selected];

  const nextScenario = () => {
    setSelected((value) => (value + 1) % contradictions.length);
    setAnswer("");
    setEvaluated(false);
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
            AI Technical Contradiction Resolution Coach
          </h1>

          <p className="text-gray-500">
            Detect conflicting technical claims and learn how to recover with
            a consistent explanation.
          </p>

        </div>

      </div>

      {/* Main Alert */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle
              className="text-red-600"
              size={32}
            />
          </div>

          <div>

            <p className="text-xs font-bold text-red-600">
              CONTRADICTION DETECTED
            </p>

            <h2 className="text-2xl font-black text-red-800 mt-1">
              Your Explanation Contains a Technical Conflict
            </h2>

            <p className="text-gray-600 mt-2">
              The AI found two claims that cannot both be true under the same
              assumptions. Resolve the conflict instead of restarting your
              answer.
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
              Contradictions
            </p>

            <p className="text-3xl font-black text-red-600">
              {contradictions.length}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <GitBranch
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              High Severity
            </p>

            <p className="text-3xl font-black text-orange-600">
              2
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-5">

            <Brain
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Scenario
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {selected + 1}/3
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <MessageSquare
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Follow-ups
            </p>

            <p className="text-3xl font-black text-purple-600">
              3
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Recovery Goal
            </p>

            <p className="text-3xl font-black text-green-600">
              100%
            </p>

          </div>

        </div>

      </div>

      {/* Candidate Answer */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <MessageSquare className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Candidate Explanation
            </h2>

            <p className="text-sm text-gray-500">
              The AI analyzes relationships between technical claims.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-5">

          <p className="text-gray-700 leading-7">
            "I would cache user data in Redis to reduce database load. At the
            same time, every request should always read the latest value
            directly from PostgreSQL."
          </p>

        </div>

      </div>

      {/* Contradiction Viewer */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="font-bold text-lg">
              Contradiction Analysis
            </h2>

            <p className="text-sm text-gray-500">
              Compare the conflicting claims and identify the underlying issue.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowContradictions(!showContradictions)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showContradictions
              ? "Hide Analysis"
              : "Show Analysis"}
          </button>

        </div>

        {showContradictions && (
          <div className="space-y-4 mt-6">

            {contradictions.map((item, index) => (

              <button
                type="button"
                key={item.title}
                onClick={() => {
                  setSelected(index);
                  setEvaluated(false);
                  setAnswer("");
                }}
                className={`w-full text-left border rounded-2xl p-5 ${
                  selected === index
                    ? "border-indigo-500 bg-indigo-50"
                    : ""
                }`}
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <div className="flex items-center gap-3">

                      <h3 className="font-bold">
                        {item.title}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.severity === "High"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.severity}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {item.conflict}
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Conflict Comparison */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600 shrink-0"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              ACTIVE CONTRADICTION
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {current.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-gray-500">
                  CLAIM A
                </p>

                <p className="text-gray-700 mt-2">
                  {current.statementA}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-gray-500">
                  CLAIM B
                </p>

                <p className="text-gray-700 mt-2">
                  {current.statementB}
                </p>

              </div>

            </div>

            <div className="flex justify-center my-4">

              <ArrowRight
                className="text-orange-600 rotate-90"
                size={28}
              />

            </div>

            <div className="bg-red-50 rounded-xl p-5">

              <p className="text-xs font-bold text-red-600">
                WHY THEY CONFLICT
              </p>

              <p className="text-sm text-gray-700 mt-2">
                {current.conflict}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Resolution Challenge */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Resolve the Contradiction
            </h2>

            <p className="text-sm text-gray-500">
              Explain how you would recover without restarting the entire
              answer.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="border rounded-xl p-5">

            <p className="text-xs font-bold text-indigo-600">
              STEP 1
            </p>

            <h3 className="font-bold mt-2">
              Identify the conflict
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Explain why the two statements cannot both hold.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-xs font-bold text-indigo-600">
              STEP 2
            </p>

            <h3 className="font-bold mt-2">
              Clarify the assumption
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Decide which requirement or assumption is intended.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-xs font-bold text-indigo-600">
              STEP 3
            </p>

            <h3 className="font-bold mt-2">
              Rebuild the reasoning
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Provide a consistent explanation and continue the answer.
            </p>

          </div>

        </div>

        <textarea
          value={answer}
          onChange={(event) =>
            setAnswer(event.target.value)
          }
          placeholder="Explain which assumption you would keep and how you would correct the conflicting reasoning..."
          className="w-full min-h-40 border rounded-2xl p-5 mt-6 resize-y outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <div className="flex flex-wrap gap-3 mt-4">

          <button
            type="button"
            onClick={() => setEvaluated(true)}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
          >
            Evaluate Resolution
            <ArrowRight size={18} />
          </button>

          <button
            type="button"
            onClick={nextScenario}
            className="px-5 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold"
          >
            Next Contradiction
          </button>

        </div>

        {evaluated && (
          <div className="bg-green-50 rounded-xl p-5 mt-5">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600 shrink-0"
                size={24}
              />

              <div>

                <p className="font-bold text-green-800">
                  Strong Recovery
                </p>

                <p className="text-sm text-gray-600 mt-2">
                  You identified the conflicting assumptions and moved toward
                  a consistent technical explanation instead of abandoning the
                  original solution.
                </p>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* Intended Assumption */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI ASSUMPTION ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Identify the assumption that makes the answer consistent
            </h2>

            <p className="text-gray-600 mt-2">
              {current.assumption}
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                CORRECTED REASONING
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                {current.correction}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Recovery Tips */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="font-bold text-lg">
              Interview Recovery Strategy
            </h2>

            <p className="text-sm text-gray-500">
              A simple process for correcting contradictions in real time.
            </p>

          </div>

          <button
            type="button"
            onClick={() => setShowTips(!showTips)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showTips
              ? "Hide Strategy"
              : "Show Strategy"}
          </button>

        </div>

        {showTips && (
          <div className="space-y-4 mt-6">

            {recoveryTips.map((tip, index) => (

              <div
                key={tip.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {tip.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {tip.text}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Follow-ups */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <MessageSquare className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Targeted Follow-Up Questions
              </h2>

              <p className="text-sm text-gray-500">
                Questions an interviewer could ask after detecting the
                contradiction.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowFollowUps(!showFollowUps)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFollowUps
              ? "Hide Questions"
              : "Show Questions"}
          </button>

        </div>

        {showFollowUps && (
          <div className="space-y-3 mt-6">

            {followUps.map((question, index) => (

              <div
                key={question}
                className="border rounded-xl p-4 flex gap-3"
              >

                <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                <p className="text-sm text-gray-700">
                  {question}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Reanalysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Reanalyze Technical Explanation
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Check whether the revised explanation is internally consistent.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Reanalyze Answer
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Contradiction analysis refreshed successfully.
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
                Contradiction Resolution Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI helps candidates recover from conflicting
                statements.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowSteps(!showSteps)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showSteps
              ? "Hide Workflow"
              : "Show Workflow"}
          </button>

        </div>

        {showSteps && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            {reasoningSteps.map((step, index) => (

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

                {index < reasoningSteps.length - 1 && (
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
              A contradiction is recoverable.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong candidates do not need to restart their entire answer
              after making a technical mistake. Acknowledge the conflict,
              clarify the intended assumption, correct the reasoning, and
              continue from the corrected design.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}