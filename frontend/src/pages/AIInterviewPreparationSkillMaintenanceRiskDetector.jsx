import React, { useState } from "react";
import {
  Brain,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  Clock3,
  TrendingDown,
  Target,
  RefreshCw,
  Lightbulb,
  ArrowRight,
  BarChart3,
} from "lucide-react";

const skills = [
  {
    name: "Arrays & Strings",
    mastery: 94,
    daysSincePractice: 2,
    frequency: 4,
    recentPerformance: 93,
    risk: "Low Risk",
    riskScore: 12,
    recommendation:
      "Continue normal maintenance practice once or twice per week.",
  },
  {
    name: "Data Structures",
    mastery: 91,
    daysSincePractice: 8,
    frequency: 2,
    recentPerformance: 86,
    risk: "Watch",
    riskScore: 39,
    recommendation:
      "Schedule a short revision session to prevent gradual performance decline.",
  },
  {
    name: "Dynamic Programming",
    mastery: 88,
    daysSincePractice: 18,
    frequency: 1,
    recentPerformance: 72,
    risk: "At Risk",
    riskScore: 78,
    recommendation:
      "Prioritize a focused practice session with medium-difficulty problems.",
  },
  {
    name: "System Design",
    mastery: 85,
    daysSincePractice: 14,
    frequency: 1,
    recentPerformance: 76,
    risk: "Watch",
    riskScore: 57,
    recommendation:
      "Complete one system-design discussion and review previous mistakes.",
  },
  {
    name: "SQL & Databases",
    mastery: 90,
    daysSincePractice: 25,
    frequency: 0,
    recentPerformance: 68,
    risk: "At Risk",
    riskScore: 84,
    recommendation:
      "Revisit SQL joins, indexing, and query optimization before the next interview.",
  },
];

const riskFactors = [
  {
    name: "Practice Recency",
    score: 82,
    description:
      "Longer gaps since the last practice session increase maintenance risk.",
  },
  {
    name: "Historical Mastery",
    score: 67,
    description:
      "Previously strong skills receive some protection, but mastery is not treated as permanent.",
  },
  {
    name: "Practice Frequency",
    score: 71,
    description:
      "Infrequent practice increases the likelihood of forgetting or slower recall.",
  },
  {
    name: "Recent Performance",
    score: 79,
    description:
      "Recent declines on related questions provide evidence of possible skill decay.",
  },
  {
    name: "Related Concept Performance",
    score: 64,
    description:
      "Performance on connected concepts helps detect indirect weakening.",
  },
];

const maintenanceActions = [
  {
    title: "Dynamic Programming",
    priority: "High",
    reason:
      "Performance has dropped while practice frequency remains low.",
    action:
      "Complete 3–5 targeted problems and review common recurrence patterns.",
  },
  {
    title: "SQL & Databases",
    priority: "High",
    reason:
      "No recent practice combined with declining related performance.",
    action:
      "Practice joins, aggregation, indexing, and query optimization.",
  },
  {
    title: "System Design",
    priority: "Medium",
    reason:
      "The skill remains strong but has not been practiced recently.",
    action:
      "Complete one short architecture exercise this week.",
  },
];

const workflow = [
  {
    title: "Track Practice",
    description: "Record recent activity for each skill.",
  },
  {
    title: "Measure Mastery",
    description: "Use historical performance as a baseline.",
  },
  {
    title: "Detect Decline",
    description: "Compare recent and historical performance.",
  },
  {
    title: "Assign Risk",
    description: "Classify maintenance risk.",
  },
  {
    title: "Schedule",
    description: "Recommend proactive revision.",
  },
];

