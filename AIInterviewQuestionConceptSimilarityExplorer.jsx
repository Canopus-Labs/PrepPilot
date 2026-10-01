import React, { useState } from "react";
import {
  Brain,
  Network,
  Search,
  CheckCircle2,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

const questions = [
  {
    id: 1,
    title: "Find Two Numbers With a Target Sum",
    concept: "Hashing / Complement Lookup",
    similarity: 94,
  },
  {
    id: 2,
    title: "Find Duplicate Values in an Array",
    concept: "Hashing / Fast Lookup",
    similarity: 89,
  },
  {
    id: 3,
    title: "Longest Subarray With a Given Condition",
    concept: "Sliding Window",
    similarity: 72,
  },
  {
    id: 4,
    title: "Detect Repeated Characters in a String",
    concept: "Hashing / Frequency Tracking",
    similarity: 86,
  },
];

export default function AIInterviewQuestionConceptSimilarityExplorer() {
  const [selected, setSelected] = useState(questions[0]);
  const [searched, setSearched] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Concept Similarity Explorer
          </h1>

          <p className="text-gray-500">
            Discover the concepts connecting seemingly different interview
            questions.
          </p>
        </div>

      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Explore a practiced question
        </p>

        <div className="flex gap-3 mt-3">

          <div className="flex-1 flex items-center border rounded-xl px-4">

            <Search
              size={20}
              className="text-gray-400"
            />

            <input
              defaultValue={selected.title}
              placeholder="Search an interview question..."
              className="w-full p-3 outline-none"
            />

          </div>

          <button
            type="button"
            onClick={() => setSearched(true)}
            className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
          >
            Explore
          </button>

        </div>

      </div>

      {/* Selected Question */}
      {searched && (
        <>
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Network className="text-indigo-600" />

              <div>

                <p className="text-sm text-gray-500">
                  Selected Question
                </p>

                <h2 className="text-xl font-bold mt-1">
                  {selected.title}
                </h2>

                <p className="text-gray-600 mt-3">
                  Underlying concept:
                  <strong> {selected.concept}</strong>
                </p>

              </div>

            </div>

          </div>

          {/* Similar Questions */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Conceptually Related Questions
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              These questions may look different but test similar reasoning.
            </p>

            <div className="space-y-4 mt-5">

              {questions
                .filter((question) => question.id !== selected.id)
                .map((question) => (
                  <button
                    type="button"
                    key={question.id}
                    onClick={() => setSelected(question)}
                    className="w-full text-left border rounded-xl p-4 hover:border-indigo-400 transition"
                  >

                    <div className="flex justify-between gap-4">

                      <div className="flex gap-3">

                        <CheckCircle2
                          className="text-indigo-600 mt-1"
                          size={20}
                        />

                        <div>

                          <h3 className="font-semibold">
                            {question.title}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            Shared concept: {question.concept}
                          </p>

                        </div>

                      </div>

                      <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold h-fit">
                        {question.similarity}% similar
                      </span>

                    </div>

                  </button>
                ))}

            </div>

          </div>

          {/* Concept Connection */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Concept Connection
            </h2>

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">

              <div className="px-5 py-4 rounded-xl bg-indigo-100 text-indigo-700 font-bold">
                Array Search
              </div>

              <ArrowRight className="text-gray-400" />

              <div className="px-5 py-4 rounded-xl bg-green-100 text-green-700 font-bold">
                Fast Lookup
              </div>

              <ArrowRight className="text-gray-400" />

              <div className="px-5 py-4 rounded-xl bg-orange-100 text-orange-700 font-bold">
                Hashing
              </div>

            </div>

            <p className="text-gray-600 text-center mt-5">
              These problems share the idea of using additional lookup
              information to avoid repeatedly scanning the input.
            </p>

          </div>

          {/* AI Insight */}
          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Lightbulb className="text-green-600" />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Concept Insight
                </h2>

                <p className="text-gray-600 mt-2">
                  Do not memorize each question independently. Recognize the
                  underlying pattern: when repeated searching is expensive,
                  consider maintaining extra information that allows faster
                  lookup.
                </p>

              </div>

            </div>

          </div>

          {/* Recommendation */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <h2 className="font-bold text-orange-700">
              Recommended Practice
            </h2>

            <p className="text-gray-600 mt-2">
              Try solving a new hashing problem that does not explicitly
              mention hashing. This tests whether you can transfer the
              underlying concept to an unfamiliar question.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold"
            >
              Practice Related Question
            </button>

          </div>

        </>
      )}

    </div>
  );
}