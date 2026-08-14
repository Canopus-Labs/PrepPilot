import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Clock,
  MessageSquare,
  ShieldCheck,
  RefreshCw,
  ArrowRight,
  Star,
} from "lucide-react";

const strategies = [
  {
    title: "Emphasize Your Strengths",
    priority: "High",
    icon: Star,
    description:
      "Lead with your strongest areas when answering technical questions and use them to demonstrate confidence.",
  },
  {
    title: "Handle Weak Areas Carefully",
    priority: "High",
    icon: AlertTriangle,
    description:
      "Avoid guessing when uncertain. State your assumptions and reason through the problem step by step.",
  },
  {
    title: "Use Structured Answers",
    priority: "High",
    icon: MessageSquare,
    description:
      "Start with the approach, explain the reasoning, discuss complexity, and then address trade-offs.",
  },
  {
    title: "Ask Clarifying Questions",
    priority: "Medium",
    icon: Target,
    description:
      "Clarify ambiguous requirements before committing to an implementation.",
  },
  {
    title: "Manage Interview Time",
    priority: "Medium",
    icon: Clock,
    description:
      "Avoid spending too long on one difficult problem. Communicate your progress and prioritize the core solution.",
  },
  {
    title: "Complete Final Revision",
    priority: "Critical",
    icon: Brain,
    description:
      "Review system design and algorithms before the interview because these currently show the largest preparation gaps.",
  },
];

const strengths = [
  "Data Structures",
  "Problem Solving",
  "Technical Communication",
];

const weaknesses = [
  "System Design",
  "Complexity Justification",
  "Advanced Algorithms",
];

const workflow = [
  "Analyze Profile",
  "Combine Performance",
  "Identify Priorities",
  "Generate Strategy",
  "Practice Strategy",
];

