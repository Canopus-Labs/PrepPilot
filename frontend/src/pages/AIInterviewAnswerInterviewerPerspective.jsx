import React, { useState } from "react";
import {
  Brain,
  Eye,
  CheckCircle2,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";

export default function AIInterviewAnswerInterviewerPerspective() {
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Interviewer Perspective Analyzer
          </h1>

          <p className="text-gray-500">
            Understand how your answer may be perceived by an interviewer.
          </p>
        </div>
      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Interview Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={6}
          placeholder="Paste or write your interview answer..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          Analyze From Interviewer Perspective
        </button>

      </div>

      {analyzed && (
        <>
          {/* Perspective Score */}
          <div className="bg-indigo-50 rounded-2xl p-6 text-center">

            <Eye className="mx-auto text-indigo-600" size={30} />

            <p className="text-gray-500 mt-3">
              Interviewer Impression Score
            </p>

            <p className="text-6xl font-black text-indigo-600">
              84%
            </p>

            <p className="text-gray-600 mt-2">
              Your answer communicates strong technical understanding.
            </p>

          </div>

          {/* Strong Signals */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  Strong Signals
                </h2>

                <ul className="mt-2 text-gray-600 space-y-2">
                  <li>• Demonstrates practical technical knowledge.</li>
                  <li>• Explains the reasoning behind the solution.</li>
                  <li>• Shows awareness of performance considerations.</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Concerns */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <AlertTriangle className="text-orange-600" />

              <div>
                <h2 className="font-bold text-orange-700">
                  Potential Concerns
                </h2>

                <ul className="mt-2 text-gray-600 space-y-2">
                  <li>• Some technical claims need supporting examples.</li>
                  <li>• The scalability explanation could be clearer.</li>
                </ul>
              </div>
            </div>

          </div>

          {/* Follow-ups */}
          <div className="bg-white rounded-2xl shadow p-5">

            <div className="flex items-center gap-2">
              <MessageSquare className="text-indigo-600" />
              <h2 className="font-bold">
                Likely Interviewer Follow-ups
              </h2>
            </div>

            <ul className="mt-4 space-y-3 text-gray-600">
              <li>• Why did you choose this approach?</li>
              <li>• How would you scale this solution?</li>
              <li>• What are the main limitations?</li>
              <li>• Can you provide a real example?</li>
            </ul>

          </div>

          {/* Summary */}
          <div className="bg-purple-50 rounded-2xl p-5">

            <h2 className="font-bold text-purple-700">
              Interviewer Perspective Summary
            </h2>

            <p className="text-gray-600 mt-2">
              An interviewer would likely view this as a strong answer, but
              may ask for more evidence and deeper discussion of scalability
              and technical trade-offs.
            </p>

          </div>
        </>
      )}

    </div>
  );
}