import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  Search,
  MessageSquare,
} from "lucide-react";

const ambiguityExamples = [
  {
    original: "This approach will be faster.",
    issue: "Faster compared with what?",
    missing: "Baseline approach, workload, and performance metric.",
    improved:
      "Using a hash table reduces average lookup time from O(n) to O(1), compared with scanning the array linearly.",
    score: 42,
  },
  {
    original: "This architecture scales better.",
    issue: "The scalability claim is not specific.",
    missing: "Expected traffic, bottleneck, and scaling strategy.",
    improved:
      "The stateless service layer can scale horizontally by adding instances as request volume increases.",
    score: 48,
  },
  {
    original: "The database will handle the load.",
    issue: "The expected load and database capacity are undefined.",
    missing: "Request volume, query pattern, and capacity assumptions.",
    improved:
      "With indexed queries and read replicas, the database can support the expected read-heavy workload while reducing pressure on the primary instance.",
    score: 51,
  },
];

export default function AIInterviewAnswerTechnicalAmbiguityCleaner() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Technical Ambiguity Cleaner
          </h1>

          <p className="text-gray-500">
            Turn vague technical claims into precise, interview-ready
            explanations.
          </p>
        </div>

      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-2">

          <Search className="text-indigo-600" size={22} />

          <h2 className="font-bold text-lg">
            Analyze Your Answer
          </h2>

        </div>

        <p className="text-sm text-gray-500 mt-2">
          Paste your technical response. AI will identify ambiguous claims,
          missing context, and opportunities for greater precision.
        </p>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={9}
          placeholder="Example: I would use caching because it will make the system faster and more scalable..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          disabled={!answer.trim()}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Technical Ambiguity
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Score */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <AlertTriangle
                  className="text-orange-600"
                  size={40}
                />
              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Technical Precision
                </p>

                <div className="flex items-end gap-3">

                  <p className="text-6xl font-black text-orange-600">
                    64%
                  </p>

                  <span className="mb-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 font-semibold">
                    Needs Clarification
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  Several technically meaningful statements contain claims
                  without enough context or measurable reasoning.
                </p>

                <div className="h-3 bg-white rounded-full mt-4">

                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: "64%" }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <AlertTriangle className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Ambiguous Statements
              </p>

              <p className="text-3xl font-black text-orange-600">
                3
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <MessageSquare className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Missing Context
              </p>

              <p className="text-3xl font-black text-indigo-600">
                6
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <CheckCircle2 className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Precise Claims
              </p>

              <p className="text-3xl font-black text-green-600">
                7
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Lightbulb className="text-yellow-600" />

              <p className="text-sm text-gray-500 mt-4">
                Improvement Potential
              </p>

              <p className="text-3xl font-black text-yellow-600">
                +22%
              </p>

            </div>

          </div>

          {/* Ambiguity List */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Detected Ambiguous Statements
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Select a statement to see why it is ambiguous and how to improve
              it.
            </p>

            <div className="space-y-4 mt-6">

              {ambiguityExamples.map((item, index) => (
                <button
                  type="button"
                  key={item.original}
                  onClick={() =>
                    setSelected(
                      selected?.original === item.original
                        ? null
                        : item
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex gap-4">

                    <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-black">
                      {index + 1}
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <p className="text-xs text-gray-500">
                            Original Statement
                          </p>

                          <p className="font-semibold mt-1">
                            "{item.original}"
                          </p>

                        </div>

                        <span className="px-3 py-1 h-fit rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                          Ambiguous
                        </span>

                      </div>

                      <div className="mt-4">

                        <p className="text-xs text-gray-500">
                          Why it is unclear
                        </p>

                        <p className="text-sm text-gray-600 mt-1">
                          {item.issue}
                        </p>

                      </div>

                      {selected?.original === item.original && (
                        <div className="space-y-4 mt-5">

                          {/* Missing Context */}
                          <div className="bg-yellow-50 rounded-xl p-4">

                            <p className="text-xs font-semibold text-yellow-700">
                              Missing Context
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                              {item.missing}
                            </p>

                          </div>

                          {/* Comparison */}
                          <div className="bg-indigo-50 rounded-xl p-4">

                            <p className="text-xs font-semibold text-indigo-700">
                              AI-Powered Rewrite
                            </p>

                            <div className="flex flex-col md:flex-row gap-3 items-center mt-3">

                              <div className="flex-1 bg-white rounded-xl p-4">

                                <p className="text-xs text-gray-500">
                                  Original
                                </p>

                                <p className="text-sm mt-2">
                                  {item.original}
                                </p>

                              </div>

                              <ArrowRight
                                className="text-indigo-600 hidden md:block"
                              />

                              <div className="flex-1 bg-green-50 rounded-xl p-4">

                                <p className="text-xs text-green-700">
                                  More Precise
                                </p>

                                <p className="text-sm mt-2">
                                  {item.improved}
                                </p>

                              </div>

                            </div>

                          </div>

                          {/* Precision */}
                          <div>

                            <div className="flex justify-between text-sm">

                              <span className="font-semibold">
                                Original Precision
                              </span>

                              <span className="font-bold text-orange-600">
                                {item.score}%
                              </span>

                            </div>

                            <div className="h-3 bg-gray-200 rounded-full mt-2">

                              <div
                                className="h-full bg-orange-500 rounded-full"
                                style={{
                                  width: `${item.score}%`,
                                }}
                              />

                            </div>

                          </div>

                        </div>
                      )}

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Context Questions */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <MessageSquare
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  AI Clarification Questions
                </h2>

                <p className="text-gray-600 mt-2">
                  AI can ask these questions to help you make the technical
                  claim more precise.
                </p>

                <div className="space-y-3 mt-5">

                  {[
                    "Faster compared with which baseline approach?",
                    "What workload or traffic level are you considering?",
                    "Which metric are you using to measure scalability?",
                    "What specific bottleneck does this design eliminate?",
                  ].map((question, index) => (
                    <div
                      key={question}
                      className="bg-white rounded-xl p-4 flex gap-3"
                    >

                      <span className="font-bold text-indigo-600">
                        Q{index + 1}
                      </span>

                      <p className="text-sm text-gray-700">
                        {question}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* Precision Checklist */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Technical Precision Checklist
            </h2>

            <div className="grid md:grid-cols-2 gap-4 mt-5">

              {[
                [
                  "Define the comparison",
                  "Explain what your claim is being compared against.",
                  true,
                ],
                [
                  "Include measurable impact",
                  "Use complexity, latency, throughput, memory, or another relevant metric.",
                  false,
                ],
                [
                  "State assumptions",
                  "Clarify workload, scale, constraints, and environment.",
                  false,
                ],
                [
                  "Explain the mechanism",
                  "Describe why the proposed technique produces the claimed result.",
                  true,
                ],
                [
                  "Mention trade-offs",
                  "Explain what you gain and what you give up.",
                  false,
                ],
                [
                  "Avoid vague adjectives",
                  "Replace words like better, faster, scalable, and efficient with specific reasoning.",
                  false,
                ],
              ].map(([title, description, complete]) => (
                <div
                  key={title}
                  className="border rounded-xl p-4 flex gap-3"
                >

                  {complete ? (
                    <CheckCircle2
                      className="text-green-600 flex-shrink-0"
                      size={22}
                    />
                  ) : (
                    <AlertTriangle
                      className="text-orange-600 flex-shrink-0"
                      size={22}
                    />
                  )}

                  <div>

                    <p className="font-semibold">
                      {title}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {description}
                    </p>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* AI Insight */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Communication Insight
                </h2>

                <p className="text-gray-600 mt-2">
                  Your technical ideas are generally relevant, but several
                  claims rely on broad words such as <strong>"faster"</strong>{" "}
                  and <strong>"scales better"</strong>. Replace these with the
                  mechanism, comparison point, assumptions, and measurable
                  impact to make your reasoning easier for an interviewer to
                  evaluate.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}