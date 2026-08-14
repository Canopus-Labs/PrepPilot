import React, { useState } from "react";
import {
  Brain,
  Gauge,
  CheckCircle2,
  AlertTriangle,
  Target,
  Lightbulb,
  RefreshCw,
  ArrowRight,
  MessageSquare,
  Scissors,
} from "lucide-react";

const metrics = [
  {
    title: "Core Information",
    score: 92,
    description: "Most essential technical points are preserved.",
  },
  {
    title: "Repetition",
    score: 68,
    description: "Several ideas are repeated in different wording.",
  },
  {
    title: "Technical Clarity",
    score: 88,
    description: "The explanation remains technically understandable.",
  },
  {
    title: "Unnecessary Detail",
    score: 61,
    description: "Some implementation details do not support the main answer.",
  },
  {
    title: "Information Density",
    score: 79,
    description: "Good technical value relative to the explanation length.",
  },
];

const suggestions = [
  {
    title: "Remove Repeated Explanation",
    priority: "High",
    description:
      "The caching strategy is explained twice. State the decision and reason once.",
  },
  {
    title: "Compress Implementation Detail",
    priority: "Medium",
    description:
      "The exact configuration steps are unnecessary unless the interviewer asks for them.",
  },
  {
    title: "Preserve Technical Reasoning",
    priority: "Critical",
    description:
      "Do not remove the explanation connecting the architecture choice to scalability.",
  },
];

const workflow = [
  {
    title: "Analyze",
    description: "Parse the complete technical explanation.",
  },
  {
    title: "Extract",
    description: "Identify essential technical information.",
  },
  {
    title: "Detect",
    description: "Find repetition and unnecessary details.",
  },
  {
    title: "Score",
    description: "Measure information density and compression quality.",
  },
  {
    title: "Improve",
    description: "Suggest concise wording without losing meaning.",
  },
];

