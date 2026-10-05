import React, { useState } from "react";
import {
  Brain,
  Target,
  Star,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  TrendingUp,
  Lightbulb,
} from "lucide-react";

const topics = [
  {
    name: "Data Structures & Algorithms",
    importance: "Critical",
    score: 96,
    proficiency: 72,
    roleMatch: 98,
    reason:
      "Core requirement for technical coding interviews and strongly aligned with the selected role.",
    action:
      "Prioritize advanced problem solving and timed interview practice.",
  },
  {
    name: "System Design",
    importance: "Critical",
    score: 91,
    proficiency: 58,
    roleMatch: 95,
    reason:
      "Frequently evaluated for the target role and currently represents a significant skill gap.",
    action:
      "Practice architecture, scalability, trade-offs, and system-design cases.",
  },
  {
    name: "Database & SQL",
    importance: "Important",
    score: 78,
    proficiency: 76,
    roleMatch: 84,
    reason:
      "Relevant to backend and data-related responsibilities, but your current proficiency is strong.",
    action:
      "Maintain the topic with targeted revision and practical queries.",
  },
  {
    name: "Cloud Fundamentals",
    importance: "Useful",
    score: 59,
    proficiency: 64,
    roleMatch: 61,
    reason:
      "Helpful for the role but less central than algorithms and system design.",
    action:
      "Cover the fundamentals after critical preparation areas.",
  },
  {
    name: "UI Animation",
    importance: "Optional",
    score: 24,
    proficiency: 82,
    roleMatch: 18,
    reason:
      "Has limited relevance to the selected target role.",
    action:
      "Deprioritize unless the target role requirements change.",
  },
];

const levels = [
  {
    name: "Critical",
    description: "High role relevance and/or high preparation impact.",
  },
  {
    name: "Important",
    description: "Strong relevance but lower immediate priority.",
  },
  {
    name: "Useful",
    description: "Helpful supporting knowledge for the target role.",
  },
  {
    name: "Optional",
    description: "Limited impact on current interview objectives.",
  },
];

