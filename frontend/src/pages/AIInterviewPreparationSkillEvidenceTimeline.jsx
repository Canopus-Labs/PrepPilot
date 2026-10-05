import React, { useState } from "react";
import {
  Brain,
  Target,
  Code2,
  MessageSquare,
  FolderKanban,
  Mic2,
  CheckCircle2,
  TrendingUp,
  Award,
  CalendarDays,
  Lightbulb,
} from "lucide-react";

const skills = [
  {
    name: "Technical Knowledge",
    score: 84,
    icon: Brain,
    color: "indigo",
    evidence: [
      {
        date: "Jan 12",
        type: "First Evidence",
        title: "Technical Assessment",
        result: "62%",
      },
      {
        date: "Feb 08",
        type: "Practice Milestone",
        title: "Completed 25 technical questions",
        result: "72%",
      },
      {
        date: "Mar 19",
        type: "Assessment",
        title: "Fundamentals Assessment",
        result: "81%",
      },
      {
        date: "Apr 27",
        type: "Mock Interview",
        title: "Technical Round",
        result: "84%",
      },
    ],
  },
  {
    name: "Problem Solving",
    score: 91,
    icon: Code2,
    color: "purple",
    evidence: [
      {
        date: "Jan 20",
        type: "First Evidence",
        title: "First coding practice",
        result: "55%",
      },
      {
        date: "Feb 25",
        type: "Practice Milestone",
        title: "Completed 50 DSA problems",
        result: "74%",
      },
      {
        date: "Mar 30",
        type: "Assessment",
        title: "Algorithm Assessment",
        result: "86%",
      },
      {
        date: "May 04",
        type: "Mock Interview",
        title: "Coding Interview",
        result: "91%",
      },
    ],
  },
  {
    name: "Communication",
    score: 68,
    icon: MessageSquare,
    color: "orange",
    evidence: [
      {
        date: "Feb 05",
        type: "First Evidence",
        title: "Technical Explanation",
        result: "48%",
      },
      {
        date: "Mar 14",
        type: "Practice Milestone",
        title: "Completed 10 explanation sessions",
        result: "57%",
      },
      {
        date: "Apr 12",
        type: "Mock Interview",
        title: "Communication Review",
        result: "63%",
      },
      {
        date: "May 10",
        type: "Recent Performance",
        title: "Technical Explanation",
        result: "68%",
      },
    ],
  },
];

const milestones = [
  {
    date: "Jan 12",
    title: "First Skill Evidence",
    description:
      "Initial technical assessment established the baseline skill level.",
    icon: Target,
  },
  {
    date: "Feb 08",
    title: "Practice Milestone",
    description:
      "Completed the first major technical practice milestone.",
    icon: CheckCircle2,
  },
  {
    date: "Mar 19",
    title: "Assessment Improvement",
    description:
      "Assessment performance increased significantly compared with baseline.",
    icon: TrendingUp,
  },
  {
    date: "Apr 27",
    title: "Mock Interview Evidence",
    description:
      "Skill performance was validated under realistic interview conditions.",
    icon: Mic2,
  },
  {
    date: "May 10",
    title: "Recent Performance",
    description:
      "Latest activity provides the strongest evidence of current readiness.",
    icon: Award,
  },
];

