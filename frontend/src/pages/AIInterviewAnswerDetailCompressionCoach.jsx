import React, { useState } from "react";
import {
  Brain,
  Minimize2,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function AIInterviewAnswerDetailCompressionCoach() {
  const [answer, setAnswer] = useState("");
  const [compressed, setCompressed] = useState(false);

  const conciseAnswer =
    "I would use caching to reduce repeated database queries, improve API response time, and scale the service efficiently.";

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Detail Compression Coach
          </h1>

          <p className="text-gray-500">
            Make technical answers shorter without losing important details.
          </p>
        </div>

      </div>

      {/* Input */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Original Answer
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={8}
          placeholder="Paste your lengthy technical interview answer..."
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!answer.trim()}
          onClick={() => setCompressed(true)}
          className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          <Minimize2 size={18} />
          Compress Answer
        </button>

      </div>

      {compressed && (
        <>
          {/* Comparison */}
          <div className="grid md:grid-cols-2 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <h2 className="font-bold">
                Original
              </h2>

              <p className="text-gray-600 mt-3 leading-7">
                {answer}
              </p>

              <div className="mt-4 text-sm text-gray-500">
                Estimated duration: 2–3 minutes
              </div>

            </div>

            <div className="bg-indigo-50 rounded-2xl p-5">

              <h2 className="font-bold text-indigo-700">
                AI Compressed Version
              </h2>

              <p className="text-gray-700 mt-3 leading-7">
                {conciseAnswer}
              </p>

              <div className="mt-4 text-sm text-indigo-600 font-semibold">
                Estimated duration: 30–40 seconds
              </div>

            </div>

          </div>

          {/* Compression Stats */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Compression Analysis
            </h2>

            <div className="grid sm:grid-cols-3 gap-4 mt-5">

              <div className="border rounded-xl p-4">
                <Minimize2 className="text-indigo-600" />
                <p className="text-gray-500 mt-2">
                  Length Reduction
                </p>
                <p className="text-2xl font-black">
                  62%
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <Clock className="text-indigo-600" />
                <p className="text-gray-500 mt-2">
                  Time Saved
                </p>
                <p className="text-2xl font-black">
                  90 sec
                </p>
              </div>

              <div className="border rounded-xl p-4">
                <CheckCircle2 className="text-indigo-600" />
                <p className="text-gray-500 mt-2">
                  Key Content Preserved
                </p>
                <p className="text-2xl font-black">
                  94%
                </p>
              </div>

            </div>

          </div>

          {/* Removed Details */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <h2 className="font-bold text-orange-700">
              Details Compressed
            </h2>

            <ul className="text-gray-600 mt-3 space-y-2">
              <li>• Repeated explanation of database optimization.</li>
              <li>• Unnecessary implementation-level details.</li>
              <li>• Repeated statements about performance.</li>
            </ul>

          </div>

          {/* AI Feedback */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  AI Communication Tip
                </h2>

                <p className="text-gray-600 mt-2">
                  Lead with the main technical decision, explain the key
                  reasoning once, and provide additional implementation details
                  only when the interviewer asks for them.
                </p>
              </div>
            </div>

          </div>

        </>
      )}

    </div>
  );
}