export default function AIInterviewPreparationPersonalizedInterviewStrategy() {
  const [showStrategy, setShowStrategy] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [selectedStrategy, setSelectedStrategy] = useState(null);
  const [generated, setGenerated] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Personalized Interview Strategy
          </h1>

          <p className="text-gray-500">
            Generate an interview strategy based on your preparation history,
            strengths, weaknesses, and target role.
          </p>
        </div>

      </div>

      {/* Main Strategy */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <Target className="text-indigo-600" size={32} />
          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              PERSONALIZED STRATEGY
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Focus on Strengths, Protect Weaknesses
            </h2>

            <p className="text-gray-600 mt-2">
              Your preparation data suggests using strong problem-solving
              skills to establish confidence while taking a structured approach
              to system-design questions.
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
              Target Role
            </p>
            <p className="text-xl font-black text-indigo-600">
              Software Engineer
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <Star className="text-green-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Key Strengths
            </p>
            <p className="text-3xl font-black text-green-600">
              3
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <AlertTriangle className="text-red-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Priority Weaknesses
            </p>
            <p className="text-3xl font-black text-red-600">
              3
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <MessageSquare className="text-purple-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Mock Interviews
            </p>
            <p className="text-3xl font-black text-purple-600">
              12
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <ShieldCheck className="text-orange-600" size={22} />
            <p className="text-sm text-gray-500 mt-3">
              Strategy Readiness
            </p>
            <p className="text-xl font-black text-orange-600">
              82%
            </p>
          </div>

        </div>

      </div>

      {/* Candidate Profile */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Preparation Profile
              </h2>

              <p className="text-sm text-gray-500">
                Information used to generate the personalized strategy.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowProfile(!showProfile)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showProfile ? "Hide Profile" : "Show Profile"}
          </button>

        </div>

        {showProfile && (
          <div className="grid md:grid-cols-3 gap-5 mt-6">

            <div className="border rounded-2xl p-5">

              <p className="text-xs font-bold text-green-600">
                STRENGTHS
              </p>

              <div className="space-y-2 mt-4">

                {strengths.map((skill) => (
                  <div
                    key={skill}
                    className="bg-green-50 rounded-lg p-3 text-sm font-semibold text-green-700"
                  >
                    {skill}
                  </div>
                ))}

              </div>

            </div>

            <div className="border rounded-2xl p-5">

              <p className="text-xs font-bold text-red-600">
                WEAKNESSES
              </p>

              <div className="space-y-2 mt-4">

                {weaknesses.map((skill) => (
                  <div
                    key={skill}
                    className="bg-red-50 rounded-lg p-3 text-sm font-semibold text-red-700"
                  >
                    {skill}
                  </div>
                ))}

              </div>

            </div>

            <div className="border rounded-2xl p-5">

              <p className="text-xs font-bold text-indigo-600">
                MOCK INTERVIEW SIGNALS
              </p>

              <div className="space-y-3 mt-4">

                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Technical Answers
                  </span>
                  <strong>84%</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Problem Solving
                  </span>
                  <strong>91%</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    System Design
                  </span>
                  <strong>58%</strong>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">
                    Time Management
                  </span>
                  <strong>72%</strong>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>

      {/* Strategy Generator */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-orange-600 shrink-0"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              AI STRATEGY GENERATOR
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Build your interview strategy from your preparation data.
            </h2>

            <p className="text-gray-600 mt-2">
              The AI combines your target role, skill profile, previous mock
              interviews, and recent performance.
            </p>

            <button
              type="button"
              onClick={() => setGenerated(true)}
              className="mt-5 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold flex items-center gap-2"
            >
              Generate Strategy
              <ArrowRight size={18} />
            </button>

            {generated && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Personalized interview strategy generated successfully.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Strategy Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Personalized Strategy
              </h2>

              <p className="text-sm text-gray-500">
                Recommended interview behaviors based on your profile.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowStrategy(!showStrategy)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showStrategy ? "Hide Strategy" : "Show Strategy"}
          </button>

        </div>

        {showStrategy && (
          <div className="space-y-4 mt-6">

            {strategies.map((strategy, index) => {

              const Icon = strategy.icon;

              return (
                <button
                  type="button"
                  key={strategy.title}
                  onClick={() =>
                    setSelectedStrategy(
                      selectedStrategy === index ? null : index
                    )
                  }
                  className={`w-full text-left border rounded-2xl p-5 ${
                    selectedStrategy === index
                      ? "border-indigo-500 bg-indigo-50"
                      : ""
                  }`}
                >

                  <div className="flex gap-4">

                    <div className="p-3 rounded-xl bg-indigo-100 h-fit">
                      <Icon
                        className="text-indigo-600"
                        size={22}
                      />
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <h3 className="font-bold">
                          {strategy.title}
                        </h3>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            strategy.priority === "Critical"
                              ? "bg-red-100 text-red-700"
                              : strategy.priority === "High"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {strategy.priority}
                        </span>

                      </div>

                      <p className="text-sm text-gray-500 mt-2">
                        {strategy.description}
                      </p>

                      {selectedStrategy === index && (
                        <div className="bg-white rounded-xl p-4 mt-4">

                          <p className="text-xs font-bold text-indigo-600">
                            AI ACTION
                          </p>

                          <p className="text-sm text-gray-600 mt-2">
                            Apply this recommendation during your next mock
                            interview and compare the result with previous
                            sessions.
                          </p>

                        </div>
                      )}

                    </div>

                  </div>

                </button>
              );
            })}

          </div>
        )}

      </div>

      {/* Interview Answer Structure */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <MessageSquare
            className="text-indigo-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              ANSWER STRATEGY
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Use a consistent technical answer structure.
            </h2>

            <div className="grid md:grid-cols-5 gap-3 mt-5">

              {[
                "Clarify",
                "Approach",
                "Reason",
                "Complexity",
                "Trade-offs",
              ].map((step, index) => (

                <div
                  key={step}
                  className="bg-white rounded-xl p-4"
                >

                  <p className="text-xs font-bold text-indigo-600">
                    {index + 1}
                  </p>

                  <p className="font-bold mt-1">
                    {step}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

      {/* Difficult Question Strategy */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-red-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-red-600">
              DIFFICULT QUESTION STRATEGY
            </p>

            <h2 className="text-xl font-bold text-red-800 mt-1">
              Do not guess when you reach a weak area.
            </h2>

            <p className="text-gray-600 mt-2">
              For unfamiliar questions, state what you know, clarify the
              requirements, explain your assumptions, and reason toward a
              solution instead of immediately giving an unsupported answer.
            </p>

            <div className="grid md:grid-cols-4 gap-3 mt-5">

              {[
                "Pause",
                "Clarify",
                "State Assumptions",
                "Reason",
              ].map((step) => (

                <div
                  key={step}
                  className="bg-white rounded-xl p-4 text-center"
                >
                  <p className="font-bold text-red-700">
                    {step}
                  </p>
                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

      {/* Final Revision */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600 shrink-0"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-green-600">
              FINAL REVISION PRIORITY
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Focus your final revision on System Design.
            </h2>

            <p className="text-gray-600 mt-2">
              Your recent performance shows the largest gap in system-design
              reasoning. Review architecture patterns, scalability, reliability,
              and trade-offs before the interview.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                RECOMMENDED ORDER
              </p>

              <p className="font-semibold text-green-700 mt-2">
                System Design → Advanced Algorithms → Complexity Justification
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Time Management */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Clock className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Interview Time Strategy
            </h2>

            <p className="text-sm text-gray-500">
              Recommended time allocation for technical problems.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="bg-indigo-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              Clarification
            </p>
            <p className="text-2xl font-black text-indigo-600">
              10%
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              Approach
            </p>
            <p className="text-2xl font-black text-purple-600">
              20%
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              Implementation
            </p>
            <p className="text-2xl font-black text-green-600">
              55%
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              Review
            </p>
            <p className="text-2xl font-black text-orange-600">
              15%
            </p>
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
              Update Interview Strategy
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Regenerate recommendations after completing another mock
              interview.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Refresh Strategy
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Personalized interview strategy updated successfully.
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
                Strategy Generation Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How preparation analytics become an interview strategy.
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

                <div className="border rounded-xl p-4 min-w-[145px]">

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

          <ShieldCheck
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI INTERVIEW PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Preparation should become interview behavior.
            </h2>

            <p className="text-gray-600 mt-2">
              A personalized strategy connects your preparation data to how
              you should actually behave during the interview—what to
              emphasize, where to be cautious, how to reason, and where to
              spend your limited time.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}