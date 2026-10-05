import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  Shuffle,
  TrendingUp,
} from "lucide-react";

const stages = [
  {
    title: "Original Problem",
    description: "Analyze the candidate's initial solution.",
  },
  {
    title: "Concept Extraction",
    description: "Identify the core reasoning and technique.",
  },
  {
    title: "New Problem",
    description: "Create a structurally different problem.",
  },
  {
    title: "Transfer",
    description: "Ask the candidate to reuse the reasoning.",
  },
  {
    title: "Compare",
    description: "Measure knowledge transfer.",
  },
];

const evaluationAreas = [
  {
    title: "Core Concept Recognition",
    score: 92,
    description:
      "Candidate correctly identified the underlying technique.",
  },
  {
    title: "Reasoning Transfer",
    score: 84,
    description:
      "Most of the original reasoning was successfully transferred.",
  },
  {
    title: "Adaptability",
    score: 79,
    description:
      "Some modifications were needed for the new structure.",
  },
  {
    title: "Independent Problem Solving",
    score: 88,
    description:
      "Candidate did not rely entirely on the original solution.",
  },
];

const coachingQuestions = [
  "What concept from the original problem still applies?",
  "Which part of your original solution no longer works?",
  "What changed structurally between the two problems?",
  "Which assumption from the original problem must be reconsidered?",
  "Can you explain the common reasoning without referring to the original code?",
];

const recommendations = [
  {
    title: "Explain the Underlying Pattern",
    reason:
      "Generalization improves when you understand why a technique works rather than memorizing its implementation.",
    action:
      "Describe the core idea independently of the original problem.",
  },
  {
    title: "Compare Structural Differences",
    reason:
      "A transferred solution may require changes when the problem structure changes.",
    action:
      "Identify which components can be reused and which must be redesigned.",
  },
  {
    title: "Practice Concept Transfer",
    reason:
      "Repeatedly applying one technique to different problem forms builds adaptable reasoning.",
    action:
      "Solve related problems without being told which technique to use.",
  },
];

const relatedProblems = [
  {
    title: "Original",
    concept: "Two-pointer technique",
    problem:
      "Find two numbers in a sorted array whose sum equals a target.",
  },
  {
    title: "Generalized",
    concept: "Same underlying reasoning",
    problem:
      "Find a pair of values across two sorted collections that satisfies a target relationship.",
  },
];

