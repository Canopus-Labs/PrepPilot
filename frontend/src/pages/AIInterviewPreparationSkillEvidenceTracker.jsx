import React from "react";
import {
  Brain,
  Target,
  CheckCircle2,
  FileCheck2,
  TrendingUp,
} from "lucide-react";

const evidence = [
  {
    skill: "Data Structures",
    score: 88,
    strength: "Strong",
    questions: 24,
    assessments: 3,
    interviews: 2,
  },
  {
    skill: "System Design",
    score: 62,
    strength: "Moderate",
    questions: 8,
    assessments: 1,
    interviews: 1,
  },
  {
    skill: "SQL",
    score: 91,
    strength: "Strong",
    questions: 18,
    assessments: 4,
    interviews: 2,
  },
];

export default function AIInterviewPreparationSkillEvidenceTracker() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Skill Evidence Tracker
          </h1>

          <p className="text-gray-500">
            See the evidence supporting your interview skill assessments.
          </p>
        </div>

      </div>

      {/* Overview */}
      <div className="bg-indigo-50 rounded-2xl p-6 text-center">

        <Target
          className="mx-auto text-indigo-600"
          size={30}
        />

        <p className="text-gray-500 mt-3">
          Overall Evidence Strength
        </p>

        <p className="text-6xl font-black text-indigo-600">
          81%
        </p>

        <p className="text-gray-600 mt-2">
          Most of your skill assessments are supported by sufficient evidence.
        </p>

      </div>

      {/* Skills */}
      <div className="bg-white rounded-2xl shadow p-5">

        <h2 className="font-bold text-lg">
          Skill Evidence
        </h2>

        <div className="space-y-5 mt-5">

          {evidence.map((item) => (
            <div
              key={item.skill}
              className="border rounded-xl p-5"
            >

              <div className="flex justify-between items-center">

                <div>
                  <h3 className="font-bold">
                    {item.skill}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Evidence Strength: {item.strength}
                  </p>
                </div>

                <span className="text-2xl font-black text-indigo-600">
                  {item.score}%
                </span>

              </div>

              <div className="h-2 bg-gray-200 rounded-full mt-3">
                <div
                  className="h-full bg-indigo-600 rounded-full"
                  style={{ width: `${item.score}%` }}
                />
              </div>

              {/* Evidence */}
              <div className="grid sm:grid-cols-3 gap-3 mt-4">

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">
                    Questions
                  </p>
                  <p className="font-bold">
                    {item.questions}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">
                    Assessments
                  </p>
                  <p className="font-bold">
                    {item.assessments}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-500">
                    Mock Interviews
                  </p>
                  <p className="font-bold">
                    {item.interviews}
                  </p>
                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Evidence Details */}
      <div className="grid sm:grid-cols-2 gap-4">

        <div className="bg-green-50 rounded-2xl p-5">

          <div className="flex gap-3">
            <FileCheck2 className="text-green-600" />

            <div>
              <h2 className="font-bold text-green-700">
                Strong Evidence
              </h2>

              <p className="text-gray-600 mt-2">
                SQL and Data Structures have consistent evidence across
                questions, assessments, and mock interviews.
              </p>
            </div>
          </div>

        </div>

        <div className="bg-orange-50 rounded-2xl p-5">

          <div className="flex gap-3">
            <TrendingUp className="text-orange-600" />

            <div>
              <h2 className="font-bold text-orange-700">
                More Evidence Needed
              </h2>

              <p className="text-gray-600 mt-2">
                System Design needs more recent assessments and mock interview
                examples before its skill score can be considered highly
                reliable.
              </p>
            </div>
          </div>

        </div>

      </div>

      {/* AI Insight */}
      <div className="bg-white rounded-2xl shadow p-5">

        <div className="flex gap-3">
          <CheckCircle2 className="text-indigo-600" />

          <div>
            <h2 className="font-bold">
              AI Evidence Insight
            </h2>

            <p className="text-gray-600 mt-2">
              Skill scores supported by multiple activity types are more
              reliable. Continue collecting evidence from different practice
              formats instead of relying on question accuracy alone.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}