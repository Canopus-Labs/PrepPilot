import React, { useState } from "react";
import {
  Brain,
  TrendingUp,
  MessageSquare,
  Target,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowUpRight,
  History,
} from "lucide-react";

const responses = [
  {
    session: "Session 1",
    date: "Jul 28, 2026",
    clarity: 61,
    structure: 58,
    precision: 64,
    conciseness: 55,
    reasoning: 60,
    followUp: 52,
  },
  {
    session: "Session 2",
    date: "Aug 05, 2026",
    clarity: 69,
    structure: 67,
    precision: 71,
    conciseness: 64,
    reasoning: 68,
    followUp: 61,
  },
  {
    session: "Session 3",
    date: "Aug 13, 2026",
    clarity: 79,
    structure: 76,
    precision: 82,
    conciseness: 73,
    reasoning: 78,
    followUp: 71,
  },
];

const metrics = [
  { key: "clarity", label: "Clarity" },
  { key: "structure", label: "Structure" },
  { key: "precision", label: "Technical Precision" },
  { key: "conciseness", label: "Conciseness" },
  { key: "reasoning", label: "Reasoning" },
  { key: "followUp", label: "Follow-up Handling" },
];

const questions = [
  "Explain the approach you would use to optimize this algorithm.",
  "Why did you choose this architecture?",
  "How would your solution handle increased traffic?",
];

