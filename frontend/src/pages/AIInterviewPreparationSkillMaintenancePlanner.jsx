import React, { useState } from "react";
import {
  Brain,
  ShieldCheck,
  RotateCcw,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  CalendarDays,
  Target,
  Clock3,
} from "lucide-react";

const skills = [
  {
    name: "Arrays & Hashing",
    score: 94,
    maintenance: "Weekly",
    next: "Today",
    duration: "10 min",
    status: "Stable",
    trend: "+2%",
  },
  {
    name: "SQL",
    score: 91,
    maintenance: "Every 10 days",
    next: "Tomorrow",
    duration: "12 min",
    status: "Stable",
    trend: "+1%",
  },
  {
    name: "Object-Oriented Programming",
    score: 88,
    maintenance: "Every 2 weeks",
    next: "Friday",
    duration: "15 min",
    status: "Stable",
    trend: "0%",
  },
  {
    name: "Graphs",
    score: 84,
    maintenance: "Weekly",
    next: "Sunday",
    duration: "15 min",
    status: "Watch",
    trend: "-3%",
  },
];

const maintenanceSessions = [
  {
    day: "Today",
    skill: "Arrays & Hashing",
    activity: "Quick Recall",
    duration: "10 min",
  },
  {
    day: "Tomorrow",
    skill: "SQL",
    activity: "Practice Questions",
    duration: "12 min",
  },
  {
    day: "Friday",
    skill: "Object-Oriented Programming",
    activity: "Concept Review",
    duration: "15 min",
  },
  {
    day: "Sunday",
    skill: "Graphs",
    activity: "Regression Check",
    duration: "15 min",
  },
];