export default function AIInterviewPreparationSkillEvidenceTimeline() {
  const [selectedSkill, setSelectedSkill] = useState(skills[0]);
  const [showAllMilestones, setShowAllMilestones] = useState(false);

  const visibleMilestones = showAllMilestones
    ? milestones
    : milestones.slice(0, 4);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">

      {/* Header */}
      <div className="flex items-center gap-4">

        <div className="p-3 rounded-xl bg-indigo-100 text-indigo-600">
          <Brain size={28} />
        </div>

        <div>

          <h1 className="text-2xl font-bold">
            AI Interview Preparation Skill Evidence Timeline
          </h1>

          <p className="text-gray-500">
            Track the evidence behind each skill and understand how your
            interview readiness has developed over time.
          </p>

        </div>

      </div>

      {/* Overview */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Target className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Skill Evidence Overview
            </h2>

            <p className="text-sm text-gray-500">
              Your current score is supported by evidence collected throughout
              your preparation journey.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="bg-indigo-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Skills Tracked
            </p>

            <p className="text-3xl font-black text-indigo-600 mt-1">
              6
            </p>

          </div>

          <div className="bg-green-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Evidence Events
            </p>

            <p className="text-3xl font-black text-green-600 mt-1">
              42
            </p>

          </div>

          <div className="bg-purple-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Major Milestones
            </p>

            <p className="text-3xl font-black text-purple-600 mt-1">
              12
            </p>

          </div>

          <div className="bg-orange-50 rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Average Improvement
            </p>

            <p className="text-3xl font-black text-orange-600 mt-1">
              +27%
            </p>

          </div>

        </div>

      </div>

      {/* Skill Selector */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Brain className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Select a Skill
            </h2>

            <p className="text-sm text-gray-500">
              Explore the evidence collected for each interview skill.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-6">

          {skills.map((skill) => {

            const Icon = skill.icon;
            const selected = selectedSkill.name === skill.name;

            return (
              <button
                type="button"
                key={skill.name}
                onClick={() => setSelectedSkill(skill)}
                className={`text-left border rounded-2xl p-5 transition ${
                  selected
                    ? "border-indigo-500 bg-indigo-50"
                    : "hover:border-indigo-300"
                }`}
              >

                <div className="flex items-center gap-3">

                  <div className="p-3 bg-white rounded-xl">

                    <Icon
                      className="text-indigo-600"
                      size={22}
                    />

                  </div>

                  <div>

                    <h3 className="font-bold">
                      {skill.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {skill.evidence.length} evidence events
                    </p>

                  </div>

                </div>

                <div className="flex items-end justify-between mt-5">

                  <span className="text-xs text-gray-500">
                    Current Readiness
                  </span>

                  <span className="text-2xl font-black text-indigo-600">
                    {skill.score}%
                  </span>

                </div>

                <div className="h-3 bg-gray-200 rounded-full mt-2">

                  <div
                    className="h-full bg-indigo-600 rounded-full"
                    style={{
                      width: `${skill.score}%`,
                    }}
                  />

                </div>

              </button>
            );
          })}

        </div>

      </div>

      {/* Selected Skill */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex items-center justify-between gap-4">

          <div className="flex items-center gap-4">

            <div className="p-4 bg-white rounded-2xl">

              {React.createElement(selectedSkill.icon, {
                className: "text-indigo-600",
                size: 30,
              })}

            </div>

            <div>

              <p className="text-sm text-gray-500">
                Selected Skill
              </p>

              <h2 className="text-2xl font-black text-indigo-700">
                {selectedSkill.name}
              </h2>

            </div>

          </div>

          <div className="text-right">

            <p className="text-sm text-gray-500">
              Current Score
            </p>

            <p className="text-4xl font-black text-indigo-600">
              {selectedSkill.score}%
            </p>

          </div>

        </div>

      </div>

      {/* Timeline */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <CalendarDays className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              {selectedSkill.name} Evidence Timeline
            </h2>

            <p className="text-sm text-gray-500">
              Every milestone contributes evidence toward the current
              readiness score.
            </p>

          </div>

        </div>

        <div className="mt-8 space-y-6">

          {selectedSkill.evidence.map((item, index) => (

            <div
              key={`${item.date}-${item.title}`}
              className="flex gap-5"
            >

              <div className="flex flex-col items-center">

                <div className="w-11 h-11 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">

                  {index === 0 ? (
                    <Target size={20} />
                  ) : index ===
                    selectedSkill.evidence.length - 1 ? (
                    <Award size={20} />
                  ) : (
                    <TrendingUp size={20} />
                  )}

                </div>

                {index <
                  selectedSkill.evidence.length - 1 && (
                  <div className="w-px h-20 bg-indigo-200 mt-2" />
                )}

              </div>

              <div className="flex-1 border rounded-2xl p-5">

                <div className="flex flex-wrap justify-between gap-3">

                  <div>

                    <p className="text-xs font-semibold text-indigo-600">
                      {item.date} · {item.type}
                    </p>

                    <h3 className="font-bold mt-1">
                      {item.title}
                    </h3>

                  </div>

                  <div className="px-4 py-2 rounded-xl bg-green-50 text-green-700 font-black h-fit">
                    {item.result}
                  </div>

                </div>

                {index > 0 && (
                  <div className="mt-4 flex items-center gap-2 text-sm text-green-600">

                    <TrendingUp size={16} />

                    <span>
                      Improvement demonstrated since previous evidence
                    </span>

                  </div>
                )}

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* Progress Analysis */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <TrendingUp className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Skill Development Analysis
            </h2>

            <p className="text-sm text-gray-500">
              AI summarizes how the evidence changed over time.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-5 mt-6">

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Initial Performance
            </p>

            <p className="text-3xl font-black text-orange-600 mt-2">
              {selectedSkill.evidence[0].result}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Baseline established during first evidence.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Current Performance
            </p>

            <p className="text-3xl font-black text-indigo-600 mt-2">
              {selectedSkill.score}%
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Latest available evidence.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <p className="text-sm text-gray-500">
              Overall Improvement
            </p>

            <p className="text-3xl font-black text-green-600 mt-2">
              +32%
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Improvement from the initial baseline.
            </p>

          </div>

        </div>

      </div>

      {/* Evidence Types */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Award className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Evidence Sources
            </h2>

            <p className="text-sm text-gray-500">
              Readiness is supported by multiple types of preparation
              evidence.
            </p>

          </div>

        </div>

        <div className="grid md:grid-cols-4 gap-4 mt-6">

          <div className="border rounded-xl p-5">

            <CheckCircle2 className="text-green-600" />

            <h3 className="font-bold mt-3">
              Practice
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Repeated successful practice demonstrates developing competence.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <Target className="text-indigo-600" />

            <h3 className="font-bold mt-3">
              Assessments
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Structured assessments provide measurable skill evidence.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <Mic2 className="text-purple-600" />

            <h3 className="font-bold mt-3">
              Mock Interviews
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Realistic simulations validate skills under interview conditions.
            </p>

          </div>

          <div className="border rounded-xl p-5">

            <TrendingUp className="text-orange-600" />

            <h3 className="font-bold mt-3">
              Improvement
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Consistent improvement provides evidence of learning progress.
            </p>

          </div>

        </div>

      </div>

      {/* Major Milestones */}
      <div className="bg-white rounded-2xl shadow p-6">

        <div className="flex items-center gap-3">

          <Award className="text-indigo-600" />

          <div>

            <h2 className="font-bold text-lg">
              Major Preparation Milestones
            </h2>

            <p className="text-sm text-gray-500">
              Important events across your overall interview preparation.
            </p>

          </div>

        </div>

        <div className="space-y-5 mt-6">

          {visibleMilestones.map((milestone) => {

            const Icon = milestone.icon;

            return (
              <div
                key={milestone.title}
                className="flex gap-4 border rounded-xl p-5"
              >

                <div className="p-3 bg-indigo-50 rounded-xl h-fit">

                  <Icon
                    className="text-indigo-600"
                    size={22}
                  />

                </div>

                <div>

                  <p className="text-xs text-indigo-600 font-semibold">
                    {milestone.date}
                  </p>

                  <h3 className="font-bold mt-1">
                    {milestone.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {milestone.description}
                  </p>

                </div>

              </div>
            );
          })}

        </div>

        <button
          type="button"
          onClick={() => setShowAllMilestones(!showAllMilestones)}
          className="mt-5 px-4 py-2 rounded-xl bg-indigo-100 text-indigo-700 font-semibold"
        >
          {showAllMilestones
            ? "Show Less"
            : "Show All Milestones"}
        </button>

      </div>

      {/* AI Interpretation */}
      <div className="bg-indigo-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <Brain
            className="text-indigo-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-indigo-700">
              AI Evidence Interpretation
            </h2>

            <p className="text-gray-600 mt-2">
              Your {selectedSkill.name.toLowerCase()} skill has progressed from{" "}
              <strong>
                {selectedSkill.evidence[0].result}
              </strong>{" "}
              to{" "}
              <strong>
                {selectedSkill.score}%
              </strong>
              . The strongest evidence comes from recent assessments and
              interview simulations, indicating that improvement is carrying
              over into practical performance.
            </p>

            <div className="bg-white rounded-xl p-4 mt-4">

              <div className="flex gap-3">

                <Lightbulb className="text-indigo-600" />

                <p className="text-sm text-gray-600">
                  Continue collecting evidence through realistic mock
                  interviews rather than relying only on practice completion.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Final Readiness Evidence */}
      <div className="bg-green-50 rounded-2xl p-6">

        <div className="flex gap-3">

          <CheckCircle2
            className="text-green-600"
            size={27}
          />

          <div>

            <h2 className="font-bold text-green-700">
              Evidence-Based Readiness
            </h2>

            <p className="text-gray-600 mt-2">
              Your readiness score is supported by a history of practice,
              assessments, mock interviews, and measurable improvement. This
              timeline makes it easier to understand not only your current
              score, but how you reached it.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}