import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  GitBranch,
  BookOpen,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

const skillMappings = [
  {
    activity: "Array & HashMap Practice",
    concept: "Data Structures",
    skill: "Problem Solving",
    requirement: "Strong algorithmic problem solving",
    coverage: "Covered",
    score: 92,
    reason:
      "Regular practice demonstrates strong ability to select and apply common data structures.",
  },
  {
    activity: "System Design Practice",
    concept: "Distributed Systems",
    skill: "System Design",
    requirement: "Design scalable backend systems",
    coverage: "Partially Covered",
    score: 68,
    reason:
      "Core architecture concepts are practiced, but scalability and reliability require more evidence.",
  },
  {
    activity: "Mock Interview",
    concept: "Technical Communication",
    skill: "Communication",
    requirement: "Clearly explain technical decisions",
    coverage: "Covered",
    score: 84,
    reason:
      "Mock interviews provide direct evidence of explaining technical reasoning.",
  },
  {
    activity: "Behavioral Question Practice",
    concept: "Behavioral Preparation",
    skill: "Behavioral Communication",
    requirement: "Demonstrate collaboration and leadership",
    coverage: "Partially Covered",
    score: 61,
    reason:
      "Practice exists, but several behavioral competency areas have limited evidence.",
  },
  {
    activity: "Advanced Database Revision",
    concept: "Database Systems",
    skill: "Backend Engineering",
    requirement: "Database design and optimization",
    coverage: "Missing",
    score: 38,
    reason:
      "Current preparation does not provide enough evidence for advanced database optimization.",
  },
];

const roleRequirements = [
  {
    requirement: "Algorithmic Problem Solving",
    status: "Covered",
    importance: "High",
  },
  {
    requirement: "System Design",
    status: "Partially Covered",
    importance: "High",
  },
  {
    requirement: "Technical Communication",
    status: "Covered",
    importance: "High",
  },
  {
    requirement: "Behavioral Communication",
    status: "Partially Covered",
    importance: "Medium",
  },
  {
    requirement: "Database Design",
    status: "Missing",
    importance: "High",
  },
  {
    requirement: "Scalability & Reliability",
    status: "Missing",
    importance: "High",
  },
];

const recommendations = [
  "Complete targeted database design and query optimization practice.",
  "Practice scalability and reliability scenarios in system-design questions.",
  "Complete behavioral questions focused on leadership and collaboration.",
  "Continue mock interviews to maintain technical communication strength.",
];

