import React, { useState } from "react";
import {
  Brain,
  Target,
  Code2,
  Briefcase,
  MessageSquare,
  FolderKanban,
  Mic2,
  BarChart3,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const blueprintAreas = [
  {
    name: "Data Structures & Algorithms",
    icon: Code2,
    importance: "Critical",
    coverage: 78,
    target: 90,
    priority: 95,
    description:
      "Arrays, strings, trees, graphs, hashing, recursion, sorting, searching, and complexity analysis.",
    action:
      "Practice medium and hard problems with emphasis on explaining complexity.",
  },
  {
    name: "System Design",
    icon: Briefcase,
    importance: "High",
    coverage: 54,
    target: 80,
    priority: 88,
    description:
      "Architecture, scalability, reliability, APIs, databases, caching, and trade-offs.",
    action:
      "Complete small system-design scenarios and explain architectural decisions.",
  },
  {
    name: "Role-Specific Skills",
    icon: Target,
    importance: "High",
    coverage: 67,
    target: 85,
    priority: 86,
    description:
      "Technical competencies directly aligned with the selected target role.",
    action:
      "Focus on technologies, concepts, and workflows frequently expected for the role.",
  },
  {
    name: "Behavioral Preparation",
    icon: MessageSquare,
    importance: "Medium",
    coverage: 73,
    target: 85,
    priority: 72,
    description:
      "Leadership, teamwork, conflict resolution, failures, achievements, and motivation.",
    action:
      "Prepare concise STAR-based stories for common behavioral themes.",
  },
  {
    name: "Project Discussion",
    icon: FolderKanban,
    importance: "High",
    coverage: 81,
    target: 90,
    priority: 82,
    description:
      "Architecture, implementation decisions, challenges, results, and technical trade-offs.",
    action:
      "Practice explaining two strongest projects from problem to measurable outcome.",
  },
  {
    name: "Mock Interview Practice",
    icon: Mic2,
    importance: "Medium",
    coverage: 48,
    target: 80,
    priority: 79,
    description:
      "End-to-end interview simulations with technical and communication evaluation.",
    action:
      "Complete regular mock interviews with increasing difficulty.",
  },
];

const preparationDistribution = [
  {
    name: "DSA & Problem Solving",
    percentage: 30,
  },
  {
    name: "System Design",
    percentage: 20,
  },
  {
    name: "Role-Specific Skills",
    percentage: 20,
  },
  {
    name: "Project Discussion",
    percentage: 12,
  },
  {
    name: "Behavioral",
    percentage: 8,
  },
  {
    name: "Mock Interviews",
    percentage: 10,
  },
];

const blueprintSteps = [
  {
    title: "Target Role",
    description: "Identify expected role competencies.",
  },
  {
    title: "Skill Assessment",
    description: "Compare current ability with requirements.",
  },
  {
    title: "Interview Mapping",
    description: "Map skills to interview categories.",
  },
  {
    title: "Prioritization",
    description: "Rank preparation areas.",
  },
  {
    title: "Personalization",
    description: "Adapt the blueprint to current gaps.",
  },
];

const coachingQuestions = [
  "Which interview category has the largest gap?",
  "Which technical skill is most important for your target role?",
  "How much preparation time should go toward problem solving?",
  "Which project should you be ready to discuss deeply?",
  "How prepared are you for behavioral follow-ups?",
  "How frequently should you complete a full mock interview?",
];

const recommendations = [
  {
    title: "Prioritize DSA & Problem Solving",
    reason:
      "This area has the highest importance and still has room for improvement.",
    action:
      "Allocate the largest preparation block to medium and hard algorithmic problems.",
  },
  {
    title: "Increase System Design Practice",
    reason:
      "System-design coverage is significantly below the target level.",
    action:
      "Practice architecture, scalability, database, caching, and reliability scenarios.",
  },
  {
    title: "Increase Mock Interview Exposure",
    reason:
      "End-to-end interview practice is currently underrepresented.",
    action:
      "Schedule mock interviews to test technical knowledge and communication together.",
  },
];

export default function AIInterviewPreparationTargetRoleInterviewBlueprint() {
  const [selectedArea, setSelectedArea] = useState(
    blueprintAreas[0]
  );

  const [showBlueprint, setShowBlueprint] = useState(false);
  const [showDistribution, setShowDistribution] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [generated, setGenerated] = useState(false);

  const readinessScore = 72;

  const importanceStyles = {
    Critical: "bg-red-100 text-red-700",
    High: "bg-orange-100 text-orange-700",
    Medium: "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Target Role Interview Blueprint
          </h1>

          <p className="text-gray-500">
            Build a personalized preparation roadmap based on the expected
            structure of your target role interview.
          </p>

        </div>

      </div>

      {/* Target Role */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              TARGET ROLE
            </p>

            <h2 className="text-2xl font-black text-gray-800">
              Software Engineer
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Personalized blueprint based on current skill level and expected
              interview competencies.
            </p>

          </div>

        </div>

      </div>

      {/* Readiness */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {readinessScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              ROLE READINESS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Developing Toward Interview Readiness
            </h2>

            <p className="text-gray-600 mt-2">
              Your strongest areas are project discussion and core problem
              solving. System design and mock interview exposure should receive
              additional preparation.
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
              Blueprint Coverage
            </p>

            <p className="text-3xl font-black text-indigo-600">
              78%
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <AlertTriangle
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Critical Areas
            </p>

            <p className="text-3xl font-black text-red-600">
              1
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <Target
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              High Priority
            </p>

            <p className="text-3xl font-black text-orange-600">
              3
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Strong Areas
            </p>

            <p className="text-3xl font-black text-green-600">
              2
            </p>

          </div>

        </div>

      </div>

      {/* Blueprint Areas */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Interview Blueprint
              </h2>

              <p className="text-sm text-gray-500">
                Role-specific preparation categories and current coverage.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowBlueprint(!showBlueprint)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showBlueprint ? "Hide Blueprint" : "Show Blueprint"}
          </button>

        </div>

        {showBlueprint && (
          <div className="space-y-4 mt-6">

            {blueprintAreas.map((area, index) => {

              const Icon = area.icon;

              return (
                <button
                  type="button"
                  key={area.name}
                  onClick={() => setSelectedArea(area)}
                  className={`w-full text-left border rounded-2xl p-5 transition ${
                    selectedArea.name === area.name
                      ? "border-indigo-500 bg-indigo-50"
                      : "hover:border-indigo-300"
                  }`}
                >

                  <div className="flex gap-4">

                    <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                      <Icon size={22} />
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <h3 className="font-bold">
                            {index + 1}. {area.name}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {area.description}
                          </p>

                        </div>

                        <span
                          className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                            importanceStyles[area.importance]
                          }`}
                        >
                          {area.importance}
                        </span>

                      </div>

                      <div className="flex items-center gap-4 mt-4">

                        <div className="flex-1 h-3 bg-gray-200 rounded-full">

                          <div
                            className={`h-full rounded-full ${
                              area.coverage >= 80
                                ? "bg-green-500"
                                : area.coverage >= 60
                                ? "bg-orange-500"
                                : "bg-red-500"
                            }`}
                            style={{
                              width: `${area.coverage}%`,
                            }}
                          />

                        </div>

                        <span className="font-black text-indigo-700">
                          {area.coverage}%
                        </span>

                      </div>

                      <p className="text-xs text-gray-500 mt-3">
                        Target: {area.target}% • Priority:{" "}
                        {area.priority}/100
                      </p>

                    </div>

                  </div>

                </button>
              );
            })}

          </div>
        )}

      </div>

      {/* Selected Area */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              HIGHEST-IMPACT PREPARATION AREA
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedArea.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedArea.description}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  CURRENT COVERAGE
                </p>

                <p className="text-3xl font-black text-indigo-600">
                  {selectedArea.coverage}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  TARGET
                </p>

                <p className="text-3xl font-black text-green-600">
                  {selectedArea.target}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  PREPARATION GAP
                </p>

                <p className="text-3xl font-black text-red-600">
                  {selectedArea.target - selectedArea.coverage}%
                </p>

              </div>

            </div>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                AI RECOMMENDATION
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                {selectedArea.action}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Preparation Distribution */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Recommended Preparation Distribution
              </h2>

              <p className="text-sm text-gray-500">
                AI-generated allocation based on role importance and current
                skill gaps.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowDistribution(!showDistribution)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showDistribution
              ? "Hide Distribution"
              : "Show Distribution"}
          </button>

        </div>

        {showDistribution && (
          <div className="space-y-4 mt-6">

            {preparationDistribution.map((item) => (

              <div
                key={item.name}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between">

                  <h3 className="font-bold">
                    {item.name}
                  </h3>

                  <span className="font-black text-indigo-600">
                    {item.percentage}%
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-3">

                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${item.percentage * 3.33}%`,
                    }}
                  />

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
                AI Blueprint Reflection Questions
              </h2>

              <p className="text-sm text-gray-500">
                Questions that help connect preparation activities to role
                expectations.
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
                AI Blueprint Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Prioritized actions based on the current role-readiness gaps.
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

      {/* Blueprint Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Blueprint Generation Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI converts role requirements into a personalized
                preparation roadmap.
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

            {blueprintSteps.map((step, index) => (

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

                {index < blueprintSteps.length - 1 && (
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
          Generate Interview Blueprint
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
                BLUEPRINT GENERATED
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Your role-specific interview blueprint is ready.
              </h2>

              <p className="text-gray-600 mt-2">
                Based on your current readiness, prioritize DSA, system design,
                role-specific skills, and mock interviews while maintaining
                project and behavioral preparation.
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
              Prepare for the interview you are targeting.
            </h2>

            <p className="text-gray-600 mt-2">
              A strong preparation plan should connect your current skill gaps
              to the competencies, question categories, project discussions,
              behavioral topics, and mock-interview expectations of your
              target role.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}