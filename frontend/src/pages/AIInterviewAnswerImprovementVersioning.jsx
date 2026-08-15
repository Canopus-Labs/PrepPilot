import React, { useState } from "react";
import {
  Brain,
  GitCompare,
  CheckCircle2,
  TrendingUp,
} from "lucide-react";

const versions = [
  {
    name: "Original",
    score: 62,
    text: "I worked on improving the API performance by optimizing queries.",
  },
  {
    name: "Revision 1",
    score: 74,
    text: "I optimized database queries to improve API response performance.",
  },
  {
    name: "Revision 2",
    score: 86,
    text: "I optimized database queries and introduced caching, reducing API response time by 35%.",
  },
];

export default function AIInterviewAnswerImprovementVersioning() {
  const [selected, setSelected] = useState(0);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Answer Improvement Versioning
          </h1>

          <p className="text-gray-500">
            Compare different versions of your interview answer.
          </p>
        </div>
      </div>

      {/* Version Timeline */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex items-center gap-2">
          <GitCompare className="text-indigo-600" />

          <h2 className="font-bold text-lg">
            Answer Versions
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 mt-5">

          {versions.map((version, index) => (
            <button
              key={version.name}
              onClick={() => setSelected(index)}
              className={`px-4 py-3 rounded-xl font-semibold ${
                selected === index
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {version.name}
            </button>
          ))}

        </div>

      </div>

      {/* Selected Version */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-500">
              Selected Version
            </p>

            <h2 className="text-2xl font-bold">
              {versions[selected].name}
            </h2>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">
              Score
            </p>

            <p className="text-3xl font-black text-indigo-600">
              {versions[selected].score}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 mt-5">
          <p className="text-gray-700 leading-7">
            {versions[selected].text}
          </p>
        </div>

      </div>

      {/* Version Comparison */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Version Comparison
        </h2>

        <div className="grid md:grid-cols-3 gap-4 mt-5">

          {versions.map((version) => (
            <div
              key={version.name}
              className="border rounded-xl p-4"
            >

              <div className="flex justify-between">
                <h3 className="font-bold">
                  {version.name}
                </h3>

                <span className="font-bold text-indigo-600">
                  {version.score}%
                </span>
              </div>

              <p className="text-gray-600 text-sm mt-3">
                {version.text}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* AI Feedback */}
      <div className="bg-green-50 rounded-2xl p-5">

        <div className="flex gap-3">
          <TrendingUp className="text-green-600" />

          <div>
            <h2 className="font-bold text-green-700">
              AI Improvement Feedback
            </h2>

            <p className="text-gray-600 mt-2">
              Your latest version is stronger because it includes a specific
              technical action and a measurable outcome. The answer became
              more concise while providing stronger evidence of impact.
            </p>

            <div className="flex items-center gap-2 mt-3">
              <CheckCircle2
                className="text-green-600"
                size={18}
              />

              <span className="font-semibold text-green-700">
                Improvement: +24 points
              </span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}