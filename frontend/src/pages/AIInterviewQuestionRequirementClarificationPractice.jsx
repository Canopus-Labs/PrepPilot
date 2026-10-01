import React, { useState } from "react";
import {
  Brain,
  HelpCircle,
  CheckCircle2,
  Target,
} from "lucide-react";

export default function AIInterviewQuestionRequirementClarificationPractice() {
  const [question, setQuestion] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Requirement Clarification Practice
          </h1>

          <p className="text-gray-500">
            Ask the right questions before attempting an ambiguous problem.
          </p>
        </div>

      </div>

      {/* Scenario */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-2">
          <HelpCircle className="text-orange-600" />
          <h2 className="font-bold text-lg">
            Ambiguous Interview Scenario
          </h2>
        </div>

        <p className="text-gray-700 leading-7 mt-4">
          Design a system that allows users to upload and search documents.
          The system should be fast and reliable.
        </p>

        <div className="bg-orange-50 rounded-xl p-4 mt-4">
          <p className="font-semibold text-orange-700">
            Important:
          </p>

          <p className="text-gray-600 mt-1">
            Do not start designing yet. Ask clarification questions first.
          </p>
        </div>

      </div>

      {/* Questions */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Clarification Questions
        </h2>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={6}
          placeholder="Example: What is the expected number of users?"
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!question.trim()}
          onClick={() => setSubmitted(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Submit Clarification Questions
        </button>

      </div>

      {/* Feedback */}
      {submitted && (
        <>
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  AI Feedback
                </h2>

                <p className="text-gray-600 mt-2">
                  Good clarification. You identified an important requirement
                  that could affect the system architecture.
                </p>

                <p className="font-bold text-green-700 mt-3">
                  Clarification Quality: 84%
                </p>
              </div>
            </div>

          </div>

          {/* Revealed Requirements */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <Target className="text-indigo-600" />

              <div>
                <h2 className="font-bold text-indigo-700">
                  Newly Revealed Requirement
                </h2>

                <p className="text-gray-600 mt-2">
                  The system must support approximately 1 million documents
                  and return search results within 2 seconds.
                </p>

                <p className="text-gray-600 mt-2">
                  These requirements significantly influence your storage,
                  indexing, and search architecture.
                </p>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}