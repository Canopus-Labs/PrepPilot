import React, { useState } from "react";
import {
  Brain,
  Target,
  TrendingUp,
  Clock,
  Scale,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  BarChart3,
  RefreshCw,
} from "lucide-react";

const skills = [
  {
    name: "Algorithms",
    current: 72,
    importance: 92,
    weakness: 68,
    improvement: 18,
    recommendedTime: 30,
  },
  {
    name: "System Design",
    current: 61,
    importance: 88,
    weakness: 82,
    improvement: 24,
    recommendedTime: 28,
  },
  {
    name: "Communication",
    current: 78,
    importance: 76,
    weakness: 54,
    improvement: 12,
    recommendedTime: 18,
  },
  {
    name: "Behavioral",
    current: 84,
    importance: 65,
    weakness: 38,
    improvement: 8,
    recommendedTime: 12,
  },
  {
    name: "Data Structures",
    current: 75,
    importance: 86,
    weakness: 59,
    improvement: 15,
    recommendedTime: 12,
  },
];

const allocations = [
  {
    name: "Balanced Plan",
    description: "Distribute preparation relatively evenly.",
    algorithms: 20,
    systemDesign: 20,
    communication: 20,
    behavioral: 20,
    dataStructures: 20,
    expectedGain: 12,
    efficiency: 68,
    recommendation: "Baseline",
  },
  {
    name: "Weakness-First Plan",
    description: "Prioritize the largest high-impact weaknesses.",
    algorithms: 28,
    systemDesign: 32,
    communication: 16,
    behavioral: 8,
    dataStructures: 16,
    expectedGain: 21,
    efficiency: 91,
    recommendation: "Recommended",
  },
  {
    name: "Technical-Heavy Plan",
    description: "Maximize coding and technical preparation.",
    algorithms: 35,
    systemDesign: 30,
    communication: 10,
    behavioral: 5,
    dataStructures: 20,
    expectedGain: 18,
    efficiency: 82,
    recommendation: "Alternative",
  },
];

const tradeOffs = [
  {
    title: "Algorithms vs Communication",
    first: "Algorithms",
    second: "Communication",
    gain:
      "Increasing algorithms practice provides a larger immediate skill gain based on the current weakness.",
    cost:
      "Reducing communication practice may leave interview explanation quality underdeveloped.",
    recommendation:
      "Keep at least a minimum communication allocation while prioritizing algorithms.",
  },
  {
    title: "System Design vs Behavioral",
    first: "System Design",
    second: "Behavioral",
    gain:
      "System design currently has both high importance and a significant mastery gap.",
    cost:
      "Reducing behavioral preparation can create avoidable gaps in non-technical rounds.",
    recommendation:
      "Prioritize system design while retaining focused behavioral revision.",
  },
  {
    title: "Data Structures vs General Revision",
    first: "Data Structures",
    second: "General Revision",
    gain:
      "Targeted data-structure practice directly addresses a role-relevant technical weakness.",
    cost:
      "Broader revision receives less time.",
    recommendation:
      "Use targeted practice instead of spending equal time across all topics.",
  },
];

const plannerFlow = [
  {
    title: "Assess Skills",
    description: "Measure current mastery and importance.",
  },
  {
    title: "Find Gaps",
    description: "Identify high-impact weaknesses.",
  },
  {
    title: "Simulate",
    description: "Compare alternative time allocations.",
  },
  {
    title: "Estimate Gain",
    description: "Predict potential improvement.",
  },
  {
    title: "Recommend",
    description: "Select the most efficient plan.",
  },
];

const recommendations = [
  {
    title: "Prioritize System Design",
    reason:
      "It combines high role importance with the largest current weakness.",
    action:
      "Allocate the largest focused block to architecture, scalability, and trade-off practice.",
  },
  {
    title: "Maintain Communication Practice",
    reason:
      "Communication is already stronger but remains important during technical interviews.",
    action:
      "Use shorter recurring practice sessions instead of eliminating communication preparation.",
  },
  {
    title: "Avoid Equal Allocation",
    reason:
      "Equal preparation does not account for differences in importance or expected improvement.",
    action:
      "Use an impact-weighted allocation instead.",
  },
];

