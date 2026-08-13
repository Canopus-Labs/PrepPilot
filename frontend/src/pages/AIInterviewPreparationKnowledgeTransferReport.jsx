import React, { useState } from "react";
import {
  Brain,
  BookOpen,
  Code2,
  ClipboardCheck,
  Mic2,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  Target,
} from "lucide-react";

const metrics = [
  {
    name: "Learning Activities",
    score: 92,
    icon: BookOpen,
    description: "Course and revision performance",
  },
  {
    name: "Practice Performance",
    score: 84,
    icon: Code2,
    description: "Performance on practical questions",
  },
  {
    name: "Assessment Results",
    score: 87,
    icon: ClipboardCheck,
    description: "Concept and knowledge assessments",
  },
  {
    name: "Mock Interview",
    score: 78,
    icon: Mic2,
    description: "Interview-style application",
  },
];

const topics = [
  {
    topic: "Binary Search",
    learning: 94,
    practice: 91,
    assessment: 93,
    interview: 88,
    transfer: 91,
    status: "Strong Transfer",
  },
  {
    topic: "Dynamic Programming",
    learning: 90,
    practice: 68,
    assessment: 84,
    interview: 61,
    transfer: 68,
    status: "Transfer Gap",
  },
  {
    topic: "Graph Algorithms",
    learning: 86,
    practice: 82,
    assessment: 80,
    interview: 77,
    transfer: 81,
    status: "Good Transfer",
  },
  {
    topic: "SQL",
    learning: 88,
    practice: 76,
    assessment: 82,
    interview: 72,
    transfer: 79,
    status: "Developing",
  },
];

