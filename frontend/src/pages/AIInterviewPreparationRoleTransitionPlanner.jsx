import React, { useState } from "react";
import {
  Brain,
  Target,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  BookOpen,
  Lightbulb,
  Route,
} from "lucide-react";

const skills = [
  {
    name: "Python",
    current: 88,
    required: 85,
    status: "Transferable",
  },
  {
    name: "SQL",
    current: 82,
    required: 90,
    status: "Needs Improvement",
  },
  {
    name: "Machine Learning",
    current: 46,
    required: 90,
    status: "Major Gap",
  },
  {
    name: "Statistics",
    current: 62,
    required: 85,
    status: "Gap",
  },
  {
    name: "Data Visualization",
    current: 76,
    required: 80,
    status: "Transferable",
  },
];

const roadmap = [
  {
    phase: "Phase 1",
    title: "Strengthen Statistics",
    duration: "1 week",
    priority: "High",
    reason:
      "Statistics is a prerequisite for understanding and evaluating machine-learning models.",
    activities: [
      "Revise probability fundamentals",
      "Practice descriptive statistics",
      "Review hypothesis testing",
    ],
  },
  {
    phase: "Phase 2",
    title: "Build Machine Learning Foundations",
    duration: "2 weeks",
    priority: "Critical",
    reason:
      "Machine learning is the largest gap between your current profile and the target role.",
    activities: [
      "Learn supervised and unsupervised learning",
      "Practice model evaluation",
      "Implement basic ML algorithms",
    ],
  },
  {
    phase: "Phase 3",
    title: "Role-Specific Practice",
    duration: "1 week",
    priority: "High",
    reason:
      "Apply existing Python and SQL skills to machine-learning interview scenarios.",
    activities: [
      "Solve ML interview questions",
      "Practice case studies",
      "Complete ML-focused mock interviews",
    ],
  },
];

