import React, { useState } from "react";
import {
  Brain,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Target,
  Lightbulb,
  RefreshCw,
  Shuffle,
} from "lucide-react";

const concepts = [
  {
    name: "Hash Maps",
    originalContext: "Finding duplicate elements in an array",
    newContext: "Designing a cache for frequently accessed API responses",
    transfer: 88,
  },
  {
    name: "Binary Search",
    originalContext: "Searching for an element in a sorted array",
    newContext: "Finding the minimum feasible server capacity",
    transfer: 72,
  },
  {
    name: "BFS",
    originalContext: "Finding shortest paths in an unweighted graph",
    newContext: "Finding the minimum number of transitions between services",
    transfer: 81,
  },
];

const evaluationPoints = [
  {
    title: "Concept Recognition",
    score: 92,
    description:
      "Recognized that constant-time key-based lookup can be applied to the new scenario.",
  },
  {
    title: "Approach Transfer",
    score: 86,
    description:
      "Successfully adapted the learned technique rather than repeating the original problem.",
  },
  {
    title: "Context Adaptation",
    score: 79,
    description:
      "Adjusted the implementation details to fit the new API caching scenario.",
  },
  {
    title: "Reasoning",
    score: 84,
    description:
      "Explained why the same underlying concept remains useful in the new context.",
  },
];

