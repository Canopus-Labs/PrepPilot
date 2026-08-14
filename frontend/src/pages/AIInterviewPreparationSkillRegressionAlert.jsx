import React, { useState } from "react";
import {
  Brain,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Target,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  Activity,
} from "lucide-react";

const skills = [
  {
    name: "Binary Search",
    previous: 91,
    current: 73,
    decline: 18,
    status: "At Risk",
    concepts: "Boundary conditions, search-space reduction",
    recommendation: "Complete 3 focused binary-search problems.",
  },
  {
    name: "SQL",
    previous: 88,
    current: 82,
    decline: 6,
    status: "Watch",
    concepts: "Joins, grouping, subqueries",
    recommendation: "Review two SQL queries and one join problem.",
  },
  {
    name: "Data Structures",
    previous: 86,
    current: 87,
    decline: 0,
    status: "Stable",
    concepts: "Stacks, queues, hash maps",
    recommendation: "No additional maintenance required.",
  },
];

const maintenanceTasks = [
  {
    skill: "Binary Search",
    task: "Solve one boundary-condition problem.",
    time: "10 min",
    priority: "High",
  },
  {
    skill: "SQL",
    task: "Practice joins and aggregation.",
    time: "15 min",
    priority: "Medium",
  },
  {
    skill: "Data Structures",
    task: "Quick recall review.",
    time: "5 min",
    priority: "Low",
  },
];

const regressionReasons = [
  "No recent practice",
  "Increased question difficulty",
  "Repeated mistakes",
  "Reduced recall",
  "Long gap since mastery assessment",
];

const workflow = [
  {
    title: "Track",
    description: "Store historical skill performance.",
  },
  {
    title: "Compare",
    description: "Compare recent results with benchmarks.",
  },
  {
    title: "Detect",
    description: "Identify meaningful performance decline.",
  },
  {
    title: "Explain",
    description: "Find affected concepts.",
  },
  {
    title: "Maintain",
    description: "Recommend lightweight practice.",
  },
];

