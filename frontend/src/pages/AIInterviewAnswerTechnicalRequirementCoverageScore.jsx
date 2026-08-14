import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Lightbulb,
  RefreshCw,
  MessageSquare,
  ListChecks,
} from "lucide-react";

const requirements = [
  {
    title: "Scalability",
    status: "covered",
    score: 100,
    detail: "Explains horizontal scaling with multiple application servers.",
  },
  {
    title: "Database Performance",
    status: "partial",
    score: 60,
    detail: "Mentions database optimization but does not explain read replicas.",
  },
  {
    title: "Reliability",
    status: "missing",
    score: 0,
    detail: "No failure recovery or redundancy strategy was discussed.",
  },
  {
    title: "Caching",
    status: "covered",
    score: 100,
    detail: "Redis caching is included to reduce repeated database requests.",
  },
  {
    title: "Monitoring",
    status: "missing",
    score: 0,
    detail: "No monitoring, logging, or alerting strategy was mentioned.",
  },
];

const coverageSteps = [
  {
    title: "Extract",
    description: "Identify explicit and implicit requirements.",
  },
  {
    title: "Map",
    description: "Match requirements against answer content.",
  },
  {
    title: "Classify",
    description: "Mark requirements as covered, partial, or missing.",
  },
  {
    title: "Score",
    description: "Calculate overall requirement coverage.",
  },
  {
    title: "Improve",
    description: "Suggest the highest-impact missing points.",
  },
];

const recommendations = [
  {
    title: "Add Reliability",
    priority: "Critical",
    description:
      "Explain replication, failover, or redundancy to address availability requirements.",
  },
  {
    title: "Complete Database Strategy",
    priority: "High",
    description:
      "Explain how read replicas or partitioning would handle increased database load.",
  },
  {
    title: "Mention Monitoring",
    priority: "Medium",
    description:
      "Include metrics, logging, health checks, and alerts for production operation.",
  },
];

