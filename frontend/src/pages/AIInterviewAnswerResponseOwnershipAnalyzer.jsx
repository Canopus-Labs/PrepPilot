import React, { useState } from "react";
import {
  Brain,
  Users,
  UserCheck,
  AlertTriangle,
  CheckCircle2,
  MessageSquare,
  Target,
} from "lucide-react";

const statements = [
  {
    text: "We developed the recommendation system using machine learning.",
    type: "Team Contribution",
    score: 42,
    issue: "Your personal role is unclear.",
  },
  {
    text: "I designed and implemented the data preprocessing pipeline.",
    type: "Personal Contribution",
    score: 94,
    issue: "Clear ownership and responsibility.",
  },
  {
    text: "Our team deployed the application using Docker.",
    type: "Team Contribution",
    score: 48,
    issue: "Specify what you personally handled during deployment.",
  },
  {
    text: "I created the API endpoints and integrated them with the frontend.",
    type: "Personal Contribution",
    score: 91,
    issue: "Strong individual contribution statement.",
  },
];

export default function AIInterviewAnswerResponseOwnershipAnalyzer() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selected, setSelected] = useState(null);
  const [followUp, setFollowUp] = useState("");

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Response Ownership Analyzer
          </h1>

          <p className="text-gray-500">
            Show interviewers exactly what you personally contributed to a
            team project.
          </p>
        </div>

      </div>

      {/* Interview Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Tell me about a project you worked on with a team. What was your
          specific contribution?
        </h2>

        <p className="text-gray-600 mt-3">
          Clearly separate what the team accomplished from what you personally
          designed, implemented, tested, or decided.
        </p>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Project Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={8}
          placeholder="Explain the project and your personal contribution..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Ownership
        </button>

      </div>

      {analyzed && (
        <>
          {/* Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <UserCheck
              className="mx-auto text-indigo-600"
              size={40}
            />

            <p className="text-sm text-gray-500 mt-3">
              Ownership Clarity Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              78%
            </p>

            <span className="inline-block mt-3 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
              Mostly Clear
            </span>

            <p className="text-gray-600 mt-3">
              Your response communicates several personal contributions, but
              some team-level statements need clearer ownership.
            </p>

          </div>

          {/* Team vs Individual */}
          <div className="grid md:grid-cols-2 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <Users className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Team-Level Statements
              </p>

              <p className="text-4xl font-black text-indigo-600 mt-1">
                2
              </p>

              <p className="text-gray-600 mt-2">
                Statements describe what the team accomplished without
                specifying your role.
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <UserCheck className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Personal Contributions
              </p>

              <p className="text-4xl font-black text-green-600 mt-1">
                2
              </p>

              <p className="text-gray-600 mt-2">
                Statements clearly identify actions performed by you.
              </p>

            </div>

          </div>

          {/* Statement Analysis */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Ownership Analysis
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Select a statement to see the AI feedback.
            </p>

            <div className="space-y-4 mt-5">

              {statements.map((statement) => (
                <button
                  type="button"
                  key={statement.text}
                  onClick={() =>
                    setSelected(
                      selected?.text === statement.text
                        ? null
                        : statement
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex gap-3">

                    {statement.type === "Personal Contribution" ? (
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

                      <p className="font-medium">
                        "{statement.text}"
                      </p>

                      <div className="flex justify-between mt-3">

                        <span className="text-sm text-gray-500">
                          {statement.type}
                        </span>

                        <span className="font-bold text-indigo-600">
                          {statement.score}%
                        </span>

                      </div>

                      {selected?.text === statement.text && (
                        <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                          <p className="text-sm text-gray-600">
                            {statement.issue}
                          </p>

                        </div>
                      )}

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Follow-up */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <MessageSquare className="text-orange-600" />

              <div className="flex-1">

                <h2 className="font-bold text-orange-700">
                  AI Follow-up Question
                </h2>

                <p className="text-gray-700 mt-2">
                  You said your team developed the recommendation system.
                  <strong> What part of the recommendation pipeline did you
                  personally design or implement?</strong>
                </p>

                <textarea
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                  rows={5}
                  placeholder="Explain your personal contribution..."
                  className="w-full border rounded-xl p-4 mt-4 bg-white outline-none focus:ring-2 focus:ring-orange-500"
                />

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold"
                >
                  Submit Contribution
                </button>

              </div>

            </div>

          </div>

          {/* Recommendation */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Target className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Use "we" when describing the overall project, then switch to
                  "I" when explaining your specific responsibilities. Mention
                  what you built, the decisions you made, and the measurable
                  result of your contribution.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}