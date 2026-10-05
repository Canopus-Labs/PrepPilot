import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  CheckCircle2,
  Search,
} from "lucide-react";

export default function AIInterviewQuestionMisinterpretationDetector() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  const analyze = () => {
    if (question.trim() && answer.trim()) {
      setAnalyzed(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Question Misinterpretation Detector
          </h1>

          <p className="text-gray-500">
            Check whether your answer addresses what the interviewer actually
            asked.
          </p>
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold mb-3">
          Interview Question
        </h2>

        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          rows={4}
          placeholder="Enter the interview question..."
          className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500"
        />

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold mb-3">
          Candidate Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={5}
          placeholder="Enter the candidate's answer..."
          className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          onClick={analyze}
          disabled={!question.trim() || !answer.trim()}
          className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 disabled:opacity-50"
        >
          <Search size={18} />
          Analyze Interpretation
        </button>

      </div>

      {/* Result */}
      {analyzed && (
        <>
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">
              <AlertTriangle className="text-orange-600" />

              <div>
                <h2 className="font-bold text-orange-700">
                  Possible Misinterpretation Detected
                </h2>

                <p className="text-gray-600 mt-2">
                  Your response appears to address only part of the question.
                  The expected requirement may have been interpreted
                  differently.
                </p>
              </div>
            </div>

          </div>

          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              AI Analysis
            </h2>

            <div className="space-y-4 mt-4">

              <div className="border rounded-xl p-4">
                <p className="font-semibold">
                  Missed Requirement
                </p>

                <p className="text-gray-500 mt-1">
                  The response does not directly address the scalability
                  requirement mentioned in the question.
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <p className="font-semibold">
                  Expected Interpretation
                </p>

                <p className="text-gray-500 mt-1">
                  Focus on explaining how the solution behaves when the input
                  size increases significantly.
                </p>
              </div>

            </div>

          </div>

          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Before answering, identify the main requirement, constraints,
                  and expected outcome of the question. Then structure your
                  response around those requirements.
                </p>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}