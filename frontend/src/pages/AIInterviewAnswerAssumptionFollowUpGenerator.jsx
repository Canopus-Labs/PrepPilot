import React, { useState } from "react";
import {
  Brain,
  AlertTriangle,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";

const assumptions = [
  {
    assumption: "Input size will remain relatively small.",
    question: "What would you change if the input became 10x larger?",
  },
  {
    assumption: "The database response is always available.",
    question: "How would your solution handle a database failure?",
  },
  {
    assumption: "Requests can be processed synchronously.",
    question: "When would an asynchronous approach be better?",
  },
];

export default function AIInterviewAnswerAssumptionFollowUpGenerator() {
  const [answer, setAnswer] = useState("");
  const [generated, setGenerated] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Assumption Follow-Up Generator
          </h1>

          <p className="text-gray-500">
            Turn assumptions in your answer into personalized interviewer
            follow-up questions.
          </p>
        </div>
      </div>

      {/* Answer Input */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Interview Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={6}
          placeholder="Enter your technical interview answer..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-orange-500"
        />

        <button
          disabled={!answer.trim()}
          onClick={() => setGenerated(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 disabled:opacity-50"
        >
          Generate Follow-Ups
        </button>

      </div>

      {generated && (
        <>
          {/* Detection */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <AlertTriangle className="text-orange-600" />

              <div>
                <h2 className="font-bold text-orange-700">
                  Assumptions Detected
                </h2>

                <p className="text-gray-600 mt-1">
                  AI identified {assumptions.length} assumptions that an
                  interviewer could challenge.
                </p>
              </div>
            </div>

          </div>

          {/* Follow-ups */}
          <div className="bg-white rounded-2xl shadow p-5 space-y-4">

            <div className="flex items-center gap-2">
              <MessageSquare className="text-indigo-600" />
              <h2 className="font-bold text-lg">
                Personalized Follow-Up Questions
              </h2>
            </div>

            {assumptions.map((item, index) => (
              <div
                key={index}
                className="border rounded-xl p-4"
              >

                <p className="text-sm text-gray-500">
                  Detected Assumption
                </p>

                <p className="font-semibold mt-1">
                  {item.assumption}
                </p>

                <div className="mt-4 bg-indigo-50 rounded-xl p-4">
                  <p className="text-sm text-indigo-600 font-semibold">
                    Interviewer Follow-Up
                  </p>

                  <p className="text-gray-700 mt-1">
                    {item.question}
                  </p>
                </div>

              </div>
            ))}

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
                  Practice defending each assumption by explaining when it is
                  valid, when it can fail, and how your solution would change
                  under different conditions.
                </p>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}