export default function AIInterviewPreparationKnowledgeTransferReport() {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const overallTransfer = 80;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Knowledge Transfer Report
          </h1>

          <p className="text-gray-500">
            Measure how effectively your learning becomes practical interview
            performance.
          </p>
        </div>

      </div>

      {/* Overall Score */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex justify-between items-center gap-6">

          <div>

            <p className="text-sm text-gray-500">
              Overall Knowledge Transfer
            </p>

            <p className="text-6xl font-black text-indigo-600 mt-2">
              {overallTransfer}%
            </p>

            <span className="inline-block mt-3 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
              Good Transfer
            </span>

            <p className="text-gray-600 mt-3">
              Most learned concepts are successfully appearing in practical
              interview performance, but some topics show an application gap.
            </p>

          </div>

          <div className="hidden md:block p-5 rounded-2xl bg-white">
            <TrendingUp
              className="text-indigo-600"
              size={52}
            />
          </div>

        </div>

      </div>

      {/* Metrics */}
      <div className="grid md:grid-cols-4 gap-4">

        {metrics.map((metric) => {
          const Icon = metric.icon;

          return (
            <div
              key={metric.name}
              className="bg-white rounded-2xl shadow p-5"
            >

              <Icon className="text-indigo-600" size={24} />

              <p className="text-sm text-gray-500 mt-4">
                {metric.name}
              </p>

              <p className="text-3xl font-black mt-1">
                {metric.score}%
              </p>

              <div className="h-2 bg-gray-200 rounded-full mt-3">

                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${metric.score}%`,
                  }}
                />

              </div>

              <p className="text-xs text-gray-500 mt-2">
                {metric.description}
              </p>

            </div>
          );
        })}

      </div>

      {/* Transfer Flow */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Knowledge Transfer Pipeline
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-between gap-3 mt-8">

          {[
            ["Learning", 92, BookOpen],
            ["Practice", 84, Code2],
            ["Assessment", 87, ClipboardCheck],
            ["Interview", 78, Mic2],
          ].map(([name, score, Icon], index) => (
            <React.Fragment key={name}>

              <div className="w-full md:w-48 border rounded-2xl p-5 text-center">

                <Icon
                  className="mx-auto text-indigo-600"
                  size={26}
                />

                <p className="font-bold mt-3">
                  {name}
                </p>

                <p className="text-3xl font-black text-indigo-600 mt-1">
                  {score}%
                </p>

              </div>

              {index < 3 && (
                <ArrowRight
                  className="hidden md:block text-gray-400"
                />
              )}

            </React.Fragment>
          ))}

        </div>

      </div>

      {/* Topic Analysis */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Topic-Level Knowledge Transfer
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          Compare theoretical learning with practical interview application.
        </p>

        <div className="overflow-x-auto mt-5">

          <table className="w-full text-sm">

            <thead>

              <tr className="border-b text-left">

                <th className="p-3">
                  Topic
                </th>

                <th className="p-3">
                  Learning
                </th>

                <th className="p-3">
                  Practice
                </th>

                <th className="p-3">
                  Assessment
                </th>

                <th className="p-3">
                  Interview
                </th>

                <th className="p-3">
                  Transfer
                </th>

              </tr>

            </thead>

            <tbody>

              {topics.map((topic) => (
                <tr
                  key={topic.topic}
                  onClick={() =>
                    setSelectedTopic(
                      selectedTopic?.topic === topic.topic
                        ? null
                        : topic
                    )
                  }
                  className="border-b hover:bg-indigo-50 cursor-pointer"
                >

                  <td className="p-3 font-semibold">
                    {topic.topic}
                  </td>

                  <td className="p-3">
                    {topic.learning}%
                  </td>

                  <td className="p-3">
                    {topic.practice}%
                  </td>

                  <td className="p-3">
                    {topic.assessment}%
                  </td>

                  <td className="p-3">
                    {topic.interview}%
                  </td>

                  <td className="p-3">

                    <span
                      className={`px-3 py-1 rounded-full font-semibold ${
                        topic.transfer >= 85
                          ? "bg-green-100 text-green-700"
                          : topic.transfer >= 75
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {topic.transfer}%
                    </span>

                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

        {selectedTopic && (
          <div className="mt-5 bg-indigo-50 rounded-xl p-5">

            <h3 className="font-bold">
              {selectedTopic.topic} — Transfer Analysis
            </h3>

            <p className="text-gray-600 mt-2">
              Learning performance is{" "}
              <strong>{selectedTopic.learning}%</strong>, while practical
              interview performance is{" "}
              <strong>{selectedTopic.interview}%</strong>.
              This produces a transfer score of{" "}
              <strong>{selectedTopic.transfer}%</strong>.
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Status: {selectedTopic.status}
            </p>

          </div>
        )}

      </div>

      {/* Transfer Gap */}
      <div className="bg-orange-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <AlertTriangle
            className="text-orange-600"
            size={25}
          />

          <div>

            <h2 className="font-bold text-orange-700">
              Largest Knowledge Transfer Gap
            </h2>

            <p className="text-gray-600 mt-2">
              <strong>Dynamic Programming</strong> has strong learning and
              assessment performance but significantly weaker practical
              performance. This suggests that the concept is understood
              theoretically but is not yet being transferred effectively to
              unfamiliar interview problems.
            </p>

          </div>

        </div>

      </div>

      {/* Strong Transfer */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <CheckCircle2
            className="text-green-600"
            size={25}
          />

          <div>

            <h2 className="font-bold text-green-700">
              Strongest Knowledge Transfer
            </h2>

            <p className="text-gray-600 mt-2">
              <strong>Binary Search</strong> shows the strongest transfer from
              learning to practical performance. Your practice and interview
              results closely match your theoretical understanding.
            </p>

          </div>

        </div>

      </div>

      {/* AI Recommendations */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Target
            className="text-indigo-600"
            size={25}
          />

          <div className="flex-1">

            <h2 className="font-bold text-indigo-700">
              AI Recommendations
            </h2>

            <div className="space-y-3 mt-4">

              {[
                "Practice unfamiliar Dynamic Programming problems without pattern hints.",
                "Use short application exercises immediately after learning a new concept.",
                "Complete mock interview questions to test whether knowledge transfers under pressure.",
                "Review concepts with high assessment scores but lower practical performance.",
              ].map((recommendation) => (
                <div
                  key={recommendation}
                  className="flex gap-3 bg-white rounded-xl p-3"
                >

                  <CheckCircle2
                    className="text-indigo-600"
                    size={19}
                  />

                  <p className="text-gray-700">
                    {recommendation}
                  </p>

                </div>
              ))}

            </div>

          </div>

        </div>

      </div>

      {/* Final Insight */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          AI Report Summary
        </h2>

        <p className="text-gray-600 mt-3">
          Your overall knowledge transfer is strong, but completion of a
          learning activity does not always indicate practical mastery.
          Continue connecting learning sessions directly with application
          exercises and interview-style problems, especially for concepts
          where theoretical scores significantly exceed practical results.
        </p>

      </div>

    </div>
  );
}