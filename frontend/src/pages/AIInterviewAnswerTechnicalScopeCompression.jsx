import React, { useState } from "react";
import {
  Brain,
  Target,
  Minimize2,
  CheckCircle2,
  Trash2,
  Lightbulb,
  Clock3,
  ArrowRight,
} from "lucide-react";

const retainedPoints = [
  "The main technical approach.",
  "Why the selected approach is appropriate.",
  "Important complexity information.",
  "Critical trade-offs.",
  "Relevant edge-case handling.",
];

const removedPoints = [
  "Repeated explanations.",
  "Low-level implementation details.",
  "Secondary configuration details.",
  "Information unrelated to the question.",
];

export default function AIInterviewAnswerTechnicalScopeCompression() {
  const [answer, setAnswer] = useState("");
  const [compressed, setCompressed] = useState(false);

  const analyzeAnswer = () => {
    if (!answer.trim()) return;
    setCompressed(true);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Technical Scope Compression
          </h1>

          <p className="text-gray-500">
            Make technical answers shorter while preserving the reasoning that
            matters most to the interviewer.
          </p>

        </div>

      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Question
            </h2>

            <p className="text-sm text-gray-500">
              How would you improve the performance of a slow API endpoint?
            </p>

          </div>

        </div>

      </div>

      {/* Answer Input */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Minimize2 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Your Technical Answer
            </h2>

            <p className="text-sm text-gray-500">
              Paste or write the detailed answer you would normally give.
            </p>

          </div>

        </div>

        <textarea
          rows={12}
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder={`Example:

First I would investigate the endpoint using logs and profiling tools...
Then I would check the database queries...
I would also look at indexes...
I would inspect whether the API is making unnecessary external requests...
We could introduce caching...
There are many caching strategies...
For example, Redis...
Redis can be configured in different ways...
We should also consider connection pooling...
The connection pool has minimum and maximum connections...
Finally, I would monitor the endpoint...`}
          className="w-full border rounded-xl p-4 mt-5 text-sm font-mono outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          type="button"
          disabled={!answer.trim()}
          onClick={analyzeAnswer}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Compress Technical Answer
        </button>

      </div>

      {compressed && (
        <>
          {/* Analysis */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 bg-white rounded-2xl">

                <Minimize2
                  className="text-indigo-600"
                  size={38}
                />

              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  AI Scope Analysis
                </p>

                <h2 className="text-3xl font-black text-indigo-700 mt-1">
                  42% More Concise
                </h2>

                <p className="text-gray-600 mt-2">
                  The original answer contains useful reasoning but spends too
                  much time on secondary implementation details.
                </p>

              </div>

            </div>

          </div>

          {/* Before / After */}
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-white rounded-2xl shadow p-6">

              <div className="flex items-center gap-3">

                <Clock3 className="text-orange-600" />

                <div>

                  <h2 className="font-bold">
                    Original Answer
                  </h2>

                  <p className="text-sm text-gray-500">
                    Detailed version
                  </p>

                </div>

              </div>

              <div className="mt-5 bg-gray-50 rounded-xl p-5 text-sm text-gray-700 leading-7">

                <p>
                  I would first profile the endpoint to determine where the
                  latency is coming from. Then I would inspect the database
                  queries, indexes, connection pool, and external service calls.
                  Depending on the results, I could introduce caching using
                  Redis. Redis supports different configuration options and
                  eviction policies. I would also consider connection pooling,
                  query optimization, batching, and reducing unnecessary
                  network requests. Finally, I would monitor latency after
                  applying the changes.
                </p>

              </div>

              <div className="mt-4 flex justify-between text-sm">

                <span className="text-gray-500">
                  Estimated time
                </span>

                <span className="font-bold text-orange-600">
                  ~90 seconds
                </span>

              </div>

            </div>

            <div className="bg-white rounded-2xl shadow p-6">

              <div className="flex items-center gap-3">

                <CheckCircle2 className="text-green-600" />

                <div>

                  <h2 className="font-bold">
                    Compressed Answer
                  </h2>

                  <p className="text-sm text-gray-500">
                    Interview-focused version
                  </p>

                </div>

              </div>

              <div className="mt-5 bg-green-50 rounded-xl p-5 text-sm text-gray-700 leading-7">

                <p>
                  I would first profile the endpoint to identify the main
                  bottleneck. If database queries are responsible, I would
                  optimize them and review indexing. For repeated requests, I
                  would introduce caching. I would also reduce unnecessary
                  external calls and use connection pooling where appropriate.
                  Finally, I would monitor latency to verify that the changes
                  improve performance.
                </p>

              </div>

              <div className="mt-4 flex justify-between text-sm">

                <span className="text-gray-500">
                  Estimated time
                </span>

                <span className="font-bold text-green-600">
                  ~50 seconds
                </span>

              </div>

            </div>

          </div>

          {/* Retained vs Removed */}
          <div className="grid md:grid-cols-2 gap-6">

            <div className="bg-green-50 rounded-2xl p-6">

              <div className="flex items-center gap-3">

                <CheckCircle2 className="text-green-600" />

                <h2 className="font-bold text-green-700">
                  Information Retained
                </h2>

              </div>

              <div className="space-y-3 mt-5">

                {retainedPoints.map((point) => (

                  <div
                    key={point}
                    className="flex gap-3 bg-white rounded-xl p-4"
                  >

                    <CheckCircle2
                      className="text-green-600 shrink-0"
                      size={19}
                    />

                    <p className="text-sm text-gray-600">
                      {point}
                    </p>

                  </div>
                ))}

              </div>

            </div>

            <div className="bg-orange-50 rounded-2xl p-6">

              <div className="flex items-center gap-3">

                <Trash2 className="text-orange-600" />

                <h2 className="font-bold text-orange-700">
                  Information Removed
                </h2>

              </div>

              <div className="space-y-3 mt-5">

                {removedPoints.map((point) => (

                  <div
                    key={point}
                    className="flex gap-3 bg-white rounded-xl p-4"
                  >

                    <Trash2
                      className="text-orange-600 shrink-0"
                      size={19}
                    />

                    <p className="text-sm text-gray-600">
                      {point}
                    </p>

                  </div>
                ))}

              </div>

            </div>

          </div>

          {/* Compression Metrics */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Compression Metrics
                </h2>

                <p className="text-sm text-gray-500">
                  See how the answer changed without losing important technical
                  content.
                </p>

              </div>

            </div>

            <div className="grid md:grid-cols-4 gap-4 mt-6">

              <div className="bg-indigo-50 rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Original Length
                </p>

                <p className="text-3xl font-black text-indigo-600 mt-1">
                  154
                </p>

                <p className="text-xs text-gray-500">
                  words
                </p>

              </div>

              <div className="bg-green-50 rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Compressed Length
                </p>

                <p className="text-3xl font-black text-green-600 mt-1">
                  89
                </p>

                <p className="text-xs text-gray-500">
                  words
                </p>

              </div>

              <div className="bg-purple-50 rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Information Retained
                </p>

                <p className="text-3xl font-black text-purple-600 mt-1">
                  91%
                </p>

              </div>

              <div className="bg-orange-50 rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Repetition Removed
                </p>

                <p className="text-3xl font-black text-orange-600 mt-1">
                  42%
                </p>

              </div>

            </div>

          </div>

          {/* Core Answer */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Core Answer Identified
                </h2>

                <p className="text-sm text-gray-500">
                  The essential response the interviewer needs to hear.
                </p>

              </div>

            </div>

            <div className="mt-5 bg-indigo-50 rounded-xl p-5">

              <p className="text-sm font-semibold text-indigo-700">
                Core technical message
              </p>

              <p className="text-gray-700 mt-2 leading-7">
                Profile first, identify the primary bottleneck, optimize the
                responsible component, use caching where appropriate, reduce
                unnecessary external calls, and verify the improvement through
                monitoring.
              </p>

            </div>

          </div>

          {/* Interview Structure */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Brain className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Recommended Interview Structure
                </h2>

                <p className="text-sm text-gray-500">
                  Use this structure when answering similar technical
                  questions.
                </p>

              </div>

            </div>

            <div className="flex flex-wrap items-center gap-3 mt-6">

              {[
                "Direct Answer",
                "Reasoning",
                "Key Technical Decision",
                "Trade-off",
                "Conclusion",
              ].map((item, index, array) => (

                <React.Fragment key={item}>

                  <span className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm">
                    {item}
                  </span>

                  {index < array.length - 1 && (
                    <ArrowRight
                      className="text-gray-400"
                      size={18}
                    />
                  )}

                </React.Fragment>
              ))}

            </div>

          </div>

          {/* AI Tips */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Communication Tips
                </h2>

                <div className="space-y-2 mt-3 text-gray-600">

                  <p>
                    • Lead with the answer instead of building up to it.
                  </p>

                  <p>
                    • Keep implementation details only when they support your
                    main reasoning.
                  </p>

                  <p>
                    • Avoid repeating the same technical point in different
                    words.
                  </p>

                  <p>
                    • Mention complexity and trade-offs when they affect the
                    decision.
                  </p>

                  <p>
                    • Stop once the question has been completely answered.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Final Verdict */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Compression Verdict
                </h2>

                <p className="text-gray-600 mt-2">
                  Your original answer demonstrates strong technical knowledge,
                  but several secondary details make it longer than necessary.
                  The compressed version preserves the main reasoning,
                  optimization decisions, and verification strategy while
                  making the response easier for an interviewer to follow.
                </p>

              </div>

            </div>

          </div>

          {/* Practice */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Target
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  Recommended Practice
                </h2>

                <p className="text-gray-600 mt-2">
                  Try answering the same question in 30 seconds, then 60
                  seconds. Keep the core reasoning intact while removing
                  details that do not affect the technical decision.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
                >
                  Start Scope Compression Challenge
                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}