export default function AIInterviewPreparationSkillMaintenancePlanner() {
  const [started, setStarted] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Skill Maintenance Planner
          </h1>

          <p className="text-gray-500">
            Keep mastered interview skills fresh with short, adaptive
            maintenance practice.
          </p>
        </div>

      </div>

      {/* Planner Overview */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <ShieldCheck
            className="text-indigo-600"
            size={34}
          />

          <div className="flex-1">

            <p className="text-sm text-gray-500">
              Maintenance Strategy
            </p>

            <h2 className="text-xl font-bold text-indigo-700 mt-1">
              Protect Existing Skill Mastery
            </h2>

            <p className="text-gray-600 mt-2">
              AI identified four strong skills that should receive occasional
              lightweight practice while your main preparation remains focused
              on weaker areas.
            </p>

            {!started && (
              <button
                type="button"
                onClick={() => setStarted(true)}
                className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
              >
                Generate Maintenance Plan
              </button>
            )}

          </div>

        </div>

      </div>

      {started && (
        <>
          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-white rounded-2xl shadow p-5">

              <CheckCircle2 className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Mastered Skills
              </p>

              <p className="text-3xl font-black text-green-600">
                4
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <RotateCcw className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Maintenance Sessions
              </p>

              <p className="text-3xl font-black text-indigo-600">
                4
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <Clock3 className="text-indigo-600" />

              <p className="text-sm text-gray-500 mt-4">
                Avg. Session
              </p>

              <p className="text-3xl font-black text-indigo-600">
                13 min
              </p>

            </div>

            <div className="bg-white rounded-2xl shadow p-5">

              <TrendingUp className="text-green-600" />

              <p className="text-sm text-gray-500 mt-4">
                Retention Score
              </p>

              <p className="text-3xl font-black text-green-600">
                91%
              </p>

            </div>

          </div>

          {/* Skill Maintenance Status */}
          <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="font-bold text-lg">
              Skill Maintenance Status
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              AI adjusts maintenance frequency according to recent
              performance.
            </p>

            <div className="space-y-4 mt-5">

              {skills.map((skill) => (
                <button
                  type="button"
                  key={skill.name}
                  onClick={() =>
                    setSelected(
                      selected?.name === skill.name
                        ? null
                        : skill
                    )
                  }
                  className="w-full text-left border rounded-2xl p-5 hover:border-indigo-400 transition"
                >

                  <div className="flex gap-3">

                    {skill.status === "Stable" ? (
                      <CheckCircle2
                        className="text-green-600 mt-1"
                        size={22}
                      />
                    ) : (
                      <AlertTriangle
                        className="text-orange-600 mt-1"
                        size={22}
                      />
                    )}

                    <div className="flex-1">

                      <div className="flex justify-between gap-4">

                        <div>

                          <h3 className="font-semibold">
                            {skill.name}
                          </h3>

                          <p className="text-sm text-gray-500 mt-1">
                            Mastery: {skill.score}%
                          </p>

                        </div>

                        <span className="font-bold text-indigo-600">
                          {skill.maintenance}
                        </span>

                      </div>

                      <div className="h-2 bg-gray-200 rounded-full mt-4">

                        <div
                          className="h-full bg-indigo-600 rounded-full"
                          style={{
                            width: `${skill.score}%`,
                          }}
                        />

                      </div>

                      <div className="flex justify-between mt-3 text-sm">

                        <span className="text-gray-500">
                          Next: {skill.next}
                        </span>

                        <span
                          className={
                            skill.trend.startsWith("-")
                              ? "text-orange-600 font-semibold"
                              : "text-green-600 font-semibold"
                          }
                        >
                          {skill.trend} recent change
                        </span>

                      </div>

                      {selected?.name === skill.name && (
                        <div className="mt-4 bg-indigo-50 rounded-xl p-4">

                          <p className="text-sm text-gray-600">
                            AI selected this maintenance frequency using
                            mastery level, recent performance, previous review
                            interval, and regression risk.
                          </p>

                        </div>
                      )}

                    </div>

                  </div>

                </button>
              ))}

            </div>

          </div>

          {/* Schedule */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <CalendarDays className="text-indigo-600" />

              <div>

                <h2 className="font-bold text-lg">
                  Maintenance Schedule
                </h2>

                <p className="text-sm text-gray-500">
                  Short sessions designed to preserve existing knowledge.
                </p>

              </div>

            </div>

            <div className="space-y-3 mt-5">

              {maintenanceSessions.map((session, index) => (
                <div
                  key={`${session.day}-${session.skill}`}
                  className="flex items-center gap-4 border rounded-xl p-4"
                >

                  <div className="w-24 font-semibold">
                    {session.day}
                  </div>

                  <div className="flex-1">

                    <p className="font-semibold">
                      {session.skill}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      {session.activity}
                    </p>

                  </div>

                  <span className="text-sm text-gray-500">
                    {session.duration}
                  </span>

                  {index === 0 && (
                    <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold">
                      Next
                    </span>
                  )}

                </div>
              ))}

            </div>

          </div>

          {/* Regression Detection */}
          <div className="bg-orange-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <AlertTriangle
                className="text-orange-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-orange-700">
                  Early Regression Detection
                </h2>

                <p className="text-gray-600 mt-2">
                  Graphs currently show a small performance decline. AI has
                  increased its maintenance frequency temporarily instead of
                  waiting until the skill becomes significantly weaker.
                </p>

                <div className="mt-4 bg-white rounded-xl p-4">

                  <div className="flex justify-between">

                    <span className="text-gray-500">
                      Previous performance
                    </span>

                    <strong>
                      87%
                    </strong>

                  </div>

                  <div className="flex justify-between mt-2">

                    <span className="text-gray-500">
                      Current performance
                    </span>

                    <strong className="text-orange-600">
                      84%
                    </strong>

                  </div>

                  <div className="flex justify-between mt-2">

                    <span className="text-gray-500">
                      New maintenance frequency
                    </span>

                    <strong>
                      Weekly
                    </strong>

                  </div>

                </div>

              </div>

            </div>

          </div>

          {/* Adaptive Logic */}
          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-3">

              <Target className="text-indigo-600" />

              <h2 className="font-bold text-lg">
                Adaptive Maintenance Logic
              </h2>

            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-5">

              <div className="border rounded-xl p-4">

                <CheckCircle2 className="text-green-600" />

                <h3 className="font-semibold mt-3">
                  Stable Mastery
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Increase the interval between maintenance sessions.
                </p>

              </div>

              <div className="border rounded-xl p-4">

                <RotateCcw className="text-indigo-600" />

                <h3 className="font-semibold mt-3">
                  Minor Decline
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Temporarily increase maintenance frequency.
                </p>

              </div>

              <div className="border rounded-xl p-4">

                <AlertTriangle className="text-orange-600" />

                <h3 className="font-semibold mt-3">
                  Significant Regression
                </h3>

                <p className="text-sm text-gray-600 mt-1">
                  Move the skill back into regular practice and reassess
                  mastery.
                </p>

              </div>

            </div>

          </div>

          {/* AI Recommendation */}
          <div className="bg-green-50 rounded-2xl p-6">

            <div className="flex gap-3">

              <ShieldCheck
                className="text-green-600"
                size={27}
              />

              <div>

                <h2 className="font-bold text-green-700">
                  AI Recommendation
                </h2>

                <p className="text-gray-600 mt-2">
                  Keep mastered skills active with short maintenance sessions
                  rather than removing them completely from your preparation
                  plan. Continue focusing most of your study time on weak
                  areas.
                </p>

              </div>

            </div>

          </div>

          {/* Start Session */}
          <div className="bg-indigo-50 rounded-2xl p-6">

            <h2 className="font-bold text-indigo-700">
              Today's Maintenance Session
            </h2>

            <p className="text-gray-600 mt-2">
              Complete a 10-minute Arrays & Hashing recall session to preserve
              your current mastery.
            </p>

            <button
              type="button"
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
            >
              Start Maintenance Practice
            </button>

          </div>

        </>
      )}

    </div>
  );
}