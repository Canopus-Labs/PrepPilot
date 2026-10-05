import React, { useState } from "react";
import {
  Brain,
  MessageSquare,
  CheckCircle2,
  AlertTriangle,
  Target,
  Lightbulb,
  Code2,
  BookOpen,
  ArrowUpRight,
} from "lucide-react";

const analysisAreas = [
  {
    name: "Technical Correctness",
    score: 88,
    status: "Strong",
    icon: Code2,
  },
  {
    name: "Explanation Clarity",
    score: 58,
    status: "Needs Improvement",
    icon: MessageSquare,
  },
  {
    name: "Supporting Reasoning",
    score: 72,
    status: "Moderate",
    icon: Target,
  },
  {
    name: "Examples",
    score: 45,
    status: "Weak",
    icon: BookOpen,
  },
  {
    name: "Technical Terminology",
    score: 81,
    status: "Strong",
    icon: Brain,
  },
  {
    name: "Answer Structure",
    score: 62,
    status: "Needs Improvement",
    icon: MessageSquare,
  },
];

const communicationGaps = [
  {
    title: "Missing concrete example",
    description:
      "The technical explanation is correct, but no example was provided to demonstrate how the concept works.",
    severity: "Medium",
  },
  {
    title: "Reasoning is compressed",
    description:
      "Several logical steps are implied rather than explicitly explained to the interviewer.",
    severity: "High",
  },
  {
    title: "Weak conclusion",
    description:
      "The response ends without clearly summarizing why the proposed approach satisfies the requirements.",
    severity: "Medium",
  },
];