export default function AIInterviewQuestionSolutionGeneralizationTest() {
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [showProblems, setShowProblems] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);

  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [generated, setGenerated] = useState(false);

  const submitAnswer = () => {
    setSubmitted(true);
  };

  const resetChallenge = () => {
    setAnswer("");
    setSubmitted(false);
    setGenerated(false);
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
            AI Solution Generalization Test
          </h1>

          <p className="text-gray-500">
            Apply the reasoning behind one solution to a structurally different
            but conceptually related problem.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                86%
              </p>

              <p className="text-xs text-gray-500">
                Generalization
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              GENERALIZATION SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Strong Concept Transfer
            </h2>

            <p className="text-gray-600 mt-2">
              The candidate successfully transferred most of the original
              reasoning to a structurally different problem.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Shuffle
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Concept Transfer
            </p>

            <p className="text-3xl font-black text-indigo-600">
              84%
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Recognition
            </p>

            <p className="text-3xl font-black text-green-600">
              92%
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <Target
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Adaptability
            </p>

            <p className="text-3xl font-black text-orange-600">
              79%
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <TrendingUp
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Understanding
            </p>

            <p className="text-3xl font-black text-purple-600">
              88%
            </p>

          </div>

        </div>

      </div>

      {/* Original vs Generalized Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Shuffle className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Problem Transformation
              </h2>

              <p className="text-sm text-gray-500">
                The AI changes the structure while preserving the underlying
                reasoning.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowProblems(!showProblems)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showProblems ? "Hide Problems" : "Show Problems"}
          </button>

        </div>

        {showProblems && (
          <div className="grid md:grid-cols-2 gap-5 mt-6">

            {relatedProblems.map((problem) => (

              <div
                key={problem.title}
                className="border rounded-2xl p-6"
              >

                <p className="text-xs font-bold text-indigo-600">
                  {problem.title.toUpperCase()}
                </p>

                <h3 className="font-bold text-lg mt-2">
                  {problem.concept}
                </h3>

                <p className="text-gray-600 mt-3">
                  {problem.problem}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Generalization Challenge */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              GENERALIZATION CHALLENGE
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Apply the same reasoning to a new structure
            </h2>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                NEW PROBLEM
              </p>

              <p className="text-gray-700 mt-3 leading-7">
                You are given two sorted arrays. Determine whether there is one
                element from each array whose sum equals a given target.
                Explain how you would adapt the reasoning from the original
                two-pointer problem.
              </p>

            </div>

            <div className="mt-5">

              <label className="text-sm font-semibold text-gray-700">
                Explain your generalized approach
              </label>

              <textarea
                value={answer}
                onChange={(event) =>
                  setAnswer(event.target.value)
                }
                rows={5}
                placeholder="Explain which reasoning transfers, what changes, and why..."
                className="w-full mt-2 p-4 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />

            </div>

            <div className="flex flex-wrap gap-3 mt-4">

              <button
                type="button"
                onClick={submitAnswer}
                disabled={!answer.trim()}
                className="px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold flex items-center gap-2 disabled:opacity-50"
              >
                Submit Approach
                <ArrowRight size={18} />
              </button>

              <button
                type="button"
                onClick={resetChallenge}
                className="px-5 py-3 rounded-xl bg-white border font-semibold flex items-center gap-2"
              >
                Reset
                <RefreshCw size={18} />
              </button>

            </div>

            {submitted && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4">

                <p className="font-bold">
                  Generalization attempt recorded.
                </p>

                <p className="text-sm mt-1">
                  The AI can now compare your transferred reasoning with the
                  original approach.
                </p>

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Evaluation */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Generalization Evaluation
              </h2>

              <p className="text-sm text-gray-500">
                Measure whether the candidate understood the underlying
                concept rather than memorizing the original solution.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowEvaluation(!showEvaluation)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showEvaluation
              ? "Hide Evaluation"
              : "Show Evaluation"}
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

      {/* Transfer Analysis */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI TRANSFER ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Core reasoning successfully transferred
            </h2>

            <p className="text-gray-600 mt-2">
              The underlying two-pointer reasoning remains useful, but the
              candidate must adapt the pointer movement because the values come
              from separate arrays rather than one shared sequence.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                KEY INSIGHT
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                Generalization means preserving the reasoning pattern while
                changing the implementation to fit the new structure.
              </p>

            </div>

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
                AI Generalization Coach
              </h2>

              <p className="text-sm text-gray-500">
                Questions that help candidates transfer concepts independently.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowQuestions(!showQuestions)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showQuestions
              ? "Hide Questions"
              : "Show Questions"}
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
                Improve concept transfer and adaptable problem solving.
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

      {/* Generate */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setGenerated(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Generate New Generalization Test
          <ArrowRight size={18} />
        </button>

      </div>

      {generated && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                NEW TEST GENERATED
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                A structurally different problem is ready.
              </h2>

              <p className="text-gray-600 mt-2">
                The new challenge preserves the underlying concept while
                changing the problem structure to test genuine understanding.
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
                Generalization Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI converts an existing solution into a transfer
                challenge.
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

            {stages.map((stage, index) => (

              <React.Fragment key={stage.title}>

                <div className="border rounded-xl p-4 min-w-[155px]">

                  <p className="text-xs font-bold text-indigo-600">
                    STEP {index + 1}
                  </p>

                  <h3 className="font-bold mt-1">
                    {stage.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-2">
                    {stage.description}
                  </p>

                </div>

                {index < stages.length - 1 && (
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
              Understanding is demonstrated by transfer.
            </h2>

            <p className="text-gray-600 mt-2">
              A candidate who truly understands a technique should be able to
              recognize and adapt the underlying reasoning when the problem
              structure changes—not just reproduce a memorized solution.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}