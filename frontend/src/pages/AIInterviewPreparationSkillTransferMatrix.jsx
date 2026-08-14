import React, { useState } from "react";
import {
  Brain,
  Network,
  Target,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  RefreshCw,
  BarChart3,
} from "lucide-react";

const skills = [
  {
    name: "Data Structures",
    mastery: 88,
    transfersTo: ["Algorithms", "Problem Solving"],
    description:
      "Strong data-structure knowledge supports algorithm selection and efficient problem solving.",
  },
  {
    name: "Programming",
    mastery: 82,
    transfersTo: ["Debugging", "Implementation"],
    description:
      "Programming fundamentals directly support implementation and debugging ability.",
  },
  {
    name: "Statistics",
    mastery: 64,
    transfersTo: ["Machine Learning", "Data Analysis"],
    description:
      "Statistics provides a foundation for understanding models, distributions, and evaluation.",
  },
  {
    name: "Databases",
    mastery: 71,
    transfersTo: ["Backend Development", "System Design"],
    description:
      "Database knowledge supports backend architecture and system-design decisions.",
  },
  {
    name: "Communication",
    mastery: 76,
    transfersTo: ["Behavioral Interviews", "Technical Explanations"],
    description:
      "Communication skills transfer into clearer behavioral and technical interview answers.",
  },
];

const transferMatrix = [
  {
    source: "Data Structures",
    target: "Algorithms",
    strength: 92,
    type: "Strong Transfer",
    reason:
      "Data structures directly influence algorithm selection and complexity.",
  },
  {
    source: "Programming",
    target: "Debugging",
    strength: 87,
    type: "Strong Transfer",
    reason:
      "Implementation knowledge makes it easier to isolate and fix code failures.",
  },
  {
    source: "Statistics",
    target: "Machine Learning",
    strength: 84,
    type: "Strong Transfer",
    reason:
      "Statistical reasoning supports model interpretation and evaluation.",
  },
  {
    source: "Databases",
    target: "Backend Development",
    strength: 81,
    type: "Strong Transfer",
    reason:
      "Database concepts are frequently used in backend data-access design.",
  },
  {
    source: "Communication",
    target: "Behavioral Interviews",
    strength: 89,
    type: "Strong Transfer",
    reason:
      "Clear communication improves storytelling and behavioral responses.",
  },
];

const coachingQuestions = [
  "Which of your strongest skills can support another weak skill?",
  "Which transferable skill should you strengthen first?",
  "How does data-structure knowledge help with algorithm selection?",
  "How can programming knowledge improve debugging?",
  "Which statistics concepts are prerequisites for your ML goals?",
  "How can communication practice improve technical explanations?",
];

const recommendations = [
  {
    title: "Leverage Data Structures",
    reason:
      "Your data-structure mastery is stronger than your algorithmic performance.",
    action:
      "Use your existing data-structure knowledge to practice algorithm selection and complexity analysis.",
  },
  {
    title: "Connect Programming With Debugging",
    reason:
      "Your programming foundation can accelerate debugging improvement.",
    action:
      "Practice debugging tasks that reuse familiar programming concepts.",
  },
  {
    title: "Strengthen Statistics Before Advanced ML",
    reason:
      "Statistics is currently one of your weaker foundational skills.",
    action:
      "Revise probability, distributions, hypothesis testing, and model evaluation before advanced ML topics.",
  },
];

const workflow = [
  {
    title: "Assess",
    description: "Measure current skill proficiency.",
  },
  {
    title: "Map",
    description: "Identify relationships between skills.",
  },
  {
    title: "Transfer",
    description: "Estimate transferable strength.",
  },
  {
    title: "Find Gaps",
    description: "Detect weak prerequisite areas.",
  },
  {
    title: "Recommend",
    description: "Create efficient learning paths.",
  },
];

