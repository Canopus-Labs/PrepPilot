import React, { useState } from "react";
import {
  Brain,
  Users,
  Target,
  CheckCircle2,
  Lightbulb,
  MessageSquare,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const audiences = [
  {
    name: "Recruiter",
    depth: 35,
    terminology: "Low",
    focus: "Impact and simple explanation",
  },
  {
    name: "Software Engineer",
    depth: 70,
    terminology: "Medium",
    focus: "Implementation and technical reasoning",
  },
  {
    name: "Technical Lead",
    depth: 82,
    terminology: "High",
    focus: "Trade-offs and engineering decisions",
  },
  {
    name: "System Architect",
    depth: 95,
    terminology: "Expert",
    focus: "Architecture, scalability, and constraints",
  },
];

const guidance = [
  {
    audience: "Recruiter",
    explanation:
      "Caching stores frequently used information temporarily so applications can retrieve it faster and reduce repeated work.",
    recommendation:
      "Focus on business impact rather than implementation details.",
  },
  {
    audience: "Software Engineer",
    explanation:
      "A cache such as Redis can store frequently requested data and reduce repeated database queries, improving response latency.",
    recommendation:
      "Explain the implementation and expected performance improvement.",
  },
  {
    audience: "Technical Lead",
    explanation:
      "We introduced Redis caching for frequently accessed data to reduce database load and improve latency, while considering cache invalidation and consistency trade-offs.",
    recommendation:
      "Discuss engineering trade-offs and operational considerations.",
  },
  {
    audience: "System Architect",
    explanation:
      "A distributed cache can reduce database pressure and latency at scale, but requires decisions around consistency, invalidation, replication, eviction policies, and failure recovery.",
    recommendation:
      "Focus on architecture, scalability, reliability, and system constraints.",
  },
];

const evaluationAreas = [
  {
    title: "Audience Alignment",
    score: 92,
    description:
      "The explanation is appropriately adapted to the selected audience.",
  },
  {
    title: "Technical Accuracy",
    score: 95,
    description:
      "The core technical meaning remains consistent across adaptations.",
  },
  {
    title: "Depth Control",
    score: 88,
    description:
      "The amount of technical detail matches the expected audience.",
  },
  {
    title: "Terminology Selection",
    score: 86,
    description:
      "Technical terminology is adjusted without unnecessarily complicating the explanation.",
  },
];

const recommendations = [
  {
    title: "Start With Audience Needs",
    reason:
      "Different interviewers need different levels of technical detail.",
    action:
      "Identify the interviewer's expected technical depth before beginning the explanation.",
  },
  {
    title: "Preserve the Core Meaning",
    reason:
      "Simplifying an explanation should not change the underlying technical claim.",
    action:
      "Keep the main concept, result, and reasoning consistent across audiences.",
  },
  {
    title: "Adjust Terminology",
    reason:
      "Highly specialized terminology can make an explanation unnecessarily difficult for non-technical audiences.",
    action:
      "Use precise terminology when appropriate and briefly explain specialized terms when needed.",
  },
];

const coachingQuestions = [
  "Who is the intended audience for this explanation?",
  "What does this audience already understand?",
  "Which technical details are necessary for this audience?",
  "Which terminology should be simplified or explained?",
  "Can you explain the same concept at two different technical depths?",
];

const workflow = [
  {
    title: "Identify",
    description: "Determine the intended audience.",
  },
  {
    title: "Analyze",
    description: "Evaluate the candidate's explanation.",
  },
  {
    title: "Adapt",
    description: "Adjust depth and terminology.",
  },
  {
    title: "Preserve",
    description: "Maintain the technical meaning.",
  },
  {
    title: "Coach",
    description: "Provide audience-specific guidance.",
  },
];

export default function AIInterviewAnswerTechnicalCommunicationAudienceAdapter() {
  const [selectedAudience, setSelectedAudience] =
    useState(audiences[1]);

  const [selectedGuidance, setSelectedGuidance] =
    useState(guidance[1]);

  const [showAudiences, setShowAudiences] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [adapted, setAdapted] = useState(false);

  const overallScore = Math.round(
    evaluationAreas.reduce(
      (sum, item) => sum + item.score,
      0
    ) / evaluationAreas.length
  );

  const selectAudience = (audience) => {
    setSelectedAudience(audience);

    const matchingGuidance = guidance.find(
      (item) => item.audience === audience.name
    );

    setSelectedGuidance(
      matchingGuidance || guidance[0]
    );
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
            AI Technical Communication Audience Adapter
          </h1>

          <p className="text-gray-500">
            Adapt technical explanations to different interview audiences
            without changing the core technical meaning.
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
                Alignment
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AUDIENCE ADAPTATION SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Strong Communication Flexibility
            </h2>

            <p className="text-gray-600 mt-2">
              The explanation can be adapted across audiences while
              preserving the core technical concept.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Users className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Audiences
            </p>

            <p className="text-3xl font-black text-indigo-600">
              4
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Meaning Preserved
            </p>

            <p className="text-3xl font-black text-green-600">
              95%
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <Target className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Depth Control
            </p>

            <p className="text-3xl font-black text-orange-600">
              88%
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <MessageSquare className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Terminology
            </p>

            <p className="text-3xl font-black text-purple-600">
              86%
            </p>

          </div>

        </div>

      </div>

      {/* Original Explanation */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <MessageSquare className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Core Technical Explanation
            </h2>

            <p className="text-sm text-gray-500">
              The core meaning should remain consistent across all audiences.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-6">

          <p className="text-xs font-bold text-gray-500">
            CANDIDATE EXPLANATION
          </p>

          <p className="text-gray-700 leading-7 mt-3">
            "Caching stores frequently requested data so that applications
            don't need to repeatedly retrieve the same information from the
            database. This can reduce database load and improve response
            latency."
          </p>

        </div>

      </div>

      {/* Audience Selection */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Users className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Select Interview Audience
              </h2>

              <p className="text-sm text-gray-500">
                The AI changes technical depth based on the expected audience.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowAudiences(!showAudiences)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showAudiences
              ? "Hide Audiences"
              : "Show Audiences"}
          </button>

        </div>

        {showAudiences && (
          <div className="grid md:grid-cols-4 gap-4 mt-6">

            {audiences.map((audience) => (

              <button
                type="button"
                key={audience.name}
                onClick={() => selectAudience(audience)}
                className={`text-left border rounded-2xl p-5 transition ${
                  selectedAudience.name === audience.name
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex items-center justify-between">

                  <h3 className="font-bold">
                    {audience.name}
                  </h3>

                  <span className="text-xs font-bold text-indigo-600">
                    {audience.depth}%
                  </span>

                </div>

                <p className="text-xs text-gray-500 mt-3">
                  Terminology: {audience.terminology}
                </p>

                <p className="text-sm text-gray-600 mt-3">
                  {audience.focus}
                </p>

                <div className="h-2 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${audience.depth}%`,
                    }}
                  />

                </div>

              </button>

            ))}

          </div>
        )}

      </div>

      {/* Selected Audience */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              SELECTED AUDIENCE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedAudience.name}
            </h2>

            <p className="text-gray-600 mt-2">
              Recommended technical depth:{" "}
              <strong>
                {selectedAudience.depth}%
              </strong>
              . Focus on {selectedAudience.focus.toLowerCase()}.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                ADAPTED EXPLANATION
              </p>

              <p className="text-gray-700 leading-7 mt-3">
                {selectedGuidance.explanation}
              </p>

            </div>

            <div className="bg-white rounded-xl p-5 mt-4">

              <p className="text-xs font-bold text-gray-500">
                AI GUIDANCE
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                {selectedGuidance.recommendation}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Audience Comparison */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div>

          <h2 className="font-bold text-lg">
            Same Concept, Different Depth
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Compare how the explanation should change for different
            interviewers.
          </p>

        </div>

        <div className="space-y-4 mt-6">

          {guidance.map((item) => (

            <div
              key={item.audience}
              className="border rounded-2xl p-5"
            >

              <div className="flex items-center justify-between gap-4">

                <h3 className="font-bold">
                  {item.audience}
                </h3>

                <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                  {audiences.find(
                    (a) => a.name === item.audience
                  )?.depth}
                  % depth
                </span>

              </div>

              <p className="text-sm text-gray-600 mt-3">
                {item.explanation}
              </p>

            </div>

          ))}

        </div>

      </div>

      {/* Evaluation */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="font-bold text-lg">
              Audience Adaptation Analysis
            </h2>

            <p className="text-sm text-gray-500">
              Evaluate whether the explanation is appropriate for the selected
              audience.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowEvaluation(!showEvaluation)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showEvaluation
              ? "Hide Analysis"
              : "Show Analysis"}
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
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-orange-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              AI COMMUNICATION DIAGNOSIS
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Match explanation depth to the interviewer's needs
            </h2>

            <p className="text-gray-600 mt-2">
              The same technical concept should not always be explained with
              the same amount of detail. A recruiter generally needs the
              practical impact, while a technical lead may expect trade-offs
              and an architect may expect scalability and failure analysis.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                SELECTED AUDIENCE
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                {selectedAudience.name} —{" "}
                {selectedAudience.focus}
              </p>

            </div>

          </div>

        </div>

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
                Improve flexibility across different interview audiences.
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

      {/* Coaching Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Audience Adaptation Coach
              </h2>

              <p className="text-sm text-gray-500">
                Practice adjusting the same technical explanation for
                different audiences.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowQuestions(!showQuestions)
            }
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

      {/* Adapt Button */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAdapted(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Adapt Explanation
          <ArrowRight size={18} />
        </button>

      </div>

      {adapted && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                ADAPTATION COMPLETE
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Explanation adapted for {selectedAudience.name}
              </h2>

              <p className="text-gray-600 mt-2">
                The technical meaning was preserved while adjusting the depth,
                terminology, and emphasis for the selected audience.
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
                Audience Adaptation Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI transforms an explanation for different interviewers.
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
              Adapt the explanation, not the technical truth.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong interview communication means adjusting technical depth,
              terminology, and emphasis according to the audience while
              preserving the underlying technical meaning.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}