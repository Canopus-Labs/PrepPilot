import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  FileText,
  Search,
} from "lucide-react";

const sections = [
  {
    number: 1,
    title: "Problem Understanding",
    text: "I would first identify which queries are slow and inspect their execution plans.",
    intent: "Shows understanding of the performance problem.",
    requirement: "Understand the problem",
    status: "Covered",
  },
  {
    number: 2,
    title: "Technical Approach",
    text: "I would add indexes to columns frequently used for filtering or sorting.",
    intent: "Provides a concrete optimization strategy.",
    requirement: "Propose a solution",
    status: "Covered",
  },
  {
    number: 3,
    title: "Technical Reasoning",
    text: "The index allows the database to locate matching records without scanning the entire table.",
    intent: "Explains why the proposed approach works.",
    requirement: "Explain reasoning",
    status: "Covered",
  },
  {
    number: 4,
    title: "Performance Validation",
    text: "I would compare the query execution time before and after the change.",
    intent: "Explains how the improvement would be measured.",
    requirement: "Validate performance",
    status: "Covered",
  },
  {
    number: 5,
    title: "Trade-off",
    text: "Indexes can also increase storage and write overhead.",
    intent: "Acknowledges a cost of the proposed solution.",
    requirement: "Discuss trade-offs",
    status: "Covered",
  },
  {
    number: 6,
    title: "Additional Detail",
    text: "The database can have many different configuration settings.",
    intent: "Provides supporting information but does not directly address a requirement.",
    requirement: "No direct match",
    status: "Unmatched",
  },
];

const requirements = [
  {
    name: "Understand the problem",
    covered: true,
    section: "Section 1",
  },
  {
    name: "Propose a solution",
    covered: true,
    section: "Section 2",
  },
  {
    name: "Explain technical reasoning",
    covered: true,
    section: "Section 3",
  },
  {
    name: "Validate performance",
    covered: true,
    section: "Section 4",
  },
  {
    name: "Discuss trade-offs",
    covered: true,
    section: "Section 5",
  },
  {
    name: "Mention scalability considerations",
    covered: false,
    section: "Missing",
  },
];

