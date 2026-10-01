import React, { useState } from "react";
import {
  Brain,
  TrendingUp,
  Target,
  CheckCircle2,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";

const sessions = [
  {
    name: "Session 1",
    date: "4 weeks ago",
    score: 54,
    depth: 48,
    details: 52,
    reasoning: 55,
    tradeoffs: 42,
    edgeCases: 38,
    followups: 46,
  },
  {
    name: "Session 2",
    date: "3 weeks ago",
    score: 63,
    depth: 60,
    details: 62,
    reasoning: 64,
    tradeoffs: 51,
    edgeCases: 48,
    followups: 55,
  },
  {
    name: "Session 3",
    date: "2 weeks ago",
    score: 72,
    depth: 70,
    details: 74,
    reasoning: 71,
    tradeoffs: 63,
    edgeCases: 58,
    followups: 65,
  },
  {
    name: "Session 4",
    date: "Latest",
    score: 81,
    depth: 83,
    details: 82,
    reasoning: 80,
    tradeoffs: 76,
    edgeCases: 72,
    followups: 78,
  },
];

const metrics = [
  ["Conceptual Depth", "depth"],
  ["Technical Details", "details"],
  ["Reasoning Quality", "reasoning"],
  ["Trade-off Discussion", "tradeoffs"],
  ["Edge-case Coverage", "edgeCases"],
  ["Follow-up Handling", "followups"],
];

export default function AIInterviewAnswerTechnicalDepthProgression() {
  const [selectedSession, setSelectedSession] = useState(
    sessions[sessions.length - 1]
  );

  const first = sessions[0];
  const latest = sessions[sessions.length - 1];
  const improvement = latest.score - first.score;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Depth Progression
          </h1>

          <p className="text-gray-500">
            Track how deeply your technical interview answers develop over
            time.
          </p>
        </div>

      </div>

      {/* Growth Summary */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <TrendingUp className="text-indigo-600" size={28} />

          <div>

            <h2 className="font-bold text-indigo-700">
              Technical Growth
            </h2>

            <p className="text-gray-600 mt-2">
              Your technical-depth score increased from{" "}
              <strong>{first.score}%</strong> to{" "}
              <strong>{latest.score}%</strong> across recent interview
              sessions.
            </p>

          </div>

        </div>

      </div>

      {/* Overall Score */}
      <div className="grid md:grid-cols-3 gap-4">

        <div className="bg-white rounded-2xl shadow p-5">

          <p className="text-sm text-gray-500">
            Current Depth
          </p>

          <p className="text-4xl font-black text-indigo-600 mt-2">
            {latest.score}%
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <p className="text-sm text-gray-500">
            Overall Improvement
          </p>

          <p className="text-4xl font-black text-green-600 mt-2">
            +{improvement}%
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <p className="text-sm text-gray-500">
            Sessions Analyzed
          </p>

          <p className="text-4xl font-black text-gray-800 mt-2">
            {sessions.length}
          </p>

        </div>

      </div>

      {/* Progression Timeline */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-2">

          <BarChart3 className="text-indigo-600" />

          <h2 className="font-bold text-lg">
            Technical-Depth Progression
          </h2>

        </div>

        <div className="space-y-5 mt-6">

          {sessions.map((session, index) => (
            <button
              type="button"
              key={session.name}
              onClick={() => setSelectedSession(session)}
              className={`w-full text-left border rounded-2xl p-5 transition ${
                selectedSession.name === session.name
                  ? "border-indigo-500 bg-indigo-50"
                  : "border-gray-200"
              }`}
            >

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="font-bold">
                    {session.name}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {session.date}
                  </p>

                </div>

                <span className="text-2xl font-black text-indigo-600">
                  {session.score}%
                </span>

              </div>

              <div className="h-3 bg-gray-200 rounded-full mt-4">

                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${session.score}%`,
                  }}
                />

              </div>

              {index > 0 && (
                <p className="text-sm text-green-600 font-semibold mt-3">
                  +{session.score - sessions[index - 1].score}% from previous
                  session
                </p>
              )}

            </button>
          ))}

        </div>

      </div>

      {/* Selected Session Breakdown */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <p className="text-sm text-gray-500">
              Selected Session
            </p>

            <h2 className="text-xl font-bold">
              {selectedSession.name}
            </h2>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          {metrics.map(([label, key]) => (
            <div key={key}>

              <div className="flex justify-between">

                <span className="font-semibold">
                  {label}
                </span>

                <span className="font-bold text-indigo-600">
                  {selectedSession[key]}%
                </span>

              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-2">

                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${selectedSession[key]}%`,
                  }}
                />

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Growth Areas */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <CheckCircle2 className="text-green-600" />

          <div>

            <h2 className="font-bold text-green-700">
              Strongest Growth Areas
            </h2>

            <p className="text-gray-600 mt-2">
              Your biggest improvement is in technical detail and trade-off
              discussion. You are increasingly explaining not only what your
              solution does, but why specific decisions were made.
            </p>

          </div>

        </div>

      </div>

      {/* Improvement Area */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <ArrowUpRight className="text-orange-600" />

          <div>

            <h2 className="font-bold text-orange-700">
              Next Improvement Area
            </h2>

            <p className="text-gray-600 mt-2">
              Edge-case coverage is currently your lowest dimension. Practice
              explicitly discussing failure scenarios and unusual inputs
              before concluding technical answers.
            </p>

          </div>

        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-indigo-50 rounded-2xl p-5">

        <h2 className="font-bold text-indigo-700">
          AI Progress Insight
        </h2>

        <p className="text-gray-600 mt-2">
          Your answers are becoming more detailed, reasoned, and resilient
          across sessions. Continue adding trade-offs, edge cases, and
          follow-up reasoning to reach advanced interview depth.
        </p>

      </div>

    </div>
  );
}