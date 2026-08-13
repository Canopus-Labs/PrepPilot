import React, { useState } from "react";
import {
  Brain,
  Network,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

const components = [
  {
    name: "Frontend",
    dependsOn: "API",
    score: 91,
    status: "Clear",
    explanation:
      "The frontend sends requests to the API to retrieve and submit application data.",
  },
  {
    name: "API",
    dependsOn: "Database",
    score: 84,
    status: "Clear",
    explanation:
      "The API reads and writes application data through the database layer.",
  },
  {
    name: "Authentication Service",
    dependsOn: "API",
    score: 63,
    status: "Needs Explanation",
    explanation:
      "The answer mentions authentication but does not clearly explain how the API validates authenticated requests.",
  },
  {
    name: "Caching Layer",
    dependsOn: "API",
    score: 52,
    status: "Missing",
    explanation:
      "The caching layer is mentioned but its relationship with the API is not explained.",
  },
];

export default function AIInterviewAnswerTechnicalDependencyExplanation() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Dependency Explanation
          </h1>

          <p className="text-gray-500">
            Explain how the components of your technical solution depend on
            and interact with each other.
          </p>
        </div>

      </div>

      {/* Interview Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Explain the architecture of your application and how its major
          components interact.
        </h2>

        <p className="text-gray-600 mt-3">
          Mention the important components and explain why each dependency
          exists.
        </p>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Technical Explanation
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={8}
          placeholder="Explain how your frontend, APIs, database, services, and other components interact..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Dependencies
        </button>

      </div>

      {analyzed && (
        <>
          {/* Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <Network
              className="mx-auto text-indigo-600"
              size={40}
            />

            <p className="text-sm text-gray-500 mt-3">
              Dependency Explanation Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              74%
            </p>

            <p className="text-gray-600 mt-2">
              Most major dependencies are understandable, but some component
              relationships require clearer explanation.
            </p>

          </div>

          {/* Dependency Map */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Component Dependency Map
            </h2>

            <div className="flex flex-col items-center gap-3 mt-6">

              <div className="px-6 py-4 rounded-xl bg-indigo-100 text-indigo-700 font-bold">
                Frontend
              </div>

              <ArrowRight
                className="rotate-90 text-gray-400"
                size={22}
              />

              <div className="px-6 py-4 rounded-xl bg-green-100 text-green-700 font-bold">
                API Layer
              </div>

              <ArrowRight
                className="rotate-90 text-gray-400"
                size={22}
              />

              <div className="px-6 py-4 rounded-xl bg-orange-100 text-orange-700 font-bold">
                Database
              </div>

            </div>

            <p className="text-center text-gray-600 mt-5">
              The API acts as the connection between the frontend and database,
              handling requests and data operations.
            </p>

          </div>

          {/* Component Analysis */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Dependency Analysis
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Select a component to see why its dependency explanation was
              scored.
            </p>

            <div className="space-y-4 mt-5">

              {components.map((component) => (
                <button
                  type="button"
                  key={component.name}
                  onClick={() =>
                    setSelected(
                      selected?.name === component.name
                        ? null
                        : component
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex justify-between gap-4">

                    <div className="flex gap-3">

                      {component.status === "Clear" ? (
                        <CheckCircle2
                          className="text-green-600 mt-1"
                          size={21}
                        />
                      ) : (
                        <AlertTriangle
                          className="text-orange-600 mt-1"
                          size={21}
                        />
                      )}

                      <div>

                        <h3 className="font-semibold">
                          {component.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Depends on:{" "}
                          <strong>{component.dependsOn}</strong>
                        </p>

                      </div>

                    </div>

                    <span className="font-bold text-indigo-600">
                      {component.score}%
                    </span>

                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-4">

                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{
                        width: `${component.score}%`,
                      }}
                    />

                  </div>

                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-xs font-semibold ${
                      component.status === "Clear"
                        ? "bg-green-100 text-green-700"
                        : component.status === "Needs Explanation"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {component.status}
                  </span>

                  {selected?.name === component.name && (
                    <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                      <p className="text-sm text-gray-600">
                        {component.explanation}
                      </p>

                    </div>
                  )}

                </button>
              ))}

            </div>

          </div>

          {/* Missing Relationship */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <AlertTriangle className="text-orange-600" />

              <div>

                <h2 className="font-bold text-orange-700">
                  Missing Dependency Explanation
                </h2>

                <p className="text-gray-600 mt-2">
                  The relationship between the{" "}
                  <strong>Authentication Service</strong> and{" "}
                  <strong>API</strong> needs more detail. Explain where
                  authentication is checked, what information is passed, and
                  how the API decides whether a request is authorized.
                </p>

              </div>

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Lightbulb className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  When explaining an architecture, do not only list the
                  technologies. For each important connection, explain what
                  data or responsibility moves between components and why the
                  dependency is necessary.
                </p>

              </div>

            </div>

          </div>

          {/* Practice */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <h2 className="font-bold text-indigo-700">
              Dependency Practice
            </h2>

            <p className="text-gray-600 mt-2">
              Try explaining the relationship between the API and
              authentication service in two or three sentences.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Practice Dependency Explanation
            </button>

          </div>

        </>
      )}

    </div>
  );
}