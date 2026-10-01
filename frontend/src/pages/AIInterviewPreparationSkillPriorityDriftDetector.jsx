import React, { useState } from "react";
import {
  Brain,
  Target,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  BarChart3,
  Lightbulb,
  RefreshCw,
} from "lucide-react";

const skills = [
  {
    skill: "Algorithms",
    planned: 25,
    actual: 18,
    importance: "High",
    status: "Drifting",
  },
  {
    skill: "System Design",
    planned: 25,
    actual: 12,
    importance: "High",
    status: "Neglected",
  },
  {
    skill: "Technical Communication",
    planned: 15,
    actual: 10,
    importance: "High",
    status: "Slight Drift",
  },
  {
    skill: "Databases",
    planned: 15,
    actual: 28,
    importance: "Medium",
    status: "Over-practiced",
  },
  {
    skill: "Behavioral",
    planned: 10,
    actual: 7,
    importance: "Medium",
    status: "Aligned",
  },
  {
    skill: "Debugging",
    planned: 10,
    actual: 25,
    importance: "Medium",
    status: "Over-practiced",
  },
];

const recommendations = [
  {
    title: "Increase System Design Practice",
    reason:
      "System Design is a high-priority target-role skill but currently receives less than half of its planned preparation allocation.",
    action:
      "Complete 2 system-design sessions before adding more low-priority practice.",
  },
  {
    title: "Reduce Database Over-practice",
    reason:
      "Database preparation is significantly above the planned allocation.",
    action:
      "Temporarily reduce database sessions and redirect time toward system design.",
  },
  {
    title: "Balance Debugging Practice",
    reason:
      "Debugging activity has grown beyond its planned allocation.",
    action:
      "Use debugging selectively while recovering neglected high-impact skills.",
  },
];

const activityHistory = [
  {
    week: "Week 1",
    algorithms: 24,
    systemDesign: 24,
    databases: 16,
    debugging: 12,
  },
  {
    week: "Week 2",
    algorithms: 22,
    systemDesign: 20,
    databases: 20,
    debugging: 14,
  },
  {
    week: "Week 3",
    algorithms: 20,
    systemDesign: 15,
    databases: 23,
    debugging: 20,
  },
  {
    week: "Week 4",
    algorithms: 18,
    systemDesign: 12,
    databases: 28,
    debugging: 25,
  },
];

