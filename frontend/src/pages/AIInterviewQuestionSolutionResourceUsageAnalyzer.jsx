import React, { useState } from "react";
import {
  Brain,
  Cpu,
  HardDrive,
  MemoryStick,
  Network,
  AlertTriangle,
  CheckCircle2,
  BarChart3,
  Lightbulb,
  ArrowRight,
  RefreshCw,
  Server,
} from "lucide-react";

const resources = [
  {
    name: "CPU",
    icon: Cpu,
    usage: 82,
    risk: "High",
    impact: 88,
    description:
      "Repeated computation and request processing may become CPU-intensive as workload increases.",
    limitation:
      "High request volume can saturate available compute capacity and increase response latency.",
    recommendation:
      "Reduce unnecessary computation, optimize expensive operations, and consider horizontal scaling.",
  },
  {
    name: "Memory",
    icon: MemoryStick,
    usage: 74,
    risk: "Medium",
    impact: 76,
    description:
      "In-memory structures consume additional RAM as the dataset and concurrent workload grow.",
    limitation:
      "Large datasets or excessive caching can cause memory pressure and potentially trigger failures.",
    recommendation:
      "Bound in-memory data, stream large datasets, and monitor memory growth.",
  },
  {
    name: "Storage",
    icon: HardDrive,
    usage: 61,
    risk: "Medium",
    impact: 64,
    description:
      "Persistent storage requirements increase with retained records, logs, and generated data.",
    limitation:
      "Storage growth can increase cost and eventually require partitioning or archival strategies.",
    recommendation:
      "Define retention policies, archive cold data, and monitor storage growth.",
  },
  {
    name: "Network",
    icon: Network,
    usage: 69,
    risk: "Medium",
    impact: 71,
    description:
      "External service calls and data transfer contribute to network usage.",
    limitation:
      "High request volume or large payloads can increase latency and bandwidth consumption.",
    recommendation:
      "Reduce payload size, cache suitable responses, and minimize unnecessary network calls.",
  },
];

const scalingFactors = [
  {
    name: "CPU Scaling",
    score: 82,
    description:
      "How computational requirements grow as workload increases.",
  },
  {
    name: "Memory Scaling",
    score: 76,
    description:
      "How memory consumption changes with dataset size and concurrency.",
  },
  {
    name: "Storage Scaling",
    score: 64,
    description:
      "How persistent storage requirements grow over time.",
  },
  {
    name: "Network Scaling",
    score: 71,
    description:
      "How network traffic changes with requests and data volume.",
  },
  {
    name: "Bottleneck Awareness",
    score: 86,
    description:
      "How effectively the candidate identifies the primary limiting resource.",
  },
];

const coachingQuestions = [
  "Which resource becomes the first bottleneck as traffic increases?",
  "How does CPU usage change when the number of requests doubles?",
  "What happens to memory usage as the dataset grows?",
  "How much persistent storage does the system require over time?",
  "Which operations generate the most network traffic?",
  "Can the system scale horizontally, vertically, or both?",
  "What resource trade-off does your chosen architecture introduce?",
];

const recommendations = [
  {
    title: "Identify the Primary Bottleneck",
    reason:
      "Not every resource needs equal optimization effort.",
    action:
      "Determine which resource is most likely to limit the system under expected workload.",
  },
  {
    title: "Explain Resource Growth",
    reason:
      "A solution may work at small scale but fail when resource usage grows.",
    action:
      "Describe how CPU, memory, storage, and network requirements change with workload.",
  },
  {
    title: "Discuss Practical Trade-Offs",
    reason:
      "Optimizing one resource can increase consumption of another.",
    action:
      "Explain trade-offs such as memory versus CPU or caching versus storage.",
  },
];

const workflow = [
  {
    title: "Extract",
    description: "Identify operations and resources.",
  },
  {
    title: "Estimate",
    description: "Evaluate expected resource usage.",
  },
  {
    title: "Scale",
    description: "Model resource growth.",
  },
  {
    title: "Detect",
    description: "Find likely bottlenecks.",
  },
  {
    title: "Optimize",
    description: "Suggest practical improvements.",
  },
];

