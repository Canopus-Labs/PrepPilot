import React, { useState } from "react";
import {
  Brain,
  Search,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target,
  HelpCircle,
} from "lucide-react";

const requirements = [
  {
    name: "Functional Requirement",
    text: "Users should be able to upload and retrieve files.",
    type: "Explicit",
    importance: "High",
    considered: true,
  },
  {
    name: "Scalability",
    text: "The system should support a growing number of users and files.",
    type: "Implicit",
    importance: "High",
    considered: false,
  },
  {
    name: "Availability",
    text: "File access should remain available when individual components fail.",
    type: "Implicit",
    importance: "High",
    considered: false,
  },
  {
    name: "Security",
    text: "Uploaded files should only be accessible to authorized users.",
    type: "Implicit",
    importance: "Critical",
    considered: true,
  },
  {
    name: "Storage Cost",
    text: "Storage and infrastructure costs should remain manageable as data grows.",
    type: "Implicit",
    importance: "Medium",
    considered: false,
  },
];

export default function AIInterviewQuestionHiddenRequirementDetector() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selected, setSelected] = useState(null);
  const [clarified, setClarified] = useState(false);

  const explicitCount = requirements.filter(
    (item) => item.type === "Explicit"
  ).length;

  const implicitCount = requirements.filter(
    (item) => item.type === "Implicit"
  ).length;

  const consideredCount = requirements.filter(
    (item) => item.considered
  ).length;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Hidden Requirement Detector
          </h1>

          <p className="text-gray-500">
            Discover implicit requirements and constraints hidden inside
            interview questions.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-2">

          <Search
            className="text-indigo-600"
            size={20}
          />

          <p className="text-sm text-gray-500">
            Interview Question
          </p>

        </div>

        <h2 className="text-xl font-bold mt-3">
          Design a file storage system where users can upload and retrieve
          files.
        </h2>

        <p className="text-gray-600 mt-3">
          Before designing the system, identify both the requirements that are
          directly stated and the requirements that a real production system
          would likely need.
        </p>

      </div>

      {/* Candidate Analysis */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Requirement Analysis
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={7}
          placeholder="List the requirements and constraints you think should be considered..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Detect Hidden Requirements
        </button>

      </div>

      {analyzed && (
        <>
          {/* Summary */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-4">

              <Target
                className="text-indigo-600"
                size={32}
              />

              <div>

                <p className="text-sm text-gray-500">
                  Requirement Coverage
                </p>

                <p className="text-5xl font-black text-indigo-600">
                  62%
                </p>

                <span className="inline-block mt-3 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-semibold">
                  Hidden Requirements Detected
                </span>

                <p className="text-gray-600 mt-3">
                  You identified the primary functionality, but several
                  production-level requirements were not explicitly addressed.
                </p>

              </div>

            </div>

          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <p className="text-sm text-gray-500">
                Explicit Requirements
              </p>

              <p className="text-3xl font-black text-indigo-600 mt-2">
                {explicitCount}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Directly stated
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <p className="text-sm text-gray-500">
                Implicit Requirements
              </p>

              <p className="text-3xl font-black text-orange-600 mt-2">
                {implicitCount}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                AI identified
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <p className="text-sm text-gray-500">
                Considered
              </p>

              <p className="text-3xl font-black text-green-600 mt-2">
                {consideredCount}/{requirements.length}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Requirements addressed
              </p>

            </div>

          </div>

          {/* Requirement Analysis */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Requirement Analysis
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Select a requirement to understand why AI identified it.
            </p>

            <div className="space-y-4 mt-5">

              {requirements.map((requirement) => (
                <button
                  type="button"
                  key={requirement.name}
                  onClick={() =>
                    setSelected(
                      selected?.name === requirement.name
                        ? null
                        : requirement
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex gap-3">

                    {requirement.considered ? (
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

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <h3 className="font-semibold">
                            {requirement.name}
                          </h3>

                          <p className="text-sm text-gray-600 mt-1">
                            {requirement.text}
                          </p>

                        </div>

                        <span
                          className={`h-fit px-3 py-1 rounded-full text-xs font-semibold ${
                            requirement.type === "Explicit"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {requirement.type}
                        </span>

                      </div>

                      <div className="flex gap-2 mt-3">

                        <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs">
                          Importance: {requirement.importance}
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-xs ${
                            requirement.considered
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {requirement.considered
                            ? "Considered"
                            : "Not Considered"}
                        </span>

                      </div>

                      {selected?.name === requirement.name && (
                        <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                          <p className="text-sm text-gray-600">
                            This requirement matters because a production
                            solution must account for it even though the
                            interviewer did not state it directly.
                          </p>

                        </div>
                      )}

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Clarification Prompt */}
          <div className="bg-yellow-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <HelpCircle
                className="text-yellow-600"
                size={26}
              />

              <div className="flex-1">

                <h2 className="font-bold text-yellow-700">
                  Should You Clarify the Requirements?
                </h2>

                <p className="text-gray-600 mt-2">
                  In a real interview, you could ask whether scalability,
                  availability, security, and cost are important constraints
                  before finalizing your design.
                </p>

                {!clarified ? (
                  <div className="flex gap-3 mt-4">

                    <button
                      type="button"
                      onClick={() => setClarified(true)}
                      className="px-4 py-2 rounded-lg bg-yellow-600 text-white font-semibold"
                    >
                      Yes, Clarify
                    </button>

                    <button
                      type="button"
                      onClick={() => setClarified(true)}
                      className="px-4 py-2 rounded-lg bg-white border font-semibold"
                    >
                      Proceed With Assumptions
                    </button>

                  </div>
                ) : (
                  <div className="mt-4 bg-white rounded-xl p-4">

                    <p className="text-sm text-gray-600">
                      Good approach. State your assumptions explicitly when
                      the interviewer does not provide enough information.
                    </p>

                  </div>
                )}

              </div>

            </div>

          </div>

          {/* Hidden Requirements */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={26}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  Most Important Hidden Requirements
                </h2>

                <div className="space-y-3 mt-3">

                  <p className="text-gray-600">
                    <strong>Scalability:</strong> What happens when millions
                    of files and users are added?
                  </p>

                  <p className="text-gray-600">
                    <strong>Availability:</strong> Can users still access files
                    if a storage component fails?
                  </p>

                  <p className="text-gray-600">
                    <strong>Security:</strong> Can users access only files they
                    are authorized to retrieve?
                  </p>

                  <p className="text-gray-600">
                    <strong>Cost:</strong> How does storage cost behave as the
                    amount of data increases?
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-green-600"
                size={26}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Before designing a solution, separate the question into{" "}
                  <strong>functional requirements, scale, performance,
                  availability, security, and operational constraints</strong>.
                  If a requirement is not stated, ask the interviewer or
                  clearly state your assumption.
                </p>

              </div>

            </div>

          </div>

          {/* Practice */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <h2 className="font-bold text-indigo-700">
              Hidden Requirement Practice
            </h2>

            <p className="text-gray-600 mt-2">
              Try another ambiguous interview question and identify at least
              three requirements that are not explicitly stated.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Start Practice
            </button>

          </div>

        </>
      )}

    </div>
  );
}