export default function AIInterviewAnswerTechnicalExplanationCompressionScore() {
  const [showMetrics, setShowMetrics] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
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
            AI Technical Explanation Compression Score
          </h1>

          <p className="text-gray-500">
            Measure how efficiently you communicate essential technical
            information without unnecessary explanation.
          </p>
        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                81%
              </p>

              <p className="text-xs text-gray-500">
                Compression
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              EXPLANATION EFFICIENCY
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Strong but Can Be Tighter
            </h2>

            <p className="text-gray-600 mt-2">
              Your explanation preserves the important technical reasoning,
              but repeated points and secondary details reduce information
              efficiency.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-5 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">
            <Target className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Core Coverage
            </p>

            <p className="text-3xl font-black text-indigo-600">
              92%
            </p>
          </div>

          <div className="bg-orange-50 rounded-xl p-5">
            <AlertTriangle className="text-orange-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Repetition
            </p>

            <p className="text-3xl font-black text-orange-600">
              32%
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <CheckCircle2 className="text-green-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Clarity
            </p>

            <p className="text-3xl font-black text-green-600">
              88%
            </p>
          </div>

          <div className="bg-red-50 rounded-xl p-5">
            <Scissors className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Removable Detail
            </p>

            <p className="text-3xl font-black text-red-600">
              39%
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-5">
            <Gauge className="text-purple-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Information Density
            </p>

            <p className="text-3xl font-black text-purple-600">
              79%
            </p>
          </div>

        </div>

      </div>

      {/* Candidate Answer */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <MessageSquare className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Candidate Explanation
              </h2>

              <p className="text-sm text-gray-500">
                The AI analyzes technical value rather than word count alone.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowAnswer(!showAnswer)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>

        </div>

        {showAnswer && (
          <div className="bg-gray-50 rounded-2xl p-6 mt-5">

            <p className="text-gray-700 leading-7">
              "I would use a load balancer because the load balancer distributes
              incoming traffic across multiple servers. This allows us to
              distribute traffic across multiple servers, which means that
              instead of one server handling all the requests, multiple servers
              can handle requests. This improves scalability because we can add
              more servers when traffic increases. I would also use Redis as a
              cache because caching frequently requested data reduces database
              requests. The Redis cache would store frequently requested data,
              which means the application doesn't need to repeatedly query the
              database for the same information."
            </p>

          </div>
        )}

      </div>

      {/* AI Analysis */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600 shrink-0"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-orange-600">
              AI ANALYSIS
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              The technical reasoning is strong, but several points are
              repeated.
            </h2>

            <p className="text-gray-600 mt-2">
              The answer can be shortened without removing its important
              technical decisions or reasoning.
            </p>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs font-bold text-gray-500">
                ESTIMATED IMPROVEMENT
              </p>

              <p className="font-semibold text-orange-700 mt-2">
                Approximately 30–35% shorter while preserving the core
                technical information.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Compression Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <Gauge className="text-indigo-600" />

            <div>
              <h2 className="font-bold text-lg">
                Compression Analysis
              </h2>

              <p className="text-sm text-gray-500">
                Understand what contributes to the overall score.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowMetrics(!showMetrics)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showMetrics ? "Hide Metrics" : "Show Metrics"}
          </button>

        </div>

        {showMetrics && (
          <div className="space-y-5 mt-6">

            {metrics.map((metric) => (

              <div
                key={metric.title}
                className="border rounded-2xl p-5"
              >

                <div className="flex justify-between">

                  <div>
                    <h3 className="font-bold">
                      {metric.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {metric.description}
                    </p>
                  </div>

                  <p className="text-2xl font-black text-indigo-600">
                    {metric.score}%
                  </p>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-4">

                  <div
                    className={`h-full rounded-full ${
                      metric.score >= 80
                        ? "bg-green-500"
                        : metric.score >= 65
                        ? "bg-orange-500"
                        : "bg-red-500"
                    }`}
                    style={{
                      width: `${metric.score}%`,
                    }}
                  />

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Before / After */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          AI Compression Example
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Preserve the reasoning while removing repeated explanation.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <div className="border border-red-200 rounded-2xl p-5">

            <p className="text-xs font-bold text-red-600">
              ORIGINAL
            </p>

            <p className="text-gray-700 leading-7 mt-3">
              "The load balancer distributes incoming traffic across multiple
              servers. This means traffic is distributed across servers instead
              of one server handling everything. Multiple servers can therefore
              handle requests, allowing the system to scale when traffic
              increases."
            </p>

          </div>

          <div className="border border-green-200 rounded-2xl p-5">

            <p className="text-xs font-bold text-green-600">
              COMPRESSED
            </p>

            <p className="text-gray-700 leading-7 mt-3">
              "A load balancer distributes traffic across multiple servers,
              allowing us to scale horizontally as demand increases."
            </p>

          </div>

        </div>

      </div>

      {/* Suggestions */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center justify-between">

          <div className="flex gap-3">

            <Lightbulb
              className="text-indigo-600"
              size={28}
            />

            <div>
              <h2 className="font-bold text-lg text-indigo-800">
                AI Compression Recommendations
              </h2>

              <p className="text-sm text-gray-600">
                Improve answer efficiency without losing important technical
                reasoning.
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowSuggestions(!showSuggestions)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showSuggestions
              ? "Hide Suggestions"
              : "Show Suggestions"}
          </button>

        </div>

        {showSuggestions && (
          <div className="space-y-4 mt-6">

            {suggestions.map((item, index) => (

              <div
                key={item.title}
                className="bg-white rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-4">

                      <h3 className="font-bold">
                        {item.title}
                      </h3>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          item.priority === "Critical"
                            ? "bg-red-100 text-red-700"
                            : item.priority === "High"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.priority}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2">
                      {item.description}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Important Principle */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI COMMUNICATION PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Concise does not mean incomplete.
            </h2>

            <p className="text-gray-600 mt-2">
              The goal is to remove repetition and low-value details while
              preserving the technical decisions, reasoning, constraints, and
              evidence needed to make the answer convincing.
            </p>

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
              Recalculate Compression Score
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Re-evaluate the answer after making your explanation more
              concise.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Update Score
              <ArrowRight size={18} />
            </button>

            {refreshed && (
              <div className="bg-green-100 text-green-800 rounded-xl p-4 mt-4 font-semibold">
                Explanation compression score updated successfully.
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
                Compression Analysis Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI evaluates technical explanation efficiency.
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

      {/* Analyze */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex gap-4">

          <Brain
            className="text-indigo-600"
            size={30}
          />

          <div className="flex-1">

            <h2 className="font-bold text-lg">
              Run AI Compression Analysis
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Analyze the technical value and efficiency of the current
              explanation.
            </p>

            <button
              type="button"
              onClick={() => setRefreshed(true)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Analyze Explanation
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

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
              Maximize technical information per sentence.
            </h2>

            <p className="text-gray-600 mt-2">
              A strong interview answer should communicate the important
              technical ideas clearly and efficiently. Compression should
              remove waste, not remove reasoning.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}