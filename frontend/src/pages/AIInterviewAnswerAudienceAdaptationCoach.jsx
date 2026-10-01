import React, { useState } from "react";
import {
  Brain,
  Users,
  Target,
  CheckCircle2,
} from "lucide-react";

const audiences = {
  Recruiter: "Explain the concept using simple language and focus on its practical value.",
  "Technical Interviewer":
    "Include the core technical mechanism, implementation details, and complexity.",
  "Senior Engineer":
    "Discuss architecture, trade-offs, scalability, and technical decisions.",
  "Hiring Manager":
    "Focus on business impact, outcomes, reliability, and why the solution matters.",
};

export default function AIInterviewAnswerAudienceAdaptationCoach() {
  const [audience, setAudience] = useState("Recruiter");
  const [answer, setAnswer] = useState("");
  const [analyzed, setAnalyzed] = useState(false);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Audience Adaptation Coach
          </h1>

          <p className="text-gray-500">
            Adapt your technical explanations to different interviewer
            audiences.
          </p>
        </div>
      </div>

      {/* Concept */}
      <div className="bg-white rounded-2xl shadow p-5">
        <p className="text-sm text-gray-500">
          Technical Concept
        </p>

        <h2 className="text-xl font-bold mt-2">
          Explain how an API works.
        </h2>
      </div>

      {/* Audience */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center gap-2">
          <Users className="text-indigo-600" />
          <h2 className="font-bold text-lg">
            Select Interviewer
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 mt-4">

          {Object.keys(audiences).map((item) => (
            <button
              key={item}
              onClick={() => {
                setAudience(item);
                setAnalyzed(false);
              }}
              className={`px-4 py-2 rounded-xl font-semibold ${
                audience === item
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {item}
            </button>
          ))}

        </div>

        <p className="text-gray-600 mt-4">
          {audiences[audience]}
        </p>

      </div>

      {/* Answer */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Your Explanation
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={6}
          placeholder={`Explain the concept for a ${audience}...`}
          className="w-full border rounded-xl p-4 mt-4 outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          disabled={!answer.trim()}
          onClick={() => setAnalyzed(true)}
          className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50"
        >
          Analyze Adaptation
        </button>

      </div>

      {/* Feedback */}
      {analyzed && (
        <>
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Audience Adaptation Score
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 mt-4">

              {[
                ["Technical Depth", 82],
                ["Vocabulary", 88],
                ["Level of Detail", 76],
                ["Clarity", 90],
                ["Relevance", 85],
              ].map(([name, score]) => (
                <div
                  key={name}
                  className="border rounded-xl p-4"
                >
                  <div className="flex justify-between">
                    <span className="font-semibold">{name}</span>
                    <span className="font-bold text-indigo-600">
                      {score}%
                    </span>
                  </div>

                  <div className="h-2 bg-gray-200 rounded-full mt-3">
                    <div
                      className="h-full bg-indigo-600 rounded-full"
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>
              ))}

            </div>

          </div>

          <div className="bg-green-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <CheckCircle2 className="text-green-600" />

              <div>
                <h2 className="font-bold text-green-700">
                  AI Feedback
                </h2>

                <p className="text-gray-600 mt-2">
                  Your explanation is clear and well structured for a{" "}
                  {audience.toLowerCase()}. Adjust the technical depth and
                  examples further depending on the interviewer's background.
                </p>

                <p className="font-bold text-green-700 mt-3">
                  Overall Score: 84%
                </p>
              </div>
            </div>

          </div>

          <div className="bg-indigo-50 rounded-2xl p-5">

            <div className="flex gap-3">
              <Target className="text-indigo-600" />

              <div>
                <h2 className="font-bold text-indigo-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Practice the same explanation with each audience. Focus on
                  simplicity for recruiters and deeper trade-offs for senior
                  technical interviewers.
                </p>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}