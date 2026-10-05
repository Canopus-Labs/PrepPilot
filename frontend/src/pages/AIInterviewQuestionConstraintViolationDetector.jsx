import React, { useState } from "react";
import {
  Brain,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  HardDrive,
  TrendingUp,
  Lightbulb,
  ArrowRight,
  Target,
} from "lucide-react";

const constraints = [
  {
    name: "Time Complexity",
    requirement: "O(n log n) or better",
    actual: "O(n²)",
    status: "Violated",
    severity: "Critical",
    impact: 94,
    explanation:
      "The nested iteration causes quadratic growth and can exceed the required execution time for large inputs.",
    correction:
      "Look for a sorting-based, hashing-based, or divide-and-conquer approach that reduces repeated comparisons.",
  },
  {
    name: "Memory Usage",
    requirement: "≤ 256 MB",
    actual: "O(n)",
    status: "Satisfied",
    severity: "Good",
    impact: 12,
    explanation:
      "The additional memory grows linearly and remains within the stated memory constraint for the expected input range.",
    correction:
      "No immediate correction is required.",
  },
  {
    name: "Input Scale",
    requirement: "n ≤ 1,000,000",
    actual: "O(n²) operations",
    status: "Violated",
    severity: "Critical",
    impact: 89,
    explanation:
      "The proposed operation count becomes impractical when the input reaches the maximum expected size.",
    correction:
      "Choose an approach whose growth rate remains practical at the required scale.",
  },
  {
    name: "Scalability",
    requirement: "Support high-volume requests",
    actual: "Sequential processing",
    status: "At Risk",
    severity: "Warning",
    impact: 67,
    explanation:
      "Sequential processing may become a throughput bottleneck as concurrent workload increases.",
    correction:
      "Consider batching, parallel processing, caching, or horizontal scaling where appropriate.",
  },
];

const analysisFlow = [
  {
    title: "Extract Constraints",
    description: "Identify explicit and implicit requirements.",
  },
  {
    title: "Analyze Solution",
    description: "Estimate complexity, resources, and behavior.",
  },
  {
    title: "Compare",
    description: "Compare actual behavior against each constraint.",
  },
  {
    title: "Detect Violation",
    description: "Identify requirements the approach cannot satisfy.",
  },
  {
    title: "Recommend",
    description: "Provide directions for correcting the approach.",
  },
];

const followUps = [
  "What is the maximum input size your solution can handle?",
  "Why does your current time complexity violate the requirement?",
  "What data structure could reduce the repeated work?",
  "How would your solution behave at the upper constraint limit?",
];