export default function AIInterviewAnswerTechnicalCommunicationGapDetector() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedGap, setSelectedGap] = useState(null);

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
            AI Technical Communication Gap Detector
          </h1>

          <p className="text-gray-500">
            Identify whether an unclear technical answer needs more knowledge
            or better communication.
          </p>

        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Question
            </h2>

            <p className="text-sm text-gray-500">
              Explain why a hash map can provide average O(1) lookup time and
              describe situations where this assumption may not hold.
            </p>

          </div>

        </div>

      </div>

      {/* Answer Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <MessageSquare className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Your Interview Answer
            </h2>

            <p className="text-sm text-gray-500">
              Enter the answer exactly as you would explain it during an
              interview.
            </p>

          </div>

        </div>

        <textarea
          rows={9}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Example: A hash map gives O(1) average lookup because it uses a hash function to determine where a key should be stored..."
          className="w-full border rounded-xl p-4 mt-5 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={analyzeAnswer}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Communication Gap
        </button>

      </div>

      {analyzed && (
        <>
          {/* Primary Diagnosis */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 bg-white rounded-2xl">

                <MessageSquare
                  className="text-indigo-600"
                  size={42}
                />

              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Primary Gap Detected
                </p>

                <div className="flex flex-wrap items-center gap-3 mt-1">

                  <h2 className="text-4xl font-black text-indigo-700">
                    Communication
                  </h2>

                  <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold">
                    Technical Understanding Strong
                  </span>

                </div>

                <p className="text-gray-600 mt-3">
                  Your technical reasoning appears mostly correct. The main
                  weakness is how the reasoning is communicated rather than a
                  fundamental lack of technical knowledge.
                </p>

              </div>

            </div>

          </div>

          {/* Knowledge vs Communication */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Brain className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Knowledge vs Communication Diagnosis
                </h2>

                <p className="text-sm text-gray-500">
                  AI separates technical understanding from explanation
                  quality.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

              <div className="border rounded-2xl p-5">

                <div className="flex justify-between">

                  <h3 className="font-bold">
                    Technical Understanding
                  </h3>

                  <span className="text-green-600 font-black">
                    82%
                  </span>

                </div>

                <div className="h-4 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: "82%" }}
                  />

                </div>

                <p className="text-sm text-gray-500 mt-4">
                  The answer demonstrates a generally correct understanding of
                  the underlying technical concept.
                </p>

              </div>

              <div className="border rounded-2xl p-5">

                <div className="flex justify-between">

                  <h3 className="font-bold">
                    Communication Quality
                  </h3>

                  <span className="text-orange-600 font-black">
                    61%
                  </span>

                </div>

                <div className="h-4 bg-gray-200 rounded-full mt-4">

                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: "61%" }}
                  />

                </div>

                <p className="text-sm text-gray-500 mt-4">
                  The explanation needs clearer reasoning, examples, and a more
                  structured conclusion.
                </p>

              </div>

            </div>

          </div>

          {/* Analysis Breakdown */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Answer Analysis Breakdown
                </h2>

                <p className="text-sm text-gray-500">
                  Each dimension is evaluated separately.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-4 mt-6">

              {analysisAreas.map((area) => {

                const Icon = area.icon;

                return (
                  <div
                    key={area.name}
                    className="border rounded-xl p-5"
                  >

                    <div className="flex items-center gap-3">

                      <div className="p-3 bg-indigo-50 rounded-xl">
                        <Icon
                          className="text-indigo-600"
                          size={21}
                        />
                      </div>

                      <div className="flex-1">

                        <div className="flex justify-between gap-3">

                          <h3 className="font-bold">
                            {area.name}
                          </h3>

                          <span className="font-black">
                            {area.score}%
                          </span>

                        </div>

                        <div className="h-3 bg-gray-200 rounded-full mt-3">

                          <div
                            className={`h-full rounded-full ${
                              area.score >= 80
                                ? "bg-green-500"
                                : area.score >= 60
                                ? "bg-indigo-500"
                                : "bg-orange-500"
                            }`}
                            style={{
                              width: `${area.score}%`,
                            }}
                          />

                        </div>

                        <p className="text-xs text-gray-500 mt-2">
                          {area.status}
                        </p>

                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

          </div>

          {/* Communication Gaps */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-orange-700">
                  Communication Gaps Detected
                </h2>

                <p className="text-gray-600 mt-2">
                  These issues reduce the clarity of an otherwise technically
                  sound answer.
                </p>

                <div className="space-y-4 mt-5">

                  {communicationGaps.map((gap, index) => {

                    const selected = selectedGap === index;

                    return (
                      <button
                        type="button"
                        key={gap.title}
                        onClick={() =>
                          setSelectedGap(
                            selected ? null : index
                          )
                        }
                        className="w-full text-left bg-white rounded-xl p-5"
                      >

                        <div className="flex items-center gap-3">

                          <AlertTriangle
                            className={
                              gap.severity === "High"
                                ? "text-red-600"
                                : "text-orange-600"
                            }
                          />

                          <div className="flex-1">

                            <div className="flex justify-between gap-3">

                              <h3 className="font-bold">
                                {gap.title}
                              </h3>

                              <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                  gap.severity === "High"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-orange-100 text-orange-700"
                                }`}
                              >
                                {gap.severity}
                              </span>

                            </div>

                          </div>

                        </div>

                        {selected && (
                          <p className="text-sm text-gray-600 mt-4">
                            {gap.description}
                          </p>
                        )}

                      </button>
                    );
                  })}

                </div>

              </div>

            </div>

          </div>

          {/* Original vs Improved */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Lightbulb className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Communication Improvement
                </h2>

                <p className="text-sm text-gray-500">
                  Preserve the technical meaning while making the explanation
                  easier to follow.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

              <div className="bg-orange-50 rounded-xl p-5">

                <p className="text-xs font-bold text-orange-700">
                  Current Explanation
                </p>

                <p className="text-gray-600 mt-3">
                  "Hash maps are O(1) because they use hashing, so lookup is
                  fast. Sometimes collisions happen."
                </p>

              </div>

              <div className="bg-green-50 rounded-xl p-5">

                <p className="text-xs font-bold text-green-700">
                  AI Suggested Explanation
                </p>

                <p className="text-gray-600 mt-3">
                  "A hash map uses a hash function to map a key to a storage
                  location, making lookup O(1) on average. Collisions can cause
                  multiple keys to share a location, and excessive collisions
                  can increase lookup time."
                </p>

              </div>

            </div>

          </div>

          {/* What Not To Do */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <AlertTriangle className="text-orange-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Avoid Unnecessary Technical Revision
                </h2>

                <p className="text-sm text-gray-500">
                  AI determines whether more technical study is actually
                  required.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-2 gap-5 mt-6">

              <div className="border rounded-xl p-5">

                <p className="text-xs text-red-600 font-bold">
                  Instead of
                </p>

                <p className="font-bold mt-2">
                  Re-learning hash maps from the beginning
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Your technical understanding is already sufficient.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <p className="text-xs text-green-600 font-bold">
                  Focus on
                </p>

                <p className="font-bold mt-2">
                  Explaining the concept with structure and examples
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Practice turning correct internal reasoning into clear
                  interviewer-facing explanations.
                </p>

              </div>

            </div>

          </div>

          {/* AI Diagnosis */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Brain
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Final Diagnosis
                </h2>

                <p className="text-gray-600 mt-2">
                  The primary issue is a <strong>communication gap</strong>,
                  not a major knowledge gap. Your technical reasoning is
                  mostly correct, but the response would benefit from a clearer
                  structure, a concrete example, and explicit reasoning between
                  major points.
                </p>

              </div>

            </div>

          </div>

          {/* Practice Plan */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Personalized Improvement Plan
                </h2>

                <p className="text-sm text-gray-500">
                  Focus on communication rather than unnecessary technical
                  revision.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">

              <div className="border rounded-xl p-5">

                <MessageSquare className="text-indigo-600" />

                <h3 className="font-bold mt-3">
                  Explain in Steps
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Break technical reasoning into short logical steps.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <BookOpen className="text-green-600" />

                <h3 className="font-bold mt-3">
                  Add Examples
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Support important concepts with small practical examples.
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <Target className="text-purple-600" />

                <h3 className="font-bold mt-3">
                  End With a Conclusion
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Summarize why your approach satisfies the question.
                </p>

              </div>

            </div>

          </div>

          {/* Next Practice */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-green-700">
                  Recommended Next Practice
                </h2>

                <p className="text-gray-600 mt-2">
                  Practice explaining a technical concept in 60 seconds using
                  the structure: definition → reasoning → example → limitation
                  → conclusion.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2"
                >
                  Start Communication Challenge
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