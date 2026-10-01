import React, { useState } from "react";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Target,
  Lightbulb,
  Server,
  Database,
  Zap,
} from "lucide-react";

const scaleLevels = [
  {
    level: "Small",
    scale: "1K users",
    performance: 94,
    status: "Healthy",
    note: "The proposed approach should comfortably handle this scale.",
  },
  {
    level: "Medium",
    scale: "100K users",
    performance: 78,
    status: "Acceptable",
    note: "Database queries and request processing begin approaching bottlenecks.",
  },
  {
    level: "Large",
    scale: "1M users",
    performance: 55,
    status: "Risk",
    note: "The current architecture may experience database and API throughput limitations.",
  },
  {
    level: "Very Large",
    scale: "10M+ users",
    performance: 31,
    status: "Critical",
    note: "Horizontal scaling, caching, and database partitioning may be required.",
  },
];

const bottlenecks = [
  {
    title: "Database Throughput",
    severity: "High",
    icon: Database,
    description:
      "A single database instance may become the primary bottleneck as read and write volume increases.",
    solution:
      "Consider read replicas, caching, indexing, partitioning, or sharding.",
  },
  {
    title: "API Request Processing",
    severity: "Medium",
    icon: Server,
    description:
      "Increasing concurrent requests may exceed the capacity of a single application instance.",
    solution:
      "Use stateless services and horizontal scaling behind a load balancer.",
  },
  {
    title: "Synchronous Processing",
    severity: "Medium",
    icon: Zap,
    description:
      "Long-running synchronous operations may increase latency under heavy traffic.",
    solution:
      "Move expensive work to asynchronous queues and background workers.",
  },
];

const followUps = [
  "How would your architecture change at 10 million users?",
  "What would become the first bottleneck if traffic increased by 10x?",
  "How would you scale the database independently from the application layer?",
  "What would you cache and how would you handle cache invalidation?",
  "How would you maintain availability if one application instance failed?",
];

