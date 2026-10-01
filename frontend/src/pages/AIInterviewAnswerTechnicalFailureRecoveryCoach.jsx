import React, { useState } from "react";
import {
  Brain,
  Bug,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  Target,
  ArrowRight,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";

const recoveryStages = [
  {
    title: "Initial Approach",
    status: "Failed",
    description: "The candidate's first approach fails on a hidden scenario.",
    score: 62,
  },
  {
    title: "Failure Diagnosis",
    status: "Completed",
    description: "Candidate identifies the assumption causing the failure.",
    score: 78,
  },
  {
    title: "Controlled Hint",
    status: "Used",
    description: "AI provides a small directional hint without revealing the solution.",
    score: 84,
  },
  {
    title: "Alternative Approach",
    status: "Recovered",
    description: "Candidate adapts the strategy and reaches a valid solution.",
    score: 91,
  },
];

const failureSignals = [
  {
    title: "Failed Assumption",
    value: "Sorted Input",
    description:
      "The original approach assumes the input remains sorted after updates.",
    type: "warning",
  },
  {
    title: "Failure Trigger",
    value: "Dynamic Update",
    description:
      "A new requirement allows values to change during processing.",
    type: "warning",
  },
  {
    title: "Recovery",
    value: "Successful",
    description:
      "Candidate reconsidered the data structure and changed the approach.",
    type: "success",
  },
  {
    title: "Recovery Score",
    value: "87%",
    description:
      "Strong ability to recover without receiving the final solution.",
    type: "success",
  },
];

const hints = [
  {
    level: "Hint 1",
    text: "Reconsider which assumption your original approach depends on.",
    strength: "Low",
  },
  {
    level: "Hint 2",
    text: "Ask whether the data structure still supports the required updates efficiently.",
    strength: "Medium",
  },
  {
    level: "Hint 3",
    text: "Think about a structure that can preserve ordering while supporting updates.",
    strength: "Strong",
  },
];

const recoveryFlow = [
  {
    title: "Detect Failure",
    description: "Identify when the proposed approach no longer works.",
  },
  {
    title: "Diagnose",
    description: "Ask the candidate to locate the failure.",
  },
  {
    title: "Reassess",
    description: "Challenge the assumptions behind the approach.",
  },
  {
    title: "Hint",
    description: "Provide a controlled directional hint.",
  },
  {
    title: "Recover",
    description: "Evaluate the alternative solution.",
  },
  {
    title: "Learn",
    description: "Track recovery ability over time.",
  },
];

const recommendations = [
  {
    title: "Practice Assumption Checking",
    reason:
      "The initial solution depended on an assumption that changed when the requirement was modified.",
    action:
      "Before coding, explicitly list the assumptions your approach requires.",
  },
  {
    title: "Delay Solution Replacement",
    reason:
      "Strong recovery comes from diagnosing the failure before abandoning the approach.",
    action:
      "First identify the exact operation or constraint that breaks.",
  },
  {
    title: "Use Hints Progressively",
    reason:
      "The candidate successfully recovered after receiving a small directional hint.",
    action:
      "Prefer small hints before requesting a complete alternative approach.",
  },
];

export default function AIInterviewAnswerTechnicalFailureRecoveryCoach() {
  const [selectedStage, setSelectedStage] = useState(
    recoveryStages[0]
  );
  const [selectedHint, setSelectedHint] = useState(hints[0]);
  const [candidateAnswer, setCandidateAnswer] = useState("");
  const [failureDetected, setFailureDetected] = useState(false);
  const [showHints, setShowHints] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [recovered, setRecovered] = useState(false);

  const completedStages = recoveryStages.filter(
    (stage) =>
      stage.status === "Completed" ||
      stage.status === "Used" ||
      stage.status === "Recovered"
  ).length;

  const averageRecovery = Math.round(
    recoveryStages.reduce(
      (sum, stage) => sum + stage.score,
      0
    ) / recoveryStages.length
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
            AI Technical Failure Recovery Coach
          </h1>

          <p className="text-gray-500">
            Practice recovering from failed technical approaches without
            immediately receiving the correct solution.
          </p>

        </div>

      </div>

      {/* Main Status */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <RefreshCw
                className="mx-auto text-indigo-600"
                size={32}
              />

              <p className="text-xs font-bold text-indigo-700 mt-1">
                RECOVERY
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              RECOVERY PERFORMANCE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {averageRecovery}% Recovery Score
            </h2>

            <p className="text-gray-600 mt-2">
              The candidate successfully diagnosed the failure, adapted the
              approach, and reached an alternative solution with limited AI
              assistance.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Target
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Recovery Stages
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {completedStages}/{recoveryStages.length}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <Bug
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Failure Detected
            </p>

            <p className="text-3xl font-black text-red-600">
              1
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <Lightbulb
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Hints Used
            </p>

            <p className="text-3xl font-black text-orange-600">
              1
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <ShieldCheck
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Recovery Score
            </p>

            <p className="text-3xl font-black text-green-600">
              {averageRecovery}%
            </p>

          </div>

        </div>

      </div>

      {/* Interview Scenario */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Recovery Scenario
            </h2>

            <p className="text-sm text-gray-500">
              The interviewer introduces a requirement that breaks your
              original approach.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-xl p-5 mt-6">

          <p className="text-xs font-bold text-gray-500">
            ORIGINAL APPROACH
          </p>

          <h3 className="font-bold mt-2">
            Use binary search because the data is sorted.
          </h3>

          <p className="text-sm text-gray-600 mt-2">
            New requirement: values can now be inserted dynamically while the
            system is running.
          </p>

        </div>

        <div className="bg-red-50 rounded-xl p-5 mt-4">

          <div className="flex gap-3">

            <AlertTriangle
              className="text-red-600"
              size={22}
            />

            <div>

              <p className="font-bold text-red-800">
                Your current approach no longer satisfies the requirement.
              </p>

              <p className="text-sm text-gray-600 mt-1">
                Do not immediately replace the solution. First identify which
                assumption or operation causes the failure.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Recovery Stages */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <RefreshCw className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Recovery Stages
            </h2>

            <p className="text-sm text-gray-500">
              Track how the candidate responds after the initial approach
              fails.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {recoveryStages.map((stage, index) => (

            <button
              type="button"
              key={stage.title}
              onClick={() => setSelectedStage(stage)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedStage.title === stage.title
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    stage.status === "Failed"
                      ? "bg-red-100 text-red-700"
                      : stage.status === "Recovered"
                      ? "bg-green-100 text-green-700"
                      : "bg-indigo-100 text-indigo-700"
                  }`}
                >
                  {index + 1}
                </div>

                <div className="flex-1">

                  <div className="flex justify-between gap-4">

                    <div>

                      <h3 className="font-bold">
                        {stage.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {stage.description}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                        stage.status === "Failed"
                          ? "bg-red-100 text-red-700"
                          : stage.status === "Recovered"
                          ? "bg-green-100 text-green-700"
                          : "bg-indigo-100 text-indigo-700"
                      }`}
                    >
                      {stage.status}
                    </span>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full mt-4">

                    <div
                      className={`h-full rounded-full ${
                        stage.status === "Failed"
                          ? "bg-red-500"
                          : stage.status === "Recovered"
                          ? "bg-green-500"
                          : "bg-indigo-500"
                      }`}
                      style={{
                        width: `${stage.score}%`,
                      }}
                    />

                  </div>

                  <div className="flex justify-between text-xs text-gray-500 mt-2">

                    <span>
                      Recovery evidence
                    </span>

                    <span>
                      {stage.score}%
                    </span>

                  </div>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Stage */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          {selectedStage.status === "Failed" ? (
            <Bug
              className="text-red-600"
              size={30}
            />
          ) : selectedStage.status === "Recovered" ? (
            <CheckCircle2
              className="text-green-600"
              size={30}
            />
          ) : (
            <RefreshCw
              className="text-indigo-600"
              size={30}
            />
          )}

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              RECOVERY STAGE ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedStage.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedStage.description}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  STAGE STATUS
                </p>

                <p className="text-xl font-black mt-1">
                  {selectedStage.status}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  RECOVERY SCORE
                </p>

                <p className="text-xl font-black text-indigo-600 mt-1">
                  {selectedStage.score}%
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Failure Diagnosis */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-red-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-red-600">
              FAILURE DIAGNOSIS
            </p>

            <h2 className="text-xl font-bold text-red-800 mt-1">
              Identify why the original approach fails.
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              {failureSignals.map((signal) => (

                <div
                  key={signal.title}
                  className="bg-white rounded-xl p-5"
                >

                  <p className="text-xs text-gray-500">
                    {signal.title}
                  </p>

                  <p
                    className={`text-xl font-black mt-1 ${
                      signal.type === "warning"
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {signal.value}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    {signal.description}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* Controlled Hints */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-orange-600" />

            <div>

              <h2 className="font-bold text-lg">
                Controlled Hints
              </h2>

              <p className="text-sm text-gray-500">
                Hints should guide reasoning instead of revealing the answer.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowHints(!showHints)}
            className="px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-semibold"
          >
            {showHints ? "Hide Hints" : "Show Hints"}
          </button>

        </div>

        {showHints && (
          <div className="space-y-4 mt-6">

            {hints.map((hint) => (

              <button
                type="button"
                key={hint.level}
                onClick={() => setSelectedHint(hint)}
                className={`w-full text-left border rounded-xl p-5 ${
                  selectedHint.level === hint.level
                    ? "border-orange-500 bg-orange-50"
                    : "hover:border-orange-300"
                }`}
              >

                <div className="flex items-center gap-4">

                  <Lightbulb
                    className="text-orange-600"
                    size={22}
                  />

                  <div className="flex-1">

                    <div className="flex justify-between">

                      <h3 className="font-bold">
                        {hint.level}
                      </h3>

                      <span className="text-xs font-semibold text-orange-600">
                        {hint.strength}
                      </span>

                    </div>

                    <p className="text-sm text-gray-600 mt-2">
                      {hint.text}
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Candidate Recovery Response */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Recovery Response
            </h2>

            <p className="text-sm text-gray-500">
              Explain how you would recover instead of asking for the complete
              solution.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-xl p-5 mt-6">

          <p className="text-xs font-bold text-gray-500">
            AI PROMPT
          </p>

          <h3 className="font-bold mt-2">
            Your binary-search approach no longer works because values can be
            inserted dynamically. What would you reconsider?
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Identify the failure first, then describe the direction you would
            take for an alternative solution.
          </p>

        </div>

        <textarea
          value={candidateAnswer}
          onChange={(e) =>
            setCandidateAnswer(e.target.value)
          }
          placeholder="Explain your diagnosis and recovery approach..."
          className="w-full mt-5 min-h-[160px] border rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setFailureDetected(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Evaluate Recovery
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Recovery Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Personalized suggestions for improving recovery behavior.
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

      {/* Recovery Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Failure Recovery Flow
              </h2>

              <p className="text-sm text-gray-500">
                The coach guides the candidate toward recovery without
                immediately revealing the answer.
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

            {recoveryFlow.map((step, index) => (

              <React.Fragment key={step.title}>

                <div className="border rounded-xl p-4 min-w-[150px]">

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

                {index < recoveryFlow.length - 1 && (
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

      {/* Recovery Complete */}
      {recovered && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                RECOVERY COMPLETE
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Alternative solution successfully reached.
              </h2>

              <p className="text-gray-600 mt-2">
                The candidate demonstrated the ability to diagnose the failure,
                reassess assumptions, and recover without receiving the full
                solution.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Final Action */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setRecovered(true)}
          className="px-5 py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2"
        >
          Mark Recovery Practice Complete
          <ArrowRight size={18} />
        </button>

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
              A failed approach is an opportunity to demonstrate reasoning.
            </h2>

            <p className="text-gray-600 mt-2">
              The coach should evaluate how candidates respond to failure:
              whether they diagnose the actual problem, reassess assumptions,
              use hints effectively, and independently reach a better
              approach.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}