export default function AIInterviewQuestionSolutionResourceUsageAnalyzer() {
  const [selectedResource, setSelectedResource] =
    useState(resources[0]);

  const [showResources, setShowResources] = useState(false);
  const [showFactors, setShowFactors] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [showRecommendations, setShowRecommendations] =
    useState(false);
  const [showWorkflow, setShowWorkflow] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  const resourceScore = 81;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Solution Resource Usage Analyzer
          </h1>

          <p className="text-gray-500">
            Analyze CPU, memory, storage, network usage, bottlenecks, and
            resource scaling in a technical solution.
          </p>

        </div>

      </div>

      {/* Main Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-6">

          <div className="w-32 h-32 rounded-full bg-white border-8 border-indigo-500 flex items-center justify-center">

            <div className="text-center">

              <p className="text-3xl font-black text-indigo-700">
                {resourceScore}
              </p>

              <p className="text-xs text-gray-500">
                / 100
              </p>

            </div>

          </div>

          <div>

            <p className="text-xs font-bold text-indigo-600">
              RESOURCE AWARENESS SCORE
            </p>

            <h2 className="text-2xl font-black text-indigo-800 mt-1">
              Strong Practical Resource Awareness
            </h2>

            <p className="text-gray-600 mt-2">
              The solution considers multiple resource dimensions, with CPU
              currently representing the most significant potential bottleneck.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="grid md:grid-cols-4 gap-4">

          <div className="bg-indigo-50 rounded-xl p-5">

            <Server className="text-indigo-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Resources Analyzed
            </p>

            <p className="text-3xl font-black text-indigo-600">
              4
            </p>

          </div>

          <div className="bg-red-50 rounded-xl p-5">

            <Cpu className="text-red-600" size={22} />

            <p className="text-sm text-gray-500 mt-3">
              Primary Bottleneck
            </p>

            <p className="text-3xl font-black text-red-600">
              CPU
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <AlertTriangle
              className="text-orange-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              High Risk
            </p>

            <p className="text-3xl font-black text-orange-600">
              1
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <CheckCircle2
              className="text-green-600"
              size={22}
            />

            <p className="text-sm text-gray-500 mt-3">
              Overall Score
            </p>

            <p className="text-3xl font-black text-green-600">
              81%
            </p>

          </div>

        </div>

      </div>

      {/* Resource Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Server className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Resource Usage Analysis
              </h2>

              <p className="text-sm text-gray-500">
                Review expected usage and potential limitations for each
                resource.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowResources(!showResources)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showResources ? "Hide Resources" : "Show Resources"}
          </button>

        </div>

        {showResources && (
          <div className="space-y-4 mt-6">

            {resources.map((resource, index) => {

              const Icon = resource.icon;

              return (
                <button
                  type="button"
                  key={resource.name}
                  onClick={() => setSelectedResource(resource)}
                  className={`w-full text-left border rounded-2xl p-5 transition ${
                    selectedResource.name === resource.name
                      ? "border-indigo-500 bg-indigo-50"
                      : "hover:border-indigo-300"
                  }`}
                >

                  <div className="flex gap-4">

                    <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                      <Icon size={22} />
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <h3 className="font-bold">
                            {resource.name}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            {resource.description}
                          </p>

                        </div>

                        <span
                          className={`px-3 py-1 h-fit rounded-full text-xs font-semibold ${
                            resource.risk === "High"
                              ? "bg-red-100 text-red-700"
                              : resource.risk === "Medium"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {resource.risk}
                        </span>

                      </div>

                      <div className="flex items-center gap-4 mt-4">

                        <div className="flex-1 h-3 bg-gray-200 rounded-full">

                          <div
                            className={`h-full rounded-full ${
                              resource.usage >= 80
                                ? "bg-red-500"
                                : resource.usage >= 60
                                ? "bg-orange-500"
                                : "bg-green-500"
                            }`}
                            style={{
                              width: `${resource.usage}%`,
                            }}
                          />

                        </div>

                        <span className="font-black text-indigo-700">
                          {resource.usage}%
                        </span>

                      </div>

                    </div>

                  </div>

                </button>
              );
            })}

          </div>
        )}

      </div>

      {/* Selected Resource */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <AlertTriangle
            className="text-orange-600"
            size={30}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-orange-600">
              SELECTED RESOURCE
            </p>

            <h2 className="text-xl font-bold text-orange-800 mt-1">
              {selectedResource.name}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedResource.description}
            </p>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  USAGE
                </p>

                <p className="text-3xl font-black text-indigo-600">
                  {selectedResource.usage}%
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  RISK
                </p>

                <p className="font-black text-orange-600 mt-1">
                  {selectedResource.risk}
                </p>

              </div>

              <div className="bg-white rounded-xl p-5">

                <p className="text-xs text-gray-500">
                  IMPACT
                </p>

                <p className="text-3xl font-black text-red-600">
                  {selectedResource.impact}
                </p>

              </div>

            </div>

            <div className="bg-white rounded-xl p-5 mt-5">

              <p className="text-xs text-gray-500">
                POTENTIAL LIMITATION
              </p>

              <p className="font-semibold text-red-700 mt-2">
                {selectedResource.limitation}
              </p>

            </div>

            <div className="bg-white rounded-xl p-5 mt-4">

              <p className="text-xs text-gray-500">
                RECOMMENDED DIRECTION
              </p>

              <p className="font-semibold text-indigo-700 mt-2">
                {selectedResource.recommendation}
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Scaling Factors */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <BarChart3 className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Resource Scaling Analysis
              </h2>

              <p className="text-sm text-gray-500">
                Understand how resource requirements change as workload
                increases.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowFactors(!showFactors)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showFactors ? "Hide Analysis" : "Show Analysis"}
          </button>

        </div>

        {showFactors && (
          <div className="space-y-4 mt-6">

            {scalingFactors.map((factor) => (

              <div
                key={factor.name}
                className="border rounded-xl p-5"
              >

                <div className="flex justify-between gap-4">

                  <h3 className="font-bold">
                    {factor.name}
                  </h3>

                  <span className="font-black text-indigo-600">
                    {factor.score}/100
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-3">

                  <div
                    className="h-full bg-indigo-500 rounded-full"
                    style={{
                      width: `${factor.score}%`,
                    }}
                  />

                </div>

                <p className="text-sm text-gray-500 mt-3">
                  {factor.description}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Coaching Questions */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Brain className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Resource Reasoning Questions
              </h2>

              <p className="text-sm text-gray-500">
                Practice explaining resource usage and scaling decisions.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowQuestions(!showQuestions)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showQuestions ? "Hide Questions" : "Show Questions"}
          </button>

        </div>

        {showQuestions && (
          <div className="space-y-3 mt-6">

            {coachingQuestions.map((question, index) => (

              <div
                key={question}
                className="border rounded-xl p-4 flex gap-3"
              >

                <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold shrink-0">
                  {index + 1}
                </div>

                <p className="text-sm text-gray-700 pt-1">
                  {question}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <Lightbulb className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                AI Resource Optimization Recommendations
              </h2>

              <p className="text-sm text-gray-500">
                Improve the solution by addressing the most important resource
                constraints first.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              setShowRecommendations(!showRecommendations)
            }
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showRecommendations
              ? "Hide Recommendations"
              : "Show Recommendations"}
          </button>

        </div>

        {showRecommendations && (
          <div className="space-y-4 mt-6">

            {recommendations.map((item, index) => (

              <div
                key={item.title}
                className="border rounded-xl p-5"
              >

                <div className="flex gap-4">

                  <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                    {index + 1}
                  </div>

                  <div>

                    <h3 className="font-bold">
                      {item.title}
                    </h3>

                    <p className="text-sm text-gray-500 mt-2">
                      {item.reason}
                    </p>

                    <p className="text-sm font-semibold text-indigo-700 mt-2">
                      Action: {item.action}
                    </p>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

      {/* Workflow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-3">

            <RefreshCw className="text-indigo-600" />

            <div>

              <h2 className="font-bold text-lg">
                Resource Analysis Workflow
              </h2>

              <p className="text-sm text-gray-500">
                How the AI evaluates practical resource requirements.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => setShowWorkflow(!showWorkflow)}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold"
          >
            {showWorkflow ? "Hide Workflow" : "Show Workflow"}
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
      <div className="flex justify-end">

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
        >
          Analyze Resource Usage
          <ArrowRight size={18} />
        </button>

      </div>

      {/* Result */}
      {analyzed && (
        <div className="bg-green-50 rounded-2xl p-6">

          <div className="flex gap-4">

            <CheckCircle2
              className="text-green-600"
              size={30}
            />

            <div>

              <p className="text-xs font-bold text-green-600">
                ANALYSIS COMPLETE
              </p>

              <h2 className="text-xl font-bold text-green-800 mt-1">
                Resource usage analyzed successfully.
              </h2>

              <p className="text-gray-600 mt-2">
                The current primary bottleneck is{" "}
                <strong>CPU</strong>. Consider computational optimization and
                an appropriate scaling strategy before optimizing lower-impact
                resources.
              </p>

            </div>

          </div>

        </div>
      )}

      {/* Final Guidance */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <CheckCircle2
            className="text-green-600"
            size={30}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              AI SYSTEM-DESIGN PRINCIPLE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              A scalable solution must scale its resources deliberately.
            </h2>

            <p className="text-gray-600 mt-2">
              Strong technical reasoning goes beyond Big-O notation. Candidates
              should understand how CPU, memory, storage, and network
              requirements change as workload increases and identify which
              resource becomes the limiting factor first.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}