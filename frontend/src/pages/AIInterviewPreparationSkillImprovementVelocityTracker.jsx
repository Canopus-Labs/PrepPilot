import React, { useState } from "react";
import {
  Brain,
  TrendingUp,
  Target,
  Zap,
  Clock,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ArrowRight,
} from "lucide-react";

const skills = [
  {
    name: "Data Structures",
    initial: 52,
    current: 86,
    improvement: 34,
    velocity: "Fast",
    attempts: 18,
    practice: "4 sessions/week",
  },
  {
    name: "Algorithms",
    initial: 48,
    current: 72,
    improvement: 24,
    velocity: "Moderate",
    attempts: 27,
    practice: "3 sessions/week",
  },
  {
    name: "System Design",
    initial: 42,
    current: 55,
    improvement: 13,
    velocity: "Slow",
    attempts: 31,
    practice: "2 sessions/week",
  },
];

const workflow = [
  "Record Initial Level",
  "Track Practice",
  "Measure Improvement",
  "Calculate Velocity",
  "Recommend Allocation",
];

export default function AIInterviewPreparationSkillImprovementVelocityTracker() {
  const [showSkills, setShowSkills] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(0);
  const [refreshed, setRefreshed] = useState(false);

  const selected = skills[selectedSkill];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Skill Improvement Velocity Tracker
          </h1>

          <p className="text-gray-500">
            Measure how quickly each interview skill improves with practice.
          </p>
        </div>

      </div>

      {/* Main Result */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <TrendingUp className="text-indigo-600" size={32} />
          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              IMPROVEMENT VELOCITY
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Data Structures — Fast
            </h2>

            <p className="text-gray-600 mt-2">
              This skill improved significantly with relatively few practice
              attempts compared with your other tracked skills.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <Target className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Initial Level
            </p>

            <p className="text-3xl font-black text-indigo-600">
              52%
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Current Level
            </p>

            <p className="text-3xl font-black text-green-600">
              86%
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <TrendingUp className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Improvement
            </p>

            <p className="text-3xl font-black text-purple-600">
              +34%
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <Zap className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Velocity
            </p>

            <p className="text-xl font-black text-orange-600">
              Fast
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <BarChart3 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Efficiency
            </p>

            <p className="text-xl font-black text-green-600">
              High
            </p>
          </div>

        </div>

      </div>

      {/* Skill Comparison */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Skill Improvement Comparison
              </h2>

              <p className="text-sm text-gray-500">
                Compare progress velocity across interview skills.
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

            {skills.map((skill, index) => (

              <button
                type="button"
                key={skill.name}
                onClick={() => setSelectedSkill(index)}
                className={`w-full text-left border rounded-2xl p-5 ${
                  selectedSkill === index
                    ? "border-indigo-500 bg-indigo-50"
                    : ""
                }`}
              >

                <div className="flex items-center gap-4">

                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
                    <TrendingUp
                      className="text-indigo-600"
                      size={20}
                    />
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between">

                      <h3 className="font-bold">
                        {skill.name}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          skill.velocity === "Fast"
                            ? "bg-green-100 text-green-700"
                            : skill.velocity === "Moderate"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {skill.velocity}
                      </span>

                    </div>

                    <div className="flex gap-5 text-sm text-gray-500 mt-2">

                      <span>
                        {skill.initial}% → {skill.current}%
                      </span>

                      <span>
                        +{skill.improvement}%
                      </span>

                      <span>
                        {skill.attempts} attempts
                      </span>

                    </div>

                    <div className="h-3 bg-gray-200 rounded-full mt-4">

                      <div
                        className="h-full rounded-full bg-indigo-500"
                        style={{
                          width: `${skill.current}%`,
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

      {/* Selected Skill */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              {selected.name} — Velocity Analysis
            </h2>

            <p className="text-sm text-gray-500">
              Detailed improvement measurements for the selected skill.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              Initial Score
            </p>

            <p className="text-3xl font-black mt-1">
              {selected.initial}%
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              Current Score
            </p>

            <p className="text-3xl font-black mt-1">
              {selected.current}%
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              Improvement
            </p>

            <p className="text-3xl font-black text-green-600 mt-1">
              +{selected.improvement}%
            </p>

          </div>

          <div className="bg-gray-50 rounded-xl p-5">

            <p className="text-xs text-gray-500">
              Attempts
            </p>

            <p className="text-3xl font-black mt-1">
              {selected.attempts}
            </p>

          </div>

        </div>

        <div className="bg-indigo-50 rounded-xl p-5 mt-5">

          <p className="text-xs font-bold text-indigo-600">
            PRACTICE FREQUENCY
          </p>

          <p className="font-bold text-indigo-800 mt-1">
            {selected.practice}
          </p>

        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Zap
            className="text-green-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI INSIGHT
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Fast improvement does not mean unlimited improvement.
            </h2>

            <p className="text-gray-600 mt-2">
              Your recent gains are strong, but future improvement may slow as
              you approach higher mastery. The AI should continue measuring
              performance rather than assuming the current velocity will remain
              constant.
            </p>

          </div>

        </div>

      </div>

      {/* Improvement Velocity Classification */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Improvement Velocity Classification
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Velocity is based on improvement relative to practice effort and
          time.
        </p>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          <div className="border border-green-200 rounded-2xl p-5">

            <TrendingUp
              className="text-green-600"
              size={25}
            />

            <h3 className="font-bold text-green-700 mt-3">
              Fast
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Strong improvement with relatively few attempts.
            </p>

          </div>

          <div className="border border-orange-200 rounded-2xl p-5">

            <Clock
              className="text-orange-600"
              size={25}
            />

            <h3 className="font-bold text-orange-700 mt-3">
              Moderate
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Steady improvement requiring consistent practice.
            </p>

          </div>

          <div className="border border-red-200 rounded-2xl p-5">

            <AlertTriangle
              className="text-red-600"
              size={25}
            />

            <h3 className="font-bold text-red-700 mt-3">
              Slow
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Limited improvement despite repeated practice.
            </p>

          </div>

        </div>

      </div>

      {/* Preparation Allocation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Target
            className="text-indigo-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              PREPARATION ALLOCATION
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Prioritize slow-improving skills strategically.
            </h2>

            <p className="text-gray-600 mt-2">
              System Design currently has the lowest improvement velocity.
              Consider allocating additional practice time while maintaining
              lightweight practice for fast-improving skills.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  FAST
                </p>

                <p className="font-bold text-green-700 mt-1">
                  Maintain
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  MODERATE
                </p>

                <p className="font-bold text-orange-700 mt-1">
                  Continue
                </p>

              </div>

              <div className="bg-white rounded-xl p-4">

                <p className="text-xs text-gray-500">
                  SLOW
                </p>

                <p className="font-bold text-red-700 mt-1">
                  Increase Focus
                </p>

              </div>

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
              Update Improvement Velocity
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Recalculate skill velocity after new practice sessions.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Refresh Analysis
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Skill improvement velocity updated successfully.
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
                Velocity Tracking Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI measures skill improvement speed.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowWorkflow(!showWorkflow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWorkflow ? "Hide Workflow" : "Show Workflow"}
          </button>

        </div>

        {showWorkflow && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            {workflow.map((step, index) => (

              <React.Fragment key={step}>

                <div className="border rounded-xl p-4 min-w-[150px]">

                  <p className="text-xs font-bold text-indigo-600">
                    STEP {index + 1}
                  </p>

                  <p className="font-bold mt-1">
                    {step}
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
              AI PREPARATION PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Current skill level does not tell the whole story.
            </h2>

            <p className="text-gray-600 mt-2">
              Two skills with similar scores may require very different amounts
              of effort. Improvement velocity helps identify where additional
              preparation time can have the greatest impact.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}