import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const skills = [
  {
    name: "Data Structures",
    score: 82,
    roleImportance: 90,
    dependency: 86,
    impact: 74,
    status: "Strong",
  },
  {
    name: "Algorithms",
    score: 68,
    roleImportance: 94,
    dependency: 92,
    impact: 91,
    status: "Bottleneck",
  },
  {
    name: "System Design",
    score: 76,
    roleImportance: 88,
    dependency: 74,
    impact: 71,
    status: "Developing",
  },
  {
    name: "Communication",
    score: 84,
    roleImportance: 86,
    dependency: 62,
    impact: 58,
    status: "Strong",
  },
  {
    name: "Debugging",
    score: 73,
    roleImportance: 82,
    dependency: 78,
    impact: 67,
    status: "Developing",
  },
];

const activities = [
  {
    title: "Timed Algorithm Practice",
    description:
      "Solve medium-level algorithm problems under interview time constraints.",
    impact: "High",
    improvement: "+8–12%",
  },
  {
    title: "Algorithm Pattern Revision",
    description:
      "Review searching, sorting, sliding window, two-pointer, and graph patterns.",
    impact: "High",
    improvement: "+6–10%",
  },
  {
    title: "Algorithm Explanation Drill",
    description:
      "Explain algorithm selection, complexity, and trade-offs aloud.",
    impact: "Medium",
    improvement: "+4–7%",
  },
];

const coachingQuestions = [
  "Which algorithmic pattern causes you the most difficulty?",
  "Can you explain why your chosen algorithm is appropriate?",
  "Which prerequisite skill is affecting your algorithm performance?",
  "What happens to your performance when solving under time pressure?",
  "Which activity would most directly improve this bottleneck?",
];

const recommendations = [
  {
    title: "Prioritize Algorithms",
    reason:
      "Algorithms combine high role importance with a relatively low current score.",
    action:
      "Allocate a larger portion of preparation time to algorithmic problem solving.",
  },
  {
    title: "Practice Under Time Constraints",
    reason:
      "Timed practice reveals whether the weakness persists under realistic interview pressure.",
    action:
      "Complete medium-level problems within a fixed interview-style time limit.",
  },
  {
    title: "Strengthen Algorithm Patterns",
    reason:
      "Pattern recognition can reduce the time required to identify an appropriate approach.",
    action:
      "Practice related problems without being shown the technique beforehand.",
  },
];

const workflow = [
  {
    title: "Collect",
    description: "Gather current skill performance.",
  },
  {
    title: "Compare",
    description: "Compare skills with role requirements.",
  },
  {
    title: "Map",
    description: "Analyze skill dependencies.",
  },
  {
    title: "Rank",
    description: "Calculate potential impact.",
  },
  {
    title: "Target",
    description: "Recommend focused improvement.",
  },
];