export default function AIInterviewPreparationSkillTransferMatrix() {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);

  const [showSkills, setShowSkills] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [generated, setGenerated] = useState(false);

  const transferScore = 86;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Skill Transfer Matrix
          </h1>

          <p className="text-gray-500">
            Discover how your existing skills can support improvement in
            related interview competencies.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {transferScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              SKILL TRANSFER SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Strong Transfer Potential
            </h2>

            <p className="text-gray-600 mt-2">
              Several existing strengths can be used to accelerate improvement
              in weaker or related preparation areas.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Network
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Skills Mapped
            </p>

            <p className="text-3xl font-black text-indigo-600">
              10
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Strong Transfers
            </p>

            <p className="text-3xl font-black text-green-600">
              5
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <Target
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Transfer Gaps
            </p>

            <p className="text-3xl font-black text-orange-600">
              3
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-5">

            <BarChart3
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Avg. Transfer
            </p>

            <p className="text-3xl font-black text-indigo-600">
              86%
            </p>

          </div>

        </div>

      </div>

      {/* Skill Profiles */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Current Skill Profiles
              </h2>

              <p className="text-sm text-gray-500">
                Select a skill to inspect what it can support.
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
                onClick={() => setSelectedSkill(skill)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedSkill.name === skill.name
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex gap-4">

                  <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <h3 className="font-bold">
                        {skill.name}
                      </h3>

                      <span className="font-black text-indigo-600">
                        {skill.mastery}%
                      </span>

                    </div>

                    <div className="h-3 bg-gray-200 rounded-full mt-3">

                      <div
                        className={`h-full rounded-full ${
                          skill.mastery >= 80
                            ? "bg-green-500"
                            : skill.mastery >= 65
                            ? "bg-orange-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${skill.mastery}%`,
                        }}
                      />

                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                      Supports: {skill.transfersTo.join(" • ")}
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Skill */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              TRANSFERABLE STRENGTH
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedSkill.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedSkill.description}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  MASTERY
                </p>

                <p className="text-3xl font-black text-indigo-600">
                  {selectedSkill.mastery}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  TRANSFER TARGETS
                </p>

                <p className="text-3xl font-black text-green-600">
                  {selectedSkill.transfersTo.length}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  TRANSFER POTENTIAL
                </p>

                <p className="text-3xl font-black text-indigo-600">
                  High
                </p>

              </div>

            </div>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                AI LEARNING STRATEGY
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                Use your strength in {selectedSkill.name} as a foundation
                when practicing {selectedSkill.transfersTo[0]}.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Transfer Matrix */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Network className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Skill Transfer Matrix
              </h2>

              <p className="text-sm text-gray-500">
                Relationships between existing strengths and related skills.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowMatrix(!showMatrix)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showMatrix ? "Hide Matrix" : "Show Matrix"}
          </button>

        </div>

        {showMatrix && (
          <div className="space-y-4 mt-6">

            {transferMatrix.map((item) => (

              <div
                key={`${item.source}-${item.target}`}
                className="border rounded-2xl p-5"
              >

                <div className="flex flex-wrap items-center gap-3">

                  <span className="px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 font-semibold">
                    {item.source}
                  </span>

                  <ArrowRight className="text-gray-400" />

                  <span className="px-4 py-2 rounded-xl bg-green-100 text-green-700 font-semibold">
                    {item.target}
                  </span>

                  <span className="ml-auto px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    {item.type}
                  </span>

                </div>

                <div className="flex items-center gap-4 mt-4">

                  <div className="flex-1 h-3 bg-gray-200 rounded-full">

                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{
                        width: `${item.strength}%`,
                      }}
                    />

                  </div>

                  <span className="font-black text-green-600">
                    {item.strength}%
                  </span>

                </div>

                <p className="text-sm text-gray-500 mt-3">
                  {item.reason}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Gap Analysis */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              TRANSFER GAP ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Use strong foundations to accelerate weaker areas.
            </h2>

            <p className="text-gray-600 mt-2">
              Your existing knowledge can reduce the learning effort required
              for related skills. However, transfer does not guarantee mastery;
              the target skill still needs dedicated practice.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  STRONG FOUNDATION
                </p>

                <p className="font-black text-green-600 mt-1">
                  Data Structures
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  TARGET SKILL
                </p>

                <p className="font-black text-indigo-600 mt-1">
                  Algorithms
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  TRANSFER POTENTIAL
                </p>

                <p className="font-black text-green-600 mt-1">
                  92%
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Coaching Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Skill Transfer Coaching
              </h2>

              <p className="text-sm text-gray-500">
                Questions that help connect existing knowledge to new skills.
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
                AI Learning Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Personalized learning paths based on transferable strengths.
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
                Skill Transfer Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI converts existing knowledge into personalized
                learning paths.
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

      {/* Generate */}
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setGenerated(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Generate Transfer Matrix
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Result */}
      {generated && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                MATRIX GENERATED
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Strong transferable skills identified.
              </h2>

              <p className="text-gray-600 mt-2">
                Your strongest transfer opportunities are from Data Structures
                to Algorithms, Programming to Debugging, and Communication to
                Behavioral Interviews. Use these foundations while continuing
                targeted practice in the destination skills.
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
              Build on what you already know.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong preparation does not require learning every skill from
              scratch. Identifying transferable knowledge can make learning
              more efficient while revealing which areas still require
              dedicated practice.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}