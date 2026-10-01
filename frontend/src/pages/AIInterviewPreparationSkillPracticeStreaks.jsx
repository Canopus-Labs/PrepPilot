import React, { useState } from "react";
import {
  Flame,
  Brain,
  Code2,
  Database,
  Layers,
  MessageSquare,
  Users,
  Target,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  CalendarDays,
} from "lucide-react";

const initialSkills = [
  {
    name: "Algorithms",
    streak: 6,
    target: 5,
    practicedToday: true,
    icon: Brain,
  },
  {
    name: "Data Structures",
    streak: 4,
    target: 5,
    practicedToday: true,
    icon: Database,
  },
  {
    name: "System Design",
    streak: 2,
    target: 4,
    practicedToday: false,
    icon: Layers,
  },
  {
    name: "Communication",
    streak: 3,
    target: 4,
    practicedToday: true,
    icon: MessageSquare,
  },
  {
    name: "Behavioral Questions",
    streak: 1,
    target: 3,
    practicedToday: false,
    icon: Users,
  },
  {
    name: "Role-Specific Skills",
    streak: 5,
    target: 5,
    practicedToday: true,
    icon: Target,
  },
];

export default function AIInterviewPreparationSkillPracticeStreaks() {
  const [skills, setSkills] = useState(initialSkills);
  const [showBalance, setShowBalance] = useState(false);

  const practiceSkill = (name) => {
    setSkills((current) =>
      current.map((skill) =>
        skill.name === name
          ? {
              ...skill,
              practicedToday: true,
              streak: skill.practicedToday
                ? skill.streak
                : skill.streak + 1,
            }
          : skill
      )
    );
  };

  const totalStreak = skills.reduce(
    (sum, skill) => sum + skill.streak,
    0
  );

  const activeSkills = skills.filter(
    (skill) => skill.practicedToday
  ).length;

  const neglectedSkills = skills.filter(
    (skill) => skill.streak < skill.target
  );

  const balanceScore = Math.round(
    (skills.filter((skill) => skill.streak >= skill.target).length /
      skills.length) *
      100
  );

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-orange-100 text-orange-600">
          <Flame size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            AI Skill Practice Streaks
          </h1>

          <p className="text-gray-500">
            Build consistent practice habits across the skills that matter
            most for your interview.
          </p>
        </div>

      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Skill Practice Overview
            </h2>

            <p className="text-sm text-gray-500">
              Your streaks are tracked independently to encourage balanced
              preparation.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="bg-orange-50 rounded-xl p-5">
            <p className="text-sm text-gray-500">
              Combined Practice Streak
            </p>

            <p className="text-3xl font-black text-orange-600 mt-1">
              {totalStreak}
            </p>

            <p className="text-xs text-gray-500 mt-1">
              skill-days
            </p>
          </div>

          <div className="bg-green-50 rounded-xl p-5">
            <p className="text-sm text-gray-500">
              Practiced Today
            </p>

            <p className="text-3xl font-black text-green-600 mt-1">
              {activeSkills}/{skills.length}
            </p>
          </div>

          <div className="bg-indigo-50 rounded-xl p-5">
            <p className="text-sm text-gray-500">
              Balanced Skills
            </p>

            <p className="text-3xl font-black text-indigo-600 mt-1">
              {balanceScore}%
            </p>
          </div>

          <div className="bg-yellow-50 rounded-xl p-5">
            <p className="text-sm text-gray-500">
              Needs Attention
            </p>

            <p className="text-3xl font-black text-yellow-600 mt-1">
              {neglectedSkills.length}
            </p>
          </div>

        </div>

      </div>

      {/* AI Guidance */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-4">

          <Sparkles
            className="text-indigo-600"
            size={28}
          />

          <div>

            <p className="text-xs font-bold text-indigo-600">
              AI BALANCED-PRACTICE GUIDANCE
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Consistency matters more than maximizing streak length.
            </h2>

            <p className="text-gray-600 mt-2">
              Your practice plan prioritizes important neglected skills while
              avoiding excessive daily repetition. A missed day should not
              create pressure to over-practice later.
            </p>

          </div>

        </div>

      </div>

      {/* Skill Streak Cards */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Flame className="text-orange-600" />

          <div>
            <h2 className="font-bold text-lg">
              Skill-Specific Streaks
            </h2>

            <p className="text-sm text-gray-500">
              Practice each competency consistently according to its importance
              and current progress.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-2 gap-5 mt-6">

          {skills.map((skill) => {

            const Icon = skill.icon;
            const percentage = Math.min(
              (skill.streak / skill.target) * 100,
              100
            );

            const needsAttention =
              skill.streak < skill.target;

            return (
              <div
                key={skill.name}
                className={`border rounded-2xl p-5 ${
                  needsAttention
                    ? "border-orange-200"
                    : "border-green-200"
                }`}
              >

                <div className="flex items-start gap-4">

                  <div className="p-3 rounded-xl bg-indigo-50">
                    <Icon
                      className="text-indigo-600"
                      size={24}
                    />
                  </div>

                  <div className="flex-1">

                    <div className="flex justify-between gap-3">

                      <div>
                        <h3 className="font-bold">
                          {skill.name}
                        </h3>

                        <p className="text-sm text-gray-500 mt-1">
                          Recommended consistency: {skill.target} days
                        </p>
                      </div>

                      <div className="text-right">

                        <div className="flex items-center gap-1">
                          <Flame
                            className="text-orange-500"
                            size={18}
                          />

                          <span className="text-2xl font-black">
                            {skill.streak}
                          </span>
                        </div>

                        <p className="text-xs text-gray-500">
                          day streak
                        </p>

                      </div>

                    </div>

                    <div className="h-3 bg-gray-200 rounded-full mt-5">

                      <div
                        className="h-full bg-orange-500 rounded-full transition-all"
                        style={{
                          width: `${percentage}%`,
                        }}
                      />

                    </div>

                    <div className="flex items-center justify-between mt-4">

                      {skill.practicedToday ? (
                        <span className="flex items-center gap-2 text-sm text-green-600 font-semibold">
                          <CheckCircle2 size={17} />
                          Practiced today
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-sm text-orange-600 font-semibold">
                          <AlertTriangle size={17} />
                          Practice recommended
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          practiceSkill(skill.name)
                        }
                        disabled={skill.practicedToday}
                        className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-semibold disabled:opacity-50"
                      >
                        {skill.practicedToday
                          ? "Completed"
                          : "Practice Skill"}
                      </button>

                    </div>

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </div>

      {/* Neglected Skills */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <AlertTriangle className="text-orange-600" />

          <div>
            <h2 className="font-bold text-lg">
              Skills Needing Attention
            </h2>

            <p className="text-sm text-gray-500">
              AI identifies neglected competencies without requiring daily
              practice of every skill.
            </p>
          </div>

        </div>

        <div className="space-y-3 mt-6">

          {neglectedSkills.map((skill) => {

            const Icon = skill.icon;

            return (
              <div
                key={skill.name}
                className="flex items-center gap-4 border rounded-xl p-4"
              >

                <div className="p-2 rounded-lg bg-orange-50">
                  <Icon
                    className="text-orange-600"
                    size={21}
                  />
                </div>

                <div className="flex-1">

                  <p className="font-bold">
                    {skill.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    Current streak: {skill.streak} days · Suggested target:{" "}
                    {skill.target} days
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() => practiceSkill(skill.name)}
                  disabled={skill.practicedToday}
                  className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm font-semibold disabled:opacity-50"
                >
                  {skill.practicedToday
                    ? "Done"
                    : "Practice"}
                </button>

              </div>
            );
          })}

          {neglectedSkills.length === 0 && (
            <div className="bg-green-50 rounded-xl p-5 text-green-700 font-semibold">
              All important skill streaks are currently on track.
            </div>
          )}

        </div>

      </div>

      {/* Weekly Calendar */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <CalendarDays className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Weekly Practice Pattern
            </h2>

            <p className="text-sm text-gray-500">
              Review consistency across different interview competencies.
            </p>
          </div>

        </div>

        <div className="grid grid-cols-7 gap-3 mt-6">

          {[
            "Mon",
            "Tue",
            "Wed",
            "Thu",
            "Fri",
            "Sat",
            "Sun",
          ].map((day, index) => (

            <div
              key={day}
              className="text-center"
            >

              <p className="text-xs font-semibold text-gray-500">
                {day}
              </p>

              <div className="mt-3 space-y-2">

                {skills.slice(0, 5).map((skill, skillIndex) => {

                  const active =
                    (index + skillIndex) % 4 !== 0;

                  return (
                    <div
                      key={`${day}-${skill.name}`}
                      className={`h-5 rounded ${
                        active
                          ? "bg-green-400"
                          : "bg-gray-200"
                      }`}
                      title={`${skill.name} - ${active ? "Practiced" : "Not practiced"}`}
                    />
                  );
                })}

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Balance Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              Skill Balance Analysis
            </h2>

            <p className="text-sm text-gray-500">
              Your overall preparation should reflect the competencies required
              by your target interview.
            </p>
          </div>

        </div>

        <div className="mt-6">

          <div className="flex justify-between">

            <span className="text-sm text-gray-500">
              Preparation Balance
            </span>

            <span className="font-black text-indigo-600">
              {balanceScore}%
            </span>

          </div>

          <div className="h-4 bg-gray-200 rounded-full mt-2">

            <div
              className="h-full bg-indigo-600 rounded-full"
              style={{
                width: `${balanceScore}%`,
              }}
            />

          </div>

        </div>

        <button
          type="button"
          onClick={() =>
            setShowBalance(!showBalance)
          }
          className="mt-5 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold"
        >
          {showBalance
            ? "Hide Balance Details"
            : "View Balance Details"}
        </button>

        {showBalance && (
          <div className="grid md:grid-cols-3 gap-4 mt-5">

            <div className="bg-green-50 rounded-xl p-5">

              <CheckCircle2 className="text-green-600" />

              <h3 className="font-bold mt-3">
                Strong Consistency
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Algorithms and role-specific skills are receiving consistent
                practice.
              </p>

            </div>

            <div className="bg-orange-50 rounded-xl p-5">

              <AlertTriangle className="text-orange-600" />

              <h3 className="font-bold mt-3">
                Needs Attention
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                System design and behavioral preparation have shorter streaks.
              </p>

            </div>

            <div className="bg-indigo-50 rounded-xl p-5">

              <Sparkles className="text-indigo-600" />

              <h3 className="font-bold mt-3">
                AI Recommendation
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                Add short system-design and behavioral sessions rather than
                extending already strong streaks.
              </p>

            </div>

          </div>
        )}

      </div>

      {/* Healthy Practice Guardrails */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <CheckCircle2
            className="text-green-600"
            size={28}
          />

          <div>

            <p className="text-xs font-bold text-green-600">
              HEALTHY PRACTICE GUIDANCE
            </p>

            <h2 className="text-xl font-bold text-green-800 mt-1">
              Streaks are a consistency signal, not a requirement.
            </h2>

            <p className="text-gray-600 mt-2">
              AI should recommend reasonable practice sessions based on
              importance and gaps. Missing a day should not trigger excessive
              catch-up work or pressure to maintain an unbroken streak.
            </p>

          </div>

        </div>

      </div>

      {/* Recommended Practice */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Sparkles
            className="text-indigo-600"
            size={28}
          />

          <div className="flex-1">

            <p className="text-xs font-bold text-indigo-600">
              AI RECOMMENDATION
            </p>

            <h2 className="text-xl font-bold text-indigo-800 mt-1">
              Practice System Design next
            </h2>

            <p className="text-gray-600 mt-2">
              Your system-design streak is currently below its recommended
              consistency level. A short focused session would improve balance
              without requiring additional practice in already strong areas.
            </p>

            <button
              type="button"
              onClick={() => practiceSkill("System Design")}
              className="mt-4 px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"
            >
              Start System Design Practice
              <ArrowRight size={18} />
            </button>

          </div>

        </div>

      </div>

      {/* Streak Principles */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>
            <h2 className="font-bold text-lg">
              How AI Uses Skill Streaks
            </h2>

            <p className="text-sm text-gray-500">
              Streak data should support preparation decisions rather than
              become the goal itself.
            </p>
          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="border rounded-xl p-5">

            <Flame className="text-orange-600" />

            <h3 className="font-bold mt-3">
              Consistency
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Tracks repeated practice for each competency.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <Target className="text-indigo-600" />

            <h3 className="font-bold mt-3">
              Skill Relevance
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Gives more attention to skills important for the target role.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <AlertTriangle className="text-orange-600" />

            <h3 className="font-bold mt-3">
              Gap Detection
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Highlights competencies that are being neglected.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <CheckCircle2 className="text-green-600" />

            <h3 className="font-bold mt-3">
              Sustainable Practice
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Encourages reasonable consistency instead of excessive practice.
            </p>

          </div>

        </div>

      </div>

      {/* Final */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Target
            className="text-indigo-600"
            size={28}
          />

          <div>

            <h2 className="font-bold text-indigo-700">
              Next Step
            </h2>

            <p className="text-gray-600 mt-2">
              Keep your strongest skills consistent while using shorter,
              targeted sessions to strengthen neglected competencies.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}