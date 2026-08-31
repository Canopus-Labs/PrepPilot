import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  Lightbulb,
  BarChart3,
  RotateCcw,
} from "lucide-react";

const concepts = [
  {
    name: "Hash Tables",
    topic: "Data Structures",
    confidence: 94,
    accuracy: 96,
    recall: 92,
    status: "Strong",
  },
  {
    name: "Binary Search",
    topic: "Algorithms",
    confidence: 88,
    accuracy: 90,
    recall: 86,
    status: "Strong",
  },
  {
    name: "Dynamic Programming",
    topic: "Algorithms",
    confidence: 61,
    accuracy: 65,
    recall: 57,
    status: "Uncertain",
  },
  {
    name: "Graph Traversal",
    topic: "Algorithms",
    confidence: 73,
    accuracy: 78,
    recall: 68,
    status: "Developing",
  },
  {
    name: "Database Indexing",
    topic: "Databases",
    confidence: 82,
    accuracy: 85,
    recall: 79,
    status: "Strong",
  },
  {
    name: "Normalization",
    topic: "Databases",
    confidence: 59,
    accuracy: 63,
    recall: 55,
    status: "Weak",
  },
  {
    name: "REST APIs",
    topic: "Backend",
    confidence: 90,
    accuracy: 92,
    recall: 88,
    status: "Strong",
  },
  {
    name: "Authentication",
    topic: "Backend",
    confidence: 76,
    accuracy: 79,
    recall: 73,
    status: "Developing",
  },
];

const recommendations = [
  {
    title: "Prioritize Dynamic Programming",
    description:
      "Your accuracy and recall are both below your overall confidence level. Practice pattern recognition and short recall exercises.",
  },
  {
    title: "Reinforce Database Normalization",
    description:
      "Recent recall performance suggests that this concept needs reinforcement before advanced database questions.",
  },
  {
    title: "Maintain Hash Tables",
    description:
      "Your confidence is strong. Use occasional maintenance questions instead of full-topic revision.",
  },
];

