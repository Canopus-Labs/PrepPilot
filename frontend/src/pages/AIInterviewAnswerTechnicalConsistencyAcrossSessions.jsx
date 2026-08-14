import React, { useState } from "react";
import {
  Brain,
  GitCompare,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  MessageSquare,
  ShieldCheck,
  ArrowRight,
  History,
  Lightbulb,
} from "lucide-react";

const sessions = [
  {
    id: 1,
    title: "Mock Interview #1",
    date: "Aug 02, 2026",
    technology: "React + Node.js",
    database: "MongoDB",
    contribution: "Frontend development",
  },
  {
    id: 2,
    title: "Mock Interview #2",
    date: "Aug 07, 2026",
    technology: "React + Express.js",
    database: "MongoDB",
    contribution: "Frontend + API integration",
  },
  {
    id: 3,
    title: "Mock Interview #3",
    date: "Aug 12, 2026",
    technology: "React + Node.js",
    database: "PostgreSQL",
    contribution: "Frontend development",
  },
];

const consistencyItems = [
  {
    field: "Frontend Technology",
    session1: "React",
    session2: "React",
    session3: "React",
    status: "Consistent",
  },
  {
    field: "Backend Technology",
    session1: "Node.js",
    session2: "Express.js",
    session3: "Node.js",
    status: "Clarify",
  },
  {
    field: "Database",
    session1: "MongoDB",
    session2: "MongoDB",
    session3: "PostgreSQL",
    status: "Conflict",
  },
  {
    field: "Personal Contribution",
    session1: "Frontend development",
    session2: "Frontend + API integration",
    session3: "Frontend development",
    status: "Clarify",
  },
];

const followUps = [
  "Which database did you actually use in the project?",
  "Did you implement the backend API or only consume existing APIs?",
  "Why did your explanation change from MongoDB to PostgreSQL?",
  "What was your exact individual contribution?",
  "Which technologies were used in production?",
];

