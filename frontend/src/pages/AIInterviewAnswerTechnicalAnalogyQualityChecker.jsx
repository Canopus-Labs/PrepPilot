import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target,
  MessageSquare,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const analogyChecks = [
  {
    name: "Concept Relevance",
    score: 91,
    status: "Strong",
    description: "The analogy maps well to the main technical concept.",
  },
  {
    name: "Technical Accuracy",
    score: 78,
    status: "Good",
    description: "Most relationships are technically consistent.",
  },
  {
    name: "Misleading Risk",
    score: 32,
    status: "Low",
    description: "Only a small part of the analogy may cause confusion.",
  },
  {
    name: "Concept Coverage",
    score: 74,
    status: "Needs Improvement",
    description: "Some important technical details are not represented.",
  },
];

const analogyExamples = [
  {
    title: "Cache Analogy",
    analogy:
      "A cache is like keeping frequently used books on your desk instead of walking to the library every time.",
    concept: "Caching",
    quality: 91,
    strength:
      "Clearly represents faster access to frequently requested data.",
    limitation:
      "Does not fully represent cache invalidation or consistency.",
  },
  {
    title: "Load Balancer Analogy",
    analogy:
      "A load balancer is like a receptionist directing visitors to different available employees.",
    concept: "Load Balancing",
    quality: 88,
    strength:
      "Clearly represents distributing incoming requests across available servers.",
    limitation:
      "Does not explain health checks or routing algorithms.",
  },
  {
    title: "Database Index Analogy",
    analogy:
      "A database index is like the index at the back of a textbook.",
    concept: "Database Indexing",
    quality: 95,
    strength:
      "Strongly represents faster lookup without scanning every record.",
    limitation:
      "Does not represent additional storage and write overhead.",
  },
];

const coachingQuestions = [
  "Which technical relationship does your analogy represent?",
  "What part of the real system does the analogy fail to represent?",
  "Could this analogy cause the interviewer to form an incorrect assumption?",
  "Can you explain the technical concept without the analogy?",
  "What technical detail should you add after giving the analogy?",
];

const recommendations = [
  {
    title: "State the Mapping",
    reason:
      "An analogy becomes more useful when the candidate explicitly connects it to the technical concept.",
    action:
      "Explain which part of the analogy corresponds to each important system component.",
  },
  {
    title: "Mention the Limitation",
    reason:
      "No analogy perfectly represents a technical system.",
    action:
      "Briefly identify what the analogy does not capture.",
  },
  {
    title: "Avoid Over-Simplification",
    reason:
      "An easy comparison can accidentally hide important technical behavior.",
    action:
      "Follow the analogy with the actual technical explanation.",
  },
];

const workflow = [
  {
    title: "Detect",
    description: "Identify analogies in the answer.",
  },
  {
    title: "Map",
    description: "Connect analogy to technical concepts.",
  },
  {
    title: "Evaluate",
    description: "Check accuracy and relevance.",
  },
  {
    title: "Flag",
    description: "Identify misleading comparisons.",
  },
  {
    title: "Improve",
    description: "Suggest a clearer analogy.",
  },
];