export default function AIInterviewPreparationSkillBottleneckAnalyzer() {
  const [showSkills, setShowSkills] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(skills[1]);
  const [generated, setGenerated] = useState(false);

  const bottleneck = [...skills].sort(
    (a, b) => b.impact - a.impact
  )[0];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Skill Bottleneck Analyzer
          </h1>

          <p className="text-gray-500">
            Identify the single skill currently having the largest impact on
            your overall interview readiness.
          </p>

        </div>

      </div>

      {/* Main Bottleneck */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-orange-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-orange-700">
                {bottleneck.impact}%
              </p>

              <p className="text-xs text-gray-500">
                Impact
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-orange-600">
              CURRENT READINESS BOTTLENECK
            </p>

            <h2 className="text-2xl font-black text-orange-800 mt-1">
              {bottleneck.name}
            </h2>

            <p className="text-gray-600 mt-2">
              This skill has the strongest combination of weakness, role
              importance, and dependency impact.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Target
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Current Skill
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {bottleneck.score}%
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <AlertTriangle
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Bottleneck Impact
            </p>

            <p className="text-3xl font-black text-red-600">
              {bottleneck.impact}%
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <TrendingUp
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Role Importance
            </p>

            <p className="text-3xl font-black text-orange-600">
              {bottleneck.roleImportance}%
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Dependency Impact
            </p>

            <p className="text-3xl font-black text-green-600">
              {bottleneck.dependency}%
            </p>

          </div>

        </div>

      </div>

      {/* Skill Overview */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Skill Readiness Overview
              </h2>

              <p className="text-sm text-gray-500">
                Compare current skill levels and identify the highest-impact
                weakness.
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

                <div className="flex justify-between gap-4">

                  <div>

                    <h3 className="font-bold">
                      {skill.name}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      Role importance: {skill.roleImportance}% · Dependency:{" "}
                      {skill.dependency}%
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-2xl font-black text-indigo-600">
                      {skill.score}%
                    </p>

                    <p className="text-xs text-gray-500">
                      {skill.status}
                    </p>

                  </div>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className={`h-full rounded-full ${
                      skill.status === "Bottleneck"
                        ? "bg-orange-500"
                        : "bg-indigo-500"
                    }`}
                    style={{
                      width: `${skill.score}%`,
                    }}
                  />

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Skill Analysis */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              SELECTED SKILL ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedSkill.name}
            </h2>

            <p className="text-gray-600 mt-2">
              Current mastery is {selectedSkill.score}%, while role importance
              is {selectedSkill.roleImportance}%. Its dependency impact is{" "}
              {selectedSkill.dependency}%.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  CURRENT SCORE
                </p>

                <p className="text-3xl font-black text-indigo-600 mt-1">
                  {selectedSkill.score}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  ROLE IMPORTANCE
                </p>

                <p className="text-3xl font-black text-orange-600 mt-1">
                  {selectedSkill.roleImportance}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  IMPACT SCORE
                </p>

                <p className="text-3xl font-black text-red-600 mt-1">
                  {selectedSkill.impact}%
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Why This Is The Bottleneck */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              AI BOTTLENECK ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Why {bottleneck.name}?
            </h2>

            <p className="text-gray-600 mt-2">
              Although several skills have room for improvement,{" "}
              {bottleneck.name} has the largest expected effect on interview
              readiness because it combines a lower current score with high
              role importance and strong dependencies on other skills.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                RECOMMENDED FOCUS
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                Improve this skill before distributing significant preparation
                time across lower-impact weaknesses.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Improvement Activities */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Targeted Improvement Activities
              </h2>

              <p className="text-sm text-gray-500">
                Activities specifically selected to reduce the current
                bottleneck.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowActivities(!showActivities)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showActivities
              ? "Hide Activities"
              : "Show Activities"}
          </button>

        </div>

        {showActivities && (
          <div className="space-y-4 mt-6">

            {activities.map((activity, index) => (

              <div
                key={activity.title}
                className="border rounded-2xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <h3 className="font-bold">
                        {activity.title}
                      </h3>

                      <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                        {activity.impact} Impact
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {activity.description}
                    </p>

                    <p className="text-sm font-semibold text-green-600 mt-3">
                      Expected improvement: {activity.improvement}
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
                AI Bottleneck Coaching
              </h2>

              <p className="text-sm text-gray-500">
                Questions that help identify the root of the skill bottleneck.
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
                AI Priority Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Focus preparation where it can have the largest effect.
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

      {/* Generate */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setGenerated(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Generate Bottleneck Analysis
          <ArrowRight size={18} />
        </button>

      </div>

      {generated && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                ANALYSIS GENERATED
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                {bottleneck.name} is the current highest-impact bottleneck.
              </h2>

              <p className="text-gray-600 mt-2">
                Focused practice has been recommended before distributing
                preparation time across lower-impact skills.
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
                Bottleneck Analysis Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI determines which skill deserves priority.
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
              AI PREPARATION PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Fix the bottleneck before spreading your effort.
            </h2>

            <p className="text-gray-600 mt-2">
              Not every weak skill has the same effect on interview readiness.
              The goal is to identify the weakness with the greatest potential
              impact and concentrate preparation where it matters most.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}
