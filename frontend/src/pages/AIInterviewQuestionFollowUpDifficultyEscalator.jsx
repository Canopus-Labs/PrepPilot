import React, { useState } from "react";
import {
  Brain,
  ArrowUp,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Target,
  Zap,
  MessageSquare,
  RefreshCw,
  Lightbulb,
} from "lucide-react";

const levels = [
  {
    level: 1,
    title: "Basic Clarification",
    difficulty: "Easy",
    color: "green",
    description:
      "Confirm the candidate understands the basic approach and requirements.",
  },
  {
    level: 2,
    title: "Technical Reasoning",
    difficulty: "Medium",
    color: "indigo",
    description:
      "Ask why the selected approach works and what trade-offs it introduces.",
  },
  {
    level: 3,
    title: "Edge Cases",
    difficulty: "Medium-Hard",
    color: "orange",
    description:
      "Test whether the candidate can handle unusual inputs and failure scenarios.",
  },
  {
    level: 4,
    title: "System Trade-Offs",
    difficulty: "Hard",
    color: "red",
    description:
      "Challenge architectural decisions and performance trade-offs.",
  },
  {
    level: 5,
    title: "Deep Technical Challenge",
    difficulty: "Expert",
    color: "purple",
    description:
      "Test deeper understanding through constraints, scaling, and design changes.",
  },
];

const followUps = [
  {
    level: 1,
    question:
      "Can you briefly explain why you selected this approach?",
    trigger: "Starting point",
    purpose: "Validate basic understanding.",
  },
  {
    level: 2,
    question:
      "What is the time and space complexity of your approach, and why?",
    trigger: "Strong basic explanation",
    purpose: "Test technical reasoning.",
  },
  {
    level: 3,
    question:
      "What happens if the input contains many duplicate values?",
    trigger: "Correct complexity analysis",
    purpose: "Test edge-case reasoning.",
  },
  {
    level: 4,
    question:
      "How would you modify the solution if the input grew from thousands to millions of records?",
    trigger: "Strong edge-case handling",
    purpose: "Test scalability reasoning.",
  },
  {
    level: 5,
    question:
      "If your current architecture becomes the primary bottleneck at scale, what would you change and why?",
    trigger: "Strong scalability response",
    purpose: "Test deep architectural reasoning.",
  },
];

const coachingQuestions = [
  "What part of your previous answer caused the difficulty to increase?",
  "Can you justify the technical decision you just made?",
  "What edge case could invalidate your current approach?",
  "What trade-off did your answer introduce?",
  "How would your solution change under a stricter constraint?",
  "What would you optimize first if the workload increased significantly?",
];

const recommendations = [
  {
    title: "Build From Fundamentals",
    reason:
      "Strong adaptive interviews usually begin with basic clarification before deeper challenges.",
    action:
      "Practice explaining your initial approach clearly before discussing advanced optimizations.",
  },
  {
    title: "Expect Difficulty Escalation",
    reason:
      "A correct answer often causes interviewers to explore deeper understanding.",
    action:
      "After answering, proactively consider complexity, edge cases, and trade-offs.",
  },
  {
    title: "Recover From Weak Responses",
    reason:
      "A difficult follow-up does not necessarily mean the interview is going badly.",
    action:
      "Reassess your assumptions and use the previous question as context for the next response.",
  },
];

const workflow = [
  {
    title: "Evaluate",
    description: "Analyze the candidate's response.",
  },
  {
    title: "Score",
    description: "Measure correctness and depth.",
  },
  {
    title: "Adapt",
    description: "Select the next difficulty.",
  },
  {
    title: "Challenge",
    description: "Generate an appropriate follow-up.",
  },
  {
    title: "Repeat",
    description: "Continuously adapt the interview.",
  },
];

