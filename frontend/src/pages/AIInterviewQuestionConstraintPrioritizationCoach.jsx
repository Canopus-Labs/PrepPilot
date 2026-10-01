import React, { useState } from "react";
import {
  Brain,
  Target,
  ArrowUpDown,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Scale,
  ShieldCheck,
  Zap,
  DollarSign,
  Layers,
  ArrowRight,
} from "lucide-react";

const constraints = [
  {
    name: "Performance",
    importance: "Critical",
    score: 95,
    icon: Zap,
    reason: "The system must respond within a strict latency requirement.",
  },
  {
    name: "Reliability",
    importance: "Critical",
    score: 90,
    icon: ShieldCheck,
    reason: "Failures directly affect important user operations.",
  },
  {
    name: "Scalability",
    importance: "Important",
    score: 82,
    icon: Layers,
    reason: "The expected number of users may grow significantly.",
  },
  {
    name: "Cost",
    importance: "Important",
    score: 70,
    icon: DollarSign,
    reason: "Infrastructure cost matters but should not compromise critical requirements.",
  },
  {
    name: "Simplicity",
    importance: "Useful",
    score: 55,
    icon: Scale,
    reason: "Simple designs are preferred when critical requirements remain satisfied.",
  },
];

const recommendedOrder = [
  "Performance",
  "Reliability",
  "Scalability",
  "Cost",
  "Simplicity",
];