export default function AIInterviewAnswerTechnicalConsistencyAcrossSessions() {
  const [selectedSession, setSelectedSession] = useState(null);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [clarification, setClarification] = useState("");

  const conflicts = consistencyItems.filter(
    (item) => item.status === "Conflict"
  ).length;

  const clarifications = consistencyItems.filter(
    (item) => item.status === "Clarify"
  ).length;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <GitCompare size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Technical Consistency Across Sessions
          </h1>

          <p className="text-gray-500">
            Compare your technical explanations across interviews and detect
            conflicting project details.
          </p>

        </div>

      </div>

      {/* Project */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex flex-col md:flex-row md:justify-between gap-5">

          <div>

            <p className="text-sm text-gray-500">
              Project Being Analyzed
            </p>

            <h2 className="text-2xl font-black mt-1">
              AI Interview Preparation Platform
            </h2>

            <div className="flex flex-wrap gap-2 mt-4">

              {[
                "React",
                "Node.js",
                "MongoDB",
                "REST API",
                "AI",
              ].map((technology) => (
                <span
                  key={technology}
                  className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold"
                >
                  {technology}
                </span>
              ))}

            </div>

          </div>

          <div className="text-left md:text-right">

            <p className="text-sm text-gray-500">
              Sessions Analyzed
            </p>

            <p className="text-4xl font-black text-indigo-600">
              {sessions.length}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Same project references
            </p>

          </div>

        </div>

      </div>

      {/* Overall Score */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-5 items-center">

          <div className="p-4 rounded-2xl bg-white">

            <AlertTriangle
              className="text-orange-600"
              size={42}
            />

          </div>

          <div className="flex-1">

            <p className="text-sm text-gray-500">
              Technical Consistency Score
            </p>

            <div className="flex items-end gap-3">

              <p className="text-6xl font-black text-orange-600">
                72%
              </p>

              <span className="mb-2 px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold">
                Needs Clarification
              </span>

            </div>

            <p className="text-gray-600 mt-2">
              Your core project story is consistent, but several technical
              details changed between sessions.
            </p>

            <div className="h-3 bg-white rounded-full mt-4">

              <div
                className="h-full bg-orange-500 rounded-full"
                style={{ width: "72%" }}
              />

            </div>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="grid md:grid-cols-4 gap-4">

        <div className="bg-white rounded-2xl shadow p-5">

          <History className="text-indigo-600" />

          <p className="text-sm text-gray-500 mt-4">
            Sessions Compared
          </p>

          <p className="text-3xl font-black text-indigo-600">
            3
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <AlertTriangle className="text-red-600" />

          <p className="text-sm text-gray-500 mt-4">
            Conflicts
          </p>

          <p className="text-3xl font-black text-red-600">
            {conflicts}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <MessageSquare className="text-orange-600" />

          <p className="text-sm text-gray-500 mt-4">
            Clarifications
          </p>

          <p className="text-3xl font-black text-orange-600">
            {clarifications}
          </p>

        </div>

        <div className="bg-white rounded-2xl shadow p-5">

          <CheckCircle2 className="text-green-600" />

          <p className="text-sm text-gray-500 mt-4">
            Consistent Details
          </p>

          <p className="text-3xl font-black text-green-600">
            1
          </p>

        </div>

      </div>

      {/* Sessions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <History className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Session History
            </h2>

            <p className="text-sm text-gray-500">
              Select a session to review the technical details mentioned.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          {sessions.map((session) => (
            <button
              type="button"
              key={session.id}
              onClick={() =>
                setSelectedSession(
                  selectedSession === session.id
                    ? null
                    : session.id
                )
              }
              className="text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
            >

              <div className="flex justify-between">

                <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
                  <Clock size={21} />
                </div>

                <span className="text-xs text-gray-500">
                  {session.date}
                </span>

              </div>

              <h3 className="font-bold mt-4">
                {session.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {session.technology}
              </p>

              {selectedSession === session.id && (
                <div className="mt-4 bg-indigo-50 rounded-xl p-4 space-y-2">

                  <p className="text-sm">
                    <strong>Database:</strong> {session.database}
                  </p>

                  <p className="text-sm">
                    <strong>Contribution:</strong>{" "}
                    {session.contribution}
                  </p>

                </div>
              )}

            </button>
          ))}

        </div>

      </div>

      {/* Consistency Matrix */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <GitCompare className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Technical Consistency Matrix
            </h2>

            <p className="text-sm text-gray-500">
              AI compares important claims across your interview sessions.
            </p>

          </div>

        </div>

        <div className="overflow-x-auto mt-6">

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b">

                <th className="text-left p-3">
                  Technical Detail
                </th>

                <th className="text-left p-3">
                  Session 1
                </th>

                <th className="text-left p-3">
                  Session 2
                </th>

                <th className="text-left p-3">
                  Session 3
                </th>

                <th className="text-left p-3">
                  Status
                </th>

              </tr>

            </thead>

            <tbody>

              {consistencyItems.map((item) => (
                <tr
                  key={item.field}
                  className="border-b"
                >

                  <td className="p-3 font-semibold">
                    {item.field}
                  </td>

                  <td className="p-3">
                    {item.session1}
                  </td>

                  <td className="p-3">
                    {item.session2}
                  </td>

                  <td className="p-3">
                    {item.session3}
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        item.status === "Consistent"
                          ? "bg-green-100 text-green-700"
                          : item.status === "Conflict"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </div>

      {/* Conflicts */}
      <div className="bg-red-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <AlertTriangle
            className="text-red-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-red-700">
              Conflicting Technical Details
            </h2>

            <p className="text-gray-600 mt-2">
              AI detected technical claims that may appear contradictory to
              an interviewer.
            </p>

            <div className="space-y-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <div className="flex justify-between gap-3">

                  <h3 className="font-bold">
                    Database Technology
                  </h3>

                  <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                    Conflict
                  </span>

                </div>

                <div className="grid md:grid-cols-3 gap-4 mt-4">

                  <div>
                    <p className="text-xs text-gray-500">
                      Session 1
                    </p>
                    <p className="font-semibold mt-1">
                      MongoDB
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Session 2
                    </p>
                    <p className="font-semibold mt-1">
                      MongoDB
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Session 3
                    </p>
                    <p className="font-semibold mt-1 text-red-600">
                      PostgreSQL
                    </p>
                  </div>

                </div>

                <p className="text-sm text-gray-600 mt-4">
                  Clarify whether PostgreSQL replaced MongoDB, whether both
                  databases were used, or whether one answer was inaccurate.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Changed Claims */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <MessageSquare
            className="text-orange-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-orange-700">
              Changed Technical Claims
            </h2>

            <div className="space-y-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <div className="flex justify-between">

                  <h3 className="font-bold">
                    Backend Responsibility
                  </h3>

                  <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                    Clarify
                  </span>

                </div>

                <p className="text-sm text-gray-600 mt-3">
                  Earlier you described your contribution as frontend
                  development, while another session included API integration.
                  Be prepared to explain exactly which backend-related work you
                  personally completed.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Clarification Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-3">

          <FileText
            className="text-indigo-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Clarify Your Project Details
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Write the accurate version of the project story that should be
              used consistently in future interviews.
            </p>

            <textarea
              value={clarification}
              onChange={(e) => setClarification(e.target.value)}
              rows={7}
              placeholder="Example: The project originally used MongoDB during development and later migrated to PostgreSQL..."
              className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              disabled={!clarification.trim()}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
            >
              Save Consistency Baseline
            </button>

          </div>

        </div>

      </div>

      {/* Follow-up Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-3">

          <Brain
            className="text-indigo-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-lg">
              AI Clarification Follow-Ups
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              These questions help you prepare for interviewers who notice
              inconsistent project details.
            </p>

          </div>

        </div>

        <div className="space-y-3 mt-6">

          {followUps.map((question, index) => (
            <div
              key={question}
              className="border rounded-xl p-4 flex gap-4"
            >

              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold flex-shrink-0">
                {index + 1}
              </div>

              <p className="text-sm font-semibold text-gray-700">
                {question}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* Project Consistency Baseline */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <ShieldCheck className="text-green-600" />

          <div>

            <h2 className="font-bold text-lg">
              Project Consistency Baseline
            </h2>

            <p className="text-sm text-gray-500">
              Important facts that should remain consistent in future
              interviews.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">

          {[
            ["Project", "AI Interview Preparation Platform"],
            ["Frontend", "React"],
            ["Backend", "Node.js / Express.js"],
            ["Database", "Confirm final database"],
            ["Individual Contribution", "Confirm exact responsibilities"],
            ["Key Achievement", "Prepare measurable impact"],
          ].map(([label, value]) => (
            <div
              key={label}
              className="border rounded-xl p-4"
            >

              <p className="text-xs text-gray-500">
                {label}
              </p>

              <p className="font-semibold mt-1">
                {value}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Lightbulb
            className="text-indigo-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-indigo-700">
              AI Consistency Insight
            </h2>

            <p className="text-gray-600 mt-2">
              Your project narrative is mostly consistent, but database
              technology and backend responsibilities changed across sessions.
              Establish one accurate baseline before your next interview and
              use that baseline whenever describing the project.
            </p>

          </div>

        </div>

      </div>

      {/* Final Recommendation */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <CheckCircle2
            className="text-green-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-green-700">
              AI Final Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Before your next interview, review the project's technology
              stack, your exact individual contribution, and the production
              architecture. Consistent and accurate details will make your
              project explanation more credible and easier to defend during
              follow-up questions.
            </p>

            <button
              type="button"
              onClick={() => setShowAnalysis(!showAnalysis)}
              className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2"
            >
              {showAnalysis
                ? "Hide Consistency Report"
                : "Review Full Consistency Report"}
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}