import React, { useState } from "react";
import {
  Brain,
  Target,
  Settings2,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Lightbulb,
  ArrowRight,
  Zap,
  Database,
  ShieldCheck,
} from "lucide-react";

const originalConstraints = [
  {
    name: "Input Size",
    value: "n ≤ 10,000",
    icon: Database,
  },
  {
    name: "Memory",
    value: "256 MB",
    icon: Database,
  },
  {
    name: "Response Time",
    value: "2 seconds",
    icon: Zap,
  },
  {
    name: "Reliability",
    value: "Standard",
    icon: ShieldCheck,
  },
];

const alternativeConstraints = [
  {
    name: "Input Size",
    value: "n ≤ 10,000,000",
    change: "Increased",
    icon: Database,
  },
  {
    name: "Memory",
    value: "32 MB",
    change: "Reduced",
    icon: Database,
  },
  {
    name: "Response Time",
    value: "200 ms",
    change: "Stricter",
    icon: Zap,
  },
  {
    name: "Reliability",
    value: "High Availability",
    change: "Increased",
    icon: ShieldCheck,
  },
];

const challenges = [
  "Does your original algorithm still meet the new time constraint?",
  "Does the reduced memory limit affect your data structure choice?",
  "What changes are required for the larger input size?",
  "Would the solution need a different architecture for high availability?",
];