export default function AIInterviewPreparationSkillPriorityDriftDetector() {
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [detected, setDetected] = useState(false);

  const neglectedSkills = skills.filter(
    (skill) => skill.status === "Neglected"
  );

  const overPracticed = skills.filter(
    (skill) => skill.status === "Over-practiced"
  );

  const totalPlanned = skills.reduce(
    (sum, skill) => sum + skill.planned,
    0
  );

  const totalActual = skills.reduce(
    (sum, skill) => sum + skill.actual,
    0
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
            AI Skill Priority Drift Detector
          </h1>

          <p className="text-gray-500">
            Detect when your actual preparation starts moving away from the
            skills that matter most for your target role.
          </p>

        </div>

      </div>

      {/* Drift Alert */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-5 items-center">

          <div className="w-20 h-20 rounded-full bg-white border-8 border-orange-500 flex items-center justify-center">

            <AlertTriangle
              className="text-orange-600"
              size={34}
            />

          </div>

          <div>

            <p className="text-xs font-bold text-orange-600">
              PRIORITY DRIFT DETECTED
            </p>

            <h2 className="text-2xl font-black text-orange-800 mt-1">
              Your preparation is drifting toward lower-priority topics.
            </h2>

            <p className="text-gray-600 mt-2">
              System Design is receiving significantly less preparation than
              planned, while Database and Debugging practice has increased.
            </p>

          </div>

        </div>

      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Target
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Planned Allocation
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {totalPlanned}%
            </p>

          </div>

          <div className="bg-blue-50 rounded-xl p-5">

            <BarChart3
              className="text-blue-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Actual Allocation
            </p>

            <p className="text-3xl font-black text-blue-600">
              {totalActual}%
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <TrendingDown
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Neglected Skills
            </p>

            <p className="text-3xl font-black text-red-600">
              {neglectedSkills.length}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <TrendingUp
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Over-practiced
            </p>

            <p className="text-3xl font-black text-orange-600">
              {overPracticed.length}
            </p>

          </div>

        </div>

      </div>

      {/* Planned vs Actual */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BarChart3 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Planned vs Actual Preparation
            </h2>

            <p className="text-sm text-gray-500">
              Compare your intended preparation distribution with your actual
              activity.
            </p>

          </div>

        </div>

        <div className="space-y-5 mt-6">

          {skills.map((skill) => {

            const difference = skill.actual - skill.planned;

            return (
              <button
                type="button"
                key={skill.skill}
                onClick={() => setSelectedSkill(skill)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedSkill?.skill === skill.skill
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="flex-1">

                    <div className="flex justify-between">

                      <h3 className="font-bold">
                        {skill.skill}
                      </h3>

                      <span
                        className={`text-xs font-semibold ${
                          difference > 3
                            ? "text-orange-600"
                            : difference < -3
                            ? "text-red-600"
                            : "text-green-600"
                        }`}
                      >
                        {difference > 0 ? "+" : ""}
                        {difference}%
                      </span>

                    </div>

                    <div className="relative h-3 bg-gray-200 rounded-full mt-3">

                      <div
                        className="absolute top-0 left-0 h-full bg-gray-400 rounded-full"
                        style={{
                          width: `${skill.planned}%`,
                        }}
                      />

                      <div
                        className={`absolute top-0 left-0 h-full rounded-full ${
                          difference > 3
                            ? "bg-orange-500"
                            : difference < -3
                            ? "bg-red-500"
                            : "bg-green-500"
                        }`}
                        style={{
                          width: `${skill.actual}%`,
                        }}
                      />

                    </div>

                    <div className="flex justify-between text-xs text-gray-500 mt-2">

                      <span>
                        Planned: {skill.planned}%
                      </span>

                      <span>
                        Actual: {skill.actual}%
                      </span>

                    </div>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      skill.status === "Neglected"
                        ? "bg-red-100 text-red-700"
                        : skill.status === "Over-practiced"
                        ? "bg-orange-100 text-orange-700"
                        : skill.status === "Aligned"
                        ? "bg-green-100 text-green-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {skill.status}
                  </span>

                </div>

              </button>
            );
          })}

        </div>

      </div>

      {/* Selected Skill */}
      {selectedSkill && (
        <div className="bg-indigo-50 rounded-2xl p-6">

          <div className="flex gap-4">

            {selectedSkill.actual < selectedSkill.planned ? (
              <TrendingDown
                className="text-red-600"
                size={30}
              />
            ) : (
              <TrendingUp
                className="text-orange-600"
                size={30}
              />
            )}

            <div>

              <p className="text-xs font-bold text-indigo-600">
                SKILL DRIFT ANALYSIS
              </p>

              <h2 className="text-xl font-bold text-indigo-800 mt-1">
                {selectedSkill.skill}
              </h2>

              <p className="text-gray-600 mt-2">
                Planned allocation was{" "}
                <strong>{selectedSkill.planned}%</strong>, while actual
                preparation is{" "}
                <strong>{selectedSkill.actual}%</strong>.
              </p>

              <div className="bg-white rounded-xl p-5 mt-5">

                <p className="text-xs font-bold text-indigo-600">
                  AI INTERPRETATION
                </p>

                <p className="text-sm text-gray-600 mt-2">

                  {selectedSkill.actual <
                  selectedSkill.planned
                    ? `You are spending ${selectedSkill.planned - selectedSkill.actual}% less time than planned on this skill. Because it is a ${selectedSkill.importance.toLowerCase()}-priority competency, consider redirecting preparation time toward it.`
                    : `You are spending ${selectedSkill.actual - selectedSkill.planned}% more time than planned on this skill. Consider whether additional practice is producing meaningful improvement before continuing at the same level.`}

                </p>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Priority Drift Timeline */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <TrendingDown className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Preparation Distribution Over Time
              </h2>

              <p className="text-sm text-gray-500">
                See how your preparation priorities have changed.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowHistory(!showHistory)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showHistory ? "Hide Timeline" : "Show Timeline"}
          </button>

        </div>

        {showHistory && (
          <div className="space-y-5 mt-6">

            {activityHistory.map((week) => (

              <div
                key={week.week}
                className="border rounded-xl p-5"
              >

                <h3 className="font-bold">
                  {week.week}
                </h3>

                <div className="grid md:grid-cols-4 gap-4 mt-4">

                  <div>
                    <p className="text-xs text-gray-500">
                      Algorithms
                    </p>
                    <p className="font-bold">
                      {week.algorithms}%
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      System Design
                    </p>
                    <p className="font-bold">
                      {week.systemDesign}%
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Databases
                    </p>
                    <p className="font-bold">
                      {week.databases}%
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Debugging
                    </p>
                    <p className="font-bold">
                      {week.debugging}%
                    </p>
                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Neglected High Impact */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-red-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-red-600">
              NEGLECTED HIGH-IMPACT SKILLS
            </p>

            <h2 className="text-xl font-bold text-red-800 mt-1">
              Refocus your preparation
            </h2>

            <div className="space-y-3 mt-4">

              {neglectedSkills.map((skill) => (

                <div
                  key={skill.skill}
                  className="bg-white rounded-xl p-4 flex items-center gap-4"
                >

                  <TrendingDown
                    className="text-red-600"
                    size={22}
                  />

                  <div className="flex-1">

                    <p className="font-semibold">
                      {skill.skill}
                    </p>

                    <p className="text-sm text-gray-500">
                      Planned {skill.planned}% → Actual {skill.actual}%
                    </p>

                  </div>

                  <span className="text-red-600 font-bold">
                    -{skill.planned - skill.actual}%
                  </span>

                </div>
              ))}

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
                AI Priority Adjustments
              </h2>

              <p className="text-sm text-gray-500">
                Recommended actions to bring preparation back on track.
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

            {recommendations.map((recommendation, index) => (

              <div
                key={recommendation.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {recommendation.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {recommendation.reason}
                    </p>

                    <p className="text-sm font-semibold text-indigo-700 mt-2">
                      Action: {recommendation.action}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Drift Detection Logic */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              AI Priority Drift Detection Flow
            </h2>

            <p className="text-sm text-gray-500">
              The system compares intended preparation with actual behavior.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {[
            "Planned Priorities",
            "Actual Activity",
            "Compare Distribution",
            "Detect Drift",
            "Identify Neglected Skills",
            "Recommend Adjustment",
          ].map((step, index, array) => (

            <React.Fragment key={step}>

              <span
                className={`px-4 py-2 rounded-xl font-semibold text-sm ${
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

      {/* Detect Button */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setDetected(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Detect Priority Drift
          <ArrowRight size={18} />
        </button>

      </div>

      {detected && (
        <div className="bg-green-50 rounded-xl p-4">

          <div className="flex gap-3">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-green-700">
              Priority drift analysis completed. High-impact neglected skills
              have been identified.
            </p>

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
              Practice should follow impact, not convenience.
            </h2>

            <p className="text-gray-600 mt-2">
              The system should detect when users naturally gravitate toward
              easier or more interesting topics and help redirect preparation
              toward high-impact skills required by the target role.
            </p>

          </div>

        </div>

      </div>

      {/* Reset */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => {
            setSelectedSkill(null);
            setShowRecommendations(false);
            setShowHistory(false);
            setDetected(false);
          }}
          className="px-5 py-3 rounded-xl border font-semibold flex items-center gap-2"
        >
          <RefreshCw size={18} />
          Reset Analysis
        </button>

      </div>

    </div>
  );
}