export default function AIInterviewPreparationRoleTransitionPlanner() {
  const [sourceRole, setSourceRole] = useState("Software Engineer");
  const [targetRole, setTargetRole] = useState(
    "Machine Learning Engineer"
  );
  const [analyzed, setAnalyzed] = useState(false);
  const [selectedPhase, setSelectedPhase] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Route size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Role Transition Planner
          </h1>

          <p className="text-gray-500">
            Build a personalized roadmap from your current technical role to
            your target specialization.
          </p>
        </div>

      </div>

      {/* Role Selection */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="font-bold text-lg">
          Define Your Career Transition
        </h2>

        <p className="text-sm text-gray-500 mt-1">
          AI compares your existing capabilities with the requirements of the
          role you want to move into.
        </p>

        <div className="grid md:grid-cols-2 gap-5 mt-5">

          <div>
            <label className="text-sm font-semibold">
              Current Role
            </label>

            <select
              value={sourceRole}
              onChange={(e) => setSourceRole(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 mt-2 outline-none"
            >
              <option>Software Engineer</option>
              <option>Frontend Developer</option>
              <option>Backend Developer</option>
              <option>Data Analyst</option>
              <option>Student / Beginner</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-semibold">
              Target Role
            </label>

            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 mt-2 outline-none"
            >
              <option>Machine Learning Engineer</option>
              <option>Data Scientist</option>
              <option>Backend Engineer</option>
              <option>Data Engineer</option>
              <option>AI Engineer</option>
            </select>
          </div>

        </div>

        <div className="flex items-center justify-center gap-4 mt-7">

          <div className="px-5 py-3 rounded-xl bg-gray-100 font-semibold">
            {sourceRole}
          </div>

          <ArrowRight
            className="text-indigo-600"
            size={25}
          />

          <div className="px-5 py-3 rounded-xl bg-indigo-100 text-indigo-700 font-semibold">
            {targetRole}
          </div>

        </div>

        <button
          type="button"
          onClick={() => setAnalyzed(true)}
          className="mt-6 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          Generate Transition Roadmap
        </button>

      </div>

      {analyzed && (
        <>
          {/* Transition Summary */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-5 items-center">

              <div className="p-4 rounded-2xl bg-white">
                <TrendingUp
                  className="text-indigo-600"
                  size={40}
                />
              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Transition Readiness
                </p>

                <div className="flex items-end gap-3">

                  <h2 className="text-5xl font-black text-indigo-700">
                    64%
                  </h2>

                  <span className="mb-1 px-3 py-1 rounded-full bg-orange-100 text-orange-700 font-semibold">
                    In Progress
                  </span>

                </div>

                <p className="text-gray-600 mt-2">
                  You already have several transferable engineering skills,
                  but machine learning knowledge is currently the largest gap.
                </p>

              </div>

            </div>

          </div>

          {/* Metrics */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <CheckCircle2 className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Transferable Skills
              </p>

              <p className="text-3xl font-black text-green-600">
                2
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <AlertTriangle className="text-red-600" />

              <p className="text-sm text-gray-500 mt-4">
                Major Gaps
              </p>

              <p className="text-3xl font-black text-red-600">
                1
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <BookOpen className="text-orange-600" />

              <p className="text-sm text-gray-500 mt-4">
                Skills to Develop
              </p>

              <p className="text-3xl font-black text-orange-600">
                2
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Target className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Roadmap Duration
              </p>

              <p className="text-3xl font-black text-indigo-600">
                4w
              </p>

            </div>

          </div>

          {/* Skill Comparison */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Current Skills vs Target Requirements
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI identifies which capabilities can transfer directly and
              which require additional preparation.
            </p>

            <div className="space-y-5 mt-6">

              {skills.map((skill) => (
                <div key={skill.name}>

                  <div className="flex justify-between items-center">

                    <div>

                      <p className="font-semibold">
                        {skill.name}
                      </p>

                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          skill.status === "Transferable"
                            ? "bg-green-100 text-green-700"
                            : skill.status === "Major Gap"
                            ? "bg-red-100 text-red-700"
                            : "bg-orange-100 text-orange-700"
                        }`}
                      >
                        {skill.status}
                      </span>

                    </div>

                    <p className="text-sm font-bold">
                      {skill.current}% → {skill.required}%
                    </p>

                  </div>

                  <div className="h-3 bg-gray-200 rounded-full mt-3 relative">

                    <div
                      className="absolute h-full bg-indigo-600 rounded-full"
                      style={{
                        width: `${skill.current}%`,
                      }}
                    />

                    <div
                      className="absolute h-5 w-1 bg-red-500 -top-1"
                      style={{
                        left: `${skill.required}%`,
                      }}
                    />

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Transferable Knowledge */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <CheckCircle2
                className="text-green-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-green-700">
                  Transferable Knowledge
                </h2>

                <p className="text-gray-600 mt-2">
                  You do not need to relearn everything from scratch. AI
                  identified existing knowledge that can directly support the
                  transition.
                </p>

                <div className="grid md:grid-cols-3 gap-4 mt-5">

                  {[
                    [
                      "Python",
                      "Can transfer to ML model development and data processing.",
                    ],
                    [
                      "SQL",
                      "Can transfer to feature extraction and data preparation.",
                    ],
                    [
                      "Data Visualization",
                      "Can support model analysis and result communication.",
                    ],
                  ].map(([name, description]) => (
                    <div
                      key={name}
                      className="bg-white rounded-xl p-4"
                    >

                      <p className="font-bold">
                        {name}
                      </p>

                      <p className="text-sm text-gray-500 mt-2">
                        {description}
                      </p>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* Roadmap */}
          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="font-bold text-lg">
              Personalized Transition Roadmap
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI prioritizes preparation based on impact, dependencies, and
              the size of each skill gap.
            </p>

            <div className="space-y-5 mt-6">

              {roadmap.map((phase, index) => (
                <button
                  type="button"
                  key={phase.phase}
                  onClick={() =>
                    setSelectedPhase(
                      selectedPhase === index
                        ? null
                        : index
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex gap-4">

                    <div className="w-12 h-12 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-black">
                      {index + 1}
                    </div>

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <p className="text-xs text-gray-500">
                            {phase.phase}
                          </p>

                          <h3 className="font-bold mt-1">
                            {phase.title}
                          </h3>

                        </div>

                        <div className="text-right">

                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              phase.priority === "Critical"
                                ? "bg-red-100 text-red-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {phase.priority}
                          </span>

                          <p className="text-xs text-gray-500 mt-2">
                            {phase.duration}
                          </p>

                        </div>

                      </div>

                      <p className="text-sm text-gray-600 mt-3">
                        {phase.reason}
                      </p>

                      {selectedPhase === index && (
                        <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                          <p className="text-xs font-semibold text-indigo-700">
                            Recommended Activities
                          </p>

                          <div className="space-y-2 mt-3">

                            {phase.activities.map((activity) => (
                              <div
                                key={activity}
                                className="flex gap-2 text-sm text-gray-600"
                              >
                                <CheckCircle2
                                  size={17}
                                  className="text-indigo-600 flex-shrink-0"
                                />

                                {activity}
                              </div>
                            ))}

                          </div>

                        </div>
                      )}

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Gap Prioritization */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-orange-700">
                  Highest-Impact Transition Gaps
                </h2>

                <div className="space-y-3 mt-4">

                  {[
                    ["Machine Learning", 94],
                    ["Statistics", 72],
                    ["SQL", 41],
                  ].map(([skill, impact]) => (
                    <div
                      key={skill}
                      className="bg-white rounded-xl p-4"
                    >

                      <div className="flex justify-between">

                        <p className="font-semibold">
                          {skill}
                        </p>

                        <p className="font-bold text-orange-600">
                          {impact}% impact
                        </p>

                      </div>

                      <div className="h-3 bg-gray-200 rounded-full mt-3">

                        <div
                          className="h-full bg-orange-500 rounded-full"
                          style={{
                            width: `${impact}%`,
                          }}
                        />

                      </div>

                    </div>
                  ))}

                </div>

              </div>

            </div>

          </div>

          {/* AI Strategy */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Lightbulb
                className="text-indigo-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-indigo-700">
                  AI Transition Strategy
                </h2>

                <p className="text-gray-600 mt-2">
                  Do not restart your preparation from the beginning. Reuse
                  your existing Python, SQL, and engineering knowledge while
                  focusing most of your time on machine learning and
                  statistics. Once the foundational gaps are closed, combine
                  your existing skills with ML-focused interview practice.
                </p>

              </div>

            </div>

          </div>

          {/* Start Roadmap */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <Target
                className="text-green-600"
                size={27}
              />

              <div className="flex-1">

                <h2 className="font-bold text-green-700">
                  Ready to Start Your Transition?
                </h2>

                <p className="text-gray-600 mt-2">
                  Begin with the highest-impact gap and let AI adjust the
                  roadmap as your proficiency changes.
                </p>

                <button
                  type="button"
                  className="mt-4 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold"
                >
                  Start Transition Roadmap
                </button>

              </div>

            </div>

          </div>

        </>
      )}

    </div>
  );
}