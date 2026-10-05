import React, { useEffect, useState } from "react";
import {
  Brain,
  Clock3,
  AlertTriangle,
  CheckCircle2,
  Target,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  MessageSquare,
} from "lucide-react";

const timeStages = [
  {
    time: "15:00",
    title: "Initial Analysis",
    description: "Understand requirements and clarify assumptions.",
  },
  {
    time: "10:00",
    title: "Approach Selection",
    description: "Choose and justify the main solution strategy.",
  },
  {
    time: "05:00",
    title: "Implementation Focus",
    description: "Prioritize the most important implementation details.",
  },
  {
    time: "02:00",
    title: "Final Review",
    description: "Check edge cases, complexity, and trade-offs.",
  },
];

const evaluationAreas = [
  {
    title: "Time Management",
    score: 88,
    description: "Candidate allocated time effectively across the problem.",
  },
  {
    title: "Prioritization",
    score: 84,
    description: "Important requirements were addressed before secondary details.",
  },
  {
    title: "Solution Quality",
    score: 81,
    description: "The final approach remained technically sound under pressure.",
  },
  {
    title: "Communication",
    score: 76,
    description: "Most important reasoning was communicated clearly.",
  },
];

const followUps = [
  "What is the most important trade-off in your current approach?",
  "You have limited time. Which edge case would you test first?",
  "Can you explain your complexity in one concise statement?",
  "What part of the solution would you simplify if time runs out?",
];

const recommendations = [
  {
    title: "Prioritize Core Requirements",
    reason:
      "Secondary details can consume time before the primary solution is complete.",
    action:
      "Identify must-have requirements before discussing optional improvements.",
  },
  {
    title: "Use Time Checkpoints",
    reason:
      "Regular checkpoints help prevent spending too long on one part of the problem.",
    action:
      "Review progress when approximately 10, 5, and 2 minutes remain.",
  },
  {
    title: "Practice Concise Explanations",
    reason:
      "Long explanations reduce the time available for implementation and validation.",
    action:
      "Practice explaining the approach, complexity, and trade-offs in short structured responses.",
  },
];

const workflow = [
  {
    title: "Start",
    description: "Set interview-style time pressure.",
  },
  {
    title: "Monitor",
    description: "Track progress and remaining time.",
  },
  {
    title: "Adapt",
    description: "Adjust follow-ups dynamically.",
  },
  {
    title: "Evaluate",
    description: "Compare time spent with quality.",
  },
  {
    title: "Improve",
    description: "Recommend better prioritization.",
  },
];