export default function AIInterviewQuestionFollowUpDifficultyEscalator() {
  const [currentLevel, setCurrentLevel] = useState(2);
  const [selectedFollowUp, setSelectedFollowUp] = useState(
    followUps[1]
  );

  const [showLevels, setShowLevels] = useState(false);
  const [showFollowUps, setShowFollowUps] = useState(false);
  const [showCoaching, setShowCoaching] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const [reinforced, setReinforced] = useState(false);

  const difficultyScore = currentLevel * 20 + 14;

  const advanceDifficulty = () => {
    setCurrentLevel((previous) =>
      Math.min(previous + 1, levels.length)
    );
    setEscalated(true);
    setReinforced(false);
  };

  const reinforceDifficulty = () => {
    setCurrentLevel((previous) =>
      Math.max(previous - 1, 1)
    );
    setReinforced(true);
    setEscalated(false);
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
            AI Follow-Up Difficulty Escalator
          </h1>

          <p className="text-gray-500">
            Dynamically increase or reinforce interview difficulty based on
            the candidate's demonstrated understanding.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {difficultyScore}
              </p>

              <p className="text-xs text-gray-500">
                Difficulty
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              CURRENT INTERVIEW DIFFICULTY
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {levels[currentLevel - 1].title}
            </h2>

            <p className="text-gray-600 mt-2">
              The next question is being selected according to your recent
              response quality and demonstrated understanding.
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
              Current Level
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {currentLevel}/5
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <ArrowUp className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Escalations
            </p>

            <p className="text-3xl font-black text-green-600">
              3
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <RefreshCw
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Reinforcements
            </p>

            <p className="text-3xl font-black text-orange-600">
              1
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Zap className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Adaptivity
            </p>

            <p className="text-3xl font-black text-purple-600">
              94%
            </p>

          </div>

        </div>

      </div>

      {/* Current Candidate Response */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <MessageSquare className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Previous Candidate Response
            </h2>

            <p className="text-sm text-gray-500">
              The AI uses this response to determine the next question.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-6">

          <p className="text-xs font-bold text-gray-500">
            CANDIDATE
          </p>

          <p className="text-gray-700 leading-7 mt-3">
            "I would use a hash map because it gives constant-time average
            lookup. This lets us avoid repeatedly searching through the input
            and gives us an efficient solution."
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-5">

          <div className="bg-green-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              CORRECTNESS
            </p>

            <p className="text-3xl font-black text-green-600">
              94%
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              REASONING DEPTH
            </p>

            <p className="text-3xl font-black text-indigo-600">
              82%
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              NEXT ACTION
            </p>

            <p className="font-black text-orange-600 mt-2">
              Escalate
            </p>

          </div>

        </div>

      </div>

      {/* Difficulty Ladder */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <ArrowUp className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Adaptive Difficulty Ladder
              </h2>

              <p className="text-sm text-gray-500">
                Follow-up depth increases as understanding improves.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowLevels(!showLevels)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showLevels ? "Hide Levels" : "Show Levels"}
          </button>

        </div>

        {showLevels && (
          <div className="space-y-4 mt-6">

            {levels.map((level) => (

              <button
                type="button"
                key={level.level}
                onClick={() => setCurrentLevel(level.level)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  currentLevel === level.level
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex items-center gap-4">

                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-black ${
                      currentLevel === level.level
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {level.level}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <h3 className="font-bold">
                        {level.title}
                      </h3>

                      <span className="text-xs font-bold text-indigo-600">
                        {level.difficulty}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                      {level.description}
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Current Follow-Up */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Zap
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              NEXT ADAPTIVE FOLLOW-UP
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Level {selectedFollowUp.level} — {selectedFollowUp.question}
            </h2>

            <p className="text-gray-600 mt-2">
              Purpose: {selectedFollowUp.purpose}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  DIFFICULTY
                </p>

                <p className="font-black text-orange-600 mt-1">
                  {levels[selectedFollowUp.level - 1].difficulty}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  TRIGGER
                </p>

                <p className="font-black text-indigo-600 mt-1">
                  {selectedFollowUp.trigger}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  ADAPTIVE
                </p>

                <p className="font-black text-green-600 mt-1">
                  Yes
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Follow-Up Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <MessageSquare className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Follow-Up Question Bank
              </h2>

              <p className="text-sm text-gray-500">
                Questions become progressively deeper as performance improves.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFollowUps(!showFollowUps)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFollowUps
              ? "Hide Questions"
              : "Show Questions"}
          </button>

        </div>

        {showFollowUps && (
          <div className="space-y-4 mt-6">

            {followUps.map((item) => (

              <button
                type="button"
                key={item.level}
                onClick={() => setSelectedFollowUp(item)}
                className={`w-full text-left border rounded-xl p-5 transition ${
                  selectedFollowUp.level === item.level
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex gap-4">

                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {item.level}
                  </div>

                  <div>

                    <p className="font-semibold">
                      {item.question}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      Trigger: {item.trigger}
                    </p>

                    <p className="text-sm text-indigo-600 font-semibold mt-1">
                      Purpose: {item.purpose}
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Adaptive Controls */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              AI INTERVIEW CONTROLLER
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Adjust difficulty from candidate performance
            </h2>

            <p className="text-gray-600 mt-2">
              A strong response should trigger deeper questioning. A weak
              response should allow the candidate to reinforce the concept
              before the interview becomes more difficult.
            </p>

            <div className="flex flex-wrap gap-3 mt-5">

              <button
                type="button"
                onClick={advanceDifficulty}
                className="px-4 py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2"
              >
                Escalate Difficulty
                <ArrowUp size={18} />
              </button>

              <button
                type="button"
                onClick={reinforceDifficulty}
                className="px-4 py-3 rounded-xl bg-orange-500 text-white font-semibold flex items-center gap-2"
              >
                Reinforce Concept
                <RefreshCw size={18} />
              </button>

            </div>

            {escalated && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Strong response detected. Follow-up difficulty increased to
                Level {currentLevel}.
              </div>
            )}

            {reinforced && (
              <div className="bg-orange-100 text-orange-800 rounded-xl p-4 mt-4 font-semibold">
                Additional reinforcement selected. The next question will
                focus on strengthening the current concept.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Coaching */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Follow-Up Coaching
              </h2>

              <p className="text-sm text-gray-500">
                Prepare for progressively deeper interviewer questions.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowCoaching(!showCoaching)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showCoaching ? "Hide Questions" : "Show Questions"}
          </button>

        </div>

        {showCoaching && (
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
                AI Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve performance under adaptive interviewer pressure.
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
                Adaptive Interview Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How follow-up difficulty changes throughout the interview.
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

      {/* Start */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={advanceDifficulty}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Generate Next Follow-Up
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Result */}
      {escalated && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                ADAPTIVE FOLLOW-UP GENERATED
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Interview difficulty increased to Level {currentLevel}.
              </h2>

              <p className="text-gray-600 mt-2">
                The candidate demonstrated sufficient understanding at the
                previous level, so the AI introduced a deeper technical
                challenge.
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
              AI INTERVIEW PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Strong answers should unlock deeper questions.
            </h2>

            <p className="text-gray-600 mt-2">
              Real interviewers adapt to what a candidate demonstrates.
              Progressive follow-ups make mock interviews more realistic by
              testing basic understanding first and deeper reasoning only when
              the candidate is ready.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}