export default function AIInterviewQuestionConstraintPrioritizationCoach() {
  const [ranking, setRanking] = useState([
    "Cost",
    "Simplicity",
    "Performance",
    "Scalability",
    "Reliability",
  ]);

  const [analyzed, setAnalyzed] = useState(false);
  const [selectedConstraint, setSelectedConstraint] = useState(null);
  const [showTradeoffs, setShowTradeoffs] = useState(false);

  const moveConstraint = (index, direction) => {
    const newRanking = [...ranking];
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= newRanking.length) {
      return;
    }

    [newRanking[index], newRanking[newIndex]] = [
      newRanking[newIndex],
      newRanking[index],
    ];

    setRanking(newRanking);
    setAnalyzed(false);
  };

  const analyzeRanking = () => {
    setAnalyzed(true);
  };

  const getMatchScore = () => {
    let score = 0;

    ranking.forEach((item, index) => {
      if (item === recommendedOrder[index]) {
        score += 20;
      }
    });

    return score;
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
            AI Constraint Prioritization Coach
          </h1>

          <p className="text-gray-500">
            Learn how to prioritize competing requirements before making
            technical decisions.
          </p>
        </div>

      </div>

      {/* Interview Scenario */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Interview Scenario
            </h2>

            <p className="text-sm text-gray-500">
              Design a service that handles a large number of requests while
              maintaining fast responses and reliable operation.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-indigo-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              Expected Users
            </p>

            <p className="text-2xl font-black text-indigo-600 mt-1">
              1M+
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              Target Latency
            </p>

            <p className="text-2xl font-black text-orange-600 mt-1">
              &lt;200ms
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-xs text-gray-500">
              Reliability Goal
            </p>

            <p className="text-2xl font-black text-green-600 mt-1">
              99.9%
            </p>
          </div>

        </div>

      </div>

      {/* Constraint Extraction */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Layers className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              AI-Extracted Constraints
            </h2>

            <p className="text-sm text-gray-500">
              These requirements compete for attention when designing the
              solution.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-5 gap-4 mt-6">

          {constraints.map((constraint) => {
            const Icon = constraint.icon;

            return (
              <button
                type="button"
                key={constraint.name}
                onClick={() => setSelectedConstraint(constraint)}
                className={`text-left border rounded-xl p-4 transition ${
                  selectedConstraint?.name === constraint.name
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <Icon
                  className="text-indigo-600"
                  size={23}
                />

                <h3 className="font-bold mt-3">
                  {constraint.name}
                </h3>

                <span
                  className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-semibold ${
                    constraint.importance === "Critical"
                      ? "bg-red-100 text-red-700"
                      : constraint.importance === "Important"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {constraint.importance}
                </span>

              </button>
            );
          })}

        </div>

      </div>

      {/* Selected Constraint */}
      {selectedConstraint && (
        <div className="bg-indigo-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <div className="p-3 bg-white rounded-xl">
              {React.createElement(selectedConstraint.icon, {
                className: "text-indigo-600",
                size: 28,
              })}
            </div>

            <div>
              <p className="text-xs font-bold text-indigo-600">
                SELECTED CONSTRAINT
              </p>

              <h2 className="text-2xl font-black text-indigo-800 mt-1">
                {selectedConstraint.name}
              </h2>

              <p className="text-gray-600 mt-2">
                {selectedConstraint.reason}
              </p>
            </div>

          </div>

        </div>
      )}

      {/* Ranking Instructions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <ArrowUpDown className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Prioritize the Constraints
            </h2>

            <p className="text-sm text-gray-500">
              Rank the requirements from most important to least important for
              this specific problem.
            </p>
          </div>

        </div>

        <div className="space-y-3 mt-6">

          {ranking.map((name, index) => {

            const constraint = constraints.find(
              (item) => item.name === name
            );

            return (
              <div
                key={name}
                className="flex items-center gap-4 border rounded-xl p-4 bg-gray-50"
              >

                <div className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-black">
                  {index + 1}
                </div>

                <div className="flex-1">

                  <h3 className="font-bold">
                    {name}
                  </h3>

                  <p className="text-xs text-gray-500">
                    {constraint?.importance}
                  </p>

                </div>

                <div className="flex gap-2">

                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => moveConstraint(index, -1)}
                    className="px-3 py-2 rounded-lg bg-white border disabled:opacity-40"
                  >
                    ↑
                  </button>

                  <button
                    type="button"
                    disabled={index === ranking.length - 1}
                    onClick={() => moveConstraint(index, 1)}
                    className="px-3 py-2 rounded-lg bg-white border disabled:opacity-40"
                  >
                    ↓
                  </button>

                </div>

              </div>
            );
          })}

        </div>

        <button
          type="button"
          onClick={analyzeRanking}
          className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          Analyze My Prioritization
        </button>

      </div>

      {analyzed && (
        <>
          {/* Result */}
          <div
            className={`rounded-2xl p-6 ${
              getMatchScore() >= 80
                ? "bg-green-50"
                : getMatchScore() >= 40
                ? "bg-orange-50"
                : "bg-red-50"
            }`}
          >

            <div className="flex gap-4">

              {getMatchScore() >= 80 ? (
                <CheckCircle2
                  className="text-green-600"
                  size={32}
                />
              ) : (
                <AlertTriangle
                  className="text-orange-600"
                  size={32}
                />
              )}

              <div>

                <p className="text-xs font-bold">
                  AI PRIORITIZATION REVIEW
                </p>

                <h2 className="text-2xl font-black mt-1">
                  {getMatchScore()}% Priority Alignment
                </h2>

                <p className="text-gray-600 mt-2">
                  Your ranking has been compared with the importance of each
                  constraint in the problem context.
                </p>

              </div>

            </div>

          </div>

          {/* Ranking Comparison */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Scale className="text-indigo-600" />

              <div>
                <h2 className="font-bold text-lg">
                  Your Ranking vs AI Recommendation
                </h2>

                <p className="text-sm text-gray-500">
                  Compare your priorities with the context-aware ranking.
                </p>
              </div>

            </div>

            <div className="space-y-3 mt-6">

              {ranking.map((item, index) => {

                const expected =
                  recommendedOrder[index];

                const correct = item === expected;

                return (
                  <div
                    key={item}
                    className={`flex items-center gap-4 border rounded-xl p-4 ${
                      correct
                        ? "bg-green-50 border-green-200"
                        : "bg-orange-50 border-orange-200"
                    }`}
                  >

                    <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center font-black">
                      {index + 1}
                    </div>

                    <div className="flex-1">

                      <p className="font-bold">
                        Your choice: {item}
                      </p>

                      <p className="text-sm text-gray-500">
                        AI priority: {expected}
                      </p>

                    </div>

                    {correct ? (
                      <CheckCircle2
                        className="text-green-600"
                        size={22}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-orange-600"
                        size={22}
                      />
                    )}

                  </div>
                );
              })}

            </div>

          </div>

          {/* Trade-Off Explanation */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Scale className="text-indigo-600" />

              <div>
                <h2 className="font-bold text-lg">
                  Constraint Trade-Off Analysis
                </h2>

                <p className="text-sm text-gray-500">
                  Constraints should not always be optimized equally.
                </p>
              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-5 mt-6">

              <div className="border rounded-xl p-5">

                <Zap className="text-orange-600" />

                <h3 className="font-bold mt-3">
                  Performance vs Cost
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Increasing compute resources may improve latency but also
                  increase infrastructure costs.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <ShieldCheck className="text-green-600" />

                <h3 className="font-bold mt-3">
                  Reliability vs Simplicity
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Redundancy can improve reliability while making the
                  architecture more complex.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Layers className="text-purple-600" />

                <h3 className="font-bold mt-3">
                  Scalability vs Complexity
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Highly scalable architectures may require additional
                  components and operational complexity.
                </p>

              </div>

            </div>

          </div>

          {/* AI Coaching */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={28}
              />

              <div>

                <p className="text-xs font-bold text-indigo-600">
                  AI COACHING
                </p>

                <h2 className="text-xl font-bold text-indigo-800 mt-2">
                  Do not treat every requirement equally.
                </h2>

                <p className="text-gray-600 mt-3">
                  Identify which requirements are hard constraints, which are
                  optimization goals, and which can be relaxed if necessary.
                  Your architecture should follow that priority order.
                </p>

              </div>

            </div>

          </div>

          {/* Priority Framework */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Lightbulb className="text-indigo-600" />

              <div>
                <h2 className="font-bold text-lg">
                  Constraint Prioritization Framework
                </h2>

                <p className="text-sm text-gray-500">
                  Use this process during system-design and technical
                  interviews.
                </p>
              </div>

            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6">

              {[
                "Extract Requirements",
                "Classify Constraints",
                "Rank Importance",
                "Identify Trade-Offs",
                "Choose Architecture",
                "Justify Decision",
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

          {/* Follow-Up Questions */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>
                <h2 className="font-bold text-lg">
                  Interviewer Follow-Up Questions
                </h2>

                <p className="text-sm text-gray-500">
                  Prepare to defend your prioritization decisions.
                </p>
              </div>

            </div>

            <div className="space-y-3 mt-6">

              {[
                "Which requirement is the hardest constraint and why?",
                "What would you sacrifice if cost became the primary concern?",
                "How would your design change if latency requirements became stricter?",
                "Which constraint can safely be relaxed?",
                "What happens if scalability becomes more important than simplicity?",
              ].map((question, index) => (

                <div
                  key={question}
                  className="flex gap-4 border rounded-xl p-4"
                >

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <p className="text-sm text-gray-700 pt-1">
                    {question}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Final Recommendation */}
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
                  Prioritize the constraints that directly define whether the
                  solution is acceptable. In this scenario, performance and
                  reliability should drive the architecture first, while cost
                  and simplicity should be optimized without violating those
                  critical requirements.
                </p>

              </div>

            </div>

          </div>

          {/* Next Challenge */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Target
                className="text-indigo-600"
                size={28}
              />

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  Recommended Practice
                </h2>

                <p className="text-gray-600 mt-2">
                  Try another system-design problem where cost, reliability,
                  scalability, and performance conflict with each other.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  Start Constraint Challenge
                  <ArrowRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}