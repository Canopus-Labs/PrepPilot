import React, { useState } from "react";
import {
  Brain,
  BookOpen,
  Code2,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Target,
} from "lucide-react";

export default function AIInterviewQuestionExplanationToApplicationTest() {
  const [stage, setStage] = useState(0);
  const [explanation, setExplanation] = useState("");
  const [solution, setSolution] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const completeExplanation = () => {
    if (!explanation.trim()) return;
    setStage(1);
  };

  const submitApplication = () => {
    if (!solution.trim()) return;
    setSubmitted(true);
    setStage(2);
  };

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Explanation-to-Application Test
          </h1>

          <p className="text-gray-500">
            Explain a concept first, then prove that you can apply it to a new
            problem.
          </p>
        </div>

      </div>

      {/* Progress */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex justify-between text-sm">

          <span className="font-semibold">
            Practice Progress
          </span>

          <span>
            {stage === 0
              ? "1 / 2"
              : stage === 1
              ? "2 / 2"
              : "Complete"}
          </span>

        </div>

        <div className="h-2 bg-gray-200 rounded-full mt-3">

          <div
            className="h-full bg-indigo-600 rounded-full transition-all"
            style={{
              width:
                stage === 0
                  ? "50%"
                  : stage === 1
                  ? "75%"
                  : "100%",
            }}
          />

        </div>

      </div>

      {/* Concept */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BookOpen className="text-indigo-600" />

          <div>

            <p className="text-sm text-gray-500">
              Concept
            </p>

            <h2 className="text-2xl font-bold">
              Hash Tables
            </h2>

          </div>

        </div>

        <p className="text-gray-600 mt-4">
          Explain what a hash table is, how lookup works, and why it can
          improve search performance.
        </p>

      </div>

      {/* Explanation Stage */}
      {stage === 0 && (
        <div className="bg-indigo-50 rounded-2xl p-6">

          <div className="flex gap-3">

            <BookOpen className="text-indigo-600" />

            <div className="flex-1">

              <h2 className="font-bold text-indigo-700">
                Step 1: Explain the Concept
              </h2>

              <p className="text-gray-600 mt-2">
                Explain the concept without looking at notes or external
                material.
              </p>

              <textarea
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                rows={7}
                placeholder="Explain hash tables in your own words..."
                className="w-full border rounded-xl p-4 mt-4 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                disabled={!explanation.trim()}
                onClick={completeExplanation}
                className="mt-4 flex items-center gap-2 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
              >
                Continue to Application
                <ArrowRight size={18} />
              </button>

            </div>

          </div>

        </div>
      )}

      {/* Application Stage */}
      {stage === 1 && (
        <div className="space-y-5">

          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Code2 className="text-orange-600" />

              <div className="flex-1">

                <h2 className="font-bold text-orange-700">
                  Step 2: Apply the Concept
                </h2>

                <p className="text-gray-700 mt-3">
                  Given an array of integers and a target value, find two
                  elements whose sum equals the target. Explain how you would
                  use the concept you just described to solve this problem
                  efficiently.
                </p>

                <textarea
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  rows={8}
                  placeholder="Describe your approach and why the concept applies..."
                  className="w-full border rounded-xl p-4 mt-4 bg-white outline-none focus:ring-2 focus:ring-orange-500"
                />

                <button
                  type="button"
                  disabled={!solution.trim()}
                  onClick={submitApplication}
                  className="mt-4 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold disabled:opacity-50"
                >
                  Submit Application
                </button>

              </div>

            </div>

          </div>

          <div className="bg-gray-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Target className="text-indigo-600" />

              <div>

                <h2 className="font-bold">
                  Important
                </h2>

                <p className="text-gray-600 mt-2">
                  Do not simply name an algorithm. Explain how the concept
                  changes the way you approach the problem.
                </p>

              </div>

            </div>

          </div>

        </div>
      )}

      {/* Results */}
      {submitted && (
        <>
          <div className="bg-green-50 rounded-2xl p-6 text-center">

            <CheckCircle2
              className="mx-auto text-green-600"
              size={42}
            />

            <p className="text-sm text-gray-500 mt-3">
              Explanation-to-Application Result
            </p>

            <p className="text-5xl font-black text-green-600">
              Strong
            </p>

            <p className="text-gray-600 mt-2">
              You demonstrated that your conceptual explanation can be
              transferred to a practical problem.
            </p>

          </div>

          {/* Comparison */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Explanation vs Application
            </h2>

            <div className="grid md:grid-cols-2 gap-5 mt-5">

              <div className="bg-indigo-50 rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Explanation Quality
                </p>

                <p className="text-4xl font-black text-indigo-600 mt-2">
                  86%
                </p>

                <p className="text-gray-600 mt-2">
                  You correctly described lookup efficiency and the role of
                  stored keys.
                </p>

              </div>

              <div className="bg-green-50 rounded-xl p-5">

                <p className="text-sm text-gray-500">
                  Application Performance
                </p>

                <p className="text-4xl font-black text-green-600 mt-2">
                  82%
                </p>

                <p className="text-gray-600 mt-2">
                  You successfully connected the concept to an efficient
                  problem-solving approach.
                </p>

              </div>

            </div>

          </div>

          {/* Gap Detection */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <AlertTriangle className="text-orange-600" />

              <div>

                <h2 className="font-bold text-orange-700">
                  Application Gap Check
                </h2>

                <p className="text-gray-600 mt-2">
                  Your explanation was slightly stronger than your practical
                  application. Continue practicing unfamiliar problems where
                  the concept is not explicitly named.
                </p>

              </div>

            </div>

          </div>

          {/* Recommendation */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <h2 className="font-bold text-indigo-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Try a new problem that requires hashing indirectly. This will
              test whether you can recognize when the concept is useful
              without being told which technique to use.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Practice New Application
            </button>

          </div>

        </>
      )}

    </div>
  );
}