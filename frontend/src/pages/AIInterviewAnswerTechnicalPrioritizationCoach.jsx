import React, { useState } from "react";
import {
  Brain,
  Target,
  ListOrdered,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BarChart3,
  MessageSquare,
  RefreshCw,
} from "lucide-react";

const answerPoints = [
  {
    title: "Core Solution",
    priority: "Critical",
    score: 96,
    time: "20 sec",
    description:
      "Directly answers the main technical objective and should be communicated first.",
  },
  {
    title: "Key Reasoning",
    priority: "High",
    score: 88,
    time: "25 sec",
    description:
      "Explains why the selected approach satisfies the main requirements.",
  },
  {
    title: "Complexity",
    priority: "High",
    score: 84,
    time: "15 sec",
    description:
      "Provides the time and space implications of the proposed solution.",
  },
  {
    title: "Trade-Offs",
    priority: "Medium",
    score: 69,
    time: "15 sec",
    description:
      "Useful when the interviewer wants deeper engineering reasoning.",
  },
  {
    title: "Implementation Details",
    priority: "Low",
    score: 43,
    time: "Optional",
    description:
      "Useful only if the interviewer asks for additional implementation detail.",
  },
];

const answerStructure = [
  {
    step: "1",
    title: "Direct Answer",
    description: "State the proposed solution immediately.",
    duration: "20 sec",
  },
  {
    step: "2",
    title: "Key Reasoning",
    description: "Explain why the approach fits the requirements.",
    duration: "25 sec",
  },
  {
    step: "3",
    title: "Complexity",
    description: "Mention time and space complexity.",
    duration: "15 sec",
  },
  {
    step: "4",
    title: "Trade-Off",
    description: "Mention the most relevant limitation or alternative.",
    duration: "15 sec",
  },
  {
    step: "5",
    title: "Details on Demand",
    description: "Expand only when the interviewer asks.",
    duration: "Optional",
  },
];

const communicationFactors = [
  {
    name: "Core Objective Identification",
    score: 91,
    description:
      "The main requirement of the question is correctly identified.",
  },
  {
    name: "Information Prioritization",
    score: 78,
    description:
      "Important information is generally prioritized, but secondary details appear too early.",
  },
  {
    name: "Answer Structure",
    score: 84,
    description:
      "The answer has a logical flow but can become more concise.",
  },
  {
    name: "Time Awareness",
    score: 71,
    description:
      "The candidate sometimes spends too much time on implementation details.",
  },
  {
    name: "Technical Relevance",
    score: 89,
    description:
      "Most communicated information is technically relevant to the question.",
  },
];

const coachingQuestions = [
  "What is the interviewer actually asking you to solve?",
  "Which point would become a problem if you did not mention it?",
  "Can the interviewer understand your main approach in the first 20 seconds?",
  "Which technical detail can be explained only if the interviewer asks?",
  "What is the single strongest reason for choosing this approach?",
];

const recommendations = [
  {
    title: "Lead With the Solution",
    reason:
      "The interviewer should understand your proposed direction before hearing implementation details.",
    action:
      "State the core approach in one or two sentences before explaining supporting details.",
  },
  {
    title: "Move Secondary Details Later",
    reason:
      "Low-priority implementation details currently consume valuable interview time.",
    action:
      "Keep them available as optional follow-up material.",
  },
  {
    title: "Use a Priority-Based Structure",
    reason:
      "A consistent structure makes technical answers easier to follow.",
    action:
      "Use: solution → reasoning → complexity → trade-off → optional details.",
  },
];

const coachFlow = [
  {
    title: "Understand",
    description: "Identify the question objective.",
  },
  {
    title: "Rank",
    description: "Prioritize answer information.",
  },
  {
    title: "Structure",
    description: "Build the explanation order.",
  },
  {
    title: "Compress",
    description: "Remove low-value details.",
  },
  {
    title: "Practice",
    description: "Deliver the prioritized answer.",
  },
];