export default function AIInterviewPreparationSkillTradeOffAnalyzer() {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);
  const [selectedPlan, setSelectedPlan] = useState(
    allocations[1]
  );
  const [showTradeOffs, setShowTradeOffs] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showFlow, setShowFlow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const averageMastery = Math.round(
    skills.reduce((sum, skill) => sum + skill.current, 0) /
      skills.length
  );

  const highImpactSkills = skills.filter(
    (skill) =>
      skill.importance >= 85 && skill.current < 70
  ).length;

  const totalRecommendedTime = skills.reduce(
    (sum, skill) => sum + skill.recommendedTime,
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
            AI Skill Trade-Off Analyzer
          </h1>

          <p className="text-gray-500">
            Compare preparation strategies and decide where limited study
            time can create the greatest interview-readiness improvement.
          </p>

        </div>

      </div>

      {/* Main Recommendation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                91
              </p>

              <p className="text-xs text-gray-500">
                efficiency
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI ALLOCATION RECOMMENDATION
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Weakness-First Plan
            </h2>

            <p className="text-gray-600 mt-2">
              This plan prioritizes high-impact weaknesses while preserving
              minimum preparation coverage for already-strong skills.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <BarChart3
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Average Mastery
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {averageMastery}%
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <AlertTriangle
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              High-Impact Gaps
            </p>

            <p className="text-3xl font-black text-red-600">
              {highImpactSkills}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <TrendingUp
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Expected Gain
            </p>

            <p className="text-3xl font-black text-green-600">
              +21%
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Clock
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Planned Allocation
            </p>

            <p className="text-3xl font-black text-purple-600">
              {totalRecommendedTime}%
            </p>

          </div>

        </div>

      </div>

      {/* Skill Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Skill Impact Analysis
            </h2>

            <p className="text-sm text-gray-500">
              Select a skill to understand why its preparation priority
              changes.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {skills.map((skill, index) => (

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

                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <div className="flex-1">

                  <div className="flex justify-between gap-4">

                    <div>

                      <h3 className="font-bold">
                        {skill.name}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        Recommended allocation:{" "}
                        {skill.recommendedTime}%
                      </p>

                    </div>

                    <span className="px-3 py-1 h-fit rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                      Importance {skill.importance}%
                    </span>

                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-4">

                    <div>

                      <div className="flex justify-between text-xs mb-1">
                        <span>Current Mastery</span>
                        <span>{skill.current}%</span>
                      </div>

                      <div className="h-3 bg-gray-200 rounded-full">

                        <div
                          className="h-full bg-indigo-500 rounded-full"
                          style={{
                            width: `${skill.current}%`,
                          }}
                        />

                      </div>

                    </div>

                    <div>

                      <div className="flex justify-between text-xs mb-1">
                        <span>Weakness</span>
                        <span>{skill.weakness}%</span>
                      </div>

                      <div className="h-3 bg-gray-200 rounded-full">

                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{
                            width: `${skill.weakness}%`,
                          }}
                        />

                      </div>

                    </div>

                    <div>

                      <div className="flex justify-between text-xs mb-1">
                        <span>Potential Gain</span>
                        <span>+{skill.improvement}%</span>
                      </div>

                      <div className="h-3 bg-gray-200 rounded-full">

                        <div
                          className="h-full bg-green-500 rounded-full"
                          style={{
                            width: `${skill.improvement * 4}%`,
                          }}
                        />

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Skill */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Scale
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              SELECTED SKILL TRADE-OFF
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedSkill.name}
            </h2>

            <p className="text-gray-600 mt-2">
              This skill receives a higher or lower allocation based on its
              importance, current mastery, weakness, and estimated improvement
              potential.
            </p>

            <div className="grid md:grid-cols-4 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  MASTERY
                </p>
                <p className="text-2xl font-black text-indigo-600 mt-1">
                  {selectedSkill.current}%
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  IMPORTANCE
                </p>
                <p className="text-2xl font-black mt-1">
                  {selectedSkill.importance}%
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  WEAKNESS
                </p>
                <p className="text-2xl font-black text-orange-600 mt-1">
                  {selectedSkill.weakness}%
                </p>
              </div>

              <div className="bg-white rounded-xl p-4">
                <p className="text-xs text-gray-500">
                  EXPECTED GAIN
                </p>
                <p className="text-2xl font-black text-green-600 mt-1">
                  +{selectedSkill.improvement}%
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Allocation Comparison */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Scale className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Preparation Allocation Comparison
            </h2>

            <p className="text-sm text-gray-500">
              Compare different ways of spending the same preparation time.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          {allocations.map((plan) => (

            <button
              type="button"
              key={plan.name}
              onClick={() => setSelectedPlan(plan)}
              className={`text-left border rounded-2xl p-5 transition ${
                selectedPlan.name === plan.name
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex justify-between gap-3">

                <h3 className="font-bold">
                  {plan.name}
                </h3>

                {plan.recommendation === "Recommended" && (
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    Recommended
                  </span>
                )}

              </div>

              <p className="text-sm text-gray-500 mt-2">
                {plan.description}
              </p>

              <div className="space-y-3 mt-5">

                <div>
                  <div className="flex justify-between text-xs">
                    <span>Algorithms</span>
                    <span>{plan.algorithms}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-full bg-indigo-500 rounded-full"
                      style={{ width: `${plan.algorithms}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <span>System Design</span>
                    <span>{plan.systemDesign}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-full bg-purple-500 rounded-full"
                      style={{ width: `${plan.systemDesign}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <span>Communication</span>
                    <span>{plan.communication}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: `${plan.communication}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs">
                    <span>Behavioral</span>
                    <span>{plan.behavioral}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full mt-1">
                    <div
                      className="h-full bg-orange-500 rounded-full"
                      style={{ width: `${plan.behavioral}%` }}
                    />
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-2 gap-3 mt-5">

                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500">
                    Expected Gain
                  </p>
                  <p className="font-black text-green-600">
                    +{plan.expectedGain}%
                  </p>
                </div>

                <div className="bg-white rounded-lg p-3">
                  <p className="text-xs text-gray-500">
                    Efficiency
                  </p>
                  <p className="font-black text-indigo-600">
                    {plan.efficiency}%
                  </p>
                </div>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Plan */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-green-600">
              SELECTED ALLOCATION
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              {selectedPlan.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedPlan.description}
            </p>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">
                <p className="text-xs text-gray-500">
                  EXPECTED IMPROVEMENT
                </p>
                <p className="text-3xl font-black text-green-600 mt-1">
                  +{selectedPlan.expectedGain}%
                </p>
              </div>

              <div className="bg-white rounded-xl p-5">
                <p className="text-xs text-gray-500">
                  ALLOCATION EFFICIENCY
                </p>
                <p className="text-3xl font-black text-indigo-600 mt-1">
                  {selectedPlan.efficiency}%
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Trade-Off Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Scale className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Skill Trade-Off Analysis
              </h2>

              <p className="text-sm text-gray-500">
                Understand what is gained and lost when preparation time moves
                between skills.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowTradeOffs(!showTradeOffs)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showTradeOffs
              ? "Hide Trade-Offs"
              : "Show Trade-Offs"}
          </button>

        </div>

        {showTradeOffs && (
          <div className="space-y-4 mt-6">

            {tradeOffs.map((tradeOff) => (

              <div
                key={tradeOff.title}
                className="border rounded-xl p-5"
              >

                <h3 className="font-bold">
                  {tradeOff.title}
                </h3>

                <div className="grid md:grid-cols-2 gap-4 mt-4">

                  <div className="bg-green-50 rounded-lg p-4">

                    <p className="text-xs font-bold text-green-600">
                      POTENTIAL GAIN
                    </p>

                    <p className="text-sm text-gray-600 mt-2">
                      {tradeOff.gain}
                    </p>

                  </div>

                  <div className="bg-orange-50 rounded-lg p-4">

                    <p className="text-xs font-bold text-orange-600">
                      TRADE-OFF COST
                    </p>

                    <p className="text-sm text-gray-600 mt-2">
                      {tradeOff.cost}
                    </p>

                  </div>

                </div>

                <p className="text-sm font-semibold text-indigo-700 mt-4">
                  Recommendation: {tradeOff.recommendation}
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
                AI Allocation Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Personalized actions for maximizing preparation efficiency.
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

      {/* Planner Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Trade-Off Analysis Flow
              </h2>

              <p className="text-sm text-gray-500">
                Convert skill data into an efficient preparation allocation.
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

            {plannerFlow.map((step, index) => (

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

                {index < plannerFlow.length - 1 && (
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
          Analyze Skill Trade-Offs
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
                Preparation allocation analysis generated successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can compare candidate skill
                levels, role importance, expected improvement, and available
                preparation time to recommend an efficient allocation.
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
              Limited preparation time should be invested strategically.
            </h2>

            <p className="text-gray-600 mt-2">
              The goal is not to maximize practice in every skill equally.
              Strong preparation balances role importance, current weaknesses,
              expected improvement, and the cost of taking time away from
              another skill.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}