export default function AIInterviewAnswerTechnicalCommunicationBenchmark() {
  const [selectedMetric, setSelectedMetric] = useState("clarity");
  const [selectedQuestion, setSelectedQuestion] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  const latest = responses[responses.length - 1];
  const previous = responses[responses.length - 2];

  const average = (response) =>
    Math.round(
      metrics.reduce((sum, metric) => sum + response[metric.key], 0) /
        metrics.length
    );

  const latestScore = average(latest);
  const previousScore = average(previous);
  const improvement = latestScore - previousScore;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <MessageSquare size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Technical Communication Benchmark
          </h1>

          <p className="text-gray-500">
            Compare your technical communication with your own previous
            responses to measure real improvement.
          </p>

        </div>

      </div>

      {/* Question Type */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Comparable Question Set
            </h2>

            <p className="text-sm text-gray-500">
              Benchmark responses from similar technical question types.
            </p>

          </div>

        </div>

        <select
          value={selectedQuestion}
          onChange={(e) => setSelectedQuestion(Number(e.target.value))}
          className="w-full mt-5 border rounded-xl p-3 outline-none focus:ring-2 focus:ring-indigo-500"
        >
          {questions.map((question, index) => (
            <option key={question} value={index}>
              {question}
            </option>
          ))}
        </select>

      </div>

      {/* Current Benchmark */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-5 items-center">

          <div className="p-4 bg-white rounded-2xl">

            <TrendingUp
              className="text-indigo-600"
              size={40}
            />

          </div>

          <div className="flex-1">

            <p className="text-sm text-gray-500">
              Personal Communication Benchmark
            </p>

            <div className="flex items-end gap-3">

              <p className="text-6xl font-black text-indigo-600">
                {latestScore}%
              </p>

              <span className="mb-2 px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">
                +{improvement}% since last session
              </span>

            </div>

            <p className="text-gray-600 mt-2">
              Your latest response is stronger than your previous response
              across comparable technical questions.
            </p>

          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="grid md:grid-cols-3 gap-4">

        {metrics.map((metric) => {

          const value = latest[metric.key];
          const oldValue = responses[0][metric.key];
          const growth = value - oldValue;

          return (
            <button
              type="button"
              key={metric.key}
              onClick={() => setSelectedMetric(metric.key)}
              className={`text-left bg-white rounded-2xl shadow p-5 border-2 transition ${
                selectedMetric === metric.key
                  ? "border-indigo-500"
                  : "border-transparent"
              }`}
            >

              <div className="flex justify-between">

                <p className="text-sm text-gray-500">
                  {metric.label}
                </p>

                <TrendingUp
                  size={18}
                  className="text-green-600"
                />

              </div>

              <p className="text-3xl font-black text-indigo-600 mt-3">
                {value}%
              </p>

              <p className="text-sm text-green-600 font-semibold mt-2">
                +{growth} points since first session
              </p>

            </button>
          );
        })}

      </div>

      {/* Selected Metric */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              {metrics.find(
                (metric) => metric.key === selectedMetric
              )?.label} Progress
            </h2>

            <p className="text-sm text-gray-500">
              Personal trend across previous comparable responses.
            </p>

          </div>

        </div>

        <div className="space-y-5 mt-7">

          {responses.map((response, index) => (

            <div key={response.session}>

              <div className="flex justify-between mb-2">

                <div>

                  <span className="font-semibold">
                    {response.session}
                  </span>

                  <span className="text-xs text-gray-500 ml-2">
                    {response.date}
                  </span>

                </div>

                <span className="font-bold text-indigo-600">
                  {response[selectedMetric]}%
                </span>

              </div>

              <div className="h-4 bg-gray-200 rounded-full">

                <div
                  className="h-full bg-indigo-500 rounded-full"
                  style={{
                    width: `${response[selectedMetric]}%`,
                  }}
                />

              </div>

              {index < responses.length - 1 && (
                <div className="text-xs text-green-600 mt-2">
                  Improvement recorded in next session
                </div>
              )}

            </div>

          ))}

        </div>

      </div>

      {/* Trend Table */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <History className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Communication Growth Timeline
            </h2>

            <p className="text-sm text-gray-500">
              See how every communication dimension changed over time.
            </p>

          </div>

        </div>

        <div className="overflow-x-auto mt-6">

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b">

                <th className="text-left p-3">
                  Dimension
                </th>

                {responses.map((response) => (
                  <th
                    key={response.session}
                    className="text-left p-3"
                  >
                    {response.session}
                  </th>
                ))}

                <th className="text-left p-3">
                  Growth
                </th>

              </tr>

            </thead>

            <tbody>

              {metrics.map((metric) => {

                const first = responses[0][metric.key];
                const last = latest[metric.key];

                return (
                  <tr
                    key={metric.key}
                    className="border-b"
                  >

                    <td className="p-3 font-semibold">
                      {metric.label}
                    </td>

                    {responses.map((response) => (
                      <td
                        key={response.session}
                        className="p-3 font-bold"
                      >
                        {response[metric.key]}%
                      </td>
                    ))}

                    <td className="p-3 text-green-600 font-bold">
                      +{last - first}
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>

      </div>

      {/* Strongest Improvement */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <CheckCircle2
            className="text-green-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-green-700">
              Strongest Communication Improvement
            </h2>

            <p className="text-gray-600 mt-2">
              Technical Precision improved from{" "}
              <strong>{responses[0].precision}%</strong> to{" "}
              <strong>{latest.precision}%</strong>, representing a{" "}
              <strong>+{latest.precision - responses[0].precision}</strong>{" "}
              point improvement.
            </p>

          </div>

        </div>

      </div>

      {/* Persistent Weakness */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <AlertTriangle
            className="text-orange-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-orange-700">
              Persistent Communication Weakness
            </h2>

            <p className="text-gray-600 mt-2">
              Follow-up Handling remains your lowest communication dimension
              despite improving from {responses[0].followUp}% to{" "}
              {latest.followUp}%.
            </p>

            <div className="mt-5 bg-white rounded-xl p-5">

              <p className="font-semibold">
                AI Recommendation
              </p>

              <p className="text-sm text-gray-500 mt-2">
                Practice interviewer follow-up simulations where requirements
                change after your initial explanation. Focus on answering
                directly before adding supporting technical details.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Personal Benchmark */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Personal Benchmark
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Your benchmark is based entirely on your previous performance.
        </p>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              First Recorded
            </p>

            <p className="text-3xl font-black text-gray-700 mt-2">
              {average(responses[0])}%
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Previous
            </p>

            <p className="text-3xl font-black text-indigo-600 mt-2">
              {previousScore}%
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Current
            </p>

            <p className="text-3xl font-black text-green-600 mt-2">
              {latestScore}%
            </p>

          </div>

        </div>

      </div>

      {/* Response Comparison */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <MessageSquare className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Response Improvement Comparison
            </h2>

            <p className="text-sm text-gray-500">
              Compare your earlier and latest communication performance.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          <div className="border rounded-2xl p-5">

            <span className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
              EARLIER RESPONSE
            </span>

            <p className="text-gray-600 mt-4">
              Your explanation contained correct technical information but
              required clearer structure and stronger reasoning transitions.
            </p>

            <div className="mt-5 text-sm">

              <p>
                Overall Communication:{" "}
                <strong>{average(responses[0])}%</strong>
              </p>

            </div>

          </div>

          <div className="border rounded-2xl p-5">

            <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
              LATEST RESPONSE
            </span>

            <p className="text-gray-600 mt-4">
              Your latest response presents the approach more directly and
              connects technical decisions with their reasoning more clearly.
            </p>

            <div className="mt-5 text-sm">

              <p>
                Overall Communication:{" "}
                <strong>{latestScore}%</strong>
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* Detailed Analysis */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Lightbulb
            className="text-indigo-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-indigo-700">
              AI Communication Analysis
            </h2>

            <p className="text-gray-600 mt-2">
              Your technical communication is showing a consistent upward
              trend. The largest improvements are in technical precision,
              clarity, and reasoning. Follow-up handling remains the main area
              where additional practice could produce the most benefit.
            </p>

            <button
              type="button"
              onClick={() => setShowDetails(!showDetails)}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              {showDetails
                ? "Hide Detailed Analysis"
                : "Show Detailed Analysis"}
            </button>

            {showDetails && (
              <div className="grid md:grid-cols-2 gap-4 mt-5">

                {metrics.map((metric) => (

                  <div
                    key={metric.key}
                    className="bg-white rounded-xl p-5"
                  >

                    <p className="font-bold">
                      {metric.label}
                    </p>

                    <p className="text-sm text-gray-500 mt-2">
                      Current score: {latest[metric.key]}%
                    </p>

                    <p className="text-sm text-green-600 font-semibold mt-1">
                      Growth: +
                      {latest[metric.key] -
                        responses[0][metric.key]} points
                    </p>

                  </div>

                ))}

              </div>
            )}

          </div>

        </div>

      </div>

      {/* Next Practice */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <CheckCircle2
            className="text-green-600"
            size={27}
          />

          <div className="flex-1">

            <h2 className="font-bold text-green-700">
              Recommended Next Practice
            </h2>

            <p className="text-gray-600 mt-2">
              Complete a technical mock interview focused on follow-up
              questions and changing requirements. Your goal should be to
              maintain your current clarity and precision while improving
              follow-up handling.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold flex items-center gap-2"
            >
              Start Communication Practice
              <ArrowUpRight size={18} />
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}