export default function AIInterviewQuestionTimePressureSimulator() {
  const INITIAL_TIME = 15 * 60;

  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [running, setRunning] = useState(false);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);

  const [answer, setAnswer] = useState("");
  const [showStages, setShowStages] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [showFollowUps, setShowFollowUps] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);

  const [selectedFollowUp, setSelectedFollowUp] = useState(null);

  useEffect(() => {
    if (!running || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((current) => {
        if (current <= 1) {
          clearInterval(timer);
          setRunning(false);
          setFinished(true);
          return 0;
        }

        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, timeLeft]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(
    seconds
  ).padStart(2, "0")}`;

  const elapsedTime = INITIAL_TIME - timeLeft;

  const elapsedMinutes = Math.floor(elapsedTime / 60);
  const elapsedSeconds = elapsedTime % 60;

  const formattedElapsed = `${String(elapsedMinutes).padStart(
    2,
    "0"
  )}:${String(elapsedSeconds).padStart(2, "0")}`;

  const progress =
    ((INITIAL_TIME - timeLeft) / INITIAL_TIME) * 100;

  const startSimulation = () => {
    setStarted(true);
    setFinished(false);
    setRunning(true);
  };

  const pauseSimulation = () => {
    setRunning(false);
  };

  const resetSimulation = () => {
    setRunning(false);
    setStarted(false);
    setFinished(false);
    setTimeLeft(INITIAL_TIME);
    setAnswer("");
    setSelectedFollowUp(null);
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
            AI Interview Time Pressure Simulator
          </h1>

          <p className="text-gray-500">
            Practice solving technical interview problems while dynamically
            managing limited time.
          </p>

        </div>

      </div>

      {/* Timer */}
      <div
        className={`rounded-2xl p-6 ${
          timeLeft <= 120 && started
            ? "bg-red-50"
            : "bg-indigo-50"
        }`}
      >

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div className="flex items-center gap-4">

            <div
              className={`p-4 rounded-2xl ${
                timeLeft <= 120 && started
                  ? "bg-red-100 text-red-600"
                  : "bg-white text-indigo-600"
              }`}
            >
              <Clock3 size={34} />
            </div>

            <div>

              <p className="text-xs font-bold text-gray-500">
                REMAINING TIME
              </p>

              <p
                className={`text-5xl font-black ${
                  timeLeft <= 120 && started
                    ? "text-red-700"
                    : "text-indigo-700"
                }`}
              >
                {formattedTime}
              </p>

            </div>

          </div>

          <div className="flex flex-wrap gap-3">

            {!started && (
              <button
                type="button"
                onClick={startSimulation}
                className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
              >
                Start Simulation
              </button>
            )}

            {started && running && (
              <button
                type="button"
                onClick={pauseSimulation}
                className="px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold"
              >
                Pause
              </button>
            )}

            {started && !running && !finished && (
              <button
                type="button"
                onClick={() => setRunning(true)}
                className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
              >
                Resume
              </button>
            )}

            <button
              type="button"
              onClick={resetSimulation}
              className="px-5 py-3 rounded-xl bg-white border font-semibold flex items-center gap-2"
            >
              <RefreshCw size={18} />
              Reset
            </button>

          </div>

        </div>

        <div className="mt-6">

          <div className="flex justify-between text-xs text-gray-500 mb-2">

            <span>
              Progress
            </span>

            <span>
              {Math.round(progress)}%
            </span>

          </div>

          <div className="h-3 bg-white rounded-full overflow-hidden">

            <div
              className={`h-full rounded-full ${
                timeLeft <= 120 && started
                  ? "bg-red-500"
                  : "bg-indigo-500"
              }`}
              style={{
                width: `${progress}%`,
              }}
            />

          </div>

        </div>

      </div>

      {/* Pressure Warning */}
      {started && timeLeft <= 120 && timeLeft > 0 && (
        <div className="bg-red-50 rounded-2xl p-5 flex gap-4">

          <AlertTriangle
            className="text-red-600"
            size={28}
          />

          <div>

            <p className="font-bold text-red-800">
              Final time checkpoint
            </p>

            <p className="text-sm text-gray-600 mt-1">
              Prioritize correctness, core requirements, and a concise
              explanation. Avoid adding low-impact details.
            </p>

          </div>

        </div>
      )}

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Problem
            </h2>

            <p className="text-sm text-gray-500">
              Solve the problem while explaining your reasoning.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-6">

          <p className="text-xs font-bold text-gray-500">
            QUESTION
          </p>

          <h3 className="font-bold text-xl mt-2">
            Design a system that finds the top 10 most frequently requested
            products from a large stream of events.
          </h3>

          <p className="text-gray-600 mt-4">
            Discuss your approach, complexity, scalability considerations,
            important assumptions, and how you would handle a growing event
            stream.
          </p>

        </div>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <MessageSquare className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Candidate Response
              </h2>

              <p className="text-sm text-gray-500">
                The simulator evaluates what you prioritize under time
                pressure.
              </p>

            </div>

          </div>

          <span className="text-xs font-semibold text-gray-500">
            Elapsed: {formattedElapsed}
          </span>

        </div>

        <textarea
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          rows={7}
          placeholder="Explain your approach, trade-offs, complexity, and scalability..."
          className="w-full mt-6 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <div className="flex justify-end mt-4">

          <button
            type="button"
            onClick={() => setFinished(true)}
            disabled={!answer.trim()}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2 disabled:opacity-50"
          >
            Submit Solution
            <ArrowRight size={18} />
          </button>

        </div>

      </div>

      {/* Time Checkpoints */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="font-bold text-lg">
              Interview Time Checkpoints
            </h2>

            <p className="text-sm text-gray-500">
              Understand how your priorities should change as time decreases.
            </p>

          </div>

          <button
            type="button"
            onClick={() => setShowStages(!showStages)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showStages ? "Hide Checkpoints" : "Show Checkpoints"}
          </button>

        </div>

        {showStages && (
          <div className="grid md:grid-cols-4 gap-4 mt-6">

            {timeStages.map((stage) => (

              <div
                key={stage.time}
                className="border rounded-2xl p-5"
              >

                <p className="text-2xl font-black text-indigo-600">
                  {stage.time}
                </p>

                <h3 className="font-bold mt-3">
                  {stage.title}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  {stage.description}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Dynamic Follow-ups */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-orange-600" />

            <div>

              <h2 className="font-bold text-lg text-orange-800">
                Adaptive Interview Follow-Ups
              </h2>

              <p className="text-sm text-gray-600">
                Follow-ups become more focused as the remaining time decreases.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFollowUps(!showFollowUps)}
            className="px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-semibold"
          >
            {showFollowUps ? "Hide Follow-Ups" : "Show Follow-Ups"}
          </button>

        </div>

        {showFollowUps && (
          <div className="space-y-3 mt-6">

            {followUps.map((question, index) => (

              <button
                type="button"
                key={question}
                onClick={() => setSelectedFollowUp(question)}
                className={`w-full text-left border rounded-xl p-4 transition ${
                  selectedFollowUp === question
                    ? "border-orange-500 bg-white"
                    : "hover:border-orange-300 bg-white/60"
                }`}
              >

                <div className="flex gap-3">

                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <p className="text-sm text-gray-700 pt-1">
                    {question}
                  </p>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Evaluation */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <TrendingUp className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Time vs Quality Analysis
              </h2>

              <p className="text-sm text-gray-500">
                Evaluate whether time was spent on the highest-value parts of
                the solution.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowEvaluation(!showEvaluation)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showEvaluation ? "Hide Analysis" : "Show Analysis"}
          </button>

        </div>

        {showEvaluation && (
          <div className="space-y-4 mt-6">

            {evaluationAreas.map((item) => (

              <div
                key={item.title}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <h3 className="font-bold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {item.description}
                    </p>

                  </div>

                  <span className="font-black text-indigo-600">
                    {item.score}%
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${item.score}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* AI Diagnosis */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain className="text-indigo-600" size={30} />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI TIME MANAGEMENT DIAGNOSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Strong prioritization with room for faster explanation
            </h2>

            <p className="text-gray-600 mt-2">
              The candidate focused on the main architecture first, but spent
              additional time explaining secondary implementation details.
              Under tighter constraints, those details should be postponed
              until the core solution is complete.
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
                AI Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve performance when solving under interview time pressure.
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

      {/* Finished Result */}
      {finished && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                SIMULATION COMPLETE
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Time-pressure performance recorded
              </h2>

              <p className="text-gray-600 mt-2">
                Your response took {formattedElapsed}. The AI can compare
                solution quality, prioritization, communication, and remaining
                time to generate a detailed interview-style evaluation.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Time Pressure Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the simulator evaluates performance under changing time
                pressure.
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
              AI INTERVIEW PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Under pressure, prioritize impact over completeness.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong interview performance is not only about producing a
              technically correct solution. Candidates must also recognize
              what matters most, communicate it clearly, and adapt their level
              of detail as the available time decreases.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}