import React, { useState } from "react";
import {
  Brain,
  Target,
  Link2,
  CheckCircle2,
  AlertTriangle,
  Server,
  Database,
  Zap,
  Shield,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";

const constraints = [
  {
    id: 1,
    name: "Low Latency",
    description: "Requests should receive a response within 200ms.",
    status: "Covered",
    decision: "Use caching for frequently requested data.",
  },
  {
    id: 2,
    name: "High Availability",
    description: "The service should remain available during server failures.",
    status: "Covered",
    decision: "Deploy multiple service instances behind a load balancer.",
  },
  {
    id: 3,
    name: "Scalability",
    description: "The system should support increasing traffic.",
    status: "Partial",
    decision: "Use horizontal scaling.",
  },
  {
    id: 4,
    name: "Data Durability",
    description: "Processed data should not be lost after failures.",
    status: "Uncovered",
    decision: null,
  },
  {
    id: 5,
    name: "Security",
    description: "Only authorized users should access protected resources.",
    status: "Uncovered",
    decision: null,
  },
];

const decisions = [
  {
    title: "Add a caching layer",
    category: "Performance",
    constraint: "Low Latency",
    confidence: 94,
    icon: Zap,
  },
  {
    title: "Use multiple service instances",
    category: "Architecture",
    constraint: "High Availability",
    confidence: 91,
    icon: Server,
  },
  {
    title: "Enable horizontal scaling",
    category: "Scalability",
    constraint: "Scalability",
    confidence: 82,
    icon: Server,
  },
];

const recommendations = [
  {
    title: "Address data durability",
    description:
      "Explain how data is persisted and recovered if the application or database fails.",
    priority: "High",
    icon: Database,
  },
  {
    title: "Add security reasoning",
    description:
      "Explain authentication, authorization, and protection of sensitive resources.",
    priority: "High",
    icon: Shield,
  },
  {
    title: "Strengthen scalability reasoning",
    description:
      "Explain when horizontal scaling is triggered and how the system handles increasing traffic.",
    priority: "Medium",
    icon: Server,
  },
];

export default function AIInterviewAnswerTechnicalConstraintMapping() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedConstraint, setSelectedConstraint] = useState(null);

  const analyzeAnswer = () => {
    if (!answer.trim()) return;
    setAnalyzed(true);
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
            AI Technical Constraint Mapping
          </h1>

          <p className="text-gray-500">
            Connect every technical decision to the requirement or constraint
            it addresses.
          </p>

        </div>

      </div>

      {/* Interview Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Question
            </h2>

            <p className="text-sm text-gray-500">
              Design a scalable notification service that can process millions
              of notifications while maintaining low latency and high
              availability.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="bg-indigo-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              Expected Scale
            </p>

            <p className="font-bold mt-1">
              Millions of notifications
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              Latency Requirement
            </p>

            <p className="font-bold mt-1">
              &lt; 200ms
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              Availability
            </p>

            <p className="font-bold mt-1">
              High
            </p>

          </div>

        </div>

      </div>

      {/* Answer Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Link2 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Your Technical Answer
            </h2>

            <p className="text-sm text-gray-500">
              Explain your proposed architecture and technical decisions.
            </p>

          </div>

        </div>

        <textarea
          rows={10}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={`Example:

I would put the service behind a load balancer and run multiple instances.
I would use a queue to process notification requests asynchronously.
Frequently requested information can be cached.
The workers can scale horizontally when the queue grows.`}
          className="w-full border rounded-xl p-4 mt-5 font-mono text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={analyzeAnswer}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Map Decisions to Constraints
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Result */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 bg-white rounded-2xl">

                <Link2
                  className="text-indigo-600"
                  size={42}
                />

              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Constraint Coverage
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-1">

                  <h2 className="text-4xl font-black text-indigo-700">
                    3 / 5 Covered
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-sm font-semibold">
                    2 Constraints Missing
                  </span>

                </div>

                <p className="text-gray-600 mt-3">
                  Your answer connects several technical decisions to
                  requirements, but data durability and security are not yet
                  addressed.
                </p>

              </div>

            </div>

          </div>

          {/* Extracted Constraints */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Extracted Requirements & Constraints
                </h2>

                <p className="text-sm text-gray-500">
                  AI identifies the requirements that should influence your
                  technical decisions.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {constraints.map((constraint) => {

                const selected =
                  selectedConstraint === constraint.id;

                return (
                  <button
                    type="button"
                    key={constraint.id}
                    onClick={() =>
                      setSelectedConstraint(
                        selected ? null : constraint.id
                      )
                    }
                    className="w-full text-left border rounded-xl p-5 hover:border-indigo-400 transition"
                  >

                    <div className="flex items-start gap-4">

                      <div
                        className={`p-3 rounded-xl ${
                          constraint.status === "Covered"
                            ? "bg-green-50"
                            : constraint.status === "Partial"
                            ? "bg-orange-50"
                            : "bg-red-50"
                        }`}
                      >

                        {constraint.status === "Covered" ? (
                          <CheckCircle2
                            className="text-green-600"
                          />
                        ) : (
                          <AlertTriangle
                            className={
                              constraint.status === "Partial"
                                ? "text-orange-600"
                                : "text-red-600"
                            }
                          />
                        )}

                      </div>

                      <div className="flex-1">

                        <div className="flex flex-wrap justify-between gap-3">

                          <h3 className="font-bold">
                            {constraint.name}
                          </h3>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              constraint.status === "Covered"
                                ? "bg-green-100 text-green-700"
                                : constraint.status === "Partial"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {constraint.status}
                          </span>

                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                          {constraint.description}
                        </p>

                        {selected && (
                          <div className="mt-4 bg-gray-50 rounded-xl p-4">

                            <p className="text-xs font-bold text-gray-500">
                              Mapped Technical Decision
                            </p>

                            <p className="text-sm mt-2">
                              {constraint.decision ||
                                "No technical decision found in the answer."}
                            </p>

                          </div>
                        )}

                      </div>

                    </div>

                  </button>
                );
              })}

            </div>

          </div>

          {/* Decision Mapping */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Link2 className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Technical Decision → Constraint Mapping
                </h2>

                <p className="text-sm text-gray-500">
                  See which requirement each decision addresses.
                </p>

              </div>

            </div>

            <div className="space-y-5 mt-6">

              {decisions.map((decision) => {

                const Icon = decision.icon;

                return (
                  <div
                    key={decision.title}
                    className="border rounded-2xl p-5"
                  >

                    <div className="flex items-center gap-4">

                      <div className="p-3 bg-indigo-50 rounded-xl">

                        <Icon
                          className="text-indigo-600"
                          size={23}
                        />

                      </div>

                      <div className="flex-1">

                        <div className="flex flex-wrap justify-between gap-3">

                          <h3 className="font-bold">
                            {decision.title}
                          </h3>

                          <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                            {decision.confidence}% confidence
                          </span>

                        </div>

                        <p className="text-sm text-gray-500 mt-1">
                          Category: {decision.category}
                        </p>

                      </div>

                    </div>

                    <div className="flex items-center gap-3 mt-5">

                      <div className="flex-1 border-t" />

                      <Link2
                        className="text-indigo-600"
                        size={19}
                      />

                      <div className="flex-1 border-t" />

                    </div>

                    <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                      <p className="text-xs font-bold text-indigo-700">
                        Addresses Constraint
                      </p>

                      <p className="font-bold mt-1">
                        {decision.constraint}
                      </p>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          {/* Constraint Coverage */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Constraint Coverage
                </h2>

                <p className="text-sm text-gray-500">
                  Identify requirements that still need technical reasoning.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              <div className="bg-green-50 rounded-xl p-5">

                <CheckCircle2 className="text-green-600" />

                <p className="text-sm text-gray-500 mt-3">
                  Fully Covered
                </p>

                <p className="text-3xl font-black text-green-600">
                  2
                </p>

              </div>

              <div className="bg-orange-50 rounded-xl p-5">

                <AlertTriangle className="text-orange-600" />

                <p className="text-sm text-gray-500 mt-3">
                  Partially Covered
                </p>

                <p className="text-3xl font-black text-orange-600">
                  1
                </p>

              </div>

              <div className="bg-red-50 rounded-xl p-5">

                <AlertTriangle className="text-red-600" />

                <p className="text-sm text-gray-500 mt-3">
                  Uncovered
                </p>

                <p className="text-3xl font-black text-red-600">
                  2
                </p>

              </div>

            </div>

          </div>

          {/* Missing Reasoning */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  Missing Constraint Reasoning
                </h2>

                <p className="text-gray-600 mt-2">
                  Two important requirements were identified in the question
                  but were not connected to any technical decision in your
                  answer.
                </p>

                <div className="space-y-3 mt-5">

                  <div className="bg-white rounded-xl p-4">

                    <p className="font-bold">
                      Data Durability
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Explain how notification data survives database,
                      application, or infrastructure failures.
                    </p>

                  </div>

                  <div className="bg-white rounded-xl p-4">

                    <p className="font-bold">
                      Security
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Explain authentication, authorization, and protection of
                      sensitive notification data.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Lightbulb className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  AI Recommendations
                </h2>

                <p className="text-sm text-gray-500">
                  Strengthen the relationship between requirements and design
                  decisions.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-6">

              {recommendations.map((item) => {

                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="border rounded-xl p-5"
                  >

                    <div className="flex gap-4">

                      <div className="p-3 bg-indigo-50 rounded-xl">

                        <Icon
                          className="text-indigo-600"
                          size={21}
                        />

                      </div>

                      <div className="flex-1">

                        <div className="flex justify-between gap-3">

                          <h3 className="font-bold">
                            {item.title}
                          </h3>

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              item.priority === "High"
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {item.priority}
                          </span>

                        </div>

                        <p className="text-sm text-gray-500 mt-2">
                          {item.description}
                        </p>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          {/* Interview Technique */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  Interview Technique: Explain the "Why"
                </h2>

                <p className="text-gray-600 mt-2">
                  Instead of only saying what technology you would use, connect
                  each decision to the requirement it solves. For example:
                  <strong>
                    {" "}
                    "Because we need low latency, I would introduce caching..."
                  </strong>
                </p>

                <div className="bg-white rounded-xl p-4 mt-4">

                  <p className="text-xs font-bold text-gray-500">
                    Recommended Structure
                  </p>

                  <p className="font-bold text-indigo-700 mt-2">
                    Constraint → Decision → Reasoning → Trade-off
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Final Verdict */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Constraint-Mapping Verdict
                </h2>

                <p className="text-gray-600 mt-2">
                  Your answer demonstrates good requirement-driven thinking
                  around latency and availability. To make the response
                  stronger, explicitly connect technical decisions to
                  scalability, durability, and security requirements.
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
                  Recommended Next Practice
                </h2>

                <p className="text-gray-600 mt-2">
                  Try another system-design question and explicitly map every
                  technical decision to a requirement before presenting your
                  final architecture.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
                >
                  Start Constraint Mapping Challenge
                  <ArrowUpRight size={18} />
                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}