export default function AIInterviewQuestionSolutionScalabilityPredictor() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedBottleneck, setSelectedBottleneck] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Solution Scalability Predictor
          </h1>

          <p className="text-gray-500">
            Predict how your technical solution behaves as users, data, and
            processing requirements grow.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Problem
        </p>

        <h2 className="text-xl font-bold mt-2">
          Design a URL shortening service that can handle increasing traffic.
        </h2>

        <div className="flex flex-wrap gap-2 mt-4">

          {[
            "System Design",
            "Scalability",
            "Database",
            "API",
            "Performance",
          ].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold"
            >
              {tag}
            </span>
          ))}

        </div>

      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Your Proposed Solution
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Describe your architecture or approach. AI will stress-test it
          against progressively larger scales.
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={9}
          placeholder="Example: I would create an API server connected to a database..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          disabled={!answer.trim()}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Predict Scalability
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <TrendingUp
                  className="text-indigo-600"
                  size={42}
                />
              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Scalability Readiness
                </p>

                <div className="flex items-end gap-3">

                  <p className="text-6xl font-black text-indigo-600">
                    67%
                  </p>

                  <span className="mb-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold">
                    Needs Optimization
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  Your approach is suitable at small and medium scale, but
                  database throughput and application capacity may become
                  bottlenecks as traffic grows.
                </p>

                <div className="h-3 bg-white rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: "67%" }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <Target className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Current Scalability
              </p>

              <p className="text-3xl font-black text-indigo-600">
                Medium
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <AlertTriangle className="text-red-600" />

              <p className="text-sm text-gray-500 mt-4">
                Major Bottlenecks
              </p>

              <p className="text-3xl font-black text-red-600">
                3
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Server className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Safe Scale
              </p>

              <p className="text-3xl font-black text-orange-600">
                100K
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <TrendingUp className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Optimization Potential
              </p>

              <p className="text-3xl font-black text-green-600">
                High
              </p>

            </div>

          </div>

          {/* Scale Stress Test */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Scale Stress Test
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI estimates how the proposed architecture behaves as the
              workload increases.
            </p>

            <div className="space-y-5 mt-6">

              {scaleLevels.map((item) => (
                <div
                  key={item.level}
                  className="border rounded-2xl p-5"
                >

                  <div className="flex justify-between gap-4">

                    <div>

                      <p className="text-xs text-gray-500">
                        {item.level}
                      </p>

                      <h3 className="font-bold mt-1">
                        {item.scale}
                      </h3>

                    </div>

                    <span
                      className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                        item.status === "Healthy"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Acceptable"
                          ? "bg-indigo-100 text-indigo-700"
                          : item.status === "Risk"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </div>

                  <div className="h-4 bg-gray-200 rounded-full mt-4">

                    <div
                      className={`h-full rounded-full ${
                        item.performance >= 80
                          ? "bg-green-500"
                          : item.performance >= 60
                          ? "bg-indigo-600"
                          : item.performance >= 40
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${item.performance}%`,
                      }}
                    />

                  </div>

                  <div className="flex justify-between mt-2">

                    <p className="text-xs text-gray-500">
                      Estimated performance capacity
                    </p>

                    <p className="text-sm font-bold">
                      {item.performance}%
                    </p>

                  </div>

                  <p className="text-sm text-gray-600 mt-3">
                    {item.note}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Bottlenecks */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Predicted Bottlenecks
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI identifies components that are likely to limit scalability
              first.
            </p>

            <div className="space-y-4 mt-6">

              {bottlenecks.map((bottleneck, index) => {
                const Icon = bottleneck.icon;

                return (
                  <button
                    type="button"
                    key={bottleneck.title}
                    onClick={() =>
                      setSelectedBottleneck(
                        selectedBottleneck === index
                          ? null
                          : index
                      )
                    }
                    className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                  >

                    <div className="flex gap-4">

                      <div className="p-3 rounded-xl bg-orange-100 text-orange-600 h-fit">
                        <Icon size={23} />
                      </div>

                      <div className="flex-1">

                        <div className="flex justify-between gap-4">

                          <div>
                            <h3 className="font-bold">
                              {bottleneck.title}
                            </h3>

                            <p className="text-sm text-gray-600 mt-2">
                              {bottleneck.description}
                            </p>
                          </div>

                          <span
                            className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                              bottleneck.severity === "High"
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {bottleneck.severity}
                          </span>

                        </div>

                        {selectedBottleneck === index && (
                          <div className="mt-4 bg-green-50 rounded-xl p-4">

                            <p className="text-xs font-semibold text-green-700">
                              Suggested Optimization
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                              {bottleneck.solution}
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

          {/* Optimization Directions */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-green-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-green-700">
                  Recommended Optimization Directions
                </h2>

                <div className="grid md:grid-cols-2 gap-4 mt-5">

                  {[
                    [
                      "Horizontal Scaling",
                      "Run multiple stateless application instances behind a load balancer.",
                    ],
                    [
                      "Caching",
                      "Cache frequently accessed URL mappings to reduce database reads.",
                    ],
                    [
                      "Database Scaling",
                      "Introduce replicas or partitioning as read and write traffic increases.",
                    ],
                    [
                      "Asynchronous Processing",
                      "Move non-critical heavy operations to background workers.",
                    ],
                  ].map(([title, description]) => (
                    <div
                      key={title}
                      className="bg-white rounded-xl p-4"
                    >

                      <p className="font-bold">
                        {title}
                      </p>

                      <p className="text-sm text-gray-500 mt-2">
                        {description}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* Follow-up Questions */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              AI Scale-Based Follow-Up Questions
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Practice the questions an interviewer may ask after increasing
              the system's scale.
            </p>

            <div className="space-y-3 mt-5">

              {followUps.map((question, index) => (
                <div
                  key={question}
                  className="border rounded-xl p-4 flex gap-3"
                >

                  <span className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {index + 1}
                  </span>

                  <p className="text-sm text-gray-700">
                    {question}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Complexity vs Scalability */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Complexity vs Scalability
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-5">

              <div className="border rounded-xl p-5">

                <p className="font-bold">
                  Original Complexity
                </p>

                <p className="text-4xl font-black text-indigo-600 mt-3">
                  O(1)
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Individual URL lookup is expected to be constant-time with
                  an appropriate key-value lookup.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <p className="font-bold">
                  System-Level Risk
                </p>

                <p className="text-4xl font-black text-orange-600 mt-3">
                  High
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Even efficient individual operations can face bottlenecks
                  when concurrency, storage, and infrastructure scale.
                </p>

              </div>

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Scalability Insight
                </h2>

                <p className="text-gray-600 mt-2">
                  Your solution is reasonable for moderate traffic, but do not
                  assume that good algorithmic complexity automatically means
                  the entire system will scale. At larger scale, focus on
                  database throughput, horizontal application scaling,
                  caching, and asynchronous processing.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}