export default function AIInterviewPreparationConceptConfidenceMap() {
  const [analyzed, setAnalyzed] = useState(false);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");

  const filteredConcepts =
    filter === "All"
      ? concepts
      : concepts.filter((concept) => concept.status === filter);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Concept Confidence Map
          </h1>

          <p className="text-gray-500">
            Explore your confidence across individual interview concepts.
          </p>
        </div>

      </div>

      {/* Overview */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <p className="text-sm text-gray-500">
              Confidence Analysis
            </p>

            <h2 className="text-xl font-bold">
              Concept-Level Readiness
            </h2>

          </div>

        </div>

        <p className="text-gray-600 mt-4">
          AI combines question accuracy, recall performance, and recent
          activity to estimate confidence for each individual concept.
        </p>

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          Generate Confidence Map
        </button>

      </div>

      {analyzed && (
        <>
          {/* Summary */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <BarChart3
                  className="text-indigo-600"
                  size={40}
                />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Overall Concept Confidence
                </p>

                <p className="text-6xl font-black text-indigo-600">
                  78%
                </p>

                <span className="inline-block mt-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                  Developing
                </span>

                <p className="text-gray-600 mt-3">
                  Your broad topic scores look healthy, but several individual
                  concepts have noticeably lower confidence and require
                  targeted practice.
                </p>

              </div>

            </div>

          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <CheckCircle2 className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Strong Concepts
              </p>

              <p className="text-3xl font-black text-green-600">
                4
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <TrendingUp className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Developing
              </p>

              <p className="text-3xl font-black text-indigo-600">
                2
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <AlertTriangle className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Uncertain / Weak
              </p>

              <p className="text-3xl font-black text-orange-600">
                2
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <RotateCcw className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Need Targeted Practice
              </p>

              <p className="text-3xl font-black text-indigo-600">
                4
              </p>

            </div>

          </div>

          {/* Filters */}
          <div className="bg-white rounded-2xl shadow p-5">

            <div className="flex flex-wrap gap-2">

              {["All", "Strong", "Developing", "Uncertain", "Weak"].map(
                (item) => (
                  <button
                    type="button"
                    key={item}
                    onClick={() => setFilter(item)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold ${
                      filter === item
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}

            </div>

          </div>

          {/* Confidence Map */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Interactive Concept Map
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Select a concept to inspect its accuracy and recall evidence.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

              {filteredConcepts.map((concept) => (
                <button
                  type="button"
                  key={concept.name}
                  onClick={() =>
                    setSelected(
                      selected?.name === concept.name
                        ? null
                        : concept
                    )
                  }
                  className={`rounded-2xl p-5 text-left border transition ${
                    concept.confidence >= 85
                      ? "bg-green-50 border-green-200 hover:border-green-400"
                      : concept.confidence >= 70
                      ? "bg-indigo-50 border-indigo-200 hover:border-indigo-400"
                      : concept.confidence >= 60
                      ? "bg-yellow-50 border-yellow-200 hover:border-yellow-400"
                      : "bg-orange-50 border-orange-200 hover:border-orange-400"
                  }`}
                >

                  <div className="flex justify-between items-start">

                    <div>

                      <p className="text-xs text-gray-500">
                        {concept.topic}
                      </p>

                      <h3 className="font-bold mt-1">
                        {concept.name}
                      </h3>

                    </div>

                    {concept.confidence >= 85 ? (
                      <CheckCircle2
                        className="text-green-600"
                        size={20}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-orange-600"
                        size={20}
                      />
                    )}

                  </div>

                  <p className="text-4xl font-black text-indigo-600 mt-5">
                    {concept.confidence}%
                  </p>

                  <p className="text-xs text-gray-500 mt-1">
                    Confidence
                  </p>

                  <div className="h-2 bg-white/70 rounded-full mt-4">

                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{
                        width: `${concept.confidence}%`,
                      }}
                    />

                  </div>

                  <span className="inline-block mt-4 px-3 py-1 rounded-full bg-white text-xs font-semibold">
                    {concept.status}
                  </span>

                  {selected?.name === concept.name && (
                    <div className="mt-4 bg-white rounded-xl p-4">

                      <div className="flex justify-between text-sm">

                        <span className="text-gray-500">
                          Accuracy
                        </span>

                        <strong>
                          {concept.accuracy}%
                        </strong>

                      </div>

                      <div className="flex justify-between text-sm mt-2">

                        <span className="text-gray-500">
                          Recall
                        </span>

                        <strong>
                          {concept.recall}%
                        </strong>

                      </div>

                      <p className="text-xs text-gray-500 mt-3">
                        Confidence is calculated from recent performance,
                        accuracy, recall, and consistency.
                      </p>

                    </div>
                  )}

                </button>
              ))}

            </div>

          </div>

          {/* Accuracy vs Recall */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Accuracy vs Recall
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              A high accuracy score with weak recall may indicate that a
              concept needs reinforcement.
            </p>

            <div className="space-y-5 mt-6">

              {concepts.map((concept) => (
                <div key={concept.name}>

                  <div className="flex justify-between text-sm mb-2">

                    <span className="font-medium">
                      {concept.name}
                    </span>

                    <span className="text-gray-500">
                      Accuracy {concept.accuracy}% · Recall {concept.recall}%
                    </span>

                  </div>

                  <div className="relative h-4 bg-gray-200 rounded-full">

                    <div
                      className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full"
                      style={{
                        width: `${concept.accuracy}%`,
                      }}
                    />

                    <div
                      className="absolute top-[-4px] w-1 h-6 bg-black"
                      style={{
                        left: `${concept.recall}%`,
                      }}
                    />

                  </div>

                </div>
              ))}

            </div>

            <div className="flex gap-5 mt-5 text-xs text-gray-500">

              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-indigo-600" />
                Accuracy
              </span>

              <span className="flex items-center gap-2">
                <span className="w-1 h-4 bg-black" />
                Recall
              </span>

            </div>

          </div>

          {/* Weak Concepts */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  Concepts Needing Attention
                </h2>

                <div className="space-y-3 mt-3">

                  {concepts
                    .filter((concept) => concept.confidence < 70)
                    .map((concept) => (
                      <div
                        key={concept.name}
                        className="bg-white rounded-xl p-4"
                      >

                        <div className="flex justify-between">

                          <strong>
                            {concept.name}
                          </strong>

                          <span className="font-bold text-orange-600">
                            {concept.confidence}%
                          </span>

                        </div>

                        <p className="text-sm text-gray-600 mt-2">
                          Accuracy: {concept.accuracy}% · Recall:{" "}
                          {concept.recall}%
                        </p>

                      </div>
                    ))}

                </div>

              </div>

            </div>

          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-2xl shadow p-5">

            <div className="flex items-center gap-3">

              <Lightbulb className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  AI Targeted Recommendations
                </h2>

                <p className="text-sm text-gray-500">
                  Recommended actions based on concept confidence.
                </p>

              </div>

            </div>

            <div className="space-y-4 mt-5">

              {recommendations.map((item, index) => (
                <div
                  key={item.title}
                  className="flex gap-4 border rounded-xl p-4"
                >

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-600 mt-1">
                      {item.description}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Confidence Levels */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <h2 className="font-bold text-indigo-700">
              Confidence Levels
            </h2>

            <div className="grid md:grid-cols-4 gap-3 mt-5">

              {[
                ["Strong", "85–100%", "Maintenance practice"],
                ["Developing", "70–84%", "Regular practice"],
                ["Uncertain", "60–69%", "Targeted reinforcement"],
                ["Weak", "0–59%", "Foundation revision"],
              ].map(([level, range, action]) => (
                <div
                  key={level}
                  className="bg-white rounded-xl p-4"
                >

                  <p className="font-bold">
                    {level}
                  </p>

                  <p className="text-2xl font-black text-indigo-600 mt-2">
                    {range}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    {action}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Final Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <TrendingUp
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Preparation Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Focus your next practice session on{" "}
                  <strong>Dynamic Programming</strong> and{" "}
                  <strong>Database Normalization</strong>. Maintain strong
                  concepts with short recall questions instead of repeating
                  complete revision sessions.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}