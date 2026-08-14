import React, { useState } from "react";
import {
  Brain,
  BarChart3,
  Target,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Gauge,
  Clock3,
} from "lucide-react";

const sessionQuestions = [
  {
    title: "Array Frequency Counter",
    difficulty: "Easy",
    performance: 94,
    hints: 0,
    errors: 0,
  },
  {
    title: "Sliding Window Optimization",
    difficulty: "Medium",
    performance: 86,
    hints: 1,
    errors: 1,
  },
  {
    title: "Graph Shortest Path",
    difficulty: "Hard",
    performance: 68,
    hints: 2,
    errors: 2,
  },
  {
    title: "Dynamic Programming Challenge",
    difficulty: "Hard",
    performance: 61,
    hints: 3,
    errors: 2,
  },
  {
    title: "Binary Search Variation",
    difficulty: "Medium",
    performance: 82,
    hints: 1,
    errors: 1,
  },
];

const difficultyFactors = [
  {
    name: "Difficult Question Ratio",
    score: 76,
    description:
      "Measures how much of the session was spent on challenging questions.",
  },
  {
    name: "Recent Performance",
    score: 81,
    description:
      "Compares session difficulty with the candidate's recent performance.",
  },
  {
    name: "Question Progression",
    score: 88,
    description:
      "Checks whether difficulty increases gradually rather than changing abruptly.",
  },
  {
    name: "Hint Usage",
    score: 69,
    description:
      "Higher hint usage can indicate that the session is becoming too difficult.",
  },
  {
    name: "Error Frequency",
    score: 72,
    description:
      "Measures mistakes across the session to detect excessive difficulty.",
  },
  {
    name: "Session Completion",
    score: 92,
    description:
      "Considers whether the candidate completed the planned activities.",
  },
];

const coachingQuestions = [
  "Did the session become harder gradually?",
  "Which question caused the largest performance drop?",
  "Did you require more hints as difficulty increased?",
  "Were your errors concentrated in the hardest questions?",
  "Did the session challenge you without preventing completion?",
  "Would one additional hard question improve the session or overload it?",
  "What difficulty should the next session start with?",
];

const recommendations = [
  {
    title: "Maintain Gradual Difficulty Progression",
    reason:
      "The session becomes harder toward the middle and end without an extreme jump.",
    action:
      "Continue mixing easy, medium, and hard questions instead of starting immediately with the hardest problems.",
  },
  {
    title: "Reduce Hard-Question Density Slightly",
    reason:
      "Multiple hard questions produced higher hint usage and error frequency.",
    action:
      "Insert a medium reinforcement question after difficult problems.",
  },
  {
    title: "Use Performance to Adjust the Next Session",
    reason:
      "The candidate completed the session but struggled with advanced problems.",
    action:
      "Begin the next session with medium problems before returning to hard challenges.",
  },
];

const workflow = [
  {
    title: "Collect",
    description: "Record session performance.",
  },
  {
    title: "Measure",
    description: "Analyze difficulty signals.",
  },
  {
    title: "Compare",
    description: "Compare with current ability.",
  },
  {
    title: "Classify",
    description: "Rate the session difficulty.",
  },
  {
    title: "Adapt",
    description: "Adjust the next session.",
  },
];

