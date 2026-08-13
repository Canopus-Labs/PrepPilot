import React, { useState } from "react";
import {
  Brain,
  GitCompare,
  CheckCircle2,
  Target,
  TrendingUp,
} from "lucide-react";

export default function AIInterviewQuestionMultiSolutionPractice() {
  const [solution1, setSolution1] = useState("");
  const [solution2, setSolution2] = useState("");
  const [compared, setCompared] = useState(false);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Multi-Solution Practice
          </h1>

          <p className="text-gray-500">
            Explore multiple approaches to the same interview problem.
          </p>
        </div>

      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-5">

        <p className="text-sm text-gray-500">
          Interview Problem
        </p>

        <h2 className="text-xl font-bold mt-2">
          Find whether an array contains duplicate values.
        </h2>

        <p className="text-gray-600 mt-3">
          First solve the problem using your preferred approach. Then try to
          solve it again using a fundamentally different approach.
        </p>

      </div>

      {/* Solutions */}
      <div className="grid md:grid-cols-2 gap-5">

        <div className="bg-white rounded-2xl shadow p-5">

          <h2 className="font-bold text-lg">
            Approach 1
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Your initial solution
          </p>

          <textarea
            value={solution1}
            onChange={(e) => setSolution1(e.target.value)}
            rows={8}
            placeholder="Describe your first approach..."
            className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

        <div className="bg-indigo-50 rounded-2xl p-5">

          <h2 className="font-bold text-lg text-indigo-700">
            Approach 2
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Try a different strategy
          </p>

          <textarea
            value={solution2}
            onChange={(e) => setSolution2(e.target.value)}
            rows={8}
            placeholder="Describe a different approach..."
            className="w-full border rounded-xl p-4 mt-4 bg-white outline-none focus:ring-2 focus:ring-indigo-500"
          />

        </div>

      </div>

      <button
        disabled={!solution1.trim() || !solution2.trim()}
        onClick={() => setCompared(true)}
        className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
      >
        Compare Approaches
      </button>

      {compared && (
        <>
          {/* Comparison */}
          <div className="bg-white rounded-2xl shadow p-5">

            <div className="flex items-center gap-2">
              <GitCompare className="text-indigo-600" />

              <h2 className="font-bold text-lg">
                AI Approach Comparison
              </h2>
            </div>

            <div className="overflow-x-auto mt-5">

              <table className="w-full min-w-[650px] border-collapse">

                <thead>
                  <tr className="bg-gray-50">

                    <th className="text-left p-4 border">
                      Metric
                    </th>

                    <th className="p-4 border">
                      Approach 1
                    </th>

                    <th className="p-4 border">
                      Approach 2
                    </th>

                  </tr>
                </thead>

                <tbody>

                  <tr>
                    <td className="p-4 border font-semibold">
                      Time Complexity
                    </td>
                    <td className="p-4 border text-center">
                      O(n)
                    </td>
                    <td className="p-4 border text-center">
                      O(n²)
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 border font-semibold">
                      Space Complexity
                    </td>
                    <td className="p-4 border text-center">
                      O(n)
                    </td>
                    <td className="p-4 border text-center">
                      O(1)
                    </td>
                  </tr>

                  <tr>
                    <td className="p-4 border font-semibold">
                      Scalability
                    </td>
                    <td className="p-4 border text-center">
                      Strong
                    </td>
                    <td className="p-4 border text-center">
                      Limited
                    </td>
                  </tr>

                </tbody>

              </table>

            </div>

          </div>

          {/* Trade-offs */}
          <div className="bg-orange-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <Target className="text-orange-600" />

              <div>
                <h2 className="font-bold text-orange-700">
                  Trade-Off Analysis
                </h2>

                <p className="text-gray-600 mt-2">
                  Approach 1 uses additional memory but provides better
                  performance for large inputs. Approach 2 minimizes memory
                  usage but requires nested comparisons and becomes slower as
                  the input grows.
                </p>
              </div>

            </div>

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
                  Prefer Approach 1 when performance and large input sizes are
                  important. Approach 2 can be useful when memory constraints
                  are strict and input sizes are small.
                </p>
              </div>

            </div>

          </div>

          {/* Skill Insight */}
          <div className="bg-indigo-50 rounded-2xl p-5">

            <div className="flex gap-3">

              <TrendingUp className="text-indigo-600" />

              <div>
                <h2 className="font-bold text-indigo-700">
                  Problem-Solving Insight
                </h2>

                <p className="text-gray-600 mt-2">
                  Comparing multiple valid solutions helps you recognize when
                  constraints should influence algorithm selection instead of
                  stopping at the first working solution.
                </p>
              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}