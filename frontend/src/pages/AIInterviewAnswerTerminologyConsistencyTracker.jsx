import React, { useState } from "react";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Search,
  RefreshCw,
  MessageSquare,
} from "lucide-react";

const terminology = [
  {
    concept: "Application Programming Interface",
    terms: ["API", "API layer", "REST API"],
    recommended: "API",
    consistency: 82,
    issue: "The same concept is referred to using multiple names.",
  },
  {
    concept: "Database",
    terms: ["Database", "DB", "Data store"],
    recommended: "Database",
    consistency: 91,
    issue: "Mostly consistent terminology.",
  },
  {
    concept: "Authentication",
    terms: ["Authentication", "Auth", "Login validation"],
    recommended: "Authentication",
    consistency: 76,
    issue: "Avoid switching between authentication and login validation.",
  },
  {
    concept: "Frontend",
    terms: ["Frontend", "Client", "UI layer"],
    recommended: "Frontend",
    consistency: 88,
    issue: "Mostly consistent, but 'client' may refer to a broader concept.",
  },
];

export default function AIInterviewAnswerTerminologyConsistencyTracker() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);
  const [selected, setSelected] = useState(null);

  const overallScore = 84;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Terminology Consistency Tracker
          </h1>

          <p className="text-gray-500">
            Keep technical terminology consistent across your interview
            answers.
          </p>
        </div>

      </div>

      {/* Answer Input */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex items-center gap-2">

          <MessageSquare className="text-indigo-600" />

          <h2 className="font-bold text-lg">
            Analyze Interview Response
          </h2>

        </div>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={7}
          placeholder="Paste your technical interview response..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          <Search size={18} />
          Analyze Terminology
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overall Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <p className="text-sm text-gray-500">
              Terminology Consistency Score
            </p>

            <p className="text-6xl font-black text-indigo-600 mt-2">
              {overallScore}%
            </p>

            <span className="inline-block mt-3 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
              Mostly Consistent
            </span>

            <p className="text-gray-600 mt-3">
              Your terminology is generally clear, but a few concepts are
              described using multiple names.
            </p>

          </div>

          {/* Terminology Table */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Terminology Analysis
            </h2>

            <div className="space-y-4 mt-5">

              {terminology.map((item) => (
                <button
                  type="button"
                  key={item.concept}
                  onClick={() =>
                    setSelected(
                      selected?.concept === item.concept ? null : item
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex justify-between gap-4">

                    <div className="flex gap-3">

                      {item.consistency >= 85 ? (
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

                      <div>

                        <h3 className="font-semibold">
                          {item.concept}
                        </h3>

                        <div className="flex flex-wrap gap-2 mt-3">

                          {item.terms.map((term) => (
                            <span
                              key={term}
                              className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm"
                            >
                              {term}
                            </span>
                          ))}

                        </div>

                      </div>

                    </div>

                    <span className="font-bold text-indigo-600">
                      {item.consistency}%
                    </span>

                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-4">

                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{
                        width: `${item.consistency}%`,
                      }}
                    />

                  </div>

                  {selected?.concept === item.concept && (
                    <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                      <p className="text-sm text-gray-500">
                        Recommended terminology
                      </p>

                      <p className="font-bold text-indigo-700 mt-1">
                        {item.recommended}
                      </p>

                      <p className="text-sm text-gray-600 mt-2">
                        {item.issue}
                      </p>

                    </div>
                  )}

                </button>
              ))}

            </div>

          </div>

          {/* Recurring Issue */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <AlertTriangle className="text-orange-600" />

              <div>

                <h2 className="font-bold text-orange-700">
                  Recurring Terminology Issue
                </h2>

                <p className="text-gray-600 mt-2">
                  You frequently switch between{" "}
                  <strong>"authentication"</strong>,{" "}
                  <strong>"auth"</strong>, and{" "}
                  <strong>"login validation"</strong>. Use
                  <strong> "authentication"</strong> consistently unless you
                  specifically mean the login interface.
                </p>

              </div>

            </div>

          </div>

          {/* Recommendation */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <CheckCircle2 className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Choose one precise term for each important technical
                  concept and continue using it throughout the interview.
                  Introduce abbreviations once before using them repeatedly.
                </p>

              </div>

            </div>

          </div>

          {/* Practice */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <RefreshCw className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-indigo-700">
                  Terminology Practice
                </h2>

                <p className="text-gray-600 mt-2">
                  Rewrite one paragraph of your answer using the recommended
                  terminology consistently.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
                >
                  Practice Consistent Explanation
                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}