export default function AIInterviewPreparationSkillMaintenanceRiskDetector() {
  const [selectedSkill, setSelectedSkill] = useState(skills[2]);
  const [showSkills, setShowSkills] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [detected, setDetected] = useState(false);

  const atRiskCount = skills.filter(
    (skill) => skill.risk === "At Risk"
  ).length;

  const watchCount = skills.filter(
    (skill) => skill.risk === "Watch"
  ).length;

  const lowRiskCount = skills.filter(
    (skill) => skill.risk === "Low Risk"
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
            AI Skill Maintenance Risk Detector
          </h1>

          <p className="text-gray-500">
            Detect previously learned skills that may weaken when they are not
            practiced regularly.
          </p>

        </div>

      </div>

      {/* Main Risk Summary */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-orange-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-orange-600">
                {atRiskCount}
              </p>

              <p className="text-xs text-gray-500">
                at risk
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              SKILL MAINTENANCE STATUS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {atRiskCount} Skills Need Attention
            </h2>

            <p className="text-gray-600 mt-2">
              Some previously strong skills have not been practiced recently
              and are showing signs of performance decline.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-red-50 rounded-xl p-5">

            <ShieldAlert
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              At Risk
            </p>

            <p className="text-3xl font-black text-red-600">
              {atRiskCount}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Watch
            </p>

            <p className="text-3xl font-black text-orange-600">
              {watchCount}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Low Risk
            </p>

            <p className="text-3xl font-black text-green-600">
              {lowRiskCount}
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Target
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Skills Tracked
            </p>

            <p className="text-3xl font-black text-purple-600">
              {skills.length}
            </p>

          </div>

        </div>

      </div>

      {/* Skill Risk Overview */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Skill Maintenance Risk Overview
              </h2>

              <p className="text-sm text-gray-500">
                Skills are classified based on recency, mastery, frequency,
                and recent performance.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowSkills(!showSkills)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showSkills ? "Hide Skills" : "Show Skills"}
          </button>

        </div>

        {showSkills && (
          <div className="space-y-4 mt-6">

            {skills.map((skill) => (

              <button
                type="button"
                key={skill.name}
                onClick={() => setSelectedSkill(skill)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedSkill.name === skill.name
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <div>

                        <h3 className="font-bold">
                          {skill.name}
                        </h3>

                        <p className="text-xs text-gray-500 mt-1">
                          Last practiced {skill.daysSincePractice} days ago
                        </p>

                      </div>

                      <span
                        className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                          skill.risk === "At Risk"
                            ? "bg-red-100 text-red-700"
                            : skill.risk === "Watch"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {skill.risk}
                      </span>

                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mt-4">

                      <div>

                        <p className="text-xs text-gray-500">
                          MASTERY
                        </p>

                        <p className="font-black text-indigo-600">
                          {skill.mastery}%
                        </p>

                      </div>

                      <div>

                        <p className="text-xs text-gray-500">
                          RECENT PERFORMANCE
                        </p>

                        <p className="font-black">
                          {skill.recentPerformance}%
                        </p>

                      </div>

                      <div>

                        <p className="text-xs text-gray-500">
                          PRACTICE/WEEK
                        </p>

                        <p className="font-black text-purple-600">
                          {skill.frequency}
                        </p>

                      </div>

                    </div>

                    <div className="h-3 bg-gray-200 rounded-full mt-4">

                      <div
                        className={`h-full rounded-full ${
                          skill.risk === "At Risk"
                            ? "bg-red-500"
                            : skill.risk === "Watch"
                            ? "bg-orange-500"
                            : "bg-green-500"
                        }`}
                        style={{
                          width: `${skill.riskScore}%`,
                        }}
                      />

                    </div>

                    <p className="text-xs text-gray-500 mt-2">
                      Maintenance risk: {skill.riskScore}/100
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Skill */}
      <div
        className={`rounded-2xl p-6 ${
          selectedSkill.risk === "At Risk"
            ? "bg-red-50"
            : selectedSkill.risk === "Watch"
            ? "bg-orange-50"
            : "bg-green-50"
        }`}
      >

        <div className="flex gap-4">

          <ShieldAlert
            className={
              selectedSkill.risk === "At Risk"
                ? "text-red-600"
                : selectedSkill.risk === "Watch"
                ? "text-orange-600"
                : "text-green-600"
            }
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold">
              SELECTED SKILL
            </p>

            <h2 className="text-xl font-bold mt-1">
              {selectedSkill.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedSkill.recommendation}
            </p>

            <div className="grid md:grid-cols-4 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  MASTERY
                </p>

                <p className="text-3xl font-black text-indigo-600 mt-1">
                  {selectedSkill.mastery}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  LAST PRACTICE
                </p>

                <p className="text-3xl font-black text-orange-600 mt-1">
                  {selectedSkill.daysSincePractice}
                </p>

                <p className="text-xs text-gray-500">
                  days ago
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  RECENT SCORE
                </p>

                <p className="text-3xl font-black text-purple-600 mt-1">
                  {selectedSkill.recentPerformance}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  RISK
                </p>

                <p className="text-xl font-black mt-2">
                  {selectedSkill.risk}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Risk Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Maintenance Risk Factors
              </h2>

              <p className="text-sm text-gray-500">
                Signals used to detect possible skill decline.
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

            {riskFactors.map((factor) => (

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

      {/* Maintenance Actions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Recommended Maintenance Actions
              </h2>

              <p className="text-sm text-gray-500">
                Proactive practice recommendations for skills showing decline.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowActions(!showActions)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showActions ? "Hide Actions" : "Show Actions"}
          </button>

        </div>

        {showActions && (
          <div className="space-y-4 mt-6">

            {maintenanceActions.map((item, index) => (

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
                        className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                          item.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {item.priority} Priority
                      </span>

                    </div>

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
                Skill Maintenance Detection Flow
              </h2>

              <p className="text-sm text-gray-500">
                From practice history to proactive maintenance.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowWorkflow(!showWorkflow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWorkflow ? "Hide Flow" : "Show Flow"}
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

      {/* Detection */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setDetected(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Detect Maintenance Risks
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Result */}
      {detected && (
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
                Maintenance risks identified successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                {atRiskCount} skills are currently at risk and {watchCount}{" "}
                additional skills should be monitored. The system recommends
                short maintenance sessions instead of treating previously
                mastered skills as permanently completed.
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
              Mastery should be maintained, not permanently marked complete.
            </h2>

            <p className="text-gray-600 mt-2">
              A previously strong skill can weaken when it is ignored for too
              long. Regular lightweight maintenance helps preserve recall,
              speed, and confidence while allowing most preparation time to
              remain focused on current weaknesses.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}