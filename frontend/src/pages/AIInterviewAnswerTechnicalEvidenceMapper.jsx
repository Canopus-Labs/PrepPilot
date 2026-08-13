import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Lightbulb,
  BarChart3,
} from "lucide-react";

const evidenceMap = [
  {
    claim: "Reduced API response time by 40%",
    action: "Optimized API request handling",
    method: "Caching and query optimization",
    result: "40% lower response latency",
    completeness: 94,
    status: "Strong Evidence",
  },
  {
    claim: "Improved system scalability",
    action: "Introduced horizontal scaling",
    method: "Load balancing and multiple service instances",
    result: "",
    completeness: 67,
    status: "Missing Result",
  },
  {
    claim: "Improved database performance",
    action: "Optimized database queries",
    method: "Indexing and query analysis",
    result: "Reduced average query time",
    completeness: 86,
    status: "Good Evidence",
  },
];

export default function AIInterviewAnswerTechnicalEvidenceMapper() {
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
            AI Technical Evidence Mapper
          </h1>

          <p className="text-gray-500">
            Connect technical claims with the actions, methods, and results
            that support them.
          </p>
        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <p className="text-sm text-gray-500">
          Interview Question
        </p>

        <h2 className="text-xl font-bold mt-2">
          Tell me about a technical improvement you made in one of your
          projects.
        </h2>

        <p className="text-gray-600 mt-3">
          Make your response credible by connecting what you achieved with
          what you did, how you did it, and what changed as a result.
        </p>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Interview Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={8}
          placeholder="Describe your technical achievement, actions, methods, and measurable results..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Map Technical Evidence
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-4 items-center">

              <BarChart3
                className="text-indigo-600"
                size={40}
              />

              <div>

                <p className="text-sm text-gray-500">
                  Evidence Completeness
                </p>

                <p className="text-6xl font-black text-indigo-600">
                  82%
                </p>

                <span className="inline-block mt-2 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
                  Strong Evidence
                </span>

              </div>

            </div>

            <p className="text-gray-600 mt-4">
              Most of your technical claims are supported by clear actions and
              technical methods. Some claims would be stronger with measurable
              outcomes.
            </p>

          </div>

          {/* Evidence Pipeline */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Evidence Structure
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-3 mt-6">

              {[
                ["Claim", "What you achieved"],
                ["Action", "What you did"],
                ["Technical Method", "How you did it"],
                ["Result", "What changed"],
              ].map(([title, description], index) => (
                <React.Fragment key={title}>

                  <div className="w-full md:w-48 border rounded-2xl p-5 text-center">

                    <Target
                      className="mx-auto text-indigo-600"
                      size={24}
                    />

                    <h3 className="font-bold mt-3">
                      {title}
                    </h3>

                    <p className="text-xs text-gray-500 mt-2">
                      {description}
                    </p>

                  </div>

                  {index < 3 && (
                    <ArrowRight
                      className="hidden md:block text-gray-400"
                    />
                  )}

                </React.Fragment>
              ))}

            </div>

          </div>

          {/* Claim Mapping */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Claim → Evidence Mapping
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Select a claim to inspect the supporting evidence.
            </p>

            <div className="space-y-5 mt-5">

              {evidenceMap.map((item) => (
                <button
                  type="button"
                  key={item.claim}
                  onClick={() =>
                    setSelected(
                      selected?.claim === item.claim
                        ? null
                        : item
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex gap-3">

                    {item.completeness >= 80 ? (
                      <CheckCircle2
                        className="text-green-600 mt-1"
                        size={22}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-orange-600 mt-1"
                        size={22}
                      />
                    )}

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <h3 className="font-semibold">
                            {item.claim}
                          </h3>

                          <span
                            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                              item.completeness >= 80
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {item.status}
                          </span>

                        </div>

                        <span className="font-bold text-indigo-600">
                          {item.completeness}%
                        </span>

                      </div>

                      <div className="h-2 bg-gray-200 rounded-full mt-4">

                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{
                            width: `${item.completeness}%`,
                          }}
                        />

                      </div>

                      {selected?.claim === item.claim && (
                        <div className="mt-5 bg-indigo-50 rounded-xl p-5">

                          <div className="grid md:grid-cols-4 gap-3">

                            <div className="bg-white rounded-xl p-3">

                              <p className="text-xs text-gray-500">
                                Claim
                              </p>

                              <p className="font-semibold mt-1">
                                {item.claim}
                              </p>

                            </div>

                            <div className="bg-white rounded-xl p-3">

                              <p className="text-xs text-gray-500">
                                Action
                              </p>

                              <p className="font-semibold mt-1">
                                {item.action}
                              </p>

                            </div>

                            <div className="bg-white rounded-xl p-3">

                              <p className="text-xs text-gray-500">
                                Technical Method
                              </p>

                              <p className="font-semibold mt-1">
                                {item.method}
                              </p>

                            </div>

                            <div className="bg-white rounded-xl p-3">

                              <p className="text-xs text-gray-500">
                                Result
                              </p>

                              <p className="font-semibold mt-1">
                                {item.result || "Missing measurable result"}
                              </p>

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

          {/* Missing Evidence */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={26}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  Missing Evidence
                </h2>

                <p className="text-gray-600 mt-2">
                  The claim{" "}
                  <strong>"Improved system scalability"</strong> has a clear
                  action and technical method, but the result is not
                  measurable enough.
                </p>

                <p className="text-gray-600 mt-3">
                  Consider explaining how much traffic, throughput, latency,
                  availability, or capacity improved after the change.
                </p>

              </div>

            </div>

          </div>

          {/* Before / After */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Evidence Strengthening Example
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-5">

              <div className="border rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Weak Evidence
                </p>

                <p className="font-semibold mt-3">
                  "I made the system more scalable by adding horizontal
                  scaling."
                </p>

              </div>

              <div className="border rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Stronger Evidence
                </p>

                <p className="font-semibold mt-3">
                  "I introduced horizontal scaling with load balancing,
                  allowing the service to handle approximately 3× the previous
                  traffic volume."
                </p>

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
                  When describing a technical achievement, connect{" "}
                  <strong>what changed → what you did → how you implemented
                  it → what measurable result followed</strong>. Avoid
                  presenting technical improvements without evidence.
                </p>

              </div>

            </div>

          </div>

          {/* Practice */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <h2 className="font-bold text-indigo-700">
              Evidence Practice
            </h2>

            <p className="text-gray-600 mt-2">
              Choose one project achievement and rewrite it using the
              structure: <strong>Claim → Action → Technical Method →
              Result.</strong>
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Practice Evidence Mapping
            </button>

          </div>

        </>
      )}

    </div>
  );
}