export default function AIInterviewPreparationTopicImportanceAnalyzer() {
  const [role, setRole] = useState("Software Engineer");
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);

  const counts = {
    Critical: topics.filter((item) => item.importance === "Critical").length,
    Important: topics.filter((item) => item.importance === "Important").length,
    Useful: topics.filter((item) => item.importance === "Useful").length,
    Optional: topics.filter((item) => item.importance === "Optional").length,
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Topic Importance Analyzer
          </h1>

          <p className="text-gray-500">
            Discover which preparation topics matter most for your target role.
          </p>
        </div>

      </div>

      {/* Role Selection */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>

            <p className="text-sm text-gray-500">
              Target Role
            </p>

            <h2 className="text-2xl font-bold mt-1">
              {role}
            </h2>

            <p className="text-gray-600 mt-2">
              AI will estimate topic importance using role requirements,
              current proficiency, preparation goals, and topic relationships.
            </p>

          </div>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="border rounded-xl px-4 py-3 outline-none"
          >
            <option>Software Engineer</option>
            <option>Data Scientist</option>
            <option>Machine Learning Engineer</option>
            <option>Backend Engineer</option>
            <option>Frontend Engineer</option>
          </select>

        </div>

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="mt-6 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          Analyze Topic Importance
        </button>

      </div>

      {analyzed && (
        <>
          {/* Overview */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <Target
                  className="text-indigo-600"
                  size={40}
                />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Preparation Focus
                </p>

                <h2 className="text-3xl font-black text-indigo-700">
                  Role-Focused
                </h2>

                <p className="text-gray-600 mt-2">
                  AI identified <strong>{counts.Critical} critical topics</strong>{" "}
                  that should receive the highest preparation priority for
                  your selected role.
                </p>

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">
              <AlertTriangle className="text-red-600" />

              <p className="text-sm text-gray-500 mt-4">
                Critical
              </p>

              <p className="text-3xl font-black text-red-600">
                {counts.Critical}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <Star className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Important
              </p>

              <p className="text-3xl font-black text-orange-600">
                {counts.Important}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <BookOpen className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Useful
              </p>

              <p className="text-3xl font-black text-indigo-600">
                {counts.Useful}
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow p-5">
              <CheckCircle2 className="text-gray-500" />

              <p className="text-sm text-gray-500 mt-4">
                Optional
              </p>

              <p className="text-3xl font-black text-gray-500">
                {counts.Optional}
              </p>
            </div>

          </div>

          {/* Importance Levels */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Importance Levels
            </h2>

            <div className="grid md:grid-cols-4 gap-4 mt-5">

              {levels.map((level) => (
                <div
                  key={level.name}
                  className={`rounded-xl p-4 border ${
                    level.name === "Critical"
                      ? "bg-red-50 border-red-200"
                      : level.name === "Important"
                      ? "bg-orange-50 border-orange-200"
                      : level.name === "Useful"
                      ? "bg-indigo-50 border-indigo-200"
                      : "bg-gray-50"
                  }`}
                >

                  <p className="font-bold">
                    {level.name}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    {level.description}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Topic Rankings */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Role-Specific Topic Ranking
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Higher importance indicates greater expected impact on interview
              readiness for the selected role.
            </p>

            <div className="space-y-4 mt-6">

              {topics.map((topic, index) => (
                <button
                  type="button"
                  key={topic.name}
                  onClick={() =>
                    setSelectedTopic(
                      selectedTopic?.name === topic.name
                        ? null
                        : topic
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex gap-4">

                    <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black">
                      {index + 1}
                    </div>

                    <div className="flex-1">

                      <div className="flex flex-wrap justify-between gap-4">

                        <div>

                          <h3 className="font-bold">
                            {topic.name}
                          </h3>

                          <span
                            className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                              topic.importance === "Critical"
                                ? "bg-red-100 text-red-700"
                                : topic.importance === "Important"
                                ? "bg-orange-100 text-orange-700"
                                : topic.importance === "Useful"
                                ? "bg-indigo-100 text-indigo-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {topic.importance}
                          </span>

                        </div>

                        <div className="text-right">

                          <p className="text-2xl font-black text-indigo-600">
                            {topic.score}%
                          </p>

                          <p className="text-xs text-gray-500">
                            Importance
                          </p>

                        </div>

                      </div>

                      <div className="h-3 bg-gray-200 rounded-full mt-4">

                        <div
                          className={`h-full rounded-full ${
                            topic.importance === "Critical"
                              ? "bg-red-500"
                              : topic.importance === "Important"
                              ? "bg-orange-500"
                              : topic.importance === "Useful"
                              ? "bg-indigo-600"
                              : "bg-gray-400"
                          }`}
                          style={{
                            width: `${topic.score}%`,
                          }}
                        />

                      </div>

                      <div className="grid md:grid-cols-2 gap-4 mt-4">

                        <div>
                          <p className="text-xs text-gray-500">
                            Current Proficiency
                          </p>

                          <p className="font-bold mt-1">
                            {topic.proficiency}%
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-gray-500">
                            Role Match
                          </p>

                          <p className="font-bold mt-1">
                            {topic.roleMatch}%
                          </p>
                        </div>

                      </div>

                      {selectedTopic?.name === topic.name && (
                        <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                          <p className="text-xs font-semibold text-indigo-700">
                            AI Reasoning
                          </p>

                          <p className="text-sm text-gray-600 mt-1">
                            {topic.reason}
                          </p>

                          <div className="mt-3 bg-green-50 rounded-lg p-3">
                            <p className="text-xs font-semibold text-green-700">
                              Recommended Action
                            </p>

                            <p className="text-sm text-gray-600 mt-1">
                              {topic.action}
                            </p>
                          </div>

                        </div>
                      )}

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Importance Calculation */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              How AI Calculates Importance
            </h2>

            <div className="grid md:grid-cols-4 gap-4 mt-5">

              {[
                ["Target Role", "30%", "Required skills and role expectations"],
                ["Skill Gap", "30%", "Current proficiency compared with target"],
                ["Interview Goals", "20%", "User's preparation objectives"],
                ["Topic Relationships", "20%", "Dependencies and combined concepts"],
              ].map(([name, weight, description]) => (
                <div
                  key={name}
                  className="border rounded-xl p-4"
                >

                  <p className="font-bold">
                    {name}
                  </p>

                  <p className="text-2xl font-black text-indigo-600 mt-2">
                    {weight}
                  </p>

                  <p className="text-xs text-gray-500 mt-2">
                    {description}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Time Allocation */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <TrendingUp
                className="text-indigo-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-indigo-700">
                  Recommended Preparation Allocation
                </h2>

                <p className="text-gray-600 mt-2">
                  Based on the importance scores and your current proficiency,
                  AI recommends spending more preparation time on high-impact
                  gaps rather than distributing time equally.
                </p>

                <div className="space-y-4 mt-5">

                  {[
                    ["Data Structures & Algorithms", 35],
                    ["System Design", 30],
                    ["Database & SQL", 18],
                    ["Cloud Fundamentals", 12],
                    ["UI Animation", 5],
                  ].map(([name, percentage]) => (
                    <div key={name}>

                      <div className="flex justify-between text-sm">
                        <span className="font-semibold">
                          {name}
                        </span>

                        <span>
                          {percentage}%
                        </span>
                      </div>

                      <div className="h-3 bg-white rounded-full mt-2">

                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{
                            width: `${percentage}%`,
                          }}
                        />

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* Topic Relationship */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Topic Relationship Impact
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Some topics receive higher importance because they support other
              role-critical skills.
            </p>

            <div className="flex flex-col items-center mt-7 space-y-3">

              <div className="px-6 py-3 rounded-xl bg-red-100 text-red-700 font-bold">
                System Design
              </div>

              <div className="text-indigo-500">↓</div>

              <div className="flex flex-wrap justify-center gap-3">

                <div className="px-5 py-3 rounded-xl bg-indigo-100 text-indigo-700 font-semibold">
                  Databases
                </div>

                <div className="px-5 py-3 rounded-xl bg-indigo-100 text-indigo-700 font-semibold">
                  APIs
                </div>

                <div className="px-5 py-3 rounded-xl bg-indigo-100 text-indigo-700 font-semibold">
                  Scalability
                </div>

              </div>

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Preparation Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Prioritize <strong>Data Structures & Algorithms</strong> and{" "}
                  <strong>System Design</strong>. They have the highest role
                  relevance and the largest current skill gaps. Maintain
                  Database & SQL with lighter revision, and postpone optional
                  topics until critical requirements are covered.
                </p>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}