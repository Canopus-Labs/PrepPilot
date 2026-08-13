import React, { useState } from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  Award,
  BarChart3,
  Clock,
  ShieldCheck,
} from "lucide-react";

const evidence = [
  {
    title: "Successful Questions",
    value: "18 / 20",
    score: 90,
    detail: "18 questions solved correctly across multiple variations.",
  },
  {
    title: "Concept Recall",
    value: "86%",
    score: 86,
    detail: "Successfully explained the concept without reference material.",
  },
  {
    title: "Assessment Performance",
    value: "88%",
    score: 88,
    detail: "Strong performance in recent concept assessments.",
  },
  {
    title: "Reattempt Success",
    value: "92%",
    score: 92,
    detail: "Previously incorrect questions were successfully solved later.",
  },
  {
    title: "Difficulty Completed",
    value: "Medium",
    score: 80,
    detail: "Consistent performance demonstrated at Medium difficulty.",
  },
  {
    title: "Recent Performance",
    value: "89%",
    score: 89,
    detail: "Recent attempts show stable understanding.",
  },
];

export default function AIInterviewPreparationConceptMasteryEvidence() {
  const [selected, setSelected] = useState(null);

  const masteryScore = 88;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Concept Mastery Evidence
          </h1>

          <p className="text-gray-500">
            Understand the evidence behind your concept mastery score.
          </p>
        </div>

      </div>

      {/* Concept */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex justify-between items-start gap-4">

          <div>

            <p className="text-sm text-gray-500">
              Concept
            </p>

            <h2 className="text-2xl font-bold mt-1">
              Hash Tables
            </h2>

            <p className="text-gray-600 mt-2">
              Evidence collected from questions, recall exercises,
              assessments, and reattempts.
            </p>

          </div>

          <div className="p-3 rounded-xl bg-green-100 text-green-600">
            <Award size={30} />
          </div>

        </div>

      </div>

      {/* Mastery Score */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <ShieldCheck
          className="mx-auto text-indigo-600"
          size={38}
        />

        <p className="text-gray-500 mt-3">
          Mastery Score
        </p>

        <p className="text-6xl font-black text-indigo-600">
          {masteryScore}%
        </p>

        <span className="inline-block mt-3 px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold">
          Strong Mastery
        </span>

        <p className="text-gray-600 mt-3">
          Your score is supported by consistent evidence across multiple
          preparation activities.
        </p>

      </div>

      {/* Evidence */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex items-center gap-2">

          <BarChart3 className="text-indigo-600" />

          <h2 className="font-bold text-lg">
            Mastery Evidence
          </h2>

        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-5">

          {evidence.map((item) => (
            <button
              type="button"
              key={item.title}
              onClick={() =>
                setSelected(selected?.title === item.title ? null : item)
              }
              className="text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
            >

              <div className="flex justify-between gap-3">

                <div className="flex gap-3">

                  <CheckCircle2
                    className="text-green-600 mt-1"
                    size={21}
                  />

                  <div>

                    <h3 className="font-semibold">
                      {item.title}
                    </h3>

                    <p className="text-2xl font-black text-indigo-600 mt-1">
                      {item.value}
                    </p>

                  </div>

                </div>

                <span className="text-sm font-bold text-gray-500">
                  {item.score}%
                </span>

              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-4">

                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{
                    width: `${item.score}%`,
                  }}
                />

              </div>

              {selected?.title === item.title && (
                <p className="text-sm text-gray-600 mt-4">
                  {item.detail}
                </p>
              )}

            </button>
          ))}

        </div>

      </div>

      {/* Difficulty Evidence */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex items-center gap-2">

          <Target className="text-indigo-600" />

          <h2 className="font-bold text-lg">
            Difficulty Evidence
          </h2>

        </div>

        <div className="grid grid-cols-3 gap-4 mt-5">

          {[
            ["Easy", "96%", "Strong"],
            ["Medium", "87%", "Strong"],
            ["Hard", "64%", "Developing"],
          ].map(([level, score, status]) => (
            <div
              key={level}
              className="rounded-xl bg-gray-50 border p-4 text-center"
            >

              <p className="font-semibold">
                {level}
              </p>

              <p className="text-2xl font-black text-indigo-600 mt-2">
                {score}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                {status}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* Recent Evidence */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex items-center gap-2">

          <Clock className="text-indigo-600" />

          <h2 className="font-bold text-lg">
            Recent Mastery Evidence
          </h2>

        </div>

        <div className="space-y-3 mt-5">

          {[
            "Solved a new hashing variation without hints.",
            "Explained collision handling during a recall exercise.",
            "Corrected a previous implementation mistake.",
            "Passed the latest concept assessment with 88%.",
          ].map((item) => (
            <div
              key={item}
              className="flex gap-3 p-3 rounded-xl bg-green-50"
            >

              <CheckCircle2
                className="text-green-600"
                size={20}
              />

              <p className="text-gray-700">
                {item}
              </p>

            </div>
          ))}

        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-indigo-50 rounded-2xl p-5">

        <div className="flex gap-3">

          <ShieldCheck className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-indigo-700">
              Why This Concept Is Considered Mastered
            </h2>

            <p className="text-gray-600 mt-2">
              Your mastery score is supported by consistent performance across
              different question types, successful recall, reattempt
              improvement, and stable recent results. Hard-level performance
              remains the main area where additional evidence is needed.
            </p>

          </div>

        </div>

      </div>

      {/* Action */}
      <div className="bg-orange-50 rounded-2xl p-5">

        <h2 className="font-bold text-orange-700">
          Recommended Next Step
        </h2>

        <p className="text-gray-600 mt-2">
          Complete a few Hard-level questions to strengthen the evidence for
          advanced mastery instead of repeating basic questions.
        </p>

        <button
          type="button"
          className="mt-4 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold"
        >
          Practice Advanced Questions
        </button>

      </div>

    </div>
  );
}