export default function AIInterviewQuestionAlternativeConstraintGenerator() {
  const [generated, setGenerated] = useState(false);
  const [answer, setAnswer] = useState("");
  const [evaluated, setEvaluated] = useState(false);
  const [challengeIndex, setChallengeIndex] = useState(0);

  const generateConstraints = () => {
    setGenerated(true);
  };

  const evaluateAnswer = () => {
    if (!answer.trim()) return;
    setEvaluated(true);
  };

  const nextChallenge = () => {
    setChallengeIndex(
      (previous) => (previous + 1) % challenges.length
    );
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
            AI Alternative Constraint Generator
          </h1>

          <p className="text-gray-500">
            Practice adapting your solution when interview constraints change.
          </p>

        </div>

      </div>

      {/* Original Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Original Interview Problem
            </h2>

            <p className="text-sm text-gray-500">
              Given an array of integers, find whether any two elements add up
              to a target value.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          {originalConstraints.map((constraint) => {

            const Icon = constraint.icon;

            return (
              <div
                key={constraint.name}
                className="bg-gray-50 rounded-xl p-4"
              >

                <Icon
                  className="text-indigo-600"
                  size={21}
                />

                <p className="text-xs text-gray-500 mt-3">
                  {constraint.name}
                </p>

                <p className="font-bold mt-1">
                  {constraint.value}
                </p>

              </div>
            );
          })}

        </div>

      </div>

      {/* Generate */}
      {!generated && (
        <div className="bg-indigo-50 rounded-2xl p-6">

          <div className="flex gap-4 items-center">

            <div className="p-4 bg-white rounded-2xl">

              <Settings2
                className="text-indigo-600"
                size={32}
              />

            </div>

            <div className="flex-1">

              <h2 className="text-xl font-bold text-indigo-700">
                Change the Interview Constraints
              </h2>

              <p className="text-gray-600 mt-1">
                AI will modify important constraints and ask you to determine
                whether your original solution remains valid.
              </p>

            </div>

            <button
              type="button"
              onClick={generateConstraints}
              className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Generate Challenge
              <RefreshCw size={18} />
            </button>

          </div>

        </div>
      )}

      {generated && (
        <>
          {/* Changed Constraints */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <div className="p-3 bg-white rounded-xl">

                <AlertTriangle
                  className="text-orange-600"
                  size={28}
                />

              </div>

              <div>

                <p className="text-xs font-bold text-orange-600">
                  CONSTRAINTS CHANGED
                </p>

                <h2 className="text-2xl font-black text-orange-700 mt-1">
                  Can Your Original Solution Still Work?
                </h2>

                <p className="text-gray-600 mt-2">
                  Several constraints have changed. Analyze the impact before
                  changing your approach.
                </p>

              </div>

            </div>

          </div>

          {/* Comparison */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Settings2 className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Constraint Comparison
                </h2>

                <p className="text-sm text-gray-500">
                  Compare the original requirements with the new interview
                  scenario.
                </p>

              </div>

            </div>

            <div className="overflow-x-auto mt-6">

              <table className="w-full text-left">

                <thead>

                  <tr className="border-b">

                    <th className="p-4 text-sm text-gray-500">
                      Constraint
                    </th>

                    <th className="p-4 text-sm text-gray-500">
                      Original
                    </th>

                    <th className="p-4 text-sm text-gray-500">
                      New
                    </th>

                    <th className="p-4 text-sm text-gray-500">
                      Change
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {alternativeConstraints.map((constraint) => (

                    <tr
                      key={constraint.name}
                      className="border-b last:border-0"
                    >

                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <constraint.icon
                            className="text-indigo-600"
                            size={19}
                          />

                          <span className="font-semibold">
                            {constraint.name}
                          </span>

                        </div>

                      </td>

                      <td className="p-4 text-gray-500">
                        {originalConstraints.find(
                          (item) =>
                            item.name === constraint.name
                        )?.value}
                      </td>

                      <td className="p-4 font-bold">
                        {constraint.value}
                      </td>

                      <td className="p-4">

                        <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                          {constraint.change}
                        </span>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

          </div>

          {/* AI Challenge */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <p className="text-xs font-bold text-indigo-600">
                  AI CHALLENGE
                </p>

                <h2 className="text-xl font-bold text-indigo-800 mt-2">
                  {challenges[challengeIndex]}
                </h2>

                <p className="text-gray-600 mt-3">
                  Do not immediately replace your solution. First explain
                  which constraint causes the problem and why.
                </p>

                <button
                  type="button"
                  onClick={nextChallenge}
                  className="mt-4 px-4 py-2 rounded-xl bg-white text-indigo-700 font-semibold"
                >
                  Ask Another Challenge
                </button>

              </div>

            </div>

          </div>

          {/* Candidate Response */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Adapt Your Solution
                </h2>

                <p className="text-sm text-gray-500">
                  Explain whether the original approach still works and what
                  you would change.
                </p>

              </div>

            </div>

            <textarea
              rows={9}
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder={`Example:

The original approach may not be suitable because the input size is much
larger and the response-time requirement is stricter.

I would reconsider the algorithm and data structure to reduce the number
of operations. I would also avoid storing unnecessary information because
the memory limit has decreased.`}
              className="w-full border rounded-xl p-4 mt-5 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              disabled={!answer.trim()}
              onClick={evaluateAnswer}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
            >
              Evaluate Adaptation
            </button>

          </div>

          {/* Evaluation */}
          {evaluated && (
            <div className="bg-green-50 rounded-2xl p-6">

              <div className="flex gap-4">

                <CheckCircle2
                  className="text-green-600"
                  size={28}
                />

                <div>

                  <p className="text-xs font-bold text-green-600">
                    AI EVALUATION
                  </p>

                  <h2 className="text-2xl font-black text-green-700 mt-1">
                    Good Constraint Awareness
                  </h2>

                  <p className="text-gray-600 mt-2">
                    You correctly identified that the increased input size and
                    stricter latency requirement can invalidate an approach
                    that was acceptable under the original constraints.
                  </p>

                </div>

              </div>

            </div>
          )}

          {/* Constraint Impact */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Zap className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Constraint Impact Analysis
                </h2>

                <p className="text-sm text-gray-500">
                  Understand how each changed requirement can influence your
                  technical decision.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              <div className="border rounded-xl p-5">

                <div className="flex items-center gap-3">

                  <Database className="text-purple-600" />

                  <h3 className="font-bold">
                    Larger Input Size
                  </h3>

                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Algorithms with high time complexity may become impractical.
                  Consider whether the number of operations grows too quickly.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <div className="flex items-center gap-3">

                  <Database className="text-orange-600" />

                  <h3 className="font-bold">
                    Lower Memory Limit
                  </h3>

                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Data structures that require significant additional memory
                  may no longer be appropriate.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <div className="flex items-center gap-3">

                  <Zap className="text-red-600" />

                  <h3 className="font-bold">
                    Stricter Response Time
                  </h3>

                </div>

                <p className="text-sm text-gray-500 mt-2">
                  A previously acceptable algorithm may need a more efficient
                  implementation or a different approach.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <div className="flex items-center gap-3">

                  <ShieldCheck className="text-green-600" />

                  <h3 className="font-bold">
                    Higher Reliability
                  </h3>

                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Production-oriented requirements may introduce redundancy,
                  fault tolerance, monitoring, and recovery considerations.
                </p>

              </div>

            </div>

          </div>

          {/* Reasoning Framework */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Lightbulb className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Recommended Reasoning Framework
                </h2>

                <p className="text-sm text-gray-500">
                  Use this sequence whenever an interviewer changes a
                  constraint.
                </p>

              </div>

            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6">

              {[
                "Identify Changed Constraint",
                "Estimate Impact",
                "Validate Original Approach",
                "Choose Adaptation",
                "Explain Trade-off",
              ].map((step, index, array) => (

                <React.Fragment key={step}>

                  <span className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm">
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

          {/* Avoid Memorization */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  AI Learning Insight
                </h2>

                <p className="text-gray-600 mt-2">
                  A strong candidate should not memorize a single algorithm
                  for a problem. Instead, understand how input size, memory,
                  latency, reliability, and other constraints influence the
                  choice of solution.
                </p>

              </div>

            </div>

          </div>

          {/* Final Result */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  Constraint Adaptability Result
                </h2>

                <p className="text-gray-600 mt-2">
                  Your ability to adapt the solution is evaluated based on
                  whether you correctly identify the changed constraint,
                  explain its impact, and justify the technical modification
                  rather than simply providing another solution.
                </p>

              </div>

            </div>

          </div>

          {/* Next Challenge */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Target
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  Recommended Next Challenge
                </h2>

                <p className="text-gray-600 mt-2">
                  Try the same problem with a strict memory limit and explain
                  how the constraint changes your data-structure choice.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  Generate Another Constraint
                  <RefreshCw size={18} />
                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}