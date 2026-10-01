import React, { useState } from "react";
import {
  Brain,
  GitBranch,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target,
  ArrowRight,
  Plus,
  Layers,
} from "lucide-react";

const expectedComponents = [
  {
    title: "Input & Requirements",
    description: "Identify inputs, outputs, constraints, and assumptions.",
    status: "Covered",
  },
  {
    title: "Data Processing",
    description: "Determine how incoming data should be processed.",
    status: "Covered",
  },
  {
    title: "Storage",
    description: "Determine what information must be stored and where.",
    status: "Missing",
  },
  {
    title: "Failure Handling",
    description: "Define behavior when dependencies or operations fail.",
    status: "Missing",
  },
  {
    title: "Scalability",
    description: "Consider how the solution behaves as workload increases.",
    status: "Partial",
  },
];

const relationships = [
  {
    from: "Input & Requirements",
    to: "Data Processing",
    reason: "Requirements determine processing behavior.",
  },
  {
    from: "Data Processing",
    to: "Storage",
    reason: "Processed data determines storage requirements.",
  },
  {
    from: "Storage",
    to: "Failure Handling",
    reason: "Storage dependencies influence recovery behavior.",
  },
  {
    from: "Data Processing",
    to: "Scalability",
    reason: "Processing volume affects system performance.",
  },
];