export default function AIInterviewPreparationTargetRoleSkillMapper() {
  const [selectedMapping, setSelectedMapping] = useState(null);
  const [showRecommendations, setShowRecommendations] =
    useState(false);

  const covered = skillMappings.filter(
    (item) => item.coverage === "Covered"
  ).length;

  const partial = skillMappings.filter(
    (item) => item.coverage === "Partially Covered"
  ).length;

  const missing = skillMappings.filter(
    (item) => item.coverage === "Missing"
  ).length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Target Role Skill Mapper
          </h1>

          <p className="text-gray-500">
            Connect every preparation activity to the skills and competencies
            required for your target interview role.
          </p>
        </div>

      </div>

      {/* Target Role */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              TARGET ROLE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Software Engineer
            </h2>

            <p className="text-gray-600 mt-2">
              AI maps your preparation against the competencies expected for
              this role instead of treating every activity independently.
            </p>

          </div>

        </div>

      </div>

      {/* Coverage Summary */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <GitBranch
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Requirements Mapped
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {roleRequirements.length}
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

        </div>

      </div>

      {/* Mapping Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <GitBranch className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Preparation-to-Role Mapping
            </h2>

            <p className="text-sm text-gray-500">
              AI traces each activity through the concepts and skills it
              develops.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {[
            "Preparation Activity",
            "Concept",
            "Skill",
            "Role Requirement",
          ].map((step, index, array) => (

            <React.Fragment key={step}>

              <span
                className={`px-4 py-3 rounded-xl font-semibold text-sm ${
                  index === array.length - 1
                    ? "bg-green-100 text-green-700"
                    : "bg-indigo-50 text-indigo-700"
                }`}
              >
                {step}
              </span>

              {index < array.length - 1 && (
                <ArrowRight
                  className="text-gray-400"
                  size={18}
                />
              )}

            </React.Fragment>
          ))}

        </div>

      </div>

      {/* Skill Mapping */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BookOpen className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Activity Skill Mapping
            </h2>

            <p className="text-sm text-gray-500">
              Select an activity to see which target-role competency it
              contributes toward.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {skillMappings.map((mapping) => (

            <button
              type="button"
              key={mapping.activity}
              onClick={() => setSelectedMapping(mapping)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedMapping?.activity === mapping.activity
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <BookOpen size={22} />
                </div>

                <div className="flex-1">

                  <h3 className="font-bold">
                    {mapping.activity}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {mapping.concept} → {mapping.skill}
                  </p>

                </div>

                <ArrowRight
                  className="text-gray-400"
                  size={20}
                />

                <div>

                  <p className="text-xs text-gray-500">
                    Role Requirement
                  </p>

                  <p className="font-semibold text-indigo-700 mt-1">
                    {mapping.requirement}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    mapping.coverage === "Covered"
                      ? "bg-green-100 text-green-700"
                      : mapping.coverage === "Missing"
                      ? "bg-red-100 text-red-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {mapping.coverage}
                </span>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Mapping */}
      {selectedMapping && (
        <div className="bg-indigo-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <Lightbulb
              className="text-indigo-600"
              size={30}
            />

            <div className="flex-1">

              <p className="text-xs font-bold text-indigo-600">
                AI SKILL MAPPING DETAIL
              </p>

              <h2 className="text-xl font-bold text-indigo-800 mt-1">
                {selectedMapping.activity}
              </h2>

              <div className="flex flex-wrap items-center gap-2 mt-4">

                <span className="px-3 py-2 rounded-xl bg-white text-sm font-semibold">
                  {selectedMapping.activity}
                </span>

                <ArrowRight size={18} />

                <span className="px-3 py-2 rounded-xl bg-white text-sm font-semibold">
                  {selectedMapping.concept}
                </span>

                <ArrowRight size={18} />

                <span className="px-3 py-2 rounded-xl bg-white text-sm font-semibold">
                  {selectedMapping.skill}
                </span>

                <ArrowRight size={18} />

                <span className="px-3 py-2 rounded-xl bg-green-100 text-green-700 text-sm font-semibold">
                  {selectedMapping.requirement}
                </span>

              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-5">

                <div className="bg-white rounded-xl p-5">

                  <p className="text-xs font-bold text-gray-500">
                    COVERAGE SCORE
                  </p>

                  <p className="text-3xl font-black text-indigo-600 mt-1">
                    {selectedMapping.score}%
                  </p>

                </div>

                <div className="bg-white rounded-xl p-5">

                  <p className="text-xs font-bold text-gray-500">
                    AI REASONING
                  </p>

                  <p className="text-sm text-gray-600 mt-2">
                    {selectedMapping.reason}
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Role Requirements */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Target Role Requirements
            </h2>

            <p className="text-sm text-gray-500">
              Current preparation coverage against expected role competencies.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {roleRequirements.map((requirement) => (

            <div
              key={requirement.requirement}
              className="border rounded-xl p-5"
            >

              <div className="flex items-center gap-4">

                {requirement.status === "Covered" ? (
                  <CheckCircle2
                    className="text-green-600"
                    size={24}
                  />
                ) : requirement.status === "Missing" ? (
                  <XCircle
                    className="text-red-600"
                    size={24}
                  />
                ) : (
                  <AlertTriangle
                    className="text-orange-600"
                    size={24}
                  />
                )}

                <div className="flex-1">

                  <h3 className="font-bold">
                    {requirement.requirement}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Importance: {requirement.importance}
                  </p>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    requirement.status === "Covered"
                      ? "bg-green-100 text-green-700"
                      : requirement.status === "Missing"
                      ? "bg-red-100 text-red-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {requirement.status}
                </span>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Missing Competencies */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <XCircle
            className="text-red-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-red-600">
              MISSING COMPETENCIES
            </p>

            <h2 className="text-xl font-bold text-red-800 mt-1">
              Some high-impact requirements are not yet covered.
            </h2>

            <div className="space-y-3 mt-4">

              <div className="bg-white rounded-xl p-4">
                <p className="font-semibold">
                  Database Design & Optimization
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  No strong preparation evidence found for advanced database
                  optimization.
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="font-semibold">
                  Scalability & Reliability
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  More practice is needed around high-load and failure
                  scenarios.
                </p>
              </div>

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
                AI Preparation Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Prioritized actions based on uncovered target-role skills.
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
          <div className="space-y-3 mt-6">

            {recommendations.map((recommendation, index) => (

              <div
                key={recommendation}
                className="flex gap-4 border rounded-xl p-4"
              >

                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <p className="font-semibold">
                  {recommendation}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Strategy */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI STRATEGY
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Prioritize preparation by role impact.
            </h2>

            <p className="text-gray-600 mt-2">
              Completing more activities does not automatically mean better
              preparation. Focus first on activities that strengthen important
              role requirements that currently have weak or missing evidence.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}