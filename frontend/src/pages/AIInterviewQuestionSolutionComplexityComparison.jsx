import React, { useState } from "react";
import {
  Brain,
  BarChart3,
  Clock,
  HardDrive,
  Zap,
  AlertTriangle,
  CheckCircle2,
  Search,
  ArrowRight,
  Lightbulb,
} from "lucide-react";

const approaches = [
  {
    name: "Brute Force",
    time: "O(n²)",
    space: "O(1)",
    type: "Baseline",
    values: [
      { n: 10, time: 100, memory: 1 },
      { n: 100, time: 10000, memory: 1 },
      { n: 1000, time: 1000000, memory: 1 },
      { n: 10000, time: 100000000, memory: 1 },
    ],
    bottleneck: "Repeated comparisons grow quadratically.",
  },
  {
    name: "Hash Map",
    time: "O(n)",
    space: "O(n)",
    type: "Optimized",
    values: [
      { n: 10, time: 10, memory: 10 },
      { n: 100, time: 100, memory: 100 },
      { n: 1000, time: 1000, memory: 1000 },
      { n: 10000, time: 10000, memory: 10000 },
    ],
    bottleneck: "Additional memory is required for constant-time lookup.",
  },
];

const inputSizes = [10, 100, 1000, 10000];

export default function AIInterviewQuestionSolutionComplexityComparison() {
  const [selectedSize, setSelectedSize] = useState(1000);
  const [showComparison, setShowComparison] = useState(false);
  const [selectedApproach, setSelectedApproach] = useState(null);

  const getValue = (approach, n) =>
    approach.values.find((item) => item.n === n);

  const bruteForce = getValue(approaches[0], selectedSize);
  const hashMap = getValue(approaches[1], selectedSize);

  const timeImprovement = Math.round(
    bruteForce.time / hashMap.time
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Solution Complexity Comparison
          </h1>

          <p className="text-gray-500">
            Compare how different technical approaches behave as input size
            increases.
          </p>
        </div>

      </div>

      {/* Objective */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <BarChart3
            className="text-indigo-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              COMPLEXITY ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              See why Big-O differences matter at scale
            </h2>

            <p className="text-gray-600 mt-2">
              AI compares time growth, space usage, bottlenecks, and practical
              performance so candidates can understand when an optimization
              becomes important.
            </p>

          </div>

        </div>

      </div>

      {/* Problem */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Search className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Problem
            </h2>

            <p className="text-sm text-gray-500">
              Find duplicate values in an array and compare two possible
              approaches.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-6">

          <button
            type="button"
            onClick={() =>
              setSelectedApproach(approaches[0])
            }
            className={`text-left border rounded-xl p-5 ${
              selectedApproach?.name === "Brute Force"
                ? "border-indigo-500 bg-indigo-50"
                : "hover:border-indigo-300"
            }`}
          >

            <div className="flex justify-between">

              <div>
                <p className="text-xs text-gray-500">
                  APPROACH 1
                </p>

                <h3 className="font-bold text-lg mt-1">
                  Brute Force
                </h3>
              </div>

              <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold h-fit">
                O(n²)
              </span>

            </div>

            <p className="text-sm text-gray-500 mt-3">
              Compare each value with other values in the array.
            </p>

          </button>

          <button
            type="button"
            onClick={() =>
              setSelectedApproach(approaches[1])
            }
            className={`text-left border rounded-xl p-5 ${
              selectedApproach?.name === "Hash Map"
                ? "border-indigo-500 bg-indigo-50"
                : "hover:border-indigo-300"
            }`}
          >

            <div className="flex justify-between">

              <div>
                <p className="text-xs text-gray-500">
                  APPROACH 2
                </p>

                <h3 className="font-bold text-lg mt-1">
                  Hash Map
                </h3>
              </div>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold h-fit">
                O(n)
              </span>

            </div>

            <p className="text-sm text-gray-500 mt-3">
              Store previously seen values for faster lookup.
            </p>

          </button>

        </div>

      </div>

      {/* Input Size Selector */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <BarChart3 className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Select Input Size
            </h2>

            <p className="text-sm text-gray-500">
              See how the approaches behave at different scales.
            </p>

          </div>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

          {inputSizes.map((size) => (

            <button
              type="button"
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`p-5 rounded-xl border font-bold ${
                selectedSize === size
                  ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                  : "hover:border-indigo-300"
              }`}
            >
              n = {size.toLocaleString()}
            </button>

          ))}

        </div>

      </div>

      {/* Scale Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Clock className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Performance at n = {selectedSize.toLocaleString()}
            </h2>

            <p className="text-sm text-gray-500">
              Approximate operation growth for the selected input size.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <div className="border rounded-2xl p-6">

            <div className="flex justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Brute Force
                </p>

                <p className="text-3xl font-black text-red-600 mt-1">
                  {bruteForce.time.toLocaleString()}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  approximate operations
                </p>
              </div>

              <AlertTriangle
                className="text-red-600"
                size={28}
              />

            </div>

            <div className="mt-5">

              <p className="text-xs text-gray-500">
                TIME COMPLEXITY
              </p>

              <p className="font-bold mt-1">
                O(n²)
              </p>

            </div>

          </div>

          <div className="border rounded-2xl p-6">

            <div className="flex justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  Hash Map
                </p>

                <p className="text-3xl font-black text-green-600 mt-1">
                  {hashMap.time.toLocaleString()}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  approximate operations
                </p>
              </div>

              <CheckCircle2
                className="text-green-600"
                size={28}
              />

            </div>

            <div className="mt-5">

              <p className="text-xs text-gray-500">
                TIME COMPLEXITY
              </p>

              <p className="font-bold mt-1">
                O(n)
              </p>

            </div>

          </div>

        </div>

        <div className="mt-6 bg-green-50 rounded-xl p-5">

          <div className="flex gap-3">

            <Zap
              className="text-green-600"
              size={24}
            />

            <div>

              <p className="font-bold text-green-700">
                {timeImprovement}× fewer operations
              </p>

              <p className="text-sm text-gray-600 mt-1">
                At n = {selectedSize.toLocaleString()}, the optimized approach
                requires significantly fewer operations in this simplified
                growth model.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Complexity Comparison */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Complexity Comparison
              </h2>

              <p className="text-sm text-gray-500">
                Compare growth across multiple input sizes.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowComparison(!showComparison)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showComparison
              ? "Hide Comparison"
              : "Show Comparison"}
          </button>

        </div>

        {showComparison && (
          <div className="overflow-x-auto mt-6">

            <table className="w-full text-sm">

              <thead>

                <tr className="border-b">

                  <th className="text-left p-3">
                    Input Size
                  </th>

                  <th className="text-left p-3">
                    Brute Force O(n²)
                  </th>

                  <th className="text-left p-3">
                    Hash Map O(n)
                  </th>

                  <th className="text-left p-3">
                    Difference
                  </th>

                </tr>

              </thead>

              <tbody>

                {inputSizes.map((size) => {

                  const brute = getValue(
                    approaches[0],
                    size
                  );

                  const hash = getValue(
                    approaches[1],
                    size
                  );

                  return (
                    <tr
                      key={size}
                      className="border-b"
                    >

                      <td className="p-3 font-semibold">
                        {size.toLocaleString()}
                      </td>

                      <td className="p-3 text-red-600">
                        {brute.time.toLocaleString()}
                      </td>

                      <td className="p-3 text-green-600">
                        {hash.time.toLocaleString()}
                      </td>

                      <td className="p-3 font-bold">
                        {Math.round(
                          brute.time / hash.time
                        ).toLocaleString()}
                        ×
                      </td>

                    </tr>
                  );
                })}

              </tbody>

            </table>

          </div>
        )}

      </div>

      {/* Space Complexity */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <HardDrive className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Space Complexity Comparison
            </h2>

            <p className="text-sm text-gray-500">
              Faster algorithms may require additional memory.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Brute Force
            </p>

            <p className="text-2xl font-black mt-1">
              O(1)
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Uses constant additional memory.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Hash Map
            </p>

            <p className="text-2xl font-black mt-1">
              O(n)
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Stores values in an additional hash-based structure.
            </p>

          </div>

        </div>

        <div className="mt-5 bg-orange-50 rounded-xl p-4">

          <div className="flex gap-3">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-600">
              The optimized approach trades additional memory for substantially
              better time performance.
            </p>

          </div>

        </div>

      </div>

      {/* Bottleneck Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <AlertTriangle className="text-orange-600" />

          <div>

            <h2 className="font-bold text-lg">
              Bottleneck Analysis
            </h2>

            <p className="text-sm text-gray-500">
              AI identifies the operation responsible for performance growth.
            </p>

          </div>

        </div>

        <div className="space-y-4 mt-6">

          <div className="border rounded-xl p-5">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-red-600"
                size={22}
              />

              <div>

                <h3 className="font-bold">
                  Brute Force Bottleneck
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Each element is compared against many other elements,
                  producing quadratic growth.
                </p>

              </div>

            </div>

          </div>

          <div className="border rounded-xl p-5">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={22}
              />

              <div>

                <h3 className="font-bold">
                  Hash Map Improvement
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Hash-based lookup avoids repeated full-array comparisons and
                  reduces the dominant operation count.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Practical Scale Impact */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Lightbulb
            className="text-indigo-600"
            size={28}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              PRACTICAL IMPACT
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Small differences become major differences at scale.
            </h2>

            <p className="text-gray-600 mt-2">
              An O(n²) approach may appear acceptable for small inputs, but its
              operation count grows dramatically as the input increases. This
              is why interviewers care about complexity even when a solution
              works on small test cases.
            </p>

          </div>

        </div>

      </div>

      {/* Interview Explanation */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Interview Explanation Framework
            </h2>

            <p className="text-sm text-gray-500">
              Use this structure when explaining why one approach is better.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap items-center gap-3 mt-6">

          {[
            "State Complexity",
            "Explain Growth",
            "Identify Bottleneck",
            "Compare Alternatives",
            "Discuss Space Trade-Off",
            "Recommend Approach",
          ].map((step, index, array) => (

            <React.Fragment key={step}>

              <span className="px-4 py-2 rounded-xl bg-indigo-50 text-indigo-700 font-semibold text-sm">
                {step}
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

      {/* AI Recommendation */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <CheckCircle2
            className="text-green-600"
            size={28}
          />

          <div>

            <h2 className="font-bold text-green-700">
              AI Recommendation
            </h2>

            <p className="text-gray-600 mt-2">
              Do not stop at saying "O(n) is better than O(n²)." Explain how
              each approach grows, where the bottleneck appears, what memory
              trade-off is introduced, and why the difference matters for the
              expected input scale.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}