export default function AIInterviewQuestionKnowledgeTransferChallenge() {
  const [selectedConcept, setSelectedConcept] = useState(0);
  const [answer, setAnswer] = useState("");
  const [started, setStarted] = useState(false);
  const [evaluated, setEvaluated] = useState(false);

  const concept = concepts[selectedConcept];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Shuffle size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Knowledge Transfer Challenge
          </h1>

          <p className="text-gray-500">
            Test whether you can apply a learned concept when the context
            changes completely.
          </p>
        </div>

      </div>

      {/* Concept Selection */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Recently Learned Concepts
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          AI selects concepts you recently studied and creates unfamiliar
          scenarios for transfer testing.
        </p>

        <div className="grid md:grid-cols-3 gap-3 mt-5">

          {concepts.map((item, index) => (
            <button
              type="button"
              key={item.name}
              onClick={() => {
                setSelectedConcept(index);
                setStarted(false);
                setEvaluated(false);
                setAnswer("");
              }}
              className={`text-left border rounded-xl p-4 transition ${
                selectedConcept === index
                  ? "border-indigo-500 bg-indigo-50"
                  : "hover:border-indigo-300"
              }`}
            >

              <p className="font-bold">
                {item.name}
              </p>

              <p className="text-xs text-gray-500 mt-2">
                Learned context: {item.originalContext}
              </p>

            </button>
          ))}

        </div>

      </div>

      {/* Original vs New Context */}
      <div className="grid md:grid-cols-2 gap-5">

        <div className="bg-white rounded-2xl shadow p-6">

          <div className="flex gap-3">

            <Brain
              className="text-indigo-600"
              size={25}
            />

            <div>

              <p className="text-sm text-gray-500">
                Original Learning Context
              </p>

              <h2 className="font-bold mt-1">
                {concept.originalContext}
              </h2>

              <span className="inline-block mt-3 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                Previously Learned
              </span>

            </div>

          </div>

        </div>

        <div className="bg-orange-50 rounded-2xl p-6">

          <div className="flex gap-3">

            <Shuffle
              className="text-orange-600"
              size={25}
            />

            <div>

              <p className="text-sm text-gray-500">
                New Context
              </p>

              <h2 className="font-bold mt-1">
                {concept.newContext}
              </h2>

              <span className="inline-block mt-3 px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-semibold">
                Unfamiliar Scenario
              </span>

            </div>

          </div>

        </div>

      </div>

      {/* Challenge */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex justify-between gap-4">

          <div>

            <p className="text-sm text-gray-500">
              Knowledge Transfer Challenge
            </p>

            <h2 className="text-xl font-bold mt-2">
              API Response Cache
            </h2>

          </div>

          <span className="px-3 py-1 h-fit rounded-full bg-red-100 text-red-700 text-xs font-semibold">
            New Context
          </span>

        </div>

        <div className="bg-gray-50 rounded-xl p-5 mt-5">

          <p className="font-semibold">
            Challenge
          </p>

          <p className="text-gray-600 mt-2">
            Your application repeatedly requests the same API resources.
            Design a caching approach that can quickly determine whether a
            previously requested resource is already available.
          </p>

          <p className="text-gray-600 mt-3">
            Explain which concept you would apply, how you would adapt it to
            this scenario, and why it is appropriate.
          </p>

        </div>

        <button
          type="button"
          onClick={() => setStarted(true)}
          className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          Start Transfer Challenge
        </button>

      </div>

      {started && (
        <>
          {/* Answer */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Your Approach
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Do not simply repeat the original example. Explain how the
              concept transfers to this new situation.
            </p>

            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={8}
              placeholder="Explain your approach..."
              className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() => setEvaluated(true)}
              disabled={!answer.trim()}
              className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold disabled:opacity-50"
            >
              Evaluate Knowledge Transfer
            </button>

          </div>
        </>
      )}

      {evaluated && (
        <>
          {/* Transfer Score */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <Target
                  className="text-indigo-600"
                  size={42}
                />
              </div>

              <div className="flex-1">

                <p className="text-sm text-gray-500">
                  Knowledge Transfer Score
                </p>

                <div className="flex items-end gap-3">

                  <p className="text-6xl font-black text-indigo-600">
                    84%
                  </p>

                  <span className="mb-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                    Strong Transfer
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  You successfully recognized the underlying concept and
                  adapted it to a different technical context.
                </p>

                <div className="h-3 bg-white rounded-full mt-4">

                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{ width: "84%" }}
                  />

                </div>

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            {evaluationPoints.map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-2xl shadow p-5"
              >

                <CheckCircle2 className="text-green-600" />

                <p className="text-sm text-gray-500 mt-4">
                  {item.title}
                </p>

                <p className="text-3xl font-black text-green-600">
                  {item.score}%
                </p>

              </div>
            ))}

          </div>

          {/* Evaluation Breakdown */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Transfer Evaluation
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI evaluates whether you transferred the concept rather than
              memorized the original solution.
            </p>

            <div className="space-y-5 mt-6">

              {evaluationPoints.map((item) => (
                <div key={item.title}>

                  <div className="flex justify-between">

                    <div>

                      <p className="font-semibold">
                        {item.title}
                      </p>

                      <p className="text-xs text-gray-500 mt-1">
                        {item.description}
                      </p>

                    </div>

                    <span className="font-bold text-indigo-600">
                      {item.score}%
                    </span>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full mt-3">

                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{
                        width: `${item.score}%`,
                      }}
                    />

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Concept Transfer */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Concept Transfer Map
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-7">

              <div className="border rounded-xl p-5 text-center">

                <Brain className="mx-auto text-indigo-600" />

                <p className="font-bold mt-3">
                  Hash Maps
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Original concept
                </p>

              </div>

              <ArrowRight
                className="text-indigo-500"
                size={28}
              />

              <div className="border-2 border-indigo-400 rounded-xl p-5 text-center bg-indigo-50">

                <RefreshCw className="mx-auto text-indigo-600" />

                <p className="font-bold mt-3">
                  Concept Transfer
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Adapt underlying technique
                </p>

              </div>

              <ArrowRight
                className="text-indigo-500"
                size={28}
              />

              <div className="border rounded-xl p-5 text-center">

                <Target className="mx-auto text-green-600" />

                <p className="font-bold mt-3">
                  API Cache
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  New application context
                </p>

              </div>

            </div>

          </div>

          {/* What Was Transferred */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-green-700">
                  What You Successfully Transferred
                </h2>

                <div className="space-y-3 mt-4">

                  {[
                    "Constant-time key-based lookup.",
                    "Mapping a unique identifier to stored information.",
                    "Using fast lookup to avoid repeatedly scanning the original data source.",
                  ].map((point) => (
                    <div
                      key={point}
                      className="bg-white rounded-xl p-4 flex gap-3"
                    >

                      <CheckCircle2
                        size={19}
                        className="text-green-600 flex-shrink-0"
                      />

                      <p className="text-sm text-gray-600">
                        {point}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* Improvement */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  Transfer Improvement Area
                </h2>

                <p className="text-gray-600 mt-2">
                  Your concept selection was correct, but the answer could
                  explain cache invalidation and memory limits more clearly.
                  These details show whether you can adapt the concept beyond
                  its basic form.
                </p>

              </div>

            </div>

          </div>

          {/* New Context Comparison */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Original Context vs New Context
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-5">

              <div className="border rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Original
                </p>

                <h3 className="font-bold mt-1">
                  Finding Duplicates
                </h3>

                <p className="text-sm text-gray-600 mt-3">
                  Use a hash map to remember previously encountered values and
                  detect duplicates efficiently.
                </p>

              </div>

              <div className="border rounded-xl p-5 bg-indigo-50">

                <p className="text-sm text-gray-500">
                  New
                </p>

                <h3 className="font-bold mt-1">
                  API Response Cache
                </h3>

                <p className="text-sm text-gray-600 mt-3">
                  Use a key-value structure to map request identifiers to
                  cached responses and avoid repeated API calls.
                </p>

              </div>

            </div>

          </div>

          {/* AI Insight */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Learning Insight
                </h2>

                <p className="text-gray-600 mt-2">
                  Strong knowledge transfer means recognizing the underlying
                  principle rather than remembering a specific question.
                  You successfully transferred the key-value lookup idea from
                  an algorithmic problem into a system-design scenario.
                </p>

              </div>

            </div>

          </div>

          {/* Next Challenge */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex gap-3 items-center">

              <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
                <Shuffle size={24} />
              </div>

              <div className="flex-1">

                <h2 className="font-bold">
                  Ready for Another Context?
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Try applying the same concept to a completely different
                  problem to strengthen transfer ability.
                </p>

              </div>

              <button
                type="button"
                className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
              >
                New Challenge
              </button>

            </div>

          </div>

        </>
      )}

    </div>
  );
}