export default function AIInterviewAnswerTechnicalPrioritizationCoach() {
  const [selectedPoint, setSelectedPoint] = useState(answerPoints[0]);
  const [showPoints, setShowPoints] = useState(false);
  const [showStructure, setShowStructure] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [coached, setCoached] = useState(false);

  const priorityScore = 82;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Answer Prioritization Coach
          </h1>

          <p className="text-gray-500">
            Learn what technical information should come first when interview
            time is limited.
          </p>
        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">
              <p className="text-3xl font-black text-indigo-700">
                {priorityScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>
            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              ANSWER PRIORITIZATION SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Strong With Minor Ordering Gaps
            </h2>

            <p className="text-gray-600 mt-2">
              Your answers contain relevant technical information, but some
              secondary details should be moved later to make the core solution
              clearer and faster to communicate.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <ListOrdered className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Priority Score
            </p>

            <p className="text-3xl font-black text-indigo-600">
              82%
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <Target className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Core Relevance
            </p>

            <p className="text-3xl font-black text-green-600">
              91%
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <Clock3 className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Time Efficiency
            </p>

            <p className="text-3xl font-black text-orange-600">
              71%
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <MessageSquare
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Structure
            </p>

            <p className="text-3xl font-black text-purple-600">
              84%
            </p>
          </div>

        </div>

      </div>

      {/* Core Objective */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Question Core Objective
            </h2>

            <p className="text-sm text-gray-500">
              The AI first identifies what the interviewer most needs to hear.
            </p>
          </div>

        </div>

        <div className="bg-indigo-50 rounded-xl p-5 mt-6">

          <p className="text-xs font-bold text-indigo-600">
            INTERVIEW OBJECTIVE
          </p>

          <h3 className="text-xl font-bold text-indigo-800 mt-2">
            Explain the most suitable technical approach and justify why it
            satisfies the main requirements.
          </h3>

          <p className="text-sm text-gray-600 mt-3">
            The answer should prioritize the solution, reasoning, complexity,
            and relevant trade-offs before optional implementation details.
          </p>

        </div>

      </div>

      {/* Answer Point Ranking */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <ListOrdered className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Answer Point Priority Ranking
              </h2>

              <p className="text-sm text-gray-500">
                Rank information according to interview value.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowPoints(!showPoints)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showPoints ? "Hide Ranking" : "Show Ranking"}
          </button>

        </div>

        {showPoints && (
          <div className="space-y-4 mt-6">

            {answerPoints.map((point, index) => (

              <button
                type="button"
                key={point.title}
                onClick={() => setSelectedPoint(point)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedPoint.title === point.title
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <div>

                        <h3 className="font-bold">
                          {point.title}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          {point.description}
                        </p>

                      </div>

                      <div className="text-right">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            point.priority === "Critical"
                              ? "bg-red-100 text-red-700"
                              : point.priority === "High"
                              ? "bg-indigo-100 text-indigo-700"
                              : point.priority === "Medium"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {point.priority}
                        </span>

                        <p className="text-xs text-gray-500 mt-2">
                          {point.time}
                        </p>

                      </div>

                    </div>

                    <div className="h-3 bg-gray-200 rounded-full mt-4">

                      <div
                        className={`h-full rounded-full ${
                          point.score >= 90
                            ? "bg-red-500"
                            : point.score >= 80
                            ? "bg-indigo-500"
                            : point.score >= 60
                            ? "bg-orange-500"
                            : "bg-gray-500"
                        }`}
                        style={{
                          width: `${point.score}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Point */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              SELECTED ANSWER POINT
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedPoint.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedPoint.description}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">
                <p className="text-xs text-gray-500">
                  PRIORITY
                </p>

                <p className="text-xl font-black text-indigo-600 mt-1">
                  {selectedPoint.priority}
                </p>
              </div>

              <div className="bg-white rounded-xl p-5">
                <p className="text-xs text-gray-500">
                  SCORE
                </p>

                <p className="text-3xl font-black mt-1">
                  {selectedPoint.score}
                </p>
              </div>

              <div className="bg-white rounded-xl p-5">
                <p className="text-xs text-gray-500">
                  RECOMMENDED TIME
                </p>

                <p className="text-xl font-black text-purple-600 mt-1">
                  {selectedPoint.time}
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Recommended Structure */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <ArrowRight className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Recommended Answer Order
              </h2>

              <p className="text-sm text-gray-500">
                A concise structure that puts the highest-value information
                first.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowStructure(!showStructure)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showStructure ? "Hide Structure" : "Show Structure"}
          </button>

        </div>

        {showStructure && (
          <div className="space-y-3 mt-6">

            {answerStructure.map((item, index) => (

              <div
                key={item.step}
                className="border rounded-xl p-5 flex gap-4"
              >

                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black shrink-0">
                  {item.step}
                </div>

                <div className="flex-1">

                  <div className="flex justify-between gap-4">

                    <h3 className="font-bold">
                      {item.title}
                    </h3>

                    <span className="text-xs font-semibold text-indigo-600">
                      {item.duration}
                    </span>

                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    {item.description}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Communication Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Communication Priority Analysis
              </h2>

              <p className="text-sm text-gray-500">
                Signals used to evaluate technical information prioritization.
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

            {communicationFactors.map((factor) => (

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
                AI Prioritization Questions
              </h2>

              <p className="text-sm text-gray-500">
                The coach helps candidates decide what belongs first in an
                answer.
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
          <div className="space-y-3 mt-6">

            {coachingQuestions.map((question, index) => (

              <div
                key={question}
                className="border rounded-xl p-4 flex gap-3"
              >

                <div className="w-8 h-8 shrink-0 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
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
                AI Coach Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve technical communication by focusing on high-value
                information first.
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
                Prioritization Coaching Flow
              </h2>

              <p className="text-sm text-gray-500">
                Turn a detailed technical answer into a focused interview
                response.
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

            {coachFlow.map((step, index) => (

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

                {index < coachFlow.length - 1 && (
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

      {/* Coach Button */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setCoached(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Answer Priority
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Result */}
      {coached && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                COACHING COMPLETE
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Your answer should lead with the core solution.
              </h2>

              <p className="text-gray-600 mt-2">
                Recommended order:{" "}
                <strong>
                  solution → reasoning → complexity → trade-off → optional
                  implementation details
                </strong>
                .
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
              Communicate the highest-value information first.
            </h2>

            <p className="text-gray-600 mt-2">
              A strong technical answer does not need every possible detail.
              It should first establish the solution and reasoning, then
              provide deeper implementation details only when they add value
              or the interviewer asks for them.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}