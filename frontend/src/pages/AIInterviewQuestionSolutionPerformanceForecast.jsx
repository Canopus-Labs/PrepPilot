import React, { useState } from "react";
import {
  Brain,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Target,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  Activity,
  Gauge,
  Database,
} from "lucide-react";

const forecastData = [
  {
    label: "Input Size",
    value: "1K",
    runtime: "12 ms",
    status: "Good",
  },
  {
    label: "Input Size",
    value: "10K",
    runtime: "145 ms",
    status: "Good",
  },
  {
    label: "Input Size",
    value: "100K",
    runtime: "2.8 s",
    status: "Warning",
  },
  {
    label: "Input Size",
    value: "1M",
    runtime: "38 s",
    status: "Critical",
  },
];

const bottlenecks = [
  {
    title: "Nested Iteration",
    impact: "High",
    description:
      "The proposed approach repeatedly scans the input, causing computational growth as input size increases.",
  },
  {
    title: "Repeated Database Reads",
    impact: "Medium",
    description:
      "Multiple sequential reads could become a bottleneck when request volume increases.",
  },
  {
    title: "Large In-Memory Collection",
    impact: "Medium",
    description:
      "Storing all intermediate results may increase memory pressure for large inputs.",
  },
];

const optimizations = [
  {
    title: "Reduce Repeated Scans",
    description:
      "Consider hashing, indexing, sorting, or preprocessing to avoid repeated traversal.",
  },
  {
    title: "Batch Expensive Operations",
    description:
      "Group related database or network operations to reduce repeated overhead.",
  },
  {
    title: "Stream Large Data",
    description:
      "Process large datasets incrementally instead of keeping the entire dataset in memory.",
  },
];

const workflow = [
  {
    title: "Analyze",
    description: "Inspect the proposed algorithm or architecture.",
  },
  {
    title: "Model",
    description: "Estimate computational and resource growth.",
  },
  {
    title: "Forecast",
    description: "Predict behavior at larger workloads.",
  },
  {
    title: "Detect",
    description: "Identify likely bottlenecks.",
  },
  {
    title: "Optimize",
    description: "Recommend improvements before implementation.",
  },
];