export default function AIInterviewQuestionProblemDecompositionCoach() {
  const [subproblems, setSubproblems] = useState([]);
  const [input, setInput] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);
  const [showRelationships, setShowRelationships] = useState(false);

  const addSubproblem = () => {
    if (!input.trim()) return;

    setSubproblems([
      ...subproblems,
      {
        title: input.trim(),
        matched:
          expectedComponents.some((item) =>
            input
              .toLowerCase()
              .includes(item.title.split(" ")[0].toLowerCase())
          ),
      },
    ]);

    setInput("");
  };

  const analyzeDecomposition = () => {
    setAnalyzed(true);
  };

  const covered = expectedComponents.filter(
    (item) => item.status === "Covered"
  ).length;

  const partial = expectedComponents.filter(
    (item) => item.status === "Partial"
  ).length;

  const missing = expectedComponents.filter(
    (item) => item.status === "Missing"
  ).length;

  const score = Math.round(
    ((covered + partial * 0.5) /
      expectedComponents.length) *
      100
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
            AI Problem Decomposition Coach
          </h1>

          <p className="text-gray-500">
            Break complex interview problems into smaller, connected
            components before designing the complete solution.
          </p>
        </div>

      </div>

      {/* Objective */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Layers
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              PROBLEM DECOMPOSITION PRACTICE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Think in smaller problems before building the full solution.
            </h2>

            <p className="text-gray-600 mt-2">
              AI will evaluate the components you identify, highlight missing
              areas, and help you understand how the pieces connect.
            </p>

          </div>

        </div>

      </div>

      {/* Problem Statement */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Problem
            </h2>

            <p className="text-sm text-gray-500">
              Design a URL shortening service that supports millions of users,
              fast redirects, analytics, and high availability.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="border rounded-xl p-4">
            <p className="text-xs text-gray-500">
              SCALE
            </p>
            <p className="font-bold mt-1">
              Millions of users
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-xs text-gray-500">
              PERFORMANCE
            </p>
            <p className="font-bold mt-1">
              Fast redirects
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-xs text-gray-500">
              FEATURE
            </p>
            <p className="font-bold mt-1">
              Analytics
            </p>
          </div>

          <div className="border rounded-xl p-4">
            <p className="text-xs text-gray-500">
              RELIABILITY
            </p>
            <p className="font-bold mt-1">
              High availability
            </p>
          </div>

        </div>

      </div>

      {/* Add Subproblems */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Plus className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Step 1: Identify Subproblems
            </h2>

            <p className="text-sm text-gray-500">
              Do not design the complete solution yet. List the major problems
              you need to solve.
            </p>

          </div>

        </div>

        <div className="flex gap-3 mt-6">

          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") addSubproblem();
            }}
            placeholder="Example: How should redirects be handled?"
            className="flex-1 border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="button"
            onClick={addSubproblem}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            Add
          </button>

        </div>

        {subproblems.length > 0 && (
          <div className="space-y-3 mt-6">

            {subproblems.map((item, index) => (

              <div
                key={`${item.title}-${index}`}
                className="flex items-center gap-4 border rounded-xl p-4"
              >

                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <p className="font-semibold flex-1">
                  {item.title}
                </p>

                {item.matched ? (
                  <CheckCircle2
                    className="text-green-600"
                    size={22}
                  />
                ) : (
                  <span className="text-xs text-gray-500">
                    Needs mapping
                  </span>
                )}

              </div>
            ))}

          </div>
        )}

        <button
          type="button"
          onClick={analyzeDecomposition}
          disabled={subproblems.length === 0}
          className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Decomposition
        </button>

      </div>

      {analyzed && (
        <>
          {/* Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <Brain
                className="text-indigo-600"
                size={30}
              />

              <div>

                <p className="text-xs font-bold text-indigo-600">
                  DECOMPOSITION SCORE
                </p>

                <h2 className="text-3xl font-black text-indigo-800 mt-1">
                  {score}%
                </h2>

                <p className="text-gray-600 mt-2">
                  Your decomposition covers {covered} major components,
                  partially covers {partial}, and misses {missing}.
                </p>

              </div>

            </div>

          </div>

          {/* Component Analysis */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <GitBranch className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Step 2: Component Analysis
                </h2>

                <p className="text-sm text-gray-500">
                  AI checks whether important subproblems have been identified.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {expectedComponents.map((component) => (

                <button
                  type="button"
                  key={component.title}
                  onClick={() =>
                    setSelectedComponent(component)
                  }
                  className={`w-full text-left border rounded-2xl p-5 ${
                    selectedComponent?.title === component.title
                      ? "border-indigo-500 bg-indigo-50"
                      : "hover:border-indigo-300"
                  }`}
                >

                  <div className="flex items-center gap-4">

                    {component.status === "Covered" ? (
                      <CheckCircle2
                        className="text-green-600"
                        size={24}
                      />
                    ) : component.status === "Partial" ? (
                      <AlertTriangle
                        className="text-orange-600"
                        size={24}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-red-600"
                        size={24}
                      />
                    )}

                    <div className="flex-1">

                      <h3 className="font-bold">
                        {component.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {component.description}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        component.status === "Covered"
                          ? "bg-green-100 text-green-700"
                          : component.status === "Partial"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {component.status}
                    </span>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Selected Component */}
          {selectedComponent && (
            <div className="bg-orange-50 rounded-2xl p-6">

              <div className="flex gap-4">

                <Lightbulb
                  className="text-orange-600"
                  size={28}
                />

                <div>

                  <p className="text-xs font-bold text-orange-600">
                    COMPONENT COACHING
                  </p>

                  <h2 className="text-xl font-bold text-orange-800 mt-1">
                    {selectedComponent.title}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    {selectedComponent.description}
                  </p>

                  {selectedComponent.status === "Missing" && (
                    <div className="mt-4 bg-white rounded-xl p-4">

                      <p className="font-semibold">
                        Coach Question
                      </p>

                      <p className="text-sm text-gray-600 mt-1">
                        What part of the system is responsible for this
                        requirement, and what happens if it becomes unavailable?
                      </p>

                    </div>
                  )}

                </div>

              </div>

            </div>
          )}

          {/* Relationships */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center justify-between gap-4">

              <div className="flex items-center gap-3">

                <GitBranch className="text-indigo-600" />

                <div>

                  <h2 className="font-bold text-lg">
                    Step 3: Subproblem Relationships
                  </h2>

                  <p className="text-sm text-gray-500">
                    Understand how solving one component affects another.
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setShowRelationships(!showRelationships)
                }
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
              >
                {showRelationships
                  ? "Hide Relationships"
                  : "Show Relationships"}
              </button>

            </div>

            {showRelationships && (
              <div className="space-y-4 mt-6">

                {relationships.map((relationship) => (

                  <div
                    key={`${relationship.from}-${relationship.to}`}
                    className="border rounded-xl p-5"
                  >

                    <div className="flex flex-wrap items-center gap-3">

                      <span className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-semibold">
                        {relationship.from}
                      </span>

                      <ArrowRight
                        className="text-gray-400"
                        size={18}
                      />

                      <span className="px-4 py-2 rounded-xl bg-green-50 text-green-700 font-semibold">
                        {relationship.to}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-3">
                      {relationship.reason}
                    </p>

                  </div>
                ))}

              </div>
            )}

          </div>

          {/* Missing Components */}
          <div className="bg-red-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <AlertTriangle
                className="text-red-600"
                size={30}
              />

              <div>

                <p className="text-xs font-bold text-red-600">
                  MISSING COMPONENTS
                </p>

                <h2 className="text-xl font-bold text-red-800 mt-1">
                  Your decomposition needs more coverage.
                </h2>

                <div className="space-y-3 mt-4">

                  {expectedComponents
                    .filter(
                      (item) => item.status === "Missing"
                    )
                    .map((item) => (

                      <div
                        key={item.title}
                        className="bg-white rounded-xl p-4"
                      >

                        <p className="font-bold">
                          {item.title}
                        </p>

                        <p className="text-sm text-gray-500 mt-1">
                          {item.description}
                        </p>

                      </div>
                    ))}

                </div>

              </div>

            </div>

          </div>

          {/* Combination */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Layers className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Step 4: Combine the Components
                </h2>

                <p className="text-sm text-gray-500">
                  Once individual subproblems are identified, connect them into
                  a complete solution.
                </p>

              </div>

            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6">

              {[
                "Requirements",
                "Processing",
                "Storage",
                "Failure Handling",
                "Scalability",
                "Complete Design",
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

          {/* Coaching Questions */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Brain className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  AI Coaching Questions
                </h2>

                <p className="text-sm text-gray-500">
                  Use these questions to improve your own decomposition.
                </p>

              </div>

            </div>

            <div className="space-y-3 mt-6">

              {[
                "What are the independent responsibilities in this problem?",
                "Which requirements can be solved separately?",
                "Which subproblems depend on each other?",
                "Which component becomes a bottleneck at scale?",
                "What happens if one component fails?",
                "How will the individual solutions combine into one complete system?",
              ].map((question, index) => (

                <div
                  key={question}
                  className="flex gap-4 border rounded-xl p-4"
                >

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <p className="font-semibold">
                    {question}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={28}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Before designing a complex solution, identify its major
                  responsibilities first. Then determine which components are
                  independent, which depend on one another, and how they combine
                  into the final architecture.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}