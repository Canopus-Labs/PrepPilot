import React, { useState } from "react";
import {
  Brain,
  Target,
  AlertTriangle,
  BookOpen,
  RotateCcw,
  Code2,
  Lightbulb,
  Clock3,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

const causes = [
  {
    name: "Knowledge Gap",
    confidence: 82,
    icon: BookOpen,
    color: "red",
    evidence:
      "Low performance on basic concept questions suggests missing foundational understanding.",
    action: "Review the core concept with a short explanation and examples.",
  },
  {
    name: "Recall Problem",
    confidence: 68,
    icon: RotateCcw,
    color: "orange",
    evidence:
      "You perform better immediately after learning but accuracy decreases after longer gaps.",
    action: "Use spaced recall questions and short revision sessions.",
  },
  {
    name: "Application Problem",
    confidence: 76,
    icon: Code2,
    color: "indigo",
    evidence:
      "Definitions are correct, but performance drops when the concept must be applied to a new problem.",
    action: "Practice short application-based problems.",
  },
  {
    name: "Reasoning Problem",
    confidence: 54,
    icon: Brain,
    color: "yellow",
    evidence:
      "Correct answers are sometimes reached without clearly explaining the reasoning.",
    action: "Practice explain-your-approach challenges.",
  },
];

const metrics = [
  ["Concept Accuracy", "72%"],
  ["Recall Accuracy", "61%"],
  ["Application Accuracy", "54%"],
  ["Avg. Solving Time", "4m 18s"],
];

export default function AIInterviewPreparationWeaknessCauseAnalyzer() {
  const [topic, setTopic] = useState("Dynamic Programming");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedCause, setSelectedCause] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Weakness Cause Analyzer
          </h1>

          <p className="text-gray-500">
            Discover the root cause behind repeated weaknesses instead of
            simply practicing more questions.
          </p>
        </div>

      </div>

      {/* Topic */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

          <div>
            <p className="text-sm text-gray-500">
              Topic Under Analysis
            </p>

            <h2 className="text-2xl font-bold mt-1">
              {topic}
            </h2>

            <p className="text-gray-600 mt-2">
              AI analyzes your historical performance to identify the likely
              reason behind the weakness.
            </p>
          </div>

          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border rounded-xl px-4 py-3 outline-none"
          >
            <option>Dynamic Programming</option>
            <option>Graph Algorithms</option>
            <option>Binary Search</option>
            <option>SQL</option>
            <option>System Design</option>
          </select>

        </div>

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="mt-6 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          Analyze Weakness Cause
        </button>

      </div>

      {analyzed && (
        <>
          {/* Main Result */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <Target
                  className="text-orange-600"
                  size={40}
                />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Primary Likely Cause
                </p>

                <h2 className="text-3xl font-black text-orange-700">
                  Application Problem
                </h2>

                <p className="text-gray-600 mt-2">
                  Your conceptual knowledge is stronger than your ability to
                  apply the concept to unfamiliar problems.
                </p>

              </div>

            </div>

          </div>

          {/* Performance Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            {metrics.map(([label, value]) => (
              <div
                key={label}
                className="bg-white rounded-2xl shadow p-5"
              >
                <p className="text-sm text-gray-500">
                  {label}
                </p>

                <p className="text-3xl font-black text-indigo-600 mt-3">
                  {value}
                </p>
              </div>
            ))}

          </div>

          {/* Cause Classification */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Root Cause Analysis
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI ranks possible causes according to your observed performance
              patterns.
            </p>

            <div className="space-y-4 mt-6">

              {causes.map((cause, index) => {
                const Icon = cause.icon;

                return (
                  <button
                    type="button"
                    key={cause.name}
                    onClick={() =>
                      setSelectedCause(
                        selectedCause?.name === cause.name
                          ? null
                          : cause
                      )
                    }
                    className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                  >

                    <div className="flex gap-4">

                      <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600 h-fit">
                        <Icon size={22} />
                      </div>

                      <div className="flex-1">

                        <div className="flex justify-between gap-4">

                          <div>

                            <span className="text-xs text-gray-500">
                              #{index + 1} Likely Cause
                            </span>

                            <h3 className="font-bold mt-1">
                              {cause.name}
                            </h3>

                          </div>

                          <p className="text-2xl font-black text-indigo-600">
                            {cause.confidence}%
                          </p>

                        </div>

                        <div className="h-3 bg-gray-200 rounded-full mt-4">

                          <div
                            className="h-full bg-indigo-600 rounded-full"
                            style={{
                              width: `${cause.confidence}%`,
                            }}
                          />

                        </div>

                        <p className="text-sm text-gray-600 mt-3">
                          {cause.evidence}
                        </p>

                        {selectedCause?.name === cause.name && (
                          <div className="mt-4 bg-green-50 rounded-xl p-4">

                            <p className="text-xs font-semibold text-green-700">
                              Recommended Corrective Activity
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                              {cause.action}
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

          {/* Why This Is Not Just Weakness */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  Why AI Identified an Application Problem
                </h2>

                <p className="text-gray-600 mt-2">
                  You correctly answered several definition and recall
                  questions, but your performance decreased significantly when
                  unfamiliar problem statements required you to select and
                  apply the concept independently.
                </p>

                <div className="grid md:grid-cols-3 gap-4 mt-5">

                  <div className="bg-white rounded-xl p-4">
                    <p className="text-sm text-gray-500">
                      Concept Recall
                    </p>

                    <p className="text-2xl font-black text-green-600 mt-2">
                      Strong
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4">
                    <p className="text-sm text-gray-500">
                      New Problem Application
                    </p>

                    <p className="text-2xl font-black text-orange-600 mt-2">
                      Weak
                    </p>
                  </div>

                  <div className="bg-white rounded-xl p-4">
                    <p className="text-sm text-gray-500">
                      Root Cause Confidence
                    </p>

                    <p className="text-2xl font-black text-indigo-600 mt-2">
                      76%
                    </p>
                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Corrective Activity */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-green-700">
                  Personalized Corrective Activity
                </h2>

                <p className="text-gray-600 mt-2">
                  Instead of repeating full-length Dynamic Programming
                  questions, AI recommends short application exercises.
                </p>

                <div className="space-y-3 mt-5">

                  {[
                    "Identify the relevant concept from an unlabeled problem.",
                    "Define the state before writing any code.",
                    "Explain the transition in one or two sentences.",
                    "Solve one small application problem without hints.",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="bg-white rounded-xl p-4 flex gap-3"
                    >

                      <span className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                        {index + 1}
                      </span>

                      <p className="text-sm text-gray-600">
                        {item}
                      </p>

                    </div>
                  ))}

                </div>

                <button
                  type="button"
                  className="mt-5 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold"
                >
                  Start Corrective Practice
                </button>

              </div>

            </div>

          </div>

          {/* Cause vs Action */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Cause → Corrective Strategy
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              {[
                [
                  "Knowledge Gap",
                  "Concept explanation + examples",
                ],
                [
                  "Recall Problem",
                  "Spaced repetition + recall questions",
                ],
                [
                  "Application Problem",
                  "Mini application exercises",
                ],
                [
                  "Reasoning Problem",
                  "Explain-your-approach challenges",
                ],
                [
                  "Time Management",
                  "Timed practice sessions",
                ],
                [
                  "Communication Problem",
                  "Structured answer + speaking practice",
                ],
              ].map(([cause, action]) => (
                <div
                  key={cause}
                  className="border rounded-xl p-4"
                >

                  <p className="font-bold">
                    {cause}
                  </p>

                  <div className="flex items-center gap-2 mt-3">
                    <span className="text-indigo-600">→</span>

                    <p className="text-sm text-gray-600">
                      {action}
                    </p>
                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Additional Signals */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Performance Signals Used
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="border rounded-xl p-4">
                <BookOpen className="text-indigo-600" />

                <p className="font-semibold mt-3">
                  Knowledge
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Basic concept and definition accuracy.
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <RotateCcw className="text-indigo-600" />

                <p className="font-semibold mt-3">
                  Recall
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Performance after time away from the topic.
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <Code2 className="text-indigo-600" />

                <p className="font-semibold mt-3">
                  Application
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Ability to use concepts in new problems.
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <Brain className="text-indigo-600" />

                <p className="font-semibold mt-3">
                  Reasoning
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Quality of problem-solving explanation.
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <Clock3 className="text-indigo-600" />

                <p className="font-semibold mt-3">
                  Time Management
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Solving speed compared with expected difficulty.
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <MessageSquare className="text-indigo-600" />

                <p className="font-semibold mt-3">
                  Communication
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  Clarity and completeness of technical explanations.
                </p>
              </div>

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Do not increase the number of full-length practice questions
                  yet. First complete a short application-focused session. If
                  your application accuracy improves while recall remains
                  stable, AI will gradually increase question difficulty.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}