export default function AIInterviewPreparationSessionDifficultyAnalyzer() {
  const [selectedQuestion, setSelectedQuestion] =
    useState(sessionQuestions[2]);

  const [showQuestions, setShowQuestions] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showCoaching, setShowCoaching] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const difficultyScore = 78;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Session Difficulty Analyzer
          </h1>

          <p className="text-gray-500">
            Determine whether your complete preparation session was too easy,
            balanced, or too challenging.
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
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              SESSION DIFFICULTY SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Balanced
            </h2>

            <p className="text-gray-600 mt-2">
              The session provided meaningful challenge while remaining
              achievable. Hard questions increased difficulty without causing
              excessive session failure.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <Target className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Questions
            </p>

            <p className="text-3xl font-black text-indigo-600">
              5
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <AlertTriangle className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Hard
            </p>

            <p className="text-3xl font-black text-red-600">
              2
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <Lightbulb className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Hints
            </p>

            <p className="text-3xl font-black text-orange-600">
              7
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <Gauge className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Errors
            </p>

            <p className="text-3xl font-black text-red-600">
              6
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Completion
            </p>

            <p className="text-3xl font-black text-green-600">
              100%
            </p>
          </div>

        </div>

      </div>

      {/* Session Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Session Question Progression
              </h2>

              <p className="text-sm text-gray-500">
                Review how question difficulty changed throughout the session.
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
          <div className="space-y-4 mt-6">

            {sessionQuestions.map((question, index) => (

              <button
                type="button"
                key={question.title}
                onClick={() => setSelectedQuestion(question)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedQuestion.title === question.title
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
                          {question.title}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          {question.difficulty} Difficulty
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                          question.difficulty === "Hard"
                            ? "bg-red-100 text-red-700"
                            : question.difficulty === "Medium"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {question.difficulty}
                      </span>

                    </div>

                    <div className="grid grid-cols-3 gap-3 mt-4">

                      <div>
                        <p className="text-xs text-gray-500">
                          Performance
                        </p>
                        <p className="font-bold text-indigo-600">
                          {question.performance}%
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Hints
                        </p>
                        <p className="font-bold text-orange-600">
                          {question.hints}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500">
                          Errors
                        </p>
                        <p className="font-bold text-red-600">
                          {question.errors}
                        </p>
                      </div>

                    </div>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Question */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              SELECTED SESSION SIGNAL
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedQuestion.title}
            </h2>

            <p className="text-gray-600 mt-2">
              This question provides a strong signal about whether the session
              difficulty is appropriate for the candidate.
            </p>

            <div className="grid md:grid-cols-4 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">
                <p className="text-xs text-gray-500">
                  DIFFICULTY
                </p>
                <p className="font-black text-indigo-600 mt-1">
                  {selectedQuestion.difficulty}
                </p>
              </div>

              <div className="bg-white rounded-xl p-5">
                <p className="text-xs text-gray-500">
                  PERFORMANCE
                </p>
                <p className="text-3xl font-black text-indigo-600">
                  {selectedQuestion.performance}%
                </p>
              </div>

              <div className="bg-white rounded-xl p-5">
                <p className="text-xs text-gray-500">
                  HINTS
                </p>
                <p className="text-3xl font-black text-orange-600">
                  {selectedQuestion.hints}
                </p>
              </div>

              <div className="bg-white rounded-xl p-5">
                <p className="text-xs text-gray-500">
                  ERRORS
                </p>
                <p className="text-3xl font-black text-red-600">
                  {selectedQuestion.errors}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Difficulty Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Session Difficulty Factors
              </h2>

              <p className="text-sm text-gray-500">
                Signals used to determine whether the complete session was
                appropriate.
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

            {difficultyFactors.map((factor) => (

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
                AI Session Reflection Questions
              </h2>

              <p className="text-sm text-gray-500">
                Understand whether the session challenged you at the right
                level.
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
                AI Session Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Suggestions for improving the difficulty balance of future
                sessions.
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
                Session Difficulty Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI evaluates and adapts preparation difficulty.
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

      {/* Analyze */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Session Difficulty
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
                Session classified as Balanced.
              </h2>

              <p className="text-gray-600 mt-2">
                The session provided meaningful difficulty while maintaining
                full completion. The next session should continue with medium
                questions before introducing additional hard problems.
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
              The right session is challenging, not overwhelming.
            </h2>

            <p className="text-gray-600 mt-2">
              Session difficulty should be evaluated as a complete learning
              experience. A balanced mix of achievable questions and meaningful
              challenges helps candidates improve while maintaining progress.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}