export default function AIInterviewQuestionConstraintViolationDetector() {
  const [selectedConstraint, setSelectedConstraint] = useState(
    constraints[0]
  );
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [showFollowUps, setShowFollowUps] = useState(false);

  const violated = constraints.filter(
    (item) => item.status === "Violated"
  ).length;

  const satisfied = constraints.filter(
    (item) => item.status === "Satisfied"
  ).length;

  const atRisk = constraints.filter(
    (item) => item.status === "At Risk"
  ).length;

  const overallScore = Math.round(
    constraints.reduce(
      (sum, item) =>
        sum +
        (item.status === "Satisfied"
          ? 100
          : item.status === "At Risk"
          ? 60
          : 25),
      0
    ) / constraints.length
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
            AI Constraint Violation Detector
          </h1>

          <p className="text-gray-500">
            Detect when a proposed interview solution fails the problem's
            performance, memory, scale, or resource requirements.
          </p>

        </div>

      </div>

      {/* Main Alert */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-5 items-center">

          <div className="w-20 h-20 rounded-full bg-white border-8 border-red-500 flex items-center justify-center">

            <ShieldAlert
              className="text-red-600"
              size={34}
            />

          </div>

          <div>

            <p className="text-xs font-bold text-red-600">
              CONSTRAINT VIOLATIONS DETECTED
            </p>

            <h2 className="text-2xl font-black text-red-800 mt-1">
              Your current approach does not satisfy all requirements.
            </h2>

            <p className="text-gray-600 mt-2">
              The proposed solution exceeds the allowed time complexity and
              becomes impractical at the maximum input size.
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
              Constraint Score
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {overallScore}%
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <XCircle
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Violated
            </p>

            <p className="text-3xl font-black text-red-600">
              {violated}
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              At Risk
            </p>

            <p className="text-3xl font-black text-orange-600">
              {atRisk}
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Satisfied
            </p>

            <p className="text-3xl font-black text-green-600">
              {satisfied}
            </p>

          </div>

        </div>

      </div>

      {/* Problem Constraints */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Problem Constraints
            </h2>

            <p className="text-sm text-gray-500">
              AI extracts the requirements that the proposed solution must
              satisfy.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">

          <div className="border rounded-xl p-5">

            <Clock
              className="text-indigo-600"
              size={24}
            />

            <p className="text-xs text-gray-500 mt-3">
              TIME LIMIT
            </p>

            <p className="font-bold mt-1">
              O(n log n) or better
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <HardDrive
              className="text-indigo-600"
              size={24}
            />

            <p className="text-xs text-gray-500 mt-3">
              MEMORY LIMIT
            </p>

            <p className="font-bold mt-1">
              ≤ 256 MB
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <TrendingUp
              className="text-indigo-600"
              size={24}
            />

            <p className="text-xs text-gray-500 mt-3">
              INPUT SCALE
            </p>

            <p className="font-bold mt-1">
              n ≤ 1,000,000
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <Target
              className="text-indigo-600"
              size={24}
            />

            <p className="text-xs text-gray-500 mt-3">
              SCALABILITY
            </p>

            <p className="font-bold mt-1">
              High-volume processing
            </p>

          </div>

        </div>

      </div>

      {/* Constraint Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <ShieldAlert className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Constraint Analysis
            </h2>

            <p className="text-sm text-gray-500">
              Select a constraint to inspect why the solution passes or fails
              it.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {constraints.map((constraint) => (

            <button
              type="button"
              key={constraint.name}
              onClick={() => setSelectedConstraint(constraint)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedConstraint.name === constraint.name
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <div className="flex items-center gap-4">

                {constraint.status === "Satisfied" ? (
                  <CheckCircle2
                    className="text-green-600"
                    size={25}
                  />
                ) : constraint.status === "Violated" ? (
                  <XCircle
                    className="text-red-600"
                    size={25}
                  />
                ) : (
                  <AlertTriangle
                    className="text-orange-600"
                    size={25}
                  />
                )}

                <div className="flex-1">

                  <h3 className="font-bold">
                    {constraint.name}
                  </h3>

                  <div className="flex flex-wrap gap-2 mt-2">

                    <span className="px-3 py-1 rounded-full bg-gray-100 text-xs">
                      Required: {constraint.requirement}
                    </span>

                    <span className="px-3 py-1 rounded-full bg-gray-100 text-xs">
                      Actual: {constraint.actual}
                    </span>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full mt-4">

                    <div
                      className={`h-full rounded-full ${
                        constraint.status === "Violated"
                          ? "bg-red-500"
                          : constraint.status === "At Risk"
                          ? "bg-orange-500"
                          : "bg-green-500"
                      }`}
                      style={{
                        width: `${constraint.impact}%`,
                      }}
                    />

                  </div>

                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    constraint.status === "Violated"
                      ? "bg-red-100 text-red-700"
                      : constraint.status === "At Risk"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {constraint.status}
                </span>

              </div>

            </button>
          ))}

        </div>

      </div>

      {/* Selected Constraint */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          {selectedConstraint.status === "Violated" ? (
            <XCircle
              className="text-red-600"
              size={30}
            />
          ) : (
            <CheckCircle2
              className="text-green-600"
              size={30}
            />
          )}

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              CONSTRAINT VERIFICATION
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              {selectedConstraint.name}
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-gray-500">
                  REQUIREMENT
                </p>

                <p className="text-xl font-black text-green-600 mt-2">
                  {selectedConstraint.requirement}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs font-bold text-gray-500">
                  PROPOSED SOLUTION
                </p>

                <p className="text-xl font-black text-red-600 mt-2">
                  {selectedConstraint.actual}
                </p>

              </div>

            </div>

            <div className="bg-white rounded-xl p-5 mt-4">

              <p className="text-xs font-bold text-indigo-600">
                WHY?
              </p>

              <p className="text-sm text-gray-600 mt-2">
                {selectedConstraint.explanation}
              </p>

            </div>

            <div className="bg-green-50 rounded-xl p-5 mt-4">

              <p className="text-xs font-bold text-green-600">
                CORRECTION DIRECTION
              </p>

              <p className="text-sm text-gray-600 mt-2">
                {selectedConstraint.correction}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Violation Alert */}
      {selectedConstraint.status === "Violated" && (
        <div className="bg-red-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <AlertTriangle
              className="text-red-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-red-600">
                CONSTRAINT VIOLATION
              </p>

              <h2 className="text-xl font-bold text-red-800 mt-1">
                Functional correctness is not enough.
              </h2>

              <p className="text-gray-600 mt-2">
                Your solution may produce the correct output, but it does not
                satisfy the stated {selectedConstraint.name.toLowerCase()}
                requirement. In an interview, explain the violation before
                proposing an improved direction.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Correction Directions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Lightbulb className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Correction Directions
            </h2>

            <p className="text-sm text-gray-500">
              Improve the solution without immediately revealing the complete
              implementation.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          {[
            "Identify repeated work causing the quadratic growth.",
            "Consider whether a more appropriate data structure can reduce lookup time.",
            "Compare the current approach against the maximum input constraint.",
            "Recalculate the expected time complexity after each optimization.",
          ].map((item, index) => (

            <div
              key={item}
              className="flex items-center gap-4 border rounded-xl p-4"
            >

              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                {index + 1}
              </div>

              <p className="font-semibold">
                {item}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* Follow-up Questions */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Target
              className="text-orange-600"
              size={24}
            />

            <div>

              <h2 className="font-bold text-lg">
                Constraint Follow-Up Questions
              </h2>

              <p className="text-sm text-gray-500">
                Practice defending your solution against interviewer pressure.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFollowUps(!showFollowUps)}
            className="px-4 py-2 rounded-xl bg-orange-600 text-white text-sm font-semibold"
          >
            {showFollowUps
              ? "Hide Questions"
              : "Show Questions"}
          </button>

        </div>

        {showFollowUps && (
          <div className="space-y-3 mt-6">

            {followUps.map((question, index) => (

              <div
                key={question}
                className="bg-white rounded-xl p-4 flex gap-4"
              >

                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold">
                  {index + 1}
                </div>

                <p className="font-semibold">
                  {question}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Candidate Answer */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Analyze Your Proposed Solution
            </h2>

            <p className="text-sm text-gray-500">
              Describe your solution and let the AI compare it against the
              problem constraints.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-xl p-5 mt-6">

          <p className="text-xs font-bold text-gray-500">
            EXAMPLE PROBLEM
          </p>

          <h3 className="font-bold mt-2">
            Find duplicate values in an array.
          </h3>

          <p className="text-sm text-gray-500 mt-2">
            Constraints: n ≤ 1,000,000, time complexity O(n log n) or better,
            memory ≤ 256 MB.
          </p>

        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Describe your algorithm, data structures, and expected complexity..."
          className="w-full mt-5 min-h-[150px] border rounded-xl p-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Check Constraints
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Analysis Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              AI Constraint Analysis Flow
            </h2>

            <p className="text-sm text-gray-500">
              The system evaluates the solution against every important
              requirement.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {analysisFlow.map((step, index) => (

            <React.Fragment key={step.title}>

              <div className="border rounded-xl p-4 min-w-[150px]">

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

              {index < analysisFlow.length - 1 && (
                <ArrowRight
                  className="text-gray-400"
                  size={18}
                />
              )}

            </React.Fragment>
          ))}

        </div>

      </div>

      {/* Complete */}
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
                Constraint analysis completed successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                The production implementation can send the candidate's
                solution and extracted problem constraints to the AI evaluator
                for complexity, resource, and scalability validation.
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
              AI INTERVIEW PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              A correct solution must also satisfy the constraints.
            </h2>

            <p className="text-gray-600 mt-2">
              Before finalizing an interview solution, compare its time,
              memory, scalability, and resource requirements against the
              problem constraints. This helps catch invalid approaches before
              implementation.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}