export default function AIInterviewPreparationSkillRegressionAlert() {
  const [showSkills, setShowSkills] = useState(false);
  const [showMaintenance, setShowMaintenance] = useState(false);
  const [showReasons, setShowReasons] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [refreshed, setRefreshed] = useState(false);

  const atRiskCount = skills.filter(
    (skill) => skill.status === "At Risk"
  ).length;

  const watchCount = skills.filter(
    (skill) => skill.status === "Watch"
  ).length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-red-100 text-red-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Skill Regression Alert
          </h1>

          <p className="text-gray-500">
            Detect meaningful declines in previously strong interview skills
            before they become major weaknesses.
          </p>

        </div>

      </div>

      {/* Main Alert */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
            <TrendingDown
              className="text-red-600"
              size={32}
            />
          </div>

          <div>

            <p className="text-xs font-bold text-red-600">
              REGRESSION DETECTION
            </p>

            <h2 className="text-2xl font-black text-red-800 mt-1">
              1 Skill Needs Attention
            </h2>

            <p className="text-gray-600 mt-2">
              Binary Search performance has declined significantly compared
              with your previous benchmark.
            </p>

          </div>

        </div>

      </div>

      {/* Stats */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-red-50 rounded-xl p-5">

            <TrendingDown
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
              Stable
            </p>

            <p className="text-3xl font-black text-green-600">
              1
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-5">

            <Activity
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Skills Tracked
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {skills.length}
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Target
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Maintenance Tasks
            </p>

            <p className="text-3xl font-black text-purple-600">
              {maintenanceTasks.length}
            </p>

          </div>

        </div>

      </div>

      {/* Alert Settings */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="font-bold text-lg">
              Regression Alerts
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Automatically detect meaningful declines in previously strong
              skills.
            </p>

          </div>

          <button
            type="button"
            onClick={() => setAlertsEnabled(!alertsEnabled)}
            className={`relative w-14 h-8 rounded-full transition ${
              alertsEnabled
                ? "bg-indigo-600"
                : "bg-gray-300"
            }`}
            aria-label="Toggle regression alerts"
          >

            <span
              className={`absolute top-1 w-6 h-6 bg-white rounded-full transition ${
                alertsEnabled
                  ? "left-7"
                  : "left-1"
              }`}
            />

          </button>

        </div>

        <div className="mt-5 flex items-center gap-3">

          {alertsEnabled ? (
            <>
              <CheckCircle2
                className="text-green-600"
                size={20}
              />
              <span className="text-sm text-green-700 font-semibold">
                Regression alerts are enabled.
              </span>
            </>
          ) : (
            <>
              <AlertTriangle
                className="text-orange-600"
                size={20}
              />
              <span className="text-sm text-orange-700 font-semibold">
                Regression alerts are disabled.
              </span>
            </>
          )}

        </div>

      </div>

      {/* Skill Performance */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Activity className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Skill Performance Comparison
              </h2>

              <p className="text-sm text-gray-500">
                Compare previous mastery with recent performance.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowSkills(!showSkills)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showSkills
              ? "Hide Skills"
              : "Show Skills"}
          </button>

        </div>

        {showSkills && (
          <div className="space-y-5 mt-6">

            {skills.map((skill) => (

              <div
                key={skill.name}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <div className="flex items-center gap-3">

                      <h3 className="font-bold">
                        {skill.name}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          skill.status === "At Risk"
                            ? "bg-red-100 text-red-700"
                            : skill.status === "Watch"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {skill.status}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {skill.concepts}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-sm text-gray-500">
                      Decline
                    </p>

                    <p
                      className={`text-2xl font-black ${
                        skill.decline > 10
                          ? "text-red-600"
                          : skill.decline > 0
                          ? "text-orange-600"
                          : "text-green-600"
                      }`}
                    >
                      {skill.decline > 0
                        ? `-${skill.decline}%`
                        : "0%"}
                    </p>

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-4 mt-5">

                  <div>

                    <div className="flex justify-between text-xs mb-2">

                      <span className="text-gray-500">
                        Previous Benchmark
                      </span>

                      <span className="font-bold">
                        {skill.previous}%
                      </span>

                    </div>

                    <div className="h-3 bg-gray-200 rounded-full">

                      <div
                        className="h-full bg-indigo-500 rounded-full"
                        style={{
                          width: `${skill.previous}%`,
                        }}
                      />

                    </div>

                  </div>

                  <div>

                    <div className="flex justify-between text-xs mb-2">

                      <span className="text-gray-500">
                        Recent Performance
                      </span>

                      <span className="font-bold">
                        {skill.current}%
                      </span>

                    </div>

                    <div className="h-3 bg-gray-200 rounded-full">

                      <div
                        className={`h-full rounded-full ${
                          skill.status === "At Risk"
                            ? "bg-red-500"
                            : skill.status === "Watch"
                            ? "bg-orange-500"
                            : "bg-green-500"
                        }`}
                        style={{
                          width: `${skill.current}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

                <div className="bg-gray-50 rounded-xl p-4 mt-5">

                  <p className="text-xs font-bold text-gray-500">
                    RECOMMENDED ACTION
                  </p>

                  <p className="text-sm text-gray-700 mt-1">
                    {skill.recommendation}
                  </p>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Regression Alert Detail */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-red-600 shrink-0"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-red-600">
              ACTIVE REGRESSION ALERT
            </p>

            <h2 className="text-xl font-bold text-red-800 mt-1">
              Binary Search dropped from 91% → 73%
            </h2>

            <p className="text-gray-600 mt-2">
              Your recent performance is 18 percentage points below your
              previous benchmark. The decline is large enough to trigger a
              maintenance recommendation.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                AFFECTED CONCEPTS
              </p>

              <div className="flex flex-wrap gap-2 mt-3">

                <span className="px-3 py-2 rounded-xl bg-red-100 text-red-700 text-sm font-semibold">
                  Boundary Conditions
                </span>

                <span className="px-3 py-2 rounded-xl bg-red-100 text-red-700 text-sm font-semibold">
                  Search-Space Reduction
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Regression Causes */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div>

            <h2 className="font-bold text-lg">
              Possible Regression Factors
            </h2>

            <p className="text-sm text-gray-500">
              Potential reasons why a previously strong skill may decline.
            </p>

          </div>

          <button
            type="button"
            onClick={() => setShowReasons(!showReasons)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showReasons
              ? "Hide Factors"
              : "Show Factors"}
          </button>

        </div>

        {showReasons && (
          <div className="grid md:grid-cols-2 gap-4 mt-6">

            {regressionReasons.map((reason, index) => (

              <div
                key={reason}
                className="border rounded-xl p-4 flex gap-3"
              >

                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <p className="text-sm font-semibold text-gray-700">
                  {reason}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Maintenance Plan */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-green-600" />

            <div>

              <h2 className="font-bold text-lg">
                Lightweight Maintenance Plan
              </h2>

              <p className="text-sm text-gray-500">
                Small practice activities designed to recover declining skills.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowMaintenance(!showMaintenance)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showMaintenance
              ? "Hide Plan"
              : "Show Plan"}
          </button>

        </div>

        {showMaintenance && (
          <div className="space-y-4 mt-6">

            {maintenanceTasks.map((task, index) => (

              <div
                key={`${task.skill}-${task.task}`}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <div className="flex gap-4">

                    <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    <div>

                      <h3 className="font-bold">
                        {task.skill}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {task.task}
                      </p>

                    </div>

                  </div>

                  <div className="text-right">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        task.priority === "High"
                          ? "bg-red-100 text-red-700"
                          : task.priority === "Medium"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-green-100 text-green-700"
                      }`}
                    >
                      {task.priority}
                    </span>

                    <p className="text-xs text-gray-500 mt-2">
                      {task.time}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* AI Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI RECOMMENDATION
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Maintain, don't restart
            </h2>

            <p className="text-gray-600 mt-2">
              Regression does not mean you need to relearn the entire topic.
              A short, targeted practice session can help recover the specific
              concepts that are declining.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                PRIORITY ACTION
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                Practice Binary Search boundaries for 10–15 minutes, then
                reassess performance.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Refresh */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Recheck Skill Performance
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Compare your latest practice results against historical
              benchmarks.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Run Regression Check
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Regression analysis refreshed successfully.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Regression Detection Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI identifies and responds to skill decline.
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
              Previously mastered skills still need maintenance.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong preparation is not only about learning new topics. Regular
              lightweight practice can prevent important skills from silently
              regressing while you focus on other areas.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}