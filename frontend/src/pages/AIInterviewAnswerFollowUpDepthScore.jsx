import React, { useState } from "react";
import {
  Brain,
  MessageSquare,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const followUps = [
  "Why did you choose this approach?",
  "What happens when the input becomes very large?",
  "What alternative approach could you use?",
];

export default function AIInterviewAnswerFollowUpDepthScore() {
  const [answer, setAnswer] = useState("");
  const [started, setStarted] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Follow-Up Depth Score
          </h1>

          <p className="text-gray-500">
            Test how well you defend and expand your interview answers.
          </p>
        </div>

      </div>

      {/* Score */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <TrendingUp className="mx-auto text-indigo-600" size={30} />

        <p className="text-gray-500 mt-3">
          Follow-Up Readiness Score
        </p>

        <p className="text-6xl font-black text-indigo-600">
          82%
        </p>

        <p className="text-gray-600 mt-2">
          You handle deeper technical questions effectively.
        </p>

      </div>

      {/* Initial Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Initial Interview Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={5}
          placeholder="Enter your initial interview answer..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!answer.trim()}
          onClick={() => setStarted(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 disabled:opacity-50"
        >
          Start Follow-Up Challenge
        </button>

      </div>

      {started && (
        <>
          {/* Follow-Ups */}
          <div className="bg-white rounded-2xl shadow p-5 space-y-4">

            <div className="flex items-center gap-2">
              <MessageSquare className="text-indigo-600" />
              <h2 className="font-bold text-lg">
                Progressive Follow-Ups
              </h2>
            </div>

            {followUps.map((question, index) => (
              <div
                key={question}
                className="border rounded-xl p-4"
              >

                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    Follow-Up {index + 1}
                  </span>

                  <span className="text-sm px-3 py-1 rounded-full bg-indigo-100 text-indigo-600">
                    Level {index + 1}
                  </span>
                </div>

                <p className="text-gray-600 mt-3">
                  {question}
                </p>

              </div>
            ))}

          </div>

          {/* Analysis */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  AI Analysis
                </h2>

                <p className="text-gray-600 mt-2">
                  Your responses remain consistent across follow-up questions.
                  You demonstrate strong technical depth, but deeper
                  scalability trade-offs could be explained more clearly.
                </p>

                <p className="font-semibold text-green-700 mt-3">
                  Follow-ups handled: 3 / 3
                </p>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}