export default function AIInterviewAnswerTechnicalRequirementCoverageScore() {
  const [showRequirements, setShowRequirements] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  const covered = requirements.filter(
    (item) => item.status === "covered"
  ).length;

  const partial = requirements.filter(
    (item) => item.status === "partial"
  ).length;

  const missing = requirements.filter(
    (item) => item.status === "missing"
  ).length;

  const coverageScore = 64;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Technical Requirement Coverage Score
          </h1>

          <p className="text-gray-500">
            Measure how completely your interview answer addresses the
            requirements contained in the question.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {coverageScore}%
              </p>

              <p className="text-xs text-gray-500">
                Coverage
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              REQUIREMENT COVERAGE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Partially Complete
            </h2>

            <p className="text-gray-600 mt-2">
              Your answer addresses the main architecture but misses important
              reliability and monitoring requirements.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <ListChecks
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Requirements
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {requirements.length}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Covered
            </p>

            <p className="text-3xl font-black text-green-600">
              {covered}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Partial
            </p>

            <p className="text-3xl font-black text-orange-600">
              {partial}
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <XCircle
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Missing
            </p>

            <p className="text-3xl font-black text-red-600">
              {missing}
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Target
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Score
            </p>

            <p className="text-3xl font-black text-purple-600">
              {coverageScore}%
            </p>

          </div>

        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <MessageSquare className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Interview Question
              </h2>

              <p className="text-sm text-gray-500">
                The AI extracts requirements from the complete question.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowAnswer(!showAnswer)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showAnswer
              ? "Hide Question"
              : "Show Question"}
          </button>

        </div>

        {showAnswer && (
          <div className="bg-gray-50 rounded-2xl p-6 mt-5">

            <p className="text-gray-700 leading-7">
              "Design a scalable web application that supports a large number
              of users. Explain how you would handle high traffic, database
              performance, caching, reliability, and production monitoring."
            </p>

          </div>
        )}

      </div>

      {/* Candidate Answer */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Candidate Answer
        </h2>

        <div className="bg-gray-50 rounded-2xl p-6 mt-5">

          <p className="text-gray-700 leading-7">
            "I would place a load balancer in front of multiple application
            servers so we can scale horizontally. I would also use Redis to
            cache frequently requested data and reduce database traffic. For
            the database, I would optimize queries and indexes."
          </p>

        </div>

        <div className="bg-orange-50 rounded-xl p-5 mt-5">

          <p className="text-xs font-bold text-orange-600">
            AI OBSERVATION
          </p>

          <p className="text-sm text-gray-700 mt-2">
            The answer covers scalability and caching well, but important
            requirements around reliability and monitoring are not addressed.
          </p>

        </div>

      </div>

      {/* Requirement Coverage */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="font-bold text-lg">
              Requirement Coverage Map
            </h2>

            <p className="text-sm text-gray-500">
              Each requirement is mapped against the candidate's response.
            </p>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowRequirements(!showRequirements)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showRequirements
              ? "Hide Coverage"
              : "Show Coverage"}
          </button>

        </div>

        {showRequirements && (
          <div className="space-y-4 mt-6">

            {requirements.map((requirement) => (

              <div
                key={requirement.title}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <div className="flex items-center gap-3">

                    {requirement.status === "covered" ? (
                      <CheckCircle2
                        className="text-green-600"
                        size={22}
                      />
                    ) : requirement.status === "partial" ? (
                      <AlertTriangle
                        className="text-orange-600"
                        size={22}
                      />
                    ) : (
                      <XCircle
                        className="text-red-600"
                        size={22}
                      />
                    )}

                    <div>

                      <h3 className="font-bold">
                        {requirement.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {requirement.detail}
                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <p className="text-2xl font-black">
                      {requirement.score}%
                    </p>

                    <span
                      className={`text-xs font-bold ${
                        requirement.status === "covered"
                          ? "text-green-600"
                          : requirement.status === "partial"
                          ? "text-orange-600"
                          : "text-red-600"
                      }`}
                    >
                      {requirement.status.toUpperCase()}
                    </span>

                  </div>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className={`h-full rounded-full ${
                      requirement.status === "covered"
                        ? "bg-green-500"
                        : requirement.status === "partial"
                        ? "bg-orange-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${requirement.score}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Missing Requirements */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-red-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-red-600">
              HIGHEST-IMPACT MISSING REQUIREMENTS
            </p>

            <h2 className="text-xl font-bold text-red-800 mt-1">
              Reliability and Monitoring
            </h2>

            <p className="text-gray-600 mt-2">
              These requirements were explicitly requested but are not
              addressed in the current answer.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="font-bold">
                  Reliability
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Discuss redundancy, replication, failover, or recovery when
                  components fail.
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="font-bold">
                  Monitoring
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Mention metrics, logs, health checks, alerts, and production
                  observability.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Improvement Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Focus on requirements that have the largest effect on answer
                completeness.
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

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <h3 className="font-bold">
                        {item.title}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.priority === "Critical"
                            ? "bg-red-100 text-red-700"
                            : item.priority === "High"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.priority}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {item.description}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Better Answer */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI COMPLETENESS GUIDANCE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Complete the answer without adding unnecessary detail.
            </h2>

            <p className="text-gray-600 mt-2">
              A strong response does not need to mention everything. It should
              deliberately address the requirements that the interviewer
              explicitly asked about.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                RECOMMENDED STRUCTURE
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                Scalability → Database → Caching → Reliability → Monitoring
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Recalculate */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Recalculate Coverage
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Re-evaluate requirement coverage after improving the answer.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Update Coverage Score
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Requirement coverage analysis updated successfully.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Requirement Coverage Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI converts an interview question into actionable
                answer feedback.
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

            {coverageSteps.map((step, index) => (

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

                {index < coverageSteps.length - 1 && (
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
              Correct is not always complete.
            </h2>

            <p className="text-gray-600 mt-2">
              A technically correct answer can still miss important
              requirements. Strong interview responses explicitly connect the
              solution to the major constraints and requirements in the
              question.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}