export default function AIInterviewAnswerTechnicalAnalogyQualityChecker() {
  const [selectedExample, setSelectedExample] =
    useState(analogyExamples[0]);

  const [showChecks, setShowChecks] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const averageScore = Math.round(
    analogyChecks.reduce(
      (sum, item) => sum + item.score,
      0
    ) / analogyChecks.length
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
            AI Technical Analogy Quality Checker
          </h1>

          <p className="text-gray-500">
            Evaluate whether technical analogies make complex interview
            explanations clearer without introducing misleading ideas.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {averageScore}%
              </p>

              <p className="text-xs text-gray-500">
                Quality
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              ANALOGY QUALITY SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Strong Technical Analogy
            </h2>

            <p className="text-gray-600 mt-2">
              The analogy communicates the main concept effectively, but the AI
              identified a few technical limitations that should be clarified.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <MessageSquare
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Analogies Detected
            </p>

            <p className="text-3xl font-black text-indigo-600">
              3
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Relevant
            </p>

            <p className="text-3xl font-black text-green-600">
              91%
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Missing Details
            </p>

            <p className="text-3xl font-black text-orange-600">
              26%
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <Target
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Misleading Risk
            </p>

            <p className="text-3xl font-black text-red-600">
              Low
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
              Candidate Technical Explanation
            </h2>

            <p className="text-sm text-gray-500">
              The AI identifies and evaluates analogies used in the response.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-6">

          <p className="text-xs font-bold text-gray-500">
            CANDIDATE
          </p>

          <p className="text-gray-700 leading-7 mt-3">
            "A cache is like keeping frequently used books on your desk.
            Instead of going to the library every time you need a book, you
            keep the books you use most often nearby so they can be accessed
            faster."
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-5">

          <div className="bg-green-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              RELEVANCE
            </p>

            <p className="text-3xl font-black text-green-600">
              91%
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              CLARITY
            </p>

            <p className="text-3xl font-black text-indigo-600">
              94%
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              LIMITATION
            </p>

            <p className="font-black text-orange-600 mt-2">
              Cache invalidation
            </p>

          </div>

        </div>

      </div>

      {/* Analogy Checks */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Analogy Quality Analysis
              </h2>

              <p className="text-sm text-gray-500">
                Evaluate the analogy across multiple technical dimensions.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowChecks(!showChecks)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showChecks ? "Hide Analysis" : "Show Analysis"}
          </button>

        </div>

        {showChecks && (
          <div className="space-y-4 mt-6">

            {analogyChecks.map((check) => (

              <div
                key={check.name}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <h3 className="font-bold">
                      {check.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {check.description}
                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 h-fit rounded-full text-xs font-bold ${
                      check.status === "Strong"
                        ? "bg-green-100 text-green-700"
                        : check.status === "Good"
                        ? "bg-indigo-100 text-indigo-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {check.status}
                  </span>

                </div>

                <div className="flex items-center gap-3 mt-4">

                  <div className="flex-1 h-3 bg-gray-200 rounded-full">

                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{
                        width: `${check.score}%`,
                      }}
                    />

                  </div>

                  <span className="font-bold">
                    {check.score}%
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Strength and Limitation */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              AI ANALOGY REVIEW
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedExample.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  WHAT WORKS
                </p>

                <p className="text-sm text-gray-700 mt-2">
                  {selectedExample.strength}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  LIMITATION
                </p>

                <p className="text-sm text-gray-700 mt-2">
                  {selectedExample.limitation}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Examples */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="font-bold text-lg">
              Analogy Examples
            </h2>

            <p className="text-sm text-gray-500">
              Compare different analogies and their technical quality.
            </p>

          </div>

          <button
            type="button"
            onClick={() => setShowExamples(!showExamples)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showExamples
              ? "Hide Examples"
              : "Show Examples"}
          </button>

        </div>

        {showExamples && (
          <div className="space-y-4 mt-6">

            {analogyExamples.map((example) => (

              <button
                type="button"
                key={example.title}
                onClick={() => setSelectedExample(example)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedExample.title === example.title
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <h3 className="font-bold">
                      {example.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {example.analogy}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-2xl font-black text-indigo-600">
                      {example.quality}%
                    </p>

                    <p className="text-xs text-gray-500">
                      Quality
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Coaching */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Analogy Coaching
              </h2>

              <p className="text-sm text-gray-500">
                Practice explaining technical concepts without misleading
                simplifications.
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
                Improve technical analogies used during interviews.
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

      {/* Analyze Button */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Technical Analogy
          <ArrowRight size={18} />
        </button>

      </div>

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
                Analogy is technically useful with one clarification.
              </h2>

              <p className="text-gray-600 mt-2">
                The analogy successfully communicates the primary concept.
                Add the limitation identified by the AI to prevent the
                explanation from becoming overly simplified.
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
                Analogy Evaluation Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI checks whether an analogy improves technical
                communication.
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
              An analogy should simplify the concept, not distort it.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong candidates use analogies to make difficult concepts easier
              to understand while still clearly explaining the actual technical
              behavior and limitations.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}