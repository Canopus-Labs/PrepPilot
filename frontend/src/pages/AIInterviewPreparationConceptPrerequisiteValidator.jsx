import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Target,
  BookOpen,
  RefreshCw,
  ArrowRight,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";

const prerequisites = [
  {
    name: "Arrays & Hashing",
    mastery: 91,
    status: "Ready",
    importance: "High",
  },
  {
    name: "Recursion",
    mastery: 72,
    status: "Review",
    importance: "High",
  },
  {
    name: "Binary Trees",
    mastery: 84,
    status: "Ready",
    importance: "High",
  },
  {
    name: "Graph Traversal",
    mastery: 58,
    status: "Missing Foundation",
    importance: "Critical",
  },
  {
    name: "Complexity Analysis",
    mastery: 79,
    status: "Review",
    importance: "Medium",
  },
];

const advancedConcept = {
  name: "Advanced Graph Algorithms",
  readiness: 68,
  requiredReadiness: 80,
};

const revisionPlan = [
  {
    title: "Revise Graph Traversal",
    reason:
      "Current mastery is below the recommended threshold for advanced graph algorithms.",
    action:
      "Practice BFS, DFS, visited-state tracking, and graph representation.",
  },
  {
    title: "Strengthen Recursion",
    reason:
      "Recursive reasoning is frequently required in advanced graph and tree problems.",
    action:
      "Complete recursive traversal and backtracking exercises.",
  },
  {
    title: "Practice Complexity Analysis",
    reason:
      "Advanced algorithms require comparing computational trade-offs.",
    action:
      "Analyze time and auxiliary-space complexity for graph algorithms.",
  },
];

const coachingQuestions = [
  "Can you explain the prerequisite concept without referring to notes?",
  "Which part of the prerequisite currently feels unclear?",
  "Can you solve a medium-level problem using this foundation?",
  "What happens if the prerequisite is applied to a larger input?",
  "Can you explain the complexity of the prerequisite technique?",
];

const workflow = [
  {
    title: "Select",
    description: "Choose an advanced concept.",
  },
  {
    title: "Map",
    description: "Identify prerequisite concepts.",
  },
  {
    title: "Validate",
    description: "Check current mastery.",
  },
  {
    title: "Revise",
    description: "Strengthen missing foundations.",
  },
  {
    title: "Recheck",
    description: "Validate readiness again.",
  },
];