export default function AIInterviewAnswerTechnicalIntentExtractor() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Intent Extractor
          </h1>

          <p className="text-gray-500">
            Understand what each part of your technical answer accomplishes
            and which question requirement it addresses.
          </p>
        </div>

      </div>

      {/* Interview Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          How would you improve the performance of a slow database-backed
          application?
        </h2>

        <div className="flex flex-wrap gap-2 mt-4">

          {[
            "Problem Analysis",
            "Technical Solution",
            "Reasoning",
            "Performance",
            "Trade-offs",
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

      {/* Answer Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-2">

          <FileText
            className="text-indigo-600"
            size={22}
          />

          <h2 className="font-bold text-lg">
            Your Answer
          </h2>

        </div>

        <p className="text-sm text-gray-500 mt-1">
          Paste your response. AI will divide it into meaningful sections and
          determine the technical intent of each section.
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={9}
          placeholder="Explain your technical solution..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          disabled={!answer.trim()}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2 disabled:opacity-50"
        >
          <Search size={18} />
          Extract Technical Intent
        </button>

      </div>

      {analyzed && (
        <>
          {/* Coverage Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <Target
                  className="text-indigo-600"
                  size={40}
                />
              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Intent Coverage
                </p>

                <div className="flex items-end gap-3">

                  <p className="text-6xl font-black text-indigo-600">
                    83%
                  </p>

                  <span className="mb-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                    Strong Coverage
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  Most major parts of your answer directly address the
                  question requirements, with one unmatched section and one
                  missing consideration.
                </p>

                <div className="h-3 bg-white rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: "83%" }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <FileText className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Answer Sections
              </p>

              <p className="text-3xl font-black text-indigo-600">
                6
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <CheckCircle2 className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Matched Intents
              </p>

              <p className="text-3xl font-black text-green-600">
                5
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <AlertTriangle className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Unmatched
              </p>

              <p className="text-3xl font-black text-orange-600">
                1
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Target className="text-red-600" />

              <p className="text-sm text-gray-500 mt-4">
                Missing Requirements
              </p>

              <p className="text-3xl font-black text-red-600">
                1
              </p>

            </div>

          </div>

          {/* Intent Mapping */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Answer Intent Mapping
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI maps each meaningful section of your response to the
              requirement it is intended to satisfy.
            </p>

            <div className="space-y-4 mt-6">

              {sections.map((section) => (
                <button
                  type="button"
                  key={section.number}
                  onClick={() =>
                    setSelectedSection(
                      selectedSection === section.number
                        ? null
                        : section.number
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex gap-4">

                    <div
                      className={`w-11 h-11 rounded-full flex items-center justify-center font-black ${
                        section.status === "Covered"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {section.number}
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <p className="text-xs text-gray-500">
                            Extracted Section
                          </p>

                          <h3 className="font-bold mt-1">
                            {section.title}
                          </h3>

                        </div>

                        <span
                          className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                            section.status === "Covered"
                              ? "bg-green-100 text-green-700"
                              : "bg-orange-100 text-orange-700"
                          }`}
                        >
                          {section.status}
                        </span>

                      </div>

                      <p className="text-sm text-gray-600 mt-3">
                        "{section.text}"
                      </p>

                      <div className="grid md:grid-cols-2 gap-4 mt-4">

                        <div className="bg-indigo-50 rounded-xl p-3">

                          <p className="text-xs text-indigo-700 font-semibold">
                            Technical Intent
                          </p>

                          <p className="text-sm text-gray-600 mt-1">
                            {section.intent}
                          </p>

                        </div>

                        <div className="bg-gray-50 rounded-xl p-3">

                          <p className="text-xs text-gray-500 font-semibold">
                            Question Requirement
                          </p>

                          <p className="text-sm text-gray-600 mt-1">
                            {section.requirement}
                          </p>

                        </div>

                      </div>

                      {selectedSection === section.number && (
                        <div className="mt-4 bg-green-50 rounded-xl p-4">

                          <p className="text-xs font-semibold text-green-700">
                            AI Intent Feedback
                          </p>

                          <p className="text-sm text-gray-600 mt-1">
                            {section.status === "Covered"
                              ? "This section has a clear purpose and directly contributes to answering the interview question."
                              : "This section contains technically valid information, but it does not clearly satisfy a stated question requirement. Consider shortening or removing it."}
                          </p>

                        </div>
                      )}

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Requirement Coverage */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Question Requirement Coverage
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Each requirement is connected to the part of your answer that
              addresses it.
            </p>

            <div className="space-y-4 mt-6">

              {requirements.map((requirement) => (
                <div
                  key={requirement.name}
                  className="border rounded-xl p-4"
                >

                  <div className="flex items-center gap-3">

                    {requirement.covered ? (
                      <CheckCircle2
                        className="text-green-600"
                        size={22}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-red-600"
                        size={22}
                      />
                    )}

                    <div className="flex-1">

                      <p className="font-semibold">
                        {requirement.name}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        Addressed by: {requirement.section}
                      </p>

                    </div>

                    <span
                      className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        requirement.covered
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {requirement.covered
                        ? "Covered"
                        : "Missing"}
                    </span>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Unmatched Information */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-orange-700">
                  Unmatched Information
                </h2>

                <p className="text-gray-600 mt-2">
                  One section contains technically correct information but does
                  not directly support a question requirement.
                </p>

                <div className="bg-white rounded-xl p-4 mt-4">

                  <p className="text-xs text-gray-500">
                    Section 6
                  </p>

                  <p className="font-semibold mt-1">
                    "The database can have many different configuration
                    settings."
                  </p>

                  <div className="flex items-center gap-3 mt-4">

                    <span className="px-3 py-1 rounded-lg bg-orange-100 text-orange-700 text-xs font-semibold">
                      Low Intent Match
                    </span>

                    <ArrowRight
                      size={18}
                      className="text-gray-400"
                    />

                    <span className="text-sm text-gray-600">
                      Consider removing or connecting it to the proposed
                      solution.
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Missing Information */}
          <div className="bg-red-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Target
                className="text-red-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-red-700">
                  Missing Question Requirement
                </h2>

                <p className="text-gray-600 mt-2">
                  Your answer does not explicitly address{" "}
                  <strong>scalability considerations</strong>. Consider
                  explaining how the proposed optimization behaves as traffic
                  and data volume increase.
                </p>

              </div>

            </div>

          </div>

          {/* Intent Flow */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Answer Intent Flow
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              A strong technical response should move naturally from
              understanding to solution, reasoning, evidence, and conclusion.
            </p>

            <div className="flex flex-col items-center mt-7">

              {[
                "Understand Problem",
                "Propose Solution",
                "Explain Reasoning",
                "Validate Result",
                "Discuss Trade-offs",
                "Conclude",
              ].map((item, index, array) => (
                <React.Fragment key={item}>

                  <div className="px-6 py-3 rounded-xl bg-indigo-100 text-indigo-700 font-semibold">
                    {item}
                  </div>

                  {index < array.length - 1 && (
                    <ArrowRight
                      className="rotate-90 text-indigo-400 my-2"
                      size={20}
                    />
                  )}

                </React.Fragment>
              ))}

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Your answer has strong intent coverage. Keep the first five
                  sections because each serves a clear purpose. Remove or
                  connect unrelated configuration details, and add one short
                  explanation of scalability to achieve complete requirement
                  coverage.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}