export default function AIInterviewQuestionSolutionPerformanceForecast() {
  const [showForecast, setShowForecast] = useState(false);
  const [showBottlenecks, setShowBottlenecks] = useState(false);
  const [showOptimizations, setShowOptimizations] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Solution Performance Forecast
          </h1>

          <p className="text-gray-500">
            Predict how a proposed interview solution will perform before
            implementation.
          </p>

        </div>

      </div>

      {/* Main Forecast */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex items-center gap-5">

          <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center">
            <Gauge
              className="text-orange-600"
              size={32}
            />
          </div>

          <div>

            <p className="text-xs font-bold text-orange-600">
              PERFORMANCE FORECAST
            </p>

            <h2 className="text-2xl font-black text-orange-800 mt-1">
              Performance Risk at Large Inputs
            </h2>

            <p className="text-gray-600 mt-2">
              The proposed solution may perform well on small inputs but is
              predicted to degrade significantly as the workload increases.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Activity
              className="text-indigo-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Complexity
            </p>

            <p className="text-3xl font-black text-indigo-600">
              O(n²)
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <Zap
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Small Input
            </p>

            <p className="text-xl font-black text-green-600">
              Good
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Large Input
            </p>

            <p className="text-xl font-black text-orange-600">
              Risky
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <TrendingUp
              className="text-red-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Bottlenecks
            </p>

            <p className="text-3xl font-black text-red-600">
              3
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <Target
              className="text-purple-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Forecast
            </p>

            <p className="text-xl font-black text-purple-600">
              Needs Optimization
            </p>

          </div>

        </div>

      </div>

      {/* Proposed Solution */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Proposed Solution
            </h2>

            <p className="text-sm text-gray-500">
              The AI evaluates the approach before implementation.
            </p>

          </div>

        </div>

        <div className="bg-gray-50 rounded-2xl p-6 mt-5">

          <p className="text-gray-700 leading-7">
            "For every element in the input, scan the remaining elements to
            find the required match. If a match is found, return the result.
            Otherwise continue until the entire input has been processed."
          </p>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-5">

          <div className="bg-indigo-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              Estimated Complexity
            </p>

            <p className="text-xl font-black text-indigo-700 mt-1">
              O(n²)
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              Small Inputs
            </p>

            <p className="text-xl font-black text-green-700 mt-1">
              Acceptable
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-4">

            <p className="text-xs text-gray-500">
              Large Inputs
            </p>

            <p className="text-xl font-black text-red-700 mt-1">
              Potentially Slow
            </p>

          </div>

        </div>

      </div>

      {/* Forecast Table */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <TrendingUp className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Performance Forecast
              </h2>

              <p className="text-sm text-gray-500">
                Estimated behavior as input size increases.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowForecast(!showForecast)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showForecast
              ? "Hide Forecast"
              : "Show Forecast"}
          </button>

        </div>

        {showForecast && (
          <div className="space-y-4 mt-6">

            {forecastData.map((item) => (

              <div
                key={item.value}
                className="border rounded-2xl p-5"
              >

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs text-gray-500">
                      {item.label}
                    </p>

                    <p className="font-bold text-lg mt-1">
                      {item.value}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-xs text-gray-500">
                      Estimated Runtime
                    </p>

                    <p className="font-black text-lg">
                      {item.runtime}
                    </p>

                  </div>

                </div>

                <div className="flex justify-between items-center mt-4">

                  <div className="h-3 bg-gray-200 rounded-full flex-1 mr-5">

                    <div
                      className={`h-full rounded-full ${
                        item.status === "Good"
                          ? "bg-green-500"
                          : item.status === "Warning"
                          ? "bg-orange-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width:
                          item.status === "Good"
                            ? "30%"
                            : item.status === "Warning"
                            ? "65%"
                            : "95%",
                      }}
                    />

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold ${
                      item.status === "Good"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Warning"
                        ? "bg-orange-100 text-orange-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Bottlenecks */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <AlertTriangle className="text-orange-600" />

            <div>

              <h2 className="font-bold text-lg">
                Predicted Bottlenecks
              </h2>

              <p className="text-sm text-gray-500">
                Areas likely to limit performance as workload increases.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowBottlenecks(!showBottlenecks)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showBottlenecks
              ? "Hide Bottlenecks"
              : "Show Bottlenecks"}
          </button>

        </div>

        {showBottlenecks && (
          <div className="space-y-4 mt-6">

            {bottlenecks.map((bottleneck) => (

              <div
                key={bottleneck.title}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <div>

                    <h3 className="font-bold">
                      {bottleneck.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {bottleneck.description}
                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 h-fit rounded-full text-xs font-bold ${
                      bottleneck.impact === "High"
                        ? "bg-red-100 text-red-700"
                        : "bg-orange-100 text-orange-700"
                    }`}
                  >
                    {bottleneck.impact}
                  </span>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Optimization Recommendations */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center justify-between">

          <div className="flex gap-3">

            <Lightbulb
              className="text-indigo-600"
              size={28}
            />

            <div>

              <h2 className="font-bold text-lg text-indigo-800">
                AI Optimization Recommendations
              </h2>

              <p className="text-sm text-gray-600">
                Improve the solution before writing the implementation.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowOptimizations(!showOptimizations)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showOptimizations
              ? "Hide Recommendations"
              : "Show Recommendations"}
          </button>

        </div>

        {showOptimizations && (
          <div className="space-y-4 mt-6">

            {optimizations.map((optimization, index) => (

              <div
                key={optimization.title}
                className="bg-white rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {optimization.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {optimization.description}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Performance Reasoning */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              AI PERFORMANCE WARNING
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              The solution may pass small test cases but fail at scale.
            </h2>

            <p className="text-gray-600 mt-2">
              An O(n²) approach can appear fast during an interview when the
              sample input is small. The important question is how the number
              of operations grows when the input becomes 10× or 100× larger.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                PERFORMANCE-FIRST QUESTION
              </p>

              <p className="font-semibold text-orange-700 mt-2">
                "What happens to your solution when the input size increases
                by 100×?"
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Analyze Button */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Run AI Performance Analysis
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Forecast computational growth and identify optimization
              opportunities before implementation.
            </p>

            <button
              type="button"
              onClick={() => setAnalyzed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Analyze Solution
              <ArrowRight size={18} />
            </button>

            {analyzed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Performance forecast generated successfully.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Recalculate */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <RefreshCw
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Recalculate Forecast
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Refresh the forecast after changing the proposed algorithm or
              architecture.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Update Forecast
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Performance forecast updated successfully.
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Performance Forecast Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI evaluates a solution before implementation.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowWorkflow(!showWorkflow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWorkflow
              ? "Hide Workflow"
              : "Show Workflow"}
          </button>

        </div>

        {showWorkflow && (
          <div className="flex flex-wrap items-center gap-3 mt-6">

            {workflow.map((step, index) => (

              <React.Fragment key={step.title}>

                <div className="border rounded-xl p-4 min-w-[155px]">

                  <p className="text-xs font-bold text-indigo-600">
                    STEP {index + 1}
                  </p>

                  <h3 className="font-bold mt-1">
                    {step.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-2">
                    {step.description}
                  </p>

                </div>

                {index < workflow.length - 1 && (
                  <ArrowRight
                    className="text-gray-400"
                    size={18}
                  />
                )}

              </React.Fragment>
            ))}

          </div>
        )}

      </div>

      {/* Final Guidance */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI INTERVIEW PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Think about performance before you implement.
            </h2>

            <p className="text-gray-600 mt-2">
              A strong candidate does not wait for a timeout to discover an
              inefficient approach. Estimate complexity, identify bottlenecks,
              consider larger inputs, and optimize the design before writing
              the final implementation.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}