import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
  History,
  BriefcaseBusiness,
  Code2,
  ShieldCheck,
} from "lucide-react";

const AIInterviewFollowUpAnswerConsistencyChecker = () => {
  const [stats] = useState({
    consistencyScore: 91,
    statementsTracked: 24,
    potentialConflicts: 3,
    answersAnalyzed: 18,
  });

  const [selectedCategory, setSelectedCategory] = useState("All");

  const statements = [
    {
      statement:
        "Worked on an e-commerce recommendation system using Python and machine learning.",
      category: "Project",
      source: "Tell me about your most important project.",
      status: "Consistent",
    },
    {
      statement:
        "The recommendation system improved product discovery for users.",
      category: "Project",
      source: "What was the impact of your project?",
      status: "Consistent",
    },
    {
      statement:
        "The project was primarily implemented using Python and TensorFlow.",
      category: "Technical",
      source: "Which technologies did you use?",
      status: "Review",
    },
    {
      statement:
        "You mentioned earlier that the project used Python and TensorFlow.",
      category: "Technical",
      source: "Which part did you personally implement?",
      status: "Consistent",
    },
  ];

  const conflicts = [
    {
      topic: "Project Team Size",
      earlier:
        "You mentioned that the project was completed by a team of 4.",
      later:
        "Later, you stated that you worked on the project with 3 teammates and yourself.",
      severity: "Medium",
    },
    {
      topic: "Project Duration",
      earlier:
        "Earlier answer indicated that development took approximately 3 months.",
      later:
        "A later response mentioned that the project was completed in 5 months.",
      severity: "High",
    },
    {
      topic: "Technical Contribution",
      earlier:
        "You initially described yourself as responsible for the backend.",
      later:
        "Later you described your primary contribution as frontend development.",
      severity: "Medium",
    },
  ];

  const filteredStatements =
    selectedCategory === "All"
      ? statements
      : statements.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <div className="min-h-screen bg-[var(--color-background)] px-6 py-10">
      <div className="max-w-7xl mx-auto">

        {/* Header */}

        <div className="flex items-center gap-5 mb-10">

          <div className="w-16 h-16 rounded-2xl bg-violet-100 dark:bg-violet-900/20 flex items-center justify-center">

            <ShieldCheck
              size={34}
              className="text-violet-600"
            />

          </div>

          <div>

            <h1 className="text-3xl font-bold">
              AI Interview Follow-Up Answer Consistency Checker
            </h1>

            <p className="text-gray-500 mt-2">
              Detect contradictions across your interview answers and
              improve the consistency and credibility of your responses.
            </p>

          </div>

        </div>

        {/* Dashboard Metrics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <ShieldCheck
              className="mx-auto text-green-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Consistency Score
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.consistencyScore}%
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <History
              className="mx-auto text-violet-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Statements Tracked
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.statementsTracked}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <AlertTriangle
              className="mx-auto text-orange-500"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Potential Conflicts
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.potentialConflicts}
            </p>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-6 text-center">

            <MessageSquare
              className="mx-auto text-blue-600"
              size={30}
            />

            <h3 className="mt-4 text-gray-500">
              Answers Analyzed
            </h3>

            <p className="text-5xl font-black mt-3">
              {stats.answersAnalyzed}
            </p>

          </div>

        </div>

        {/* Overview */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">
            AI Consistency Analysis
          </h2>

          <p className="leading-8 text-white/90">
            The AI remembers important information from earlier answers
            and compares it with later responses. This helps identify
            conflicting details about projects, experience, technical
            decisions, responsibilities, and other interview topics.
          </p>

        </div>

        {/* Important Statements */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

            <div className="flex items-center gap-3">

              <History className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Important Statements
              </h2>

            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-xl border dark:border-white/10 bg-white dark:bg-[#1f2937] px-4 py-3"
            >
              <option>All</option>
              <option>Project</option>
              <option>Technical</option>
              <option>Experience</option>
            </select>

          </div>

          <div className="space-y-5">

            {filteredStatements.map((item, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-6"
              >

                <div className="flex flex-col md:flex-row md:justify-between gap-4">

                  <div>

                    <h3 className="font-bold">
                      {item.statement}
                    </h3>

                    <p className="text-gray-500 mt-2">
                      Source: {item.source}
                    </p>

                  </div>

                  <div className="flex gap-3 items-start">

                    <span className="px-4 py-2 rounded-full bg-violet-100 dark:bg-violet-900/20 text-violet-700 dark:text-violet-300">
                      {item.category}
                    </span>

                    <span
                      className={`px-4 py-2 rounded-full ${
                        item.status === "Consistent"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.status}
                    </span>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Project & Experience Consistency */}

        <div className="mt-10 grid lg:grid-cols-2 gap-8">

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-6">

              <BriefcaseBusiness className="text-violet-600" />

              <h2 className="text-2xl font-bold">
                Project Consistency
              </h2>

            </div>

            <div className="space-y-5">

              {[
                ["Project Name", "Consistent"],
                ["Team Size", "Needs Review"],
                ["Project Duration", "Conflict Detected"],
                ["Personal Contribution", "Needs Review"],
              ].map(([label, status], index) => (

                <div
                  key={index}
                  className="flex justify-between items-center rounded-xl border border-gray-200 dark:border-white/10 p-5"
                >

                  <span className="font-semibold">
                    {label}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      status === "Consistent"
                        ? "bg-green-100 text-green-700"
                        : status === "Conflict Detected"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {status}
                  </span>

                </div>

              ))}

            </div>

          </div>

          <div className="bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

            <div className="flex items-center gap-3 mb-6">

              <Code2 className="text-blue-600" />

              <h2 className="text-2xl font-bold">
                Technical Consistency
              </h2>

            </div>

            <div className="space-y-5">

              {[
                ["Technology Stack", "Consistent"],
                ["Architecture Choice", "Consistent"],
                ["Technical Contribution", "Needs Review"],
                ["Performance Claims", "Consistent"],
              ].map(([label, status], index) => (

                <div
                  key={index}
                  className="flex justify-between items-center rounded-xl border border-gray-200 dark:border-white/10 p-5"
                >

                  <span className="font-semibold">
                    {label}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      status === "Consistent"
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {status}
                  </span>

                </div>

              ))}

            </div>

          </div>

        </div>
                {/* Contradiction Detection */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <AlertTriangle className="text-red-500" />

            <h2 className="text-2xl font-bold">
              Detected Contradictions
            </h2>

          </div>

          <div className="space-y-6">

            {conflicts.map((conflict, index) => (

              <div
                key={index}
                className="rounded-2xl border border-red-200 dark:border-red-900/30 p-6"
              >

                <div className="flex flex-col md:flex-row md:justify-between gap-4">

                  <h3 className="text-lg font-bold">
                    {conflict.topic}
                  </h3>

                  <span
                    className={`px-4 py-2 rounded-full text-sm w-fit ${
                      conflict.severity === "High"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {conflict.severity} Priority
                  </span>

                </div>

                <div className="grid md:grid-cols-2 gap-5 mt-6">

                  <div className="rounded-xl bg-gray-50 dark:bg-gray-800 p-5">

                    <p className="text-sm font-semibold text-gray-500 mb-2">
                      Earlier Answer
                    </p>

                    <p className="leading-7">
                      {conflict.earlier}
                    </p>

                  </div>

                  <div className="rounded-xl bg-red-50 dark:bg-red-900/10 p-5">

                    <p className="text-sm font-semibold text-red-500 mb-2">
                      Later Answer
                    </p>

                    <p className="leading-7">
                      {conflict.later}
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* Clarification Prompts */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <div className="flex items-center gap-3 mb-8">

            <MessageSquare className="text-violet-600" />

            <h2 className="text-2xl font-bold">
              AI Clarification Prompts
            </h2>

          </div>

          <div className="space-y-5">

            {[
              "You mentioned different team sizes. Which team size accurately represents the project?",
              "You provided two different project durations. What was the actual development timeline?",
              "Could you clarify whether your primary contribution was frontend or backend development?",
              "Which technology did you personally work with most extensively?",
            ].map((question, index) => (

              <div
                key={index}
                className="rounded-xl border border-violet-200 dark:border-violet-900/30 p-5"
              >

                <span className="font-semibold">
                  ❓ {question}
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* Post Interview Feedback */}

        <div className="mt-10 bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 rounded-3xl p-10 text-white">

          <h2 className="text-3xl font-bold mb-6">
            Post-Interview AI Feedback
          </h2>

          <div className="space-y-5">

            <div className="rounded-xl bg-white/10 p-5">
              ✅ Most of your technical explanations remained consistent
              throughout the interview.
            </div>

            <div className="rounded-xl bg-white/10 p-5">
              ⚠️ A few project details changed between related answers.
            </div>

            <div className="rounded-xl bg-white/10 p-5">
              💡 Prepare a short, factual summary of each major project
              before your next interview.
            </div>

            <div className="rounded-xl bg-white/10 p-5">
              🎯 Focus on keeping team size, project duration, and personal
              responsibilities consistent.
            </div>

          </div>

        </div>

        {/* Consistency Analytics */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            Consistency Analytics
          </h2>

          {[
            ["Overall Consistency", stats.consistencyScore],
            ["Project Details", 84],
            ["Technical Statements", 94],
            ["Experience Details", 89],
            ["Follow-Up Answer Consistency", 91],
          ].map(([label, value], index) => (

            <div key={index} className="mb-6">

              <div className="flex justify-between mb-2">

                <span>{label}</span>

                <span>{value}%</span>

              </div>

              <div className="w-full h-4 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                  style={{ width: `${value}%` }}
                />

              </div>

            </div>

          ))}

        </div>

        {/* Improvement Recommendations */}

        <div className="mt-10 bg-white dark:bg-[#111827] rounded-3xl shadow p-8">

          <h2 className="text-2xl font-bold mb-8">
            AI Improvement Recommendations
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Create a verified summary of your major projects.",
              "Remember exact project timelines before interviews.",
              "Keep your individual responsibilities clearly defined.",
              "Use consistent technology names throughout your answers.",
              "Review previous mock interview responses before another session.",
              "Avoid guessing when asked about past experience.",
            ].map((recommendation, index) => (

              <div
                key={index}
                className="rounded-xl border border-gray-200 dark:border-white/10 p-5"
              >

                💡 {recommendation}

              </div>

            ))}

          </div>

        </div>

        {/* Motivation */}

        <div className="mt-10 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-3xl p-10 text-white shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

            <div>

              <h2 className="text-3xl font-bold mb-4">
                Build Trust With Consistent Answers 🚀
              </h2>

              <p className="leading-8 text-white/90">
                Strong interview communication is not only about giving
                correct answers. Your project details, responsibilities,
                technical decisions, and experience should remain clear
                and consistent throughout the conversation.
              </p>

            </div>

            <div className="text-center">

              <div className="text-6xl">
                🛡️
              </div>

              <h3 className="mt-4 text-2xl font-bold">
                Consistency
              </h3>

              <p className="text-5xl font-black">
                {stats.consistencyScore}%
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
};

export default AIInterviewFollowUpAnswerConsistencyChecker;