export default function AIInterviewPreparationConceptPrerequisiteValidator() {
  const [showPrerequisites, setShowPrerequisites] = useState(false);
  const [showRevision, setShowRevision] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [rechecked, setRechecked] = useState(false);

  const [selectedPrerequisite, setSelectedPrerequisite] =
    useState(prerequisites[3]);

  const [readiness, setReadiness] = useState(
    advancedConcept.readiness
  );

  const validateReadiness = () => {
    setValidated(true);
    setRechecked(false);
  };

  const completeRevision = () => {
    setReadiness(84);
    setRechecked(true);
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
            AI Concept Prerequisite Validator
          </h1>

          <p className="text-gray-500">
            Check whether you have the foundation needed before attempting
            advanced interview concepts.
          </p>

        </div>

      </div>

      {/* Readiness Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {readiness}%
              </p>

              <p className="text-xs text-gray-500">
                Readiness
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              ADVANCED CONCEPT READINESS
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              {advancedConcept.name}
            </h2>

            <p className="text-gray-600 mt-2">

              {readiness >= advancedConcept.requiredReadiness
                ? "Your prerequisite knowledge is sufficient to begin this advanced concept."
                : "Some foundational knowledge should be strengthened before starting this concept."}

            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Ready Foundations
            </p>

            <p className="text-3xl font-black text-green-600">
              2
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <RefreshCw
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Need Revision
            </p>

            <p className="text-3xl font-black text-orange-600">
              2
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <AlertTriangle
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Critical Gaps
            </p>

            <p className="text-3xl font-black text-red-600">
              1
            </p>

          </div>

          <div className="bg-indigo-50 rounded-xl p-5">

            <Target
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Required Readiness
            </p>

            <p className="text-3xl font-black text-indigo-600">
              80%
            </p>

          </div>

        </div>

      </div>

      {/* Advanced Concept */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Selected Advanced Concept
            </h2>

            <p className="text-sm text-gray-500">
              The AI checks prerequisites before allowing advanced practice.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-6">

          <div className="flex justify-between gap-4">

            <div>

              <p className="text-xs font-bold text-gray-500">
                TARGET CONCEPT
              </p>

              <h3 className="text-xl font-black text-indigo-700 mt-1">
                {advancedConcept.name}
              </h3>

            </div>

            <span
              className={`px-4 py-2 rounded-full h-fit text-sm font-bold ${
                readiness >= advancedConcept.requiredReadiness
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {readiness >= advancedConcept.requiredReadiness
                ? "Ready"
                : "Prerequisite Revision Needed"}
            </span>

          </div>

          <div className="mt-6">

            <div className="flex justify-between text-sm mb-2">

              <span className="text-gray-500">
                Current readiness
              </span>

              <span className="font-bold">
                {readiness}%
              </span>

            </div>

            <div className="h-3 bg-gray-200 rounded-full">

              <div
                className="h-full bg-indigo-500 rounded-full"
                style={{
                  width: `${readiness}%`,
                }}
              />

            </div>

          </div>

        </div>

      </div>

      {/* Prerequisites */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BookOpen className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Prerequisite Knowledge
              </h2>

              <p className="text-sm text-gray-500">
                Foundations required for the selected advanced concept.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowPrerequisites(!showPrerequisites)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showPrerequisites
              ? "Hide Prerequisites"
              : "Show Prerequisites"}
          </button>

        </div>

        {showPrerequisites && (
          <div className="space-y-4 mt-6">

            {prerequisites.map((item) => (

              <button
                type="button"
                key={item.name}
                onClick={() => setSelectedPrerequisite(item)}
                className={`w-full text-left border rounded-2xl p-5 transition ${
                  selectedPrerequisite.name === item.name
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex gap-4">

                  <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {item.mastery}%
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <h3 className="font-bold">
                        {item.name}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.status === "Ready"
                            ? "bg-green-100 text-green-700"
                            : item.status === "Review"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {item.status}
                      </span>

                    </div>

                    <div className="h-3 bg-gray-200 rounded-full mt-3">

                      <div
                        className={`h-full rounded-full ${
                          item.mastery >= 80
                            ? "bg-green-500"
                            : item.mastery >= 65
                            ? "bg-orange-500"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${item.mastery}%`,
                        }}
                      />

                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                      Importance: {item.importance}
                    </p>

                  </div>

                </div>

              </button>
            ))}

          </div>
        )}

      </div>

      {/* Selected Gap */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-red-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-red-600">
              FOUNDATION ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-red-800 mt-1">
              {selectedPrerequisite.name}
            </h2>

            <p className="text-gray-600 mt-2">
              Current mastery is {selectedPrerequisite.mastery}%. The AI
              classifies this prerequisite as{" "}
              <strong>{selectedPrerequisite.status}</strong>.
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  CURRENT MASTERY
                </p>

                <p className="text-3xl font-black text-red-600">
                  {selectedPrerequisite.mastery}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  REQUIRED
                </p>

                <p className="text-3xl font-black text-indigo-600">
                  80%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  GAP
                </p>

                <p className="text-3xl font-black text-red-600">
                  {Math.max(
                    80 - selectedPrerequisite.mastery,
                    0
                  )}
                  %
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Revision Plan */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Recommended Prerequisite Revision
              </h2>

              <p className="text-sm text-gray-500">
                Focused revision before attempting the advanced concept.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowRevision(!showRevision)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showRevision
              ? "Hide Revision"
              : "Show Revision"}
          </button>

        </div>

        {showRevision && (
          <div className="space-y-4 mt-6">

            {revisionPlan.map((item, index) => (

              <div
                key={item.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
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

      {/* Readiness Validation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <ShieldCheck
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              AI READINESS VALIDATION
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Validate prerequisites before advanced practice
            </h2>

            <p className="text-gray-600 mt-2">
              The system checks recent performance rather than assuming that
              completing a topic automatically means the prerequisite is
              mastered.
            </p>

            <button
              type="button"
              onClick={validateReadiness}
              className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Validate Readiness
              <ArrowRight size={18} />
            </button>

            {validated && (
              <div className="bg-orange-100 text-orange-800 rounded-xl p-4 mt-4 font-semibold">
                Validation complete: prerequisite revision is recommended
                before attempting the advanced concept.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Recheck */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-green-600">
              POST-REVISION RECHECK
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Re-evaluate readiness after revision
            </h2>

            <p className="text-gray-600 mt-2">
              Once prerequisite practice is completed, the AI should reassess
              performance and determine whether the candidate is now ready.
            </p>

            <button
              type="button"
              onClick={completeRevision}
              className="mt-5 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2"
            >
              Complete Revision & Recheck
              <RefreshCw size={18} />
            </button>

            {rechecked && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Recheck successful. Readiness increased to {readiness}%.
                The advanced concept is now unlocked.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Coaching */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Prerequisite Coaching
              </h2>

              <p className="text-sm text-gray-500">
                Questions to verify actual understanding.
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

      {/* AI Insight */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Lightbulb
            className="text-orange-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              AI LEARNING INSIGHT
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              Advanced topics depend on strong foundations.
            </h2>

            <p className="text-gray-600 mt-2">
              Repeated failure on an advanced topic does not always mean the
              advanced concept itself is the problem. Missing prerequisite
              knowledge can be the underlying cause.
            </p>

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
                Prerequisite Validation Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI validates readiness before unlocking advanced
                practice.
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
              Master the foundation before climbing higher.
            </h2>

            <p className="text-gray-600 mt-2">
              The prerequisite validator prevents candidates from repeatedly
              attempting advanced questions without addressing the foundational
              knowledge causing their difficulties.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}